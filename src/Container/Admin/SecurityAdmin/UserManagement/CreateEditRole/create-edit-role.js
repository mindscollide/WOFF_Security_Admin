import React, { useState, useEffect } from "react";
import { Input, Typography, Space, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  saveUserBySecurityAdmin,
  rejectUserBySecurityAdmin,
  newRequestList,
  newRequestListCount,
} from "../../../../../store/actions/request-actions";
import CheckBoxesList from "../../../../../Components/Admin/SecurityAdmin/UserManagement/checkbox-list";
import {
  Paper,
  FilterBar,
  InputWithBtn,
  TextField,
  Table,
  SelectBox,
  DatePicker,
  Button,
  GroupedButtons,
  Modal,
  Notification,
  Loader,
  Checkbox,
  FancyBox,
} from "../../../../../Components/Elements";
const CreateEditRoles = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const [showUrduContent, setShowUrduContent] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [rejectionComment, setRejectionComment] = useState("");
  var [rows, setRows] = useState([]);
  const [saveData, setSaveData] = useState([]);
  const [actions, setAction] = useState({
    add: false,
    edit: false,
    status: false,
    update: false,
  });

  const [userRequestDetails, setUserRequestDetails] = useState(
    requestReducer.UserRequestDetails
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, settitle] = useState();

  // for Approved user request modal
  const showAcceptModal = (data) => {
    console.log(data);
    setSaveData(data);
    settitle("Accept");
    setIsModalVisible(true);
    setAction({ ...actions, add: !actions.add });
  };
  // for notification
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  // for Reject user request modal
  const showRejectModal = (data) => {
    settitle("Reject");
    setAction({ ...actions, edit: !actions.add });
    setSaveData(data);
    setIsModalVisible(true);
    console.log(data);
  };
  // for create user
  const createUser = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(saveUserBySecurityAdmin(saveData));
  };
  // for reject user request
  const rejectUser = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    dispatch(rejectUserBySecurityAdmin(saveData, rejectionComment));
    setRejectionComment("");
    setBtnDisabled(true);
  };
  // for Reject Comments
  const Comments = (e) => {
    setBtnDisabled(false);
    setRejectionComment(e.target.value);
    console.log(e.target.value);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  // for close modal
  const handleCancel = () => {
    setAction({ add: false, edit: false, status: false, update: false });
    setIsModalVisible(false);
    setRejectionComment("");
  };
  const checkBoxHandler = () => {
    setShowUrduContent(!showUrduContent);
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
    },

    // {/* 0006113: Edit Users - changes */}
    // {
    //   title: "Login ID",
    //   dataIndex: "userName",
    //   key: "userName",
    //   align: "center",
    //   width: "10%",
    // },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      width: "15%",
    },
    // {
    //   title: "Employee Number",
    //   dataIndex: "personalNumber",
    //   key: "personalNumber",
    //   align: "center",
    //   width: "15%",
    // },
    {
      title: "Role",
      dataIndex: "roleID",
      key: "roleID",
      align: "center",
      render: (text) => (
        <>
          {text === 5 ? (
            <div>Auditor</div>
          ) : text === 4 ? (
            <div>Data Entry</div>
          ) : (
            <div>Manager</div>
          )}
        </>
      ),
      width: "15%",
    },
    // {
    //   title: "Role",
    //   dataIndex: "userName",
    //   key: "userName",
    //   align: "center",
    //   width:"20%"
    // },
    {
      title: "Accept",
      dataIndex: "createuser",
      key: "createuser",
      align: "center",
      width: "10%",
      render: (text, row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => showAcceptModal(row)}
          className="icon-add icon-size-one greenTick"
        />
      ),
    },
    {
      title: "Reject",
      dataIndex: "deleteuser",
      key: "deleteuser",
      align: "center",
      width: "30%",
      render: (text, row) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => showRejectModal(row)}
          className="icon-trash icon-size-one pdfRed"
        />
      ),
    },
  ];
  // const rows = [
  //   {
  //     key: "1",
  //     Email: "yasir.ahmed@hbl.com",
  //     firstname: "Yasir ",
  //     lastname: "Ahmed ",
  //     employeenumber: "123456 ",
  //     roleName: "Data Entry",
  //     edit: "",
  //     status: "",
  //   },
  //   {
  //     key: "2",
  //     Email: "muhammad.farooq@hbl.com ",
  //     firstname: "Muhammad",
  //     lastname: "Farooq",
  //     employeenumber: "654321",
  //     roleName: "Data Entry",
  //     edit: "",
  //     status: "",
  //   },
  //   {
  //     key: "3",
  //     Email: "rahat.ali@hbl.com ",
  //     firstname: "Rahat  ",
  //     lastname: "Ali  ",
  //     employeenumber: "987654  ",
  //     roleName: "Manager ",
  //     edit: "",
  //     status: "",
  //   },
  // ];
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
  useEffect(() => {
    console.log(requestReducer.UserRequestDetails);
    setUserRequestDetails(requestReducer.UserRequestDetails);
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (UserDetails != null && UserDetails != null) {
      let userdtaid = UserDetails.userID;
      dispatch(newRequestListCount(userdtaid));
    }
  }, [requestReducer.UserRequestDetails]);
  useEffect(() => {
    var addedKey, data;
    if (
      requestReducer.UserRequestDetails &&
      requestReducer.UserRequestDetails.length > 0
    ) {
      data = [...requestReducer.UserRequestDetails];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
      setRows(addedKey);
    } else if (requestReducer.UserRequestDetails === null) {
      setRows([]);
    }

    console.log("inner data", requestReducer.UserRequestDetails);
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userdtaid = UserDetails.userID;
    dispatch(newRequestListCount(userdtaid));
    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [requestReducer.UserRequestDetails]);
  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserDetails.userID;
    dispatch(newRequestList(userid));
  }, []);
  useEffect(() => {
    console.log("result", requestReducer.ResponseMessage);
    if (requestReducer.ResponseMessage === "Reject Successfully") {
      setOpen({
        ...open,
        open: true,
        message: "User request discarded",
      });
    }
    if (requestReducer.ResponseMessage === "Save Successfully") {
      setOpen({
        ...open,
        open: true,
        message: "Record saved",
      });
    }
  }, [requestReducer.ResponseMessage]);
  return (
    <>
      <Title level={3}>Create User</Title>
      <Row gutter={8}>
        <div style={{ marginTop: "10%" }} />
        <Col md={24} lg={24} sm={24}>
          <Table
            rows={rows}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
      {console.log(actions.add)}
      {/* modal starts here */}
      <Modal
        modalTitle={
          <h3>
            <b>{title}</b>
          </h3>
        }
        closeModal={handleCancel}
        modalState={isModalVisible}
        width={700}
      >
        {" "}
        {actions.add && (
          <>
            <Title level={5}>Are you sure you want to creat new user</Title>
            <Row gutter={8}>
              <Col md={8} lg={8} sm={24}></Col>
              <Col md={16} lg={16} sm={24}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "33.3333%" }}>
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed"
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={createUser}
                    />
                    {console.log()}
                  </div>
                  <div style={{ margin: "0 5px 0 5px" }} />
                  <div style={{ width: "33.3333%" }}>
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard"
                      icon={<i className="icon-close icon-size-one"></i>}
                      click={handleCancel}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
        {actions.edit && (
          <>
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <p className="m-0" style={{ color: "#035F5C" }}>
                Type your Comments<span style={{ color: "#FC4343" }}>*</span>
              </p>
              <TextField
                multiline
                rows={4}
                placeholder="Comments"
                change={Comments}
                value={rejectionComment}
                fullWidth
                name="Comments"
              />
            </div>
            <Row gutter={8}>
              <Col md={8} lg={8} sm={24}></Col>
              <Col md={16} lg={16} sm={24}>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "33.3333%" }}>
                    <Button
                      applyClass="buttonPrimary3"
                      text="Proceed "
                      icon={<i className="icon-check icon-size-one "></i>}
                      click={rejectUser}
                      disableBtn={btnDisabled}
                    />
                  </div>
                  <div style={{ margin: "0 5px 0 5px" }} />
                  <div style={{ width: "33.3333%" }}>
                    <Button
                      applyClass="btnBorderStyledRed"
                      text="discard "
                      icon={<i className="icon-close icon-size-one"></i>}
                      // click={() => goToSaveHandler(item, Rejected)}
                      click={handleCancel}
                      // disableBtn={btnDisabled}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {requestReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default CreateEditRoles;
