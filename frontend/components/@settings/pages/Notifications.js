import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationAction } from "@/redux/actions/notificationAction";
import NotificationSettingsModal from "@/components/modal/NotificationSettingsModal";
import { notificationSettingsUserWise } from "@/utils/data";
import { createDefaultMaskGenerator } from "react-hook-mask";
const PhoneNumberMaskGenerator = createDefaultMaskGenerator("(999) 999-9999"); // "9999 9999 9999 9999"

const NotificationsTab = ({ userData, activeTabIndex }) => {
  const [allInfo, setAllInfo] = useState({});
  const [showNotificationModal, setshowNotificationModal] = useState(true);
  const [mainNotificationSettings, setmainNotificationSettings] = useState(
    notificationSettingsUserWise[0].mainNotificationSettings
  );

  let { notifyMeWhen, notifyMeVia, alertType } = {};

  const dispatch = useDispatch();
  useEffect(() => {
    if (userData?.role_id?.id) {
      setmainNotificationSettings(
        notificationSettingsUserWise[userData?.role_id?.id - 1]
          .mainNotificationSettings
      );
    }
  }, [userData]);

  useEffect(() => {
    dispatch(getNotificationAction());
  }, []);

  const { getNotifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (getNotifications) {
      setAllInfo(getNotifications);
      setshowNotificationModal(getNotifications?.show_notification_model);
    }
  }, [getNotifications]);

  //  save notification settings
  // const onChangeHandle = (mainField, field, value) => {
  //   if (mainField === "Notify me when:") {
  //     setnotifyMeWhen({
  //       ...notifyMeWhen,
  //       [field]: value,
  //     });
  //   } else if (mainField === "Notify me via:") {
  //     setnotifyMeVia({
  //       ...notifyMeVia,
  //       [field]: value,
  //     });
  //   } else if (mainField === "Alert type:") {
  //     setalertType({
  //       ...alertType,
  //       [field]: value,
  //     });
  //   }

  //   // setAllInfo({
  //   //   ...allInfo,
  //   //   [field]: value,
  //   // });
  // };
  const onChangeHandle = (mainField, field, value) => {
    if (mainField === "Notify me when:") {
      notifyMeWhen = {
        ...notifyMeWhen,
        [field]: value,
      };
    } else if (mainField === "Notify me via:") {
      notifyMeVia = {
        ...notifyMeVia,
        [field]: value,
      };
    } else if (mainField === "Alert type:") {
      alertType = {
        ...alertType,
        [field]: value,
      };
    }

    // setAllInfo({
    //   ...allInfo,
    //   [field]: value,
    // });
  };
  // const onChangeHandle = (field, value) => {
  //   setAllInfo({
  //     ...allInfo,
  //     [field]: value,
  //   });
  // };

  const addDetails = () => {
    const allNotificationSettings = {
      "Notify me when:": notifyMeWhen,
      "Notify me via:": notifyMeVia,
      "Alert type:": alertType,
    };
    // dispatch(editNotificationAction(allInfo));
  };

  const showNotificationModalHandal = () => {
    setshowNotificationModal(!showNotificationModal);
  };

  return (
    <>
      <Card>
        <CardHeader className="p-6">
          <h6 className="font-bolder">{t("NotificationsTab.Header")}</h6>
        </CardHeader>
        <CardBody
          className="pt-4 h-lg-calc overflow-auto vstack gap-6"
          style={{ ["--x-h-lg"]: "290px" }}
        >
          {/* mainNotificationSettings Loop */}
          {mainNotificationSettings?.map((val, ind) => {
            return (
              <div className="pb-6 border-bottom">
                <h6 className="font-regular">{t(val?.text)}</h6>
                {/* {t("NotificationsTab.Notify")} */}
                {/* subTypeOfNotifications Loop*/}
                {val?.subTypesOfNotification?.map((value, index) => {
                  return (
                    <Row className="gx-0 mb-sm-0 mb-10">
                      <Col sm="4" className="py-sm-10 pb-5">
                        <p className="text-semi-grey">{t(value?.text)}</p>
                      </Col>
                      <Col
                        sm="8"
                        className={`py-sm-10 pb-10 ${
                          val?.subTypesOfNotification?.length === index + 1
                            ? undefined
                            : "border-bottom"
                        } `}
                      >
                        <Row className="gy-5">
                          {/* notificationSettingsList Loop */}
                          {value?.notificationSettingsList?.map((v, i) => {
                            onChangeHandle(val?.text, v?.name, v?.isChecked);
                            return (
                              <Col sm="6">
                                <FormGroup className="form-check-bold" check>
                                  <Input
                                    id={v?.name}
                                    type="checkbox"
                                    // defaultChecked={"true"}
                                    onChange={(e) =>
                                      onChangeHandle(
                                        val?.text,
                                        v?.name,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <Label
                                    className="text-black"
                                    for={v?.name}
                                    check
                                  >
                                    {t(v?.text)} <br />
                                    {v?.breakLine}
                                  </Label>
                                </FormGroup>
                                <span
                                  className="d-block mt-1"
                                  style={{
                                    paddingLeft: "2.5em",
                                    color: "#AFB7BF",
                                  }}
                                >
                                  {v?.name === "Email" && (
                                    <>{userData?.email}</>
                                    // <Input
                                    //   className="custom-input-1"
                                    //   type={val.type}
                                    //   placeholder={val?.placeholder}
                                    //   value={userData?.email}
                                    //   disabled={true}
                                    // />
                                  )}
                                  {v?.name === "SMS" && (
                                    <>{userData?.phone_no}</>
                                    // <MaskedInput
                                    //   type="text"
                                    //   className="custom-input-1 form-control-plaintext"
                                    //   placeholder={val?.placeholder}
                                    //   value={userData?.phone_no}
                                    //   maskGenerator={PhoneNumberMaskGenerator}
                                    //   disabled={true}
                                    // />
                                  )}
                                </span>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          })}
        </CardBody>
        <CardFooter>
          <Button
            color="dark-blue-c"
            className="rounded-1"
            onClick={addDetails}
          >
            {t("NotificationsTab.SafeguardBtn")}
          </Button>
        </CardFooter>
      </Card>
      {!showNotificationModal && activeTabIndex == 1 && (
        <NotificationSettingsModal
          show={!allInfo?.show_notification_model}
          hide={showNotificationModalHandal}
          allInfo={allInfo}
        />
      )}
    </>
  );
};

export default NotificationsTab;
