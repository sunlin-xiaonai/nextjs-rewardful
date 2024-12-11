import { useState } from 'react';
import { 
  rewardfulService, 
  AffiliateDashboardCard,
  type DashboardData,
  type RewardfulService 
} from 'nextjs-rewardful';

export const CommissionLookup = () => {
  const [affiliateId, setAffiliateId] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliateId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await rewardfulService.getDashboardData(affiliateId);
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (dashboardData?.links[0]?.url) {
      navigator.clipboard.writeText(dashboardData.links[0].url);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Affiliate Lookup</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={affiliateId}
            onChange={(e) => setAffiliateId(e.target.value)}
            placeholder="Enter Affiliate ID"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Look up'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {dashboardData && (
        <AffiliateDashboardCard 
          commission={dashboardData}
          onShare={handleShare}
        />
      )}
    </div>
  );
}; 