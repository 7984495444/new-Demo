import * as types from "../actionTypes";

const initialState = {
  errMsg: null,
  // tutor
  addFollowUp: null,
  getAllFollowUp: null,
  getAllTutorStudentFollowUpReport: null,
  // ---- second tab -----
  getAllTutorForFollowUpReport: null,
  // student
  addStudentFollowUp: null,
  getAllStudentFollowUpReportWithDetails: null,
  getAllTutorFollowUpReportWithDetails: null,
  getAllStudentSubjectDetails: null,
  // parent
  getAllStudentFollowUp: null,
  getAllparentStudentFollowUpReport: null,
  getAllparentsFollowUpReport: null,
  getAllparentSubjectDetails: null,
  getAllParentFollowUpReportWithDetails: null,
  parentEvluacteOrNot: null,
};

const followUpReducer = (state = initialState, action) => {
  switch (action.type) {
    // ******** TUTOR **************
    // add tutor followup
    case types.ADD_TUTOR_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        addFollowUp: action.payload,
        errMsg: null,
      };
    case types.ADD_TUTOR_FOLLOW_UP_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get tutor followup
    case types.GET_TUTOR_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        getAllFollowUp: action.payload,
        errMsg: null,
      };
    case types.GET_TUTOR_FOLLOW_UP_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get All Tutor Student FollowUp Report
    case types.GET_ALL_TUTOR_STUDENT_FOLLOW_UP_REPORT_SUCCESS:
      return {
        ...state,
        getAllTutorStudentFollowUpReport: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_STUDENT_FOLLOW_UP_REPORT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // ---------- second tab --------
    // get All Tutor for FollowUp Report
    case types.GET_ALL_TUTOR_FOR_FOLLOW_UP_REPORT_SUCCESS:
      return {
        ...state,
        getAllTutorForFollowUpReport: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_FOR_FOLLOW_UP_REPORT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // ******** Student **************
    // add student follow-up
    case types.ADD_STUDENT_FOLLOW_UP_SUCCESS:
      return {
        ...state,
        addFollowUp: action.payload,
        errMsg: null,
      };
    case types.ADD_STUDENT_FOLLOW_UP_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get All  Student  FollowUp Report with details
    case types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS:
      return {
        ...state,
        getAllStudentFollowUpReportWithDetails: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_STUDENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get All  tutor FollowUp Report with details
    case types.GET_ALL_TUTOR_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS:
      return {
        ...state,
        getAllTutorFollowUpReportWithDetails: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get all student subject
    case types.GET_ALL_STUDENT_SUBJECT_DETAILS_SUCCESS:
      return {
        ...state,
        getAllStudentSubjectDetails: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_STUDENT_SUBJECT_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // ************ parent ***********
    // get all parent student follow up with addistion details
    case types.GET_ALL_PARENT_STUDENT_FOLLOW_UP_REPORT_SUCCESS:
      return {
        ...state,
        getAllparentStudentFollowUpReport: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PARENT_STUDENT_FOLLOW_UP_REPORT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get All  Student tutor FollowUp Report
    case types.GET_ALL_STUDENT_TUTOR_FOLLOW_UP_REPORT_SUCCESS:
      return {
        ...state,
        getAllStudentFollowUp: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_STUDENT_TUTOR_FOLLOW_UP_REPORT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get parents followup
    case types.GET_PARENT_ALL_FOLLOW_UP_REPORT_SUCCESS:
      return {
        ...state,
        getAllparentsFollowUpReport: action.payload,
        errMsg: null,
      };
    case types.GET_PARENT_ALL_FOLLOW_UP_REPORT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get parents subject details
    case types.GET_PARENT_ALL_SUBJECT_DETAILS_SUCCESS:
      return {
        ...state,
        getAllparentSubjectDetails: action.payload,
        errMsg: null,
      };
    case types.GET_PARENT_ALL_SUBJECT_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get parent subject details to followups
    case types.GET_ALL_PARENT_FOLLOW_UP_REPORT_WITH_DETAILS_SUCCESS:
      return {
        ...state,
        getAllParentFollowUpReportWithDetails: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PARENT_FOLLOW_UP_REPORT_WITH_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get parent evaluate or not
    case types.GET_PARENT_EVALUATE_OR_NOT_SUCCESS:
      return {
        ...state,
        parentEvluacteOrNot: action.payload,
        errMsg: null,
      };
    case types.GET_PARENT_EVALUATE_OR_NOT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default followUpReducer;
