import React, { useState, useContext, useEffect } from "react";
import Input from "./Input";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { Grid } from "@material-ui/core";
import { AuthContext } from "../context/userContext";
import { DataContext, useSetExpenses } from "../context/dataContext";

const Posts: React.FC = () => {
  const history = useHistory();
  const [update, setUpdate] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const expenses = useContext(DataContext).expenses;
  const setexpenses = useSetExpenses();

  const addAddress = () => {
    const ec = expenses.slice();
    ec.push({ categorie: "", expense: "" });
    setexpenses(ec);
  };

  const removeAddress = () => {
    expenses.pop();
    setUpdate(update ? false : true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newdate = new Date();
    const timestamp =
      newdate.getFullYear() +
      "/" +
      (newdate.getMonth() + 1) +
      "/" +
      newdate.getDate();
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
    db.collection("posts").add({
      expenses,
      expense: sum,
      categorie: cat,
      timestamp: timestamp,
      uid: user.uid,
    });
    setexpenses([
      {
        categorie: "",
        expense: "",
      },
    ]);
    history.push("/");
  };

  useEffect(() => {
    setexpenses([
      {
        categorie: "",
        expense: "",
      },
    ]);
  }, []);

  return (
    <Grid container className="container">
      <div className="xform">
        <form onSubmit={handleSubmit}>
          <h4 className="xform-title">入力フォーム</h4>
          <div className="xform-input">
            <label>カテゴリー</label>
            <label>金額</label>
          </div>
          {expenses.map((address, index) => {
            return (
              <div key={index}>
                <Input index={index} />
              </div>
            );
          })}
        </form>
        <div>
          <a className="" onClick={addAddress}>
            +
          </a>
          <a onClick={removeAddress}>-</a>
        </div>
      </div>
    </Grid>
  );
};

export default Posts;
