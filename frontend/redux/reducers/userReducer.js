import * as types from "../actionTypes";

const initialState = {
  userData: null,
  roleWiseUserData: null,
  changePassword: null,
  forgotPassword: null,
  errMsg: null,
  allUserData: null,
  editUserData: null,
  editStudentData: null,
  addStudentUserData: null,
  deleteProfileImages: null,
  getUserProfileData: null,
  editUserProfileData: null,
  getStudentIdToParentDetailsData: null,
  idToGetUserDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // user
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        errMsg: null,
      };
    case types.GET_USER_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // all  users
    case types.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUserData: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_USER_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // all  users role wise
    case types.GET_ROLE_WISE_USER_SUCCESS:
      return {
        ...state,
        roleWiseUserData: action.payload,
        errMsg: null,
      };
    case types.GET_ROLE_WISE_USER_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // edit user data
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserData: action.payload,
        errMsg: null,
      };
    case types.EDIT_USER_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add student data
    case types.ADD_STUDENT_SUCCESS:
      return {
        ...state,
        addStudentUserData: action.payload,
        errMsg: null,
      };
    case types.ADD_STUDENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add student data
    case types.DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        deleteProfileImages: action.payload,
        errMsg: null,
      };
    case types.DELETE_PROFILE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // edit user data
    case types.EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        editStudentData: action.payload,
        errMsg: null,
      };
    case types.EDIT_STUDENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get users profile
    case types.GET_USERS_PROFILE_SUCCESS:
      return {
        ...state,
        getUserProfileData: action.payload,
        errMsg: null,
      };
    case types.GET_USERS_PROFILE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // edit users profile
    case types.EDIT_USERS_PROFILE_SUCCESS:
      return {
        ...state,
        editUserProfileData: action.payload,
        errMsg: null,
      };
    case types.EDIT_USERS_PROFILE_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // edit users profile
    case types.GET_STUDENT_ID_TO_GET_PARENT_DETAILS_SUCCESS:
      return {
        ...state,
        getStudentIdToParentDetailsData: action.payload,
        errMsg: null,
      };
    case types.GET_STUDENT_ID_TO_GET_PARENT_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // id to get user details
    case types.ID_TO_GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        idToGetUserDetails: action.payload,
        errMsg: null,
      };
    case types.ID_TO_GET_USER_DETAILS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
