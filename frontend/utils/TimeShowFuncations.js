import moment from "moment";
import i18n from "./i18nextInit";

export const showTimeHandal = (date) => {
  var dateInMonth = moment(date, "YYYY/MM/DD").daysInMonth();
  let currentTime = moment();
  if (
    moment(currentTime).diff(date, "second") >= 0 &&
    moment(currentTime).diff(date, "second") <= 60
  ) {
    let diff = moment(currentTime).diff(date, "second");
    return <span className="notification-time">{`${diff}s`}</span>;
  } else if (
    moment(currentTime).diff(date, "minute") >= 0 &&
    moment(currentTime).diff(date, "minute") <= 60
  ) {
    let diff = moment(currentTime).diff(date, "minute");
    return <span className="notification-time">{`${diff}m`}</span>;
  } else if (
    moment(currentTime).diff(date, "hour") > 0 &&
    moment(currentTime).diff(date, "hour") <= 24
  ) {
    let diff = moment(currentTime).diff(date, "hour");
    return (
      <span className="notification-time">{`${diff} ${
        i18n?.language === "en" ? "h" : "j"
      }`}</span>
    );
  } else if (
    moment(currentTime).diff(date, "day") > 0 &&
    moment(currentTime).diff(date, "day") <= dateInMonth
  ) {
    let diff = moment(currentTime).diff(date, "day");
    return (
      <span className="notification-time">{`${diff} ${
        i18n?.language === "en" ? "d" : "j"
      }`}</span>
    );
  }
};

// show start time before 1 hour funcations
export const show1HourTime = (date, CurrentDate) => {
  if (
    moment(date).diff(CurrentDate, "minute") >= 0 &&
    moment(date).diff(CurrentDate, "minute") <= 60
  ) {
    return true;
  } else {
    return false;
  }
};

// show start time before 24 hour funcations
export const show24HourTime = (date, CurrentDate) => {
  return moment(date).diff(CurrentDate, "hours") < 24 ? true : false;
};

// show tutor calender in confrom and join button show diff
export const showMinTimeHandle = (date, duration) => {
  let hour = null;
  let min = null;
  if (duration === "30m" || duration === "45m") {
    hour = "00";
    min = duration?.slice(0, 2);
  } else {
    const time = duration.split("h");
    hour = time[0];
    min = time[1];
  }
  const modifiedDate = moment(date, "YYYY-MM-DD HH:mm")
    .add(Number(hour), "hours")
    .add(Number(min), "minutes");
  const finalDateAndTime = modifiedDate.format("YYYY-MM-DD HH:mm");
  return moment(finalDateAndTime).diff(moment(), "minute") >= 0;
};
