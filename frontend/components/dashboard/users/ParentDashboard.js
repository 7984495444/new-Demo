import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
  DashboardInShowWeekCalender,
  Layout,
  TutorCard,
  ShowAllTutorMessageList,
  ShowAllAlertInDashboard,
  StudentStatistics,
  TutorProfile,
  StudentProfile,
  ContactSS,
  ShowSendComfirmationAlert,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByRole,
  idToGetUserDetailsAction,
} from "@/redux/actions/userAction";
import { useRouter } from "next/router";
import {
  getAllNotificationsAction,
  sendNotificationsCloseAction,
} from "@/redux/actions/sendNotificationAction";
import {
  getstudentStatisticsAction,
  getstudentTutorDeatisAction,
} from "@/redux/actions/dashbordAction";

const ParentDashboard = ({ userData, getAllcurrentWeekSession, getMySchoolLevel }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showTutorProfile, setShowTutorProfile] = useState(false); // show tutor profile
  const [showStudentProfile, setShowStudentProfile] = useState(false); // show student profile
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getUserByRole(0));
    dispatch(getAllNotificationsAction());
    dispatch(getstudentStatisticsAction());
    dispatch(getstudentTutorDeatisAction());
  }, []);

  const { roleWiseUserData } = useSelector((state) => state.user);
  const { getSendNotifications } = useSelector(
    (state) => state.sendNotification
  );
  const { editSessionReq } = useSelector((state) => state.tutor);
  const { getStudentTutorDetails, getStudentStatistics } = useSelector(
    (state) => state.dashboard
  );
  const { addNotifications } = useSelector((state) => state.sendNotification);

  useEffect(() => {
    if (addNotifications) {
      setShowAlert(true);
    }
  }, [addNotifications]);

  const hideShowAlertHandle = (e) => {
    setShowAlert(e);
    dispatch(sendNotificationsCloseAction());
  };

  const handleClickMessageUser = async (data, isTutorCard) => {
    let Data = data;
    if (isTutorCard) {
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

  const redirectMyStudentPageHandle = () => {
    router.push({
      pathname: "/student",
    });
  };

  // show tutor profile
  const redirectTutorProfileHandle = (val, type) => {
    if (type) {
      dispatch(idToGetUserDetailsAction(val?.student_id));
      setShowStudentProfile(!showStudentProfile);
    } else {
      dispatch(idToGetUserDetailsAction(val?.tutor_id));
      setShowTutorProfile(!showTutorProfile);
    }
  };

  const { idToGetUserDetails } = useSelector((state) => state.user);

  return (
    <Layout>
      {showTutorProfile ? (
        idToGetUserDetails && (
          <TutorProfile userData={idToGetUserDetails} isEditable={false} />
        )
      ) : showStudentProfile ? (
        idToGetUserDetails && (
          <StudentProfile userData={idToGetUserDetails} isEditable={false} />
        )
      ) : (
        <Row className="gx-3 gy-3">
          <Col lg>
            <ShowSendComfirmationAlert
              showAlert={showAlert}
              hideShowAlert={(e) => hideShowAlertHandle(e)}
              editSessionReq={editSessionReq}
              userData={userData}
            />
            {getSendNotifications?.length > -1 && (
              <ShowAllAlertInDashboard
                userData={userData}
                getSendNotifications={getSendNotifications}
                isTutor={false}
                isStudent={false}
                isParent={true}
              />
            )}
            <Card className="mb-4">
              <CardHeader className="pb-0">
                <Row
                  xs="auto"
                  className="align-items-center justify-content-between"
                >
                  <Col>
                    <h6 className="tetx-base">
                      {t("ParentDashboard.Students")}{" "}
                      <span>({getStudentStatistics?.length})</span>
                    </h6>
                  </Col>
                  <Col>
                    <Button
                      color="outline-dark-blue-c"
                      onClick={() => redirectMyStudentPageHandle()}
                    >
                      {t("ParentDashboard.SeeMyStudents")}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                {getStudentStatistics?.length > -1 && (
                  <StudentStatistics
                    isParent={true}
                    getStudentStatistics={getStudentStatistics}
                    redirectTutorProfileHandle={(e, t) =>
                      redirectTutorProfileHandle(e, t)
                    }
                    getMySchoolLevel={getMySchoolLevel}
                  />
                )}
              </CardBody>
            </Card>
            <Row className="gy-6">
              <Col lg="6" sm="6" xs="12" className="order-lg-1 order-2">
                <Card>
                  <CardBody
                    className="p-4 vstack gap-4 h-lg-calc overflow-auto"
                    style={{ ["--x-h-lg"]: "27.95rem" }}
                  >
                    {getAllcurrentWeekSession?.length > -1 && (
                      <DashboardInShowWeekCalender
                        getAllcurrentWeekSession={getAllcurrentWeekSession}
                        isStudent={false}
                        isParent={true}
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" sm="6" xs="12" className="order-lg-2 order-3">
                <Card>
                  <CardHeader className="px-4 pt-4 pb-2">
                    <p>{t("ParentDashboard.MyTutors")}</p>
                  </CardHeader>
                  <CardBody
                    className="px-4 pb-4 pt-2 vstack gap-4 h-lg-calc overflow-auto"
                    style={{ ["--x-h-lg"]: "30.75rem" }}
                  >
                    {getStudentTutorDetails?.length > -1 && (
                      <TutorCard
                        isParent={true}
                        getStudentTutorDetails={getStudentTutorDetails}
                        handleClickMessageUser={(e, t) =>
                          handleClickMessageUser(e, t)
                        }
                        redirectTutorProfileHandle={(e) =>
                          redirectTutorProfileHandle(e, false)
                        }
                      />
                    )}
                  </CardBody>
                </Card>
              </Col>
              {/* <Col lg="4" xs="12" className="order-lg-3 order-1">
                <Card>
                  <CardHeader className="px-4 pt-4 pb-0">
                    <p>{t("ParentDashboard.Payments")}</p>
                  </CardHeader>
                  <CardBody
                    className="p-4 vstack gap-3 h-lg-calc overflow-auto"
                    style={{ ["--x-h-lg"]: "30.15rem" }}
                  >
                    <Row className="gx-lg-0 gy-4" lg="1" md="3" sm>
                      {paymentsData.map((val, index) => {
                        return (
                          <Col key={index}>
                            <Card className="border">
                              <CardBody className="px-5 pt-3 pb-5">
                                <p className="mb-4">{t(val.label)}</p>
                                <div className="hstack gap-5">
                                  <span
                                    className={`h-50px w-50px rounded-2 flex-none icon-wrapper wrapper-${val.theme}`}
                                  >
                                    <MoneyRecive
                                      size="22"
                                      className="icon-main"
                                    />
                                  </span>
                                  <h2>{val.value}</h2>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </Col>
          <Col lg="auto" className="w-lg-80 ms-lg-auto vstack gap-3 flex-none">
            {roleWiseUserData && (
              <ShowAllTutorMessageList
                allMessage={roleWiseUserData}
                handleClickMessageUser={(e) => handleClickMessageUser(e)}
              />
            )}
            <ContactSS />
          </Col>
        </Row>
      )}
    </Layout>
  );
};

export default ParentDashboard;
