import { SortPayload } from "pages/user/ManageUsers/types";

export const columnsKeys = [
  'most recent',
  'oldest'
];

// boolKeys means they'll either be true(yes) or false(no)
export const altKeys = ["createdAt"]
export const typeResult = ["asc", "desc"];

export const columns = columnsKeys.map((key) => ({
  key,
  dataIndex: key,
  title: key
}));

export const initialSortState: SortPayload = {
  value: "",
  type: ""
}
