import React from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Admin from "./Admin";
import Consumer from "./Consumer";
// pages
import Accueil from "./pages/accueil/Accueil";
import ListingProducts from "./pages/listingproducts/ListingProducts";
import LoginClient from "./pages/loginclient/LoginClient";
import LoginA from "./pages/loginadmin/LoginAdmin";
import Cart from "./pages/cart/cart/Cart";
import AppError from "./AppError";
import Summary from "./pages/cart/summary/Summary";
import Register from "./pages/register/Register";
import Payment from "./pages/cart/payment/Payment";
import Account from "./pages/account/Account";
import BoardConsumer from "./pages/boardconsumer/BoardConsumer";
import DetailOrder from "./pages/detailorder/DetailOrder";
import DashbordAdmin from "./pages/dashboardadmin/DashbordAdmin";
import ListingProductsAdmin from "./pages/listingproductsadmin/ListingProductsAdmin";
import DetailProductAdmin from "./pages/detailproductadmin/DetailProductAdmin";
import CreateProductAdmin from "./pages/createproductadmin/CreateProductAdmin";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();
  if (auth && token) {
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload?.roles?.includes("ROLE_ADMIN")) {
          return <>{children}</>;
        }
      }
    } catch (error) {
      return <AppError />;
    }
  }
  return <Navigate to="/admin/se-connecter" replace />;
};

const PrivateConsumer: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();

  if (auth && token) {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      const payload = JSON.parse(atob(parts[1]));
      console.log("Payload décodé :", payload);

      if (payload?.roles?.includes("ROLE_CLIENT")) {
        return <>{children}</>;
      }
      return <Navigate to="/client/tableau-de-bord" replace />;
    } catch (error) {
      console.error("Erreur lors du traitement du token :", error);
      return <AppError />;
    }
  }
  return <Navigate to="/se-connecter" />;
};

const Login: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  let isConnected = true; // Le type est inféré automatiquement
  if (!auth) {
    isConnected = false;
  }
  return isConnected ? (
    <Navigate to="/client/tableau-de-bord" />
  ) : (
    <>{children}</>
  );
};
const LoginAdmin: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();

  if (auth && token) {
    try {
      const tokenValue = token; // Appel de la fonction token
      if (tokenValue) {
        const payload = JSON.parse(atob(tokenValue.split(".")[1]));
        if (payload?.roles?.includes("ROLE_ADMIN")) {
          return <>{children}</>;
        }
      }
    } catch (error) {
      return <AppError />;
    }
  }
  return <>{children}</>;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <AppError />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/produits/liste",
        element: <ListingProducts />,
      },
      {
        path: "se-connecter",
        element: (
          <Login>
            <LoginClient />
          </Login>
        ),
      },
      {
        path: "/admin/se-connecter",
        element: (
          <LoginAdmin>
            <LoginA />
          </LoginAdmin>
        ),
      },
      {
        path: "/panier/detail",
        element: <Cart />,
      },
      {
        path: "/panier/recapitulatif",
        element: <Summary />,
      },
      {
        path: "/inscription",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "tableau-de-bord",
        element: <DashbordAdmin />,
      },
      {
        path: "les-produits",
        element: <ListingProductsAdmin />,
      },
      {
        path: "products/detail/:id",
        element: <DetailProductAdmin />,
      },
      {
        path: "products/create",
        element: <CreateProductAdmin />,
      },
    ],
  },
  {
    path: "/client",
    element: (
      <PrivateConsumer>
        <Consumer />
      </PrivateConsumer>
    ),
    children: [
      {
        path: "commande/paiement",
        element: <Payment />,
      },
      {
        path: "mon-compte",
        element: <Account />,
      },
      {
        path: "tableau-de-bord",
        element: <BoardConsumer />,
      },
      {
        path: "orders/detail/:userId/:id",
        element: <DetailOrder />,
      },
    ],
  },
]);

// Rendu de l'application
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("L'élément racine n'a pas été trouvé dans le DOM.");
}
const root = createRoot(rootElement);

root.render(
  <AuthProvider store={store}>
    <RouterProvider router={router} />
  </AuthProvider>,
);

// Mesurer les performances (optionnel)
reportWebVitals();
