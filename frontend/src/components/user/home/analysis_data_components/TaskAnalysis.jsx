function TaskAnalysis(props){
    const task = props.task;
    
    return(
        <div class="w-1/3 min-h-[200px] flex flex-col bg-white px-6 py-6 rounded-xl">
            <h3 class="w-full text-2xl font-bold flex items-center justify-center text-primary">Task Anaylysis</h3>
            <div class="w-full flex flex-col space-y-1 pt-3">
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Total Tasks Number:</label>
                    {task.total ? (
                        <label class="text-primary">{task.total}</label>
                    ):(
                        <label class="text-shadow">{task.total}</label>
                    )}
                </div>
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Completed Tasks Number:</label>
                    {task.completed > 0 ? (
                        <label class="text-green">{task.completed}</label>
                    ):(
                        <label class="text-shadow">{task.completed}</label>
                    )}
                    
                </div>
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Incompleted Tasks Number:</label>
                    {task.incompleted > 0 ? (
                        <label class="text-alter">{task.incompleted}</label>
                    ):(<label class="text-shadow">{task.incompleted}</label>)}
                </div>
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Task has Session Number: </label>
                    {task.withSessions > 0 ? (
                        <label>{task.withSessions}</label>
                    ):(
                        <label class="text-shadow">{task.withSessions}</label>
                    )}
                </div>
            </div>

        </div>
    )
}

export default TaskAnalysis;