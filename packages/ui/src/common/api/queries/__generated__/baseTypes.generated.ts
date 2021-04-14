export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** GraphQL representation of BigInt */
  BigInt: any
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
}

export type BaseGraphQlObject = {
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
}

export type BaseModel = BaseGraphQlObject & {
  __typename: 'BaseModel'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
}

export type BaseModelUuid = BaseGraphQlObject & {
  __typename: 'BaseModelUUID'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
}

export type BaseWhereInput = {
  id_eq?: Maybe<Scalars['String']>
  id_in?: Maybe<Array<Scalars['String']>>
  createdAt_eq?: Maybe<Scalars['String']>
  createdAt_lt?: Maybe<Scalars['String']>
  createdAt_lte?: Maybe<Scalars['String']>
  createdAt_gt?: Maybe<Scalars['String']>
  createdAt_gte?: Maybe<Scalars['String']>
  createdById_eq?: Maybe<Scalars['String']>
  updatedAt_eq?: Maybe<Scalars['String']>
  updatedAt_lt?: Maybe<Scalars['String']>
  updatedAt_lte?: Maybe<Scalars['String']>
  updatedAt_gt?: Maybe<Scalars['String']>
  updatedAt_gte?: Maybe<Scalars['String']>
  updatedById_eq?: Maybe<Scalars['String']>
  deletedAt_all?: Maybe<Scalars['Boolean']>
  deletedAt_eq?: Maybe<Scalars['String']>
  deletedAt_lt?: Maybe<Scalars['String']>
  deletedAt_lte?: Maybe<Scalars['String']>
  deletedAt_gt?: Maybe<Scalars['String']>
  deletedAt_gte?: Maybe<Scalars['String']>
  deletedById_eq?: Maybe<Scalars['String']>
}

export type Block = BaseGraphQlObject & {
  __typename: 'Block'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
  block: Scalars['Int']
  executedAt: Scalars['DateTime']
  network: Network
  membershipregisteredAtBlock?: Maybe<Array<Membership>>
}

export type BlockConnection = {
  __typename: 'BlockConnection'
  totalCount: Scalars['Int']
  edges: Array<BlockEdge>
  pageInfo: PageInfo
}

export type BlockCreateInput = {
  block: Scalars['Float']
  executedAt: Scalars['DateTime']
  network: Network
}

export type BlockEdge = {
  __typename: 'BlockEdge'
  node: Block
  cursor: Scalars['String']
}

export enum BlockOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  BlockAsc = 'block_ASC',
  BlockDesc = 'block_DESC',
  ExecutedAtAsc = 'executedAt_ASC',
  ExecutedAtDesc = 'executedAt_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
}

export type BlockUpdateInput = {
  block?: Maybe<Scalars['Float']>
  executedAt?: Maybe<Scalars['DateTime']>
  network?: Maybe<Network>
}

export type BlockWhereInput = {
  id_eq?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  createdAt_eq?: Maybe<Scalars['DateTime']>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  createdById_eq?: Maybe<Scalars['ID']>
  createdById_in?: Maybe<Array<Scalars['ID']>>
  updatedAt_eq?: Maybe<Scalars['DateTime']>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  updatedById_eq?: Maybe<Scalars['ID']>
  updatedById_in?: Maybe<Array<Scalars['ID']>>
  deletedAt_all?: Maybe<Scalars['Boolean']>
  deletedAt_eq?: Maybe<Scalars['DateTime']>
  deletedAt_lt?: Maybe<Scalars['DateTime']>
  deletedAt_lte?: Maybe<Scalars['DateTime']>
  deletedAt_gt?: Maybe<Scalars['DateTime']>
  deletedAt_gte?: Maybe<Scalars['DateTime']>
  deletedById_eq?: Maybe<Scalars['ID']>
  deletedById_in?: Maybe<Array<Scalars['ID']>>
  block_eq?: Maybe<Scalars['Int']>
  block_gt?: Maybe<Scalars['Int']>
  block_gte?: Maybe<Scalars['Int']>
  block_lt?: Maybe<Scalars['Int']>
  block_lte?: Maybe<Scalars['Int']>
  block_in?: Maybe<Array<Scalars['Int']>>
  executedAt_eq?: Maybe<Scalars['DateTime']>
  executedAt_lt?: Maybe<Scalars['DateTime']>
  executedAt_lte?: Maybe<Scalars['DateTime']>
  executedAt_gt?: Maybe<Scalars['DateTime']>
  executedAt_gte?: Maybe<Scalars['DateTime']>
  network_eq?: Maybe<Network>
  network_in?: Maybe<Array<Network>>
}

