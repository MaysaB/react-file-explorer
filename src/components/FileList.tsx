
import { FileData, Folder, isFile } from '../types';

type FileListProps = {
  files: FileData[] | null;
  onFolderClick: (folder: Folder) => void;
  sortOption: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (option: string, order: 'asc' | 'desc') => void;
};

// FileList component for displaying and sorting files and folders
function FileList({ files, onFolderClick, sortOption, sortOrder, onSortChange }: FileListProps) {
  // Handle sort column click
  const handleSort = (column: string) => {
    const newSortOrder = sortOption === column && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(column, newSortOrder);
  };

  if (!files) return <div>No files available</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden bg-white">
        <thead>
          <tr className="bg-blue-100 text-blue-700">
            <th 
              className="border-b border-transparent p-2 text-left cursor-pointer" 
              onClick={() => handleSort('name')}
            >
              Name {sortOption === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th 
              className="border-b border-transparent p-2 text-left cursor-pointer w-32" 
              onClick={() => handleSort('type')}
            >
              Type {sortOption === 'type' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th 
              className="border-b border-transparent p-2 text-left cursor-pointer w-32" 
              onClick={() => handleSort('size')}
            >
              Size {sortOption === 'size' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.name} className="hover:bg-blue-50 even:bg-blue-100 odd:bg-blue-50" style={{ height: '48px' }}>
              <td className="border-b border-transparent p-2 flex items-center">
                {isFile(file) ? (
                  <i className="fas fa-file mr-2 text-blue-600"></i>
                ) : (
                  <i className="fas fa-folder mr-2 text-blue-600"></i>
                )}
                <span className={`flex-1 ${isFile(file) ? 'text-gray-900' : 'text-blue-800'}`}>
                  {isFile(file) ? file.name : (
                    <button
                      onClick={() => onFolderClick(file as Folder)}
                      className="text-blue-500 hover:underline"
                    >
                      {file.name}
                    </button>
                  )}
                </span>
              </td>
              <td className="border-b border-transparent p-2 text-blue-600 w-32">
                {isFile(file) ? file.type.toUpperCase() : '-'}
              </td>
              <td className="border-b border-transparent p-2 text-blue-600 w-32">
                {isFile(file) ? `${file.size} KB` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;
