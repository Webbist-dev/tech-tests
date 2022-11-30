import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

const Layout = () => {
  return (
    <>
      <div id="app">
        <header className="header">
          <div className="wrapper">
            {/* <img src={logo} className="logo" alt="logo" /> */}
            <Menu />
          </div>
        </header>

        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
