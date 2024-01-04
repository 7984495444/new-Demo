import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarSlider,
  SideBar,
  Header,
  // AddPaymentCardModal,
  ToDoCard,
  TutorCalendarDashboard,
  ShowAllTutorMessageList,
  ShowAllAlertInDashboard,
  TutorToDoList,
  ShowSendComfirmationAlert,
  UserCard,
} from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { getUserByRole } from "@/redux/actions/userAction";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { t } from "i18next";
import { useRouter } from "next/router";
import {
  getAllNotificationsAction,
  sendNotificationsCloseAction,
} from "@/redux/actions/sendNotificationAction";
import { getAllCurrentWeekSessionAction } from "../../../redux/actions/dashbordAction";

const TutorDashboard = ({
  userData,
  getAllToDoList,
  // getAllcurrentWeekSession,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [listOfComponents, setListOfComponents] = useState([]);
  const [showAllComponents, setShowAllComponents] = useState([]);
  const [indexToScroll, setIndexToScroll] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [hideDefaultComponentes, setHideDefaultComponentes] = useState(true);

  useEffect(() => {
    dispatch(getAllNotificationsAction());
    dispatch(getAllCurrentWeekSessionAction());
    // dispatch(getAllTutorSessionAction());
  }, []);

  useEffect(() => {
    dispatch(getUserByRole(0));
  }, []);

  const { getSendNotifications } = useSelector(
    (state) => state.sendNotification
  );
  const { getAllcurrentWeekSession } = useSelector((state) => state.dashboard);
  const { roleWiseUserData } = useSelector((state) => state.user);
  // const { allSession } = useSelector((state) => state.tutor);
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

  const componetSerching = (data, test) => {
    let temp = [];
    data.forEach((element) => {
      if (element.isActive) {
        temp.push(element);
      }
    });
    setShowAllComponents([...temp]);
    setListOfComponents(data);
  };

  const handleClickMessageUser = (item) => {
    router.push({
      pathname: "/messages",
      query: { ...item },
    });
  };

  const showComponents = (index) => {
    if (listOfComponents?.length !== 0) {
      if (showAllComponents?.length === 0) {
        return index === 1 ? true : false;
      } else {
        return listOfComponents[index].isActive;
      }
    } else {
      return index === 1 ? true : false;
    }
  };

  const clickToScroolHandle = (index) => {
    setIndexToScroll(index);
  };

  return (
    <>
      <main className="d-flex flex-column flex-lg-row h-lg-full min-h-screen h-lg-screen bg-light-blue-c">
        <SideBar user={userData} />
        <div className="content-main flex-lg-1 h-lg-screen overflow-y-lg-auto vstack px-lg-4">
          <Header
            componetSerching={(a, e) => componetSerching(a, e)}
            setHideDefaultComponentes={setHideDefaultComponentes}
            role_id={userData?.role_id.id}
          />
          <div className="flex-fill pb-sm-6 pb-20 overlap-10">
            <Container fluid>
              <Row className="gy-lg-0 gy-6">
                <Col xxl="9" xl="8" lg="7">
                  <div className="vstack gap-6">
                    <ShowSendComfirmationAlert
                      showAlert={showAlert}
                      hideShowAlert={(e) => hideShowAlertHandle(e)}
                      editSessionReq={editSessionReq}
                      userData={userData}
                    />
                    {getSendNotifications &&
                      getSendNotifications?.length > -1 && (
                        <ShowAllAlertInDashboard
                          userData={userData}
                          getSendNotifications={getSendNotifications}
                          isTutor={true}
                          isStudent={false}
                          isParent={false}
                        />
                      )}
                    {showComponents(1) &&
                      getAllcurrentWeekSession?.length > -1 && (
                        <CalendarSlider
                          getAllcurrentWeekSession={getAllcurrentWeekSession}
                          clickToScroolHandle={(e) => clickToScroolHandle(e)}
                        />
                      )}
                    {showComponents(1) &&
                      getAllcurrentWeekSession?.length > -1 && (
                        <TutorCalendarDashboard
                          userData={userData}
                          getAllcurrentWeekSession={getAllcurrentWeekSession}
                          indexToScroll={indexToScroll}
                        />
                      )}
                    {showComponents(2) && (
                      <Card>
                        <CardHeader className="pb-4">
                          <Row className="gy-2 justify-content-between">
                            <Col xs="auto">
                              <h6>{t("TutorDeshbord.Todo")}</h6>
                            </Col>
                            <Col xs="auto" className="text-end">
                              <Link className="link-secondary" href="">
                                {t("TutorDeshbord.Recents")}
                              </Link>
                            </Col>
                          </Row>
                        </CardHeader>
                        <CardBody className="pt-4">
                          <Row className="gy-6">
                            {getAllToDoList &&
                              getAllToDoList?.map((val, index) => {
                                return (
                                  <Col
                                    xxl="4"
                                    xl="4"
                                    lg="6"
                                    md="4"
                                    sm="6"
                                    xs="12"
                                    className="col-3xl-3"
                                    key={index}
                                  >
                                    <ToDoCard val={val} />
                                  </Col>
                                );
                              })}
                            {/* {Array.from({ length: 7 }).map((_, idx) => (
                              <Col
                                xxl="4"
                                xl="4"
                                lg="6"
                                md="4"
                                sm="6"
                                xs="12"
                                className="col-3xl-3"
                                key={idx}
                              >
                                <ToDoCard />
                              </Col>
                            ))} */}
                          </Row>
                        </CardBody>
                      </Card>
                    )}
                    {showComponents(0) && (
                      <Card>
                        <CardHeader className="pb-2">
                          <h6>{t("Sidebar.User")}</h6>
                        </CardHeader>
                        <CardBody className="pt-2">
                          <Row className="gy-6">
                            {Array.from({ length: 7 }).map((_, idx) => (
                              <Col
                                xxl="4"
                                xl="4"
                                lg="6"
                                md="4"
                                sm="6"
                                xs="12"
                                className="col-3xl-3"
                                key={idx}
                              >
                                <UserCard />
                              </Col>
                            ))}
                          </Row>
                        </CardBody>
                      </Card>
                    )}
                  </div>
                </Col>
                <Col xxl="3" xl="4" lg="5">
                  {hideDefaultComponentes && (
                    <>
                      {getAllToDoList?.length > -1 && (
                        <TutorToDoList getAllToDoList={getAllToDoList} />
                      )}
                      <ShowAllTutorMessageList
                        allMessage={roleWiseUserData}
                        handleClickMessageUser={(e) =>
                          handleClickMessageUser(e)
                        }
                      />
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </main>
    </>
  );
};

export default TutorDashboard;
