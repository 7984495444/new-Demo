import { studentAndParentEvaluationsPage1To11 } from "@/utils/data";
import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { t } from "i18next";

const ShowReportForTutor = ({ seeEvaluationInfo, isStudent }) => {
  return (
    <>
      {seeEvaluationInfo &&
        studentAndParentEvaluationsPage1To11?.map((val, index) => {
          if (val.id === "q2") {
            return null;
          }
          return (
            <div className="py-7 border-bottom" key={index}>
              <Label className="text-sm mb-4 font-semibold">
                {isStudent && val.id === "q11"
                  ? `Avez-vous des commentaires généraux à nous transmettre par rapport à ${seeEvaluationInfo?.tutor?.first_name} ${seeEvaluationInfo?.tutor?.last_name}?`
                  : t(val.label)}
              </Label>
              {val.id === "q2" ? (
                <Row className="gx-0 gy-6">
                  <Col xs="6" sm="auto" className="w-sm-56">
                    <FormGroup className="form-radio-1 pe-none" check>
                      <Input
                        name="yesno"
                        type="radio"
                        id="yes"
                        checked={seeEvaluationInfo[val.name] === "Oui"}
                        readOnly
                      />
                      <Label htmlFor="yes" check>
                        {t("Common.Yes")}
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs="6" sm="auto" className="w-sm-56">
                    <FormGroup className="form-radio-1 pe-none" check>
                      <Input
                        name="yesno"
                        type="radio"
                        id="no"
                        checked={seeEvaluationInfo[val.name] === "Non"}
                        readOnly
                      />
                      <Label htmlFor="no" check>
                        {t("Common.No")}
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              ) : val.id === "q11" ? (
                <Input
                  className="border-light-blue-b rounded-0"
                  type="textarea"
                  rows="9"
                  placeholder="Please use this space to share your thoughts"
                  defaultValue={seeEvaluationInfo[val.name]}
                  readOnly
                  style={{ resize: "none" }}
                />
              ) : (
                <div className="w-xl-max">
                  <div className="radio-inline-item-clickable back-border hstack gap-xxl-8 gap-xl-4 mb-5 justify-content-xl-start justify-content-between">
                    {Array.from({
                      length: 10,
                    }).map((_, ind) => {
                      return (
                        <div className="form-item-checkable " key={ind}>
                          <Input
                            name={val.name}
                            type="radio"
                            className="form-item-check"
                            checked={ind + 1 === seeEvaluationInfo[val.name]}
                            readOnly
                          />
                          <Label
                            className="form-item"
                            htmlFor={`${val.id}${ind + 1}`}
                            check
                          >
                            <span className="form-item-click">{ind + 1}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="hstack justify-content-between gap-2">
                    <span className="text-light-blue-a">
                      {t("Common.AssessmentUnsatisfied")}
                    </span>
                    <span className="text-light-blue-a">
                      {t("Common.AssessmentSatisfied")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default ShowReportForTutor;
