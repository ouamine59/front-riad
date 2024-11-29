import React, { useState, useEffect } from "react";
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

  return (
    <div>
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
