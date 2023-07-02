import { useUser } from "store/user";
import { useUsersPageHooks } from "./hooks";

export default function UsersPage() {
  const user = useUser();
  const allUsers = user.state.allUser?.data;
  console.log("all users", allUsers);

  useUsersPageHooks();

  return (
    <div>
      <h1>
        Manage Users
      </h1>
      {allUsers?.map((user: any) => (
        <h1>
          Username is : {user.username}
        </h1>
      ))}
    </div>
  )
}
