import { personalitys } from "@/utils/data";
import { t } from "i18next";
import React, { useState } from "react";
import { Col, Input, Row } from "reactstrap";
import ShowDoneAndCloseIcon from "../ShowDoneAndCloseIcon";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";

const MyPersonalityDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const [personalityValues, setPersonalityValues] = useState(
    getUserProfileData?.personality
  );

  // personality onchange
  const handlePersonalityChange = (field, value) => {
    setPersonalityValues({
      ...personalityValues,
      [field]: value,
    });
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        personality: personalityValues,
      };
    } else {
      setPersonalityValues(getUserProfileData?.personality);
    }
    // submit data edit
    if (subtype) {
      dispatch(editUserProfileAction(userData?.id, field));
    }
    userInfoEditHandle(type);
  };

  return (
    <>
      <Row className="gy-6 gx-0">
        <Col xxl="2" xl="3" lg="3" md="12">
          <h6 className="text-pre-line">
            {t("StudentMyProfile.myPersonality")}
          </h6>
        </Col>
        {userInfoEdit?.myPersonality ? (
          <>
            <Col
              xxl="10"
              xl="9"
              lg="9"
              md="12"
              className="pb-10 border-bottom border-light-blue-b min-h-16"
            >
              <Row>
                <Col xxl="6" xl="8" lg="8">
                  <div className="table-responsive">
                    <table className="text-sm lh-loose" width="100%">
                      <thead>
                        <tr>
                          <th className="pb-4 font-bold" width="75%">
                            {t("StudentMyProfile.iAm")}
                          </th>
                          <th className="pb-4" width="25%"></th>
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
                                    selected={
                                      personalityValues[val?.name] === 1
                                    }
                                  >
                                    {t("Profile.DifficultiesVery")}
                                  </option>
                                  <option
                                    value={2}
                                    selected={
                                      personalityValues[val?.name] === 2
                                    }
                                  >
                                    {t("Profile.DifficultiesEnough")}
                                  </option>
                                  <option
                                    value={3}
                                    selected={
                                      personalityValues[val?.name] === 3
                                    }
                                  >
                                    {t("Profile.DifficultiesLittle")}
                                  </option>
                                  <option
                                    value={4}
                                    selected={
                                      personalityValues[val?.name] === 4
                                    }
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
              </Row>
            </Col>
          </>
        ) : (
          <>
            <Col
              xxl="10"
              xl="9"
              lg="9"
              md="12"
              className="pb-10 border-bottom border-light-blue-b min-h-16"
            >
              <Row>
                <Col sm="10">
                  <div className="table-responsive pb-4">
                    <table
                      className="text-sm lh-loose"
                      width="100%"
                      style={{ minWidth: "600px" }}
                    >
                      <thead>
                        <tr>
                          <th
                            className="text-start pb-6 font-bolder"
                            width="50%"
                          >
                            {t("Profile.PersonalityDifficulties")}
                          </th>
                          <th
                            className="text-center pb-6 font-bolder"
                            width="12%"
                          >
                            {t("Profile.DifficultiesVery")}
                          </th>
                          <th
                            className="text-center pb-6 font-bolder"
                            width="12%"
                          >
                            {t("Profile.DifficultiesEnough")}
                          </th>
                          <th
                            className="text-center pb-6 font-bolder"
                            width="12%"
                          >
                            {t("Profile.DifficultiesLittle")}
                          </th>
                          <th
                            className="text-center pb-6 font-bolder"
                            width="14%"
                          >
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
                              <ShowDoneAndCloseIcon
                                reciveNumber={personalityValues[val?.name]}
                                filedLength={4}
                              />
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
      <EditAndSaveBtn
        type="myPersonality"
        isShowSaveBtn={userInfoEdit?.myPersonality}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default MyPersonalityDetails;
