import { useState,useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import BASE_URL from "../../../utils/api";

import TaskAnalysis from "./analysis_data_components/TaskAnalysis";
import IssueAnalysis from "./analysis_data_components/IssueAnalysis";
import SessionAnalysis from "./analysis_data_components/SessionAnalysis";

import TaskCompleteCountPieChart from "./chart_components/pie_chart/TaskCompleteCountPieChart";
import IssueCompleteCountPieChart from "./chart_components/pie_chart/IssueCompleteCountPieChart";
import SessionDurationPieChart from "./chart_components/pie_chart/SessionDurationPieChart";

import TaskCombinedBarLineChart from "./chart_components/bar_chart/TaskCombinedBarLineChart";
import SessionBarChart from "./chart_components/bar_chart/SessionBarChart";

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

    console.log("task:", task);
    console.log("issue:", issue);

    return(
        <div className="h-full w-full p-10 flex flex-col justify-center items-center space-y-5">
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="md:text-3xl md:font-semibold text-black text-xl font-bold ">User Data Analysis</h1>
                <p className="text-base text-alter">{message}</p>
            </div>

            <div className="w-full flex xl:flex-row gap-3 flex-col justify-center items-stretch">
                <div className="xl:w-1/3 w-full h-full">
                    <TaskAnalysis task={task}/>
                </div>
                <div className="xl:w-1/3 w-full h-full">
                    <IssueAnalysis issue={issue}/>
                </div>
                <div className="xl:w-1/3 w-full h-full">
                    <SessionAnalysis session={session}/>
                </div>
            </div>

            <div className="w-full flex xl:flex-row gap-3 flex-col justify-center items-stretch">
                <div className="xl:w-1/3 w-full h-full">
                {task.total > 0 ? (
                    <TaskCompleteCountPieChart task={task} />
                ):(
                    <div className="min-h-[230px] flex justify-center items-center bg-white rounded-xl text-black">
                        No tasks to build Chart.
                    </div>
                )}
                </div>
                <div className="xl:w-1/3 w-full h-full">
                {issue.total > 0 ? (
                    <IssueCompleteCountPieChart issue={issue} />
                ):(
                    <div className="min-h-[230px] flex justify-center items-center bg-white rounded-xl text-black">
                        No issue to build Chart.
                    </div>
                )}
                </div>
                <div className="xl:w-1/3 w-full h-full">
                {session.total > 0 ? (
                    <SessionDurationPieChart session={session} />
                ):(
                    <div className="min-h-[230px] flex justify-center items-center bg-white rounded-xl text-black">
                        No session to build Chart.
                    </div>     
                )}
                </div>
            </div>

            <div className="w-full flex flex-col gap-3 justify-center items-stretch">
                <div className="min-h-[230px] bg-white p-5 rounded-xl">
                    <TaskCombinedBarLineChart />
                </div>
                <div className="min-h-[230px] bg-white p-5 rounded-xl">
                    <SessionBarChart />
                </div>
            </div>
            
        </div>
    )
}

export default UserHome;