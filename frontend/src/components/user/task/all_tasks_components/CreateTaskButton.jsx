import { useNavigate } from "react-router-dom";

function CreateTaskButton(){
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/task/create');
    }
    return(
        <div class="w-full flex justify-center item-center px-20">
            <button onClick={handleClick}
            class=" w-full bg-primary border-2 border-primary text-white px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">
                Create Task
            </button>
        </div>
    )
}

export default CreateTaskButton;