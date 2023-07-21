
// these columnKeys will be shown at top when Admin clicked on manage users
const columnsKeys = [
  'sno',
  'id',
  'username',
  'email',
  'role',
  'isActive',
  'isBanned',
  'isVerified',
  'createdAt',
  'updatedAt',
  'actions'
];

// boolKeys means they'll either be true(yes) or false(no)
export const booleanKeys = ['isActive', 'isBanned', 'isVerified'];
export const alternateKeys = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
export const typeResult = ["asc", "desc", "true", "false", "admin", "super-admin", "user", "blogger"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));
