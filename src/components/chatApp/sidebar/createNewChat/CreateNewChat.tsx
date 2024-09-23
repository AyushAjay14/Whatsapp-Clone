import { useState } from "react";
import "./createNewChat.css";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import { ConnectionsUtils } from "@/context";
import { updateConnectionsInLocalStorage } from "@/utils";
import { PORFILE_IMG } from "@/constant";

function CreateNewChat() {
  const [editText, setEditText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { connections, setConnections } = ConnectionsUtils();

  function handleStartnewChat() {
    setIsModalVisible(true);
  }
  function handleConfirmButton() {
    let id = 0;
    if (connections && connections.length) {
      id = connections[connections.length - 1].id + 1;
    }
    const newConnectionArray = [...connections, { id, name: editText, profileImg: PORFILE_IMG }];
    setConnections(newConnectionArray);
    updateConnectionsInLocalStorage(newConnectionArray);
    setEditText("");
    setIsModalVisible(false);
  }

  return (
    <>
      <div className="new-chat__container">
        <button className="new-chat__button" onClick={handleStartnewChat}>
          <i className="bx bxs-message-add bx-md new-chat__icon" />
          Start new Conversation
        </button>
      </div>
      <ConfirmationBox isModalVisible={isModalVisible}>
        <ConfirmationBox.Header>{"Enter Username"}</ConfirmationBox.Header>
        <ConfirmationBox.Body editText={editText} setEditText={setEditText} />
        <ConfirmationBox.Footer>
          <button onClick={() => setIsModalVisible(false)} className="confirmation-box-left-button">
            CANCEL
          </button>
          <button onClick={handleConfirmButton} className="confirmation-box-right-button">
            SAVE
          </button>
        </ConfirmationBox.Footer>
      </ConfirmationBox>
    </>
  );
}

export default CreateNewChat;
