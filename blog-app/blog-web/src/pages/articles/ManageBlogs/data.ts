const columnsKeys = [
  "sno",
  "id",
  "uploaded by",
  "title",
  "content",
  "createdAt",
  "updatedAt",
  "actions",
];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));
