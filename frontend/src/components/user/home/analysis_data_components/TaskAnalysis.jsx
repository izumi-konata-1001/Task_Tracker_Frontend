function TaskAnalysis(props){
    const task = props.task;
    
    return(
        <div class="w-full flex flex-col justify-center items-center bg-white px-10 py-10 rounded-xl">
            <h3 class="text-2xl font-bold text-primary">Task Anaylysis</h3>
            <div class="w-full text-xl flex flex-row justify-center items-center space-x-3">
                <label>Total Tasks Number:</label>
                {task.total ? (
                    <label class="font-semibold">{task.total}</label>
                ):(
                    <label class="text-shadow">{task.total}</label>
                )}
            </div>
            <div class="w-full flex flex-row text-base pt-2">
                <div class="w-1/2">
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
                </div>
                <div class="w-1/2 ">
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
        </div>
    )
}

export default TaskAnalysis;