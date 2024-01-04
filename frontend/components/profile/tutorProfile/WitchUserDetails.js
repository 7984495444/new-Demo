import { t } from "i18next";
import { Edit } from "iconsax-react";
import React from "react";
import { Button, Col, Input, Row } from "reactstrap";

const WitchUserDetails = ({
  userInfoEdit,
  whoIAm,
  setWhoIAm,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.WhichUser")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        {userInfoEdit?.userDetails ? (
          <Row className="gx-md-6 gx-0">
            <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
              <Input
                className="border-light-blue-b rounded-0 p-4"
                type="textarea"
                rows="9"
                placeholder=""
                resize="none"
                value={whoIAm}
                onChange={(e) => {
                  setWhoIAm(e.target.value);
                }}
              />
            </Col>
            <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
              <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                <Button
                  color="dark-blue-c"
                  onClick={(e) => userInfoSaveHandle("userDetails", e)}
                >
                  {t("Common.SafeguardBtn")}
                </Button>
                <Button
                  color="orange"
                  onClick={() => userInfoDiscardHandle("userDetails")}
                >
                  {t("Common.CancelBtn")}
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="gx-md-6 gx-0">
            <Col xxl="10" xl="10" lg="9" md="8" sm="12" xs="12">
              <pre className="text-light-blue-a ff-lato text-base">
                {whoIAm}
              </pre>
            </Col>
            <Col
              xs="auto"
              className="position-md-relative position-absolute end-0 top-md-0 top-2 ms-auto"
            >
              {isEditable && (
                <Button
                  color="unset"
                  size="sm"
                  className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                  onClick={() => userInfoEditHandle("userDetails")}
                >
                  <Edit />
                </Button>
              )}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default WitchUserDetails;
