import { useState } from "react";
import "./newChatDialog.css";
import { ConnectionsUtils } from "@/context";
import { PORFILE_IMG } from "@/constant/";
import { updateConnectionsInLocalStorage } from "@/utils";

function NewChatDialog({ setShowDialog }: { setShowDialog: (showDialog: boolean) => void }) {
  const [name, setNewName] = useState("");
  const { connections, setConnections } = ConnectionsUtils();
  function handleAddNewConnection() {
    let id = 0;
    if (connections && connections.length) {
      id = connections[connections.length - 1].id + 1;
    }
    const newConnectionArray = [
      ...connections,
      { id, name, profileImg: PORFILE_IMG },
    ];
    setConnections(newConnectionArray);
    updateConnectionsInLocalStorage(newConnectionArray);
    setNewName("");
    setShowDialog(false);
  }
  return (
    <div className="new-chat-dialog__container">
      <input
        type="text"
        placeholder="Type the name"
        className="new-chat-dialog__input"
        onChange={(e) => setNewName(e.target.value)}
      />
      <div className="new-chat-dialog__btn__container">
        <button
          className="new-chat-dialog__btn"
          onClick={() => setShowDialog(false)}
        >
          Cancel
        </button>
        <button
          className="new-chat-dialog__btn"
          onClick={handleAddNewConnection}
        >
          Start new chat
        </button>
      </div>
    </div>
  );
}

export default NewChatDialog;
