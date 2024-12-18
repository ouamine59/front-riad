import React from "react";
import { NavLink } from "react-router-dom";

const Sideboard = () => {
  return (
    <div className="bg-primary w-25">
      <article className="d-flex flex-column align-items-center">
        <NavLink className="text-dark-emphasis" to="/admin/les-produits">
          LES PRODUITS
        </NavLink>
        <NavLink className="text-dark-emphasis" to="/admin/les-commandes">
          LES COMMANDES
        </NavLink>
      </article>
    </div>
  );
};

export default Sideboard;
