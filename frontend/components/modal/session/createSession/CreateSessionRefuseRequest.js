import React, { useState } from "react";
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
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import {
  sendNotificationsAction,
  updateRefuserSessionInfoAction,
} from "@/redux/actions/sendNotificationAction";
import moment from "moment";
import { t } from "i18next";
import { readIsDraftction } from "@/redux/actions/dashbordAction";
import { subjectTranslationHandle } from "../../../../utils/subjectTranslationFuncationsn";
import { convertToUppercaseDate } from "../../../../utils/timeZoneConvert";
import CloseIconInModal from "../../../@common/CloseIconInModal";
import ShowImage from "../../../@common/ShowImage";

const CreateSessionRefuseRequest = ({
  show,
  hide,
  getNotificationsSessionInfo,
  sessionCreateRequestInfo,
  // editSessionInfo,
}) => {
  const dispatch = useDispatch();

  const [allInfo, setAllInfo] = useState({});

  const onChangeHandle = (field, value) => {
    setAllInfo({
      ...allInfo,
      [field]: value,
    });
  };

  const editSessionHandal = () => {
    const { reason_for_refusal, note } = allInfo;
    let sendNotificationField = {
      receiver: sessionCreateRequestInfo?.sender?.id,
      message_en: "NotificationType.SessionCreationRequestCanceled",
      message_fr: "NotificationType.SessionCreationRequestCanceled",
      notification_type: ["New matches are proposed", "Visual dot"],
      source_id: sessionCreateRequestInfo?.source_id?.id, //    SESSION id
      source_type: "session_create_request_cancel",
      edit_session: getNotificationsSessionInfo?.id,
    };
    let readfielsd = {
      status: 2,
      note: note || null,
    };

    let showSession = {
      is_draft: 2,
    };

    dispatch(
      readIsDraftction(sessionCreateRequestInfo?.source_id?.id, showSession)
    );

    dispatch(
      updateRefuserSessionInfoAction(
        sessionCreateRequestInfo?.source_id?.id,
        readfielsd,
        sendNotificationField,
        "session_create_request"
      )
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
          {t("NotificationsTab.NewSessionRefuseRequest")}
        </ModalHeader>
        <ModalBody className="py-1">
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
            <div className="mb-5">
              <Label>{t("CompleteSessionModal.AdditionalNote")}</Label>
              <Input
                className="custom-input-1 resize-none cursor-auto"
                placeholder="Entrer vos notes pour cette séance"
                type="textarea"
                rows="5"
                value={allInfo.note}
                onChange={(e) => onChangeHandle("note", e.target.value)}
              />
            </div>
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
        <ModalFooter className="gap-2 justify-content-start px-6 pt-2">
          <Button color="dark-blue-c" onClick={() => editSessionHandal()}>
            {t("Common.Send")}
          </Button>
          <Button color="orange" onClick={() => hide(true)}>
            {t("Common.Cancel")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default CreateSessionRefuseRequest;
