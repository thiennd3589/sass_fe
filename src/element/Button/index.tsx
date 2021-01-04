import React from "react";
import "./styles.scss";

interface ButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;

  onClick?: () => void;
}

const CustomButton = (props: ButtonProps) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };

  return (
    <button
      className={props.className ? `Button ${props.className}` : "Button"}
      onClick={onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default CustomButton;
