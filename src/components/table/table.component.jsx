import { memo } from 'react'
import style from './table.module.css'

import {EditableTextElement} from '../editable-text-element/editable-text-element.component'

export const Table = ({dates, statuses, tasks, events, onChangeDate, onChangeTaskName, onSelectChange})=>{
  return (
    <table border="1" className={style.table}>
      <thead>
        <tr className={style.tableHeaders}>
          <th className={style.headersCellTasksDates}> Задачи/Даты </th>
          {dates.map(date=>(<th key={date.id} className={style.headersCell}> 
            <EditableTextElement label={date.value} onChange={onChangeDate} id={date.id}/>
          </th>))}

        </tr>
      </thead>

      <tbody>
        {tasks.map(task=>(
        <tr key={task?.id}> 
          <td className={style.cellTask}> 
            <EditableTextElement label={task.value} onChange={onChangeTaskName} id={task?.id}/>
          </td>
        
        {dates.map(date=>(<td key={date.id} className={style.cell}> 
            <select className={style.select}
              value={statuses.find(s=>s.id===events.find(event=>event.taskId===task.id && event.dateId===date.id)?.statusId)?.id} 
              onChange={(e)=>onSelectChange(e.target.value, {taskId:task?.id, dateId: date?.id})}>

              {statuses.map(statusItem => {
                return <option key={statusItem?.id} value={statusItem?.id}>{statusItem.value}</option> 
              })}
            </select>
          </td>))}
      </tr>))}
      
      </tbody>
  </table>
  )
}

export default memo(Table)



