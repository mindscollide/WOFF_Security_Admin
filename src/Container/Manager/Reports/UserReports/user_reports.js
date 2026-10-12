import React, { useState, useEffect } from "react";
import { Typography, Space, Row, Col } from "antd";
import {
  DownloadOutlined,
  SearchOutlined as Search,
  UndoOutlined as Restore,
} from "@ant-design/icons";
import {
  removeDashesFromDate,
  DateDisplayFormat,
  DateSendingFormat,
  removeDashesFromDate2,
} from "../../../../Common/Functions/date-formatter";
import {
  SelectBox,
  Button,
  Table,
  GroupedButtons,
  Modal,
  StartToEndDate,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import {
  lastLoginReport,
  downloadLoginHistoryReport,
  downloadStatusWiseReport,
  downloadAccessDetailReport,
} from "../../../../store/actions/reports_actions";
import { useDispatch, useSelector } from "react-redux";

const UserReports = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [StatusValue, setStatusValue] = useState();
  const [status, setStatus] = useState([
    "Enabled",
    "Disabled",
    "Locked",
    "Closed",
    "Dormant",
  ]);
  const [State, setState] = useState({
    DateFrom: "",
    DateTO: "",
    LDAPAccount: "",
    FirstName: "",
    LastName: "",
    StatusID: 0,
    RoleID: 0,
  });
  //   for Date
  const [clearDateSelect, setDateClearSelect] = useState("");

  // const setDate = (arg) => {
  //   var startDate = removeDashesFromDate2(arg.startDate);
  //   var endDate = removeDashesFromDate2(arg.endDate);
  //   console.log("h", startDate);
  //   console.log("h", endDate);
  //   setState({
  //     ...State,
  //     DateFrom: startDate,
  //     DateTO: endDate,
  //   });
  // };
  // reset All data
  const resetData = () => {
    setState({
      DateFrom: "",
      DateTO: "",
      LDAPAccount: "",
      FirstName: "",
      LastName: "",
      StatusID: 0,
      RoleID: 0,
    });
    setStatusValue();
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setState({
      ...State,
      [e.target.name]: e.target.value,
    });
  };
  const handleForStatus = (e, value) => {
    if (value === "Enabled") {
      setState({
        ...State,
        ["StatusID"]: 1,
      });
      setStatusValue(value);
    } else if (value === "Disabled") {
      setState({
        ...State,
        ["StatusID"]: 2,
      });
      setStatusValue(value);
    } else if (value === "Locked") {
      setState({
        ...State,
        ["StatusID"]: 3,
      });
      setStatusValue(value);
    } else if (value === "Dormant") {
      setState({
        ...State,
        ["StatusID"]: 9,
      });
      setStatusValue(value);
    } else {
      setState({
        ...State,
        ["StatusID"]: 4,
      });
      setStatusValue(value);
    }
  };
  const setDate = (e, val) =>{
    console.log()
    if (e.name && e.name === "dater" && e.startDate!==null && e.endDate!==null) {
      setState({ ...State, 
        DateFrom: DateSendingFormat(e.startDate), 
        DateTO:DateSendingFormat(e.endDate)});
   }
   else{
    setState({ ...State, 
      DateFrom: "", 
      DateTO:""});
   }
  }
  console.log(State);
  return (
    <>
      <Title level={3}>User Reports</Title>
      <Row gutter={8}>
        <Col lg={4} md={4} sm={24}>
          <TextField
            name="LDAPAccount"
            fullWidth
            label="Login ID"
            size="small"
            change={handleChange}
            value={State.LDAPAccount}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <SelectBox
            label="StatusID"
            change={handleForStatus}
            option={status}
            value={StatusValue}
            propertyName={"Fullname"}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name="FirstName"
            label="Firts Name"
            size="small"
            change={handleChange}
            value={State.FirstName}
          />
        </Col>
        <Col lg={4} md={4} sm={24}>
          <TextField
            fullWidth
            name="LastName"
            label="Last Name"
            size="small"
            change={handleChange}
            value={State.LastName}
          />
        </Col>

        <Col lg={8} md={8} sm={24}>
          <StartToEndDate
            // change={datehandler}
            label={"Date Range"}
            width="100%!important"
            size="large"
            change={setDate}
            key={clearDateSelect}
            startvalue={State.DateFrom!==null && State.DateFrom!==""? DateDisplayFormat(State.DateFrom):null}
            endvalue={State.DateTO!==null && State.DateFrom!=="" ?DateDisplayFormat(State.DateTO):null}
            DateRange={true}
          />
        </Col>
        <Col md={24} lg={24} sm={24} align="center">
          <Space>
            {/* <Button
              text="Search"
              icon={<Search />}
              applyClass="btnDarkSolid"
              size="small"
              // click={()=>dispatch(SearchApprovalFlow(State.ApprovalFlowName,State.ApprovalFlowDescription))}
            /> */}
            <Button
              text="Reset"
              icon={<Restore />}
              applyClass="btnSecondarySolid"
              size="small"
              click={resetData}
            />
          </Space>
        </Col>
        <Col style={{ marginTop: "1%" }} lg={24} md={22} sm={24}>
          <Title level={3}>User Status</Title>
        </Col>
        <Col lg={6} md={6} sm={24}>
          <Button
            text="Access Details"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadAccessDetailReport(State))}
            ghost
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <Button
            text="Login History"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadLoginHistoryReport(State))}
            ghost
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <Button
            text="Status Wise"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(downloadStatusWiseReport(State))}
            ghost
          />
        </Col>
        <Col lg={6} md={6} sm={24}>
          <Button
            text="Last Login"
            icon={<DownloadOutlined />}
            applyClass="btnDarkSolid"
            size="small"
            click={() => dispatch(lastLoginReport(State))}
            ghost
          />
        </Col>
      </Row>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default UserReports;
