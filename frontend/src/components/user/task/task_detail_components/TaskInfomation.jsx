function TaskInformation(props){
    const title = props.task.title;
    const description = props.task.description;
    const createdTime = props.task.created_at;
    const updatedTime = props.task.updated_at;
    const completeStatus = props.task.complete;
    const issueTitle = props.issue.title;

    return(
        <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full text-center mb-4">
                <h2 class="text-xl font-semibold mb-2">{title}</h2>
                <p class="text-sm">Created: {createdTime}</p>
                <p class="text-sm text-shadow">Updated: {updatedTime}</p>
            </div>

            <div class="w-full px-30 text-left text-black">
                <div class="w-full flex flex-row">
                    <lebel class="w-1/5 text-lg">Status:</lebel>
                    <label class="w-4/5 text-base">{completeStatus === 1 ? "True" : "False"}</label>
                </div>

                <div class="w-full flex flex-row">
                    <label class="w-1/5 text-lg">Descriprtion:</label>
                    <label class="w-4/5 text-base leading-relaxed">{description}</label>
                </div>
            </div>

            <div class="w-full flex flex-row px-30">
                <label class="w-1/5">Link to Issue:</label>
                <label class="w-3/5">{issueTitle}</label>
                <button type="button" class="w-1/5 bg-alter border-2 border-alter rounded text-white hover:bg-white hover:text-alter transition-colors duration-300">remove</button>
            </div>
        </div>
    )
}

export default TaskInformation;