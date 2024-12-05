import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import H1visiteur from "../../components/h1visiteur/H1visiteur";
import OneOrder from "../../components/oneorder/OneOrder";

interface Order {
  id: number;
  states: string;
  userId: number;
  isCreatedAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}

interface ApiResponse {
  result: Order[];
}

const BoardConsumer = () => {
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const authHeader = useAuthHeader();

  const fetchOrders = async () => {
    const userId = 5;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/orders/listing/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `${authHeader}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data: ApiResponse = await response.json();
      setOrders(data.result); // Stocke uniquement le tableau d'ordres
    } catch (e) {
      setError("Aucun contenu disponible");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <H1visiteur title="BONJOUR" />
      {error && <p>{error}</p>}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <OneOrder key={order.id} />
            
          ))}
        </ul>
      ) : (
        !error && <p>Chargement des commandes...</p>
      )}
    </>
  );
};

export default BoardConsumer;
