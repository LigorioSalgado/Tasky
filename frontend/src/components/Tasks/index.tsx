'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'  // Usage: App router
import { ColumnType, TaskType } from '@/types';
import { useProject } from '@/hooks/useProject';
import Modal from '../commons/Modal';
import CreateColumnModal from '../CreateColumn';
import ColumnTask from '@/components/ColumnTask';
import { PlusCircleIcon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';
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

  const handleDrop = (columnId: string, item: { id: string }) => {
    const cardId = item.id;
    const sourceColumn = columns.find((col) => col.tasks.some((task) => task.id === cardId));

    if (!sourceColumn || sourceColumn.id === columnId) return;

    const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumn.id);
    const targetColumnIndex = columns.findIndex((col) => col.id === columnId);

    const card = sourceColumn.tasks.find((task) => task.id === cardId);
    if (!card) return;

    const newSourceTasks = sourceColumn.tasks.filter((task) => task.id !== cardId);
    const newTargetTasks = [...columns[targetColumnIndex].tasks, card];

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: newSourceTasks,
    };
    newColumns[targetColumnIndex] = {
      ...columns[targetColumnIndex],
      tasks: newTargetTasks,
    };

    handleMoveTask({ taskId: item.id, sourceColumnId: sourceColumn.id, targetColumnId: columnId });
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
