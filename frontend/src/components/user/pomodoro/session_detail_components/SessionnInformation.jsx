function SessionInformation(props){
    const session = props.session;
    const onShowEditSession = props.onShowEditSession;
    const handleDelete = props.handleDelete;

    function formatDate(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        const hour = `${date.getHours()}`.padStart(2, '0');
        const minute = `${date.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
    return(
        <div className="w-full flex flex-col justify-center">
            <div className="border border-white/30 shadow-xl rounded-xl p-4 bg-white/10 backdrop-blur-md space-y-3">
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Session Note:</label>
                    {session.note ? (
                        <label className="w-full bg-white rounded-xl p-3 text-base text-dark font-medium">{session.note}</label>
                    ):(
                        <label className="w-full bg-white rounded-xl p-3 text-base text-shadow font-medium">null</label>
                    )}
                </div>

                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Duration:</label>
                    <label className="w-full bg-white rounded-xl p-3 text-base text-primary font-medium">{session.duration_minutes} mins</label>
                </div>

                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Session Start At:</label>
                    <label className="w-full bg-white rounded-xl p-3 text-base text-green font-medium">{formatDate(session.start_time)}</label>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Session Estimated End At:</label>
                    <label className="w-full bg-white rounded-xl p-3 text-base text-dark font-medium">{formatDate(session.estimated_end_time)}</label>
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Session Acutual End At: </label>
                    {session.actual_end_time == session.estimated_end_time ? (
                        <label className="w-full bg-white rounded-xl p-3 text-base text-dark font-medium">{formatDate(session.actual_end_time)}</label>
                    ):(
                        <label className="w-full bg-white rounded-xl p-3 text-base text-alter font-medium">{formatDate(session.actual_end_time)}</label>
                    )}
                    
                </div>
                <div className="w-full flex flex-col">
                    <label className="text-base text-black font-bold">Break Number:</label>
                    {session.break_point == 0 ?(
                        <label className="w-full bg-white rounded-xl p-3 text-base text-dark font-medium"><label className="text-green">{session.break_point}</label> times</label>
                    ):(
                        <label className="w-full bg-white rounded-xl p-3 text-base text-dark font-medium"><label className="text-alter">{session.break_point}</label> times</label>
                    )}
                </div>
                <div className="w-full flex justify-center items-center">
                    <button type="button" onClick={onShowEditSession}
                    className="cursor-pointer w-full bg-primary rounded-xl px-2 py-1 text-white border-2 border-primary hover:bg-white hover:text-primary"
                    >
                        Edit Note
                    </button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <button type="button" onClick={handleDelete}
                    className="cursor-pointer w-full bg-alter rounded-xl px-2 py-1 text-white border-2 border-alter hover:bg-white hover:text-alter"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SessionInformation;