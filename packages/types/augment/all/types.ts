// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { BTreeMap, BTreeSet, Enum, Option, Struct, U8aFixed, Vec } from '@polkadot/types/codec';
import { Bytes, Text, bool, i16, i32, i64, u128, u16, u32, u64 } from '@polkadot/types/primitive';
import { AccountId, Balance, Hash } from '@polkadot/types/interfaces/runtime';

/** @name Actor */
export interface Actor extends Enum {
  readonly isCurator: boolean;
  readonly asCurator: ITuple<[CuratorGroupId, CuratorId]>;
  readonly isMember: boolean;
  readonly asMember: MemberId;
  readonly isLead: boolean;
}

/** @name ActorId */
export interface ActorId extends u64 {}

/** @name AddOpeningParameters */
export interface AddOpeningParameters extends Struct {
  readonly description: Text;
  readonly stake_policy: Option<StakePolicy>;
  readonly reward_per_block: Option<u128>;
  readonly working_group: WorkingGroup;
}

/** @name Address */
export interface Address extends AccountId {}

/** @name AddSchemaSupportToEntityOperation */
export interface AddSchemaSupportToEntityOperation extends Struct {
  readonly entity_id: ParameterizedEntity;
  readonly schema_id: SchemaId;
  readonly parametrized_property_values: Vec<ParametrizedClassPropertyValue>;
}

/** @name Application */
export interface Application extends Struct {
  readonly role_account_id: AccountId;
  readonly reward_account_id: AccountId;
  readonly staking_account_id: AccountId;
  readonly member_id: MemberId;
  readonly description_hash: Text;
}

/** @name ApplicationId */
export interface ApplicationId extends u64 {}

/** @name ApplicationIdSet */
export interface ApplicationIdSet extends BTreeSet<ApplicationId> {}

/** @name ApplicationIdToWorkerIdMap */
export interface ApplicationIdToWorkerIdMap extends BTreeMap<ApplicationId, WorkerId> {}

/** @name ApplicationInfo */
export interface ApplicationInfo extends Struct {
  readonly application_id: ApplicationId;
  readonly application: Application;
}

/** @name ApplyOnOpeningParameters */
export interface ApplyOnOpeningParameters extends Struct {
  readonly member_id: MemberId;
  readonly opening_id: OpeningId;
  readonly role_account_id: AccountId;
  readonly reward_account_id: AccountId;
  readonly description: Text;
  readonly stake_parameters: Option<StakeParameters>;
}

/** @name Approved */
export interface Approved extends Enum {
  readonly isPendingExecution: boolean;
  readonly isPendingConstitutionality: boolean;
}

/** @name BlockAndTime */
export interface BlockAndTime extends Struct {
  readonly block: u32;
  readonly time: u64;
}

/** @name BuyMembershipParameters */
export interface BuyMembershipParameters extends Struct {
  readonly root_account: AccountId;
  readonly controller_account: AccountId;
  readonly name: Option<Text>;
  readonly handle: Option<Text>;
  readonly avatar_uri: Option<Text>;
  readonly about: Option<Text>;
  readonly referrer_id: Option<MemberId>;
}

/** @name Candidate */
export interface Candidate extends Struct {
  readonly staking_account_id: AccountId;
  readonly reward_account_id: AccountId;
  readonly cycle_id: u64;
  readonly stake: u32;
  readonly vote_power: VotePower;
  readonly note_hash: Option<Hash>;
}

/** @name CastVoteOf */
export interface CastVoteOf extends Struct {
  readonly commitment: Hash;
  readonly cycle_id: u64;
  readonly stake: u128;
  readonly vote_for: Option<MemberId>;
}

/** @name Category */
export interface Category extends Struct {
  readonly title_hash: Hash;
  readonly description_hash: Hash;
  readonly archived: bool;
  readonly num_direct_subcategories: u32;
  readonly num_direct_threads: u32;
  readonly num_direct_moderators: u32;
  readonly parent_category_id: Option<CategoryId>;
  readonly sticky_thread_ids: Vec<ThreadId>;
}

/** @name CategoryId */
export interface CategoryId extends u64 {}

/** @name Class */
export interface Class extends Struct {
  readonly class_permissions: ClassPermissions;
  readonly properties: Vec<Property>;
  readonly schemas: Vec<Schema>;
  readonly name: Text;
  readonly description: Text;
  readonly maximum_entities_count: EntityId;
  readonly current_number_of_entities: EntityId;
  readonly default_entity_creation_voucher_upper_bound: EntityId;
}

