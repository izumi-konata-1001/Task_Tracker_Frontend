import { useState, useEffect } from "react";
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "../../../../../context/AuthContext";
import BASE_URL from "../../../../../utils/api";

function SessionBarChart() {
    const { token } = useAuth();
    const [days, setDays] = useState(7);
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");

  const fetchSession = async () => {
    if (![7, 30, 180].includes(Number(days))) {
        setMessage("Invalid date range.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/pomodoro/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ days }),
      });

        const result = await response.json();
        if (response.ok) {
            setData(result.data);
            console.log("Fetch session barchart successfully.");
        }else {
            setData([]);
            setMessage("Fetch session barchart data failed.");
            console.error("Fetch session barchart data failed.", result.error);
        }
    }catch(error) {
        setData([]);
        setMessage("Fetch session barchart data failed, network or unexpected error.");
        console.error("Fetch session barchart data failed, error:", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [days]);

  const isMonthly = Number(days) === 180;

  return (
    <div className="w-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="mb:text-xl mb:font-bold text-base font-normal text-dark">
          Session Summary - {new Date().getFullYear()}
        </h2>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="180">Last 6 Months</option>
        </select>
      </div>

      {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={60}
            tickFormatter={(dateStr) => {
                if (isMonthly) 
                    return dateStr;
                const d = new Date(dateStr);
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                return `${month}-${day}`;
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_duration" name="Total Duration (min)" fill="#3fbac2" />
          <Line
            type="monotone"
            dataKey="total_breaks"
            name="Break Points"
            stroke="#f5564e"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SessionBarChart;