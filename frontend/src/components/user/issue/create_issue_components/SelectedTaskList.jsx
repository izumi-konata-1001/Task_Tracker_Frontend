import { useState } from "react";

function SelectedTaskList(props){

    const alreadySelectedTasks = props.alreadySelectedTasks;
    const handleDelete = props.handleDelete;
    return(
        <div class="w-full">
            <div class="w-full px-40 space-y-2 flex flex-col items-center justify-center">
                {alreadySelectedTasks.length > 0 ? (
                    alreadySelectedTasks.map((task,index) =>(
                        <div  key={task.id}
                            class="flex flex-row w-full">
                            <div class="w-5/6">
                                <div
                                class="w-full bg-white border-1 border-shadow text-black flex flex-row shadow-md rounded-lg p-2">
                                    <label class="w-1/3 pl-5 text-base font-semibold">
                                        step:{index + 1}
                                    </label>
                                    <label class="w-2/3 pr-5 text-base">
                                        {task.title}
                                    </label>
                                </div>
                            </div>
                            <div class="w-1/6">
                                <div class="w-full pl-2">
                                    <button type="button" onClick={() => handleDelete(task.id)}
                                    class="w-full h-full py-2 px-3 text-sm rounded-md bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium transition-colors duration-300">
                                        remove
                                    </button>
                                </div>
                            </div>
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