import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";
function EditTaskForm(props){
    const {token} = useAuth();

    const navigate = useNavigate();
    const task = props.task;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completeStatus, setCompleteStatus] = useState(task.completed === 1);

    const onCancel = props.onCancel;

    const [message, setMessage] = useState("");
    
    const isUnchanged = title === task.title && description === task.description && completeStatus === (task.completed === 1)
    const isInvalid = title.trim() === "" || description.trim() === "";
    const disableSave = isUnchanged || isInvalid;

    const handleChange = (e)=>{
        const {name,value} = e.target;
        if(name == "title"){
            setTitle(value);
        }
        else if(name == "description"){
            setDescription(value);
        }
    }

    const handleSave = async (e) =>{
        e.preventDefault();
        if (isInvalid) {
            setMessage("Title or description cannot be empty.");
            return;
        }
        if (isUnchanged) {
            setMessage("No changes detected.");
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/task/edit`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId: task.id,
                    title: title,
                    description: description,
                    completeStatus: completeStatus ? 1 : 0,
                }),
            });

            const result = await response.json();

            if(response.ok){
                console.log('Edit task successfully.');
                onCancel();
                navigate(`/task/detail/${task.id}`, { replace: true });
                return;
            }else{
                setMessage('Edit task failed.');
                console.error('Edit task failed, error:',result.error);
                return;
            }
        }catch(error){
            setMessage('Edit task failed.');
            console.error('Edit task failed, network or unexpected error, error:',error);
            return;
        }
    }
    return(
        <div class="w-full h-full flex flex-col">
            <div class="w-full flex-1 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div class="text-center mb-3">
                        <h1 class="text-2xl font-bold">Eidt Task</h1>
                    </div>
                    <div class="w-full text-left flex">
                        <form onSubmit={handleSave} class="space-y-6 w-full">
                            <div class="w-full">
                                <div class="w-full flex justify-between">
                                    <label class="text-left text-sm font-medium">Title: </label>
                                    <label class="text-right text-sm text-shadow">title message</label>
                                </div>
                                <input

                                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div class="w-full">
                                <div class="w-full flex justify-between">
                                    <label class="text-left text-sm font-medium">Description: </label>
                                    <label class="text-right text-sm text-shadow">description message</label>
                                </div>
                                <textarea
                                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    name="description"
                                    value={description}
                                    rows="5"
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div class="w-full">
                                <span class="block text-lg font-medium text-black mb-2">Completed?</span>
                                <div class="flex items-center space-x-6">
                                    <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                                        <input type="radio" 
                                        name="completed"
                                        value="true"
                                        checked={completeStatus === true}
                                        class="accent-primary"
                                        onChange={()=> setCompleteStatus(true)}
                                        required/>
                                        Yes
                                    </label>
                                    <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                                        <input type="radio" 
                                        name="completed"
                                        value="false"
                                        checked={completeStatus === false}
                                        onChange={() => setCompleteStatus(false)}
                                        class="accent-primary"/>
                                        No
                                    </label>
                                </div>
                            </div>

                            <div class="w-full flex  flex-col justify-center">
                                <div class="text-center">
                                    <p class="text-sm text-shadow">{message}</p>
                                </div>
                                <button 
                                type="submit"
                                disabled={disableSave}
                                className={`w-full border-2 font-semibold px-6 py-2 rounded-md transition-colors duration-300
                                    ${disableSave
                                    ? "bg-shadow text-white border-shadow cursor-not-allowed"
                                    : "bg-primary text-white border-primary hover:bg-white hover:text-primary"}
                                `}
                                >
                                    Save
                                </button>
                            </div> 
                        </form>
                    </div>

                    <div class="w-full pt-3 flex justify-center">
                        <button 
                        onClick={()=>{onCancel()}}
                        class="w-full bg-alter text-white  border-alter border-2 hover:bg-white hover:text-alter  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                            Cancel
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default EditTaskForm;