import { stringify } from 'node:querystring'
import React,{useEffect,useState} from 'react'
import {Bar} from 'react-chartjs-2'
import {PROPS} from './Index'
const Chart:React.FC<PROPS> = ({arg}) => {
  const [date,setDate] =useState([""])
  const [sum,setSum] =useState([""])
  useEffect(()=>{
    const unDo=()=>{
    arg.map((doc,index)=>{
      const year=new Date(doc.timestamp.getFullyear().toDate()).toLocaleString()
      const mon=new Date(doc.timestamp.getMonth().toData()).toLocaleString()
      const dateLabel=year+mon
      const dat = String(dateLabel)
      for(let i=0;i<date.length;i++){
        switch(date[i]){
          case dateLabel:
            const replace=date.slice()
            replace[i]=dateLabel
            setDate(replace)
            const val=sum.slice()
            const value=val[i]
            val[i]=value+doc.expense
            setSum(val)
            break;
          case "":
            setDate([dateLabel])
            setSum([doc.expense])
            break
          default:
            const newLabel=date.slice()
            newLabel.push(dateLabel)
            setDate(newLabel)
            const newVal=sum.slice()
            newVal.push(doc.expense)
            setSum(newVal)
            break
        }
      }
    })
  };return ()=>unDo()
  },[])
  const graphData={
    labels:date,
    datasets:[{
      data:sum
    }]
  }
  return (
    <div>
      <Bar data={graphData} />
    </div>
  )
}

export default Chart
