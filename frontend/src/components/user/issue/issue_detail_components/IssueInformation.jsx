function IssueInformation(props){
    const title = props.issue.title;
    const description = props.issue.description;
    const createdTime = props.issue.created_at;
    const updatedTime = props.issue.updated_at;

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
        <div className="w-full flex flex-col justify-center items-center space-y-3">
            <div className="w-full text-center">
                <h2 className="text-2xl font-semibold text-primary break-words whitespace-pre-wrap">{title}</h2>
                <p className="text-sm md:text-base">Created: {formatDate(createdTime)}</p>
                <p className="text-sm md:text-base text-shadow">Updated: {formatDate(updatedTime)}</p>
            </div>

            <div className="w-full flex flex-col space-y-1">
                <p className="w-full md:text-lg md:font-bold text-base font-medium break-words whitespace-pre-wrap">Descriprtion:</p>
                <div className="w-full px-3 py-2 bg-white  rounded-md ">
                    <p className="w-full text-base break-words whitespace-pre-wrap line-clamp-1">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default IssueInformation;