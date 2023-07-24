const columnsKeys = [
  "sno",
  "id",
  "username",
  "email",
  "role",
  "isActive",
  "isBanned",
  "isVerified",
  "createdAt",
  "updatedAt",
  "actions",
];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key,
}));
