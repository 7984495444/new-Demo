import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Row,
  Col,
  Badge,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { sendNotificationsAction } from "@/redux/actions/sendNotificationAction";
import moment from "moment";
import { editTutorSessionAction } from "@/redux/actions/tutorAction";
import { t } from "i18next";
import { readIsDraftction } from "@/redux/actions/dashbordAction";
import { subjectTranslationHandle } from "../../../../utils/subjectTranslationFuncationsn";
import { convertToUppercaseDate } from "../../../../utils/timeZoneConvert";
import CloseIconInModal from "../../../@common/CloseIconInModal";
import { ShowImage } from "../../../index";

const CreateSessionRequest = ({
  show,
  hide,
  getNotificationsSessionInfo,
  sessionCreateRequestInfo,
}) => {
  const dispatch = useDispatch();

  const editSessionHandal = () => {
    let sendNotificationField = {
      receiver: sessionCreateRequestInfo?.sender?.id,
      message_en: "NotificationType.SessionCreateRequestAccept",
      message_fr: "NotificationType.SessionCreateRequestAccept",
      notification_type: ["New matches are proposed", "Visual dot"],
      source_id: sessionCreateRequestInfo?.source_id?.id, //    SESSION id
      source_type: "session_create_request_accept",
      edit_session: getNotificationsSessionInfo?.id,
    };

    let filed1 = {
      ...getNotificationsSessionInfo?.new_session_details,
      edit_session_id: sessionCreateRequestInfo?.edit_session,
    };

    dispatch(
      editTutorSessionAction(
        filed1,
        sessionCreateRequestInfo?.source_id?.id,
        "session_create_request"
      )
    );

    let showSession = {
      is_draft: 1,
    };

    dispatch(
      readIsDraftction(sessionCreateRequestInfo?.source_id?.id, showSession)
    );
    dispatch(sendNotificationsAction(sendNotificationField));
    hide();
  };

  return (
    <>
      <Modal
        isOpen={show}
        toggle={hide}
        centered={true}
        style={{ ["--x-modal-width"]: "350px" }}
      >
        <ModalHeader
          className="pb-2"
          toggle={hide}
          close={<CloseIconInModal hide={() => hide()} />}
          tag="h6"
        >
          {t("NotificationsTab.NewSessionRequest")}
        </ModalHeader>
        <ModalBody className="py-1">
          <div className="mb-5" style={{ maxWidth: "250px" }}>
            <p>
              {getNotificationsSessionInfo?.receive?.role_id?.name === "tutor"
                ? sessionCreateRequestInfo?.sender?.role_id?.id === 3
                  ? t("NotificationsTab.NewSessionTutorInParentRequest")
                  : t("NotificationsTab.NewSessionTutorInStudentRequest")
                : getNotificationsSessionInfo?.receive?.role_id?.name ===
                  "Student"
                ? t("NotificationsTab.NewSessionRequestDefault")
                : t("NotificationsTab.NewSessionRequestDefault")}
            </p>
          </div>
          <p className="text-dark-blue-a text-14 font-bold my-2">
            {convertToUppercaseDate(
              moment(
                getNotificationsSessionInfo?.new_session_details?.session_date
              ).format("dddd DD MMMM")
            )}
          </p>
          <Card className="border-light-blue-c mb-5">
            <CardBody className="p-5">
              <Row className="gy-4">
                <Col xs="8">
                  <h6 className="mb-1">
                    {subjectTranslationHandle(getNotificationsSessionInfo)}
                  </h6>
                  <span className="text-secondary">
                    {t("NewSession.Duration")}{" "}
                    {
                      getNotificationsSessionInfo?.new_session_details
                        ?.session_duration
                    }
                  </span>
                </Col>
                <Col xs="4" className="text-end">
                  <Badge className="bg-secondary text-white" color="none">
                    {
                      getNotificationsSessionInfo?.new_session_details
                        ?.session_time
                    }
                  </Badge>
                </Col>
                <Col xs="12" className="hstack gap-3">
                  <ShowImage
                    className="avatar avatar-sm rounded-circle"
                    imageName={
                      getNotificationsSessionInfo?.session_student_tutor_details
                        ?.profile_image
                    }
                    width={68}
                    height={68}
                  />
                  <span>
                    {
                      getNotificationsSessionInfo?.session_student_tutor_details
                        ?.first_name
                    }{" "}
                    {getNotificationsSessionInfo?.session_student_tutor_details?.last_name
                      .slice(0, 1)
                      .toUpperCase()}
                    .
                  </span>
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                    color="none"
                  >
                    {/* TUTEUR */}
                    {getNotificationsSessionInfo?.session_student_tutor_details
                      ?.role_id?.name === "tutor"
                      ? t("NotificationBar.Tutor").toUpperCase()
                      : t("NotificationBar.Student").toUpperCase()}
                  </Badge>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <div className="py-6 border-top border-bottom">
            {getNotificationsSessionInfo?.new_session_details
              ?.session_description && (
              <div className="mb-5">
                <span>
                  <p className="mb-1">{t("NewSession.AdditionalNotes")}</p>
                  <p className="text-light-blue-a">
                    {
                      getNotificationsSessionInfo?.new_session_details
                        ?.session_description
                    }
                  </p>
                </span>
              </div>
            )}
            <div xs="12" className="hstack gap-3">
              <ShowImage
                className="avatar avatar-sm rounded-circle"
                imageName={
                  getNotificationsSessionInfo?.session_student_tutor_details
                    ?.profile_image
                }
                width={68}
                height={68}
              />
              <span>
                {
                  getNotificationsSessionInfo?.session_student_tutor_details
                    ?.first_name
                }{" "}
                {getNotificationsSessionInfo?.session_student_tutor_details?.last_name
                  .slice(0, 1)
                  .toUpperCase()}
                .
              </span>
              <Badge
                className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                color="none"
              >
                {/* TUTEUR */}
                {getNotificationsSessionInfo?.session_student_tutor_details
                  ?.role_id?.name === "tutor"
                  ? t("NotificationBar.Tutor").toUpperCase()
                  : t("NotificationBar.Student").toUpperCase()}
              </Badge>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
          <Button
            color="dark-blue-c"
            onClick={() => editSessionHandal()}
            disabled={sessionCreateRequestInfo?.is_read === 1 ? true : false}
          >
            {t("TutorStudentDashboard.AcceptBtn")}
          </Button>
          <Button
            color="orange"
            onClick={() => hide(true, sessionCreateRequestInfo)}
            disabled={sessionCreateRequestInfo?.is_read === 1 ? true : false}
          >
            {t("TutorStudentDashboard.RefuseBtn")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default CreateSessionRequest;
