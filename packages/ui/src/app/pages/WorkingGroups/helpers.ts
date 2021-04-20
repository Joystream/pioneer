import { WorkingGroupApplication } from '../../../working-groups/types/WorkingGroupApplication'

export const isPending = ({ status }: WorkingGroupApplication) => status == 'ApplicationStatusPending'
