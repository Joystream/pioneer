import { Long } from 'long'
import * as $protobuf from "protobufjs";
/** Properties of a BountyMetadata. */
export interface IBountyMetadata {

    /** BountyMetadata title */
    title?: (string|null);

    /** BountyMetadata description */
    description?: (string|null);

    /** BountyMetadata discussionThread */
    discussionThread?: (Long|null);

    /** BountyMetadata bannerImageUri */
    bannerImageUri?: (string|null);
}

/** Represents a BountyMetadata. */
export class BountyMetadata implements IBountyMetadata {

    /**
     * Constructs a new BountyMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBountyMetadata);

    /** BountyMetadata title. */
    public title: string;

    /** BountyMetadata description. */
    public description: string;

    /** BountyMetadata discussionThread. */
    public discussionThread: Long;

    /** BountyMetadata bannerImageUri. */
    public bannerImageUri: string;

    /**
     * Creates a new BountyMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BountyMetadata instance
     */
    public static create(properties?: IBountyMetadata): BountyMetadata;

    /**
     * Encodes the specified BountyMetadata message. Does not implicitly {@link BountyMetadata.verify|verify} messages.
     * @param message BountyMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBountyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BountyMetadata message, length delimited. Does not implicitly {@link BountyMetadata.verify|verify} messages.
     * @param message BountyMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBountyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BountyMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BountyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BountyMetadata;

    /**
     * Decodes a BountyMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BountyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BountyMetadata;

    /**
     * Verifies a BountyMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BountyMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BountyMetadata
     */
    public static fromObject(object: { [k: string]: any }): BountyMetadata;

    /**
     * Creates a plain object from a BountyMetadata message. Also converts values to other types if specified.
     * @param message BountyMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BountyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BountyMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a BountyWorkData. */
export interface IBountyWorkData {

    /** BountyWorkData title */
    title?: (string|null);

    /** BountyWorkData description */
    description?: (string|null);
}

/** Represents a BountyWorkData. */
export class BountyWorkData implements IBountyWorkData {

    /**
     * Constructs a new BountyWorkData.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBountyWorkData);

    /** BountyWorkData title. */
    public title: string;

    /** BountyWorkData description. */
    public description: string;

    /**
     * Creates a new BountyWorkData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BountyWorkData instance
     */
    public static create(properties?: IBountyWorkData): BountyWorkData;

    /**
     * Encodes the specified BountyWorkData message. Does not implicitly {@link BountyWorkData.verify|verify} messages.
     * @param message BountyWorkData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBountyWorkData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BountyWorkData message, length delimited. Does not implicitly {@link BountyWorkData.verify|verify} messages.
     * @param message BountyWorkData message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBountyWorkData, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BountyWorkData message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BountyWorkData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BountyWorkData;

    /**
     * Decodes a BountyWorkData message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BountyWorkData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BountyWorkData;

    /**
     * Verifies a BountyWorkData message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BountyWorkData message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BountyWorkData
     */
    public static fromObject(object: { [k: string]: any }): BountyWorkData;

    /**
     * Creates a plain object from a BountyWorkData message. Also converts values to other types if specified.
     * @param message BountyWorkData
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BountyWorkData, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BountyWorkData to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChannelMetadata. */
export interface IChannelMetadata {

    /** ChannelMetadata title */
    title?: (string|null);

    /** ChannelMetadata description */
    description?: (string|null);

    /** ChannelMetadata isPublic */
    isPublic?: (boolean|null);

    /** ChannelMetadata language */
    language?: (string|null);

    /** ChannelMetadata coverPhoto */
    coverPhoto?: (number|null);

    /** ChannelMetadata avatarPhoto */
    avatarPhoto?: (number|null);
}

/** Represents a ChannelMetadata. */
export class ChannelMetadata implements IChannelMetadata {

    /**
     * Constructs a new ChannelMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChannelMetadata);

    /** ChannelMetadata title. */
    public title: string;

    /** ChannelMetadata description. */
    public description: string;

    /** ChannelMetadata isPublic. */
    public isPublic: boolean;

    /** ChannelMetadata language. */
    public language: string;

    /** ChannelMetadata coverPhoto. */
    public coverPhoto: number;

    /** ChannelMetadata avatarPhoto. */
    public avatarPhoto: number;

    /**
     * Creates a new ChannelMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChannelMetadata instance
     */
    public static create(properties?: IChannelMetadata): ChannelMetadata;

    /**
     * Encodes the specified ChannelMetadata message. Does not implicitly {@link ChannelMetadata.verify|verify} messages.
     * @param message ChannelMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChannelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChannelMetadata message, length delimited. Does not implicitly {@link ChannelMetadata.verify|verify} messages.
     * @param message ChannelMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChannelMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChannelMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChannelMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChannelMetadata;

    /**
     * Decodes a ChannelMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChannelMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChannelMetadata;

    /**
     * Verifies a ChannelMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChannelMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChannelMetadata
     */
    public static fromObject(object: { [k: string]: any }): ChannelMetadata;

    /**
     * Creates a plain object from a ChannelMetadata message. Also converts values to other types if specified.
     * @param message ChannelMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChannelMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChannelMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CouncilCandidacyNoteMetadata. */
export interface ICouncilCandidacyNoteMetadata {

    /** CouncilCandidacyNoteMetadata header */
    header?: (string|null);

    /** CouncilCandidacyNoteMetadata bulletPoints */
    bulletPoints?: (string[]|null);

    /** CouncilCandidacyNoteMetadata bannerImageUri */
    bannerImageUri?: (string|null);

    /** CouncilCandidacyNoteMetadata description */
    description?: (string|null);
}

/** Represents a CouncilCandidacyNoteMetadata. */
export class CouncilCandidacyNoteMetadata implements ICouncilCandidacyNoteMetadata {

    /**
     * Constructs a new CouncilCandidacyNoteMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICouncilCandidacyNoteMetadata);

    /** CouncilCandidacyNoteMetadata header. */
    public header: string;

    /** CouncilCandidacyNoteMetadata bulletPoints. */
    public bulletPoints: string[];

    /** CouncilCandidacyNoteMetadata bannerImageUri. */
    public bannerImageUri: string;

    /** CouncilCandidacyNoteMetadata description. */
    public description: string;

    /**
     * Creates a new CouncilCandidacyNoteMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CouncilCandidacyNoteMetadata instance
     */
    public static create(properties?: ICouncilCandidacyNoteMetadata): CouncilCandidacyNoteMetadata;

    /**
     * Encodes the specified CouncilCandidacyNoteMetadata message. Does not implicitly {@link CouncilCandidacyNoteMetadata.verify|verify} messages.
     * @param message CouncilCandidacyNoteMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICouncilCandidacyNoteMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CouncilCandidacyNoteMetadata message, length delimited. Does not implicitly {@link CouncilCandidacyNoteMetadata.verify|verify} messages.
     * @param message CouncilCandidacyNoteMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICouncilCandidacyNoteMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CouncilCandidacyNoteMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CouncilCandidacyNoteMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CouncilCandidacyNoteMetadata;

    /**
     * Decodes a CouncilCandidacyNoteMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CouncilCandidacyNoteMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CouncilCandidacyNoteMetadata;

    /**
     * Verifies a CouncilCandidacyNoteMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CouncilCandidacyNoteMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CouncilCandidacyNoteMetadata
     */
    public static fromObject(object: { [k: string]: any }): CouncilCandidacyNoteMetadata;

    /**
     * Creates a plain object from a CouncilCandidacyNoteMetadata message. Also converts values to other types if specified.
     * @param message CouncilCandidacyNoteMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CouncilCandidacyNoteMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CouncilCandidacyNoteMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ForumPostReaction. */
export interface IForumPostReaction {
}

/** Represents a ForumPostReaction. */
export class ForumPostReaction implements IForumPostReaction {

    /**
     * Constructs a new ForumPostReaction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IForumPostReaction);

    /**
     * Creates a new ForumPostReaction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ForumPostReaction instance
     */
    public static create(properties?: IForumPostReaction): ForumPostReaction;

    /**
     * Encodes the specified ForumPostReaction message. Does not implicitly {@link ForumPostReaction.verify|verify} messages.
     * @param message ForumPostReaction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IForumPostReaction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ForumPostReaction message, length delimited. Does not implicitly {@link ForumPostReaction.verify|verify} messages.
     * @param message ForumPostReaction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IForumPostReaction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ForumPostReaction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ForumPostReaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ForumPostReaction;

    /**
     * Decodes a ForumPostReaction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ForumPostReaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ForumPostReaction;

    /**
     * Verifies a ForumPostReaction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ForumPostReaction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ForumPostReaction
     */
    public static fromObject(object: { [k: string]: any }): ForumPostReaction;

    /**
     * Creates a plain object from a ForumPostReaction message. Also converts values to other types if specified.
     * @param message ForumPostReaction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ForumPostReaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ForumPostReaction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ForumPostReaction {

    /** Reaction enum. */
    enum Reaction {
        CANCEL = 0,
        LIKE = 1
    }
}

/** Properties of a ForumPostMetadata. */
export interface IForumPostMetadata {

    /** ForumPostMetadata text */
    text?: (string|null);

    /** ForumPostMetadata repliesTo */
    repliesTo?: (number|null);
}

/** Represents a ForumPostMetadata. */
export class ForumPostMetadata implements IForumPostMetadata {

    /**
     * Constructs a new ForumPostMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IForumPostMetadata);

    /** ForumPostMetadata text. */
    public text: string;

    /** ForumPostMetadata repliesTo. */
    public repliesTo: number;

    /**
     * Creates a new ForumPostMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ForumPostMetadata instance
     */
    public static create(properties?: IForumPostMetadata): ForumPostMetadata;

    /**
     * Encodes the specified ForumPostMetadata message. Does not implicitly {@link ForumPostMetadata.verify|verify} messages.
     * @param message ForumPostMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IForumPostMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ForumPostMetadata message, length delimited. Does not implicitly {@link ForumPostMetadata.verify|verify} messages.
     * @param message ForumPostMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IForumPostMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ForumPostMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ForumPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ForumPostMetadata;

    /**
     * Decodes a ForumPostMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ForumPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ForumPostMetadata;

    /**
     * Verifies a ForumPostMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ForumPostMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ForumPostMetadata
     */
    public static fromObject(object: { [k: string]: any }): ForumPostMetadata;

    /**
     * Creates a plain object from a ForumPostMetadata message. Also converts values to other types if specified.
     * @param message ForumPostMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ForumPostMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ForumPostMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ForumThreadMetadata. */
export interface IForumThreadMetadata {

    /** ForumThreadMetadata title */
    title?: (string|null);

    /** ForumThreadMetadata tags */
    tags?: (string[]|null);
}

/** Represents a ForumThreadMetadata. */
export class ForumThreadMetadata implements IForumThreadMetadata {

    /**
     * Constructs a new ForumThreadMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IForumThreadMetadata);

    /** ForumThreadMetadata title. */
    public title: string;

    /** ForumThreadMetadata tags. */
    public tags: string[];

