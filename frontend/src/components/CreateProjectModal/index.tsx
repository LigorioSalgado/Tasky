import React, { useState } from 'react';
import Modal from '../commons/Modal';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] =useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(title, description);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Modal title="Create Project" onClose={onClose}>

           <form onSubmit={handleSave}>
           <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title*
            </label>
            <input
              id="title"
              type="text"
              className="shadow appearance-none border  text-gray-600  rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="description">
              Description*
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              maxLength={250}
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">{description.length}/250</p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type='button'
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
               type='submit'   
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
          </form> 
        
        </Modal>
      )}
    </>
  );
};

export default CreateProjectModal;
