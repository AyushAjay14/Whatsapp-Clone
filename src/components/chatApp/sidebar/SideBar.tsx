import "./sideBar.css";
import Profile from "./profile/Profile";
import SearchField from "./searchField/SearchField";
import Contacts from "./contacts/Contacts";

function SideBar() {
  return (
    <div className="sidebar__container">
      <Profile />
      <SearchField />
      <Contacts />
    </div>
  );
}

export default SideBar;
