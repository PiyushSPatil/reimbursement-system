import React, { useState } from "react";
import { PlusCircle, IndianRupee, FileText, Calendar, Upload, ArrowUpRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AddExpense() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Transport",
    date: new Date().toISOString().split('T')[0]
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsScanning(true);
        // Simulate OCR scanning
        setTimeout(() => {
          setIsScanning(false);
          toast.info("AI Analysis Complete", { 
            description: "Receipt data extracted automatically.",
            icon: <Sparkles className="w-4 h-4 text-indigo-400" />
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isScanning) return;
    
    toast.success("Expense claim submitted!", { 
      description: "Manager will review it shortly.",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    });
    
    // Reset form
    setFormData({ 
      description: "", 
      amount: "", 
      category: "Transport", 
      date: new Date().toISOString().split('T')[0] 
    });
    setSelectedImage(null);
  };

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/50 p-10 backdrop-blur-xl bg-slate-900/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-xl shadow-indigo-500/5">
              <PlusCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">New Reimbursement Claim</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
                Secure Submission Portal <span className="w-1 h-1 rounded-full bg-slate-700" /> AI-Powered Verification
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block">Expense Description</label>
                <div className="flex items-center gap-4 bg-slate-950/50 p-5 rounded-[1.5rem] border border-slate-800/50 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                  <FileText className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g., Client Lunch at Starbucks"
                    className="bg-transparent border-none outline-none text-white font-bold w-full text-sm placeholder:text-slate-700"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block">Amount (INR)</label>
                <div className="flex items-center gap-4 bg-slate-950/50 p-5 rounded-[1.5rem] border border-slate-800/50 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                  <IndianRupee className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="bg-transparent border-none outline-none text-white text-xl font-black w-full placeholder:text-slate-800"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block">Category</label>
                <div className="flex items-center gap-4 bg-slate-950/50 p-5 rounded-[1.5rem] border border-slate-800/50 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all relative">
                  <select
                    className="bg-transparent border-none outline-none text-white font-bold w-full appearance-none cursor-pointer text-sm z-10"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option className="bg-slate-950">Transport</option>
                    <option className="bg-slate-950">Food & Beverage</option>
                    <option className="bg-slate-950">Stationery</option>
                    <option className="bg-slate-950">IT Services</option>
                    <option className="bg-slate-950">Accommodation</option>
                    <option className="bg-slate-950">Others</option>
                  </select>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 absolute right-5 rotate-45" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-2 block">Transaction Date</label>
                <div className="flex items-center gap-4 bg-slate-950/50 p-5 rounded-[1.5rem] border border-slate-800/50 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                  <Calendar className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  <input
                    type="date"
                    className="bg-transparent border-none outline-none text-white font-bold w-full text-sm [color-scheme:dark]"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="relative group">
              <input 
                type="file" 
                id="receipt-upload" 
                className="hidden" 
                onChange={handleImageChange}
                accept="image/*"
              />
              <label 
                htmlFor="receipt-upload"
                className={cn(
                  "p-12 rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden relative min-h-[300px]",
                  selectedImage ? "border-indigo-500/50 bg-slate-900/60" : "border-slate-800 bg-slate-950/20 hover:bg-slate-900/40 hover:border-indigo-500/30"
                )}
              >
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div 
                      key="scanning"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col items-center gap-6"
                    >
                      <div className="relative">
                        <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
                        <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-black text-sm uppercase tracking-[0.2em] mb-1">AI Engine Analysis</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Extracting Merchant & Amount...</p>
                      </div>
                    </motion.div>
                  ) : selectedImage ? (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full flex flex-col items-center gap-6"
                    >
                      <div className="relative group/img">
                        <div className="w-40 h-52 rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl transition-transform group-hover/img:scale-105 duration-500">
                          <img src={selectedImage} alt="Receipt Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-xl">
                           <Upload className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl shadow-lg shadow-emerald-500/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Receipt Verified & Linked</span>
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Tap to upload different image</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-[2rem] bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-500 shadow-xl">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <h4 className="text-white font-black text-lg mb-1 tracking-tight">Upload Digital Receipt</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Maximum File Size: 5MB (PDF, JPG, PNG)</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isScanning && (
                   <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 w-full h-1.5 bg-indigo-400/50 shadow-[0_0_30px_rgba(99,102,241,1)] z-10"
                   />
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={isScanning}
              className="w-full py-6 rounded-[2rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 active:scale-[0.98] flex items-center justify-center gap-4 overflow-hidden group relative disabled:opacity-50 disabled:grayscale"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isScanning ? (
                <>AI PROCESSING <Loader2 className="w-5 h-5 animate-spin" /></>
              ) : (
                <>SUBMIT CLAIM <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}