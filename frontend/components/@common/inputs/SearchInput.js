import React from "react";
import { t } from "i18next";
import { SearchNormal1 } from "iconsax-react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const SearchInput = ({ setSearchInfo, isMatchMaking }) => {
  return (
    <InputGroup
      className={`w-sm-${
        isMatchMaking ? "70" : "48"
      } ms-auto border border-light-blue-a`}
      size="sm"
    >
      <Input
        type="text"
        placeholder={
          isMatchMaking
            ? t("MatchAllStudents.Search")
            : t("AdminDashboard.FindStudent")
        }
        className="border-0 pe-0 text-base"
        onChange={(e) => setSearchInfo(e.target.value)}
      />
      <InputGroupText className="cursor-pointer border-0 px-3 bg-transparent">
        <SearchNormal1 size="16" />
      </InputGroupText>
    </InputGroup>
  );
};

export default SearchInput;
