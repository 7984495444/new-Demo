import React, { useEffect, useRef, useState } from "react";
import {
  LectureCard,
  TodayLectureCard,
  CompleteSessionModal,
  NewSessionModal,
  DeleteSessionModal,
  ShowAllTutorMessageList,
  ShowSendComfirmationAlert,
  ShowImage,
} from "@/components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import momentPlugin from "@fullcalendar/moment"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; // locales
import frLocale from "@fullcalendar/core/locales/fr"; // locales
import Image from "next/image";
import { Message2, Edit, Trash } from "iconsax-react";
import { FiMoreHorizontal } from "react-icons/fi";
import { HierarchyTwoPointGrey } from "@/assets/images/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllTutorSessionAction } from "@/redux/actions/tutorAction";
import { getUserByRole } from "@/redux/actions/userAction";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import moment from "moment";
import { t } from "i18next";
import { useRouter } from "next/router";
import i18n from "@/utils/i18nextInit";
import { getTutorLectureAction } from "@/redux/actions/lessonSpaceAction";
import { showMinTimeHandle } from "@/utils/TimeShowFuncations";
import { sendNotificationsCloseAction } from "@/redux/actions/sendNotificationAction";
import { subjectTranslationHandle } from "@/utils/subjectTranslationFuncationsn";
import { getAllTodaySessionAction } from "@/redux/actions/dashbordAction";

