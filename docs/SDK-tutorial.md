# Joystream SDK Integration Tutorial

This tutorial explains how to replace the mock staking implementation in Pioneer with the production-ready Joystream SDK and how to validate the change end to end.

## Prerequisites and Preparation

- Install Node.js 18+, Yarn 1.22+, and Git.
- Clone or update both repositories side by side: `joystream/pioneer` and `joystream/sdk`.
- Ensure you can access either a local Joystream node (via Docker or the SDK test setup) or the Joystream testnet endpoint `wss://testnet.joystream.org/rpc`.
- Create test accounts with sufficient JOY on the network you plan to use.
- Optional but recommended: enable Storybook or mocks only for UI work; the steps below focus on live chain data.

## Step-by-Step Integration

1. **Install or link the SDK.**
   - Install from npm:
     ```bash
     cd joystream/pioneer
     yarn add @joystream/sdk-core@latest
     ```
   - Or link a local build:
     ```bash
     cd joystream/sdk
     yarn install
     yarn build
     yarn link

     cd ../pioneer/packages/ui
     yarn link @joystream/sdk-core
     ```
   - Verify the dependency:
     ```bash
     cd joystream/pioneer
     yarn list @joystream/sdk-core
     ```

2. **Configure Pioneer to reach the desired network.**
   - Create or update `packages/ui/.env.local` with either:
     ```
     REACT_APP_JOYSTREAM_ENDPOINT=ws://localhost:9944
     REACT_APP_NETWORK=local
     REACT_APP_DEBUG=true
     ```
     or
     ```
     REACT_APP_JOYSTREAM_ENDPOINT=wss://testnet.joystream.org/rpc
     REACT_APP_NETWORK=testnet
     REACT_APP_DEBUG=true
     ```.

3. **Replace the mock staking hook.**
   ```typescript
   // packages/ui/src/validators/hooks/useStakingSDK.ts
   import { useMemo } from 'react'
   import { StakingManager } from '@joystream/sdk-core/staking'
   import { useApi } from '@/api/hooks/useApi'

   export const useStakingSDK = () => {
     const { api } = useApi()

     const staking = useMemo(() => {
       if (!api) return null
       return new StakingManager(api)
     }, [api])

     return {
       staking,
       isConnected: !!staking,
     }
   }
   ```
   The other staking hooks (`useStakingQueries`, `useStakingValidation`, `useStakingTransactions`) already support the SDK.

4. **Start your services.**
   - Local node: `cd joystream/sdk/test-setup && ./up.sh`
   - Pioneer UI: `cd joystream/pioneer/packages/ui && yarn dev`
   - Storybook (optional): `yarn storybook`

5. **Confirm the UI loads live chain data.**
   - Visit `http://localhost:3000`, open the Validators page, and ensure the list is populated with real validators.
   - Use the browser console to confirm connection status:
     ```javascript
     const { api } = useApi()
     console.log('Connected:', api?.isConnected, api?.runtimeChain?.toString())
     ```

## Testing and Verification

- **Connection checks**
  - `useStakingSDK()` returns a `StakingManager` instance.
  - Network selector in Pioneer shows the intended endpoint.
- **Read operations**
  - Validator list loads real data (commission, stake, nominators).
  - Account staking info reflects actual on-chain state.
  - `useStakingQueries().getStakingParams()` returns meaningful values.
- **Write operations (testnet or local only)**
  - Bond, unbond, nominate, rebond, chill, and withdraw flows submit transactions without SDK errors.
  - Validation helpers block unsupported operations and surface human-readable messages.
- **UI behaviour**
  - Loading states, success messages, and error toasts render as expected.
  - No persistent console errors or warnings.

Success looks like a dynamic validator list, responsive staking modals, and transactions that propagate to the network logs or explorer. If you still see the original three mock validators, the SDK is not wired up correctly.

## Debugging

- `Cannot find module '@joystream/sdk-core/staking'`: reinstall or relink the SDK, then restart the dev server (`yarn dev`).
- `StakingManager is not a constructor`: ensure the named import is used (`import { StakingManager } from '@joystream/sdk-core/staking'`) and the SDK version is 1.0.0+.
- Empty validator list: verify the WebSocket endpoint in `.env.local`, check `useApi().api?.isConnected`, and consider switching to the public testnet RPC.
- Failed transactions: inspect balances and controller/stash roles via Polkadot.js Apps, and run validation helpers before submitting.
- TypeScript complaints about missing methods: run `yarn list @joystream/sdk-core` to confirm the dependency resolves to the expected build.

Collect additional diagnostics with `localStorage.setItem('debug', 'joystream:*')` before reloading Pioneer and watching the console output.

## Additional Resources

- SDK documentation: `joystream/sdk/SDK_STAKING_README.md`
- Feature checklist: `joystream/sdk/STAKING_FEATURES_IMPLEMENTED.md`
- API reference: `joystream/sdk/packages/core/src/staking/README.md`
- Example flows: `joystream/sdk/examples/staking/`
- Test suite: `joystream/sdk/packages/core/src/staking/__tests__/`
- Support: Joystream Discord and GitHub issues for the SDK or Pioneer repositories
