# Step-by-Step SDK Integration with Pioneer

## 🎯 Goal
Integrate the Joystream SDK with Pioneer for local testing of staking functionality.

## 📋 Prerequisites Checklist
- [ ] Joystream node running locally
- [ ] SDK built and available
- [ ] Pioneer UI development environment
- [ ] Test accounts with tokens

## 🚀 Step 1: Start Joystream Node

### Terminal 1: Start the Node
```bash
# Navigate to Joystream directory
cd e:\work\joystream

# Build the node (if not already built)
cargo build --release

# Start the node in development mode
./target/release/joystream-node --dev --ws-port 9944
```

**Expected Output:**
```
2024-01-01 12:00:00 Joystream Node
2024-01-01 12:00:00 ✨ Node identity: 12D3KooW...
2024-01-01 12:00:00 📦 Highest known block at #0
2024-01-01 12:00:00 🏷 Local node identity is: 12D3KooW...
2024-01-01 12:00:00 📡 WebSocket RPC server listening on 127.0.0.1:9944
```

## 🔧 Step 2: Update Pioneer Dependencies

### Terminal 2: Install SDK
```bash
# Navigate to Pioneer UI
cd e:\work\joystream\pioneer\packages\ui

# Install SDK dependency
yarn add @joystream/sdk-core

# Verify installation
yarn list @joystream/sdk-core
```

## 📝 Step 3: Update useStakingSDK Hook

### Replace Mock with Real SDK
```typescript
// File: src/validators/hooks/useStakingSDK.ts
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

## 🌐 Step 4: Update API Connection

### Create Environment Configuration
```bash
# Create .env.local file
echo "REACT_APP_JOYSTREAM_ENDPOINT=ws://localhost:9944" > .env.local
echo "REACT_APP_NETWORK=local" >> .env.local
echo "REACT_APP_DEBUG=true" >> .env.local
```

### Update API Hook (if needed)
```typescript
// File: src/api/hooks/useApi.ts
const endpoint = process.env.REACT_APP_JOYSTREAM_ENDPOINT || 'ws://localhost:9944'
```

## 🚀 Step 5: Start Pioneer UI

### Terminal 3: Start Development Server
```bash
# Navigate to Pioneer UI
cd e:\work\joystream\pioneer\packages\ui

# Start development server
yarn start
```

**Expected Output:**
```
Compiled successfully!

You can now view pioneer in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000
```

## 🧪 Step 6: Test Connection

### Browser Testing
1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Navigate to Validators**: Go to Validators page
3. **Check Console**: Open browser dev tools (F12)
4. **Verify Connection**: Look for successful WebSocket connection

### Expected Console Output
```javascript
// Should see these logs
🔌 Connecting to Joystream network...
✅ Connected to real Joystream network!
📊 Loading validators...
✅ Validators loaded: 3 validators
```

## 🎯 Step 7: Test Staking Actions

### Test Bond Action
1. **Click Bond**: Click "Bond" button on a validator
2. **Enter Amount**: Enter 100 JOY
3. **Select Controller**: Choose controller account
4. **Submit**: Click "Bond Tokens"
5. **Check Result**: Verify transaction in node logs

### Test Unbond Action
1. **Click Unbond**: Click "Unbond" button
2. **Enter Amount**: Enter 50 JOY
3. **Submit**: Click "Unbond Tokens"
4. **Check Result**: Verify unbonding period starts

### Test Nominate Action
1. **Click Nominate**: Click "Nominate" button
2. **Select Validators**: Choose validators to nominate
3. **Submit**: Click "Nominate Validators"
4. **Check Result**: Verify nominations recorded

## 🔍 Step 8: Debug Issues

### Common Issues and Solutions

#### Issue 1: SDK Import Error
```bash
# Solution: Rebuild SDK
cd e:\work\joystream\sdk
yarn build
cd ../pioneer/packages/ui
yarn start --reset-cache
```

#### Issue 2: Connection Failed
```bash
# Check if node is running
curl -H "Content-Type: application/json" \
  -d '{"id":1, "jsonrpc":"2.0", "method": "system_health"}' \
  http://localhost:9944
```

#### Issue 3: Transaction Failed
- Check account has sufficient balance
- Verify account is not already bonded
- Check transaction parameters

### Debug Commands
```bash
# Check node logs
tail -f /path/to/node/logs | grep staking

# Check Pioneer logs
# Open browser console (F12) and look for errors

# Test API connection
curl -X POST -H "Content-Type: application/json" \
  -d '{"id":1, "jsonrpc":"2.0", "method": "system_health"}' \
  http://localhost:9944
```

## 📊 Step 9: Monitor Testing

### Node Logs
Watch for transaction processing:
```bash
# Terminal 4: Monitor node logs
tail -f /path/to/node/logs | grep -E "(staking|bond|unbond|nominate)"
```

### Browser Console
Monitor for errors and success messages:
```javascript
// Enable detailed logging
localStorage.setItem('debug', 'joystream:*')
```

### Network Tab
Check WebSocket connection and RPC calls:
- WebSocket: `ws://localhost:9944`
- RPC calls for staking queries
- Transaction submissions

## ✅ Step 10: Verify Integration

### Success Indicators
- [ ] Pioneer UI connects to local node
- [ ] Validators page loads without errors
- [ ] Staking actions work correctly
- [ ] Transactions appear in node logs
- [ ] No console errors
- [ ] UI is responsive

### Test Checklist
- [ ] Bond transaction works
- [ ] Unbond transaction works
- [ ] Nominate transaction works
- [ ] Validate transaction works
- [ ] Payout transaction works
- [ ] Rebag transaction works
- [ ] Rebond transaction works

## 🎉 Success!

If all steps are completed successfully, you now have:
- ✅ Local Joystream node running
- ✅ Pioneer UI connected to local node
- ✅ SDK integrated with staking functionality
- ✅ All staking actions working
- ✅ Real transactions being processed
      // console.error(`${action} failed:`, err)
