import React, { useEffect,useContext } from "react";
import "./App.module.css";
import Post from "./components/Post";
import Auth from "./components/Auth";
import Chart from "./components/Chart"
import { auth } from "./firebase";
import { useLogin,useLogout,AuthContext } from "./context/userContext";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const App = () => {
  const user = useContext(AuthContext);
  const login = useLogin();
  const logout = useLogout();
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        login(authUser);
      }else{
        logout();
      }
    });
    return ()=>unSub()
  },[useLogin||useLogout]);
  
  return (
  <Router>
      {user.uid?
        <div>
          <Switch>
            <Route exact path="/post" component={Post}/>
            <Route exact path="/" component={Chart}/>
          </Switch>
        </div>
        :<div>
          <Route component={Auth}/>
        </div>
      }
  </Router>
  );
};

export default App;
