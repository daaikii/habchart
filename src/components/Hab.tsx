import React,{useState} from "react";
import {db} from '../firebase'
import firebase from 'firebase'

const checklists=["住居費","水道光熱費","通信費","保険料","食費","日用品費","被服費","美容費","趣味費","交通費","教育費","医療費","雑費"]

const CheckboxList:React.FC=()=>{
  const [categories,setCategories]=useState<any>({})
  const [expenses,setExpenses]=useState<any>({})
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCategories({
      ...categories,[e.target.id]:e.target.checked
    })
    console.log(categories)
    console.log(expenses)
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    db.collection("posts").doc().collection("expenses").add({
      expenses,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
    setExpenses({});
  }
  return (
    <>
      <div className="container">
        <div className="hab-list"></div>
        <div className="chart-form">
          <form onSubmit={handleSubmit}>
            {checklists.map((item,index)=>{return(
              <div key={index}>
              <label htmlFor={`${index}`} >
                <input
                  id={`${index}`}
                  name="inputNames"
                  type="checkbox"
                  value={item}
                  checked={categories[item]}
                  onChange={handleChange}/>
                {item}
              </label>
              {categories[index]==true&&
              <label >
                  <input
                    type="text"
                    name="expense"
                    id="expense"
                    value={expenses[index]}
                    onChange={e=>setExpenses({...expenses,[item]:e.target.value})}
                  />
                円
              </label>}
              </div>
            )})}
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckboxList;
