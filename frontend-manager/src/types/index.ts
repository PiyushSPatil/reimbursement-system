export type Status = 'Pending' | 'Approved' | 'Rejected';
export type ApprovalStep = 'Manager' | 'Finance' | 'Director';

export interface Expense {
  id: string;
  employeeName: string;
  amount: number;
  currency: string;
  convertedAmount: string;
  category: string;
  status: Status;
  approvalStep: ApprovalStep;
  date: string;
  description: string;
  receiptUrl?: string;
  avatar?: string;
}

export interface DashboardStats {
  pendingCount: number;
  approvedMonth: number;
  rejectedMonth: number;
}

