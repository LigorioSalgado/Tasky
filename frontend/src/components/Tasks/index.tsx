'use client'
import React, {useState, useEffect} from 'react';
import { ColumnType } from'@/types'
import { useProject } from '@/hooks/useProject';
import CreateColumnModal from '../CreateColumn';
import ColumnTask from '@/components/ColumnTask';
import { PlusCircleIcon, AdjustmentsVerticalIcon} from '@heroicons/react/24/solid'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTaskModal from '../CreateTask';

interface TaskProps {
  initColumns: ColumnType[] | undefined,
  projectId: string
}

const Tasks: React.FC<TaskProps> = ({ initColumns, projectId }) => {
    const [columns, setColumns] = useState<any>(initColumns);
    const [currentColumn, setCurrentColumn] = useState('')
    const [showColumnModal, setColumnModal] = useState(false);
    const [showTaskModal, setTaskModal] = useState(false);

    const {data, handleCreateColumn, handleCreateTask } = useProject({id:projectId})

    useEffect(() => {
      if(data?.project.columns){
        setColumns(data.project.columns)
      }
    }, [data])


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

      const addTask = (projectId) => {
        setTaskModal(true)
        setCurrentColumn(projectId)
      }
    
    
  return (
    <DndProvider backend={HTML5Backend}>
    <div className='w-full p-4 bg-slate-50 border-gray-4 rounded-xl border mt-4 flex justify-between items-center'>
          <input placeholder='Search...' className='rounded border border-gray-4 p-2 w-1/3' />
          <button className='border-0 w-22 flex items-center'>
            <AdjustmentsVerticalIcon className='size-6 text-slate-700' />
            Filters
          </button>
     </div>
      <div className="overflow-x-scroll h-screen flex gap-8 mt-10">
        {columns.map((col) => (
          <ColumnTask
            key={col.id}
            columnId={col.id}
            title={col.name}
            items={col.tasks}
            onDrop={(item) => handleDrop(col, item)}
            onAddTask={addTask}
          />
        ))}

        <div className="w-64 flex-shrink-0 min-w-[300px] h-svh flex">
          <button
            onClick={() => setColumnModal(true)}
            className="bg-slate-400 border border-slate-300 text-white rounded-lg w-full h-1/4 mt-4 flex flex-col justify-center items-center shadow hover:shadow-lg"
          >
            <PlusCircleIcon className="size-16" />
            Add New Stage
          </button>
        </div>
      </div>
   
   <CreateColumnModal 
      isOpen={showColumnModal}

      onClose={() => setColumnModal(false)}
      onSave={(title) => handleCreateColumn(title,columns.length,projectId)}
    />
    <CreateTaskModal 
      isOpen={showTaskModal}
      onClose={() => setTaskModal(false)}
      onSave={(task) => handleCreateTask({columnId:currentColumn, ...task})}
    />
   </DndProvider>
  );
};

export default Tasks;
