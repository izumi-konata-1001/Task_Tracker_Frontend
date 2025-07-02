import { FaArrowRight } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";

function IssueCard(props){
    const navigate = useNavigate();
    const location = useLocation();
    const issue = props.issue;

    const handleViewMore = () => {
        navigate(`/issue/detail/${issue.id}`,{state: { from: location.pathname }});
    };
    const truncatedDescription = issue.description.length > 15
        ? issue.description.slice(0, 15) + '...'
        : issue.description;

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
        <div onClick={handleViewMore}
            className="w-full cursor-pointer bg-white border-2 border-dark rounded-xl p-5 shadow-sm  
            sm:flex sm:flex-row sm:justify-between sm:items-center sm:space-x-2
            hover:border-3 hover:border-primary
            flex flex-col space-y-2"
        >
            <div className="flex flex-col sm:w-3/5">
                <h2 className="text-xl font-semibold text-dark mb-1 break-words line-clamp-1">
                    {issue.title}
                </h2>
                <p className="text-sm font-normal text-shadow">
                    Created At: {formatDate(issue.created_at)}
                </p>
                <p className="text-sm font-medium text-shadow">
                    Description: {truncatedDescription}
                </p>
            </div>
            <div className="flex justify-end sm:w-2/5 w-ful">
                <button type="button" onClick={handleViewMore}
                    className="p-1 bg-transparent text-dark
                     hover:text-primary sm:transition duration-200">
                    <FaArrowRight className="sm:text-2xl text-xl" />
                </button>
            </div>
        </div>
    )
}

export default IssueCard;