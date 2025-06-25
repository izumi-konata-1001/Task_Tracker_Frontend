import { useState,useEffect } from "react";
import BASE_URL from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

import SessionList from "./all_session_components/SessionList";
import OrderSortButton from "../OrderSortButton";
import DurationSortButton from "./all_session_components/DurationSortButton";
import TypeFilterButton from "./all_session_components/TypeFilterSelector";
import OrderKeyFilterSelector from "./all_session_components/OrderKeyFilterSelector";

function AllSession(){
    const {token} = useAuth();

    const [message,setMessage] = useState("");

    const [tasks, setTasks] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [order,setOrder] = useState("DESC");
    const [orderKey,setOrderKey] = useState("create_time");
    
    const fetchAllSessions = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/all_by_user_id`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    key:orderKey,
                    order:order,
                }),
            })
            const result = await response.json();
            if(response.ok){
                setSessions(result.sessions);
                console.log(`Fetch all sessions with ${order} in ${order} successfully.`);
                return;
            }
            else{
                setMessage('Fetch all sessions failed.');
                console.error(`Fetch all sessions with ${orderKey} in ${order} failed, error:`,result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch all sessions failed, network or unexpected error.')
            console.error('Fetch all sessions failed, error:', error);
            return;
        }
    }

    const fetchTaskSessions = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/all_by_task_id`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId:selectedTaskId,
                    order:order,
                    key:orderKey,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setSessions(result.sessions);
                console.log(`Fetch sessions belong to task: ${selectedTaskId} with ${orderKey} in ${order} successfully.`);
                return;
            }
            else{
                setMessage('Fetch sessions belong to task failed.');
                console.error(`Fetch sessions belong to task:${selectedTaskId} with ${orderKey} in ${order} failed, error:`,result.error);
            }
        }catch(error){
            setMessage('Fetch sessions belong to task failed, network or unexpected error.')
            console.error(`Fetch all sessions belong to task:${selectedTaskId} failed, error:`, error);
            return;
        }
    }


    const fetchTaskHasSession = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/user_tasks_has_session`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const result = await response.json();
            if(response.ok){
                setTasks(result.tasks);
                console.log('Fetch current users task has session successfully.');
                return;
            }
            else{
                setMessage('Fetch task has session failed');
                console.error('Fetch task has session failed,error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch task has session failed, network or unexpected error.')
            console.error(`Fetch task has session failed, error:`, error);
            return;
        }
    }

    const fetchData = async ()=>{
        if(selectedTaskId == "")
            await fetchAllSessions();
        else
            await fetchTaskSessions();
        
        await fetchTaskHasSession();
    }

    useEffect(()=>{
        fetchData();
    },[token,order,orderKey,selectedTaskId]);
    

    const handleOrder = ()=>{
        if(order == "ASC")
            setOrder("DESC");
        else
            setOrder("ASC");
    }

    const handleKey = (key) => {
        setOrderKey(key);
    };

    const handleType = (key)=>{
        if(key != null)
            setSelectedTaskId(key);
    }

    return(
        <div class="w-full pt-5 pb-10 px-40 flex flex-col">
            <div class="w-full flex flex-col justify-center items-center">
                <p class="text-black text-3xl font-semibold">All sessions</p>
                <p class="text-alter text-base">{message}</p>
            </div>
            <div class="w-full pt-5">
                <TypeFilterButton handleType={handleType} selectedTaskId={selectedTaskId} tasks={tasks}/>
            </div>
            <div class="w-full pt-5">
                <OrderKeyFilterSelector handleKey={handleKey} orderKey={orderKey}/>
            </div>
            <div class="w-full pt-5">
                {orderKey == "create_time" ? (<OrderSortButton handleClick={handleOrder} order={order}/>):(null)}
                {orderKey == "duration" ? (<DurationSortButton handleClick={handleOrder} order={order} />) : (null)}
            </div>
            <div class="w-full pt-5">
                <SessionList sessions={sessions}/>
            </div>
            
        </div>
    )
}

export default AllSession;