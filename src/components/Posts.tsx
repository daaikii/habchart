import React,{useEffect, useState} from 'react'
import Input from "./Input"
import {useHistory} from "react-router-dom"
import {db} from "../firebase"

const Posts:React.FC = () => {
  const history=useHistory()
  const [addresses, setAddresses] = React.useState(["address.0"]);
  const [update,setUpdate]=useState<boolean>(false)
  const [valid,setValid]=useState<boolean>(true)
  const [expenses,setExpenses]=useState([{
      categorie:"",
      expense:""
  }])

  const addAddress=() =>{
    const newAddresses = [...addresses];
    newAddresses.push(`address.${(addresses.length)}`);
    setAddresses(newAddresses);
    const cpex=[...expenses]
    cpex.push({categorie:"",expense:""})
    setExpenses(cpex)
  };
  
  const removeAddress= () =>{
    addresses.pop();
    expenses.pop();
    setUpdate(update?false:true)
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const newdate = new Date();
    const timestamp =
      newdate.getFullYear() +
      "/" +
      (newdate.getMonth() + 1) +
      "/" +
      newdate.getDate();
      let sum=0
      let cat=""
      expenses.map((doc)=>{
        sum=sum+Number(doc.expense)
        if(cat==""){
          cat=doc.categorie
        }else{
          cat=cat+"/"+doc.categorie
        }
      })
    db.collection("posts").add({
      expenses,
      expense:sum,
      categorie:cat,
      timestamp:timestamp
    });
    setExpenses([{
      categorie:"",
      expense:""
    }])
    history.push("/")
  }

  return (
    <div className="container">
      <div className="xform">
        <form onSubmit={handleSubmit} >
          <h4>入力フォーム</h4>
          <div>
            <label>カテゴリー</label>
            <label>金額</label>
          </div>
          {addresses.map((address, index) => {
            return(
              <div key={index}>
                <Input index={index}　expenses={expenses} setEx={setExpenses} valid={valid} setvalid={setValid} />
              </div>
            )
          })}
        </form>
        <a onClick={addAddress}>+</a>
        <a onClick={removeAddress}>-</a>
      </div>
    </div>
  )
}


export default Posts
