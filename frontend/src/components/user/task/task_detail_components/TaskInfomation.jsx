import { RiDeleteBin5Line } from "react-icons/ri";

import BASE_URL from "../../../../utils/api";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
function TaskInformation(props){
    const {token} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const taskId = props.task.id;
    const title = props.task.title;
    const description = props.task.description;
    const createdTime = props.task.created_at;
    const updatedTime = props.task.updated_at;
    const completeStatus = props.task.completed;
    const issue = props.issue;

    const [message,setMessage] = useState("");

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
    function truncateText(text, maxLength, suffix = '...') {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + suffix : text;
    }

    const handleIssue = (issueId)=>{
        navigate(`/issue/detail/${issueId}`,{state: { from: location.pathname }})
    }

    const handleRemove = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/task/remove`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:issue.id,
                    taskId:taskId,
                }),
            });

            const result = await response.json();
            if(response.ok){
                setMessage('Remove task from issue successfully.');
                if (props.fetchTaskDetail) 
                    props.fetchTaskDetail(); 
                
            }else{
                setMessage('Remove task from issue failed in databse.');
                console.error('Remove task from issue failed, error:', result.error);
            }
        }catch(error){
            setMessage('Remove task from issue failed, network or unexpected error.')
            console.error('Remove task from issue failed, error:', error);
            return;
        }
    }
    return(
        <div className="w-full flex flex-col justify-center items-center space-y-3">
            <div className="w-full text-center">
                <h2 className="text-2xl font-semibold text-primary break-words">{title}</h2>
                <p className="text-sm md:text-base">Created: {formatDate(createdTime)}</p>
                <p className="text-sm md:text-base text-shadow">Updated: {formatDate(updatedTime)}</p>
            </div>

            <div className="w-full text-left text-black space-y-2">
                <div className="w-full flex flex-col space-y-1">
                    <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">
                        Status:
                    </p>
                    <div className="w-full px-3 py-2 bg-white rounded-md ">
                        <p className={`w-full font-bold text-base break-words whitespace-pre-wrap ${completeStatus ? 'text-green' : 'text-alter'}`}>
                            {completeStatus === 1 ? "Done" : "Unfinished"}
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col space-y-1">
                    <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">Descriprtion:</p>
                    <div className="w-full px-3 py-2 bg-white  rounded-md ">
                        <p className="w-full text-base break-words whitespace-pre-wrap">{description}</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex-col">
                <div className="w-full flex justify-center items-center">
                    <label className="text-base text-alter">{message}</label>
                </div>

                <div className="w-full flex flex-col space-y-1">
                    <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">
                        Link to Issue:
                    </p>
                    {issue ? (
                        <div className="w-full flex flex-row">
                            <div onClick={()=>handleIssue(issue.id)}
                            className="w-9/10 cursor-pointer bg-white border-2 border-dark rounded-lg p-3 shadow-sm flex flex-col items-start hover:border-3 hover:border-primary transition-colors duration-300">
                                <h2 className="text-base font-bold text-dark break-words whitespace-pre-wrap"><label className="text-black text-lg">Issue Title: </label>{truncateText(issue.title, 15)}</h2>
                                <p className="text-sm text-shadow">Created: {formatDate(issue.created_at)}</p>
                                <p className="text-sm text-shadow">Description : {truncateText(issue.description, 20)}</p>
                            </div>
                            <div className="w-1/10 pl-2 flex items-stretch">
                                <button
                                    onClick={handleRemove}
                                    type="button"
                                    className="cursor-pointer w-full h-full cursor rounded-xl bg-alter text-white border-2 border-alter
                                        hover:bg-white hover:text-alter 
                                        font-medium transition-colors duration-300
                                        flex items-center justify-center"
                                >
                                    <RiDeleteBin5Line className="text-2xl"/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full bg-white p-2 rounded-md flex justify-center items-center">
                            <label className="text-base text-shadow italic">no issue yet</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskInformation;