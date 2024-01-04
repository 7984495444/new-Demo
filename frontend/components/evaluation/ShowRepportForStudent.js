import {
  tutorProfile,
  tutorProfileQuestion10To12,
  tutorProfileQuestion13To15,
} from "@/utils/data";
import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import { t } from "i18next";

const ShowRepportForStudent = ({ seeEvaluationInfo }) => {
  return (
    <>
      {seeEvaluationInfo &&
        tutorProfile.map((val, index) => {
          return (
            <div className="tutor-profile-form-col first" key={index}>
              <div className="tutor-profile-form-col-content">
                <Label className="text-sm mb-5">{t(val?.label)}</Label>
                <div className="w-xl-max">
                  <div className="radio-inline-item-clickable back-border hstack gap-xxl-8 gap-xl-4 mb-5 justify-content-xl-start justify-content-between">
                    {Array.from({
                      length: 10,
                    }).map((_, ind) => {
                      return (
                        <div className="form-item-checkable" key={ind}>
                          <Input
                            name={val?.name}
                            type="radio"
                            className="form-item-check"
                            defaultChecked={
                              ind + 1 === seeEvaluationInfo[val?.name]
                            }
                            readOnly
                          />
                          <Label
                            className="form-item"
                            htmlFor={`${val?.id}${ind + 1}`}
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
              </div>
            </div>
          );
        })}
      {seeEvaluationInfo &&
        tutorProfileQuestion10To12.map((val, index) => {
          return (
            <>
              <div className="tutor-profile-form-col second" key={index}>
                <div className="tutor-profile-form-col-content">
                  <Label className="text-sm mb-5">{t(val?.label)}</Label>
                  <Row className="gx-0 gy-6">
                    {val?.from.map((item, ind) => {
                      return (
                        <Col xs="6" sm="auto" className="w-sm-56" key={ind}>
                          <FormGroup className="form-radio-1 pe-none" check>
                            <Input
                              name={val.name}
                              type="radio"
                              checked={seeEvaluationInfo[val.name] === item.id}
                              readOnly
                            />
                            <Label htmlFor={item.id} check>
                              {t(item.label)}
                            </Label>
                          </FormGroup>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </>
          );
        })}
      {/* text */}
      {seeEvaluationInfo &&
        tutorProfileQuestion13To15.map((val, index) => {
          return (
            <div className="tutor-profile-form-col third" key={index}>
              <div className="tutor-profile-form-col-content">
                <Label className="text-sm mb-5">{t(val.label)}</Label>
                <Input
                  readOnly
                  className="border-light-blue-b rounded-0 resize-none cursor-auto"
                  type="textarea"
                  rows="9"
                  placeholder="Please use this space to share your thoughts"
                  defaultValue={seeEvaluationInfo[val?.name]}
                />
              </div>
            </div>
          );
        })}
      {/* </div> */}
    </>
  );
};

export default ShowRepportForStudent;
