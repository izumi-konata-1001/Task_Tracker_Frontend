function TypeFilterSelector(props){
    const tasks = props.tasks;
    const handleType = props.handleType;
    const selectedTaskId = props.selectedTaskId;
    return(
        <div class="w-full flex justify-center item-center px-20">
            <select
            onChange={(e)=>{handleType(e.target.value)}}
            value={selectedTaskId}
            class="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                <option value="">—— Default All sessions ——</option>
                {tasks.length > 0 ?(
                    tasks.map((task)=>{
                        return <option key={task.id} value={task.id}>{task.title}</option>
                    })
                ):(null)}
            </select>
        </div>
    )
}

export default TypeFilterSelector;