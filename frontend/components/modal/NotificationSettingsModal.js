import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { editNotificationAction } from "@/redux/actions/notificationAction";
import CloseIconInModal from "../@common/CloseIconInModal";

function NotificationSettingsModal({ show, hide, allInfo }) {
  const dispatch = useDispatch();

  const onChangeHandle = (e) => {
    let filed = {
      ...allInfo,
      show_notification_model: e,
    };
    dispatch(editNotificationAction(filed));
    hide();
  };

  return (
    <Modal
      isOpen={show}
      toggle={hide}
      centered={true}
      style={{ ["--x-modal-width"]: "354px" }}
    >
      <ModalHeader
        className="pb-2"
        toggle={hide}
        close={<CloseIconInModal hide={() => hide()} />}
        tag="h6"
      >
        {t("NotificationSettingsModal.Header")}
      </ModalHeader>
      <ModalBody className="py-2">
        <p className="text-light-blue-a" style={{ maxWidth: "280px" }}>
          {t("NotificationSettingsModal.Body")}
        </p>
      </ModalBody>
      <ModalFooter className="pt-4 pb-6 px-6 justify-content-start">
        <Button color="dark-blue-c" onClick={hide}>
          {t("NotificationSettingsModal.OkBtn")}
        </Button>
        <FormGroup className="ps-7 ms-4" check>
          <Input
            type="checkbox"
            id="notificationShow"
            className="rounded-6 ms-n7"
            style={{ borderWidth: "1px" }}
            onChange={(e) => onChangeHandle(e.target.checked)}
          />
          <Label for="notificationShow" className="text-light-blue-a" check>
            {t("NotificationSettingsModal.NotificationShow")}
          </Label>
        </FormGroup>
      </ModalFooter>
    </Modal>
  );
}
export default NotificationSettingsModal;
