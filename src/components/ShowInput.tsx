import React, { useEffect, useState, useContext } from "react";
import { DataContext, useSetExpenses } from "../context/dataContext";

type PROPS = {
  index: number;
};

const ShowInput: React.FC<PROPS> = ({ index }) => {
  const [categorie, setCategorie] = useState("");
  const [expense, setExpense] = useState("");
  const [isNan, setIsNan] = useState<boolean>(false);
  const expenses = useContext(DataContext).expenses;
  const setexpenses = useSetExpenses();

  const categorieChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie(e.target.value);
    expenses.splice(index, 1, { categorie: e.target.value, expense: expense });
    setexpenses(expenses);
  };

  const valueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setExpense(e.target.value);
      const newArray = expenses.slice();
      newArray.splice(index, 1, {
        categorie: categorie,
        expense: e.target.value,
      });
      setexpenses(newArray);
      setIsNan(false);
    } else {
      setIsNan(true);
    }
  };

  useEffect(() => {
    setCategorie(expenses[index]?.categorie);
    setExpense(expenses[index]?.expense);
  }, []);

  return (
    <>
      <div className="xform-input">
        <input
          type="text"
          id="categorie"
          name="categorie"
          value={categorie}
          onChange={categorieChange}
          className=""
        />
        <input
          type="text"
          id="expense"
          name="expense"
          value={expense}
          onChange={valueChange}
          className=""
        />
      </div>
      <span className={isNan ? "inline" : "none"}>
        ＊数値を入力してください
      </span>
      {expenses.length == index + 1 && (
        <button
          className="xform-button"
          disabled={isNan || !categorie || !expense}
        >
          保存
        </button>
      )}
    </>
  );
};

export default ShowInput;
