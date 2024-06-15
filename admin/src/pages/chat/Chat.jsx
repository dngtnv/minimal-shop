import openSocket from 'socket.io-client';

import { useEffect, useRef, useState } from 'react';
import avatar from '../../assets/customer-avatar.png';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import styles from './Chat.module.css';

const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  // State to store the current room ID
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const messageRef = useRef();

  // const roomId = localStorage.getItem('roomId');

  useEffect(() => {
    // Fetch list of chat rooms from your backend
    const fetchRooms = async () => {
      const response = await fetch('http://localhost:5000/support/sessions');
      const data = await response.json();
      if (!data.sessions.length) {
        return;
      }
      setRooms(data.sessions);
      setCurrentRoomId(data.sessions[0]._id);
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    // Fetch messages for the current room
    const fetchMessages = async () => {
      if (currentRoomId) {
        const response = await fetch(`http://localhost:5000/support/messages/${currentRoomId}`);
        const data = await response.json();
        setMessages(data.messages);
      }
    };

    fetchMessages();
  }, [currentRoomId]);

  const handleSendMessage = async () => {
    const message = messageRef.current.value;
    if (message.trim() !== '' && currentRoomId) {
      const response = await fetch(`http://localhost:5000/support/messages/${currentRoomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      messageRef.current.value = '';
    }
  };

  const switchRoom = (roomId) => {
    // Update the current room ID, triggering a re-fetch of messages
    setCurrentRoomId(roomId);
  };

  useEffect(() => {
    // Setup socket connection to listen for messages
    const socket = openSocket('http://localhost:5000');
    socket.on('messages', (data) => {
      if (data.action === 'create') {
        localStorage.setItem('roomId', data.roomId);
        setMessages([{ content: data.message, isClient: data.isClient, _id: data.message._id }]);
        setRooms((prevRooms) => [...prevRooms, { _id: data.roomId }]);
        switchRoom(data.roomId);
      } else if (data.action === 'update') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: data.message, isClient: data.isClient, _id: data.message._id },
        ]);
      } else if (data.action === 'end') {
        setMessages([]);
        setRooms((prevRooms) => prevRooms.filter((room) => room._id !== data.roomId));
        switchRoom(rooms[0]._id);
      }
    });

    // Cleanup
    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Header />
      <section>
        <Sidebar />
        <section id={styles['chat-wrapper']}>
          <div className={styles['chat-top']}>
            <h1>Chat</h1>
            <p>Apps / Chat</p>
          </div>
          <div className={styles['chat-main']}>
            <div className={styles['chat-sidebar']}>
              <div className={styles['chat-search']}>
                <input type='text' placeholder='Search Contact' />
              </div>
              <div className={styles['chat-list']}>
                {rooms.length !== 0 &&
                  rooms.map((room) => (
                    <div key={room._id} onClick={() => switchRoom(room._id)} className={styles['chat-item']}>
                      <div className={styles['chat-avatar']}>
                        <img src={avatar} alt='avatar' />
                      </div>
                      <span>{room._id}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles['chat-body']}>
              <div className={styles['chat-body-top']}>
                {messages.map((message, index) => (
                  <div key={index} className={styles['chat-message']}>
                    <div className={message.isClient ? styles['chat-message-left'] : styles['chat-message-right']}>
                      {message.isClient && (
                        <div className={styles['chat-avatar']}>
                          <img src={avatar} alt='avatar' />
                        </div>
                      )}
                      <div className={styles['chat-message-text']}>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles['chat-body-bottom']}>
                <input ref={messageRef} type='text' disabled={rooms.length === 0} placeholder='Type and enter' />
                <button onClick={handleSendMessage} className={styles['send-btn']}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    width='24'
                    height='24'
                  >
                    <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Chat;
