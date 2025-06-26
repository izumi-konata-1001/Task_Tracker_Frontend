import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../../utils/api";

import TaskInformation from "./session_detail_components/TaskInfomation";
import SessionInformation from "./session_detail_components/SessionnInformation";
import EditSessionNote from "./session_detail_components/EditSessionNote";

import BackButton from "../../BackButton";
import RedirectAfter from "../../RedirectAfter";

function sessionDetail(){
    const { id } = useParams();
    const {token} = useAuth();
    
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
        <div class="w-full h-full px-40 flex flex-col space-y-5 py-10 juestify-center items-center">
            <div class="w-full flex justify-start">
                <BackButton path={from}/>
            </div>
            
            <div class="w-full flex flex-col justify-center items-center">
                <p class="text-3xl text-black font-semibold">Session Detail</p>
                <p class="text-base text-alter">{message}</p>
            </div>
            {validFetch ? (
                <>
                    <div class="w-full px-30 flex flex-col">
                        <div class="w-full flex flex-row justify-between">
                            <label class="text-base text-shadow">Task created at: </label>
                            <label class="text-base text-shadow">{task.created_at}</label>
                        </div>
                        <div class="w-full flex flex-row justify-between">
                            <label class="text-base text-shadow">Session created at:</label>
                            <label class="text-base text-shadow">{session.created_at}</label>
                        </div>
                    </div>
                    <div class="w-full">
                        <TaskInformation task={task}/>
                    </div>
                    <div class="w-full">
                        <SessionInformation session={session} />
                    </div>
                </>
            ):(<p class="text-shadow">No auth to view session detail</p>)}

            {validFetch ? (
            <>
                <div class="w-full px-30 flex justify-center items-center">
                    <button type="button" onClick={onShowEditSession}
                    class="w-full bg-primary rounded-xl px-2 py-1 text-white border-2 border-primary hover:bg-white hover:text-primary"
                    >
                        Edit Note
                    </button>
                </div>
                <div class="w-full px-30 flex justify-center items-center">
                    <button type="button" onClick={handleDelete}
                    class="w-full bg-alter rounded-xl px-2 py-1 text-white border-2 border-alter hover:bg-white hover:text-alter"
                    >
                        Delete
                    </button>
                </div>
            </>
            ):(<p class="text-shadow">No auth to edit session detail</p>)}


            {showEditSession && 
                <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditSessionNote sessionId={session.id} note={session.note} onCancelEditSession={onCancelEditSession} fetchSession={fetchSession}/>
                </div>
            }

            <RedirectAfter visible={showRedirect} delay={3000} path="/pomodoro/all_sessions" message="Redirecting..." />
        </div>
    )
}

export default sessionDetail;