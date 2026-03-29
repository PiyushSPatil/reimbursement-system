import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";
import { Toaster } from "sonner";
import { Bell, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function AppLayout() {
  const location = useLocation();

  const pageTitles = {
    '/': 'Dashboard',
    '/add': 'Submit Claim',
    '/history': 'Claim History',
    '/analytics': 'Analytics',
    '/settings': 'Settings',
  };

  const activeTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className='flex bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden'>
      <Sidebar />
      <Toaster position="top-right" theme="dark" richColors closeButton />

      <main className='flex-1 ml-72 p-12 max-w-[1600px] mx-auto'>
        {/* Header */}
        <header className='mb-12 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700'>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-2xl shadow-indigo-500/5 rotate-3 hover:rotate-12 transition-transform">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h1 className='text-4xl font-black text-white tracking-tighter mb-1'>{activeTitle}</h1>
              <p className='text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2'>
                Personal Claims <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-indigo-400">March 2024 Cycle</span>
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
                <span className="text-xs font-bold text-slate-300">2 Updates</span>
              </div>
            </div>

            <div className='flex items-center gap-4 bg-indigo-500/5 p-2 rounded-[2rem] border border-indigo-500/20 backdrop-blur-md hover:bg-indigo-500/10 transition-all cursor-pointer'>
              <div className='w-12 h-12 rounded-[1.5rem] overflow-hidden border-2 border-indigo-500/30 shadow-xl'>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className='hidden md:block pr-4'>
                <p className='text-sm font-black text-white tracking-tight'>John Doe</p>
                <div className="flex items-center gap-1">
                  <span className='text-[10px] font-black text-indigo-400 uppercase tracking-widest'>Employee</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Dashboard />
              </motion.div>
            } />
            <Route path="/add" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <AddExpense />
              </motion.div>
            } />
            <Route path="/history" element={
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }}>
                <History />
              </motion.div>
            } />
            <Route path="/analytics" element={
              <motion.div initial={{ opacity: 0, rotate: -1 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 1 }} transition={{ duration: 0.3 }}>
                <Analytics />
              </motion.div>
            } />
            <Route path="/settings" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <Settings />
              </motion.div>
            } />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;