    /**
     * Creates a new ForumThreadMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ForumThreadMetadata instance
     */
    public static create(properties?: IForumThreadMetadata): ForumThreadMetadata;

    /**
     * Encodes the specified ForumThreadMetadata message. Does not implicitly {@link ForumThreadMetadata.verify|verify} messages.
     * @param message ForumThreadMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IForumThreadMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ForumThreadMetadata message, length delimited. Does not implicitly {@link ForumThreadMetadata.verify|verify} messages.
     * @param message ForumThreadMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IForumThreadMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ForumThreadMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ForumThreadMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ForumThreadMetadata;

    /**
     * Decodes a ForumThreadMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ForumThreadMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ForumThreadMetadata;

    /**
     * Verifies a ForumThreadMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ForumThreadMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ForumThreadMetadata
     */
    public static fromObject(object: { [k: string]: any }): ForumThreadMetadata;

    /**
     * Creates a plain object from a ForumThreadMetadata message. Also converts values to other types if specified.
     * @param message ForumThreadMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ForumThreadMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ForumThreadMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MembershipMetadata. */
export interface IMembershipMetadata {

    /** MembershipMetadata name */
    name?: (string|null);

    /** MembershipMetadata avatarObject */
    avatarObject?: (number|null);

    /** MembershipMetadata avatarUri */
    avatarUri?: (string|null);

    /** MembershipMetadata about */
    about?: (string|null);

    /** MembershipMetadata externalResources */
    externalResources?: (MembershipMetadata.IExternalResource[]|null);
}

/** Represents a MembershipMetadata. */
export class MembershipMetadata implements IMembershipMetadata {

    /**
     * Constructs a new MembershipMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMembershipMetadata);

    /** MembershipMetadata name. */
    public name: string;

    /** MembershipMetadata avatarObject. */
    public avatarObject?: (number|null);

    /** MembershipMetadata avatarUri. */
    public avatarUri?: (string|null);

    /** MembershipMetadata about. */
    public about: string;

    /** MembershipMetadata externalResources. */
    public externalResources: MembershipMetadata.IExternalResource[];

    /** MembershipMetadata avatar. */
    public avatar?: ("avatarObject"|"avatarUri");

    /**
     * Creates a new MembershipMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MembershipMetadata instance
     */
    public static create(properties?: IMembershipMetadata): MembershipMetadata;

    /**
     * Encodes the specified MembershipMetadata message. Does not implicitly {@link MembershipMetadata.verify|verify} messages.
     * @param message MembershipMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMembershipMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MembershipMetadata message, length delimited. Does not implicitly {@link MembershipMetadata.verify|verify} messages.
     * @param message MembershipMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMembershipMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MembershipMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MembershipMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MembershipMetadata;

    /**
     * Decodes a MembershipMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MembershipMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MembershipMetadata;

    /**
     * Verifies a MembershipMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MembershipMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MembershipMetadata
     */
    public static fromObject(object: { [k: string]: any }): MembershipMetadata;

    /**
     * Creates a plain object from a MembershipMetadata message. Also converts values to other types if specified.
     * @param message MembershipMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MembershipMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MembershipMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace MembershipMetadata {

    /** Properties of an ExternalResource. */
    interface IExternalResource {

        /** ExternalResource type */
        type?: (MembershipMetadata.ExternalResource.ResourceType|null);

        /** ExternalResource value */
        value?: (string|null);
    }

    /** Represents an ExternalResource. */
    class ExternalResource implements IExternalResource {

        /**
         * Constructs a new ExternalResource.
         * @param [properties] Properties to set
         */
        constructor(properties?: MembershipMetadata.IExternalResource);

        /** ExternalResource type. */
        public type: MembershipMetadata.ExternalResource.ResourceType;

        /** ExternalResource value. */
        public value: string;

        /**
         * Creates a new ExternalResource instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExternalResource instance
         */
        public static create(properties?: MembershipMetadata.IExternalResource): MembershipMetadata.ExternalResource;

        /**
         * Encodes the specified ExternalResource message. Does not implicitly {@link MembershipMetadata.ExternalResource.verify|verify} messages.
         * @param message ExternalResource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: MembershipMetadata.IExternalResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExternalResource message, length delimited. Does not implicitly {@link MembershipMetadata.ExternalResource.verify|verify} messages.
         * @param message ExternalResource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: MembershipMetadata.IExternalResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExternalResource message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExternalResource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MembershipMetadata.ExternalResource;

        /**
         * Decodes an ExternalResource message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExternalResource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MembershipMetadata.ExternalResource;

        /**
         * Verifies an ExternalResource message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExternalResource message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExternalResource
         */
        public static fromObject(object: { [k: string]: any }): MembershipMetadata.ExternalResource;

        /**
         * Creates a plain object from an ExternalResource message. Also converts values to other types if specified.
         * @param message ExternalResource
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: MembershipMetadata.ExternalResource, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExternalResource to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ExternalResource {

        /** ResourceType enum. */
        enum ResourceType {
            EMAIL = 0,
            HYPERLINK = 1,
            TWITTER = 2,
            TELEGRAM = 3,
            DISCORD = 4,
            FACEBOOK = 5,
            YOUTUBE = 6,
            MATRIX = 7,
            IRC = 8,
            WECHAT = 9,
            WHATSAPP = 10
        }
    }
}

/** Properties of a ReactVideo. */
export interface IReactVideo {

    /** ReactVideo videoId */
    videoId: Long;

    /** ReactVideo reaction */
    reaction: ReactVideo.Reaction;
}

/** Represents a ReactVideo. */
export class ReactVideo implements IReactVideo {

    /**
     * Constructs a new ReactVideo.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReactVideo);

    /** ReactVideo videoId. */
    public videoId: Long;

    /** ReactVideo reaction. */
    public reaction: ReactVideo.Reaction;

    /**
     * Creates a new ReactVideo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReactVideo instance
     */
    public static create(properties?: IReactVideo): ReactVideo;

    /**
     * Encodes the specified ReactVideo message. Does not implicitly {@link ReactVideo.verify|verify} messages.
     * @param message ReactVideo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReactVideo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ReactVideo message, length delimited. Does not implicitly {@link ReactVideo.verify|verify} messages.
     * @param message ReactVideo message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReactVideo, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ReactVideo message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReactVideo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ReactVideo;

    /**
     * Decodes a ReactVideo message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReactVideo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ReactVideo;

    /**
     * Verifies a ReactVideo message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ReactVideo message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReactVideo
     */
    public static fromObject(object: { [k: string]: any }): ReactVideo;

    /**
     * Creates a plain object from a ReactVideo message. Also converts values to other types if specified.
     * @param message ReactVideo
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ReactVideo, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ReactVideo to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace ReactVideo {

    /** Reaction enum. */
    enum Reaction {
        LIKE = 0,
        UNLIKE = 1
    }
}

/** Properties of a ReactComment. */
export interface IReactComment {

    /** ReactComment commentId */
    commentId: string;

    /** ReactComment reactionId */
    reactionId: number;
}

/** Represents a ReactComment. */
export class ReactComment implements IReactComment {

    /**
     * Constructs a new ReactComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: IReactComment);

    /** ReactComment commentId. */
    public commentId: string;

    /** ReactComment reactionId. */
    public reactionId: number;

    /**
     * Creates a new ReactComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReactComment instance
     */
    public static create(properties?: IReactComment): ReactComment;

    /**
     * Encodes the specified ReactComment message. Does not implicitly {@link ReactComment.verify|verify} messages.
     * @param message ReactComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IReactComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ReactComment message, length delimited. Does not implicitly {@link ReactComment.verify|verify} messages.
     * @param message ReactComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IReactComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ReactComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReactComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ReactComment;

    /**
     * Decodes a ReactComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReactComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ReactComment;

    /**
     * Verifies a ReactComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ReactComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReactComment
     */
    public static fromObject(object: { [k: string]: any }): ReactComment;

    /**
     * Creates a plain object from a ReactComment message. Also converts values to other types if specified.
     * @param message ReactComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ReactComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ReactComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateComment. */
export interface ICreateComment {

    /** CreateComment videoId */
    videoId: Long;

    /** CreateComment parentCommentId */
    parentCommentId?: (string|null);

    /** CreateComment body */
    body: string;
}

/** Represents a CreateComment. */
export class CreateComment implements ICreateComment {

    /**
     * Constructs a new CreateComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateComment);

    /** CreateComment videoId. */
    public videoId: Long;

    /** CreateComment parentCommentId. */
    public parentCommentId: string;

    /** CreateComment body. */
    public body: string;

    /**
     * Creates a new CreateComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateComment instance
     */
    public static create(properties?: ICreateComment): CreateComment;

    /**
     * Encodes the specified CreateComment message. Does not implicitly {@link CreateComment.verify|verify} messages.
     * @param message CreateComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateComment message, length delimited. Does not implicitly {@link CreateComment.verify|verify} messages.
     * @param message CreateComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateComment;

    /**
     * Decodes a CreateComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateComment;

    /**
     * Verifies a CreateComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateComment
     */
    public static fromObject(object: { [k: string]: any }): CreateComment;

    /**
     * Creates a plain object from a CreateComment message. Also converts values to other types if specified.
     * @param message CreateComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an EditComment. */
export interface IEditComment {

    /** EditComment commentId */
    commentId: string;

    /** EditComment newBody */
    newBody: string;
}

/** Represents an EditComment. */
export class EditComment implements IEditComment {

    /**
     * Constructs a new EditComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: IEditComment);

    /** EditComment commentId. */
    public commentId: string;

    /** EditComment newBody. */
    public newBody: string;

    /**
     * Creates a new EditComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns EditComment instance
     */
    public static create(properties?: IEditComment): EditComment;

    /**
     * Encodes the specified EditComment message. Does not implicitly {@link EditComment.verify|verify} messages.
     * @param message EditComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IEditComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified EditComment message, length delimited. Does not implicitly {@link EditComment.verify|verify} messages.
     * @param message EditComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IEditComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an EditComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns EditComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): EditComment;

    /**
     * Decodes an EditComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns EditComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): EditComment;

    /**
     * Verifies an EditComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an EditComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns EditComment
     */
    public static fromObject(object: { [k: string]: any }): EditComment;

    /**
     * Creates a plain object from an EditComment message. Also converts values to other types if specified.
     * @param message EditComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: EditComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this EditComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DeleteComment. */
export interface IDeleteComment {

    /** DeleteComment commentId */
    commentId: string;
}

/** Represents a DeleteComment. */
export class DeleteComment implements IDeleteComment {

    /**
     * Constructs a new DeleteComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDeleteComment);

    /** DeleteComment commentId. */
    public commentId: string;

    /**
     * Creates a new DeleteComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeleteComment instance
     */
    public static create(properties?: IDeleteComment): DeleteComment;

