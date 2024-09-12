import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import FileList from '../src/components/FileList';
import { FileData,  } from '../src/types';


describe('FileList', () => {
  const mockFiles: FileData[] = [
    { type: 'pdf', name: 'Cost Centre', added: '2021-01-01', size: 123 },
    { type: 'folder', name: 'Misc', files: [] }
  ];

  const mockOnFolderClick = jest.fn();
  const mockOnSortChange = jest.fn();

  test('renders no files message when files array is empty', () => {
    render(<FileList files={null} onFolderClick={mockOnFolderClick} sortOption='name' sortOrder='asc' onSortChange={mockOnSortChange} />);
    expect(screen.getByText('No files available')).toBeInTheDocument();
  });

  test('renders files and folders correctly', () => {
    render(<FileList files={mockFiles} onFolderClick={mockOnFolderClick} sortOption='name' sortOrder='asc' onSortChange={mockOnSortChange} />);
    expect(screen.getByText('Cost Centre')).toBeInTheDocument();
    expect(screen.getByText('Misc')).toBeInTheDocument();
  });

  test('triggers sort change on column header click', () => {
    render(<FileList files={mockFiles} onFolderClick={mockOnFolderClick} sortOption='name' sortOrder='asc' onSortChange={mockOnSortChange} />);
    fireEvent.click(screen.getByText(/Name/));
    expect(mockOnSortChange).toHaveBeenCalledWith('name', 'desc');
  });

  test('triggers folder click callback when folder is clicked', () => {
    render(<FileList files={mockFiles} onFolderClick={mockOnFolderClick} sortOption='name' sortOrder='asc' onSortChange={mockOnSortChange} />);
    fireEvent.click(screen.getByText('Misc'));
    expect(mockOnFolderClick).toHaveBeenCalledWith(mockFiles[1]);
  });
});