import React, { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline'
import Modal from '../commons/Modal';

interface ProjectCardProps {
  id: string | undefined
  title: string | undefined;
  description: string | undefined;
  onUpdate: (id:string,title: string, description: string) => Promise<void>; 
  onDelete: (id: string) => Promise<void>
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id,title: initialTitle, description: initialDescription, onUpdate, onDelete }) => {
  const [isTitleEdit, setIsTitleEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(initialTitle);
  const [description, setDescription] = useState<string | undefined>(initialDescription);

  const onEditTitle = () => {
    setIsTitleEdit(true);
  };

  const onEditDescription = () => {
    setIsDescriptionEdit(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const saveChanges = () => {
    setIsTitleEdit(false);
    setIsDescriptionEdit(false);
    onUpdate( id as string, title as string, description as string); 
  };

 
  const closeDeleteModal = () => setShowModal(false)

  return (
   <>
    <div key={id} className="bg-white rounded-2xl max-w-sm max-h-56 overflow-hidden shadow hover:shadow-lg hover:cursor-pointer">
      <div className="w-full p-6 bg-pinky">
        {isTitleEdit ? (
          <input
            type="text"
            className="bg-transparent font-bold border-b-2 w-full border-slate-700 focus:outline-none"
            value={title}
            onChange={handleTitleChange}
            onBlur={saveChanges}
            autoFocus
          />
        ) : (
          <>
            <div className='flex justify-between items-center'>
              <h5 onDoubleClick={onEditTitle} className="font-bold text-xl mb-2">
              
              {title}
            </h5>
              <button onClick={() => setShowModal(true)} id="deleteButtox">
                    <XCircleIcon className='size-5 text-slate-950' />
              </button>
            </div>
    
          </>
        )}
      </div>
      <div className="w-full px-6">
        {isDescriptionEdit ? (
          <textarea
            type="text"
            className="bg-transparent w-full border-b-2 border-slate-700 focus:outline-none"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={saveChanges}
            autoFocus
          />
        ) : (
          <p onDoubleClick={onEditDescription} className="text-gray-700 text-base mt-2">
            {description}
          </p>
        )}
      </div>
    </div>

   {showModal && ( <Modal title="Delete Project" onClose={closeDeleteModal} >
      <div className='w-full flex flex-col'>
        <h4>Are you sure you want to delete <span className='font-bold'>{title}</span>  project?</h4>
        <div className='w-full flex justify-end mt-4'>
          <button className='btn btn-secondary' onClick={closeDeleteModal}>Cancel</button>
          <button className='ml-4 btn btn-primary' onClick={() => {
             onDelete(id)
            closeDeleteModal()
          }}>Confitm</button>
        </div>
      </div>

    </Modal> )}
    </>
  );
};

export default ProjectCard;