export type BlockWhereUniqueInput = {
  id: Scalars['ID']
}

export type DeleteResponse = {
  id: Scalars['ID']
}

export type MembersByHandleFtsOutput = {
  __typename: 'MembersByHandleFTSOutput'
  item: MembersByHandleSearchResult
  rank: Scalars['Float']
  isTypeOf: Scalars['String']
  highlight: Scalars['String']
}

export type MembersByHandleSearchResult = Membership

/** Stored information about a registered user */
export type Membership = BaseGraphQlObject & {
  __typename: 'Membership'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
  /** The unique handle chosen by member */
  handle: Scalars['String']
  /** Member's name */
  name?: Maybe<Scalars['String']>
  /** A Url to member's Avatar image */
  avatarUri?: Maybe<Scalars['String']>
  /** Short text chosen by member to share information about themselves */
  about?: Maybe<Scalars['String']>
  /** Member's controller account id */
  controllerAccount: Scalars['String']
  /** Member's root account id */
  rootAccount: Scalars['String']
  registeredAtBlock: Block
  registeredAtBlockId: Scalars['String']
  /** Timestamp when member was registered */
  registeredAtTime: Scalars['DateTime']
  /** How the member was registered */
  entry: MembershipEntryMethod
  /** Whether member has been verified by membership working group. */
  isVerified: Scalars['Boolean']
  /** Whether member has been verified by membership working group. */
  isFoundingMember: Scalars['Boolean']
  /** Staking accounts bounded to membership. */
  boundAccounts: Array<Scalars['String']>
  /** Current count of invites left to send. */
  inviteCount: Scalars['Int']
  invitees: Array<Membership>
  invitedBy?: Maybe<Membership>
  invitedById?: Maybe<Scalars['String']>
  referredMembers: Array<Membership>
  referredBy?: Maybe<Membership>
  referredById?: Maybe<Scalars['String']>
}

export type MembershipConnection = {
  __typename: 'MembershipConnection'
  totalCount: Scalars['Int']
  edges: Array<MembershipEdge>
  pageInfo: PageInfo
}

export type MembershipCreateInput = {
  handle: Scalars['String']
  name?: Maybe<Scalars['String']>
  avatarUri?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  controllerAccount: Scalars['String']
  rootAccount: Scalars['String']
  registeredAtBlockId: Scalars['ID']
  registeredAtTime: Scalars['DateTime']
  entry: MembershipEntryMethod
  isVerified: Scalars['Boolean']
  boundAccounts: Array<Scalars['String']>
  inviteCount: Scalars['Float']
  invitedById?: Maybe<Scalars['ID']>
  referredById?: Maybe<Scalars['ID']>
}

export type MembershipEdge = {
  __typename: 'MembershipEdge'
  node: Membership
  cursor: Scalars['String']
}

export enum MembershipEntryMethod {
  Paid = 'PAID',
  Invited = 'INVITED',
  Genesis = 'GENESIS',
}

export enum MembershipOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  AvatarUriAsc = 'avatarUri_ASC',
  AvatarUriDesc = 'avatarUri_DESC',
  AboutAsc = 'about_ASC',
  AboutDesc = 'about_DESC',
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  RegisteredAtBlockIdAsc = 'registeredAtBlockId_ASC',
  RegisteredAtBlockIdDesc = 'registeredAtBlockId_DESC',
  RegisteredAtTimeAsc = 'registeredAtTime_ASC',
  RegisteredAtTimeDesc = 'registeredAtTime_DESC',
  EntryAsc = 'entry_ASC',
  EntryDesc = 'entry_DESC',
  IsVerifiedAsc = 'isVerified_ASC',
  IsVerifiedDesc = 'isVerified_DESC',
  InviteCountAsc = 'inviteCount_ASC',
  InviteCountDesc = 'inviteCount_DESC',
  InvitedByIdAsc = 'invitedById_ASC',
  InvitedByIdDesc = 'invitedById_DESC',
  ReferredByIdAsc = 'referredById_ASC',
  ReferredByIdDesc = 'referredById_DESC',
}

