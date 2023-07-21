import startCase from 'lodash/startCase';

// these columnKeys will be shown at top when Admin clicked on manage users
const columnsKeys = [
  'id',
  'username',
  'role',
  'isActive',
  'isBanned',
  'isVerified',
  'createdAt',
  'updatedAt',
  'actions'
];

// boolKeys means they'll either be true(yes) or false(no)
export const boolKeys = ['isActive', 'isBanned', 'isVerified'];
export const alternateKeys = ['id', 'username', 'createdAt', 'updatedAt'];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  // startCase will make first letter Capital of any word
  title: startCase(key)
}));
