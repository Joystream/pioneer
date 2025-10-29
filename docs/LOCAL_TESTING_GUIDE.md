# Local Testing Guide - Real SDK Integration with Pioneer

## Overview

This guide explains how to test the **real Joystream SDK staking functionality** locally with Pioneer UI. The SDK is now production-ready with all features implemented!

**Status:** ✅ SDK is production-ready with 15 extrinsics, 12+ queries, and full test coverage.

---

## Prerequisites

### Required Software

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)
- **Git**
- **Local Joystream node** OR access to testnet

### Workspace Setup

---

## Quick Start (TL;DR)

### 1. Link SDK to Pioneer

```bash
# Build and link SDK
cd  \joystream\sdk
yarn build
yarn link

# Link in Pioneer
cd  \joystream\pioneer\packages\ui
yarn link @joystream/sdk-core
```

### 2. Update Hook

Edit `src/validators/hooks/useStakingSDK.ts`:

```typescript
import { StakingManager } from '@joystream/sdk-core/staking'

const staking = useMemo(() => {
  if (!api) return null
  return new StakingManager(api) // Real SDK!
}, [api])
```

### 3. Start Testing

```bash
# Terminal 1: Start local node (optional)
cd \joystream\sdk\test-setup
./up.sh

# Terminal 2: Start Pioneer
cd \joystream\pioneer\packages\ui
yarn dev

# Open browser: http://localhost:3000
```

---

## Detailed Setup Instructions

### Option A: Test with Local Node

#### Step 1: Start Local Joystream Node

Using the SDK test setup:

```bash
cd  \joystream\sdk\test-setup

# Start all services (node + orion)
./up.sh

# Or start just the node
docker-compose -f docker-compose.node.yml up
```

**Expected Output:**

```
✅ Starting Joystream node...
✅ Node is running on ws://localhost:9944
✅ Chain is producing blocks
```

**Verify Node is Running:**

```bash
# Test RPC endpoint
curl -H "Content-Type: application/json" \
  -d '{"id":1, "jsonrpc":"2.0", "method": "system_health"}' \
  http://localhost:9944

# Expected response:
# {"jsonrpc":"2.0","result":{"peers":0,"isSyncing":false},"id":1}
```

#### Step 2: Configure Pioneer for Local Node

Create or update `.env.local`:

```bash
cd  \joystream\pioneer\packages\ui

# Create environment file
cat > .env.local << EOF
REACT_APP_JOYSTREAM_ENDPOINT=ws://localhost:9944
REACT_APP_NETWORK=local
REACT_APP_DEBUG=true
EOF
```

### Option B: Test with Testnet

#### Step 1: Configure for Testnet

```bash
cd  \joystream\pioneer\packages\ui

# Create environment file
cat > .env.local << EOF
REACT_APP_JOYSTREAM_ENDPOINT=wss://testnet.joystream.org/rpc
REACT_APP_NETWORK=testnet
REACT_APP_DEBUG=true
EOF
```

**Note:** Testnet requires no local node setup!

---

## Integration Steps

### Step 1: Install/Link SDK Package

#### Method A: Link Local Development Version (Recommended for Testing)

```bash
# Build SDK
cd  \joystream\sdk
yarn install
yarn build

# Verify build succeeded
ls packages/core/lib/staking/

# Link SDK
yarn link

# Link in Pioneer
cd  \joystream\pioneer\packages\ui
yarn link @joystream/sdk-core

# Verify link
yarn list @joystream/sdk-core
```

#### Method B: Install from npm

```bash
cd  \joystream\pioneer\packages\ui
yarn add @joystream/sdk-core@latest
```

### Step 2: Update useStakingSDK Hook

**File:** `\joystream\pioneer\packages\ui\src\validators\hooks\useStakingSDK.ts`

**Replace** the mock implementation (lines 1-94) with:

```typescript
import { useMemo } from 'react'
import { StakingManager } from '@joystream/sdk-core/staking'
import { useApi } from '@/api/hooks/useApi'

/**
 * Hook for accessing the Joystream SDK Staking Manager
 * NOW USING REAL SDK - Production ready!
 */
export const useStakingSDK = () => {
  const { api } = useApi()

  const staking = useMemo(() => {
    if (!api) return null
    // Real SDK integration
    return new StakingManager(api)
  }, [api])

  return {
    staking,
    isConnected: !!staking,
  }
}
```

