import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { useCallback, useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import moment from "moment";
import { t } from "i18next";
import { allDay } from "../../utils/data";
import { convertToUserTimeZone } from "@/utils/timeZoneConvert";

function CalendarSlider({ getAllcurrentWeekSession, clickToScroolHandle }) {
  const [allCurrentWeekDates, setAllCurrentWeekDates] = useState([]);
  const [allCurrentWeekFullDates, setAllCurrentWeekFullDates] = useState([]);
  const cDate = new Date().getDate();
  let week = [];
  let fullWeek = [];

  const selectWeek = useCallback(
    (newdate) => {
      const today = new Date();
      const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - currentDay); // Start of the current week

      for (let i = 1; i <= 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i); // Get date for each day of the week
        const dateStr = date.toDateString().split(" ").slice(2, 3).join(" "); // Format the date to 'Day Month Date'
        week.push({
          date: dateStr,
          day: date.toLocaleDateString("en-US", { weekday: "long" }),
        });
        fullWeek.push({ date });
      }

      /////////////////////////////////////////////////////////
      // const Newdate = new Date(newdate);
      // for (let i = 1; i <= 7; i++) {
      //   let first = Newdate.getDate() - Newdate.getDay() + i;
      //   let fullDate = new Date(Newdate.setDate(first));
      //   let days = new Date(Newdate.setDate(first)).toDateString().slice(0, 10);
      //   var dayName = days.toString().split(" ")[0];
      //   var date = days.toString().split(" ")[2];
      //   week.push({ dayName, date });
      //   fullWeek.push({ fullDate });
      // }
      setAllCurrentWeekFullDates(fullWeek);
      setAllCurrentWeekDates(week);
    },
    [week]
  );

  useEffect(() => {
    let curr = Date.now();
    if (allCurrentWeekDates.length < 3) {
      selectWeek(curr);
    }
  }, [selectWeek, setAllCurrentWeekDates, allCurrentWeekDates]);

  // events counter
  const showPerDayEventsCounts = (val) => {
    let count = 0;
    for (let i = 0; i < getAllcurrentWeekSession.length; i++) {
      const el = getAllcurrentWeekSession[i];
      if (
        moment(val.date).format("DD/MM/YYYY") ===
        moment(el.session_date).format("DD/MM/YYYY")
        // moment(convertToUserTimeZone(el.session_date)).format("DD/MM/YYYY")
      ) {
        count++;
      }
    }
    return count;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        {/* <p>{t("TutorDeshbord.Calendar")}</p> */}
        <h6>{t("TutorDeshbord.Calendar")}</h6>
      </CardHeader>
      <CardBody className="pt-2">
        <Swiper
          breakpoints={{
            250: {
              slidesPerView: 7,
            },
            400: {
              slidesPerView: 7,
            },
            768: {
              slidesPerView: 7,
            },
          }}
          freeMode={true}
          className="calendar-slider ms-n2 ms-lg-0 pt-4"
          slidesPerView={3}
          modules={[Navigation]}
          // navigation={{
          //   prevEl: "#calendarSwiperPrev",
          //   nextEl: "#calendarSwiperNext",
          // }}
        >
          {allCurrentWeekDates.map((date, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className={`date-box cursor-pointer ${
                    date.date == cDate && "active"
                  }`}
                  onClick={() => clickToScroolHandle(index)}
                >
                  <span className="count">{date.date}</span>
                  {showPerDayEventsCounts(allCurrentWeekFullDates[index]) >
                  0 ? (
                    <span className="h-5 w-5 hstack justify-content-center font-bolder rounded-pill position-absolute top-0 start-full translate-middle bg-orange text-white">
                      {showPerDayEventsCounts(allCurrentWeekFullDates[index])}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <p className="week-day-name">
                  <span>{t(allDay[index]?.name)}</span>
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </CardBody>
    </Card>
  );
}

export default CalendarSlider;
