import { useState } from "react";

import Timer from "./pomodoro_workbench_components/Timer";
import SessionSettingSection from "./pomodoro_workbench_components/SessionSettingSection";


function PomodoroWorkbench(){
    const [duration, setDuration]= useState(0);
    const [selectedTask, setSelectedTask] = useState("");
    const [visibleTaskCard, setVisibleTaskCard] = useState(false);
    const [startAvaliable, setStartAvaliable] = useState(false);
    const [note, setNote] = useState("");
    return(
        <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full flex flex-col justify-center items-center space-y-1 pt-10">
                <h1 class="w-full text-center text-black text-2xl font-semibold">Pomodoro workbench</h1>
            </div>
            <div class="w-full flex flex-col justify-center items-center pt-5">
                <div class="w-full flex flex-col justify-center items-center space-y-3 px-40">
                    <Timer 
                    visibleTaskCard={visibleTaskCard} setVisibleTaskCard={setVisibleTaskCard}  
                    selectedTask={selectedTask} setSelectedTask={setSelectedTask} 
                    duration={duration} setDuration={setDuration} 
                    startAvaliable={startAvaliable} setStartAvaliable={setStartAvaliable}
                    note={note} setNote={setNote}
                    />
                </div>
                <div class="w-full flex flex-col px-40 pt-5 pb-10">
                    <div class="w-full flex justify-start">
                        <SessionSettingSection setDuration={setDuration} setSelectedTask={setSelectedTask} setVisibleTaskCard={setVisibleTaskCard} setStartAvaliable={setStartAvaliable} note={note} setNote={setNote}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PomodoroWorkbench;