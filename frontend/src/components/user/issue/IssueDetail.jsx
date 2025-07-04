import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

import BackButton from "../../BackButton";
import RedirectAfter from "../../RedirectAfter";

import IssueInformation from "./issue_detail_components/IssueInformation";
import TaskList from "./issue_detail_components/TaskList";
import AddTaskSelector from "./issue_detail_components/AddTaskSelector";
import EditIssueForm from "./issue_detail_components/EditIssueForm";
import EditTaskOrder from "./issue_detail_components/EditTaskOrder";

function IssueDetail(){
    const {token} = useAuth();
    const { id } = useParams();

    const location = useLocation();
    const from = location.state?.from;

    const [message, setMessage] = useState("");
    const [taskMessage, setTaskMessage] = useState("");
    const [addTaskMessage, setAddTaskMessage] = useState("");
    const [validFetch, setValidFetch] = useState(true);

    const [tasksBelongToIssue, setTasksBelongToIssue] = useState([]);
    const [availableTasks, setAvailableTasks] = useState([]);
    const [issue, setIssue] = useState({});
    const [selectedTaskId, setSelectedTaskId] = useState("");

    const [showRedirect, setShowRedirect] = useState(false);
    const [showEditIssue, setShowEditIssue] = useState(false);
    const [showEditOrder, setShowEditOrder] = useState(false);


    const fetchIssueDetail = async () =>{
        setMessage("")
        setAddTaskMessage("");
        setTaskMessage("");
        try{
            const response = await fetch(`${BASE_URL}/issue/detail`,{
                method:'POST',
                headers:{
                    'Content-Type' :'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:id,
                }),
            });

            const result = await response.json();
            if(response.ok){
                setIssue(result.issue);
                setTasksBelongToIssue(result.tasks);
                console.log('Fetch issue detail successfully.');
                return;
            }else if(response.status == 403)
            {
                setValidFetch(false);
                setMessage('No authorization.')
                console.error('Fetch issue detail failed, error:', result.error);
                return;
            }
            else{
                setMessage('Fetch issue detail failed.');
                console.error('Fetch issue detail failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Fetch issue detail failed, network or unexpected error.')
            console.error('Fetch issue detail failed, error:', error);
            return;
        }
    }

    const fetchAvaliableTasks = async ()=>{
        setAddTaskMessage("");
        setTaskMessage("");
        try{
            const response = await fetch(`${BASE_URL}/task/avaliable`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                }
            });
            const result = await response.json();
            if(response.ok){
                setAvailableTasks(result.tasks);
                console.log('Fetch avaliable tasks successfully.');
                return;
            }else if(response.status == 404){
                console.log('No more avaliable tasks, error:', result.error);
                return;
            }
            else{
                setTaskMessage('Fetch avaliable tasks failed in database.');
                console.error('Fetch avaliable tasks failed, error:', result.error);
                return;
            }

        }catch(error){
            setTaskMessage('Fetch avaliable tasks failed, network or unexpected error.')
            console.error('Fetch avaliable tasks failed, error:', error);
            return;
        }
    }

    useEffect(()=>{
        const fetchData = async()=>{
            await fetchIssueDetail();
            await fetchAvaliableTasks();
        }

        fetchData();
    },[]);

    const handleSelect = (e) =>{
        const id = e.target.value;
        setSelectedTaskId(id)
    }

