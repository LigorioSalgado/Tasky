import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'CARD';

interface CardTaskProps {
  id: string,
  title: string;
  index: number;
  onEdit: () => void
}

const TaskCard: React.FC<CardTaskProps> = ({ id,title, index, onEdit }) => {
  const [{ isDragging }, drag ] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div 
      onDoubleClick={onEdit}
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>} 
      key={id} 
      className={`w-full h-1/6 max-h-36 bg-white rounded border border-gray-300 border-l-8 border-l-rose-500 shadow my-4 p-6 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
         
      <h4 className='font-bold'>{title}</h4>
    </div>
  );
};

export default TaskCard;
