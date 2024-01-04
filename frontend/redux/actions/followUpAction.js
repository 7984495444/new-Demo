import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// ******************************** TUTOR *******************************

// add tutor followup action
export const addTutorFollowUpAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor-followup`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_TUTOR_FOLLOW_UP_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_TUTOR_FOLLOW_UP_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_TUTOR_FOLLOW_UP_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all student followup action
export const getAllTutorFollowUpAction =
  (currentPage, perPage, searchInfo) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup/student/follow-up?page=${currentPage}&limit=${perPage}&search=${searchInfo}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_TUTOR_FOLLOW_UP_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_TUTOR_FOLLOW_UP_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_TUTOR_FOLLOW_UP_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all student report action
export const getAllTutorStudentFollowUpReportAction =
  (student_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup?student_id=${student_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_TUTOR_STUDENT_FOLLOW_UP_REPORT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_TUTOR_STUDENT_FOLLOW_UP_REPORT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_TUTOR_STUDENT_FOLLOW_UP_REPORT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get sigle student follow up actions  =====> no use right
export const getSingleStudentFollowUpAction = (id) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup/follow-up/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_TUTOR_FOLLOW_UP_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_TUTOR_FOLLOW_UP_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_TUTOR_FOLLOW_UP_ERROR,
      payload: error.response.data.message,
    });
  }
};

// -------------- second tab -----------------

// get all tutor for follow-up
export const getAllTutorForFollowUpAction =
  (currentPage, perPage, searchInfo) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup/tutor/follow-up/details?page=${currentPage}&limit=${perPage}&search=${searchInfo}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_TUTOR_FOR_FOLLOW_UP_REPORT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_TUTOR_FOR_FOLLOW_UP_REPORT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_TUTOR_FOR_FOLLOW_UP_REPORT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// ******************************** STUDENT *******************************

// add student and parent  followup action
export const addStudentAndParentFollowUpAction =
  (filed) => async (dispatch) => {
    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup`,
          filed,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.ADD_STUDENT_FOLLOW_UP_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.ADD_STUDENT_FOLLOW_UP_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.ADD_STUDENT_FOLLOW_UP_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all student subject
export const getAllStudentSubjectDetailsAction = (id) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/student/subject-details/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_ALL_STUDENT_SUBJECT_DETAILS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_STUDENT_SUBJECT_DETAILS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_STUDENT_SUBJECT_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all student report action tab - 1
export const getAllStudentFollowUpReportWithDetailsAction =
  (filed) => async (dispatch) => {
    const { tutor_id, student_id, student_subject_id } = filed;
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/student/follow-up/details?tutor_id=${tutor_id}&student_id=${student_id}&subject_id=${student_subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// getAllStudentSubjectDetails
export const getAllStudentSubjectDetailsHandal = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_STUDENT_SUBJECT_DETAILS_SUCCESS,
    payload: null,
  });
};

// getAllStudentFollowUpReportWithDetails
export const getAllStudentFollowUpReportWithDetailsHandal =
  () => (dispatch) => {
    dispatch({
      type: types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS,
      payload: null,
    });
  };

// get all tutor report action tab - 2
export const getAllTutorFollowUpReportWithDetailsAction =
  (filed) => async (dispatch) => {
    const { tutor_id, student_id, student_subject_id } = filed;
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/tutor/follow-up/details?tutor_id=${tutor_id}&student_id=${student_id}&subject_id=${student_subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          result.data;
          dispatch({
            type: types.GET_ALL_TUTOR_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_TUTOR_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_TUTOR_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// ******************************** PARENT *******************************
// first tab
// get all student report action
export const getAllParentStudentFollowUpReportAction =
  () => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/parent/student-subjects`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_PARENT_STUDENT_FOLLOW_UP_REPORT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_PARENT_STUDENT_FOLLOW_UP_REPORT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_PARENT_STUDENT_FOLLOW_UP_REPORT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get all student report action
export const getAllStudentTutorFollowUpReportAction =
  (user_id, subject_id, user, role_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup/${user}/followups?${role_id}=${user_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_STUDENT_TUTOR_FOLLOW_UP_REPORT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_STUDENT_TUTOR_FOLLOW_UP_REPORT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_STUDENT_TUTOR_FOLLOW_UP_REPORT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get parent all evalucations
export const getAllParentsFollowUpReportAction = (id) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/parent/follow-ups`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_PARENT_ALL_FOLLOW_UP_REPORT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_PARENT_ALL_FOLLOW_UP_REPORT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_PARENT_ALL_FOLLOW_UP_REPORT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get parent subject details
export const getAllParentsSubjectDetailsAction = () => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/parent-details`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_PARENT_ALL_SUBJECT_DETAILS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_PARENT_ALL_SUBJECT_DETAILS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_PARENT_ALL_SUBJECT_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get parent subject details to followups
export const getAllFollowUpReportWithDetailsAction =
  (filed) => async (dispatch) => {
    const { tutor_id, student_id, student_subject_id } = filed;
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/student-parent-followup/parent/follow-up/details?tutor_id=${tutor_id}&student_id=${student_id}&subject_id=${student_subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_PARENT_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_PARENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_PARENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get parent evaluate or not
export const getParentEvaluateShowOrNotAction =
  (tutor_id, parent_id, student_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-followup/parent-followups?tutor_id=${tutor_id}&parent_id=${parent_id}&student_id=${student_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_PARENT_EVALUATE_OR_NOT_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_PARENT_EVALUATE_OR_NOT_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_PARENT_EVALUATE_OR_NOT_ERROR,
        payload: error.response.data.message,
      });
    }
  };
