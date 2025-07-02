import { useLocation } from "react-router-dom";

import CreateTaskForm from "./create_task_components/CreateTaskForm";
import BackButton from "../../BackButton";
function CreateTask(){
    const location = useLocation();
    const from = location.state?.from;

    return(
        <div className="w-full pt-10 pb-5 md:px-20 px-10">
            <div className="w-full flex justify-start">
                <BackButton path={from}/>
            </div>

            <div className="w-full flex justify-center items-center pt-5">
                <h1 className="text-xl font-bold
                md:text-2xl md:font-semibold">Create New Task</h1>
            </div>
            <div className="w-full pt-5">
                <CreateTaskForm />
            </div>
        </div>
    )
}

export default CreateTask;