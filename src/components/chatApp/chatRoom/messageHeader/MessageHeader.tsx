import { SelectedUserUtils } from "@/context/";
import "./messageHeader.css";

function MessageHeader() {
  const { selectedUser } = SelectedUserUtils();

  return (
    <div className="header-container">
      <div className="profile-image">
        <img src={selectedUser?.profileImg} alt="" />
      </div>
      {/* span should not be required here */}
      <p className="user-name">{selectedUser && selectedUser.name}</p>
      <div className="seach-option__container">
        <i className="bx bx-search-alt-2" />
        <i className="bx bx-dots-vertical-rounded" />
      </div>
    </div>
  );
}

export default MessageHeader;
