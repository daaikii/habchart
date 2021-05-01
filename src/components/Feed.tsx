import React, { useEffect, useState } from "react";
import Header from "./Header";
import Index from "./Index";
import Chart from "./Chart";
import User from "./User";
import { db } from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Feed: React.FC = () => {
  const [chartData, setChartData] = useState([
    {
      id: "",
      categorie: "",
      expense: "",
      timestamp: "",
    },
  ]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        snapshot.docs.sort(function (a, b) {
          if (a.data().timestamp < b.data().timestamp) {
            return -1;
          } else {
            return 1;
          }
        });
        setChartData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            categorie: doc.data().categorie,
            expense: doc.data().expense,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/chart" render={() => <Chart chartdata={chartData} />} />
          <Route path="/" render={() => <Index chartdata={chartData} />} />
        </Switch>
      </Router>
    </>
  );
};

export default Feed;
