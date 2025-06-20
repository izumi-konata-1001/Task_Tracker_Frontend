import { useState } from "react";

function SelectedTaskList(){

const tasks = [
  { id: 1, title: "Finish project report" },
  { id: 2, title: "Buy groceries" },
  { id: 3, title: "Call Alice" },
  { id: 4, title: "Read 20 pages of book" },
  { id: 5, title: "Workout for 30 minutes" },
];

    const[selectedTasks, setSelectedTasks] = useState(tasks);

    return(
        <div class="w-full">
            <div class="w-full px-40 space-y-2 flex flex-col items-center justify-center">
                {selectedTasks.length > 0 ? (
                    selectedTasks.map((task,index) =>(
                        <div key={task.id}
                        class="w-full bg-white border-1 border-shadow text-black flex flex-row shadow-md rounded-lg p-2">
                            <label class="w-1/3 pl-5 text-base font-semibold">
                                step:{index + 1}
                            </label>
                            <label class="w-2/3 pr-5 text-base">
                                {task.title}
                            </label>
                        </div>
                    ))
                ):(
                    <p class="text-shadow italic">no task selected</p>
                )
                }
            </div>
        </div>
    )
}

export default SelectedTaskList;