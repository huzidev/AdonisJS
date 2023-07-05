import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "store/auth";
import { roles } from "store/auth/types";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { detailsCreateUser, detailsId, detailsMe } from "./data";
import { User, UserDetailsEdit } from "./types";

export default function UserFormPage() {
  const auth = useAuth();
  const user = useUser();
  const params = useParams();
  const userData = auth.state.user;
  const [updateDetailsMe, setUpdateDetailsMe] =
    useState<UserDetailsEdit>(detailsMe);
  const value = useRef("");
  const [updateDetailsId, setUpdateDetailsId] = useState<User>(detailsId);
  const [createUser, setCreateUser] = useState<User>(detailsCreateUser);
  const fetchedData: any = user.state.getUser?.data;

  const isUpdate = window.location.pathname.includes("create");

  const prevUpdateState = usePrevious(user.state.updateMe);
  const updateState = user.state.updateMe;
  // const x = usePrevious<number>(65162);

  useEffect(() => {
    if (params.id === "me") {
      setUpdateDetailsMe({ ...updateDetailsMe, ...userData });
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
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (params.id === "me") {
      setUpdateDetailsMe({
        ...updateDetailsMe,
        [name]: value,
      });
    } else {
      setUpdateDetailsId({
        ...updateDetailsId,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  }

  useEffect(() => {
    if (
      prevUpdateState?.loading &&
      !updateState?.loading &&
      updateState?.data
    ) {
      user.updateUserState(updateState.data!);
    }
  }, [updateState, prevUpdateState]);

  useEffect(() => {
    if (params.id !== "me") {
      user.getById(Number(params.id));
    }
  }, [params.id]);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isUpdate
              ? "Create User"
              : params.id === "me"
              ? "Edit Yours Details"
              : `Edit ${value.current} Details`}
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            {isUpdate ? (
              <>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={createUser.username}
                    onChange={inputHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={createUser.email}
                    onChange={inputHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="roles"
                  className="block text-sm font-medium leading-6 my-2 text-gray-900"
                >
                  Roles
                </label>
                <select
                  id="roles"
                  name="role" // MANDATORY to use name otherwise the inputHandler won't work
                  value={createUser.role}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={inputHandler}
                >
                  {roles.map((role, roleIndex) =>
                    // if loggedIn user is admin then admin can't update user to super-admin
                    createUser.role === "admin" &&
                    role === "super-admin" ? null : (
                      <option key={roleIndex} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
                <div className="flex items-center my-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isActive"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isActive ? true : false}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isActive: !updateDetailsId.isActive,
                      })
                    }
                    onChange={inputHandler}
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {createUser.isActive ? "Active" : "Not Active"}
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isBanned"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isBanned ? true : false}
                    onChange={inputHandler}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isBanned: !updateDetailsId.isBanned,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {createUser.isBanned ? "Banned" : "Not Banned"}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isVerified"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isVerified ? true : false}
                    onChange={inputHandler}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isVerified: !updateDetailsId.isVerified,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {createUser.isVerified ? "Verified" : "Not Verified"}
                  </label>
                </div>
                <div>
                  <button
                    className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>
                      user.updateById({
                        ...updateDetailsId,
                        id: Number(params.id),
                      })
                    }
                  >
                    Create User
                  </button>
                </div>
              </>
            ) : params.id === "me" ? (
              <>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={updateDetailsMe.username}
                    onChange={inputHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button
                  className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => user.updateMe({ ...updateDetailsMe })}
                >
                  Update Details
                </button>
              </>
            ) : (
              // if admin clicked on user to edit info
              <>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={updateDetailsId.username}
                    onChange={inputHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="roles"
                  className="block text-sm font-medium leading-6 my-2 text-gray-900"
                >
                  Roles
                </label>
                <select
                  id="roles"
                  name="role" // MANDATORY to use name otherwise the inputHandler won't work
                  value={updateDetailsId.role}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={inputHandler}
                >
                  {roles.map((role, roleIndex) =>
                    // if loggedIn user is admin then admin can't update user to super-admin
                    updateDetailsId.role === "admin" &&
                    role === "super-admin" ? null : (
                      <option key={roleIndex} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
                <div className="flex items-center my-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isActive"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isActive ? true : false}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isActive: !updateDetailsId.isActive,
                      })
                    }
                    onChange={inputHandler}
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {updateDetailsId.isActive ? "Active" : "Not Active"}
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isBanned"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isBanned ? true : false}
                    onChange={inputHandler}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isBanned: !updateDetailsId.isBanned,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {updateDetailsId.isBanned ? "Banned" : "Not Banned"}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    name="isVerified"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={updateDetailsId.isVerified ? true : false}
                    onChange={inputHandler}
                    onClick={() =>
                      setUpdateDetailsId({
                        ...updateDetailsId,
                        isVerified: !updateDetailsId.isVerified,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {updateDetailsId.isVerified ? "Verified" : "Not Verified"}
                  </label>
                </div>
                <div>
                  <button
                    className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>
                      user.updateById({
                        ...updateDetailsId,
                        id: Number(params.id),
                      })
                    }
                  >
                    Update Details
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
