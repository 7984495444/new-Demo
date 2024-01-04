import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// get notificatons setting
export const getNotificationAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notification-setting`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_NOTIFICATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_NOTIFICATION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add notificatons setting
export const addNotificationAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/notification-setting`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_NOTIFICATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_NOTIFICATION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add notificatons setting
export const editNotificationAction = (filed) => async (dispatch) => {
  try {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/notification-setting`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.EDIT_NOTIFICATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.EDIT_NOTIFICATION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.EDIT_NOTIFICATION_ERROR,
      payload: error.response.data.message,
    });
  }
};


