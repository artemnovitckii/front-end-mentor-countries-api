import React, { createContext, useEffect, useState } from "react";

interface ThemeContextProps {
  dark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  dark: false,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dark, setDark] = useState<boolean>(false);

  const toggleTheme = () => {
    setDark(!dark);
    localStorage.setItem("darkMode", `${dark}`);
  };

  //check if the dark theme has been set previously
  useEffect(() => {
    const value = localStorage.getItem("darkMode");
    if (localStorage && typeof value === "boolean") {
      setDark(value);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
