import { useState } from "react";
import "./chatApp.css";
import SideBar from "./sidebar/SideBar";
import UnselectedChat from "./unselectedChatSection/UnselectedChat";
import ChatRoom from "./chatRoom/ChatRoom";
import { User } from "@/types/";
import { CompactModeUtilContext, DeleteDialogUtilContext, MessagesUtilContext, SelectedUserUtilsContext } from "@/context/";

function ChatApp() {
  // REVIEW_COMMENTS: implemented a SelectedUserContext here via React.createContext, avoid props drilling
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);

  const selectedUserUtils = {
    selectedUser,
    setSelectedUser,
  };
  const messagesUtils = {
    messages,
    setMessages,
  };
  const deleteDialogUtils = {
    showDeleteDialog,
    confirmDelete,
    setShowDeleteDialog,
    setConfirmDelete,
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
        <DeleteDialogUtilContext.Provider value={deleteDialogUtils}>
          <CompactModeUtilContext.Provider value={compactModeUtils}>
            <div className="chat-app__container">
              <SideBar />
              {selectedUser ? <ChatRoom key={selectedUser.id} /> : <UnselectedChat />}
            </div>
          </CompactModeUtilContext.Provider>
        </DeleteDialogUtilContext.Provider>
      </MessagesUtilContext.Provider>
    </SelectedUserUtilsContext.Provider>
  );
}

export default ChatApp;
