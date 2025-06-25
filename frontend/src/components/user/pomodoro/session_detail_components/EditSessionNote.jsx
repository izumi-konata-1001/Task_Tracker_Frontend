import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";
function EditSessionNote(props){
    const {token} = useAuth();

    const sessionId = props.sessionId;
    const oldNote = props.note;
    const fetchSession = props.fetchSession;
    const onCancel = props.onCancelEditSession;

    const [message, setMessage] = useState("");
    const [note, setNote] = useState(oldNote);

    const disableSave = note === oldNote;

    const handleChange = (e)=>{
        const {name,value} = e.target;
        if(name == "note"){
            setNote(value);
        }
    }

    const handleSave = async (e)=>{
        e.preventDefault();
        if(disableSave){
            setMessage('Note has no change.');
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/edit`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    sessionId:sessionId,
                    note:note,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setMessage('Edit note successfully.');
                console.log('Edit note successfully.');
                fetchSession();
                onCancel();
                return;
            }else{
                setMessage('Edit note failed.');
                console.error('Edit note failed, error:', result.error);
            }
        }catch(error){
            setMessage('Edit note failed, network or unexpected error.')
            console.error('Edit note failed, error:', error);
            return;
        }
    }

    return(
        <div class="w-full h-full flex flex-col">
            <div class="w-full flex-1 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div class="text-center mb-3">
                        <h1 class="text-2xl font-bold">Eidt Note</h1>
                    </div>
                    <div class="w-full text-left flex">
                        <form class="w-full">
                            <div class="w-full">
                                <label class="text-left text-sm font-medium">Note: </label>
                            </div>
                            <input
                            class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="note"
                                value={note}
                                rows="5"
                                onChange={handleChange}
                                required />
                            <div class="w-full flex flex-col justify-center pb-4 pt-5">
                                <div class="text-center">
                                    <p class="text-sm text-shadow">{message}</p>
                                </div>
                                <button type="submit" onClick={handleSave} 
                                disabled={disableSave}
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

export default EditSessionNote;