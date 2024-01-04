import * as types from "../actionTypes";

const initialState = {
  getAllMatchedStudents: null,
  getAllSTudentMatchedTutor: null,
  acceptedMtched: null,
};

const allStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MATCHED_STUDENTS_SUCCESS:
      return {
        ...state,
        getAllMatchedStudents: action.payload,
        errMsg: null,
      };

    case types.GET_MATCHED_STUDENTS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case types.GET_STUDENT_MATCHED_TUTOR_SUCCESS:
      return {
        ...state,
        getAllSTudentMatchedTutor: action.payload,
        errMsg: null,
      };

    case types.GET_STUDENT_MATCHED_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case types.ACCEPTED_MATCHED_SUCCESS:
      return {
        ...state,
        acceptedMtched: action.payload,
        errMsg: null,
      };

    case types.ACCEPTED_MATCHED_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};
export default allStudentReducer;
