import {
  myNeedDroupDownOptions,
  myNeedInSelectOptionDetails,
  myNeedInfoInCheckBoxWithDetails,
  sessionDurections,
} from "@/utils/data";
import { t } from "i18next";
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { Badge, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { ArrowDown2 } from "iconsax-react";
import moment from "moment";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { StudentProfileInMyNeedVlidations } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";
import { getMySchoolLevelSubjects } from "@/redux/actions/schoolLevelAction";
import i18n from "@/utils/i18nextInit";

const MyNeedsDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMySchoolLevelSubjects());
  }, []);
  const { getMySchoolLevelSubject } = useSelector((state) => state.schoolLevel);

  const [myNeedInfo, setMyNeedInfo] = useState(getUserProfileData?.my_needs);
  const [errors, setErrors] = useState({});
  const [examDetailsFlag, setExamDetailsFlag] = useState(true);

  const ArrowRight = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.7071 8.7076C17.0976 8.31707 17.0976 7.68391 16.7071 7.29338L10.3431 0.92942C9.95262 0.538896 9.31946 0.538896 8.92893 0.92942C8.53841 1.31994 8.53841 1.95311 8.92893 2.34363L14.5858 8.00049L8.92893 13.6573C8.53841 14.0479 8.53841 14.681 8.92893 15.0716C9.31946 15.4621 9.95262 15.4621 10.3431 15.0716L16.7071 8.7076ZM0 9.00049L16 9.00049V7.00049L0 7.00049L0 9.00049Z" fill="#C4C4C4"/>
  </svg>`;
  const ArrowLeft = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.292892 7.29338C-0.0976315 7.68391 -0.0976314 8.31707 0.292893 8.7076L6.65686 15.0716C7.04738 15.4621 7.68054 15.4621 8.07107 15.0716C8.46159 14.681 8.46159 14.0479 8.07107 13.6573L2.41421 8.00049L8.07107 2.34363C8.46159 1.95311 8.46159 1.31995 8.07107 0.929421C7.68054 0.538897 7.04738 0.538897 6.65685 0.929421L0.292892 7.29338ZM17 7.00049L1 7.00049L1 9.00049L17 9.00049L17 7.00049Z" fill="#C4C4C4"/>
  </svg>
  `;

  // my need onchange handle
  const myNeedOnChangeHandle = (filed, value) => {
    if (filed === "matter") {
      if (!myNeedInfo?.matter.includes(value)) {
        setMyNeedInfo({
          ...myNeedInfo,
          [filed]: [...myNeedInfo?.matter, value],
        });
      }
    } else {
      setMyNeedInfo({
        ...myNeedInfo,
        [filed]: value,
      });
      if (!!errors[filed])
        setErrors({
          ...errors,
          [filed]: null,
        });
    }
  };

  const myNeedRemoveOnChangeHandle = (value) => {
    const newArray = myNeedInfo?.matter?.filter((item) => item !== value);
    setMyNeedInfo({
      ...myNeedInfo,
      ["matter"]: newArray,
    });
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    let closeFalg = true;

    if (subtype) {
      let formErrors = StudentProfileInMyNeedVlidations(myNeedInfo);
      if (
        Object.keys(formErrors).length > 0 &&
        myNeedInfo?.preparing_for_exam
      ) {
        // setCount((prevCount) => prevCount + 1);
        setExamDetailsFlag(false);
        closeFalg = false;
        setErrors(formErrors);
      } else {
        closeFalg = true;
        setExamDetailsFlag(true);
        let data = myNeedInfo;
        if (!myNeedInfo?.preparing_for_exam) {
          data = {
            ...data,
            exam_date: null,
            more_details_on_materials: "",
          };
        } else {
          data = myNeedInfo;
        }
        field = {
          ...getUserProfileData,
          my_needs: data,
        };
      }
    } else {
      if (closeFalg) {
        setMyNeedInfo(getUserProfileData?.my_needs);
      }
    }
    // submit data edit
    if (subtype && closeFalg) {
      dispatch(editUserProfileAction(userData?.id, field));
    }
    if (closeFalg) {
      userInfoEditHandle(type);
    }
  };

  return (
    <>
      <Row className="gy-6 gx-0">
        <Col xxl="2" xl="3" lg="3" md="12">
          <h6 className="text-pre-line">{t("StudentMyProfile.myNeeds")}</h6>
        </Col>
        {userInfoEdit?.myNeeds ? (
          <Col
            xxl="10"
            xl="9"
            lg="9"
            md="12"
            className="pb-10 border-bottom border-light-blue-b min-h-16"
          >
            <Row sm="auto" xs="1">
              <Col className="w-sm-40">
                <h6 className="mb-3">{t("StudentMyProfile.matter")}</h6>
                <div>
                  <Input
                    type="select"
                    className={`select-light-blue-plain-text text-black pe-4 
                    }`}
                    onChange={(e) =>
                      myNeedOnChangeHandle("matter", Number(e.target.value))
                    }
                    // value={myNeedInfo?.matter[0]}
                  >
                    {/* {myNeedDroupDownOptions?.map((item, index) => {
                      return (
                        item?.isShow?.includes(
                          Number(userData?.school_level)
                        ) && (
                          <option value={item?.value} key={index}>
                            {t(item?.name)}
                          </option>
                        )
                      );
                    })} */}
                    <option selected disabled>
                      {t("TutorMyProfile.Selectionner")}
                    </option>
                    {getMySchoolLevelSubject?.map((item, index) => {
                      return (
                        item?.setting_no?.id ===
                          Number(userData?.school_level) && (
                          <option value={item?.setting_value} key={index}>
                            {i18n.language === "en"
                              ? item.name_en
                              : item.name_fr}
                          </option>
                        )
                      );
                    })}
                  </Input>
                </div>
                <div className="hstack gap-2 flex-wrap mt-3">
                  {/* {myNeedDroupDownOptions?.map((val, index) => { */}
                  {getMySchoolLevelSubject?.map((val, index) => {
                    return (
                      myNeedInfo?.matter?.includes(val?.setting_value) && (
                        <Badge
                          className="bg-light-blue-c text-dark-blue-c p-2 font-semibold badge-text-break"
                          color="none"
                          key={index}
                        >
                          {/* {t(val?.name)} */}
                          {i18n.language === "en" ? val.name_en : val.name_fr}
                          <MdClose
                            className="ms-1 cursor-pointer"
                            onClick={() =>
                              myNeedRemoveOnChangeHandle(val?.setting_value)
                            }
                          />
                        </Badge>
                      )
                    );
                  })}
                </div>
              </Col>
              {myNeedInSelectOptionDetails?.map((val, ind) => {
                return (
                  <Col className="w-sm-40">
                    <h6 className="mb-3">{t(val?.label)}</h6>
                    <div>
                      <Input
                        type="select"
                        className={`select-light-blue-plain-text text-black pe-4 ${
                          ind === 1 && "w-12 d-inline me-2"
                        }`}
                        onChange={(e) =>
                          myNeedOnChangeHandle(
                            val?.name,
                            ind === 1 ? e.target.value : Number(e.target.value)
                          )
                        }
                        // value={myNeedInfo[val?.name]}
                      >
                        <option selected disabled>
                          {t("TutorMyProfile.Selectionner")}
                        </option>
                        {ind === 1
                          ? sessionDurections?.map((it, index) => {
                              return (
                                <option
                                  value={it.time}
                                  key={index}
                                  selected={myNeedInfo[val?.name] === it.time}
                                >
                                  {it.time}
                                </option>
                              );
                            })
                          : val?.options?.map((item, index) => {
                              // return index === 0
                              //   ? item?.isShow?.includes(
                              //       Number(userData?.school_level)
                              //     )
                              //   : true && (
                              //       <option value={item?.value} key={index}>
                              //         {t(item?.name)}
                              //       </option>
                              //     );
                              return (
                                <option
                                  value={item?.value}
                                  key={index}
                                  selected={
                                    myNeedInfo[val?.name] === item?.value
                                  }
                                >
                                  {t(item?.name)}{" "}
                                </option>
                              );
                            })}
                      </Input>
                      {ind === 1 && (
                        <span className="text-black">
                          {t("StudentMyProfile.hours")}
                        </span>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row md="2" className="gy-10 mt-lg-14 mt-8">
              {myNeedInfoInCheckBoxWithDetails?.map((val, index) => {
                return (
                  <Col key={index}>
                    <FormGroup className="mb-4" check>
                      <Input
                        type="checkbox"
                        id={val?.id}
                        onChange={(e) =>
                          myNeedOnChangeHandle(val?.name, e.target.checked)
                        }
                        checked={myNeedInfo[val?.name]}
                      />
                      <Label className="text-sm" for="support" check>
                        {t(val?.lable)}
                      </Label>
                    </FormGroup>
                    <ul className="vstack gap-2 ps-5 font-light mb-0">
                      {val?.info?.map((item, ind) => {
                        return <li key={ind}>{t(item)}</li>;
                      })}
                    </ul>
                    {index === 2 && myNeedInfo?.preparing_for_exam && (
                      <div className="mt-6">
                        {/* // Show this div when checkbox is checked */}
                        <h6 className="mb-3 font-regular text-sm">
                          {t("StudentMyProfile.examDate")}
                        </h6>
                        <div className="position-relative w-sm-32 mb-5">
                          <Flatpickr
                            className="form-control-plaintext custom-input-1"
                            options={{
                              monthSelectorType: "static",
                              shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                              dateFormat: "d/m/y",
                              locale: i18n.language || "fr",
                              nextArrow: ArrowRight,
                              prevArrow: ArrowLeft,
                            }}
                            onChange={([e]) =>
                              myNeedOnChangeHandle("exam_date", e)
                            }
                            value={myNeedInfo?.exam_date}
                            placeholder={"00/00/0000"}
                          />
                          {errors?.exam_date !== "" && (
                            <p className="text-danger">{errors?.exam_date}</p>
                          )}
                          <ArrowDown2
                            className="position-absolute end-0 top-1/2 translate-middle-y overlap-10"
                            size="16"
                          />
                        </div>
                        <div className="mb-0">
                          <Label
                            className="text-sm mb-3 font-semibold"
                            style={{ maxWidth: "202px" }}
                          >
                            {t("StudentMyProfile.moreDetailsForExamMaterial")}
                          </Label>
                          <Input
                            className="p-3"
                            style={{ maxWidth: "310px" }}
                            type="textarea"
                            placeholder="Écrivez ici"
                            onChange={(e) =>
                              myNeedOnChangeHandle(
                                "more_details_on_materials",
                                e.target.value
                              )
                            }
                            value={myNeedInfo?.more_details_on_materials}
                          />
                          {errors?.more_details_on_materials !== "" && (
                            <p className="text-danger">
                              {errors?.more_details_on_materials}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Col>
        ) : (
          <>
            <Col
              xxl="10"
              xl="9"
              lg="9"
              md="12"
              className="pb-10 border-bottom border-light-blue-b min-h-16"
            >
              <Row className="gy-lg-6 gy-4 gx-2 mb-6">
                <Col xxl="3" lg="3" className="">
                  <h6 className="mb-lg-3 mb-2">
                    {t("StudentMyProfile.matter")}
                  </h6>
                  <div className="hstack gap-2 flex-wrap mt-3">
                    {/* {myNeedDroupDownOptions?.map((val, index) => { */}
                    {getMySchoolLevelSubject?.map((val, index) => {
                      return (
                        myNeedInfo?.matter?.includes(val?.setting_value) && (
                          <Badge
                            className="bg-light-blue-c text-dark-blue-c p-2 font-semibold mt-3 badge-text-break"
                            color="none"
                            key={index}
                          >
                            {/* {t(val?.name)} */}
                            {i18n.language === "en" ? val.name_en : val.name_fr}
                          </Badge>
                        )
                      );
                    })}
                  </div>
                </Col>
                {myNeedInSelectOptionDetails?.map((it, i) => {
                  return (
                    <Col xxl="3" lg="3" key={i}>
                      <h6 className="mb-lg-3 mb-2">{t(it?.label)}</h6>
                      {i === 1 ? (
                        <p className="text-light-blue-a">
                          {`${myNeedInfo?.duration} ${t(
                            "StudentMyProfile.Hours"
                          )}`}
                        </p>
                      ) : (
                        it?.options?.map((val, index) => {
                          return (
                            val?.value === Number(myNeedInfo[it?.name]) && (
                              <Badge
                                className="bg-light-blue-c text-dark-blue-c p-2 font-semibold badge-text-break"
                                color="none"
                                key={index}
                              >
                                {t(val?.name)}
                              </Badge>
                            )
                          );
                        })
                      )}
                    </Col>
                  );
                })}
                {/* <Col xxl="2" lg="6">
              <Button
                className="btn-dark-blue-c text-white-hover"
                onClick={() => userInfoEditHandle("myNeeds")}
              >
                Changer mes besoins
              </Button>
            </Col> */}
              </Row>
              <Row className="gy-6 gx-2">
                {myNeedInfoInCheckBoxWithDetails?.map((val, index) => {
                  return (
                    myNeedInfo[val?.name] && (
                      <Col xxl="5" xl="6" lg="6" sm="6" key={index}>
                        <Label>{t(val?.lable)}</Label>
                        {val?.info?.map((item, ind) => {
                          return (
                            <p className="text-light-blue-a" key={ind}>
                              <Badge
                                color="light-blue-a"
                                className="h-1 w-1 p-0 me-2 translate-middle-y badge-text-break"
                                pill={true}
                              >
                                <span></span>
                              </Badge>
                              {t(item)}
                            </p>
                          );
                        })}
                        {index === 2 && myNeedInfo?.preparing_for_exam && (
                          <div className="pt-4 mt-4 border-top border-dashed">
                            <p className="text-light-blue-a">
                              <Badge
                                color="light-blue-a"
                                className="h-1 w-1 p-0 me-2 translate-middle-y badge-text-break"
                                pill={true}
                              >
                                <span></span>
                              </Badge>
                              {t("StudentMyProfile.exam")}:{" "}
                              {myNeedInfo?.more_details_on_materials} —{" "}
                              {moment(myNeedInfo?.exam_date).format("MM/DD/YY")}
                            </p>
                          </div>
                        )}
                      </Col>
                    )
                  );
                })}
              </Row>
            </Col>
          </>
        )}
      </Row>
      <EditAndSaveBtn
        type="myNeeds"
        isShowSaveBtn={userInfoEdit?.myNeeds}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default MyNeedsDetails;
