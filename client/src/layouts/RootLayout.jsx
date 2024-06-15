import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';
import ChatButton from '../components/Support/SupportButton.jsx';
import ChatPopup from '../components/Support/SupportPopup.jsx';

const RootLayout = () => {
  const [showChatPopup, setShowChatPopup] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  // Function to toggle chat popup
  const toggleChatPopup = () => {
    setShowChatPopup((prevState) => !prevState);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
      {showChatPopup && <ChatPopup />}
      {isAuth && <ChatButton toggleChatPopup={toggleChatPopup} />}
    </>
  );
};

export default RootLayout;
