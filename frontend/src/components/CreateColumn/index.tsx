import React, { useState } from 'react';
import Modal from '../commons/Modal';

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

const CreateColumnModal: React.FC<CreateColumnModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] =useState<string>('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave(title,);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <Modal title="Add Stage" onClose={onClose}>

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

export default CreateColumnModal;
