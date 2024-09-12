
import { useState } from 'react';
import FileList from './components/FileList';
import Breadcrumb from './components/Breadcrumb';
import { FileData, Folder,  } from './types';
import { isFile } from './utils/isFile';
import  initialData  from './data/initData';


function App() {
  //use state hooks to manage internal state
  const [currentFolder, setCurrentFolder] = useState<FileData[] | null>(initialData);
  //keeps track of files/folders displayed, starts with initial data
  //updates when user navigates into a folder
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Home']);
  //tracks current nav path, updates when users nav into folders/go back
  const [filteredFiles, setFilteredFiles] = useState<FileData[] | null>(initialData);
  //holds file/dolfers after search is applied. same as initial data but updated based on search/sorting
  const [sortOption, setSortOption] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  //used to track how files should be sorted eg by name/size/type or by asc/desc
  const [filterText, setFilterText] = useState<string>('');
  //holds current search text. updated as user types in search box

  // when a folder is clicked, handle folder click function is called
  const handleFolderClick = (folder: Folder) => {
    setCurrentFolder(folder.files);
    //sets current folder to the contents of the folder
    setBreadcrumb([...breadcrumb, folder.name]);
    //updates breadcrumb to show current folder path
    setFilteredFiles(folder.files);
    //filtered file to contents of new folder                                                                                             
  };

  // when user clicks 'Back', handle back function is called
  const handleBack = () => {
    //remove folder from last breadcrumb path
    if (breadcrumb.length > 1) {
      const newBreadcrumb = breadcrumb.slice(0, -1);
      setBreadcrumb(newBreadcrumb);
      //resets displayed current folder and filterd files to the root
      setCurrentFolder(initialData);
      setFilteredFiles(initialData);
    }
  };

  // handle sorting of files by size name and type
  const handleSortChange = (option: string, order: 'asc' | 'desc') => {
    //sets the sorting option and sort order
    setSortOption(option);
    setSortOrder(order);
    //check if there are files to sort
    if (filteredFiles) {
    //create a new sorted array from the current filteredFiles
      const sortedFiles = [...filteredFiles].sort((a, b) => {
        //if both a and b are files, it sorts based on selected option
        if (isFile(a) && isFile(b)) {
          //if sorting by name/type, use localeCompare for string comparison
          if (option === 'name' || option === 'type') {
            return order === 'asc'
              ? a[option].localeCompare(b[option]) //asc order
              : b[option].localeCompare(a[option]); //desc order

              //if sorting by size, perform numberical comparison
          } else if (option === 'size') {
            return order === 'asc' ? a.size - b.size : b.size - a.size;
          }
          //handle case if one is a file and oter is a folder
        } else if (!isFile(a) && isFile(b)) {
          return order === 'asc' ? -1 : 1; //folders before files if ascending, files before if descending
        } else if (isFile(a) && !isFile(b)) {
          return order === 'asc' ? 1 : -1;//files before folders if ascending, folders before if descending
        }
        return 0; //default return when no sorting condition
      });
      //update state with sorted files
      setFilteredFiles(sortedFiles);
    }
  };

  // Filter files names based on the search text filterText
  const filterFiles = (files: FileData[], query: string): FileData[] => {
    //ignore empty query, return all files
    if (!query.trim()) return files;

    //convert query to lowercase for case insensitive comparison
    const lowerCaseQuery = query.toLowerCase();

    //use flatMap to to handle arrays of arrays from recursive calls and flatten them into a single array
    return files.flatMap(file => {
      // check if the file is an actual file and its name includes the search query
      if (isFile(file) && file.name.toLowerCase().includes(lowerCaseQuery)) {
        return [file];
      }
      //if its a folder and its name matches, include the folder and recurse to filter its contents
      if (!isFile(file) && file.name.toLowerCase().includes(lowerCaseQuery)) {
        return [file, ...filterFiles(file.files, query)]; //include matching folder and its contents
      }

      //if it's a folder but doesn't match, only filter its contents.
      if (!isFile(file)) {
        const nestedResults = filterFiles(file.files, query);
        //if nested results are not empty, include this folder with filtered files.
        if (nestedResults.length > 0) {
          return [{ ...file, files: nestedResults }];//create a new folder object with filtered contents.

        }
      }
      return []; //no conditions are met, return an empty array.
    });
  };

  // Handle change in the search filter input
  const handleFilterChange = (filterText: string) => {
    //updates search text and filters current folder files based on search query
    setFilterText(filterText);
    if (currentFolder) {
      setFilteredFiles(filterFiles(currentFolder, filterText));
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-4">File Explorer</h1>
        {/* displays the folder nav history and back button if applicable */}
        <Breadcrumb breadcrumb={breadcrumb} onBack={handleBack} />

        {/* search field to allow users to filter folders/files by name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={filterText}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-blue-300 rounded p-2 w-full"
          />
        </div>


        {/* displays filtered list of files/folders with sorting and nav functionality */}
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
