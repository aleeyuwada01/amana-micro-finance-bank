
export enum Language {
  EN = 'English',
  HA = 'Hausa'
}

export interface User {
  firstName: string;
  lastName: string;
  bvn: string;
  nin: string;
  isVerified: boolean;
  balance: number;
}

export interface AsusuContribution {
  userId: string;
  userName: string;
  amount: number;
  timestamp: number;
}

export interface AsusuGroup {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  members: string[];
  maxMembers: number;
  currentTurnIndex: number;
  status: 'Filling' | 'Active' | 'Completed' | 'Payout Due';
  leaderId: string;
  isWithdrawn: boolean;
  history: AsusuContribution[];
  createdAt: number;
}

export interface TranslationSet {
  welcome: string;
  savings: string;
  loans: string;
  transfer: string;
  agriLoan: string;
  tradeLoan: string;
  groupSavings: string;
  bvnPrompt: string;
  verify: string;
  trustTagline: string;
  creditScore: string;
  checkEligibility: string;
  totalBalance: string;
  addMoney: string;
  quickActions: string;
  businessLoan: string;
  billPayments: string;
  agriSupport: string;
  recentTransactions: string;
  seeAll: string;
  hikimarAmana: string;
  strategyInsight: string;
  getAdvice: string;
  asusuTitle: string;
  communitySavings: string;
  activeRotations: string;
  joinGroup: string;
  contributeNow: string;
  profileTitle: string;
  logout: string;
  trustIndex: string;
  katsinaRank: string;
  onboardingTitle: string;
  onboardingSub: string;
  secureLogin: string;
}

export type AppView = 'ONBOARDING' | 'DASHBOARD' | 'PRD' | 'SAVINGS' | 'LOANS' | 'ASUSU' | 'PROFILE' | 'LOAN_AGRI' | 'LOAN_TRADE' | 'ADD_MONEY' | 'TRANSFER';
