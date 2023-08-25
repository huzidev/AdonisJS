import { useAuth } from "store/auth";

export default function ToggleThemePopUpPage() {
  const auth = useAuth();
  return (
    <div className="h-screen flex justify-center items-center dark:bg-[#181a1b]">
      <h1 className="dark:text-white transition ease-in-out duration-700">
        Yours Theme has been changed to {auth.state.isDark ? "Dark" : "Light"}{" "}
        Mode
      </h1>
    </div>
  );
}
