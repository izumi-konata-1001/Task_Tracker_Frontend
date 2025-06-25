import { useState,useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import BASE_URL from "../../utils/api";
function UserHome(){
    const {token} = useAuth();
    
    const [message, setMessage] = useState("");
    const [issueNumber, setIssueNumber] = useState(0);
    const [taskNumber, setTaskNumber] = useState(0);
    const [completedTaskNumber, setCompletedTaskNumber] = useState(0);
    const [incompletedTaskNumber, setIncompletedTaskNumber] = useState(0);
    const [sessionNumber,setSessionNumber] = useState(0);
    const [taskCountWithSessions, setTaskCountWithSessions] = useState(0);
    const [fullyCompletedIssueNumber,setFullyCompletedIssueNumber] = useState(0);
    const [durationFiveNumber,setDurationFiveNumber] = useState(0);
    const [durationFifteenFiveNumber, setDurationFifteenFiveNumber] = useState(0);
    const [durationTwentyFiveNumber, setDurationTwentyFiveNumber] = useState(0);
    const [durationFiftyNumber, setDurationFiftyNumber] = useState(0);
    const [otherDurationNumber, setOtherDurationNumber] = useState(0);

    
    const fetchUserAnalysis = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/user/analysis`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if(response.ok){
                setIssueNumber(result.issueNumber);
                setTaskNumber(result.taskNumber);
                setCompletedTaskNumber(result.completedTaskNumber);
                setIncompletedTaskNumber(result.incompletedTaskNumber);
                setSessionNumber(result.sessionNumber);
                setTaskCountWithSessions(result.taskCountWithSessions);
                setFullyCompletedIssueNumber(result.fullyCompletedIssueNumber);
                setDurationFiveNumber(result.durationFiveNumber);
                setDurationFifteenFiveNumber(result.durationFifteenFiveNumber);
                setDurationTwentyFiveNumber(result.durationTwentyFiveNumber);
                setDurationFiftyNumber(result.durationFiftyNumber);
                setOtherDurationNumber(result.otherDurationNumber);
                console.log('Fetch user analysis data successfully.');
                return;
            }else{
                setMessage('Fetch user anaylsis data failed.');
                console.error('Fetch user anaylsis data failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete issue failed, network or unexpected error.')
            console.error('Fetch user anaylsis data failed, error:', error);
            return;
        }
    }

    const fetchData = async ()=>{
        await fetchUserAnalysis();
    }

    useEffect(()=>{
        fetchData();
    },[token]);

    return(
        <div class="w-full px-30 flex flex-col justify-center items-center">
            <div class="w-full flex flex-col pt-10 justify-center items-center">
                <h1 class="text-3xl font-semibold text-black">User Data Analysis</h1>
                <p class="text-base text-alter">{message}</p>
            </div>

            <div class="w-full pt-5 flex flex-col justify-center items-center space-y-3">
                <div class="w-full flex flex-col justify-center items-center bg-white px-5 py-5 border-2 border-dark rounded-xl">
                    <h3 class="text-xl text-primary">Task Anaylysis</h3>
                    <div class="w-full flex flex-row">
                        <div class="w-1/2">
                            <div class="w-full flex flex-row justify-statr items-center">
                                <label>Total Tasks Number:</label>
                                <label>{taskNumber}</label>
                            </div>
                            <div class="w-full flex flex-row justify-start items-center">
                                <label>Task has Session Number: </label>
                                <label>{taskCountWithSessions}</label>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div class="w-full flex flex-row justify-start items-center">
                                <label>Completed Tasks Number:</label>
                                <label>{completedTaskNumber}</label>
                            </div>
                            <div class="w-full flex flex-row justify-start items-center">
                                <label>Incompleted Tasks Number:</label>
                                <label>{incompletedTaskNumber}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-row space-x-3 ">
                    <div class="w-1/2 flex flex-col justify-center items-center bg-white px-5 py-5 border-2 border-dark rounded-xl">
                        <div class="w-full flex flex-col">
                            <div class="w-full flex justify-center">
                                <p class="text-xl text-primary">Issue Analysis</p>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <label>Issue Number:</label>
                                <label>{issueNumber}</label>
                            </div>
                            <div class="w-full flex flex-row justify-start">
                                <label>All tasks finished Issues Number:</label>
                                <label>{fullyCompletedIssueNumber}</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 felx flex-col justify-center items-center bg-white px-5 py-5 border-2 border-dark rounded-xl">
                        <div class="w-full flex flex-col">
                            <div class="w-full flex justify-center">
                                <p class="text-xl text-primary">Session Analysis</p>
                            </div>
                            <div class="w-full flex flex-row">
                                <div class="w-1/2">
                                    <div class="w-full flex flex-row justify-start">
                                        <label>Session Number:</label>
                                        <label>{sessionNumber}</label>
                                    </div>
                                    <div class="w-full flex flex-row justify-start">
                                        <label>5 mins Sessions:</label>
                                        <label>{durationFiveNumber}</label>
                                    </div>
                                    <div class="w-full flex flex-row justify-start">
                                        <label>15 mins Sessions:</label>
                                        <label>{durationFifteenFiveNumber}</label>
                                    </div>
                                </div>
                                <div class="w-1/2">
                                    <div class="w-full flex flex-row justify-start">
                                        <label>25 mins Sessions:</label>
                                        <label>{durationTwentyFiveNumber}</label>
                                    </div>
                                    <div class="w-full flex flex-row justify-start">
                                        <label>50 mins Sessions:</label>
                                        <label>{durationFiftyNumber}</label>
                                    </div>
                                        <div class="w-full flex flex-row justify-start">
                                        <label>Other duration Sessions:</label>
                                        <label>{otherDurationNumber}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserHome;