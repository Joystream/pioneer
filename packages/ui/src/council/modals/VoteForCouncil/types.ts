import { ModalWithDataCall } from '@/common/providers/modal/types'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { StakeStepFormFields } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

type ModalData = CandidacyPreviewModalCall['data']
export type VoteForCouncilModalCall = ModalWithDataCall<'VoteForCouncil', ModalData>

export type StakeFormFields = Required<StakeStepFormFields>

export type StakeEvent = { type: 'SET_STAKE'; stake: StakeFormFields }
