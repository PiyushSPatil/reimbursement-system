import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MoreHorizontal, 
  ArrowUpDown, 
  Eye, 
  CheckCircle, 
  XCircle,
  FileText,
  ClipboardCheck
} from 'lucide-react';

import { Expense } from '../types';
import { mockExpenses } from '../data/mockData';
import { cn } from '../lib/utils';

interface ExpenseTableProps {
  data: Expense[];
  onSelect: (expense: Expense) => void;
}

export const ExpenseTable = ({ data, onSelect }: ExpenseTableProps) => {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<Expense>[]>(

    () => [
      {
        accessorKey: 'employeeName',
        header: 'Employee',
        cell: (info) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner">
              <img 
                src={info.row.original.avatar || `https://ui-avatars.com/api/?name=${info.getValue()}&background=random`} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white tracking-tight leading-none mb-1">{info.getValue() as string}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{info.row.original.category}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-white transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount <ArrowUpDown className="w-3 h-3" />
          </button>
        ),
        cell: (info) => (
          <div className="text-right pr-4">
            <p className="font-black text-white tracking-tight">{info.row.original.convertedAmount}</p>
            <p className="text-[10px] font-medium text-slate-500">{info.getValue() as number} {info.row.original.currency}</p>
          </div>
        )
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => <span className="text-sm font-bold text-slate-400">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
              status === 'Approved' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              status === 'Rejected' ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
              "bg-amber-500/10 text-amber-400 border-amber-500/20"
            )}>
              <div className={cn(
                "w-1 h-1 rounded-full",
                status === 'Approved' ? "bg-emerald-400" :
                status === 'Rejected' ? "bg-rose-400" :
                "bg-amber-400"
              )} />
              {status}
            </div>
          );
        },
      },
      {
        accessorKey: 'approvalStep',
        header: 'Flow',
        cell: (info) => (
          <div className="flex items-center gap-2">
             <div className="flex -space-x-1.5">
                {['Manager', 'Finance', 'Director'].map((step, idx) => {
                  const currentStepIdx = ['Manager', 'Finance', 'Director'].indexOf(info.getValue() as string);
                  const isDone = idx < currentStepIdx || info.row.original.status === 'Approved';
                  const isCurrent = idx === currentStepIdx && info.row.original.status === 'Pending';
                  
                  return (
                    <div 
                      key={step} 
                      className={cn(
                        "w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[8px] font-black",
                        isDone ? "bg-indigo-500 text-white" : 
                        isCurrent ? "bg-amber-500 text-white animate-pulse" : 
                        "bg-slate-800 text-slate-600"
                      )}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
             </div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                {info.getValue() as string}
             </span>
          </div>
        )
      },
      {
        id: 'actions',
        header: '',
        cell: (info) => (
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => onSelect(info.row.original)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-indigo-500 text-slate-300 hover:text-white border border-slate-700/50 transition-all duration-300 group"
            >
              <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-bold">Review</span>
            </button>
            <button className="p-2 rounded-xl bg-slate-800/50 text-slate-500 hover:text-white border border-slate-800 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    [onSelect]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });


  return (
    <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] border border-slate-800/50 overflow-hidden shadow-2xl">
      <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/50">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Active Approvals
          </h2>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-videst mt-1">Real-time expense monitoring</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search employees or categories..."
            className="w-full md:w-80 bg-slate-950/50 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-sm font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-slate-800/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-8 py-5 text-left text-[11px] font-black text-slate-500 uppercase tracking-widest"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr 
                key={row.id} 
                className="group border-b border-slate-800/30 hover:bg-indigo-500/[0.02] transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-8 py-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {table.getRowModel().rows.length === 0 && (
         <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
               <ClipboardCheck className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-300 tracking-tight">All clear!</h3>
            <p className="text-slate-500 text-sm max-w-xs mt-1">No pending expense requests matching your search criteria.</p>
         </div>
      )}

      <div className="p-6 bg-slate-950/20 border-t border-slate-800/50 flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Showing {table.getRowModel().rows.length} of {data.length} entries
        </p>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs disabled:opacity-50">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};
