import React,{useEffect,useState} from 'react'
import {db} from '../firebase'
import {useHistory} from 'react-router-dom'

const Chart:React.FC = () => {
  const [chartData,setChartData]=useState([{}])
  const history=useHistory();
  const handleClick=()=>{
    history.push("/post")
  }
  
  useEffect(()=>{
    const docRef=db.collection("posts").get().then((docs)=>{
      docs.forEach((doc)=>{
        if (doc.exists) {
          setChartData([{
              data: doc.data(),
          }]);
          console.log(doc.data())
      } else {
          alert("メンバーが見つかりませんでした。");
      }})
    })
    return 
  },[])
  
  return (
    <div className="container">
      <button onClick={handleClick}>値を入力する</button>
    </div>
  )
}

export default Chart
