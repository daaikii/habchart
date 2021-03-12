import React, { useEffect,useContext } from "react";
import "./App.module.css";
import Auth from "./components/Auth";
import Feed from "./components/Feed"
import { auth } from "./firebase";
import { useLogin,useLogout,AuthContext } from "./context/userContext";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const App:React.FC = () => {
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
          <Feed/>
        </div>
        :<div>
          <Auth/>
        </div>
      }
  </Router>
  );
};

export default App;
