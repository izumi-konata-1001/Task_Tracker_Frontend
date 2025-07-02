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
        <div className="w-full flex justify-center item-center">
            <form className="w-full space-y-3">
                <div>
                    <label className="block text-lg font-medium text-black">Title:<label className="text-sm text-shadow font-normal">(no more than 50 characters)</label></label>
                    <input name="title" value={title} onChange={handleChange}
                        maxLength={50}
                        className="w-full px-3 py-2 bg-white border-2 border-shadow rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required />
                </div>

                <div>
                    <label className="block text-lg font-medium text-black">Description:<label className="text-sm text-shadow font-normal">(no more than 150 characters)</label></label>
                    <textarea name="description" value={description} onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border-2 border-shadow rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="4"
                        maxLength="150"
                    required >
                     </textarea>
                </div>

                <div>
                    <span className="block text-lg font-medium text-black mb-2">Completed?</span>
                    <div className="flex items-center space-x-5">
                        <label className="inline-flex items-center space-x-2 text-lg text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="true"
                            checked={complete === true}
                            className="accent-primary"
                            onChange={()=> setComplete(true)}
                            required/>
                            Yes
                        </label>
                        <label className="inline-flex items-center space-x-2 text-lg text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="false"
                            checked={complete === false}
                            onChange={() => setComplete(false)}
                            className="accent-primary"/>
                            No
                        </label>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <button onClick={handleCreate} type="button" 
                    className="w-full text-center bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium rounded-xl transition-colors duration-300
                    px-2 py-1 md:px-4 md:py-2">
                        Create
                    </button>
                </div>
                <div className="text-alter">{message}</div>
            </form>
        </div>
    )
}

export default CreateTaskForm;