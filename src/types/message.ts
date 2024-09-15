export type Message = { text: string; timeStamp: string };

export type Messages = Record<string, Message[]>;

export type MessagesContextType = {
  messages: Messages;
  setMessages: (messages: Messages) => void;
};
