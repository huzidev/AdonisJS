import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import { AuthSignInPayload, AuthSignUpPayload, BooleanState } from "./types";

export default function UserFormPage(): JSX.Element {
  const auth = useAuth();
  const currentPath = window.location.pathname;
  const [isLogInForm, setIsLogInForm] = useState(true);
  const [userLogIn, setUserLogIn] = useState<AuthSignInPayload>({ email: "", password: "" });
  const [isBlogger, setIsBlogger] = useState<boolean>(false);
  const [userSignUp, setUserSignUp] = useState<AuthSignUpPayload>({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    isBlogger: isBlogger ? true : false
  });

  console.log("user signUp", userSignUp);
  

  const [booleanState, setBooleanState] = useState<BooleanState>({
    value: false,
    valuePass: false,
    valueConfPass: false
  });

  useEffect(() => {
    const stateCondition = currentPath.includes("/sign_in") ? true : false;
    setIsLogInForm(stateCondition);
    console.log("state condition", stateCondition);
  }, [currentPath]);

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    isLogInForm
      ? setUserLogIn({
          ...userLogIn,
          [e.target.name]: e.target.value,
        })
      : setUserSignUp({
          ...userSignUp,
          [e.target.name]: e.target.value,
        });
  }

  const title = isLogInForm ? "Sign In" : "Sign Up";
  const titleReverse = isLogInForm ? "Sign Up" : "Sign In";
  const descReverse = isLogInForm
    ? "Don't have an account ?"
    : "Already have an account ?";

  function submit() {
    if (isLogInForm) {
      auth.signIn(userLogIn);
    } else {
      auth.signUp(userSignUp);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {title} To You Account
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {isLogInForm ? (
          <>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userLogIn.email}
                  required
                  onChange={inputHandler}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  name="password"
                  type={booleanState.value ? "text" : "password"}
                  value={userLogIn.password}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span
                  onClick={() =>
                    setBooleanState({
                      ...booleanState,
                      value: !booleanState.value,
                    })
                  }
                  title={booleanState.value ? "Hide Password" : "Show Password"}
                >
                  {booleanState.value ? (
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usernmae
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={inputHandler}
                  value={userSignUp.username}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-3">
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
                  value={userSignUp.email}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  name="password"
                  type={booleanState.valuePass ? "text" : "password"}
                  value={userSignUp.password}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type={booleanState.valueConfPass ? "text" : "password"}
                  name="passwordConfirmation"
                  value={userSignUp.passwordConfirmation}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <RemoveRedEyeOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input id="checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray- dark:border-gray-600" onClick={() => setIsBlogger(!isBlogger)} />
              <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sign Up As Blogger</label>
            </div>
          </>
        )}
        <div>
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={submit}
          >
            {title}
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500">
          {descReverse}
          <Link
            to={isLogInForm ? ROUTE_PATHS.AUTH_SIGNUP : ROUTE_PATHS.AUTH_SIGNIN}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            &nbsp;
            {titleReverse}
          </Link>
        </p>
      </div>
    </div>
  );
}
