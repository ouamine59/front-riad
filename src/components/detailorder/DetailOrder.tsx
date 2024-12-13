import React from "react";
import "./detailorder.css";

interface Order {
  name: string;
  price: string;
  quantity: number;
}

const DetailOrder: React.FC<Order> = ({ name, price, quantity }) => {
  function ajouterTexteAvantDeuxDerniers(chaine: string) {
    if (chaine.length < 2) {
      return `0,${chaine}€`;
    }
    return `${chaine.slice(0, -2)}€${chaine.slice(-2)}`;
  }
  const p = ajouterTexteAvantDeuxDerniers(price);
  return (
    <div className="border border-primary w380 ps-3">
      <h2 className="text-center">{name}</h2>
      <div>
        <p>Quantité : {quantity}</p>
        <p>Prix : {p}</p>
      </div>
    </div>
  );
};

export default DetailOrder;
