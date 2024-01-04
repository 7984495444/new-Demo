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
import moment from "moment";
import { t } from "i18next";
import { subjectTranslationHandle } from "../../../../../utils/subjectTranslationFuncationsn";
import CloseIconInModal from "../../../../@common/CloseIconInModal";
import ShowImage from "../../../../@common/ShowImage";

function ShowCreateSessionAcceptRequestDetails({
  show,
  hide,
  getNotificationsSessionInfo,
  showCreateSessionRequestCancelInfo,
}) {
  const session_date =
    getNotificationsSessionInfo?.new_session_details?.session_date;
  // const session_date = convertToUserTimeZone(
  //   getNotificationsSessionInfo?.new_session_details?.session_date
  // );

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
          <div className="mb-5" style={{ maxWidth: "210px" }}>
            <p>
              {getNotificationsSessionInfo?.receive?.role_id?.name === "student"
                ? t("NotificationsTab.NewSessionRequestTItleStudent")
                : getNotificationsSessionInfo?.receive?.role_id?.name ===
                  "parent"
                ? t("NotificationsTab.NewSessionRequestTItleParent")
                : t("NotificationsTab.NewSessionRequestTItle")}
            </p>
          </div>
          <Card className="border-light-blue-c mb-5">
            <CardBody className="p-5">
              <Row className="gy-4">
                <Col xs="8">
                  <h6 className="mb-1">
                    {subjectTranslationHandle(getNotificationsSessionInfo)}
                  </h6>
                </Col>
                <Col xs="4" className="text-end"></Col>
                <Col xs="12" className="hstack gap-3">
                  <ShowImage
                    className="avatar avatar-sm rounded-circle"
                    imageName={
                      getNotificationsSessionInfo?.receive?.profile_image
                    }
                    width={68}
                    height={68}
                  />
                  <span>
                    {getNotificationsSessionInfo?.receive?.first_name}{" "}
                    {getNotificationsSessionInfo?.receive?.last_name}
                  </span>
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                    color="none"
                  >
                    {/* TUTEUR */}
                    {getNotificationsSessionInfo?.receive?.role_id?.name ===
                    "tutor"
                      ? t("NotificationBar.Tutor").toUpperCase()
                      : getNotificationsSessionInfo?.receive?.role_id?.name ===
                        "student"
                      ? t("NotificationBar.Student").toUpperCase()
                      : t("NotificationBar.Parent").toUpperCase()}
                  </Badge>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <div className="py-6 border-top">
            <Row className="gx-0">
              <Col xs="5" className="vstack">
                <Label className="d-block text-semi-grey mb-2">
                  {`${t("NotificationsTab.NewSessionRequestDateAndTime")}:`}
                </Label>
                <div className="d-flex flex-wrap mt-auto">
                  <Badge
                    className="bg-secondary text-white w-16 me-1"
                    color="none"
                  >
                    {moment(session_date).format("DD MMM")}
                  </Badge>
                  <Badge className="bg-secondary text-white w-14" color="none">
                    {
                      getNotificationsSessionInfo?.new_session_details
                        ?.session_time
                    }
                  </Badge>
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
          <Button
            color="dark-blue-c text-center my-3"
            onClick={() => hide(null, true)}
          >
            {t("NotificationsTab.GotItBtn")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default ShowCreateSessionAcceptRequestDetails;
