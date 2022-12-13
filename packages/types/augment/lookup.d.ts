declare const _default: {
    /**
     * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
     **/
    FrameSystemAccountInfo: {
        nonce: string;
        consumers: string;
        providers: string;
        sufficients: string;
        data: string;
    };
    /**
     * Lookup5: pallet_balances::AccountData<Balance>
     **/
    PalletBalancesAccountData: {
        free: string;
        reserved: string;
        miscFrozen: string;
        feeFrozen: string;
    };
    /**
     * Lookup7: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU64: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup11: sp_runtime::generic::digest::Digest
     **/
    SpRuntimeDigest: {
        logs: string;
    };
    /**
     * Lookup13: sp_runtime::generic::digest::DigestItem
     **/
    SpRuntimeDigestDigestItem: {
        _enum: {
            Other: string;
            __Unused1: string;
            __Unused2: string;
            __Unused3: string;
            Consensus: string;
            Seal: string;
            PreRuntime: string;
            __Unused7: string;
            RuntimeEnvironmentUpdated: string;
        };
    };
    /**
     * Lookup16: frame_system::EventRecord<joystream_node_runtime::Event, primitive_types::H256>
     **/
    FrameSystemEventRecord: {
        phase: string;
        event: string;
        topics: string;
    };
    /**
     * Lookup18: frame_system::pallet::Event<T>
     **/
    FrameSystemEvent: {
        _enum: {
            ExtrinsicSuccess: {
                dispatchInfo: string;
            };
            ExtrinsicFailed: {
                dispatchError: string;
                dispatchInfo: string;
            };
            CodeUpdated: string;
            NewAccount: {
                account: string;
            };
            KilledAccount: {
                account: string;
            };
            Remarked: {
                _alias: {
                    hash_: string;
                };
                sender: string;
                hash_: string;
            };
        };
    };
    /**
     * Lookup19: frame_support::weights::DispatchInfo
     **/
    FrameSupportWeightsDispatchInfo: {
        weight: string;
        class: string;
        paysFee: string;
    };
    /**
     * Lookup20: frame_support::weights::DispatchClass
     **/
    FrameSupportWeightsDispatchClass: {
        _enum: string[];
    };
    /**
     * Lookup21: frame_support::weights::Pays
     **/
    FrameSupportWeightsPays: {
        _enum: string[];
    };
    /**
     * Lookup22: sp_runtime::DispatchError
     **/
    SpRuntimeDispatchError: {
        _enum: {
            Other: string;
            CannotLookup: string;
            BadOrigin: string;
            Module: string;
            ConsumerRemaining: string;
            NoProviders: string;
            TooManyConsumers: string;
            Token: string;
            Arithmetic: string;
            Transactional: string;
        };
    };
    /**
     * Lookup23: sp_runtime::ModuleError
     **/
    SpRuntimeModuleError: {
        index: string;
        error: string;
    };
    /**
     * Lookup24: sp_runtime::TokenError
     **/
    SpRuntimeTokenError: {
        _enum: string[];
    };
    /**
     * Lookup25: sp_runtime::ArithmeticError
     **/
    SpRuntimeArithmeticError: {
        _enum: string[];
    };
    /**
     * Lookup26: sp_runtime::TransactionalError
     **/
    SpRuntimeTransactionalError: {
        _enum: string[];
    };
    /**
     * Lookup27: pallet_utility::pallet::Event
     **/
    PalletUtilityEvent: {
        _enum: {
            BatchInterrupted: {
                index: string;
                error: string;
            };
            BatchCompleted: string;
            BatchCompletedWithErrors: string;
            ItemCompleted: string;
            ItemFailed: {
                error: string;
            };
            DispatchedAs: {
                result: string;
            };
        };
    };
    /**
     * Lookup30: pallet_balances::pallet::Event<T, I>
     **/
    PalletBalancesEvent: {
        _enum: {
            Endowed: {
                account: string;
                freeBalance: string;
            };
            DustLost: {
                account: string;
                amount: string;
            };
            Transfer: {
                from: string;
                to: string;
                amount: string;
            };
            BalanceSet: {
                who: string;
                free: string;
                reserved: string;
            };
            Reserved: {
                who: string;
                amount: string;
            };
            Unreserved: {
                who: string;
                amount: string;
            };
            ReserveRepatriated: {
                from: string;
                to: string;
                amount: string;
                destinationStatus: string;
            };
            Deposit: {
                who: string;
                amount: string;
            };
            Withdraw: {
                who: string;
                amount: string;
            };
            Slashed: {
                who: string;
                amount: string;
            };
        };
    };
    /**
     * Lookup31: frame_support::traits::tokens::misc::BalanceStatus
     **/
    FrameSupportTokensMiscBalanceStatus: {
        _enum: string[];
    };
    /**
     * Lookup32: pallet_election_provider_multi_phase::pallet::Event<T>
     **/
    PalletElectionProviderMultiPhaseEvent: {
        _enum: {
            SolutionStored: {
                electionCompute: string;
                prevEjected: string;
            };
            ElectionFinalized: {
                electionCompute: string;
            };
            Rewarded: {
                account: string;
                value: string;
            };
            Slashed: {
                account: string;
                value: string;
            };
            SignedPhaseStarted: {
                round: string;
            };
            UnsignedPhaseStarted: {
                round: string;
            };
        };
    };
    /**
     * Lookup33: pallet_election_provider_multi_phase::ElectionCompute
     **/
    PalletElectionProviderMultiPhaseElectionCompute: {
        _enum: string[];
    };
    /**
     * Lookup36: pallet_staking::pallet::pallet::Event<T>
     **/
    PalletStakingPalletEvent: {
        _enum: {
            EraPaid: string;
            Rewarded: string;
            Slashed: string;
            OldSlashingReportDiscarded: string;
            StakersElected: string;
            Bonded: string;
            Unbonded: string;
            Withdrawn: string;
            Kicked: string;
            StakingElectionFailed: string;
            Chilled: string;
            PayoutStarted: string;
            ValidatorPrefsSet: string;
        };
    };
    /**
     * Lookup37: pallet_staking::ValidatorPrefs
     **/
    PalletStakingValidatorPrefs: {
        commission: string;
        blocked: string;
    };
    /**
     * Lookup40: pallet_session::pallet::Event
     **/
    PalletSessionEvent: {
        _enum: {
            NewSession: {
                sessionIndex: string;
            };
        };
    };
    /**
     * Lookup41: pallet_grandpa::pallet::Event
     **/
    PalletGrandpaEvent: {
        _enum: {
            NewAuthorities: {
                authoritySet: string;
            };
            Paused: string;
            Resumed: string;
        };
    };
    /**
     * Lookup44: sp_finality_grandpa::app::Public
     **/
    SpFinalityGrandpaAppPublic: string;
    /**
     * Lookup45: sp_core::ed25519::Public
     **/
    SpCoreEd25519Public: string;
    /**
     * Lookup46: pallet_im_online::pallet::Event<T>
     **/
    PalletImOnlineEvent: {
        _enum: {
            HeartbeatReceived: {
                authorityId: string;
            };
            AllGood: string;
            SomeOffline: {
                offline: string;
            };
        };
    };
    /**
     * Lookup47: pallet_im_online::sr25519::app_sr25519::Public
     **/
    PalletImOnlineSr25519AppSr25519Public: string;
    /**
     * Lookup48: sp_core::sr25519::Public
     **/
    SpCoreSr25519Public: string;
    /**
     * Lookup51: pallet_staking::Exposure<sp_core::crypto::AccountId32, Balance>
     **/
    PalletStakingExposure: {
        total: string;
        own: string;
        others: string;
    };
    /**
     * Lookup54: pallet_staking::IndividualExposure<sp_core::crypto::AccountId32, Balance>
     **/
    PalletStakingIndividualExposure: {
        who: string;
        value: string;
    };
    /**
     * Lookup55: pallet_offences::pallet::Event
     **/
    PalletOffencesEvent: {
        _enum: {
            Offence: {
                kind: string;
                timeslot: string;
            };
        };
    };
    /**
     * Lookup57: pallet_sudo::pallet::Event<T>
     **/
    PalletSudoEvent: {
        _enum: {
            Sudid: {
                sudoResult: string;
            };
            KeyChanged: {
                oldSudoer: string;
            };
            SudoAsDone: {
                sudoResult: string;
            };
        };
    };
    /**
     * Lookup59: pallet_bags_list::pallet::Event<T, I>
     **/
    PalletBagsListEvent: {
        _enum: {
            Rebagged: {
                who: string;
                from: string;
                to: string;
            };
            ScoreUpdated: {
                who: string;
                newScore: string;
            };
        };
    };
    /**
     * Lookup60: pallet_vesting::pallet::Event<T>
     **/
    PalletVestingEvent: {
        _enum: {
            VestingUpdated: {
                account: string;
                unvested: string;
            };
            VestingCompleted: {
                account: string;
            };
        };
    };
    /**
     * Lookup61: pallet_multisig::pallet::Event<T>
     **/
    PalletMultisigEvent: {
        _enum: {
            NewMultisig: {
                approving: string;
                multisig: string;
                callHash: string;
            };
            MultisigApproval: {
                approving: string;
                timepoint: string;
                multisig: string;
                callHash: string;
            };
            MultisigExecuted: {
                approving: string;
                timepoint: string;
                multisig: string;
                callHash: string;
                result: string;
            };
            MultisigCancelled: {
                cancelling: string;
                timepoint: string;
                multisig: string;
                callHash: string;
            };
        };
    };
    /**
     * Lookup62: pallet_multisig::Timepoint<BlockNumber>
     **/
    PalletMultisigTimepoint: {
        height: string;
        index: string;
    };
    /**
     * Lookup63: pallet_council::RawEvent<Balance, BlockNumber, MemberId, sp_core::crypto::AccountId32>
     **/
    PalletCouncilRawEvent: {
        _enum: {
            AnnouncingPeriodStarted: string;
            NotEnoughCandidates: string;
            VotingPeriodStarted: string;
            NewCandidate: string;
            NewCouncilElected: string;
            NewCouncilNotElected: string;
            CandidacyStakeRelease: string;
            CandidacyWithdraw: string;
            CandidacyNoteSet: string;
            RewardPayment: string;
            BudgetBalanceSet: string;
            BudgetRefill: string;
            BudgetRefillPlanned: string;
            BudgetIncrementUpdated: string;
            CouncilorRewardUpdated: string;
            RequestFunded: string;
            CouncilBudgetFunded: string;
            CouncilorRemarked: string;
            CandidateRemarked: string;
        };
    };
    /**
     * Lookup65: pallet_referendum::RawEvent<BlockNumber, Balance, primitive_types::H256, sp_core::crypto::AccountId32, VotePower, MemberId, pallet_referendum::Instance1>
     **/
    PalletReferendumRawEvent: {
        _enum: {
            ReferendumStarted: string;
            ReferendumStartedForcefully: string;
            RevealingStageStarted: string;
            ReferendumFinished: string;
            VoteCast: string;
            VoteRevealed: string;
            StakeReleased: string;
        };
    };
    /**
     * Lookup66: pallet_referendum::Instance1
     **/
    PalletReferendumInstance1: string;
    /**
     * Lookup68: pallet_referendum::OptionResult<MemberId, VotePower>
     **/
    PalletReferendumOptionResult: {
        optionId: string;
        votePower: string;
    };
    /**
     * Lookup69: pallet_membership::RawEvent<MemberId, Balance, sp_core::crypto::AccountId32, pallet_membership::BuyMembershipParameters<sp_core::crypto::AccountId32, MemberId>, ActorId, pallet_membership::InviteMembershipParameters<sp_core::crypto::AccountId32, MemberId>, pallet_membership::CreateFoundingMemberParameters<sp_core::crypto::AccountId32>, pallet_membership::GiftMembershipParameters<sp_core::crypto::AccountId32, Balance>>
     **/
    PalletMembershipRawEvent: {
        _enum: {
            MemberInvited: string;
            MembershipGifted: string;
            MembershipBought: string;
            MemberProfileUpdated: string;
            MemberAccountsUpdated: string;
            MemberVerificationStatusUpdated: string;
            ReferralCutUpdated: string;
            InvitesTransferred: string;
            MembershipPriceUpdated: string;
            InitialInvitationBalanceUpdated: string;
            LeaderInvitationQuotaUpdated: string;
            InitialInvitationCountUpdated: string;
            StakingAccountAdded: string;
            StakingAccountRemoved: string;
            StakingAccountConfirmed: string;
            MemberRemarked: string;
            FoundingMemberCreated: string;
        };
    };
    /**
     * Lookup70: pallet_membership::BuyMembershipParameters<sp_core::crypto::AccountId32, MemberId>
     **/
    PalletMembershipBuyMembershipParameters: {
        rootAccount: string;
        controllerAccount: string;
        handle: string;
        metadata: string;
        referrerId: string;
    };
    /**
     * Lookup73: pallet_membership::InviteMembershipParameters<sp_core::crypto::AccountId32, MemberId>
     **/
    PalletMembershipInviteMembershipParameters: {
        invitingMemberId: string;
        rootAccount: string;
        controllerAccount: string;
        handle: string;
        metadata: string;
    };
    /**
     * Lookup74: pallet_membership::CreateFoundingMemberParameters<sp_core::crypto::AccountId32>
     **/
    PalletMembershipCreateFoundingMemberParameters: {
        rootAccount: string;
        controllerAccount: string;
        handle: string;
        metadata: string;
    };
    /**
     * Lookup75: pallet_membership::GiftMembershipParameters<sp_core::crypto::AccountId32, Balance>
     **/
    PalletMembershipGiftMembershipParameters: {
        rootAccount: string;
        controllerAccount: string;
        handle: string;
        metadata: string;
        creditControllerAccount: string;
        applyControllerAccountInvitationLock: string;
        creditRootAccount: string;
        applyRootAccountInvitationLock: string;
    };
    /**
     * Lookup77: pallet_forum::RawEvent<CategoryId, ModeratorId, ThreadId, PostId, primitive_types::H256, ForumUserId, PostReactionId, pallet_forum::PrivilegedActor<T>, pallet_forum::ExtendedPostIdObject<CategoryId, ThreadId, PostId>>
     **/
    PalletForumRawEvent: {
        _enum: {
            CategoryCreated: string;
            CategoryArchivalStatusUpdated: string;
            CategoryTitleUpdated: string;
            CategoryDescriptionUpdated: string;
            CategoryDeleted: string;
            ThreadCreated: string;
            ThreadModerated: string;
            ThreadUpdated: string;
            ThreadMetadataUpdated: string;
            ThreadDeleted: string;
            ThreadMoved: string;
            PostAdded: string;
            PostModerated: string;
            PostDeleted: string;
            PostTextUpdated: string;
            PostReacted: string;
            CategoryStickyThreadUpdate: string;
            CategoryMembershipOfModeratorUpdated: string;
        };
    };
    /**
     * Lookup78: pallet_forum::PrivilegedActor<T>
     **/
    PalletForumPrivilegedActor: {
        _enum: {
            Lead: string;
            Moderator: string;
        };
    };
    /**
     * Lookup79: pallet_forum::ExtendedPostIdObject<CategoryId, ThreadId, PostId>
     **/
    PalletForumExtendedPostIdObject: {
        categoryId: string;
        threadId: string;
        postId: string;
    };
    /**
     * Lookup83: pallet_constitution::Event
     **/
    PalletConstitutionEvent: {
        _enum: {
            ConstutionAmended: string;
        };
    };
    /**
     * Lookup84: pallet_utility::RawEvent<Balance, sp_core::crypto::AccountId32>
     **/
    PalletUtilityRawEvent: {
        _enum: {
            Signaled: string;
            RuntimeUpgraded: string;
            UpdatedWorkingGroupBudget: string;
            TokensBurned: string;
        };
    };
    /**
     * Lookup85: pallet_common::working_group::WorkingGroup
     **/
    PalletCommonWorkingGroup: {
        _enum: string[];
    };
    /**
     * Lookup86: pallet_common::BalanceKind
     **/
    PalletCommonBalanceKind: {
        _enum: string[];
    };
    /**
     * Lookup87: pallet_content::RawEvent<pallet_content::permissions::ContentActor<CuratorGroupId, CuratorId, MemberId>, MemberId, CuratorGroupId, CuratorId, VideoId, ChannelId, pallet_content::types::ChannelRecord<MemberId, CuratorGroupId, Balance, ChannelPrivilegeLevel, DataObjectId, BlockNumber, TokenId, TransferId>, DataObjectId, pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, OpenAuctionId, pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>, Balance, pallet_content::types::ChannelCreationParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, MemberId, StorageBucketId, pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>, Balance>, pallet_content::types::ChannelUpdateParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, DataObjectId, MemberId, Balance>, pallet_content::types::VideoCreationParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>, Balance>, pallet_content::types::VideoUpdateParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, DataObjectId, pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>, Balance>, ChannelPrivilegeLevel, BTreeMap<K, BTreeSet<pallet_content::permissions::curator_group::ContentModerationAction>>, pallet_content::types::TransferCommitmentParameters<MemberId, Balance, TransferId>, pallet_content::types::PendingTransfer<MemberId, CuratorGroupId, Balance, TransferId>, sp_core::crypto::AccountId32, pallet_content::types::UpdateChannelPayoutsParametersRecord<pallet_content::types::ChannelPayoutsPayloadParametersRecord<sp_core::crypto::AccountId32, Balance>, Balance, primitive_types::H256>, TokenId, pallet_content::types::ChannelFundsDestination<sp_core::crypto::AccountId32>>
     **/
    PalletContentRawEvent: {
        _enum: {
            CuratorGroupCreated: string;
            CuratorGroupPermissionsUpdated: string;
            CuratorGroupStatusSet: string;
            CuratorAdded: string;
            CuratorRemoved: string;
            ChannelCreated: string;
            ChannelUpdated: string;
            ChannelPrivilegeLevelUpdated: string;
            ChannelStateBloatBondValueUpdated: string;
            VideoStateBloatBondValueUpdated: string;
            ChannelAssetsRemoved: string;
            ChannelDeleted: string;
            ChannelDeletedByModerator: string;
            ChannelVisibilitySetByModerator: string;
            ChannelPausedFeaturesUpdatedByModerator: string;
            ChannelAssetsDeletedByModerator: string;
            ChannelFundsWithdrawn: string;
            ChannelRewardClaimedAndWithdrawn: string;
            VideoCreated: string;
            VideoUpdated: string;
            VideoDeleted: string;
            VideoDeletedByModerator: string;
            VideoVisibilitySetByModerator: string;
            VideoAssetsDeletedByModerator: string;
            ChannelPayoutsUpdated: string;
            ChannelRewardUpdated: string;
            CouncilRewardClaimed: string;
            EnglishAuctionStarted: string;
            OpenAuctionStarted: string;
            NftIssued: string;
            NftDestroyed: string;
            AuctionBidMade: string;
            AuctionBidCanceled: string;
            AuctionCanceled: string;
            EnglishAuctionSettled: string;
            BidMadeCompletingAuction: string;
            OpenAuctionBidAccepted: string;
            OfferStarted: string;
            OfferAccepted: string;
            OfferCanceled: string;
            NftSellOrderMade: string;
            NftBought: string;
            BuyNowCanceled: string;
            BuyNowPriceUpdated: string;
            NftSlingedBackToTheOriginalArtist: string;
            ChannelOwnerRemarked: string;
            ChannelAgentRemarked: string;
            NftOwnerRemarked: string;
            InitializedChannelTransfer: string;
            CancelChannelTransfer: string;
            ChannelTransferAccepted: string;
            GlobalNftLimitUpdated: string;
            ChannelNftLimitUpdated: string;
            ToggledNftLimits: string;
            CreatorTokenIssued: string;
        };
    };
    /**
     * Lookup88: pallet_content::permissions::ContentActor<CuratorGroupId, CuratorId, MemberId>
     **/
    PalletContentPermissionsContentActor: {
        _enum: {
            Curator: string;
            Member: string;
            Lead: string;
        };
    };
    /**
     * Lookup89: pallet_content::types::ChannelRecord<MemberId, CuratorGroupId, Balance, ChannelPrivilegeLevel, DataObjectId, BlockNumber, TokenId, TransferId>
     **/
    PalletContentChannelRecord: {
        owner: string;
        numVideos: string;
        collaborators: string;
        cumulativeRewardClaimed: string;
        privilegeLevel: string;
        pausedFeatures: string;
        transferStatus: string;
        dataObjects: string;
        dailyNftLimit: string;
        weeklyNftLimit: string;
        dailyNftCounter: string;
        weeklyNftCounter: string;
        creatorTokenId: string;
        channelStateBloatBond: string;
    };
    /**
     * Lookup90: pallet_content::types::ChannelOwner<MemberId, CuratorGroupId>
     **/
    PalletContentChannelOwner: {
        _enum: {
            Member: string;
            CuratorGroup: string;
        };
    };
    /**
     * Lookup93: pallet_content::types::ChannelActionPermission
     **/
    PalletContentChannelActionPermission: {
        _enum: string[];
    };
    /**
     * Lookup98: pallet_content::permissions::curator_group::PausableChannelFeature
     **/
    PalletContentPermissionsCuratorGroupPausableChannelFeature: {
        _enum: string[];
    };
    /**
     * Lookup100: pallet_content::types::ChannelTransferStatus<MemberId, CuratorGroupId, Balance, TransferId>
     **/
    PalletContentChannelTransferStatus: {
        _enum: {
            NoActiveTransfer: string;
            PendingTransfer: string;
        };
    };
    /**
     * Lookup101: pallet_content::types::PendingTransfer<MemberId, CuratorGroupId, Balance, TransferId>
     **/
    PalletContentPendingTransfer: {
        newOwner: string;
        transferParams: string;
    };
    /**
     * Lookup102: pallet_content::types::TransferCommitmentParameters<MemberId, Balance, TransferId>
     **/
    PalletContentTransferCommitmentParameters: {
        newCollaborators: string;
        price: string;
        transferId: string;
    };
    /**
     * Lookup104: pallet_content::types::LimitPerPeriod<BlockNumber>
     **/
    PalletContentLimitPerPeriod: {
        limit: string;
        blockNumberPeriod: string;
    };
    /**
     * Lookup105: pallet_content::types::NftCounter<BlockNumber>
     **/
    PalletContentNftCounter: {
        counter: string;
        lastUpdated: string;
    };
    /**
     * Lookup106: pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>
     **/
    PalletContentNftTypesEnglishAuctionParamsRecord: {
        startingPrice: string;
        buyNowPrice: string;
        whitelist: string;
        startsAt: string;
        duration: string;
        extensionPeriod: string;
        minBidStep: string;
    };
    /**
     * Lookup108: pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>
     **/
    PalletContentNftTypesOpenAuctionParamsRecord: {
        startingPrice: string;
        buyNowPrice: string;
        startsAt: string;
        whitelist: string;
        bidLockDuration: string;
    };
    /**
     * Lookup109: pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>
     **/
    PalletContentNftTypesNftIssuanceParametersRecord: {
        royalty: string;
        nftMetadata: string;
        nonChannelOwner: string;
        initTransactionalStatus: string;
    };
    /**
     * Lookup110: pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>
     **/
    PalletContentNftTypesInitTransactionalStatusRecord: {
        _enum: {
            Idle: string;
            BuyNow: string;
            InitiatedOfferToMember: string;
            EnglishAuction: string;
            OpenAuction: string;
        };
    };
    /**
     * Lookup112: pallet_content::types::ChannelCreationParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, MemberId, StorageBucketId, pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>, Balance>
     **/
    PalletContentChannelCreationParametersRecord: {
        assets: string;
        meta: string;
        collaborators: string;
        storageBuckets: string;
        distributionBuckets: string;
        expectedChannelStateBloatBond: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup113: pallet_content::types::StorageAssetsRecord<Balance>
     **/
    PalletContentStorageAssetsRecord: {
        objectCreationList: string;
        expectedDataSizeFee: string;
    };
    /**
     * Lookup115: pallet_storage::DataObjectCreationParameters
     **/
    PalletStorageDataObjectCreationParameters: {
        _alias: {
            size_: string;
        };
        size_: string;
        ipfsContentId: string;
    };
    /**
     * Lookup116: pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>
     **/
    PalletStorageDistributionBucketIdRecord: {
        distributionBucketFamilyId: string;
        distributionBucketIndex: string;
    };
    /**
     * Lookup120: pallet_content::types::ChannelUpdateParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, DataObjectId, MemberId, Balance>
     **/
    PalletContentChannelUpdateParametersRecord: {
        assetsToUpload: string;
        newMeta: string;
        assetsToRemove: string;
        collaborators: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup122: pallet_content::types::VideoCreationParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>, Balance>
     **/
    PalletContentVideoCreationParametersRecord: {
        assets: string;
        meta: string;
        autoIssueNft: string;
        expectedVideoStateBloatBond: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup124: pallet_content::types::VideoUpdateParametersRecord<pallet_content::types::StorageAssetsRecord<Balance>, DataObjectId, pallet_content::nft::types::NftIssuanceParametersRecord<MemberId, pallet_content::nft::types::InitTransactionalStatusRecord<pallet_content::nft::types::EnglishAuctionParamsRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionParamsRecord<BlockNumber, Balance, MemberId>, MemberId, Balance>>, Balance>
     **/
    PalletContentVideoUpdateParametersRecord: {
        assetsToUpload: string;
        newMeta: string;
        assetsToRemove: string;
        autoIssueNft: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup127: pallet_content::permissions::curator_group::ContentModerationAction
     **/
    PalletContentPermissionsCuratorGroupContentModerationAction: {
        _enum: {
            HideVideo: string;
            HideChannel: string;
            ChangeChannelFeatureStatus: string;
            DeleteVideo: string;
            DeleteChannel: string;
            DeleteVideoAssets: string;
            DeleteNonVideoChannelAssets: string;
            UpdateChannelNftLimits: string;
        };
    };
    /**
     * Lookup131: pallet_content::types::UpdateChannelPayoutsParametersRecord<pallet_content::types::ChannelPayoutsPayloadParametersRecord<sp_core::crypto::AccountId32, Balance>, Balance, primitive_types::H256>
     **/
    PalletContentUpdateChannelPayoutsParametersRecord: {
        commitment: string;
        payload: string;
        minCashoutAllowed: string;
        maxCashoutAllowed: string;
        channelCashoutsEnabled: string;
    };
    /**
     * Lookup132: pallet_content::types::ChannelPayoutsPayloadParametersRecord<sp_core::crypto::AccountId32, Balance>
     **/
    PalletContentChannelPayoutsPayloadParametersRecord: {
        uploaderAccount: string;
        objectCreationParams: string;
        expectedDataSizeFee: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup136: pallet_content::types::ChannelFundsDestination<sp_core::crypto::AccountId32>
     **/
    PalletContentChannelFundsDestination: {
        _enum: {
            AccountId: string;
            CouncilBudget: string;
        };
    };
    /**
     * Lookup137: pallet_content::types::NftLimitPeriod
     **/
    PalletContentNftLimitPeriod: {
        _enum: string[];
    };
    /**
     * Lookup138: pallet_storage::RawEvent<StorageBucketId, WorkerId, DataObjectId, pallet_storage::UploadParametersRecord<pallet_storage::BagIdType<MemberId, ChannelId>, sp_core::crypto::AccountId32, Balance>, pallet_storage::BagIdType<MemberId, ChannelId>, pallet_storage::DynamicBagIdType<MemberId, ChannelId>, sp_core::crypto::AccountId32, Balance, DistributionBucketFamilyId, pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>, DistributionBucketIndex>
     **/
    PalletStorageRawEvent: {
        _enum: {
            StorageBucketCreated: string;
            StorageBucketInvitationAccepted: string;
            StorageBucketsUpdatedForBag: string;
            DataObjectsUploaded: string;
            StorageOperatorMetadataSet: string;
            StorageBucketVoucherLimitsSet: string;
            PendingDataObjectsAccepted: string;
            StorageBucketInvitationCancelled: string;
            StorageBucketOperatorInvited: string;
            StorageBucketOperatorRemoved: string;
            UploadingBlockStatusUpdated: string;
            DataObjectPerMegabyteFeeUpdated: string;
            StorageBucketsPerBagLimitUpdated: string;
            StorageBucketsVoucherMaxLimitsUpdated: string;
            DataObjectsMoved: string;
            DataObjectsDeleted: string;
            StorageBucketStatusUpdated: string;
            UpdateBlacklist: string;
            DynamicBagDeleted: string;
            DynamicBagCreated: string;
            VoucherChanged: string;
            StorageBucketDeleted: string;
            NumberOfStorageBucketsInDynamicBagCreationPolicyUpdated: string;
            DistributionBucketFamilyCreated: string;
            DistributionBucketFamilyDeleted: string;
            DistributionBucketCreated: string;
            DistributionBucketStatusUpdated: string;
            DistributionBucketDeleted: string;
            DistributionBucketsUpdatedForBag: string;
            DistributionBucketsPerBagLimitUpdated: string;
            DistributionBucketModeUpdated: string;
            FamiliesInDynamicBagCreationPolicyUpdated: string;
            DistributionBucketOperatorInvited: string;
            DistributionBucketInvitationCancelled: string;
            DistributionBucketInvitationAccepted: string;
            DistributionBucketMetadataSet: string;
            DistributionBucketOperatorRemoved: string;
            DistributionBucketFamilyMetadataSet: string;
            DataObjectStateBloatBondValueUpdated: string;
            DataObjectsUpdated: string;
            StorageOperatorRemarked: string;
            DistributionOperatorRemarked: string;
        };
    };
    /**
     * Lookup139: pallet_storage::UploadParametersRecord<pallet_storage::BagIdType<MemberId, ChannelId>, sp_core::crypto::AccountId32, Balance>
     **/
    PalletStorageUploadParametersRecord: {
        bagId: string;
        objectCreationList: string;
        stateBloatBondSourceAccountId: string;
        expectedDataSizeFee: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup140: pallet_storage::BagIdType<MemberId, ChannelId>
     **/
    PalletStorageBagIdType: {
        _enum: {
            Static: string;
            Dynamic: string;
        };
    };
    /**
     * Lookup141: pallet_storage::StaticBagId
     **/
    PalletStorageStaticBagId: {
        _enum: {
            Council: string;
            WorkingGroup: string;
        };
    };
    /**
     * Lookup142: pallet_storage::DynamicBagIdType<MemberId, ChannelId>
     **/
    PalletStorageDynamicBagIdType: {
        _enum: {
            Member: string;
            Channel: string;
        };
    };
    /**
     * Lookup145: pallet_storage::Voucher
     **/
    PalletStorageVoucher: {
        sizeLimit: string;
        objectsLimit: string;
        sizeUsed: string;
        objectsUsed: string;
    };
    /**
     * Lookup146: pallet_storage::DynamicBagType
     **/
    PalletStorageDynamicBagType: {
        _enum: string[];
    };
    /**
     * Lookup150: pallet_project_token::events::RawEvent<Balance, JoyBalance, TokenId, sp_core::crypto::AccountId32, MemberId, BlockNumber, pallet_project_token::types::TransferPolicy<primitive_types::H256>, pallet_project_token::types::TokenIssuanceParameters<primitive_types::H256, pallet_project_token::types::TokenAllocation<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>, pallet_project_token::types::TransferPolicyParams<pallet_project_token::types::WhitelistParams<primitive_types::H256, pallet_project_token::types::SingleDataObjectUploadParams<JoyBalance>>>, MemberId>, pallet_project_token::types::Transfers<pallet_project_token::types::Validated<MemberId>, pallet_project_token::types::ValidatedPayment<pallet_project_token::types::PaymentWithVesting<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>>>, pallet_project_token::types::TokenSale<JoyBalance, Balance, BlockNumber, pallet_project_token::types::VestingScheduleParams<BlockNumber>, MemberId, sp_core::crypto::AccountId32>>
     **/
    PalletProjectTokenEventsRawEvent: {
        _enum: {
            TokenAmountTransferred: string;
            TokenAmountTransferredByIssuer: string;
            PatronageRateDecreasedTo: string;
            PatronageCreditClaimed: string;
            RevenueSplitIssued: string;
            RevenueSplitFinalized: string;
            UserParticipatedInSplit: string;
            RevenueSplitLeft: string;
            MemberJoinedWhitelist: string;
            AccountDustedBy: string;
            TokenDeissued: string;
            TokenIssued: string;
            TokenSaleInitialized: string;
            UpcomingTokenSaleUpdated: string;
            TokensPurchasedOnSale: string;
            TokenSaleFinalized: string;
            TransferPolicyChangedToPermissionless: string;
            TokensBurned: string;
        };
    };
    /**
     * Lookup151: pallet_project_token::types::TransferPolicy<primitive_types::H256>
     **/
    PalletProjectTokenTransferPolicy: {
        _enum: {
            Permissionless: string;
            Permissioned: string;
        };
    };
    /**
     * Lookup152: pallet_project_token::types::TokenIssuanceParameters<primitive_types::H256, pallet_project_token::types::TokenAllocation<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>, pallet_project_token::types::TransferPolicyParams<pallet_project_token::types::WhitelistParams<primitive_types::H256, pallet_project_token::types::SingleDataObjectUploadParams<JoyBalance>>>, MemberId>
     **/
    PalletProjectTokenTokenIssuanceParameters: {
        initialAllocation: string;
        symbol: string;
        transferPolicy: string;
        patronageRate: string;
        revenueSplitRate: string;
    };
    /**
     * Lookup153: pallet_project_token::types::TokenAllocation<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>
     **/
    PalletProjectTokenTokenAllocation: {
        amount: string;
        vestingScheduleParams: string;
    };
    /**
     * Lookup154: pallet_project_token::types::VestingScheduleParams<BlockNumber>
     **/
    PalletProjectTokenVestingScheduleParams: {
        linearVestingDuration: string;
        blocksBeforeCliff: string;
        cliffAmountPercentage: string;
    };
    /**
     * Lookup157: pallet_project_token::types::TransferPolicyParams<pallet_project_token::types::WhitelistParams<primitive_types::H256, pallet_project_token::types::SingleDataObjectUploadParams<JoyBalance>>>
     **/
    PalletProjectTokenTransferPolicyParams: {
        _enum: {
            Permissionless: string;
            Permissioned: string;
        };
    };
    /**
     * Lookup158: pallet_project_token::types::WhitelistParams<primitive_types::H256, pallet_project_token::types::SingleDataObjectUploadParams<JoyBalance>>
     **/
    PalletProjectTokenWhitelistParams: {
        commitment: string;
        payload: string;
    };
    /**
     * Lookup159: pallet_project_token::types::SingleDataObjectUploadParams<JoyBalance>
     **/
    PalletProjectTokenSingleDataObjectUploadParams: {
        objectCreationParams: string;
        expectedDataSizeFee: string;
        expectedDataObjectStateBloatBond: string;
    };
    /**
     * Lookup166: pallet_project_token::types::Validated<MemberId>
     **/
    PalletProjectTokenValidated: {
        _enum: {
            Existing: string;
            NonExisting: string;
        };
    };
    /**
     * Lookup167: pallet_project_token::types::ValidatedPayment<pallet_project_token::types::PaymentWithVesting<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>>
     **/
    PalletProjectTokenValidatedPayment: {
        payment: string;
        vestingCleanupCandidate: string;
    };
    /**
     * Lookup168: pallet_project_token::types::PaymentWithVesting<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>
     **/
    PalletProjectTokenPaymentWithVesting: {
        remark: string;
        amount: string;
        vestingSchedule: string;
    };
    /**
     * Lookup170: pallet_project_token::types::VestingSource
     **/
    PalletProjectTokenVestingSource: {
        _enum: {
            InitialIssuance: string;
            Sale: string;
            IssuerTransfer: string;
        };
    };
    /**
     * Lookup174: pallet_project_token::types::TokenSale<JoyBalance, Balance, BlockNumber, pallet_project_token::types::VestingScheduleParams<BlockNumber>, MemberId, sp_core::crypto::AccountId32>
     **/
    PalletProjectTokenTokenSale: {
        unitPrice: string;
        quantityLeft: string;
        fundsCollected: string;
        tokensSource: string;
        earningsDestination: string;
        startBlock: string;
        duration: string;
        vestingScheduleParams: string;
        capPerMember: string;
        autoFinalize: string;
    };
    /**
     * Lookup176: pallet_proposals_engine::RawEvent<ProposalId, MemberId, BlockNumber>
     **/
    PalletProposalsEngineRawEvent: {
        _enum: {
            ProposalStatusUpdated: string;
            ProposalDecisionMade: string;
            ProposalExecuted: string;
            Voted: string;
            ProposalCancelled: string;
            ProposerRemarked: string;
        };
    };
    /**
     * Lookup177: pallet_proposals_engine::types::proposal_statuses::ProposalStatus<BlockNumber>
     **/
    PalletProposalsEngineProposalStatusesProposalStatus: {
        _enum: {
            Active: string;
            PendingExecution: string;
            PendingConstitutionality: string;
        };
    };
    /**
     * Lookup178: pallet_proposals_engine::types::proposal_statuses::ProposalDecision
     **/
    PalletProposalsEngineProposalStatusesProposalDecision: {
        _enum: {
            Canceled: string;
            CanceledByRuntime: string;
            Vetoed: string;
            Rejected: string;
            Slashed: string;
            Expired: string;
            Approved: string;
        };
    };
    /**
     * Lookup179: pallet_proposals_engine::types::proposal_statuses::ApprovedProposalDecision
     **/
    PalletProposalsEngineProposalStatusesApprovedProposalDecision: {
        _enum: string[];
    };
    /**
     * Lookup180: pallet_proposals_engine::types::proposal_statuses::ExecutionStatus
     **/
    PalletProposalsEngineProposalStatusesExecutionStatus: {
        _enum: {
            Executed: string;
            ExecutionFailed: {
                error: string;
            };
        };
    };
    /**
     * Lookup181: pallet_proposals_engine::types::VoteKind
     **/
    PalletProposalsEngineVoteKind: {
        _enum: string[];
    };
    /**
     * Lookup182: pallet_proposals_discussion::RawEvent<ThreadId, MemberId, PostId>
     **/
    PalletProposalsDiscussionRawEvent: {
        _enum: {
            ThreadCreated: string;
            PostCreated: string;
            PostUpdated: string;
            ThreadModeChanged: string;
            PostDeleted: string;
        };
    };
    /**
     * Lookup183: pallet_proposals_discussion::types::ThreadMode<MemberId>
     **/
    PalletProposalsDiscussionThreadMode: {
        _enum: {
            Open: string;
            Closed: string;
        };
    };
    /**
     * Lookup184: pallet_proposals_codex::RawEvent<pallet_proposals_codex::types::GeneralProposalParams<MemberId, sp_core::crypto::AccountId32, BlockNumber>, pallet_proposals_codex::types::ProposalDetails<Balance, BlockNumber, sp_core::crypto::AccountId32, WorkerId, OpeningId, ProposalId, pallet_content::types::UpdateChannelPayoutsParametersRecord<pallet_content::types::ChannelPayoutsPayloadParametersRecord<sp_core::crypto::AccountId32, Balance>, Balance, primitive_types::H256>>, ProposalId, ThreadId>
     **/
    PalletProposalsCodexRawEvent: {
        _enum: {
            ProposalCreated: string;
        };
    };
    /**
     * Lookup185: pallet_proposals_codex::types::GeneralProposalParams<MemberId, sp_core::crypto::AccountId32, BlockNumber>
     **/
    PalletProposalsCodexGeneralProposalParams: {
        memberId: string;
        title: string;
        description: string;
        stakingAccountId: string;
        exactExecutionBlock: string;
    };
    /**
     * Lookup186: pallet_proposals_codex::types::ProposalDetails<Balance, BlockNumber, sp_core::crypto::AccountId32, WorkerId, OpeningId, ProposalId, pallet_content::types::UpdateChannelPayoutsParametersRecord<pallet_content::types::ChannelPayoutsPayloadParametersRecord<sp_core::crypto::AccountId32, Balance>, Balance, primitive_types::H256>>
     **/
    PalletProposalsCodexProposalDetails: {
        _enum: {
            Signal: string;
            RuntimeUpgrade: string;
            FundingRequest: string;
            SetMaxValidatorCount: string;
            CreateWorkingGroupLeadOpening: string;
            FillWorkingGroupLeadOpening: string;
            UpdateWorkingGroupBudget: string;
            DecreaseWorkingGroupLeadStake: string;
            SlashWorkingGroupLead: string;
            SetWorkingGroupLeadReward: string;
            TerminateWorkingGroupLead: string;
            AmendConstitution: string;
            CancelWorkingGroupLeadOpening: string;
            SetMembershipPrice: string;
            SetCouncilBudgetIncrement: string;
            SetCouncilorReward: string;
            SetInitialInvitationBalance: string;
            SetInitialInvitationCount: string;
            SetMembershipLeadInvitationQuota: string;
            SetReferralCut: string;
            VetoProposal: string;
            UpdateGlobalNftLimit: string;
            UpdateChannelPayouts: string;
        };
    };
    /**
     * Lookup188: pallet_common::FundingRequestParameters<Balance, sp_core::crypto::AccountId32>
     **/
    PalletCommonFundingRequestParameters: {
        account: string;
        amount: string;
    };
    /**
     * Lookup189: pallet_proposals_codex::types::CreateOpeningParameters<BlockNumber, Balance>
     **/
    PalletProposalsCodexCreateOpeningParameters: {
        description: string;
        stakePolicy: string;
        rewardPerBlock: string;
        group: string;
    };
    /**
     * Lookup190: pallet_working_group::types::StakePolicy<BlockNumber, Balance>
     **/
    PalletWorkingGroupStakePolicy: {
        stakeAmount: string;
        leavingUnstakingPeriod: string;
    };
    /**
     * Lookup191: pallet_proposals_codex::types::FillOpeningParameters
     **/
    PalletProposalsCodexFillOpeningParameters: {
        openingId: string;
        applicationId: string;
        workingGroup: string;
    };
    /**
     * Lookup192: pallet_proposals_codex::types::TerminateRoleParameters<WorkerId, Balance>
     **/
    PalletProposalsCodexTerminateRoleParameters: {
        workerId: string;
        slashingAmount: string;
        group: string;
    };
    /**
     * Lookup193: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance1>
     **/
    PalletWorkingGroupRawEventInstance1: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup197: pallet_working_group::types::OpeningType
     **/
    PalletWorkingGroupOpeningType: {
        _enum: string[];
    };
    /**
     * Lookup198: pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>
     **/
    PalletWorkingGroupApplyOnOpeningParams: {
        memberId: string;
        openingId: string;
        roleAccountId: string;
        rewardAccountId: string;
        description: string;
        stakeParameters: string;
    };
    /**
     * Lookup199: pallet_working_group::types::StakeParameters<sp_core::crypto::AccountId32, Balance>
     **/
    PalletWorkingGroupStakeParameters: {
        stake: string;
        stakingAccountId: string;
    };
    /**
     * Lookup200: pallet_working_group::Instance1
     **/
    PalletWorkingGroupInstance1: string;
    /**
     * Lookup201: pallet_working_group::types::RewardPaymentType
     **/
    PalletWorkingGroupRewardPaymentType: {
        _enum: string[];
    };
    /**
     * Lookup202: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance2>
     **/
    PalletWorkingGroupRawEventInstance2: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup203: pallet_working_group::Instance2
     **/
    PalletWorkingGroupInstance2: string;
    /**
     * Lookup204: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance3>
     **/
    PalletWorkingGroupRawEventInstance3: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup205: pallet_working_group::Instance3
     **/
    PalletWorkingGroupInstance3: string;
    /**
     * Lookup206: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance4>
     **/
    PalletWorkingGroupRawEventInstance4: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup207: pallet_working_group::Instance4
     **/
    PalletWorkingGroupInstance4: string;
    /**
     * Lookup208: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance5>
     **/
    PalletWorkingGroupRawEventInstance5: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup209: pallet_working_group::Instance5
     **/
    PalletWorkingGroupInstance5: string;
    /**
     * Lookup210: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance6>
     **/
    PalletWorkingGroupRawEventInstance6: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup211: pallet_working_group::Instance6
     **/
    PalletWorkingGroupInstance6: string;
    /**
     * Lookup212: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance7>
     **/
    PalletWorkingGroupRawEventInstance7: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup213: pallet_working_group::Instance7
     **/
    PalletWorkingGroupInstance7: string;
    /**
     * Lookup214: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance8>
     **/
    PalletWorkingGroupRawEventInstance8: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup215: pallet_working_group::Instance8
     **/
    PalletWorkingGroupInstance8: string;
    /**
     * Lookup216: pallet_working_group::RawEvent<OpeningId, ApplicationId, BTreeMap<K, V>, WorkerId, sp_core::crypto::AccountId32, Balance, pallet_working_group::types::OpeningType, pallet_working_group::types::StakePolicy<BlockNumber, Balance>, pallet_working_group::types::ApplyOnOpeningParams<MemberId, OpeningId, sp_core::crypto::AccountId32, Balance>, MemberId, pallet_working_group::Instance9>
     **/
    PalletWorkingGroupRawEventInstance9: {
        _enum: {
            OpeningAdded: string;
            AppliedOnOpening: string;
            OpeningFilled: string;
            LeaderSet: string;
            WorkerRoleAccountUpdated: string;
            LeaderUnset: string;
            WorkerExited: string;
            WorkerStartedLeaving: string;
            TerminatedWorker: string;
            TerminatedLeader: string;
            StakeSlashed: string;
            StakeDecreased: string;
            StakeIncreased: string;
            ApplicationWithdrawn: string;
            OpeningCanceled: string;
            BudgetSet: string;
            WorkerRewardAccountUpdated: string;
            WorkerRewardAmountUpdated: string;
            StatusTextChanged: string;
            BudgetSpending: string;
            RewardPaid: string;
            NewMissedRewardLevelReached: string;
            WorkerStorageUpdated: string;
            WorkingGroupBudgetFunded: string;
            LeadRemarked: string;
            WorkerRemarked: string;
        };
    };
    /**
     * Lookup217: pallet_working_group::Instance9
     **/
    PalletWorkingGroupInstance9: string;
    /**
     * Lookup218: frame_system::Phase
     **/
    FrameSystemPhase: {
        _enum: {
            ApplyExtrinsic: string;
            Finalization: string;
            Initialization: string;
        };
    };
    /**
     * Lookup222: frame_system::LastRuntimeUpgradeInfo
     **/
    FrameSystemLastRuntimeUpgradeInfo: {
        specVersion: string;
        specName: string;
    };
    /**
     * Lookup225: frame_system::pallet::Call<T>
     **/
    FrameSystemCall: {
        _enum: {
            fill_block: {
                ratio: string;
            };
            remark: {
                remark: string;
            };
            set_heap_pages: {
                pages: string;
            };
            set_code: {
                code: string;
            };
            set_code_without_checks: {
                code: string;
            };
            set_storage: {
                items: string;
            };
            kill_storage: {
                _alias: {
                    keys_: string;
                };
                keys_: string;
            };
            kill_prefix: {
                prefix: string;
                subkeys: string;
            };
            remark_with_event: {
                remark: string;
            };
        };
    };
    /**
     * Lookup228: frame_system::limits::BlockWeights
     **/
    FrameSystemLimitsBlockWeights: {
        baseBlock: string;
        maxBlock: string;
        perClass: string;
    };
    /**
     * Lookup229: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
     **/
    FrameSupportWeightsPerDispatchClassWeightsPerClass: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup230: frame_system::limits::WeightsPerClass
     **/
    FrameSystemLimitsWeightsPerClass: {
        baseExtrinsic: string;
        maxExtrinsic: string;
        maxTotal: string;
        reserved: string;
    };
    /**
     * Lookup231: frame_system::limits::BlockLength
     **/
    FrameSystemLimitsBlockLength: {
        max: string;
    };
    /**
     * Lookup232: frame_support::weights::PerDispatchClass<T>
     **/
    FrameSupportWeightsPerDispatchClassU32: {
        normal: string;
        operational: string;
        mandatory: string;
    };
    /**
     * Lookup233: frame_support::weights::RuntimeDbWeight
     **/
    FrameSupportWeightsRuntimeDbWeight: {
        read: string;
        write: string;
    };
    /**
     * Lookup234: sp_version::RuntimeVersion
     **/
    SpVersionRuntimeVersion: {
        specName: string;
        implName: string;
        authoringVersion: string;
        specVersion: string;
        implVersion: string;
        apis: string;
        transactionVersion: string;
        stateVersion: string;
    };
    /**
     * Lookup240: frame_system::pallet::Error<T>
     **/
    FrameSystemError: {
        _enum: string[];
    };
    /**
     * Lookup241: pallet_utility::pallet::Call<T>
     **/
    PalletUtilityCall: {
        _enum: {
            batch: {
                calls: string;
            };
            as_derivative: {
                index: string;
                call: string;
            };
            batch_all: {
                calls: string;
            };
            dispatch_as: {
                asOrigin: string;
                call: string;
            };
            force_batch: {
                calls: string;
            };
        };
    };
    /**
     * Lookup244: pallet_babe::pallet::Call<T>
     **/
    PalletBabeCall: {
        _enum: {
            report_equivocation: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            report_equivocation_unsigned: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            plan_config_change: {
                config: string;
            };
        };
    };
    /**
     * Lookup245: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
     **/
    SpConsensusSlotsEquivocationProof: {
        offender: string;
        slot: string;
        firstHeader: string;
        secondHeader: string;
    };
    /**
     * Lookup246: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
     **/
    SpRuntimeHeader: {
        parentHash: string;
        number: string;
        stateRoot: string;
        extrinsicsRoot: string;
        digest: string;
    };
    /**
     * Lookup247: sp_runtime::traits::BlakeTwo256
     **/
    SpRuntimeBlakeTwo256: string;
    /**
     * Lookup248: sp_consensus_babe::app::Public
     **/
    SpConsensusBabeAppPublic: string;
    /**
     * Lookup250: sp_session::MembershipProof
     **/
    SpSessionMembershipProof: {
        session: string;
        trieNodes: string;
        validatorCount: string;
    };
    /**
     * Lookup251: sp_consensus_babe::digests::NextConfigDescriptor
     **/
    SpConsensusBabeDigestsNextConfigDescriptor: {
        _enum: {
            __Unused0: string;
            V1: {
                c: string;
                allowedSlots: string;
            };
        };
    };
    /**
     * Lookup252: sp_consensus_babe::AllowedSlots
     **/
    SpConsensusBabeAllowedSlots: {
        _enum: string[];
    };
    /**
     * Lookup253: pallet_timestamp::pallet::Call<T>
     **/
    PalletTimestampCall: {
        _enum: {
            set: {
                now: string;
            };
        };
    };
    /**
     * Lookup255: pallet_authorship::pallet::Call<T>
     **/
    PalletAuthorshipCall: {
        _enum: {
            set_uncles: {
                newUncles: string;
            };
        };
    };
    /**
     * Lookup257: pallet_balances::pallet::Call<T, I>
     **/
    PalletBalancesCall: {
        _enum: {
            transfer: {
                dest: string;
                value: string;
            };
            set_balance: {
                who: string;
                newFree: string;
                newReserved: string;
            };
            force_transfer: {
                source: string;
                dest: string;
                value: string;
            };
            transfer_keep_alive: {
                dest: string;
                value: string;
            };
            transfer_all: {
                dest: string;
                keepAlive: string;
            };
            force_unreserve: {
                who: string;
                amount: string;
            };
        };
    };
    /**
     * Lookup258: pallet_election_provider_multi_phase::pallet::Call<T>
     **/
    PalletElectionProviderMultiPhaseCall: {
        _enum: {
            submit_unsigned: {
                rawSolution: string;
                witness: string;
            };
            set_minimum_untrusted_score: {
                maybeNextScore: string;
            };
            set_emergency_election_result: {
                supports: string;
            };
            submit: {
                rawSolution: string;
            };
            governance_fallback: {
                maybeMaxVoters: string;
                maybeMaxTargets: string;
            };
        };
    };
    /**
     * Lookup259: pallet_election_provider_multi_phase::RawSolution<joystream_node_runtime::NposSolution16>
     **/
    PalletElectionProviderMultiPhaseRawSolution: {
        solution: string;
        score: string;
        round: string;
    };
    /**
     * Lookup260: joystream_node_runtime::NposSolution16
     **/
    JoystreamNodeRuntimeNposSolution16: {
        votes1: string;
        votes2: string;
        votes3: string;
        votes4: string;
        votes5: string;
        votes6: string;
        votes7: string;
        votes8: string;
        votes9: string;
        votes10: string;
        votes11: string;
        votes12: string;
        votes13: string;
        votes14: string;
        votes15: string;
        votes16: string;
    };
    /**
     * Lookup311: sp_npos_elections::ElectionScore
     **/
    SpNposElectionsElectionScore: {
        minimalStake: string;
        sumStake: string;
        sumStakeSquared: string;
    };
    /**
     * Lookup312: pallet_election_provider_multi_phase::SolutionOrSnapshotSize
     **/
    PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: {
        voters: string;
        targets: string;
    };
    /**
     * Lookup316: sp_npos_elections::Support<sp_core::crypto::AccountId32>
     **/
    SpNposElectionsSupport: {
        total: string;
        voters: string;
    };
    /**
     * Lookup319: pallet_staking::pallet::pallet::Call<T>
     **/
    PalletStakingPalletCall: {
        _enum: {
            bond: {
                controller: string;
                value: string;
                payee: string;
            };
            bond_extra: {
                maxAdditional: string;
            };
            unbond: {
                value: string;
            };
            withdraw_unbonded: {
                numSlashingSpans: string;
            };
            validate: {
                prefs: string;
            };
            nominate: {
                targets: string;
            };
            chill: string;
            set_payee: {
                payee: string;
            };
            set_controller: {
                controller: string;
            };
            set_validator_count: {
                _alias: {
                    new_: string;
                };
                new_: string;
            };
            increase_validator_count: {
                additional: string;
            };
            scale_validator_count: {
                factor: string;
            };
            force_no_eras: string;
            force_new_era: string;
            set_invulnerables: {
                invulnerables: string;
            };
            force_unstake: {
                stash: string;
                numSlashingSpans: string;
            };
            force_new_era_always: string;
            cancel_deferred_slash: {
                era: string;
                slashIndices: string;
            };
            payout_stakers: {
                validatorStash: string;
                era: string;
            };
            rebond: {
                value: string;
            };
            set_history_depth: {
                newHistoryDepth: string;
                eraItemsDeleted: string;
            };
            reap_stash: {
                stash: string;
                numSlashingSpans: string;
            };
            kick: {
                who: string;
            };
            set_staking_configs: {
                minNominatorBond: string;
                minValidatorBond: string;
                maxNominatorCount: string;
                maxValidatorCount: string;
                chillThreshold: string;
                minCommission: string;
            };
            chill_other: {
                controller: string;
            };
            force_apply_min_commission: {
                validatorStash: string;
            };
        };
    };
    /**
     * Lookup320: pallet_staking::RewardDestination<sp_core::crypto::AccountId32>
     **/
    PalletStakingRewardDestination: {
        _enum: {
            Staked: string;
            Stash: string;
            Controller: string;
            Account: string;
            None: string;
        };
    };
    /**
     * Lookup324: pallet_staking::pallet::pallet::ConfigOp<T>
     **/
    PalletStakingPalletConfigOpU128: {
        _enum: {
            Noop: string;
            Set: string;
            Remove: string;
        };
    };
    /**
     * Lookup325: pallet_staking::pallet::pallet::ConfigOp<T>
     **/
    PalletStakingPalletConfigOpU32: {
        _enum: {
            Noop: string;
            Set: string;
            Remove: string;
        };
    };
    /**
     * Lookup326: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Percent>
     **/
    PalletStakingPalletConfigOpPercent: {
        _enum: {
            Noop: string;
            Set: string;
            Remove: string;
        };
    };
    /**
     * Lookup327: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Perbill>
     **/
    PalletStakingPalletConfigOpPerbill: {
        _enum: {
            Noop: string;
            Set: string;
            Remove: string;
        };
    };
    /**
     * Lookup328: pallet_session::pallet::Call<T>
     **/
    PalletSessionCall: {
        _enum: {
            set_keys: {
                _alias: {
                    keys_: string;
                };
                keys_: string;
                proof: string;
            };
            purge_keys: string;
        };
    };
    /**
     * Lookup329: joystream_node_runtime::SessionKeys
     **/
    JoystreamNodeRuntimeSessionKeys: {
        grandpa: string;
        babe: string;
        imOnline: string;
        authorityDiscovery: string;
    };
    /**
     * Lookup330: sp_authority_discovery::app::Public
     **/
    SpAuthorityDiscoveryAppPublic: string;
    /**
     * Lookup331: pallet_grandpa::pallet::Call<T>
     **/
    PalletGrandpaCall: {
        _enum: {
            report_equivocation: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            report_equivocation_unsigned: {
                equivocationProof: string;
                keyOwnerProof: string;
            };
            note_stalled: {
                delay: string;
                bestFinalizedBlockNumber: string;
            };
        };
    };
    /**
     * Lookup332: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocationProof: {
        setId: string;
        equivocation: string;
    };
    /**
     * Lookup333: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
     **/
    SpFinalityGrandpaEquivocation: {
        _enum: {
            Prevote: string;
            Precommit: string;
        };
    };
    /**
     * Lookup334: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrevote: {
        roundNumber: string;
        identity: string;
        first: string;
        second: string;
    };
    /**
     * Lookup335: finality_grandpa::Prevote<primitive_types::H256, N>
     **/
    FinalityGrandpaPrevote: {
        targetHash: string;
        targetNumber: string;
    };
    /**
     * Lookup336: sp_finality_grandpa::app::Signature
     **/
    SpFinalityGrandpaAppSignature: string;
    /**
     * Lookup337: sp_core::ed25519::Signature
     **/
    SpCoreEd25519Signature: string;
    /**
     * Lookup340: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
     **/
    FinalityGrandpaEquivocationPrecommit: {
        roundNumber: string;
        identity: string;
        first: string;
        second: string;
    };
    /**
     * Lookup341: finality_grandpa::Precommit<primitive_types::H256, N>
     **/
    FinalityGrandpaPrecommit: {
        targetHash: string;
        targetNumber: string;
    };
    /**
     * Lookup343: pallet_im_online::pallet::Call<T>
     **/
    PalletImOnlineCall: {
        _enum: {
            heartbeat: {
                heartbeat: string;
                signature: string;
            };
        };
    };
    /**
     * Lookup344: pallet_im_online::Heartbeat<BlockNumber>
     **/
    PalletImOnlineHeartbeat: {
        blockNumber: string;
        networkState: string;
        sessionIndex: string;
        authorityIndex: string;
        validatorsLen: string;
    };
    /**
     * Lookup345: sp_core::offchain::OpaqueNetworkState
     **/
    SpCoreOffchainOpaqueNetworkState: {
        peerId: string;
        externalAddresses: string;
    };
    /**
     * Lookup349: pallet_im_online::sr25519::app_sr25519::Signature
     **/
    PalletImOnlineSr25519AppSr25519Signature: string;
    /**
     * Lookup350: sp_core::sr25519::Signature
     **/
    SpCoreSr25519Signature: string;
    /**
     * Lookup351: pallet_sudo::pallet::Call<T>
     **/
    PalletSudoCall: {
        _enum: {
            sudo: {
                call: string;
            };
            sudo_unchecked_weight: {
                call: string;
                weight: string;
            };
            set_key: {
                _alias: {
                    new_: string;
                };
                new_: string;
            };
            sudo_as: {
                who: string;
                call: string;
            };
        };
    };
    /**
     * Lookup352: pallet_bags_list::pallet::Call<T, I>
     **/
    PalletBagsListCall: {
        _enum: {
            rebag: {
                dislocated: string;
            };
            put_in_front_of: {
                lighter: string;
            };
        };
    };
    /**
     * Lookup353: pallet_vesting::pallet::Call<T>
     **/
    PalletVestingCall: {
        _enum: {
            vest: string;
            vest_other: {
                target: string;
            };
            vested_transfer: {
                target: string;
                schedule: string;
            };
            force_vested_transfer: {
                source: string;
                target: string;
                schedule: string;
            };
            merge_schedules: {
                schedule1Index: string;
                schedule2Index: string;
            };
        };
    };
    /**
     * Lookup354: pallet_vesting::vesting_info::VestingInfo<Balance, BlockNumber>
     **/
    PalletVestingVestingInfo: {
        locked: string;
        perBlock: string;
        startingBlock: string;
    };
    /**
     * Lookup355: pallet_multisig::pallet::Call<T>
     **/
    PalletMultisigCall: {
        _enum: {
            as_multi_threshold_1: {
                otherSignatories: string;
                call: string;
            };
            as_multi: {
                threshold: string;
                otherSignatories: string;
                maybeTimepoint: string;
                call: string;
                storeCall: string;
                maxWeight: string;
            };
            approve_as_multi: {
                threshold: string;
                otherSignatories: string;
                maybeTimepoint: string;
                callHash: string;
                maxWeight: string;
            };
            cancel_as_multi: {
                threshold: string;
                otherSignatories: string;
                timepoint: string;
                callHash: string;
            };
        };
    };
    /**
     * Lookup358: pallet_council::Call<T>
     **/
    PalletCouncilCall: {
        _enum: {
            announce_candidacy: {
                membershipId: string;
                stakingAccountId: string;
                rewardAccountId: string;
                stake: string;
            };
            release_candidacy_stake: {
                membershipId: string;
            };
            withdraw_candidacy: {
                membershipId: string;
            };
            set_candidacy_note: {
                membershipId: string;
                note: string;
            };
            set_budget: {
                balance: string;
            };
            plan_budget_refill: {
                nextRefill: string;
            };
            set_budget_increment: {
                budgetIncrement: string;
            };
            set_councilor_reward: {
                councilorReward: string;
            };
            funding_request: {
                fundingRequests: string;
            };
            fund_council_budget: {
                memberId: string;
                amount: string;
                rationale: string;
            };
            councilor_remark: {
                councilorId: string;
                msg: string;
            };
            candidate_remark: {
                candidateId: string;
                msg: string;
            };
        };
    };
    /**
     * Lookup359: pallet_referendum::Call<T, I>
     **/
    PalletReferendumCall: {
        _enum: {
            vote: {
                commitment: string;
                stake: string;
            };
            reveal_vote: {
                salt: string;
                voteOptionId: string;
            };
            release_vote_stake: string;
        };
    };
    /**
     * Lookup360: pallet_membership::Call<T>
     **/
    PalletMembershipCall: {
        _enum: {
            buy_membership: {
                params: string;
            };
            update_profile: {
                memberId: string;
                handle: string;
                metadata: string;
            };
            update_accounts: {
                memberId: string;
                newRootAccount: string;
                newControllerAccount: string;
            };
            update_profile_verification: {
                workerId: string;
                targetMemberId: string;
                isVerified: string;
            };
            set_referral_cut: {
                percentValue: string;
            };
            transfer_invites: {
                sourceMemberId: string;
                targetMemberId: string;
                numberOfInvites: string;
            };
            invite_member: {
                params: string;
            };
            gift_membership: {
                params: string;
            };
            set_membership_price: {
                newPrice: string;
            };
            set_leader_invitation_quota: {
                invitationQuota: string;
            };
            set_initial_invitation_balance: {
                newInitialBalance: string;
            };
            set_initial_invitation_count: {
                newInvitationCount: string;
            };
            add_staking_account_candidate: {
                memberId: string;
            };
            remove_staking_account: {
                memberId: string;
            };
            confirm_staking_account: {
                memberId: string;
                stakingAccountId: string;
            };
            member_remark: {
                memberId: string;
                msg: string;
            };
            create_founding_member: {
                params: string;
            };
        };
    };
    /**
     * Lookup361: pallet_forum::Call<T>
     **/
    PalletForumCall: {
        _enum: {
            update_category_membership_of_moderator: {
                moderatorId: string;
                categoryId: string;
                newValue: string;
            };
            create_category: {
                parentCategoryId: string;
                title: string;
                description: string;
            };
            update_category_archival_status: {
                actor: string;
                categoryId: string;
                newArchivalStatus: string;
            };
            update_category_title: {
                actor: string;
                categoryId: string;
                title: string;
            };
            update_category_description: {
                actor: string;
                categoryId: string;
                description: string;
            };
            delete_category: {
                actor: string;
                categoryId: string;
            };
            create_thread: {
                forumUserId: string;
                categoryId: string;
                metadata: string;
                text: string;
            };
            edit_thread_metadata: {
                forumUserId: string;
                categoryId: string;
                threadId: string;
                newMetadata: string;
            };
            delete_thread: {
                forumUserId: string;
                categoryId: string;
                threadId: string;
                hide: string;
            };
            move_thread_to_category: {
                actor: string;
                categoryId: string;
                threadId: string;
                newCategoryId: string;
            };
            moderate_thread: {
                actor: string;
                categoryId: string;
                threadId: string;
                rationale: string;
            };
            add_post: {
                forumUserId: string;
                categoryId: string;
                threadId: string;
                text: string;
                editable: string;
            };
            react_post: {
                forumUserId: string;
                categoryId: string;
                threadId: string;
                postId: string;
                react: string;
            };
            edit_post_text: {
                forumUserId: string;
                categoryId: string;
                threadId: string;
                postId: string;
                newText: string;
            };
            moderate_post: {
                actor: string;
                categoryId: string;
                threadId: string;
                postId: string;
                rationale: string;
            };
            delete_posts: {
                forumUserId: string;
                posts: string;
                rationale: string;
            };
            set_stickied_threads: {
                actor: string;
                categoryId: string;
                stickiedIds: string;
            };
        };
    };
    /**
     * Lookup362: pallet_constitution::Call<T>
     **/
    PalletConstitutionCall: {
        _enum: {
            amend_constitution: {
                constitutionText: string;
            };
        };
    };
    /**
     * Lookup364: pallet_content::Call<T>
     **/
    PalletContentCall: {
        _enum: {
            create_curator_group: {
                isActive: string;
                permissionsByLevel: string;
            };
            update_curator_group_permissions: {
                curatorGroupId: string;
                permissionsByLevel: string;
            };
            set_curator_group_status: {
                curatorGroupId: string;
                isActive: string;
            };
            add_curator_to_group: {
                curatorGroupId: string;
                curatorId: string;
                permissions: string;
            };
            remove_curator_from_group: {
                curatorGroupId: string;
                curatorId: string;
            };
            create_channel: {
                channelOwner: string;
                params: string;
            };
            update_channel: {
                actor: string;
                channelId: string;
                params: string;
            };
            update_channel_privilege_level: {
                channelId: string;
                newPrivilegeLevel: string;
            };
            set_channel_paused_features_as_moderator: {
                actor: string;
                channelId: string;
                newPausedFeatures: string;
                rationale: string;
            };
            delete_channel: {
                actor: string;
                channelId: string;
                numObjectsToDelete: string;
            };
            delete_channel_assets_as_moderator: {
                actor: string;
                channelId: string;
                assetsToRemove: string;
                rationale: string;
            };
            delete_channel_as_moderator: {
                actor: string;
                channelId: string;
                numObjectsToDelete: string;
                rationale: string;
            };
            set_channel_visibility_as_moderator: {
                actor: string;
                channelId: string;
                isHidden: string;
                rationale: string;
            };
            create_video: {
                actor: string;
                channelId: string;
                params: string;
            };
            update_video: {
                actor: string;
                videoId: string;
                params: string;
            };
            delete_video: {
                actor: string;
                videoId: string;
                numObjectsToDelete: string;
            };
            delete_video_assets_as_moderator: {
                actor: string;
                videoId: string;
                assetsToRemove: string;
                rationale: string;
            };
            delete_video_as_moderator: {
                actor: string;
                videoId: string;
                numObjectsToDelete: string;
                rationale: string;
            };
            set_video_visibility_as_moderator: {
                actor: string;
                videoId: string;
                isHidden: string;
                rationale: string;
            };
            update_channel_payouts: {
                params: string;
            };
            claim_channel_reward: {
                actor: string;
                proof: string;
                item: string;
            };
            withdraw_from_channel_balance: {
                actor: string;
                channelId: string;
                amount: string;
            };
            update_channel_state_bloat_bond: {
                newChannelStateBloatBond: string;
            };
            update_video_state_bloat_bond: {
                newVideoStateBloatBond: string;
            };
            claim_and_withdraw_channel_reward: {
                actor: string;
                proof: string;
                item: string;
            };
            issue_nft: {
                actor: string;
                videoId: string;
                params: string;
            };
            destroy_nft: {
                actor: string;
                videoId: string;
            };
            start_open_auction: {
                ownerId: string;
                videoId: string;
                auctionParams: string;
            };
            start_english_auction: {
                ownerId: string;
                videoId: string;
                auctionParams: string;
            };
            cancel_english_auction: {
                ownerId: string;
                videoId: string;
            };
            cancel_open_auction: {
                ownerId: string;
                videoId: string;
            };
            cancel_offer: {
                ownerId: string;
                videoId: string;
            };
            cancel_buy_now: {
                ownerId: string;
                videoId: string;
            };
            update_buy_now_price: {
                ownerId: string;
                videoId: string;
                newPrice: string;
            };
            make_open_auction_bid: {
                participantId: string;
                videoId: string;
                bidAmount: string;
            };
            make_english_auction_bid: {
                participantId: string;
                videoId: string;
                bidAmount: string;
            };
            cancel_open_auction_bid: {
                participantId: string;
                videoId: string;
            };
            settle_english_auction: {
                videoId: string;
            };
            pick_open_auction_winner: {
                ownerId: string;
                videoId: string;
                winnerId: string;
                commit: string;
            };
            offer_nft: {
                videoId: string;
                ownerId: string;
                to: string;
                price: string;
            };
            sling_nft_back: {
                videoId: string;
                ownerId: string;
            };
            accept_incoming_offer: {
                videoId: string;
                witnessPrice: string;
            };
            sell_nft: {
                videoId: string;
                ownerId: string;
                price: string;
            };
            buy_nft: {
                videoId: string;
                participantId: string;
                witnessPrice: string;
            };
            toggle_nft_limits: {
                enabled: string;
            };
            channel_owner_remark: {
                channelId: string;
                msg: string;
            };
            channel_agent_remark: {
                actor: string;
                channelId: string;
                msg: string;
            };
            nft_owner_remark: {
                actor: string;
                videoId: string;
                msg: string;
            };
            initialize_channel_transfer: {
                channelId: string;
                actor: string;
                transferParams: string;
            };
            cancel_channel_transfer: {
                channelId: string;
                actor: string;
            };
            accept_channel_transfer: {
                channelId: string;
                commitmentParams: string;
            };
            update_global_nft_limit: {
                nftLimitPeriod: string;
                limit: string;
            };
            update_channel_nft_limit: {
                actor: string;
                nftLimitPeriod: string;
                channelId: string;
                limit: string;
            };
            issue_creator_token: {
                actor: string;
                channelId: string;
                params: string;
            };
            init_creator_token_sale: {
                actor: string;
                channelId: string;
                params: string;
            };
            update_upcoming_creator_token_sale: {
                actor: string;
                channelId: string;
                newStartBlock: string;
                newDuration: string;
            };
            creator_token_issuer_transfer: {
                actor: string;
                channelId: string;
                outputs: string;
            };
            make_creator_token_permissionless: {
                actor: string;
                channelId: string;
            };
            reduce_creator_token_patronage_rate_to: {
                actor: string;
                channelId: string;
                targetRate: string;
            };
            claim_creator_token_patronage_credit: {
                actor: string;
                channelId: string;
            };
            issue_revenue_split: {
                actor: string;
                channelId: string;
                start: string;
                duration: string;
            };
            finalize_revenue_split: {
                actor: string;
                channelId: string;
            };
            finalize_creator_token_sale: {
                actor: string;
                channelId: string;
            };
            deissue_creator_token: {
                actor: string;
                channelId: string;
            };
        };
    };
    /**
     * Lookup366: pallet_content::types::ProofElementRecord<primitive_types::H256, pallet_content::types::Side>
     **/
    PalletContentProofElementRecord: {
        _alias: {
            hash_: string;
        };
        hash_: string;
        side: string;
    };
    /**
     * Lookup367: pallet_content::types::Side
     **/
    PalletContentSide: {
        _enum: string[];
    };
    /**
     * Lookup368: pallet_content::types::PullPaymentElement<ChannelId, Balance, primitive_types::H256>
     **/
    PalletContentPullPaymentElement: {
        channelId: string;
        cumulativeRewardEarned: string;
        reason: string;
    };
    /**
     * Lookup369: pallet_content::types::InitTransferParameters<MemberId, CuratorGroupId, Balance>
     **/
    PalletContentInitTransferParameters: {
        newCollaborators: string;
        price: string;
        newOwner: string;
    };
    /**
     * Lookup370: pallet_project_token::types::TokenSaleParams<JoyBalance, Balance, BlockNumber, pallet_project_token::types::VestingScheduleParams<BlockNumber>>
     **/
    PalletProjectTokenTokenSaleParams: {
        unitPrice: string;
        upperBoundQuantity: string;
        startsAt: string;
        duration: string;
        vestingScheduleParams: string;
        capPerMember: string;
        metadata: string;
    };
    /**
     * Lookup371: pallet_project_token::types::Transfers<MemberId, pallet_project_token::types::PaymentWithVesting<Balance, pallet_project_token::types::VestingScheduleParams<BlockNumber>>>
     **/
    PalletProjectTokenTransfersPaymentWithVesting: string;
    /**
     * Lookup375: pallet_storage::Call<T>
     **/
    PalletStorageCall: {
        _enum: {
            delete_storage_bucket: {
                storageBucketId: string;
            };
            update_uploading_blocked_status: {
                newStatus: string;
            };
            update_data_size_fee: {
                newDataSizeFee: string;
            };
            update_storage_buckets_per_bag_limit: {
                newLimit: string;
            };
            update_storage_buckets_voucher_max_limits: {
                newObjectsSize: string;
                newObjectsNumber: string;
            };
            update_data_object_state_bloat_bond: {
                stateBloatBond: string;
            };
            update_number_of_storage_buckets_in_dynamic_bag_creation_policy: {
                dynamicBagType: string;
                numberOfStorageBuckets: string;
            };
            update_blacklist: {
                removeHashes: string;
                addHashes: string;
            };
            create_storage_bucket: {
                inviteWorker: string;
                acceptingNewBags: string;
                sizeLimit: string;
                objectsLimit: string;
            };
            update_storage_buckets_for_bag: {
                bagId: string;
                addBuckets: string;
                removeBuckets: string;
            };
            cancel_storage_bucket_operator_invite: {
                storageBucketId: string;
            };
            invite_storage_bucket_operator: {
                storageBucketId: string;
                operatorId: string;
            };
            remove_storage_bucket_operator: {
                storageBucketId: string;
            };
            update_storage_bucket_status: {
                storageBucketId: string;
                acceptingNewBags: string;
            };
            set_storage_bucket_voucher_limits: {
                storageBucketId: string;
                newObjectsSizeLimit: string;
                newObjectsNumberLimit: string;
            };
            accept_storage_bucket_invitation: {
                workerId: string;
                storageBucketId: string;
                transactorAccountId: string;
            };
            set_storage_operator_metadata: {
                workerId: string;
                storageBucketId: string;
                metadata: string;
            };
            accept_pending_data_objects: {
                workerId: string;
                storageBucketId: string;
                bagId: string;
                dataObjects: string;
            };
            create_distribution_bucket_family: string;
            delete_distribution_bucket_family: {
                familyId: string;
            };
            create_distribution_bucket: {
                familyId: string;
                acceptingNewBags: string;
            };
            update_distribution_bucket_status: {
                bucketId: string;
                acceptingNewBags: string;
            };
            delete_distribution_bucket: {
                bucketId: string;
            };
            update_distribution_buckets_for_bag: {
                bagId: string;
                familyId: string;
                addBucketsIndices: string;
                removeBucketsIndices: string;
            };
            update_distribution_buckets_per_bag_limit: {
                newLimit: string;
            };
            update_distribution_bucket_mode: {
                bucketId: string;
                distributing: string;
            };
            update_families_in_dynamic_bag_creation_policy: {
                dynamicBagType: string;
                families: string;
            };
            invite_distribution_bucket_operator: {
                bucketId: string;
                operatorWorkerId: string;
            };
            cancel_distribution_bucket_operator_invite: {
                bucketId: string;
                operatorWorkerId: string;
            };
            remove_distribution_bucket_operator: {
                bucketId: string;
                operatorWorkerId: string;
            };
            set_distribution_bucket_family_metadata: {
                familyId: string;
                metadata: string;
            };
            accept_distribution_bucket_invitation: {
                workerId: string;
                bucketId: string;
            };
            set_distribution_operator_metadata: {
                workerId: string;
                bucketId: string;
                metadata: string;
            };
            sudo_upload_data_objects: {
                params: string;
            };
            sudo_create_dynamic_bag: {
                params: string;
            };
            storage_operator_remark: {
                workerId: string;
                storageBucketId: string;
                msg: string;
            };
            distribution_operator_remark: {
                workerId: string;
                distributionBucketId: string;
                msg: string;
            };
        };
    };
    /**
     * Lookup376: pallet_storage::DynBagCreationParametersRecord<pallet_storage::DynamicBagIdType<MemberId, ChannelId>, sp_core::crypto::AccountId32, Balance, StorageBucketId, pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>>
     **/
    PalletStorageDynBagCreationParametersRecord: {
        bagId: string;
        objectCreationList: string;
        stateBloatBondSourceAccountId: string;
        expectedDataSizeFee: string;
        expectedDataObjectStateBloatBond: string;
        storageBuckets: string;
        distributionBuckets: string;
    };
    /**
     * Lookup377: pallet_project_token::Call<T>
     **/
    PalletProjectTokenCall: {
        _enum: {
            transfer: {
                srcMemberId: string;
                tokenId: string;
                outputs: string;
            };
            burn: {
                tokenId: string;
                memberId: string;
                amount: string;
            };
            dust_account: {
                tokenId: string;
                memberId: string;
            };
            join_whitelist: {
                memberId: string;
                tokenId: string;
                proof: string;
            };
            purchase_tokens_on_sale: {
                tokenId: string;
                memberId: string;
                amount: string;
            };
            participate_in_split: {
                tokenId: string;
                memberId: string;
                amount: string;
            };
            exit_revenue_split: {
                tokenId: string;
                memberId: string;
            };
        };
    };
    /**
     * Lookup378: pallet_project_token::types::Transfers<MemberId, pallet_project_token::types::Payment<Balance>>
     **/
    PalletProjectTokenTransfersPayment: string;
    /**
     * Lookup379: pallet_project_token::types::Payment<Balance>
     **/
    PalletProjectTokenPayment: {
        remark: string;
        amount: string;
    };
    /**
     * Lookup383: pallet_project_token::types::MerkleProof<sp_runtime::traits::BlakeTwo256>
     **/
    PalletProjectTokenMerkleProof: string;
    /**
     * Lookup386: pallet_project_token::types::MerkleSide
     **/
    PalletProjectTokenMerkleSide: {
        _enum: string[];
    };
    /**
     * Lookup387: pallet_proposals_engine::Call<T>
     **/
    PalletProposalsEngineCall: {
        _enum: {
            vote: {
                voterId: string;
                proposalId: string;
                vote: string;
                rationale: string;
            };
            cancel_proposal: {
                proposerId: string;
                proposalId: string;
            };
            veto_proposal: {
                proposalId: string;
            };
            proposer_remark: {
                proposalId: string;
                proposerId: string;
                msg: string;
            };
        };
    };
    /**
     * Lookup388: pallet_proposals_discussion::Call<T>
     **/
    PalletProposalsDiscussionCall: {
        _enum: {
            add_post: {
                postAuthorId: string;
                threadId: string;
                text: string;
                editable: string;
            };
            delete_post: {
                deleterId: string;
                postId: string;
                threadId: string;
                hide: string;
            };
            update_post: {
                threadId: string;
                postId: string;
                text: string;
            };
            change_thread_mode: {
                memberId: string;
                threadId: string;
                mode: string;
            };
        };
    };
    /**
     * Lookup389: pallet_proposals_codex::Call<T>
     **/
    PalletProposalsCodexCall: {
        _enum: {
            create_proposal: {
                generalProposalParameters: string;
                proposalDetails: string;
            };
        };
    };
    /**
     * Lookup390: pallet_working_group::Call<T, I>
     **/
    PalletWorkingGroupCall: {
        _enum: {
            add_opening: {
                description: string;
                openingType: string;
                stakePolicy: string;
                rewardPerBlock: string;
            };
            apply_on_opening: {
                p: string;
            };
            fill_opening: {
                openingId: string;
                successfulApplicationIds: string;
            };
            update_role_account: {
                workerId: string;
                newRoleAccountId: string;
            };
            leave_role: {
                workerId: string;
                rationale: string;
            };
            terminate_role: {
                workerId: string;
                penalty: string;
                rationale: string;
            };
            slash_stake: {
                workerId: string;
                penalty: string;
                rationale: string;
            };
            decrease_stake: {
                workerId: string;
                stakeBalanceDelta: string;
            };
            increase_stake: {
                workerId: string;
                stakeBalanceDelta: string;
            };
            withdraw_application: {
                applicationId: string;
            };
            cancel_opening: {
                openingId: string;
            };
            set_budget: {
                newBudget: string;
            };
            update_reward_account: {
                workerId: string;
                newRewardAccountId: string;
            };
            update_reward_amount: {
                workerId: string;
                rewardPerBlock: string;
            };
            set_status_text: {
                statusText: string;
            };
            spend_from_budget: {
                accountId: string;
                amount: string;
                rationale: string;
            };
            update_role_storage: {
                workerId: string;
                storage: string;
            };
            fund_working_group_budget: {
                memberId: string;
                amount: string;
                rationale: string;
            };
            lead_remark: {
                msg: string;
            };
            worker_remark: {
                workerId: string;
                msg: string;
            };
        };
    };
    /**
     * Lookup399: joystream_node_runtime::OriginCaller
     **/
    JoystreamNodeRuntimeOriginCaller: {
        _enum: {
            system: string;
            Void: string;
        };
    };
    /**
     * Lookup400: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
     **/
    FrameSupportDispatchRawOrigin: {
        _enum: {
            Root: string;
            Signed: string;
            None: string;
        };
    };
    /**
     * Lookup401: sp_core::Void
     **/
    SpCoreVoid: string;
    /**
     * Lookup402: pallet_utility::pallet::Error<T>
     **/
    PalletUtilityError: {
        _enum: string[];
    };
    /**
     * Lookup409: sp_consensus_babe::digests::PreDigest
     **/
    SpConsensusBabeDigestsPreDigest: {
        _enum: {
            __Unused0: string;
            Primary: string;
            SecondaryPlain: string;
            SecondaryVRF: string;
        };
    };
    /**
     * Lookup410: sp_consensus_babe::digests::PrimaryPreDigest
     **/
    SpConsensusBabeDigestsPrimaryPreDigest: {
        authorityIndex: string;
        slot: string;
        vrfOutput: string;
        vrfProof: string;
    };
    /**
     * Lookup411: sp_consensus_babe::digests::SecondaryPlainPreDigest
     **/
    SpConsensusBabeDigestsSecondaryPlainPreDigest: {
        authorityIndex: string;
        slot: string;
    };
    /**
     * Lookup412: sp_consensus_babe::digests::SecondaryVRFPreDigest
     **/
    SpConsensusBabeDigestsSecondaryVRFPreDigest: {
        authorityIndex: string;
        slot: string;
        vrfOutput: string;
        vrfProof: string;
    };
    /**
     * Lookup414: sp_consensus_babe::BabeEpochConfiguration
     **/
    SpConsensusBabeBabeEpochConfiguration: {
        c: string;
        allowedSlots: string;
    };
    /**
     * Lookup415: pallet_babe::pallet::Error<T>
     **/
    PalletBabeError: {
        _enum: string[];
    };
    /**
     * Lookup417: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
     **/
    PalletAuthorshipUncleEntryItem: {
        _enum: {
            InclusionHeight: string;
            Uncle: string;
        };
    };
    /**
     * Lookup418: pallet_authorship::pallet::Error<T>
     **/
    PalletAuthorshipError: {
        _enum: string[];
    };
    /**
     * Lookup420: pallet_balances::BalanceLock<Balance>
     **/
    PalletBalancesBalanceLock: {
        id: string;
        amount: string;
        reasons: string;
    };
    /**
     * Lookup421: pallet_balances::Reasons
     **/
    PalletBalancesReasons: {
        _enum: string[];
    };
    /**
     * Lookup424: pallet_balances::ReserveData<ReserveIdentifier, Balance>
     **/
    PalletBalancesReserveData: {
        id: string;
        amount: string;
    };
    /**
     * Lookup426: pallet_balances::Releases
     **/
    PalletBalancesReleases: {
        _enum: string[];
    };
    /**
     * Lookup427: pallet_balances::pallet::Error<T, I>
     **/
    PalletBalancesError: {
        _enum: string[];
    };
    /**
     * Lookup429: pallet_transaction_payment::Releases
     **/
    PalletTransactionPaymentReleases: {
        _enum: string[];
    };
    /**
     * Lookup430: pallet_election_provider_multi_phase::Phase<Bn>
     **/
    PalletElectionProviderMultiPhasePhase: {
        _enum: {
            Off: string;
            Signed: string;
            Unsigned: string;
            Emergency: string;
        };
    };
    /**
     * Lookup432: pallet_election_provider_multi_phase::ReadySolution<sp_core::crypto::AccountId32>
     **/
    PalletElectionProviderMultiPhaseReadySolution: {
        supports: string;
        score: string;
        compute: string;
    };
    /**
     * Lookup433: pallet_election_provider_multi_phase::RoundSnapshot<T>
     **/
    PalletElectionProviderMultiPhaseRoundSnapshot: {
        voters: string;
        targets: string;
    };
    /**
     * Lookup441: pallet_election_provider_multi_phase::signed::SignedSubmission<sp_core::crypto::AccountId32, Balance, joystream_node_runtime::NposSolution16>
     **/
    PalletElectionProviderMultiPhaseSignedSignedSubmission: {
        who: string;
        deposit: string;
        rawSolution: string;
        callFee: string;
    };
    /**
     * Lookup442: pallet_election_provider_multi_phase::pallet::Error<T>
     **/
    PalletElectionProviderMultiPhaseError: {
        _enum: string[];
    };
    /**
     * Lookup443: pallet_staking::StakingLedger<T>
     **/
    PalletStakingStakingLedger: {
        stash: string;
        total: string;
        active: string;
        unlocking: string;
        claimedRewards: string;
    };
    /**
     * Lookup445: pallet_staking::UnlockChunk<Balance>
     **/
    PalletStakingUnlockChunk: {
        value: string;
        era: string;
    };
    /**
     * Lookup447: pallet_staking::Nominations<T>
     **/
    PalletStakingNominations: {
        targets: string;
        submittedIn: string;
        suppressed: string;
    };
    /**
     * Lookup448: pallet_staking::ActiveEraInfo
     **/
    PalletStakingActiveEraInfo: {
        index: string;
        start: string;
    };
    /**
     * Lookup450: pallet_staking::EraRewardPoints<sp_core::crypto::AccountId32>
     **/
    PalletStakingEraRewardPoints: {
        total: string;
        individual: string;
    };
    /**
     * Lookup454: pallet_staking::Forcing
     **/
    PalletStakingForcing: {
        _enum: string[];
    };
    /**
     * Lookup456: pallet_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
     **/
    PalletStakingUnappliedSlash: {
        validator: string;
        own: string;
        others: string;
        reporters: string;
        payout: string;
    };
    /**
     * Lookup458: pallet_staking::slashing::SlashingSpans
     **/
    PalletStakingSlashingSlashingSpans: {
        spanIndex: string;
        lastStart: string;
        lastNonzeroSlash: string;
        prior: string;
    };
    /**
     * Lookup459: pallet_staking::slashing::SpanRecord<Balance>
     **/
    PalletStakingSlashingSpanRecord: {
        slashed: string;
        paidOut: string;
    };
    /**
     * Lookup462: pallet_staking::Releases
     **/
    PalletStakingReleases: {
        _enum: string[];
    };
    /**
     * Lookup463: pallet_staking::pallet::pallet::Error<T>
     **/
    PalletStakingPalletError: {
        _enum: string[];
    };
    /**
     * Lookup467: sp_core::crypto::KeyTypeId
     **/
    SpCoreCryptoKeyTypeId: string;
    /**
     * Lookup468: pallet_session::pallet::Error<T>
     **/
    PalletSessionError: {
        _enum: string[];
    };
    /**
     * Lookup470: pallet_grandpa::StoredState<N>
     **/
    PalletGrandpaStoredState: {
        _enum: {
            Live: string;
            PendingPause: {
                scheduledAt: string;
                delay: string;
            };
            Paused: string;
            PendingResume: {
                scheduledAt: string;
                delay: string;
            };
        };
    };
    /**
     * Lookup471: pallet_grandpa::StoredPendingChange<N, Limit>
     **/
    PalletGrandpaStoredPendingChange: {
        scheduledAt: string;
        delay: string;
        nextAuthorities: string;
        forced: string;
    };
    /**
     * Lookup473: pallet_grandpa::pallet::Error<T>
     **/
    PalletGrandpaError: {
        _enum: string[];
    };
    /**
     * Lookup479: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
     **/
    PalletImOnlineBoundedOpaqueNetworkState: {
        peerId: string;
        externalAddresses: string;
    };
    /**
     * Lookup483: pallet_im_online::pallet::Error<T>
     **/
    PalletImOnlineError: {
        _enum: string[];
    };
    /**
     * Lookup484: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
     **/
    SpStakingOffenceOffenceDetails: {
        offender: string;
        reporters: string;
    };
    /**
     * Lookup487: pallet_sudo::pallet::Error<T>
     **/
    PalletSudoError: {
        _enum: string[];
    };
    /**
     * Lookup488: pallet_bags_list::list::Node<T, I>
     **/
    PalletBagsListListNode: {
        id: string;
        prev: string;
        next: string;
        bagUpper: string;
        score: string;
    };
    /**
     * Lookup489: pallet_bags_list::list::Bag<T, I>
     **/
    PalletBagsListListBag: {
        head: string;
        tail: string;
    };
    /**
     * Lookup490: pallet_bags_list::pallet::Error<T, I>
     **/
    PalletBagsListError: {
        _enum: {
            List: string;
        };
    };
    /**
     * Lookup491: pallet_bags_list::list::ListError
     **/
    PalletBagsListListListError: {
        _enum: string[];
    };
    /**
     * Lookup494: pallet_vesting::Releases
     **/
    PalletVestingReleases: {
        _enum: string[];
    };
    /**
     * Lookup495: pallet_vesting::pallet::Error<T>
     **/
    PalletVestingError: {
        _enum: string[];
    };
    /**
     * Lookup497: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
     **/
    PalletMultisigMultisig: {
        when: string;
        deposit: string;
        depositor: string;
        approvals: string;
    };
    /**
     * Lookup499: pallet_multisig::pallet::Error<T>
     **/
    PalletMultisigError: {
        _enum: string[];
    };
    /**
     * Lookup500: pallet_council::CouncilStageUpdate<BlockNumber>
     **/
    PalletCouncilCouncilStageUpdate: {
        stage: string;
        changedAt: string;
    };
    /**
     * Lookup501: pallet_council::CouncilStage<BlockNumber>
     **/
    PalletCouncilCouncilStage: {
        _enum: {
            Announcing: string;
            Election: string;
            Idle: string;
        };
    };
    /**
     * Lookup502: pallet_council::CouncilStageAnnouncing<BlockNumber>
     **/
    PalletCouncilCouncilStageAnnouncing: {
        candidatesCount: string;
        endsAt: string;
    };
    /**
     * Lookup503: pallet_council::CouncilStageElection
     **/
    PalletCouncilCouncilStageElection: {
        candidatesCount: string;
    };
    /**
     * Lookup504: pallet_council::CouncilStageIdle<BlockNumber>
     **/
    PalletCouncilCouncilStageIdle: {
        endsAt: string;
    };
    /**
     * Lookup506: pallet_council::CouncilMember<sp_core::crypto::AccountId32, MemberId, Balance, BlockNumber>
     **/
    PalletCouncilCouncilMember: {
        stakingAccountId: string;
        rewardAccountId: string;
        membershipId: string;
        stake: string;
        lastPaymentBlock: string;
        unpaidReward: string;
    };
    /**
     * Lookup507: pallet_council::Candidate<sp_core::crypto::AccountId32, Balance, primitive_types::H256, VotePower>
     **/
    PalletCouncilCandidate: {
        stakingAccountId: string;
        rewardAccountId: string;
        cycleId: string;
        stake: string;
        votePower: string;
        noteHash: string;
    };
    /**
     * Lookup508: pallet_council::Error<T>
     **/
    PalletCouncilError: {
        _enum: string[];
    };
    /**
     * Lookup509: pallet_referendum::ReferendumStage<BlockNumber, MemberId, VotePower>
     **/
    PalletReferendumReferendumStage: {
        _enum: {
            Inactive: string;
            Voting: string;
            Revealing: string;
        };
    };
    /**
     * Lookup510: pallet_referendum::ReferendumStageVoting<BlockNumber>
     **/
    PalletReferendumReferendumStageVoting: {
        started: string;
        winningTargetCount: string;
        currentCycleId: string;
        endsAt: string;
    };
    /**
     * Lookup511: pallet_referendum::ReferendumStageRevealing<BlockNumber, MemberId, VotePower>
     **/
    PalletReferendumReferendumStageRevealing: {
        started: string;
        winningTargetCount: string;
        intermediateWinners: string;
        currentCycleId: string;
        endsAt: string;
    };
    /**
     * Lookup512: pallet_referendum::CastVote<primitive_types::H256, Currency, MemberId>
     **/
    PalletReferendumCastVote: {
        commitment: string;
        cycleId: string;
        stake: string;
        voteFor: string;
    };
    /**
     * Lookup513: pallet_referendum::Error<T, I>
     **/
    PalletReferendumError: {
        _enum: string[];
    };
    /**
     * Lookup514: pallet_membership::MembershipObject<sp_core::crypto::AccountId32>
     **/
    PalletMembershipMembershipObject: {
        handleHash: string;
        rootAccount: string;
        controllerAccount: string;
        verified: string;
        invites: string;
    };
    /**
     * Lookup515: pallet_membership::StakingAccountMemberBinding<MemberId>
     **/
    PalletMembershipStakingAccountMemberBinding: {
        memberId: string;
        confirmed: string;
    };
    /**
     * Lookup516: pallet_membership::Error<T>
     **/
    PalletMembershipError: {
        _enum: string[];
    };
    /**
     * Lookup517: pallet_forum::Category<CategoryId, ThreadId, primitive_types::H256>
     **/
    PalletForumCategory: {
        titleHash: string;
        descriptionHash: string;
        archived: string;
        numDirectSubcategories: string;
        numDirectThreads: string;
        numDirectModerators: string;
        parentCategoryId: string;
        stickyThreadIds: string;
    };
    /**
     * Lookup518: pallet_forum::Thread<ForumUserId, CategoryId, Balance>
     **/
    PalletForumThread: {
        categoryId: string;
        authorId: string;
        cleanupPayOff: string;
        numberOfPosts: string;
    };
    /**
     * Lookup519: pallet_forum::Post<ForumUserId, ThreadId, primitive_types::H256, Balance, BlockNumber>
     **/
    PalletForumPost: {
        threadId: string;
        textHash: string;
        authorId: string;
        cleanupPayOff: string;
        lastEdited: string;
    };
    /**
     * Lookup520: pallet_forum::Error<T>
     **/
    PalletForumError: {
        _enum: string[];
    };
    /**
     * Lookup521: pallet_constitution::ConstitutionInfo
     **/
    PalletConstitutionConstitutionInfo: {
        textHash: string;
    };
    /**
     * Lookup523: pallet_content::types::VideoRecord<ChannelId, pallet_content::nft::types::OwnedNft<pallet_content::nft::types::TransactionalStatusRecord<MemberId, Balance, pallet_content::nft::types::EnglishAuctionRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionRecord<BlockNumber, AuctionId, Balance, MemberId>>, MemberId, AuctionId>, DataObjectId, Balance>
     **/
    PalletContentVideoRecord: {
        inChannel: string;
        nftStatus: string;
        dataObjects: string;
        videoStateBloatBond: string;
    };
    /**
     * Lookup524: pallet_content::nft::types::OwnedNft<pallet_content::nft::types::TransactionalStatusRecord<MemberId, Balance, pallet_content::nft::types::EnglishAuctionRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionRecord<BlockNumber, AuctionId, Balance, MemberId>>, MemberId, AuctionId>
     **/
    PalletContentNftTypesOwnedNft: {
        owner: string;
        transactionalStatus: string;
        creatorRoyalty: string;
        openAuctionsNonce: string;
    };
    /**
     * Lookup525: pallet_content::nft::types::TransactionalStatusRecord<MemberId, Balance, pallet_content::nft::types::EnglishAuctionRecord<BlockNumber, Balance, MemberId>, pallet_content::nft::types::OpenAuctionRecord<BlockNumber, AuctionId, Balance, MemberId>>
     **/
    PalletContentNftTypesTransactionalStatusRecord: {
        _enum: {
            Idle: string;
            InitiatedOfferToMember: string;
            EnglishAuction: string;
            OpenAuction: string;
            BuyNow: string;
        };
    };
    /**
     * Lookup526: pallet_content::nft::types::EnglishAuctionRecord<BlockNumber, Balance, MemberId>
     **/
    PalletContentNftTypesEnglishAuctionRecord: {
        startingPrice: string;
        buyNowPrice: string;
        whitelist: string;
        end: string;
        start: string;
        extensionPeriod: string;
        minBidStep: string;
        topBid: string;
    };
    /**
     * Lookup528: pallet_content::nft::types::EnglishAuctionBid<Balance, MemberId>
     **/
    PalletContentNftTypesEnglishAuctionBid: {
        amount: string;
        bidderId: string;
    };
    /**
     * Lookup529: pallet_content::nft::types::OpenAuctionRecord<BlockNumber, AuctionId, Balance, MemberId>
     **/
    PalletContentNftTypesOpenAuctionRecord: {
        startingPrice: string;
        buyNowPrice: string;
        whitelist: string;
        bidLockDuration: string;
        auctionId: string;
        start: string;
    };
    /**
     * Lookup530: pallet_content::nft::types::NftOwner<MemberId>
     **/
    PalletContentNftTypesNftOwner: {
        _enum: {
            ChannelOwner: string;
            Member: string;
        };
    };
    /**
     * Lookup532: pallet_content::permissions::curator_group::CuratorGroup<T>
     **/
    PalletContentPermissionsCuratorGroup: {
        curators: string;
        active: string;
        permissionsByLevel: string;
    };
    /**
     * Lookup533: pallet_content::nft::types::OpenAuctionBidRecord<Balance, BlockNumber, AuctionId>
     **/
    PalletContentNftTypesOpenAuctionBidRecord: {
        amount: string;
        madeAtBlock: string;
        auctionId: string;
    };
    /**
     * Lookup534: pallet_content::errors::Error<T>
     **/
    PalletContentErrorsError: {
        _enum: string[];
    };
    /**
     * Lookup535: pallet_storage::BagRecord<StorageBucketId, pallet_storage::DistributionBucketIdRecord<DistributionBucketFamilyId, DistributionBucketIndex>>
     **/
    PalletStorageBagRecord: {
        storedBy: string;
        distributedBy: string;
        objectsTotalSize: string;
        objectsNumber: string;
    };
    /**
     * Lookup536: pallet_storage::StorageBucketRecord<WorkerId, sp_core::crypto::AccountId32>
     **/
    PalletStorageStorageBucketRecord: {
        operatorStatus: string;
        acceptingNewBags: string;
        voucher: string;
        assignedBags: string;
    };
    /**
     * Lookup537: pallet_storage::StorageBucketOperatorStatus<WorkerId, sp_core::crypto::AccountId32>
     **/
    PalletStorageStorageBucketOperatorStatus: {
        _enum: {
            Missing: string;
            InvitedStorageWorker: string;
            StorageWorker: string;
        };
    };
    /**
     * Lookup538: pallet_storage::DynamicBagCreationPolicy<DistributionBucketFamilyId>
     **/
    PalletStorageDynamicBagCreationPolicy: {
        numberOfStorageBuckets: string;
        families: string;
    };
    /**
     * Lookup540: pallet_storage::DataObject<Balance>
     **/
    PalletStorageDataObject: {
        _alias: {
            size_: string;
        };
        accepted: string;
        stateBloatBond: string;
        size_: string;
        ipfsContentId: string;
    };
    /**
     * Lookup541: pallet_storage::DistributionBucketFamilyRecord<DistributionBucketIndex>
     **/
    PalletStorageDistributionBucketFamilyRecord: {
        nextDistributionBucketIndex: string;
    };
    /**
     * Lookup542: pallet_storage::DistributionBucketRecord<WorkerId>
     **/
    PalletStorageDistributionBucketRecord: {
        acceptingNewBags: string;
        distributing: string;
        pendingInvitations: string;
        operators: string;
        assignedBags: string;
    };
    /**
     * Lookup543: pallet_common::constraints::BoundedValueConstraint<Val>
     **/
    PalletCommonConstraintsBoundedValueConstraint: {
        min: string;
        maxMinDiff: string;
    };
    /**
     * Lookup544: pallet_storage::Error<T>
     **/
    PalletStorageError: {
        _enum: string[];
    };
    /**
     * Lookup545: pallet_project_token::types::AccountData<pallet_project_token::types::VestingSchedule<BlockNumber, Balance>, Balance, pallet_project_token::types::StakingStatus<Balance>, JoyBalance>
     **/
    PalletProjectTokenAccountData: {
        vestingSchedules: string;
        amount: string;
        splitStakingStatus: string;
        bloatBond: string;
        nextVestingTransferId: string;
        lastSaleTotalPurchasedAmount: string;
    };
    /**
     * Lookup546: pallet_project_token::types::VestingSchedule<BlockNumber, Balance>
     **/
    PalletProjectTokenVestingSchedule: {
        linearVestingStartBlock: string;
        linearVestingDuration: string;
        cliffAmount: string;
        postCliffTotalAmount: string;
        burnedAmount: string;
    };
    /**
     * Lookup547: pallet_project_token::types::StakingStatus<Balance>
     **/
    PalletProjectTokenStakingStatus: {
        splitId: string;
        amount: string;
    };
    /**
     * Lookup554: pallet_project_token::types::TokenData<Balance, primitive_types::H256, BlockNumber, pallet_project_token::types::TokenSale<JoyBalance, Balance, BlockNumber, pallet_project_token::types::VestingScheduleParams<BlockNumber>, MemberId, sp_core::crypto::AccountId32>, pallet_project_token::types::RevenueSplitState<JoyBalance, BlockNumber>>
     **/
    PalletProjectTokenTokenData: {
        totalSupply: string;
        tokensIssued: string;
        nextSaleId: string;
        sale: string;
        transferPolicy: string;
        symbol: string;
        patronageInfo: string;
        accountsNumber: string;
        revenueSplitRate: string;
        revenueSplit: string;
        nextRevenueSplitId: string;
    };
    /**
     * Lookup555: pallet_project_token::types::RevenueSplitState<JoyBalance, BlockNumber>
     **/
    PalletProjectTokenRevenueSplitState: {
        _enum: {
            Inactive: string;
            Active: string;
        };
    };
    /**
     * Lookup556: pallet_project_token::types::RevenueSplitInfo<JoyBalance, BlockNumber>
     **/
    PalletProjectTokenRevenueSplitInfo: {
        allocation: string;
        timeline: string;
        dividendsClaimed: string;
    };
    /**
     * Lookup557: pallet_project_token::types::Timeline<BlockNumber>
     **/
    PalletProjectTokenTimeline: {
        start: string;
        duration: string;
    };
    /**
     * Lookup559: pallet_project_token::types::PatronageData<Balance, BlockNumber>
     **/
    PalletProjectTokenPatronageData: {
        rate: string;
        unclaimedPatronageTallyAmount: string;
        lastUnclaimedPatronageTallyBlock: string;
    };
    /**
     * Lookup561: pallet_project_token::errors::Error<T>
     **/
    PalletProjectTokenErrorsError: {
        _enum: string[];
    };
    /**
     * Lookup562: pallet_proposals_engine::types::Proposal<BlockNumber, ProposerId, Balance, sp_core::crypto::AccountId32>
     **/
    PalletProposalsEngineProposal: {
        parameters: string;
        proposerId: string;
        activatedAt: string;
        status: string;
        votingResults: string;
        exactExecutionBlock: string;
        nrOfCouncilConfirmations: string;
        stakingAccountId: string;
    };
    /**
     * Lookup563: pallet_proposals_engine::types::ProposalParameters<BlockNumber, Balance>
     **/
    PalletProposalsEngineProposalParameters: {
        votingPeriod: string;
        gracePeriod: string;
        approvalQuorumPercentage: string;
        approvalThresholdPercentage: string;
        slashingQuorumPercentage: string;
        slashingThresholdPercentage: string;
        requiredStake: string;
        constitutionality: string;
    };
    /**
     * Lookup564: pallet_proposals_engine::types::VotingResults
     **/
    PalletProposalsEngineVotingResults: {
        abstentions: string;
        approvals: string;
        rejections: string;
        slashes: string;
    };
    /**
     * Lookup566: pallet_proposals_engine::Error<T>
     **/
    PalletProposalsEngineError: {
        _enum: string[];
    };
    /**
     * Lookup567: pallet_proposals_discussion::types::DiscussionThread<ThreadAuthorId, BlockNumber, MemberId>
     **/
    PalletProposalsDiscussionDiscussionThread: {
        activatedAt: string;
        authorId: string;
        mode: string;
    };
    /**
     * Lookup568: pallet_proposals_discussion::types::DiscussionPost<PostAuthorId, Balance, BlockNumber>
     **/
    PalletProposalsDiscussionDiscussionPost: {
        authorId: string;
        cleanupPayOff: string;
        lastEdited: string;
    };
    /**
     * Lookup569: pallet_proposals_discussion::Error<T>
     **/
    PalletProposalsDiscussionError: {
        _enum: string[];
    };
    /**
     * Lookup570: pallet_proposals_codex::Error<T>
     **/
    PalletProposalsCodexError: {
        _enum: string[];
    };
    /**
     * Lookup571: pallet_working_group::types::Opening<BlockNumber, Balance>
     **/
    PalletWorkingGroupOpening: {
        openingType: string;
        created: string;
        descriptionHash: string;
        stakePolicy: string;
        rewardPerBlock: string;
        creationStake: string;
    };
    /**
     * Lookup572: pallet_working_group::types::JobApplication<sp_core::crypto::AccountId32, MemberId>
     **/
    PalletWorkingGroupJobApplication: {
        roleAccountId: string;
        rewardAccountId: string;
        stakingAccountId: string;
        memberId: string;
        descriptionHash: string;
        openingId: string;
    };
    /**
     * Lookup573: pallet_working_group::types::GroupWorker<sp_core::crypto::AccountId32, MemberId, BlockNumber, Balance>
     **/
    PalletWorkingGroupGroupWorker: {
        memberId: string;
        roleAccountId: string;
        stakingAccountId: string;
        rewardAccountId: string;
        startedLeavingAt: string;
        jobUnstakingPeriod: string;
        rewardPerBlock: string;
        missedReward: string;
        createdAt: string;
    };
    /**
     * Lookup574: pallet_working_group::errors::Error<T, I>
     **/
    PalletWorkingGroupErrorsError: {
        _enum: string[];
    };
    /**
     * Lookup584: sp_runtime::MultiSignature
     **/
    SpRuntimeMultiSignature: {
        _enum: {
            Ed25519: string;
            Sr25519: string;
            Ecdsa: string;
        };
    };
    /**
     * Lookup585: sp_core::ecdsa::Signature
     **/
    SpCoreEcdsaSignature: string;
    /**
     * Lookup588: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
     **/
    FrameSystemExtensionsCheckNonZeroSender: string;
    /**
     * Lookup589: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
     **/
    FrameSystemExtensionsCheckSpecVersion: string;
    /**
     * Lookup590: frame_system::extensions::check_tx_version::CheckTxVersion<T>
     **/
    FrameSystemExtensionsCheckTxVersion: string;
    /**
     * Lookup591: frame_system::extensions::check_genesis::CheckGenesis<T>
     **/
    FrameSystemExtensionsCheckGenesis: string;
    /**
     * Lookup594: frame_system::extensions::check_nonce::CheckNonce<T>
     **/
    FrameSystemExtensionsCheckNonce: string;
    /**
     * Lookup595: frame_system::extensions::check_weight::CheckWeight<T>
     **/
    FrameSystemExtensionsCheckWeight: string;
    /**
     * Lookup596: pallet_transaction_payment::ChargeTransactionPayment<T>
     **/
    PalletTransactionPaymentChargeTransactionPayment: string;
    /**
     * Lookup597: joystream_node_runtime::Runtime
     **/
    JoystreamNodeRuntimeRuntime: string;
};
export default _default;
