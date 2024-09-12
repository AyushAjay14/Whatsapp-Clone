import { messages } from "@/types/types";
import "./messageList.css";
import { useSelectedUser } from "@/context/context";

function MessageList({
  messages,
  setMessages,
}: {
  messages: messages;
  setMessages: Function;
}) {
  const selectedUser = useSelectedUser();
  function handleDeleteMessage(event: any) {
    if (selectedUser) {
      const currentUserMessageList = messages[selectedUser.id].filter(
        (message) => message.timeStamp !== event.target.id
      );
      const newMessage = {
        ...messages,
        [selectedUser.id]: currentUserMessageList,
      };
      setMessages(newMessage);
    }
  }

  /**
   * REVIEW_COMMENTS: self closing tag if there is nothing in between. JSX syntax, this is not HTML syntax.
   */
  return (
    <div className="message-list__container">
      <p className="starter-text-message">
        <i className="bx bxs-lock-alt" />
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </p>
      {selectedUser &&
        messages[selectedUser.id]?.map((message: any) => (
          <div key={message.timeStamp} className="message__container">
            <button
              className="delete-button"
              id={message.timeStamp}
              onClick={handleDeleteMessage}
            >
              Delete
            </button>
            <div className="message">
              <p>{message.text}</p>
              <span className="timestamp-gap" />
              <p className="timestamp">{message.timeStamp.slice(0, 5)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MessageList;
