import React from "react";
import { Typography,Grid,Paper } from "@material-ui/core";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import "../sass/style.scss";

const Home: React.FC = () => {
  return (
    <Grid container component={Paper} className="container">
      <Grid item className="middle">
        <div className="home">
          <Typography variant="h4" className="home-text">HAB</Typography>
          <LocalAtmIcon className="home-icon"/>
        </div>
        <div>
          <h1>
            このアプリは<br></br>家計簿アプリです
          </h1>
        </div>
      </Grid>
      <Grid item ></Grid>
    </Grid>
  );
};

export default Home;

