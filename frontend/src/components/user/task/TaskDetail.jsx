import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../utils/api";
import { useNavigate,useLocation } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import RedirectAfter from "../../RedirectAfter";
import BackButton from "../../BackButton";
import TaskInformation from "./task_detail_components/TaskInfomation";
import EditTaskForm from "./task_detail_components/EditTaskForm";
import SessionList from "./task_detail_components/SessionList";

function TaskDetail(){
    const {token} = useAuth();
    const { id } = useParams();
    
    const location = useLocation();
    const from = location.state?.from;
    console.log(from);

    const [showRedirect, setShowRedirect] = useState(false);
    const [message,setMessage] = useState("");
    const [sessionMessage, setSessionMessage] = useState("");
    const [validFetch, setValidFetch] = useState(true);

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
                setValidFetch(true);
                return;
            }else if(response.status == 403){
                setMessage('No authorization.')
                console.error('Fetch task detail failed, error:', result.error);
                setValidFetch(false);
                return;
            }
            else{
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
        <div className="w-full pt-10 pb-5 md:px-20 px-10 space-y-5">
            <div className="w-full flex justify-start">
                <BackButton path={from}/>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="w-full text-center text-base text-alter">{message}</div>
            </div>

            {validFetch ? (
                <div className="w-full">
                    <TaskInformation task={task} issue={issue} fetchTaskDetail={fetchTaskDetail}/>
                </div>
            ):(<p className="text-shadow text-base">No auth to view task detail</p>)}

            {validFetch ? (
                <div className="w-full">
                    <SessionList sessions={sessions} sessionMessage={sessionMessage} setSessionMessage={setSessionMessage} fetchTaskDetail={fetchTaskDetail}/>
                </div>
            ):(<p className="text-shadow text-base">No auth to view session list</p>)}

            {validFetch ? (
            <div className="w-full flex flex-col space-y-3 justify-center items-center text-center">
                <button onClick={onShow} type="button"
                className="cursor-pointer w-full bg-primary text-white border-2 border-primary  px-2 py-1 rounded-xl hover:bg-light hover:text-primary transition-colors duration-300">
                    Edit Task
                </button>
                <button onClick={handleDelete} type="button"
                className="cursor-pointer w-full bg-alter text-white border-2 border-alter  px-2 py-1 rounded-xl hover:bg-light hover:text-alter transition-colors duration-300">
                    Delete Task
                </button>
            </div>
            ):(null)}

            {showEditTask && validFetch ?(
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditTaskForm task={task} onCancel={onCancel} fetchTaskDetail={fetchTaskDetail}/>
                </div>):(null)
            }
            <RedirectAfter visible={showRedirect} delay={3000} path="/task" message="Redirecting..." />
        </div>
    )
}

export default TaskDetail;