import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {setDoc} from '../context/docIdContext'

type PROPS = {
  data: {
    id:string;
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
};
type DOC={
    id: string;
    categorie: string;
    expense: string;
    timestamp: any;
}

const Index: React.FC<PROPS> = ( {data} ) => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (maxValue) {
      console.log(maxValue);
    } else {
      console.log("");
    }
  }
  const history=useHistory()
  const setId=setDoc()
  const handleClick=(key:DOC)=>{
    setId(key.id)
    history.push("/show")
  }
  
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
                  <td onClick={()=>handleClick(key)} >{new Date(key.timestamp?.toDate()).toLocaleString()}</td>
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
