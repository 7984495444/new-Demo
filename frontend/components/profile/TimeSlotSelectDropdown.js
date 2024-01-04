// import { tutorAvailabilityTimeRangeNew } from "@/utils/data";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
} from "reactstrap";
import { t } from "i18next";
import { getDisplayValueForTimeSlot } from "../../utils/timeZoneConvert";

function TimeSlotSelectDropdown({
  time,
  handleSelectChange,
  disabled,
  isShowDefaultValue,
  preTime,
  timeIndex,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [regularAvailabilityFrom, setregularAvailabilityFrom] = useState();
  const [regularAvailabilityTo, setregularAvailabilityTo] = useState();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (time) {
      const { startTime, endTime } = splitTimeRange(time);
      setregularAvailabilityFrom(startTime);
      setregularAvailabilityTo(endTime);
    }
  }, [time]);

  const splitTimeRange = (timeRange) => {
    const [startTime, endTime] = timeRange.split(" to ");
    return { startTime, endTime };
  };

  // create Time Range options
  const tutorAvailabilityTimeRangeNew = [];
  const startTime = "06:00";
  const endTime = "23:00";
  let currentTime = startTime;

  while (currentTime <= endTime) {
    tutorAvailabilityTimeRangeNew.push(currentTime);
    const [hours, minutes] = currentTime.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + 15;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    currentTime = `${newHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
  }

  const compareTimes = () => {
    // check if '--' is selected
    if (
      regularAvailabilityFrom === "Aucune disponibilité" &&
      regularAvailabilityTo === "Aucune disponibilité"
    ) {
      handleSelectChange("Aucune disponibilité");
      toggle();
    }

    // Parse the time values as Date objects
    const date1 = new Date(`1970-01-01T${regularAvailabilityFrom}:00`);
    const date2 = new Date(`1970-01-01T${regularAvailabilityTo}:00`);

    // Compare the Date objects
    if (isValidSlot(date1, date2) && date1 < date2) {
      toggle();
      handleSelectChange(
        `${regularAvailabilityFrom} to ${regularAvailabilityTo}`
      );
    }
  };

  const isValidSlot = (newStartTime, newEndTime) => {
    for (let index = 0; index < preTime?.length; index++) {
      const slot = preTime[index];
      if (timeIndex !== index) {
        const [selectedStartTimes, selectedEndTimes] = slot?.split(" to ");
        let start = new Date(`1970-01-01T${selectedStartTimes}:00`);
        let end = new Date(`1970-01-01T${selectedEndTimes}:00`);
        if (
          (newStartTime >= start && newStartTime < end) ||
          (newEndTime > start && newEndTime <= end) ||
          (newStartTime <= start && newEndTime >= end)
        ) {
          return false; // Overlaps with an existing slot
        }
      }
    }
    return true; // Valid slot
  };

  return (
    <Dropdown
      className="flex-1"
      isOpen={dropdownOpen}
      toggle={toggle}
      disabled={disabled}
    >
      <DropdownToggle tag="div">
        <Input
          className="custom-input-1 py-2 pe-5"
          plaintext={true}
          type="text"
          value={getDisplayValueForTimeSlot(time)}
          placeholder={t("Common.SpecifyHere")}
          disabled={disabled}
        />
      </DropdownToggle>
      <DropdownMenu
        container="body"
        className="w-32 pt-0"
        style={{ ["--x-dropdown-min-width"]: "auto" }}
      >
        <Row className="gx-0">
          <Col xs="6">
            <Label className="p-2 d-block">{t("Common.From")}</Label>
          </Col>
          <Col xs="6">
            <Label className="p-2 d-block">{t("Common.To")}</Label>
          </Col>
          <Col xs="6" className="border-end">
            <Input
              type="select"
              className="select-light-blue-plain-text border-0 text-black p-0 h-sm-64 h-40 select-custom-multi"
              multiple
              onChange={(e) => {
                setregularAvailabilityFrom(e.target.value);
              }}
            >
              {isShowDefaultValue && (
                <option
                  className="py-2 px-0"
                  value={"Aucune disponibilité"}
                  key={"- -"}
                >
                  &#160;&#160;&#160; - -
                </option>
              )}
              {tutorAvailabilityTimeRangeNew?.map((time, ind) => {
                return (
                  <option
                    className="py-2 px-0"
                    value={time}
                    key={ind}
                    selected={regularAvailabilityFrom === time}
                  >
                    &#160;&#160;&#160; {time}
                  </option>
                );
              })}
            </Input>
          </Col>
          <Col xs="6">
            <Input
              type="select"
              className="select-light-blue-plain-text border-0 text-black p-0 h-sm-64 h-40 select-custom-multi"
              multiple
              onChange={(e) => {
                setregularAvailabilityTo(e.target.value);
              }}
            >
              {isShowDefaultValue && (
                <option
                  className="py-2 px-0"
                  value={"Aucune disponibilité"}
                  key={"- -"}
                >
                  &#160;&#160;&#160; - -
                </option>
              )}
              {tutorAvailabilityTimeRangeNew?.map((time, ind) => (
                <option
                  className="py-2 px-0"
                  value={time}
                  key={ind}
                  selected={regularAvailabilityTo === time}
                >
                  &#160;&#160;&#160; {time}
                </option>
              ))}
            </Input>
          </Col>
          <Col>
            <div className="px-2 pt-3">
              <Button
                color="dark-blue-c"
                className="w-full"
                onClick={() => {
                  compareTimes();
                }}
              >
                Set time
              </Button>
            </div>
          </Col>
        </Row>
      </DropdownMenu>
    </Dropdown>
  );
}

export default TimeSlotSelectDropdown;
