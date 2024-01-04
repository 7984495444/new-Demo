import * as types from "../actionTypes";

const initialState = {
  allSession: null,
  tutorSessionById: null,
  sessions: null,
  editSessionReq: null,
  // sessionError: null,
  errMsg: null,
  addCommpleteSession: null,
  allTutorMyStudent: null,
  allStudentAndParent: null,
  studentAllSessionSubjectDetails: null,
  getAllTutorStudentSessionById: null,
  parentInAllstudentSessionDetails: null,
  studentSessionDetails: null,
  singleStudentSessionDetails: null,
  allStudentTutor: null,
  allParentStudent: null,
  allParentStudentSubjectToTutorId: null,
  getAllSuggestedStudents: null,
  getSuggestedStudentsDetailsById: null,
};

const tutorReducer = (state = initialState, action) => {
  switch (action.type) {
    // get tutor
    case types.GET_TUTOR_SUCCESS:
      return {
        ...state,
        sessions: action.payload,
        errMsg: null,
      };
    case types.GET_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all session
    // get tutor
    case types.GET_ALL_TUTOR_SESSION_SUCCESS:
      return {
        ...state,
        allSession: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_SESSION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get tutor session by id
    case types.GET_TUTOR_SESSION_BY_ID_SUCCESS:
      return {
        ...state,
        tutorSessionById: action.payload,
        errMsg: null,
      };
    case types.GET_TUTOR_SESSION_BY_ID_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add tutor
    case types.ADD_TUTOR_SUCCESS:
      return {
        ...state,
        sessions: action.payload,
        errMsg: null,
      };
    case types.ADD_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // edit tutor
    case types.EDIT_TUTOR_SUCCESS:
      return {
        ...state,
        editSessionReq: action.payload,
        errMsg: null,
      };
    case types.EDIT_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // delete tutor
    case types.DELETE_TUTOR_SUCCESS:
      return {
        ...state,
        sessions: action.payload,
        errMsg: null,
      };
    case types.DELETE_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add complete session tutor
    case types.ADD_COMPLETE_TUTOR_SESSION_SUCCESS:
      return {
        ...state,
        addCommpleteSession: action.payload,
        errMsg: null,
      };
    case types.ADD_COMPLETE_TUTOR_SESSION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all tutor student
    case types.GET_ALL_TUTOR_STUDENTS_SUCCESS:
      return {
        ...state,
        allTutorStudent: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_STUDENTS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all tutor student action with serching and paginations
    case types.GET_ALL_TUTOR_MY_STUDENTS_SUCCESS:
      return {
        ...state,
        allTutorMyStudent: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_MY_STUDENTS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get tutor student id to get all session date and info
    case types.GET_ALL_TUTOR_STUDENT_SESSION_BY_ID_SUCCESS:
      return {
        ...state,
        getAllTutorStudentSessionById: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_STUDENT_SESSION_BY_ID_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all student and parent calender documents
    case types.GET_ALL_STUDENT_AND_PARENT_SUCCESS:
      return {
        ...state,
        allStudentAndParent: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_STUDENT_AND_PARENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // page my student in single student sunject session details
    case types.GET_STUDENT_ALL_SESSION_WISE_SUBJECT_SUCCESS:
      return {
        ...state,
        studentAllSessionSubjectDetails: action.payload,
        errMsg: null,
      };
    case types.GET_STUDENT_ALL_SESSION_WISE_SUBJECT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // parent in student history details
    case types.GET_PARENT_ALL_STUDENT_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        parentInAllstudentSessionDetails: action.payload,
        errMsg: null,
      };
    case types.GET_PARENT_ALL_STUDENT_SESSION_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //  student history details
    case types.GET_STUDENT_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        studentSessionDetails: action.payload,
        errMsg: null,
      };
    case types.GET_STUDENT_SESSION_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //  single student history details
    case types.GET_SINGLE_STUDENT_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        singleStudentSessionDetails: action.payload,
        errMsg: null,
      };
    case types.GET_SINGLE_STUDENT_SESSION_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // get all student tutor
    case types.GET_ALL_STUDENTS_TUTOR_SUCCESS:
      return {
        ...state,
        allStudentTutor: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_STUDENTS_TUTOR_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case types.GET_ALL_PARENT_STUDENT_SUCCESS:
      return {
        ...state,
        allParentStudent: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PARENT_STUDENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get student id and subject it to find tutor for parent create session
    case types.GET_ALL_PARENT_STUDENT_SUBJECT_TO_FIND_TUTOR_ID_SUCCESS:
      return {
        ...state,
        allParentStudentSubjectToTutorId: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PARENT_STUDENT_SUBJECT_TO_FIND_TUTOR_ID_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all suggested student
    case types.GET_ALL_SUGGESTED_STUDENT_SUCCESS:
      return {
        ...state,
        getAllSuggestedStudents: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_SUGGESTED_STUDENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // suggested student details get by subject id and student and tutor id
    case types.GET_SUGGESTED_STUDENT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        getAllSuggestedStudents: action.payload,
        errMsg: null,
      };
    case types.GET_SUGGESTED_STUDENT_DETAILS_BY_ID_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default tutorReducer;
