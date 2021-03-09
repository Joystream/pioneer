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
}

/** A blockchain genesis block. */
export enum Network {
  Babylon = 'Babylon',
  Sumer = 'Sumer',
}

/** An event interface. */
export type Event = {
  /** Concatenation of block hash and index in block. */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock?: Maybe<Scalars['Int']>
}

/** A block in the blockchain. */
export type Block = {
  __typename: 'Block'
  /** Hash of block in hex encoding. */
  id: Scalars['ID']
  /** Network in which block occurred. */
  network: Network
  /** Height at which block is committed. */
  height: Scalars['BigInt']
  /** Is block finalized. Note: we can have richer consensus information here in the future, like who signed, but its not a priority now. */
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
  extrinsics?: Maybe<Array<Extrinsic>>
}

/** Substrate Root origin type. */
export type RootOrigin = {
  __typename: 'RootOrigin'
  /** No meaning, only here because GraphQL cannot support empty types. */
  phantomField?: Maybe<Scalars['Int']>
}

/** Substrate signed origin type. */
export type SignedOrigin = {
  __typename: 'SignedOrigin'
  /** Signing account in SS58 encoding. */
  signingAccount: Scalars['String']
}

/** Substrate none origin type. */
export type NoneOrigin = {
  __typename: 'NoneOrigin'
  /** No meaning, only here because GraphQL cannot support empty types. */
  phantomField?: Maybe<Scalars['Int']>
}

/** Substrate extrinsic origin. */
export type ExtrinsicOrigin = RootOrigin | SignedOrigin | NoneOrigin

/** A general blockchain extrinsic. */
export type Extrinsic = {
  __typename: 'Extrinsic'
  /** Hash in hex encoding. */
  id: Scalars['ID']
  /** Name of runtime module to which extrinsic was targeted. */
  moduleName: Scalars['String']
  /** Name of extrinsic, including module prefix. */
  call: Scalars['String']
  /** Nonce */
  Nonce: Scalars['BigInt']
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
  /** Block in which this extrinsic was included. */
  inBlock: Block
  /** Whether extrinsic was successful. */
  successful: Scalars['Boolean']
}

export type BoughtMemberEvent = Event & {
  __typename: 'BoughtMemberEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** New membership created. */
  newMember: Member
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String']
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String']
  /** New member user name. */
  name: Scalars['String']
  /** New member handle. */
  handle: Scalars['String']
  /** New member avatar asset. */
  avatarURI?: Maybe<Scalars['String']>
  /** New member 'about' text. */
  about: Scalars['String']
  /** Referrer member. */
  referrer?: Maybe<Member>
}

export type InvitedMemberEvent = Event & {
  __typename: 'InvitedMemberEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Inviting member created. */
  invitingMember: Member
  /** New membership created. */
  newMember: Member
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String']
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String']
  /** New member user name. */
  name: Scalars['String']
  /** New member handle. */
  handle: Scalars['String']
  /** New member avatar asset. */
  avatarURI?: Maybe<Scalars['String']>
  /** New member 'about' text. */
  about: Scalars['String']
}

export type MemberProfileUpdatedEvent = Event & {
  __typename: 'MemberProfileUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership being updated. */
  member: Member
  /** New member root account in SS58 encoding. Null means no new value was provided. */
  newRootAccount?: Maybe<Scalars['String']>
  /** New member controller in SS58 encoding. Null means no new value was provided. */
  newControllerAccount?: Maybe<Scalars['String']>
  /** New member user name. Null means no new value was provided. */
  newName?: Maybe<Scalars['String']>
  /** New member handle. Null means no new value was provided. */
  newHandle?: Maybe<Scalars['String']>
  /** New avatar asset. Null means no new value was provided. */
  newAvatarURI?: Maybe<Scalars['String']>
  /** New member about text. Null means no new value was provided. */
  newAbout: Scalars['String']
}

export type MemberAccountsUpdatedEvent = Event & {
  __typename: 'MemberAccountsUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New member root account in SS58 encoding. Null means no new value was provided. */
  newRootAccount?: Maybe<Scalars['String']>
  /** New member controller in SS58 encoding. Null means no new value was provided. */
  newControllerAccount?: Maybe<Scalars['String']>
}

export type MemberVerificationStatusUpdatedEvent = Event & {
  __typename: 'MemberVerificationStatusUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New status. */
  isVerified: Scalars['Boolean']
}

export type ReferralCutUpdatedEvent = Event & {
  __typename: 'ReferralCutUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New cut value. */
  newValue: Scalars['BigInt']
}