/** @name ClassId */
export interface ClassId extends u64 {}

/** @name ClassOf */
export interface ClassOf extends Struct {
  readonly class_permissions: ClassPermissions;
  readonly properties: Vec<Property>;
  readonly schemas: Vec<Schema>;
  readonly name: Text;
  readonly description: Text;
  readonly maximum_entities_count: EntityId;
  readonly current_number_of_entities: EntityId;
  readonly default_entity_creation_voucher_upper_bound: EntityId;
}

/** @name ClassPermissions */
export interface ClassPermissions extends Struct {
  readonly any_member: bool;
  readonly entity_creation_blocked: bool;
  readonly all_entity_property_values_locked: bool;
  readonly maintainers: Vec<CuratorGroupId>;
}

/** @name ConstitutionInfo */
export interface ConstitutionInfo extends Struct {
  readonly text_hash: Hash;
}

/** @name ContentId */
export interface ContentId extends U8aFixed {}

/** @name CouncilMemberOf */
export interface CouncilMemberOf extends Struct {
  readonly staking_account_id: AccountId;
  readonly reward_account_id: AccountId;
  readonly membership_id: MemberId;
  readonly stake: u128;
  readonly last_payment_block: u32;
  readonly unpaid_reward: u128;
}

/** @name CouncilStage */
export interface CouncilStage extends Enum {
  readonly isAnnouncing: boolean;
  readonly asAnnouncing: CouncilStageAnnouncing;
  readonly isElection: boolean;
  readonly asElection: CouncilStageElection;
  readonly isIdle: boolean;
  readonly asIdle: u32;
}

/** @name CouncilStageAnnouncing */
export interface CouncilStageAnnouncing extends Struct {
  readonly candidatesCount: u64;
}

/** @name CouncilStageElection */
export interface CouncilStageElection extends Struct {
  readonly candidatesCount: u64;
}

/** @name CouncilStageUpdate */
export interface CouncilStageUpdate extends Struct {
  readonly stage: CouncilStage;
  readonly changed_at: u32;
}

/** @name CreateEntityOperation */
export interface CreateEntityOperation extends Struct {
  readonly class_id: ClassId;
}

/** @name CuratorGroup */
export interface CuratorGroup extends Struct {
  readonly curators: Vec<CuratorId>;
  readonly active: bool;
  readonly number_of_classes_maintained: u32;
}

/** @name CuratorGroupId */
export interface CuratorGroupId extends u64 {}

/** @name CuratorId */
export interface CuratorId extends u64 {}

/** @name DataObject */
export interface DataObject extends Struct {
  readonly owner: MemberId;
  readonly added_at: BlockAndTime;
  readonly type_id: DataObjectTypeId;
  readonly liaison: StorageProviderId;
  readonly liaison_judgement: LiaisonJudgement;
  readonly ipfs_content_id: Text;
}

/** @name DataObjectsMap */
export interface DataObjectsMap extends BTreeMap<ContentId, DataObject> {}

/** @name DataObjectStorageRelationship */
export interface DataObjectStorageRelationship extends Struct {
  readonly content_id: ContentId;
  readonly storage_provider: StorageProviderId;
  readonly ready: bool;
}

/** @name DataObjectStorageRelationshipId */
export interface DataObjectStorageRelationshipId extends u64 {}

/** @name DataObjectType */
export interface DataObjectType extends Struct {
  readonly description: Text;
  readonly active: bool;
}

/** @name DataObjectTypeId */
export interface DataObjectTypeId extends u64 {}

/** @name DiscussionPost */
export interface DiscussionPost extends Struct {
  readonly author_id: u64;
}

/** @name DiscussionThread */
export interface DiscussionThread extends Struct {
  readonly activated_at: u32;
  readonly author_id: u64;
  readonly mode: ThreadMode;
}

/** @name Entity */
export interface Entity extends Struct {
  readonly entity_permissions: EntityPermissions;
  readonly class_id: ClassId;
  readonly supported_schemas: Vec<SchemaId>;
  readonly reference_counter: InboundReferenceCounter;
}

/** @name EntityController */
export interface EntityController extends Enum {
  readonly isMaintainers: boolean;
  readonly isMember: boolean;
  readonly asMember: MemberId;
  readonly isLead: boolean;
}

