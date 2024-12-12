import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import OneProduct from "../components/oneproduct/OneProduct"; // Ajustez le chemin vers votre composant
import { addItemToCart } from "../assets/redux/cartSlice";

const mockStore = configureStore([]);

describe("OneProduct Component", () => {
  const mockProduct = {
    id: "1",
    title: "Test Product",
    price: "1000",
    discount: true,
    priceDiscount: "800",
    description: "This is a test product.",
    image: "test.jpg",
  };

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [] },
    });

    store.dispatch = jest.fn(); // Mock de la fonction dispatch
  });

  it("renders product details correctly", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    // Vérifie le rendu des détails du produit
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Vérifie le prix et la réduction avec regex
    expect(
      screen.getByText(/10€00\s*\(Discounted:\s*8€00\)/i),
    ).toBeInTheDocument();

    expect(screen.getByAltText(mockProduct.title)).toBeInTheDocument();
  });
  it("increments and decrements the amount correctly", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    const amount = screen.getByText("1");
    const moreButton = document.querySelector("#more");
    const lessButton = document.querySelector("#less");

    if (!moreButton || !lessButton) {
      throw new Error("More or less button not found in the document");
    }

    // Incrémente la quantité
    fireEvent.click(moreButton);
    expect(amount.innerHTML).toBe("2");

    // Décrémente la quantité
    fireEvent.click(lessButton);
    expect(amount.innerHTML).toBe("1");

    // Ne permet pas de descendre en dessous de 1
    fireEvent.click(lessButton);
    expect(amount.innerHTML).toBe("1");
  });

  it("dispatches addItemToCart action when 'add' button is clicked", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    const addButton = document.querySelector(".btnAdd");

    if (!addButton) {
      throw new Error("Add button not found in the document");
    }

    // Ajoute un produit au panier
    fireEvent.click(addButton);

    // Vérifie que l'action est dispatchée
    expect(store.dispatch).toHaveBeenCalledWith(
      addItemToCart({
        id: mockProduct.id,
        name: mockProduct.title,
        price: parseFloat(mockProduct.price),
        quantity: 1,
        description: mockProduct.description,
        image: mockProduct.image,
      }),
    );
  });

  it("dispatches addItemToCart action when 'add' button is clicked", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    const addButton = screen.getByText("+", { selector: ".btnAdd" }); // Bouton pour ajouter au panier

    // Ajoute un produit au panier
    fireEvent.click(addButton);

    // Vérifie que l'action est dispatchée
    expect(store.dispatch).toHaveBeenCalledWith(
      addItemToCart({
        id: mockProduct.id,
        name: mockProduct.title,
        price: parseFloat(mockProduct.price),
        quantity: 1,
        description: mockProduct.description,
        image: mockProduct.image,
      }),
    );
  });

  it("increments and decrements the amount correctly", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    const amount = screen.getByText("1");
    const moreButton = document.querySelector("#more");
    const lessButton = document.querySelector("#less");

    if (!moreButton || !lessButton) {
      throw new Error("More or less button not found in the document");
    }

    // Incrémente la quantité
    fireEvent.click(moreButton);
    expect(amount.innerHTML).toBe("2");

    // Décrémente la quantité
    fireEvent.click(lessButton);
    expect(amount.innerHTML).toBe("1");

    // Ne permet pas de descendre en dessous de 1
    fireEvent.click(lessButton);
    expect(amount.innerHTML).toBe("1");
  });

  it("dispatches addItemToCart action when 'add' button is clicked", () => {
    render(
      <Provider store={store}>
        <OneProduct {...mockProduct} />
      </Provider>,
    );

    const addButton = screen.getByText("+", { selector: ".btnAdd" });

    // Ajoute un produit au panier
    fireEvent.click(addButton);

    // Vérifie que l'action est dispatchée
    expect(store.dispatch).toHaveBeenCalledWith(
      addItemToCart({
        id: mockProduct.id,
        name: mockProduct.title,
        price: parseFloat(mockProduct.price),
        quantity: 1,
        description: mockProduct.description,
        image: mockProduct.image,
      }),
    );
  });

  it("renders correctly when no image is provided", () => {
    const productWithoutImage = { ...mockProduct, image: "" };

    render(
      <Provider store={store}>
        <OneProduct {...productWithoutImage} />
      </Provider>,
    );

    // Vérifie que le texte "No image available" est affiché
    expect(screen.getByText("No image available")).toBeInTheDocument();
  });
});
