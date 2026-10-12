import * as actions from "../action_types";

const initialState = {
  data: null,
  isLoading: null,
  isSuccess: null,
  isFail: null,
  message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FIND_CUSTOMER_FROM_MISYS_INIT:
      return { ...state, isLoading: true };
    case actions.FIND_CUSTOMER_FROM_MISYS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.response.responseResult,
        isSuccess: true,
        isFail: false,
        message:action.response.responseResult.recordMessage !== undefined
          ? action.response.responseResult.recordMessage
          : "",
      };
    case actions.FIND_CUSTOMER_FROM_MISYS_FAIL:
      return {
        ...state,
        data: action.response.responseResult !== null
          ? action.response.responseResult
          : "",
        isLoading: false,
        isSuccess: false,
        isFail: true,
        message:action.response.responseResult.recordMessage
            ?action.response.responseResult.recordMessage
            : "",
      };
   case actions.RESET_STATE:
      return {
        ...state,
        // isLoading: false,
        isSuccess: false,
        isFail: false,
        message:"",
      };
    default:
      return state;
  }
};

export default reducer;
