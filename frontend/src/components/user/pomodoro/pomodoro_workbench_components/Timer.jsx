import { useState,useEffect, useRef } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

import TaskCard from "./TaskCard";

function Timer(props) {
    const {token} = useAuth()
    const intervalRef = useRef(null);

    const visibleTaskCard = props.visibleTaskCard;
    const setVisibleTaskCard = props.setVisibleTaskCard;
    const selectedTask = props.selectedTask;
    const setSelectedTask = props.setSelectedTask;
    const duration = props.duration;
    const setDuration = props.setDuration;
    const startAvaliable = props.startAvaliable;
    const setStartAvaliable = props.setStartAvaliable;
    const note = props.note;
    const setNote = props.setNote;

    const [message,setMessage] = useState("");
    const [pauseAvaliable, setPauseAvaliable] = useState(false);
    const [cancelAvaliable, setCancelAvaliable] = useState(false); 
    const [saveAvaliable, setSaveAvaliable] = useState(false);

    const [startTime, setStartTime] = useState(null);
    const [estimatedEndTime, setEstimatedEndTime] = useState(null);
    const [actualEndTime, setActualEndTime] = useState(null);
    const [breakPoint, setBreakPoint] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [durationInInfo, setDurationInInfo] =useState(0);
    const [paused, setPaused] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function formatDateToYYYYMMDD_HHMMSS(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleRemove = (e)=>{
        e.preventDefault();
        setVisibleTaskCard(false);
        setSelectedTask({});
        setDuration(0);
        setNote();
        return;
    }

    const handleStart =()=>{
        if(intervalRef.current !== null){
            console.log("interval still running. internal id:", intervalRef);
            return;
        }
        if(isRunning){
            console.log('timer still running');
            return;
        }
        if(paused == false){
            console.log('is not paused.');
            return;
        }

        setMessage("");
        const totalSeconds = duration * 60;
        setDurationInInfo(duration);
        setTimeLeft(totalSeconds);
        setIsRunning(true);
        setPaused(false);
        setPauseAvaliable(true);
        setCancelAvaliable(true);
        setStartAvaliable(false);
        setSaveAvaliable(false);
        const start = new Date();
        const estimatedEnd = new Date(start.getTime() + totalSeconds * 1000);
        setStartTime( formatDateToYYYYMMDD_HHMMSS(start));
        setEstimatedEndTime(formatDateToYYYYMMDD_HHMMSS(estimatedEnd));
        setActualEndTime(null);
        setBreakPoint(0);
        intervalRef.current = setInterval(countDownTimeLeft, 1000);
    }

    const countDownTimeLeft = ()=>{
        setTimeLeft((prev)=>{
            if(prev <= 1 ){
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setIsRunning(false);
                const actualEnd = new Date();
                setActualEndTime( formatDateToYYYYMMDD_HHMMSS(actualEnd));
                setPaused(null);
                setPauseAvaliable(false);
                setCancelAvaliable(false);
                setSaveAvaliable(true);
                return 0;
            }
            return prev -1;
        });
    }

    const handlePause = ()=>{
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPaused(true);
        setIsRunning(false);
        setBreakPoint((prev)=>{
            return prev+ 1
        })
    }

    const handleResume =() =>{
        if(intervalRef.current !== null){
            console.log("interval still running. internal id:", intervalRef);
            return;
        }
        if(isRunning){
            console.log('timer still running');
            return;
        }
        if(!paused){
            console.log('is not paused.');
            return;
        }
        
        setPaused(false);
        setIsRunning(true);
        intervalRef.current = setInterval(countDownTimeLeft,1000);
    }

    const handleCancel =()=>{
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPaused(null);
        setIsRunning(false);

        setTimeLeft(null);
        setStartTime(null);
        setEstimatedEndTime(null);
        setActualEndTime(0);
        setDurationInInfo(0);
        setBreakPoint(0);
        setStartAvaliable(true);
        setPauseAvaliable(false);
        setSaveAvaliable(false);
        setCancelAvaliable(false);
    }

    const handleSave = async ()=>{
        if(!startTime || !estimatedEndTime ||!actualEndTime ||!selectedTask || !duration || !breakPoint){
            console.log('Lost information.');
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/pomodoro/create`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,    
                },
                body:JSON.stringify({
                    taskId:selectedTask.id,
                    startTime:startTime,
                    estimatedEndTime:estimatedEndTime,
                    actualEndTime:actualEndTime,
                    breakPointNumber:breakPoint,
                    note:note,
                    duration:duration,
                }),
            });

            const result= await response.json();
            if(response.ok){
                console.log('Save session successfully.');
                setMessage('Save session successfully.');
                setStartAvaliable(true);
                setTimeLeft(null);
                setStartTime(null);
                setEstimatedEndTime(null);
                setActualEndTime(0);
                setDurationInInfo(0);
                setBreakPoint(0);
                setSaveAvaliable(false);
                return;
            }else{
                console.error('Save session failed, error:', result.error);
                setMessage("Save session failed");
                return;
            }
        }catch(error){
            setMessage('Save session failed, network or unexpected error.')
            console.error('Save session failed, error:', error);
            return;
        }
    }

    return(
        <div class="w-full">
            <div class="w-full flex flex-col">
                <div class="w-full flex flex-col justify-start">
                    <h3 class="text-alter">{message}</h3>
                    <h2 class="text-xl text-dark font-semibold">Current task:</h2>
                    {visibleTaskCard ? (
                        <div class="w-full flex flex-row space-x-2">
                            <div class="w-5/6">
                                <TaskCard selectedTask={selectedTask} duration={duration} note={note}/>
                            </div>
                            <div class="w-1/5">
                                <button type="button" onClick={handleRemove}
                                class="w-full h-full border-2 border-alter bg-alter text-white text-xl rounded-xl hover:bg-white hover:text-alter">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ):(<p class="text-alter">No task yet</p>)}
                </div>
                <div calss="w-full flex flex-col space-y-2">
                    <h3 class="text-xl text-dark font-semibold pt-3">Rest Time: </h3>
                    <div class="w-full h-30 border-4 border-primary bg-white rounded-2xl flex justify-center items-center">
                        <label class="text-primary text-6xl font-semibold">
                            {formatTime(timeLeft)}
                        </label>
                    </div>
                    <div class="w-full pt-5">
                        <div class="w-full flex flex-col space-y-2">
                            <div class="w-full flex flex-row items-center justify-between space-x-2">
                                <button 
                                type="button" onClick={handleStart}
                                disabled={!startAvaliable}
                                class={`w-1/2 h-10  rounded-xl
                                    ${startAvaliable ?(
                                         'bg-green border-3 border-green text-white text-xl hover:bg-white hover:text-green'
                                    ):(
                                        'bg-shadow text-white border-shadow cursor-not-allowed'
                                    )}`}>
                                    Start
                                </button>
                                {!paused ? (
                                    <button type="button" onClick={handlePause}
                                    disabled={!pauseAvaliable}
                                    class={`w-1/2 h-10 rounded-xl
                                    ${pauseAvaliable ? (
                                        ' bg-alter border-3 border-alter text-white text-xl hover:bg-white hover:text-alter')
                                    :(
                                        'bg-shadow text-white border-shadow cursor-not-allowed'
                                    )}`}>
                                        Pause
                                    </button>
                                ): (
                                    <button type="button" onClick={handleResume}
                                    class="w-1/2 h-10 bg-primary border-3 border-primary rounded-xl text-white text-xl hover:bg-white hover:text-primary">
                                        Resume
                                    </button>
                                )}
                            </div>
                            <div class="w-full flex justify-center items-center">
                                <button type="button" onClick={handleCancel}
                                disable={!cancelAvaliable}
                                class={`w-full h-10 rounded-xl
                                ${cancelAvaliable ?(
                                    ' bg-primary border-3 border-primary  text-white text-xl hover:bg-white hover:text-primary'
                                ):(
                                    'bg-shadow text-white border-shadow cursor-not-allowed'
                                )}
                                `}>
                                    Cancel
                                </button>
                            </div>
                            <div class="w-full flex justify-center items-center">
                                <button type="button" onClick={handleSave}
                                disable={!saveAvaliable}
                                class={`w-full h-10 rounded-xl
                                ${saveAvaliable ?(
                                    ' bg-primary border-3 border-primary  text-white text-xl hover:bg-white hover:text-primary'
                                ):(
                                    'bg-shadow text-white border-shadow cursor-not-allowed'
                                )}
                                `}>
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                    <div class="w-full flex flex-col pt-5 space-y-1">
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Start Time: </label>
                            {startTime ? (
                                <label  class="text-xl text-dark font-semibold">{startTime}</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Estimated End Time: </label>
                            {estimatedEndTime ? (
                                <label class="text-xl text-dark font-semibold">{estimatedEndTime}</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Accutrally End Time: </label>
                            {actualEndTime ? (
                                <label class="text-xl text-dark font-semibold">{actualEndTime}</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Time left: </label>
                            {timeLeft ? (
                                <label class="text-xl text-alter font-semibold">{formatTime(timeLeft)}</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Duration: </label>
                            {durationInInfo ? (
                                <label class="text-xl text-primary font-semibold">{durationInInfo} mins</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                        <p class="flex justify-between">
                            <label class="text-base text-dark">Break Point: </label>
                            {breakPoint? (
                                <label class="text-xl text-primary font-semibold">{breakPoint}</label>
                            ):(
                                <label class="text-shadow text-base">/</label>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer;