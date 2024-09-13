import { useMemo, useState } from "react";
import "./chatApp.css";
import SideBar from "./sidebar/SideBar";
import UnselectedChat from "./unselectedChatSection/UnselectedChat";
import ChatRoom from "./chatRoom/ChatRoom";
import { User } from "@/types/";
import {
  SelectedUserContext,
  SelectedUserUtilsContext,
} from "@/context/";

function ChatApp() {
  // REVIEW_COMMENTS: implemented a SelectedUserContext here via React.createContext, avoid props drilling
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectedUserUtils = useMemo(() => setSelectedUser, [setSelectedUser]);
  /**
   * REVIEW_COMMENTS:
   * BEM naming convention for CSS selectors.
   * good naming convention - chat-app__container
   */
  return (
    <SelectedUserContext.Provider value={selectedUser}>
      <SelectedUserUtilsContext.Provider value={selectedUserUtils}>
        <div className="chat-app__container">
          <SideBar />
          {selectedUser ? <ChatRoom /> : <UnselectedChat />}
        </div>
      </SelectedUserUtilsContext.Provider>
    </SelectedUserContext.Provider>
  );
}

export default ChatApp;
