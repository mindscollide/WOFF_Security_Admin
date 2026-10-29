import React, { useState, useEffect } from "react";
import { Typography, Row, Col } from "antd";
import { UndoOutlined as Restore } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { roles } from "../../../../../Common/SelectFieldOption/select-field-option";
import {
  Paper,
  FilterBar,
  InputWithBtn,
  TextField,
  Table,
  SelectBox,
  DatePicker,
  Button,
  Loader,
  GroupedButtons,
  Modal,
  Checkbox,
  FancyBox,
} from "../../../../../Components/Elements";
import {
  getAllUserData,
  editUser,
} from "../../../../../store/actions/request-actions";
const AddEditUsers = () => {
  const { Title } = Typography;
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState();
  const [classificationofAdvance, setclassificationofAdvance] = useState({
    UserIdToEdit: null,
    email: "",
    fK_GSSUserRoleID: "",
    fK_GSSUserStatusID: "",
  });
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });
  const [row, setRows] = useState([]);
  const [form, setForm] = useState({
    LoginID: "",
    SelectRole: 0,
    SelectStaus: 0,
  });
  // for User Roles
  const [userRoleValue, setUserRoleValue] = useState([]);
  const [userRolesName, setUserRolesName] = useState([]);
  const [userRoles, setUserRoles] = useState([
    { name: "Data Entry", value: 4 },
    { name: "Manager", value: 3 },
    { name: "Auditor", value: 5 },
    { name: "System Administrator", value: 2 },
    { name: "Security Admin", value: 1 },
  ]);
  // for already selected value
  const [userMRole, setMUserRole] = useState("");
  const [userMStatus, setMUserStatus] = useState("");
  // for User Status
  const [userStatusValue, setUserStatusValue] = useState([]);
  const [userStatusName, setUserStatusName] = useState([]);
  const [userStatus, setUserStatus] = useState([
    { name: "Enabled", value: 1 },
    { name: "Disabled", value: 2 },
    { name: "Locked", value: 3 },
    { name: "Closed", value: 4 },
    { name: "Dormant", value: 9 },
  ]);
  const [searchData, setSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });
  const [resetSearchData, setResetSearchData] = useState({
    LoginID: "",
    Email: "",
    FirstName: "",
    LastName: "",
    UserRole: 0,
    UserStatus: 0,
  });
  const fieldsHandler = (e, val) => {
    let id = e.target.id !== undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    console.log(val);
    if (val === "Data Entry") {
      setSearchData({ ...searchData, ["UserRole"]: 4 });
      setUserRoleValue(val);
      console.log("data");
    } else if (val === "Manager") {
      setSearchData({ ...searchData, ["UserRole"]: 3 });
      setUserRoleValue(val);
    } else if (val === "Auditor") {
      setSearchData({ ...searchData, ["UserRole"]: 5 });
      setUserRoleValue(val);
    } else if (val === "System Administrator") {
      setSearchData({ ...searchData, ["UserRole"]: 2 });
      setUserRoleValue(val);
    } else if (val === "Security Admin") {
      setSearchData({ ...searchData, ["UserRole"]: 1 });
      setUserRoleValue(val);
    } else if (val === "Enabled") {
      setSearchData({ ...searchData, ["UserStatus"]: 1 });
      setUserStatusValue(val);
    } else if (val === "Disabled") {
      setSearchData({ ...searchData, ["UserStatus"]: 2 });
      setUserStatusValue(val);
    } else if (val === "Locked") {
      setSearchData({ ...searchData, ["UserStatus"]: 3 });
      setUserStatusValue(val);
    } else if (val === "Closed") {
      setSearchData({ ...searchData, ["UserStatus"]: 4 });
      setUserStatusValue(val);
    } else if (val === "Dormant") {
      setSearchData({ ...searchData, ["UserStatus"]: 9 });
      setUserStatusValue(val);
    } else if (id && id.includes("UserStatus")) {
      // setSearchData({ ...searchData, ["UserStatus"]: val.title });
    } else {
      console.log(value);
      setSearchData({ ...searchData, [name]: value });
    }
    console.log(searchData);
  };
  // for edit user
  const editUserDataHnaler = (e, val) => {
    console.log(val);
    if (val === "Data Entry") {
      setForm({ ...form, ["SelectRole"]: 4 });
      setMUserRole(val);
    } else if (val === "Manager") {
      setForm({ ...form, ["SelectRole"]: 3 });
      setMUserRole(val);
    } else if (val === "Auditor") {
      setForm({ ...form, ["SelectRole"]: 5 });
      setMUserRole(val);
    } else if (val === "System Administrator") {
      setForm({ ...form, ["SelectRole"]: 2 });
      setMUserRole(val);
    } else if (val === "Security Admin") {
      setForm({ ...form, ["SelectRole"]: 1 });
      setMUserRole(val);
    } else if (val === "Enabled") {
      setForm({ ...form, ["SelectStaus"]: 1 });
      setMUserStatus(val);
    } else if (val === "Disabled") {
      setForm({ ...form, ["SelectStaus"]: 2 });
      setMUserStatus(val);
    } else if (val === "Locked") {
      setForm({ ...form, ["SelectStaus"]: 3 });
      setMUserStatus(val);
    } else if (val === "Closed") {
      setForm({ ...form, ["SelectStaus"]: 4 });
      setMUserStatus(val);
    } else if (val === "Dormant") {
      setForm({ ...form, ["SelectStaus"]: 9 });
      setMUserStatus(val);
    } else {
      console.log("no");
    }
  };
  // Foe Save Edit user details
  console.log(form);
  console.log(searchData);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  // for search
  const searchHandler = () => {
    dispatch(getAllUserData(searchData));
  };
  // cleare all states
  const resetData = () => {
    setSearchData({
      ...searchData,
      LoginID: "",
      Email: "",
      FirstName: "",
      LastName: "",
      UserRole: 0,
      UserStatus: 0,
    });
    setUserRoleValue();
    setUserStatusValue();
    dispatch(getAllUserData(resetSearchData));
  };
  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    setForm({ LoginID: "", SelectRole: 0, SelectStaus: 0 });
    console.log(form);

    // dispatch(editUser(form));
  };
  const handleProceed = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    console.log(form);
    dispatch(editUser(form, resetSearchData));
  };
  console.log("row", row);
  const columns = [
    {
      title: "LoginID",
      dataIndex: "userLDAPAccount",
      key: "userLDAPAccount",
      align: "center",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "20%",
    },
    // {
    //   title: "Employee Number",
    //   dataIndex: "userReferenceCode",
    //   key: "userReferenceCode",
    //   align: "center",
    //   width: "20%",
    // },
    {
      title: "Role",
      dataIndex: "fK_GSSUserRoleID",
      key: "fK_GSSUserRoleID",
      render: (text) => (
        <>
          {text === 5 ? (
            <div>Auditor</div>
          ) : text === 4 ? (
            <div>Data Entry</div>
          ) : text === 2 ? (
            <div>System Administrator</div>
          ) : text === 3 ? (
            <div>Manager</div>
          ) : (
            <div>Security Admin</div>
          )}
        </>
      ),
      align: "center",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "fK_GSSUserStatusID",
      key: "fK_GSSUserStatusID",
      align: "center",
      width: "20%",

      render: (text) => (
        <>
          {text === 1 ? (
            <div
              style={{ cursor: "pointer" }}
              className="icon-check icon-size-one greenTick"
            ></div>
          ) : text === 2 ? (
            <div
              style={{ cursor: "pointer" }}
              className="icon-not-allowed icon-size-one crossRed"
            ></div>
          ) : text === 3 ? (
            <div
              style={{ cursor: "pointer" }}
              className="icon-lock icon-size-one crossRed"
            ></div>
          ) : text === 4 ? (
            <div
              style={{ cursor: "pointer" }}
              className="icon-close icon-size-one crossRed"
            ></div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              className="icon-user-lock icon-size-one crossRed"
            ></div>
          )}
        </>
      ),
      //   render: (text) => (
      //     <div
      //       // style={{ cursor: "pointer" }}
      //       // onClick={showModal}
      //       className="icon-check icon-size-one greenTick"
      //     />
      //   ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "20%",
      render: (text, record) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => edit(e, record)}
          className="icon-edit icon-size-one beachGreen"
        />
      ),
    },
  ];
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: "",
      click: () => null,
    },
    secondaryButton: {
      text: "Cancle",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => null,
    },
  };
  const editButtonProps = {
    primaryButton: {
      text: "Update",
      icon: <i className="icon-update icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      size: "",
      disable: "",
      click: () => update(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      size: "",
      disable: "",
      click: () => handleCancel(),
    },
  };
  const add = () => {
    showModal();
    setAction({ ...actions, add: !actions.add });
  };
  const edit = (e, record) => {
    if (record.fK_GSSUserRoleID === 2) {
      setMUserRole("System Administrator");
    } else if (record.fK_GSSUserRoleID === 3) {
      setMUserRole("Manager");
    } else if (record.fK_GSSUserRoleID === 4) {
      setMUserRole("Data Entry");
    } else if (record.fK_GSSUserRoleID === 5) {
      setMUserRole("Auditor");
    } else {
      setMUserRole("Security Admin");
    }
    if (record.fK_GSSUserStatusID === 1) {
      setMUserStatus("Enabled");
    } else if (record.fK_GSSUserStatusID === 2) {
      setMUserStatus("Disabled");
    } else if (record.fK_GSSUserStatusID === 3) {
      setMUserStatus("Locked");
    } else if (record.fK_GSSUserStatusID === 9) {
      setMUserStatus("Dormant");
    } else {
      setMUserStatus("Closed");
    }
    console.log(record);
    setForm({
      ...form,
      ["LoginID"]: record.userID,
      ["SelectStaus"]: record.fK_GSSUserStatusID,
      ["SelectRole"]: record.fK_GSSUserRoleID,
    });
    showModal();
    setclassificationofAdvance({
      ...classificationofAdvance,
      UserIdToEdit: record.userID,
      email: record.userLDAPAccount,
      fK_GSSUserRoleID: record.fK_GSSUserRoleID,
      fK_GSSUserStatusID: record.fK_GSSUserStatusID,
    });
    setAction({ ...actions, edit: !actions.edit });
  };
  const forstatudId = () => {
    if (form.SelectStaus === 0) {
      console.log(userMStatus);
      if (userMStatus === "Enabled") {
        if (form.SelectRole === 0) {
          console.log(userMRole);
          if (userMRole === "Data Entry") {
            // setForm({ ...form, ["SelectRole"]: 4,["SelectStaus"]: 1 })
            console.log(userMRole);
          } else if (userMRole === "Manager") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 1 });
            console.log(userMRole);
          } else if (userMRole === "Auditor") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 1 });
            console.log(userMRole);
          } else if (userMRole === "System Administrator") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 1 });
            console.log(userMRole);
          } else if (userMRole === "Security Admin") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 1 });
            console.log(userMRole);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectStaus"]: 1 });
        }
      } else if (userMStatus === "Disabled") {
        if (form.SelectRole === 0) {
          console.log(userMRole);
          if (userMRole === "Data Entry") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 2 });
            console.log(userMRole);
          } else if (userMRole === "Manager") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 2 });
            console.log(userMRole);
          } else if (userMRole === "Auditor") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 2 });
            console.log(userMRole);
          } else if (userMRole === "System Administrator") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 2 });
            console.log(userMRole);
          } else if (userMRole === "Security Admin") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 2 });
            console.log(userMRole);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectStaus"]: 2 });
        }
      } else if (userMStatus === "Locked") {
        if (form.SelectRole === 0) {
          console.log(userMRole);
          if (userMRole === "Data Entry") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 3 });
            console.log(userMRole);
          } else if (userMRole === "Manager") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 3 });
            console.log(userMRole);
          } else if (userMRole === "Auditor") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 3 });
            console.log(userMRole);
          } else if (userMRole === "System Administrator") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 3 });
            console.log(userMRole);
          } else if (userMRole === "Security Admin") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 3 });
            console.log(userMRole);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectStaus"]: 3 });
        }
      } else if (userMStatus === "Closed") {
        if (form.SelectRole === 0) {
          console.log(userMRole);
          if (userMRole === "Data Entry") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 4 });
            console.log(userMRole);
          } else if (userMRole === "Manager") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 4 });
            console.log(userMRole);
          } else if (userMRole === "Auditor") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 4 });
            console.log(userMRole);
          } else if (userMRole === "System Administrator") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 4 });
            console.log(userMRole);
          } else if (userMRole === "Security Admin") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 4 });
            console.log(userMRole);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectStaus"]: 4 });
        }
      } else if (userMStatus === "Dormant") {
        if (form.SelectRole === 0) {
          console.log(userMRole);
          if (userMRole === "Data Entry") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 9 });
            console.log(userMRole);
          } else if (userMRole === "Manager") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 9 });
            console.log(userMRole);
          } else if (userMRole === "Auditor") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 9 });
            console.log(userMRole);
          } else if (userMRole === "System Administrator") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 9 });
            console.log(userMRole);
          } else if (userMRole === "Security Admin") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 9 });
            console.log(userMRole);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectStaus"]: 4 });
        }
      } else {
        console.log("no");
      }
    }
  };
  const forRollId = () => {
    if (form.SelectRole === 0) {
      console.log(userMRole);
      if (userMRole === "Data Entry") {
        // setForm({ ...form, ["SelectRole"]: 4 })
        if (form.SelectStaus === 0) {
          console.log(userMStatus);
          if (userMStatus === "Enabled") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 1 });
            console.log(userMStatus);
          } else if (userMStatus === "Disabled") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 2 });
            console.log(userMStatus);
          } else if (userMStatus === "Locked") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 3 });
            console.log(userMStatus);
          } else if (userMStatus === "Closed") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 4 });
            console.log(userMStatus);
          } else if (userMStatus === "Dormant ") {
            setForm({ ...form, ["SelectRole"]: 4, ["SelectStaus"]: 9 });
            console.log(userMStatus);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectRole"]: 4 });
        }
        console.log(userMRole);
      } else if (userMRole === "Manager") {
        // setForm({ ...form, ["SelectRole"]: 3 })
        if (form.SelectStaus === 0) {
          console.log(userMStatus);
          if (userMStatus === "Enabled") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 1 });
            console.log(userMStatus);
          } else if (userMStatus === "Disabled") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 2 });
            console.log(userMStatus);
          } else if (userMStatus === "Locked") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 3 });
            console.log(userMStatus);
          } else if (userMStatus === "Closed") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 4 });
            console.log(userMStatus);
          } else if (userMStatus === "Dormant ") {
            setForm({ ...form, ["SelectRole"]: 3, ["SelectStaus"]: 9 });
            console.log(userMStatus);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectRole"]: 3 });
        }
        console.log(userMRole);
      } else if (userMRole === "Auditor") {
        // setForm({ ...form, ["SelectRole"]: 5 })
        if (form.SelectStaus === 0) {
          console.log(userMStatus);
          if (userMStatus === "Enabled") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 1 });
            console.log(userMStatus);
          } else if (userMStatus === "Disabled") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 2 });
            console.log(userMStatus);
          } else if (userMStatus === "Locked") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 3 });
            console.log(userMStatus);
          } else if (userMStatus === "Closed") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 4 });
            console.log(userMStatus);
          } else if (userMStatus === "Dormant ") {
            setForm({ ...form, ["SelectRole"]: 5, ["SelectStaus"]: 9 });
            console.log(userMStatus);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectRole"]: 5 });
        }
        console.log(userMRole);
      } else if (userMRole === "System Administrator") {
        // setForm({ ...form, ["SelectRole"]: 2 })
        if (form.SelectStaus === 0) {
          console.log(userMStatus);
          if (userMStatus === "Enabled") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 1 });
            console.log(userMStatus);
          } else if (userMStatus === "Disabled") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 2 });
            console.log(userMStatus);
          } else if (userMStatus === "Locked") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 3 });
            console.log(userMStatus);
          } else if (userMStatus === "Closed") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 4 });
            console.log(userMStatus);
          } else if (userMStatus === "Dormant ") {
            setForm({ ...form, ["SelectRole"]: 2, ["SelectStaus"]: 9 });
            console.log(userMStatus);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectRole"]: 2 });
        }
      } else if (userMRole === "Security Admin") {
        // setForm({ ...form, ["SelectRole"]: 3 })
        if (form.SelectStaus === 0) {
          console.log(userMStatus);
          if (userMStatus === "Enabled") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 1 });
            console.log(userMStatus);
          } else if (userMStatus === "Disabled") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 2 });
            console.log(userMStatus);
          } else if (userMStatus === "Locked") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 3 });
            console.log(userMStatus);
          } else if (userMStatus === "Closed") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 4 });
            console.log(userMStatus);
          } else if (userMStatus === "Dormant ") {
            setForm({ ...form, ["SelectRole"]: 1, ["SelectStaus"]: 9 });
            console.log(userMStatus);
          } else {
            console.log("no");
          }
        } else {
          setForm({ ...form, ["SelectRole"]: 1 });
        }
        console.log(userMRole);
      } else {
        console.log("no");
      }
    }
  };
  const update = async () => {
    await forRollId();
    forstatudId();

    showModal();
    setAction({ ...actions, update: !actions.update, edit: false });
  };
  // Api call for user data
  useEffect(() => {
    dispatch(getAllUserData(searchData));
    if (userRoles) {
      setUserRolesName(
        userRoles.map((role, i) => {
          return role.name;
        })
      );
    }
    if (userStatus) {
      setUserStatusName(
        userStatus.map((status, i) => {
          return status.name;
        })
      );
    }
    console.log(userStatusName);
  }, []);
  // User data Responce
  useEffect(() => {
    console.log(requestReducer);
    if (requestReducer.ResponseMessage == "Record Found") {
      setRows(requestReducer.UserDetails);
      console.log("No record found", requestReducer.UserDetails);
    }
  }, [requestReducer.UserDetails]);
  return (
    <>
      <Title level={3}>Edit User</Title>
      <Row gutter={8}>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="Login ID"
            size="small"
            name="LoginID"
            value={searchData.LoginID}
            change={fieldsHandler}
          />
        </Col>
        {/* <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="Email"
            size="small"
            name="Email"
            value={searchData.Email}
            change={fieldsHandler}
          />
        </Col> */}
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="First Name"
            size="small"
            name="FirstName"
            value={searchData.FirstName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <TextField
            fullWidth
            label="Last Name"
            size="small"
            name="LastName"
            value={searchData.LastName}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label="Select Role"
            size="small"
            height="10px!important"
            option={userRolesName}
            name="UserRole"
            value={userRoleValue}
            change={fieldsHandler}
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <SelectBox
            label="Select Status"
            size="small"
            height="10px!important"
            option={userStatusName}
            name="UserStaus"
            value={userStatusValue}
            change={fieldsHandler}
          />
        </Col>
        <Col md={12} lg={12} sm={24} align="right">
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "18.75%" }}>
              <Button
                applyClass="btnDarkSolid"
                text="Search"
                icon={<i className="icon-search icon-size-one"></i>}
                click={searchHandler}
              />
            </div>
            <div style={{ width: "18.75%" }}>
              <Button
                text="Reset"
                icon={<Restore />}
                applyClass="btnSecondarySolidResetFull"
                size="small"
                click={resetData}
              />
            </div>
          </div>
        </Col>

        <div style={{ marginTop: "10%" }} />
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={row}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>

      {/* modal starts here */}
      <Modal
        modalTitle={
          actions.edit && (
            <h3>
              <b>Edit User</b>
            </h3>
          )
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        {actions.add && (
          <>
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <div className="icon-add-user icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want add to user?
              </Title>
            </div>
            <div align="center">
              <Button
                click={handleCancel}
                applyClass="btnBorderStyledBeach"
                text="Proceed"
                endIcon={<i className="icon-proceed icon-size-one"></i>}
              />
            </div>
          </>
        )}
        {actions.edit && (
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "40px" }}>
            <TextField
              focus
              disable
              label="Email"
              fullWidth
              value={classificationofAdvance.email}
              disabled={true}
            />
            <div style={{ marginTop: "3%" }} />
            <Row gutter={16}>
              <Col md={12} lg={12} sm={12}>
                <SelectBox
                  label="Select Role"
                  name="SelectRole"
                  option={userRolesName}
                  value={userMRole}
                  change={editUserDataHnaler}
                />
              </Col>
              <Col md={12} lg={12} sm={12}>
                <SelectBox
                  label="Select Status"
                  name="SelectStaus"
                  option={userStatusName}
                  value={userMStatus}
                  change={editUserDataHnaler}
                />
              </Col>
            </Row>
            <div style={{ marginTop: "7%" }} />
            <GroupedButtons data={editButtonProps} />
          </div>
        )}
      </Modal>
      {/* a separate modal for edit user prompt */}
      {actions.update && (
        <>
          <Modal
            closeModal={handleCancel}
            modalState={isModalVisible}
            width={700}
          >
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <div className="icon-update-user icon-size-two"></div>
              <Title level={3} align="center">
                Are you sure you want update to user?
              </Title>
            </div>
            <div align="center">
              <Button
                click={handleProceed}
                applyClass="btnBorderStyledBeach"
                text="Proceed"
                endIcon={<i className="icon-proceed icon-size-one"></i>}
              />
            </div>
          </Modal>
        </>
      )}
      {requestReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditUsers;
