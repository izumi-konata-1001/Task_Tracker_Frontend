function TaskInformation(props){
    const task = props.task;
    return(
        <div class="w-full flex flex-col space-y-2 justify-center px-30">
            <div class="w-full flex justify-center items-center">
                <label class="text-shadow font-base">———— Task ————</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Task Title: </label>
                <label class="text-xl text-primary font-semibold">{task.title}</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Description:</label>
                <label class="text-xl text-primary font-semibold">{task.description}</label>
            </div>
            <div class="w-full flex flex-row justify-between">
                <label class="text-base text-black">Status:</label>
                {task.completed ? (
                    <label class="text-xl text-green font-semibold">Completed</label>
                ):(<label class="text-xl text-alter font-semibold">Incompleted</label>)}
            </div>
        </div>
    )
}

export default TaskInformation;