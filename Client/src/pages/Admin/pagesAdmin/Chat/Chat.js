import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Modal, Empty, Tooltip } from 'antd';
import { SearchOutlined, SendOutlined, DeleteOutlined } from '@ant-design/icons';
import images from '~/assets/images';
import socketIOClient from 'socket.io-client';
import { deleteAllRoom, chatHistory, deleteRoom, activeRoom } from '../../services/chatServices';

const host = process.env.REACT_APP_BASE_URL;

const cx = classNames.bind(styles);
function Chat({ role = 'admin' }) {
    const [searchInput, setSearchInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [fullname, setFullname] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [activeRooms, setActiveRooms] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const socketRef = useRef();
    const messageContainerRef = useRef(null);

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host);

        // Join on room when component mouted
        socketRef.current.emit('joinRoom', roomName);

        // Listen  message to server
        socketRef.current.on('message', (message) => {
            const messageData = message.content;
            const messageRole = message.role;
            const data = {
                content: messageData,
                role: messageRole,
            };
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Fetch the list of active rooms when the component mounts
        activeRoom()
            .then((response) => {
                const dataRoom = response;
                setActiveRooms(dataRoom);
                // Defalut join room frist
                handleDefaultRoom(dataRoom);
                //
                if (dataRoom.roomName.length === 0) {
                    setMessages([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching active rooms:', error);
            });

        return () => {
            // Rời khỏi phòng khi component bị unmount
            socketRef.current.emit('leaveRoom', roomName);
        };
    }, []);

    // Set Scroll always down
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    //  Handle
    const sendMessage = () => {
        if (message.trim() !== '') {
            // Send  message to server
            socketRef.current.emit('message', { roomName, message, role });
            setMessage('');
        }
    };
    const handleJoinRoom = (clickRoomName) => {
        socketRef.current.emit('joinRoom', { roomName: clickRoomName });

        // Fetch chat history
        chatHistory(clickRoomName)
            .then((response) => {
                setMessages(response.chatHistory);
            })
            .catch((error) => {
                console.error('Error fetching chat history:', error);
            });
    };
    const handleDefaultRoom = (data) => {
        setRoomName(data[0].roomName);
        setAvatar(data[0].avatar);
        setFullname(data[0].fullname);
        // Handle
        handleJoinRoom(data[0].roomName);
    };
    const handleOtherRoom = (data) => {
        setRoomName(data.roomName);
        setAvatar(data.avatar);
        setFullname(data.fullname);
        // Handle
        handleJoinRoom(data.roomName);
    };

    const handleDeleteAll = () => {
        deleteAllRoom()
            .then(() => {
                setActiveRooms([]);
                setAvatar(null);
                setFullname('');
                setRoomName('');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleDeleteRoom = () => {
        deleteRoom(roomName, avatar, fullname)
            .then(() => {
                setAvatar(null);
                setFullname('');
                setRoomName('');
                setMessages([]);
                setActiveRooms((prev) => prev.filter((item) => item.roomName !== roomName));
            })
            .catch((error) => {
                console.error('Error deleting room:', error);
            });
    };
    const handleDelete = (type) => {
        setModalType(type);
        setShowModal(true);
    };
    const handleOk = () => {
        setShowModal(false);

        if (modalType === 'deleteRoom') {
            handleDeleteRoom();
        } else if (modalType === 'deleteAllRooms') {
            handleDeleteAll();
        }
    };

    // Handle to parse messages and replace links with anchor tags
    const parseMessages = (msg) => {
        const parts = msg.split(/\b(https?:\/\/[^\s]+)\b/);
        return parts.map((part, index) =>
            part.match(/^https?:\/\/[^\s]+$/) ? (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={cx('text-link')}>
                    {part}
                </a>
            ) : (
                part
            ),
        );
    };

    // Handle Search
    const filterActiveRoom = activeRooms?.filter((item) => item.roomName !== '');
    const filteredearchRoom = filterActiveRoom.filter((item) =>
        item.roomName.toLowerCase().includes(searchInput.toLowerCase()),
    );

    return (
        <Row>
            <Col span={10}>
                <div className={cx('wrapper-left')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>Chats</h2>
                        <Tooltip title="Delete All">
                            <DeleteOutlined
                                style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: '1.8rem', marginRight: '20px' }}
                                onClick={() => handleDelete('deleteAllRooms')}
                            />
                        </Tooltip>
                    </div>
                    <div className={cx('search')}>
                        <input
                            type="text"
                            placeholder="Search "
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <SearchOutlined className={cx('icon-search')} />
                    </div>
                    <div className={cx('customer')}>
                        <ul className={cx('customer-list')}>
                            {filteredearchRoom.map((item, index) => (
                                <div className={cx('wrappper-customer-item')}>
                                    <li
                                        className={cx('customer-item')}
                                        onClick={() => {
                                            handleOtherRoom(item);
                                        }}
                                    >
                                        <img
                                            src={item.avatar || ''}
                                            alt="image-customer"
                                            className={cx('image-customer')}
                                        />
                                        <div className={cx('info')}>
                                            <div className={cx('info-container')}>
                                                <h3 className={cx('name')}>{item.roomName}</h3>
                                                {/* <span className={cx('time')}> Time</span> */}
                                            </div>
                                            <div className={cx('chat-content')}>
                                                <p>{fullname}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <Tooltip title="Delete">
                                        <DeleteOutlined
                                            style={{
                                                color: '#ff4d4f',
                                                cursor: 'pointer',
                                                fontSize: '2rem',
                                                marginLeft: '10px',
                                            }}
                                            className={cx('icon-trash')}
                                            onClick={() => {
                                                handleDelete('deleteRoom');
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </Col>
            <Col span={14} className={cx('wrapper-right')}>
                {activeRooms.length > 0 ? (
                    <div>
                        <div className={cx('header-section-messsage')}>
                            <div className={cx('header-section-messsage-container')}>
                                <img src={avatar} alt="image-customer" className={cx('image-customer')} />
                                <div className={cx('info')}>
                                    <h3 className={cx('name')}>{roomName}</h3>
                                    <p className={cx('username')}>{fullname}</p>
                                </div>
                            </div>
                            <div>
                                <SearchOutlined className={cx('icon')} />
                                {/* <MoreOutlined className={cx('icon')} /> */}
                                <Tooltip title="Delete">
                                    <DeleteOutlined
                                        style={{
                                            color: '#ff4d4f',
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                            marginLeft: '10px',
                                        }}
                                        onClick={() => {
                                            handleDelete('deleteRoom');
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                        <div className={cx('body-section-messsage')} ref={messageContainerRef}>
                            <ul className={cx('message-list')}>
                                {messages.map((msg, index) => (
                                    <li
                                        className={cx(
                                            msg.role === 'user' ? 'message-customer-item' : 'message-admin-item',
                                        )}
                                    >
                                        <div className={cx('wrapper-image')}>
                                            <img
                                                src={msg.role === 'user' ? avatar : images.logoChat}
                                                alt="image"
                                                className={cx('image-customer')}
                                            />
                                        </div>
                                        <div className={cx(msg.role === 'user' ? 'content-customer' : 'content-admin')}>
                                            <p className={cx('message')}>
                                                {parseMessages(msg.content)}
                                                <p className={cx('time')}>8 mins ago</p>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx('footer-section-messsage')}>
                            <div className={cx('input-message')}>
                                <input
                                    type="text"
                                    placeholder="Type your messasge"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className={cx('wrapper-icon')}>
                                    <SendOutlined className={cx('icon-send')} onClick={sendMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Empty />
                    </div>
                )}
            </Col>

            <Modal
                title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                visible={showModal}
                onOk={handleOk}
                onCancel={() => setShowModal(false)}
                style={{ marginTop: '150px' }}
            >
                <p>
                    <span style={{ fontWeight: '700', fontSize: '1.5rem' }}>DELETE ?</span>
                </p>
            </Modal>
        </Row>
    );
}

export default Chat;
