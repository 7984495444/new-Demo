import * as types from "../actionTypes";

const initialState = {
  addNotifications: null,
  getSendNotifications: null,
  getNotificationsSessionInfo: null,
  updateRefUserSession: null,
  closeAlert: null,
  errMsg: null,
  readSendNotification: null,
  addNotificationsNotShowAlert: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // add notifacations
    case types.SEND_SESSION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        addNotifications: action.payload,
        errMsg: null,
      };
    case types.SEND_SESSION_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    case types.SEND_ALERT_SESSION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        addNotificationsNotShowAlert: action.payload,
        errMsg: null,
      };
    case types.SEND_ALERT_SESSION_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get notifacations
    case types.GET_SESSION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        getSendNotifications: action.payload,
        errMsg: null,
      };
    case types.GET_SESSION_NOTIFICATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get edit session info
    case types.GET_NOTIFICATION_SESSION_INFO_SUCCESS:
      return {
        ...state,
        getNotificationsSessionInfo: action.payload,
        errMsg: null,
      };
    case types.GET_NOTIFICATION_SESSION_INFO_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get edit session info
    case types.UPDATE_REFUSER_SESSION_SUCCESS:
      return {
        ...state,
        updateRefUserSession: action.payload,
        errMsg: null,
      };
    case types.UPDATE_REFUSER_SESSION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // close alert
    case types.CLOSE_ALERT_SUCCESS:
      return {
        ...state,
        closeAlert: action.payload,
        errMsg: null,
      };
    case types.CLOSE_ALERT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // close alert
    case types.READ_SEND_REQUEST_SUCCESS:
      return {
        ...state,
        readSendNotification: action.payload,
        errMsg: null,
      };
    case types.READ_SEND_REQUEST_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    // read notification from todo list
    case types.READ_SEND_NOTIFICATION_TO_DO_LIST_SUCCESS:
      return {
        ...state,
        readSendNotification: action.payload,
        errMsg: null,
      };
    case types.READ_SEND_NOTIFICATION_TO_DO_LIST_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default notificationsReducer;
