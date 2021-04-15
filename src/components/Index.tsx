import React from "react";
import { useHistory } from "react-router-dom";
import {useSetDoc} from '../context/idContext'
import {auth} from '../firebase'

export type PROPS = {
  chartdata: {
    id:string;
    categorie: string;
    expense: string;
    timestamp: any;
  }[];
};

type DOC={
    id: string;
    categorie: string;
    expense: string;
    timestamp: any;
}

const Index: React.FC<PROPS> = ( {chartdata} ) => {
  const history=useHistory()
  const setId=useSetDoc()
  const handleClick=(doc:DOC)=>{
    setId(doc.id)
    history.push("/show")
  }
  const handleChangePost=()=>{
    history.push('/post')
  }
  const handleLogout=async ()=>{
    await auth.signOut()
  }
  const handleChangeChart=()=>{
    history.push('/chart')
  }

  return (
    <div className="container">
      <div className="link-button">
        <a className="post-button" onClick={handleChangePost}>post</a>
        <a className="logout-button" onClick={handleLogout}>logout</a>
        <a className="chart-button" onClick={handleChangeChart}>chart</a>
      </div>
      <div className="infomation">
        <ul>
          <table>
            <tbody>
              <tr>
                <th>日付</th>
                <th>カテゴリー</th>
                <th>金額</th>
              </tr>
              {chartdata.map((doc,index) => (
                <tr key={index}>
                  <td onClick={()=>handleClick(doc)}>{doc.timestamp}</td>
                  <td>{doc.categorie}</td>
                  <td>{doc.expense}円</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      </div>
    </div>
  );
};

export default Index;
