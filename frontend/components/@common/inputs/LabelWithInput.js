import React from "react";
import { FormFeedback, Input, Label } from "reactstrap";

const LabelWithInput = ({
  lable,
  lableClassName,
  plaintext,
  className,
  type,
  name,
  placeholder,
  value,
  onChangeHandal,
  autoComplete,
  disabled,
  errors,
}) => {
  return (
    <>
      <Label className={lableClassName}>{lable}</Label>
      <Input
        plaintext={plaintext}
        className={className}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChangeHandal(name, e.target.value)}
        invalid={!!errors[name]}
        disabled={disabled}
      />
      {!!errors[name] && <FormFeedback invalid>{errors[name]}</FormFeedback>}
    </>
  );
};

export default LabelWithInput;
