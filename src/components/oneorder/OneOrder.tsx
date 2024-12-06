import React from "react";
import { NavLink } from "react-router-dom";
import "./oneorder.css";

interface Order {
  id: number;
  date: string | Date; // Remplacez `unknown` par `string | Date` si vous attendez une date sous forme de chaîne ou d'objet Date
  states: string;
  userId: number;
}

const OneOrder: React.FC<Order> = ({ id, date, states, userId }) => {
  const formatDate = (dateInput: string | Date) => {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = d.getDate();
    const month = d.getMonth() + 1; // Les mois commencent à 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className="border border-primary border-2 containerOneOrder p-2"
      key={id}
    >
      <h2 className="titleOneOrder">COMMANDE N° {id}</h2>
      <p className="paragrapheOneOrder">
        <strong>
          DATE : {formatDate(date)}
          <br />
          État : {states}
        </strong>
      </p>
      <div className="d-flex justify-content-end">
        <NavLink
          className="detail"
          to={`/client/orders/detail/${userId}/${id}`}
        >
          DETAIL
        </NavLink>
      </div>
    </div>
  );
};

export default OneOrder;
