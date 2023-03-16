import { createNotifications } from './createNotifications'
import { sendNotifications } from './sendNotifications'

createNotifications().then(sendNotifications)
