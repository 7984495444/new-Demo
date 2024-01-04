import { t } from "i18next";
import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/l10n/fr.js";
import moment from "moment";
import { ArrowDown2, Edit, Trash } from "iconsax-react";

const EducationDetails = ({
  userInfoEdit,
  educationFormData,
  handleEducationChange,
  educationValues,
  handleDeleteEducation,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  handleEducationSubmit,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.Education")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.education ? (
            <>
              <Col xxl="8" xl="8" lg="6" md="7" sm="12" xs="12">
                <Row className="gy-2 justify-content-between">
                  <Col xxl="3" xl="3" sm="5" xs="5">
                    <Label>{t("Profile.Job")}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type="text"
                      name="job_title"
                      value={educationFormData.job_title}
                      onChange={(e) =>
                        handleEducationChange(e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xxl="3" xl="3" sm="5" xs="5">
                    <Label>{t("Profile.BusinessAndSchool")}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type="text"
                      name="school_name"
                      value={educationFormData.school_name}
                      onChange={(e) =>
                        handleEducationChange(e.target.name, e.target.value)
                      }
                    />
                  </Col>
                  <Col xxl="6" xl="6" sm="12" xs="12">
                    <Row className="gx-lg-2">
                      <Col xs="5">
                        <Label>{t("Profile.To")}</Label>
                        <div className="position-relative">
                          <Flatpickr
                            className="form-control-plaintext custom-input-1"
                            name="joining_date"
                            value={educationFormData.joining_date}
                            onChange={(date) => {
                              const dateString = date.length ? date[0] : ""; // Get the first date in the array
                              handleEducationChange(
                                "joining_date",
                                moment(dateString).format("YYYY-MM-DD")
                              );
                            }}
                            autoComplete="off"
                            options={{
                              readonly: false,
                              allowInput: true,
                              altFormat: "Y-m-d",
                              dateFormat: "Y-m-d",
                            }}
                          />
                          <ArrowDown2
                            className="text-dark-blue-a position-absolute bg-white end-0 bottom-3"
                            size={16}
                          />
                        </div>
                      </Col>
                      <Col xs="2" className="vstack">
                        <hr className="mt-auto" />
                      </Col>
                      <Col xs="5">
                        <Label>{t("Profile.From")}</Label>
                        <div className="position-relative">
                          <Flatpickr
                            className="form-control-plaintext custom-input-1"
                            name="end_date"
                            value={educationFormData.end_date}
                            onChange={(date) => {
                              const dateString = date.length ? date[0] : ""; // Get the first date in the array
                              handleEducationChange(
                                "end_date",
                                moment(dateString).format("YYYY-MM-DD")
                              );
                            }}
                            autoComplete="off"
                            options={{
                              readonly: false,
                              allowInput: true,
                              altFormat: "Y-m-d",
                              dateFormat: "Y-m-d",
                            }}
                          />
                          <ArrowDown2
                            className="text-dark-blue-a position-absolute bg-white end-0 bottom-3"
                            size={16}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  xxl="2"
                  xl="2"
                  lg="1"
                  md="1"
                  sm="2"
                  xs="1"
                  className="gy-6 mt-2"
                >
                  {educationValues.map((education, index) => (
                    <Col key={index}>
                      <Card className="border-dark-blue-c bg-light-blue-e">
                        <CardBody className="p-4">
                          <Row className="align-items-center">
                            <Col xs="8">
                              <p className="text-sm">{education.job_title}</p>
                              <p className="text-light-blue-a">
                                {education.school_name}
                              </p>
                              <p className="text-light-blue-a">
                                {education?.joining_date &&
                                  education?.end_date && (
                                    <>
                                      {moment(education.joining_date).format(
                                        "YYYY"
                                      )}{" "}
                                      -{" "}
                                      {moment(education.end_date).format(
                                        "YYYY"
                                      )}
                                    </>
                                  )}
                              </p>
                            </Col>
                            <Col xs="4" className="text-end">
                              <Button
                                color="square"
                                onClick={() => handleDeleteEducation(index)}
                              >
                                <Trash className="text-dark-blue-c" />
                              </Button>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>

              <Col
                xxl="4"
                xl="4"
                lg="6"
                md="5"
                sm="12"
                xs="12"
                className="d-flex flex-column"
              >
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pb-6">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) => userInfoSaveHandle("education", e)}
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() => userInfoDiscardHandle("education")}
                  >
                    {t("Common.CancelBtn")}
                  </Button>
                </div>
                <div className="mt-auto text-end">
                  <Button color="grey-d" onClick={handleEducationSubmit}>
                    Submit
                  </Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <Row className="gy-2">
                  {educationValues.map((education, index) => (
                    <Col xxl="3" xl="4" lg="6" sm="6" key={index}>
                      <p className="text-sm">{education.job_title}</p>
                      <p className="text-light-blue-a">
                        {education.school_name}
                      </p>
                      <p className="text-light-blue-a">
                        {education?.joining_date &&
                          education?.end_date &&
                          `${moment(education.joining_date).format("YYYY")} -
                        ${moment(education.end_date).format("YYYY")}`}
                      </p>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() => userInfoEditHandle("education")}
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

export default EducationDetails;
