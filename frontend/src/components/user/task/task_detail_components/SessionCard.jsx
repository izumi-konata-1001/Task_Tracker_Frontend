import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import BASE_URL from "../../../../utils/api";

function SessionCard(props){
    const session = props.session;
    const fetchTaskDetail = props.fetchTaskDetail;
    const setSessionMessage = props.setSessionMessage
    const {token} = useAuth();
    
    const handleDelete =async ()=>{
        try{
            const response = await fetch(`${BASE_URL}/pomodoro/delete`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`,
                },
                body:JSON.stringify({
                    sessionId:session.id,
                }),
            });
            const result = await response.json();
            if(response.ok){
                console.log('Delete session successfully.');
                await fetchTaskDetail();
                return;
            }
            else{
                setSessionMessage('Delete session failed.');
                console.error('Delete session failed, error:', result.error);
                return;
            }
        }catch(error){
            setMessage('Delete session failed, network or unexpected error.')
            console.error('Delete session failed, error:', error);
            return;
        }
    }
    return(
        <div class="w-full flex flex-row">
            <div class="w-3/4 flex flex-row justify-center items-center px-4 py-2 bg-white border-2 border-dark rounded-xl">
                <div class="w-3/5 felx flex-col justify-start">
                    <div class="w-full">
                        <label class="text-black text-base">Note: </label>
                        {session.note ? (
                            <label class="pl-5 text-black">{session.note}</label>
                        ):(
                            <label class="pl-5 text-shadow text-base">/</label>
                        )}
                    </div>
                    <div class="w-full">
                        <label class="text-black text-base">Started at:</label>
                        <label class="pl-5 text-green">{session.start_time}</label>
                    </div>
                    <div class="w-full">
                        <label class="text-black text-base">Ended at:</label>
                        <label class="pl-5 text-alter">{session.estimated_end_time}</label>
                    </div>
                </div>

                <div class="w-2/5 flex justify-end items-center">
                    <label class="text-black text-xl">Druation: </label>
                    <label class="pl-5 text-primary text-xl">{session.duration_minutes} mins</label>
                </div>
            </div>
            <div class="w-1/4 pl-3">
                <button type="button" onClick={handleDelete}
                class="w-full h-full bg-alter border-2 border-alter rounded-xl text-white hover:bg-white hover:text-alter">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default SessionCard;
