import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import OneProduct from "../../components/oneproduct/OneProduct";

interface Product {
  id: number;
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

  const listing = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/products/listing`,
      );
      if (!response.ok) {
        setProducts([]);
        return;
      }
      const responseData = await response.json();
      const data: Product[] = responseData.result;
      setProducts(data);
    } catch (error) {
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
    <div className={className}>
      {products.length === 0 ? (
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
  );
};

export default ListingProducts;
