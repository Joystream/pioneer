import { from } from 'rxjs'

export const stubTransactionResult = (events: any[]) =>
  from([
    {
      status: { isReady: true, type: 'Ready' },
    },
    {
      status: { type: 'InBlock', isInBlock: true, asInBlock: '0x93XXX' },
      events: [...events],
    },
    {
      status: { type: 'Finalized', isFinalized: true, asFinalized: '0x93XXX' },
      events: [...events],
    },
  ])
