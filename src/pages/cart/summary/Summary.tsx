import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
// components
import H1visiteur from "../../../components/h1visiteur/H1visiteur";

import LoginCart from "../../../components/logincart/LoginCart";
import "./summary.css";
import OneSummary from "../oneSummary/OneSummary";

// Définir l'interface pour les items du panier
interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  description: string;
  image: string;
}

const Summary: React.FC = () => {
  const authHeader = useAuthHeader();
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  // Accéder au contenu du panier avec des types stricts
  const items = useSelector(
    (state: { cart: { items: CartItem[] } }) => state.cart.items,
  );
  const totalAmount = useSelector(
    (state: { cart: { totalAmount: number } }) => state.cart.totalAmount,
  );
  function ajouterTexteAvantDeuxDerniers(chaine: string) {
    if (chaine.length < 2) {
      return `0,${chaine}€`;
    }

    return `${chaine.slice(0, -2)},${chaine.slice(-2)}€`;
  }
  const total = ajouterTexteAvantDeuxDerniers(String(totalAmount));
  let className;
  if (isBigScreen) {
    className = "d-flex flex-row flex-wrap mx-auto justify-content-evenly";
  } else if (isTabletOrMobile) {
    className = "d-flex flex-column mx-auto";
  }
  let classNameTotal;
  if (isBigScreen) {
    classNameTotal = "total shadow d-flex justify-content-between rounded-2 ";
  } else if (isTabletOrMobile) {
    classNameTotal = "total shadow d-flex justify-content-between rounded-2";
  }
  if (!authHeader) {
    return <LoginCart />;
  }
  return (
    <div>
      <H1visiteur title="VOTRE PANIER" />

      {items.length > 0 ? (
        <>
          <div className={className}>
            {items.map((item) => (
              <OneSummary
                key={item.id}
                title={item.name}
                price={String(item.price)}
                quantity={item.quantity}
                description={item.description}
              />
            ))}
          </div>
          <div className="d-flex justify-content-end">
            <h3 className={classNameTotal}>
              <div>Montant Total :</div> <div>{total}</div>
            </h3>
          </div>

          <div className="d-flex justify-content-center w-100">
            <NavLink
              to="/client/commande/paiement"
              className="btn btn-success "
            >
              PAIEMENT
            </NavLink>
          </div>
        </>
      ) : (
        <p>Le panier est vide.</p>
      )}
    </div>
  );
};

export default Summary;
