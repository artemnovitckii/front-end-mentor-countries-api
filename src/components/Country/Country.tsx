import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Country.scss";

interface CountryProp {
  countryName: string;
  population: number;
  region: string;
  capital: string;
  imgUrl: string;
  imgAlt?: string;
  key: string;
  countryCode: string;
}

const Country: React.FC<CountryProp> = ({
  countryName,
  population,
  region,
  capital,
  imgUrl,
  imgAlt = "IMAGE ALT",
  countryCode,
}) => {
  const { dark } = useContext(ThemeContext);
  return (
    <Link to={`country/${countryCode}`} className="link">
      <div className={`country ${dark ? "dark-mode" : ""}`}>
        <div className="country__flag">
          <img src={imgUrl} alt={imgAlt} width={264} height={160} />
        </div>
        <div className="country__info">
          <h2 className="country__info__header">{countryName}</h2>
          <p>
            Population: <span>{population}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
