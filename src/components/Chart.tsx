import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import { PROPS } from "./Index";
import { makeStyles } from "@material-ui/core";

const useStyled = makeStyles(() => ({
  container: {
    height: "100vh",
  },
}));

const Chart: React.FC<PROPS> = ({ chartdata }) => {
  const [label, setLabels] = useState<string[]>([""]);
  const [sum, setSums] = useState<number[]>([]);
  const history = useHistory();
  const classes = useStyled();

  const handleChangeIndex = () => {
    history.push("/");
  };

  useEffect(() => {
    const sums = new Map();
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
    setLabels(Array.from(sums.keys()));
    setSums(Array.from(sums.values()));
  }, []);
  const graphData = {
    labels: label,
    datasets: [
      {
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
    <div className={classes.container}>
      <div className="data-graph">
        <Bar data={graphData} options={graphOption} />
      </div>
    </div>
  );
};

export default Chart;
