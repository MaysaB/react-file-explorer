
import { useState } from 'react';
import FileList from './components/FileList';
import Breadcrumb from './components/Breadcrumb';
import { FileData, Folder, isFile } from './types';

// json data file 
const initialData: FileData[] = [
  { type: 'pdf', name: 'Employee Handbook', added: '2017-01-06', size: 1234 },
  { type: 'pdf', name: 'Public Holiday policy', added: '2016-12-06', size: 5678 },
  {
    type: 'folder',
    name: 'Expenses',
    files: [
      { type: 'doc', name: 'Expenses claim form', added: '2017-05-02', size: 2345 },
      { type: 'doc', name: 'Fuel allowances', added: '2017-05-03', size: 3456 },
    ],
  },
  { type: 'csv', name: 'Cost centres', added: '2016-08-12', size: 7890 },
  {
    type: 'folder',
    name: 'Misc',
    files: [
      { type: 'doc', name: 'Christmas party', added: '2017-12-01', size: 4567 },
      { type: 'mov', name: 'Welcome to the company!', added: '2015-04-24', size: 12345 },
    ],
  },
];

function App() {
  const [currentFolder, setCurrentFolder] = useState<FileData[] | null>(initialData);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Home']);
  const [filteredFiles, setFilteredFiles] = useState<FileData[] | null>(initialData);
  const [sortOption, setSortOption] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState<string>('');

  // Handle folder click to navigate into it
  const handleFolderClick = (folder: Folder) => {
    setCurrentFolder(folder.files);
    setBreadcrumb([...breadcrumb, folder.name]);
    setFilteredFiles(folder.files);
  };

  // Handle breadcrumb navigation to go back
  const handleBack = () => {
    if (breadcrumb.length > 1) {
      const newBreadcrumb = breadcrumb.slice(0, -1);
      setBreadcrumb(newBreadcrumb);
      // For simplicity, reset to initialData
      setCurrentFolder(initialData);
      setFilteredFiles(initialData);
    }
  };

  // Handle sorting of files by size name and type
  const handleSortChange = (option: string, order: 'asc' | 'desc') => {
    setSortOption(option);
    setSortOrder(order);
    if (filteredFiles) {
      const sortedFiles = [...filteredFiles].sort((a, b) => {
        if (isFile(a) && isFile(b)) {
          if (option === 'name' || option === 'type') {
            return order === 'asc'
              ? a[option].localeCompare(b[option])
              : b[option].localeCompare(a[option]);
          } else if (option === 'size') {
            return order === 'asc' ? a.size - b.size : b.size - a.size;
          }
        } else if (!isFile(a) && isFile(b)) {
          return order === 'asc' ? -1 : 1;
        } else if (isFile(a) && !isFile(b)) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
      setFilteredFiles(sortedFiles);
    }
  };

  // Filter files names based on the search text
  const filterFiles = (files: FileData[], query: string): FileData[] => {
    if (!query.trim()) return files;

    const lowerCaseQuery = query.toLowerCase();
    return files.flatMap(file => {
      if (isFile(file) && file.name.toLowerCase().includes(lowerCaseQuery)) {
        return [file];
      }
      if (!isFile(file) && file.name.toLowerCase().includes(lowerCaseQuery)) {
        return [file, ...filterFiles(file.files, query)];
      }
      if (!isFile(file)) {
        const nestedResults = filterFiles(file.files, query);
        if (nestedResults.length > 0) {
          return [{ ...file, files: nestedResults }];
        }
      }
      return [];
    });
  };

  // Handle change in the search filter input
  const handleFilterChange = (filterText: string) => {
    setFilterText(filterText);
    if (currentFolder) {
      setFilteredFiles(filterFiles(currentFolder, filterText));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-4">File Explorer</h1>
        <Breadcrumb breadcrumb={breadcrumb} onBack={handleBack} />
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={filterText}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-blue-300 rounded p-2 w-full"
          />
        </div>
        <FileList
          files={filteredFiles}
          onFolderClick={handleFolderClick}
          sortOption={sortOption}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}

export default App;
