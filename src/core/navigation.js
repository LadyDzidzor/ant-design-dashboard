import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";

const AppNavigation = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </>
  );
};

export default AppNavigation;
