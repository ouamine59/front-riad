import React, { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { NavLink } from "react-router-dom";
import OneProductAdmin from "../../components/oneproductadmin/OneProductAdmin";

interface Product {
  id: number;
  title: string;
  isActivied: boolean;
}

const ListingProductsAdmin = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const authHeader = useAuthHeader();

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/products/admin/listing`,
        {
          headers: {
            Authorization: `${authHeader}`, // Ajout des parenthèses pour appeler la fonction authHeader
          },
        },
      );
      if (!response.ok) {
        setError("Problème de connexion");
        setProducts([]);
        return;
      }
      const responseData = await response.json();
      const data: Product[] = responseData.result; // Utiliser directement responseData.result comme tableau de produits
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Il y a une erreur.");
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section className="w-100 d-flex justify-content-center flex-column">
      <div className="w-100 d-flex justify-content-end">
        <NavLink to="/admin/products/create">CREER</NavLink>
      </div>
      <h1>LES PRODUITS</h1>
      {error && <p className="text-danger">{error}</p>}
      <table className="w-100 d-flex flex-column">
        <thead>
          <tr className="d-flex justify-content-around ">
            <th className="title">NOM</th>
            <th>DISPONIBLE</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        {products.length === 0 && !error ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <OneProductAdmin
              key={product.id}
              id={product.id}
              title={product.title}
              isActivied={product.isActivied}
            />
          ))
        )}
      </table>
    </section>
  );
};

export default ListingProductsAdmin;
