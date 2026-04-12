import { useReducer, useRef, useState, useEffect, createContext } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useForm } from "./helpers/useForm";
import { Draggable } from "./components/Draggable";
import { OnProgress } from "./components/OnProgress";
import { Done } from "./components/Done";
import './styles/App.css'

const reducer = (state, action = {}) => {
  switch(action.type){
    case 'ADD-TASK': 
      return [...state, action.payload];
    case 'DELETE-TASK': 
      return (
        state.filter(task => task.id !== action.payload)
      )
    case 'MOVE-TASK':                    // ← new action
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, zone: action.payload.zone }
          : task
      );
    default:
      return state;
  }
}

const initFunction = () => {
	const items = [];
	for (let i = 0; i < localStorage.length; i++) {  
		const key = localStorage.key(i);
		const value = localStorage.getItem(key); 
		
		items.push(JSON.parse(value));
	}  
		  
	return items; 
}

export const TaskContext = createContext();

export const App = () => {
  const {task, formState, onInputChange} = useForm({task: ''})
  const [newState, dispatch] = useReducer(reducer, [], initFunction);

  const addTask = (event) => { 
    event.preventDefault();
    
    const newTask = {
      taskName: `${formState.task}`,
      id: new Date().getTime(),
      zone: null
    }

    const action = {
      type: "ADD-TASK",
      payload: newTask
    } 

    dispatch(action)

    localStorage.setItem(newTask.id, JSON.stringify(newTask));
  }

  const deleteTask = ({id}) => {
    const action = {
      type: 'DELETE-TASK',
      payload: id
    }

    dispatch(action)

    localStorage.removeItem(id)
  }

  return (
    <TaskContext.Provider value={{newState, dispatch, deleteTask}}>
      <header className="bg-[#294C60] border border-[#467c9b] w-screen p-7 rounded-b-xl">
        <h1 className="text-center text-3xl underline">Main Dashboard</h1>
      </header>
    
      <div id="add-tasks" className="flex justify-center my-10" >
        <form onSubmit={addTask} className="bg-[#294C60] border border-[#467c9b] rounded-md px-4 py-3 pb-5 w-84">
          <div className="text-center">
            <label htmlFor="adding-tasks" className="text-2xl underline">Add task</label>  
          </div>
          
          <div className="mt-2">
            <input type="text" value={task} onChange={onInputChange} name="task" placeholder="Walk dog" required  className="border rounded-md py-1 px-2 text-xl"/>

            <button className="border rounded-md px-2 py-1 ml-2 text-xl">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>
      </div>

      <DragDropProvider onDragEnd={(event) => {
        if (event.canceled) return;
        const taskId = event.operation.source?.id;
        const zone = event.operation.target?.id ?? null;
        dispatch({ type: "MOVE-TASK", payload: { id: taskId,zone }})
      }}>
        <div className="flex justify-center gap-5 mt-4">
          <div className="bg-[#294C60] justify-center border border-[#467c9b] rounded-md w-[32%] p-3 ml-2">
            <h2 className="text-2xl text-center mb-2 underline">To-Do</h2>
              
            <ul className="w-[90%]">
              {newState.filter((task)=> task.zone === null)
              .map((task) => <Draggable key={task.id} id={task.id}/>)}
            </ul>
          </div>

          <div className="bg-[#294C60] border border-[#467c9b] rounded-md w-[32%] p-3">
            <OnProgress id="progress" className="w-[40%]">
              {newState
                .filter((task) => task.zone === 'progress')
                .map((task) => <Draggable key={task.id} id={task.id} />)}
            </OnProgress>
          </div>

          <div className="bg-[#294C60] flex justify-center border border-[#467c9b] rounded-md w-[32%] p-3">
            <Done id='done'>
              {newState
                .filter((task) => task.zone === 'done')
                .map((task) => <Draggable key={task.id} id={task.id} />)}
            </Done>
          </div>
        </div>
      </DragDropProvider>
    </TaskContext.Provider>
  )
}

/*
  BG - #001B2E
  TASK BG - #0f4368
  DIV BG - #294C60 
  DIV BORDER - #467c9b
  TEXT - #FFEFD3
*/