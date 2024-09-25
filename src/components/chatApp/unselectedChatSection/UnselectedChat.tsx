import { memo } from "react";
import "./unselectedChat.css";

const UnselectedChat = memo(function UnselectedChat() {
  return (
    <div className="chat-section__container">
      <div className="chat-section__image__container">
        <img src="/src/assets/images/entry-image-dark.png" alt="" />
      </div>
      <div className="whatsapp-description__container">
        <h2>WhatsApp Web</h2>
        <p>Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
      </div>
      <div className="bottom-content__container">
        <i className="bx bxs-lock-alt" />
        <p>Your personal messages are end-to-end encrypted</p>
      </div>
    </div>
  );
});

export default UnselectedChat;
