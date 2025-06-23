import CreateTaskForm from "./create_task_components/CreateTaskForm";
import BackButton from "../../BackButton";
function CreateTask(){
    return(
        <div class="w-full h-screen flex flex-col items-center justify-center">
            <div class="w-full px-40">
                <BackButton path="/task"/>
            </div>
            <div class="w-full flex justify-center items-center pt-5">
                <h1 class="text-2xl font-bold">Create New Task</h1>
            </div>
            <div class="w-full pt-5">
                <CreateTaskForm />
            </div>
        </div>
    )
}

export default CreateTask;