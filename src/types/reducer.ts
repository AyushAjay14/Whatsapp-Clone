import { Connection } from "./connection";
import { Message } from "./message";
import { User } from "./user";
// import { Message,  } from "@/types/message";
export type ConnectionStateType = {
  connections: Connection[];
};

type Action<Type, Payload> = {
  type: Type;
  payload: Payload;
};

type LoadConnectionsAction = Action<"LOAD_CONNECTIONS", Connection[]>;
type DeleteConversationAction = Action<"DELETE_CONVERSATION", number>;
type CreateConversationAction = Action<"CREATE_CONVERSATION", { editText: string }>;

export type ConnectionAction = LoadConnectionsAction | DeleteConversationAction | CreateConversationAction;

// Streamlined Action Definitions
export type MessageAction = Action<"SET_SELECTED_MESSAGE_TIMESTAMP", string | null> | Action<"SET_EDIT_MODE", boolean> | Action<"ADD_MESSAGE", { selectedUser: User; inputMessage: string }> | Action<"DELETE_MESSAGE", { selectedUser: User }> | Action<"EDIT_MESSAGE", { selectedUser: User; editText: string }> | Action<"LOAD_MESSAGES", Record<string, Message[]>> | Action<"DELETE_CONVERSATION", { selectedConnectionid: string | number }> | Action<"RESET_STATE", null>;
