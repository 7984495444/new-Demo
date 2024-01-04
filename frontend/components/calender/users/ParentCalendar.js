import React, { useEffect, useRef, useState } from "react";
import {
  NewSessionModal,
  DeleteSessionModal,
  LectureCardForParents,
  CompleteSessionDocuments,
  show24HourTime,
  show1HourTime,
  ShowSendComfirmationAlert,
  ShowImage,
} from "@/components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Image from "next/image";
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
import esLocale from "@fullcalendar/core/locales/es"; // locales
import frLocale from "@fullcalendar/core/locales/fr"; // locales
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

const ParentCalendar = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [allEvents, setAllEvents] = useState([]);
  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const [editSessionInfoFlag, setEditSessionInfoFlag] = useState(false);
  const [deleteSessionInfoFlag, setDeleteSessionInfoFlag] = useState(false);
  const [studentwiseEvents, setstudentwiseEvents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Calculate the first day based on the current day of the week
  const currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const firstDay = currentDayOfWeek % 7; // Adjust for FullCalendar's numbering (0 for Sunday, 1 for Monday, etc.)
  const calendarRef = useRef(null);
  const [fullCalendarFirstDay, setFullCalendarFirstDay] = useState(firstDay);

  useEffect(() => {
    dispatch(getAllTutorSessionAction());
    dispatch(getAllStudentAndParentDocumentAction());
  }, []);

  const { addNotifications } = useSelector((state) => state.sendNotification);
  const { allSession, allStudentAndParent, editSessionReq } = useSelector(
    (state) => state.tutor
  );

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
          allSession[index]?.student?.first_name +
          " " +
          allSession[index]?.student?.last_name, //"allSession[index]?.title",
        tutor_first_name: allSession[index]?.user?.first_name,
        groupId: allSession[index]?.id,
        // subject: allSession[index]?.session_subject_id.subject_name,
        subject: subjectTranslationHandle(
          allSession[index]?.session_subject_id
        ),
        subject_id: allSession[index]?.session_subject_id.id,
        session_duration: allSession[index]?.session_duration,
        // session_time: convertStringFromUTCtoLocal(
        //   allSession[index]?.session_time
        // ),
        session_time: allSession[index]?.session_time,
        // session_date: convertToUserTimeZone(allSession[index]?.session_date),
        session_date: allSession[index]?.session_date,
        profile_image: allSession[index]?.student.profile_image,
        session_description: allSession[index]?.session_description,
        student_id: allSession[index]?.student?.id,
        tutor_id: allSession[index]?.user.id,
        complete_session_id: allSession[index]?.complete_session_id
          ? allSession[index]?.complete_session_id
          : null,
        name:
          allSession[index]?.student?.first_name +
          " " +
          `${allSession[index]?.student?.last_name.slice(0, 1).toUpperCase()}.`,
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

  useEffect(() => {
    if (allEvents.length > 0) {
      var studentIdsArray = [];
      allEvents.map((val, ind) => {
        if (!studentIdsArray.includes(val?.student_id)) {
          studentIdsArray.push(val?.student_id);
        }
      });
      var studentwiseEventsArray = [];
      studentIdsArray.map((val, ind) => {
        var temp = [];
        allEvents.map((v, i) => {
          if (val === v.student_id) {
            temp.push(v);
          }
        });
        studentwiseEventsArray.push({ [val]: temp });
      });
      setstudentwiseEvents(studentwiseEventsArray);
    }
  }, [allEvents]);

  const showSessionEditModalHandle = (val, type) => {
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
    var studentwiseEventsArrayForToday = [];
    studentwiseEvents?.map((val, ind) => {
      let [firstKey] = Object.keys(val);
      var temp = [];
      val[firstKey]?.map((v, i) => {
        if (moment(v.start).format("DD/MM/YYYY") === formatedEventdate) {
          temp.push(v);
        }
      });
      studentwiseEventsArrayForToday.push({ [firstKey]: temp });
    });

    if (date.view.type == "dayGridMonth") {
      if (eventDatesForToday.includes(formatedEventdate)) {
        return (
          <>
            {date.date.getDate()}

            {/* <div style={{ minHeight: "7.5rem", zIndex: 9 }}> */}
            <div className="date-cell-min-height">
              {studentwiseEventsArrayForToday?.map((val, ind) => {
                let [firstKey] = Object.keys(val);
                let dateShow = moment(eventsForToday[0].start).format(
                  "YYYY-MM-DD"
                );
                return (
                  <UncontrolledDropdown className="w-full mt-2" key={ind}>
                    <DropdownToggle tag="div" className="cursor-pointer">
                      {val[firstKey]?.length > 0 && (
                        <>
                          <Card className="shadow-a">
                            <CardBody className="p-3">
                              {val[firstKey][0]?.title}
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
                              {val[firstKey].length}
                            </Badge>
                          </Card>
                        </>
                      )}
                      <DropdownMenu
                        style={{ ["--x-dropdown-min-width"]: "230px" }}
                        className="p-0 w-64 menu-top-toggle"
                        container="body"
                      >
                        {val[firstKey].map((item, index) => {
                          var GivenDate = item.start;
                          var CurrentDate = new Date();

                          return (
                            <DropdownItem tag="div" key={index} className="p-0">
                              <LectureCardForParents
                                sessionInfo={item}
                                GivenDate={GivenDate}
                                CurrentDate={CurrentDate}
                                showEditSessionModal={(e, t) =>
                                  showSessionEditModalHandle(e, t)
                                }
                                showDeleteSessionModal={(e, t) =>
                                  showSessionDeleteModalHandle(e, t)
                                }
                                handleDisableState={(e, t) =>
                                  show24HourTime(e, t)
                                }
                                handleClickMessageUser={() =>
                                  handleClickMessageUser(
                                    item.tutor_id,
                                    "calander"
                                  )
                                }
                                isSetClass={true}
                                onClick={(e) => e.stopPropagation()}
                                joinLectureHandle={(e) => joinLectureHandle(e)}
                              />
                            </DropdownItem>
                          );
                        })}
                      </DropdownMenu>
                    </DropdownToggle>
                  </UncontrolledDropdown>
                );
              })}
            </div>
            {/* </div> */}
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
      var sessionDate = eventData.extendedProps.session_date;
      var CurrentDate = new Date();
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
                <Badge color="none" className="font-bold bg-light-blue-c">
                  {eventData.extendedProps.session_time}
                </Badge>
              </Col>
              <Col xs="5" className="hstack justify-content-end">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="cursor-pointer link-light-blue-a test-b"
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
                      className={disableClass}
                      disabled={show24HourTime(sessionDate, CurrentDate)}
                      onClick={() =>
                        showSessionEditModalHandle(eventData, false)
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Edit size="20" />
                      </span>{" "}
                      {t("TutorCalendar.ModifySession")}
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      className={disableClass}
                      disabled={show24HourTime(sessionDate, CurrentDate)}
                      onClick={() =>
                        showSessionDeleteModalHandle(eventData, false)
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Trash size="20" />
                      </span>{" "}
                      {t("TutorCalendar.CancelSession")}
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      className="link-dark-blue-a font-bold cursor-pointer"
                      onClick={() =>
                        handleClickMessageUser(
                          eventData.extendedProps.tutor_id,
                          "calander"
                        )
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Message2 size="20" />
                      </span>
                      {`${t("NotificationsTab.TalkTo")} ${
                        eventData?.extendedProps?.tutor_first_name
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
                <h6 className="text-base my-2">
                  {eventData.extendedProps.subject}
                </h6>
              </Col>
              <Col xs="12" className="hstack gap-2">
                <ShowImage
                  className="avatar w-6 h-6 rounded-circle bg-secondary flex-none"
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
                      <LectureCardForParents
                        sessionInfo={item}
                        GivenDate={GivenDate}
                        CurrentDate={CurrentDate}
                        showEditSessionModal={(e, t) =>
                          showSessionEditModalHandle(e, t)
                        }
                        showDeleteSessionModal={(e, t) =>
                          showSessionDeleteModalHandle(e, t)
                        }
                        handleDisableState={(e, t) => show24HourTime(e, t)}
                        handleClickMessageUser={() =>
                          handleClickMessageUser(item.tutor_id, "calander")
                        }
                        isSetClass={true}
                        onClick={(e) => e.stopPropagation()}
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

  const handleEventClassNames = (event) => {
    return event.event.extendedProps.eventClassName;
  };

  const handleClickMessageUser = async (item_id) => {
    let user = await allSession?.filter(function (item) {
      return item?.user?.id == item_id ? item.user : null;
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
    let studentId = null;
    if (isWeekView) {
      tutorId = item?.extendedProps?.tutor_id;
      subjectId = item?.extendedProps?.subject_id;
      studentId = item?.extendedProps?.student_id;
    } else {
      tutorId = item?.tutor_id;
      subjectId = item?.subject_id;
      studentId = item?.student_id;
    }
    dispatch(getStudentLectureAction(studentId, tutorId, subjectId));
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
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: "title",
                    center: "",
                    right: "dayGridWeek,dayGridMonth,prev,next",
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
                  eventOverlap={true}
                  locales={[esLocale, frLocale]}
                  locale={i18n.language || "fr"}
                  initialView="dayGridMonth"
                  // eventContent={(e) => handleDesign(e)}
                  dayCellContent={(e) => dateDesign(e)}
                  eventContent={(e) => design(e)}
                  eventClassNames={(e) => handleEventClassNames(e)}
                  events={allEvents} // show events
                  selectable={true}
                  dateClick={(e) => {
                    addZindex(e);
                  }}
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
          userRole="parent"
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

export default ParentCalendar;
