import axios, { AxiosInstance } from 'axios';
import type { RewardfulAffiliate, Commission, DashboardData } from '@/types';

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
  getAllAffiliates(): Promise<{ data: RewardfulAffiliate[]; total_count: number; }>;
}

class RewardfulServiceImpl implements RewardfulService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api/rewardful',
    });

    this.api.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response) {
          throw new Error(
            (error.response.data as { error: string })?.error || 'API request failed'
          );
        }
        throw error;
      }
    );
  }

  async createAffiliate(data: {
    email: string;
    first_name: string;
    last_name: string;
    paypal_email: string;
    invite_code?: string;
  }): Promise<RewardfulAffiliate> {
    return this.api.post('?path=/affiliates', data);
  }

  async getAffiliate(id: string): Promise<RewardfulAffiliate> {
    return this.api.get(`?path=/affiliates/${id}`);
  }

  async getCommissions(affiliateId: string): Promise<{
    data: Commission[];
    total_count: number;
  }> {
    return this.api.get(`?path=/commissions`, {
      params: { 
        path: '/commissions',
        affiliate_id: affiliateId 
      }
    });
  }

  async getStats(affiliateId: string): Promise<{
    visitors: number;
    leads: number;
    conversions: number;
  }> {
    return this.api.get(`?path=/affiliates/${affiliateId}/stats`);
  }

  // 获取所有分销员列表
  async getAllAffiliates(): Promise<{
    data: RewardfulAffiliate[];
    total_count: number;
  }> {
    return this.api.get('', {
      params: {
        path: '/affiliates',
        expand: ['stats']
      }
    });
  }

  // 获取单个佣金详情
  async getCommissionById(id: string): Promise<Commission> {
    return this.api.get('', {
      params: {
        path: `/commissions/${id}`,
      }
    });
  }

  // 获取分销员仪表盘数据
  async getDashboardData(affiliateId: string): Promise<DashboardData> {
    return this.api.get('', {
      params: {
        path: `/affiliates/${affiliateId}`,
      }
    });
  }
}

export const rewardfulService = new RewardfulServiceImpl(); 