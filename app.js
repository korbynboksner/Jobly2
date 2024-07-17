import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import JoblyApi from "./api";
import NavBar from "./NavBar";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserContext from "./UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import ProtectedRoute from "./ProtectedRoute";
import ProfileForm from "./ProfileForm";

function App() {
  const [token, setToken] = useLocalStorage("jobly-token");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        const { username } = jwtDecode(token);
        JoblyApi.token = token;
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute exact path="/companies" component={CompanyList} />
          <ProtectedRoute exact path="/companies/:handle" component={CompanyDetail} />
          <ProtectedRoute exact path="/jobs" component={JobList} />
          <ProtectedRoute exact path="/profile" component={ProfileForm} />
          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

