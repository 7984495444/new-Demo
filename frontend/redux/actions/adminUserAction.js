import axios from "axios";
import * as types from "../actionTypes";

// get all tutor
export const getAllTutorAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_USER_IN_ALL_TUTOR_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USER_IN_ALL_TUTOR_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_USER_IN_ALL_TUTOR_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all parent
export const getAllParentAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_USER_IN_ALL_PARENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USER_IN_ALL_PARENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_USER_IN_ALL_PARENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all Studnet
export const getAllStudentAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_USER_IN_ALL_STUDENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USER_IN_ALL_STUDENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_USER_IN_ALL_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};