export type MembershipSystem = BaseGraphQlObject & {
  __typename: 'MembershipSystem'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
  /** Initial invitation count of a new member. */
  defaultInviteCount: Scalars['Int']
  /** Current price to buy a membership. */
  membershipPrice: Scalars['BigInt']
  /** Amount of tokens diverted to invitor. */
  referralCut: Scalars['BigInt']
  /** The initial, locked, balance credited to controller account of invitee. */
  invitedInitialBalance: Scalars['BigInt']
}

export type MembershipSystemConnection = {
  __typename: 'MembershipSystemConnection'
  totalCount: Scalars['Int']
  edges: Array<MembershipSystemEdge>
  pageInfo: PageInfo
}

export type MembershipSystemCreateInput = {
  defaultInviteCount: Scalars['Float']
  membershipPrice: Scalars['BigInt']
  referralCut: Scalars['BigInt']
  invitedInitialBalance: Scalars['BigInt']
}

export type MembershipSystemEdge = {
  __typename: 'MembershipSystemEdge'
  node: MembershipSystem
  cursor: Scalars['String']
}

export enum MembershipSystemOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DefaultInviteCountAsc = 'defaultInviteCount_ASC',
  DefaultInviteCountDesc = 'defaultInviteCount_DESC',
  MembershipPriceAsc = 'membershipPrice_ASC',
  MembershipPriceDesc = 'membershipPrice_DESC',
  ReferralCutAsc = 'referralCut_ASC',
  ReferralCutDesc = 'referralCut_DESC',
  InvitedInitialBalanceAsc = 'invitedInitialBalance_ASC',
  InvitedInitialBalanceDesc = 'invitedInitialBalance_DESC',
}

export type MembershipSystemUpdateInput = {
  defaultInviteCount?: Maybe<Scalars['Float']>
  membershipPrice?: Maybe<Scalars['BigInt']>
  referralCut?: Maybe<Scalars['BigInt']>
  invitedInitialBalance?: Maybe<Scalars['BigInt']>
}

export type MembershipSystemWhereInput = {
  id_eq?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  createdAt_eq?: Maybe<Scalars['DateTime']>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  createdById_eq?: Maybe<Scalars['ID']>
  createdById_in?: Maybe<Array<Scalars['ID']>>
  updatedAt_eq?: Maybe<Scalars['DateTime']>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  updatedById_eq?: Maybe<Scalars['ID']>
  updatedById_in?: Maybe<Array<Scalars['ID']>>
  deletedAt_all?: Maybe<Scalars['Boolean']>
  deletedAt_eq?: Maybe<Scalars['DateTime']>
  deletedAt_lt?: Maybe<Scalars['DateTime']>
  deletedAt_lte?: Maybe<Scalars['DateTime']>
  deletedAt_gt?: Maybe<Scalars['DateTime']>
  deletedAt_gte?: Maybe<Scalars['DateTime']>
  deletedById_eq?: Maybe<Scalars['ID']>
  deletedById_in?: Maybe<Array<Scalars['ID']>>
  defaultInviteCount_eq?: Maybe<Scalars['Int']>
  defaultInviteCount_gt?: Maybe<Scalars['Int']>
  defaultInviteCount_gte?: Maybe<Scalars['Int']>
  defaultInviteCount_lt?: Maybe<Scalars['Int']>
  defaultInviteCount_lte?: Maybe<Scalars['Int']>
  defaultInviteCount_in?: Maybe<Array<Scalars['Int']>>
  membershipPrice_eq?: Maybe<Scalars['BigInt']>
  membershipPrice_gt?: Maybe<Scalars['BigInt']>
  membershipPrice_gte?: Maybe<Scalars['BigInt']>
  membershipPrice_lt?: Maybe<Scalars['BigInt']>
  membershipPrice_lte?: Maybe<Scalars['BigInt']>
  membershipPrice_in?: Maybe<Array<Scalars['BigInt']>>
  referralCut_eq?: Maybe<Scalars['BigInt']>
  referralCut_gt?: Maybe<Scalars['BigInt']>
  referralCut_gte?: Maybe<Scalars['BigInt']>
  referralCut_lt?: Maybe<Scalars['BigInt']>
  referralCut_lte?: Maybe<Scalars['BigInt']>
  referralCut_in?: Maybe<Array<Scalars['BigInt']>>
  invitedInitialBalance_eq?: Maybe<Scalars['BigInt']>
  invitedInitialBalance_gt?: Maybe<Scalars['BigInt']>
  invitedInitialBalance_gte?: Maybe<Scalars['BigInt']>
  invitedInitialBalance_lt?: Maybe<Scalars['BigInt']>
  invitedInitialBalance_lte?: Maybe<Scalars['BigInt']>
  invitedInitialBalance_in?: Maybe<Array<Scalars['BigInt']>>
}

