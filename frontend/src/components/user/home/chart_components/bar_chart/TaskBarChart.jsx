import { useState, useEffect } from "react";
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "../../../../../context/AuthContext";
import BASE_URL from "../../../../../utils/api";

function TaskCombinedBarLineChart() {
    const {token} = useAuth();
    
    const [message,setMessage] = useState("");
    const [days, setDays] = useState(7);
    const [data, setData] = useState([]);

    const fetchTaskData = async ()=>{
        if(!days || (days != 30 && days != 7 && days != 180)){
            setMessage('Invalid date range.');
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/task/analysis`, {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    days:days,
                }),
            });
            const result = await response.json();
            if(response.ok){
                setData(result.taskChartData);
                console.log('Fetch task bar chart data successfully.');
                return;
            }else{
                setData([]);
                setMessage('Fetch task barchart data failed.');
                console.error('Fetch task barchart data failed.', result.error);
                return;
            }
        }catch(error){
            setData([]);
            setMessage('Fetch task barchart data failed, network or unexpected error.')
            console.error('Fetch task barchart data failed, error:', error);
            return;
        }
    }

    const fetchDate = async () =>{
        await fetchTaskData();
    }

    useEffect(() => {
        fetchDate();

    }, [days]);

  return (
    <div className="w-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-dark">
          Task Summary - {new Date().getFullYear()}
        </h2>
        <p class="text-base text-alter">{message}</p>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="180">Last 6 Months</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
        <XAxis
        dataKey="date"
        angle={-45}
        textAnchor="end"
        height={60}
        tickFormatter={(dateStr) => {
            if (days === 180) return dateStr;

            const parts = dateStr.split("-");
            if (parts.length === 3) {
                const [, month, day] = parts;
                return `${month}-${day}`;
            }
            return dateStr;
        }}
        />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Created" fill="#3fbac2" />
          <Line
            type="monotone"
            dataKey="completed"
            name="Completed"
            stroke="#A7D32D"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="incompleted"
            name="Incompleted"
            stroke="#f73859"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TaskCombinedBarLineChart;