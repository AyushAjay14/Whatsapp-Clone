import MessageHeader from "./messageHeader/MessageHeader";
import MessageList from "./messageList/MessageList";
import SendMessageBox from "./sendMessageBox/SendMessageBox";
import "./chatRoom.css";

function ChatRoom() {
  return (
    <div className="chat-section__wrapper">
      <div className="background-image"></div>
      <MessageHeader />
      <MessageList />
      <SendMessageBox />
    </div>
  );
}

export default ChatRoom;
