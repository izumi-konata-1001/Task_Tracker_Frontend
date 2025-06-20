import { useState } from "react";

function EditIssueForm(props){
    const issue = props.issue;
    const [title, setTitle] = useState(issue.title);
    const [description, setDescription] = useState(issue.description)
    const onCancel = props.onCancelEditIssue;
    const handleChange = (e)=>{
        const {name,value} = e.target;
        if(name == "title"){
            setTitle(value);
        }
        else if(name == "description"){
            setDescription(value);
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
                        <form class="space-y-6 w-full">
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
                            <div class="w-full flex justify-center">
                                <button 
                                class="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                                    Save
                                </button>
                            </div> 
                        </form>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-shadow">message</p>
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