import { createType as createType } from '@joystream/types'
import { Codec, DetectCodec } from '@polkadot/types/types'

const TypeMap = {
  ActorId: 'u64',
  MemberId: 'u64',
  ThreadId: 'u64',
  PostId: 'u64',
  Address: 'AccountId',
  LookupSource: 'AccountId',
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
} as const

type MappedTypeNames = typeof TypeMap
type ValidTypeName<T extends string> = Codec extends DetectCodec<Codec, T> ? never : string
type ValidCodec<T extends string> = Codec extends DetectCodec<Codec, T> ? never : DetectCodec<Codec, T>

const createSafeType = <MTN extends keyof MappedTypeNames, TN extends ValidTypeName<TN>>(
  typeName: MTN | TN,
  value: any
) => {
  const type = typeName in TypeMap ? (TypeMap as Record<string, string>)[typeName] : typeName
  return createType(type, value) as ValidCodec<TN> extends never ? ValidCodec<MappedTypeNames[MTN]> : ValidCodec<TN>
}

export { createSafeType as createType }
