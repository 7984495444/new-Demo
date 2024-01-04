import * as types from "../actionTypes";

const initialState = {
  getMySchoolLevel: null,
  getMySchoolLevelSubject: null,
  getAllSchoolLevelSubject: null,
  errMsg: null,
};

const schoolLevelReducer = (state = initialState, action) => {
  switch (action.type) {
    // get my school levels
    case types.GET_MY_SCHOOL_LEVELS_SUCCESS:
      return {
        ...state,
        getMySchoolLevel: action.payload,
        errMsg: null,
      };
    //get my school level subjects
    case types.GET_MY_SCHOOL_LEVEL_SUBJECTS_SUCCESS:
      return {
        ...state,
        getMySchoolLevelSubject: action.payload,
        errMsg: null,
      };

    //get all school level and subjects for tutor profile
    case types.GET_ALL_SCHOOL_LEVEL_SUBJECTS_SUCCESS:
      return {
        ...state,
        getAllSchoolLevelSubject: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_SCHOOL_LEVEL_SUBJECTS_ERROR:
      return {
        ...state,
        errMsg: null,
      };
    default:
      return state;
  }
};
export default schoolLevelReducer;
