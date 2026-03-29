import React, { useState } from "react";
import { Clock, CheckCircle2, XCircle, TrendingUp, Filter, Download, ArrowUpRight, History, MoreHorizontal, PlusCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { ClaimDetailModal } from "../components/ClaimDetailModal";

const mockExpenses = [
  { id: 1, description: "Office Stationery", amount: 1250, status: "Pending", date: "2024-03-25", category: "Stationery", ref: "EXP-8842", merchant: "Staples", comment: "Waiting for manager review." },
  { id: 2, description: "Client Travel to Mumbai", amount: 4500, status: "Approved", date: "2024-03-24", category: "Transport", ref: "EXP-9102", merchant: "Uber/IndiGo", comment: "Approved by Alex Rivera." },
  { id: 3, description: "Team Lunch Meeting", amount: 850, status: "Rejected", date: "2024-03-23", category: "Food", ref: "EXP-7421", merchant: "Starbucks", comment: "Missing itemized receipt." },
  { id: 4, description: "AWS Monthly Billing", amount: 12000, status: "Approved", date: "2024-03-20", category: "IT Services", ref: "EXP-2231", merchant: "Amazon Web Services", comment: "Monthly recurring." },
  { id: 5, description: "Co-working Space", amount: 3500, status: "Pending", date: "2024-03-18", category: "Accommodation", ref: "EXP-1092", merchant: "WeWork", comment: "In routing queue." },
];

export default function Dashboard() {
  const [expenses] = useState(mockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleOpenModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const stats = {
    total: expenses.reduce((sum, e) => sum + e.amount, 0),
    approved: expenses.filter(e => e.status === "Approved").length,
    rejected: expenses.filter(e => e.status === "Rejected").length,
    pending: expenses.filter(e => e.status === "Pending").length,
  };

  const statCards = [
    {
      label: 'Total Submitted',
      value: `₹${(stats.total / 1000).toFixed(1)}k`,
      icon: TrendingUp,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
      border: 'border-indigo-400/20',
      description: 'Across all categories',
      trend: 'This month'
    },
    {
      label: 'Approved',
      value: stats.approved.toString().padStart(2, '0'),
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      description: 'Reimbursed or in process',
      trend: '+15% vs last month'
    },
    {
      label: 'Pending Review',
      value: stats.pending.toString().padStart(2, '0'),
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
      description: 'Awaiting manager approval',
      trend: 'In queue'
    },
  ];

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative overflow-hidden rounded-[2rem] border p-7 backdrop-blur-xl transition-all duration-500",
              "bg-slate-900/40 border-slate-800/50 hover:border-slate-700/50 group hover:shadow-2xl hover:shadow-indigo-500/10",
              "hover:-translate-y-1"
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <div className={cn("p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", stat.bg, "border", stat.border)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50">
                <TrendingUp className="w-3 h-3 text-indigo-400" />
                {stat.trend}
              </div>
            </div>

            <div>
              <p className="text-slate-400 text-sm font-semibold mb-1 tracking-tight">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-2">{stat.description}</p>
            </div>

            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl rounded-[2rem] p-8 flex items-center justify-between group cursor-pointer hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white px-2">Submit New Claim</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 px-2">Ready with a receipt? Start here.</p>
            </div>
          </div>
          <button className="px-8 py-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-black uppercase tracking-widest text-[10px] group-hover:bg-indigo-500 group-hover:text-white transition-all">
            Instant Start
          </button>
        </div>
        
        <div className="bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-emerald-500/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform">
            <Download className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs font-black text-white uppercase tracking-widest text-center">Tax Report</p>
          <p className="text-[10px] text-slate-500 font-bold mt-1">FY 2023-24</p>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl rounded-[2rem] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-slate-700/50">
              <History className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Recent Claims</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Status tracking & history</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800/50 text-slate-300 text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700/50">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Description</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Date</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Amount</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
                      </thead>
            <tbody className="divide-y divide-slate-800/50">
              {expenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  className="group hover:bg-slate-800/40 transition-all cursor-pointer"
                  onClick={() => handleOpenModal(expense)}
                >
                  <td className="px-8 py-5">
                    <p className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{expense.description}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase mt-0.5">{expense.ref}</p>
                  </td>
                  <td className="px-4 py-5 font-black text-slate-400 text-xs uppercase tracking-widest">{expense.category}</td>
                  <td className="px-4 py-5 text-sm font-bold text-slate-400">Mar {expense.date.split('-')[2]}, 2024</td>
                  <td className="px-4 py-5 text-right font-black text-white">₹{expense.amount.toLocaleString()}</td>
                  <td className="px-4 py-5 text-center">
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      expense.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      expense.status === "Rejected" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                      "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    )}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleOpenModal(expense); }}
                      className="w-10 h-10 rounded-xl bg-slate-800 inline-flex items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClaimDetailModal 
        expense={selectedExpense} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}