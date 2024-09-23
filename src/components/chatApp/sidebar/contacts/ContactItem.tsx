import { CompactModeUtils, ConnectionsUtils, MessagesUtils, SelectedUserUtils } from "@/context";
import Tooltip from "./tooltip/Tooltip";
import { Fragment, useState } from "react";
import { updateConnectionsInLocalStorage, updateMessagesInLocalStorage } from "@/utils";
import ConfirmationBox from "@/components/chatApp/confirmationBox/ConfirmationBox";

function ContactItem({ handleClickOnUserContact }: { handleClickOnUserContact: (event: React.MouseEvent<HTMLElement>) => void }) {
  const { selectedUser, setSelectedUser } = SelectedUserUtils();
  const { connections, setConnections } = ConnectionsUtils();
  const { messages, setMessages } = MessagesUtils();
  const [hoveredContactId, setHoveredContactId] = useState<number | null>(null);
  const [selectedConnectionid, setSelectedConnectionId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isCompactMode } = CompactModeUtils();
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  function handleConfirmButton(event: any) {
    event.stopPropagation();
    if (selectedConnectionid !== null) {
      const newMessages = { ...messages };
      delete newMessages[selectedConnectionid];
      updateMessagesInLocalStorage(newMessages);
      setMessages(newMessages);
      const newConnections = connections.filter((connection) => connection.id !== selectedConnectionid);
      updateConnectionsInLocalStorage(newConnections);
      setConnections(newConnections);
      if (selectedUser?.id === selectedConnectionid) setSelectedUser(null);
      setIsModalVisible(false);
    }
  }
  function handleMouseEnter(event: React.MouseEvent<HTMLElement>, connectionId: number) {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipHeight = 100;
    const windowHeight = window.innerHeight;

    let tooltipTop = rect.top + window.scrollY - 10;
    if (rect.bottom + tooltipHeight > windowHeight) {
      tooltipTop = rect.top + window.scrollY - tooltipHeight - 20;
    }

    setTooltipPosition({
      top: tooltipTop,
      left: rect.right + 10,
    });
    setHoveredContactId(connectionId);
  }

  return (
    <>
      {connections.map((connection) => {
        const lastMessage = messages[connection.id]?.at(-1)?.text;
        return (
          <Fragment key={connection.id}>
            {messages[connection.id]?.at(-1)?.text && connection.id === hoveredContactId && <Tooltip connection={connection} tooltipPosition={tooltipPosition} />}
            <div key={connection.id} id={`${connection.id}`} className="contact__container" onClick={handleClickOnUserContact} onMouseEnter={(event) => handleMouseEnter(event, connection.id)} onMouseLeave={() => setHoveredContactId(null)}>
              <button
                id={`${connection.id}`}
                className="button delete-conversation__btn"
                onClick={(event) => {
                  setIsModalVisible(true), setSelectedConnectionId(connection.id), event.stopPropagation();
                }}
              >
                Delete
              </button>
              <div>
                <img className="profile-photo__img" src={connection.profileImg} alt="" />
              </div>
              <div className="content__container">
                <h2>{connection.name}</h2>
                {!isCompactMode && messages[connection.id]?.at(-1) && <p className="truncate-text">{lastMessage}</p>}
              </div>
            </div>
            <ConfirmationBox isModalVisible={isModalVisible}>
              <ConfirmationBox.Header>
                <h2>Are you sure you want to Delete?</h2>
              </ConfirmationBox.Header>
              <ConfirmationBox.Footer>
                <button
                  onClick={(event) => {
                    setIsModalVisible(false), event.stopPropagation();
                  }}
                  className="confirmation-box-left-button"
                >
                  CANCEL
                </button>
                <button onClick={handleConfirmButton} className="confirmation-box-right-button">
                  YES
                </button>
              </ConfirmationBox.Footer>
            </ConfirmationBox>
          </Fragment>
        );
      })}
    </>
  );
}

export default ContactItem;
