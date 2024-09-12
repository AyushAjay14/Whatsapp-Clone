import { CONNECTIONS } from "@/constant/connections";
import "./styles.css";
import { HandleClickOnUserContext } from "@/context/context";
import { useContext } from "react";

function Contacts() {
  const handleClickOnUserContact = useContext(HandleClickOnUserContext);
  // function Contacts({ setselectedUser }: { setselectedUser: Function }) {
  /**
   * REVIEW_COMMENT:
   * 1. why Contacts component is responsible for setting the selected user.
   * 2. avoid any
   * 3. this component should provide that this user is selected, now parent will do whatever business/logic it wants to do.
   */

  /**
   * wrapper <--> container
   */
  return (
    <div>
      {CONNECTIONS.map((contact) => (
        <div
          key={contact.id}
          id={contact.id}
          className="contact__container"
          onClick={handleClickOnUserContact}
        >
          <div className="profile-photo__container">
            <img src={contact.profileImg} alt="" />
          </div>
          <div className="content__container">
            <h2>{contact.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
