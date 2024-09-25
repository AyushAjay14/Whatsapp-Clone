import { lazy, Suspense } from "react";
import "./messageList.css";
import { MessagesUtils, SelectedUserUtils } from "@/context/";
import Loading from "../../loading/Loading";
const MessageItem = lazy(() => import("./MessageItem"));

function MessageList() {
  const { selectedUser } = SelectedUserUtils();
  const { messageState } = MessagesUtils();
  const { messages } = messageState;
  /**
   * REVIEW_COMMENTS: self closing tag if there is nothing in between. JSX syntax, this is not HTML syntax.
   */
  return (
    <div className="message-list__container">
      <p className="starter-text-message">
        <i className="bx bxs-lock-alt" />
        Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Click to learn more.
      </p>
      <div className="messageList__container">
        {selectedUser &&
          messages[selectedUser.id]?.map((message, index) => (
            <Suspense key={message.timeStamp} fallback={<Loading />}>
              <MessageItem selectedUser={selectedUser} message={message} index={index} />
            </Suspense>
          ))}
      </div>
    </div>
  );
}

export default MessageList;
