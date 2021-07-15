import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import SignupProfile from "./pages/SignupProfile";
import SignupSkills from "./pages/SignupSkills";

const App = () => {
  return (
    <Router>
      <nav>
        <ul className="flex">
          <li className="py-2 px-3">
            <Link to="/">Home</Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/login">Login</Link>
          </li>
          <li className="py-2 px-3">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact={true} path="/" component={Home}></Route>
        <Route path="/login">
          <Login />
        </Route>{" "}
        <Route path="/signup/profile">
          <SignupProfile />
        </Route>
        <Route path="/signup/skills">
          <SignupSkills />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
