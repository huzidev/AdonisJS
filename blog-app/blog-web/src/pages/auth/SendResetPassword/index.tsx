import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import "utils/form/index.css";
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
    <div className="main">
      <div className="form">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="main-heading-content">
          Reset Yours Password
        </h2>
      </div>
      <div className="mt-4 form">
        <label
          htmlFor="email"
          className="form-heading"
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
              className="form-input autofill:bg-yellow-200 "
            />
          </div>
          <input
            className="form-action mt-6"
            type="submit"
            value="Send Code"
          />
        </form>
        <p className="form-message">
          Remembered your account?
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
  );
}
