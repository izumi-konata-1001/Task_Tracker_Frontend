function TaskAnalysis(props){
    const task = props.task;
    
    return(
        <div className="min-h-[230px] flex flex-col bg-white p-6 rounded-xl">
            <h3 className="w-full mb:text-2xl mb:font-bold flex items-center justify-center text-primary text-xl">
                Task Anaylysis
            </h3>
            <div className="w-full pt-3 flex flex-1 flex-col justify-between space-y-1">
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Total Tasks Number:</label>
                    {task.total ? (
                        <label className="text-primary">{task.total}</label>
                    ):(
                        <label className="text-shadow">{task.total}</label>
                    )}
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Completed Tasks Number:</label>
                    {task.completed > 0 ? (
                        <label className="text-green">{task.completed}</label>
                    ):(
                        <label className="text-shadow">{task.completed}</label>
                    )}
                    
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Incompleted Tasks Number:</label>
                    {task.incompleted > 0 ? (
                        <label className="text-alter">{task.incompleted}</label>
                    ):(<label className="text-shadow">{task.incompleted}</label>)}
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Task has Session Number: </label>
                    {task.withSessions > 0 ? (
                        <label>{task.withSessions}</label>
                    ):(
                        <label className="text-shadow">{task.withSessions}</label>
                    )}
                </div>
            </div>

        </div>
    )
}

export default TaskAnalysis;