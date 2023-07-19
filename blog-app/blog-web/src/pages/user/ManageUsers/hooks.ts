import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useManageUsersPageHooks(): void {
  const user = useUser();
  const state = user.state.getUserPage;
  const prev = usePrevious(state);
  const params = useParams();
  const navigate = useNavigate();

  // no need for create !allUsers.data or !allUsers.length because new list of users will fetch every time when admin clicked on next buttton
  useEffect(() => {
    const search: any = window.location.search;
    user.allUserPage({page: Number(params.page) || 1, ...search})
  }, [params.page, window.location.search]);

  useEffect(() => {
    if (prev?.loading) {
      if (!state.loading && !state.error) {
        successNotification(state.message);
      } 
      // if user enter the page exceeding the page limit
      else if (!state.loading && state.error) {
        navigate("/");
      }
    }
  }, [state])
}
