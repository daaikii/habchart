import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
const useStyled = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    objectFit: "contain",
  },
  homeIrust: {
    display: "flex",
    margin: "0 auto",
    marginTop: 10,
    marginBottom: 10,
    padding: 0,

    alignItems: "center",
    boxShadow: "inset 4px 0px 4px 4px rgba(0,0,0,0.3)",
  },
  irustText: {
    fontSize: "7em",
  },
  irustIcon: {
    fontSize: "3em",
  },
  main: {
    width: "60%",
    fontSize: "4em",
    textAlign: "center",
  },
}));
const Home: React.FC = () => {
  const classes = useStyled();
  return (
    <div className={classes.container}>
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
  );
};

export default Home;
