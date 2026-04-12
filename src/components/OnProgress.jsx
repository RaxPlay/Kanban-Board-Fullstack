import { useDroppable } from "@dnd-kit/react"

export const OnProgress = ({id, children}) => {
  const {ref, isDropTarget} = useDroppable({id});
  
  return (
    <div ref={ref} className={isDropTarget ? "droppable active" : "droppable"}>
      <h2 className="text-2xl text-center mb-2 underline">On Process</h2>
      {children}
    </div>
  )
}
