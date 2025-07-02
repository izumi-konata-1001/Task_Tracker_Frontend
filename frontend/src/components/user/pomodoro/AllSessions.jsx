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
    
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / pageSize);

    const fetchAllSessions = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/all_by_user_id`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                key: orderKey,
                order: order,
                page: page,
                pageSize: pageSize,
                }),
            })
            const result = await response.json();
            if(response.ok){
                setSessions(result.sessions);
                setTotal(result.total);
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
            else if(response.status == 404){
                setMessage('No task with session found.');
                console.error('No task with session found, error:', result.error);
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
    },[token,order,orderKey,selectedTaskId,page]);
    

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
        <div className="w-full pb-5 md:px-20 px-10 space-y-5">
            <div className="w-full flex flex-col justify-center items-center">
                <p className="text-black text-3xl font-semibold">All sessions</p>
                <p className="text-alter text-base">{message}</p>
            </div>
            <div className="w-full space-y-1">
                <h3 className="sm:text-lg sm:font-bold text-base font-medium text-dark">View Sessions For:</h3>
                <TypeFilterButton handleType={handleType} selectedTaskId={selectedTaskId} tasks={tasks}/>
            </div>
            <div className="w-full space-y-1">
                <h3 className="sm:text-lg sm:font-bold text-base font-medium text-dark">Sort Sessions By:</h3>
                <OrderKeyFilterSelector handleKey={handleKey} orderKey={orderKey}/>
            </div>
            <div className="w-full">
                {orderKey == "create_time" ? (<OrderSortButton handleClick={handleOrder} order={order}/>):(null)}
                {orderKey == "duration" ? (<DurationSortButton handleClick={handleOrder} order={order} />) : (null)}
            </div>
            <div className="w-full">
                <SessionList sessions={sessions}/>
            </div>
            <div className=" w-full flex justify-center items-center space-x-2 py-4">
                <button
                    onClick={() => {
                    setPage((prev) => {
                        const newPage = Math.max(1, prev - 1);
                        setPageInput(newPage);
                        return newPage;
                    });
                    }}
                    disabled={page === 1}
                    className="px-3 py-1 text-white border-2 border-primary bg-primary rounded-xl 
                    hover:text-primary hover:bg-white
                    disabled:opacity-50 disabled:border-shadow disabled:text-shadow disabled:bg-white"
                >
                    Prev
                </button>

                <input
                    type="number"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        const num = Number(pageInput);
                        if (num >= 1 && num <= totalPages) {
                        setPage(num);
                        } else {
                        alert(`Please enter a number between 1 and ${totalPages}`);
                        }
                    }
                    }}
                    className="w-16 px-2 py-1 border-2 border-shadow bg-white rounded text-center"
                />

                <span className="text-sm">/ {totalPages}</span>

                <button
                    onClick={() => {
                    setPage((prev) => {
                        const newPage = prev * pageSize < total ? prev + 1 : prev;
                        setPageInput(newPage);
                        return newPage;
                    });
                    }}
                    disabled={page * pageSize >= total}
                    className="px-3 py-1 text-white border-2 border-primary bg-primary rounded-xl 
                    hover:text-primary hover:bg-white
                    disabled:opacity-50 disabled:border-shadow disabled:text-shadow disabled:bg-white"
                >
                    Next
                </button>
            </div>
            
        </div>
    )
}

export default AllSession;