    /**
     * Encodes the specified DeleteComment message. Does not implicitly {@link DeleteComment.verify|verify} messages.
     * @param message DeleteComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDeleteComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DeleteComment message, length delimited. Does not implicitly {@link DeleteComment.verify|verify} messages.
     * @param message DeleteComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDeleteComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DeleteComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeleteComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DeleteComment;

    /**
     * Decodes a DeleteComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeleteComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DeleteComment;

    /**
     * Verifies a DeleteComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DeleteComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeleteComment
     */
    public static fromObject(object: { [k: string]: any }): DeleteComment;

    /**
     * Creates a plain object from a DeleteComment message. Also converts values to other types if specified.
     * @param message DeleteComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DeleteComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DeleteComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PinOrUnpinComment. */
export interface IPinOrUnpinComment {

    /** PinOrUnpinComment videoId */
    videoId: Long;

    /** PinOrUnpinComment commentId */
    commentId: string;

    /** PinOrUnpinComment option */
    option: PinOrUnpinComment.Option;
}

/** Represents a PinOrUnpinComment. */
export class PinOrUnpinComment implements IPinOrUnpinComment {

    /**
     * Constructs a new PinOrUnpinComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPinOrUnpinComment);

    /** PinOrUnpinComment videoId. */
    public videoId: Long;

    /** PinOrUnpinComment commentId. */
    public commentId: string;

    /** PinOrUnpinComment option. */
    public option: PinOrUnpinComment.Option;

    /**
     * Creates a new PinOrUnpinComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PinOrUnpinComment instance
     */
    public static create(properties?: IPinOrUnpinComment): PinOrUnpinComment;

    /**
     * Encodes the specified PinOrUnpinComment message. Does not implicitly {@link PinOrUnpinComment.verify|verify} messages.
     * @param message PinOrUnpinComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPinOrUnpinComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PinOrUnpinComment message, length delimited. Does not implicitly {@link PinOrUnpinComment.verify|verify} messages.
     * @param message PinOrUnpinComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPinOrUnpinComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PinOrUnpinComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PinOrUnpinComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PinOrUnpinComment;

    /**
     * Decodes a PinOrUnpinComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PinOrUnpinComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PinOrUnpinComment;

    /**
     * Verifies a PinOrUnpinComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PinOrUnpinComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PinOrUnpinComment
     */
    public static fromObject(object: { [k: string]: any }): PinOrUnpinComment;

    /**
     * Creates a plain object from a PinOrUnpinComment message. Also converts values to other types if specified.
     * @param message PinOrUnpinComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PinOrUnpinComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PinOrUnpinComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace PinOrUnpinComment {

    /** Option enum. */
    enum Option {
        PIN = 0,
        UNPIN = 1
    }
}

/** Properties of a ModerateComment. */
export interface IModerateComment {

    /** ModerateComment commentId */
    commentId: string;

    /** ModerateComment rationale */
    rationale: string;
}

/** Represents a ModerateComment. */
export class ModerateComment implements IModerateComment {

    /**
     * Constructs a new ModerateComment.
     * @param [properties] Properties to set
     */
    constructor(properties?: IModerateComment);

    /** ModerateComment commentId. */
    public commentId: string;

    /** ModerateComment rationale. */
    public rationale: string;

    /**
     * Creates a new ModerateComment instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ModerateComment instance
     */
    public static create(properties?: IModerateComment): ModerateComment;

    /**
     * Encodes the specified ModerateComment message. Does not implicitly {@link ModerateComment.verify|verify} messages.
     * @param message ModerateComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IModerateComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ModerateComment message, length delimited. Does not implicitly {@link ModerateComment.verify|verify} messages.
     * @param message ModerateComment message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IModerateComment, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ModerateComment message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ModerateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ModerateComment;

    /**
     * Decodes a ModerateComment message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ModerateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ModerateComment;

    /**
     * Verifies a ModerateComment message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ModerateComment message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ModerateComment
     */
    public static fromObject(object: { [k: string]: any }): ModerateComment;

    /**
     * Creates a plain object from a ModerateComment message. Also converts values to other types if specified.
     * @param message ModerateComment
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ModerateComment, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ModerateComment to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a BanOrUnbanMemberFromChannel. */
export interface IBanOrUnbanMemberFromChannel {

    /** BanOrUnbanMemberFromChannel memberId */
    memberId: Long;

    /** BanOrUnbanMemberFromChannel option */
    option: BanOrUnbanMemberFromChannel.Option;
}

/** Represents a BanOrUnbanMemberFromChannel. */
export class BanOrUnbanMemberFromChannel implements IBanOrUnbanMemberFromChannel {

    /**
     * Constructs a new BanOrUnbanMemberFromChannel.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBanOrUnbanMemberFromChannel);

    /** BanOrUnbanMemberFromChannel memberId. */
    public memberId: Long;

    /** BanOrUnbanMemberFromChannel option. */
    public option: BanOrUnbanMemberFromChannel.Option;

    /**
     * Creates a new BanOrUnbanMemberFromChannel instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BanOrUnbanMemberFromChannel instance
     */
    public static create(properties?: IBanOrUnbanMemberFromChannel): BanOrUnbanMemberFromChannel;

    /**
     * Encodes the specified BanOrUnbanMemberFromChannel message. Does not implicitly {@link BanOrUnbanMemberFromChannel.verify|verify} messages.
     * @param message BanOrUnbanMemberFromChannel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBanOrUnbanMemberFromChannel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BanOrUnbanMemberFromChannel message, length delimited. Does not implicitly {@link BanOrUnbanMemberFromChannel.verify|verify} messages.
     * @param message BanOrUnbanMemberFromChannel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBanOrUnbanMemberFromChannel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BanOrUnbanMemberFromChannel message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BanOrUnbanMemberFromChannel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BanOrUnbanMemberFromChannel;

    /**
     * Decodes a BanOrUnbanMemberFromChannel message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BanOrUnbanMemberFromChannel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BanOrUnbanMemberFromChannel;

    /**
     * Verifies a BanOrUnbanMemberFromChannel message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BanOrUnbanMemberFromChannel message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BanOrUnbanMemberFromChannel
     */
    public static fromObject(object: { [k: string]: any }): BanOrUnbanMemberFromChannel;

    /**
     * Creates a plain object from a BanOrUnbanMemberFromChannel message. Also converts values to other types if specified.
     * @param message BanOrUnbanMemberFromChannel
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BanOrUnbanMemberFromChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BanOrUnbanMemberFromChannel to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace BanOrUnbanMemberFromChannel {

    /** Option enum. */
    enum Option {
        BAN = 0,
        UNBAN = 1
    }
}

/** Properties of a VideoReactionsPreference. */
export interface IVideoReactionsPreference {

    /** VideoReactionsPreference videoId */
    videoId: Long;

    /** VideoReactionsPreference option */
    option: VideoReactionsPreference.Option;
}

/** Represents a VideoReactionsPreference. */
export class VideoReactionsPreference implements IVideoReactionsPreference {

    /**
     * Constructs a new VideoReactionsPreference.
     * @param [properties] Properties to set
     */
    constructor(properties?: IVideoReactionsPreference);

    /** VideoReactionsPreference videoId. */
    public videoId: Long;

    /** VideoReactionsPreference option. */
    public option: VideoReactionsPreference.Option;

    /**
     * Creates a new VideoReactionsPreference instance using the specified properties.
     * @param [properties] Properties to set
     * @returns VideoReactionsPreference instance
     */
    public static create(properties?: IVideoReactionsPreference): VideoReactionsPreference;

    /**
     * Encodes the specified VideoReactionsPreference message. Does not implicitly {@link VideoReactionsPreference.verify|verify} messages.
     * @param message VideoReactionsPreference message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IVideoReactionsPreference, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified VideoReactionsPreference message, length delimited. Does not implicitly {@link VideoReactionsPreference.verify|verify} messages.
     * @param message VideoReactionsPreference message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IVideoReactionsPreference, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a VideoReactionsPreference message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns VideoReactionsPreference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoReactionsPreference;

    /**
     * Decodes a VideoReactionsPreference message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns VideoReactionsPreference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoReactionsPreference;

    /**
     * Verifies a VideoReactionsPreference message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a VideoReactionsPreference message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns VideoReactionsPreference
     */
    public static fromObject(object: { [k: string]: any }): VideoReactionsPreference;

    /**
     * Creates a plain object from a VideoReactionsPreference message. Also converts values to other types if specified.
     * @param message VideoReactionsPreference
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: VideoReactionsPreference, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this VideoReactionsPreference to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace VideoReactionsPreference {

    /** Option enum. */
    enum Option {
        ENABLE = 0,
        DISABLE = 1
    }
}

/** Properties of a CreateVideoCategory. */
export interface ICreateVideoCategory {

    /** CreateVideoCategory name */
    name: string;

    /** CreateVideoCategory description */
    description?: (string|null);

    /** CreateVideoCategory parentCategoryId */
    parentCategoryId?: (string|null);
}

/** Represents a CreateVideoCategory. */
export class CreateVideoCategory implements ICreateVideoCategory {

    /**
     * Constructs a new CreateVideoCategory.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateVideoCategory);

    /** CreateVideoCategory name. */
    public name: string;

    /** CreateVideoCategory description. */
    public description: string;

    /** CreateVideoCategory parentCategoryId. */
    public parentCategoryId: string;

    /**
     * Creates a new CreateVideoCategory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateVideoCategory instance
     */
    public static create(properties?: ICreateVideoCategory): CreateVideoCategory;

    /**
     * Encodes the specified CreateVideoCategory message. Does not implicitly {@link CreateVideoCategory.verify|verify} messages.
     * @param message CreateVideoCategory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateVideoCategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateVideoCategory message, length delimited. Does not implicitly {@link CreateVideoCategory.verify|verify} messages.
     * @param message CreateVideoCategory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateVideoCategory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateVideoCategory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateVideoCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateVideoCategory;

    /**
     * Decodes a CreateVideoCategory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateVideoCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateVideoCategory;

    /**
     * Verifies a CreateVideoCategory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateVideoCategory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateVideoCategory
     */
    public static fromObject(object: { [k: string]: any }): CreateVideoCategory;

    /**
     * Creates a plain object from a CreateVideoCategory message. Also converts values to other types if specified.
     * @param message CreateVideoCategory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateVideoCategory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateVideoCategory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MemberRemarked. */
export interface IMemberRemarked {

    /** MemberRemarked reactVideo */
    reactVideo?: (IReactVideo|null);

    /** MemberRemarked reactComment */
    reactComment?: (IReactComment|null);

    /** MemberRemarked createComment */
    createComment?: (ICreateComment|null);

    /** MemberRemarked editComment */
    editComment?: (IEditComment|null);

    /** MemberRemarked deleteComment */
    deleteComment?: (IDeleteComment|null);

    /** MemberRemarked createVideoCategory */
    createVideoCategory?: (ICreateVideoCategory|null);
}

/** Represents a MemberRemarked. */
export class MemberRemarked implements IMemberRemarked {

    /**
     * Constructs a new MemberRemarked.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMemberRemarked);

    /** MemberRemarked reactVideo. */
    public reactVideo?: (IReactVideo|null);

