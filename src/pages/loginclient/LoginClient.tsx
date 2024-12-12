import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMediaQuery } from "react-responsive";
import Input from "../../components/input/Input";
import BtnSubmit from "../../components/btnsubmit/BtnSubmit";
import H1visiteur from "../../components/h1visiteur/H1visiteur";

interface LoginForm {
  email: string;
  password: string;
}

const LoginClient = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 380px)" });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        return;
      }

      const responseData = await response.json();
      const parts = responseData.token.split(".");

      const encodedPayload = parts[1]; // Le payload encodé
      const decodedPayload = JSON.parse(atob(encodedPayload));
      // Passer les données utilisateur à signIn
      signIn({
        auth: {
          token: responseData.token,
          type: "Bearer",
        },
        userState: {
          firstName: decodedPayload.firstName,
          lastName: decodedPayload.lastName,
          email: decodedPayload.email,
          id: decodedPayload.id,
          roles: decodedPayload.roles,
          phone: decodedPayload.phone,
          cities: decodedPayload.cities,
          adress: decodedPayload.adress,
        },
      });
      navigate("/client/tableau-de-bord");
    } catch (e) {
      setError("erreur interne");
    }
  };
  let containerForm;
  if (isBigScreen) {
    containerForm = "d-flex   w-75 mx-auto";
  } else if (isTabletOrMobile) {
    containerForm = "d-flex flex-column align-items-center";
  }

  let bloc;
  if (isBigScreen) {
    bloc = "d-flex flex-column w-100 ";
  } else if (isTabletOrMobile) {
    bloc = "d-flex justify-content-end w380  mb-3";
  }
  return (
    <div>
      <H1visiteur title="Connecter vous" />
      {error && <div>{error}</div>}
      <form id="form" onSubmit={handleSubmit(handleLogin)}>
        <div className={containerForm}>
          <div className={bloc}>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Le format de l'email est invalide.",
                },
              }}
              id="email"
              value=""
              messRequired="L'email est obligatoire."
              messMinLength="Le minimum est 2 caractères."
              messMaxLength="Le maximum est 50 caractères."
              messPattern="Erreur dans l'email"
              container_input="h-20"
              required
              classe="border rounded px-3 py-2  border border-primary"
            />
          </div>
          <div className={bloc}>
            <Input
              type="password"
              name="password"
              label="Mot de passe"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 12,
                maxLength: 50,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:"|,.<>/?~`])[A-Za-z\d!@#$%^&*()_\-+=$begin:math:display$$end:math:display${};:"\\|,.<>/?~`]{12,}$/,
                  message: "Le format du mot de passe est invalide.",
                },
              }}
              id="password"
              value=""
              messRequired="Le mot de passe est obligatoire."
              messMinLength="Le minimum est 12 caractères."
              messMaxLength="Le maximum est 50 caractères."
              container_input="h-20"
              required
              classe="border rounded px-3 py-2  border border-primary"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <BtnSubmit
            click={() => {}}
            container_submit="mt-5 "
            classe="btn btn-success shadow"
            id="submit"
            value="Se connecter"
          />
        </div>
        <div className="d-flex justify-content-center">
          <NavLink className="d-block" to="/inscription">
            Inscription
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginClient;
