import { t } from "i18next";
import React from "react";
import {
  Badge,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import {
  AddCircle,
  ArrowDown2,
  Edit,
  InfoCircle,
  MinusCirlce,
} from "iconsax-react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/l10n/fr.js";
import moment from "moment";
import TimeSlotSelectDropdown from "../TimeSlotSelectDropdown";
import { allDayUseProfile } from "@/utils/data";

const AvailabilityDetails = ({
  userInfoEdit,
  regularAvailability,
  handleSelectChange,
  removeRegularTimeSlot,
  handleAddRow,
  specialAvailability,
  toggleStatus,
  handleStartDateChange,
  handleEndDateChange,
  handleTimeSlotChange,
  removeTimeSlot,
  handleAddTimeSlot,
  userInfoSaveHandle,
  userInfoDiscardHandle,
  isEditable,
  userInfoEditHandle,
}) => {
  return (
    <Row className="gy-md-2 gy-4 gx-0 position-relative">
      <Col xxl="3" xl="3" lg="3" md="2" className="pe-md-8">
        <h6 className="text-pre-line">{t("Profile.Availability")}</h6>
      </Col>
      <Col
        xxl="9"
        xl="9"
        lg="9"
        md="10"
        className="pb-10 border-bottom border-light-blue-b min-h-16"
      >
        {userInfoEdit?.availability ? (
          <Row className="gx-md-6 gx-0">
            <Col xxl="8" xl="8" lg="9" md="9" sm="12" xs="12">
              <Row className="gy-6 gx-xxl-20">
                <Col sm="6">
                  <h6 className="font-semibold text-sm mb-4">
                    {t("Profile.RegularAvailability")}
                  </h6>
                  <div style={{ maxWidth: "275px" }}>
                    {regularAvailability.map((day, dayIndex) => {
                      const dayOfWeek = Object.keys(day)[0];
                      return (
                        <Row className="gx-2" key={dayIndex}>
                          <Col
                            xxl="4"
                            xl="5"
                            lg="5"
                            md="5"
                            sm="5"
                            xs="5"
                            className="py-2"
                          >
                            {t(allDayUseProfile[dayOfWeek])}
                          </Col>
                          <Col xxl="8" xl="7" lg="7" md="7" sm="7" xs="7">
                            {day[dayOfWeek].map((time, timeIndex) => (
                              <div key={timeIndex} className="hstack gap-2">
                                <TimeSlotSelectDropdown
                                  key={timeIndex}
                                  time={time}
                                  disabled={false}
                                  handleSelectChange={(value) => {
                                    handleSelectChange(
                                      dayIndex,
                                      timeIndex,
                                      value
                                    );
                                  }}
                                  isShowDefaultValue={
                                    timeIndex === 0 ? true : false
                                  }
                                  preTime={day[dayOfWeek]}
                                  timeIndex={timeIndex}
                                />
                                {timeIndex !== 0 ? (
                                  <MinusCirlce
                                    className="flex-none text-dark-blue-c cursor-pointer"
                                    size={20}
                                    onClick={() =>
                                      removeRegularTimeSlot(dayIndex, timeIndex)
                                    }
                                  />
                                ) : (
                                  <AddCircle
                                    size={20}
                                    className="text-dark-blue-c cursor-pointer"
                                    onClick={() => handleAddRow(dayOfWeek)}
                                  />
                                )}
                              </div>
                            ))}
                          </Col>
                          {/* <Col
                          xxl="1"
                          xl="2"
                          lg="2"
                          md="2"
                          sm="2"
                          xs="2"
                          className="text-end"
                          style={{
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          <AddCircle
                            size={20}
                            className="text-dark-blue-c cursor-pointer"
                            onClick={() => handleAddRow(dayOfWeek)}
                          />
                        </Col> */}
                        </Row>
                      );
                    })}
                  </div>
                </Col>
                <Col sm="6">
                  <div style={{ maxWidth: "275px" }}>
                    <FormGroup className="mb-4" check>
                      <Input
                        type="checkbox"
                        id="special_availability"
                        checked={specialAvailability.status}
                        onChange={toggleStatus}
                      />
                      <Label for="special_availability" check>
                        {t("Profile.SpecialAvailability")}
                      </Label>
                      <span
                        className="bonus-tooltip ms-1 text-light-blue-a text-orange-hover cursor-pointer"
                        id="availabilityTooltip"
                      >
                        <InfoCircle size="16" className="" />
                      </span>
                    </FormGroup>
                    <UncontrolledTooltip
                      placement="right"
                      target="availabilityTooltip"
                    >
                      <div className="text-start d-flex gap-2">
                        <InfoCircle
                          size="16"
                          className="text-dark-blue-a flex-none mt-2"
                        />
                        <p className="text-dark-blue-a">
                          {t("TutorMyProfile.AvailabilityDiffers")}
                        </p>
                      </div>
                    </UncontrolledTooltip>
                    <Row className="mb-6">
                      <Col xs="5">
                        <Label>{t("MyInvoice.Period")}</Label>
                        <div className="position-relative">
                          <Flatpickr
                            className="form-control-plaintext custom-input-1"
                            value={specialAvailability.start_date}
                            onChange={handleStartDateChange}
                            options={{ dateFormat: "Y-m-d" }}
                            placeholder="00/00/0000"
                            disabled={!specialAvailability.status}
                          />
                          <ArrowDown2
                            className="text-dark-blue-a position-absolute bg-white end-0 bottom-3"
                            size={16}
                          />
                        </div>
                      </Col>
                      <Col xs="2" className="vstack">
                        <hr className="mt-auto" />
                      </Col>
                      <Col xs="5">
                        <Label>{t("MyInvoice.Period")}</Label>
                        <div className="position-relative">
                          <Flatpickr
                            className="form-control-plaintext custom-input-1"
                            value={specialAvailability.end_date}
                            onChange={handleEndDateChange}
                            options={{ dateFormat: "Y-m-d" }}
                            placeholder="00/00/0000"
                            disabled={!specialAvailability.status}
                          />
                          <ArrowDown2
                            className="text-dark-blue-a position-absolute bg-white end-0 bottom-3"
                            size={16}
                          />
                        </div>
                      </Col>
                    </Row>
                    {specialAvailability.weekDays.map((day, dayIndex) => {
                      const dayOfWeek = Object.keys(day)[0];
                      return (
                        <Row className="gx-2" key={dayIndex}>
                          <Col
                            xxl="4"
                            xl="5"
                            lg="5"
                            md="5"
                            sm="5"
                            xs="5"
                            className="py-2"
                          >
                            {t(allDayUseProfile[dayOfWeek])}
                          </Col>
                          <Col xxl="8" xl="7" lg="7" md="7" sm="7" xs="7">
                            {day[dayOfWeek].map((time, timeIndex) => (
                              <div className="hstack gap-2">
                                <TimeSlotSelectDropdown
                                  key={timeIndex}
                                  time={time}
                                  disabled={!specialAvailability.status}
                                  handleSelectChange={(value) => {
                                    handleTimeSlotChange(
                                      dayIndex,
                                      timeIndex,
                                      value
                                    );
                                  }}
                                  isShowDefaultValue={
                                    timeIndex === 0 ? true : false
                                  }
                                  preTime={day[dayOfWeek]}
                                  timeIndex={timeIndex}
                                />
                                {timeIndex !== 0 ? (
                                  <MinusCirlce
                                    className="flex-none text-dark-blue-c cursor-pointer"
                                    size={20}
                                    onClick={() => {
                                      if (specialAvailability.status) {
                                        removeTimeSlot(dayIndex, timeIndex);
                                      }
                                    }}
                                  />
                                ) : (
                                  <AddCircle
                                    size={20}
                                    className="text-dark-blue-c cursor-pointer"
                                    onClick={() => {
                                      if (specialAvailability.status) {
                                        handleAddTimeSlot(dayIndex);
                                      }
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </Col>
                          {/* <Col
                          xxl="1"
                          xl="2"
                          lg="2"
                          md="2"
                          sm="2"
                          xs="2"
                          className="text-end"
                          style={{
                            paddingTop: "5px",
                            paddingBottom: "5px",
                          }}
                        >
                          <AddCircle
                            size={20}
                            className="text-dark-blue-c cursor-pointer"
                            onClick={() => {
                              if (specialAvailability.status) {
                                handleAddTimeSlot(dayIndex);
                              }
                            }}
                          />
                        </Col> */}
                        </Row>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xxl="4" xl="4" lg="3" md="3" sm="12" xs="12">
              <div className="d-flex align-items-start justify-content-end flex-wrap gap-2 pt-md-0 pt-4">
                <Button
                  color="dark-blue-c"
                  onClick={(e) => userInfoSaveHandle("availability", e)}
                >
                  {t("Common.SafeguardBtn")}
                </Button>
                <Button
                  color="orange"
                  onClick={() => userInfoDiscardHandle("availability")}
                >
                  {t("Common.CancelBtn")}
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="gx-md-6 gx-0">
            <Col xxl="8" xl="8" lg="10" md="7" sm="12" xs="12">
              <Row className="gy-6">
                <Col sm="6">
                  <div className="hstack gap-3 mb-6">
                    <h6 className="font-semibold text-sm">
                      {t("Profile.RegularAvailability")}
                    </h6>
                  </div>
                  <div className="vstack gap-4">
                    {regularAvailability?.map((dayAvailability, index) => {
                      const dayOfWeek = Object.keys(dayAvailability)[0];
                      const timeSlots = dayAvailability[dayOfWeek]
                        .map((slot) => {
                          if (slot === "Aucune disponibilité") {
                            return t("Common.NoAvailability");
                          }
                          return slot;
                        })
                        .filter(Boolean)
                        .join(" / ");
                      return (
                        <div key={index}>
                          <span className="text-sm">
                            {t(allDayUseProfile[dayOfWeek])} —{" "}
                          </span>
                          <span className="text-light-blue-a">{timeSlots}</span>
                        </div>
                      );
                    })}
                  </div>
                </Col>
                <Col sm="6">
                  <div className="hstack gap-3 mb-6">
                    <h6 className="font-semibold text-sm">
                      {t("TutorMyProfile.SpecialAvailability")}
                    </h6>
                    {specialAvailability?.status &&
                      specialAvailability.start_date &&
                      specialAvailability.end_date && (
                        <Badge className="bg-light-blue-c text-dark-blue-c bg-danger badge-text-break">
                          {`${moment(specialAvailability?.start_date).format(
                            "MMM D"
                          )} — ${moment(specialAvailability?.end_date).format(
                            "MMM D"
                          )}`}
                        </Badge>
                      )}
                  </div>
                  {specialAvailability?.status && (
                    <div className="vstack gap-4">
                      {specialAvailability.weekDays.map(
                        (dayAvailability, index) => {
                          const dayOfWeek = Object.keys(dayAvailability)[0];
                          const timeSlots = dayAvailability[dayOfWeek]
                            .map((slot) => {
                              if (slot === "Aucune disponibilité") {
                                return t("Common.NoAvailability");
                              }
                              return slot;
                            })
                            .filter(Boolean)
                            .join(" / ");
                          return (
                            <div key={index}>
                              <span className="text-sm">
                                {t(allDayUseProfile[dayOfWeek])} —{" "}
                              </span>
                              <span className="text-light-blue-a">
                                {timeSlots}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col
              xs="auto"
              className="position-md-relative position-absolute end-0 top-md-0 top-2 ms-auto"
            >
              {/* {userInfoEdit?.availability ? (
              "show here buttons"
            ) : ( */}
              {isEditable && (
                <Button
                  color="unset"
                  size="sm"
                  className="btn-square bg-light-blue-c bg-dark-blue-c-hover text-dark-blue-c text-white-hover"
                  onClick={() => userInfoEditHandle("availability")}
                >
                  <Edit />
                </Button>
              )}
              {/* )} */}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default AvailabilityDetails;
