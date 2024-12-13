import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "./header.css";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 380px)" });
  let className;
  if (isBigScreen) {
    className =
      " header d-flex flex-row flex-wrap mx-auto justify-content-around ";
  } else if (isTabletOrMobile) {
    className = "headerMobile d-flex flex-column mx-auto  align-items-center";
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
    <header>
      <nav className={className}>
        <NavLink className="nav " to="/">
          Accueil
        </NavLink>
        <NavLink className="nav " to="/produits/liste">
          Store
        </NavLink>
        <NavLink className="nav " to="/panier/detail">
          Panier
        </NavLink>
        {!isconnected && (
          <NavLink className="nav " to="/se-connecter">
            Connexion
          </NavLink>
        )}
        {isconnected && (
          <NavLink className="nav " to="/client/mon-compte">
            Mon compte
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
