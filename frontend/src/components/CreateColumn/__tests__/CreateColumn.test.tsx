import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateColumnModal from '@/components/CreateColumn'; 
describe('CreateColumnModal Component', () => {
  const onCloseMock = jest.fn();
  const onSaveMock = jest.fn();

  const renderComponent = (isOpen: boolean) => {
    return render(
      <CreateColumnModal 
        isOpen={isOpen} 
        onClose={onCloseMock} 
        onSave={onSaveMock} 
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when isOpen is true', () => {
    renderComponent(true);
    expect(screen.getByText('Add Stage')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    renderComponent(false);
    expect(screen.queryByText('Add Stage')).not.toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    renderComponent(true);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onSave with the correct title and onClose when the save button is clicked', () => {
    renderComponent(true);
    const titleInput = screen.getByLabelText('Title*');
    fireEvent.change(titleInput, { target: { value: 'New Column' } });
    fireEvent.click(screen.getByText('Save'));

    expect(onSaveMock).toHaveBeenCalledWith('New Column');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not call onSave if the title is empty', () => {
    renderComponent(true);
    fireEvent.click(screen.getByText('Save'));
    expect(onSaveMock).not.toHaveBeenCalled();
  });
});
