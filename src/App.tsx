import React, { useEffect,useContext } from "react";
import "./App.css";
import Hab from "./components/Hab";
import Auth from "./components/Auth";
import { auth } from "./firebase";
import UserProvider, { useLogin,useLogout,AuthContext } from "./context/userContext";

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
  <>
    {user.uid?
      <div>
        <Hab/>
      </div>
      :<>
      <Auth/>
      </>
    }
  </>
  );
};

export default App;
