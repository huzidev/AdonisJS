import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ROUTE_PATHS from "Router/paths";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import "utils/form/index.css";
import { errorMessage } from "utils/notifications";
import "utils/table/index.css";
import { initialIconState } from "../Form/data";
import { IconState } from "../Form/types";
import { initialState } from "./data";
import useResetPasswordPageHooks from "./hooks";
import './styles.css';
import { ResetPasswordState } from "./types";

export default function ResetPasswordPage(): JSX.Element {
  const state = useResetPassword();
  const navigate = useNavigate();
  const [resetState, setResetState] =
    useState<ResetPasswordState>(initialState);
  const [icon, setIcon] = useState<IconState>(initialIconState);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

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
      errorMessage("You've to provide valid email");
    }
  }, []);

  function handleOtpChange(e: any, index: number) {
    if (isNaN(e.value)) {
      return false;
    }

    const newOtp = [...otp];
    newOtp[index] = e.value;
    setOtp(newOtp);

    // && e.value means their must be some value in input field then put the focus on next input field
    if (e.nextSibling && e.value) {
      e.nextSibling.focus();
    } // so when user removes the value from input field then change focus on to previous input field
    // index !== 0 means when user reached to first index then don't change the foucs to previousSibling because their will be NO input previous and it'll give error
    else if (!e.value && index !== 0) {
      e.previousSibling.focus();
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

  let otpLength: number = otp.filter((val: any) => val).length;
  let validation: boolean = otpLength === 6 && (password === confirmPassword && (password.length && confirmPassword.length >= 6)) ? true : false;

  return (
    <div className="main">
      <div className="relative bg-white px-6 py-10 shadow-xl mx-auto max-w-lg rounded-2xl dark:bg-gray-900">
        <div className="mx-auto flex max-w-md flex-col space-y-6">
          <div className="text-center">
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
                <label htmlFor="cpassword" className="form-heading mt-6">
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
                    title={
                      icon.confirmPassword ? "Hide Password" : "Show Password"
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
                </div>
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
                <div className="flex items-center justify-between mt-8 mx-auto w-full max-w">
                  {/* Array.from() to create an array of the length provided */}
                  {otp.map((data, index: number) => (
                    <input
                      className="otp-input"
                      type="text"
                      name="otp"
                      key={index}
                      value={data}
                      required
                      maxLength={1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOtpChange(e.target, index)
                      }
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                        e.target.select()
                      }
                    />
                  ))}
                  {/* {Array.from({ length: 6 }, (_, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 dark:bg-gray-800 dark:text-white"
                        type="text"
                        maxLength={1}
                        onChange={handleOtpChange}
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
                  ))} */}
                </div>
              </div>
              <div className="flex flex-col">
                  <button
                    className={`flex-class w-full ${validation ? 'cursor-pointer' : 'cursor-not-allowed disabled:opacity-60'} border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm`}
                    disabled={validation ? false : true}
                    type="submit"
                  >
                    Change Password
                  </button>
                <div className="flex-class text-sm font-medium space-x-1">
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
          <div className="flex-class text-sm font-medium space-x-1 text-gray-500 dark:text-gray-400">
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
