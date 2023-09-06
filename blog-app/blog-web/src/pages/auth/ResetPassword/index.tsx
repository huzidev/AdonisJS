import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ROUTE_PATHS from "Router/paths";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPassword } from "store/resetPassword";
import "utils/form/index.css";
import "utils/table/index.css";
import { initialIconState } from "../Form/data";
import { IconState } from "../Form/types";
import { initialState } from "./data";
import useResetPasswordPageHooks from "./hooks";
import { ResetPasswordState } from "./types";

export default function ResetPasswordPage(): JSX.Element {
  const state = useResetPassword();
  const navigate = useNavigate();
  const [resetState, setResetState] =
    useState<ResetPasswordState>(initialState);
  const [icon, setIcon] = useState<IconState>(initialIconState);

  const password = resetState.password;
  const confirmPassword = resetState.confirmPassword;

  let params: any = {
    ...qs.parse(window.location.search),
  };

  useEffect(() => {
    if (params.email) {
      setResetState({ ...resetState, email: params.email });
    }
    // so if user tries to access resetPassword state without email then navigate user to / homepage
    else {
      navigate("/");
      toast.error("You've to provide valid email");
    }
  }, []);

  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // if user removes any character then the length will not changes
    // otherwise if we didn't use this suppose user enter the code 2645 and removes the 5 from UI then the 5 will remains stored in ours otp.code state therefore we've used slice() function
    if (value === "") {
      setResetState((prevOtp) => ({
        ...prevOtp,
        code: prevOtp.code.slice(0, prevOtp.code.length - 1),
      }));
    } else {
      // Concatenate the value with otp.code
      setResetState((prevOtp) => ({ ...prevOtp, code: prevOtp.code + value }));
    }
  }

  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setResetState({
      ...resetState,
      [e.target.name]: e.target.value,
    });
  }

  useResetPasswordPageHooks();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    state.resetPassword({ ...resetState });
  }

  return (
    <div>
      <div className="relative bg-white px-6 mt-10 py-10 shadow-xl mx-auto w-full max-w-lg rounded-2xl dark:bg-gray-900">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <p className="font-semibold text-3xl dark:text-white">
              Reset Password
            </p>
            <p className="form-message">
              We have sent a code to your email {resetState.email}
            </p>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col space-y-16">
              <div>
                <label htmlFor="password" className="form-heading">
                  New Password
                </label>
                <div className="form-password-field">
                  <input
                    name="password"
                    type={icon.password ? "text" : "password"}
                    value={resetState.password}
                    onChange={inputHandler}
                    required
                    className="form-input"
                  />
                  <span
                    className="form-password-icon"
                    onClick={() =>
                      setIcon({
                        ...icon,
                        password: !icon.password,
                      })
                    }
                    title={icon.password ? "Hide Password" : "Show Password"}
                  >
                    {icon.password ? (
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
              <div>
                <label htmlFor="cpassword" className="form-heading">
                  Confirm New Password
                </label>
                <div className="form-password-field">
                  <input
                    name="confirmPassword"
                    type={icon.confirmPassword ? "text" : "password"}
                    value={resetState.confirmPassword}
                    onChange={inputHandler}
                    required
                    className="form-input"
                  />
                  <span
                    className="form-password-icon"
                    onClick={() =>
                      setIcon({
                        ...icon,
                        confirmPassword: !icon.confirmPassword,
                      })
                    }
                    title={icon.confirmPassword ? "Hide Password" : "Show Password"}
                  >
                    {icon.confirmPassword ? (
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
                <span
                  className="form-password-icon"
                  onClick={() =>
                    setIcon({
                      ...icon,
                      confirmPassword: !icon.confirmPassword,
                    })
                  }
                >
                  {icon.confirmPassword ? (
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
                <p
                  className={`transition-opacity duration-200 pt-2 ${
                    password !== confirmPassword &&
                    password.length > 5 &&
                    confirmPassword.length > 5
                      ? "block"
                      : "hidden"
                  } text-red-500`}
                >
                  Password doesn't match
                </p>
                <p
                  className={`transition-opacity duration-200 pt-2 ${
                    password.length < 6 &&
                    confirmPassword.length < 6 &&
                    password.length === confirmPassword.length &&
                    password.length > 1 &&
                    confirmPassword.length > 1
                      ? "block"
                      : "hidden"
                  } text-red-500`}
                >
                  Password must be atleast 6 characters long
                </p>
                <div className="flex flex-row mt-8 items-center justify-between mx-auto w-full max-w">
                  {/* Array.from() to create an array of the length provided */}
                  {Array.from({ length: 6 }, (_, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:bg-gray-800 dark:text-white"
                        type="text"
                        maxLength={1}
                        onChange={handleOtpChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div>
                  <input
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    // disabled={otp.length !== 6}
                    type="submit"
                    value="Change Password"
                  />
                </div>
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1">
                  <p className="form-message">
                    Remembered your account ?
                    <Link
                      to={ROUTE_PATHS.AUTH_SIGNIN}
                      className="form-auth-action"
                    >
                      {" "}
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 dark:text-gray-400">
            <p>Didn't recieved code?</p>
            <button
              className="form-auth-action"
              onClick={() => state.resendResetPasswordCode(params)}
              // no need for sending id of user because only non-verified user can send this request and id will get fetched automatically in backend
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
