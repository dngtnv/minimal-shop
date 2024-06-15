import openSocket from 'socket.io-client';

import { useEffect, useRef, useState } from 'react';
import avatar from '../../assets/customer-avatar.png';
import styles from './SupportPopup.module.css';

const ChatPopup = () => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const user = JSON.parse(localStorage.getItem('authUser'));
  const currentRoomId = localStorage.getItem('roomId');

  const handleSendMessage = async () => {
    const message = messageRef.current.value;
    if (message === '/end') {
      // Remove 'roomId' from localStorage
      localStorage.removeItem('roomId');
      setMessages((prevMessages) => [...prevMessages, { content: 'Chat ended!', isClient: true }]);
      // Optionally, handle the '/end' command differently here
      // For example, close the chat or send a special signal to the server
      // For now, just clear the input and return to prevent sending the message
      messageRef.current.value = '';
    }
    const response = await fetch('https://minimal-shop.onrender.com/support/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, user }),
    });
    messageRef.current.value = '';
  };

  useEffect(() => {
    // Setup socket connection to listen for messages
    const socket = openSocket('https://minimal-shop.onrender.com');
    socket.on('messages', (data) => {
      if (data.action === 'create') {
        if (!localStorage.getItem('roomId')) {
          localStorage.setItem('roomId', data.roomId);
        }
        if (data.roomId !== localStorage.getItem('roomId')) return;
        console.log('New message created:', data.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: data.message, isClient: data.isClient, _id: data.message._id },
        ]);
      } else if (data.action === 'update') {
        if (data.roomId !== localStorage.getItem('roomId')) return;
        console.log('Message updated:', data.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: data.message, isClient: data.isClient, _id: data.message._id },
        ]);
      }
    });

    // Cleanup
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    // Fetch messages for the current room
    const fetchMessages = async () => {
      if (currentRoomId) {
        const response = await fetch(`https://minimal-shop.onrender.com/support/messages/${currentRoomId}`);
        const data = await response.json();
        setMessages(data.messages);
      }
    };

    fetchMessages();
  }, [currentRoomId]);

  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles['chat-content']}>
        <div className={styles['chat-header']}>
          <h3>Customer Support</h3>
          <div className={styles['right-text']}>
            <p>Let&apos;s Chat App</p>
          </div>
        </div>
        <div className={styles['chat-body']}>
          {messages.map((message, index) => (
            <div key={index} className={styles['chat-message']}>
              <div className={message.isClient ? styles['chat-message-right'] : styles['chat-message-left']}>
                <div className={styles['chat-message-text']}>
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles['chat-footer']}>
          <div className={styles['chat-control']}>
            <div className={styles['chat-avatar']}>
              <img src={avatar} alt='avatar' />
            </div>
            <input ref={messageRef} type='text' placeholder='Enter Message!' />
            <div className={styles['chat-buttons']}>
              <button>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  width='24'
                  height='24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13'
                  />
                </svg>
              </button>
              <button>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
                  <path
                    fillRule='evenodd'
                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button onClick={handleSendMessage}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width='24' height='24'>
                  <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
