'use client';

import { 
  ReferralLink, 
  useRewardful, 
  AffiliateSignup, 
  AffiliateDashboardCard,
  type RewardfulAffiliate,
  type DashboardData,
  type RewardfulVisitor,
  type RewardfulService,
  rewardfulService
} from 'nextjs-rewardful';
import { useState, useEffect } from 'react';
import { AffiliatesList } from '../components/AffiliatesList';
import { CommissionLookup } from '../components/CommissionLookup';
import { PayoutLookup } from '../components/PayoutLookup';

export default function Home() {
  const { visitor, isLoading, error } = useRewardful();
  const [newAffiliate, setNewAffiliate] = useState<RewardfulAffiliate | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const handleAffiliateSuccess = (data: RewardfulAffiliate) => {
    console.log('🎉 New Affiliate Created:', data);
    setNewAffiliate(data);
  };

  const handleShare = () => {
    console.log('Share clicked');
  };

  useEffect(() => {
    if (visitor?.affiliate?.id) {
      rewardfulService.getDashboardData(visitor.affiliate.id)
        .then(data => {
          setDashboardData(data);
        })
        .catch(console.error);
    }
  }, [visitor?.affiliate?.id]);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Affiliate Program</h1>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : visitor?.affiliate && dashboardData ? (
          <div className="space-y-8">
            <AffiliateDashboardCard 
              commission={dashboardData}
              onShare={handleShare}
            />

            <div className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Referral Links</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Share this link:</h3>
                  <ReferralLink
                    baseUrl="https://example.com"
                    className="text-blue-500 hover:underline"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <AffiliatesList />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Become an Affiliate</h2>
                <AffiliateSignup onSuccess={handleAffiliateSuccess} />
              </div>
              <CommissionLookup />
              <PayoutLookup />
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 