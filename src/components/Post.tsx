import React, { useState } from "react";
import { db } from "../firebase";
import { makeStyles, Grid } from "@material-ui/core";

const useStyled = makeStyles((theme) => ({
  sideform: {
    marginTop: "10px",
    textAlign: "center",
    width: "100%",
    height: "250px",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  formlist: {
    padding: 0,
    listStyle: "none",
    "& input:focus": {
      borderColor: "#C0D85C",
      boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.2)",
    },
  },
  formbutton: {
    width: "10rem",
  },
}));

const Post: React.FC = () => {
  const [categorie, setCategorie] = useState("");
  const [expense, setExpense] = useState("");
  const [isNan, setIsNan] = useState(false);
  const classes = useStyled();

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
    <Grid item xs={false} sm={false} md={2} className={classes.sideform}>
      <form onSubmit={handleSubmit}>
        <h2>入力フォーム</h2>
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
  );
};

export default Post;
