import "./App.less";
import { Switch, Route,Redirect } from "react-router-dom";
import Login from "./Container/Authentication/Login/Login";
import SignUp from "./Container/Authentication/SignUp/SignUp";
import Dashboard from "./Container/Dashboard/dashboard";
import NotFound from "./Container/404/404";
import PrivateRoute from "./Routes/PrivateRoute";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <PrivateRoute path="/WofSecurityAdmin" component={Dashboard} />
        <Route path="/404" component={NotFound} /> 
        <Redirect from='*' to='/404' />
      </Switch>
    </>
  );
};

export default App;
