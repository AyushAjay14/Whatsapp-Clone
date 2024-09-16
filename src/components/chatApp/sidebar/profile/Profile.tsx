import { DarkModeIcon, NoNotificationIcon, MoreOptionsIcon, NewChatIcon, OpenStatusIcon, CloseIcon } from "@/assets/icons/Icons";

import "./profile.css";
import { CompactModeUtils } from "@/context";

function Profile() {
  const { isCompactMode, setIsCompactMode } = CompactModeUtils();
  return (
    // no need for this extra div
    <>
      <div className="profile-container">
        <div className="profile-image">
          <img src="/src/assets/images/profile.png" alt="" />
        </div>
        <div className="profile-options">
          <DarkModeIcon />
          <OpenStatusIcon />
          <NewChatIcon />
          <MoreOptionsIcon />
          <button className="mode__btn" onClick={() => setIsCompactMode(!isCompactMode)}>
            {isCompactMode ? "Spacious Mode" : "Compact Mode"}
          </button>
        </div>
      </div>
      <div className="description-box__notification">
        <div className="no-wifi-icon__container">
          <NoNotificationIcon />
        </div>
        {/* 
          css naming selectors is incorrect. we cannot define selectors based on the content rendered inside the element
          try to define generic thing.
        */}
        <div className="description-box">
          <CloseIcon />
          <p className="description-box__text">No Contacts</p>
          <p className="extra-description">
            You can import Contacts from Google{" "}
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              {" "}
              Learn more.{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
