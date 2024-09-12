import { File, FileData } from '../types';

// guard to determine if a FileData is a file
export function isFile(data: FileData): data is File {
    return data.type !== 'folder';
  }