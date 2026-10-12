import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Grid } from "@material-ui/core";
import styles from "./style.module.css";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Loader, Notification } from "../../../Components/Elements";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";

const Login = () => {
  const state = useSelector((state) => state);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const { Title } = Typography;
  const history = useHistory();
  Helper.history = history;
  const [credentials, setCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const validateHandler = (e) => {
    if (credentials.UserName === "" || credentials.Password === "") {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Credentials",
      });
    } else {
      e.preventDefault();
      dispatch(signIn(credentials, history));
    }
  };

  const route = useRouteMatch();
  const path = route.path;

  useEffect(() => {
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, [credentials]);
  useEffect(() => {
    if (ui.SomeThingWentWrong === true) {
      console.log("somthing", ui.SomeThingWentWrong);
      setOpen({
        ...open,
        open: true,
        message:
          "Unable to connect to server please check your connection or contact support",
      });
    }
  }, [ui.SomeThingWentWrong]);
  useEffect(() => {
    if (UserIDInput.current) {
      UserIDInput.current.focus();
    }
  }, [UserIDInput]);
  useEffect(() => {
    // console.log(ui.SessionExpeireResponseMessage);
    if (
      auth.SessionExpeireResponseMessage !== "" &&
      auth.SessionExpeireResponseMessage !== undefined
    ) {
      console.log("hi", ui.SessionExpeireResponseMessage);
      setOpen({
        ...open,
        open: true,
        message: auth.SessionExpeireResponseMessage,
      });
    } else {
      setOpen({
        ...open,
        open: false,
        message: "",
      });
    }
  }, [auth.SessionExpeireResponseMessage]);

  return (
    <Container maxWidth="lg">
      <form onSubmit={(e) => validateHandler(e)}>
        <Box display="flex" alignItems="center" style={{ height: "100vh" }}>
          <Grid container spacing={5}>
            <Grid item lg={6} md={6} sm={12}></Grid>
            <Grid item lg={6} md={6} sm={12} align="right">
              <Box className={styles.loginBody}>
                <Title
                  level={3}
                  style={{ color: "white", textAlign: "center", marginTop: 10 }}
                >
                  Write Off Data Capturing Portal
                </Title>
                <div style={{ marginTop: "6%" }} />
                <Title level={5} style={{ color: "white", textAlign: "left" }}>
                  User ID
                </Title>

                <Input
                  name="UserName"
                  size="large"
                  placeholder="User ID"
                  prefix={<UserOutlined />}
                  onChange={setCredentialHandler}
                  value={credentials.UserName}
                  ref={UserIDInput}
                  autoComplete="off"
                />
                <div style={{ marginTop: "5%" }} />
                <Title level={5} style={{ color: "white", textAlign: "left" }}>
                  Password
                </Title>
                <Input
                  // type="password"
                  name="Password"
                  size="large"
                  placeholder="password"
                  onChange={setCredentialHandler}
                  // value={credentials.Password}
                  // autoComplete="off"
                  // value={credentials.fakePassword}
                  autoComplete="off"
                  style={{
                    webkitTextSecurity: "disc",
                  }}
                  type="text"
                />

                {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
                  <Box align="center">
                    <div className={styles.error + " " + styles.fade}>
                      {auth.ResponseMessage}
                    </div>
                  </Box>
                ) : null}

                <div style={{ marginTop: "10%" }} />
                <Box
                  align="center"
                  display="flex"
                  justifyContent="space-evenly"
                >
                  <Button
                    applyClass="btnBorderStyled"
                    text="Login"
                    endIcon={<i className="icon-login icon-size-one"></i>}
                    type="submit"
                  />
                  {/* <Link to="/Signup">
                  <Button applyClass="btnBorderStyledRedSignup" text="Signup" />
                </Link> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </Container>
  );
};

export default Login;
