import "./sideBar.css";
import Profile from "./profile/Profile";
import SearchField from "./searchField/SearchField";
import Contacts from "./contacts/Contacts";
import CreateNewChat from "./createNewChat/CreateNewChat";
import { useEffect, useReducer } from "react";
import { ConnectionsUtilsContext, MessagesUtils } from "@/context";
import { getConnectionsFromLocalStorage, getMessagesFromLocalStorage } from "@/utils";
import { connectionReducer } from "@/reducers/connectionsReducer";

function SideBar() {
  const { messageDispatch } = MessagesUtils();
  const initialConnectionState = {
    connections: [],
  };
  const [connectionState, connectionDispatch] = useReducer(connectionReducer, initialConnectionState);
  useEffect(() => {
    const localStorageConnections = getConnectionsFromLocalStorage();
    connectionDispatch({ type: "LOAD_CONNECTIONS", payload: localStorageConnections });
    const localStorageMessages = getMessagesFromLocalStorage();
    messageDispatch({ type: "LOAD_MESSAGES", payload: localStorageMessages });
  }, []);

  const contextValue = {
    connectionState,
    connectionDispatch,
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
