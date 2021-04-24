import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/userContext";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { useSetDoc } from "../context/idContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DehazeIcon from "@material-ui/icons/Dehaze";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const useStyled = makeStyles((theme) => ({
  headerwrapper: {
    width: "100%",
    height: "100px",
    padding: "0",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: " rgba(250, 250, 250)",
    boxShadow: "1px 2px 4px -1px rgba(0,0,0,0.3)",
  },
  icon: {
    cursor: "pointer",
    margin: "20px",
  },
  menuButton: {
    position: "absolute",
    right: 10,
  },
  menuList: {
    position: "absolute",
    width: 300,
    height: 500,
    right: 10,
    top: 70,
    backgroundColor: "white",
    boxShadow: "4px 0px 4px 4px rgba(0,0,0,0.3)",
    borderRadius: 10,
  },
}));
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyled();
  const menuRef: any = useRef();
  const history = useHistory();
  const setId = useSetDoc();
  const user = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signOut();
  };
  const handleChangeIndex = () => {
    setId("");
    history.push("/");
  };

  useEffect(() => {
    isOpen && menuRef.current.focus();
  }, [isOpen]);
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.headerwrapper}>
          <Button onClick={handleChangeIndex} className={classes.icon}>
            <Typography variant="h4">Hab</Typography>
            <LocalAtmIcon />
          </Button>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="menu"
            onClick={() => setIsOpen(isOpen ? false : true)}
          >
            <DehazeIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isOpen && (
        <ul
          className={classes.menuList}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          ref={menuRef}
          tabIndex={1}
        >
          <li>ユーザー設定</li>
          <li>支出</li>
          {user.uid ? (
            <li onClick={handleLogout}>ログアウト</li>
          ) : (
            <li onClick={handleLogout}>ログイン</li>
          )}
        </ul>
      )}
    </>
  );
};

export default Header;
