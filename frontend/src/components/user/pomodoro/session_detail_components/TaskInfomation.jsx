function TaskInformation(props){
    const task = props.task;
    const handleTask = props.handleTask;
    return(
        <div className="w-full flex flex-col justify-center">
            <div className="border border-white/30 shadow-xl rounded-xl p-4 bg-white/10 backdrop-blur-md space-y-3">
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Task Title: </label>
                    <label className="bg-white rounded-xl p-3 text-base text-dark font-medium">
                        {task.title}
                    </label>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Description:</label>
                    <label className="bg-white rounded-xl p-3 text-base text-dark font-medium">
                        {task.description}
                    </label>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Status:</label>
                    {task.completed ? (
                        <label className="w-full bg-white rounded-xl p-3 text-lg text-green font-medium">Done</label>
                    ):(<label className="w-full bg-white rounded-xl p-3 text-lg text-alter font-medium">Unfinished</label>)}
                </div>
                <div className="w-full flex justify-center items-center">
                    <button onClick={()=>{handleTask(task.id)}}
                    className="cursor-pointer w-full px-2 py-1 bg-primary border-primary border-2 text-white rounded-xl hover:bg-white hover:text-primary">
                        View Task Detail
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskInformation;