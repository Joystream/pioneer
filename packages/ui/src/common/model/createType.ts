import { createType } from '@joystream/types'
import type { AccountId, Perbill } from '@polkadot/types/interfaces'
import { Codec, DetectCodec } from '@polkadot/types/types'

const TypeMap = {
  AccountId: 'AccountId',
  LockIdentifier: 'Raw',
  Header: '{"number":"u32"}', // TODO Replace by "Header" this once figured why hashes encoding fail
  Balance: 'u128',
  BalanceOf: 'u128',
  BlockNumber: 'u32',
  BlockHash: 'Raw',
  Hash: 'Raw',
  Index: 'u32',

  ActorId: 'u64',
  MemberId: 'u64',
  ThreadId: 'u64',
  PostId: 'u64',
  Address: 'u64',
  LookupSource: 'u64',
  ChannelId: 'u64',
  Url: 'Text',
  ForumUserId: 'u64',
  ModeratorId: 'u64',
  CategoryId: 'u64',
  PostReactionId: 'u64',
  ApplicationId: 'u64',
  WorkerId: 'u64',
  OpeningId: 'u64',
  StorageProviderId: 'u64',
  StorageBucketId: 'u64',
  DataObjectId: 'u64',
  Cid: 'Bytes',
  DistributionBucketIndex: 'u64',
  DistributionBucketFamilyId: 'u64',
  ParticipantId: 'u64',
  Title: 'Text',
  UpdatedTitle: 'Option<Text>',
  UpdatedBody: 'Option<Text>',
  ReplyId: 'u64',
  ProposalId: 'u32',
  VotePower: 'u128',
  BountyId: 'u64',
  EntryId: 'u64',
  CuratorId: 'u64',
  CuratorGroupId: 'u64',
  ChannelCategoryId: 'u64',
  VideoId: 'u64',
  VideoCategoryId: 'u64',
  MaxNumber: 'u32',
  IsCensored: 'bool',
  VideoPostId: 'u64',
  ReactionId: 'u64',
  Royalty: 'Perbill',
  CurrencyOf: 'u128',
  CurrencyAmount: 'u128',
  NftMetadata: 'Vec<u8>',
  OpenAuctionId: 'u64',

  // TODO remove for bounty v2
  BountyActor: 'BountyActor',
  BountyCreationParameters: 'BountyCreationParameters',
  AssuranceContractType: 'AssuranceContractType',
  AssuranceContractType_Closed: 'AssuranceContractType_Closed',
  FundingType: 'FundingType',
  FundingType_Perpetual: 'FundingType_Perpetual',
  FundingType_Limited: 'FundingType_Limited',
  OracleJudgment: 'OracleJudgment',
  OracleWorkEntryJudgment: 'OracleWorkEntryJudgment',
} as const

type MappedTypeNames = typeof TypeMap
type ValidTypeName<T extends string> = Codec extends DetectCodec<Codec, T> ? never : string

type ValidCodec<T extends string> = Codec extends DetectCodec<Codec, T> ? never : DetectCodec<Codec, T>
interface CodecMap {
  AccountId: AccountId
  Perbill: Perbill
}
type SafeCodec<MTN extends keyof MappedTypeNames, TN extends string> = ValidCodec<TN> extends never
  ? ValidCodec<MappedTypeNames[MTN]> extends never
    ? MappedTypeNames[MTN] extends keyof CodecMap
      ? CodecMap[MappedTypeNames[MTN]]
      : never
    : ValidCodec<MappedTypeNames[MTN]>
  : ValidCodec<TN>

const createSafeType = <MTN extends keyof MappedTypeNames, TN extends ValidTypeName<TN>>(
  typeName: MTN | TN,
  value: any
) => {
  const type = typeName in TypeMap ? (TypeMap as Record<string, string>)[typeName] : typeName
  return createType(type, value) as SafeCodec<MTN, TN>
}

export { createSafeType as createType }
