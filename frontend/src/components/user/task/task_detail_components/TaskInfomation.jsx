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
        <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full text-center mb-4">
                <h2 class="text-xl font-semibold mb-2">{title}</h2>
                <p class="text-sm">Created: {createdTime}</p>
                <p class="text-sm text-shadow">Updated: {updatedTime}</p>
            </div>

            <div class="w-full px-30 text-left text-black">
                <div class="w-full flex flex-row">
                    <lebel class="w-1/5 text-lg">Status:</lebel>
                    <label class="w-4/5 text-base">{completeStatus === 1 ? "Completed" : "Incompleted"}</label>
                </div>

                <div class="w-full flex flex-row">
                    <label class="w-1/5 text-lg">Descriprtion:</label>
                    <label class="w-4/5 text-base leading-relaxed">{description}</label>
                </div>
            </div>
            <div class="w-full flex-col pt-5">
                <div class="px-30">
                    <label class="text-alter">{message}</label>
                </div>
                <div class="w-full flex flex-row items-stretch px-30">
                    <label class="w-1/5 self-center">Link to Issue:</label>

                    <div class="w-3/5">
                        {issue ? (
                        <div onClick={()=>handleIssue(issue.id)}
                        class="cursor-pointer bg-white border-2 border-dark rounded-lg p-3 shadow-sm w-full flex flex-col items-start hover:border-primary transition-colors duration-300">
                            <h2 class="text-sm font-semibold text-dark">{issue.title}</h2>
                            <p class="text-sm text-shadow">Created: {issue.created_at}</p>
                        </div>
                        ) : (
                        <div class="text-sm text-shadow">no issue yet</div>
                        )}
                    </div>

                    {issue && (
                        <div class="w-1/5 pl-3 h-15">
                        <button
                            onClick={handleRemove}
                            type="button"
                            class="h-full w-full bg-alter border-2 border-alter rounded-lg text-white hover:bg-white hover:text-alter transition-colors duration-300"
                        >
                            remove
                        </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskInformation;