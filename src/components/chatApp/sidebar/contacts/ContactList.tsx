import { CompactModeUtils, ConnectionsUtils, DeleteDialogUtils, MessagesUtils, SelectedUserUtils } from "@/context";
import Tooltip from "./tooltip/Tooltip";
import { useState, useEffect } from "react";
import { updateConnectionsInLocalStorage, updateMessagesInLocalStorage } from "@/utils";

function ContactList({ handleClickOnUserContact }: { handleClickOnUserContact: (event: React.MouseEvent<HTMLElement>) => void }) {
  
  const { selectedUser, setSelectedUser } = SelectedUserUtils();
  const { connections, setConnections } = ConnectionsUtils();
  const { messages, setMessages } = MessagesUtils();
  const [hoveredContactId, setHoveredContactId] = useState<number | null>(null);
  const [selectedConnectionid, setSelectedConnectionId] = useState<number | null>(null);
  const [deleteConversation, setDeleteConversation] = useState(false);
  const { confirmDelete, setConfirmDelete, setShowDeleteDialog } = DeleteDialogUtils();
  const { isCompactMode } = CompactModeUtils();

  useEffect(() => {
    if (confirmDelete && selectedConnectionid !== null && deleteConversation) {
      setShowDeleteDialog(false);
      const newMessages = { ...messages };
      delete newMessages[selectedConnectionid];
      updateMessagesInLocalStorage(newMessages);
      setMessages(newMessages);
      const newConnections = connections.filter((connection) => connection.id !== selectedConnectionid);
      updateConnectionsInLocalStorage(newConnections);
      setConnections(newConnections);
      setConfirmDelete(false);
      setDeleteConversation(false);
      if (selectedUser?.id === selectedConnectionid) setSelectedUser(null);
    }
  }, [confirmDelete, deleteConversation]);

  return (
    <>
      {connections.map((connection) => {
        const lastMessage = messages[connection.id]?.at(-1)?.text;
        return (
          <div key={connection.id} id={`${connection.id}`} className="contact__container" onClick={handleClickOnUserContact} onMouseEnter={() => setHoveredContactId(connection.id)} onMouseLeave={() => setHoveredContactId(null)}>
            <button
              id={`${connection.id}`}
              className="button delete-conversation__btn"
              onClick={(event) => {
                setShowDeleteDialog(true), setSelectedConnectionId(connection.id), setDeleteConversation(true), event.stopPropagation();
              }}
            >
              Delete
            </button>
            {messages[connection.id]?.at(-1)?.text && connection.id === hoveredContactId && <Tooltip connection={connection} />}
            <div>
              <img className="profile-photo__img" src={connection.profileImg} alt="" />
            </div>
            <div className="content__container">
              <h2>{connection.name}</h2>
              {!isCompactMode && messages[connection.id]?.at(-1) && <p className="truncate-text">{lastMessage}</p>}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
