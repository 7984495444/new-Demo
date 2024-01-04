import { t } from "i18next";
import { Edit } from "iconsax-react";
import React from "react";
import { Button, Col, Input, Row } from "reactstrap";

const StudentExperienceDetails = ({
  userInfoEdit,
  experiencesWithChildren,
  setExperiencesWithChildren,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.StudentExperience")}</h6>
      </Col>
      <Col xxl="9" xl="9" lg="9" md="10">
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.experiencesWithChildrenField ? (
            <>
              <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
                <Input
                  className="border-light-blue-b rounded-0 p-4"
                  type="textarea"
                  rows="9"
                  placeholder=""
                  resize="none"
                  value={experiencesWithChildren}
                  onChange={(e) => {
                    setExperiencesWithChildren(e.target.value);
                  }}
                />
              </Col>
              <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) =>
                      userInfoSaveHandle("experiencesWithChildrenField", e)
                    }
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() =>
                      userInfoDiscardHandle("experiencesWithChildrenField")
                    }
                  >
                    {t("Common.CancelBtn")}
                  </Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <pre className="text-light-blue-a ff-lato text-base">
                  {experiencesWithChildren}
                </pre>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() =>
                        userInfoEditHandle("experiencesWithChildrenField")
                      }
                    >
                      <Edit />
                    </Button>
                  )}
                </div>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default StudentExperienceDetails;
