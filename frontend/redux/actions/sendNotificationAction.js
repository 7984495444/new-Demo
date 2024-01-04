import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// send notification action
export const sendNotificationsAction = (field, isEdit) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/notification`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        if (isEdit) {
          dispatch({
            type: types.SEND_SESSION_NOTIFICATION_SUCCESS,
            payload: result.data,
          });
        } else {
          dispatch({
            type: types.SEND_ALERT_SESSION_NOTIFICATION_SUCCESS,
            payload: result.data,
          });
        }
        dispatch(getAllNotificationsAction());
      })
      .catch((error) => {
        dispatch({
          type: types.SEND_SESSION_NOTIFICATION_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.SEND_SESSION_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// send notification action
export const sendNotificationsCloseAction = () => async (dispatch) => {
  try {
    dispatch({
      type: types.SEND_SESSION_NOTIFICATION_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: types.SEND_SESSION_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get notifications
export const getAllNotificationsAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_SESSION_NOTIFICATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_SESSION_NOTIFICATION_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_SESSION_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get notifications edit info
export const getNotificationsSessionInfoAction = (id) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/session-edit/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_NOTIFICATION_SESSION_INFO_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_NOTIFICATION_SESSION_INFO_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_NOTIFICATION_SESSION_INFO_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get notifications edit info
export const updateRefuserSessionInfoAction =
  (id, field, sendNotificationField, source_type) => async (dispatch) => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/cancle-session/${id}?source_type=${source_type}`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          if (result?.data) {
            let field = {
              ...sendNotificationField,
              edit_session: result?.data,
            };
            dispatch(sendNotificationsAction(field));
          }
          dispatch({
            type: types.UPDATE_REFUSER_SESSION_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.UPDATE_REFUSER_SESSION_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.UPDATE_REFUSER_SESSION_ERROR,
        payload: error.response.data.message,
      });
    }
  };

//update delete session notification status read
export const updateDeleteSessionNotification =
  (sender_id, receiver_id, source_id) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/delete/session?sender_id=${sender_id}&receiver_id=${receiver_id}&source_id=${source_id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch(getAllNotificationsAction());
          dispatch({
            type: types.EDIT_DELETE_SESSION_INFO_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.EDIT_DELETE_SESSION_INFO_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.EDIT_DELETE_SESSION_INFO_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// close alert
export const alertCloseAction =
  (sender_id, receiver_id, source_id) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/alert/closed?sender_id=${sender_id}&receiver_id=${receiver_id}&source_id=${source_id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch(getAllNotificationsAction());
          dispatch({
            type: types.CLOSE_ALERT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.CLOSE_ALERT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.CLOSE_ALERT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// read notification using notification id / close
export const readNotificationAction =
  (notification_id, field) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/evaluation/${notification_id}`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch(getAllNotificationsAction());
          dispatch({
            type: types.CLOSE_ALERT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.CLOSE_ALERT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.CLOSE_ALERT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// read send request
export const readSendRequestAction = (draft_id, field) => async (dispatch) => {
  try {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/session-draft/${draft_id}`,
        field,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch(getAllNotificationsAction());
        dispatch({
          type: types.READ_SEND_REQUEST_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.READ_SEND_REQUEST_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.READ_SEND_REQUEST_ERROR,
      payload: error.response.data.message,
    });
  }
};

// read notification from todo list
export const readNotificationFromToDoListAction =
  (session_id, todo_type) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/todos/${session_id}/${todo_type} `,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.READ_SEND_NOTIFICATION_TO_DO_LIST_ERROR,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.READ_SEND_NOTIFICATION_TO_DO_LIST_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.READ_TO_DO_LIST_FROM_NOTIFICATIONS_ERROR,
        payload: error.response.data.message,
      });
    }
  };
