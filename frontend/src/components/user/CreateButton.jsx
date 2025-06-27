import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CreateButton(props){
    const location = useLocation();
    const currentSection = props.section;
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/${currentSection}/create`,{state:{ from: location.pathname }});
    }
    return(
        <div class="w-full flex justify-center item-center px-20">
            <button onClick={handleClick}
            class=" w-full h-9 bg-primary border-2 border-primary text-white px-2 py-1 rounded-md hover:bg-light hover:text-primary transition-colors duration-300">
                Create {currentSection}
            </button>
        </div>
    )
}

export default CreateButton;