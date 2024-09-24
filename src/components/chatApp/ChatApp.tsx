import { useReducer, useState } from "react";
import "./chatApp.css";
import SideBar from "./sidebar/SideBar";
import UnselectedChat from "./unselectedChatSection/UnselectedChat";
import ChatRoom from "./chatRoom/ChatRoom";
import { User } from "@/types/";
import { CompactModeUtilContext, MessagesUtilContext, SelectedUserUtilsContext } from "@/context/";
import { messageReducer } from "@/reducers/messageReducer";

function ChatApp() {
  // REVIEW_COMMENTS: implemented a SelectedUserContext here via React.createContext, avoid props drilling
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCompactMode, setIsCompactMode] = useState(false);

  const initalMessageState = {
    messages: {},
    isEditMode: false,
    selectedMessageTimeStamp: null,
  };
  const [messageState, messageDispatch] = useReducer(messageReducer, initalMessageState);
  const selectedUserUtils = {
    selectedUser,
    setSelectedUser,
  };
  const messagesUtils = {
    messageState,
    messageDispatch,
  };
  const compactModeUtils = {
    isCompactMode,
    setIsCompactMode,
  };
  /**
   * REVIEW_COMMENTS:
   * BEM naming convention for CSS selectors.
   * good naming convention - chat-app__container
   */
  return (
    <SelectedUserUtilsContext.Provider value={selectedUserUtils}>
      <MessagesUtilContext.Provider value={messagesUtils}>
        <CompactModeUtilContext.Provider value={compactModeUtils}>
          <div className="chat-app__container">
            <SideBar />
            {selectedUser ? <ChatRoom key={selectedUser.id} /> : <UnselectedChat />}
          </div>
        </CompactModeUtilContext.Provider>
      </MessagesUtilContext.Provider>
    </SelectedUserUtilsContext.Provider>
  );
}

export default ChatApp;
