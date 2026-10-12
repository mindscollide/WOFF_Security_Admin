// all routing related data like rendering components and their paths sits here in this file
import {
  SecurityAdminAuditTrail,
  AddWriteOff,
  ListWriteOff,
  ViewWriteOff,
  CompleteReports,
  CreditPolicy,
  BalanceSheetFormat,
  ApprovalFlow,
  UserAudit,
  ApprovalReasons,
  BorrowerType,
  ClassificationOfAdvances,
  ManagementUnit,
  NatureOfCharge,
  NatureOfSecurity,
  ReasonOfWriteOff,
  RejectionReasons,
  AddEditUsers,
  CreateEditRole,
  UserReports,
  SystemAdminUserAudit,
  SystemAdminAuditTrail,
  PendingApprovals,
  EditWriteOffDetails,
  ListOfPendingCases,
  ListOfApprovedCases
} from "../Container";
import { 
  SecurityAdminLinks,
  // SystemAdminLinks,
  // ManagerLinks,
  // DataEntryUserLinks
} from "./Links";
const SecurityAdminRouteData = [
  { component: AddEditUsers, path: "Admin/AddEditUsers" },
  { component: CreateEditRole, path: "Admin/CreateEditRoles" },
  { component: UserReports, path: "Admin/UserReports" },
  // { component: SecurityAdminAuditTrail, path: "Admin/AuditTrail" },
  // { component: SecurityAdminAuditTrail, path: "Admin/UserAudit" },
]
const UserSelection = (token,role)=>{
  let Title = ''
  let UserRoleId = ''
  let SidebarData = ''
  let MainMenu = ''
  let Notification = ''
  if(token && role===1){
    Title ="WOFF Data Centralization & MIS Capturing"
    UserRoleId = role
    SidebarData = SecurityAdminLinks
    MainMenu = SecurityAdminRouteData
    Notification = null;
    Notification = true;
  }
  // if(token && role===2){
  //   Title = "Admin Dashboard"
  //   UserRoleId =role
  //   SidebarData = SystemAdminLinks
  //   MainMenu = SystemAdminRouteData
  //   Notification = null;
  // }
  // if(token && role===3){
  //   Title = "Manager Dashboard"
  //   UserRoleId = role
  //   SidebarData = ManagerLinks
  //   MainMenu = ManagerRouteData
  //   Notification = true;
  // }
  // if(token && role===4){
  //   Title = "DataEntry Dashboard"
  //   UserRoleId = role
  //   SidebarData = DataEntryUserLinks
  //   MainMenu = DataEntryUserRouteData
  //   Notification = null;
  // }
  return{
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification
  }
}
export {
  UserSelection
}