import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import useResetPasswordPageHooks from "./hooks";
import { sendResetCode } from "./types";

export default function SendResetPasswordPage(): JSX.Element {
  const [email, setEmail] = useState<sendResetCode>({ email: "" });
  const state = useResetPassword();

  useResetPasswordPageHooks(email);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    state.sendResetPasswordCode(email);
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
          Reset Yours Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <form onSubmit={submit}>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail({ ...email, email: e.target.value })
              }
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <input
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 my-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value="Send Code"
          />
        </form>
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
  );
}
