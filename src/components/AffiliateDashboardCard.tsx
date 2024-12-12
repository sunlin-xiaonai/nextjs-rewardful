import React from 'react';
import type { DashboardData } from '@/types';

export interface AffiliateDashboardCardProps {
  commission: DashboardData;
  onShare?: () => void;
}

export const AffiliateDashboardCard: React.FC<AffiliateDashboardCardProps> = ({
  commission,
  onShare
}) => {
  const { links, commission_stats } = commission;
  const primaryLink = links[0];
  const stats = commission_stats.currencies.USD;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 space-y-6">
      <fieldset className="border-4 border-dotted border-indigo-500 p-5">
          <legend className="px-2 italic text-indigo-500 -mx-2 text-2xl">Personal Information</legend>

      {/* Personal Information */}
      <div className="space-y-4">
        {/* <h2 className="text-lg font-semibold">Personal Information</h2> */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{`${commission.first_name} ${commission.last_name}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{commission.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{commission.paypal_email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(commission.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <br />

      {/* Referral Link */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Referral Link</h2>
        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded">
          <input
            type="text"
            readOnly
            value={primaryLink?.url || ''}
            className="flex-1 bg-transparent outline-none"
          />
          <button onClick={onShare} className="text-blue-600 hover:text-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-500">Visitors</div>
            <div className="font-semibold">{commission.visitors}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Leads</div>
            <div className="font-semibold">{commission.leads}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Conversions</div>
            <div className="font-semibold">{commission.conversions}</div>
          </div>
        </div>
      </div>
      <br />
      {/* Income Status */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Income Status</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600">Total Income</div>
            <div className="text-2xl font-bold text-green-700">
              ${(stats.total.cents / 100).toFixed(2)}
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-700">
              ${(stats.unpaid.cents / 100).toFixed(2)}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-600">Available</div>
            <div className="text-2xl font-bold text-yellow-700">
              ${(stats.unpaid.cents / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      </fieldset>
    </div>
  );
}; 