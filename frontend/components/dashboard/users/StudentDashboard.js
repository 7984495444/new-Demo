import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import {
  ContactSS,
  DashboardInShowWeekCalender,
  Layout,
  ShowAllAlertInDashboard,
  ShowAllTutorMessageList,
  ShowSendComfirmationAlert,
  StudentStatistics,
  StudentToDoList,
  TutorCard,
  TutorProfile,
} from "@/components";
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
  getAllCurrentWeekSessionAction,
  getstudentStatisticsAction,
  getstudentTutorDeatisAction,
} from "@/redux/actions/dashbordAction";
import { getMySchoolLevels } from "@/redux/actions/schoolLevelAction";

const StudentDashboard = ({
  userData,
  getAllcurrentWeekSession,
  getAllToDoList,
  getMySchoolLevel,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showTutorProfile, setShowTutorProfile] = useState(false); // show tutor profile
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllNotificationsAction());
    dispatch(getUserByRole(0));
    dispatch(getstudentTutorDeatisAction());
    dispatch(getstudentStatisticsAction());
  }, []);

  const { roleWiseUserData } = useSelector((state) => state.user);
  const { getSendNotifications } = useSelector(
    (state) => state.sendNotification
  );
  const { getStudentTutorDetails, getStudentStatistics } = useSelector(
    (state) => state.dashboard
  );
  const { editSessionReq } = useSelector((state) => state.tutor);
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

  // show tutor profile
  const redirectTutorProfileHandle = (val) => {
    dispatch(idToGetUserDetailsAction(val?.tutor_id));
    setShowTutorProfile(!showTutorProfile);
  };

  const { idToGetUserDetails } = useSelector((state) => state.user);

  const complateSessionHistoryHandle = (val) => {
    router.push(
      {
        pathname: "/programs",
        query: {
          complatedId: val?.session?.complete_session_id,
          isComplated: true,
          toDoListId: val?.id,
          // read notification id
          // sender:
        },
      },
      "/programs"
    );
  };

  // const con
  return (
    <Layout>
      {showTutorProfile ? (
        idToGetUserDetails && (
          <TutorProfile userData={idToGetUserDetails} isEditable={false} />
        )
      ) : (
        <>
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
              isStudent={true}
              isParent={false}
            />
          )}
          <Row className="gx-3 gy-3">
            <Col xl>
              <Card className="mb-4">
                <CardHeader className="pb-0">
                  <p>{t("StudentDashboard.IndividualStatistics")}</p>
                </CardHeader>
                <CardBody className="pt-0 pb-0">
                  {getStudentStatistics?.length > -1 && (
                    <StudentStatistics
                      isParent={false}
                      getStudentStatistics={getStudentStatistics}
                      getMySchoolLevel={getMySchoolLevel}
                    />
                  )}
                </CardBody>
              </Card>
              <Row className="gy-lg-6 gy-4">
                <Col lg="4" sm="6" xs="12">
                  <Card>
                    <CardBody
                      className="p-4 h-lg-calc overflow-auto"
                      style={{ ["--x-h-lg"]: "336px" }}
                    >
                      {getAllcurrentWeekSession?.length > -1 && (
                        <DashboardInShowWeekCalender
                          getAllcurrentWeekSession={getAllcurrentWeekSession}
                          isStudent={true}
                          isParent={false}
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" sm="6" xs="12">
                  <Card>
                    <CardHeader className="px-4 pt-4 pb-2">
                      <p>{t("StudentDashboard.MyTutors")}</p>
                    </CardHeader>
                    <CardBody
                      className="px-4 pb-4 pt-2 vstack gap-4 h-lg-calc overflow-auto"
                      style={{ ["--x-h-lg"]: "380px" }}
                    >
                      {getStudentTutorDetails?.length > -1 && (
                        <TutorCard
                          isParent={false}
                          getStudentTutorDetails={getStudentTutorDetails}
                          handleClickMessageUser={(e, t) =>
                            handleClickMessageUser(e, t)
                          }
                          redirectTutorProfileHandle={(e) =>
                            redirectTutorProfileHandle(e)
                          }
                        />
                      )}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4" xs="12">
                  {getAllToDoList?.length > -1 && (
                    <StudentToDoList
                      getAllToDoList={getAllToDoList}
                      complateSessionHistoryHandle={(e) =>
                        complateSessionHistoryHandle(e)
                      }
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col
              xl="auto"
              className="w-xl-80 ms-xl-auto vstack gap-3 flex-none"
            >
              {roleWiseUserData && (
                <ShowAllTutorMessageList
                  allMessage={roleWiseUserData}
                  handleClickMessageUser={(e) => handleClickMessageUser(e)}
                />
              )}
              <ContactSS />
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default StudentDashboard;
