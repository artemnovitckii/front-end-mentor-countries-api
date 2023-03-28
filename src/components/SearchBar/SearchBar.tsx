import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./SearchBar.scss";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");
  const { dark } = useContext(ThemeContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form className={`search ${dark ? "dark-mode" : ""}`}>
      <div className="search__field">
        <input
          className="search__field__input"
          id="search-input"
          placeholder="Search for a country"
          type="text"
          value={query}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon
          className="search__field__icon"
          icon={solid("magnifying-glass")}
        />
      </div>
    </form>
  );
};

export default SearchBar;
