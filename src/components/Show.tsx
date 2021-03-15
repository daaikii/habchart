import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {auth,db} from '../firebase'
import {DocContext} from '../context/docIdContext'

type SETDOC={
  doc:string
}

const Show:React.FC = () => {
  const [categorie,setCategorie]=useState("")
  const [expense,setExpense]=useState("")
  const [submit,setSubmit]=useState(false)
  const [isNan,setIsNan]=useState(false)
  const doc=useContext(DocContext)
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
    db.collection("posts").doc(`${doc}`).update({
      categorie:categorie,
      expense:expense,
    });
    history.push("/")
    setCategorie("")
    setExpense("")
    setSubmit(true)
  }
  const handleDelete=()=>{
    db.collection("posts").doc(`${doc}`).delete()
  }
  useEffect(()=>{
    const unSub=async()=>{
    const dataRef=db.collection('posts').doc(`${doc}`)
    const dataDoc=await dataRef.get()
    if(dataDoc.exists){
      console.log(dataDoc.data())
    }
  }
  return ()=>{unSub()}
  },[])
  
  return (
    <>
      <div className="container">
      <div className="logout-button" onClick={handleClick}>logout</div>
        <div className="chart-form">
        <h4>入力フォーム</h4>
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
              変更
            </button>
          </form>
          <span style={{display:isNan?"inline":"none"}}>＊数値を入力してください</span>
        </div>
        <div className="delete-button" onClick={handleDelete}>削除</div>
      </div>
    </>
  )
}

export default Show
