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

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageInput, setPageInput] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(total / pageSize);

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
                    order:order,
                    page: page,
                    pageSize: pageSize
                })
            })

            const result = await response.json();
            if(response.ok){
                setTasks(result.tasks);
                setTotal(result.total);
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

useEffect(() => {
  fetchAllTasks();
}, [order, page]);
    return(
        <div className="w-full pb-5 md:px-20 px-10">
            <div className="w-full flex justify-center items-center pt-5">
                <h1 className="mb:text-2xl text-xl font-bold">All Tasks</h1>
            </div>
            <div className="w-full flex justify-center items-center pt-5 ">
                <CreateButton section={"task"}/>
            </div>
            <div className="w-full flex justify-center items-center pt-5 ">
                <OrderSortButton handleClick={handleClick} order={order} />
            </div>
            <div className="w-full pt-5  flex flex-col space-y-3">
                {tasks.length > 0 ? (
                tasks.map((task)=>(
                    <TaskCard key={task.id} task={task}/>
                ))
                ):(
                <div>{message}</div>)}
            </div>
            <div className="flex justify-center items-center space-x-2 py-4">
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
                    className="w-16 px-2 py-1 border-2 border-shadow bg-white rounded text-center focus:outline-none focus:ring-2 focus:ring-primary"
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

export default AllTasks;