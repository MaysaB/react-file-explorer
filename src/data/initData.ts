import { FileData } from "types";

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

export default initialData;