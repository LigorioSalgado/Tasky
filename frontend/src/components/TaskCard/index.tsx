import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'CARD';

interface CardTaskProps {
  id: string,
  title: string;
  index: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskCard: React.FC<CardTaskProps> = ({ id,title, index,onChange }) => {
  const [{ isDragging }, drag ] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div 
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>} 
      key={id} 
      className={`w-full h-1/6 max-h-36 bg-white rounded border border-gray-300 border-l-8 border-l-blue-500 shadow my-4 p-6 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
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
