import { useAuth } from "store/auth";

export default function ToggleThemePopUpPage() {
    const auth = useAuth();
  return (
    <div className="h-screen flex justify-center items-center">
        <h1 className="dark:text-white">
            Yours Theme has been changed to {auth.state.isDark ? 'Dark' : 'Light'} Mode
        </h1>
    </div>
  )
}
