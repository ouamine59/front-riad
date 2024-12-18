import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/admin/header/Header";
import Sideboard from "./components/sideboard/Sideboard";

const Admin = () => {
  return (
    <>
      <Header />
      <main className="d-flex">
        <Sideboard />
        <Outlet />
      </main>
    </>
  );
};

export default Admin;
