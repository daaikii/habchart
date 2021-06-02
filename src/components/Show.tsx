import React, { useState, useEffect, useContext } from "react";
import ShowInput from "./ShowInput";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { Grid } from "@material-ui/core";
import { DataContext } from "../context/dataContext";

export type SHOW = {
  showid: string;
  setid: React.Dispatch<React.SetStateAction<string>>;
};
const Show: React.FC<SHOW> = ({ showid, setid }) => {
  const data = useContext(DataContext);
  const history = useHistory();
  const [addresses, setAddresses] = React.useState(["address.0"]);
  const [update, setUpdate] = useState<boolean>(false);
  const [expenses, setExpenses] = useState([
    {
      categorie: "",
      expense: "",
    },
  ]);

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
    setExpenses([
      {
        categorie: "",
        expense: "",
      },
    ]);
    setid("");
    history.push("/");
  };

  const handleDelete = () => {
    db.collection("posts").doc(showid).delete();
    history.push("/");
  };

  const addAddress = () => {
    const newAddresses = [...addresses];
    newAddresses.push(`address.${addresses.length}`);
    setAddresses(newAddresses);
    const cpex = [...expenses];
    cpex.push({ categorie: "", expense: "" });
    setExpenses(cpex);
  };

  const removeAddress = () => {
    addresses.pop();
    expenses.pop();
    setUpdate(update ? false : true);
  };

  useEffect(() => {
    if (showid) {
      data.map((doc) => {
        if (Object.is(doc.id, showid)) {
          setExpenses(doc.expenses);
          doc.expenses.forEach((expense: any, index: number) => {
            const address = `address.${index}`;
            addresses.splice(index, 1, address);
            setAddresses(addresses);
          });
        }
      });
    } else {
      history.push("/");
    }
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
          {addresses.map((expense: any, index) => {
            return (
              <div key={index}>
                <ShowInput
                  index={index}
                  expenses={expenses}
                  setEx={setExpenses}
                  showid={showid}
                />
              </div>
            );
          })}
        </form>
        {expenses.slice(-1)[0].categorie && expenses.slice(-1)[0].expense && (
          <div>
            <a className="xform-button" onClick={addAddress}>
              +
            </a>
            <a onClick={removeAddress}>-</a>
          </div>
        )}
        <button className="xform-button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </Grid>
  );
};
export default Show;
