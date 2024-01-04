import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Row,
  Col,
  Badge,
  Label,
  Input,
} from "reactstrap";
import { Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { getTutorSessionByIdAction } from "@/redux/actions/tutorAction";
import moment from "moment";
import { t } from "i18next";
import { subjectTranslationHandle } from "../../../../utils/subjectTranslationFuncationsn";
import { convertToUppercaseDate } from "../../../../utils/timeZoneConvert";
import CloseIconInModal from "../../../@common/CloseIconInModal";
import ShowImage from "../../../@common/ShowImage";

function SessionCancelledDetailsModal({
  show,
  hide,
  deleteSessionInfo,
  userData,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTutorSessionByIdAction(deleteSessionInfo?.source_id?.id));
  }, []);

  const { tutorSessionById } = useSelector((state) => state.tutor);

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
        <Trash size="20" className="me-3" />{" "}
        <span className="text-base"> {t("SessionDetail.SessionCanceled")}</span>
      </ModalHeader>
      <ModalBody className="pt-2">
        <p className="text-dark-blue-a text-14 font-bold my-2">
          {convertToUppercaseDate(
            moment(tutorSessionById?.session_date).format("dddd DD MMMM") // IsDelete
          )}
        </p>
        <Card className="border">
          <CardBody>
            <Row className="gy-4">
              <Col xs="8">
                <h6>
                  {subjectTranslationHandle(
                    tutorSessionById?.session_subject_id
                  )}
                </h6>
                <span className="text-semi-grey">
                  {tutorSessionById?.session_duration}
                </span>
              </Col>
              <Col xs="4" className="text-end">
                <Badge className="bg-secondary text-white text-sm" color="none">
                  {tutorSessionById?.session_time}
                </Badge>
              </Col>
              <Col xs="12" className="hstack flex-wrap gap-3">
                <ShowImage
                  className="avatar avatar-sm rounded-pill flex-none"
                  imageName={
                    userData?.role_id?.id === 2 &&
                    tutorSessionById?.student?.profile_image
                      ? tutorSessionById?.student?.profile_image
                      : tutorSessionById?.user?.profile_image
                  }
                  width={68}
                  height={68}
                />
                <span>
                  {userData?.role_id?.id === 2 ? (
                    <>
                      {tutorSessionById?.student?.first_name}{" "}
                      {tutorSessionById?.student?.last_name
                        .slice(0, 1)
                        .toUpperCase()}
                      .
                    </>
                  ) : (
                    <>
                      {tutorSessionById?.user?.first_name}{" "}
                      {tutorSessionById?.user?.last_name
                        .slice(0, 1)
                        .toUpperCase()}
                      .
                    </>
                  )}
                </span>
                <Badge
                  className="bg-light-blue-c text-dark-blue-c text-8"
                  color="none"
                >
                  {userData?.role_id?.id === 2
                    ? t("NotificationBar.Student").toUpperCase()
                    : t("NotificationBar.Tutor").toUpperCase()}
                  {/* {deleteSessionInfo?.sender?.role_id?.name.toUpperCase()} */}
                </Badge>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <hr className="bg-light-blue-b my-6" />
        <Label>{t("NewSession.AdditionalNotes")}</Label>
        <Input
          className="custom-input-1 resize-none cursor-auto border-light-blue-b"
          type="textarea"
          rows="2"
          placeholder="Lorem ipsum dolor sit amet aliquon scicilant."
          value={tutorSessionById?.note}
          readOnly
        />
      </ModalBody>
    </Modal>
  );
}
export default SessionCancelledDetailsModal;
