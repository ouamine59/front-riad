import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMediaQuery } from "react-responsive";
import Input from "../input/Input";
import BtnSubmit from "../btnsubmit/BtnSubmit";
import H1visiteur from "../h1visiteur/H1visiteur";

interface LoginForm {
  email: string;
  password: string;
}

const LoginCart = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>(); // Ajout du type générique LoginForm
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const parts = responseData.token.split(".");
      const encodedPayload = parts[1];
      const decodedPayload = JSON.parse(atob(encodedPayload));
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
    } else {
      setErrorMessage("Connexion échouée.");
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
      {errorMessage && <div role="alert">{errorMessage}</div>}
      <H1visiteur title="Connecter vous" />
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
              classe="border rounded px-3 py-2"
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
                minLength: 8,
                maxLength: 50,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:"|,.<>/?~`])[A-Za-z\d!@#$%^&*()_\-+=$begin:math:display$$end:math:display${};:"\\|,.<>/?~`]{8,}$/,
                  message: "Le format du mot de passe est invalide.",
                },
              }}
              id="password"
              value=""
              messRequired="Le mot de passe est obligatoire."
              messMinLength="Le minimum est 8 caractères."
              messMaxLength="Le maximum est 50 caractères."
              container_input="h-20"
              required
              classe="border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <BtnSubmit
            click={() => {}}
            container_submit="container_mobile"
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

export default LoginCart;
