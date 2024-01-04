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
import { Message2 } from "iconsax-react";
import moment from "moment";
import { t } from "i18next";
import { useRouter } from "next/router";
import { subjectTranslationHandle } from "../../../../../utils/subjectTranslationFuncationsn";
import { convertToUppercaseDate } from "../../../../../utils/timeZoneConvert";
import CloseIconInModal from "../../../../@common/CloseIconInModal";
import ShowImage from "../../../../@common/ShowImage";

function ShowCreateSessionRefuseRequestDetails({
  show,
  hide,
  getNotificationsSessionInfo,
  showCreateSessionRequestCancelInfo,
}) {
  const router = useRouter();

  const handleClickMessageUser = async (data) => {
    router.push({
      pathname: "/messages",
      query: { ...data },
    });
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
          {t("NotificationsTab.NewSessionRefused")}
        </ModalHeader>
        <ModalBody className="py-1">
          <div className="mb-5" style={{ maxWidth: "210px" }}>
            <p>
              {getNotificationsSessionInfo?.receive?.role_id?.name === "student"
                ? t("NotificationsTab.NewSessionRefusedTitleStudent")
                : getNotificationsSessionInfo?.receive?.role_id?.name ===
                  "parent"
                ? t("NotificationsTab.NewSessionRefusedTitleParent")
                : t("NotificationsTab.NewSessionRefusedTitle")}
            </p>
          </div>
          {convertToUppercaseDate(
            moment(
              getNotificationsSessionInfo?.new_session_details?.session_date
            ).format("dddd DD MMMM")
          )}
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
          <div className="py-6 border-top border-bottom">
            {getNotificationsSessionInfo?.note && (
              <div className="mb-5">
                <span>
                  <p className="mb-1">{t("NewSession.AdditionalNotes")}</p>
                  <p className="text-light-blue-a">
                    {getNotificationsSessionInfo?.note}
                  </p>
                </span>
              </div>
            )}
            <div xs="12" className="hstack gap-3">
              <ShowImage
                className="avatar avatar-sm rounded-circle"
                imageName={getNotificationsSessionInfo?.receive?.profile_image}
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
                {getNotificationsSessionInfo?.receive?.role_id?.name === "tutor"
                  ? t("NotificationBar.Tutor").toUpperCase()
                  : getNotificationsSessionInfo?.receive?.role_id?.name ===
                    "student"
                  ? t("NotificationBar.Student").toUpperCase()
                  : t("NotificationBar.Parent").toUpperCase()}
              </Badge>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
          <Button
            color="dark-blue-c text-center my-3"
            onClick={() =>
              handleClickMessageUser(getNotificationsSessionInfo?.receive)
            }
          >
            <Message2 size={22} />
            <span className="px-2">{`${t("NotificationsTab.TalkTo")} ${
              getNotificationsSessionInfo?.receive?.first_name
            }`}</span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default ShowCreateSessionRefuseRequestDetails;
