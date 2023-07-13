import { useNavigate } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import { usePrevious } from "utils/hooks";

export default function useResetPasswordPageHooks(): void {
  const state = useResetPassword();
  const prev = usePrevious(state);
  const navigate = useNavigate();
}
