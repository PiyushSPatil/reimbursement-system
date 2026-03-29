import React from 'react';
import { Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { DashboardStats } from '../types';

interface DashboardCardsProps {
  stats: DashboardStats;
}

export const DashboardCards = ({ stats }: DashboardCardsProps) => {
  const items = [
    {
      label: 'Pending Approvals',
      value: stats.pendingCount.toString().padStart(2, '0'),
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
      description: 'Requires your attention',
      trend: '+2 from yesterday'
    },
    {
      label: 'Approved This Month',
      value: stats.approvedMonth.toString().padStart(2, '0'),
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      description: 'Compliant expenses',
      trend: '+15% vs last month'
    },
    {
      label: 'Rejected This Month',
      value: stats.rejectedMonth.toString().padStart(2, '0'),
      icon: XCircle,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/20',
      description: 'Out of policy',
      trend: '-5% vs last month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {items.map((stat) => (
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
              <span className="text-xs font-bold text-slate-600 uppercase">items</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">{stat.description}</p>
          </div>

          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/10 transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
};
