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
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div className="text-center mb-3">
                        <h1 className="sm:text-2xl text-xl font-bold">Eidt Note</h1>
                    </div>
                    <div className="w-full text-left flex">
                        <form className="w-full">
                            <div className="w-full">
                                <label className="text-left text-sm font-medium">Note: <label className="text-sm text-shadow">(no more than 50 characters)</label> </label>
                            </div>
                            <input
                            className="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                name="note"
                                value={note}
                                rows="5"
                                maxLength={50}
                                onChange={handleChange}
                                required />
                            <div className="w-full flex flex-col justify-center pb-4 pt-5">
                                <p className="text-sm text-alter">{message}</p>

                                <button type="submit" onClick={handleSave} 
                                disabled={disableSave}
                                    className={`w-full border-2 font-semibold px-6 py-2 rounded-xl transition-colors duration-300
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
                        className="cursor-pointer w-full bg-alter text-white  border-alter border-2 hover:bg-white hover:text-alter  font-semibold px-6 py-2 rounded-xl transition-colors duration-300">
                            Cancel
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default EditSessionNote;