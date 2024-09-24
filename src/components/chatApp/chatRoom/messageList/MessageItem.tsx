import { useEffect, useRef, useState } from "react";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import { CompactModeUtils, MessagesUtils } from "@/context";
import { Message } from "@/types/message";
import { User } from "@/types";

function MessageItem({ message, index, selectedUser }: { message: Message; index: number; selectedUser: User }) {
  const { isCompactMode } = CompactModeUtils();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [editText, setEditText] = useState("");
  const { messageState, messageDispatch } = MessagesUtils();
  const { messages, isEditMode } = messageState;

  function handleOnDelete(message: Message) {
    messageDispatch({ type: "SET_SELECTED_MESSAGE_TIMESTAMP", payload: message.timeStamp });
    setIsModalVisible(true);
  }
  function handleEditMessage(event: React.MouseEvent<HTMLButtonElement>) {
    messageDispatch({ type: "TOGGLE_MODAL", payload: true });
    messageDispatch({ type: "SET_EDIT_MODE", payload: true });
    messageDispatch({ type: "SET_SELECTED_MESSAGE_TIMESTAMP", payload: event.currentTarget.id });
    setIsModalVisible(true);
  }

  function handleConfirmButton() {
    if (isEditMode && selectedUser && editText.length) {
      messageDispatch({ type: "EDIT_MESSAGE", payload: { selectedUser, editText } });
    } else {
      if (selectedUser) {
        messageDispatch({ type: "DELETE_MESSAGE", payload: { selectedUser } });
      }
    }
    messageDispatch({ type: "RESET_STATE" });
    setIsModalVisible(false);
    setEditText("");
  }
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      <div key={message.timeStamp} ref={index === messages[selectedUser.id].length - 1 ? lastMessageRef : null} className="message__container">
        <div className="button-group">
          <button className="button" id={message.timeStamp} onClick={() => handleOnDelete(message)}>
            Delete
          </button>
          <button className="button" id={message.timeStamp} onClick={handleEditMessage}>
            Edit
          </button>
        </div>
        <div className="message">
          <p>{message.text}</p>
          <span className="timestamp-gap" />
          {!isCompactMode && <p className="timestamp">{message.timeStamp.slice(0, 5)}</p>}
        </div>
        <ConfirmationBox isModalVisible={isModalVisible}>
          <ConfirmationBox.Header>
            <h2>{isEditMode ? "Edit Message" : "Are you sure you want to Delete?"}</h2>
          </ConfirmationBox.Header>
          {isEditMode && <ConfirmationBox.Body editText={editText} setEditText={setEditText} />}
          <ConfirmationBox.Footer>
            <button onClick={() => setIsModalVisible(false)} className="confirmation-box-left-button">
              CANCEL
            </button>
            <button onClick={handleConfirmButton} className="confirmation-box-right-button">
              CONFIRM
            </button>
          </ConfirmationBox.Footer>
        </ConfirmationBox>
      </div>
    </>
  );
}

export default MessageItem;
