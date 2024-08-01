import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import TaskCard from '../TaskCard';

const ColumnTask: React.FC = () => {
  return (
    <div className='w-full h-svh'>
      <input
        className='border-b-2 border-slate-700 w-full focus:outline-0 placeholder:text-slate-700 bg-transparent font-bold'
        placeholder='New Stage'
      />
      
        <TaskCard title={"test card 1"}  />

        <TaskCard title={"test card 2"}  />


        <TaskCard title={"test card 3"}  />


      <button className='btn-add w-full h-20 mt-4 flex flex-col justify-center items-center'>
        <PlusCircleIcon className='size-10 text-rose-500' />
        Add New Task
      </button>
    </div>
  );
};

export default ColumnTask;
