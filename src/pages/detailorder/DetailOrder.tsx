import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMediaQuery } from "react-responsive";
import H1visiteur from "../../components/h1visiteur/H1visiteur";
import Detail from "../../components/detailorder/DetailOrder";
import "./detailorder.css";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  userId: number;
  states: string;
  isCreatedAt: Date;
  products: Product[];
}

const DetailOrder = () => {
  const authHeader = useAuthHeader();
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isCreated, setIsCreated] = useState("");
  const [amount, setAmount] = useState(0);
  const [states, setStates] = useState("");
  const formatDate = (dateInput: string | Date) => {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = d.getDate();
    const month = d.getMonth() + 1; // Les mois commencent à 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/orders/detail/${userId}/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${authHeader}`,
          },
        },
      );

      if (!response.ok) {
        setError("Failed to fetch order");
        return;
      }
      const responseData = await response.json();
      if (responseData.result) {
        const fetchedOrder: Order = responseData.result;
        setOrder(fetchedOrder);
        const d = formatDate(responseData.result[0].isCreatedAt.date);
        setIsCreated(d);
        setStates(responseData.result[0].states);
        const totalQuantity = fetchedOrder.products.reduce(
          (sum, product) => sum + product.quantity,
          0,
        );
        setAmount(totalQuantity);
      } else {
        setError("Order not found");
      }
    } catch (e) {
      setError(`Error fetching order: ${e}`);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  let className;
  if (isBigScreen) {
    className = "d-flex flex-row flex-wrap mx-auto justify-content-evenly";
  } else if (isTabletOrMobile) {
    className = "d-flex flex-column mx-auto";
  }
  return (
    <>
      <H1visiteur title={`DETAIL COMMANDE N° ${id}`} />
      {error && <p>{error}</p>}
      {order ? (
        <div>
          <p>DATE : {isCreated}</p>
          <p>Nombre de produits : {amount}</p>
          <p>ETAT : {states}</p>
          <div className={className}>
            {order.products.map((product) => (
              <Detail
                key={product.id}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </>
  );
};

export default DetailOrder;
