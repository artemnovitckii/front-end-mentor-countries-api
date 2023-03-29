import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ThemeContextProvider } from "./context/ThemeContext";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import { CountriesContextProvider } from "./context/CountriesContext";
import CountryDetails from "./components/CountryDetail/CountryDetails";
import Nav from "./components/Nav/Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  { path: "country/:countryCode", element: <CountryDetails /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CountriesContextProvider>
      <ThemeContextProvider>
        <Nav />
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </CountriesContextProvider>
  </React.StrictMode>
);
