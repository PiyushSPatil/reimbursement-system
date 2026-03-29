import axios from 'axios';
import { Expense, DashboardStats } from '../types';
import { mockExpenses } from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getExpenses: async (): Promise<Expense[]> => {
    await delay(800);
    return [...mockExpenses];
  },

  getStats: async (): Promise<DashboardStats> => {
    await delay(500);
    const pending = mockExpenses.filter(e => e.status === 'Pending').length;
    const approved = mockExpenses.filter(e => e.status === 'Approved').length;
    const rejected = mockExpenses.filter(e => e.status === 'Rejected').length;
    
    return {
      pendingCount: pending,
      approvedMonth: approved,
      rejectedMonth: rejected
    };
  },

  approveExpense: async (id: string, comment: string): Promise<boolean> => {
    await delay(1200);
    console.log(`Approving expense ${id} with comment: ${comment}`);
    return true;
  },

  rejectExpense: async (id: string, comment: string): Promise<boolean> => {
    await delay(1200);
    console.log(`Rejecting expense ${id} with comment: ${comment}`);
    return true;
  }
};
