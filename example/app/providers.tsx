'use client';

import { RewardfulProvider } from 'nextjs-rewardful';

export function Providers({ children }: { children: React.ReactNode }) {
  const publicKey = process.env.NEXT_PUBLIC_REWARDFUL_API_KEY;
  
  // 添加环境变量检查
  if (!publicKey) {
    return <div>Error: Rewardful API key not found in environment variables</div>;
  }

  return (
    <RewardfulProvider 
      config={{ 
        publicKey: publicKey
      }}
    >
      {children}
    </RewardfulProvider>
  );
} 