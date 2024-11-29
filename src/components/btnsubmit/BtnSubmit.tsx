import React, { MouseEventHandler } from "react";

interface BtnSubmitProps {
  container_submit: string;
  click: MouseEventHandler<HTMLInputElement> | undefined;
  classe: string;
  id: string;
  value: string;
}

const BtnSubmit: React.FC<BtnSubmitProps> = ({
  container_submit,
  click,
  classe,
  id,
  value,
}) => {
  return (
    <div className={container_submit}>
      <input
        onClick={click}
        className={classe}
        type="submit"
        id={id}
        value={value}
      />
    </div>
  );
};

export default BtnSubmit;
