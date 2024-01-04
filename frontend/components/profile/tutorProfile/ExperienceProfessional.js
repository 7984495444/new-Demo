import { t } from "i18next";
import React from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/l10n/fr.js";
import moment from "moment";
import { ArrowDown2, Edit, Trash } from "iconsax-react";

const ExperienceProfessional = ({
  userInfoEdit,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  professionalExperienceFormData,
  handleProfessionalExperienceChange,
  professionalExperienceValues,
  handleProfessionalExperienceSubmit,
  handleDeleteProfessionalExperience,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.ExperienceProfessional")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.professionalExperiences ? (
            <>
              <Col
                xs="12"
                className="d-flex align-items-start justify-content-end flex-wrap gap-2 pb-6"
              >
                <Button
                  color="dark-blue-c"
                  onClick={(e) =>
                    userInfoSaveHandle("professionalExperiences", e)
                  }
                >
                  {t("Common.SafeguardBtn")}
                </Button>
                <Button
                  color="orange"
                  onClick={() =>
                    userInfoDiscardHandle("professionalExperiences")
                  }
                >
                  {t("Common.CancelBtn")}
                </Button>
              </Col>
              <Col xxl="8" xl="8" lg="6" md="7" sm="12" xs="12">
                <Row className="gy-2 justify-content-between">
                  <Col xxl="3" xl="3" sm="5" xs="5">
                    <Label>{t("Profile.Job")}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type="text"
                      name="experience_title"
                      value={professionalExperienceFormData.experience_title}
                      onChange={(e) =>
                        handleProfessionalExperienceChange(
                          e.target.name,
                          e.target.value
                        )
                      }
                    />
                  </Col>
                  <Col xxl="3" xl="3" sm="5" xs="5">
                    <Label>{t("Profile.BusinessAndSchool")}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type="text"
                      name="institution"
                      value={professionalExperienceFormData.institution}
                      onChange={(e) =>
                        handleProfessionalExperienceChange(
                          e.target.name,
                          e.target.value
                        )
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
                            value={professionalExperienceFormData.joining_date}
                            onChange={(date) => {
                              const dateString = date.length ? date[0] : ""; // Get the first date in the array
                              handleProfessionalExperienceChange(
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
                            value={professionalExperienceFormData.end_date}
                            onChange={(date) => {
                              const dateString = date.length ? date[0] : ""; // Get the first date in the array
                              handleProfessionalExperienceChange(
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
                  {professionalExperienceValues.map(
                    (professionalExperience, index) => {
                      return (
                        professionalExperience.experience_title &&
                        professionalExperience.institution &&
                        professionalExperience.joining_date &&
                        professionalExperience.end_date && (
                          <Col key={index}>
                            <Card className="border-dark-blue-c bg-light-blue-e">
                              <CardBody className="p-4">
                                <Row className="align-items-center">
                                  <Col xs="8">
                                    <p className="text-sm">
                                      {professionalExperience.experience_title}
                                    </p>
                                    <p className="text-light-blue-a">
                                      {professionalExperience.institution}
                                    </p>
                                    <p className="text-light-blue-a">
                                      {moment(
                                        professionalExperience.joining_date
                                      ).format("YYYY")}{" "}
                                      -{" "}
                                      {moment(
                                        professionalExperience.end_date
                                      ).format("YYYY")}
                                    </p>
                                  </Col>
                                  <Col xs="4" className="text-end">
                                    <Button
                                      color="square"
                                      onClick={() =>
                                        handleDeleteProfessionalExperience(
                                          index
                                        )
                                      }
                                    >
                                      <Trash className="text-dark-blue-c" />
                                    </Button>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        )
                      );
                    }
                  )}
                </Row>
              </Col>
              <Col
                xl="4"
                lg="6"
                md="5"
                sm="12"
                xs="12"
                className="d-flex align-items-end justify-content-end flex-wrap gap-2 pt-md-0 pt-4"
              >
                <Button
                  color="grey-d"
                  onClick={handleProfessionalExperienceSubmit}
                >
                  {t("TutorMyProfile.Submit")}
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <Row className="gy-2">
                  {professionalExperienceValues.map(
                    (professionalExperience, index) => {
                      return (
                        professionalExperience.experience_title &&
                        professionalExperience.institution &&
                        professionalExperience.joining_date &&
                        professionalExperience.end_date && (
                          <Col xxl="3" xl="4" lg="4" sm="6" key={index}>
                            <p className="text-sm">
                              {professionalExperience.experience_title}
                            </p>
                            <p className="text-light-blue-a">
                              {professionalExperience.institution}
                            </p>
                            <p className="text-light-blue-a">
                              {moment(
                                professionalExperience.joining_date
                              ).format("YYYY")}{" "}
                              -{" "}
                              {moment(professionalExperience.end_date).format(
                                "YYYY"
                              )}
                            </p>
                          </Col>
                        )
                      );
                    }
                  )}
                </Row>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() =>
                        userInfoEditHandle("professionalExperiences")
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

export default ExperienceProfessional;