    /** MemberRemarked reactComment. */
    public reactComment?: (IReactComment|null);

    /** MemberRemarked createComment. */
    public createComment?: (ICreateComment|null);

    /** MemberRemarked editComment. */
    public editComment?: (IEditComment|null);

    /** MemberRemarked deleteComment. */
    public deleteComment?: (IDeleteComment|null);

    /** MemberRemarked createVideoCategory. */
    public createVideoCategory?: (ICreateVideoCategory|null);

    /** MemberRemarked memberRemarked. */
    public memberRemarked?: ("reactVideo"|"reactComment"|"createComment"|"editComment"|"deleteComment"|"createVideoCategory");

    /**
     * Creates a new MemberRemarked instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MemberRemarked instance
     */
    public static create(properties?: IMemberRemarked): MemberRemarked;

    /**
     * Encodes the specified MemberRemarked message. Does not implicitly {@link MemberRemarked.verify|verify} messages.
     * @param message MemberRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMemberRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MemberRemarked message, length delimited. Does not implicitly {@link MemberRemarked.verify|verify} messages.
     * @param message MemberRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMemberRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MemberRemarked message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MemberRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MemberRemarked;

    /**
     * Decodes a MemberRemarked message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MemberRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MemberRemarked;

    /**
     * Verifies a MemberRemarked message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MemberRemarked message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MemberRemarked
     */
    public static fromObject(object: { [k: string]: any }): MemberRemarked;

    /**
     * Creates a plain object from a MemberRemarked message. Also converts values to other types if specified.
     * @param message MemberRemarked
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MemberRemarked, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MemberRemarked to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChannelModeratorRemarked. */
export interface IChannelModeratorRemarked {

    /** ChannelModeratorRemarked moderateComment */
    moderateComment?: (IModerateComment|null);
}

/** Represents a ChannelModeratorRemarked. */
export class ChannelModeratorRemarked implements IChannelModeratorRemarked {

    /**
     * Constructs a new ChannelModeratorRemarked.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChannelModeratorRemarked);

    /** ChannelModeratorRemarked moderateComment. */
    public moderateComment?: (IModerateComment|null);

    /** ChannelModeratorRemarked channelModeratorRemarked. */
    public channelModeratorRemarked?: "moderateComment";

    /**
     * Creates a new ChannelModeratorRemarked instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChannelModeratorRemarked instance
     */
    public static create(properties?: IChannelModeratorRemarked): ChannelModeratorRemarked;

    /**
     * Encodes the specified ChannelModeratorRemarked message. Does not implicitly {@link ChannelModeratorRemarked.verify|verify} messages.
     * @param message ChannelModeratorRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChannelModeratorRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChannelModeratorRemarked message, length delimited. Does not implicitly {@link ChannelModeratorRemarked.verify|verify} messages.
     * @param message ChannelModeratorRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChannelModeratorRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChannelModeratorRemarked message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChannelModeratorRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChannelModeratorRemarked;

    /**
     * Decodes a ChannelModeratorRemarked message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChannelModeratorRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChannelModeratorRemarked;

    /**
     * Verifies a ChannelModeratorRemarked message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChannelModeratorRemarked message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChannelModeratorRemarked
     */
    public static fromObject(object: { [k: string]: any }): ChannelModeratorRemarked;

    /**
     * Creates a plain object from a ChannelModeratorRemarked message. Also converts values to other types if specified.
     * @param message ChannelModeratorRemarked
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChannelModeratorRemarked, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChannelModeratorRemarked to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ChannelOwnerRemarked. */
export interface IChannelOwnerRemarked {

    /** ChannelOwnerRemarked pinOrUnpinComment */
    pinOrUnpinComment?: (IPinOrUnpinComment|null);

    /** ChannelOwnerRemarked banOrUnbanMemberFromChannel */
    banOrUnbanMemberFromChannel?: (IBanOrUnbanMemberFromChannel|null);

    /** ChannelOwnerRemarked videoReactionsPreference */
    videoReactionsPreference?: (IVideoReactionsPreference|null);

    /** ChannelOwnerRemarked moderateComment */
    moderateComment?: (IModerateComment|null);
}

/** Represents a ChannelOwnerRemarked. */
export class ChannelOwnerRemarked implements IChannelOwnerRemarked {

    /**
     * Constructs a new ChannelOwnerRemarked.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChannelOwnerRemarked);

    /** ChannelOwnerRemarked pinOrUnpinComment. */
    public pinOrUnpinComment?: (IPinOrUnpinComment|null);

    /** ChannelOwnerRemarked banOrUnbanMemberFromChannel. */
    public banOrUnbanMemberFromChannel?: (IBanOrUnbanMemberFromChannel|null);

    /** ChannelOwnerRemarked videoReactionsPreference. */
    public videoReactionsPreference?: (IVideoReactionsPreference|null);

    /** ChannelOwnerRemarked moderateComment. */
    public moderateComment?: (IModerateComment|null);

    /** ChannelOwnerRemarked channelOwnerRemarked. */
    public channelOwnerRemarked?: ("pinOrUnpinComment"|"banOrUnbanMemberFromChannel"|"videoReactionsPreference"|"moderateComment");

    /**
     * Creates a new ChannelOwnerRemarked instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChannelOwnerRemarked instance
     */
    public static create(properties?: IChannelOwnerRemarked): ChannelOwnerRemarked;

    /**
     * Encodes the specified ChannelOwnerRemarked message. Does not implicitly {@link ChannelOwnerRemarked.verify|verify} messages.
     * @param message ChannelOwnerRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChannelOwnerRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChannelOwnerRemarked message, length delimited. Does not implicitly {@link ChannelOwnerRemarked.verify|verify} messages.
     * @param message ChannelOwnerRemarked message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChannelOwnerRemarked, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChannelOwnerRemarked message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChannelOwnerRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChannelOwnerRemarked;

    /**
     * Decodes a ChannelOwnerRemarked message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChannelOwnerRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChannelOwnerRemarked;

    /**
     * Verifies a ChannelOwnerRemarked message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChannelOwnerRemarked message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChannelOwnerRemarked
     */
    public static fromObject(object: { [k: string]: any }): ChannelOwnerRemarked;

    /**
     * Creates a plain object from a ChannelOwnerRemarked message. Also converts values to other types if specified.
     * @param message ChannelOwnerRemarked
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChannelOwnerRemarked, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChannelOwnerRemarked to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PersonMetadata. */
export interface IPersonMetadata {

    /** PersonMetadata firstName */
    firstName?: (string|null);

    /** PersonMetadata middleName */
    middleName?: (string|null);

    /** PersonMetadata lastName */
    lastName?: (string|null);

    /** PersonMetadata about */
    about?: (string|null);

    /** PersonMetadata coverPhoto */
    coverPhoto?: (number|null);

    /** PersonMetadata avatarPhoto */
    avatarPhoto?: (number|null);
}

/** Represents a PersonMetadata. */
export class PersonMetadata implements IPersonMetadata {

    /**
     * Constructs a new PersonMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPersonMetadata);

    /** PersonMetadata firstName. */
    public firstName: string;

    /** PersonMetadata middleName. */
    public middleName: string;

    /** PersonMetadata lastName. */
    public lastName: string;

    /** PersonMetadata about. */
    public about: string;

    /** PersonMetadata coverPhoto. */
    public coverPhoto: number;

    /** PersonMetadata avatarPhoto. */
    public avatarPhoto: number;

    /**
     * Creates a new PersonMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PersonMetadata instance
     */
    public static create(properties?: IPersonMetadata): PersonMetadata;

    /**
     * Encodes the specified PersonMetadata message. Does not implicitly {@link PersonMetadata.verify|verify} messages.
     * @param message PersonMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPersonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PersonMetadata message, length delimited. Does not implicitly {@link PersonMetadata.verify|verify} messages.
     * @param message PersonMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPersonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PersonMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PersonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PersonMetadata;

    /**
     * Decodes a PersonMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PersonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PersonMetadata;

    /**
     * Verifies a PersonMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PersonMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PersonMetadata
     */
    public static fromObject(object: { [k: string]: any }): PersonMetadata;

    /**
     * Creates a plain object from a PersonMetadata message. Also converts values to other types if specified.
     * @param message PersonMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PersonMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PersonMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ProposalsDiscussionPostMetadata. */
export interface IProposalsDiscussionPostMetadata {

    /** ProposalsDiscussionPostMetadata text */
    text?: (string|null);

    /** ProposalsDiscussionPostMetadata repliesTo */
    repliesTo?: (number|null);
}

/** Represents a ProposalsDiscussionPostMetadata. */
export class ProposalsDiscussionPostMetadata implements IProposalsDiscussionPostMetadata {

    /**
     * Constructs a new ProposalsDiscussionPostMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProposalsDiscussionPostMetadata);

    /** ProposalsDiscussionPostMetadata text. */
    public text: string;

    /** ProposalsDiscussionPostMetadata repliesTo. */
    public repliesTo: number;

    /**
     * Creates a new ProposalsDiscussionPostMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProposalsDiscussionPostMetadata instance
     */
    public static create(properties?: IProposalsDiscussionPostMetadata): ProposalsDiscussionPostMetadata;

    /**
     * Encodes the specified ProposalsDiscussionPostMetadata message. Does not implicitly {@link ProposalsDiscussionPostMetadata.verify|verify} messages.
     * @param message ProposalsDiscussionPostMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProposalsDiscussionPostMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ProposalsDiscussionPostMetadata message, length delimited. Does not implicitly {@link ProposalsDiscussionPostMetadata.verify|verify} messages.
     * @param message ProposalsDiscussionPostMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProposalsDiscussionPostMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ProposalsDiscussionPostMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProposalsDiscussionPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ProposalsDiscussionPostMetadata;

    /**
     * Decodes a ProposalsDiscussionPostMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProposalsDiscussionPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ProposalsDiscussionPostMetadata;

    /**
     * Verifies a ProposalsDiscussionPostMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ProposalsDiscussionPostMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProposalsDiscussionPostMetadata
     */
    public static fromObject(object: { [k: string]: any }): ProposalsDiscussionPostMetadata;

    /**
     * Creates a plain object from a ProposalsDiscussionPostMetadata message. Also converts values to other types if specified.
     * @param message ProposalsDiscussionPostMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ProposalsDiscussionPostMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ProposalsDiscussionPostMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SeriesMetadata. */
export interface ISeriesMetadata {

    /** SeriesMetadata title */
    title?: (string|null);

    /** SeriesMetadata description */
    description?: (string|null);

    /** SeriesMetadata coverPhoto */
    coverPhoto?: (number|null);

    /** SeriesMetadata persons */
    persons?: (Long[]|null);
}

/** Represents a SeriesMetadata. */
export class SeriesMetadata implements ISeriesMetadata {

    /**
     * Constructs a new SeriesMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISeriesMetadata);

    /** SeriesMetadata title. */
    public title: string;

    /** SeriesMetadata description. */
    public description: string;

    /** SeriesMetadata coverPhoto. */
    public coverPhoto: number;

