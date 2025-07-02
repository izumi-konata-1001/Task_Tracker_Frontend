import { RiDeleteBin5Line } from "react-icons/ri";

function SelectedTaskList(props){

    const alreadySelectedTasks = props.alreadySelectedTasks;
    const handleDelete = props.handleDelete;

    function truncateText(text, maxLength, suffix = '...') {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + suffix : text;
    }
    return(
        <div className="w-full">
            <h3 className="w-full text-lg text-black font-medium">Selected Tasks:</h3>
            <div className="w-full">
                <div className="w-full space-y-2 flex flex-col items-center justify-center">
                    {alreadySelectedTasks.length > 0 ? (
                        alreadySelectedTasks.map((task,index) =>(
                            <div  key={task.id}
                                className="flex flex-row w-full">
                                <div className="w-9/10 flex flex-row">
                                    <div className="w-full flex flex-grow items-center justify-start bg-white border border-shadow text-black shadow-md rounded-lg px-3 py-2">
                                        <label className="w-1/4 text-base font-bold text-left">Step {index + 1}:</label>
                                        <label className="w-3/4 text-base text-left line-clamp-1"> {task.title}</label>
                                    </div>
                                </div>
                                <div className="w-1/10 flex items-stretch">
                                    <div className="w-full pl-2">
                                        <button type="button" onClick={() => handleDelete(task.id)}
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
                            <p className="text-shadow italic">no task selected</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectedTaskList;