import * as actions from "../action_types";
import { refreshToken } from "../actions/auth-actions";
import axios from "axios";
import { WriteOffApi, ApprovalsApi } from "../../Common/Api/apis-end-points";
import {
  addWriteOffConfigs,
  viewWriteOff,
  listOffWriteOff,
  editWriteOffConfigs,
  deleteWriteOffConfigs,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
const addWriteOffInit = () => {
  return {
    type: actions.ADD_WRITE_OFF_INIT,
  };
};
const addWriteOffSuccess = (response) => {
  return {
    type: actions.ADD_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const addWriteOffFail = (response) => {
  return {
    type: actions.ADD_WRITE_OFF_FAIL,
    reponse: response,
  };
};
const addWriteOff = (object, history, setwofcode, setOpen) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(addWriteOffInit());
    let form = new FormData();
    console.log(object);
    form.append("RequestMethod", addWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token:token addWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addWriteOff(object, history, setwofcode, setOpen));
        } else if (response.data.responseCode === 200) {
          console.log(response.data);
          if (response.data.responseResult.recordFound === true) {
            console.log(response.data.responseResult);
            dispatch(addWriteOffSuccess(response.data.responseResult));

            history.replace("/Wof/DataEntryUser/ListWriteOff");
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            window.location.reload();

            setwofcode(response.data.responseResult.wofCode);
          } else {
            dispatch(addWriteOffFail(response.data.responseResult));
          }
        } else {
          dispatch(addWriteOffFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditWriteOffInit = () => {
  return {
    type: actions.EDIT_WRITE_OFF_INIT,
  };
};
const EditOffWriteOffSuccess = (response) => {
  return {
    type: actions.EDIT_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const EditOffWriteOffFail = (message) => {
  return {
    type: actions.EDIT_WRITE_OFF_FAIL,
    message: message,
  };
};
const EditWriteOff = (object, history, setOpen) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(EditWriteOffInit());
    console.log(object);
    let form = new FormData();
    form.append("RequestMethod", editWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: editWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(EditWriteOff(object, history, setOpen));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response);
            dispatch(EditOffWriteOffSuccess(response.data.responseResult));
            history.replace("/Wof/DataEntryUser/ListWriteOff");
            localStorage.setItem("parent", "sub1");
            localStorage.setItem("child", "1");
            window.location.reload();
          } else {
            console.log(response);
            dispatch(
              EditOffWriteOffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
            setOpen({
              open: true,
              message: "Record Not Updated",
            });
          }
        }
        dispatch(
          EditOffWriteOffFail(response.data.responseResult.recordMessage, true)
        );
        setOpen({
          open: true,
          message: response.data.responsedMessage,
        });
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteWriteOffInit = () => {
  return {
    type: actions.DELETE_WRITE_OFF_INIT,
  };
};
const DeleteWriteOffSuccess = () => {
  return {
    type: actions.DELETE_WRITE_OFF_SUCCESS,
  };
};
const DeleteWriteOffFail = () => {
  return {
    type: actions.DELETE_WRITE_OFF_FAIL,
  };
};
const DeleteWriteOff = (WOFCustomerMasterID, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(DeleteWriteOffInit());
    let postData = { WOFCustomerMasterID: WOFCustomerMasterID };
    let form = new FormData();
    form.append("RequestMethod", deleteWriteOffConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(postData));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: deleteWriteOffConfigs._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteWriteOff(WOFCustomerMasterID, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            console.log(response);
            dispatch(DeleteWriteOffSuccess());
            setIsModalVisible(false);
          } else {
            console.log(response);
            dispatch(DeleteWriteOffFail());
          }
        } else {
          console.log(response);
          dispatch(DeleteWriteOffFail(response.data.responsedMessage));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const viewWriteOffInit = () => {
  return {
    type: actions.VIEW_WRITE_OFF_INIT,
  };
};
const viewWriteOffSuccess = (response) => {
  return {
    type: actions.VIEW_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const viewWriteOffFail = (message) => {
  return {
    type: actions.VIEW_WRITE_OFF_FAIL,
    message: message,
  };
};
const NullState = () => {
  return {
    type: actions.NULL_STATE,
  };
};
const ViewWriteOff = (WOFCustomerMasterID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(viewWriteOffInit());
    const PostData = { WOFCustomerMasterID: WOFCustomerMasterID };
    let form = new FormData();
    console.log(PostData);
    form.append("RequestMethod", viewWriteOff.RequestMethod);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: WriteOffApi,
      data: form,
      headers: {
        // _token: viewWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ViewWriteOff(WOFCustomerMasterID));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            let Data = response.data.responseResult;
            dispatch(viewWriteOffSuccess(Data));
          } else {
            dispatch(
              viewWriteOffFail(response.data.responseResult.recordMessage, true)
            );
          }
        } else {
          dispatch(viewWriteOffFail(response.data.responseMessage, true));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ListOffWriteOffInit = () => {
  return {
    type: actions.LIST_WRITE_OFF_INIT,
  };
};
const ListOffWriteOffSuccess = (response) => {
  return {
    type: actions.LIST_WRITE_OFF_SUCCESS,
    response: response,
  };
};
const ListOffWriteOffFail = (message) => {
  return {
    type: actions.LIST_WRITE_OFF_FAIL,
    message: message,
  };
};
const ListOfWriteOff = (UserID, DayRangeID, SearchTerm) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(ListOffWriteOffInit());
    let PostData = {
      UserID: UserID,
      DayRangeID: DayRangeID,
      SearchTerm: `${SearchTerm}`,
    };
    let form = new FormData();
    form.append("RequestMethod", listOffWriteOff.ListWriteOff);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(ListOfWriteOff(UserID, DayRangeID, SearchTerm));
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOffWriteOffSuccess(response.data.responseResult.listCases)
            );
          } else {
            dispatch(
              ListOffWriteOffFail(
                response.data.responseResult.recordMessage,
                true
              )
            );
          }
        } else {
          dispatch(ListOffWriteOffFail(response.data.responseMessage, true));
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ListOfPendingAndApprovedCasesSuccess = (response) => {
  return {
    type: actions.LIST_OFF_PENDING_AND_APPROVED_CASES_SUCCESS,
    response: response,
  };
};
const ListOfPendingAndApprovedCasesFail = (response, message) => {
  return {
    type: actions.LIST_OFF_PENDING_AND_APPROVED_CASES_FAIL,
    response: response,
    message: message,
  };
};
const ListOfPendingAndApprovedCases = (
  UserID,
  SearchTerm,
  TypeOfCase,
  filter
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      UserID: UserID,
      SearchTerm: `${SearchTerm}`,
      TypeOfCases: TypeOfCase,
      DayRangeID: filter,
    };
    let form = new FormData();
    form.append("RequestMethod", listOffWriteOff.FindMyCases);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: ApprovalsApi,
      data: form,
      headers: {
        // _token: listOffWriteOff._token,
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            ListOfPendingAndApprovedCases(
              UserID,
              SearchTerm,
              TypeOfCase,
              filter
            )
          );
        } else if (response.data.responseCode === 200) {
          console.log(response);
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ListOfPendingAndApprovedCasesSuccess(
                response.data.responseResult.pendingCases
              )
            );
          } else {
            dispatch(
              ListOfPendingAndApprovedCasesFail(
                response.data.responseResult.pendingCases,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            ListOfPendingAndApprovedCasesFail(
              response.data.responseResult,
              response.data.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        console.log(response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};
const ShowNotification = (response) => {
  return {
    type: actions.SHOW,
  };
};
export {
  addWriteOff,
  EditWriteOff,
  DeleteWriteOff,
  ViewWriteOff,
  ListOfWriteOff,
  ShowNotification,
  HideNotification,
  ListOfPendingAndApprovedCases,
  NullState,
};
