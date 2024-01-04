import axios from "axios";
import * as types from "../actionTypes";

// get demo lecture
export const getDemoLectureAction = () => async (dispatch) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_LESSON_SPAEC_URL}/v2/demo/`,
      headers: {},
    };

    axios
      .request(config)
      .then((result) => {
        if (result?.data) {
          window.open(result?.data?.url, "_blank");
        }
      })
      .catch((error) => {
        dispatch({
          type: types.GET_LESSON_SPACE_DEMO_LECTURE_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_LESSON_SPACE_DEMO_LECTURE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get tutro lecture
export const getTutorLectureAction =
  (user_id, student_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/lesson-space/tutor-space?creator_id=${user_id}&student_id=${student_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          if (result?.data) {
            window.open(result?.data, "_blank");
          }
        })
        .catch((error) => {
          dispatch({
            type: types.GET_LESSON_SPACE_TUTOR_LECTURE_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_LESSON_SPACE_TUTOR_LECTURE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get tutro lecture
export const getStudentLectureAction =
  (user_id, tutor_id, subject_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/lesson-space/student-space?creator_id=${user_id}&tutor_id=${tutor_id}&subject_id=${subject_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          if (result?.data) {
            window.open(result?.data, "_blank");
          }
        })
        .catch((error) => {
          dispatch({
            type: types.GET_LESSON_SPACE_STUDENT_LECTURE_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_LESSON_SPACE_STUDENT_LECTURE_ERROR,
        payload: error.response.data.message,
      });
    }
  };
