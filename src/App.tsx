import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardCards } from './components/DashboardCards';
import { ExpenseTable } from './components/ExpenseTable';
import { ApprovalModal } from './components/ApprovalModal';
import { Expense } from './types';
import { api } from './lib/api';
import { Toaster, toast } from 'sonner';
import { Bell, Search, User, ChevronDown, Sparkles } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getExpenses();
        setExpenses(data);
      } catch (error) {
        toast.error('Failed to load expenses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleApprove = async (id: string, comment: string) => {
    const promise = api.approveExpense(id, comment);
    toast.promise(promise, {
      loading: 'Approving expense...',
      success: () => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Approved', approvalStep: 'Finance' } : e));
        return 'Expense approved successfully';
      },
      error: 'Failed to approve expense'
    });
    await promise;
  };

  const handleReject = async (id: string, comment: string) => {
    const promise = api.rejectExpense(id, comment);
    toast.promise(promise, {
      loading: 'Rejecting expense...',
      success: () => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'Rejected' } : e));
        return 'Expense rejected';
      },
      error: 'Failed to reject expense'
    });
    await promise;
  };

  return (
    <div className='flex bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden'>
      <Sidebar />
      <Toaster position="top-right" theme="dark" richColors closeButton />
      
      <main className='flex-1 ml-72 p-12 max-w-[1600px] mx-auto'>
        {/* Header */}
        <header className='mb-12 flex items-center justify-between'>
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-2xl shadow-indigo-500/5 rotate-3">
                <Sparkles className="w-8 h-8 text-indigo-400" />
             </div>
             <div>
              <h1 className='text-4xl font-black text-white tracking-tighter mb-1'>Manager Dashboard</h1>
              <p className='text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2'>
                Team Operations <span className="w-1 h-1 rounded-full bg-slate-700" /> 
                <span className="text-indigo-400">March 2024 Audit</span>
              </p>
             </div>
          </div>

          <div className="flex items-center gap-6 group">
            <div className="hidden lg:flex items-center gap-3 bg-slate-900/40 border border-slate-800 p-2 rounded-2xl pr-4 transition-all hover:border-slate-700">
               <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
                  <Bell className="w-5 h-5 text-slate-400" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notifications</span>
                  <span className="text-xs font-bold text-slate-300">3 Pending Tasks</span>
               </div>
            </div>

            <div className='flex items-center gap-4 bg-indigo-500/5 p-2 rounded-[2rem] border border-indigo-500/20 backdrop-blur-md hover:bg-indigo-500/10 transition-all cursor-pointer'>
              <div className='w-12 h-12 rounded-[1.5rem] overflow-hidden border-2 border-indigo-500/30 shadow-xl'>
                 <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className='hidden md:block pr-4'>
                <p className='text-sm font-black text-white tracking-tight'>John D.</p>
                <div className="flex items-center gap-1">
                  <span className='text-[10px] font-black text-indigo-400 uppercase tracking-widest'>Senior Manager</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-[2rem] bg-slate-900/40 border border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <DashboardCards stats={{
              pendingCount: expenses.filter(e => e.status === 'Pending').length,
              approvedMonth: expenses.filter(e => e.status === 'Approved').length,
              rejectedMonth: expenses.filter(e => e.status === 'Rejected').length
            }} />
            <ExpenseTable data={expenses} onSelect={handleSelectExpense} />
          </>
        )}
      </main>

      <ApprovalModal 
        expense={selectedExpense} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

export default App;
