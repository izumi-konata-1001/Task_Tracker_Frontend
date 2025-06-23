function AddTaskSelector(props){
    const availableTasks = props.availableTasks;
    const selectedTaskId = props.selectedTaskId;
    const handleSelect = props.handleSelect;
    const handleAdd = props.handleAdd;
    return(
        <div class="w-full px-30 flex flex-col">
            <div class="w-full pb-2">
                <label>Add more tasks:</label>
            </div>
            <div class="w-full flex flex-row">
                <div class="w-5/6">
                    <select
                    value={selectedTaskId}
                    onChange={handleSelect}
                    class="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                        <option value=""> —— Select A Task ——</option>
                        {availableTasks.map((task)=>(
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))
                        }
                    </select>
                </div>
                <div class="w-1/6 pl-2">
                    <button onClick={handleAdd}
                    class="w-full h-full py-2 px-3 text-sm rounded-md bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium transition-colors duration-300">
                        add
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default AddTaskSelector;