import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetDoc } from "../context/idContext";
import { db } from "../firebase";
import { makeStyles, Grid, Paper } from "@material-ui/core";
import styles from "./Index.module.css";
import image from "../assets/img/image.jpg";

export type PROPS = {
  chartdata: {
    id: string;
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
};

type DOC = {
  id: string;
  categorie: string;
  expense: string;
  timestamp: any;
};

const useStyled = makeStyles(() => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundBlendMode: " lighten",
  },
  content: {
    justifyContent: "center",
    width: "1000px",
    height: "auto",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
  },
  sideform: {
    textAlign: "center",
    width: "100%",
    height: "250px",
    border: "medium solid white",
    backgroundColor: "#FFFFFF",
  },
  formlist: {
    padding: 0,
    listStyle: "none",
  },
  formbutton: {
    display: "block",
    width: "100%",
  },
}));

const Index: React.FC<PROPS> = ({ chartdata }) => {
  const history = useHistory();
  const setId = useSetDoc();
  const [categorie, setCategorie] = useState("");
  const [expense, setExpense] = useState("");
  const [isNan, setIsNan] = useState(false);
  const classes = useStyled();

  const handleClick = (doc: DOC) => {
    setId(doc.id);
    history.push("/show");
  };

  const categorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie(e.target.value);
  };

  const valueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setExpense(e.target.value);
      setIsNan(false);
    } else {
      setIsNan(true);
    }
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
    db.collection("posts").add({
      categorie: categorie,
      expense: expense,
      timestamp: timestamp,
    });
    setCategorie("");
    setExpense("");
  };

  return (
    <Grid
      container
      component="main"
      className={classes.container}
      justify="center"
    >
      <Grid item xs={12} sm={12} md={10}>
        <div className={classes.content}>
          <table className="data-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>カテゴリー</th>
                <th>金額</th>
              </tr>
            </thead>
            {chartdata.map((doc, index) => (
              <tbody>
                <tr key={index}>
                  <td onClick={() => handleClick(doc)}>{doc.timestamp}</td>
                  <td>{doc.categorie}</td>
                  <td>{doc.expense}円</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={2}
        component={Paper}
        elevation={6}
        square
        className={classes.sideform}
      >
        <form onSubmit={handleSubmit}>
          <h2>簡易入力フォーム</h2>
          <div className={classes.formlist}>
            <div>
              <label>カテゴリー</label>
            </div>
            <input
              type="text"
              id="categorie"
              name="categorie"
              value={categorie}
              onChange={categorieChange}
            />
            <div>
              <label>金額</label>
            </div>
            <input
              type="text"
              id="expense"
              name="expense"
              value={expense}
              onChange={valueChange}
            />
          </div>

          <button
            type="submit"
            disabled={!categorie || !expense}
            className={classes.formbutton}
          >
            保存
          </button>
          <span style={{ display: isNan ? "inline" : "none" }}>
            ＊数値を入力してください
          </span>
        </form>
      </Grid>
    </Grid>
  );
};

export default Index;
