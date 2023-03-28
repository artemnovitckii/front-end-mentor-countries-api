import React from "react";
import { ReactNode } from "react";
import Nav from "../Nav/Nav";

type NavbarWrapperProps = {
  children?: ReactNode;
};

const NavWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
};

export default NavWrapper;
