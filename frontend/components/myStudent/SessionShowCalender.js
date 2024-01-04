import { t } from "i18next";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es"; // locales
import frLocale from "@fullcalendar/core/locales/fr"; // locales
import { getAllTutorStudentSessionByIdAction } from "@/redux/actions/tutorAction";
import { useDispatch, useSelector } from "react-redux";
import { subjectTranslationHandle } from "../../utils/subjectTranslationFuncationsn";
import i18n from "@/utils/i18nextInit";

const SessionShowCalender = ({ studentInfo, historyInfo, isStudentRole }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllTutorStudentSessionByIdAction(
        studentInfo?.id || studentInfo?.student_id || studentInfo,
        studentInfo?.subject_id || 0
      )
    );
  }, []);

  const { getAllTutorStudentSessionById } = useSelector((state) => state.tutor);

  const events = getAllTutorStudentSessionById?.session_dates;

  const selectedEventDate = moment(historyInfo?.session_date).format(
    "YYYY-MM-DD"
  );

  // function to render custom design in fullcalender
  const handleDesign = (event, element, view) => {
    return <span className="d-none"></span>;
  };

  const dayCellContent = ({ date }) => {
    const formatedEventdate = moment(date).format("YYYY-MM-DD");
    const todaysDate = moment().format("YYYY-MM-DD");
    const eventDates = events?.map((event) =>
      moment(event?.session_date).format("YYYY-MM-DD")
    );
    const isCurrentDate =
      moment(todaysDate).diff(formatedEventdate, "days") === 0;
    const isPastDate = moment(todaysDate).diff(formatedEventdate, "days") > 0;
    const isFutureDate = moment(todaysDate).diff(formatedEventdate, "days") < 0;
    const isSelectedEventDate = selectedEventDate === formatedEventdate;

    let backgroundColor = "";

    if (isSelectedEventDate) {
      backgroundColor = "#FFD83D";
    } else if (isCurrentDate) {
      backgroundColor = "transparent";
    } else if (isPastDate) {
      backgroundColor = "#ECF2F8";
    } else if (isFutureDate) {
      backgroundColor = "#ECF2F8";
    }
    if (eventDates?.includes(formatedEventdate)) {
      return (
        <div
          className="fc-daygrid-day-top"
          style={{
            backgroundColor,
            height: "32px",
            width: "32px",
            borderRadius: "50%",
          }}
        >
          {date.getDate()}
        </div>
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
          {date.getDate()}
        </div>
      );
    }
  };

  return (
    <>
      {!isStudentRole && (
        <>
          <div className="mb-lg-8">
            <span className="text-2xl">
              {String(historyInfo?.confirm_sessions || "00").padStart(2, "0")}
            </span>
            <span>
              /{String(historyInfo?.total_session || "00").padStart(2, "0")}
            </span>
            <span className="font-bolder m-2">
              {t("MyStudentProfile.CompletedSession")}
            </span>
          </div>
          <hr className="mt-auto mb-10 d-lg-block d-none" />
        </>
      )}
      <h6 className="text-base mb-6">
        {subjectTranslationHandle(historyInfo)}
      </h6>
      <Card className="shadow-a mb-5">
        <CardBody className="pb-3">
          <div className="small-fullcalendar">
            <FullCalendar
              height="375px"
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekday="narrow"
              dayHeaderFormat={{
                weekday: "narrow",
              }}
              headerToolbar={{
                left: "title",
                right: "prev next",
              }}
              locales={[esLocale, frLocale]}
              locale={i18n.language}
              views={{
                dayGridMonth: {
                  titleFormat: { month: "long" },
                },
              }}
              eventContent={(event, element, view) =>
                handleDesign(event, element, view)
              }
              events={events}
              dayCellContent={dayCellContent}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SessionShowCalender;
