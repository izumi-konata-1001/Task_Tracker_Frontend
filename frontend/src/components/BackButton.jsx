import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function BackButton(props) {
  const path = props.path;
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      class="flex items-center gap-2 text-sm text-white bg-dark hover:text-dark border-2 border-dark hover:bg-white font-medium px-2 py-1 rounded transition-colors duration-300"
    >
      <IoArrowBack class="text-lg" />
      Back
    </button>
  );
}

export default BackButton;