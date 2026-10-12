import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Fade } from "@material-ui/core";
import styles from "./style.module.css";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, InputWithBtn, Loader } from "../../../Components/Elements";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorBar from "./ErrorBar/error-bar";
import TextField from "../../../Components/Elements/InputFields/TextField/text-field";
import Select from "../../../Components/Elements/InputFields/SelectBox/select-box";
import GroupedButtons from "../../../Components/Elements/GroupedButtons/grouped-buttons";
import {
  checkEmptyField,
  validEmailAddress,
} from "../../../Common/Functions/validations";

// import ripple from "../../../assets/images/ripple"

const SignUp = () => {
  // to be use when get the api
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { auth ,ui} = state;

  const { Title } = Typography;

  const errorMessagesStr = {
    notVerified: `could not be verified`,
    emptyField: `Please Enter`,
  };
  const [credentials, setCredentials] = useState({
    emailAddress: {
      content: "",
      isError: true,
      isSuccess: false,
      errorMessage: "",
      isFail: false,
    },
    password: {
      content: "",
      isSuccess: false,
      isError: true,
      errorMessage: "",
      isFail: false,
    },
    completed: false,
  });

  const [bio, setBio] = useState({
    email: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    userName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    firstName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    lastName: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    personalNumber: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    departments: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
    roles: {
      content: "",
      isError: false,
      errorMessage: "",
      isSuccess: false,
    },
  });
  // Notification Error
  const [open, setOpen] = useState({
    open:false,
    message:''
  });
  useEffect(() => {
    console.log(ui.SomeThingWentWrong)
    if (ui.SomeThingWentWrong===true) {
      setOpen({
        ...open,
        open:true,
        message:"SomeThing Went Wrong Please Check Your Internet Connection"
      });
    }
  }, [ui.SomeThingWentWrong]);
  // handler just to set values from fields to state:
  const setFieldsHandler = (e) => {
    console.log("name: ", e.target.name, "value: ", e.target.value);

    let fieldName = e.target.name;
    let fieldValue = e.target.value;

    switch (fieldName) {
      case "emailAddress":
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "password":
        setCredentials({
          ...credentials,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "firstName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "lastName":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "personalNumber":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "departments":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      case "roles":
        setBio({
          ...bio,
          [fieldName]: { ...credentials[fieldName], content: fieldValue },
        });
        break;
      default:
        return null;
    }
  };

  // to set body background
  useEffect(() => {
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  // handler to check validity :
  const checkValidity = (section) => {
    switch (section) {
      case "verify-email":
        if (credentials.emailAddress.content == "") {
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: true,
              content: "",
              isFail: true,
            },
          });
        } else
          setCredentials({
            ...credentials,
            emailAddress: {
              ...credentials.emailAddress,
              isError: false,
              isFail: false,
              isSuccess: true,
            },
          });
        break;
      case "verify-password":
        if (credentials.password.content == "") {
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: true,
              isFail: true,
              content: "",
            },
            completed: false,
          });
        } else {
          setCredentials({
            ...credentials,
            password: {
              ...credentials.password,
              isError: false,
              isSuccess: true,
            },
            completed: true,
          });
        }

        break;

      case "verify-bio":
        let keys = Object.keys(bio);
        var copyState = { ...bio };
        console.log(copyState);
        keys.forEach((item) => {
          if (copyState[item].content == "") {
            copyState[item].isError = true;
            copyState[item].errorMessage = "The Field is Empty";
          }
        });
        setBio({ ...copyState });
        break;
      default:
        break;
    }
  };

  const buttonProps = {
    primaryButton: {
      text: "Signup",
      icon: <i className="icon-sent icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeachSignup",
      size: "small",
      disable: false,
      click: () => checkValidity("verify-bio"),
    },
    secondaryButton: {
      text: "Go Back",
      icon: null,
      endIcon: "",
      class: "btnBorderStyledRedSignup",
      size: "small",
      disable: false,
      click: () => window.history.back(),
    },
  };
  return (
    <Container maxWidth="lg">
      <Box display="flex" style={{ height: "100vh" }}>
        <Grid container spacing={5}>
          <Grid item lg={6} md={6} sm={12}></Grid>
          <Grid item lg={6} md={6} sm={12} align="right">
            <Box className={styles.loginBody}>
              <Title
                level={3}
                style={{ color: "white", textAlign: "center", marginTop: 10 }}
              >
                Sign Up Request
              </Title>

              <div style={{ marginTop: "6%" }} />

              {/* first step code */}
              {!credentials.completed && (
                <>
                  <InputWithBtn
                    onchange={setFieldsHandler}
                    placeholder="Enter Email Address"
                    size="medium"
                    type="email"
                    fullWidth
                    name="emailAddress"
                    textFieldSize="small"
                    applyClass="next"
                    click={() => checkValidity("verify-email")}
                    value={credentials.emailAddress.content}
                    icon={
                      credentials.emailAddress.isError === false ? (
                        <i className="icon-check  icon-size-one"></i>
                      ) : (
                        <i className="icon-arrow-right icon-size-one"></i>
                      )
                    }
                  />
                  {/* ErrorBar of Email */}
                  {credentials.emailAddress.isFail && (
                    <ErrorBar errorText="This is a error" />
                  )}

                  {!credentials.emailAddress.isError && (
                    <>
                      {" "}
                      <div style={{ marginTop: "10%" }} />
                      <InputWithBtn
                        placeholder="Enter Password"
                        onchange={setFieldsHandler}
                        value={credentials.password.content}
                        size="medium"
                        type="password"
                        name="password"
                        fullWidth
                        textFieldSize="small"
                        click={() => checkValidity("verify-password")}
                        applyClass="next"
                        icon={
                          credentials.password.isError === false ? (
                            <i className="icon-check  icon-size-one"></i>
                          ) : (
                            <i className="icon-arrow-right icon-size-one"></i>
                          )
                        }
                      />
                    </>
                  )}
                  {/* ErrorBar of Email */}
                  {credentials.password.isFail && (
                    <ErrorBar errorText="This is a error" />
                  )}
                </>
              )}
              {/* second step component  */}
              {!credentials.emailAddress.isError &&
              !credentials.password.isError ? (
                <Grid container align="left" spacing={5}>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Email</label>
                    <TextField
                      size="small"
                      placeholder="Enter Email"
                      disable
                      value={bio.email.content}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Username</label>
                    <TextField
                      size="small"
                      placeholder="Enter User Name"
                      disable
                      value={bio.userName.content}
                    />
                    {/* <ErrorBar errorText="" /> */}
                  </Grid>

                  <div style={{ marginTop: "30px" }} />

                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>First Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter First Name"
                      name="firstName"
                      change={setFieldsHandler}
                      value={bio.firstName.content}
                    />

                    {bio.firstName.isError && (
                      <ErrorBar errorText={bio.firstName.errorMessage} />
                    )}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Last Name</label>
                    <TextField
                      size="small"
                      placeholder="Enter Last Name"
                      name="lastName"
                      change={setFieldsHandler}
                      value={bio.lastName.content}
                    />
                    {bio.lastName.isError && (
                      <ErrorBar errorText={bio.lastName.errorMessage} />
                    )}
                  </Grid>
                  <div style={{ marginTop: "30px" }} />
                  <Grid item md={12} lg={12}>
                    <label className={styles.lable}>Personal Number</label>
                    <TextField
                      size="small"
                      placeholder="Enter Personal Mobile Number"
                      fullWidth
                      name="personalNumber"
                      change={setFieldsHandler}
                      value={bio.personalNumber.content}
                    />
                    {bio.personalNumber.isError && (
                      <ErrorBar errorText={bio.personalNumber.errorMessage} />
                    )}
                  </Grid>
                  <div style={{ marginTop: "30px" }} />
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Department</label>
                    <Select
                      required
                      placeholder="Select"
                      change={setFieldsHandler}
                      value={bio.departments.content}
                      name="departments"
                    />
                    {bio.departments.isError && (
                      <ErrorBar errorText={bio.departments.errorMessage} />
                    )}
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <label className={styles.lable}>Role</label>
                    <Select
                      required
                      placeholder="Select"
                      change={setFieldsHandler}
                      value={bio.roles.content}
                      name="roles"
                    />
                    {bio.roles.isError && (
                      <ErrorBar errorText={bio.roles.errorMessage} />
                    )}
                  </Grid>
                  <Grid align="center" md={12} lg={12}>
                    <div style={{ marginTop: "30px" }} />
                    <GroupedButtons data={buttonProps} />
                  </Grid>
                </Grid>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <Notification setOpen={setOpen} open={open.open} message={open.message} /> */}
      {auth.Loading ? <Loader /> : null}
    </Container>
    
  );
};

export default SignUp;
