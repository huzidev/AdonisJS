// these columnKeys will be shown at top when Admin clicked on manage users
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

// boolKeys means they'll either be true(yes) or false(no)
export const booleanKeys = ["isActive", "isBanned", "isVerified"];
export const notRoleResult = ["asc", "desc", "true", "false"];
export const notBooleanResult = [
  "asc",
  "desc",
  "admin",
  "super-admin",
  "user",
  "blogger",
];
export const notAltResult = [
  "true",
  "false",
  "admin",
  "super-admin",
  "user",
  "blogger",
];
export const alternateKeys = [
  "id",
  "title",
  "content",
  "createdAt",
  "email",
  "username"
];
export const dateKeys = [
  "createdAt",
  "updatedAt"
]
export const typeResult = [
  "recent",
  "oldest",
  "asc",
  "desc",
  "true",
  "false",
  "admin",
  "super-admin",
  "user",
  "blogger",
];
export const constKeys = ["sno", "actions"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key,
}));
