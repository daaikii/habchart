import React, { useState } from "react";
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
  const top = 50;
  const left = 50;

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
  const [categorie, setCategorie] = useState("");
  const [showCategorie, setShowCategorie] = useState("");
  const [expense, setExpense] = useState("");
  const [showExpense, setShowExpense] = useState("");
  const [isNan, setIsNan] = useState(false);
  const classes = useStyled();
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (doc: DOC) => {
    (async () => {
      setOpenModal(true);
      setDocId(doc.id);
      if (docId) {
        const dataRef = db.collection("posts").doc(docId);
        const docData = await dataRef.get();
        if (docData.exists) {
          setShowCategorie(docData.data()?.categorie);
          setShowExpense(docData.data()?.expense);
        } else {
          console.log("データを受け取っていません");
        }
      } else {
        history.push("/");
      }
    })();
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

  const handleCategorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie(e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setExpense(e.target.value);
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
    history.push("/");
    setShowCategorie("");
    setShowExpense("");
  };

  const handleDelete = () => {
    db.collection("posts").doc(docId).delete();
    history.push("/");
  };

  return (
    <Grid container component="main" className={classes.container}>
      <Grid item xs={12} sm={12} md={10}>
        <div className={classes.main}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.tableitem}>日付</th>
                <th className={classes.tableitem}>カテゴリー</th>
                <th className={classes.tableitem}>金額</th>
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
              <button type="submit" disabled={!categorie || !expense}>
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
