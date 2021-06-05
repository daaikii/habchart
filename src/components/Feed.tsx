import React from "react";
import Header from "./Header";
import Index from "./Index";
import Chart from "./Chart";
import User from "./User";
import Posts from "./Posts";
import Show from "./Show";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataProvider from "../context/dataContext";

const Feed: React.FC = () => {
  return (
    <>
      <DataProvider>
        <Router>
          <Header />
          <Switch>
            {/*show,+inpu,Posts,+inputは変更する必要がある*/}
            <Route path="/user" component={User} />
            <Route path="/posts" component={Posts} />
            <Route path="/show" render={() => <Show />} />
            <Route path="/chart" component={Chart} />
            <Route path="/" render={() => <Index />} />
          </Switch>
        </Router>
      </DataProvider>
    </>
  );
};

export default Feed;
