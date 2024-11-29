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
// pages
import ListingProducts from "./pages/listingproducts/ListingProducts";

// Création du store pour react-auth-kit
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

// Configuration de PrivateRoute
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuthUser();
  const token = useAuthHeader();

  if (auth && token) {
    try {
      const tokenValue = token; // Appel de la fonction token
      if (tokenValue) {
        const user = JSON.parse(atob(tokenValue.split(".")[1])); // Décodage du token
        if (user?.role?.role === "admin") {
          return <>{children}</>;
        }
      }
    } catch (error) {
      // console.error("Erreur lors de la vérification du token : ", error);
    }
  }

  // Redirection si non connecté ou non autorisé
  return <Navigate to="/login" replace />;
};

// Configuration du router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "produits/liste",
        element: <ListingProducts />,
      },
    ],
    // Ajouter vos routes enfants ici
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
]);

// Rendu de l'application
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("L'élément racine n'a pas été trouvé dans le DOM.");
}
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

// Mesurer les performances (optionnel)
reportWebVitals();
