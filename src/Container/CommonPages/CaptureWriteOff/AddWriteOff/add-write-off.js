import React, { useEffect, useState, useRef } from "react";
import { Grid, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Typography, Radio } from "antd";
import moment from "moment"
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  NumberFormatCustom,
  FormattedInputs
} from "../../../../Components/Elements";
import SaveRecord from "../../../../Components/CommonComponents/CaptureWriteOff/save-record";
import { useSelector, useDispatch } from "react-redux";
import { findCustomerFromMysis, ResetState } from "../../../../store/actions/find-customer-from-misys-actions";
import {
  GetBorrowerType,
  GetAdvanceClassification,
  GetManagementUnit,
  GetNatureofCharge,
  GetNatureOfSecurity,
  GetWOFReason,
} from "../../../../store/actions/setup-forms-actions";
import { findCustomerAccountDetailsFromMysis } from "../../../../store/actions/find-customer-account-details-from-mysis-actions";
import {
  demoaccountdetails,
  demoforadditionaldetails,
  DemoForConsolidate,
  demoforrecoverysection,
  demoforcollateral,
} from "./dummy";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter
} from "../../../../Common/Functions/date-formatter";
const AddWriteOff = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [misysError, setMisysError] = useState(false);
  const [misysErrMsg, setMisysErrMsg] = useState("");
  const [enableRadio, setEnableRadio] = useState(true);
  const [openApproval, setOpenApproval] = useState(false);
  const [openWriteoff, setOpenWriteoff] = useState(false);
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const state = useSelector((state) => state);
  const { findCustomerFromMisys, findCustomerAccountDetailsFromMisys, setupForms } = state;

  const [wofcode, setwofcode] = useState("");
  const [accountNumbersFromStore, setAccountNumbersFromStore] = useState(null);
  const [goToSave, setGoToSave] = useState(false);
  const [ButtonText, setButtonText] = useState("Add Record");
  const [consolidateCalculatorBox, setConsolidateCalculatorBox] = useState({
    ABNSOutstandingPrincipal: 0,
    ABNSOutstandingNominal: 0,
    ABNSOutstandingNonAccural: 0,
    ABNSOtherCharges: 0,
    ABNSPenalInterest: 0,
    ABNSTotal: 0,
    APBSOutstandingPrincipal: 0,
    APBSOutstandingNominal: 0,
    APBSOutstandingNonAccural: 0,
    APBSOtherCharges: 0,
    APBSPenalInterest: 0,
    APBSTotal: 0,
    FRAPrincipal: 0,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  const [misysSection, setMisysSection] = useState({
    MisysCode: null,
    NPLCode: null,
    BorrowerName: null,
    AddressOfBorrower: null,
    NTNNumber: null,
    ManagementUnitID: null,
    SCode: null,
    SDescription: null,
    BorrowerTypeID: null,
    iParty: null,
  });
  const [sponsorOwnerDetail, setSponsorOwnerDetail] = useState([
    {
      DirectorTypeID: null,
      DirectorName: null,
      CNIC: null,
      FatherHusband: null,
      Address: null,
    },
  ]);
  const [AccountNumber, setAccountNumber] = useState("Select...");
  const [AccountSection, setAccountSection] = useState([]);
  const [allinput, setallinput] = useState(false)
  const [AccountDetails, setAccountDetails] = useState({
    FacCode: null,
    FacName: null,
    LRAmount: null,
    LRDate: "",
    BranchCode: "",
    BranchName: "",
    RegionCode: "",
    RegionName: "",
    ABNSOutstandingPrincipal: 0,
    ABNSOutstandingNominal: 0,
    ABNSOutstandingNonAccural: 0,
    ABNSOtherCharges: 0,
    ABNSPenalInterest: 0,
    ABNSTotal: 0,
    APBSOutstandingPrincipal: 0,
    APBSOutstandingNominal: 0,
    APBSOutstandingNonAccural: 0,
    APBSOtherCharges: 0,
    APBSPenalInterest: 0,
    APBSTotal: 0,
    FRAPrincipal: 0,
    FRANominated: 0,
    FRANonAccural: 0,
    FRAOtherCharges: 0,
    FRAPenalInterest: 0,
    FRATotal: 0,
  });
  const [additionalDetailsSection, setAdditionalDetailsSection] = useState({
    AdvanceClassificationID: "Loss",
    ChargeOfType: 1,
    ApprovalNumber: null,
    DateOfApproval: null,
    DateOfWriteoff: null,
    WriteOffReason: null,
    Remarks: -1,
  });

  const [collateralSection, setCollateralSection] = useState({
    NatureOfSecurity: null,
    NatureOfCharge: null,
    FSValue: null,
    DateOfValuation: null,
    SaleOfSecurity: null,
    DetailsOfSecurity: null,
    ChangeInSecurity: null,
    SecuritybyBankAtWriteOff: null,
    PledgeLifted: 3,
    ABInitioLevel: 3,
    WillfullDefaulter: 3,
    RightOfRecovery: 3,
  });

  const [recoveryWriteOffSection, setRecoveryWriteOffSection] = useState({
    DateOfRecovery: null,
    Principal: 0,
    Nominated: 0,
    Nonaccural: 0,
    OtherCharges: 0,
    PenalInterest: 0,
    Total: 0,
  });
  const [FinalDetails, setFinalDetails] = useState({});
  const misysSearchHandler = () => {
    setwofcode("");
    setConsolidateCalculatorBox(DemoForConsolidate);
    setAccountNumber("Select...");
    setAccountSection([]);
    setAccountDetails(demoaccountdetails);
    setAdditionalDetailsSection(demoforadditionaldetails);
    setRecoveryWriteOffSection(demoforrecoverysection);
    setCollateralSection(demoforcollateral);
    dispatch(
      findCustomerFromMysis(
        misysSection.MisysCode,
        setMisysSection,
        setAccountNumbersFromStore,
        setRecoveryWriteOffSection,
        recoveryWriteOffSection,
        setAdditionalDetailsSection,
        additionalDetailsSection,
        setSponsorOwnerDetail,
        setupForms.BorrowerTypes
      )
    );
  };
  const misysSectionHandler = (e, val) => {
    let id = e.target.id;
    let name = e.target.name;
    let value = e.target.value;
    if (id.includes("ManagementUnitID")) {
      setMisysSection({ ...misysSection, ["ManagementUnitID"]: val.title });
    } else if (id.includes("BorrowerTypeID")) {
      setMisysSection({ ...misysSection, ["BorrowerTypeID"]: val.title });
    }
    else {
      setMisysSection({ ...misysSection, [name]: value });
    }
  };
  const NTNnumberHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "NTNNumber" && Number(value)) {
      setMisysSection({ ...misysSection, [name]: value });
    }
    else {
      setMisysSection({ ...misysSection, [name]: "" });
    }
  }
  const AcountSelection = (e, val) => {
    if (val !== "No Data Found") {
      setAccountNumber(val);
      let index = AccountSection.findIndex((x) => x.AccountNumber === val);
      if (index === -1) {
        setButtonText("Add Record");
        dispatch(
          findCustomerAccountDetailsFromMysis(
            val,
            misysSection.MisysCode,
            setAccountDetails,
            AccountDetails,
            setRecoveryWriteOffSection,
            recoveryWriteOffSection,

          )
        );
      } else {
        setButtonText("Update Record");
        setAccountDetails(AccountSection[index].AccountDetails);
      }
    } else {
      console.log(val);
    }
  };
  const AccountDetailsHandler = (e) => {
    if (e.target.name == "LRDate" && e.target.value !== "") {
      setAccountDetails({
        ...AccountDetails,
        [e.target.name]: DateSendingFormat(e.target.value),
      });
    }
    else {
      setAccountDetails({ ...AccountDetails, [e.target.name]: e.target.value });
    }
  };
  const CodeHandler = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAccountDetails({
        ...AccountDetails,
        [e.target.name]: (e.target.value),
      });
    }
  }
  const calculatorBoxhandler = (e) => {
    if (AccountNumber !== "") {
      if (String(Number(e.target.value)).length <= 17) {
        setAccountDetails({
          ...AccountDetails,
          [e.target.name]: NumberFormater(e.target.value),
        });
      }
      else {
        setOpen({
          open: true,
          message: "Limit Exceed",
        })
      }
    } else {
      setOpen({
        open: true,
        message: "Please Select An Account Number",
      })
    }
  };
  // CheckAccountAvailablity()
  const AddRecordHandler = () => {
    if (AccountNumber !== "" && AccountNumber !== "Select...") {
      let {input, input1, input2, input3, input4, input5 } = CheckAllInput()
      console.log(input,input1, input2, input3, input4, input5)
      if (input && input1 && input2 && input3 && input4 && input5) {
        CheckAccountAvailablity(true)
        setButtonText("Update Record");
      }
      else {
        CheckAccountAvailablity(false)
      }

    } else {
      setOpen({
        ...open,
        open: true,
        message: "Select Account Number First"
      })
    }

  };
  const CheckAllInput = () => {
    var input = true
    var input1 = true
    var input2 = true
    var input3 = true
    var input4 = true
    var input5 = true
    // if (AccountDetails.FRAPrincipal>0 && AccountDetails.ABNSOutstandingPrincipal ==0) {
    //   input = false
    //   setOpen({
    //     ...open,
    //     open: true,
    //     message: "Amount Before Negotiated Principal cannot be Zero"
    //   })
    // }
    if (AccountDetails.FRAPrincipal > 0 && AccountDetails.ABNSOutstandingPrincipal >= AccountDetails.FRAPrincipal) {
      input1 = true
    }
    else if (AccountDetails.ABNSOutstandingPrincipal < AccountDetails.FRAPrincipal) {
      input1 = false
      console.log("1st", false)
      setOpen({
        ...open,
        open: true,
        message: "Negotiated Principal Should be Greater than The Relief Principal"
      })
    }
    if (AccountDetails.FRANominated > 0 && AccountDetails.ABNSOutstandingNominal >= AccountDetails.FRANominated) {
      input2 = true
    }
    else if (AccountDetails.ABNSOutstandingNominal < AccountDetails.FRANominated) {
      input2 = false
      console.log("2nd", false)
      setOpen({
        ...open,
        open: true,
        message: "Amount Before Negotiated Principal Outstanding Nominated cannot be Less than Financial Relief Allowed Nominated"
      })
    }
    if (AccountDetails.FRANonAccural > 0 && AccountDetails.ABNSOutstandingNonAccural >= AccountDetails.FRANonAccural) {
      input3 = true
    }
    else if (AccountDetails.ABNSOutstandingNonAccural < AccountDetails.FRANonAccural) {
      input3 = false
      console.log("3rd", false)
      setOpen({
        ...open,
        open: true,
        message: "Amount Before Negotiated Principal Outstanding Non-Accrual cannot be Less than Financial Relief Allowed Non-Accrual"
      })
    }
    if (AccountDetails.FRAOtherCharges > 0 && AccountDetails.ABNSOtherCharges >= AccountDetails.FRAOtherCharges) {
      input4 = true
    }
    else if (AccountDetails.ABNSOtherCharges < AccountDetails.FRAOtherCharges) {
      input4 = false
      console.log("4rth", false)
      setOpen({
        ...open,
        open: true,
        message: "Amount Before Negotiated Principal Other Charges cannot be Less than Financial Relief Allowed Other Charges"
      })
    }
    if (AccountDetails.FRAPenalInterest > 0 && AccountDetails.ABNSPenalInterest >= AccountDetails.FRAPenalInterest) {
      input5 = true
    }
    else if (AccountDetails.ABNSPenalInterest < AccountDetails.FRAPenalInterest) {
      input5 = false
      console.log("5th", false)
      setOpen({
        ...open,
        open: true,
        message: "Amount Before Negotiated Principal Penal Interest cannot be Less than Financial Relief Allowed Penal Interest"
      })
    }

    return { input,input1, input2, input3, input4, input5 }
  }
  const CheckAccountAvailablity = (flag) => {
    let PreviousAccounts = [...AccountSection];
    let index = PreviousAccounts.findIndex(
      (x) => x.AccountNumber === AccountNumber
    );
    console.log(flag)
    if (flag == true && allinput == true) {
      if (index === -1) {
        PreviousAccounts.push({
          AccountNumber: AccountNumber,
          AccountDetails: AccountDetails,
        });
        setAccountSection(PreviousAccounts);
      }
      else {
        PreviousAccounts[index].AccountNumber = AccountNumber;
        PreviousAccounts[index].AccountDetails = AccountDetails;
        setAccountSection(PreviousAccounts);
      }
    }
    // else{
    //   setOpen({
    //     ...open,
    //     open:true,
    //     message:"SomeThing Went Wrong Record Not Save"
    //   })
    // }

  };
  const ConsolidateCalculation = () => {
    let ConsolidateBoxes = {
      ABNSOutstandingPrincipal: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingPrincipal
      ).reduce((a, b) => a + b, 0),
      ABNSOutstandingNominal: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingNominal
      ).reduce((a, b) => a + b, 0),
      ABNSOutstandingNonAccural: AccountSection.map(
        (data) => data.AccountDetails.ABNSOutstandingNonAccural
      ).reduce((a, b) => a + b, 0),
      ABNSOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.ABNSOtherCharges
      ).reduce((a, b) => a + b, 0),
      ABNSPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.ABNSPenalInterest
      ).reduce((a, b) => a + b, 0),
      ABNSTotal: AccountSection.map(
        (data) => data.AccountDetails.ABNSTotal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingPrincipal: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingPrincipal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingNominal: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingNominal
      ).reduce((a, b) => a + b, 0),
      APBSOutstandingNonAccural: AccountSection.map(
        (data) => data.AccountDetails.APBSOutstandingNonAccural
      ).reduce((a, b) => a + b, 0),
      APBSOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.APBSOtherCharges
      ).reduce((a, b) => a + b, 0),
      APBSPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.APBSPenalInterest
      ).reduce((a, b) => a + b, 0),
      APBSTotal: AccountSection.map(
        (data) => data.AccountDetails.APBSTotal
      ).reduce((a, b) => a + b, 0),
      FRAPrincipal: AccountSection.map(
        (data) => data.AccountDetails.FRAPrincipal
      ).reduce((a, b) => a + b, 0),
      FRANominated: AccountSection.map(
        (data) => data.AccountDetails.FRANominated
      ).reduce((a, b) => a + b, 0),
      FRANonAccural: AccountSection.map(
        (data) => data.AccountDetails.FRANonAccural
      ).reduce((a, b) => a + b, 0),
      FRAOtherCharges: AccountSection.map(
        (data) => data.AccountDetails.FRAOtherCharges
      ).reduce((a, b) => a + b, 0),
      FRAPenalInterest: AccountSection.map(
        (data) => data.AccountDetails.FRAPenalInterest
      ).reduce((a, b) => a + b, 0),
      FRATotal: AccountSection.map(
        (data) => data.AccountDetails.FRATotal
      ).reduce((a, b) => a + b, 0),
    };
    setConsolidateCalculatorBox(ConsolidateBoxes);
  };
  const addDetailsSectionHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("AdvanceClassificationID")) {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ["AdvanceClassificationID"]: val.title,
      });
    } else if (id && id.includes("WriteOffReason")) {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ["WriteOffReason"]: val.title,
      });
    } else if (name == "DateOfApproval" && value !== "") {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: DateSendingFormat(value),
      });
    } else if (name == "DateOfWriteoff" && value !== "") {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: DateSendingFormat(value),
      });
    } else {
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        [name]: value,
      });
    }
  };

  const collateralSectionHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    if (id && id.includes("NatureOfSecurity")) {
      setCollateralSection({
        ...collateralSection,
        ["NatureOfSecurity"]: val.title,
      });
    } else if (id && id.includes("NatureOfCharge")) {
      setCollateralSection({
        ...collateralSection,
        ["NatureOfCharge"]: val.title,
      });
    } else if (name == "DateOfValuation" && value !== "") {
      setCollateralSection({
        ...collateralSection,
        [name]: DateSendingFormat(value),
      });
    } else {
      setCollateralSection({
        ...collateralSection,
        [name]: value,
      });
    }
  };
  const ColleteralNumberField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(parseInt(value)).length <= 17) {
      setCollateralSection({
        ...collateralSection,
        [name]: NumberFormater(value),
      });
    }
  }
  const recoveryWriteOffSectionHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "DateOfRecovery") {
      setRecoveryWriteOffSection({
        ...recoveryWriteOffSection,
        [name]: value !== "" ? DateSendingFormat(value) : "",
      });
    }
  };
  const recoveryNumberField = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (String(Number(value)).length <= 17) {
      setRecoveryWriteOffSection({
        ...recoveryWriteOffSection,
        [name]: NumberFormater(value),
      });
    }
  }
  const goToSaveHandler = (e) => {
    e.preventDefault();
    setMisysSection({ ...misysSection });
    setAccountSection([...AccountSection]);
    setAccountDetails({ ...AccountDetails });
    setAdditionalDetailsSection({ ...additionalDetailsSection });
    setCollateralSection({ ...collateralSection });
    setRecoveryWriteOffSection({ ...recoveryWriteOffSection });
    if (misysSection) {
      let index1 = setupForms.ManagementUnits.findIndex(x => x.title === misysSection.ManagementUnitID)
      misysSection.ManagementUnitID = setupForms.ManagementUnits[index1].id;
      let index2 = setupForms.BorrowerTypes.findIndex(x => x.title === misysSection.BorrowerTypeID)
      misysSection.BorrowerTypeID = setupForms.BorrowerTypes[index2].id;
      // this code is for validating if user has left fields empty
      if (misysSection.NPLCode == null) {
        misysSection.NPLCode = "";
      }
      if (misysSection.NTNNumber == null) {
        misysSection.NTNNumber = "";
      }
      if (misysSection.SCode == null) {
        misysSection.SCode = "";
      }
      if (misysSection.SDescription == null) {
        misysSection.SDescription = "";
      }
    }
    if (AccountDetails) {
      if (AccountDetails.BranchCode == null) {
        AccountDetails.BranchCode = 0;
      }
      if (AccountDetails.LRDate == null) {
        AccountDetails.LRDate = "18000101";
      }
      if (AccountDetails.LRAmount == null) {
        AccountDetails.LRAmount = 0;
      }
    }
    if (additionalDetailsSection) {
      let index3 = setupForms.ClassificationOfAdvances.findIndex(x => x.title === additionalDetailsSection.AdvanceClassificationID)
      let index4 = setupForms.WOFReasons.findIndex(x => x.title === additionalDetailsSection.WriteOffReason)
      additionalDetailsSection.AdvanceClassificationID = setupForms.ClassificationOfAdvances[index3].id;
      additionalDetailsSection.WriteOffReason = setupForms.WOFReasons[index4].id;;
      if (additionalDetailsSection.ApprovalNumber == null) {
        additionalDetailsSection.ApprovalNumber = "";
      }
      if (additionalDetailsSection.Remarks == null) {
        additionalDetailsSection.Remarks = 1;
      }
    }
    if (collateralSection) {
      let index5 = setupForms.NatureofCharges.findIndex(x => x.title === collateralSection.NatureOfCharge)
      let index6 = setupForms.NatureOfSecuritys.findIndex(x => x.title === collateralSection.NatureOfSecurity)
      collateralSection.NatureOfCharge = setupForms.NatureofCharges[index5].id;
      collateralSection.NatureOfSecurity = setupForms.NatureOfSecuritys[index6].id;
      if (collateralSection.DateOfValuation == null) {
        collateralSection.DateOfValuation = "18000101";
      }
      if (collateralSection.FSValue == null) {
        collateralSection.FSValue = 0;
      }

      if (collateralSection.SaleOfSecurity == null) {
        collateralSection.SaleOfSecurity = 0;
      }
      if (collateralSection.DetailsOfSecurity == null) {
        collateralSection.DetailsOfSecurity = "";
      }
      if (collateralSection.ChangeInSecurity == null) {
        collateralSection.ChangeInSecurity = "";
      }
      if (collateralSection.SecuritybyBankAtWriteOff == null) {
        collateralSection.SecuritybyBankAtWriteOff = "";
      }
    }

    if (recoveryWriteOffSection) {
      if (recoveryWriteOffSection.DateOfRecovery == null) {
        recoveryWriteOffSection.DateOfRecovery = "18000101"
      }
    }

    var FinalObject = {
      MisysCode: misysSection.MisysCode,
      NPLCode: misysSection.NPLCode,
      BorrowerName: misysSection.BorrowerName,
      AddressOfBorrower: misysSection.AddressOfBorrower,
      NTNNumber: misysSection.NTNNumber,
      ManagementUnitID: misysSection.ManagementUnitID,
      SCode: misysSection.SCode,
      SDescription: misysSection.SDescription,
      BorrowerTypeID: misysSection.BorrowerTypeID,
      IParty: misysSection.iParty,
      Consolidated: consolidateCalculatorBox,
      Accounts: AccountSection,
      AdditionalDetails: additionalDetailsSection,
      Collateral: collateralSection,
      RecoveryAfterWriteOff: recoveryWriteOffSection,
      SponsorOwnerDetail: sponsorOwnerDetail
    };
    if (
      additionalDetailsSection.Remarks !== null &&
      collateralSection.ABInitioLevel !== null &&
      collateralSection.PledgeLifted !== null &&
      collateralSection.WillfullDefaulter !== null &&
      collateralSection.RightOfRecovery !== null
    ) {
      if (additionalDetailsSection.DateOfApproval == null || additionalDetailsSection.DateOfApproval == "") {
        setOpenApproval((prev) => !prev);
      }
      else if (additionalDetailsSection.DateOfWriteoff == null || additionalDetailsSection.DateOfWriteoff == "") {
        setOpenWriteoff((prev) => !prev)
      }
      else {
        if (FinalObject.Accounts.length !== 0) {
          setFinalDetails(FinalObject);
          setGoToSave(!goToSave);
        }
        else {
          setOpen({
            ...open,
            open: true,
            message: " Please Add atleast One Account Number"
          })
        }
      }
    } else {
      console.log("Please Fill All Fields Correctly");
    }

  };
  useEffect(() => {
    ConsolidateCalculation();
  }, [AccountSection]);
  useEffect(() => {
    ConsolidateCalculation();
  }, [AccountDetails]);
  // this use Effect is for charge of
  useEffect(() => {
    if (additionalDetailsSection.AdvanceClassificationID === "Charged Off") {
      setEnableRadio(false);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 2,
      });
    } else if (
      additionalDetailsSection.AdvanceClassificationID !== "Charged Off"
    ) {
      setEnableRadio(true);
      setAdditionalDetailsSection({
        ...additionalDetailsSection,
        ChargeOfType: 1,
      });
    }
  }, [additionalDetailsSection.AdvanceClassificationID]);
  // use effect to calculate total of recovery
  useEffect(() => {
    let myTotal =
    (!isNaN(recoveryWriteOffSection.Principal) ?  recoveryWriteOffSection.Principal : 0) +
    (!isNaN(recoveryWriteOffSection.Nominated)?recoveryWriteOffSection.Nominated:0) +
    (!isNaN(recoveryWriteOffSection.OtherCharges)?recoveryWriteOffSection.OtherCharges:0) +
    (!isNaN(recoveryWriteOffSection.PenalInterest) ?recoveryWriteOffSection.PenalInterest:0 )+
    (!isNaN(recoveryWriteOffSection.Nonaccural)?recoveryWriteOffSection.Nonaccural:0);
    setRecoveryWriteOffSection({
      ...recoveryWriteOffSection,
      Total: myTotal,
    });
  }, [
    recoveryWriteOffSection.Principal,
    recoveryWriteOffSection.Nominated,
    recoveryWriteOffSection.OtherCharges,
    recoveryWriteOffSection.PenalInterest,
    recoveryWriteOffSection.Nonaccural,
  ]);
  useEffect(() => {
    let myTotal =
      (!isNaN(AccountDetails.ABNSOutstandingPrincipal) ? AccountDetails.ABNSOutstandingPrincipal : 0) +
      (!isNaN(AccountDetails.ABNSOutstandingNominal)?AccountDetails.ABNSOutstandingNominal:0) +
      (!isNaN(AccountDetails.ABNSOutstandingNonAccural)?AccountDetails.ABNSOutstandingNonAccural:0) +
      (!isNaN(AccountDetails.ABNSOtherCharges) ?AccountDetails.ABNSOtherCharges:0 )+
      (!isNaN(AccountDetails.ABNSPenalInterest)?AccountDetails.ABNSPenalInterest:0);
    setAccountDetails({
      ...AccountDetails,
      ABNSTotal: myTotal,
    });
  }, [
    AccountDetails.ABNSOutstandingPrincipal,
    AccountDetails.ABNSOutstandingNominal,
    AccountDetails.ABNSOutstandingNonAccural,
    AccountDetails.ABNSOtherCharges,
    AccountDetails.ABNSPenalInterest,
  ]);
  useEffect(() => {
    let myTotal =
      (!isNaN(AccountDetails.APBSOutstandingPrincipal) ? AccountDetails.APBSOutstandingPrincipal : 0) +
      (!isNaN(AccountDetails.APBSOutstandingNominal)?AccountDetails.APBSOutstandingNominal:0) +
      (!isNaN(AccountDetails.APBSOutstandingNonAccural)?AccountDetails.APBSOutstandingNonAccural:0) +
      (!isNaN(AccountDetails.APBSOtherCharges) ?AccountDetails.APBSOtherCharges:0 )+
      (!isNaN(AccountDetails.APBSPenalInterest)?AccountDetails.APBSPenalInterest:0);
      console.log(myTotal)
    setAccountDetails({
      ...AccountDetails,
      APBSTotal: myTotal,
    });
  }, [
    AccountDetails.APBSOutstandingPrincipal,
    AccountDetails.APBSOutstandingNominal,
    AccountDetails.APBSOutstandingNonAccural,
    AccountDetails.APBSOtherCharges,
    AccountDetails.APBSPenalInterest,
  ]);
  useEffect(() => {
    let myTotal =
    (!isNaN(AccountDetails.FRAPrincipal) ? AccountDetails.FRAPrincipal : 0) +
    (!isNaN(AccountDetails.FRANominated)?AccountDetails.FRANominated:0) +
    (!isNaN(AccountDetails.FRANonAccural)?AccountDetails.FRANonAccural:0) +
    (!isNaN(AccountDetails.FRAPenalInterest) ?AccountDetails.FRAPenalInterest:0 )+
    (!isNaN(AccountDetails.FRAOtherCharges)?AccountDetails.FRAOtherCharges:0);
    setAccountDetails({
      ...AccountDetails,
      FRATotal: myTotal,
    });
  }, [
    AccountDetails.FRAPrincipal,
    AccountDetails.FRANominated,
    AccountDetails.FRANonAccural,
    AccountDetails.FRAOtherCharges,
    AccountDetails.FRAPenalInterest,
  ]);
  // console.log(AccountDetails.FRAPrincipal,
  //   AccountDetails.FRANominated,
  //   AccountDetails.FRANonAccural,
  //   AccountDetails.FRAOtherCharges,
  //   AccountDetails.FRAPenalInterest,)
  // this code is used to set update record text on button when the user remains on the same account
  useEffect(() => {
    if (AccountSection.length > 0) {
      setButtonText("Update Record");
    }
  }, [AccountSection]);

  // code for adding condition on last row of colleteral section
  // useEffect(() => {
  //   if (additionalDetailsSection.Remarks == 1) {
  //     setCollateralSection({
  //       ...collateralSection,
  //       WillfullDefaulter: 2,
  //       RightOfRecovery: 1,
  //     });
  //   } else if (additionalDetailsSection.Remarks == 2) {
  //     setCollateralSection({
  //       ...collateralSection,
  //       RightOfRecovery: 2,
  //       WillfullDefaulter: 1,
  //     });
  //   }
  // }, [additionalDetailsSection.Remarks]);

  useEffect(() => {
    if (findCustomerFromMisys.isFail) {
      setMisysError(true);
      setMisysErrMsg(findCustomerFromMisys.message);
      // setTimeout(() => {
      //   dispatch(ResetState())
      //   setMisysError(false);
      // }, 3000);
    }
  }, [findCustomerFromMisys]);
  useEffect(() => {
    dispatch(GetBorrowerType())
    dispatch(GetAdvanceClassification())
    dispatch(GetManagementUnit())
    dispatch(GetNatureofCharge())
    dispatch(GetNatureOfSecurity())
    dispatch(GetWOFReason())
    window.scrollTo(0, 0)
  }, [])
  return !goToSave ? (
    <>
      {findCustomerAccountDetailsFromMisys.isLoading && <Loader />}
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title level={2}>Capture Write Off</Title>
        <Paper padding="1">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div onClick={() => {
                  dispatch(ResetState());
                  setMisysError(false);
                }} >
              <InputWithBtn
                isUpperCase={true}
                onchange={misysSectionHandler}
                label="Misys Customer Code"
                fullWidth
                helperText={misysErrMsg}
                textFieldSize="small"
                applyClass="search"
                textLength={6}
                minLength={6}
                icon={<i className="icon-search icon-size-one"></i>}
                required
                error={misysError}
                value={misysSection.MisysCode}
                name="MisysCode"
                click={misysSearchHandler}
              />
              </div>
            </Grid>

            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                name=""
                size="small"
                placeholder="WOF Code"
                disable
                value={wofcode}
                label={"WOF Code"}
                fullWidth
              />
            </Grid>

            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={misysSectionHandler}
                value={misysSection.NPLCode}
                size="small"
                label="Borrower NPL Code"
                fullWidth
                textLength={7}
                name="NPLCode"
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <TextField
                value={misysSection.BorrowerName}
                change={misysSectionHandler}
                size="small"
                label="Borrower Name"
                fullWidth
                textLength={300}
                required
                name="BorrowerName"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                value={misysSection.AddressOfBorrower}
                change={misysSectionHandler}
                name="AddressOfBorrower"
                size="small"
                label="Address of Borrower"
                fullWidth
                textLength={300}
                required
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                value={misysSection.NTNNumber}
                change={NTNnumberHandler}
                name="NTNNumber"
                size="small"
                label="NTN Number"
                fullWidth
                textLength={8}
              // minLength={8}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <SelectBox
                change={misysSectionHandler}
                name="ManagementUnitID"
                propertyName={"title"}
                option={setupForms.ManagementUnits}
                label="Business Segment"
                value={misysSection.ManagementUnitID}
                required
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <b style={{ fontSize: "1rem" }}>
                Sundry Analysis
              </b>
              <div style={{ marginTop: "10px" }} />
              <Box display="flex">
                <TextField
                  value={misysSection.SCode}
                  change={misysSectionHandler}
                  size="small"
                  label="Sundry Code"
                  textLength={2}
                  width="30%"
                  name="SCode"
                  minLength={2}
                />
                <TextField
                  change={misysSectionHandler}
                  value={misysSection.SDescription}
                  size="small"
                  label="Sundry Description"
                  fullWidth
                  textLength={40}
                  width="80%"
                  name="SDescription"
                />
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div style={{ marginTop: "35px" }} />
              <SelectBox
                change={misysSectionHandler}
                name="BorrowerTypeID"
                propertyName={"title"}
                option={setupForms.BorrowerTypes}
                label="Borrower Type"
                required
                value={misysSection.BorrowerTypeID}
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <div style={{ marginTop: "35px" }} />
              <TextField
                label={"IParty ID"}
                name=""
                placeholder="IParty ID"
                size="small"
                disable
                value={misysSection.iParty}
                fullWidth
              />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <SelectBox
                option={accountNumbersFromStore && accountNumbersFromStore}
                change={AcountSelection}
                value={AccountNumber}
                label="Account Number"
                required={true}
                name="AccountNumber"
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={CodeHandler}
                value={AccountDetails.BranchCode}
                size="small"
                label="Branch Code"
                fullWidth
                textLength={4}
                minLength={4}
                required
                name="BranchCode"
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <TextField
                change={AccountDetailsHandler}
                value={AccountDetails.BranchName}
                name="BranchName"
                size="small"
                label="Branch Name"
                fullWidth
                textLength={300}
                required
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={CodeHandler}
                name="RegionCode"
                size="small"
                label="Region Code"
                value={AccountDetails.RegionCode}
                fullWidth
                textLength={2}
                minLength={2}
                required
              />
            </Grid>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <TextField
                change={AccountDetailsHandler}
                name="RegionName"
                size="small"
                value={AccountDetails.RegionName}
                label="Region Name"
                fullWidth
                textLength={40}
                required
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: 22 }} />
              <TextField
                change={AccountDetailsHandler}
                name="FacCode"
                size="small"
                label="Type of Facility Code"
                fullWidth
                textLength={2}
                minLength={2}
                required
                value={AccountDetails.FacCode}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: 22 }} />
              <TextField
                change={AccountDetailsHandler}
                name="FacName"
                size="small"
                label="Type of Facility Description"
                fullWidth
                textLength={40}
                required
                value={AccountDetails.FacName}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: 22 }} />
              <DatePicker
                change={AccountDetailsHandler}
                name="LRDate"
                size="large"
                width="100%"
                DateRange
                value={
                  AccountDetails.LRDate
                    ? DateDisplayFormat(AccountDetails.LRDate)
                    : ""
                }
                placeholder={"Sanction/Last Renewal Date"}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                change={calculatorBoxhandler}
                name="LRAmount"
                size="small"
                label="Sanction/Last Renewal Amount"
                fullWidth
                numLength={15}
                value={AccountDetails.LRAmount}
              />
            </Grid>
          </Grid>
          <div style={{ marginTop: "20px" }} />
          <FancyBox
            state={AccountDetails}
            handler={calculatorBoxhandler}
            ABNSTotal={AccountDetails.ABNSTotal}
            APBSTotal={AccountDetails.APBSTotal}
            FRATotal={AccountDetails.FRATotal}
            required
            setallinput={setallinput}
            allinput={allinput}
          />
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: "#e7f5f4", padding: "1%" }}
          >
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Title level={4}>Consolidated</Title>
            </Grid>
            <ConsolidateBox
              state={consolidateCalculatorBox}
              FRATotal={consolidateCalculatorBox.FRATotal}
              ABNSTotal={consolidateCalculatorBox.ABNSTotal}
              APBSTotal={consolidateCalculatorBox.APBSTotal}
              disable={true}
            />
            <Grid item lg={12} md={12} sm={12} xs={12} align="center">
              <Button
                text={ButtonText}
                icon={<AddIcon />}
                applyClass="btnSecondarySolid"
                size="large"
                click={AddRecordHandler}
              />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Additional Detail</Title>
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} sm={12}>
              <SelectBox
                label="Classification of Advances"
                option={setupForms.ClassificationOfAdvances}
                propertyName={"title"}
                name="AdvanceClassificationID"
                change={addDetailsSectionHandler}
                required
                value={additionalDetailsSection.AdvanceClassificationID}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <label>
                {" "}
                <b>Charge Off</b>{" "}
              </label>
              <br />
              <Radio.Group
                required
                name="ChargeOfType"
                onChange={addDetailsSectionHandler}
                value={additionalDetailsSection.ChargeOfType}
              >
                <Radio disabled={enableRadio} value={2}>
                  New Charge-Off
                </Radio>
                <Radio disabled={enableRadio} value={3}>
                  Old Charge-Off
                </Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={2} md={2} sm={12}>
              <TextField
                fullWidth
                label="Approval Number"
                size="small"
                textLength={30}
                name="ApprovalNumber"
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.ApprovalNumber}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                placeholder={"Date of Approval *"}
                name="DateOfApproval"
                change={addDetailsSectionHandler}
                value={
                  additionalDetailsSection.DateOfApproval
                    ? DateDisplayFormat(additionalDetailsSection.DateOfApproval)
                    : null
                }
              />
            </Grid>
            <Grid item lg={5} md={5} sm={12}>
              <DatePicker
                size="large"
                width="100%"
                DateRange
                name="DateOfWriteoff"
                change={addDetailsSectionHandler}
                placeholder={"Date of Write off *"}
                value={
                  additionalDetailsSection.DateOfWriteoff
                    ? DateDisplayFormat(additionalDetailsSection.DateOfWriteoff)
                    : null
                }
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <SelectBox
                label="Reason of Write off"
                option={setupForms.WOFReasons}
                name="WriteOffReason"
                propertyName={"title"}
                required
                change={addDetailsSectionHandler}
                value={additionalDetailsSection.WriteOffReason}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} align="left">
              <label>
                {" "}
                <b>
                  Remarks <span style={{ color: "red" }}>*</span>
                </b>{" "}
              </label>{" "}
              <br />
              <Radio.Group
                required
                value={additionalDetailsSection.Remarks}
                onChange={addDetailsSectionHandler}
                name="Remarks"
              >
                <Radio required value={1}>
                  Settlement
                </Radio>
                <Radio required value={2}>
                  Book Cleaning
                </Radio>
              </Radio.Group>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Collateral</Title>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <SelectBox
                required
                label="Nature of Security"
                option={setupForms.NatureOfSecuritys}
                name="NatureOfSecurity"
                propertyName={"title"}
                value={collateralSection.NatureOfSecurity}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <SelectBox
                required
                label="Nature of Charge"
                option={setupForms.NatureofCharges}
                name="NatureOfCharge"
                propertyName={"title"}
                value={collateralSection.NatureOfCharge}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="FS Value of Security"
                size="small"
                minLength={15}
                numLength={15}
                name="FSValue"
                value={collateralSection.FSValue}
                change={ColleteralNumberField}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <DatePicker
                size="large"
                width="100%"
                placeholder={"Date of Valuation"}
                name="DateOfValuation"
                value={
                  collateralSection.DateOfValuation
                    ? DateDisplayFormat(collateralSection.DateOfValuation)
                    : null
                }
                DateRange
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Sale of Security"
                size="small"
                minLength={15}
                numLength={15}
                name="SaleOfSecurity"
                value={collateralSection.SaleOfSecurity}
                change={ColleteralNumberField}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Details of Securities held by the bank at the time of approving write off case"
                size="small"
                name="DetailsOfSecurity"
                value={collateralSection.DetailsOfSecurity}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Change in Securities held by the bank during the loan period"
                size="small"
                name="ChangeInSecurity"
                value={collateralSection.ChangeInSecurity}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Details security by the bank at approving W-off"
                size="small"
                name="SecuritybyBankAtWriteOff"
                value={collateralSection.SecuritybyBankAtWriteOff}
                change={collateralSectionHandler}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  Whether pledge stocks held by the bank was lifted by
                  to the borrower ?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="PledgeLifted"
                value={collateralSection.PledgeLifted}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  Whether Securities held by the bank was not perfect at
                  ab-initio level?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="ABInitioLevel"
                value={collateralSection.ABInitioLevel}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                {" "}
                <b>Whether borrower was a willful defaulter?</b>
              </label>{" "}
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="WillfullDefaulter"
                value={collateralSection.WillfullDefaulter}
              >
                <Radio value={1}>
                  Yes
                </Radio>
                <Radio value={2}>
                  No
                </Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div style={{ marginTop: "20px" }} />
              <label>
                <b>
                  After write-off, Do bank surrender/cease the right of
                  recovery?
                </b>
              </label>
              <br />
              <Radio.Group
                onChange={collateralSectionHandler}
                name="RightOfRecovery"
                value={collateralSection.RightOfRecovery}
              >
                <Radio value={1} >
                  Yes
                </Radio>
                <Radio value={2} >
                  No
                </Radio>
              </Radio.Group>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Paper padding="1">
          <Title level={4}>Recovery After Write-off</Title>
          <Grid container spacing={1}>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <b style={{ fontSize: "0.7rem" }}>{"Date of Recovery"}</b>
              <DatePicker
                change={recoveryWriteOffSectionHandler}
                name="DateOfRecovery"
                size="large"
                width="100%"
                DateRange
                value={
                  recoveryWriteOffSection.DateOfRecovery
                    ? DateDisplayFormat(recoveryWriteOffSection.DateOfRecovery)
                    : ""
                }
                placeholder={"Date of Recovery"}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Principal"
                size="small"
                numLength={15}
                name="Principal"
                value={recoveryWriteOffSection.Principal}
                change={recoveryNumberField}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Nominated (Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nominated"
                value={recoveryWriteOffSection.Nominated}
                change={recoveryNumberField}
              />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <FormattedInputs
                fullWidth
                label="Non-Accrual (Un-Debited Mark-up)"
                size="small"
                numLength={15}
                name="Nonaccural"
                value={recoveryWriteOffSection.Nonaccural}
                change={recoveryNumberField}
              />
            </Grid>
            <div style={{ marginTop: "10px" }} />
            <Grid container spacing={1}>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <FormattedInputs
                  fullWidth
                  label="Other Charges"
                  size="small"
                  numLength={15}
                  name="OtherCharges"
                  value={recoveryWriteOffSection.OtherCharges}
                  change={recoveryNumberField}
                />
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12}>
                <FormattedInputs
                  fullWidth
                  label="Penal Interest"
                  size="small"
                  numLength={15}
                  name="PenalInterest"
                  value={recoveryWriteOffSection.PenalInterest}
                  change={recoveryNumberField}
                />
              </Grid>
              <Grid item lg={2} md={2} sm={12} xs={12}>
                <FormattedInputs
                  disable
                  fullWidth
                  label="Total"
                  size="small"
                  numLength={15}
                  name="Total"
                  value={recoveryWriteOffSection.Total}
                  change={recoveryNumberField}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: "20px" }} />
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12} align="center">
            <Button
              type="submit"
              applyClass="btnBorderStyledBeach"
              text="Next"
              endIcon={<i className="icon-arrow-right icon-size-one"></i>}
            />
          </Grid>
        </Grid>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      <Notification
        setOpen={setOpenApproval}
        open={openApproval}
        message={"Select Date of Approval"}
        Type={Message.warning}
      />
      <Notification
        setOpen={setOpenWriteoff}
        open={openWriteoff}
        message={"Select Date of Write off"}
        Type={Message.warning}
      />
    </>
  ) : (
    <SaveRecord
      setGoToSave={setGoToSave}
      goToSave={goToSave}
      PreviousPageDetails={FinalDetails}
      WofCode={wofcode}
      setOpen={setOpen}
      setwofcode={setwofcode}

    />
  );
};

export default AddWriteOff;
