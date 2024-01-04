import { interests } from "@/utils/data";
import { t } from "i18next";
import { Edit } from "iconsax-react";
import React from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";

const InterestsDetails = ({
  userInfoEdit,
  interestValues,
  handleCheckboxChange,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.Interests")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.interests ? (
            <>
              <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
                <Row md="3" xs="2" className="gy-5">
                  {interests?.map((val, index) => {
                    return (
                      <Col key={index}>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            id={index}
                            checked={interestValues[val?.name] === 1}
                            onChange={() => handleCheckboxChange(val?.name)}
                          />
                          <Label for={val?.name} check>
                            {t(val?.label)}
                          </Label>
                        </FormGroup>
                      </Col>
                    );
                  })}
                  {/* {Object.keys(interestValues).map((interest) => (
                  <Col key={interest}>
                    <FormGroup check>
                      <Input
                        type="checkbox"
                        id={interest}
                        checked={interestValues[interest] === 1} // Change to interestValues[interest] === 2 if you want to check for 2
                        onChange={() => handleCheckboxChange(interest)}
                      />
                      <Label for={interest} check>
                        {interest}
                      </Label>
                    </FormGroup>
                  </Col>
                ))} */}
                </Row>
              </Col>
              <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) => userInfoSaveHandle("interests", e)}
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() => userInfoDiscardHandle("interests")}
                  >
                    {t("Common.CancelBtn")}
                  </Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <Row className="gy-2">
                  {interests?.map((val, index) => {
                    return (
                      interestValues[val?.name] === 1 && (
                        <Col
                          xxl="3"
                          xl="4"
                          lg="4"
                          md="3"
                          sm="4"
                          xs="6"
                          key={index}
                        >
                          <span className="text-sm">{t(val?.label)}</span>
                        </Col>
                      )
                    );
                  })}
                  {/* {Object.keys(interestValues).map(
                  (interest, index) =>
                    // Check if the value is 1 before rendering the span
                    interestValues[interest] === 1 && (
                      <Col
                        xxl="3"
                        xl="4"
                        lg="4"
                        md="3"
                        sm="4"
                        xs="6"
                        key={index}
                      >
                        <span className="text-sm">{interest}</span>
                      </Col>
                    )
                )} */}
                </Row>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() => userInfoEditHandle("interests")}
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

export default InterestsDetails;
