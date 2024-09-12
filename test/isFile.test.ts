import { isFile } from '../src/utils/isFile'
import { FileData } from '../src/types';


describe('isFile', () => {
    test('returns true and narrows type for a file', () => {
      // mock data representing file
      const fileData: FileData = {
        type: 'pdf',
        name: 'report.pdf',
        added: '2020-10-15',
        size: 1024 
      };
  
      // type-check narrow to File when isFile returns true
      if (isFile(fileData)) {
        expect(isFile(fileData)).toBe(true);
        // fileData is treated as File within this block
        expect(fileData.size).not.toBeUndefined();
      } else {
        fail('Expected fileData to be identified as File');
      }
    });
  
    test('returns false for a folder', () => {
      // mock data representing folder
      const folderData: FileData = {
        type: 'folder',
        name: 'documents',
        files: []  // 'files' array indicates folder
      };
      expect(isFile(folderData)).toBe(false);
    });
  });