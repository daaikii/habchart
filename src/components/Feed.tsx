import React,{useEffect,useState} from 'react'
import Index from './Index'
import Post from "./Post"
import Show from './Show'
import Chart from './Chart'
import {db} from '../firebase'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import styled from 'styled-components'

const Feed:React.FC = () => {
  const [chartData,setChartData]=useState([
    {
      id:"",
      categorie:"",
      expense:"",
      timestamp:""
    }
  ])
  

  useEffect(()=>{
    db.collection("posts")
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot) =>{
      setChartData(
        snapshot.docs.map((doc) => ({
          id:doc.id,
          categorie:doc.data().categorie,
          expense:doc.data().expense,
          timestamp:doc.data().timestamp
        }))
      )
    });
  },[])
  
  
  return (
    <>
      <Router>
        <Route exact path="/" render={()=><Index chartdata={chartData}  />} />
        <Switch>
          <Route exact path="/chart" render={()=><Chart chartdata={chartData}/>}/>
          <Route exact path="/post" component={Post} />
          <Route exact path="/show" component={Show}/>
          <Route exact path="/chart" component={Chart}/>
        </Switch>
      </Router>
    </>
  )
}

export default Feed
