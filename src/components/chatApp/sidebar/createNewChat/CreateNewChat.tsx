import { useState } from "react";
import "./createNewChat.css";
import ConfirmationBox from "../../confirmationBox/ConfirmationBox";
import { ConnectionsUtils } from "@/context";

function CreateNewChat() {
  const [editText, setEditText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { connectionDispatch } = ConnectionsUtils();

  function handleStartnewChat() {
    setIsModalVisible(true);
  }
  function handleConfirmButton() {
    connectionDispatch({ type: "CREATE_CONVERSATION", payload: { editText } });
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
          <button
            onClick={() => {
              setIsModalVisible(false), setEditText("");
            }}
            className="confirmation-box-left-button"
          >
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
