import styles from './MiniChatContent.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import socketIOClient from 'socket.io-client';
import axiosRequest from '~/utils/axiosRequest';
import { useSelector } from 'react-redux';
import { chatHistory } from '~/services/websocketServices';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const host = process.env.REACT_APP_BASE_URL;

const cx = classNames.bind(styles);

function MiniChatContent({ showChat, setShowChat, role = 'user', roomName, avatar, fullname }) {
    const dataUser = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [firstMessageSent, setFirstMessageSent] = useState(false);
    const socketRef = useRef();
    const messageContainerRef = useRef(null);

    const joinRoom = async (roomName) => {
        try {
            const res = await chatHistory(roomName);
            setMessages(res.chatHistory);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Check if roomName is truthy before emitting 'joinRoom' event
        if (roomName !== undefined) {
            socketRef.current = socketIOClient.connect(host);

            // Join to room when component mounted
            const data = { roomName, avatar, fullname };
            if (firstMessageSent) {
                // Chỉ gửi roomName về server khi người dùng đã gửi tin nhắn đầu tiên
                socketRef.current.emit('joinRoom', data);
            }

            // When receive history message on server
            joinRoom(roomName);

            // Listen to the message
            socketRef.current.on('message', (message) => {
                const messageData = message.content;
                const messageRole = message.role;
                const data = {
                    content: messageData,
                    role: messageRole,
                };

                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }

        return () => {
            // Rời khỏi phòng khi component bị unmount
            socketRef.current.emit('leaveRoom', roomName);
        };
    }, [roomName, firstMessageSent, avatar, fullname]);

    // Set Scroll always down
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages, showChat]);

    // Handle Send Message
    const sendMessage = async () => {
        if (dataUser) {
            axiosRequest(navigate);
        }
        if (message.trim() !== '') {
            // Gửi tin nhắn đầu tiên
            if (!firstMessageSent) {
                setFirstMessageSent(true);
            }
            // Send message to server
            socketRef.current.emit('message', { roomName, message, role });
            setMessage('');
        }
    };

    // Onkeydown enter will click send
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    // Function to parse messages and replace links with anchor tags
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

    return (
        <>
            <div className={cx('title')}>
                <h3>Chat Với Minh Tuấn Moblie</h3>
                <FontAwesomeIcon icon={faXmark} className={cx('icon-close')} onClick={() => setShowChat(false)} />
            </div>
            <div style={{fontSize:'1.2rem' ,paddingTop:'5px'}}>
            ID room {roomName}
            </div>
            <div className={cx('message-content')} ref={messageContainerRef}>
                
                {/* MESSAGE MAP */}
                <div className={cx('message-block')}>
                    <div className={cx('container-meessage')}>
                        <img src={images.logoChat} alt="anh-admin" className={cx('admin-img')} />
                        <div className={cx('message')}>
                            <p>
                                Ưu đãi hấp dẫn mùa tựu trường!!! Giảm ngay từ 5%-15% với các sản phẩm như điện thoại,
                                laptop dành riêng cho các bạn học sinh sinh viên, truy cập{' '}
                                <a href="https://cps.onl/back-to-shool" className={cx('text-link')}>
                                    https://cps.onl/back-to-shool {''}
                                </a>
                                hoặc chat ngay với em để được tư vấn ưu đãi tốt nhất!!!
                            </p>
                        </div>
                    </div>
                </div>
                {messages?.map((msg, index) => (
                    <div key={index} className={cx('message-block', msg.role === 'user' ? 'user-message' : '')}>
                        <div className={cx('container-meessage')}>
                            <img
                                src={msg.role === 'user' ? images.noImage : images.logoChat}
                                alt="anh-admin"
                                className={cx('admin-img')}
                            />
                            <div className={cx('message')}>
                                <p> {parseMessages(msg.content)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* INPUT ~ SEND */}
            <div className={cx('conatiner-input')}>
                <input
                    value={message}
                    type="text"
                    placeholder="Nhập nội dung..."
                    className={cx('input-message')}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <FontAwesomeIcon icon={faPaperPlane} className={cx('icon-message')} onClick={sendMessage} />
            </div>
        </>
    );
}

MiniChatContent.propTypes = {
    showChat: PropTypes.bool,
    setShowChat: PropTypes.bool,
    role: PropTypes.number,
    roomName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    fullname: PropTypes.string,
};

export default MiniChatContent;
