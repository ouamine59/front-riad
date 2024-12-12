import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UseFormRegister } from "react-hook-form";
import SelectInput from "../components/selectinput/SelectInput"; // Ajustez le chemin

const mockRegister = jest.fn(); // Mock pour la fonction register

describe("SelectInput Component", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  it("renders the label and options correctly", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        label="Test Label"
        options={options}
        register={mockRegister}
        className="test-class"
      />,
    );

    // Vérification du label
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();

    // Vérification des options
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders with default value", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        options={options}
        register={mockRegister}
        defaultValue="2"
        className="test-class"
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("2");
  });

  it("calls onchange with the correct option", () => {
    const mockOnChange = jest.fn();
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        options={options}
        register={mockRegister}
        className="test-class"
        onchange={mockOnChange}
      />,
    );

    const select = screen.getByRole("combobox");

    // Change la valeur du select
    fireEvent.change(select, { target: { value: "3" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      value: "3",
      label: "Option 3",
    });
  });

  it("applies the correct className", () => {
    render(
      <SelectInput
        id="test-select"
        name="testSelect"
        options={options}
        register={mockRegister}
        className="test-class"
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("test-class");
  });
});
