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
    width: "100%",
    height: "100vh",
    backgroundColor: "#ffffff",
    backgroundBlendMode:"lighten",
  },
  content:{
    margin:"0 auto",
    display:"flex",
  },
  main: {
    alignItems:"center",
    backgroundColor: "#FFFFFF",
    fontFamily: "Open Sans, sans-serif",
    lineHeight: 1.25,
  },
  table :{
    borderCollapse:"collapse",
    margin: "0 auto",
    padding: 0,
    width: "650px",
    boxShadow: "0 0 15px -6px #00000073",
    "& tr": {
      backgroundColor: "#fff",
    },
    "& tbody tr:hover":{
      backgroundColor: "#fffae9",
    },
    "& th,td": {
      padding: ".35em 1em",
      borderBottom:  "1px solid #eee",
    },
    "& thead":{
      "& th" :{
        fontSize: ".85em",
        padding:" 1em",
      },
      "& tr":{
        backgroundColor:"#1e90ff",
        color:"#fff",
      }
    } ,
    "& tbody th": {
      textAlign:" left",
      fontSize: ".8em",
    },
  },
  txt:{
    textAlign:"center",
    fontSize: ".75em",
 },
 price:{
   textAlign: "right",
   color: "#000",
   fontWeight: "bold",
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
    <div  className={classes.container}>
      <div className={classes.content}>
        <div className={classes.main}>
          <table className={classes.table} key="">
            <thead>
              <tr>
                <th ></th>
                <th >カテゴリー</th>
                <th >金額</th>
              </tr>
            </thead>
            {chartdata.map((doc, index) => (
              <tbody  key={index}>
                <tr>
                  <td onClick={() => handleClick(doc)}>{doc.timestamp}</td>
                  <td className={classes.txt}>{doc.categorie}</td>
                  <td className={classes.price}>{doc.expense}円</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <Post />    
      </div>
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
    </div>
  );
};

export default Index;
