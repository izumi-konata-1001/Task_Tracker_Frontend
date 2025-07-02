import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";
import BASE_URL from "../../../utils/api";

import TaskInformation from "./session_detail_components/TaskInfomation";
import SessionInformation from "./session_detail_components/SessionnInformation";
import EditSessionNote from "./session_detail_components/EditSessionNote";

import BackButton from "../../BackButton";
import RedirectAfter from "../../RedirectAfter";

function sessionDetail(){
    const { id } = useParams();
    const {token} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;

    const [message, setMessage] = useState("");
    const [showRedirect, setShowRedirect] = useState(false);
    const [showEditSession, setShowEditSession] = useState(false);
    const [validFetch, setValidFetch] = useState(true);

    const [session, setSession] = useState({});
    const [task, setTask] = useState({});

    const fetchSession = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/detail`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    sessionId:id,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setSession(result.session);
                setTask(result.task);
                console.log('Fetch session info successfully.');
                return;
            }else if(response.status == 403){
                setMessage('No authorization.')
                console.error('Fetch session detail failed, error:', result.error);
                setValidFetch(false);
                return;
            }
            else{
                setMessage('Fetch session data failed.');
                console.error('Fetch session and its task failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch session info failed, network or unexpected error.')
            console.error('Fetch session and its task info failed, error:', error);
            return;
        }
    }
    const fetchData = async ()=>{
        await fetchSession();
    }
    useEffect(()=>{
        fetchData();
    }, [token]);

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    const handleTask = (taskId)=>{
        navigate(`/task/detail/${taskId}`, {state: { from: location.pathname }})
    }
    const handleDelete =async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/delete`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    sessionId:session.id,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setMessage('Delete session from database successfully.')
                console.log('Delete session from database successfully.')
                setShowRedirect(true);
                return;
            }
            else{
                setMessage('Delete session failed.');
                console.error('Delete session failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete session failed, network or unexpected error.')
            console.error('Delete session failed, error:', error);
            return;
        }
    }
    const onShowEditSession= () =>{
        setShowEditSession(true);
    }

    const onCancelEditSession = () =>{
        setShowEditSession(false);
    }
    return(
        <div className="w-full pt-5 pb-10 md:px-20 px-10">
            <div className="w-full flex justify-start pb-5">
                <BackButton path={from}/>
            </div>

            <div className="w-full flex justify-center items-center">
                <div className="w-full text-center text-base text-alter">{message}</div>
            </div>
            
            {validFetch ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full text-center">
                        <h2 className="text-2xl font-semibold text-primary break-words">Session Detail</h2>
                        <p className="text-shadow text-sm md:text-base">Session created at: {formatDate(session.created_at)}</p>
                    </div>
                    <div className="w-full">
                        <TaskInformation task={task} handleTask={handleTask}/>
                    </div>
                    <div className="w-full">
                        <SessionInformation session={session} onShowEditSession={onShowEditSession} handleDelete={handleDelete}/>
                    </div>
                </div>
            ):(<p className="text-shadow">No auth to view session detail</p>)}


            {showEditSession && 
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditSessionNote sessionId={session.id} note={session.note} onCancelEditSession={onCancelEditSession} fetchSession={fetchSession}/>
                </div>
            }

            <RedirectAfter visible={showRedirect} delay={3000} path="/pomodoro/all_sessions" message="Redirecting..." />
        </div>
    )
}

export default sessionDetail;