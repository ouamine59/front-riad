import React from "react";
import { useParams } from "react-router-dom";
import H1visiteur from "../../components/h1visiteur/H1visiteur";

const DetailOrder = () => {
  const { id } = useParams();
  return <H1visiteur title={`DETAIL COMMANDE N°${id}`} />;
};

export default DetailOrder;
