const columnsKeys = [
  'recent blog',
  'old blog'
];

// boolKeys means they'll either be true(yes) or false(no)
export const typeResult = ["asc", "desc"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));
