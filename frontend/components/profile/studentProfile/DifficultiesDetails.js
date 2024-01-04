import {
  learningDifficultiesFollowed,
  learningDifficultiesList,
} from "@/utils/data";
import { t } from "i18next";
import { AddCircle } from "iconsax-react";
import React, { useState } from "react";
import { Badge, Col, Input, Row } from "reactstrap";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";

const DifficultiesDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const [learningDifficulties, setLearningDifficulties] = useState(
    getUserProfileData?.followed_by?.status
  );

  const [learningDifficultiesFollowedBy, setLearningDifficultiesFollowedBy] =
    useState(getUserProfileData?.followed_by?.followBy);

  // set daynemic data
  const [managingLearningDifficulties, setManagingLearningDifficulties] =
    useState(learningDifficultiesList);
  const [newLearningDifficulty, setNewLearningDifficulty] = useState("");

  // for handeling 'learning Difficulty' section
  const difficultiesOnChangeHandle = (filed, value, type) => {
    if (type) {
      setLearningDifficulties({
        ...learningDifficulties,
        [filed]: value,
      });
    } else {
      setLearningDifficultiesFollowedBy({
        ...learningDifficultiesFollowedBy,
        [filed]: value,
      });
    }
  };

  const addLearningDifficultyOnchnageHnadle = (val) => {
    setNewLearningDifficulty(val);
  };

  // add learn Difficulty
  const addLearningDifficulty = () => {
    if (newLearningDifficulty.trim() !== "") {
      setLearningDifficulties({
        ...learningDifficulties,
        [newLearningDifficulty]: 1, // Set the default value here
      });
      // Add the new learning difficulty to the managingLearningDifficulties array
      setManagingLearningDifficulties([
        ...managingLearningDifficulties,
        {
          name: newLearningDifficulty,
          label: newLearningDifficulty,
        },
      ]);
      setNewLearningDifficulty("");
    }
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        followed_by: {
          status: learningDifficulties,
          followBy: learningDifficultiesFollowedBy,
        },
      };
    } else {
      setLearningDifficulties(getUserProfileData?.followed_by?.status);
      setLearningDifficultiesFollowedBy(
        getUserProfileData?.followed_by?.followBy
      );
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
            {t("StudentMyProfile.difficulties")}
          </h6>
        </Col>
        {userInfoEdit?.learningDisabilities ? (
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
                            {t("Profile.PersonalityDifficulties")}
                          </th>
                          <th className="pb-4" width="25%"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {managingLearningDifficulties?.map((val, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <span className="text-light-blue-a">
                                  {t(val?.label)}
                                  {/* {t("Profile.AttentionDeficit")} */}
                                </span>
                              </td>
                              <td>
                                <Input
                                  type="select"
                                  className="select-light-blue-plain-text text-black pe-4"
                                  onChange={(e) =>
                                    difficultiesOnChangeHandle(
                                      val?.name,
                                      Number(e.target.value),
                                      true
                                    )
                                  }
                                  // value={learningDifficulties[val?.name]}
                                >
                                  <option selected disabled>
                                    {t("TutorMyProfile.Selectionner")}
                                  </option>
                                  <option
                                    value={1}
                                    selected={
                                      learningDifficulties[val?.name] === 1
                                    }
                                  >
                                    {t("Profile.DifficultiesYes")}
                                  </option>
                                  <option
                                    value={2}
                                    selected={
                                      learningDifficulties[val?.name] === 2 &&
                                      true
                                    }
                                  >
                                    {t("Profile.DifficultiesNo")}
                                  </option>
                                  <option
                                    value={3}
                                    selected={
                                      learningDifficulties[val?.name] === 3 &&
                                      true
                                    }
                                  >
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
                              <span className="text-light-blue-a">
                                {t("StudentMyProfile.other")}:
                              </span>
                              <div className="position-relative">
                                <Input
                                  className="custom-input-1"
                                  style={{ paddingTop: "6px" }}
                                  plaintext={true}
                                  type="text"
                                  placeholder={t("Common.SpecifyHere")}
                                  value={newLearningDifficulty}
                                  onChange={(e) =>
                                    addLearningDifficultyOnchnageHnadle(
                                      e.target.value
                                    )
                                  }
                                />
                                <AddCircle
                                  size={16}
                                  className="position-absolute end-0 top-3 translate-middle-y cursor-pointer"
                                  onClick={() => addLearningDifficulty()}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive mt-10">
                    <table className="text-sm lh-loose" width="100%">
                      <thead>
                        <tr>
                          <th className="pb-4" width="75%">
                            {t("StudentMyProfile.followBy")}
                          </th>
                          <th className="pb-4" width="25%"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {learningDifficultiesFollowed?.map((val, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <span className="text-light-blue-a">
                                  {t(val?.label)}
                                  {/* {t("Profile.AttentionDeficit")} */}
                                </span>
                              </td>
                              <td>
                                <Input
                                  type="select"
                                  className="select-light-blue-plain-text text-black pe-4"
                                  onChange={(e) =>
                                    difficultiesOnChangeHandle(
                                      val?.name,
                                      Number(e.target.value),
                                      false
                                    )
                                  }
                                  // value={
                                  //   learningDifficultiesFollowedBy[val?.name]
                                  // }
                                >
                                  <option selected disabled>
                                    {t("TutorMyProfile.Selectionner")}
                                  </option>
                                  <option
                                    value={1}
                                    selected={
                                      learningDifficulties[val?.name] === 1
                                    }
                                  >
                                    {t("Profile.DifficultiesYes")}
                                  </option>
                                  <option
                                    value={2}
                                    selected={
                                      learningDifficulties[val?.name] === 2 &&
                                      true
                                    }
                                  >
                                    {t("Profile.DifficultiesNo")}
                                  </option>
                                  <option
                                    value={3}
                                    selected={
                                      learningDifficulties[val?.name] === 3 &&
                                      true
                                    }
                                  >
                                    {t("Profile.DifficultiesDoNotKnow")}
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
              <div className="border-dotted border-bottom border-light-blue-b pb-8">
                <h6 className="text-sm">Situation</h6>
                <div className="hstack gap-2 flex-wrap mt-md-3 mt-8">
                  {managingLearningDifficulties?.map((val, index) => {
                    return (
                      learningDifficulties[val?.name] === 1 && (
                        <Badge
                          className="bg-light-blue-c text-dark-blue-c p-2 badge-text-break"
                          color="none"
                          key={index}
                        >
                          {t(val?.label)}
                        </Badge>
                      )
                    );
                  })}
                </div>
              </div>
              <div className="mt-7">
                <h6 className="text-sm mb-2">
                  {t("StudentMyProfile.iAmFollowBy")}
                </h6>
                <div className="hstack gap-2 flex-wrap mt-3">
                  {learningDifficultiesFollowed?.map((val, index) => {
                    return (
                      learningDifficultiesFollowedBy[val?.name] === 1 && (
                        <Badge
                          className="bg-light-blue-c text-dark-blue-c p-2 badge-text-break"
                          color="none"
                          key={index}
                        >
                          {t(val?.label)}
                        </Badge>
                      )
                    );
                  })}
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
      <EditAndSaveBtn
        type="learningDisabilities"
        isShowSaveBtn={userInfoEdit?.learningDisabilities}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default DifficultiesDetails;
