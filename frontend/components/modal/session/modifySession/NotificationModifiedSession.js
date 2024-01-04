import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Card,
  CardBody,
  Row,
  Col,
  Badge,
} from "reactstrap";
import { ArrowRight } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendNotificationsAction } from "@/redux/actions/sendNotificationAction";
import moment from "moment";
import { editTutorSessionAction } from "@/redux/actions/tutorAction";
import { getUserAction } from "../../../../redux/actions/userAction";
import { t } from "i18next";
import { subjectTranslationHandle } from "../../../../utils/subjectTranslationFuncationsn";
import CloseIconInModal from "../../../@common/CloseIconInModal";
import ShowImage from "../../../@common/ShowImage";

function NotificationModifiedSession({
  show,
  hide,
  getNotificationsSessionInfo,
  editSessionInfo,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const { userData } = useSelector((state) => state.user);

  const editSessionHandal = () => {
    let sendNotificationField = {
      receiver: editSessionInfo?.sender?.id,
      message_en: "NotificationType.SessionUpdated",
      message_fr: "NotificationType.SessionUpdated",
      notification_type: ["New matches are proposed", "Visual dot"],
      source_id: editSessionInfo?.source_id?.id, //    SESSION id
      source_type: "update_session",
      edit_session: editSessionInfo?.edit_session,
    };

    let sendNotificationField1 = {
      // receiver:
      //   userData?.role_id?.id === 3
      //     ? editSessionInfo?.source_id?.student?.id
      //     : userData?.role_id?.id === 2
      //     ? editSessionInfo?.sender?.parent_id
      //     : editSessionInfo?.receiver?.parent_id,
      receiver:
        userData?.role_id?.id === 3
          ? editSessionInfo?.source_id?.student?.id
          : userData?.role_id?.id === 2
          ? editSessionInfo?.sender?.id
          : editSessionInfo?.receiver?.parent_id,
      message_en: "NotificationType.SessionUpdated",
      message_fr: "NotificationType.SessionUpdated",
      notification_type: ["New matches are proposed", "Visual dot"],
      source_id: editSessionInfo?.source_id?.id, //    SESSION id
      source_type: "update_session",
      edit_session: editSessionInfo?.edit_session,
    };

    let filed = {
      ...getNotificationsSessionInfo?.new_session_details,
      edit_session_id: editSessionInfo?.edit_session,
    };

    dispatch(
      editTutorSessionAction(
        filed,
        editSessionInfo?.source_id?.id,
        "session_change_request"
      )
    );
    dispatch(sendNotificationsAction(sendNotificationField));
    dispatch(sendNotificationsAction(sendNotificationField1));
    hide();
  };

  const session_date =
    getNotificationsSessionInfo?.new_session_details?.session_date;

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
          {t("NotificationsTab.ChangeRequest")}
        </ModalHeader>
        <ModalBody className="py-1">
          <div className="mb-5" style={{ maxWidth: "210px" }}>
            <p>{t("NotificationsTab.ChangeRequestDone")}</p>
          </div>
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
                      getNotificationsSessionInfo?.old_session_details
                        ?.session_duration
                    }
                  </span>
                </Col>
                <Col xs="4" className="text-end">
                  <Badge className="bg-secondary text-white" color="none">
                    {
                      getNotificationsSessionInfo?.old_session_details
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
          <div className="py-6 border-top">
            <Row className="gx-0">
              <Col xs="5">
                <Label className="d-block text-semi-grey mb-2">
                  {t("NotificationsTab.CurrentDateTime")}
                </Label>
                <div className="d-flex flex-wrap">
                  <Badge
                    className="bg-secondary text-white w-16 me-1"
                    color="none"
                  >
                    {moment(
                      getNotificationsSessionInfo?.old_session_details
                        ?.session_date
                    ).format("DD MMM.")}
                  </Badge>
                  <Badge className="bg-secondary text-white w-14" color="none">
                    {
                      getNotificationsSessionInfo?.old_session_details
                        ?.session_time
                    }
                  </Badge>
                </div>
              </Col>
              <Col className="d-flex align-items-end justify-content-center pb-2">
                <ArrowRight className="text-dark-blue-c" size={16} />
              </Col>
              <Col xs="5">
                <Label className="d-block text-semi-grey mb-2">
                  {t("NotificationsTab.NewDateTime")}
                </Label>
                <div className="d-flex flex-wrap">
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c w-16 me-1"
                    color="none"
                  >
                    {moment(session_date).format("DD MMM.")}
                  </Badge>
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c w-14"
                    color="none"
                  >
                    {
                      getNotificationsSessionInfo?.new_session_details
                        ?.session_time
                    }
                  </Badge>
                </div>
              </Col>
            </Row>
          </div>
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
                imageName={editSessionInfo?.sender?.profile_image}
                width={68}
                height={68}
              />
              <span>
                {editSessionInfo?.sender?.first_name}{" "}
                {editSessionInfo?.sender?.last_name.slice(0, 1).toUpperCase()}.
              </span>
              <Badge
                className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                color="none"
              >
                {/* TUTEUR */}
                {editSessionInfo?.sender?.role_id?.name === "tutor"
                  ? t("NotificationBar.Tutor").toUpperCase()
                  : editSessionInfo?.sender?.role_id?.id === 3
                  ? t("NotificationBar.Parent").toUpperCase()
                  : t("NotificationBar.Student").toUpperCase()}
              </Badge>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
          <Button
            color="dark-blue-c"
            onClick={() => editSessionHandal()}
            disabled={editSessionInfo?.is_read === 1 ? true : false}
          >
            {t("TutorStudentDashboard.AcceptBtn")}
          </Button>
          <Button
            color="orange"
            onClick={() => hide(true, editSessionInfo)}
            disabled={editSessionInfo?.is_read === 1 ? true : false}
          >
            {t("TutorStudentDashboard.RefuseBtn")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default NotificationModifiedSession;
