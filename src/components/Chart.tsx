import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import { DataContext } from "../context/dataContext";

const Chart: React.FC = () => {
  const categorie = useContext(DataContext).chartCategorie;
  const sum = useContext(DataContext).chartSum;

  const graphData = {
    labels: categorie,
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
  return <Bar data={graphData} options={graphOption} />;
};

export default Chart;
