import React from "react";
import "./styles.scss";

interface TextBoxProps {
  placeholder?: string;
  value?: string | number;
  errorMessage?: string;
  showError?: boolean;
  label?: string;
  type?: string;
  name?: string;

  onEnter?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = (props: TextBoxProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event);
  };

  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onEnter && props.onEnter();
    }
  };

  return (
    <div className={`TextBox ${props.showError && "Error"}`}>
      <div className="Input">
        {props.label && <label>{props.label}</label>}
        <input
          type={props.type ? props.type : "text"}
          name={props.name}
          onChange={onChange}
          placeholder={props.placeholder}
          value={props.value}
          onKeyDown={onEnter}
        />
      </div>
      {props.showError && (
        <span className="ErrorMessage">{props.errorMessage}</span>
      )}
    </div>
  );
};

export default TextBox;
