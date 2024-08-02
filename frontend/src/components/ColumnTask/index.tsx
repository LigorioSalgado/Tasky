import React, {useState} from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useDrop } from 'react-dnd';
import { useProject } from '@/hooks/useProject';

import TaskCard from '../TaskCard';

const ItemType = 'CARD';

interface ColumnTaskProps {
    columnId: string
    items: {title:string, id: string}[],
    title: string;
    onDrop: (item: { id: string }) => void;
    onAddTask: (columnId: string) => void;
}

const ColumnTask: React.FC<ColumnTaskProps> = ({ columnId, title, items = [], onDrop, onAddTask }) => {
  const [isTitleSet, setIsTitle] = useState(false)
    const [ {  isOverCurrent } , drop] = useDrop({
        accept: ItemType,
        drop: (item) => {
          onDrop(item);
        },
        collect: (monitor) => ({
            isOverCurrent: monitor.isOver(),
        }),
       
      });
    
  return (
    <div ref={drop as unknown as React.LegacyRef<HTMLDivElement>} className={`bg-white w-64  p-4 ${isOverCurrent && 'shadow-md'} rounded-lg border-2 border-slate-300 flex-shrink-0 min-w-[300px] `}>
      <div className='w-full flex'>
       {isTitleSet ? ( <input
        className='border-b-2 border-slate-700 w-1/2 focus:outline-0 placeholder:text-slate-700 bg-transparent font-bold'
        defaultValue={title}
        autoFocus
      /> ): ( <h5 className='font-bold'>{title}</h5>)}
   
      </div>

        {
            items.map( ({title, id}, index) => (<TaskCard key={id} title={title} id={id} index={index} />))
        }
      
        


      <button onClick={()=> onAddTask(columnId)} className='btn-add w-full h-20 mt-4 flex flex-col justify-center items-center'>
        <PlusCircleIcon className='size-10 text-rose-500' />
        Add New Task
      </button>
    </div>
  );
};

export default ColumnTask;
