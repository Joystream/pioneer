# Local Testing Guide - SDK Integration with Pioneer

## Overview
This guide explains how to integrate the Joystream SDK with Pioneer for local testing of the staking functionality.

## Prerequisites

### 1. Local Joystream Node
First, you need a running Joystream node locally:

```bash
# Clone the Joystream repository
git clone https://github.com/Joystream/joystream.git
cd joystream

# Build the node
cargo build --release

# Run the node in development mode
./target/release/joystream-node --dev --ws-port 9944
```

### 2. SDK Package
Make sure the SDK is built and available:

```bash
cd e:\work\joystream\sdk
yarn build
```

## Integration Steps

### Step 1: Update Pioneer Package Dependencies

Add the SDK as a dependency in Pioneer:

```bash
cd e:\work\joystream\pioneer\packages\ui
yarn add @joystream/sdk-core
```

### Step 2: Update useStakingSDK Hook

Replace the mock implementation with real SDK integration:

```typescript
// pioneer/packages/ui/src/validators/hooks/useStakingSDK.ts
import { StakingManager } from '@joystream/sdk-core/staking'

export const useStakingSDK = () => {
  const { api } = useApi()

  const staking = useMemo(() => {
    if (!api) return null
    // Use real SDK instead of mock
    return new StakingManager(api)
  }, [api])

  return {
    staking,
    isConnected: !!staking,
  }
}
```

### Step 3: Update Modal Components

Update the modals to use real SDK methods:

```typescript
// Example: BondModal.tsx
const handleBond = async () => {
  if (!staking) return

  try {
    const bondTx = staking.bond(controller, joyToBalance(amount), payee)
    const txHash = await bondTx.signAndSend(allAccounts[0])
    console.log('Bond transaction submitted:', txHash)
    hideModal()
  } catch (err) {
    console.error('Bonding failed:', err)
    setError(err instanceof Error ? err.message : 'Bonding failed')
  }
}
```

### Step 4: Environment Configuration

Create environment configuration for local testing:

```bash
# pioneer/packages/ui/.env.local
REACT_APP_JOYSTREAM_ENDPOINT=ws://localhost:9944
REACT_APP_NETWORK=local
```

### Step 5: Update API Connection

Update the API connection to use local node:

```typescript
// pioneer/packages/ui/src/api/hooks/useApi.ts
const endpoint = process.env.REACT_APP_JOYSTREAM_ENDPOINT || 'ws://localhost:9944'
```

## Testing Setup

### 1. Start Local Node
```bash
# Terminal 1: Start Joystream node
cd e:\work\joystream
./target/release/joystream-node --dev --ws-port 9944
```

### 2. Start Pioneer UI
```bash
# Terminal 2: Start Pioneer UI
cd e:\work\joystream\pioneer\packages\ui
yarn start
```

### 3. Create Test Accounts
Use the Polkadot.js Apps to create test accounts:
1. Go to `http://localhost:9944` in Polkadot.js Apps
2. Create test accounts with test tokens
3. Note the account addresses and mnemonics

## Testing Workflow

### 1. Basic Connection Test
1. Open Pioneer UI at `http://localhost:3000`
2. Navigate to Validators page
3. Verify connection to local node
4. Check that validators are loaded

### 2. Staking Actions Test
Test each staking action:

#### Bond Test
1. Click "Bond" on a validator
2. Enter amount (e.g., 100 JOY)
3. Select controller account
4. Submit transaction
5. Verify transaction appears in node logs

#### Unbond Test
1. Click "Unbond" on a validator
2. Enter amount to unbond
3. Submit transaction
4. Verify unbonding period starts

#### Nominate Test
1. Click "Nominate" on a validator
2. Select validators to nominate
3. Submit transaction
4. Verify nominations are recorded

#### Validate Test
1. Click "Validate" on a validator
2. Set commission rate
3. Submit transaction
4. Verify validator status changes

#### Payout Test
1. Click "Payout" on a validator
2. Enter era number
3. Submit transaction
4. Verify rewards are claimed

#### Rebag Test
1. Click "Rebag" on a validator
2. Submit transaction
3. Verify account is rebagged

#### Rebond Test
1. Click "Rebond" on a validator
2. Enter amount to rebond
3. Submit transaction
4. Verify tokens are rebonded

## Debugging

### 1. Console Logs
Check browser console for errors:
```javascript
// Enable detailed logging
localStorage.setItem('debug', 'joystream:*')
```

### 2. Network Tab
Monitor network requests to local node:
- WebSocket connection to `ws://localhost:9944`
- RPC calls for staking queries
- Transaction submissions

### 3. Node Logs
Check node terminal for transaction processing:
```bash
# Look for transaction logs
grep "staking" /path/to/node/logs
```

## Common Issues

### 1. Connection Issues
```bash
# Check if node is running
curl -H "Content-Type: application/json" \
  -d '{"id":1, "jsonrpc":"2.0", "method": "system_health"}' \
  http://localhost:9944
```

### 2. SDK Import Issues
```bash
# Rebuild SDK
cd e:\work\joystream\sdk
yarn build

# Clear Pioneer cache
cd e:\work\joystream\pioneer\packages\ui
yarn start --reset-cache
```

### 3. Transaction Failures
- Check account has sufficient balance
- Verify account is not already bonded
- Check transaction parameters

## Advanced Testing

### 1. Multiple Accounts
Test with multiple accounts:
- Create several test accounts
- Test cross-account operations
- Verify account isolation

### 2. Edge Cases
Test edge cases:
- Insufficient balance
- Invalid parameters
- Network disconnection
- Transaction timeouts

### 3. Performance Testing
- Load test with many transactions
- Monitor memory usage
- Check for memory leaks

## Production Deployment

### 1. Update Endpoints
```typescript
// Update for production
const endpoint = process.env.REACT_APP_JOYSTREAM_ENDPOINT || 'wss://rpc.joystream.org'
```

### 2. Error Handling
Implement proper error handling:
- Network errors
- Transaction failures
- User feedback
