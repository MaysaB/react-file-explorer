import { render, screen, fireEvent } from '@testing-library/react';
import SortFilter from '../src/components/SortFilter';

describe('SortFilter Component', () => {
  it('calls onSortChange when a sort option is selected', () => {
    const mockOnSortChange = jest.fn();
    const mockOnFilterChange = jest.fn();
    render(<SortFilter onSortChange={mockOnSortChange} onFilterChange={mockOnFilterChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'size' } });
    expect(mockOnSortChange).toHaveBeenCalledWith('size');
  });

  it('calls onFilterChange when filter text is changed', () => {
    const mockOnSortChange = jest.fn();
    const mockOnFilterChange = jest.fn();
    render(<SortFilter onSortChange={mockOnSortChange} onFilterChange={mockOnFilterChange} />);

    fireEvent.change(screen.getByPlaceholderText('Enter filename'), { target: { value: 'test' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('test');
  });
});
