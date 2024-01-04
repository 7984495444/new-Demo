import * as types from "../actionTypes";

const initialState = {
  loginUserData: null,
  changePassword: null,
  forgotPassword: null,
  isLogin: false,
  language: null,
  errMsg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loginUserData: action.payload,
        errMsg: null,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
        errMsg: action.payload,
      };

    // Reset Password
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        changePassword: action.payload,
        errMsg: null,
      };
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // Forgot PassWord
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: action.payload,
        errMsg: null,
      };
    case types.FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    case types.LANGUAGE_CHANGE_SUCCESS:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
