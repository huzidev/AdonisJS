const columnsKeys = [
  "sno",
  "id",
  "uploadedBy",
  "title",
  "content",
  "category",
  "createdAt",
  "updatedAt",
  "actions",
];

export const constKeys = ["sno", "actions"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));
