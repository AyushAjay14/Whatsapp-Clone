import { createContext, useContext } from "react";
import { CompactModeContextType, ConnectionsContextType } from "@/types/";
import { MessagesContextType } from "@/types/";
import { SelectedUserContextType } from "@/types/";

export const SelectedUserUtilsContext = createContext<SelectedUserContextType>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export const ConnectionsUtilsContext = createContext<ConnectionsContextType>({
  connectionState: { connections: [] },
  connectionDispatch: () => {},
});

export const MessagesUtilContext = createContext<MessagesContextType>({
  messageState: { messages: {}, isEditMode: false, selectedMessageTimeStamp: null },
  messageDispatch: () => {},
});

export const CompactModeUtilContext = createContext<CompactModeContextType>({
  isCompactMode: false,
  setIsCompactMode: () => {},
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

export function CompactModeUtils() {
  return useContext(CompactModeUtilContext);
}
