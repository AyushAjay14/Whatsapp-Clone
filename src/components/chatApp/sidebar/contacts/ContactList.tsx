import { ConnectionsUtils, MessagesUtils } from "@/context";
import Tooltip from "./tooltip/Tooltip";
import { useState } from "react";

function ContactList({
  handleClickOnUserContact,
}: {
  handleClickOnUserContact: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const { connections } = ConnectionsUtils();
  const { messages } = MessagesUtils();
  const [hoveredContactId, setHoveredContactId] = useState<number | null>(null);
  return (
    <>
      {connections.map((connection) => {
        const lastMessage = messages[connection.id]?.at(-1)?.text;
        return (
          <div
            key={connection.id}
            id={`${connection.id}`}
            className="contact__container"
            onClick={handleClickOnUserContact}
            onMouseEnter={() => setHoveredContactId(connection.id)}
            onMouseLeave={() => setHoveredContactId(null)}
          >
            {messages[connection.id]?.at(-1)?.text &&
              connection.id === hoveredContactId && (
                <Tooltip connection={connection} />
              )}
            <div>
              <img
                className="profile-photo__img"
                src={connection.profileImg}
                alt=""
              />
            </div>
            <div className="content__container">
              <h2>{connection.name}</h2>
              {messages[connection.id]?.at(-1) && (
                <p className="truncate-text">{lastMessage}</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ContactList;
