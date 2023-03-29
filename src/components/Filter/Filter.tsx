import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Filter.scss";

interface FilterProps {
  onFilterChange: (region: string) => void;
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const { dark } = useContext(ThemeContext);
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };
  return (
    <>
      <label htmlFor="region" hidden>
        Region:
      </label>
      <select
        className={`select ${dark ? "dark-mode" : ""}`}
        id="region"
        name="region"
        onChange={handleFilterChange}
        defaultValue=""
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
