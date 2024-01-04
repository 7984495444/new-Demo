import React from "react";
import Select, { components } from "react-select";
import { ArrowDown2 } from "iconsax-react";
import ShowImage from "../@common/ShowImage";

const ShowSelectStudentAndSubject = ({
  userData,
  selected,
  changeStudetHandal,
  isStudent,
}) => {
  // show profile image an name
  const formatOptionLabel = ({ avatar, label }) => (
    <div className="hstack gap-3 p-0 cursor-pointer">
      {isStudent && (
        <ShowImage
          className="avatar h-6 w-6 avatar-xs rounded-pill flex-none"
          imageName={avatar}
          width={68}
          height={68}
        />
      )}
      <h6 className="text-base">{label}</h6>
    </div>
  );

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown2 size={12} color="#0D465B" />
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <Select
        openMenuOnClick={true}
        formatOptionLabel={formatOptionLabel}
        options={userData}
        isSearchable={false}
        value={selected}
        onChange={(e) => changeStudetHandal(e)}
        classNamePrefix=""
        className="react-select-type-1"
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        styles={{
          control: (provided, state) => ({
            ...provided,
            minHeight: "auto",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            borderBottomLeftRadius: state.menuIsOpen ? "0px" : "8px",
            borderBottomRightRadius: state.menuIsOpen ? "0px" : "8px",
            borderTop: "1px solid #8497AB",
            borderLeft: "1px solid #8497AB",
            borderRight: "1px solid #8497AB",
            borderBottom: state.menuIsOpen
              ? "1px solid transparent"
              : "1px solid #8497AB",
            "&:hover": {
              borderColor: "none",
            },
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            transform: state.selectProps.menuIsOpen && "rotate(180deg)",
          }),
          option: (provided) => ({
            ...provided,
            borderBottom: "1px solid #E5F0FF",
          }),
          menu: (provided) => ({
            ...provided,
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottom: "1px solid #8497AB",
            borderLeft: "1px solid #8497AB",
            borderRight: "1px solid #8497AB",
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0",
          }),
        }}
        classNames={{
          control: () => "ps-2 py-1 shadow-none w-40 h-9",
          dropdownIndicator: () =>
            "font-regular text-xs text-dark-blue-a cursor-pointer",
          option: () => "bg-white px-0",
          menu: () => "shadow-none my-0 w-40",
          menuList: () => "py-0 px-2",
        }}
      />
    </>
  );
};

export default ShowSelectStudentAndSubject;
