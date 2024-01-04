import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Label,
  Input,
} from "reactstrap";
import { MessageAdd1, Calendar, Clock, ArrowDown2 } from "iconsax-react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/l10n/fr.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addTutorSessionAction,
  editTutorSessionWithNotificationsAction,
  getAllTutorStudentAction,
} from "@/redux/actions/tutorAction";
import moment from "moment";
import { getAllSubjectByStudentIdAction } from "@/redux/actions/subjectAction";
import { addSessionValidation } from "../../../utils/validation";
import { sessionDurections } from "@/utils/data";
import { t } from "i18next";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/components/dropdown.css";
import "semantic-ui-css/components/transition.css";
import { HierarchyTwoPoint } from "@/assets/images";
import { getUserAction } from "@/redux/actions/userAction";
import {
  convertStringFromUTCtoLocal,
  convertToUniversalTime,
  convertToUserTimeZone,
} from "@/utils/timeZoneConvert";
import i18n from "@/utils/i18nextInit";
import { subjectTranslationHandle } from "../../../utils/subjectTranslationFuncationsn";
import CloseIconInModal from "../../@common/CloseIconInModal";

function NewSessionModal({
  type,
  show,
  hide,
  sessionData,
  weekType,
  userRole,
  isParentDashboard,
  isTutroDashboard,
}) {
  const dispatch = useDispatch();

  // current time
  let hours = moment().format("H");
  let min = moment().format("m");
  const currentTime = `${hours}h${min > 0 ? min + "m" : ""}`;

  const [sessionInfo, setSessionInfo] = useState(
    type
      ? {
          date:
            userRole === "dashboard" || isTutroDashboard
              ? sessionData.session_date
              : // ? convertToUserTimeZone(sessionData.session_date)
                sessionData.session_date,
          hour: sessionData.session_time,
          // hour:
          //   userRole === "dashboard" || isTutroDashboard
          //     ? convertStringFromUTCtoLocal(sessionData.session_time)
          //     : sessionData.session_time,
          duration: sessionData.session_duration,
          subject: sessionData?.session_subject_id?.id
            ? sessionData?.session_subject_id?.id
            : sessionData?.subject_id,
          description: sessionData.session_description,
          student: sessionData?.student?.id
            ? sessionData?.student?.id
            : sessionData?.student_id,
          id: sessionData.id,
          resion: sessionData?.reason_for_modification || null,
          receiver_id: sessionData?.tutor_id
            ? sessionData?.tutor_id
            : userRole === "dashboard"
            ? sessionData?.user?.id
            : sessionData?.student?.id
            ? sessionData?.student?.id
            : sessionData?.student_id,
          parent_id: sessionData?.parent_id
            ? sessionData?.parent_id
            : userRole === "dashboard"
            ? isParentDashboard
              ? sessionData?.student?.id
              : sessionData?.student?.parent_id
            : sessionData?.student_id,
          contact_id:
            userRole === "tutor"
              ? sessionData?.parent_id
                ? sessionData?.parent_id
                : sessionData?.student?.parent_id
              : sessionData?.user?.id
              ? sessionData?.user?.id
              : sessionData?.tutor_id,
        }
      : weekType
      ? {
          date: sessionData.extendedProps.session_date,
          hour: sessionData.extendedProps.session_time,
          duration: sessionData.extendedProps.session_duration,
          subject: sessionData.extendedProps.subject_id,
          description: sessionData.extendedProps.session_description,
          student: sessionData.extendedProps.student_id,
          id: sessionData.groupId,
          resion: sessionData.extendedProps.reason_for_modification || null,
          receiver_id: sessionData.extendedProps.tutor_id
            ? sessionData.extendedProps.tutor_id
            : sessionData.extendedProps.student_id,
          parent_id: sessionData?.extendedProps?.parent_id
            ? sessionData?.extendedProps?.parent_id
            : sessionData?.extendedProps?.student_id,
          contact_id:
            userRole === "tutor"
              ? sessionData?.extendedProps?.parent_id
              : sessionData?.extendedProps?.tutor_id,
        }
      : {
          duration: "30m",
          date: moment().format("YYYY-MM-DD"),
          // hour: currentTime,
        }
  );
  const [errors, setErrors] = useState({});
  const [oldSessionInfo] = useState(sessionInfo);

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.role_id?.id === 2) {
      dispatch(getAllTutorStudentAction()); // call only tutor
    }
  }, []);

  useEffect(() => {
    if (sessionInfo?.student) {
      dispatch(
        getAllSubjectByStudentIdAction(
          userData?.role_id?.id === 2
            ? userData?.id
            : userRole === "dashboard"
            ? sessionData?.user?.id
            : sessionData?.tutor_id,
          sessionInfo?.student
        )
      );
    }
  }, [sessionInfo?.student]);

  const { allTutorStudent } = useSelector((state) => state.tutor);
  const { allSubjectByStudentAndTutorId } = useSelector(
    (state) => state.subject
  );

  const [hours11, setHours11] = useState(false);
  const [duration1, setDuration1] = useState(false);
  const [getStudentToParentId, setGetStudentToParentId] = useState(null);

  let studentOptions = [];
  for (let index = 0; index < allTutorStudent?.length; index++) {
    const element = allTutorStudent[index];
    let field = {
      key: element?.id,
      text: element?.first_name + " " + element?.last_name,
      value: element?.id,
      parent_id: element?.parent_id,
      image: {
        avatar: true,
        className: "avatar-xs rounded-pill w-5",
        src: `${
          element?.profile_image
            ? `${process.env.NEXT_PUBLIC_API_URL}/users/profile-image/${element?.profile_image}`
            : "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
        }`,
      },
    };
    studentOptions.push(field);
  }

  const onChangeHandle = (field, value) => {
    if (type || weekType) {
      if (field === "hour") {
        setHours11(true);
      }
      if (field === "duration") {
        setDuration1(true);
      }
    }
    setSessionInfo({
      ...sessionInfo,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const addSessionHandle = () => {
    const { date, hour, subject, duration, description, student, reason } =
      sessionInfo;
    if (type || weekType) {
      if (date && hour && subject && duration && student) {
        let hours1 = moment(hour).format("H");
        let min1 = moment(hour).format("m");
        // let hours1 = moment(convertToUniversalTime(date, hour)).format("H");
        // let min1 = moment(convertToUniversalTime(date, hour)).format("m");
        let fields = {
          session_date: `${moment(date).format("YYYY-MM-DD")} ${moment(
            hour
          ).format("HH:mm")}`,
          session_time: `${
            hours11 ? `${hours1}h${min1 > 0 ? min1 : ""}` : hour
          }`,
          session_subject_id: Number(subject),
          session_description: description,
          session_duration: duration,
          student_id: Number(student),
          receiver_id: oldSessionInfo?.receiver_id,
          contact_id: sessionInfo?.contact_id,
          source_id: Number(sessionInfo?.id),
          old_session_details: {
            session_time: oldSessionInfo?.hour,
            session_subject_id: oldSessionInfo?.subject,
            session_duration: oldSessionInfo?.duration,
            session_description: oldSessionInfo?.description,
            session_date: oldSessionInfo?.date,
            student_id: oldSessionInfo?.student,
          },
        };

        // send notification student
        let sendNotificationField = {
          receiver: oldSessionInfo?.receiver_id,
          message_en: "NotificationType.modifySession",
          message_fr: "NotificationType.modifySession",
          notification_type: ["New matches are proposed", "Visual dot"],
          source_id: Number(sessionInfo?.id), //    SESSION id
          source_type: "session_change_request",
          edit_session: 0,
        };

        dispatch(
          editTutorSessionWithNotificationsAction(
            fields,
            sendNotificationField,
            true
          )
        );

        // send notification students parent
        let fields2 = {
          ...fields,
          // receiver_id: sessionData?.parent_id,
          receiver_id: oldSessionInfo?.parent_id,
          source_id: Number(sessionInfo?.id), //    SESSION id
        };

        let sendNotificationFieldStudentParents = {
          receiver: oldSessionInfo?.parent_id,
          message_en: "NotificationType.modifySession",
          message_fr: "NotificationType.modifySession",
          notification_type: ["New matches are proposed", "Visual dot"],
          source_id: Number(sessionInfo?.id), //    SESSION id
          source_type: "session_change_request",
          edit_session: 0,
        };

        dispatch(
          editTutorSessionWithNotificationsAction(
            fields2,
            sendNotificationFieldStudentParents,
            true
          )
        );
        hide();
      } else {
        let formErrors = addSessionValidation(sessionInfo, true);
        setErrors(formErrors);
      }
    } else {
      if (date && hour && subject && duration && student) {
        let hours1 = moment(hour).format("H");
        let min1 = moment(hour).format("m");
        // let hours2 = moment(convertToUniversalTime(date, new Date())).format(
        //   "H"
        // );
        // let min2 = moment(convertToUniversalTime(date, new Date())).format("m");

        let fields = {
          // session_date: convertToUniversalTime(date, hour),
          session_date: `${moment(date).format("YYYY-MM-DD")} ${moment(
            hour
          ).format("HH:mm")}`,
          session_time: `${
            typeof hour === "string"
              ? // ? `${hours2}h${min2 > 0 ? min2 : ""}`
                hour
              : `${hours1}h${min1 > 0 ? min1 : ""}`
          }`,
          session_subject_id: Number(subject),
          session_description: description,
          session_duration: duration,
          student_id: Number(student),
          receiver_id: Number(student),
          user_id: userData?.id,
          old_session_details: {
            // session_date: convertToUniversalTime(date, hour),
            session_date: `${moment(date).format("YYYY-MM-DD")} ${moment(
              hour
            ).format("HH:mm")}`,
            session_time: `${
              typeof hour === "string"
                ? hour
                : `${hours1}h${min1 > 0 ? min1 : ""}`
            }`,
            session_subject_id: Number(subject),
            session_description: description,
            session_duration: duration,
            student_id: Number(student),
          },
        };

        // send notification student
        let sendNotificationField = {
          receiver: Number(student), // STUDENT ID
          message_en: "NotificationType.CreateSession",
          message_fr: "NotificationType.CreateSession",
          notification_type: ["New matches are proposed", "Visual dot"],
          source_id: 0, //    SESSION id
          source_type: "session_create_request",
          edit_session: 0,
        };

        // send notification students parent
        let fields2 = {
          ...fields,
          receiver_id: getStudentToParentId,
          // source_id: 0, //    SESSION id
        };

        let sendNotificationFieldStudentParents = {
          receiver: getStudentToParentId, // PARENT ID
          message_en: "NotificationType.CreateSession",
          message_fr: "NotificationType.CreateSession",
          notification_type: ["New matches are proposed", "Visual dot"],
          source_id: 0, //    SESSION id
          source_type: "session_create_request",
          edit_session: 0,
        };

        dispatch(
          addTutorSessionAction(
            fields,
            sendNotificationField,
            fields2,
            sendNotificationFieldStudentParents,
            true
          )
        );
        hide();
      } else {
        let formErrors = addSessionValidation(sessionInfo, true);
        setErrors(formErrors);
      }
    }
  };

  const onchangeData = (e, data) => {
    let parentId = allTutorStudent?.filter(
      (val) => val?.id === Number(data?.value)
    );

    setGetStudentToParentId(parentId[0]?.parent_id);
    dispatch(getAllSubjectByStudentIdAction(userData?.id, data.value));

    setSessionInfo({
      ...sessionInfo,
      ["student"]: data.value,
    });

    if (!!errors["student"])
      setErrors({
        ...errors,
        ["student"]: null,
      });
  };

  const ArrowRight = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.7071 8.7076C17.0976 8.31707 17.0976 7.68391 16.7071 7.29338L10.3431 0.92942C9.95262 0.538896 9.31946 0.538896 8.92893 0.92942C8.53841 1.31994 8.53841 1.95311 8.92893 2.34363L14.5858 8.00049L8.92893 13.6573C8.53841 14.0479 8.53841 14.681 8.92893 15.0716C9.31946 15.4621 9.95262 15.4621 10.3431 15.0716L16.7071 8.7076ZM0 9.00049L16 9.00049V7.00049L0 7.00049L0 9.00049Z" fill="#C4C4C4"/>
    </svg>`;
  const ArrowLeft = `<svg width="17" height="16" viewBox="0 0 17 16" fill="#C4C4C4" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.292892 7.29338C-0.0976315 7.68391 -0.0976314 8.31707 0.292893 8.7076L6.65686 15.0716C7.04738 15.4621 7.68054 15.4621 8.07107 15.0716C8.46159 14.681 8.46159 14.0479 8.07107 13.6573L2.41421 8.00049L8.07107 2.34363C8.46159 1.95311 8.46159 1.31995 8.07107 0.929421C7.68054 0.538897 7.04738 0.538897 6.65685 0.929421L0.292892 7.29338ZM17 7.00049L1 7.00049L1 9.00049L17 9.00049L17 7.00049Z" fill="#C4C4C4"/>
    </svg>
    `;

  return (
    <Modal
      isOpen={show}
      toggle={hide}
      centered={true}
      style={{ ["--x-modal-width"]: "354px" }}
    >
      <ModalHeader
        className="pb-4"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        <MessageAdd1 className="me-3" />
        <span className="text-base font-bold">
          {type ? t("NewSession.ModifySession") : t("NewSession.NewSession")}
        </span>
      </ModalHeader>
      <ModalBody className="px-5 py-3">
        <Form>
          <Row className="gy-6">
            <Col sm="6">
              <Label>{t("NewSession.Date")}</Label>
              <div className="position-relative">
                <Flatpickr
                  className="form-control-plaintext custom-input-1 position-relative overlap-20 text-light-blue-a border-light-blue-b"
                  options={{
                    monthSelectorType: "static",
                    shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                    locale: i18n.language,
                    nextArrow: ArrowRight,
                    prevArrow: ArrowLeft,
                    altInput: true,
                    altInputClass:
                      "form-control-plaintext custom-input-1 position-relative overlap-20 text-light-blue-a border-light-blue-b",
                    dateFormat: "YYYY-MM-DD",
                    altFormat: "DD MMM YYYY",
                    parseDate: (datestr, format) => {
                      return moment(datestr, format, true).toDate();
                    },
                    formatDate: (date, format, locale) => {
                      // locale can also be used
                      return moment(date).format(format);
                    },
                    // minDate: "today",
                  }}
                  placeholder={moment().format("DD MMM YYYY")}
                  value={moment(sessionInfo.date).format("YYYY-MM-DD")}
                  onOpen={() => {
                    const allWithClass = Array.from(
                      document.getElementsByClassName("numInputWrapper") // cur-year
                    );
                    allWithClass[0].style.display = "none";
                  }}
                  onChange={([e]) => onChangeHandle("date", e)}
                />
                <Calendar
                  className="position-absolute end-0 top-1/2 translate-middle-y overlap-10 text-dark-blue-c"
                  size="18"
                />
              </div>
              {errors.date !== "" && (
                <p className="text-danger">{t(errors.date)}</p>
              )}
            </Col>
            <Col sm="6">
              <Label>{t("NewSession.Hour")}</Label>
              <div className="position-relative">
                <Flatpickr
                  className="form-control-plaintext custom-input-1 position-relative overlap-20 text-light-blue-a border-light-blue-b"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    // time_24hr: true,
                    // dateFormat: "h m",
                  }}
                  // placeholder={currentTime}
                  placeholder={"-- : --"}
                  value={sessionInfo.hour}
                  onChange={([e]) => onChangeHandle("hour", e)}
                />
                <Clock
                  className="position-absolute end-0 top-1/2 translate-middle-y overlap-10 text-dark-blue-c"
                  size="18"
                />
              </div>
              {errors.hour !== "" && (
                <p className="text-danger">{t(errors.hour)}</p>
              )}
            </Col>
            {!type && (
              <Col sm="6">
                <Label>{t("NewSession.Student")}</Label>
                <Dropdown
                  placeholder={t("NewSession.StudentPlaceholder")}
                  closeOnChange={true}
                  className="user-list-dropdown form-control-plaintext custom-input-1 border-light-blue-b"
                  icon={
                    <ArrowDown2
                      size="20"
                      className="user-list-dropdown-caret"
                    />
                  }
                  options={studentOptions}
                  defaultValue={sessionInfo.student}
                  fluid
                  onChange={onchangeData}
                />
                {errors.student !== "" && (
                  <p className="text-danger">{t(errors.student)}</p>
                )}
              </Col>
            )}
            <Col sm="6">
              <Label>{t("NewSession.Duration")}</Label>
              <div className="position-relative">
                <Input
                  className="pe-6 custom-input-1 text-light-blue-a bg-none border-light-blue-b"
                  name="select"
                  type="select"
                  onChange={(e) => onChangeHandle("duration", e.target.value)}
                  value={sessionInfo.duration}
                >
                  {sessionDurections.map((val, index) => {
                    return (
                      <option value={val.time} key={index}>
                        {val.time}
                      </option>
                    );
                  })}
                </Input>
                <Image
                  className="position-absolute end-0 top-1/2 translate-middle-y overlap-10"
                  src={HierarchyTwoPoint}
                  alt="Duration Icon"
                />
              </div>
            </Col>
            <Col sm="12">
              <Label>{t("NewSession.Class")}</Label>
              <Input
                className="custom-input-1 text-light-blue-a pe-5 border-light-blue-b"
                type="select"
                value={sessionInfo.subject}
                onChange={(e) => onChangeHandle("subject", e.target.value)}
              >
                <option selected disabled>
                  {t("NewSession.Session")}
                </option>
                {allSubjectByStudentAndTutorId &&
                  allSubjectByStudentAndTutorId?.map((val, index) => {
                    return (
                      <option
                        value={val.id}
                        key={index}
                        selected={type ? sessionInfo?.subject : ""}
                      >
                        {subjectTranslationHandle(val)}
                      </option>
                    );
                  })}
              </Input>
              {errors.subject !== "" && (
                <p className="text-danger">{t(errors.subject)}</p>
              )}
            </Col>
            <Col sm="12">
              <Label>{t("NewSession.AdditionalNotes")}</Label>
              <Input
                className="pe-6 custom-input-1 text-light-blue-a border-light-blue-b resize-none cursor-auto"
                type="textarea"
                rows={5}
                placeholder={t("NewSession.TypeNotesSession")}
                value={sessionInfo.description ? sessionInfo.description : ""}
                onChange={(e) => onChangeHandle("description", e.target.value)}
              />
            </Col>
            {errors.description !== "" && (
              <p className="text-danger">{t(errors.description)}</p>
            )}
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter className="px-5 pt-3 pb-5 d-block border-0">
        <Button
          color="dark-blue-c"
          className="font-bolder"
          onClick={addSessionHandle}
        >
          {type || weekType
            ? t("NewSession.ModifySession")
            : t("NewSession.CreateNewSession")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewSessionModal;
