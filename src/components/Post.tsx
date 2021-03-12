import React,{useState} from "react";
import {useHistory} from 'react-router-dom'
import {db,auth} from '../firebase'
import firebase from 'firebase/app'
import styles from './Post.module.css'

const categories=["住居費","水道光熱費","通信費","保険料","食費","日用品費","被服費","美容費","趣味費","交通費","教育費","医療費","雑費"]

const CheckboxList:React.FC=()=>{
  const [categorie,setCategorie]=useState("")
  const [expense,setExpense]=useState("")
  const [submit,setSubmit]=useState(false)
  const [isNan,setIsNan]=useState(false)
  const history=useHistory();
  
  const handleClick=async ()=>{
    await auth.signOut()
  }
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCategorie(e.target.value)
  }
  
  const handleValueChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!isNaN(Number(e.target.value))){
      setExpense(e.target.value)
      setIsNan(false)
    }else{
      setIsNan(true)
    }
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    db.collection("posts").add({
      categorie:categorie,
      expense:expense,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
    history.push("/")
    setCategorie("")
    setExpense("")
    setSubmit(true)
  }
  
  return (
    <>
      <div className="container">
      <div className="logout-button" onClick={handleClick}>logout</div>
        <h4>入力フォーム</h4>
        <div className="chart-form">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={categorie}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                type="text"
                id="expense"
                name="expense"
                value={expense}
                onChange={handleValueChange}
              />
                円
            </label>
            <button 
              type="submit"
              disabled={submit||!categorie||!expense}
            >
              保存
            </button>
          </form>
          <span style={{display:isNan?"inline":"none"}}>＊数値を入力してください</span>
        </div>
      </div>
    </>
  );
};

export default CheckboxList;
