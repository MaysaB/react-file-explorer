import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders the title', () => {
    render(<App />);
    expect(screen.getByText('File Explorer')).toBeInTheDocument();
  });

  test('renders initial file list', () => {
    render(<App />);
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
    expect(screen.getByText('Public Holiday policy')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Cost centres')).toBeInTheDocument();
    expect(screen.getByText('Misc')).toBeInTheDocument();
  });

  test('filters files by name', () => {
    render(<App />);
    const searchBox = screen.getByPlaceholderText('Search by name...');
    fireEvent.change(searchBox, { target: { value: 'Expenses' } });
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.queryByText('Employee Handbook')).toBeNull();
  });

  test('navigates into a folder and displays its contents', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Expenses'));
    expect(screen.getByText('Expenses claim form')).toBeInTheDocument();
    expect(screen.getByText('Fuel allowances')).toBeInTheDocument();
  });
});
