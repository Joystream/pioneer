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
  AND?: Maybe<Array<AmendConstitutionProposalDetailsWhereInput>>;
  OR?: Maybe<Array<AmendConstitutionProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type AmendConstitutionProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type AnnouncingPeriodStartedEvent = BaseGraphQlObject & Event & {
  __typename: 'AnnouncingPeriodStartedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type AnnouncingPeriodStartedEventConnection = {
  __typename: 'AnnouncingPeriodStartedEventConnection';
  edges: Array<AnnouncingPeriodStartedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AnnouncingPeriodStartedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type AnnouncingPeriodStartedEventEdge = {
  __typename: 'AnnouncingPeriodStartedEventEdge';
  cursor: Scalars['String'];
  node: AnnouncingPeriodStartedEvent;
};

export enum AnnouncingPeriodStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AnnouncingPeriodStartedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type AnnouncingPeriodStartedEventWhereInput = {
  AND?: Maybe<Array<AnnouncingPeriodStartedEventWhereInput>>;
  OR?: Maybe<Array<AnnouncingPeriodStartedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type AnnouncingPeriodStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationFormQuestion = BaseGraphQlObject & {
  __typename: 'ApplicationFormQuestion';
  applicationformquestionanswerquestion?: Maybe<Array<ApplicationFormQuestionAnswer>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Index of the question */
  index: Scalars['Int'];
  openingMetadata: WorkingGroupOpeningMetadata;
  openingMetadataId: Scalars['String'];
  /** The question itself */
  question?: Maybe<Scalars['String']>;
  /** Type of the question (UI answer input type) */
  type: ApplicationFormQuestionType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ApplicationFormQuestionAnswer = BaseGraphQlObject & {
  __typename: 'ApplicationFormQuestionAnswer';
  /** Applicant's answer */
  answer: Scalars['String'];
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  question: ApplicationFormQuestion;
  questionId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ApplicationFormQuestionAnswerConnection = {
  __typename: 'ApplicationFormQuestionAnswerConnection';
  edges: Array<ApplicationFormQuestionAnswerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ApplicationFormQuestionAnswerCreateInput = {
  answer: Scalars['String'];
  application: Scalars['ID'];
  question: Scalars['ID'];
};

export type ApplicationFormQuestionAnswerEdge = {
  __typename: 'ApplicationFormQuestionAnswerEdge';
  cursor: Scalars['String'];
  node: ApplicationFormQuestionAnswer;
};

export enum ApplicationFormQuestionAnswerOrderByInput {
  AnswerAsc = 'answer_ASC',
  AnswerDesc = 'answer_DESC',
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  QuestionAsc = 'question_ASC',
  QuestionDesc = 'question_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ApplicationFormQuestionAnswerUpdateInput = {
  answer?: Maybe<Scalars['String']>;
  application?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['ID']>;
};

export type ApplicationFormQuestionAnswerWhereInput = {
  AND?: Maybe<Array<ApplicationFormQuestionAnswerWhereInput>>;
  OR?: Maybe<Array<ApplicationFormQuestionAnswerWhereInput>>;
  answer_contains?: Maybe<Scalars['String']>;
  answer_endsWith?: Maybe<Scalars['String']>;
  answer_eq?: Maybe<Scalars['String']>;
  answer_in?: Maybe<Array<Scalars['String']>>;
  answer_startsWith?: Maybe<Scalars['String']>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  question?: Maybe<ApplicationFormQuestionWhereInput>;
  question_eq?: Maybe<Scalars['ID']>;
  question_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ApplicationFormQuestionAnswerWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ApplicationFormQuestionConnection = {
  __typename: 'ApplicationFormQuestionConnection';
  edges: Array<ApplicationFormQuestionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ApplicationFormQuestionCreateInput = {
  index: Scalars['Float'];
  openingMetadata: Scalars['ID'];
  question?: Maybe<Scalars['String']>;
  type: ApplicationFormQuestionType;
};

export type ApplicationFormQuestionEdge = {
  __typename: 'ApplicationFormQuestionEdge';
  cursor: Scalars['String'];
  node: ApplicationFormQuestion;
};

export enum ApplicationFormQuestionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IndexAsc = 'index_ASC',
  IndexDesc = 'index_DESC',
  OpeningMetadataAsc = 'openingMetadata_ASC',
  OpeningMetadataDesc = 'openingMetadata_DESC',
  QuestionAsc = 'question_ASC',
  QuestionDesc = 'question_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum ApplicationFormQuestionType {
  Text = 'TEXT',
  Textarea = 'TEXTAREA'
}

export type ApplicationFormQuestionUpdateInput = {
  index?: Maybe<Scalars['Float']>;
  openingMetadata?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
  type?: Maybe<ApplicationFormQuestionType>;
};

export type ApplicationFormQuestionWhereInput = {
  AND?: Maybe<Array<ApplicationFormQuestionWhereInput>>;
  OR?: Maybe<Array<ApplicationFormQuestionWhereInput>>;
  applicationformquestionanswerquestion_every?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  applicationformquestionanswerquestion_none?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  applicationformquestionanswerquestion_some?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  index_eq?: Maybe<Scalars['Int']>;
  index_gt?: Maybe<Scalars['Int']>;
  index_gte?: Maybe<Scalars['Int']>;
  index_in?: Maybe<Array<Scalars['Int']>>;
  index_lt?: Maybe<Scalars['Int']>;
  index_lte?: Maybe<Scalars['Int']>;
  openingMetadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  openingMetadata_eq?: Maybe<Scalars['ID']>;
  openingMetadata_in?: Maybe<Array<Scalars['ID']>>;
  question_contains?: Maybe<Scalars['String']>;
  question_endsWith?: Maybe<Scalars['String']>;
  question_eq?: Maybe<Scalars['String']>;
  question_in?: Maybe<Array<Scalars['String']>>;
  question_startsWith?: Maybe<Scalars['String']>;
  type_eq?: Maybe<ApplicationFormQuestionType>;
  type_in?: Maybe<Array<ApplicationFormQuestionType>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<ApplicationStatusPendingWhereInput>>;
  OR?: Maybe<Array<ApplicationStatusPendingWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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

export type ApplicationWithdrawnEvent = BaseGraphQlObject & Event & {
  __typename: 'ApplicationWithdrawnEvent';
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ApplicationWithdrawnEventConnection = {
  __typename: 'ApplicationWithdrawnEventConnection';
  edges: Array<ApplicationWithdrawnEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ApplicationWithdrawnEventCreateInput = {
  application: Scalars['ID'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type ApplicationWithdrawnEventEdge = {
  __typename: 'ApplicationWithdrawnEventEdge';
  cursor: Scalars['String'];
  node: ApplicationWithdrawnEvent;
};

export enum ApplicationWithdrawnEventOrderByInput {
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ApplicationWithdrawnEventUpdateInput = {
  application?: Maybe<Scalars['ID']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type ApplicationWithdrawnEventWhereInput = {
  AND?: Maybe<Array<ApplicationWithdrawnEventWhereInput>>;
  OR?: Maybe<Array<ApplicationWithdrawnEventWhereInput>>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ApplicationWithdrawnEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type AppliedOnOpeningEvent = BaseGraphQlObject & Event & {
  __typename: 'AppliedOnOpeningEvent';
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type AppliedOnOpeningEventConnection = {
  __typename: 'AppliedOnOpeningEventConnection';
  edges: Array<AppliedOnOpeningEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AppliedOnOpeningEventCreateInput = {
  application: Scalars['ID'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  opening: Scalars['ID'];
};

export type AppliedOnOpeningEventEdge = {
  __typename: 'AppliedOnOpeningEventEdge';
  cursor: Scalars['String'];
  node: AppliedOnOpeningEvent;
};

export enum AppliedOnOpeningEventOrderByInput {
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type AppliedOnOpeningEventUpdateInput = {
  application?: Maybe<Scalars['ID']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  opening?: Maybe<Scalars['ID']>;
};

export type AppliedOnOpeningEventWhereInput = {
  AND?: Maybe<Array<AppliedOnOpeningEventWhereInput>>;
  OR?: Maybe<Array<AppliedOnOpeningEventWhereInput>>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<AssetExternalWhereInput>>;
  OR?: Maybe<Array<AssetExternalWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  urls_contains?: Maybe<Scalars['String']>;
  urls_endsWith?: Maybe<Scalars['String']>;
  urls_eq?: Maybe<Scalars['String']>;
  urls_in?: Maybe<Array<Scalars['String']>>;
  urls_startsWith?: Maybe<Scalars['String']>;
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
  AND?: Maybe<Array<AssetNoneWhereInput>>;
  OR?: Maybe<Array<AssetNoneWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type AssetNoneWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BaseGraphQlObject = {
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseModel = BaseGraphQlObject & {
  __typename: 'BaseModel';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseModelUuid = BaseGraphQlObject & {
  __typename: 'BaseModelUUID';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BaseWhereInput = {
  createdAt_eq?: Maybe<Scalars['String']>;
  createdAt_gt?: Maybe<Scalars['String']>;
  createdAt_gte?: Maybe<Scalars['String']>;
  createdAt_lt?: Maybe<Scalars['String']>;
  createdAt_lte?: Maybe<Scalars['String']>;
  createdById_eq?: Maybe<Scalars['String']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['String']>;
  deletedAt_gt?: Maybe<Scalars['String']>;
  deletedAt_gte?: Maybe<Scalars['String']>;
  deletedAt_lt?: Maybe<Scalars['String']>;
  deletedAt_lte?: Maybe<Scalars['String']>;
  deletedById_eq?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Scalars['String']>>;
  updatedAt_eq?: Maybe<Scalars['String']>;
  updatedAt_gt?: Maybe<Scalars['String']>;
  updatedAt_gte?: Maybe<Scalars['String']>;
  updatedAt_lt?: Maybe<Scalars['String']>;
  updatedAt_lte?: Maybe<Scalars['String']>;
  updatedById_eq?: Maybe<Scalars['String']>;
};

export type BudgetBalanceSetEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetBalanceSetEvent';
  /** Budget balance that has been set. */
  balance: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetBalanceSetEventConnection = {
  __typename: 'BudgetBalanceSetEventConnection';
  edges: Array<BudgetBalanceSetEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetBalanceSetEventCreateInput = {
  balance: Scalars['BigInt'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type BudgetBalanceSetEventEdge = {
  __typename: 'BudgetBalanceSetEventEdge';
  cursor: Scalars['String'];
  node: BudgetBalanceSetEvent;
};

export enum BudgetBalanceSetEventOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetBalanceSetEventUpdateInput = {
  balance?: Maybe<Scalars['BigInt']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type BudgetBalanceSetEventWhereInput = {
  AND?: Maybe<Array<BudgetBalanceSetEventWhereInput>>;
  OR?: Maybe<Array<BudgetBalanceSetEventWhereInput>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetBalanceSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetIncrementUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetIncrementUpdatedEvent';
  /** Amount that is added to the budget each time it's refilled. */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetIncrementUpdatedEventConnection = {
  __typename: 'BudgetIncrementUpdatedEventConnection';
  edges: Array<BudgetIncrementUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetIncrementUpdatedEventCreateInput = {
  amount: Scalars['BigInt'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type BudgetIncrementUpdatedEventEdge = {
  __typename: 'BudgetIncrementUpdatedEventEdge';
  cursor: Scalars['String'];
  node: BudgetIncrementUpdatedEvent;
};

export enum BudgetIncrementUpdatedEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetIncrementUpdatedEventUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type BudgetIncrementUpdatedEventWhereInput = {
  AND?: Maybe<Array<BudgetIncrementUpdatedEventWhereInput>>;
  OR?: Maybe<Array<BudgetIncrementUpdatedEventWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetIncrementUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetRefillEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetRefillEvent';
  /** Balance that has been refilled. */
  balance: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetRefillEventConnection = {
  __typename: 'BudgetRefillEventConnection';
  edges: Array<BudgetRefillEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetRefillEventCreateInput = {
  balance: Scalars['BigInt'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type BudgetRefillEventEdge = {
  __typename: 'BudgetRefillEventEdge';
  cursor: Scalars['String'];
  node: BudgetRefillEvent;
};

export enum BudgetRefillEventOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetRefillEventUpdateInput = {
  balance?: Maybe<Scalars['BigInt']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type BudgetRefillEventWhereInput = {
  AND?: Maybe<Array<BudgetRefillEventWhereInput>>;
  OR?: Maybe<Array<BudgetRefillEventWhereInput>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetRefillEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetRefillPlannedEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetRefillPlannedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetRefillPlannedEventConnection = {
  __typename: 'BudgetRefillPlannedEventConnection';
  edges: Array<BudgetRefillPlannedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetRefillPlannedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type BudgetRefillPlannedEventEdge = {
  __typename: 'BudgetRefillPlannedEventEdge';
  cursor: Scalars['String'];
  node: BudgetRefillPlannedEvent;
};

export enum BudgetRefillPlannedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetRefillPlannedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type BudgetRefillPlannedEventWhereInput = {
  AND?: Maybe<Array<BudgetRefillPlannedEventWhereInput>>;
  OR?: Maybe<Array<BudgetRefillPlannedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetRefillPlannedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetSetEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetSetEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New working group budget */
  newBudget: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetSetEventConnection = {
  __typename: 'BudgetSetEventConnection';
  edges: Array<BudgetSetEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetSetEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newBudget: Scalars['BigInt'];
};

export type BudgetSetEventEdge = {
  __typename: 'BudgetSetEventEdge';
  cursor: Scalars['String'];
  node: BudgetSetEvent;
};

export enum BudgetSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewBudgetAsc = 'newBudget_ASC',
  NewBudgetDesc = 'newBudget_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetSetEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newBudget?: Maybe<Scalars['BigInt']>;
};

export type BudgetSetEventWhereInput = {
  AND?: Maybe<Array<BudgetSetEventWhereInput>>;
  OR?: Maybe<Array<BudgetSetEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newBudget_eq?: Maybe<Scalars['BigInt']>;
  newBudget_gt?: Maybe<Scalars['BigInt']>;
  newBudget_gte?: Maybe<Scalars['BigInt']>;
  newBudget_in?: Maybe<Array<Scalars['BigInt']>>;
  newBudget_lt?: Maybe<Scalars['BigInt']>;
  newBudget_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type BudgetSpendingEvent = BaseGraphQlObject & Event & {
  __typename: 'BudgetSpendingEvent';
  /** Amount beeing spent */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
  /** Reciever account address */
  reciever: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type BudgetSpendingEventConnection = {
  __typename: 'BudgetSpendingEventConnection';
  edges: Array<BudgetSpendingEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BudgetSpendingEventCreateInput = {
  amount: Scalars['BigInt'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rationale?: Maybe<Scalars['String']>;
  reciever: Scalars['String'];
};

export type BudgetSpendingEventEdge = {
  __typename: 'BudgetSpendingEventEdge';
  cursor: Scalars['String'];
  node: BudgetSpendingEvent;
};

export enum BudgetSpendingEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  RecieverAsc = 'reciever_ASC',
  RecieverDesc = 'reciever_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BudgetSpendingEventUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rationale?: Maybe<Scalars['String']>;
  reciever?: Maybe<Scalars['String']>;
};

export type BudgetSpendingEventWhereInput = {
  AND?: Maybe<Array<BudgetSpendingEventWhereInput>>;
  OR?: Maybe<Array<BudgetSpendingEventWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  reciever_contains?: Maybe<Scalars['String']>;
  reciever_endsWith?: Maybe<Scalars['String']>;
  reciever_eq?: Maybe<Scalars['String']>;
  reciever_in?: Maybe<Array<Scalars['String']>>;
  reciever_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type BudgetSpendingEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CancelWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'CancelWorkingGroupLeadOpeningProposalDetails';
  /** Opening to be cancelled */
  opening?: Maybe<WorkingGroupOpening>;
};

export type CandidacyNoteMetadata = BaseGraphQlObject & {
  __typename: 'CandidacyNoteMetadata';
  /** Image uri of candidate's banner. */
  bannerImageUri?: Maybe<Scalars['String']>;
  /** Candidate program in form of bullet points. */
  bulletPoints: Array<Scalars['String']>;
  candidacynoteseteventnoteMetadata?: Maybe<Array<CandidacyNoteSetEvent>>;
  candidatenoteMetadata?: Maybe<Array<Candidate>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Candidacy description (Markdown-formatted). */
  description?: Maybe<Scalars['String']>;
  /** Candidacy header text. */
  header?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CandidacyNoteMetadataConnection = {
  __typename: 'CandidacyNoteMetadataConnection';
  edges: Array<CandidacyNoteMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CandidacyNoteMetadataCreateInput = {
  bannerImageUri?: Maybe<Scalars['String']>;
  bulletPoints: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
};

export type CandidacyNoteMetadataEdge = {
  __typename: 'CandidacyNoteMetadataEdge';
  cursor: Scalars['String'];
  node: CandidacyNoteMetadata;
};

export enum CandidacyNoteMetadataOrderByInput {
  BannerImageUriAsc = 'bannerImageUri_ASC',
  BannerImageUriDesc = 'bannerImageUri_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  HeaderAsc = 'header_ASC',
  HeaderDesc = 'header_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CandidacyNoteMetadataUpdateInput = {
  bannerImageUri?: Maybe<Scalars['String']>;
  bulletPoints?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  header?: Maybe<Scalars['String']>;
};

export type CandidacyNoteMetadataWhereInput = {
  AND?: Maybe<Array<CandidacyNoteMetadataWhereInput>>;
  OR?: Maybe<Array<CandidacyNoteMetadataWhereInput>>;
  bannerImageUri_contains?: Maybe<Scalars['String']>;
  bannerImageUri_endsWith?: Maybe<Scalars['String']>;
  bannerImageUri_eq?: Maybe<Scalars['String']>;
  bannerImageUri_in?: Maybe<Array<Scalars['String']>>;
  bannerImageUri_startsWith?: Maybe<Scalars['String']>;
  candidacynoteseteventnoteMetadata_every?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventnoteMetadata_none?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventnoteMetadata_some?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidatenoteMetadata_every?: Maybe<CandidateWhereInput>;
  candidatenoteMetadata_none?: Maybe<CandidateWhereInput>;
  candidatenoteMetadata_some?: Maybe<CandidateWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  header_contains?: Maybe<Scalars['String']>;
  header_endsWith?: Maybe<Scalars['String']>;
  header_eq?: Maybe<Scalars['String']>;
  header_in?: Maybe<Array<Scalars['String']>>;
  header_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CandidacyNoteMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CandidacyNoteSetEvent = BaseGraphQlObject & Event & {
  __typename: 'CandidacyNoteSetEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** The note that has been set. */
  note: Scalars['String'];
  noteMetadata: CandidacyNoteMetadata;
  noteMetadataId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CandidacyNoteSetEventConnection = {
  __typename: 'CandidacyNoteSetEventConnection';
  edges: Array<CandidacyNoteSetEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CandidacyNoteSetEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
  note: Scalars['String'];
  noteMetadata: Scalars['ID'];
};

export type CandidacyNoteSetEventEdge = {
  __typename: 'CandidacyNoteSetEventEdge';
  cursor: Scalars['String'];
  node: CandidacyNoteSetEvent;
};

export enum CandidacyNoteSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NoteMetadataAsc = 'noteMetadata_ASC',
  NoteMetadataDesc = 'noteMetadata_DESC',
  NoteAsc = 'note_ASC',
  NoteDesc = 'note_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CandidacyNoteSetEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  note?: Maybe<Scalars['String']>;
  noteMetadata?: Maybe<Scalars['ID']>;
};

export type CandidacyNoteSetEventWhereInput = {
  AND?: Maybe<Array<CandidacyNoteSetEventWhereInput>>;
  OR?: Maybe<Array<CandidacyNoteSetEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  noteMetadata?: Maybe<CandidacyNoteMetadataWhereInput>;
  noteMetadata_eq?: Maybe<Scalars['ID']>;
  noteMetadata_in?: Maybe<Array<Scalars['ID']>>;
  note_contains?: Maybe<Scalars['String']>;
  note_endsWith?: Maybe<Scalars['String']>;
  note_eq?: Maybe<Scalars['String']>;
  note_in?: Maybe<Array<Scalars['String']>>;
  note_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CandidacyNoteSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CandidacyStakeReleaseEvent = BaseGraphQlObject & Event & {
  __typename: 'CandidacyStakeReleaseEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CandidacyStakeReleaseEventConnection = {
  __typename: 'CandidacyStakeReleaseEventConnection';
  edges: Array<CandidacyStakeReleaseEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CandidacyStakeReleaseEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
};

export type CandidacyStakeReleaseEventEdge = {
  __typename: 'CandidacyStakeReleaseEventEdge';
  cursor: Scalars['String'];
  node: CandidacyStakeReleaseEvent;
};

export enum CandidacyStakeReleaseEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CandidacyStakeReleaseEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type CandidacyStakeReleaseEventWhereInput = {
  AND?: Maybe<Array<CandidacyStakeReleaseEventWhereInput>>;
  OR?: Maybe<Array<CandidacyStakeReleaseEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CandidacyStakeReleaseEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CandidacyWithdrawEvent = BaseGraphQlObject & Event & {
  __typename: 'CandidacyWithdrawEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CandidacyWithdrawEventConnection = {
  __typename: 'CandidacyWithdrawEventConnection';
  edges: Array<CandidacyWithdrawEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CandidacyWithdrawEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
};

export type CandidacyWithdrawEventEdge = {
  __typename: 'CandidacyWithdrawEventEdge';
  cursor: Scalars['String'];
  node: CandidacyWithdrawEvent;
};

export enum CandidacyWithdrawEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CandidacyWithdrawEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type CandidacyWithdrawEventWhereInput = {
  AND?: Maybe<Array<CandidacyWithdrawEventWhereInput>>;
  OR?: Maybe<Array<CandidacyWithdrawEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CandidacyWithdrawEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Candidate = BaseGraphQlObject & {
  __typename: 'Candidate';
  /** Reflects if the candidacy was withdrawn before voting started. */
  candidacyWithdrawn: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electionRound: ElectionRound;
  electionRoundId: Scalars['String'];
  id: Scalars['ID'];
  member: Membership;
  memberId: Scalars['String'];
  /** Candidacy note. */
  note: Scalars['String'];
  noteMetadata: CandidacyNoteMetadata;
  noteMetadataId: Scalars['String'];
  /** Account that will receive rewards if candidate's elected to the council. */
  rewardAccountId: Scalars['String'];
  /** Stake locked for the candidacy. */
  stake: Scalars['BigInt'];
  /** Reflects if the stake is still locked for candidacy or has been already released by the member. */
  stakeLocked: Scalars['Boolean'];
  /** Account used for staking currency needed for the candidacy. */
  stakingAccountId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Sum of power of all votes received. */
  votePower: Scalars['BigInt'];
};

export type CandidateConnection = {
  __typename: 'CandidateConnection';
  edges: Array<CandidateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CandidateCreateInput = {
  candidacyWithdrawn: Scalars['Boolean'];
  electionRound: Scalars['ID'];
  member: Scalars['ID'];
  note: Scalars['String'];
  noteMetadata: Scalars['ID'];
  rewardAccountId: Scalars['String'];
  stake: Scalars['BigInt'];
  stakeLocked: Scalars['Boolean'];
  stakingAccountId: Scalars['String'];
  votePower: Scalars['BigInt'];
};

export type CandidateEdge = {
  __typename: 'CandidateEdge';
  cursor: Scalars['String'];
  node: Candidate;
};

export enum CandidateOrderByInput {
  CandidacyWithdrawnAsc = 'candidacyWithdrawn_ASC',
  CandidacyWithdrawnDesc = 'candidacyWithdrawn_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectionRoundAsc = 'electionRound_ASC',
  ElectionRoundDesc = 'electionRound_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NoteMetadataAsc = 'noteMetadata_ASC',
  NoteMetadataDesc = 'noteMetadata_DESC',
  NoteAsc = 'note_ASC',
  NoteDesc = 'note_DESC',
  RewardAccountIdAsc = 'rewardAccountId_ASC',
  RewardAccountIdDesc = 'rewardAccountId_DESC',
  StakeLockedAsc = 'stakeLocked_ASC',
  StakeLockedDesc = 'stakeLocked_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  StakingAccountIdAsc = 'stakingAccountId_ASC',
  StakingAccountIdDesc = 'stakingAccountId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC'
}

export type CandidateUpdateInput = {
  candidacyWithdrawn?: Maybe<Scalars['Boolean']>;
  electionRound?: Maybe<Scalars['ID']>;
  member?: Maybe<Scalars['ID']>;
  note?: Maybe<Scalars['String']>;
  noteMetadata?: Maybe<Scalars['ID']>;
  rewardAccountId?: Maybe<Scalars['String']>;
  stake?: Maybe<Scalars['BigInt']>;
  stakeLocked?: Maybe<Scalars['Boolean']>;
  stakingAccountId?: Maybe<Scalars['String']>;
  votePower?: Maybe<Scalars['BigInt']>;
};

export type CandidateWhereInput = {
  AND?: Maybe<Array<CandidateWhereInput>>;
  OR?: Maybe<Array<CandidateWhereInput>>;
  candidacyWithdrawn_eq?: Maybe<Scalars['Boolean']>;
  candidacyWithdrawn_in?: Maybe<Array<Scalars['Boolean']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electionRound?: Maybe<ElectionRoundWhereInput>;
  electionRound_eq?: Maybe<Scalars['ID']>;
  electionRound_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  noteMetadata?: Maybe<CandidacyNoteMetadataWhereInput>;
  noteMetadata_eq?: Maybe<Scalars['ID']>;
  noteMetadata_in?: Maybe<Array<Scalars['ID']>>;
  note_contains?: Maybe<Scalars['String']>;
  note_endsWith?: Maybe<Scalars['String']>;
  note_eq?: Maybe<Scalars['String']>;
  note_in?: Maybe<Array<Scalars['String']>>;
  note_startsWith?: Maybe<Scalars['String']>;
  rewardAccountId_contains?: Maybe<Scalars['String']>;
  rewardAccountId_endsWith?: Maybe<Scalars['String']>;
  rewardAccountId_eq?: Maybe<Scalars['String']>;
  rewardAccountId_in?: Maybe<Array<Scalars['String']>>;
  rewardAccountId_startsWith?: Maybe<Scalars['String']>;
  stakeLocked_eq?: Maybe<Scalars['Boolean']>;
  stakeLocked_in?: Maybe<Array<Scalars['Boolean']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stakingAccountId_contains?: Maybe<Scalars['String']>;
  stakingAccountId_endsWith?: Maybe<Scalars['String']>;
  stakingAccountId_eq?: Maybe<Scalars['String']>;
  stakingAccountId_in?: Maybe<Array<Scalars['String']>>;
  stakingAccountId_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
};

export type CandidateWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CastVote = BaseGraphQlObject & {
  __typename: 'CastVote';
  /** Account that cast the vote. */
  castBy: Scalars['String'];
  /** Hashed vote that was casted before being revealed. */
  commitment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electionRound: ElectionRound;
  electionRoundId: Scalars['String'];
  id: Scalars['ID'];
  /** Stake used to back up the vote. */
  stake: Scalars['BigInt'];
  /** Reflects if the stake is still locked for candidacy or has been already released by the member. */
  stakeLocked: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  voteFor?: Maybe<Membership>;
  voteForId?: Maybe<Scalars['String']>;
  /** Vote's power. */
  votePower: Scalars['BigInt'];
};

export type CastVoteConnection = {
  __typename: 'CastVoteConnection';
  edges: Array<CastVoteEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CastVoteCreateInput = {
  castBy: Scalars['String'];
  commitment: Scalars['String'];
  electionRound: Scalars['ID'];
  stake: Scalars['BigInt'];
  stakeLocked: Scalars['Boolean'];
  voteFor?: Maybe<Scalars['ID']>;
  votePower: Scalars['BigInt'];
};

export type CastVoteEdge = {
  __typename: 'CastVoteEdge';
  cursor: Scalars['String'];
  node: CastVote;
};

export enum CastVoteOrderByInput {
  CastByAsc = 'castBy_ASC',
  CastByDesc = 'castBy_DESC',
  CommitmentAsc = 'commitment_ASC',
  CommitmentDesc = 'commitment_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectionRoundAsc = 'electionRound_ASC',
  ElectionRoundDesc = 'electionRound_DESC',
  StakeLockedAsc = 'stakeLocked_ASC',
  StakeLockedDesc = 'stakeLocked_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VoteForAsc = 'voteFor_ASC',
  VoteForDesc = 'voteFor_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC'
}

export type CastVoteUpdateInput = {
  castBy?: Maybe<Scalars['String']>;
  commitment?: Maybe<Scalars['String']>;
  electionRound?: Maybe<Scalars['ID']>;
  stake?: Maybe<Scalars['BigInt']>;
  stakeLocked?: Maybe<Scalars['Boolean']>;
  voteFor?: Maybe<Scalars['ID']>;
  votePower?: Maybe<Scalars['BigInt']>;
};

export type CastVoteWhereInput = {
  AND?: Maybe<Array<CastVoteWhereInput>>;
  OR?: Maybe<Array<CastVoteWhereInput>>;
  castBy_contains?: Maybe<Scalars['String']>;
  castBy_endsWith?: Maybe<Scalars['String']>;
  castBy_eq?: Maybe<Scalars['String']>;
  castBy_in?: Maybe<Array<Scalars['String']>>;
  castBy_startsWith?: Maybe<Scalars['String']>;
  commitment_contains?: Maybe<Scalars['String']>;
  commitment_endsWith?: Maybe<Scalars['String']>;
  commitment_eq?: Maybe<Scalars['String']>;
  commitment_in?: Maybe<Array<Scalars['String']>>;
  commitment_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electionRound?: Maybe<ElectionRoundWhereInput>;
  electionRound_eq?: Maybe<Scalars['ID']>;
  electionRound_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  stakeLocked_eq?: Maybe<Scalars['Boolean']>;
  stakeLocked_in?: Maybe<Array<Scalars['Boolean']>>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  voteFor?: Maybe<MembershipWhereInput>;
  voteFor_eq?: Maybe<Scalars['ID']>;
  voteFor_in?: Maybe<Array<Scalars['ID']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
};

export type CastVoteWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryArchivalStatusUpdatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryArchivalStatusUpdatedEvent';
  actor: Worker;
  actorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** The new archival status of the category (true = archived) */
  newArchivalStatus: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CategoryArchivalStatusUpdatedEventConnection = {
  __typename: 'CategoryArchivalStatusUpdatedEventConnection';
  edges: Array<CategoryArchivalStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryArchivalStatusUpdatedEventCreateInput = {
  actor: Scalars['ID'];
  category: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newArchivalStatus: Scalars['Boolean'];
};

export type CategoryArchivalStatusUpdatedEventEdge = {
  __typename: 'CategoryArchivalStatusUpdatedEventEdge';
  cursor: Scalars['String'];
  node: CategoryArchivalStatusUpdatedEvent;
};

export enum CategoryArchivalStatusUpdatedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewArchivalStatusAsc = 'newArchivalStatus_ASC',
  NewArchivalStatusDesc = 'newArchivalStatus_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryArchivalStatusUpdatedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newArchivalStatus?: Maybe<Scalars['Boolean']>;
};

export type CategoryArchivalStatusUpdatedEventWhereInput = {
  AND?: Maybe<Array<CategoryArchivalStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryArchivalStatusUpdatedEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newArchivalStatus_eq?: Maybe<Scalars['Boolean']>;
  newArchivalStatus_in?: Maybe<Array<Scalars['Boolean']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CategoryArchivalStatusUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryCreatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryCreatedEvent';
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CategoryCreatedEventConnection = {
  __typename: 'CategoryCreatedEventConnection';
  edges: Array<CategoryCreatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryCreatedEventCreateInput = {
  category: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type CategoryCreatedEventEdge = {
  __typename: 'CategoryCreatedEventEdge';
  cursor: Scalars['String'];
  node: CategoryCreatedEvent;
};

export enum CategoryCreatedEventOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryCreatedEventUpdateInput = {
  category?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type CategoryCreatedEventWhereInput = {
  AND?: Maybe<Array<CategoryCreatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryCreatedEventWhereInput>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CategoryCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryDeletedEvent = BaseGraphQlObject & {
  __typename: 'CategoryDeletedEvent';
  actor: Worker;
  actorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CategoryDeletedEventConnection = {
  __typename: 'CategoryDeletedEventConnection';
  edges: Array<CategoryDeletedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryDeletedEventCreateInput = {
  actor: Scalars['ID'];
  category: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type CategoryDeletedEventEdge = {
  __typename: 'CategoryDeletedEventEdge';
  cursor: Scalars['String'];
  node: CategoryDeletedEvent;
};

export enum CategoryDeletedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryDeletedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type CategoryDeletedEventWhereInput = {
  AND?: Maybe<Array<CategoryDeletedEventWhereInput>>;
  OR?: Maybe<Array<CategoryDeletedEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CategoryDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CategoryMembershipOfModeratorUpdatedEvent = BaseGraphQlObject & {
  __typename: 'CategoryMembershipOfModeratorUpdatedEvent';
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  moderator: Worker;
  moderatorId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** The flag indicating whether the permissions to moderate the category are granted or revoked */
  newCanModerateValue: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CategoryMembershipOfModeratorUpdatedEventConnection = {
  __typename: 'CategoryMembershipOfModeratorUpdatedEventConnection';
  edges: Array<CategoryMembershipOfModeratorUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryMembershipOfModeratorUpdatedEventCreateInput = {
  category: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  moderator: Scalars['ID'];
  network: Network;
  newCanModerateValue: Scalars['Boolean'];
};

export type CategoryMembershipOfModeratorUpdatedEventEdge = {
  __typename: 'CategoryMembershipOfModeratorUpdatedEventEdge';
  cursor: Scalars['String'];
  node: CategoryMembershipOfModeratorUpdatedEvent;
};

export enum CategoryMembershipOfModeratorUpdatedEventOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  ModeratorAsc = 'moderator_ASC',
  ModeratorDesc = 'moderator_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewCanModerateValueAsc = 'newCanModerateValue_ASC',
  NewCanModerateValueDesc = 'newCanModerateValue_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryMembershipOfModeratorUpdatedEventUpdateInput = {
  category?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  moderator?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  newCanModerateValue?: Maybe<Scalars['Boolean']>;
};

export type CategoryMembershipOfModeratorUpdatedEventWhereInput = {
  AND?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventWhereInput>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  moderator?: Maybe<WorkerWhereInput>;
  moderator_eq?: Maybe<Scalars['ID']>;
  moderator_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newCanModerateValue_eq?: Maybe<Scalars['Boolean']>;
  newCanModerateValue_in?: Maybe<Array<Scalars['Boolean']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<CategoryStatusActiveWhereInput>>;
  OR?: Maybe<Array<CategoryStatusActiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  actor: Worker;
  actorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  newStickyThreads: Array<ForumThread>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CategoryStickyThreadUpdateEventConnection = {
  __typename: 'CategoryStickyThreadUpdateEventConnection';
  edges: Array<CategoryStickyThreadUpdateEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CategoryStickyThreadUpdateEventCreateInput = {
  actor: Scalars['ID'];
  category: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type CategoryStickyThreadUpdateEventEdge = {
  __typename: 'CategoryStickyThreadUpdateEventEdge';
  cursor: Scalars['String'];
  node: CategoryStickyThreadUpdateEvent;
};

export enum CategoryStickyThreadUpdateEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CategoryStickyThreadUpdateEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type CategoryStickyThreadUpdateEventWhereInput = {
  AND?: Maybe<Array<CategoryStickyThreadUpdateEventWhereInput>>;
  OR?: Maybe<Array<CategoryStickyThreadUpdateEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newStickyThreads_every?: Maybe<ForumThreadWhereInput>;
  newStickyThreads_none?: Maybe<ForumThreadWhereInput>;
  newStickyThreads_some?: Maybe<ForumThreadWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CategoryStickyThreadUpdateEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Channel = BaseGraphQlObject & {
  __typename: 'Channel';
  /** Channel's avatar photo asset. */
  avatarPhoto?: Maybe<Asset>;
  category?: Maybe<ChannelCategory>;
  categoryId?: Maybe<Scalars['String']>;
  /** Channel's cover (background) photo asset. Recommended ratio: 16:9. */
  coverPhoto?: Maybe<Asset>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** The description of a Channel */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Flag signaling whether a channel is censored. */
  isCensored: Scalars['Boolean'];
  /** Flag signaling whether a channel is public. */
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Language>;
  languageId?: Maybe<Scalars['String']>;
  ownerCuratorGroup?: Maybe<CuratorGroup>;
  ownerCuratorGroupId?: Maybe<Scalars['String']>;
  ownerMember?: Maybe<Membership>;
  ownerMemberId?: Maybe<Scalars['String']>;
  /** Reward account where revenue is sent if set. */
  rewardAccount?: Maybe<Scalars['String']>;
  /** The title of the Channel */
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  videos: Array<Video>;
};

export type ChannelCategoriesByNameFtsOutput = {
  __typename: 'ChannelCategoriesByNameFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: ChannelCategoriesByNameSearchResult;
  rank: Scalars['Float'];
};

export type ChannelCategoriesByNameSearchResult = ChannelCategory;

/** Category of media channel */
export type ChannelCategory = BaseGraphQlObject & {
  __typename: 'ChannelCategory';
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The name of the category */
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ChannelCategoryConnection = {
  __typename: 'ChannelCategoryConnection';
  edges: Array<ChannelCategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChannelCategoryCreateInput = {
  createdInBlock: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
};

export type ChannelCategoryEdge = {
  __typename: 'ChannelCategoryEdge';
  cursor: Scalars['String'];
  node: ChannelCategory;
};

export enum ChannelCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ChannelCategoryUpdateInput = {
  createdInBlock?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type ChannelCategoryWhereInput = {
  AND?: Maybe<Array<ChannelCategoryWhereInput>>;
  OR?: Maybe<Array<ChannelCategoryWhereInput>>;
  channels_every?: Maybe<ChannelWhereInput>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_eq?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ChannelCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ChannelConnection = {
  __typename: 'ChannelConnection';
  edges: Array<ChannelEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ChannelCreateInput = {
  avatarPhoto: Scalars['JSONObject'];
  category?: Maybe<Scalars['ID']>;
  coverPhoto: Scalars['JSONObject'];
  createdInBlock: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  isCensored: Scalars['Boolean'];
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['ID']>;
  ownerCuratorGroup?: Maybe<Scalars['ID']>;
  ownerMember?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ChannelEdge = {
  __typename: 'ChannelEdge';
  cursor: Scalars['String'];
  node: Channel;
};

export enum ChannelOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IsCensoredAsc = 'isCensored_ASC',
  IsCensoredDesc = 'isCensored_DESC',
  IsPublicAsc = 'isPublic_ASC',
  IsPublicDesc = 'isPublic_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  OwnerCuratorGroupAsc = 'ownerCuratorGroup_ASC',
  OwnerCuratorGroupDesc = 'ownerCuratorGroup_DESC',
  OwnerMemberAsc = 'ownerMember_ASC',
  OwnerMemberDesc = 'ownerMember_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ChannelUpdateInput = {
  avatarPhoto?: Maybe<Scalars['JSONObject']>;
  category?: Maybe<Scalars['ID']>;
  coverPhoto?: Maybe<Scalars['JSONObject']>;
  createdInBlock?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  isCensored?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['ID']>;
  ownerCuratorGroup?: Maybe<Scalars['ID']>;
  ownerMember?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ChannelWhereInput = {
  AND?: Maybe<Array<ChannelWhereInput>>;
  OR?: Maybe<Array<ChannelWhereInput>>;
  avatarPhoto_json?: Maybe<Scalars['JSONObject']>;
  category?: Maybe<ChannelCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  coverPhoto_json?: Maybe<Scalars['JSONObject']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isCensored_eq?: Maybe<Scalars['Boolean']>;
  isCensored_in?: Maybe<Array<Scalars['Boolean']>>;
  isPublic_eq?: Maybe<Scalars['Boolean']>;
  isPublic_in?: Maybe<Array<Scalars['Boolean']>>;
  language?: Maybe<LanguageWhereInput>;
  language_eq?: Maybe<Scalars['ID']>;
  language_in?: Maybe<Array<Scalars['ID']>>;
  ownerCuratorGroup?: Maybe<CuratorGroupWhereInput>;
  ownerCuratorGroup_eq?: Maybe<Scalars['ID']>;
  ownerCuratorGroup_in?: Maybe<Array<Scalars['ID']>>;
  ownerMember?: Maybe<MembershipWhereInput>;
  ownerMember_eq?: Maybe<Scalars['ID']>;
  ownerMember_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  videos_every?: Maybe<VideoWhereInput>;
  videos_none?: Maybe<VideoWhereInput>;
  videos_some?: Maybe<VideoWhereInput>;
};

export type ChannelWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilMember = BaseGraphQlObject & {
  __typename: 'CouncilMember';
  /** Amount of reward collected by this council member so far. */
  accumulatedReward: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electedInCouncil: ElectedCouncil;
  electedInCouncilId: Scalars['String'];
  id: Scalars['ID'];
  /** Block number in which council member recieved the last reward payment. */
  lastPaymentBlock: Scalars['BigInt'];
  member: Membership;
  memberId: Scalars['String'];
  /** Account that will receive used for reward currency for council membership. */
  rewardAccountId: Scalars['String'];
  /** Stake used for the council membership. */
  stake: Scalars['BigInt'];
  /** Account used for staking currency for council membership. */
  stakingAccountId: Scalars['String'];
  /** Reward amount that should have been paid but couldn't be paid off due to insufficient budget. */
  unpaidReward: Scalars['BigInt'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CouncilMemberConnection = {
  __typename: 'CouncilMemberConnection';
  edges: Array<CouncilMemberEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CouncilMemberCreateInput = {
  accumulatedReward: Scalars['BigInt'];
  electedInCouncil: Scalars['ID'];
  lastPaymentBlock: Scalars['BigInt'];
  member: Scalars['ID'];
  rewardAccountId: Scalars['String'];
  stake: Scalars['BigInt'];
  stakingAccountId: Scalars['String'];
  unpaidReward: Scalars['BigInt'];
};

export type CouncilMemberEdge = {
  __typename: 'CouncilMemberEdge';
  cursor: Scalars['String'];
  node: CouncilMember;
};

export enum CouncilMemberOrderByInput {
  AccumulatedRewardAsc = 'accumulatedReward_ASC',
  AccumulatedRewardDesc = 'accumulatedReward_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectedInCouncilAsc = 'electedInCouncil_ASC',
  ElectedInCouncilDesc = 'electedInCouncil_DESC',
  LastPaymentBlockAsc = 'lastPaymentBlock_ASC',
  LastPaymentBlockDesc = 'lastPaymentBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  RewardAccountIdAsc = 'rewardAccountId_ASC',
  RewardAccountIdDesc = 'rewardAccountId_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  StakingAccountIdAsc = 'stakingAccountId_ASC',
  StakingAccountIdDesc = 'stakingAccountId_DESC',
  UnpaidRewardAsc = 'unpaidReward_ASC',
  UnpaidRewardDesc = 'unpaidReward_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CouncilMemberUpdateInput = {
  accumulatedReward?: Maybe<Scalars['BigInt']>;
  electedInCouncil?: Maybe<Scalars['ID']>;
  lastPaymentBlock?: Maybe<Scalars['BigInt']>;
  member?: Maybe<Scalars['ID']>;
  rewardAccountId?: Maybe<Scalars['String']>;
  stake?: Maybe<Scalars['BigInt']>;
  stakingAccountId?: Maybe<Scalars['String']>;
  unpaidReward?: Maybe<Scalars['BigInt']>;
};

export type CouncilMemberWhereInput = {
  AND?: Maybe<Array<CouncilMemberWhereInput>>;
  OR?: Maybe<Array<CouncilMemberWhereInput>>;
  accumulatedReward_eq?: Maybe<Scalars['BigInt']>;
  accumulatedReward_gt?: Maybe<Scalars['BigInt']>;
  accumulatedReward_gte?: Maybe<Scalars['BigInt']>;
  accumulatedReward_in?: Maybe<Array<Scalars['BigInt']>>;
  accumulatedReward_lt?: Maybe<Scalars['BigInt']>;
  accumulatedReward_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedInCouncil?: Maybe<ElectedCouncilWhereInput>;
  electedInCouncil_eq?: Maybe<Scalars['ID']>;
  electedInCouncil_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  lastPaymentBlock_eq?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_gt?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_gte?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  lastPaymentBlock_lt?: Maybe<Scalars['BigInt']>;
  lastPaymentBlock_lte?: Maybe<Scalars['BigInt']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccountId_contains?: Maybe<Scalars['String']>;
  rewardAccountId_endsWith?: Maybe<Scalars['String']>;
  rewardAccountId_eq?: Maybe<Scalars['String']>;
  rewardAccountId_in?: Maybe<Array<Scalars['String']>>;
  rewardAccountId_startsWith?: Maybe<Scalars['String']>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stakingAccountId_contains?: Maybe<Scalars['String']>;
  stakingAccountId_endsWith?: Maybe<Scalars['String']>;
  stakingAccountId_eq?: Maybe<Scalars['String']>;
  stakingAccountId_in?: Maybe<Array<Scalars['String']>>;
  stakingAccountId_startsWith?: Maybe<Scalars['String']>;
  unpaidReward_eq?: Maybe<Scalars['BigInt']>;
  unpaidReward_gt?: Maybe<Scalars['BigInt']>;
  unpaidReward_gte?: Maybe<Scalars['BigInt']>;
  unpaidReward_in?: Maybe<Array<Scalars['BigInt']>>;
  unpaidReward_lt?: Maybe<Scalars['BigInt']>;
  unpaidReward_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<CouncilStageAnnouncingWhereInput>>;
  OR?: Maybe<Array<CouncilStageAnnouncingWhereInput>>;
  candidatesCount_eq?: Maybe<Scalars['BigInt']>;
  candidatesCount_gt?: Maybe<Scalars['BigInt']>;
  candidatesCount_gte?: Maybe<Scalars['BigInt']>;
  candidatesCount_in?: Maybe<Array<Scalars['BigInt']>>;
  candidatesCount_lt?: Maybe<Scalars['BigInt']>;
  candidatesCount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<CouncilStageElectionWhereInput>>;
  OR?: Maybe<Array<CouncilStageElectionWhereInput>>;
  candidatesCount_eq?: Maybe<Scalars['BigInt']>;
  candidatesCount_gt?: Maybe<Scalars['BigInt']>;
  candidatesCount_gte?: Maybe<Scalars['BigInt']>;
  candidatesCount_in?: Maybe<Array<Scalars['BigInt']>>;
  candidatesCount_lt?: Maybe<Scalars['BigInt']>;
  candidatesCount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<CouncilStageIdleWhereInput>>;
  OR?: Maybe<Array<CouncilStageIdleWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CouncilStageIdleWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilStageUpdate = BaseGraphQlObject & {
  __typename: 'CouncilStageUpdate';
  /** Block number at which change happened. */
  changedAt: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electedCouncil?: Maybe<ElectedCouncil>;
  electedCouncilId?: Maybe<Scalars['String']>;
  /** Election not completed due to insufficient candidates or winners. */
  electionProblem?: Maybe<ElectionProblem>;
  id: Scalars['ID'];
  /** The new stage council got into. */
  stage: CouncilStage;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CouncilStageUpdateConnection = {
  __typename: 'CouncilStageUpdateConnection';
  edges: Array<CouncilStageUpdateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CouncilStageUpdateCreateInput = {
  changedAt: Scalars['BigInt'];
  electedCouncil?: Maybe<Scalars['ID']>;
  electionProblem: Scalars['JSONObject'];
  stage: Scalars['JSONObject'];
};

export type CouncilStageUpdateEdge = {
  __typename: 'CouncilStageUpdateEdge';
  cursor: Scalars['String'];
  node: CouncilStageUpdate;
};

export enum CouncilStageUpdateOrderByInput {
  ChangedAtAsc = 'changedAt_ASC',
  ChangedAtDesc = 'changedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectedCouncilAsc = 'electedCouncil_ASC',
  ElectedCouncilDesc = 'electedCouncil_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CouncilStageUpdateUpdateInput = {
  changedAt?: Maybe<Scalars['BigInt']>;
  electedCouncil?: Maybe<Scalars['ID']>;
  electionProblem?: Maybe<Scalars['JSONObject']>;
  stage?: Maybe<Scalars['JSONObject']>;
};

export type CouncilStageUpdateWhereInput = {
  AND?: Maybe<Array<CouncilStageUpdateWhereInput>>;
  OR?: Maybe<Array<CouncilStageUpdateWhereInput>>;
  changedAt_eq?: Maybe<Scalars['BigInt']>;
  changedAt_gt?: Maybe<Scalars['BigInt']>;
  changedAt_gte?: Maybe<Scalars['BigInt']>;
  changedAt_in?: Maybe<Array<Scalars['BigInt']>>;
  changedAt_lt?: Maybe<Scalars['BigInt']>;
  changedAt_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedCouncil?: Maybe<ElectedCouncilWhereInput>;
  electedCouncil_eq?: Maybe<Scalars['ID']>;
  electedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  electionProblem_json?: Maybe<Scalars['JSONObject']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  stage_json?: Maybe<Scalars['JSONObject']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CouncilStageUpdateWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CouncilorRewardUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'CouncilorRewardUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New reward amount paid each reward period. */
  rewardAmount: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CouncilorRewardUpdatedEventConnection = {
  __typename: 'CouncilorRewardUpdatedEventConnection';
  edges: Array<CouncilorRewardUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CouncilorRewardUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rewardAmount: Scalars['BigInt'];
};

export type CouncilorRewardUpdatedEventEdge = {
  __typename: 'CouncilorRewardUpdatedEventEdge';
  cursor: Scalars['String'];
  node: CouncilorRewardUpdatedEvent;
};

export enum CouncilorRewardUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RewardAmountAsc = 'rewardAmount_ASC',
  RewardAmountDesc = 'rewardAmount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CouncilorRewardUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rewardAmount?: Maybe<Scalars['BigInt']>;
};

export type CouncilorRewardUpdatedEventWhereInput = {
  AND?: Maybe<Array<CouncilorRewardUpdatedEventWhereInput>>;
  OR?: Maybe<Array<CouncilorRewardUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rewardAmount_eq?: Maybe<Scalars['BigInt']>;
  rewardAmount_gt?: Maybe<Scalars['BigInt']>;
  rewardAmount_gte?: Maybe<Scalars['BigInt']>;
  rewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardAmount_lt?: Maybe<Scalars['BigInt']>;
  rewardAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CouncilorRewardUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CreateBlogPostProposalDetails = {
  __typename: 'CreateBlogPostProposalDetails';
  /** Blog post content (md-formatted) */
  body: Scalars['String'];
  /** Blog post title */
  title: Scalars['String'];
};

export type CreateBlogPostProposalDetailsCreateInput = {
  body: Scalars['String'];
  title: Scalars['String'];
};

export type CreateBlogPostProposalDetailsUpdateInput = {
  body?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type CreateBlogPostProposalDetailsWhereInput = {
  AND?: Maybe<Array<CreateBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<CreateBlogPostProposalDetailsWhereInput>>;
  body_contains?: Maybe<Scalars['String']>;
  body_endsWith?: Maybe<Scalars['String']>;
  body_eq?: Maybe<Scalars['String']>;
  body_in?: Maybe<Array<Scalars['String']>>;
  body_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CreateBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CreateWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'CreateWorkingGroupLeadOpeningProposalDetails';
  /** Related working group */
  group?: Maybe<WorkingGroup>;
  /** The opening metadata */
  metadata?: Maybe<WorkingGroupOpeningMetadata>;
  /** Initial workers' reward per block */
  rewardPerBlock: Scalars['BigInt'];
  /** Min. application / role stake amount */
  stakeAmount: Scalars['BigInt'];
  /** Role stake unstaking period in blocks */
  unstakingPeriod: Scalars['Int'];
};

export type CreateWorkingGroupLeadOpeningProposalDetailsCreateInput = {
  rewardPerBlock: Scalars['BigInt'];
  stakeAmount: Scalars['BigInt'];
  unstakingPeriod: Scalars['Float'];
};

export type CreateWorkingGroupLeadOpeningProposalDetailsUpdateInput = {
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
  unstakingPeriod?: Maybe<Scalars['Float']>;
};

export type CreateWorkingGroupLeadOpeningProposalDetailsWhereInput = {
  AND?: Maybe<Array<CreateWorkingGroupLeadOpeningProposalDetailsWhereInput>>;
  OR?: Maybe<Array<CreateWorkingGroupLeadOpeningProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  unstakingPeriod_eq?: Maybe<Scalars['Int']>;
  unstakingPeriod_gt?: Maybe<Scalars['Int']>;
  unstakingPeriod_gte?: Maybe<Scalars['Int']>;
  unstakingPeriod_in?: Maybe<Array<Scalars['Int']>>;
  unstakingPeriod_lt?: Maybe<Scalars['Int']>;
  unstakingPeriod_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CreateWorkingGroupLeadOpeningProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type CuratorGroup = BaseGraphQlObject & {
  __typename: 'CuratorGroup';
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** Curators belonging to this group */
  curatorIds: Array<Scalars['Int']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Is group active or not */
  isActive: Scalars['Boolean'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type CuratorGroupConnection = {
  __typename: 'CuratorGroupConnection';
  edges: Array<CuratorGroupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CuratorGroupCreateInput = {
  curatorIds: Array<Scalars['Int']>;
  isActive: Scalars['Boolean'];
};

export type CuratorGroupEdge = {
  __typename: 'CuratorGroupEdge';
  cursor: Scalars['String'];
  node: CuratorGroup;
};

export enum CuratorGroupOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CuratorGroupUpdateInput = {
  curatorIds?: Maybe<Array<Scalars['Int']>>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type CuratorGroupWhereInput = {
  AND?: Maybe<Array<CuratorGroupWhereInput>>;
  OR?: Maybe<Array<CuratorGroupWhereInput>>;
  channels_every?: Maybe<ChannelWhereInput>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isActive_eq?: Maybe<Scalars['Boolean']>;
  isActive_in?: Maybe<Array<Scalars['Boolean']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type CuratorGroupWhereUniqueInput = {
  id: Scalars['ID'];
};

/** Manages content ids, type and storage provider decision about it */
export type DataObject = BaseGraphQlObject & {
  __typename: 'DataObject';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** Content added at */
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** IPFS content id */
  ipfsContentId: Scalars['String'];
  /** Joystream runtime content */
  joystreamContentId: Scalars['String'];
  liaison?: Maybe<Worker>;
  liaisonId?: Maybe<Scalars['String']>;
  /** Storage provider as liaison judgment */
  liaisonJudgement: LiaisonJudgement;
  membermetadataavatar?: Maybe<Array<MemberMetadata>>;
  /** Content owner */
  owner: DataObjectOwner;
  /** Content size in bytes */
  size: Scalars['BigInt'];
  /** Content type id */
  typeId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type DataObjectConnection = {
  __typename: 'DataObjectConnection';
  edges: Array<DataObjectEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DataObjectCreateInput = {
  createdInBlock: Scalars['Float'];
  ipfsContentId: Scalars['String'];
  joystreamContentId: Scalars['String'];
  liaison?: Maybe<Scalars['ID']>;
  liaisonJudgement: LiaisonJudgement;
  owner: Scalars['JSONObject'];
  size: Scalars['BigInt'];
  typeId: Scalars['Float'];
};

export type DataObjectEdge = {
  __typename: 'DataObjectEdge';
  cursor: Scalars['String'];
  node: DataObject;
};

export enum DataObjectOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IpfsContentIdAsc = 'ipfsContentId_ASC',
  IpfsContentIdDesc = 'ipfsContentId_DESC',
  JoystreamContentIdAsc = 'joystreamContentId_ASC',
  JoystreamContentIdDesc = 'joystreamContentId_DESC',
  LiaisonJudgementAsc = 'liaisonJudgement_ASC',
  LiaisonJudgementDesc = 'liaisonJudgement_DESC',
  LiaisonAsc = 'liaison_ASC',
  LiaisonDesc = 'liaison_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  TypeIdAsc = 'typeId_ASC',
  TypeIdDesc = 'typeId_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type DataObjectOwner = DataObjectOwnerChannel | DataObjectOwnerCouncil | DataObjectOwnerDao | DataObjectOwnerMember | DataObjectOwnerWorkingGroup;

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
  AND?: Maybe<Array<DataObjectOwnerChannelWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerChannelWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<DataObjectOwnerCouncilWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerCouncilWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<DataObjectOwnerDaoWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerDaoWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  dao_eq?: Maybe<Scalars['Int']>;
  dao_gt?: Maybe<Scalars['Int']>;
  dao_gte?: Maybe<Scalars['Int']>;
  dao_in?: Maybe<Array<Scalars['Int']>>;
  dao_lt?: Maybe<Scalars['Int']>;
  dao_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type DataObjectOwnerDaoWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DataObjectOwnerMember = {
  __typename: 'DataObjectOwnerMember';
  /** Variant needs to have at least one property. This value is not used. */
  dummy?: Maybe<Scalars['Int']>;
  /** Related member */
  member?: Maybe<Membership>;
};

export type DataObjectOwnerMemberCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerMemberUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type DataObjectOwnerMemberWhereInput = {
  AND?: Maybe<Array<DataObjectOwnerMemberWhereInput>>;
  OR?: Maybe<Array<DataObjectOwnerMemberWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  createdInBlock?: Maybe<Scalars['Float']>;
  ipfsContentId?: Maybe<Scalars['String']>;
  joystreamContentId?: Maybe<Scalars['String']>;
  liaison?: Maybe<Scalars['ID']>;
  liaisonJudgement?: Maybe<LiaisonJudgement>;
  owner?: Maybe<Scalars['JSONObject']>;
  size?: Maybe<Scalars['BigInt']>;
  typeId?: Maybe<Scalars['Float']>;
};

export type DataObjectWhereInput = {
  AND?: Maybe<Array<DataObjectWhereInput>>;
  OR?: Maybe<Array<DataObjectWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  ipfsContentId_contains?: Maybe<Scalars['String']>;
  ipfsContentId_endsWith?: Maybe<Scalars['String']>;
  ipfsContentId_eq?: Maybe<Scalars['String']>;
  ipfsContentId_in?: Maybe<Array<Scalars['String']>>;
  ipfsContentId_startsWith?: Maybe<Scalars['String']>;
  joystreamContentId_contains?: Maybe<Scalars['String']>;
  joystreamContentId_endsWith?: Maybe<Scalars['String']>;
  joystreamContentId_eq?: Maybe<Scalars['String']>;
  joystreamContentId_in?: Maybe<Array<Scalars['String']>>;
  joystreamContentId_startsWith?: Maybe<Scalars['String']>;
  liaison?: Maybe<WorkerWhereInput>;
  liaisonJudgement_eq?: Maybe<LiaisonJudgement>;
  liaisonJudgement_in?: Maybe<Array<LiaisonJudgement>>;
  liaison_eq?: Maybe<Scalars['ID']>;
  liaison_in?: Maybe<Array<Scalars['ID']>>;
  membermetadataavatar_every?: Maybe<MemberMetadataWhereInput>;
  membermetadataavatar_none?: Maybe<MemberMetadataWhereInput>;
  membermetadataavatar_some?: Maybe<MemberMetadataWhereInput>;
  owner_json?: Maybe<Scalars['JSONObject']>;
  size_eq?: Maybe<Scalars['BigInt']>;
  size_gt?: Maybe<Scalars['BigInt']>;
  size_gte?: Maybe<Scalars['BigInt']>;
  size_in?: Maybe<Array<Scalars['BigInt']>>;
  size_lt?: Maybe<Scalars['BigInt']>;
  size_lte?: Maybe<Scalars['BigInt']>;
  typeId_eq?: Maybe<Scalars['Int']>;
  typeId_gt?: Maybe<Scalars['Int']>;
  typeId_gte?: Maybe<Scalars['Int']>;
  typeId_in?: Maybe<Array<Scalars['Int']>>;
  typeId_lt?: Maybe<Scalars['Int']>;
  typeId_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type DataObjectWhereUniqueInput = {
  id: Scalars['ID'];
};

export type DecreaseWorkingGroupLeadStakeProposalDetails = {
  __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails';
  /** Amount to decrease the stake by */
  amount: Scalars['BigInt'];
  /** The lead that should be affected */
  lead?: Maybe<Worker>;
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsCreateInput = {
  amount: Scalars['BigInt'];
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
};

export type DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput = {
  AND?: Maybe<Array<DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput>>;
  OR?: Maybe<Array<DecreaseWorkingGroupLeadStakeProposalDetailsWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  /** The new blog post body (if should be updated) */
  newBody?: Maybe<Scalars['String']>;
  /** The new blog post title (if should be updated) */
  newTitle?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsCreateInput = {
  blogPost: Scalars['String'];
  newBody?: Maybe<Scalars['String']>;
  newTitle?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsUpdateInput = {
  blogPost?: Maybe<Scalars['String']>;
  newBody?: Maybe<Scalars['String']>;
  newTitle?: Maybe<Scalars['String']>;
};

export type EditBlogPostProposalDetailsWhereInput = {
  AND?: Maybe<Array<EditBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<EditBlogPostProposalDetailsWhereInput>>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newBody_contains?: Maybe<Scalars['String']>;
  newBody_endsWith?: Maybe<Scalars['String']>;
  newBody_eq?: Maybe<Scalars['String']>;
  newBody_in?: Maybe<Array<Scalars['String']>>;
  newBody_startsWith?: Maybe<Scalars['String']>;
  newTitle_contains?: Maybe<Scalars['String']>;
  newTitle_endsWith?: Maybe<Scalars['String']>;
  newTitle_eq?: Maybe<Scalars['String']>;
  newTitle_in?: Maybe<Array<Scalars['String']>>;
  newTitle_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type EditBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectedCouncil = BaseGraphQlObject & {
  __typename: 'ElectedCouncil';
  councilElections: Array<ElectionRound>;
  councilMembers: Array<CouncilMember>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Block number at which the council was elected. */
  electedAtBlock: Scalars['Int'];
  /** Block number at which the council reign ended and a new council was elected. */
  endedAtBlock?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** Sign if council is already resigned. */
  isResigned: Scalars['Boolean'];
  nextCouncilElections: Array<ElectionRound>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  updates: Array<CouncilStageUpdate>;
  version: Scalars['Int'];
};

export type ElectedCouncilConnection = {
  __typename: 'ElectedCouncilConnection';
  edges: Array<ElectedCouncilEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ElectedCouncilCreateInput = {
  electedAtBlock: Scalars['Float'];
  endedAtBlock?: Maybe<Scalars['Float']>;
  isResigned: Scalars['Boolean'];
};

export type ElectedCouncilEdge = {
  __typename: 'ElectedCouncilEdge';
  cursor: Scalars['String'];
  node: ElectedCouncil;
};

export enum ElectedCouncilOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectedAtBlockAsc = 'electedAtBlock_ASC',
  ElectedAtBlockDesc = 'electedAtBlock_DESC',
  EndedAtBlockAsc = 'endedAtBlock_ASC',
  EndedAtBlockDesc = 'endedAtBlock_DESC',
  IsResignedAsc = 'isResigned_ASC',
  IsResignedDesc = 'isResigned_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ElectedCouncilUpdateInput = {
  electedAtBlock?: Maybe<Scalars['Float']>;
  endedAtBlock?: Maybe<Scalars['Float']>;
  isResigned?: Maybe<Scalars['Boolean']>;
};

export type ElectedCouncilWhereInput = {
  AND?: Maybe<Array<ElectedCouncilWhereInput>>;
  OR?: Maybe<Array<ElectedCouncilWhereInput>>;
  councilElections_every?: Maybe<ElectionRoundWhereInput>;
  councilElections_none?: Maybe<ElectionRoundWhereInput>;
  councilElections_some?: Maybe<ElectionRoundWhereInput>;
  councilMembers_every?: Maybe<CouncilMemberWhereInput>;
  councilMembers_none?: Maybe<CouncilMemberWhereInput>;
  councilMembers_some?: Maybe<CouncilMemberWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedAtBlock_eq?: Maybe<Scalars['Int']>;
  electedAtBlock_gt?: Maybe<Scalars['Int']>;
  electedAtBlock_gte?: Maybe<Scalars['Int']>;
  electedAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  electedAtBlock_lt?: Maybe<Scalars['Int']>;
  electedAtBlock_lte?: Maybe<Scalars['Int']>;
  endedAtBlock_eq?: Maybe<Scalars['Int']>;
  endedAtBlock_gt?: Maybe<Scalars['Int']>;
  endedAtBlock_gte?: Maybe<Scalars['Int']>;
  endedAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  endedAtBlock_lt?: Maybe<Scalars['Int']>;
  endedAtBlock_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isResigned_eq?: Maybe<Scalars['Boolean']>;
  isResigned_in?: Maybe<Array<Scalars['Boolean']>>;
  nextCouncilElections_every?: Maybe<ElectionRoundWhereInput>;
  nextCouncilElections_none?: Maybe<ElectionRoundWhereInput>;
  nextCouncilElections_some?: Maybe<ElectionRoundWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  updates_every?: Maybe<CouncilStageUpdateWhereInput>;
  updates_none?: Maybe<CouncilStageUpdateWhereInput>;
  updates_some?: Maybe<CouncilStageUpdateWhereInput>;
};

export type ElectedCouncilWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectionProblem = ElectionProblemNewCouncilNotElected | ElectionProblemNotEnoughCandidates | VariantNone;

export type ElectionProblemNewCouncilNotElected = {
  __typename: 'ElectionProblemNewCouncilNotElected';
  dummy?: Maybe<Scalars['Int']>;
};

export type ElectionProblemNewCouncilNotElectedCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ElectionProblemNewCouncilNotElectedUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ElectionProblemNewCouncilNotElectedWhereInput = {
  AND?: Maybe<Array<ElectionProblemNewCouncilNotElectedWhereInput>>;
  OR?: Maybe<Array<ElectionProblemNewCouncilNotElectedWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ElectionProblemNewCouncilNotElectedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectionProblemNotEnoughCandidates = {
  __typename: 'ElectionProblemNotEnoughCandidates';
  dummy?: Maybe<Scalars['Int']>;
};

export type ElectionProblemNotEnoughCandidatesCreateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ElectionProblemNotEnoughCandidatesUpdateInput = {
  dummy?: Maybe<Scalars['Float']>;
};

export type ElectionProblemNotEnoughCandidatesWhereInput = {
  AND?: Maybe<Array<ElectionProblemNotEnoughCandidatesWhereInput>>;
  OR?: Maybe<Array<ElectionProblemNotEnoughCandidatesWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ElectionProblemNotEnoughCandidatesWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ElectionRound = BaseGraphQlObject & {
  __typename: 'ElectionRound';
  candidates: Array<Candidate>;
  castVotes: Array<CastVote>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** Election cycle ID. */
  cycleId: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electedCouncil: ElectedCouncil;
  electedCouncilId: Scalars['String'];
  id: Scalars['ID'];
  /** Sign if election has already finished. */
  isFinished: Scalars['Boolean'];
  nextElectedCouncil?: Maybe<ElectedCouncil>;
  nextElectedCouncilId?: Maybe<Scalars['String']>;
  referendumstagerevealingoptionresultelectionRound?: Maybe<Array<ReferendumStageRevealingOptionResult>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ElectionRoundConnection = {
  __typename: 'ElectionRoundConnection';
  edges: Array<ElectionRoundEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ElectionRoundCreateInput = {
  cycleId: Scalars['Float'];
  electedCouncil: Scalars['ID'];
  isFinished: Scalars['Boolean'];
  nextElectedCouncil?: Maybe<Scalars['ID']>;
};

export type ElectionRoundEdge = {
  __typename: 'ElectionRoundEdge';
  cursor: Scalars['String'];
  node: ElectionRound;
};

export enum ElectionRoundOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CycleIdAsc = 'cycleId_ASC',
  CycleIdDesc = 'cycleId_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectedCouncilAsc = 'electedCouncil_ASC',
  ElectedCouncilDesc = 'electedCouncil_DESC',
  IsFinishedAsc = 'isFinished_ASC',
  IsFinishedDesc = 'isFinished_DESC',
  NextElectedCouncilAsc = 'nextElectedCouncil_ASC',
  NextElectedCouncilDesc = 'nextElectedCouncil_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ElectionRoundUpdateInput = {
  cycleId?: Maybe<Scalars['Float']>;
  electedCouncil?: Maybe<Scalars['ID']>;
  isFinished?: Maybe<Scalars['Boolean']>;
  nextElectedCouncil?: Maybe<Scalars['ID']>;
};

export type ElectionRoundWhereInput = {
  AND?: Maybe<Array<ElectionRoundWhereInput>>;
  OR?: Maybe<Array<ElectionRoundWhereInput>>;
  candidates_every?: Maybe<CandidateWhereInput>;
  candidates_none?: Maybe<CandidateWhereInput>;
  candidates_some?: Maybe<CandidateWhereInput>;
  castVotes_every?: Maybe<CastVoteWhereInput>;
  castVotes_none?: Maybe<CastVoteWhereInput>;
  castVotes_some?: Maybe<CastVoteWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  cycleId_eq?: Maybe<Scalars['Int']>;
  cycleId_gt?: Maybe<Scalars['Int']>;
  cycleId_gte?: Maybe<Scalars['Int']>;
  cycleId_in?: Maybe<Array<Scalars['Int']>>;
  cycleId_lt?: Maybe<Scalars['Int']>;
  cycleId_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedCouncil?: Maybe<ElectedCouncilWhereInput>;
  electedCouncil_eq?: Maybe<Scalars['ID']>;
  electedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isFinished_eq?: Maybe<Scalars['Boolean']>;
  isFinished_in?: Maybe<Array<Scalars['Boolean']>>;
  nextElectedCouncil?: Maybe<ElectedCouncilWhereInput>;
  nextElectedCouncil_eq?: Maybe<Scalars['ID']>;
  nextElectedCouncil_in?: Maybe<Array<Scalars['ID']>>;
  referendumstagerevealingoptionresultelectionRound_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumstagerevealingoptionresultelectionRound_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumstagerevealingoptionresultelectionRound_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ElectionRoundWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Event = {
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
};

export type EventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  type?: Maybe<EventTypeOptions>;
};

export enum EventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export enum EventTypeOptions {
  AnnouncingPeriodStartedEvent = 'AnnouncingPeriodStartedEvent',
  ApplicationWithdrawnEvent = 'ApplicationWithdrawnEvent',
  AppliedOnOpeningEvent = 'AppliedOnOpeningEvent',
  BudgetBalanceSetEvent = 'BudgetBalanceSetEvent',
  BudgetIncrementUpdatedEvent = 'BudgetIncrementUpdatedEvent',
  BudgetRefillEvent = 'BudgetRefillEvent',
  BudgetRefillPlannedEvent = 'BudgetRefillPlannedEvent',
  BudgetSetEvent = 'BudgetSetEvent',
  BudgetSpendingEvent = 'BudgetSpendingEvent',
  CandidacyNoteSetEvent = 'CandidacyNoteSetEvent',
  CandidacyStakeReleaseEvent = 'CandidacyStakeReleaseEvent',
  CandidacyWithdrawEvent = 'CandidacyWithdrawEvent',
  CouncilorRewardUpdatedEvent = 'CouncilorRewardUpdatedEvent',
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
  NewCandidateEvent = 'NewCandidateEvent',
  NewCouncilElectedEvent = 'NewCouncilElectedEvent',
  NewCouncilNotElectedEvent = 'NewCouncilNotElectedEvent',
  NewMissedRewardLevelReachedEvent = 'NewMissedRewardLevelReachedEvent',
  NotEnoughCandidatesEvent = 'NotEnoughCandidatesEvent',
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
  ReferendumFinishedEvent = 'ReferendumFinishedEvent',
  ReferendumStartedEvent = 'ReferendumStartedEvent',
  ReferendumStartedForcefullyEvent = 'ReferendumStartedForcefullyEvent',
  ReferralCutUpdatedEvent = 'ReferralCutUpdatedEvent',
  RequestFundedEvent = 'RequestFundedEvent',
  RevealingStageStartedEvent = 'RevealingStageStartedEvent',
  RewardPaidEvent = 'RewardPaidEvent',
  RewardPaymentEvent = 'RewardPaymentEvent',
  StakeDecreasedEvent = 'StakeDecreasedEvent',
  StakeIncreasedEvent = 'StakeIncreasedEvent',
  StakeReleasedEvent = 'StakeReleasedEvent',
  StakeSlashedEvent = 'StakeSlashedEvent',
  StakingAccountAddedEvent = 'StakingAccountAddedEvent',
  StakingAccountConfirmedEvent = 'StakingAccountConfirmedEvent',
  StakingAccountRemovedEvent = 'StakingAccountRemovedEvent',
  StatusTextChangedEvent = 'StatusTextChangedEvent',
  TerminatedLeaderEvent = 'TerminatedLeaderEvent',
  TerminatedWorkerEvent = 'TerminatedWorkerEvent',
  VoteCastEvent = 'VoteCastEvent',
  VoteRevealedEvent = 'VoteRevealedEvent',
  VotingPeriodStartedEvent = 'VotingPeriodStartedEvent',
  WorkerExitedEvent = 'WorkerExitedEvent',
  WorkerRewardAccountUpdatedEvent = 'WorkerRewardAccountUpdatedEvent',
  WorkerRewardAmountUpdatedEvent = 'WorkerRewardAmountUpdatedEvent',
  WorkerRoleAccountUpdatedEvent = 'WorkerRoleAccountUpdatedEvent',
  WorkerStartedLeavingEvent = 'WorkerStartedLeavingEvent'
}

export type EventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  type?: Maybe<EventTypeOptions>;
};

export type EventWhereInput = {
  AND?: Maybe<Array<EventWhereInput>>;
  OR?: Maybe<Array<EventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  type_eq?: Maybe<EventTypeOptions>;
  type_in?: Maybe<Array<EventTypeOptions>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type EventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FillWorkingGroupLeadOpeningProposalDetails = {
  __typename: 'FillWorkingGroupLeadOpeningProposalDetails';
  /** Selected successful application */
  application?: Maybe<WorkingGroupApplication>;
  /** Lead opening to to be filled */
  opening?: Maybe<WorkingGroupOpening>;
};

export type ForumCategory = BaseGraphQlObject & {
  __typename: 'ForumCategory';
  categoryarchivalstatusupdatedeventcategory?: Maybe<Array<CategoryArchivalStatusUpdatedEvent>>;
  categorydeletedeventcategory?: Maybe<Array<CategoryDeletedEvent>>;
  categorymembershipofmoderatorupdatedeventcategory?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEvent>>;
  categorystickythreadupdateeventcategory?: Maybe<Array<CategoryStickyThreadUpdateEvent>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: CategoryCreatedEvent;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Category description */
  description: Scalars['String'];
  forumcategoryparent?: Maybe<Array<ForumCategory>>;
  id: Scalars['ID'];
  moderators: Array<Worker>;
  parent?: Maybe<ForumCategory>;
  parentId?: Maybe<Scalars['String']>;
  /** Current category status */
  status: CategoryStatus;
  threadmovedeventnewCategory?: Maybe<Array<ThreadMovedEvent>>;
  threadmovedeventoldCategory?: Maybe<Array<ThreadMovedEvent>>;
  threads: Array<ForumThread>;
  /** Category title */
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ForumCategoryConnection = {
  __typename: 'ForumCategoryConnection';
  edges: Array<ForumCategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumCategoryCreateInput = {
  description: Scalars['String'];
  parent?: Maybe<Scalars['ID']>;
  status: Scalars['JSONObject'];
  title: Scalars['String'];
};

export type ForumCategoryEdge = {
  __typename: 'ForumCategoryEdge';
  cursor: Scalars['String'];
  node: ForumCategory;
};

export enum ForumCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ParentAsc = 'parent_ASC',
  ParentDesc = 'parent_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ForumCategoryUpdateInput = {
  description?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['JSONObject']>;
  title?: Maybe<Scalars['String']>;
};

export type ForumCategoryWhereInput = {
  AND?: Maybe<Array<ForumCategoryWhereInput>>;
  OR?: Maybe<Array<ForumCategoryWhereInput>>;
  categoryarchivalstatusupdatedeventcategory_every?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventcategory_none?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventcategory_some?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categorydeletedeventcategory_every?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventcategory_none?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventcategory_some?: Maybe<CategoryDeletedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_every?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_none?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventcategory_some?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorystickythreadupdateeventcategory_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventcategory_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventcategory_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<CategoryCreatedEventWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  forumcategoryparent_every?: Maybe<ForumCategoryWhereInput>;
  forumcategoryparent_none?: Maybe<ForumCategoryWhereInput>;
  forumcategoryparent_some?: Maybe<ForumCategoryWhereInput>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  moderators_every?: Maybe<WorkerWhereInput>;
  moderators_none?: Maybe<WorkerWhereInput>;
  moderators_some?: Maybe<WorkerWhereInput>;
  parent?: Maybe<ForumCategoryWhereInput>;
  parent_eq?: Maybe<Scalars['ID']>;
  parent_in?: Maybe<Array<Scalars['ID']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  threadmovedeventnewCategory_every?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventnewCategory_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventnewCategory_some?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventoldCategory_every?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventoldCategory_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventoldCategory_some?: Maybe<ThreadMovedEventWhereInput>;
  threads_every?: Maybe<ForumThreadWhereInput>;
  threads_none?: Maybe<ForumThreadWhereInput>;
  threads_some?: Maybe<ForumThreadWhereInput>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ForumCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPoll = BaseGraphQlObject & {
  __typename: 'ForumPoll';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Poll description */
  description: Scalars['String'];
  /** The time at which the poll ends */
  endTime: Scalars['DateTime'];
  id: Scalars['ID'];
  pollAlternatives: Array<ForumPollAlternative>;
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ForumPollAlternative = BaseGraphQlObject & {
  __typename: 'ForumPollAlternative';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Index uniquely identifying the alternative in given poll */
  index: Scalars['Int'];
  poll: ForumPoll;
  pollId: Scalars['String'];
  /** The alternative text */
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  votes: Array<VoteOnPollEvent>;
};

export type ForumPollAlternativeConnection = {
  __typename: 'ForumPollAlternativeConnection';
  edges: Array<ForumPollAlternativeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumPollAlternativeCreateInput = {
  index: Scalars['Float'];
  poll: Scalars['ID'];
  text: Scalars['String'];
};

export type ForumPollAlternativeEdge = {
  __typename: 'ForumPollAlternativeEdge';
  cursor: Scalars['String'];
  node: ForumPollAlternative;
};

export enum ForumPollAlternativeOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IndexAsc = 'index_ASC',
  IndexDesc = 'index_DESC',
  PollAsc = 'poll_ASC',
  PollDesc = 'poll_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ForumPollAlternativeUpdateInput = {
  index?: Maybe<Scalars['Float']>;
  poll?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ForumPollAlternativeWhereInput = {
  AND?: Maybe<Array<ForumPollAlternativeWhereInput>>;
  OR?: Maybe<Array<ForumPollAlternativeWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  index_eq?: Maybe<Scalars['Int']>;
  index_gt?: Maybe<Scalars['Int']>;
  index_gte?: Maybe<Scalars['Int']>;
  index_in?: Maybe<Array<Scalars['Int']>>;
  index_lt?: Maybe<Scalars['Int']>;
  index_lte?: Maybe<Scalars['Int']>;
  poll?: Maybe<ForumPollWhereInput>;
  poll_eq?: Maybe<Scalars['ID']>;
  poll_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votes_every?: Maybe<VoteOnPollEventWhereInput>;
  votes_none?: Maybe<VoteOnPollEventWhereInput>;
  votes_some?: Maybe<VoteOnPollEventWhereInput>;
};

export type ForumPollAlternativeWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPollConnection = {
  __typename: 'ForumPollConnection';
  edges: Array<ForumPollEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumPollCreateInput = {
  description: Scalars['String'];
  endTime: Scalars['DateTime'];
  thread: Scalars['ID'];
};

export type ForumPollEdge = {
  __typename: 'ForumPollEdge';
  cursor: Scalars['String'];
  node: ForumPoll;
};

export enum ForumPollOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  EndTimeAsc = 'endTime_ASC',
  EndTimeDesc = 'endTime_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ForumPollUpdateInput = {
  description?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['DateTime']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ForumPollWhereInput = {
  AND?: Maybe<Array<ForumPollWhereInput>>;
  OR?: Maybe<Array<ForumPollWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  endTime_eq?: Maybe<Scalars['DateTime']>;
  endTime_gt?: Maybe<Scalars['DateTime']>;
  endTime_gte?: Maybe<Scalars['DateTime']>;
  endTime_lt?: Maybe<Scalars['DateTime']>;
  endTime_lte?: Maybe<Scalars['DateTime']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  pollAlternatives_every?: Maybe<ForumPollAlternativeWhereInput>;
  pollAlternatives_none?: Maybe<ForumPollAlternativeWhereInput>;
  pollAlternatives_some?: Maybe<ForumPollAlternativeWhereInput>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ForumPollWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPost = BaseGraphQlObject & {
  __typename: 'ForumPost';
  author: Membership;
  authorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  deletedInEvent?: Maybe<PostDeletedEvent>;
  deletedInEventId?: Maybe<Scalars['String']>;
  edits: Array<PostTextUpdatedEvent>;
  forumpostrepliesTo?: Maybe<Array<ForumPost>>;
  forumthreadinitialPost?: Maybe<Array<ForumThread>>;
  id: Scalars['ID'];
  /** True if the post is either Active or Locked */
  isVisible: Scalars['Boolean'];
  /** The origin of the post (either thread creation event or regular PostAdded event) */
  origin: PostOrigin;
  postaddedeventpost?: Maybe<Array<PostAddedEvent>>;
  postmoderatedeventpost?: Maybe<Array<PostModeratedEvent>>;
  postreactedeventpost?: Maybe<Array<PostReactedEvent>>;
  reactions: Array<ForumPostReaction>;
  repliesTo?: Maybe<ForumPost>;
  repliesToId?: Maybe<Scalars['String']>;
  /** Current post status */
  status: PostStatus;
  /** Content of the post (md-formatted) */
  text: Scalars['String'];
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ForumPostConnection = {
  __typename: 'ForumPostConnection';
  edges: Array<ForumPostEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumPostCreateInput = {
  author: Scalars['ID'];
  deletedInEvent?: Maybe<Scalars['ID']>;
  isVisible: Scalars['Boolean'];
  origin: Scalars['JSONObject'];
  repliesTo?: Maybe<Scalars['ID']>;
  status: Scalars['JSONObject'];
  text: Scalars['String'];
  thread: Scalars['ID'];
};

export type ForumPostEdge = {
  __typename: 'ForumPostEdge';
  cursor: Scalars['String'];
  node: ForumPost;
};

export enum ForumPostOrderByInput {
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DeletedInEventAsc = 'deletedInEvent_ASC',
  DeletedInEventDesc = 'deletedInEvent_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC',
  RepliesToAsc = 'repliesTo_ASC',
  RepliesToDesc = 'repliesTo_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ForumPostReaction = BaseGraphQlObject & {
  __typename: 'ForumPostReaction';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  member: Membership;
  memberId: Scalars['String'];
  post: ForumPost;
  postId: Scalars['String'];
  /** The reaction */
  reaction: PostReaction;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ForumPostReactionConnection = {
  __typename: 'ForumPostReactionConnection';
  edges: Array<ForumPostReactionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumPostReactionCreateInput = {
  member: Scalars['ID'];
  post: Scalars['ID'];
  reaction: PostReaction;
};

export type ForumPostReactionEdge = {
  __typename: 'ForumPostReactionEdge';
  cursor: Scalars['String'];
  node: ForumPostReaction;
};

export enum ForumPostReactionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  ReactionAsc = 'reaction_ASC',
  ReactionDesc = 'reaction_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ForumPostReactionUpdateInput = {
  member?: Maybe<Scalars['ID']>;
  post?: Maybe<Scalars['ID']>;
  reaction?: Maybe<PostReaction>;
};

export type ForumPostReactionWhereInput = {
  AND?: Maybe<Array<ForumPostReactionWhereInput>>;
  OR?: Maybe<Array<ForumPostReactionWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  post?: Maybe<ForumPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  reaction_eq?: Maybe<PostReaction>;
  reaction_in?: Maybe<Array<PostReaction>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ForumPostReactionWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumPostUpdateInput = {
  author?: Maybe<Scalars['ID']>;
  deletedInEvent?: Maybe<Scalars['ID']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  origin?: Maybe<Scalars['JSONObject']>;
  repliesTo?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['JSONObject']>;
  text?: Maybe<Scalars['String']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ForumPostWhereInput = {
  AND?: Maybe<Array<ForumPostWhereInput>>;
  OR?: Maybe<Array<ForumPostWhereInput>>;
  author?: Maybe<MembershipWhereInput>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  deletedInEvent?: Maybe<PostDeletedEventWhereInput>;
  deletedInEvent_eq?: Maybe<Scalars['ID']>;
  deletedInEvent_in?: Maybe<Array<Scalars['ID']>>;
  edits_every?: Maybe<PostTextUpdatedEventWhereInput>;
  edits_none?: Maybe<PostTextUpdatedEventWhereInput>;
  edits_some?: Maybe<PostTextUpdatedEventWhereInput>;
  forumpostrepliesTo_every?: Maybe<ForumPostWhereInput>;
  forumpostrepliesTo_none?: Maybe<ForumPostWhereInput>;
  forumpostrepliesTo_some?: Maybe<ForumPostWhereInput>;
  forumthreadinitialPost_every?: Maybe<ForumThreadWhereInput>;
  forumthreadinitialPost_none?: Maybe<ForumThreadWhereInput>;
  forumthreadinitialPost_some?: Maybe<ForumThreadWhereInput>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  origin_json?: Maybe<Scalars['JSONObject']>;
  postaddedeventpost_every?: Maybe<PostAddedEventWhereInput>;
  postaddedeventpost_none?: Maybe<PostAddedEventWhereInput>;
  postaddedeventpost_some?: Maybe<PostAddedEventWhereInput>;
  postmoderatedeventpost_every?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventpost_none?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventpost_some?: Maybe<PostModeratedEventWhereInput>;
  postreactedeventpost_every?: Maybe<PostReactedEventWhereInput>;
  postreactedeventpost_none?: Maybe<PostReactedEventWhereInput>;
  postreactedeventpost_some?: Maybe<PostReactedEventWhereInput>;
  reactions_every?: Maybe<ForumPostReactionWhereInput>;
  reactions_none?: Maybe<ForumPostReactionWhereInput>;
  reactions_some?: Maybe<ForumPostReactionWhereInput>;
  repliesTo?: Maybe<ForumPostWhereInput>;
  repliesTo_eq?: Maybe<Scalars['ID']>;
  repliesTo_in?: Maybe<Array<Scalars['ID']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ForumPostWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumThread = BaseGraphQlObject & {
  __typename: 'ForumThread';
  author: Membership;
  authorId: Scalars['String'];
  category: ForumCategory;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: ThreadCreatedEvent;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  initialPost?: Maybe<ForumPost>;
  initialPostId?: Maybe<Scalars['String']>;
  /** Whether the thread is sticky in the category */
  isSticky: Scalars['Boolean'];
  /** True if the thread is either Active or Locked */
  isVisible: Scalars['Boolean'];
  madeStickyInEvents: Array<CategoryStickyThreadUpdateEvent>;
  metadataUpdates: Array<ThreadMetadataUpdatedEvent>;
  movedInEvents: Array<ThreadMovedEvent>;
  poll?: Maybe<ForumPoll>;
  posts: Array<ForumPost>;
  /** Current thread status */
  status: ThreadStatus;
  tags: Array<ForumThreadTag>;
  threaddeletedeventthread?: Maybe<Array<ThreadDeletedEvent>>;
  threadmoderatedeventthread?: Maybe<Array<ThreadModeratedEvent>>;
  /** Thread title */
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Number of non-deleted posts in the thread */
  visiblePostsCount: Scalars['Int'];
};

export type ForumThreadConnection = {
  __typename: 'ForumThreadConnection';
  edges: Array<ForumThreadEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumThreadCreateInput = {
  author: Scalars['ID'];
  category: Scalars['ID'];
  initialPost?: Maybe<Scalars['ID']>;
  isSticky: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  status: Scalars['JSONObject'];
  title: Scalars['String'];
  visiblePostsCount: Scalars['Float'];
};

export type ForumThreadEdge = {
  __typename: 'ForumThreadEdge';
  cursor: Scalars['String'];
  node: ForumThread;
};

export enum ForumThreadOrderByInput {
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InitialPostAsc = 'initialPost_ASC',
  InitialPostDesc = 'initialPost_DESC',
  IsStickyAsc = 'isSticky_ASC',
  IsStickyDesc = 'isSticky_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VisiblePostsCountAsc = 'visiblePostsCount_ASC',
  VisiblePostsCountDesc = 'visiblePostsCount_DESC'
}

export type ForumThreadTag = BaseGraphQlObject & {
  __typename: 'ForumThreadTag';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  threads: Array<ForumThread>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Number of non-removed threads currently assigned to the tag */
  visibleThreadsCount: Scalars['Int'];
};

export type ForumThreadTagConnection = {
  __typename: 'ForumThreadTagConnection';
  edges: Array<ForumThreadTagEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForumThreadTagCreateInput = {
  visibleThreadsCount: Scalars['Float'];
};

export type ForumThreadTagEdge = {
  __typename: 'ForumThreadTagEdge';
  cursor: Scalars['String'];
  node: ForumThreadTag;
};

export enum ForumThreadTagOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VisibleThreadsCountAsc = 'visibleThreadsCount_ASC',
  VisibleThreadsCountDesc = 'visibleThreadsCount_DESC'
}

export type ForumThreadTagUpdateInput = {
  visibleThreadsCount?: Maybe<Scalars['Float']>;
};

export type ForumThreadTagWhereInput = {
  AND?: Maybe<Array<ForumThreadTagWhereInput>>;
  OR?: Maybe<Array<ForumThreadTagWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  threads_every?: Maybe<ForumThreadWhereInput>;
  threads_none?: Maybe<ForumThreadWhereInput>;
  threads_some?: Maybe<ForumThreadWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  visibleThreadsCount_eq?: Maybe<Scalars['Int']>;
  visibleThreadsCount_gt?: Maybe<Scalars['Int']>;
  visibleThreadsCount_gte?: Maybe<Scalars['Int']>;
  visibleThreadsCount_in?: Maybe<Array<Scalars['Int']>>;
  visibleThreadsCount_lt?: Maybe<Scalars['Int']>;
  visibleThreadsCount_lte?: Maybe<Scalars['Int']>;
};

export type ForumThreadTagWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ForumThreadUpdateInput = {
  author?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  initialPost?: Maybe<Scalars['ID']>;
  isSticky?: Maybe<Scalars['Boolean']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['JSONObject']>;
  title?: Maybe<Scalars['String']>;
  visiblePostsCount?: Maybe<Scalars['Float']>;
};

export type ForumThreadWhereInput = {
  AND?: Maybe<Array<ForumThreadWhereInput>>;
  OR?: Maybe<Array<ForumThreadWhereInput>>;
  author?: Maybe<MembershipWhereInput>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  category?: Maybe<ForumCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<ThreadCreatedEventWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  initialPost?: Maybe<ForumPostWhereInput>;
  initialPost_eq?: Maybe<Scalars['ID']>;
  initialPost_in?: Maybe<Array<Scalars['ID']>>;
  isSticky_eq?: Maybe<Scalars['Boolean']>;
  isSticky_in?: Maybe<Array<Scalars['Boolean']>>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  madeStickyInEvents_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  madeStickyInEvents_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  madeStickyInEvents_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  metadataUpdates_every?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  metadataUpdates_none?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  metadataUpdates_some?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
  movedInEvents_every?: Maybe<ThreadMovedEventWhereInput>;
  movedInEvents_none?: Maybe<ThreadMovedEventWhereInput>;
  movedInEvents_some?: Maybe<ThreadMovedEventWhereInput>;
  poll?: Maybe<ForumPollWhereInput>;
  posts_every?: Maybe<ForumPostWhereInput>;
  posts_none?: Maybe<ForumPostWhereInput>;
  posts_some?: Maybe<ForumPostWhereInput>;
  status_json?: Maybe<Scalars['JSONObject']>;
  tags_every?: Maybe<ForumThreadTagWhereInput>;
  tags_none?: Maybe<ForumThreadTagWhereInput>;
  tags_some?: Maybe<ForumThreadTagWhereInput>;
  threaddeletedeventthread_every?: Maybe<ThreadDeletedEventWhereInput>;
  threaddeletedeventthread_none?: Maybe<ThreadDeletedEventWhereInput>;
  threaddeletedeventthread_some?: Maybe<ThreadDeletedEventWhereInput>;
  threadmoderatedeventthread_every?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventthread_none?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventthread_some?: Maybe<ThreadModeratedEventWhereInput>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  visiblePostsCount_eq?: Maybe<Scalars['Int']>;
  visiblePostsCount_gt?: Maybe<Scalars['Int']>;
  visiblePostsCount_gte?: Maybe<Scalars['Int']>;
  visiblePostsCount_in?: Maybe<Array<Scalars['Int']>>;
  visiblePostsCount_lt?: Maybe<Scalars['Int']>;
  visiblePostsCount_lte?: Maybe<Scalars['Int']>;
};

export type ForumThreadWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestDestination = BaseGraphQlObject & {
  __typename: 'FundingRequestDestination';
  /** Destination account */
  account: Scalars['String'];
  /** Amount of funds requested */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  list: FundingRequestDestinationsList;
  listId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type FundingRequestDestinationConnection = {
  __typename: 'FundingRequestDestinationConnection';
  edges: Array<FundingRequestDestinationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FundingRequestDestinationCreateInput = {
  account: Scalars['String'];
  amount: Scalars['BigInt'];
  list: Scalars['ID'];
};

export type FundingRequestDestinationEdge = {
  __typename: 'FundingRequestDestinationEdge';
  cursor: Scalars['String'];
  node: FundingRequestDestination;
};

export enum FundingRequestDestinationOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ListAsc = 'list_ASC',
  ListDesc = 'list_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type FundingRequestDestinationUpdateInput = {
  account?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  list?: Maybe<Scalars['ID']>;
};

export type FundingRequestDestinationWhereInput = {
  AND?: Maybe<Array<FundingRequestDestinationWhereInput>>;
  OR?: Maybe<Array<FundingRequestDestinationWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  list?: Maybe<FundingRequestDestinationsListWhereInput>;
  list_eq?: Maybe<Scalars['ID']>;
  list_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type FundingRequestDestinationWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestDestinationsList = BaseGraphQlObject & {
  __typename: 'FundingRequestDestinationsList';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  destinations: Array<FundingRequestDestination>;
  id: Scalars['ID'];
  phantom?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type FundingRequestDestinationsListConnection = {
  __typename: 'FundingRequestDestinationsListConnection';
  edges: Array<FundingRequestDestinationsListEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type FundingRequestDestinationsListCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type FundingRequestDestinationsListEdge = {
  __typename: 'FundingRequestDestinationsListEdge';
  cursor: Scalars['String'];
  node: FundingRequestDestinationsList;
};

export enum FundingRequestDestinationsListOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  PhantomAsc = 'phantom_ASC',
  PhantomDesc = 'phantom_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type FundingRequestDestinationsListUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type FundingRequestDestinationsListWhereInput = {
  AND?: Maybe<Array<FundingRequestDestinationsListWhereInput>>;
  OR?: Maybe<Array<FundingRequestDestinationsListWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  destinations_every?: Maybe<FundingRequestDestinationWhereInput>;
  destinations_none?: Maybe<FundingRequestDestinationWhereInput>;
  destinations_some?: Maybe<FundingRequestDestinationWhereInput>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type FundingRequestDestinationsListWhereUniqueInput = {
  id: Scalars['ID'];
};

export type FundingRequestProposalDetails = {
  __typename: 'FundingRequestProposalDetails';
  /** Related list of funding request destinations */
  destinationsList?: Maybe<FundingRequestDestinationsList>;
};

export type InitialInvitationBalanceUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'InitialInvitationBalanceUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New initial invitation balance. */
  newInitialBalance: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type InitialInvitationBalanceUpdatedEventConnection = {
  __typename: 'InitialInvitationBalanceUpdatedEventConnection';
  edges: Array<InitialInvitationBalanceUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type InitialInvitationBalanceUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newInitialBalance: Scalars['BigInt'];
};

export type InitialInvitationBalanceUpdatedEventEdge = {
  __typename: 'InitialInvitationBalanceUpdatedEventEdge';
  cursor: Scalars['String'];
  node: InitialInvitationBalanceUpdatedEvent;
};

export enum InitialInvitationBalanceUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewInitialBalanceAsc = 'newInitialBalance_ASC',
  NewInitialBalanceDesc = 'newInitialBalance_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type InitialInvitationBalanceUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newInitialBalance?: Maybe<Scalars['BigInt']>;
};

export type InitialInvitationBalanceUpdatedEventWhereInput = {
  AND?: Maybe<Array<InitialInvitationBalanceUpdatedEventWhereInput>>;
  OR?: Maybe<Array<InitialInvitationBalanceUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newInitialBalance_eq?: Maybe<Scalars['BigInt']>;
  newInitialBalance_gt?: Maybe<Scalars['BigInt']>;
  newInitialBalance_gte?: Maybe<Scalars['BigInt']>;
  newInitialBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  newInitialBalance_lt?: Maybe<Scalars['BigInt']>;
  newInitialBalance_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type InitialInvitationBalanceUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type InitialInvitationCountUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'InitialInvitationCountUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New initial invitation count for members. */
  newInitialInvitationCount: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type InitialInvitationCountUpdatedEventConnection = {
  __typename: 'InitialInvitationCountUpdatedEventConnection';
  edges: Array<InitialInvitationCountUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type InitialInvitationCountUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newInitialInvitationCount: Scalars['Float'];
};

export type InitialInvitationCountUpdatedEventEdge = {
  __typename: 'InitialInvitationCountUpdatedEventEdge';
  cursor: Scalars['String'];
  node: InitialInvitationCountUpdatedEvent;
};

export enum InitialInvitationCountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewInitialInvitationCountAsc = 'newInitialInvitationCount_ASC',
  NewInitialInvitationCountDesc = 'newInitialInvitationCount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type InitialInvitationCountUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newInitialInvitationCount?: Maybe<Scalars['Float']>;
};

export type InitialInvitationCountUpdatedEventWhereInput = {
  AND?: Maybe<Array<InitialInvitationCountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<InitialInvitationCountUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newInitialInvitationCount_eq?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_gt?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_gte?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_in?: Maybe<Array<Scalars['Int']>>;
  newInitialInvitationCount_lt?: Maybe<Scalars['Int']>;
  newInitialInvitationCount_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<InvalidActionMetadataWhereInput>>;
  OR?: Maybe<Array<InvalidActionMetadataWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  reason_contains?: Maybe<Scalars['String']>;
  reason_endsWith?: Maybe<Scalars['String']>;
  reason_eq?: Maybe<Scalars['String']>;
  reason_in?: Maybe<Array<Scalars['String']>>;
  reason_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type InvalidActionMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type InvitesTransferredEvent = BaseGraphQlObject & Event & {
  __typename: 'InvitesTransferredEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Number of invites transferred. */
  numberOfInvites: Scalars['Int'];
  sourceMember: Membership;
  sourceMemberId: Scalars['String'];
  targetMember: Membership;
  targetMemberId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type InvitesTransferredEventConnection = {
  __typename: 'InvitesTransferredEventConnection';
  edges: Array<InvitesTransferredEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type InvitesTransferredEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  numberOfInvites: Scalars['Float'];
  sourceMember: Scalars['ID'];
  targetMember: Scalars['ID'];
};

export type InvitesTransferredEventEdge = {
  __typename: 'InvitesTransferredEventEdge';
  cursor: Scalars['String'];
  node: InvitesTransferredEvent;
};

export enum InvitesTransferredEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NumberOfInvitesAsc = 'numberOfInvites_ASC',
  NumberOfInvitesDesc = 'numberOfInvites_DESC',
  SourceMemberAsc = 'sourceMember_ASC',
  SourceMemberDesc = 'sourceMember_DESC',
  TargetMemberAsc = 'targetMember_ASC',
  TargetMemberDesc = 'targetMember_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type InvitesTransferredEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  numberOfInvites?: Maybe<Scalars['Float']>;
  sourceMember?: Maybe<Scalars['ID']>;
  targetMember?: Maybe<Scalars['ID']>;
};

export type InvitesTransferredEventWhereInput = {
  AND?: Maybe<Array<InvitesTransferredEventWhereInput>>;
  OR?: Maybe<Array<InvitesTransferredEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  numberOfInvites_eq?: Maybe<Scalars['Int']>;
  numberOfInvites_gt?: Maybe<Scalars['Int']>;
  numberOfInvites_gte?: Maybe<Scalars['Int']>;
  numberOfInvites_in?: Maybe<Array<Scalars['Int']>>;
  numberOfInvites_lt?: Maybe<Scalars['Int']>;
  numberOfInvites_lte?: Maybe<Scalars['Int']>;
  sourceMember?: Maybe<MembershipWhereInput>;
  sourceMember_eq?: Maybe<Scalars['ID']>;
  sourceMember_in?: Maybe<Array<Scalars['ID']>>;
  targetMember?: Maybe<MembershipWhereInput>;
  targetMember_eq?: Maybe<Scalars['ID']>;
  targetMember_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type InvitesTransferredEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Language = BaseGraphQlObject & {
  __typename: 'Language';
  channellanguage?: Maybe<Array<Channel>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Language identifier ISO 639-1 */
  iso: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  videolanguage?: Maybe<Array<Video>>;
};

export type LanguageConnection = {
  __typename: 'LanguageConnection';
  edges: Array<LanguageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LanguageCreateInput = {
  createdInBlock: Scalars['Float'];
  iso: Scalars['String'];
};

export type LanguageEdge = {
  __typename: 'LanguageEdge';
  cursor: Scalars['String'];
  node: Language;
};

export enum LanguageOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  IsoAsc = 'iso_ASC',
  IsoDesc = 'iso_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LanguageUpdateInput = {
  createdInBlock?: Maybe<Scalars['Float']>;
  iso?: Maybe<Scalars['String']>;
};

export type LanguageWhereInput = {
  AND?: Maybe<Array<LanguageWhereInput>>;
  OR?: Maybe<Array<LanguageWhereInput>>;
  channellanguage_every?: Maybe<ChannelWhereInput>;
  channellanguage_none?: Maybe<ChannelWhereInput>;
  channellanguage_some?: Maybe<ChannelWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  iso_contains?: Maybe<Scalars['String']>;
  iso_endsWith?: Maybe<Scalars['String']>;
  iso_eq?: Maybe<Scalars['String']>;
  iso_in?: Maybe<Array<Scalars['String']>>;
  iso_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  videolanguage_every?: Maybe<VideoWhereInput>;
  videolanguage_none?: Maybe<VideoWhereInput>;
  videolanguage_some?: Maybe<VideoWhereInput>;
};

export type LanguageWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderInvitationQuotaUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'LeaderInvitationQuotaUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New quota. */
  newInvitationQuota: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type LeaderInvitationQuotaUpdatedEventConnection = {
  __typename: 'LeaderInvitationQuotaUpdatedEventConnection';
  edges: Array<LeaderInvitationQuotaUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LeaderInvitationQuotaUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newInvitationQuota: Scalars['Float'];
};

export type LeaderInvitationQuotaUpdatedEventEdge = {
  __typename: 'LeaderInvitationQuotaUpdatedEventEdge';
  cursor: Scalars['String'];
  node: LeaderInvitationQuotaUpdatedEvent;
};

export enum LeaderInvitationQuotaUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewInvitationQuotaAsc = 'newInvitationQuota_ASC',
  NewInvitationQuotaDesc = 'newInvitationQuota_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LeaderInvitationQuotaUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newInvitationQuota?: Maybe<Scalars['Float']>;
};

export type LeaderInvitationQuotaUpdatedEventWhereInput = {
  AND?: Maybe<Array<LeaderInvitationQuotaUpdatedEventWhereInput>>;
  OR?: Maybe<Array<LeaderInvitationQuotaUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newInvitationQuota_eq?: Maybe<Scalars['Int']>;
  newInvitationQuota_gt?: Maybe<Scalars['Int']>;
  newInvitationQuota_gte?: Maybe<Scalars['Int']>;
  newInvitationQuota_in?: Maybe<Array<Scalars['Int']>>;
  newInvitationQuota_lt?: Maybe<Scalars['Int']>;
  newInvitationQuota_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type LeaderInvitationQuotaUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderSetEvent = BaseGraphQlObject & Event & {
  __typename: 'LeaderSetEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker?: Maybe<Worker>;
  workerId?: Maybe<Scalars['String']>;
};

export type LeaderSetEventConnection = {
  __typename: 'LeaderSetEventConnection';
  edges: Array<LeaderSetEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LeaderSetEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  worker?: Maybe<Scalars['ID']>;
};

export type LeaderSetEventEdge = {
  __typename: 'LeaderSetEventEdge';
  cursor: Scalars['String'];
  node: LeaderSetEvent;
};

export enum LeaderSetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type LeaderSetEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  worker?: Maybe<Scalars['ID']>;
};

export type LeaderSetEventWhereInput = {
  AND?: Maybe<Array<LeaderSetEventWhereInput>>;
  OR?: Maybe<Array<LeaderSetEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type LeaderSetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type LeaderUnsetEvent = BaseGraphQlObject & Event & {
  __typename: 'LeaderUnsetEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  leader: Worker;
  leaderId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type LeaderUnsetEventConnection = {
  __typename: 'LeaderUnsetEventConnection';
  edges: Array<LeaderUnsetEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LeaderUnsetEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  leader: Scalars['ID'];
  network: Network;
};

export type LeaderUnsetEventEdge = {
  __typename: 'LeaderUnsetEventEdge';
  cursor: Scalars['String'];
  node: LeaderUnsetEvent;
};

export enum LeaderUnsetEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  LeaderAsc = 'leader_ASC',
  LeaderDesc = 'leader_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LeaderUnsetEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  leader?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type LeaderUnsetEventWhereInput = {
  AND?: Maybe<Array<LeaderUnsetEventWhereInput>>;
  OR?: Maybe<Array<LeaderUnsetEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  leader?: Maybe<WorkerWhereInput>;
  leader_eq?: Maybe<Scalars['ID']>;
  leader_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type LeaderUnsetEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum LiaisonJudgement {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING'
}

export type License = BaseGraphQlObject & {
  __typename: 'License';
  /** Attribution (if required by the license) */
  attribution?: Maybe<Scalars['String']>;
  /** License code defined by Joystream */
  code?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** Custom license content */
  customText?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  videolicense?: Maybe<Array<Video>>;
};

export type LicenseConnection = {
  __typename: 'LicenseConnection';
  edges: Array<LicenseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LicenseCreateInput = {
  attribution?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  customText?: Maybe<Scalars['String']>;
};

export type LicenseEdge = {
  __typename: 'LicenseEdge';
  cursor: Scalars['String'];
  node: License;
};

export enum LicenseOrderByInput {
  AttributionAsc = 'attribution_ASC',
  AttributionDesc = 'attribution_DESC',
  CodeAsc = 'code_ASC',
  CodeDesc = 'code_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CustomTextAsc = 'customText_ASC',
  CustomTextDesc = 'customText_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type LicenseUpdateInput = {
  attribution?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  customText?: Maybe<Scalars['String']>;
};

export type LicenseWhereInput = {
  AND?: Maybe<Array<LicenseWhereInput>>;
  OR?: Maybe<Array<LicenseWhereInput>>;
  attribution_contains?: Maybe<Scalars['String']>;
  attribution_endsWith?: Maybe<Scalars['String']>;
  attribution_eq?: Maybe<Scalars['String']>;
  attribution_in?: Maybe<Array<Scalars['String']>>;
  attribution_startsWith?: Maybe<Scalars['String']>;
  code_eq?: Maybe<Scalars['Int']>;
  code_gt?: Maybe<Scalars['Int']>;
  code_gte?: Maybe<Scalars['Int']>;
  code_in?: Maybe<Array<Scalars['Int']>>;
  code_lt?: Maybe<Scalars['Int']>;
  code_lte?: Maybe<Scalars['Int']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  customText_contains?: Maybe<Scalars['String']>;
  customText_endsWith?: Maybe<Scalars['String']>;
  customText_eq?: Maybe<Scalars['String']>;
  customText_in?: Maybe<Array<Scalars['String']>>;
  customText_startsWith?: Maybe<Scalars['String']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  videolicense_every?: Maybe<VideoWhereInput>;
  videolicense_none?: Maybe<VideoWhereInput>;
  videolicense_some?: Maybe<VideoWhereInput>;
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
  AND?: Maybe<Array<LockBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<LockBlogPostProposalDetailsWhereInput>>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type LockBlogPostProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberAccountsUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'MemberAccountsUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** New member controller in SS58 encoding. Null means no new value was provided. */
  newControllerAccount?: Maybe<Scalars['String']>;
  /** New member root account in SS58 encoding. Null means no new value was provided. */
  newRootAccount?: Maybe<Scalars['String']>;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MemberAccountsUpdatedEventConnection = {
  __typename: 'MemberAccountsUpdatedEventConnection';
  edges: Array<MemberAccountsUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MemberAccountsUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
  newControllerAccount?: Maybe<Scalars['String']>;
  newRootAccount?: Maybe<Scalars['String']>;
};

export type MemberAccountsUpdatedEventEdge = {
  __typename: 'MemberAccountsUpdatedEventEdge';
  cursor: Scalars['String'];
  node: MemberAccountsUpdatedEvent;
};

export enum MemberAccountsUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewControllerAccountAsc = 'newControllerAccount_ASC',
  NewControllerAccountDesc = 'newControllerAccount_DESC',
  NewRootAccountAsc = 'newRootAccount_ASC',
  NewRootAccountDesc = 'newRootAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MemberAccountsUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  newControllerAccount?: Maybe<Scalars['String']>;
  newRootAccount?: Maybe<Scalars['String']>;
};

export type MemberAccountsUpdatedEventWhereInput = {
  AND?: Maybe<Array<MemberAccountsUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberAccountsUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newControllerAccount_contains?: Maybe<Scalars['String']>;
  newControllerAccount_endsWith?: Maybe<Scalars['String']>;
  newControllerAccount_eq?: Maybe<Scalars['String']>;
  newControllerAccount_in?: Maybe<Array<Scalars['String']>>;
  newControllerAccount_startsWith?: Maybe<Scalars['String']>;
  newRootAccount_contains?: Maybe<Scalars['String']>;
  newRootAccount_endsWith?: Maybe<Scalars['String']>;
  newRootAccount_eq?: Maybe<Scalars['String']>;
  newRootAccount_in?: Maybe<Array<Scalars['String']>>;
  newRootAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MemberAccountsUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberInvitedEvent = BaseGraphQlObject & Event & {
  __typename: 'MemberInvitedEvent';
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** New member handle. */
  handle: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  invitingMember: Membership;
  invitingMemberId: Scalars['String'];
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  newMember: Membership;
  newMemberId: Scalars['String'];
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MemberInvitedEventConnection = {
  __typename: 'MemberInvitedEventConnection';
  edges: Array<MemberInvitedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MemberInvitedEventCreateInput = {
  controllerAccount: Scalars['String'];
  handle: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  invitingMember: Scalars['ID'];
  metadata: Scalars['ID'];
  network: Network;
  newMember: Scalars['ID'];
  rootAccount: Scalars['String'];
};

export type MemberInvitedEventEdge = {
  __typename: 'MemberInvitedEventEdge';
  cursor: Scalars['String'];
  node: MemberInvitedEvent;
};

export enum MemberInvitedEventOrderByInput {
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  InvitingMemberAsc = 'invitingMember_ASC',
  InvitingMemberDesc = 'invitingMember_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewMemberAsc = 'newMember_ASC',
  NewMemberDesc = 'newMember_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MemberInvitedEventUpdateInput = {
  controllerAccount?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  invitingMember?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  newMember?: Maybe<Scalars['ID']>;
  rootAccount?: Maybe<Scalars['String']>;
};

export type MemberInvitedEventWhereInput = {
  AND?: Maybe<Array<MemberInvitedEventWhereInput>>;
  OR?: Maybe<Array<MemberInvitedEventWhereInput>>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  handle_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  invitingMember?: Maybe<MembershipWhereInput>;
  invitingMember_eq?: Maybe<Scalars['ID']>;
  invitingMember_in?: Maybe<Array<Scalars['ID']>>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newMember?: Maybe<MembershipWhereInput>;
  newMember_eq?: Maybe<Scalars['ID']>;
  newMember_in?: Maybe<Array<Scalars['ID']>>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MemberInvitedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberMetadata = BaseGraphQlObject & {
  __typename: 'MemberMetadata';
  /** Short text chosen by member to share information about themselves */
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<DataObject>;
  avatarId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  memberinvitedeventmetadata?: Maybe<Array<MemberInvitedEvent>>;
  memberprofileupdatedeventnewMetadata?: Maybe<Array<MemberProfileUpdatedEvent>>;
  membershipboughteventmetadata?: Maybe<Array<MembershipBoughtEvent>>;
  membershipmetadata?: Maybe<Array<Membership>>;
  /** Member's name */
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MemberMetadataConnection = {
  __typename: 'MemberMetadataConnection';
  edges: Array<MemberMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MemberMetadataCreateInput = {
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MemberMetadataEdge = {
  __typename: 'MemberMetadataEdge';
  cursor: Scalars['String'];
  node: MemberMetadata;
};

export enum MemberMetadataOrderByInput {
  AboutAsc = 'about_ASC',
  AboutDesc = 'about_DESC',
  AvatarAsc = 'avatar_ASC',
  AvatarDesc = 'avatar_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MemberMetadataUpdateInput = {
  about?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MemberMetadataWhereInput = {
  AND?: Maybe<Array<MemberMetadataWhereInput>>;
  OR?: Maybe<Array<MemberMetadataWhereInput>>;
  about_contains?: Maybe<Scalars['String']>;
  about_endsWith?: Maybe<Scalars['String']>;
  about_eq?: Maybe<Scalars['String']>;
  about_in?: Maybe<Array<Scalars['String']>>;
  about_startsWith?: Maybe<Scalars['String']>;
  avatar?: Maybe<DataObjectWhereInput>;
  avatar_eq?: Maybe<Scalars['ID']>;
  avatar_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  memberinvitedeventmetadata_every?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventmetadata_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventmetadata_some?: Maybe<MemberInvitedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_every?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_none?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventnewMetadata_some?: Maybe<MemberProfileUpdatedEventWhereInput>;
  membershipboughteventmetadata_every?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventmetadata_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventmetadata_some?: Maybe<MembershipBoughtEventWhereInput>;
  membershipmetadata_every?: Maybe<MembershipWhereInput>;
  membershipmetadata_none?: Maybe<MembershipWhereInput>;
  membershipmetadata_some?: Maybe<MembershipWhereInput>;
  name_contains?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_eq?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MemberMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberProfileUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'MemberProfileUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** New member handle. Null means no new value was provided. */
  newHandle?: Maybe<Scalars['String']>;
  newMetadata: MemberMetadata;
  newMetadataId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MemberProfileUpdatedEventConnection = {
  __typename: 'MemberProfileUpdatedEventConnection';
  edges: Array<MemberProfileUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MemberProfileUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
  newHandle?: Maybe<Scalars['String']>;
  newMetadata: Scalars['ID'];
};

export type MemberProfileUpdatedEventEdge = {
  __typename: 'MemberProfileUpdatedEventEdge';
  cursor: Scalars['String'];
  node: MemberProfileUpdatedEvent;
};

export enum MemberProfileUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewHandleAsc = 'newHandle_ASC',
  NewHandleDesc = 'newHandle_DESC',
  NewMetadataAsc = 'newMetadata_ASC',
  NewMetadataDesc = 'newMetadata_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MemberProfileUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  newHandle?: Maybe<Scalars['String']>;
  newMetadata?: Maybe<Scalars['ID']>;
};

export type MemberProfileUpdatedEventWhereInput = {
  AND?: Maybe<Array<MemberProfileUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberProfileUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newHandle_contains?: Maybe<Scalars['String']>;
  newHandle_endsWith?: Maybe<Scalars['String']>;
  newHandle_eq?: Maybe<Scalars['String']>;
  newHandle_in?: Maybe<Array<Scalars['String']>>;
  newHandle_startsWith?: Maybe<Scalars['String']>;
  newMetadata?: Maybe<MemberMetadataWhereInput>;
  newMetadata_eq?: Maybe<Scalars['ID']>;
  newMetadata_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MemberProfileUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MemberVerificationStatusUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'MemberVerificationStatusUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** New status. */
  isVerified: Scalars['Boolean'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type MemberVerificationStatusUpdatedEventConnection = {
  __typename: 'MemberVerificationStatusUpdatedEventConnection';
  edges: Array<MemberVerificationStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MemberVerificationStatusUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  isVerified: Scalars['Boolean'];
  member: Scalars['ID'];
  network: Network;
  worker: Scalars['ID'];
};

export type MemberVerificationStatusUpdatedEventEdge = {
  __typename: 'MemberVerificationStatusUpdatedEventEdge';
  cursor: Scalars['String'];
  node: MemberVerificationStatusUpdatedEvent;
};

export enum MemberVerificationStatusUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  IsVerifiedAsc = 'isVerified_ASC',
  IsVerifiedDesc = 'isVerified_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type MemberVerificationStatusUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  worker?: Maybe<Scalars['ID']>;
};

export type MemberVerificationStatusUpdatedEventWhereInput = {
  AND?: Maybe<Array<MemberVerificationStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MemberVerificationStatusUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  isVerified_eq?: Maybe<Scalars['Boolean']>;
  isVerified_in?: Maybe<Array<Scalars['Boolean']>>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type MemberVerificationStatusUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembersByHandleFtsOutput = {
  __typename: 'MembersByHandleFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: MembersByHandleSearchResult;
  rank: Scalars['Float'];
};

export type MembersByHandleSearchResult = Membership;

/** Stored information about a registered user */
export type Membership = BaseGraphQlObject & {
  __typename: 'Membership';
  /** Staking accounts bounded to membership. */
  boundAccounts: Array<Scalars['String']>;
  candidacynoteseteventmember?: Maybe<Array<CandidacyNoteSetEvent>>;
  candidacystakereleaseeventmember?: Maybe<Array<CandidacyStakeReleaseEvent>>;
  candidacywithdraweventmember?: Maybe<Array<CandidacyWithdrawEvent>>;
  candidatemember?: Maybe<Array<Candidate>>;
  channels: Array<Channel>;
  /** Member's controller account id */
  controllerAccount: Scalars['String'];
  councilMembers: Array<CouncilMember>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electedCouncilEvents: Array<NewCouncilElectedEvent>;
  /** How the member was registered */
  entry: MembershipEntryMethod;
  forumpostauthor?: Maybe<Array<ForumPost>>;
  forumpostreactionmember?: Maybe<Array<ForumPostReaction>>;
  forumthreadauthor?: Maybe<Array<ForumThread>>;
  /** The unique handle chosen by member */
  handle: Scalars['String'];
  id: Scalars['ID'];
  /** Current count of invites left to send. */
  inviteCount: Scalars['Int'];
  invitedBy?: Maybe<Membership>;
  invitedById?: Maybe<Scalars['String']>;
  invitees: Array<Membership>;
  invitestransferredeventsourceMember?: Maybe<Array<InvitesTransferredEvent>>;
  invitestransferredeventtargetMember?: Maybe<Array<InvitesTransferredEvent>>;
  /** Whether member is elected in the current council. */
  isCouncilMember: Scalars['Boolean'];
  /** Whether member is founding member. */
  isFoundingMember: Scalars['Boolean'];
  /** Whether member has been verified by membership working group. */
  isVerified: Scalars['Boolean'];
  memberaccountsupdatedeventmember?: Maybe<Array<MemberAccountsUpdatedEvent>>;
  memberinvitedeventinvitingMember?: Maybe<Array<MemberInvitedEvent>>;
  memberinvitedeventnewMember?: Maybe<Array<MemberInvitedEvent>>;
  memberprofileupdatedeventmember?: Maybe<Array<MemberProfileUpdatedEvent>>;
  membershipboughteventnewMember?: Maybe<Array<MembershipBoughtEvent>>;
  membershipboughteventreferrer?: Maybe<Array<MembershipBoughtEvent>>;
  memberverificationstatusupdatedeventmember?: Maybe<Array<MemberVerificationStatusUpdatedEvent>>;
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
  newcandidateeventmember?: Maybe<Array<NewCandidateEvent>>;
  postdeletedeventactor?: Maybe<Array<PostDeletedEvent>>;
  postreactedeventreactingMember?: Maybe<Array<PostReactedEvent>>;
  proposalcreator?: Maybe<Array<Proposal>>;
  proposaldiscussionpostauthor?: Maybe<Array<ProposalDiscussionPost>>;
  proposaldiscussionpostdeletedeventactor?: Maybe<Array<ProposalDiscussionPostDeletedEvent>>;
  proposaldiscussionthreadmodechangedeventactor?: Maybe<Array<ProposalDiscussionThreadModeChangedEvent>>;
  proposalvotedeventvoter?: Maybe<Array<ProposalVotedEvent>>;
  referendumStageRevealingOptionResults: Array<ReferendumStageRevealingOptionResult>;
  referredBy?: Maybe<Membership>;
  referredById?: Maybe<Scalars['String']>;
  referredMembers: Array<Membership>;
  rewardpaymenteventmember?: Maybe<Array<RewardPaymentEvent>>;
  roles: Array<Worker>;
  /** Member's root account id */
  rootAccount: Scalars['String'];
  stakingaccountaddedeventmember?: Maybe<Array<StakingAccountAddedEvent>>;
  stakingaccountconfirmedeventmember?: Maybe<Array<StakingAccountConfirmedEvent>>;
  stakingaccountremovedeventmember?: Maybe<Array<StakingAccountRemovedEvent>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  voteonpolleventvotingMember?: Maybe<Array<VoteOnPollEvent>>;
  voterevealedeventmember?: Maybe<Array<VoteRevealedEvent>>;
  votesRecieved: Array<CastVote>;
  whitelistedIn: Array<ProposalDiscussionWhitelist>;
  workinggroupapplicationapplicant?: Maybe<Array<WorkingGroupApplication>>;
};

export type MembershipBoughtEvent = BaseGraphQlObject & Event & {
  __typename: 'MembershipBoughtEvent';
  /** New member controller in SS58 encoding. */
  controllerAccount: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** New member handle. */
  handle: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  metadata: MemberMetadata;
  metadataId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  newMember: Membership;
  newMemberId: Scalars['String'];
  referrer?: Maybe<Membership>;
  referrerId?: Maybe<Scalars['String']>;
  /** New member root account in SS58 encoding. */
  rootAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MembershipBoughtEventConnection = {
  __typename: 'MembershipBoughtEventConnection';
  edges: Array<MembershipBoughtEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MembershipBoughtEventCreateInput = {
  controllerAccount: Scalars['String'];
  handle: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  metadata: Scalars['ID'];
  network: Network;
  newMember: Scalars['ID'];
  referrer?: Maybe<Scalars['ID']>;
  rootAccount: Scalars['String'];
};

export type MembershipBoughtEventEdge = {
  __typename: 'MembershipBoughtEventEdge';
  cursor: Scalars['String'];
  node: MembershipBoughtEvent;
};

export enum MembershipBoughtEventOrderByInput {
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewMemberAsc = 'newMember_ASC',
  NewMemberDesc = 'newMember_DESC',
  ReferrerAsc = 'referrer_ASC',
  ReferrerDesc = 'referrer_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MembershipBoughtEventUpdateInput = {
  controllerAccount?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  metadata?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  newMember?: Maybe<Scalars['ID']>;
  referrer?: Maybe<Scalars['ID']>;
  rootAccount?: Maybe<Scalars['String']>;
};

export type MembershipBoughtEventWhereInput = {
  AND?: Maybe<Array<MembershipBoughtEventWhereInput>>;
  OR?: Maybe<Array<MembershipBoughtEventWhereInput>>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  handle_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newMember?: Maybe<MembershipWhereInput>;
  newMember_eq?: Maybe<Scalars['ID']>;
  newMember_in?: Maybe<Array<Scalars['ID']>>;
  referrer?: Maybe<MembershipWhereInput>;
  referrer_eq?: Maybe<Scalars['ID']>;
  referrer_in?: Maybe<Array<Scalars['ID']>>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MembershipBoughtEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipConnection = {
  __typename: 'MembershipConnection';
  edges: Array<MembershipEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MembershipCreateInput = {
  boundAccounts: Array<Scalars['String']>;
  controllerAccount: Scalars['String'];
  entry: Scalars['JSONObject'];
  handle: Scalars['String'];
  inviteCount: Scalars['Float'];
  invitedBy?: Maybe<Scalars['ID']>;
  isCouncilMember: Scalars['Boolean'];
  isFoundingMember: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  metadata: Scalars['ID'];
  referredBy?: Maybe<Scalars['ID']>;
  rootAccount: Scalars['String'];
};

export type MembershipEdge = {
  __typename: 'MembershipEdge';
  cursor: Scalars['String'];
  node: Membership;
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
  AND?: Maybe<Array<MembershipEntryGenesisWhereInput>>;
  OR?: Maybe<Array<MembershipEntryGenesisWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MembershipEntryGenesisWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipEntryInvited = {
  __typename: 'MembershipEntryInvited';
  /** The event the member was invited in */
  memberInvitedEvent?: Maybe<MemberInvitedEvent>;
};

export type MembershipEntryMethod = MembershipEntryGenesis | MembershipEntryInvited | MembershipEntryPaid;

export type MembershipEntryPaid = {
  __typename: 'MembershipEntryPaid';
  /** The event the membership was bought in */
  membershipBoughtEvent?: Maybe<MembershipBoughtEvent>;
};

export enum MembershipOrderByInput {
  ControllerAccountAsc = 'controllerAccount_ASC',
  ControllerAccountDesc = 'controllerAccount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  InviteCountAsc = 'inviteCount_ASC',
  InviteCountDesc = 'inviteCount_DESC',
  InvitedByAsc = 'invitedBy_ASC',
  InvitedByDesc = 'invitedBy_DESC',
  IsCouncilMemberAsc = 'isCouncilMember_ASC',
  IsCouncilMemberDesc = 'isCouncilMember_DESC',
  IsFoundingMemberAsc = 'isFoundingMember_ASC',
  IsFoundingMemberDesc = 'isFoundingMember_DESC',
  IsVerifiedAsc = 'isVerified_ASC',
  IsVerifiedDesc = 'isVerified_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  ReferredByAsc = 'referredBy_ASC',
  ReferredByDesc = 'referredBy_DESC',
  RootAccountAsc = 'rootAccount_ASC',
  RootAccountDesc = 'rootAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MembershipPriceUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'MembershipPriceUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** The new membership price. */
  newPrice: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MembershipPriceUpdatedEventConnection = {
  __typename: 'MembershipPriceUpdatedEventConnection';
  edges: Array<MembershipPriceUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MembershipPriceUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newPrice: Scalars['BigInt'];
};

export type MembershipPriceUpdatedEventEdge = {
  __typename: 'MembershipPriceUpdatedEventEdge';
  cursor: Scalars['String'];
  node: MembershipPriceUpdatedEvent;
};

export enum MembershipPriceUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewPriceAsc = 'newPrice_ASC',
  NewPriceDesc = 'newPrice_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MembershipPriceUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newPrice?: Maybe<Scalars['BigInt']>;
};

export type MembershipPriceUpdatedEventWhereInput = {
  AND?: Maybe<Array<MembershipPriceUpdatedEventWhereInput>>;
  OR?: Maybe<Array<MembershipPriceUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newPrice_eq?: Maybe<Scalars['BigInt']>;
  newPrice_gt?: Maybe<Scalars['BigInt']>;
  newPrice_gte?: Maybe<Scalars['BigInt']>;
  newPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  newPrice_lt?: Maybe<Scalars['BigInt']>;
  newPrice_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MembershipPriceUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipSystemSnapshot = BaseGraphQlObject & {
  __typename: 'MembershipSystemSnapshot';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** Initial invitation count of a new member. */
  defaultInviteCount: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The initial, locked, balance credited to controller account of invitee. */
  invitedInitialBalance: Scalars['BigInt'];
  /** Current price to buy a membership. */
  membershipPrice: Scalars['BigInt'];
  /** Percentage of tokens diverted to invitor. */
  referralCut: Scalars['Int'];
  /** The snapshot block number */
  snapshotBlock: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type MembershipSystemSnapshotConnection = {
  __typename: 'MembershipSystemSnapshotConnection';
  edges: Array<MembershipSystemSnapshotEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MembershipSystemSnapshotCreateInput = {
  defaultInviteCount: Scalars['Float'];
  invitedInitialBalance: Scalars['BigInt'];
  membershipPrice: Scalars['BigInt'];
  referralCut: Scalars['Float'];
  snapshotBlock: Scalars['Float'];
};

export type MembershipSystemSnapshotEdge = {
  __typename: 'MembershipSystemSnapshotEdge';
  cursor: Scalars['String'];
  node: MembershipSystemSnapshot;
};

export enum MembershipSystemSnapshotOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DefaultInviteCountAsc = 'defaultInviteCount_ASC',
  DefaultInviteCountDesc = 'defaultInviteCount_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InvitedInitialBalanceAsc = 'invitedInitialBalance_ASC',
  InvitedInitialBalanceDesc = 'invitedInitialBalance_DESC',
  MembershipPriceAsc = 'membershipPrice_ASC',
  MembershipPriceDesc = 'membershipPrice_DESC',
  ReferralCutAsc = 'referralCut_ASC',
  ReferralCutDesc = 'referralCut_DESC',
  SnapshotBlockAsc = 'snapshotBlock_ASC',
  SnapshotBlockDesc = 'snapshotBlock_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type MembershipSystemSnapshotUpdateInput = {
  defaultInviteCount?: Maybe<Scalars['Float']>;
  invitedInitialBalance?: Maybe<Scalars['BigInt']>;
  membershipPrice?: Maybe<Scalars['BigInt']>;
  referralCut?: Maybe<Scalars['Float']>;
  snapshotBlock?: Maybe<Scalars['Float']>;
};

export type MembershipSystemSnapshotWhereInput = {
  AND?: Maybe<Array<MembershipSystemSnapshotWhereInput>>;
  OR?: Maybe<Array<MembershipSystemSnapshotWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  defaultInviteCount_eq?: Maybe<Scalars['Int']>;
  defaultInviteCount_gt?: Maybe<Scalars['Int']>;
  defaultInviteCount_gte?: Maybe<Scalars['Int']>;
  defaultInviteCount_in?: Maybe<Array<Scalars['Int']>>;
  defaultInviteCount_lt?: Maybe<Scalars['Int']>;
  defaultInviteCount_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  invitedInitialBalance_eq?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_gt?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_gte?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  invitedInitialBalance_lt?: Maybe<Scalars['BigInt']>;
  invitedInitialBalance_lte?: Maybe<Scalars['BigInt']>;
  membershipPrice_eq?: Maybe<Scalars['BigInt']>;
  membershipPrice_gt?: Maybe<Scalars['BigInt']>;
  membershipPrice_gte?: Maybe<Scalars['BigInt']>;
  membershipPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  membershipPrice_lt?: Maybe<Scalars['BigInt']>;
  membershipPrice_lte?: Maybe<Scalars['BigInt']>;
  referralCut_eq?: Maybe<Scalars['Int']>;
  referralCut_gt?: Maybe<Scalars['Int']>;
  referralCut_gte?: Maybe<Scalars['Int']>;
  referralCut_in?: Maybe<Array<Scalars['Int']>>;
  referralCut_lt?: Maybe<Scalars['Int']>;
  referralCut_lte?: Maybe<Scalars['Int']>;
  snapshotBlock_eq?: Maybe<Scalars['Int']>;
  snapshotBlock_gt?: Maybe<Scalars['Int']>;
  snapshotBlock_gte?: Maybe<Scalars['Int']>;
  snapshotBlock_in?: Maybe<Array<Scalars['Int']>>;
  snapshotBlock_lt?: Maybe<Scalars['Int']>;
  snapshotBlock_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type MembershipSystemSnapshotWhereUniqueInput = {
  id: Scalars['ID'];
};

export type MembershipUpdateInput = {
  boundAccounts?: Maybe<Array<Scalars['String']>>;
  controllerAccount?: Maybe<Scalars['String']>;
  entry?: Maybe<Scalars['JSONObject']>;
  handle?: Maybe<Scalars['String']>;
  inviteCount?: Maybe<Scalars['Float']>;
  invitedBy?: Maybe<Scalars['ID']>;
  isCouncilMember?: Maybe<Scalars['Boolean']>;
  isFoundingMember?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['ID']>;
  referredBy?: Maybe<Scalars['ID']>;
  rootAccount?: Maybe<Scalars['String']>;
};

export type MembershipWhereInput = {
  AND?: Maybe<Array<MembershipWhereInput>>;
  OR?: Maybe<Array<MembershipWhereInput>>;
  candidacynoteseteventmember_every?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventmember_none?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacynoteseteventmember_some?: Maybe<CandidacyNoteSetEventWhereInput>;
  candidacystakereleaseeventmember_every?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacystakereleaseeventmember_none?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacystakereleaseeventmember_some?: Maybe<CandidacyStakeReleaseEventWhereInput>;
  candidacywithdraweventmember_every?: Maybe<CandidacyWithdrawEventWhereInput>;
  candidacywithdraweventmember_none?: Maybe<CandidacyWithdrawEventWhereInput>;
  candidacywithdraweventmember_some?: Maybe<CandidacyWithdrawEventWhereInput>;
  candidatemember_every?: Maybe<CandidateWhereInput>;
  candidatemember_none?: Maybe<CandidateWhereInput>;
  candidatemember_some?: Maybe<CandidateWhereInput>;
  channels_every?: Maybe<ChannelWhereInput>;
  channels_none?: Maybe<ChannelWhereInput>;
  channels_some?: Maybe<ChannelWhereInput>;
  controllerAccount_contains?: Maybe<Scalars['String']>;
  controllerAccount_endsWith?: Maybe<Scalars['String']>;
  controllerAccount_eq?: Maybe<Scalars['String']>;
  controllerAccount_in?: Maybe<Array<Scalars['String']>>;
  controllerAccount_startsWith?: Maybe<Scalars['String']>;
  councilMembers_every?: Maybe<CouncilMemberWhereInput>;
  councilMembers_none?: Maybe<CouncilMemberWhereInput>;
  councilMembers_some?: Maybe<CouncilMemberWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedCouncilEvents_every?: Maybe<NewCouncilElectedEventWhereInput>;
  electedCouncilEvents_none?: Maybe<NewCouncilElectedEventWhereInput>;
  electedCouncilEvents_some?: Maybe<NewCouncilElectedEventWhereInput>;
  entry_json?: Maybe<Scalars['JSONObject']>;
  forumpostauthor_every?: Maybe<ForumPostWhereInput>;
  forumpostauthor_none?: Maybe<ForumPostWhereInput>;
  forumpostauthor_some?: Maybe<ForumPostWhereInput>;
  forumpostreactionmember_every?: Maybe<ForumPostReactionWhereInput>;
  forumpostreactionmember_none?: Maybe<ForumPostReactionWhereInput>;
  forumpostreactionmember_some?: Maybe<ForumPostReactionWhereInput>;
  forumthreadauthor_every?: Maybe<ForumThreadWhereInput>;
  forumthreadauthor_none?: Maybe<ForumThreadWhereInput>;
  forumthreadauthor_some?: Maybe<ForumThreadWhereInput>;
  handle_contains?: Maybe<Scalars['String']>;
  handle_endsWith?: Maybe<Scalars['String']>;
  handle_eq?: Maybe<Scalars['String']>;
  handle_in?: Maybe<Array<Scalars['String']>>;
  handle_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inviteCount_eq?: Maybe<Scalars['Int']>;
  inviteCount_gt?: Maybe<Scalars['Int']>;
  inviteCount_gte?: Maybe<Scalars['Int']>;
  inviteCount_in?: Maybe<Array<Scalars['Int']>>;
  inviteCount_lt?: Maybe<Scalars['Int']>;
  inviteCount_lte?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<MembershipWhereInput>;
  invitedBy_eq?: Maybe<Scalars['ID']>;
  invitedBy_in?: Maybe<Array<Scalars['ID']>>;
  invitees_every?: Maybe<MembershipWhereInput>;
  invitees_none?: Maybe<MembershipWhereInput>;
  invitees_some?: Maybe<MembershipWhereInput>;
  invitestransferredeventsourceMember_every?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventsourceMember_none?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventsourceMember_some?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_every?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_none?: Maybe<InvitesTransferredEventWhereInput>;
  invitestransferredeventtargetMember_some?: Maybe<InvitesTransferredEventWhereInput>;
  isCouncilMember_eq?: Maybe<Scalars['Boolean']>;
  isCouncilMember_in?: Maybe<Array<Scalars['Boolean']>>;
  isFoundingMember_eq?: Maybe<Scalars['Boolean']>;
  isFoundingMember_in?: Maybe<Array<Scalars['Boolean']>>;
  isVerified_eq?: Maybe<Scalars['Boolean']>;
  isVerified_in?: Maybe<Array<Scalars['Boolean']>>;
  memberaccountsupdatedeventmember_every?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberaccountsupdatedeventmember_none?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberaccountsupdatedeventmember_some?: Maybe<MemberAccountsUpdatedEventWhereInput>;
  memberinvitedeventinvitingMember_every?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventinvitingMember_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventinvitingMember_some?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_every?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_none?: Maybe<MemberInvitedEventWhereInput>;
  memberinvitedeventnewMember_some?: Maybe<MemberInvitedEventWhereInput>;
  memberprofileupdatedeventmember_every?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventmember_none?: Maybe<MemberProfileUpdatedEventWhereInput>;
  memberprofileupdatedeventmember_some?: Maybe<MemberProfileUpdatedEventWhereInput>;
  membershipboughteventnewMember_every?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventnewMember_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventnewMember_some?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_every?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_none?: Maybe<MembershipBoughtEventWhereInput>;
  membershipboughteventreferrer_some?: Maybe<MembershipBoughtEventWhereInput>;
  memberverificationstatusupdatedeventmember_every?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventmember_none?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventmember_some?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  metadata?: Maybe<MemberMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  newcandidateeventmember_every?: Maybe<NewCandidateEventWhereInput>;
  newcandidateeventmember_none?: Maybe<NewCandidateEventWhereInput>;
  newcandidateeventmember_some?: Maybe<NewCandidateEventWhereInput>;
  postdeletedeventactor_every?: Maybe<PostDeletedEventWhereInput>;
  postdeletedeventactor_none?: Maybe<PostDeletedEventWhereInput>;
  postdeletedeventactor_some?: Maybe<PostDeletedEventWhereInput>;
  postreactedeventreactingMember_every?: Maybe<PostReactedEventWhereInput>;
  postreactedeventreactingMember_none?: Maybe<PostReactedEventWhereInput>;
  postreactedeventreactingMember_some?: Maybe<PostReactedEventWhereInput>;
  proposalcreator_every?: Maybe<ProposalWhereInput>;
  proposalcreator_none?: Maybe<ProposalWhereInput>;
  proposalcreator_some?: Maybe<ProposalWhereInput>;
  proposaldiscussionpostauthor_every?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostauthor_none?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostauthor_some?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostdeletedeventactor_every?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventactor_none?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventactor_some?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_every?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_none?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposaldiscussionthreadmodechangedeventactor_some?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  proposalvotedeventvoter_every?: Maybe<ProposalVotedEventWhereInput>;
  proposalvotedeventvoter_none?: Maybe<ProposalVotedEventWhereInput>;
  proposalvotedeventvoter_some?: Maybe<ProposalVotedEventWhereInput>;
  referendumStageRevealingOptionResults_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumStageRevealingOptionResults_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referendumStageRevealingOptionResults_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  referredBy?: Maybe<MembershipWhereInput>;
  referredBy_eq?: Maybe<Scalars['ID']>;
  referredBy_in?: Maybe<Array<Scalars['ID']>>;
  referredMembers_every?: Maybe<MembershipWhereInput>;
  referredMembers_none?: Maybe<MembershipWhereInput>;
  referredMembers_some?: Maybe<MembershipWhereInput>;
  rewardpaymenteventmember_every?: Maybe<RewardPaymentEventWhereInput>;
  rewardpaymenteventmember_none?: Maybe<RewardPaymentEventWhereInput>;
  rewardpaymenteventmember_some?: Maybe<RewardPaymentEventWhereInput>;
  roles_every?: Maybe<WorkerWhereInput>;
  roles_none?: Maybe<WorkerWhereInput>;
  roles_some?: Maybe<WorkerWhereInput>;
  rootAccount_contains?: Maybe<Scalars['String']>;
  rootAccount_endsWith?: Maybe<Scalars['String']>;
  rootAccount_eq?: Maybe<Scalars['String']>;
  rootAccount_in?: Maybe<Array<Scalars['String']>>;
  rootAccount_startsWith?: Maybe<Scalars['String']>;
  stakingaccountaddedeventmember_every?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountaddedeventmember_none?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountaddedeventmember_some?: Maybe<StakingAccountAddedEventWhereInput>;
  stakingaccountconfirmedeventmember_every?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountconfirmedeventmember_none?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountconfirmedeventmember_some?: Maybe<StakingAccountConfirmedEventWhereInput>;
  stakingaccountremovedeventmember_every?: Maybe<StakingAccountRemovedEventWhereInput>;
  stakingaccountremovedeventmember_none?: Maybe<StakingAccountRemovedEventWhereInput>;
  stakingaccountremovedeventmember_some?: Maybe<StakingAccountRemovedEventWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  voteonpolleventvotingMember_every?: Maybe<VoteOnPollEventWhereInput>;
  voteonpolleventvotingMember_none?: Maybe<VoteOnPollEventWhereInput>;
  voteonpolleventvotingMember_some?: Maybe<VoteOnPollEventWhereInput>;
  voterevealedeventmember_every?: Maybe<VoteRevealedEventWhereInput>;
  voterevealedeventmember_none?: Maybe<VoteRevealedEventWhereInput>;
  voterevealedeventmember_some?: Maybe<VoteRevealedEventWhereInput>;
  votesRecieved_every?: Maybe<CastVoteWhereInput>;
  votesRecieved_none?: Maybe<CastVoteWhereInput>;
  votesRecieved_some?: Maybe<CastVoteWhereInput>;
  whitelistedIn_every?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  whitelistedIn_none?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  whitelistedIn_some?: Maybe<ProposalDiscussionWhitelistWhereInput>;
  workinggroupapplicationapplicant_every?: Maybe<WorkingGroupApplicationWhereInput>;
  workinggroupapplicationapplicant_none?: Maybe<WorkingGroupApplicationWhereInput>;
  workinggroupapplicationapplicant_some?: Maybe<WorkingGroupApplicationWhereInput>;
};

export type MembershipWhereUniqueInput = {
  handle?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export enum Network {
  Alexandria = 'ALEXANDRIA',
  Babylon = 'BABYLON',
  Olympia = 'OLYMPIA',
  Rome = 'ROME'
}

export type NewCandidateEvent = BaseGraphQlObject & Event & {
  __typename: 'NewCandidateEvent';
  /** Amount of currency to be staked for the candidacy. */
  balance: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Candidate's account that will be recieving rewards if candidate's elected. */
  rewardAccount: Scalars['String'];
  /** Candidate's account used to stake currency. */
  stakingAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type NewCandidateEventConnection = {
  __typename: 'NewCandidateEventConnection';
  edges: Array<NewCandidateEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NewCandidateEventCreateInput = {
  balance: Scalars['BigInt'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
  rewardAccount: Scalars['String'];
  stakingAccount: Scalars['String'];
};

export type NewCandidateEventEdge = {
  __typename: 'NewCandidateEventEdge';
  cursor: Scalars['String'];
  node: NewCandidateEvent;
};

export enum NewCandidateEventOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceDesc = 'balance_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NewCandidateEventUpdateInput = {
  balance?: Maybe<Scalars['BigInt']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  rewardAccount?: Maybe<Scalars['String']>;
  stakingAccount?: Maybe<Scalars['String']>;
};

export type NewCandidateEventWhereInput = {
  AND?: Maybe<Array<NewCandidateEventWhereInput>>;
  OR?: Maybe<Array<NewCandidateEventWhereInput>>;
  balance_eq?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type NewCandidateEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewCouncilElectedEvent = BaseGraphQlObject & Event & {
  __typename: 'NewCouncilElectedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electedMembers: Array<Membership>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type NewCouncilElectedEventConnection = {
  __typename: 'NewCouncilElectedEventConnection';
  edges: Array<NewCouncilElectedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NewCouncilElectedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type NewCouncilElectedEventEdge = {
  __typename: 'NewCouncilElectedEventEdge';
  cursor: Scalars['String'];
  node: NewCouncilElectedEvent;
};

export enum NewCouncilElectedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NewCouncilElectedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type NewCouncilElectedEventWhereInput = {
  AND?: Maybe<Array<NewCouncilElectedEventWhereInput>>;
  OR?: Maybe<Array<NewCouncilElectedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electedMembers_every?: Maybe<MembershipWhereInput>;
  electedMembers_none?: Maybe<MembershipWhereInput>;
  electedMembers_some?: Maybe<MembershipWhereInput>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type NewCouncilElectedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewCouncilNotElectedEvent = BaseGraphQlObject & Event & {
  __typename: 'NewCouncilNotElectedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type NewCouncilNotElectedEventConnection = {
  __typename: 'NewCouncilNotElectedEventConnection';
  edges: Array<NewCouncilNotElectedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NewCouncilNotElectedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type NewCouncilNotElectedEventEdge = {
  __typename: 'NewCouncilNotElectedEventEdge';
  cursor: Scalars['String'];
  node: NewCouncilNotElectedEvent;
};

export enum NewCouncilNotElectedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NewCouncilNotElectedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type NewCouncilNotElectedEventWhereInput = {
  AND?: Maybe<Array<NewCouncilNotElectedEventWhereInput>>;
  OR?: Maybe<Array<NewCouncilNotElectedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type NewCouncilNotElectedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NewMissedRewardLevelReachedEvent = BaseGraphQlObject & Event & {
  __typename: 'NewMissedRewardLevelReachedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New missed reward amount */
  newMissedRewardAmount: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type NewMissedRewardLevelReachedEventConnection = {
  __typename: 'NewMissedRewardLevelReachedEventConnection';
  edges: Array<NewMissedRewardLevelReachedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NewMissedRewardLevelReachedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newMissedRewardAmount: Scalars['BigInt'];
  worker: Scalars['ID'];
};

export type NewMissedRewardLevelReachedEventEdge = {
  __typename: 'NewMissedRewardLevelReachedEventEdge';
  cursor: Scalars['String'];
  node: NewMissedRewardLevelReachedEvent;
};

export enum NewMissedRewardLevelReachedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewMissedRewardAmountAsc = 'newMissedRewardAmount_ASC',
  NewMissedRewardAmountDesc = 'newMissedRewardAmount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type NewMissedRewardLevelReachedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newMissedRewardAmount?: Maybe<Scalars['BigInt']>;
  worker?: Maybe<Scalars['ID']>;
};

export type NewMissedRewardLevelReachedEventWhereInput = {
  AND?: Maybe<Array<NewMissedRewardLevelReachedEventWhereInput>>;
  OR?: Maybe<Array<NewMissedRewardLevelReachedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newMissedRewardAmount_eq?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_gt?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_gte?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  newMissedRewardAmount_lt?: Maybe<Scalars['BigInt']>;
  newMissedRewardAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type NewMissedRewardLevelReachedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type NotEnoughCandidatesEvent = BaseGraphQlObject & Event & {
  __typename: 'NotEnoughCandidatesEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type NotEnoughCandidatesEventConnection = {
  __typename: 'NotEnoughCandidatesEventConnection';
  edges: Array<NotEnoughCandidatesEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotEnoughCandidatesEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type NotEnoughCandidatesEventEdge = {
  __typename: 'NotEnoughCandidatesEventEdge';
  cursor: Scalars['String'];
  node: NotEnoughCandidatesEvent;
};

export enum NotEnoughCandidatesEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type NotEnoughCandidatesEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type NotEnoughCandidatesEventWhereInput = {
  AND?: Maybe<Array<NotEnoughCandidatesEventWhereInput>>;
  OR?: Maybe<Array<NotEnoughCandidatesEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type NotEnoughCandidatesEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningAddedEvent = BaseGraphQlObject & Event & {
  __typename: 'OpeningAddedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type OpeningAddedEventConnection = {
  __typename: 'OpeningAddedEventConnection';
  edges: Array<OpeningAddedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OpeningAddedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  opening: Scalars['ID'];
};

export type OpeningAddedEventEdge = {
  __typename: 'OpeningAddedEventEdge';
  cursor: Scalars['String'];
  node: OpeningAddedEvent;
};

export enum OpeningAddedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OpeningAddedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningAddedEventWhereInput = {
  AND?: Maybe<Array<OpeningAddedEventWhereInput>>;
  OR?: Maybe<Array<OpeningAddedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type OpeningAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningCanceledEvent = BaseGraphQlObject & Event & {
  __typename: 'OpeningCanceledEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type OpeningCanceledEventConnection = {
  __typename: 'OpeningCanceledEventConnection';
  edges: Array<OpeningCanceledEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OpeningCanceledEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  opening: Scalars['ID'];
};

export type OpeningCanceledEventEdge = {
  __typename: 'OpeningCanceledEventEdge';
  cursor: Scalars['String'];
  node: OpeningCanceledEvent;
};

export enum OpeningCanceledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OpeningCanceledEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningCanceledEventWhereInput = {
  AND?: Maybe<Array<OpeningCanceledEventWhereInput>>;
  OR?: Maybe<Array<OpeningCanceledEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type OpeningCanceledEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type OpeningFilledEvent = BaseGraphQlObject & Event & {
  __typename: 'OpeningFilledEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workersHired: Array<Worker>;
};

export type OpeningFilledEventConnection = {
  __typename: 'OpeningFilledEventConnection';
  edges: Array<OpeningFilledEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OpeningFilledEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  opening: Scalars['ID'];
};

export type OpeningFilledEventEdge = {
  __typename: 'OpeningFilledEventEdge';
  cursor: Scalars['String'];
  node: OpeningFilledEvent;
};

export enum OpeningFilledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type OpeningFilledEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  opening?: Maybe<Scalars['ID']>;
};

export type OpeningFilledEventWhereInput = {
  AND?: Maybe<Array<OpeningFilledEventWhereInput>>;
  OR?: Maybe<Array<OpeningFilledEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workersHired_every?: Maybe<WorkerWhereInput>;
  workersHired_none?: Maybe<WorkerWhereInput>;
  workersHired_some?: Maybe<WorkerWhereInput>;
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
  AND?: Maybe<Array<OpeningStatusOpenWhereInput>>;
  OR?: Maybe<Array<OpeningStatusOpenWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type OpeningStatusOpenWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PostAddedEvent = BaseGraphQlObject & {
  __typename: 'PostAddedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Whether the added post is editable */
  isEditable?: Maybe<Scalars['Boolean']>;
  /** Network the block was produced in */
  network: Network;
  post: ForumPost;
  postId: Scalars['String'];
  /** Post's original text */
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type PostAddedEventConnection = {
  __typename: 'PostAddedEventConnection';
  edges: Array<PostAddedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostAddedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  isEditable?: Maybe<Scalars['Boolean']>;
  network: Network;
  post: Scalars['ID'];
  text: Scalars['String'];
};

export type PostAddedEventEdge = {
  __typename: 'PostAddedEventEdge';
  cursor: Scalars['String'];
  node: PostAddedEvent;
};

export enum PostAddedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  IsEditableAsc = 'isEditable_ASC',
  IsEditableDesc = 'isEditable_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PostAddedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  isEditable?: Maybe<Scalars['Boolean']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type PostAddedEventWhereInput = {
  AND?: Maybe<Array<PostAddedEventWhereInput>>;
  OR?: Maybe<Array<PostAddedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  isEditable_eq?: Maybe<Scalars['Boolean']>;
  isEditable_in?: Maybe<Array<Scalars['Boolean']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ForumPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type PostAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostDeletedEvent = BaseGraphQlObject & {
  __typename: 'PostDeletedEvent';
  actor: Membership;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  posts: Array<ForumPost>;
  /** Posts deletion rationale */
  rationale: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type PostDeletedEventConnection = {
  __typename: 'PostDeletedEventConnection';
  edges: Array<PostDeletedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostDeletedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rationale: Scalars['String'];
};

export type PostDeletedEventEdge = {
  __typename: 'PostDeletedEventEdge';
  cursor: Scalars['String'];
  node: PostDeletedEvent;
};

export enum PostDeletedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PostDeletedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rationale?: Maybe<Scalars['String']>;
};

export type PostDeletedEventWhereInput = {
  AND?: Maybe<Array<PostDeletedEventWhereInput>>;
  OR?: Maybe<Array<PostDeletedEventWhereInput>>;
  actor?: Maybe<MembershipWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  posts_every?: Maybe<ForumPostWhereInput>;
  posts_none?: Maybe<ForumPostWhereInput>;
  posts_some?: Maybe<ForumPostWhereInput>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type PostDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostModeratedEvent = BaseGraphQlObject & {
  __typename: 'PostModeratedEvent';
  actor: Worker;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  post: ForumPost;
  postId: Scalars['String'];
  /** The rationale behind the moderation */
  rationale: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type PostModeratedEventConnection = {
  __typename: 'PostModeratedEventConnection';
  edges: Array<PostModeratedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostModeratedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  post: Scalars['ID'];
  rationale: Scalars['String'];
};

export type PostModeratedEventEdge = {
  __typename: 'PostModeratedEventEdge';
  cursor: Scalars['String'];
  node: PostModeratedEvent;
};

export enum PostModeratedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PostModeratedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
};

export type PostModeratedEventWhereInput = {
  AND?: Maybe<Array<PostModeratedEventWhereInput>>;
  OR?: Maybe<Array<PostModeratedEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ForumPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  post: ForumPost;
  postId: Scalars['String'];
  reactingMember: Membership;
  reactingMemberId: Scalars['String'];
  /**
   * The reaction result - new valid reaction, cancelation of previous reaction or
   * invalid reaction (which also cancels the previous one)
   */
  reactionResult: PostReactionResult;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type PostReactedEventConnection = {
  __typename: 'PostReactedEventConnection';
  edges: Array<PostReactedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostReactedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  post: Scalars['ID'];
  reactingMember: Scalars['ID'];
  reactionResult: Scalars['JSONObject'];
};

export type PostReactedEventEdge = {
  __typename: 'PostReactedEventEdge';
  cursor: Scalars['String'];
  node: PostReactedEvent;
};

export enum PostReactedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  ReactingMemberAsc = 'reactingMember_ASC',
  ReactingMemberDesc = 'reactingMember_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PostReactedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
  reactingMember?: Maybe<Scalars['ID']>;
  reactionResult?: Maybe<Scalars['JSONObject']>;
};

export type PostReactedEventWhereInput = {
  AND?: Maybe<Array<PostReactedEventWhereInput>>;
  OR?: Maybe<Array<PostReactedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ForumPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  reactingMember?: Maybe<MembershipWhereInput>;
  reactingMember_eq?: Maybe<Scalars['ID']>;
  reactingMember_in?: Maybe<Array<Scalars['ID']>>;
  reactionResult_json?: Maybe<Scalars['JSONObject']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type PostReactedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum PostReaction {
  Like = 'LIKE'
}

export type PostReactionResult = PostReactionResultCancel | PostReactionResultInvalid | PostReactionResultValid;

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
  AND?: Maybe<Array<PostReactionResultCancelWhereInput>>;
  OR?: Maybe<Array<PostReactionResultCancelWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<PostReactionResultInvalidWhereInput>>;
  OR?: Maybe<Array<PostReactionResultInvalidWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  reactionId_eq?: Maybe<Scalars['Int']>;
  reactionId_gt?: Maybe<Scalars['Int']>;
  reactionId_gte?: Maybe<Scalars['Int']>;
  reactionId_in?: Maybe<Array<Scalars['Int']>>;
  reactionId_lt?: Maybe<Scalars['Int']>;
  reactionId_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<PostReactionResultValidWhereInput>>;
  OR?: Maybe<Array<PostReactionResultValidWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  reactionId_eq?: Maybe<Scalars['Int']>;
  reactionId_gt?: Maybe<Scalars['Int']>;
  reactionId_gte?: Maybe<Scalars['Int']>;
  reactionId_in?: Maybe<Array<Scalars['Int']>>;
  reactionId_lt?: Maybe<Scalars['Int']>;
  reactionId_lte?: Maybe<Scalars['Int']>;
  reaction_eq?: Maybe<PostReaction>;
  reaction_in?: Maybe<Array<PostReaction>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<PostStatusActiveWhereInput>>;
  OR?: Maybe<Array<PostStatusActiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New post text */
  newText: Scalars['String'];
  post: ForumPost;
  postId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type PostTextUpdatedEventConnection = {
  __typename: 'PostTextUpdatedEventConnection';
  edges: Array<PostTextUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostTextUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newText: Scalars['String'];
  post: Scalars['ID'];
};

export type PostTextUpdatedEventEdge = {
  __typename: 'PostTextUpdatedEventEdge';
  cursor: Scalars['String'];
  node: PostTextUpdatedEvent;
};

export enum PostTextUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewTextAsc = 'newText_ASC',
  NewTextDesc = 'newText_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PostTextUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newText?: Maybe<Scalars['String']>;
  post?: Maybe<Scalars['ID']>;
};

export type PostTextUpdatedEventWhereInput = {
  AND?: Maybe<Array<PostTextUpdatedEventWhereInput>>;
  OR?: Maybe<Array<PostTextUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newText_contains?: Maybe<Scalars['String']>;
  newText_endsWith?: Maybe<Scalars['String']>;
  newText_eq?: Maybe<Scalars['String']>;
  newText_in?: Maybe<Array<Scalars['String']>>;
  newText_startsWith?: Maybe<Scalars['String']>;
  post?: Maybe<ForumPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type PostTextUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type PostsByTextFtsOutput = {
  __typename: 'PostsByTextFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: PostsByTextSearchResult;
  rank: Scalars['Float'];
};

export type PostsByTextSearchResult = ForumPost;

export type ProcessorState = {
  __typename: 'ProcessorState';
  chainHead: Scalars['Float'];
  indexerHead: Scalars['Float'];
  lastCompleteBlock: Scalars['Float'];
  lastProcessedEvent: Scalars['String'];
};

export type Proposal = BaseGraphQlObject & {
  __typename: 'Proposal';
  /** How many prior councils have already approved the proposal (starts with 0) */
  councilApprovals: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: ProposalCreatedEvent;
  creator: Membership;
  creatorId: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Proposal description */
  description: Scalars['String'];
  /** Proposal details depending on proposal type */
  details: ProposalDetails;
  discussionThread: ProposalDiscussionThread;
  /** Exact block number the proposal is supposed to be executed at (if specified) */
  exactExecutionBlock?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** If true then the proposal status is final and will not change form this point */
  isFinalized?: Maybe<Scalars['Boolean']>;
  proposalStatusUpdates: Array<ProposalStatusUpdatedEvent>;
  proposalcancelledeventproposal?: Maybe<Array<ProposalCancelledEvent>>;
  proposaldecisionmadeeventproposal?: Maybe<Array<ProposalDecisionMadeEvent>>;
  proposalexecutedeventproposal?: Maybe<Array<ProposalExecutedEvent>>;
  /** Staking account with proposal stake (in case a stake is required) */
  stakingAccount?: Maybe<Scalars['String']>;
  /** Current proposal status */
  status: ProposalStatus;
  /** Number of the block the current status was set at */
  statusSetAtBlock: Scalars['Int'];
  /** Time the current status was set at (based on block timestamp) */
  statusSetAtTime: Scalars['DateTime'];
  /** Proposal title */
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  votes: Array<ProposalVotedEvent>;
};

export type ProposalCancelledEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalCancelledEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalCancelledEventConnection = {
  __typename: 'ProposalCancelledEventConnection';
  edges: Array<ProposalCancelledEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalCancelledEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  proposal: Scalars['ID'];
};

export type ProposalCancelledEventEdge = {
  __typename: 'ProposalCancelledEventEdge';
  cursor: Scalars['String'];
  node: ProposalCancelledEvent;
};

export enum ProposalCancelledEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalCancelledEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalCancelledEventWhereInput = {
  AND?: Maybe<Array<ProposalCancelledEventWhereInput>>;
  OR?: Maybe<Array<ProposalCancelledEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalCancelledEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalConnection = {
  __typename: 'ProposalConnection';
  edges: Array<ProposalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalCreateInput = {
  councilApprovals: Scalars['Float'];
  creator: Scalars['ID'];
  description: Scalars['String'];
  details: Scalars['JSONObject'];
  exactExecutionBlock?: Maybe<Scalars['Float']>;
  isFinalized?: Maybe<Scalars['Boolean']>;
  stakingAccount?: Maybe<Scalars['String']>;
  status: Scalars['JSONObject'];
  statusSetAtBlock: Scalars['Float'];
  statusSetAtTime: Scalars['DateTime'];
  title: Scalars['String'];
};

export type ProposalCreatedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalCreatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalCreatedEventConnection = {
  __typename: 'ProposalCreatedEventConnection';
  edges: Array<ProposalCreatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalCreatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  proposal: Scalars['ID'];
};

export type ProposalCreatedEventEdge = {
  __typename: 'ProposalCreatedEventEdge';
  cursor: Scalars['String'];
  node: ProposalCreatedEvent;
};

export enum ProposalCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalCreatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalCreatedEventWhereInput = {
  AND?: Maybe<Array<ProposalCreatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalCreatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDecisionMadeEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalDecisionMadeEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  /** The voting decision status */
  decisionStatus: ProposalDecisionStatus;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDecisionMadeEventConnection = {
  __typename: 'ProposalDecisionMadeEventConnection';
  edges: Array<ProposalDecisionMadeEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDecisionMadeEventCreateInput = {
  decisionStatus: Scalars['JSONObject'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  proposal: Scalars['ID'];
};

export type ProposalDecisionMadeEventEdge = {
  __typename: 'ProposalDecisionMadeEventEdge';
  cursor: Scalars['String'];
  node: ProposalDecisionMadeEvent;
};

export enum ProposalDecisionMadeEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDecisionMadeEventUpdateInput = {
  decisionStatus?: Maybe<Scalars['JSONObject']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalDecisionMadeEventWhereInput = {
  AND?: Maybe<Array<ProposalDecisionMadeEventWhereInput>>;
  OR?: Maybe<Array<ProposalDecisionMadeEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  decisionStatus_json?: Maybe<Scalars['JSONObject']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDecisionMadeEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDecisionStatus = ProposalStatusCanceledByRuntime | ProposalStatusCancelled | ProposalStatusDormant | ProposalStatusExpired | ProposalStatusGracing | ProposalStatusRejected | ProposalStatusSlashed | ProposalStatusVetoed;

export type ProposalDetails = AmendConstitutionProposalDetails | CancelWorkingGroupLeadOpeningProposalDetails | CreateBlogPostProposalDetails | CreateWorkingGroupLeadOpeningProposalDetails | DecreaseWorkingGroupLeadStakeProposalDetails | EditBlogPostProposalDetails | FillWorkingGroupLeadOpeningProposalDetails | FundingRequestProposalDetails | LockBlogPostProposalDetails | RuntimeUpgradeProposalDetails | SetCouncilBudgetIncrementProposalDetails | SetCouncilorRewardProposalDetails | SetInitialInvitationBalanceProposalDetails | SetInitialInvitationCountProposalDetails | SetMaxValidatorCountProposalDetails | SetMembershipLeadInvitationQuotaProposalDetails | SetMembershipPriceProposalDetails | SetReferralCutProposalDetails | SetWorkingGroupLeadRewardProposalDetails | SignalProposalDetails | SlashWorkingGroupLeadProposalDetails | TerminateWorkingGroupLeadProposalDetails | UnlockBlogPostProposalDetails | UpdateWorkingGroupBudgetProposalDetails | VetoProposalDetails;

export type ProposalDiscussionPost = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionPost';
  author: Membership;
  authorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: ProposalDiscussionPostCreatedEvent;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  discussionThread: ProposalDiscussionThread;
  discussionThreadId: Scalars['String'];
  id: Scalars['ID'];
  /** True if the post is either Active or Locked */
  isVisible: Scalars['Boolean'];
  proposaldiscussionpostdeletedeventpost?: Maybe<Array<ProposalDiscussionPostDeletedEvent>>;
  proposaldiscussionpostrepliesTo?: Maybe<Array<ProposalDiscussionPost>>;
  repliesTo?: Maybe<ProposalDiscussionPost>;
  repliesToId?: Maybe<Scalars['String']>;
  /** Current post status */
  status: ProposalDiscussionPostStatus;
  /** Post's md-formatted text */
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  updates: Array<ProposalDiscussionPostUpdatedEvent>;
  version: Scalars['Int'];
};

export type ProposalDiscussionPostConnection = {
  __typename: 'ProposalDiscussionPostConnection';
  edges: Array<ProposalDiscussionPostEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionPostCreateInput = {
  author: Scalars['ID'];
  discussionThread: Scalars['ID'];
  isVisible: Scalars['Boolean'];
  repliesTo?: Maybe<Scalars['ID']>;
  status: Scalars['JSONObject'];
  text: Scalars['String'];
};

export type ProposalDiscussionPostCreatedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalDiscussionPostCreatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  /** Initial post text */
  text: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionPostCreatedEventConnection = {
  __typename: 'ProposalDiscussionPostCreatedEventConnection';
  edges: Array<ProposalDiscussionPostCreatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionPostCreatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  post: Scalars['ID'];
  text: Scalars['String'];
};

export type ProposalDiscussionPostCreatedEventEdge = {
  __typename: 'ProposalDiscussionPostCreatedEventEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionPostCreatedEvent;
};

export enum ProposalDiscussionPostCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionPostCreatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ProposalDiscussionPostCreatedEventWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionPostCreatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostCreatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionPostCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostDeletedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalDiscussionPostDeletedEvent';
  actor: Membership;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionPostDeletedEventConnection = {
  __typename: 'ProposalDiscussionPostDeletedEventConnection';
  edges: Array<ProposalDiscussionPostDeletedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionPostDeletedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  post: Scalars['ID'];
};

export type ProposalDiscussionPostDeletedEventEdge = {
  __typename: 'ProposalDiscussionPostDeletedEventEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionPostDeletedEvent;
};

export enum ProposalDiscussionPostDeletedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionPostDeletedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionPostDeletedEventWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionPostDeletedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostDeletedEventWhereInput>>;
  actor?: Maybe<MembershipWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionPostDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostEdge = {
  __typename: 'ProposalDiscussionPostEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionPost;
};

export enum ProposalDiscussionPostOrderByInput {
  AuthorAsc = 'author_ASC',
  AuthorDesc = 'author_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DiscussionThreadAsc = 'discussionThread_ASC',
  DiscussionThreadDesc = 'discussionThread_DESC',
  IsVisibleAsc = 'isVisible_ASC',
  IsVisibleDesc = 'isVisible_DESC',
  RepliesToAsc = 'repliesTo_ASC',
  RepliesToDesc = 'repliesTo_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
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
  AND?: Maybe<Array<ProposalDiscussionPostStatusActiveWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostStatusActiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  author?: Maybe<Scalars['ID']>;
  discussionThread?: Maybe<Scalars['ID']>;
  isVisible?: Maybe<Scalars['Boolean']>;
  repliesTo?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['JSONObject']>;
  text?: Maybe<Scalars['String']>;
};

export type ProposalDiscussionPostUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalDiscussionPostUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  post: ProposalDiscussionPost;
  postId: Scalars['String'];
  /** New post text */
  text: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionPostUpdatedEventConnection = {
  __typename: 'ProposalDiscussionPostUpdatedEventConnection';
  edges: Array<ProposalDiscussionPostUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionPostUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  post: Scalars['ID'];
  text: Scalars['String'];
};

export type ProposalDiscussionPostUpdatedEventEdge = {
  __typename: 'ProposalDiscussionPostUpdatedEventEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionPostUpdatedEvent;
};

export enum ProposalDiscussionPostUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PostAsc = 'post_ASC',
  PostDesc = 'post_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionPostUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  post?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
};

export type ProposalDiscussionPostUpdatedEventWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionPostUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  post?: Maybe<ProposalDiscussionPostWhereInput>;
  post_eq?: Maybe<Scalars['ID']>;
  post_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionPostUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionPostWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionPostWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionPostWhereInput>>;
  author?: Maybe<MembershipWhereInput>;
  author_eq?: Maybe<Scalars['ID']>;
  author_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  discussionThread?: Maybe<ProposalDiscussionThreadWhereInput>;
  discussionThread_eq?: Maybe<Scalars['ID']>;
  discussionThread_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isVisible_eq?: Maybe<Scalars['Boolean']>;
  isVisible_in?: Maybe<Array<Scalars['Boolean']>>;
  proposaldiscussionpostdeletedeventpost_every?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventpost_none?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostdeletedeventpost_some?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
  proposaldiscussionpostrepliesTo_every?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostrepliesTo_none?: Maybe<ProposalDiscussionPostWhereInput>;
  proposaldiscussionpostrepliesTo_some?: Maybe<ProposalDiscussionPostWhereInput>;
  repliesTo?: Maybe<ProposalDiscussionPostWhereInput>;
  repliesTo_eq?: Maybe<Scalars['ID']>;
  repliesTo_in?: Maybe<Array<Scalars['ID']>>;
  status_json?: Maybe<Scalars['JSONObject']>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  updates_every?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  updates_none?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
  updates_some?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
};

export type ProposalDiscussionPostWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionThread = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionThread';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Current thread mode */
  mode: ProposalDiscussionThreadMode;
  modeChanges: Array<ProposalDiscussionThreadModeChangedEvent>;
  posts: Array<ProposalDiscussionPost>;
  proposal: Proposal;
  proposalId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionThreadConnection = {
  __typename: 'ProposalDiscussionThreadConnection';
  edges: Array<ProposalDiscussionThreadEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionThreadCreateInput = {
  mode: Scalars['JSONObject'];
  proposal: Scalars['ID'];
};

export type ProposalDiscussionThreadEdge = {
  __typename: 'ProposalDiscussionThreadEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionThread;
};

export type ProposalDiscussionThreadMode = ProposalDiscussionThreadModeClosed | ProposalDiscussionThreadModeOpen;

export type ProposalDiscussionThreadModeChangedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalDiscussionThreadModeChangedEvent';
  actor: Membership;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** The new thread mode */
  newMode: ProposalDiscussionThreadMode;
  thread: ProposalDiscussionThread;
  threadId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionThreadModeChangedEventConnection = {
  __typename: 'ProposalDiscussionThreadModeChangedEventConnection';
  edges: Array<ProposalDiscussionThreadModeChangedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionThreadModeChangedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newMode: Scalars['JSONObject'];
  thread: Scalars['ID'];
};

export type ProposalDiscussionThreadModeChangedEventEdge = {
  __typename: 'ProposalDiscussionThreadModeChangedEventEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionThreadModeChangedEvent;
};

export enum ProposalDiscussionThreadModeChangedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionThreadModeChangedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newMode?: Maybe<Scalars['JSONObject']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionThreadModeChangedEventWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionThreadModeChangedEventWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadModeChangedEventWhereInput>>;
  actor?: Maybe<MembershipWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newMode_json?: Maybe<Scalars['JSONObject']>;
  thread?: Maybe<ProposalDiscussionThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<ProposalDiscussionThreadModeOpenWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadModeOpenWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionThreadModeOpenWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum ProposalDiscussionThreadOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionThreadUpdateInput = {
  mode?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalDiscussionThreadWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionThreadWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionThreadWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  modeChanges_every?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  modeChanges_none?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  modeChanges_some?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
  mode_json?: Maybe<Scalars['JSONObject']>;
  posts_every?: Maybe<ProposalDiscussionPostWhereInput>;
  posts_none?: Maybe<ProposalDiscussionPostWhereInput>;
  posts_some?: Maybe<ProposalDiscussionPostWhereInput>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionThreadWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalDiscussionWhitelist = BaseGraphQlObject & {
  __typename: 'ProposalDiscussionWhitelist';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  members: Array<Membership>;
  phantom?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalDiscussionWhitelistConnection = {
  __typename: 'ProposalDiscussionWhitelistConnection';
  edges: Array<ProposalDiscussionWhitelistEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalDiscussionWhitelistCreateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionWhitelistEdge = {
  __typename: 'ProposalDiscussionWhitelistEdge';
  cursor: Scalars['String'];
  node: ProposalDiscussionWhitelist;
};

export enum ProposalDiscussionWhitelistOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  PhantomAsc = 'phantom_ASC',
  PhantomDesc = 'phantom_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalDiscussionWhitelistUpdateInput = {
  phantom?: Maybe<Scalars['Float']>;
};

export type ProposalDiscussionWhitelistWhereInput = {
  AND?: Maybe<Array<ProposalDiscussionWhitelistWhereInput>>;
  OR?: Maybe<Array<ProposalDiscussionWhitelistWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  members_every?: Maybe<MembershipWhereInput>;
  members_none?: Maybe<MembershipWhereInput>;
  members_some?: Maybe<MembershipWhereInput>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalDiscussionWhitelistWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalEdge = {
  __typename: 'ProposalEdge';
  cursor: Scalars['String'];
  node: Proposal;
};

export type ProposalExecutedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalExecutedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** The execution status */
  executionStatus: ProposalExecutionStatus;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalExecutedEventConnection = {
  __typename: 'ProposalExecutedEventConnection';
  edges: Array<ProposalExecutedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalExecutedEventCreateInput = {
  executionStatus: Scalars['JSONObject'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  proposal: Scalars['ID'];
};

export type ProposalExecutedEventEdge = {
  __typename: 'ProposalExecutedEventEdge';
  cursor: Scalars['String'];
  node: ProposalExecutedEvent;
};

export enum ProposalExecutedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalExecutedEventUpdateInput = {
  executionStatus?: Maybe<Scalars['JSONObject']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalExecutedEventWhereInput = {
  AND?: Maybe<Array<ProposalExecutedEventWhereInput>>;
  OR?: Maybe<Array<ProposalExecutedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  executionStatus_json?: Maybe<Scalars['JSONObject']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ProposalExecutedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalExecutionStatus = ProposalStatusExecuted | ProposalStatusExecutionFailed;

export type ProposalIntermediateStatus = ProposalStatusDeciding | ProposalStatusDormant | ProposalStatusGracing;

export enum ProposalOrderByInput {
  CouncilApprovalsAsc = 'councilApprovals_ASC',
  CouncilApprovalsDesc = 'councilApprovals_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatorAsc = 'creator_ASC',
  CreatorDesc = 'creator_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ExactExecutionBlockAsc = 'exactExecutionBlock_ASC',
  ExactExecutionBlockDesc = 'exactExecutionBlock_DESC',
  IsFinalizedAsc = 'isFinalized_ASC',
  IsFinalizedDesc = 'isFinalized_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  StatusSetAtBlockAsc = 'statusSetAtBlock_ASC',
  StatusSetAtBlockDesc = 'statusSetAtBlock_DESC',
  StatusSetAtTimeAsc = 'statusSetAtTime_ASC',
  StatusSetAtTimeDesc = 'statusSetAtTime_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalStatus = ProposalStatusCanceledByRuntime | ProposalStatusCancelled | ProposalStatusDeciding | ProposalStatusDormant | ProposalStatusExecuted | ProposalStatusExecutionFailed | ProposalStatusExpired | ProposalStatusGracing | ProposalStatusRejected | ProposalStatusSlashed | ProposalStatusVetoed;

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
  /** The runtime execution error message */
  errorMessage: Scalars['String'];
  /** Related ProposalExecutedEvent */
  proposalExecutedEvent?: Maybe<ProposalExecutedEvent>;
};

export type ProposalStatusExecutionFailedCreateInput = {
  errorMessage: Scalars['String'];
};

export type ProposalStatusExecutionFailedUpdateInput = {
  errorMessage?: Maybe<Scalars['String']>;
};

export type ProposalStatusExecutionFailedWhereInput = {
  AND?: Maybe<Array<ProposalStatusExecutionFailedWhereInput>>;
  OR?: Maybe<Array<ProposalStatusExecutionFailedWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  errorMessage_contains?: Maybe<Scalars['String']>;
  errorMessage_endsWith?: Maybe<Scalars['String']>;
  errorMessage_eq?: Maybe<Scalars['String']>;
  errorMessage_in?: Maybe<Array<Scalars['String']>>;
  errorMessage_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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

export type ProposalStatusUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalStatusUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** The new proposal intermediate status (Deciding/Gracing/Dormant) */
  newStatus: ProposalIntermediateStatus;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ProposalStatusUpdatedEventConnection = {
  __typename: 'ProposalStatusUpdatedEventConnection';
  edges: Array<ProposalStatusUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalStatusUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newStatus: Scalars['JSONObject'];
  proposal: Scalars['ID'];
};

export type ProposalStatusUpdatedEventEdge = {
  __typename: 'ProposalStatusUpdatedEventEdge';
  cursor: Scalars['String'];
  node: ProposalStatusUpdatedEvent;
};

export enum ProposalStatusUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ProposalStatusUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newStatus?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<Scalars['ID']>;
};

export type ProposalStatusUpdatedEventWhereInput = {
  AND?: Maybe<Array<ProposalStatusUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ProposalStatusUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newStatus_json?: Maybe<Scalars['JSONObject']>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  councilApprovals?: Maybe<Scalars['Float']>;
  creator?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['JSONObject']>;
  exactExecutionBlock?: Maybe<Scalars['Float']>;
  isFinalized?: Maybe<Scalars['Boolean']>;
  stakingAccount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
  statusSetAtBlock?: Maybe<Scalars['Float']>;
  statusSetAtTime?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
};

export enum ProposalVoteKind {
  Abstain = 'ABSTAIN',
  Approve = 'APPROVE',
  Reject = 'REJECT',
  Slash = 'SLASH'
}

export type ProposalVotedEvent = BaseGraphQlObject & Event & {
  __typename: 'ProposalVotedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  proposal: Proposal;
  proposalId: Scalars['String'];
  /** The rationale behind the vote */
  rationale: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** The kind of the vote that was casted */
  voteKind: ProposalVoteKind;
  voter: Membership;
  voterId: Scalars['String'];
  /**
   * The voting round - number representing which Deciding period the vote was
   * casted in (starting with 1), useful when the proposal must be approved during
   * multiple council terms (constitution > 1)
   */
  votingRound: Scalars['Int'];
};

export type ProposalVotedEventConnection = {
  __typename: 'ProposalVotedEventConnection';
  edges: Array<ProposalVotedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ProposalVotedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  proposal: Scalars['ID'];
  rationale: Scalars['String'];
  voteKind: ProposalVoteKind;
  voter: Scalars['ID'];
  votingRound: Scalars['Float'];
};

export type ProposalVotedEventEdge = {
  __typename: 'ProposalVotedEventEdge';
  cursor: Scalars['String'];
  node: ProposalVotedEvent;
};

export enum ProposalVotedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ProposalAsc = 'proposal_ASC',
  ProposalDesc = 'proposal_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VoteKindAsc = 'voteKind_ASC',
  VoteKindDesc = 'voteKind_DESC',
  VoterAsc = 'voter_ASC',
  VoterDesc = 'voter_DESC',
  VotingRoundAsc = 'votingRound_ASC',
  VotingRoundDesc = 'votingRound_DESC'
}

export type ProposalVotedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  proposal?: Maybe<Scalars['ID']>;
  rationale?: Maybe<Scalars['String']>;
  voteKind?: Maybe<ProposalVoteKind>;
  voter?: Maybe<Scalars['ID']>;
  votingRound?: Maybe<Scalars['Float']>;
};

export type ProposalVotedEventWhereInput = {
  AND?: Maybe<Array<ProposalVotedEventWhereInput>>;
  OR?: Maybe<Array<ProposalVotedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  proposal?: Maybe<ProposalWhereInput>;
  proposal_eq?: Maybe<Scalars['ID']>;
  proposal_in?: Maybe<Array<Scalars['ID']>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  voteKind_eq?: Maybe<ProposalVoteKind>;
  voteKind_in?: Maybe<Array<ProposalVoteKind>>;
  voter?: Maybe<MembershipWhereInput>;
  voter_eq?: Maybe<Scalars['ID']>;
  voter_in?: Maybe<Array<Scalars['ID']>>;
  votingRound_eq?: Maybe<Scalars['Int']>;
  votingRound_gt?: Maybe<Scalars['Int']>;
  votingRound_gte?: Maybe<Scalars['Int']>;
  votingRound_in?: Maybe<Array<Scalars['Int']>>;
  votingRound_lt?: Maybe<Scalars['Int']>;
  votingRound_lte?: Maybe<Scalars['Int']>;
};

export type ProposalVotedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalWhereInput = {
  AND?: Maybe<Array<ProposalWhereInput>>;
  OR?: Maybe<Array<ProposalWhereInput>>;
  councilApprovals_eq?: Maybe<Scalars['Int']>;
  councilApprovals_gt?: Maybe<Scalars['Int']>;
  councilApprovals_gte?: Maybe<Scalars['Int']>;
  councilApprovals_in?: Maybe<Array<Scalars['Int']>>;
  councilApprovals_lt?: Maybe<Scalars['Int']>;
  councilApprovals_lte?: Maybe<Scalars['Int']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<ProposalCreatedEventWhereInput>;
  creator?: Maybe<MembershipWhereInput>;
  creator_eq?: Maybe<Scalars['ID']>;
  creator_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  details_json?: Maybe<Scalars['JSONObject']>;
  discussionThread?: Maybe<ProposalDiscussionThreadWhereInput>;
  exactExecutionBlock_eq?: Maybe<Scalars['Int']>;
  exactExecutionBlock_gt?: Maybe<Scalars['Int']>;
  exactExecutionBlock_gte?: Maybe<Scalars['Int']>;
  exactExecutionBlock_in?: Maybe<Array<Scalars['Int']>>;
  exactExecutionBlock_lt?: Maybe<Scalars['Int']>;
  exactExecutionBlock_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isFinalized_eq?: Maybe<Scalars['Boolean']>;
  isFinalized_in?: Maybe<Array<Scalars['Boolean']>>;
  proposalStatusUpdates_every?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  proposalStatusUpdates_none?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  proposalStatusUpdates_some?: Maybe<ProposalStatusUpdatedEventWhereInput>;
  proposalcancelledeventproposal_every?: Maybe<ProposalCancelledEventWhereInput>;
  proposalcancelledeventproposal_none?: Maybe<ProposalCancelledEventWhereInput>;
  proposalcancelledeventproposal_some?: Maybe<ProposalCancelledEventWhereInput>;
  proposaldecisionmadeeventproposal_every?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposaldecisionmadeeventproposal_none?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposaldecisionmadeeventproposal_some?: Maybe<ProposalDecisionMadeEventWhereInput>;
  proposalexecutedeventproposal_every?: Maybe<ProposalExecutedEventWhereInput>;
  proposalexecutedeventproposal_none?: Maybe<ProposalExecutedEventWhereInput>;
  proposalexecutedeventproposal_some?: Maybe<ProposalExecutedEventWhereInput>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  statusSetAtBlock_eq?: Maybe<Scalars['Int']>;
  statusSetAtBlock_gt?: Maybe<Scalars['Int']>;
  statusSetAtBlock_gte?: Maybe<Scalars['Int']>;
  statusSetAtBlock_in?: Maybe<Array<Scalars['Int']>>;
  statusSetAtBlock_lt?: Maybe<Scalars['Int']>;
  statusSetAtBlock_lte?: Maybe<Scalars['Int']>;
  statusSetAtTime_eq?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_gt?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_gte?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_lt?: Maybe<Scalars['DateTime']>;
  statusSetAtTime_lte?: Maybe<Scalars['DateTime']>;
  status_json?: Maybe<Scalars['JSONObject']>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votes_every?: Maybe<ProposalVotedEventWhereInput>;
  votes_none?: Maybe<ProposalVotedEventWhereInput>;
  votes_some?: Maybe<ProposalVotedEventWhereInput>;
};

export type ProposalWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ProposalsByDescriptionFtsOutput = {
  __typename: 'ProposalsByDescriptionFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: ProposalsByDescriptionSearchResult;
  rank: Scalars['Float'];
};

export type ProposalsByDescriptionSearchResult = Proposal;

export type ProposalsByTitleFtsOutput = {
  __typename: 'ProposalsByTitleFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: ProposalsByTitleSearchResult;
  rank: Scalars['Float'];
};

export type ProposalsByTitleSearchResult = Proposal;

export type Query = {
  __typename: 'Query';
  announcingPeriodStartedEventByUniqueInput?: Maybe<AnnouncingPeriodStartedEvent>;
  announcingPeriodStartedEvents: Array<AnnouncingPeriodStartedEvent>;
  announcingPeriodStartedEventsConnection: AnnouncingPeriodStartedEventConnection;
  applicationFormQuestionAnswerByUniqueInput?: Maybe<ApplicationFormQuestionAnswer>;
  applicationFormQuestionAnswers: Array<ApplicationFormQuestionAnswer>;
  applicationFormQuestionAnswersConnection: ApplicationFormQuestionAnswerConnection;
  applicationFormQuestionByUniqueInput?: Maybe<ApplicationFormQuestion>;
  applicationFormQuestions: Array<ApplicationFormQuestion>;
  applicationFormQuestionsConnection: ApplicationFormQuestionConnection;
  applicationWithdrawnEventByUniqueInput?: Maybe<ApplicationWithdrawnEvent>;
  applicationWithdrawnEvents: Array<ApplicationWithdrawnEvent>;
  applicationWithdrawnEventsConnection: ApplicationWithdrawnEventConnection;
  appliedOnOpeningEventByUniqueInput?: Maybe<AppliedOnOpeningEvent>;
  appliedOnOpeningEvents: Array<AppliedOnOpeningEvent>;
  appliedOnOpeningEventsConnection: AppliedOnOpeningEventConnection;
  budgetBalanceSetEventByUniqueInput?: Maybe<BudgetBalanceSetEvent>;
  budgetBalanceSetEvents: Array<BudgetBalanceSetEvent>;
  budgetBalanceSetEventsConnection: BudgetBalanceSetEventConnection;
  budgetIncrementUpdatedEventByUniqueInput?: Maybe<BudgetIncrementUpdatedEvent>;
  budgetIncrementUpdatedEvents: Array<BudgetIncrementUpdatedEvent>;
  budgetIncrementUpdatedEventsConnection: BudgetIncrementUpdatedEventConnection;
  budgetRefillEventByUniqueInput?: Maybe<BudgetRefillEvent>;
  budgetRefillEvents: Array<BudgetRefillEvent>;
  budgetRefillEventsConnection: BudgetRefillEventConnection;
  budgetRefillPlannedEventByUniqueInput?: Maybe<BudgetRefillPlannedEvent>;
  budgetRefillPlannedEvents: Array<BudgetRefillPlannedEvent>;
  budgetRefillPlannedEventsConnection: BudgetRefillPlannedEventConnection;
  budgetSetEventByUniqueInput?: Maybe<BudgetSetEvent>;
  budgetSetEvents: Array<BudgetSetEvent>;
  budgetSetEventsConnection: BudgetSetEventConnection;
  budgetSpendingEventByUniqueInput?: Maybe<BudgetSpendingEvent>;
  budgetSpendingEvents: Array<BudgetSpendingEvent>;
  budgetSpendingEventsConnection: BudgetSpendingEventConnection;
  candidacyNoteMetadata: Array<CandidacyNoteMetadata>;
  candidacyNoteMetadataByUniqueInput?: Maybe<CandidacyNoteMetadata>;
  candidacyNoteMetadataConnection: CandidacyNoteMetadataConnection;
  candidacyNoteSetEventByUniqueInput?: Maybe<CandidacyNoteSetEvent>;
  candidacyNoteSetEvents: Array<CandidacyNoteSetEvent>;
  candidacyNoteSetEventsConnection: CandidacyNoteSetEventConnection;
  candidacyStakeReleaseEventByUniqueInput?: Maybe<CandidacyStakeReleaseEvent>;
  candidacyStakeReleaseEvents: Array<CandidacyStakeReleaseEvent>;
  candidacyStakeReleaseEventsConnection: CandidacyStakeReleaseEventConnection;
  candidacyWithdrawEventByUniqueInput?: Maybe<CandidacyWithdrawEvent>;
  candidacyWithdrawEvents: Array<CandidacyWithdrawEvent>;
  candidacyWithdrawEventsConnection: CandidacyWithdrawEventConnection;
  candidateByUniqueInput?: Maybe<Candidate>;
  candidates: Array<Candidate>;
  candidatesConnection: CandidateConnection;
  castVoteByUniqueInput?: Maybe<CastVote>;
  castVotes: Array<CastVote>;
  castVotesConnection: CastVoteConnection;
  categoryArchivalStatusUpdatedEventByUniqueInput?: Maybe<CategoryArchivalStatusUpdatedEvent>;
  categoryArchivalStatusUpdatedEvents: Array<CategoryArchivalStatusUpdatedEvent>;
  categoryArchivalStatusUpdatedEventsConnection: CategoryArchivalStatusUpdatedEventConnection;
  categoryCreatedEventByUniqueInput?: Maybe<CategoryCreatedEvent>;
  categoryCreatedEvents: Array<CategoryCreatedEvent>;
  categoryCreatedEventsConnection: CategoryCreatedEventConnection;
  categoryDeletedEventByUniqueInput?: Maybe<CategoryDeletedEvent>;
  categoryDeletedEvents: Array<CategoryDeletedEvent>;
  categoryDeletedEventsConnection: CategoryDeletedEventConnection;
  categoryMembershipOfModeratorUpdatedEventByUniqueInput?: Maybe<CategoryMembershipOfModeratorUpdatedEvent>;
  categoryMembershipOfModeratorUpdatedEvents: Array<CategoryMembershipOfModeratorUpdatedEvent>;
  categoryMembershipOfModeratorUpdatedEventsConnection: CategoryMembershipOfModeratorUpdatedEventConnection;
  categoryStickyThreadUpdateEventByUniqueInput?: Maybe<CategoryStickyThreadUpdateEvent>;
  categoryStickyThreadUpdateEvents: Array<CategoryStickyThreadUpdateEvent>;
  categoryStickyThreadUpdateEventsConnection: CategoryStickyThreadUpdateEventConnection;
  channelByUniqueInput?: Maybe<Channel>;
  channelCategories: Array<ChannelCategory>;
  channelCategoriesByName: Array<ChannelCategoriesByNameFtsOutput>;
  channelCategoriesConnection: ChannelCategoryConnection;
  channelCategoryByUniqueInput?: Maybe<ChannelCategory>;
  channels: Array<Channel>;
  channelsConnection: ChannelConnection;
  councilMemberByUniqueInput?: Maybe<CouncilMember>;
  councilMembers: Array<CouncilMember>;
  councilMembersConnection: CouncilMemberConnection;
  councilStageUpdateByUniqueInput?: Maybe<CouncilStageUpdate>;
  councilStageUpdates: Array<CouncilStageUpdate>;
  councilStageUpdatesConnection: CouncilStageUpdateConnection;
  councilorRewardUpdatedEventByUniqueInput?: Maybe<CouncilorRewardUpdatedEvent>;
  councilorRewardUpdatedEvents: Array<CouncilorRewardUpdatedEvent>;
  councilorRewardUpdatedEventsConnection: CouncilorRewardUpdatedEventConnection;
  curatorGroupByUniqueInput?: Maybe<CuratorGroup>;
  curatorGroups: Array<CuratorGroup>;
  curatorGroupsConnection: CuratorGroupConnection;
  dataObjectByUniqueInput?: Maybe<DataObject>;
  dataObjects: Array<DataObject>;
  dataObjectsConnection: DataObjectConnection;
  electedCouncilByUniqueInput?: Maybe<ElectedCouncil>;
  electedCouncils: Array<ElectedCouncil>;
  electedCouncilsConnection: ElectedCouncilConnection;
  electionRoundByUniqueInput?: Maybe<ElectionRound>;
  electionRounds: Array<ElectionRound>;
  electionRoundsConnection: ElectionRoundConnection;
  events: Array<Event>;
  forumCategories: Array<ForumCategory>;
  forumCategoriesConnection: ForumCategoryConnection;
  forumCategoryByUniqueInput?: Maybe<ForumCategory>;
  forumPollAlternativeByUniqueInput?: Maybe<ForumPollAlternative>;
  forumPollAlternatives: Array<ForumPollAlternative>;
  forumPollAlternativesConnection: ForumPollAlternativeConnection;
  forumPollByUniqueInput?: Maybe<ForumPoll>;
  forumPolls: Array<ForumPoll>;
  forumPollsConnection: ForumPollConnection;
  forumPostByUniqueInput?: Maybe<ForumPost>;
  forumPostReactionByUniqueInput?: Maybe<ForumPostReaction>;
  forumPostReactions: Array<ForumPostReaction>;
  forumPostReactionsConnection: ForumPostReactionConnection;
  forumPosts: Array<ForumPost>;
  forumPostsConnection: ForumPostConnection;
  forumThreadByUniqueInput?: Maybe<ForumThread>;
  forumThreadTagByUniqueInput?: Maybe<ForumThreadTag>;
  forumThreadTags: Array<ForumThreadTag>;
  forumThreadTagsConnection: ForumThreadTagConnection;
  forumThreads: Array<ForumThread>;
  forumThreadsConnection: ForumThreadConnection;
  fundingRequestDestinationByUniqueInput?: Maybe<FundingRequestDestination>;
  fundingRequestDestinations: Array<FundingRequestDestination>;
  fundingRequestDestinationsConnection: FundingRequestDestinationConnection;
  fundingRequestDestinationsListByUniqueInput?: Maybe<FundingRequestDestinationsList>;
  fundingRequestDestinationsLists: Array<FundingRequestDestinationsList>;
  fundingRequestDestinationsListsConnection: FundingRequestDestinationsListConnection;
  initialInvitationBalanceUpdatedEventByUniqueInput?: Maybe<InitialInvitationBalanceUpdatedEvent>;
  initialInvitationBalanceUpdatedEvents: Array<InitialInvitationBalanceUpdatedEvent>;
  initialInvitationBalanceUpdatedEventsConnection: InitialInvitationBalanceUpdatedEventConnection;
  initialInvitationCountUpdatedEventByUniqueInput?: Maybe<InitialInvitationCountUpdatedEvent>;
  initialInvitationCountUpdatedEvents: Array<InitialInvitationCountUpdatedEvent>;
  initialInvitationCountUpdatedEventsConnection: InitialInvitationCountUpdatedEventConnection;
  invitesTransferredEventByUniqueInput?: Maybe<InvitesTransferredEvent>;
  invitesTransferredEvents: Array<InvitesTransferredEvent>;
  invitesTransferredEventsConnection: InvitesTransferredEventConnection;
  languageByUniqueInput?: Maybe<Language>;
  languages: Array<Language>;
  languagesConnection: LanguageConnection;
  leaderInvitationQuotaUpdatedEventByUniqueInput?: Maybe<LeaderInvitationQuotaUpdatedEvent>;
  leaderInvitationQuotaUpdatedEvents: Array<LeaderInvitationQuotaUpdatedEvent>;
  leaderInvitationQuotaUpdatedEventsConnection: LeaderInvitationQuotaUpdatedEventConnection;
  leaderSetEventByUniqueInput?: Maybe<LeaderSetEvent>;
  leaderSetEvents: Array<LeaderSetEvent>;
  leaderSetEventsConnection: LeaderSetEventConnection;
  leaderUnsetEventByUniqueInput?: Maybe<LeaderUnsetEvent>;
  leaderUnsetEvents: Array<LeaderUnsetEvent>;
  leaderUnsetEventsConnection: LeaderUnsetEventConnection;
  licenseByUniqueInput?: Maybe<License>;
  licenses: Array<License>;
  licensesConnection: LicenseConnection;
  memberAccountsUpdatedEventByUniqueInput?: Maybe<MemberAccountsUpdatedEvent>;
  memberAccountsUpdatedEvents: Array<MemberAccountsUpdatedEvent>;
  memberAccountsUpdatedEventsConnection: MemberAccountsUpdatedEventConnection;
  memberInvitedEventByUniqueInput?: Maybe<MemberInvitedEvent>;
  memberInvitedEvents: Array<MemberInvitedEvent>;
  memberInvitedEventsConnection: MemberInvitedEventConnection;
  memberMetadata: Array<MemberMetadata>;
  memberMetadataByUniqueInput?: Maybe<MemberMetadata>;
  memberMetadataConnection: MemberMetadataConnection;
  memberProfileUpdatedEventByUniqueInput?: Maybe<MemberProfileUpdatedEvent>;
  memberProfileUpdatedEvents: Array<MemberProfileUpdatedEvent>;
  memberProfileUpdatedEventsConnection: MemberProfileUpdatedEventConnection;
  memberVerificationStatusUpdatedEventByUniqueInput?: Maybe<MemberVerificationStatusUpdatedEvent>;
  memberVerificationStatusUpdatedEvents: Array<MemberVerificationStatusUpdatedEvent>;
  memberVerificationStatusUpdatedEventsConnection: MemberVerificationStatusUpdatedEventConnection;
  membersByHandle: Array<MembersByHandleFtsOutput>;
  membershipBoughtEventByUniqueInput?: Maybe<MembershipBoughtEvent>;
  membershipBoughtEvents: Array<MembershipBoughtEvent>;
  membershipBoughtEventsConnection: MembershipBoughtEventConnection;
  membershipByUniqueInput?: Maybe<Membership>;
  membershipPriceUpdatedEventByUniqueInput?: Maybe<MembershipPriceUpdatedEvent>;
  membershipPriceUpdatedEvents: Array<MembershipPriceUpdatedEvent>;
  membershipPriceUpdatedEventsConnection: MembershipPriceUpdatedEventConnection;
  membershipSystemSnapshotByUniqueInput?: Maybe<MembershipSystemSnapshot>;
  membershipSystemSnapshots: Array<MembershipSystemSnapshot>;
  membershipSystemSnapshotsConnection: MembershipSystemSnapshotConnection;
  memberships: Array<Membership>;
  membershipsConnection: MembershipConnection;
  newCandidateEventByUniqueInput?: Maybe<NewCandidateEvent>;
  newCandidateEvents: Array<NewCandidateEvent>;
  newCandidateEventsConnection: NewCandidateEventConnection;
  newCouncilElectedEventByUniqueInput?: Maybe<NewCouncilElectedEvent>;
  newCouncilElectedEvents: Array<NewCouncilElectedEvent>;
  newCouncilElectedEventsConnection: NewCouncilElectedEventConnection;
  newCouncilNotElectedEventByUniqueInput?: Maybe<NewCouncilNotElectedEvent>;
  newCouncilNotElectedEvents: Array<NewCouncilNotElectedEvent>;
  newCouncilNotElectedEventsConnection: NewCouncilNotElectedEventConnection;
  newMissedRewardLevelReachedEventByUniqueInput?: Maybe<NewMissedRewardLevelReachedEvent>;
  newMissedRewardLevelReachedEvents: Array<NewMissedRewardLevelReachedEvent>;
  newMissedRewardLevelReachedEventsConnection: NewMissedRewardLevelReachedEventConnection;
  notEnoughCandidatesEventByUniqueInput?: Maybe<NotEnoughCandidatesEvent>;
  notEnoughCandidatesEvents: Array<NotEnoughCandidatesEvent>;
  notEnoughCandidatesEventsConnection: NotEnoughCandidatesEventConnection;
  openingAddedEventByUniqueInput?: Maybe<OpeningAddedEvent>;
  openingAddedEvents: Array<OpeningAddedEvent>;
  openingAddedEventsConnection: OpeningAddedEventConnection;
  openingCanceledEventByUniqueInput?: Maybe<OpeningCanceledEvent>;
  openingCanceledEvents: Array<OpeningCanceledEvent>;
  openingCanceledEventsConnection: OpeningCanceledEventConnection;
  openingFilledEventByUniqueInput?: Maybe<OpeningFilledEvent>;
  openingFilledEvents: Array<OpeningFilledEvent>;
  openingFilledEventsConnection: OpeningFilledEventConnection;
  postAddedEventByUniqueInput?: Maybe<PostAddedEvent>;
  postAddedEvents: Array<PostAddedEvent>;
  postAddedEventsConnection: PostAddedEventConnection;
  postDeletedEventByUniqueInput?: Maybe<PostDeletedEvent>;
  postDeletedEvents: Array<PostDeletedEvent>;
  postDeletedEventsConnection: PostDeletedEventConnection;
  postModeratedEventByUniqueInput?: Maybe<PostModeratedEvent>;
  postModeratedEvents: Array<PostModeratedEvent>;
  postModeratedEventsConnection: PostModeratedEventConnection;
  postReactedEventByUniqueInput?: Maybe<PostReactedEvent>;
  postReactedEvents: Array<PostReactedEvent>;
  postReactedEventsConnection: PostReactedEventConnection;
  postTextUpdatedEventByUniqueInput?: Maybe<PostTextUpdatedEvent>;
  postTextUpdatedEvents: Array<PostTextUpdatedEvent>;
  postTextUpdatedEventsConnection: PostTextUpdatedEventConnection;
  postsByText: Array<PostsByTextFtsOutput>;
  proposalByUniqueInput?: Maybe<Proposal>;
  proposalCancelledEventByUniqueInput?: Maybe<ProposalCancelledEvent>;
  proposalCancelledEvents: Array<ProposalCancelledEvent>;
  proposalCancelledEventsConnection: ProposalCancelledEventConnection;
  proposalCreatedEventByUniqueInput?: Maybe<ProposalCreatedEvent>;
  proposalCreatedEvents: Array<ProposalCreatedEvent>;
  proposalCreatedEventsConnection: ProposalCreatedEventConnection;
  proposalDecisionMadeEventByUniqueInput?: Maybe<ProposalDecisionMadeEvent>;
  proposalDecisionMadeEvents: Array<ProposalDecisionMadeEvent>;
  proposalDecisionMadeEventsConnection: ProposalDecisionMadeEventConnection;
  proposalDiscussionPostByUniqueInput?: Maybe<ProposalDiscussionPost>;
  proposalDiscussionPostCreatedEventByUniqueInput?: Maybe<ProposalDiscussionPostCreatedEvent>;
  proposalDiscussionPostCreatedEvents: Array<ProposalDiscussionPostCreatedEvent>;
  proposalDiscussionPostCreatedEventsConnection: ProposalDiscussionPostCreatedEventConnection;
  proposalDiscussionPostDeletedEventByUniqueInput?: Maybe<ProposalDiscussionPostDeletedEvent>;
  proposalDiscussionPostDeletedEvents: Array<ProposalDiscussionPostDeletedEvent>;
  proposalDiscussionPostDeletedEventsConnection: ProposalDiscussionPostDeletedEventConnection;
  proposalDiscussionPostUpdatedEventByUniqueInput?: Maybe<ProposalDiscussionPostUpdatedEvent>;
  proposalDiscussionPostUpdatedEvents: Array<ProposalDiscussionPostUpdatedEvent>;
  proposalDiscussionPostUpdatedEventsConnection: ProposalDiscussionPostUpdatedEventConnection;
  proposalDiscussionPosts: Array<ProposalDiscussionPost>;
  proposalDiscussionPostsConnection: ProposalDiscussionPostConnection;
  proposalDiscussionThreadByUniqueInput?: Maybe<ProposalDiscussionThread>;
  proposalDiscussionThreadModeChangedEventByUniqueInput?: Maybe<ProposalDiscussionThreadModeChangedEvent>;
  proposalDiscussionThreadModeChangedEvents: Array<ProposalDiscussionThreadModeChangedEvent>;
  proposalDiscussionThreadModeChangedEventsConnection: ProposalDiscussionThreadModeChangedEventConnection;
  proposalDiscussionThreads: Array<ProposalDiscussionThread>;
  proposalDiscussionThreadsConnection: ProposalDiscussionThreadConnection;
  proposalDiscussionWhitelistByUniqueInput?: Maybe<ProposalDiscussionWhitelist>;
  proposalDiscussionWhitelists: Array<ProposalDiscussionWhitelist>;
  proposalDiscussionWhitelistsConnection: ProposalDiscussionWhitelistConnection;
  proposalExecutedEventByUniqueInput?: Maybe<ProposalExecutedEvent>;
  proposalExecutedEvents: Array<ProposalExecutedEvent>;
  proposalExecutedEventsConnection: ProposalExecutedEventConnection;
  proposalStatusUpdatedEventByUniqueInput?: Maybe<ProposalStatusUpdatedEvent>;
  proposalStatusUpdatedEvents: Array<ProposalStatusUpdatedEvent>;
  proposalStatusUpdatedEventsConnection: ProposalStatusUpdatedEventConnection;
  proposalVotedEventByUniqueInput?: Maybe<ProposalVotedEvent>;
  proposalVotedEvents: Array<ProposalVotedEvent>;
  proposalVotedEventsConnection: ProposalVotedEventConnection;
  proposals: Array<Proposal>;
  proposalsByDescription: Array<ProposalsByDescriptionFtsOutput>;
  proposalsByTitle: Array<ProposalsByTitleFtsOutput>;
  proposalsConnection: ProposalConnection;
  referendumFinishedEventByUniqueInput?: Maybe<ReferendumFinishedEvent>;
  referendumFinishedEvents: Array<ReferendumFinishedEvent>;
  referendumFinishedEventsConnection: ReferendumFinishedEventConnection;
  referendumStageRevealingOptionResultByUniqueInput?: Maybe<ReferendumStageRevealingOptionResult>;
  referendumStageRevealingOptionResults: Array<ReferendumStageRevealingOptionResult>;
  referendumStageRevealingOptionResultsConnection: ReferendumStageRevealingOptionResultConnection;
  referendumStartedEventByUniqueInput?: Maybe<ReferendumStartedEvent>;
  referendumStartedEvents: Array<ReferendumStartedEvent>;
  referendumStartedEventsConnection: ReferendumStartedEventConnection;
  referendumStartedForcefullyEventByUniqueInput?: Maybe<ReferendumStartedForcefullyEvent>;
  referendumStartedForcefullyEvents: Array<ReferendumStartedForcefullyEvent>;
  referendumStartedForcefullyEventsConnection: ReferendumStartedForcefullyEventConnection;
  referralCutUpdatedEventByUniqueInput?: Maybe<ReferralCutUpdatedEvent>;
  referralCutUpdatedEvents: Array<ReferralCutUpdatedEvent>;
  referralCutUpdatedEventsConnection: ReferralCutUpdatedEventConnection;
  requestFundedEventByUniqueInput?: Maybe<RequestFundedEvent>;
  requestFundedEvents: Array<RequestFundedEvent>;
  requestFundedEventsConnection: RequestFundedEventConnection;
  revealingStageStartedEventByUniqueInput?: Maybe<RevealingStageStartedEvent>;
  revealingStageStartedEvents: Array<RevealingStageStartedEvent>;
  revealingStageStartedEventsConnection: RevealingStageStartedEventConnection;
  rewardPaidEventByUniqueInput?: Maybe<RewardPaidEvent>;
  rewardPaidEvents: Array<RewardPaidEvent>;
  rewardPaidEventsConnection: RewardPaidEventConnection;
  rewardPaymentEventByUniqueInput?: Maybe<RewardPaymentEvent>;
  rewardPaymentEvents: Array<RewardPaymentEvent>;
  rewardPaymentEventsConnection: RewardPaymentEventConnection;
  runtimeWasmBytecodeByUniqueInput?: Maybe<RuntimeWasmBytecode>;
  runtimeWasmBytecodes: Array<RuntimeWasmBytecode>;
  runtimeWasmBytecodesConnection: RuntimeWasmBytecodeConnection;
  search: Array<SearchFtsOutput>;
  stakeDecreasedEventByUniqueInput?: Maybe<StakeDecreasedEvent>;
  stakeDecreasedEvents: Array<StakeDecreasedEvent>;
  stakeDecreasedEventsConnection: StakeDecreasedEventConnection;
  stakeIncreasedEventByUniqueInput?: Maybe<StakeIncreasedEvent>;
  stakeIncreasedEvents: Array<StakeIncreasedEvent>;
  stakeIncreasedEventsConnection: StakeIncreasedEventConnection;
  stakeReleasedEventByUniqueInput?: Maybe<StakeReleasedEvent>;
  stakeReleasedEvents: Array<StakeReleasedEvent>;
  stakeReleasedEventsConnection: StakeReleasedEventConnection;
  stakeSlashedEventByUniqueInput?: Maybe<StakeSlashedEvent>;
  stakeSlashedEvents: Array<StakeSlashedEvent>;
  stakeSlashedEventsConnection: StakeSlashedEventConnection;
  stakingAccountAddedEventByUniqueInput?: Maybe<StakingAccountAddedEvent>;
  stakingAccountAddedEvents: Array<StakingAccountAddedEvent>;
  stakingAccountAddedEventsConnection: StakingAccountAddedEventConnection;
  stakingAccountConfirmedEventByUniqueInput?: Maybe<StakingAccountConfirmedEvent>;
  stakingAccountConfirmedEvents: Array<StakingAccountConfirmedEvent>;
  stakingAccountConfirmedEventsConnection: StakingAccountConfirmedEventConnection;
  stakingAccountRemovedEventByUniqueInput?: Maybe<StakingAccountRemovedEvent>;
  stakingAccountRemovedEvents: Array<StakingAccountRemovedEvent>;
  stakingAccountRemovedEventsConnection: StakingAccountRemovedEventConnection;
  statusTextChangedEventByUniqueInput?: Maybe<StatusTextChangedEvent>;
  statusTextChangedEvents: Array<StatusTextChangedEvent>;
  statusTextChangedEventsConnection: StatusTextChangedEventConnection;
  terminatedLeaderEventByUniqueInput?: Maybe<TerminatedLeaderEvent>;
  terminatedLeaderEvents: Array<TerminatedLeaderEvent>;
  terminatedLeaderEventsConnection: TerminatedLeaderEventConnection;
  terminatedWorkerEventByUniqueInput?: Maybe<TerminatedWorkerEvent>;
  terminatedWorkerEvents: Array<TerminatedWorkerEvent>;
  terminatedWorkerEventsConnection: TerminatedWorkerEventConnection;
  threadCreatedEventByUniqueInput?: Maybe<ThreadCreatedEvent>;
  threadCreatedEvents: Array<ThreadCreatedEvent>;
  threadCreatedEventsConnection: ThreadCreatedEventConnection;
  threadDeletedEventByUniqueInput?: Maybe<ThreadDeletedEvent>;
  threadDeletedEvents: Array<ThreadDeletedEvent>;
  threadDeletedEventsConnection: ThreadDeletedEventConnection;
  threadMetadataUpdatedEventByUniqueInput?: Maybe<ThreadMetadataUpdatedEvent>;
  threadMetadataUpdatedEvents: Array<ThreadMetadataUpdatedEvent>;
  threadMetadataUpdatedEventsConnection: ThreadMetadataUpdatedEventConnection;
  threadModeratedEventByUniqueInput?: Maybe<ThreadModeratedEvent>;
  threadModeratedEvents: Array<ThreadModeratedEvent>;
  threadModeratedEventsConnection: ThreadModeratedEventConnection;
  threadMovedEventByUniqueInput?: Maybe<ThreadMovedEvent>;
  threadMovedEvents: Array<ThreadMovedEvent>;
  threadMovedEventsConnection: ThreadMovedEventConnection;
  threadsByTitle: Array<ThreadsByTitleFtsOutput>;
  upcomingWorkingGroupOpeningByUniqueInput?: Maybe<UpcomingWorkingGroupOpening>;
  upcomingWorkingGroupOpenings: Array<UpcomingWorkingGroupOpening>;
  upcomingWorkingGroupOpeningsConnection: UpcomingWorkingGroupOpeningConnection;
  videoByUniqueInput?: Maybe<Video>;
  videoCategories: Array<VideoCategory>;
  videoCategoriesByName: Array<VideoCategoriesByNameFtsOutput>;
  videoCategoriesConnection: VideoCategoryConnection;
  videoCategoryByUniqueInput?: Maybe<VideoCategory>;
  videoMediaEncodingByUniqueInput?: Maybe<VideoMediaEncoding>;
  videoMediaEncodings: Array<VideoMediaEncoding>;
  videoMediaEncodingsConnection: VideoMediaEncodingConnection;
  videoMediaMetadata: Array<VideoMediaMetadata>;
  videoMediaMetadataByUniqueInput?: Maybe<VideoMediaMetadata>;
  videoMediaMetadataConnection: VideoMediaMetadataConnection;
  videos: Array<Video>;
  videosConnection: VideoConnection;
  voteCastEventByUniqueInput?: Maybe<VoteCastEvent>;
  voteCastEvents: Array<VoteCastEvent>;
  voteCastEventsConnection: VoteCastEventConnection;
  voteOnPollEventByUniqueInput?: Maybe<VoteOnPollEvent>;
  voteOnPollEvents: Array<VoteOnPollEvent>;
  voteOnPollEventsConnection: VoteOnPollEventConnection;
  voteRevealedEventByUniqueInput?: Maybe<VoteRevealedEvent>;
  voteRevealedEvents: Array<VoteRevealedEvent>;
  voteRevealedEventsConnection: VoteRevealedEventConnection;
  votingPeriodStartedEventByUniqueInput?: Maybe<VotingPeriodStartedEvent>;
  votingPeriodStartedEvents: Array<VotingPeriodStartedEvent>;
  votingPeriodStartedEventsConnection: VotingPeriodStartedEventConnection;
  workerByUniqueInput?: Maybe<Worker>;
  workerExitedEventByUniqueInput?: Maybe<WorkerExitedEvent>;
  workerExitedEvents: Array<WorkerExitedEvent>;
  workerExitedEventsConnection: WorkerExitedEventConnection;
  workerRewardAccountUpdatedEventByUniqueInput?: Maybe<WorkerRewardAccountUpdatedEvent>;
  workerRewardAccountUpdatedEvents: Array<WorkerRewardAccountUpdatedEvent>;
  workerRewardAccountUpdatedEventsConnection: WorkerRewardAccountUpdatedEventConnection;
  workerRewardAmountUpdatedEventByUniqueInput?: Maybe<WorkerRewardAmountUpdatedEvent>;
  workerRewardAmountUpdatedEvents: Array<WorkerRewardAmountUpdatedEvent>;
  workerRewardAmountUpdatedEventsConnection: WorkerRewardAmountUpdatedEventConnection;
  workerRoleAccountUpdatedEventByUniqueInput?: Maybe<WorkerRoleAccountUpdatedEvent>;
  workerRoleAccountUpdatedEvents: Array<WorkerRoleAccountUpdatedEvent>;
  workerRoleAccountUpdatedEventsConnection: WorkerRoleAccountUpdatedEventConnection;
  workerStartedLeavingEventByUniqueInput?: Maybe<WorkerStartedLeavingEvent>;
  workerStartedLeavingEvents: Array<WorkerStartedLeavingEvent>;
  workerStartedLeavingEventsConnection: WorkerStartedLeavingEventConnection;
  workers: Array<Worker>;
  workersConnection: WorkerConnection;
  workingGroupApplicationByUniqueInput?: Maybe<WorkingGroupApplication>;
  workingGroupApplications: Array<WorkingGroupApplication>;
  workingGroupApplicationsConnection: WorkingGroupApplicationConnection;
  workingGroupByUniqueInput?: Maybe<WorkingGroup>;
  workingGroupMetadata: Array<WorkingGroupMetadata>;
  workingGroupMetadataByUniqueInput?: Maybe<WorkingGroupMetadata>;
  workingGroupMetadataConnection: WorkingGroupMetadataConnection;
  workingGroupOpeningByUniqueInput?: Maybe<WorkingGroupOpening>;
  workingGroupOpeningMetadata: Array<WorkingGroupOpeningMetadata>;
  workingGroupOpeningMetadataByUniqueInput?: Maybe<WorkingGroupOpeningMetadata>;
  workingGroupOpeningMetadataConnection: WorkingGroupOpeningMetadataConnection;
  workingGroupOpenings: Array<WorkingGroupOpening>;
  workingGroupOpeningsConnection: WorkingGroupOpeningConnection;
  workingGroups: Array<WorkingGroup>;
  workingGroupsConnection: WorkingGroupConnection;
};


export type QueryAnnouncingPeriodStartedEventByUniqueInputArgs = {
  where: AnnouncingPeriodStartedEventWhereUniqueInput;
};


export type QueryAnnouncingPeriodStartedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AnnouncingPeriodStartedEventOrderByInput>>;
  where?: Maybe<AnnouncingPeriodStartedEventWhereInput>;
};


export type QueryAnnouncingPeriodStartedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AnnouncingPeriodStartedEventOrderByInput>>;
  where?: Maybe<AnnouncingPeriodStartedEventWhereInput>;
};


export type QueryApplicationFormQuestionAnswerByUniqueInputArgs = {
  where: ApplicationFormQuestionAnswerWhereUniqueInput;
};


export type QueryApplicationFormQuestionAnswersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationFormQuestionAnswerOrderByInput>>;
  where?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
};


export type QueryApplicationFormQuestionAnswersConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationFormQuestionAnswerOrderByInput>>;
  where?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
};


export type QueryApplicationFormQuestionByUniqueInputArgs = {
  where: ApplicationFormQuestionWhereUniqueInput;
};


export type QueryApplicationFormQuestionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationFormQuestionOrderByInput>>;
  where?: Maybe<ApplicationFormQuestionWhereInput>;
};


export type QueryApplicationFormQuestionsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationFormQuestionOrderByInput>>;
  where?: Maybe<ApplicationFormQuestionWhereInput>;
};


export type QueryApplicationWithdrawnEventByUniqueInputArgs = {
  where: ApplicationWithdrawnEventWhereUniqueInput;
};


export type QueryApplicationWithdrawnEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationWithdrawnEventOrderByInput>>;
  where?: Maybe<ApplicationWithdrawnEventWhereInput>;
};


export type QueryApplicationWithdrawnEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ApplicationWithdrawnEventOrderByInput>>;
  where?: Maybe<ApplicationWithdrawnEventWhereInput>;
};


export type QueryAppliedOnOpeningEventByUniqueInputArgs = {
  where: AppliedOnOpeningEventWhereUniqueInput;
};


export type QueryAppliedOnOpeningEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AppliedOnOpeningEventOrderByInput>>;
  where?: Maybe<AppliedOnOpeningEventWhereInput>;
};


export type QueryAppliedOnOpeningEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AppliedOnOpeningEventOrderByInput>>;
  where?: Maybe<AppliedOnOpeningEventWhereInput>;
};


export type QueryBudgetBalanceSetEventByUniqueInputArgs = {
  where: BudgetBalanceSetEventWhereUniqueInput;
};


export type QueryBudgetBalanceSetEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetBalanceSetEventOrderByInput>>;
  where?: Maybe<BudgetBalanceSetEventWhereInput>;
};


export type QueryBudgetBalanceSetEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetBalanceSetEventOrderByInput>>;
  where?: Maybe<BudgetBalanceSetEventWhereInput>;
};


export type QueryBudgetIncrementUpdatedEventByUniqueInputArgs = {
  where: BudgetIncrementUpdatedEventWhereUniqueInput;
};


export type QueryBudgetIncrementUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetIncrementUpdatedEventOrderByInput>>;
  where?: Maybe<BudgetIncrementUpdatedEventWhereInput>;
};


export type QueryBudgetIncrementUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetIncrementUpdatedEventOrderByInput>>;
  where?: Maybe<BudgetIncrementUpdatedEventWhereInput>;
};


export type QueryBudgetRefillEventByUniqueInputArgs = {
  where: BudgetRefillEventWhereUniqueInput;
};


export type QueryBudgetRefillEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetRefillEventOrderByInput>>;
  where?: Maybe<BudgetRefillEventWhereInput>;
};


export type QueryBudgetRefillEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetRefillEventOrderByInput>>;
  where?: Maybe<BudgetRefillEventWhereInput>;
};


export type QueryBudgetRefillPlannedEventByUniqueInputArgs = {
  where: BudgetRefillPlannedEventWhereUniqueInput;
};


export type QueryBudgetRefillPlannedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetRefillPlannedEventOrderByInput>>;
  where?: Maybe<BudgetRefillPlannedEventWhereInput>;
};


export type QueryBudgetRefillPlannedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetRefillPlannedEventOrderByInput>>;
  where?: Maybe<BudgetRefillPlannedEventWhereInput>;
};


export type QueryBudgetSetEventByUniqueInputArgs = {
  where: BudgetSetEventWhereUniqueInput;
};


export type QueryBudgetSetEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetSetEventOrderByInput>>;
  where?: Maybe<BudgetSetEventWhereInput>;
};


export type QueryBudgetSetEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetSetEventOrderByInput>>;
  where?: Maybe<BudgetSetEventWhereInput>;
};


export type QueryBudgetSpendingEventByUniqueInputArgs = {
  where: BudgetSpendingEventWhereUniqueInput;
};


export type QueryBudgetSpendingEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetSpendingEventOrderByInput>>;
  where?: Maybe<BudgetSpendingEventWhereInput>;
};


export type QueryBudgetSpendingEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<BudgetSpendingEventOrderByInput>>;
  where?: Maybe<BudgetSpendingEventWhereInput>;
};


export type QueryCandidacyNoteMetadataArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyNoteMetadataOrderByInput>>;
  where?: Maybe<CandidacyNoteMetadataWhereInput>;
};


export type QueryCandidacyNoteMetadataByUniqueInputArgs = {
  where: CandidacyNoteMetadataWhereUniqueInput;
};


export type QueryCandidacyNoteMetadataConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyNoteMetadataOrderByInput>>;
  where?: Maybe<CandidacyNoteMetadataWhereInput>;
};


export type QueryCandidacyNoteSetEventByUniqueInputArgs = {
  where: CandidacyNoteSetEventWhereUniqueInput;
};


export type QueryCandidacyNoteSetEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyNoteSetEventOrderByInput>>;
  where?: Maybe<CandidacyNoteSetEventWhereInput>;
};


export type QueryCandidacyNoteSetEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyNoteSetEventOrderByInput>>;
  where?: Maybe<CandidacyNoteSetEventWhereInput>;
};


export type QueryCandidacyStakeReleaseEventByUniqueInputArgs = {
  where: CandidacyStakeReleaseEventWhereUniqueInput;
};


export type QueryCandidacyStakeReleaseEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyStakeReleaseEventOrderByInput>>;
  where?: Maybe<CandidacyStakeReleaseEventWhereInput>;
};


export type QueryCandidacyStakeReleaseEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyStakeReleaseEventOrderByInput>>;
  where?: Maybe<CandidacyStakeReleaseEventWhereInput>;
};


export type QueryCandidacyWithdrawEventByUniqueInputArgs = {
  where: CandidacyWithdrawEventWhereUniqueInput;
};


export type QueryCandidacyWithdrawEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyWithdrawEventOrderByInput>>;
  where?: Maybe<CandidacyWithdrawEventWhereInput>;
};


export type QueryCandidacyWithdrawEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidacyWithdrawEventOrderByInput>>;
  where?: Maybe<CandidacyWithdrawEventWhereInput>;
};


export type QueryCandidateByUniqueInputArgs = {
  where: CandidateWhereUniqueInput;
};


export type QueryCandidatesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidateOrderByInput>>;
  where?: Maybe<CandidateWhereInput>;
};


export type QueryCandidatesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CandidateOrderByInput>>;
  where?: Maybe<CandidateWhereInput>;
};


export type QueryCastVoteByUniqueInputArgs = {
  where: CastVoteWhereUniqueInput;
};


export type QueryCastVotesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CastVoteOrderByInput>>;
  where?: Maybe<CastVoteWhereInput>;
};


export type QueryCastVotesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CastVoteOrderByInput>>;
  where?: Maybe<CastVoteWhereInput>;
};


export type QueryCategoryArchivalStatusUpdatedEventByUniqueInputArgs = {
  where: CategoryArchivalStatusUpdatedEventWhereUniqueInput;
};


export type QueryCategoryArchivalStatusUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryArchivalStatusUpdatedEventOrderByInput>>;
  where?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
};


export type QueryCategoryArchivalStatusUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryArchivalStatusUpdatedEventOrderByInput>>;
  where?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
};


export type QueryCategoryCreatedEventByUniqueInputArgs = {
  where: CategoryCreatedEventWhereUniqueInput;
};


export type QueryCategoryCreatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryCreatedEventOrderByInput>>;
  where?: Maybe<CategoryCreatedEventWhereInput>;
};


export type QueryCategoryCreatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryCreatedEventOrderByInput>>;
  where?: Maybe<CategoryCreatedEventWhereInput>;
};


export type QueryCategoryDeletedEventByUniqueInputArgs = {
  where: CategoryDeletedEventWhereUniqueInput;
};


export type QueryCategoryDeletedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryDeletedEventOrderByInput>>;
  where?: Maybe<CategoryDeletedEventWhereInput>;
};


export type QueryCategoryDeletedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryDeletedEventOrderByInput>>;
  where?: Maybe<CategoryDeletedEventWhereInput>;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventByUniqueInputArgs = {
  where: CategoryMembershipOfModeratorUpdatedEventWhereUniqueInput;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventOrderByInput>>;
  where?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
};


export type QueryCategoryMembershipOfModeratorUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEventOrderByInput>>;
  where?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
};


export type QueryCategoryStickyThreadUpdateEventByUniqueInputArgs = {
  where: CategoryStickyThreadUpdateEventWhereUniqueInput;
};


export type QueryCategoryStickyThreadUpdateEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryStickyThreadUpdateEventOrderByInput>>;
  where?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
};


export type QueryCategoryStickyThreadUpdateEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CategoryStickyThreadUpdateEventOrderByInput>>;
  where?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
};


export type QueryChannelByUniqueInputArgs = {
  where: ChannelWhereUniqueInput;
};


export type QueryChannelCategoriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ChannelCategoryOrderByInput>>;
  where?: Maybe<ChannelCategoryWhereInput>;
};


export type QueryChannelCategoriesByNameArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereChannelCategory?: Maybe<ChannelCategoryWhereInput>;
};


export type QueryChannelCategoriesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ChannelCategoryOrderByInput>>;
  where?: Maybe<ChannelCategoryWhereInput>;
};


export type QueryChannelCategoryByUniqueInputArgs = {
  where: ChannelCategoryWhereUniqueInput;
};


export type QueryChannelsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ChannelOrderByInput>>;
  where?: Maybe<ChannelWhereInput>;
};


export type QueryChannelsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ChannelOrderByInput>>;
  where?: Maybe<ChannelWhereInput>;
};


export type QueryCouncilMemberByUniqueInputArgs = {
  where: CouncilMemberWhereUniqueInput;
};


export type QueryCouncilMembersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilMemberOrderByInput>>;
  where?: Maybe<CouncilMemberWhereInput>;
};


export type QueryCouncilMembersConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilMemberOrderByInput>>;
  where?: Maybe<CouncilMemberWhereInput>;
};


export type QueryCouncilStageUpdateByUniqueInputArgs = {
  where: CouncilStageUpdateWhereUniqueInput;
};


export type QueryCouncilStageUpdatesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilStageUpdateOrderByInput>>;
  where?: Maybe<CouncilStageUpdateWhereInput>;
};


export type QueryCouncilStageUpdatesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilStageUpdateOrderByInput>>;
  where?: Maybe<CouncilStageUpdateWhereInput>;
};


export type QueryCouncilorRewardUpdatedEventByUniqueInputArgs = {
  where: CouncilorRewardUpdatedEventWhereUniqueInput;
};


export type QueryCouncilorRewardUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilorRewardUpdatedEventOrderByInput>>;
  where?: Maybe<CouncilorRewardUpdatedEventWhereInput>;
};


export type QueryCouncilorRewardUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CouncilorRewardUpdatedEventOrderByInput>>;
  where?: Maybe<CouncilorRewardUpdatedEventWhereInput>;
};


export type QueryCuratorGroupByUniqueInputArgs = {
  where: CuratorGroupWhereUniqueInput;
};


export type QueryCuratorGroupsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CuratorGroupOrderByInput>>;
  where?: Maybe<CuratorGroupWhereInput>;
};


export type QueryCuratorGroupsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CuratorGroupOrderByInput>>;
  where?: Maybe<CuratorGroupWhereInput>;
};


export type QueryDataObjectByUniqueInputArgs = {
  where: DataObjectWhereUniqueInput;
};


export type QueryDataObjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DataObjectOrderByInput>>;
  where?: Maybe<DataObjectWhereInput>;
};


export type QueryDataObjectsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<DataObjectOrderByInput>>;
  where?: Maybe<DataObjectWhereInput>;
};


export type QueryElectedCouncilByUniqueInputArgs = {
  where: ElectedCouncilWhereUniqueInput;
};


export type QueryElectedCouncilsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ElectedCouncilOrderByInput>>;
  where?: Maybe<ElectedCouncilWhereInput>;
};


export type QueryElectedCouncilsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ElectedCouncilOrderByInput>>;
  where?: Maybe<ElectedCouncilWhereInput>;
};


export type QueryElectionRoundByUniqueInputArgs = {
  where: ElectionRoundWhereUniqueInput;
};


export type QueryElectionRoundsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ElectionRoundOrderByInput>>;
  where?: Maybe<ElectionRoundWhereInput>;
};


export type QueryElectionRoundsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ElectionRoundOrderByInput>>;
  where?: Maybe<ElectionRoundWhereInput>;
};


export type QueryEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<EventOrderByInput>>;
  where?: Maybe<EventWhereInput>;
};


export type QueryForumCategoriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumCategoryOrderByInput>>;
  where?: Maybe<ForumCategoryWhereInput>;
};


export type QueryForumCategoriesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumCategoryOrderByInput>>;
  where?: Maybe<ForumCategoryWhereInput>;
};


export type QueryForumCategoryByUniqueInputArgs = {
  where: ForumCategoryWhereUniqueInput;
};


export type QueryForumPollAlternativeByUniqueInputArgs = {
  where: ForumPollAlternativeWhereUniqueInput;
};


export type QueryForumPollAlternativesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPollAlternativeOrderByInput>>;
  where?: Maybe<ForumPollAlternativeWhereInput>;
};


export type QueryForumPollAlternativesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPollAlternativeOrderByInput>>;
  where?: Maybe<ForumPollAlternativeWhereInput>;
};


export type QueryForumPollByUniqueInputArgs = {
  where: ForumPollWhereUniqueInput;
};


export type QueryForumPollsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPollOrderByInput>>;
  where?: Maybe<ForumPollWhereInput>;
};


export type QueryForumPollsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPollOrderByInput>>;
  where?: Maybe<ForumPollWhereInput>;
};


export type QueryForumPostByUniqueInputArgs = {
  where: ForumPostWhereUniqueInput;
};


export type QueryForumPostReactionByUniqueInputArgs = {
  where: ForumPostReactionWhereUniqueInput;
};


export type QueryForumPostReactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPostReactionOrderByInput>>;
  where?: Maybe<ForumPostReactionWhereInput>;
};


export type QueryForumPostReactionsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPostReactionOrderByInput>>;
  where?: Maybe<ForumPostReactionWhereInput>;
};


export type QueryForumPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPostOrderByInput>>;
  where?: Maybe<ForumPostWhereInput>;
};


export type QueryForumPostsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumPostOrderByInput>>;
  where?: Maybe<ForumPostWhereInput>;
};


export type QueryForumThreadByUniqueInputArgs = {
  where: ForumThreadWhereUniqueInput;
};


export type QueryForumThreadTagByUniqueInputArgs = {
  where: ForumThreadTagWhereUniqueInput;
};


export type QueryForumThreadTagsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumThreadTagOrderByInput>>;
  where?: Maybe<ForumThreadTagWhereInput>;
};


export type QueryForumThreadTagsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumThreadTagOrderByInput>>;
  where?: Maybe<ForumThreadTagWhereInput>;
};


export type QueryForumThreadsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumThreadOrderByInput>>;
  where?: Maybe<ForumThreadWhereInput>;
};


export type QueryForumThreadsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ForumThreadOrderByInput>>;
  where?: Maybe<ForumThreadWhereInput>;
};


export type QueryFundingRequestDestinationByUniqueInputArgs = {
  where: FundingRequestDestinationWhereUniqueInput;
};


export type QueryFundingRequestDestinationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<FundingRequestDestinationOrderByInput>>;
  where?: Maybe<FundingRequestDestinationWhereInput>;
};


export type QueryFundingRequestDestinationsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<FundingRequestDestinationOrderByInput>>;
  where?: Maybe<FundingRequestDestinationWhereInput>;
};


export type QueryFundingRequestDestinationsListByUniqueInputArgs = {
  where: FundingRequestDestinationsListWhereUniqueInput;
};


export type QueryFundingRequestDestinationsListsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<FundingRequestDestinationsListOrderByInput>>;
  where?: Maybe<FundingRequestDestinationsListWhereInput>;
};


export type QueryFundingRequestDestinationsListsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<FundingRequestDestinationsListOrderByInput>>;
  where?: Maybe<FundingRequestDestinationsListWhereInput>;
};


export type QueryInitialInvitationBalanceUpdatedEventByUniqueInputArgs = {
  where: InitialInvitationBalanceUpdatedEventWhereUniqueInput;
};


export type QueryInitialInvitationBalanceUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InitialInvitationBalanceUpdatedEventOrderByInput>>;
  where?: Maybe<InitialInvitationBalanceUpdatedEventWhereInput>;
};


export type QueryInitialInvitationBalanceUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InitialInvitationBalanceUpdatedEventOrderByInput>>;
  where?: Maybe<InitialInvitationBalanceUpdatedEventWhereInput>;
};


export type QueryInitialInvitationCountUpdatedEventByUniqueInputArgs = {
  where: InitialInvitationCountUpdatedEventWhereUniqueInput;
};


export type QueryInitialInvitationCountUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InitialInvitationCountUpdatedEventOrderByInput>>;
  where?: Maybe<InitialInvitationCountUpdatedEventWhereInput>;
};


export type QueryInitialInvitationCountUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InitialInvitationCountUpdatedEventOrderByInput>>;
  where?: Maybe<InitialInvitationCountUpdatedEventWhereInput>;
};


export type QueryInvitesTransferredEventByUniqueInputArgs = {
  where: InvitesTransferredEventWhereUniqueInput;
};


export type QueryInvitesTransferredEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InvitesTransferredEventOrderByInput>>;
  where?: Maybe<InvitesTransferredEventWhereInput>;
};


export type QueryInvitesTransferredEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<InvitesTransferredEventOrderByInput>>;
  where?: Maybe<InvitesTransferredEventWhereInput>;
};


export type QueryLanguageByUniqueInputArgs = {
  where: LanguageWhereUniqueInput;
};


export type QueryLanguagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LanguageOrderByInput>>;
  where?: Maybe<LanguageWhereInput>;
};


export type QueryLanguagesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LanguageOrderByInput>>;
  where?: Maybe<LanguageWhereInput>;
};


export type QueryLeaderInvitationQuotaUpdatedEventByUniqueInputArgs = {
  where: LeaderInvitationQuotaUpdatedEventWhereUniqueInput;
};


export type QueryLeaderInvitationQuotaUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderInvitationQuotaUpdatedEventOrderByInput>>;
  where?: Maybe<LeaderInvitationQuotaUpdatedEventWhereInput>;
};


export type QueryLeaderInvitationQuotaUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderInvitationQuotaUpdatedEventOrderByInput>>;
  where?: Maybe<LeaderInvitationQuotaUpdatedEventWhereInput>;
};


export type QueryLeaderSetEventByUniqueInputArgs = {
  where: LeaderSetEventWhereUniqueInput;
};


export type QueryLeaderSetEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderSetEventOrderByInput>>;
  where?: Maybe<LeaderSetEventWhereInput>;
};


export type QueryLeaderSetEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderSetEventOrderByInput>>;
  where?: Maybe<LeaderSetEventWhereInput>;
};


export type QueryLeaderUnsetEventByUniqueInputArgs = {
  where: LeaderUnsetEventWhereUniqueInput;
};


export type QueryLeaderUnsetEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderUnsetEventOrderByInput>>;
  where?: Maybe<LeaderUnsetEventWhereInput>;
};


export type QueryLeaderUnsetEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LeaderUnsetEventOrderByInput>>;
  where?: Maybe<LeaderUnsetEventWhereInput>;
};


export type QueryLicenseByUniqueInputArgs = {
  where: LicenseWhereUniqueInput;
};


export type QueryLicensesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LicenseOrderByInput>>;
  where?: Maybe<LicenseWhereInput>;
};


export type QueryLicensesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<LicenseOrderByInput>>;
  where?: Maybe<LicenseWhereInput>;
};


export type QueryMemberAccountsUpdatedEventByUniqueInputArgs = {
  where: MemberAccountsUpdatedEventWhereUniqueInput;
};


export type QueryMemberAccountsUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberAccountsUpdatedEventOrderByInput>>;
  where?: Maybe<MemberAccountsUpdatedEventWhereInput>;
};


export type QueryMemberAccountsUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberAccountsUpdatedEventOrderByInput>>;
  where?: Maybe<MemberAccountsUpdatedEventWhereInput>;
};


export type QueryMemberInvitedEventByUniqueInputArgs = {
  where: MemberInvitedEventWhereUniqueInput;
};


export type QueryMemberInvitedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberInvitedEventOrderByInput>>;
  where?: Maybe<MemberInvitedEventWhereInput>;
};


export type QueryMemberInvitedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberInvitedEventOrderByInput>>;
  where?: Maybe<MemberInvitedEventWhereInput>;
};


export type QueryMemberMetadataArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberMetadataOrderByInput>>;
  where?: Maybe<MemberMetadataWhereInput>;
};


export type QueryMemberMetadataByUniqueInputArgs = {
  where: MemberMetadataWhereUniqueInput;
};


export type QueryMemberMetadataConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberMetadataOrderByInput>>;
  where?: Maybe<MemberMetadataWhereInput>;
};


export type QueryMemberProfileUpdatedEventByUniqueInputArgs = {
  where: MemberProfileUpdatedEventWhereUniqueInput;
};


export type QueryMemberProfileUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberProfileUpdatedEventOrderByInput>>;
  where?: Maybe<MemberProfileUpdatedEventWhereInput>;
};


export type QueryMemberProfileUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberProfileUpdatedEventOrderByInput>>;
  where?: Maybe<MemberProfileUpdatedEventWhereInput>;
};


export type QueryMemberVerificationStatusUpdatedEventByUniqueInputArgs = {
  where: MemberVerificationStatusUpdatedEventWhereUniqueInput;
};


export type QueryMemberVerificationStatusUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberVerificationStatusUpdatedEventOrderByInput>>;
  where?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
};


export type QueryMemberVerificationStatusUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MemberVerificationStatusUpdatedEventOrderByInput>>;
  where?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
};


export type QueryMembersByHandleArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereMembership?: Maybe<MembershipWhereInput>;
};


export type QueryMembershipBoughtEventByUniqueInputArgs = {
  where: MembershipBoughtEventWhereUniqueInput;
};


export type QueryMembershipBoughtEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipBoughtEventOrderByInput>>;
  where?: Maybe<MembershipBoughtEventWhereInput>;
};


export type QueryMembershipBoughtEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipBoughtEventOrderByInput>>;
  where?: Maybe<MembershipBoughtEventWhereInput>;
};


export type QueryMembershipByUniqueInputArgs = {
  where: MembershipWhereUniqueInput;
};


export type QueryMembershipPriceUpdatedEventByUniqueInputArgs = {
  where: MembershipPriceUpdatedEventWhereUniqueInput;
};


export type QueryMembershipPriceUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipPriceUpdatedEventOrderByInput>>;
  where?: Maybe<MembershipPriceUpdatedEventWhereInput>;
};


export type QueryMembershipPriceUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipPriceUpdatedEventOrderByInput>>;
  where?: Maybe<MembershipPriceUpdatedEventWhereInput>;
};


export type QueryMembershipSystemSnapshotByUniqueInputArgs = {
  where: MembershipSystemSnapshotWhereUniqueInput;
};


export type QueryMembershipSystemSnapshotsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipSystemSnapshotOrderByInput>>;
  where?: Maybe<MembershipSystemSnapshotWhereInput>;
};


export type QueryMembershipSystemSnapshotsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipSystemSnapshotOrderByInput>>;
  where?: Maybe<MembershipSystemSnapshotWhereInput>;
};


export type QueryMembershipsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipOrderByInput>>;
  where?: Maybe<MembershipWhereInput>;
};


export type QueryMembershipsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<MembershipOrderByInput>>;
  where?: Maybe<MembershipWhereInput>;
};


export type QueryNewCandidateEventByUniqueInputArgs = {
  where: NewCandidateEventWhereUniqueInput;
};


export type QueryNewCandidateEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCandidateEventOrderByInput>>;
  where?: Maybe<NewCandidateEventWhereInput>;
};


export type QueryNewCandidateEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCandidateEventOrderByInput>>;
  where?: Maybe<NewCandidateEventWhereInput>;
};


export type QueryNewCouncilElectedEventByUniqueInputArgs = {
  where: NewCouncilElectedEventWhereUniqueInput;
};


export type QueryNewCouncilElectedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCouncilElectedEventOrderByInput>>;
  where?: Maybe<NewCouncilElectedEventWhereInput>;
};


export type QueryNewCouncilElectedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCouncilElectedEventOrderByInput>>;
  where?: Maybe<NewCouncilElectedEventWhereInput>;
};


export type QueryNewCouncilNotElectedEventByUniqueInputArgs = {
  where: NewCouncilNotElectedEventWhereUniqueInput;
};


export type QueryNewCouncilNotElectedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCouncilNotElectedEventOrderByInput>>;
  where?: Maybe<NewCouncilNotElectedEventWhereInput>;
};


export type QueryNewCouncilNotElectedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewCouncilNotElectedEventOrderByInput>>;
  where?: Maybe<NewCouncilNotElectedEventWhereInput>;
};


export type QueryNewMissedRewardLevelReachedEventByUniqueInputArgs = {
  where: NewMissedRewardLevelReachedEventWhereUniqueInput;
};


export type QueryNewMissedRewardLevelReachedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewMissedRewardLevelReachedEventOrderByInput>>;
  where?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
};


export type QueryNewMissedRewardLevelReachedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NewMissedRewardLevelReachedEventOrderByInput>>;
  where?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
};


export type QueryNotEnoughCandidatesEventByUniqueInputArgs = {
  where: NotEnoughCandidatesEventWhereUniqueInput;
};


export type QueryNotEnoughCandidatesEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NotEnoughCandidatesEventOrderByInput>>;
  where?: Maybe<NotEnoughCandidatesEventWhereInput>;
};


export type QueryNotEnoughCandidatesEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<NotEnoughCandidatesEventOrderByInput>>;
  where?: Maybe<NotEnoughCandidatesEventWhereInput>;
};


export type QueryOpeningAddedEventByUniqueInputArgs = {
  where: OpeningAddedEventWhereUniqueInput;
};


export type QueryOpeningAddedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningAddedEventOrderByInput>>;
  where?: Maybe<OpeningAddedEventWhereInput>;
};


export type QueryOpeningAddedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningAddedEventOrderByInput>>;
  where?: Maybe<OpeningAddedEventWhereInput>;
};


export type QueryOpeningCanceledEventByUniqueInputArgs = {
  where: OpeningCanceledEventWhereUniqueInput;
};


export type QueryOpeningCanceledEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningCanceledEventOrderByInput>>;
  where?: Maybe<OpeningCanceledEventWhereInput>;
};


export type QueryOpeningCanceledEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningCanceledEventOrderByInput>>;
  where?: Maybe<OpeningCanceledEventWhereInput>;
};


export type QueryOpeningFilledEventByUniqueInputArgs = {
  where: OpeningFilledEventWhereUniqueInput;
};


export type QueryOpeningFilledEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningFilledEventOrderByInput>>;
  where?: Maybe<OpeningFilledEventWhereInput>;
};


export type QueryOpeningFilledEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OpeningFilledEventOrderByInput>>;
  where?: Maybe<OpeningFilledEventWhereInput>;
};


export type QueryPostAddedEventByUniqueInputArgs = {
  where: PostAddedEventWhereUniqueInput;
};


export type QueryPostAddedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostAddedEventOrderByInput>>;
  where?: Maybe<PostAddedEventWhereInput>;
};


export type QueryPostAddedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostAddedEventOrderByInput>>;
  where?: Maybe<PostAddedEventWhereInput>;
};


export type QueryPostDeletedEventByUniqueInputArgs = {
  where: PostDeletedEventWhereUniqueInput;
};


export type QueryPostDeletedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostDeletedEventOrderByInput>>;
  where?: Maybe<PostDeletedEventWhereInput>;
};


export type QueryPostDeletedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostDeletedEventOrderByInput>>;
  where?: Maybe<PostDeletedEventWhereInput>;
};


export type QueryPostModeratedEventByUniqueInputArgs = {
  where: PostModeratedEventWhereUniqueInput;
};


export type QueryPostModeratedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostModeratedEventOrderByInput>>;
  where?: Maybe<PostModeratedEventWhereInput>;
};


export type QueryPostModeratedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostModeratedEventOrderByInput>>;
  where?: Maybe<PostModeratedEventWhereInput>;
};


export type QueryPostReactedEventByUniqueInputArgs = {
  where: PostReactedEventWhereUniqueInput;
};


export type QueryPostReactedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostReactedEventOrderByInput>>;
  where?: Maybe<PostReactedEventWhereInput>;
};


export type QueryPostReactedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostReactedEventOrderByInput>>;
  where?: Maybe<PostReactedEventWhereInput>;
};


export type QueryPostTextUpdatedEventByUniqueInputArgs = {
  where: PostTextUpdatedEventWhereUniqueInput;
};


export type QueryPostTextUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostTextUpdatedEventOrderByInput>>;
  where?: Maybe<PostTextUpdatedEventWhereInput>;
};


export type QueryPostTextUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<PostTextUpdatedEventOrderByInput>>;
  where?: Maybe<PostTextUpdatedEventWhereInput>;
};


export type QueryPostsByTextArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereForumPost?: Maybe<ForumPostWhereInput>;
};


export type QueryProposalByUniqueInputArgs = {
  where: ProposalWhereUniqueInput;
};


export type QueryProposalCancelledEventByUniqueInputArgs = {
  where: ProposalCancelledEventWhereUniqueInput;
};


export type QueryProposalCancelledEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalCancelledEventOrderByInput>>;
  where?: Maybe<ProposalCancelledEventWhereInput>;
};


export type QueryProposalCancelledEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalCancelledEventOrderByInput>>;
  where?: Maybe<ProposalCancelledEventWhereInput>;
};


export type QueryProposalCreatedEventByUniqueInputArgs = {
  where: ProposalCreatedEventWhereUniqueInput;
};


export type QueryProposalCreatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalCreatedEventOrderByInput>>;
  where?: Maybe<ProposalCreatedEventWhereInput>;
};


export type QueryProposalCreatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalCreatedEventOrderByInput>>;
  where?: Maybe<ProposalCreatedEventWhereInput>;
};


export type QueryProposalDecisionMadeEventByUniqueInputArgs = {
  where: ProposalDecisionMadeEventWhereUniqueInput;
};


export type QueryProposalDecisionMadeEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDecisionMadeEventOrderByInput>>;
  where?: Maybe<ProposalDecisionMadeEventWhereInput>;
};


export type QueryProposalDecisionMadeEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDecisionMadeEventOrderByInput>>;
  where?: Maybe<ProposalDecisionMadeEventWhereInput>;
};


export type QueryProposalDiscussionPostByUniqueInputArgs = {
  where: ProposalDiscussionPostWhereUniqueInput;
};


export type QueryProposalDiscussionPostCreatedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostCreatedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostCreatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostCreatedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
};


export type QueryProposalDiscussionPostCreatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostCreatedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostCreatedEventWhereInput>;
};


export type QueryProposalDiscussionPostDeletedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostDeletedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostDeletedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostDeletedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
};


export type QueryProposalDiscussionPostDeletedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostDeletedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostDeletedEventWhereInput>;
};


export type QueryProposalDiscussionPostUpdatedEventByUniqueInputArgs = {
  where: ProposalDiscussionPostUpdatedEventWhereUniqueInput;
};


export type QueryProposalDiscussionPostUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostUpdatedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
};


export type QueryProposalDiscussionPostUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostUpdatedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostUpdatedEventWhereInput>;
};


export type QueryProposalDiscussionPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostWhereInput>;
};


export type QueryProposalDiscussionPostsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionPostOrderByInput>>;
  where?: Maybe<ProposalDiscussionPostWhereInput>;
};


export type QueryProposalDiscussionThreadByUniqueInputArgs = {
  where: ProposalDiscussionThreadWhereUniqueInput;
};


export type QueryProposalDiscussionThreadModeChangedEventByUniqueInputArgs = {
  where: ProposalDiscussionThreadModeChangedEventWhereUniqueInput;
};


export type QueryProposalDiscussionThreadModeChangedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadModeChangedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
};


export type QueryProposalDiscussionThreadModeChangedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadModeChangedEventOrderByInput>>;
  where?: Maybe<ProposalDiscussionThreadModeChangedEventWhereInput>;
};


export type QueryProposalDiscussionThreadsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadOrderByInput>>;
  where?: Maybe<ProposalDiscussionThreadWhereInput>;
};


export type QueryProposalDiscussionThreadsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionThreadOrderByInput>>;
  where?: Maybe<ProposalDiscussionThreadWhereInput>;
};


export type QueryProposalDiscussionWhitelistByUniqueInputArgs = {
  where: ProposalDiscussionWhitelistWhereUniqueInput;
};


export type QueryProposalDiscussionWhitelistsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionWhitelistOrderByInput>>;
  where?: Maybe<ProposalDiscussionWhitelistWhereInput>;
};


export type QueryProposalDiscussionWhitelistsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalDiscussionWhitelistOrderByInput>>;
  where?: Maybe<ProposalDiscussionWhitelistWhereInput>;
};


export type QueryProposalExecutedEventByUniqueInputArgs = {
  where: ProposalExecutedEventWhereUniqueInput;
};


export type QueryProposalExecutedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalExecutedEventOrderByInput>>;
  where?: Maybe<ProposalExecutedEventWhereInput>;
};


export type QueryProposalExecutedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalExecutedEventOrderByInput>>;
  where?: Maybe<ProposalExecutedEventWhereInput>;
};


export type QueryProposalStatusUpdatedEventByUniqueInputArgs = {
  where: ProposalStatusUpdatedEventWhereUniqueInput;
};


export type QueryProposalStatusUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalStatusUpdatedEventOrderByInput>>;
  where?: Maybe<ProposalStatusUpdatedEventWhereInput>;
};


export type QueryProposalStatusUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalStatusUpdatedEventOrderByInput>>;
  where?: Maybe<ProposalStatusUpdatedEventWhereInput>;
};


export type QueryProposalVotedEventByUniqueInputArgs = {
  where: ProposalVotedEventWhereUniqueInput;
};


export type QueryProposalVotedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalVotedEventOrderByInput>>;
  where?: Maybe<ProposalVotedEventWhereInput>;
};


export type QueryProposalVotedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalVotedEventOrderByInput>>;
  where?: Maybe<ProposalVotedEventWhereInput>;
};


export type QueryProposalsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalOrderByInput>>;
  where?: Maybe<ProposalWhereInput>;
};


export type QueryProposalsByDescriptionArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereProposal?: Maybe<ProposalWhereInput>;
};


export type QueryProposalsByTitleArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereProposal?: Maybe<ProposalWhereInput>;
};


export type QueryProposalsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ProposalOrderByInput>>;
  where?: Maybe<ProposalWhereInput>;
};


export type QueryReferendumFinishedEventByUniqueInputArgs = {
  where: ReferendumFinishedEventWhereUniqueInput;
};


export type QueryReferendumFinishedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumFinishedEventOrderByInput>>;
  where?: Maybe<ReferendumFinishedEventWhereInput>;
};


export type QueryReferendumFinishedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumFinishedEventOrderByInput>>;
  where?: Maybe<ReferendumFinishedEventWhereInput>;
};


export type QueryReferendumStageRevealingOptionResultByUniqueInputArgs = {
  where: ReferendumStageRevealingOptionResultWhereUniqueInput;
};


export type QueryReferendumStageRevealingOptionResultsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStageRevealingOptionResultOrderByInput>>;
  where?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
};


export type QueryReferendumStageRevealingOptionResultsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStageRevealingOptionResultOrderByInput>>;
  where?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
};


export type QueryReferendumStartedEventByUniqueInputArgs = {
  where: ReferendumStartedEventWhereUniqueInput;
};


export type QueryReferendumStartedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStartedEventOrderByInput>>;
  where?: Maybe<ReferendumStartedEventWhereInput>;
};


export type QueryReferendumStartedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStartedEventOrderByInput>>;
  where?: Maybe<ReferendumStartedEventWhereInput>;
};


export type QueryReferendumStartedForcefullyEventByUniqueInputArgs = {
  where: ReferendumStartedForcefullyEventWhereUniqueInput;
};


export type QueryReferendumStartedForcefullyEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStartedForcefullyEventOrderByInput>>;
  where?: Maybe<ReferendumStartedForcefullyEventWhereInput>;
};


export type QueryReferendumStartedForcefullyEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferendumStartedForcefullyEventOrderByInput>>;
  where?: Maybe<ReferendumStartedForcefullyEventWhereInput>;
};


export type QueryReferralCutUpdatedEventByUniqueInputArgs = {
  where: ReferralCutUpdatedEventWhereUniqueInput;
};


export type QueryReferralCutUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferralCutUpdatedEventOrderByInput>>;
  where?: Maybe<ReferralCutUpdatedEventWhereInput>;
};


export type QueryReferralCutUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ReferralCutUpdatedEventOrderByInput>>;
  where?: Maybe<ReferralCutUpdatedEventWhereInput>;
};


export type QueryRequestFundedEventByUniqueInputArgs = {
  where: RequestFundedEventWhereUniqueInput;
};


export type QueryRequestFundedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RequestFundedEventOrderByInput>>;
  where?: Maybe<RequestFundedEventWhereInput>;
};


export type QueryRequestFundedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RequestFundedEventOrderByInput>>;
  where?: Maybe<RequestFundedEventWhereInput>;
};


export type QueryRevealingStageStartedEventByUniqueInputArgs = {
  where: RevealingStageStartedEventWhereUniqueInput;
};


export type QueryRevealingStageStartedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RevealingStageStartedEventOrderByInput>>;
  where?: Maybe<RevealingStageStartedEventWhereInput>;
};


export type QueryRevealingStageStartedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RevealingStageStartedEventOrderByInput>>;
  where?: Maybe<RevealingStageStartedEventWhereInput>;
};


export type QueryRewardPaidEventByUniqueInputArgs = {
  where: RewardPaidEventWhereUniqueInput;
};


export type QueryRewardPaidEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RewardPaidEventOrderByInput>>;
  where?: Maybe<RewardPaidEventWhereInput>;
};


export type QueryRewardPaidEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RewardPaidEventOrderByInput>>;
  where?: Maybe<RewardPaidEventWhereInput>;
};


export type QueryRewardPaymentEventByUniqueInputArgs = {
  where: RewardPaymentEventWhereUniqueInput;
};


export type QueryRewardPaymentEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RewardPaymentEventOrderByInput>>;
  where?: Maybe<RewardPaymentEventWhereInput>;
};


export type QueryRewardPaymentEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RewardPaymentEventOrderByInput>>;
  where?: Maybe<RewardPaymentEventWhereInput>;
};


export type QueryRuntimeWasmBytecodeByUniqueInputArgs = {
  where: RuntimeWasmBytecodeWhereUniqueInput;
};


export type QueryRuntimeWasmBytecodesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RuntimeWasmBytecodeOrderByInput>>;
  where?: Maybe<RuntimeWasmBytecodeWhereInput>;
};


export type QueryRuntimeWasmBytecodesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<RuntimeWasmBytecodeOrderByInput>>;
  where?: Maybe<RuntimeWasmBytecodeWhereInput>;
};


export type QuerySearchArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereChannel?: Maybe<ChannelWhereInput>;
  whereVideo?: Maybe<VideoWhereInput>;
};


export type QueryStakeDecreasedEventByUniqueInputArgs = {
  where: StakeDecreasedEventWhereUniqueInput;
};


export type QueryStakeDecreasedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeDecreasedEventOrderByInput>>;
  where?: Maybe<StakeDecreasedEventWhereInput>;
};


export type QueryStakeDecreasedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeDecreasedEventOrderByInput>>;
  where?: Maybe<StakeDecreasedEventWhereInput>;
};


export type QueryStakeIncreasedEventByUniqueInputArgs = {
  where: StakeIncreasedEventWhereUniqueInput;
};


export type QueryStakeIncreasedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeIncreasedEventOrderByInput>>;
  where?: Maybe<StakeIncreasedEventWhereInput>;
};


export type QueryStakeIncreasedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeIncreasedEventOrderByInput>>;
  where?: Maybe<StakeIncreasedEventWhereInput>;
};


export type QueryStakeReleasedEventByUniqueInputArgs = {
  where: StakeReleasedEventWhereUniqueInput;
};


export type QueryStakeReleasedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeReleasedEventOrderByInput>>;
  where?: Maybe<StakeReleasedEventWhereInput>;
};


export type QueryStakeReleasedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeReleasedEventOrderByInput>>;
  where?: Maybe<StakeReleasedEventWhereInput>;
};


export type QueryStakeSlashedEventByUniqueInputArgs = {
  where: StakeSlashedEventWhereUniqueInput;
};


export type QueryStakeSlashedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeSlashedEventOrderByInput>>;
  where?: Maybe<StakeSlashedEventWhereInput>;
};


export type QueryStakeSlashedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakeSlashedEventOrderByInput>>;
  where?: Maybe<StakeSlashedEventWhereInput>;
};


export type QueryStakingAccountAddedEventByUniqueInputArgs = {
  where: StakingAccountAddedEventWhereUniqueInput;
};


export type QueryStakingAccountAddedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountAddedEventOrderByInput>>;
  where?: Maybe<StakingAccountAddedEventWhereInput>;
};


export type QueryStakingAccountAddedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountAddedEventOrderByInput>>;
  where?: Maybe<StakingAccountAddedEventWhereInput>;
};


export type QueryStakingAccountConfirmedEventByUniqueInputArgs = {
  where: StakingAccountConfirmedEventWhereUniqueInput;
};


export type QueryStakingAccountConfirmedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountConfirmedEventOrderByInput>>;
  where?: Maybe<StakingAccountConfirmedEventWhereInput>;
};


export type QueryStakingAccountConfirmedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountConfirmedEventOrderByInput>>;
  where?: Maybe<StakingAccountConfirmedEventWhereInput>;
};


export type QueryStakingAccountRemovedEventByUniqueInputArgs = {
  where: StakingAccountRemovedEventWhereUniqueInput;
};


export type QueryStakingAccountRemovedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountRemovedEventOrderByInput>>;
  where?: Maybe<StakingAccountRemovedEventWhereInput>;
};


export type QueryStakingAccountRemovedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StakingAccountRemovedEventOrderByInput>>;
  where?: Maybe<StakingAccountRemovedEventWhereInput>;
};


export type QueryStatusTextChangedEventByUniqueInputArgs = {
  where: StatusTextChangedEventWhereUniqueInput;
};


export type QueryStatusTextChangedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StatusTextChangedEventOrderByInput>>;
  where?: Maybe<StatusTextChangedEventWhereInput>;
};


export type QueryStatusTextChangedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<StatusTextChangedEventOrderByInput>>;
  where?: Maybe<StatusTextChangedEventWhereInput>;
};


export type QueryTerminatedLeaderEventByUniqueInputArgs = {
  where: TerminatedLeaderEventWhereUniqueInput;
};


export type QueryTerminatedLeaderEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TerminatedLeaderEventOrderByInput>>;
  where?: Maybe<TerminatedLeaderEventWhereInput>;
};


export type QueryTerminatedLeaderEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TerminatedLeaderEventOrderByInput>>;
  where?: Maybe<TerminatedLeaderEventWhereInput>;
};


export type QueryTerminatedWorkerEventByUniqueInputArgs = {
  where: TerminatedWorkerEventWhereUniqueInput;
};


export type QueryTerminatedWorkerEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TerminatedWorkerEventOrderByInput>>;
  where?: Maybe<TerminatedWorkerEventWhereInput>;
};


export type QueryTerminatedWorkerEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<TerminatedWorkerEventOrderByInput>>;
  where?: Maybe<TerminatedWorkerEventWhereInput>;
};


export type QueryThreadCreatedEventByUniqueInputArgs = {
  where: ThreadCreatedEventWhereUniqueInput;
};


export type QueryThreadCreatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadCreatedEventOrderByInput>>;
  where?: Maybe<ThreadCreatedEventWhereInput>;
};


export type QueryThreadCreatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadCreatedEventOrderByInput>>;
  where?: Maybe<ThreadCreatedEventWhereInput>;
};


export type QueryThreadDeletedEventByUniqueInputArgs = {
  where: ThreadDeletedEventWhereUniqueInput;
};


export type QueryThreadDeletedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadDeletedEventOrderByInput>>;
  where?: Maybe<ThreadDeletedEventWhereInput>;
};


export type QueryThreadDeletedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadDeletedEventOrderByInput>>;
  where?: Maybe<ThreadDeletedEventWhereInput>;
};


export type QueryThreadMetadataUpdatedEventByUniqueInputArgs = {
  where: ThreadMetadataUpdatedEventWhereUniqueInput;
};


export type QueryThreadMetadataUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadMetadataUpdatedEventOrderByInput>>;
  where?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
};


export type QueryThreadMetadataUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadMetadataUpdatedEventOrderByInput>>;
  where?: Maybe<ThreadMetadataUpdatedEventWhereInput>;
};


export type QueryThreadModeratedEventByUniqueInputArgs = {
  where: ThreadModeratedEventWhereUniqueInput;
};


export type QueryThreadModeratedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadModeratedEventOrderByInput>>;
  where?: Maybe<ThreadModeratedEventWhereInput>;
};


export type QueryThreadModeratedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadModeratedEventOrderByInput>>;
  where?: Maybe<ThreadModeratedEventWhereInput>;
};


export type QueryThreadMovedEventByUniqueInputArgs = {
  where: ThreadMovedEventWhereUniqueInput;
};


export type QueryThreadMovedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadMovedEventOrderByInput>>;
  where?: Maybe<ThreadMovedEventWhereInput>;
};


export type QueryThreadMovedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ThreadMovedEventOrderByInput>>;
  where?: Maybe<ThreadMovedEventWhereInput>;
};


export type QueryThreadsByTitleArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereForumThread?: Maybe<ForumThreadWhereInput>;
};


export type QueryUpcomingWorkingGroupOpeningByUniqueInputArgs = {
  where: UpcomingWorkingGroupOpeningWhereUniqueInput;
};


export type QueryUpcomingWorkingGroupOpeningsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UpcomingWorkingGroupOpeningOrderByInput>>;
  where?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
};


export type QueryUpcomingWorkingGroupOpeningsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UpcomingWorkingGroupOpeningOrderByInput>>;
  where?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
};


export type QueryVideoByUniqueInputArgs = {
  where: VideoWhereUniqueInput;
};


export type QueryVideoCategoriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoCategoryOrderByInput>>;
  where?: Maybe<VideoCategoryWhereInput>;
};


export type QueryVideoCategoriesByNameArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
  whereVideoCategory?: Maybe<VideoCategoryWhereInput>;
};


export type QueryVideoCategoriesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoCategoryOrderByInput>>;
  where?: Maybe<VideoCategoryWhereInput>;
};


export type QueryVideoCategoryByUniqueInputArgs = {
  where: VideoCategoryWhereUniqueInput;
};


export type QueryVideoMediaEncodingByUniqueInputArgs = {
  where: VideoMediaEncodingWhereUniqueInput;
};


export type QueryVideoMediaEncodingsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoMediaEncodingOrderByInput>>;
  where?: Maybe<VideoMediaEncodingWhereInput>;
};


export type QueryVideoMediaEncodingsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoMediaEncodingOrderByInput>>;
  where?: Maybe<VideoMediaEncodingWhereInput>;
};


export type QueryVideoMediaMetadataArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoMediaMetadataOrderByInput>>;
  where?: Maybe<VideoMediaMetadataWhereInput>;
};


export type QueryVideoMediaMetadataByUniqueInputArgs = {
  where: VideoMediaMetadataWhereUniqueInput;
};


export type QueryVideoMediaMetadataConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoMediaMetadataOrderByInput>>;
  where?: Maybe<VideoMediaMetadataWhereInput>;
};


export type QueryVideosArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoOrderByInput>>;
  where?: Maybe<VideoWhereInput>;
};


export type QueryVideosConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VideoOrderByInput>>;
  where?: Maybe<VideoWhereInput>;
};


export type QueryVoteCastEventByUniqueInputArgs = {
  where: VoteCastEventWhereUniqueInput;
};


export type QueryVoteCastEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteCastEventOrderByInput>>;
  where?: Maybe<VoteCastEventWhereInput>;
};


export type QueryVoteCastEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteCastEventOrderByInput>>;
  where?: Maybe<VoteCastEventWhereInput>;
};


export type QueryVoteOnPollEventByUniqueInputArgs = {
  where: VoteOnPollEventWhereUniqueInput;
};


export type QueryVoteOnPollEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteOnPollEventOrderByInput>>;
  where?: Maybe<VoteOnPollEventWhereInput>;
};


export type QueryVoteOnPollEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteOnPollEventOrderByInput>>;
  where?: Maybe<VoteOnPollEventWhereInput>;
};


export type QueryVoteRevealedEventByUniqueInputArgs = {
  where: VoteRevealedEventWhereUniqueInput;
};


export type QueryVoteRevealedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteRevealedEventOrderByInput>>;
  where?: Maybe<VoteRevealedEventWhereInput>;
};


export type QueryVoteRevealedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VoteRevealedEventOrderByInput>>;
  where?: Maybe<VoteRevealedEventWhereInput>;
};


export type QueryVotingPeriodStartedEventByUniqueInputArgs = {
  where: VotingPeriodStartedEventWhereUniqueInput;
};


export type QueryVotingPeriodStartedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VotingPeriodStartedEventOrderByInput>>;
  where?: Maybe<VotingPeriodStartedEventWhereInput>;
};


export type QueryVotingPeriodStartedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<VotingPeriodStartedEventOrderByInput>>;
  where?: Maybe<VotingPeriodStartedEventWhereInput>;
};


export type QueryWorkerByUniqueInputArgs = {
  where: WorkerWhereUniqueInput;
};


export type QueryWorkerExitedEventByUniqueInputArgs = {
  where: WorkerExitedEventWhereUniqueInput;
};


export type QueryWorkerExitedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerExitedEventOrderByInput>>;
  where?: Maybe<WorkerExitedEventWhereInput>;
};


export type QueryWorkerExitedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerExitedEventOrderByInput>>;
  where?: Maybe<WorkerExitedEventWhereInput>;
};


export type QueryWorkerRewardAccountUpdatedEventByUniqueInputArgs = {
  where: WorkerRewardAccountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRewardAccountUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRewardAccountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
};


export type QueryWorkerRewardAccountUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRewardAccountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
};


export type QueryWorkerRewardAmountUpdatedEventByUniqueInputArgs = {
  where: WorkerRewardAmountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRewardAmountUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRewardAmountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
};


export type QueryWorkerRewardAmountUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRewardAmountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
};


export type QueryWorkerRoleAccountUpdatedEventByUniqueInputArgs = {
  where: WorkerRoleAccountUpdatedEventWhereUniqueInput;
};


export type QueryWorkerRoleAccountUpdatedEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRoleAccountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
};


export type QueryWorkerRoleAccountUpdatedEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerRoleAccountUpdatedEventOrderByInput>>;
  where?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
};


export type QueryWorkerStartedLeavingEventByUniqueInputArgs = {
  where: WorkerStartedLeavingEventWhereUniqueInput;
};


export type QueryWorkerStartedLeavingEventsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerStartedLeavingEventOrderByInput>>;
  where?: Maybe<WorkerStartedLeavingEventWhereInput>;
};


export type QueryWorkerStartedLeavingEventsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerStartedLeavingEventOrderByInput>>;
  where?: Maybe<WorkerStartedLeavingEventWhereInput>;
};


export type QueryWorkersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerOrderByInput>>;
  where?: Maybe<WorkerWhereInput>;
};


export type QueryWorkersConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkerOrderByInput>>;
  where?: Maybe<WorkerWhereInput>;
};


export type QueryWorkingGroupApplicationByUniqueInputArgs = {
  where: WorkingGroupApplicationWhereUniqueInput;
};


export type QueryWorkingGroupApplicationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupApplicationOrderByInput>>;
  where?: Maybe<WorkingGroupApplicationWhereInput>;
};


export type QueryWorkingGroupApplicationsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupApplicationOrderByInput>>;
  where?: Maybe<WorkingGroupApplicationWhereInput>;
};


export type QueryWorkingGroupByUniqueInputArgs = {
  where: WorkingGroupWhereUniqueInput;
};


export type QueryWorkingGroupMetadataArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupMetadataOrderByInput>>;
  where?: Maybe<WorkingGroupMetadataWhereInput>;
};


export type QueryWorkingGroupMetadataByUniqueInputArgs = {
  where: WorkingGroupMetadataWhereUniqueInput;
};


export type QueryWorkingGroupMetadataConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupMetadataOrderByInput>>;
  where?: Maybe<WorkingGroupMetadataWhereInput>;
};


export type QueryWorkingGroupOpeningByUniqueInputArgs = {
  where: WorkingGroupOpeningWhereUniqueInput;
};


export type QueryWorkingGroupOpeningMetadataArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOpeningMetadataOrderByInput>>;
  where?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
};


export type QueryWorkingGroupOpeningMetadataByUniqueInputArgs = {
  where: WorkingGroupOpeningMetadataWhereUniqueInput;
};


export type QueryWorkingGroupOpeningMetadataConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOpeningMetadataOrderByInput>>;
  where?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
};


export type QueryWorkingGroupOpeningsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOpeningOrderByInput>>;
  where?: Maybe<WorkingGroupOpeningWhereInput>;
};


export type QueryWorkingGroupOpeningsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOpeningOrderByInput>>;
  where?: Maybe<WorkingGroupOpeningWhereInput>;
};


export type QueryWorkingGroupsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOrderByInput>>;
  where?: Maybe<WorkingGroupWhereInput>;
};


export type QueryWorkingGroupsConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkingGroupOrderByInput>>;
  where?: Maybe<WorkingGroupWhereInput>;
};

export type ReferendumFinishedEvent = BaseGraphQlObject & Event & {
  __typename: 'ReferendumFinishedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  optionResults: Array<ReferendumStageRevealingOptionResult>;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ReferendumFinishedEventConnection = {
  __typename: 'ReferendumFinishedEventConnection';
  edges: Array<ReferendumFinishedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferendumFinishedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type ReferendumFinishedEventEdge = {
  __typename: 'ReferendumFinishedEventEdge';
  cursor: Scalars['String'];
  node: ReferendumFinishedEvent;
};

export enum ReferendumFinishedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ReferendumFinishedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type ReferendumFinishedEventWhereInput = {
  AND?: Maybe<Array<ReferendumFinishedEventWhereInput>>;
  OR?: Maybe<Array<ReferendumFinishedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  optionResults_every?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  optionResults_none?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  optionResults_some?: Maybe<ReferendumStageRevealingOptionResultWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ReferendumFinishedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

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
  AND?: Maybe<Array<ReferendumStageInactiveWhereInput>>;
  OR?: Maybe<Array<ReferendumStageInactiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  dummy_eq?: Maybe<Scalars['Int']>;
  dummy_gt?: Maybe<Scalars['Int']>;
  dummy_gte?: Maybe<Scalars['Int']>;
  dummy_in?: Maybe<Array<Scalars['Int']>>;
  dummy_lt?: Maybe<Scalars['Int']>;
  dummy_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ReferendumStageInactiveWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageRevealing = {
  __typename: 'ReferendumStageRevealing';
  /** Index of current election */
  electionRound?: Maybe<ElectionRound>;
  /** Intermediate winning options */
  intermediateWinners?: Maybe<Array<ReferendumStageRevealingOptionResult>>;
  /** Block in which referendum started */
  started: Scalars['BigInt'];
  /** Target number of winners */
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStageRevealingCreateInput = {
  started: Scalars['BigInt'];
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStageRevealingOptionResult = BaseGraphQlObject & {
  __typename: 'ReferendumStageRevealingOptionResult';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  electionRound: ElectionRound;
  electionRoundId: Scalars['String'];
  id: Scalars['ID'];
  optionId: Membership;
  optionIdId: Scalars['String'];
  referendumFinishedEvent: ReferendumFinishedEvent;
  referendumFinishedEventId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Sum of votes' power received. */
  votePower: Scalars['BigInt'];
};

export type ReferendumStageRevealingOptionResultConnection = {
  __typename: 'ReferendumStageRevealingOptionResultConnection';
  edges: Array<ReferendumStageRevealingOptionResultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferendumStageRevealingOptionResultCreateInput = {
  electionRound: Scalars['ID'];
  optionId: Scalars['ID'];
  referendumFinishedEvent: Scalars['ID'];
  votePower: Scalars['BigInt'];
};

export type ReferendumStageRevealingOptionResultEdge = {
  __typename: 'ReferendumStageRevealingOptionResultEdge';
  cursor: Scalars['String'];
  node: ReferendumStageRevealingOptionResult;
};

export enum ReferendumStageRevealingOptionResultOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ElectionRoundAsc = 'electionRound_ASC',
  ElectionRoundDesc = 'electionRound_DESC',
  OptionIdAsc = 'optionId_ASC',
  OptionIdDesc = 'optionId_DESC',
  ReferendumFinishedEventAsc = 'referendumFinishedEvent_ASC',
  ReferendumFinishedEventDesc = 'referendumFinishedEvent_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC'
}

export type ReferendumStageRevealingOptionResultUpdateInput = {
  electionRound?: Maybe<Scalars['ID']>;
  optionId?: Maybe<Scalars['ID']>;
  referendumFinishedEvent?: Maybe<Scalars['ID']>;
  votePower?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageRevealingOptionResultWhereInput = {
  AND?: Maybe<Array<ReferendumStageRevealingOptionResultWhereInput>>;
  OR?: Maybe<Array<ReferendumStageRevealingOptionResultWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  electionRound?: Maybe<ElectionRoundWhereInput>;
  electionRound_eq?: Maybe<Scalars['ID']>;
  electionRound_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  optionId?: Maybe<MembershipWhereInput>;
  optionId_eq?: Maybe<Scalars['ID']>;
  optionId_in?: Maybe<Array<Scalars['ID']>>;
  referendumFinishedEvent?: Maybe<ReferendumFinishedEventWhereInput>;
  referendumFinishedEvent_eq?: Maybe<Scalars['ID']>;
  referendumFinishedEvent_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageRevealingOptionResultWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageRevealingUpdateInput = {
  started?: Maybe<Scalars['BigInt']>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageRevealingWhereInput = {
  AND?: Maybe<Array<ReferendumStageRevealingWhereInput>>;
  OR?: Maybe<Array<ReferendumStageRevealingWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  started_eq?: Maybe<Scalars['BigInt']>;
  started_gt?: Maybe<Scalars['BigInt']>;
  started_gte?: Maybe<Scalars['BigInt']>;
  started_in?: Maybe<Array<Scalars['BigInt']>>;
  started_lt?: Maybe<Scalars['BigInt']>;
  started_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageRevealingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStageVoting = {
  __typename: 'ReferendumStageVoting';
  /** Index of current election */
  electionRound?: Maybe<ElectionRound>;
  /** Block in which referendum started. */
  started: Scalars['BigInt'];
  /** Target number of winners. */
  winningTargetCount: Scalars['BigInt'];
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
  AND?: Maybe<Array<ReferendumStageVotingWhereInput>>;
  OR?: Maybe<Array<ReferendumStageVotingWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  started_eq?: Maybe<Scalars['BigInt']>;
  started_gt?: Maybe<Scalars['BigInt']>;
  started_gte?: Maybe<Scalars['BigInt']>;
  started_in?: Maybe<Array<Scalars['BigInt']>>;
  started_lt?: Maybe<Scalars['BigInt']>;
  started_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStageVotingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStartedEvent = BaseGraphQlObject & Event & {
  __typename: 'ReferendumStartedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Amount of winning referendum options. */
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedEventConnection = {
  __typename: 'ReferendumStartedEventConnection';
  edges: Array<ReferendumStartedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferendumStartedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedEventEdge = {
  __typename: 'ReferendumStartedEventEdge';
  cursor: Scalars['String'];
  node: ReferendumStartedEvent;
};

export enum ReferendumStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WinningTargetCountAsc = 'winningTargetCount_ASC',
  WinningTargetCountDesc = 'winningTargetCount_DESC'
}

export type ReferendumStartedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedEventWhereInput = {
  AND?: Maybe<Array<ReferendumStartedEventWhereInput>>;
  OR?: Maybe<Array<ReferendumStartedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferendumStartedForcefullyEvent = BaseGraphQlObject & Event & {
  __typename: 'ReferendumStartedForcefullyEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Amount of winning referendum options. */
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedForcefullyEventConnection = {
  __typename: 'ReferendumStartedForcefullyEventConnection';
  edges: Array<ReferendumStartedForcefullyEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferendumStartedForcefullyEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  winningTargetCount: Scalars['BigInt'];
};

export type ReferendumStartedForcefullyEventEdge = {
  __typename: 'ReferendumStartedForcefullyEventEdge';
  cursor: Scalars['String'];
  node: ReferendumStartedForcefullyEvent;
};

export enum ReferendumStartedForcefullyEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WinningTargetCountAsc = 'winningTargetCount_ASC',
  WinningTargetCountDesc = 'winningTargetCount_DESC'
}

export type ReferendumStartedForcefullyEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  winningTargetCount?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedForcefullyEventWhereInput = {
  AND?: Maybe<Array<ReferendumStartedForcefullyEventWhereInput>>;
  OR?: Maybe<Array<ReferendumStartedForcefullyEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  winningTargetCount_eq?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_gte?: Maybe<Scalars['BigInt']>;
  winningTargetCount_in?: Maybe<Array<Scalars['BigInt']>>;
  winningTargetCount_lt?: Maybe<Scalars['BigInt']>;
  winningTargetCount_lte?: Maybe<Scalars['BigInt']>;
};

export type ReferendumStartedForcefullyEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ReferralCutUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'ReferralCutUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New cut value. */
  newValue: Scalars['Int'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ReferralCutUpdatedEventConnection = {
  __typename: 'ReferralCutUpdatedEventConnection';
  edges: Array<ReferralCutUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ReferralCutUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newValue: Scalars['Float'];
};

export type ReferralCutUpdatedEventEdge = {
  __typename: 'ReferralCutUpdatedEventEdge';
  cursor: Scalars['String'];
  node: ReferralCutUpdatedEvent;
};

export enum ReferralCutUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewValueAsc = 'newValue_ASC',
  NewValueDesc = 'newValue_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ReferralCutUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newValue?: Maybe<Scalars['Float']>;
};

export type ReferralCutUpdatedEventWhereInput = {
  AND?: Maybe<Array<ReferralCutUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ReferralCutUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newValue_eq?: Maybe<Scalars['Int']>;
  newValue_gt?: Maybe<Scalars['Int']>;
  newValue_gte?: Maybe<Scalars['Int']>;
  newValue_in?: Maybe<Array<Scalars['Int']>>;
  newValue_lt?: Maybe<Scalars['Int']>;
  newValue_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ReferralCutUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RequestFundedEvent = BaseGraphQlObject & Event & {
  __typename: 'RequestFundedEvent';
  /** Funding account. */
  account: Scalars['String'];
  /** Funding amount. */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type RequestFundedEventConnection = {
  __typename: 'RequestFundedEventConnection';
  edges: Array<RequestFundedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RequestFundedEventCreateInput = {
  account: Scalars['String'];
  amount: Scalars['BigInt'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type RequestFundedEventEdge = {
  __typename: 'RequestFundedEventEdge';
  cursor: Scalars['String'];
  node: RequestFundedEvent;
};

export enum RequestFundedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type RequestFundedEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['BigInt']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type RequestFundedEventWhereInput = {
  AND?: Maybe<Array<RequestFundedEventWhereInput>>;
  OR?: Maybe<Array<RequestFundedEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type RequestFundedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RevealingStageStartedEvent = BaseGraphQlObject & Event & {
  __typename: 'RevealingStageStartedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type RevealingStageStartedEventConnection = {
  __typename: 'RevealingStageStartedEventConnection';
  edges: Array<RevealingStageStartedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RevealingStageStartedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
};

export type RevealingStageStartedEventEdge = {
  __typename: 'RevealingStageStartedEventEdge';
  cursor: Scalars['String'];
  node: RevealingStageStartedEvent;
};

export enum RevealingStageStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type RevealingStageStartedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
};

export type RevealingStageStartedEventWhereInput = {
  AND?: Maybe<Array<RevealingStageStartedEventWhereInput>>;
  OR?: Maybe<Array<RevealingStageStartedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type RevealingStageStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RewardPaidEvent = BaseGraphQlObject & Event & {
  __typename: 'RewardPaidEvent';
  /** Amount recieved */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Type of the payment (REGULAR/MISSED) */
  paymentType: RewardPaymentType;
  /** The account that recieved the reward */
  rewardAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type RewardPaidEventConnection = {
  __typename: 'RewardPaidEventConnection';
  edges: Array<RewardPaidEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RewardPaidEventCreateInput = {
  amount: Scalars['BigInt'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  paymentType: RewardPaymentType;
  rewardAccount: Scalars['String'];
  worker: Scalars['ID'];
};

export type RewardPaidEventEdge = {
  __typename: 'RewardPaidEventEdge';
  cursor: Scalars['String'];
  node: RewardPaidEvent;
};

export enum RewardPaidEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PaymentTypeAsc = 'paymentType_ASC',
  PaymentTypeDesc = 'paymentType_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type RewardPaidEventUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  paymentType?: Maybe<RewardPaymentType>;
  rewardAccount?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type RewardPaidEventWhereInput = {
  AND?: Maybe<Array<RewardPaidEventWhereInput>>;
  OR?: Maybe<Array<RewardPaidEventWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  paymentType_eq?: Maybe<RewardPaymentType>;
  paymentType_in?: Maybe<Array<RewardPaymentType>>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type RewardPaidEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type RewardPaymentEvent = BaseGraphQlObject & Event & {
  __typename: 'RewardPaymentEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Amount that couldn't be paid and will be paid the next time. */
  missingBalance: Scalars['BigInt'];
  /** Network the block was produced in */
  network: Network;
  /** Amount paid to the council member */
  paidBalance: Scalars['BigInt'];
  /** Candidate's account that will be recieving rewards if candidate's elected. */
  rewardAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type RewardPaymentEventConnection = {
  __typename: 'RewardPaymentEventConnection';
  edges: Array<RewardPaymentEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RewardPaymentEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  missingBalance: Scalars['BigInt'];
  network: Network;
  paidBalance: Scalars['BigInt'];
  rewardAccount: Scalars['String'];
};

export type RewardPaymentEventEdge = {
  __typename: 'RewardPaymentEventEdge';
  cursor: Scalars['String'];
  node: RewardPaymentEvent;
};

export enum RewardPaymentEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  MissingBalanceAsc = 'missingBalance_ASC',
  MissingBalanceDesc = 'missingBalance_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PaidBalanceAsc = 'paidBalance_ASC',
  PaidBalanceDesc = 'paidBalance_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type RewardPaymentEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  missingBalance?: Maybe<Scalars['BigInt']>;
  network?: Maybe<Network>;
  paidBalance?: Maybe<Scalars['BigInt']>;
  rewardAccount?: Maybe<Scalars['String']>;
};

export type RewardPaymentEventWhereInput = {
  AND?: Maybe<Array<RewardPaymentEventWhereInput>>;
  OR?: Maybe<Array<RewardPaymentEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  missingBalance_eq?: Maybe<Scalars['BigInt']>;
  missingBalance_gt?: Maybe<Scalars['BigInt']>;
  missingBalance_gte?: Maybe<Scalars['BigInt']>;
  missingBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  missingBalance_lt?: Maybe<Scalars['BigInt']>;
  missingBalance_lte?: Maybe<Scalars['BigInt']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  paidBalance_eq?: Maybe<Scalars['BigInt']>;
  paidBalance_gt?: Maybe<Scalars['BigInt']>;
  paidBalance_gte?: Maybe<Scalars['BigInt']>;
  paidBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  paidBalance_lt?: Maybe<Scalars['BigInt']>;
  paidBalance_lte?: Maybe<Scalars['BigInt']>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type RewardPaymentEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum RewardPaymentType {
  Missed = 'MISSED',
  Regular = 'REGULAR'
}

export type RuntimeUpgradeProposalDetails = {
  __typename: 'RuntimeUpgradeProposalDetails';
  /** Runtime upgrade WASM bytecode */
  newRuntimeBytecode?: Maybe<RuntimeWasmBytecode>;
};

export type RuntimeWasmBytecode = BaseGraphQlObject & {
  __typename: 'RuntimeWasmBytecode';
  /** The bytecode itself */
  bytecode: Scalars['Bytes'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type RuntimeWasmBytecodeConnection = {
  __typename: 'RuntimeWasmBytecodeConnection';
  edges: Array<RuntimeWasmBytecodeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RuntimeWasmBytecodeCreateInput = {
  bytecode: Scalars['Bytes'];
};

export type RuntimeWasmBytecodeEdge = {
  __typename: 'RuntimeWasmBytecodeEdge';
  cursor: Scalars['String'];
  node: RuntimeWasmBytecode;
};

export enum RuntimeWasmBytecodeOrderByInput {
  BytecodeAsc = 'bytecode_ASC',
  BytecodeDesc = 'bytecode_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type RuntimeWasmBytecodeUpdateInput = {
  bytecode?: Maybe<Scalars['Bytes']>;
};

export type RuntimeWasmBytecodeWhereInput = {
  AND?: Maybe<Array<RuntimeWasmBytecodeWhereInput>>;
  OR?: Maybe<Array<RuntimeWasmBytecodeWhereInput>>;
  bytecode_eq?: Maybe<Scalars['Bytes']>;
  bytecode_in?: Maybe<Array<Scalars['Bytes']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type RuntimeWasmBytecodeWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SearchFtsOutput = {
  __typename: 'SearchFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: SearchSearchResult;
  rank: Scalars['Float'];
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
  AND?: Maybe<Array<SetCouncilBudgetIncrementProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetCouncilBudgetIncrementProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newAmount_eq?: Maybe<Scalars['BigInt']>;
  newAmount_gt?: Maybe<Scalars['BigInt']>;
  newAmount_gte?: Maybe<Scalars['BigInt']>;
  newAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  newAmount_lt?: Maybe<Scalars['BigInt']>;
  newAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetCouncilorRewardProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetCouncilorRewardProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetInitialInvitationBalanceProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetInitialInvitationBalanceProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newInitialInvitationBalance_eq?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_gt?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_gte?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_in?: Maybe<Array<Scalars['BigInt']>>;
  newInitialInvitationBalance_lt?: Maybe<Scalars['BigInt']>;
  newInitialInvitationBalance_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetInitialInvitationCountProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetInitialInvitationCountProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newInitialInvitationsCount_eq?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_gt?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_gte?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_in?: Maybe<Array<Scalars['Int']>>;
  newInitialInvitationsCount_lt?: Maybe<Scalars['Int']>;
  newInitialInvitationsCount_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetMaxValidatorCountProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMaxValidatorCountProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newMaxValidatorCount_eq?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_gt?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_gte?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_in?: Maybe<Array<Scalars['Int']>>;
  newMaxValidatorCount_lt?: Maybe<Scalars['Int']>;
  newMaxValidatorCount_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetMembershipLeadInvitationQuotaProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMembershipLeadInvitationQuotaProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newLeadInvitationQuota_eq?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_gt?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_gte?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_in?: Maybe<Array<Scalars['Int']>>;
  newLeadInvitationQuota_lt?: Maybe<Scalars['Int']>;
  newLeadInvitationQuota_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetMembershipPriceProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetMembershipPriceProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newPrice_eq?: Maybe<Scalars['BigInt']>;
  newPrice_gt?: Maybe<Scalars['BigInt']>;
  newPrice_gte?: Maybe<Scalars['BigInt']>;
  newPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  newPrice_lt?: Maybe<Scalars['BigInt']>;
  newPrice_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetReferralCutProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetReferralCutProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newReferralCut_eq?: Maybe<Scalars['Int']>;
  newReferralCut_gt?: Maybe<Scalars['Int']>;
  newReferralCut_gte?: Maybe<Scalars['Int']>;
  newReferralCut_in?: Maybe<Array<Scalars['Int']>>;
  newReferralCut_lt?: Maybe<Scalars['Int']>;
  newReferralCut_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SetWorkingGroupLeadRewardProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SetWorkingGroupLeadRewardProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<SignalProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SignalProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type SignalProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type SlashWorkingGroupLeadProposalDetails = {
  __typename: 'SlashWorkingGroupLeadProposalDetails';
  /** Amount to slash the stake by */
  amount: Scalars['BigInt'];
  /** The lead that should be affected */
  lead?: Maybe<Worker>;
};

export type SlashWorkingGroupLeadProposalDetailsCreateInput = {
  amount: Scalars['BigInt'];
};

export type SlashWorkingGroupLeadProposalDetailsUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
};

export type SlashWorkingGroupLeadProposalDetailsWhereInput = {
  AND?: Maybe<Array<SlashWorkingGroupLeadProposalDetailsWhereInput>>;
  OR?: Maybe<Array<SlashWorkingGroupLeadProposalDetailsWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type SlashWorkingGroupLeadProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeDecreasedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakeDecreasedEvent';
  /** The amount of JOY the stake was decreased by */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type StakeDecreasedEventConnection = {
  __typename: 'StakeDecreasedEventConnection';
  edges: Array<StakeDecreasedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakeDecreasedEventCreateInput = {
  amount: Scalars['BigInt'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  worker: Scalars['ID'];
};

export type StakeDecreasedEventEdge = {
  __typename: 'StakeDecreasedEventEdge';
  cursor: Scalars['String'];
  node: StakeDecreasedEvent;
};

export enum StakeDecreasedEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type StakeDecreasedEventUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  worker?: Maybe<Scalars['ID']>;
};

export type StakeDecreasedEventWhereInput = {
  AND?: Maybe<Array<StakeDecreasedEventWhereInput>>;
  OR?: Maybe<Array<StakeDecreasedEventWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakeDecreasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeIncreasedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakeIncreasedEvent';
  /** The amount of JOY the stake was increased by */
  amount: Scalars['BigInt'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type StakeIncreasedEventConnection = {
  __typename: 'StakeIncreasedEventConnection';
  edges: Array<StakeIncreasedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakeIncreasedEventCreateInput = {
  amount: Scalars['BigInt'];
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  worker: Scalars['ID'];
};

export type StakeIncreasedEventEdge = {
  __typename: 'StakeIncreasedEventEdge';
  cursor: Scalars['String'];
  node: StakeIncreasedEvent;
};

export enum StakeIncreasedEventOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type StakeIncreasedEventUpdateInput = {
  amount?: Maybe<Scalars['BigInt']>;
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  worker?: Maybe<Scalars['ID']>;
};

export type StakeIncreasedEventWhereInput = {
  AND?: Maybe<Array<StakeIncreasedEventWhereInput>>;
  OR?: Maybe<Array<StakeIncreasedEventWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakeIncreasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeReleasedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakeReleasedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Account used to stake the value. */
  stakingAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type StakeReleasedEventConnection = {
  __typename: 'StakeReleasedEventConnection';
  edges: Array<StakeReleasedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakeReleasedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  stakingAccount: Scalars['String'];
};

export type StakeReleasedEventEdge = {
  __typename: 'StakeReleasedEventEdge';
  cursor: Scalars['String'];
  node: StakeReleasedEvent;
};

export enum StakeReleasedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StakeReleasedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  stakingAccount?: Maybe<Scalars['String']>;
};

export type StakeReleasedEventWhereInput = {
  AND?: Maybe<Array<StakeReleasedEventWhereInput>>;
  OR?: Maybe<Array<StakeReleasedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakeReleasedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakeSlashedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakeSlashedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
  /** Balance that was requested to be slashed */
  requestedAmount: Scalars['BigInt'];
  /** Balance that was actually slashed */
  slashedAmount: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type StakeSlashedEventConnection = {
  __typename: 'StakeSlashedEventConnection';
  edges: Array<StakeSlashedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakeSlashedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rationale?: Maybe<Scalars['String']>;
  requestedAmount: Scalars['BigInt'];
  slashedAmount: Scalars['BigInt'];
  worker: Scalars['ID'];
};

export type StakeSlashedEventEdge = {
  __typename: 'StakeSlashedEventEdge';
  cursor: Scalars['String'];
  node: StakeSlashedEvent;
};

export enum StakeSlashedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  RequestedAmountAsc = 'requestedAmount_ASC',
  RequestedAmountDesc = 'requestedAmount_DESC',
  SlashedAmountAsc = 'slashedAmount_ASC',
  SlashedAmountDesc = 'slashedAmount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type StakeSlashedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rationale?: Maybe<Scalars['String']>;
  requestedAmount?: Maybe<Scalars['BigInt']>;
  slashedAmount?: Maybe<Scalars['BigInt']>;
  worker?: Maybe<Scalars['ID']>;
};

export type StakeSlashedEventWhereInput = {
  AND?: Maybe<Array<StakeSlashedEventWhereInput>>;
  OR?: Maybe<Array<StakeSlashedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  requestedAmount_eq?: Maybe<Scalars['BigInt']>;
  requestedAmount_gt?: Maybe<Scalars['BigInt']>;
  requestedAmount_gte?: Maybe<Scalars['BigInt']>;
  requestedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  requestedAmount_lt?: Maybe<Scalars['BigInt']>;
  requestedAmount_lte?: Maybe<Scalars['BigInt']>;
  slashedAmount_eq?: Maybe<Scalars['BigInt']>;
  slashedAmount_gt?: Maybe<Scalars['BigInt']>;
  slashedAmount_gte?: Maybe<Scalars['BigInt']>;
  slashedAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  slashedAmount_lt?: Maybe<Scalars['BigInt']>;
  slashedAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakeSlashedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountAddedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakingAccountAddedEvent';
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type StakingAccountAddedEventConnection = {
  __typename: 'StakingAccountAddedEventConnection';
  edges: Array<StakingAccountAddedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakingAccountAddedEventCreateInput = {
  account: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
};

export type StakingAccountAddedEventEdge = {
  __typename: 'StakingAccountAddedEventEdge';
  cursor: Scalars['String'];
  node: StakingAccountAddedEvent;
};

export enum StakingAccountAddedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StakingAccountAddedEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type StakingAccountAddedEventWhereInput = {
  AND?: Maybe<Array<StakingAccountAddedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountAddedEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakingAccountAddedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountConfirmedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakingAccountConfirmedEvent';
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type StakingAccountConfirmedEventConnection = {
  __typename: 'StakingAccountConfirmedEventConnection';
  edges: Array<StakingAccountConfirmedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakingAccountConfirmedEventCreateInput = {
  account: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
};

export type StakingAccountConfirmedEventEdge = {
  __typename: 'StakingAccountConfirmedEventEdge';
  cursor: Scalars['String'];
  node: StakingAccountConfirmedEvent;
};

export enum StakingAccountConfirmedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StakingAccountConfirmedEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type StakingAccountConfirmedEventWhereInput = {
  AND?: Maybe<Array<StakingAccountConfirmedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountConfirmedEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakingAccountConfirmedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StakingAccountRemovedEvent = BaseGraphQlObject & Event & {
  __typename: 'StakingAccountRemovedEvent';
  /** New staking account in SS58 encoding. */
  account: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type StakingAccountRemovedEventConnection = {
  __typename: 'StakingAccountRemovedEventConnection';
  edges: Array<StakingAccountRemovedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StakingAccountRemovedEventCreateInput = {
  account: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
};

export type StakingAccountRemovedEventEdge = {
  __typename: 'StakingAccountRemovedEventEdge';
  cursor: Scalars['String'];
  node: StakingAccountRemovedEvent;
};

export enum StakingAccountRemovedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StakingAccountRemovedEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
};

export type StakingAccountRemovedEventWhereInput = {
  AND?: Maybe<Array<StakingAccountRemovedEventWhereInput>>;
  OR?: Maybe<Array<StakingAccountRemovedEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type StakingAccountRemovedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type StandardDeleteResponse = {
  __typename: 'StandardDeleteResponse';
  id: Scalars['ID'];
};

export type StatusTextChangedEvent = BaseGraphQlObject & Event & {
  __typename: 'StatusTextChangedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Original action metadata as hex string */
  metadata?: Maybe<Scalars['String']>;
  /** Network the block was produced in */
  network: Network;
  /** Event result depeding on the metadata action type */
  result: WorkingGroupMetadataActionResult;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  upcomingworkinggroupopeningcreatedInEvent?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workinggroupmetadatasetInEvent?: Maybe<Array<WorkingGroupMetadata>>;
};

export type StatusTextChangedEventConnection = {
  __typename: 'StatusTextChangedEventConnection';
  edges: Array<StatusTextChangedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StatusTextChangedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  metadata?: Maybe<Scalars['String']>;
  network: Network;
  result: Scalars['JSONObject'];
};

export type StatusTextChangedEventEdge = {
  __typename: 'StatusTextChangedEventEdge';
  cursor: Scalars['String'];
  node: StatusTextChangedEvent;
};

export enum StatusTextChangedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type StatusTextChangedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  metadata?: Maybe<Scalars['String']>;
  network?: Maybe<Network>;
  result?: Maybe<Scalars['JSONObject']>;
};

export type StatusTextChangedEventWhereInput = {
  AND?: Maybe<Array<StatusTextChangedEventWhereInput>>;
  OR?: Maybe<Array<StatusTextChangedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  metadata_contains?: Maybe<Scalars['String']>;
  metadata_endsWith?: Maybe<Scalars['String']>;
  metadata_eq?: Maybe<Scalars['String']>;
  metadata_in?: Maybe<Array<Scalars['String']>>;
  metadata_startsWith?: Maybe<Scalars['String']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  result_json?: Maybe<Scalars['JSONObject']>;
  upcomingworkinggroupopeningcreatedInEvent_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningcreatedInEvent_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningcreatedInEvent_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workinggroupmetadatasetInEvent_every?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatasetInEvent_none?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatasetInEvent_some?: Maybe<WorkingGroupMetadataWhereInput>;
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
  AND?: Maybe<Array<TerminateWorkingGroupLeadProposalDetailsWhereInput>>;
  OR?: Maybe<Array<TerminateWorkingGroupLeadProposalDetailsWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  slashingAmount_eq?: Maybe<Scalars['BigInt']>;
  slashingAmount_gt?: Maybe<Scalars['BigInt']>;
  slashingAmount_gte?: Maybe<Scalars['BigInt']>;
  slashingAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  slashingAmount_lt?: Maybe<Scalars['BigInt']>;
  slashingAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type TerminateWorkingGroupLeadProposalDetailsWhereUniqueInput = {
  id: Scalars['ID'];
};

export type TerminatedLeaderEvent = BaseGraphQlObject & Event & {
  __typename: 'TerminatedLeaderEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type TerminatedLeaderEventConnection = {
  __typename: 'TerminatedLeaderEventConnection';
  edges: Array<TerminatedLeaderEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TerminatedLeaderEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
  worker: Scalars['ID'];
};

export type TerminatedLeaderEventEdge = {
  __typename: 'TerminatedLeaderEventEdge';
  cursor: Scalars['String'];
  node: TerminatedLeaderEvent;
};

export enum TerminatedLeaderEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PenaltyAsc = 'penalty_ASC',
  PenaltyDesc = 'penalty_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type TerminatedLeaderEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type TerminatedLeaderEventWhereInput = {
  AND?: Maybe<Array<TerminatedLeaderEventWhereInput>>;
  OR?: Maybe<Array<TerminatedLeaderEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  penalty_eq?: Maybe<Scalars['BigInt']>;
  penalty_gt?: Maybe<Scalars['BigInt']>;
  penalty_gte?: Maybe<Scalars['BigInt']>;
  penalty_in?: Maybe<Array<Scalars['BigInt']>>;
  penalty_lt?: Maybe<Scalars['BigInt']>;
  penalty_lte?: Maybe<Scalars['BigInt']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type TerminatedLeaderEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type TerminatedWorkerEvent = BaseGraphQlObject & Event & {
  __typename: 'TerminatedWorkerEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Slash amount (if any) */
  penalty?: Maybe<Scalars['BigInt']>;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type TerminatedWorkerEventConnection = {
  __typename: 'TerminatedWorkerEventConnection';
  edges: Array<TerminatedWorkerEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TerminatedWorkerEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
  worker: Scalars['ID'];
};

export type TerminatedWorkerEventEdge = {
  __typename: 'TerminatedWorkerEventEdge';
  cursor: Scalars['String'];
  node: TerminatedWorkerEvent;
};

export enum TerminatedWorkerEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PenaltyAsc = 'penalty_ASC',
  PenaltyDesc = 'penalty_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type TerminatedWorkerEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  penalty?: Maybe<Scalars['BigInt']>;
  rationale?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type TerminatedWorkerEventWhereInput = {
  AND?: Maybe<Array<TerminatedWorkerEventWhereInput>>;
  OR?: Maybe<Array<TerminatedWorkerEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  penalty_eq?: Maybe<Scalars['BigInt']>;
  penalty_gt?: Maybe<Scalars['BigInt']>;
  penalty_gte?: Maybe<Scalars['BigInt']>;
  penalty_in?: Maybe<Array<Scalars['BigInt']>>;
  penalty_lt?: Maybe<Scalars['BigInt']>;
  penalty_lte?: Maybe<Scalars['BigInt']>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type TerminatedWorkerEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadCreatedEvent = BaseGraphQlObject & {
  __typename: 'ThreadCreatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Thread's original text */
  text: Scalars['String'];
  thread: ForumThread;
  threadId: Scalars['String'];
  /** Thread's original title */
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ThreadCreatedEventConnection = {
  __typename: 'ThreadCreatedEventConnection';
  edges: Array<ThreadCreatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadCreatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  text: Scalars['String'];
  thread: Scalars['ID'];
  title: Scalars['String'];
};

export type ThreadCreatedEventEdge = {
  __typename: 'ThreadCreatedEventEdge';
  cursor: Scalars['String'];
  node: ThreadCreatedEvent;
};

export enum ThreadCreatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThreadCreatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  text?: Maybe<Scalars['String']>;
  thread?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
};

export type ThreadCreatedEventWhereInput = {
  AND?: Maybe<Array<ThreadCreatedEventWhereInput>>;
  OR?: Maybe<Array<ThreadCreatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  text_contains?: Maybe<Scalars['String']>;
  text_endsWith?: Maybe<Scalars['String']>;
  text_eq?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Scalars['String']>>;
  text_startsWith?: Maybe<Scalars['String']>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ThreadCreatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadDeletedEvent = BaseGraphQlObject & {
  __typename: 'ThreadDeletedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ThreadDeletedEventConnection = {
  __typename: 'ThreadDeletedEventConnection';
  edges: Array<ThreadDeletedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadDeletedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  thread: Scalars['ID'];
};

export type ThreadDeletedEventEdge = {
  __typename: 'ThreadDeletedEventEdge';
  cursor: Scalars['String'];
  node: ThreadDeletedEvent;
};

export enum ThreadDeletedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThreadDeletedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  thread?: Maybe<Scalars['ID']>;
};

export type ThreadDeletedEventWhereInput = {
  AND?: Maybe<Array<ThreadDeletedEventWhereInput>>;
  OR?: Maybe<Array<ThreadDeletedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ThreadDeletedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadMetadataUpdatedEvent = BaseGraphQlObject & {
  __typename: 'ThreadMetadataUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New title of the thread */
  newTitle?: Maybe<Scalars['String']>;
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ThreadMetadataUpdatedEventConnection = {
  __typename: 'ThreadMetadataUpdatedEventConnection';
  edges: Array<ThreadMetadataUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadMetadataUpdatedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newTitle?: Maybe<Scalars['String']>;
  thread: Scalars['ID'];
};

export type ThreadMetadataUpdatedEventEdge = {
  __typename: 'ThreadMetadataUpdatedEventEdge';
  cursor: Scalars['String'];
  node: ThreadMetadataUpdatedEvent;
};

export enum ThreadMetadataUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewTitleAsc = 'newTitle_ASC',
  NewTitleDesc = 'newTitle_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThreadMetadataUpdatedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newTitle?: Maybe<Scalars['String']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ThreadMetadataUpdatedEventWhereInput = {
  AND?: Maybe<Array<ThreadMetadataUpdatedEventWhereInput>>;
  OR?: Maybe<Array<ThreadMetadataUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newTitle_contains?: Maybe<Scalars['String']>;
  newTitle_endsWith?: Maybe<Scalars['String']>;
  newTitle_eq?: Maybe<Scalars['String']>;
  newTitle_in?: Maybe<Array<Scalars['String']>>;
  newTitle_startsWith?: Maybe<Scalars['String']>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ThreadMetadataUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadModeratedEvent = BaseGraphQlObject & {
  __typename: 'ThreadModeratedEvent';
  actor: Worker;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Rationale behind the moderation */
  rationale: Scalars['String'];
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ThreadModeratedEventConnection = {
  __typename: 'ThreadModeratedEventConnection';
  edges: Array<ThreadModeratedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadModeratedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rationale: Scalars['String'];
  thread: Scalars['ID'];
};

export type ThreadModeratedEventEdge = {
  __typename: 'ThreadModeratedEventEdge';
  cursor: Scalars['String'];
  node: ThreadModeratedEvent;
};

export enum ThreadModeratedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThreadModeratedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rationale?: Maybe<Scalars['String']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ThreadModeratedEventWhereInput = {
  AND?: Maybe<Array<ThreadModeratedEventWhereInput>>;
  OR?: Maybe<Array<ThreadModeratedEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type ThreadModeratedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type ThreadMovedEvent = BaseGraphQlObject & {
  __typename: 'ThreadMovedEvent';
  actor: Worker;
  actorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  newCategory: ForumCategory;
  newCategoryId: Scalars['String'];
  oldCategory: ForumCategory;
  oldCategoryId: Scalars['String'];
  thread: ForumThread;
  threadId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type ThreadMovedEventConnection = {
  __typename: 'ThreadMovedEventConnection';
  edges: Array<ThreadMovedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ThreadMovedEventCreateInput = {
  actor: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newCategory: Scalars['ID'];
  oldCategory: Scalars['ID'];
  thread: Scalars['ID'];
};

export type ThreadMovedEventEdge = {
  __typename: 'ThreadMovedEventEdge';
  cursor: Scalars['String'];
  node: ThreadMovedEvent;
};

export enum ThreadMovedEventOrderByInput {
  ActorAsc = 'actor_ASC',
  ActorDesc = 'actor_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewCategoryAsc = 'newCategory_ASC',
  NewCategoryDesc = 'newCategory_DESC',
  OldCategoryAsc = 'oldCategory_ASC',
  OldCategoryDesc = 'oldCategory_DESC',
  ThreadAsc = 'thread_ASC',
  ThreadDesc = 'thread_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type ThreadMovedEventUpdateInput = {
  actor?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newCategory?: Maybe<Scalars['ID']>;
  oldCategory?: Maybe<Scalars['ID']>;
  thread?: Maybe<Scalars['ID']>;
};

export type ThreadMovedEventWhereInput = {
  AND?: Maybe<Array<ThreadMovedEventWhereInput>>;
  OR?: Maybe<Array<ThreadMovedEventWhereInput>>;
  actor?: Maybe<WorkerWhereInput>;
  actor_eq?: Maybe<Scalars['ID']>;
  actor_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newCategory?: Maybe<ForumCategoryWhereInput>;
  newCategory_eq?: Maybe<Scalars['ID']>;
  newCategory_in?: Maybe<Array<Scalars['ID']>>;
  oldCategory?: Maybe<ForumCategoryWhereInput>;
  oldCategory_eq?: Maybe<Scalars['ID']>;
  oldCategory_in?: Maybe<Array<Scalars['ID']>>;
  thread?: Maybe<ForumThreadWhereInput>;
  thread_eq?: Maybe<Scalars['ID']>;
  thread_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<ThreadStatusActiveWhereInput>>;
  OR?: Maybe<Array<ThreadStatusActiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: ThreadsByTitleSearchResult;
  rank: Scalars['Float'];
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
  AND?: Maybe<Array<UnlockBlogPostProposalDetailsWhereInput>>;
  OR?: Maybe<Array<UnlockBlogPostProposalDetailsWhereInput>>;
  blogPost_contains?: Maybe<Scalars['String']>;
  blogPost_endsWith?: Maybe<Scalars['String']>;
  blogPost_eq?: Maybe<Scalars['String']>;
  blogPost_in?: Maybe<Array<Scalars['String']>>;
  blogPost_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<UpcomingOpeningAddedWhereInput>>;
  OR?: Maybe<Array<UpcomingOpeningAddedWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  upcomingOpeningId_contains?: Maybe<Scalars['String']>;
  upcomingOpeningId_endsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_eq?: Maybe<Scalars['String']>;
  upcomingOpeningId_in?: Maybe<Array<Scalars['String']>>;
  upcomingOpeningId_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<UpcomingOpeningRemovedWhereInput>>;
  OR?: Maybe<Array<UpcomingOpeningRemovedWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  upcomingOpeningId_contains?: Maybe<Scalars['String']>;
  upcomingOpeningId_endsWith?: Maybe<Scalars['String']>;
  upcomingOpeningId_eq?: Maybe<Scalars['String']>;
  upcomingOpeningId_in?: Maybe<Array<Scalars['String']>>;
  upcomingOpeningId_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type UpcomingOpeningRemovedWhereUniqueInput = {
  id: Scalars['ID'];
};

export type UpcomingWorkingGroupOpening = BaseGraphQlObject & {
  __typename: 'UpcomingWorkingGroupOpening';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: StatusTextChangedEvent;
  createdInEventId: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Expected opening start time */
  expectedStart?: Maybe<Scalars['DateTime']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  metadata: WorkingGroupOpeningMetadata;
  metadataId: Scalars['String'];
  /** Expected reward per block */
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  /** Expected min. application/role stake amount */
  stakeAmount?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type UpcomingWorkingGroupOpeningConnection = {
  __typename: 'UpcomingWorkingGroupOpeningConnection';
  edges: Array<UpcomingWorkingGroupOpeningEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UpcomingWorkingGroupOpeningCreateInput = {
  createdInEvent: Scalars['ID'];
  expectedStart?: Maybe<Scalars['DateTime']>;
  group: Scalars['ID'];
  metadata: Scalars['ID'];
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
};

export type UpcomingWorkingGroupOpeningEdge = {
  __typename: 'UpcomingWorkingGroupOpeningEdge';
  cursor: Scalars['String'];
  node: UpcomingWorkingGroupOpening;
};

export enum UpcomingWorkingGroupOpeningOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInEventAsc = 'createdInEvent_ASC',
  CreatedInEventDesc = 'createdInEvent_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  ExpectedStartAsc = 'expectedStart_ASC',
  ExpectedStartDesc = 'expectedStart_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC',
  StakeAmountAsc = 'stakeAmount_ASC',
  StakeAmountDesc = 'stakeAmount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UpcomingWorkingGroupOpeningUpdateInput = {
  createdInEvent?: Maybe<Scalars['ID']>;
  expectedStart?: Maybe<Scalars['DateTime']>;
  group?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['ID']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
};

export type UpcomingWorkingGroupOpeningWhereInput = {
  AND?: Maybe<Array<UpcomingWorkingGroupOpeningWhereInput>>;
  OR?: Maybe<Array<UpcomingWorkingGroupOpeningWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<StatusTextChangedEventWhereInput>;
  createdInEvent_eq?: Maybe<Scalars['ID']>;
  createdInEvent_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  expectedStart_eq?: Maybe<Scalars['DateTime']>;
  expectedStart_gt?: Maybe<Scalars['DateTime']>;
  expectedStart_gte?: Maybe<Scalars['DateTime']>;
  expectedStart_lt?: Maybe<Scalars['DateTime']>;
  expectedStart_lte?: Maybe<Scalars['DateTime']>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  metadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<UpdateWorkingGroupBudgetProposalDetailsWhereInput>>;
  OR?: Maybe<Array<UpdateWorkingGroupBudgetProposalDetailsWhereInput>>;
  amount_eq?: Maybe<Scalars['BigInt']>;
  amount_gt?: Maybe<Scalars['BigInt']>;
  amount_gte?: Maybe<Scalars['BigInt']>;
  amount_in?: Maybe<Array<Scalars['BigInt']>>;
  amount_lt?: Maybe<Scalars['BigInt']>;
  amount_lte?: Maybe<Scalars['BigInt']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<VariantNoneWhereInput>>;
  OR?: Maybe<Array<VariantNoneWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  category?: Maybe<VideoCategory>;
  categoryId?: Maybe<Scalars['String']>;
  channel: Channel;
  channelId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** The description of the Video */
  description?: Maybe<Scalars['String']>;
  /** Video duration in seconds */
  duration?: Maybe<Scalars['Int']>;
  /** Whether or not Video contains marketing */
  hasMarketing?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /** Flag signaling whether a video is censored. */
  isCensored: Scalars['Boolean'];
  /** Whether the Video contains explicit material. */
  isExplicit?: Maybe<Scalars['Boolean']>;
  /** Is video featured or not */
  isFeatured: Scalars['Boolean'];
  /** Whether the Video is supposed to be publically displayed */
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Language>;
  languageId?: Maybe<Scalars['String']>;
  license?: Maybe<License>;
  licenseId?: Maybe<Scalars['String']>;
  /** Video media asset */
  media?: Maybe<Asset>;
  mediaMetadata?: Maybe<VideoMediaMetadata>;
  mediaMetadataId?: Maybe<Scalars['String']>;
  /** If the Video was published on other platform before beeing published on Joystream - the original publication date */
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  /** Video thumbnail asset (recommended ratio: 16:9) */
  thumbnailPhoto?: Maybe<Asset>;
  /** The title of the video */
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type VideoCategoriesByNameFtsOutput = {
  __typename: 'VideoCategoriesByNameFTSOutput';
  highlight: Scalars['String'];
  isTypeOf: Scalars['String'];
  item: VideoCategoriesByNameSearchResult;
  rank: Scalars['Float'];
};

export type VideoCategoriesByNameSearchResult = VideoCategory;

export type VideoCategory = BaseGraphQlObject & {
  __typename: 'VideoCategory';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The name of the category */
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  videos: Array<Video>;
};

export type VideoCategoryConnection = {
  __typename: 'VideoCategoryConnection';
  edges: Array<VideoCategoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VideoCategoryCreateInput = {
  createdInBlock: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
};

export type VideoCategoryEdge = {
  __typename: 'VideoCategoryEdge';
  cursor: Scalars['String'];
  node: VideoCategory;
};

export enum VideoCategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VideoCategoryUpdateInput = {
  createdInBlock?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type VideoCategoryWhereInput = {
  AND?: Maybe<Array<VideoCategoryWhereInput>>;
  OR?: Maybe<Array<VideoCategoryWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_eq?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  videos_every?: Maybe<VideoWhereInput>;
  videos_none?: Maybe<VideoWhereInput>;
  videos_some?: Maybe<VideoWhereInput>;
};

export type VideoCategoryWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VideoConnection = {
  __typename: 'VideoConnection';
  edges: Array<VideoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VideoCreateInput = {
  category?: Maybe<Scalars['ID']>;
  channel: Scalars['ID'];
  createdInBlock: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  hasMarketing?: Maybe<Scalars['Boolean']>;
  isCensored: Scalars['Boolean'];
  isExplicit?: Maybe<Scalars['Boolean']>;
  isFeatured: Scalars['Boolean'];
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['ID']>;
  license?: Maybe<Scalars['ID']>;
  media: Scalars['JSONObject'];
  mediaMetadata?: Maybe<Scalars['ID']>;
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  thumbnailPhoto: Scalars['JSONObject'];
  title?: Maybe<Scalars['String']>;
};

export type VideoEdge = {
  __typename: 'VideoEdge';
  cursor: Scalars['String'];
  node: Video;
};

export type VideoMediaEncoding = BaseGraphQlObject & {
  __typename: 'VideoMediaEncoding';
  /** Encoding of the video media object */
  codecName?: Maybe<Scalars['String']>;
  /** Media container format */
  container?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Content MIME type */
  mimeMediaType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  videomediametadataencoding?: Maybe<Array<VideoMediaMetadata>>;
};

export type VideoMediaEncodingConnection = {
  __typename: 'VideoMediaEncodingConnection';
  edges: Array<VideoMediaEncodingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VideoMediaEncodingCreateInput = {
  codecName?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  mimeMediaType?: Maybe<Scalars['String']>;
};

export type VideoMediaEncodingEdge = {
  __typename: 'VideoMediaEncodingEdge';
  cursor: Scalars['String'];
  node: VideoMediaEncoding;
};

export enum VideoMediaEncodingOrderByInput {
  CodecNameAsc = 'codecName_ASC',
  CodecNameDesc = 'codecName_DESC',
  ContainerAsc = 'container_ASC',
  ContainerDesc = 'container_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  MimeMediaTypeAsc = 'mimeMediaType_ASC',
  MimeMediaTypeDesc = 'mimeMediaType_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VideoMediaEncodingUpdateInput = {
  codecName?: Maybe<Scalars['String']>;
  container?: Maybe<Scalars['String']>;
  mimeMediaType?: Maybe<Scalars['String']>;
};

export type VideoMediaEncodingWhereInput = {
  AND?: Maybe<Array<VideoMediaEncodingWhereInput>>;
  OR?: Maybe<Array<VideoMediaEncodingWhereInput>>;
  codecName_contains?: Maybe<Scalars['String']>;
  codecName_endsWith?: Maybe<Scalars['String']>;
  codecName_eq?: Maybe<Scalars['String']>;
  codecName_in?: Maybe<Array<Scalars['String']>>;
  codecName_startsWith?: Maybe<Scalars['String']>;
  container_contains?: Maybe<Scalars['String']>;
  container_endsWith?: Maybe<Scalars['String']>;
  container_eq?: Maybe<Scalars['String']>;
  container_in?: Maybe<Array<Scalars['String']>>;
  container_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  mimeMediaType_contains?: Maybe<Scalars['String']>;
  mimeMediaType_endsWith?: Maybe<Scalars['String']>;
  mimeMediaType_eq?: Maybe<Scalars['String']>;
  mimeMediaType_in?: Maybe<Array<Scalars['String']>>;
  mimeMediaType_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  videomediametadataencoding_every?: Maybe<VideoMediaMetadataWhereInput>;
  videomediametadataencoding_none?: Maybe<VideoMediaMetadataWhereInput>;
  videomediametadataencoding_some?: Maybe<VideoMediaMetadataWhereInput>;
};

export type VideoMediaEncodingWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VideoMediaMetadata = BaseGraphQlObject & {
  __typename: 'VideoMediaMetadata';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInBlock: Scalars['Int'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  encoding?: Maybe<VideoMediaEncoding>;
  encodingId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Video media height in pixels */
  pixelHeight?: Maybe<Scalars['Int']>;
  /** Video media width in pixels */
  pixelWidth?: Maybe<Scalars['Int']>;
  /** Video media size in bytes */
  size?: Maybe<Scalars['BigInt']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  video?: Maybe<Video>;
};

export type VideoMediaMetadataConnection = {
  __typename: 'VideoMediaMetadataConnection';
  edges: Array<VideoMediaMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VideoMediaMetadataCreateInput = {
  createdInBlock: Scalars['Float'];
  encoding?: Maybe<Scalars['ID']>;
  pixelHeight?: Maybe<Scalars['Float']>;
  pixelWidth?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['BigInt']>;
};

export type VideoMediaMetadataEdge = {
  __typename: 'VideoMediaMetadataEdge';
  cursor: Scalars['String'];
  node: VideoMediaMetadata;
};

export enum VideoMediaMetadataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  EncodingAsc = 'encoding_ASC',
  EncodingDesc = 'encoding_DESC',
  PixelHeightAsc = 'pixelHeight_ASC',
  PixelHeightDesc = 'pixelHeight_DESC',
  PixelWidthAsc = 'pixelWidth_ASC',
  PixelWidthDesc = 'pixelWidth_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VideoMediaMetadataUpdateInput = {
  createdInBlock?: Maybe<Scalars['Float']>;
  encoding?: Maybe<Scalars['ID']>;
  pixelHeight?: Maybe<Scalars['Float']>;
  pixelWidth?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['BigInt']>;
};

export type VideoMediaMetadataWhereInput = {
  AND?: Maybe<Array<VideoMediaMetadataWhereInput>>;
  OR?: Maybe<Array<VideoMediaMetadataWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  encoding?: Maybe<VideoMediaEncodingWhereInput>;
  encoding_eq?: Maybe<Scalars['ID']>;
  encoding_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  pixelHeight_eq?: Maybe<Scalars['Int']>;
  pixelHeight_gt?: Maybe<Scalars['Int']>;
  pixelHeight_gte?: Maybe<Scalars['Int']>;
  pixelHeight_in?: Maybe<Array<Scalars['Int']>>;
  pixelHeight_lt?: Maybe<Scalars['Int']>;
  pixelHeight_lte?: Maybe<Scalars['Int']>;
  pixelWidth_eq?: Maybe<Scalars['Int']>;
  pixelWidth_gt?: Maybe<Scalars['Int']>;
  pixelWidth_gte?: Maybe<Scalars['Int']>;
  pixelWidth_in?: Maybe<Array<Scalars['Int']>>;
  pixelWidth_lt?: Maybe<Scalars['Int']>;
  pixelWidth_lte?: Maybe<Scalars['Int']>;
  size_eq?: Maybe<Scalars['BigInt']>;
  size_gt?: Maybe<Scalars['BigInt']>;
  size_gte?: Maybe<Scalars['BigInt']>;
  size_in?: Maybe<Array<Scalars['BigInt']>>;
  size_lt?: Maybe<Scalars['BigInt']>;
  size_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  video?: Maybe<VideoWhereInput>;
};

export type VideoMediaMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum VideoOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  ChannelAsc = 'channel_ASC',
  ChannelDesc = 'channel_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedInBlockAsc = 'createdInBlock_ASC',
  CreatedInBlockDesc = 'createdInBlock_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  DurationAsc = 'duration_ASC',
  DurationDesc = 'duration_DESC',
  HasMarketingAsc = 'hasMarketing_ASC',
  HasMarketingDesc = 'hasMarketing_DESC',
  IsCensoredAsc = 'isCensored_ASC',
  IsCensoredDesc = 'isCensored_DESC',
  IsExplicitAsc = 'isExplicit_ASC',
  IsExplicitDesc = 'isExplicit_DESC',
  IsFeaturedAsc = 'isFeatured_ASC',
  IsFeaturedDesc = 'isFeatured_DESC',
  IsPublicAsc = 'isPublic_ASC',
  IsPublicDesc = 'isPublic_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  LicenseAsc = 'license_ASC',
  LicenseDesc = 'license_DESC',
  MediaMetadataAsc = 'mediaMetadata_ASC',
  MediaMetadataDesc = 'mediaMetadata_DESC',
  PublishedBeforeJoystreamAsc = 'publishedBeforeJoystream_ASC',
  PublishedBeforeJoystreamDesc = 'publishedBeforeJoystream_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VideoUpdateInput = {
  category?: Maybe<Scalars['ID']>;
  channel?: Maybe<Scalars['ID']>;
  createdInBlock?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  hasMarketing?: Maybe<Scalars['Boolean']>;
  isCensored?: Maybe<Scalars['Boolean']>;
  isExplicit?: Maybe<Scalars['Boolean']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['ID']>;
  license?: Maybe<Scalars['ID']>;
  media?: Maybe<Scalars['JSONObject']>;
  mediaMetadata?: Maybe<Scalars['ID']>;
  publishedBeforeJoystream?: Maybe<Scalars['DateTime']>;
  thumbnailPhoto?: Maybe<Scalars['JSONObject']>;
  title?: Maybe<Scalars['String']>;
};

export type VideoWhereInput = {
  AND?: Maybe<Array<VideoWhereInput>>;
  OR?: Maybe<Array<VideoWhereInput>>;
  category?: Maybe<VideoCategoryWhereInput>;
  category_eq?: Maybe<Scalars['ID']>;
  category_in?: Maybe<Array<Scalars['ID']>>;
  channel?: Maybe<ChannelWhereInput>;
  channel_eq?: Maybe<Scalars['ID']>;
  channel_in?: Maybe<Array<Scalars['ID']>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInBlock_eq?: Maybe<Scalars['Int']>;
  createdInBlock_gt?: Maybe<Scalars['Int']>;
  createdInBlock_gte?: Maybe<Scalars['Int']>;
  createdInBlock_in?: Maybe<Array<Scalars['Int']>>;
  createdInBlock_lt?: Maybe<Scalars['Int']>;
  createdInBlock_lte?: Maybe<Scalars['Int']>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  duration_eq?: Maybe<Scalars['Int']>;
  duration_gt?: Maybe<Scalars['Int']>;
  duration_gte?: Maybe<Scalars['Int']>;
  duration_in?: Maybe<Array<Scalars['Int']>>;
  duration_lt?: Maybe<Scalars['Int']>;
  duration_lte?: Maybe<Scalars['Int']>;
  hasMarketing_eq?: Maybe<Scalars['Boolean']>;
  hasMarketing_in?: Maybe<Array<Scalars['Boolean']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isCensored_eq?: Maybe<Scalars['Boolean']>;
  isCensored_in?: Maybe<Array<Scalars['Boolean']>>;
  isExplicit_eq?: Maybe<Scalars['Boolean']>;
  isExplicit_in?: Maybe<Array<Scalars['Boolean']>>;
  isFeatured_eq?: Maybe<Scalars['Boolean']>;
  isFeatured_in?: Maybe<Array<Scalars['Boolean']>>;
  isPublic_eq?: Maybe<Scalars['Boolean']>;
  isPublic_in?: Maybe<Array<Scalars['Boolean']>>;
  language?: Maybe<LanguageWhereInput>;
  language_eq?: Maybe<Scalars['ID']>;
  language_in?: Maybe<Array<Scalars['ID']>>;
  license?: Maybe<LicenseWhereInput>;
  license_eq?: Maybe<Scalars['ID']>;
  license_in?: Maybe<Array<Scalars['ID']>>;
  mediaMetadata?: Maybe<VideoMediaMetadataWhereInput>;
  mediaMetadata_eq?: Maybe<Scalars['ID']>;
  mediaMetadata_in?: Maybe<Array<Scalars['ID']>>;
  media_json?: Maybe<Scalars['JSONObject']>;
  publishedBeforeJoystream_eq?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_gt?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_gte?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_lt?: Maybe<Scalars['DateTime']>;
  publishedBeforeJoystream_lte?: Maybe<Scalars['DateTime']>;
  thumbnailPhoto_json?: Maybe<Scalars['JSONObject']>;
  title_contains?: Maybe<Scalars['String']>;
  title_endsWith?: Maybe<Scalars['String']>;
  title_eq?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Scalars['String']>>;
  title_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type VideoWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteCastEvent = BaseGraphQlObject & Event & {
  __typename: 'VoteCastEvent';
  /** Account that cast the vote. */
  account: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Hash of sealed vote. */
  hash: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  /** Vote power decided by amount staked. */
  votePower: Scalars['BigInt'];
};

export type VoteCastEventConnection = {
  __typename: 'VoteCastEventConnection';
  edges: Array<VoteCastEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VoteCastEventCreateInput = {
  account: Scalars['String'];
  hash: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  votePower: Scalars['BigInt'];
};

export type VoteCastEventEdge = {
  __typename: 'VoteCastEventEdge';
  cursor: Scalars['String'];
  node: VoteCastEvent;
};

export enum VoteCastEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  HashAsc = 'hash_ASC',
  HashDesc = 'hash_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VotePowerAsc = 'votePower_ASC',
  VotePowerDesc = 'votePower_DESC'
}

export type VoteCastEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  votePower?: Maybe<Scalars['BigInt']>;
};

export type VoteCastEventWhereInput = {
  AND?: Maybe<Array<VoteCastEventWhereInput>>;
  OR?: Maybe<Array<VoteCastEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  hash_contains?: Maybe<Scalars['String']>;
  hash_endsWith?: Maybe<Scalars['String']>;
  hash_eq?: Maybe<Scalars['String']>;
  hash_in?: Maybe<Array<Scalars['String']>>;
  hash_startsWith?: Maybe<Scalars['String']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votePower_eq?: Maybe<Scalars['BigInt']>;
  votePower_gt?: Maybe<Scalars['BigInt']>;
  votePower_gte?: Maybe<Scalars['BigInt']>;
  votePower_in?: Maybe<Array<Scalars['BigInt']>>;
  votePower_lt?: Maybe<Scalars['BigInt']>;
  votePower_lte?: Maybe<Scalars['BigInt']>;
};

export type VoteCastEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteOnPollEvent = BaseGraphQlObject & {
  __typename: 'VoteOnPollEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  pollAlternative: ForumPollAlternative;
  pollAlternativeId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  votingMember: Membership;
  votingMemberId: Scalars['String'];
};

export type VoteOnPollEventConnection = {
  __typename: 'VoteOnPollEventConnection';
  edges: Array<VoteOnPollEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VoteOnPollEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  pollAlternative: Scalars['ID'];
  votingMember: Scalars['ID'];
};

export type VoteOnPollEventEdge = {
  __typename: 'VoteOnPollEventEdge';
  cursor: Scalars['String'];
  node: VoteOnPollEvent;
};

export enum VoteOnPollEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  PollAlternativeAsc = 'pollAlternative_ASC',
  PollAlternativeDesc = 'pollAlternative_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VotingMemberAsc = 'votingMember_ASC',
  VotingMemberDesc = 'votingMember_DESC'
}

export type VoteOnPollEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  pollAlternative?: Maybe<Scalars['ID']>;
  votingMember?: Maybe<Scalars['ID']>;
};

export type VoteOnPollEventWhereInput = {
  AND?: Maybe<Array<VoteOnPollEventWhereInput>>;
  OR?: Maybe<Array<VoteOnPollEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  pollAlternative?: Maybe<ForumPollAlternativeWhereInput>;
  pollAlternative_eq?: Maybe<Scalars['ID']>;
  pollAlternative_in?: Maybe<Array<Scalars['ID']>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  votingMember?: Maybe<MembershipWhereInput>;
  votingMember_eq?: Maybe<Scalars['ID']>;
  votingMember_in?: Maybe<Array<Scalars['ID']>>;
};

export type VoteOnPollEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VoteRevealedEvent = BaseGraphQlObject & Event & {
  __typename: 'VoteRevealedEvent';
  /** Account that cast a vote. */
  account: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  member: Membership;
  memberId: Scalars['String'];
  /** Network the block was produced in */
  network: Network;
  /** Salt that has been used for the vote's hash creation. */
  salt: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type VoteRevealedEventConnection = {
  __typename: 'VoteRevealedEventConnection';
  edges: Array<VoteRevealedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VoteRevealedEventCreateInput = {
  account: Scalars['String'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  member: Scalars['ID'];
  network: Network;
  salt: Scalars['String'];
};

export type VoteRevealedEventEdge = {
  __typename: 'VoteRevealedEventEdge';
  cursor: Scalars['String'];
  node: VoteRevealedEvent;
};

export enum VoteRevealedEventOrderByInput {
  AccountAsc = 'account_ASC',
  AccountDesc = 'account_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  MemberAsc = 'member_ASC',
  MemberDesc = 'member_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  SaltAsc = 'salt_ASC',
  SaltDesc = 'salt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VoteRevealedEventUpdateInput = {
  account?: Maybe<Scalars['String']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  member?: Maybe<Scalars['ID']>;
  network?: Maybe<Network>;
  salt?: Maybe<Scalars['String']>;
};

export type VoteRevealedEventWhereInput = {
  AND?: Maybe<Array<VoteRevealedEventWhereInput>>;
  OR?: Maybe<Array<VoteRevealedEventWhereInput>>;
  account_contains?: Maybe<Scalars['String']>;
  account_endsWith?: Maybe<Scalars['String']>;
  account_eq?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  member?: Maybe<MembershipWhereInput>;
  member_eq?: Maybe<Scalars['ID']>;
  member_in?: Maybe<Array<Scalars['ID']>>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  salt_contains?: Maybe<Scalars['String']>;
  salt_endsWith?: Maybe<Scalars['String']>;
  salt_eq?: Maybe<Scalars['String']>;
  salt_in?: Maybe<Array<Scalars['String']>>;
  salt_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type VoteRevealedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type VotingPeriodStartedEvent = BaseGraphQlObject & Event & {
  __typename: 'VotingPeriodStartedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Number of candidates in the election. */
  numOfCandidates: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type VotingPeriodStartedEventConnection = {
  __typename: 'VotingPeriodStartedEventConnection';
  edges: Array<VotingPeriodStartedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type VotingPeriodStartedEventCreateInput = {
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  numOfCandidates: Scalars['BigInt'];
};

export type VotingPeriodStartedEventEdge = {
  __typename: 'VotingPeriodStartedEventEdge';
  cursor: Scalars['String'];
  node: VotingPeriodStartedEvent;
};

export enum VotingPeriodStartedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NumOfCandidatesAsc = 'numOfCandidates_ASC',
  NumOfCandidatesDesc = 'numOfCandidates_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type VotingPeriodStartedEventUpdateInput = {
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  numOfCandidates?: Maybe<Scalars['BigInt']>;
};

export type VotingPeriodStartedEventWhereInput = {
  AND?: Maybe<Array<VotingPeriodStartedEventWhereInput>>;
  OR?: Maybe<Array<VotingPeriodStartedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  numOfCandidates_eq?: Maybe<Scalars['BigInt']>;
  numOfCandidates_gt?: Maybe<Scalars['BigInt']>;
  numOfCandidates_gte?: Maybe<Scalars['BigInt']>;
  numOfCandidates_in?: Maybe<Array<Scalars['BigInt']>>;
  numOfCandidates_lt?: Maybe<Scalars['BigInt']>;
  numOfCandidates_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type VotingPeriodStartedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Worker = BaseGraphQlObject & {
  __typename: 'Worker';
  application: WorkingGroupApplication;
  applicationId: Scalars['String'];
  categoryarchivalstatusupdatedeventactor?: Maybe<Array<CategoryArchivalStatusUpdatedEvent>>;
  categorydeletedeventactor?: Maybe<Array<CategoryDeletedEvent>>;
  categorymembershipofmoderatorupdatedeventmoderator?: Maybe<Array<CategoryMembershipOfModeratorUpdatedEvent>>;
  categorystickythreadupdateeventactor?: Maybe<Array<CategoryStickyThreadUpdateEvent>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  dataObjects: Array<DataObject>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  entry: OpeningFilledEvent;
  entryId: Scalars['String'];
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Whether the worker is also the working group lead */
  isLead: Scalars['Boolean'];
  leaderseteventworker?: Maybe<Array<LeaderSetEvent>>;
  leaderunseteventleader?: Maybe<Array<LeaderUnsetEvent>>;
  managedForumCategories: Array<ForumCategory>;
  membership: Membership;
  membershipId: Scalars['String'];
  memberverificationstatusupdatedeventworker?: Maybe<Array<MemberVerificationStatusUpdatedEvent>>;
  /** The reward amount the worker is currently missing (due to empty working group budget) */
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  newmissedrewardlevelreachedeventworker?: Maybe<Array<NewMissedRewardLevelReachedEvent>>;
  payouts: Array<RewardPaidEvent>;
  postmoderatedeventactor?: Maybe<Array<PostModeratedEvent>>;
  /** Worker's reward account */
  rewardAccount: Scalars['String'];
  /** Current reward per block */
  rewardPerBlock: Scalars['BigInt'];
  /** Worker's role account */
  roleAccount: Scalars['String'];
  /** WorkerId in specific working group module */
  runtimeId: Scalars['Int'];
  slashes: Array<StakeSlashedEvent>;
  /** Current role stake (in JOY) */
  stake: Scalars['BigInt'];
  /** Worker's staking account */
  stakeAccount: Scalars['String'];
  stakedecreasedeventworker?: Maybe<Array<StakeDecreasedEvent>>;
  stakeincreasedeventworker?: Maybe<Array<StakeIncreasedEvent>>;
  /** Current worker status */
  status: WorkerStatus;
  /** Worker's storage data */
  storage?: Maybe<Scalars['String']>;
  terminatedleadereventworker?: Maybe<Array<TerminatedLeaderEvent>>;
  terminatedworkereventworker?: Maybe<Array<TerminatedWorkerEvent>>;
  threadmoderatedeventactor?: Maybe<Array<ThreadModeratedEvent>>;
  threadmovedeventactor?: Maybe<Array<ThreadMovedEvent>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workerexitedeventworker?: Maybe<Array<WorkerExitedEvent>>;
  workerrewardaccountupdatedeventworker?: Maybe<Array<WorkerRewardAccountUpdatedEvent>>;
  workerrewardamountupdatedeventworker?: Maybe<Array<WorkerRewardAmountUpdatedEvent>>;
  workerroleaccountupdatedeventworker?: Maybe<Array<WorkerRoleAccountUpdatedEvent>>;
  workerstartedleavingeventworker?: Maybe<Array<WorkerStartedLeavingEvent>>;
  workinggroupleader?: Maybe<Array<WorkingGroup>>;
};

export type WorkerConnection = {
  __typename: 'WorkerConnection';
  edges: Array<WorkerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerCreateInput = {
  application: Scalars['ID'];
  entry: Scalars['ID'];
  group: Scalars['ID'];
  isLead: Scalars['Boolean'];
  membership: Scalars['ID'];
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  rewardAccount: Scalars['String'];
  rewardPerBlock: Scalars['BigInt'];
  roleAccount: Scalars['String'];
  runtimeId: Scalars['Float'];
  stake: Scalars['BigInt'];
  stakeAccount: Scalars['String'];
  status: Scalars['JSONObject'];
  storage?: Maybe<Scalars['String']>;
};

export type WorkerEdge = {
  __typename: 'WorkerEdge';
  cursor: Scalars['String'];
  node: Worker;
};

export type WorkerExitedEvent = BaseGraphQlObject & Event & {
  __typename: 'WorkerExitedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerExitedEventConnection = {
  __typename: 'WorkerExitedEventConnection';
  edges: Array<WorkerExitedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerExitedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  worker: Scalars['ID'];
};

export type WorkerExitedEventEdge = {
  __typename: 'WorkerExitedEventEdge';
  cursor: Scalars['String'];
  node: WorkerExitedEvent;
};

export enum WorkerExitedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerExitedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerExitedEventWhereInput = {
  AND?: Maybe<Array<WorkerExitedEventWhereInput>>;
  OR?: Maybe<Array<WorkerExitedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type WorkerExitedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkerOrderByInput {
  ApplicationAsc = 'application_ASC',
  ApplicationDesc = 'application_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  EntryAsc = 'entry_ASC',
  EntryDesc = 'entry_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  IsLeadAsc = 'isLead_ASC',
  IsLeadDesc = 'isLead_DESC',
  MembershipAsc = 'membership_ASC',
  MembershipDesc = 'membership_DESC',
  MissingRewardAmountAsc = 'missingRewardAmount_ASC',
  MissingRewardAmountDesc = 'missingRewardAmount_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC',
  RoleAccountAsc = 'roleAccount_ASC',
  RoleAccountDesc = 'roleAccount_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  StakeAccountAsc = 'stakeAccount_ASC',
  StakeAccountDesc = 'stakeAccount_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  StorageAsc = 'storage_ASC',
  StorageDesc = 'storage_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkerRewardAccountUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'WorkerRewardAccountUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New reward account */
  newRewardAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerRewardAccountUpdatedEventConnection = {
  __typename: 'WorkerRewardAccountUpdatedEventConnection';
  edges: Array<WorkerRewardAccountUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerRewardAccountUpdatedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newRewardAccount: Scalars['String'];
  worker: Scalars['ID'];
};

export type WorkerRewardAccountUpdatedEventEdge = {
  __typename: 'WorkerRewardAccountUpdatedEventEdge';
  cursor: Scalars['String'];
  node: WorkerRewardAccountUpdatedEvent;
};

export enum WorkerRewardAccountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewRewardAccountAsc = 'newRewardAccount_ASC',
  NewRewardAccountDesc = 'newRewardAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerRewardAccountUpdatedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newRewardAccount?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerRewardAccountUpdatedEventWhereInput = {
  AND?: Maybe<Array<WorkerRewardAccountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRewardAccountUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newRewardAccount_contains?: Maybe<Scalars['String']>;
  newRewardAccount_endsWith?: Maybe<Scalars['String']>;
  newRewardAccount_eq?: Maybe<Scalars['String']>;
  newRewardAccount_in?: Maybe<Array<Scalars['String']>>;
  newRewardAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type WorkerRewardAccountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerRewardAmountUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'WorkerRewardAmountUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New worker reward per block */
  newRewardPerBlock: Scalars['BigInt'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerRewardAmountUpdatedEventConnection = {
  __typename: 'WorkerRewardAmountUpdatedEventConnection';
  edges: Array<WorkerRewardAmountUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerRewardAmountUpdatedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newRewardPerBlock: Scalars['BigInt'];
  worker: Scalars['ID'];
};

export type WorkerRewardAmountUpdatedEventEdge = {
  __typename: 'WorkerRewardAmountUpdatedEventEdge';
  cursor: Scalars['String'];
  node: WorkerRewardAmountUpdatedEvent;
};

export enum WorkerRewardAmountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewRewardPerBlockAsc = 'newRewardPerBlock_ASC',
  NewRewardPerBlockDesc = 'newRewardPerBlock_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerRewardAmountUpdatedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newRewardPerBlock?: Maybe<Scalars['BigInt']>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerRewardAmountUpdatedEventWhereInput = {
  AND?: Maybe<Array<WorkerRewardAmountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRewardAmountUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newRewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  newRewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  newRewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type WorkerRewardAmountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerRoleAccountUpdatedEvent = BaseGraphQlObject & Event & {
  __typename: 'WorkerRoleAccountUpdatedEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** New role account */
  newRoleAccount: Scalars['String'];
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerRoleAccountUpdatedEventConnection = {
  __typename: 'WorkerRoleAccountUpdatedEventConnection';
  edges: Array<WorkerRoleAccountUpdatedEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerRoleAccountUpdatedEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  newRoleAccount: Scalars['String'];
  worker: Scalars['ID'];
};

export type WorkerRoleAccountUpdatedEventEdge = {
  __typename: 'WorkerRoleAccountUpdatedEventEdge';
  cursor: Scalars['String'];
  node: WorkerRoleAccountUpdatedEvent;
};

export enum WorkerRoleAccountUpdatedEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  NewRoleAccountAsc = 'newRoleAccount_ASC',
  NewRoleAccountDesc = 'newRoleAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerRoleAccountUpdatedEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  newRoleAccount?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerRoleAccountUpdatedEventWhereInput = {
  AND?: Maybe<Array<WorkerRoleAccountUpdatedEventWhereInput>>;
  OR?: Maybe<Array<WorkerRoleAccountUpdatedEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  newRoleAccount_contains?: Maybe<Scalars['String']>;
  newRoleAccount_endsWith?: Maybe<Scalars['String']>;
  newRoleAccount_eq?: Maybe<Scalars['String']>;
  newRoleAccount_in?: Maybe<Array<Scalars['String']>>;
  newRoleAccount_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
};

export type WorkerRoleAccountUpdatedEventWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkerStartedLeavingEvent = BaseGraphQlObject & Event & {
  __typename: 'WorkerStartedLeavingEvent';
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  /** Blocknumber of the block in which the event was emitted. */
  inBlock: Scalars['Int'];
  /** Hash of the extrinsic which caused the event to be emitted */
  inExtrinsic?: Maybe<Scalars['String']>;
  /** Index of event in block from which it was emitted. */
  indexInBlock: Scalars['Int'];
  /** Network the block was produced in */
  network: Network;
  /** Optional rationale */
  rationale?: Maybe<Scalars['String']>;
  /** Filtering options for interface implementers */
  type?: Maybe<EventTypeOptions>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  worker: Worker;
  workerId: Scalars['String'];
};

export type WorkerStartedLeavingEventConnection = {
  __typename: 'WorkerStartedLeavingEventConnection';
  edges: Array<WorkerStartedLeavingEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkerStartedLeavingEventCreateInput = {
  group: Scalars['ID'];
  inBlock: Scalars['Float'];
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock: Scalars['Float'];
  network: Network;
  rationale?: Maybe<Scalars['String']>;
  worker: Scalars['ID'];
};

export type WorkerStartedLeavingEventEdge = {
  __typename: 'WorkerStartedLeavingEventEdge';
  cursor: Scalars['String'];
  node: WorkerStartedLeavingEvent;
};

export enum WorkerStartedLeavingEventOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  InBlockAsc = 'inBlock_ASC',
  InBlockDesc = 'inBlock_DESC',
  InExtrinsicAsc = 'inExtrinsic_ASC',
  InExtrinsicDesc = 'inExtrinsic_DESC',
  IndexInBlockAsc = 'indexInBlock_ASC',
  IndexInBlockDesc = 'indexInBlock_DESC',
  NetworkAsc = 'network_ASC',
  NetworkDesc = 'network_DESC',
  RationaleAsc = 'rationale_ASC',
  RationaleDesc = 'rationale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WorkerAsc = 'worker_ASC',
  WorkerDesc = 'worker_DESC'
}

export type WorkerStartedLeavingEventUpdateInput = {
  group?: Maybe<Scalars['ID']>;
  inBlock?: Maybe<Scalars['Float']>;
  inExtrinsic?: Maybe<Scalars['String']>;
  indexInBlock?: Maybe<Scalars['Float']>;
  network?: Maybe<Network>;
  rationale?: Maybe<Scalars['String']>;
  worker?: Maybe<Scalars['ID']>;
};

export type WorkerStartedLeavingEventWhereInput = {
  AND?: Maybe<Array<WorkerStartedLeavingEventWhereInput>>;
  OR?: Maybe<Array<WorkerStartedLeavingEventWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  inBlock_eq?: Maybe<Scalars['Int']>;
  inBlock_gt?: Maybe<Scalars['Int']>;
  inBlock_gte?: Maybe<Scalars['Int']>;
  inBlock_in?: Maybe<Array<Scalars['Int']>>;
  inBlock_lt?: Maybe<Scalars['Int']>;
  inBlock_lte?: Maybe<Scalars['Int']>;
  inExtrinsic_contains?: Maybe<Scalars['String']>;
  inExtrinsic_endsWith?: Maybe<Scalars['String']>;
  inExtrinsic_eq?: Maybe<Scalars['String']>;
  inExtrinsic_in?: Maybe<Array<Scalars['String']>>;
  inExtrinsic_startsWith?: Maybe<Scalars['String']>;
  indexInBlock_eq?: Maybe<Scalars['Int']>;
  indexInBlock_gt?: Maybe<Scalars['Int']>;
  indexInBlock_gte?: Maybe<Scalars['Int']>;
  indexInBlock_in?: Maybe<Array<Scalars['Int']>>;
  indexInBlock_lt?: Maybe<Scalars['Int']>;
  indexInBlock_lte?: Maybe<Scalars['Int']>;
  network_eq?: Maybe<Network>;
  network_in?: Maybe<Array<Network>>;
  rationale_contains?: Maybe<Scalars['String']>;
  rationale_endsWith?: Maybe<Scalars['String']>;
  rationale_eq?: Maybe<Scalars['String']>;
  rationale_in?: Maybe<Array<Scalars['String']>>;
  rationale_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  worker?: Maybe<WorkerWhereInput>;
  worker_eq?: Maybe<Scalars['ID']>;
  worker_in?: Maybe<Array<Scalars['ID']>>;
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
  AND?: Maybe<Array<WorkerStatusActiveWhereInput>>;
  OR?: Maybe<Array<WorkerStatusActiveWhereInput>>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  phantom_eq?: Maybe<Scalars['Int']>;
  phantom_gt?: Maybe<Scalars['Int']>;
  phantom_gte?: Maybe<Scalars['Int']>;
  phantom_in?: Maybe<Array<Scalars['Int']>>;
  phantom_lt?: Maybe<Scalars['Int']>;
  phantom_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
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
  /** Related event emitted once the worker has exited the role (after the unstaking period) */
  workerExitedEvent?: Maybe<WorkerExitedEvent>;
  /** Related event emitted on leaving initialization */
  workerStartedLeavingEvent?: Maybe<WorkerStartedLeavingEvent>;
};

export type WorkerStatusTerminated = {
  __typename: 'WorkerStatusTerminated';
  /** Related event emitted on worker termination */
  terminatedWorkerEvent?: Maybe<TerminatedWorkerEvent>;
};

export type WorkerUpdateInput = {
  application?: Maybe<Scalars['ID']>;
  entry?: Maybe<Scalars['ID']>;
  group?: Maybe<Scalars['ID']>;
  isLead?: Maybe<Scalars['Boolean']>;
  membership?: Maybe<Scalars['ID']>;
  missingRewardAmount?: Maybe<Scalars['BigInt']>;
  rewardAccount?: Maybe<Scalars['String']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  roleAccount?: Maybe<Scalars['String']>;
  runtimeId?: Maybe<Scalars['Float']>;
  stake?: Maybe<Scalars['BigInt']>;
  stakeAccount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
  storage?: Maybe<Scalars['String']>;
};

export type WorkerWhereInput = {
  AND?: Maybe<Array<WorkerWhereInput>>;
  OR?: Maybe<Array<WorkerWhereInput>>;
  application?: Maybe<WorkingGroupApplicationWhereInput>;
  application_eq?: Maybe<Scalars['ID']>;
  application_in?: Maybe<Array<Scalars['ID']>>;
  categoryarchivalstatusupdatedeventactor_every?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventactor_none?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categoryarchivalstatusupdatedeventactor_some?: Maybe<CategoryArchivalStatusUpdatedEventWhereInput>;
  categorydeletedeventactor_every?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventactor_none?: Maybe<CategoryDeletedEventWhereInput>;
  categorydeletedeventactor_some?: Maybe<CategoryDeletedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_every?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_none?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorymembershipofmoderatorupdatedeventmoderator_some?: Maybe<CategoryMembershipOfModeratorUpdatedEventWhereInput>;
  categorystickythreadupdateeventactor_every?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventactor_none?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  categorystickythreadupdateeventactor_some?: Maybe<CategoryStickyThreadUpdateEventWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  dataObjects_every?: Maybe<DataObjectWhereInput>;
  dataObjects_none?: Maybe<DataObjectWhereInput>;
  dataObjects_some?: Maybe<DataObjectWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  entry?: Maybe<OpeningFilledEventWhereInput>;
  entry_eq?: Maybe<Scalars['ID']>;
  entry_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  isLead_eq?: Maybe<Scalars['Boolean']>;
  isLead_in?: Maybe<Array<Scalars['Boolean']>>;
  leaderseteventworker_every?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventworker_none?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventworker_some?: Maybe<LeaderSetEventWhereInput>;
  leaderunseteventleader_every?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventleader_none?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventleader_some?: Maybe<LeaderUnsetEventWhereInput>;
  managedForumCategories_every?: Maybe<ForumCategoryWhereInput>;
  managedForumCategories_none?: Maybe<ForumCategoryWhereInput>;
  managedForumCategories_some?: Maybe<ForumCategoryWhereInput>;
  membership?: Maybe<MembershipWhereInput>;
  membership_eq?: Maybe<Scalars['ID']>;
  membership_in?: Maybe<Array<Scalars['ID']>>;
  memberverificationstatusupdatedeventworker_every?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventworker_none?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  memberverificationstatusupdatedeventworker_some?: Maybe<MemberVerificationStatusUpdatedEventWhereInput>;
  missingRewardAmount_eq?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_gt?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_gte?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  missingRewardAmount_lt?: Maybe<Scalars['BigInt']>;
  missingRewardAmount_lte?: Maybe<Scalars['BigInt']>;
  newmissedrewardlevelreachedeventworker_every?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventworker_none?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventworker_some?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  payouts_every?: Maybe<RewardPaidEventWhereInput>;
  payouts_none?: Maybe<RewardPaidEventWhereInput>;
  payouts_some?: Maybe<RewardPaidEventWhereInput>;
  postmoderatedeventactor_every?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventactor_none?: Maybe<PostModeratedEventWhereInput>;
  postmoderatedeventactor_some?: Maybe<PostModeratedEventWhereInput>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  roleAccount_contains?: Maybe<Scalars['String']>;
  roleAccount_endsWith?: Maybe<Scalars['String']>;
  roleAccount_eq?: Maybe<Scalars['String']>;
  roleAccount_in?: Maybe<Array<Scalars['String']>>;
  roleAccount_startsWith?: Maybe<Scalars['String']>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  slashes_every?: Maybe<StakeSlashedEventWhereInput>;
  slashes_none?: Maybe<StakeSlashedEventWhereInput>;
  slashes_some?: Maybe<StakeSlashedEventWhereInput>;
  stakeAccount_contains?: Maybe<Scalars['String']>;
  stakeAccount_endsWith?: Maybe<Scalars['String']>;
  stakeAccount_eq?: Maybe<Scalars['String']>;
  stakeAccount_in?: Maybe<Array<Scalars['String']>>;
  stakeAccount_startsWith?: Maybe<Scalars['String']>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stakedecreasedeventworker_every?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventworker_none?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventworker_some?: Maybe<StakeDecreasedEventWhereInput>;
  stakeincreasedeventworker_every?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventworker_none?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventworker_some?: Maybe<StakeIncreasedEventWhereInput>;
  status_json?: Maybe<Scalars['JSONObject']>;
  storage_contains?: Maybe<Scalars['String']>;
  storage_endsWith?: Maybe<Scalars['String']>;
  storage_eq?: Maybe<Scalars['String']>;
  storage_in?: Maybe<Array<Scalars['String']>>;
  storage_startsWith?: Maybe<Scalars['String']>;
  terminatedleadereventworker_every?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventworker_none?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventworker_some?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedworkereventworker_every?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventworker_none?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventworker_some?: Maybe<TerminatedWorkerEventWhereInput>;
  threadmoderatedeventactor_every?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventactor_none?: Maybe<ThreadModeratedEventWhereInput>;
  threadmoderatedeventactor_some?: Maybe<ThreadModeratedEventWhereInput>;
  threadmovedeventactor_every?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventactor_none?: Maybe<ThreadMovedEventWhereInput>;
  threadmovedeventactor_some?: Maybe<ThreadMovedEventWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workerexitedeventworker_every?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventworker_none?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventworker_some?: Maybe<WorkerExitedEventWhereInput>;
  workerrewardaccountupdatedeventworker_every?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventworker_none?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventworker_some?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_every?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_none?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventworker_some?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_every?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_none?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventworker_some?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerstartedleavingeventworker_every?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventworker_none?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventworker_some?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workinggroupleader_every?: Maybe<WorkingGroupWhereInput>;
  workinggroupleader_none?: Maybe<WorkingGroupWhereInput>;
  workinggroupleader_some?: Maybe<WorkingGroupWhereInput>;
};

export type WorkerWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroup = BaseGraphQlObject & {
  __typename: 'WorkingGroup';
  applicationwithdrawneventgroup?: Maybe<Array<ApplicationWithdrawnEvent>>;
  appliedonopeningeventgroup?: Maybe<Array<AppliedOnOpeningEvent>>;
  /** Current working group budget (JOY) */
  budget: Scalars['BigInt'];
  budgetseteventgroup?: Maybe<Array<BudgetSetEvent>>;
  budgetspendingeventgroup?: Maybe<Array<BudgetSpendingEvent>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  leader?: Maybe<Worker>;
  leaderId?: Maybe<Scalars['String']>;
  leaderseteventgroup?: Maybe<Array<LeaderSetEvent>>;
  leaderunseteventgroup?: Maybe<Array<LeaderUnsetEvent>>;
  metadata?: Maybe<WorkingGroupMetadata>;
  metadataId?: Maybe<Scalars['String']>;
  /** Working group name */
  name: Scalars['String'];
  newmissedrewardlevelreachedeventgroup?: Maybe<Array<NewMissedRewardLevelReachedEvent>>;
  openingaddedeventgroup?: Maybe<Array<OpeningAddedEvent>>;
  openingcanceledeventgroup?: Maybe<Array<OpeningCanceledEvent>>;
  openingfilledeventgroup?: Maybe<Array<OpeningFilledEvent>>;
  openings: Array<WorkingGroupOpening>;
  rewardpaideventgroup?: Maybe<Array<RewardPaidEvent>>;
  stakedecreasedeventgroup?: Maybe<Array<StakeDecreasedEvent>>;
  stakeincreasedeventgroup?: Maybe<Array<StakeIncreasedEvent>>;
  stakeslashedeventgroup?: Maybe<Array<StakeSlashedEvent>>;
  statustextchangedeventgroup?: Maybe<Array<StatusTextChangedEvent>>;
  terminatedleadereventgroup?: Maybe<Array<TerminatedLeaderEvent>>;
  terminatedworkereventgroup?: Maybe<Array<TerminatedWorkerEvent>>;
  upcomingworkinggroupopeninggroup?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workerexitedeventgroup?: Maybe<Array<WorkerExitedEvent>>;
  workerrewardaccountupdatedeventgroup?: Maybe<Array<WorkerRewardAccountUpdatedEvent>>;
  workerrewardamountupdatedeventgroup?: Maybe<Array<WorkerRewardAmountUpdatedEvent>>;
  workerroleaccountupdatedeventgroup?: Maybe<Array<WorkerRoleAccountUpdatedEvent>>;
  workers: Array<Worker>;
  workerstartedleavingeventgroup?: Maybe<Array<WorkerStartedLeavingEvent>>;
  workinggroupmetadatagroup?: Maybe<Array<WorkingGroupMetadata>>;
};

export type WorkingGroupApplication = BaseGraphQlObject & {
  __typename: 'WorkingGroupApplication';
  answers: Array<ApplicationFormQuestionAnswer>;
  applicant: Membership;
  applicantId: Scalars['String'];
  applicationwithdrawneventapplication?: Maybe<Array<ApplicationWithdrawnEvent>>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: AppliedOnOpeningEvent;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  opening: WorkingGroupOpening;
  openingId: Scalars['String'];
  /** Applicant's initial reward account */
  rewardAccount: Scalars['String'];
  /** Applicant's initial role account */
  roleAccount: Scalars['String'];
  /** ApplicationId in specific working group module */
  runtimeId: Scalars['Int'];
  /** Application stake */
  stake: Scalars['BigInt'];
  /** Applicant's initial staking account */
  stakingAccount: Scalars['String'];
  /** Current application status */
  status: WorkingGroupApplicationStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workerapplication?: Maybe<Array<Worker>>;
};

export type WorkingGroupApplicationConnection = {
  __typename: 'WorkingGroupApplicationConnection';
  edges: Array<WorkingGroupApplicationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkingGroupApplicationCreateInput = {
  applicant: Scalars['ID'];
  opening: Scalars['ID'];
  rewardAccount: Scalars['String'];
  roleAccount: Scalars['String'];
  runtimeId: Scalars['Float'];
  stake: Scalars['BigInt'];
  stakingAccount: Scalars['String'];
  status: Scalars['JSONObject'];
};

export type WorkingGroupApplicationEdge = {
  __typename: 'WorkingGroupApplicationEdge';
  cursor: Scalars['String'];
  node: WorkingGroupApplication;
};

export enum WorkingGroupApplicationOrderByInput {
  ApplicantAsc = 'applicant_ASC',
  ApplicantDesc = 'applicant_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  OpeningAsc = 'opening_ASC',
  OpeningDesc = 'opening_DESC',
  RewardAccountAsc = 'rewardAccount_ASC',
  RewardAccountDesc = 'rewardAccount_DESC',
  RoleAccountAsc = 'roleAccount_ASC',
  RoleAccountDesc = 'roleAccount_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  StakeAsc = 'stake_ASC',
  StakeDesc = 'stake_DESC',
  StakingAccountAsc = 'stakingAccount_ASC',
  StakingAccountDesc = 'stakingAccount_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkingGroupApplicationStatus = ApplicationStatusAccepted | ApplicationStatusCancelled | ApplicationStatusPending | ApplicationStatusRejected | ApplicationStatusWithdrawn;

export type WorkingGroupApplicationUpdateInput = {
  applicant?: Maybe<Scalars['ID']>;
  opening?: Maybe<Scalars['ID']>;
  rewardAccount?: Maybe<Scalars['String']>;
  roleAccount?: Maybe<Scalars['String']>;
  runtimeId?: Maybe<Scalars['Float']>;
  stake?: Maybe<Scalars['BigInt']>;
  stakingAccount?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['JSONObject']>;
};

export type WorkingGroupApplicationWhereInput = {
  AND?: Maybe<Array<WorkingGroupApplicationWhereInput>>;
  OR?: Maybe<Array<WorkingGroupApplicationWhereInput>>;
  answers_every?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  answers_none?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  answers_some?: Maybe<ApplicationFormQuestionAnswerWhereInput>;
  applicant?: Maybe<MembershipWhereInput>;
  applicant_eq?: Maybe<Scalars['ID']>;
  applicant_in?: Maybe<Array<Scalars['ID']>>;
  applicationwithdrawneventapplication_every?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventapplication_none?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventapplication_some?: Maybe<ApplicationWithdrawnEventWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<AppliedOnOpeningEventWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  opening?: Maybe<WorkingGroupOpeningWhereInput>;
  opening_eq?: Maybe<Scalars['ID']>;
  opening_in?: Maybe<Array<Scalars['ID']>>;
  rewardAccount_contains?: Maybe<Scalars['String']>;
  rewardAccount_endsWith?: Maybe<Scalars['String']>;
  rewardAccount_eq?: Maybe<Scalars['String']>;
  rewardAccount_in?: Maybe<Array<Scalars['String']>>;
  rewardAccount_startsWith?: Maybe<Scalars['String']>;
  roleAccount_contains?: Maybe<Scalars['String']>;
  roleAccount_endsWith?: Maybe<Scalars['String']>;
  roleAccount_eq?: Maybe<Scalars['String']>;
  roleAccount_in?: Maybe<Array<Scalars['String']>>;
  roleAccount_startsWith?: Maybe<Scalars['String']>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  stake_eq?: Maybe<Scalars['BigInt']>;
  stake_gt?: Maybe<Scalars['BigInt']>;
  stake_gte?: Maybe<Scalars['BigInt']>;
  stake_in?: Maybe<Array<Scalars['BigInt']>>;
  stake_lt?: Maybe<Scalars['BigInt']>;
  stake_lte?: Maybe<Scalars['BigInt']>;
  stakingAccount_contains?: Maybe<Scalars['String']>;
  stakingAccount_endsWith?: Maybe<Scalars['String']>;
  stakingAccount_eq?: Maybe<Scalars['String']>;
  stakingAccount_in?: Maybe<Array<Scalars['String']>>;
  stakingAccount_startsWith?: Maybe<Scalars['String']>;
  status_json?: Maybe<Scalars['JSONObject']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workerapplication_every?: Maybe<WorkerWhereInput>;
  workerapplication_none?: Maybe<WorkerWhereInput>;
  workerapplication_some?: Maybe<WorkerWhereInput>;
};

export type WorkingGroupApplicationWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroupConnection = {
  __typename: 'WorkingGroupConnection';
  edges: Array<WorkingGroupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkingGroupCreateInput = {
  budget: Scalars['BigInt'];
  leader?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type WorkingGroupEdge = {
  __typename: 'WorkingGroupEdge';
  cursor: Scalars['String'];
  node: WorkingGroup;
};

export type WorkingGroupMetadata = BaseGraphQlObject & {
  __typename: 'WorkingGroupMetadata';
  /** Working group about text */
  about?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Working group description text */
  description?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  setInEvent: StatusTextChangedEvent;
  setInEventId: Scalars['String'];
  /** Working group status */
  status?: Maybe<Scalars['String']>;
  /** Working group status message */
  statusMessage?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workinggroupmetadata?: Maybe<Array<WorkingGroup>>;
};

export type WorkingGroupMetadataActionResult = InvalidActionMetadata | UpcomingOpeningAdded | UpcomingOpeningRemoved | WorkingGroupMetadataSet;

export type WorkingGroupMetadataConnection = {
  __typename: 'WorkingGroupMetadataConnection';
  edges: Array<WorkingGroupMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkingGroupMetadataCreateInput = {
  about?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  group: Scalars['ID'];
  setInEvent: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type WorkingGroupMetadataEdge = {
  __typename: 'WorkingGroupMetadataEdge';
  cursor: Scalars['String'];
  node: WorkingGroupMetadata;
};

export enum WorkingGroupMetadataOrderByInput {
  AboutAsc = 'about_ASC',
  AboutDesc = 'about_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  SetInEventAsc = 'setInEvent_ASC',
  SetInEventDesc = 'setInEvent_DESC',
  StatusMessageAsc = 'statusMessage_ASC',
  StatusMessageDesc = 'statusMessage_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkingGroupMetadataSet = {
  __typename: 'WorkingGroupMetadataSet';
  /** The new metadata snapshot resulting from the update */
  metadata?: Maybe<WorkingGroupMetadata>;
};

export type WorkingGroupMetadataUpdateInput = {
  about?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['ID']>;
  setInEvent?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type WorkingGroupMetadataWhereInput = {
  AND?: Maybe<Array<WorkingGroupMetadataWhereInput>>;
  OR?: Maybe<Array<WorkingGroupMetadataWhereInput>>;
  about_contains?: Maybe<Scalars['String']>;
  about_endsWith?: Maybe<Scalars['String']>;
  about_eq?: Maybe<Scalars['String']>;
  about_in?: Maybe<Array<Scalars['String']>>;
  about_startsWith?: Maybe<Scalars['String']>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  setInEvent?: Maybe<StatusTextChangedEventWhereInput>;
  setInEvent_eq?: Maybe<Scalars['ID']>;
  setInEvent_in?: Maybe<Array<Scalars['ID']>>;
  statusMessage_contains?: Maybe<Scalars['String']>;
  statusMessage_endsWith?: Maybe<Scalars['String']>;
  statusMessage_eq?: Maybe<Scalars['String']>;
  statusMessage_in?: Maybe<Array<Scalars['String']>>;
  statusMessage_startsWith?: Maybe<Scalars['String']>;
  status_contains?: Maybe<Scalars['String']>;
  status_endsWith?: Maybe<Scalars['String']>;
  status_eq?: Maybe<Scalars['String']>;
  status_in?: Maybe<Array<Scalars['String']>>;
  status_startsWith?: Maybe<Scalars['String']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workinggroupmetadata_every?: Maybe<WorkingGroupWhereInput>;
  workinggroupmetadata_none?: Maybe<WorkingGroupWhereInput>;
  workinggroupmetadata_some?: Maybe<WorkingGroupWhereInput>;
};

export type WorkingGroupMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WorkingGroupOpening = BaseGraphQlObject & {
  __typename: 'WorkingGroupOpening';
  applications: Array<WorkingGroupApplication>;
  appliedonopeningeventopening?: Maybe<Array<AppliedOnOpeningEvent>>;
  /** Time of opening creation */
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  createdInEvent: OpeningAddedEvent;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  group: WorkingGroup;
  groupId: Scalars['String'];
  id: Scalars['ID'];
  metadata: WorkingGroupOpeningMetadata;
  metadataId: Scalars['String'];
  openingcanceledeventopening?: Maybe<Array<OpeningCanceledEvent>>;
  openingfilledeventopening?: Maybe<Array<OpeningFilledEvent>>;
  /** Initial workers' reward per block */
  rewardPerBlock: Scalars['BigInt'];
  /** OpeningId in specific working group module */
  runtimeId: Scalars['Int'];
  /** Min. application/role stake amount */
  stakeAmount: Scalars['BigInt'];
  /** Current opening status */
  status: WorkingGroupOpeningStatus;
  /** Type of the opening (Leader/Regular) */
  type: WorkingGroupOpeningType;
  /** Role stake unstaking period in blocks */
  unstakingPeriod: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

export type WorkingGroupOpeningConnection = {
  __typename: 'WorkingGroupOpeningConnection';
  edges: Array<WorkingGroupOpeningEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkingGroupOpeningCreateInput = {
  createdAt: Scalars['DateTime'];
  group: Scalars['ID'];
  metadata: Scalars['ID'];
  rewardPerBlock: Scalars['BigInt'];
  runtimeId: Scalars['Float'];
  stakeAmount: Scalars['BigInt'];
  status: Scalars['JSONObject'];
  type: WorkingGroupOpeningType;
  unstakingPeriod: Scalars['Float'];
};

export type WorkingGroupOpeningEdge = {
  __typename: 'WorkingGroupOpeningEdge';
  cursor: Scalars['String'];
  node: WorkingGroupOpening;
};

export type WorkingGroupOpeningMetadata = BaseGraphQlObject & {
  __typename: 'WorkingGroupOpeningMetadata';
  /** Md-formatted text explaining the application process */
  applicationDetails?: Maybe<Scalars['String']>;
  applicationFormQuestions: Array<ApplicationFormQuestion>;
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedById?: Maybe<Scalars['String']>;
  /** Opening description (md-formatted) */
  description?: Maybe<Scalars['String']>;
  /** Expected time when the opening will close */
  expectedEnding?: Maybe<Scalars['DateTime']>;
  /** Expected max. number of applicants that will be hired */
  hiringLimit?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** Whether the originally provided metadata was valid */
  originallyValid: Scalars['Boolean'];
  /** Opening short description */
  shortDescription?: Maybe<Scalars['String']>;
  upcomingworkinggroupopeningmetadata?: Maybe<Array<UpcomingWorkingGroupOpening>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedById?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
  workinggroupopeningmetadata?: Maybe<Array<WorkingGroupOpening>>;
};

export type WorkingGroupOpeningMetadataConnection = {
  __typename: 'WorkingGroupOpeningMetadataConnection';
  edges: Array<WorkingGroupOpeningMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WorkingGroupOpeningMetadataCreateInput = {
  applicationDetails?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expectedEnding?: Maybe<Scalars['DateTime']>;
  hiringLimit?: Maybe<Scalars['Float']>;
  originallyValid: Scalars['Boolean'];
  shortDescription?: Maybe<Scalars['String']>;
};

export type WorkingGroupOpeningMetadataEdge = {
  __typename: 'WorkingGroupOpeningMetadataEdge';
  cursor: Scalars['String'];
  node: WorkingGroupOpeningMetadata;
};

export enum WorkingGroupOpeningMetadataOrderByInput {
  ApplicationDetailsAsc = 'applicationDetails_ASC',
  ApplicationDetailsDesc = 'applicationDetails_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ExpectedEndingAsc = 'expectedEnding_ASC',
  ExpectedEndingDesc = 'expectedEnding_DESC',
  HiringLimitAsc = 'hiringLimit_ASC',
  HiringLimitDesc = 'hiringLimit_DESC',
  OriginallyValidAsc = 'originallyValid_ASC',
  OriginallyValidDesc = 'originallyValid_DESC',
  ShortDescriptionAsc = 'shortDescription_ASC',
  ShortDescriptionDesc = 'shortDescription_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkingGroupOpeningMetadataUpdateInput = {
  applicationDetails?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expectedEnding?: Maybe<Scalars['DateTime']>;
  hiringLimit?: Maybe<Scalars['Float']>;
  originallyValid?: Maybe<Scalars['Boolean']>;
  shortDescription?: Maybe<Scalars['String']>;
};

export type WorkingGroupOpeningMetadataWhereInput = {
  AND?: Maybe<Array<WorkingGroupOpeningMetadataWhereInput>>;
  OR?: Maybe<Array<WorkingGroupOpeningMetadataWhereInput>>;
  applicationDetails_contains?: Maybe<Scalars['String']>;
  applicationDetails_endsWith?: Maybe<Scalars['String']>;
  applicationDetails_eq?: Maybe<Scalars['String']>;
  applicationDetails_in?: Maybe<Array<Scalars['String']>>;
  applicationDetails_startsWith?: Maybe<Scalars['String']>;
  applicationFormQuestions_every?: Maybe<ApplicationFormQuestionWhereInput>;
  applicationFormQuestions_none?: Maybe<ApplicationFormQuestionWhereInput>;
  applicationFormQuestions_some?: Maybe<ApplicationFormQuestionWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  description_contains?: Maybe<Scalars['String']>;
  description_endsWith?: Maybe<Scalars['String']>;
  description_eq?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Scalars['String']>>;
  description_startsWith?: Maybe<Scalars['String']>;
  expectedEnding_eq?: Maybe<Scalars['DateTime']>;
  expectedEnding_gt?: Maybe<Scalars['DateTime']>;
  expectedEnding_gte?: Maybe<Scalars['DateTime']>;
  expectedEnding_lt?: Maybe<Scalars['DateTime']>;
  expectedEnding_lte?: Maybe<Scalars['DateTime']>;
  hiringLimit_eq?: Maybe<Scalars['Int']>;
  hiringLimit_gt?: Maybe<Scalars['Int']>;
  hiringLimit_gte?: Maybe<Scalars['Int']>;
  hiringLimit_in?: Maybe<Array<Scalars['Int']>>;
  hiringLimit_lt?: Maybe<Scalars['Int']>;
  hiringLimit_lte?: Maybe<Scalars['Int']>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  originallyValid_eq?: Maybe<Scalars['Boolean']>;
  originallyValid_in?: Maybe<Array<Scalars['Boolean']>>;
  shortDescription_contains?: Maybe<Scalars['String']>;
  shortDescription_endsWith?: Maybe<Scalars['String']>;
  shortDescription_eq?: Maybe<Scalars['String']>;
  shortDescription_in?: Maybe<Array<Scalars['String']>>;
  shortDescription_startsWith?: Maybe<Scalars['String']>;
  upcomingworkinggroupopeningmetadata_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningmetadata_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeningmetadata_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workinggroupopeningmetadata_every?: Maybe<WorkingGroupOpeningWhereInput>;
  workinggroupopeningmetadata_none?: Maybe<WorkingGroupOpeningWhereInput>;
  workinggroupopeningmetadata_some?: Maybe<WorkingGroupOpeningWhereInput>;
};

export type WorkingGroupOpeningMetadataWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkingGroupOpeningOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  GroupAsc = 'group_ASC',
  GroupDesc = 'group_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  RewardPerBlockAsc = 'rewardPerBlock_ASC',
  RewardPerBlockDesc = 'rewardPerBlock_DESC',
  RuntimeIdAsc = 'runtimeId_ASC',
  RuntimeIdDesc = 'runtimeId_DESC',
  StakeAmountAsc = 'stakeAmount_ASC',
  StakeAmountDesc = 'stakeAmount_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UnstakingPeriodAsc = 'unstakingPeriod_ASC',
  UnstakingPeriodDesc = 'unstakingPeriod_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkingGroupOpeningStatus = OpeningStatusCancelled | OpeningStatusFilled | OpeningStatusOpen;

export enum WorkingGroupOpeningType {
  Leader = 'LEADER',
  Regular = 'REGULAR'
}

export type WorkingGroupOpeningUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  group?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['ID']>;
  rewardPerBlock?: Maybe<Scalars['BigInt']>;
  runtimeId?: Maybe<Scalars['Float']>;
  stakeAmount?: Maybe<Scalars['BigInt']>;
  status?: Maybe<Scalars['JSONObject']>;
  type?: Maybe<WorkingGroupOpeningType>;
  unstakingPeriod?: Maybe<Scalars['Float']>;
};

export type WorkingGroupOpeningWhereInput = {
  AND?: Maybe<Array<WorkingGroupOpeningWhereInput>>;
  OR?: Maybe<Array<WorkingGroupOpeningWhereInput>>;
  applications_every?: Maybe<WorkingGroupApplicationWhereInput>;
  applications_none?: Maybe<WorkingGroupApplicationWhereInput>;
  applications_some?: Maybe<WorkingGroupApplicationWhereInput>;
  appliedonopeningeventopening_every?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventopening_none?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventopening_some?: Maybe<AppliedOnOpeningEventWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  createdInEvent?: Maybe<OpeningAddedEventWhereInput>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  group?: Maybe<WorkingGroupWhereInput>;
  group_eq?: Maybe<Scalars['ID']>;
  group_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  metadata?: Maybe<WorkingGroupOpeningMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  openingcanceledeventopening_every?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventopening_none?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventopening_some?: Maybe<OpeningCanceledEventWhereInput>;
  openingfilledeventopening_every?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventopening_none?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventopening_some?: Maybe<OpeningFilledEventWhereInput>;
  rewardPerBlock_eq?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_gte?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_in?: Maybe<Array<Scalars['BigInt']>>;
  rewardPerBlock_lt?: Maybe<Scalars['BigInt']>;
  rewardPerBlock_lte?: Maybe<Scalars['BigInt']>;
  runtimeId_eq?: Maybe<Scalars['Int']>;
  runtimeId_gt?: Maybe<Scalars['Int']>;
  runtimeId_gte?: Maybe<Scalars['Int']>;
  runtimeId_in?: Maybe<Array<Scalars['Int']>>;
  runtimeId_lt?: Maybe<Scalars['Int']>;
  runtimeId_lte?: Maybe<Scalars['Int']>;
  stakeAmount_eq?: Maybe<Scalars['BigInt']>;
  stakeAmount_gt?: Maybe<Scalars['BigInt']>;
  stakeAmount_gte?: Maybe<Scalars['BigInt']>;
  stakeAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  stakeAmount_lt?: Maybe<Scalars['BigInt']>;
  stakeAmount_lte?: Maybe<Scalars['BigInt']>;
  status_json?: Maybe<Scalars['JSONObject']>;
  type_eq?: Maybe<WorkingGroupOpeningType>;
  type_in?: Maybe<Array<WorkingGroupOpeningType>>;
  unstakingPeriod_eq?: Maybe<Scalars['Int']>;
  unstakingPeriod_gt?: Maybe<Scalars['Int']>;
  unstakingPeriod_gte?: Maybe<Scalars['Int']>;
  unstakingPeriod_in?: Maybe<Array<Scalars['Int']>>;
  unstakingPeriod_lt?: Maybe<Scalars['Int']>;
  unstakingPeriod_lte?: Maybe<Scalars['Int']>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
};

export type WorkingGroupOpeningWhereUniqueInput = {
  id: Scalars['ID'];
};

export enum WorkingGroupOrderByInput {
  BudgetAsc = 'budget_ASC',
  BudgetDesc = 'budget_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAtAsc = 'deletedAt_ASC',
  DeletedAtDesc = 'deletedAt_DESC',
  LeaderAsc = 'leader_ASC',
  LeaderDesc = 'leader_DESC',
  MetadataAsc = 'metadata_ASC',
  MetadataDesc = 'metadata_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type WorkingGroupUpdateInput = {
  budget?: Maybe<Scalars['BigInt']>;
  leader?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type WorkingGroupWhereInput = {
  AND?: Maybe<Array<WorkingGroupWhereInput>>;
  OR?: Maybe<Array<WorkingGroupWhereInput>>;
  applicationwithdrawneventgroup_every?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventgroup_none?: Maybe<ApplicationWithdrawnEventWhereInput>;
  applicationwithdrawneventgroup_some?: Maybe<ApplicationWithdrawnEventWhereInput>;
  appliedonopeningeventgroup_every?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventgroup_none?: Maybe<AppliedOnOpeningEventWhereInput>;
  appliedonopeningeventgroup_some?: Maybe<AppliedOnOpeningEventWhereInput>;
  budget_eq?: Maybe<Scalars['BigInt']>;
  budget_gt?: Maybe<Scalars['BigInt']>;
  budget_gte?: Maybe<Scalars['BigInt']>;
  budget_in?: Maybe<Array<Scalars['BigInt']>>;
  budget_lt?: Maybe<Scalars['BigInt']>;
  budget_lte?: Maybe<Scalars['BigInt']>;
  budgetseteventgroup_every?: Maybe<BudgetSetEventWhereInput>;
  budgetseteventgroup_none?: Maybe<BudgetSetEventWhereInput>;
  budgetseteventgroup_some?: Maybe<BudgetSetEventWhereInput>;
  budgetspendingeventgroup_every?: Maybe<BudgetSpendingEventWhereInput>;
  budgetspendingeventgroup_none?: Maybe<BudgetSpendingEventWhereInput>;
  budgetspendingeventgroup_some?: Maybe<BudgetSpendingEventWhereInput>;
  createdAt_eq?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdById_eq?: Maybe<Scalars['ID']>;
  createdById_in?: Maybe<Array<Scalars['ID']>>;
  deletedAt_all?: Maybe<Scalars['Boolean']>;
  deletedAt_eq?: Maybe<Scalars['DateTime']>;
  deletedAt_gt?: Maybe<Scalars['DateTime']>;
  deletedAt_gte?: Maybe<Scalars['DateTime']>;
  deletedAt_lt?: Maybe<Scalars['DateTime']>;
  deletedAt_lte?: Maybe<Scalars['DateTime']>;
  deletedById_eq?: Maybe<Scalars['ID']>;
  deletedById_in?: Maybe<Array<Scalars['ID']>>;
  id_eq?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  leader?: Maybe<WorkerWhereInput>;
  leader_eq?: Maybe<Scalars['ID']>;
  leader_in?: Maybe<Array<Scalars['ID']>>;
  leaderseteventgroup_every?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventgroup_none?: Maybe<LeaderSetEventWhereInput>;
  leaderseteventgroup_some?: Maybe<LeaderSetEventWhereInput>;
  leaderunseteventgroup_every?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventgroup_none?: Maybe<LeaderUnsetEventWhereInput>;
  leaderunseteventgroup_some?: Maybe<LeaderUnsetEventWhereInput>;
  metadata?: Maybe<WorkingGroupMetadataWhereInput>;
  metadata_eq?: Maybe<Scalars['ID']>;
  metadata_in?: Maybe<Array<Scalars['ID']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_endsWith?: Maybe<Scalars['String']>;
  name_eq?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_startsWith?: Maybe<Scalars['String']>;
  newmissedrewardlevelreachedeventgroup_every?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventgroup_none?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  newmissedrewardlevelreachedeventgroup_some?: Maybe<NewMissedRewardLevelReachedEventWhereInput>;
  openingaddedeventgroup_every?: Maybe<OpeningAddedEventWhereInput>;
  openingaddedeventgroup_none?: Maybe<OpeningAddedEventWhereInput>;
  openingaddedeventgroup_some?: Maybe<OpeningAddedEventWhereInput>;
  openingcanceledeventgroup_every?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventgroup_none?: Maybe<OpeningCanceledEventWhereInput>;
  openingcanceledeventgroup_some?: Maybe<OpeningCanceledEventWhereInput>;
  openingfilledeventgroup_every?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventgroup_none?: Maybe<OpeningFilledEventWhereInput>;
  openingfilledeventgroup_some?: Maybe<OpeningFilledEventWhereInput>;
  openings_every?: Maybe<WorkingGroupOpeningWhereInput>;
  openings_none?: Maybe<WorkingGroupOpeningWhereInput>;
  openings_some?: Maybe<WorkingGroupOpeningWhereInput>;
  rewardpaideventgroup_every?: Maybe<RewardPaidEventWhereInput>;
  rewardpaideventgroup_none?: Maybe<RewardPaidEventWhereInput>;
  rewardpaideventgroup_some?: Maybe<RewardPaidEventWhereInput>;
  stakedecreasedeventgroup_every?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventgroup_none?: Maybe<StakeDecreasedEventWhereInput>;
  stakedecreasedeventgroup_some?: Maybe<StakeDecreasedEventWhereInput>;
  stakeincreasedeventgroup_every?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventgroup_none?: Maybe<StakeIncreasedEventWhereInput>;
  stakeincreasedeventgroup_some?: Maybe<StakeIncreasedEventWhereInput>;
  stakeslashedeventgroup_every?: Maybe<StakeSlashedEventWhereInput>;
  stakeslashedeventgroup_none?: Maybe<StakeSlashedEventWhereInput>;
  stakeslashedeventgroup_some?: Maybe<StakeSlashedEventWhereInput>;
  statustextchangedeventgroup_every?: Maybe<StatusTextChangedEventWhereInput>;
  statustextchangedeventgroup_none?: Maybe<StatusTextChangedEventWhereInput>;
  statustextchangedeventgroup_some?: Maybe<StatusTextChangedEventWhereInput>;
  terminatedleadereventgroup_every?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventgroup_none?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedleadereventgroup_some?: Maybe<TerminatedLeaderEventWhereInput>;
  terminatedworkereventgroup_every?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventgroup_none?: Maybe<TerminatedWorkerEventWhereInput>;
  terminatedworkereventgroup_some?: Maybe<TerminatedWorkerEventWhereInput>;
  upcomingworkinggroupopeninggroup_every?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeninggroup_none?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  upcomingworkinggroupopeninggroup_some?: Maybe<UpcomingWorkingGroupOpeningWhereInput>;
  updatedAt_eq?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedById_eq?: Maybe<Scalars['ID']>;
  updatedById_in?: Maybe<Array<Scalars['ID']>>;
  workerexitedeventgroup_every?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventgroup_none?: Maybe<WorkerExitedEventWhereInput>;
  workerexitedeventgroup_some?: Maybe<WorkerExitedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_every?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_none?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardaccountupdatedeventgroup_some?: Maybe<WorkerRewardAccountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_every?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_none?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerrewardamountupdatedeventgroup_some?: Maybe<WorkerRewardAmountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_every?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_none?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workerroleaccountupdatedeventgroup_some?: Maybe<WorkerRoleAccountUpdatedEventWhereInput>;
  workers_every?: Maybe<WorkerWhereInput>;
  workers_none?: Maybe<WorkerWhereInput>;
  workers_some?: Maybe<WorkerWhereInput>;
  workerstartedleavingeventgroup_every?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventgroup_none?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workerstartedleavingeventgroup_some?: Maybe<WorkerStartedLeavingEventWhereInput>;
  workinggroupmetadatagroup_every?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatagroup_none?: Maybe<WorkingGroupMetadataWhereInput>;
  workinggroupmetadatagroup_some?: Maybe<WorkingGroupMetadataWhereInput>;
};

export type WorkingGroupWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};
