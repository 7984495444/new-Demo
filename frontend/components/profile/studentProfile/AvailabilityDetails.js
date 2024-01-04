import { t } from "i18next";
import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { AddCircle, MinusCirlce } from "iconsax-react";
import EditAndSaveBtn from "../EditAndSaveBtn";
import { useDispatch } from "react-redux";
import { editUserProfileAction } from "@/redux/actions/userAction";
import TimeSlotSelectDropdown from "../TimeSlotSelectDropdown";
import { allDayUseProfile } from "@/utils/data";

const AvailabilityDetails = ({
  userData,
  getUserProfileData,
  userInfoEdit,
  userInfoEditHandle,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const [regularAvailability, setRegularAvailability] = useState(
    getUserProfileData?.regular_availability
  );

  // for reguler availability
  const handleSelectChange = (dayIndex, timeIndex, selectedTime) => {
    const updatedAvailability = [...regularAvailability];
    updatedAvailability[dayIndex][
      Object.keys(updatedAvailability[dayIndex])[0]
    ][timeIndex] = selectedTime;
    setRegularAvailability(updatedAvailability);
  };

  // remove regularAvailability
  const removeRegularTimeSlot = (dayIndex, timeIndex) => {
    const updatedRegularAvailability = [...regularAvailability];
    const dayOfWeek = Object.keys(updatedRegularAvailability[dayIndex])[0];
    updatedRegularAvailability[dayIndex][dayOfWeek].splice(timeIndex, 1);
    setRegularAvailability(updatedRegularAvailability);
  };

  const handleAddRow = (dayOfWeek) => {
    const dayIndex = regularAvailability.findIndex(
      (day) => Object.keys(day)[0] === dayOfWeek
    );
    if (dayIndex !== -1) {
      const updatedAvailability = [...regularAvailability];
      updatedAvailability[dayIndex][dayOfWeek].push("");
      setRegularAvailability(updatedAvailability);
    }
  };

  const editInfoHandle = (type, subtype) => {
    let field = {};
    if (subtype) {
      field = {
        ...getUserProfileData,
        regular_availability: regularAvailability,
      };
    } else {
      setRegularAvailability(getUserProfileData?.regular_availability);
    }
    // submit data edit
    if (subtype) {
      dispatch(editUserProfileAction(userData?.id, field));
    }
    userInfoEditHandle(type);
  };

  return (
    <>
      <Row className="gy-6 gx-0">
        <Col xxl="2" xl="3" lg="3" md="12">
          <h6 className="text-pre-line">{t("Common.Availability")}</h6>
        </Col>
        <Col xxl="10" xl="9" lg="9" md="12">
          {userInfoEdit?.availability ? (
            <>
              <div style={{ maxWidth: "300px" }}>
                <h6 className="font-bold mb-6">
                  {t("Profile.RegularAvailability")}
                </h6>
                {regularAvailability.map((day, dayIndex) => {
                  const dayOfWeek = Object.keys(day)[0];
                  return (
                    <Row className="gx-2">
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
                                handleSelectChange(dayIndex, timeIndex, value);
                              }}
                              isShowDefaultValue={
                                timeIndex === 0 ? true : false
                              }
                              preTime={day[dayOfWeek]}
                              timeIndex={timeIndex}
                            />
                            {timeIndex !== 0 ? (
                              <MinusCirlce
                                className="flex-none text-dark-blue-c cursor-pointer mt-1"
                                size={20}
                                onClick={() =>
                                  removeRegularTimeSlot(dayIndex, timeIndex)
                                }
                              />
                            ) : (
                              <AddCircle
                                className="text-dark-blue-c cursor-pointer"
                                size={20}
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
                      className="text-dark-blue-c cursor-pointer"
                      size={20}
                      onClick={() => handleAddRow(dayOfWeek)}
                    />
                  </Col> */}
                    </Row>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <Row>
                <Col xxl="6" xl="8" lg="8">
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
              </Row>
            </>
          )}
        </Col>
      </Row>
      <EditAndSaveBtn
        type="availability"
        isShowSaveBtn={userInfoEdit?.availability}
        editInfoHandle={(e, t) => editInfoHandle(e, t)}
        userInfoEditHandle={(e) => userInfoEditHandle(e)}
        isEditable={isEditable}
      />
    </>
  );
};

export default AvailabilityDetails;
