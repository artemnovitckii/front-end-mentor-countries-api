import { useContext, useState } from "react";
import Country from "../components/Country/Country";
import Filter from "../components/Filter/Filter";
import SearchBar from "../components/SearchBar/SearchBar";
import { CountriesContext } from "../context/CountriesContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Root.scss";

const Root = () => {
  const { countries, isLoading } = useContext(CountriesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const { dark } = useContext(ThemeContext);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (region: string) => {
    setFilterRegion(region);
  };

  // Filter countries based on search query
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterRegion === "" || country.region === filterRegion;

    return matchesSearch && matchesFilter;
  });
  return (
    <div className={`global-container ${dark ? "dark-mode" : ""}`}>
      <div className={`app-container`}>
        {/* Search and filter */}
        <div className="search-filter">
          <SearchBar onSearch={handleSearch} />
          <Filter onFilterChange={handleFilter} />
        </div>
        {/* Countries Grid */}
        <div className="countries-grid-wrapper">
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <Country
                key={country.name.common}
                countryCode={country.cca3}
                countryName={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
                imgUrl={country.flags.svg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
