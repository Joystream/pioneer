import { createNotifications } from './createNotifications'
import { processNotifications } from './processNotifications'

export const run = async () => {
  await createNotifications()
  await processNotifications()
}
