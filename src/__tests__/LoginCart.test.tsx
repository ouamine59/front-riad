import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginCart from "../components/logincart/LoginCart";

jest.mock("react-auth-kit/hooks/useSignIn", () => {
  const mockSignIn = jest.fn();
  return () => mockSignIn;
});

const mockSignIn = jest.requireMock("react-auth-kit/hooks/useSignIn")();

global.fetch = jest.fn();

describe("LoginCart Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LoginCart />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Se connecter/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Inscription/i }),
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: "mockToken.mockPayload.mockSignature" }),
    });

    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LoginCart />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "ValidP@ssw0rd!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        auth: { token: "mockToken.mockPayload.mockSignature", type: "Bearer" },
        userState: expect.any(Object),
      });
    });
  });

  it("shows an error message on failed login", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <LoginCart />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "InvalidP@ss" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Connexion échouée.");
    });
  });
});
