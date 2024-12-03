import React from "react";
import "./h1visiteur.css";

interface H1Props {
  title: string;
}

const H1visiteur: React.FC<H1Props> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default H1visiteur;
