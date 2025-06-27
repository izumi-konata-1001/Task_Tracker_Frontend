import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from '../../../../utils/api'
function CreateTaskForm(){
    const {token} = useAuth();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [complete, setComplete] = useState(false);

    const isInvalid = title.trim() === "" || description.trim() === "";

    const handleChange = (e) =>{
        const {name,value} = e.target;
        if(name =="title")
            setTitle(value);
        else if(name=="description")
            setDescription(value);
    }

    const handleCreate = async (e)=>{
        e.preventDefault();

        if(!title || !description || isInvalid){
            setMessage("Title or description cannot be null.");
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/task/create`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    title:title,
                    description:description,
                    completeStatus:complete,
                })
            })

            const result = await response.json();
            
            if(response.ok){
                console.log('Create task successfully.');
                setMessage('Create task successfully.');
                navigate('/task');
                return;
            }else{
                setMessage('Create task failed.');
                console.log('Create task failed, server error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Create task failed.');
            console.error('Create task failed, network or unexpected error, error:',error);
            return;
        }
    }


    return(
        <div class="w-full px-40 flex justify-center item-center">
            <form class="w-full space-y-6">
                <div>
                    <label class="block text-lg font-medium text-black mb-1">Title:</label>
                    <input name="title" value={title} onChange={handleChange}
                        class="w-full px-3 py-2 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required />
                </div>

                <div>
                    <label class="block text-lg font-medium text-black mb-1">Description:</label>
                    <textarea name="description" value={description} onChange={handleChange}
                    class="w-full px-3 py-2 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                    required >
                     </textarea>
                </div>

                <div>
                    <span class="block text-lg font-medium text-black mb-2">Completed?</span>
                    <div class="flex items-center space-x-6">
                        <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="true"
                            checked={complete === true}
                            class="accent-primary"
                            onChange={()=> setComplete(true)}
                            required/>
                            Yes
                        </label>
                        <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="false"
                            checked={complete === false}
                            onChange={() => setComplete(false)}
                            class="accent-primary"/>
                            No
                        </label>
                    </div>
                </div>

                <div class="w-full flex items-center justify-center">
                    <button onClick={handleCreate} type="button" class="w-full text-center bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium px-4 py-2 rounded transition-colors duration-300">Create</button>
                </div>
                <div class="text-alter">{message}</div>
            </form>
        </div>
    )
}

export default CreateTaskForm;