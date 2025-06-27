import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CompleteCountPieChart({task}){

  const data = [
    { name: "Completed", value: task.completed},
    { name: "Incompleted", value: task.incompleted }
  ];

  const COLORS = {
    Completed: "#3fbac2",
    Incompleted: "#f73859",
  };

  return(
    <div className="w-full flex flex-col items-center justify-center">
        <PieChart width={200} height={200}>
          <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.name] || "#ccc"} // fallback color if name not matched
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[entry.name] }} />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompleteCountPieChart;