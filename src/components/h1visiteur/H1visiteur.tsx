import React from "react";

interface H1Props {
  part1: string;
  part2: React.ReactNode; // Allows string, JSX, or React components
  classNameH1: string;
  containerParti1?: string; // Optional with default
  containerParti2?: string; // Optional with default
  rowBottom?: string; // Optional with default
}

const H1visiteur: React.FC<H1Props> = ({
  part1,
  part2,
  classNameH1,
  containerParti1 = "default-container-part1",
  containerParti2 = "default-container-part2",
  rowBottom = "default-row-bottom",
}) => {
  return (
    <div className={classNameH1}>
      <h1>
        <span className={containerParti1}>{part1}</span>
        <span className={containerParti2}>{part2}</span>
      </h1>
      <div className={rowBottom} />
    </div>
  );
};

export default H1visiteur;
