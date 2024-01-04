import * as types from "../actionTypes";

const initialState = {
  allSubject: null,
  allSubjectByStudentAndTutorId: null,
  allParentStudentSubject: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // all subject
    case types.GET_ALL_SUBJECT_SUCCESS:
      return {
        ...state,
        allSubject: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_SUBJECT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all subject by student and tutor id
    case types.GET_ALL_SUBJECT_BY_STUDENT_AND_TUTOR_ID_SUCCESS:
      return {
        ...state,
        allSubjectByStudentAndTutorId: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_SUBJECT_BY_STUDENT_AND_TUTOR_ID_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get student subject for parent create session
    case types.GET_ALL_PARENT_STUDENT_SUBJECT_SUCCESS:
      return {
        ...state,
        allParentStudentSubject: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PARENT_STUDENT_SUBJECT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
