import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../utils/api";

import { useAuth } from "../../../context/AuthContext";

import RedirectAfter from "../../RedirectAfter";
import BackButton from "../../BackButton";
import TaskInformation from "./task_detail_components/TaskInfomation";
import EditTaskForm from "./task_detail_components/EditTaskForm";
import SessionCard from "./task_detail_components/SessionCard";

function TaskDetail(){
    const {token} = useAuth();
    const { id } = useParams();

    const [showRedirect, setShowRedirect] = useState(false);
    const [message,setMessage] = useState("");
    const [sessionMessage, setSessionMessage] = useState("");

    const [task,setTask] = useState("");
    const [issue,setIssue] = useState("")
    const [sessions, setSessions] = useState([]);
    const [showEditTask, setShowEditTask] = useState(false);

    const fetchTaskDetail = async ()=>{
        setMessage("")
        if(!id){
            setMessage("Task not found. Invalid task id.");
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/task/detail`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId:id,
                }),
            })

            const result = await response.json();
            if(response.ok){
                setIssue(result.issue);
                setTask(result.task);
                setSessions(result.sessions);
                console.log('Fetch task detial and issue successfully');
                return;
            }else{
                setMessage('Fetch task detail failed.');
                console.error('Fetch task detail failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch task detail failed, network or unexpected error.')
            console.error('Fetch task detail failed, error:', error);
            return;
        }
    }

    const handleDelete = async (e)=>{
        e.preventDefault();
        setMessage("")
        try{
            const response = await fetch(`${BASE_URL}/task/delete`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId:id,
                }),
            })

            const result = await response.json();
            if(response.ok){
                setMessage('Delete task successfully.');
                console.log('Delete task successfully.');
                setShowRedirect(true);
                return;
            }else{
                setMessage('Delete task failed.');
                console.error('Delete task failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete task failed, network or unexpected error.')
            console.error('Delete task failed, error:', error);
            return;  
        }
    }

    const onShow = () =>{
        setShowEditTask(true);
    }

    const onCancel = async () => {
        setShowEditTask(false);
        await fetchTaskDetail();
    };

    useEffect(()=>{
        const fetchData = async()=>{
            await fetchTaskDetail();
        }
        fetchData();
    },[]);

    return(
        <div class="w-full pb-10 pt-10 flex flex-col items-center justify-center">
            <div class="w-full px-30">
                <BackButton path={"/task"} />
            </div>
            <div class="w-full px-30 flex justify-center items-center">
                <div class="w-full text-center text-alter">{message}</div>
            </div>
            <div class="w-full pt-5">
                <TaskInformation task={task} issue={issue} fetchTaskDetail={fetchTaskDetail}/>
            </div>
            <div class="w-full px-30 pt-5 flex flex-row">
                <div class="w-1/5">
                    <p class="text-alter text-base">{sessionMessage}</p>
                    <p class="text-black text-base">Sessions: </p>
                </div>
                <div class="w-4/5 flex flex-col space-y-2">
                    {sessions.length > 0? (
                        sessions.map((session)=>{
                            return <SessionCard session={session} fetchTaskDetail={fetchTaskDetail} setSessionMessage={setSessionMessage}/>
                        })
                    ):(
                        <p class="text-shadow text-base">No session yet</p>
                    )}
                </div>
            </div>

            <div class="w-full pt-5 px-30 flex flex-col space-y-3 justify-center items-center text-center">
                <button onClick={onShow} type="button"
                class="cursor: pointer w-full bg-primary text-white border-2 border-primary  px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">
                    Edit Task
                </button>
                <button onClick={handleDelete} type="button"
                class="cursor: pointer w-full bg-alter text-white border-2 border-alter  px-2 py-1 rounded-md hover:bg-light hover:text-black transition-colors duration-300">
                    Delete Task
                </button>
            </div>

            {showEditTask &&
                <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditTaskForm task={task} onCancel={onCancel}/>
                </div>
            }
            <RedirectAfter visible={showRedirect} delay={3000} path="/task" message="Redirecting..." />
        </div>
    )
}

export default TaskDetail;