/** @name EntityCreationVoucher */
export interface EntityCreationVoucher extends Struct {
  readonly maximum_entities_count: EntityId;
  readonly entities_created: EntityId;
}

/** @name EntityId */
export interface EntityId extends u64 {}

/** @name EntityOf */
export interface EntityOf extends Struct {
  readonly entity_permissions: EntityPermissions;
  readonly class_id: ClassId;
  readonly supported_schemas: Vec<SchemaId>;
  readonly reference_counter: InboundReferenceCounter;
}

/** @name EntityPermissions */
export interface EntityPermissions extends Struct {
  readonly controller: EntityController;
  readonly frozen: bool;
  readonly referenceable: bool;
}

/** @name EntityReferenceCounterSideEffect */
export interface EntityReferenceCounterSideEffect extends Struct {
  readonly total: i32;
  readonly same_owner: i32;
}

/** @name ExecutionFailed */
export interface ExecutionFailed extends Struct {
  readonly error: Text;
}

/** @name ExecutionStatus */
export interface ExecutionStatus extends Enum {
  readonly isExecuted: boolean;
  readonly isExecutionFailed: boolean;
  readonly asExecutionFailed: ExecutionFailed;
}

/** @name FailedAt */
export interface FailedAt extends u32 {}

/** @name FillOpeningParameters */
export interface FillOpeningParameters extends Struct {
  readonly opening_id: OpeningId;
  readonly successful_application_id: ApplicationId;
  readonly working_group: WorkingGroup;
}

/** @name ForumUserId */
export interface ForumUserId extends u64 {}

/** @name GeneralProposalParameters */
export interface GeneralProposalParameters extends Struct {
  readonly member_id: MemberId;
  readonly title: Text;
  readonly description: Text;
  readonly staking_account_id: Option<AccountId>;
  readonly exact_execution_block: Option<u32>;
}

/** @name HashedTextMaxLength */
export interface HashedTextMaxLength extends Option<u16> {}

/** @name InboundReferenceCounter */
export interface InboundReferenceCounter extends Struct {
  readonly total: u32;
  readonly same_owner: u32;
}

/** @name InputEntityValuesMap */
export interface InputEntityValuesMap extends BTreeMap<PropertyId, InputPropertyValue> {}

/** @name InputPropertyValue */
export interface InputPropertyValue extends Enum {
  readonly isSingle: boolean;
  readonly asSingle: InputValue;
  readonly isVector: boolean;
  readonly asVector: VecInputValue;
}

/** @name InputValidationLengthConstraint */
export interface InputValidationLengthConstraint extends Struct {
  readonly min: u16;
  readonly max_min_diff: u16;
}

/** @name InputValue */
export interface InputValue extends Enum {
  readonly isBool: boolean;
  readonly asBool: bool;
  readonly isUint16: boolean;
  readonly asUint16: u16;
  readonly isUint32: boolean;
  readonly asUint32: u32;
  readonly isUint64: boolean;
  readonly asUint64: u64;
  readonly isInt16: boolean;
  readonly asInt16: i16;
  readonly isInt32: boolean;
  readonly asInt32: i32;
  readonly isInt64: boolean;
  readonly asInt64: i64;
  readonly isText: boolean;
  readonly asText: Text;
  readonly isTextToHash: boolean;
  readonly asTextToHash: Text;
  readonly isReference: boolean;
  readonly asReference: EntityId;
}

/** @name InviteMembershipParameters */
export interface InviteMembershipParameters extends Struct {
  readonly inviting_member_id: MemberId;
  readonly root_account: AccountId;
  readonly controller_account: AccountId;
  readonly name: Option<Text>;
  readonly handle: Option<Text>;
  readonly avatar_uri: Option<Text>;
  readonly about: Option<Text>;
}

/** @name IPNSIdentity */
export interface IPNSIdentity extends Text {}

/** @name LiaisonJudgement */
export interface LiaisonJudgement extends Enum {
  readonly isPending: boolean;
  readonly isAccepted: boolean;
  readonly isRejected: boolean;
}

/** @name LookupSource */
export interface LookupSource extends AccountId {}

/** @name MemberId */
export interface MemberId extends u64 {}

