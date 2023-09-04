import { createNotifications } from './createNotifications'
import { processNotifications } from './sendNotifications'

export const run = async () => {
  await createNotifications()
  await processNotifications()
}
