import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, AlertCircle, FileText, CheckCircle2, User, Receipt, Download, ExternalLink, IndianRupee } from 'lucide-react';
import { cn } from '../lib/utils';

export const ClaimDetailModal = ({ expense, isOpen, onClose }) => {
  if (!expense) return null;

  const steps = ['Submission', 'Manager Review', 'Accounts Processing', 'Direct Deposit'];
  const currentStepMap = { 'Pending': 1, 'Approved': 3, 'Rejected': 1 };
  const currentStepIdx = currentStepMap[expense.status] || 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Claim Details</h2>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Reference: {expense.ref}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Info */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <DetailItem icon={Calendar} label="Date Submit" value={expense.date} />
                  <DetailItem icon={Tag} label="Category" value={expense.category} />
                  <DetailItem icon={User} label="Merchant" value={expense.merchant || 'Unknown'} />
                  <DetailItem 
                    icon={AlertCircle} 
                    label="Status" 
                    value={expense.status} 
                    highlight={
                      expense.status === 'Approved' ? 'text-emerald-400' : 
                      expense.status === 'Rejected' ? 'text-rose-400' : 
                      'text-amber-400'
                    } 
                  />
                </div>

                <div className="p-8 rounded-[2rem] bg-slate-950/50 border border-slate-800 relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <IndianRupee className="w-12 h-12 text-indigo-500" />
                   </div>
                   <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Amount</p>
                   <h4 className="text-4xl font-black text-white tracking-tighter">₹{expense.amount.toLocaleString()}</h4>
                </div>

                <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">Claim Description</p>
                  <p className="text-slate-200 text-sm leading-relaxed font-medium">
                    {expense.description}
                  </p>
                </div>

                {/* Status Pipeline */}
                <div className="space-y-6">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Processing Pipeline</p>
                  <div className="flex items-center justify-between relative pl-4 pr-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
                    {steps.map((step, idx) => {
                      const isCompleted = idx < currentStepIdx || expense.status === 'Approved';
                      const isCurrent = idx === currentStepIdx && expense.status === 'Pending';
                      const isFailed = idx === currentStepIdx && expense.status === 'Rejected';
                      
                      return (
                        <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center border-4 border-slate-900 transition-all duration-500",
                            isCompleted ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : 
                            isFailed ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" :
                            isCurrent ? "bg-amber-500 text-white animate-pulse shadow-lg shadow-amber-500/20" : 
                            "bg-slate-800 text-slate-500"
                          )}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                          </div>
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-wider text-center max-w-[60px]",
                            isCurrent || isCompleted ? "text-slate-200" : "text-slate-600"
                          )}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Receipt & Manager Feedback */}
              <div className="space-y-8">
                <div className="bg-slate-950/50 rounded-[2.5rem] border border-slate-800 overflow-hidden relative group aspect-[4/3] flex flex-col items-center justify-center gap-4">
                   <Receipt className="w-16 h-16 text-slate-800 group-hover:text-indigo-500/20 transition-colors duration-500" />
                   <span className="text-slate-600 font-bold text-sm tracking-tight uppercase">Receipt Preview</span>
                   <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500" />
                   <button className="absolute bottom-6 px-6 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                     <Download className="w-3 h-3" /> View Original
                   </button>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-slate-950 border border-slate-800 shadow-inner">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                         <AlertCircle className="w-4 h-4 text-slate-400" />
                      </div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reviewer Observations</p>
                   </div>
                   <p className="text-slate-300 text-sm italic font-medium leading-relaxed">
                     "{expense.comment || 'This claim is currently awaiting detailed review by the designated department manager.'}"
                   </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-8 py-5 rounded-[2rem] bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" /> Export PDF
                  </button>
                  <button onClick={onClose} className="flex-1 px-8 py-5 rounded-[2rem] bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-400/30 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DetailItem = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700/50">
      <Icon className="w-5 h-5 text-slate-400" />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className={cn("text-sm font-bold tracking-tight", highlight || "text-slate-200")}>{value}</p>
    </div>
  </div>
);
