import React, { useState, useContext, createContext } from "react";
import { AuthContext } from "./userContext";

export type DATA = {
  id: string;
  expenses: { categorie: string; expense: string }[];
  categorie: string;
  expense: string;
  timestamp: any;
  uid: string;
}[];

export const DataContext = createContext<DATA>([
  {
    id: "",
    expenses: [{ categorie: "", expense: "" }],
    categorie: "",
    expense: "",
    timestamp: "",
    uid: "",
  },
]);
export const DataOpeContext = createContext({
  setdata: (_: DATA) => {
    console.error("Providerを指定してください");
  },
});

const DataProvider: React.FC = ({ children }) => {
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
  const setdata = (d: DATA) => setData(d);
  return (
    <DataOpeContext.Provider value={{ setdata }}>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </DataOpeContext.Provider>
  );
};

export const useSetData = () => useContext(DataOpeContext).setdata;

export default DataProvider;
