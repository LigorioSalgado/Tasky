import React from 'react';
import ColumnTask from '@/components/ColumnTask';
import { ArrowLeftIcon, PlusCircleIcon, AdjustmentsVerticalIcon} from '@heroicons/react/24/solid'

const ProjectPage: React.FC = () => {
  return (
    <>
      <div className='p-7 flex '>
        <button>
          <ArrowLeftIcon className='size-6 text-slate-950 mr-5'/>
        </button>
        <h2 className='text-xl'>My projects</h2>
     </div>

    <div className='mt-5'>
      <h2 className='font-bold text-3xl'>My project</h2>
      <div className='w-full p-4 bg-slate-50 border-gray-4 rounded-xl border mt-4 flex justify-between items-center'>
        <input placeholder='Search...' className='rounded border border-gray-4 p-2 w-1/3'/>
        <button className='border-0 w-22 flex items-center'>
          <AdjustmentsVerticalIcon className='size-6 text-slate-700' />
          Filters
        </button>
      </div>

    </div>

    <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-10 mt-10'>
      <ColumnTask />

      <ColumnTask />


      <div className='w-full  h-svh flex'>
        <button className='bg-slate-400 border border-slate-3 text-white rounded-lg w-full h-1/4 mt-4 flex flex-col justify-center items-center shadow hover:shadow-lg'>
          <PlusCircleIcon className='size-16' />
          Add New Stage
        </button>
      </div>

    </div>

    </>
  );
};

export default ProjectPage;