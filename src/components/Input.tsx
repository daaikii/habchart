import React,{useState} from 'react'

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

  valid:boolean
  
  setvalid:React.Dispatch<React.SetStateAction<boolean>>
}

const Input:React.FC<PROPS> = ({index,expenses,setEx}) => {
  const [categorie,setCategorie]=useState("")
  const [expense,setExpense]=useState("")
  const [isNan,setIsNan] =useState<boolean>(false)

  const categorieChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie(e.target.value);
    console.log(e.target.name)
    const newArray=expenses.slice()
    newArray.splice(index,1,{categorie:e.target.value,expense:expense})
    console.log(expenses)
    setEx(newArray)
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

  return (
    <>
      <div className="">
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
        <button disabled={isNan||!categorie||!expense}>
          保存
        </button>
      }
    </>
  )
}

export default Input
