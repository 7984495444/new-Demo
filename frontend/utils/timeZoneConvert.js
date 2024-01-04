import moment2 from "moment-timezone";
import moment from "moment";
import { t } from "i18next";
// function to get user timezone
export const getUserTimeZone = () => {
  // var userTimeZone = localStorage.getItem("userTimeZone")
  //   ? localStorage.getItem("userTimeZone")
  //   : moment2.tz.guess();
  const userTimeZone = moment2.tz.guess();
  localStorage.setItem("userTimeZone", userTimeZone || "UTC");
  localStorage.setItem("userTimeZone", userTimeZone);
  // setUserTimeZone(userTimeZone || "UTC"); // Fallback to UTC if timezone cannot be determined
};

// Function to convert the date to the user timezone
export const convertToUserTimeZone = (utcDateTime) => {
  var userTimeZone = null;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    userTimeZone = localStorage.getItem("userTimeZone") || "UTC";
  }
  // var userTimeZone = localStorage.getItem("userTimeZone") || "UTC";
  let convertedDate = moment2
    .utc(utcDateTime, "YYYY-MM-DD HH:mm")
    .tz(userTimeZone);

  return moment(convertedDate).format("YYYY-MM-DD HH:mm");
};

// Function to convert the date to the universal timezone
export const convertToUniversalTime = (date, hour) => {
  const newDate = moment(date).format("YYYY-MM-DD");
  const newTime = moment(hour).format("HH:mm");

  const combinedDateTime = moment(`${newDate} ${newTime}`, "YYYY-MM-DD HH:mm");
  const utcDateTime = combinedDateTime.utc().format("YYYY-MM-DD HH:mm");
  return utcDateTime;
};

// Function to convert the time string to the local timezone
export const convertStringFromUTCtoLocal = (inputString) => {
  if (inputString) {
    var userTimeZone = localStorage.getItem("userTimeZone") || "UTC";
    const [hours, minutes] = inputString?.split(/[hm]/).map(Number);

    const utcDateTime = moment2.utc().hours(hours).minutes(minutes);
    const userDateTime = utcDateTime.tz(userTimeZone);

    const formattedString = `${userDateTime
      .hours()
      .toString()
      .padStart(2, "0")}h${userDateTime.minutes().toString().padStart(2, "0")}`;

    return formattedString;
  }
};

export const getDisplayValueForTimeSlot = (value) => {
  if (value === "Aucune disponibilité") {
    return t("Common.NoAvailability");
  } else {
    return value;
  }
};

// conver to date all first latter upper-case handle
export const convertToUppercaseDate = (formattedDate) => {
  const date = formattedDate.split(" ");
  const capitalizedWords = date.map((word) => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return "";
  });
  return capitalizedWords.join(" ");
};
