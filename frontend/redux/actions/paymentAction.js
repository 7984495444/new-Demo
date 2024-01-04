import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// ********************* PARENT *************************************
// get payment card details
export const getPaymentCardAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/stripe-card`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_CARD_PAYMENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_CARD_PAYMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_CARD_PAYMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add payment card action
export const addPaymentCardAction = (field) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/stripe-card`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_CARD_PAYMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getPaymentCardAction());
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_CARD_PAYMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_CARD_PAYMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update payment card action
export const editPaymentCardAction = (field) => async (dispatch) => {
  try {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/stripe-card`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.EDIT_CARD_PAYMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getPaymentCardAction());
      })
      .catch((error) => {
        dispatch({
          type: types.EDIT_TUTOR_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.EDIT_CARD_PAYMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete payment card action
export const deletePaymentCardAction = () => async (dispatch) => {
  try {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/stripe-card`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.DELETE_CARD_PAYMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getPaymentCardAction());
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_CARD_PAYMENT_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.DELETE_CARD_PAYMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// **************************** TUTOR *****************************************
// add payment deductions

export const addPaymentDeductionsAction = (field) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/payment-deduction`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_PAYMENT_DEDUCATIONS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_PAYMENT_DEDUCATIONS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_PAYMENT_DEDUCATIONS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all payment deductions
export const getAllPaymentDeductionsAction =
  (currentPage, perPage) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/payment-deduction/payment/details?page=${currentPage}&limit=${perPage}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_ALL_PAYMENT_DEDUCATIONS_SUCCESS,
            payload: result.data,
          });
        })
        .catch((error) => {
          dispatch({
            type: types.GET_ALL_PAYMENT_DEDUCATIONS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_PAYMENT_DEDUCATIONS_ERROR,
        payload: error.response.data.message,
      });
    }
  };
