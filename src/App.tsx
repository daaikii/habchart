import React, { useEffect, useContext } from "react";
import "./App.module.css";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Feed from "./components/Feed";
import { auth } from "./firebase";
import { useLogin, useLogout, AuthContext } from "./context/userContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  const user = useContext(AuthContext);
  const login = useLogin();
  const logout = useLogout();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        login(authUser);
      } else {
        logout();
      }
    });
    return () => unSub();
  }, [useLogin || useLogout]);

  return (
    <>
      <Router>
        {user.uid ? (
          <Feed />
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Auth} />
          </Switch>
        )}
      </Router>
    </>
  );
};

export default App;
