import React from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useParams } from "react-router-dom";
import H1visiteur from "../../components/h1visiteur/H1visiteur";

const DetailOrder = () => {
  const { id, userId } = useParams();
  return (
    <>
      <H1visiteur title={`DETAIL COMMANDE N°${id}`} />
    </>
  );
};

export default DetailOrder;
