import { createContext, useContext } from "react";
import { User } from "@/types/types";

export const SelectedUserContext = createContext<User | null>(null);

export const HandleClickOnUserContext = createContext<
  (event: React.MouseEvent<HTMLElement>) => void
>(() => {});

export function useSelectedUser() {
  return useContext(SelectedUserContext);
}

export function useHandleClickOnUser() {
  return useContext(HandleClickOnUserContext);
}
