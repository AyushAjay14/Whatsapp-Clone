import "./messageList.css";
import { CompactModeUtils, DeleteDialogUtils, MessagesUtils, SelectedUserUtils } from "@/context/";
import { updateMessagesInLocalStorage } from "@/utils";
import { useEffect, useRef, useState } from "react";
import EditMessageDialog from "../editMessageDialog/EditMessageDialog";

function MessageList() {
  const { selectedUser } = SelectedUserUtils();
  const { messages, setMessages } = MessagesUtils();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editMessageTimestamp, setEditMessageTimestamp] = useState("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [selectedMessageTimeStamp, setSelectedMessageTimeStamp] = useState<string | null>(null);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const { confirmDelete, setConfirmDelete, setShowDeleteDialog } = DeleteDialogUtils();
  const { isCompactMode } = CompactModeUtils();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser && confirmDelete && deleteMessage) {
      const currentUserMessageList = messages[selectedUser.id].filter((message) => message.timeStamp !== selectedMessageTimeStamp);
      const newMessage = {
        ...messages,
        [selectedUser.id]: currentUserMessageList,
      };
      setMessages(newMessage);
      updateMessagesInLocalStorage(newMessage);
      setShowDeleteDialog(false);
      setSelectedMessageTimeStamp(null);
      setConfirmDelete(false);
      setDeleteMessage(false);
    }
  }, [confirmDelete, deleteMessage]);

  function handleEditMessage(event: React.MouseEvent<HTMLButtonElement>) {
    setShowEditDialog(true);
    setEditMessageTimestamp(event.currentTarget.id);
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
      {showEditDialog && <EditMessageDialog editMessageTimestamp={editMessageTimestamp} setShowEditDialog={setShowEditDialog} />}
      {selectedUser &&
        messages[selectedUser.id]?.map((message, index) => (
          <div key={message.timeStamp} ref={index === messages[selectedUser.id].length - 1 ? lastMessageRef : null} className="message__container">
            <div className="button-group">
              <button
                className="button"
                id={message.timeStamp}
                onClick={() => {
                  setShowDeleteDialog(true), setDeleteMessage(true);
                  setSelectedMessageTimeStamp(message.timeStamp);
                }}
              >
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
          </div>
        ))}
    </div>
  );
}

export default MessageList;