/** @name Membership */
export interface Membership extends Struct {
  readonly handle_hash: Bytes;
  readonly root_account: AccountId;
  readonly controller_account: AccountId;
  readonly verified: bool;
  readonly invites: u32;
}

/** @name MemoText */
export interface MemoText extends Text {}

/** @name ModeratorId */
export interface ModeratorId extends u64 {}

/** @name Nonce */
export interface Nonce extends u64 {}

/** @name Opening */
export interface Opening extends Struct {
  readonly opening_type: OpeningType;
  readonly created: u32;
  readonly description_hash: Text;
  readonly stake_policy: Option<StakePolicy>;
  readonly reward_per_block: Option<u128>;
}

/** @name OpeningId */
export interface OpeningId extends u64 {}

/** @name OpeningType */
export interface OpeningType extends Enum {
  readonly isLeader: boolean;
  readonly isRegular: boolean;
}

/** @name OperationType */
export interface OperationType extends Enum {
  readonly isCreateEntity: boolean;
  readonly asCreateEntity: CreateEntityOperation;
  readonly isUpdatePropertyValues: boolean;
  readonly asUpdatePropertyValues: UpdatePropertyValuesOperation;
  readonly isAddSchemaSupportToEntity: boolean;
  readonly asAddSchemaSupportToEntity: AddSchemaSupportToEntityOperation;
}

/** @name OptionResult */
export interface OptionResult extends Struct {
  readonly option_id: MemberId;
  readonly vote_power: VotePower;
}

/** @name ParameterizedEntity */
export interface ParameterizedEntity extends Enum {
  readonly isInternalEntityJustAdded: boolean;
  readonly asInternalEntityJustAdded: u32;
  readonly isExistingEntity: boolean;
  readonly asExistingEntity: EntityId;
}

/** @name ParametrizedClassPropertyValue */
export interface ParametrizedClassPropertyValue extends Struct {
  readonly in_class_index: PropertyId;
  readonly value: ParametrizedPropertyValue;
}

/** @name ParametrizedPropertyValue */
export interface ParametrizedPropertyValue extends Enum {
  readonly isInputPropertyValue: boolean;
  readonly asInputPropertyValue: InputPropertyValue;
  readonly isInternalEntityJustAdded: boolean;
  readonly asInternalEntityJustAdded: u32;
  readonly isInternalEntityVec: boolean;
  readonly asInternalEntityVec: Vec<ParameterizedEntity>;
}

/** @name Penalty */
export interface Penalty extends Struct {
  readonly slashing_text: Text;
  readonly slashing_amount: u128;
}

/** @name Poll */
export interface Poll extends Struct {
  readonly description_hash: Hash;
  readonly end_time: u64;
  readonly poll_alternatives: Vec<PollAlternative>;
}

/** @name PollAlternative */
export interface PollAlternative extends Struct {
  readonly alternative_text_hash: Hash;
  readonly vote_count: u32;
}

/** @name Post */
export interface Post extends Struct {
  readonly thread_id: ThreadId;
  readonly text_hash: Hash;
  readonly author_id: ForumUserId;
}

/** @name PostId */
export interface PostId extends u64 {}

/** @name PostReactionId */
export interface PostReactionId extends u64 {}

/** @name PrivilegedActor */
export interface PrivilegedActor extends Enum {
  readonly isLead: boolean;
  readonly isModerator: boolean;
  readonly asModerator: ModeratorId;
}

/** @name Property */
export interface Property extends Struct {
  readonly property_type: PropertyType;
  readonly required: bool;
  readonly unique: bool;
  readonly name: Text;
  readonly description: Text;
  readonly locking_policy: PropertyLockingPolicy;
}

/** @name PropertyId */
export interface PropertyId extends u16 {}

/** @name PropertyLockingPolicy */
export interface PropertyLockingPolicy extends Struct {
  readonly is_locked_from_maintainer: bool;
  readonly is_locked_from_controller: bool;
}

/** @name PropertyType */
export interface PropertyType extends Enum {
  readonly isSingle: boolean;
  readonly asSingle: PropertyTypeSingle;
  readonly isVector: boolean;
  readonly asVector: PropertyTypeVector;
}

