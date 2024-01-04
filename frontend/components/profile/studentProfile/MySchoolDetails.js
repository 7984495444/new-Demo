import { atSchoolInAddTeachersDetails } from "@/utils/data";
import { t } from "i18next";
import { AddCircle, InfoCircle } from "iconsax-react";
import React, { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { MdClose } from "react-icons/md";
import {
  Badge,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";

const MySchoolDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
  getStudentIdToParentDetailsData,
}) => {
  const dispatch = useDispatch();

  const [mySchoolInfo, setMySchoolInfo] = useState(
    getUserProfileData?.school_name
  );

  const [addNewTeacher, setAddNewTeacher] = useState({});

  // my school information and add teacher onChange handle
  const mySchoolInfoChangeHandle = (field, value, isTeacherValueCHanged) => {
    if (isTeacherValueCHanged) {
      setAddNewTeacher({
        ...addNewTeacher,
        [field]: value,
      });
    } else {
      setMySchoolInfo({
        ...mySchoolInfo,
        [field]: value,
      });
    }
  };

  // add and remove teacher handle
  const addAndRemoveTeacherHandle = (isAdd, removeId) => {
    if (isAdd) {
      setMySchoolInfo({
        ...mySchoolInfo,
        teachers: [...mySchoolInfo?.teachers, addNewTeacher],
      });
      setAddNewTeacher({});
    } else {
      const removeTeacher = mySchoolInfo?.teachers?.filter(
        (obj, index) => index !== removeId
      );
      setMySchoolInfo({
        ...mySchoolInfo,
        teachers: removeTeacher,
      });
    }
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        school_name: mySchoolInfo,
      };
    } else {
      setMySchoolInfo(getUserProfileData?.school_name);
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
          <h6 className="text-pre-line">{t("StudentMyProfile.mySchool")}</h6>
        </Col>
        <Col
          xxl="10"
          xl="9"
          lg="9"
          md="12"
          className="pb-10 border-bottom border-light-blue-b min-h-16"
        >
          {userInfoEdit?.mySchool ? (
            <>
              <Row className="mb-6 gy-4 gx-2">
                <Col xxl="5" xl="4" lg="4" md="5" sm="5">
                  <Label>{t("StudentMyProfile.schoolName")}</Label>
                  <Input
                    className="custom-input-1 w-sm-40"
                    plaintext={true}
                    type="text"
                    value={mySchoolInfo?.my_school}
                    onChange={(e) =>
                      mySchoolInfoChangeHandle(
                        "my_school",
                        e.target.value,
                        false
                      )
                    }
                  />
                </Col>
                <Col xxl="4" xl="4" lg="4" md="5" sm="5">
                  <h6 className="font-semibold text-sm mb-2 opacity-0">
                    {t("StudentMyProfile.authorizationToContact")}
                    <AiOutlineInfoCircle className="text-light-blue-a text-sm ms-1" />
                  </h6>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      value="Northfield High School"
                      id="authorization"
                      onChange={(e) =>
                        mySchoolInfoChangeHandle(
                          "authorization",
                          e.target.checked,
                          false
                        )
                      }
                      checked={mySchoolInfo?.authorization}
                    />
                    <Label for="authorization" check>
                      {t("StudentMyProfile.authorizationToContact")}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Label className="mb-2">{t("StudentMyProfile.teachers")}</Label>
              <Row className="gx-2 gy-4">
                {atSchoolInAddTeachersDetails?.map((val, index) => {
                  return (
                    <Col xxl="5" xl="4" lg="4" md="5" sm="5" key={index}>
                      <Label className="text-grey-f">{val?.label}</Label>
                      <div className="position-relative w-sm-3/4">
                        <Input
                          className="custom-input-1"
                          plaintext={true}
                          type="text"
                          placeholder={t("Common.PlaceholderWriteHere")}
                          onChange={(e) =>
                            mySchoolInfoChangeHandle(
                              val?.name,
                              e.target.value,
                              true
                            )
                          }
                          value={addNewTeacher[val?.name]}
                        />
                        {index === 1 && (
                          <AddCircle
                            className="position-absolute end-0 top-1/2 translate-middle-y cursor-pointer"
                            onClick={() => addAndRemoveTeacherHandle(true)}
                          />
                        )}
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <div className="hstack flex-wrap gap-3 mt-6">
                {mySchoolInfo?.teachers?.map((val, index) => {
                  return (
                    <Badge
                      className="bg-light-blue-c text-dark-blue-c badge-text-break"
                      color="none"
                      key={index}
                    >
                      {`${val?.name}  — ${val?.email}`}
                      <MdClose
                        className="ms-1 cursor-pointer"
                        onClick={() => addAndRemoveTeacherHandle(false, index)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <Row className="mb-6 gy-4 gx-2">
                <Col xxl="5" xl="4" lg="4" md="5" sm="5">
                  <div>
                    <Label>{t("StudentMyProfile.schoolName")}</Label>
                    <p className="text-light-blue-a mt-2">
                      {mySchoolInfo?.my_school}
                      {/* Northfield High School */}
                    </p>
                  </div>
                </Col>
                <Col xxl="5" xl="4" lg="5" md="5" sm="5">
                  <div>
                    <Label>
                      {t("StudentMyProfile.authorizationToContact")}
                      <span
                        className="bonus-tooltip ms-1 text-light-blue-a text-orange-hover cursor-pointer"
                        id="availabilityTooltip"
                      >
                        <InfoCircle size="16" className="text-sm ms-1" />
                      </span>
                    </Label>
                    <UncontrolledTooltip
                      placement="right"
                      target="availabilityTooltip"
                    >
                      <div className="text-start d-flex gap-2">
                        <InfoCircle
                          size="16"
                          className="text-dark-blue-a flex-none mt-2"
                        />
                        <p className="text-dark-blue-a">
                          {`${t("StudentMyProfile.authorizationSummary")} ${
                            getStudentIdToParentDetailsData?.first_name
                          }
                          ${getStudentIdToParentDetailsData?.last_name}${t(
                            "StudentMyProfile.authorizationSummary1"
                          )} ${
                            mySchoolInfo?.my_school
                              ? mySchoolInfo?.my_school
                              : " — "
                          }${t("StudentMyProfile.authorizationSummary2")} ${
                            userData?.first_name
                          } ${userData?.last_name}${t(
                            "StudentMyProfile.authorizationSummary3"
                          )}`}
                        </p>
                      </div>
                    </UncontrolledTooltip>
                    <div className="hstack gap-2 mt-1">
                      {mySchoolInfo?.authorization ? (
                        <>
                          <AiOutlineCheckCircle className="text-green text-sm" />
                          <p className="text-light-blue-a">
                            {t("StudentMyProfile.authorizationAllowed")}
                          </p>{" "}
                        </>
                      ) : (
                        <>
                          <AiOutlineCloseCircle className="text-red text-sm" />
                          <p className="text-light-blue-a">
                            {t("StudentMyProfile.authorizationDenied")}
                          </p>{" "}
                        </>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              <Label>{t("StudentMyProfile.teachers")}</Label>
              <Row className="gx-2 gy-1 mt-2">
                {mySchoolInfo?.teachers?.map((val, index) => {
                  return (
                    <Col sm="5" className="text-light-blue-a" key={index}>
                      <Badge
                        color="light-blue-a"
                        className="h-1 w-1 p-0 me-2 translate-middle-y badge-text-break"
                        pill={true}
                      >
                        <span></span>
                      </Badge>
                      {`${val?.name}  — ${val?.email}`}
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </Col>
      </Row>
      <EditAndSaveBtn
        type="mySchool"
        isShowSaveBtn={userInfoEdit?.mySchool}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default MySchoolDetails;
