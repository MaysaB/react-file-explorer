import { useState, ChangeEvent } from 'react';

type SortFilterProps = {
  onSortChange: (option: string) => void;
  onFilterChange: (filterText: string) => void;
};

// Define the SortFilter component as a standard function
function SortFilter({ onSortChange, onFilterChange }: SortFilterProps) {
  const [filterText, setFilterText] = useState<string>('');

  const handleFilterTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setFilterText(newText);
    onFilterChange(newText);
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <label className="mr-2">Sort by:</label>
        <select onChange={(e) => onSortChange(e.target.value)} defaultValue="name">
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="type">Type</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="mr-2">Filter by name:</label>
        <input
          type="text"
          value={filterText}
          onChange={handleFilterTextChange}
          placeholder="Enter filename"
        />
      </div>
    </div>
  );
}

export default SortFilter;