/** @name PropertyTypeSingle */
export interface PropertyTypeSingle extends Enum {
  readonly isBool: boolean;
  readonly isUint16: boolean;
  readonly isUint32: boolean;
  readonly isUint64: boolean;
  readonly isInt16: boolean;
  readonly isInt32: boolean;
  readonly isInt64: boolean;
  readonly isText: boolean;
  readonly asText: TextMaxLength;
  readonly isHash: boolean;
  readonly asHash: HashedTextMaxLength;
  readonly isReference: boolean;
  readonly asReference: ITuple<[ClassId, SameController]>;
}

/** @name PropertyTypeVector */
export interface PropertyTypeVector extends Struct {
  readonly vec_type: PropertyTypeSingle;
  readonly max_length: VecMaxLength;
}

/** @name ProposalDecision */
export interface ProposalDecision extends Enum {
  readonly isCanceled: boolean;
  readonly isVetoed: boolean;
  readonly isRejected: boolean;
  readonly isSlashed: boolean;
  readonly isExpired: boolean;
  readonly isApproved: boolean;
  readonly asApproved: Approved;
}

/** @name ProposalDetails */
export interface ProposalDetails extends Enum {
  readonly isText: boolean;
  readonly asText: Text;
  readonly isRuntimeUpgrade: boolean;
  readonly asRuntimeUpgrade: Bytes;
  readonly isSpending: boolean;
  readonly asSpending: ITuple<[Balance, AccountId]>;
  readonly isSetValidatorCount: boolean;
  readonly asSetValidatorCount: u32;
  readonly isAddWorkingGroupLeaderOpening: boolean;
  readonly asAddWorkingGroupLeaderOpening: AddOpeningParameters;
  readonly isFillWorkingGroupLeaderOpening: boolean;
  readonly asFillWorkingGroupLeaderOpening: FillOpeningParameters;
  readonly isSetWorkingGroupBudgetCapacity: boolean;
  readonly asSetWorkingGroupBudgetCapacity: ITuple<[Balance, WorkingGroup]>;
  readonly isDecreaseWorkingGroupLeaderStake: boolean;
  readonly asDecreaseWorkingGroupLeaderStake: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isSlashWorkingGroupLeaderStake: boolean;
  readonly asSlashWorkingGroupLeaderStake: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isSetWorkingGroupLeaderReward: boolean;
  readonly asSetWorkingGroupLeaderReward: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isTerminateWorkingGroupLeaderRole: boolean;
  readonly asTerminateWorkingGroupLeaderRole: TerminateRoleParameters;
  readonly isAmendConstitution: boolean;
  readonly asAmendConstitution: Text;
}

/** @name ProposalDetailsOf */
export interface ProposalDetailsOf extends Enum {
  readonly isText: boolean;
  readonly asText: Text;
  readonly isRuntimeUpgrade: boolean;
  readonly asRuntimeUpgrade: Bytes;
  readonly isSpending: boolean;
  readonly asSpending: ITuple<[Balance, AccountId]>;
  readonly isSetValidatorCount: boolean;
  readonly asSetValidatorCount: u32;
  readonly isAddWorkingGroupLeaderOpening: boolean;
  readonly asAddWorkingGroupLeaderOpening: AddOpeningParameters;
  readonly isFillWorkingGroupLeaderOpening: boolean;
  readonly asFillWorkingGroupLeaderOpening: FillOpeningParameters;
  readonly isSetWorkingGroupBudgetCapacity: boolean;
  readonly asSetWorkingGroupBudgetCapacity: ITuple<[Balance, WorkingGroup]>;
  readonly isDecreaseWorkingGroupLeaderStake: boolean;
  readonly asDecreaseWorkingGroupLeaderStake: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isSlashWorkingGroupLeaderStake: boolean;
  readonly asSlashWorkingGroupLeaderStake: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isSetWorkingGroupLeaderReward: boolean;
  readonly asSetWorkingGroupLeaderReward: ITuple<[WorkerId, Balance, WorkingGroup]>;
  readonly isTerminateWorkingGroupLeaderRole: boolean;
  readonly asTerminateWorkingGroupLeaderRole: TerminateRoleParameters;
  readonly isAmendConstitution: boolean;
  readonly asAmendConstitution: Text;
}

/** @name ProposalId */
export interface ProposalId extends u32 {}

/** @name ProposalOf */
export interface ProposalOf extends Struct {
  readonly parameters: ProposalParameters;
  readonly proposerId: MemberId;
  readonly activatedAt: u32;
  readonly status: ProposalStatus;
  readonly votingResults: VotingResults;
  readonly exactExecutionBlock: Option<u32>;
  readonly nrOfCouncilConfirmations: u32;
  readonly stakingAccountId: Option<AccountId>;
}

