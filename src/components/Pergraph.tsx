import React,{useEffect,useState} from 'react'
import {PROPS} from "./Index"
import {Doughnut} from "react-chartjs-2"
import {useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core"
import 'chartjs-plugin-doughnutlabel'
import 'chartjs-plugin-labels'

const useStyled=makeStyles((theme)=>({
  container:{
    height:"100vh",
  }
}))
const Pergraph:React.FC<PROPS> = ({chartdata}) => {
  const classes=useStyled()
  const history=useHistory()
  const [categorie,setCategorie]=useState<string[]>([])
  const [sum,setSum]=useState<string[]>([])
  const color=["#b0c4de","#ffc0cb","#66cdaa","#ffffe0"]
  const sums=new Map()
  useEffect(()=>{
    chartdata.forEach((doc)=>{
      const sort=doc.timestamp.match(/(\d+)\/(\d+)\/(\d+)$/)
      const cat=doc.categorie
      const date=new Date
      const thisMonth=date.getFullYear()+"/"+(date.getMonth()+1)
      if(sort){
      if(thisMonth==`${sort[1]+"/"+sort[2]}`){      
        if (sums.get(cat)) {
          const sum = sums.get(cat) + Number(doc.expense);
          sums.set(cat, sum);
        } else {
          const add = Number(doc.expense);
          sums.set(cat, add);
        }
      }
      }else{
        history.push("/")
      }
      setCategorie(Array.from(sums.keys()))
      setSum(Array.from(sums.values()))
    })
  },[])
  const graphData={
    datasets:[{
      data:sum,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
    labels:categorie
  }
  const option={
    plugins: {
      doughnutlabel: {
        labels: 
          {
            percision:1,
            text: '消費割合',
            color: '#666666',
            font: {
              size: 30,
            },
          },
        
      },
    }
  }
  return (
    <div className={classes.container}>
      <Doughnut data={graphData} options={option} />
    </div>
  )
}

export default Pergraph
