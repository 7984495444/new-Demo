import * as types from "../actionTypes";

const initialState = {
  addNotification: null,
  getNotifications: null,
  editNotifications: null,
  errMsg: null,
  closeAlert: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // add notifacations
    case types.ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        addNotification: action.payload,
        errMsg: null,
      };
    case types.ADD_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add notifacations
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        getNotifications: action.payload,
        errMsg: null,
      };
    case types.GET_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // edit notifacations
    case types.EDIT_NOTIFICATION_SUCCESS:
      return {
        ...state,
        editNotifications: action.payload,
        errMsg: null,
      };
    case types.EDIT_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};
export default notificationsReducer;
