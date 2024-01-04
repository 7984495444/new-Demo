import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";
import { sendNotificationsAction } from "./sendNotificationAction";
import {
  getAllCurrentWeekSessionAction,
  getAllToDoListAction,
  getAllTodaySessionAction,
} from "./dashbordAction";
// get tutor sessione action start date to end date
export const getTutorSessionAction =
  (startDate, endDate) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/${startDate}/${endDate}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({ type: types.GET_TUTOR_SUCCESS, payload: result.data });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_TUTOR_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all tutor sessione action
export const getAllTutorSessionAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-session/tutor-student`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_TUTOR_SESSION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_TUTOR_SESSION_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_TUTOR_SESSION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get single tutor session action
export const getTutorSessionByIdAction = (id) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-session/single/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_TUTOR_SESSION_BY_ID_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_TUTOR_SESSION_BY_ID_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_TUTOR_SESSION_BY_ID_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add tutor session action
export const addTutorSessionAction =
  (
    field,
    sendNotificationField,
    fields2,
    sendNotificationFieldStudentParents,
    isTutor
  ) =>
  async (dispatch) => {
    try {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor-session`, field, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          dispatch({ type: types.ADD_TUTOR_SUCCESS, payload: result.data });
          if (result?.data?.id) {
            let editSendNotificationField = {
              ...sendNotificationField,
              source_id: result?.data?.id,
            };
            let editField = {
              ...field,
              source_id: result?.data?.id,
            };
            dispatch(
              editTutorSessionWithNotificationsAction(
                editField,
                editSendNotificationField,
                false
              )
            );
            if (isTutor) {
              let editField2 = {
                ...fields2,
                source_id: result?.data?.id,
              };
              let editSendNotificationField1 = {
                ...sendNotificationFieldStudentParents,
                source_id: result?.data?.id,
              };
              dispatch(
                editTutorSessionWithNotificationsAction(
                  editField2,
                  editSendNotificationField1,
                  false
                )
              );
            }
          }
          // dispatch(getAllTutorSessionAction());
        })
        .catch((error) => {
          dispatch({
            type: types.ADD_TUTOR_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.ADD_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// update tutor session action
export const editTutorSessionAction =
  (field, id, source_type) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/${id}?source_type=${source_type}`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({ type: types.EDIT_TUTOR_SUCCESS, payload: result.data });
          dispatch(getAllTutorSessionAction());
          dispatch(getAllCurrentWeekSessionAction());
          dispatch(getAllTodaySessionAction());
        })
        .catch((error) => {
          dispatch({
            type: types.EDIT_TUTOR_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.EDIT_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// update tutor session action
export const editTutorSessionWithNotificationsAction =
  (field, sendNotificationField, isEdit) => async (dispatch) => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/edit-session`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({ type: types.EDIT_TUTOR_SUCCESS, payload: result.data });
          if (result?.data?.id) {
            let notiInfo = {
              ...sendNotificationField,
              edit_session: Number(result?.data?.id),
            };
            dispatch(sendNotificationsAction(notiInfo, isEdit));
          }
        })
        .catch((error) => {
          dispatch({
            type: types.EDIT_TUTOR_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.EDIT_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// delete tutor session action
export const deleteTutorSessionAction = (field, id) => async (dispatch) => {
  try {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/delete/${id}`,
        field,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({ type: types.DELETE_TUTOR_SUCCESS, payload: result.data });
        dispatch(getAllTutorSessionAction());
        dispatch(getAllCurrentWeekSessionAction());
        dispatch(getAllTodaySessionAction());
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_TUTOR_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.DELETE_TUTOR_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete tutor session request action
// export const deleteTutorSessionWithNotificationsAction =
//   (field, sendNotificationField) => async (dispatch) => {
//     try {
//       axios
//         .post(
//           `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/delete-session`,
//           field,
//           {
//             headers: {
//               authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         )
//         .then((result) => {
//           dispatch({ type: types.DELETE_TUTOR_SUCCESS, payload: result.data });
//           if (result?.data?.id) {
//             let notiInfo = {
//               ...sendNotificationField,
//               edit_session: result?.data?.id,
//             };
//             dispatch(sendNotificationsAction(notiInfo));
//           }
//         })
//         .catch((error) => {
//           dispatch({
//             type: types.DELETE_TUTOR_ERROR,
//             payload: error.response.data.message,
//           });
//         });
//     } catch (error) {
//       dispatch({
//         type: types.DELETE_TUTOR_ERROR,
//         payload: error.response.data.message,
//       });
//     }
//   };

// cencel tutor session action
export const cancelTutorSessionWithNotificationsAction =
  (field, id) => async (dispatch) => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/delete-session/${id}`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({ type: types.DELETE_TUTOR_SUCCESS, payload: result.data });
        })
        .catch((error) => {
          dispatch({
            type: types.DELETE_TUTOR_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.DELETE_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// complite tutor session action
export const addComplateTutorSessionAction = (field) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/complete-session`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_COMPLETE_TUTOR_SESSION_SUCCESS,
          payload: result.data,
        });
        dispatch(getAllTutorSessionAction());
        dispatch(getAllToDoListAction(""));
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_COMPLETE_TUTOR_SESSION_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_COMPLETE_TUTOR_SESSION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all tutor student action calender page
export const getAllTutorStudentAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-student/students-list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_TUTOR_STUDENTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_TUTOR_STUDENTS_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_TUTOR_STUDENTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all tutor student action with serching and paginations
export const getAllTutorMyStudentAction =
  (currentPage, perPage, searchInfo) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/my-students?page=${currentPage}&limit=${perPage}&search=${searchInfo}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_TUTOR_MY_STUDENTS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_TUTOR_MY_STUDENTS_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_TUTOR_MY_STUDENTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get tutor student id to get all session date and info
export const getAllTutorStudentSessionByIdAction =
  (student_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/${student_id}/${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_TUTOR_STUDENT_SESSION_BY_ID_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_TUTOR_STUDENT_SESSION_BY_ID_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_TUTOR_MY_STUDENTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };
// *********************** parent  / student *************************
// get all student and parent calender documents
export const getAllStudentAndParentDocumentAction = () => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/complate-session`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_ALL_STUDENT_AND_PARENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_STUDENT_AND_PARENT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_STUDENT_AND_PARENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// *************************** tutor ********************************
// page my student in single student sunject session details
export const getStudentAllSessionSubjectWiseDetailsAction =
  (student_id, subject_id, currentPage, perPage) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/session-history?student_id=${student_id}&subject_id=${subject_id}&page=${currentPage}&limit=${perPage}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_STUDENT_ALL_SESSION_WISE_SUBJECT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_STUDENT_ALL_SESSION_WISE_SUBJECT_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_STUDENT_ALL_SESSION_WISE_SUBJECT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// parent in student history details
export const getParentInStudentAllSubjectDetailsAction =
  (student_id, currentPage, perPage) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student/session-history/${student_id}?page=${currentPage}&limit=${perPage}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_PARENT_ALL_STUDENT_SESSION_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_PARENT_ALL_STUDENT_SESSION_DETAILS_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_PARENT_ALL_STUDENT_SESSION_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// student history details role:- student
export const getStudentAllSubjectDetailsAction =
  (currentPage, perPage) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student/session/history?page=${currentPage}&limit=${perPage}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_STUDENT_SESSION_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_STUDENT_SESSION_DETAILS_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_STUDENT_SESSION_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// single student history details role:- student use for dahsboard
export const getStudentSubjectDetailsAction =
  (complete_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/complete-session/${complete_id}/details`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_SINGLE_STUDENT_SESSION_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_SINGLE_STUDENT_SESSION_DETAILS_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_SINGLE_STUDENT_SESSION_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all student tutor action for create student session
export const getAllStudentTutorAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor-student/tutors-list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_STUDENTS_TUTOR_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_STUDENTS_TUTOR_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_STUDENTS_TUTOR_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all student for parent create session
export const getAllParentStudentAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/parent/student-list`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_PARENT_STUDENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_PARENT_STUDENT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_PARENT_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get student id and subject it to find tutor for parent create session
export const getAllParentStudentSbjectToTutorIdAction =
  (student_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student-tutor?student_id=${student_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_PARENT_STUDENT_SUBJECT_TO_FIND_TUTOR_ID_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_PARENT_STUDENT_SUBJECT_TO_FIND_TUTOR_ID_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_PARENT_STUDENT_SUBJECT_TO_FIND_TUTOR_ID_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all suggested student
export const getAllSuggestedStudentAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_SUGGESTED_STUDENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_SUGGESTED_STUDENT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_SUGGESTED_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// suggested student details get by subject id and student and tutor id
export const getSuggestedStudentByIdAction =
  ({ student_id, subject_id }) =>
  async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student/match/details?student_id=${student_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_SUGGESTED_STUDENT_DETAILS_BY_ID_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_SUGGESTED_STUDENT_DETAILS_BY_ID_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_SUGGESTED_STUDENT_DETAILS_BY_ID_ERROR,
        payload: error.response.data.message,
      });
    }
  };
