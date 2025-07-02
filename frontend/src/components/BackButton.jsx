import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function BackButton(props) {
  const path = props.path;
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path|| -1)}
      className="cursor-pointer flex items-center text-white bg-dark hover:text-dark border-2 border-dark hover:bg-white font-medium py-1 px-2 rounded-xl transition-colors duration-300
      gap-2 text-base"
    >
      <IoArrowBack /> Back
    </button>
  );
}

export default BackButton;