import { useState,useEffect, useRef } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

import { RiDeleteBin5Line } from "react-icons/ri";

import SessionCard from "./SessionCard";

function Timer(props) {
    const {token} = useAuth()
    const intervalRef = useRef(null);

    const visibleTaskCard = props.visibleTaskCard;
    const setVisibleTaskCard = props.setVisibleTaskCard;
    const startAvaliable = props.startAvaliable;
    const setStartAvaliable = props.setStartAvaliable;
    const sessionSnapshot = props.sessionSnapshot;
    const setSessionSnapshot = props.setSessionSnapshot;
    const setHasActiveCard = props.setHasActiveCard;

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
        handleCancel();
        setVisibleTaskCard(false);
        setSessionSnapshot(null);
        setHasActiveCard(false);
        
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
        const totalSeconds = sessionSnapshot.duration * 60;
        setDurationInInfo(sessionSnapshot.duration);
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
                setCancelAvaliable(true);
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
        if (!startTime || !estimatedEndTime || !actualEndTime || !sessionSnapshot) {
            console.log('Lost information.');
            return;
        }

        if(!breakPoint)
            setBreakPoint(0);

        try{
            const response = await fetch(`${BASE_URL}/pomodoro/create`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,    
                },
                body:JSON.stringify({
                    taskId:sessionSnapshot.task.id,
                    startTime:startTime,
                    estimatedEndTime:estimatedEndTime,
                    actualEndTime:actualEndTime,
                    breakPointNumber:breakPoint,
                    note:sessionSnapshot.note,
                    duration:sessionSnapshot.duration,
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
        <div className="w-full flex flex-col">
            <p className="text-sm text-alter text-center">{message}</p>
            <div className="w-full flex flex-col justify-start">
                <h2 className="text-base text-black font-bold">Selected Task:</h2>
                {visibleTaskCard && sessionSnapshot ? (
                    <div className="w-full flex flex-row space-x-2">
                        <div className="w-9/10">
                            <SessionCard selectedTask={sessionSnapshot.task} duration={sessionSnapshot.duration} note={sessionSnapshot.note}/>
                        </div>
                        <div className="w-1/10">
                            <button type="button" onClick={handleRemove}
                                    className="cursor-pointer w-full h-full cursor rounded-xl bg-alter text-white border-2 border-alter
                                        hover:bg-white hover:text-alter 
                                        font-medium transition-colors duration-300
                                        flex items-center justify-center"
                            >
                                 <RiDeleteBin5Line className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                ):(
                    <div className="bg-white rounded-xl p-3">
                        <p className="text-center text-shadow italic">No Task Selected yet</p>
                    </div>
                )}
            </div>
            <div calss="w-full flex flex-col">
                <h3 className="text-xl text-black font-bold pt-3">Rest Time: <label className="text-shadow text-sm font-medium">(click start button to start)</label></h3>
                
                <div className="w-full h-30 border-4 border-primary bg-white rounded-2xl flex justify-center items-center">
                    <label className="text-primary text-6xl font-semibold">
                        {formatTime(timeLeft)}
                    </label>
                </div>

                <div className="w-full pt-5">
                    <div className="w-full flex flex-col space-y-2">
                        <div className="w-full flex flex-row items-center justify-between space-x-2">
                            <button 
                            type="button" onClick={handleStart}
                            disabled={!startAvaliable}
                            className={`w-1/2 h-10  rounded-xl
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
                                className={`w-1/2 h-10 rounded-xl
                                ${pauseAvaliable ? (
                                    ' bg-alter border-3 border-alter text-white text-xl hover:bg-white hover:text-alter')
                                :(
                                    'bg-shadow text-white border-shadow cursor-not-allowed'
                                )}`}>
                                    Pause
                                </button>
                            ): (
                                <button type="button" onClick={handleResume}
                                className="w-1/2 h-10 bg-primary border-3 border-primary rounded-xl text-white text-xl hover:bg-white hover:text-primary">
                                    Resume
                                </button>
                            )}
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button type="button" onClick={handleCancel}
                            disabled={!cancelAvaliable}
                            className={`w-full h-10 rounded-xl
                            ${cancelAvaliable ?(
                                ' bg-primary border-3 border-primary  text-white text-xl hover:bg-white hover:text-primary'
                            ):(
                                'bg-shadow text-white border-shadow cursor-not-allowed'
                            )}
                            `}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col py-6 space-y-2 justify-ceneter">
                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Start Time: </label>
                        {startTime ? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-dark font-semibold">{startTime}</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>

                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Estimated End Time: </label>
                        {estimatedEndTime ? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-dark font-semibold">{estimatedEndTime}</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>

                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Accutrally End Time: </label>
                        {actualEndTime ? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-dark font-semibold">{actualEndTime}</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>

                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Time left: </label>
                        {timeLeft ? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-alter font-semibold">{formatTime(timeLeft)}</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>

                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Duration: </label>
                        {durationInInfo ? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-primary font-semibold">{durationInInfo} mins</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>

                    <p className="w-full flex sm:flex-row sm:items-center flex-col justify-center">
                        <label className="w-2/5 text-base text-dark">Break Point: </label>
                        {breakPoint? (
                            <label  className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-base text-alter font-semibold">{breakPoint}</label>
                        ):(
                            <label className="sm:w-3/5 bg-white px-2 py-1 rounded-xl text-shadow text-base">/</label>
                        )}
                    </p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <button type="button" onClick={handleSave}
                    disabled={!saveAvaliable}
                    className={`w-full h-10 rounded-xl
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
    )
}

export default Timer;