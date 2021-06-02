import React, { useEffect, useState, useContext, createContext } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/userContext";

export type DATA = {
  id: string;
  expenses: { categorie: string; expense: string }[];
  categorie: string;
  expense: string;
  timestamp: any;
  uid: string;
}[];

export type DATACONTEXT = {
  data: {
    id: string;
    expenses: { categorie: string; expense: string }[];
    categorie: string;
    expense: string;
    timestamp: any;
    uid: string;
  }[];
  showid: string;
  categorie: string[];
  sum: string[];
};

export const DataOpeContext = createContext({
  setshowid: (_: string) => {
    console.log("Providerを指定してください");
  },
});
export const DataContext = createContext<DATACONTEXT>({
  data: [
    {
      id: "",
      expenses: [{ categorie: "", expense: "" }],
      categorie: "",
      expense: "",
      timestamp: "",
      uid: "",
    },
  ],
  showid: "値が見つかりません",
  categorie: [],
  sum: [],
});

const DataProvider: React.FC = ({ children }) => {
  const user = useContext(AuthContext);
  const [data, setData] = useState<DATA>([
    {
      id: "",
      expenses: [{ categorie: "", expense: "" }],
      categorie: "",
      expense: "",
      timestamp: "",
      uid: "",
    },
  ]);
  const [showid, setShowId] = useState("");
  const [categorie, setCategorie] = useState<string[]>([]);
  const [sum, setSum] = useState<string[]>([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const chartdata = [
          {
            id: "",
            expenses: [{ categorie: "", expense: "" }],
            categorie: "",
            expense: "",
            timestamp: "",
            uid: "",
          },
        ];
        snapshot.docs.map((doc) => {
          if (doc.data().uid === user.uid) {
            console.log("該当してます");
            chartdata.push({
              id: doc.id,
              expenses: doc.data()?.expenses,
              categorie: doc.data().categorie,
              expense: doc.data().expense,
              timestamp: doc.data().timestamp,
              uid: user.uid,
            });
          }
          console.log(doc.data().uid);
          console.log(user.uid);
        });
        chartdata.shift();
        setData(chartdata);
        const sums = new Map();
        snapshot.forEach((doc) => {
          if (doc.data().uid === user.uid) {
            const sort = doc.data().timestamp.match(/(\d+)\/(\d+)\/(\d+)$/);
            const cat = doc.data().categorie;
            const date = new Date();
            const thisMonth = date.getFullYear() + "/" + (date.getMonth() + 1);
            if (thisMonth == `${sort[1] + "/" + sort[2]}`) {
              //今日の日付
              if (doc.data().expenses) {
                //複数の場合の分岐
                doc.data().expenses.forEach((ex: any) => {
                  if (sums.get(ex.categorie)) {
                    //sumsにカテゴリーがあれば値を追加
                    const sum = sums.get(ex.categorie) + Number(ex.expense);
                    sums.set(ex.categorie, sum);
                  } else {
                    const add = Number(ex.expense);
                    sums.set(ex.categorie, add);
                  }
                });
              } else {
                //単体の場合の分岐
                if (sums.get(cat)) {
                  //sumsにカテゴリーがあれば値を追加
                  const sum = sums.get(cat) + Number(doc.data().expense);
                  sums.set(cat, sum);
                } else {
                  const add = Number(doc.data().expense);
                  sums.set(cat, add);
                }
              }
            }
            setCategorie(Array.from(sums.keys()));
            setSum(Array.from(sums.values()));
          }
        });
      });
  }, []);
  const setshowid = (id: string) => setShowId(id);
  return (
    <DataOpeContext.Provider value={{ setshowid }}>
      <DataContext.Provider value={{ data, showid, categorie, sum }}>
        {children}
      </DataContext.Provider>
    </DataOpeContext.Provider>
  );
};

export const useSetShowId = () => useContext(DataOpeContext).setshowid;

export default DataProvider;
