function IssueAnalysis(props){
    const issue = props.issue;

    return(
        <div class="w-1/3 min-h-[200px] flex flex-col bg-white px-6 py-6 rounded-xl">
            <div class="w-full flex justify-center">
                <p class="text-2xl text-primary font-bold">Issue Analysis</p>
            </div>
            <div class="w-full flex flex-col space-y-1 pt-3">
                <div class="w-full flex flex-row justify-start items-center space-x-3">
                    <label>Issue Number:</label>
                    {issue.total > 0? (
                        <label class="text-primary">{issue.total}</label>
                    ):(<label class="text-shadow">{issue.total}</label>)}
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>All tasks finished:</label>
                    {issue.fullyCompleted > 0? (
                        <label class="text-green">{issue.fullyCompleted}</label>
                    ):(
                        <label class="text-shadow">{issue.fullyCompleted}</label>
                    )}
                    
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>Has Task not finished:</label>
                    {issue.incompleted > 0? (
                        <label class="text-alter">{issue.incompleted}</label>
                    ):(
                        <label class="text-shadow">{issue.incompleted}</label>
                    )}
                    
                </div>
                <div class="w-full flex flex-row justify-start space-x-3">
                    <label>Without Task:</label>
                    {issue.noTask > 0? (
                        <label class="text-alter">{issue.noTask}</label>
                    ):(
                        <label class="text-shadow">{issue.noTask}</label>
                    )}
                </div>
            </div>
        </div>
    )
}

export default IssueAnalysis;