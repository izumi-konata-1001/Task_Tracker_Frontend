function IssueAnalysis(props){
    const issue = props.issue;

    return(
        <div className="min-h-[230px] flex flex-col bg-white p-6 rounded-xl">
            <h3 className="w-full mb:text-2xl mb:font-bold flex items-center justify-center text-primary text-xl">
                Issue Analysis
            </h3>

            <div className="w-full pt-3 flex flex-1 flex-col justify-between space-y-1">
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Issue Number:</label>
                    {issue.total > 0? (
                        <label className="text-primary">{issue.total}</label>
                    ):(<label className="text-shadow">{issue.total}</label>)}
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>All tasks finished:</label>
                    {issue.fullyCompleted > 0? (
                        <label className="text-green">{issue.fullyCompleted}</label>
                    ):(
                        <label className="text-shadow">{issue.fullyCompleted}</label>
                    )}
                    
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Has Task not finished:</label>
                    {issue.incompleted > 0? (
                        <label className="text-alter">{issue.incompleted}</label>
                    ):(
                        <label className="text-shadow">{issue.incompleted}</label>
                    )}
                    
                </div>
                <div className="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Without Task:</label>
                    {issue.noTask > 0? (
                        <label className="text-alter">{issue.noTask}</label>
                    ):(
                        <label className="text-shadow">{issue.noTask}</label>
                    )}
                </div>
            </div>
        </div>
    )
}

export default IssueAnalysis;