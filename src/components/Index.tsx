import React, { useState, useContext } from "react";
import Post from "../components/Post";
import { db } from "../firebase";
import { Modal, Grid, Hidden } from "@material-ui/core";
import Pergraph from "./Pergraph";
import { useHistory } from "react-router";
import { DataContext } from "../context/dataContext";

export type INDEXPROPS = {
  sum: string[];
  categorie: string[];
  setshowid: React.Dispatch<React.SetStateAction<string>>;
};

type DOC = {
  id: string;
  expenses: { categorie: string; expense: string }[];
  categorie: string;
  expense: string;
  timestamp: any;
};

const Index: React.FC<INDEXPROPS> = (props) => {
  const data = useContext(DataContext);
  const [docId, setDocId] = useState("");
  const [showCategorie, setShowCategorie] = useState("");
  const [showExpense, setShowExpense] = useState("");
  const [isNan, setIsNan] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const handleClick = (doc: DOC) => {
    (async () => {
      if (doc.expenses) {
        props.setshowid(doc.id);
        history.push("/show");
      } else {
        setDocId(doc.id);
        const docRef = db.collection("posts").doc(doc.id);
        const docData = await docRef.get();
        if (docData.exists) {
          setShowCategorie(docData.data()?.categorie);
          setShowExpense(docData.data()?.expense);
          setOpenModal(true);
        } else {
          console.log("データを受け取っていません");
        }
      }
    })();
  };

  const handleCategorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCategorie(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setShowExpense(e.target.value);
      setIsNan(false);
    } else {
      setIsNan(true);
    }
  };

  const showSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(docId).update({
      categorie: showCategorie,
      expense: showExpense,
    });
    setShowCategorie("");
    setShowExpense("");
    setOpenModal(false);
  };

  const handleDelete = () => {
    db.collection("posts").doc(docId).delete();
    setOpenModal(false);
  };

  return (
    <Grid container justify="center" className="container">
      <Grid item xs={12} sm={12} lg={6}>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>カテゴリー</th>
              <th>金額</th>
            </tr>
          </thead>
          {data.map((doc, index) => (
            <tbody key={index}>
              <tr>
                <td onClick={() => handleClick(doc)}>{doc.timestamp}</td>
                <td className="table-text">{doc.categorie}</td>
                <td className="table-price">{doc.expense}円</td>
              </tr>
            </tbody>
          ))}
        </table>
      </Grid>

      <Hidden smDown>
        <Grid item lg={2}>
          <Post />
        </Grid>
      </Hidden>

      <Grid item xs={12} sm={5} lg={5}>
        <Pergraph sum={props.sum} categorie={props.categorie} />
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="modal">
          <div className="chart-form">
            <h4>編集フォーム</h4>
            <form onSubmit={showSubmit}>
              <label>
                <input
                  type="text"
                  id="categorie"
                  name="categorie"
                  value={showCategorie}
                  onChange={handleCategorieChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  id="expense"
                  name="expense"
                  value={showExpense}
                  onChange={handleValueChange}
                />
                円
              </label>
              <button type="submit" disabled={!showCategorie || !showExpense}>
                変更
              </button>
            </form>
            <span style={{ display: isNan ? "inline" : "none" }}>
              ＊数値を入力してください
            </span>
          </div>
          <div className="delete-button" onClick={handleDelete}>
            削除
          </div>
        </div>
      </Modal>
    </Grid>
  );
};

export default Index;
