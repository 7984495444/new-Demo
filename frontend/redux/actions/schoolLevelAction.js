import axios from "axios";
import * as types from "../actionTypes";

//get my school levels
export const getMySchoolLevels = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/my-school-levels`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_MY_SCHOOL_LEVELS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_MY_SCHOOL_LEVELS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_MY_SCHOOL_LEVELS_ERROR,
      payload: error.response.data.message,
    });
  }
};

//get my school level subjects
export const getMySchoolLevelSubjects = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/my-school-levels/subjects`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_MY_SCHOOL_LEVEL_SUBJECTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_MY_SCHOOL_LEVEL_SUBJECTS_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_MY_SCHOOL_LEVEL_SUBJECTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

//get all school level and subjects for tutor profile
export const getAllSchoolLevelSubjectsAction = () => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/my-school-levels/level-subjects`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_ALL_SCHOOL_LEVEL_SUBJECTS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_SCHOOL_LEVEL_SUBJECTS_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_MY_SCHOOL_LEVEL_SUBJECTS_ERROR,
      payload: error.response.data.message,
    });
  }
};
