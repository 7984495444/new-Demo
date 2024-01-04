import { Edit } from "iconsax-react";
import React from "react";
import { Button } from "reactstrap";
import { t } from "i18next";

const EditAndSaveBtn = ({
  type,
  isShowSaveBtn,
  editInfoHandle,
  userInfoEditHandle,
  isEditable,
}) => {
  return (
    <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 position-absolute end-0 top-0">
      {isShowSaveBtn ? (
        <>
          <Button
            color="dark-blue-c"
            onClick={() => editInfoHandle(type, true)}
          >
            {t("Common.Save")}
          </Button>
          <Button color="orange" onClick={() => editInfoHandle(type, false)}>
            {t("Common.Cancel")}
          </Button>
        </>
      ) : (
        isEditable && (
          <Button
            color="unset"
            size="sm"
            className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
            onClick={() => userInfoEditHandle(type)}
          >
            <Edit />
          </Button>
        )
      )}
    </div>
  );
};

export default EditAndSaveBtn;
