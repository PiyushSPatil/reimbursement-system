import React from 'react';
import { LayoutDashboard, PlusCircle, Settings, LogOut, Wallet, ShieldCheck, PieChart, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Submit Claim', icon: PlusCircle, path: '/add' },
  { name: 'History', icon: History, path: '/history' },
  { name: 'Analytics', icon: PieChart, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='w-72 h-screen bg-slate-950/60 backdrop-blur-2xl border-r border-slate-800/50 flex flex-col p-8 fixed left-0 top-0 z-50'>
      <div className='flex items-center gap-3 mb-12 px-2'>
        <div className='w-10 h-10 rounded-xl bg-indigo-600 shadow-xl shadow-indigo-600/20 flex items-center justify-center border border-indigo-400/30'>
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className='text-xl font-black tracking-tight text-white'>Expensify</h2>
          <div className='flex items-center gap-1 mt-0.5'>
            <ShieldCheck className='w-3 h-3 text-indigo-400' />
            <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Employee</span>
          </div>
        </div>
      </div>

      <nav className='flex-1 space-y-2'>
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              'w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative',
              location.pathname === item.path
                ? 'bg-indigo-500/10 text-white border border-indigo-500/20 shadow-lg shadow-indigo-500/5'
                : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border border-transparent'
            )}
          >
            {location.pathname === item.path && (
              <motion.div
                layoutId="active-indicator"
                className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-full'
              />
            )}
            <item.icon className={cn(
              'w-5 h-5 transition-colors duration-300',
              location.pathname === item.path ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
            )} />
            <span className="font-bold tracking-tight">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className='mt-auto pt-8 border-t border-slate-800/50'>
        <div className='bg-slate-900/40 rounded-3xl p-5 mb-6 border border-slate-800/50'>
          <p className='text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2'>Claims Budget</p>
          <div className='h-2 bg-slate-800 rounded-full overflow-hidden'>
            <div className='w-2/5 h-full bg-indigo-500 shadow-lg shadow-indigo-500/20' />
          </div>
          <p className='text-xs text-slate-400 mt-2 font-medium'>₹8,500 of ₹20,000 used</p>
        </div>

        <button className='flex items-center gap-4 px-5 py-3.5 text-slate-400 hover:text-rose-400 transition-all duration-300 w-full hover:bg-rose-500/5 rounded-2xl group border border-transparent hover:border-rose-500/10'>
          <LogOut className='w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className="font-bold tracking-tight">Logout</span>
        </button>
      </div>
    </div>
  );
};