    /** SeriesMetadata persons. */
    public persons: Long[];

    /**
     * Creates a new SeriesMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SeriesMetadata instance
     */
    public static create(properties?: ISeriesMetadata): SeriesMetadata;

    /**
     * Encodes the specified SeriesMetadata message. Does not implicitly {@link SeriesMetadata.verify|verify} messages.
     * @param message SeriesMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISeriesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SeriesMetadata message, length delimited. Does not implicitly {@link SeriesMetadata.verify|verify} messages.
     * @param message SeriesMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISeriesMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SeriesMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SeriesMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SeriesMetadata;

    /**
     * Decodes a SeriesMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SeriesMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SeriesMetadata;

    /**
     * Verifies a SeriesMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SeriesMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SeriesMetadata
     */
    public static fromObject(object: { [k: string]: any }): SeriesMetadata;

    /**
     * Creates a plain object from a SeriesMetadata message. Also converts values to other types if specified.
     * @param message SeriesMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SeriesMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SeriesMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SeasonMetadata. */
export interface ISeasonMetadata {

    /** SeasonMetadata title */
    title?: (string|null);

    /** SeasonMetadata description */
    description?: (string|null);

    /** SeasonMetadata coverPhoto */
    coverPhoto?: (number|null);

    /** SeasonMetadata persons */
    persons?: (Long[]|null);
}

/** Represents a SeasonMetadata. */
export class SeasonMetadata implements ISeasonMetadata {

    /**
     * Constructs a new SeasonMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISeasonMetadata);

    /** SeasonMetadata title. */
    public title: string;

    /** SeasonMetadata description. */
    public description: string;

    /** SeasonMetadata coverPhoto. */
    public coverPhoto: number;

    /** SeasonMetadata persons. */
    public persons: Long[];

    /**
     * Creates a new SeasonMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SeasonMetadata instance
     */
    public static create(properties?: ISeasonMetadata): SeasonMetadata;

    /**
     * Encodes the specified SeasonMetadata message. Does not implicitly {@link SeasonMetadata.verify|verify} messages.
     * @param message SeasonMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISeasonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SeasonMetadata message, length delimited. Does not implicitly {@link SeasonMetadata.verify|verify} messages.
     * @param message SeasonMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISeasonMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SeasonMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SeasonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SeasonMetadata;

    /**
     * Decodes a SeasonMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SeasonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SeasonMetadata;

    /**
     * Verifies a SeasonMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SeasonMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SeasonMetadata
     */
    public static fromObject(object: { [k: string]: any }): SeasonMetadata;

    /**
     * Creates a plain object from a SeasonMetadata message. Also converts values to other types if specified.
     * @param message SeasonMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SeasonMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SeasonMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GeoCoordiantes. */
export interface IGeoCoordiantes {

    /** GeoCoordiantes latitude */
    latitude?: (number|null);

    /** GeoCoordiantes longitude */
    longitude?: (number|null);
}

/** Represents a GeoCoordiantes. */
export class GeoCoordiantes implements IGeoCoordiantes {

    /**
     * Constructs a new GeoCoordiantes.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGeoCoordiantes);

    /** GeoCoordiantes latitude. */
    public latitude: number;

    /** GeoCoordiantes longitude. */
    public longitude: number;

    /**
     * Creates a new GeoCoordiantes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GeoCoordiantes instance
     */
    public static create(properties?: IGeoCoordiantes): GeoCoordiantes;

    /**
     * Encodes the specified GeoCoordiantes message. Does not implicitly {@link GeoCoordiantes.verify|verify} messages.
     * @param message GeoCoordiantes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGeoCoordiantes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GeoCoordiantes message, length delimited. Does not implicitly {@link GeoCoordiantes.verify|verify} messages.
     * @param message GeoCoordiantes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGeoCoordiantes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GeoCoordiantes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GeoCoordiantes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GeoCoordiantes;

    /**
     * Decodes a GeoCoordiantes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GeoCoordiantes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GeoCoordiantes;

    /**
     * Verifies a GeoCoordiantes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GeoCoordiantes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GeoCoordiantes
     */
    public static fromObject(object: { [k: string]: any }): GeoCoordiantes;

    /**
     * Creates a plain object from a GeoCoordiantes message. Also converts values to other types if specified.
     * @param message GeoCoordiantes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GeoCoordiantes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GeoCoordiantes to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a NodeLocationMetadata. */
export interface INodeLocationMetadata {

    /** NodeLocationMetadata countryCode */
    countryCode?: (string|null);

    /** NodeLocationMetadata city */
    city?: (string|null);

    /** NodeLocationMetadata coordinates */
    coordinates?: (IGeoCoordiantes|null);
}

/** Represents a NodeLocationMetadata. */
export class NodeLocationMetadata implements INodeLocationMetadata {

    /**
     * Constructs a new NodeLocationMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: INodeLocationMetadata);

    /** NodeLocationMetadata countryCode. */
    public countryCode: string;

    /** NodeLocationMetadata city. */
    public city: string;

    /** NodeLocationMetadata coordinates. */
    public coordinates?: (IGeoCoordiantes|null);

    /**
     * Creates a new NodeLocationMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns NodeLocationMetadata instance
     */
    public static create(properties?: INodeLocationMetadata): NodeLocationMetadata;

    /**
     * Encodes the specified NodeLocationMetadata message. Does not implicitly {@link NodeLocationMetadata.verify|verify} messages.
     * @param message NodeLocationMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: INodeLocationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified NodeLocationMetadata message, length delimited. Does not implicitly {@link NodeLocationMetadata.verify|verify} messages.
     * @param message NodeLocationMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: INodeLocationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a NodeLocationMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns NodeLocationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): NodeLocationMetadata;

    /**
     * Decodes a NodeLocationMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns NodeLocationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): NodeLocationMetadata;

    /**
     * Verifies a NodeLocationMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a NodeLocationMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns NodeLocationMetadata
     */
    public static fromObject(object: { [k: string]: any }): NodeLocationMetadata;

    /**
     * Creates a plain object from a NodeLocationMetadata message. Also converts values to other types if specified.
     * @param message NodeLocationMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: NodeLocationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this NodeLocationMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a StorageBucketOperatorMetadata. */
export interface IStorageBucketOperatorMetadata {

    /** StorageBucketOperatorMetadata endpoint */
    endpoint?: (string|null);

    /** StorageBucketOperatorMetadata location */
    location?: (INodeLocationMetadata|null);

    /** StorageBucketOperatorMetadata extra */
    extra?: (string|null);
}

/** Represents a StorageBucketOperatorMetadata. */
export class StorageBucketOperatorMetadata implements IStorageBucketOperatorMetadata {

    /**
     * Constructs a new StorageBucketOperatorMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IStorageBucketOperatorMetadata);

    /** StorageBucketOperatorMetadata endpoint. */
    public endpoint: string;

    /** StorageBucketOperatorMetadata location. */
    public location?: (INodeLocationMetadata|null);

    /** StorageBucketOperatorMetadata extra. */
    public extra: string;

    /**
     * Creates a new StorageBucketOperatorMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StorageBucketOperatorMetadata instance
     */
    public static create(properties?: IStorageBucketOperatorMetadata): StorageBucketOperatorMetadata;

    /**
     * Encodes the specified StorageBucketOperatorMetadata message. Does not implicitly {@link StorageBucketOperatorMetadata.verify|verify} messages.
     * @param message StorageBucketOperatorMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IStorageBucketOperatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified StorageBucketOperatorMetadata message, length delimited. Does not implicitly {@link StorageBucketOperatorMetadata.verify|verify} messages.
     * @param message StorageBucketOperatorMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IStorageBucketOperatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a StorageBucketOperatorMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StorageBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): StorageBucketOperatorMetadata;

    /**
     * Decodes a StorageBucketOperatorMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StorageBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): StorageBucketOperatorMetadata;

    /**
     * Verifies a StorageBucketOperatorMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a StorageBucketOperatorMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StorageBucketOperatorMetadata
     */
    public static fromObject(object: { [k: string]: any }): StorageBucketOperatorMetadata;

    /**
     * Creates a plain object from a StorageBucketOperatorMetadata message. Also converts values to other types if specified.
     * @param message StorageBucketOperatorMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: StorageBucketOperatorMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this StorageBucketOperatorMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a DistributionBucketOperatorMetadata. */
export interface IDistributionBucketOperatorMetadata {

    /** DistributionBucketOperatorMetadata endpoint */
    endpoint?: (string|null);

    /** DistributionBucketOperatorMetadata location */
    location?: (INodeLocationMetadata|null);

    /** DistributionBucketOperatorMetadata extra */
    extra?: (string|null);
}

/** Represents a DistributionBucketOperatorMetadata. */
export class DistributionBucketOperatorMetadata implements IDistributionBucketOperatorMetadata {

    /**
     * Constructs a new DistributionBucketOperatorMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDistributionBucketOperatorMetadata);

    /** DistributionBucketOperatorMetadata endpoint. */
    public endpoint: string;

    /** DistributionBucketOperatorMetadata location. */
    public location?: (INodeLocationMetadata|null);

    /** DistributionBucketOperatorMetadata extra. */
    public extra: string;

    /**
     * Creates a new DistributionBucketOperatorMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DistributionBucketOperatorMetadata instance
     */
    public static create(properties?: IDistributionBucketOperatorMetadata): DistributionBucketOperatorMetadata;

    /**
     * Encodes the specified DistributionBucketOperatorMetadata message. Does not implicitly {@link DistributionBucketOperatorMetadata.verify|verify} messages.
     * @param message DistributionBucketOperatorMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDistributionBucketOperatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DistributionBucketOperatorMetadata message, length delimited. Does not implicitly {@link DistributionBucketOperatorMetadata.verify|verify} messages.
     * @param message DistributionBucketOperatorMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDistributionBucketOperatorMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DistributionBucketOperatorMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DistributionBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DistributionBucketOperatorMetadata;

    /**
     * Decodes a DistributionBucketOperatorMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DistributionBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DistributionBucketOperatorMetadata;

    /**
     * Verifies a DistributionBucketOperatorMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DistributionBucketOperatorMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DistributionBucketOperatorMetadata
     */
    public static fromObject(object: { [k: string]: any }): DistributionBucketOperatorMetadata;

    /**
     * Creates a plain object from a DistributionBucketOperatorMetadata message. Also converts values to other types if specified.
     * @param message DistributionBucketOperatorMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DistributionBucketOperatorMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DistributionBucketOperatorMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a GeographicalArea. */
export interface IGeographicalArea {

    /** GeographicalArea continent */
    continent?: (GeographicalArea.Continent|null);

    /** GeographicalArea countryCode */
    countryCode?: (string|null);

    /** GeographicalArea subdivisionCode */
    subdivisionCode?: (string|null);
}

/** Represents a GeographicalArea. */
export class GeographicalArea implements IGeographicalArea {

    /**
     * Constructs a new GeographicalArea.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGeographicalArea);

    /** GeographicalArea continent. */
    public continent?: (GeographicalArea.Continent|null);

    /** GeographicalArea countryCode. */
    public countryCode?: (string|null);