export type MembershipSystemWhereUniqueInput = {
  id: Scalars['ID']
}

export type MembershipUpdateInput = {
  handle?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  avatarUri?: Maybe<Scalars['String']>
  about?: Maybe<Scalars['String']>
  controllerAccount?: Maybe<Scalars['String']>
  rootAccount?: Maybe<Scalars['String']>
  registeredAtBlockId?: Maybe<Scalars['ID']>
  registeredAtTime?: Maybe<Scalars['DateTime']>
  entry?: Maybe<MembershipEntryMethod>
  isVerified?: Maybe<Scalars['Boolean']>
  boundAccounts?: Maybe<Array<Scalars['String']>>
  inviteCount?: Maybe<Scalars['Float']>
  invitedById?: Maybe<Scalars['ID']>
  referredById?: Maybe<Scalars['ID']>
}

export type MembershipWhereInput = {
  id_eq?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  createdAt_eq?: Maybe<Scalars['DateTime']>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  createdById_eq?: Maybe<Scalars['ID']>
  createdById_in?: Maybe<Array<Scalars['ID']>>
  updatedAt_eq?: Maybe<Scalars['DateTime']>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  updatedById_eq?: Maybe<Scalars['ID']>
  updatedById_in?: Maybe<Array<Scalars['ID']>>
  deletedAt_all?: Maybe<Scalars['Boolean']>
  deletedAt_eq?: Maybe<Scalars['DateTime']>
  deletedAt_lt?: Maybe<Scalars['DateTime']>
  deletedAt_lte?: Maybe<Scalars['DateTime']>
  deletedAt_gt?: Maybe<Scalars['DateTime']>
  deletedAt_gte?: Maybe<Scalars['DateTime']>
  deletedById_eq?: Maybe<Scalars['ID']>
  deletedById_in?: Maybe<Array<Scalars['ID']>>
  handle_eq?: Maybe<Scalars['String']>
  handle_contains?: Maybe<Scalars['String']>
  handle_startsWith?: Maybe<Scalars['String']>
  handle_endsWith?: Maybe<Scalars['String']>
  handle_in?: Maybe<Array<Scalars['String']>>
  name_eq?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_startsWith?: Maybe<Scalars['String']>
  name_endsWith?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  avatarUri_eq?: Maybe<Scalars['String']>
  avatarUri_contains?: Maybe<Scalars['String']>
  avatarUri_startsWith?: Maybe<Scalars['String']>
  avatarUri_endsWith?: Maybe<Scalars['String']>
  avatarUri_in?: Maybe<Array<Scalars['String']>>
  about_eq?: Maybe<Scalars['String']>
  about_contains?: Maybe<Scalars['String']>
  about_startsWith?: Maybe<Scalars['String']>
  about_endsWith?: Maybe<Scalars['String']>
  about_in?: Maybe<Array<Scalars['String']>>
  controllerAccount_eq?: Maybe<Scalars['String']>
  controllerAccount_contains?: Maybe<Scalars['String']>
  controllerAccount_startsWith?: Maybe<Scalars['String']>
  controllerAccount_endsWith?: Maybe<Scalars['String']>
  controllerAccount_in?: Maybe<Array<Scalars['String']>>
  rootAccount_eq?: Maybe<Scalars['String']>
  rootAccount_contains?: Maybe<Scalars['String']>
  rootAccount_startsWith?: Maybe<Scalars['String']>
  rootAccount_endsWith?: Maybe<Scalars['String']>
  rootAccount_in?: Maybe<Array<Scalars['String']>>
  registeredAtBlockId_eq?: Maybe<Scalars['ID']>
  registeredAtBlockId_in?: Maybe<Array<Scalars['ID']>>
  registeredAtTime_eq?: Maybe<Scalars['DateTime']>
  registeredAtTime_lt?: Maybe<Scalars['DateTime']>
  registeredAtTime_lte?: Maybe<Scalars['DateTime']>
  registeredAtTime_gt?: Maybe<Scalars['DateTime']>
  registeredAtTime_gte?: Maybe<Scalars['DateTime']>
  entry_eq?: Maybe<MembershipEntryMethod>
  entry_in?: Maybe<Array<MembershipEntryMethod>>
  isVerified_eq?: Maybe<Scalars['Boolean']>
  isVerified_in?: Maybe<Array<Scalars['Boolean']>>
  inviteCount_eq?: Maybe<Scalars['Int']>
  inviteCount_gt?: Maybe<Scalars['Int']>
  inviteCount_gte?: Maybe<Scalars['Int']>
  inviteCount_lt?: Maybe<Scalars['Int']>
  inviteCount_lte?: Maybe<Scalars['Int']>
  inviteCount_in?: Maybe<Array<Scalars['Int']>>
  invitedById_eq?: Maybe<Scalars['ID']>
  invitedById_in?: Maybe<Array<Scalars['ID']>>
  referredById_eq?: Maybe<Scalars['ID']>
  referredById_in?: Maybe<Array<Scalars['ID']>>
}

