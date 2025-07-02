import { useState } from "react";

import Timer from "./pomodoro_workbench_components/Timer";
import SessionSettingSection from "./pomodoro_workbench_components/SessionSettingSection";


function PomodoroWorkbench(){
    const [visibleTaskCard, setVisibleTaskCard] = useState(false);
    const [startAvaliable, setStartAvaliable] = useState(false);
    const [sessionSnapshot, setSessionSnapshot] = useState(null);
    const [hasActiveCard, setHasActiveCard] = useState(false);

    return(
        <div className="w-full pb-5 md:px-20 px-10">
            <h1 className="w-full text-center text-black sm:text-2xl text-xl sm:font-semibold font-bold">
                Pomodoro workbench
            </h1>

            <div className="w-full flex flex-col justify-center items-start">
                <h3 className="text-dark text-lg font-bold">Step 1: Choose a task to work on</h3>
                <SessionSettingSection  
                hasActiveCard={hasActiveCard} setHasActiveCard={setHasActiveCard}
                setVisibleTaskCard={setVisibleTaskCard} setStartAvaliable={setStartAvaliable} 
                setSessionSnapshot={setSessionSnapshot}/>
            </div>

            {hasActiveCard ? 
                (<>
                    <hr className="border-t-2 border-shadow my-8 w-full" />
                    
                    <div className="w-full flex flex-col justify-center items-start">
                        <h3 className="text-dark text-lg font-bold">Step 2: Start the Pomodoro timer</h3>
                        <Timer 
                        setHasActiveCard={setHasActiveCard}
                        sessionSnapshot={sessionSnapshot} setSessionSnapshot={setSessionSnapshot}
                        visibleTaskCard={visibleTaskCard} setVisibleTaskCard={setVisibleTaskCard}  
                        startAvaliable={startAvaliable} setStartAvaliable={setStartAvaliable}
                        />
                    </div>
                </>)
                :(<></>)
            }
        </div>
    )
}

export default PomodoroWorkbench;