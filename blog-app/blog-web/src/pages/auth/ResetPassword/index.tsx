import ROUTE_PATHS from "Router/paths";
import qs from "query-string";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import useResetPasswordPageHooks from "./hooks";
import { ResetPasswordCode } from "./types";

export default function ResetPasswordPage(): JSX.Element {
  const state = useResetPassword();
  const params: any = {
    ...qs.parse(window.location.search),
  };
  const [resetState, setResetState] = useState<ResetPasswordCode>({
    email: params.email,
    code: "",
    password: "",
    passwordConfirmation: "",
  });

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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {resetState.email}</p>
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col space-y-16">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={resetState.password}
                    onChange={inputHandler}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="cpassword"
                    name="passwordConfirmation"
                    type="password"
                    onChange={inputHandler}
                    value={resetState.passwordConfirmation}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex flex-row mt-8 items-center justify-between mx-auto w-full max-w">
                  {/* Array.from() to create an array of the length provided */}
                  {Array.from({ length: 6 }, (_, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
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
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p className="text-center text-sm text-gray-500">
                    Remembered your account ?
                    <Link
                      to={ROUTE_PATHS.AUTH_SIGNIN}
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
            <p>Didn't recieve code?</p>
            <button
              className="flex flex-row items-center text-blue-600"
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
