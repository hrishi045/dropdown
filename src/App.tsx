import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./helpers/auth";
import Dashboard from "./pages/Dashboard";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import SignupProfile from "./pages/SignupProfile";
import SignupSkills from "./pages/SignupSkills";
import ProtectedRoute from "./helpers/ProtectedRoute";
import useCookie from "react-use-cookie";
import Navbar from "./components/Navbar";

const App = () => {
  const [token, setToken] = useCookie("dd_token", "");

  const handleSetToken = (v: string) => {
    setToken(v);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      <Router>
        <Navbar />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Switch>
              <Route exact={true} path="/" component={Home}></Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup/profile">
                <SignupProfile />
              </Route>
              <Route path="/signup/skills">
                <SignupSkills />
              </Route>
              <ProtectedRoute path="/dashboard">
                <Dashboard />
              </ProtectedRoute>
            </Switch>
          </div>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
