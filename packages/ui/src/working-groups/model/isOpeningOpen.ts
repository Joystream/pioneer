import { WorkingGroupOpening } from '../types'

export const isOpeningOpen = ({ status }: WorkingGroupOpening) => status === 'OpeningStatusOpen'
