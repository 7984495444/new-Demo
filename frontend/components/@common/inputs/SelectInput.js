import { t } from "i18next";
import React from "react";
import { Label } from "reactstrap";

const SelectInput = ({
  label,
  className,
  value,
  placeholder,
  name,
  editInfohandleChange,
  disabled,
  defaultValue,
  option,
  error,
}) => {
  return (
    <>
      <Label>{label}</Label>
      <select
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={(e) => editInfohandleChange(name, e.target.value)}
        disabled={disabled}
      >
        <option defaultValue>{defaultValue}</option>
        {option?.map((languageOpt) => {
          return (
            <option key={languageOpt.val} value={languageOpt.val}>
              {t(languageOpt.label)}
            </option>
          );
        })}
      </select>
      {!!error[name] && <p className="text-danger">{error[name]}</p>}
    </>
  );
};

export default SelectInput;
