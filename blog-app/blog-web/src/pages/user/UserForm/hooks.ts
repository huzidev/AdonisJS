import ROUTE_PATHS from "Router/paths";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { errorMessage, successNotification } from "utils/notifications";
import { detailsCreateUser, detailsId, detailsMe } from "./data";
import { User, UserDetailsEdit } from "./types";

export function useUserFormHook() {
  const auth = useAuth();
  const user = useUser();
  const params = useParams();
  const [updateDetailsMe, setUpdateDetailsMe] = useState<UserDetailsEdit>(detailsMe);
  const [createUser, setCreateUser] = useState<any>(detailsCreateUser);
  const isMe: boolean = window.location.pathname.includes("/me");
  const value = useRef('');
  const loggedInId: any = auth.state.user?.id;
  const fetchedData: any = user.state.getUser?.data;
  const [updateDetailsId, setUpdateDetailsId] = useState<User>(detailsId);
  const isCreate: boolean = window.location.pathname.includes("create");
  const userRole = user.state.getUser.data?.role;
  const authRole = auth.state.user?.role;
  const state = user.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  const isDark: boolean  = auth.state.isDark ? true : false;
  
  useEffect(() => {
    if (isMe) {
      setUpdateDetailsMe({ ...updateDetailsMe, ...fetchedData });
    } else {
      setUpdateDetailsId({ ...updateDetailsId, ...fetchedData });
      // so value will only be fetched if fetchedData is not undefined
      // using useRef other wise the value is updating on own on the heading as well where Edit ${value.current} Details is written
      if (fetchedData) {
        value.current = fetchedData.username;
      }
    }
  }, [params.id, fetchedData]);

  function inputHandler(e: React.ChangeEvent) {
    // creating different because of select options and for input fields
    const { name, value, type, checked } = e.target as HTMLInputElement;
    isCreate ? (
      setCreateUser({
        ...createUser,
        [name]: type === "checkbox" ? checked : value,
      })
    ) : (
      isMe ? (
        setUpdateDetailsMe({
          ...updateDetailsMe,
          [name]: value,
        })
       ) : (
        setUpdateDetailsId({
          ...updateDetailsId,
          [name]: type === "checkbox" ? checked : value,
        })
       )
    )
  }

  useEffect(() => {
      if (!isCreate) {
        user.getById(isMe ? loggedInId : Number(params.id));
      }
    }, [params.id]);

    function submit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (isMe) {
        user.updateMe({ ...updateDetailsMe })
      } else if (Number(params.id) === user.state.getUser.data?.id) {
        user.updateById({
          ...updateDetailsId,
          id: Number(params.id)
        })
      } 
      else {
        user.createUser({...createUser})
      }
    }

  useEffect(() => {
    if (prev?.createUser.loading) {
      if (!state?.createUser?.loading && !state.createUser.error) {
        successNotification(state.createUser.message);
        if (state.createUser.message?.includes("successfully")) {
          // users page take pagination meta therefore + 1
          navigate(ROUTE_PATHS.USERS_PAGE + 1)
        }
      }
    }
    if (prev?.updateMe.loading) {
      if (!state.updateMe.loading && !state.updateMe.error) {
       successNotification(state.updateMe.message);
       if (state.updateMe.message?.includes("successfully")) {
            navigate(ROUTE_PATHS.VIEW_PROFILE + "me")
        }
     }
    }
    if (prev?.updateById.loading) {
      if (!state.updateById.loading && !state.updateById.error) {
       successNotification(state.updateById.message);
       if (state.updateById.message?.includes("successfully")) {
            navigate(ROUTE_PATHS.USERS_PAGE  + 1)
        }
     }
    }
    // if user tries to change the id in the URL and that id doesn't exist then redirect the user to Not Found page
    if (prev?.getUser.loading) {
      if (authRole === "admin" && userRole === "super-admin") {
        errorMessage("Insufficient Access, You can't edit super-admin's details")
        navigate(ROUTE_PATHS.ARTICLES);
      }
      if (!state.getUser.loading && state.getUser.error) {
        navigate("/");
      }
    }
  }, [state]);

  return {
    isMe,
    value,
    isCreate,
    inputHandler,
    updateDetailsId,
    updateDetailsMe,
    createUser,
    submit,
    setCreateUser,
    setUpdateDetailsId,
    isDark
  }

}