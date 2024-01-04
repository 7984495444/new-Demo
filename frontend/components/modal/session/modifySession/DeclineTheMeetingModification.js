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
import { t } from "i18next";
import { subjectTranslationHandle } from "../../../../utils/subjectTranslationFuncationsn";
import CloseIconInModal from "../../../@common/CloseIconInModal";
import ShowImage from "../../../@common/ShowImage";

function DeclineTheMeetingModification({
  show,
  hide,
  editSessionInfo,
  getNotificationsSessionInfo,
}) {
  const dispatch = useDispatch();

  const [allInfo, setAllInfo] = useState({});

  const onChangeHandle = (field, value) => {
    setAllInfo({
      ...allInfo,
      [field]: value,
    });
  };

  const addRefUserHandle = () => {
    const { reason_for_refusal, note } = allInfo;

    let sendNotificationField = {
      receiver: editSessionInfo?.sender?.id,
      message_en:
        editSessionInfo?.sender?.role_id?.id === 3
          ? "NotificationType.RefuserSessionByParentForStudent"
          : editSessionInfo?.sender?.role_id?.id === 2
          ? "NotificationType.RefuserSessionByStunetForTutor"
          : "NotificationType.RefuserSession",
      message_fr:
        editSessionInfo?.sender?.role_id?.id === 3
          ? "NotificationType.RefuserSessionByParentForStudent"
          : editSessionInfo?.sender?.role_id?.id === 2
          ? "NotificationType.RefuserSessionByStunetForTutor"
          : "NotificationType.RefuserSession",
      notification_type: ["New matches are proposed", "Visual dot"],
      source_id: editSessionInfo?.source_id?.id, //    SESSION id
      source_type: "refuser_session",
      edit_session: editSessionInfo?.edit_session,
    };

    dispatch(
      updateRefuserSessionInfoAction(
        editSessionInfo?.source_id?.id,
        allInfo,
        sendNotificationField,
        "session_change_request"
      )
    );
    dispatch(sendNotificationsAction(sendNotificationField));

    hide(false);
  };

  return (
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
        Séance modifiée
      </ModalHeader>
      <ModalBody className="py-1">
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
                  imageName={getNotificationsSessionInfo?.user?.profile_image}
                  width={68}
                  height={68}
                />
                <span>
                  {editSessionInfo?.sender?.first_name}
                  {editSessionInfo?.sender?.last_name.slice(0, 1).toUpperCase()}
                  .
                </span>
                <Badge
                  className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                  color="none"
                >
                  TUTEUR
                </Badge>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="py-6 border-top">
          <div>
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
        </div>
      </ModalBody>
      <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
        <Button color="dark-blue-c" onClick={() => addRefUserHandle()}>
          {t("Common.Send")}
        </Button>
        <Button color="orange" onClick={() => hide(true)}>
          {t("Common.Cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
export default DeclineTheMeetingModification;
