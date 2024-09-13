import { createContext, useContext } from "react";
import { User } from "@/types/";

export const SelectedUserContext = createContext<User | null>(null);

export const SelectedUserUtilsContext = createContext<(user: User | null) => void>(() => {});

export function useSelectedUser() {
  return useContext(SelectedUserContext);
}

export function SelectedUserUtils() {
  return useContext(SelectedUserUtilsContext);
}
