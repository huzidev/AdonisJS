import { useState } from "react";
import { useAuth } from "store/auth";
import { useEmailVerification } from "store/emailVerification";
import { useVerifyPageHook } from "./hooks";
import { OtpPayload } from "./types";

export default function VerifyUserPage(): JSX.Element {
  const auth = useAuth();
  const verify = useEmailVerification();
  const [otp, setOtp] = useState<OtpPayload>({
    code: ''
  });

  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // if user removes any character then the length will not changes
    // otherwise if we didn't use this suppose user enter the code 2645 and removes the 5 from UI then the 5 will remains stored in ours otp.code state therefore we've used slice() function
     if (value === "") {
      setOtp((prevOtp) => ({
        ...prevOtp,
        code: prevOtp.code.slice(0, prevOtp.code.length - 1)
      }));
    } else {
      // Concatenate the value with otp.code
      setOtp((prevOtp) => ({ ...prevOtp, code: prevOtp.code + value }));
    }
  }

  useVerifyPageHook();

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {auth.state.user?.email}</p>
            </div>
          </div>
          <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w">
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
                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    // disabled={otp.length !== 6}
                    onClick={() => verify.verifyCode(otp)}
                    >
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>
                    <button
                      className="flex flex-row items-center text-blue-600"
                      // no need for sending id of user because only non-verified user can send this request and id will get fetched automatically in backend
                      onClick={() => verify.sendCode()}
                    >
                      Resend
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
