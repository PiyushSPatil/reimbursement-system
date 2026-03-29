import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function ExpenseChart({ data }) {

  // group by month
  const monthlyData = {};

  data.forEach(item => {
    const month = new Date(item.date).toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) monthlyData[month] = 0;
    monthlyData[month] += Number(item.amount);
  });

  const chartData = Object.keys(monthlyData).map(month => ({
    month,
    amount: monthlyData[month]
  }));

  return (
    <div style={{ height: "300px", marginBottom: "30px" }}>
      <h3>Monthly Expenses</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#7c3aed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}