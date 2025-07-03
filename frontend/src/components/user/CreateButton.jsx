import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CreateButton(props){
    const location = useLocation();
    const currentSection = props.section;
    const navigate = useNavigate();

    function getSectionLabel(key) {
        switch (key) {
            case "task":
            return "Task";
            case "issue":
            return "Issue";
            default:
            return "";
        }
    }
    const handleClick = ()=>{
        navigate(`/${currentSection}/create`,{state:{ from: location.pathname }});
    }
    return(
        <div className="w-full flex justify-center item-center">
            <button onClick={handleClick}
            className="cursor-pointer w-full h-9 bg-dark border-2 border-dark text-white px-2 py-1 rounded-xl hover:bg-white hover:text-dark transition-colors duration-300">
                Create {getSectionLabel(currentSection)}
            </button>
        </div>
    )
}

export default CreateButton;