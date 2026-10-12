import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  SessionExpeireResponseMessage: "",
  isSignUp: false,
  departments: null,
  roles: null,
  Token: "",
  Refresh: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_IN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      localStorage.setItem("role", JSON.stringify(action.response.roleID));
      localStorage.setItem("UserDetails", JSON.stringify(action.response));
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: true,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SIGN_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_UP_SUCCESS:
      // localStorage.setItem("token", JSON.stringify(action.response.token));
      // localStorage.setItem("role", JSON.stringify(action.response.roleID));
      // localStorage.setItem("UserDetails", JSON.stringify(action.response));
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: true,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );

      console.log("token updates");
      return {
        ...state,
        // UserDetails: action.response,
        ResponseMessage: action.message,
        // change
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };
    case actions.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        SessionExpeireResponseMessage: action.message,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_OUT:
      // localStorage.removeItem("token");
      // localStorage.removeItem("role");
      // localStorage.removeItem("UserDetails");
      // localStorage.removeItem("wofCustomerMasterID");
      // localStorage.removeItem("parent");
      // localStorage.removeItem("child");
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        SessionExpeireResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default reducer;