**✅ Other hooks need NO changes!** They're already compatible with the real SDK.

### Step 3: Clear Cache and Rebuild

```bash
cd \joystream\pioneer\packages\ui

# Clear build cache
rm -rf node_modules/.cache

# Restart development server
yarn dev
```

---

## Testing Workflow

### 1. Start Development Environment

#### Terminal 1: Local Node (if using local setup)

```bash
cd  \joystream\sdk\test-setup
./up.sh

# Monitor logs
docker logs -f joystream-node
```

#### Terminal 2: Pioneer UI

```bash
cd  \joystream\pioneer\packages\ui
yarn dev
```

**Wait for:**

```
Compiled successfully!
Local: http://localhost:3000
```

### 2. Open Browser and Test Connection

#### Step 2.1: Open Pioneer UI

Navigate to: `http://localhost:3000`

#### Step 2.2: Open Browser DevTools

Press `F12` to open DevTools, go to Console tab

#### Step 2.3: Check Connection

**Expected Console Output:**

```javascript
✅ Connecting to Joystream network...
✅ Connected to ws://localhost:9944
✅ API initialized
✅ Staking SDK initialized with real StakingManager
```

**No errors should appear!**

#### Step 2.4: Navigate to Validators Page

Click "Validators" in navigation

**Expected:**

- ✅ Validators list loads
- ✅ Shows real validators from chain (not 3 hardcoded mocks)
- ✅ Real data displays (commission, stake, nominators)
- ✅ No loading errors

---

## Testing Features

### Test 1: Query Methods (Read Operations)

#### Test: Get Validators List

```typescript
// In browser console:
const { getValidators } = useStakingQueries()
const validators = await getValidators()
console.log('Validators:', validators)

// Expected: Array of real validators with:
// - account addresses
// - commission rates
// - total stake
// - nominator counts
// - era points
```

#### Test: Get Staking Parameters

```typescript
const { getStakingParams } = useStakingQueries()
const params = await getStakingParams()
console.log('Params:', params)

// Expected: Real chain parameters:
// - minBond: actual minimum bond amount
// - bondingDuration: actual era count
// - maxNominations: actual max count
```

#### Test: Get Account Staking Info

```typescript
const { getStakingInfo } = useStakingQueries()
const info = await getStakingInfo('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
console.log('Staking info:', info)

// Expected: Real account data or null if not staking
```

### Test 2: Validation Methods

#### Test: Can Bond Check

```typescript
const { canBond } = useStakingValidation()
const result = await canBond(accountId, 1000000000000n) // 100 JOY
console.log('Can bond:', result)

// Expected:
// { canBond: true } or { canBond: false, reason: "Insufficient balance" }
```

#### Test: Can Nominate Check

```typescript
const { canNominate } = useStakingValidation()
const targets = ['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY']
const result = await canNominate(accountId, targets)
console.log('Can nominate:', result)

// Expected: Validation result with reason if false
```

### Test 3: Transaction Methods (Write Operations)

**⚠️ WARNING: Only test transactions on local node or testnet with test tokens!**

#### Test: Create Bond Transaction

**In Pioneer UI:**

1. Connect a test account with tokens
2. Navigate to Validators page
3. Click "Bond" button
4. Fill in form:
   - Amount: 100 JOY
   - Controller: (select account)
   - Payee: Staked
5. Click "Submit"
6. Sign transaction in wallet

**Expected:**

- ✅ Transaction creates successfully
- ✅ Confirmation modal appears
- ✅ Transaction processes on-chain
- ✅ Bonded amount updates

**In Console:**

```javascript
✅ Creating bond transaction...
✅ Transaction submitted: 0x1234...
✅ Transaction included in block: #123
✅ Bond successful
```

**In Node Logs (if local):**

```bash
💸 Imported #123 (0x1234...)
✅ staking.Bonded { stash: 5Grw..., amount: 1000000000000 }
```

#### Test: Create Nominate Transaction

