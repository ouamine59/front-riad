import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import Textarea from "../components/textarea/Textarea"; // Chemin vers votre composant

const mockRegister = jest.fn(); // Mock pour la fonction register
const mockErrors: FieldErrors<any> = {}; // Mock pour les erreurs

describe("Textarea Component", () => {
  it("renders the label and textarea", () => {
    render(
      <Textarea
        label="Test Label"
        name="testTextarea"
        register={mockRegister}
        validationSchema={{}}
        errors={mockErrors}
        messRequired="This field is required"
        messMinLength="Minimum length is 5"
        messMaxLength="Maximum length is 10"
        messPattern="Invalid pattern"
        messMax="Value is too high"
        messMin="Value is too low"
        messValidate="Invalid value"
        labelcss="label-class"
        classname="textarea-class"
      />,
    );

    // Vérifie que le label est présent
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();

    // Vérifie que la zone de texte est présente
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays required error when validation fails", () => {
    render(
      <Textarea
        label="Test Label"
        name="testTextarea"
        register={mockRegister}
        validationSchema={{ required: true }}
        errors={{
          testTextarea: { type: "required" },
        }}
        messRequired="This field is required"
        messMinLength="Minimum length is 5"
        messMaxLength="Maximum length is 10"
        messPattern="Invalid pattern"
        messMax="Value is too high"
        messMin="Value is too low"
        messValidate="Invalid value"
        labelcss="label-class"
        classname="textarea-class"
      />,
    );

    // Vérifie que le message d'erreur "required" est affiché
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("displays minLength error when validation fails", () => {
    render(
      <Textarea
        label="Test Label"
        name="testTextarea"
        register={mockRegister}
        validationSchema={{ minLength: 5 }}
        errors={{
          testTextarea: { type: "minLength" },
        }}
        messRequired="This field is required"
        messMinLength="Minimum length is 5"
        messMaxLength="Maximum length is 10"
        messPattern="Invalid pattern"
        messMax="Value is too high"
        messMin="Value is too low"
        messValidate="Invalid value"
        labelcss="label-class"
        classname="textarea-class"
      />,
    );

    // Vérifie que le message d'erreur "minLength" est affiché
    expect(screen.getByText("Minimum length is 5")).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    render(
      <Textarea
        label="Test Label"
        name="testTextarea"
        register={mockRegister}
        validationSchema={{}}
        errors={mockErrors}
        messRequired="This field is required"
        messMinLength="Minimum length is 5"
        messMaxLength="Maximum length is 10"
        messPattern="Invalid pattern"
        messMax="Value is too high"
        messMin="Value is too low"
        messValidate="Invalid value"
        labelcss="label-class"
        classname="textarea-class"
      />,
    );

    const textarea = screen.getByRole("textbox");

    // Simule la saisie utilisateur
    fireEvent.change(textarea, { target: { value: "Test input" } });

    // Vérifie que la valeur de la zone de texte est mise à jour
    expect(textarea).toHaveValue("Test input");
  });
});
