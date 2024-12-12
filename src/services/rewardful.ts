import axios, { AxiosInstance } from 'axios';
import type { RewardfulAffiliate, DashboardData, Payout} from '@/types';

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

  // 创建分销员
  async createAffiliate(data: {
    email: string;
    first_name: string;
    last_name: string;
    paypal_email: string;
    invite_code?: string;
  }): Promise<RewardfulAffiliate> {
    return this.api.post('?path=/affiliates', data);
  }

  // 获取分销员详情
  async getAffiliate(id: string): Promise<RewardfulAffiliate> {
    return this.api.get(`?path=/affiliates/${id}`);
  }

  /*
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

  // 获取单个佣金详情
  async getCommissionById(id: string): Promise<Commission> {
    return this.api.get('', {
      params: {
        path: `/commissions/${id}`,
      }
    });
  }

  */

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

  // 获取分销员仪表盘数据
  async getDashboardData(affiliateId: string): Promise<DashboardData> {
    return this.api.get('', {
      params: {
        path: `/affiliates/${affiliateId}`,
      }
    });
  }

  // 获取支付记录列表
  // async getPayouts(params?: {
  //   affiliate_id?: string;
  //   state?: Array<'pending' | 'due' | 'processing' | 'paid'>;
  //   expand?: Array<'affiliate' | 'commissions'>;
  // }) {
  //   return this.api.get('', {
  //     params: {
  //       path: '/payouts',
  //       affiliate_id: params?.affiliate_id,
  //       state: params?.state,
  //       expand: params?.expand
  //     }
  //   });
  // }

  async getPayouts(params?: {
    affiliate_id?: string;
    state?: Array<'pending' | 'due' | 'processing' | 'paid'>;
    expand?: Array<'affiliate' | 'commissions'>;
  }) {
    // 构建查询参数字符串
    const queryParams = new URLSearchParams();
    
    // 如果有 affiliate_id，直接添加到路径参数中
    const basePath = '/payouts';
    if (params?.affiliate_id) {
      queryParams.append('affiliate_id', params.affiliate_id);
    }
    if (params?.state) {
      params.state.forEach(state => queryParams.append('state[]', state));
    }
    if (params?.expand) {
      params.expand.forEach(item => queryParams.append('expand[]', item));
    }

    // 构建完整的路径
    const fullPath = `${basePath}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    return this.api.get('', {
      params: {
        path: fullPath
      }
    });
  }

  // 标记支付已完成
  async markPayoutAsPaid(payoutId: string): Promise<Payout> {
    return this.api.put('', null, {
      params: {
        path: `/payouts/${payoutId}/pay`
      }
    });
  }

}

export const rewardfulService = new RewardfulServiceImpl(); 