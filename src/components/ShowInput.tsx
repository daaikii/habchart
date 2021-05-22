import React,{useEffect, useState} from 'react'
import {db} from "../firebase"

type PROPS={
  index:number;

  expenses: {
    categorie: string;
    expense: string;
  }[];

  setEx:React.Dispatch<React.SetStateAction<{
    categorie: string;
    expense: string;
  }[]>>;

  showid:string
}

const ShowInput:React.FC<PROPS> = ({index,expenses,setEx,showid}) => {
  const [categorie,setCategorie]=useState("")
  const [expense,setExpense]=useState("")
  const [isNan,setIsNan]=useState<boolean>(false)

  const categorieChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie(e.target.value);
    expenses.splice(index,1,{categorie:e.target.value,expense:expense})
    setEx(expenses)
  };

  const valueChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      setExpense(e.target.value);
      const newArray=expenses.slice()
      newArray.splice(index,1,{categorie:categorie,expense:e.target.value})
      setEx(newArray)
      setIsNan(false);
    } else {
      setIsNan(true);
    }
  };

  useEffect(()=>{
    if(showid){
      (async ()=>{
        const docRef=db.collection("posts").doc(showid)
        const docData=await docRef.get()
        if(docData.exists){
          setCategorie(docData.data()?.expenses[index]?.categorie)
          setExpense(docData.data()?.expenses[index]?.expense)
        }
      })()
    }
  },[])

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
      <span className={isNan ? "inline" : "none" }>
          ＊数値を入力してください
      </span>
      {expenses.length==index+1&&
        <button className="xform-button" disabled={isNan||!categorie||!expense}>
          保存
        </button>
      }
    </>
  )
}

export default ShowInput