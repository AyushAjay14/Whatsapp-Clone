import { useState } from "react";
import NewChatDialog from "../newChatDialog/NewChatDialog";
import "./createNewChat.css";

function CreateNewChat() {

  const [showDialog, setShowDialog] = useState(false);
  
  function handleStartnewChat() {
    setShowDialog(true);
  }

  return (
    <>
      <div className="new-chat__container">
        <button className="new-chat__button" onClick={handleStartnewChat}>
          <i className="bx bxs-message-add bx-md new-chat__icon" />
          Start new Conversation
        </button>
      </div>
      {showDialog && <NewChatDialog setShowDialog={setShowDialog} />}
    </>
  );
}

export default CreateNewChat;
