import { useState } from "react";
import "./chatApp.css";
import SideBar from "./sidebar/SideBar";
import UnselectedChat from "./unselectedChatSection/UnselectedChat";
import ChatRoom from "./chatRoom/ChatRoom";
import { User } from "@/types/types";
import { CONNECTIONS } from "@/constant/connections";
import {
  SelectedUserContext,
  HandleClickOnUserContext,
} from "@/context/context";

function ChatApp() {
  // REVIEW_COMMENTS: implemented a SelectedUserContext here via React.createContext, avoid props drilling
  const [selectedUser, setselectedUser] = useState<User | null>(null);

  function handleClickOnUserContact(event: React.MouseEvent<HTMLElement>) {
    // not a constant thing throughout the app, so no compital identifier (Done)
    const user = CONNECTIONS.find(
      (connection) => connection.id === event.currentTarget.id
    );
    setselectedUser(user as User);
  }
  /**
   * REVIEW_COMMENTS:
   * BEM naming convention for CSS selectors.
   * good naming convention - chat-app__container
   */
  return (
    <SelectedUserContext.Provider value={selectedUser}>
      <HandleClickOnUserContext.Provider value={handleClickOnUserContact}>
        <div className="chat-app__container">
          <SideBar />
          {selectedUser ? <ChatRoom /> : <UnselectedChat />}
        </div>
      </HandleClickOnUserContext.Provider>
    </SelectedUserContext.Provider>
  );
}

export default ChatApp;
