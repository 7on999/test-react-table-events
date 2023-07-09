import { useState } from 'react'
import style from './editable-text-element.module.css'


export const EditableTextElement = ({ label, onChange, id })=> {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(label)

  const setTitle = ()=>{
    const trimmedTitle = value.trim();
    if (trimmedTitle) {
      onChange(id, value);
    }
  }

  const editTrue = ()=>{
    setEdit(true)
  }

  const editFalse = ()=>{
    setEdit(false);
    setTitle()
  }

  const onChangeHandler = (e)=>{
    setValue(e.currentTarget.value)
  }

  return (
    edit ? <input value={value} onBlur={editFalse} autoFocus onChange={onChangeHandler}/>
      :
    <span onDoubleClick={editTrue} className={style.span}> {label} </span>
          
  )
}

