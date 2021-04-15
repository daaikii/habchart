import React,{useState} from "react";
import {useHistory} from 'react-router-dom'
import {db,auth} from '../firebase'
import firebase from 'firebase/app'
import styles from './Post.module.css'

const CheckboxList:React.FC=()=>{
  const [categorie,setCategorie]=useState("")
  const [expense,setExpense]=useState("")
  const [submit,setSubmit]=useState(false)
  const [isNan,setIsNan]=useState(false)
  const history=useHistory();
  
  const handleLogout=async ()=>{
    await auth.signOut()
  }
  
  const handleChangeIndex=()=>{
    history.push('/')
  }
  
  const categorieChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCategorie(e.target.value)
  }
  
  const valueChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!isNaN(Number(e.target.value))){
      setExpense(e.target.value)
      setIsNan(false)
    }else{
      setIsNan(true)
    }
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const newdate=new Date()
    const date=newdate.getFullYear()+"/"+(newdate.getMonth()+1)+"/"+newdate.getDate()
    db.collection("posts").add({
      categorie:categorie,
      expense:expense,
      timestamp:date,
    });
    history.push("/")
    setCategorie("")
    setExpense("")
    setSubmit(true)
  }
  
  return (
    <>
      <div className="container">
      <a className="index-button" onClick={handleChangeIndex}>index</a>
      <a className="logout-button" onClick={handleLogout}>logout</a>
      <h4>入力フォーム</h4>
        <div className="chart-form">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                id="categorie"
                name="categorie"
                value={categorie}
                onChange={categorieChange}
              />
            </label>
            <label>
              <input
                type="text"
                id="expense"
                name="expense"
                value={expense}
                onChange={valueChange}
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
