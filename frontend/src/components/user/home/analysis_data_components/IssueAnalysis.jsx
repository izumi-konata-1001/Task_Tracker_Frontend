function IssueAnalysis(props){
    const issue = props.issue;

    return(
        <div class="w-1/2 flex flex-col justify-center items-center bg-white px-10 py-10  rounded-xl">
            <div class="w-full flex flex-col">
                <div class="w-full flex justify-center">
                    <p class="text-2xl text-primary font-bold">Issue Analysis</p>
                </div>
                <div class="w-full flex flex-row justify-center text-xl space-x-3">
                    <label>Issue Number:</label>
                    {issue.total > 0? (
                        <label class="font-semibold">{issue.total}</label>
                    ):(<label class="text-shadow">{issue.total}</label>)}
                </div>
            </div>
            <div class="w-full flex flex-row">
                <div class="w-1/2">
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
                </div>
                <div class="w-1/2">
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
        </div>
    )
}

export default IssueAnalysis;