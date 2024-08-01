import React, {useState} from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useDrop } from 'react-dnd';

import TaskCard from '../TaskCard';

const ItemType = 'CARD';

interface ColumnTaskProps {
    items: {title:string, id: string}[],
    title: string;
    onDrop: (item: { id: string }) => void;
    moveCard: (dragIndex: number, hoverIndex: number, columnId: string) => void;


}

const ColumnTask: React.FC<ColumnTaskProps> = ({ title, items = [], onDrop, moveCard }) => {
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
    <div ref={drop as unknown as React.LegacyRef<HTMLDivElement>} className={`'w-full h-svh' ${isOverCurrent && 'shadow-md'}`}>
      <input
        className='border-b-2 border-slate-700 w-full focus:outline-0 placeholder:text-slate-700 bg-transparent font-bold'
        value={title}
      />

        {
            items.map( ({title, id}, index) => (<TaskCard title={title} id={id} index={index} />))
        }
      
        


      <button className='btn-add w-full h-20 mt-4 flex flex-col justify-center items-center'>
        <PlusCircleIcon className='size-10 text-rose-500' />
        Add New Task
      </button>
    </div>
  );
};

export default ColumnTask;
