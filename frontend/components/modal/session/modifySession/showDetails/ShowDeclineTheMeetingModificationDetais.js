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
import { ArrowRight, Message2 } from "iconsax-react";
import moment from "moment";
import { t } from "i18next";
import { useRouter } from "next/router";
import { subjectTranslationHandle } from "../../../../../utils/subjectTranslationFuncationsn";
import CloseIconInModal from "../../../../@common/CloseIconInModal";
import ShowImage from "../../../../@common/ShowImage";

function ShowDeclineTheMeetingModificationDetais({
  show,
  hide,
  getNotificationsSessionInfo,
  showOnlySessionRefuaseInfo,
}) {
  const router = useRouter();

  const handleClickMessageUser = async (data) => {
    router.push({
      pathname: "/messages",
      query: { ...data },
    });
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
            <p>
              {showOnlySessionRefuaseInfo?.sender?.role_id?.id === 4
                ? showOnlySessionRefuaseInfo?.receiver?.role_id?.id === 2
                  ? t("NotificationsTab.ShowRefuseDetailsByStudentInTutor")
                  : t("NotificationsTab.ShowRefuseDetailsByStudent")
                : showOnlySessionRefuaseInfo?.sender?.role_id?.id === 3
                ? t("NotificationsTab.ShowRefuseDetailsSendByParentForTutor")
                : t("NotificationsTab.ShowRefuseDetails")}
            </p>
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
                {showOnlySessionRefuaseInfo?.sender?.role_id?.id === 3 ||
                showOnlySessionRefuaseInfo?.sender?.role_id?.id === 4 ? (
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
                      {getNotificationsSessionInfo?.receive?.last_name
                        .slice(0, 1)
                        .toUpperCase()}
                      .
                    </span>
                    <Badge
                      className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                      color="none"
                    >
                      {t("NotificationBar.Student").toUpperCase()}
                    </Badge>
                  </Col>
                ) : (
                  <Col xs="12" className="hstack gap-3">
                    <ShowImage
                      className="avatar avatar-sm rounded-circle"
                      imageName={
                        getNotificationsSessionInfo
                          ?.session_student_tutor_details?.profile_image
                      }
                      width={68}
                      height={68}
                    />
                    <span>
                      {
                        getNotificationsSessionInfo
                          ?.session_student_tutor_details?.first_name
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
                      {getNotificationsSessionInfo
                        ?.session_student_tutor_details?.role_id?.name ===
                      "tutor"
                        ? t("NotificationBar.Tutor").toUpperCase()
                        : t("NotificationBar.Student").toUpperCase()}
                    </Badge>
                  </Col>
                )}
              </Row>
            </CardBody>
          </Card>
          <div className="py-6 border-top">
            <Row className="gx-0">
              <Col xs="5" className="vstack">
                <Label className="d-block text-semi-grey mb-2">
                  {t("NotificationsTab.CurrentDateTime")}
                </Label>
                <div className="d-flex flex-wrap mt-auto">
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c w-16 me-1"
                    color="none"
                  >
                    {moment(
                      getNotificationsSessionInfo?.old_session_details
                        ?.session_date
                    ).format("DD MMM.")}
                  </Badge>
                  <Badge
                    className="bg-light-blue-c text-dark-blue-c w-14"
                    color="none"
                  >
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
              <Col xs="5" className="vstack">
                <Label className="d-block text-semi-grey mb-2">
                  {t("NotificationsTab.NewDateTimeSuggested")}
                </Label>
                <div className="d-flex flex-wrap mt-auto">
                  <Badge
                    className="bg-secondary text-white w-16 me-1"
                    color="none"
                  >
                    {moment(session_date).format("DD MMM.")}
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
                imageName={showOnlySessionRefuaseInfo?.sender?.profile_image}
                width={68}
                height={68}
              />
              <span>
                {showOnlySessionRefuaseInfo?.sender?.first_name}{" "}
                {showOnlySessionRefuaseInfo?.sender?.last_name
                  .slice(0, 1)
                  .toUpperCase()}
                .
              </span>
              <Badge
                className="bg-light-blue-c text-dark-blue-c text-8 p-1"
                color="none"
              >
                {showOnlySessionRefuaseInfo?.sender?.role_id?.name === "tutor"
                  ? t("NotificationBar.Tutor").toUpperCase()
                  : showOnlySessionRefuaseInfo?.sender?.role_id?.id === 3
                  ? t("NotificationBar.Parent").toUpperCase()
                  : t("NotificationBar.Student").toUpperCase()}
              </Badge>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-content-start px-6 pt-1">
          <Button
            color="dark-blue-c text-center my-3"
            onClick={() =>
              handleClickMessageUser(showOnlySessionRefuaseInfo?.sender)
            }
          >
            <Message2 size={22} />
            <span className="px-2">
              {t("ParentCalendar.TalkAllan")}
              {showOnlySessionRefuaseInfo?.sender?.first_name}
            </span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default ShowDeclineTheMeetingModificationDetais;
