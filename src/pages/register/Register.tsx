import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import BtnSubmit from "../../components/btnsubmit/BtnSubmit";
import SelectInput from "../../components/selectinput/SelectInput";
import H1visiteur from "../../components/h1visiteur/H1visiteur";
import "./register.css";

interface RegisterForm {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  idCities: number;
  adress: string;
  comment: string;
}

const Register = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const navigate = useNavigate();
  const [options, setOptions] = useState<
    { value: string | number; label: string }[]
  >([]);
  const handleSelectChange = (option: {
    value: string | number;
    label: string;
  }) => {
    setOptions([option]);
  };
  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/cities/select`,
      );
      const cities = await response.json();
      const formattedCities = cities.map(
        (city: { value: number; label: string }) => ({
          value: city.value,
          label: city.label,
        }),
      );
      setOptions(formattedCities);
    } catch (error) {
      setOptions([]);
    }
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterForm>();
  const [error, setError] = useState<string | null>(null);

  const handleRegister: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setError("erreur dans");
        return;
      }
      navigate("se-connecter");
    } catch (e) {
      navigate("");
    }
  };
  let bloc;
  if (isBigScreen) {
    bloc = "d-flex  flex-wrap w380";
  } else if (isTabletOrMobile) {
    bloc = "d-flex flex-column mx-auto align-items-center";
  }
  let containerForm;
  if (isBigScreen) {
    containerForm = "d-flex  flex-wrap w-75 mx-auto";
  } else if (isTabletOrMobile) {
    containerForm = "d-flex flex-column mx-auto align-items-center mx-auto";
  }
  let blocPhone;
  if (isBigScreen) {
    blocPhone = "d-flex  flex-wrap w-100 mx-auto";
  } else if (isTabletOrMobile) {
    blocPhone = "";
  }
  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <>
      <H1visiteur title="CREER COMPTE" />
      {error && <div>{error}</div>}
      <form
        id="form"
        onSubmit={handleSubmit(handleRegister)}
        className="d-flex flex-column align-items-center"
      >
        <div className={containerForm}>
          <div className={bloc}>
            <Input
              type="text"
              name="firstName"
              label="Prénom"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 2,
                maxLength: 80,
                pattern: {
                  value: /^[a-zA-Z-]{2,80}$/,
                  message: "Le format du prénom est invalide.",
                },
              }}
              id="firstName"
              value=""
              messRequired="Le prénom est obligatoire."
              messMinLength="Le minimum est de 2 caractères."
              messMaxLength="Le maximum est de 40 caractères"
              messPattern="Erreur dans le prénom"
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
            />
          </div>
          <div className={bloc}>
            <Input
              type="text"
              name="lastName"
              label="Nom"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 2,
                maxLength: 80,
                pattern: {
                  value: /^[a-zA-Z-]{2,80}$/,
                  message: "Le format du nom est invalide.",
                },
              }}
              id="lastName"
              value=""
              messRequired="Le nom est obligatoire."
              messMinLength="Le minimum est de 2 caractères."
              messMaxLength="Le maximum est de 40 caractères"
              messPattern="Erreur dans le prénom"
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
            />
          </div>
          <div className={bloc}>
            <Input
              type="text"
              name="adress"
              label="Adresse"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 2,
                maxLength: 255,
                pattern: {
                  value: /^\d+\s[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.\-']+$/,
                  message: "Le format de l'adresse est invalide.",
                },
              }}
              id="lastName"
              value=""
              messRequired="L'adresse' est obligatoire."
              messMinLength="Le minimum est de 2 caractères."
              messMaxLength="Le maximum est de 255 caractères"
              messPattern="Erreur dans l'adresse'"
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
            />
          </div>
          <div className={bloc}>
            <SelectInput
              options={options}
              label="Ville"
              id="cities"
              name="idCities"
              onchange={handleSelectChange}
              className="border rounded px-3 py-2 selectInput border border-primary"
              validationSchema={{ required: true }} // Exemple de schéma de validation
              register={register}
            />
          </div>
          <div className={blocPhone}>
            <Input
              type="text"
              name="phone"
              label="Téléphone"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 10,
                maxLength: 10,
                pattern: {
                  value: /^\d{10}$/,
                  message: "Le format du téléphone est invalide.",
                },
              }}
              id="phone"
              value=""
              messRequired="Le téléphone est obligatoire."
              messMinLength="Le minimum est de 10 caractères."
              messMaxLength="Le maximum est de 10 caractères"
              messPattern="Erreur dans le téléphone"
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
            />
          </div>
          <div className={bloc}>
            <Input
              type="text"
              name="email"
              label="Email"
              errors={errors}
              register={register}
              validationSchema={{
                required: true,
                minLength: 10,
                maxLength: 370,
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
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:"|,.<>/?~`])[A-Za-z\d!@#$%^&*()_\-+=$begin:math:display$$end:math:display${};:"\\|,.<>/?~`]{12,}$/,
                  message: "Le format de l'email est invalide.",
                },
              }}
              id="password"
              value=""
              messRequired="Le mot de passe est obligatoire."
              messMinLength="Le minimum est 8 caractères."
              messMaxLength=""
              messPattern="Erreur dans le mot de passe"
              container_input="d-flex flex-column"
              required
              classe="border rounded px-3 py-2 border border-primary"
            />
          </div>
        </div>
        <BtnSubmit
          click={() => {}}
          container_submit="m-5"
          classe="btn btn-success shadow"
          id="submit"
          value="S'inscrire"
        />
      </form>
    </>
  );
};

export default Register;
