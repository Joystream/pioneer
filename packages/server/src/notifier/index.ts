import { createNotifications } from './createNotifications'
import { sendNotifications } from './sendNotifications'

export const run = async () => {
  await createNotifications()
  await sendNotifications()
}
