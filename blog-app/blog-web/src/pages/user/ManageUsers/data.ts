import startCase from 'lodash/startCase';

// these columnKeys will be shown at top when Admin clicked on manage users
const columnsKeys = [
  'id',
  'Username',
  'Role',
  'isActive',
  'isBanned',
  'isVerified',
  'createdAt',
  'updatedAt',
  'Actions'
];

// boolKeys means they'll either be true(yes) or false(no)
export const boolKeys = ['isActive', 'isBanned', 'isVerified'];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  // startCase will make first letter Capital of any word
  title: startCase(key)
}));
