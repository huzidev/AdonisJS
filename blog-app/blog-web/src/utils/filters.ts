import ROUTE_PATHS from "Router/paths";
import { alternateKeys, booleanKeys, notAltResult, notBooleanResult, notRoleResult, typeResult } from "pages/user/ManageUsers/data";
import { SortPayload } from "pages/user/ManageUsers/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useFiltersHook() {
  const params = useParams();
  const [isUserPage, setIsUserPage] = useState<boolean>();
  const [path, setPath] = useState<string>('');
  const [sortValue, setSortValue] = useState<SortPayload>({
    value: '',
    type: ''
  });

  const locationURL = window.location.pathname;
  useEffect(() => {
    if (locationURL.includes("/user")) {
      setIsUserPage(true)
      setPath(ROUTE_PATHS.USERS_PAGE);
    } else {
      setIsUserPage(false)
      setPath(ROUTE_PATHS.ARTICLES_PAGE);
    }
    console.log("WHAT IS STATE", isUserPage);
  }, [isUserPage, path])

  useEffect(() => {
    // Get the sort parameter from the URL when the component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      // If the sort parameter is present, update the sortValue state accordingly
      const sortValueObj = JSON.parse(sortParam);
      const key: any = Object.keys(sortValueObj)[0];
      const value: any = Object.values(sortValueObj)[0];
      setSortValue({ value: key, type: value });
    }
  }, []);

  const handleSort = (column: string) => {
    console.log("COLUMN", column);
    
    let type: any = "";

    // if sortValue is between id, username, createdAt, updatedAt then we can user asc, desc order
    let altKeys = alternateKeys.find((value) => value === column);
    
    // if sortValue is between isVerified, isBanned, isActive then boolKeys
    let boolKeys = booleanKeys.find((value) => value === column);
    if (altKeys) {
      // if type is asc then change it to desc if desc then change to "" empty string (which is default form)
      // !sortValue.type means when their is no type means no filters been used hence add the asc order first
      // sortValue.value !== altKeys now suppose user clicked on uesrname hence asc order will be adds first since asc order is added in the type firstly hence if user 
      // tries to called email then because the asc order is already in sortValue.type hence for email it'll called desc order which is not OK because first
      // it should called the asc order first therefore we've created the condition sortValue.value !== altKeys means if value changes as of value in sortValue.value
      // then called the asc order first
      notAltResult.includes(sortValue.type) || !sortValue.type || sortValue.value !== altKeys
        ? (type = "asc")
        : sortValue.type === "asc"
        ? (type = "desc")
        : (type = "");
    } else if (boolKeys) {
      // if type is asc then change it to desc if desc then change to asc
      // it is ncessary to do because suppose if user clicked on username to be filtered now sortValue.type have property related to asc OR desc now when user clicked on
      // booleanKeys so due to already present value of asc OR desc the filter first became empty then it'll run so therefore we've created this property so even if
      // their is some value present or no value present then called the true order first
      notBooleanResult.includes(sortValue.type) || !sortValue.type || sortValue.value !== boolKeys
        ? (type = "true")
        : sortValue.type === "true"
        ? (type = "false")
        : (type = "");
    } else {
      // no need to called sortValue.value because role property have no related other field which have same type as of roles
      notRoleResult.includes(sortValue.type) || !sortValue.type
        ? (type = "admin")
        : sortValue.type === "admin"
        ? (type = "super-admin")
        : sortValue.type === "super-admin"
        ? (type = "user")
        : sortValue.type === "user"
        ? (type = "blogger")
        : (type = "");
    }

    const result = typeResult.find((value) => value === type);

    // If the type is "asc", add the sort parameter to the URL
    if (type === result) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("sort", JSON.stringify({ [column]: type }));
      const newUrl = `${path}${
        params.page
      }?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      // If the type is neither "asc" nor "desc" or "true", "false", "admin" etc, remove the entire "sort" parameter from the URL
      const newUrl = `${path}${params.page}`;
      window.history.replaceState({}, "", newUrl);
    }

    setSortValue({ value: column, type });
  };

  return {
    handleSort,
  };
}
