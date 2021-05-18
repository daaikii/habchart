import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import {Grid} from "@material-ui/core";
import "../sass/style.scss"

export type PROPS = {
  chartdata: {
    id: string;
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
};

const Chart: React.FC<PROPS> = ({ chartdata }) => {
  const [label, setLabels] = useState<string[]>([]);
  const [sum, setSum] = useState<number[]>([]);
  const history = useHistory();

  useEffect(() => {
    const sums = new Map();
    console.log(chartdata)
      chartdata.forEach((doc) => {
      const sort = doc.timestamp.match(/(\d+)\/(\d+)\/(\d+)$/);
      if (sort) {
        const date = `${sort[1] + "/" + sort[2]}`;
        if (sums.get(date)) {
          const sum = sums.get(date) + Number(doc.expense);
          sums.set(date, sum);
        } else {
          const add = Number(doc.expense);
          sums.set(date, add);
        }
      } else {
        history.push("/");
      }
    });
    const arrkey=Array.from(sums.keys())
    arrkey.reverse()
    setLabels(arrkey);
    const arrval=Array.from(sums.values())
    arrval.reverse()
    setSum(arrval);
  }, []);
  const graphData = {
    labels: label,
    datasets: [
      {
        backgroundColor: "#1e90ff",
        data: sum,
        label: "月別出費額",
      },
    ],
  };
  const graphOption = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "合計出費額",
          },
          ticks: {
            beginAtZero: true,
            callback: function (value: string) {
              return `${value}(円)`;
            },
          },
        },
      ],
    },
  };
  return (
    <Grid container justify="center" className="container">
      <Grid item xs={12} sm={10} lg={10} className="freearound">
        <Bar data={graphData} options={graphOption}  />
      </Grid>
    </Grid>
  );
};

export default Chart;
