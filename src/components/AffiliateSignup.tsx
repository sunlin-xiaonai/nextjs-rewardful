import React, { useState } from 'react';
import { rewardfulService } from '@/services/rewardful';
import type { AffiliateSignupFormData, RewardfulAffiliate } from '@/types';

// 导出 Props 接口
export interface AffiliateSignupProps {
  onSuccess?: (data: RewardfulAffiliate) => void;
}

export const AffiliateSignup: React.FC<AffiliateSignupProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<AffiliateSignupFormData>({
    email: '',
    firstName: '',
    lastName: '',
    paypalEmail: '',
    inviteCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<RewardfulAffiliate | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting form submission...');
    console.log('📝 Form Data:', formData);

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setSuccessData(null);

    try {
      console.log('📤 Sending affiliate creation request...');
      const response = await rewardfulService.createAffiliate({
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        paypal_email: formData.paypalEmail,
        invite_code: formData.inviteCode || undefined,
      });
      
      console.log('✅ Submission successful! Response:', response);
      setSuccessData(response);
      setSuccess(true);
      
      onSuccess?.(response);
      
      console.log('🧹 Clearing form...');
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        paypalEmail: '',
        inviteCode: '',
      });
    } catch (err) {
      console.error('❌ Submission failed:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      console.log('🏁 Form submission completed');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('📝 Field Change:', { field: name, value });
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex justify-center items-center  bg-indigo-50">
      {/* 成功提示 */}
      {success && successData && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg max-w-md">
          <div className="flex items-start">
            <svg className="w-6 h-6 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-medium">Successfully registered as affiliate!</p>
              <div className="mt-2 text-sm">
                <p><span className="font-medium">ID:</span> {successData.id}</p>
                <p><span className="font-medium">Code:</span> {successData.code}</p>
                {successData.name && (
                  <p><span className="font-medium">Name:</span> {successData.name}</p>
                )}
                {successData.email && (
                  <p><span className="font-medium">Email:</span> {successData.email}</p>
                )}
              </div>
              <p className="mt-2 text-xs">
                Please check your email for confirmation and next steps.
              </p>
            </div>
          </div>
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="w-[400px] bg-indigo-50 rounded shadow p-3"
      >
        <fieldset className="border-4 border-dotted border-indigo-500 p-5">
          <legend className="px-2 italic text-indigo-500 -mx-2 text-2xl">Become an Affiliate!</legend>
          
          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-500 px-4 py-3 rounded mb-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium">{error.split(':')[0]}</p>
                  {error.includes(':') && (
                    <p className="text-sm mt-1">{error.split(':')[1].trim()}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* <div className="mb-4">
            <h2 className="text-indigo-500 font-black text-2xl">Become an Affiliate</h2>
            <span className="text-indigo-400 font-semibold text-lg">Fill in your details to join</span>
          </div> */}

          {/* 表单字段 */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-indigo-500 after:content-['*'] after:text-red-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-500 after:content-['*'] after:text-red-400">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-500 after:content-['*'] after:text-red-400">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-500 after:content-['*'] after:text-red-400">
                PayPal Email
              </label>
              <input
                type="email"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-indigo-500">
                Invite Code (Optional)
              </label>
              <input
                type="text"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                className="w-full p-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500 rounded"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400 mt-4"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}; 