import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
const useStyled = makeStyles((theme) => ({
  container: {
    display: "flex",
    height:"100vh",
    width: "100%",
    alignItems:"center"
  },
  homeIrust: {
    display: "flex",
    alignItems: "center",
    boxShadow: "inset 4px 0px 4px 4px rgba(0,0,0,0.3)",
  },
  irustText:{
    fontSize:"7em"
  },
  irustIcon: {
    fontSize: "5em",
  },
  main: {
    fontSize: "2em",
  },
  [theme.breakpoints.down("sm")]:{
    title:{
      marginLeft: theme.spacing(4),
      height: "80vh",
    },
  },
  [theme.breakpoints.up("md")]:{
    title:{
      marginLeft: theme.spacing(15),
      height: "80vh",
    },
  },
  [theme.breakpoints.up("lg")]:{
    title:{
      marginLeft: theme.spacing(20),
      height: "60vh",
    },
  }
}));
const Home: React.FC = () => {
  const classes = useStyled();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div className={classes.homeIrust}>
          <Typography variant="h4" className={classes.irustText}>
            HAB
          </Typography>
          <LocalAtmIcon className={classes.irustIcon} />
        </div>
        <div className={classes.main}>
          <p>
            このアプリは<br></br>家計簿アプリです
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

