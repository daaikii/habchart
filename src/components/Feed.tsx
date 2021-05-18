import React, { useEffect, useState } from "react";
import Header from "./Header";
import Index from "./Index";
import Chart from "./Chart";
import User from "./User";
import Posts from "./Posts"
import Show from "./Show"
import { db } from "../firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Feed: React.FC = () => {
  const [categorie,setCategorie]=useState<string[]>([])
  const [sum,setSum]=useState<string[]>([])
  const [showId,setShowId] = useState("")
  const [chartData, setChartData] = useState([
    {
      id: "",
      expenses:[{categorie:"",expense:""}],
      categorie: "",
      expense: "",
      timestamp: "",
    },
  ]);
  
  useEffect(() => {
    db.collection("posts")
    .orderBy("timestamp","desc")
    .onSnapshot((snapshot) => {
      setChartData(
        snapshot.docs.map((doc)=>({
          id: doc.id,
          expenses:doc.data()?.expenses,
          categorie: doc.data().categorie,
          expense: doc.data().expense,
          timestamp: doc.data().timestamp,
        }))
        )
        const sums=new Map()
        snapshot.forEach((doc)=>{
          const sort=doc.data().timestamp.match(/(\d+)\/(\d+)\/(\d+)$/)
          const cat=doc.data().categorie
          const date=new Date
          const thisMonth=date.getFullYear()+"/"+(date.getMonth()+1)
          if(thisMonth==`${sort[1]+"/"+sort[2]}`){     //今日の日付 
            if(doc.data().expenses){                   //複数の分岐
              doc.data().expenses.forEach((ex:any)=>{
                if (sums.get(ex.categorie)) {
                  const sum = sums.get(ex.categorie) + Number(ex.expense);
                  sums.set(ex.categorie, sum);
                } else {
                const add = Number(ex.expense);
                sums.set(ex.categorie, add);
              }
            })
          }else{
            if (sums.get(cat)) {
              const sum = sums.get(cat) + Number(doc.data().expense);
              sums.set(cat, sum);
            } else {
              const add = Number(doc.data().expense);
              sums.set(cat, add);
            }
          }
        }
        setCategorie(Array.from(sums.keys()))
        setSum(Array.from(sums.values()))
      });
    });
  }, []);



  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/posts" component={Posts}/>
          <Route path="/show" render={()=><Show showid={showId} setid={setShowId} chartdata={chartData}/>}/>
          <Route path="/chart" render={() => <Chart chartdata={chartData} />} />
          <Route path="/" render={() => <Index  chartdata={chartData} sum={sum} categorie={categorie} setshowid={setShowId}  />} />
        </Switch>
      </Router>
    </>
  );
};

export default Feed;
