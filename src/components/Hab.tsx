import { CheckBox } from "@material-ui/icons";
import React,{useState} from "react";

const checklists=["住居費","水道光熱費","通信費","保険料","食費","日用品費","被服費","美容費","趣味費","交通費","教育費","医療費","雑費"]

type CHECKBOX={
  id:string
  value:string
  checked:true
  onChange:any
}
const Checkbox=({id,value,checked,onChange}:CHECKBOX)=>{
  return <input
  id={id}
  type="checkbox"
  name="inputNames"
  checked={checked}
  onChange={onChange}
  value={value}
  />
}

const CheckboxList:React.FC=()=>{
  const [categories,setCategories]=useState<any>({})
  const [expense,setExpense]=useState("")
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCategories({
      ...categories,[e.target.id]:e.target.checked
    })
    console.log(categories)
  }
  return (
    <>
      <div className="container">
        <div className="hab-list"></div>
        <div className="chart-form">
          <form>
            {checklists.map((item,index)=>{return(
              <label key={index}>
                <Checkbox
                  id={`${index}`}
                  value={item}
                  checked={categories[item[index]]}
                  onChange={handleChange}
                />
                {item}
              </label>
            )
            })}
            <label>
              <input
                type="text"
                name="expense"
                id="expense"
                value={expense}
                onChange={e=>setExpense(e.target.value)}
                />
              円
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckboxList;
