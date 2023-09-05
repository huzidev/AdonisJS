import { SortPayload } from "pages/user/ManageUsers/types";
import { categories } from "store/articles/types";

export const columnsKeys = [
  'most recent',
  'oldest',
  'most popular'
];

// boolKeys means they'll either be true(yes) or false(no)
export const altKeys = ['most recent', 'oldest'];
export const typeResult = ["recent", "oldest", "popular"].concat(categories);

// columnKeys is the created array and categories is the array including all the categories
export const columns = columnsKeys.concat(categories).map((key) => ({
  key,
  dataIndex: key,
  title: key
}));

export const initialSortState: SortPayload = {
  value: '',
  type: ''
}
