import * as actions from "../action_types";
import axios from "axios";
import { authenticationApi } from "../../Common/Api/apis-end-points";
import {
  requestListCount,
  requestList,
  saveuserrequest,
  saveuserbysecurityadmin,
  rejectuserbysecurityadmin,
  getalluserdataforadmin,
  editUserDataForAdmin,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import Helper from "../../Common/Functions/history_logout";
import { refreshToken } from "../actions/auth-actions";

const newRequestListSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_FAIL,
    response: response,
    message: message,
  };
};
const newRequestListCountSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListCountFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_FAIL,
    response: response,
    message: message,
  };
};
const saveUserRequestSuccess = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};
const saveUserRequestFail = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_FAIL,
    response: response,
    message: message,
  };
};
// for save user
const saveUserBySecurityAdminInit = (response, message) => {
  return {
    type: actions.SAVE_USER_BY_SECURITY_LIST_INIT,
    response: response,
    message: message,
  };
};
const saveUserBySecurityAdminSuccess = (response, message) => {
  return {
    type: actions.SAVE_USER_BY_SECURITY_ADMIN_SUCCESS,
    response: response,
    message: message,
  };
};
const saveUserBySecurityAdminFail = (response, message) => {
  return {
    type: actions.SAVE_USER_BY_SECURITY_ADMIN_FAIL,
    response: response,
    message: message,
  };
};
// for Reject
const rejectUserBySecurityAdminInit = (response, message) => {
  return {
    type: actions.REJECT_USER_BY_SECURITY_LIST_INIT,
    response: response,
    message: message,
  };
};
const rejectUserBySecurityAdminSuccess = (response, message) => {
  return {
    type: actions.REJECT_USER_BY_SECURITY_ADMIN_SUCCESS,
    response: response,
    message: message,
  };
};
const rejectUserBySecurityAdminFail = (response, message) => {
  return {
    type: actions.REJECT_USER_BY_SECURITY_ADMIN_FAIL,
    response: response,
    message: message,
  };
};
// for get all user data
const getalluserdataInit = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_INIT,
    response: response,
    message: message,
  };
};
const getalluserdataSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_SUCCESS,
    response: response,
    message: message,
  };
};
const getalluserdataFail = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_FAIL,
    response: response,
    message: message,
  };
};
// for Edit user Data
const editUserInit = (response, message) => {
  return {
    type: actions.EDIT_USER_INIT,
    response: response,
    message: message,
  };
};
const editUserSuccess = (response, message) => {
  return {
    type: actions.EDIT_USER_SUCCESS,
    response: response,
    message: message,
  };
};
const editUserFail = (response, message) => {
  return {
    type: actions.EDIT_USER_FAIL,
    response: response,
    message: message,
  };
};
// APIS
const newRequestList = (UserData) => {
  let navigate = Helper.navigate;
  let Data = {
    UserID: UserData,
  };
  console.log("newRequestList", JSON.stringify(Data));
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("newRequestList", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(newRequestList(UserData));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              newRequestListSuccess(
                response.data.responseResult,
                response.data.responseResult.recordMessage
              )
            );
            //   history.push("/Admin/NewRequestList");
          } else {
            dispatch(
              newRequestListFail(
                response.data.responseResult,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            newRequestListFail(
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
const newRequestListCount = (UserData) => {
  let Data = {
    UserID: UserData,
  };
  console.log("newRequestListCount", Data);
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestListCount.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("newRequestListCount", response);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(newRequestListCount(UserData));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult.userRequestCount);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              newRequestListCountSuccess(
                response.data.responseResult,
                "Login Successfully"
              )
            );
          } else {
            dispatch(
              newRequestListCountFail(
                response.data.responseResult,
                "You are Not Authorized"
              )
            );
          }
        } else {
          dispatch(
            newRequestListCountFail(
              response.data.responseResult,
              "You are Not Authorized"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const saveUserRequest = (UserData, Status, comment, UserID) => {
  let Data = {
    UserID: UserID,
    UserRegistrationRequestID: UserData.userRegistrationRequestID,
    Status: Status,
    Comments: comment,
  };
  console.log(Data);
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", saveuserrequest.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(saveUserRequest(UserData, Status, comment, UserID));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data.responseResult.userRequestCount);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              saveUserRequestSuccess(
                response.data.responseResult,
                "Save Successfully"
              )
            );
          } else {
            dispatch(
              saveUserRequestFail(
                response.data.responseResult,
                "Data is not save"
              )
            );
          }
        } else {
          dispatch(
            saveUserRequestFail(
              response.data.responseResult,
              "Data is not save"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const saveUserBySecurityAdmin = (UserData) => {
  let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  let Data = {
    FirstName: UserData.firstName,
    LastName: UserData.lastName,
    UserReferenceCode: UserData.personalNumber,
    UserLDAPAccount: UserData.loginID,
    Email: UserData.email,
    UserRegistrationRequestID: UserData.userRegistrationRequestID,
    UserID: UserDetails.userID,
  };
  console.log(Data);
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(saveUserBySecurityAdminInit());
    let form = new FormData();
    form.append("RequestMethod", saveuserbysecurityadmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(saveUserBySecurityAdmin(UserData));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log("complete");
            await dispatch(
              saveUserBySecurityAdminSuccess(
                response.data.responseResult,
                "Save Successfully"
              )
            );
            dispatch(newRequestList(UserDetails.userID));
          } else {
            dispatch(
              saveUserBySecurityAdminFail(
                response.data.responseResult,
                "Data is not save"
              )
            );
            dispatch(newRequestList(UserDetails.userID));
          }
        } else {
          dispatch(
            saveUserBySecurityAdminFail(
              response.data.responseResult,
              "Data is not save"
            )
          );
          dispatch(newRequestList(UserDetails.userID));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const rejectUserBySecurityAdmin = (UserData, comments) => {
  let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  let Data = {
    UserRegistrationRequestID: UserData.userRegistrationRequestID,
    Comments: comments,
    UserID: UserDetails.userID,
  };
  console.log(Data);
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(rejectUserBySecurityAdminInit());
    let form = new FormData();
    form.append("RequestMethod", rejectuserbysecurityadmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(rejectUserBySecurityAdmin(UserData, comments));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log("complete reject", response.data);
            await dispatch(
              rejectUserBySecurityAdminSuccess(
                response.data.responseResult,
                "Reject Successfully"
              )
            );
            dispatch(newRequestList(UserDetails.userID));
          } else {
            dispatch(
              rejectUserBySecurityAdminFail(
                response.data.responseResult,
                "Data is not Reject"
              )
            );
            dispatch(newRequestList(UserDetails.userID));
          }
        } else {
          dispatch(
            rejectUserBySecurityAdminFail(
              response.data.responseResult,
              "Data is not Reject"
            )
          );
          dispatch(newRequestList(UserDetails.userID));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Get all user for edit api
const getAllUserData = (UserData) => {
  let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  console.log("UserDetails", UserData);
  let Data = {
    RequestingUserID: UserDetails.userID,
    FirstName: UserData.FirstName,
    Email: UserData.Email,
    LastName: UserData.LastName,
    UserLDAPAccount: UserData.LoginID,
    UserRoleID: UserData.UserRole,
    UserStatusID: UserData.UserStatus,
  };
  console.log(Data);
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(getalluserdataInit());
    let form = new FormData();
    form.append("RequestMethod", getalluserdataforadmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch("getAllUserData", getAllUserData(UserData));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log("complete all user data");
            await dispatch(
              getalluserdataSuccess(
                response.data.responseResult,
                "Record Found"
              )
            );
          } else {
            dispatch(
              getalluserdataFail(
                response.data.responseResult,
                "No Record Found"
              )
            );
          }
        } else {
          dispatch(
            getalluserdataFail(response.data.responseResult, "No Record Found")
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Edit user data
const editUser = (UserData, resetSearchData) => {
  console.log(UserData);
  // {"UserIdToEdit":1,"UserStatusID":1, "UserRoleID":1}
  let Data = {
    UserIdToEdit: UserData.LoginID,
    UserRoleID: UserData.SelectRole,
    UserStatusID: UserData.SelectStaus,
  };
  console.log(JSON.stringify(Data));
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(editUserInit());
    let form = new FormData();
    form.append("RequestMethod", editUserDataForAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("kk", response.data);
        if (response.data.responseCode === 417) {
          console.log("refresh");
          await dispatch(refreshToken());
          dispatch(getAllUserData(UserData));
          console.log("sync");
        } else if (response.data.responseCode === 200) {
          console.log(response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log("complete all user data");
            await dispatch(
              editUserSuccess(response.data.responseResult, "Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          } else {
            dispatch(
              editUserFail(response.data.responseResult, "No Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            editUserFail(response.data.responseResult, "No Record Found")
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  editUser,
  newRequestList,
  newRequestListCount,
  saveUserRequest,
  saveUserBySecurityAdmin,
  rejectUserBySecurityAdmin,
  getAllUserData,
};
