import React from 'react';

interface CardTaskProps {
  title: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskCard: React.FC<CardTaskProps> = ({ title, onChange }) => {
  return (
    <div className='w-full h-1/6 max-h-36 bg-white rounded border border-gray-300 border-l-8 border-l-blue-500 shadow my-4 p-6'>
      <input
        type='text'
        value={title}
        onChange={onChange}
        className='w-full bg-transparent focus:outline-none font-bold text-lg'
      />
    </div>
  );
};

export default TaskCard;
