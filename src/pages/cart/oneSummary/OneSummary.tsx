import React from "react";
import "../../../App.css";
import "./onesummary.css";

interface Product {
  title: string;
  price: string;
  quantity: number;
  description: string;
}
const OneSummary: React.FC<Product> = ({
  title,
  price,
  quantity,
  description,
}) => {
  function ajouterTexteAvantDeuxDerniers(chaine: string) {
    if (chaine.length < 2) {
      return `0,${chaine}€`;
    }

    return `${chaine.slice(0, -2)},${chaine.slice(-2)}€`;
  }
  const p = ajouterTexteAvantDeuxDerniers(price);
  return (
    <div className="containerOneProduct d-flex mb-3 shadow">
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <h3 className="titleOneProduct w-100">{title}</h3>
          <div className="containerAmountOneProduct d-flex justify-content-between align-items-center">
            <div id="amount" className="amountOneProduct">
              QTE{quantity}
            </div>
          </div>
        </div>
        <p className="descriptionOneProduct">{description}</p>
        <div className="containerPriceAdd d-flex justify-content-end align-items-center w-100">
          <div className="price">
            <strong>{p}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneSummary;
