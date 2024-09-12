// possible types of files
export type FileType = 'pdf' | 'doc' | 'csv' | 'mov';

// base interface for file and folder properties
export interface BaseFile {
  type: FileType;
  name: string;
  added: string; 
  size: number; 
}

//interface for a file, which includes properties of BaseFile
export interface File extends BaseFile {}

// interface for a folder, which contains nested files or folders
export interface Folder {
  type: 'folder';
  name: string;
  files: FileData[]; // Nested files and folders
}

// Union represents either a file or a folder
export type FileData = File | Folder;

// guard to determine if a FileData is a file
export function isFile(data: FileData): data is File {
  return data.type !== 'folder';
}
