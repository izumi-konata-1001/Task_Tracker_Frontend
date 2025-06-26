import { useNavigate } from "react-router-dom";

function GuestHome(){
    const navigate = useNavigate();

    const handleStart = (e)=>{
        e.preventDefault();
        navigate('/register');
    }
    return(
        <div class="w-full h-full flex flex-col items-center justify-center px-40">
            <div class="w-full mb-5">
                <h1 class="text-left text-4xl font-bold text-dark">
                    Welcome to 
                    <span className="text-primary"> TaskFlow</span>
                </h1>
                <h1 class="text-left text-xl font-bold text-dark">— Your Smart Productivity Companion</h1>
            </div>
            <div class="w-full text-dark space-y-2">
                <p class="text-lg text-dark">
                    TaskFlow helps you organize, prioritize, and complete tasks with clarity and focus. Whether you’re working solo or collaborating with a team, our intuitive design, Pomodoro timer, and flexible task management tools are built to keep you on track and boost your efficiency.
                </p>
                <p class="text-xl font-bold text-primary">
                    Start your journey toward better focus and smarter work — today.
                </p>
                <div class="w-full flex justify-start items-center">
                    <button type="button" onClick={handleStart}
                    class="cursor-pointer px-8 py-1 border-3 border-primary bg-primary text-white text-xl font-semibold rounded-xl hover:bg-white hover:text-primary">
                        Start →
                        </button>

                </div>
            </div>
            
        </div>
    )
}

export default GuestHome;