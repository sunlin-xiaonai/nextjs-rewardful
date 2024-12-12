import { ReactNode } from 'react';

export interface RewardfulConfig {
  publicKey: string;
  domain?: string;
}

export interface RewardfulAffiliate {
  id: string;
  code: string;
  email?: string;
  name?: string;
  visitors?: number;
  leads?: number;
  conversions?: number;
}

export interface RewardfulVisitor {
  affiliate?: RewardfulAffiliate;
  referralCode?: string;
  isReferred: boolean;
}

export interface RewardfulProviderProps {
  config: RewardfulConfig;
  children: ReactNode;
}

export interface Commission {
  id: string;
  created_at: string;
  updated_at: string;
  amount: number;
  currency: string;
  state: 'due' | 'pending' | 'paid' | 'voided';
  due_at: string;
  paid_at: string | null;
  voided_at: string | null;
  campaign?: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  sale?: {
    id: string;
    currency: string;
    charged_at: string;
    sale_amount_cents: number;
    referral?: {
      link?: {
        url: string;
        token: string;
        visitors: number;
        leads: number;
        conversions: number;
      }
    };
  };
  affiliate: {
    id: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    paypal_email: string;
    visitors: number;
    leads: number;
    conversions: number;
    campaign?: {
      id: string;
      name: string;
    };
  };
}

export interface DashboardStats {
  visitors: number;
  leads: number;
  conversions: number;
  totalCommissions: number;
  pendingCommissions: number;
}

export interface AffiliateSignupFormData {
  email: string;
  firstName: string;
  lastName: string;
  paypalEmail: string;
  inviteCode: string;
}

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  total_count?: number;
}

export interface DashboardData {
  id: string;
  created_at: string;
  updated_at: string;
  state: string;
  first_name: string;
  last_name: string;
  email: string;
  confirmed_at: string;
  paypal_email: string | null;
  paypal_email_confirmed_at: string | null;
  wise_email: string | null;
  wise_email_confirmed_at: string | null;
  receive_new_commission_notifications: boolean;
  sign_in_count: number;
  unconfirmed_email: string | null;
  stripe_customer_id: string | null;
  stripe_account_id: string | null;
  visitors: number;
  leads: number;
  conversions: number;
  campaign?: {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
  };
  links: Array<{
    id: string;
    url: string;
    token: string;
    visitors: number;
    leads: number;
    conversions: number;
  }>;
  // coupons: any[];
  coupons?:Array<{
    id: string;
    external_id: string;
    token: string;
    leads: number;
    conversions: number;
    affiliate_id: string;
  }>;
  commission_stats: {
    currencies: {
      [key: string]: {
        unpaid: {
          cents: number;
          currency_iso: string;
        };
        due: {
          cents: number;
          currency_iso: string;
        };
        paid: {
          cents: number;
          currency_iso: string;
        };
        total: {
          cents: number;
          currency_iso: string;
        };
        gross_revenue: {
          cents: number;
          currency_iso: string;
        };
        net_revenue: {
          cents: number;
          currency_iso: string;
        };
      };
    };
  };
}

export interface LinkData {
  id: string;
  url: string;
  token: string;
  visitors: number;
  leads: number;
  conversions: number;
}

export interface CommissionStats {
  currencies: {
    [key: string]: CurrencyStats;
  };
}

export interface CurrencyStats {
  unpaid: Money;
  due: Money;
  paid: Money;
  total: Money;
  gross_revenue: Money;
  net_revenue: Money;
}

export interface Money {
  cents: number;
  currency_iso: string;
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

export interface RewardfulService {
  createAffiliate(data: {
    email: string;
    first_name: string;
    last_name: string;
    paypal_email: string;
    invite_code?: string;
  }): Promise<RewardfulAffiliate>;

  getAffiliate(id: string): Promise<RewardfulAffiliate>;
  getDashboardData(affiliateId: string): Promise<DashboardData>;
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