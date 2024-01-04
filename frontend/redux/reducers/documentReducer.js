import * as types from "../actionTypes";

const initialState = {
  addTutorDocumnet: null,
  getAllTutorDocumnet: null,
  deleteTutorDocumnet: null,
  getDocumnetByName: null,
  errMsg: null,
};

const followUpReducer = (state = initialState, action) => {
  switch (action.type) {
    // add tutor documents
    case types.ADD_TUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        addTutorDocumnet: action.payload,
        errMsg: null,
      };
    case types.ADD_TUTOR_DOCUMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //get all tutor documents
    case types.GET_ALL_TUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        getAllTutorDocumnet: action.payload,
        errMsg: null,
      };
    case types.GET_ALL_TUTOR_DOCUMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //get all tutor documents
    case types.DELETE_TUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTutorDocumnet: action.payload,
        errMsg: null,
      };
    case types.DELETE_TUTOR_DOCUMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //update university tutor documents
    case types.UPDATE_UNIVERSICTY_TUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTutorDocumnet: action.payload,
        errMsg: null,
      };
    case types.UPDATE_UNIVERSICTY_TUTOR_DOCUMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //update all tutor documents
    case types.UPDATE_ALL_TUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTutorDocumnet: action.payload,
        errMsg: null,
      };
    case types.UPDATE_ALL_TUTOR_DOCUMENT_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    //get document by document name
    case types.GET_DOCUMENT_BY_NAME_SUCCESS:
      return {
        ...state,
        getDocumnetByName: action.payload,
        errMsg: null,
      };
    case types.GET_DOCUMENT_BY_NAME_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default followUpReducer;
