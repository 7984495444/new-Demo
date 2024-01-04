import axios from "axios";
import * as types from "../actionTypes";
import { getUserAction, getUserProfileAction } from "./userAction";
import Router from "next/router";

// login Action
export const loginAction = (field) => async (dispatch) => {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, field)
      .then(async (result) => {
        localStorage.setItem("token", result.data.token);
        await dispatch(getUserAction());
        dispatch({ type: types.GET_USER_SUCCESS, payload: result.data });
        Router.push("/dashboard");
        await dispatch(getUserProfileAction(result?.data?.id));
        await dispatch({ type: types.LOGIN_SUCCESS, payload: result.data });
      })
      .catch((error) => {
        dispatch({
          type: types.LOGIN_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({ type: types.LOGIN_ERROR, payload: error.response.data.message });
  }
};

export const logoutAction = () => async (dispatch) => {
  dispatch({ type: types.LOGIN_SUCCESS, payload: null });
};

// Reset Password
export const resetPasswordAction = (field) => async (dispatch) => {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, field)
      .then((result) => {
        dispatch({ type: types.RESET_PASSWORD_SUCCESS, payload: result.data });
      })
      .catch((error) => {
        dispatch({
          type: types.RESET_PASSWORD_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.RESET_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, email)
      .then((result) => {
        dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: result.data });
      })
      .catch((error) => {
        dispatch({
          type: types.FORGOT_PASSWORD_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};

// change language
export const changeLanguageAction = (language) => async (dispatch) => {
  try {
    dispatch({ type: types.LANGUAGE_CHANGE_SUCCESS, payload: language });
  } catch (error) {
    dispatch({
      type: types.FORGOT_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
  }
};
