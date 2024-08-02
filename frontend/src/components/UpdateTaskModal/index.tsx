import React, { useState, useEffect } from 'react';
import Modal from '../commons/Modal';

interface Task {
  id: string;
  title: string;
  description?: string;
  endDate?: string;
  priority?: string;
  startDate?: string;
  tags?: string[];
}

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (task:Task) => void;
  task: Task;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ isOpen, onClose, onSave, onDelete, task }) => {
  console.log(task)  
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description || '');
  const [priority, setPriority] = useState<string>(task.priority || 'LOW');
  const [startDate, setStartDate] = useState<string>(task.startDate || '');
  const [endDate, setEndDate] = useState<string>(task.endDate || '');
  const [tags, setTags] = useState<string[]>(task.tags || []);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority || 'LOW');
    setStartDate(task.startDate || '');
    setEndDate(task.endDate || '');
    setTags(task.tags || []);
  }, [task]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ ...task, title, description, priority, startDate, endDate, tags });
    onClose();
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  return (
    <>
      {isOpen && (
        <Modal title="Update Task" onClose={onClose}>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="title">
                Title*
              </label>
              <input
                id="title"
                type="text"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="startDate">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="endDate">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                type="text"
                className="shadow appearance-none border text-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={tags.join(', ')}
                onChange={handleTagsChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="btn bg-blue-500"
                onClick={() => onDelete(task)}
              >
                Delete
              </button>
              <div className="space-x-4">
                <button
                  onClick={onClose}
                  type="button"
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateTaskModal;
