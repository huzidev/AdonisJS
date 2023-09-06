import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import "utils/form/index.css";
import { LoaderSpin } from "utils/loading";
import { authSignUpData, booleanValues, userSignInData } from "./data";
import { useAuthFormHook } from "./hooks";
import { AuthSignInPayload, AuthSignUpPayload, BooleanState } from "./types";

export default function UserFormPage(): JSX.Element {
  const auth = useAuth();
  const currentPath = window.location.pathname;
  const [isLogInForm, setIsLogInForm] = useState<boolean>(true);
  const [authLogIn, setAuthLogIn] = useState<AuthSignInPayload>(userSignInData);
  const [loading, setLoading] = useState<boolean>(false);
  const [authSignUp, setAuthSignUp] =
    useState<AuthSignUpPayload>(authSignUpData);
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
      ? setAuthLogIn({
          ...authLogIn,
          [e.target.name]: e.target.value,
        })
      : setAuthSignUp({
          ...authSignUp,
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
      auth.signIn(authLogIn);
    } else {
      auth.signUp(authSignUp);
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
                  value={authLogIn.email}
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
              <div className="form-password-field">
                <input
                  name="password"
                  type={booleanState.value ? "text" : "password"}
                  value={authLogIn.password}
                  onChange={inputHandler}
                  required
                  className="form-input"
                />
                <span
                  className="form-password-icon"
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
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={inputHandler}
                  value={authSignUp.username}
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
                  value={authSignUp.email}
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
              <div className="form-password-field">
                <input
                  name="password"
                  type={booleanState.valuePass ? "text" : "password"}
                  value={authSignUp.password}
                  onChange={inputHandler}
                  minLength={6}
                  required
                  className="form-input"
                />
                <span
                  className="form-password-icon"
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
              <div className="form-password-field">
                <input
                  type={booleanState.valueConfPass ? "text" : "password"}
                  name="passwordConfirmation"
                  value={authSignUp.passwordConfirmation}
                  onChange={inputHandler}
                  minLength={6}
                  required
                  className="form-input"
                />
                <span
                  className="form-password-icon"
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
                className={`transition-opacity duration-200 pt-2 ${
                  authSignUp.password !== authSignUp.passwordConfirmation &&
                  (authSignUp.password.length > 5 && authSignUp.passwordConfirmation.length > 5)
                    ? "block"
                    : "hidden"
                } text-red-500`}
              >
                Password doesn't match
              </p>
              <p
                className={`transition-opacity duration-200 pt-2 ${
                  (authSignUp.password.length < 6 && authSignUp.passwordConfirmation.length < 6 && 
                  (authSignUp.password.length === authSignUp.passwordConfirmation.length && (authSignUp.password.length > 1 && authSignUp.passwordConfirmation.length > 1))
                  )
                    ? "block"
                    : "hidden"
                } text-red-500`}
              >
                Password must be atleast 6 characters long
              </p>
            </div>
            <div className="flex items-center pt-2 mb-4">
              <input
                id="checkbox"
                type="checkbox"
                className="form-checkbox"
                onClick={() =>
                  setAuthSignUp({
                    ...authSignUp,
                    isBlogger: !authSignUp.isBlogger,
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
