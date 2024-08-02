import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskCard from '../'; // Asegúrate de que la ruta es correcta

// Mock de la librería react-dnd
jest.mock('react-dnd', () => ({
  useDrag: jest.fn(),
}));

// Accede al mock de useDrag
import { useDrag } from 'react-dnd';

describe('TaskCard Component', () => {
  const mockUseDrag = useDrag as jest.Mock;

  beforeEach(() => {
    mockUseDrag.mockReturnValue([{ isDragging: false }, jest.fn()]);
  });

  it('renders the task card with title', () => {
    render(<TaskCard id="1" title="Test Task" index={0} onEdit={jest.fn()} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('applies dragging styles when isDragging is true', () => {
    mockUseDrag.mockReturnValueOnce([{ isDragging: true }, jest.fn()]);
    render(<TaskCard id="1" title="Test Task" index={0} onEdit={jest.fn()} />);
    const cardElement = screen.getByText('Test Task').parentElement;
    expect(cardElement).toHaveClass('opacity-50');
  });

  it('calls onEdit on double click', () => {
    const onEditMock = jest.fn();
    render(<TaskCard id="1" title="Test Task" index={0} onEdit={onEditMock} />);
    const cardElement = screen.getByText('Test Task').parentElement;
    fireEvent.doubleClick(cardElement);
    expect(onEditMock).toHaveBeenCalled();
  });
});
