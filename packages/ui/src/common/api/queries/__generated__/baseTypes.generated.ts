export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** GraphQL representation of BigInt */
  BigInt: any;
  /** GraphQL representation of Bytes */
  Bytes: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AmendConstitutionProposalDetails = {
  __typename: 'AmendConstitutionProposalDetails';
  /** New (proposed) constitution text (md-formatted) */
  text: Scalars['String'];
};

export type AmendConstitutionProposalDetailsCreateInput = {
  text: Scalars['String'];
};

export type AmendConstitutionProposalDetailsUpdateInput = {
  text?: Maybe<Scalars['String']>;
};

export type AmendConstitutionProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<AmendConstitutionProposalDetailsWhereInput>>;
  OR?: Maybe<Array<AmendConstitutionProposalDetailsWhereInput>>;
};

export type AmendConstitutionProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type AnnouncingPeriodStartedEvent = BaseGraphQlObject & {
  __typename: 'AnnouncingPeriodStartedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
};

export type AnnouncingPeriodStartedEventConnection = {
  __typename: 'AnnouncingPeriodStartedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<AnnouncingPeriodStartedEventEdge>;
  pageInfo: PageInfo;
};

export type AnnouncingPeriodStartedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type AnnouncingPeriodStartedEventEdge = {
  __typename: 'AnnouncingPeriodStartedEventEdge';
  node: AnnouncingPeriodStartedEvent;
  cursor: Scalars['String'];
};

export enum AnnouncingPeriodStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type AnnouncingPeriodStartedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type AnnouncingPeriodStartedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<AnnouncingPeriodStartedEventWhereInput>>;
  OR?: Maybe<Array<AnnouncingPeriodStartedEventWhereInput>>;
};

export type AnnouncingPeriodStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationFormQuestion = BaseGraphQlObject & {
  __typename: 'ApplicationFormQuestion';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  openingMetadata: WorkingGroupOpeningMetadata;
  openingMetadataId: Scalars['String'];
  /** The question itself */
  question?: Maybe<Scalars['String']>;
  /** Type of the question (UI answer input type) */
  type: ApplicationFormQuestionType;
  /** Index of the question */
  index: Scalars['Int'];
  applicationformquestionanswerquestion?: Maybe<Array<ApplicationFormQuestionAnswer>>;
};

export type ApplicationFormQuestionAnswer = BaseGraphQlObject & {
  __typename: 'ApplicationFormQuestionAnswer';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  question: ApplicationFormQuestion;
  questionId: Scalars['String'];
  /** Applicant's answer */
  answer: Scalars['String'];
};

export type ApplicationFormQuestionAnswerConnection = {
  __typename: 'ApplicationFormQuestionAnswerConnection';
  totalCount: Scalars['Int'];
  edges: Array<ApplicationFormQuestionAnswerEdge>;
  pageInfo: PageInfo;
};

export type ApplicationFormQuestionAnswerCreateInput = {
  application: Scalars['ID'];
  question: Scalars['ID'];
  answer: Scalars['String'];
};

export type ApplicationFormQuestionAnswerEdge = {
  __typename: 'ApplicationFormQuestionAnswerEdge';
  node: ApplicationFormQuestionAnswer;
  cursor: Scalars['String'];
};

export enum ApplicationFormQuestionAnswerOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  QuestionAsc = 'question_ASC',
  QuestionDesc = 'question_DESC',
  AnswerAsc = 'answer_ASC',
  AnswerDesc = 'answer_DESC'
}

export type ApplicationFormQuestionAnswerUpdateInput = {
  application?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['ID']>;
  answer?: Maybe<Scalars['String']>;
};

export type ApplicationFormQuestionAnswerWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  question_eq?: Maybe<Scalars['ID']>;
  question_in?: Maybe<Array<Scalars['ID']>>;
  answer_eq?: Maybe<Scalars['String']>;
  answer_contains?: Maybe<Scalars['String']>;
  answer_startsWith?: Maybe<Scalars['String']>;
  answer_endsWith?: Maybe<Scalars['String']>;
  answer_in?: Maybe<Array<Scalars['String']>>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  question?: Maybe<ApplicationFormQuestionWhereInput>;
  AND?: Maybe<Array<ApplicationFormQuestionAnswerWhereInput>>;
  OR?: Maybe<Array<ApplicationFormQuestionAnswerWhereInput>>;
};

export type ApplicationFormQuestionAnswerWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationFormQuestionConnection = {
  __typename: 'ApplicationFormQuestionConnection';
  totalCount: Scalars['Int'];
  edges: Array<ApplicationFormQuestionEdge>;
  pageInfo: PageInfo;
};

export type ApplicationFormQuestionCreateInput = {
  openingMetadata: Scalars['ID'];
  question?: Maybe<Scalars['String']>;
  type: ApplicationFormQuestionType;
  index: Scalars['Float'];
};

export type ApplicationFormQuestionEdge = {
  __typename: 'ApplicationFormQuestionEdge';
  node: ApplicationFormQuestion;
  cursor: Scalars['String'];
};

export enum ApplicationFormQuestionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  OpeningMetadataAsc = 'openingMetadata_ASC',
  OpeningMetadataDesc = 'openingMetadata_DESC',
  QuestionAsc = 'question_ASC',
  QuestionDesc = 'question_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  IndexAsc = 'index_ASC',
  IndexDesc = 'index_DESC'
}

export enum ApplicationFormQuestionType {
  Text = 'TEXT',
  Textarea = 'TEXTAREA'
}

export type ApplicationFormQuestionUpdateInput = {
  openingMetadata?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
  type?: Maybe<ApplicationFormQuestionType>;
  index?: Maybe<Scalars['Float']>;
};

export type ApplicationFormQuestionWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  openingMetadata_eq?: Maybe<Scalars['ID']>;
  openingMetadata_in?: Maybe<Array<Scalars['ID']>>;
  question_eq?: Maybe<Scalars['String']>;
  question_contains?: Maybe<Scalars['String']>;
  question_startsWith?: Maybe<Scalars['String']>;
  question_endsWith?: Maybe<Scalars['String']>;
  question_in?: Maybe<Array<Scalars['String']>>;
  type_eq?: Maybe<ApplicationFormQuestionType>;
  type_in?: Maybe<Array<ApplicationFormQuestionType>>;
  index_eq?: Maybe<Scalars['Int']>;
  index_gt?: Maybe<Scalars['Int']>;
  index_gte?: Maybe<Scalars['Int']>;
  index_lt?: Maybe<Scalars['Int']>;
  index_lte?: Maybe<Scalars['Int']>;
  index_in?: Maybe<Array<Scalars['Int']>>;
  openingMetadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  applicationformquestionanswerquestion_none?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  applicationformquestionanswerquestion_some?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  applicationformquestionanswerquestion_every?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  AND?: Maybe<Array<ApplicationFormQuestionWhereInput>>;
  OR?: Maybe<Array<ApplicationFormQuestionWhereInput>>;
};

export type ApplicationFormQuestionWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationStatusAccepted = {
  __typename: 'ApplicationStatusAccepted';
  /** Related OpeningFilled event */
  openingFilledEvent?: Maybe<OpeningFilledEvent>;
};

export type ApplicationStatusCancelled = {
  __typename: 'ApplicationStatusCancelled';
  /** Related OpeningCanceled event */
  openingCanceledEvent?: Maybe<OpeningCanceledEvent>;
};

export type ApplicationStatusPending = {
  __typename: 'ApplicationStatusPending';
  phantom?: Maybe<Scalars['Int']>;
};

export type ApplicationStatusPendingCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ApplicationStatusPendingUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ApplicationStatusPendingWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ApplicationStatusPendingWhereInput>>;
  OR?: Maybe<Array<ApplicationStatusPendingWhereInput>>;
};

export type ApplicationStatusPendingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationStatusRejected = {
  __typename: 'ApplicationStatusRejected';
  /** Related OpeningFilled event */
  openingFilledEvent?: Maybe<OpeningFilledEvent>;
};

export type ApplicationStatusWithdrawn = {
  __typename: 'ApplicationStatusWithdrawn';
  /** Related ApplicationWithdrawn event */
  applicationWithdrawnEvent?: Maybe<ApplicationWithdrawnEvent>;
};

export type ApplicationWithdrawnEvent = Event & BaseGraphQlObject & {
  __typename: 'ApplicationWithdrawnEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
};

export type ApplicationWithdrawnEventConnection = {
  __typename: 'ApplicationWithdrawnEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ApplicationWithdrawnEventEdge>;
  pageInfo: PageInfo;
};

export type ApplicationWithdrawnEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  application: Scalars['ID'];
};

export type ApplicationWithdrawnEventEdge = {
  __typename: 'ApplicationWithdrawnEventEdge';
  node: ApplicationWithdrawnEvent;
  cursor: Scalars['String'];
};

export enum ApplicationWithdrawnEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC'
}

export type ApplicationWithdrawnEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  application?: Maybe<Scalars['ID']>;
};

export type ApplicationWithdrawnEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  AND?: Maybe<Array<ApplicationWithdrawnEventWhereInput>>;
  OR?: Maybe<Array<ApplicationWithdrawnEventWhereInput>>;
};

export type ApplicationWithdrawnEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type AppliedOnOpeningEvent = Event & BaseGraphQlObject & {
  __typename: 'AppliedOnOpeningEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
};

export type AppliedOnOpeningEventConnection = {
  __typename: 'AppliedOnOpeningEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<AppliedOnOpeningEventEdge>;
  pageInfo: PageInfo;
};

export type AppliedOnOpeningEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  opening: Scalars['ID'];
  application: Scalars['ID'];
};

export type AppliedOnOpeningEventEdge = {
  __typename: 'AppliedOnOpeningEventEdge';
  node: AppliedOnOpeningEvent;
  cursor: Scalars['String'];
};

export enum AppliedOnOpeningEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC'
}

export type AppliedOnOpeningEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  opening?: Maybe<Scalars['ID']>;
  application?: Maybe<Scalars['ID']>;
};

export type AppliedOnOpeningEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  AND?: Maybe<Array<AppliedOnOpeningEventWhereInput>>;
  OR?: Maybe<Array<AppliedOnOpeningEventWhereInput>>;
};

export type AppliedOnOpeningEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Asset = AssetExternal | AssetJoystreamStorage | AssetNone;

export type AssetExternal = {
  __typename: 'AssetExternal';
  /** JSON array of the urls */
  urls: Scalars['String'];
};

export type AssetExternalCreateInput = {
  urls: Scalars['String'];
};

export type AssetExternalUpdateInput = {
  urls?: Maybe<Scalars['String']>;
};

export type AssetExternalWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  urls_eq?: Maybe<Scalars['String']>;
  urls_contains?: Maybe<Scalars['String']>;
  urls_startsWith?: Maybe<Scalars['String']>;
  urls_endsWith?: Maybe<Scalars['String']>;
  urls_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<AssetExternalWhereInput>>;
  OR?: Maybe<Array<AssetExternalWhereInput>>;
};

export type AssetExternalWhereUniqueInput = {
  id: Scalars['ID'];
};

export type AssetJoystreamStorage = {
  __typename: 'AssetJoystreamStorage';
  /** Related DataObject entity */
  dataObject?: Maybe<DataObject>;
};

export type AssetNone = {
  __typename: 'AssetNone';
  phantom?: Maybe<Scalars['Int']>;
};

export type AssetNoneCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type AssetNoneUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type AssetNoneWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<AssetNoneWhereInput>>;
  OR?: Maybe<Array<AssetNoneWhereInput>>;
};

export type AssetNoneWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BaseGraphQlObject = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseModel = BaseGraphQlObject & {
  __typename: 'BaseModel';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseModelUuid = BaseGraphQlObject & {
  __typename: 'BaseModelUUID';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseWhereInput = {
  id_eq?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Scalars['String']>>;
  createdAt_eq?: Maybe<Scalars['String']>;
  createdAt_lt?: Maybe<Scalars['String']>;
  createdAt_lte?: Maybe<Scalars['String']>;
  createdAt_gt?: Maybe<Scalars['String']>;
  createdAt_gte?: Maybe<Scalars['String']>;
  createdById_eq?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['String']>;
  updatedAt_lt?: Maybe<Scalars['String']>;
  updatedAt_lte?: Maybe<Scalars['String']>;
  updatedAt_gt?: Maybe<Scalars['String']>;
  updatedAt_gte?: Maybe<Scalars['String']>;
  updatedById_eq?: Maybe<Scalars['String']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['String']>;
  deletedAt_lt?: Maybe<Scalars['String']>;
  deletedAt_lte?: Maybe<Scalars['String']>;
  deletedAt_gt?: Maybe<Scalars['String']>;
  deletedAt_gte?: Maybe<Scalars['String']>;
  deletedById_eq?: Maybe<Scalars['String']>;
};


export type Budget = BaseGraphQlObject & {
  __typename: 'Budget';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Block number at which the next rewards will be paid. */
  nextRewardPaymentsAt: Scalars['BigInt'];
};

export type BudgetBalanceSetEvent = BaseGraphQlObject & {
  __typename: 'BudgetBalanceSetEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Budget balance that has been set. */
  balance: Scalars['BigInt'];
};

export type BudgetBalanceSetEventConnection = {
  __typename: 'BudgetBalanceSetEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetBalanceSetEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetBalanceSetEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  balance: Scalars['BigInt'];
};

export type BudgetBalanceSetEventEdge = {
  __typename: 'BudgetBalanceSetEventEdge';
  node: BudgetBalanceSetEvent;
  cursor: Scalars['String'];
};

export enum BudgetBalanceSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC'
}

export type BudgetBalanceSetEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  balance?: Maybe<Scalars['BigInt']>;
};

export type BudgetBalanceSetEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<BudgetBalanceSetEventWhereInput>>;
  OR?: Maybe<Array<BudgetBalanceSetEventWhereInput>>;
};

export type BudgetBalanceSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetConnection = {
  __typename: 'BudgetConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetEdge>;
  pageInfo: PageInfo;
};

export type BudgetCreateInput = {
  nextRewardPaymentsAt: Scalars['BigInt'];
};

export type BudgetEdge = {
  __typename: 'BudgetEdge';
  node: Budget;
  cursor: Scalars['String'];
};

export type BudgetIncrementUpdatedEvent = BaseGraphQlObject & {
  __typename: 'BudgetIncrementUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Amount that is added to the budget each time it's refilled. */
  amount: Scalars['BigInt'];
};

export type BudgetIncrementUpdatedEventConnection = {
  __typename: 'BudgetIncrementUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetIncrementUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetIncrementUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  amount: Scalars['BigInt'];
};

export type BudgetIncrementUpdatedEventEdge = {
  __typename: 'BudgetIncrementUpdatedEventEdge';
  node: BudgetIncrementUpdatedEvent;
  cursor: Scalars['String'];
};

export enum BudgetIncrementUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC'
}

export type BudgetIncrementUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  amount?: Maybe<Scalars['BigInt']>;
};

export type BudgetIncrementUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<BudgetIncrementUpdatedEventWhereInput>>;
  OR?: Maybe<Array<BudgetIncrementUpdatedEventWhereInput>>;
};

export type BudgetIncrementUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum BudgetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NextRewardPaymentsAtAsc = 'nextRewardPaymentsAt_ASC',
  NextRewardPaymentsAtDesc = 'nextRewardPaymentsAt_DESC'
}

export type BudgetPayment = BaseGraphQlObject & {
  __typename: 'BudgetPayment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Block number at which the payment was done. */
  paidAtBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Account that received the payment */
  account: Scalars['String'];
  /** Amount that was paid. */
  amount: Scalars['BigInt'];
  /** Amount that couldn't be paid due to insufficient council budget's balance. */
  unpaidAmount: Scalars['BigInt'];
};

export type BudgetPaymentConnection = {
  __typename: 'BudgetPaymentConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetPaymentEdge>;
  pageInfo: PageInfo;
};

export type BudgetPaymentCreateInput = {
  paidAtBlock: Scalars['Float'];
  member: Scalars['ID'];
  account: Scalars['String'];
  amount: Scalars['BigInt'];
  unpaidAmount: Scalars['BigInt'];
};

export type BudgetPaymentEdge = {
  __typename: 'BudgetPaymentEdge';
  node: BudgetPayment;
  cursor: Scalars['String'];
};

export enum BudgetPaymentOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  PaidAtBlockAsc = 'paidAtBlock_ASC',
  PaidAtBlockDesc = 'paidAtBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  UnpaidAmountAsc = 'unpaidAmount_ASC',
  UnpaidAmountDesc = 'unpaidAmount_DESC'
}

export type BudgetPaymentUpdateInput = {
  paidAtBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  account?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  unpaidAmount?: Maybe<Scalars['BigInt']>;
};

export type BudgetPaymentWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  paidAtBlock_eq?: Maybe<Scalars['Int']>;
  paidAtBlock_gt?: Maybe<Scalars['Int']>;
  paidAtBlock_gte?: Maybe<Scalars['Int']>;
  paidAtBlock_lt?: Maybe<Scalars['Int']>;
  paidAtBlock_lte?: Maybe<Scalars['Int']>;
  paidAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  unpaidAmount_eq?: Maybe<Scalars['BigInt']>;
  unpaidAmount_gt?: Maybe<Scalars['BigInt']>;
  unpaidAmount_gte?: Maybe<Scalars['BigInt']>;
  unpaidAmount_lt?: Maybe<Scalars['BigInt']>;
  unpaidAmount_lte?: Maybe<Scalars['BigInt']>;
  unpaidAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<BudgetPaymentWhereInput>>;
  OR?: Maybe<Array<BudgetPaymentWhereInput>>;
};

export type BudgetPaymentWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetRefillEvent = BaseGraphQlObject & {
  __typename: 'BudgetRefillEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Balance that has been refilled. */
  balance: Scalars['BigInt'];
};

export type BudgetRefillEventConnection = {
  __typename: 'BudgetRefillEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetRefillEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetRefillEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  balance: Scalars['BigInt'];
};

export type BudgetRefillEventEdge = {
  __typename: 'BudgetRefillEventEdge';
  node: BudgetRefillEvent;
  cursor: Scalars['String'];
};

export enum BudgetRefillEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC'
}

export type BudgetRefillEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  balance?: Maybe<Scalars['BigInt']>;
};

export type BudgetRefillEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<BudgetRefillEventWhereInput>>;
  OR?: Maybe<Array<BudgetRefillEventWhereInput>>;
};

export type BudgetRefillEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetRefillPlannedEvent = BaseGraphQlObject & {
  __typename: 'BudgetRefillPlannedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
};

export type BudgetRefillPlannedEventConnection = {
  __typename: 'BudgetRefillPlannedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetRefillPlannedEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetRefillPlannedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type BudgetRefillPlannedEventEdge = {
  __typename: 'BudgetRefillPlannedEventEdge';
  node: BudgetRefillPlannedEvent;
  cursor: Scalars['String'];
};

export enum BudgetRefillPlannedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type BudgetRefillPlannedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type BudgetRefillPlannedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<BudgetRefillPlannedEventWhereInput>>;
  OR?: Maybe<Array<BudgetRefillPlannedEventWhereInput>>;
};

export type BudgetRefillPlannedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetSetEvent = Event & BaseGraphQlObject & {
  __typename: 'BudgetSetEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  /** New working group budget */
  newBudget: Scalars['BigInt'];
};

export type BudgetSetEventConnection = {
  __typename: 'BudgetSetEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetSetEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetSetEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  newBudget: Scalars['BigInt'];
};

export type BudgetSetEventEdge = {
  __typename: 'BudgetSetEventEdge';
  node: BudgetSetEvent;
  cursor: Scalars['String'];
};

export enum BudgetSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  NewBudgetAsc = 'newBudget_ASC',
  NewBudgetDesc = 'newBudget_DESC'
}

export type BudgetSetEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  newBudget?: Maybe<Scalars['BigInt']>;
};

export type BudgetSetEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  newBudget_eq?: Maybe<Scalars['BigInt']>;
  newBudget_gt?: Maybe<Scalars['BigInt']>;
  newBudget_gte?: Maybe<Scalars['BigInt']>;
  newBudget_lt?: Maybe<Scalars['BigInt']>;
  newBudget_lte?: Maybe<Scalars['BigInt']>;
  newBudget_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  AND?: Maybe<Array<BudgetSetEventWhereInput>>;
  OR?: Maybe<Array<BudgetSetEventWhereInput>>;
};

export type BudgetSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetSpendingEvent = Event & BaseGraphQlObject & {
  __typename: 'BudgetSpendingEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  /** Reciever account address */
  reciever: Scalars['String'];
  /** Amount beeing spent */
  amount: Scalars['BigInt'];
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
};

export type BudgetSpendingEventConnection = {
  __typename: 'BudgetSpendingEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<BudgetSpendingEventEdge>;
  pageInfo: PageInfo;
};

export type BudgetSpendingEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  reciever: Scalars['String'];
  amount: Scalars['BigInt'];
  rationale?: Maybe<Scalars['String']>;
};

export type BudgetSpendingEventEdge = {
  __typename: 'BudgetSpendingEventEdge';
  node: BudgetSpendingEvent;
  cursor: Scalars['String'];
};

export enum BudgetSpendingEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  RecieverAsc = 'reciever_ASC',
  RecieverDesc = 'reciever_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type BudgetSpendingEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  reciever?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type BudgetSpendingEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  reciever_eq?: Maybe<Scalars['String']>;
  reciever_contains?: Maybe<Scalars['String']>;
  reciever_startsWith?: Maybe<Scalars['String']>;
  reciever_endsWith?: Maybe<Scalars['String']>;
  reciever_in?: Maybe<Array<Scalars['String']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  AND?: Maybe<Array<BudgetSpendingEventWhereInput>>;
  OR?: Maybe<Array<BudgetSpendingEventWhereInput>>;
};

export type BudgetSpendingEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetUpdateInput = {
  nextRewardPaymentsAt?: Maybe<Scalars['BigInt']>;
};

export type BudgetWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  nextRewardPaymentsAt_eq?: Maybe<Scalars['BigInt']>;
  nextRewardPaymentsAt_gt?: Maybe<Scalars['BigInt']>;
  nextRewardPaymentsAt_gte?: Maybe<Scalars['BigInt']>;
  nextRewardPaymentsAt_lt?: Maybe<Scalars['BigInt']>;
  nextRewardPaymentsAt_lte?: Maybe<Scalars['BigInt']>;
  nextRewardPaymentsAt_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<BudgetWhereInput>>;
  OR?: Maybe<Array<BudgetWhereInput>>;
};

export type BudgetWhereUniqueInput = {
  id: Scalars['ID'];
};


export type CancelWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'CancelWorkingGroupLeadOpeningProposalDetails';
  /** Opening to be cancelled */
  opening?: Maybe<WorkingGroupOpening>;
};

export type CandidacyNoteSetEvent = BaseGraphQlObject & {
  __typename: 'CandidacyNoteSetEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** The note that has been set. */
  note: Scalars['String'];
};

export type CandidacyNoteSetEventConnection = {
  __typename: 'CandidacyNoteSetEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CandidacyNoteSetEventEdge>;
  pageInfo: PageInfo;
};

export type CandidacyNoteSetEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  note: Scalars['String'];
};

export type CandidacyNoteSetEventEdge = {
  __typename: 'CandidacyNoteSetEventEdge';
  node: CandidacyNoteSetEvent;
  cursor: Scalars['String'];
};

export enum CandidacyNoteSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NoteAsc = 'note_ASC',
  NoteDesc = 'note_DESC'
}

export type CandidacyNoteSetEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  note?: Maybe<Scalars['String']>;
};

export type CandidacyNoteSetEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  note_eq?: Maybe<Scalars['String']>;
  note_contains?: Maybe<Scalars['String']>;
  note_startsWith?: Maybe<Scalars['String']>;
  note_endsWith?: Maybe<Scalars['String']>;
  note_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<CandidacyNoteSetEventWhereInput>>;
  OR?: Maybe<Array<CandidacyNoteSetEventWhereInput>>;
};

export type CandidacyNoteSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CandidacyStakeReleaseEvent = BaseGraphQlObject & {
  __typename: 'CandidacyStakeReleaseEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
};

export type CandidacyStakeReleaseEventConnection = {
  __typename: 'CandidacyStakeReleaseEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CandidacyStakeReleaseEventEdge>;
  pageInfo: PageInfo;
};

export type CandidacyStakeReleaseEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
};

export type CandidacyStakeReleaseEventEdge = {
  __typename: 'CandidacyStakeReleaseEventEdge';
  node: CandidacyStakeReleaseEvent;
  cursor: Scalars['String'];
};

export enum CandidacyStakeReleaseEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC'
}

export type CandidacyStakeReleaseEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
};

export type CandidacyStakeReleaseEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<CandidacyStakeReleaseEventWhereInput>>;
  OR?: Maybe<Array<CandidacyStakeReleaseEventWhereInput>>;
};

export type CandidacyStakeReleaseEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CandidacyWithdrawEvent = BaseGraphQlObject & {
  __typename: 'CandidacyWithdrawEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
};

export type CandidacyWithdrawEventConnection = {
  __typename: 'CandidacyWithdrawEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CandidacyWithdrawEventEdge>;
  pageInfo: PageInfo;
};

export type CandidacyWithdrawEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
};

export type CandidacyWithdrawEventEdge = {
  __typename: 'CandidacyWithdrawEventEdge';
  node: CandidacyWithdrawEvent;
  cursor: Scalars['String'];
};

export enum CandidacyWithdrawEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC'
}

export type CandidacyWithdrawEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
};

export type CandidacyWithdrawEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<CandidacyWithdrawEventWhereInput>>;
  OR?: Maybe<Array<CandidacyWithdrawEventWhereInput>>;
};

export type CandidacyWithdrawEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Candidate = BaseGraphQlObject & {
  __typename: 'Candidate';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Account used for staking currency needed for the candidacy. */
  stakingAccountId: Scalars['String'];
  /** Account that will receive rewards if candidate's elected to the council. */
  rewardAccountId: Scalars['String'];
  member: Membership;
  memberId: Scalars['String'];
  cycleId: ElectionRound;
  cycleIdId: Scalars['String'];
  stake: Scalars['BigInt'];
  votePower: Scalars['BigInt'];
  note: Scalars['String'];
};

export type CandidateConnection = {
  __typename: 'CandidateConnection';
  totalCount: Scalars['Int'];
  edges: Array<CandidateEdge>;
  pageInfo: PageInfo;
};

export type CandidateCreateInput = {
  stakingAccountId: Scalars['String'];
  rewardAccountId: Scalars['String'];
  cycleId: Scalars['ID'];
  stake: Scalars['BigInt'];
  votePower: Scalars['BigInt'];
  note: Scalars['String'];
};

export type CandidateEdge = {
  __typename: 'CandidateEdge';
  node: Candidate;
  cursor: Scalars['String'];
};

export enum CandidateOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  StakingAccountIdAsc = 'stakingAccountId_ASC',
  StakingAccountIdDesc = 'stakingAccountId_DESC',
  RewardAccountIdAsc = 'rewardAccountId_ASC',
  RewardAccountIdDesc = 'rewardAccountId_DESC',
  CycleIdAsc = 'cycleId_ASC',
  CycleIdDesc = 'cycleId_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC',
  NoteAsc = 'note_ASC',
  NoteDesc = 'note_DESC'
}

export type CandidateUpdateInput = {
  stakingAccountId?: Maybe<Scalars['String']>;
  rewardAccountId?: Maybe<Scalars['String']>;
  cycleId?: Maybe<Scalars['ID']>;
  stake?: Maybe<Scalars['BigInt']>;
  votePower?: Maybe<Scalars['BigInt']>;
  note?: Maybe<Scalars['String']>;
};

export type CandidateWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  stakingAccountId_eq?: Maybe<Scalars['String']>;
  stakingAccountId_contains?: Maybe<Scalars['String']>;
  stakingAccountId_startsWith?: Maybe<Scalars['String']>;
  stakingAccountId_endsWith?: Maybe<Scalars['String']>;
  stakingAccountId_in?: Maybe<Array<Scalars['String']>>;
  rewardAccountId_eq?: Maybe<Scalars['String']>;
  rewardAccountId_contains?: Maybe<Scalars['String']>;
  rewardAccountId_startsWith?: Maybe<Scalars['String']>;
  rewardAccountId_endsWith?: Maybe<Scalars['String']>;
  rewardAccountId_in?: Maybe<Array<Scalars['String']>>;
  cycleId_eq?: Maybe<Scalars['ID']>;
  cycleId_in?: Maybe<Array<Scalars['ID']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  note_eq?: Maybe<Scalars['String']>;
  note_contains?: Maybe<Scalars['String']>;
  note_startsWith?: Maybe<Scalars['String']>;
  note_endsWith?: Maybe<Scalars['String']>;
  note_in?: Maybe<Array<Scalars['String']>>;
  cycleId?: Maybe<ElectionRoundWhereInput>;
  AND?: Maybe<Array<CandidateWhereInput>>;
  OR?: Maybe<Array<CandidateWhereInput>>;
};

export type CandidateWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CastVote = BaseGraphQlObject & {
  __typename: 'CastVote';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hashed vote that was casted before being revealed. */
  commitment: Scalars['String'];
  cycleId: ElectionRound;
  cycleIdId: Scalars['String'];
  /** Stake used to back up the vote. */
  stake: Scalars['BigInt'];
  /** Account that cast the vote. */
  castBy: Scalars['String'];
  voteFor?: Maybe<Membership>;
  voteForId?: Maybe<Scalars['String']>;
};

export type CastVoteConnection = {
  __typename: 'CastVoteConnection';
  totalCount: Scalars['Int'];
  edges: Array<CastVoteEdge>;
  pageInfo: PageInfo;
};

export type CastVoteCreateInput = {
  commitment: Scalars['String'];
  cycleId: Scalars['ID'];
  stake: Scalars['BigInt'];
  castBy: Scalars['String'];
  voteFor?: Maybe<Scalars['ID']>;
};

export type CastVoteEdge = {
  __typename: 'CastVoteEdge';
  node: CastVote;
  cursor: Scalars['String'];
};

export enum CastVoteOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CommitmentAsc = 'commitment_ASC',
  CommitmentDesc = 'commitment_DESC',
  CycleIdAsc = 'cycleId_ASC',
  CycleIdDesc = 'cycleId_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  CastByAsc = 'castBy_ASC',
  CastByDesc = 'castBy_DESC',
  VoteForAsc = 'voteFor_ASC',
  VoteForDesc = 'voteFor_DESC'
}

export type CastVoteUpdateInput = {
  commitment?: Maybe<Scalars['String']>;
  cycleId?: Maybe<Scalars['ID']>;
  stake?: Maybe<Scalars['BigInt']>;
  castBy?: Maybe<Scalars['String']>;
  voteFor?: Maybe<Scalars['ID']>;
};

export type CastVoteWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  commitment_eq?: Maybe<Scalars['String']>;
  commitment_contains?: Maybe<Scalars['String']>;
  commitment_startsWith?: Maybe<Scalars['String']>;
  commitment_endsWith?: Maybe<Scalars['String']>;
  commitment_in?: Maybe<Array<Scalars['String']>>;
  cycleId_eq?: Maybe<Scalars['ID']>;
  cycleId_in?: Maybe<Array<Scalars['ID']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  castBy_eq?: Maybe<Scalars['String']>;
  castBy_contains?: Maybe<Scalars['String']>;
  castBy_startsWith?: Maybe<Scalars['String']>;
  castBy_endsWith?: Maybe<Scalars['String']>;
  castBy_in?: Maybe<Array<Scalars['String']>>;
  voteFor_eq?: Maybe<Scalars['ID']>;
  voteFor_in?: Maybe<Array<Scalars['ID']>>;
  cycleId?: Maybe<ElectionRoundWhereInput>;
  voteFor?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<CastVoteWhereInput>>;
  OR?: Maybe<Array<CastVoteWhereInput>>;
};

export type CastVoteWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryArchivalStatusUpdatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryArchivalStatusUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  /** The new archival status of the category (true = archived) */
  newArchivalStatus: Scalars['Boolean'];
  actor: Worker;
  actorId: Scalars['String'];
};

export type CategoryArchivalStatusUpdatedEventConnection = {
  __typename: 'CategoryArchivalStatusUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CategoryArchivalStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type CategoryArchivalStatusUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  category: Scalars['ID'];
  newArchivalStatus: Scalars['Boolean'];
  actor: Scalars['ID'];
};

export type CategoryArchivalStatusUpdatedEventEdge = {
  __typename: 'CategoryArchivalStatusUpdatedEventEdge';
  node: CategoryArchivalStatusUpdatedEvent;
  cursor: Scalars['String'];
};

export enum CategoryArchivalStatusUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  NewArchivalStatusAsc = 'newArchivalStatus_ASC',
  NewArchivalStatusDesc = 'newArchivalStatus_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type CategoryArchivalStatusUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['ID']>;
  newArchivalStatus?: Maybe<Scalars['Boolean']>;
  actor?: Maybe<Scalars['ID']>;
};

export type CategoryArchivalStatusUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  newArchivalStatus_eq?: Maybe<Scalars['Boolean']>;
  newArchivalStatus_in?: Maybe<Array<Scalars['Boolean']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<CategoryArchivalStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryArchivalStatusUpdatedEventWhereInput>>;
};

export type CategoryArchivalStatusUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryCreatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryCreatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  category: ForumCategory;
  categoryId: Scalars['String'];
};

export type CategoryCreatedEventConnection = {
  __typename: 'CategoryCreatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CategoryCreatedEventEdge>;
  pageInfo: PageInfo;
};

export type CategoryCreatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  category: Scalars['ID'];
};

export type CategoryCreatedEventEdge = {
  __typename: 'CategoryCreatedEventEdge';
  node: CategoryCreatedEvent;
  cursor: Scalars['String'];
};

export enum CategoryCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC'
}

export type CategoryCreatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['ID']>;
};

export type CategoryCreatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  AND?: Maybe<Array<CategoryCreatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryCreatedEventWhereInput>>;
};

export type CategoryCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryDeletedEvent = BaseGraphQlObject & {
  __typename: 'CategoryDeletedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  actor: Worker;
  actorId: Scalars['String'];
};

export type CategoryDeletedEventConnection = {
  __typename: 'CategoryDeletedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CategoryDeletedEventEdge>;
  pageInfo: PageInfo;
};

export type CategoryDeletedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  category: Scalars['ID'];
  actor: Scalars['ID'];
};

export type CategoryDeletedEventEdge = {
  __typename: 'CategoryDeletedEventEdge';
  node: CategoryDeletedEvent;
  cursor: Scalars['String'];
};

export enum CategoryDeletedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type CategoryDeletedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['ID']>;
  actor?: Maybe<Scalars['ID']>;
};

export type CategoryDeletedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<CategoryDeletedEventWhereInput>>;
  OR?: Maybe<Array<CategoryDeletedEventWhereInput>>;
};

export type CategoryDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryMembershipOfModeratorUpdatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryMembershipOfModeratorUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  moderator: Worker;
  moderatorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  /** The flag indicating whether the permissions to moderate the category are granted or revoked */
  newCanModerateValue: Scalars['Boolean'];
};

export type CategoryMembershipOfModeratorUpdatedEventConnection = {
  __typename: 'CategoryMembershipOfModeratorUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CategoryMembershipOfModeratorUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type CategoryMembershipOfModeratorUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  moderator: Scalars['ID'];
  category: Scalars['ID'];
  newCanModerateValue: Scalars['Boolean'];
};

export type CategoryMembershipOfModeratorUpdatedEventEdge = {
  __typename: 'CategoryMembershipOfModeratorUpdatedEventEdge';
  node: CategoryMembershipOfModeratorUpdatedEvent;
  cursor: Scalars['String'];
};

export enum CategoryMembershipOfModeratorUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ModeratorAsc = 'moderator_ASC',
  ModeratorDesc = 'moderator_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  NewCanModerateValueAsc = 'newCanModerateValue_ASC',
  NewCanModerateValueDesc = 'newCanModerateValue_DESC'
}

export type CategoryMembershipOfModeratorUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  moderator?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  newCanModerateValue?: Maybe<Scalars['Boolean']>;
};

export type CategoryMembershipOfModeratorUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  moderator_eq?: Maybe<Scalars['ID']>;
  moderator_in?: Maybe<Array<Scalars['ID']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  newCanModerateValue_eq?: Maybe<Scalars['Boolean']>;
  newCanModerateValue_in?: Maybe<Array<Scalars['Boolean']>>;
  moderator?: Maybe<WorkerWhereInput>;
  category?: Maybe<ForumCategoryWhereInput>;
  AND?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventWhereInput>>;
};

export type CategoryMembershipOfModeratorUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryStatus = CategoryStatusActive | CategoryStatusArchived | CategoryStatusRemoved;

export type CategoryStatusActive = {
  __typename: 'CategoryStatusActive';
  phantom?: Maybe<Scalars['Int']>;
};

export type CategoryStatusActiveCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type CategoryStatusActiveUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type CategoryStatusActiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<CategoryStatusActiveWhereInput>>;
  OR?: Maybe<Array<CategoryStatusActiveWhereInput>>;
};

export type CategoryStatusActiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryStatusArchived = {
  __typename: 'CategoryStatusArchived';
  /** Event the category was archived in */
  categoryArchivalStatusUpdatedEvent?: Maybe<CategoryArchivalStatusUpdatedEvent>;
};

export type CategoryStatusRemoved = {
  __typename: 'CategoryStatusRemoved';
  /** Event the category was deleted in */
  categoryDeletedEvent?: Maybe<CategoryDeletedEvent>;
};

export type CategoryStickyThreadUpdateEvent = BaseGraphQlObject & {
  __typename: 'CategoryStickyThreadUpdateEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  newStickyThreads: Array<ForumThread>;
  actor: Worker;
  actorId: Scalars['String'];
};

export type CategoryStickyThreadUpdateEventConnection = {
  __typename: 'CategoryStickyThreadUpdateEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CategoryStickyThreadUpdateEventEdge>;
  pageInfo: PageInfo;
};

export type CategoryStickyThreadUpdateEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  category: Scalars['ID'];
  actor: Scalars['ID'];
};

export type CategoryStickyThreadUpdateEventEdge = {
  __typename: 'CategoryStickyThreadUpdateEventEdge';
  node: CategoryStickyThreadUpdateEvent;
  cursor: Scalars['String'];
};

export enum CategoryStickyThreadUpdateEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type CategoryStickyThreadUpdateEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['ID']>;
  actor?: Maybe<Scalars['ID']>;
};

export type CategoryStickyThreadUpdateEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  newStickyThreads_none?: Maybe<ForumThreadWhereInput>;
  newStickyThreads_some?: Maybe<ForumThreadWhereInput>;
  newStickyThreads_every?: Maybe<ForumThreadWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<CategoryStickyThreadUpdateEventWhereInput>>;
  OR?: Maybe<Array<CategoryStickyThreadUpdateEventWhereInput>>;
};

export type CategoryStickyThreadUpdateEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Channel = BaseGraphQlObject & {
  __typename: 'Channel';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  ownerMember?: Maybe<Membership>;
  ownerMemberId?: Maybe<Scalars['String']>;
  ownerCuratorGroup?: Maybe<CuratorGroup>;
  ownerCuratorGroupId?: Maybe<Scalars['String']>;
  category?: Maybe<ChannelCategory>;
  categoryId?: Maybe<Scalars['String']>;
  /** Reward account where revenue is sent if set. */
  rewardAccount?: Maybe<Scalars['String']>;
  /** The title of the Channel */
  title?: Maybe<Scalars['String']>;
  /** The description of a Channel */
  description?: Maybe<Scalars['String']>;
  /** Channel's cover (background) photo asset. Recommended ratio: 16:9. */
  coverPhoto?: Maybe<Asset>;
  /** Channel's avatar photo asset. */
  avatarPhoto?: Maybe<Asset>;
  /** Flag signaling whether a channel is public. */
  isPublic?: Maybe<Scalars['Boolean']>;
  /** Flag signaling whether a channel is censored. */
  isCensored: Scalars['Boolean'];
  language?: Maybe<Language>;
  languageId?: Maybe<Scalars['String']>;
  videos: Array<Video>;
  createdInBlock: Scalars['Int'];
};

export type ChannelCategoriesByNameFtsOutput = {
  __typename: 'ChannelCategoriesByNameFTSOutput';
  item: ChannelCategoriesByNameSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type ChannelCategoriesByNameSearchResult = ChannelCategory;

/** Category of media channel */
export type ChannelCategory = BaseGraphQlObject & {
  __typename: 'ChannelCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The name of the category */
  name?: Maybe<Scalars['String']>;
  channels: Array<Channel>;
  createdInBlock: Scalars['Int'];
};

export type ChannelCategoryConnection = {
  __typename: 'ChannelCategoryConnection';
  totalCount: Scalars['Int'];
  edges: Array<ChannelCategoryEdge>;
  pageInfo: PageInfo;
};

export type ChannelCategoryCreateInput = {
  name?: Maybe<Scalars['String']>;
  createdInBlock: Scalars['Float'];
};

export type ChannelCategoryEdge = {
  __typename: 'ChannelCategoryEdge';
  node: ChannelCategory;
  cursor: Scalars['String'];
};

export enum ChannelCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC'
}

export type ChannelCategoryUpdateInput = {
  name?: Maybe<Scalars['String']>;
  createdInBlock?: Maybe<Scalars['Float']>;
};

export type ChannelCategoryWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  name_eq?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_startsWith?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  channels_every?: Maybe<ChannelWhereInput>;
  AND?: Maybe<Array<ChannelCategoryWhereInput>>;
  OR?: Maybe<Array<ChannelCategoryWhereInput>>;
};

export type ChannelCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ChannelConnection = {
  __typename: 'ChannelConnection';
  totalCount: Scalars['Int'];
  edges: Array<ChannelEdge>;
  pageInfo: PageInfo;
};

export type ChannelCreateInput = {
  ownerMember?: Maybe<Scalars['ID']>;
  ownerCuratorGroup?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  coverPhoto: Scalars['JSONObject'];
  avatarPhoto: Scalars['JSONObject'];
  isPublic?: Maybe<Scalars['Boolean']>;
  isCensored: Scalars['Boolean'];
  language?: Maybe<Scalars['ID']>;
  createdInBlock: Scalars['Float'];
};

export type ChannelEdge = {
  __typename: 'ChannelEdge';
  node: Channel;
  cursor: Scalars['String'];
};

export enum ChannelOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  OwnerMemberAsc = 'ownerMember_ASC',
  OwnerMemberDesc = 'ownerMember_DESC',
  OwnerCuratorGroupAsc = 'ownerCuratorGroup_ASC',
  OwnerCuratorGroupDesc = 'ownerCuratorGroup_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IsPublicAsc = 'isPublic_ASC',
  IsPublicDesc = 'isPublic_DESC',
  IsCensoredAsc = 'isCensored_ASC',
  IsCensoredDesc = 'isCensored_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC'
}

export type ChannelUpdateInput = {
  ownerMember?: Maybe<Scalars['ID']>;
  ownerCuratorGroup?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  coverPhoto?: Maybe<Scalars['JSONObject']>;
  avatarPhoto?: Maybe<Scalars['JSONObject']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  isCensored?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['ID']>;
  createdInBlock?: Maybe<Scalars['Float']>;
};

export type ChannelWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  ownerMember_eq?: Maybe<Scalars['ID']>;
  ownerMember_in?: Maybe<Array<Scalars['ID']>>;
  ownerCuratorGroup_eq?: Maybe<Scalars['ID']>;
  ownerCuratorGroup_in?: Maybe<Array<Scalars['ID']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  coverPhoto_json?: Maybe<Scalars['JSONObject']>;
  avatarPhoto_json?: Maybe<Scalars['JSONObject']>;
  isPublic_eq?: Maybe<Scalars['Boolean']>;
  isPublic_in?: Maybe<Array<Scalars['Boolean']>>;
  isCensored_eq?: Maybe<Scalars['Boolean']>;
  isCensored_in?: Maybe<Array<Scalars['Boolean']>>;
  language_eq?: Maybe<Scalars['ID']>;
  language_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  ownerMember?: Maybe<MembershipWhereInput>;
  ownerCuratorGroup?: Maybe<CuratorGroupWhereInput>;
  category?: Maybe<ChannelCategoryWhereInput>;
  language?: Maybe<LanguageWhereInput>;
  videos_none?: Maybe<VideoWhereInput>;
  videos_some?: Maybe<VideoWhereInput>;
  videos_every?: Maybe<VideoWhereInput>;
  AND?: Maybe<Array<ChannelWhereInput>>;
  OR?: Maybe<Array<ChannelWhereInput>>;
};

export type ChannelWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilMember = BaseGraphQlObject & {
  __typename: 'CouncilMember';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Account used for staking currency for council membership. */
  stakingAccountId: Scalars['String'];
  /** Account that will receive used for reward currency for council membership. */
  rewardAccountId: Scalars['String'];
  member: Membership;
  memberId: Scalars['String'];
  /** Stake used for the council membership. */
  stake: Scalars['BigInt'];
  /** Block number in which council member recieved the last reward payment. */
  lastPaymentBlock: Scalars['BigInt'];
  /** Reward amount that should have been paid but couldn't be paid off due to insufficient budget. */
  unpaidReward: Scalars['BigInt'];
  electedInCouncil: ElectedCouncil;
  electedInCouncilId: Scalars['String'];
};

export type CouncilMemberConnection = {
  __typename: 'CouncilMemberConnection';
  totalCount: Scalars['Int'];
  edges: Array<CouncilMemberEdge>;
  pageInfo: PageInfo;
};

export type CouncilMemberCreateInput = {
  stakingAccountId: Scalars['String'];
  rewardAccountId: Scalars['String'];
  member: Scalars['ID'];
  stake: Scalars['BigInt'];
  lastPaymentBlock: Scalars['BigInt'];
  unpaidReward: Scalars['BigInt'];
  electedInCouncil: Scalars['ID'];
};

export type CouncilMemberEdge = {
  __typename: 'CouncilMemberEdge';
  node: CouncilMember;
  cursor: Scalars['String'];
};

export enum CouncilMemberOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  StakingAccountIdAsc = 'stakingAccountId_ASC',
  StakingAccountIdDesc = 'stakingAccountId_DESC',
  RewardAccountIdAsc = 'rewardAccountId_ASC',
  RewardAccountIdDesc = 'rewardAccountId_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  LastPaymentBlockAsc = 'lastPaymentBlock_ASC',
  LastPaymentBlockDesc = 'lastPaymentBlock_DESC',
  UnpaidRewardAsc = 'unpaidReward_ASC',
  UnpaidRewardDesc = 'unpaidReward_DESC',
  ElectedInCouncilAsc = 'electedInCouncil_ASC',
  ElectedInCouncilDesc = 'electedInCouncil_DESC'
}

export type CouncilMemberUpdateInput = {
  stakingAccountId?: Maybe<Scalars['String']>;
  rewardAccountId?: Maybe<Scalars['String']>;
  member?: Maybe<Scalars['ID']>;
  stake?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock?: Maybe<Scalars['BigInt']>;
  unpaidReward?: Maybe<Scalars['BigInt']>;
  electedInCouncil?: Maybe<Scalars['ID']>;
};

export type CouncilMemberWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  stakingAccountId_eq?: Maybe<Scalars['String']>;
  stakingAccountId_contains?: Maybe<Scalars['String']>;
  stakingAccountId_startsWith?: Maybe<Scalars['String']>;
  stakingAccountId_endsWith?: Maybe<Scalars['String']>;
  stakingAccountId_in?: Maybe<Array<Scalars['String']>>;
  rewardAccountId_eq?: Maybe<Scalars['String']>;
  rewardAccountId_contains?: Maybe<Scalars['String']>;
  rewardAccountId_startsWith?: Maybe<Scalars['String']>;
  rewardAccountId_endsWith?: Maybe<Scalars['String']>;
  rewardAccountId_in?: Maybe<Array<Scalars['String']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  lastPaymentBlock_eq?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_gt?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_gte?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_lt?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_lte?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  unpaidReward_eq?: Maybe<Scalars['BigInt']>;
  unpaidReward_gt?: Maybe<Scalars['BigInt']>;
  unpaidReward_gte?: Maybe<Scalars['BigInt']>;
  unpaidReward_lt?: Maybe<Scalars['BigInt']>;
  unpaidReward_lte?: Maybe<Scalars['BigInt']>;
  unpaidReward_in?: Maybe<Array<Scalars['BigInt']>>;
  electedInCouncil_eq?: Maybe<Scalars['ID']>;
  electedInCouncil_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  electedInCouncil?: Maybe<ElectedCouncilWhereInput>;
  AND?: Maybe<Array<CouncilMemberWhereInput>>;
  OR?: Maybe<Array<CouncilMemberWhereInput>>;
};

export type CouncilMemberWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilStage = CouncilStageAnnouncing | CouncilStageElection | CouncilStageIdle | VariantNone;

export type CouncilStageAnnouncing = {
  __typename: 'CouncilStageAnnouncing';
  /** Number of candidates aspiring to be elected as council members. */
  candidatesCount: Scalars['BigInt'];
};

export type CouncilStageAnnouncingCreateInput = {
  candidatesCount: Scalars['BigInt'];
};

export type CouncilStageAnnouncingUpdateInput = {
  candidatesCount?: Maybe<Scalars['BigInt']>;
};

export type CouncilStageAnnouncingWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  candidatesCount_eq?: Maybe<Scalars['BigInt']>;
  candidatesCount_gt?: Maybe<Scalars['BigInt']>;
  candidatesCount_gte?: Maybe<Scalars['BigInt']>;
  candidatesCount_lt?: Maybe<Scalars['BigInt']>;
  candidatesCount_lte?: Maybe<Scalars['BigInt']>;
  candidatesCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<CouncilStageAnnouncingWhereInput>>;
  OR?: Maybe<Array<CouncilStageAnnouncingWhereInput>>;
};

export type CouncilStageAnnouncingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilStageElection = {
  __typename: 'CouncilStageElection';
  /** Number of candidates aspiring to be elected as council members. */
  candidatesCount: Scalars['BigInt'];
};

export type CouncilStageElectionCreateInput = {
  candidatesCount: Scalars['BigInt'];
};

export type CouncilStageElectionUpdateInput = {
  candidatesCount?: Maybe<Scalars['BigInt']>;
};

export type CouncilStageElectionWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  candidatesCount_eq?: Maybe<Scalars['BigInt']>;
  candidatesCount_gt?: Maybe<Scalars['BigInt']>;
  candidatesCount_gte?: Maybe<Scalars['BigInt']>;
  candidatesCount_lt?: Maybe<Scalars['BigInt']>;
  candidatesCount_lte?: Maybe<Scalars['BigInt']>;
  candidatesCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<CouncilStageElectionWhereInput>>;
  OR?: Maybe<Array<CouncilStageElectionWhereInput>>;
};

export type CouncilStageElectionWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilStageIdle = {
  __typename: 'CouncilStageIdle';
  dummy?: Maybe<Scalars['Int']>;
};

export type CouncilStageIdleCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type CouncilStageIdleUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type CouncilStageIdleWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<CouncilStageIdleWhereInput>>;
  OR?: Maybe<Array<CouncilStageIdleWhereInput>>;
};

export type CouncilStageIdleWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilStageUpdate = BaseGraphQlObject & {
  __typename: 'CouncilStageUpdate';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The new stage council got into. */
  stage: CouncilStage;
  /** Block number at which change happened. */
  changedAt: Scalars['BigInt'];
  electedCouncil?: Maybe<ElectedCouncil>;
  electedCouncilId?: Maybe<Scalars['String']>;
};

export type CouncilStageUpdateConnection = {
  __typename: 'CouncilStageUpdateConnection';
  totalCount: Scalars['Int'];
  edges: Array<CouncilStageUpdateEdge>;
  pageInfo: PageInfo;
};

export type CouncilStageUpdateCreateInput = {
  stage: Scalars['JSONObject'];
  changedAt: Scalars['BigInt'];
  electedCouncil?: Maybe<Scalars['ID']>;
};

export type CouncilStageUpdateEdge = {
  __typename: 'CouncilStageUpdateEdge';
  node: CouncilStageUpdate;
  cursor: Scalars['String'];
};

export enum CouncilStageUpdateOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ChangedAtAsc = 'changedAt_ASC',
  ChangedAtDesc = 'changedAt_DESC',
  ElectedCouncilAsc = 'electedCouncil_ASC',
  ElectedCouncilDesc = 'electedCouncil_DESC'
}

export type CouncilStageUpdateUpdateInput = {
  stage?: Maybe<Scalars['JSONObject']>;
  changedAt?: Maybe<Scalars['BigInt']>;
  electedCouncil?: Maybe<Scalars['ID']>;
};

export type CouncilStageUpdateWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  stage_json?: Maybe<Scalars['JSONObject']>;
  changedAt_eq?: Maybe<Scalars['BigInt']>;
  changedAt_gt?: Maybe<Scalars['BigInt']>;
  changedAt_gte?: Maybe<Scalars['BigInt']>;
  changedAt_lt?: Maybe<Scalars['BigInt']>;
  changedAt_lte?: Maybe<Scalars['BigInt']>;
  changedAt_in?: Maybe<Array<Scalars['BigInt']>>;
  electedCouncil_eq?: Maybe<Scalars['ID']>;
  electedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  electedCouncil?: Maybe<ElectedCouncilWhereInput>;
  AND?: Maybe<Array<CouncilStageUpdateWhereInput>>;
  OR?: Maybe<Array<CouncilStageUpdateWhereInput>>;
};

export type CouncilStageUpdateWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilorRewardUpdatedEvent = BaseGraphQlObject & {
  __typename: 'CouncilorRewardUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** New reward amount paid each reward period. */
  rewardAmount: Scalars['BigInt'];
};

export type CouncilorRewardUpdatedEventConnection = {
  __typename: 'CouncilorRewardUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<CouncilorRewardUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type CouncilorRewardUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  rewardAmount: Scalars['BigInt'];
};

export type CouncilorRewardUpdatedEventEdge = {
  __typename: 'CouncilorRewardUpdatedEventEdge';
  node: CouncilorRewardUpdatedEvent;
  cursor: Scalars['String'];
};

export enum CouncilorRewardUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  RewardAmountAsc = 'rewardAmount_ASC',
  RewardAmountDesc = 'rewardAmount_DESC'
}

export type CouncilorRewardUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  rewardAmount?: Maybe<Scalars['BigInt']>;
};

export type CouncilorRewardUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  rewardAmount_eq?: Maybe<Scalars['BigInt']>;
  rewardAmount_gt?: Maybe<Scalars['BigInt']>;
  rewardAmount_gte?: Maybe<Scalars['BigInt']>;
  rewardAmount_lt?: Maybe<Scalars['BigInt']>;
  rewardAmount_lte?: Maybe<Scalars['BigInt']>;
  rewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<CouncilorRewardUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CouncilorRewardUpdatedEventWhereInput>>;
};

export type CouncilorRewardUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CreateBlogPostProposalDetails = {
  __typename: 'CreateBlogPostProposalDetails';
  /** Blog post title */
  title: Scalars['String'];
  /** Blog post content (md-formatted) */
  body: Scalars['String'];
};

export type CreateBlogPostProposalDetailsCreateInput = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type CreateBlogPostProposalDetailsUpdateInput = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type CreateBlogPostProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  body_eq?: Maybe<Scalars['String']>;
  body_contains?: Maybe<Scalars['String']>;
  body_startsWith?: Maybe<Scalars['String']>;
  body_endsWith?: Maybe<Scalars['String']>;
  body_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<CreateBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<CreateBlogPostProposalDetailsWhereInput>>;
};

export type CreateBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CreateWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'CreateWorkingGroupLeadOpeningProposalDetails';
  /** The opening metadata */
  metadata?: Maybe<WorkingGroupOpeningMetadata>;
  /** Min. application / role stake amount */
  stakeAmount: Scalars['BigInt'];
  /** Role stake unstaking period in blocks */
  unstakingPeriod: Scalars['Int'];
  /** Initial workers' reward per block */
  rewardPerBlock: Scalars['BigInt'];
  /** Related working group */
  group?: Maybe<WorkingGroup>;
};

export type CreateWorkingGroupLeadOpeningProposalDetailsCreateInput = {
  stakeAmount: Scalars['BigInt'];
  unstakingPeriod: Scalars['Float'];
  rewardPerBlock: Scalars['BigInt'];
};

export type CreateWorkingGroupLeadOpeningProposalDetailsUpdateInput = {
  stakeAmount?: Maybe<Scalars['BigInt']>;
  unstakingPeriod?: Maybe<Scalars['Float']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
};

export type CreateWorkingGroupLeadOpeningProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  unstakingPeriod_eq?: Maybe<Scalars['Int']>;
  unstakingPeriod_gt?: Maybe<Scalars['Int']>;
  unstakingPeriod_gte?: Maybe<Scalars['Int']>;
  unstakingPeriod_lt?: Maybe<Scalars['Int']>;
  unstakingPeriod_lte?: Maybe<Scalars['Int']>;
  unstakingPeriod_in?: Maybe<Array<Scalars['Int']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<CreateWorkingGroupLeadOpeningProposalDetailsWhereInput>>;
  OR?: Maybe<Array<CreateWorkingGroupLeadOpeningProposalDetailsWhereInput>>;
};

export type CreateWorkingGroupLeadOpeningProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CuratorGroup = BaseGraphQlObject & {
  __typename: 'CuratorGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Curators belonging to this group */
  curatorIds: Array<Scalars['Int']>;
  /** Is group active or not */
  isActive: Scalars['Boolean'];
  channels: Array<Channel>;
};

export type CuratorGroupConnection = {
  __typename: 'CuratorGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<CuratorGroupEdge>;
  pageInfo: PageInfo;
};

export type CuratorGroupCreateInput = {
  curatorIds: Array<Scalars['Int']>;
  isActive: Scalars['Boolean'];
};

export type CuratorGroupEdge = {
  __typename: 'CuratorGroupEdge';
  node: CuratorGroup;
  cursor: Scalars['String'];
};

export enum CuratorGroupOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC'
}

export type CuratorGroupUpdateInput = {
  curatorIds?: Maybe<Array<Scalars['Int']>>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type CuratorGroupWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  isActive_eq?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  channels_every?: Maybe<ChannelWhereInput>;
  AND?: Maybe<Array<CuratorGroupWhereInput>>;
  OR?: Maybe<Array<CuratorGroupWhereInput>>;
};

export type CuratorGroupWhereUniqueInput = {
  id: Scalars['ID'];
};

/** Manages content ids, type and storage provider decision about it */
export type DataObject = BaseGraphQlObject & {
  __typename: 'DataObject';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Content owner */
  owner: DataObjectOwner;
  /** Content added at */
  createdInBlock: Scalars['Int'];
  /** Content type id */
  typeId: Scalars['Int'];
  /** Content size in bytes */
  size: Scalars['BigInt'];
  liaison?: Maybe<Worker>;
  liaisonId?: Maybe<Scalars['String']>;
  /** Storage provider as liaison judgment */
  liaisonJudgement: LiaisonJudgement;
  /** IPFS content id */
  ipfsContentId: Scalars['String'];
  /** Joystream runtime content */
  joystreamContentId: Scalars['String'];
  membermetadataavatar?: Maybe<Array<MemberMetadata>>;
};

export type DataObjectConnection = {
  __typename: 'DataObjectConnection';
  totalCount: Scalars['Int'];
  edges: Array<DataObjectEdge>;
  pageInfo: PageInfo;
};

export type DataObjectCreateInput = {
  owner: Scalars['JSONObject'];
  createdInBlock: Scalars['Float'];
  typeId: Scalars['Float'];
  size: Scalars['BigInt'];
  liaison?: Maybe<Scalars['ID']>;
  liaisonJudgement: LiaisonJudgement;
  ipfsContentId: Scalars['String'];
  joystreamContentId: Scalars['String'];
};

export type DataObjectEdge = {
  __typename: 'DataObjectEdge';
  node: DataObject;
  cursor: Scalars['String'];
};

export enum DataObjectOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  TypeIdAsc = 'typeId_ASC',
  TypeIdDesc = 'typeId_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  LiaisonAsc = 'liaison_ASC',
  LiaisonDesc = 'liaison_DESC',
  LiaisonJudgementAsc = 'liaisonJudgement_ASC',
  LiaisonJudgementDesc = 'liaisonJudgement_DESC',
  IpfsContentIdAsc = 'ipfsContentId_ASC',
  IpfsContentIdDesc = 'ipfsContentId_DESC',
  JoystreamContentIdAsc = 'joystreamContentId_ASC',
  JoystreamContentIdDesc = 'joystreamContentId_DESC'
}

export type DataObjectOwner = DataObjectOwnerMember | DataObjectOwnerChannel | DataObjectOwnerDao | DataObjectOwnerCouncil | DataObjectOwnerWorkingGroup;

export type DataObjectOwnerChannel = {
  __typename: 'DataObjectOwnerChannel';
  /** Related channel */
  channel?: Maybe<Channel>;
  /** Variant needs to have at least one property. This value is not used. */
  dummy?: Maybe<Scalars['Int']>;
};

export type DataObjectOwnerChannelCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerChannelUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerChannelWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<DataObjectOwnerChannelWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerChannelWhereInput>>;
};

export type DataObjectOwnerChannelWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DataObjectOwnerCouncil = {
  __typename: 'DataObjectOwnerCouncil';
  /** Variant needs to have at least one property. This value is not used. */
  dummy?: Maybe<Scalars['Int']>;
};

export type DataObjectOwnerCouncilCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerCouncilUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerCouncilWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<DataObjectOwnerCouncilWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerCouncilWhereInput>>;
};

export type DataObjectOwnerCouncilWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DataObjectOwnerDao = {
  __typename: 'DataObjectOwnerDao';
  /** DAO identifier */
  dao: Scalars['Int'];
};

export type DataObjectOwnerDaoCreateInput = {
  dao: Scalars['Float'];
};

export type DataObjectOwnerDaoUpdateInput = {
  dao?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerDaoWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dao_eq?: Maybe<Scalars['Int']>;
  dao_gt?: Maybe<Scalars['Int']>;
  dao_gte?: Maybe<Scalars['Int']>;
  dao_lt?: Maybe<Scalars['Int']>;
  dao_lte?: Maybe<Scalars['Int']>;
  dao_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<DataObjectOwnerDaoWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerDaoWhereInput>>;
};

export type DataObjectOwnerDaoWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DataObjectOwnerMember = {
  __typename: 'DataObjectOwnerMember';
  /** Related member */
  member?: Maybe<Membership>;
  /** Variant needs to have at least one property. This value is not used. */
  dummy?: Maybe<Scalars['Int']>;
};

export type DataObjectOwnerMemberCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerMemberUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerMemberWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<DataObjectOwnerMemberWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerMemberWhereInput>>;
};

export type DataObjectOwnerMemberWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DataObjectOwnerWorkingGroup = {
  __typename: 'DataObjectOwnerWorkingGroup';
  /** Working group */
  workingGroup?: Maybe<WorkingGroup>;
};

export type DataObjectUpdateInput = {
  owner?: Maybe<Scalars['JSONObject']>;
  createdInBlock?: Maybe<Scalars['Float']>;
  typeId?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['BigInt']>;
  liaison?: Maybe<Scalars['ID']>;
  liaisonJudgement?: Maybe<LiaisonJudgement>;
  ipfsContentId?: Maybe<Scalars['String']>;
  joystreamContentId?: Maybe<Scalars['String']>;
};

export type DataObjectWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  owner_json?: Maybe<Scalars['JSONObject']>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  typeId_eq?: Maybe<Scalars['Int']>;
  typeId_gt?: Maybe<Scalars['Int']>;
  typeId_gte?: Maybe<Scalars['Int']>;
  typeId_lt?: Maybe<Scalars['Int']>;
  typeId_lte?: Maybe<Scalars['Int']>;
  typeId_in?: Maybe<Array<Scalars['Int']>>;
  size_eq?: Maybe<Scalars['BigInt']>;
  size_gt?: Maybe<Scalars['BigInt']>;
  size_gte?: Maybe<Scalars['BigInt']>;
  size_lt?: Maybe<Scalars['BigInt']>;
  size_lte?: Maybe<Scalars['BigInt']>;
  size_in?: Maybe<Array<Scalars['BigInt']>>;
  liaison_eq?: Maybe<Scalars['ID']>;
  liaison_in?: Maybe<Array<Scalars['ID']>>;
  liaisonJudgement_eq?: Maybe<LiaisonJudgement>;
  liaisonJudgement_in?: Maybe<Array<LiaisonJudgement>>;
  ipfsContentId_eq?: Maybe<Scalars['String']>;
  ipfsContentId_contains?: Maybe<Scalars['String']>;
  ipfsContentId_startsWith?: Maybe<Scalars['String']>;
  ipfsContentId_endsWith?: Maybe<Scalars['String']>;
  ipfsContentId_in?: Maybe<Array<Scalars['String']>>;
  joystreamContentId_eq?: Maybe<Scalars['String']>;
  joystreamContentId_contains?: Maybe<Scalars['String']>;
  joystreamContentId_startsWith?: Maybe<Scalars['String']>;
  joystreamContentId_endsWith?: Maybe<Scalars['String']>;
  joystreamContentId_in?: Maybe<Array<Scalars['String']>>;
  liaison?: Maybe<WorkerWhereInput>;
  membermetadataavatar_none?: Maybe<MemberMetadataWhereInput>;
  membermetadataavatar_some?: Maybe<MemberMetadataWhereInput>;
  membermetadataavatar_every?: Maybe<MemberMetadataWhereInput>;
  AND?: Maybe<Array<DataObjectWhereInput>>;
  OR?: Maybe<Array<DataObjectWhereInput>>;
};

export type DataObjectWhereUniqueInput = {
  id: Scalars['ID'];
};


export type DecreaseWorkingGroupLeadStakeProposalDetails = {
  __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails';
  /** The lead that should be affected */
  lead?: Maybe<Worker>;
  /** Amount to decrease the stake by */
  amount: Scalars['BigInt'];
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsCreateInput = {
  amount: Scalars['BigInt'];
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput>>;
  OR?: Maybe<Array<DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput>>;
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DeleteResponse = {
  id: Scalars['ID'];
};

export type EditBlogPostProposalDetails = {
  __typename: 'EditBlogPostProposalDetails';
  /** The related blog post */
  blogPost: Scalars['String'];
  /** The new blog post title (if should be updated) */
  newTitle?: Maybe<Scalars['String']>;
  /** The new blog post body (if should be updated) */
  newBody?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsCreateInput = {
  blogPost: Scalars['String'];
  newTitle?: Maybe<Scalars['String']>;
  newBody?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsUpdateInput = {
  blogPost?: Maybe<Scalars['String']>;
  newTitle?: Maybe<Scalars['String']>;
  newBody?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  newTitle_eq?: Maybe<Scalars['String']>;
  newTitle_contains?: Maybe<Scalars['String']>;
  newTitle_startsWith?: Maybe<Scalars['String']>;
  newTitle_endsWith?: Maybe<Scalars['String']>;
  newTitle_in?: Maybe<Array<Scalars['String']>>;
  newBody_eq?: Maybe<Scalars['String']>;
  newBody_contains?: Maybe<Scalars['String']>;
  newBody_startsWith?: Maybe<Scalars['String']>;
  newBody_endsWith?: Maybe<Scalars['String']>;
  newBody_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<EditBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<EditBlogPostProposalDetailsWhereInput>>;
};

export type EditBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectedCouncil = BaseGraphQlObject & {
  __typename: 'ElectedCouncil';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  councilMembers: Array<CouncilMember>;
  updates: Array<CouncilStageUpdate>;
  /** Block number at which the council was elected. */
  electedAtBlock: Scalars['Int'];
  /** Block number at which the council reign ended and a new council was elected. */
  endedAtBlock?: Maybe<Scalars['Int']>;
  councilElections: Array<ElectionRound>;
  nextCouncilElections: Array<ElectionRound>;
  stage: ReferendumStage;
};

export type ElectedCouncilConnection = {
  __typename: 'ElectedCouncilConnection';
  totalCount: Scalars['Int'];
  edges: Array<ElectedCouncilEdge>;
  pageInfo: PageInfo;
};

export type ElectedCouncilCreateInput = {
  electedAtBlock: Scalars['Float'];
  endedAtBlock?: Maybe<Scalars['Float']>;
  stage: Scalars['JSONObject'];
};

export type ElectedCouncilEdge = {
  __typename: 'ElectedCouncilEdge';
  node: ElectedCouncil;
  cursor: Scalars['String'];
};

export enum ElectedCouncilOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectedAtBlockAsc = 'electedAtBlock_ASC',
  ElectedAtBlockDesc = 'electedAtBlock_DESC',
  EndedAtBlockAsc = 'endedAtBlock_ASC',
  EndedAtBlockDesc = 'endedAtBlock_DESC'
}

export type ElectedCouncilUpdateInput = {
  electedAtBlock?: Maybe<Scalars['Float']>;
  endedAtBlock?: Maybe<Scalars['Float']>;
  stage?: Maybe<Scalars['JSONObject']>;
};

export type ElectedCouncilWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedAtBlock_eq?: Maybe<Scalars['Int']>;
  electedAtBlock_gt?: Maybe<Scalars['Int']>;
  electedAtBlock_gte?: Maybe<Scalars['Int']>;
  electedAtBlock_lt?: Maybe<Scalars['Int']>;
  electedAtBlock_lte?: Maybe<Scalars['Int']>;
  electedAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  endedAtBlock_eq?: Maybe<Scalars['Int']>;
  endedAtBlock_gt?: Maybe<Scalars['Int']>;
  endedAtBlock_gte?: Maybe<Scalars['Int']>;
  endedAtBlock_lt?: Maybe<Scalars['Int']>;
  endedAtBlock_lte?: Maybe<Scalars['Int']>;
  endedAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  stage_json?: Maybe<Scalars['JSONObject']>;
  councilMembers_none?: Maybe<CouncilMemberWhereInput>;
  councilMembers_some?: Maybe<CouncilMemberWhereInput>;
  councilMembers_every?: Maybe<CouncilMemberWhereInput>;
  updates_none?: Maybe<CouncilStageUpdateWhereInput>;
  updates_some?: Maybe<CouncilStageUpdateWhereInput>;
  updates_every?: Maybe<CouncilStageUpdateWhereInput>;
  councilElections_none?: Maybe<ElectionRoundWhereInput>;
  councilElections_some?: Maybe<ElectionRoundWhereInput>;
  councilElections_every?: Maybe<ElectionRoundWhereInput>;
  nextCouncilElections_none?: Maybe<ElectionRoundWhereInput>;
  nextCouncilElections_some?: Maybe<ElectionRoundWhereInput>;
  nextCouncilElections_every?: Maybe<ElectionRoundWhereInput>;
  AND?: Maybe<Array<ElectedCouncilWhereInput>>;
  OR?: Maybe<Array<ElectedCouncilWhereInput>>;
};

export type ElectedCouncilWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectionRound = BaseGraphQlObject & {
  __typename: 'ElectionRound';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Election cycle ID. */
  cycleId: Scalars['Int'];
  /** Sign if election has already finished. */
  isFinished: Scalars['Boolean'];
  castVotes: Array<CastVote>;
  electedCouncil: ElectedCouncil;
  electedCouncilId: Scalars['String'];
  nextElectedCouncil?: Maybe<ElectedCouncil>;
  nextElectedCouncilId?: Maybe<Scalars['String']>;
  candidates: Array<Candidate>;
  referendumstagerevealingoptionresultcycleId?: Maybe<Array<ReferendumStageRevealingOptionResult>>;
};

export type ElectionRoundConnection = {
  __typename: 'ElectionRoundConnection';
  totalCount: Scalars['Int'];
  edges: Array<ElectionRoundEdge>;
  pageInfo: PageInfo;
};

export type ElectionRoundCreateInput = {
  cycleId: Scalars['Float'];
  isFinished: Scalars['Boolean'];
  electedCouncil: Scalars['ID'];
  nextElectedCouncil?: Maybe<Scalars['ID']>;
};

export type ElectionRoundEdge = {
  __typename: 'ElectionRoundEdge';
  node: ElectionRound;
  cursor: Scalars['String'];
};

export enum ElectionRoundOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CycleIdAsc = 'cycleId_ASC',
  CycleIdDesc = 'cycleId_DESC',
  IsFinishedAsc = 'isFinished_ASC',
  IsFinishedDesc = 'isFinished_DESC',
  ElectedCouncilAsc = 'electedCouncil_ASC',
  ElectedCouncilDesc = 'electedCouncil_DESC',
  NextElectedCouncilAsc = 'nextElectedCouncil_ASC',
  NextElectedCouncilDesc = 'nextElectedCouncil_DESC'
}

export type ElectionRoundUpdateInput = {
  cycleId?: Maybe<Scalars['Float']>;
  isFinished?: Maybe<Scalars['Boolean']>;
  electedCouncil?: Maybe<Scalars['ID']>;
  nextElectedCouncil?: Maybe<Scalars['ID']>;
};

export type ElectionRoundWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  cycleId_eq?: Maybe<Scalars['Int']>;
  cycleId_gt?: Maybe<Scalars['Int']>;
  cycleId_gte?: Maybe<Scalars['Int']>;
  cycleId_lt?: Maybe<Scalars['Int']>;
  cycleId_lte?: Maybe<Scalars['Int']>;
  cycleId_in?: Maybe<Array<Scalars['Int']>>;
  isFinished_eq?: Maybe<Scalars['Boolean']>;
  isFinished_in?: Maybe<Array<Scalars['Boolean']>>;
  electedCouncil_eq?: Maybe<Scalars['ID']>;
  electedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  nextElectedCouncil_eq?: Maybe<Scalars['ID']>;
  nextElectedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  castVotes_none?: Maybe<CastVoteWhereInput>;
  castVotes_some?: Maybe<CastVoteWhereInput>;
  castVotes_every?: Maybe<CastVoteWhereInput>;
  electedCouncil?: Maybe<ElectedCouncilWhereInput>;
  nextElectedCouncil?: Maybe<ElectedCouncilWhereInput>;
  candidates_none?: Maybe<CandidateWhereInput>;
  candidates_some?: Maybe<CandidateWhereInput>;
  candidates_every?: Maybe<CandidateWhereInput>;
  referendumstagerevealingoptionresultcycleId_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumstagerevealingoptionresultcycleId_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumstagerevealingoptionresultcycleId_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  AND?: Maybe<Array<ElectionRoundWhereInput>>;
  OR?: Maybe<Array<ElectionRoundWhereInput>>;
};

export type ElectionRoundWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Event = {
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
};

export type EventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  type?: Maybe<EventTypeOptions>;
};

export enum EventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}

export enum EventTypeOptions {
  ApplicationWithdrawnEvent = 'ApplicationWithdrawnEvent',
  AppliedOnOpeningEvent = 'AppliedOnOpeningEvent',
  BudgetSetEvent = 'BudgetSetEvent',
  BudgetSpendingEvent = 'BudgetSpendingEvent',
  InitialInvitationBalanceUpdatedEvent = 'InitialInvitationBalanceUpdatedEvent',
  InitialInvitationCountUpdatedEvent = 'InitialInvitationCountUpdatedEvent',
  InvitesTransferredEvent = 'InvitesTransferredEvent',
  LeaderInvitationQuotaUpdatedEvent = 'LeaderInvitationQuotaUpdatedEvent',
  LeaderSetEvent = 'LeaderSetEvent',
  LeaderUnsetEvent = 'LeaderUnsetEvent',
  MemberAccountsUpdatedEvent = 'MemberAccountsUpdatedEvent',
  MemberInvitedEvent = 'MemberInvitedEvent',
  MemberProfileUpdatedEvent = 'MemberProfileUpdatedEvent',
  MemberVerificationStatusUpdatedEvent = 'MemberVerificationStatusUpdatedEvent',
  MembershipBoughtEvent = 'MembershipBoughtEvent',
  MembershipPriceUpdatedEvent = 'MembershipPriceUpdatedEvent',
  NewMissedRewardLevelReachedEvent = 'NewMissedRewardLevelReachedEvent',
  OpeningAddedEvent = 'OpeningAddedEvent',
  OpeningCanceledEvent = 'OpeningCanceledEvent',
  OpeningFilledEvent = 'OpeningFilledEvent',
  ProposalCancelledEvent = 'ProposalCancelledEvent',
  ProposalCreatedEvent = 'ProposalCreatedEvent',
  ProposalDecisionMadeEvent = 'ProposalDecisionMadeEvent',
  ProposalDiscussionPostCreatedEvent = 'ProposalDiscussionPostCreatedEvent',
  ProposalDiscussionPostDeletedEvent = 'ProposalDiscussionPostDeletedEvent',
  ProposalDiscussionPostUpdatedEvent = 'ProposalDiscussionPostUpdatedEvent',
  ProposalDiscussionThreadModeChangedEvent = 'ProposalDiscussionThreadModeChangedEvent',
  ProposalExecutedEvent = 'ProposalExecutedEvent',
  ProposalStatusUpdatedEvent = 'ProposalStatusUpdatedEvent',
  ProposalVotedEvent = 'ProposalVotedEvent',
  ReferralCutUpdatedEvent = 'ReferralCutUpdatedEvent',
  RewardPaidEvent = 'RewardPaidEvent',
  StakeDecreasedEvent = 'StakeDecreasedEvent',
  StakeIncreasedEvent = 'StakeIncreasedEvent',
  StakeSlashedEvent = 'StakeSlashedEvent',
  StakingAccountAddedEvent = 'StakingAccountAddedEvent',
  StakingAccountConfirmedEvent = 'StakingAccountConfirmedEvent',
  StakingAccountRemovedEvent = 'StakingAccountRemovedEvent',
  StatusTextChangedEvent = 'StatusTextChangedEvent',
  TerminatedLeaderEvent = 'TerminatedLeaderEvent',
  TerminatedWorkerEvent = 'TerminatedWorkerEvent',
  WorkerExitedEvent = 'WorkerExitedEvent',
  WorkerRewardAccountUpdatedEvent = 'WorkerRewardAccountUpdatedEvent',
  WorkerRewardAmountUpdatedEvent = 'WorkerRewardAmountUpdatedEvent',
  WorkerRoleAccountUpdatedEvent = 'WorkerRoleAccountUpdatedEvent',
  WorkerStartedLeavingEvent = 'WorkerStartedLeavingEvent'
}

export type EventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  type?: Maybe<EventTypeOptions>;
};

export type EventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  type_eq?: Maybe<EventTypeOptions>;
  type_in?: Maybe<Array<EventTypeOptions>>;
  AND?: Maybe<Array<EventWhereInput>>;
  OR?: Maybe<Array<EventWhereInput>>;
};

export type EventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FillWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'FillWorkingGroupLeadOpeningProposalDetails';
  /** Lead opening to to be filled */
  opening?: Maybe<WorkingGroupOpening>;
  /** Selected successful application */
  application?: Maybe<WorkingGroupApplication>;
};

export type ForumCategory = BaseGraphQlObject & {
  __typename: 'ForumCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  parent?: Maybe<ForumCategory>;
  parentId?: Maybe<Scalars['String']>;
  /** Category title */
  title: Scalars['String'];
  /** Category description */
  description: Scalars['String'];
  threads: Array<ForumThread>;
  moderators: Array<Worker>;
  createdInEvent: CategoryCreatedEvent;
  /** Current category status */
  status: CategoryStatus;
  categoryarchivalstatusupdatedeventcategory?: Maybe<Array<CategoryArchivalStatusUpdatedEvent>>;
  categorydeletedeventcategory?: Maybe<Array<CategoryDeletedEvent>>;
  categorymembershipofmoderatorupdatedeventcategory?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEvent>>;
  categorystickythreadupdateeventcategory?: Maybe<Array<CategoryStickyThreadUpdateEvent>>;
  forumcategoryparent?: Maybe<Array<ForumCategory>>;
  threadmovedeventoldCategory?: Maybe<Array<ThreadMovedEvent>>;
  threadmovedeventnewCategory?: Maybe<Array<ThreadMovedEvent>>;
};

export type ForumCategoryConnection = {
  __typename: 'ForumCategoryConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumCategoryEdge>;
  pageInfo: PageInfo;
};

export type ForumCategoryCreateInput = {
  parent?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['JSONObject'];
};

export type ForumCategoryEdge = {
  __typename: 'ForumCategoryEdge';
  node: ForumCategory;
  cursor: Scalars['String'];
};

export enum ForumCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ParentAsc = 'parent_ASC',
  ParentDesc = 'parent_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC'
}

export type ForumCategoryUpdateInput = {
  parent?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
};

export type ForumCategoryWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  parent_eq?: Maybe<Scalars['ID']>;
  parent_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  parent?: Maybe<ForumCategoryWhereInput>;
  threads_none?: Maybe<ForumThreadWhereInput>;
  threads_some?: Maybe<ForumThreadWhereInput>;
  threads_every?: Maybe<ForumThreadWhereInput>;
  moderators_none?: Maybe<WorkerWhereInput>;
  moderators_some?: Maybe<WorkerWhereInput>;
  moderators_every?: Maybe<WorkerWhereInput>;
  createdInEvent?: Maybe<CategoryCreatedEventWhereInput>;
  categoryarchivalstatusupdatedeventcategory_none?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventcategory_some?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventcategory_every?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categorydeletedeventcategory_none?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventcategory_some?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventcategory_every?: Maybe<CategoryDeletedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_none?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_some?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_every?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorystickythreadupdateeventcategory_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventcategory_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventcategory_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  forumcategoryparent_none?: Maybe<ForumCategoryWhereInput>;
  forumcategoryparent_some?: Maybe<ForumCategoryWhereInput>;
  forumcategoryparent_every?: Maybe<ForumCategoryWhereInput>;
  threadmovedeventoldCategory_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventoldCategory_some?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventoldCategory_every?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventnewCategory_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventnewCategory_some?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventnewCategory_every?: Maybe<ThreadMovedEventWhereInput>;
  AND?: Maybe<Array<ForumCategoryWhereInput>>;
  OR?: Maybe<Array<ForumCategoryWhereInput>>;
};

export type ForumCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPoll = BaseGraphQlObject & {
  __typename: 'ForumPoll';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** Poll description */
  description: Scalars['String'];
  /** The time at which the poll ends */
  endTime: Scalars['DateTime'];
  pollAlternatives: Array<ForumPollAlternative>;
};

export type ForumPollAlternative = BaseGraphQlObject & {
  __typename: 'ForumPollAlternative';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Index uniquely identifying the alternative in given poll */
  index: Scalars['Int'];
  poll: ForumPoll;
  pollId: Scalars['String'];
  /** The alternative text */
  text: Scalars['String'];
  votes: Array<VoteOnPollEvent>;
};

export type ForumPollAlternativeConnection = {
  __typename: 'ForumPollAlternativeConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumPollAlternativeEdge>;
  pageInfo: PageInfo;
};

export type ForumPollAlternativeCreateInput = {
  index: Scalars['Float'];
  poll: Scalars['ID'];
  text: Scalars['String'];
};

export type ForumPollAlternativeEdge = {
  __typename: 'ForumPollAlternativeEdge';
  node: ForumPollAlternative;
  cursor: Scalars['String'];
};

export enum ForumPollAlternativeOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IndexAsc = 'index_ASC',
  IndexDesc = 'index_DESC',
  PollAsc = 'poll_ASC',
  PollDesc = 'poll_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC'
}

export type ForumPollAlternativeUpdateInput = {
  index?: Maybe<Scalars['Float']>;
  poll?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ForumPollAlternativeWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  index_eq?: Maybe<Scalars['Int']>;
  index_gt?: Maybe<Scalars['Int']>;
  index_gte?: Maybe<Scalars['Int']>;
  index_lt?: Maybe<Scalars['Int']>;
  index_lte?: Maybe<Scalars['Int']>;
  index_in?: Maybe<Array<Scalars['Int']>>;
  poll_eq?: Maybe<Scalars['ID']>;
  poll_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  poll?: Maybe<ForumPollWhereInput>;
  votes_none?: Maybe<VoteOnPollEventWhereInput>;
  votes_some?: Maybe<VoteOnPollEventWhereInput>;
  votes_every?: Maybe<VoteOnPollEventWhereInput>;
  AND?: Maybe<Array<ForumPollAlternativeWhereInput>>;
  OR?: Maybe<Array<ForumPollAlternativeWhereInput>>;
};

export type ForumPollAlternativeWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPollConnection = {
  __typename: 'ForumPollConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumPollEdge>;
  pageInfo: PageInfo;
};

export type ForumPollCreateInput = {
  thread: Scalars['ID'];
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
};

export type ForumPollEdge = {
  __typename: 'ForumPollEdge';
  node: ForumPoll;
  cursor: Scalars['String'];
};

export enum ForumPollOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC'
}

export type ForumPollUpdateInput = {
  thread?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['DateTime']>;
};

export type ForumPollWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  endTime_eq?: Maybe<Scalars['DateTime']>;
  endTime_lt?: Maybe<Scalars['DateTime']>;
  endTime_lte?: Maybe<Scalars['DateTime']>;
  endTime_gt?: Maybe<Scalars['DateTime']>;
  endTime_gte?: Maybe<Scalars['DateTime']>;
  thread?: Maybe<ForumThreadWhereInput>;
  pollAlternatives_none?: Maybe<ForumPollAlternativeWhereInput>;
  pollAlternatives_some?: Maybe<ForumPollAlternativeWhereInput>;
  pollAlternatives_every?: Maybe<ForumPollAlternativeWhereInput>;
  AND?: Maybe<Array<ForumPollWhereInput>>;
  OR?: Maybe<Array<ForumPollWhereInput>>;
};

export type ForumPollWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPost = BaseGraphQlObject & {
  __typename: 'ForumPost';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  author: Membership;
  authorId: Scalars['String'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** Content of the post (md-formatted) */
  text: Scalars['String'];
  repliesTo?: Maybe<ForumPost>;
  repliesToId?: Maybe<Scalars['String']>;
  /** Current post status */
  status: PostStatus;
  /** True if the post is either Active or Locked */
  isVisible: Scalars['Boolean'];
  /** The origin of the post (either thread creation event or regular PostAdded event) */
  origin: PostOrigin;
  edits: Array<PostTextUpdatedEvent>;
  reactions: Array<ForumPostReaction>;
  deletedInEvent?: Maybe<PostDeletedEvent>;
  deletedInEventId?: Maybe<Scalars['String']>;
  forumpostrepliesTo?: Maybe<Array<ForumPost>>;
  forumthreadinitialPost?: Maybe<Array<ForumThread>>;
  postaddedeventpost?: Maybe<Array<PostAddedEvent>>;
  postmoderatedeventpost?: Maybe<Array<PostModeratedEvent>>;
  postreactedeventpost?: Maybe<Array<PostReactedEvent>>;
};

export type ForumPostConnection = {
  __typename: 'ForumPostConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumPostEdge>;
  pageInfo: PageInfo;
};

export type ForumPostCreateInput = {
  author: Scalars['ID'];
  thread: Scalars['ID'];
  text: Scalars['String'];
  repliesTo?: Maybe<Scalars['ID']>;
  status: Scalars['JSONObject'];
  isVisible: Scalars['Boolean'];
  origin: Scalars['JSONObject'];
  deletedInEvent?: Maybe<Scalars['ID']>;
};

export type ForumPostEdge = {
  __typename: 'ForumPostEdge';
  node: ForumPost;
  cursor: Scalars['String'];
};

export enum ForumPostOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  RepliesToAsc = 'repliesTo_ASC',
  RepliesToDesc = 'repliesTo_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC',
  DeletedInEventAsc = 'deletedInEvent_ASC',
  DeletedInEventDesc = 'deletedInEvent_DESC'
}

export type ForumPostReaction = BaseGraphQlObject & {
  __typename: 'ForumPostReaction';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  post: ForumPost;
  postId: Scalars['String'];
  /** The reaction */
  reaction: PostReaction;
};

export type ForumPostReactionConnection = {
  __typename: 'ForumPostReactionConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumPostReactionEdge>;
  pageInfo: PageInfo;
};

export type ForumPostReactionCreateInput = {
  member: Scalars['ID'];
  post: Scalars['ID'];
  reaction: PostReaction;
};

export type ForumPostReactionEdge = {
  __typename: 'ForumPostReactionEdge';
  node: ForumPostReaction;
  cursor: Scalars['String'];
};

export enum ForumPostReactionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  ReactionAsc = 'reaction_ASC',
  ReactionDesc = 'reaction_DESC'
}

export type ForumPostReactionUpdateInput = {
  member?: Maybe<Scalars['ID']>;
  post?: Maybe<Scalars['ID']>;
  reaction?: Maybe<PostReaction>;
};

export type ForumPostReactionWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  reaction_eq?: Maybe<PostReaction>;
  reaction_in?: Maybe<Array<PostReaction>>;
  member?: Maybe<MembershipWhereInput>;
  post?: Maybe<ForumPostWhereInput>;
  AND?: Maybe<Array<ForumPostReactionWhereInput>>;
  OR?: Maybe<Array<ForumPostReactionWhereInput>>;
};

export type ForumPostReactionWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPostUpdateInput = {
  author?: Maybe<Scalars['ID']>;
  thread?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  repliesTo?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['JSONObject']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  origin?: Maybe<Scalars['JSONObject']>;
  deletedInEvent?: Maybe<Scalars['ID']>;
};

export type ForumPostWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  repliesTo_eq?: Maybe<Scalars['ID']>;
  repliesTo_in?: Maybe<Array<Scalars['ID']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  origin_json?: Maybe<Scalars['JSONObject']>;
  deletedInEvent_eq?: Maybe<Scalars['ID']>;
  deletedInEvent_in?: Maybe<Array<Scalars['ID']>>;
  author?: Maybe<MembershipWhereInput>;
  thread?: Maybe<ForumThreadWhereInput>;
  repliesTo?: Maybe<ForumPostWhereInput>;
  edits_none?: Maybe<PostTextUpdatedEventWhereInput>;
  edits_some?: Maybe<PostTextUpdatedEventWhereInput>;
  edits_every?: Maybe<PostTextUpdatedEventWhereInput>;
  reactions_none?: Maybe<ForumPostReactionWhereInput>;
  reactions_some?: Maybe<ForumPostReactionWhereInput>;
  reactions_every?: Maybe<ForumPostReactionWhereInput>;
  deletedInEvent?: Maybe<PostDeletedEventWhereInput>;
  forumpostrepliesTo_none?: Maybe<ForumPostWhereInput>;
  forumpostrepliesTo_some?: Maybe<ForumPostWhereInput>;
  forumpostrepliesTo_every?: Maybe<ForumPostWhereInput>;
  forumthreadinitialPost_none?: Maybe<ForumThreadWhereInput>;
  forumthreadinitialPost_some?: Maybe<ForumThreadWhereInput>;
  forumthreadinitialPost_every?: Maybe<ForumThreadWhereInput>;
  postaddedeventpost_none?: Maybe<PostAddedEventWhereInput>;
  postaddedeventpost_some?: Maybe<PostAddedEventWhereInput>;
  postaddedeventpost_every?: Maybe<PostAddedEventWhereInput>;
  postmoderatedeventpost_none?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventpost_some?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventpost_every?: Maybe<PostModeratedEventWhereInput>;
  postreactedeventpost_none?: Maybe<PostReactedEventWhereInput>;
  postreactedeventpost_some?: Maybe<PostReactedEventWhereInput>;
  postreactedeventpost_every?: Maybe<PostReactedEventWhereInput>;
  AND?: Maybe<Array<ForumPostWhereInput>>;
  OR?: Maybe<Array<ForumPostWhereInput>>;
};

export type ForumPostWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumThread = BaseGraphQlObject & {
  __typename: 'ForumThread';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  author: Membership;
  authorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  /** Thread title */
  title: Scalars['String'];
  posts: Array<ForumPost>;
  initialPost?: Maybe<ForumPost>;
  initialPostId?: Maybe<Scalars['String']>;
  /** Number of non-deleted posts in the thread */
  visiblePostsCount: Scalars['Int'];
  poll?: Maybe<ForumPoll>;
  /** Whether the thread is sticky in the category */
  isSticky: Scalars['Boolean'];
  createdInEvent: ThreadCreatedEvent;
  /** Current thread status */
  status: ThreadStatus;
  /** True if the thread is either Active or Locked */
  isVisible: Scalars['Boolean'];
  metadataUpdates: Array<ThreadMetadataUpdatedEvent>;
  madeStickyInEvents: Array<CategoryStickyThreadUpdateEvent>;
  movedInEvents: Array<ThreadMovedEvent>;
  tags: Array<ForumThreadTag>;
  threaddeletedeventthread?: Maybe<Array<ThreadDeletedEvent>>;
  threadmoderatedeventthread?: Maybe<Array<ThreadModeratedEvent>>;
};

export type ForumThreadConnection = {
  __typename: 'ForumThreadConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumThreadEdge>;
  pageInfo: PageInfo;
};

export type ForumThreadCreateInput = {
  author: Scalars['ID'];
  category: Scalars['ID'];
  title: Scalars['String'];
  initialPost?: Maybe<Scalars['ID']>;
  visiblePostsCount: Scalars['Float'];
  isSticky: Scalars['Boolean'];
  status: Scalars['JSONObject'];
  isVisible: Scalars['Boolean'];
};

export type ForumThreadEdge = {
  __typename: 'ForumThreadEdge';
  node: ForumThread;
  cursor: Scalars['String'];
};

export enum ForumThreadOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  InitialPostAsc = 'initialPost_ASC',
  InitialPostDesc = 'initialPost_DESC',
  VisiblePostsCountAsc = 'visiblePostsCount_ASC',
  VisiblePostsCountDesc = 'visiblePostsCount_DESC',
  IsStickyAsc = 'isSticky_ASC',
  IsStickyDesc = 'isSticky_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC'
}

export type ForumThreadTag = BaseGraphQlObject & {
  __typename: 'ForumThreadTag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  threads: Array<ForumThread>;
  /** Number of non-removed threads currently assigned to the tag */
  visibleThreadsCount: Scalars['Int'];
};

export type ForumThreadTagConnection = {
  __typename: 'ForumThreadTagConnection';
  totalCount: Scalars['Int'];
  edges: Array<ForumThreadTagEdge>;
  pageInfo: PageInfo;
};

export type ForumThreadTagCreateInput = {
  visibleThreadsCount: Scalars['Float'];
};

export type ForumThreadTagEdge = {
  __typename: 'ForumThreadTagEdge';
  node: ForumThreadTag;
  cursor: Scalars['String'];
};

export enum ForumThreadTagOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  VisibleThreadsCountAsc = 'visibleThreadsCount_ASC',
  VisibleThreadsCountDesc = 'visibleThreadsCount_DESC'
}

export type ForumThreadTagUpdateInput = {
  visibleThreadsCount?: Maybe<Scalars['Float']>;
};

export type ForumThreadTagWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  visibleThreadsCount_eq?: Maybe<Scalars['Int']>;
  visibleThreadsCount_gt?: Maybe<Scalars['Int']>;
  visibleThreadsCount_gte?: Maybe<Scalars['Int']>;
  visibleThreadsCount_lt?: Maybe<Scalars['Int']>;
  visibleThreadsCount_lte?: Maybe<Scalars['Int']>;
  visibleThreadsCount_in?: Maybe<Array<Scalars['Int']>>;
  threads_none?: Maybe<ForumThreadWhereInput>;
  threads_some?: Maybe<ForumThreadWhereInput>;
  threads_every?: Maybe<ForumThreadWhereInput>;
  AND?: Maybe<Array<ForumThreadTagWhereInput>>;
  OR?: Maybe<Array<ForumThreadTagWhereInput>>;
};

export type ForumThreadTagWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumThreadUpdateInput = {
  author?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  initialPost?: Maybe<Scalars['ID']>;
  visiblePostsCount?: Maybe<Scalars['Float']>;
  isSticky?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['JSONObject']>;
  isVisible?: Maybe<Scalars['Boolean']>;
};

export type ForumThreadWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  initialPost_eq?: Maybe<Scalars['ID']>;
  initialPost_in?: Maybe<Array<Scalars['ID']>>;
  visiblePostsCount_eq?: Maybe<Scalars['Int']>;
  visiblePostsCount_gt?: Maybe<Scalars['Int']>;
  visiblePostsCount_gte?: Maybe<Scalars['Int']>;
  visiblePostsCount_lt?: Maybe<Scalars['Int']>;
  visiblePostsCount_lte?: Maybe<Scalars['Int']>;
  visiblePostsCount_in?: Maybe<Array<Scalars['Int']>>;
  isSticky_eq?: Maybe<Scalars['Boolean']>;
  isSticky_in?: Maybe<Array<Scalars['Boolean']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  author?: Maybe<MembershipWhereInput>;
  category?: Maybe<ForumCategoryWhereInput>;
  posts_none?: Maybe<ForumPostWhereInput>;
  posts_some?: Maybe<ForumPostWhereInput>;
  posts_every?: Maybe<ForumPostWhereInput>;
  initialPost?: Maybe<ForumPostWhereInput>;
  poll?: Maybe<ForumPollWhereInput>;
  createdInEvent?: Maybe<ThreadCreatedEventWhereInput>;
  metadataUpdates_none?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  metadataUpdates_some?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  metadataUpdates_every?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  madeStickyInEvents_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  madeStickyInEvents_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  madeStickyInEvents_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  movedInEvents_none?: Maybe<ThreadMovedEventWhereInput>;
  movedInEvents_some?: Maybe<ThreadMovedEventWhereInput>;
  movedInEvents_every?: Maybe<ThreadMovedEventWhereInput>;
  tags_none?: Maybe<ForumThreadTagWhereInput>;
  tags_some?: Maybe<ForumThreadTagWhereInput>;
  tags_every?: Maybe<ForumThreadTagWhereInput>;
  threaddeletedeventthread_none?: Maybe<ThreadDeletedEventWhereInput>;
  threaddeletedeventthread_some?: Maybe<ThreadDeletedEventWhereInput>;
  threaddeletedeventthread_every?: Maybe<ThreadDeletedEventWhereInput>;
  threadmoderatedeventthread_none?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventthread_some?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventthread_every?: Maybe<ThreadModeratedEventWhereInput>;
  AND?: Maybe<Array<ForumThreadWhereInput>>;
  OR?: Maybe<Array<ForumThreadWhereInput>>;
};

export type ForumThreadWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestDestination = BaseGraphQlObject & {
  __typename: 'FundingRequestDestination';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Amount of funds requested */
  amount: Scalars['BigInt'];
  /** Destination account */
  account: Scalars['String'];
  list: FundingRequestDestinationsList;
  listId: Scalars['String'];
};

export type FundingRequestDestinationConnection = {
  __typename: 'FundingRequestDestinationConnection';
  totalCount: Scalars['Int'];
  edges: Array<FundingRequestDestinationEdge>;
  pageInfo: PageInfo;
};

export type FundingRequestDestinationCreateInput = {
  amount: Scalars['BigInt'];
  account: Scalars['String'];
  list: Scalars['ID'];
};

export type FundingRequestDestinationEdge = {
  __typename: 'FundingRequestDestinationEdge';
  node: FundingRequestDestination;
  cursor: Scalars['String'];
};

export enum FundingRequestDestinationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  ListAsc = 'list_ASC',
  ListDesc = 'list_DESC'
}

export type FundingRequestDestinationUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  account?: Maybe<Scalars['String']>;
  list?: Maybe<Scalars['ID']>;
};

export type FundingRequestDestinationWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  list_eq?: Maybe<Scalars['ID']>;
  list_in?: Maybe<Array<Scalars['ID']>>;
  list?: Maybe<FundingRequestDestinationsListWhereInput>;
  AND?: Maybe<Array<FundingRequestDestinationWhereInput>>;
  OR?: Maybe<Array<FundingRequestDestinationWhereInput>>;
};

export type FundingRequestDestinationWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestDestinationsList = BaseGraphQlObject & {
  __typename: 'FundingRequestDestinationsList';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  phantom?: Maybe<Scalars['Int']>;
  destinations: Array<FundingRequestDestination>;
};

export type FundingRequestDestinationsListConnection = {
  __typename: 'FundingRequestDestinationsListConnection';
  totalCount: Scalars['Int'];
  edges: Array<FundingRequestDestinationsListEdge>;
  pageInfo: PageInfo;
};

export type FundingRequestDestinationsListCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type FundingRequestDestinationsListEdge = {
  __typename: 'FundingRequestDestinationsListEdge';
  node: FundingRequestDestinationsList;
  cursor: Scalars['String'];
};

export enum FundingRequestDestinationsListOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  PhantomAsc = 'phantom_ASC',
  PhantomDesc = 'phantom_DESC'
}

export type FundingRequestDestinationsListUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type FundingRequestDestinationsListWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  destinations_none?: Maybe<FundingRequestDestinationWhereInput>;
  destinations_some?: Maybe<FundingRequestDestinationWhereInput>;
  destinations_every?: Maybe<FundingRequestDestinationWhereInput>;
  AND?: Maybe<Array<FundingRequestDestinationsListWhereInput>>;
  OR?: Maybe<Array<FundingRequestDestinationsListWhereInput>>;
};

export type FundingRequestDestinationsListWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestProposalDetails = {
  __typename: 'FundingRequestProposalDetails';
  /** Related list of funding request destinations */
  destinationsList?: Maybe<FundingRequestDestinationsList>;
};

export type InitialInvitationBalanceUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'InitialInvitationBalanceUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** New initial invitation balance. */
  newInitialBalance: Scalars['BigInt'];
};

export type InitialInvitationBalanceUpdatedEventConnection = {
  __typename: 'InitialInvitationBalanceUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<InitialInvitationBalanceUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type InitialInvitationBalanceUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newInitialBalance: Scalars['BigInt'];
};

export type InitialInvitationBalanceUpdatedEventEdge = {
  __typename: 'InitialInvitationBalanceUpdatedEventEdge';
  node: InitialInvitationBalanceUpdatedEvent;
  cursor: Scalars['String'];
};

export enum InitialInvitationBalanceUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewInitialBalanceAsc = 'newInitialBalance_ASC',
  NewInitialBalanceDesc = 'newInitialBalance_DESC'
}

export type InitialInvitationBalanceUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newInitialBalance?: Maybe<Scalars['BigInt']>;
};

export type InitialInvitationBalanceUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newInitialBalance_eq?: Maybe<Scalars['BigInt']>;
  newInitialBalance_gt?: Maybe<Scalars['BigInt']>;
  newInitialBalance_gte?: Maybe<Scalars['BigInt']>;
  newInitialBalance_lt?: Maybe<Scalars['BigInt']>;
  newInitialBalance_lte?: Maybe<Scalars['BigInt']>;
  newInitialBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<InitialInvitationBalanceUpdatedEventWhereInput>>;
  OR?: Maybe<Array<InitialInvitationBalanceUpdatedEventWhereInput>>;
};

export type InitialInvitationBalanceUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type InitialInvitationCountUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'InitialInvitationCountUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** New initial invitation count for members. */
  newInitialInvitationCount: Scalars['Int'];
};

export type InitialInvitationCountUpdatedEventConnection = {
  __typename: 'InitialInvitationCountUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<InitialInvitationCountUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type InitialInvitationCountUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newInitialInvitationCount: Scalars['Float'];
};

export type InitialInvitationCountUpdatedEventEdge = {
  __typename: 'InitialInvitationCountUpdatedEventEdge';
  node: InitialInvitationCountUpdatedEvent;
  cursor: Scalars['String'];
};

export enum InitialInvitationCountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewInitialInvitationCountAsc = 'newInitialInvitationCount_ASC',
  NewInitialInvitationCountDesc = 'newInitialInvitationCount_DESC'
}

export type InitialInvitationCountUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newInitialInvitationCount?: Maybe<Scalars['Float']>;
};

export type InitialInvitationCountUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newInitialInvitationCount_eq?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_gt?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_gte?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_lt?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_lte?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<InitialInvitationCountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<InitialInvitationCountUpdatedEventWhereInput>>;
};

export type InitialInvitationCountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type InvalidActionMetadata = {
  __typename: 'InvalidActionMetadata';
  /** Reason why the action metadata was considered invalid */
  reason: Scalars['String'];
};

export type InvalidActionMetadataCreateInput = {
  reason: Scalars['String'];
};

export type InvalidActionMetadataUpdateInput = {
  reason?: Maybe<Scalars['String']>;
};

export type InvalidActionMetadataWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  reason_eq?: Maybe<Scalars['String']>;
  reason_contains?: Maybe<Scalars['String']>;
  reason_startsWith?: Maybe<Scalars['String']>;
  reason_endsWith?: Maybe<Scalars['String']>;
  reason_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<InvalidActionMetadataWhereInput>>;
  OR?: Maybe<Array<InvalidActionMetadataWhereInput>>;
};

export type InvalidActionMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type InvitesTransferredEvent = Event & BaseGraphQlObject & {
  __typename: 'InvitesTransferredEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  sourceMember: Membership;
  sourceMemberId: Scalars['String'];
  targetMember: Membership;
  targetMemberId: Scalars['String'];
  /** Number of invites transferred. */
  numberOfInvites: Scalars['Int'];
};

export type InvitesTransferredEventConnection = {
  __typename: 'InvitesTransferredEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<InvitesTransferredEventEdge>;
  pageInfo: PageInfo;
};

export type InvitesTransferredEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  sourceMember: Scalars['ID'];
  targetMember: Scalars['ID'];
  numberOfInvites: Scalars['Float'];
};

export type InvitesTransferredEventEdge = {
  __typename: 'InvitesTransferredEventEdge';
  node: InvitesTransferredEvent;
  cursor: Scalars['String'];
};

export enum InvitesTransferredEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  SourceMemberAsc = 'sourceMember_ASC',
  SourceMemberDesc = 'sourceMember_DESC',
  TargetMemberAsc = 'targetMember_ASC',
  TargetMemberDesc = 'targetMember_DESC',
  NumberOfInvitesAsc = 'numberOfInvites_ASC',
  NumberOfInvitesDesc = 'numberOfInvites_DESC'
}

export type InvitesTransferredEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  sourceMember?: Maybe<Scalars['ID']>;
  targetMember?: Maybe<Scalars['ID']>;
  numberOfInvites?: Maybe<Scalars['Float']>;
};

export type InvitesTransferredEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  sourceMember_eq?: Maybe<Scalars['ID']>;
  sourceMember_in?: Maybe<Array<Scalars['ID']>>;
  targetMember_eq?: Maybe<Scalars['ID']>;
  targetMember_in?: Maybe<Array<Scalars['ID']>>;
  numberOfInvites_eq?: Maybe<Scalars['Int']>;
  numberOfInvites_gt?: Maybe<Scalars['Int']>;
  numberOfInvites_gte?: Maybe<Scalars['Int']>;
  numberOfInvites_lt?: Maybe<Scalars['Int']>;
  numberOfInvites_lte?: Maybe<Scalars['Int']>;
  numberOfInvites_in?: Maybe<Array<Scalars['Int']>>;
  sourceMember?: Maybe<MembershipWhereInput>;
  targetMember?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<InvitesTransferredEventWhereInput>>;
  OR?: Maybe<Array<InvitesTransferredEventWhereInput>>;
};

export type InvitesTransferredEventWhereUniqueInput = {
  id: Scalars['ID'];
};


export type Language = BaseGraphQlObject & {
  __typename: 'Language';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Language identifier ISO 639-1 */
  iso: Scalars['String'];
  createdInBlock: Scalars['Int'];
  channellanguage?: Maybe<Array<Channel>>;
  videolanguage?: Maybe<Array<Video>>;
};

export type LanguageConnection = {
  __typename: 'LanguageConnection';
  totalCount: Scalars['Int'];
  edges: Array<LanguageEdge>;
  pageInfo: PageInfo;
};

export type LanguageCreateInput = {
  iso: Scalars['String'];
  createdInBlock: Scalars['Float'];
};

export type LanguageEdge = {
  __typename: 'LanguageEdge';
  node: Language;
  cursor: Scalars['String'];
};

export enum LanguageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IsoAsc = 'iso_ASC',
  IsoDesc = 'iso_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC'
}

export type LanguageUpdateInput = {
  iso?: Maybe<Scalars['String']>;
  createdInBlock?: Maybe<Scalars['Float']>;
};

export type LanguageWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  iso_eq?: Maybe<Scalars['String']>;
  iso_contains?: Maybe<Scalars['String']>;
  iso_startsWith?: Maybe<Scalars['String']>;
  iso_endsWith?: Maybe<Scalars['String']>;
  iso_in?: Maybe<Array<Scalars['String']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  channellanguage_none?: Maybe<ChannelWhereInput>;
  channellanguage_some?: Maybe<ChannelWhereInput>;
  channellanguage_every?: Maybe<ChannelWhereInput>;
  videolanguage_none?: Maybe<VideoWhereInput>;
  videolanguage_some?: Maybe<VideoWhereInput>;
  videolanguage_every?: Maybe<VideoWhereInput>;
  AND?: Maybe<Array<LanguageWhereInput>>;
  OR?: Maybe<Array<LanguageWhereInput>>;
};

export type LanguageWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderInvitationQuotaUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'LeaderInvitationQuotaUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** New quota. */
  newInvitationQuota: Scalars['Int'];
};

export type LeaderInvitationQuotaUpdatedEventConnection = {
  __typename: 'LeaderInvitationQuotaUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<LeaderInvitationQuotaUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type LeaderInvitationQuotaUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newInvitationQuota: Scalars['Float'];
};

export type LeaderInvitationQuotaUpdatedEventEdge = {
  __typename: 'LeaderInvitationQuotaUpdatedEventEdge';
  node: LeaderInvitationQuotaUpdatedEvent;
  cursor: Scalars['String'];
};

export enum LeaderInvitationQuotaUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewInvitationQuotaAsc = 'newInvitationQuota_ASC',
  NewInvitationQuotaDesc = 'newInvitationQuota_DESC'
}

export type LeaderInvitationQuotaUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newInvitationQuota?: Maybe<Scalars['Float']>;
};

export type LeaderInvitationQuotaUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newInvitationQuota_eq?: Maybe<Scalars['Int']>;
  newInvitationQuota_gt?: Maybe<Scalars['Int']>;
  newInvitationQuota_gte?: Maybe<Scalars['Int']>;
  newInvitationQuota_lt?: Maybe<Scalars['Int']>;
  newInvitationQuota_lte?: Maybe<Scalars['Int']>;
  newInvitationQuota_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<LeaderInvitationQuotaUpdatedEventWhereInput>>;
  OR?: Maybe<Array<LeaderInvitationQuotaUpdatedEventWhereInput>>;
};

export type LeaderInvitationQuotaUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderSetEvent = Event & BaseGraphQlObject & {
  __typename: 'LeaderSetEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker?: Maybe<Worker>;
  workerId?: Maybe<Scalars['String']>;
};

export type LeaderSetEventConnection = {
  __typename: 'LeaderSetEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<LeaderSetEventEdge>;
  pageInfo: PageInfo;
};

export type LeaderSetEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker?: Maybe<Scalars['ID']>;
};

export type LeaderSetEventEdge = {
  __typename: 'LeaderSetEventEdge';
  node: LeaderSetEvent;
  cursor: Scalars['String'];
};

export enum LeaderSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type LeaderSetEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
};

export type LeaderSetEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<LeaderSetEventWhereInput>>;
  OR?: Maybe<Array<LeaderSetEventWhereInput>>;
};

export type LeaderSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderUnsetEvent = Event & BaseGraphQlObject & {
  __typename: 'LeaderUnsetEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  leader: Worker;
  leaderId: Scalars['String'];
};

export type LeaderUnsetEventConnection = {
  __typename: 'LeaderUnsetEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<LeaderUnsetEventEdge>;
  pageInfo: PageInfo;
};

export type LeaderUnsetEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  leader: Scalars['ID'];
};

export type LeaderUnsetEventEdge = {
  __typename: 'LeaderUnsetEventEdge';
  node: LeaderUnsetEvent;
  cursor: Scalars['String'];
};

export enum LeaderUnsetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  LeaderAsc = 'leader_ASC',
  LeaderDesc = 'leader_DESC'
}

export type LeaderUnsetEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  leader?: Maybe<Scalars['ID']>;
};

export type LeaderUnsetEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  leader_eq?: Maybe<Scalars['ID']>;
  leader_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  leader?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<LeaderUnsetEventWhereInput>>;
  OR?: Maybe<Array<LeaderUnsetEventWhereInput>>;
};

export type LeaderUnsetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum LiaisonJudgement {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED'
}

export type License = BaseGraphQlObject & {
  __typename: 'License';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** License code defined by Joystream */
  code?: Maybe<Scalars['Int']>;
  /** Attribution (if required by the license) */
  attribution?: Maybe<Scalars['String']>;
  /** Custom license content */
  customText?: Maybe<Scalars['String']>;
  videolicense?: Maybe<Array<Video>>;
};

export type LicenseConnection = {
  __typename: 'LicenseConnection';
  totalCount: Scalars['Int'];
  edges: Array<LicenseEdge>;
  pageInfo: PageInfo;
};

export type LicenseCreateInput = {
  code?: Maybe<Scalars['Float']>;
  attribution?: Maybe<Scalars['String']>;
  customText?: Maybe<Scalars['String']>;
};

export type LicenseEdge = {
  __typename: 'LicenseEdge';
  node: License;
  cursor: Scalars['String'];
};

export enum LicenseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CodeAsc = 'code_ASC',
  CodeDesc = 'code_DESC',
  AttributionAsc = 'attribution_ASC',
  AttributionDesc = 'attribution_DESC',
  CustomTextAsc = 'customText_ASC',
  CustomTextDesc = 'customText_DESC'
}

export type LicenseUpdateInput = {
  code?: Maybe<Scalars['Float']>;
  attribution?: Maybe<Scalars['String']>;
  customText?: Maybe<Scalars['String']>;
};

export type LicenseWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  code_eq?: Maybe<Scalars['Int']>;
  code_gt?: Maybe<Scalars['Int']>;
  code_gte?: Maybe<Scalars['Int']>;
  code_lt?: Maybe<Scalars['Int']>;
  code_lte?: Maybe<Scalars['Int']>;
  code_in?: Maybe<Array<Scalars['Int']>>;
  attribution_eq?: Maybe<Scalars['String']>;
  attribution_contains?: Maybe<Scalars['String']>;
  attribution_startsWith?: Maybe<Scalars['String']>;
  attribution_endsWith?: Maybe<Scalars['String']>;
  attribution_in?: Maybe<Array<Scalars['String']>>;
  customText_eq?: Maybe<Scalars['String']>;
  customText_contains?: Maybe<Scalars['String']>;
  customText_startsWith?: Maybe<Scalars['String']>;
  customText_endsWith?: Maybe<Scalars['String']>;
  customText_in?: Maybe<Array<Scalars['String']>>;
  videolicense_none?: Maybe<VideoWhereInput>;
  videolicense_some?: Maybe<VideoWhereInput>;
  videolicense_every?: Maybe<VideoWhereInput>;
  AND?: Maybe<Array<LicenseWhereInput>>;
  OR?: Maybe<Array<LicenseWhereInput>>;
};

export type LicenseWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LockBlogPostProposalDetails = {
  __typename: 'LockBlogPostProposalDetails';
  /** The blog post that should be locked */
  blogPost: Scalars['String'];
};

export type LockBlogPostProposalDetailsCreateInput = {
  blogPost: Scalars['String'];
};

export type LockBlogPostProposalDetailsUpdateInput = {
  blogPost?: Maybe<Scalars['String']>;
};

export type LockBlogPostProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<LockBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<LockBlogPostProposalDetailsWhereInput>>;
};

export type LockBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberAccountsUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'MemberAccountsUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** New member root account in SS58 encoding. Null means no new value was provided. */
  newRootAccount?: Maybe<Scalars['String']>;
  /** New member controller in SS58 encoding. Null means no new value was provided. */
  newControllerAccount?: Maybe<Scalars['String']>;
};

export type MemberAccountsUpdatedEventConnection = {
  __typename: 'MemberAccountsUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MemberAccountsUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type MemberAccountsUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  newRootAccount?: Maybe<Scalars['String']>;
  newControllerAccount?: Maybe<Scalars['String']>;
};

export type MemberAccountsUpdatedEventEdge = {
  __typename: 'MemberAccountsUpdatedEventEdge';
  node: MemberAccountsUpdatedEvent;
  cursor: Scalars['String'];
};

export enum MemberAccountsUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NewRootAccountAsc = 'newRootAccount_ASC',
  NewRootAccountDesc = 'newRootAccount_DESC',
  NewControllerAccountAsc = 'newControllerAccount_ASC',
  NewControllerAccountDesc = 'newControllerAccount_DESC'
}

export type MemberAccountsUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  newRootAccount?: Maybe<Scalars['String']>;
  newControllerAccount?: Maybe<Scalars['String']>;
};

export type MemberAccountsUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  newRootAccount_eq?: Maybe<Scalars['String']>;
  newRootAccount_contains?: Maybe<Scalars['String']>;
  newRootAccount_startsWith?: Maybe<Scalars['String']>;
  newRootAccount_endsWith?: Maybe<Scalars['String']>;
  newRootAccount_in?: Maybe<Array<Scalars['String']>>;
  newControllerAccount_eq?: Maybe<Scalars['String']>;
  newControllerAccount_contains?: Maybe<Scalars['String']>;
  newControllerAccount_startsWith?: Maybe<Scalars['String']>;
  newControllerAccount_endsWith?: Maybe<Scalars['String']>;
  newControllerAccount_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<MemberAccountsUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberAccountsUpdatedEventWhereInput>>;
};

export type MemberAccountsUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberInvitedEvent = Event & BaseGraphQlObject & {
  __typename: 'MemberInvitedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  invitingMember: Membership;
  invitingMemberId: Scalars['String'];
  newMember: Membership;
  newMemberId: Scalars['String'];
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String'];
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String'];
  /** New member handle. */
  handle: Scalars['String'];
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
};

export type MemberInvitedEventConnection = {
  __typename: 'MemberInvitedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MemberInvitedEventEdge>;
  pageInfo: PageInfo;
};

export type MemberInvitedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  invitingMember: Scalars['ID'];
  newMember: Scalars['ID'];
  rootAccount: Scalars['String'];
  controllerAccount: Scalars['String'];
  handle: Scalars['String'];
  metadata: Scalars['ID'];
};

export type MemberInvitedEventEdge = {
  __typename: 'MemberInvitedEventEdge';
  node: MemberInvitedEvent;
  cursor: Scalars['String'];
};

export enum MemberInvitedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  InvitingMemberAsc = 'invitingMember_ASC',
  InvitingMemberDesc = 'invitingMember_DESC',
  NewMemberAsc = 'newMember_ASC',
  NewMemberDesc = 'newMember_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC'
}

export type MemberInvitedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  invitingMember?: Maybe<Scalars['ID']>;
  newMember?: Maybe<Scalars['ID']>;
  rootAccount?: Maybe<Scalars['String']>;
  controllerAccount?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['ID']>;
};

export type MemberInvitedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  invitingMember_eq?: Maybe<Scalars['ID']>;
  invitingMember_in?: Maybe<Array<Scalars['ID']>>;
  newMember_eq?: Maybe<Scalars['ID']>;
  newMember_in?: Maybe<Array<Scalars['ID']>>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_startsWith?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  invitingMember?: Maybe<MembershipWhereInput>;
  newMember?: Maybe<MembershipWhereInput>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  AND?: Maybe<Array<MemberInvitedEventWhereInput>>;
  OR?: Maybe<Array<MemberInvitedEventWhereInput>>;
};

export type MemberInvitedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberMetadata = BaseGraphQlObject & {
  __typename: 'MemberMetadata';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Member's name */
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<DataObject>;
  avatarId?: Maybe<Scalars['String']>;
  /** Short text chosen by member to share information about themselves */
  about?: Maybe<Scalars['String']>;
  memberinvitedeventmetadata?: Maybe<Array<MemberInvitedEvent>>;
  memberprofileupdatedeventnewMetadata?: Maybe<Array<MemberProfileUpdatedEvent>>;
  membershipmetadata?: Maybe<Array<Membership>>;
  membershipboughteventmetadata?: Maybe<Array<MembershipBoughtEvent>>;
};

export type MemberMetadataConnection = {
  __typename: 'MemberMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<MemberMetadataEdge>;
  pageInfo: PageInfo;
};

export type MemberMetadataCreateInput = {
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['ID']>;
  about?: Maybe<Scalars['String']>;
};

export type MemberMetadataEdge = {
  __typename: 'MemberMetadataEdge';
  node: MemberMetadata;
  cursor: Scalars['String'];
};

export enum MemberMetadataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  AvatarAsc = 'avatar_ASC',
  AvatarDesc = 'avatar_DESC',
  AboutAsc = 'about_ASC',
  AboutDesc = 'about_DESC'
}

export type MemberMetadataUpdateInput = {
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['ID']>;
  about?: Maybe<Scalars['String']>;
};

export type MemberMetadataWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  name_eq?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_startsWith?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  avatar_eq?: Maybe<Scalars['ID']>;
  avatar_in?: Maybe<Array<Scalars['ID']>>;
  about_eq?: Maybe<Scalars['String']>;
  about_contains?: Maybe<Scalars['String']>;
  about_startsWith?: Maybe<Scalars['String']>;
  about_endsWith?: Maybe<Scalars['String']>;
  about_in?: Maybe<Array<Scalars['String']>>;
  avatar?: Maybe<DataObjectWhereInput>;
  memberinvitedeventmetadata_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventmetadata_some?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventmetadata_every?: Maybe<MemberInvitedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_none?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_some?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_every?: Maybe<MemberProfileUpdatedEventWhereInput>;
  membershipmetadata_none?: Maybe<MembershipWhereInput>;
  membershipmetadata_some?: Maybe<MembershipWhereInput>;
  membershipmetadata_every?: Maybe<MembershipWhereInput>;
  membershipboughteventmetadata_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventmetadata_some?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventmetadata_every?: Maybe<MembershipBoughtEventWhereInput>;
  AND?: Maybe<Array<MemberMetadataWhereInput>>;
  OR?: Maybe<Array<MemberMetadataWhereInput>>;
};

export type MemberMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberProfileUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'MemberProfileUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** New member handle. Null means no new value was provided. */
  newHandle?: Maybe<Scalars['String']>;
  newMetadata: MemberMetadata;
  newMetadataId: Scalars['String'];
};

export type MemberProfileUpdatedEventConnection = {
  __typename: 'MemberProfileUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MemberProfileUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type MemberProfileUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  newHandle?: Maybe<Scalars['String']>;
  newMetadata: Scalars['ID'];
};

export type MemberProfileUpdatedEventEdge = {
  __typename: 'MemberProfileUpdatedEventEdge';
  node: MemberProfileUpdatedEvent;
  cursor: Scalars['String'];
};

export enum MemberProfileUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NewHandleAsc = 'newHandle_ASC',
  NewHandleDesc = 'newHandle_DESC',
  NewMetadataAsc = 'newMetadata_ASC',
  NewMetadataDesc = 'newMetadata_DESC'
}

export type MemberProfileUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  newHandle?: Maybe<Scalars['String']>;
  newMetadata?: Maybe<Scalars['ID']>;
};

export type MemberProfileUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  newHandle_eq?: Maybe<Scalars['String']>;
  newHandle_contains?: Maybe<Scalars['String']>;
  newHandle_startsWith?: Maybe<Scalars['String']>;
  newHandle_endsWith?: Maybe<Scalars['String']>;
  newHandle_in?: Maybe<Array<Scalars['String']>>;
  newMetadata_eq?: Maybe<Scalars['ID']>;
  newMetadata_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  newMetadata?: Maybe<MemberMetadataWhereInput>;
  AND?: Maybe<Array<MemberProfileUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberProfileUpdatedEventWhereInput>>;
};

export type MemberProfileUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberVerificationStatusUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'MemberVerificationStatusUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** New status. */
  isVerified: Scalars['Boolean'];
};

export type MemberVerificationStatusUpdatedEventConnection = {
  __typename: 'MemberVerificationStatusUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MemberVerificationStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type MemberVerificationStatusUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  worker: Scalars['ID'];
  isVerified: Scalars['Boolean'];
};

export type MemberVerificationStatusUpdatedEventEdge = {
  __typename: 'MemberVerificationStatusUpdatedEventEdge';
  node: MemberVerificationStatusUpdatedEvent;
  cursor: Scalars['String'];
};

export enum MemberVerificationStatusUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  IsVerifiedAsc = 'isVerified_ASC',
  IsVerifiedDesc = 'isVerified_DESC'
}

export type MemberVerificationStatusUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  isVerified?: Maybe<Scalars['Boolean']>;
};

export type MemberVerificationStatusUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  isVerified_eq?: Maybe<Scalars['Boolean']>;
  isVerified_in?: Maybe<Array<Scalars['Boolean']>>;
  member?: Maybe<MembershipWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<MemberVerificationStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberVerificationStatusUpdatedEventWhereInput>>;
};

export type MemberVerificationStatusUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembersByHandleFtsOutput = {
  __typename: 'MembersByHandleFTSOutput';
  item: MembersByHandleSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type MembersByHandleSearchResult = Membership;

/** Stored information about a registered user */
export type Membership = BaseGraphQlObject & {
  __typename: 'Membership';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The unique handle chosen by member */
  handle: Scalars['String'];
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
  /** Member's controller account id */
  controllerAccount: Scalars['String'];
  /** Member's root account id */
  rootAccount: Scalars['String'];
  /** How the member was registered */
  entry: MembershipEntryMethod;
  /** Whether member has been verified by membership working group. */
  isVerified: Scalars['Boolean'];
  /** Staking accounts bounded to membership. */
  boundAccounts: Array<Scalars['String']>;
  /** Current count of invites left to send. */
  inviteCount: Scalars['Int'];
  invitees: Array<Membership>;
  invitedBy?: Maybe<Membership>;
  invitedById?: Maybe<Scalars['String']>;
  referredMembers: Array<Membership>;
  referredBy?: Maybe<Membership>;
  referredById?: Maybe<Scalars['String']>;
  /** Whether member is founding member. */
  isFoundingMember: Scalars['Boolean'];
  /** Whether member is elected in the current council. */
  isCouncilMember: Scalars['Boolean'];
  roles: Array<Worker>;
  whitelistedIn: Array<ProposalDiscussionWhitelist>;
  channels: Array<Channel>;
  budgetPayments: Array<BudgetPayment>;
  councilMembers: Array<CouncilMember>;
  referendumStageRevealingOptionResults: Array<ReferendumStageRevealingOptionResult>;
  votesRecieved: Array<CastVote>;
  electedCouncilEvents: Array<NewCouncilElectedEvent>;
  candidacynoteseteventmember?: Maybe<Array<CandidacyNoteSetEvent>>;
  candidacystakereleaseeventmember?: Maybe<Array<CandidacyStakeReleaseEvent>>;
  candidacywithdraweventmember?: Maybe<Array<CandidacyWithdrawEvent>>;
  forumpostauthor?: Maybe<Array<ForumPost>>;
  forumpostreactionmember?: Maybe<Array<ForumPostReaction>>;
  forumthreadauthor?: Maybe<Array<ForumThread>>;
  invitestransferredeventsourceMember?: Maybe<Array<InvitesTransferredEvent>>;
  invitestransferredeventtargetMember?: Maybe<Array<InvitesTransferredEvent>>;
  memberaccountsupdatedeventmember?: Maybe<Array<MemberAccountsUpdatedEvent>>;
  memberinvitedeventinvitingMember?: Maybe<Array<MemberInvitedEvent>>;
  memberinvitedeventnewMember?: Maybe<Array<MemberInvitedEvent>>;
  memberprofileupdatedeventmember?: Maybe<Array<MemberProfileUpdatedEvent>>;
  memberverificationstatusupdatedeventmember?: Maybe<Array<MemberVerificationStatusUpdatedEvent>>;
  membershipboughteventnewMember?: Maybe<Array<MembershipBoughtEvent>>;
  membershipboughteventreferrer?: Maybe<Array<MembershipBoughtEvent>>;
  newcandidateeventmember?: Maybe<Array<NewCandidateEvent>>;
  postdeletedeventactor?: Maybe<Array<PostDeletedEvent>>;
  postreactedeventreactingMember?: Maybe<Array<PostReactedEvent>>;
  proposalcreator?: Maybe<Array<Proposal>>;
  proposaldiscussionpostauthor?: Maybe<Array<ProposalDiscussionPost>>;
  proposaldiscussionpostdeletedeventactor?: Maybe<Array<ProposalDiscussionPostDeletedEvent>>;
  proposaldiscussionthreadmodechangedeventactor?: Maybe<Array<ProposalDiscussionThreadModeChangedEvent>>;
  proposalvotedeventvoter?: Maybe<Array<ProposalVotedEvent>>;
  rewardpaymenteventmember?: Maybe<Array<RewardPaymentEvent>>;
  stakingaccountaddedeventmember?: Maybe<Array<StakingAccountAddedEvent>>;
  stakingaccountconfirmedeventmember?: Maybe<Array<StakingAccountConfirmedEvent>>;
  stakingaccountremovedeventmember?: Maybe<Array<StakingAccountRemovedEvent>>;
  voteonpolleventvotingMember?: Maybe<Array<VoteOnPollEvent>>;
  voterevealedeventmember?: Maybe<Array<VoteRevealedEvent>>;
  workinggroupapplicationapplicant?: Maybe<Array<WorkingGroupApplication>>;
};

export type MembershipBoughtEvent = Event & BaseGraphQlObject & {
  __typename: 'MembershipBoughtEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  newMember: Membership;
  newMemberId: Scalars['String'];
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String'];
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String'];
  /** New member handle. */
  handle: Scalars['String'];
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
  referrer?: Maybe<Membership>;
  referrerId?: Maybe<Scalars['String']>;
};

export type MembershipBoughtEventConnection = {
  __typename: 'MembershipBoughtEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MembershipBoughtEventEdge>;
  pageInfo: PageInfo;
};

export type MembershipBoughtEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newMember: Scalars['ID'];
  rootAccount: Scalars['String'];
  controllerAccount: Scalars['String'];
  handle: Scalars['String'];
  metadata: Scalars['ID'];
  referrer?: Maybe<Scalars['ID']>;
};

export type MembershipBoughtEventEdge = {
  __typename: 'MembershipBoughtEventEdge';
  node: MembershipBoughtEvent;
  cursor: Scalars['String'];
};

export enum MembershipBoughtEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewMemberAsc = 'newMember_ASC',
  NewMemberDesc = 'newMember_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  ReferrerAsc = 'referrer_ASC',
  ReferrerDesc = 'referrer_DESC'
}

export type MembershipBoughtEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newMember?: Maybe<Scalars['ID']>;
  rootAccount?: Maybe<Scalars['String']>;
  controllerAccount?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['ID']>;
  referrer?: Maybe<Scalars['ID']>;
};

export type MembershipBoughtEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newMember_eq?: Maybe<Scalars['ID']>;
  newMember_in?: Maybe<Array<Scalars['ID']>>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_startsWith?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  referrer_eq?: Maybe<Scalars['ID']>;
  referrer_in?: Maybe<Array<Scalars['ID']>>;
  newMember?: Maybe<MembershipWhereInput>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  referrer?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<MembershipBoughtEventWhereInput>>;
  OR?: Maybe<Array<MembershipBoughtEventWhereInput>>;
};

export type MembershipBoughtEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipConnection = {
  __typename: 'MembershipConnection';
  totalCount: Scalars['Int'];
  edges: Array<MembershipEdge>;
  pageInfo: PageInfo;
};

export type MembershipCreateInput = {
  handle: Scalars['String'];
  metadata: Scalars['ID'];
  controllerAccount: Scalars['String'];
  rootAccount: Scalars['String'];
  entry: Scalars['JSONObject'];
  isVerified: Scalars['Boolean'];
  boundAccounts: Array<Scalars['String']>;
  inviteCount: Scalars['Float'];
  invitedBy?: Maybe<Scalars['ID']>;
  referredBy?: Maybe<Scalars['ID']>;
  isFoundingMember: Scalars['Boolean'];
  isCouncilMember: Scalars['Boolean'];
};

export type MembershipEdge = {
  __typename: 'MembershipEdge';
  node: Membership;
  cursor: Scalars['String'];
};

export type MembershipEntryGenesis = {
  __typename: 'MembershipEntryGenesis';
  phantom?: Maybe<Scalars['Int']>;
};

export type MembershipEntryGenesisCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type MembershipEntryGenesisUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type MembershipEntryGenesisWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<MembershipEntryGenesisWhereInput>>;
  OR?: Maybe<Array<MembershipEntryGenesisWhereInput>>;
};

export type MembershipEntryGenesisWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipEntryInvited = {
  __typename: 'MembershipEntryInvited';
  /** The event the member was invited in */
  memberInvitedEvent?: Maybe<MemberInvitedEvent>;
};

export type MembershipEntryMethod = MembershipEntryPaid | MembershipEntryInvited | MembershipEntryGenesis;

export type MembershipEntryPaid = {
  __typename: 'MembershipEntryPaid';
  /** The event the membership was bought in */
  membershipBoughtEvent?: Maybe<MembershipBoughtEvent>;
};

export enum MembershipOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  IsVerifiedAsc = 'isVerified_ASC',
  IsVerifiedDesc = 'isVerified_DESC',
  InviteCountAsc = 'inviteCount_ASC',
  InviteCountDesc = 'inviteCount_DESC',
  InvitedByAsc = 'invitedBy_ASC',
  InvitedByDesc = 'invitedBy_DESC',
  ReferredByAsc = 'referredBy_ASC',
  ReferredByDesc = 'referredBy_DESC',
  IsFoundingMemberAsc = 'isFoundingMember_ASC',
  IsFoundingMemberDesc = 'isFoundingMember_DESC',
  IsCouncilMemberAsc = 'isCouncilMember_ASC',
  IsCouncilMemberDesc = 'isCouncilMember_DESC'
}

export type MembershipPriceUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'MembershipPriceUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The new membership price. */
  newPrice: Scalars['BigInt'];
};

export type MembershipPriceUpdatedEventConnection = {
  __typename: 'MembershipPriceUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<MembershipPriceUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type MembershipPriceUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newPrice: Scalars['BigInt'];
};

export type MembershipPriceUpdatedEventEdge = {
  __typename: 'MembershipPriceUpdatedEventEdge';
  node: MembershipPriceUpdatedEvent;
  cursor: Scalars['String'];
};

export enum MembershipPriceUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewPriceAsc = 'newPrice_ASC',
  NewPriceDesc = 'newPrice_DESC'
}

export type MembershipPriceUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newPrice?: Maybe<Scalars['BigInt']>;
};

export type MembershipPriceUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newPrice_eq?: Maybe<Scalars['BigInt']>;
  newPrice_gt?: Maybe<Scalars['BigInt']>;
  newPrice_gte?: Maybe<Scalars['BigInt']>;
  newPrice_lt?: Maybe<Scalars['BigInt']>;
  newPrice_lte?: Maybe<Scalars['BigInt']>;
  newPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<MembershipPriceUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MembershipPriceUpdatedEventWhereInput>>;
};

export type MembershipPriceUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipSystemSnapshot = BaseGraphQlObject & {
  __typename: 'MembershipSystemSnapshot';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The snapshot block number */
  snapshotBlock: Scalars['Int'];
  /** Initial invitation count of a new member. */
  defaultInviteCount: Scalars['Int'];
  /** Current price to buy a membership. */
  membershipPrice: Scalars['BigInt'];
  /** Percentage of tokens diverted to invitor. */
  referralCut: Scalars['Int'];
  /** The initial, locked, balance credited to controller account of invitee. */
  invitedInitialBalance: Scalars['BigInt'];
};

export type MembershipSystemSnapshotConnection = {
  __typename: 'MembershipSystemSnapshotConnection';
  totalCount: Scalars['Int'];
  edges: Array<MembershipSystemSnapshotEdge>;
  pageInfo: PageInfo;
};

export type MembershipSystemSnapshotCreateInput = {
  snapshotBlock: Scalars['Float'];
  defaultInviteCount: Scalars['Float'];
  membershipPrice: Scalars['BigInt'];
  referralCut: Scalars['Float'];
  invitedInitialBalance: Scalars['BigInt'];
};

export type MembershipSystemSnapshotEdge = {
  __typename: 'MembershipSystemSnapshotEdge';
  node: MembershipSystemSnapshot;
  cursor: Scalars['String'];
};

export enum MembershipSystemSnapshotOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  SnapshotBlockAsc = 'snapshotBlock_ASC',
  SnapshotBlockDesc = 'snapshotBlock_DESC',
  DefaultInviteCountAsc = 'defaultInviteCount_ASC',
  DefaultInviteCountDesc = 'defaultInviteCount_DESC',
  MembershipPriceAsc = 'membershipPrice_ASC',
  MembershipPriceDesc = 'membershipPrice_DESC',
  ReferralCutAsc = 'referralCut_ASC',
  ReferralCutDesc = 'referralCut_DESC',
  InvitedInitialBalanceAsc = 'invitedInitialBalance_ASC',
  InvitedInitialBalanceDesc = 'invitedInitialBalance_DESC'
}

export type MembershipSystemSnapshotUpdateInput = {
  snapshotBlock?: Maybe<Scalars['Float']>;
  defaultInviteCount?: Maybe<Scalars['Float']>;
  membershipPrice?: Maybe<Scalars['BigInt']>;
  referralCut?: Maybe<Scalars['Float']>;
  invitedInitialBalance?: Maybe<Scalars['BigInt']>;
};

export type MembershipSystemSnapshotWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  snapshotBlock_eq?: Maybe<Scalars['Int']>;
  snapshotBlock_gt?: Maybe<Scalars['Int']>;
  snapshotBlock_gte?: Maybe<Scalars['Int']>;
  snapshotBlock_lt?: Maybe<Scalars['Int']>;
  snapshotBlock_lte?: Maybe<Scalars['Int']>;
  snapshotBlock_in?: Maybe<Array<Scalars['Int']>>;
  defaultInviteCount_eq?: Maybe<Scalars['Int']>;
  defaultInviteCount_gt?: Maybe<Scalars['Int']>;
  defaultInviteCount_gte?: Maybe<Scalars['Int']>;
  defaultInviteCount_lt?: Maybe<Scalars['Int']>;
  defaultInviteCount_lte?: Maybe<Scalars['Int']>;
  defaultInviteCount_in?: Maybe<Array<Scalars['Int']>>;
  membershipPrice_eq?: Maybe<Scalars['BigInt']>;
  membershipPrice_gt?: Maybe<Scalars['BigInt']>;
  membershipPrice_gte?: Maybe<Scalars['BigInt']>;
  membershipPrice_lt?: Maybe<Scalars['BigInt']>;
  membershipPrice_lte?: Maybe<Scalars['BigInt']>;
  membershipPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  referralCut_eq?: Maybe<Scalars['Int']>;
  referralCut_gt?: Maybe<Scalars['Int']>;
  referralCut_gte?: Maybe<Scalars['Int']>;
  referralCut_lt?: Maybe<Scalars['Int']>;
  referralCut_lte?: Maybe<Scalars['Int']>;
  referralCut_in?: Maybe<Array<Scalars['Int']>>;
  invitedInitialBalance_eq?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_gt?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_gte?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_lt?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_lte?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<MembershipSystemSnapshotWhereInput>>;
  OR?: Maybe<Array<MembershipSystemSnapshotWhereInput>>;
};

export type MembershipSystemSnapshotWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipUpdateInput = {
  handle?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['ID']>;
  controllerAccount?: Maybe<Scalars['String']>;
  rootAccount?: Maybe<Scalars['String']>;
  entry?: Maybe<Scalars['JSONObject']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  boundAccounts?: Maybe<Array<Scalars['String']>>;
  inviteCount?: Maybe<Scalars['Float']>;
  invitedBy?: Maybe<Scalars['ID']>;
  referredBy?: Maybe<Scalars['ID']>;
  isFoundingMember?: Maybe<Scalars['Boolean']>;
  isCouncilMember?: Maybe<Scalars['Boolean']>;
};

export type MembershipWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_startsWith?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  entry_json?: Maybe<Scalars['JSONObject']>;
  isVerified_eq?: Maybe<Scalars['Boolean']>;
  isVerified_in?: Maybe<Array<Scalars['Boolean']>>;
  inviteCount_eq?: Maybe<Scalars['Int']>;
  inviteCount_gt?: Maybe<Scalars['Int']>;
  inviteCount_gte?: Maybe<Scalars['Int']>;
  inviteCount_lt?: Maybe<Scalars['Int']>;
  inviteCount_lte?: Maybe<Scalars['Int']>;
  inviteCount_in?: Maybe<Array<Scalars['Int']>>;
  invitedBy_eq?: Maybe<Scalars['ID']>;
  invitedBy_in?: Maybe<Array<Scalars['ID']>>;
  referredBy_eq?: Maybe<Scalars['ID']>;
  referredBy_in?: Maybe<Array<Scalars['ID']>>;
  isFoundingMember_eq?: Maybe<Scalars['Boolean']>;
  isFoundingMember_in?: Maybe<Array<Scalars['Boolean']>>;
  isCouncilMember_eq?: Maybe<Scalars['Boolean']>;
  isCouncilMember_in?: Maybe<Array<Scalars['Boolean']>>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  invitees_none?: Maybe<MembershipWhereInput>;
  invitees_some?: Maybe<MembershipWhereInput>;
  invitees_every?: Maybe<MembershipWhereInput>;
  invitedBy?: Maybe<MembershipWhereInput>;
  referredMembers_none?: Maybe<MembershipWhereInput>;
  referredMembers_some?: Maybe<MembershipWhereInput>;
  referredMembers_every?: Maybe<MembershipWhereInput>;
  referredBy?: Maybe<MembershipWhereInput>;
  roles_none?: Maybe<WorkerWhereInput>;
  roles_some?: Maybe<WorkerWhereInput>;
  roles_every?: Maybe<WorkerWhereInput>;
  whitelistedIn_none?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  whitelistedIn_some?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  whitelistedIn_every?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  channels_every?: Maybe<ChannelWhereInput>;
  budgetPayments_none?: Maybe<BudgetPaymentWhereInput>;
  budgetPayments_some?: Maybe<BudgetPaymentWhereInput>;
  budgetPayments_every?: Maybe<BudgetPaymentWhereInput>;
  councilMembers_none?: Maybe<CouncilMemberWhereInput>;
  councilMembers_some?: Maybe<CouncilMemberWhereInput>;
  councilMembers_every?: Maybe<CouncilMemberWhereInput>;
  referendumStageRevealingOptionResults_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumStageRevealingOptionResults_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumStageRevealingOptionResults_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  votesRecieved_none?: Maybe<CastVoteWhereInput>;
  votesRecieved_some?: Maybe<CastVoteWhereInput>;
  votesRecieved_every?: Maybe<CastVoteWhereInput>;
  electedCouncilEvents_none?: Maybe<NewCouncilElectedEventWhereInput>;
  electedCouncilEvents_some?: Maybe<NewCouncilElectedEventWhereInput>;
  electedCouncilEvents_every?: Maybe<NewCouncilElectedEventWhereInput>;
  candidacynoteseteventmember_none?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventmember_some?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventmember_every?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacystakereleaseeventmember_none?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacystakereleaseeventmember_some?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacystakereleaseeventmember_every?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacywithdraweventmember_none?: Maybe<CandidacyWithdrawEventWhereInput>;
  candidacywithdraweventmember_some?: Maybe<CandidacyWithdrawEventWhereInput>;
  candidacywithdraweventmember_every?: Maybe<CandidacyWithdrawEventWhereInput>;
  forumpostauthor_none?: Maybe<ForumPostWhereInput>;
  forumpostauthor_some?: Maybe<ForumPostWhereInput>;
  forumpostauthor_every?: Maybe<ForumPostWhereInput>;
  forumpostreactionmember_none?: Maybe<ForumPostReactionWhereInput>;
  forumpostreactionmember_some?: Maybe<ForumPostReactionWhereInput>;
  forumpostreactionmember_every?: Maybe<ForumPostReactionWhereInput>;
  forumthreadauthor_none?: Maybe<ForumThreadWhereInput>;
  forumthreadauthor_some?: Maybe<ForumThreadWhereInput>;
  forumthreadauthor_every?: Maybe<ForumThreadWhereInput>;
  invitestransferredeventsourceMember_none?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventsourceMember_some?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventsourceMember_every?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_none?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_some?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_every?: Maybe<InvitesTransferredEventWhereInput>;
  memberaccountsupdatedeventmember_none?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberaccountsupdatedeventmember_some?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberaccountsupdatedeventmember_every?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberinvitedeventinvitingMember_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventinvitingMember_some?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventinvitingMember_every?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_some?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_every?: Maybe<MemberInvitedEventWhereInput>;
  memberprofileupdatedeventmember_none?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventmember_some?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventmember_every?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventmember_none?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventmember_some?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventmember_every?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  membershipboughteventnewMember_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventnewMember_some?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventnewMember_every?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_some?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_every?: Maybe<MembershipBoughtEventWhereInput>;
  newcandidateeventmember_none?: Maybe<NewCandidateEventWhereInput>;
  newcandidateeventmember_some?: Maybe<NewCandidateEventWhereInput>;
  newcandidateeventmember_every?: Maybe<NewCandidateEventWhereInput>;
  postdeletedeventactor_none?: Maybe<PostDeletedEventWhereInput>;
  postdeletedeventactor_some?: Maybe<PostDeletedEventWhereInput>;
  postdeletedeventactor_every?: Maybe<PostDeletedEventWhereInput>;
  postreactedeventreactingMember_none?: Maybe<PostReactedEventWhereInput>;
  postreactedeventreactingMember_some?: Maybe<PostReactedEventWhereInput>;
  postreactedeventreactingMember_every?: Maybe<PostReactedEventWhereInput>;
  proposalcreator_none?: Maybe<ProposalWhereInput>;
  proposalcreator_some?: Maybe<ProposalWhereInput>;
  proposalcreator_every?: Maybe<ProposalWhereInput>;
  proposaldiscussionpostauthor_none?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostauthor_some?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostauthor_every?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostdeletedeventactor_none?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventactor_some?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventactor_every?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_none?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_some?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_every?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposalvotedeventvoter_none?: Maybe<ProposalVotedEventWhereInput>;
  proposalvotedeventvoter_some?: Maybe<ProposalVotedEventWhereInput>;
  proposalvotedeventvoter_every?: Maybe<ProposalVotedEventWhereInput>;
  rewardpaymenteventmember_none?: Maybe<RewardPaymentEventWhereInput>;
  rewardpaymenteventmember_some?: Maybe<RewardPaymentEventWhereInput>;
  rewardpaymenteventmember_every?: Maybe<RewardPaymentEventWhereInput>;
  stakingaccountaddedeventmember_none?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountaddedeventmember_some?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountaddedeventmember_every?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountconfirmedeventmember_none?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountconfirmedeventmember_some?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountconfirmedeventmember_every?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountremovedeventmember_none?: Maybe<StakingAccountRemovedEventWhereInput>;
  stakingaccountremovedeventmember_some?: Maybe<StakingAccountRemovedEventWhereInput>;
  stakingaccountremovedeventmember_every?: Maybe<StakingAccountRemovedEventWhereInput>;
  voteonpolleventvotingMember_none?: Maybe<VoteOnPollEventWhereInput>;
  voteonpolleventvotingMember_some?: Maybe<VoteOnPollEventWhereInput>;
  voteonpolleventvotingMember_every?: Maybe<VoteOnPollEventWhereInput>;
  voterevealedeventmember_none?: Maybe<VoteRevealedEventWhereInput>;
  voterevealedeventmember_some?: Maybe<VoteRevealedEventWhereInput>;
  voterevealedeventmember_every?: Maybe<VoteRevealedEventWhereInput>;
  workinggroupapplicationapplicant_none?: Maybe<WorkingGroupApplicationWhereInput>;
  workinggroupapplicationapplicant_some?: Maybe<WorkingGroupApplicationWhereInput>;
  workinggroupapplicationapplicant_every?: Maybe<WorkingGroupApplicationWhereInput>;
  AND?: Maybe<Array<MembershipWhereInput>>;
  OR?: Maybe<Array<MembershipWhereInput>>;
};

export type MembershipWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  handle?: Maybe<Scalars['String']>;
};

export enum Network {
  Babylon = 'BABYLON',
  Alexandria = 'ALEXANDRIA',
  Rome = 'ROME',
  Olympia = 'OLYMPIA'
}

export type NewCandidateEvent = BaseGraphQlObject & {
  __typename: 'NewCandidateEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Candidate's account used to stake currency. */
  stakingAccount: Scalars['String'];
  /** Candidate's account that will be recieving rewards if candidate's elected. */
  rewardAccount: Scalars['String'];
  /** Amount of currency to be staked for the candidacy. */
  balance: Scalars['BigInt'];
};

export type NewCandidateEventConnection = {
  __typename: 'NewCandidateEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<NewCandidateEventEdge>;
  pageInfo: PageInfo;
};

export type NewCandidateEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  stakingAccount: Scalars['String'];
  rewardAccount: Scalars['String'];
  balance: Scalars['BigInt'];
};

export type NewCandidateEventEdge = {
  __typename: 'NewCandidateEventEdge';
  node: NewCandidateEvent;
  cursor: Scalars['String'];
};

export enum NewCandidateEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC'
}

export type NewCandidateEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  stakingAccount?: Maybe<Scalars['String']>;
  rewardAccount?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['BigInt']>;
};

export type NewCandidateEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<NewCandidateEventWhereInput>>;
  OR?: Maybe<Array<NewCandidateEventWhereInput>>;
};

export type NewCandidateEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewCouncilElectedEvent = BaseGraphQlObject & {
  __typename: 'NewCouncilElectedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  electedMembers: Array<Membership>;
};

export type NewCouncilElectedEventConnection = {
  __typename: 'NewCouncilElectedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<NewCouncilElectedEventEdge>;
  pageInfo: PageInfo;
};

export type NewCouncilElectedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type NewCouncilElectedEventEdge = {
  __typename: 'NewCouncilElectedEventEdge';
  node: NewCouncilElectedEvent;
  cursor: Scalars['String'];
};

export enum NewCouncilElectedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type NewCouncilElectedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type NewCouncilElectedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  electedMembers_none?: Maybe<MembershipWhereInput>;
  electedMembers_some?: Maybe<MembershipWhereInput>;
  electedMembers_every?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<NewCouncilElectedEventWhereInput>>;
  OR?: Maybe<Array<NewCouncilElectedEventWhereInput>>;
};

export type NewCouncilElectedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewCouncilNotElectedEvent = BaseGraphQlObject & {
  __typename: 'NewCouncilNotElectedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
};

export type NewCouncilNotElectedEventConnection = {
  __typename: 'NewCouncilNotElectedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<NewCouncilNotElectedEventEdge>;
  pageInfo: PageInfo;
};

export type NewCouncilNotElectedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type NewCouncilNotElectedEventEdge = {
  __typename: 'NewCouncilNotElectedEventEdge';
  node: NewCouncilNotElectedEvent;
  cursor: Scalars['String'];
};

export enum NewCouncilNotElectedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type NewCouncilNotElectedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type NewCouncilNotElectedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<NewCouncilNotElectedEventWhereInput>>;
  OR?: Maybe<Array<NewCouncilNotElectedEventWhereInput>>;
};

export type NewCouncilNotElectedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewMissedRewardLevelReachedEvent = Event & BaseGraphQlObject & {
  __typename: 'NewMissedRewardLevelReachedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** New missed reward amount */
  newMissedRewardAmount: Scalars['BigInt'];
};

export type NewMissedRewardLevelReachedEventConnection = {
  __typename: 'NewMissedRewardLevelReachedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<NewMissedRewardLevelReachedEventEdge>;
  pageInfo: PageInfo;
};

export type NewMissedRewardLevelReachedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  newMissedRewardAmount: Scalars['BigInt'];
};

export type NewMissedRewardLevelReachedEventEdge = {
  __typename: 'NewMissedRewardLevelReachedEventEdge';
  node: NewMissedRewardLevelReachedEvent;
  cursor: Scalars['String'];
};

export enum NewMissedRewardLevelReachedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  NewMissedRewardAmountAsc = 'newMissedRewardAmount_ASC',
  NewMissedRewardAmountDesc = 'newMissedRewardAmount_DESC'
}

export type NewMissedRewardLevelReachedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  newMissedRewardAmount?: Maybe<Scalars['BigInt']>;
};

export type NewMissedRewardLevelReachedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  newMissedRewardAmount_eq?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_gt?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_gte?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_lt?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_lte?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<NewMissedRewardLevelReachedEventWhereInput>>;
  OR?: Maybe<Array<NewMissedRewardLevelReachedEventWhereInput>>;
};

export type NewMissedRewardLevelReachedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NotEnoughCandidatesEvent = BaseGraphQlObject & {
  __typename: 'NotEnoughCandidatesEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
};

export type NotEnoughCandidatesEventConnection = {
  __typename: 'NotEnoughCandidatesEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<NotEnoughCandidatesEventEdge>;
  pageInfo: PageInfo;
};

export type NotEnoughCandidatesEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type NotEnoughCandidatesEventEdge = {
  __typename: 'NotEnoughCandidatesEventEdge';
  node: NotEnoughCandidatesEvent;
  cursor: Scalars['String'];
};

export enum NotEnoughCandidatesEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type NotEnoughCandidatesEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type NotEnoughCandidatesEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<NotEnoughCandidatesEventWhereInput>>;
  OR?: Maybe<Array<NotEnoughCandidatesEventWhereInput>>;
};

export type NotEnoughCandidatesEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningAddedEvent = Event & BaseGraphQlObject & {
  __typename: 'OpeningAddedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
};

export type OpeningAddedEventConnection = {
  __typename: 'OpeningAddedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<OpeningAddedEventEdge>;
  pageInfo: PageInfo;
};

export type OpeningAddedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  opening: Scalars['ID'];
};

export type OpeningAddedEventEdge = {
  __typename: 'OpeningAddedEventEdge';
  node: OpeningAddedEvent;
  cursor: Scalars['String'];
};

export enum OpeningAddedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC'
}

export type OpeningAddedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningAddedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  AND?: Maybe<Array<OpeningAddedEventWhereInput>>;
  OR?: Maybe<Array<OpeningAddedEventWhereInput>>;
};

export type OpeningAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningCanceledEvent = Event & BaseGraphQlObject & {
  __typename: 'OpeningCanceledEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
};

export type OpeningCanceledEventConnection = {
  __typename: 'OpeningCanceledEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<OpeningCanceledEventEdge>;
  pageInfo: PageInfo;
};

export type OpeningCanceledEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  opening: Scalars['ID'];
};

export type OpeningCanceledEventEdge = {
  __typename: 'OpeningCanceledEventEdge';
  node: OpeningCanceledEvent;
  cursor: Scalars['String'];
};

export enum OpeningCanceledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC'
}

export type OpeningCanceledEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningCanceledEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  AND?: Maybe<Array<OpeningCanceledEventWhereInput>>;
  OR?: Maybe<Array<OpeningCanceledEventWhereInput>>;
};

export type OpeningCanceledEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningFilledEvent = Event & BaseGraphQlObject & {
  __typename: 'OpeningFilledEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  workersHired: Array<Worker>;
};

export type OpeningFilledEventConnection = {
  __typename: 'OpeningFilledEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<OpeningFilledEventEdge>;
  pageInfo: PageInfo;
};

export type OpeningFilledEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  opening: Scalars['ID'];
};

export type OpeningFilledEventEdge = {
  __typename: 'OpeningFilledEventEdge';
  node: OpeningFilledEvent;
  cursor: Scalars['String'];
};

export enum OpeningFilledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC'
}

export type OpeningFilledEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningFilledEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  workersHired_none?: Maybe<WorkerWhereInput>;
  workersHired_some?: Maybe<WorkerWhereInput>;
  workersHired_every?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<OpeningFilledEventWhereInput>>;
  OR?: Maybe<Array<OpeningFilledEventWhereInput>>;
};

export type OpeningFilledEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningStatusCancelled = {
  __typename: 'OpeningStatusCancelled';
  /** Related event emitted on opening cancellation */
  openingCanceledEvent?: Maybe<OpeningCanceledEvent>;
};

export type OpeningStatusFilled = {
  __typename: 'OpeningStatusFilled';
  /** Related event emitted after filling the opening */
  openingFilledEvent?: Maybe<OpeningFilledEvent>;
};

export type OpeningStatusOpen = {
  __typename: 'OpeningStatusOpen';
  phantom?: Maybe<Scalars['Int']>;
};

export type OpeningStatusOpenCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type OpeningStatusOpenUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type OpeningStatusOpenWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<OpeningStatusOpenWhereInput>>;
  OR?: Maybe<Array<OpeningStatusOpenWhereInput>>;
};

export type OpeningStatusOpenWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PostAddedEvent = BaseGraphQlObject & {
  __typename: 'PostAddedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  post: ForumPost;
  postId: Scalars['String'];
  /** Whether the added post is editable */
  isEditable?: Maybe<Scalars['Boolean']>;
  /** Post's original text */
  text: Scalars['String'];
};

export type PostAddedEventConnection = {
  __typename: 'PostAddedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostAddedEventEdge>;
  pageInfo: PageInfo;
};

export type PostAddedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  isEditable?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
};

export type PostAddedEventEdge = {
  __typename: 'PostAddedEventEdge';
  node: PostAddedEvent;
  cursor: Scalars['String'];
};

export enum PostAddedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  IsEditableAsc = 'isEditable_ASC',
  IsEditableDesc = 'isEditable_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC'
}

export type PostAddedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  isEditable?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type PostAddedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  isEditable_eq?: Maybe<Scalars['Boolean']>;
  isEditable_in?: Maybe<Array<Scalars['Boolean']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  post?: Maybe<ForumPostWhereInput>;
  AND?: Maybe<Array<PostAddedEventWhereInput>>;
  OR?: Maybe<Array<PostAddedEventWhereInput>>;
};

export type PostAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostDeletedEvent = BaseGraphQlObject & {
  __typename: 'PostDeletedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  posts: Array<ForumPost>;
  actor: Membership;
  actorId: Scalars['String'];
  /** Posts deletion rationale */
  rationale: Scalars['String'];
};

export type PostDeletedEventConnection = {
  __typename: 'PostDeletedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostDeletedEventEdge>;
  pageInfo: PageInfo;
};

export type PostDeletedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  actor: Scalars['ID'];
  rationale: Scalars['String'];
};

export type PostDeletedEventEdge = {
  __typename: 'PostDeletedEventEdge';
  node: PostDeletedEvent;
  cursor: Scalars['String'];
};

export enum PostDeletedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type PostDeletedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  actor?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
};

export type PostDeletedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  posts_none?: Maybe<ForumPostWhereInput>;
  posts_some?: Maybe<ForumPostWhereInput>;
  posts_every?: Maybe<ForumPostWhereInput>;
  actor?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<PostDeletedEventWhereInput>>;
  OR?: Maybe<Array<PostDeletedEventWhereInput>>;
};

export type PostDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostModeratedEvent = BaseGraphQlObject & {
  __typename: 'PostModeratedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  post: ForumPost;
  postId: Scalars['String'];
  /** The rationale behind the moderation */
  rationale: Scalars['String'];
  actor: Worker;
  actorId: Scalars['String'];
};

export type PostModeratedEventConnection = {
  __typename: 'PostModeratedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostModeratedEventEdge>;
  pageInfo: PageInfo;
};

export type PostModeratedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  rationale: Scalars['String'];
  actor: Scalars['ID'];
};

export type PostModeratedEventEdge = {
  __typename: 'PostModeratedEventEdge';
  node: PostModeratedEvent;
  cursor: Scalars['String'];
};

export enum PostModeratedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type PostModeratedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
  actor?: Maybe<Scalars['ID']>;
};

export type PostModeratedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  post?: Maybe<ForumPostWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<PostModeratedEventWhereInput>>;
  OR?: Maybe<Array<PostModeratedEventWhereInput>>;
};

export type PostModeratedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostOrigin = PostOriginThreadInitial | PostOriginThreadReply;

export type PostOriginThreadInitial = {
  __typename: 'PostOriginThreadInitial';
  /** Thread creation event */
  threadCreatedEvent?: Maybe<ThreadCreatedEvent>;
};

export type PostOriginThreadReply = {
  __typename: 'PostOriginThreadReply';
  /** Related PostAdded event */
  postAddedEvent?: Maybe<PostAddedEvent>;
};

export type PostReactedEvent = BaseGraphQlObject & {
  __typename: 'PostReactedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  post: ForumPost;
  postId: Scalars['String'];
  /**
   * The reaction result - new valid reaction, cancelation of previous reaction or
   * invalid reaction (which also cancels the previous one)
   */
  reactionResult: PostReactionResult;
  reactingMember: Membership;
  reactingMemberId: Scalars['String'];
};

export type PostReactedEventConnection = {
  __typename: 'PostReactedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostReactedEventEdge>;
  pageInfo: PageInfo;
};

export type PostReactedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  reactionResult: Scalars['JSONObject'];
  reactingMember: Scalars['ID'];
};

export type PostReactedEventEdge = {
  __typename: 'PostReactedEventEdge';
  node: PostReactedEvent;
  cursor: Scalars['String'];
};

export enum PostReactedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  ReactingMemberAsc = 'reactingMember_ASC',
  ReactingMemberDesc = 'reactingMember_DESC'
}

export type PostReactedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  reactionResult?: Maybe<Scalars['JSONObject']>;
  reactingMember?: Maybe<Scalars['ID']>;
};

export type PostReactedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  reactionResult_json?: Maybe<Scalars['JSONObject']>;
  reactingMember_eq?: Maybe<Scalars['ID']>;
  reactingMember_in?: Maybe<Array<Scalars['ID']>>;
  post?: Maybe<ForumPostWhereInput>;
  reactingMember?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<PostReactedEventWhereInput>>;
  OR?: Maybe<Array<PostReactedEventWhereInput>>;
};

export type PostReactedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum PostReaction {
  Like = 'LIKE'
}

export type PostReactionResult = PostReactionResultCancel | PostReactionResultValid | PostReactionResultInvalid;

export type PostReactionResultCancel = {
  __typename: 'PostReactionResultCancel';
  phantom?: Maybe<Scalars['Int']>;
};

export type PostReactionResultCancelCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type PostReactionResultCancelUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type PostReactionResultCancelWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<PostReactionResultCancelWhereInput>>;
  OR?: Maybe<Array<PostReactionResultCancelWhereInput>>;
};

export type PostReactionResultCancelWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostReactionResultInvalid = {
  __typename: 'PostReactionResultInvalid';
  reactionId: Scalars['Int'];
};

export type PostReactionResultInvalidCreateInput = {
  reactionId: Scalars['Float'];
};

export type PostReactionResultInvalidUpdateInput = {
  reactionId?: Maybe<Scalars['Float']>;
};

export type PostReactionResultInvalidWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  reactionId_eq?: Maybe<Scalars['Int']>;
  reactionId_gt?: Maybe<Scalars['Int']>;
  reactionId_gte?: Maybe<Scalars['Int']>;
  reactionId_lt?: Maybe<Scalars['Int']>;
  reactionId_lte?: Maybe<Scalars['Int']>;
  reactionId_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<PostReactionResultInvalidWhereInput>>;
  OR?: Maybe<Array<PostReactionResultInvalidWhereInput>>;
};

export type PostReactionResultInvalidWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostReactionResultValid = {
  __typename: 'PostReactionResultValid';
  reaction: PostReaction;
  reactionId: Scalars['Int'];
};

export type PostReactionResultValidCreateInput = {
  reaction: PostReaction;
  reactionId: Scalars['Float'];
};

export type PostReactionResultValidUpdateInput = {
  reaction?: Maybe<PostReaction>;
  reactionId?: Maybe<Scalars['Float']>;
};

export type PostReactionResultValidWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  reaction_eq?: Maybe<PostReaction>;
  reaction_in?: Maybe<Array<PostReaction>>;
  reactionId_eq?: Maybe<Scalars['Int']>;
  reactionId_gt?: Maybe<Scalars['Int']>;
  reactionId_gte?: Maybe<Scalars['Int']>;
  reactionId_lt?: Maybe<Scalars['Int']>;
  reactionId_lte?: Maybe<Scalars['Int']>;
  reactionId_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<PostReactionResultValidWhereInput>>;
  OR?: Maybe<Array<PostReactionResultValidWhereInput>>;
};

export type PostReactionResultValidWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostStatus = PostStatusActive | PostStatusLocked | PostStatusModerated | PostStatusRemoved;

export type PostStatusActive = {
  __typename: 'PostStatusActive';
  phantom?: Maybe<Scalars['Int']>;
};

export type PostStatusActiveCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type PostStatusActiveUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type PostStatusActiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<PostStatusActiveWhereInput>>;
  OR?: Maybe<Array<PostStatusActiveWhereInput>>;
};

export type PostStatusActiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostStatusLocked = {
  __typename: 'PostStatusLocked';
  /** Post deleted event in case the post became locked through runtime removal */
  postDeletedEvent?: Maybe<PostDeletedEvent>;
};

export type PostStatusModerated = {
  __typename: 'PostStatusModerated';
  /** Event the post was moderated in */
  postModeratedEvent?: Maybe<PostModeratedEvent>;
};

export type PostStatusRemoved = {
  __typename: 'PostStatusRemoved';
  /** Event the post was removed in */
  postDeletedEvent?: Maybe<PostDeletedEvent>;
};

export type PostTextUpdatedEvent = BaseGraphQlObject & {
  __typename: 'PostTextUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  post: ForumPost;
  postId: Scalars['String'];
  /** New post text */
  newText: Scalars['String'];
};

export type PostTextUpdatedEventConnection = {
  __typename: 'PostTextUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<PostTextUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type PostTextUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  newText: Scalars['String'];
};

export type PostTextUpdatedEventEdge = {
  __typename: 'PostTextUpdatedEventEdge';
  node: PostTextUpdatedEvent;
  cursor: Scalars['String'];
};

export enum PostTextUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  NewTextAsc = 'newText_ASC',
  NewTextDesc = 'newText_DESC'
}

export type PostTextUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  newText?: Maybe<Scalars['String']>;
};

export type PostTextUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  newText_eq?: Maybe<Scalars['String']>;
  newText_contains?: Maybe<Scalars['String']>;
  newText_startsWith?: Maybe<Scalars['String']>;
  newText_endsWith?: Maybe<Scalars['String']>;
  newText_in?: Maybe<Array<Scalars['String']>>;
  post?: Maybe<ForumPostWhereInput>;
  AND?: Maybe<Array<PostTextUpdatedEventWhereInput>>;
  OR?: Maybe<Array<PostTextUpdatedEventWhereInput>>;
};

export type PostTextUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostsByTextFtsOutput = {
  __typename: 'PostsByTextFTSOutput';
  item: PostsByTextSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type PostsByTextSearchResult = ForumPost;

export type ProcessorState = {
  __typename: 'ProcessorState';
  lastCompleteBlock: Scalars['Float'];
  lastProcessedEvent: Scalars['String'];
  indexerHead: Scalars['Float'];
  chainHead: Scalars['Float'];
};

export type Proposal = BaseGraphQlObject & {
  __typename: 'Proposal';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Proposal title */
  title: Scalars['String'];
  /** Proposal description */
  description: Scalars['String'];
  /** Proposal details depending on proposal type */
  details: ProposalDetails;
  /** Staking account with proposal stake (in case a stake is required) */
  stakingAccount?: Maybe<Scalars['String']>;
  creator: Membership;
  creatorId: Scalars['String'];
  createdInEvent: ProposalCreatedEvent;
  /** Exact block number the proposal is supposed to be executed at (if specified) */
  exactExecutionBlock?: Maybe<Scalars['Int']>;
  discussionThread: ProposalDiscussionThread;
  /** How many prior councils have already approved the proposal (starts with 0) */
  councilApprovals: Scalars['Int'];
  proposalStatusUpdates: Array<ProposalStatusUpdatedEvent>;
  votes: Array<ProposalVotedEvent>;
  /** Current proposal status */
  status: ProposalStatus;
  /** If true then the proposal status is final and will not change form this point */
  isFinalized?: Maybe<Scalars['Boolean']>;
  /** Number of the block the current status was set at */
  statusSetAtBlock: Scalars['Int'];
  /** Time the current status was set at (based on block timestamp) */
  statusSetAtTime: Scalars['DateTime'];
  proposalcancelledeventproposal?: Maybe<Array<ProposalCancelledEvent>>;
  proposaldecisionmadeeventproposal?: Maybe<Array<ProposalDecisionMadeEvent>>;
  proposalexecutedeventproposal?: Maybe<Array<ProposalExecutedEvent>>;
};

export type ProposalCancelledEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalCancelledEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
};

export type ProposalCancelledEventConnection = {
  __typename: 'ProposalCancelledEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalCancelledEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalCancelledEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  proposal: Scalars['ID'];
};

export type ProposalCancelledEventEdge = {
  __typename: 'ProposalCancelledEventEdge';
  node: ProposalCancelledEvent;
  cursor: Scalars['String'];
};

export enum ProposalCancelledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalCancelledEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalCancelledEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalCancelledEventWhereInput>>;
  OR?: Maybe<Array<ProposalCancelledEventWhereInput>>;
};

export type ProposalCancelledEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalConnection = {
  __typename: 'ProposalConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalEdge>;
  pageInfo: PageInfo;
};

export type ProposalCreateInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  details: Scalars['JSONObject'];
  stakingAccount?: Maybe<Scalars['String']>;
  creator: Scalars['ID'];
  exactExecutionBlock?: Maybe<Scalars['Float']>;
  councilApprovals: Scalars['Float'];
  status: Scalars['JSONObject'];
  isFinalized?: Maybe<Scalars['Boolean']>;
  statusSetAtBlock: Scalars['Float'];
  statusSetAtTime: Scalars['DateTime'];
};

export type ProposalCreatedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalCreatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
};

export type ProposalCreatedEventConnection = {
  __typename: 'ProposalCreatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalCreatedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalCreatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  proposal: Scalars['ID'];
};

export type ProposalCreatedEventEdge = {
  __typename: 'ProposalCreatedEventEdge';
  node: ProposalCreatedEvent;
  cursor: Scalars['String'];
};

export enum ProposalCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalCreatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalCreatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalCreatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalCreatedEventWhereInput>>;
};

export type ProposalCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDecisionMadeEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalDecisionMadeEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** The voting decision status */
  decisionStatus: ProposalDecisionStatus;
};

export type ProposalDecisionMadeEventConnection = {
  __typename: 'ProposalDecisionMadeEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDecisionMadeEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalDecisionMadeEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  proposal: Scalars['ID'];
  decisionStatus: Scalars['JSONObject'];
};

export type ProposalDecisionMadeEventEdge = {
  __typename: 'ProposalDecisionMadeEventEdge';
  node: ProposalDecisionMadeEvent;
  cursor: Scalars['String'];
};

export enum ProposalDecisionMadeEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalDecisionMadeEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  proposal?: Maybe<Scalars['ID']>;
  decisionStatus?: Maybe<Scalars['JSONObject']>;
};

export type ProposalDecisionMadeEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  decisionStatus_json?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalDecisionMadeEventWhereInput>>;
  OR?: Maybe<Array<ProposalDecisionMadeEventWhereInput>>;
};

export type ProposalDecisionMadeEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDecisionStatus = ProposalStatusDormant | ProposalStatusGracing | ProposalStatusVetoed | ProposalStatusSlashed | ProposalStatusRejected | ProposalStatusExpired | ProposalStatusCancelled | ProposalStatusCanceledByRuntime;

export type ProposalDetails = SignalProposalDetails | RuntimeUpgradeProposalDetails | FundingRequestProposalDetails | SetMaxValidatorCountProposalDetails | CreateWorkingGroupLeadOpeningProposalDetails | FillWorkingGroupLeadOpeningProposalDetails | UpdateWorkingGroupBudgetProposalDetails | DecreaseWorkingGroupLeadStakeProposalDetails | SlashWorkingGroupLeadProposalDetails | SetWorkingGroupLeadRewardProposalDetails | TerminateWorkingGroupLeadProposalDetails | AmendConstitutionProposalDetails | CancelWorkingGroupLeadOpeningProposalDetails | SetMembershipPriceProposalDetails | SetCouncilBudgetIncrementProposalDetails | SetCouncilorRewardProposalDetails | SetInitialInvitationBalanceProposalDetails | SetInitialInvitationCountProposalDetails | SetMembershipLeadInvitationQuotaProposalDetails | SetReferralCutProposalDetails | CreateBlogPostProposalDetails | EditBlogPostProposalDetails | LockBlogPostProposalDetails | UnlockBlogPostProposalDetails | VetoProposalDetails;

export type ProposalDiscussionPost = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionPost';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  discussionThread: ProposalDiscussionThread;
  discussionThreadId: Scalars['String'];
  author: Membership;
  authorId: Scalars['String'];
  /** Current post status */
  status: ProposalDiscussionPostStatus;
  /** True if the post is either Active or Locked */
  isVisible: Scalars['Boolean'];
  /** Post's md-formatted text */
  text: Scalars['String'];
  repliesTo?: Maybe<ProposalDiscussionPost>;
  repliesToId?: Maybe<Scalars['String']>;
  updates: Array<ProposalDiscussionPostUpdatedEvent>;
  createdInEvent: ProposalDiscussionPostCreatedEvent;
  proposaldiscussionpostrepliesTo?: Maybe<Array<ProposalDiscussionPost>>;
  proposaldiscussionpostdeletedeventpost?: Maybe<Array<ProposalDiscussionPostDeletedEvent>>;
};

export type ProposalDiscussionPostConnection = {
  __typename: 'ProposalDiscussionPostConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionPostEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionPostCreateInput = {
  discussionThread: Scalars['ID'];
  author: Scalars['ID'];
  status: Scalars['JSONObject'];
  isVisible: Scalars['Boolean'];
  text: Scalars['String'];
  repliesTo?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionPostCreatedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalDiscussionPostCreatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  /** Initial post text */
  text: Scalars['String'];
};

export type ProposalDiscussionPostCreatedEventConnection = {
  __typename: 'ProposalDiscussionPostCreatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionPostCreatedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionPostCreatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  text: Scalars['String'];
};

export type ProposalDiscussionPostCreatedEventEdge = {
  __typename: 'ProposalDiscussionPostCreatedEventEdge';
  node: ProposalDiscussionPostCreatedEvent;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionPostCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC'
}

export type ProposalDiscussionPostCreatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ProposalDiscussionPostCreatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionPostCreatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostCreatedEventWhereInput>>;
};

export type ProposalDiscussionPostCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostDeletedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalDiscussionPostDeletedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  actor: Membership;
  actorId: Scalars['String'];
};

export type ProposalDiscussionPostDeletedEventConnection = {
  __typename: 'ProposalDiscussionPostDeletedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionPostDeletedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionPostDeletedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  actor: Scalars['ID'];
};

export type ProposalDiscussionPostDeletedEventEdge = {
  __typename: 'ProposalDiscussionPostDeletedEventEdge';
  node: ProposalDiscussionPostDeletedEvent;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionPostDeletedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type ProposalDiscussionPostDeletedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  actor?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionPostDeletedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  actor?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionPostDeletedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostDeletedEventWhereInput>>;
};

export type ProposalDiscussionPostDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostEdge = {
  __typename: 'ProposalDiscussionPostEdge';
  node: ProposalDiscussionPost;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionPostOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DiscussionThreadAsc = 'discussionThread_ASC',
  DiscussionThreadDesc = 'discussionThread_DESC',
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  RepliesToAsc = 'repliesTo_ASC',
  RepliesToDesc = 'repliesTo_DESC'
}

export type ProposalDiscussionPostStatus = ProposalDiscussionPostStatusActive | ProposalDiscussionPostStatusLocked | ProposalDiscussionPostStatusRemoved;

export type ProposalDiscussionPostStatusActive = {
  __typename: 'ProposalDiscussionPostStatusActive';
  phantom?: Maybe<Scalars['Int']>;
};

export type ProposalDiscussionPostStatusActiveCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionPostStatusActiveUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionPostStatusActiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ProposalDiscussionPostStatusActiveWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostStatusActiveWhereInput>>;
};

export type ProposalDiscussionPostStatusActiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostStatusLocked = {
  __typename: 'ProposalDiscussionPostStatusLocked';
  /** ProposalDiscussionPostDeletedEvent in case the post became locked through runtime removal */
  deletedInEvent?: Maybe<ProposalDiscussionPostDeletedEvent>;
};

export type ProposalDiscussionPostStatusRemoved = {
  __typename: 'ProposalDiscussionPostStatusRemoved';
  /** The event the post was removed in */
  deletedInEvent?: Maybe<ProposalDiscussionPostDeletedEvent>;
};

export type ProposalDiscussionPostUpdateInput = {
  discussionThread?: Maybe<Scalars['ID']>;
  author?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['JSONObject']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  repliesTo?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionPostUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalDiscussionPostUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  /** New post text */
  text: Scalars['String'];
};

export type ProposalDiscussionPostUpdatedEventConnection = {
  __typename: 'ProposalDiscussionPostUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionPostUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionPostUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  post: Scalars['ID'];
  text: Scalars['String'];
};

export type ProposalDiscussionPostUpdatedEventEdge = {
  __typename: 'ProposalDiscussionPostUpdatedEventEdge';
  node: ProposalDiscussionPostUpdatedEvent;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionPostUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC'
}

export type ProposalDiscussionPostUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  post?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ProposalDiscussionPostUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionPostUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostUpdatedEventWhereInput>>;
};

export type ProposalDiscussionPostUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  discussionThread_eq?: Maybe<Scalars['ID']>;
  discussionThread_in?: Maybe<Array<Scalars['ID']>>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  repliesTo_eq?: Maybe<Scalars['ID']>;
  repliesTo_in?: Maybe<Array<Scalars['ID']>>;
  discussionThread?: Maybe<ProposalDiscussionThreadWhereInput>;
  author?: Maybe<MembershipWhereInput>;
  repliesTo?: Maybe<ProposalDiscussionPostWhereInput>;
  updates_none?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  updates_some?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  updates_every?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  createdInEvent?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
  proposaldiscussionpostrepliesTo_none?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostrepliesTo_some?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostrepliesTo_every?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostdeletedeventpost_none?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventpost_some?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventpost_every?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionPostWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostWhereInput>>;
};

export type ProposalDiscussionPostWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionThread = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionThread';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  posts: Array<ProposalDiscussionPost>;
  /** Current thread mode */
  mode: ProposalDiscussionThreadMode;
  modeChanges: Array<ProposalDiscussionThreadModeChangedEvent>;
};

export type ProposalDiscussionThreadConnection = {
  __typename: 'ProposalDiscussionThreadConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionThreadEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionThreadCreateInput = {
  proposal: Scalars['ID'];
  mode: Scalars['JSONObject'];
};

export type ProposalDiscussionThreadEdge = {
  __typename: 'ProposalDiscussionThreadEdge';
  node: ProposalDiscussionThread;
  cursor: Scalars['String'];
};

export type ProposalDiscussionThreadMode = ProposalDiscussionThreadModeOpen | ProposalDiscussionThreadModeClosed;

export type ProposalDiscussionThreadModeChangedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalDiscussionThreadModeChangedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  thread: ProposalDiscussionThread;
  threadId: Scalars['String'];
  /** The new thread mode */
  newMode: ProposalDiscussionThreadMode;
  actor: Membership;
  actorId: Scalars['String'];
};

export type ProposalDiscussionThreadModeChangedEventConnection = {
  __typename: 'ProposalDiscussionThreadModeChangedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionThreadModeChangedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionThreadModeChangedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
  newMode: Scalars['JSONObject'];
  actor: Scalars['ID'];
};

export type ProposalDiscussionThreadModeChangedEventEdge = {
  __typename: 'ProposalDiscussionThreadModeChangedEventEdge';
  node: ProposalDiscussionThreadModeChangedEvent;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionThreadModeChangedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type ProposalDiscussionThreadModeChangedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
  newMode?: Maybe<Scalars['JSONObject']>;
  actor?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionThreadModeChangedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  newMode_json?: Maybe<Scalars['JSONObject']>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  thread?: Maybe<ProposalDiscussionThreadWhereInput>;
  actor?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionThreadModeChangedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadModeChangedEventWhereInput>>;
};

export type ProposalDiscussionThreadModeChangedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionThreadModeClosed = {
  __typename: 'ProposalDiscussionThreadModeClosed';
  /** Whitelist containing members allowed to participate in the discussion */
  whitelist?: Maybe<ProposalDiscussionWhitelist>;
};

export type ProposalDiscussionThreadModeOpen = {
  __typename: 'ProposalDiscussionThreadModeOpen';
  phantom?: Maybe<Scalars['Int']>;
};

export type ProposalDiscussionThreadModeOpenCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionThreadModeOpenUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionThreadModeOpenWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ProposalDiscussionThreadModeOpenWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadModeOpenWhereInput>>;
};

export type ProposalDiscussionThreadModeOpenWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum ProposalDiscussionThreadOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalDiscussionThreadUpdateInput = {
  proposal?: Maybe<Scalars['ID']>;
  mode?: Maybe<Scalars['JSONObject']>;
};

export type ProposalDiscussionThreadWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  mode_json?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<ProposalWhereInput>;
  posts_none?: Maybe<ProposalDiscussionPostWhereInput>;
  posts_some?: Maybe<ProposalDiscussionPostWhereInput>;
  posts_every?: Maybe<ProposalDiscussionPostWhereInput>;
  modeChanges_none?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  modeChanges_some?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  modeChanges_every?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionThreadWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadWhereInput>>;
};

export type ProposalDiscussionThreadWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionWhitelist = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionWhitelist';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  phantom?: Maybe<Scalars['Int']>;
  members: Array<Membership>;
};

export type ProposalDiscussionWhitelistConnection = {
  __typename: 'ProposalDiscussionWhitelistConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalDiscussionWhitelistEdge>;
  pageInfo: PageInfo;
};

export type ProposalDiscussionWhitelistCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionWhitelistEdge = {
  __typename: 'ProposalDiscussionWhitelistEdge';
  node: ProposalDiscussionWhitelist;
  cursor: Scalars['String'];
};

export enum ProposalDiscussionWhitelistOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  PhantomAsc = 'phantom_ASC',
  PhantomDesc = 'phantom_DESC'
}

export type ProposalDiscussionWhitelistUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionWhitelistWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  members_none?: Maybe<MembershipWhereInput>;
  members_some?: Maybe<MembershipWhereInput>;
  members_every?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<ProposalDiscussionWhitelistWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionWhitelistWhereInput>>;
};

export type ProposalDiscussionWhitelistWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalEdge = {
  __typename: 'ProposalEdge';
  node: Proposal;
  cursor: Scalars['String'];
};

export type ProposalExecutedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalExecutedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** The execution status */
  executionStatus: ProposalExecutionStatus;
};

export type ProposalExecutedEventConnection = {
  __typename: 'ProposalExecutedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalExecutedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalExecutedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  proposal: Scalars['ID'];
  executionStatus: Scalars['JSONObject'];
};

export type ProposalExecutedEventEdge = {
  __typename: 'ProposalExecutedEventEdge';
  node: ProposalExecutedEvent;
  cursor: Scalars['String'];
};

export enum ProposalExecutedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalExecutedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  proposal?: Maybe<Scalars['ID']>;
  executionStatus?: Maybe<Scalars['JSONObject']>;
};

export type ProposalExecutedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  executionStatus_json?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalExecutedEventWhereInput>>;
  OR?: Maybe<Array<ProposalExecutedEventWhereInput>>;
};

export type ProposalExecutedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalExecutionStatus = ProposalStatusExecuted | ProposalStatusExecutionFailed;

export type ProposalIntermediateStatus = ProposalStatusDeciding | ProposalStatusGracing | ProposalStatusDormant;

export enum ProposalOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  CreatorAsc = 'creator_ASC',
  CreatorDesc = 'creator_DESC',
  ExactExecutionBlockAsc = 'exactExecutionBlock_ASC',
  ExactExecutionBlockDesc = 'exactExecutionBlock_DESC',
  CouncilApprovalsAsc = 'councilApprovals_ASC',
  CouncilApprovalsDesc = 'councilApprovals_DESC',
  IsFinalizedAsc = 'isFinalized_ASC',
  IsFinalizedDesc = 'isFinalized_DESC',
  StatusSetAtBlockAsc = 'statusSetAtBlock_ASC',
  StatusSetAtBlockDesc = 'statusSetAtBlock_DESC',
  StatusSetAtTimeAsc = 'statusSetAtTime_ASC',
  StatusSetAtTimeDesc = 'statusSetAtTime_DESC'
}

export type ProposalStatus = ProposalStatusDeciding | ProposalStatusGracing | ProposalStatusDormant | ProposalStatusVetoed | ProposalStatusExecuted | ProposalStatusExecutionFailed | ProposalStatusSlashed | ProposalStatusRejected | ProposalStatusExpired | ProposalStatusCancelled | ProposalStatusCanceledByRuntime;

export type ProposalStatusCanceledByRuntime = {
  __typename: 'ProposalStatusCanceledByRuntime';
  /** Related ProposalDecisionMadeEvent */
  proposalDecisionMadeEvent?: Maybe<ProposalDecisionMadeEvent>;
};

export type ProposalStatusCancelled = {
  __typename: 'ProposalStatusCancelled';
  /** The related ProposalCancelledEvent */
  cancelledInEvent?: Maybe<ProposalCancelledEvent>;
};

export type ProposalStatusDeciding = {
  __typename: 'ProposalStatusDeciding';
  /** Related ProposalStatusUpdatedEvent */
  proposalStatusUpdatedEvent?: Maybe<ProposalStatusUpdatedEvent>;
};

export type ProposalStatusDormant = {
  __typename: 'ProposalStatusDormant';
  /** Related ProposalStatusUpdatedEvent */
  proposalStatusUpdatedEvent?: Maybe<ProposalStatusUpdatedEvent>;
};

export type ProposalStatusExecuted = {
  __typename: 'ProposalStatusExecuted';
  /** Related ProposalExecutedEvent */
  proposalExecutedEvent?: Maybe<ProposalExecutedEvent>;
};

export type ProposalStatusExecutionFailed = {
  __typename: 'ProposalStatusExecutionFailed';
  /** Related ProposalExecutedEvent */
  proposalExecutedEvent?: Maybe<ProposalExecutedEvent>;
  /** The runtime execution error message */
  errorMessage: Scalars['String'];
};

export type ProposalStatusExecutionFailedCreateInput = {
  errorMessage: Scalars['String'];
};

export type ProposalStatusExecutionFailedUpdateInput = {
  errorMessage?: Maybe<Scalars['String']>;
};

export type ProposalStatusExecutionFailedWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  errorMessage_eq?: Maybe<Scalars['String']>;
  errorMessage_contains?: Maybe<Scalars['String']>;
  errorMessage_startsWith?: Maybe<Scalars['String']>;
  errorMessage_endsWith?: Maybe<Scalars['String']>;
  errorMessage_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<ProposalStatusExecutionFailedWhereInput>>;
  OR?: Maybe<Array<ProposalStatusExecutionFailedWhereInput>>;
};

export type ProposalStatusExecutionFailedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalStatusExpired = {
  __typename: 'ProposalStatusExpired';
  /** Related ProposalDecisionMadeEvent */
  proposalDecisionMadeEvent?: Maybe<ProposalDecisionMadeEvent>;
};

export type ProposalStatusGracing = {
  __typename: 'ProposalStatusGracing';
  /** Related ProposalStatusUpdatedEvent */
  proposalStatusUpdatedEvent?: Maybe<ProposalStatusUpdatedEvent>;
};

export type ProposalStatusRejected = {
  __typename: 'ProposalStatusRejected';
  /** Related ProposalDecisionMadeEvent */
  proposalDecisionMadeEvent?: Maybe<ProposalDecisionMadeEvent>;
};

export type ProposalStatusSlashed = {
  __typename: 'ProposalStatusSlashed';
  /** Related ProposalDecisionMadeEvent */
  proposalDecisionMadeEvent?: Maybe<ProposalDecisionMadeEvent>;
};

export type ProposalStatusUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalStatusUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** The new proposal intermediate status (Deciding/Gracing/Dormant) */
  newStatus: ProposalIntermediateStatus;
};

export type ProposalStatusUpdatedEventConnection = {
  __typename: 'ProposalStatusUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalStatusUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  proposal: Scalars['ID'];
  newStatus: Scalars['JSONObject'];
};

export type ProposalStatusUpdatedEventEdge = {
  __typename: 'ProposalStatusUpdatedEventEdge';
  node: ProposalStatusUpdatedEvent;
  cursor: Scalars['String'];
};

export enum ProposalStatusUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC'
}

export type ProposalStatusUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  proposal?: Maybe<Scalars['ID']>;
  newStatus?: Maybe<Scalars['JSONObject']>;
};

export type ProposalStatusUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  newStatus_json?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalStatusUpdatedEventWhereInput>>;
};

export type ProposalStatusUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalStatusVetoed = {
  __typename: 'ProposalStatusVetoed';
  /** Related ProposalDecisionMadeEvent event */
  proposalDecisionMadeEvent?: Maybe<ProposalDecisionMadeEvent>;
};

export type ProposalUpdateInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['JSONObject']>;
  stakingAccount?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['ID']>;
  exactExecutionBlock?: Maybe<Scalars['Float']>;
  councilApprovals?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['JSONObject']>;
  isFinalized?: Maybe<Scalars['Boolean']>;
  statusSetAtBlock?: Maybe<Scalars['Float']>;
  statusSetAtTime?: Maybe<Scalars['DateTime']>;
};

export enum ProposalVoteKind {
  Approve = 'APPROVE',
  Reject = 'REJECT',
  Slash = 'SLASH',
  Abstain = 'ABSTAIN'
}

export type ProposalVotedEvent = Event & BaseGraphQlObject & {
  __typename: 'ProposalVotedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  voter: Membership;
  voterId: Scalars['String'];
  /** The kind of the vote that was casted */
  voteKind: ProposalVoteKind;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** The rationale behind the vote */
  rationale: Scalars['String'];
  /**
   * The voting round - number representing which Deciding period the vote was
   * casted in (starting with 1), useful when the proposal must be approved during
   * multiple council terms (constitution > 1)
   */
  votingRound: Scalars['Int'];
};

export type ProposalVotedEventConnection = {
  __typename: 'ProposalVotedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ProposalVotedEventEdge>;
  pageInfo: PageInfo;
};

export type ProposalVotedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  voter: Scalars['ID'];
  voteKind: ProposalVoteKind;
  proposal: Scalars['ID'];
  rationale: Scalars['String'];
  votingRound: Scalars['Float'];
};

export type ProposalVotedEventEdge = {
  __typename: 'ProposalVotedEventEdge';
  node: ProposalVotedEvent;
  cursor: Scalars['String'];
};

export enum ProposalVotedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  VoterAsc = 'voter_ASC',
  VoterDesc = 'voter_DESC',
  VoteKindAsc = 'voteKind_ASC',
  VoteKindDesc = 'voteKind_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  VotingRoundAsc = 'votingRound_ASC',
  VotingRoundDesc = 'votingRound_DESC'
}

export type ProposalVotedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  voter?: Maybe<Scalars['ID']>;
  voteKind?: Maybe<ProposalVoteKind>;
  proposal?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
  votingRound?: Maybe<Scalars['Float']>;
};

export type ProposalVotedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  voter_eq?: Maybe<Scalars['ID']>;
  voter_in?: Maybe<Array<Scalars['ID']>>;
  voteKind_eq?: Maybe<ProposalVoteKind>;
  voteKind_in?: Maybe<Array<ProposalVoteKind>>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  votingRound_eq?: Maybe<Scalars['Int']>;
  votingRound_gt?: Maybe<Scalars['Int']>;
  votingRound_gte?: Maybe<Scalars['Int']>;
  votingRound_lt?: Maybe<Scalars['Int']>;
  votingRound_lte?: Maybe<Scalars['Int']>;
  votingRound_in?: Maybe<Array<Scalars['Int']>>;
  voter?: Maybe<MembershipWhereInput>;
  proposal?: Maybe<ProposalWhereInput>;
  AND?: Maybe<Array<ProposalVotedEventWhereInput>>;
  OR?: Maybe<Array<ProposalVotedEventWhereInput>>;
};

export type ProposalVotedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  details_json?: Maybe<Scalars['JSONObject']>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  creator_eq?: Maybe<Scalars['ID']>;
  creator_in?: Maybe<Array<Scalars['ID']>>;
  exactExecutionBlock_eq?: Maybe<Scalars['Int']>;
  exactExecutionBlock_gt?: Maybe<Scalars['Int']>;
  exactExecutionBlock_gte?: Maybe<Scalars['Int']>;
  exactExecutionBlock_lt?: Maybe<Scalars['Int']>;
  exactExecutionBlock_lte?: Maybe<Scalars['Int']>;
  exactExecutionBlock_in?: Maybe<Array<Scalars['Int']>>;
  councilApprovals_eq?: Maybe<Scalars['Int']>;
  councilApprovals_gt?: Maybe<Scalars['Int']>;
  councilApprovals_gte?: Maybe<Scalars['Int']>;
  councilApprovals_lt?: Maybe<Scalars['Int']>;
  councilApprovals_lte?: Maybe<Scalars['Int']>;
  councilApprovals_in?: Maybe<Array<Scalars['Int']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  isFinalized_eq?: Maybe<Scalars['Boolean']>;
  isFinalized_in?: Maybe<Array<Scalars['Boolean']>>;
  statusSetAtBlock_eq?: Maybe<Scalars['Int']>;
  statusSetAtBlock_gt?: Maybe<Scalars['Int']>;
  statusSetAtBlock_gte?: Maybe<Scalars['Int']>;
  statusSetAtBlock_lt?: Maybe<Scalars['Int']>;
  statusSetAtBlock_lte?: Maybe<Scalars['Int']>;
  statusSetAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  statusSetAtTime_eq?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_lt?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_lte?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_gt?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_gte?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<MembershipWhereInput>;
  createdInEvent?: Maybe<ProposalCreatedEventWhereInput>;
  discussionThread?: Maybe<ProposalDiscussionThreadWhereInput>;
  proposalStatusUpdates_none?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  proposalStatusUpdates_some?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  proposalStatusUpdates_every?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  votes_none?: Maybe<ProposalVotedEventWhereInput>;
  votes_some?: Maybe<ProposalVotedEventWhereInput>;
  votes_every?: Maybe<ProposalVotedEventWhereInput>;
  proposalcancelledeventproposal_none?: Maybe<ProposalCancelledEventWhereInput>;
  proposalcancelledeventproposal_some?: Maybe<ProposalCancelledEventWhereInput>;
  proposalcancelledeventproposal_every?: Maybe<ProposalCancelledEventWhereInput>;
  proposaldecisionmadeeventproposal_none?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposaldecisionmadeeventproposal_some?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposaldecisionmadeeventproposal_every?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposalexecutedeventproposal_none?: Maybe<ProposalExecutedEventWhereInput>;
  proposalexecutedeventproposal_some?: Maybe<ProposalExecutedEventWhereInput>;
  proposalexecutedeventproposal_every?: Maybe<ProposalExecutedEventWhereInput>;
  AND?: Maybe<Array<ProposalWhereInput>>;
  OR?: Maybe<Array<ProposalWhereInput>>;
};

export type ProposalWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalsByDescriptionFtsOutput = {
  __typename: 'ProposalsByDescriptionFTSOutput';
  item: ProposalsByDescriptionSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type ProposalsByDescriptionSearchResult = Proposal;

export type ProposalsByTitleFtsOutput = {
  __typename: 'ProposalsByTitleFTSOutput';
  item: ProposalsByTitleSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type ProposalsByTitleSearchResult = Proposal;

export type Query = {
  __typename: 'Query';
  announcingPeriodStartedEvents: Array<AnnouncingPeriodStartedEvent>;
  announcingPeriodStartedEventByUniqueInput?: Maybe<AnnouncingPeriodStartedEvent>;
  announcingPeriodStartedEventsConnection: AnnouncingPeriodStartedEventConnection;
  applicationFormQuestionAnswers: Array<ApplicationFormQuestionAnswer>;
  applicationFormQuestionAnswerByUniqueInput?: Maybe<ApplicationFormQuestionAnswer>;
  applicationFormQuestionAnswersConnection: ApplicationFormQuestionAnswerConnection;
  applicationFormQuestions: Array<ApplicationFormQuestion>;
  applicationFormQuestionByUniqueInput?: Maybe<ApplicationFormQuestion>;
  applicationFormQuestionsConnection: ApplicationFormQuestionConnection;
  applicationWithdrawnEvents: Array<ApplicationWithdrawnEvent>;
  applicationWithdrawnEventByUniqueInput?: Maybe<ApplicationWithdrawnEvent>;
  applicationWithdrawnEventsConnection: ApplicationWithdrawnEventConnection;
  appliedOnOpeningEvents: Array<AppliedOnOpeningEvent>;
  appliedOnOpeningEventByUniqueInput?: Maybe<AppliedOnOpeningEvent>;
  appliedOnOpeningEventsConnection: AppliedOnOpeningEventConnection;
  budgetBalanceSetEvents: Array<BudgetBalanceSetEvent>;
  budgetBalanceSetEventByUniqueInput?: Maybe<BudgetBalanceSetEvent>;
  budgetBalanceSetEventsConnection: BudgetBalanceSetEventConnection;
  budgetIncrementUpdatedEvents: Array<BudgetIncrementUpdatedEvent>;
  budgetIncrementUpdatedEventByUniqueInput?: Maybe<BudgetIncrementUpdatedEvent>;
  budgetIncrementUpdatedEventsConnection: BudgetIncrementUpdatedEventConnection;
  budgetPayments: Array<BudgetPayment>;
  budgetPaymentByUniqueInput?: Maybe<BudgetPayment>;
  budgetPaymentsConnection: BudgetPaymentConnection;
  budgetRefillEvents: Array<BudgetRefillEvent>;
  budgetRefillEventByUniqueInput?: Maybe<BudgetRefillEvent>;
  budgetRefillEventsConnection: BudgetRefillEventConnection;
  budgetRefillPlannedEvents: Array<BudgetRefillPlannedEvent>;
  budgetRefillPlannedEventByUniqueInput?: Maybe<BudgetRefillPlannedEvent>;
  budgetRefillPlannedEventsConnection: BudgetRefillPlannedEventConnection;
  budgetSetEvents: Array<BudgetSetEvent>;
  budgetSetEventByUniqueInput?: Maybe<BudgetSetEvent>;
  budgetSetEventsConnection: BudgetSetEventConnection;
  budgetSpendingEvents: Array<BudgetSpendingEvent>;
  budgetSpendingEventByUniqueInput?: Maybe<BudgetSpendingEvent>;
  budgetSpendingEventsConnection: BudgetSpendingEventConnection;
  budgets: Array<Budget>;
  budgetByUniqueInput?: Maybe<Budget>;
  budgetsConnection: BudgetConnection;
  candidacyNoteSetEvents: Array<CandidacyNoteSetEvent>;
  candidacyNoteSetEventByUniqueInput?: Maybe<CandidacyNoteSetEvent>;
  candidacyNoteSetEventsConnection: CandidacyNoteSetEventConnection;
  candidacyStakeReleaseEvents: Array<CandidacyStakeReleaseEvent>;
  candidacyStakeReleaseEventByUniqueInput?: Maybe<CandidacyStakeReleaseEvent>;
  candidacyStakeReleaseEventsConnection: CandidacyStakeReleaseEventConnection;
  candidacyWithdrawEvents: Array<CandidacyWithdrawEvent>;
  candidacyWithdrawEventByUniqueInput?: Maybe<CandidacyWithdrawEvent>;
  candidacyWithdrawEventsConnection: CandidacyWithdrawEventConnection;
  candidates: Array<Candidate>;
  candidateByUniqueInput?: Maybe<Candidate>;
  candidatesConnection: CandidateConnection;
  castVotes: Array<CastVote>;
  castVoteByUniqueInput?: Maybe<CastVote>;
  castVotesConnection: CastVoteConnection;
  categoryArchivalStatusUpdatedEvents: Array<CategoryArchivalStatusUpdatedEvent>;
  categoryArchivalStatusUpdatedEventByUniqueInput?: Maybe<CategoryArchivalStatusUpdatedEvent>;
  categoryArchivalStatusUpdatedEventsConnection: CategoryArchivalStatusUpdatedEventConnection;
  categoryCreatedEvents: Array<CategoryCreatedEvent>;
  categoryCreatedEventByUniqueInput?: Maybe<CategoryCreatedEvent>;
  categoryCreatedEventsConnection: CategoryCreatedEventConnection;
  categoryDeletedEvents: Array<CategoryDeletedEvent>;
  categoryDeletedEventByUniqueInput?: Maybe<CategoryDeletedEvent>;
  categoryDeletedEventsConnection: CategoryDeletedEventConnection;
  categoryMembershipOfModeratorUpdatedEvents: Array<CategoryMembershipOfModeratorUpdatedEvent>;
  categoryMembershipOfModeratorUpdatedEventByUniqueInput?: Maybe<CategoryMembershipOfModeratorUpdatedEvent>;
  categoryMembershipOfModeratorUpdatedEventsConnection: CategoryMembershipOfModeratorUpdatedEventConnection;
  categoryStickyThreadUpdateEvents: Array<CategoryStickyThreadUpdateEvent>;
  categoryStickyThreadUpdateEventByUniqueInput?: Maybe<CategoryStickyThreadUpdateEvent>;
  categoryStickyThreadUpdateEventsConnection: CategoryStickyThreadUpdateEventConnection;
  councilMembers: Array<CouncilMember>;
  councilMemberByUniqueInput?: Maybe<CouncilMember>;
  councilMembersConnection: CouncilMemberConnection;
  councilStageUpdates: Array<CouncilStageUpdate>;
  councilStageUpdateByUniqueInput?: Maybe<CouncilStageUpdate>;
  councilStageUpdatesConnection: CouncilStageUpdateConnection;
  councilorRewardUpdatedEvents: Array<CouncilorRewardUpdatedEvent>;
  councilorRewardUpdatedEventByUniqueInput?: Maybe<CouncilorRewardUpdatedEvent>;
  councilorRewardUpdatedEventsConnection: CouncilorRewardUpdatedEventConnection;
  curatorGroups: Array<CuratorGroup>;
  curatorGroupByUniqueInput?: Maybe<CuratorGroup>;
  curatorGroupsConnection: CuratorGroupConnection;
  dataObjects: Array<DataObject>;
  dataObjectByUniqueInput?: Maybe<DataObject>;
  dataObjectsConnection: DataObjectConnection;
  electedCouncils: Array<ElectedCouncil>;
  electedCouncilByUniqueInput?: Maybe<ElectedCouncil>;
  electedCouncilsConnection: ElectedCouncilConnection;
  electionRounds: Array<ElectionRound>;
  electionRoundByUniqueInput?: Maybe<ElectionRound>;
  electionRoundsConnection: ElectionRoundConnection;
  events: Array<Event>;
  forumCategories: Array<ForumCategory>;
  forumCategoryByUniqueInput?: Maybe<ForumCategory>;
  forumCategoriesConnection: ForumCategoryConnection;
  forumPollAlternatives: Array<ForumPollAlternative>;
  forumPollAlternativeByUniqueInput?: Maybe<ForumPollAlternative>;
  forumPollAlternativesConnection: ForumPollAlternativeConnection;
  forumPolls: Array<ForumPoll>;
  forumPollByUniqueInput?: Maybe<ForumPoll>;
  forumPollsConnection: ForumPollConnection;
  forumPostReactions: Array<ForumPostReaction>;
  forumPostReactionByUniqueInput?: Maybe<ForumPostReaction>;
  forumPostReactionsConnection: ForumPostReactionConnection;
  forumPosts: Array<ForumPost>;
  forumPostByUniqueInput?: Maybe<ForumPost>;
  forumPostsConnection: ForumPostConnection;
  forumThreadTags: Array<ForumThreadTag>;
  forumThreadTagByUniqueInput?: Maybe<ForumThreadTag>;
  forumThreadTagsConnection: ForumThreadTagConnection;
  forumThreads: Array<ForumThread>;
  forumThreadByUniqueInput?: Maybe<ForumThread>;
  forumThreadsConnection: ForumThreadConnection;
  fundingRequestDestinations: Array<FundingRequestDestination>;
  fundingRequestDestinationByUniqueInput?: Maybe<FundingRequestDestination>;
  fundingRequestDestinationsConnection: FundingRequestDestinationConnection;
  fundingRequestDestinationsLists: Array<FundingRequestDestinationsList>;
  fundingRequestDestinationsListByUniqueInput?: Maybe<FundingRequestDestinationsList>;
  fundingRequestDestinationsListsConnection: FundingRequestDestinationsListConnection;
  channelCategories: Array<ChannelCategory>;
  channelCategoryByUniqueInput?: Maybe<ChannelCategory>;
  channelCategoriesConnection: ChannelCategoryConnection;
  channels: Array<Channel>;
  channelByUniqueInput?: Maybe<Channel>;
  channelsConnection: ChannelConnection;
  initialInvitationBalanceUpdatedEvents: Array<InitialInvitationBalanceUpdatedEvent>;
  initialInvitationBalanceUpdatedEventByUniqueInput?: Maybe<InitialInvitationBalanceUpdatedEvent>;
  initialInvitationBalanceUpdatedEventsConnection: InitialInvitationBalanceUpdatedEventConnection;
  initialInvitationCountUpdatedEvents: Array<InitialInvitationCountUpdatedEvent>;
  initialInvitationCountUpdatedEventByUniqueInput?: Maybe<InitialInvitationCountUpdatedEvent>;
  initialInvitationCountUpdatedEventsConnection: InitialInvitationCountUpdatedEventConnection;
  invitesTransferredEvents: Array<InvitesTransferredEvent>;
  invitesTransferredEventByUniqueInput?: Maybe<InvitesTransferredEvent>;
  invitesTransferredEventsConnection: InvitesTransferredEventConnection;
  languages: Array<Language>;
  languageByUniqueInput?: Maybe<Language>;
  languagesConnection: LanguageConnection;
  leaderInvitationQuotaUpdatedEvents: Array<LeaderInvitationQuotaUpdatedEvent>;
  leaderInvitationQuotaUpdatedEventByUniqueInput?: Maybe<LeaderInvitationQuotaUpdatedEvent>;
  leaderInvitationQuotaUpdatedEventsConnection: LeaderInvitationQuotaUpdatedEventConnection;
  leaderSetEvents: Array<LeaderSetEvent>;
  leaderSetEventByUniqueInput?: Maybe<LeaderSetEvent>;
  leaderSetEventsConnection: LeaderSetEventConnection;
  leaderUnsetEvents: Array<LeaderUnsetEvent>;
  leaderUnsetEventByUniqueInput?: Maybe<LeaderUnsetEvent>;
  leaderUnsetEventsConnection: LeaderUnsetEventConnection;
  licenses: Array<License>;
  licenseByUniqueInput?: Maybe<License>;
  licensesConnection: LicenseConnection;
  memberAccountsUpdatedEvents: Array<MemberAccountsUpdatedEvent>;
  memberAccountsUpdatedEventByUniqueInput?: Maybe<MemberAccountsUpdatedEvent>;
  memberAccountsUpdatedEventsConnection: MemberAccountsUpdatedEventConnection;
  memberInvitedEvents: Array<MemberInvitedEvent>;
  memberInvitedEventByUniqueInput?: Maybe<MemberInvitedEvent>;
  memberInvitedEventsConnection: MemberInvitedEventConnection;
  memberMetadata: Array<MemberMetadata>;
  memberMetadataByUniqueInput?: Maybe<MemberMetadata>;
  memberMetadataConnection: MemberMetadataConnection;
  memberProfileUpdatedEvents: Array<MemberProfileUpdatedEvent>;
  memberProfileUpdatedEventByUniqueInput?: Maybe<MemberProfileUpdatedEvent>;
  memberProfileUpdatedEventsConnection: MemberProfileUpdatedEventConnection;
  memberVerificationStatusUpdatedEvents: Array<MemberVerificationStatusUpdatedEvent>;
  memberVerificationStatusUpdatedEventByUniqueInput?: Maybe<MemberVerificationStatusUpdatedEvent>;
  memberVerificationStatusUpdatedEventsConnection: MemberVerificationStatusUpdatedEventConnection;
  membershipBoughtEvents: Array<MembershipBoughtEvent>;
  membershipBoughtEventByUniqueInput?: Maybe<MembershipBoughtEvent>;
  membershipBoughtEventsConnection: MembershipBoughtEventConnection;
  membershipPriceUpdatedEvents: Array<MembershipPriceUpdatedEvent>;
  membershipPriceUpdatedEventByUniqueInput?: Maybe<MembershipPriceUpdatedEvent>;
  membershipPriceUpdatedEventsConnection: MembershipPriceUpdatedEventConnection;
  membershipSystemSnapshots: Array<MembershipSystemSnapshot>;
  membershipSystemSnapshotByUniqueInput?: Maybe<MembershipSystemSnapshot>;
  membershipSystemSnapshotsConnection: MembershipSystemSnapshotConnection;
  memberships: Array<Membership>;
  membershipByUniqueInput?: Maybe<Membership>;
  membershipsConnection: MembershipConnection;
  newCandidateEvents: Array<NewCandidateEvent>;
  newCandidateEventByUniqueInput?: Maybe<NewCandidateEvent>;
  newCandidateEventsConnection: NewCandidateEventConnection;
  newCouncilElectedEvents: Array<NewCouncilElectedEvent>;
  newCouncilElectedEventByUniqueInput?: Maybe<NewCouncilElectedEvent>;
  newCouncilElectedEventsConnection: NewCouncilElectedEventConnection;
  newCouncilNotElectedEvents: Array<NewCouncilNotElectedEvent>;
  newCouncilNotElectedEventByUniqueInput?: Maybe<NewCouncilNotElectedEvent>;
  newCouncilNotElectedEventsConnection: NewCouncilNotElectedEventConnection;
  newMissedRewardLevelReachedEvents: Array<NewMissedRewardLevelReachedEvent>;
  newMissedRewardLevelReachedEventByUniqueInput?: Maybe<NewMissedRewardLevelReachedEvent>;
  newMissedRewardLevelReachedEventsConnection: NewMissedRewardLevelReachedEventConnection;
  notEnoughCandidatesEvents: Array<NotEnoughCandidatesEvent>;
  notEnoughCandidatesEventByUniqueInput?: Maybe<NotEnoughCandidatesEvent>;
  notEnoughCandidatesEventsConnection: NotEnoughCandidatesEventConnection;
  openingAddedEvents: Array<OpeningAddedEvent>;
  openingAddedEventByUniqueInput?: Maybe<OpeningAddedEvent>;
  openingAddedEventsConnection: OpeningAddedEventConnection;
  openingCanceledEvents: Array<OpeningCanceledEvent>;
  openingCanceledEventByUniqueInput?: Maybe<OpeningCanceledEvent>;
  openingCanceledEventsConnection: OpeningCanceledEventConnection;
  openingFilledEvents: Array<OpeningFilledEvent>;
  openingFilledEventByUniqueInput?: Maybe<OpeningFilledEvent>;
  openingFilledEventsConnection: OpeningFilledEventConnection;
  postAddedEvents: Array<PostAddedEvent>;
  postAddedEventByUniqueInput?: Maybe<PostAddedEvent>;
  postAddedEventsConnection: PostAddedEventConnection;
  postDeletedEvents: Array<PostDeletedEvent>;
  postDeletedEventByUniqueInput?: Maybe<PostDeletedEvent>;
  postDeletedEventsConnection: PostDeletedEventConnection;
  postModeratedEvents: Array<PostModeratedEvent>;
  postModeratedEventByUniqueInput?: Maybe<PostModeratedEvent>;
  postModeratedEventsConnection: PostModeratedEventConnection;
  postReactedEvents: Array<PostReactedEvent>;
  postReactedEventByUniqueInput?: Maybe<PostReactedEvent>;
  postReactedEventsConnection: PostReactedEventConnection;
  postTextUpdatedEvents: Array<PostTextUpdatedEvent>;
  postTextUpdatedEventByUniqueInput?: Maybe<PostTextUpdatedEvent>;
  postTextUpdatedEventsConnection: PostTextUpdatedEventConnection;
  proposalCancelledEvents: Array<ProposalCancelledEvent>;
  proposalCancelledEventByUniqueInput?: Maybe<ProposalCancelledEvent>;
  proposalCancelledEventsConnection: ProposalCancelledEventConnection;
  proposalCreatedEvents: Array<ProposalCreatedEvent>;
  proposalCreatedEventByUniqueInput?: Maybe<ProposalCreatedEvent>;
  proposalCreatedEventsConnection: ProposalCreatedEventConnection;
  proposalDecisionMadeEvents: Array<ProposalDecisionMadeEvent>;
  proposalDecisionMadeEventByUniqueInput?: Maybe<ProposalDecisionMadeEvent>;
  proposalDecisionMadeEventsConnection: ProposalDecisionMadeEventConnection;
  proposalDiscussionPostCreatedEvents: Array<ProposalDiscussionPostCreatedEvent>;
  proposalDiscussionPostCreatedEventByUniqueInput?: Maybe<ProposalDiscussionPostCreatedEvent>;
  proposalDiscussionPostCreatedEventsConnection: ProposalDiscussionPostCreatedEventConnection;
  proposalDiscussionPostDeletedEvents: Array<ProposalDiscussionPostDeletedEvent>;
  proposalDiscussionPostDeletedEventByUniqueInput?: Maybe<ProposalDiscussionPostDeletedEvent>;
  proposalDiscussionPostDeletedEventsConnection: ProposalDiscussionPostDeletedEventConnection;
  proposalDiscussionPostUpdatedEvents: Array<ProposalDiscussionPostUpdatedEvent>;
  proposalDiscussionPostUpdatedEventByUniqueInput?: Maybe<ProposalDiscussionPostUpdatedEvent>;
  proposalDiscussionPostUpdatedEventsConnection: ProposalDiscussionPostUpdatedEventConnection;
  proposalDiscussionPosts: Array<ProposalDiscussionPost>;
  proposalDiscussionPostByUniqueInput?: Maybe<ProposalDiscussionPost>;
  proposalDiscussionPostsConnection: ProposalDiscussionPostConnection;
  proposalDiscussionThreadModeChangedEvents: Array<ProposalDiscussionThreadModeChangedEvent>;
  proposalDiscussionThreadModeChangedEventByUniqueInput?: Maybe<ProposalDiscussionThreadModeChangedEvent>;
  proposalDiscussionThreadModeChangedEventsConnection: ProposalDiscussionThreadModeChangedEventConnection;
  proposalDiscussionThreads: Array<ProposalDiscussionThread>;
  proposalDiscussionThreadByUniqueInput?: Maybe<ProposalDiscussionThread>;
  proposalDiscussionThreadsConnection: ProposalDiscussionThreadConnection;
  proposalDiscussionWhitelists: Array<ProposalDiscussionWhitelist>;
  proposalDiscussionWhitelistByUniqueInput?: Maybe<ProposalDiscussionWhitelist>;
  proposalDiscussionWhitelistsConnection: ProposalDiscussionWhitelistConnection;
  proposalExecutedEvents: Array<ProposalExecutedEvent>;
  proposalExecutedEventByUniqueInput?: Maybe<ProposalExecutedEvent>;
  proposalExecutedEventsConnection: ProposalExecutedEventConnection;
  proposalStatusUpdatedEvents: Array<ProposalStatusUpdatedEvent>;
  proposalStatusUpdatedEventByUniqueInput?: Maybe<ProposalStatusUpdatedEvent>;
  proposalStatusUpdatedEventsConnection: ProposalStatusUpdatedEventConnection;
  proposalVotedEvents: Array<ProposalVotedEvent>;
  proposalVotedEventByUniqueInput?: Maybe<ProposalVotedEvent>;
  proposalVotedEventsConnection: ProposalVotedEventConnection;
  proposals: Array<Proposal>;
  proposalByUniqueInput?: Maybe<Proposal>;
  proposalsConnection: ProposalConnection;
  channelCategoriesByName: Array<ChannelCategoriesByNameFtsOutput>;
  membersByHandle: Array<MembersByHandleFtsOutput>;
  postsByText: Array<PostsByTextFtsOutput>;
  proposalsByDescription: Array<ProposalsByDescriptionFtsOutput>;
  proposalsByTitle: Array<ProposalsByTitleFtsOutput>;
  search: Array<SearchFtsOutput>;
  threadsByTitle: Array<ThreadsByTitleFtsOutput>;
  videoCategoriesByName: Array<VideoCategoriesByNameFtsOutput>;
  referendumFinishedEvents: Array<ReferendumFinishedEvent>;
  referendumFinishedEventByUniqueInput?: Maybe<ReferendumFinishedEvent>;
  referendumFinishedEventsConnection: ReferendumFinishedEventConnection;
  referendumStageRevealingOptionResults: Array<ReferendumStageRevealingOptionResult>;
  referendumStageRevealingOptionResultByUniqueInput?: Maybe<ReferendumStageRevealingOptionResult>;
  referendumStageRevealingOptionResultsConnection: ReferendumStageRevealingOptionResultConnection;
  referendumStartedEvents: Array<ReferendumStartedEvent>;
  referendumStartedEventByUniqueInput?: Maybe<ReferendumStartedEvent>;
  referendumStartedEventsConnection: ReferendumStartedEventConnection;
  referendumStartedForcefullyEvents: Array<ReferendumStartedForcefullyEvent>;
  referendumStartedForcefullyEventByUniqueInput?: Maybe<ReferendumStartedForcefullyEvent>;
  referendumStartedForcefullyEventsConnection: ReferendumStartedForcefullyEventConnection;
  referralCutUpdatedEvents: Array<ReferralCutUpdatedEvent>;
  referralCutUpdatedEventByUniqueInput?: Maybe<ReferralCutUpdatedEvent>;
  referralCutUpdatedEventsConnection: ReferralCutUpdatedEventConnection;
  requestFundedEvents: Array<RequestFundedEvent>;
  requestFundedEventByUniqueInput?: Maybe<RequestFundedEvent>;
  requestFundedEventsConnection: RequestFundedEventConnection;
  revealingStageStartedEvents: Array<RevealingStageStartedEvent>;
  revealingStageStartedEventByUniqueInput?: Maybe<RevealingStageStartedEvent>;
  revealingStageStartedEventsConnection: RevealingStageStartedEventConnection;
  rewardPaidEvents: Array<RewardPaidEvent>;
  rewardPaidEventByUniqueInput?: Maybe<RewardPaidEvent>;
  rewardPaidEventsConnection: RewardPaidEventConnection;
  rewardPaymentEvents: Array<RewardPaymentEvent>;
  rewardPaymentEventByUniqueInput?: Maybe<RewardPaymentEvent>;
  rewardPaymentEventsConnection: RewardPaymentEventConnection;
  runtimeWasmBytecodes: Array<RuntimeWasmBytecode>;
  runtimeWasmBytecodeByUniqueInput?: Maybe<RuntimeWasmBytecode>;
  runtimeWasmBytecodesConnection: RuntimeWasmBytecodeConnection;
  stakeDecreasedEvents: Array<StakeDecreasedEvent>;
  stakeDecreasedEventByUniqueInput?: Maybe<StakeDecreasedEvent>;
  stakeDecreasedEventsConnection: StakeDecreasedEventConnection;
  stakeIncreasedEvents: Array<StakeIncreasedEvent>;
  stakeIncreasedEventByUniqueInput?: Maybe<StakeIncreasedEvent>;
  stakeIncreasedEventsConnection: StakeIncreasedEventConnection;
  stakeReleasedEvents: Array<StakeReleasedEvent>;
  stakeReleasedEventByUniqueInput?: Maybe<StakeReleasedEvent>;
  stakeReleasedEventsConnection: StakeReleasedEventConnection;
  stakeSlashedEvents: Array<StakeSlashedEvent>;
  stakeSlashedEventByUniqueInput?: Maybe<StakeSlashedEvent>;
  stakeSlashedEventsConnection: StakeSlashedEventConnection;
  stakingAccountAddedEvents: Array<StakingAccountAddedEvent>;
  stakingAccountAddedEventByUniqueInput?: Maybe<StakingAccountAddedEvent>;
  stakingAccountAddedEventsConnection: StakingAccountAddedEventConnection;
  stakingAccountConfirmedEvents: Array<StakingAccountConfirmedEvent>;
  stakingAccountConfirmedEventByUniqueInput?: Maybe<StakingAccountConfirmedEvent>;
  stakingAccountConfirmedEventsConnection: StakingAccountConfirmedEventConnection;
  stakingAccountRemovedEvents: Array<StakingAccountRemovedEvent>;
  stakingAccountRemovedEventByUniqueInput?: Maybe<StakingAccountRemovedEvent>;
  stakingAccountRemovedEventsConnection: StakingAccountRemovedEventConnection;
  statusTextChangedEvents: Array<StatusTextChangedEvent>;
  statusTextChangedEventByUniqueInput?: Maybe<StatusTextChangedEvent>;
  statusTextChangedEventsConnection: StatusTextChangedEventConnection;
  terminatedLeaderEvents: Array<TerminatedLeaderEvent>;
  terminatedLeaderEventByUniqueInput?: Maybe<TerminatedLeaderEvent>;
  terminatedLeaderEventsConnection: TerminatedLeaderEventConnection;
  terminatedWorkerEvents: Array<TerminatedWorkerEvent>;
  terminatedWorkerEventByUniqueInput?: Maybe<TerminatedWorkerEvent>;
  terminatedWorkerEventsConnection: TerminatedWorkerEventConnection;
  threadCreatedEvents: Array<ThreadCreatedEvent>;
  threadCreatedEventByUniqueInput?: Maybe<ThreadCreatedEvent>;
  threadCreatedEventsConnection: ThreadCreatedEventConnection;
  threadDeletedEvents: Array<ThreadDeletedEvent>;
  threadDeletedEventByUniqueInput?: Maybe<ThreadDeletedEvent>;
  threadDeletedEventsConnection: ThreadDeletedEventConnection;
  threadMetadataUpdatedEvents: Array<ThreadMetadataUpdatedEvent>;
  threadMetadataUpdatedEventByUniqueInput?: Maybe<ThreadMetadataUpdatedEvent>;
  threadMetadataUpdatedEventsConnection: ThreadMetadataUpdatedEventConnection;
  threadModeratedEvents: Array<ThreadModeratedEvent>;
  threadModeratedEventByUniqueInput?: Maybe<ThreadModeratedEvent>;
  threadModeratedEventsConnection: ThreadModeratedEventConnection;
  threadMovedEvents: Array<ThreadMovedEvent>;
  threadMovedEventByUniqueInput?: Maybe<ThreadMovedEvent>;
  threadMovedEventsConnection: ThreadMovedEventConnection;
  upcomingWorkingGroupOpenings: Array<UpcomingWorkingGroupOpening>;
  upcomingWorkingGroupOpeningByUniqueInput?: Maybe<UpcomingWorkingGroupOpening>;
  upcomingWorkingGroupOpeningsConnection: UpcomingWorkingGroupOpeningConnection;
  videoCategories: Array<VideoCategory>;
  videoCategoryByUniqueInput?: Maybe<VideoCategory>;
  videoCategoriesConnection: VideoCategoryConnection;
  videoMediaEncodings: Array<VideoMediaEncoding>;
  videoMediaEncodingByUniqueInput?: Maybe<VideoMediaEncoding>;
  videoMediaEncodingsConnection: VideoMediaEncodingConnection;
  videoMediaMetadata: Array<VideoMediaMetadata>;
  videoMediaMetadataByUniqueInput?: Maybe<VideoMediaMetadata>;
  videoMediaMetadataConnection: VideoMediaMetadataConnection;
  videos: Array<Video>;
  videoByUniqueInput?: Maybe<Video>;
  videosConnection: VideoConnection;
  voteCastEvents: Array<VoteCastEvent>;
  voteCastEventByUniqueInput?: Maybe<VoteCastEvent>;
  voteCastEventsConnection: VoteCastEventConnection;
  voteOnPollEvents: Array<VoteOnPollEvent>;
  voteOnPollEventByUniqueInput?: Maybe<VoteOnPollEvent>;
  voteOnPollEventsConnection: VoteOnPollEventConnection;
  voteRevealedEvents: Array<VoteRevealedEvent>;
  voteRevealedEventByUniqueInput?: Maybe<VoteRevealedEvent>;
  voteRevealedEventsConnection: VoteRevealedEventConnection;
  votingPeriodStartedEvents: Array<VotingPeriodStartedEvent>;
  votingPeriodStartedEventByUniqueInput?: Maybe<VotingPeriodStartedEvent>;
  votingPeriodStartedEventsConnection: VotingPeriodStartedEventConnection;
  workerExitedEvents: Array<WorkerExitedEvent>;
  workerExitedEventByUniqueInput?: Maybe<WorkerExitedEvent>;
  workerExitedEventsConnection: WorkerExitedEventConnection;
  workerRewardAccountUpdatedEvents: Array<WorkerRewardAccountUpdatedEvent>;
  workerRewardAccountUpdatedEventByUniqueInput?: Maybe<WorkerRewardAccountUpdatedEvent>;
  workerRewardAccountUpdatedEventsConnection: WorkerRewardAccountUpdatedEventConnection;
  workerRewardAmountUpdatedEvents: Array<WorkerRewardAmountUpdatedEvent>;
  workerRewardAmountUpdatedEventByUniqueInput?: Maybe<WorkerRewardAmountUpdatedEvent>;
  workerRewardAmountUpdatedEventsConnection: WorkerRewardAmountUpdatedEventConnection;
  workerRoleAccountUpdatedEvents: Array<WorkerRoleAccountUpdatedEvent>;
  workerRoleAccountUpdatedEventByUniqueInput?: Maybe<WorkerRoleAccountUpdatedEvent>;
  workerRoleAccountUpdatedEventsConnection: WorkerRoleAccountUpdatedEventConnection;
  workerStartedLeavingEvents: Array<WorkerStartedLeavingEvent>;
  workerStartedLeavingEventByUniqueInput?: Maybe<WorkerStartedLeavingEvent>;
  workerStartedLeavingEventsConnection: WorkerStartedLeavingEventConnection;
  workers: Array<Worker>;
  workerByUniqueInput?: Maybe<Worker>;
  workersConnection: WorkerConnection;
  workingGroupApplications: Array<WorkingGroupApplication>;
  workingGroupApplicationByUniqueInput?: Maybe<WorkingGroupApplication>;
  workingGroupApplicationsConnection: WorkingGroupApplicationConnection;
  workingGroupMetadata: Array<WorkingGroupMetadata>;
  workingGroupMetadataByUniqueInput?: Maybe<WorkingGroupMetadata>;
  workingGroupMetadataConnection: WorkingGroupMetadataConnection;
  workingGroupOpeningMetadata: Array<WorkingGroupOpeningMetadata>;
  workingGroupOpeningMetadataByUniqueInput?: Maybe<WorkingGroupOpeningMetadata>;
  workingGroupOpeningMetadataConnection: WorkingGroupOpeningMetadataConnection;
  workingGroupOpenings: Array<WorkingGroupOpening>;
  workingGroupOpeningByUniqueInput?: Maybe<WorkingGroupOpening>;
  workingGroupOpeningsConnection: WorkingGroupOpeningConnection;
  workingGroups: Array<WorkingGroup>;
  workingGroupByUniqueInput?: Maybe<WorkingGroup>;
  workingGroupsConnection: WorkingGroupConnection;
};


export type QueryAnnouncingPeriodStartedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<AnnouncingPeriodStartedEventWhereInput>;
  orderBy?: Maybe<Array<AnnouncingPeriodStartedEventOrderByInput>>;
};


export type QueryAnnouncingPeriodStartedEventByUniqueInputArgs = {
  where: AnnouncingPeriodStartedEventWhereUniqueInput;
};


export type QueryAnnouncingPeriodStartedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<AnnouncingPeriodStartedEventWhereInput>;
  orderBy?: Maybe<Array<AnnouncingPeriodStartedEventOrderByInput>>;
};


export type QueryApplicationFormQuestionAnswersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  orderBy?: Maybe<Array<ApplicationFormQuestionAnswerOrderByInput>>;
};


export type QueryApplicationFormQuestionAnswerByUniqueInputArgs = {
  where: ApplicationFormQuestionAnswerWhereUniqueInput;
};


export type QueryApplicationFormQuestionAnswersConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  orderBy?: Maybe<Array<ApplicationFormQuestionAnswerOrderByInput>>;
};


export type QueryApplicationFormQuestionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ApplicationFormQuestionWhereInput>;
  orderBy?: Maybe<Array<ApplicationFormQuestionOrderByInput>>;
};


export type QueryApplicationFormQuestionByUniqueInputArgs = {
  where: ApplicationFormQuestionWhereUniqueInput;
};


export type QueryApplicationFormQuestionsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ApplicationFormQuestionWhereInput>;
  orderBy?: Maybe<Array<ApplicationFormQuestionOrderByInput>>;
};


export type QueryApplicationWithdrawnEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ApplicationWithdrawnEventWhereInput>;
  orderBy?: Maybe<Array<ApplicationWithdrawnEventOrderByInput>>;
};


export type QueryApplicationWithdrawnEventByUniqueInputArgs = {
  where: ApplicationWithdrawnEventWhereUniqueInput;
};


export type QueryApplicationWithdrawnEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ApplicationWithdrawnEventWhereInput>;
  orderBy?: Maybe<Array<ApplicationWithdrawnEventOrderByInput>>;
};


export type QueryAppliedOnOpeningEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<AppliedOnOpeningEventWhereInput>;
  orderBy?: Maybe<Array<AppliedOnOpeningEventOrderByInput>>;
};


export type QueryAppliedOnOpeningEventByUniqueInputArgs = {
  where: AppliedOnOpeningEventWhereUniqueInput;
};


export type QueryAppliedOnOpeningEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<AppliedOnOpeningEventWhereInput>;
  orderBy?: Maybe<Array<AppliedOnOpeningEventOrderByInput>>;
};


export type QueryBudgetBalanceSetEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetBalanceSetEventWhereInput>;
  orderBy?: Maybe<Array<BudgetBalanceSetEventOrderByInput>>;
};


export type QueryBudgetBalanceSetEventByUniqueInputArgs = {
  where: BudgetBalanceSetEventWhereUniqueInput;
};


export type QueryBudgetBalanceSetEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetBalanceSetEventWhereInput>;
  orderBy?: Maybe<Array<BudgetBalanceSetEventOrderByInput>>;
};


export type QueryBudgetIncrementUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetIncrementUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<BudgetIncrementUpdatedEventOrderByInput>>;
};


export type QueryBudgetIncrementUpdatedEventByUniqueInputArgs = {
  where: BudgetIncrementUpdatedEventWhereUniqueInput;
};


export type QueryBudgetIncrementUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetIncrementUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<BudgetIncrementUpdatedEventOrderByInput>>;
};


export type QueryBudgetPaymentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetPaymentWhereInput>;
  orderBy?: Maybe<Array<BudgetPaymentOrderByInput>>;
};


export type QueryBudgetPaymentByUniqueInputArgs = {
  where: BudgetPaymentWhereUniqueInput;
};


export type QueryBudgetPaymentsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetPaymentWhereInput>;
  orderBy?: Maybe<Array<BudgetPaymentOrderByInput>>;
};


export type QueryBudgetRefillEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetRefillEventWhereInput>;
  orderBy?: Maybe<Array<BudgetRefillEventOrderByInput>>;
};


export type QueryBudgetRefillEventByUniqueInputArgs = {
  where: BudgetRefillEventWhereUniqueInput;
};


export type QueryBudgetRefillEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetRefillEventWhereInput>;
  orderBy?: Maybe<Array<BudgetRefillEventOrderByInput>>;
};


export type QueryBudgetRefillPlannedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetRefillPlannedEventWhereInput>;
  orderBy?: Maybe<Array<BudgetRefillPlannedEventOrderByInput>>;
};


export type QueryBudgetRefillPlannedEventByUniqueInputArgs = {
  where: BudgetRefillPlannedEventWhereUniqueInput;
};


export type QueryBudgetRefillPlannedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetRefillPlannedEventWhereInput>;
  orderBy?: Maybe<Array<BudgetRefillPlannedEventOrderByInput>>;
};


export type QueryBudgetSetEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetSetEventWhereInput>;
  orderBy?: Maybe<Array<BudgetSetEventOrderByInput>>;
};


export type QueryBudgetSetEventByUniqueInputArgs = {
  where: BudgetSetEventWhereUniqueInput;
};


export type QueryBudgetSetEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetSetEventWhereInput>;
  orderBy?: Maybe<Array<BudgetSetEventOrderByInput>>;
};


export type QueryBudgetSpendingEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetSpendingEventWhereInput>;
  orderBy?: Maybe<Array<BudgetSpendingEventOrderByInput>>;
};


export type QueryBudgetSpendingEventByUniqueInputArgs = {
  where: BudgetSpendingEventWhereUniqueInput;
};


export type QueryBudgetSpendingEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetSpendingEventWhereInput>;
  orderBy?: Maybe<Array<BudgetSpendingEventOrderByInput>>;
};


export type QueryBudgetsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<BudgetWhereInput>;
  orderBy?: Maybe<Array<BudgetOrderByInput>>;
};


export type QueryBudgetByUniqueInputArgs = {
  where: BudgetWhereUniqueInput;
};


export type QueryBudgetsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<BudgetWhereInput>;
  orderBy?: Maybe<Array<BudgetOrderByInput>>;
};


export type QueryCandidacyNoteSetEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CandidacyNoteSetEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyNoteSetEventOrderByInput>>;
};


export type QueryCandidacyNoteSetEventByUniqueInputArgs = {
  where: CandidacyNoteSetEventWhereUniqueInput;
};


export type QueryCandidacyNoteSetEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CandidacyNoteSetEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyNoteSetEventOrderByInput>>;
};


export type QueryCandidacyStakeReleaseEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyStakeReleaseEventOrderByInput>>;
};


export type QueryCandidacyStakeReleaseEventByUniqueInputArgs = {
  where: CandidacyStakeReleaseEventWhereUniqueInput;
};


export type QueryCandidacyStakeReleaseEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyStakeReleaseEventOrderByInput>>;
};


export type QueryCandidacyWithdrawEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CandidacyWithdrawEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyWithdrawEventOrderByInput>>;
};


export type QueryCandidacyWithdrawEventByUniqueInputArgs = {
  where: CandidacyWithdrawEventWhereUniqueInput;
};


export type QueryCandidacyWithdrawEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CandidacyWithdrawEventWhereInput>;
  orderBy?: Maybe<Array<CandidacyWithdrawEventOrderByInput>>;
};


export type QueryCandidatesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CandidateWhereInput>;
  orderBy?: Maybe<Array<CandidateOrderByInput>>;
};


export type QueryCandidateByUniqueInputArgs = {
  where: CandidateWhereUniqueInput;
};


export type QueryCandidatesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CandidateWhereInput>;
  orderBy?: Maybe<Array<CandidateOrderByInput>>;
};


export type QueryCastVotesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CastVoteWhereInput>;
  orderBy?: Maybe<Array<CastVoteOrderByInput>>;
};


export type QueryCastVoteByUniqueInputArgs = {
  where: CastVoteWhereUniqueInput;
};


export type QueryCastVotesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CastVoteWhereInput>;
  orderBy?: Maybe<Array<CastVoteOrderByInput>>;
};


export type QueryCategoryArchivalStatusUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryArchivalStatusUpdatedEventOrderByInput>>;
};


export type QueryCategoryArchivalStatusUpdatedEventByUniqueInputArgs = {
  where: CategoryArchivalStatusUpdatedEventWhereUniqueInput;
};


export type QueryCategoryArchivalStatusUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryArchivalStatusUpdatedEventOrderByInput>>;
};


export type QueryCategoryCreatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryCreatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryCreatedEventOrderByInput>>;
};


export type QueryCategoryCreatedEventByUniqueInputArgs = {
  where: CategoryCreatedEventWhereUniqueInput;
};


export type QueryCategoryCreatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryCreatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryCreatedEventOrderByInput>>;
};


export type QueryCategoryDeletedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryDeletedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryDeletedEventOrderByInput>>;
};


export type QueryCategoryDeletedEventByUniqueInputArgs = {
  where: CategoryDeletedEventWhereUniqueInput;
};


export type QueryCategoryDeletedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryDeletedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryDeletedEventOrderByInput>>;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventOrderByInput>>;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventByUniqueInputArgs = {
  where: CategoryMembershipOfModeratorUpdatedEventWhereUniqueInput;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventOrderByInput>>;
};


export type QueryCategoryStickyThreadUpdateEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  orderBy?: Maybe<Array<CategoryStickyThreadUpdateEventOrderByInput>>;
};


export type QueryCategoryStickyThreadUpdateEventByUniqueInputArgs = {
  where: CategoryStickyThreadUpdateEventWhereUniqueInput;
};


export type QueryCategoryStickyThreadUpdateEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  orderBy?: Maybe<Array<CategoryStickyThreadUpdateEventOrderByInput>>;
};


export type QueryCouncilMembersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CouncilMemberWhereInput>;
  orderBy?: Maybe<Array<CouncilMemberOrderByInput>>;
};


export type QueryCouncilMemberByUniqueInputArgs = {
  where: CouncilMemberWhereUniqueInput;
};


export type QueryCouncilMembersConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CouncilMemberWhereInput>;
  orderBy?: Maybe<Array<CouncilMemberOrderByInput>>;
};


export type QueryCouncilStageUpdatesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CouncilStageUpdateWhereInput>;
  orderBy?: Maybe<Array<CouncilStageUpdateOrderByInput>>;
};


export type QueryCouncilStageUpdateByUniqueInputArgs = {
  where: CouncilStageUpdateWhereUniqueInput;
};


export type QueryCouncilStageUpdatesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CouncilStageUpdateWhereInput>;
  orderBy?: Maybe<Array<CouncilStageUpdateOrderByInput>>;
};


export type QueryCouncilorRewardUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CouncilorRewardUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CouncilorRewardUpdatedEventOrderByInput>>;
};


export type QueryCouncilorRewardUpdatedEventByUniqueInputArgs = {
  where: CouncilorRewardUpdatedEventWhereUniqueInput;
};


export type QueryCouncilorRewardUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CouncilorRewardUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<CouncilorRewardUpdatedEventOrderByInput>>;
};


export type QueryCuratorGroupsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<CuratorGroupWhereInput>;
  orderBy?: Maybe<Array<CuratorGroupOrderByInput>>;
};


export type QueryCuratorGroupByUniqueInputArgs = {
  where: CuratorGroupWhereUniqueInput;
};


export type QueryCuratorGroupsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<CuratorGroupWhereInput>;
  orderBy?: Maybe<Array<CuratorGroupOrderByInput>>;
};


export type QueryDataObjectsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<DataObjectWhereInput>;
  orderBy?: Maybe<Array<DataObjectOrderByInput>>;
};


export type QueryDataObjectByUniqueInputArgs = {
  where: DataObjectWhereUniqueInput;
};


export type QueryDataObjectsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<DataObjectWhereInput>;
  orderBy?: Maybe<Array<DataObjectOrderByInput>>;
};


export type QueryElectedCouncilsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ElectedCouncilWhereInput>;
  orderBy?: Maybe<Array<ElectedCouncilOrderByInput>>;
};


export type QueryElectedCouncilByUniqueInputArgs = {
  where: ElectedCouncilWhereUniqueInput;
};


export type QueryElectedCouncilsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ElectedCouncilWhereInput>;
  orderBy?: Maybe<Array<ElectedCouncilOrderByInput>>;
};


export type QueryElectionRoundsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ElectionRoundWhereInput>;
  orderBy?: Maybe<Array<ElectionRoundOrderByInput>>;
};


export type QueryElectionRoundByUniqueInputArgs = {
  where: ElectionRoundWhereUniqueInput;
};


export type QueryElectionRoundsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ElectionRoundWhereInput>;
  orderBy?: Maybe<Array<ElectionRoundOrderByInput>>;
};


export type QueryEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<EventWhereInput>;
  orderBy?: Maybe<Array<EventOrderByInput>>;
};


export type QueryForumCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumCategoryWhereInput>;
  orderBy?: Maybe<Array<ForumCategoryOrderByInput>>;
};


export type QueryForumCategoryByUniqueInputArgs = {
  where: ForumCategoryWhereUniqueInput;
};


export type QueryForumCategoriesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumCategoryWhereInput>;
  orderBy?: Maybe<Array<ForumCategoryOrderByInput>>;
};


export type QueryForumPollAlternativesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumPollAlternativeWhereInput>;
  orderBy?: Maybe<Array<ForumPollAlternativeOrderByInput>>;
};


export type QueryForumPollAlternativeByUniqueInputArgs = {
  where: ForumPollAlternativeWhereUniqueInput;
};


export type QueryForumPollAlternativesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumPollAlternativeWhereInput>;
  orderBy?: Maybe<Array<ForumPollAlternativeOrderByInput>>;
};


export type QueryForumPollsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumPollWhereInput>;
  orderBy?: Maybe<Array<ForumPollOrderByInput>>;
};


export type QueryForumPollByUniqueInputArgs = {
  where: ForumPollWhereUniqueInput;
};


export type QueryForumPollsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumPollWhereInput>;
  orderBy?: Maybe<Array<ForumPollOrderByInput>>;
};


export type QueryForumPostReactionsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumPostReactionWhereInput>;
  orderBy?: Maybe<Array<ForumPostReactionOrderByInput>>;
};


export type QueryForumPostReactionByUniqueInputArgs = {
  where: ForumPostReactionWhereUniqueInput;
};


export type QueryForumPostReactionsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumPostReactionWhereInput>;
  orderBy?: Maybe<Array<ForumPostReactionOrderByInput>>;
};


export type QueryForumPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumPostWhereInput>;
  orderBy?: Maybe<Array<ForumPostOrderByInput>>;
};


export type QueryForumPostByUniqueInputArgs = {
  where: ForumPostWhereUniqueInput;
};


export type QueryForumPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumPostWhereInput>;
  orderBy?: Maybe<Array<ForumPostOrderByInput>>;
};


export type QueryForumThreadTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumThreadTagWhereInput>;
  orderBy?: Maybe<Array<ForumThreadTagOrderByInput>>;
};


export type QueryForumThreadTagByUniqueInputArgs = {
  where: ForumThreadTagWhereUniqueInput;
};


export type QueryForumThreadTagsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumThreadTagWhereInput>;
  orderBy?: Maybe<Array<ForumThreadTagOrderByInput>>;
};


export type QueryForumThreadsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ForumThreadWhereInput>;
  orderBy?: Maybe<Array<ForumThreadOrderByInput>>;
};


export type QueryForumThreadByUniqueInputArgs = {
  where: ForumThreadWhereUniqueInput;
};


export type QueryForumThreadsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ForumThreadWhereInput>;
  orderBy?: Maybe<Array<ForumThreadOrderByInput>>;
};


export type QueryFundingRequestDestinationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<FundingRequestDestinationWhereInput>;
  orderBy?: Maybe<Array<FundingRequestDestinationOrderByInput>>;
};


export type QueryFundingRequestDestinationByUniqueInputArgs = {
  where: FundingRequestDestinationWhereUniqueInput;
};


export type QueryFundingRequestDestinationsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<FundingRequestDestinationWhereInput>;
  orderBy?: Maybe<Array<FundingRequestDestinationOrderByInput>>;
};


export type QueryFundingRequestDestinationsListsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<FundingRequestDestinationsListWhereInput>;
  orderBy?: Maybe<Array<FundingRequestDestinationsListOrderByInput>>;
};


export type QueryFundingRequestDestinationsListByUniqueInputArgs = {
  where: FundingRequestDestinationsListWhereUniqueInput;
};


export type QueryFundingRequestDestinationsListsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<FundingRequestDestinationsListWhereInput>;
  orderBy?: Maybe<Array<FundingRequestDestinationsListOrderByInput>>;
};


export type QueryChannelCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ChannelCategoryWhereInput>;
  orderBy?: Maybe<Array<ChannelCategoryOrderByInput>>;
};


export type QueryChannelCategoryByUniqueInputArgs = {
  where: ChannelCategoryWhereUniqueInput;
};


export type QueryChannelCategoriesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ChannelCategoryWhereInput>;
  orderBy?: Maybe<Array<ChannelCategoryOrderByInput>>;
};


export type QueryChannelsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ChannelWhereInput>;
  orderBy?: Maybe<Array<ChannelOrderByInput>>;
};


export type QueryChannelByUniqueInputArgs = {
  where: ChannelWhereUniqueInput;
};


export type QueryChannelsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ChannelWhereInput>;
  orderBy?: Maybe<Array<ChannelOrderByInput>>;
};


export type QueryInitialInvitationBalanceUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<InitialInvitationBalanceUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<InitialInvitationBalanceUpdatedEventOrderByInput>>;
};


export type QueryInitialInvitationBalanceUpdatedEventByUniqueInputArgs = {
  where: InitialInvitationBalanceUpdatedEventWhereUniqueInput;
};


export type QueryInitialInvitationBalanceUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<InitialInvitationBalanceUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<InitialInvitationBalanceUpdatedEventOrderByInput>>;
};


export type QueryInitialInvitationCountUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<InitialInvitationCountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<InitialInvitationCountUpdatedEventOrderByInput>>;
};


export type QueryInitialInvitationCountUpdatedEventByUniqueInputArgs = {
  where: InitialInvitationCountUpdatedEventWhereUniqueInput;
};


export type QueryInitialInvitationCountUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<InitialInvitationCountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<InitialInvitationCountUpdatedEventOrderByInput>>;
};


export type QueryInvitesTransferredEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<InvitesTransferredEventWhereInput>;
  orderBy?: Maybe<Array<InvitesTransferredEventOrderByInput>>;
};


export type QueryInvitesTransferredEventByUniqueInputArgs = {
  where: InvitesTransferredEventWhereUniqueInput;
};


export type QueryInvitesTransferredEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<InvitesTransferredEventWhereInput>;
  orderBy?: Maybe<Array<InvitesTransferredEventOrderByInput>>;
};


export type QueryLanguagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<LanguageWhereInput>;
  orderBy?: Maybe<Array<LanguageOrderByInput>>;
};


export type QueryLanguageByUniqueInputArgs = {
  where: LanguageWhereUniqueInput;
};


export type QueryLanguagesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<LanguageWhereInput>;
  orderBy?: Maybe<Array<LanguageOrderByInput>>;
};


export type QueryLeaderInvitationQuotaUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<LeaderInvitationQuotaUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<LeaderInvitationQuotaUpdatedEventOrderByInput>>;
};


export type QueryLeaderInvitationQuotaUpdatedEventByUniqueInputArgs = {
  where: LeaderInvitationQuotaUpdatedEventWhereUniqueInput;
};


export type QueryLeaderInvitationQuotaUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<LeaderInvitationQuotaUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<LeaderInvitationQuotaUpdatedEventOrderByInput>>;
};


export type QueryLeaderSetEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<LeaderSetEventWhereInput>;
  orderBy?: Maybe<Array<LeaderSetEventOrderByInput>>;
};


export type QueryLeaderSetEventByUniqueInputArgs = {
  where: LeaderSetEventWhereUniqueInput;
};


export type QueryLeaderSetEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<LeaderSetEventWhereInput>;
  orderBy?: Maybe<Array<LeaderSetEventOrderByInput>>;
};


export type QueryLeaderUnsetEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<LeaderUnsetEventWhereInput>;
  orderBy?: Maybe<Array<LeaderUnsetEventOrderByInput>>;
};


export type QueryLeaderUnsetEventByUniqueInputArgs = {
  where: LeaderUnsetEventWhereUniqueInput;
};


export type QueryLeaderUnsetEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<LeaderUnsetEventWhereInput>;
  orderBy?: Maybe<Array<LeaderUnsetEventOrderByInput>>;
};


export type QueryLicensesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<LicenseWhereInput>;
  orderBy?: Maybe<Array<LicenseOrderByInput>>;
};


export type QueryLicenseByUniqueInputArgs = {
  where: LicenseWhereUniqueInput;
};


export type QueryLicensesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<LicenseWhereInput>;
  orderBy?: Maybe<Array<LicenseOrderByInput>>;
};


export type QueryMemberAccountsUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberAccountsUpdatedEventOrderByInput>>;
};


export type QueryMemberAccountsUpdatedEventByUniqueInputArgs = {
  where: MemberAccountsUpdatedEventWhereUniqueInput;
};


export type QueryMemberAccountsUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberAccountsUpdatedEventOrderByInput>>;
};


export type QueryMemberInvitedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MemberInvitedEventWhereInput>;
  orderBy?: Maybe<Array<MemberInvitedEventOrderByInput>>;
};


export type QueryMemberInvitedEventByUniqueInputArgs = {
  where: MemberInvitedEventWhereUniqueInput;
};


export type QueryMemberInvitedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MemberInvitedEventWhereInput>;
  orderBy?: Maybe<Array<MemberInvitedEventOrderByInput>>;
};


export type QueryMemberMetadataArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MemberMetadataWhereInput>;
  orderBy?: Maybe<Array<MemberMetadataOrderByInput>>;
};


export type QueryMemberMetadataByUniqueInputArgs = {
  where: MemberMetadataWhereUniqueInput;
};


export type QueryMemberMetadataConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MemberMetadataWhereInput>;
  orderBy?: Maybe<Array<MemberMetadataOrderByInput>>;
};


export type QueryMemberProfileUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MemberProfileUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberProfileUpdatedEventOrderByInput>>;
};


export type QueryMemberProfileUpdatedEventByUniqueInputArgs = {
  where: MemberProfileUpdatedEventWhereUniqueInput;
};


export type QueryMemberProfileUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MemberProfileUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberProfileUpdatedEventOrderByInput>>;
};


export type QueryMemberVerificationStatusUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberVerificationStatusUpdatedEventOrderByInput>>;
};


export type QueryMemberVerificationStatusUpdatedEventByUniqueInputArgs = {
  where: MemberVerificationStatusUpdatedEventWhereUniqueInput;
};


export type QueryMemberVerificationStatusUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MemberVerificationStatusUpdatedEventOrderByInput>>;
};


export type QueryMembershipBoughtEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MembershipBoughtEventWhereInput>;
  orderBy?: Maybe<Array<MembershipBoughtEventOrderByInput>>;
};


export type QueryMembershipBoughtEventByUniqueInputArgs = {
  where: MembershipBoughtEventWhereUniqueInput;
};


export type QueryMembershipBoughtEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MembershipBoughtEventWhereInput>;
  orderBy?: Maybe<Array<MembershipBoughtEventOrderByInput>>;
};


export type QueryMembershipPriceUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MembershipPriceUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MembershipPriceUpdatedEventOrderByInput>>;
};


export type QueryMembershipPriceUpdatedEventByUniqueInputArgs = {
  where: MembershipPriceUpdatedEventWhereUniqueInput;
};


export type QueryMembershipPriceUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MembershipPriceUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<MembershipPriceUpdatedEventOrderByInput>>;
};


export type QueryMembershipSystemSnapshotsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MembershipSystemSnapshotWhereInput>;
  orderBy?: Maybe<Array<MembershipSystemSnapshotOrderByInput>>;
};


export type QueryMembershipSystemSnapshotByUniqueInputArgs = {
  where: MembershipSystemSnapshotWhereUniqueInput;
};


export type QueryMembershipSystemSnapshotsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MembershipSystemSnapshotWhereInput>;
  orderBy?: Maybe<Array<MembershipSystemSnapshotOrderByInput>>;
};


export type QueryMembershipsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<MembershipWhereInput>;
  orderBy?: Maybe<Array<MembershipOrderByInput>>;
};


export type QueryMembershipByUniqueInputArgs = {
  where: MembershipWhereUniqueInput;
};


export type QueryMembershipsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<MembershipWhereInput>;
  orderBy?: Maybe<Array<MembershipOrderByInput>>;
};


export type QueryNewCandidateEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<NewCandidateEventWhereInput>;
  orderBy?: Maybe<Array<NewCandidateEventOrderByInput>>;
};


export type QueryNewCandidateEventByUniqueInputArgs = {
  where: NewCandidateEventWhereUniqueInput;
};


export type QueryNewCandidateEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<NewCandidateEventWhereInput>;
  orderBy?: Maybe<Array<NewCandidateEventOrderByInput>>;
};


export type QueryNewCouncilElectedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<NewCouncilElectedEventWhereInput>;
  orderBy?: Maybe<Array<NewCouncilElectedEventOrderByInput>>;
};


export type QueryNewCouncilElectedEventByUniqueInputArgs = {
  where: NewCouncilElectedEventWhereUniqueInput;
};


export type QueryNewCouncilElectedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<NewCouncilElectedEventWhereInput>;
  orderBy?: Maybe<Array<NewCouncilElectedEventOrderByInput>>;
};


export type QueryNewCouncilNotElectedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<NewCouncilNotElectedEventWhereInput>;
  orderBy?: Maybe<Array<NewCouncilNotElectedEventOrderByInput>>;
};


export type QueryNewCouncilNotElectedEventByUniqueInputArgs = {
  where: NewCouncilNotElectedEventWhereUniqueInput;
};


export type QueryNewCouncilNotElectedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<NewCouncilNotElectedEventWhereInput>;
  orderBy?: Maybe<Array<NewCouncilNotElectedEventOrderByInput>>;
};


export type QueryNewMissedRewardLevelReachedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  orderBy?: Maybe<Array<NewMissedRewardLevelReachedEventOrderByInput>>;
};


export type QueryNewMissedRewardLevelReachedEventByUniqueInputArgs = {
  where: NewMissedRewardLevelReachedEventWhereUniqueInput;
};


export type QueryNewMissedRewardLevelReachedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  orderBy?: Maybe<Array<NewMissedRewardLevelReachedEventOrderByInput>>;
};


export type QueryNotEnoughCandidatesEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<NotEnoughCandidatesEventWhereInput>;
  orderBy?: Maybe<Array<NotEnoughCandidatesEventOrderByInput>>;
};


export type QueryNotEnoughCandidatesEventByUniqueInputArgs = {
  where: NotEnoughCandidatesEventWhereUniqueInput;
};


export type QueryNotEnoughCandidatesEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<NotEnoughCandidatesEventWhereInput>;
  orderBy?: Maybe<Array<NotEnoughCandidatesEventOrderByInput>>;
};


export type QueryOpeningAddedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<OpeningAddedEventWhereInput>;
  orderBy?: Maybe<Array<OpeningAddedEventOrderByInput>>;
};


export type QueryOpeningAddedEventByUniqueInputArgs = {
  where: OpeningAddedEventWhereUniqueInput;
};


export type QueryOpeningAddedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<OpeningAddedEventWhereInput>;
  orderBy?: Maybe<Array<OpeningAddedEventOrderByInput>>;
};


export type QueryOpeningCanceledEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<OpeningCanceledEventWhereInput>;
  orderBy?: Maybe<Array<OpeningCanceledEventOrderByInput>>;
};


export type QueryOpeningCanceledEventByUniqueInputArgs = {
  where: OpeningCanceledEventWhereUniqueInput;
};


export type QueryOpeningCanceledEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<OpeningCanceledEventWhereInput>;
  orderBy?: Maybe<Array<OpeningCanceledEventOrderByInput>>;
};


export type QueryOpeningFilledEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<OpeningFilledEventWhereInput>;
  orderBy?: Maybe<Array<OpeningFilledEventOrderByInput>>;
};


export type QueryOpeningFilledEventByUniqueInputArgs = {
  where: OpeningFilledEventWhereUniqueInput;
};


export type QueryOpeningFilledEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<OpeningFilledEventWhereInput>;
  orderBy?: Maybe<Array<OpeningFilledEventOrderByInput>>;
};


export type QueryPostAddedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<PostAddedEventWhereInput>;
  orderBy?: Maybe<Array<PostAddedEventOrderByInput>>;
};


export type QueryPostAddedEventByUniqueInputArgs = {
  where: PostAddedEventWhereUniqueInput;
};


export type QueryPostAddedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostAddedEventWhereInput>;
  orderBy?: Maybe<Array<PostAddedEventOrderByInput>>;
};


export type QueryPostDeletedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<PostDeletedEventWhereInput>;
  orderBy?: Maybe<Array<PostDeletedEventOrderByInput>>;
};


export type QueryPostDeletedEventByUniqueInputArgs = {
  where: PostDeletedEventWhereUniqueInput;
};


export type QueryPostDeletedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostDeletedEventWhereInput>;
  orderBy?: Maybe<Array<PostDeletedEventOrderByInput>>;
};


export type QueryPostModeratedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<PostModeratedEventWhereInput>;
  orderBy?: Maybe<Array<PostModeratedEventOrderByInput>>;
};


export type QueryPostModeratedEventByUniqueInputArgs = {
  where: PostModeratedEventWhereUniqueInput;
};


export type QueryPostModeratedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostModeratedEventWhereInput>;
  orderBy?: Maybe<Array<PostModeratedEventOrderByInput>>;
};


export type QueryPostReactedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<PostReactedEventWhereInput>;
  orderBy?: Maybe<Array<PostReactedEventOrderByInput>>;
};


export type QueryPostReactedEventByUniqueInputArgs = {
  where: PostReactedEventWhereUniqueInput;
};


export type QueryPostReactedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostReactedEventWhereInput>;
  orderBy?: Maybe<Array<PostReactedEventOrderByInput>>;
};


export type QueryPostTextUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<PostTextUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<PostTextUpdatedEventOrderByInput>>;
};


export type QueryPostTextUpdatedEventByUniqueInputArgs = {
  where: PostTextUpdatedEventWhereUniqueInput;
};


export type QueryPostTextUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<PostTextUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<PostTextUpdatedEventOrderByInput>>;
};


export type QueryProposalCancelledEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalCancelledEventWhereInput>;
  orderBy?: Maybe<Array<ProposalCancelledEventOrderByInput>>;
};


export type QueryProposalCancelledEventByUniqueInputArgs = {
  where: ProposalCancelledEventWhereUniqueInput;
};


export type QueryProposalCancelledEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalCancelledEventWhereInput>;
  orderBy?: Maybe<Array<ProposalCancelledEventOrderByInput>>;
};


export type QueryProposalCreatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalCreatedEventOrderByInput>>;
};


export type QueryProposalCreatedEventByUniqueInputArgs = {
  where: ProposalCreatedEventWhereUniqueInput;
};


export type QueryProposalCreatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalCreatedEventOrderByInput>>;
};


export type QueryProposalDecisionMadeEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDecisionMadeEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDecisionMadeEventOrderByInput>>;
};


export type QueryProposalDecisionMadeEventByUniqueInputArgs = {
  where: ProposalDecisionMadeEventWhereUniqueInput;
};


export type QueryProposalDecisionMadeEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDecisionMadeEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDecisionMadeEventOrderByInput>>;
};


export type QueryProposalDiscussionPostCreatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostCreatedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostCreatedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostCreatedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostCreatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostCreatedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostDeletedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostDeletedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostDeletedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostDeletedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostDeletedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostDeletedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostUpdatedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostUpdatedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostUpdatedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostUpdatedEventOrderByInput>>;
};


export type QueryProposalDiscussionPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionPostWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostOrderByInput>>;
};


export type QueryProposalDiscussionPostByUniqueInputArgs = {
  where: ProposalDiscussionPostWhereUniqueInput;
};


export type QueryProposalDiscussionPostsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionPostWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionPostOrderByInput>>;
};


export type QueryProposalDiscussionThreadModeChangedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadModeChangedEventOrderByInput>>;
};


export type QueryProposalDiscussionThreadModeChangedEventByUniqueInputArgs = {
  where: ProposalDiscussionThreadModeChangedEventWhereUniqueInput;
};


export type QueryProposalDiscussionThreadModeChangedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadModeChangedEventOrderByInput>>;
};


export type QueryProposalDiscussionThreadsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionThreadWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadOrderByInput>>;
};


export type QueryProposalDiscussionThreadByUniqueInputArgs = {
  where: ProposalDiscussionThreadWhereUniqueInput;
};


export type QueryProposalDiscussionThreadsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionThreadWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadOrderByInput>>;
};


export type QueryProposalDiscussionWhitelistsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionWhitelistOrderByInput>>;
};


export type QueryProposalDiscussionWhitelistByUniqueInputArgs = {
  where: ProposalDiscussionWhitelistWhereUniqueInput;
};


export type QueryProposalDiscussionWhitelistsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  orderBy?: Maybe<Array<ProposalDiscussionWhitelistOrderByInput>>;
};


export type QueryProposalExecutedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalExecutedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalExecutedEventOrderByInput>>;
};


export type QueryProposalExecutedEventByUniqueInputArgs = {
  where: ProposalExecutedEventWhereUniqueInput;
};


export type QueryProposalExecutedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalExecutedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalExecutedEventOrderByInput>>;
};


export type QueryProposalStatusUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalStatusUpdatedEventOrderByInput>>;
};


export type QueryProposalStatusUpdatedEventByUniqueInputArgs = {
  where: ProposalStatusUpdatedEventWhereUniqueInput;
};


export type QueryProposalStatusUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalStatusUpdatedEventOrderByInput>>;
};


export type QueryProposalVotedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalVotedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalVotedEventOrderByInput>>;
};


export type QueryProposalVotedEventByUniqueInputArgs = {
  where: ProposalVotedEventWhereUniqueInput;
};


export type QueryProposalVotedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalVotedEventWhereInput>;
  orderBy?: Maybe<Array<ProposalVotedEventOrderByInput>>;
};


export type QueryProposalsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ProposalWhereInput>;
  orderBy?: Maybe<Array<ProposalOrderByInput>>;
};


export type QueryProposalByUniqueInputArgs = {
  where: ProposalWhereUniqueInput;
};


export type QueryProposalsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ProposalWhereInput>;
  orderBy?: Maybe<Array<ProposalOrderByInput>>;
};


export type QueryChannelCategoriesByNameArgs = {
  whereChannelCategory?: Maybe<ChannelCategoryWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryMembersByHandleArgs = {
  whereMembership?: Maybe<MembershipWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryPostsByTextArgs = {
  whereForumPost?: Maybe<ForumPostWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryProposalsByDescriptionArgs = {
  whereProposal?: Maybe<ProposalWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryProposalsByTitleArgs = {
  whereProposal?: Maybe<ProposalWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QuerySearchArgs = {
  whereVideo?: Maybe<VideoWhereInput>;
  whereChannel?: Maybe<ChannelWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryThreadsByTitleArgs = {
  whereForumThread?: Maybe<ForumThreadWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryVideoCategoriesByNameArgs = {
  whereVideoCategory?: Maybe<VideoCategoryWhereInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QueryReferendumFinishedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ReferendumFinishedEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumFinishedEventOrderByInput>>;
};


export type QueryReferendumFinishedEventByUniqueInputArgs = {
  where: ReferendumFinishedEventWhereUniqueInput;
};


export type QueryReferendumFinishedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReferendumFinishedEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumFinishedEventOrderByInput>>;
};


export type QueryReferendumStageRevealingOptionResultsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  orderBy?: Maybe<Array<ReferendumStageRevealingOptionResultOrderByInput>>;
};


export type QueryReferendumStageRevealingOptionResultByUniqueInputArgs = {
  where: ReferendumStageRevealingOptionResultWhereUniqueInput;
};


export type QueryReferendumStageRevealingOptionResultsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  orderBy?: Maybe<Array<ReferendumStageRevealingOptionResultOrderByInput>>;
};


export type QueryReferendumStartedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ReferendumStartedEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumStartedEventOrderByInput>>;
};


export type QueryReferendumStartedEventByUniqueInputArgs = {
  where: ReferendumStartedEventWhereUniqueInput;
};


export type QueryReferendumStartedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReferendumStartedEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumStartedEventOrderByInput>>;
};


export type QueryReferendumStartedForcefullyEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ReferendumStartedForcefullyEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumStartedForcefullyEventOrderByInput>>;
};


export type QueryReferendumStartedForcefullyEventByUniqueInputArgs = {
  where: ReferendumStartedForcefullyEventWhereUniqueInput;
};


export type QueryReferendumStartedForcefullyEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReferendumStartedForcefullyEventWhereInput>;
  orderBy?: Maybe<Array<ReferendumStartedForcefullyEventOrderByInput>>;
};


export type QueryReferralCutUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ReferralCutUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ReferralCutUpdatedEventOrderByInput>>;
};


export type QueryReferralCutUpdatedEventByUniqueInputArgs = {
  where: ReferralCutUpdatedEventWhereUniqueInput;
};


export type QueryReferralCutUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ReferralCutUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ReferralCutUpdatedEventOrderByInput>>;
};


export type QueryRequestFundedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<RequestFundedEventWhereInput>;
  orderBy?: Maybe<Array<RequestFundedEventOrderByInput>>;
};


export type QueryRequestFundedEventByUniqueInputArgs = {
  where: RequestFundedEventWhereUniqueInput;
};


export type QueryRequestFundedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RequestFundedEventWhereInput>;
  orderBy?: Maybe<Array<RequestFundedEventOrderByInput>>;
};


export type QueryRevealingStageStartedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<RevealingStageStartedEventWhereInput>;
  orderBy?: Maybe<Array<RevealingStageStartedEventOrderByInput>>;
};


export type QueryRevealingStageStartedEventByUniqueInputArgs = {
  where: RevealingStageStartedEventWhereUniqueInput;
};


export type QueryRevealingStageStartedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RevealingStageStartedEventWhereInput>;
  orderBy?: Maybe<Array<RevealingStageStartedEventOrderByInput>>;
};


export type QueryRewardPaidEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<RewardPaidEventWhereInput>;
  orderBy?: Maybe<Array<RewardPaidEventOrderByInput>>;
};


export type QueryRewardPaidEventByUniqueInputArgs = {
  where: RewardPaidEventWhereUniqueInput;
};


export type QueryRewardPaidEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RewardPaidEventWhereInput>;
  orderBy?: Maybe<Array<RewardPaidEventOrderByInput>>;
};


export type QueryRewardPaymentEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<RewardPaymentEventWhereInput>;
  orderBy?: Maybe<Array<RewardPaymentEventOrderByInput>>;
};


export type QueryRewardPaymentEventByUniqueInputArgs = {
  where: RewardPaymentEventWhereUniqueInput;
};


export type QueryRewardPaymentEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RewardPaymentEventWhereInput>;
  orderBy?: Maybe<Array<RewardPaymentEventOrderByInput>>;
};


export type QueryRuntimeWasmBytecodesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<RuntimeWasmBytecodeWhereInput>;
  orderBy?: Maybe<Array<RuntimeWasmBytecodeOrderByInput>>;
};


export type QueryRuntimeWasmBytecodeByUniqueInputArgs = {
  where: RuntimeWasmBytecodeWhereUniqueInput;
};


export type QueryRuntimeWasmBytecodesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<RuntimeWasmBytecodeWhereInput>;
  orderBy?: Maybe<Array<RuntimeWasmBytecodeOrderByInput>>;
};


export type QueryStakeDecreasedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakeDecreasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeDecreasedEventOrderByInput>>;
};


export type QueryStakeDecreasedEventByUniqueInputArgs = {
  where: StakeDecreasedEventWhereUniqueInput;
};


export type QueryStakeDecreasedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakeDecreasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeDecreasedEventOrderByInput>>;
};


export type QueryStakeIncreasedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakeIncreasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeIncreasedEventOrderByInput>>;
};


export type QueryStakeIncreasedEventByUniqueInputArgs = {
  where: StakeIncreasedEventWhereUniqueInput;
};


export type QueryStakeIncreasedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakeIncreasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeIncreasedEventOrderByInput>>;
};


export type QueryStakeReleasedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakeReleasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeReleasedEventOrderByInput>>;
};


export type QueryStakeReleasedEventByUniqueInputArgs = {
  where: StakeReleasedEventWhereUniqueInput;
};


export type QueryStakeReleasedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakeReleasedEventWhereInput>;
  orderBy?: Maybe<Array<StakeReleasedEventOrderByInput>>;
};


export type QueryStakeSlashedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakeSlashedEventWhereInput>;
  orderBy?: Maybe<Array<StakeSlashedEventOrderByInput>>;
};


export type QueryStakeSlashedEventByUniqueInputArgs = {
  where: StakeSlashedEventWhereUniqueInput;
};


export type QueryStakeSlashedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakeSlashedEventWhereInput>;
  orderBy?: Maybe<Array<StakeSlashedEventOrderByInput>>;
};


export type QueryStakingAccountAddedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakingAccountAddedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountAddedEventOrderByInput>>;
};


export type QueryStakingAccountAddedEventByUniqueInputArgs = {
  where: StakingAccountAddedEventWhereUniqueInput;
};


export type QueryStakingAccountAddedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakingAccountAddedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountAddedEventOrderByInput>>;
};


export type QueryStakingAccountConfirmedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakingAccountConfirmedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountConfirmedEventOrderByInput>>;
};


export type QueryStakingAccountConfirmedEventByUniqueInputArgs = {
  where: StakingAccountConfirmedEventWhereUniqueInput;
};


export type QueryStakingAccountConfirmedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakingAccountConfirmedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountConfirmedEventOrderByInput>>;
};


export type QueryStakingAccountRemovedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StakingAccountRemovedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountRemovedEventOrderByInput>>;
};


export type QueryStakingAccountRemovedEventByUniqueInputArgs = {
  where: StakingAccountRemovedEventWhereUniqueInput;
};


export type QueryStakingAccountRemovedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StakingAccountRemovedEventWhereInput>;
  orderBy?: Maybe<Array<StakingAccountRemovedEventOrderByInput>>;
};


export type QueryStatusTextChangedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<StatusTextChangedEventWhereInput>;
  orderBy?: Maybe<Array<StatusTextChangedEventOrderByInput>>;
};


export type QueryStatusTextChangedEventByUniqueInputArgs = {
  where: StatusTextChangedEventWhereUniqueInput;
};


export type QueryStatusTextChangedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<StatusTextChangedEventWhereInput>;
  orderBy?: Maybe<Array<StatusTextChangedEventOrderByInput>>;
};


export type QueryTerminatedLeaderEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<TerminatedLeaderEventWhereInput>;
  orderBy?: Maybe<Array<TerminatedLeaderEventOrderByInput>>;
};


export type QueryTerminatedLeaderEventByUniqueInputArgs = {
  where: TerminatedLeaderEventWhereUniqueInput;
};


export type QueryTerminatedLeaderEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TerminatedLeaderEventWhereInput>;
  orderBy?: Maybe<Array<TerminatedLeaderEventOrderByInput>>;
};


export type QueryTerminatedWorkerEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<TerminatedWorkerEventWhereInput>;
  orderBy?: Maybe<Array<TerminatedWorkerEventOrderByInput>>;
};


export type QueryTerminatedWorkerEventByUniqueInputArgs = {
  where: TerminatedWorkerEventWhereUniqueInput;
};


export type QueryTerminatedWorkerEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<TerminatedWorkerEventWhereInput>;
  orderBy?: Maybe<Array<TerminatedWorkerEventOrderByInput>>;
};


export type QueryThreadCreatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ThreadCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadCreatedEventOrderByInput>>;
};


export type QueryThreadCreatedEventByUniqueInputArgs = {
  where: ThreadCreatedEventWhereUniqueInput;
};


export type QueryThreadCreatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ThreadCreatedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadCreatedEventOrderByInput>>;
};


export type QueryThreadDeletedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ThreadDeletedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadDeletedEventOrderByInput>>;
};


export type QueryThreadDeletedEventByUniqueInputArgs = {
  where: ThreadDeletedEventWhereUniqueInput;
};


export type QueryThreadDeletedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ThreadDeletedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadDeletedEventOrderByInput>>;
};


export type QueryThreadMetadataUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadMetadataUpdatedEventOrderByInput>>;
};


export type QueryThreadMetadataUpdatedEventByUniqueInputArgs = {
  where: ThreadMetadataUpdatedEventWhereUniqueInput;
};


export type QueryThreadMetadataUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadMetadataUpdatedEventOrderByInput>>;
};


export type QueryThreadModeratedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ThreadModeratedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadModeratedEventOrderByInput>>;
};


export type QueryThreadModeratedEventByUniqueInputArgs = {
  where: ThreadModeratedEventWhereUniqueInput;
};


export type QueryThreadModeratedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ThreadModeratedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadModeratedEventOrderByInput>>;
};


export type QueryThreadMovedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<ThreadMovedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadMovedEventOrderByInput>>;
};


export type QueryThreadMovedEventByUniqueInputArgs = {
  where: ThreadMovedEventWhereUniqueInput;
};


export type QueryThreadMovedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<ThreadMovedEventWhereInput>;
  orderBy?: Maybe<Array<ThreadMovedEventOrderByInput>>;
};


export type QueryUpcomingWorkingGroupOpeningsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  orderBy?: Maybe<Array<UpcomingWorkingGroupOpeningOrderByInput>>;
};


export type QueryUpcomingWorkingGroupOpeningByUniqueInputArgs = {
  where: UpcomingWorkingGroupOpeningWhereUniqueInput;
};


export type QueryUpcomingWorkingGroupOpeningsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  orderBy?: Maybe<Array<UpcomingWorkingGroupOpeningOrderByInput>>;
};


export type QueryVideoCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VideoCategoryWhereInput>;
  orderBy?: Maybe<Array<VideoCategoryOrderByInput>>;
};


export type QueryVideoCategoryByUniqueInputArgs = {
  where: VideoCategoryWhereUniqueInput;
};


export type QueryVideoCategoriesConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VideoCategoryWhereInput>;
  orderBy?: Maybe<Array<VideoCategoryOrderByInput>>;
};


export type QueryVideoMediaEncodingsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VideoMediaEncodingWhereInput>;
  orderBy?: Maybe<Array<VideoMediaEncodingOrderByInput>>;
};


export type QueryVideoMediaEncodingByUniqueInputArgs = {
  where: VideoMediaEncodingWhereUniqueInput;
};


export type QueryVideoMediaEncodingsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VideoMediaEncodingWhereInput>;
  orderBy?: Maybe<Array<VideoMediaEncodingOrderByInput>>;
};


export type QueryVideoMediaMetadataArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VideoMediaMetadataWhereInput>;
  orderBy?: Maybe<Array<VideoMediaMetadataOrderByInput>>;
};


export type QueryVideoMediaMetadataByUniqueInputArgs = {
  where: VideoMediaMetadataWhereUniqueInput;
};


export type QueryVideoMediaMetadataConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VideoMediaMetadataWhereInput>;
  orderBy?: Maybe<Array<VideoMediaMetadataOrderByInput>>;
};


export type QueryVideosArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VideoWhereInput>;
  orderBy?: Maybe<Array<VideoOrderByInput>>;
};


export type QueryVideoByUniqueInputArgs = {
  where: VideoWhereUniqueInput;
};


export type QueryVideosConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VideoWhereInput>;
  orderBy?: Maybe<Array<VideoOrderByInput>>;
};


export type QueryVoteCastEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VoteCastEventWhereInput>;
  orderBy?: Maybe<Array<VoteCastEventOrderByInput>>;
};


export type QueryVoteCastEventByUniqueInputArgs = {
  where: VoteCastEventWhereUniqueInput;
};


export type QueryVoteCastEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VoteCastEventWhereInput>;
  orderBy?: Maybe<Array<VoteCastEventOrderByInput>>;
};


export type QueryVoteOnPollEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VoteOnPollEventWhereInput>;
  orderBy?: Maybe<Array<VoteOnPollEventOrderByInput>>;
};


export type QueryVoteOnPollEventByUniqueInputArgs = {
  where: VoteOnPollEventWhereUniqueInput;
};


export type QueryVoteOnPollEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VoteOnPollEventWhereInput>;
  orderBy?: Maybe<Array<VoteOnPollEventOrderByInput>>;
};


export type QueryVoteRevealedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VoteRevealedEventWhereInput>;
  orderBy?: Maybe<Array<VoteRevealedEventOrderByInput>>;
};


export type QueryVoteRevealedEventByUniqueInputArgs = {
  where: VoteRevealedEventWhereUniqueInput;
};


export type QueryVoteRevealedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VoteRevealedEventWhereInput>;
  orderBy?: Maybe<Array<VoteRevealedEventOrderByInput>>;
};


export type QueryVotingPeriodStartedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<VotingPeriodStartedEventWhereInput>;
  orderBy?: Maybe<Array<VotingPeriodStartedEventOrderByInput>>;
};


export type QueryVotingPeriodStartedEventByUniqueInputArgs = {
  where: VotingPeriodStartedEventWhereUniqueInput;
};


export type QueryVotingPeriodStartedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<VotingPeriodStartedEventWhereInput>;
  orderBy?: Maybe<Array<VotingPeriodStartedEventOrderByInput>>;
};


export type QueryWorkerExitedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerExitedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerExitedEventOrderByInput>>;
};


export type QueryWorkerExitedEventByUniqueInputArgs = {
  where: WorkerExitedEventWhereUniqueInput;
};


export type QueryWorkerExitedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerExitedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerExitedEventOrderByInput>>;
};


export type QueryWorkerRewardAccountUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRewardAccountUpdatedEventOrderByInput>>;
};


export type QueryWorkerRewardAccountUpdatedEventByUniqueInputArgs = {
  where: WorkerRewardAccountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRewardAccountUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRewardAccountUpdatedEventOrderByInput>>;
};


export type QueryWorkerRewardAmountUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRewardAmountUpdatedEventOrderByInput>>;
};


export type QueryWorkerRewardAmountUpdatedEventByUniqueInputArgs = {
  where: WorkerRewardAmountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRewardAmountUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRewardAmountUpdatedEventOrderByInput>>;
};


export type QueryWorkerRoleAccountUpdatedEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRoleAccountUpdatedEventOrderByInput>>;
};


export type QueryWorkerRoleAccountUpdatedEventByUniqueInputArgs = {
  where: WorkerRoleAccountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRoleAccountUpdatedEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  orderBy?: Maybe<Array<WorkerRoleAccountUpdatedEventOrderByInput>>;
};


export type QueryWorkerStartedLeavingEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerStartedLeavingEventWhereInput>;
  orderBy?: Maybe<Array<WorkerStartedLeavingEventOrderByInput>>;
};


export type QueryWorkerStartedLeavingEventByUniqueInputArgs = {
  where: WorkerStartedLeavingEventWhereUniqueInput;
};


export type QueryWorkerStartedLeavingEventsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerStartedLeavingEventWhereInput>;
  orderBy?: Maybe<Array<WorkerStartedLeavingEventOrderByInput>>;
};


export type QueryWorkersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkerWhereInput>;
  orderBy?: Maybe<Array<WorkerOrderByInput>>;
};


export type QueryWorkerByUniqueInputArgs = {
  where: WorkerWhereUniqueInput;
};


export type QueryWorkersConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkerWhereInput>;
  orderBy?: Maybe<Array<WorkerOrderByInput>>;
};


export type QueryWorkingGroupApplicationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkingGroupApplicationWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupApplicationOrderByInput>>;
};


export type QueryWorkingGroupApplicationByUniqueInputArgs = {
  where: WorkingGroupApplicationWhereUniqueInput;
};


export type QueryWorkingGroupApplicationsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkingGroupApplicationWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupApplicationOrderByInput>>;
};


export type QueryWorkingGroupMetadataArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkingGroupMetadataWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupMetadataOrderByInput>>;
};


export type QueryWorkingGroupMetadataByUniqueInputArgs = {
  where: WorkingGroupMetadataWhereUniqueInput;
};


export type QueryWorkingGroupMetadataConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkingGroupMetadataWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupMetadataOrderByInput>>;
};


export type QueryWorkingGroupOpeningMetadataArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOpeningMetadataOrderByInput>>;
};


export type QueryWorkingGroupOpeningMetadataByUniqueInputArgs = {
  where: WorkingGroupOpeningMetadataWhereUniqueInput;
};


export type QueryWorkingGroupOpeningMetadataConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOpeningMetadataOrderByInput>>;
};


export type QueryWorkingGroupOpeningsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkingGroupOpeningWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOpeningOrderByInput>>;
};


export type QueryWorkingGroupOpeningByUniqueInputArgs = {
  where: WorkingGroupOpeningWhereUniqueInput;
};


export type QueryWorkingGroupOpeningsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkingGroupOpeningWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOpeningOrderByInput>>;
};


export type QueryWorkingGroupsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  where?: Maybe<WorkingGroupWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOrderByInput>>;
};


export type QueryWorkingGroupByUniqueInputArgs = {
  where: WorkingGroupWhereUniqueInput;
};


export type QueryWorkingGroupsConnectionArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  where?: Maybe<WorkingGroupWhereInput>;
  orderBy?: Maybe<Array<WorkingGroupOrderByInput>>;
};

export type ReferendumFinishedEvent = BaseGraphQlObject & {
  __typename: 'ReferendumFinishedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  optionResults: Array<ReferendumStageRevealingOptionResult>;
};

export type ReferendumFinishedEventConnection = {
  __typename: 'ReferendumFinishedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ReferendumFinishedEventEdge>;
  pageInfo: PageInfo;
};

export type ReferendumFinishedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type ReferendumFinishedEventEdge = {
  __typename: 'ReferendumFinishedEventEdge';
  node: ReferendumFinishedEvent;
  cursor: Scalars['String'];
};

export enum ReferendumFinishedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type ReferendumFinishedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type ReferendumFinishedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  optionResults_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  optionResults_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  optionResults_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  AND?: Maybe<Array<ReferendumFinishedEventWhereInput>>;
  OR?: Maybe<Array<ReferendumFinishedEventWhereInput>>;
};

export type ReferendumFinishedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStage = ReferendumStageInactive | ReferendumStageVoting | ReferendumStageRevealing | VariantNone;

export type ReferendumStageInactive = {
  __typename: 'ReferendumStageInactive';
  dummy?: Maybe<Scalars['Int']>;
};

export type ReferendumStageInactiveCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ReferendumStageInactiveUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ReferendumStageInactiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ReferendumStageInactiveWhereInput>>;
  OR?: Maybe<Array<ReferendumStageInactiveWhereInput>>;
};

export type ReferendumStageInactiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageRevealing = {
  __typename: 'ReferendumStageRevealing';
  /** Block in which referendum started */
  started: Scalars['BigInt'];
  /** Target number of winners */
  winningTargetCount: Scalars['BigInt'];
  /** Intermediate winning options */
  intermediateWinners?: Maybe<Array<ReferendumStageRevealingOptionResult>>;
  /** Index of current election */
  cycleId?: Maybe<ElectionRound>;
};

export type ReferendumStageRevealingCreateInput = {
  started: Scalars['BigInt'];
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStageRevealingOptionResult = BaseGraphQlObject & {
  __typename: 'ReferendumStageRevealingOptionResult';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  optionId: Membership;
  optionIdId: Scalars['String'];
  /** Sum of votes' power received. */
  votePower: Scalars['BigInt'];
  cycleId: ElectionRound;
  cycleIdId: Scalars['String'];
  referendumFinishedEvent: ReferendumFinishedEvent;
  referendumFinishedEventId: Scalars['String'];
};

export type ReferendumStageRevealingOptionResultConnection = {
  __typename: 'ReferendumStageRevealingOptionResultConnection';
  totalCount: Scalars['Int'];
  edges: Array<ReferendumStageRevealingOptionResultEdge>;
  pageInfo: PageInfo;
};

export type ReferendumStageRevealingOptionResultCreateInput = {
  optionId: Scalars['ID'];
  votePower: Scalars['BigInt'];
  cycleId: Scalars['ID'];
  referendumFinishedEvent: Scalars['ID'];
};

export type ReferendumStageRevealingOptionResultEdge = {
  __typename: 'ReferendumStageRevealingOptionResultEdge';
  node: ReferendumStageRevealingOptionResult;
  cursor: Scalars['String'];
};

export enum ReferendumStageRevealingOptionResultOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  OptionIdAsc = 'optionId_ASC',
  OptionIdDesc = 'optionId_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC',
  CycleIdAsc = 'cycleId_ASC',
  CycleIdDesc = 'cycleId_DESC',
  ReferendumFinishedEventAsc = 'referendumFinishedEvent_ASC',
  ReferendumFinishedEventDesc = 'referendumFinishedEvent_DESC'
}

export type ReferendumStageRevealingOptionResultUpdateInput = {
  optionId?: Maybe<Scalars['ID']>;
  votePower?: Maybe<Scalars['BigInt']>;
  cycleId?: Maybe<Scalars['ID']>;
  referendumFinishedEvent?: Maybe<Scalars['ID']>;
};

export type ReferendumStageRevealingOptionResultWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  optionId_eq?: Maybe<Scalars['ID']>;
  optionId_in?: Maybe<Array<Scalars['ID']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  cycleId_eq?: Maybe<Scalars['ID']>;
  cycleId_in?: Maybe<Array<Scalars['ID']>>;
  referendumFinishedEvent_eq?: Maybe<Scalars['ID']>;
  referendumFinishedEvent_in?: Maybe<Array<Scalars['ID']>>;
  optionId?: Maybe<MembershipWhereInput>;
  cycleId?: Maybe<ElectionRoundWhereInput>;
  referendumFinishedEvent?: Maybe<ReferendumFinishedEventWhereInput>;
  AND?: Maybe<Array<ReferendumStageRevealingOptionResultWhereInput>>;
  OR?: Maybe<Array<ReferendumStageRevealingOptionResultWhereInput>>;
};

export type ReferendumStageRevealingOptionResultWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageRevealingUpdateInput = {
  started?: Maybe<Scalars['BigInt']>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageRevealingWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  started_eq?: Maybe<Scalars['BigInt']>;
  started_gt?: Maybe<Scalars['BigInt']>;
  started_gte?: Maybe<Scalars['BigInt']>;
  started_lt?: Maybe<Scalars['BigInt']>;
  started_lte?: Maybe<Scalars['BigInt']>;
  started_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<ReferendumStageRevealingWhereInput>>;
  OR?: Maybe<Array<ReferendumStageRevealingWhereInput>>;
};

export type ReferendumStageRevealingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageVoting = {
  __typename: 'ReferendumStageVoting';
  /** Block in which referendum started. */
  started: Scalars['BigInt'];
  /** Target number of winners. */
  winningTargetCount: Scalars['BigInt'];
  /** Index of current election */
  cycleId?: Maybe<ElectionRound>;
};

export type ReferendumStageVotingCreateInput = {
  started: Scalars['BigInt'];
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStageVotingUpdateInput = {
  started?: Maybe<Scalars['BigInt']>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageVotingWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  started_eq?: Maybe<Scalars['BigInt']>;
  started_gt?: Maybe<Scalars['BigInt']>;
  started_gte?: Maybe<Scalars['BigInt']>;
  started_lt?: Maybe<Scalars['BigInt']>;
  started_lte?: Maybe<Scalars['BigInt']>;
  started_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<ReferendumStageVotingWhereInput>>;
  OR?: Maybe<Array<ReferendumStageVotingWhereInput>>;
};

export type ReferendumStageVotingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStartedEvent = BaseGraphQlObject & {
  __typename: 'ReferendumStartedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Amount of winning referendum options. */
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedEventConnection = {
  __typename: 'ReferendumStartedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ReferendumStartedEventEdge>;
  pageInfo: PageInfo;
};

export type ReferendumStartedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedEventEdge = {
  __typename: 'ReferendumStartedEventEdge';
  node: ReferendumStartedEvent;
  cursor: Scalars['String'];
};

export enum ReferendumStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  WinningTargetCountAsc = 'winningTargetCount_ASC',
  WinningTargetCountDesc = 'winningTargetCount_DESC'
}

export type ReferendumStartedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<ReferendumStartedEventWhereInput>>;
  OR?: Maybe<Array<ReferendumStartedEventWhereInput>>;
};

export type ReferendumStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStartedForcefullyEvent = BaseGraphQlObject & {
  __typename: 'ReferendumStartedForcefullyEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Amount of winning referendum options. */
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedForcefullyEventConnection = {
  __typename: 'ReferendumStartedForcefullyEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ReferendumStartedForcefullyEventEdge>;
  pageInfo: PageInfo;
};

export type ReferendumStartedForcefullyEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedForcefullyEventEdge = {
  __typename: 'ReferendumStartedForcefullyEventEdge';
  node: ReferendumStartedForcefullyEvent;
  cursor: Scalars['String'];
};

export enum ReferendumStartedForcefullyEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  WinningTargetCountAsc = 'winningTargetCount_ASC',
  WinningTargetCountDesc = 'winningTargetCount_DESC'
}

export type ReferendumStartedForcefullyEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedForcefullyEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<ReferendumStartedForcefullyEventWhereInput>>;
  OR?: Maybe<Array<ReferendumStartedForcefullyEventWhereInput>>;
};

export type ReferendumStartedForcefullyEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferralCutUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'ReferralCutUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** New cut value. */
  newValue: Scalars['Int'];
};

export type ReferralCutUpdatedEventConnection = {
  __typename: 'ReferralCutUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ReferralCutUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type ReferralCutUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  newValue: Scalars['Float'];
};

export type ReferralCutUpdatedEventEdge = {
  __typename: 'ReferralCutUpdatedEventEdge';
  node: ReferralCutUpdatedEvent;
  cursor: Scalars['String'];
};

export enum ReferralCutUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NewValueAsc = 'newValue_ASC',
  NewValueDesc = 'newValue_DESC'
}

export type ReferralCutUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  newValue?: Maybe<Scalars['Float']>;
};

export type ReferralCutUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  newValue_eq?: Maybe<Scalars['Int']>;
  newValue_gt?: Maybe<Scalars['Int']>;
  newValue_gte?: Maybe<Scalars['Int']>;
  newValue_lt?: Maybe<Scalars['Int']>;
  newValue_lte?: Maybe<Scalars['Int']>;
  newValue_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ReferralCutUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ReferralCutUpdatedEventWhereInput>>;
};

export type ReferralCutUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RequestFundedEvent = BaseGraphQlObject & {
  __typename: 'RequestFundedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Funding account. */
  account: Scalars['String'];
  /** Funding amount. */
  amount: Scalars['BigInt'];
};

export type RequestFundedEventConnection = {
  __typename: 'RequestFundedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<RequestFundedEventEdge>;
  pageInfo: PageInfo;
};

export type RequestFundedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  account: Scalars['String'];
  amount: Scalars['BigInt'];
};

export type RequestFundedEventEdge = {
  __typename: 'RequestFundedEventEdge';
  node: RequestFundedEvent;
  cursor: Scalars['String'];
};

export enum RequestFundedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC'
}

export type RequestFundedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  account?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
};

export type RequestFundedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<RequestFundedEventWhereInput>>;
  OR?: Maybe<Array<RequestFundedEventWhereInput>>;
};

export type RequestFundedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RevealingStageStartedEvent = BaseGraphQlObject & {
  __typename: 'RevealingStageStartedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
};

export type RevealingStageStartedEventConnection = {
  __typename: 'RevealingStageStartedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<RevealingStageStartedEventEdge>;
  pageInfo: PageInfo;
};

export type RevealingStageStartedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
};

export type RevealingStageStartedEventEdge = {
  __typename: 'RevealingStageStartedEventEdge';
  node: RevealingStageStartedEvent;
  cursor: Scalars['String'];
};

export enum RevealingStageStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC'
}

export type RevealingStageStartedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
};

export type RevealingStageStartedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<RevealingStageStartedEventWhereInput>>;
  OR?: Maybe<Array<RevealingStageStartedEventWhereInput>>;
};

export type RevealingStageStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RewardPaidEvent = Event & BaseGraphQlObject & {
  __typename: 'RewardPaidEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** The account that recieved the reward */
  rewardAccount: Scalars['String'];
  /** Amount recieved */
  amount: Scalars['BigInt'];
  /** Type of the payment (REGULAR/MISSED) */
  paymentType: RewardPaymentType;
};

export type RewardPaidEventConnection = {
  __typename: 'RewardPaidEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<RewardPaidEventEdge>;
  pageInfo: PageInfo;
};

export type RewardPaidEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  rewardAccount: Scalars['String'];
  amount: Scalars['BigInt'];
  paymentType: RewardPaymentType;
};

export type RewardPaidEventEdge = {
  __typename: 'RewardPaidEventEdge';
  node: RewardPaidEvent;
  cursor: Scalars['String'];
};

export enum RewardPaidEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  PaymentTypeAsc = 'paymentType_ASC',
  PaymentTypeDesc = 'paymentType_DESC'
}

export type RewardPaidEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  paymentType?: Maybe<RewardPaymentType>;
};

export type RewardPaidEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  paymentType_eq?: Maybe<RewardPaymentType>;
  paymentType_in?: Maybe<Array<RewardPaymentType>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<RewardPaidEventWhereInput>>;
  OR?: Maybe<Array<RewardPaidEventWhereInput>>;
};

export type RewardPaidEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RewardPaymentEvent = BaseGraphQlObject & {
  __typename: 'RewardPaymentEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Candidate's account that will be recieving rewards if candidate's elected. */
  rewardAccount: Scalars['String'];
  /** Amount paid to the council member */
  paidBalance: Scalars['BigInt'];
  /** Amount that couldn't be paid and will be paid the next time. */
  missingBalance: Scalars['BigInt'];
};

export type RewardPaymentEventConnection = {
  __typename: 'RewardPaymentEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<RewardPaymentEventEdge>;
  pageInfo: PageInfo;
};

export type RewardPaymentEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  rewardAccount: Scalars['String'];
  paidBalance: Scalars['BigInt'];
  missingBalance: Scalars['BigInt'];
};

export type RewardPaymentEventEdge = {
  __typename: 'RewardPaymentEventEdge';
  node: RewardPaymentEvent;
  cursor: Scalars['String'];
};

export enum RewardPaymentEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  PaidBalanceAsc = 'paidBalance_ASC',
  PaidBalanceDesc = 'paidBalance_DESC',
  MissingBalanceAsc = 'missingBalance_ASC',
  MissingBalanceDesc = 'missingBalance_DESC'
}

export type RewardPaymentEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  paidBalance?: Maybe<Scalars['BigInt']>;
  missingBalance?: Maybe<Scalars['BigInt']>;
};

export type RewardPaymentEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  paidBalance_eq?: Maybe<Scalars['BigInt']>;
  paidBalance_gt?: Maybe<Scalars['BigInt']>;
  paidBalance_gte?: Maybe<Scalars['BigInt']>;
  paidBalance_lt?: Maybe<Scalars['BigInt']>;
  paidBalance_lte?: Maybe<Scalars['BigInt']>;
  paidBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  missingBalance_eq?: Maybe<Scalars['BigInt']>;
  missingBalance_gt?: Maybe<Scalars['BigInt']>;
  missingBalance_gte?: Maybe<Scalars['BigInt']>;
  missingBalance_lt?: Maybe<Scalars['BigInt']>;
  missingBalance_lte?: Maybe<Scalars['BigInt']>;
  missingBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<RewardPaymentEventWhereInput>>;
  OR?: Maybe<Array<RewardPaymentEventWhereInput>>;
};

export type RewardPaymentEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum RewardPaymentType {
  Regular = 'REGULAR',
  Missed = 'MISSED'
}

export type RuntimeUpgradeProposalDetails = {
  __typename: 'RuntimeUpgradeProposalDetails';
  /** Runtime upgrade WASM bytecode */
  newRuntimeBytecode?: Maybe<RuntimeWasmBytecode>;
};

export type RuntimeWasmBytecode = BaseGraphQlObject & {
  __typename: 'RuntimeWasmBytecode';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The bytecode itself */
  bytecode: Scalars['Bytes'];
};

export type RuntimeWasmBytecodeConnection = {
  __typename: 'RuntimeWasmBytecodeConnection';
  totalCount: Scalars['Int'];
  edges: Array<RuntimeWasmBytecodeEdge>;
  pageInfo: PageInfo;
};

export type RuntimeWasmBytecodeCreateInput = {
  bytecode: Scalars['Bytes'];
};

export type RuntimeWasmBytecodeEdge = {
  __typename: 'RuntimeWasmBytecodeEdge';
  node: RuntimeWasmBytecode;
  cursor: Scalars['String'];
};

export enum RuntimeWasmBytecodeOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  BytecodeAsc = 'bytecode_ASC',
  BytecodeDesc = 'bytecode_DESC'
}

export type RuntimeWasmBytecodeUpdateInput = {
  bytecode?: Maybe<Scalars['Bytes']>;
};

export type RuntimeWasmBytecodeWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  bytecode_eq?: Maybe<Scalars['Bytes']>;
  bytecode_in?: Maybe<Array<Scalars['Bytes']>>;
  AND?: Maybe<Array<RuntimeWasmBytecodeWhereInput>>;
  OR?: Maybe<Array<RuntimeWasmBytecodeWhereInput>>;
};

export type RuntimeWasmBytecodeWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SearchFtsOutput = {
  __typename: 'SearchFTSOutput';
  item: SearchSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type SearchSearchResult = Channel | Video;

export type SetCouncilBudgetIncrementProposalDetails = {
  __typename: 'SetCouncilBudgetIncrementProposalDetails';
  /** New (proposed) amount the council budget should be increased by per each budget period */
  newAmount: Scalars['BigInt'];
};

export type SetCouncilBudgetIncrementProposalDetailsCreateInput = {
  newAmount: Scalars['BigInt'];
};

export type SetCouncilBudgetIncrementProposalDetailsUpdateInput = {
  newAmount?: Maybe<Scalars['BigInt']>;
};

export type SetCouncilBudgetIncrementProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newAmount_eq?: Maybe<Scalars['BigInt']>;
  newAmount_gt?: Maybe<Scalars['BigInt']>;
  newAmount_gte?: Maybe<Scalars['BigInt']>;
  newAmount_lt?: Maybe<Scalars['BigInt']>;
  newAmount_lte?: Maybe<Scalars['BigInt']>;
  newAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SetCouncilBudgetIncrementProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetCouncilBudgetIncrementProposalDetailsWhereInput>>;
};

export type SetCouncilBudgetIncrementProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetCouncilorRewardProposalDetails = {
  __typename: 'SetCouncilorRewardProposalDetails';
  /** New (proposed) council members' reward per block */
  newRewardPerBlock: Scalars['BigInt'];
};

export type SetCouncilorRewardProposalDetailsCreateInput = {
  newRewardPerBlock: Scalars['BigInt'];
};

export type SetCouncilorRewardProposalDetailsUpdateInput = {
  newRewardPerBlock?: Maybe<Scalars['BigInt']>;
};

export type SetCouncilorRewardProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SetCouncilorRewardProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetCouncilorRewardProposalDetailsWhereInput>>;
};

export type SetCouncilorRewardProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetInitialInvitationBalanceProposalDetails = {
  __typename: 'SetInitialInvitationBalanceProposalDetails';
  /** The new (proposed) initial balance credited to controller account of an invitee (locked for transaction fee payments only) */
  newInitialInvitationBalance: Scalars['BigInt'];
};

export type SetInitialInvitationBalanceProposalDetailsCreateInput = {
  newInitialInvitationBalance: Scalars['BigInt'];
};

export type SetInitialInvitationBalanceProposalDetailsUpdateInput = {
  newInitialInvitationBalance?: Maybe<Scalars['BigInt']>;
};

export type SetInitialInvitationBalanceProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newInitialInvitationBalance_eq?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_gt?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_gte?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_lt?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_lte?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SetInitialInvitationBalanceProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetInitialInvitationBalanceProposalDetailsWhereInput>>;
};

export type SetInitialInvitationBalanceProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetInitialInvitationCountProposalDetails = {
  __typename: 'SetInitialInvitationCountProposalDetails';
  /** The new (proposed) initial invitations count for paid memberships */
  newInitialInvitationsCount: Scalars['Int'];
};

export type SetInitialInvitationCountProposalDetailsCreateInput = {
  newInitialInvitationsCount: Scalars['Float'];
};

export type SetInitialInvitationCountProposalDetailsUpdateInput = {
  newInitialInvitationsCount?: Maybe<Scalars['Float']>;
};

export type SetInitialInvitationCountProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newInitialInvitationsCount_eq?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_gt?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_gte?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_lt?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_lte?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<SetInitialInvitationCountProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetInitialInvitationCountProposalDetailsWhereInput>>;
};

export type SetInitialInvitationCountProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetMaxValidatorCountProposalDetails = {
  __typename: 'SetMaxValidatorCountProposalDetails';
  /** The new (propsed) max. number of active validators */
  newMaxValidatorCount: Scalars['Int'];
};

export type SetMaxValidatorCountProposalDetailsCreateInput = {
  newMaxValidatorCount: Scalars['Float'];
};

export type SetMaxValidatorCountProposalDetailsUpdateInput = {
  newMaxValidatorCount?: Maybe<Scalars['Float']>;
};

export type SetMaxValidatorCountProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newMaxValidatorCount_eq?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_gt?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_gte?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_lt?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_lte?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<SetMaxValidatorCountProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMaxValidatorCountProposalDetailsWhereInput>>;
};

export type SetMaxValidatorCountProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetMembershipLeadInvitationQuotaProposalDetails = {
  __typename: 'SetMembershipLeadInvitationQuotaProposalDetails';
  /** The new (proposed) membership working group lead invitation quota */
  newLeadInvitationQuota: Scalars['Int'];
};

export type SetMembershipLeadInvitationQuotaProposalDetailsCreateInput = {
  newLeadInvitationQuota: Scalars['Float'];
};

export type SetMembershipLeadInvitationQuotaProposalDetailsUpdateInput = {
  newLeadInvitationQuota?: Maybe<Scalars['Float']>;
};

export type SetMembershipLeadInvitationQuotaProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newLeadInvitationQuota_eq?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_gt?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_gte?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_lt?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_lte?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<SetMembershipLeadInvitationQuotaProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMembershipLeadInvitationQuotaProposalDetailsWhereInput>>;
};

export type SetMembershipLeadInvitationQuotaProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetMembershipPriceProposalDetails = {
  __typename: 'SetMembershipPriceProposalDetails';
  /** New (proposed) membership price */
  newPrice: Scalars['BigInt'];
};

export type SetMembershipPriceProposalDetailsCreateInput = {
  newPrice: Scalars['BigInt'];
};

export type SetMembershipPriceProposalDetailsUpdateInput = {
  newPrice?: Maybe<Scalars['BigInt']>;
};

export type SetMembershipPriceProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newPrice_eq?: Maybe<Scalars['BigInt']>;
  newPrice_gt?: Maybe<Scalars['BigInt']>;
  newPrice_gte?: Maybe<Scalars['BigInt']>;
  newPrice_lt?: Maybe<Scalars['BigInt']>;
  newPrice_lte?: Maybe<Scalars['BigInt']>;
  newPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SetMembershipPriceProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMembershipPriceProposalDetailsWhereInput>>;
};

export type SetMembershipPriceProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetReferralCutProposalDetails = {
  __typename: 'SetReferralCutProposalDetails';
  /** The new (proposed) percentage of tokens diverted to referrer (from referred member's membership price). */
  newReferralCut: Scalars['Int'];
};

export type SetReferralCutProposalDetailsCreateInput = {
  newReferralCut: Scalars['Float'];
};

export type SetReferralCutProposalDetailsUpdateInput = {
  newReferralCut?: Maybe<Scalars['Float']>;
};

export type SetReferralCutProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newReferralCut_eq?: Maybe<Scalars['Int']>;
  newReferralCut_gt?: Maybe<Scalars['Int']>;
  newReferralCut_gte?: Maybe<Scalars['Int']>;
  newReferralCut_lt?: Maybe<Scalars['Int']>;
  newReferralCut_lte?: Maybe<Scalars['Int']>;
  newReferralCut_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<SetReferralCutProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetReferralCutProposalDetailsWhereInput>>;
};

export type SetReferralCutProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SetWorkingGroupLeadRewardProposalDetails = {
  __typename: 'SetWorkingGroupLeadRewardProposalDetails';
  /** The lead that should be affected */
  lead?: Maybe<Worker>;
  /** Lead's new (proposed) reward per block */
  newRewardPerBlock: Scalars['BigInt'];
};

export type SetWorkingGroupLeadRewardProposalDetailsCreateInput = {
  newRewardPerBlock: Scalars['BigInt'];
};

export type SetWorkingGroupLeadRewardProposalDetailsUpdateInput = {
  newRewardPerBlock?: Maybe<Scalars['BigInt']>;
};

export type SetWorkingGroupLeadRewardProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SetWorkingGroupLeadRewardProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetWorkingGroupLeadRewardProposalDetailsWhereInput>>;
};

export type SetWorkingGroupLeadRewardProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SignalProposalDetails = {
  __typename: 'SignalProposalDetails';
  /** Signal proposal content */
  text: Scalars['String'];
};

export type SignalProposalDetailsCreateInput = {
  text: Scalars['String'];
};

export type SignalProposalDetailsUpdateInput = {
  text?: Maybe<Scalars['String']>;
};

export type SignalProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<SignalProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SignalProposalDetailsWhereInput>>;
};

export type SignalProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SlashWorkingGroupLeadProposalDetails = {
  __typename: 'SlashWorkingGroupLeadProposalDetails';
  /** The lead that should be affected */
  lead?: Maybe<Worker>;
  /** Amount to slash the stake by */
  amount: Scalars['BigInt'];
};

export type SlashWorkingGroupLeadProposalDetailsCreateInput = {
  amount: Scalars['BigInt'];
};

export type SlashWorkingGroupLeadProposalDetailsUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
};

export type SlashWorkingGroupLeadProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<SlashWorkingGroupLeadProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SlashWorkingGroupLeadProposalDetailsWhereInput>>;
};

export type SlashWorkingGroupLeadProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeDecreasedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakeDecreasedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** The amount of JOY the stake was decreased by */
  amount: Scalars['BigInt'];
};

export type StakeDecreasedEventConnection = {
  __typename: 'StakeDecreasedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakeDecreasedEventEdge>;
  pageInfo: PageInfo;
};

export type StakeDecreasedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  amount: Scalars['BigInt'];
};

export type StakeDecreasedEventEdge = {
  __typename: 'StakeDecreasedEventEdge';
  node: StakeDecreasedEvent;
  cursor: Scalars['String'];
};

export enum StakeDecreasedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC'
}

export type StakeDecreasedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  amount?: Maybe<Scalars['BigInt']>;
};

export type StakeDecreasedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<StakeDecreasedEventWhereInput>>;
  OR?: Maybe<Array<StakeDecreasedEventWhereInput>>;
};

export type StakeDecreasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeIncreasedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakeIncreasedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** The amount of JOY the stake was increased by */
  amount: Scalars['BigInt'];
};

export type StakeIncreasedEventConnection = {
  __typename: 'StakeIncreasedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakeIncreasedEventEdge>;
  pageInfo: PageInfo;
};

export type StakeIncreasedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  amount: Scalars['BigInt'];
};

export type StakeIncreasedEventEdge = {
  __typename: 'StakeIncreasedEventEdge';
  node: StakeIncreasedEvent;
  cursor: Scalars['String'];
};

export enum StakeIncreasedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC'
}

export type StakeIncreasedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  amount?: Maybe<Scalars['BigInt']>;
};

export type StakeIncreasedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<StakeIncreasedEventWhereInput>>;
  OR?: Maybe<Array<StakeIncreasedEventWhereInput>>;
};

export type StakeIncreasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeReleasedEvent = BaseGraphQlObject & {
  __typename: 'StakeReleasedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Account used to stake the value. */
  stakingAccount: Scalars['String'];
};

export type StakeReleasedEventConnection = {
  __typename: 'StakeReleasedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakeReleasedEventEdge>;
  pageInfo: PageInfo;
};

export type StakeReleasedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  stakingAccount: Scalars['String'];
};

export type StakeReleasedEventEdge = {
  __typename: 'StakeReleasedEventEdge';
  node: StakeReleasedEvent;
  cursor: Scalars['String'];
};

export enum StakeReleasedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC'
}

export type StakeReleasedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  stakingAccount?: Maybe<Scalars['String']>;
};

export type StakeReleasedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<StakeReleasedEventWhereInput>>;
  OR?: Maybe<Array<StakeReleasedEventWhereInput>>;
};

export type StakeReleasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeSlashedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakeSlashedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** Balance that was requested to be slashed */
  requestedAmount: Scalars['BigInt'];
  /** Balance that was actually slashed */
  slashedAmount: Scalars['BigInt'];
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
};

export type StakeSlashedEventConnection = {
  __typename: 'StakeSlashedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakeSlashedEventEdge>;
  pageInfo: PageInfo;
};

export type StakeSlashedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  requestedAmount: Scalars['BigInt'];
  slashedAmount: Scalars['BigInt'];
  rationale?: Maybe<Scalars['String']>;
};

export type StakeSlashedEventEdge = {
  __typename: 'StakeSlashedEventEdge';
  node: StakeSlashedEvent;
  cursor: Scalars['String'];
};

export enum StakeSlashedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  RequestedAmountAsc = 'requestedAmount_ASC',
  RequestedAmountDesc = 'requestedAmount_DESC',
  SlashedAmountAsc = 'slashedAmount_ASC',
  SlashedAmountDesc = 'slashedAmount_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type StakeSlashedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  requestedAmount?: Maybe<Scalars['BigInt']>;
  slashedAmount?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type StakeSlashedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  requestedAmount_eq?: Maybe<Scalars['BigInt']>;
  requestedAmount_gt?: Maybe<Scalars['BigInt']>;
  requestedAmount_gte?: Maybe<Scalars['BigInt']>;
  requestedAmount_lt?: Maybe<Scalars['BigInt']>;
  requestedAmount_lte?: Maybe<Scalars['BigInt']>;
  requestedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  slashedAmount_eq?: Maybe<Scalars['BigInt']>;
  slashedAmount_gt?: Maybe<Scalars['BigInt']>;
  slashedAmount_gte?: Maybe<Scalars['BigInt']>;
  slashedAmount_lt?: Maybe<Scalars['BigInt']>;
  slashedAmount_lte?: Maybe<Scalars['BigInt']>;
  slashedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<StakeSlashedEventWhereInput>>;
  OR?: Maybe<Array<StakeSlashedEventWhereInput>>;
};

export type StakeSlashedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountAddedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakingAccountAddedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
};

export type StakingAccountAddedEventConnection = {
  __typename: 'StakingAccountAddedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakingAccountAddedEventEdge>;
  pageInfo: PageInfo;
};

export type StakingAccountAddedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  account: Scalars['String'];
};

export type StakingAccountAddedEventEdge = {
  __typename: 'StakingAccountAddedEventEdge';
  node: StakingAccountAddedEvent;
  cursor: Scalars['String'];
};

export enum StakingAccountAddedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC'
}

export type StakingAccountAddedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  account?: Maybe<Scalars['String']>;
};

export type StakingAccountAddedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<StakingAccountAddedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountAddedEventWhereInput>>;
};

export type StakingAccountAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountConfirmedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakingAccountConfirmedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
};

export type StakingAccountConfirmedEventConnection = {
  __typename: 'StakingAccountConfirmedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakingAccountConfirmedEventEdge>;
  pageInfo: PageInfo;
};

export type StakingAccountConfirmedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  account: Scalars['String'];
};

export type StakingAccountConfirmedEventEdge = {
  __typename: 'StakingAccountConfirmedEventEdge';
  node: StakingAccountConfirmedEvent;
  cursor: Scalars['String'];
};

export enum StakingAccountConfirmedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC'
}

export type StakingAccountConfirmedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  account?: Maybe<Scalars['String']>;
};

export type StakingAccountConfirmedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<StakingAccountConfirmedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountConfirmedEventWhereInput>>;
};

export type StakingAccountConfirmedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountRemovedEvent = Event & BaseGraphQlObject & {
  __typename: 'StakingAccountRemovedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
};

export type StakingAccountRemovedEventConnection = {
  __typename: 'StakingAccountRemovedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StakingAccountRemovedEventEdge>;
  pageInfo: PageInfo;
};

export type StakingAccountRemovedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  account: Scalars['String'];
};

export type StakingAccountRemovedEventEdge = {
  __typename: 'StakingAccountRemovedEventEdge';
  node: StakingAccountRemovedEvent;
  cursor: Scalars['String'];
};

export enum StakingAccountRemovedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC'
}

export type StakingAccountRemovedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  account?: Maybe<Scalars['String']>;
};

export type StakingAccountRemovedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<StakingAccountRemovedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountRemovedEventWhereInput>>;
};

export type StakingAccountRemovedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StandardDeleteResponse = {
  __typename: 'StandardDeleteResponse';
  id: Scalars['ID'];
};

export type StatusTextChangedEvent = Event & BaseGraphQlObject & {
  __typename: 'StatusTextChangedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  /** Original action metadata as hex string */
  metadata?: Maybe<Scalars['String']>;
  /** Event result depeding on the metadata action type */
  result: WorkingGroupMetadataActionResult;
  upcomingworkinggroupopeningcreatedInEvent?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  workinggroupmetadatasetInEvent?: Maybe<Array<WorkingGroupMetadata>>;
};

export type StatusTextChangedEventConnection = {
  __typename: 'StatusTextChangedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<StatusTextChangedEventEdge>;
  pageInfo: PageInfo;
};

export type StatusTextChangedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  result: Scalars['JSONObject'];
};

export type StatusTextChangedEventEdge = {
  __typename: 'StatusTextChangedEventEdge';
  node: StatusTextChangedEvent;
  cursor: Scalars['String'];
};

export enum StatusTextChangedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC'
}

export type StatusTextChangedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['JSONObject']>;
};

export type StatusTextChangedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  metadata_eq?: Maybe<Scalars['String']>;
  metadata_contains?: Maybe<Scalars['String']>;
  metadata_startsWith?: Maybe<Scalars['String']>;
  metadata_endsWith?: Maybe<Scalars['String']>;
  metadata_in?: Maybe<Array<Scalars['String']>>;
  result_json?: Maybe<Scalars['JSONObject']>;
  group?: Maybe<WorkingGroupWhereInput>;
  upcomingworkinggroupopeningcreatedInEvent_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningcreatedInEvent_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningcreatedInEvent_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  workinggroupmetadatasetInEvent_none?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatasetInEvent_some?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatasetInEvent_every?: Maybe<WorkingGroupMetadataWhereInput>;
  AND?: Maybe<Array<StatusTextChangedEventWhereInput>>;
  OR?: Maybe<Array<StatusTextChangedEventWhereInput>>;
};

export type StatusTextChangedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Subscription = {
  __typename: 'Subscription';
  stateSubscription: ProcessorState;
};

export type TerminateWorkingGroupLeadProposalDetails = {
  __typename: 'TerminateWorkingGroupLeadProposalDetails';
  /** Lead that's supposed to be terminated */
  lead?: Maybe<Worker>;
  /** Optionally - the amount to slash the lead's stake by */
  slashingAmount?: Maybe<Scalars['BigInt']>;
};

export type TerminateWorkingGroupLeadProposalDetailsCreateInput = {
  slashingAmount?: Maybe<Scalars['BigInt']>;
};

export type TerminateWorkingGroupLeadProposalDetailsUpdateInput = {
  slashingAmount?: Maybe<Scalars['BigInt']>;
};

export type TerminateWorkingGroupLeadProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  slashingAmount_eq?: Maybe<Scalars['BigInt']>;
  slashingAmount_gt?: Maybe<Scalars['BigInt']>;
  slashingAmount_gte?: Maybe<Scalars['BigInt']>;
  slashingAmount_lt?: Maybe<Scalars['BigInt']>;
  slashingAmount_lte?: Maybe<Scalars['BigInt']>;
  slashingAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<TerminateWorkingGroupLeadProposalDetailsWhereInput>>;
  OR?: Maybe<Array<TerminateWorkingGroupLeadProposalDetailsWhereInput>>;
};

export type TerminateWorkingGroupLeadProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type TerminatedLeaderEvent = Event & BaseGraphQlObject & {
  __typename: 'TerminatedLeaderEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedLeaderEventConnection = {
  __typename: 'TerminatedLeaderEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<TerminatedLeaderEventEdge>;
  pageInfo: PageInfo;
};

export type TerminatedLeaderEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedLeaderEventEdge = {
  __typename: 'TerminatedLeaderEventEdge';
  node: TerminatedLeaderEvent;
  cursor: Scalars['String'];
};

export enum TerminatedLeaderEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  PenaltyAsc = 'penalty_ASC',
  PenaltyDesc = 'penalty_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type TerminatedLeaderEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedLeaderEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  penalty_eq?: Maybe<Scalars['BigInt']>;
  penalty_gt?: Maybe<Scalars['BigInt']>;
  penalty_gte?: Maybe<Scalars['BigInt']>;
  penalty_lt?: Maybe<Scalars['BigInt']>;
  penalty_lte?: Maybe<Scalars['BigInt']>;
  penalty_in?: Maybe<Array<Scalars['BigInt']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<TerminatedLeaderEventWhereInput>>;
  OR?: Maybe<Array<TerminatedLeaderEventWhereInput>>;
};

export type TerminatedLeaderEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type TerminatedWorkerEvent = Event & BaseGraphQlObject & {
  __typename: 'TerminatedWorkerEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedWorkerEventConnection = {
  __typename: 'TerminatedWorkerEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<TerminatedWorkerEventEdge>;
  pageInfo: PageInfo;
};

export type TerminatedWorkerEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedWorkerEventEdge = {
  __typename: 'TerminatedWorkerEventEdge';
  node: TerminatedWorkerEvent;
  cursor: Scalars['String'];
};

export enum TerminatedWorkerEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  PenaltyAsc = 'penalty_ASC',
  PenaltyDesc = 'penalty_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type TerminatedWorkerEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
};

export type TerminatedWorkerEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  penalty_eq?: Maybe<Scalars['BigInt']>;
  penalty_gt?: Maybe<Scalars['BigInt']>;
  penalty_gte?: Maybe<Scalars['BigInt']>;
  penalty_lt?: Maybe<Scalars['BigInt']>;
  penalty_lte?: Maybe<Scalars['BigInt']>;
  penalty_in?: Maybe<Array<Scalars['BigInt']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<TerminatedWorkerEventWhereInput>>;
  OR?: Maybe<Array<TerminatedWorkerEventWhereInput>>;
};

export type TerminatedWorkerEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadCreatedEvent = BaseGraphQlObject & {
  __typename: 'ThreadCreatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** Thread's original title */
  title: Scalars['String'];
  /** Thread's original text */
  text: Scalars['String'];
};

export type ThreadCreatedEventConnection = {
  __typename: 'ThreadCreatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ThreadCreatedEventEdge>;
  pageInfo: PageInfo;
};

export type ThreadCreatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
};

export type ThreadCreatedEventEdge = {
  __typename: 'ThreadCreatedEventEdge';
  node: ThreadCreatedEvent;
  cursor: Scalars['String'];
};

export enum ThreadCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC'
}

export type ThreadCreatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type ThreadCreatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  text_eq?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_startsWith?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  AND?: Maybe<Array<ThreadCreatedEventWhereInput>>;
  OR?: Maybe<Array<ThreadCreatedEventWhereInput>>;
};

export type ThreadCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadDeletedEvent = BaseGraphQlObject & {
  __typename: 'ThreadDeletedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
};

export type ThreadDeletedEventConnection = {
  __typename: 'ThreadDeletedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ThreadDeletedEventEdge>;
  pageInfo: PageInfo;
};

export type ThreadDeletedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
};

export type ThreadDeletedEventEdge = {
  __typename: 'ThreadDeletedEventEdge';
  node: ThreadDeletedEvent;
  cursor: Scalars['String'];
};

export enum ThreadDeletedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC'
}

export type ThreadDeletedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ThreadDeletedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  AND?: Maybe<Array<ThreadDeletedEventWhereInput>>;
  OR?: Maybe<Array<ThreadDeletedEventWhereInput>>;
};

export type ThreadDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadMetadataUpdatedEvent = BaseGraphQlObject & {
  __typename: 'ThreadMetadataUpdatedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** New title of the thread */
  newTitle?: Maybe<Scalars['String']>;
};

export type ThreadMetadataUpdatedEventConnection = {
  __typename: 'ThreadMetadataUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ThreadMetadataUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type ThreadMetadataUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
  newTitle?: Maybe<Scalars['String']>;
};

export type ThreadMetadataUpdatedEventEdge = {
  __typename: 'ThreadMetadataUpdatedEventEdge';
  node: ThreadMetadataUpdatedEvent;
  cursor: Scalars['String'];
};

export enum ThreadMetadataUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  NewTitleAsc = 'newTitle_ASC',
  NewTitleDesc = 'newTitle_DESC'
}

export type ThreadMetadataUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
  newTitle?: Maybe<Scalars['String']>;
};

export type ThreadMetadataUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  newTitle_eq?: Maybe<Scalars['String']>;
  newTitle_contains?: Maybe<Scalars['String']>;
  newTitle_startsWith?: Maybe<Scalars['String']>;
  newTitle_endsWith?: Maybe<Scalars['String']>;
  newTitle_in?: Maybe<Array<Scalars['String']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  AND?: Maybe<Array<ThreadMetadataUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ThreadMetadataUpdatedEventWhereInput>>;
};

export type ThreadMetadataUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadModeratedEvent = BaseGraphQlObject & {
  __typename: 'ThreadModeratedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** Rationale behind the moderation */
  rationale: Scalars['String'];
  actor: Worker;
  actorId: Scalars['String'];
};

export type ThreadModeratedEventConnection = {
  __typename: 'ThreadModeratedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ThreadModeratedEventEdge>;
  pageInfo: PageInfo;
};

export type ThreadModeratedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
  rationale: Scalars['String'];
  actor: Scalars['ID'];
};

export type ThreadModeratedEventEdge = {
  __typename: 'ThreadModeratedEventEdge';
  node: ThreadModeratedEvent;
  cursor: Scalars['String'];
};

export enum ThreadModeratedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type ThreadModeratedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
  actor?: Maybe<Scalars['ID']>;
};

export type ThreadModeratedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<ThreadModeratedEventWhereInput>>;
  OR?: Maybe<Array<ThreadModeratedEventWhereInput>>;
};

export type ThreadModeratedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadMovedEvent = BaseGraphQlObject & {
  __typename: 'ThreadMovedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  thread: ForumThread;
  threadId: Scalars['String'];
  oldCategory: ForumCategory;
  oldCategoryId: Scalars['String'];
  newCategory: ForumCategory;
  newCategoryId: Scalars['String'];
  actor: Worker;
  actorId: Scalars['String'];
};

export type ThreadMovedEventConnection = {
  __typename: 'ThreadMovedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<ThreadMovedEventEdge>;
  pageInfo: PageInfo;
};

export type ThreadMovedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  thread: Scalars['ID'];
  oldCategory: Scalars['ID'];
  newCategory: Scalars['ID'];
  actor: Scalars['ID'];
};

export type ThreadMovedEventEdge = {
  __typename: 'ThreadMovedEventEdge';
  node: ThreadMovedEvent;
  cursor: Scalars['String'];
};

export enum ThreadMovedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  OldCategoryAsc = 'oldCategory_ASC',
  OldCategoryDesc = 'oldCategory_DESC',
  NewCategoryAsc = 'newCategory_ASC',
  NewCategoryDesc = 'newCategory_DESC',
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC'
}

export type ThreadMovedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  thread?: Maybe<Scalars['ID']>;
  oldCategory?: Maybe<Scalars['ID']>;
  newCategory?: Maybe<Scalars['ID']>;
  actor?: Maybe<Scalars['ID']>;
};

export type ThreadMovedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  oldCategory_eq?: Maybe<Scalars['ID']>;
  oldCategory_in?: Maybe<Array<Scalars['ID']>>;
  newCategory_eq?: Maybe<Scalars['ID']>;
  newCategory_in?: Maybe<Array<Scalars['ID']>>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  oldCategory?: Maybe<ForumCategoryWhereInput>;
  newCategory?: Maybe<ForumCategoryWhereInput>;
  actor?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<ThreadMovedEventWhereInput>>;
  OR?: Maybe<Array<ThreadMovedEventWhereInput>>;
};

export type ThreadMovedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadStatus = ThreadStatusActive | ThreadStatusLocked | ThreadStatusModerated | ThreadStatusRemoved;

export type ThreadStatusActive = {
  __typename: 'ThreadStatusActive';
  phantom?: Maybe<Scalars['Int']>;
};

export type ThreadStatusActiveCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ThreadStatusActiveUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ThreadStatusActiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<ThreadStatusActiveWhereInput>>;
  OR?: Maybe<Array<ThreadStatusActiveWhereInput>>;
};

export type ThreadStatusActiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadStatusLocked = {
  __typename: 'ThreadStatusLocked';
  /** Event the thread was deleted (locked) in */
  threadDeletedEvent?: Maybe<ThreadDeletedEvent>;
};

export type ThreadStatusModerated = {
  __typename: 'ThreadStatusModerated';
  /** Event the thread was moderated in */
  threadModeratedEvent?: Maybe<ThreadModeratedEvent>;
};

export type ThreadStatusRemoved = {
  __typename: 'ThreadStatusRemoved';
  /** Event the thread was removed in */
  threadDeletedEvent?: Maybe<ThreadDeletedEvent>;
};

export type ThreadsByTitleFtsOutput = {
  __typename: 'ThreadsByTitleFTSOutput';
  item: ThreadsByTitleSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type ThreadsByTitleSearchResult = ForumThread;

export type UnlockBlogPostProposalDetails = {
  __typename: 'UnlockBlogPostProposalDetails';
  /** The blog post that should be unlocked */
  blogPost: Scalars['String'];
};

export type UnlockBlogPostProposalDetailsCreateInput = {
  blogPost: Scalars['String'];
};

export type UnlockBlogPostProposalDetailsUpdateInput = {
  blogPost?: Maybe<Scalars['String']>;
};

export type UnlockBlogPostProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<UnlockBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<UnlockBlogPostProposalDetailsWhereInput>>;
};

export type UnlockBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpcomingOpeningAdded = {
  __typename: 'UpcomingOpeningAdded';
  upcomingOpeningId: Scalars['String'];
};

export type UpcomingOpeningAddedCreateInput = {
  upcomingOpeningId: Scalars['String'];
};

export type UpcomingOpeningAddedUpdateInput = {
  upcomingOpeningId?: Maybe<Scalars['String']>;
};

export type UpcomingOpeningAddedWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  upcomingOpeningId_eq?: Maybe<Scalars['String']>;
  upcomingOpeningId_contains?: Maybe<Scalars['String']>;
  upcomingOpeningId_startsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_endsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<UpcomingOpeningAddedWhereInput>>;
  OR?: Maybe<Array<UpcomingOpeningAddedWhereInput>>;
};

export type UpcomingOpeningAddedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpcomingOpeningRemoved = {
  __typename: 'UpcomingOpeningRemoved';
  upcomingOpeningId: Scalars['String'];
};

export type UpcomingOpeningRemovedCreateInput = {
  upcomingOpeningId: Scalars['String'];
};

export type UpcomingOpeningRemovedUpdateInput = {
  upcomingOpeningId?: Maybe<Scalars['String']>;
};

export type UpcomingOpeningRemovedWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  upcomingOpeningId_eq?: Maybe<Scalars['String']>;
  upcomingOpeningId_contains?: Maybe<Scalars['String']>;
  upcomingOpeningId_startsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_endsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_in?: Maybe<Array<Scalars['String']>>;
  AND?: Maybe<Array<UpcomingOpeningRemovedWhereInput>>;
  OR?: Maybe<Array<UpcomingOpeningRemovedWhereInput>>;
};

export type UpcomingOpeningRemovedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpcomingWorkingGroupOpening = BaseGraphQlObject & {
  __typename: 'UpcomingWorkingGroupOpening';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  createdInEvent: StatusTextChangedEvent;
  createdInEventId: Scalars['String'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  /** Expected opening start time */
  expectedStart?: Maybe<Scalars['DateTime']>;
  /** Expected min. application/role stake amount */
  stakeAmount?: Maybe<Scalars['BigInt']>;
  /** Expected reward per block */
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  metadata: WorkingGroupOpeningMetadata;
  metadataId: Scalars['String'];
};

export type UpcomingWorkingGroupOpeningConnection = {
  __typename: 'UpcomingWorkingGroupOpeningConnection';
  totalCount: Scalars['Int'];
  edges: Array<UpcomingWorkingGroupOpeningEdge>;
  pageInfo: PageInfo;
};

export type UpcomingWorkingGroupOpeningCreateInput = {
  createdInEvent: Scalars['ID'];
  group: Scalars['ID'];
  expectedStart?: Maybe<Scalars['DateTime']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  metadata: Scalars['ID'];
};

export type UpcomingWorkingGroupOpeningEdge = {
  __typename: 'UpcomingWorkingGroupOpeningEdge';
  node: UpcomingWorkingGroupOpening;
  cursor: Scalars['String'];
};

export enum UpcomingWorkingGroupOpeningOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CreatedInEventAsc = 'createdInEvent_ASC',
  CreatedInEventDesc = 'createdInEvent_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  ExpectedStartAsc = 'expectedStart_ASC',
  ExpectedStartDesc = 'expectedStart_DESC',
  StakeAmountAsc = 'stakeAmount_ASC',
  StakeAmountDesc = 'stakeAmount_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC'
}

export type UpcomingWorkingGroupOpeningUpdateInput = {
  createdInEvent?: Maybe<Scalars['ID']>;
  group?: Maybe<Scalars['ID']>;
  expectedStart?: Maybe<Scalars['DateTime']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  metadata?: Maybe<Scalars['ID']>;
};

export type UpcomingWorkingGroupOpeningWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent_eq?: Maybe<Scalars['ID']>;
  createdInEvent_in?: Maybe<Array<Scalars['ID']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  expectedStart_eq?: Maybe<Scalars['DateTime']>;
  expectedStart_lt?: Maybe<Scalars['DateTime']>;
  expectedStart_lte?: Maybe<Scalars['DateTime']>;
  expectedStart_gt?: Maybe<Scalars['DateTime']>;
  expectedStart_gte?: Maybe<Scalars['DateTime']>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<StatusTextChangedEventWhereInput>;
  group?: Maybe<WorkingGroupWhereInput>;
  metadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  AND?: Maybe<Array<UpcomingWorkingGroupOpeningWhereInput>>;
  OR?: Maybe<Array<UpcomingWorkingGroupOpeningWhereInput>>;
};

export type UpcomingWorkingGroupOpeningWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpdateWorkingGroupBudgetProposalDetails = {
  __typename: 'UpdateWorkingGroupBudgetProposalDetails';
  /** Amount to increase / decrease the working group budget by (will be decudted from / appended to council budget accordingly) */
  amount: Scalars['BigInt'];
  /** Related working group */
  group?: Maybe<WorkingGroup>;
};

export type UpdateWorkingGroupBudgetProposalDetailsCreateInput = {
  amount: Scalars['BigInt'];
};

export type UpdateWorkingGroupBudgetProposalDetailsUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
};

export type UpdateWorkingGroupBudgetProposalDetailsWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<UpdateWorkingGroupBudgetProposalDetailsWhereInput>>;
  OR?: Maybe<Array<UpdateWorkingGroupBudgetProposalDetailsWhereInput>>;
};

export type UpdateWorkingGroupBudgetProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VariantNone = {
  __typename: 'VariantNone';
  phantom?: Maybe<Scalars['Int']>;
};

export type VariantNoneCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type VariantNoneUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type VariantNoneWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<VariantNoneWhereInput>>;
  OR?: Maybe<Array<VariantNoneWhereInput>>;
};

export type VariantNoneWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VetoProposalDetails = {
  __typename: 'VetoProposalDetails';
  /** Proposal to be vetoed */
  proposal?: Maybe<Proposal>;
};

export type Video = BaseGraphQlObject & {
  __typename: 'Video';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  channel: Channel;
  channelId: Scalars['String'];
  category?: Maybe<VideoCategory>;
  categoryId?: Maybe<Scalars['String']>;
  /** The title of the video */
  title?: Maybe<Scalars['String']>;
  /** The description of the Video */
  description?: Maybe<Scalars['String']>;
  /** Video duration in seconds */
  duration?: Maybe<Scalars['Int']>;
  /** Video thumbnail asset (recommended ratio: 16:9) */
  thumbnailPhoto?: Maybe<Asset>;
  language?: Maybe<Language>;
  languageId?: Maybe<Scalars['String']>;
  /** Whether or not Video contains marketing */
  hasMarketing?: Maybe<Scalars['Boolean']>;
  /** If the Video was published on other platform before beeing published on Joystream - the original publication date */
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  /** Whether the Video is supposed to be publically displayed */
  isPublic?: Maybe<Scalars['Boolean']>;
  /** Flag signaling whether a video is censored. */
  isCensored: Scalars['Boolean'];
  /** Whether the Video contains explicit material. */
  isExplicit?: Maybe<Scalars['Boolean']>;
  license?: Maybe<License>;
  licenseId?: Maybe<Scalars['String']>;
  /** Video media asset */
  media?: Maybe<Asset>;
  mediaMetadata?: Maybe<VideoMediaMetadata>;
  mediaMetadataId?: Maybe<Scalars['String']>;
  createdInBlock: Scalars['Int'];
  /** Is video featured or not */
  isFeatured: Scalars['Boolean'];
};

export type VideoCategoriesByNameFtsOutput = {
  __typename: 'VideoCategoriesByNameFTSOutput';
  item: VideoCategoriesByNameSearchResult;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
  highlight: Scalars['String'];
};

export type VideoCategoriesByNameSearchResult = VideoCategory;

export type VideoCategory = BaseGraphQlObject & {
  __typename: 'VideoCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The name of the category */
  name?: Maybe<Scalars['String']>;
  videos: Array<Video>;
  createdInBlock: Scalars['Int'];
};

export type VideoCategoryConnection = {
  __typename: 'VideoCategoryConnection';
  totalCount: Scalars['Int'];
  edges: Array<VideoCategoryEdge>;
  pageInfo: PageInfo;
};

export type VideoCategoryCreateInput = {
  name?: Maybe<Scalars['String']>;
  createdInBlock: Scalars['Float'];
};

export type VideoCategoryEdge = {
  __typename: 'VideoCategoryEdge';
  node: VideoCategory;
  cursor: Scalars['String'];
};

export enum VideoCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC'
}

export type VideoCategoryUpdateInput = {
  name?: Maybe<Scalars['String']>;
  createdInBlock?: Maybe<Scalars['Float']>;
};

export type VideoCategoryWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  name_eq?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_startsWith?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  videos_none?: Maybe<VideoWhereInput>;
  videos_some?: Maybe<VideoWhereInput>;
  videos_every?: Maybe<VideoWhereInput>;
  AND?: Maybe<Array<VideoCategoryWhereInput>>;
  OR?: Maybe<Array<VideoCategoryWhereInput>>;
};

export type VideoCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VideoConnection = {
  __typename: 'VideoConnection';
  totalCount: Scalars['Int'];
  edges: Array<VideoEdge>;
  pageInfo: PageInfo;
};

export type VideoCreateInput = {
  channel: Scalars['ID'];
  category?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  thumbnailPhoto: Scalars['JSONObject'];
  language?: Maybe<Scalars['ID']>;
  hasMarketing?: Maybe<Scalars['Boolean']>;
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  isCensored: Scalars['Boolean'];
  isExplicit?: Maybe<Scalars['Boolean']>;
  license?: Maybe<Scalars['ID']>;
  media: Scalars['JSONObject'];
  mediaMetadata?: Maybe<Scalars['ID']>;
  createdInBlock: Scalars['Float'];
  isFeatured: Scalars['Boolean'];
};

export type VideoEdge = {
  __typename: 'VideoEdge';
  node: Video;
  cursor: Scalars['String'];
};

export type VideoMediaEncoding = BaseGraphQlObject & {
  __typename: 'VideoMediaEncoding';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Encoding of the video media object */
  codecName?: Maybe<Scalars['String']>;
  /** Media container format */
  container?: Maybe<Scalars['String']>;
  /** Content MIME type */
  mimeMediaType?: Maybe<Scalars['String']>;
  videomediametadataencoding?: Maybe<Array<VideoMediaMetadata>>;
};

export type VideoMediaEncodingConnection = {
  __typename: 'VideoMediaEncodingConnection';
  totalCount: Scalars['Int'];
  edges: Array<VideoMediaEncodingEdge>;
  pageInfo: PageInfo;
};

export type VideoMediaEncodingCreateInput = {
  codecName?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  mimeMediaType?: Maybe<Scalars['String']>;
};

export type VideoMediaEncodingEdge = {
  __typename: 'VideoMediaEncodingEdge';
  node: VideoMediaEncoding;
  cursor: Scalars['String'];
};

export enum VideoMediaEncodingOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  CodecNameAsc = 'codecName_ASC',
  CodecNameDesc = 'codecName_DESC',
  ContainerAsc = 'container_ASC',
  ContainerDesc = 'container_DESC',
  MimeMediaTypeAsc = 'mimeMediaType_ASC',
  MimeMediaTypeDesc = 'mimeMediaType_DESC'
}

export type VideoMediaEncodingUpdateInput = {
  codecName?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  mimeMediaType?: Maybe<Scalars['String']>;
};

export type VideoMediaEncodingWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  codecName_eq?: Maybe<Scalars['String']>;
  codecName_contains?: Maybe<Scalars['String']>;
  codecName_startsWith?: Maybe<Scalars['String']>;
  codecName_endsWith?: Maybe<Scalars['String']>;
  codecName_in?: Maybe<Array<Scalars['String']>>;
  container_eq?: Maybe<Scalars['String']>;
  container_contains?: Maybe<Scalars['String']>;
  container_startsWith?: Maybe<Scalars['String']>;
  container_endsWith?: Maybe<Scalars['String']>;
  container_in?: Maybe<Array<Scalars['String']>>;
  mimeMediaType_eq?: Maybe<Scalars['String']>;
  mimeMediaType_contains?: Maybe<Scalars['String']>;
  mimeMediaType_startsWith?: Maybe<Scalars['String']>;
  mimeMediaType_endsWith?: Maybe<Scalars['String']>;
  mimeMediaType_in?: Maybe<Array<Scalars['String']>>;
  videomediametadataencoding_none?: Maybe<VideoMediaMetadataWhereInput>;
  videomediametadataencoding_some?: Maybe<VideoMediaMetadataWhereInput>;
  videomediametadataencoding_every?: Maybe<VideoMediaMetadataWhereInput>;
  AND?: Maybe<Array<VideoMediaEncodingWhereInput>>;
  OR?: Maybe<Array<VideoMediaEncodingWhereInput>>;
};

export type VideoMediaEncodingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VideoMediaMetadata = BaseGraphQlObject & {
  __typename: 'VideoMediaMetadata';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  encoding?: Maybe<VideoMediaEncoding>;
  encodingId?: Maybe<Scalars['String']>;
  /** Video media width in pixels */
  pixelWidth?: Maybe<Scalars['Int']>;
  /** Video media height in pixels */
  pixelHeight?: Maybe<Scalars['Int']>;
  /** Video media size in bytes */
  size?: Maybe<Scalars['BigInt']>;
  video?: Maybe<Video>;
  createdInBlock: Scalars['Int'];
};

export type VideoMediaMetadataConnection = {
  __typename: 'VideoMediaMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<VideoMediaMetadataEdge>;
  pageInfo: PageInfo;
};

export type VideoMediaMetadataCreateInput = {
  encoding?: Maybe<Scalars['ID']>;
  pixelWidth?: Maybe<Scalars['Float']>;
  pixelHeight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['BigInt']>;
  createdInBlock: Scalars['Float'];
};

export type VideoMediaMetadataEdge = {
  __typename: 'VideoMediaMetadataEdge';
  node: VideoMediaMetadata;
  cursor: Scalars['String'];
};

export enum VideoMediaMetadataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  EncodingAsc = 'encoding_ASC',
  EncodingDesc = 'encoding_DESC',
  PixelWidthAsc = 'pixelWidth_ASC',
  PixelWidthDesc = 'pixelWidth_DESC',
  PixelHeightAsc = 'pixelHeight_ASC',
  PixelHeightDesc = 'pixelHeight_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC'
}

export type VideoMediaMetadataUpdateInput = {
  encoding?: Maybe<Scalars['ID']>;
  pixelWidth?: Maybe<Scalars['Float']>;
  pixelHeight?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['BigInt']>;
  createdInBlock?: Maybe<Scalars['Float']>;
};

export type VideoMediaMetadataWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  encoding_eq?: Maybe<Scalars['ID']>;
  encoding_in?: Maybe<Array<Scalars['ID']>>;
  pixelWidth_eq?: Maybe<Scalars['Int']>;
  pixelWidth_gt?: Maybe<Scalars['Int']>;
  pixelWidth_gte?: Maybe<Scalars['Int']>;
  pixelWidth_lt?: Maybe<Scalars['Int']>;
  pixelWidth_lte?: Maybe<Scalars['Int']>;
  pixelWidth_in?: Maybe<Array<Scalars['Int']>>;
  pixelHeight_eq?: Maybe<Scalars['Int']>;
  pixelHeight_gt?: Maybe<Scalars['Int']>;
  pixelHeight_gte?: Maybe<Scalars['Int']>;
  pixelHeight_lt?: Maybe<Scalars['Int']>;
  pixelHeight_lte?: Maybe<Scalars['Int']>;
  pixelHeight_in?: Maybe<Array<Scalars['Int']>>;
  size_eq?: Maybe<Scalars['BigInt']>;
  size_gt?: Maybe<Scalars['BigInt']>;
  size_gte?: Maybe<Scalars['BigInt']>;
  size_lt?: Maybe<Scalars['BigInt']>;
  size_lte?: Maybe<Scalars['BigInt']>;
  size_in?: Maybe<Array<Scalars['BigInt']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  encoding?: Maybe<VideoMediaEncodingWhereInput>;
  video?: Maybe<VideoWhereInput>;
  AND?: Maybe<Array<VideoMediaMetadataWhereInput>>;
  OR?: Maybe<Array<VideoMediaMetadataWhereInput>>;
};

export type VideoMediaMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum VideoOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ChannelAsc = 'channel_ASC',
  ChannelDesc = 'channel_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  HasMarketingAsc = 'hasMarketing_ASC',
  HasMarketingDesc = 'hasMarketing_DESC',
  PublishedBeforeJoystreamAsc = 'publishedBeforeJoystream_ASC',
  PublishedBeforeJoystreamDesc = 'publishedBeforeJoystream_DESC',
  IsPublicAsc = 'isPublic_ASC',
  IsPublicDesc = 'isPublic_DESC',
  IsCensoredAsc = 'isCensored_ASC',
  IsCensoredDesc = 'isCensored_DESC',
  IsExplicitAsc = 'isExplicit_ASC',
  IsExplicitDesc = 'isExplicit_DESC',
  LicenseAsc = 'license_ASC',
  LicenseDesc = 'license_DESC',
  MediaMetadataAsc = 'mediaMetadata_ASC',
  MediaMetadataDesc = 'mediaMetadata_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  IsFeaturedAsc = 'isFeatured_ASC',
  IsFeaturedDesc = 'isFeatured_DESC'
}

export type VideoUpdateInput = {
  channel?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  thumbnailPhoto?: Maybe<Scalars['JSONObject']>;
  language?: Maybe<Scalars['ID']>;
  hasMarketing?: Maybe<Scalars['Boolean']>;
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  isCensored?: Maybe<Scalars['Boolean']>;
  isExplicit?: Maybe<Scalars['Boolean']>;
  license?: Maybe<Scalars['ID']>;
  media?: Maybe<Scalars['JSONObject']>;
  mediaMetadata?: Maybe<Scalars['ID']>;
  createdInBlock?: Maybe<Scalars['Float']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
};

export type VideoWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  channel_eq?: Maybe<Scalars['ID']>;
  channel_in?: Maybe<Array<Scalars['ID']>>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  title_eq?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_startsWith?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  duration_eq?: Maybe<Scalars['Int']>;
  duration_gt?: Maybe<Scalars['Int']>;
  duration_gte?: Maybe<Scalars['Int']>;
  duration_lt?: Maybe<Scalars['Int']>;
  duration_lte?: Maybe<Scalars['Int']>;
  duration_in?: Maybe<Array<Scalars['Int']>>;
  thumbnailPhoto_json?: Maybe<Scalars['JSONObject']>;
  language_eq?: Maybe<Scalars['ID']>;
  language_in?: Maybe<Array<Scalars['ID']>>;
  hasMarketing_eq?: Maybe<Scalars['Boolean']>;
  hasMarketing_in?: Maybe<Array<Scalars['Boolean']>>;
  publishedBeforeJoystream_eq?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_lt?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_lte?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_gt?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_gte?: Maybe<Scalars['DateTime']>;
  isPublic_eq?: Maybe<Scalars['Boolean']>;
  isPublic_in?: Maybe<Array<Scalars['Boolean']>>;
  isCensored_eq?: Maybe<Scalars['Boolean']>;
  isCensored_in?: Maybe<Array<Scalars['Boolean']>>;
  isExplicit_eq?: Maybe<Scalars['Boolean']>;
  isExplicit_in?: Maybe<Array<Scalars['Boolean']>>;
  license_eq?: Maybe<Scalars['ID']>;
  license_in?: Maybe<Array<Scalars['ID']>>;
  media_json?: Maybe<Scalars['JSONObject']>;
  mediaMetadata_eq?: Maybe<Scalars['ID']>;
  mediaMetadata_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  isFeatured_eq?: Maybe<Scalars['Boolean']>;
  isFeatured_in?: Maybe<Array<Scalars['Boolean']>>;
  channel?: Maybe<ChannelWhereInput>;
  category?: Maybe<VideoCategoryWhereInput>;
  language?: Maybe<LanguageWhereInput>;
  license?: Maybe<LicenseWhereInput>;
  mediaMetadata?: Maybe<VideoMediaMetadataWhereInput>;
  AND?: Maybe<Array<VideoWhereInput>>;
  OR?: Maybe<Array<VideoWhereInput>>;
};

export type VideoWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteCastEvent = BaseGraphQlObject & {
  __typename: 'VoteCastEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Account that cast the vote. */
  account: Scalars['String'];
  /** Hash of sealed vote. */
  hash: Scalars['String'];
  /** Vote power decided by amount staked. */
  votePower: Scalars['BigInt'];
};

export type VoteCastEventConnection = {
  __typename: 'VoteCastEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<VoteCastEventEdge>;
  pageInfo: PageInfo;
};

export type VoteCastEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  account: Scalars['String'];
  hash: Scalars['String'];
  votePower: Scalars['BigInt'];
};

export type VoteCastEventEdge = {
  __typename: 'VoteCastEventEdge';
  node: VoteCastEvent;
  cursor: Scalars['String'];
};

export enum VoteCastEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC'
}

export type VoteCastEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  account?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  votePower?: Maybe<Scalars['BigInt']>;
};

export type VoteCastEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  hash_eq?: Maybe<Scalars['String']>;
  hash_contains?: Maybe<Scalars['String']>;
  hash_startsWith?: Maybe<Scalars['String']>;
  hash_endsWith?: Maybe<Scalars['String']>;
  hash_in?: Maybe<Array<Scalars['String']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<VoteCastEventWhereInput>>;
  OR?: Maybe<Array<VoteCastEventWhereInput>>;
};

export type VoteCastEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteOnPollEvent = BaseGraphQlObject & {
  __typename: 'VoteOnPollEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  pollAlternative: ForumPollAlternative;
  pollAlternativeId: Scalars['String'];
  votingMember: Membership;
  votingMemberId: Scalars['String'];
};

export type VoteOnPollEventConnection = {
  __typename: 'VoteOnPollEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<VoteOnPollEventEdge>;
  pageInfo: PageInfo;
};

export type VoteOnPollEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  pollAlternative: Scalars['ID'];
  votingMember: Scalars['ID'];
};

export type VoteOnPollEventEdge = {
  __typename: 'VoteOnPollEventEdge';
  node: VoteOnPollEvent;
  cursor: Scalars['String'];
};

export enum VoteOnPollEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  PollAlternativeAsc = 'pollAlternative_ASC',
  PollAlternativeDesc = 'pollAlternative_DESC',
  VotingMemberAsc = 'votingMember_ASC',
  VotingMemberDesc = 'votingMember_DESC'
}

export type VoteOnPollEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  pollAlternative?: Maybe<Scalars['ID']>;
  votingMember?: Maybe<Scalars['ID']>;
};

export type VoteOnPollEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  pollAlternative_eq?: Maybe<Scalars['ID']>;
  pollAlternative_in?: Maybe<Array<Scalars['ID']>>;
  votingMember_eq?: Maybe<Scalars['ID']>;
  votingMember_in?: Maybe<Array<Scalars['ID']>>;
  pollAlternative?: Maybe<ForumPollAlternativeWhereInput>;
  votingMember?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<VoteOnPollEventWhereInput>>;
  OR?: Maybe<Array<VoteOnPollEventWhereInput>>;
};

export type VoteOnPollEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteRevealedEvent = BaseGraphQlObject & {
  __typename: 'VoteRevealedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Account that cast a vote. */
  account: Scalars['String'];
  member: Membership;
  memberId: Scalars['String'];
  /** Salt that has been used for the vote's hash creation. */
  salt: Scalars['String'];
};

export type VoteRevealedEventConnection = {
  __typename: 'VoteRevealedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<VoteRevealedEventEdge>;
  pageInfo: PageInfo;
};

export type VoteRevealedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  account: Scalars['String'];
  member: Scalars['ID'];
  salt: Scalars['String'];
};

export type VoteRevealedEventEdge = {
  __typename: 'VoteRevealedEventEdge';
  node: VoteRevealedEvent;
  cursor: Scalars['String'];
};

export enum VoteRevealedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  SaltAsc = 'salt_ASC',
  SaltDesc = 'salt_DESC'
}

export type VoteRevealedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  account?: Maybe<Scalars['String']>;
  member?: Maybe<Scalars['ID']>;
  salt?: Maybe<Scalars['String']>;
};

export type VoteRevealedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  account_eq?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_startsWith?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  salt_eq?: Maybe<Scalars['String']>;
  salt_contains?: Maybe<Scalars['String']>;
  salt_startsWith?: Maybe<Scalars['String']>;
  salt_endsWith?: Maybe<Scalars['String']>;
  salt_in?: Maybe<Array<Scalars['String']>>;
  member?: Maybe<MembershipWhereInput>;
  AND?: Maybe<Array<VoteRevealedEventWhereInput>>;
  OR?: Maybe<Array<VoteRevealedEventWhereInput>>;
};

export type VoteRevealedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VotingPeriodStartedEvent = BaseGraphQlObject & {
  __typename: 'VotingPeriodStartedEvent';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Number of candidates in the election. */
  numOfCandidates: Scalars['BigInt'];
};

export type VotingPeriodStartedEventConnection = {
  __typename: 'VotingPeriodStartedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<VotingPeriodStartedEventEdge>;
  pageInfo: PageInfo;
};

export type VotingPeriodStartedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  numOfCandidates: Scalars['BigInt'];
};

export type VotingPeriodStartedEventEdge = {
  __typename: 'VotingPeriodStartedEventEdge';
  node: VotingPeriodStartedEvent;
  cursor: Scalars['String'];
};

export enum VotingPeriodStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NumOfCandidatesAsc = 'numOfCandidates_ASC',
  NumOfCandidatesDesc = 'numOfCandidates_DESC'
}

export type VotingPeriodStartedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  numOfCandidates?: Maybe<Scalars['BigInt']>;
};

export type VotingPeriodStartedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  numOfCandidates_eq?: Maybe<Scalars['BigInt']>;
  numOfCandidates_gt?: Maybe<Scalars['BigInt']>;
  numOfCandidates_gte?: Maybe<Scalars['BigInt']>;
  numOfCandidates_lt?: Maybe<Scalars['BigInt']>;
  numOfCandidates_lte?: Maybe<Scalars['BigInt']>;
  numOfCandidates_in?: Maybe<Array<Scalars['BigInt']>>;
  AND?: Maybe<Array<VotingPeriodStartedEventWhereInput>>;
  OR?: Maybe<Array<VotingPeriodStartedEventWhereInput>>;
};

export type VotingPeriodStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Worker = BaseGraphQlObject & {
  __typename: 'Worker';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** WorkerId in specific working group module */
  runtimeId: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  membership: Membership;
  membershipId: Scalars['String'];
  /** Worker's role account */
  roleAccount: Scalars['String'];
  /** Worker's reward account */
  rewardAccount: Scalars['String'];
  /** Worker's staking account */
  stakeAccount: Scalars['String'];
  /** Current worker status */
  status: WorkerStatus;
  /** Whether the worker is also the working group lead */
  isLead: Scalars['Boolean'];
  /** Current role stake (in JOY) */
  stake: Scalars['BigInt'];
  /** Current reward per block */
  rewardPerBlock: Scalars['BigInt'];
  /** The reward amount the worker is currently missing (due to empty working group budget) */
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  payouts: Array<RewardPaidEvent>;
  slashes: Array<StakeSlashedEvent>;
  entry: OpeningFilledEvent;
  entryId: Scalars['String'];
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  /** Worker's storage data */
  storage?: Maybe<Scalars['String']>;
  managedForumCategories: Array<ForumCategory>;
  dataObjects: Array<DataObject>;
  categoryarchivalstatusupdatedeventactor?: Maybe<Array<CategoryArchivalStatusUpdatedEvent>>;
  categorydeletedeventactor?: Maybe<Array<CategoryDeletedEvent>>;
  categorymembershipofmoderatorupdatedeventmoderator?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEvent>>;
  categorystickythreadupdateeventactor?: Maybe<Array<CategoryStickyThreadUpdateEvent>>;
  leaderseteventworker?: Maybe<Array<LeaderSetEvent>>;
  leaderunseteventleader?: Maybe<Array<LeaderUnsetEvent>>;
  memberverificationstatusupdatedeventworker?: Maybe<Array<MemberVerificationStatusUpdatedEvent>>;
  newmissedrewardlevelreachedeventworker?: Maybe<Array<NewMissedRewardLevelReachedEvent>>;
  postmoderatedeventactor?: Maybe<Array<PostModeratedEvent>>;
  stakedecreasedeventworker?: Maybe<Array<StakeDecreasedEvent>>;
  stakeincreasedeventworker?: Maybe<Array<StakeIncreasedEvent>>;
  terminatedleadereventworker?: Maybe<Array<TerminatedLeaderEvent>>;
  terminatedworkereventworker?: Maybe<Array<TerminatedWorkerEvent>>;
  threadmoderatedeventactor?: Maybe<Array<ThreadModeratedEvent>>;
  threadmovedeventactor?: Maybe<Array<ThreadMovedEvent>>;
  workerexitedeventworker?: Maybe<Array<WorkerExitedEvent>>;
  workerrewardaccountupdatedeventworker?: Maybe<Array<WorkerRewardAccountUpdatedEvent>>;
  workerrewardamountupdatedeventworker?: Maybe<Array<WorkerRewardAmountUpdatedEvent>>;
  workerroleaccountupdatedeventworker?: Maybe<Array<WorkerRoleAccountUpdatedEvent>>;
  workerstartedleavingeventworker?: Maybe<Array<WorkerStartedLeavingEvent>>;
  workinggroupleader?: Maybe<Array<WorkingGroup>>;
};

export type WorkerConnection = {
  __typename: 'WorkerConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerEdge>;
  pageInfo: PageInfo;
};

export type WorkerCreateInput = {
  runtimeId: Scalars['Float'];
  group: Scalars['ID'];
  membership: Scalars['ID'];
  roleAccount: Scalars['String'];
  rewardAccount: Scalars['String'];
  stakeAccount: Scalars['String'];
  status: Scalars['JSONObject'];
  isLead: Scalars['Boolean'];
  stake: Scalars['BigInt'];
  rewardPerBlock: Scalars['BigInt'];
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  entry: Scalars['ID'];
  application: Scalars['ID'];
  storage?: Maybe<Scalars['String']>;
};

export type WorkerEdge = {
  __typename: 'WorkerEdge';
  node: Worker;
  cursor: Scalars['String'];
};

export type WorkerExitedEvent = Event & BaseGraphQlObject & {
  __typename: 'WorkerExitedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerExitedEventConnection = {
  __typename: 'WorkerExitedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerExitedEventEdge>;
  pageInfo: PageInfo;
};

export type WorkerExitedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
};

export type WorkerExitedEventEdge = {
  __typename: 'WorkerExitedEventEdge';
  node: WorkerExitedEvent;
  cursor: Scalars['String'];
};

export enum WorkerExitedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerExitedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerExitedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkerExitedEventWhereInput>>;
  OR?: Maybe<Array<WorkerExitedEventWhereInput>>;
};

export type WorkerExitedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkerOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  MembershipAsc = 'membership_ASC',
  MembershipDesc = 'membership_DESC',
  RoleAccountAsc = 'roleAccount_ASC',
  RoleAccountDesc = 'roleAccount_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  StakeAccountAsc = 'stakeAccount_ASC',
  StakeAccountDesc = 'stakeAccount_DESC',
  IsLeadAsc = 'isLead_ASC',
  IsLeadDesc = 'isLead_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC',
  MissingRewardAmountAsc = 'missingRewardAmount_ASC',
  MissingRewardAmountDesc = 'missingRewardAmount_DESC',
  EntryAsc = 'entry_ASC',
  EntryDesc = 'entry_DESC',
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  StorageAsc = 'storage_ASC',
  StorageDesc = 'storage_DESC'
}

export type WorkerRewardAccountUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'WorkerRewardAccountUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** New reward account */
  newRewardAccount: Scalars['String'];
};

export type WorkerRewardAccountUpdatedEventConnection = {
  __typename: 'WorkerRewardAccountUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerRewardAccountUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type WorkerRewardAccountUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  newRewardAccount: Scalars['String'];
};

export type WorkerRewardAccountUpdatedEventEdge = {
  __typename: 'WorkerRewardAccountUpdatedEventEdge';
  node: WorkerRewardAccountUpdatedEvent;
  cursor: Scalars['String'];
};

export enum WorkerRewardAccountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  NewRewardAccountAsc = 'newRewardAccount_ASC',
  NewRewardAccountDesc = 'newRewardAccount_DESC'
}

export type WorkerRewardAccountUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  newRewardAccount?: Maybe<Scalars['String']>;
};

export type WorkerRewardAccountUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  newRewardAccount_eq?: Maybe<Scalars['String']>;
  newRewardAccount_contains?: Maybe<Scalars['String']>;
  newRewardAccount_startsWith?: Maybe<Scalars['String']>;
  newRewardAccount_endsWith?: Maybe<Scalars['String']>;
  newRewardAccount_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkerRewardAccountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRewardAccountUpdatedEventWhereInput>>;
};

export type WorkerRewardAccountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerRewardAmountUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'WorkerRewardAmountUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** New worker reward per block */
  newRewardPerBlock: Scalars['BigInt'];
};

export type WorkerRewardAmountUpdatedEventConnection = {
  __typename: 'WorkerRewardAmountUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerRewardAmountUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type WorkerRewardAmountUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  newRewardPerBlock: Scalars['BigInt'];
};

export type WorkerRewardAmountUpdatedEventEdge = {
  __typename: 'WorkerRewardAmountUpdatedEventEdge';
  node: WorkerRewardAmountUpdatedEvent;
  cursor: Scalars['String'];
};

export enum WorkerRewardAmountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  NewRewardPerBlockAsc = 'newRewardPerBlock_ASC',
  NewRewardPerBlockDesc = 'newRewardPerBlock_DESC'
}

export type WorkerRewardAmountUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  newRewardPerBlock?: Maybe<Scalars['BigInt']>;
};

export type WorkerRewardAmountUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkerRewardAmountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRewardAmountUpdatedEventWhereInput>>;
};

export type WorkerRewardAmountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerRoleAccountUpdatedEvent = Event & BaseGraphQlObject & {
  __typename: 'WorkerRoleAccountUpdatedEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** New role account */
  newRoleAccount: Scalars['String'];
};

export type WorkerRoleAccountUpdatedEventConnection = {
  __typename: 'WorkerRoleAccountUpdatedEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerRoleAccountUpdatedEventEdge>;
  pageInfo: PageInfo;
};

export type WorkerRoleAccountUpdatedEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  newRoleAccount: Scalars['String'];
};

export type WorkerRoleAccountUpdatedEventEdge = {
  __typename: 'WorkerRoleAccountUpdatedEventEdge';
  node: WorkerRoleAccountUpdatedEvent;
  cursor: Scalars['String'];
};

export enum WorkerRoleAccountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  NewRoleAccountAsc = 'newRoleAccount_ASC',
  NewRoleAccountDesc = 'newRoleAccount_DESC'
}

export type WorkerRoleAccountUpdatedEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  newRoleAccount?: Maybe<Scalars['String']>;
};

export type WorkerRoleAccountUpdatedEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  newRoleAccount_eq?: Maybe<Scalars['String']>;
  newRoleAccount_contains?: Maybe<Scalars['String']>;
  newRoleAccount_startsWith?: Maybe<Scalars['String']>;
  newRoleAccount_endsWith?: Maybe<Scalars['String']>;
  newRoleAccount_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkerRoleAccountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRoleAccountUpdatedEventWhereInput>>;
};

export type WorkerRoleAccountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerStartedLeavingEvent = Event & BaseGraphQlObject & {
  __typename: 'WorkerStartedLeavingEvent';
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  worker: Worker;
  workerId: Scalars['String'];
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
};

export type WorkerStartedLeavingEventConnection = {
  __typename: 'WorkerStartedLeavingEventConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkerStartedLeavingEventEdge>;
  pageInfo: PageInfo;
};

export type WorkerStartedLeavingEventCreateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock: Scalars['Float'];
  network: Network;
  indexInBlock: Scalars['Float'];
  group: Scalars['ID'];
  worker: Scalars['ID'];
  rationale?: Maybe<Scalars['String']>;
};

export type WorkerStartedLeavingEventEdge = {
  __typename: 'WorkerStartedLeavingEventEdge';
  node: WorkerStartedLeavingEvent;
  cursor: Scalars['String'];
};

export enum WorkerStartedLeavingEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC'
}

export type WorkerStartedLeavingEventUpdateInput = {
  inExtrinsic?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  indexInBlock?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  worker?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
};

export type WorkerStartedLeavingEventWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  worker?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkerStartedLeavingEventWhereInput>>;
  OR?: Maybe<Array<WorkerStartedLeavingEventWhereInput>>;
};

export type WorkerStartedLeavingEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerStatus = WorkerStatusActive | WorkerStatusLeaving | WorkerStatusLeft | WorkerStatusTerminated;

export type WorkerStatusActive = {
  __typename: 'WorkerStatusActive';
  phantom?: Maybe<Scalars['Int']>;
};

export type WorkerStatusActiveCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type WorkerStatusActiveUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type WorkerStatusActiveWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  AND?: Maybe<Array<WorkerStatusActiveWhereInput>>;
  OR?: Maybe<Array<WorkerStatusActiveWhereInput>>;
};

export type WorkerStatusActiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerStatusLeaving = {
  __typename: 'WorkerStatusLeaving';
  /** Related event emitted on leaving initialization */
  workerStartedLeavingEvent?: Maybe<WorkerStartedLeavingEvent>;
};

export type WorkerStatusLeft = {
  __typename: 'WorkerStatusLeft';
  /** Related event emitted on leaving initialization */
  workerStartedLeavingEvent?: Maybe<WorkerStartedLeavingEvent>;
  /** Related event emitted once the worker has exited the role (after the unstaking period) */
  workerExitedEvent?: Maybe<WorkerExitedEvent>;
};

export type WorkerStatusTerminated = {
  __typename: 'WorkerStatusTerminated';
  /** Related event emitted on worker termination */
  terminatedWorkerEvent?: Maybe<TerminatedWorkerEvent>;
};

export type WorkerUpdateInput = {
  runtimeId?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  membership?: Maybe<Scalars['ID']>;
  roleAccount?: Maybe<Scalars['String']>;
  rewardAccount?: Maybe<Scalars['String']>;
  stakeAccount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
  isLead?: Maybe<Scalars['Boolean']>;
  stake?: Maybe<Scalars['BigInt']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  entry?: Maybe<Scalars['ID']>;
  application?: Maybe<Scalars['ID']>;
  storage?: Maybe<Scalars['String']>;
};

export type WorkerWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  membership_eq?: Maybe<Scalars['ID']>;
  membership_in?: Maybe<Array<Scalars['ID']>>;
  roleAccount_eq?: Maybe<Scalars['String']>;
  roleAccount_contains?: Maybe<Scalars['String']>;
  roleAccount_startsWith?: Maybe<Scalars['String']>;
  roleAccount_endsWith?: Maybe<Scalars['String']>;
  roleAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  stakeAccount_eq?: Maybe<Scalars['String']>;
  stakeAccount_contains?: Maybe<Scalars['String']>;
  stakeAccount_startsWith?: Maybe<Scalars['String']>;
  stakeAccount_endsWith?: Maybe<Scalars['String']>;
  stakeAccount_in?: Maybe<Array<Scalars['String']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  isLead_eq?: Maybe<Scalars['Boolean']>;
  isLead_in?: Maybe<Array<Scalars['Boolean']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  missingRewardAmount_eq?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_gt?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_gte?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_lt?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_lte?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  entry_eq?: Maybe<Scalars['ID']>;
  entry_in?: Maybe<Array<Scalars['ID']>>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  storage_eq?: Maybe<Scalars['String']>;
  storage_contains?: Maybe<Scalars['String']>;
  storage_startsWith?: Maybe<Scalars['String']>;
  storage_endsWith?: Maybe<Scalars['String']>;
  storage_in?: Maybe<Array<Scalars['String']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  membership?: Maybe<MembershipWhereInput>;
  payouts_none?: Maybe<RewardPaidEventWhereInput>;
  payouts_some?: Maybe<RewardPaidEventWhereInput>;
  payouts_every?: Maybe<RewardPaidEventWhereInput>;
  slashes_none?: Maybe<StakeSlashedEventWhereInput>;
  slashes_some?: Maybe<StakeSlashedEventWhereInput>;
  slashes_every?: Maybe<StakeSlashedEventWhereInput>;
  entry?: Maybe<OpeningFilledEventWhereInput>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  managedForumCategories_none?: Maybe<ForumCategoryWhereInput>;
  managedForumCategories_some?: Maybe<ForumCategoryWhereInput>;
  managedForumCategories_every?: Maybe<ForumCategoryWhereInput>;
  dataObjects_none?: Maybe<DataObjectWhereInput>;
  dataObjects_some?: Maybe<DataObjectWhereInput>;
  dataObjects_every?: Maybe<DataObjectWhereInput>;
  categoryarchivalstatusupdatedeventactor_none?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventactor_some?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventactor_every?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categorydeletedeventactor_none?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventactor_some?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventactor_every?: Maybe<CategoryDeletedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_none?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_some?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_every?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorystickythreadupdateeventactor_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventactor_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventactor_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  leaderseteventworker_none?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventworker_some?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventworker_every?: Maybe<LeaderSetEventWhereInput>;
  leaderunseteventleader_none?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventleader_some?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventleader_every?: Maybe<LeaderUnsetEventWhereInput>;
  memberverificationstatusupdatedeventworker_none?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventworker_some?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventworker_every?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  newmissedrewardlevelreachedeventworker_none?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventworker_some?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventworker_every?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  postmoderatedeventactor_none?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventactor_some?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventactor_every?: Maybe<PostModeratedEventWhereInput>;
  stakedecreasedeventworker_none?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventworker_some?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventworker_every?: Maybe<StakeDecreasedEventWhereInput>;
  stakeincreasedeventworker_none?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventworker_some?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventworker_every?: Maybe<StakeIncreasedEventWhereInput>;
  terminatedleadereventworker_none?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventworker_some?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventworker_every?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedworkereventworker_none?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventworker_some?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventworker_every?: Maybe<TerminatedWorkerEventWhereInput>;
  threadmoderatedeventactor_none?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventactor_some?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventactor_every?: Maybe<ThreadModeratedEventWhereInput>;
  threadmovedeventactor_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventactor_some?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventactor_every?: Maybe<ThreadMovedEventWhereInput>;
  workerexitedeventworker_none?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventworker_some?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventworker_every?: Maybe<WorkerExitedEventWhereInput>;
  workerrewardaccountupdatedeventworker_none?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventworker_some?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventworker_every?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_none?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_some?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_every?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_none?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_some?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_every?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerstartedleavingeventworker_none?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventworker_some?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventworker_every?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workinggroupleader_none?: Maybe<WorkingGroupWhereInput>;
  workinggroupleader_some?: Maybe<WorkingGroupWhereInput>;
  workinggroupleader_every?: Maybe<WorkingGroupWhereInput>;
  AND?: Maybe<Array<WorkerWhereInput>>;
  OR?: Maybe<Array<WorkerWhereInput>>;
};

export type WorkerWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroup = BaseGraphQlObject & {
  __typename: 'WorkingGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Working group name */
  name: Scalars['String'];
  metadata?: Maybe<WorkingGroupMetadata>;
  metadataId?: Maybe<Scalars['String']>;
  leader?: Maybe<Worker>;
  leaderId?: Maybe<Scalars['String']>;
  workers: Array<Worker>;
  openings: Array<WorkingGroupOpening>;
  /** Current working group budget (JOY) */
  budget: Scalars['BigInt'];
  applicationwithdrawneventgroup?: Maybe<Array<ApplicationWithdrawnEvent>>;
  appliedonopeningeventgroup?: Maybe<Array<AppliedOnOpeningEvent>>;
  budgetseteventgroup?: Maybe<Array<BudgetSetEvent>>;
  budgetspendingeventgroup?: Maybe<Array<BudgetSpendingEvent>>;
  leaderseteventgroup?: Maybe<Array<LeaderSetEvent>>;
  leaderunseteventgroup?: Maybe<Array<LeaderUnsetEvent>>;
  newmissedrewardlevelreachedeventgroup?: Maybe<Array<NewMissedRewardLevelReachedEvent>>;
  openingaddedeventgroup?: Maybe<Array<OpeningAddedEvent>>;
  openingcanceledeventgroup?: Maybe<Array<OpeningCanceledEvent>>;
  openingfilledeventgroup?: Maybe<Array<OpeningFilledEvent>>;
  rewardpaideventgroup?: Maybe<Array<RewardPaidEvent>>;
  stakedecreasedeventgroup?: Maybe<Array<StakeDecreasedEvent>>;
  stakeincreasedeventgroup?: Maybe<Array<StakeIncreasedEvent>>;
  stakeslashedeventgroup?: Maybe<Array<StakeSlashedEvent>>;
  statustextchangedeventgroup?: Maybe<Array<StatusTextChangedEvent>>;
  terminatedleadereventgroup?: Maybe<Array<TerminatedLeaderEvent>>;
  terminatedworkereventgroup?: Maybe<Array<TerminatedWorkerEvent>>;
  upcomingworkinggroupopeninggroup?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  workerexitedeventgroup?: Maybe<Array<WorkerExitedEvent>>;
  workerrewardaccountupdatedeventgroup?: Maybe<Array<WorkerRewardAccountUpdatedEvent>>;
  workerrewardamountupdatedeventgroup?: Maybe<Array<WorkerRewardAmountUpdatedEvent>>;
  workerroleaccountupdatedeventgroup?: Maybe<Array<WorkerRoleAccountUpdatedEvent>>;
  workerstartedleavingeventgroup?: Maybe<Array<WorkerStartedLeavingEvent>>;
  workinggroupmetadatagroup?: Maybe<Array<WorkingGroupMetadata>>;
};

export type WorkingGroupApplication = BaseGraphQlObject & {
  __typename: 'WorkingGroupApplication';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** ApplicationId in specific working group module */
  runtimeId: Scalars['Int'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  applicant: Membership;
  applicantId: Scalars['String'];
  /** Application stake */
  stake: Scalars['BigInt'];
  /** Applicant's initial role account */
  roleAccount: Scalars['String'];
  /** Applicant's initial reward account */
  rewardAccount: Scalars['String'];
  /** Applicant's initial staking account */
  stakingAccount: Scalars['String'];
  answers: Array<ApplicationFormQuestionAnswer>;
  /** Current application status */
  status: WorkingGroupApplicationStatus;
  createdInEvent: AppliedOnOpeningEvent;
  applicationwithdrawneventapplication?: Maybe<Array<ApplicationWithdrawnEvent>>;
  workerapplication?: Maybe<Array<Worker>>;
};

export type WorkingGroupApplicationConnection = {
  __typename: 'WorkingGroupApplicationConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkingGroupApplicationEdge>;
  pageInfo: PageInfo;
};

export type WorkingGroupApplicationCreateInput = {
  runtimeId: Scalars['Float'];
  opening: Scalars['ID'];
  applicant: Scalars['ID'];
  stake: Scalars['BigInt'];
  roleAccount: Scalars['String'];
  rewardAccount: Scalars['String'];
  stakingAccount: Scalars['String'];
  status: Scalars['JSONObject'];
};

export type WorkingGroupApplicationEdge = {
  __typename: 'WorkingGroupApplicationEdge';
  node: WorkingGroupApplication;
  cursor: Scalars['String'];
};

export enum WorkingGroupApplicationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  ApplicantAsc = 'applicant_ASC',
  ApplicantDesc = 'applicant_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  RoleAccountAsc = 'roleAccount_ASC',
  RoleAccountDesc = 'roleAccount_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC'
}

export type WorkingGroupApplicationStatus = ApplicationStatusPending | ApplicationStatusAccepted | ApplicationStatusRejected | ApplicationStatusWithdrawn | ApplicationStatusCancelled;

export type WorkingGroupApplicationUpdateInput = {
  runtimeId?: Maybe<Scalars['Float']>;
  opening?: Maybe<Scalars['ID']>;
  applicant?: Maybe<Scalars['ID']>;
  stake?: Maybe<Scalars['BigInt']>;
  roleAccount?: Maybe<Scalars['String']>;
  rewardAccount?: Maybe<Scalars['String']>;
  stakingAccount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
};

export type WorkingGroupApplicationWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  applicant_eq?: Maybe<Scalars['ID']>;
  applicant_in?: Maybe<Array<Scalars['ID']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  roleAccount_eq?: Maybe<Scalars['String']>;
  roleAccount_contains?: Maybe<Scalars['String']>;
  roleAccount_startsWith?: Maybe<Scalars['String']>;
  roleAccount_endsWith?: Maybe<Scalars['String']>;
  roleAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  applicant?: Maybe<MembershipWhereInput>;
  answers_none?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  answers_some?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  answers_every?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  createdInEvent?: Maybe<AppliedOnOpeningEventWhereInput>;
  applicationwithdrawneventapplication_none?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventapplication_some?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventapplication_every?: Maybe<ApplicationWithdrawnEventWhereInput>;
  workerapplication_none?: Maybe<WorkerWhereInput>;
  workerapplication_some?: Maybe<WorkerWhereInput>;
  workerapplication_every?: Maybe<WorkerWhereInput>;
  AND?: Maybe<Array<WorkingGroupApplicationWhereInput>>;
  OR?: Maybe<Array<WorkingGroupApplicationWhereInput>>;
};

export type WorkingGroupApplicationWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroupConnection = {
  __typename: 'WorkingGroupConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkingGroupEdge>;
  pageInfo: PageInfo;
};

export type WorkingGroupCreateInput = {
  name: Scalars['String'];
  metadata?: Maybe<Scalars['ID']>;
  leader?: Maybe<Scalars['ID']>;
  budget: Scalars['BigInt'];
};

export type WorkingGroupEdge = {
  __typename: 'WorkingGroupEdge';
  node: WorkingGroup;
  cursor: Scalars['String'];
};

export type WorkingGroupMetadata = BaseGraphQlObject & {
  __typename: 'WorkingGroupMetadata';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Working group status */
  status?: Maybe<Scalars['String']>;
  /** Working group status message */
  statusMessage?: Maybe<Scalars['String']>;
  /** Working group about text */
  about?: Maybe<Scalars['String']>;
  /** Working group description text */
  description?: Maybe<Scalars['String']>;
  setInEvent: StatusTextChangedEvent;
  setInEventId: Scalars['String'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  workinggroupmetadata?: Maybe<Array<WorkingGroup>>;
};

export type WorkingGroupMetadataActionResult = UpcomingOpeningAdded | UpcomingOpeningRemoved | WorkingGroupMetadataSet | InvalidActionMetadata;

export type WorkingGroupMetadataConnection = {
  __typename: 'WorkingGroupMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkingGroupMetadataEdge>;
  pageInfo: PageInfo;
};

export type WorkingGroupMetadataCreateInput = {
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  setInEvent: Scalars['ID'];
  group: Scalars['ID'];
};

export type WorkingGroupMetadataEdge = {
  __typename: 'WorkingGroupMetadataEdge';
  node: WorkingGroupMetadata;
  cursor: Scalars['String'];
};

export enum WorkingGroupMetadataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  StatusMessageAsc = 'statusMessage_ASC',
  StatusMessageDesc = 'statusMessage_DESC',
  AboutAsc = 'about_ASC',
  AboutDesc = 'about_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  SetInEventAsc = 'setInEvent_ASC',
  SetInEventDesc = 'setInEvent_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC'
}

export type WorkingGroupMetadataSet = {
  __typename: 'WorkingGroupMetadataSet';
  /** The new metadata snapshot resulting from the update */
  metadata?: Maybe<WorkingGroupMetadata>;
};

export type WorkingGroupMetadataUpdateInput = {
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  setInEvent?: Maybe<Scalars['ID']>;
  group?: Maybe<Scalars['ID']>;
};

export type WorkingGroupMetadataWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  status_eq?: Maybe<Scalars['String']>;
  status_contains?: Maybe<Scalars['String']>;
  status_startsWith?: Maybe<Scalars['String']>;
  status_endsWith?: Maybe<Scalars['String']>;
  status_in?: Maybe<Array<Scalars['String']>>;
  statusMessage_eq?: Maybe<Scalars['String']>;
  statusMessage_contains?: Maybe<Scalars['String']>;
  statusMessage_startsWith?: Maybe<Scalars['String']>;
  statusMessage_endsWith?: Maybe<Scalars['String']>;
  statusMessage_in?: Maybe<Array<Scalars['String']>>;
  about_eq?: Maybe<Scalars['String']>;
  about_contains?: Maybe<Scalars['String']>;
  about_startsWith?: Maybe<Scalars['String']>;
  about_endsWith?: Maybe<Scalars['String']>;
  about_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  setInEvent_eq?: Maybe<Scalars['ID']>;
  setInEvent_in?: Maybe<Array<Scalars['ID']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  setInEvent?: Maybe<StatusTextChangedEventWhereInput>;
  group?: Maybe<WorkingGroupWhereInput>;
  workinggroupmetadata_none?: Maybe<WorkingGroupWhereInput>;
  workinggroupmetadata_some?: Maybe<WorkingGroupWhereInput>;
  workinggroupmetadata_every?: Maybe<WorkingGroupWhereInput>;
  AND?: Maybe<Array<WorkingGroupMetadataWhereInput>>;
  OR?: Maybe<Array<WorkingGroupMetadataWhereInput>>;
};

export type WorkingGroupMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroupOpening = BaseGraphQlObject & {
  __typename: 'WorkingGroupOpening';
  id: Scalars['ID'];
  /** Time of opening creation */
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** OpeningId in specific working group module */
  runtimeId: Scalars['Int'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  applications: Array<WorkingGroupApplication>;
  /** Type of the opening (Leader/Regular) */
  type: WorkingGroupOpeningType;
  /** Current opening status */
  status: WorkingGroupOpeningStatus;
  metadata: WorkingGroupOpeningMetadata;
  metadataId: Scalars['String'];
  /** Min. application/role stake amount */
  stakeAmount: Scalars['BigInt'];
  /** Role stake unstaking period in blocks */
  unstakingPeriod: Scalars['Int'];
  /** Initial workers' reward per block */
  rewardPerBlock: Scalars['BigInt'];
  createdInEvent: OpeningAddedEvent;
  appliedonopeningeventopening?: Maybe<Array<AppliedOnOpeningEvent>>;
  openingcanceledeventopening?: Maybe<Array<OpeningCanceledEvent>>;
  openingfilledeventopening?: Maybe<Array<OpeningFilledEvent>>;
};

export type WorkingGroupOpeningConnection = {
  __typename: 'WorkingGroupOpeningConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkingGroupOpeningEdge>;
  pageInfo: PageInfo;
};

export type WorkingGroupOpeningCreateInput = {
  createdAt: Scalars['DateTime'];
  runtimeId: Scalars['Float'];
  group: Scalars['ID'];
  type: WorkingGroupOpeningType;
  status: Scalars['JSONObject'];
  metadata: Scalars['ID'];
  stakeAmount: Scalars['BigInt'];
  unstakingPeriod: Scalars['Float'];
  rewardPerBlock: Scalars['BigInt'];
};

export type WorkingGroupOpeningEdge = {
  __typename: 'WorkingGroupOpeningEdge';
  node: WorkingGroupOpening;
  cursor: Scalars['String'];
};

export type WorkingGroupOpeningMetadata = BaseGraphQlObject & {
  __typename: 'WorkingGroupOpeningMetadata';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Whether the originally provided metadata was valid */
  originallyValid: Scalars['Boolean'];
  /** Opening short description */
  shortDescription?: Maybe<Scalars['String']>;
  /** Opening description (md-formatted) */
  description?: Maybe<Scalars['String']>;
  /** Expected max. number of applicants that will be hired */
  hiringLimit?: Maybe<Scalars['Int']>;
  /** Expected time when the opening will close */
  expectedEnding?: Maybe<Scalars['DateTime']>;
  /** Md-formatted text explaining the application process */
  applicationDetails?: Maybe<Scalars['String']>;
  applicationFormQuestions: Array<ApplicationFormQuestion>;
  upcomingworkinggroupopeningmetadata?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  workinggroupopeningmetadata?: Maybe<Array<WorkingGroupOpening>>;
};

export type WorkingGroupOpeningMetadataConnection = {
  __typename: 'WorkingGroupOpeningMetadataConnection';
  totalCount: Scalars['Int'];
  edges: Array<WorkingGroupOpeningMetadataEdge>;
  pageInfo: PageInfo;
};

export type WorkingGroupOpeningMetadataCreateInput = {
  originallyValid: Scalars['Boolean'];
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hiringLimit?: Maybe<Scalars['Float']>;
  expectedEnding?: Maybe<Scalars['DateTime']>;
  applicationDetails?: Maybe<Scalars['String']>;
};

export type WorkingGroupOpeningMetadataEdge = {
  __typename: 'WorkingGroupOpeningMetadataEdge';
  node: WorkingGroupOpeningMetadata;
  cursor: Scalars['String'];
};

export enum WorkingGroupOpeningMetadataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  OriginallyValidAsc = 'originallyValid_ASC',
  OriginallyValidDesc = 'originallyValid_DESC',
  ShortDescriptionAsc = 'shortDescription_ASC',
  ShortDescriptionDesc = 'shortDescription_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  HiringLimitAsc = 'hiringLimit_ASC',
  HiringLimitDesc = 'hiringLimit_DESC',
  ExpectedEndingAsc = 'expectedEnding_ASC',
  ExpectedEndingDesc = 'expectedEnding_DESC',
  ApplicationDetailsAsc = 'applicationDetails_ASC',
  ApplicationDetailsDesc = 'applicationDetails_DESC'
}

export type WorkingGroupOpeningMetadataUpdateInput = {
  originallyValid?: Maybe<Scalars['Boolean']>;
  shortDescription?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hiringLimit?: Maybe<Scalars['Float']>;
  expectedEnding?: Maybe<Scalars['DateTime']>;
  applicationDetails?: Maybe<Scalars['String']>;
};

export type WorkingGroupOpeningMetadataWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  originallyValid_eq?: Maybe<Scalars['Boolean']>;
  originallyValid_in?: Maybe<Array<Scalars['Boolean']>>;
  shortDescription_eq?: Maybe<Scalars['String']>;
  shortDescription_contains?: Maybe<Scalars['String']>;
  shortDescription_startsWith?: Maybe<Scalars['String']>;
  shortDescription_endsWith?: Maybe<Scalars['String']>;
  shortDescription_in?: Maybe<Array<Scalars['String']>>;
  description_eq?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_startsWith?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  hiringLimit_eq?: Maybe<Scalars['Int']>;
  hiringLimit_gt?: Maybe<Scalars['Int']>;
  hiringLimit_gte?: Maybe<Scalars['Int']>;
  hiringLimit_lt?: Maybe<Scalars['Int']>;
  hiringLimit_lte?: Maybe<Scalars['Int']>;
  hiringLimit_in?: Maybe<Array<Scalars['Int']>>;
  expectedEnding_eq?: Maybe<Scalars['DateTime']>;
  expectedEnding_lt?: Maybe<Scalars['DateTime']>;
  expectedEnding_lte?: Maybe<Scalars['DateTime']>;
  expectedEnding_gt?: Maybe<Scalars['DateTime']>;
  expectedEnding_gte?: Maybe<Scalars['DateTime']>;
  applicationDetails_eq?: Maybe<Scalars['String']>;
  applicationDetails_contains?: Maybe<Scalars['String']>;
  applicationDetails_startsWith?: Maybe<Scalars['String']>;
  applicationDetails_endsWith?: Maybe<Scalars['String']>;
  applicationDetails_in?: Maybe<Array<Scalars['String']>>;
  applicationFormQuestions_none?: Maybe<ApplicationFormQuestionWhereInput>;
  applicationFormQuestions_some?: Maybe<ApplicationFormQuestionWhereInput>;
  applicationFormQuestions_every?: Maybe<ApplicationFormQuestionWhereInput>;
  upcomingworkinggroupopeningmetadata_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningmetadata_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningmetadata_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  workinggroupopeningmetadata_none?: Maybe<WorkingGroupOpeningWhereInput>;
  workinggroupopeningmetadata_some?: Maybe<WorkingGroupOpeningWhereInput>;
  workinggroupopeningmetadata_every?: Maybe<WorkingGroupOpeningWhereInput>;
  AND?: Maybe<Array<WorkingGroupOpeningMetadataWhereInput>>;
  OR?: Maybe<Array<WorkingGroupOpeningMetadataWhereInput>>;
};

export type WorkingGroupOpeningMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkingGroupOpeningOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  StakeAmountAsc = 'stakeAmount_ASC',
  StakeAmountDesc = 'stakeAmount_DESC',
  UnstakingPeriodAsc = 'unstakingPeriod_ASC',
  UnstakingPeriodDesc = 'unstakingPeriod_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC'
}

export type WorkingGroupOpeningStatus = OpeningStatusOpen | OpeningStatusFilled | OpeningStatusCancelled;

export enum WorkingGroupOpeningType {
  Regular = 'REGULAR',
  Leader = 'LEADER'
}

export type WorkingGroupOpeningUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  runtimeId?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['ID']>;
  type?: Maybe<WorkingGroupOpeningType>;
  status?: Maybe<Scalars['JSONObject']>;
  metadata?: Maybe<Scalars['ID']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
  unstakingPeriod?: Maybe<Scalars['Float']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
};

export type WorkingGroupOpeningWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  type_eq?: Maybe<WorkingGroupOpeningType>;
  type_in?: Maybe<Array<WorkingGroupOpeningType>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  unstakingPeriod_eq?: Maybe<Scalars['Int']>;
  unstakingPeriod_gt?: Maybe<Scalars['Int']>;
  unstakingPeriod_gte?: Maybe<Scalars['Int']>;
  unstakingPeriod_lt?: Maybe<Scalars['Int']>;
  unstakingPeriod_lte?: Maybe<Scalars['Int']>;
  unstakingPeriod_in?: Maybe<Array<Scalars['Int']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  applications_none?: Maybe<WorkingGroupApplicationWhereInput>;
  applications_some?: Maybe<WorkingGroupApplicationWhereInput>;
  applications_every?: Maybe<WorkingGroupApplicationWhereInput>;
  metadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  createdInEvent?: Maybe<OpeningAddedEventWhereInput>;
  appliedonopeningeventopening_none?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventopening_some?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventopening_every?: Maybe<AppliedOnOpeningEventWhereInput>;
  openingcanceledeventopening_none?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventopening_some?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventopening_every?: Maybe<OpeningCanceledEventWhereInput>;
  openingfilledeventopening_none?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventopening_some?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventopening_every?: Maybe<OpeningFilledEventWhereInput>;
  AND?: Maybe<Array<WorkingGroupOpeningWhereInput>>;
  OR?: Maybe<Array<WorkingGroupOpeningWhereInput>>;
};

export type WorkingGroupOpeningWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkingGroupOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  LeaderAsc = 'leader_ASC',
  LeaderDesc = 'leader_DESC',
  BudgetAsc = 'budget_ASC',
  BudgetDesc = 'budget_DESC'
}

export type WorkingGroupUpdateInput = {
  name?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['ID']>;
  leader?: Maybe<Scalars['ID']>;
  budget?: Maybe<Scalars['BigInt']>;
};

export type WorkingGroupWhereInput = {
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  name_eq?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_startsWith?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  leader_eq?: Maybe<Scalars['ID']>;
  leader_in?: Maybe<Array<Scalars['ID']>>;
  budget_eq?: Maybe<Scalars['BigInt']>;
  budget_gt?: Maybe<Scalars['BigInt']>;
  budget_gte?: Maybe<Scalars['BigInt']>;
  budget_lt?: Maybe<Scalars['BigInt']>;
  budget_lte?: Maybe<Scalars['BigInt']>;
  budget_in?: Maybe<Array<Scalars['BigInt']>>;
  metadata?: Maybe<WorkingGroupMetadataWhereInput>;
  leader?: Maybe<WorkerWhereInput>;
  workers_none?: Maybe<WorkerWhereInput>;
  workers_some?: Maybe<WorkerWhereInput>;
  workers_every?: Maybe<WorkerWhereInput>;
  openings_none?: Maybe<WorkingGroupOpeningWhereInput>;
  openings_some?: Maybe<WorkingGroupOpeningWhereInput>;
  openings_every?: Maybe<WorkingGroupOpeningWhereInput>;
  applicationwithdrawneventgroup_none?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventgroup_some?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventgroup_every?: Maybe<ApplicationWithdrawnEventWhereInput>;
  appliedonopeningeventgroup_none?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventgroup_some?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventgroup_every?: Maybe<AppliedOnOpeningEventWhereInput>;
  budgetseteventgroup_none?: Maybe<BudgetSetEventWhereInput>;
  budgetseteventgroup_some?: Maybe<BudgetSetEventWhereInput>;
  budgetseteventgroup_every?: Maybe<BudgetSetEventWhereInput>;
  budgetspendingeventgroup_none?: Maybe<BudgetSpendingEventWhereInput>;
  budgetspendingeventgroup_some?: Maybe<BudgetSpendingEventWhereInput>;
  budgetspendingeventgroup_every?: Maybe<BudgetSpendingEventWhereInput>;
  leaderseteventgroup_none?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventgroup_some?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventgroup_every?: Maybe<LeaderSetEventWhereInput>;
  leaderunseteventgroup_none?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventgroup_some?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventgroup_every?: Maybe<LeaderUnsetEventWhereInput>;
  newmissedrewardlevelreachedeventgroup_none?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventgroup_some?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventgroup_every?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  openingaddedeventgroup_none?: Maybe<OpeningAddedEventWhereInput>;
  openingaddedeventgroup_some?: Maybe<OpeningAddedEventWhereInput>;
  openingaddedeventgroup_every?: Maybe<OpeningAddedEventWhereInput>;
  openingcanceledeventgroup_none?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventgroup_some?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventgroup_every?: Maybe<OpeningCanceledEventWhereInput>;
  openingfilledeventgroup_none?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventgroup_some?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventgroup_every?: Maybe<OpeningFilledEventWhereInput>;
  rewardpaideventgroup_none?: Maybe<RewardPaidEventWhereInput>;
  rewardpaideventgroup_some?: Maybe<RewardPaidEventWhereInput>;
  rewardpaideventgroup_every?: Maybe<RewardPaidEventWhereInput>;
  stakedecreasedeventgroup_none?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventgroup_some?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventgroup_every?: Maybe<StakeDecreasedEventWhereInput>;
  stakeincreasedeventgroup_none?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventgroup_some?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventgroup_every?: Maybe<StakeIncreasedEventWhereInput>;
  stakeslashedeventgroup_none?: Maybe<StakeSlashedEventWhereInput>;
  stakeslashedeventgroup_some?: Maybe<StakeSlashedEventWhereInput>;
  stakeslashedeventgroup_every?: Maybe<StakeSlashedEventWhereInput>;
  statustextchangedeventgroup_none?: Maybe<StatusTextChangedEventWhereInput>;
  statustextchangedeventgroup_some?: Maybe<StatusTextChangedEventWhereInput>;
  statustextchangedeventgroup_every?: Maybe<StatusTextChangedEventWhereInput>;
  terminatedleadereventgroup_none?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventgroup_some?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventgroup_every?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedworkereventgroup_none?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventgroup_some?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventgroup_every?: Maybe<TerminatedWorkerEventWhereInput>;
  upcomingworkinggroupopeninggroup_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeninggroup_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeninggroup_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  workerexitedeventgroup_none?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventgroup_some?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventgroup_every?: Maybe<WorkerExitedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_none?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_some?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_every?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_none?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_some?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_every?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_none?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_some?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_every?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerstartedleavingeventgroup_none?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventgroup_some?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventgroup_every?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workinggroupmetadatagroup_none?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatagroup_some?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatagroup_every?: Maybe<WorkingGroupMetadataWhereInput>;
  AND?: Maybe<Array<WorkingGroupWhereInput>>;
  OR?: Maybe<Array<WorkingGroupWhereInput>>;
};

export type WorkingGroupWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};
