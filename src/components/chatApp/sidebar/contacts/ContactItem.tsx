import { CompactModeUtils, ConnectionsUtils, MessagesUtils, SelectedUserUtils } from "@/context";
import { Fragment, useEffect, useRef, useState } from "react";
import ConfirmationBox from "@/components/chatApp/confirmationBox/ConfirmationBox";
import { Connection } from "@/types";

function ContactItem({ handleClickOnUserContact, connection }: { handleClickOnUserContact: (event: React.MouseEvent<HTMLElement>) => void; connection: Connection }) {
  const { selectedUser, setSelectedUser } = SelectedUserUtils();
  const { connectionDispatch } = ConnectionsUtils();
  const { messageState, messageDispatch } = MessagesUtils();
  const { messages } = messageState;
  const [hoveredContactId, setHoveredContactId] = useState<number | null>(null);
  const [selectedConnectionid, setSelectedConnectionId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isCompactMode } = CompactModeUtils();
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      console.log(element.scrollWidth, element.clientWidth);
      setIsTruncated(element.scrollWidth > element.clientWidth);
    }
  }, [hoveredContactId]);

  function handleConfirmButton(event: any) {
    event.stopPropagation();
    if (selectedConnectionid !== null) {
      messageDispatch({ type: "DELETE_CONVERSATION", payload: selectedConnectionid });
      connectionDispatch({ type: "DELETE_CONVERSATION", payload: selectedConnectionid });
      if (selectedUser?.id === selectedConnectionid) setSelectedUser(null);
      setIsModalVisible(false);
    }
  }

  function handleMouseEnter(event: React.MouseEvent<HTMLElement>, connectionId: number) {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipHeight = 100;
    const windowHeight = window.innerHeight;
    let tooltipTop = rect.top;
    if (rect.bottom + tooltipHeight > windowHeight) {
      tooltipTop = rect.top - tooltipHeight + 20;
    }
    setTooltipPosition({
      top: tooltipTop,
      left: rect.right,
    });
    setHoveredContactId(connectionId);
  }
  const lastMessage = messages[connection.id]?.at(-1)?.text;
  return (
    <Fragment>
      {messages[connection.id]?.at(-1)?.text && connection.id === hoveredContactId && (
        <p className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left, display: `${isTruncated ? "block" : "none"}` }}>
          {messages[connection.id]?.at(-1)?.text}
        </p>
      )}
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
        <img className="profile-photo__img" src={connection.profileImg} alt="" />
        <div className="content__container">
          <h2>{connection.name}</h2>
          {!isCompactMode && messages[connection.id]?.at(-1) && (
            <p ref={textRef} className="truncate-text">
              {lastMessage}
            </p>
          )}
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
}

export default ContactItem;
