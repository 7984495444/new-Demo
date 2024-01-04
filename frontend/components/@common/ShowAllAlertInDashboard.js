import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  updateDeleteSessionNotification,
  getNotificationsSessionInfoAction,
  readNotificationFromToDoListAction,
} from "@/redux/actions/sendNotificationAction";
import {
  SessionModificationRequestAlert,
  SessionCanceledAlert,
  NotificationModifiedSession,
  DeclineTheMeetingModification,
  SessionCancelledDetailsModal,
  CreateSessionAlert,
  CompletedSessionShowAlert,
  CreateSessionRequest,
  CreateSessionRefuseRequest,
  EvaluationReportAlert,
  UnconfirmedRequestShowAlert,
} from "../index";

const ShowAllAlertInDashboard = ({
  userData,
  getSendNotifications,
  isTutor,
  isStudent,
  isParent,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showModifirdModal, setShowModifirdModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [editSessionInfo, setEditSessionInfo] = useState(null);
  const [deleteSessionInfo, setDeleteSessionInfo] = useState(null);
  const [showdeleteSessionModal, setShowDeleteSessionModal] = useState(false);
  const [showSessionCreateRequest, setShowSessionCreateRequest] =
    useState(false);
  const [sessionCreateRequestInfo, setSessionCreateRequestInfo] =
    useState(null);
  const [showSessionCreateRequestRefuse, setShowSessionCreateRequestRefuse] =
    useState(false);

  useEffect(() => {
    if (editSessionInfo) {
      dispatch(
        getNotificationsSessionInfoAction(editSessionInfo?.edit_session)
      );
    }
  }, [editSessionInfo]);

  const { getNotificationsSessionInfo } = useSelector(
    (state) => state.sendNotification
  );

  // notificaton handle start
  const showModifirdModalHandale = (val, obj) => {
    setEditSessionInfo(obj);
    if (val == true) {
      showRefuseModalHandal();
    }
    setShowModifirdModal(!showModifirdModal);
  };

  const showRefuseModalHandal = (t) => {
    setShowRefuseModal(!showRefuseModal);
    setShowModifirdModal(t);
  };

  const showDeleteModalInfoHandale = (val) => {
    setDeleteSessionInfo(val);
    setShowDeleteSessionModal(!showdeleteSessionModal);
    dispatch(
      updateDeleteSessionNotification(
        val?.sender?.id,
        val?.receiver?.id,
        val?.source_id?.id
      )
    );
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

  return (
    <>
      {getSendNotifications &&
        getSendNotifications?.map((val, index) => {
          const commonProps = {
            data: val,
            isTutor,
            isStudent,
            isParent,
            key: index,
          };

          if (val?.is_read === 0 && val?.is_closed) {
            switch (val?.source_type) {
              case "session_change_request":
                return (
                  <SessionModificationRequestAlert
                    {...commonProps}
                    showModifirdModalHandale={(e, t) =>
                      showModifirdModalHandale(e, t)
                    }
                  />
                );
              case "session_create_request":
                return (
                  <CreateSessionAlert
                    {...commonProps}
                    showCreateSessionRequestHandle={(e, t) =>
                      showCreateSessionRequestHandle(e, t)
                    }
                  />
                );
              case "session_deleted":
                return (
                  <SessionCanceledAlert
                    {...commonProps}
                    showDeleteModalInfoHandale={(e) =>
                      showDeleteModalInfoHandale(e)
                    }
                  />
                );
              case "completed_session":
                return (
                  <CompletedSessionShowAlert
                    {...commonProps}
                    showCompleteModalInfoHandale={(e) =>
                      showCompleteModalInfoHandale(e)
                    }
                  />
                );
              case "tutor_follow_up":
                return (
                  <EvaluationReportAlert
                    {...commonProps}
                    showCompleteModalInfoHandale={(e) =>
                      showCompleteModalInfoHandale(e)
                    }
                  />
                );
              case "unconfirmed_session_reminder":
                return (
                  <UnconfirmedRequestShowAlert
                    {...commonProps}
                    showModifirdModalHandale={(e, t) =>
                      showModifirdModalHandale(e, t)
                    }
                  />
                );
              default:
                return null;
            }
          }
          return null;
        })}
      {showModifirdModal && getNotificationsSessionInfo && (
        <NotificationModifiedSession
          show={showModifirdModal}
          hide={(e, t) => showModifirdModalHandale(e, t)}
          getNotificationsSessionInfo={getNotificationsSessionInfo}
          editSessionInfo={editSessionInfo}
        />
      )}
      {showRefuseModal && (
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
    </>
  );
};

export default ShowAllAlertInDashboard;
