function SessionAnalysis(props){
    const session = props.session
    return(
        <div className="min-h-[230px] flex flex-col bg-white p-6 rounded-xl">
            <h3 className="w-full mb:text-2xl mb:font-bold flex items-center justify-center text-primary text-xl">
                Session Analysis
            </h3>
            <div className="w-full pt-3 flex flex-1 flex-col justify-between space-y-1">
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                        <label>Session Number:</label>
                        {session.total > 0 ? (
                            <label className="text-primary">{session.total}</label>    
                        ):(
                            <label className="text-shadow">{session.total}</label>    
                        )}   
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>5 mins:</label>
                    {session.durationCount && session.durationCount.five > 0? (
                        <label>{session.durationCount.five}</label>
                    ):(<label className="text-shadow">0</label>)}
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>15 mins:</label>
                    {session.durationCount && session.durationCount.fifteen > 0? (
                        <label>{session.durationCount.fifteen}</label>
                    ):(<label className="text-shadow">0</label>)}
                </div>

                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>25 mins:</label>
                    {session.durationCount && session.durationCount.twentyFive > 0? (
                        <label>{session.durationCount.twentyFive}</label>
                    ):(<label className="text-shadow">0</label>)}
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>50 mins:</label>
                    {session.durationCount && session.durationCount.fifty > 0? (
                        <label>{session.durationCount.fifty}</label>
                    ):(<label className="text-shadow">0</label>)}
                </div>
            </div>
        </div>
    )
}

export default SessionAnalysis;