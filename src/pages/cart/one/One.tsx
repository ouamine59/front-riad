import React from "react";
import "../../../App.css";
import "./one.css";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../assets/redux/cartSlice";

interface Product {
  id: string;
  title: string;
  price: string;
  quantity: number;
  description: string;
  image: string;
}
const One: React.FC<Product> = ({
  id,
  title,
  price,
  quantity,
  description,
  image,
}) => {
  const dispatch = useDispatch();
  function ajouterTexteAvantDeuxDerniers(chaine: string) {
    if (chaine.length < 2) {
      return `0,${chaine}€`;
    }

    return `${chaine.slice(0, -2)},${chaine.slice(-2)}€`;
  }
  const p = ajouterTexteAvantDeuxDerniers(price);
  const handleDeleteProduct = () => {
    dispatch(removeItemFromCart(id));
  };
  return (
    <div className="containerOneProduct d-flex mb-3 shadow">
      <img className="imageOneProduct" src={image} alt={title} width="200" />
      <div className="blockInfoOneProduct">
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
          <div
            onClick={handleDeleteProduct}
            onKeyDown={(e) => e.key === "Enter" && handleDeleteProduct()}
            role="button"
            tabIndex={0}
            className="btn btn-danger d-flex justify-content-center align-items-center rounded-5"
          >
            X
          </div>
        </div>
      </div>
    </div>
  );
};

export default One;
