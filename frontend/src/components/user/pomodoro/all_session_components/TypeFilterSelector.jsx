function TypeFilterSelector(props){
    const tasks = props.tasks;
    const handleType = props.handleType;
    const selectedTaskId = props.selectedTaskId;
    return(
        <div className="w-full flex justify-center item-center">
            <select
            onChange={(e)=>{handleType(e.target.value)}}
            value={selectedTaskId}
            className="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-baseh-full">
                <option value="">——  All sessions(default) ——</option>
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