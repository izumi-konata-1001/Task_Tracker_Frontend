import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import BASE_URL from '../../../utils/api';
import { useAuth } from "../../../context/AuthContext";

import CreateIssueForm from "./create_issue_components/CreateIssueForm";
import AddTaskSelector from "./create_issue_components/AddTaskSelector";
import SelectedTaskList from "./create_issue_components/SelectedTaskList";
import SubmitButton from "./create_issue_components/SubmitButton";
import BackButton from "../../BackButton";

function CreateIssue(){
    const {token} = useAuth();
    const MAX_TASKS = 5;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from; 

    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("");

    const [alreadySelectedTasks, setAlreadySelectedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState({});
    const [availableTasks, setAvailableTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("");


    const handleSelect = (e) =>{
        const taskId = e.target.value;
        setSelectedTaskId(taskId);
        for(let i = 0; i < availableTasks.length; i++){
            if(availableTasks[i].id == taskId)
                setSelectedTask(availableTasks[i]);
        }
    }

const handleAdd = () => {
    if (alreadySelectedTasks.length >= MAX_TASKS) {
        setMessage("You can add up to 5 tasks only.");
        return;
    }

    if (
        selectedTask &&
        selectedTask.id &&
        !alreadySelectedTasks.some(task => task.id === selectedTask.id)
    ) {
        setAlreadySelectedTasks(prev => [...prev, selectedTask]);
        setAvailableTasks(prev => prev.filter(task => task.id !== selectedTask.id));
        setSelectedTaskId("");
        setSelectedTask({});
        setMessage(""); // 清除提示
    }
};

    const handleDelete =(taskIdToRemove)=>{
        const taskToRestore = alreadySelectedTasks.find(task => task.id === taskIdToRemove);
        setAlreadySelectedTasks(prev =>
            prev.filter(task => task.id !== taskIdToRemove)
        );
        if (taskToRestore){
            setAvailableTasks(prev => [...prev, taskToRestore]);
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "title")
            setTitle(value);
        else if(name =="description")
            setDescription(value);
    }

    const handleSubmit = async ()=>{
        if(!title || !description){
            setMessage("Title or description cannot be null.");
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/issue/create`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    title:title,
                    description: description,
                    newAddTasks:alreadySelectedTasks,
                })
            });
            const result = await response.json();
            if(response.ok){
                setMessage('Create new issue successfully.');
                console.log('Create issue successfully.');
                navigate('/issue')
                return;
            }else{
                console.error('Create issue failed,error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Create issue failed.');
            console.error('Create issue failed, network or unexpected error, error:',error);
            return;
        }
    }

    const fetchAvaliableTasks = async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/task/avaliable`,{
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            })

            const result = await response.json();
            if(response.ok){
                setAvailableTasks(result.tasks);
                console.log('Fetch avaliable tasks successfully');
                return;
            }else if(response.status == 404){
                setMessage('No avaliable task.');
                return;
            }
            else{
                setMessage('No task found.');
                console.error('Fetch avaliable tasks failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch avaliable task failed.');
            console.error('Fetch avaliable task failed, network or unexpected error, error:',error);
            return;
        }
    }    

    useEffect(()=>{
        const fetchData = async()=>{
            await fetchAvaliableTasks();
        }
        fetchData();
    },[]);



    return(
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-full px-40">
                <BackButton path={from} />
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Create New Issue</h1>
            </div>
            <div class="w-full pt-5">
                <div class="w-full pb-5">
                    <CreateIssueForm title={title} description={description} handleChange={handleChange}/>
                </div>
                <div class='w-full pb-2'>
                    <SelectedTaskList alreadySelectedTasks={alreadySelectedTasks} handleDelete={handleDelete}/>
                </div>
                <div class="w-full pb-3">
                    <AddTaskSelector availableTasks={availableTasks} selectedTaskId={selectedTaskId} handleSelect={handleSelect} handleAdd={handleAdd} alreadySelectedTasks={alreadySelectedTasks}/>
                </div>

                <div class="w-full">
                    <div class="w-full px-40 text-shadow">{message}</div>
                    <div class="w-full"><SubmitButton handleSubmit={handleSubmit} /></div>
                </div>
                
            </div>
        </div>
    )
}

export default CreateIssue;