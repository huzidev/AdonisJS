import { useAuth } from "store/auth";

export default function ToggleThemePopUpPage() {
    const auth = useAuth();

  return (
    <div className={`h-screen flex justify-center items-center transition ease-in-out duration-300 ${auth.state.isDark ? 'bg-[#181a1b]' : 'bg-white'}`}>
      <h1 className={auth.state.isDark ? 'text-white' : 'text-black'}>
        Yours Theme has been changed to {auth.state.isDark ? "Dark" : "Light"}{" "}
        Mode
      </h1>
    </div>
  );
}
