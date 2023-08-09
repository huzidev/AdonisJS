import { SortPayload } from "pages/user/ManageUsers/types";

export const columnsKeys = [
  'most recent',
  'oldest',
  'most popular'
];


// boolKeys means they'll either be true(yes) or false(no)
export const altKeys = ['most recent', 'oldest'];
export const typeResult = ["recent", "oldest", "popular"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));

export const initialSortState: SortPayload = {
  value: '',
  type: ''
}
