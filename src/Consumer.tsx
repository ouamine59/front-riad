import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/client/header/Header";
import Footer from "./components/client/footer/Footer";

// Utilisez une déclaration de fonction classique
const Consumer = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Consumer;
