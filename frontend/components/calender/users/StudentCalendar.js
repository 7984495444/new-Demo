import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  NewSessionModal,
  DeleteSessionModal,
  LectureCardForStudent,
  CompleteSessionDocuments,
  show1HourTime,
  show24HourTime,
  ShowSendComfirmationAlert,
  ShowImage,
} from "@/components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import momentPlugin from "@fullcalendar/moment";
import interactionPlugin from "@fullcalendar/interaction";

import esLocale from "@fullcalendar/core/locales/es"; // locales
import frLocale from "@fullcalendar/core/locales/fr"; // locales

import { Message2, Edit, Trash } from "iconsax-react";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  HierarchyTwoPointGrey,
} from "@/assets/images/index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudentAndParentDocumentAction,
  getAllTutorSessionAction,
} from "@/redux/actions/tutorAction";
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import moment from "moment";
import { t } from "i18next";
import { useRouter } from "next/router";
import { getStudentLectureAction } from "@/redux/actions/lessonSpaceAction";
import i18n from "@/utils/i18nextInit";
import { sendNotificationsCloseAction } from "@/redux/actions/sendNotificationAction";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";

const StudentCalendar = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const [editSessionInfoFlag, setEditSessionInfoFlag] = useState(false);
  const [deleteSessionInfoFlag, setDeleteSessionInfoFlag] = useState(false);
  // const [showNotificatonConfrom, setShowNotificatonConfrom] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  // Calculate the first day based on the current day of the week
  const currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const firstDay = currentDayOfWeek % 7; // Adjust for FullCalendar's numbering (0 for Sunday, 1 for Monday, etc.)
  const calendarRef = useRef(null);
  const [fullCalendarFirstDay, setFullCalendarFirstDay] = useState(firstDay);

  useEffect(() => {
    dispatch(getAllTutorSessionAction());
    dispatch(getAllStudentAndParentDocumentAction()); // get all added for student documents
  }, []);

  const { allSession, allStudentAndParent, editSessionReq } = useSelector(
    (state) => state.tutor
  );
  const { addNotifications } = useSelector((state) => state.sendNotification);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < allSession?.length; index++) {
      data.push({
        id: allSession[index]?.id,
        // start: convertToUserTimeZone(allSession[index]?.session_date),
        // end: convertToUserTimeZone(allSession[index]?.session_date),
        start: allSession[index]?.session_date,
        end: moment(allSession[index]?.session_date)
          .add(1, "minutes")
          .format("YYYY-MM-DD HH:mm"),
        // end: allSession[index]?.session_date,
        // start: convertToUserTimeZone(allSession[index]?.session_date),
        // end: moment(convertToUserTimeZone(allSession[index]?.session_date))
        //   .add(1, "minutes")
        //   .format("YYYY-MM-DD HH:mm"),
        title:
          allSession[index]?.user.first_name +
          " " +
          allSession[index]?.user.last_name, //"allSession[index]?.title",
        groupId: allSession[index]?.id,
        subject: subjectTranslationHandle(
          allSession[index]?.session_subject_id
        ), // subject: allSession[index]?.session_subject_id.subject_name,
        subject_id: allSession[index]?.session_subject_id.id,
        session_duration: allSession[index]?.session_duration,
        // session_time: convertStringFromUTCtoLocal(
        //   allSession[index]?.session_time
        // ),
        session_time: allSession[index]?.session_time,
        // session_date: convertToUserTimeZone(allSession[index]?.session_date),
        session_date: allSession[index]?.session_date,
        profile_image: allSession[index]?.user.profile_image,
        session_description: allSession[index]?.session_description,
        student_id: allSession[index]?.student?.id,
        description: allSession[index]?.session_subject_id.subject_name,
        name:
          allSession[index]?.user.first_name +
          " " +
          `${allSession[index]?.user?.last_name.slice(0, 1).toUpperCase()}.`,
        tutor_id: allSession[index]?.user.id,
        parent_id: allSession[index]?.student?.parent_id,
        extendedProps: {
          eventClassName: moment(allSession[index]?.session_date).format(
            "YYYYMMDD"
          ),
        },
      });
    }

    setAllEvents(data);
  }, [allSession]);

  const handleViewClassNames = (view) => {
    const currentView = view.view.type;

    const calendarElement = document.getElementById(
      "fullcalendar-mobile-container"
    );
    if (calendarElement) {
      if (currentView === "dayGridWeek") {
        calendarElement.classList.add("FullCalendarCustomStyle");
        calendarElement.classList.remove("small-fullcalendar");
        setFullCalendarFirstDay(firstDay);
      } else {
        calendarElement.classList.remove("FullCalendarCustomStyle");
        calendarElement.classList.add("small-fullcalendar");
        setFullCalendarFirstDay(0);
      }
    }
  };

  const showSessionEditModalHandle = (val, type) => {
    // setShowNotificatonConfrom(false);
    setEditSessionInfoFlag(type);
    setEditSessionInfo(val);
    setEditSessionShowModal(!editSessionShowModal);
  };

  useEffect(() => {
    if (addNotifications) {
      setShowAlert(true);
    }
  }, [addNotifications]);

  const hideShowAlertHandle = (e) => {
    setShowAlert(e);
    dispatch(sendNotificationsCloseAction());
  };

  const showSessionDeleteModalHandle = (val, type) => {
    setDeleteSessionInfoFlag(type);
    setDeleteSessionInfo(val);
    setDeteleSessionShowModal(!deteleSessionShowModal);
  };

  // function to render date
  const dateDesign = (date) => {
    const formatedEventdate = moment(date.date).format("DD/MM/YYYY");
    var eventsForToday = [];
    const eventDatesForToday = allEvents
      .filter(
        (event) =>
          moment(event?.session_date).format("DD/MM/YYYY") == formatedEventdate
      )
      .map((event) => {
        eventsForToday.push(event);
        return moment(event?.session_date).format("DD/MM/YYYY");
      });

    if (date.view.type == "dayGridMonth") {
      if (eventDatesForToday.includes(formatedEventdate)) {
        let dateShow = moment(eventsForToday[0].start).format("YYYY-MM-DD");
        return (
          <>
            {date.date.getDate()}
            <div className="date-cell-min-height">
              <UncontrolledDropdown className="w-full mt-2">
                <DropdownToggle tag="div" className="cursor-pointer">
                  <Card className="shadow-a">
                    <CardBody className="p-3">
                      {eventsForToday.map((item, index) => {
                        if (index < 3) {
                          return (
                            <>
                              <p
                                key={index}
                                className="text-dark-blue-c text-10"
                              >
                                {item.subject}
                              </p>
                              <p
                                key={item.id}
                                className="text-light-blue-a text-10"
                              >
                                {item.title}
                              </p>
                            </>
                          );
                        } else if (index === 4) {
                          return (
                            <p className="text-10" key={index}>
                              and {eventsForToday.length - 3} more...
                            </p>
                          );
                        }
                      })}
                    </CardBody>
                    <Badge
                      color="none"
                      className={`p-0 h-5 w-5 d-flex align-items-center justify-content-center font-bold rounded-pill position-absolute top-0 start-full translate-middle text-white ${
                        moment(dateShow).diff(
                          moment().format("YYYY-MM-DD"),
                          "days"
                        ) >= 0
                          ? "bg-orange"
                          : "bg-dark-blue-c"
                      } `}
                    >
                      {eventsForToday.length}
                    </Badge>
                  </Card>
                  <DropdownMenu
                    style={{ ["--x-dropdown-min-width"]: "auto" }}
                    className="w-64 p-2"
                    container="body"
                  >
                    {eventsForToday.map((item, index) => {
                      var GivenDate = item.start;
                      var sessionDate = item.session_date;
                      var CurrentDate = moment();
                      return (
                        <DropdownItem
                          tag="div"
                          key={index}
                          className={`p-0 ${
                            index !== eventsForToday.length - 1 && "mb-2"
                          }`}
                        >
                          <LectureCardForStudent
                            type={false}
                            sessionInfo={item}
                            GivenDate={GivenDate}
                            CurrentDate={CurrentDate}
                            showEditSessionModal={(e, t) =>
                              showSessionEditModalHandle(e, t)
                            }
                            showDeleteSessionModal={(e, t) =>
                              showSessionDeleteModalHandle(e, t)
                            }
                            handleClickMessageUser={() =>
                              handleClickMessageUser(item.id, "calander")
                            }
                            isSetClass={true}
                            joinLectureHandle={(e) => joinLectureHandle(e)}
                          />
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </DropdownToggle>
              </UncontrolledDropdown>
            </div>
          </>
        );
      } else {
        return (
          <>
            <p>{date.date.getDate()}</p>
            <div className="date-cell-min-height"></div>
          </>
        );
      }
    } else {
      return <p>{date.dayNumberText}</p>;
    }
  };

  // new function to render design on full calender
  const design = (event) => {
    if (event.view.type === "dayGridMonth") {
      return <p></p>;
    }
    if (event.view.type === "dayGridWeek") {
      const eventData = event.event._def;
      var CurrentDate = moment();
      let disableClass = `${
        show24HourTime(eventData.extendedProps.session_date, CurrentDate)
          ? undefined
          : "link-dark-blue-a "
      }  font-bold cursor-pointer`;
      return (
        <Card className="event-card shadow-a">
          <CardBody className="p-2">
            <Row className="gx-0" style={{ ["--x-gutter-y"]: "0.4rem" }}>
              <Col xs="7">
                <Badge
                  className="rounded-1 font-bold"
                  color="surface-secondary"
                >
                  {eventData.extendedProps.session_time}
                </Badge>
              </Col>
              <Col xs="5" className="text-end">
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
                    container="body"
                  >
                    <DropdownItem
                      tag="a"
                      className={disableClass}
                      disabled={show24HourTime(
                        eventData.extendedProps.session_date,
                        CurrentDate
                      )}
                      onClick={() =>
                        showSessionEditModalHandle(eventData, false)
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Edit size="20" />
                      </span>{" "}
                      {t("StudentCalendar.ModifySession")}
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      className={disableClass}
                      disabled={show24HourTime(
                        eventData.extendedProps.session_date,
                        CurrentDate
                      )}
                      onClick={() =>
                        showSessionDeleteModalHandle(eventData, false)
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Trash size="20" />
                      </span>{" "}
                      {t("StudentCalendar.CancelSession")}
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      className="link-dark-blue-a font-bold cursor-pointer"
                      onClick={() => handleClickMessageUser(eventData.groupId)}
                    >
                      <span className="d-inline-block w-8">
                        <Message2 size="20" />
                      </span>
                      {`${t("NotificationsTab.TalkTo")} ${
                        eventData?.extendedProps?.name
                      }`}
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
              <Col xs="12">
                <span className="text-light-blue-a">
                  <Image
                    className="mx-1"
                    src={HierarchyTwoPointGrey}
                    alt="link"
                  />
                  <span>{eventData.extendedProps.session_duration}</span>
                </span>
                <h6 className="text-base text-dark-blue-a text-capitalize mt-2">
                  {eventData.extendedProps.subject}
                </h6>
              </Col>
              <Col xs="12" className="d-flex gap-2 align-items-center">
                <ShowImage
                  className="avatar w-5 h-5 rounded-circle flex-none"
                  imageName={eventData.extendedProps.profile_image}
                  width={68}
                  height={68}
                />
                <span className="text-light-blue-a">
                  {eventData.extendedProps.name}
                </span>
              </Col>
              {show1HourTime(
                eventData.extendedProps.session_date,
                CurrentDate
              ) && (
                <Col xs="12">
                  <Button
                    color="dark-blue-c"
                    className="w-full"
                    onClick={() => joinLectureHandle(eventData, true)}
                  >
                    {t("StudentCalendar.Join")}
                  </Button>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      );
    }
  };
  const addZindex = (e) => {
    // e.stopPropagation();
    // Access the <td> element associated with the clicked date
    const tdElements = document.getElementsByClassName("td-overlap");

    // Remove "td-overlap" class from all existing elements
    for (let i = 0; i < tdElements.length; i++) {
      tdElements[i].classList.remove("td-overlap");
    }
    const tdElement = e.dayEl;

    // Increase the z-index of the <td> element by adding class "td-overlap"
    tdElement.classList.add("td-overlap");
  };

  // function to render custom design in fullcalender
  const handleDesignForMobile = (date, element, view) => {
    return design(date);
  };
  const dayCellContentForMobile = (date) => {
    const formatedEventdate = moment(date.date).format("YYYY-MM-DD");
    const todaysDate = moment().format("YYYY-MM-DD");
    const eventDates = allEvents?.map((event) =>
      moment(event?.session_date).format("YYYY-MM-DD")
    );
    const isCurrentDate =
      moment(todaysDate).diff(formatedEventdate, "days") === 0;
    const isPastDate = moment(todaysDate).diff(formatedEventdate, "days") > 0;
    const isFutureDate = moment(todaysDate).diff(formatedEventdate, "days") < 0;
    // const isSelectedEventDate = selectedEventDate === formatedEventdate;

    var eventsForToday = [];
    const eventDatesForToday = allEvents
      .filter(
        (event) =>
          moment(event?.session_date).format("YYYY-MM-DD") == formatedEventdate
      )
      .map((event) => {
        eventsForToday.push(event);
        return moment(event?.session_date).format("YYYY-MM-DD");
      });

    let backgroundColor = "";

    if (isCurrentDate) {
      backgroundColor = "transparent";
    } else if (isPastDate) {
      backgroundColor = "#005b88";
    } else if (isFutureDate) {
      backgroundColor = "#f6a200";
    }
    if (date.view.type == "dayGridMonth") {
      if (eventDates?.includes(formatedEventdate)) {
        return (
          <UncontrolledDropdown className="w-full">
            <DropdownToggle tag="div" className="cursor-pointer">
              <div
                className="fc-daygrid-day-top text-white"
                style={{
                  backgroundColor,
                  height: "32px",
                  width: "32px",
                  borderRadius: "50%",
                }}
              >
                {date.date.getDate()}
              </div>
              <DropdownMenu
                style={{ ["--x-dropdown-min-width"]: "130px" }}
                className="p-0 w-64 menu-top-toggle"
                positionFixed={true}
                container="body"
              >
                {eventsForToday.map((item, index) => {
                  var GivenDate = item.start;
                  var CurrentDate = new Date();
                  return (
                    <DropdownItem tag="div" key={index} className="p-0">
                      <LectureCardForStudent
                        type={false}
                        sessionInfo={item}
                        GivenDate={GivenDate}
                        CurrentDate={CurrentDate}
                        showEditSessionModal={(e, t) =>
                          showSessionEditModalHandle(e, t)
                        }
                        // showSessionCompleteModal={(e) =>
                        //   showSessionCompleteModalHandal(e)
                        // }
                        showDeleteSessionModal={(e, t) =>
                          showSessionDeleteModalHandle(e, t)
                        }
                        handleClickMessageUser={() =>
                          handleClickMessageUser(item.student_id, "calander")
                        }
                        isSetClass={true}
                        isDashboard={false}
                        joinLectureHandle={(e) => joinLectureHandle(e)}
                      />
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </DropdownToggle>
          </UncontrolledDropdown>
        );
      } else {
        return (
          <div
            className="fc-daygrid-day-top"
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
            }}
          >
            {date.date.getDate()}
          </div>
        );
      }
    } else {
      return <p>{date.dayNumberText}</p>;
    }
  };
  const handleClickMessageUser = async (item_id) => {
    let user = await allSession?.filter(function (item) {
      return item?.id == item_id ? item.user : null;
    });
    const Data = user[0].user;
    router.push({
      pathname: "/messages",
      query: { ...Data },
    });
  };

  const joinLectureHandle = (item, isWeekView) => {
    let tutorId = null;
    let subjectId = null;
    if (isWeekView) {
      tutorId = item?.extendedProps?.tutor_id;
      subjectId = item?.extendedProps?.subject_id;
    } else {
      tutorId = item?.tutor_id;
      subjectId = item?.subject_id;
    }
    dispatch(getStudentLectureAction(userData?.id, tutorId, subjectId));
  };

  return (
    <>
      {/* <Layout> */}
      <Row className="gy-lg-0 gy-6">
        <Col>
          <Card className="d-lg-none mb-6">
            <CompleteSessionDocuments allDocuments={allStudentAndParent} />
          </Card>
          <ShowSendComfirmationAlert
            showAlert={showAlert}
            hideShowAlert={(e) => hideShowAlertHandle(e)}
            editSessionReq={editSessionReq}
            userData={userData}
          />
          <Card>
            <CardBody>
              <div className="FullCalendarCustomStyle d-none d-sm-block">
                <FullCalendar
                  plugins={[momentPlugin, dayGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "title",
                    center: "",
                    right: "dayGridWeek,dayGridMonth prev,next",
                  }} // set header
                  views={{
                    dayGridMonth: {
                      titleFormat: { year: "numeric", month: "long" },
                      dayHeaderFormat: { weekday: "long" },
                    },
                    dayGridWeek: {
                      titleFormat: {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                      dayHeaderFormat: { day: "numeric", weekday: "long" },
                    },
                  }}
                  eventOverlap={true} // Allow events to overlap
                  locales={[esLocale, frLocale]}
                  locale={i18n.language || "fr"}
                  initialView="dayGridMonth"
                  dayCellContent={(e) => dateDesign(e)}
                  eventContent={(e) => design(e)}
                  events={allEvents} // show events
                  // dateClick={(e) => {
                  //   addZindex(e);
                  // }}
                />
              </div>
              {/* Fullcalender for Mobile View */}
              <div
                className="d-block d-sm-none"
                id="fullcalendar-mobile-container"
              >
                <FullCalendar
                  ref={calendarRef}
                  height="375px"
                  views={{
                    dayGridMonth: {
                      titleFormat: { year: "numeric", month: "long" },
                      dayHeaderFormat: { weekday: "narrow" },
                    },
                    dayGridWeek: {
                      titleFormat: {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                      dayHeaderFormat: { day: "numeric", weekday: "long" },
                    },
                  }}
                  firstDay={fullCalendarFirstDay}
                  locales={[esLocale, frLocale]}
                  locale={i18n.language || "fr"}
                  initialView="dayGridWeek"
                  plugins={[dayGridPlugin]}
                  viewClassNames={handleViewClassNames}
                  headerToolbar={{
                    left: "title",
                    center: "",
                    right: "dayGridWeek,dayGridMonth prev,next",
                  }} // set header
                  eventContent={(event) => handleDesignForMobile(event)}
                  events={allEvents} // show events
                  dayCellContent={dayCellContentForMobile}
                />
              </div>
            </CardBody>
          </Card>
          {/* <div className="mt-3">
              <CalendarSyncFooter />
            </div> */}
        </Col>
        <Col
          lg="auto"
          className="w-lg-80 flex-none gap-6 d-lg-block d-none vstack"
        >
          <CompleteSessionDocuments allDocuments={allStudentAndParent} />
        </Col>
      </Row>
      {/* </Layout> */}
      {editSessionShowModal && (
        <NewSessionModal
          type={editSessionInfoFlag}
          show={editSessionShowModal}
          hide={() => showSessionEditModalHandle()}
          sessionData={editSessionInfo}
          weekType={!editSessionInfoFlag}
          userRole="student"
        />
      )}
      {deteleSessionShowModal && (
        <DeleteSessionModal
          type={deleteSessionInfoFlag}
          show={deteleSessionShowModal}
          hide={() => showSessionDeleteModalHandle()}
          sessionData={deleteSessionInfo}
          student={false}
          weekType={!editSessionInfoFlag}
          id={true}
        />
      )}
    </>
  );
};

export default StudentCalendar;
