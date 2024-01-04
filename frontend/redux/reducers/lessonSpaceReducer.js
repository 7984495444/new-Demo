import * as types from "../actionTypes";

const initialState = {
  errMsg: null,
  getDemoLectureUrl: null,
  getTutorLectureUrl: null,
  getStudentLectureUrl: null,
};

const lessonSpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    // get demo Lecture
    case types.GET_LESSON_SPACE_DEMO_LECTURE_SUCCESS:
      return {
        ...state,
        getDemoLectureUrl: action.payload,
      };
    case types.GET_LESSON_SPACE_DEMO_LECTURE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get tutor Lecture
    case types.GET_LESSON_SPACE_TUTOR_LECTURE_SUCCESS:
      return {
        ...state,
        getTutorLectureUrl: action.payload,
      };
    case types.GET_LESSON_SPACE_TUTOR_LECTURE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get student Lecture
    case types.GET_LESSON_SPACE_STUDENT_LECTURE_SUCCESS:
      return {
        ...state,
        getStudentLectureUrl: action.payload,
      };
    case types.GET_LESSON_SPACE_STUDENT_LECTURE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};
export default lessonSpaceReducer;
