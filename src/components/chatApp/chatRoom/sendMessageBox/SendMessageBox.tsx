import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "@/assets/icons/Icons";
import "./sendMessageBox.css";
import { MessagesUtils, SelectedUserUtils } from "@/context/";

function SendMessageBox() {
  const [inputMessage, setInputMessage] = useState("");
  const { selectedUser } = SelectedUserUtils();
  const { messageDispatch } = MessagesUtils();

  function handleSendMessage() {
    if (inputMessage.length > 0 && selectedUser) {
      messageDispatch({ type: "ADD_MESSAGE", payload: { inputMessage, selectedUser } });
    }
    setInputMessage("");
  }

  return (
    <div className="message-box__container">
      <div className="message-box-secondary__container">
        <AttachmentIcon />
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          className="send-message-box"
          /**
           * REVIEW_COMMENTS: there is a concept of debounce pls check that as well
           */
          onChange={(event) => setInputMessage(event.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <SendButtonIcon />
        </button>
      </div>
    </div>
  );
}

export default SendMessageBox;
