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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
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

/** A block in the blockchain. */
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
  /** Network in which block occurred. */
  network: Network
  /** Height at which block is committed. */
  height: Scalars['BigInt']
  /**
   * Is block finalized. Note: we can have richer consensus information here in the
   * future, like who signed, but its not a priority now.
   */
  isFinalized: Scalars['Boolean']
  /** Timestamp in block. */
  timestamp: Scalars['BigInt']
  /** Hash of block in hex encoding. */
  hash: Scalars['String']
  /** Hash of parent block in hex encoding. */
  parentHash: Scalars['String']
  /** State root hash in hex encoding. */
  stateRoot: Scalars['String']
  /** Extrinsics merkle root in hex encoding. */
  extrinsicRoot: Scalars['String']
  /** Time since last block. */
  blockTime: Scalars['BigInt']
  extrinsics: Array<Extrinsic>
}

export type BlockConnection = {
  __typename: 'BlockConnection'
  totalCount: Scalars['Int']
  edges: Array<BlockEdge>
  pageInfo: PageInfo
}

export type BlockCreateInput = {
  network: Network
  height: Scalars['BigInt']
  isFinalized: Scalars['Boolean']
  timestamp: Scalars['BigInt']
  hash: Scalars['String']
  parentHash: Scalars['String']
  stateRoot: Scalars['String']
  extrinsicRoot: Scalars['String']
  blockTime: Scalars['BigInt']
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
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IsFinalizedAsc = 'isFinalized_ASC',
  IsFinalizedDesc = 'isFinalized_DESC',
  TimestampAsc = 'timestamp_ASC',
  TimestampDesc = 'timestamp_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC',
  ParentHashAsc = 'parentHash_ASC',
  ParentHashDesc = 'parentHash_DESC',
  StateRootAsc = 'stateRoot_ASC',
  StateRootDesc = 'stateRoot_DESC',
  ExtrinsicRootAsc = 'extrinsicRoot_ASC',
  ExtrinsicRootDesc = 'extrinsicRoot_DESC',
  BlockTimeAsc = 'blockTime_ASC',
  BlockTimeDesc = 'blockTime_DESC',
}

export type BlockUpdateInput = {
  network?: Maybe<Network>
  height?: Maybe<Scalars['BigInt']>
  isFinalized?: Maybe<Scalars['Boolean']>
  timestamp?: Maybe<Scalars['BigInt']>
  hash?: Maybe<Scalars['String']>
  parentHash?: Maybe<Scalars['String']>
  stateRoot?: Maybe<Scalars['String']>
  extrinsicRoot?: Maybe<Scalars['String']>
  blockTime?: Maybe<Scalars['BigInt']>
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
  network_eq?: Maybe<Network>
  network_in?: Maybe<Array<Network>>
  height_eq?: Maybe<Scalars['BigInt']>
  height_gt?: Maybe<Scalars['BigInt']>
  height_gte?: Maybe<Scalars['BigInt']>
  height_lt?: Maybe<Scalars['BigInt']>
  height_lte?: Maybe<Scalars['BigInt']>
  height_in?: Maybe<Array<Scalars['BigInt']>>
  isFinalized_eq?: Maybe<Scalars['Boolean']>
  isFinalized_in?: Maybe<Array<Scalars['Boolean']>>
  timestamp_eq?: Maybe<Scalars['BigInt']>
  timestamp_gt?: Maybe<Scalars['BigInt']>
  timestamp_gte?: Maybe<Scalars['BigInt']>
  timestamp_lt?: Maybe<Scalars['BigInt']>
  timestamp_lte?: Maybe<Scalars['BigInt']>
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>
  hash_eq?: Maybe<Scalars['String']>
  hash_contains?: Maybe<Scalars['String']>
  hash_startsWith?: Maybe<Scalars['String']>
  hash_endsWith?: Maybe<Scalars['String']>
  hash_in?: Maybe<Array<Scalars['String']>>
  parentHash_eq?: Maybe<Scalars['String']>
  parentHash_contains?: Maybe<Scalars['String']>
  parentHash_startsWith?: Maybe<Scalars['String']>
  parentHash_endsWith?: Maybe<Scalars['String']>
  parentHash_in?: Maybe<Array<Scalars['String']>>
  stateRoot_eq?: Maybe<Scalars['String']>
  stateRoot_contains?: Maybe<Scalars['String']>
  stateRoot_startsWith?: Maybe<Scalars['String']>
  stateRoot_endsWith?: Maybe<Scalars['String']>
  stateRoot_in?: Maybe<Array<Scalars['String']>>
  extrinsicRoot_eq?: Maybe<Scalars['String']>
  extrinsicRoot_contains?: Maybe<Scalars['String']>
  extrinsicRoot_startsWith?: Maybe<Scalars['String']>
  extrinsicRoot_endsWith?: Maybe<Scalars['String']>
  extrinsicRoot_in?: Maybe<Array<Scalars['String']>>
  blockTime_eq?: Maybe<Scalars['BigInt']>
  blockTime_gt?: Maybe<Scalars['BigInt']>
  blockTime_gte?: Maybe<Scalars['BigInt']>
  blockTime_lt?: Maybe<Scalars['BigInt']>
  blockTime_lte?: Maybe<Scalars['BigInt']>
  blockTime_in?: Maybe<Array<Scalars['BigInt']>>
}

