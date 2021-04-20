import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

export const isPendingApplication = ({ status }: WorkingGroupApplication) => status == 'ApplicationStatusPending'