export type WorkingGroupOpeningsWhereInput = {
  group_eq?: Maybe<Scalars['ID']>
}

export type WorkersWhereInput = {
  group_eq?: Maybe<Scalars['ID']>
}

export type MembershipWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

export enum Network {
  Babylon = 'BABYLON',
  Alexandria = 'ALEXANDRIA',
  Rome = 'ROME',
  Olympia = 'OLYMPIA',
}

export type PageInfo = {
  __typename: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type ProcessorState = {
  __typename: 'ProcessorState'
  lastCompleteBlock: Scalars['Float']
  lastProcessedEvent: Scalars['String']
  indexerHead: Scalars['Float']
  chainHead: Scalars['Float']
}

export type Query = {
  __typename: 'Query'
  blocks: Array<Block>
  block?: Maybe<Block>
  blocksConnection: BlockConnection
  membershipSystems: Array<MembershipSystem>
  membershipSystem?: Maybe<MembershipSystem>
  membershipSystemsConnection: MembershipSystemConnection
  memberships: Array<Membership>
  membership?: Maybe<Membership>
  membershipsConnection: MembershipConnection
  membersByHandle: Array<MembersByHandleFtsOutput>
  workingGroups: Array<WorkingGroup>
  workers: Array<Worker>
  workingGroupOpenings?: Maybe<Array<WorkingGroupOpening>>
}

export type QueryBlocksArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
}

export type QueryBlockArgs = {
  where: BlockWhereUniqueInput
}

export type QueryBlocksConnectionArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
}

export type QueryMembershipSystemsArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<MembershipSystemWhereInput>
  orderBy?: Maybe<MembershipSystemOrderByInput>
}

export type QueryMembershipSystemArgs = {
  where: MembershipSystemWhereUniqueInput
}

export type QueryMembershipSystemsConnectionArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<MembershipSystemWhereInput>
  orderBy?: Maybe<MembershipSystemOrderByInput>
}

export type QueryMembershipsArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<MembershipWhereInput>
  orderBy?: Maybe<MembershipOrderByInput>
}

export type QueryMembershipArgs = {
  where: MembershipWhereUniqueInput
}

export type QueryMembershipsConnectionArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<MembershipWhereInput>
  orderBy?: Maybe<MembershipOrderByInput>
}

export type QueryMembersByHandleArgs = {
  whereMembership?: Maybe<MembershipWhereInput>
  skip?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  text: Scalars['String']
}

export type QueryWorkingGroupsArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryWorkersArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<WorkersWhereInput>
}

export type QueryWorkingGroupOpeningsArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<WorkingGroupOpeningsWhereInput>
}

