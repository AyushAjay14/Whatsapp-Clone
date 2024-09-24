import { Dispatch } from "react";

export type Message = { text: string; timeStamp: string };

export type Messages = Record<string, Message[]>;
export type MessageStateType = {
  messages: Messages;
  isEditMode: boolean;
  selectedMessageTimeStamp: string | null;
};
export type MessagesContextType = {
  messageState: MessageStateType;
  messageDispatch: Dispatch<any>;
};
