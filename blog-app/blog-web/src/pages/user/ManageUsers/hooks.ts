import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useManageUsersPageHooks(): void {
  const user = useUser();
  const state = user.state.getUserPage;
  const prev = usePrevious(state);
  const params = useParams();

  // no need for create !allUsers.data or !allUsers.length because new list of users will fetch every time when admin clicked on next buttton
  useEffect(() => {
    user.allUserPage(Number(params.page) || 1)
  }, [params.page]);

  useEffect(() => {
    if (prev?.loading) {
      if (!state.loading && !state.error) {
        successNotification(state.message);
      }
    }
  }, [state])
}
