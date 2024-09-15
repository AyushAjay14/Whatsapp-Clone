import { createContext, useContext } from "react";
import { ConnectionsContextType } from "@/types/connection";
import { MessagesContextType } from "@/types/message";
import { SelectedUserContextType } from "@/types/user";

export const SelectedUserUtilsContext = createContext<SelectedUserContextType>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export const ConnectionsUtilsContext = createContext<ConnectionsContextType>({
  connections: [],
  setConnections: () => {},
});

export const MessagesUtilContext = createContext<MessagesContextType>({
  messages: {},
  setMessages: () => {},
});

export function SelectedUserUtils() {
  return useContext(SelectedUserUtilsContext);
}

export function ConnectionsUtils() {
  return useContext(ConnectionsUtilsContext);
}

export function MessagesUtils() {
  return useContext(MessagesUtilContext);
}
