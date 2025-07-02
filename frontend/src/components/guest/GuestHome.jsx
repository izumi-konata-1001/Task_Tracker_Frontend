import { useNavigate } from "react-router-dom";

function GuestHome(){
    const navigate = useNavigate();

    const handleStart = (e)=>{
        e.preventDefault();
        navigate('/register');
    }
    return(
<div className="h-full w-full px-6 sm:px-20 py-12 flex flex-col justify-center items-center space-y-6 bg-white">
  <div className="w-full">
    <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-2">
      Task Tracker
      <span className="text-primary"> – Focus Better, Achieve More</span>
    </h1>
    <p className="text-base text-black font-medium leading-relaxed space-y-3">
        Welcome to <span className="text-primary">Task Tracker</span>,
        <span className="text-base"> your reliable companion for </span>
        <span className="text-primary italic"> focus</span>, 
        <span className="text-primary italic"> productivity</span>, and 
        <span className="text-primary italic"> mindful time management</span>.<br className="hidden sm:block" />
        Designed with a <span className="italic text-primary">clean teal-blue aesthetic</span> and inspired by the 
        <span className="text-primary italic"> Pomodoro Technique</span>, 
        Task Tracker lets you:
    </p>
  </div>

  <div className="w-full flex flex-col space-y-3 mt-2">
    <p className="text-lg font-medium text-dark">🎯 Choose tasks and start focused Pomodoro sessions</p>
    <p className="text-lg font-medium text-dark">🧠 Record every session — including duration, break points, and notes</p>
    <p className="text-lg font-medium text-dark">📊 Track your progress over time with detailed session logs</p>
    <p className="text-lg font-medium text-dark">🧩 Organize tasks under issues to manage bigger goals and projects</p>
    <p className="text-lg font-medium text-dark">🔔 Stay on track with visual cues and gentle reminders</p>
  </div>

<p className="text-base sm:text-lg font-medium text-center text-dark mt-8 leading-relaxed">
  Whether you're <span className="text-primary font-semibold">studying</span>, 
  <span className="text-primary font-semibold"> working remotely</span>, or 
  <span className="text-primary font-semibold"> managing long-term goals</span>,
  <span className="text-primary font-semibold">Task Tracker</span> helps you stay 
  <span className="font-semibold"> structured</span> and 
  <span className="font-semibold"> motivated</span> — one task at a time.
</p>

  <div className="w-full flex justify-start mt-6">
    <button
      type="button"
      onClick={handleStart}
      className="cursor-pointer px-8 py-2 bg-primary text-white text-lg font-semibold rounded-xl border-2 border-primary 
        hover:bg-white hover:text-primary transition-colors duration-300 shadow-md"
    >
      Start →
    </button>
  </div>
</div>
    )
}

export default GuestHome;