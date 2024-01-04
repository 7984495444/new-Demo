import { t } from "i18next";
import { AddCircle, Edit } from "iconsax-react";
import React from "react";
import { MdClose, MdDone } from "react-icons/md";
import { Button, Col, Input, Row } from "reactstrap";

const MasterylevelDeatils = ({
  userInfoEdit,
  managingLearningDifficulties,
  difficultiesOnChangeHandle,
  learningDifficulties,
  newLearningDifficulty,
  setNewLearningDifficulty,
  addLearningDifficulty,
  userInfoSaveHandle,
  userInfoEditViewHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.MasteryLevel")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        <Row className="gx-md-6 gx-0">
          {userInfoEdit?.masteryOfLearningDifficulties ? (
            <>
              <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
                <div className="table-responsive">
                  <table className="text-sm lh-loose" width="100%">
                    <thead>
                      <tr>
                        <th className="pb-6" width="75%">
                          {t("Profile.MasteryLevelDifficulties")}
                        </th>
                        <th className="pb-6" width="25%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {managingLearningDifficulties?.map((val, index) => {
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
                                  difficultiesOnChangeHandle(
                                    val?.name,
                                    e.target.value
                                  )
                                }
                                value={learningDifficulties[val?.name]}
                              >
                                <option defaultValue>
                                  {t("TutorMyProfile.Selectionner")}
                                </option>
                                <option value={1}>
                                  {t("Profile.DifficultiesYes")}
                                </option>
                                <option value={2}>
                                  {t("Profile.DifficultiesNo")}
                                </option>
                                <option value={3}>
                                  {t("Profile.DifficultiesDoNotKnow")}
                                </option>
                              </Input>
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td>
                          <div className="d-flex gap-4">
                            <span className="text-light-blue-a">Autre:</span>
                            <div className="position-relative">
                              <Input
                                className="custom-input-1 pt-1 pe-8"
                                plaintext={true}
                                type="text"
                                placeholder="Précicez ici"
                                value={newLearningDifficulty}
                                onChange={(e) =>
                                  setNewLearningDifficulty(e.target.value)
                                }
                              />
                              <AddCircle
                                size={16}
                                className="position-absolute end-0 top-3 translate-middle-y"
                                onClick={addLearningDifficulty}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
                <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                  <Button
                    color="dark-blue-c"
                    onClick={(e) =>
                      userInfoSaveHandle("masteryOfLearningDifficulties", e)
                    }
                  >
                    {t("Common.SafeguardBtn")}
                  </Button>
                  <Button
                    color="orange"
                    onClick={() =>
                      userInfoEditViewHandle("masteryOfLearningDifficulties")
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
                <div className="table-responsive">
                  <table className="text-sm lh-loose" width="100%">
                    <thead>
                      <tr>
                        <th className="text-start pb-6" width="50%">
                          {t("Profile.MasteryLevelDifficulties")}
                        </th>
                        <th className="text-center pb-6" width="16%">
                          {t("Profile.DifficultiesYes")}
                        </th>
                        <th className="text-center pb-6" width="17%">
                          {t("Profile.DifficultiesNo")}
                        </th>
                        <th className="text-center pb-6" width="17%">
                          {t("Profile.DifficultiesDoNotKnow")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {managingLearningDifficulties?.map((val, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row" className="text-start">
                              {t(val?.label)}
                            </th>
                            <td className="text-center">
                              {parseInt(learningDifficulties[val?.name]) ===
                              1 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                            <td className="text-center">
                              {parseInt(learningDifficulties[val?.name]) ===
                              2 ? (
                                <MdDone className="text-xl text-dark-blue-c" />
                              ) : (
                                <MdClose className="text-xl text-light-a" />
                              )}
                            </td>
                            <td className="text-center">
                              {parseInt(learningDifficulties[val?.name]) ===
                              3 ? (
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
                      onClick={() =>
                        userInfoEditHandle("masteryOfLearningDifficulties")
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

export default MasterylevelDeatils;
