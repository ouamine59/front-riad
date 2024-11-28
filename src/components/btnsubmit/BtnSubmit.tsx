import React, { MouseEventHandler } from "react";

interface BtnSubmitProps {
  container_submit: string;
  click: MouseEventHandler<HTMLInputElement> | undefined;
  classe: string;
  id: string;
  value: string;
}
const BtnSubmit: React.FC<BtnSubmitProps> = (props) => {
  return (
    <div className={props.container_submit}>
      <input
        onClick={props.click}
        className={props.classe}
        type="submit"
        id={props.id}
        value={props.value}
      />
    </div>
  );
};

export default BtnSubmit;
