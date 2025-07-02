import { RiDeleteBin5Line } from "react-icons/ri";
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
        <div className="w-full flex-col space-y-1">
            <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">
                Tasks in issue: 
            </p>
            
            <div className="w-full space-y-2 flex flex-col items-center justify-center">
                {tasks.length > 0 ? (
                    tasks.map((task) =>(
                        <div key={task.id} onClick={() => handleTask(task.id)}
                            className="w-full flex flex-row"
                        >
                            <div className="cursor-pointer w-9/10 flex flex-row">
                                <div className="cursor-pointer w-full flex flex-grow items-center bg-white border border-shadow text-black shadow-md rounded-lg px-3 py-2
                                hover:border-2 hover:border-primary space-x-3">
                                    <label className="cursor-pointer w-1/5 text-base font-bold">Step.{task.step_number}</label>
                                    <label className="cursor-pointer w-4/5 text-base line-clamp-1">{task.title}</label>
                                </div>
                            </div>

                            <div className="w-1/10 flex items-stretch">
                                <div className="w-full pl-2">
                                    <button value={task.id} type="button" 
                                      onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(e);
                                        }}
                                    className="cursor-pointer w-full h-full  rounded-xl bg-alter text-white border-2 border-alter
                                        hover:bg-white hover:text-alter 
                                        font-medium transition-colors duration-300
                                        flex items-center justify-center">
                                        <RiDeleteBin5Line className="text-2xl"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="w-full flex justify-center items-center border-2 bg-white border-shadow rounded-md p-3">
                        <p className="text-shadow italic">no task in issue</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList;