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
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="text-2xl font-bold">Eidt Issue</h1>
                    </div>
                    <div className="w-full text-left flex">
                        <form className="space-y-4 w-full">
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
                                    rows="5"
                                    maxLength="150"
                                    onChange={handleChange}
                                    required />
                            </div>
                            <div className="w-full flex flex-col justify-center pb-4">
                                <div className="text-center">
                                    <p className="text-sm text-shadow">{message}</p>
                                </div>
                                <button type="submit" onClick={handleSave} disabled={disableSave}
                                    className={`w-full border-2 font-semibold px-6 py-2 rounded-md transition-colors duration-300
                                    ${disableSave
                                    ? "bg-shadow text-white border-shadow cursor-not-allowed"
                                    : "cursor-pointer bg-primary text-white border-primary hover:bg-white hover:text-primary"}
                                `}>
                                    Save
                                </button>
                            </div> 
                        </form>
                    </div>


                    <div className="w-full flex justify-center">
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

export default EditIssueForm;