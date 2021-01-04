import React, { useState } from "react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import "./styles.scss";

interface DatePickerProps {
  value?: string;
  label?: string;
  type?: string;
  icon?: string;
  disabledIcon?: boolean;

  onChange?: (e: React.SyntheticEvent<HTMLElement, Event>, data: any) => void;
}

const DateTimePicker = (props: DatePickerProps) => {
  const [value, setValue] = useState("");

  const onChange = (e: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
    props.onChange && props.onChange(e, data);
    setValue(data.value);
  };

  const renderDateInput = () => (
    <div className="DateTimePicker">
      {props.disabledIcon ? null : <Icon name="calendar alternate outline" />}
      <div className="Picker">
        {props.label && <label>{props.label}</label>}
        <DateInput
          onChange={onChange}
          value={props.value ? props.value : value}
          name={"Date"}
          icon="calendar alternate outline"
          iconPosition="right"
        />
      </div>
    </div>
  );

  const renderTimeInput = () => (
    <div className="DateTimePicker">
      {props.icon && <Icon name={props.icon as SemanticICONS} />}
      <div className="Picker">
        {props.label && <label>{props.label}</label>}
        <TimeInput
          onChange={onChange}
          value={props.value ? props.value : value}
          name={"Time"}
          icon="calendar alternate outline"
          iconPosition="right"
        />
      </div>
    </div>
  );

  const render = () => {
    if (props.type === "time") return renderTimeInput();
    return renderDateInput();
  };

  return render();
};

export default DateTimePicker;
