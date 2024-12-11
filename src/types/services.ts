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
} 