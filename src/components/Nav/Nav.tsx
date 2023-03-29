import React, { useContext } from "react";
import "./Nav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ThemeContext } from "../../context/ThemeContext";

interface NavProps {
  title?: string;
}

const Nav: React.FC<NavProps> = ({ title = "Where in the world?" }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navigation-bar ${dark ? "dark-mode" : ""}`}>
      <div className="navigation-bar__title">{title}</div>
      <div className="navigation-bar__dark-mode-toggle">
        <label htmlFor="dark-mode-toggle">
          <FontAwesomeIcon
            size="lg"
            className="navigation-bar__dark-mode-toggle__icon"
            icon={dark ? regular("sun") : regular("moon")}
          />
          <span className="navigation-bar__dark-mode-toggle__title">
            Dark Mode
          </span>
        </label>
        <input
          type="checkbox"
          hidden
          id="dark-mode-toggle"
          checked={dark}
          onChange={toggleTheme}
        />
      </div>
    </nav>
  );
};

export default Nav;
