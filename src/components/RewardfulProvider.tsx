import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { RewardfulConfig, RewardfulVisitor } from '../types';
import { initRewardful } from '../utils/rewardful';

// 导出 Props 类型
export interface RewardfulProviderProps {
  config: RewardfulConfig;
  children: ReactNode;
}

interface RewardfulContextType {
  visitor: RewardfulVisitor | null;
  isLoading: boolean;
  error: Error | null;
}

const RewardfulContext = createContext<RewardfulContextType>({
  visitor: null,
  isLoading: true,
  error: null,
});

export const useRewardful = () => {
  const context = useContext(RewardfulContext);
  if (!context) {
    throw new Error('useRewardful must be used within a RewardfulProvider');
  }
  return context;
};

export const RewardfulProvider: FC<RewardfulProviderProps> = ({ config, children }) => {
  const [visitor, setVisitor] = useState<RewardfulVisitor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('Starting Rewardful initialization...');
    const initializeRewardful = async () => {
      try {
        console.log('Config:', config);
        initRewardful(config.publicKey);

        let attempts = 0;
        const maxAttempts = 10;

        const checkRewardful = () => {
          console.log('Checking Rewardful...', attempts);
          if (window.rewardful) {
            console.log('Rewardful loaded:', window.rewardful);
            setVisitor({
              affiliate: window.rewardful.affiliate,
              referralCode: window.rewardful.referral,
              isReferred: !!window.rewardful.referral,
            });
            setIsLoading(false);
          } else {
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(checkRewardful, 500);
            } else {
              setError(new Error('Rewardful initialization timeout'));
              setIsLoading(false);
            }
          }
        };

        checkRewardful();
      } catch (err) {
        console.error('Rewardful initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize Rewardful'));
        setIsLoading(false);
      }
    };

    initializeRewardful();
  }, [config.publicKey]);

  if (isLoading) {
    return <div>
      <p>Loading Rewardful...</p>
      <p>Public Key: {config.publicKey}</p>
    </div>;
  }

  if (error) {
    return <div>
      <p>Error initializing Rewardful: {error.message}</p>
      <p>Public Key: {config.publicKey}</p>
    </div>;
  }

  return (
    <RewardfulContext.Provider value={{ visitor, isLoading, error }}>
      {children}
    </RewardfulContext.Provider>
  );
}; 