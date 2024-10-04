import { ChangeEventHandler, Dispatch, ReactNode, SetStateAction } from "react";
import "./confirmationBox.css";

const ConfirmationBox = ({ children, isModalVisible }: { children: ReactNode; isModalVisible: boolean }) => {
  return (
    <div className="confirmation-box__overlay" style={{ display: isModalVisible ? "flex" : "none" }}>
      <div role="confirmation-box" className="confirmation-box">
        {children}
      </div>
    </div>
  );
};
const Header = ({ children }: { children: ReactNode }) => {
  return <div className="confirmationbox-header">{children}</div>;
};

const Body = ({ editText, setEditText }: { editText: string; setEditText: Dispatch<SetStateAction<string>> }) => {
  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditText(e.target.value);
  };
  return (
    <div className="confirmationbox-body">
      <input role="modal-input" onChange={handleInput} className="confirmation-box-input" contentEditable="true" placeholder="Type a message" value={editText}></input>
    </div>
  );
};

const Footer = ({ children }: { children: ReactNode }) => {
  return <div className="confirmationbox-footer">{children}</div>;
};

ConfirmationBox.Header = Header;
ConfirmationBox.Body = Body;
ConfirmationBox.Footer = Footer;
export default ConfirmationBox;
