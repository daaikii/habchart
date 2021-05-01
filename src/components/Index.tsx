import React, { useState } from "react";
import Post from "../components/Post";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import { makeStyles, Grid, Modal } from "@material-ui/core";

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

function getModalStyle() {
  const top = 30;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyled = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#ffffff",
    backgroundBlendMode: " lighten",
  },
  main: {
    alignItems: "center",
    height: "auto",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    marginTop: "10px",
  },
  table: {
    margin: "0 auto ",
  },
  tableitem: {
    fontFamily: "ＭＳ ゴシック",
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const Index: React.FC<PROPS> = ({ chartdata }) => {
  const history = useHistory();
  const [docId, setDocId] = useState("");
  const [showCategorie, setShowCategorie] = useState("");
  const [showExpense, setShowExpense] = useState("");
  const [isNan, setIsNan] = useState(false);
  const classes = useStyled();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (doc: DOC) => {
    (async () => {
      setOpenModal(true);
      setDocId(doc.id);
      const dataRef = db.collection("posts").doc(doc.id);
      const docData = await dataRef.get();
      if (docData.exists) {
        setShowCategorie(docData.data()?.categorie);
        setShowExpense(docData.data()?.expense);
      } else {
        console.log("データを受け取っていません");
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
    history.push("/");
  };

  return (
    <Grid container component="main" className={classes.container}>
      <Grid item xs={12} sm={12} md={10}>
        <div className={classes.main}>
          <table className={classes.table} key="">
            <thead>
              <tr>
                <th className={classes.tableitem}>日付</th>
                <th className={classes.tableitem}>カテゴリー</th>
                <th className={classes.tableitem}>金額</th>
              </tr>
            </thead>
            {chartdata.map((doc, index) => (
              <tbody  key={index}>
                <tr>
                  <td onClick={() => handleClick(doc)}>{doc.timestamp}</td>
                  <td>{doc.categorie}</td>
                  <td>{doc.expense}円</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </Grid>
      <Post />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={getModalStyle()} className={classes.modal}>
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
