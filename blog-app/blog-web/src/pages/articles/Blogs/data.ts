import { SortPayload } from "pages/user/ManageUsers/types";

export const columnsKeys = [
  'most recent',
  'oldest',
  'most popular'
];

// boolKeys means they'll either be true(yes) or false(no)
export const altKeys = ["createdAt"]
export const typeResult = ["recent", "oldest"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));

export const initialSortState: SortPayload = {
  value: "",
  type: ""
}
