'use client'
import React,{useState} from 'react';
import ColumnTask from '@/components/ColumnTask';
import { ArrowLeftIcon, PlusCircleIcon, AdjustmentsVerticalIcon} from '@heroicons/react/24/solid'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ProjectPage: React.FC = () => {
  const [columns, setColumns] = useState<any>({
    column1: [
      { id: "uno", title: 'Card 1' },
      { id: "dos", title: 'Card 2' },
    ],
    column2: [
      { id: "tres", title: 'Card 3' },
      { id: "cuatro", title: 'Card 4' },
    ],
  });

  const handleDrop = (columnId: string, item: { id: string }) => {
    const cardId = item.id;
    const sourceColumnId = Object.keys(columns).find((key) =>
      columns[key].some((card) => card.id === cardId)
    );

    if (!sourceColumnId || sourceColumnId === columnId) return;

    const sourceCards = columns[sourceColumnId].filter((card) => card.id !== cardId);
    const targetCards = [...columns[columnId], columns[sourceColumnId].find((card) => card.id === cardId)];

    setColumns({
      ...columns,
      [sourceColumnId]: sourceCards,
      [columnId]: targetCards,
    });
  };

  const moveCard = (dragIndex: number, hoverIndex: number, columnId: string) => {
    const column = columns[columnId];
    const dragCard = column[dragIndex];

    if (dragIndex !== hoverIndex) {
      const newCards = [...column];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      setColumns({
        ...columns,
        [columnId]: newCards,
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='p-7 flex '>
        <button>
          <ArrowLeftIcon className='size-6 text-slate-950 mr-5'/>
        </button>
        <h2 className='text-xl'>My projects</h2>
     </div>

    <div className='p-7 mt-5'>
      <h2 className='font-bold text-3xl'>My project</h2>
      <div className='w-full p-4 bg-slate-50 border-gray-4 rounded-xl border mt-4 flex justify-between items-center'>
        <input placeholder='Search...' className='rounded border border-gray-4 p-2 w-1/3'/>
        <button className='border-0 w-22 flex items-center'>
          <AdjustmentsVerticalIcon className='size-6 text-slate-700' />
          Filters
        </button>
      </div>

    </div>

    <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-10 mt-10 p-7'>

     {
      Object.keys(columns).map( col => <ColumnTask title={col} items={columns[col]} onDrop={(item) => handleDrop(col, item )} moveCard={moveCard} />)
     }

      <div className='w-full  h-svh flex'>
        <button className='bg-slate-400 border border-slate-3 text-white rounded-lg w-full h-1/4 mt-4 flex flex-col justify-center items-center shadow hover:shadow-lg'>
          <PlusCircleIcon className='size-16' />
          Add New Stage
        </button>
      </div>

    </div>

    </DndProvider>
  );
};

export default ProjectPage;