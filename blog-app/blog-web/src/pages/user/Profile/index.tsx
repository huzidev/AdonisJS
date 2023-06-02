import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks/hooks";
import { useGetDataPageHooks } from "./hooks";
import { UserDetailState } from "./types";

export default function ViewProfilePage() {
  useGetDataPageHooks();
  const userData = useAppSelector((state) => state.user.getUser);
  const [userDetails, setUserDetails] = useState<UserDetailState>({ username: "", email: "" })
  
  useEffect(() => {
    setUserDetails({ ...userDetails, ...userData });
  }, [userData])

  return (
    <div>
      <div 
          className="w-11/12 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              User Profile
            </h1>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Name : {userDetails.username}
            </h2> 
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Email : {userDetails.email}
            </h2> 
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Blogs
            </h2> 
          </div>
        </div>
      User Profile
    </div>
  )
}