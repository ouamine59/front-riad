import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BtnSubmit from "../components/btnsubmit/BtnSubmit";

describe("BtnSubmit Component", () => {
  const mockClickHandler = jest.fn();

  const mockProps = {
    container_submit: "submit-container",
    click: mockClickHandler,
    classe: "btn-class",
    id: "submit-btn",
    value: "Submit",
  };

  it("renders the button with correct properties", () => {
    render(<BtnSubmit {...mockProps} />);

    // Vérifie que le bouton est rendu avec les bonnes propriétés
    const button = screen.getByRole("button", { name: /Submit/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-class");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("id", "submit-btn");
    expect(button).toHaveValue("Submit");
  });

  it("calls the click handler when clicked", () => {
    render(<BtnSubmit {...mockProps} />);

    // Simule un clic sur le bouton
    const button = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(button);

    // Vérifie que le gestionnaire de clic a été appelé
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it("renders inside the specified container", () => {
    render(<BtnSubmit {...mockProps} />);

    // Vérifie que le bouton est rendu dans le bon conteneur
    const container = document.querySelector(".submit-container");
    expect(container).toBeInTheDocument();
  });
});
