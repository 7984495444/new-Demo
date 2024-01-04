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
import { ShowImage, show1HourTime, show24HourTime } from "../index";

function LectureCardForStudent({
  sessionInfo,
  GivenDate,
  CurrentDate,
  showEditSessionModal,
  showDeleteSessionModal,
  handleClickMessageUser,
  isSetClass,
  joinLectureHandle,
}) {
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
        <CardBody className={isSetClass ? "py-3" : "p-5"}>
          <Row className="gx-0" style={{ ["--x-gutter-y"]: "0.4rem" }}>
            <Col xs="9" className="hstack flex-wrap gap-2 text-10">
              <h6>{sessionInfo.subject}</h6>
              <span className="text-light-blue-a">
                <span>{t("LectureCard.SessionDuration")}</span>
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
                >
                  <DropdownItem
                    tag="a"
                    className={`${
                      show24HourTime(sessionInfo?.start, CurrentDate)
                        ? undefined
                        : "link-dark-blue-a "
                    }  font-bold cursor-pointer`}
                    disabled={show24HourTime(sessionInfo?.start, CurrentDate)}
                    onClick={() => showEditSessionModal(sessionInfo, true)}
                  >
                    <span className="d-inline-block w-8">
                      <Edit size="20" />
                    </span>
                    {t("LectureCard.SessionModify")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className={`${
                      show24HourTime(sessionInfo?.start, CurrentDate)
                        ? undefined
                        : "link-dark-blue-a "
                    }  font-bold cursor-pointer`}
                    disabled={show24HourTime(sessionInfo?.start, CurrentDate)}
                    onClick={() => showDeleteSessionModal(sessionInfo, true)}
                  >
                    <span className="d-inline-block w-8">
                      <Trash size="20" />
                    </span>{" "}
                    {t("LectureCard.SessionCancel")}
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="link-dark-blue-a font-bold cursor-pointer"
                    onClick={() => handleClickMessageUser(sessionInfo)}
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
                className="avatar h-8 w-8 rounded-circle bg-light-blue-a flex-none"
                imageName={sessionInfo.profile_image}
                width={68}
                height={68}
              />
              <span> {sessionInfo.name}</span>
            </Col>
            <Col xs="4" className="text-end">
              <Badge
                color="none"
                className={`bg-light-blue-c text-dark-blue-c ${
                  showButton ? "" : undefined
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
export default LectureCardForStudent;