/** @name ProposalParameters */
export interface ProposalParameters extends Struct {
  readonly votingPeriod: u32;
  readonly gracePeriod: u32;
  readonly approvalQuorumPercentage: u32;
  readonly approvalThresholdPercentage: u32;
  readonly slashingQuorumPercentage: u32;
  readonly slashingThresholdPercentage: u32;
  readonly requiredStake: Option<u128>;
  readonly constitutionality: u32;
}

/** @name ProposalStatus */
export interface ProposalStatus extends Enum {
  readonly isActive: boolean;
  readonly isPendingExecution: boolean;
  readonly asPendingExecution: u32;
  readonly isPendingConstitutionality: boolean;
}

/** @name ReferenceCounterSideEffects */
export interface ReferenceCounterSideEffects extends BTreeMap<EntityId, EntityReferenceCounterSideEffect> {}

/** @name ReferendumStage */
export interface ReferendumStage extends Enum {
  readonly isInactive: boolean;
  readonly isVoting: boolean;
  readonly asVoting: ReferendumStageVoting;
  readonly isRevealing: boolean;
  readonly asRevealing: ReferendumStageRevealing;
}

/** @name ReferendumStageRevealing */
export interface ReferendumStageRevealing extends Struct {
  readonly started: u32;
  readonly winning_target_count: u64;
  readonly intermediate_winners: Vec<OptionResult>;
  readonly current_cycle_id: u64;
}

/** @name ReferendumStageVoting */
export interface ReferendumStageVoting extends Struct {
  readonly started: u32;
  readonly winning_target_count: u64;
  readonly current_cycle_id: u64;
}

/** @name SameController */
export interface SameController extends bool {}

/** @name Schema */
export interface Schema extends Struct {
  readonly properties: Vec<PropertyId>;
  readonly is_active: bool;
}

/** @name SchemaId */
export interface SchemaId extends u16 {}

/** @name ServiceProviderRecord */
export interface ServiceProviderRecord extends Struct {
  readonly identity: IPNSIdentity;
  readonly expires_at: u32;
}

/** @name SetLeadParams */
export interface SetLeadParams extends ITuple<[MemberId, AccountId]> {}

/** @name SideEffect */
export interface SideEffect extends Option<ITuple<[EntityId, EntityReferenceCounterSideEffect]>> {}

/** @name SideEffects */
export interface SideEffects extends Option<ReferenceCounterSideEffects> {}

/** @name StakeParameters */
export interface StakeParameters extends Struct {
  readonly stake: u128;
  readonly staking_account_id: AccountId;
}

/** @name StakePolicy */
export interface StakePolicy extends Struct {
  readonly stake_amount: u128;
  readonly leaving_unstaking_period: u32;
}

/** @name StakingAccountMemberBinding */
export interface StakingAccountMemberBinding extends Struct {
  readonly member_id: MemberId;
  readonly confirmed: bool;
}

/** @name Status */
export interface Status extends bool {}

/** @name StorageProviderId */
export interface StorageProviderId extends u64 {}

/** @name StoredPropertyValue */
export interface StoredPropertyValue extends Enum {
  readonly isSingle: boolean;
  readonly asSingle: StoredValue;
  readonly isVector: boolean;
  readonly asVector: VecStoredPropertyValue;
}

/** @name StoredValue */
export interface StoredValue extends Enum {
  readonly isBool: boolean;
  readonly asBool: bool;
  readonly isUint16: boolean;
  readonly asUint16: u16;
  readonly isUint32: boolean;
  readonly asUint32: u32;
  readonly isUint64: boolean;
  readonly asUint64: u64;
  readonly isInt16: boolean;
  readonly asInt16: i16;
  readonly isInt32: boolean;
  readonly asInt32: i32;
  readonly isInt64: boolean;
  readonly asInt64: i64;
  readonly isText: boolean;
  readonly asText: Text;
  readonly isHash: boolean;
  readonly asHash: Hash;
  readonly isReference: boolean;
  readonly asReference: EntityId;
}

/** @name TerminateRoleParameters */
export interface TerminateRoleParameters extends Struct {
  readonly worker_id: WorkerId;
  readonly penalty: Option<Penalty>;
  readonly working_group: WorkingGroup;
}

