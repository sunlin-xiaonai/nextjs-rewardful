declare global {
  interface Window {
    rewardful: any;
  }
}

export const initRewardful = (publicKey: string) => {
  if (typeof window === 'undefined') return;

  // 检查是否已经存在脚本
  const existingScript = document.querySelector(`script[data-rewardful="${publicKey}"]`);
  if (existingScript) {
    console.log('Rewardful script already exists');
    return;
  }

  console.log('Adding Rewardful script with key:', publicKey);
  
  // 添加 Rewardful 脚本
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://r.wdfl.co/rw.js';
  script.dataset.rewardful = publicKey;
  
  // 添加加载事件监听
  script.onload = () => {
    console.log('Rewardful script loaded');
  };
  script.onerror = (error) => {
    console.error('Error loading Rewardful script:', error);
  };

  document.head.appendChild(script);
}; 