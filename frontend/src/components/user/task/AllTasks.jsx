import { useState,useEffect } from 'react';

import BASE_URL from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';

import TaskCard from './all_tasks_components/TaskCard';
import OrderSortButton from '../OrderSortButton';
import CreateButton from '../CreateButton';
function AllTasks(){
    const {token} = useAuth();

    const [message, setMessage] = useState("");
    const [tasks, setTasks] = useState([]);
    const [order,setOrder] = useState("DESC");

    const handleClick = ()=>{
        if(order == "ASC")
            setOrder("DESC");
        else
            setOrder("ASC");
    }

    const fetchAllTasks = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/task/all`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    order:order
                })
            })

            const result = await response.json();
            if(response.ok){
                setTasks(result.tasks);
                return;
            }else if(response.status === 404){
                setMessage("No more tasks.");
                return;
            }
            else{
                setMessage('No task found.');
                console.error('Fetch all tasks failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch all tasks failed, network or unexpected error.')
            console.error('Fetch all tasks failed, error:', error);
            return;
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            fetchAllTasks();
        }
        fetchData();
    },[order])
    return(
        <div class="w-full">
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Tasks</h1>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <CreateButton section={"task"}/>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <OrderSortButton handleClick={handleClick} order={order} />
            </div>
            <div class="w-full pt-5 px-20 flex flex-col space-y-3">
                {tasks.length > 0 ? (
                tasks.map((task)=>(
                    <TaskCard key={task.id} task={task}/>
                ))
                ):(
                <div>{message}</div>)}
            </div>
        </div>
    )
}

export default AllTasks;