import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'CARD';

interface CardTaskProps {
  id: string,
  title: string;
  index: number;
  columnId: string;
  onEdit: () => void
  moveCard: () => void
}

const TaskCard: React.FC<CardTaskProps> = ({ id,title, columnId ,index, onEdit, moveCard }) => {
  const ref = React.useRef(null);
  const [{ isDragging }, drag ] = useDrag({
    type: ItemType,
    item: { id, index, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item , monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex, sourceColumn, targetColumn);
      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });
  drag(drop(ref));

  return (
    <div 
      onDoubleClick={onEdit}
      ref={ref} 
      key={id} 
      className={`w-full h-1/6 max-h-36 bg-white rounded border border-gray-300 border-l-8 border-l-rose-500 shadow my-4 p-6 ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
         
      <h4 className='font-bold'>{title}</h4>
    </div>
  );
};

export default TaskCard;
