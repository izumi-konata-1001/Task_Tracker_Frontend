import SessionCard from "./SessionCard";

function SessionList(props){
    const sessions =props.sessions;
    const sessionMessage = props.sessionMessage;
    const fetchTaskDetail = props.fetchTaskDetail;
    const setSessionMessage = props.setSessionMessage

    return(
        <div className="w-full flex flex-col space-y-1">
            
            <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">
                Sessions: <label className="text-alter text-base font-normal">{sessionMessage}</label>
            </p>
            <div className="w-full flex flex-col space-y-2">
                {sessions.length > 0? (
                    sessions.map((session)=>{
                        return <SessionCard session={session} fetchTaskDetail={fetchTaskDetail} setSessionMessage={setSessionMessage}/>
                    })
                ):(
                    <div className="w-full bg-white p-2 rounded-md flex justify-center items-center">
                        <p className="text-shadow text-base italic">no session yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SessionList;