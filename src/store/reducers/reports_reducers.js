import * as actions from "../action_types";

const initialState = {
  completeReport: [],
  creditPoliocyReport: [],
  balanceSheetReport: [],
  isLoading: null,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
  isRecordFound: false,
  recordMessage: "",
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLETE_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.COMPLETE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: action.response.responseResult.allIndividualCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.COMPLETE_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: action.response.responseResult,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:
          action.response.responseResult.recordMessagessage !== undefined
            ? action.response.responseResult.recordMessagessage
            : action.response.responseMessage,
      };
    case actions.CREDIT_POLICY_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case actions.CREDIT_POLICY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        creditPoliocyReport: action.response.responseResult.companyWiseCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.CREDIT_POLICY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage:
          action.response.responseResult.recordMessagessage !== undefined
            ? action.response.responseResult.recordMessagessage
            : action.response.responseMessage,
      };
    case actions.BALANCE_SHEET_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.BALANCE_SHEET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        balanceSheetReport: action.response.responseResult.balanceSheetRecords,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.BALANCE_SHEET_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        balanceSheetReport:
          action.response.responseResult.recordMessagessage !== undefined
            ? action.response.responseResult.recordMessagessage
            : action.response.responseMessage,
      };
    default:
      return state;
  }
};

export default reportsReducer;
