import { useState } from "react";
import BASE_URL from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";

function EditIssueForm(props){
    const {token} = useAuth();

    const issue = props.issue;
    const fetchIssueDetail = props.fetchIssueDetail
    const [title, setTitle] = useState(issue.title);
    const [description, setDescription] = useState(issue.description)
    const onCancel = props.onCancelEditIssue;

    const [message, setMessage] = useState("");

    const isUnchanged = title === issue.title && description === issue.description
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
            const response = await fetch(`${BASE_URL}/issue/edit`,{
                method:'POST',
                headers:{
                    'Content-Type' :'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:issue.id,
                    title:title,
                    description:description,
                }),
            })

            const result = await response.json();

            if(response.ok){
                setMessage("Edit issue successfully.");
                console.log('Edit issue successfully.');
                fetchIssueDetail();
                onCancel();
                return;
            }else{
                setMessage("Edit issue failed in database.");
                console.error('Edit issue failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Edit issue failed, network or unexpected error.')
            console.error('Edit issue failed, error:', error);
            return;
        }
    }
    return(
        <div class="w-full h-full flex flex-col">
            <div class="w-full flex-1 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div class="text-center mb-3">
                        <h1 class="text-2xl font-bold">Eidt Issue</h1>
                    </div>
                    <div class="w-full text-left flex">
                        <form class="space-y-4 w-full">
                            <div class="w-full">
                                <div class="w-full flex justify-between">
                                    <label class="text-left text-sm font-medium">Title: </label>
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
                                </div>
                                <textarea
                                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    name="description"
                                    value={description}
                                    rows="5"
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div class="w-full flex flex-col justify-center pb-4">
                                <div class="text-center">
                                    <p class="text-sm text-shadow">{message}</p>
                                </div>
                                <button type="submit" onClick={handleSave} disabled={disableSave}
                                    class={`w-full border-2 font-semibold px-6 py-2 rounded-md transition-colors duration-300
                                    ${disableSave
                                    ? "bg-shadow text-white border-shadow cursor-not-allowed"
                                    : "bg-primary text-white border-primary hover:bg-white hover:text-primary"}
                                `}>
                                    Save
                                </button>
                            </div> 
                        </form>
                    </div>


                    <div class="w-full flex justify-center">
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

export default EditIssueForm;