import { useNavigate,useLocation } from "react-router-dom";

function TaskList(props){
    const tasks = props.tasksBelongToIssue;
    const handleRemove = props.handleRemove;

    const navigate = useNavigate();
    const location = useLocation();

    const handleTask = (taskId)=>{
        navigate(`/task/detail/${taskId}`,{state: { from: location.pathname }})
    }
    return(
        <div class="w-full flex-col px-30">
            <div>
                <label>Tasks in issue: </label>
            </div>
            <div class="w-full pt-2 space-y-2 flex flex-col items-center justify-center">
                {tasks.length > 0 ? (
                    tasks.map((task) =>(
                        <div key={task.id}
                        class="w-full flex flex-row">
                            <div
                            onClick={() => handleTask(task.id)}
                            className="w-5/6 bg-white border border-shadow text-black flex flex-row shadow-md rounded-lg p-2 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <label className="w-2/6 pl-5 text-base font-semibold">Step.{task.step_number}</label>
                                <label className="w-4/6 pr-5 text-base">{task.title}</label>
                            </div>
                            <div class="w-1/6 pl-2">
                                <button value={task.id} type="button" 
                                onClick={handleRemove}
                                class="cursor-pointer w-full px-2 py-2 bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold rounded-md transition-colors duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ):(
                    <p>no tasks in this issue</p>
                )}
            </div>
        </div>
    )
}

export default TaskList;