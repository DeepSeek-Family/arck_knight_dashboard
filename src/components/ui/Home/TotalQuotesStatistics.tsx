import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
  { name: "Aug", uv: 2490 },
  { name: "Sep", uv: 1490 },
  { name: "Oct", uv: 4490 },
  { name: "Nov", uv: 3490 },
  { name: "Dec", uv: 1490 },
];

const TotalQuotesStatistics = () => {
  return (
    <div
      style={{ width: "100%", height: 300 }}
      className="px-5 py-3 bg-white rounded-2xl"
    >
      <h4 className="mb-5 mt-4 text-xl font-semibold">
        Total Quotes Statistics
      </h4>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6DBD44" stopOpacity={1} />
              <stop offset="100%" stopColor="#6DBD44" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#6DBD44"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalQuotesStatistics;