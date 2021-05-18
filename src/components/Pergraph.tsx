import React from 'react'
import {Doughnut} from "react-chartjs-2"
import "../sass/style.scss"

type GRAPHROPS={
  chartdata: {
    id: string;
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
  sum:string[]
  categorie:string[]
}

const Pergraph:React.FC<GRAPHROPS> = (props) => {
  const graphData={
    datasets:[{
      data:props.sum,
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
    labels:props.categorie
  }
  const option={
    plugin:{
      labels:{
        text: '消費割合',
        color: '#666666',
        font: {
          size: 30,
        },
      },
    }
  }
  return (
    <div className="">
      <Doughnut data={graphData} options={option}/>
    </div>
  )
}

export default Pergraph
