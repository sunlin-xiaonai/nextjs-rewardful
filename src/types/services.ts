import type { RewardfulAffiliate, Commission, DashboardData } from './index';

export interface RewardfulService {
  createAffiliate(data: {
    email: string;
    first_name: string;
    last_name: string;
    paypal_email: string;
    invite_code?: string;
  }): Promise<RewardfulAffiliate>;

  getAffiliate(id: string): Promise<RewardfulAffiliate>;

  getCommissions(affiliateId: string): Promise<{
    data: Commission[];
    total_count: number;
  }>;

  getStats(affiliateId: string): Promise<{
    visitors: number;
    leads: number;
    conversions: number;
  }>;

  getAllAffiliates(): Promise<{
    data: RewardfulAffiliate[];
    total_count: number;
  }>;

  getCommissionById(id: string): Promise<Commission>;

  getDashboardData(affiliateId: string): Promise<DashboardData>;

  // 获取支付记录列表
  getPayouts(params?: {
    affiliate_id?: string;
    state?: Array<'pending' | 'due' | 'processing' | 'paid'>;
    expand?: Array<'affiliate' | 'commissions'>;
  }): Promise<{
    data: Payout[];
    total_count: number;
  }>;

  // 标记支付已完成
  markPayoutAsPaid(payoutId: string): Promise<Payout>;
} 

export interface Payout {
  id: string;
  currency: string;
  paid_at: string | null;
  state: 'pending' | 'due' | 'processing' | 'paid';
  paid_by_id: string | null;
  created_at: string;
  updated_at: string;
  amount: number;
  affiliate?: RewardfulAffiliate;
  commissions?: Commission[];
}