export enum EventType {
  MembershipBought = 'MembershipBought',
  MemberInvited = 'MemberInvited',
  MemberProfileUpdated = 'MemberProfileUpdated',
  MemberAccountsUpdated = 'MemberAccountsUpdated',
  MemberVerificationStatusUpdated = 'MemberVerificationStatusUpdated',
  ReferralCutUpdated = 'ReferralCutUpdated',
  InvitesTransferred = 'InvitesTransferred',
  MembershipPriceUpdated = 'MembershipPriceUpdated',
  InitialInvitationBalanceUpdated = 'InitialInvitationBalanceUpdated',
  LeaderInvitationQuotaUpdated = 'LeaderInvitationQuotaUpdated',
  InitialInvitationCountUpdated = 'InitialInvitationCountUpdated',
  StakingAccountAddedEvent = 'StakingAccountAddedEvent',
  StakingAccountConfirmed = 'StakingAccountConfirmed',
  StakingAccountRemoved = 'StakingAccountRemoved',
}

export type Event = {
  __typename: 'Event'
  /** {blockNumber}-{indexInBlock} */
  id: Scalars['ID']
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>
  /** Blocknumber of a block in which the event was emitted. */
  inBlock: Scalars['Int']
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Type of the event */
  type: EventType
}

export type WorkingGroupsEvent = {
  /** Generic event data */
  event: Event
}

export type MembershipEvent = {
  /** Generic event data */
  event: Event
}

export type StandardDeleteResponse = {
  __typename: 'StandardDeleteResponse'
  id: Scalars['ID']
}

export type Subscription = {
  __typename: 'Subscription'
  stateSubscription: ProcessorState
}

export type WorkerStatusActive = {
  __typename: 'WorkerStatusActive'
  _phantom?: Maybe<Scalars['Int']>
}

export type WorkerStatusLeft = {
  __typename: 'WorkerStatusLeft'
  workerExitedEventId: Scalars['ID']
}

export type WorkerStatusTerminated = {
  __typename: 'WorkerStatusTerminated'
  terminatedWorkerEventId: Scalars['ID']
}

export type WorkerStatus = WorkerStatusActive | WorkerStatusLeft | WorkerStatusTerminated

export type Worker = {
  __typename: 'Worker'
  /** The group that the worker belongs to */
  group: WorkingGroup
  leaderGroups?: Maybe<Array<WorkingGroup>>
  /** Worker membership */
  membership: Membership
  /** Worker's role account */
  roleAccount: Scalars['String']
  /** Worker's reward account */
  rewardAccount: Scalars['String']
  /** Worker's staking account */
  stakeAccount: Scalars['String']
  /** Current worker status */
  status: WorkerStatus
  /** Whether the worker is also the working group lead */
  isLead: Scalars['Boolean']
  /** Current role stake (in JOY) */
  stake: Scalars['BigInt']
  /** All related reward payouts @derivedFrom(field: worker) */
  payouts?: Maybe<Array<WorkerPayoutEvent>>
  /** Blocknumber of the block the worker was hired at */
  hiredAtBlock: Scalars['Int']
  /** Time the worker was hired at */
  hiredAtTime: Scalars['DateTime']
  /** Related worker entry application */
  application: WorkingGroupApplication
  /** Worker's storage data */
  storage?: Maybe<Scalars['String']>
}

export type WorkingGroupStatus = {
  __typename: 'WorkingGroupStatus'
  /** Status name */
  name: Scalars['String']
  /** Status message */
  message?: Maybe<Scalars['String']>
  /** Status about text */
  about?: Maybe<Scalars['String']>
  /** Status description text */
  description?: Maybe<Scalars['String']>
  /** The block at which status was set */
  setAtBlock: Block
  /** The time at which status was set */
  setAtTime: Scalars['DateTime']
}

export type WorkingGroup = {
  __typename: 'WorkingGroup'
  /** Working group runtime id */
  id: Scalars['ID']
  /** Working group name */
  name: Scalars['String']
  /** Working group current status */
  status?: Maybe<WorkingGroupStatus>
  /** Current working group leader */
  leader?: Maybe<Worker>
  /** Workers that currently belong to the group or belonged to the group in the past @derivedFrom(field: group) */
  workers?: Maybe<Array<Worker>>
  /** All openings related to this group @derivedFrom(field: group) */
  openings?: Maybe<Array<WorkingGroupOpening>>
  /** Current working group budget (JOY) */
  budget: Scalars['BigInt']
}

export type OpeningStatusCancelled = {
  __typename: 'OpeningStatusCancelled'
  openingCancelledEventId: Scalars['ID']
}

export type OpeningStatusOpen = {
  __typename: 'OpeningStatusOpen'
  _phantom?: Maybe<Scalars['Int']>
}

