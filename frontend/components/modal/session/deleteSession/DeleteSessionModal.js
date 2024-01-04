import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Alert,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { InfoCircle, Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTutorSessionAction } from "@/redux/actions/tutorAction";
import { t } from "i18next";
import { sendNotificationsAction } from "@/redux/actions/sendNotificationAction";
import CloseIconInModal from "../../../@common/CloseIconInModal";

function DeleteSessionModal({
  type,
  show,
  hide,
  sessionData,
  student,
  weekType,
  id,
}) {
  const dispatch = useDispatch();
  const [sessionInfo, setSessionInfo] = useState({});
  const [deleteSessionId] = useState(
    Number(id ? sessionData.id : sessionData.id)
    // Number(id ? sessionData.groupId : sessionData.id)
  );
  const [errors, setErrors] = useState(false);
  const [conformDeleteSessionModalShow, setConformDeleteSessionModalShow] =
    useState(false);

  const { userData } = useSelector((state) => state.user);

  const onChangeHandle = (field, value) => {
    setErrors(false);
    setSessionInfo({
      ...sessionInfo,
      [field]: value,
    });
  };

  const deleteSessionHandle = (val) => {
    const { description, reason } = sessionInfo;
    if (val) {
      let whoDeleted =
        userData?.role_id?.id === 2
          ? "NotificationType.TheTutorDeletedThisSession"
          : userData?.role_id?.id === 4
          ? "NotificationType.TheStudentDeletedThisSession"
          : "NotificationType.TheParentDeletedThisSession";

      let receiver_id1 = type
        ? sessionData?.tutor_id
          ? sessionData?.tutor_id
          : sessionData?.student?.id
          ? sessionData?.student?.id
          : sessionData?.student_id
        : weekType
        ? sessionData?.extendedProps?.tutor_id
          ? sessionData?.extendedProps?.tutor_id
          : sessionData?.extendedProps?.student_id
        : "";

      let receiver_id2 = type
        ? sessionData?.parent_id
          ? sessionData?.parent_id
          : sessionData?.student_id
          ? sessionData?.student_id
          : sessionData?.student?.parent_id
        : weekType
        ? sessionData?.extendedProps?.student_id
          ? sessionData?.extendedProps?.student_id
          : sessionData?.extendedProps?.parent_id
        : "";


      let filed = {
        note: description,
      };

      let sendNotificationField = {
        receiver: Number(receiver_id1),
        message_en: whoDeleted,
        message_fr: whoDeleted,
        notification_type: ["New matches are proposed", "Visual dot"],
        source_id: deleteSessionId, //    SESSION id
        source_type: "session_deleted",
        edit_session: 0,
      };

      dispatch(sendNotificationsAction(sendNotificationField));

      let sendNotificationField2 = {
        receiver: Number(receiver_id2),
        message_en: whoDeleted,
        message_fr: whoDeleted,
        notification_type: ["New matches are proposed", "Visual dot"],
        source_id: deleteSessionId, //    SESSION id
        source_type: "session_deleted",
        edit_session: 0,
      };

      dispatch(sendNotificationsAction(sendNotificationField2));
      dispatch(deleteTutorSessionAction(filed, deleteSessionId));
      hide();
    } else {
      if (description) {
        setConformDeleteSessionModalShow(!conformDeleteSessionModalShow);
      } else {
        setErrors(true);
      }
    }
  };

  return (
    <>
      <Modal isOpen={show} toggle={hide} centered={true} size="sm">
        <ModalHeader
          className="pb-2"
          toggle={hide}
          close={<CloseIconInModal hide={() => hide()} />}
          tag="div"
        >
          <Trash className="me-3" size="18" />
          <span className="font-bold">{t("SessionCancelModal.Header")}</span>
        </ModalHeader>
        <ModalBody className="pt-2">
          {conformDeleteSessionModalShow ? (
            <>
              <p>{t("SessionCancelModal.CancelSessionSummary")}</p>
              <div className="mt-5">
                {/* <ModalFooter className="  border-0 "> */}
                <Button
                  // color=""
                  style={{ backgroundColor: "#FDE4E4" }}
                  className="font-bolder text-red me-3"
                  onClick={() => {
                    deleteSessionHandle(true);
                    hide();
                  }}
                >
                  {t("Common.Cancel")}
                </Button>
                <Button
                  color="dark-blue-c"
                  className="font-bolder"
                  onClick={() => {
                    deleteSessionHandle(false);
                    hide();
                  }}
                >
                  {t("Common.DoNotCancel")}
                </Button>
              </div>
            </>
          ) : (
            <>
              {student && (
                <Alert
                  className="position-relative d-flex flex-sm-row flex-column gap-4 align-items-start"
                  isOpen={true}
                  color="red"
                >
                  <div className="alert-icon">
                    <InfoCircle />
                  </div>
                  <div className="flex-fill vstack gap-2">
                    <p className="text-dark-blue-a">
                      {t("SessionCancelModal.AlertText")}
                    </p>
                  </div>
                </Alert>
              )}
              {/* <FormGroup>
        <Label className="mb-2">{t("SessionCancelModal.OptionLabel")}</Label>
        <Input
          className="custom-input-1"
          name="select"
          type="select"
          onChange={(e) => onChangeHandle("reason", e.target.value)}
          invalid={errors}
        >
          <option>{t("SessionCancelModal.Option")}</option>
          <option value={"reason 1"}>reason 1</option>
          <option value={"reason 2"}>reason 2</option>
          <option value={"reason 3"}>reason 3</option>
          <option value={"reason 4"}>reason 4</option>
          <option value={"reason 5"}>reason 5</option>
        </Input>
        <FormFeedback>Please select reason!</FormFeedback>
      </FormGroup> */}
              <FormGroup className="mt-2 mb-6">
                <Label>{t("SessionCancelModal.AddNotes")}</Label>
                <Input
                  className="custom-input-1 resize-none cursor-auto"
                  type="textarea"
                  rows="5"
                  placeholder={t("SessionCancelModal.AddNotesPlaceholder")}
                  onChange={(e) =>
                    onChangeHandle("description", e.target.value)
                  }
                  invalid={errors ? true : false}
                />
                <FormFeedback>
                  {t("SessionCancelModal.ErrorMessages")}
                </FormFeedback>
              </FormGroup>
              <Button
                color="dark-blue-c"
                onClick={() => deleteSessionHandle(false)}
              >
                {t("SessionCancelModal.CancelBtn")}
              </Button>
            </>
          )}
        </ModalBody>
      </Modal>
      {/* {conformDeleteSessionModalShow && (
        <ConfromDeleteSessionModal
          show={conformDeleteSessionModalShow}
          hide={(e) => deleteSessionHandle(e)}
        />
      )} */}
    </>
  );
}

export default DeleteSessionModal;
