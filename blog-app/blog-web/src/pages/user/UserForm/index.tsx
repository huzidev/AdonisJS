import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuth } from "store/auth";
import { roles } from "store/auth/types";
import { useUser } from "store/user";
import 'utils/form/index.css';
import { LoadingList, LoadingThreeDots } from "utils/loading";
import { detailsBoolean } from "./data";
import { useUserFormHook } from "./hooks";
import { BooleanState } from "./types";

export default function UserFormPage() {
  const auth = useAuth();
  const user = useUser();
  const isDark: boolean  = auth.state.isDark ? true : false;
  const [booleanState, setBooleanState] =
    useState<BooleanState>(detailsBoolean);
  const isLoading = user.state.getUser.loading;

  // const prevUpdateState = usePrevious(user.state.updateMe);
  // const updateState = user.state.updateMe;
  // const x = usePrevious<number>(65162);

  // useEffect(() => {
  //   if (
  //     prevUpdateState?.loading &&
  //     !updateState?.loading &&
  //     updateState?.data
  //   ) {
  //     user.updateUserState(updateState.data!);
  //   }
  // }, [updateState, prevUpdateState]);

  const {
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
  } = useUserFormHook();
  return (
    <div>
      <div className="main">
        <div className="form">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="main-heading-content">
            {isCreate ? (
              "Create User"
            ) : // using ref Hook value.current so the username field won't re-render when admin edit the username
            // !isCreate so when user is at editing own info or when admin is edit some user info then loadign will show three dots loader
            !isCreate && isLoading ? (
              <LoadingThreeDots />
            ) : isMe && !isLoading ? (
              "Edit Yours Details"
            ) : (
              `Edit ${value.current}'s Details`
            )}
          </h2>
        </div>
        <form
          onSubmit={submit}
          className="form mt-6"
        >
          <div>
            {/* admin creating the user */}
            {isCreate ? (
              <>
                <label
                  htmlFor="username"
                  className="form-heading"
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
                    minLength={4}
                    required
                    className="form-input"
                  />
                </div>
                <label
                  htmlFor="email"
                  className="form-heading mt-2"
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
                    className="form-input"
                  />
                </div>
                <label
                  htmlFor="password"
                  className="form-heading mt-2"
                >
                  Password
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    id="password"
                    name="password"
                    type={booleanState.valuePass ? "text" : "password"}
                    value={createUser.password}
                    onChange={inputHandler}
                    required
                    className="form-input"
                  />
                  <span
                    onClick={() =>
                      setBooleanState({
                        ...booleanState,
                        valuePass: !booleanState.valuePass,
                      })
                    }
                  >
                    {booleanState.valuePass ? (
                      <RemoveRedEyeOutlinedIcon fontSize="small" className='form-input-password' />
                    ) : (
                      <VisibilityOffIcon fontSize="small" className='form-input-password' />
                    )}
                  </span>
                </div>
                <label
                  htmlFor="cpassword"
                  className="form-heading mt-2"
                >
                  Confirm Password
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    id="cpassword"
                    name="passwordConfirmation"
                    type={booleanState.valueConfPass ? "text" : "password"}
                    value={createUser.passwordConfirmation}
                    onChange={inputHandler}
                    required
                    className="form-input"
                  />
                  <span
                    onClick={() =>
                      setBooleanState({
                        ...booleanState,
                        valueConfPass: !booleanState.valueConfPass,
                      })
                    }
                  >
                    {booleanState.valueConfPass ? (
                      <RemoveRedEyeOutlinedIcon fontSize="small" className='form-input-password' />
                    ) : (
                      <VisibilityOffIcon fontSize="small" className='form-input-password' />
                    )}
                  </span>
                </div>
                {/* Creaate password length validation error */}
                <p
                  className={`transition-opacity duration-200 ${
                    createUser.password !== createUser.passwordConfirmation &&
                    createUser.password.length > 5
                      ? "opacity-100"
                      : "opacity-0"
                  } text-red-500`}
                >
                  Password doesn't match
                </p>
                <label
                  htmlFor="roles"
                  className="form-heading mt-2"
                >
                  Roles
                </label>
                <select
                  id="roles"
                  name="role" // MANDATORY to use name otherwise the inputHandler won't work
                  value={createUser.role}
                  className="form-input cursor-pointer"
                  onChange={inputHandler}
                >
                  {roles.map((role, roleIndex) =>
                    // if loggedIn user is admin then admin can't create user to super-admin
                    auth.state.user?.role === "admin" &&
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
                    className="form-checkbox"
                    checked={createUser.isActive ? true : false}
                    onClick={() =>
                      setCreateUser({
                        ...createUser,
                        isActive: !createUser.isActive,
                      })
                    }
                    onChange={inputHandler}
                  />
                  <label
                    htmlFor="checkbox"
                    className="form-checkbox-text"
                  >
                    {createUser.isActive ? "Active" : "Not Active"}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checkboxV"
                    type="checkbox"
                    name="isVerified"
                    className="form-checkbox"
                    checked={createUser.isVerified ? true : false}
                    onChange={inputHandler}
                    onClick={() =>
                      setCreateUser({
                        ...createUser,
                        isVerified: !createUser.isVerified,
                      })
                    }
                  />
                  <label
                    htmlFor="checkboxV"
                    className="form-checkbox-text"
                  >
                    {createUser.isVerified ? "Verified" : "Not Verified"}
                  </label>
                </div>
                <div>
                  <input
                    className="form-action mt-4"
                    type="submit"
                    value="Create User"
                  />
                </div>
              </>
            ) : isLoading ? (
              <LoadingList />
            ) : !isLoading && isMe ? (
              <>
                <label
                  htmlFor="username"
                  className="form-heading"
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
                    className="form-input"
                  />
                  <label className="mt-4 relative inline-flex items-center cursor-pointer">
                    <input 
                      onClick={() => auth.theme()}
                      type="checkbox"
                      defaultChecked={isDark ? true : false}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {isDark ? (
                        <>
                          Dark Mode <NightsStayIcon />
                        </>
                      ) : (
                        <>
                          Light Mode <LightModeIcon />
                        </>
                      )}
                    </span>
                  </label>
                  <input
                    className="form-action mt-4"
                    type="submit"
                    value="Update Details"
                  />
                </div>
              </>
            ) : (
              // if admin clicked on user to edit info
              <>
                <label
                  htmlFor="username"
                  className="form-heading"
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
                    className="form-input"
                  />
                </div>
                <label
                  htmlFor="roles"
                  className="form-heading mt-2"
                >
                  Roles
                </label>
                <select
                  id="roles"
                  name="role" // MANDATORY to use name otherwise the inputHandler won't work
                  value={updateDetailsId.role}
                  className="form-input cursor-pointer"
                  onChange={inputHandler}
                >
                  {roles.map((role, roleIndex) =>
                    // if loggedIn user is admin then admin can't create user to super-admin
                    auth.state.user?.role === "admin" &&
                    role === "super-admin" ? null : (
                      <option key={roleIndex} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
                <div className="flex items-center my-4">
                  <input
                    id="checkboxA"
                    type="checkbox"
                    name="isActive"
                    className="form-checkbox"
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
                    htmlFor="checkboxA"
                    className="form-checkbox-text"
                  >
                    {updateDetailsId.isActive ? "Active" : "Not Active"}
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="checkboxB"
                    type="checkbox"
                    name="isBanned"
                    className="form-checkbox"
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
                    htmlFor="checkboxB"
                    className="form-checkbox-text"
                  >
                    {updateDetailsId.isBanned ? "Banned" : "Not Banned"}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="checkboxV"
                    type="checkbox"
                    name="isVerified"
                    className="form-checkbox"
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
                    htmlFor="checkboxV"
                    className="form-checkbox-text"
                  >
                    {updateDetailsId.isVerified ? "Verified" : "Not Verified"}
                  </label>
                </div>
                <div>
                  <input
                    className="form-action mt-4"
                    type="submit"
                    value="Update Details"
                  />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
