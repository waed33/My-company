
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../design/Navbar.css";

function MainLayout() {
  return (
    <>
      <aside className="sidebar">

        <h2 className="logo">
          OMNI<span>CORE</span>
        </h2>

    

        <Navbar />

      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
