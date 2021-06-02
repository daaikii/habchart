import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { DataContext } from "../context/dataContext";

const Chart: React.FC = () => {
  const data = useContext(DataContext).data;
  const [label, setLabels] = useState<string[]>([]);
  const [sum, setSum] = useState<number[]>([]);

  useEffect(() => {
    const sums = new Map();
    data.forEach((doc) => {
      const sort = doc.timestamp.match(/(\d+)\/(\d+)\/(\d+)$/);
      const date = `${sort[1] + "/" + sort[2]}`;
      if (sums.get(date)) {
        //sumsにカテゴリーがあれば値を追加
        const sum = sums.get(date) + Number(doc.expense);
        sums.set(date, sum);
      } else {
        const add = Number(doc.expense);
        sums.set(date, add);
      }
    });
    const arrkey = Array.from(sums.keys());
    arrkey.reverse();
    setLabels(arrkey);
    const arrval = Array.from(sums.values());
    arrval.reverse();
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
        <Bar data={graphData} options={graphOption} />
      </Grid>
    </Grid>
  );
};

export default Chart;
