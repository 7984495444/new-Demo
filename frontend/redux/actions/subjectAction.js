import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// get all subject  Action
export const getAllSubjectAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/subjects`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.GET_ALL_SUBJECT_SUCCESS, payload: result.data });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_SUBJECT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_SUBJECT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all subject by student and tutor id
export const getAllSubjectByStudentIdAction =
  (turor_id, student_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/tutor-session/session/subjects/${turor_id}/${student_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_SUBJECT_BY_STUDENT_AND_TUTOR_ID_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_SUBJECT_BY_STUDENT_AND_TUTOR_ID_ERROR,
            payload: error.response.data.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_SUBJECT_BY_STUDENT_AND_TUTOR_ID_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // get student subject for parent create session
export const getAllParentStudentSbjectAction =
(student_id) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor_student_subject/${student_id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_ALL_PARENT_STUDENT_SUBJECT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_PARENT_STUDENT_SUBJECT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_PARENT_STUDENT_SUBJECT_ERROR,
      payload: error.response.data.message,
    });
  }
};