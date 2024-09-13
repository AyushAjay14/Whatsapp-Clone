import { useState } from "react";
import { AttachmentIcon, SendButtonIcon } from "@/assets/icons/Icons";
import "./sendMessageBox.css";
import { Messages } from "@/types/";
import { useSelectedUser } from "@/context/";

function SendMessageBox({
  messages,
  setMessages,
}: {
  messages: Messages;
  setMessages: Function;
}) {
  const [inputMessage, setInputMessage] = useState("");
  const selectedUser = useSelectedUser();
  function handleSendMessage() {
    if (inputMessage.length > 0 && selectedUser) {
      const timeStamp = new Date().toTimeString().split(" ")[0];
      if (Array.isArray(messages[selectedUser.id])) {
        const newMessageArray = messages[selectedUser.id];
        newMessageArray.push({ text: inputMessage, timeStamp });
        const newMessages = { ...messages, [selectedUser.id]: newMessageArray };
        setMessages(newMessages);
      } else {
        //REVIEW_COMMENTS: The array literal notation [] is preferable.
        const newMessageArray = [];
        newMessageArray.push({ text: inputMessage, timeStamp });
        const newMessages = { ...messages, [selectedUser.id]: newMessageArray };
        setMessages(newMessages);
      }
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
