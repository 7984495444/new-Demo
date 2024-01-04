import axios from "axios";
import * as types from "../actionTypes";

export const studentGetTutorSessionDetailsAction =
  (filed) => async (dispatch) => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          dispatch({
            type: types.GET_STUDENT_IN_TUTOR_SESSION_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_STUDENT_IN_TUTOR_SESSION_DETAILS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_STUDENT_IN_TUTOR_SESSION_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// add end session lessonspace
export const addSessionEndAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_LESSIN_SPACE_SESSION_END_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_LESSIN_SPACE_SESSION_END_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_LESSIN_SPACE_SESSION_END_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get end session lessonspace
export const getSessionEndAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_LESSIN_SPACE_SESSION_END_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_LESSIN_SPACE_SESSION_END_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_LESSIN_SPACE_SESSION_END_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get student tutor show in dashboard
export const getstudentTutorDeatisAction = () => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/role/tutor/details`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_STUDENT_TUTOR_DETAILS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_STUDENT_TUTOR_DETAILS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_STUDENT_TUTOR_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get student statistics
export const getstudentStatisticsAction = () => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student-statistics`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_STUDENT_STATISTICS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_STUDENT_STATISTICS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_STUDENT_TUTOR_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get to do list
export const getAllToDoListAction = (search) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/todo?search=${search}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_TO_DO_LIST_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_TO_DO_LIST_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_TO_DO_LIST_ERROR,
      payload: error.response.data.message,
    });
  }
};

// read todo list
export const readToDoListAction = (todo_id) => async (dispatch) => {
  try {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/todo/${todo_id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.READ_TO_DO_LIST_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.READ_TO_DO_LIST_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.READ_TO_DO_LIST_ERROR,
      payload: error.response.data.message,
    });
  }
};

// read todo list from notification
export const readToDoListFromNotificationAction =
  (sender_id, receiver_id, source_id) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/notification-status/todo?sender_id=${sender_id}&receiver_id=${receiver_id}&source_id=${source_id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.READ_TO_DO_LIST_FROM_NOTIFICATIONS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.READ_TO_DO_LIST_FROM_NOTIFICATIONS_ERROR,
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

// read is draft
export const readIsDraftction = (session_id, field) => async (dispatch) => {
  try {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/draft/${session_id}`,
        field,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.READ_SESSION_DRAFT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.READ_SESSION_DRAFT_ERROR,
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

// get  todo list sesion id and type
export const getToDoListtoSessionIdAction =
  (todo_id, todo_type) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/todo/${todo_id}/${todo_type}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_SESSION_ID_TO_TO_DO_LIST_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_SESSION_ID_TO_TO_DO_LIST_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_SESSION_ID_TO_TO_DO_LIST_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get current week sessions
export const getAllCurrentWeekSessionAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-session/weekly-session`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_CURRENTY_WEEK_SESION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_CURRENTY_WEEK_SESION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_CURRENTY_WEEK_SESION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all today session
export const getAllTodaySessionAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-session/today-session`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_TODAY_SESSION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_TODAY_SESSION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_TODAY_SESSION_ERROR,
      payload: error.response.data.message,
    });
  }
};
