import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// add platefrom-evaluations
export const addPlatefromEvaluationsAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/plateform-evaluation`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_PLATEFROM_EVALUATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_PLATEFROM_EVALUATION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_PLATEFROM_EVALUATION_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get platefrom-evaluations
export const getPlatefromEvaluationsAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor-followup`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_PLATEFROM_EVALUATION_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_PLATEFROM_EVALUATION_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_PLATEFROM_EVALUATION_ERROR,
      payload: error.response.data.message,
    });
  }
};
