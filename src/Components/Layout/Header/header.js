import React, { useEffect } from "react";
import { Layout, Typography, Tooltip } from "antd";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import UserImage from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/auth-actions";
import IconButton from "@material-ui/core/IconButton";
import { getApprovalCount } from "../../../store/actions/wof-approvals-actions";
import "./header.css";
import { useHistory } from "react-router-dom";
import Helper from "../../../Common/Functions/history_logout";
import { disableGoBack } from "../../../store/actions/ui-actions";
import {
  newRequestList,
  newRequestListCount,
} from "../../../store/actions/request-actions";
import { makeTabAvtive } from "../../../store/actions/ui-actions";

const Header = ({ Notification, title, UserDetails }) => {
  const history = useHistory();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { wofApprovals, requestReducer, ui } = state;
  const { Title } = Typography;
  const { Header } = Layout;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    history.push("CreateEditRoles");
    localStorage.setItem("parent", "sub1");
    localStorage.setItem("child", "2");
    dispatch(makeTabAvtive());
    dispatch(newRequestList(Details.userID));
  };
  Helper.history = history;
  useEffect(() => {
    Helper.history = history;
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (Details.userID === 2) {
      dispatch(getApprovalCount(Details.userID));
    }
  }, []);
  useEffect(() => {
    // define increment counter part
    const tabsOpen = localStorage.getItem("tabsOpen");
    console.log("tabsOpen", tabsOpen);
    if (tabsOpen == null) {
      localStorage.setItem("tabsOpen", 1);
    } else {
      localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
    }

    // define decrement counter part
    window.onunload = function (e) {
      const newTabCount = localStorage.getItem("tabsOpen");
      if (newTabCount !== null) {
        localStorage.setItem("tabsOpen", newTabCount - 1);
      }
    };
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.localStorage.isMySessionActive = "false";
    } else {
      const newTabCount2 = localStorage.getItem("tabsOpen");
      let value = localStorage.getItem("isMySessionActive");
      console.log("ali12345", value == "true", 3);
      if (value == "true") {
        console.log("ali12345", value == "true", 3);
        if (newTabCount2 - 1 == 0) {
          dispatch(signOut(history));
          window.localStorage.isMySessionActive = "false";
        } else {
          window.localStorage.isMySessionActive = "false";
        }
      }
    }
  }, []);
  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
      let data = UserDetails.userID;
      dispatch(newRequestListCount(data));
    }
  }, []);
  return (
    <Header className="header">
      {/* logo */}
      <div className="inner-container">
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>
        {/* middle text */}
        <div className="heading-main-container">
          <Title level={3} className="heading-main">
            {title}
          </Title>
        </div>
        {/* its go back button  */}
        {ui.isGoBack && (
          <Tooltip placement="bottom" title="Back">
            <div className="logout-icon-section">
              <div
                onClick={() => {
                  window.history.back();
                  dispatch(disableGoBack());
                }}
              >
                <div className="logout-icon">
                  <i className="icon-arrow-left icon-size-one "></i>
                </div>
              </div>
            </div>
          </Tooltip>
        )}
        {/* its notification icon */}
        {/* {Notification !== null && Notification === true ? ( */}
        {/* <Tooltip placement="bottom" title="Notification">
          <div className="notify">
            <Badge
              badgeContent={wofApprovals.ApprovalsCount}
              // color="secondary"
              overlap="circular"
            >
              <NotificationsNoneIcon fontSize="large" className="noti-icon icon-size-one"/>
            </Badge>
          </div>
          </Tooltip> */}
        {/* // ) : null} */}
        {Notification !== null && Notification === true ? (
          <Tooltip placement="bottom" title="Notification">
            <div className="notify">
              <IconButton onClick={handleClick}>
                <Badge
                  badgeContent={requestReducer.userRequestCount}
                  color="secondary"
                  overlap="circular"
                >
                  <NotificationsNoneIcon
                    fontSize="large"
                    className="noti-icon"
                  />
                </Badge>
              </IconButton>
              {/* <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                style={{ top: "45px", left: "35px" }}
              >
                <MenuItem>
                  <ListItemIcon onClick={() => {}}>
                    <i className="icon-chevron-right color-black icon-s mr-2"></i>
                    {requestReducer.userRequestCount} New User Requests
                  </ListItemIcon>
                </MenuItem>
              </Menu> */}
            </div>
          </Tooltip>
        ) : null}
        {/* its logout button */}
        <Tooltip placement="bottom" title="Logout">
          <div className="logout-icon-section">
            <div onClick={() => dispatch(signOut(history))}>
              <div className="logout-icon">
                <i className="icon-login icon-size-one "></i>
              </div>
            </div>
          </div>
        </Tooltip>
        {/* its avatar */}
        <div className="action-container">
          <div className="avatar">
            <div className="user-name">
              <p>
                {Details.firstName ? Details.firstName : null}{" "}
                {Details.lastName ? Details.lastName : null}
              </p>
            </div>
            <div className="user-figure">
              <img src={UserImage} alt="user" className={"user-icon-header"} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Header;
