import "./messageList.css";
import { CompactModeUtils, MessagesUtils, SelectedUserUtils } from "@/context/";
import { updateMessagesInLocalStorage } from "@/utils";
import { useEffect, useRef, useState } from "react";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import { Message } from "@/types/message";

function MessageList() {
  const { selectedUser } = SelectedUserUtils();
  const { messages, setMessages } = MessagesUtils();
  const [editMessageTimestamp, setEditMessageTimestamp] = useState("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [selectedMessageTimeStamp, setSelectedMessageTimeStamp] = useState<string | null>(null);
  const { isCompactMode } = CompactModeUtils();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editText, setEditText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleOnDelete(message: Message) {
    setSelectedMessageTimeStamp(message.timeStamp);
    setIsModalVisible(true);
  }
  function handleEditMessage(event: React.MouseEvent<HTMLButtonElement>) {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditMessageTimestamp(event.currentTarget.id);
  }
  function handleConfirmButton() {
    if (isEditMode && selectedUser && editText.length) {
      const updatedMessages = messages[selectedUser.id]?.map((message) => {
        if (message.timeStamp === editMessageTimestamp) {
          return { ...message, text: editText };
        }
        return message;
      });

      const newMessages = {
        ...messages,
        [selectedUser.id]: updatedMessages,
      };
      setMessages(newMessages);
      updateMessagesInLocalStorage(newMessages);
      setIsEditMode(false);
      setIsModalVisible(false);
    } else {
      if (selectedUser) {
        const currentUserMessageList = messages[selectedUser.id].filter((message) => message.timeStamp !== selectedMessageTimeStamp);
        const newMessage = {
          ...messages,
          [selectedUser.id]: currentUserMessageList,
        };
        setMessages(newMessage);
        updateMessagesInLocalStorage(newMessage);
        setIsModalVisible(false);
        setSelectedMessageTimeStamp(null);
      }
    }
    setEditText("");
  }
  /**
   * REVIEW_COMMENTS: self closing tag if there is nothing in between. JSX syntax, this is not HTML syntax.
   */
  return (
    <div className="message-list__container">
      <p className="starter-text-message">
        <i className="bx bxs-lock-alt" />
        Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
      </p>
      {selectedUser &&
        messages[selectedUser.id]?.map((message, index) => (
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
        ))}
    </div>
  );
}

export default MessageList;