export type OpeningStatusFilled = {
  __typename: 'OpeningStatusFilled'
  openingFilledEventId: Scalars['ID']
}

export type WorkingGroupOpeningStatus = OpeningStatusOpen | OpeningStatusFilled | OpeningStatusCancelled

export enum WorkingGroupOpeningType {
  Regular = 'REGULAR',
  Leader = 'LEADER',
}

export type WorkingGroupOpeningMetadata = {
  __typename: 'WorkingGroupOpeningMetadata'
  /** Opening short description */
  shortDescription: Scalars['String']
  /** Opening description (md-formatted) */
  description: Scalars['String']
  /** Expected max. number of applicants that will be hired */
  hiringLimit: Scalars['Int']
  /** Expected time when the opening will close */
  expectedEnding: Scalars['DateTime']
  /** Md-formatted text explaining the application process */
  applicationDetails: Scalars['String']
  /** List of questions that should be answered during application @derivedFrom(field: openingMetadata) */
  applicationFormQuestions?: Maybe<Array<ApplicationFormQuestion>>
}

export type WorkingGroupOpening = {
  __typename: 'WorkingGroupOpening'
  /** Opening runtime id */
  id: Scalars['ID']
  /** Related working group */
  group: WorkingGroup
  /** List of opening applications  @derivedFrom(field: opening) */
  applications?: Maybe<Array<WorkingGroupApplication>>
  /** Type of the opening (Leader/Regular) */
  type: WorkingGroupOpeningType
  /** Current opening status */
  status: WorkingGroupOpeningStatus
  /** Opening metadata */
  metadata: WorkingGroupOpeningMetadata
  /** Role stake amount */
  stakeAmount: Scalars['BigInt']
  /** Role stake unstaking period in blocks */
  unstakingPeriod: Scalars['Int']
  /** Initial workers' reward per block */
  rewardPerBlock: Scalars['BigInt']
  /** Blocknumber of opening creation block */
  createdAtBlock: Scalars['Int']
  /** Time of opening creation */
  createdAtTime: Scalars['DateTime']
}

export type ApplicationStatusPending = {
  __typename: 'ApplicationStatusPending'
  _phantom?: Maybe<Scalars['Int']>
}

export type ApplicationStatusAccepted = {
  __typename: 'ApplicationStatusAccepted'
  openingFilledEventId: Scalars['ID']
}

export type ApplicationStatusRejected = {
  __typename: 'ApplicationStatusRejected'
  openingFilledEventId: Scalars['ID']
}

export type ApplicationStatusWithdrawn = {
  __typename: 'ApplicationStatusWithdrawn'
  applicationWithdrawnEventId: Scalars['ID']
}

export type WorkingGroupApplicationStatus =
  | ApplicationStatusPending
  | ApplicationStatusAccepted
  | ApplicationStatusRejected
  | ApplicationStatusWithdrawn

export type WorkingGroupApplication = {
  __typename: 'WorkingGroupApplication'
  /** Application runtime id */
  id: Scalars['ID']
  /** Related working group opening */
  opening: WorkingGroupOpening
  /** Applicant's membership */
  applicant: Membership
  /** Applicant's initial role account */
  roleAccount: Scalars['String']
  /** Applicant's initial reward account */
  rewardAccount: Scalars['String']
  /** Applicant's initial staking account */
  stakingAccount: Scalars['String']
  /** Answers to application form questions @derivedFrom(field: application) */
  answers?: Maybe<Array<ApplicationFormQuestionAnswer>>
  /** Current application status */
  status: WorkingGroupApplicationStatus
  /** Blocknumber of application creation block */
  createdAtBlock: Scalars['Int']
  /** Time of application creation */
  createdAtTime: Scalars['DateTime']
}

export type ApplicationFormQuestionAnswer = {
  __typename: 'ApplicationFormQuestionAnswer'
  /** Related application */
  application: WorkingGroupApplication
  /** The question beeing answered */
  question: ApplicationFormQuestion
  /** Applicant's answer */
  answer: Scalars['String']
}

export enum ApplicationFormQuestionType {
  Text = 'TEXT',
  Textarea = 'TEXTAREA',
}

export type ApplicationFormQuestion = {
  __typename: 'ApplicationFormQuestion'
  /** Related opening metadata */
  openingMetadata: WorkingGroupOpeningMetadata
  /** The question itself */
  question: Scalars['String']
  /** Type of the question (UI answer input type) */
  type: ApplicationFormQuestionType
  /** Index of the question */
  index: Scalars['Int']
}

