import { member } from './members'

type CouncilorData = { unpaidReward: string; stake: string }
export const councilMembers = ({ unpaidReward, stake }: CouncilorData, handles: string[]) =>
  handles.map((handle, id) => ({ id: String(id), unpaidReward, stake, member: member(handle) }))
