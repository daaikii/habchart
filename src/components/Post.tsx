import React, { useState } from "react";
import { db } from "../firebase";

const Post: React.FC = () => {
  const [categorie, setCategorie] = useState("");
  const [expense, setExpense] = useState("");
  const [isNan, setIsNan] = useState(false);

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
    <div className="yform">
      <form onSubmit={handleSubmit}>
        <h4>入力フォーム</h4>
        <div className="yform-list">
          <div>
            <label>カテゴリー</label>
          </div>
          <input
            type="text"
            id="categorie"
            name="categorie"
            value={categorie}
            onChange={categorieChange}
            className="yform-input"
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
            className="yform-input"
          />
        </div>

        <button
          type="submit"
          disabled={!categorie || !expense}
          className="yform-button"
        >
          保存
        </button>
        <span style={{ display: isNan ? "inline" : "none" }}>
          ＊数値を入力してください
        </span>
      </form>
    </div>
  );
};

export default Post;