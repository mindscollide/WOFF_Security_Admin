import * as actions from "../action_types";

const initialState = {
  userRequestCount: null,
  UserRequestDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST_LIST_SUCCESS:
      console.log("REQUEST_LIST_SUCCESS", action.response.userRequestList);
      
      return {
        ...state,
        UserRequestDetails: action.response.userRequestList,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
      case actions.REQUEST_LIST_FAIL:
        console.log("fail request")
        return {
          ...state,
          UserRequestDetails: null,
          isLoggedIn: false,
          Loading: false,
          ResponseMessage: action.message,
        };
    case actions.REQUEST_LIST_COUNT_SUCCESS:
      //   console.log("token updates", action.response.userRequestCount);
      return {
        ...state,
        userRequestCount: action.response.userRequestCount,
      };
    case actions.REQUEST_LIST_COUNT_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_BY_SECURITY_ADMIN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_BY_SECURITY_ADMIN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REJECT_USER_BY_SECURITY_ADMIN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REJECT_USER_BY_SECURITY_ADMIN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REJECT_USER_BY_SECURITY_LIST_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_USER_BY_SECURITY_LIST_INIT:
      return { ...state, Loading: true };
    case actions.GET_ALL_USER_DATA_INIT:
      return { ...state, Loading: true };
    case actions.GET_ALL_USER_DATA_SUCCESS:
      console.log(action.response);
      return {
        ...state,
        UserDetails: action.response.allUsers,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.GET_ALL_USER_DATA_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.EDIT_USER_INIT:
      return { ...state, Loading: true };
    case actions.EDIT_USER_SUCCESS:
      console.log(action.response);
      return {
        ...state,
        // UserDetails: action.response.allUsers,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.EDIT_USER_FAIL:
      return {
        ...state,
        // UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    default:
      return state;
  }
};

export default requestReducer;
