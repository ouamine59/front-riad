import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/input/Input";

const mockRegister = jest.fn();
const mockErrors = {};

// Tests pour le composant Input
describe("Input Component", () => {
  it("renders the input with the label", () => {
    render(
      <Input
        id="test-input"
        name="testInput"
        label="Test Label"
        type="text"
        required
        register={mockRegister}
        errors={mockErrors}
      />,
    );

    expect(screen.getByLabelText("Test Label *")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays required error when input is empty", async () => {
    const mockErrors = {
      testInput: { type: "required" },
    };

    render(
      <Input
        id="test-input"
        name="testInput"
        label="Test Label"
        type="text"
        required
        validationSchema={{ required: "This field is required" }}
        register={mockRegister}
        errors={mockErrors}
      />,
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("handles minLength validation", async () => {
    const mockErrors = {
      testInput: { type: "minLength" },
    };

    render(
      <Input
        id="test-input"
        name="testInput"
        label="Test Label"
        type="text"
        validationSchema={{
          minLength: { value: 5, message: "Minimum length is 5" },
        }}
        register={mockRegister}
        errors={mockErrors}
        messMinLength="Minimum length is 5" // Fournit le message d'erreur attendu
      />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "abc" }, // Moins de 5 caractères
    });

    // Vérifie si le message d'erreur attendu est affiché
    const errorMessage = screen.getByText("Minimum length is 5");
    expect(errorMessage).toBeInTheDocument();
  });
  it("does not show error for valid input", async () => {
    render(
      <Input
        id="test-input"
        name="testInput"
        label="Test Label"
        type="text"
        register={mockRegister}
        errors={mockErrors}
      />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Valid input" },
    });

    expect(
      screen.queryByText("This field is required"),
    ).not.toBeInTheDocument();
  });
});
