import { t } from "i18next";
import { CloseSquare } from "iconsax-react";
import React from "react";
import { Button } from "reactstrap";

const ModifyAndCloseBtn = ({ modifyBtn, modifyHandal }) => {
  return (
    <>
      {!modifyBtn ? (
        <Button
          color="none"
          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
          onClick={() => modifyHandal(false)}
        >
          {t("DocumentsTab.EditBtn")}
        </Button>
      ) : (
        <Button
          size="sm"
          color="square"
          className="bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
          onClick={() => {
            modifyHandal(true);
          }}
        >
          <CloseSquare />
        </Button>
      )}
    </>
  );
};

export default ModifyAndCloseBtn;
