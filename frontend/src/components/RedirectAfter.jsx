import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RedirectAfter(props) {

    const visible = props.visible;
    const delay = props.delay || 3000;
    const path = props.path || "/";
    const message = props.message || "Redirecting...";

    const [countdown, setCountdown] = useState(Math.ceil(delay / 1000));
    const navigate = useNavigate();

    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            navigate(path);
        }, delay);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
            return prev - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [visible, delay, path, navigate]);

  if (!visible) return null;

  return (
    <div class="fixed top-20 right-10 border-2 border-dark bg-light text-black font-bold p-5 rounded-2xl shadow-md z-50">
      <label class="text-center">{message}</label>
      <br />
      <label>
            Redirecting in <label class="text-alter">{countdown}</label>...
        </label>
    </div>
  );
}

export default RedirectAfter;