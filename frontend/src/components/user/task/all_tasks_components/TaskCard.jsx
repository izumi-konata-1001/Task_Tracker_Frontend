import { useNavigate } from "react-router-dom";

function TaskCard(props){
    const navigate = useNavigate();
    const task = props.task;

    const handleViewMore = () => {
        navigate(`/task/detail/${task.id}`);
    };
    return(
        <div onClick={handleViewMore}
            class="cursor-pointer bg-white border-2 border-dark rounded-lg p-5 shadow-sm w-full flex justify-between items-center">
            <div class="flex flex-col">
                <h2 class="text-xl font-semibold text-dark mb-1">
                    {task.title}
                </h2>
                <p class="text-sm text-shadow">
                    Created At: {task.created_at}
                </p>
            </div>
            <div>
                <p class="text-sm font-medium text-right">
                    {task.completed ? "Completed" : "Incomplete"}
                </p>
            </div>

            <div className="flex justify-end">
                <button
                onClick={handleViewMore}
                className="cursor-pointer text-sm px-4 py-2 border-2 border-primary text-primary rounded hover:bg-primary hover:text-white transition duration-200"
                >
                View More
                </button>
            </div>
        </div>
    )
}

export default TaskCard;