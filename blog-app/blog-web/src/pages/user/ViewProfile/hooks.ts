import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useViewProfilePageHook(): void {
  const user = useUser();
  const username = user.state.getUser.data?.username;
  const params = useParams();
  const state = user.state.getUser;
  const prev = usePrevious(state);

  useEffect(() => {
    if (params.id === "me") {
      successNotification("Your details fetched successfully!");
    } 
if (prev?.loading) {
    if (!state.loading && !state.error) {
        if (username) {
          successNotification(`${username}'s details fetched successfully`);
        }
    }
}
  }, [username, params.id, state]);
}
