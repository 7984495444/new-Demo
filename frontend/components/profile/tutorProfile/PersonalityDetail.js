import { personalitys } from "@/utils/data";
import { t } from "i18next";
import { Edit } from "iconsax-react";
import React from "react";
import { MdClose, MdDone } from "react-icons/md";
import { Button, Col, Input, Row } from "reactstrap";

const PersonalityDetail = ({
  userInfoEdit,
  handlePersonalityChange,
  personalityValues,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.Personality")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.myPersonality ? (
            <>
              <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
                <div className="table-responsive">
                  <table className="text-sm lh-loose" width="100%">
                    <thead>
                      <tr>
                        <th className="pb-6" width="75%">
                          Je suis...
                        </th>
                        <th className="pb-6" width="25%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {personalitys?.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <span className="text-light-blue-a">
                                {t(val?.label)}
                              </span>
                            </td>
                            <td>
                              <Input
                                type="select"
                                className="select-light-blue-plain-text text-black pe-4"
                                onChange={(e) =>
                                  handlePersonalityChange(
                                    val?.name,
                                    Number(e.target.value)
                                  )
                                }
                                // value={personalityValues[val?.name]}
                              >
                                <option selected disabled>
                                  {t("TutorMyProfile.Selectionner")}
                                </option>
                                <option
                                  value={1}
                                  selected={personalityValues[val?.name] === 1}
                                >
                                  {t("Profile.DifficultiesVery")}
                                </option>
                                <option
                                  value={2}
                                  selected={personalityValues[val?.name] === 2}
                                >
                                  {t("Profile.DifficultiesEnough")}
                                </option>
                                <option
                                  value={3}
                                  selected={personalityValues[val?.name] === 3}
                                >
                                  {t("Profile.DifficultiesLittle")}
                                </option>
                                <option
                                  value={4}
                                  selected={personalityValues[val?.name] === 4}
                                >
                                  {t("Profile.DifficultiesNotAtAll")}
                                </option>
                              </Input>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) => userInfoSaveHandle("myPersonality", e)}
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() => userInfoDiscardHandle("myPersonality")}
                  >
                    {t("Common.CancelBtn")}
                  </Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
                <div className="table-responsive">
                  <table className="text-sm lh-loose" width="100%">
                    <thead>
                      <tr>
                        <th className="text-start pb-6" width="40%">
                          {t("Profile.PersonalityDifficulties")}
                        </th>
                        <th className="text-center pb-6" width="15%">
                          {t("Profile.DifficultiesVery")}
                        </th>
                        <th className="text-center pb-6" width="15%">
                          {t("Profile.DifficultiesEnough")}
                        </th>
                        <th className="text-center pb-6" width="15%">
                          {t("Profile.DifficultiesLittle")}
                        </th>
                        <th className="text-center pb-6" width="15%">
                          {t("Profile.DifficultiesNotAtAll")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {personalitys?.map((val, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row" className="text-start">
                              {t(val?.label)}
                            </th>
                            <td className="text-center">
                              {parseInt(personalityValues[val?.name]) === 1 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                            <td className="text-center">
                              {parseInt(personalityValues[val?.name]) === 2 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                            <td className="text-center">
                              {parseInt(personalityValues[val?.name]) === 3 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                            <td className="text-center">
                              {parseInt(personalityValues[val?.name]) === 4 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col xxl="4" xl="4" lg="2" md="5" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  {isEditable && (
                    <Button
                      color="unset"
                      size="sm"
                      className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                      onClick={() => userInfoEditHandle("myPersonality")}
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

export default PersonalityDetail;
