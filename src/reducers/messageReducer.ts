import { MessageStateType } from "@/types/message";
import { MessageAction } from "@/types/reducer";
import { updateMessagesInLocalStorage } from "@/utils";

export function messageReducer(state: MessageStateType, action: MessageAction) {
  switch (action.type) {
    case "SET_SELECTED_MESSAGE_TIMESTAMP":
      return { ...state, selectedMessageTimeStamp: action.payload };
    case "SET_EDIT_MODE":
      return { ...state, isEditMode: action.payload };
    case "ADD_MESSAGE": {
      const timeStamp = new Date().toTimeString().split(" ")[0];
      const { selectedUser, inputMessage } = action.payload;
      const existingMessages = state.messages[selectedUser.id] || [];

      const lastMessage = existingMessages[existingMessages.length - 1];
      if (lastMessage && lastMessage.text === inputMessage && lastMessage.timeStamp === timeStamp) {
        return state;
      }
      const newMessageArray = [...existingMessages, { text: inputMessage, timeStamp }];
      const newMessages = { ...state.messages, [selectedUser.id]: newMessageArray };
      updateMessagesInLocalStorage(newMessages);

      return { ...state, messages: newMessages };
    }
    case "DELETE_MESSAGE": {
      const currentUserMessageList = state.messages[action.payload.selectedUser.id].filter((message) => message.timeStamp !== state.selectedMessageTimeStamp);
      const newMessages = {
        ...state.messages,
        [action.payload.selectedUser.id]: currentUserMessageList,
      };
      updateMessagesInLocalStorage(newMessages);
      return { ...state, messages: newMessages };
    }
    case "EDIT_MESSAGE": {
      const updatedMessages = state.messages[action.payload.selectedUser.id]?.map((message) => {
        if (message.timeStamp === state.selectedMessageTimeStamp) {
          return { ...message, text: action.payload.editText };
        }
        return message;
      });

      const newMessages = {
        ...state.messages,
        [action.payload.selectedUser.id]: updatedMessages,
      };
      updateMessagesInLocalStorage(newMessages);
      return { ...state, messages: newMessages };
    }
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };
    case "DELETE_CONVERSATION": {
      const newMessages = { ...state.messages };
      delete newMessages[action.payload.selectedConnectionid];
      updateMessagesInLocalStorage(newMessages);
      return { ...state, messages: newMessages };
    }
    case "RESET_STATE":
      return { ...state, isEditMode: false, selectedMessageTimeStamp: null };

    default:
      return state;
  }
}
