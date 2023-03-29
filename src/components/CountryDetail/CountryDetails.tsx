import React, { useContext } from "react";
import { CountriesContext, Languages } from "../../context/CountriesContext";
import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import BorderList from "../BorderList/BorderList";
import { ThemeContext } from "../../context/ThemeContext";

interface CountryDetailsProps {
  //   countryCode: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({}) => {
  const { countryCode } = useParams();
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const urlCode = countryCode ? countryCode : "";
  const { isLoading, getCountryDetailsByCountryCode } =
    useContext(CountriesContext);

  const getLanguages = (languageData: Languages) => {
    const languageKeys = Object.keys(languageData);
    const lastKeyIndex = languageKeys.length - 1;
    let languages = "";
    for (let i = 0; i < languageKeys.length; i++) {
      const key = languageKeys[i];
      languages += languageData[key];
      if (i !== lastKeyIndex) {
        languages += ", ";
      }
    }
    return languages;
  };

  const getBorders = (borders?: string[]) => {
    const borderDict: { [key: string]: string } = {};
    borders?.forEach((border) => {
      const data = getCountryDetailsByCountryCode(border);
      borderDict[data?.cca3] = data?.name?.common;
    });
    return borderDict;
  };

  if (!isLoading) {
    // setting data
    const data = getCountryDetailsByCountryCode(urlCode);
    const nativeNameOfficial =
      data.name.nativeName &&
      data.name.nativeName[Object.keys(data.name.nativeName)[0]].common;
    const currency =
      data.currencies && data.currencies[Object.keys(data.currencies)[0]].name;
    const languages = data.languages && getLanguages(data.languages);
    const borders = getBorders(data?.borders);

    return (
      <div className={`country-details ${dark ? "dark-mode" : ""}`}>
        {/* Back Button  */}
        <div className="country-details__back">
          <button
            className="country-details__back-button"
            type="button"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon
              size="lg"
              className="country-details__back-button-icon"
              icon={solid("arrow-left")}
            />
            Back
          </button>
        </div>
        {/* INFO Container */}
        <div className="country-details__wrapper">
          {/* FLAG */}
          <div className="country-details__flag">
            <img
              className="country-details__flag-image"
              src={data.flags.svg}
              alt=""
            />
          </div>
          {/* Country INFO */}
          <div className="country-details__info">
            <div className="country-details__info-text">
              <h1 className="country-details__info-name">{data.name.common}</h1>
              {/* Sides */}
              <div className="country-details__info-sides">
                {/* Side 1 */}
                <div className="country-details__info-side1">
                  <p>
                    Native Name: <span>{nativeNameOfficial}</span>
                  </p>
                  <p>
                    Population: <span>{data.population}</span>
                  </p>
                  <p>
                    Region: <span>{data.region}</span>
                  </p>
                  <p>
                    Subregion: <span>{data.subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{data.capital}</span>
                  </p>
                </div>
                {/* Side 2 */}
                <div className="country-details__info-side2">
                  <p>
                    Top Level Domain: <span>{data.tld}</span>
                  </p>
                  <p>
                    Currency: <span>{currency}</span>
                  </p>
                  <p>
                    Langauges: <span>{languages}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Border Countries */}
            <div className="country-details__border">
              <p>
                Border Countries:
                <span className="country-details__border-list">
                  {Object.entries(borders).length
                    ? Object.entries(borders).map(([key, value]) => (
                        <BorderList
                          country={value}
                          countryCode={key}
                          key={key}
                        />
                      ))
                    : ` ${data.name.common} has no borders`}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // TODO: add loading spinner or something
    return <div>Loading</div>;
  }
};

export default CountryDetails;
