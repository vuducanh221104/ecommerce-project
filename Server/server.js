const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./Config/db');
const routes = require('./routes');
const methodOverride = require('method-override');
const http = require('http');
const Redis = require('ioredis');
const server = http.createServer(app);
// const redis = new Redis();

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});

// Kiểm tra kết nối thành công hay không
redis.on('connect', function () {
    console.log('Connected to Redis');
});

redis.on('error', function (error) {
    console.error('Error connecting to Redis:', error);
});

app.use(
    cors({
        origin: process.env.BASE_URL_CLIENT || '*',
        credentials: true,
    }),
);

const socketIo = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cookieParser());

app.use(express.json());

// Call API
db.connect();

routes(app);
//WebSocket Room Chat
socketIo.on('connection', (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (data) => {
        if (data && data.roomName) {
            const { roomName, avatar, fullname } = data;
            socket.join(roomName);

            // Check if the room already exists in Redis
            redis.lrange('activeRooms', 0, -1, (err, rooms) => {
                if (err) {
                    console.error('Lỗi khi truy xuất danh sách phòng từ Redis:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                const existingRoom = rooms.find((room) => {
                    const parsedRoom = JSON.parse(room);
                    return parsedRoom.roomName === roomName;
                });

                if (!existingRoom) {
                    // Room doesn't exist, so join the room and add it to Redis
                    socket.join(roomName);
                    const dataStringify = JSON?.stringify({ roomName, avatar, fullname });

                    redis.lpush('activeRooms', dataStringify, (err) => {
                        if (err) {
                            console.error('Lỗi khi thêm phòng vào Redis:', err);
                        }
                    });
                }
            });
        }
    });

    // Listen when user send message
    socket.on('message', (data) => {
        const { roomName, message, role } = data;
        const dataMessageClient = {
            content: message,
            role: role,
        };

        redis.rpush(roomName, JSON.stringify(dataMessageClient));
        socketIo.to(roomName).emit('message', dataMessageClient);
    });

    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);
        socket.to(roomName).emit('message', { content: 'User leaves the room', role: 'user' });
    });
});

// Delete all room have a redis
app.delete('/deleteAllRooms', (req, res) => {
    // Fetch all active rooms
    redis.lrange('activeRooms', 0, -1, (err, rooms) => {
        if (err) {
            console.error('Lỗi khi truy xuất danh sách phòng từ Redis:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Delete each room and its messages
        rooms.forEach((room) => {
            const parsedRoom = JSON.parse(room);
            const roomName = parsedRoom.roomName;

            // Delete messages in the room
            redis.del(roomName, (err) => {
                if (err) {
                    console.error(`Lỗi khi xóa tin nhắn trong phòng ${roomName} từ Redis:`, err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
            });
        });

        // Delete the list of active rooms
        redis.del('activeRooms', (err, response) => {
            if (err) {
                console.error('Lỗi khi xóa danh sách phòng trong Redis:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: 'Xóa tất cả các phòng và tin nhắn thành công' });
        });
    });
});
// When Room Created Admin will recived all rooms
app.get('/activeRooms', (req, res) => {
    redis.lrange('activeRooms', 0, -1, (err, data) => {
        if (err) {
            console.error('Lỗi khi truy xuất danh sách phòng từ Redis:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Parse each JSON string in the array
        const parsedDataArray = data.map((jsonString) => JSON.parse(jsonString));

        res.status(200).json(parsedDataArray);
    });
});

// Define a new route for fetching chat history
app.get('/chat-history/:roomName', (req, res) => {
    const roomName = req.params.roomName;

    // Fetch chat history from Redis based on the roomName
    redis.lrange(roomName, 0, -1, (err, chatHistory) => {
        if (err) {
            console.error('Error fetching chat history from Redis:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Parse chat history if available
        const parsedChatHistory = chatHistory.map((item) => JSON.parse(item));

        res.status(200).json({ chatHistory: parsedChatHistory });
    });
});

// Delete a specific room and all its messages
app.delete('/deleteRoom/:roomName', (req, res) => {
    const roomName = req.params.roomName;

    // Delete the room from the list of active rooms
    redis.lrem('activeRooms', 0, JSON.stringify({ roomName }), (err, response) => {
        if (err) {
            console.error('Error deleting room from Redis:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Delete all messages in the specified room
        redis.del(roomName, (err, response) => {
            if (err) {
                console.error('Error deleting messages from Redis:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: `Deleted room ${roomName} and all its messages` });
        });
    });
});

// Delete a specific room and all its messages
app.delete('/deleteRoomm', (req, res) => {
    const { roomName, avatar, fullname } = req.body;

    // Delete the room from the list of active rooms
    redis.lrem('activeRooms', 0, JSON.stringify({ roomName, avatar, fullname }), (err, response) => {
        if (err) {
            console.error('Error deleting room from Redis:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // Delete all messages in the specified room
        redis.del(roomName, (err, response) => {
            if (err) {
                console.error('Error deleting messages from Redis:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: `Deleted room ${roomName} and all its messages` });
        });
    });
});

server.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
