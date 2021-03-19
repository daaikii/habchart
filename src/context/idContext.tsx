import React,{useState,createContext,useContext} from 'react'

type SETDOCID={
  setDocId:(id:string)=>void
}
const DocOpeContext=createContext<SETDOCID>({
  setDocId:(id:string)=>{console.error("Providerを選択してください")}
})
export const DocContext=createContext("")

const DocIdProvider:React.FC = ({children}) => {

  const [id,setId]=useState("")

  const setDocId=(id:string)=>{
    setId(id)
  }

  
  return (
    <DocOpeContext.Provider value={{setDocId}}>
      <DocContext.Provider value={id}>
        {children}
      </DocContext.Provider>
    </DocOpeContext.Provider>
  )
}

export const useSetDoc=()=>useContext(DocOpeContext).setDocId

export default DocIdProvider
