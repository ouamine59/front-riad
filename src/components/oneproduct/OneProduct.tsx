import React, { useRef } from "react";
import "./oneproduct.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../assets/redux/cartSlice";

interface Product {
  id: string;
  title: string;
  price: string;
  discount: boolean;
  priceDiscount: string;
  description: string;
  image: string;
}

const OneProduct: React.FC<Product> = ({
  id,
  title,
  price,
  discount,
  priceDiscount,
  description,
  image,
}) => {
  const amountRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dispatch = useDispatch();

  function ajouterTexteAvantDeuxDerniers(chaine: string) {
    if (chaine.length < 2) {
      return `0,${chaine}€`;
    }
    return `${chaine.slice(0, -2)}€${chaine.slice(-2)}`;
  }

  const p = ajouterTexteAvantDeuxDerniers(price);
  const pdis = ajouterTexteAvantDeuxDerniers(priceDiscount);

  function handleAddProduct(productId: string) {
    const btnAddElement = buttonRefs.current[productId];

    if (btnAddElement) {
      // Ajouter une classe d'animation
      btnAddElement.classList.add("animate");

      // Retirer la classe après l'animation
      setTimeout(() => {
        btnAddElement.classList.remove("animate");
      }, 300); // La durée doit correspondre au CSS
    }

    const amount = amountRef.current
      ? parseInt(amountRef.current.innerHTML, 10)
      : 1;

    dispatch(
      addItemToCart({
        id,
        name: title,
        price: parseFloat(price),
        quantity: amount,
        description,
        image,
      }),
    );
  }

  function handleMore() {
    if (amountRef.current) {
      const currentAmount = parseInt(amountRef.current.innerHTML, 10);
      amountRef.current.innerHTML = (currentAmount + 1).toString();
    }
  }

  function handleLess() {
    if (amountRef.current) {
      const currentAmount = parseInt(amountRef.current.innerHTML, 10);
      if (currentAmount > 1) {
        amountRef.current.innerHTML = (currentAmount - 1).toString();
      }
    }
  }

  return (
    <div className="containerOneProduct d-flex mb-3 shadow" key={id}>
      {image ? (
        <img
          className="imageOneProduct"
          src={`${process.env.REACT_APP_SERVER_URL}/media/${image}`}
          alt={title}
          width="200"
        />
      ) : (
        <div className="imageOneProduct">No image available</div>
      )}
      <div className="blockInfoOneProduct">
        <div className="d-flex justify-content-between">
          <h3 className="titleOneProduct w-100">{title}</h3>
          <div className="containerAmountOneProduct d-flex justify-content-between align-items-center">
            <div
              id="less"
              onClick={handleLess}
              onKeyDown={(e) => e.key === "Enter" && handleLess()}
              role="button"
              tabIndex={0}
            >
              -
            </div>
            <div id="amount" className="amountOneProduct" ref={amountRef}>
              1
            </div>
            <div
              id="more"
              onClick={handleMore}
              onKeyDown={(e) => e.key === "Enter" && handleMore()}
              role="button"
              tabIndex={0}
            >
              +
            </div>
          </div>
        </div>
        <p className="descriptionOneProduct">{description}</p>
        <div className="containerPriceAdd d-flex justify-content-end align-items-center w-100">
          <div className="price">
            <strong>
              {p} {discount && `(Discounted: ${pdis})`}
            </strong>
          </div>
          <div
            onClick={() => handleAddProduct(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleAddProduct(id)}
            ref={(el) => {
              buttonRefs.current[id] = el;
            }}
            className="btnAdd d-flex justify-content-center align-items-center rounded-5"
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
