import { useUser } from "store/user";

export function useUsersPageHooks(): void {
  const user = useUser();
  const allUsers: any = user.state.getUserPage.data;

    
}
