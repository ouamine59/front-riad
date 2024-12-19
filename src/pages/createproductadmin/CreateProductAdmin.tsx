import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Input from "../../components/input/Input";
import BtnSubmit from "../../components/btnsubmit/BtnSubmit";
import SelectInput from "../../components/selectinput/SelectInput";
import Textarea from "../../components/textarea/Textarea";
import "./createproductadmin.css";

interface ProductForm {
  title: string;
  price: string;
  discount: boolean;
  priceDiscount: string;
  description: string;
  categoriesId: number;
  id: number;
}
const CreateProductAdmin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductForm>();
  const [options, setOptions] = useState<
    { value: string | number; label: string }[]
  >([]);
  const handleSelectChange = (option: {
    value: string | number;
    label: string;
  }) => {
    setOptions([option]);
  };
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(1); // État pour la promotion

  const [error, setError] = useState<string | null>(null);
  const handleCreate: SubmitHandler<ProductForm> = async (data) => {
    try {
      const a = document.getElementById("discount") as HTMLInputElement | null; // Caster en HTMLInputElement
      if (!a) {
        setError("L'élément discount est introuvable");
        return;
      }
      const payload = {
        ...data,
        discount: a.value,
        isActivied: true,
      };
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/products/admin/create`,
        {
          method: "POST",
          headers: {
            Authorization: `${authHeader}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        setError("erreur dans le formulaire");
        return;
      }

      const responseData = await response.json();
      const productId = responseData.id;

      const filePath = document.getElementById("filePath") as HTMLInputElement;

      if (!filePath.files || filePath.files.length === 0) {
        alert("Veuillez sélectionner un fichier.");
        return;
      }

      const file = filePath.files[0];

      // Créer une instance de FormData
      const formData = new FormData();
      formData.append("filePath", file);
      formData.append("productsId", productId);

      const responseImage = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `${authHeader}`,
          },
          body: formData,
        },
      );
      if (!responseImage.ok) {
        setError("erreur dans l'upload d'image");
        return;
      }
      navigate("/admin/tableau-de-bord");
    } catch (e) {
      navigate("");
    }
  };
  const containerForm = "d-flex  flex-wrap w-75 mx-auto";
  const bloc = "d-flex  flex-wrap w380";
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}api/categories/select`,
      );
      const cities = await response.json();
      const formattedCities = cities.map(
        (city: { value: number; label: string }) => ({
          value: city.value,
          label: city.label,
        }),
      );
      setOptions(formattedCities);
    } catch (e) {
      setOptions([]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  // Basculer entre ON et OFF avec animation
  const handleToggleDiscount = () => {
    setDiscount((prevDiscount) => (prevDiscount === 1 ? 0 : 1));
  };
  return (
    <form
      id="form"
      onSubmit={handleSubmit(handleCreate)}
      className="d-flex flex-column align-items-center"
    >
      <h1>CREATION D&apos; UN PRODUIT</h1>
      {error && <div role="alert">{error}</div>}
      <div className={containerForm}>
        <SelectInput
          options={options}
          label="Catégories"
          id="categories"
          name="categoriesId"
          onchange={handleSelectChange}
          className="border rounded px-3 py-2 selectInput border border-primary"
          validationSchema={{ required: true }} // Exemple de schéma de validation
          register={register}
        />
        <h2>promotion</h2>
        <div
          className={`toggle-container ${discount === 1 ? "active" : ""}`}
          onClick={handleToggleDiscount}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleToggleDiscount();
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="toggle-circle">a</div>
        </div>

        <input
          id="discount"
          name="discount"
          type="hidden"
          value={discount}
          readOnly
        />

        <div className={bloc}>
          <Input
            type="text"
            name="title"
            label="Nom"
            errors={errors}
            register={register}
            validationSchema={{
              required: true,
              minLength: 2,
              maxLength: 40,
              pattern: {
                value: /^[a-zA-Z-]{2,80}$/,
                message: "Le format du nom est invalide.",
              },
            }}
            id="title"
            value=""
            messRequired="Le nom est obligatoire."
            messMinLength="Le minimum est de 2 caractères."
            messMaxLength="Le maximum est de 40 caractères"
            messPattern="Erreur dans le nom"
            container_input="d-flex flex-column"
            required
            classe="border rounded px-3 py-2 border border-primary"
          />
        </div>
        <div className={bloc}>
          <Input
            type="text"
            name="price"
            label="Prix"
            errors={errors}
            register={register}
            validationSchema={{
              required: true,
              minLength: 1,
              maxLength: 6,
              pattern: {
                value: /^[0-9.,]{2,80}$/,
                message: "Le format du nom est invalide.",
              },
            }}
            id="prix"
            value=""
            messRequired="Le prix est obligatoire."
            messMinLength="Le minimum est de 1 caractères."
            messMaxLength="Le maximum est de 6 caractères"
            messPattern="Erreur dans le prénom"
            container_input="d-flex flex-column"
            required
            classe="border rounded px-3 py-2 border border-primary"
          />
        </div>
        <div className={bloc}>
          <Input
            type="text"
            name="priceDiscount"
            label="Prix promo"
            errors={errors}
            register={register}
            validationSchema={{
              required: true,
              minLength: 0,
              maxLength: 6,
              pattern: {
                value: /^\d{0,6}$/,
                message: "Le format du prix promotionnel est invalide.",
              },
            }}
            id="priceDiscount"
            value=""
            messRequired="Le prix promotionnel est obligatoire."
            messMinLength="Le minimum est de 0 caractères."
            messMaxLength="Le maximum est de 6 caractères"
            messPattern="Erreur dans le prix promotionnel"
            container_input="d-flex flex-column"
            required
            classe="border rounded px-3 py-2 border border-primary"
          />
        </div>
        <div className={bloc}>
          <Textarea<ProductForm>
            label="Description"
            name="description"
            register={register}
            validationSchema={{
              required: false,
              minLength: 0,
              maxLength: 200,
              pattern: {
                value: /^[a-zA-Z-]{0,200}$/,
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
      <input type="file" id="filePath" name="filePath" />
      <BtnSubmit
        click={() => {}}
        container_submit="m-5"
        classe="btn btn-success shadow"
        id="submit"
        value="CREER"
      />
    </form>
  );
};

export default CreateProductAdmin;
