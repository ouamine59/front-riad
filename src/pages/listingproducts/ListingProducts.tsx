import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
// components
import OneProduct from "../../components/oneproduct/OneProduct";
import H1visiteur from "../../components/h1visiteur/H1visiteur";

interface Product {
  id: string;
  title: string;
  price: string;
  discount: boolean;
  priceDiscount: string;
  description: string;
  image: { url?: string } | null;
}

const ListingProducts = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);

  const listing = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/products/listing`,
      );
      if (!response.ok) {
        setError("Failed to fetch products.");
        setProducts([]);
        return;
      }
      const responseData = await response.json();
      const data: Product[] = responseData.result;
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setProducts([]);
    }
  };
  useEffect(() => {
    listing();
  }, []);
  let className;
  if (isBigScreen) {
    className = "d-flex flex-row flex-wrap mx-auto justify-content-evenly";
  } else if (isTabletOrMobile) {
    className = "d-flex flex-column mx-auto";
  }
  return (
    <>
      <H1visiteur title="LES PRODUITS" />
      <div className={className}>
        {error && <p className="text-danger">{error}</p>}
        {products.length === 0 && !error ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <OneProduct
              key={p.id}
              id={p.id}
              title={p.title}
              description={p.description}
              price={p.price}
              priceDiscount={p.priceDiscount}
              discount={p.discount}
              image={p.image}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ListingProducts;
