import { Message } from "@/types/message";

export function messageReducer(state, action) {
  switch (action.type) {
    case "SET_EDIT_MESSAGE_TIMESTAMP":
      return { ...state, editMessageTimestamp: action.payload };
    case "SET_SELECTED_MESSAGE_TIMESTAMP":
      return { ...state, selectedMessageTimeStamp: action.payload };
    case "TOGGLE_MODAL":
      return { ...state, isModalVisible: action.payload };
    case "SET_EDIT_MODE":
      return { ...state, isEditMode: action.payload };
    case "SET_EDIT_TEXT":
      return { ...state, editText: action.payload };
    case "DELETE_MESSAGE": {
      const updatedMessages = state.messages[action.payload].filter((message: Message) => message.timeStamp !== state.selectedMessageTimeStamp);
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload]: updatedMessages,
        },
      };
    }
    case "EDIT_MESSAGE": {
      const updatedMessages = state.messages[action.payload.timeStamp]?.map((message: Message) => {
        if (message.timeStamp === action.payload.timeStamp) {
          return { ...message, text: action.payload.text };
        }
        return message;
      });
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.timeStamp]: updatedMessages,
        },
      };
    }
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };

    case "RESET_STATE":
      return { ...state, editText: "", isEditMode: false, isModalVisible: false };

    default:
      return state;
  }
}
