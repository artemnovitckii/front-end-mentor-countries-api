import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./BorderList.scss";

interface BorderListProps {
  country: string;
  countryCode: string;
}

const BorderList: React.FC<BorderListProps> = ({ country, countryCode }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <>
      <Link to={`/country/${countryCode}`}>
        <button
          className={`border-button ${dark ? "dark-mode" : ""}`}
          type="button"
        >
          {country}
        </button>
      </Link>
    </>
  );
};

export default BorderList;