export type BlockWhereUniqueInput = {
  id: Scalars['ID']
}

export type DeleteResponse = {
  id: Scalars['ID']
}

/** A general blockchain extrinsic. */
export type Extrinsic = BaseGraphQlObject & {
  __typename: 'Extrinsic'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  createdById: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedById?: Maybe<Scalars['String']>
  deletedAt?: Maybe<Scalars['DateTime']>
  deletedById?: Maybe<Scalars['String']>
  version: Scalars['Int']
  /** Name of runtime module to which extrinsic was targeted. */
  moduleName: Scalars['String']
  /** Name of extrinsic, including module prefix. */
  call: Scalars['String']
  /** Nonce */
  nonce: Scalars['BigInt']
  /** Fee charged. */
  fee: Scalars['BigInt']
  /** Tip provided. */
  tip: Scalars['BigInt']
  /** Origin for extrinsic. */
  origin: ExtrinsicOrigin
  /** Call parameters, unknown encoding currently. */
  parameters?: Maybe<Scalars['String']>
  /** Index of extrinsic in block. */
  indexInBlock: Scalars['Int']
  inBlock: Block
  inBlockId: Scalars['String']
  /** Whether extrinsic was successful. */
  successful: Scalars['Boolean']
}

export type ExtrinsicConnection = {
  __typename: 'ExtrinsicConnection'
  totalCount: Scalars['Int']
  edges: Array<ExtrinsicEdge>
  pageInfo: PageInfo
}

export type ExtrinsicCreateInput = {
  moduleName: Scalars['String']
  call: Scalars['String']
  nonce: Scalars['BigInt']
  fee: Scalars['BigInt']
  tip: Scalars['BigInt']
  origin: Scalars['JSONObject']
  parameters?: Maybe<Scalars['String']>
  indexInBlock: Scalars['Float']
  inBlockId: Scalars['ID']
  successful: Scalars['Boolean']
}

export type ExtrinsicEdge = {
  __typename: 'ExtrinsicEdge'
  node: Extrinsic
  cursor: Scalars['String']
}

export enum ExtrinsicOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ModuleNameAsc = 'moduleName_ASC',
  ModuleNameDesc = 'moduleName_DESC',
  CallAsc = 'call_ASC',
  CallDesc = 'call_DESC',
  NonceAsc = 'nonce_ASC',
  NonceDesc = 'nonce_DESC',
  FeeAsc = 'fee_ASC',
  FeeDesc = 'fee_DESC',
  TipAsc = 'tip_ASC',
  TipDesc = 'tip_DESC',
  ParametersAsc = 'parameters_ASC',
  ParametersDesc = 'parameters_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  InBlockIdAsc = 'inBlockId_ASC',
  InBlockIdDesc = 'inBlockId_DESC',
  SuccessfulAsc = 'successful_ASC',
  SuccessfulDesc = 'successful_DESC',
}

export type ExtrinsicOrigin = RootOrigin | SignedOrigin | NoneOrigin

export type ExtrinsicUpdateInput = {
  moduleName?: Maybe<Scalars['String']>
  call?: Maybe<Scalars['String']>
  nonce?: Maybe<Scalars['BigInt']>
  fee?: Maybe<Scalars['BigInt']>
  tip?: Maybe<Scalars['BigInt']>
  origin?: Maybe<Scalars['JSONObject']>
  parameters?: Maybe<Scalars['String']>
  indexInBlock?: Maybe<Scalars['Float']>
  inBlockId?: Maybe<Scalars['ID']>
  successful?: Maybe<Scalars['Boolean']>
}

