import { Expense } from '../types';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    employeeName: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&h=256&auto=format&fit=crop',
    amount: 1250.00,
    currency: 'USD',
    convertedAmount: '₹1,04,250.00',
    category: 'Travel',
    status: 'Pending',
    approvalStep: 'Manager',
    date: '2024-03-28',
    description: 'Round-trip flight to Q1 Global Tech Conference in San Francisco.',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    employeeName: 'Michael Rossi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop',
    amount: 85.50,
    currency: 'EUR',
    convertedAmount: '₹7,850.00',
    category: 'Meals',
    status: 'Pending',
    approvalStep: 'Manager',
    date: '2024-03-27',
    description: 'Dinner with the Southside Project stakeholders at Trattoria Romano.',
    receiptUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    employeeName: 'Aisha Gupta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop',
    amount: 1499.99,
    currency: 'USD',
    convertedAmount: '₹1,25,099.00',
    category: 'Software',
    status: 'Approved',
    approvalStep: 'Finance',
    date: '2024-03-25',
    description: 'Annual enterprise subscription for Adobe Creative Cloud Suite.',
  },
  {
    id: '4',
    employeeName: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop',
    amount: 45.00,
    currency: 'USD',
    convertedAmount: '₹3,750.00',
    category: 'Equipment',
    status: 'Rejected',
    approvalStep: 'Manager',
    date: '2024-03-24',
    description: 'Ergonomic mouse for home office setup.',
  },
  {
    id: '5',
    employeeName: 'Elena Soto',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop',
    amount: 320.00,
    currency: 'GBP',
    convertedAmount: '₹33,600.00',
    category: 'Hotel',
    status: 'Pending',
    approvalStep: 'Manager',
    date: '2024-03-22',
    description: 'One night stay at The Ritz London for client presentation.',
    receiptUrl: 'https://images.unsplash.com/photo-1568584263425-bb91ae467f8d?q=80&w=800&auto=format&fit=crop'
  }
];

