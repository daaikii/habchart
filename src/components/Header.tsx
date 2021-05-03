import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/userContext";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const useStyled = makeStyles((theme) => ({
  headerWrapper: {
    height:"10vh",
    backgroundColor: " rgba(250, 250, 250)",
    boxShadow: "1px 2px 4px -1px rgba(0,0,0,0.2)",
    position: "relative",
  },
  icon: {
    margin: "5px",
  },
  iconIrust: {
    fontSize: "2rem",
  },
  menuButton: {
    position: "absolute",
    right: 10,
  },
  menuList: {
    padding: "0 0.6em",
    textAlign: "center",
    listStyle: "none",
    position: "absolute",
    width: "10em",
    right: "0.7em",
    top: "3.1em",
    backgroundColor: "white",
    boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.1)",
    borderRadius: "3px",
  },
  menuUser: {
    cursor: "pointer",
    margin: "0.5rem ",
    "& div": {
      margin: "0 auto",
    },
    "& p": {
      margin: "0",
    },
  },
  menuItems: {
    cursor: "pointer",
    marginTop: -1,
    padding: "0.2em",
    borderTop: "1px dashed rgba(0,0,0,0.1)",
  },
}));
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(AuthContext);
  const classes = useStyled();
  const menuRef: any = useRef();
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
  };
  const handleLogin = () => {
    history.push("/auth");
  };

  const handleChangeIndex = () => {
    history.push("/");
  };
  const changeChart = () => {
    history.push("/chart");
  };
  const changeUser = () => {
    history.push("/user");
  };
  useEffect(() => {
    isOpen && menuRef.current.focus();
  }, [isOpen]);
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.headerWrapper}>
          <Button onClick={handleChangeIndex} className={classes.icon}>
            <Typography variant="h4">Hab</Typography>
            <LocalAtmIcon className={classes.iconIrust} />
          </Button>
          {user.uid ? (
            <Button
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              onClick={() => setIsOpen(isOpen ? false : true)}
            >
              <DehazeIcon fontSize="large" />
            </Button>
          ) : (
            <Button className={classes.menuButton} onClick={handleLogin}>
              <h3>Login</h3>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {isOpen && (
        <ul
          className={classes.menuList}
          onBlur={() => setIsOpen(false)}
          ref={menuRef}
          tabIndex={1}
        >
          <div className={classes.menuUser} onClick={changeUser}>
            <div>
              <Avatar src={user.photoURL}></Avatar>
            </div>
            <p>{user.displayName}</p>
          </div>
          <li className={classes.menuItems} onClick={changeChart}>
            月別グラフ
          </li>
          <li className={classes.menuItems} onClick={handleLogout}>
            ログアウト
          </li>
        </ul>
      )}
    </>
  );
};

export default Header;
