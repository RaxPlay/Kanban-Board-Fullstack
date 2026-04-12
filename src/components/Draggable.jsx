import React, { useContext } from 'react'
import {TaskContext} from "../App.jsx"
import { useDraggable } from '@dnd-kit/react';

export const Draggable = ({id}) => {
  const { newState, deleteTask} = useContext(TaskContext)

  const {ref} = useDraggable({id});

  const task = newState.find((t) => t.id === id);
  if(!task) return null

  return (
    <div ref={ref}>
        <div className="w-[109%] border border-[#306482] rounded-md px-2 m-2 bg-[#0f4368]" >
          <div className="task text-2xl flex gap-2 my-2">
            <p className="w-[90%]">{task.taskName}</p>

            <button onClick={() => deleteTask(task)} className="text-xl">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
    </div>              
  );
}
