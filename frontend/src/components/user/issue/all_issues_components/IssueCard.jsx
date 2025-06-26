import { useNavigate,useLocation } from "react-router-dom";

function IssueCard(props){
    const navigate = useNavigate();
    const location = useLocation();
    const issue = props.issue;

    const handleViewMore = () => {
        navigate(`/issue/detail/${issue.id}`,{state: { from: location.pathname }});
    };
    const truncatedDescription = issue.description.length > 20
        ? issue.description.slice(0, 20) + '...'
        : issue.description;

    
    return(
        <div onClick={handleViewMore}
            class="cursor-pointer bg-white border-2 border-dark rounded-lg p-5 shadow-sm w-full flex flex-row justify-between items-center">
            <div class="w-3/6 flex flex-col">
                <h2 class="text-xl font-semibold text-dark mb-1">
                    {issue.title}
                </h2>
                <p class="text-sm text-shadow">
                    Created At: {issue.created_at}
                </p>
            </div>
            <div class="w-2/6 flex justify-end">
                <p class="text-sm font-medium text-right">
                    {truncatedDescription}
                </p>
            </div>
            <div class="w-1/6 flex justify-end">
                <button type="button" onClick={handleViewMore}
                    className="cursor-pointer text-sm px-4 py-2 border-2 border-primary text-primary rounded hover:bg-primary hover:text-white transition duration-200">
                    view more</button>
            </div>
        </div>
    )
}

export default IssueCard;