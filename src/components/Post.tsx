import React,{useState,useEffect} from "react";
import {db} from '../firebase'
import firebase from 'firebase/app'
import {useHistory} from 'react-router-dom'
import styles from './Post.module.css'

const categories=["住居費","水道光熱費","通信費","保険料","食費","日用品費","被服費","美容費","趣味費","交通費","教育費","医療費","雑費"]

const CheckboxList:React.FC=()=>{
  const [expenses,setExpenses]=useState<any>({
    "住居費":0,
    "水道光熱費":0,
    "通信費":0,
    "保険料":0,
    "食費":0,
    "日用品費":0,
    "被服費":0,
    "美容費":0,
    "趣味費":0,
    "交通費":0,
    "教育費":0,
    "医療費":0,
    "雑費":0
  })
  const [submit,setSubmit]=useState(false)
  const [isNan,setIsNan]=useState(false)
  const history=useHistory();
  
  const handleClick=()=>{
    
  }
  
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!isNaN(Number(e.target.value))){
      setExpenses({...expenses,[e.target.name]:e.target.value})
      setSubmit(false)
      setIsNan(false)
    }else{
      setSubmit(true)
      setIsNan(true)
    }
    console.log(expenses)
  }
  
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    db.collection("posts").add({
      expenses,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
    history.push("/")
    setExpenses({})
    setSubmit(true)
  }
  return (
    <>
      <div className="container">
        <div onClick={handleClick}>logout</div>
        <div className="chart-form">
          <form onSubmit={handleSubmit}>
            {categories.map((key,index)=>{return(
              <label key={index}>
                <div className="inputLabel">{`${key}:`}</div>
                <input
                  type="text"
                  name={key}
                  id={`${index}`}
                  value={expenses.key}
                  onChange={handleChange}
                  />
                円
              </label>
            )})}
              <button 
                disabled={submit}
                type="submit">
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
