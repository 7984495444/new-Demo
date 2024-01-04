import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
  Alert,
} from "reactstrap";
import {
  ArchiveTick,
  Document,
  InfoCircle,
  MessageAdd1,
  Calendar,
  Clock,
} from "iconsax-react";
import { HierarchyTwoPoint } from "@/assets/images/index";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { sessionDurections } from "@/utils/data";
import { useDispatch } from "react-redux";
import {
  addComplateTutorSessionAction,
  addTutorSessionAction,
} from "@/redux/actions/tutorAction";
import moment from "moment";
import { t } from "i18next";
import FormData from "form-data";
import "moment/locale/fr";
import { sendNotificationsAction } from "@/redux/actions/sendNotificationAction";
import CloseIconInModal from "../../@common/CloseIconInModal";
import i18n from "@/utils/i18nextInit";

function CompleteSessionModal({ type, show, hide, sessionInfo }) {
  const dispatch = useDispatch();

  // current time
  let hours = moment().format("H");
  let min = moment().format("m");
  const currentTime = `${hours}h${min > 0 ? min + "m" : ""}`;

  const [confirmmSessionBtn, setConfirmmSessionBtn] = useState(false);
  const [absentStudentsBtn, setAbsentStudentsBtn] = useState(false);
  const [canceledSessionBtn, setCanceledSessionBtn] = useState(false);
  const [rescheduleSessionBtn, setRescheduleSessionBtn] = useState(false);
  const [AddConfromSessionInfo, setAddConfromSessionInfo] = useState({
    new_duration: "30m",
    duration: sessionInfo?.session_duration,
  });
  const [document, setDocument] = useState(null);
  const [docError, setDocError] = useState(false);
  const [errors, setErrors] = useState();
  const [showBtn, setShowBtn] = useState(false);

  const filedBlankHandal = () => {
    setAddConfromSessionInfo({
      new_duration: "30m",
      duration: sessionInfo?.session_duration,
      hour: currentTime,
    });
    setDocument(null);
  };

  const confromMessagesHandal = () => {
    filedBlankHandal();
    setConfirmmSessionBtn(!confirmmSessionBtn);
    setAbsentStudentsBtn(false);
    setCanceledSessionBtn(false);
    setRescheduleSessionBtn(false);
  };

  const absentStudentsHandal = () => {
    filedBlankHandal();
    setAbsentStudentsBtn(!absentStudentsBtn);
    setConfirmmSessionBtn(false);
    setCanceledSessionBtn(false);
  };

  const canceledSessionHandal = () => {
    filedBlankHandal();
    setCanceledSessionBtn(!canceledSessionBtn);
    setConfirmmSessionBtn(false);
    setAbsentStudentsBtn(false);
  };

  const rescheduleSessionHandal = () => {
    setRescheduleSessionBtn(!rescheduleSessionBtn);
  };

  const onChangeHandle = (field, value) => {
    setErrors(false);
    setAddConfromSessionInfo({
      ...AddConfromSessionInfo,
      [field]: value,
    });
  };

  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = ({ target: { files } }) => {
    const [{ size, name }] = files;
    var totalSizeMd = size / Math.pow(1024, 2);
    setDocument({
      size: totalSizeMd.toFixed(2),
      name: name,
    });

    if (totalSizeMd >= 20) {
      setDocError(true);
    } else {
      setAddConfromSessionInfo({
        ...AddConfromSessionInfo,
        ["document"]: files[0],
      });
      // onChangeHandal(files, type, idType, errro);
      setDocError(false);
    }
  };

  const submitDataHandle = () => {
    const {
      duration,
      dating_summary,
      reason_for_cancellation,
      next_meeting_summary,
      date,
      hour,
      new_duration,
      reason,
      description,
      document,
    } = AddConfromSessionInfo;

    if (confirmmSessionBtn) {
      if (duration && dating_summary.length >= 100) {
        let data = new FormData();
        if (document) {
          data.append("document", document);
        }
        data.append("type", "confirm_session");
        data.append("duration", duration);
        data.append("dating_summary", dating_summary);
        data.append("next_meeting_summary", next_meeting_summary || null);
        data.append("session_id", Number(sessionInfo?.id));
        let durections =
          sessionInfo?.session_duration === "30m" ||
          sessionInfo?.session_duration === "45m"
            ? `00h${sessionInfo?.session_duration}`
            : `${sessionInfo?.session_duration}m`;
        const hours = parseInt(durections.split("h")[0]);
        const minutes = parseInt(durections.split("h")[1].split("m")[0]);

        // this commented code is payment deduction.

        // const decimalTime = hours + minutes / 60;
        // let paymentDeductions = {
        //   student_id: sessionInfo?.student_id,
        //   tutor_id: 4,
        //   amount: String(decimalTime * 6).padStart(2, "0"),
        //   session_date: moment(sessionInfo?.session_date).format("YYYY-MM-DD"),
        //   payment_details: "tutoring_sessions",
        // };
        // dispatch(addPaymentDeductionsAction(paymentDeductions));
        dispatch(addComplateTutorSessionAction(data));

        let sendNotification = {
          receiver: sessionInfo?.student_id,
          message_en: "NotificationType.SessionCompleted",
          message_fr: "NotificationType.SessionCompleted",
          notification_type: ["New matches are proposed", "Visual dot"],
          source_id: Number(sessionInfo?.id), //    SESSION id
          source_type: "completed_session",
          edit_session: 0,
        };

        dispatch(sendNotificationsAction(sendNotification));
        hide();
      } else {
        setErrors(true);
        setShowBtn(false);
      }
    }

    if (absentStudentsBtn || canceledSessionBtn) {
      if (next_meeting_summary || reason_for_cancellation) {
        let data = new FormData();
        if (document) {
          data.append("document", document);
        }
        data.append(
          "type",
          `${
            absentStudentsBtn ? "absent_student" : "mutually_canceled_session"
          }`
        );
        data.append("next_meeting_summary", next_meeting_summary || null);
        data.append("reason_for_cancellation", reason_for_cancellation || null);
        data.append("session_id", Number(sessionInfo?.id));

        dispatch(addComplateTutorSessionAction(data));
        hide();
      } else {
        setErrors(true);
        setShowBtn(false);
      }
    }

    if (rescheduleSessionBtn) {
      if (date && hour && new_duration) {
        let hours1 = moment(hour).format("H");
        let min1 = moment(hour).format("m");
        let hours = moment(duration).format("H");
        let min = moment(duration).format("m");
        let fields = {
          session_date: moment(date).format("YYYY-MM-DD"), //2023-07-20,
          session_time: `${hours1}h${min1 > 0 ? min1 : ""}`,
          session_subject_id: Number(sessionInfo.subject_id),
          session_description: description ? description : "",
          session_duration: `${hours}h${min > 0 ? min : ""}`,
          student_id: Number(sessionInfo.student_id),
          // session_cancle_resion: reason,
        };
        dispatch(addTutorSessionAction(fields));
        hide();
      }
    }
  };

  const showAddBtnHandal = () => {
    return rescheduleSessionBtn
      ? AddConfromSessionInfo?.date &&
        AddConfromSessionInfo?.hour &&
        AddConfromSessionInfo?.new_duration &&
        AddConfromSessionInfo?.next_meeting_summary?.length > 0
        ? false
        : true
      : confirmmSessionBtn
      ? AddConfromSessionInfo?.dating_summary?.length > 0 && !docError
        ? false
        : true
      : !docError &&
        (AddConfromSessionInfo?.next_meeting_summary ||
          AddConfromSessionInfo?.reason_for_cancellation)
      ? false
      : true;
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
      style={{ ["--x-modal-width"]: "526px" }}
    >
      <ModalHeader
        className="pb-2"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        <ArchiveTick className="me-2 text-dark-blue-c" />
        <span className="text-base">
          {t("CompleteSessionModal.SessionTitle")}
        </span>
      </ModalHeader>
      <ModalBody className="pt-2">
        <Label className="mb-4">{t("CompleteSessionModal.DetailTitle")}</Label>
        <div className="d-flex gap-1 flex-wrap mb-6">
          <Button
            color={confirmmSessionBtn ? "dark-blue-c" : "light-blue-e"}
            className={confirmmSessionBtn ? "text-white" : "text-dark-blue-c"}
            onClick={() => confromMessagesHandal()}
          >
            {t("CompleteSessionModal.ConfirmBtn")}
          </Button>
          <Button
            color={absentStudentsBtn ? "dark-blue-c" : "light-blue-e"}
            className={absentStudentsBtn ? "text-white" : "text-dark-blue-c"}
            onClick={() => absentStudentsHandal()}
          >
            {t("CompleteSessionModal.AbsentBtn")}
          </Button>
          <Button
            color={canceledSessionBtn ? "dark-blue-c" : "light-blue-e"}
            className={canceledSessionBtn ? "text-white" : "text-dark-blue-c"}
            onClick={() => canceledSessionHandal()}
          >
            {t("CompleteSessionModal.MeetingCancelBtn")}
          </Button>
        </div>
        <Row className="gy-6 mb-8">
          {confirmmSessionBtn || absentStudentsBtn || canceledSessionBtn ? (
            //  first button
            <>
              {absentStudentsBtn && (
                <Col xs="12">
                  <Alert
                    className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
                    isOpen={true}
                    color="red"
                  >
                    <div className="alert-icon">
                      <InfoCircle />
                    </div>
                    <div className="flex-fill hstack gap-2">
                      <p className="text-dark-blue-a text-base">
                        {t("CompleteSessionModal.Alert")}
                      </p>
                    </div>
                  </Alert>
                </Col>
              )}
              {canceledSessionBtn && (
                <Col lg="3">
                  <Label className="mb-2">
                    {t("CompleteSessionModal.Duration")}
                  </Label>
                  <Input
                    className="custom-input-1 link-grey-d bg-white"
                    name="select"
                    type="select"
                    disabled
                    value={AddConfromSessionInfo.duration}
                  >
                    {sessionDurections.map((val, index) => {
                      return (
                        <option value={val.time} key={index}>
                          {val.time}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              )}
              {confirmmSessionBtn ? (
                <>
                  <Col lg="3">
                    <Label className="mb-2">
                      {t("CompleteSessionModal.Duration")}
                    </Label>
                    <Input
                      className="custom-input-1"
                      name="select"
                      type="select"
                      onChange={(e) =>
                        onChangeHandle("duration", e.target.value)
                      }
                      value={AddConfromSessionInfo.duration}
                    >
                      {sessionDurections.map((val, index) => {
                        return (
                          <option value={val.time} key={index}>
                            {val.time}
                          </option>
                        );
                      })}
                    </Input>
                  </Col>
                  <Col xs="12">
                    <Label>{t("CompleteSessionModal.DatingSummary")}</Label>
                    <Input
                      className="custom-input-1 resize-none cursor-auto"
                      type="textarea"
                      rows="3"
                      placeholder={t(
                        "CompleteSessionModal.ReasonForCancellation"
                      )}
                      onChange={(e) =>
                        onChangeHandle("dating_summary", e.target.value)
                      }
                      value={AddConfromSessionInfo?.dating_summary}
                      invalid={errors ? true : false}
                    />
                    <FormFeedback className="mt-2 text-end">
                      <InfoCircle className="me-1" size="15" />
                      {t("CompleteSessionModal.SummaryValidation")}
                    </FormFeedback>
                  </Col>
                </>
              ) : (
                <Col xs="12">
                  <Label>{t("CompleteSessionModal.CancellationReason")}</Label>
                  <Input
                    className="custom-input-1 resize-none cursor-auto"
                    type="textarea"
                    rows="3"
                    placeholder={t(
                      "CompleteSessionModal.ReasonForCancellation"
                    )}
                    value={
                      AddConfromSessionInfo?.reason_for_cancellation
                        ? AddConfromSessionInfo?.reason_for_cancellation
                        : ""
                    }
                    onChange={(e) =>
                      onChangeHandle("reason_for_cancellation", e.target.value)
                    }
                  />
                  <FormFeedback className="mt-2">
                    <InfoCircle className="me-1" size="15" />
                    {t("CompleteSessionModal.SummaryValidation")}
                  </FormFeedback>
                </Col>
              )}
              <Col xs="12">
                <Label>
                  {canceledSessionBtn
                    ? t("NewSession.AdditionalNotes")
                    : t("CompleteSessionModal.NextMeetTitle")}
                </Label>
                <Input
                  className="custom-input-1 bg-none resize-none cursor-auto"
                  type="textarea"
                  rows="3"
                  placeholder={
                    canceledSessionBtn
                      ? t("CompleteSessionModal.AddNotesPlaceholder")
                      : t("CompleteSessionModal.EnterTask")
                  }
                  value={
                    AddConfromSessionInfo?.next_meeting_summary
                      ? AddConfromSessionInfo?.next_meeting_summary
                      : ""
                  }
                  onChange={(e) =>
                    onChangeHandle("next_meeting_summary", e.target.value)
                  }
                  invalid={
                    errors && (canceledSessionBtn || absentStudentsBtn)
                      ? true
                      : false
                  }
                />
                <FormFeedback className="mt-2 text-end">
                  <InfoCircle className="me-1" size="15" />
                  {t("CompleteSessionModal.SummaryValidation")}
                </FormFeedback>
              </Col>
              <Col xs="12">
                <Label className="mb-4">{t("CompleteSessionModal.Docs")}</Label>
                <div className="d-flex gap-5">
                  <div className="w-24 rounded-2 flex-none hstack justify-content-center border border-light-blue-b">
                    <Document size="18" className="text-light-blue-b" />
                  </div>
                  <div>
                    {/* <p className="text-light-blue-a mb-2">
                      {t("CompleteSessionModal.DocSize")}
                    </p> */}
                    <p
                      className="text-light-blue-a mb-2"
                      style={{ maxWidth: "170px" }}
                    >
                      {document?.name ? (
                        <>
                          {docError ? (
                            <>
                              {t("CompleteSessionModal.DocSize")} <br />
                              <span className="text-red">
                                {t("CompleteSessionModal.DocSizeError")}
                                {/* {document?.size}MB — Upload error */}
                              </span>
                            </>
                          ) : (
                            <>
                              {document?.name} <br />
                              <span className="text-green">
                                {document?.size}MB —{" "}
                                {t("CompleteSessionModal.UploadDone")}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        t("CompleteSessionModal.DocSize")
                      )}
                    </p>
                    <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      accept="image/*,.pdf"
                      multiple="multiple"
                      onChange={handleFileChange}
                    />
                    <Button color="dark-blue-c" onClick={handleClick}>
                      {t("CompleteSessionModal.UploadBtn")}
                    </Button>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col lg="3" className="opacity-20">
                <Label className="mb-2 link-grey-d">
                  {t("CompleteSessionModal.Duration")}
                </Label>
                <Input
                  className="custom-input-1 link-grey-d bg-white"
                  name="select"
                  type="select"
                  disabled
                  value={AddConfromSessionInfo.duration}
                >
                  {sessionDurections.map((val, index) => {
                    return (
                      <option value={val.time} key={index}>
                        {val.time}
                      </option>
                    );
                  })}
                </Input>
              </Col>
              <Col xs="12" className="opacity-20">
                <Label className="link-grey-d">
                  {t("CompleteSessionModal.PostSection")}
                </Label>
                <Input
                  className="custom-input-1 link-grey-d bg-white"
                  type="test"
                  rows="3"
                  placeholder={t("CompleteSessionModal.EnterNotes")}
                  disabled
                />
              </Col>
            </>
          )}
        </Row>
        {rescheduleSessionBtn && (
          <>
            <hr
              className="border my-0 mx-n6 border-dashed"
              style={{ background: "none" }}
            />
            <div className="pt-8">
              <Row>
                <Col xs="8" className="hstack gap-3">
                  <MessageAdd1 size="20" />
                  <h6 className="text-base">
                    {t("CompleteSessionModal.Reschedule")}
                  </h6>
                </Col>
                <Col xs="4" className="text-end">
                  <div
                    className="link-dark-blue-c text-underline cursor-pointer"
                    onClick={() => rescheduleSessionHandal()}
                  >
                    {t("CompleteSessionModal.CancelBtn")}
                  </div>
                </Col>
              </Row>
              <Row className="mt-8 gy-6">
                <Col sm="4">
                  <Label className="font-bolder">
                    {t("CompleteSessionModal.DateLabel")}
                  </Label>
                  <div className="position-relative">
                    <Flatpickr
                      className="form-control-plaintext custom-input-1"
                      options={{
                        monthSelectorType: "static",
                        shorthand: ["S", "M", "T", "W", "T", "F", "S"],
                        dateFormat: "d M Y",
                        locale: i18n.language,
                        nextArrow: ArrowRight,
                        prevArrow: ArrowLeft,
                        minDate: "today",
                      }}
                      placeholder={moment().format("DD MMM YYYY")}
                      value={AddConfromSessionInfo.date}
                      onOpen={() => {
                        const allWithClass = Array.from(
                          window.document.getElementsByClassName(
                            "numInputWrapper"
                          ) // cur-year
                        );
                        allWithClass[0].style.display = "none";
                      }}
                      onChange={([e]) => onChangeHandle("date", e)}
                    />
                    <Calendar
                      className="position-absolute end-0 top-1/2 translate-middle-y overlap-10"
                      size="16"
                    />
                  </div>
                </Col>
                <Col sm="4">
                  <Label className="font-bolder">
                    {t("CompleteSessionModal.HourLabel")}
                  </Label>
                  <div className="position-relative">
                    <Flatpickr
                      className="form-control-plaintext custom-input-1"
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        // time_24hr: true,
                        locale: i18n.language,
                        // dateFormat: "h m",
                      }}
                      placeholder={currentTime}
                      value={AddConfromSessionInfo.hour}
                      onChange={([e]) => onChangeHandle("hour", e)}
                    />
                    <Clock
                      className="position-absolute end-0 top-1/2 translate-middle-y overlap-10"
                      size="16"
                    />
                  </div>
                </Col>
                <Col sm="4">
                  <Label> {t("CompleteSessionModal.Duration")}</Label>
                  <div className="position-relative">
                    <Input
                      className="pe-6 custom-input-1 text-light-blue-a bg-none border-light-blue-b"
                      name="select"
                      type="select"
                      onChange={(e) =>
                        onChangeHandle("new_duration", e.target.value)
                      }
                      value={sessionInfo.new_duration}
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
                <Col xs="12">
                  <Label className="font-bolder">
                    {t("CompleteSessionModal.AdditionalNote")}
                  </Label>
                  <Input
                    className="custom-input-1 resize-none cursor-auto"
                    type="textarea"
                    rows="3"
                    placeholder={t("CompleteSessionModal.AddNotesPlaceholder")}
                    onChange={(e) =>
                      onChangeHandle("description", e.target.value)
                    }
                    value={AddConfromSessionInfo.dating_summary}
                  />
                </Col>
              </Row>
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter className="justify-content-between px-6 pb-6">
        <Button
          color={`${showAddBtnHandal() ? "grey-d" : "dark-blue-c"}`}
          onClick={() => submitDataHandle()}
          disabled={showAddBtnHandal()}
        >
          {rescheduleSessionBtn
            ? t("NotificationsTab.ModifyButton")
            : t("NotificationsTab.ComplateButton")}
        </Button>
        {!rescheduleSessionBtn && (
          <>
            {confirmmSessionBtn && (
              <Label className="text-grey-d text-underline cursor-none">
                {t("CompleteSessionModal.Reschedule")}
              </Label>
            )}
            {(absentStudentsBtn || canceledSessionBtn) && (
              <div
                className="text-underline cursor-pointer"
                onClick={() => rescheduleSessionHandal()}
              >
                {t("CompleteSessionModal.Reschedule")}
              </div>
            )}
          </>
        )}
      </ModalFooter>
    </Modal>
  );
}
export default CompleteSessionModal;
