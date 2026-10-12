const _token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6ImZhaXNhbC5zaGFoIiwiVXNlclR5cGUiOiJVIiwiQWNjZXNzRHR0bSI6NjM3NjM2OTc2MDUzMjAyOTYzLCJEZXZpY2UiOiJQT1NUTUFOIiwiQXBwbGljYXRpb25JRCI6IkVSTSJ9.F-CixTix2MERIqVsO1CLoVVJrET_bMaScZReJAwdnRM";
const authenticationRequestConfigs = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};
const requestList = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequests",
};
const requestListCount = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};
const saveuserrequest = {
  _token: null,
  RequestMethod: "ServiceManager.SaveUserRequest",
};
const saveuserbysecurityadmin = {
  _token: null,
  RequestMethod: "ServiceManager.SaveUser",
};
const rejectuserbysecurityadmin = {
  _token: null,
  RequestMethod: "ServiceManager.RejectUserRequest",
};
const getalluserdataforadmin = {
  _token: null,
  RequestMethod: "ServiceManager.GetAllUsersList",
};
const editUserDataForAdmin = {
  _token: null,
  RequestMethod: "ServiceManager.EditUser",
};
const authenticationRefreshToken = {
  _token: null,
  RequestMethod: "ServiceManager.RefreshToken",
};
const findCustomerFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindCustomer",
};
const findCustomerAccountDetailsFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindAccountDetails",
};
const addWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.AddWriteOff",
};
const editWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.EditWriteOff",
};
const deleteWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteWriteOff",
};
const approvalsCountConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApprovalCount",
};
const approvalsConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApproval",
};
const viewApprovalHistoryConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};
const saveApprovalsConfig = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApproval",
};
const viewWriteOff = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewWriteOff",
};
const listOffWriteOff = {
  _token: _token,
  ListWriteOff: "ServiceManager.ListWriteOff",
  FindMyCases: "ServiceManager.FindMyCases",
};
const completeReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCompleteReport",
};
const creditPolicyReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCreditPolicyReport",
};
const balanceSheetReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowBalanceSheetReport",
};
const GetSetupFormConfigs = {
  _token: _token,
  GetBorrowerType: "ServiceManager.GetBorrowerType",
  GetAdvanceClassification: "ServiceManager.GetAdvanceClassification",
  GetManagementUnit: "ServiceManager.GetManagementUnit",
  GetNatureofCharge: "ServiceManager.GetNatureofCharge",
  GetNatureOfSecurity: "ServiceManager.GetNatureOfSecurity",
  GetWOFReason: "ServiceManager.GetWOFReason",
  GetApprovalReason: "ServiceManager.GetApprovalReason",
  GetRejectionReason: "ServiceManager.GetRejectionReason",
  GetApprovalFlow: "ServiceManager.GetApprovalFlow",
  GetApprovalFlowForEdit: "ServiceManager.GetApprovalFlowForEdit",
};
const PostSetupFormConfigs = {
  _token: _token,
  AddBorrowerType: "ServiceManager.AddBorrowerType",
  UpdateBorrowerType: "ServiceManager.UpdateBorrowerType",
  DeleteBorrowerType: "ServiceManager.DeleteBorrowerType",
  AddAdvanceClassification: "ServiceManager.AddAdvanceClassification",
  UpdateAdvanceClassification: "ServiceManager.UpdateAdvanceClassification",
  DeleteAdvanceClassification: "ServiceManager.DeleteAdvanceClassification",
  AddManagementUnit: "ServiceManager.AddManagementUnit",
  UpdateManagementUnit: "ServiceManager.UpdateManagementUnit",
  DeleteManagementUnit: "ServiceManager.DeleteManagementUnit",
  AddNatureofCharge: "ServiceManager.AddNatureofCharge",
  UpdateNatureofCharge: "ServiceManager.UpdateNatureofCharge",
  DeleteNatureofCharge: "ServiceManager.DeleteNatureofCharge",
  AddNatureOfSecurity: "ServiceManager.AddNatureOfSecurity",
  UpdateNatureOfSecurity: "ServiceManager.UpdateNatureOfSecurity",
  DeleteNatureOfSecurity: "ServiceManager.DeleteNatureOfSecurity",
  AddWOFReason: "ServiceManager.AddWOFReason",
  UpdateWOFReason: "ServiceManager.UpdateWOFReason",
  DeleteWOFReason: "ServiceManager.DeleteWOFReason",
  AddApprovalReason: "ServiceManager.AddApprovalReason",
  UpdateApprovalReason: "ServiceManager.UpdateApprovalReason",
  DeleteApprovalReason: "ServiceManager.DeleteApprovalReason",
  AddRejectionReason: "ServiceManager.AddRejectionReason",
  UpdateRejectionReason: "ServiceManager.UpdateRejectionReason",
  DeleteRejectionReason: "ServiceManager.DeleteRejectionReason",
  DeleteApprovalFlow: "ServiceManager.DeleteApprovalFlow",
  UpdateApprovalFlowForUser: "ServiceManager.UpdateApprovalFlowForUser",
  DeleteApprovalFlowForUser: "ServiceManager.DeleteApprovalFlowForUser",  
};
const SearchSetupFormConfigs = {
  _token: _token,
  SearchBorrowerType: "ServiceManager.SearchBorrowerType",
  SearchAdvanceClassification: "ServiceManager.SearchAdvanceClassification",
  SearchManagementUnit: "ServiceManager.SearchManagementUnit",
  SearchWOFReason: "ServiceManager.SearchWOFReason",
  SearchNatureofCharge: "ServiceManager.SearchNatureofCharge",
  SearchNatureOfSecurity: "ServiceManager.SearchNatureOfSecurity",
  SearchApprovalReason: "ServiceManager.SearchApprovalReason",
  SearchRejectionReason: "ServiceManager.SearchRejectionReason",
  SearchApprovalFlow: "ServiceManager.SearchApprovalFlow",
}
const completeReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CompleteReportExcel",
};
const creditReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CreditReportExcel",
};
const completeDownloadLoginHistoryReport = {
  _token: _token,
  RequestMethod: "LoginHistoryReportExcel",
};
const completeDownloadStatusWiseReport = {
  _token: _token,
  RequestMethod: "StatusWiseReportExcel",
};
const completeDownloadAccessDetailReport = {
  _token: _token,
  RequestMethod: "AccessDetailReportExcel",
};
const completeLastLoginReport = {
  _token: _token,
  RequestMethod: "LastLoginReportExcel",
};
const balanceReportExcelConfigs = {
  _token: _token,
  RequestMethod: "BalanceSheetReportExcel",
};
export {
  editUserDataForAdmin,
  completeDownloadLoginHistoryReport,
  completeDownloadAccessDetailReport,
  completeDownloadStatusWiseReport,
  completeLastLoginReport,
  requestList,
  getalluserdataforadmin,
  saveuserbysecurityadmin,
  rejectuserbysecurityadmin,
  requestListCount,
  saveuserrequest,
  authenticationRequestConfigs,
  authenticationRefreshToken,
  findCustomerFromMisysConfigs,
  findCustomerAccountDetailsFromMisysConfigs,
  addWriteOffConfigs,
  approvalsCountConfigs,
  approvalsConfigs,
  saveApprovalsConfig,
  viewWriteOff,
  listOffWriteOff,
  viewApprovalHistoryConfigs,
  completeReportConfigs,
  creditPolicyReportConfigs,
  editWriteOffConfigs,
  balanceSheetReportConfigs,
  deleteWriteOffConfigs,
  GetSetupFormConfigs,
  PostSetupFormConfigs,
  SearchSetupFormConfigs,
  completeReportExcelConfigs,
  creditReportExcelConfigs,
  balanceReportExcelConfigs
};