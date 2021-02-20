import React, { useEffect } from "react";
import "./App.css";
import Hab from "./components/Hab";
import Auth from "./components/Auth";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import UserProvider, { useLogin,useLogout,useUser } from "./context/userContext";

const App = () => {
  const login = useLogin();
  const logout = useLogout();
  const user=useUser;
  
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        login(authUser);
      }else{
        logout();
      }
    });
    return ()=>unSub()
  },[login||logout]);
  
  return (
    <UserProvider>
      <BrowserRouter>
        <Switch>
          {user?
          <>
            <Route exact path="/hab" component={Hab} />
          </>
          :
          <>
            <Route path="/" component={Auth} />
          </>
          }
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
