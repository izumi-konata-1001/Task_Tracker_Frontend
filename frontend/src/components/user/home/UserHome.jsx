import { useState,useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import BASE_URL from "../../../utils/api";

import TaskAnalysis from "./analysis_data_components/TaskAnalysis";
import IssueAnalysis from "./analysis_data_components/IssueAnalysis";
import SessionAnalysis from "./analysis_data_components/SessionAnalysis";

import AnalysisChart from "./chart_components/AnalysisChart";

function UserHome(){
    const {token} = useAuth();
    
    const [message, setMessage] = useState("");

    const [task, setTask] = useState({});
    const [issue,setIssue] = useState({});
    const [session,setSession] = useState({});

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
                setTask(result.task);
                setIssue(result.issue);
                setSession(result.session);
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
                <TaskAnalysis task={task}/>
                <div class="w-full flex flex-row space-x-3 ">
                    <IssueAnalysis issue={issue}/>
                    <SessionAnalysis session={session}/>
                </div>
            </div>
            <div class="w-full pt-3 pb-10">
                <div class="w-full ">
                    <AnalysisChart issue={issue} task={task} session={session}/>
                </div>
            </div>
            
        </div>
    )
}

export default UserHome;