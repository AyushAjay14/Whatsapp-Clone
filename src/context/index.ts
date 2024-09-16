import { createContext, useContext } from "react";
import { CompactModeContextType, ConnectionsContextType } from "@/types/";
import { MessagesContextType } from "@/types/";
import { SelectedUserContextType } from "@/types/";
import { DeleteDialogContextType } from "@/types/";

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

export const DeleteDialogUtilContext = createContext<DeleteDialogContextType>({
  showDeleteDialog: false,
  setShowDeleteDialog: () => {},
  confirmDelete: false,
  setConfirmDelete: () => {},
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

export function DeleteDialogUtils() {
  return useContext(DeleteDialogUtilContext);
}

export function CompactModeUtils() {
  return useContext(CompactModeUtilContext);
}
