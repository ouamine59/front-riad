import React, { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
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

interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

const BoardConsumer = () => {
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const authHeader = useAuthHeader();
  const auth = useAuthUser<AuthUser>(); // auth est une fonction
  const fetchOrders = async () => {
    if (!auth) {
      setError("Erreur : impossible de récupérer les données utilisateur");
      return;
    }
    const userId = auth.id;
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
        throw new Error("Erreur de chargement.");
      }

      const data: ApiResponse = await response.json();
      setOrders(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <H1visiteur title="BONJOUR" />

      {orders.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          {orders.map((order) => (
            <OneOrder
              key={order.id}
              id={order.id}
              date={order.isCreatedAt.date}
              states={order.states}
              userId={order.userId}
            />
          ))}
        </div>
      ) : (
        error && <p>{error}</p>
      )}
    </>
  );
};

export default BoardConsumer;
