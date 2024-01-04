import { atSchoolInDetails, atSchoolInOnlyShowDetails } from "@/utils/data";
import { t } from "i18next";
import React, { useState } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import ShowDoneAndCloseIcon from "../ShowDoneAndCloseIcon";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";

const AtSchoolDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const [atSchoolI, setAtSchoolI] = useState(getUserProfileData?.at_school?.i);
  const [atSchoolRelation, setAtSchoolRelation] = useState(
    getUserProfileData?.at_school?.relation
  );
  const [atSchoolSituation, setAtSchoolSituation] = useState(
    getUserProfileData?.at_school?.situation
  );
  const [atSchoolDescribe, setAtSchoolDescribe] = useState(
    getUserProfileData?.at_school?.describe_subjects_targeted_by_failure
  );

  // at school onchange
  const atSchoolOnChangeHandle = (filed, value, type) => {
    if (type === "i") {
      setAtSchoolI({
        ...atSchoolI,
        [filed]: value,
      });
    } else if (type === "relation") {
      setAtSchoolRelation({
        ...atSchoolRelation,
        [filed]: value,
      });
    } else if (type === "situation") {
      setAtSchoolSituation({
        ...atSchoolSituation,
        [filed]: value,
      });
    }
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        at_school: {
          i: atSchoolI,
          relation: atSchoolRelation,
          situation: atSchoolSituation,
          describe_subjects_targeted_by_failure: atSchoolDescribe,
        },
      };
    } else {
      setAtSchoolI(getUserProfileData?.at_school?.i);
      setAtSchoolRelation(getUserProfileData?.at_school?.relation);
      setAtSchoolSituation(getUserProfileData?.at_school?.situation);
      setAtSchoolDescribe(
        getUserProfileData?.at_school?.describe_subjects_targeted_by_failure
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
          <h6 className="text-pre-line">{t("StudentMyProfile.atSchool")}</h6>
        </Col>
        {userInfoEdit?.atSchool ? (
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
                  {atSchoolInDetails?.map((it, i) => {
                    return (
                      <>
                        <div className="table-responsive" key={i}>
                          <table className="text-sm lh-loose" width="100%">
                            <thead>
                              <tr>
                                <th className="pb-4 font-bold" width="75%">
                                  {t(it?.title)}
                                </th>
                                <th className="pb-4" width="25%"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {it?.info?.map((val, index) => {
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
                                          atSchoolOnChangeHandle(
                                            val?.name,
                                            Number(e.target.value),
                                            it?.name
                                          )
                                        }
                                        // value={
                                        //   i === 0
                                        //     ? atSchoolI[val?.name]
                                        //     : i === 1
                                        //     ? atSchoolRelation?.relationship_with_teacher
                                        //     : atSchoolSituation?.currently_in_situation_failure
                                        // }
                                      >
                                        <option selected disabled>
                                          {t("TutorMyProfile.Selectionner")}
                                        </option>
                                        {it?.options?.map((item, ind) => {
                                          return (
                                            <option
                                              value={item?.value}
                                              key={ind}
                                              selected={
                                                i === 0
                                                  ? atSchoolI[val?.name] ===
                                                    item?.value
                                                  : i === 1
                                                  ? atSchoolRelation?.relationship_with_teacher ===
                                                    item?.value
                                                  : atSchoolSituation?.currently_in_situation_failure ===
                                                    item?.value
                                              }
                                            >
                                              {t(item?.oName)}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                        <hr
                          className="border-dotted border-top border-light-blue-b"
                          key={i}
                        />
                      </>
                    );
                  })}
                  <FormGroup className="mt-10">
                    <Label>{t("StudentMyProfile.describeSubject")}</Label>
                    <Input
                      className="custom-input-1"
                      plaintext={true}
                      type="text"
                      placeholder={t("Common.PlaceholderWriteHere")}
                      onChange={(e) => setAtSchoolDescribe(e.target.value)}
                      value={atSchoolDescribe}
                    />
                  </FormGroup>
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
                <Col lg="10">
                  {atSchoolInOnlyShowDetails?.map((it, i) => {
                    return (
                      <div className="table-responsive pb-4" key={i}>
                        <table
                          className="text-sm lh-loose"
                          width="100%"
                          style={{ minWidth: "600px" }}
                        >
                          <thead>
                            <tr>
                              {it?.tableHeader?.map((item, ind) => {
                                return (
                                  <th
                                    className={`${
                                      ind === 0 ? "text-start " : "text-center"
                                    } pb-6 font-bolder`}
                                    width={item?.widths}
                                    key={ind}
                                  >
                                    {t(item?.title)}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {it?.info?.map((val, index) => {
                              return (
                                <tr key={index}>
                                  <th scope="row" className="text-light-blue-a">
                                    {t(val?.label)}
                                  </th>
                                  <ShowDoneAndCloseIcon
                                    reciveNumber={
                                      i === 0
                                        ? atSchoolI[val?.name]
                                        : i === 1
                                        ? atSchoolRelation?.relationship_with_teacher
                                        : atSchoolSituation?.currently_in_situation_failure
                                    }
                                    filedLength={it?.filedLength}
                                  />
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                  <div className="table-responsive mt-4">
                    <table className="text-sm" width="100%">
                      <thead>
                        <tr>
                          <th className="text-start font-bolder pb-2">
                            {t("StudentMyProfile.subjectForFailure")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <p className="text-light-blue-a lh-snug text-base">
                              {atSchoolDescribe}
                            </p>
                          </td>
                        </tr>
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
        type="atSchool"
        isShowSaveBtn={userInfoEdit?.atSchool}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default AtSchoolDetails;