1. Ensure account is bonded
2. Click "Nominate" button
3. Select validators (1-16 validators)
4. Submit transaction

**Expected:**

- ✅ Transaction succeeds
- ✅ Nominations are recorded
- ✅ Shows in account info

#### Test: Create Unbond Transaction

1. Click "Unbond" on bonded amount
2. Enter amount to unbond
3. Submit transaction

**Expected:**

- ✅ Unbonding starts
- ✅ Shows unbonding period (e.g., 28 eras)
- ✅ Amount locked until period ends

### Test 4: UI Components

#### Test: ValidatorsList Component

**Location:** `src/validators/components/ValidatorsList.tsx`

**Test:**

1. Navigate to Validators page
2. Verify list loads with real data
3. Check pagination works
4. Test search/filter functionality

**Expected:**

- ✅ Shows all active validators
- ✅ Real data for each validator
- ✅ Cards are clickable
- ✅ No mock data appears

#### Test: ValidatorCard Component

**Location:** `src/validators/modals/validatorCard/ValidatorCard.tsx`

**Test:**

1. Click on a validator card
2. Modal opens with validator details
3. Verify all information is real

**Expected:**

- ✅ Commission rate (real)
- ✅ Total stake (real)
- ✅ Own stake (real)
- ✅ Nominator count (real)
- ✅ Era points (real)

#### Test: Transaction Modals

Test these modals work with real SDK:

- ✅ Bond Modal
- ✅ Unbond Modal
- ✅ Nominate Modal
- ✅ Withdraw Modal
- ✅ Rebond Modal

---

## Debugging

### Enable Debug Logging

```javascript
// In browser console:
localStorage.setItem('debug', 'joystream:*')
// Reload page
```

### Check API Connection

```javascript
// In browser console:
const api = useApi().api
console.log('API connected:', api?.isConnected)
console.log('API ready:', api?.isReady)
console.log('Network:', api?.runtimeChain?.toString())
console.log('Version:', api?.runtimeVersion?.specVersion?.toString())
```

### Check SDK Instance

```javascript
// In browser console:
const { staking, isConnected } = useStakingSDK()
console.log('Staking SDK:', staking)
console.log('Is connected:', isConnected)
console.log('SDK methods:', Object.keys(staking))
```

### Monitor Network Requests

1. Open DevTools → Network tab
2. Filter by "WS" (WebSocket)
3. Look for connection to `ws://localhost:9944`
4. Monitor RPC calls

**Expected WebSocket Messages:**

```json
// Outgoing (request):
{"id":1,"jsonrpc":"2.0","method":"staking_validators","params":[]}

// Incoming (response):
{"id":1,"jsonrpc":"2.0","result":[...validators...]}
```

### Check Node Logs

```bash
# If using local node
docker logs -f joystream-node | grep staking

# Look for:
# - Transaction submissions
# - Block production
# - Staking events
```

---

## Common Issues and Solutions

### Issue 1: "Cannot find module '@joystream/sdk-core/staking'"

**Cause:** SDK not installed or linked properly

**Solution:**

```bash
cd \joystream\sdk
yarn build
yarn link

cd \joystream\pioneer\packages\ui
yarn link @joystream/sdk-core

# Verify
ls node_modules/@joystream/sdk-core/lib/staking/

# Restart Pioneer
yarn dev
```

### Issue 2: "StakingManager is not a constructor"

**Cause:** Wrong import or old SDK version

**Solution:**

```typescript
// Check import is correct:
import { StakingManager } from '@joystream/sdk-core/staking'

// NOT:
import StakingManager from '@joystream/sdk-core/staking'
import { StakingManager } from '@joystream/sdk-core'
```

### Issue 3: Connection Failed

**Cause:** Node not running or wrong endpoint

**Solution:**

```bash
# Check node is running
curl -H "Content-Type: application/json" \
  -d '{"id":1, "jsonrpc":"2.0", "method": "system_health"}' \
  http://localhost:9944

# If no response, start node
cd \joystream\sdk\test-setup
./up.sh

# Check endpoint in .env.local
cat packages/ui/.env.local
```

### Issue 4: Validators List is Empty

