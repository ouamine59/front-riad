import React from "react";
import "./oneproduct.css";
import "../../App.css";

interface Product {
  id: number;
  title: string;
  price: string;
  discount: boolean;
  priceDiscount: string;
  description: string;
  image: { url?: string } | null;
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
  return (
    <div className="containerOneProduct d-flex mb-3 shadow" key={id}>
      {image && image.url ? (
        <img
          className="imageOneProduct"
          src={image.url}
          alt={title}
          width="200"
        />
      ) : (
        <div className="imageOneProduct">No image available</div>
      )}
      <div className="blockInfoOneProduct">
        <div className="d-flex justify-content-between ">
          <h3 className="titleOneProduct w-100">{title}</h3>
          <div className="containerAmountOneProduct d-flex justify-content-between align-items-center">
            <div id="less">-</div>
            <div id="amount" className="amountOneProduct">
              1
            </div>
            <div id="more">+</div>
          </div>
        </div>
        <p className="descriptionOneProduct">{description}</p>
        <div className="containerPriceAdd d-flex justify-content-end align-items-center  w-100 ">
          <div className="price">
            {price} {discount && `(Discounted: ${priceDiscount})`}
          </div>
          <div className="btnAdd d-flex justify-content-center align-items-center rounded-5">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
