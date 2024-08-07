'use client';
import React, { useState, useEffect } from 'react';
import { ColumnType, TaskType } from '@/types';
import { useProject } from '@/hooks/useProject';
import { useRouter } from 'next/navigation'
import Modal from '../commons/Modal';
import CreateColumnModal from '../CreateColumn';
import ColumnTask from '@/components/ColumnTask';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTaskModal from '../CreateTask';
import UpdateTaskModal from '../UpdateTaskModal';

interface TaskProps {
  initColumns: ColumnType[] | undefined;
  projectId: string;
}

const Tasks: React.FC<TaskProps> = ({ initColumns, projectId }) => {

  const router = useRouter()
  const [columns, setColumns] = useState<ColumnType[]>(initColumns || []);
  const [filteredColumns, setFilteredColumns] = useState<ColumnType[]>(columns);
  const [currentColumn, setCurrentColumn] = useState<ColumnType>({} as ColumnType);
  const [currentTask, setCurrentTask] = useState<TaskType>({} as TaskType);
  const [showColumnModal, setColumnModal] = useState(false);
  const [showDeleteColumnModal, setDeleteColumnModal] = useState(false);
  const [showTaskModal, setTaskModal] = useState(false);
  const [showEditTaskModal, setshowEditTaskModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const {
    data,
    handleCreateColumn,
    handleCreateTask,
    handleUpdateColumn,
    handleDeleteColumn,
    handleMoveTask,
    handleUpdateTask,
    handleDeleteTask
  } = useProject({ id: projectId });

  useEffect(() => {
    if (data?.project.columns) {
      setColumns(data.project.columns);
    }
  }, [data]);

  useEffect(() => {
    filterTasks();
  }, [searchTerm, filterPriority, columns]);

  const filterTasks = () => {
    const filtered = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority = filterPriority ? task.priority === filterPriority : true;
        return matchesSearch && matchesPriority;
      }),
    }));
    setFilteredColumns(filtered);
  };

  const moveCard = (dragIndex: number, hoverIndex: number, sourceColumn: string, targetColumn: string) => {
    console.log("🚀 ~ moveCard ~ dragIndex: number, hoverIndex: number, sourceColumn: string, targetColumn: strin:", dragIndex, hoverIndex, sourceColumn, targetColumn)
    console.log(sourceColumn===targetColumn)
    if (sourceColumn === targetColumn) {
      const col = columns.find(c => c.id === sourceColumn)
      console.log("🚀 ~ moveCard ~ col:", col)
      const updatedItems = [...col.tasks];
      console.log("🚀 ~ moveCard ~ updatedItems:", updatedItems)
      const [movedItem] = updatedItems.splice(dragIndex, 1);
      console.log("🚀 ~ moveCard ~ movedItem:", movedItem)
      updatedItems.splice(hoverIndex, 0, movedItem);
      console.log("🚀 ~ moveCard ~ updatedItems:", updatedItems)

      const newColumns = columns.map( c => {
        if(c.id === sourceColumn){
          return {
            ...c,
            tasks: updatedItems
          }
        }
        return c
      })
      setColumns(newColumns);
      //(columnId, updatedItems);
    } else {
      const fromCol = columns.find(c => c.id === sourceColumn)
      const toCol = columns.find(c => c.id === targetColumn)
      const sourceItems = [...fromCol.tasks];
      const targetItems = [...toCol.tasks];
      const [movedItem] = sourceItems.splice(dragIndex, 1);
      targetItems.splice(hoverIndex, 0, movedItem);
      const newColumns = columns.map( c => {
        if(c.id === sourceColumn){
          return {
            ...c,
            tasks: sourceItems
          }
        }
        if(c.id === targetColumn){
          return {
            ...c,
            tasks: targetItems
          }
        }
        return c
      })
      setColumns(newColumns)
      handleMoveTask({ taskId: movedItem.id, sourceColumnId: sourceColumn, targetColumnId: targetColumn })
    }

  };

  const handleDrop = (columnId: string, item: TaskType) => {
    moveCard(0,0,item.columnId,columnId)
   
    //;
    //console.log(newColumns)
  };

  const reorder = (columnId: string, items: TaskType[]) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column) return;

    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: items,
        };
      }
      return col;
    });
    console.log("New Columns: ",  newColumns)
    setColumns(newColumns);
  };

  
  const addTask = (column: ColumnType) => {
    setTaskModal(true);
    setCurrentColumn(column);
  };

  const deleteColumn = (column: ColumnType) => {
    setCurrentColumn(column);
    setDeleteColumnModal(true);
  };

  const closeDeleteColumnModal = () => setDeleteColumnModal(false);

  const onEditTask = (task: TaskType) => {
    setCurrentTask(task);
    setshowEditTaskModal(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full p-4 bg-slate-50 border-gray-4 rounded-xl border mt-4 flex justify-between items-center">
        <input
          id="search"
          placeholder="Search..."
          className="rounded border border-gray-4 p-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="rounded border border-gray-4 p-2 ml-4"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>
      <div className="overflow-x-scroll h-screen flex gap-8 mt-10">
        {filteredColumns.map((col) => (
          <ColumnTask
            key={col.id}
            columnId={col.id}
            title={col.name}
            items={col.tasks}
            onDrop={(item) => handleDrop(col.id, item)}
            onAddTask={() => addTask(col)}
            onUpdate={(title) => handleUpdateColumn(col.id, projectId, title)}
            onDelete={() => deleteColumn(col)}
            onEditTask={onEditTask}
            reorder={moveCard}
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
        onSave={(title) => handleCreateColumn(title, columns.length, projectId)}
      />
      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setTaskModal(false)}
        onSave={(task) => handleCreateTask({ columnId: currentColumn.id, ...task })}
      />
      <UpdateTaskModal
        onClose={() => setshowEditTaskModal(false)}
        isOpen={showEditTaskModal}
        task={currentTask}
        onSave={(task) => {
          setshowEditTaskModal(false);
          handleUpdateTask(task);
        }}
        onDelete={(task) => {
          setshowEditTaskModal(false);
          handleDeleteTask(task.id, task.columnId);
        }}
      />
      {showDeleteColumnModal && (
        <Modal title="Delete Stage" onClose={closeDeleteColumnModal}>
          <div className="w-full flex flex-col">
            <h4>
              Are you sure you want to delete <span className="font-bold">{currentColumn.name}</span> stage?
            </h4>
            <div className="w-full flex justify-end mt-4">
              <button className="btn btn-secondary" onClick={closeDeleteColumnModal}>
                Cancel
              </button>
              <button
                className="ml-4 btn btn-primary"
                onClick={() => {
                  handleDeleteColumn(currentColumn.id, projectId);
                  closeDeleteColumnModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DndProvider>
  );
};

export default Tasks;
