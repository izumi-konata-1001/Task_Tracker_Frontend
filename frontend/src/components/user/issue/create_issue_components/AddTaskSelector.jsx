import { MdAdd } from "react-icons/md";

function AddTaskSelector(props){
    const availableTasks= props.availableTasks;
    const handleSelect = props.handleSelect;
    const handleAdd = props.handleAdd;
    const selectedTaskId = props.selectedTaskId;
    const alreadySelectedTasks = props.alreadySelectedTasks;
    return(
        <div className="w-full">
            <h3 className="w-full text-lg text-black font-medium">Add more tasks: <label className="text-sm text-shadow font-normal">(no more than 5 tasks)</label></h3>
            <div className="w-full flex flex-row">
                <div className="w-9/10">
                    <select
                    value={selectedTaskId}
                    onChange={handleSelect}
                    className="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                        <option value=""> —— Select A Task ——</option>
                        {availableTasks.map((task)=>(
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))
                        }
                    </select>
                </div>
                <div className="w-1/10 pl-2">
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={availableTasks.length === 0 || alreadySelectedTasks.length >= 5}
                        className={`w-full h-full rounded-xl border-2 font-medium transition-colors duration-300
                        flex items-center justify-center
                        ${
                            availableTasks.length === 0 || alreadySelectedTasks.length >= 5
                            ? "bg-gray-300 text-white border-gray-300 cursor-not-allowed"
                            : "cursor-pointer bg-primary text-white border-primary hover:bg-white hover:text-primary"
                        }`}
                    >
                        <MdAdd className="text-2xl font-semibold" />
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default AddTaskSelector;