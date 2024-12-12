import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OneOrder from "../components/oneorder/OneOrder"; // Ajustez le chemin si nécessaire

describe("OneOrder Component", () => {
  const mockOrder = {
    id: 12345,
    date: "2024-12-12T00:00:00Z", // Exemple de date ISO
    states: "En cours",
    userId: 67890,
  };

  it("renders order details correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <OneOrder {...mockOrder} />
      </MemoryRouter>,
    );

    // Vérifie que le numéro de commande est affiché
    expect(screen.getByText(/COMMANDE N° 12345/i)).toBeInTheDocument();

    // Vérifie que la date est correctement formatée
    expect(screen.getByText(/DATE : 12\/12\/2024/i)).toBeInTheDocument();

    // Vérifie que l'état est affiché
    expect(screen.getByText(/État : En cours/i)).toBeInTheDocument();
  });

  it("renders the link to order details correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <OneOrder {...mockOrder} />
      </MemoryRouter>,
    );

    const detailLink = screen.getByRole("link", { name: /DETAIL/i });

    // Vérifie que le lien est présent et pointe vers la bonne URL
    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute(
      "href",
      `/client/orders/detail/${mockOrder.userId}/${mockOrder.id}`,
    );
  });

  it("formats a Date object correctly", () => {
    const date = new Date("2024-12-12T00:00:00Z");
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <OneOrder {...mockOrder} date={date} />
      </MemoryRouter>,
    );

    // Vérifie que la date au format objet est bien formatée
    expect(screen.getByText(/DATE : 12\/12\/2024/i)).toBeInTheDocument();
  });
});
