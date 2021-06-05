import React, { useState, useEffect, useContext } from "react";
import ShowInput from "./ShowInput";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { Grid } from "@material-ui/core";
import {
  DataContext,
  useSetShowId,
  useSetExpenses,
} from "../context/dataContext";

const Show: React.FC = () => {
  const showid = useContext(DataContext).showid;
  const setshowid = useSetShowId();
  const history = useHistory();
  const [update, setUpdate] = useState<boolean>(false);
  const expenses = useContext(DataContext).expenses;
  const setexpenses = useSetExpenses();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sum = 0;
    let cat = "";
    expenses.map((doc) => {
      sum = sum + Number(doc.expense);
      if (cat == "") {
        cat = doc.categorie;
      } else {
        cat = cat + "/" + doc.categorie;
      }
    });
    db.collection("posts").doc(showid).update({
      expenses,
      expense: sum,
      categorie: cat,
    });
    setexpenses([
      {
        categorie: "",
        expense: "",
      },
    ]);
    setshowid("");
    history.push("/");
  };

  const handleDelete = () => {
    db.collection("posts").doc(showid).delete();
    history.push("/");
  };

  const addAddress = () => {
    const ec = expenses.slice();
    ec.push({ categorie: "", expense: "" });
    setexpenses(ec);
  };

  const removeAddress = () => {
    const ec = expenses.slice();
    ec.pop();
    setexpenses(ec);
    setUpdate(update ? false : true);
  };

  return (
    <Grid container className="container">
      <div className="xform">
        <form onSubmit={handleSubmit}>
          <h4 className="xform-title">入力フォーム</h4>
          <div className="xform-input">
            <label>カテゴリー</label>
            <label>金額</label>
          </div>
          {expenses.map((expense: any, index) => {
            return (
              <div key={index}>
                <ShowInput index={index} />
              </div>
            );
          })}
        </form>
        <div>
          <a className="xform-button" onClick={addAddress}>
            +
          </a>
          <a onClick={removeAddress}>-</a>
        </div>
        <button className="xform-button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </Grid>
  );
};
export default Show;
