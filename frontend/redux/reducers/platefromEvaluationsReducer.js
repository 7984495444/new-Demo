import * as types from "../actionTypes";

const initialState = {
  addPlatefromEvaluations: null,
  getPlatefromEvaluations: null,
  errMsg: null,
};

const followUpReducer = (state = initialState, action) => {
  switch (action.type) {
    // add PlatefromEvaluations
    case types.ADD_PLATEFROM_EVALUATION_SUCCESS:
      return {
        ...state,
        addPlatefromEvaluations: action.payload,
        errMsg: null,
      };
    case types.ADD_PLATEFROM_EVALUATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };

    // get PlatefromEvaluations
    case types.GET_PLATEFROM_EVALUATION_SUCCESS:
      return {
        ...state,
        getPlatefromEvaluations: action.payload,
        errMsg: null,
      };
    case types.GET_PLATEFROM_EVALUATION_ERROR:
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};
export default followUpReducer;
