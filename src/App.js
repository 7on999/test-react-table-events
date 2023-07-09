import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './reset.css';
import style from './style.module.css'

import { Table } from './components/table/table.component';
import Form from './components/form/form.component'

import { baseStatusIdDict, regExpDate } from './config'

function App() {

  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      value: 'Новая задача 1'
    },
    {
      id:  uuidv4(),
      value: 'Покормить кота'
    }
  ])

  const [dates, setDates] = useState([
    {
      id:  uuidv4(),
      value: '2023-09-09'
    },
    {
      id: uuidv4(),
      value: '2023-10-10'
    }
  ])

  const [statuses, setStatuses] = useState([
    {
      id: baseStatusIdDict.success,
      value: 'Успешно'
    },
    {
      id: baseStatusIdDict.pending,
      value: 'В ожидании'
    },
    {
      id: baseStatusIdDict.notSelected,
      value: 'Не выбрано'
    }
  ])

  const [events, setEvents] = useState(()=>{

    const eventsArr = []

    tasks.forEach(task=>{
      dates.forEach(date=>{
        eventsArr.push({
          taskId: task.id,
          dateId: date.id,
          id:  uuidv4(),
          statusId: baseStatusIdDict.notSelected
        })
      })
    })

    return eventsArr
  })

  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [isStatusesOpen, setIsStatusesOpen] = useState(false)

  const [taskValue, setTaskValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [statusValue, setStatusValue] = useState('')

  const onSelectChange = (newStatusId, {taskId, dateId})=>{
    setEvents(events.map(event=>{
      return event.taskId===taskId && event.dateId===dateId ? {
        ...event,
        statusId: newStatusId
      } : event
    }))
  }

  const onInputTaskChange = (event)=>{
    setTaskValue(event.target.value)
  }

  const onInputDateChange = (event)=>{
    setDateValue(event.target.value)
  }

  const onInputStatusChange = (event)=>{
    setStatusValue(event.target.value)
  }

  const addTask = ()=>{
    if (!taskValue) {
      alert('поле для ввода задачи не может быть пустым')
      return
    }

    const newTaskId = uuidv4()

    setTasks([...tasks, {id: newTaskId, value: taskValue}])

    const newEvents = dates.map(date=>({
      taskId: newTaskId,
      dateId:date.id,
      id:uuidv4(),
      statusId: baseStatusIdDict.notSelected
      })
    )

    setEvents([...events, ...newEvents])
    setTaskValue('')
  }

  const addDate = ()=>{
    if (!dateValue) {
      alert('поле для ввода даты не может быть пустым')
      return
    }

    if (!dateValue.match(regExpDate)) {
      alert('Invalid date format, use HHHH-MM-DD format');
      return
    }

    const newDateId = uuidv4()
    setDates([...dates, { id:newDateId, value: dateValue}])
    setDateValue('')

    const newEvents = tasks.map(task=>({
      taskId: task.id,
      dateId: newDateId,
      id: uuidv4(),
      statusId: baseStatusIdDict.notSelected
    })
)
    setEvents([...events, ...newEvents])
  }

  const addStatus = ()=>{
    if (!statusValue) {
      alert('поле для ввода статуса не может быть пустым')
      return
    }
    setStatuses([...statuses, {id: uuidv4(), value: statusValue}])
    setStatusValue('')
  }

  const toggleShowTasksList = ()=>{
    setIsTasksOpen(prev=>!prev)
  }

  const toggleShowDatesList = ()=>{
    setIsDateOpen(prev=>!prev)
  }

  const toggleShowStatusList = ()=>{
    setIsStatusesOpen(prev=>!prev)
  }

  const deleteTask = (id)=>{
    setTasks(tasks.filter(task=>task.id!==id))
    setEvents(events.filter(events=>events.taskId!==id))
  }

  const deleteDate = (id)=>{
    setDates(dates.filter(date=>date.id!==id))
    setEvents(events.filter(events=>events.dateId!==id))
  }

  const deleteStatus = (id)=>{
    if (baseStatusIdDict.notSelected===id){
      alert('Данный статус не может быть удален')
      return
    }

    setStatuses(statuses.filter(status=>status.id!==id))
    setEvents(events.map(event=>{
      return event.statusId===id ? {
        ...event,
        statusId: baseStatusIdDict.notSelected
      } : event
    }))
  }

  const onChangeTaskName = (taskId, value)=>{
    setTasks(tasks.map(task=>{
      return task.id===taskId  ? {
        ...task,
        value,
      } : task
    }))
  }
  

  const onChangeDate = (datekId, value)=>{

    if (!value.match(regExpDate)) {
      alert('Invalid date format, use HHHH-MM-DD format');
      return
    }

    setDates(dates.map(date=>{
      return date.id===datekId  ? {
        ...date,
        value,
      } : date
    }))
  }

  const formsData = [
    {
      title: 'Поле для добавления задач',
      onAddingClickBtn: addTask,
      placeholder: 'Введите новую задачу',
      inputValue: taskValue,
      onInputChange: onInputTaskChange,
      onToggleCliickBtn: toggleShowTasksList,
      isShowListItems: isTasksOpen,
      items: tasks,
      onDeleteClickBtn:deleteTask,
      btnForAddingText: 'Добавить задачу' ,
      btnForShowItemsText: 'список задач',
    },
    {
      title: 'Поле для добавления дат',
      onAddingClickBtn: addDate,
      placeholder: 'Введите новую дату в формате HHHH-MM-DD',
      inputValue: dateValue,
      onInputChange: onInputDateChange,
      onToggleCliickBtn: toggleShowDatesList,
      isShowListItems: isDateOpen,
      items: dates,
      onDeleteClickBtn:deleteDate,
      btnForAddingText: 'Добавить дату',
      btnForShowItemsText: 'список дат',
    },
    {
      title: 'Поле для добавления статусов',
      onAddingClickBtn: addStatus,
      placeholder: 'Введите новый статус',
      inputValue: statusValue,
      onInputChange: onInputStatusChange,
      onToggleCliickBtn: toggleShowStatusList,
      isShowListItems: isStatusesOpen,
      items: statuses,
      onDeleteClickBtn:deleteStatus,
      btnForAddingText: 'Добавить статус',
      btnForShowItemsText: 'список статусов',
    }
  ]
  
  return (
    <main className={style.mainWrapper}>  
      <div className={style.formsWrapper}>
        {formsData.map(formData=>(<Form {...formData} key={formData.title}/>))}
      </div>


      <h3 className={style.tableTitle}>Таблица событий:</h3>
        
      { dates.length >0 && tasks.length>0 ? 

      <> 
        <p className={style.label}> Для редактирования задачи или даты произведите по ним дабл клик </p>
        <Table {...{dates, statuses, tasks, events, onChangeDate, onChangeTaskName, onSelectChange}}/>
      </> 
        : 
      
      <p> Для отображения таблицы событий должны быть хотя бы одна задача и одна дата</p>
      }   

      <button onClick={()=>console.log('events:', events)} className={`${style.btn} ${style.btnConsole}`}> Нажми сюда чтобы увидеть события в консоле </button>
    </main>
  
  );
}

export default App;
