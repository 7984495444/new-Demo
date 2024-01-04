import Image from "next/image";
import { HierarchyTwoPointGrey } from "@/assets/images/index";
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Message2, Edit, Trash } from "iconsax-react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import { t } from "i18next";
import { showMinTimeHandle } from "@/utils/TimeShowFuncations";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

function LectureCard({
  type,
  item,
  GivenDate,
  CurrentDate,
  showEditSessionModal,
  showSessionCompleteModal,
  showDeleteSessionModal,
  handleClickMessageUser,
  isSetClass,
  isDashboard,
  joinLectureHandle,
}) {
  const [sessionInfo] = useState(
    type
      ? {
          complete_session_id: item?.complete_session_id
            ? item?.complete_session_id
            : false,
          id: item.id,
          name: `${item.student.first_name}  ${item.student.last_name}`,
          // session_date: item.session_time,
          session_time: item.session_time,
          session_duration: item.session_duration,
          start: item.session_date,
          profile_image: item.user.profile_image,
          // subject: item.session_subject_id.subject_name,
          subject: subjectTranslationHandle(item.session_subject_id),
          end: item.session_date,
          subject_id: item.session_subject_id.id,
          student_id: item.student.id,
        }
      : item
  );
  const [showButton, setshowButton] = useState(false);

  return (
    <>
      <Card
        className={
          !isSetClass
            ? `border border-2 border-light-blue-c ${
                showButton ? "border-orange" : ""
              }`
            : "border-bottom rounded-0"
        }
        onClick={() => setshowButton(!showButton)}
      >
        {/* //border-orange */}
        <CardBody className={isSetClass ? "py-3" : "p-5"}>
          <Row className="gx-0" style={{ ["--x-gutter-y"]: "0.4rem" }}>
            <Col xs="9" className="hstack flex-wrap gap-2">
              <h6 className="text-sm">
                {/* {subjectTranslationHandle(sessionInfo)} */}
                {sessionInfo?.subject}
              </h6>
              <span className="text-light-blue-a">
                {isDashboard && <span>{t("LectureCard.SessionDuration")}</span>}
                <Image
                  className="mx-1 d-inline"
                  src={HierarchyTwoPointGrey}
                  alt="link"
                />
                <span className="text-10">{sessionInfo?.session_duration}</span>
              </span>
            </Col>
            <Col
              xs="3"
              className="d-flex align-items-lg-start justify-content-end"
            >
              <UncontrolledDropdown>
                <DropdownToggle
                  className="cursor-pointer link-light-blue-a"
                  color="none"
                  tag="a"
                >
                  <FiMoreHorizontal size="20" />
                </DropdownToggle>
                <DropdownMenu
                  className="w-auto text-base text-light-blue-a font-bold"
                  style={{ ["--x-dropdown-min-width"]: "auto" }}
                  // container="body"
                >
                  <DropdownItem
                    tag="a"
                    className="link-dark-blue-a font-bold cursor-pointer"
                    onClick={() => showEditSessionModal(item, true)}
                  >
                    <span className="d-inline-block w-8">
                      <Edit size="20" />
                    </span>{" "}
                    {t("LectureCard.SessionModify")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="link-dark-blue-a font-bold cursor-pointer"
                    // className="link-grey-d font-bold cursor-pointer"
                    onClick={() => showDeleteSessionModal(item, true)}
                    // disabled
                  >
                    <span className="d-inline-block w-8">
                      <Trash size="20" />
                    </span>{" "}
                    {t("LectureCard.SessionCancel")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="link-dark-blue-a font-bold cursor-pointer"
                    onClick={() => handleClickMessageUser(item)}
                  >
                    <span className="d-inline-block w-8">
                      <Message2 size="20" />
                    </span>
                    {`${t("NotificationsTab.TalkTo")} ${sessionInfo?.name}`}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="8" className="d-flex gap-2 align-items-center">
              <ShowImage
                className="avatar h-6 w-6 rounded-circle bg-light-blue-a flex-none"
                imageName={sessionInfo.profile_image}
                width={68}
                height={68}
              />
              <span className="text-light-blue-a text-base">
                {sessionInfo.name}
              </span>
            </Col>
            <Col xs="4" className="text-end">
              <Badge
                color="none"
                className={`bg-light-blue-c text-dark-blue-c ${
                  showButton && !sessionInfo?.complete_session_id
                    ? "bg-light-orange text-orange"
                    : ""
                }`}
              >
                {sessionInfo.session_time}
              </Badge>
            </Col>
            {showButton && !sessionInfo?.complete_session_id && (
              <>
                <Col xs="12">
                  <Button
                    color={`${
                      showMinTimeHandle(
                        GivenDate,
                        sessionInfo?.session_duration
                      )
                        ? "dark-blue-c"
                        : "orange"
                    }`}
                    className="w-full"
                    onClick={() =>
                      showMinTimeHandle(
                        GivenDate,
                        sessionInfo?.session_duration
                      )
                        ? joinLectureHandle(sessionInfo, false)
                        : showSessionCompleteModal(sessionInfo)
                    }
                  >
                    {showMinTimeHandle(GivenDate, sessionInfo?.session_duration)
                      ? t("NotificationsTab.JoinButton")
                      : t("NotificationsTab.ComplateButton")}
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
export default LectureCard;