/** @name TextMaxLength */
export interface TextMaxLength extends u16 {}

/** @name Thread */
export interface Thread extends Struct {
  readonly title_hash: Hash;
  readonly category_id: CategoryId;
  readonly author_id: ForumUserId;
  readonly archived: bool;
  readonly poll: Option<Poll>;
  readonly num_direct_posts: u32;
}

/** @name ThreadId */
export interface ThreadId extends u64 {}

/** @name ThreadMode */
export interface ThreadMode extends Enum {
  readonly isOpen: boolean;
  readonly isClosed: boolean;
  readonly asClosed: Vec<MemberId>;
}

/** @name UpdatePropertyValuesOperation */
export interface UpdatePropertyValuesOperation extends Struct {
  readonly entity_id: ParameterizedEntity;
  readonly new_parametrized_property_values: Vec<ParametrizedClassPropertyValue>;
}

/** @name Url */
export interface Url extends Text {}

/** @name VecInputValue */
export interface VecInputValue extends Enum {
  readonly isBool: boolean;
  readonly asBool: Vec<bool>;
  readonly isUint16: boolean;
  readonly asUint16: Vec<u16>;
  readonly isUint32: boolean;
  readonly asUint32: Vec<u32>;
  readonly isUint64: boolean;
  readonly asUint64: Vec<u64>;
  readonly isInt16: boolean;
  readonly asInt16: Vec<i16>;
  readonly isInt32: boolean;
  readonly asInt32: Vec<i32>;
  readonly isInt64: boolean;
  readonly asInt64: Vec<i64>;
  readonly isTextToHash: boolean;
  readonly asTextToHash: Vec<Text>;
  readonly isText: boolean;
  readonly asText: Vec<Text>;
  readonly isReference: boolean;
  readonly asReference: Vec<EntityId>;
}

/** @name VecMaxLength */
export interface VecMaxLength extends u16 {}

/** @name VecStoredPropertyValue */
export interface VecStoredPropertyValue extends Struct {
  readonly vec_value: VecStoredValue;
  readonly nonce: Nonce;
}

/** @name VecStoredValue */
export interface VecStoredValue extends Enum {
  readonly isBool: boolean;
  readonly asBool: Vec<bool>;
  readonly isUint16: boolean;
  readonly asUint16: Vec<u16>;
  readonly isUint32: boolean;
  readonly asUint32: Vec<u32>;
  readonly isUint64: boolean;
  readonly asUint64: Vec<u64>;
  readonly isInt16: boolean;
  readonly asInt16: Vec<i16>;
  readonly isInt32: boolean;
  readonly asInt32: Vec<i32>;
  readonly isInt64: boolean;
  readonly asInt64: Vec<i64>;
  readonly isHash: boolean;
  readonly asHash: Vec<Hash>;
  readonly isText: boolean;
  readonly asText: Vec<Text>;
  readonly isReference: boolean;
  readonly asReference: Vec<EntityId>;
}

/** @name VoteKind */
export interface VoteKind extends Enum {
  readonly isApprove: boolean;
  readonly isReject: boolean;
  readonly isSlash: boolean;
  readonly isAbstain: boolean;
}

/** @name VotePower */
export interface VotePower extends u128 {}

/** @name VotingResults */
export interface VotingResults extends Struct {
  readonly abstensions: u32;
  readonly approvals: u32;
  readonly rejections: u32;
  readonly slashes: u32;
}

/** @name Worker */
export interface Worker extends Struct {
  readonly member_id: MemberId;
  readonly role_account_id: AccountId;
  readonly staking_account_id: Option<AccountId>;
  readonly reward_account_id: AccountId;
  readonly started_leaving_at: Option<u32>;
  readonly job_unstaking_period: u32;
  readonly reward_per_block: Option<u128>;
  readonly missed_reward: Option<u128>;
  readonly created_at: u32;
}

/** @name WorkerId */
export interface WorkerId extends u64 {}

/** @name WorkerInfo */
export interface WorkerInfo extends Struct {
  readonly worker_id: WorkerId;
  readonly worker: Worker;
}

/** @name WorkingGroup */
export interface WorkingGroup extends Enum {
  readonly isForum: boolean;
  readonly isStorage: boolean;
  readonly isContent: boolean;
  readonly isMembership: boolean;
}

export type PHANTOM_ALL = 'all';
