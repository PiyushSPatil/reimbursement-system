import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  User, 
  Calendar, 
  Tag, 
  Receipt, 
  ArrowRight,
  Loader2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Expense } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ApprovalModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string, comment: string) => Promise<void>;
  onReject: (id: string, comment: string) => Promise<void>;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({ 
  expense, 
  isOpen, 
  onClose,
  onApprove,
  onReject
}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<'approve' | 'reject' | null>(null);

  if (!expense) return null;

  const steps = ['Manager', 'Finance', 'Director'];
  const currentStepIdx = steps.indexOf(expense.approvalStep);

  const handleAction = async (type: 'approve' | 'reject') => {
    setIsSubmitting(type);
    try {
      if (type === 'approve') await onApprove(expense.id, comment);
      else await onReject(expense.id, comment);
      onClose();
      setComment('');
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-fit max-h-[90vh] bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Expense Review</h2>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">ID: #{expense.id.padStart(4, '0')}</p>
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
              {/* Left Column: Details */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <DetailItem icon={User} label="Employee" value={expense.employeeName} />
                  <DetailItem icon={Calendar} label="Date Submit" value={expense.date} />
                  <DetailItem icon={Tag} label="Category" value={expense.category} />
                  <DetailItem icon={AlertCircle} label="Status" value={expense.status} highlight={expense.status === 'Approved' ? 'text-emerald-400' : expense.status === 'Rejected' ? 'text-rose-400' : 'text-amber-400'} />
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-950/50 border border-slate-800">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">Description</p>
                  <p className="text-slate-200 text-sm leading-relaxed font-medium">
                    {expense.description}
                  </p>
                </div>

                {/* Stepper */}
                <div className="space-y-6">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Approval Pipeline</p>
                  <div className="flex items-center justify-between relative pl-4 pr-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
                    {steps.map((step, idx) => {
                      const isCompleted = idx < currentStepIdx || expense.status === 'Approved';
                      const isCurrent = idx === currentStepIdx && expense.status === 'Pending';
                      
                      return (
                        <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-slate-900 transition-all duration-500 shadow-xl",
                            isCompleted ? "bg-indigo-500 text-white shadow-indigo-500/20" : 
                            isCurrent ? "bg-amber-500 text-white animate-pulse shadow-amber-500/20" : 
                            "bg-slate-800 text-slate-500"
                          )}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{idx + 1}</span>}
                          </div>
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-wider",
                            isCurrent || isCompleted ? "text-slate-200" : "text-slate-600"
                          )}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Receipt & Action */}
              <div className="space-y-8">
                <div className="bg-slate-950/50 rounded-[2.5rem] border border-slate-800 overflow-hidden relative group aspect-[4/3]">
                  {expense.receiptUrl ? (
                    <img src={expense.receiptUrl} alt="Receipt" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                       <Receipt className="w-16 h-16 text-slate-800" />
                       <span className="text-slate-600 font-bold text-sm tracking-tight uppercase">No receipt attached</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-indigo-600 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 border border-indigo-400/20 flex items-center gap-2">
                     <Receipt className="w-3 h-3" /> Proof of Expense
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-2">Review Comment (Optional)</p>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Provide context for your decision..."
                    className="w-full h-32 bg-slate-950/50 border border-slate-800 rounded-[2rem] p-6 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAction('reject')}
                    disabled={!!isSubmitting}
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all duration-500 font-black uppercase tracking-widest text-xs disabled:opacity-50 group shadow-lg shadow-rose-500/5 hover:shadow-rose-500/20"
                  >
                    {isSubmitting === 'reject' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <XCircle className="w-5 h-5 transition-transform group-hover:rotate-90" />
                        Reject Request
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAction('approve')}
                    disabled={!!isSubmitting}
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-400/30 transition-all duration-500 font-black uppercase tracking-widest text-xs disabled:opacity-50 group shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40"
                  >
                    {isSubmitting === 'approve' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                        Approve Request
                      </>
                    )}
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

const DetailItem = ({ icon: Icon, label, value, highlight }: { icon: any, label: string, value: string, highlight?: string }) => (
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
