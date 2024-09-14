import "./contacts.css";
import { SelectedUserUtilsContext } from "@/context/";
import { useContext } from "react";
import ContactList from "./ContactList";
import {CONNECTIONS} from '@/constant/connections'

function Contacts() {
  const setSelectedUser = useContext(SelectedUserUtilsContext);
  // function Contacts({ setselectedUser }: { setselectedUser: Function }) {
  /**
   * REVIEW_COMMENT:
   * 1. why Contacts component is responsible for setting the selected user.
   * 2. avoid any
   * 3. this component should provide that this user is selected, now parent will do whatever business/logic it wants to do.
   */
  const handleClickOnUserContact = (event: React.MouseEvent<HTMLElement>) => {
    const user = CONNECTIONS.find(
      (connection) => connection.id === event.currentTarget.id
    );
    if(user) setSelectedUser(user);
  };

  /**
   * wrapper <--> container
   */
  return (
    <>
      <ContactList handleClickOnUserContact={handleClickOnUserContact}/>
    </>
  );
}

export default Contacts;
