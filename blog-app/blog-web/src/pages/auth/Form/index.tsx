import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import "utils/form/index.css";
import { LoaderSpin } from "utils/loading";
import { booleanValues, userSignInData, userSignUpData } from "./data";
import { useAuthFormHook } from "./hooks";
import { AuthSignInPayload, AuthSignUpPayload, BooleanState } from "./types";

export default function UserFormPage(): JSX.Element {
  const auth = useAuth();
  const currentPath = window.location.pathname;
  const [isLogInForm, setIsLogInForm] = useState<boolean>(true);
  const [userLogIn, setUserLogIn] = useState<AuthSignInPayload>(userSignInData);
  const [loading, setLoading] = useState<boolean>(false);
  const [userSignUp, setUserSignUp] =
    useState<AuthSignUpPayload>(userSignUpData);
  const [booleanState, setBooleanState] = useState<BooleanState>(booleanValues);

  const currentState = isLogInForm
    ? auth.state.signInState.loading
    : auth.state.signUpState.loading;

  useEffect(() => {
    const stateCondition = currentPath.includes("/sign_in") ? true : false;
    setIsLogInForm(stateCondition);
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
    ? "Don't have an account?"
    : "Already have an account?";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLogInForm) {
      auth.signIn(userLogIn);
    } else {
      auth.signUp(userSignUp);
    }
  }
  useAuthFormHook();

  useEffect(() => {
    // instead of checking auth.state.singIn.loading OR auth.state.signOut.loading simply create single var for both to manage loading state for showing spin loader
    if (currentState) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentState]);

  return (
    <div className="main">
      <div className="form">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="main-heading-content">{title} To Your Account</h2>
      </div>
      {/* MANDATORY to use form otherwise the required property of input will not work */}
      {/* ALSO to use <input type="submit" /> while using form and e.preventDefault() in submit function otherwise the data will append in URL */}
      <form onSubmit={submit} className="mt-6 form">
        {isLogInForm ? (
          <>
            <div className="mb-3">
              <label htmlFor="email" className="form-heading">
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
                  className="form-input"
                />
              </div>
            </div>
            <div className="my-6">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-heading">
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    className="form-auth-action"
                    to={ROUTE_PATHS.SEND_RESET_PASSWORD}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  name="password"
                  type={booleanState.value ? "text" : "password"}
                  value={userLogIn.password}
                  onChange={inputHandler}
                  required
                  className="form-input"
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
                    <RemoveRedEyeOutlinedIcon fontSize="small" className="form-input-password" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" className="form-input-password" />
                  )}
                </span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label htmlFor="username" className="form-heading">
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
                  className="form-input"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-heading">
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
                  className="form-input"
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-heading">
                  Password
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  name="password"
                  type={booleanState.valuePass ? "text" : "password"}
                  value={userSignUp.password}
                  onChange={inputHandler}
                  minLength={6}
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
                    <RemoveRedEyeOutlinedIcon
                      fontSize="small"
                      className="form-input-password"
                    />
                  ) : (
                    <VisibilityOffIcon
                      fontSize="small"
                      className="form-input-password"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-heading">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type={booleanState.valueConfPass ? "text" : "password"}
                  name="passwordConfirmation"
                  value={userSignUp.passwordConfirmation}
                  onChange={inputHandler}
                  minLength={6}
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
                    <RemoveRedEyeOutlinedIcon
                      fontSize="small"
                      className="form-input-password"
                    />
                  ) : (
                    <VisibilityOffIcon
                      fontSize="small"
                      className="form-input-password"
                    />
                  )}
                </span>
              </div>
              <p
                className={`transition-opacity duration-200 ${
                  userSignUp.password !== userSignUp.passwordConfirmation &&
                  userSignUp.password.length > 5
                    ? "opacity-100"
                    : "opacity-0"
                } text-red-500`}
              >
                Password doesn't match
              </p>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="checkbox"
                type="checkbox"
                className="form-checkbox"
                onClick={() =>
                  setUserSignUp({
                    ...userSignUp,
                    isBlogger: !userSignUp.isBlogger,
                  })
                }
              />
              <label htmlFor="checkbox" className="form-checkbox-text">
                Sign Up As Blogger
              </label>
            </div>
          </>
        )}
        <div>
          <button className="form-action">
            {title} {loading && <LoaderSpin />}
          </button>
        </div>
        <p className="form-message">
          {descReverse}
          <Link
            to={isLogInForm ? ROUTE_PATHS.AUTH_SIGNUP : ROUTE_PATHS.AUTH_SIGNIN}
            className="form-auth-action"
          >
            &nbsp;
            {titleReverse}
          </Link>
        </p>
      </form>
    </div>
  );
}
