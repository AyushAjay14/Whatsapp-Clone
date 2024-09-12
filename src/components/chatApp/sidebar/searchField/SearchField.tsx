import "./searchField.css";

function SearchField() {
  return (
    <div className="searchFieldWrapper">
      <div className="searchIconWrapper">
        <i className="bx bx-search-alt-2 searchIcon" />
      </div>
      <input type="text" placeholder="Search or start a new chat" />
    </div>
  );
}

export default SearchField;
