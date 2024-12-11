# NextJS Rewardful

A NextJS component library for easy integration with Rewardful affiliate and referral system.

## Installation

```bash
npm install nextjs-rewardful
# or
yarn add nextjs-rewardful
```

## Usage

1. Wrap your application with RewardfulProvider:

```tsx
import { RewardfulProvider } from 'nextjs-rewardful';

function App({ Component, pageProps }) {
  return (
    <RewardfulProvider config={{ publicKey: 'your-rewardful-public-key' }}>
      <Component {...pageProps} />
    </RewardfulProvider>
  );
}

export default App;
```

2. Use the ReferralLink component or useRewardful hook in your components:

```tsx
import { ReferralLink, useRewardful } from 'nextjs-rewardful';

// Using ReferralLink component
function MyComponent() {
  return (
    <ReferralLink baseUrl="https://your-website.com/pricing">
      Check out our pricing
    </ReferralLink>
  );
}

// Using useRewardful hook
function AnotherComponent() {
  const { visitor, isLoading, error } = useRewardful();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {visitor?.isReferred ? (
        <p>Referred by: {visitor.affiliate?.name}</p>
      ) : (
        <p>Not referred</p>
      )}
    </div>
  );
}
```

## Features

- Easy integration with NextJS applications
- TypeScript support
- Automatic referral code handling
- Simple and reusable components
- Custom hooks for accessing referral data

## API Reference

### RewardfulProvider

The main provider component that initializes Rewardful and provides context to child components.

Props:
- `config`: RewardfulConfig
  - `publicKey`: string (required) - Your Rewardful public key
  - `domain`: string (optional) - Custom domain for Rewardful

### ReferralLink

A component that automatically adds referral codes to URLs.

Props:
- `baseUrl`: string (required) - The base URL to add the referral code to
- `className`: string (optional) - CSS classes to apply to the link
- `children`: ReactNode (optional) - Content to display inside the link

### useRewardful

A hook that provides access to the current visitor's referral information.

Returns:
- `visitor`: RewardfulVisitor | null
- `isLoading`: boolean
- `error`: Error | null

## License

MIT 