export type ExtrinsicWhereInput = {
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
  moduleName_eq?: Maybe<Scalars['String']>
  moduleName_contains?: Maybe<Scalars['String']>
  moduleName_startsWith?: Maybe<Scalars['String']>
  moduleName_endsWith?: Maybe<Scalars['String']>
  moduleName_in?: Maybe<Array<Scalars['String']>>
  call_eq?: Maybe<Scalars['String']>
  call_contains?: Maybe<Scalars['String']>
  call_startsWith?: Maybe<Scalars['String']>
  call_endsWith?: Maybe<Scalars['String']>
  call_in?: Maybe<Array<Scalars['String']>>
  nonce_eq?: Maybe<Scalars['BigInt']>
  nonce_gt?: Maybe<Scalars['BigInt']>
  nonce_gte?: Maybe<Scalars['BigInt']>
  nonce_lt?: Maybe<Scalars['BigInt']>
  nonce_lte?: Maybe<Scalars['BigInt']>
  nonce_in?: Maybe<Array<Scalars['BigInt']>>
  fee_eq?: Maybe<Scalars['BigInt']>
  fee_gt?: Maybe<Scalars['BigInt']>
  fee_gte?: Maybe<Scalars['BigInt']>
  fee_lt?: Maybe<Scalars['BigInt']>
  fee_lte?: Maybe<Scalars['BigInt']>
  fee_in?: Maybe<Array<Scalars['BigInt']>>
  tip_eq?: Maybe<Scalars['BigInt']>
  tip_gt?: Maybe<Scalars['BigInt']>
  tip_gte?: Maybe<Scalars['BigInt']>
  tip_lt?: Maybe<Scalars['BigInt']>
  tip_lte?: Maybe<Scalars['BigInt']>
  tip_in?: Maybe<Array<Scalars['BigInt']>>
  origin_json?: Maybe<Scalars['JSONObject']>
  parameters_eq?: Maybe<Scalars['String']>
  parameters_contains?: Maybe<Scalars['String']>
  parameters_startsWith?: Maybe<Scalars['String']>
  parameters_endsWith?: Maybe<Scalars['String']>
  parameters_in?: Maybe<Array<Scalars['String']>>
  indexInBlock_eq?: Maybe<Scalars['Int']>
  indexInBlock_gt?: Maybe<Scalars['Int']>
  indexInBlock_gte?: Maybe<Scalars['Int']>
  indexInBlock_lt?: Maybe<Scalars['Int']>
  indexInBlock_lte?: Maybe<Scalars['Int']>
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>
  inBlockId_eq?: Maybe<Scalars['ID']>
  inBlockId_in?: Maybe<Array<Scalars['ID']>>
  successful_eq?: Maybe<Scalars['Boolean']>
  successful_in?: Maybe<Array<Scalars['Boolean']>>
}

export type ExtrinsicWhereUniqueInput = {
  id: Scalars['ID']
}

/** State of the membership system. NB: There should only be one instance of this entity. */
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
  /** Current price to buy a membership. */
  membershipPrice: Scalars['BigInt']
  /** Amount of tokens diverted to invitor. */
  referralCut: Scalars['BigInt']
  /** Initial invitation count of a new member. */
  defaultInviteCount: Scalars['BigInt']
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
  membershipPrice: Scalars['BigInt']
  referralCut: Scalars['BigInt']
  defaultInviteCount: Scalars['BigInt']
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
  MembershipPriceAsc = 'membershipPrice_ASC',
  MembershipPriceDesc = 'membershipPrice_DESC',
  ReferralCutAsc = 'referralCut_ASC',
  ReferralCutDesc = 'referralCut_DESC',
  DefaultInviteCountAsc = 'defaultInviteCount_ASC',
  DefaultInviteCountDesc = 'defaultInviteCount_DESC',
  InvitedInitialBalanceAsc = 'invitedInitialBalance_ASC',
  InvitedInitialBalanceDesc = 'invitedInitialBalance_DESC',
}

