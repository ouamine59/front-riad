import React from "react";
// import { useMediaQuery } from "react-responsive";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Input from "../../components/input/Input";
import BtnSubmit from "../../components/btnsubmit/BtnSubmit";

interface LoginForm {
  email: string;
  password: string;
}

const LoginClient = () => {
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>(); // Ajout du type générique LoginForm
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}auth`, {
      method: "POST", // Ajout de la méthode
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData = await response.json(); // Renommage de `data` en `responseData`
      signIn({
        auth: {
          token: responseData.token,
          type: "Bearer",
        },
        userState: {
          name: responseData.name,
          uid: responseData.id,
          role: responseData.role,
        },
      });
      navigate("/tableau-de-bord");
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSubmit(handleLogin)}>
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
        <Input
          type="password"
          name="password"
          label="Mot de passe"
          errors={errors}
          register={register}
          validationSchema={{
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: {
              value: /^[A-Za-z0-9]{2,50}$/,
              message: "Le format du mot de passe est invalide.",
            },
          }}
          id="password"
          value=""
          messRequired="Le mot de passe est obligatoire."
          messMinLength="Le minimum est 2 caractères."
          messMaxLength="Le maximum est 50 caractères."
          container_input="h-20"
          required
          classe="border rounded px-3 py-2"
        />
        <BtnSubmit
          click={() => {}}
          container_submit="container_mobile"
          classe="success"
          id="submit"
          value="Se connecter"
        />
      </form>
    </div>
  );
};

export default LoginClient;
