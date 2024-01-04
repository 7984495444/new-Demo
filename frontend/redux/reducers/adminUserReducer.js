import * as types from "../actionTypes";

const initialState = {
  getAllTutors: null,
  getAllParents: null,
  getAllStudents: null,
  errMsg: null,
};

const adminUserReducer = (state = initialState, action) => {
  switch (action.type) {
    // get all tutor
    case types.GET_USER_IN_ALL_TUTOR_SUCCESS:
      return {
        ...state,
        getAllTutors: action.payload,
        errMsg: null,
      };

    case types.GET_USER_IN_ALL_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all parent
    case types.GET_USER_IN_ALL_PARENT_SUCCESS:
      return {
        ...state,
        getAllParents: action.payload,
        errMsg: null,
      };

    case types.GET_USER_IN_ALL_PARENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all student
    case types.GET_USER_IN_ALL_STUDENT_SUCCESS:
      return {
        ...state,
        getAllStudents: action.payload,
        errMsg: null,
      };

    case types.GET_USER_IN_ALL_STUDENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default adminUserReducer;
