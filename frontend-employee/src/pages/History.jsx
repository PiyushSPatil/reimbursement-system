import React, { useState } from "react";
import { Search, Filter, Download, MoreHorizontal, Calendar, Tag, History as HistoryIcon, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";
import { ClaimDetailModal } from "../components/ClaimDetailModal";

const mockArchives = [
  { id: 101, description: "Annual Conference - Hotel", amount: 15400, status: "Approved", date: "2023-11-15", category: "Accommodation", ref: "ARC-1002", merchant: "Taj Palace", comment: "Approved for full reimbursement." },
  { id: 102, description: "Flight to New York", amount: 85000, status: "Approved", date: "2023-10-20", category: "Transport", ref: "ARC-0951", merchant: "Emirates", comment: "International travel approved." },
  { id: 103, description: "New Laptop Charger", amount: 2500, status: "Rejected", date: "2023-09-12", category: "IT Services", ref: "ARC-0820", merchant: "Apple Store", comment: "Personal equipment not covered." },
  { id: 104, description: "Team Dinner - Quarter Success", amount: 12000, status: "Approved", date: "2023-08-30", category: "Food", ref: "ARC-0712", merchant: "The Social", comment: "Team building budget." },
  { id: 105, description: "Subscription Renewal - Figma", amount: 1200, status: "Approved", date: "2023-08-01", category: "IT Services", ref: "ARC-0604", merchant: "Figma Inc", comment: "recurring software expense." },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const filteredArchives = mockArchives.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                <HistoryIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Archives</h3>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest ml-14">Historical records & past submissions</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950/50 border border-slate-800 focus:border-indigo-500/50 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-white outline-none w-full md:w-80 transition-all focus:ring-4 focus:ring-indigo-500/5"
              />
            </div>
            <button className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-white transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-950/20">
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-left">Claim Identifier</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-left">Category</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-left">Processing Date</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Value (INR)</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Final Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredArchives.length > 0 ? (
                filteredArchives.map((expense) => (
                  <tr 
                    key={expense.id} 
                    className="group hover:bg-slate-800/40 transition-all cursor-pointer"
                    onClick={() => handleOpenModal(expense)}
                  >
                    <td className="px-10 py-6">
                      <p className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{expense.description}</p>
                      <p className="text-[10px] text-slate-500 font-black uppercase mt-1">Ref No: {expense.ref}</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-slate-700" />
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{expense.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-bold text-slate-500">{expense.date}</p>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <p className="text-base font-black text-white">₹{expense.amount.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={cn(
                        "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-sm",
                        expense.status === "Approved" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                        "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      )}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(expense); }}
                        className="w-12 h-12 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:border-slate-700 transition-all group/btn shadow-xl"
                      >
                        <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover/btn:text-white group-hover/btn:scale-110 transition-all" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <HistoryIcon className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No records matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
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
