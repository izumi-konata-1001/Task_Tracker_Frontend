import { useLocation, Link } from "react-router-dom";

function SwitchButton() {
  const location = useLocation();
  const isPomodoro = location.pathname === "/pomodoro";

  return (
    <div className="w-full flex justify-center items-center pt-10">
      <div className="relative flex w-72 border-2 border-primary bg-white rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full z-0 ${
            isPomodoro ? "" : "translate-x-full"
          }`}
        />
        <div className="relative z-10 flex w-full text-sm font-semibold text-center">
          <Link
            to="/pomodoro"
            className={`w-1/2 py-2 ${
              isPomodoro ? "text-white" : "text-primary"
            }`}
          >
            Pomodoro Timer
          </Link>
          <Link
            to="/pomodoro/all_sessions"
            className={`w-1/2 py-2 ${
              !isPomodoro ? "text-white" : "text-primary"
            }`}
          >
            All Sessions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SwitchButton;