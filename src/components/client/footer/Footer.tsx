import React from "react";
import { useMediaQuery } from "react-responsive";
import "./footer.css";

const Footer = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1225px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 280px)" });
  let className;
  if (isBigScreen) {
    className = " d-flex pt-5 justify-content-evenly";
  } else if (isTabletOrMobile) {
    className = "d-flex flex-column";
  }
  return (
    <footer className={className}>
      <article className="d-flex flex-column align-items-center">
        <h1>DOMAINES ACTIVITES</h1>
        <p>categories 1</p>
        <p>categories 2</p>
      </article>
      <article className="d-flex flex-column align-items-center">
        <h1>NOUS CONTACTER</h1>
      </article>
      <article className="d-flex flex-column align-items-center">
        <h1>NOS PARTENAIRES</h1>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </article>
    </footer>
  );
};

export default Footer;
