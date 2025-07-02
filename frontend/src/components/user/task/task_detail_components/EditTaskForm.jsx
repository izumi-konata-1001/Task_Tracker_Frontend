import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import BASE_URL from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";
function EditTaskForm(props){
    const {token} = useAuth();

    const task = props.task;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completeStatus, setCompleteStatus] = useState(task.completed === 1);

    const onCancel = props.onCancel;
    const fetchTaskDetail = props.fetchTaskDetail;

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
                fetchTaskDetail();
                onCancel();
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
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="text-2xl font-bold">Eidt Task</h1>
                    </div>
                    <div className="w-full text-left flex">
                        <form onSubmit={handleSave} className="space-y-6 w-full">
                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="block text-lg font-medium text-black">Title: <label className="text-sm text-shadow font-normal">(no more than 50 characters)</label></label>
                                </div>
                                <input
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    name="title"
                                    value={title}
                                    maxLength={50}
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="w-full">
                                <div className="w-full flex justify-between">
                                    <label className="block text-lg font-medium text-black">Description: <label className="text-sm text-shadow font-normal">(no more than 150 characters)</label></label>
                                </div>
                                <textarea
                                className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    name="description"
                                    value={description}
                                    rows="4"
                                    maxLength="150"
                                    onChange={handleChange}
                                    required />
                            </div>

                            <div className="w-full">
                                <span className="block text-lg font-medium text-black mb-2">Completed?</span>
                                <div className="flex items-center space-x-6">
                                    <label className="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                                        <input type="radio" 
                                        name="completed"
                                        value="true"
                                        checked={completeStatus === true}
                                        className="accent-primary"
                                        onChange={()=> setCompleteStatus(true)}
                                        required/>
                                        Yes
                                    </label>
                                    <label className="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                                        <input type="radio" 
                                        name="completed"
                                        value="false"
                                        checked={completeStatus === false}
                                        onChange={() => setCompleteStatus(false)}
                                        className="accent-primary"/>
                                        No
                                    </label>
                                </div>
                            </div>

                            <div className="w-full flex  flex-col justify-center">
                                <div className="text-center">
                                    <p className="text-sm text-shadow">{message}</p>
                                </div>
                                <button 
                                type="submit"
                                disabled={disableSave}
                                className={`cursor-pointer w-full border-2 font-semibold px-6 py-2 rounded-md transition-colors duration-300
                                    ${disableSave
                                    ? "bg-shadow text-white border-shadow cursor-not-allowed"
                                    : "cursor-pointer bg-primary text-white border-primary hover:bg-white hover:text-primary"}
                                `}
                                >
                                    Save
                                </button>
                            </div> 
                        </form>
                    </div>

                    <div className="w-full pt-3 flex justify-center">
                        <button 
                        onClick={()=>{onCancel()}}
                        className="cursor-pointer w-full bg-alter text-white  border-alter border-2 hover:bg-white hover:text-alter  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                            Cancel
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default EditTaskForm;