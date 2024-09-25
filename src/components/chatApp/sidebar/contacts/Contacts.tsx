import { lazy, Suspense } from "react";
import "./contacts.css";
import { ConnectionsUtils, SelectedUserUtils } from "@/context/";
import Loading from "../../loading/Loading";
const ContactItem = lazy(() => import("./ContactItem"));

function Contacts() {
  const { setSelectedUser } = SelectedUserUtils();
  const { connectionState } = ConnectionsUtils();
  const { connections } = connectionState;
  // function Contacts({ setselectedUser }: { setselectedUser: Function }) {
  /**
   * REVIEW_COMMENT:
   * 1. why Contacts component is responsible for setting the selected user.
   * 2. avoid any
   * 3. this component should provide that this user is selected, now parent will do whatever business/logic it wants to do.
   */
  const handleClickOnUserContact = (event: React.MouseEvent<HTMLElement>) => {
    const user = connections.find((connection) => connection.id === +event.currentTarget.id);
    if (user) setSelectedUser(user);
  };

  /**
   * wrapper <--> container
   */
  return (
    <div className="contact-list__container">
      {connections.map((connection) => (
        <Suspense key={connection.id} fallback={<Loading />}>
          <ContactItem connection={connection} handleClickOnUserContact={handleClickOnUserContact} />
        </Suspense>
      ))}
    </div>
  );
}

export default Contacts;
