import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";
import { saveAs } from "file-saver";

// add tutor document action
export const addTutorFollowUpAction = (filed) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ADD_TUTOR_DOCUMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getAllTutorDocumentsAction());
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_TUTOR_DOCUMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_TUTOR_DOCUMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all  tutor documents  action
export const getAllTutorDocumentsAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ALL_TUTOR_DOCUMENT_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_TUTOR_DOCUMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_TUTOR_DOCUMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// detele  tutor documents  action
export const deleteTutorDocumentsAction = (filed) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/tutor_document`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: filed,
    };

    axios
      .request(config)
      .then((result) => {
        dispatch({
          type: types.DELETE_TUTOR_DOCUMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getAllTutorDocumentsAction());
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_TUTOR_DOCUMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.DELETE_TUTOR_DOCUMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update tutor university documents  action
export const updateUniversityDocumentsAction = (filed) => async (dispatch) => {
  try {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor_document/university_proof`,
        filed,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.UPDATE_UNIVERSICTY_TUTOR_DOCUMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getAllTutorDocumentsAction());
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_UNIVERSICTY_TUTOR_DOCUMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.UPDATE_UNIVERSICTY_TUTOR_DOCUMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// update tutor all documents  action
export const updateAllDocumentsAction = (filed) => async (dispatch) => {
  try {
    axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/tutor_document`, filed, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.UPDATE_ALL_TUTOR_DOCUMENT_SUCCESS,
          payload: result.data,
        });
        dispatch(getAllTutorDocumentsAction());
      })
      .catch((error) => {
        dispatch({
          type: types.UPDATE_ALL_TUTOR_DOCUMENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ALL_TUTOR_DOCUMENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

//get document by document name
export const getDocumentByNameAction = (name) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/complete-session/document/${name}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        dispatch({
          type: types.GET_DOCUMENT_BY_NAME_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_DOCUMENT_BY_NAME_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_DOCUMENT_BY_NAME_ERROR,
      payload: error.response.data.message,
    });
  }
};