export type InvitesTransferredEvent = Event & {
  __typename: 'InvitesTransferredEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership sending invites. */
  sourceMember: Member
  /** Membership receiving invites. */
  targetMember: Member
  /** Number of invites transferred. */
  numberOfInvites: Scalars['BigInt']
}

export type MembershipPriceUpdatedEvent = Event & {
  __typename: 'MembershipPriceUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** The new membership price. */
  newPrice: Scalars['BigInt']
}

export type InitialInvitationBalanceUpdatedEvent = Event & {
  __typename: 'InitialInvitationBalanceUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** New initial invitation balance. */
  newInitialBalance: Scalars['BigInt']
}

export type LeaderInvitationQuotaUpdatedEvent = Event & {
  __typename: 'LeaderInvitationQuotaUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New quota. */
  newInvitationQuota: Scalars['Int']
}

export type InitialInvitationCountUpdatedEvent = Event & {
  __typename: 'InitialInvitationCountUpdatedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Initial invitation count for members. */
  newInitialInvitationCount: Scalars['Int']
}

export type StakingAccountAddedEvent = Event & {
  __typename: 'StakingAccountAddedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New staking account in SS58 encoding. */
  account: Scalars['String']
}

export type StakingAccountRemovedEvent = Event & {
  __typename: 'StakingAccountRemovedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New staking account in SS58 encoding. */
  account: Scalars['String']
}

export type StakingAccountConfirmedEvent = Event & {
  __typename: 'StakingAccountConfirmedEvent'
  /** Event identifier */
  id: Scalars['ID']
  /** Possible extrinsic in which */
  inExtrinsic?: Maybe<Extrinsic>
  /** Block in which event was emitted. */
  inBlock: Block
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int']
  /** Membership in question. */
  member: Member
  /** New staking account in SS58 encoding. */
  account: Scalars['String']
}

/** Membership creation genesis configuration. */
export type GenesisConfiguredMember = {
  __typename: 'GenesisConfiguredMember'
  /** Network genesis at which a membership was established. */
  network: Network
}

/** Membership creation via an invitation. */
export type MemberInvitation = {
  __typename: 'MemberInvitation'
  /** Event corresponding to invitation of a membership. */
  event: InvitedMemberEvent
}

/** A membership originating fro a purchase. */
export type MemberPurchase = {
  __typename: 'MemberPurchase'
  /** Event corresponding to buying of a membership. */
  event: BoughtMemberEvent
}

/** From which a membership can originate. */
export type MemberSource = GenesisConfiguredMember | MemberInvitation | MemberPurchase

/** A membership. */
export type Member = {
  __typename: 'Member'
  /** Runtime id of membership */
  id: Scalars['ID']
  /** Root account in SS58 encoding. */
  rootAccount: Scalars['String']
  /** Member controller in SS58 encoding. */
  controllerAccount: Scalars['String']
  /** A human readable mutable string */
  name?: Maybe<Scalars['String']>
  /** The unique handle chosen by member */
  handle?: Maybe<Scalars['String']>
  /** Avatar of member */
  avatarURI?: Maybe<Scalars['String']>
  /** Short text chosen by member to share information about themselves */
  about?: Maybe<Scalars['String']>
  /** Whether member is verified. */
  isVerified: Scalars['Boolean']
  /** Whether member is founding member. */
  isFoundingMember: Scalars['Boolean']
  /** Number of invites member has. */
  inviteCount: Scalars['BigInt']
  /** Accounts bounded to membership. */
  boundAccounts?: Maybe<Array<Scalars['String']>>
  /** Block at which membership was created. */
  registeredAtBlock: Block
  /** Where membership came from. */
  source: MemberSource
}

/** State of the membership system. NB: There should only be one instance of this entity. */
export type MembershipSystem = {
  __typename: 'MembershipSystem'
  /** Current price to buy a membership. */
  membershipPrice: Scalars['BigInt']
  /** Amount of tokens diverted to invitor. */
  referralCut: Scalars['BigInt']
  /** Initial invitation count of a new member. */
  defaultInviteCount: Scalars['BigInt']
  /** The initial, locked, balance credited to controller account of invitee. */
  invitedInitialBalance: Scalars['BigInt']
}

export type MemberWhereUniqueInput = {
  id: Scalars['ID']
}

export type MemberWhereInput = {
  rootAccount_in?: Maybe<Array<Maybe<Scalars['String']>>>
  id_in?: Maybe<Array<Scalars['ID']>>
}

export type Query = {
  __typename: 'Query'
  member?: Maybe<Member>
  members: Array<Member>
}

export type QueryMemberArgs = {
  where: MemberWhereUniqueInput
}

export type QueryMembersArgs = {
  where?: Maybe<MemberWhereInput>
}
