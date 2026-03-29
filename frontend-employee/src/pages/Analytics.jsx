import React from "react";
import { PieChart as PieIcon, BarChart as BarIcon, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { cn } from "../lib/utils";

const dataByCategory = [
  { name: 'Transport', value: 4500, color: '#6366f1' },
  { name: 'Food', value: 850, color: '#f59e0b' },
  { name: 'Stationery', value: 1250, color: '#10b981' },
  { name: 'IT Services', value: 12000, color: '#8b5cf6' },
  { name: 'Others', value: 3500, color: '#64748b' },
];

const monthlyData = [
  { month: 'Oct', amount: 4200 },
  { month: 'Nov', amount: 8400 },
  { month: 'Dec', amount: 5600 },
  { month: 'Jan', amount: 11000 },
  { month: 'Feb', amount: 7500 },
  { month: 'Mar', amount: 22100 },
];

export default function Analytics() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart: Spend Distribution */}
        <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Spend Distribution</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">By Expense Category</p>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <PieIcon className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {dataByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {dataByCategory.map((item) => (
              <div key={item.name} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-slate-800/50">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.name}</span>
                <span className="text-xs font-black text-white ml-auto">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart: Monthly Trends */}
        <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Monthly Velocity</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Claim Volume Trends</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <BarIcon className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#6366f1" 
                  radius={[8, 8, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Growth vs LY</p>
                <p className="text-lg font-black text-white">+28.4%</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
              View Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