    /** GeographicalArea subdivisionCode. */
    public subdivisionCode?: (string|null);

    /** GeographicalArea code. */
    public code?: ("continent"|"countryCode"|"subdivisionCode");

    /**
     * Creates a new GeographicalArea instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GeographicalArea instance
     */
    public static create(properties?: IGeographicalArea): GeographicalArea;

    /**
     * Encodes the specified GeographicalArea message. Does not implicitly {@link GeographicalArea.verify|verify} messages.
     * @param message GeographicalArea message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGeographicalArea, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GeographicalArea message, length delimited. Does not implicitly {@link GeographicalArea.verify|verify} messages.
     * @param message GeographicalArea message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGeographicalArea, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GeographicalArea message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GeographicalArea
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GeographicalArea;

    /**
     * Decodes a GeographicalArea message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GeographicalArea
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GeographicalArea;

    /**
     * Verifies a GeographicalArea message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GeographicalArea message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GeographicalArea
     */
    public static fromObject(object: { [k: string]: any }): GeographicalArea;

    /**
     * Creates a plain object from a GeographicalArea message. Also converts values to other types if specified.
     * @param message GeographicalArea
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GeographicalArea, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GeographicalArea to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace GeographicalArea {

    /** Continent enum. */
    enum Continent {
        AF = 1,
        NA = 2,
        OC = 3,
        AN = 4,
        AS = 5,
        EU = 6,
        SA = 7
    }
}

/** Properties of a DistributionBucketFamilyMetadata. */
export interface IDistributionBucketFamilyMetadata {

    /** DistributionBucketFamilyMetadata region */
    region?: (string|null);

    /** DistributionBucketFamilyMetadata description */
    description?: (string|null);

    /** DistributionBucketFamilyMetadata areas */
    areas?: (IGeographicalArea[]|null);

    /** DistributionBucketFamilyMetadata latencyTestTargets */
    latencyTestTargets?: (string[]|null);
}

/** Represents a DistributionBucketFamilyMetadata. */
export class DistributionBucketFamilyMetadata implements IDistributionBucketFamilyMetadata {

    /**
     * Constructs a new DistributionBucketFamilyMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDistributionBucketFamilyMetadata);

    /** DistributionBucketFamilyMetadata region. */
    public region: string;

    /** DistributionBucketFamilyMetadata description. */
    public description: string;

    /** DistributionBucketFamilyMetadata areas. */
    public areas: IGeographicalArea[];

    /** DistributionBucketFamilyMetadata latencyTestTargets. */
    public latencyTestTargets: string[];

    /**
     * Creates a new DistributionBucketFamilyMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DistributionBucketFamilyMetadata instance
     */
    public static create(properties?: IDistributionBucketFamilyMetadata): DistributionBucketFamilyMetadata;

    /**
     * Encodes the specified DistributionBucketFamilyMetadata message. Does not implicitly {@link DistributionBucketFamilyMetadata.verify|verify} messages.
     * @param message DistributionBucketFamilyMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDistributionBucketFamilyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DistributionBucketFamilyMetadata message, length delimited. Does not implicitly {@link DistributionBucketFamilyMetadata.verify|verify} messages.
     * @param message DistributionBucketFamilyMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDistributionBucketFamilyMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DistributionBucketFamilyMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DistributionBucketFamilyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DistributionBucketFamilyMetadata;

    /**
     * Decodes a DistributionBucketFamilyMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DistributionBucketFamilyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DistributionBucketFamilyMetadata;

    /**
     * Verifies a DistributionBucketFamilyMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DistributionBucketFamilyMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DistributionBucketFamilyMetadata
     */
    public static fromObject(object: { [k: string]: any }): DistributionBucketFamilyMetadata;

    /**
     * Creates a plain object from a DistributionBucketFamilyMetadata message. Also converts values to other types if specified.
     * @param message DistributionBucketFamilyMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DistributionBucketFamilyMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DistributionBucketFamilyMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PublishedBeforeJoystream. */
export interface IPublishedBeforeJoystream {

    /** PublishedBeforeJoystream isPublished */
    isPublished?: (boolean|null);

    /** PublishedBeforeJoystream date */
    date?: (string|null);
}

/** Represents a PublishedBeforeJoystream. */
export class PublishedBeforeJoystream implements IPublishedBeforeJoystream {

    /**
     * Constructs a new PublishedBeforeJoystream.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPublishedBeforeJoystream);

    /** PublishedBeforeJoystream isPublished. */
    public isPublished: boolean;

    /** PublishedBeforeJoystream date. */
    public date: string;

    /**
     * Creates a new PublishedBeforeJoystream instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PublishedBeforeJoystream instance
     */
    public static create(properties?: IPublishedBeforeJoystream): PublishedBeforeJoystream;

    /**
     * Encodes the specified PublishedBeforeJoystream message. Does not implicitly {@link PublishedBeforeJoystream.verify|verify} messages.
     * @param message PublishedBeforeJoystream message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPublishedBeforeJoystream, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PublishedBeforeJoystream message, length delimited. Does not implicitly {@link PublishedBeforeJoystream.verify|verify} messages.
     * @param message PublishedBeforeJoystream message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPublishedBeforeJoystream, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PublishedBeforeJoystream message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PublishedBeforeJoystream
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PublishedBeforeJoystream;

    /**
     * Decodes a PublishedBeforeJoystream message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PublishedBeforeJoystream
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PublishedBeforeJoystream;

    /**
     * Verifies a PublishedBeforeJoystream message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PublishedBeforeJoystream message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PublishedBeforeJoystream
     */
    public static fromObject(object: { [k: string]: any }): PublishedBeforeJoystream;

    /**
     * Creates a plain object from a PublishedBeforeJoystream message. Also converts values to other types if specified.
     * @param message PublishedBeforeJoystream
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PublishedBeforeJoystream, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PublishedBeforeJoystream to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a License. */
export interface ILicense {

    /** License code */
    code?: (number|null);

    /** License attribution */
    attribution?: (string|null);

    /** License customText */
    customText?: (string|null);
}

/** Represents a License. */
export class License implements ILicense {

    /**
     * Constructs a new License.
     * @param [properties] Properties to set
     */
    constructor(properties?: ILicense);

    /** License code. */
    public code: number;

    /** License attribution. */
    public attribution: string;

    /** License customText. */
    public customText: string;

    /**
     * Creates a new License instance using the specified properties.
     * @param [properties] Properties to set
     * @returns License instance
     */
    public static create(properties?: ILicense): License;

    /**
     * Encodes the specified License message. Does not implicitly {@link License.verify|verify} messages.
     * @param message License message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ILicense, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified License message, length delimited. Does not implicitly {@link License.verify|verify} messages.
     * @param message License message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ILicense, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a License message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns License
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): License;

    /**
     * Decodes a License message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns License
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): License;

    /**
     * Verifies a License message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a License message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns License
     */
    public static fromObject(object: { [k: string]: any }): License;

    /**
     * Creates a plain object from a License message. Also converts values to other types if specified.
     * @param message License
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: License, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this License to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a MediaType. */
export interface IMediaType {

    /** MediaType codecName */
    codecName?: (string|null);

    /** MediaType container */
    container?: (string|null);

    /** MediaType mimeMediaType */
    mimeMediaType?: (string|null);
}

/** Represents a MediaType. */
export class MediaType implements IMediaType {

    /**
     * Constructs a new MediaType.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMediaType);

    /** MediaType codecName. */
    public codecName: string;

    /** MediaType container. */
    public container: string;

    /** MediaType mimeMediaType. */
    public mimeMediaType: string;

    /**
     * Creates a new MediaType instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MediaType instance
     */
    public static create(properties?: IMediaType): MediaType;

    /**
     * Encodes the specified MediaType message. Does not implicitly {@link MediaType.verify|verify} messages.
     * @param message MediaType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMediaType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MediaType message, length delimited. Does not implicitly {@link MediaType.verify|verify} messages.
     * @param message MediaType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMediaType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MediaType message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MediaType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MediaType;

    /**
     * Decodes a MediaType message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MediaType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MediaType;

    /**
     * Verifies a MediaType message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MediaType message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MediaType
     */
    public static fromObject(object: { [k: string]: any }): MediaType;

    /**
     * Creates a plain object from a MediaType message. Also converts values to other types if specified.
     * @param message MediaType
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MediaType, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MediaType to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SubtitleMetadata. */
export interface ISubtitleMetadata {

    /** SubtitleMetadata type */
    type: string;

    /** SubtitleMetadata newAsset */
    newAsset?: (number|null);

    /** SubtitleMetadata language */
    language: string;

    /** SubtitleMetadata mimeType */
    mimeType: string;
}

/** Represents a SubtitleMetadata. */
export class SubtitleMetadata implements ISubtitleMetadata {

    /**
     * Constructs a new SubtitleMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISubtitleMetadata);

    /** SubtitleMetadata type. */
    public type: string;

    /** SubtitleMetadata newAsset. */
    public newAsset: number;

    /** SubtitleMetadata language. */
    public language: string;

    /** SubtitleMetadata mimeType. */
    public mimeType: string;

    /**
     * Creates a new SubtitleMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SubtitleMetadata instance
     */
    public static create(properties?: ISubtitleMetadata): SubtitleMetadata;

    /**
     * Encodes the specified SubtitleMetadata message. Does not implicitly {@link SubtitleMetadata.verify|verify} messages.
     * @param message SubtitleMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISubtitleMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SubtitleMetadata message, length delimited. Does not implicitly {@link SubtitleMetadata.verify|verify} messages.
     * @param message SubtitleMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISubtitleMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SubtitleMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SubtitleMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SubtitleMetadata;

    /**
     * Decodes a SubtitleMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SubtitleMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SubtitleMetadata;

    /**
     * Verifies a SubtitleMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SubtitleMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SubtitleMetadata
     */
    public static fromObject(object: { [k: string]: any }): SubtitleMetadata;

    /**
     * Creates a plain object from a SubtitleMetadata message. Also converts values to other types if specified.
     * @param message SubtitleMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SubtitleMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SubtitleMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a VideoMetadata. */
export interface IVideoMetadata {

    /** VideoMetadata title */
    title?: (string|null);

    /** VideoMetadata description */
    description?: (string|null);

    /** VideoMetadata video */
    video?: (number|null);

    /** VideoMetadata thumbnailPhoto */
    thumbnailPhoto?: (number|null);

    /** VideoMetadata duration */
    duration?: (number|null);

    /** VideoMetadata mediaPixelHeight */
    mediaPixelHeight?: (number|null);

    /** VideoMetadata mediaPixelWidth */
    mediaPixelWidth?: (number|null);

    /** VideoMetadata mediaType */
    mediaType?: (IMediaType|null);

    /** VideoMetadata language */
    language?: (string|null);

    /** VideoMetadata license */
    license?: (ILicense|null);

    /** VideoMetadata publishedBeforeJoystream */
    publishedBeforeJoystream?: (IPublishedBeforeJoystream|null);

    /** VideoMetadata hasMarketing */
    hasMarketing?: (boolean|null);

    /** VideoMetadata isPublic */
    isPublic?: (boolean|null);

