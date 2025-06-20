function IssueInformation(props){
    const title = props.issue.title;
    const description = props.issue.description;
    const createdTime = props.issue.created_at;
    const updatedTime = props.issue.updated_at;

    return(
        <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full text-center mb-4">
                <h2 class="text-xl font-semibold mb-2">{title}</h2>
                <p class="text-sm">Created: {createdTime}</p>
                <p class="text-sm text-shadow">Updated: {updatedTime}</p>
            </div>

            <div class="w-full px-30 text-left text-black">
                <div class="w-full flex flex-row">
                    <label class="w-1/5 text-lg">Descriprtion:</label>
                    <label class="w-4/5 text-base leading-relaxed">{description}</label>
                </div>
            </div>
        </div>
    )
}

export default IssueInformation;