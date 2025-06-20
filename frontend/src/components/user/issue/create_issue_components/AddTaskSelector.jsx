import { useState } from "react";

function AddTaskSelector(){
    const tasks = [
  { id: 1, title: "Finish project report" },
  { id: 2, title: "Buy groceries" },
  { id: 3, title: "Call Alice" },
  { id: 4, title: "Read 20 pages of book" },
  { id: 5, title: "Workout for 30 minutes" },
];
const [avalibaleTasks, setAvaliableTasks] = useState(tasks);
const [selectedTaskId, setSelectedTaskId] = useState("")
    const handleChange = (e) =>{
        const id = e.target.value;
        setSelectedTaskId(id)
    }
    return(
        <div class="w-full px-40">
            <div>
                <label>Add more tasks:</label>
            </div>
            <div class="w-full flex flex-row">
                <div class="w-5/6">
                    <select
                    value={selectedTaskId}
                    onChange={handleChange}
                    class="w-full bg-white text-center border-2 border-primary rounded-md py-2 px-3 text-sm h-full">
                        <option value=""> —— Select A Task ——</option>
                        {avalibaleTasks.map((task)=>(
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))
                        }
                    </select>
                </div>
                <div class="w-1/6 pl-2">
                    <button class="w-full h-full py-2 px-3 text-sm rounded-md bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium transition-colors duration-300">add</button>
                </div>
            </div>
            
        </div>
    )
}

export default AddTaskSelector;