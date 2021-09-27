import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../pages/common/login";
import { CreateAccount } from "../pages/common/createAccount";

export const LoggedOutRoute = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/create-account">
        <CreateAccount />
      </Route>
    </Switch>
  </Router>
);
