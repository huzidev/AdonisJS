import { useEffect } from "react";
import { useUser } from "store/user";

export function useUsersPageHooks(): void {
  const user = useUser();
  const allUsers: any = user.state.getUserPage.data;

    useEffect(() => {
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allUsers) {
      user.allUserPage(1)
    }
  }, []);
}
