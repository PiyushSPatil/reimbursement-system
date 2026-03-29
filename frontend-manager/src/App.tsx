import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardCards } from './components/DashboardCards';
import { ExpenseTable } from './components/ExpenseTable';
import { ApprovalModal } from './components/ApprovalModal';
import { Expense } from './types';
import { api } from './lib/api';
import { Toaster, toast } from 'sonner';
import { Bell, Search, User, ChevronDown, Sparkles, Users, PieChart, Settings } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');

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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-[2rem] bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))}
        </div>
      );
    }

    switch (activePage) {
      case 'Dashboard':
      case 'Approval Queue':
        return (
          <>
            <DashboardCards stats={{
              pendingCount: expenses.filter(e => e.status === 'Pending').length,
              approvedMonth: expenses.filter(e => e.status === 'Approved').length,
              rejectedMonth: expenses.filter(e => e.status === 'Rejected').length
            }} />
            <ExpenseTable data={expenses} onSelect={handleSelectExpense} />
          </>
        );
      case 'Team Expenses':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Engineering', count: 12, budget: '$45,000' },
                { name: 'Marketing', count: 5, budget: '$12,000' },
                { name: 'Sales', count: 8, budget: '$28,000' },
                { name: 'Operations', count: 4, budget: '$9,000' }
              ].map(dept => (
                <div key={dept.name} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/30 transition-all group">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{dept.name}</p>
                   <h4 className="text-xl font-black text-white mb-2">{dept.count} Members</h4>
                   <div className="flex items-center justify-between">
                     <span className="text-xs text-slate-400 font-bold">Monthly Budget</span>
                     <span className="text-xs text-indigo-400 font-black">{dept.budget}</span>
                   </div>
                </div>
              ))}
            </div>
            
            <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white tracking-tight">Department Overview</h3>
                <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">Add Team Member</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Alex Rivera', role: 'Lead Frontend', dept: 'Engineering', spent: '$1,200', limit: '$5,000' },
                  { name: 'Sarah Chen', role: 'Senior Product', dept: 'Product', spent: '$850', limit: '$3,000' },
                  { name: 'Michael Rossi', role: 'Sales Director', dept: 'Sales', spent: '$4,300', limit: '$10,000' }
                ].map(member => (
                  <div key={member.name} className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/50 border border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${member.name}&background=random`} alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{member.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">{member.spent} <span className="text-slate-600 font-medium">/ {member.limit}</span></p>
                      <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(parseInt(member.spent.replace('$', '').replace(',', '')) / parseInt(member.limit.replace('$', '').replace(',', ''))) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Analytics':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl min-h-[400px] flex flex-col justify-center items-center text-center">
                <PieChart className="w-20 h-20 text-indigo-500/20 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Spend Distribution</h3>
                <p className="text-slate-500 text-sm max-w-xs">AI-powered breakdown of your team's spending by category and department.</p>
              </div>
              <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl min-h-[400px] flex flex-col justify-center items-center text-center">
                 <div className="w-full h-32 flex items-end gap-2 px-10 mb-6">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg relative group">
                        <div className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Monthly Velocity</h3>
                 <p className="text-slate-500 text-sm max-w-xs">Track approval throughput and reimbursement cycle times.</p>
              </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl text-center">
            <Settings className="w-16 h-16 text-slate-500 mx-auto mb-6 opacity-20" />
            <h2 className="text-3xl font-black text-white tracking-tight mb-4">System Settings</h2>
            <p className="text-slate-400 max-w-md mx-auto">Configure approval rules, currency conversion APIs, and user permissions.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden'>
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <Toaster position="top-right" theme="dark" richColors closeButton />
      
      <main className='flex-1 ml-72 p-12 max-w-[1600px] mx-auto'>
        {/* Header */}
        <header className='mb-12 flex items-center justify-between'>
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-2xl shadow-indigo-500/5 rotate-3">
                <Sparkles className="w-8 h-8 text-indigo-400" />
             </div>
             <div>
              <h1 className='text-4xl font-black text-white tracking-tighter mb-1'>{activePage}</h1>
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
        {renderContent()}
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
