import { createContext, ReactNode, useEffect, useState } from "react";

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface NativeCountry {
  [key: string]: {
    common: string;
    official: string;
  };
}

export interface Languages {
  [key: string]: string;
}

export interface Country {
  name: {
    nativeName: NativeCountry;
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  capital: string;
  region: string;
  subregion: string;
  nativeName: string;
  tld: string[];
  currencies: Currency;
  languages: Languages;
  cca3: string;
  borders?: string[];
}

interface CountriesContextProps {
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
  getCountryDetailsByCountryCode: (countryCode: string) => Country;
}

const defaultState = {
  countries: [],
  isLoading: false,
  isError: false,
  getCountryDetailsByCountryCode: () => {
    throw new Error("getCountryDetailsByCountryCode not implemented");
  },
};

export async function loader() {}

export const CountriesContext =
  createContext<CountriesContextProps>(defaultState);

export const CountriesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  console.log("CountriesContextProvider rendered");
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const sortCountries = (countries: Country[]) => {
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const sortedData = sortCountries(data);
      setCountries(sortedData);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log(`Error fetching data ${error}`);
    }
  };

  const getCountryDetailsByCountryCode = (countryCode: string) => {
    const details = countries.find((country) => country.cca3 === countryCode);
    if (!details) {
      throw new Error(`Country with code ${countryCode} not found`);
    }
    return details;
  };

  useEffect(() => {
    console.log("making api call...");
    fetchCountries();
  }, []);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        isLoading,
        isError,
        getCountryDetailsByCountryCode,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
