export * from '@/components';

// 导出类型
export type {
  Commission,
  DashboardData,
  DashboardStats,
  RewardfulAffiliate,
  RewardfulVisitor,
  RewardfulConfig,
  RewardfulService,
  AffiliateSignupFormData,
  ApiResponse,
  LinkData,
  CommissionStats,
  CurrencyStats,
  Money
} from '@/types';

// 导出组件类型
export type { 
  AffiliateSignupProps,
  AffiliateDashboardCardProps 
} from '@/components';

// 导出服务和工具
export { rewardfulService } from '@/services/rewardful';
export { initRewardful } from '@/utils/rewardful';