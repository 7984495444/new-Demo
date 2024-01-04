import Image from "next/image";
import { HierarchyTwoPointGrey } from "@/assets/images/index";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Message2, Edit, Trash } from "iconsax-react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
import { t } from "i18next";
import { CompleteSessionModal, DeleteSessionModal, NewSessionModal } from "../index";
import { subjectTranslationHandle } from "../../utils/subjectTranslationFuncationsn";
import ShowImage from "../@common/ShowImage";

function TodayLectureCard({
  type,
  item,
  handleClickMessageUser,
  joinLectureHandle,
}) {
  const [sessionInfo, setSessionInfo] = useState(
    type
      ? {
          id: item.id,
          name: `${item.student.first_name}  ${item.student.last_name}`,
          session_time: item.session_time,
          session_date: item.session_time,
          session_duration: item.session_duration,
          start: item.session_date,
          profile_image: item.user.profile_image,
          subject: subjectTranslationHandle(item.session_subject_id),
          end: item.session_date,
          student_id: item?.student?.id,
          subject_id: item?.session_subject_id?.id,
        }
      : item
  );
  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const [showButton, setshowButton] = useState(false);

  const [showSessionCompleteModalBtn, setShowSessionCompleteModalBtn] =
    useState(false);

  const showSessionCompleteModalHandal = () => {
    setShowSessionCompleteModalBtn(!showSessionCompleteModalBtn);
  };

  const showSessionEditModalHandle = (val) => {
    setEditSessionInfo(val);
    setEditSessionShowModal(!editSessionShowModal);
  };

  const showSessionDeleteModalHandle = (val) => {
    setDeleteSessionInfo(val);
    setDeteleSessionShowModal(!deteleSessionShowModal);
  };

  return (
    <>
      <Row
        className="gx-0 lecture-list"
        onClick={() => setshowButton(!showButton)}
      >
        <Col xs="10" className="hstack">
          <h6>{sessionInfo.subject}</h6>
          <Image className="mx-1" src={HierarchyTwoPointGrey} alt="link" />
          <span className="text-light-blue-a">
            {sessionInfo.session_duration}
          </span>
        </Col>
        <Col xs="2" className="text-end">
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
              style={{ ["--x-dropdown-min-width"]: "230px" }}
            >
              <DropdownItem
                className="link-dark-blue-a font-bold cursor-pointer"
                onClick={() => showSessionEditModalHandle(item)}
              >
                <span className="d-inline-block w-8">
                  <Edit size="24" />
                </span>{" "}
                {t("TutorCalendar.ModifySession")}
              </DropdownItem>
              <DropdownItem
                className="link-dark-blue-a font-bold cursor-pointer"
                onClick={() => showSessionDeleteModalHandle(item)}
              >
                <span className="d-inline-block w-8">
                  <Trash size="24" />
                </span>{" "}
                {t("TutorCalendar.CancelSession")}
              </DropdownItem>
              <DropdownItem
                className="link-dark-blue-a font-bold cursor-pointer"
                onClick={() => handleClickMessageUser(item)}
              >
                <span className="d-inline-block w-8">
                  <Message2 size="24" />
                </span>{" "}
                {`${t("NotificationsTab.TalkTo")} ${sessionInfo?.name}`}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
        <Col xs="9" className="hstack gap-2 pt-2">
          <ShowImage
            className="avatar h-8 w-8 flex-none rounded-circle me-1"
            imageName={sessionInfo.profile_image}
            width={68}
            height={68}
          />
          <span className="text-light-blue-a">{sessionInfo.name}</span>
        </Col>
        <Col xs="3" className="pt-2 text-end">
          <span className="badge text-base px-3 py-2 rounded-1 bg-light-blue-c font-bold">
            {sessionInfo.session_time}
          </span>
        </Col>
        {showButton && (
          <Col xs="12" className="pt-2">
            <button
              className="btn btn-dark-blue-c w-full rounded-1"
              onClick={() => joinLectureHandle(sessionInfo, false)}
            >
              {t("TutorCalendar.Join")}
            </button>
          </Col>
        )}
      </Row>

      {showSessionCompleteModalBtn && (
        <CompleteSessionModal
          show={showSessionCompleteModalBtn}
          hide={() => showSessionCompleteModalHandal()}
        />
      )}
      {editSessionShowModal && (
        <NewSessionModal
          type={true}
          show={editSessionShowModal}
          hide={() => showSessionEditModalHandle()}
          sessionData={editSessionInfo}
          weekType={null}
          userRole="tutor"
        />
      )}
      {deteleSessionShowModal && (
        <DeleteSessionModal
          type={true}
          show={deteleSessionShowModal}
          hide={() => showSessionDeleteModalHandle()}
          sessionData={deleteSessionInfo}
          student={null}
          weekType={null}
          id={false}
        />
      )}
    </>
  );
}
export default TodayLectureCard;
