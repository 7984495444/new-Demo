import axios from "axios";
import * as types from "../actionTypes";

export const getAllMatchedStudentsAction =
  (is_completed, page, perPage, search) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student-matches?is_completed=${is_completed}&page=${page}&limit=${perPage}&search=${search}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_MATCHED_STUDENTS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_MATCHED_STUDENTS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_MATCHED_STUDENTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const getAllStudentMatchedTopTutorAction =
  (student_id, subject_id) => async (dispatch) => {
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
            type: types.GET_STUDENT_MATCHED_TUTOR_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_STUDENT_MATCHED_TUTOR_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_STUDENT_MATCHED_TUTOR_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const acceptedMatchedAction =
  (
    user_id,
    student_id,
    subject_id,
    is_completed,
    currentPage,
    perPage,
    searchInfo
  ) =>
  async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-student/student-match?user_id=${user_id}&student_id=${student_id}&subject_id=${subject_id}&is_completed=${is_completed}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.ACCEPTED_MATCHED_SUCCESS,
            payload: result.data,
          });
          dispatch(
            getAllMatchedStudentsAction(0, currentPage, perPage, searchInfo)
          );
        })
        .catch((error) => {
          dispatch({
            type: types.ACCEPTED_MATCHED_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.ACCEPTED_MATCHED_ERROR,
        payload: error.response.data.message,
      });
    }
  };