    /** VideoMetadata isExplicit */
    isExplicit?: (boolean|null);

    /** VideoMetadata persons */
    persons?: (Long[]|null);

    /** VideoMetadata category */
    category?: (string|null);

    /** VideoMetadata subtitles */
    subtitles?: (ISubtitleMetadata[]|null);

    /** VideoMetadata enableComments */
    enableComments?: (boolean|null);

    /** VideoMetadata clearSubtitles */
    clearSubtitles?: (boolean|null);
}

/** Represents a VideoMetadata. */
export class VideoMetadata implements IVideoMetadata {

    /**
     * Constructs a new VideoMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IVideoMetadata);

    /** VideoMetadata title. */
    public title: string;

    /** VideoMetadata description. */
    public description: string;

    /** VideoMetadata video. */
    public video: number;

    /** VideoMetadata thumbnailPhoto. */
    public thumbnailPhoto: number;

    /** VideoMetadata duration. */
    public duration: number;

    /** VideoMetadata mediaPixelHeight. */
    public mediaPixelHeight: number;

    /** VideoMetadata mediaPixelWidth. */
    public mediaPixelWidth: number;

    /** VideoMetadata mediaType. */
    public mediaType?: (IMediaType|null);

    /** VideoMetadata language. */
    public language: string;

    /** VideoMetadata license. */
    public license?: (ILicense|null);

    /** VideoMetadata publishedBeforeJoystream. */
    public publishedBeforeJoystream?: (IPublishedBeforeJoystream|null);

    /** VideoMetadata hasMarketing. */
    public hasMarketing: boolean;

    /** VideoMetadata isPublic. */
    public isPublic: boolean;

    /** VideoMetadata isExplicit. */
    public isExplicit: boolean;

    /** VideoMetadata persons. */
    public persons: Long[];

    /** VideoMetadata category. */
    public category: string;

    /** VideoMetadata subtitles. */
    public subtitles: ISubtitleMetadata[];

    /** VideoMetadata enableComments. */
    public enableComments: boolean;

    /** VideoMetadata clearSubtitles. */
    public clearSubtitles: boolean;

    /**
     * Creates a new VideoMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns VideoMetadata instance
     */
    public static create(properties?: IVideoMetadata): VideoMetadata;

    /**
     * Encodes the specified VideoMetadata message. Does not implicitly {@link VideoMetadata.verify|verify} messages.
     * @param message VideoMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IVideoMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified VideoMetadata message, length delimited. Does not implicitly {@link VideoMetadata.verify|verify} messages.
     * @param message VideoMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IVideoMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a VideoMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns VideoMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): VideoMetadata;

    /**
     * Decodes a VideoMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns VideoMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): VideoMetadata;

    /**
     * Verifies a VideoMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a VideoMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns VideoMetadata
     */
    public static fromObject(object: { [k: string]: any }): VideoMetadata;

    /**
     * Creates a plain object from a VideoMetadata message. Also converts values to other types if specified.
     * @param message VideoMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: VideoMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this VideoMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ContentMetadata. */
export interface IContentMetadata {

    /** ContentMetadata videoMetadata */
    videoMetadata?: (IVideoMetadata|null);
}

/** Represents a ContentMetadata. */
export class ContentMetadata implements IContentMetadata {

    /**
     * Constructs a new ContentMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IContentMetadata);

    /** ContentMetadata videoMetadata. */
    public videoMetadata?: (IVideoMetadata|null);

    /** ContentMetadata contentMetadata. */
    public contentMetadata?: "videoMetadata";

    /**
     * Creates a new ContentMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ContentMetadata instance
     */
    public static create(properties?: IContentMetadata): ContentMetadata;

    /**
     * Encodes the specified ContentMetadata message. Does not implicitly {@link ContentMetadata.verify|verify} messages.
     * @param message ContentMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IContentMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ContentMetadata message, length delimited. Does not implicitly {@link ContentMetadata.verify|verify} messages.
     * @param message ContentMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IContentMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ContentMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ContentMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ContentMetadata;

    /**
     * Decodes a ContentMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ContentMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ContentMetadata;

    /**
     * Verifies a ContentMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ContentMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ContentMetadata
     */
    public static fromObject(object: { [k: string]: any }): ContentMetadata;

    /**
     * Creates a plain object from a ContentMetadata message. Also converts values to other types if specified.
     * @param message ContentMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ContentMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ContentMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an OpeningMetadata. */
export interface IOpeningMetadata {

    /** OpeningMetadata shortDescription */
    shortDescription?: (string|null);

    /** OpeningMetadata description */
    description?: (string|null);

    /** OpeningMetadata hiringLimit */
    hiringLimit?: (number|null);

    /** OpeningMetadata expectedEndingTimestamp */
    expectedEndingTimestamp?: (number|null);

    /** OpeningMetadata applicationDetails */
    applicationDetails?: (string|null);

    /** OpeningMetadata applicationFormQuestions */
    applicationFormQuestions?: (OpeningMetadata.IApplicationFormQuestion[]|null);

    /** OpeningMetadata title */
    title?: (string|null);
}

/** Represents an OpeningMetadata. */
export class OpeningMetadata implements IOpeningMetadata {

    /**
     * Constructs a new OpeningMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOpeningMetadata);

    /** OpeningMetadata shortDescription. */
    public shortDescription: string;

    /** OpeningMetadata description. */
    public description: string;

    /** OpeningMetadata hiringLimit. */
    public hiringLimit: number;

    /** OpeningMetadata expectedEndingTimestamp. */
    public expectedEndingTimestamp: number;

    /** OpeningMetadata applicationDetails. */
    public applicationDetails: string;

    /** OpeningMetadata applicationFormQuestions. */
    public applicationFormQuestions: OpeningMetadata.IApplicationFormQuestion[];

    /** OpeningMetadata title. */
    public title: string;

    /**
     * Creates a new OpeningMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OpeningMetadata instance
     */
    public static create(properties?: IOpeningMetadata): OpeningMetadata;

    /**
     * Encodes the specified OpeningMetadata message. Does not implicitly {@link OpeningMetadata.verify|verify} messages.
     * @param message OpeningMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOpeningMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OpeningMetadata message, length delimited. Does not implicitly {@link OpeningMetadata.verify|verify} messages.
     * @param message OpeningMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOpeningMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OpeningMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OpeningMetadata;

    /**
     * Decodes an OpeningMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OpeningMetadata;

    /**
     * Verifies an OpeningMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OpeningMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OpeningMetadata
     */
    public static fromObject(object: { [k: string]: any }): OpeningMetadata;

    /**
     * Creates a plain object from an OpeningMetadata message. Also converts values to other types if specified.
     * @param message OpeningMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OpeningMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OpeningMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace OpeningMetadata {

    /** Properties of an ApplicationFormQuestion. */
    interface IApplicationFormQuestion {

        /** ApplicationFormQuestion question */
        question?: (string|null);

        /** ApplicationFormQuestion type */
        type?: (OpeningMetadata.ApplicationFormQuestion.InputType|null);
    }

    /** Represents an ApplicationFormQuestion. */
    class ApplicationFormQuestion implements IApplicationFormQuestion {

        /**
         * Constructs a new ApplicationFormQuestion.
         * @param [properties] Properties to set
         */
        constructor(properties?: OpeningMetadata.IApplicationFormQuestion);

        /** ApplicationFormQuestion question. */
        public question: string;

        /** ApplicationFormQuestion type. */
        public type: OpeningMetadata.ApplicationFormQuestion.InputType;

        /**
         * Creates a new ApplicationFormQuestion instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationFormQuestion instance
         */
        public static create(properties?: OpeningMetadata.IApplicationFormQuestion): OpeningMetadata.ApplicationFormQuestion;

        /**
         * Encodes the specified ApplicationFormQuestion message. Does not implicitly {@link OpeningMetadata.ApplicationFormQuestion.verify|verify} messages.
         * @param message ApplicationFormQuestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: OpeningMetadata.IApplicationFormQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationFormQuestion message, length delimited. Does not implicitly {@link OpeningMetadata.ApplicationFormQuestion.verify|verify} messages.
         * @param message ApplicationFormQuestion message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: OpeningMetadata.IApplicationFormQuestion, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationFormQuestion message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationFormQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OpeningMetadata.ApplicationFormQuestion;

        /**
         * Decodes an ApplicationFormQuestion message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationFormQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OpeningMetadata.ApplicationFormQuestion;

        /**
         * Verifies an ApplicationFormQuestion message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationFormQuestion message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationFormQuestion
         */
        public static fromObject(object: { [k: string]: any }): OpeningMetadata.ApplicationFormQuestion;

        /**
         * Creates a plain object from an ApplicationFormQuestion message. Also converts values to other types if specified.
         * @param message ApplicationFormQuestion
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: OpeningMetadata.ApplicationFormQuestion, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationFormQuestion to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ApplicationFormQuestion {

        /** InputType enum. */
        enum InputType {
            TEXTAREA = 0,
            TEXT = 1
        }
    }
}

/** Properties of an UpcomingOpeningMetadata. */
export interface IUpcomingOpeningMetadata {

    /** UpcomingOpeningMetadata expectedStart */
    expectedStart?: (number|null);

    /** UpcomingOpeningMetadata rewardPerBlock */
    rewardPerBlock?: (Long|null);

    /** UpcomingOpeningMetadata minApplicationStake */
    minApplicationStake?: (Long|null);

    /** UpcomingOpeningMetadata metadata */
    metadata?: (IOpeningMetadata|null);
}

/** Represents an UpcomingOpeningMetadata. */
export class UpcomingOpeningMetadata implements IUpcomingOpeningMetadata {

    /**
     * Constructs a new UpcomingOpeningMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpcomingOpeningMetadata);

    /** UpcomingOpeningMetadata expectedStart. */
    public expectedStart: number;

    /** UpcomingOpeningMetadata rewardPerBlock. */
    public rewardPerBlock: Long;

    /** UpcomingOpeningMetadata minApplicationStake. */
    public minApplicationStake: Long;

    /** UpcomingOpeningMetadata metadata. */
    public metadata?: (IOpeningMetadata|null);

    /**
     * Creates a new UpcomingOpeningMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpcomingOpeningMetadata instance
     */
    public static create(properties?: IUpcomingOpeningMetadata): UpcomingOpeningMetadata;

    /**
     * Encodes the specified UpcomingOpeningMetadata message. Does not implicitly {@link UpcomingOpeningMetadata.verify|verify} messages.
     * @param message UpcomingOpeningMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpcomingOpeningMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpcomingOpeningMetadata message, length delimited. Does not implicitly {@link UpcomingOpeningMetadata.verify|verify} messages.
     * @param message UpcomingOpeningMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpcomingOpeningMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpcomingOpeningMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpcomingOpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpcomingOpeningMetadata;

    /**
     * Decodes an UpcomingOpeningMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpcomingOpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpcomingOpeningMetadata;

    /**
     * Verifies an UpcomingOpeningMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpcomingOpeningMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpcomingOpeningMetadata
     */
    public static fromObject(object: { [k: string]: any }): UpcomingOpeningMetadata;

