import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "store/auth";
import { roles } from "store/auth/types";
import { useUser } from "store/user";
import { usePrevious } from "utils";
import { UserDetailsEdit } from "./types";

export default function EditProfilePage() {
  const auth = useAuth();
  const user = useUser();
  const params = useParams();
  const userData = auth.state.user;
  const [updateDetails, setUpdateDetails] = useState<UserDetailsEdit>({
    username: "",
  });
  const [isBoolean, setIsBoolean] = useState({
    isVerified: false,
    isBanned: false,
    isActive: false,
  });
  const prevUpdateState = usePrevious(user.state.updateMe);
  const updateState = user.state.updateMe;
  // const x = usePrevious<number>(65162);

  useEffect(() => {
    setUpdateDetails({ ...updateDetails, ...userData });
  }, []);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setUpdateDetails({
      ...updateDetails,
      [e.target.name]: e.target.value,
    });
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

  let userInfo = user.state.getUser.data;
  const {
    username,
    isActive,
    isBanned,
    isVerified,
    role: userRole
  } = userInfo || {};
  
  useEffect(() => {
    setIsBoolean({
      ...isBoolean,
      isActive: isActive ? true : false,
      isBanned: isBanned ? true : false,
      isVerified: isVerified ? true : false,
    });
  }, [user.state.getUser.data]);

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
            {params.id === "me"
              ? "Edit Yours Details"
              : `Edit ${username} Details`}
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mb-6">
            {params.id === "me" ? (
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
                    value={updateDetails.username}
                    onChange={inputHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
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
                    value={username}
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {roles.map((role, roleIndex) => (
                    <option key={roleIndex} selected={role === userRole}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="flex items-center my-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={isBoolean.isActive ? true : false}
                    onClick={() =>
                      setIsBoolean({
                        ...isBoolean,
                        isActive: !isBoolean.isActive,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {isBoolean.isActive ? "Active" : "Not Active"}
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={isBoolean.isBanned ? true : false}
                    onClick={() =>
                      setIsBoolean({
                        ...isBoolean,
                        isBanned: !isBoolean.isBanned,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {isBoolean.isBanned ? "Banned" : "Not Banned"}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600"
                    checked={isBoolean.isVerified ? true : false}
                    onClick={() =>
                      setIsBoolean({
                        ...isBoolean,
                        isVerified: !isBoolean.isVerified,
                      })
                    }
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    {isBoolean.isVerified ? "Verified" : "Not Verified"}
                  </label>
                </div>
              </>
            )}
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => user.updateUser({ ...updateDetails })}
            >
              Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
