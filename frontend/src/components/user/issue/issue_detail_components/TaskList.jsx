function TaskList(props){
    const tasks = props.tasksBelongToIssue;

    return(
        <div class="w-full flex-col px-30">
            <div>
                <label>Tasks in issue: </label>
            </div>
            <div class="w-full pt-2 space-y-2 flex flex-col items-center justify-center">
                {tasks.length > 0 ? (
                    tasks.map((task) =>(
                        <div class="w-full bg-white border-1 border-shadow text-black flex flex-row shadow-md rounded-lg p-2">
                            <label class="w-1/3 pl-5 text-base font-semibold">Step.{task.step_number}</label>
                            <label class="w-2/3 pr-5 text-base">{task.title}</label>
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