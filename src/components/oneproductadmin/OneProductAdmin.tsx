import React from "react";
import "./oneproductadmin.css";
import { NavLink } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  isActivied: boolean;
}
const OneProductAdmin: React.FC<Product> = ({ id, title, isActivied }) => {
  let btnActivied;
  console.log(isActivied);
  if (isActivied === true) {
    btnActivied =
      "d-flex isOK justify-centent-start btnActivied align-items-center";
  } else {
    btnActivied = "d-flex isNO justify-content-end btnActivied ";
  }

  return (
    <tr className="d-flex justify-content-around border border-primary ">
      <th className="title">{title}</th>
      <th className={btnActivied}>
        <div className="isActivied">o</div>
      </th>
      <th>
        <NavLink to={`/admin/products/detail/${id}`}>DETAIL</NavLink>
      </th>
    </tr>
  );
};

export default OneProductAdmin;
