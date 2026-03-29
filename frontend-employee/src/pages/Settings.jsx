import React from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Wallet, CreditCard, ChevronRight, Monitor, Globe, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export default function Settings() {
  const sections = [
    {
      title: "Account Preferences",
      items: [
        { icon: User, label: "Profile Information", desc: "Update your name, email, and avatar", color: "indigo" },
        { icon: Wallet, label: "Bank Account Details", desc: "Where your reimbursements are sent", color: "emerald" },
        { icon: CreditCard, label: "Corporate Card", desc: "Manage your linked business cards", color: "blue" },
      ]
    },
    {
      title: "System Settings",
      items: [
        { icon: Bell, label: "Notification Centre", desc: "Manage email and push alerts", color: "rose" },
        { icon: Moon, label: "Appearance", desc: "Toggle between dark and light modes", color: "amber" },
        { icon: Globe, label: "Language & Region", desc: "Set your local currency and date formats", color: "indigo" },
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <div className="lg:col-span-1 p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl flex flex-col items-center text-center">
           <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl group-hover:rotate-12 transition-transform">
                 <Shield className="w-4 h-4 text-white" />
              </div>
           </div>
           <h3 className="text-2xl font-black text-white px-2">John Doe</h3>
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 pr-2">Senior Product Designer</p>
           
           <div className="mt-8 w-full space-y-3">
              <button className="w-full py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                Edit Profile
              </button>
              <button className="w-full py-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                Company Docs
              </button>
           </div>
        </div>

        {/* Settings List */}
        <div className="lg:col-span-2 space-y-8">
           {sections.map((section) => (
             <div key={section.title} className="p-10 rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-3xl">
                <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8 ml-2">{section.title}</h4>
                <div className="space-y-4">
                   {section.items.map((item) => (
                     <div key={item.label} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 hover:border-indigo-500/30 hover:bg-slate-950/60 transition-all cursor-pointer">
                        <div className="flex items-center gap-5">
                           <div className={cn(
                             "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
                             item.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white" :
                             item.color === 'emerald' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white" :
                             item.color === 'rose' ? "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white" :
                             item.color === 'amber' ? "bg-amber-500/10 border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-white" :
                             "bg-slate-800 border-slate-700 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"
                           )}>
                              <item.icon className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-200 group-hover:text-white transition-colors uppercase tracking-tight">{item.label}</p>
                              <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-800 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
