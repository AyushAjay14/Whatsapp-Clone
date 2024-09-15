import { useState } from "react";
import "./chatApp.css";
import SideBar from "./sidebar/SideBar";
import UnselectedChat from "./unselectedChatSection/UnselectedChat";
import ChatRoom from "./chatRoom/ChatRoom";
import { User } from "@/types/";
import { MessagesUtilContext, SelectedUserUtilsContext } from "@/context/";

function ChatApp() {
  // REVIEW_COMMENTS: implemented a SelectedUserContext here via React.createContext, avoid props drilling
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState({});

  const selectedUserUtils = {
    selectedUser,
    setSelectedUser,
  };
  const messagesUtils = {
    messages,
    setMessages,
  };
  /**
   * REVIEW_COMMENTS:
   * BEM naming convention for CSS selectors.
   * good naming convention - chat-app__container
   */
  return (
    <SelectedUserUtilsContext.Provider value={selectedUserUtils}>
      <MessagesUtilContext.Provider value={messagesUtils}>
        <div className="chat-app__container">
          <SideBar />
          {selectedUser ? (
            <ChatRoom key={selectedUser.id} />
          ) : (
            <UnselectedChat />
          )}
        </div>
      </MessagesUtilContext.Provider>
    </SelectedUserUtilsContext.Provider>
  );
}

export default ChatApp;
