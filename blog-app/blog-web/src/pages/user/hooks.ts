import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alternateKeys, booleanKeys, typeResult } from "./ManageUsers/data";
import { SortPayload } from "./ManageUsers/types";

export function useUserFiltersState() {
    const params = useParams();
    
    const [sortValue, setSortValue] = useState<SortPayload>({
        value: "",
        type: "",
    });

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
    let type: any = "";

    // if sortValue is between id, username, createdAt, updatedAt then we can user asc, desc order
    let altKeys = alternateKeys.find((value) => value === column);
    // if sortValue is between isVerified, isBanned, isActive then boolKeys
    let boolKeys = booleanKeys.find((value) => value === column);
    if (altKeys) {
      // if type is asc then change it to desc if desc then change to "" empty string (which is default form)
      !sortValue.type
        ? type = "asc"
        : sortValue.type === "asc"
        ? type = "desc"
        : type = ""
    } else if (boolKeys) {
      // if type is asc then change it to desc if desc then change to asc
      !sortValue.type
        ? type = "true"
        : sortValue.type === "true"
        ? type = "false"
        : type = ""
    } else {
      !sortValue.type
        ? type = "admin"
        : sortValue.type === "admin"
        ? type = "super-admin"
        : sortValue.type === "super-admin"
        ? type = "user"
        : sortValue.type === "user"
        ? type = "blogger" 
        : type = "" 
    }

    const result = typeResult.find((value) => value === type);

    // If the type is "asc", add the sort parameter to the URL
    if (type === result) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("sort", JSON.stringify({ [column]: type }));
      const newUrl = `${ROUTE_PATHS.USERS_PAGE}${
        params.page
      }?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      // If the type is neither "asc" nor "desc", remove the entire "sort" parameter from the URL
      const newUrl = `${ROUTE_PATHS.USERS_PAGE}${params.page}`;
      window.history.replaceState({}, "", newUrl);
    }

    setSortValue({ value: column, type });
  };

    return {
        handleSort
    }
}