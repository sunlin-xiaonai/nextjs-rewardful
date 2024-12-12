// import { useState } from 'react';
// import { rewardfulService } from '@/services/rewardful';
// import type { Payout } from '@/types';

// export const PayoutLookup = () => {
//   const [affiliateId, setAffiliateId] = useState('');
//   const [payouts, setPayouts] = useState<Payout[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!affiliateId.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await rewardfulService.getPayouts({
//         affiliate_id: affiliateId,
//         expand: ['affiliate', 'commissions']
//       });
      
//       console.log('Payouts data:', response.data);
//       setPayouts(response.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch payouts');
//       console.error('Error fetching payouts:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Payout Lookup</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             value={affiliateId}
//             onChange={(e) => setAffiliateId(e.target.value)}
//             placeholder="Enter Affiliate ID"
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 disabled:opacity-50"
//         >
//           {isLoading ? 'Loading...' : 'Search Payouts'}
//         </button>
//       </form>

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       )}

//       {payouts.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-3">Payout Results</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {payouts.map((payout) => (
//                   <tr key={payout.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     ${(payout.amount / 100).toFixed(2)} {payout.currency}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${payout.state === 'paid' ? 'bg-green-100 text-green-800' : 
//                           payout.state === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                           'bg-gray-100 text-gray-800'}`}>
//                         {payout.state}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {new Date(payout.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {payout.state !== 'paid' && (
//                         <button
//                           onClick={async () => {
//                             try {
//                               await rewardfulService.markPayoutAsPaid(payout.id);
//                               // Refresh the payouts list
//                               handleSubmit(new Event('submit') as any);
//                             } catch (err) {
//                               console.error('Error marking payout as paid:', err);
//                             }
//                           }}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           Mark as Paid
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState } from 'react';
import { rewardfulService } from '@/services/rewardful';
import type { Payout } from '@/types';

export const PayoutLookup = () => {
  const [affiliateId, setAffiliateId] = useState('');
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliateId.trim()) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await rewardfulService.getPayouts({
        affiliate_id: affiliateId,
        expand: ['affiliate', 'commissions']
      });
      
      console.log('Payouts data:', response.data);
      setPayouts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payouts');
      console.error('Error fetching payouts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsPaid = async (payoutId: string) => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      const updatedPayout = await rewardfulService.markPayoutAsPaid(payoutId);
      console.log('Marked as paid:', updatedPayout);
      
      // 更新本地数据状态
      setPayouts(currentPayouts => 
        currentPayouts.map(payout => 
          payout.id === payoutId 
            ? { ...payout, state: 'paid' } 
            : payout
        )
      );
      
      // 显示成功消息
      setSuccessMessage(`Successfully marked payout ${payoutId} as paid`);
      
      // 3秒后自动清除成功消息
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark payout as paid');
      console.error('Error marking payout as paid:', err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Payout Lookup</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={affiliateId}
            onChange={(e) => setAffiliateId(e.target.value)}
            placeholder="Enter Affiliate ID"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Search Payouts'}
        </button>
      </form>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* 成功提示 */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {payouts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Payout Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payouts.map((payout) => (
                  <tr key={payout.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${(payout.amount / 100).toFixed(2)} {payout.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${payout.state === 'paid' ? 'bg-green-100 text-green-800' : 
                          payout.state === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {payout.state}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(payout.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {payout.state !== 'paid' && (
                        <button
                          onClick={() => handleMarkAsPaid(payout.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};