const handleAdd = async () => {
    setMessage("");
    setAddTaskMessage("");
    setTaskMessage("");

    if (tasksBelongToIssue.length >= 5) {
        setAddTaskMessage("You can only add up to 5 tasks for this issue.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/task/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                taskId: selectedTaskId,
                issueId: id,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setSelectedTaskId("");
            setAvailableTasks([]);
            console.log('Add task into issue successfully.');
            await fetchIssueDetail();
            await fetchAvaliableTasks();
            return;
        } else {
            setAddTaskMessage('Add task into issue failed in database.');
            console.error('Add task into issue failed, error:', result.error);
            return;
        }
    } catch (error) {
        setAddTaskMessage('Add task into issue failed, network or unexpected error.');
        console.error('Add task into issue failed, error:', error);
        return;
    }
};

    const handleRemove = async (e)=>{
        e.preventDefault();
        setMessage("");
        setAddTaskMessage("");
        setTaskMessage("");
        const removeTaskId = e.target.value;
        try{
            const response = await fetch(`${BASE_URL}/task/remove`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,

                },
                body:JSON.stringify({
                    issueId:id,
                    taskId:removeTaskId,
                }),
            });

            const result = await response.json();
            if(response.ok){
                await fetchIssueDetail(); 
                await fetchAvaliableTasks();
            }else{
                setTaskMessage('Remove task from issue failed in databse.');
                console.error('Remove task from issue failed, error:', result.error);
            }
        }catch(error){
            setTaskMessage('Remove task from issue failed, network or unexpected error.')
            console.error('Remove task from issue failed, error:', error);
            return;
        }
    }

    const handleDelete = async (e)=>{
        e.preventDefault();
        setMessage("");
        try{
            const response = await fetch(`${BASE_URL}/issue/delete`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:id,
                }),
            })

            const result = await response.json();
            if(response.ok){
                setMessage('Delete issue successfully.');
                console.log('Dlelete issue successfully.');
                setShowRedirect(true);
                return;
            }else{
                setMessage('Delete issue failed.');
                console.error('Delete issue failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete issue failed, network or unexpected error.')
            console.error('Delete issue failed, error:', error);
            return;
        }
    }

    const onShowEditIssue = () =>{
        setShowEditIssue(true);
    }

    const onCancelEditIssue = () =>{
        setShowEditIssue(false);
    }

    const onShowEditOrder = () =>{
        setShowEditOrder(true);
    }

    const onCancelEditOrder = () =>{
        setShowEditOrder(false);
    }

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
                    <IssueInformation issue={issue}/>
                </div>
            ):(<p className="text-shadow text-base">No auth to view issue detail.</p>)}

            {validFetch ? (
            <div className="w-full">
                <p className="w-full text-left text-alter">{taskMessage}</p>
                <TaskList tasksBelongToIssue={tasksBelongToIssue} handleRemove={handleRemove}/>
            </div>
            ):(<p className="text-shadow text-base">No auth to view  task list detail.</p>)}

            {validFetch ? (
                <div className="w-full flex flex-col space-y-2">
                    <div className="w-full">
                        <p className="w-full text-left text-alter">{addTaskMessage}</p>
                        <AddTaskSelector availableTasks={availableTasks} selectedTaskId={selectedTaskId} handleSelect={handleSelect} handleAdd={handleAdd} tasksBelongToIssue={tasksBelongToIssue}/>
                    </div>
                    <hr className="my-5 border-t-2 border-shadow" />
                    <div className="w-full flex justify-center items-center text-center">
                        <button onClick={onShowEditOrder}
                        className="cursor-pointer w-full bg-dark text-white border-2 border-dark  px-2 py-1 rounded-md hover:bg-light hover:text-dark transition-colors duration-300">
                            Change Order
                        </button>
                    </div>

                    <div className="w-full flex justify-center items-center text-center">
                        <button onClick={onShowEditIssue}
                        className="cursor-pointer w-full bg-primary text-white border-2 border-primary  px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">
                            Edit Issue
                        </button>
                    </div>

                    <div className="w-full flex justify-center items-center text-center">
                        <button onClick={handleDelete}
                        className="cursor-pointer w-full bg-alter text-white border-2 border-alter  px-2 py-1 rounded-md hover:bg-light hover:text-alter transition-colors duration-300">
                            Delete Issue
                        </button>
                    </div>
                </div>
            ):(<p className="text-shadow text-base">No auth to edit issue.</p>)}

            {showEditIssue && 
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditIssueForm issue={issue} onCancelEditIssue={onCancelEditIssue} fetchIssueDetail={fetchIssueDetail}/>
                </div>
            }

            {showEditOrder && 
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditTaskOrder fetchIssueDetail={fetchIssueDetail} tasksBelongToIssue={tasksBelongToIssue} issueId={issue.id} onCancelEditOrder={onCancelEditOrder}/>
                </div>
            }

            <RedirectAfter visible={showRedirect} delay={3000} path="/issue" message="Redirecting..." />
        </div>
    )
}

export default IssueDetail;