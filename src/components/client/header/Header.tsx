import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
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
  const auth = useAuthUser();
  const token = useAuthHeader();
  const [isconnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (auth && token) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [auth, token]);
  return (
    <header className={className}>
      <nav className="d-flex flex-row justify-content-around align-items-center">
        <NavLink className="nav me-3" to="/accueil">
          Accueil
        </NavLink>
        <NavLink className="nav me-3" to="/produits/liste">
          Store
        </NavLink>
        <NavLink className="nav me-3" to="/panier/detail">
          Panier
        </NavLink>
        {!isconnected && (
          <NavLink className="nav me-3" to="/se-connecter">
            Connexion
          </NavLink>
        )}
        {isconnected && (
          <NavLink className="nav me-3" to="/client/mon-compte">
            Mon compte
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
