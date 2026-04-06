import { useReducer } from "react";
import { useForm } from "./helpers/useForm";

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
      <h1>Main panel</h1>
  
      <div id="task-list">
        <form onSubmit={addTask}>
          <label htmlFor="adding-tasks">Add task</label>  
          <input type="text" value={task} onChange={onInputChange} name="task" placeholder="Wash dishes" required  className="border"/>

          <button className="text-black">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </form>
      </div>

      <div>
          <ul>
          {newState.map(task => {
            return(
              <li key={task.id}>
                {task.taskName}

                <button onClick={() => deleteTask(task)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            )
          })}  
          </ul>
        </div>
    </>
  )
}
