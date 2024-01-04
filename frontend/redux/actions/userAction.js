import axios from "axios";
import * as types from "../actionTypes";
import { config } from "../headers";

// get login user data Action
export const getUserAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.GET_USER_SUCCESS, payload: result.data });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USER_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all user data Action
export const getAllUserAction = () => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        let allData = [];
        for (let index = 0; index < result.data.length; index++) {
          const element = result.data[index];
          if (element.role_id.name === "student") {
            allData.push(element);
          }
        }
        dispatch({ type: types.GET_ALL_USER_SUCCESS, payload: allData });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ALL_USER_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get all user role wise data Action
export const getUserByRole = (id) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/role/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ROLE_WISE_USER_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ROLE_WISE_USER_ERROR,
          payload: error?.response?.data?.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ROLE_WISE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Get search user
export const getSearchUser = (name, id) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/search/${name}?id=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_ROLE_WISE_USER_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.GET_ROLE_WISE_USER_ERROR,
          payload: error.response.data.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_ROLE_WISE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// edit user data Action
export const editUserAction = (field) => async (dispatch) => {
  try {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.EDIT_USER_SUCCESS, payload: result.data });
        dispatch(getUserAction());
      })
      .catch((error) => {
        dispatch({
          type: types.EDIT_USER_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.EDIT_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// add student in parent account
export const addStudentAction = (field) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.ADD_STUDENT_SUCCESS, payload: result.data });
        dispatch(getUserAction());
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_STUDENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ADD_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete profile  images
export const deleteProfileAction = () => async (dispatch) => {
  try {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/profile/image`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.DELETE_PROFILE_SUCCESS, payload: result.data });
        dispatch(getUserAction());
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_PROFILE_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.DELETE_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// student edit in parent account
export const editStudentAction = (field) => async (dispatch) => {
  try {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/users/parent/students`, field, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({ type: types.EDIT_STUDENT_SUCCESS, payload: result.data });
        dispatch(getUserAction());
      })
      .catch((error) => {
        dispatch({
          type: types.EDIT_STUDENT_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.EDIT_STUDENT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get profile by id
export const getUserProfileAction = (id) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user_profile/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.GET_USERS_PROFILE_SUCCESS,
          payload: result.data,
        });
        dispatch(getUserAction());
      })
      .catch((error) => {
        dispatch({
          type: types.GET_USERS_PROFILE_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.GET_USERS_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get profile by id
export const editUserProfileAction =
  (student_id, field) => async (dispatch) => {
    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URL}/user_profile/${student_id}`,
          field,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.EDIT_USERS_PROFILE_SUCCESS,
            payload: result.data,
          });
          dispatch(getUserProfileAction(student_id));
        })
        .catch((error) => {
          dispatch({
            type: types.EDIT_USERS_PROFILE_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.EDIT_USERS_PROFILE_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// get student id to parent details
export const getStudentIdToParentDeatilsAction =
  (student_id) => async (dispatch) => {
    try {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/students/parent/${student_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          dispatch({
            type: types.GET_STUDENT_ID_TO_GET_PARENT_DETAILS_SUCCESS,
            payload: result.data,
          });
          dispatch(getUserAction());
        })
        .catch((error) => {
          dispatch({
            type: types.GET_STUDENT_ID_TO_GET_PARENT_DETAILS_ERROR,
            payload: error.message,
          });
        });
    } catch (error) {
      dispatch({
        type: types.GET_STUDENT_ID_TO_GET_PARENT_DETAILS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

// id to get user details
export const idToGetUserDetailsAction = (user_id) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${user_id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch({
          type: types.ID_TO_GET_USER_DETAILS_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ID_TO_GET_USER_DETAILS_ERROR,
          payload: error.message,
        });
      });
  } catch (error) {
    dispatch({
      type: types.ID_TO_GET_USER_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};
