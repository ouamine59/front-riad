import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import Input from "../../components/input/Input";
import BtnSubmit from "../../components/btnsubmit/BtnSubmit";
import SelectInput from "../../components/selectinput/SelectInput";
import H1visiteur from "../../components/h1visiteur/H1visiteur";
import Textarea from "../../components/textarea/Textarea";
import "./account.css";

interface UpdateForm {
  id: number;
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  citiesId: number;
  adress: string;
  comment: string;
}

const Account = () => {
  const authHeader = useAuthHeader();
  const auth = useAuthUser<UpdateForm>();
  const signIn = useSignIn();
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
  } = useForm<UpdateForm>();

  const [error, setError] = useState<string | null>(null);

  const handleUpdate: SubmitHandler<UpdateForm> = async (data) => {
    try {
      if (!auth) {
        setError("Erreur : impossible de récupérer les données utilisateur");
        return;
      }

      const userId = auth.id;

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${authHeader}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        setError("erreur dans ");
        return;
      }
      const responseData = await response.json(); // Traite la réponse JSON

      const { token } = responseData;
      const parts = token.split(".");
      const encodedPayload = parts[1]; // Le payload encodé
      const decodedPayload = JSON.parse(atob(encodedPayload));
      // Passer les données utilisateur à signIn
      const success = signIn({
        auth: {
          token,
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

      if (!success) {
        setError("Erreur lors de la mise à jour de l'authentification.");
      }
      alert("Compte modifier.");
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

  const signOut = useSignOut();
  return (
    <>
      <H1visiteur title="MON COMPTE" />
      <div className="d-flex justify-content-end  mt-md-5">
        <button
          className="logout"
          type="button"
          aria-label="Submit form"
          onClick={() => {
            signOut();
            navigate("/");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              signOut();
            }
          }}
        >
          Se déconnecter
        </button>
      </div>
      {error && <div role="alert">{error}</div>}
      <form
        id="form"
        onSubmit={handleSubmit(handleUpdate)}
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
              value={auth?.firstName}
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
              value={auth?.lastName}
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
              value={auth?.adress}
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
              id="citiesId"
              name="citiesId"
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
              value={auth?.phone}
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
              value={auth?.email}
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
          <div className={bloc}>
            <Textarea<UpdateForm>
              label="Commentaire"
              name="comment"
              register={register}
              validationSchema={{
                required: false,
                minLength: 0,
                maxLength: 80,
                pattern: {
                  value: /^[a-zA-Z-]{0,255}$/,
                  message: "Le format du commentaire est invalide.",
                },
              }}
              errors={errors}
              messRequired="Le commentaire est obligatoire."
              messMinLength="Le minimum est de 0 caractères."
              messMaxLength="Le maximum est de 255 caractères."
              messPattern="Erreur dans le commentaire"
              messMax=""
              messMin=""
              messValidate=""
              labelcss="label-class"
              classname="textarea-class  border border-primary "
            />
          </div>
        </div>
        <BtnSubmit
          click={() => {}}
          container_submit="m-5"
          classe="btn btn-success shadow"
          id="submit"
          value="MODIFIER"
        />
      </form>
    </>
  );
};

export default Account;
