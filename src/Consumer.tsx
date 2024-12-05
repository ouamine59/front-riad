import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/client/header/Header";

// Utilisez une déclaration de fonction classique
const Consumer = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Consumer;
