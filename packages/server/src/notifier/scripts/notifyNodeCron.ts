import cron from 'node-cron'

import { run } from '@/notifier'

cron.schedule('*/10 * * * *', run)
