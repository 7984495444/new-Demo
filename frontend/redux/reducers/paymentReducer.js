import * as types from "../actionTypes";

const initialState = {
  allPaymentCard: null,
  paymentCardAdd: null,
  paymentCardEdit: null,
  paymentCardDelete: null,
  errMsg: null,
  // add payment
  addPymentDeducations: null,
  getAllPymentDeducations: null,
};

const tutorReducer = (state = initialState, action) => {
  switch (action.type) {
    // get payment card
    case types.GET_CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        allPaymentCard: action.payload,
        errMsg: null,
      };
    case types.GET_CARD_PAYMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // add payment card
    case types.ADD_CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentCardAdd: action.payload,
        errMsg: null,
      };
    case types.ADD_CARD_PAYMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // edit payment card
    case types.EDIT_CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentCardEdit: action.payload,
        errMsg: null,
      };
    case types.EDIT_CARD_PAYMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // detele payment card
    case types.DELETE_CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentCardDelete: action.payload,
        errMsg: null,
      };
    case types.DELETE_CARD_PAYMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // tutor add payment deductions
    case types.ADD_PAYMENT_DEDUCATIONS_SUCCESS:
      return {
        ...state,
        addPymentDeducations: action.payload,
        errMsg: null,
      };
    case types.ADD_PAYMENT_DEDUCATIONS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get all payment deductions
    case types.GET_ALL_PAYMENT_DEDUCATIONS_SUCCESS:
      return {
        ...state,
        getAllPymentDeducations: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_PAYMENT_DEDUCATIONS_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default tutorReducer;
