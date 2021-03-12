import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

type PROPS = {
  data: {
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
};

const Index: React.FC<PROPS> = ({ data }) => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (maxValue) {
      console.log(maxValue);
    } else {
      console.log("");
    }
  };
  return (
    <div className="container">
      <div className="serch-form">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="month"
              id="minvalue"
              name="minvalue"
              value={minValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMinValue(e.target.value);
              }}
            />
          </label>
          <label>
            <input
              type="month"
              id="maxvalue"
              name="maxvalue"
              value={maxValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMaxValue(e.target.value);
              }}
            />
          </label>
          <button type="submit" disabled={false}>
            検索
          </button>
        </form>
      </div>
      <div className="infomation">
        <ul>
          <table>
            <tbody>
              <tr>
                <th>日付</th>
                <th>カテゴリー</th>
                <th>金額</th>
              </tr>
              {data.map((key,index) => (
                <tr key={index}>
                  <td>{new Date(key.timestamp?.toDate()).toLocaleString()}</td>
                  <td>{key.categorie}</td>
                  <td>{key.expense}円</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </div>
  );
};

export default Index;