    /**
     * Creates a plain object from an UpcomingOpeningMetadata message. Also converts values to other types if specified.
     * @param message UpcomingOpeningMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpcomingOpeningMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpcomingOpeningMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ApplicationMetadata. */
export interface IApplicationMetadata {

    /** ApplicationMetadata answers */
    answers?: (string[]|null);
}

/** Represents an ApplicationMetadata. */
export class ApplicationMetadata implements IApplicationMetadata {

    /**
     * Constructs a new ApplicationMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApplicationMetadata);

    /** ApplicationMetadata answers. */
    public answers: string[];

    /**
     * Creates a new ApplicationMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApplicationMetadata instance
     */
    public static create(properties?: IApplicationMetadata): ApplicationMetadata;

    /**
     * Encodes the specified ApplicationMetadata message. Does not implicitly {@link ApplicationMetadata.verify|verify} messages.
     * @param message ApplicationMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApplicationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApplicationMetadata message, length delimited. Does not implicitly {@link ApplicationMetadata.verify|verify} messages.
     * @param message ApplicationMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApplicationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApplicationMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApplicationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApplicationMetadata;

    /**
     * Decodes an ApplicationMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApplicationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApplicationMetadata;

    /**
     * Verifies an ApplicationMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApplicationMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApplicationMetadata
     */
    public static fromObject(object: { [k: string]: any }): ApplicationMetadata;

    /**
     * Creates a plain object from an ApplicationMetadata message. Also converts values to other types if specified.
     * @param message ApplicationMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApplicationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApplicationMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WorkingGroupMetadata. */
export interface IWorkingGroupMetadata {

    /** WorkingGroupMetadata description */
    description?: (string|null);

    /** WorkingGroupMetadata about */
    about?: (string|null);

    /** WorkingGroupMetadata status */
    status?: (string|null);

    /** WorkingGroupMetadata statusMessage */
    statusMessage?: (string|null);
}

/** Represents a WorkingGroupMetadata. */
export class WorkingGroupMetadata implements IWorkingGroupMetadata {

    /**
     * Constructs a new WorkingGroupMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWorkingGroupMetadata);

    /** WorkingGroupMetadata description. */
    public description: string;

    /** WorkingGroupMetadata about. */
    public about: string;

    /** WorkingGroupMetadata status. */
    public status: string;

    /** WorkingGroupMetadata statusMessage. */
    public statusMessage: string;

    /**
     * Creates a new WorkingGroupMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WorkingGroupMetadata instance
     */
    public static create(properties?: IWorkingGroupMetadata): WorkingGroupMetadata;

    /**
     * Encodes the specified WorkingGroupMetadata message. Does not implicitly {@link WorkingGroupMetadata.verify|verify} messages.
     * @param message WorkingGroupMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWorkingGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WorkingGroupMetadata message, length delimited. Does not implicitly {@link WorkingGroupMetadata.verify|verify} messages.
     * @param message WorkingGroupMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWorkingGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WorkingGroupMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WorkingGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WorkingGroupMetadata;

    /**
     * Decodes a WorkingGroupMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WorkingGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WorkingGroupMetadata;

    /**
     * Verifies a WorkingGroupMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WorkingGroupMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WorkingGroupMetadata
     */
    public static fromObject(object: { [k: string]: any }): WorkingGroupMetadata;

    /**
     * Creates a plain object from a WorkingGroupMetadata message. Also converts values to other types if specified.
     * @param message WorkingGroupMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WorkingGroupMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WorkingGroupMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SetGroupMetadata. */
export interface ISetGroupMetadata {

    /** SetGroupMetadata newMetadata */
    newMetadata?: (IWorkingGroupMetadata|null);
}

/** Represents a SetGroupMetadata. */
export class SetGroupMetadata implements ISetGroupMetadata {

    /**
     * Constructs a new SetGroupMetadata.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISetGroupMetadata);

    /** SetGroupMetadata newMetadata. */
    public newMetadata?: (IWorkingGroupMetadata|null);

    /**
     * Creates a new SetGroupMetadata instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SetGroupMetadata instance
     */
    public static create(properties?: ISetGroupMetadata): SetGroupMetadata;

    /**
     * Encodes the specified SetGroupMetadata message. Does not implicitly {@link SetGroupMetadata.verify|verify} messages.
     * @param message SetGroupMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISetGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SetGroupMetadata message, length delimited. Does not implicitly {@link SetGroupMetadata.verify|verify} messages.
     * @param message SetGroupMetadata message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISetGroupMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SetGroupMetadata message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SetGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SetGroupMetadata;

    /**
     * Decodes a SetGroupMetadata message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SetGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SetGroupMetadata;

    /**
     * Verifies a SetGroupMetadata message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SetGroupMetadata message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SetGroupMetadata
     */
    public static fromObject(object: { [k: string]: any }): SetGroupMetadata;

    /**
     * Creates a plain object from a SetGroupMetadata message. Also converts values to other types if specified.
     * @param message SetGroupMetadata
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SetGroupMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SetGroupMetadata to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AddUpcomingOpening. */
export interface IAddUpcomingOpening {

    /** AddUpcomingOpening metadata */
    metadata?: (IUpcomingOpeningMetadata|null);
}

/** Represents an AddUpcomingOpening. */
export class AddUpcomingOpening implements IAddUpcomingOpening {

    /**
     * Constructs a new AddUpcomingOpening.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAddUpcomingOpening);

    /** AddUpcomingOpening metadata. */
    public metadata?: (IUpcomingOpeningMetadata|null);

    /**
     * Creates a new AddUpcomingOpening instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AddUpcomingOpening instance
     */
    public static create(properties?: IAddUpcomingOpening): AddUpcomingOpening;

    /**
     * Encodes the specified AddUpcomingOpening message. Does not implicitly {@link AddUpcomingOpening.verify|verify} messages.
     * @param message AddUpcomingOpening message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAddUpcomingOpening, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AddUpcomingOpening message, length delimited. Does not implicitly {@link AddUpcomingOpening.verify|verify} messages.
     * @param message AddUpcomingOpening message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAddUpcomingOpening, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AddUpcomingOpening message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AddUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AddUpcomingOpening;

    /**
     * Decodes an AddUpcomingOpening message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AddUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AddUpcomingOpening;

    /**
     * Verifies an AddUpcomingOpening message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AddUpcomingOpening message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AddUpcomingOpening
     */
    public static fromObject(object: { [k: string]: any }): AddUpcomingOpening;

    /**
     * Creates a plain object from an AddUpcomingOpening message. Also converts values to other types if specified.
     * @param message AddUpcomingOpening
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AddUpcomingOpening, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AddUpcomingOpening to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RemoveUpcomingOpening. */
export interface IRemoveUpcomingOpening {

    /** RemoveUpcomingOpening id */
    id?: (string|null);
}

/** Represents a RemoveUpcomingOpening. */
export class RemoveUpcomingOpening implements IRemoveUpcomingOpening {

    /**
     * Constructs a new RemoveUpcomingOpening.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRemoveUpcomingOpening);

    /** RemoveUpcomingOpening id. */
    public id: string;

    /**
     * Creates a new RemoveUpcomingOpening instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RemoveUpcomingOpening instance
     */
    public static create(properties?: IRemoveUpcomingOpening): RemoveUpcomingOpening;

    /**
     * Encodes the specified RemoveUpcomingOpening message. Does not implicitly {@link RemoveUpcomingOpening.verify|verify} messages.
     * @param message RemoveUpcomingOpening message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRemoveUpcomingOpening, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RemoveUpcomingOpening message, length delimited. Does not implicitly {@link RemoveUpcomingOpening.verify|verify} messages.
     * @param message RemoveUpcomingOpening message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRemoveUpcomingOpening, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RemoveUpcomingOpening message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RemoveUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RemoveUpcomingOpening;

    /**
     * Decodes a RemoveUpcomingOpening message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RemoveUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RemoveUpcomingOpening;

    /**
     * Verifies a RemoveUpcomingOpening message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RemoveUpcomingOpening message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RemoveUpcomingOpening
     */
    public static fromObject(object: { [k: string]: any }): RemoveUpcomingOpening;

    /**
     * Creates a plain object from a RemoveUpcomingOpening message. Also converts values to other types if specified.
     * @param message RemoveUpcomingOpening
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RemoveUpcomingOpening, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RemoveUpcomingOpening to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a WorkingGroupMetadataAction. */
export interface IWorkingGroupMetadataAction {

    /** WorkingGroupMetadataAction setGroupMetadata */
    setGroupMetadata?: (ISetGroupMetadata|null);

    /** WorkingGroupMetadataAction addUpcomingOpening */
    addUpcomingOpening?: (IAddUpcomingOpening|null);

    /** WorkingGroupMetadataAction removeUpcomingOpening */
    removeUpcomingOpening?: (IRemoveUpcomingOpening|null);
}

/** Represents a WorkingGroupMetadataAction. */
export class WorkingGroupMetadataAction implements IWorkingGroupMetadataAction {

    /**
     * Constructs a new WorkingGroupMetadataAction.
     * @param [properties] Properties to set
     */
    constructor(properties?: IWorkingGroupMetadataAction);

    /** WorkingGroupMetadataAction setGroupMetadata. */
    public setGroupMetadata?: (ISetGroupMetadata|null);

    /** WorkingGroupMetadataAction addUpcomingOpening. */
    public addUpcomingOpening?: (IAddUpcomingOpening|null);

    /** WorkingGroupMetadataAction removeUpcomingOpening. */
    public removeUpcomingOpening?: (IRemoveUpcomingOpening|null);

    /** WorkingGroupMetadataAction action. */
    public action?: ("setGroupMetadata"|"addUpcomingOpening"|"removeUpcomingOpening");

    /**
     * Creates a new WorkingGroupMetadataAction instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WorkingGroupMetadataAction instance
     */
    public static create(properties?: IWorkingGroupMetadataAction): WorkingGroupMetadataAction;

    /**
     * Encodes the specified WorkingGroupMetadataAction message. Does not implicitly {@link WorkingGroupMetadataAction.verify|verify} messages.
     * @param message WorkingGroupMetadataAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IWorkingGroupMetadataAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified WorkingGroupMetadataAction message, length delimited. Does not implicitly {@link WorkingGroupMetadataAction.verify|verify} messages.
     * @param message WorkingGroupMetadataAction message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IWorkingGroupMetadataAction, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a WorkingGroupMetadataAction message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WorkingGroupMetadataAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): WorkingGroupMetadataAction;

    /**
     * Decodes a WorkingGroupMetadataAction message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WorkingGroupMetadataAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): WorkingGroupMetadataAction;

    /**
     * Verifies a WorkingGroupMetadataAction message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a WorkingGroupMetadataAction message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WorkingGroupMetadataAction
     */
    public static fromObject(object: { [k: string]: any }): WorkingGroupMetadataAction;

    /**
     * Creates a plain object from a WorkingGroupMetadataAction message. Also converts values to other types if specified.
     * @param message WorkingGroupMetadataAction
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: WorkingGroupMetadataAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this WorkingGroupMetadataAction to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