const TutorCalendar = ({ userData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [allEvents, setAllEvents] = useState([]);
  const [showSessionCompleteModalBtn, setShowSessionCompleteModalBtn] =
    useState(false);
  const [editSessionInfo, setEditSessionInfo] = useState();
  const [editSessionInfoFlag, setEditSessionInfoFlag] = useState(false);
  const [deleteSessionInfoFlag, setDeleteSessionInfoFlag] = useState(false);
  const [editSessionShowModal, setEditSessionShowModal] = useState(false);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState();
  const [deteleSessionShowModal, setDeteleSessionShowModal] = useState(false);
  const [complateSessionData, setComplateSessionData] = useState();
  const [todaySessiosData, setTodaySessiosData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Calculate the first day based on the current day of the week
  const currentDayOfWeek = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const firstDay = currentDayOfWeek % 7; // Adjust for FullCalendar's numbering (0 for Sunday, 1 for Monday, etc.)
  const calendarRef = useRef(null);
  const [fullCalendarFirstDay, setFullCalendarFirstDay] = useState(firstDay);

  useEffect(() => {
    dispatch(getAllTutorSessionAction());
    dispatch(getAllTodaySessionAction());
  }, []);

  useEffect(() => {
    dispatch(getUserByRole(0));
  }, []);

  const { roleWiseUserData } = useSelector((state) => state.user);
  const { allSession, editSessionReq } = useSelector((state) => state.tutor);
  const { addNotifications } = useSelector((state) => state.sendNotification);
  const { getAllTodaySession } = useSelector((state) => state.dashboard);

  useEffect(() => {
    let data = [];

    for (let index = 0; index < allSession?.length; index++) {
      data.push({
        id: allSession[index]?.id,
        // start: convertToUserTimeZone(allSession[index]?.session_date),
        // end: convertToUserTimeZone(allSession[index]?.session_date),
        start: allSession[index]?.session_date,
        // end: allSession[index]?.session_date,
        end: moment(allSession[index]?.session_date)
          .add(1, "minutes")
          .format("YYYY-MM-DD HH:mm"),

        // start: convertToUserTimeZone(allSession[index]?.session_date),
        // // end: convertToUserTimeZone(allSession[index]?.session_date),
        // end: moment(convertToUserTimeZone(allSession[index]?.session_date))
        //   .add(1, "minutes")
        //   .format("YYYY-MM-DD HH:mm"),
        title:
          allSession[index]?.student?.first_name +
          " " +
          allSession[index]?.student?.last_name, //"allSession[index]?.title",
        groupId: allSession[index]?.id,
        // subject: allSession[index]?.session_subject_id?.subject_name,
        subject: subjectTranslationHandle(
          allSession[index]?.session_subject_id
        ),
        subject_id: allSession[index]?.session_subject_id?.id,
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
        complete_session_id: allSession[index]?.complete_session_id
          ? allSession[index]?.complete_session_id
          : null,
        name:
          allSession[index]?.student?.first_name +
          " " +
          allSession[index]?.student?.last_name,
        parent_id: allSession[index]?.student?.parent_id,
        extendedProps: {
          eventClassName: moment(allSession[index]?.session_date).format(
            "YYYYMMDD"
          ),
        },
        duration: "00:00:01",
        slotDuration: "00:00:01",
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

  const showSessionCompleteModalHandal = (val, type) => {
    if (type) {
      let filed = {
        complete_session_id: val.extendedProps.complete_session_id,
        end: val.extendedProps.session_date,
        groupId: val.groupId,
        id: val.groupId,
        name: val.extendedProps.name,
        profile_image: val.extendedProps.profile_image,
        session_date: val.extendedProps.session_date,
        session_description: val.extendedProps.session_description,
        session_duration: val.extendedProps.session_duration,
        session_time: val.extendedProps.session_time,
        start: val.extendedProps.session_date,
        student_id: val.extendedProps.student_id,
        subject: val.extendedProps.subject,
        subject_id: val.extendedProps.subject_id,
        title: val.title,
      };
      setComplateSessionData(filed);
    } else {
      setComplateSessionData(val);
    }
    setShowSessionCompleteModalBtn(!showSessionCompleteModalBtn);
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
    setDeteleSessionShowModal(!deteleSessionShowModal);
    setDeleteSessionInfo(val);
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
                            <p
                              key={index}
                              className="text-light-blue-a text-10 font-regular"
                            >
                              {item.title}
                            </p>
                          );
                        } else if (index === 3) {
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
                      }`}
                    >
                      {eventsForToday.length}
                    </Badge>
                  </Card>
                  <DropdownMenu
                    style={{ ["--x-dropdown-min-width"]: "130px" }}
                    className="p-0 w-64 menu-top-toggle"
                    // positionFixed={true}
                    container="body"
                  >
                    {eventsForToday.map((item, index) => {
                      var GivenDate = item.start;
                      var CurrentDate = new Date();
                      return (
                        <DropdownItem tag="div" key={index} className="p-0">
                          <LectureCard
                            type={false}
                            item={item}
                            GivenDate={GivenDate}
                            CurrentDate={CurrentDate}
                            showEditSessionModal={(e, t) =>
                              showSessionEditModalHandle(e, t)
                            }
                            showSessionCompleteModal={(e) =>
                              showSessionCompleteModalHandal(e)
                            }
                            showDeleteSessionModal={(e, t) =>
                              showSessionDeleteModalHandle(e, t)
                            }
                            handleClickMessageUser={() =>
                              handleClickMessageUser(
                                item.student_id,
                                "calander"
                              )
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
      var CurrentDate = new Date();
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
                    className="text-base text-light-blue-a font-bold"
                    style={{ ["--x-dropdown-min-width"]: "130px" }}
                    container="body"
                  >
                    <DropdownItem
                      tag="a"
                      className="link-dark-blue-a font-bold cursor-pointer"
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
                      className="link-dark-blue-a font-bold cursor-pointer"
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
                          eventData.extendedProps.student_id,
                          "calander"
                        )
                      }
                    >
                      <span className="d-inline-block w-8">
                        <Message2 size="20" />
                      </span>
                      {`Parler à  ${eventData?.extendedProps?.name}`}
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
                <h6 className="text-base">{eventData.extendedProps.subject}</h6>
              </Col>
              <Col xs="12" className="d-flex gap-2 align-items-center">
                <ShowImage
                  className="avatar w-8 h-8 rounded-circle bg-secondary flex-none"
                  imageName={eventData.extendedProps.profile_image}
                  width={68}
                  height={68}
                />
                <span className="text-light-blue-a">
                  {eventData.extendedProps.name}
                </span>
              </Col>
              {!eventData?.extendedProps?.complete_session_id && (
                <Col xs="12">
                  <div
                    className={`${
                      showMinTimeHandle(
                        eventData.extendedProps.session_date,
                        eventData.extendedProps.session_duration
                      )
                        ? "btn-dark-blue-c"
                        : "btn-orange"
                    } btn  w-full`}
                    onClick={() =>
                      showMinTimeHandle(
                        eventData.extendedProps.session_date,
                        eventData.extendedProps.session_duration
                      )
                        ? joinLectureHandle(eventData, true)
                        : showSessionCompleteModalHandal(eventData, true)
                    }
                  >
                    {showMinTimeHandle(
                      eventData.extendedProps.session_date,
                      eventData.extendedProps.session_duration
                    )
                      ? "Rejoindre"
                      : "Compléter"}
                  </div>
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
                      <LectureCard
                        type={false}
                        item={item}
                        GivenDate={GivenDate}
                        CurrentDate={CurrentDate}
                        showEditSessionModal={(e, t) =>
                          showSessionEditModalHandle(e, t)
                        }
                        showSessionCompleteModal={(e) =>
                          showSessionCompleteModalHandal(e)
                        }
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

  const handleClickMessageUser = async (data, from) => {
    let Data = data;
    if (from && from === "calander") {
      let user = await roleWiseUserData.filter(function (item) {
        return item.id === data;
      });
      Data = user[0];
    }
    router.push({
      pathname: "/messages",
      query: { ...Data },
    });
  };

  const joinLectureHandle = (item, isWeekView) => {
    let studentId = null;
    let subjectId = null;
    if (isWeekView) {
      studentId = item?.extendedProps?.student_id;
      subjectId = item?.extendedProps?.subject_id;
    } else {
      studentId = item?.student_id;
      subjectId = item?.subject_id;
    }
    dispatch(getTutorLectureAction(userData?.id, studentId, subjectId));
  };
  
  return (
    <>
      {/* <Layout> */}
      <Row className="gy-lg-0 gy-6">
        <Col lg="8" xl="9">
          <Card className="d-lg-none mb-6">
            <CardHeader className="pb-2">
              <p className="text-sm">{t("TutorCalendar.Today")}</p>
            </CardHeader>
            <CardBody className="pt-2">
              {getAllTodaySession?.length > 0 ? (
                <>
                  {getAllTodaySession?.map((item, idx) => {
                    var GivenDate = item.session_date;
                    var CurrentDate = new Date();
                    return (
                      <TodayLectureCard
                        type={true}
                        item={item}
                        GivenDate={GivenDate}
                        CurrentDate={CurrentDate}
                        showSessionCompleteModal={(e) =>
                          showSessionCompleteModalHandal(e)
                        }
                        handleClickMessageUser={() =>
                          handleClickMessageUser(item.student)
                        }
                        joinLectureHandle={(e, t) => joinLectureHandle(e, t)}
                        key={idx}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="text-dark-blue-a">
                  {t("TutorCalendar.TodayCard")}
                </p>
              )}
            </CardBody>
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
                      slotDuration: "00:00:01",
                      slotMinTime: "00:00:01",
                      slotMaxTime: "00:00:01",
                    },
                    dayGridWeek: {
                      titleFormat: {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                      dayHeaderFormat: { day: "numeric", weekday: "long" },
                      slotDuration: "00:00:01",
                      slotMinTime: "00:00:01",
                      slotMaxTime: "00:00:01",
                    },
                  }}
                  eventOverlap={true} // Allow events to overlap
                  slotDuration={"00:00:01"}
                  duration={"00:00:01"}
                  locales={[esLocale, frLocale]}
                  locale={i18n.language || "fr"}
                  initialView="dayGridMonth"
                  eventContent={(e) => design(e)}
                  events={allEvents} // show events
                  dayCellContent={(e) => dateDesign(e)}
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
          {/* <div className="mt-6">
              <CalendarSyncFooter />
            </div> */}
        </Col>
        <Col lg="4" xl="3" className="vstack gap-6">
          <Card className="d-lg-block d-none">
            <CardHeader className="pb-2">
              <p className="text-sm">{t("TutorCalendar.Today")}</p>
            </CardHeader>

            <CardBody className="pt-2">
              {getAllTodaySession && getAllTodaySession?.length > 0 ? (
                <>
                  {getAllTodaySession?.map((item, idx) => {
                    var GivenDate = item.session_date;
                    var CurrentDate = new Date();
                    return (
                      <TodayLectureCard
                        type={true}
                        item={item}
                        GivenDate={GivenDate}
                        CurrentDate={CurrentDate}
                        showSessionCompleteModal={(e) =>
                          showSessionCompleteModalHandal(e)
                        }
                        handleClickMessageUser={() =>
                          handleClickMessageUser(item.student)
                        }
                        joinLectureHandle={(e, t) => joinLectureHandle(e, t)}
                        key={idx}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="text-dark-blue-a">
                  {t("TutorCalendar.TodayCard")}
                </p>
              )}
            </CardBody>
          </Card>
          <ShowAllTutorMessageList
            allMessage={roleWiseUserData}
            handleClickMessageUser={(e) => handleClickMessageUser(e)}
          />
        </Col>
      </Row>
      {/* </Layout> */}
      {showSessionCompleteModalBtn && (
        <CompleteSessionModal
          type={true}
          show={showSessionCompleteModalBtn}
          hide={() => showSessionCompleteModalHandal()}
          sessionInfo={complateSessionData}
        />
      )}
      {editSessionShowModal && (
        <NewSessionModal
          type={editSessionInfoFlag}
          show={editSessionShowModal}
          hide={() => showSessionEditModalHandle()}
          sessionData={editSessionInfo}
          weekType={true}
          userRole="tutor"
        />
      )}
      {deteleSessionShowModal && (
        <DeleteSessionModal
          type={deleteSessionInfoFlag}
          show={deteleSessionShowModal}
          hide={(e) => showSessionDeleteModalHandle(e)}
          sessionData={deleteSessionInfo}
          student={null}
          weekType={true}
          id={true}
        />
      )}
    </>
  );
};

export default TutorCalendar;
