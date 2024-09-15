import { useState } from "react";
import "./editMessageDialog.css";
import { MessagesUtils, SelectedUserUtils } from "@/context";
import { updateMessagesInLocalStorage } from "@/utils";
// import { ConnectionsUtils } from "@/context";
// import { PORFILE_IMG } from "@/constant/";
// import { updateConnectionsInLocalStorage } from "@/utils";

function EditMessageDialog({
  editMessageTimestamp,
  setShowEditDialog,
}: {
  editMessageTimestamp: string;
  setShowEditDialog: (showEditDialog: boolean) => void;
}) {
  const { selectedUser } = SelectedUserUtils();
  const { messages, setMessages } = MessagesUtils();
  const [editedMessage, setEditedmessage] = useState("");

  function handleSaveEditedMessage() {
    if (selectedUser && editedMessage.length) {
      const updatedMessages = messages[selectedUser.id]?.map((message) => {
        if (message.timeStamp === editMessageTimestamp) {
          return { ...message, text: editedMessage };
        }
        return message;
      });

      const newMessages = {
        ...messages,
        [selectedUser.id]: updatedMessages,
      };
      setMessages(newMessages);
      updateMessagesInLocalStorage(newMessages);
    }
    setShowEditDialog(false);
    setEditedmessage("");
  }
  return (
    <div className="edit-chat-dialog__container">
      <input
        type="text"
        placeholder="Type message text"
        className="edit-chat-dialog__input"
        onChange={(e) => setEditedmessage(e.target.value)}
      />
      <div className="edit-chat-dialog__btn__container">
        <button
          className="edit-chat-dialog__btn"
          onClick={() => setShowEditDialog(false)}
        >
          Cancel
        </button>
        <button
          className="edit-chat-dialog__btn"
          onClick={handleSaveEditedMessage}
        >
          Save chat
        </button>
      </div>
    </div>
  );
}

export default EditMessageDialog;
