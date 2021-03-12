import React,{useEffect,useState} from 'react'
import Index from './Index'
import Post from "./Post"
import Show from './Show'
import Chart from './Chart'
import {db} from '../firebase'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const Feed:React.FC = () => {
  const [chartData,setChartData]=useState([
    {
      categorie:"",
      expense:"",
      timestamp:null
    }
  ])
  
  useEffect(()=>{
    const docRef=db
    .collection("posts")
    .onSnapshot((snapshot) =>
      setChartData(
        snapshot.docs.map((doc) => ({
          categorie:doc.data().categorie,
          expense:doc.data().expense,
          timestamp:doc.data().timestamp
        }))
      )
    );
    return ()=>{
      docRef()
    }
  },[])
  
  return (
    <>
      <Router>
          <Route exact path="/" render={()=><Index data={chartData} />} />
        <Switch>
          <Route exact path="/post" component={Post} />
          <Route exact path="/show" component={Show}
          <Route exact path="/chart" component={Chart}/>
        </Switch>
      </Router>
    </>
  )
}

export default Feed
