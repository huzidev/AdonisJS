import { useEffect } from "react";
import { initUser } from "store/auth/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";

export function useGetDataPageHooks(): void {
    const dispatch = useAppDispatch();
    function getUser() {
    dispatch(initUser())
  }
  
  useEffect(() => {
    getUser();
  }, []); 
}
