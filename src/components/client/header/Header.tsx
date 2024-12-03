import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./header.css";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  let className;
  if (isBigScreen) {
    className =
      " header d-flex flex-row flex-wrap mx-auto justify-content-evenly";
  } else if (isTabletOrMobile) {
    className = "d-flex flex-row mx-auto header justify-content-evenly";
  }
  return (
    <header className={className}>
      <nav className="d-flex flex-row justify-content-around">
        <NavLink className="nav me-3" to="/accueil">
          Accueil
        </NavLink>
        <NavLink className="nav me-3" to="/produits/liste">
          Store
        </NavLink>
        <NavLink className="nav me-3" to="/panier/detail">
          Panier
        </NavLink>
        <NavLink className="nav me-3" to="/accueil">
          Connexion
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
