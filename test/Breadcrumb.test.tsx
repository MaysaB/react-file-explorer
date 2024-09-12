import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import Breadcrumb from '../src/components/Breadcrumb'; 

describe('Breadcrumb', () => {
  const mockOnBack = jest.fn();

  test('renders breadcrumbs correctly', () => {
    const breadcrumb = ['Home', 'Expenses', 'Misc'];

    render(<Breadcrumb breadcrumb={breadcrumb} onBack={mockOnBack} />);

    // breadcrumb item rendered correctly
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText(/Expenses/)).toBeInTheDocument();
    expect(screen.getByText(/Misc/)).toBeInTheDocument();
    
    // breadcrumbs are separated by slashes
    expect(screen.getAllByText(/\//).length).toBe(2);
  });

  test('renders "Back" button when breadcrumb length is greater than 1', () => {
    const breadcrumb = ['Home', 'Expenses', 'Misc'];
    
    render(<Breadcrumb breadcrumb={breadcrumb} onBack={mockOnBack} />);

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });

  test('does not render "Back" button when breadcrumb length is 1', () => {
    const breadcrumb = ['Home'];

    render(<Breadcrumb breadcrumb={breadcrumb} onBack={mockOnBack} />);

    //no "Back" button when there's only one breadcrumb
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  test('calls "onBack" function when "Back" button is clicked', () => {
    const breadcrumb = ['Home', 'Expenses', 'Misc'];

    render(<Breadcrumb breadcrumb={breadcrumb} onBack={mockOnBack} />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    // onBack function called when the "Back" button clicked
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});