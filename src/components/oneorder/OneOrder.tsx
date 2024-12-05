import React from 'react'
import { NavLink } from 'react-router-dom';

interface Order{
    id: number;
    date: object;
    states: string;
}
const OneOrder = ({
    id,date,states
}) => {
  return (
    <>
      <div key={id}>
              <h1>COMMANDE N° {id}</h1>
              <p>DATE {formatDate(date)}</p>
              <p>Etat : {states}</p>

              <NavLink to={`client/orders/detail/${id}`}>DETAIL</NavLink>
            </div>
    </>
  )
}

export default OneOrder
