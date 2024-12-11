import React from 'react';
import type { FC, ReactNode } from 'react';
import { useRewardful } from './RewardfulProvider';

interface ReferralLinkProps {
  className?: string;
  baseUrl: string;
  children?: ReactNode;
}

export const ReferralLink: FC<ReferralLinkProps> = ({
  className = '',
  baseUrl,
  children,
}) => {
  const { visitor, isLoading } = useRewardful();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const referralCode = visitor?.affiliate?.code;
  const referralUrl = referralCode
    ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}via=${referralCode}`
    : baseUrl;

  return (
    <a
      href={referralUrl}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children || referralUrl}
    </a>
  );
}; 