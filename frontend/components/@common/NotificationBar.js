import moment from "moment";
import { useRouter } from "next/router";
import { ArrowRight, Notification } from "iconsax-react";
import { MdClose } from "react-icons/md";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import {
  CompleteSessionModal,
  CreateSessionRefuseRequest,
  CreateSessionRequest,
  DeclineTheMeetingModification,
  NotificationModifiedSession,
  SessionCancelledDetailsModal,
  ShowCreateSessionAcceptRequestDetails,
  ShowCreateSessionRefuseRequestDetails,
  ShowDeclineTheMeetingModificationDetais,
  ShowImage,
  ShowModificationAcceptRequestDetails,
  showTimeHandal,
} from "../index";
import {
  getNotificationsSessionInfoAction,
  readNotificationAction,
  readNotificationFromToDoListAction,
  updateDeleteSessionNotification,
} from "@/redux/actions/sendNotificationAction";

function NotificationBar({ userData, isShow, isClose, getSendNotifications }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showModifirdModal, setShowModifirdModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [editSessionInfo, setEditSessionInfo] = useState(null);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState(null);
  const [showdeleteSessionModal, setShowDeleteSessionModal] = useState(false);
  const [showOnlySessionRefuase, setShowOnlySessionRefuase] = useState(false);
  const [showOnlySessionRefuaseInfo, setShowOnlySessionRefuaseInfo] =
    useState(null);
  const [showSessionCreateRequest, setShowSessionCreateRequest] =
    useState(false);
  const [sessionCreateRequestInfo, setSessionCreateRequestInfo] =
    useState(null);
  const [showSessionCreateRequestRefuse, setShowSessionCreateRequestRefuse] =
    useState(false);
  const [
    showCreateSessionRequestAcceptModale,
    setShowCreateSessionRequestAcceptModale,
  ] = useState(false);
  const [
    showCreateSessionRequestAcceptInfo,
    setShowCreateSessionRequestAcceptInfo,
  ] = useState(null);
  const [
    showCreateSessionRequestCancelModale,
    setShowCreateSessionRequestCancelModale,
  ] = useState(false);
  const [
    showCreateSessionRequestCancelInfo,
    setShowCreateSessionRequestCancelInfo,
  ] = useState(null);
  const [showSessionCompleteModalBtn, setShowSessionCompleteModalBtn] =
    useState(false);
  const [complateSessionData, setComplateSessionData] = useState();
  const [
    showEditSessionRequestAcceptModale,
    setShowEditSessionRequestAcceptModale,
  ] = useState(false);

  const notificationHistoryDate = new Set();
  const todaysDate = moment().format();

  useEffect(() => {
    if (editSessionInfo?.edit_session) {
      dispatch(
        getNotificationsSessionInfoAction(editSessionInfo?.edit_session)
      );
    }
  }, [editSessionInfo, showOnlySessionRefuaseInfo]);

  const { getNotificationsSessionInfo } = useSelector(
    (state) => state.sendNotification
  );

  // render date in notification screen
  let dateToBeShown = "";
  const renderDate = (date) => {
    // Add to Set so it does not render again
    notificationHistoryDate.add(moment(date).format("DD/MM/YYYY"));
    if (
      moment(todaysDate).diff(date, "days") === 0 &&
      dateToBeShown !== "Aujourd’hui"
    ) {
      dateToBeShown = "Aujourd’hui";
      return (
        <span className="text-light-blue-a px-6 d-block">
          {t("NotificationBar.ToDay")}
        </span>
      );
    } else if (
      moment(todaysDate).diff(date, "days") !== 0 &&
      moment(todaysDate).diff(date, "week") === 0 &&
      dateToBeShown !== "this week"
    ) {
      //1
      dateToBeShown = "this week";
      return (
        <span className="text-light-blue-a px-6 d-block">
          {t("NotificationBar.ThisWeek")}
        </span>
      );
    } else if (
      moment(todaysDate).diff(date, "week") !== 0 &&
      moment(todaysDate).diff(date, "month") === 0 &&
      dateToBeShown !== "this month"
    ) {
      //> 1
      dateToBeShown = "this month";
      return (
        <span className="text-light-blue-a px-6 d-block">
          {t("NotificationBar.ThisMonth")}
        </span>
      );
    } else if (
      moment(todaysDate).diff(date, "month") > 0 &&
      dateToBeShown !== "older"
    ) {
      dateToBeShown = "older";
      return (
        <span className="text-light-blue-a px-6 d-block">
          {t("NotificationBar.Older")}
        </span>
      );
    }

    // return (
    //   <span className="text-light-blue-a px-6 d-block">
    //     {dateToBeShown},{date}
    //   </span>
    // );
  };

  // show modificatoin open modal ( accept and refuse button)
  const showModifirdModalHandale = (val, obj) => {
    setEditSessionInfo(obj);
    if (val == true) {
      showRefuseModalHandal();
    }
    setShowModifirdModal(!showModifirdModal);
  };

  // show refuase modal send
  const showRefuseModalHandal = (t) => {
    setShowRefuseModal(!showRefuseModal);
    setShowModifirdModal(t);
  };

  const showDeleteModalInfoHandale = (val, type) => {
    setDeleteSessionInfo(val);
    setShowDeleteSessionModal(!showdeleteSessionModal);
    if (type) {
      dispatch(
        updateDeleteSessionNotification(
          val?.sender?.id,
          val?.receiver?.id,
          val?.source_id?.id
        )
      );
    }
  };

  const redirectEvlucationPageHandle = (val) => {
    router.push("./evaluations");
    let field = {
      is_read: 1,
    };
    dispatch(readNotificationAction(val?.id, field));
  };

  // show session refuse modal details
  const showOnlySessionRefuaseDetails = (val, type) => {
    setEditSessionInfo(val);
    setShowOnlySessionRefuase(!showOnlySessionRefuase);
    setShowOnlySessionRefuaseInfo(val);
    if (type && val?.is_read === 0) {
      dispatch(
        updateDeleteSessionNotification(
          val?.sender?.id,
          val?.receiver?.id,
          val?.source_id?.id
        )
      );
    }
  };

  const showCompleteModalInfoHandale = (val) => {
    router.push(
      {
        pathname: "/programs",
        query: {
          complatedId: val?.source_id?.complete_session_id,
          isComplated: true,
          toDoListId: val?.id,
          // read notification id
          // sender:
        },
      },
      "/programs"
    );
    dispatch(
      updateDeleteSessionNotification(
        val?.sender?.id,
        val?.receiver?.id,
        val?.source_id?.id
      )
    );
    dispatch(readNotificationFromToDoListAction(val?.source_id?.id, 2));
  };

  const showCreateSessionRequestHandle = (obj, val) => {
    setSessionCreateRequestInfo(val);
    setEditSessionInfo(val);
    if (obj == true) {
      showCreateSessionRequesRefusetHandle();
    }
    setShowSessionCreateRequest(!showSessionCreateRequest);
  };

  const showCreateSessionRequesRefusetHandle = (t) => {
    setShowSessionCreateRequestRefuse(!showSessionCreateRequestRefuse);
    setShowSessionCreateRequest(t);
  };

  const showCreateSessionRequestAcceptHandle = (val, type) => {
    setEditSessionInfo(val);
    // setShowCreateSessionRequestAcceptInfo(val);
    setShowCreateSessionRequestAcceptModale(
      !showCreateSessionRequestAcceptModale
    );
    if (type) {
      let field = {
        is_read: 1,
      };
      dispatch(readNotificationAction(val?.id, field));
    }

    // dispatch(
    //   updateDeleteSessionNotification(
    //     val?.sender?.id,
    //     val?.receiver?.id,
    //     val?.source_id?.id
    //   )
    // );
  };

  const showCreateSessionRequestCancelHandle = (val, type) => {
    setEditSessionInfo(val);
    setShowCreateSessionRequestCancelInfo(val);
    setShowCreateSessionRequestCancelModale(
      !showCreateSessionRequestCancelModale
    );
    if (type) {
      let field = {
        is_read: 1,
      };
      dispatch(readNotificationAction(val?.id, field));
    }
  };

  const redirectStudentParentReport = (val) => {
    router.push(
      {
        pathname: "/student-parent-evaluations",
        query: {
          tutor: val?.sender?.id,
          student: val?.receiver?.id,
          subject: val?.source_id?.session_subject_id?.id,
          // subject: getSessionIdToToDoList?.subject?.id,====
          tutor_name: val?.sender?.first_name,
          tutor_last_name: val?.sender?.last_name,
          session: val?.source_id?.id,
          toDoListId: val?.to_do?.id,
          // toDoListId: getSessionIdToToDoList?.id, ====
          isParent: false,
        },
      },
      "/student-parent-evaluations"
    );
  };

  const redirectStudentEvlucationPage = (val) => {
    let item = {
      student_id: val?.source_id?.student?.id,
      subject_id: val?.source_id?.session_subject_id?.id,
      student_first_name: val?.source_id?.student?.first_name,
      student_last_name: val?.source_id?.student?.last_name,
      student_parent_id: val?.to_do?.student?.parent_id,
      notificationId: val?.id,
      toDoListId: val?.to_do?.id,
    };
    router.push({
      pathname: "/student",
      query: { ...item, isTutorFollow: true },
    });
  };

  const redirectForTutorEvalutionPageHandle = (val) => {
    router.push(
      {
        pathname: "/student-parent-evaluations",
        query: {
          tutor: val?.sender?.id,
          student: val?.receiver?.id,
          parent: userData?.id,
          subject: val?.source_id?.session_subject_id?.id,
          tutor_name: val?.sender?.first_name,
          tutor_last_name: val?.sender?.last_name,
          session: val?.source_id?.id,
          toDoListId: val?.to_do?.id,
          isParent: true,
        },
      },
      "/student-parent-evaluations"
    );
  };

  const showSessionCompleteModalHandal = (val, type) => {
    setComplateSessionData({
      complete_session_id: false,
      id: val?.source_id?.id,
      name: `${val?.source_id?.student?.first_name}  ${val?.source_id?.student?.last_name}`,
      session_time: val?.source_id?.session_time,
      session_duration: val?.source_id?.session_duration,
      start: val?.source_id?.session_date,
      profile_image: val?.source_id?.student?.profile_image,
      subject: val?.session_subject_id?.subject_name,
      end: val?.source_id?.session_date,
      subject_id: val?.session_subject_id?.id,
      student_id: val?.source_id?.student?.id,
    });
    if (type) {
      dispatch(readNotificationFromToDoListAction(val?.source_id?.id, 1));
      let field = {
        is_read: 1,
      };
      dispatch(readNotificationAction(val?.id, field));
    }
    setShowSessionCompleteModalBtn(!showSessionCompleteModalBtn);
  };

  const showEditSessionRequestAcceptHandle = (val, type) => {
    setEditSessionInfo(val);
    setShowCreateSessionRequestAcceptInfo(val);
    setShowEditSessionRequestAcceptModale(!showEditSessionRequestAcceptModale);
    if (type) {
      let field = {
        is_read: 1,
      };
      dispatch(readNotificationAction(val?.id, field));
    }
  };

  const allSeeDetailsHandle = (val) => {
    switch (val?.source_type) {
      case "session_change_request":
      case "unconfirmed_session_reminder":
        showModifirdModalHandale(null, val);
        break;

      case "update_session":
        showEditSessionRequestAcceptHandle(val, true);
        break;

      case "session_create_request":
        showCreateSessionRequestHandle(null, val);
        break;

      case "session_create_request_accept":
        showCreateSessionRequestAcceptHandle(val, true);
        break;

      case "session_create_request_cancel":
        showCreateSessionRequestCancelHandle(val, true);
        break;

      case "session_deleted":
        showDeleteModalInfoHandale(val, true);
        break;

      case "student_parent_create_evaluation_for_tutor":
      case "tutor_create_evaluation_for_student":
        redirectEvlucationPageHandle(val);
        break;

      case "refuser_session":
        showOnlySessionRefuaseDetails(val, true);
        break;

      case "completed_session":
        showCompleteModalInfoHandale(val);
        break;

      case "student_follow_up":
        redirectStudentParentReport(val, true);
        break;

      case "tutor_follow_up":
        redirectStudentEvlucationPage(val, false);
        break;

      case "parent_follow_up":
        redirectForTutorEvalutionPageHandle(val);
        break;

      case "tutor_add_session_summary":
        showSessionCompleteModalHandal(val, true);
        break;

      default:
      // Default case or handle unknown source_type
    }
  };

  return (
    <>
      <Offcanvas
        className="rounded-top-start-2 notification-bar top-lg-24"
        direction="end"
        scrollable
        fade={true}
        isOpen={isShow}
      >
        <OffcanvasHeader tag="div" className="d-block">
          <Row className="gx-0">
            <Col xs="11">
              <Notification style={{ marginRight: "14px" }} size="20" />
              <span>{t("NotificationBar.Notification")}</span>
            </Col>
            <Col xs="1" className="hstack justify-content-end">
              <Button
                color="none"
                className="text-light-blue-a p-0 border-0 shadow-none"
                onClick={() => isClose()}
              >
                <MdClose />
              </Button>
            </Col>
          </Row>
        </OffcanvasHeader>

        <OffcanvasBody
          className="vstack gap-4 pt-0 px-0 h-lg-calc h-calc"
          style={{ ["--x-h-lg"]: "96px", ["--x-h"]: "64px" }}
        >
          <div className="main-block">
            {getSendNotifications?.map((val, index) => {
              return (
                <div key={index}>
                  {/* showing notification date */}
                  {notificationHistoryDate.has(
                    moment(val?.created_at).format("DD/MM/YYYY")
                  )
                    ? null
                    : renderDate(val?.created_at)}

                  <ul className="list-group">
                    <li
                      className={`notification-single ${
                        val?.is_read === 0 && "active"
                      }`}
                      // active
                      key={index}
                    >
                      <Row className="gx-0 pt-4">
                        <Col xs="12">
                          <p className="notification-title">
                            {t(val.message_fr)}
                          </p>
                        </Col>
                        <Col xs="12" className="pt-1">
                          <ShowImage
                            className="avatar avatar-xs rounded-circle bg-light-blue-a me-1"
                            imageName={
                              val?.source_type === "tutor_follow_up" ||
                              val?.source_type === "tutor_add_session_summary"
                                ? val?.source_id?.student?.profile_image
                                : val?.sender?.profile_image
                            }
                            width={68}
                            height={68}
                          />
                          <span className="text-light-blue-a notification-username">
                            {val?.source_type === "tutor_follow_up" ||
                            val?.source_type === "tutor_add_session_summary"
                              ? `${val?.source_id?.student?.first_name} ${val?.source_id?.student?.last_name}`
                              : `${val?.sender?.first_name} ${val?.sender?.last_name}`}
                          </span>
                        </Col>
                        <Col
                          xs="12"
                          className="pt-2 pb-4 hstack justify-content-between notification-bottom"
                        >
                          <span className="notification-time">
                            {showTimeHandal(val?.created_at)}
                          </span>
                          <div
                            className="link-primary text-xs"
                            onClick={() => allSeeDetailsHandle(val)}
                          >
                            <span className="text-underline me-1">
                              {t("NotificationBar.Consult")}
                            </span>
                            <ArrowRight size="16" />
                          </div>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          {/* <div className="main-block">
            <span className="text-light-blue-a px-6 d-block">
              {t("NotificationBar.ToDay")}
            </span>
            <ul className="list-group">
              {getSendNotifications?.map((val, index) => {
                let time = moment(val?.created_at)
                  .startOf("hour")
                  .fromNow()
                  .toString()
                  .split(" ");
                return (
                  moment(val?.created_at).format("DD/MM/YYYY") ===
                    moment().format("DD/MM/YYYY") && (
                    <li
                      className="notification-single active"
                      active
                      key={index}
                    >
                      <Row className="gx-0 pt-4">
                        <Col xs="12">
                          <p className="notification-title">{val.message_fr}</p>
                        </Col>
                        <Col xs="12" className="pt-1">
                          <Image
                            className="avatar avatar-xs rounded-circle bg-light-blue-a me-1"
                            src={UserPlaceholderB}
                            alt="User Image"
                          />
                          <span className="text-light-blue-a notification-username">
                            {val?.sender?.first_name} {val?.sender?.last_name}
                          </span>
                        </Col>
                        <Col
                          xs="12"
                          className="pt-2 pb-4 hstack justify-content-between notification-bottom"
                        >
                          <span className="notification-time">
                            {time[0] === "an" ? 1 : time[0]}
                            {time[1].slice(0, 1)}
                          </span>
                          {val?.source_type === "session_change_request" && (
                            <div
                              className="link-primary text-xs"
                              onClick={() =>
                                showModifirdModalHandale(null, val)
                              }
                            >
                              <span className="text-underline me-1">
                                Consulter
                              </span>
                              <ArrowRight size="16" />
                            </div>
                          )}
                          {val?.source_type === "session_delete_request" && (
                            <>
                              <Button
                                color="dark-blue-c"
                                onClick={() => {
                                  setEditSessionInfo(val);
                                }}
                              >
                                Annuler
                              </Button>
                              <Button
                                color="orange"
                                onClick={() => {
                                  setEditSessionInfo(val);
                                  setTimeout(() => {
                                    sessionDeleteHandal(val);
                                  }, 5000);
                                }}
                              >
                                accepter
                              </Button>
                            </>
                          )}
                        </Col>
                      </Row>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <div className="main-block">
            <span className="text-light-blue-a px-6 d-block">
              {t("NotificationBar.ThisWeek")}
            </span>
            {getSendNotifications?.map((val, index) => {
              let time = moment(val?.created_at)
                .startOf("hour")
                .fromNow()
                .toString()
                .split(" ");
              return (
                moment(val?.created_at).isSame(new Date(), "week") &&
                moment(val?.created_at).format("DD/MM/YYYY") !==
                  moment().format("DD/MM/YYYY") && (
                  <li className="notification-single" active key={index}>
                    <Row className="gx-0 pt-4">
                      <Col xs="12">
                        <p className="notification-title">{val.message_fr}</p>
                      </Col>
                      <Col xs="12" className="pt-1">
                        <Image
                          className="avatar avatar-xs rounded-circle bg-light-blue-a me-1"
                          src={UserPlaceholderB}
                          alt="User Image"
                        />
                        <span className="text-light-blue-a notification-username">
                          {val?.sender?.first_name} {val?.sender?.last_name}
                        </span>
                      </Col>
                      <Col
                        xs="12"
                        className="pt-2 pb-4 hstack justify-content-between notification-bottom"
                      >
                        <span className="notification-time">
                          {time[0] === "an" ? 1 : time[0]}
                          {time[1].slice(0, 1)}
                        </span>
                        {val?.source_type === "session_change_request" && (
                          <div
                            className="link-primary text-xs"
                            onClick={() => showModifirdModalHandale(null, val)}
                          >
                            <span className="text-underline me-1">
                              Consulter
                            </span>
                            <ArrowRight size="16" />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </li>
                )
              );
            })}
          </div>
          <div className="main-block">
            <span className="text-light-blue-a px-6 d-block">
              return (
        <span className="text-light-blue-a px-6 d-block">
            {t("NotificationBar.ThisWeek")}
        </span>
      )
            </span>
            <ul className="list-group">
              {getSendNotifications?.map((val, index) => {
                let time = moment(val?.created_at)
                  .startOf("hour")
                  .fromNow()
                  .toString()
                  .split(" ");
                return (
                  moment(val?.created_at).isSame(new Date(), "month") && (
                    <li className="notification-single" key={index}>
                      <Row className="gx-0 pt-4">
                        <Col xs="12">
                          <p className="notification-title">{val.message_fr}</p>
                        </Col>
                        <Col xs="12" className="pt-1">
                          <Image
                            className="avatar avatar-xs rounded-circle bg-light-blue-a me-1"
                            src={UserPlaceholderB}
                            alt="User Image"
                          />
                          <span className="text-light-blue-a notification-username">
                            {val?.sender?.first_name} {val?.sender?.last_name}
                          </span>
                        </Col>
                        <Col
                          xs="12"
                          className="pt-2 pb-4 hstack justify-content-between notification-bottom"
                        >
                          <span className="notification-time">
                            {time[0] === "an" ? 1 : time[0]}
                            {time[1].slice(0, 1)}
                          </span>
                          {val?.source_type === "session_change_request" && (
                            <div
                              className="link-primary text-xs"
                              onClick={() =>
                                showModifirdModalHandale(null, val)
                              }
                            >
                              <span className="text-underline me-1">
                                Consulter
                              </span>
                              <ArrowRight size="16" />
                            </div>
                          )}
                        </Col>
                      </Row>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <div className="main-block">
            <span className="text-light-blue-a px-6 d-block">
              {t("NotificationBar.Older")}
            </span>
            <ul className="list-group">
              {getSendNotifications?.map((val, index) => {
                let time = moment(val?.created_at)
                  .startOf("hour")
                  .fromNow()
                  .toString()
                  .split(" ");
                return (
                  <li className="notification-single" key={index}>
                    <Row className="gx-0 pt-4">
                      <Col xs="12">
                        <p className="notification-title">{val.message_fr}</p>
                      </Col>
                      <Col xs="12" className="pt-1">
                        <Image
                          className="avatar avatar-xs rounded-circle bg-light-blue-a me-1"
                          src={UserPlaceholderB}
                          alt="User Image"
                        />
                        <span className="text-light-blue-a notification-username">
                          {val?.sender?.first_name} {val?.sender?.last_name}
                        </span>
                      </Col>
                      <Col
                        xs="12"
                        className="pt-2 pb-4 hstack justify-content-between notification-bottom"
                      >
                        <span className="notification-time">
                          {time[0] === "an" ? 1 : time[0]}
                          {time[1].slice(0, 1)}
                        </span>
                        {val?.source_type === "session_change_request" && (
                          <div
                            className="link-primary text-xs"
                            onClick={() => showModifirdModalHandale(null, val)}
                          >
                            <span className="text-underline me-1">
                              Consulter
                            </span>
                            <ArrowRight size="16" />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </li>
                );
              })}
            </ul>
          </div> */}
        </OffcanvasBody>
      </Offcanvas>
      {showModifirdModal && getNotificationsSessionInfo && (
        <NotificationModifiedSession
          show={showModifirdModal}
          hide={(e, t) => showModifirdModalHandale(e, t)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          editSessionInfo={editSessionInfo}
        />
      )}
      {showRefuseModal && getNotificationsSessionInfo && (
        <DeclineTheMeetingModification
          show={showRefuseModal}
          hide={(t) => showRefuseModalHandal(t)}
          editSessionInfo={editSessionInfo}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
        />
      )}
      {showdeleteSessionModal && (
        <SessionCancelledDetailsModal
          show={showdeleteSessionModal}
          hide={() => showDeleteModalInfoHandale()}
          deleteSessionInfo={deleteSessionInfo}
          userData={userData}
        />
      )}
      {showOnlySessionRefuase && getNotificationsSessionInfo && (
        <ShowDeclineTheMeetingModificationDetais
          show={showOnlySessionRefuase}
          hide={() => showOnlySessionRefuaseDetails()}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          showOnlySessionRefuaseInfo={showOnlySessionRefuaseInfo}
        />
      )}
      {showSessionCreateRequest && (
        <CreateSessionRequest
          show={showSessionCreateRequest}
          hide={(e, t) => showCreateSessionRequestHandle(e, t)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          sessionCreateRequestInfo={sessionCreateRequestInfo}
          // deleteSessionInfo={deleteSessionInfo}
          // userData={userData}
        />
      )}
      {showSessionCreateRequestRefuse && (
        <CreateSessionRefuseRequest
          show={showSessionCreateRequestRefuse}
          hide={(e) => showCreateSessionRequesRefusetHandle(e)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          sessionCreateRequestInfo={sessionCreateRequestInfo}
          // deleteSessionInfo={deleteSessionInfo}
          // userData={userData}
        />
      )}
      {showCreateSessionRequestAcceptModale && (
        <ShowCreateSessionAcceptRequestDetails
          show={showCreateSessionRequestAcceptModale}
          hide={(e) => showCreateSessionRequestAcceptHandle(e)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          // showCreateSessionRequestAcceptInfo={
          //   showCreateSessionRequestAcceptInfo
          // }
        />
      )}
      {showCreateSessionRequestCancelModale && (
        <ShowCreateSessionRefuseRequestDetails
          show={showCreateSessionRequestCancelModale}
          hide={(e) => showCreateSessionRequestCancelHandle(e)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          showCreateSessionRequestCancelInfo={
            showCreateSessionRequestCancelInfo
          }
        />
      )}
      {showSessionCompleteModalBtn && (
        <CompleteSessionModal
          type={false}
          show={showSessionCompleteModalBtn}
          hide={() => showSessionCompleteModalHandal()}
          sessionInfo={complateSessionData}
        />
      )}
      {showSessionCompleteModalBtn && (
        <CompleteSessionModal
          type={false}
          show={showSessionCompleteModalBtn}
          hide={() => showSessionCompleteModalHandal()}
          sessionInfo={complateSessionData}
        />
      )}
      {showEditSessionRequestAcceptModale && (
        <ShowModificationAcceptRequestDetails
          show={showEditSessionRequestAcceptModale}
          hide={(e) => showEditSessionRequestAcceptHandle(e)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          showCreateSessionRequestAcceptInfo={
            showCreateSessionRequestAcceptInfo
          }
          // showCreateSessionRequestAcceptInfo={
          //   showCreateSessionRequestAcceptInfo
          // }
        />
      )}
    </>
  );
}
export default NotificationBar;
