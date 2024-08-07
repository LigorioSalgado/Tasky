import React, {useState, useEffect} from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useDrop } from 'react-dnd';
import { TaskType } from '@/types';
import TaskCard from '../TaskCard';

const ItemType = 'CARD';

interface ColumnTaskProps {
    columnId: string
    items: TaskType[],
    title: string;
    onDrop: (item?: { id?: string }) => void;
    onUpdate: (title:string) => void;
    onAddTask: (columnId: string) => void;
    onDelete: () => void;
    onEditTask: (task:TaskType) => void;
    reorder: () => void;
}

const ColumnTask: React.FC<ColumnTaskProps> = ({ columnId, title:initTitle, items:initItems = [], onDrop,onUpdate ,onAddTask, onDelete, onEditTask, reorder }) => {
  const [items, setItems] = useState(initItems)
  const  [title, setTitle] = useState(initTitle)
  const [isTitleSet, setIsTitle] = useState(false)
    const [ {  isOverCurrent } , drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
          console.log(item)
           onDrop(item);
        },
        collect: (monitor) => ({
            isOverCurrent: monitor.isOver(),
        }),
       
      });
      
   const onUpdateColumn = () => {
    onUpdate(title)
    setIsTitle(false)
   }

  useEffect(() => {
    if(initItems){
      setItems(initItems)
    }
  }, [initItems])

  return (
    <div ref={drop as unknown as React.LegacyRef<HTMLDivElement>} className={`bg-white w-64  p-4 ${isOverCurrent && 'shadow-2xl bg-rose-200'} rounded-lg border-2 border-slate-300 flex-shrink-0 min-w-[300px] `}>
      <div className='w-full flex justify-between'>
       {isTitleSet ? ( <input
        className='border-b-2 border-slate-700 w-full focus:outline-0 placeholder:text-slate-700 bg-transparent font-bold'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={onUpdateColumn}
        autoFocus
      /> ): ( <>
        <h5 onDoubleClick={() => setIsTitle(true)} className='font-bold w-1/2'>{title}</h5>
        <button onClick={onDelete}>
          <TrashIcon className='size-5 text-slate-700' />
        </button>
      </>)}
   
      </div>

        {
            items.map( (task, index) => (<TaskCard key={task.id} columnId={columnId} title={task.title} id={task.id} index={index} onEdit={() => onEditTask(task) } moveCard={reorder} />))
        }
      
        


      <button onClick={()=> onAddTask(columnId)} className='btn-add w-full h-20 mt-4 flex flex-col justify-center items-center'>
        <PlusCircleIcon className='size-10 text-rose-500' />
        Add New Task
      </button>
    </div>
  );
};

export default ColumnTask;
