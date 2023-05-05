import { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setUser(userInfo);

    if (!userInfo) {
      <Navigate to="/" />;
    }
  }, []);

  return (
    <chatContext.Provider
      value={{ selectedChat, setSelectedChat, user, setUser, chats, setChats }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
