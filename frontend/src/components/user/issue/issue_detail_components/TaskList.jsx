function TaskList(props){
    const tasks = props.tasksBelongToIssue;
    const handleRemove = props.handleRemove;
    return(
        <div class="w-full flex-col px-30">
            <div>
                <label>Tasks in issue: </label>
            </div>
            <div class="w-full pt-2 space-y-2 flex flex-col items-center justify-center">
                {tasks.length > 0 ? (
                    tasks.map((task) =>(
                        <div key={task.id} class="w-full bg-white border-1 border-shadow text-black flex flex-row shadow-md rounded-lg p-2">
                            <label class="w-2/6 pl-5 text-base font-semibold">Step.{task.step_number}</label>
                            <label class="w-3/6 pr-5 text-base">{task.title}</label>
                            <button value={task.id} type="button" onClick={handleRemove}
                                class="cursor-pointer w-1/6 bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold rounded-md transition-colors duration-300"
                            >Remove</button>
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