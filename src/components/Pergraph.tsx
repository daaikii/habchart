import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../context/dataContext";

const Pergraph: React.FC = () => {
  const categorie = useContext(DataContext).perCategorie;
  const sum = useContext(DataContext).perSum;
  const graphData = {
    datasets: [
      {
        data: sum,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
    labels: categorie,
  };
  const option = {
    plugin: {
      doughnutlabels: {
        text: "消費割合",
        color: "#666666",
        font: {
          size: 30,
        },
      },
    },
  };
  return (
    <div className="doghnut">
      <h4 className="doghnut-title">今月の使用割合</h4>
      <Doughnut data={graphData} options={option} />
    </div>
  );
};

export default Pergraph;
