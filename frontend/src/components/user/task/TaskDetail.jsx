import { useState } from "react";

import BackButton from "../../BackButton";
import TaskInformation from "./task_detail_components/TaskInfomation";
import EditTaskForm from "./task_detail_components/EditTaskForm";

function TaskDetail(){

const task = {
  id: 1,
  title: "Fix login bug",
  description: "Resolve the issue where users cannot log in after password reset.",
  created_at: "2024-06-01T10:15:00Z",
  updated_at: "2024-06-05T08:00:00Z",
  completed: 0,
  issue_id: 3,
};

const issue = {
    id:1,
    title:"Buy groceries"
}

    const [showEditTask, setShowEditTask] = useState(false);

    const onShow = () =>{
        setShowEditTask(true);
    }

    const onCancel = () =>{
        setShowEditTask(false);
    }

    return(
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-full px-30">
                <BackButton />
            </div>
            <div class="w-full pt-5">
                <TaskInformation task={task} issue={issue}/>
            </div>

            <div class="w-full pt-5 px-30 flex justify-center items-center text-center">
                <button onClick={onShow}
                class="w-full bg-primary text-white border-2 border-primary  px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">Edit Task</button>
            </div>

            {showEditTask &&
                <div class="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
                    <EditTaskForm task={task} onCancel={onCancel}/>
                </div>}
        </div>
    )
}

export default TaskDetail;