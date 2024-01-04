import * as types from "../actionTypes";

const initialState = {
  addTutorDocumnet: null,
  addLessonSpaceEndSession: null,
  getAllEndSessions: null,
  getStudentTutorDetails: null,
  getStudentStatistics: null,
  getAllToDoList: null,
  readToDoList: null,
  readDraft: null,
  getSessionIdToToDoList: null,
  getAllcurrentWeekSession: null,
  getAllTodaySession: null,
};

const dashbordReducer = (state = initialState, action) => {
  switch (action.type) {
    // add tutor documents
    case types.GET_STUDENT_IN_TUTOR_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        addTutorDocumnet: action.payload,
        errMsg: null,
      };

    case types.GET_STUDENT_IN_TUTOR_SESSION_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add end session lessonspace
    case types.ADD_LESSIN_SPACE_SESSION_END_SUCCESS:
      return {
        ...state,
        lessonSpaceEndSession: action.payload,
        errMsg: null,
      };

    case types.ADD_LESSIN_SPACE_SESSION_END_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get end session lessonspace
    case types.GET_LESSIN_SPACE_SESSION_END_SUCCESS:
      return {
        ...state,
        getAllEndSessions: action.payload,
        errMsg: null,
      };

    case types.GET_LESSIN_SPACE_SESSION_END_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get student tutor show in dashboard
    case types.GET_STUDENT_TUTOR_DETAILS_SUCCESS:
      return {
        ...state,
        getStudentTutorDetails: action.payload,
        errMsg: null,
      };

    case types.GET_STUDENT_TUTOR_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get student statistics
    case types.GET_STUDENT_STATISTICS_SUCCESS:
      return {
        ...state,
        getStudentStatistics: action.payload,
        errMsg: null,
      };

    case types.GET_STUDENT_STATISTICS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get to do list
    case types.GET_TO_DO_LIST_SUCCESS:
      return {
        ...state,
        getAllToDoList: action.payload,
        errMsg: null,
      };

    case types.GET_TO_DO_LIST_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // read to do list
    case types.READ_TO_DO_LIST_SUCCESS:
      return {
        ...state,
        readToDoList: action.payload,
        errMsg: null,
      };

    case types.READ_TO_DO_LIST_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //  read todo list from notification
    case types.READ_TO_DO_LIST_FROM_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        readToDoList: action.payload,
        errMsg: null,
      };

    case types.READ_TO_DO_LIST_FROM_NOTIFICATIONS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // read is draft
    case types.READ_SESSION_DRAFT_SUCCESS:
      return {
        ...state,
        readDraft: action.payload,
        errMsg: null,
      };

    case types.READ_SESSION_DRAFT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get to do list
    case types.GET_SESSION_ID_TO_TO_DO_LIST_SUCCESS:
      return {
        ...state,
        getSessionIdToToDoList: action.payload,
        errMsg: null,
      };

    case types.GET_SESSION_ID_TO_TO_DO_LIST_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get current week sesion
    case types.GET_ALL_CURRENTY_WEEK_SESION_SUCCESS:
      return {
        ...state,
        getAllcurrentWeekSession: action.payload,
        errMsg: null,
      };

    case types.GET_ALL_CURRENTY_WEEK_SESION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get current week sesion
    case types.GET_ALL_TODAY_SESSION_SUCCESS:
      return {
        ...state,
        getAllTodaySession: action.payload,
        errMsg: null,
      };

    case types.GET_ALL_TODAY_SESSION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};
export default dashbordReducer;