**Cause:** Local chain has no validators OR wrong network

**Solution:**

**For local node:** Create validators using Polkadot.js Apps:

```bash
# Open Polkadot.js Apps
open http://localhost:9944

# Use Developer > Extrinsics:
# 1. Select account
# 2. Call staking.validate(commission, blocked)
# 3. Submit transaction
```

**For testnet:** Ensure connected to right endpoint:

```bash
# In .env.local:
REACT_APP_JOYSTREAM_ENDPOINT=wss://testnet.joystream.org/rpc
```

### Issue 5: Transaction Fails

**Common Causes:**

1. Insufficient balance
2. Account already bonded
3. Invalid parameters

**Solution:**

```typescript
// Use validation helpers first:
const { canBond } = await staking.canBond(account, amount)
if (!canBond.canBond) {
  console.error('Cannot bond:', canBond.reason)
  alert(canBond.reason)
  return
}

// Check account balance:
const balance = await api.query.system.account(account)
console.log('Balance:', balance.data.free.toString())
```

### Issue 6: Slow Performance

**Cause:** Too many RPC calls or large data

**Solution:**

```typescript
// Cache query results:
const [validators, setValidators] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  let isMounted = true

  const loadValidators = async () => {
    if (!staking) return
    setLoading(true)
    const data = await staking.getValidators()
    if (isMounted) {
      setValidators(data)
      setLoading(false)
    }
  }

  loadValidators()

  return () => {
    isMounted = false
  }
}, [staking])
```

---

## Testing Checklist

### Setup ✅

- [ ] SDK built successfully
- [ ] SDK linked to Pioneer
- [ ] Pioneer starts without errors
- [ ] Node running (local or testnet accessible)

### Connection ✅

- [ ] API connects to node
- [ ] StakingManager initializes
- [ ] No console errors
- [ ] Network tab shows WebSocket connection

### Query Operations ✅

- [ ] `getValidators()` returns real validators
- [ ] `getStakingParams()` returns real parameters
- [ ] `getStakingInfo()` returns real account data
- [ ] All query methods work

### UI Components ✅

- [ ] Validators page loads
- [ ] Validator cards display correctly
- [ ] Modal opens with validator details
- [ ] Real data displays everywhere

### Transaction Operations (Testnet Only) ✅

- [ ] Bond transaction creates
- [ ] Unbond transaction creates
- [ ] Nominate transaction creates
- [ ] Transactions process on-chain
- [ ] Success/error messages show

### Validation Operations ✅

- [ ] `canBond()` validates correctly
- [ ] `canUnbond()` validates correctly
- [ ] `canNominate()` validates correctly
- [ ] Error messages are clear

---

## Performance Testing

### Load Testing

```typescript
// Test with many validators
const { getValidators } = useStakingQueries()
console.time('Load validators')
const validators = await getValidators()
console.timeEnd('Load validators')
console.log(`Loaded ${validators.length} validators`)

// Expected: < 2 seconds for 100 validators
```

### Memory Testing

```typescript
// Monitor memory usage
console.memory // Chrome only

// Run validators load 10 times
for (let i = 0; i < 10; i++) {
  await getValidators()
  console.log('Iteration', i, 'Memory:', console.memory.usedJSHeapSize)
}

// Expected: No significant memory increase (no memory leaks)
```

---

## Production Readiness

### Before Deploying to Production

- [ ] All tests passing
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Error handling is robust
- [ ] User feedback is clear

### Update for Production

```bash
# Update endpoint
# In .env.production:
REACT_APP_JOYSTREAM_ENDPOINT=wss://rpc.joystream.org
REACT_APP_NETWORK=mainnet
REACT_APP_DEBUG=false
```

---

## Summary

### What You've Done

✅ Replaced mock implementation with real SDK  
✅ Integrated production-ready staking functionality  
✅ Tested with local node or testnet  
✅ Verified all operations work correctly  

### What You Get

✅ **Real blockchain data** instead of mocks  
✅ **15 functional extrinsics** for staking operations  
✅ **12+ query methods** with real chain data  
✅ **Pre-transaction validation** to prevent errors  
✅ **Production-ready** code with full test coverage  

