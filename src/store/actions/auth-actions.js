import * as actions from "../action_types";
import axios from "axios";
import { authenticationApi } from "../../Common/Api/apis-end-points";
import {
  authenticationRequestConfigs,
  authenticationRefreshToken,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import { newRequestListCount } from "./request-actions";
import Helper from "../../Common/Functions/history_logout";
const signinInit = () => {
  return {
    type: actions.SIGN_IN_INIT,
  };
};
const signinSuccess = (response, message) => {
  return {
    type: actions.SIGN_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const signinFail = (response, message) => {
  return {
    type: actions.SIGN_IN_FAIL,
    response: response,
    message: message,
  };
};
const refreshTokenInit = () => {
  return {
    type: actions.SIGN_IN_INIT,
  };
};
const refrshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
const refrshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};
const signIn = (UserData, history) => {
  var min = 10000;
  var max = 90000;
  var id = min + Math.random() * (max - min);
  let Data = {
    Password: UserData.Password,
    UserName: UserData.UserName,
    DeviceID: id.toString(),
    Device: "browser",
  };
  return (dispatch) => {
    dispatch(signinInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRequestConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response);
        window.localStorage.isMySessionActive = "false";
        if (response.data.responseResult.recordFound === true) {
          if (response.data.responseResult.roleID === 1) {
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            dispatch(
              signinSuccess(response.data.responseResult, "Login Successfully")
            );
            dispatch(newRequestListCount(response.data.responseResult.userID));
            console.log(response);
            history.push("/WofSecurityAdmin/Admin/AddEditUsers");
          } else {
            dispatch(
              signinFail(
                response.data.responseResult,
                "Not allowed to login with Current Role"
              )
            );
          }
        } else {
          dispatch(
            signinFail(
              response.data.responseResult,
              response.data.responseResult.recordMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const refreshToken = (props) => {
  let history = Helper.history;
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  return async (dispatch) => {
    console.log("after");
    // dispatch(refreshTokenInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        console.log(response.data.responseCode);
        // if (response.data.responseResult.recordFound === true) {
        if (response.data.responseCode === 200) {
          dispatch(
            refrshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
          console.log("update", response);
        } else {
          dispatch(
            refrshtokenFail(
              response.data.responseResult,
              "Your Session has expired"
            )
          );
          let message = "Your Session has expired";
          // history.push("/");
          console.log("logout");
          dispatch(signOut(history, message));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const signOut = (history, message) => {
  history.push("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

export { signIn, signOut, refreshToken };
