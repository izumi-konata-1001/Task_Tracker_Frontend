import SessionCard from "./SessionCard";

function SessionList(props){
    const sessions = props.sessions;

    return(
        <div className="w-full flex flex-col justify-center items-center space-y-2">
            {sessions.length > 0 ? (
                sessions.map((session)=>{
                    return <SessionCard key={session.id} session={session} />
                })
            ):( 
                <p className="text-black">No more session.</p>
            )}
        </div>
    )
}

export default SessionList;