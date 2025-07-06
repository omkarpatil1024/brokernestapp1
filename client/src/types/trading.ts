export interface Broker {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export interface StockData {
  symbol: string;
  ltp: number;
  change: number;
  changePercent: number;
  companyName: string;
}

export interface PortfolioSummary {
  totalValue: string;
  totalInvested: string;
  totalPnL: string;
  pnlPercentage: string;
  realizedPnL: string;
  unrealizedPnL: string;
  todaysPnL: string;
  todaysLoss: string;
}

export interface OrderFormData {
  symbol: string;
  orderType: 'BUY' | 'SELL';
  orderMode: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  product: 'CNC' | 'MIS' | 'NRML';
  quantity: number;
  price?: number;
}

export interface User {
  id: number;
  username: string;
  broker: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type Stock = {
  symbol: string;
  ltp: number;
  companyName?: string;
};