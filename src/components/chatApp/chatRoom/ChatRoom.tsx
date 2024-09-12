import { useState } from "react";
import MessageHeader from "./messageHeader/MessageHeader";
import MessageList from "./messageList/MessageList";
import SendMessageBox from "./sendMessageBox/SendMessageBox";
import "./chatRoom.css";

function ChatRoom() {
  const [messages, setMessages] = useState({});

  return (
    <div className="chat-section__wrapper">
      <div className="background-image"></div>
      <MessageHeader />
      <MessageList messages={messages} setMessages={setMessages} />
      <SendMessageBox messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default ChatRoom;
