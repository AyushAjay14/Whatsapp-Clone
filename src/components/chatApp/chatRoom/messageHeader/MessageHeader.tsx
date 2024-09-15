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
      <div className="user-name__container">
        {selectedUser && selectedUser.name}
      </div>
      <div className="seach-option__container">
        <i className="bx bx-search-alt-2" />
        <i className="bx bx-dots-vertical-rounded" />
      </div>
    </div>
  );
}

export default MessageHeader;