export type OpeningAddedEvent = WorkingGroupsEvent & {
  __typename: 'OpeningAddedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related opening */
  opening: WorkingGroupOpening
}

export type AppliedOnOpeningEvent = WorkingGroupsEvent & {
  __typename: 'AppliedOnOpeningEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related opening */
  opening: WorkingGroupOpening
  /** The application that was created */
  application: WorkingGroupApplication
}

export type OpeningFilledEvent = WorkingGroupsEvent & {
  __typename: 'OpeningFilledEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related opening */
  opening: WorkingGroupOpening
}

export type LeaderSetEvent = WorkingGroupsEvent & {
  __typename: 'LeaderSetEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related Lead worker */
  worker: Worker
}

export type WorkerRoleAccountUpdatedEvent = WorkingGroupsEvent & {
  __typename: 'WorkerRoleAccountUpdatedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** New role account */
  newRoleAccount: Scalars['String']
}

export type LeaderUnsetEvent = WorkingGroupsEvent & {
  __typename: 'LeaderUnsetEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
}

export type WorkerExitedEvent = WorkingGroupsEvent & {
  __typename: 'WorkerExitedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
}

export type TerminatedWorkerEvent = WorkingGroupsEvent & {
  __typename: 'TerminatedWorkerEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>
}

export type TerminatedLeaderEvent = WorkingGroupsEvent & {
  __typename: 'TerminatedLeaderEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>
}

export type StakeSlashedEvent = WorkingGroupsEvent & {
  __typename: 'StakeSlashedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** Balance that was requested to be slashed */
  requestedAmount: Scalars['BigInt']
  /** Balance that was actually slashed */
  slashedAmount: Scalars['BigInt']
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>
}

export type StakeDecreasedEvent = WorkingGroupsEvent & {
  __typename: 'StakeDecreasedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** The amount of JOY the stake was decreased by */
  amount: Scalars['BigInt']
}

export type StakeIncreasedEvent = WorkingGroupsEvent & {
  __typename: 'StakeIncreasedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** The amount of JOY the stake was increased by */
  amount: Scalars['BigInt']
}

export type ApplicationWithdrawnEvent = WorkingGroupsEvent & {
  __typename: 'ApplicationWithdrawnEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related application */
  application: WorkingGroupApplication
}

export type OpeningCanceledEvent = WorkingGroupsEvent & {
  __typename: 'OpeningCanceledEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related opening */
  opening: WorkingGroupOpening
}

export type BudgetSetEvent = WorkingGroupsEvent & {
  __typename: 'BudgetSetEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** New working group budget */
  newBudget: Scalars['BigInt']
}

export type WorkerRewardAccountUpdatedEvent = WorkingGroupsEvent & {
  __typename: 'WorkerRewardAccountUpdatedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** New reward account */
  newRewardAccount: Scalars['String']
}

export type WorkerRewardAmountUpdatedEvent = WorkingGroupsEvent & {
  __typename: 'WorkerRewardAmountUpdatedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Related worker */
  worker: Worker
  /** New worker reward per block */
  newRewardPerBlock: Scalars['BigInt']
}

export type StatusTextChangedEvent = WorkingGroupsEvent & {
  __typename: 'StatusTextChangedEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** New status metadata */
  status: WorkingGroupStatus
}

export type BudgetSpendingEvent = WorkingGroupsEvent & {
  __typename: 'BudgetSpendingEvent'
  /** Generic event data */
  event: Event
  /** Related group */
  group: WorkingGroup
  /** Reciever account address */
  reciever: Scalars['String']
  /** Amount beeing spent */
  amount: Scalars['BigInt']
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>
}

export enum PayoutType {
  /** Standard reward payout */
  StandardReward = 'STANDARD_REWARD',
  /** Return of the previously missed reward */
  ReturnMissed = 'RETURN_MISSED',
}

export type WorkerPayoutEvent = {
  __typename: 'WorkerPayoutEvent'
  /** Type of the worker payout */
  type?: Maybe<PayoutType>
  /** Related worker */
  worker: Worker
  /** Amount recieved */
  recieved: Scalars['BigInt']
  /** Amount missed (due to, for example, empty working group budget) */
  missed: Scalars['BigInt']
}
