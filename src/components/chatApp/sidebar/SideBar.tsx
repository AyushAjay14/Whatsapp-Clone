import "./sideBar.css";
import Profile from "./profile/Profile";
import SearchField from "./searchField/SearchField";
import Contacts from "./contacts/Contacts";
import CreateNewChat from "./createNewChat/CreateNewChat";
import { useLayoutEffect, useState } from "react";
import { ConnectionsUtilsContext, MessagesUtils } from "@/context";
import { Connection } from "@/types";
import {
  getConnectionsFromLocalStorage,
  getMessagesFromLocalStorage,
} from "@/utils";

function SideBar() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { setMessages } = MessagesUtils();

  useLayoutEffect(() => {
    const localStorageConnections = getConnectionsFromLocalStorage();
    setConnections(localStorageConnections);
    const localStorageMessages = getMessagesFromLocalStorage();
    setMessages(localStorageMessages);
  }, []);

  const contextValue = {
    connections,
    setConnections,
  };

  return (
    <div className="sidebar__container">
      <ConnectionsUtilsContext.Provider value={contextValue}>
        <Profile />
        <SearchField />
        <Contacts />
        <CreateNewChat />
      </ConnectionsUtilsContext.Provider>
    </div>
  );
}

export default SideBar;
