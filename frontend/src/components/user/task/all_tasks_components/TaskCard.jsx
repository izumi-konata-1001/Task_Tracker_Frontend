import { useNavigate,useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function TaskCard(props){
    const location = useLocation();
    const navigate = useNavigate();
    const task = props.task;

    const handleViewMore = () => {
        navigate(`/task/detail/${task.id}`,{state: { from: location.pathname }});
    };

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    return(
        <div onClick={handleViewMore}
            className="w-full cursor-pointer bg-white border-2 border-dark rounded-xl p-5 shadow-sm  
            sm:flex sm:flex-row sm:justify-between sm:items-center sm:space-x-2
            hover:border-3 hover:border-primary
            flex flex-col space-x-2"
        >
            <div className="flex flex-col sm:w-3/5">
                <h2 className="text-xl font-semibold text-dark mb-1 line-clamp-1">
                    {task.title}
                </h2>
                <p className="text-sm text-shadow">
                    Created At: {formatDate(task.created_at)}
                </p>
            </div>
            <div className="sm:w-1/5 sm:pl-3 sm:flex sm:flex-col flex flex-row space-x-2">
                <p className="text-sm text-left">
                    Status: 
                    </p>
                <label className={`sm:text-base text-sm font-medium ${task.completed ? 'text-green' : 'text-alter'}`}>
                    {task.completed ? 'Done' : 'Unfinished'}
                </label>
                
            </div>

            <div className="sm:w-1/5 flex justify-end">
                <button onClick={handleViewMore}
                    className="p-1 bg-transparent text-dark
                     hover:text-primary sm:transition duration-200">
                    <FaArrowRight className="sm:text-2xl text-xl" />
                </button>
            </div>
        </div>
    )
}

export default TaskCard;