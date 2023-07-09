import { memo } from 'react'
import style from './form.module.css'

export const Form = ({title, onAddingClickBtn, placeholder, inputValue, onInputChange, onToggleCliickBtn, isShowListItems, items, onDeleteClickBtn, btnForAddingText, btnForShowItemsText})=>{
  return (
    <div className={style.formWrapper}>
      <div className={style.taskInputBtn}> 
        <h3> {title}</h3>
        <input className={style.input} placeholder={placeholder} value={inputValue} onChange={onInputChange}/>
        <button className={style.btn} onClick={onAddingClickBtn}> {btnForAddingText} </button>
        <button className={`${style.btn} ${style.btnShow}`} onClick={onToggleCliickBtn}> {isShowListItems ? 'Скрыть' : 'Показать'} {btnForShowItemsText} </button>
      </div>
      {
        isShowListItems &&  !!items.length && 
        <ul className={style.list}>
            {items.map(({value, id})=>(<li key={id} className={style.listElem}> 
              <span> {value} </span>  
              <button className={style.btnDelete} onClick={()=>onDeleteClickBtn(id)}> Удалить</button>
            </li>))}
        </ul>
      } 
      </div>
  )
}

export default memo(Form)



