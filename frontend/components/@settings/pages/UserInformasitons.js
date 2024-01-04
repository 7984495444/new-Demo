import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import MaskedFormControl from "react-bootstrap-maskedinput";
import i18n from "@/utils/i18nextInit";
import "flatpickr/dist/flatpickr.css";
import "react-loading-skeleton/dist/skeleton.css";
import { t } from "i18next";
import { getMySchoolLevels } from "@/redux/actions/schoolLevelAction";
import { addStudentAction } from "../../../redux/actions/userAction";
import { MaskedInput, createDefaultMaskGenerator } from "react-hook-mask";
import { editUserInformations, languageOptions } from "@/utils/data";
import {
  validateAddStudent,
  validateEDitUserInfromation,
} from "@/utils/validation";
import {
  deleteProfileAction,
  editStudentAction,
  editUserAction,
  getUserAction,
} from "@/redux/actions/userAction";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
  FormFeedback,
} from "reactstrap";
import RateAndSchedule from "../RateAndSchedule";
import MyParents from "../MyParents";
import MyStudents from "../MyStudents";
import ProfileImageUpdate from "../ProfileImageUpdate";
import SelectInput from "@/components/@common/inputs/SelectInput";
import LabelWithInput from "@/components/@common/inputs/LabelWithInput";
import ModifyAndCloseBtn from "../ModifyAndCloseBtn";
import { useDispatch, useSelector } from "react-redux";

const EditInformationsTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getMySchoolLevels());
  }, []);

  const { userData } = useSelector((state) => state.user);
  const { getMySchoolLevel } = useSelector((state) => state.schoolLevel);

  useEffect(() => {
    if (userData) {
      setUser({ ...userData });
      // setParentStudents(userData?.student);
      let data = [];
      for (let index = 0; index < userData?.student?.length; index++) {
        const element = userData?.student[index];
        data.push({
          key: element?.id,
          id: element?.id,
          first_name: element?.first_name,
          last_name: element?.last_name,
          email: element?.email,
          isEdit: false,
        });
      }
      setParentStudents(data);
      setImageLoading(false);
    }
  }, [userData, editUserAction]);

  const [user, setUser] = useState({ ...userData });
  const [addShowStudentInput, setAddShowStudentInput] = useState(false);
  const [error, setError] = useState({});
  const [addStudentError, setAddStudentError] = useState([]);
  const [modifyBtn, setModifyBtn] = useState(false);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [isImageDelete, setIsImageDelete] = useState(false);
  const [studentToBeAdded, setstudentToBeAdded] = useState([]);
  const cardMaskGenerator = createDefaultMaskGenerator("(999) 999-9999"); // "9999 9999 9999 9999"
  const [parentStudents, setParentStudents] = useState(null);
  const [editStudentFlag, setEditStudentFlag] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const editInfohandleChange = (field, value) => {
    setModifyInfo(true);
    setUser({
      ...user,
      [field]: value,
    });
    if (!!error[field])
      setError({
        ...error,
        [field]: null,
      });
  };

  const EditInformationsHandle = async () => {
    // delete profile image
    if (isImageDelete) {
      dispatch(deleteProfileAction());
      setImageLoading(true);
      setIsImageDelete(false);
      setModifyBtn(false);
      setImageLoading(false);
    }

    if (modifyInfo) {
      const {
        first_name,
        last_name,
        phone_no,
        address,
        dob,
        language,
        apartment,
        zip,
        province,
        profile_image,
        social_insurance_number,
        password,
        school_level,
      } = user;
      let formErrors = validateEDitUserInfromation(user);
      if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
      } else {
        let data = new FormData();
        if (profile_image) {
          setImageLoading(true);
          data.append("profile_image", profile_image);
        }
        if (user?.role_id?.id === 2) {
          data.append("social_insurance_number", social_insurance_number);
        }
        if (user?.role_id?.id !== 3) {
          data.append("dob", dob);
        }
        if (user?.role_id?.id !== 2) {
          data.append("language", language);
        }
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("phone_no", phone_no);
        data.append("address", address);
        data.append("apartment", apartment);
        data.append("zip", zip);
        data.append("province", province);
        data.append("school_level", Number(school_level));
        if (password) {
          data.append("password", password);
        }
        await dispatch(editUserAction(data));
        dispatch(getMySchoolLevels());
        setModifyBtn(false);
        setImageLoading(false);
        // setFile(false);
        if (addShowStudentInput) {
          let studError = [];
          for (let index = 0; index < studentToBeAdded?.length; index++) {
            const element = studentToBeAdded[index];
            // let userInfoError = validateEDitUserInfromation(user);
            let formErrors = validateAddStudent(element);
            if (Object.keys(formErrors).length > 0) {
              studError.push(formErrors);
            }
            // else if (Object.keys(userInfoError).length > 0) {
            //   setError(formErrors);
            // }
            else {
              let allFileds = {
                first_name: element.first_name,
                last_name: element.last_name,
                email: element.email,
                password: element.password,
                role_id: 4,
                parent_id: userData?.id,
              };
              dispatch(addStudentAction(allFileds));
              setstudentToBeAdded([]);
              // setaddStudentfieldConunter(0);
              setModifyBtn(false);
            }
          }
          setAddStudentError(studError);
        }
      }
    }
    // else if (!modifyInfo) {
    //   let formErrors = validateEDitUserInfromation(user);
    //   if (Object.keys(formErrors).length > 0) {
    //     setError(formErrors);
    //   }
    // }

    if (editStudentFlag) {
      let data = parentStudents?.filter((val) => val?.isEdit === true);
      let filed = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        filed.push({
          id: element?.id,
          first_name: element?.first_name,
          last_name: element?.last_name,
        });
      }
      dispatch(editStudentAction(filed));
      setModifyBtn(false);
    }
  };

  const addStudentFieldHandal = () => {
    const newItem = {
      id: studentToBeAdded?.length + 1,
      first_name: null,
      last_name: null,
      email: null,
      password: null,
    };
    setstudentToBeAdded([...studentToBeAdded, newItem]);
    setAddShowStudentInput(true);
  };

  const deleteStudentFieldHandal = (indexToRemove) => {
    const updatedItems = studentToBeAdded.filter(
      (item, index) => index !== indexToRemove
    );
    setstudentToBeAdded(updatedItems);
    setAddShowStudentInput(true);
  };

  const addStudenthandleChange = (field, value, index) => {
    let items = studentToBeAdded;
    items[index] = {
      ...items[index],
      [field]: value,
    };
    setstudentToBeAdded(items);

    if (!!addStudentError[index]?.[field]) {
      let items = addStudentError;
      items[index] = {
        ...items[index],
        [field]: "",
      };

      setAddStudentError(items);
    }
  };

  const deleteProfileImageHadal = () => {
    setIsImageDelete(true);
    setUser({
      ...user,
      ["profile_image"]: null,
    });
    // dispatch(deleteProfileAction());
  };

  const editStudentInfoOnchnageHandal = (field, value, index) => {
    setEditStudentFlag(true);
    let clone = [...parentStudents];
    let obj = clone[index];
    obj[field] = value;
    obj["isEdit"] = true;
    clone[index] = obj;
    setParentStudents([...clone]);
  };

  const ArrowRight = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.7071 8.7076C17.0976 8.31707 17.0976 7.68391 16.7071 7.29338L10.3431 0.92942C9.95262 0.538896 9.31946 0.538896 8.92893 0.92942C8.53841 1.31994 8.53841 1.95311 8.92893 2.34363L14.5858 8.00049L8.92893 13.6573C8.53841 14.0479 8.53841 14.681 8.92893 15.0716C9.31946 15.4621 9.95262 15.4621 10.3431 15.0716L16.7071 8.7076ZM0 9.00049L16 9.00049V7.00049L0 7.00049L0 9.00049Z" fill="#C4C4C4"/>
    </svg>`;
  const ArrowLeft = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.292892 7.29338C-0.0976315 7.68391 -0.0976314 8.31707 0.292893 8.7076L6.65686 15.0716C7.04738 15.4621 7.68054 15.4621 8.07107 15.0716C8.46159 14.681 8.46159 14.0479 8.07107 13.6573L2.41421 8.00049L8.07107 2.34363C8.46159 1.95311 8.46159 1.31995 8.07107 0.929421C7.68054 0.538897 7.04738 0.538897 6.65685 0.929421L0.292892 7.29338ZM17 7.00049L1 7.00049L1 9.00049L17 9.00049L17 7.00049Z" fill="#C4C4C4"/>
    </svg>
    `;

  return (
    <Card>
      <CardHeader className="hstack px-6 pb-2 gap-2">
        <h6 className="font-bolder me-auto">
          {t("EditInformations.PersonalInformations")}
        </h6>
        {userData?.role_id?.id === 4 && (
          <>
            <Label className="me-2">{t("StudentMyProfile.school_level")}</Label>
            <Col sm={3} className="hstack me-7">
              <select
                className={`pe-5 custom-input-1 form-select`}
                value={user?.school_level}
                // placeholder={t(val?.placeholder)}
                onChange={(e) =>
                  editInfohandleChange("school_level", Number(e.target.value))
                }
                disabled={modifyBtn ? false : true}
              >
                {getMySchoolLevel?.map((val, index) => {
                  return (
                    <option value={val?.id} key={index}>
                      {i18n.language === "en" ? val.name_en : val.name_fr}
                    </option>
                  );
                })}
              </select>
              {error["school_level "] !== "" && (
                <p className="text-danger">{error?.school_level}</p>
              )}
            </Col>
          </>
        )}
        <ModifyAndCloseBtn
          modifyBtn={modifyBtn}
          modifyHandal={(e) => {
            setModifyBtn(!modifyBtn);
            if (e) {
              dispatch(getUserAction());
              setError({});
              setstudentToBeAdded([]);
            }
          }}
        />
      </CardHeader>
      <CardBody
        className="pt-4 h-lg-calc overflow-auto"
        style={{ ["--x-h-lg"]: "214px" }}
      >
        <form
          autoComplete="off"
          // className="h-full d-flex flex-column align-items-start"
        >
          <div>
            <ProfileImageUpdate
              imageLoading={imageLoading}
              user={user}
              modifyBtn={modifyBtn}
              inputRef={inputRef}
              editInfohandleChange={(e, v) => editInfohandleChange(e, v)}
              handleClick={() => handleClick()}
              deleteProfileImageHadal={() => deleteProfileImageHadal()}
            />
          </div>
          <Row className="gx-sm-12 gy-6">
            {editUserInformations.map((val, index) => {
              if (val?.isStudentNo && userData?.role_id?.id !== 2) {
                return null; // Skip rendering this item
              }
              if (val?.isStudent && userData?.role_id?.id === 2) {
                return null; // Skip rendering this item
              }
              if (val?.isTutorNo && userData?.role_id?.id === 2) {
                return <Col sm={val?.col}></Col>; // Skip rendering this item
              }
              return (
                <>
                  {val.type === "date" &&
                    userData?.role_id?.name !== "parent" && (
                      <Col sm={val?.col} key={index}>
                        <Label>{t(val.label)}</Label>
                        <div
                          className={`position-relative ${
                            error[val.name] !== "" && "is-invalid"
                          }`}
                        >
                          <Flatpickr
                            className="form-control-plaintext custom-input-1 flatpicker-date hide-month-picker" //flatpicker-date
                            options={{
                              monthSelectorType: "static",
                              shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                              dateFormat: "Y-m-d",
                              locale: i18n.language,
                              nextArrow: ArrowRight,
                              prevArrow: ArrowLeft,
                            }}
                            value={user[val?.name]}
                            placeholder={t(val?.placeholder)}
                            onChange={(e) =>
                              editInfohandleChange(
                                val.name,
                                moment(e[0]).format("YYYY-MM-DD")
                              )
                            }
                            disabled={modifyBtn ? val.disebles : true}
                          />
                        </div>
                        {error[val.name] !== "" && (
                          <FormFeedback invalid>{error[val.name]}</FormFeedback>
                        )}
                      </Col>
                    )}
                  {val.type === "select" && (
                    <Col
                      sm={userData?.role_id?.name !== "parent" ? val?.col : 6}
                      key={index}
                    >
                      <SelectInput
                        label={t(val.label)}
                        className={`pe-5 custom-input-1 form-select`}
                        value={user[val.name]}
                        placeholder={t(val?.placeholder)}
                        name={val.name}
                        editInfohandleChange={(v, e) =>
                          editInfohandleChange(v, e)
                        }
                        disabled={modifyBtn ? val.disebles : true}
                        defaultValue={t("TutorMyProfile.Selectionner")}
                        option={languageOptions}
                        error={error}
                      />
                    </Col>
                  )}
                  {val.type === "tel" && (
                    <Col sm={val?.col} key={index}>
                      <Label>{t(val.label)}</Label>
                      {/* <Input
                          className={`custom-input-1 ${
                            error[val.name] !== "" && "is-invalid"
                          }`}
                          plaintext="true"
                          type={val.type}
                          className={`custom-input-1 form-control-plaintext ${
                            error[val.name] !== "" && "is-invalid"
                          }`}
                          placeholder={val?.placeholder}
                          value={user[val.name]}
                          autoComplete="off"
                          onChange={(e) =>
                            editInfohandleChange(val.name, e.target.value)
                          }
                          disabled={modifyBtn ? val.disebles : true}
                        /> */}
                      <MaskedInput
                        type={val.type}
                        className={`custom-input-1 form-control-plaintext ${
                          error[val.name] !== "" && "is-invalid"
                        }`}
                        placeholder={t(val?.placeholder)}
                        value={user[val.name]}
                        onChange={(e) => editInfohandleChange(val.name, e)}
                        maskGenerator={cardMaskGenerator}
                        disabled={modifyBtn ? val.disebles : true}
                      />
                      {error[val.name] !== "" && (
                        <FormFeedback invalid>{error[val.name]}</FormFeedback>
                      )}
                    </Col>
                  )}
                  {val?.name === "zip" && (
                    <Col sm={val?.col} key={index}>
                      <Label>{t(val.label)}</Label>
                      <MaskedFormControl
                        type={val.type}
                        className={`custom-input-1 form-control-plaintext`}
                        placeholder={t(val?.placeholder)}
                        value={user[val.name]}
                        isInvalid={!!error[val?.name]}
                        onChange={(e) =>
                          editInfohandleChange(val.name, e.target.value)
                        }
                        mask="*** ***"
                        disabled={modifyBtn ? val.disebles : true}
                      />
                      {error[val.name] !== "" && (
                        <FormFeedback invalid>{error[val.name]}</FormFeedback>
                      )}
                    </Col>
                  )}
                  {userData?.role_id?.id === 2 && val?.forTutor && (
                    <Col sm={val?.col} key={index}>
                      <LabelWithInput
                        lable={t(val.label)}
                        lableClassName={""}
                        plaintext={true}
                        className={`custom-input-1 ${
                          error[val.name] !== "" && "is-invalid"
                        }`}
                        type={val.type}
                        name={val.name}
                        placeholder={t(val?.placeholder)}
                        value={user[val.name]}
                        onChangeHandal={(e, t) => editInfohandleChange(e, t)}
                        autoComplete="off"
                        disabled={modifyBtn ? val.disebles : true}
                        errors={error}
                      />
                    </Col>
                  )}
                  {val?.confromPass && modifyBtn && (
                    <Col sm={val?.col} key={index}>
                      <LabelWithInput
                        lable={t(val.label)}
                        lableClassName={""}
                        plaintext={true}
                        className={`custom-input-1 ${
                          error[val.name] !== "" && "is-invalid"
                        }`}
                        type={val.type}
                        name={val.name}
                        placeholder={t(val?.placeholder)}
                        value={user[val.name]}
                        onChangeHandal={(e, t) => editInfohandleChange(e, t)}
                        autoComplete="off"
                        disabled={modifyBtn ? val.disebles : true}
                        errors={error}
                      />
                    </Col>
                  )}
                  {/* {!val?.isStudent && userData?.role_id?.id !== 4 && null}
                  {val?.isStudent && userData?.role_id?.id !== 4 && null} */}
                  {val.type !== "select" &&
                    val.type !== "date" &&
                    val.type !== "tel" &&
                    val?.name !== "zip" &&
                    !val?.forTutor &&
                    !val?.confromPass && (
                      <Col
                        sm={
                          val?.name === "password" && modifyBtn ? 3 : val?.col
                        }
                        key={index}
                      >
                        <LabelWithInput
                          lable={t(val.label)}
                          lableClassName={""}
                          plaintext={true}
                          className={`custom-input-1 ${
                            error[val.name] !== "" && "is-invalid"
                          }`}
                          type={val.type}
                          name={val.name}
                          placeholder={t(val?.placeholder)}
                          value={user[val.name]}
                          onChangeHandal={(e, t) => editInfohandleChange(e, t)}
                          autoComplete="off"
                          disabled={modifyBtn ? val.disebles : true}
                          errors={error}
                        />
                      </Col>
                    )}
                </>
              );
            })}
          </Row>
          {/* show only tutor hours rate */}
          {userData?.role_id?.name === "tutor" && <RateAndSchedule />}

          {/* show only parent in all parent student */}
          {userData?.role_id?.name === "parent" && (
            <>
              <MyStudents
                parentStudents={parentStudents}
                editStudentInfoOnchnageHandal={(v, e, i) =>
                  editStudentInfoOnchnageHandal(v, e, i)
                }
                modifyBtn={modifyBtn}
                studentToBeAdded={studentToBeAdded}
                deleteStudentFieldHandal={(i) => deleteStudentFieldHandal(i)}
                addStudenthandleChange={(v, e, i) =>
                  addStudenthandleChange(v, e, i)
                }
                addStudentError={addStudentError}
              />

              {modifyBtn && (
                <Button
                  color="outline-light-blue-a"
                  className="py-3 w-full my-6"
                  style={{ borderStyle: "dotted" }}
                  onClick={addStudentFieldHandal}
                >
                  {t("EditInformations.AddStudentBtn")}
                </Button>
              )}
            </>
          )}

          {/* show only student in all  student parent*/}
          {userData?.role_id?.name === "student" && (
            <MyParents userData={userData} />
          )}

          {/* adding student if role is pa */}
          {modifyBtn && (
            <Button
              color="dark-blue-c"
              className="mt-10"
              onClick={EditInformationsHandle}
            >
              {t("EditInformations.SafeguardBtn")}
            </Button>
          )}
        </form>
      </CardBody>
    </Card>
  );
};

export default EditInformationsTab;
