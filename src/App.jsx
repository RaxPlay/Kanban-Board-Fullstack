import { useReducer } from "react";
import { useForm } from "./helpers/useForm";
import './styles/App.css'

const reducer = (state, action = {}) => {
  switch(action.type){
    case 'ADD-TASK': 
      return [...state, action.payload];
    case 'DELETE-TASK': 
      return (
        state.filter(task => task.id !== action.payload)
      )
  }
}

export const App = () => {
  const {task, formState, onInputChange} = useForm({task: ''})
  const [newState, dispatch] = useReducer(reducer, []);

  const addTask = (event) => { 
    event.preventDefault();
    
    const newTask = {
      taskName: `${formState.task}`,
      id: new Date().getTime(),
    }

    const action = {
      type: "ADD-TASK",
      payload: newTask
    } 

    dispatch(action)

    console.log(newTask)
  }

  const deleteTask = ({id}) => {
    const action = {
      type: 'DELETE-TASK',
      payload: id
    }

    dispatch(action)
  }

  return (
    <>
      <header className="bg-[#294C60] border border-[#467c9b] w-screen p-7 rounded-b-xl">
        <h1 className="text-center text-3xl underline">Main Dashboard</h1>
      </header>
    
      <div id="task-list" className="flex justify-center my-10">
        <form onSubmit={addTask} className="bg-[#294C60] border border-[#467c9b] rounded-md px-4 py-3 pb-5 w-84">
          <div className="text-center">
            <label htmlFor="adding-tasks" className="text-xl underline">Add task</label>  
          </div>
          
          <div className="mt-2">
            <input type="text" value={task} onChange={onInputChange} name="task" placeholder="Wash dishes" required  className="border rounded-md py-1 px-2 text-xl"/>

            <button className="border rounded-md px-2 py-1 ml-2 text-xl">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-4">
        <div className="bg-[#294C60] justify-center border border-[#467c9b] rounded-md w-[32%] p-3 ml-2">
          <h2 className="text-2xl text-center mb-2 underline">To-Do</h2>
          
          <ul className="w-[90%]">
            {newState.map(task => {
              return(
                <li key={task.id} className="text-2xl flex gap-2 my-2">
                  <p>{task.taskName}</p>

                  <button onClick={() => deleteTask(task)} className="text-xl">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              )
            })}  
          </ul>
        </div>

        <div className="bg-[#294C60] flex justify-center border border-[#467c9b] rounded-md w-[32%] p-3 mx-3">
          <h2 className="text-2xl text-center mb-2 underline">On Process</h2>
        </div>


        <div className="bg-[#294C60] flex justify-center border border-[#467c9b] rounded-md w-[32%] p-3">
          <h2 className="text-2xl text-center mb-2 underline">Done</h2>
        </div>
      </div>
    </>
  )
}

/*
  BG - #001B2E
  DIV BG - #294C60 
  DIV BORDER - #467c9b
  TEXT - #FFEFD3
*/