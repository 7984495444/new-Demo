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
import { ShowImage, show1HourTime } from "../index";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

function LectureCardForParents({
  sessionInfo,
  GivenDate,
  CurrentDate,
  showEditSessionModal,
  showDeleteSessionModal,
  handleDisableState,
  handleClickMessageUser,
  isSetClass,
  isStudent,
  isParent,
  joinLectureHandle,
  isDashboard,
}) {
  const [showButton, setshowButton] = useState(false);
  var sessionDate = sessionInfo.session_date;

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
        <CardBody className={isSetClass ? "py-3" : "p-5"}>
          <Row className="gx-0" style={{ ["--x-gutter-y"]: "0.4rem" }}>
            <Col xs="9" className="hstack flex-wrap gap-2 text-10">
              <h6>
                {isStudent || isParent
                  ? subjectTranslationHandle(sessionInfo?.session_subject_id)
                  : sessionInfo.subject}
              </h6>
              <span className="text-light-blue-a">
                <span>{t("ParentCalendar.Duration")}</span>
                <Image
                  className="mx-1"
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
                    className={`${
                      handleDisableState(sessionDate, CurrentDate)
                        ? undefined
                        : "link-dark-blue-a "
                    }  font-bold cursor-pointer`}
                    disabled={handleDisableState(sessionDate, CurrentDate)}
                    onClick={() => showEditSessionModal(sessionInfo, true)}
                  >
                    <span className="d-inline-block w-8">
                      <Edit size="20" />
                    </span>{" "}
                    {t("ParentCalendar.ModifySession")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className={`${
                      handleDisableState(sessionDate, CurrentDate)
                        ? undefined
                        : "link-dark-blue-a "
                    }  font-bold cursor-pointer`}
                    disabled={handleDisableState(sessionDate, CurrentDate)}
                    onClick={() => showDeleteSessionModal(sessionInfo, true)}
                  >
                    <span className="d-inline-block w-8">
                      <Trash size="20" />
                    </span>{" "}
                    {t("ParentCalendar.CancelSession")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="link-dark-blue-a font-bold cursor-pointer"
                    onClick={() => handleClickMessageUser(sessionInfo)}
                  >
                    <span className="d-inline-block w-8">
                      <Message2 size="20" />
                    </span>
                    {`${t("NotificationsTab.TalkTo")} ${
                      isStudent || isParent
                        ? sessionInfo?.user.first_name
                        : sessionInfo?.tutor_first_name
                    }`}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="8" className="d-flex gap-2 align-items-center">
              <ShowImage
                className="avatar h-8 w-8 rounded-circle bg-light-blue-a flex-none"
                imageName={
                  isStudent || isParent
                    ? sessionInfo?.student?.profile_image
                    : sessionInfo.profile_image
                }
                width={68}
                height={68}
              />
              <span>
                {isStudent
                  ? sessionInfo?.user.first_name +
                    " " +
                    sessionInfo?.user.last_name
                  : isParent
                  ? sessionInfo?.student?.first_name +
                    " " +
                    sessionInfo?.student?.last_name
                  : sessionInfo.name}
              </span>
            </Col>
            <Col xs="4" className="text-end">
              <Badge
                color="none"
                className={`bg-light-blue-c text-dark-blue-c ${
                  // showButton ? "bg-light-orange text-orange" : ""
                  showButton ? "" : ""
                }`}
              >
                {sessionInfo.session_time}
              </Badge>
            </Col>
            {show1HourTime(GivenDate, CurrentDate) && (
              <Col xs="12">
                <Button
                  color="dark-blue-c"
                  className="w-full"
                  onClick={() => joinLectureHandle(sessionInfo, true)}
                >
                  {t("StudentCalendar.Join")}
                </Button>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
export default LectureCardForParents;
