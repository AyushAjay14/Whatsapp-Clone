import { messageReducer } from "@/reducers/messageReducer";
import { MessageStateType } from "@/types/message";
import { MessageAction } from "@/types/reducer";
import { updateMessagesInLocalStorage } from "@/utils";
import { User } from "@/types/user"; // Assuming User is defined somewhere

jest.mock("@/utils", () => ({
  updateMessagesInLocalStorage: jest.fn(),
}));

describe("messageReducer", () => {
  let initialState: MessageStateType;

  beforeEach(() => {
    initialState = {
      selectedMessageTimeStamp: null,
      isEditMode: false,
      messages: {
        0: [{ text: "Hello", timeStamp: "10:00:00" }],
        1: [{ text: "Hello", timeStamp: "10:02:00" }],
      },
    };
  });

  test("should set selected message timestamp", () => {
    const action: MessageAction = { type: "SET_SELECTED_MESSAGE_TIMESTAMP", payload: "10:01:00" };
    const state = messageReducer(initialState, action);

    expect(state.selectedMessageTimeStamp).toBe("10:01:00");
  });

  test("should set edit mode", () => {
    const action: MessageAction = { type: "SET_EDIT_MODE", payload: true };
    const state = messageReducer(initialState, action);

    expect(state.isEditMode).toBe(true);
  });

  test("should add a message", () => {
    const action: MessageAction = {
      type: "ADD_MESSAGE",
      payload: { selectedUser: { id: 0 } as User, inputMessage: "New message" },
    };

    const mockDate = new Date("2024-10-03T10:02:00");
    jest.spyOn(globalThis, "Date").mockImplementation(() => mockDate);

    const state = messageReducer(initialState, action);
    expect(state.messages[0]).toEqual([...initialState.messages[0], { text: "New message", timeStamp: "10:02:00" }]);
    expect(updateMessagesInLocalStorage).toHaveBeenCalledWith(state.messages);

    jest.restoreAllMocks();
  });

  test("should delete a message", () => {
    const action: MessageAction = {
      type: "DELETE_MESSAGE",
      payload: { selectedUser: { id: 1 } as User },
    };
    const modifiedState = { ...initialState, selectedMessageTimeStamp: "10:02:00" };
    const state = messageReducer(modifiedState, action);
    expect(state.messages[1]).toEqual([]);
    expect(updateMessagesInLocalStorage).toHaveBeenCalledWith(state.messages);
  });

  test("should edit a message", () => {
    const action: MessageAction = {
      type: "EDIT_MESSAGE",
      payload: { selectedUser: { id: 1 } as User, editText: "Edited message" },
    };
    const modifiedState = { ...initialState, selectedMessageTimeStamp: "10:02:00" };
    const state = messageReducer(modifiedState, action);

    expect(state.messages[1]).toEqual([{ text: "Edited message", timeStamp: "10:02:00" }]);
    expect(updateMessagesInLocalStorage).toHaveBeenCalledWith(state.messages);
  });

  test("should load messages", () => {
    const action: MessageAction = {
      type: "LOAD_MESSAGES",
      payload: { 2: [{ text: "Loaded message", timeStamp: "11:00:00" }] },
    };
    const state = messageReducer(initialState, action);

    expect(state.messages).toEqual({ 2: [{ text: "Loaded message", timeStamp: "11:00:00" }] });
  });

  test("should delete a conversation", () => {
    const action: MessageAction = {
      type: "DELETE_CONVERSATION",
      payload: { selectedConnectionid: 1 },
    };
    const state = messageReducer(initialState, action);

    expect(state.messages[1]).toBeUndefined();
    expect(updateMessagesInLocalStorage).toHaveBeenCalledWith(state.messages);
  });
});
