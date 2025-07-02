import { useNavigate } from "react-router-dom";

function GuestHome(){
    const navigate = useNavigate();

    const handleStart = (e)=>{
        e.preventDefault();
        navigate('/register');
    }
    return(
        <div className="h-full w-full p-10 flex flex-col justify-center items-center space-y-5">
            <div className="w-full mb-5">
                <h1 className="text-left text-3xl font-bold text-dark">
                    Welcome to 
                    <span className="text-primary"> Task Tracker</span>
                </h1>
                <h1 className="text-left text-xl font-bold text-dark">
                    — Your Smart Productivity Companion
                </h1>
            </div>
            <div className="w-full text-black space-y-2">
                <p className="text-lg text-black">
                    TaskFlow helps you organize, prioritize, and complete tasks with clarity and focus. Whether you’re working solo or collaborating with a team, our intuitive design, Pomodoro timer, and flexible task management tools are built to keep you on track and boost your efficiency.
                </p>
                <p className="text-xl font-bold text-primary">
                    Start your journey toward better focus and smarter work — today.
                </p>
                <div className="w-full flex justify-start items-center">
                    <button type="button" onClick={handleStart}
                    className="cursor-pointer px-8 py-1 border-3 border-primary bg-primary text-white text-xl font-semibold rounded-xl hover:bg-white hover:text-primary">
                        Start →
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default GuestHome;