export type MembershipSystemUpdateInput = {
  membershipPrice?: Maybe<Scalars['BigInt']>
  referralCut?: Maybe<Scalars['BigInt']>
  defaultInviteCount?: Maybe<Scalars['BigInt']>
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
  defaultInviteCount_eq?: Maybe<Scalars['BigInt']>
  defaultInviteCount_gt?: Maybe<Scalars['BigInt']>
  defaultInviteCount_gte?: Maybe<Scalars['BigInt']>
  defaultInviteCount_lt?: Maybe<Scalars['BigInt']>
  defaultInviteCount_lte?: Maybe<Scalars['BigInt']>
  defaultInviteCount_in?: Maybe<Array<Scalars['BigInt']>>
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

export enum Network {
  Babylon = 'Babylon',
  Sumer = 'Sumer',
}

export type NoneOrigin = {
  __typename: 'NoneOrigin'
  /** No meaning, only here because GraphQL cannot support empty types. */
  phantomField?: Maybe<Scalars['Int']>
}

export type NoneOriginCreateInput = {
  phantomField?: Maybe<Scalars['Float']>
}

export type NoneOriginUpdateInput = {
  phantomField?: Maybe<Scalars['Float']>
}

export type NoneOriginWhereInput = {
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
  phantomField_eq?: Maybe<Scalars['Int']>
  phantomField_gt?: Maybe<Scalars['Int']>
  phantomField_gte?: Maybe<Scalars['Int']>
  phantomField_lt?: Maybe<Scalars['Int']>
  phantomField_lte?: Maybe<Scalars['Int']>
  phantomField_in?: Maybe<Array<Scalars['Int']>>
}

export type NoneOriginWhereUniqueInput = {
  id: Scalars['ID']
}

export type PageInfo = {
  __typename: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type Query = {
  __typename: 'Query'
  blocks: Array<Block>
  block?: Maybe<Block>
  blocksConnection: BlockConnection
  extrinsics: Array<Extrinsic>
  extrinsic?: Maybe<Extrinsic>
  extrinsicsConnection: ExtrinsicConnection
  membershipSystems: Array<MembershipSystem>
  membershipSystem?: Maybe<MembershipSystem>
  membershipSystemsConnection: MembershipSystemConnection
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

export type QueryExtrinsicsArgs = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
  where?: Maybe<ExtrinsicWhereInput>
  orderBy?: Maybe<ExtrinsicOrderByInput>
}

export type QueryExtrinsicArgs = {
  where: ExtrinsicWhereUniqueInput
}

export type QueryExtrinsicsConnectionArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  where?: Maybe<ExtrinsicWhereInput>
  orderBy?: Maybe<ExtrinsicOrderByInput>
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

export type RootOrigin = {
  __typename: 'RootOrigin'
  /** No meaning, only here because GraphQL cannot support empty types. */
  phantomField?: Maybe<Scalars['Int']>
}

export type RootOriginCreateInput = {
  phantomField?: Maybe<Scalars['Float']>
}

export type RootOriginUpdateInput = {
  phantomField?: Maybe<Scalars['Float']>
}

export type RootOriginWhereInput = {
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
  phantomField_eq?: Maybe<Scalars['Int']>
  phantomField_gt?: Maybe<Scalars['Int']>
  phantomField_gte?: Maybe<Scalars['Int']>
  phantomField_lt?: Maybe<Scalars['Int']>
  phantomField_lte?: Maybe<Scalars['Int']>
  phantomField_in?: Maybe<Array<Scalars['Int']>>
}

export type RootOriginWhereUniqueInput = {
  id: Scalars['ID']
}

export type SignedOrigin = {
  __typename: 'SignedOrigin'
  /** Signing account in SS58 encoding. */
  signingAccount: Scalars['String']
}

export type SignedOriginCreateInput = {
  signingAccount: Scalars['String']
}

export type SignedOriginUpdateInput = {
  signingAccount?: Maybe<Scalars['String']>
}

export type SignedOriginWhereInput = {
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
  signingAccount_eq?: Maybe<Scalars['String']>
  signingAccount_contains?: Maybe<Scalars['String']>
  signingAccount_startsWith?: Maybe<Scalars['String']>
  signingAccount_endsWith?: Maybe<Scalars['String']>
  signingAccount_in?: Maybe<Array<Scalars['String']>>
}

export type SignedOriginWhereUniqueInput = {
  id: Scalars['ID']
}

export type StandardDeleteResponse = {
  __typename: 'StandardDeleteResponse'
  id: Scalars['ID']
}
