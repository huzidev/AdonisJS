import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from 'store/auth';
import { RegisterState } from "./types";

export default function UserSignUpPage() {
  const auth = useAuth();
  const initialState: RegisterState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [user, setUser] = useState(initialState);
  const [valuePass, SetValuePass] = useState<boolean>(false); 
  const [valueConfPass, SetValueConfPass] = useState<boolean>(false); 
  const { username, email, password, passwordConfirmation } = user;

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function signup() {
    auth.signUp(user);
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
            Sign Up to your account
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  value={username}
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
                  value={email}
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
                  id="password"
                  name="password"
                  type={valuePass ? "text" : "password"}
                  value={password}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span onClick={() => SetValuePass(!valuePass)}>
                    {valuePass ? <RemoveRedEyeOutlinedIcon fontSize='small'/> : <VisibilityOffIcon fontSize='small'/>}
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
                {/* <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div> */}
              </div>
              <div className="mt-2 flex items-center">
                <input
                  id="password"
                  type={valueConfPass ? "text" : "password"}
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  onChange={inputHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span onClick={() => SetValueConfPass(!valueConfPass)}>
                    {valueConfPass ? <RemoveRedEyeOutlinedIcon fontSize='small'/> : <VisibilityOffIcon fontSize='small'/>}
                </span>
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={signup}
              >
                Sign Up
              </button>
            </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              to="/user/sign_in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Signin
            </Link>
          </p>
        </div>
      </div>
  );
}
