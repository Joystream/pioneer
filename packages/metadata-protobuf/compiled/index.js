/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.BountyMetadata = (function() {

    /**
     * Properties of a BountyMetadata.
     * @exports IBountyMetadata
     * @interface IBountyMetadata
     * @property {string|null} [title] BountyMetadata title
     * @property {string|null} [description] BountyMetadata description
     * @property {Long|null} [discussionThread] BountyMetadata discussionThread
     * @property {string|null} [bannerImageUri] BountyMetadata bannerImageUri
     */

    /**
     * Constructs a new BountyMetadata.
     * @exports BountyMetadata
     * @classdesc Represents a BountyMetadata.
     * @implements IBountyMetadata
     * @constructor
     * @param {IBountyMetadata=} [properties] Properties to set
     */
    function BountyMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BountyMetadata title.
     * @member {string} title
     * @memberof BountyMetadata
     * @instance
     */
    BountyMetadata.prototype.title = "";

    /**
     * BountyMetadata description.
     * @member {string} description
     * @memberof BountyMetadata
     * @instance
     */
    BountyMetadata.prototype.description = "";

    /**
     * BountyMetadata discussionThread.
     * @member {Long} discussionThread
     * @memberof BountyMetadata
     * @instance
     */
    BountyMetadata.prototype.discussionThread = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * BountyMetadata bannerImageUri.
     * @member {string} bannerImageUri
     * @memberof BountyMetadata
     * @instance
     */
    BountyMetadata.prototype.bannerImageUri = "";

    /**
     * Creates a new BountyMetadata instance using the specified properties.
     * @function create
     * @memberof BountyMetadata
     * @static
     * @param {IBountyMetadata=} [properties] Properties to set
     * @returns {BountyMetadata} BountyMetadata instance
     */
    BountyMetadata.create = function create(properties) {
        return new BountyMetadata(properties);
    };

    /**
     * Encodes the specified BountyMetadata message. Does not implicitly {@link BountyMetadata.verify|verify} messages.
     * @function encode
     * @memberof BountyMetadata
     * @static
     * @param {IBountyMetadata} message BountyMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BountyMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.discussionThread != null && Object.hasOwnProperty.call(message, "discussionThread"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.discussionThread);
        if (message.bannerImageUri != null && Object.hasOwnProperty.call(message, "bannerImageUri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.bannerImageUri);
        return writer;
    };

    /**
     * Encodes the specified BountyMetadata message, length delimited. Does not implicitly {@link BountyMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BountyMetadata
     * @static
     * @param {IBountyMetadata} message BountyMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BountyMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BountyMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof BountyMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BountyMetadata} BountyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BountyMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BountyMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.discussionThread = reader.uint64();
                break;
            case 4:
                message.bannerImageUri = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a BountyMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BountyMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BountyMetadata} BountyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BountyMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BountyMetadata message.
     * @function verify
     * @memberof BountyMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BountyMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.discussionThread != null && message.hasOwnProperty("discussionThread"))
            if (!$util.isInteger(message.discussionThread) && !(message.discussionThread && $util.isInteger(message.discussionThread.low) && $util.isInteger(message.discussionThread.high)))
                return "discussionThread: integer|Long expected";
        if (message.bannerImageUri != null && message.hasOwnProperty("bannerImageUri"))
            if (!$util.isString(message.bannerImageUri))
                return "bannerImageUri: string expected";
        return null;
    };

    /**
     * Creates a BountyMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BountyMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BountyMetadata} BountyMetadata
     */
    BountyMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.BountyMetadata)
            return object;
        var message = new $root.BountyMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        if (object.discussionThread != null)
            if ($util.Long)
                (message.discussionThread = $util.Long.fromValue(object.discussionThread)).unsigned = true;
            else if (typeof object.discussionThread === "string")
                message.discussionThread = parseInt(object.discussionThread, 10);
            else if (typeof object.discussionThread === "number")
                message.discussionThread = object.discussionThread;
            else if (typeof object.discussionThread === "object")
                message.discussionThread = new $util.LongBits(object.discussionThread.low >>> 0, object.discussionThread.high >>> 0).toNumber(true);
        if (object.bannerImageUri != null)
            message.bannerImageUri = String(object.bannerImageUri);
        return message;
    };

    /**
     * Creates a plain object from a BountyMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BountyMetadata
     * @static
     * @param {BountyMetadata} message BountyMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BountyMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.title = "";
            object.description = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.discussionThread = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.discussionThread = options.longs === String ? "0" : 0;
            object.bannerImageUri = "";
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.discussionThread != null && message.hasOwnProperty("discussionThread"))
            if (typeof message.discussionThread === "number")
                object.discussionThread = options.longs === String ? String(message.discussionThread) : message.discussionThread;
            else
                object.discussionThread = options.longs === String ? $util.Long.prototype.toString.call(message.discussionThread) : options.longs === Number ? new $util.LongBits(message.discussionThread.low >>> 0, message.discussionThread.high >>> 0).toNumber(true) : message.discussionThread;
        if (message.bannerImageUri != null && message.hasOwnProperty("bannerImageUri"))
            object.bannerImageUri = message.bannerImageUri;
        return object;
    };

    /**
     * Converts this BountyMetadata to JSON.
     * @function toJSON
     * @memberof BountyMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BountyMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BountyMetadata;
})();

$root.BountyWorkData = (function() {

    /**
     * Properties of a BountyWorkData.
     * @exports IBountyWorkData
     * @interface IBountyWorkData
     * @property {string|null} [title] BountyWorkData title
     * @property {string|null} [description] BountyWorkData description
     */

    /**
     * Constructs a new BountyWorkData.
     * @exports BountyWorkData
     * @classdesc Represents a BountyWorkData.
     * @implements IBountyWorkData
     * @constructor
     * @param {IBountyWorkData=} [properties] Properties to set
     */
    function BountyWorkData(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BountyWorkData title.
     * @member {string} title
     * @memberof BountyWorkData
     * @instance
     */
    BountyWorkData.prototype.title = "";

    /**
     * BountyWorkData description.
     * @member {string} description
     * @memberof BountyWorkData
     * @instance
     */
    BountyWorkData.prototype.description = "";

    /**
     * Creates a new BountyWorkData instance using the specified properties.
     * @function create
     * @memberof BountyWorkData
     * @static
     * @param {IBountyWorkData=} [properties] Properties to set
     * @returns {BountyWorkData} BountyWorkData instance
     */
    BountyWorkData.create = function create(properties) {
        return new BountyWorkData(properties);
    };

    /**
     * Encodes the specified BountyWorkData message. Does not implicitly {@link BountyWorkData.verify|verify} messages.
     * @function encode
     * @memberof BountyWorkData
     * @static
     * @param {IBountyWorkData} message BountyWorkData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BountyWorkData.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        return writer;
    };

    /**
     * Encodes the specified BountyWorkData message, length delimited. Does not implicitly {@link BountyWorkData.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BountyWorkData
     * @static
     * @param {IBountyWorkData} message BountyWorkData message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BountyWorkData.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BountyWorkData message from the specified reader or buffer.
     * @function decode
     * @memberof BountyWorkData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BountyWorkData} BountyWorkData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BountyWorkData.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BountyWorkData();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a BountyWorkData message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BountyWorkData
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BountyWorkData} BountyWorkData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BountyWorkData.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BountyWorkData message.
     * @function verify
     * @memberof BountyWorkData
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BountyWorkData.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        return null;
    };

    /**
     * Creates a BountyWorkData message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BountyWorkData
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BountyWorkData} BountyWorkData
     */
    BountyWorkData.fromObject = function fromObject(object) {
        if (object instanceof $root.BountyWorkData)
            return object;
        var message = new $root.BountyWorkData();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        return message;
    };

    /**
     * Creates a plain object from a BountyWorkData message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BountyWorkData
     * @static
     * @param {BountyWorkData} message BountyWorkData
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BountyWorkData.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.title = "";
            object.description = "";
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        return object;
    };

    /**
     * Converts this BountyWorkData to JSON.
     * @function toJSON
     * @memberof BountyWorkData
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BountyWorkData.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return BountyWorkData;
})();

$root.ChannelMetadata = (function() {

    /**
     * Properties of a ChannelMetadata.
     * @exports IChannelMetadata
     * @interface IChannelMetadata
     * @property {string|null} [title] ChannelMetadata title
     * @property {string|null} [description] ChannelMetadata description
     * @property {boolean|null} [isPublic] ChannelMetadata isPublic
     * @property {string|null} [language] ChannelMetadata language
     * @property {number|null} [coverPhoto] ChannelMetadata coverPhoto
     * @property {number|null} [avatarPhoto] ChannelMetadata avatarPhoto
     */

    /**
     * Constructs a new ChannelMetadata.
     * @exports ChannelMetadata
     * @classdesc Represents a ChannelMetadata.
     * @implements IChannelMetadata
     * @constructor
     * @param {IChannelMetadata=} [properties] Properties to set
     */
    function ChannelMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChannelMetadata title.
     * @member {string} title
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.title = "";

    /**
     * ChannelMetadata description.
     * @member {string} description
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.description = "";

    /**
     * ChannelMetadata isPublic.
     * @member {boolean} isPublic
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.isPublic = false;

    /**
     * ChannelMetadata language.
     * @member {string} language
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.language = "";

    /**
     * ChannelMetadata coverPhoto.
     * @member {number} coverPhoto
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.coverPhoto = 0;

    /**
     * ChannelMetadata avatarPhoto.
     * @member {number} avatarPhoto
     * @memberof ChannelMetadata
     * @instance
     */
    ChannelMetadata.prototype.avatarPhoto = 0;

    /**
     * Creates a new ChannelMetadata instance using the specified properties.
     * @function create
     * @memberof ChannelMetadata
     * @static
     * @param {IChannelMetadata=} [properties] Properties to set
     * @returns {ChannelMetadata} ChannelMetadata instance
     */
    ChannelMetadata.create = function create(properties) {
        return new ChannelMetadata(properties);
    };

    /**
     * Encodes the specified ChannelMetadata message. Does not implicitly {@link ChannelMetadata.verify|verify} messages.
     * @function encode
     * @memberof ChannelMetadata
     * @static
     * @param {IChannelMetadata} message ChannelMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.isPublic != null && Object.hasOwnProperty.call(message, "isPublic"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isPublic);
        if (message.language != null && Object.hasOwnProperty.call(message, "language"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.language);
        if (message.coverPhoto != null && Object.hasOwnProperty.call(message, "coverPhoto"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.coverPhoto);
        if (message.avatarPhoto != null && Object.hasOwnProperty.call(message, "avatarPhoto"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.avatarPhoto);
        return writer;
    };

    /**
     * Encodes the specified ChannelMetadata message, length delimited. Does not implicitly {@link ChannelMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChannelMetadata
     * @static
     * @param {IChannelMetadata} message ChannelMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChannelMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ChannelMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChannelMetadata} ChannelMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.isPublic = reader.bool();
                break;
            case 4:
                message.language = reader.string();
                break;
            case 5:
                message.coverPhoto = reader.uint32();
                break;
            case 6:
                message.avatarPhoto = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChannelMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChannelMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChannelMetadata} ChannelMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChannelMetadata message.
     * @function verify
     * @memberof ChannelMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChannelMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.isPublic != null && message.hasOwnProperty("isPublic"))
            if (typeof message.isPublic !== "boolean")
                return "isPublic: boolean expected";
        if (message.language != null && message.hasOwnProperty("language"))
            if (!$util.isString(message.language))
                return "language: string expected";
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            if (!$util.isInteger(message.coverPhoto))
                return "coverPhoto: integer expected";
        if (message.avatarPhoto != null && message.hasOwnProperty("avatarPhoto"))
            if (!$util.isInteger(message.avatarPhoto))
                return "avatarPhoto: integer expected";
        return null;
    };

    /**
     * Creates a ChannelMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChannelMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChannelMetadata} ChannelMetadata
     */
    ChannelMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ChannelMetadata)
            return object;
        var message = new $root.ChannelMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        if (object.isPublic != null)
            message.isPublic = Boolean(object.isPublic);
        if (object.language != null)
            message.language = String(object.language);
        if (object.coverPhoto != null)
            message.coverPhoto = object.coverPhoto >>> 0;
        if (object.avatarPhoto != null)
            message.avatarPhoto = object.avatarPhoto >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ChannelMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChannelMetadata
     * @static
     * @param {ChannelMetadata} message ChannelMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChannelMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.title = "";
            object.description = "";
            object.isPublic = false;
            object.language = "";
            object.coverPhoto = 0;
            object.avatarPhoto = 0;
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.isPublic != null && message.hasOwnProperty("isPublic"))
            object.isPublic = message.isPublic;
        if (message.language != null && message.hasOwnProperty("language"))
            object.language = message.language;
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            object.coverPhoto = message.coverPhoto;
        if (message.avatarPhoto != null && message.hasOwnProperty("avatarPhoto"))
            object.avatarPhoto = message.avatarPhoto;
        return object;
    };

    /**
     * Converts this ChannelMetadata to JSON.
     * @function toJSON
     * @memberof ChannelMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChannelMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChannelMetadata;
})();

$root.CouncilCandidacyNoteMetadata = (function() {

    /**
     * Properties of a CouncilCandidacyNoteMetadata.
     * @exports ICouncilCandidacyNoteMetadata
     * @interface ICouncilCandidacyNoteMetadata
     * @property {string|null} [header] CouncilCandidacyNoteMetadata header
     * @property {Array.<string>|null} [bulletPoints] CouncilCandidacyNoteMetadata bulletPoints
     * @property {string|null} [bannerImageUri] CouncilCandidacyNoteMetadata bannerImageUri
     * @property {string|null} [description] CouncilCandidacyNoteMetadata description
     */

    /**
     * Constructs a new CouncilCandidacyNoteMetadata.
     * @exports CouncilCandidacyNoteMetadata
     * @classdesc Represents a CouncilCandidacyNoteMetadata.
     * @implements ICouncilCandidacyNoteMetadata
     * @constructor
     * @param {ICouncilCandidacyNoteMetadata=} [properties] Properties to set
     */
    function CouncilCandidacyNoteMetadata(properties) {
        this.bulletPoints = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CouncilCandidacyNoteMetadata header.
     * @member {string} header
     * @memberof CouncilCandidacyNoteMetadata
     * @instance
     */
    CouncilCandidacyNoteMetadata.prototype.header = "";

    /**
     * CouncilCandidacyNoteMetadata bulletPoints.
     * @member {Array.<string>} bulletPoints
     * @memberof CouncilCandidacyNoteMetadata
     * @instance
     */
    CouncilCandidacyNoteMetadata.prototype.bulletPoints = $util.emptyArray;

    /**
     * CouncilCandidacyNoteMetadata bannerImageUri.
     * @member {string} bannerImageUri
     * @memberof CouncilCandidacyNoteMetadata
     * @instance
     */
    CouncilCandidacyNoteMetadata.prototype.bannerImageUri = "";

    /**
     * CouncilCandidacyNoteMetadata description.
     * @member {string} description
     * @memberof CouncilCandidacyNoteMetadata
     * @instance
     */
    CouncilCandidacyNoteMetadata.prototype.description = "";

    /**
     * Creates a new CouncilCandidacyNoteMetadata instance using the specified properties.
     * @function create
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {ICouncilCandidacyNoteMetadata=} [properties] Properties to set
     * @returns {CouncilCandidacyNoteMetadata} CouncilCandidacyNoteMetadata instance
     */
    CouncilCandidacyNoteMetadata.create = function create(properties) {
        return new CouncilCandidacyNoteMetadata(properties);
    };

    /**
     * Encodes the specified CouncilCandidacyNoteMetadata message. Does not implicitly {@link CouncilCandidacyNoteMetadata.verify|verify} messages.
     * @function encode
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {ICouncilCandidacyNoteMetadata} message CouncilCandidacyNoteMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CouncilCandidacyNoteMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.header != null && Object.hasOwnProperty.call(message, "header"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.header);
        if (message.bulletPoints != null && message.bulletPoints.length)
            for (var i = 0; i < message.bulletPoints.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.bulletPoints[i]);
        if (message.bannerImageUri != null && Object.hasOwnProperty.call(message, "bannerImageUri"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.bannerImageUri);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.description);
        return writer;
    };

    /**
     * Encodes the specified CouncilCandidacyNoteMetadata message, length delimited. Does not implicitly {@link CouncilCandidacyNoteMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {ICouncilCandidacyNoteMetadata} message CouncilCandidacyNoteMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CouncilCandidacyNoteMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CouncilCandidacyNoteMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CouncilCandidacyNoteMetadata} CouncilCandidacyNoteMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CouncilCandidacyNoteMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CouncilCandidacyNoteMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.header = reader.string();
                break;
            case 2:
                if (!(message.bulletPoints && message.bulletPoints.length))
                    message.bulletPoints = [];
                message.bulletPoints.push(reader.string());
                break;
            case 3:
                message.bannerImageUri = reader.string();
                break;
            case 4:
                message.description = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CouncilCandidacyNoteMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CouncilCandidacyNoteMetadata} CouncilCandidacyNoteMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CouncilCandidacyNoteMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CouncilCandidacyNoteMetadata message.
     * @function verify
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CouncilCandidacyNoteMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.header != null && message.hasOwnProperty("header"))
            if (!$util.isString(message.header))
                return "header: string expected";
        if (message.bulletPoints != null && message.hasOwnProperty("bulletPoints")) {
            if (!Array.isArray(message.bulletPoints))
                return "bulletPoints: array expected";
            for (var i = 0; i < message.bulletPoints.length; ++i)
                if (!$util.isString(message.bulletPoints[i]))
                    return "bulletPoints: string[] expected";
        }
        if (message.bannerImageUri != null && message.hasOwnProperty("bannerImageUri"))
            if (!$util.isString(message.bannerImageUri))
                return "bannerImageUri: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        return null;
    };

    /**
     * Creates a CouncilCandidacyNoteMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CouncilCandidacyNoteMetadata} CouncilCandidacyNoteMetadata
     */
    CouncilCandidacyNoteMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.CouncilCandidacyNoteMetadata)
            return object;
        var message = new $root.CouncilCandidacyNoteMetadata();
        if (object.header != null)
            message.header = String(object.header);
        if (object.bulletPoints) {
            if (!Array.isArray(object.bulletPoints))
                throw TypeError(".CouncilCandidacyNoteMetadata.bulletPoints: array expected");
            message.bulletPoints = [];
            for (var i = 0; i < object.bulletPoints.length; ++i)
                message.bulletPoints[i] = String(object.bulletPoints[i]);
        }
        if (object.bannerImageUri != null)
            message.bannerImageUri = String(object.bannerImageUri);
        if (object.description != null)
            message.description = String(object.description);
        return message;
    };

    /**
     * Creates a plain object from a CouncilCandidacyNoteMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CouncilCandidacyNoteMetadata
     * @static
     * @param {CouncilCandidacyNoteMetadata} message CouncilCandidacyNoteMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CouncilCandidacyNoteMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.bulletPoints = [];
        if (options.defaults) {
            object.header = "";
            object.bannerImageUri = "";
            object.description = "";
        }
        if (message.header != null && message.hasOwnProperty("header"))
            object.header = message.header;
        if (message.bulletPoints && message.bulletPoints.length) {
            object.bulletPoints = [];
            for (var j = 0; j < message.bulletPoints.length; ++j)
                object.bulletPoints[j] = message.bulletPoints[j];
        }
        if (message.bannerImageUri != null && message.hasOwnProperty("bannerImageUri"))
            object.bannerImageUri = message.bannerImageUri;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        return object;
    };

    /**
     * Converts this CouncilCandidacyNoteMetadata to JSON.
     * @function toJSON
     * @memberof CouncilCandidacyNoteMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CouncilCandidacyNoteMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CouncilCandidacyNoteMetadata;
})();

$root.ForumPostReaction = (function() {

    /**
     * Properties of a ForumPostReaction.
     * @exports IForumPostReaction
     * @interface IForumPostReaction
     */

    /**
     * Constructs a new ForumPostReaction.
     * @exports ForumPostReaction
     * @classdesc Represents a ForumPostReaction.
     * @implements IForumPostReaction
     * @constructor
     * @param {IForumPostReaction=} [properties] Properties to set
     */
    function ForumPostReaction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new ForumPostReaction instance using the specified properties.
     * @function create
     * @memberof ForumPostReaction
     * @static
     * @param {IForumPostReaction=} [properties] Properties to set
     * @returns {ForumPostReaction} ForumPostReaction instance
     */
    ForumPostReaction.create = function create(properties) {
        return new ForumPostReaction(properties);
    };

    /**
     * Encodes the specified ForumPostReaction message. Does not implicitly {@link ForumPostReaction.verify|verify} messages.
     * @function encode
     * @memberof ForumPostReaction
     * @static
     * @param {IForumPostReaction} message ForumPostReaction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumPostReaction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified ForumPostReaction message, length delimited. Does not implicitly {@link ForumPostReaction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ForumPostReaction
     * @static
     * @param {IForumPostReaction} message ForumPostReaction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumPostReaction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ForumPostReaction message from the specified reader or buffer.
     * @function decode
     * @memberof ForumPostReaction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ForumPostReaction} ForumPostReaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumPostReaction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ForumPostReaction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ForumPostReaction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ForumPostReaction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ForumPostReaction} ForumPostReaction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumPostReaction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ForumPostReaction message.
     * @function verify
     * @memberof ForumPostReaction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ForumPostReaction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a ForumPostReaction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ForumPostReaction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ForumPostReaction} ForumPostReaction
     */
    ForumPostReaction.fromObject = function fromObject(object) {
        if (object instanceof $root.ForumPostReaction)
            return object;
        return new $root.ForumPostReaction();
    };

    /**
     * Creates a plain object from a ForumPostReaction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ForumPostReaction
     * @static
     * @param {ForumPostReaction} message ForumPostReaction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ForumPostReaction.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this ForumPostReaction to JSON.
     * @function toJSON
     * @memberof ForumPostReaction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ForumPostReaction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Reaction enum.
     * @name ForumPostReaction.Reaction
     * @enum {number}
     * @property {number} CANCEL=0 CANCEL value
     * @property {number} LIKE=1 LIKE value
     */
    ForumPostReaction.Reaction = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CANCEL"] = 0;
        values[valuesById[1] = "LIKE"] = 1;
        return values;
    })();

    return ForumPostReaction;
})();

$root.ForumPostMetadata = (function() {

    /**
     * Properties of a ForumPostMetadata.
     * @exports IForumPostMetadata
     * @interface IForumPostMetadata
     * @property {string|null} [text] ForumPostMetadata text
     * @property {number|null} [repliesTo] ForumPostMetadata repliesTo
     */

    /**
     * Constructs a new ForumPostMetadata.
     * @exports ForumPostMetadata
     * @classdesc Represents a ForumPostMetadata.
     * @implements IForumPostMetadata
     * @constructor
     * @param {IForumPostMetadata=} [properties] Properties to set
     */
    function ForumPostMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ForumPostMetadata text.
     * @member {string} text
     * @memberof ForumPostMetadata
     * @instance
     */
    ForumPostMetadata.prototype.text = "";

    /**
     * ForumPostMetadata repliesTo.
     * @member {number} repliesTo
     * @memberof ForumPostMetadata
     * @instance
     */
    ForumPostMetadata.prototype.repliesTo = 0;

    /**
     * Creates a new ForumPostMetadata instance using the specified properties.
     * @function create
     * @memberof ForumPostMetadata
     * @static
     * @param {IForumPostMetadata=} [properties] Properties to set
     * @returns {ForumPostMetadata} ForumPostMetadata instance
     */
    ForumPostMetadata.create = function create(properties) {
        return new ForumPostMetadata(properties);
    };

    /**
     * Encodes the specified ForumPostMetadata message. Does not implicitly {@link ForumPostMetadata.verify|verify} messages.
     * @function encode
     * @memberof ForumPostMetadata
     * @static
     * @param {IForumPostMetadata} message ForumPostMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumPostMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
        if (message.repliesTo != null && Object.hasOwnProperty.call(message, "repliesTo"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.repliesTo);
        return writer;
    };

    /**
     * Encodes the specified ForumPostMetadata message, length delimited. Does not implicitly {@link ForumPostMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ForumPostMetadata
     * @static
     * @param {IForumPostMetadata} message ForumPostMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumPostMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ForumPostMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ForumPostMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ForumPostMetadata} ForumPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumPostMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ForumPostMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.text = reader.string();
                break;
            case 2:
                message.repliesTo = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ForumPostMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ForumPostMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ForumPostMetadata} ForumPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumPostMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ForumPostMetadata message.
     * @function verify
     * @memberof ForumPostMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ForumPostMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        if (message.repliesTo != null && message.hasOwnProperty("repliesTo"))
            if (!$util.isInteger(message.repliesTo))
                return "repliesTo: integer expected";
        return null;
    };

    /**
     * Creates a ForumPostMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ForumPostMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ForumPostMetadata} ForumPostMetadata
     */
    ForumPostMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ForumPostMetadata)
            return object;
        var message = new $root.ForumPostMetadata();
        if (object.text != null)
            message.text = String(object.text);
        if (object.repliesTo != null)
            message.repliesTo = object.repliesTo >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ForumPostMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ForumPostMetadata
     * @static
     * @param {ForumPostMetadata} message ForumPostMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ForumPostMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.text = "";
            object.repliesTo = 0;
        }
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        if (message.repliesTo != null && message.hasOwnProperty("repliesTo"))
            object.repliesTo = message.repliesTo;
        return object;
    };

    /**
     * Converts this ForumPostMetadata to JSON.
     * @function toJSON
     * @memberof ForumPostMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ForumPostMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ForumPostMetadata;
})();

$root.ForumThreadMetadata = (function() {

    /**
     * Properties of a ForumThreadMetadata.
     * @exports IForumThreadMetadata
     * @interface IForumThreadMetadata
     * @property {string|null} [title] ForumThreadMetadata title
     * @property {Array.<string>|null} [tags] ForumThreadMetadata tags
     */

    /**
     * Constructs a new ForumThreadMetadata.
     * @exports ForumThreadMetadata
     * @classdesc Represents a ForumThreadMetadata.
     * @implements IForumThreadMetadata
     * @constructor
     * @param {IForumThreadMetadata=} [properties] Properties to set
     */
    function ForumThreadMetadata(properties) {
        this.tags = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ForumThreadMetadata title.
     * @member {string} title
     * @memberof ForumThreadMetadata
     * @instance
     */
    ForumThreadMetadata.prototype.title = "";

    /**
     * ForumThreadMetadata tags.
     * @member {Array.<string>} tags
     * @memberof ForumThreadMetadata
     * @instance
     */
    ForumThreadMetadata.prototype.tags = $util.emptyArray;

    /**
     * Creates a new ForumThreadMetadata instance using the specified properties.
     * @function create
     * @memberof ForumThreadMetadata
     * @static
     * @param {IForumThreadMetadata=} [properties] Properties to set
     * @returns {ForumThreadMetadata} ForumThreadMetadata instance
     */
    ForumThreadMetadata.create = function create(properties) {
        return new ForumThreadMetadata(properties);
    };

    /**
     * Encodes the specified ForumThreadMetadata message. Does not implicitly {@link ForumThreadMetadata.verify|verify} messages.
     * @function encode
     * @memberof ForumThreadMetadata
     * @static
     * @param {IForumThreadMetadata} message ForumThreadMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumThreadMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.tags != null && message.tags.length)
            for (var i = 0; i < message.tags.length; ++i)
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tags[i]);
        return writer;
    };

    /**
     * Encodes the specified ForumThreadMetadata message, length delimited. Does not implicitly {@link ForumThreadMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ForumThreadMetadata
     * @static
     * @param {IForumThreadMetadata} message ForumThreadMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ForumThreadMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ForumThreadMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ForumThreadMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ForumThreadMetadata} ForumThreadMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumThreadMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ForumThreadMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                if (!(message.tags && message.tags.length))
                    message.tags = [];
                message.tags.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ForumThreadMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ForumThreadMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ForumThreadMetadata} ForumThreadMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ForumThreadMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ForumThreadMetadata message.
     * @function verify
     * @memberof ForumThreadMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ForumThreadMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.tags != null && message.hasOwnProperty("tags")) {
            if (!Array.isArray(message.tags))
                return "tags: array expected";
            for (var i = 0; i < message.tags.length; ++i)
                if (!$util.isString(message.tags[i]))
                    return "tags: string[] expected";
        }
        return null;
    };

    /**
     * Creates a ForumThreadMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ForumThreadMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ForumThreadMetadata} ForumThreadMetadata
     */
    ForumThreadMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ForumThreadMetadata)
            return object;
        var message = new $root.ForumThreadMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.tags) {
            if (!Array.isArray(object.tags))
                throw TypeError(".ForumThreadMetadata.tags: array expected");
            message.tags = [];
            for (var i = 0; i < object.tags.length; ++i)
                message.tags[i] = String(object.tags[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a ForumThreadMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ForumThreadMetadata
     * @static
     * @param {ForumThreadMetadata} message ForumThreadMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ForumThreadMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.tags = [];
        if (options.defaults)
            object.title = "";
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.tags && message.tags.length) {
            object.tags = [];
            for (var j = 0; j < message.tags.length; ++j)
                object.tags[j] = message.tags[j];
        }
        return object;
    };

    /**
     * Converts this ForumThreadMetadata to JSON.
     * @function toJSON
     * @memberof ForumThreadMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ForumThreadMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ForumThreadMetadata;
})();

$root.MembershipMetadata = (function() {

    /**
     * Properties of a MembershipMetadata.
     * @exports IMembershipMetadata
     * @interface IMembershipMetadata
     * @property {string|null} [name] MembershipMetadata name
     * @property {number|null} [avatarObject] MembershipMetadata avatarObject
     * @property {string|null} [avatarUri] MembershipMetadata avatarUri
     * @property {string|null} [about] MembershipMetadata about
     * @property {Array.<MembershipMetadata.IExternalResource>|null} [externalResources] MembershipMetadata externalResources
     */

    /**
     * Constructs a new MembershipMetadata.
     * @exports MembershipMetadata
     * @classdesc Represents a MembershipMetadata.
     * @implements IMembershipMetadata
     * @constructor
     * @param {IMembershipMetadata=} [properties] Properties to set
     */
    function MembershipMetadata(properties) {
        this.externalResources = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MembershipMetadata name.
     * @member {string} name
     * @memberof MembershipMetadata
     * @instance
     */
    MembershipMetadata.prototype.name = "";

    /**
     * MembershipMetadata avatarObject.
     * @member {number|null|undefined} avatarObject
     * @memberof MembershipMetadata
     * @instance
     */
    MembershipMetadata.prototype.avatarObject = null;

    /**
     * MembershipMetadata avatarUri.
     * @member {string|null|undefined} avatarUri
     * @memberof MembershipMetadata
     * @instance
     */
    MembershipMetadata.prototype.avatarUri = null;

    /**
     * MembershipMetadata about.
     * @member {string} about
     * @memberof MembershipMetadata
     * @instance
     */
    MembershipMetadata.prototype.about = "";

    /**
     * MembershipMetadata externalResources.
     * @member {Array.<MembershipMetadata.IExternalResource>} externalResources
     * @memberof MembershipMetadata
     * @instance
     */
    MembershipMetadata.prototype.externalResources = $util.emptyArray;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * MembershipMetadata avatar.
     * @member {"avatarObject"|"avatarUri"|undefined} avatar
     * @memberof MembershipMetadata
     * @instance
     */
    Object.defineProperty(MembershipMetadata.prototype, "avatar", {
        get: $util.oneOfGetter($oneOfFields = ["avatarObject", "avatarUri"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MembershipMetadata instance using the specified properties.
     * @function create
     * @memberof MembershipMetadata
     * @static
     * @param {IMembershipMetadata=} [properties] Properties to set
     * @returns {MembershipMetadata} MembershipMetadata instance
     */
    MembershipMetadata.create = function create(properties) {
        return new MembershipMetadata(properties);
    };

    /**
     * Encodes the specified MembershipMetadata message. Does not implicitly {@link MembershipMetadata.verify|verify} messages.
     * @function encode
     * @memberof MembershipMetadata
     * @static
     * @param {IMembershipMetadata} message MembershipMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MembershipMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.avatarObject != null && Object.hasOwnProperty.call(message, "avatarObject"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.avatarObject);
        if (message.about != null && Object.hasOwnProperty.call(message, "about"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.about);
        if (message.avatarUri != null && Object.hasOwnProperty.call(message, "avatarUri"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.avatarUri);
        if (message.externalResources != null && message.externalResources.length)
            for (var i = 0; i < message.externalResources.length; ++i)
                $root.MembershipMetadata.ExternalResource.encode(message.externalResources[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MembershipMetadata message, length delimited. Does not implicitly {@link MembershipMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MembershipMetadata
     * @static
     * @param {IMembershipMetadata} message MembershipMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MembershipMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MembershipMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof MembershipMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MembershipMetadata} MembershipMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MembershipMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MembershipMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.avatarObject = reader.uint32();
                break;
            case 4:
                message.avatarUri = reader.string();
                break;
            case 3:
                message.about = reader.string();
                break;
            case 5:
                if (!(message.externalResources && message.externalResources.length))
                    message.externalResources = [];
                message.externalResources.push($root.MembershipMetadata.ExternalResource.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MembershipMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MembershipMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MembershipMetadata} MembershipMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MembershipMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MembershipMetadata message.
     * @function verify
     * @memberof MembershipMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MembershipMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.avatarObject != null && message.hasOwnProperty("avatarObject")) {
            properties.avatar = 1;
            if (!$util.isInteger(message.avatarObject))
                return "avatarObject: integer expected";
        }
        if (message.avatarUri != null && message.hasOwnProperty("avatarUri")) {
            if (properties.avatar === 1)
                return "avatar: multiple values";
            properties.avatar = 1;
            if (!$util.isString(message.avatarUri))
                return "avatarUri: string expected";
        }
        if (message.about != null && message.hasOwnProperty("about"))
            if (!$util.isString(message.about))
                return "about: string expected";
        if (message.externalResources != null && message.hasOwnProperty("externalResources")) {
            if (!Array.isArray(message.externalResources))
                return "externalResources: array expected";
            for (var i = 0; i < message.externalResources.length; ++i) {
                var error = $root.MembershipMetadata.ExternalResource.verify(message.externalResources[i]);
                if (error)
                    return "externalResources." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MembershipMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MembershipMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MembershipMetadata} MembershipMetadata
     */
    MembershipMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.MembershipMetadata)
            return object;
        var message = new $root.MembershipMetadata();
        if (object.name != null)
            message.name = String(object.name);
        if (object.avatarObject != null)
            message.avatarObject = object.avatarObject >>> 0;
        if (object.avatarUri != null)
            message.avatarUri = String(object.avatarUri);
        if (object.about != null)
            message.about = String(object.about);
        if (object.externalResources) {
            if (!Array.isArray(object.externalResources))
                throw TypeError(".MembershipMetadata.externalResources: array expected");
            message.externalResources = [];
            for (var i = 0; i < object.externalResources.length; ++i) {
                if (typeof object.externalResources[i] !== "object")
                    throw TypeError(".MembershipMetadata.externalResources: object expected");
                message.externalResources[i] = $root.MembershipMetadata.ExternalResource.fromObject(object.externalResources[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MembershipMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MembershipMetadata
     * @static
     * @param {MembershipMetadata} message MembershipMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MembershipMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.externalResources = [];
        if (options.defaults) {
            object.name = "";
            object.about = "";
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.avatarObject != null && message.hasOwnProperty("avatarObject")) {
            object.avatarObject = message.avatarObject;
            if (options.oneofs)
                object.avatar = "avatarObject";
        }
        if (message.about != null && message.hasOwnProperty("about"))
            object.about = message.about;
        if (message.avatarUri != null && message.hasOwnProperty("avatarUri")) {
            object.avatarUri = message.avatarUri;
            if (options.oneofs)
                object.avatar = "avatarUri";
        }
        if (message.externalResources && message.externalResources.length) {
            object.externalResources = [];
            for (var j = 0; j < message.externalResources.length; ++j)
                object.externalResources[j] = $root.MembershipMetadata.ExternalResource.toObject(message.externalResources[j], options);
        }
        return object;
    };

    /**
     * Converts this MembershipMetadata to JSON.
     * @function toJSON
     * @memberof MembershipMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MembershipMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    MembershipMetadata.ExternalResource = (function() {

        /**
         * Properties of an ExternalResource.
         * @memberof MembershipMetadata
         * @interface IExternalResource
         * @property {MembershipMetadata.ExternalResource.ResourceType|null} [type] ExternalResource type
         * @property {string|null} [value] ExternalResource value
         */

        /**
         * Constructs a new ExternalResource.
         * @memberof MembershipMetadata
         * @classdesc Represents an ExternalResource.
         * @implements IExternalResource
         * @constructor
         * @param {MembershipMetadata.IExternalResource=} [properties] Properties to set
         */
        function ExternalResource(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ExternalResource type.
         * @member {MembershipMetadata.ExternalResource.ResourceType} type
         * @memberof MembershipMetadata.ExternalResource
         * @instance
         */
        ExternalResource.prototype.type = 0;

        /**
         * ExternalResource value.
         * @member {string} value
         * @memberof MembershipMetadata.ExternalResource
         * @instance
         */
        ExternalResource.prototype.value = "";

        /**
         * Creates a new ExternalResource instance using the specified properties.
         * @function create
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {MembershipMetadata.IExternalResource=} [properties] Properties to set
         * @returns {MembershipMetadata.ExternalResource} ExternalResource instance
         */
        ExternalResource.create = function create(properties) {
            return new ExternalResource(properties);
        };

        /**
         * Encodes the specified ExternalResource message. Does not implicitly {@link MembershipMetadata.ExternalResource.verify|verify} messages.
         * @function encode
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {MembershipMetadata.IExternalResource} message ExternalResource message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExternalResource.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified ExternalResource message, length delimited. Does not implicitly {@link MembershipMetadata.ExternalResource.verify|verify} messages.
         * @function encodeDelimited
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {MembershipMetadata.IExternalResource} message ExternalResource message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExternalResource.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExternalResource message from the specified reader or buffer.
         * @function decode
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {MembershipMetadata.ExternalResource} ExternalResource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExternalResource.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MembershipMetadata.ExternalResource();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExternalResource message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {MembershipMetadata.ExternalResource} ExternalResource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExternalResource.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExternalResource message.
         * @function verify
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExternalResource.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    break;
                }
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates an ExternalResource message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {MembershipMetadata.ExternalResource} ExternalResource
         */
        ExternalResource.fromObject = function fromObject(object) {
            if (object instanceof $root.MembershipMetadata.ExternalResource)
                return object;
            var message = new $root.MembershipMetadata.ExternalResource();
            switch (object.type) {
            case "EMAIL":
            case 0:
                message.type = 0;
                break;
            case "HYPERLINK":
            case 1:
                message.type = 1;
                break;
            case "TWITTER":
            case 2:
                message.type = 2;
                break;
            case "TELEGRAM":
            case 3:
                message.type = 3;
                break;
            case "DISCORD":
            case 4:
                message.type = 4;
                break;
            case "FACEBOOK":
            case 5:
                message.type = 5;
                break;
            case "YOUTUBE":
            case 6:
                message.type = 6;
                break;
            case "MATRIX":
            case 7:
                message.type = 7;
                break;
            case "IRC":
            case 8:
                message.type = 8;
                break;
            case "WECHAT":
            case 9:
                message.type = 9;
                break;
            case "WHATSAPP":
            case 10:
                message.type = 10;
                break;
            }
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from an ExternalResource message. Also converts values to other types if specified.
         * @function toObject
         * @memberof MembershipMetadata.ExternalResource
         * @static
         * @param {MembershipMetadata.ExternalResource} message ExternalResource
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExternalResource.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "EMAIL" : 0;
                object.value = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.MembershipMetadata.ExternalResource.ResourceType[message.type] : message.type;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this ExternalResource to JSON.
         * @function toJSON
         * @memberof MembershipMetadata.ExternalResource
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExternalResource.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * ResourceType enum.
         * @name MembershipMetadata.ExternalResource.ResourceType
         * @enum {number}
         * @property {number} EMAIL=0 EMAIL value
         * @property {number} HYPERLINK=1 HYPERLINK value
         * @property {number} TWITTER=2 TWITTER value
         * @property {number} TELEGRAM=3 TELEGRAM value
         * @property {number} DISCORD=4 DISCORD value
         * @property {number} FACEBOOK=5 FACEBOOK value
         * @property {number} YOUTUBE=6 YOUTUBE value
         * @property {number} MATRIX=7 MATRIX value
         * @property {number} IRC=8 IRC value
         * @property {number} WECHAT=9 WECHAT value
         * @property {number} WHATSAPP=10 WHATSAPP value
         */
        ExternalResource.ResourceType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "EMAIL"] = 0;
            values[valuesById[1] = "HYPERLINK"] = 1;
            values[valuesById[2] = "TWITTER"] = 2;
            values[valuesById[3] = "TELEGRAM"] = 3;
            values[valuesById[4] = "DISCORD"] = 4;
            values[valuesById[5] = "FACEBOOK"] = 5;
            values[valuesById[6] = "YOUTUBE"] = 6;
            values[valuesById[7] = "MATRIX"] = 7;
            values[valuesById[8] = "IRC"] = 8;
            values[valuesById[9] = "WECHAT"] = 9;
            values[valuesById[10] = "WHATSAPP"] = 10;
            return values;
        })();

        return ExternalResource;
    })();

    return MembershipMetadata;
})();

$root.ReactVideo = (function() {

    /**
     * Properties of a ReactVideo.
     * @exports IReactVideo
     * @interface IReactVideo
     * @property {Long} videoId ReactVideo videoId
     * @property {ReactVideo.Reaction} reaction ReactVideo reaction
     */

    /**
     * Constructs a new ReactVideo.
     * @exports ReactVideo
     * @classdesc Represents a ReactVideo.
     * @implements IReactVideo
     * @constructor
     * @param {IReactVideo=} [properties] Properties to set
     */
    function ReactVideo(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ReactVideo videoId.
     * @member {Long} videoId
     * @memberof ReactVideo
     * @instance
     */
    ReactVideo.prototype.videoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * ReactVideo reaction.
     * @member {ReactVideo.Reaction} reaction
     * @memberof ReactVideo
     * @instance
     */
    ReactVideo.prototype.reaction = 0;

    /**
     * Creates a new ReactVideo instance using the specified properties.
     * @function create
     * @memberof ReactVideo
     * @static
     * @param {IReactVideo=} [properties] Properties to set
     * @returns {ReactVideo} ReactVideo instance
     */
    ReactVideo.create = function create(properties) {
        return new ReactVideo(properties);
    };

    /**
     * Encodes the specified ReactVideo message. Does not implicitly {@link ReactVideo.verify|verify} messages.
     * @function encode
     * @memberof ReactVideo
     * @static
     * @param {IReactVideo} message ReactVideo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactVideo.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.videoId);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reaction);
        return writer;
    };

    /**
     * Encodes the specified ReactVideo message, length delimited. Does not implicitly {@link ReactVideo.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ReactVideo
     * @static
     * @param {IReactVideo} message ReactVideo message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactVideo.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ReactVideo message from the specified reader or buffer.
     * @function decode
     * @memberof ReactVideo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ReactVideo} ReactVideo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactVideo.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReactVideo();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.videoId = reader.uint64();
                break;
            case 2:
                message.reaction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("videoId"))
            throw $util.ProtocolError("missing required 'videoId'", { instance: message });
        if (!message.hasOwnProperty("reaction"))
            throw $util.ProtocolError("missing required 'reaction'", { instance: message });
        return message;
    };

    /**
     * Decodes a ReactVideo message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ReactVideo
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ReactVideo} ReactVideo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactVideo.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ReactVideo message.
     * @function verify
     * @memberof ReactVideo
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ReactVideo.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.videoId) && !(message.videoId && $util.isInteger(message.videoId.low) && $util.isInteger(message.videoId.high)))
            return "videoId: integer|Long expected";
        switch (message.reaction) {
        default:
            return "reaction: enum value expected";
        case 0:
        case 1:
            break;
        }
        return null;
    };

    /**
     * Creates a ReactVideo message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ReactVideo
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ReactVideo} ReactVideo
     */
    ReactVideo.fromObject = function fromObject(object) {
        if (object instanceof $root.ReactVideo)
            return object;
        var message = new $root.ReactVideo();
        if (object.videoId != null)
            if ($util.Long)
                (message.videoId = $util.Long.fromValue(object.videoId)).unsigned = true;
            else if (typeof object.videoId === "string")
                message.videoId = parseInt(object.videoId, 10);
            else if (typeof object.videoId === "number")
                message.videoId = object.videoId;
            else if (typeof object.videoId === "object")
                message.videoId = new $util.LongBits(object.videoId.low >>> 0, object.videoId.high >>> 0).toNumber(true);
        switch (object.reaction) {
        case "LIKE":
        case 0:
            message.reaction = 0;
            break;
        case "UNLIKE":
        case 1:
            message.reaction = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a ReactVideo message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ReactVideo
     * @static
     * @param {ReactVideo} message ReactVideo
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ReactVideo.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.videoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.videoId = options.longs === String ? "0" : 0;
            object.reaction = options.enums === String ? "LIKE" : 0;
        }
        if (message.videoId != null && message.hasOwnProperty("videoId"))
            if (typeof message.videoId === "number")
                object.videoId = options.longs === String ? String(message.videoId) : message.videoId;
            else
                object.videoId = options.longs === String ? $util.Long.prototype.toString.call(message.videoId) : options.longs === Number ? new $util.LongBits(message.videoId.low >>> 0, message.videoId.high >>> 0).toNumber(true) : message.videoId;
        if (message.reaction != null && message.hasOwnProperty("reaction"))
            object.reaction = options.enums === String ? $root.ReactVideo.Reaction[message.reaction] : message.reaction;
        return object;
    };

    /**
     * Converts this ReactVideo to JSON.
     * @function toJSON
     * @memberof ReactVideo
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ReactVideo.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Reaction enum.
     * @name ReactVideo.Reaction
     * @enum {number}
     * @property {number} LIKE=0 LIKE value
     * @property {number} UNLIKE=1 UNLIKE value
     */
    ReactVideo.Reaction = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "LIKE"] = 0;
        values[valuesById[1] = "UNLIKE"] = 1;
        return values;
    })();

    return ReactVideo;
})();

$root.ReactComment = (function() {

    /**
     * Properties of a ReactComment.
     * @exports IReactComment
     * @interface IReactComment
     * @property {string} commentId ReactComment commentId
     * @property {number} reactionId ReactComment reactionId
     */

    /**
     * Constructs a new ReactComment.
     * @exports ReactComment
     * @classdesc Represents a ReactComment.
     * @implements IReactComment
     * @constructor
     * @param {IReactComment=} [properties] Properties to set
     */
    function ReactComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ReactComment commentId.
     * @member {string} commentId
     * @memberof ReactComment
     * @instance
     */
    ReactComment.prototype.commentId = "";

    /**
     * ReactComment reactionId.
     * @member {number} reactionId
     * @memberof ReactComment
     * @instance
     */
    ReactComment.prototype.reactionId = 0;

    /**
     * Creates a new ReactComment instance using the specified properties.
     * @function create
     * @memberof ReactComment
     * @static
     * @param {IReactComment=} [properties] Properties to set
     * @returns {ReactComment} ReactComment instance
     */
    ReactComment.create = function create(properties) {
        return new ReactComment(properties);
    };

    /**
     * Encodes the specified ReactComment message. Does not implicitly {@link ReactComment.verify|verify} messages.
     * @function encode
     * @memberof ReactComment
     * @static
     * @param {IReactComment} message ReactComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.commentId);
        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.reactionId);
        return writer;
    };

    /**
     * Encodes the specified ReactComment message, length delimited. Does not implicitly {@link ReactComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ReactComment
     * @static
     * @param {IReactComment} message ReactComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ReactComment message from the specified reader or buffer.
     * @function decode
     * @memberof ReactComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ReactComment} ReactComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReactComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.commentId = reader.string();
                break;
            case 2:
                message.reactionId = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("commentId"))
            throw $util.ProtocolError("missing required 'commentId'", { instance: message });
        if (!message.hasOwnProperty("reactionId"))
            throw $util.ProtocolError("missing required 'reactionId'", { instance: message });
        return message;
    };

    /**
     * Decodes a ReactComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ReactComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ReactComment} ReactComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ReactComment message.
     * @function verify
     * @memberof ReactComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ReactComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.commentId))
            return "commentId: string expected";
        if (!$util.isInteger(message.reactionId))
            return "reactionId: integer expected";
        return null;
    };

    /**
     * Creates a ReactComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ReactComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ReactComment} ReactComment
     */
    ReactComment.fromObject = function fromObject(object) {
        if (object instanceof $root.ReactComment)
            return object;
        var message = new $root.ReactComment();
        if (object.commentId != null)
            message.commentId = String(object.commentId);
        if (object.reactionId != null)
            message.reactionId = object.reactionId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ReactComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ReactComment
     * @static
     * @param {ReactComment} message ReactComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ReactComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.commentId = "";
            object.reactionId = 0;
        }
        if (message.commentId != null && message.hasOwnProperty("commentId"))
            object.commentId = message.commentId;
        if (message.reactionId != null && message.hasOwnProperty("reactionId"))
            object.reactionId = message.reactionId;
        return object;
    };

    /**
     * Converts this ReactComment to JSON.
     * @function toJSON
     * @memberof ReactComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ReactComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ReactComment;
})();

$root.CreateComment = (function() {

    /**
     * Properties of a CreateComment.
     * @exports ICreateComment
     * @interface ICreateComment
     * @property {Long} videoId CreateComment videoId
     * @property {string|null} [parentCommentId] CreateComment parentCommentId
     * @property {string} body CreateComment body
     */

    /**
     * Constructs a new CreateComment.
     * @exports CreateComment
     * @classdesc Represents a CreateComment.
     * @implements ICreateComment
     * @constructor
     * @param {ICreateComment=} [properties] Properties to set
     */
    function CreateComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateComment videoId.
     * @member {Long} videoId
     * @memberof CreateComment
     * @instance
     */
    CreateComment.prototype.videoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * CreateComment parentCommentId.
     * @member {string} parentCommentId
     * @memberof CreateComment
     * @instance
     */
    CreateComment.prototype.parentCommentId = "";

    /**
     * CreateComment body.
     * @member {string} body
     * @memberof CreateComment
     * @instance
     */
    CreateComment.prototype.body = "";

    /**
     * Creates a new CreateComment instance using the specified properties.
     * @function create
     * @memberof CreateComment
     * @static
     * @param {ICreateComment=} [properties] Properties to set
     * @returns {CreateComment} CreateComment instance
     */
    CreateComment.create = function create(properties) {
        return new CreateComment(properties);
    };

    /**
     * Encodes the specified CreateComment message. Does not implicitly {@link CreateComment.verify|verify} messages.
     * @function encode
     * @memberof CreateComment
     * @static
     * @param {ICreateComment} message CreateComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.videoId);
        if (message.parentCommentId != null && Object.hasOwnProperty.call(message, "parentCommentId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.parentCommentId);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.body);
        return writer;
    };

    /**
     * Encodes the specified CreateComment message, length delimited. Does not implicitly {@link CreateComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateComment
     * @static
     * @param {ICreateComment} message CreateComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateComment message from the specified reader or buffer.
     * @function decode
     * @memberof CreateComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateComment} CreateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.videoId = reader.uint64();
                break;
            case 2:
                message.parentCommentId = reader.string();
                break;
            case 3:
                message.body = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("videoId"))
            throw $util.ProtocolError("missing required 'videoId'", { instance: message });
        if (!message.hasOwnProperty("body"))
            throw $util.ProtocolError("missing required 'body'", { instance: message });
        return message;
    };

    /**
     * Decodes a CreateComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateComment} CreateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateComment message.
     * @function verify
     * @memberof CreateComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.videoId) && !(message.videoId && $util.isInteger(message.videoId.low) && $util.isInteger(message.videoId.high)))
            return "videoId: integer|Long expected";
        if (message.parentCommentId != null && message.hasOwnProperty("parentCommentId"))
            if (!$util.isString(message.parentCommentId))
                return "parentCommentId: string expected";
        if (!$util.isString(message.body))
            return "body: string expected";
        return null;
    };

    /**
     * Creates a CreateComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateComment} CreateComment
     */
    CreateComment.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateComment)
            return object;
        var message = new $root.CreateComment();
        if (object.videoId != null)
            if ($util.Long)
                (message.videoId = $util.Long.fromValue(object.videoId)).unsigned = true;
            else if (typeof object.videoId === "string")
                message.videoId = parseInt(object.videoId, 10);
            else if (typeof object.videoId === "number")
                message.videoId = object.videoId;
            else if (typeof object.videoId === "object")
                message.videoId = new $util.LongBits(object.videoId.low >>> 0, object.videoId.high >>> 0).toNumber(true);
        if (object.parentCommentId != null)
            message.parentCommentId = String(object.parentCommentId);
        if (object.body != null)
            message.body = String(object.body);
        return message;
    };

    /**
     * Creates a plain object from a CreateComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateComment
     * @static
     * @param {CreateComment} message CreateComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.videoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.videoId = options.longs === String ? "0" : 0;
            object.parentCommentId = "";
            object.body = "";
        }
        if (message.videoId != null && message.hasOwnProperty("videoId"))
            if (typeof message.videoId === "number")
                object.videoId = options.longs === String ? String(message.videoId) : message.videoId;
            else
                object.videoId = options.longs === String ? $util.Long.prototype.toString.call(message.videoId) : options.longs === Number ? new $util.LongBits(message.videoId.low >>> 0, message.videoId.high >>> 0).toNumber(true) : message.videoId;
        if (message.parentCommentId != null && message.hasOwnProperty("parentCommentId"))
            object.parentCommentId = message.parentCommentId;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        return object;
    };

    /**
     * Converts this CreateComment to JSON.
     * @function toJSON
     * @memberof CreateComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateComment;
})();

$root.EditComment = (function() {

    /**
     * Properties of an EditComment.
     * @exports IEditComment
     * @interface IEditComment
     * @property {string} commentId EditComment commentId
     * @property {string} newBody EditComment newBody
     */

    /**
     * Constructs a new EditComment.
     * @exports EditComment
     * @classdesc Represents an EditComment.
     * @implements IEditComment
     * @constructor
     * @param {IEditComment=} [properties] Properties to set
     */
    function EditComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EditComment commentId.
     * @member {string} commentId
     * @memberof EditComment
     * @instance
     */
    EditComment.prototype.commentId = "";

    /**
     * EditComment newBody.
     * @member {string} newBody
     * @memberof EditComment
     * @instance
     */
    EditComment.prototype.newBody = "";

    /**
     * Creates a new EditComment instance using the specified properties.
     * @function create
     * @memberof EditComment
     * @static
     * @param {IEditComment=} [properties] Properties to set
     * @returns {EditComment} EditComment instance
     */
    EditComment.create = function create(properties) {
        return new EditComment(properties);
    };

    /**
     * Encodes the specified EditComment message. Does not implicitly {@link EditComment.verify|verify} messages.
     * @function encode
     * @memberof EditComment
     * @static
     * @param {IEditComment} message EditComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EditComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.commentId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.newBody);
        return writer;
    };

    /**
     * Encodes the specified EditComment message, length delimited. Does not implicitly {@link EditComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EditComment
     * @static
     * @param {IEditComment} message EditComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EditComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EditComment message from the specified reader or buffer.
     * @function decode
     * @memberof EditComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EditComment} EditComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EditComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EditComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.commentId = reader.string();
                break;
            case 2:
                message.newBody = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("commentId"))
            throw $util.ProtocolError("missing required 'commentId'", { instance: message });
        if (!message.hasOwnProperty("newBody"))
            throw $util.ProtocolError("missing required 'newBody'", { instance: message });
        return message;
    };

    /**
     * Decodes an EditComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EditComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EditComment} EditComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EditComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an EditComment message.
     * @function verify
     * @memberof EditComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    EditComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.commentId))
            return "commentId: string expected";
        if (!$util.isString(message.newBody))
            return "newBody: string expected";
        return null;
    };

    /**
     * Creates an EditComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof EditComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {EditComment} EditComment
     */
    EditComment.fromObject = function fromObject(object) {
        if (object instanceof $root.EditComment)
            return object;
        var message = new $root.EditComment();
        if (object.commentId != null)
            message.commentId = String(object.commentId);
        if (object.newBody != null)
            message.newBody = String(object.newBody);
        return message;
    };

    /**
     * Creates a plain object from an EditComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof EditComment
     * @static
     * @param {EditComment} message EditComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    EditComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.commentId = "";
            object.newBody = "";
        }
        if (message.commentId != null && message.hasOwnProperty("commentId"))
            object.commentId = message.commentId;
        if (message.newBody != null && message.hasOwnProperty("newBody"))
            object.newBody = message.newBody;
        return object;
    };

    /**
     * Converts this EditComment to JSON.
     * @function toJSON
     * @memberof EditComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    EditComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return EditComment;
})();

$root.DeleteComment = (function() {

    /**
     * Properties of a DeleteComment.
     * @exports IDeleteComment
     * @interface IDeleteComment
     * @property {string} commentId DeleteComment commentId
     */

    /**
     * Constructs a new DeleteComment.
     * @exports DeleteComment
     * @classdesc Represents a DeleteComment.
     * @implements IDeleteComment
     * @constructor
     * @param {IDeleteComment=} [properties] Properties to set
     */
    function DeleteComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DeleteComment commentId.
     * @member {string} commentId
     * @memberof DeleteComment
     * @instance
     */
    DeleteComment.prototype.commentId = "";

    /**
     * Creates a new DeleteComment instance using the specified properties.
     * @function create
     * @memberof DeleteComment
     * @static
     * @param {IDeleteComment=} [properties] Properties to set
     * @returns {DeleteComment} DeleteComment instance
     */
    DeleteComment.create = function create(properties) {
        return new DeleteComment(properties);
    };

    /**
     * Encodes the specified DeleteComment message. Does not implicitly {@link DeleteComment.verify|verify} messages.
     * @function encode
     * @memberof DeleteComment
     * @static
     * @param {IDeleteComment} message DeleteComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeleteComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.commentId);
        return writer;
    };

    /**
     * Encodes the specified DeleteComment message, length delimited. Does not implicitly {@link DeleteComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DeleteComment
     * @static
     * @param {IDeleteComment} message DeleteComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DeleteComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DeleteComment message from the specified reader or buffer.
     * @function decode
     * @memberof DeleteComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DeleteComment} DeleteComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeleteComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DeleteComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.commentId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("commentId"))
            throw $util.ProtocolError("missing required 'commentId'", { instance: message });
        return message;
    };

    /**
     * Decodes a DeleteComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DeleteComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DeleteComment} DeleteComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DeleteComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DeleteComment message.
     * @function verify
     * @memberof DeleteComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DeleteComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.commentId))
            return "commentId: string expected";
        return null;
    };

    /**
     * Creates a DeleteComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DeleteComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DeleteComment} DeleteComment
     */
    DeleteComment.fromObject = function fromObject(object) {
        if (object instanceof $root.DeleteComment)
            return object;
        var message = new $root.DeleteComment();
        if (object.commentId != null)
            message.commentId = String(object.commentId);
        return message;
    };

    /**
     * Creates a plain object from a DeleteComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DeleteComment
     * @static
     * @param {DeleteComment} message DeleteComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DeleteComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.commentId = "";
        if (message.commentId != null && message.hasOwnProperty("commentId"))
            object.commentId = message.commentId;
        return object;
    };

    /**
     * Converts this DeleteComment to JSON.
     * @function toJSON
     * @memberof DeleteComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DeleteComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DeleteComment;
})();

$root.PinOrUnpinComment = (function() {

    /**
     * Properties of a PinOrUnpinComment.
     * @exports IPinOrUnpinComment
     * @interface IPinOrUnpinComment
     * @property {Long} videoId PinOrUnpinComment videoId
     * @property {string} commentId PinOrUnpinComment commentId
     * @property {PinOrUnpinComment.Option} option PinOrUnpinComment option
     */

    /**
     * Constructs a new PinOrUnpinComment.
     * @exports PinOrUnpinComment
     * @classdesc Represents a PinOrUnpinComment.
     * @implements IPinOrUnpinComment
     * @constructor
     * @param {IPinOrUnpinComment=} [properties] Properties to set
     */
    function PinOrUnpinComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PinOrUnpinComment videoId.
     * @member {Long} videoId
     * @memberof PinOrUnpinComment
     * @instance
     */
    PinOrUnpinComment.prototype.videoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * PinOrUnpinComment commentId.
     * @member {string} commentId
     * @memberof PinOrUnpinComment
     * @instance
     */
    PinOrUnpinComment.prototype.commentId = "";

    /**
     * PinOrUnpinComment option.
     * @member {PinOrUnpinComment.Option} option
     * @memberof PinOrUnpinComment
     * @instance
     */
    PinOrUnpinComment.prototype.option = 0;

    /**
     * Creates a new PinOrUnpinComment instance using the specified properties.
     * @function create
     * @memberof PinOrUnpinComment
     * @static
     * @param {IPinOrUnpinComment=} [properties] Properties to set
     * @returns {PinOrUnpinComment} PinOrUnpinComment instance
     */
    PinOrUnpinComment.create = function create(properties) {
        return new PinOrUnpinComment(properties);
    };

    /**
     * Encodes the specified PinOrUnpinComment message. Does not implicitly {@link PinOrUnpinComment.verify|verify} messages.
     * @function encode
     * @memberof PinOrUnpinComment
     * @static
     * @param {IPinOrUnpinComment} message PinOrUnpinComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PinOrUnpinComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.videoId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.commentId);
        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.option);
        return writer;
    };

    /**
     * Encodes the specified PinOrUnpinComment message, length delimited. Does not implicitly {@link PinOrUnpinComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PinOrUnpinComment
     * @static
     * @param {IPinOrUnpinComment} message PinOrUnpinComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PinOrUnpinComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PinOrUnpinComment message from the specified reader or buffer.
     * @function decode
     * @memberof PinOrUnpinComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PinOrUnpinComment} PinOrUnpinComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PinOrUnpinComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PinOrUnpinComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.videoId = reader.uint64();
                break;
            case 2:
                message.commentId = reader.string();
                break;
            case 3:
                message.option = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("videoId"))
            throw $util.ProtocolError("missing required 'videoId'", { instance: message });
        if (!message.hasOwnProperty("commentId"))
            throw $util.ProtocolError("missing required 'commentId'", { instance: message });
        if (!message.hasOwnProperty("option"))
            throw $util.ProtocolError("missing required 'option'", { instance: message });
        return message;
    };

    /**
     * Decodes a PinOrUnpinComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PinOrUnpinComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PinOrUnpinComment} PinOrUnpinComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PinOrUnpinComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PinOrUnpinComment message.
     * @function verify
     * @memberof PinOrUnpinComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PinOrUnpinComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.videoId) && !(message.videoId && $util.isInteger(message.videoId.low) && $util.isInteger(message.videoId.high)))
            return "videoId: integer|Long expected";
        if (!$util.isString(message.commentId))
            return "commentId: string expected";
        switch (message.option) {
        default:
            return "option: enum value expected";
        case 0:
        case 1:
            break;
        }
        return null;
    };

    /**
     * Creates a PinOrUnpinComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PinOrUnpinComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PinOrUnpinComment} PinOrUnpinComment
     */
    PinOrUnpinComment.fromObject = function fromObject(object) {
        if (object instanceof $root.PinOrUnpinComment)
            return object;
        var message = new $root.PinOrUnpinComment();
        if (object.videoId != null)
            if ($util.Long)
                (message.videoId = $util.Long.fromValue(object.videoId)).unsigned = true;
            else if (typeof object.videoId === "string")
                message.videoId = parseInt(object.videoId, 10);
            else if (typeof object.videoId === "number")
                message.videoId = object.videoId;
            else if (typeof object.videoId === "object")
                message.videoId = new $util.LongBits(object.videoId.low >>> 0, object.videoId.high >>> 0).toNumber(true);
        if (object.commentId != null)
            message.commentId = String(object.commentId);
        switch (object.option) {
        case "PIN":
        case 0:
            message.option = 0;
            break;
        case "UNPIN":
        case 1:
            message.option = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a PinOrUnpinComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PinOrUnpinComment
     * @static
     * @param {PinOrUnpinComment} message PinOrUnpinComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PinOrUnpinComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.videoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.videoId = options.longs === String ? "0" : 0;
            object.commentId = "";
            object.option = options.enums === String ? "PIN" : 0;
        }
        if (message.videoId != null && message.hasOwnProperty("videoId"))
            if (typeof message.videoId === "number")
                object.videoId = options.longs === String ? String(message.videoId) : message.videoId;
            else
                object.videoId = options.longs === String ? $util.Long.prototype.toString.call(message.videoId) : options.longs === Number ? new $util.LongBits(message.videoId.low >>> 0, message.videoId.high >>> 0).toNumber(true) : message.videoId;
        if (message.commentId != null && message.hasOwnProperty("commentId"))
            object.commentId = message.commentId;
        if (message.option != null && message.hasOwnProperty("option"))
            object.option = options.enums === String ? $root.PinOrUnpinComment.Option[message.option] : message.option;
        return object;
    };

    /**
     * Converts this PinOrUnpinComment to JSON.
     * @function toJSON
     * @memberof PinOrUnpinComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PinOrUnpinComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Option enum.
     * @name PinOrUnpinComment.Option
     * @enum {number}
     * @property {number} PIN=0 PIN value
     * @property {number} UNPIN=1 UNPIN value
     */
    PinOrUnpinComment.Option = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PIN"] = 0;
        values[valuesById[1] = "UNPIN"] = 1;
        return values;
    })();

    return PinOrUnpinComment;
})();

$root.ModerateComment = (function() {

    /**
     * Properties of a ModerateComment.
     * @exports IModerateComment
     * @interface IModerateComment
     * @property {string} commentId ModerateComment commentId
     * @property {string} rationale ModerateComment rationale
     */

    /**
     * Constructs a new ModerateComment.
     * @exports ModerateComment
     * @classdesc Represents a ModerateComment.
     * @implements IModerateComment
     * @constructor
     * @param {IModerateComment=} [properties] Properties to set
     */
    function ModerateComment(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ModerateComment commentId.
     * @member {string} commentId
     * @memberof ModerateComment
     * @instance
     */
    ModerateComment.prototype.commentId = "";

    /**
     * ModerateComment rationale.
     * @member {string} rationale
     * @memberof ModerateComment
     * @instance
     */
    ModerateComment.prototype.rationale = "";

    /**
     * Creates a new ModerateComment instance using the specified properties.
     * @function create
     * @memberof ModerateComment
     * @static
     * @param {IModerateComment=} [properties] Properties to set
     * @returns {ModerateComment} ModerateComment instance
     */
    ModerateComment.create = function create(properties) {
        return new ModerateComment(properties);
    };

    /**
     * Encodes the specified ModerateComment message. Does not implicitly {@link ModerateComment.verify|verify} messages.
     * @function encode
     * @memberof ModerateComment
     * @static
     * @param {IModerateComment} message ModerateComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ModerateComment.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.commentId);
        writer.uint32(/* id 2, wireType 2 =*/18).string(message.rationale);
        return writer;
    };

    /**
     * Encodes the specified ModerateComment message, length delimited. Does not implicitly {@link ModerateComment.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ModerateComment
     * @static
     * @param {IModerateComment} message ModerateComment message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ModerateComment.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ModerateComment message from the specified reader or buffer.
     * @function decode
     * @memberof ModerateComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ModerateComment} ModerateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ModerateComment.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ModerateComment();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.commentId = reader.string();
                break;
            case 2:
                message.rationale = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("commentId"))
            throw $util.ProtocolError("missing required 'commentId'", { instance: message });
        if (!message.hasOwnProperty("rationale"))
            throw $util.ProtocolError("missing required 'rationale'", { instance: message });
        return message;
    };

    /**
     * Decodes a ModerateComment message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ModerateComment
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ModerateComment} ModerateComment
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ModerateComment.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ModerateComment message.
     * @function verify
     * @memberof ModerateComment
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ModerateComment.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.commentId))
            return "commentId: string expected";
        if (!$util.isString(message.rationale))
            return "rationale: string expected";
        return null;
    };

    /**
     * Creates a ModerateComment message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ModerateComment
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ModerateComment} ModerateComment
     */
    ModerateComment.fromObject = function fromObject(object) {
        if (object instanceof $root.ModerateComment)
            return object;
        var message = new $root.ModerateComment();
        if (object.commentId != null)
            message.commentId = String(object.commentId);
        if (object.rationale != null)
            message.rationale = String(object.rationale);
        return message;
    };

    /**
     * Creates a plain object from a ModerateComment message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ModerateComment
     * @static
     * @param {ModerateComment} message ModerateComment
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ModerateComment.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.commentId = "";
            object.rationale = "";
        }
        if (message.commentId != null && message.hasOwnProperty("commentId"))
            object.commentId = message.commentId;
        if (message.rationale != null && message.hasOwnProperty("rationale"))
            object.rationale = message.rationale;
        return object;
    };

    /**
     * Converts this ModerateComment to JSON.
     * @function toJSON
     * @memberof ModerateComment
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ModerateComment.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ModerateComment;
})();

$root.BanOrUnbanMemberFromChannel = (function() {

    /**
     * Properties of a BanOrUnbanMemberFromChannel.
     * @exports IBanOrUnbanMemberFromChannel
     * @interface IBanOrUnbanMemberFromChannel
     * @property {Long} memberId BanOrUnbanMemberFromChannel memberId
     * @property {BanOrUnbanMemberFromChannel.Option} option BanOrUnbanMemberFromChannel option
     */

    /**
     * Constructs a new BanOrUnbanMemberFromChannel.
     * @exports BanOrUnbanMemberFromChannel
     * @classdesc Represents a BanOrUnbanMemberFromChannel.
     * @implements IBanOrUnbanMemberFromChannel
     * @constructor
     * @param {IBanOrUnbanMemberFromChannel=} [properties] Properties to set
     */
    function BanOrUnbanMemberFromChannel(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BanOrUnbanMemberFromChannel memberId.
     * @member {Long} memberId
     * @memberof BanOrUnbanMemberFromChannel
     * @instance
     */
    BanOrUnbanMemberFromChannel.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * BanOrUnbanMemberFromChannel option.
     * @member {BanOrUnbanMemberFromChannel.Option} option
     * @memberof BanOrUnbanMemberFromChannel
     * @instance
     */
    BanOrUnbanMemberFromChannel.prototype.option = 0;

    /**
     * Creates a new BanOrUnbanMemberFromChannel instance using the specified properties.
     * @function create
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {IBanOrUnbanMemberFromChannel=} [properties] Properties to set
     * @returns {BanOrUnbanMemberFromChannel} BanOrUnbanMemberFromChannel instance
     */
    BanOrUnbanMemberFromChannel.create = function create(properties) {
        return new BanOrUnbanMemberFromChannel(properties);
    };

    /**
     * Encodes the specified BanOrUnbanMemberFromChannel message. Does not implicitly {@link BanOrUnbanMemberFromChannel.verify|verify} messages.
     * @function encode
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {IBanOrUnbanMemberFromChannel} message BanOrUnbanMemberFromChannel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BanOrUnbanMemberFromChannel.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.memberId);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.option);
        return writer;
    };

    /**
     * Encodes the specified BanOrUnbanMemberFromChannel message, length delimited. Does not implicitly {@link BanOrUnbanMemberFromChannel.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {IBanOrUnbanMemberFromChannel} message BanOrUnbanMemberFromChannel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BanOrUnbanMemberFromChannel.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BanOrUnbanMemberFromChannel message from the specified reader or buffer.
     * @function decode
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BanOrUnbanMemberFromChannel} BanOrUnbanMemberFromChannel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BanOrUnbanMemberFromChannel.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.BanOrUnbanMemberFromChannel();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.memberId = reader.uint64();
                break;
            case 2:
                message.option = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("memberId"))
            throw $util.ProtocolError("missing required 'memberId'", { instance: message });
        if (!message.hasOwnProperty("option"))
            throw $util.ProtocolError("missing required 'option'", { instance: message });
        return message;
    };

    /**
     * Decodes a BanOrUnbanMemberFromChannel message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BanOrUnbanMemberFromChannel} BanOrUnbanMemberFromChannel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BanOrUnbanMemberFromChannel.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BanOrUnbanMemberFromChannel message.
     * @function verify
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BanOrUnbanMemberFromChannel.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
            return "memberId: integer|Long expected";
        switch (message.option) {
        default:
            return "option: enum value expected";
        case 0:
        case 1:
            break;
        }
        return null;
    };

    /**
     * Creates a BanOrUnbanMemberFromChannel message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BanOrUnbanMemberFromChannel} BanOrUnbanMemberFromChannel
     */
    BanOrUnbanMemberFromChannel.fromObject = function fromObject(object) {
        if (object instanceof $root.BanOrUnbanMemberFromChannel)
            return object;
        var message = new $root.BanOrUnbanMemberFromChannel();
        if (object.memberId != null)
            if ($util.Long)
                (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = true;
            else if (typeof object.memberId === "string")
                message.memberId = parseInt(object.memberId, 10);
            else if (typeof object.memberId === "number")
                message.memberId = object.memberId;
            else if (typeof object.memberId === "object")
                message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber(true);
        switch (object.option) {
        case "BAN":
        case 0:
            message.option = 0;
            break;
        case "UNBAN":
        case 1:
            message.option = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a BanOrUnbanMemberFromChannel message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BanOrUnbanMemberFromChannel
     * @static
     * @param {BanOrUnbanMemberFromChannel} message BanOrUnbanMemberFromChannel
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BanOrUnbanMemberFromChannel.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.memberId = options.longs === String ? "0" : 0;
            object.option = options.enums === String ? "BAN" : 0;
        }
        if (message.memberId != null && message.hasOwnProperty("memberId"))
            if (typeof message.memberId === "number")
                object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
            else
                object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber(true) : message.memberId;
        if (message.option != null && message.hasOwnProperty("option"))
            object.option = options.enums === String ? $root.BanOrUnbanMemberFromChannel.Option[message.option] : message.option;
        return object;
    };

    /**
     * Converts this BanOrUnbanMemberFromChannel to JSON.
     * @function toJSON
     * @memberof BanOrUnbanMemberFromChannel
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BanOrUnbanMemberFromChannel.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Option enum.
     * @name BanOrUnbanMemberFromChannel.Option
     * @enum {number}
     * @property {number} BAN=0 BAN value
     * @property {number} UNBAN=1 UNBAN value
     */
    BanOrUnbanMemberFromChannel.Option = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "BAN"] = 0;
        values[valuesById[1] = "UNBAN"] = 1;
        return values;
    })();

    return BanOrUnbanMemberFromChannel;
})();

$root.VideoReactionsPreference = (function() {

    /**
     * Properties of a VideoReactionsPreference.
     * @exports IVideoReactionsPreference
     * @interface IVideoReactionsPreference
     * @property {Long} videoId VideoReactionsPreference videoId
     * @property {VideoReactionsPreference.Option} option VideoReactionsPreference option
     */

    /**
     * Constructs a new VideoReactionsPreference.
     * @exports VideoReactionsPreference
     * @classdesc Represents a VideoReactionsPreference.
     * @implements IVideoReactionsPreference
     * @constructor
     * @param {IVideoReactionsPreference=} [properties] Properties to set
     */
    function VideoReactionsPreference(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * VideoReactionsPreference videoId.
     * @member {Long} videoId
     * @memberof VideoReactionsPreference
     * @instance
     */
    VideoReactionsPreference.prototype.videoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * VideoReactionsPreference option.
     * @member {VideoReactionsPreference.Option} option
     * @memberof VideoReactionsPreference
     * @instance
     */
    VideoReactionsPreference.prototype.option = 0;

    /**
     * Creates a new VideoReactionsPreference instance using the specified properties.
     * @function create
     * @memberof VideoReactionsPreference
     * @static
     * @param {IVideoReactionsPreference=} [properties] Properties to set
     * @returns {VideoReactionsPreference} VideoReactionsPreference instance
     */
    VideoReactionsPreference.create = function create(properties) {
        return new VideoReactionsPreference(properties);
    };

    /**
     * Encodes the specified VideoReactionsPreference message. Does not implicitly {@link VideoReactionsPreference.verify|verify} messages.
     * @function encode
     * @memberof VideoReactionsPreference
     * @static
     * @param {IVideoReactionsPreference} message VideoReactionsPreference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VideoReactionsPreference.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.videoId);
        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.option);
        return writer;
    };

    /**
     * Encodes the specified VideoReactionsPreference message, length delimited. Does not implicitly {@link VideoReactionsPreference.verify|verify} messages.
     * @function encodeDelimited
     * @memberof VideoReactionsPreference
     * @static
     * @param {IVideoReactionsPreference} message VideoReactionsPreference message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VideoReactionsPreference.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a VideoReactionsPreference message from the specified reader or buffer.
     * @function decode
     * @memberof VideoReactionsPreference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {VideoReactionsPreference} VideoReactionsPreference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VideoReactionsPreference.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.VideoReactionsPreference();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.videoId = reader.uint64();
                break;
            case 2:
                message.option = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("videoId"))
            throw $util.ProtocolError("missing required 'videoId'", { instance: message });
        if (!message.hasOwnProperty("option"))
            throw $util.ProtocolError("missing required 'option'", { instance: message });
        return message;
    };

    /**
     * Decodes a VideoReactionsPreference message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof VideoReactionsPreference
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {VideoReactionsPreference} VideoReactionsPreference
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VideoReactionsPreference.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a VideoReactionsPreference message.
     * @function verify
     * @memberof VideoReactionsPreference
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    VideoReactionsPreference.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isInteger(message.videoId) && !(message.videoId && $util.isInteger(message.videoId.low) && $util.isInteger(message.videoId.high)))
            return "videoId: integer|Long expected";
        switch (message.option) {
        default:
            return "option: enum value expected";
        case 0:
        case 1:
            break;
        }
        return null;
    };

    /**
     * Creates a VideoReactionsPreference message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof VideoReactionsPreference
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {VideoReactionsPreference} VideoReactionsPreference
     */
    VideoReactionsPreference.fromObject = function fromObject(object) {
        if (object instanceof $root.VideoReactionsPreference)
            return object;
        var message = new $root.VideoReactionsPreference();
        if (object.videoId != null)
            if ($util.Long)
                (message.videoId = $util.Long.fromValue(object.videoId)).unsigned = true;
            else if (typeof object.videoId === "string")
                message.videoId = parseInt(object.videoId, 10);
            else if (typeof object.videoId === "number")
                message.videoId = object.videoId;
            else if (typeof object.videoId === "object")
                message.videoId = new $util.LongBits(object.videoId.low >>> 0, object.videoId.high >>> 0).toNumber(true);
        switch (object.option) {
        case "ENABLE":
        case 0:
            message.option = 0;
            break;
        case "DISABLE":
        case 1:
            message.option = 1;
            break;
        }
        return message;
    };

    /**
     * Creates a plain object from a VideoReactionsPreference message. Also converts values to other types if specified.
     * @function toObject
     * @memberof VideoReactionsPreference
     * @static
     * @param {VideoReactionsPreference} message VideoReactionsPreference
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    VideoReactionsPreference.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.videoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.videoId = options.longs === String ? "0" : 0;
            object.option = options.enums === String ? "ENABLE" : 0;
        }
        if (message.videoId != null && message.hasOwnProperty("videoId"))
            if (typeof message.videoId === "number")
                object.videoId = options.longs === String ? String(message.videoId) : message.videoId;
            else
                object.videoId = options.longs === String ? $util.Long.prototype.toString.call(message.videoId) : options.longs === Number ? new $util.LongBits(message.videoId.low >>> 0, message.videoId.high >>> 0).toNumber(true) : message.videoId;
        if (message.option != null && message.hasOwnProperty("option"))
            object.option = options.enums === String ? $root.VideoReactionsPreference.Option[message.option] : message.option;
        return object;
    };

    /**
     * Converts this VideoReactionsPreference to JSON.
     * @function toJSON
     * @memberof VideoReactionsPreference
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    VideoReactionsPreference.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Option enum.
     * @name VideoReactionsPreference.Option
     * @enum {number}
     * @property {number} ENABLE=0 ENABLE value
     * @property {number} DISABLE=1 DISABLE value
     */
    VideoReactionsPreference.Option = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENABLE"] = 0;
        values[valuesById[1] = "DISABLE"] = 1;
        return values;
    })();

    return VideoReactionsPreference;
})();

$root.CreateVideoCategory = (function() {

    /**
     * Properties of a CreateVideoCategory.
     * @exports ICreateVideoCategory
     * @interface ICreateVideoCategory
     * @property {string} name CreateVideoCategory name
     * @property {string|null} [description] CreateVideoCategory description
     * @property {string|null} [parentCategoryId] CreateVideoCategory parentCategoryId
     */

    /**
     * Constructs a new CreateVideoCategory.
     * @exports CreateVideoCategory
     * @classdesc Represents a CreateVideoCategory.
     * @implements ICreateVideoCategory
     * @constructor
     * @param {ICreateVideoCategory=} [properties] Properties to set
     */
    function CreateVideoCategory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateVideoCategory name.
     * @member {string} name
     * @memberof CreateVideoCategory
     * @instance
     */
    CreateVideoCategory.prototype.name = "";

    /**
     * CreateVideoCategory description.
     * @member {string} description
     * @memberof CreateVideoCategory
     * @instance
     */
    CreateVideoCategory.prototype.description = "";

    /**
     * CreateVideoCategory parentCategoryId.
     * @member {string} parentCategoryId
     * @memberof CreateVideoCategory
     * @instance
     */
    CreateVideoCategory.prototype.parentCategoryId = "";

    /**
     * Creates a new CreateVideoCategory instance using the specified properties.
     * @function create
     * @memberof CreateVideoCategory
     * @static
     * @param {ICreateVideoCategory=} [properties] Properties to set
     * @returns {CreateVideoCategory} CreateVideoCategory instance
     */
    CreateVideoCategory.create = function create(properties) {
        return new CreateVideoCategory(properties);
    };

    /**
     * Encodes the specified CreateVideoCategory message. Does not implicitly {@link CreateVideoCategory.verify|verify} messages.
     * @function encode
     * @memberof CreateVideoCategory
     * @static
     * @param {ICreateVideoCategory} message CreateVideoCategory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateVideoCategory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.parentCategoryId != null && Object.hasOwnProperty.call(message, "parentCategoryId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.parentCategoryId);
        return writer;
    };

    /**
     * Encodes the specified CreateVideoCategory message, length delimited. Does not implicitly {@link CreateVideoCategory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateVideoCategory
     * @static
     * @param {ICreateVideoCategory} message CreateVideoCategory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateVideoCategory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateVideoCategory message from the specified reader or buffer.
     * @function decode
     * @memberof CreateVideoCategory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateVideoCategory} CreateVideoCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateVideoCategory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateVideoCategory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.parentCategoryId = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("name"))
            throw $util.ProtocolError("missing required 'name'", { instance: message });
        return message;
    };

    /**
     * Decodes a CreateVideoCategory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateVideoCategory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateVideoCategory} CreateVideoCategory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateVideoCategory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateVideoCategory message.
     * @function verify
     * @memberof CreateVideoCategory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateVideoCategory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.name))
            return "name: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.parentCategoryId != null && message.hasOwnProperty("parentCategoryId"))
            if (!$util.isString(message.parentCategoryId))
                return "parentCategoryId: string expected";
        return null;
    };

    /**
     * Creates a CreateVideoCategory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateVideoCategory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateVideoCategory} CreateVideoCategory
     */
    CreateVideoCategory.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateVideoCategory)
            return object;
        var message = new $root.CreateVideoCategory();
        if (object.name != null)
            message.name = String(object.name);
        if (object.description != null)
            message.description = String(object.description);
        if (object.parentCategoryId != null)
            message.parentCategoryId = String(object.parentCategoryId);
        return message;
    };

    /**
     * Creates a plain object from a CreateVideoCategory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateVideoCategory
     * @static
     * @param {CreateVideoCategory} message CreateVideoCategory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateVideoCategory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.name = "";
            object.description = "";
            object.parentCategoryId = "";
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.parentCategoryId != null && message.hasOwnProperty("parentCategoryId"))
            object.parentCategoryId = message.parentCategoryId;
        return object;
    };

    /**
     * Converts this CreateVideoCategory to JSON.
     * @function toJSON
     * @memberof CreateVideoCategory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateVideoCategory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateVideoCategory;
})();

$root.MemberRemarked = (function() {

    /**
     * Properties of a MemberRemarked.
     * @exports IMemberRemarked
     * @interface IMemberRemarked
     * @property {IReactVideo|null} [reactVideo] MemberRemarked reactVideo
     * @property {IReactComment|null} [reactComment] MemberRemarked reactComment
     * @property {ICreateComment|null} [createComment] MemberRemarked createComment
     * @property {IEditComment|null} [editComment] MemberRemarked editComment
     * @property {IDeleteComment|null} [deleteComment] MemberRemarked deleteComment
     * @property {ICreateVideoCategory|null} [createVideoCategory] MemberRemarked createVideoCategory
     */

    /**
     * Constructs a new MemberRemarked.
     * @exports MemberRemarked
     * @classdesc Represents a MemberRemarked.
     * @implements IMemberRemarked
     * @constructor
     * @param {IMemberRemarked=} [properties] Properties to set
     */
    function MemberRemarked(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MemberRemarked reactVideo.
     * @member {IReactVideo|null|undefined} reactVideo
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.reactVideo = null;

    /**
     * MemberRemarked reactComment.
     * @member {IReactComment|null|undefined} reactComment
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.reactComment = null;

    /**
     * MemberRemarked createComment.
     * @member {ICreateComment|null|undefined} createComment
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.createComment = null;

    /**
     * MemberRemarked editComment.
     * @member {IEditComment|null|undefined} editComment
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.editComment = null;

    /**
     * MemberRemarked deleteComment.
     * @member {IDeleteComment|null|undefined} deleteComment
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.deleteComment = null;

    /**
     * MemberRemarked createVideoCategory.
     * @member {ICreateVideoCategory|null|undefined} createVideoCategory
     * @memberof MemberRemarked
     * @instance
     */
    MemberRemarked.prototype.createVideoCategory = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * MemberRemarked memberRemarked.
     * @member {"reactVideo"|"reactComment"|"createComment"|"editComment"|"deleteComment"|"createVideoCategory"|undefined} memberRemarked
     * @memberof MemberRemarked
     * @instance
     */
    Object.defineProperty(MemberRemarked.prototype, "memberRemarked", {
        get: $util.oneOfGetter($oneOfFields = ["reactVideo", "reactComment", "createComment", "editComment", "deleteComment", "createVideoCategory"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new MemberRemarked instance using the specified properties.
     * @function create
     * @memberof MemberRemarked
     * @static
     * @param {IMemberRemarked=} [properties] Properties to set
     * @returns {MemberRemarked} MemberRemarked instance
     */
    MemberRemarked.create = function create(properties) {
        return new MemberRemarked(properties);
    };

    /**
     * Encodes the specified MemberRemarked message. Does not implicitly {@link MemberRemarked.verify|verify} messages.
     * @function encode
     * @memberof MemberRemarked
     * @static
     * @param {IMemberRemarked} message MemberRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MemberRemarked.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.reactVideo != null && Object.hasOwnProperty.call(message, "reactVideo"))
            $root.ReactVideo.encode(message.reactVideo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.reactComment != null && Object.hasOwnProperty.call(message, "reactComment"))
            $root.ReactComment.encode(message.reactComment, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.createComment != null && Object.hasOwnProperty.call(message, "createComment"))
            $root.CreateComment.encode(message.createComment, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.editComment != null && Object.hasOwnProperty.call(message, "editComment"))
            $root.EditComment.encode(message.editComment, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.deleteComment != null && Object.hasOwnProperty.call(message, "deleteComment"))
            $root.DeleteComment.encode(message.deleteComment, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.createVideoCategory != null && Object.hasOwnProperty.call(message, "createVideoCategory"))
            $root.CreateVideoCategory.encode(message.createVideoCategory, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MemberRemarked message, length delimited. Does not implicitly {@link MemberRemarked.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MemberRemarked
     * @static
     * @param {IMemberRemarked} message MemberRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MemberRemarked.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MemberRemarked message from the specified reader or buffer.
     * @function decode
     * @memberof MemberRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MemberRemarked} MemberRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MemberRemarked.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MemberRemarked();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.reactVideo = $root.ReactVideo.decode(reader, reader.uint32());
                break;
            case 2:
                message.reactComment = $root.ReactComment.decode(reader, reader.uint32());
                break;
            case 3:
                message.createComment = $root.CreateComment.decode(reader, reader.uint32());
                break;
            case 4:
                message.editComment = $root.EditComment.decode(reader, reader.uint32());
                break;
            case 5:
                message.deleteComment = $root.DeleteComment.decode(reader, reader.uint32());
                break;
            case 6:
                message.createVideoCategory = $root.CreateVideoCategory.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MemberRemarked message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MemberRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MemberRemarked} MemberRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MemberRemarked.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MemberRemarked message.
     * @function verify
     * @memberof MemberRemarked
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MemberRemarked.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.reactVideo != null && message.hasOwnProperty("reactVideo")) {
            properties.memberRemarked = 1;
            {
                var error = $root.ReactVideo.verify(message.reactVideo);
                if (error)
                    return "reactVideo." + error;
            }
        }
        if (message.reactComment != null && message.hasOwnProperty("reactComment")) {
            if (properties.memberRemarked === 1)
                return "memberRemarked: multiple values";
            properties.memberRemarked = 1;
            {
                var error = $root.ReactComment.verify(message.reactComment);
                if (error)
                    return "reactComment." + error;
            }
        }
        if (message.createComment != null && message.hasOwnProperty("createComment")) {
            if (properties.memberRemarked === 1)
                return "memberRemarked: multiple values";
            properties.memberRemarked = 1;
            {
                var error = $root.CreateComment.verify(message.createComment);
                if (error)
                    return "createComment." + error;
            }
        }
        if (message.editComment != null && message.hasOwnProperty("editComment")) {
            if (properties.memberRemarked === 1)
                return "memberRemarked: multiple values";
            properties.memberRemarked = 1;
            {
                var error = $root.EditComment.verify(message.editComment);
                if (error)
                    return "editComment." + error;
            }
        }
        if (message.deleteComment != null && message.hasOwnProperty("deleteComment")) {
            if (properties.memberRemarked === 1)
                return "memberRemarked: multiple values";
            properties.memberRemarked = 1;
            {
                var error = $root.DeleteComment.verify(message.deleteComment);
                if (error)
                    return "deleteComment." + error;
            }
        }
        if (message.createVideoCategory != null && message.hasOwnProperty("createVideoCategory")) {
            if (properties.memberRemarked === 1)
                return "memberRemarked: multiple values";
            properties.memberRemarked = 1;
            {
                var error = $root.CreateVideoCategory.verify(message.createVideoCategory);
                if (error)
                    return "createVideoCategory." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MemberRemarked message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MemberRemarked
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MemberRemarked} MemberRemarked
     */
    MemberRemarked.fromObject = function fromObject(object) {
        if (object instanceof $root.MemberRemarked)
            return object;
        var message = new $root.MemberRemarked();
        if (object.reactVideo != null) {
            if (typeof object.reactVideo !== "object")
                throw TypeError(".MemberRemarked.reactVideo: object expected");
            message.reactVideo = $root.ReactVideo.fromObject(object.reactVideo);
        }
        if (object.reactComment != null) {
            if (typeof object.reactComment !== "object")
                throw TypeError(".MemberRemarked.reactComment: object expected");
            message.reactComment = $root.ReactComment.fromObject(object.reactComment);
        }
        if (object.createComment != null) {
            if (typeof object.createComment !== "object")
                throw TypeError(".MemberRemarked.createComment: object expected");
            message.createComment = $root.CreateComment.fromObject(object.createComment);
        }
        if (object.editComment != null) {
            if (typeof object.editComment !== "object")
                throw TypeError(".MemberRemarked.editComment: object expected");
            message.editComment = $root.EditComment.fromObject(object.editComment);
        }
        if (object.deleteComment != null) {
            if (typeof object.deleteComment !== "object")
                throw TypeError(".MemberRemarked.deleteComment: object expected");
            message.deleteComment = $root.DeleteComment.fromObject(object.deleteComment);
        }
        if (object.createVideoCategory != null) {
            if (typeof object.createVideoCategory !== "object")
                throw TypeError(".MemberRemarked.createVideoCategory: object expected");
            message.createVideoCategory = $root.CreateVideoCategory.fromObject(object.createVideoCategory);
        }
        return message;
    };

    /**
     * Creates a plain object from a MemberRemarked message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MemberRemarked
     * @static
     * @param {MemberRemarked} message MemberRemarked
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MemberRemarked.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.reactVideo != null && message.hasOwnProperty("reactVideo")) {
            object.reactVideo = $root.ReactVideo.toObject(message.reactVideo, options);
            if (options.oneofs)
                object.memberRemarked = "reactVideo";
        }
        if (message.reactComment != null && message.hasOwnProperty("reactComment")) {
            object.reactComment = $root.ReactComment.toObject(message.reactComment, options);
            if (options.oneofs)
                object.memberRemarked = "reactComment";
        }
        if (message.createComment != null && message.hasOwnProperty("createComment")) {
            object.createComment = $root.CreateComment.toObject(message.createComment, options);
            if (options.oneofs)
                object.memberRemarked = "createComment";
        }
        if (message.editComment != null && message.hasOwnProperty("editComment")) {
            object.editComment = $root.EditComment.toObject(message.editComment, options);
            if (options.oneofs)
                object.memberRemarked = "editComment";
        }
        if (message.deleteComment != null && message.hasOwnProperty("deleteComment")) {
            object.deleteComment = $root.DeleteComment.toObject(message.deleteComment, options);
            if (options.oneofs)
                object.memberRemarked = "deleteComment";
        }
        if (message.createVideoCategory != null && message.hasOwnProperty("createVideoCategory")) {
            object.createVideoCategory = $root.CreateVideoCategory.toObject(message.createVideoCategory, options);
            if (options.oneofs)
                object.memberRemarked = "createVideoCategory";
        }
        return object;
    };

    /**
     * Converts this MemberRemarked to JSON.
     * @function toJSON
     * @memberof MemberRemarked
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MemberRemarked.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MemberRemarked;
})();

$root.ChannelModeratorRemarked = (function() {

    /**
     * Properties of a ChannelModeratorRemarked.
     * @exports IChannelModeratorRemarked
     * @interface IChannelModeratorRemarked
     * @property {IModerateComment|null} [moderateComment] ChannelModeratorRemarked moderateComment
     */

    /**
     * Constructs a new ChannelModeratorRemarked.
     * @exports ChannelModeratorRemarked
     * @classdesc Represents a ChannelModeratorRemarked.
     * @implements IChannelModeratorRemarked
     * @constructor
     * @param {IChannelModeratorRemarked=} [properties] Properties to set
     */
    function ChannelModeratorRemarked(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChannelModeratorRemarked moderateComment.
     * @member {IModerateComment|null|undefined} moderateComment
     * @memberof ChannelModeratorRemarked
     * @instance
     */
    ChannelModeratorRemarked.prototype.moderateComment = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ChannelModeratorRemarked channelModeratorRemarked.
     * @member {"moderateComment"|undefined} channelModeratorRemarked
     * @memberof ChannelModeratorRemarked
     * @instance
     */
    Object.defineProperty(ChannelModeratorRemarked.prototype, "channelModeratorRemarked", {
        get: $util.oneOfGetter($oneOfFields = ["moderateComment"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ChannelModeratorRemarked instance using the specified properties.
     * @function create
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {IChannelModeratorRemarked=} [properties] Properties to set
     * @returns {ChannelModeratorRemarked} ChannelModeratorRemarked instance
     */
    ChannelModeratorRemarked.create = function create(properties) {
        return new ChannelModeratorRemarked(properties);
    };

    /**
     * Encodes the specified ChannelModeratorRemarked message. Does not implicitly {@link ChannelModeratorRemarked.verify|verify} messages.
     * @function encode
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {IChannelModeratorRemarked} message ChannelModeratorRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelModeratorRemarked.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.moderateComment != null && Object.hasOwnProperty.call(message, "moderateComment"))
            $root.ModerateComment.encode(message.moderateComment, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ChannelModeratorRemarked message, length delimited. Does not implicitly {@link ChannelModeratorRemarked.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {IChannelModeratorRemarked} message ChannelModeratorRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelModeratorRemarked.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChannelModeratorRemarked message from the specified reader or buffer.
     * @function decode
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChannelModeratorRemarked} ChannelModeratorRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelModeratorRemarked.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelModeratorRemarked();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.moderateComment = $root.ModerateComment.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChannelModeratorRemarked message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChannelModeratorRemarked} ChannelModeratorRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelModeratorRemarked.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChannelModeratorRemarked message.
     * @function verify
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChannelModeratorRemarked.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.moderateComment != null && message.hasOwnProperty("moderateComment")) {
            properties.channelModeratorRemarked = 1;
            {
                var error = $root.ModerateComment.verify(message.moderateComment);
                if (error)
                    return "moderateComment." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ChannelModeratorRemarked message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChannelModeratorRemarked} ChannelModeratorRemarked
     */
    ChannelModeratorRemarked.fromObject = function fromObject(object) {
        if (object instanceof $root.ChannelModeratorRemarked)
            return object;
        var message = new $root.ChannelModeratorRemarked();
        if (object.moderateComment != null) {
            if (typeof object.moderateComment !== "object")
                throw TypeError(".ChannelModeratorRemarked.moderateComment: object expected");
            message.moderateComment = $root.ModerateComment.fromObject(object.moderateComment);
        }
        return message;
    };

    /**
     * Creates a plain object from a ChannelModeratorRemarked message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChannelModeratorRemarked
     * @static
     * @param {ChannelModeratorRemarked} message ChannelModeratorRemarked
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChannelModeratorRemarked.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.moderateComment != null && message.hasOwnProperty("moderateComment")) {
            object.moderateComment = $root.ModerateComment.toObject(message.moderateComment, options);
            if (options.oneofs)
                object.channelModeratorRemarked = "moderateComment";
        }
        return object;
    };

    /**
     * Converts this ChannelModeratorRemarked to JSON.
     * @function toJSON
     * @memberof ChannelModeratorRemarked
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChannelModeratorRemarked.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChannelModeratorRemarked;
})();

$root.ChannelOwnerRemarked = (function() {

    /**
     * Properties of a ChannelOwnerRemarked.
     * @exports IChannelOwnerRemarked
     * @interface IChannelOwnerRemarked
     * @property {IPinOrUnpinComment|null} [pinOrUnpinComment] ChannelOwnerRemarked pinOrUnpinComment
     * @property {IBanOrUnbanMemberFromChannel|null} [banOrUnbanMemberFromChannel] ChannelOwnerRemarked banOrUnbanMemberFromChannel
     * @property {IVideoReactionsPreference|null} [videoReactionsPreference] ChannelOwnerRemarked videoReactionsPreference
     * @property {IModerateComment|null} [moderateComment] ChannelOwnerRemarked moderateComment
     */

    /**
     * Constructs a new ChannelOwnerRemarked.
     * @exports ChannelOwnerRemarked
     * @classdesc Represents a ChannelOwnerRemarked.
     * @implements IChannelOwnerRemarked
     * @constructor
     * @param {IChannelOwnerRemarked=} [properties] Properties to set
     */
    function ChannelOwnerRemarked(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChannelOwnerRemarked pinOrUnpinComment.
     * @member {IPinOrUnpinComment|null|undefined} pinOrUnpinComment
     * @memberof ChannelOwnerRemarked
     * @instance
     */
    ChannelOwnerRemarked.prototype.pinOrUnpinComment = null;

    /**
     * ChannelOwnerRemarked banOrUnbanMemberFromChannel.
     * @member {IBanOrUnbanMemberFromChannel|null|undefined} banOrUnbanMemberFromChannel
     * @memberof ChannelOwnerRemarked
     * @instance
     */
    ChannelOwnerRemarked.prototype.banOrUnbanMemberFromChannel = null;

    /**
     * ChannelOwnerRemarked videoReactionsPreference.
     * @member {IVideoReactionsPreference|null|undefined} videoReactionsPreference
     * @memberof ChannelOwnerRemarked
     * @instance
     */
    ChannelOwnerRemarked.prototype.videoReactionsPreference = null;

    /**
     * ChannelOwnerRemarked moderateComment.
     * @member {IModerateComment|null|undefined} moderateComment
     * @memberof ChannelOwnerRemarked
     * @instance
     */
    ChannelOwnerRemarked.prototype.moderateComment = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ChannelOwnerRemarked channelOwnerRemarked.
     * @member {"pinOrUnpinComment"|"banOrUnbanMemberFromChannel"|"videoReactionsPreference"|"moderateComment"|undefined} channelOwnerRemarked
     * @memberof ChannelOwnerRemarked
     * @instance
     */
    Object.defineProperty(ChannelOwnerRemarked.prototype, "channelOwnerRemarked", {
        get: $util.oneOfGetter($oneOfFields = ["pinOrUnpinComment", "banOrUnbanMemberFromChannel", "videoReactionsPreference", "moderateComment"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ChannelOwnerRemarked instance using the specified properties.
     * @function create
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {IChannelOwnerRemarked=} [properties] Properties to set
     * @returns {ChannelOwnerRemarked} ChannelOwnerRemarked instance
     */
    ChannelOwnerRemarked.create = function create(properties) {
        return new ChannelOwnerRemarked(properties);
    };

    /**
     * Encodes the specified ChannelOwnerRemarked message. Does not implicitly {@link ChannelOwnerRemarked.verify|verify} messages.
     * @function encode
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {IChannelOwnerRemarked} message ChannelOwnerRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelOwnerRemarked.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.pinOrUnpinComment != null && Object.hasOwnProperty.call(message, "pinOrUnpinComment"))
            $root.PinOrUnpinComment.encode(message.pinOrUnpinComment, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.banOrUnbanMemberFromChannel != null && Object.hasOwnProperty.call(message, "banOrUnbanMemberFromChannel"))
            $root.BanOrUnbanMemberFromChannel.encode(message.banOrUnbanMemberFromChannel, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.videoReactionsPreference != null && Object.hasOwnProperty.call(message, "videoReactionsPreference"))
            $root.VideoReactionsPreference.encode(message.videoReactionsPreference, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.moderateComment != null && Object.hasOwnProperty.call(message, "moderateComment"))
            $root.ModerateComment.encode(message.moderateComment, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ChannelOwnerRemarked message, length delimited. Does not implicitly {@link ChannelOwnerRemarked.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {IChannelOwnerRemarked} message ChannelOwnerRemarked message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChannelOwnerRemarked.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChannelOwnerRemarked message from the specified reader or buffer.
     * @function decode
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChannelOwnerRemarked} ChannelOwnerRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelOwnerRemarked.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChannelOwnerRemarked();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.pinOrUnpinComment = $root.PinOrUnpinComment.decode(reader, reader.uint32());
                break;
            case 2:
                message.banOrUnbanMemberFromChannel = $root.BanOrUnbanMemberFromChannel.decode(reader, reader.uint32());
                break;
            case 3:
                message.videoReactionsPreference = $root.VideoReactionsPreference.decode(reader, reader.uint32());
                break;
            case 5:
                message.moderateComment = $root.ModerateComment.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChannelOwnerRemarked message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChannelOwnerRemarked} ChannelOwnerRemarked
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChannelOwnerRemarked.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChannelOwnerRemarked message.
     * @function verify
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChannelOwnerRemarked.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.pinOrUnpinComment != null && message.hasOwnProperty("pinOrUnpinComment")) {
            properties.channelOwnerRemarked = 1;
            {
                var error = $root.PinOrUnpinComment.verify(message.pinOrUnpinComment);
                if (error)
                    return "pinOrUnpinComment." + error;
            }
        }
        if (message.banOrUnbanMemberFromChannel != null && message.hasOwnProperty("banOrUnbanMemberFromChannel")) {
            if (properties.channelOwnerRemarked === 1)
                return "channelOwnerRemarked: multiple values";
            properties.channelOwnerRemarked = 1;
            {
                var error = $root.BanOrUnbanMemberFromChannel.verify(message.banOrUnbanMemberFromChannel);
                if (error)
                    return "banOrUnbanMemberFromChannel." + error;
            }
        }
        if (message.videoReactionsPreference != null && message.hasOwnProperty("videoReactionsPreference")) {
            if (properties.channelOwnerRemarked === 1)
                return "channelOwnerRemarked: multiple values";
            properties.channelOwnerRemarked = 1;
            {
                var error = $root.VideoReactionsPreference.verify(message.videoReactionsPreference);
                if (error)
                    return "videoReactionsPreference." + error;
            }
        }
        if (message.moderateComment != null && message.hasOwnProperty("moderateComment")) {
            if (properties.channelOwnerRemarked === 1)
                return "channelOwnerRemarked: multiple values";
            properties.channelOwnerRemarked = 1;
            {
                var error = $root.ModerateComment.verify(message.moderateComment);
                if (error)
                    return "moderateComment." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ChannelOwnerRemarked message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChannelOwnerRemarked} ChannelOwnerRemarked
     */
    ChannelOwnerRemarked.fromObject = function fromObject(object) {
        if (object instanceof $root.ChannelOwnerRemarked)
            return object;
        var message = new $root.ChannelOwnerRemarked();
        if (object.pinOrUnpinComment != null) {
            if (typeof object.pinOrUnpinComment !== "object")
                throw TypeError(".ChannelOwnerRemarked.pinOrUnpinComment: object expected");
            message.pinOrUnpinComment = $root.PinOrUnpinComment.fromObject(object.pinOrUnpinComment);
        }
        if (object.banOrUnbanMemberFromChannel != null) {
            if (typeof object.banOrUnbanMemberFromChannel !== "object")
                throw TypeError(".ChannelOwnerRemarked.banOrUnbanMemberFromChannel: object expected");
            message.banOrUnbanMemberFromChannel = $root.BanOrUnbanMemberFromChannel.fromObject(object.banOrUnbanMemberFromChannel);
        }
        if (object.videoReactionsPreference != null) {
            if (typeof object.videoReactionsPreference !== "object")
                throw TypeError(".ChannelOwnerRemarked.videoReactionsPreference: object expected");
            message.videoReactionsPreference = $root.VideoReactionsPreference.fromObject(object.videoReactionsPreference);
        }
        if (object.moderateComment != null) {
            if (typeof object.moderateComment !== "object")
                throw TypeError(".ChannelOwnerRemarked.moderateComment: object expected");
            message.moderateComment = $root.ModerateComment.fromObject(object.moderateComment);
        }
        return message;
    };

    /**
     * Creates a plain object from a ChannelOwnerRemarked message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChannelOwnerRemarked
     * @static
     * @param {ChannelOwnerRemarked} message ChannelOwnerRemarked
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChannelOwnerRemarked.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.pinOrUnpinComment != null && message.hasOwnProperty("pinOrUnpinComment")) {
            object.pinOrUnpinComment = $root.PinOrUnpinComment.toObject(message.pinOrUnpinComment, options);
            if (options.oneofs)
                object.channelOwnerRemarked = "pinOrUnpinComment";
        }
        if (message.banOrUnbanMemberFromChannel != null && message.hasOwnProperty("banOrUnbanMemberFromChannel")) {
            object.banOrUnbanMemberFromChannel = $root.BanOrUnbanMemberFromChannel.toObject(message.banOrUnbanMemberFromChannel, options);
            if (options.oneofs)
                object.channelOwnerRemarked = "banOrUnbanMemberFromChannel";
        }
        if (message.videoReactionsPreference != null && message.hasOwnProperty("videoReactionsPreference")) {
            object.videoReactionsPreference = $root.VideoReactionsPreference.toObject(message.videoReactionsPreference, options);
            if (options.oneofs)
                object.channelOwnerRemarked = "videoReactionsPreference";
        }
        if (message.moderateComment != null && message.hasOwnProperty("moderateComment")) {
            object.moderateComment = $root.ModerateComment.toObject(message.moderateComment, options);
            if (options.oneofs)
                object.channelOwnerRemarked = "moderateComment";
        }
        return object;
    };

    /**
     * Converts this ChannelOwnerRemarked to JSON.
     * @function toJSON
     * @memberof ChannelOwnerRemarked
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChannelOwnerRemarked.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChannelOwnerRemarked;
})();

$root.PersonMetadata = (function() {

    /**
     * Properties of a PersonMetadata.
     * @exports IPersonMetadata
     * @interface IPersonMetadata
     * @property {string|null} [firstName] PersonMetadata firstName
     * @property {string|null} [middleName] PersonMetadata middleName
     * @property {string|null} [lastName] PersonMetadata lastName
     * @property {string|null} [about] PersonMetadata about
     * @property {number|null} [coverPhoto] PersonMetadata coverPhoto
     * @property {number|null} [avatarPhoto] PersonMetadata avatarPhoto
     */

    /**
     * Constructs a new PersonMetadata.
     * @exports PersonMetadata
     * @classdesc Represents a PersonMetadata.
     * @implements IPersonMetadata
     * @constructor
     * @param {IPersonMetadata=} [properties] Properties to set
     */
    function PersonMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PersonMetadata firstName.
     * @member {string} firstName
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.firstName = "";

    /**
     * PersonMetadata middleName.
     * @member {string} middleName
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.middleName = "";

    /**
     * PersonMetadata lastName.
     * @member {string} lastName
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.lastName = "";

    /**
     * PersonMetadata about.
     * @member {string} about
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.about = "";

    /**
     * PersonMetadata coverPhoto.
     * @member {number} coverPhoto
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.coverPhoto = 0;

    /**
     * PersonMetadata avatarPhoto.
     * @member {number} avatarPhoto
     * @memberof PersonMetadata
     * @instance
     */
    PersonMetadata.prototype.avatarPhoto = 0;

    /**
     * Creates a new PersonMetadata instance using the specified properties.
     * @function create
     * @memberof PersonMetadata
     * @static
     * @param {IPersonMetadata=} [properties] Properties to set
     * @returns {PersonMetadata} PersonMetadata instance
     */
    PersonMetadata.create = function create(properties) {
        return new PersonMetadata(properties);
    };

    /**
     * Encodes the specified PersonMetadata message. Does not implicitly {@link PersonMetadata.verify|verify} messages.
     * @function encode
     * @memberof PersonMetadata
     * @static
     * @param {IPersonMetadata} message PersonMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PersonMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.firstName);
        if (message.middleName != null && Object.hasOwnProperty.call(message, "middleName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.middleName);
        if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.lastName);
        if (message.about != null && Object.hasOwnProperty.call(message, "about"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.about);
        if (message.coverPhoto != null && Object.hasOwnProperty.call(message, "coverPhoto"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.coverPhoto);
        if (message.avatarPhoto != null && Object.hasOwnProperty.call(message, "avatarPhoto"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.avatarPhoto);
        return writer;
    };

    /**
     * Encodes the specified PersonMetadata message, length delimited. Does not implicitly {@link PersonMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PersonMetadata
     * @static
     * @param {IPersonMetadata} message PersonMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PersonMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PersonMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof PersonMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PersonMetadata} PersonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PersonMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PersonMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.firstName = reader.string();
                break;
            case 2:
                message.middleName = reader.string();
                break;
            case 3:
                message.lastName = reader.string();
                break;
            case 4:
                message.about = reader.string();
                break;
            case 5:
                message.coverPhoto = reader.uint32();
                break;
            case 6:
                message.avatarPhoto = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PersonMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PersonMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PersonMetadata} PersonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PersonMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PersonMetadata message.
     * @function verify
     * @memberof PersonMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PersonMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            if (!$util.isString(message.firstName))
                return "firstName: string expected";
        if (message.middleName != null && message.hasOwnProperty("middleName"))
            if (!$util.isString(message.middleName))
                return "middleName: string expected";
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            if (!$util.isString(message.lastName))
                return "lastName: string expected";
        if (message.about != null && message.hasOwnProperty("about"))
            if (!$util.isString(message.about))
                return "about: string expected";
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            if (!$util.isInteger(message.coverPhoto))
                return "coverPhoto: integer expected";
        if (message.avatarPhoto != null && message.hasOwnProperty("avatarPhoto"))
            if (!$util.isInteger(message.avatarPhoto))
                return "avatarPhoto: integer expected";
        return null;
    };

    /**
     * Creates a PersonMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PersonMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PersonMetadata} PersonMetadata
     */
    PersonMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.PersonMetadata)
            return object;
        var message = new $root.PersonMetadata();
        if (object.firstName != null)
            message.firstName = String(object.firstName);
        if (object.middleName != null)
            message.middleName = String(object.middleName);
        if (object.lastName != null)
            message.lastName = String(object.lastName);
        if (object.about != null)
            message.about = String(object.about);
        if (object.coverPhoto != null)
            message.coverPhoto = object.coverPhoto >>> 0;
        if (object.avatarPhoto != null)
            message.avatarPhoto = object.avatarPhoto >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a PersonMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PersonMetadata
     * @static
     * @param {PersonMetadata} message PersonMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PersonMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.firstName = "";
            object.middleName = "";
            object.lastName = "";
            object.about = "";
            object.coverPhoto = 0;
            object.avatarPhoto = 0;
        }
        if (message.firstName != null && message.hasOwnProperty("firstName"))
            object.firstName = message.firstName;
        if (message.middleName != null && message.hasOwnProperty("middleName"))
            object.middleName = message.middleName;
        if (message.lastName != null && message.hasOwnProperty("lastName"))
            object.lastName = message.lastName;
        if (message.about != null && message.hasOwnProperty("about"))
            object.about = message.about;
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            object.coverPhoto = message.coverPhoto;
        if (message.avatarPhoto != null && message.hasOwnProperty("avatarPhoto"))
            object.avatarPhoto = message.avatarPhoto;
        return object;
    };

    /**
     * Converts this PersonMetadata to JSON.
     * @function toJSON
     * @memberof PersonMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PersonMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PersonMetadata;
})();

$root.ProposalsDiscussionPostMetadata = (function() {

    /**
     * Properties of a ProposalsDiscussionPostMetadata.
     * @exports IProposalsDiscussionPostMetadata
     * @interface IProposalsDiscussionPostMetadata
     * @property {string|null} [text] ProposalsDiscussionPostMetadata text
     * @property {number|null} [repliesTo] ProposalsDiscussionPostMetadata repliesTo
     */

    /**
     * Constructs a new ProposalsDiscussionPostMetadata.
     * @exports ProposalsDiscussionPostMetadata
     * @classdesc Represents a ProposalsDiscussionPostMetadata.
     * @implements IProposalsDiscussionPostMetadata
     * @constructor
     * @param {IProposalsDiscussionPostMetadata=} [properties] Properties to set
     */
    function ProposalsDiscussionPostMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProposalsDiscussionPostMetadata text.
     * @member {string} text
     * @memberof ProposalsDiscussionPostMetadata
     * @instance
     */
    ProposalsDiscussionPostMetadata.prototype.text = "";

    /**
     * ProposalsDiscussionPostMetadata repliesTo.
     * @member {number} repliesTo
     * @memberof ProposalsDiscussionPostMetadata
     * @instance
     */
    ProposalsDiscussionPostMetadata.prototype.repliesTo = 0;

    /**
     * Creates a new ProposalsDiscussionPostMetadata instance using the specified properties.
     * @function create
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {IProposalsDiscussionPostMetadata=} [properties] Properties to set
     * @returns {ProposalsDiscussionPostMetadata} ProposalsDiscussionPostMetadata instance
     */
    ProposalsDiscussionPostMetadata.create = function create(properties) {
        return new ProposalsDiscussionPostMetadata(properties);
    };

    /**
     * Encodes the specified ProposalsDiscussionPostMetadata message. Does not implicitly {@link ProposalsDiscussionPostMetadata.verify|verify} messages.
     * @function encode
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {IProposalsDiscussionPostMetadata} message ProposalsDiscussionPostMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProposalsDiscussionPostMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.text != null && Object.hasOwnProperty.call(message, "text"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
        if (message.repliesTo != null && Object.hasOwnProperty.call(message, "repliesTo"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.repliesTo);
        return writer;
    };

    /**
     * Encodes the specified ProposalsDiscussionPostMetadata message, length delimited. Does not implicitly {@link ProposalsDiscussionPostMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {IProposalsDiscussionPostMetadata} message ProposalsDiscussionPostMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProposalsDiscussionPostMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProposalsDiscussionPostMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProposalsDiscussionPostMetadata} ProposalsDiscussionPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProposalsDiscussionPostMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProposalsDiscussionPostMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.text = reader.string();
                break;
            case 2:
                message.repliesTo = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ProposalsDiscussionPostMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProposalsDiscussionPostMetadata} ProposalsDiscussionPostMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProposalsDiscussionPostMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProposalsDiscussionPostMetadata message.
     * @function verify
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProposalsDiscussionPostMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        if (message.repliesTo != null && message.hasOwnProperty("repliesTo"))
            if (!$util.isInteger(message.repliesTo))
                return "repliesTo: integer expected";
        return null;
    };

    /**
     * Creates a ProposalsDiscussionPostMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProposalsDiscussionPostMetadata} ProposalsDiscussionPostMetadata
     */
    ProposalsDiscussionPostMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ProposalsDiscussionPostMetadata)
            return object;
        var message = new $root.ProposalsDiscussionPostMetadata();
        if (object.text != null)
            message.text = String(object.text);
        if (object.repliesTo != null)
            message.repliesTo = object.repliesTo >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ProposalsDiscussionPostMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProposalsDiscussionPostMetadata
     * @static
     * @param {ProposalsDiscussionPostMetadata} message ProposalsDiscussionPostMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProposalsDiscussionPostMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.text = "";
            object.repliesTo = 0;
        }
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        if (message.repliesTo != null && message.hasOwnProperty("repliesTo"))
            object.repliesTo = message.repliesTo;
        return object;
    };

    /**
     * Converts this ProposalsDiscussionPostMetadata to JSON.
     * @function toJSON
     * @memberof ProposalsDiscussionPostMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProposalsDiscussionPostMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ProposalsDiscussionPostMetadata;
})();

$root.SeriesMetadata = (function() {

    /**
     * Properties of a SeriesMetadata.
     * @exports ISeriesMetadata
     * @interface ISeriesMetadata
     * @property {string|null} [title] SeriesMetadata title
     * @property {string|null} [description] SeriesMetadata description
     * @property {number|null} [coverPhoto] SeriesMetadata coverPhoto
     * @property {Array.<Long>|null} [persons] SeriesMetadata persons
     */

    /**
     * Constructs a new SeriesMetadata.
     * @exports SeriesMetadata
     * @classdesc Represents a SeriesMetadata.
     * @implements ISeriesMetadata
     * @constructor
     * @param {ISeriesMetadata=} [properties] Properties to set
     */
    function SeriesMetadata(properties) {
        this.persons = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SeriesMetadata title.
     * @member {string} title
     * @memberof SeriesMetadata
     * @instance
     */
    SeriesMetadata.prototype.title = "";

    /**
     * SeriesMetadata description.
     * @member {string} description
     * @memberof SeriesMetadata
     * @instance
     */
    SeriesMetadata.prototype.description = "";

    /**
     * SeriesMetadata coverPhoto.
     * @member {number} coverPhoto
     * @memberof SeriesMetadata
     * @instance
     */
    SeriesMetadata.prototype.coverPhoto = 0;

    /**
     * SeriesMetadata persons.
     * @member {Array.<Long>} persons
     * @memberof SeriesMetadata
     * @instance
     */
    SeriesMetadata.prototype.persons = $util.emptyArray;

    /**
     * Creates a new SeriesMetadata instance using the specified properties.
     * @function create
     * @memberof SeriesMetadata
     * @static
     * @param {ISeriesMetadata=} [properties] Properties to set
     * @returns {SeriesMetadata} SeriesMetadata instance
     */
    SeriesMetadata.create = function create(properties) {
        return new SeriesMetadata(properties);
    };

    /**
     * Encodes the specified SeriesMetadata message. Does not implicitly {@link SeriesMetadata.verify|verify} messages.
     * @function encode
     * @memberof SeriesMetadata
     * @static
     * @param {ISeriesMetadata} message SeriesMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SeriesMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.coverPhoto != null && Object.hasOwnProperty.call(message, "coverPhoto"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.coverPhoto);
        if (message.persons != null && message.persons.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.persons.length; ++i)
                writer.uint64(message.persons[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified SeriesMetadata message, length delimited. Does not implicitly {@link SeriesMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SeriesMetadata
     * @static
     * @param {ISeriesMetadata} message SeriesMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SeriesMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SeriesMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof SeriesMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SeriesMetadata} SeriesMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SeriesMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SeriesMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.coverPhoto = reader.uint32();
                break;
            case 4:
                if (!(message.persons && message.persons.length))
                    message.persons = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.persons.push(reader.uint64());
                } else
                    message.persons.push(reader.uint64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SeriesMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SeriesMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SeriesMetadata} SeriesMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SeriesMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SeriesMetadata message.
     * @function verify
     * @memberof SeriesMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SeriesMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            if (!$util.isInteger(message.coverPhoto))
                return "coverPhoto: integer expected";
        if (message.persons != null && message.hasOwnProperty("persons")) {
            if (!Array.isArray(message.persons))
                return "persons: array expected";
            for (var i = 0; i < message.persons.length; ++i)
                if (!$util.isInteger(message.persons[i]) && !(message.persons[i] && $util.isInteger(message.persons[i].low) && $util.isInteger(message.persons[i].high)))
                    return "persons: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a SeriesMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SeriesMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SeriesMetadata} SeriesMetadata
     */
    SeriesMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.SeriesMetadata)
            return object;
        var message = new $root.SeriesMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        if (object.coverPhoto != null)
            message.coverPhoto = object.coverPhoto >>> 0;
        if (object.persons) {
            if (!Array.isArray(object.persons))
                throw TypeError(".SeriesMetadata.persons: array expected");
            message.persons = [];
            for (var i = 0; i < object.persons.length; ++i)
                if ($util.Long)
                    (message.persons[i] = $util.Long.fromValue(object.persons[i])).unsigned = true;
                else if (typeof object.persons[i] === "string")
                    message.persons[i] = parseInt(object.persons[i], 10);
                else if (typeof object.persons[i] === "number")
                    message.persons[i] = object.persons[i];
                else if (typeof object.persons[i] === "object")
                    message.persons[i] = new $util.LongBits(object.persons[i].low >>> 0, object.persons[i].high >>> 0).toNumber(true);
        }
        return message;
    };

    /**
     * Creates a plain object from a SeriesMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SeriesMetadata
     * @static
     * @param {SeriesMetadata} message SeriesMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SeriesMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.persons = [];
        if (options.defaults) {
            object.title = "";
            object.description = "";
            object.coverPhoto = 0;
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            object.coverPhoto = message.coverPhoto;
        if (message.persons && message.persons.length) {
            object.persons = [];
            for (var j = 0; j < message.persons.length; ++j)
                if (typeof message.persons[j] === "number")
                    object.persons[j] = options.longs === String ? String(message.persons[j]) : message.persons[j];
                else
                    object.persons[j] = options.longs === String ? $util.Long.prototype.toString.call(message.persons[j]) : options.longs === Number ? new $util.LongBits(message.persons[j].low >>> 0, message.persons[j].high >>> 0).toNumber(true) : message.persons[j];
        }
        return object;
    };

    /**
     * Converts this SeriesMetadata to JSON.
     * @function toJSON
     * @memberof SeriesMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SeriesMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SeriesMetadata;
})();

$root.SeasonMetadata = (function() {

    /**
     * Properties of a SeasonMetadata.
     * @exports ISeasonMetadata
     * @interface ISeasonMetadata
     * @property {string|null} [title] SeasonMetadata title
     * @property {string|null} [description] SeasonMetadata description
     * @property {number|null} [coverPhoto] SeasonMetadata coverPhoto
     * @property {Array.<Long>|null} [persons] SeasonMetadata persons
     */

    /**
     * Constructs a new SeasonMetadata.
     * @exports SeasonMetadata
     * @classdesc Represents a SeasonMetadata.
     * @implements ISeasonMetadata
     * @constructor
     * @param {ISeasonMetadata=} [properties] Properties to set
     */
    function SeasonMetadata(properties) {
        this.persons = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SeasonMetadata title.
     * @member {string} title
     * @memberof SeasonMetadata
     * @instance
     */
    SeasonMetadata.prototype.title = "";

    /**
     * SeasonMetadata description.
     * @member {string} description
     * @memberof SeasonMetadata
     * @instance
     */
    SeasonMetadata.prototype.description = "";

    /**
     * SeasonMetadata coverPhoto.
     * @member {number} coverPhoto
     * @memberof SeasonMetadata
     * @instance
     */
    SeasonMetadata.prototype.coverPhoto = 0;

    /**
     * SeasonMetadata persons.
     * @member {Array.<Long>} persons
     * @memberof SeasonMetadata
     * @instance
     */
    SeasonMetadata.prototype.persons = $util.emptyArray;

    /**
     * Creates a new SeasonMetadata instance using the specified properties.
     * @function create
     * @memberof SeasonMetadata
     * @static
     * @param {ISeasonMetadata=} [properties] Properties to set
     * @returns {SeasonMetadata} SeasonMetadata instance
     */
    SeasonMetadata.create = function create(properties) {
        return new SeasonMetadata(properties);
    };

    /**
     * Encodes the specified SeasonMetadata message. Does not implicitly {@link SeasonMetadata.verify|verify} messages.
     * @function encode
     * @memberof SeasonMetadata
     * @static
     * @param {ISeasonMetadata} message SeasonMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SeasonMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.coverPhoto != null && Object.hasOwnProperty.call(message, "coverPhoto"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.coverPhoto);
        if (message.persons != null && message.persons.length) {
            writer.uint32(/* id 4, wireType 2 =*/34).fork();
            for (var i = 0; i < message.persons.length; ++i)
                writer.uint64(message.persons[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified SeasonMetadata message, length delimited. Does not implicitly {@link SeasonMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SeasonMetadata
     * @static
     * @param {ISeasonMetadata} message SeasonMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SeasonMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SeasonMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof SeasonMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SeasonMetadata} SeasonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SeasonMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SeasonMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.coverPhoto = reader.uint32();
                break;
            case 4:
                if (!(message.persons && message.persons.length))
                    message.persons = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.persons.push(reader.uint64());
                } else
                    message.persons.push(reader.uint64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SeasonMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SeasonMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SeasonMetadata} SeasonMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SeasonMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SeasonMetadata message.
     * @function verify
     * @memberof SeasonMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SeasonMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            if (!$util.isInteger(message.coverPhoto))
                return "coverPhoto: integer expected";
        if (message.persons != null && message.hasOwnProperty("persons")) {
            if (!Array.isArray(message.persons))
                return "persons: array expected";
            for (var i = 0; i < message.persons.length; ++i)
                if (!$util.isInteger(message.persons[i]) && !(message.persons[i] && $util.isInteger(message.persons[i].low) && $util.isInteger(message.persons[i].high)))
                    return "persons: integer|Long[] expected";
        }
        return null;
    };

    /**
     * Creates a SeasonMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SeasonMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SeasonMetadata} SeasonMetadata
     */
    SeasonMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.SeasonMetadata)
            return object;
        var message = new $root.SeasonMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        if (object.coverPhoto != null)
            message.coverPhoto = object.coverPhoto >>> 0;
        if (object.persons) {
            if (!Array.isArray(object.persons))
                throw TypeError(".SeasonMetadata.persons: array expected");
            message.persons = [];
            for (var i = 0; i < object.persons.length; ++i)
                if ($util.Long)
                    (message.persons[i] = $util.Long.fromValue(object.persons[i])).unsigned = true;
                else if (typeof object.persons[i] === "string")
                    message.persons[i] = parseInt(object.persons[i], 10);
                else if (typeof object.persons[i] === "number")
                    message.persons[i] = object.persons[i];
                else if (typeof object.persons[i] === "object")
                    message.persons[i] = new $util.LongBits(object.persons[i].low >>> 0, object.persons[i].high >>> 0).toNumber(true);
        }
        return message;
    };

    /**
     * Creates a plain object from a SeasonMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SeasonMetadata
     * @static
     * @param {SeasonMetadata} message SeasonMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SeasonMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.persons = [];
        if (options.defaults) {
            object.title = "";
            object.description = "";
            object.coverPhoto = 0;
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.coverPhoto != null && message.hasOwnProperty("coverPhoto"))
            object.coverPhoto = message.coverPhoto;
        if (message.persons && message.persons.length) {
            object.persons = [];
            for (var j = 0; j < message.persons.length; ++j)
                if (typeof message.persons[j] === "number")
                    object.persons[j] = options.longs === String ? String(message.persons[j]) : message.persons[j];
                else
                    object.persons[j] = options.longs === String ? $util.Long.prototype.toString.call(message.persons[j]) : options.longs === Number ? new $util.LongBits(message.persons[j].low >>> 0, message.persons[j].high >>> 0).toNumber(true) : message.persons[j];
        }
        return object;
    };

    /**
     * Converts this SeasonMetadata to JSON.
     * @function toJSON
     * @memberof SeasonMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SeasonMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SeasonMetadata;
})();

$root.GeoCoordiantes = (function() {

    /**
     * Properties of a GeoCoordiantes.
     * @exports IGeoCoordiantes
     * @interface IGeoCoordiantes
     * @property {number|null} [latitude] GeoCoordiantes latitude
     * @property {number|null} [longitude] GeoCoordiantes longitude
     */

    /**
     * Constructs a new GeoCoordiantes.
     * @exports GeoCoordiantes
     * @classdesc Represents a GeoCoordiantes.
     * @implements IGeoCoordiantes
     * @constructor
     * @param {IGeoCoordiantes=} [properties] Properties to set
     */
    function GeoCoordiantes(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GeoCoordiantes latitude.
     * @member {number} latitude
     * @memberof GeoCoordiantes
     * @instance
     */
    GeoCoordiantes.prototype.latitude = 0;

    /**
     * GeoCoordiantes longitude.
     * @member {number} longitude
     * @memberof GeoCoordiantes
     * @instance
     */
    GeoCoordiantes.prototype.longitude = 0;

    /**
     * Creates a new GeoCoordiantes instance using the specified properties.
     * @function create
     * @memberof GeoCoordiantes
     * @static
     * @param {IGeoCoordiantes=} [properties] Properties to set
     * @returns {GeoCoordiantes} GeoCoordiantes instance
     */
    GeoCoordiantes.create = function create(properties) {
        return new GeoCoordiantes(properties);
    };

    /**
     * Encodes the specified GeoCoordiantes message. Does not implicitly {@link GeoCoordiantes.verify|verify} messages.
     * @function encode
     * @memberof GeoCoordiantes
     * @static
     * @param {IGeoCoordiantes} message GeoCoordiantes message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GeoCoordiantes.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.latitude != null && Object.hasOwnProperty.call(message, "latitude"))
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.latitude);
        if (message.longitude != null && Object.hasOwnProperty.call(message, "longitude"))
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.longitude);
        return writer;
    };

    /**
     * Encodes the specified GeoCoordiantes message, length delimited. Does not implicitly {@link GeoCoordiantes.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GeoCoordiantes
     * @static
     * @param {IGeoCoordiantes} message GeoCoordiantes message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GeoCoordiantes.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GeoCoordiantes message from the specified reader or buffer.
     * @function decode
     * @memberof GeoCoordiantes
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GeoCoordiantes} GeoCoordiantes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GeoCoordiantes.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GeoCoordiantes();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 3:
                message.latitude = reader.float();
                break;
            case 4:
                message.longitude = reader.float();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GeoCoordiantes message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GeoCoordiantes
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GeoCoordiantes} GeoCoordiantes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GeoCoordiantes.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GeoCoordiantes message.
     * @function verify
     * @memberof GeoCoordiantes
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GeoCoordiantes.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.latitude != null && message.hasOwnProperty("latitude"))
            if (typeof message.latitude !== "number")
                return "latitude: number expected";
        if (message.longitude != null && message.hasOwnProperty("longitude"))
            if (typeof message.longitude !== "number")
                return "longitude: number expected";
        return null;
    };

    /**
     * Creates a GeoCoordiantes message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GeoCoordiantes
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GeoCoordiantes} GeoCoordiantes
     */
    GeoCoordiantes.fromObject = function fromObject(object) {
        if (object instanceof $root.GeoCoordiantes)
            return object;
        var message = new $root.GeoCoordiantes();
        if (object.latitude != null)
            message.latitude = Number(object.latitude);
        if (object.longitude != null)
            message.longitude = Number(object.longitude);
        return message;
    };

    /**
     * Creates a plain object from a GeoCoordiantes message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GeoCoordiantes
     * @static
     * @param {GeoCoordiantes} message GeoCoordiantes
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GeoCoordiantes.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.latitude = 0;
            object.longitude = 0;
        }
        if (message.latitude != null && message.hasOwnProperty("latitude"))
            object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
        if (message.longitude != null && message.hasOwnProperty("longitude"))
            object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
        return object;
    };

    /**
     * Converts this GeoCoordiantes to JSON.
     * @function toJSON
     * @memberof GeoCoordiantes
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GeoCoordiantes.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GeoCoordiantes;
})();

$root.NodeLocationMetadata = (function() {

    /**
     * Properties of a NodeLocationMetadata.
     * @exports INodeLocationMetadata
     * @interface INodeLocationMetadata
     * @property {string|null} [countryCode] NodeLocationMetadata countryCode
     * @property {string|null} [city] NodeLocationMetadata city
     * @property {IGeoCoordiantes|null} [coordinates] NodeLocationMetadata coordinates
     */

    /**
     * Constructs a new NodeLocationMetadata.
     * @exports NodeLocationMetadata
     * @classdesc Represents a NodeLocationMetadata.
     * @implements INodeLocationMetadata
     * @constructor
     * @param {INodeLocationMetadata=} [properties] Properties to set
     */
    function NodeLocationMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * NodeLocationMetadata countryCode.
     * @member {string} countryCode
     * @memberof NodeLocationMetadata
     * @instance
     */
    NodeLocationMetadata.prototype.countryCode = "";

    /**
     * NodeLocationMetadata city.
     * @member {string} city
     * @memberof NodeLocationMetadata
     * @instance
     */
    NodeLocationMetadata.prototype.city = "";

    /**
     * NodeLocationMetadata coordinates.
     * @member {IGeoCoordiantes|null|undefined} coordinates
     * @memberof NodeLocationMetadata
     * @instance
     */
    NodeLocationMetadata.prototype.coordinates = null;

    /**
     * Creates a new NodeLocationMetadata instance using the specified properties.
     * @function create
     * @memberof NodeLocationMetadata
     * @static
     * @param {INodeLocationMetadata=} [properties] Properties to set
     * @returns {NodeLocationMetadata} NodeLocationMetadata instance
     */
    NodeLocationMetadata.create = function create(properties) {
        return new NodeLocationMetadata(properties);
    };

    /**
     * Encodes the specified NodeLocationMetadata message. Does not implicitly {@link NodeLocationMetadata.verify|verify} messages.
     * @function encode
     * @memberof NodeLocationMetadata
     * @static
     * @param {INodeLocationMetadata} message NodeLocationMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeLocationMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.countryCode);
        if (message.city != null && Object.hasOwnProperty.call(message, "city"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.city);
        if (message.coordinates != null && Object.hasOwnProperty.call(message, "coordinates"))
            $root.GeoCoordiantes.encode(message.coordinates, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified NodeLocationMetadata message, length delimited. Does not implicitly {@link NodeLocationMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof NodeLocationMetadata
     * @static
     * @param {INodeLocationMetadata} message NodeLocationMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    NodeLocationMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a NodeLocationMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof NodeLocationMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {NodeLocationMetadata} NodeLocationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeLocationMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.NodeLocationMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.countryCode = reader.string();
                break;
            case 2:
                message.city = reader.string();
                break;
            case 3:
                message.coordinates = $root.GeoCoordiantes.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a NodeLocationMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof NodeLocationMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {NodeLocationMetadata} NodeLocationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    NodeLocationMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a NodeLocationMetadata message.
     * @function verify
     * @memberof NodeLocationMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    NodeLocationMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.countryCode != null && message.hasOwnProperty("countryCode"))
            if (!$util.isString(message.countryCode))
                return "countryCode: string expected";
        if (message.city != null && message.hasOwnProperty("city"))
            if (!$util.isString(message.city))
                return "city: string expected";
        if (message.coordinates != null && message.hasOwnProperty("coordinates")) {
            var error = $root.GeoCoordiantes.verify(message.coordinates);
            if (error)
                return "coordinates." + error;
        }
        return null;
    };

    /**
     * Creates a NodeLocationMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof NodeLocationMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {NodeLocationMetadata} NodeLocationMetadata
     */
    NodeLocationMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.NodeLocationMetadata)
            return object;
        var message = new $root.NodeLocationMetadata();
        if (object.countryCode != null)
            message.countryCode = String(object.countryCode);
        if (object.city != null)
            message.city = String(object.city);
        if (object.coordinates != null) {
            if (typeof object.coordinates !== "object")
                throw TypeError(".NodeLocationMetadata.coordinates: object expected");
            message.coordinates = $root.GeoCoordiantes.fromObject(object.coordinates);
        }
        return message;
    };

    /**
     * Creates a plain object from a NodeLocationMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof NodeLocationMetadata
     * @static
     * @param {NodeLocationMetadata} message NodeLocationMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    NodeLocationMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.countryCode = "";
            object.city = "";
            object.coordinates = null;
        }
        if (message.countryCode != null && message.hasOwnProperty("countryCode"))
            object.countryCode = message.countryCode;
        if (message.city != null && message.hasOwnProperty("city"))
            object.city = message.city;
        if (message.coordinates != null && message.hasOwnProperty("coordinates"))
            object.coordinates = $root.GeoCoordiantes.toObject(message.coordinates, options);
        return object;
    };

    /**
     * Converts this NodeLocationMetadata to JSON.
     * @function toJSON
     * @memberof NodeLocationMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    NodeLocationMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return NodeLocationMetadata;
})();

$root.StorageBucketOperatorMetadata = (function() {

    /**
     * Properties of a StorageBucketOperatorMetadata.
     * @exports IStorageBucketOperatorMetadata
     * @interface IStorageBucketOperatorMetadata
     * @property {string|null} [endpoint] StorageBucketOperatorMetadata endpoint
     * @property {INodeLocationMetadata|null} [location] StorageBucketOperatorMetadata location
     * @property {string|null} [extra] StorageBucketOperatorMetadata extra
     */

    /**
     * Constructs a new StorageBucketOperatorMetadata.
     * @exports StorageBucketOperatorMetadata
     * @classdesc Represents a StorageBucketOperatorMetadata.
     * @implements IStorageBucketOperatorMetadata
     * @constructor
     * @param {IStorageBucketOperatorMetadata=} [properties] Properties to set
     */
    function StorageBucketOperatorMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StorageBucketOperatorMetadata endpoint.
     * @member {string} endpoint
     * @memberof StorageBucketOperatorMetadata
     * @instance
     */
    StorageBucketOperatorMetadata.prototype.endpoint = "";

    /**
     * StorageBucketOperatorMetadata location.
     * @member {INodeLocationMetadata|null|undefined} location
     * @memberof StorageBucketOperatorMetadata
     * @instance
     */
    StorageBucketOperatorMetadata.prototype.location = null;

    /**
     * StorageBucketOperatorMetadata extra.
     * @member {string} extra
     * @memberof StorageBucketOperatorMetadata
     * @instance
     */
    StorageBucketOperatorMetadata.prototype.extra = "";

    /**
     * Creates a new StorageBucketOperatorMetadata instance using the specified properties.
     * @function create
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {IStorageBucketOperatorMetadata=} [properties] Properties to set
     * @returns {StorageBucketOperatorMetadata} StorageBucketOperatorMetadata instance
     */
    StorageBucketOperatorMetadata.create = function create(properties) {
        return new StorageBucketOperatorMetadata(properties);
    };

    /**
     * Encodes the specified StorageBucketOperatorMetadata message. Does not implicitly {@link StorageBucketOperatorMetadata.verify|verify} messages.
     * @function encode
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {IStorageBucketOperatorMetadata} message StorageBucketOperatorMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StorageBucketOperatorMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.endpoint);
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.NodeLocationMetadata.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.extra);
        return writer;
    };

    /**
     * Encodes the specified StorageBucketOperatorMetadata message, length delimited. Does not implicitly {@link StorageBucketOperatorMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {IStorageBucketOperatorMetadata} message StorageBucketOperatorMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StorageBucketOperatorMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StorageBucketOperatorMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StorageBucketOperatorMetadata} StorageBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StorageBucketOperatorMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StorageBucketOperatorMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.endpoint = reader.string();
                break;
            case 2:
                message.location = $root.NodeLocationMetadata.decode(reader, reader.uint32());
                break;
            case 3:
                message.extra = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StorageBucketOperatorMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StorageBucketOperatorMetadata} StorageBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StorageBucketOperatorMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StorageBucketOperatorMetadata message.
     * @function verify
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StorageBucketOperatorMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.endpoint != null && message.hasOwnProperty("endpoint"))
            if (!$util.isString(message.endpoint))
                return "endpoint: string expected";
        if (message.location != null && message.hasOwnProperty("location")) {
            var error = $root.NodeLocationMetadata.verify(message.location);
            if (error)
                return "location." + error;
        }
        if (message.extra != null && message.hasOwnProperty("extra"))
            if (!$util.isString(message.extra))
                return "extra: string expected";
        return null;
    };

    /**
     * Creates a StorageBucketOperatorMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StorageBucketOperatorMetadata} StorageBucketOperatorMetadata
     */
    StorageBucketOperatorMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.StorageBucketOperatorMetadata)
            return object;
        var message = new $root.StorageBucketOperatorMetadata();
        if (object.endpoint != null)
            message.endpoint = String(object.endpoint);
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".StorageBucketOperatorMetadata.location: object expected");
            message.location = $root.NodeLocationMetadata.fromObject(object.location);
        }
        if (object.extra != null)
            message.extra = String(object.extra);
        return message;
    };

    /**
     * Creates a plain object from a StorageBucketOperatorMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StorageBucketOperatorMetadata
     * @static
     * @param {StorageBucketOperatorMetadata} message StorageBucketOperatorMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StorageBucketOperatorMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.endpoint = "";
            object.location = null;
            object.extra = "";
        }
        if (message.endpoint != null && message.hasOwnProperty("endpoint"))
            object.endpoint = message.endpoint;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.NodeLocationMetadata.toObject(message.location, options);
        if (message.extra != null && message.hasOwnProperty("extra"))
            object.extra = message.extra;
        return object;
    };

    /**
     * Converts this StorageBucketOperatorMetadata to JSON.
     * @function toJSON
     * @memberof StorageBucketOperatorMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StorageBucketOperatorMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StorageBucketOperatorMetadata;
})();

$root.DistributionBucketOperatorMetadata = (function() {

    /**
     * Properties of a DistributionBucketOperatorMetadata.
     * @exports IDistributionBucketOperatorMetadata
     * @interface IDistributionBucketOperatorMetadata
     * @property {string|null} [endpoint] DistributionBucketOperatorMetadata endpoint
     * @property {INodeLocationMetadata|null} [location] DistributionBucketOperatorMetadata location
     * @property {string|null} [extra] DistributionBucketOperatorMetadata extra
     */

    /**
     * Constructs a new DistributionBucketOperatorMetadata.
     * @exports DistributionBucketOperatorMetadata
     * @classdesc Represents a DistributionBucketOperatorMetadata.
     * @implements IDistributionBucketOperatorMetadata
     * @constructor
     * @param {IDistributionBucketOperatorMetadata=} [properties] Properties to set
     */
    function DistributionBucketOperatorMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DistributionBucketOperatorMetadata endpoint.
     * @member {string} endpoint
     * @memberof DistributionBucketOperatorMetadata
     * @instance
     */
    DistributionBucketOperatorMetadata.prototype.endpoint = "";

    /**
     * DistributionBucketOperatorMetadata location.
     * @member {INodeLocationMetadata|null|undefined} location
     * @memberof DistributionBucketOperatorMetadata
     * @instance
     */
    DistributionBucketOperatorMetadata.prototype.location = null;

    /**
     * DistributionBucketOperatorMetadata extra.
     * @member {string} extra
     * @memberof DistributionBucketOperatorMetadata
     * @instance
     */
    DistributionBucketOperatorMetadata.prototype.extra = "";

    /**
     * Creates a new DistributionBucketOperatorMetadata instance using the specified properties.
     * @function create
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {IDistributionBucketOperatorMetadata=} [properties] Properties to set
     * @returns {DistributionBucketOperatorMetadata} DistributionBucketOperatorMetadata instance
     */
    DistributionBucketOperatorMetadata.create = function create(properties) {
        return new DistributionBucketOperatorMetadata(properties);
    };

    /**
     * Encodes the specified DistributionBucketOperatorMetadata message. Does not implicitly {@link DistributionBucketOperatorMetadata.verify|verify} messages.
     * @function encode
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {IDistributionBucketOperatorMetadata} message DistributionBucketOperatorMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DistributionBucketOperatorMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.endpoint);
        if (message.location != null && Object.hasOwnProperty.call(message, "location"))
            $root.NodeLocationMetadata.encode(message.location, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.extra);
        return writer;
    };

    /**
     * Encodes the specified DistributionBucketOperatorMetadata message, length delimited. Does not implicitly {@link DistributionBucketOperatorMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {IDistributionBucketOperatorMetadata} message DistributionBucketOperatorMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DistributionBucketOperatorMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DistributionBucketOperatorMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DistributionBucketOperatorMetadata} DistributionBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DistributionBucketOperatorMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DistributionBucketOperatorMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.endpoint = reader.string();
                break;
            case 2:
                message.location = $root.NodeLocationMetadata.decode(reader, reader.uint32());
                break;
            case 3:
                message.extra = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DistributionBucketOperatorMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DistributionBucketOperatorMetadata} DistributionBucketOperatorMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DistributionBucketOperatorMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DistributionBucketOperatorMetadata message.
     * @function verify
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DistributionBucketOperatorMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.endpoint != null && message.hasOwnProperty("endpoint"))
            if (!$util.isString(message.endpoint))
                return "endpoint: string expected";
        if (message.location != null && message.hasOwnProperty("location")) {
            var error = $root.NodeLocationMetadata.verify(message.location);
            if (error)
                return "location." + error;
        }
        if (message.extra != null && message.hasOwnProperty("extra"))
            if (!$util.isString(message.extra))
                return "extra: string expected";
        return null;
    };

    /**
     * Creates a DistributionBucketOperatorMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DistributionBucketOperatorMetadata} DistributionBucketOperatorMetadata
     */
    DistributionBucketOperatorMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.DistributionBucketOperatorMetadata)
            return object;
        var message = new $root.DistributionBucketOperatorMetadata();
        if (object.endpoint != null)
            message.endpoint = String(object.endpoint);
        if (object.location != null) {
            if (typeof object.location !== "object")
                throw TypeError(".DistributionBucketOperatorMetadata.location: object expected");
            message.location = $root.NodeLocationMetadata.fromObject(object.location);
        }
        if (object.extra != null)
            message.extra = String(object.extra);
        return message;
    };

    /**
     * Creates a plain object from a DistributionBucketOperatorMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DistributionBucketOperatorMetadata
     * @static
     * @param {DistributionBucketOperatorMetadata} message DistributionBucketOperatorMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DistributionBucketOperatorMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.endpoint = "";
            object.location = null;
            object.extra = "";
        }
        if (message.endpoint != null && message.hasOwnProperty("endpoint"))
            object.endpoint = message.endpoint;
        if (message.location != null && message.hasOwnProperty("location"))
            object.location = $root.NodeLocationMetadata.toObject(message.location, options);
        if (message.extra != null && message.hasOwnProperty("extra"))
            object.extra = message.extra;
        return object;
    };

    /**
     * Converts this DistributionBucketOperatorMetadata to JSON.
     * @function toJSON
     * @memberof DistributionBucketOperatorMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DistributionBucketOperatorMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DistributionBucketOperatorMetadata;
})();

$root.GeographicalArea = (function() {

    /**
     * Properties of a GeographicalArea.
     * @exports IGeographicalArea
     * @interface IGeographicalArea
     * @property {GeographicalArea.Continent|null} [continent] GeographicalArea continent
     * @property {string|null} [countryCode] GeographicalArea countryCode
     * @property {string|null} [subdivisionCode] GeographicalArea subdivisionCode
     */

    /**
     * Constructs a new GeographicalArea.
     * @exports GeographicalArea
     * @classdesc Represents a GeographicalArea.
     * @implements IGeographicalArea
     * @constructor
     * @param {IGeographicalArea=} [properties] Properties to set
     */
    function GeographicalArea(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GeographicalArea continent.
     * @member {GeographicalArea.Continent|null|undefined} continent
     * @memberof GeographicalArea
     * @instance
     */
    GeographicalArea.prototype.continent = null;

    /**
     * GeographicalArea countryCode.
     * @member {string|null|undefined} countryCode
     * @memberof GeographicalArea
     * @instance
     */
    GeographicalArea.prototype.countryCode = null;

    /**
     * GeographicalArea subdivisionCode.
     * @member {string|null|undefined} subdivisionCode
     * @memberof GeographicalArea
     * @instance
     */
    GeographicalArea.prototype.subdivisionCode = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * GeographicalArea code.
     * @member {"continent"|"countryCode"|"subdivisionCode"|undefined} code
     * @memberof GeographicalArea
     * @instance
     */
    Object.defineProperty(GeographicalArea.prototype, "code", {
        get: $util.oneOfGetter($oneOfFields = ["continent", "countryCode", "subdivisionCode"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new GeographicalArea instance using the specified properties.
     * @function create
     * @memberof GeographicalArea
     * @static
     * @param {IGeographicalArea=} [properties] Properties to set
     * @returns {GeographicalArea} GeographicalArea instance
     */
    GeographicalArea.create = function create(properties) {
        return new GeographicalArea(properties);
    };

    /**
     * Encodes the specified GeographicalArea message. Does not implicitly {@link GeographicalArea.verify|verify} messages.
     * @function encode
     * @memberof GeographicalArea
     * @static
     * @param {IGeographicalArea} message GeographicalArea message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GeographicalArea.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.continent != null && Object.hasOwnProperty.call(message, "continent"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.continent);
        if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.countryCode);
        if (message.subdivisionCode != null && Object.hasOwnProperty.call(message, "subdivisionCode"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.subdivisionCode);
        return writer;
    };

    /**
     * Encodes the specified GeographicalArea message, length delimited. Does not implicitly {@link GeographicalArea.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GeographicalArea
     * @static
     * @param {IGeographicalArea} message GeographicalArea message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GeographicalArea.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GeographicalArea message from the specified reader or buffer.
     * @function decode
     * @memberof GeographicalArea
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GeographicalArea} GeographicalArea
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GeographicalArea.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GeographicalArea();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.continent = reader.int32();
                break;
            case 2:
                message.countryCode = reader.string();
                break;
            case 3:
                message.subdivisionCode = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GeographicalArea message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GeographicalArea
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GeographicalArea} GeographicalArea
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GeographicalArea.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GeographicalArea message.
     * @function verify
     * @memberof GeographicalArea
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GeographicalArea.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.continent != null && message.hasOwnProperty("continent")) {
            properties.code = 1;
            switch (message.continent) {
            default:
                return "continent: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break;
            }
        }
        if (message.countryCode != null && message.hasOwnProperty("countryCode")) {
            if (properties.code === 1)
                return "code: multiple values";
            properties.code = 1;
            if (!$util.isString(message.countryCode))
                return "countryCode: string expected";
        }
        if (message.subdivisionCode != null && message.hasOwnProperty("subdivisionCode")) {
            if (properties.code === 1)
                return "code: multiple values";
            properties.code = 1;
            if (!$util.isString(message.subdivisionCode))
                return "subdivisionCode: string expected";
        }
        return null;
    };

    /**
     * Creates a GeographicalArea message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GeographicalArea
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GeographicalArea} GeographicalArea
     */
    GeographicalArea.fromObject = function fromObject(object) {
        if (object instanceof $root.GeographicalArea)
            return object;
        var message = new $root.GeographicalArea();
        switch (object.continent) {
        case "AF":
        case 1:
            message.continent = 1;
            break;
        case "NA":
        case 2:
            message.continent = 2;
            break;
        case "OC":
        case 3:
            message.continent = 3;
            break;
        case "AN":
        case 4:
            message.continent = 4;
            break;
        case "AS":
        case 5:
            message.continent = 5;
            break;
        case "EU":
        case 6:
            message.continent = 6;
            break;
        case "SA":
        case 7:
            message.continent = 7;
            break;
        }
        if (object.countryCode != null)
            message.countryCode = String(object.countryCode);
        if (object.subdivisionCode != null)
            message.subdivisionCode = String(object.subdivisionCode);
        return message;
    };

    /**
     * Creates a plain object from a GeographicalArea message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GeographicalArea
     * @static
     * @param {GeographicalArea} message GeographicalArea
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GeographicalArea.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.continent != null && message.hasOwnProperty("continent")) {
            object.continent = options.enums === String ? $root.GeographicalArea.Continent[message.continent] : message.continent;
            if (options.oneofs)
                object.code = "continent";
        }
        if (message.countryCode != null && message.hasOwnProperty("countryCode")) {
            object.countryCode = message.countryCode;
            if (options.oneofs)
                object.code = "countryCode";
        }
        if (message.subdivisionCode != null && message.hasOwnProperty("subdivisionCode")) {
            object.subdivisionCode = message.subdivisionCode;
            if (options.oneofs)
                object.code = "subdivisionCode";
        }
        return object;
    };

    /**
     * Converts this GeographicalArea to JSON.
     * @function toJSON
     * @memberof GeographicalArea
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GeographicalArea.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Continent enum.
     * @name GeographicalArea.Continent
     * @enum {number}
     * @property {number} AF=1 AF value
     * @property {number} NA=2 NA value
     * @property {number} OC=3 OC value
     * @property {number} AN=4 AN value
     * @property {number} AS=5 AS value
     * @property {number} EU=6 EU value
     * @property {number} SA=7 SA value
     */
    GeographicalArea.Continent = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "AF"] = 1;
        values[valuesById[2] = "NA"] = 2;
        values[valuesById[3] = "OC"] = 3;
        values[valuesById[4] = "AN"] = 4;
        values[valuesById[5] = "AS"] = 5;
        values[valuesById[6] = "EU"] = 6;
        values[valuesById[7] = "SA"] = 7;
        return values;
    })();

    return GeographicalArea;
})();

$root.DistributionBucketFamilyMetadata = (function() {

    /**
     * Properties of a DistributionBucketFamilyMetadata.
     * @exports IDistributionBucketFamilyMetadata
     * @interface IDistributionBucketFamilyMetadata
     * @property {string|null} [region] DistributionBucketFamilyMetadata region
     * @property {string|null} [description] DistributionBucketFamilyMetadata description
     * @property {Array.<IGeographicalArea>|null} [areas] DistributionBucketFamilyMetadata areas
     * @property {Array.<string>|null} [latencyTestTargets] DistributionBucketFamilyMetadata latencyTestTargets
     */

    /**
     * Constructs a new DistributionBucketFamilyMetadata.
     * @exports DistributionBucketFamilyMetadata
     * @classdesc Represents a DistributionBucketFamilyMetadata.
     * @implements IDistributionBucketFamilyMetadata
     * @constructor
     * @param {IDistributionBucketFamilyMetadata=} [properties] Properties to set
     */
    function DistributionBucketFamilyMetadata(properties) {
        this.areas = [];
        this.latencyTestTargets = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DistributionBucketFamilyMetadata region.
     * @member {string} region
     * @memberof DistributionBucketFamilyMetadata
     * @instance
     */
    DistributionBucketFamilyMetadata.prototype.region = "";

    /**
     * DistributionBucketFamilyMetadata description.
     * @member {string} description
     * @memberof DistributionBucketFamilyMetadata
     * @instance
     */
    DistributionBucketFamilyMetadata.prototype.description = "";

    /**
     * DistributionBucketFamilyMetadata areas.
     * @member {Array.<IGeographicalArea>} areas
     * @memberof DistributionBucketFamilyMetadata
     * @instance
     */
    DistributionBucketFamilyMetadata.prototype.areas = $util.emptyArray;

    /**
     * DistributionBucketFamilyMetadata latencyTestTargets.
     * @member {Array.<string>} latencyTestTargets
     * @memberof DistributionBucketFamilyMetadata
     * @instance
     */
    DistributionBucketFamilyMetadata.prototype.latencyTestTargets = $util.emptyArray;

    /**
     * Creates a new DistributionBucketFamilyMetadata instance using the specified properties.
     * @function create
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {IDistributionBucketFamilyMetadata=} [properties] Properties to set
     * @returns {DistributionBucketFamilyMetadata} DistributionBucketFamilyMetadata instance
     */
    DistributionBucketFamilyMetadata.create = function create(properties) {
        return new DistributionBucketFamilyMetadata(properties);
    };

    /**
     * Encodes the specified DistributionBucketFamilyMetadata message. Does not implicitly {@link DistributionBucketFamilyMetadata.verify|verify} messages.
     * @function encode
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {IDistributionBucketFamilyMetadata} message DistributionBucketFamilyMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DistributionBucketFamilyMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.region != null && Object.hasOwnProperty.call(message, "region"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.region);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.areas != null && message.areas.length)
            for (var i = 0; i < message.areas.length; ++i)
                $root.GeographicalArea.encode(message.areas[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.latencyTestTargets != null && message.latencyTestTargets.length)
            for (var i = 0; i < message.latencyTestTargets.length; ++i)
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.latencyTestTargets[i]);
        return writer;
    };

    /**
     * Encodes the specified DistributionBucketFamilyMetadata message, length delimited. Does not implicitly {@link DistributionBucketFamilyMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {IDistributionBucketFamilyMetadata} message DistributionBucketFamilyMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DistributionBucketFamilyMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DistributionBucketFamilyMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DistributionBucketFamilyMetadata} DistributionBucketFamilyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DistributionBucketFamilyMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DistributionBucketFamilyMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.region = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                if (!(message.areas && message.areas.length))
                    message.areas = [];
                message.areas.push($root.GeographicalArea.decode(reader, reader.uint32()));
                break;
            case 4:
                if (!(message.latencyTestTargets && message.latencyTestTargets.length))
                    message.latencyTestTargets = [];
                message.latencyTestTargets.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DistributionBucketFamilyMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DistributionBucketFamilyMetadata} DistributionBucketFamilyMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DistributionBucketFamilyMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DistributionBucketFamilyMetadata message.
     * @function verify
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DistributionBucketFamilyMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.region != null && message.hasOwnProperty("region"))
            if (!$util.isString(message.region))
                return "region: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.areas != null && message.hasOwnProperty("areas")) {
            if (!Array.isArray(message.areas))
                return "areas: array expected";
            for (var i = 0; i < message.areas.length; ++i) {
                var error = $root.GeographicalArea.verify(message.areas[i]);
                if (error)
                    return "areas." + error;
            }
        }
        if (message.latencyTestTargets != null && message.hasOwnProperty("latencyTestTargets")) {
            if (!Array.isArray(message.latencyTestTargets))
                return "latencyTestTargets: array expected";
            for (var i = 0; i < message.latencyTestTargets.length; ++i)
                if (!$util.isString(message.latencyTestTargets[i]))
                    return "latencyTestTargets: string[] expected";
        }
        return null;
    };

    /**
     * Creates a DistributionBucketFamilyMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DistributionBucketFamilyMetadata} DistributionBucketFamilyMetadata
     */
    DistributionBucketFamilyMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.DistributionBucketFamilyMetadata)
            return object;
        var message = new $root.DistributionBucketFamilyMetadata();
        if (object.region != null)
            message.region = String(object.region);
        if (object.description != null)
            message.description = String(object.description);
        if (object.areas) {
            if (!Array.isArray(object.areas))
                throw TypeError(".DistributionBucketFamilyMetadata.areas: array expected");
            message.areas = [];
            for (var i = 0; i < object.areas.length; ++i) {
                if (typeof object.areas[i] !== "object")
                    throw TypeError(".DistributionBucketFamilyMetadata.areas: object expected");
                message.areas[i] = $root.GeographicalArea.fromObject(object.areas[i]);
            }
        }
        if (object.latencyTestTargets) {
            if (!Array.isArray(object.latencyTestTargets))
                throw TypeError(".DistributionBucketFamilyMetadata.latencyTestTargets: array expected");
            message.latencyTestTargets = [];
            for (var i = 0; i < object.latencyTestTargets.length; ++i)
                message.latencyTestTargets[i] = String(object.latencyTestTargets[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a DistributionBucketFamilyMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DistributionBucketFamilyMetadata
     * @static
     * @param {DistributionBucketFamilyMetadata} message DistributionBucketFamilyMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DistributionBucketFamilyMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.areas = [];
            object.latencyTestTargets = [];
        }
        if (options.defaults) {
            object.region = "";
            object.description = "";
        }
        if (message.region != null && message.hasOwnProperty("region"))
            object.region = message.region;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.areas && message.areas.length) {
            object.areas = [];
            for (var j = 0; j < message.areas.length; ++j)
                object.areas[j] = $root.GeographicalArea.toObject(message.areas[j], options);
        }
        if (message.latencyTestTargets && message.latencyTestTargets.length) {
            object.latencyTestTargets = [];
            for (var j = 0; j < message.latencyTestTargets.length; ++j)
                object.latencyTestTargets[j] = message.latencyTestTargets[j];
        }
        return object;
    };

    /**
     * Converts this DistributionBucketFamilyMetadata to JSON.
     * @function toJSON
     * @memberof DistributionBucketFamilyMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DistributionBucketFamilyMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DistributionBucketFamilyMetadata;
})();

$root.PublishedBeforeJoystream = (function() {

    /**
     * Properties of a PublishedBeforeJoystream.
     * @exports IPublishedBeforeJoystream
     * @interface IPublishedBeforeJoystream
     * @property {boolean|null} [isPublished] PublishedBeforeJoystream isPublished
     * @property {string|null} [date] PublishedBeforeJoystream date
     */

    /**
     * Constructs a new PublishedBeforeJoystream.
     * @exports PublishedBeforeJoystream
     * @classdesc Represents a PublishedBeforeJoystream.
     * @implements IPublishedBeforeJoystream
     * @constructor
     * @param {IPublishedBeforeJoystream=} [properties] Properties to set
     */
    function PublishedBeforeJoystream(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PublishedBeforeJoystream isPublished.
     * @member {boolean} isPublished
     * @memberof PublishedBeforeJoystream
     * @instance
     */
    PublishedBeforeJoystream.prototype.isPublished = false;

    /**
     * PublishedBeforeJoystream date.
     * @member {string} date
     * @memberof PublishedBeforeJoystream
     * @instance
     */
    PublishedBeforeJoystream.prototype.date = "";

    /**
     * Creates a new PublishedBeforeJoystream instance using the specified properties.
     * @function create
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {IPublishedBeforeJoystream=} [properties] Properties to set
     * @returns {PublishedBeforeJoystream} PublishedBeforeJoystream instance
     */
    PublishedBeforeJoystream.create = function create(properties) {
        return new PublishedBeforeJoystream(properties);
    };

    /**
     * Encodes the specified PublishedBeforeJoystream message. Does not implicitly {@link PublishedBeforeJoystream.verify|verify} messages.
     * @function encode
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {IPublishedBeforeJoystream} message PublishedBeforeJoystream message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PublishedBeforeJoystream.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.isPublished != null && Object.hasOwnProperty.call(message, "isPublished"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isPublished);
        if (message.date != null && Object.hasOwnProperty.call(message, "date"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.date);
        return writer;
    };

    /**
     * Encodes the specified PublishedBeforeJoystream message, length delimited. Does not implicitly {@link PublishedBeforeJoystream.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {IPublishedBeforeJoystream} message PublishedBeforeJoystream message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PublishedBeforeJoystream.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PublishedBeforeJoystream message from the specified reader or buffer.
     * @function decode
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PublishedBeforeJoystream} PublishedBeforeJoystream
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PublishedBeforeJoystream.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PublishedBeforeJoystream();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.isPublished = reader.bool();
                break;
            case 2:
                message.date = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PublishedBeforeJoystream message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PublishedBeforeJoystream} PublishedBeforeJoystream
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PublishedBeforeJoystream.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PublishedBeforeJoystream message.
     * @function verify
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PublishedBeforeJoystream.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.isPublished != null && message.hasOwnProperty("isPublished"))
            if (typeof message.isPublished !== "boolean")
                return "isPublished: boolean expected";
        if (message.date != null && message.hasOwnProperty("date"))
            if (!$util.isString(message.date))
                return "date: string expected";
        return null;
    };

    /**
     * Creates a PublishedBeforeJoystream message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PublishedBeforeJoystream} PublishedBeforeJoystream
     */
    PublishedBeforeJoystream.fromObject = function fromObject(object) {
        if (object instanceof $root.PublishedBeforeJoystream)
            return object;
        var message = new $root.PublishedBeforeJoystream();
        if (object.isPublished != null)
            message.isPublished = Boolean(object.isPublished);
        if (object.date != null)
            message.date = String(object.date);
        return message;
    };

    /**
     * Creates a plain object from a PublishedBeforeJoystream message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PublishedBeforeJoystream
     * @static
     * @param {PublishedBeforeJoystream} message PublishedBeforeJoystream
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PublishedBeforeJoystream.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.isPublished = false;
            object.date = "";
        }
        if (message.isPublished != null && message.hasOwnProperty("isPublished"))
            object.isPublished = message.isPublished;
        if (message.date != null && message.hasOwnProperty("date"))
            object.date = message.date;
        return object;
    };

    /**
     * Converts this PublishedBeforeJoystream to JSON.
     * @function toJSON
     * @memberof PublishedBeforeJoystream
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PublishedBeforeJoystream.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PublishedBeforeJoystream;
})();

$root.License = (function() {

    /**
     * Properties of a License.
     * @exports ILicense
     * @interface ILicense
     * @property {number|null} [code] License code
     * @property {string|null} [attribution] License attribution
     * @property {string|null} [customText] License customText
     */

    /**
     * Constructs a new License.
     * @exports License
     * @classdesc Represents a License.
     * @implements ILicense
     * @constructor
     * @param {ILicense=} [properties] Properties to set
     */
    function License(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * License code.
     * @member {number} code
     * @memberof License
     * @instance
     */
    License.prototype.code = 0;

    /**
     * License attribution.
     * @member {string} attribution
     * @memberof License
     * @instance
     */
    License.prototype.attribution = "";

    /**
     * License customText.
     * @member {string} customText
     * @memberof License
     * @instance
     */
    License.prototype.customText = "";

    /**
     * Creates a new License instance using the specified properties.
     * @function create
     * @memberof License
     * @static
     * @param {ILicense=} [properties] Properties to set
     * @returns {License} License instance
     */
    License.create = function create(properties) {
        return new License(properties);
    };

    /**
     * Encodes the specified License message. Does not implicitly {@link License.verify|verify} messages.
     * @function encode
     * @memberof License
     * @static
     * @param {ILicense} message License message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    License.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
        if (message.attribution != null && Object.hasOwnProperty.call(message, "attribution"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.attribution);
        if (message.customText != null && Object.hasOwnProperty.call(message, "customText"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.customText);
        return writer;
    };

    /**
     * Encodes the specified License message, length delimited. Does not implicitly {@link License.verify|verify} messages.
     * @function encodeDelimited
     * @memberof License
     * @static
     * @param {ILicense} message License message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    License.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a License message from the specified reader or buffer.
     * @function decode
     * @memberof License
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {License} License
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    License.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.License();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.code = reader.uint32();
                break;
            case 2:
                message.attribution = reader.string();
                break;
            case 3:
                message.customText = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a License message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof License
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {License} License
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    License.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a License message.
     * @function verify
     * @memberof License
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    License.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code))
                return "code: integer expected";
        if (message.attribution != null && message.hasOwnProperty("attribution"))
            if (!$util.isString(message.attribution))
                return "attribution: string expected";
        if (message.customText != null && message.hasOwnProperty("customText"))
            if (!$util.isString(message.customText))
                return "customText: string expected";
        return null;
    };

    /**
     * Creates a License message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof License
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {License} License
     */
    License.fromObject = function fromObject(object) {
        if (object instanceof $root.License)
            return object;
        var message = new $root.License();
        if (object.code != null)
            message.code = object.code >>> 0;
        if (object.attribution != null)
            message.attribution = String(object.attribution);
        if (object.customText != null)
            message.customText = String(object.customText);
        return message;
    };

    /**
     * Creates a plain object from a License message. Also converts values to other types if specified.
     * @function toObject
     * @memberof License
     * @static
     * @param {License} message License
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    License.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.code = 0;
            object.attribution = "";
            object.customText = "";
        }
        if (message.code != null && message.hasOwnProperty("code"))
            object.code = message.code;
        if (message.attribution != null && message.hasOwnProperty("attribution"))
            object.attribution = message.attribution;
        if (message.customText != null && message.hasOwnProperty("customText"))
            object.customText = message.customText;
        return object;
    };

    /**
     * Converts this License to JSON.
     * @function toJSON
     * @memberof License
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    License.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return License;
})();

$root.MediaType = (function() {

    /**
     * Properties of a MediaType.
     * @exports IMediaType
     * @interface IMediaType
     * @property {string|null} [codecName] MediaType codecName
     * @property {string|null} [container] MediaType container
     * @property {string|null} [mimeMediaType] MediaType mimeMediaType
     */

    /**
     * Constructs a new MediaType.
     * @exports MediaType
     * @classdesc Represents a MediaType.
     * @implements IMediaType
     * @constructor
     * @param {IMediaType=} [properties] Properties to set
     */
    function MediaType(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MediaType codecName.
     * @member {string} codecName
     * @memberof MediaType
     * @instance
     */
    MediaType.prototype.codecName = "";

    /**
     * MediaType container.
     * @member {string} container
     * @memberof MediaType
     * @instance
     */
    MediaType.prototype.container = "";

    /**
     * MediaType mimeMediaType.
     * @member {string} mimeMediaType
     * @memberof MediaType
     * @instance
     */
    MediaType.prototype.mimeMediaType = "";

    /**
     * Creates a new MediaType instance using the specified properties.
     * @function create
     * @memberof MediaType
     * @static
     * @param {IMediaType=} [properties] Properties to set
     * @returns {MediaType} MediaType instance
     */
    MediaType.create = function create(properties) {
        return new MediaType(properties);
    };

    /**
     * Encodes the specified MediaType message. Does not implicitly {@link MediaType.verify|verify} messages.
     * @function encode
     * @memberof MediaType
     * @static
     * @param {IMediaType} message MediaType message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MediaType.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.codecName != null && Object.hasOwnProperty.call(message, "codecName"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.codecName);
        if (message.container != null && Object.hasOwnProperty.call(message, "container"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.container);
        if (message.mimeMediaType != null && Object.hasOwnProperty.call(message, "mimeMediaType"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.mimeMediaType);
        return writer;
    };

    /**
     * Encodes the specified MediaType message, length delimited. Does not implicitly {@link MediaType.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MediaType
     * @static
     * @param {IMediaType} message MediaType message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MediaType.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MediaType message from the specified reader or buffer.
     * @function decode
     * @memberof MediaType
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MediaType} MediaType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MediaType.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MediaType();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.codecName = reader.string();
                break;
            case 2:
                message.container = reader.string();
                break;
            case 3:
                message.mimeMediaType = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MediaType message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MediaType
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MediaType} MediaType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MediaType.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MediaType message.
     * @function verify
     * @memberof MediaType
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MediaType.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.codecName != null && message.hasOwnProperty("codecName"))
            if (!$util.isString(message.codecName))
                return "codecName: string expected";
        if (message.container != null && message.hasOwnProperty("container"))
            if (!$util.isString(message.container))
                return "container: string expected";
        if (message.mimeMediaType != null && message.hasOwnProperty("mimeMediaType"))
            if (!$util.isString(message.mimeMediaType))
                return "mimeMediaType: string expected";
        return null;
    };

    /**
     * Creates a MediaType message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MediaType
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MediaType} MediaType
     */
    MediaType.fromObject = function fromObject(object) {
        if (object instanceof $root.MediaType)
            return object;
        var message = new $root.MediaType();
        if (object.codecName != null)
            message.codecName = String(object.codecName);
        if (object.container != null)
            message.container = String(object.container);
        if (object.mimeMediaType != null)
            message.mimeMediaType = String(object.mimeMediaType);
        return message;
    };

    /**
     * Creates a plain object from a MediaType message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MediaType
     * @static
     * @param {MediaType} message MediaType
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MediaType.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.codecName = "";
            object.container = "";
            object.mimeMediaType = "";
        }
        if (message.codecName != null && message.hasOwnProperty("codecName"))
            object.codecName = message.codecName;
        if (message.container != null && message.hasOwnProperty("container"))
            object.container = message.container;
        if (message.mimeMediaType != null && message.hasOwnProperty("mimeMediaType"))
            object.mimeMediaType = message.mimeMediaType;
        return object;
    };

    /**
     * Converts this MediaType to JSON.
     * @function toJSON
     * @memberof MediaType
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MediaType.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MediaType;
})();

$root.SubtitleMetadata = (function() {

    /**
     * Properties of a SubtitleMetadata.
     * @exports ISubtitleMetadata
     * @interface ISubtitleMetadata
     * @property {string} type SubtitleMetadata type
     * @property {number|null} [newAsset] SubtitleMetadata newAsset
     * @property {string} language SubtitleMetadata language
     * @property {string} mimeType SubtitleMetadata mimeType
     */

    /**
     * Constructs a new SubtitleMetadata.
     * @exports SubtitleMetadata
     * @classdesc Represents a SubtitleMetadata.
     * @implements ISubtitleMetadata
     * @constructor
     * @param {ISubtitleMetadata=} [properties] Properties to set
     */
    function SubtitleMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SubtitleMetadata type.
     * @member {string} type
     * @memberof SubtitleMetadata
     * @instance
     */
    SubtitleMetadata.prototype.type = "";

    /**
     * SubtitleMetadata newAsset.
     * @member {number} newAsset
     * @memberof SubtitleMetadata
     * @instance
     */
    SubtitleMetadata.prototype.newAsset = 0;

    /**
     * SubtitleMetadata language.
     * @member {string} language
     * @memberof SubtitleMetadata
     * @instance
     */
    SubtitleMetadata.prototype.language = "";

    /**
     * SubtitleMetadata mimeType.
     * @member {string} mimeType
     * @memberof SubtitleMetadata
     * @instance
     */
    SubtitleMetadata.prototype.mimeType = "";

    /**
     * Creates a new SubtitleMetadata instance using the specified properties.
     * @function create
     * @memberof SubtitleMetadata
     * @static
     * @param {ISubtitleMetadata=} [properties] Properties to set
     * @returns {SubtitleMetadata} SubtitleMetadata instance
     */
    SubtitleMetadata.create = function create(properties) {
        return new SubtitleMetadata(properties);
    };

    /**
     * Encodes the specified SubtitleMetadata message. Does not implicitly {@link SubtitleMetadata.verify|verify} messages.
     * @function encode
     * @memberof SubtitleMetadata
     * @static
     * @param {ISubtitleMetadata} message SubtitleMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubtitleMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
        if (message.newAsset != null && Object.hasOwnProperty.call(message, "newAsset"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.newAsset);
        writer.uint32(/* id 3, wireType 2 =*/26).string(message.language);
        writer.uint32(/* id 4, wireType 2 =*/34).string(message.mimeType);
        return writer;
    };

    /**
     * Encodes the specified SubtitleMetadata message, length delimited. Does not implicitly {@link SubtitleMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SubtitleMetadata
     * @static
     * @param {ISubtitleMetadata} message SubtitleMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SubtitleMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SubtitleMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof SubtitleMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SubtitleMetadata} SubtitleMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubtitleMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SubtitleMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.string();
                break;
            case 2:
                message.newAsset = reader.uint32();
                break;
            case 3:
                message.language = reader.string();
                break;
            case 4:
                message.mimeType = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("type"))
            throw $util.ProtocolError("missing required 'type'", { instance: message });
        if (!message.hasOwnProperty("language"))
            throw $util.ProtocolError("missing required 'language'", { instance: message });
        if (!message.hasOwnProperty("mimeType"))
            throw $util.ProtocolError("missing required 'mimeType'", { instance: message });
        return message;
    };

    /**
     * Decodes a SubtitleMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SubtitleMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SubtitleMetadata} SubtitleMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SubtitleMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SubtitleMetadata message.
     * @function verify
     * @memberof SubtitleMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SubtitleMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (!$util.isString(message.type))
            return "type: string expected";
        if (message.newAsset != null && message.hasOwnProperty("newAsset"))
            if (!$util.isInteger(message.newAsset))
                return "newAsset: integer expected";
        if (!$util.isString(message.language))
            return "language: string expected";
        if (!$util.isString(message.mimeType))
            return "mimeType: string expected";
        return null;
    };

    /**
     * Creates a SubtitleMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SubtitleMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SubtitleMetadata} SubtitleMetadata
     */
    SubtitleMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.SubtitleMetadata)
            return object;
        var message = new $root.SubtitleMetadata();
        if (object.type != null)
            message.type = String(object.type);
        if (object.newAsset != null)
            message.newAsset = object.newAsset >>> 0;
        if (object.language != null)
            message.language = String(object.language);
        if (object.mimeType != null)
            message.mimeType = String(object.mimeType);
        return message;
    };

    /**
     * Creates a plain object from a SubtitleMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SubtitleMetadata
     * @static
     * @param {SubtitleMetadata} message SubtitleMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SubtitleMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = "";
            object.newAsset = 0;
            object.language = "";
            object.mimeType = "";
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = message.type;
        if (message.newAsset != null && message.hasOwnProperty("newAsset"))
            object.newAsset = message.newAsset;
        if (message.language != null && message.hasOwnProperty("language"))
            object.language = message.language;
        if (message.mimeType != null && message.hasOwnProperty("mimeType"))
            object.mimeType = message.mimeType;
        return object;
    };

    /**
     * Converts this SubtitleMetadata to JSON.
     * @function toJSON
     * @memberof SubtitleMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SubtitleMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SubtitleMetadata;
})();

$root.VideoMetadata = (function() {

    /**
     * Properties of a VideoMetadata.
     * @exports IVideoMetadata
     * @interface IVideoMetadata
     * @property {string|null} [title] VideoMetadata title
     * @property {string|null} [description] VideoMetadata description
     * @property {number|null} [video] VideoMetadata video
     * @property {number|null} [thumbnailPhoto] VideoMetadata thumbnailPhoto
     * @property {number|null} [duration] VideoMetadata duration
     * @property {number|null} [mediaPixelHeight] VideoMetadata mediaPixelHeight
     * @property {number|null} [mediaPixelWidth] VideoMetadata mediaPixelWidth
     * @property {IMediaType|null} [mediaType] VideoMetadata mediaType
     * @property {string|null} [language] VideoMetadata language
     * @property {ILicense|null} [license] VideoMetadata license
     * @property {IPublishedBeforeJoystream|null} [publishedBeforeJoystream] VideoMetadata publishedBeforeJoystream
     * @property {boolean|null} [hasMarketing] VideoMetadata hasMarketing
     * @property {boolean|null} [isPublic] VideoMetadata isPublic
     * @property {boolean|null} [isExplicit] VideoMetadata isExplicit
     * @property {Array.<Long>|null} [persons] VideoMetadata persons
     * @property {string|null} [category] VideoMetadata category
     * @property {Array.<ISubtitleMetadata>|null} [subtitles] VideoMetadata subtitles
     * @property {boolean|null} [enableComments] VideoMetadata enableComments
     * @property {boolean|null} [clearSubtitles] VideoMetadata clearSubtitles
     */

    /**
     * Constructs a new VideoMetadata.
     * @exports VideoMetadata
     * @classdesc Represents a VideoMetadata.
     * @implements IVideoMetadata
     * @constructor
     * @param {IVideoMetadata=} [properties] Properties to set
     */
    function VideoMetadata(properties) {
        this.persons = [];
        this.subtitles = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * VideoMetadata title.
     * @member {string} title
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.title = "";

    /**
     * VideoMetadata description.
     * @member {string} description
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.description = "";

    /**
     * VideoMetadata video.
     * @member {number} video
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.video = 0;

    /**
     * VideoMetadata thumbnailPhoto.
     * @member {number} thumbnailPhoto
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.thumbnailPhoto = 0;

    /**
     * VideoMetadata duration.
     * @member {number} duration
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.duration = 0;

    /**
     * VideoMetadata mediaPixelHeight.
     * @member {number} mediaPixelHeight
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.mediaPixelHeight = 0;

    /**
     * VideoMetadata mediaPixelWidth.
     * @member {number} mediaPixelWidth
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.mediaPixelWidth = 0;

    /**
     * VideoMetadata mediaType.
     * @member {IMediaType|null|undefined} mediaType
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.mediaType = null;

    /**
     * VideoMetadata language.
     * @member {string} language
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.language = "";

    /**
     * VideoMetadata license.
     * @member {ILicense|null|undefined} license
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.license = null;

    /**
     * VideoMetadata publishedBeforeJoystream.
     * @member {IPublishedBeforeJoystream|null|undefined} publishedBeforeJoystream
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.publishedBeforeJoystream = null;

    /**
     * VideoMetadata hasMarketing.
     * @member {boolean} hasMarketing
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.hasMarketing = false;

    /**
     * VideoMetadata isPublic.
     * @member {boolean} isPublic
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.isPublic = false;

    /**
     * VideoMetadata isExplicit.
     * @member {boolean} isExplicit
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.isExplicit = false;

    /**
     * VideoMetadata persons.
     * @member {Array.<Long>} persons
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.persons = $util.emptyArray;

    /**
     * VideoMetadata category.
     * @member {string} category
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.category = "";

    /**
     * VideoMetadata subtitles.
     * @member {Array.<ISubtitleMetadata>} subtitles
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.subtitles = $util.emptyArray;

    /**
     * VideoMetadata enableComments.
     * @member {boolean} enableComments
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.enableComments = false;

    /**
     * VideoMetadata clearSubtitles.
     * @member {boolean} clearSubtitles
     * @memberof VideoMetadata
     * @instance
     */
    VideoMetadata.prototype.clearSubtitles = false;

    /**
     * Creates a new VideoMetadata instance using the specified properties.
     * @function create
     * @memberof VideoMetadata
     * @static
     * @param {IVideoMetadata=} [properties] Properties to set
     * @returns {VideoMetadata} VideoMetadata instance
     */
    VideoMetadata.create = function create(properties) {
        return new VideoMetadata(properties);
    };

    /**
     * Encodes the specified VideoMetadata message. Does not implicitly {@link VideoMetadata.verify|verify} messages.
     * @function encode
     * @memberof VideoMetadata
     * @static
     * @param {IVideoMetadata} message VideoMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VideoMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.title);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.video != null && Object.hasOwnProperty.call(message, "video"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.video);
        if (message.thumbnailPhoto != null && Object.hasOwnProperty.call(message, "thumbnailPhoto"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.thumbnailPhoto);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.duration);
        if (message.mediaPixelHeight != null && Object.hasOwnProperty.call(message, "mediaPixelHeight"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.mediaPixelHeight);
        if (message.mediaPixelWidth != null && Object.hasOwnProperty.call(message, "mediaPixelWidth"))
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.mediaPixelWidth);
        if (message.mediaType != null && Object.hasOwnProperty.call(message, "mediaType"))
            $root.MediaType.encode(message.mediaType, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.language != null && Object.hasOwnProperty.call(message, "language"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.language);
        if (message.license != null && Object.hasOwnProperty.call(message, "license"))
            $root.License.encode(message.license, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
        if (message.publishedBeforeJoystream != null && Object.hasOwnProperty.call(message, "publishedBeforeJoystream"))
            $root.PublishedBeforeJoystream.encode(message.publishedBeforeJoystream, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
        if (message.hasMarketing != null && Object.hasOwnProperty.call(message, "hasMarketing"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.hasMarketing);
        if (message.isPublic != null && Object.hasOwnProperty.call(message, "isPublic"))
            writer.uint32(/* id 13, wireType 0 =*/104).bool(message.isPublic);
        if (message.isExplicit != null && Object.hasOwnProperty.call(message, "isExplicit"))
            writer.uint32(/* id 14, wireType 0 =*/112).bool(message.isExplicit);
        if (message.persons != null && message.persons.length) {
            writer.uint32(/* id 15, wireType 2 =*/122).fork();
            for (var i = 0; i < message.persons.length; ++i)
                writer.uint64(message.persons[i]);
            writer.ldelim();
        }
        if (message.category != null && Object.hasOwnProperty.call(message, "category"))
            writer.uint32(/* id 16, wireType 2 =*/130).string(message.category);
        if (message.subtitles != null && message.subtitles.length)
            for (var i = 0; i < message.subtitles.length; ++i)
                $root.SubtitleMetadata.encode(message.subtitles[i], writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
        if (message.enableComments != null && Object.hasOwnProperty.call(message, "enableComments"))
            writer.uint32(/* id 18, wireType 0 =*/144).bool(message.enableComments);
        if (message.clearSubtitles != null && Object.hasOwnProperty.call(message, "clearSubtitles"))
            writer.uint32(/* id 19, wireType 0 =*/152).bool(message.clearSubtitles);
        return writer;
    };

    /**
     * Encodes the specified VideoMetadata message, length delimited. Does not implicitly {@link VideoMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof VideoMetadata
     * @static
     * @param {IVideoMetadata} message VideoMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    VideoMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a VideoMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof VideoMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {VideoMetadata} VideoMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VideoMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.VideoMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.title = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.video = reader.uint32();
                break;
            case 4:
                message.thumbnailPhoto = reader.uint32();
                break;
            case 5:
                message.duration = reader.uint32();
                break;
            case 6:
                message.mediaPixelHeight = reader.uint32();
                break;
            case 7:
                message.mediaPixelWidth = reader.uint32();
                break;
            case 8:
                message.mediaType = $root.MediaType.decode(reader, reader.uint32());
                break;
            case 9:
                message.language = reader.string();
                break;
            case 10:
                message.license = $root.License.decode(reader, reader.uint32());
                break;
            case 11:
                message.publishedBeforeJoystream = $root.PublishedBeforeJoystream.decode(reader, reader.uint32());
                break;
            case 12:
                message.hasMarketing = reader.bool();
                break;
            case 13:
                message.isPublic = reader.bool();
                break;
            case 14:
                message.isExplicit = reader.bool();
                break;
            case 15:
                if (!(message.persons && message.persons.length))
                    message.persons = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.persons.push(reader.uint64());
                } else
                    message.persons.push(reader.uint64());
                break;
            case 16:
                message.category = reader.string();
                break;
            case 17:
                if (!(message.subtitles && message.subtitles.length))
                    message.subtitles = [];
                message.subtitles.push($root.SubtitleMetadata.decode(reader, reader.uint32()));
                break;
            case 18:
                message.enableComments = reader.bool();
                break;
            case 19:
                message.clearSubtitles = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a VideoMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof VideoMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {VideoMetadata} VideoMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    VideoMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a VideoMetadata message.
     * @function verify
     * @memberof VideoMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    VideoMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.video != null && message.hasOwnProperty("video"))
            if (!$util.isInteger(message.video))
                return "video: integer expected";
        if (message.thumbnailPhoto != null && message.hasOwnProperty("thumbnailPhoto"))
            if (!$util.isInteger(message.thumbnailPhoto))
                return "thumbnailPhoto: integer expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (!$util.isInteger(message.duration))
                return "duration: integer expected";
        if (message.mediaPixelHeight != null && message.hasOwnProperty("mediaPixelHeight"))
            if (!$util.isInteger(message.mediaPixelHeight))
                return "mediaPixelHeight: integer expected";
        if (message.mediaPixelWidth != null && message.hasOwnProperty("mediaPixelWidth"))
            if (!$util.isInteger(message.mediaPixelWidth))
                return "mediaPixelWidth: integer expected";
        if (message.mediaType != null && message.hasOwnProperty("mediaType")) {
            var error = $root.MediaType.verify(message.mediaType);
            if (error)
                return "mediaType." + error;
        }
        if (message.language != null && message.hasOwnProperty("language"))
            if (!$util.isString(message.language))
                return "language: string expected";
        if (message.license != null && message.hasOwnProperty("license")) {
            var error = $root.License.verify(message.license);
            if (error)
                return "license." + error;
        }
        if (message.publishedBeforeJoystream != null && message.hasOwnProperty("publishedBeforeJoystream")) {
            var error = $root.PublishedBeforeJoystream.verify(message.publishedBeforeJoystream);
            if (error)
                return "publishedBeforeJoystream." + error;
        }
        if (message.hasMarketing != null && message.hasOwnProperty("hasMarketing"))
            if (typeof message.hasMarketing !== "boolean")
                return "hasMarketing: boolean expected";
        if (message.isPublic != null && message.hasOwnProperty("isPublic"))
            if (typeof message.isPublic !== "boolean")
                return "isPublic: boolean expected";
        if (message.isExplicit != null && message.hasOwnProperty("isExplicit"))
            if (typeof message.isExplicit !== "boolean")
                return "isExplicit: boolean expected";
        if (message.persons != null && message.hasOwnProperty("persons")) {
            if (!Array.isArray(message.persons))
                return "persons: array expected";
            for (var i = 0; i < message.persons.length; ++i)
                if (!$util.isInteger(message.persons[i]) && !(message.persons[i] && $util.isInteger(message.persons[i].low) && $util.isInteger(message.persons[i].high)))
                    return "persons: integer|Long[] expected";
        }
        if (message.category != null && message.hasOwnProperty("category"))
            if (!$util.isString(message.category))
                return "category: string expected";
        if (message.subtitles != null && message.hasOwnProperty("subtitles")) {
            if (!Array.isArray(message.subtitles))
                return "subtitles: array expected";
            for (var i = 0; i < message.subtitles.length; ++i) {
                var error = $root.SubtitleMetadata.verify(message.subtitles[i]);
                if (error)
                    return "subtitles." + error;
            }
        }
        if (message.enableComments != null && message.hasOwnProperty("enableComments"))
            if (typeof message.enableComments !== "boolean")
                return "enableComments: boolean expected";
        if (message.clearSubtitles != null && message.hasOwnProperty("clearSubtitles"))
            if (typeof message.clearSubtitles !== "boolean")
                return "clearSubtitles: boolean expected";
        return null;
    };

    /**
     * Creates a VideoMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof VideoMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {VideoMetadata} VideoMetadata
     */
    VideoMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.VideoMetadata)
            return object;
        var message = new $root.VideoMetadata();
        if (object.title != null)
            message.title = String(object.title);
        if (object.description != null)
            message.description = String(object.description);
        if (object.video != null)
            message.video = object.video >>> 0;
        if (object.thumbnailPhoto != null)
            message.thumbnailPhoto = object.thumbnailPhoto >>> 0;
        if (object.duration != null)
            message.duration = object.duration >>> 0;
        if (object.mediaPixelHeight != null)
            message.mediaPixelHeight = object.mediaPixelHeight >>> 0;
        if (object.mediaPixelWidth != null)
            message.mediaPixelWidth = object.mediaPixelWidth >>> 0;
        if (object.mediaType != null) {
            if (typeof object.mediaType !== "object")
                throw TypeError(".VideoMetadata.mediaType: object expected");
            message.mediaType = $root.MediaType.fromObject(object.mediaType);
        }
        if (object.language != null)
            message.language = String(object.language);
        if (object.license != null) {
            if (typeof object.license !== "object")
                throw TypeError(".VideoMetadata.license: object expected");
            message.license = $root.License.fromObject(object.license);
        }
        if (object.publishedBeforeJoystream != null) {
            if (typeof object.publishedBeforeJoystream !== "object")
                throw TypeError(".VideoMetadata.publishedBeforeJoystream: object expected");
            message.publishedBeforeJoystream = $root.PublishedBeforeJoystream.fromObject(object.publishedBeforeJoystream);
        }
        if (object.hasMarketing != null)
            message.hasMarketing = Boolean(object.hasMarketing);
        if (object.isPublic != null)
            message.isPublic = Boolean(object.isPublic);
        if (object.isExplicit != null)
            message.isExplicit = Boolean(object.isExplicit);
        if (object.persons) {
            if (!Array.isArray(object.persons))
                throw TypeError(".VideoMetadata.persons: array expected");
            message.persons = [];
            for (var i = 0; i < object.persons.length; ++i)
                if ($util.Long)
                    (message.persons[i] = $util.Long.fromValue(object.persons[i])).unsigned = true;
                else if (typeof object.persons[i] === "string")
                    message.persons[i] = parseInt(object.persons[i], 10);
                else if (typeof object.persons[i] === "number")
                    message.persons[i] = object.persons[i];
                else if (typeof object.persons[i] === "object")
                    message.persons[i] = new $util.LongBits(object.persons[i].low >>> 0, object.persons[i].high >>> 0).toNumber(true);
        }
        if (object.category != null)
            message.category = String(object.category);
        if (object.subtitles) {
            if (!Array.isArray(object.subtitles))
                throw TypeError(".VideoMetadata.subtitles: array expected");
            message.subtitles = [];
            for (var i = 0; i < object.subtitles.length; ++i) {
                if (typeof object.subtitles[i] !== "object")
                    throw TypeError(".VideoMetadata.subtitles: object expected");
                message.subtitles[i] = $root.SubtitleMetadata.fromObject(object.subtitles[i]);
            }
        }
        if (object.enableComments != null)
            message.enableComments = Boolean(object.enableComments);
        if (object.clearSubtitles != null)
            message.clearSubtitles = Boolean(object.clearSubtitles);
        return message;
    };

    /**
     * Creates a plain object from a VideoMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof VideoMetadata
     * @static
     * @param {VideoMetadata} message VideoMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    VideoMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.persons = [];
            object.subtitles = [];
        }
        if (options.defaults) {
            object.title = "";
            object.description = "";
            object.video = 0;
            object.thumbnailPhoto = 0;
            object.duration = 0;
            object.mediaPixelHeight = 0;
            object.mediaPixelWidth = 0;
            object.mediaType = null;
            object.language = "";
            object.license = null;
            object.publishedBeforeJoystream = null;
            object.hasMarketing = false;
            object.isPublic = false;
            object.isExplicit = false;
            object.category = "";
            object.enableComments = false;
            object.clearSubtitles = false;
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.video != null && message.hasOwnProperty("video"))
            object.video = message.video;
        if (message.thumbnailPhoto != null && message.hasOwnProperty("thumbnailPhoto"))
            object.thumbnailPhoto = message.thumbnailPhoto;
        if (message.duration != null && message.hasOwnProperty("duration"))
            object.duration = message.duration;
        if (message.mediaPixelHeight != null && message.hasOwnProperty("mediaPixelHeight"))
            object.mediaPixelHeight = message.mediaPixelHeight;
        if (message.mediaPixelWidth != null && message.hasOwnProperty("mediaPixelWidth"))
            object.mediaPixelWidth = message.mediaPixelWidth;
        if (message.mediaType != null && message.hasOwnProperty("mediaType"))
            object.mediaType = $root.MediaType.toObject(message.mediaType, options);
        if (message.language != null && message.hasOwnProperty("language"))
            object.language = message.language;
        if (message.license != null && message.hasOwnProperty("license"))
            object.license = $root.License.toObject(message.license, options);
        if (message.publishedBeforeJoystream != null && message.hasOwnProperty("publishedBeforeJoystream"))
            object.publishedBeforeJoystream = $root.PublishedBeforeJoystream.toObject(message.publishedBeforeJoystream, options);
        if (message.hasMarketing != null && message.hasOwnProperty("hasMarketing"))
            object.hasMarketing = message.hasMarketing;
        if (message.isPublic != null && message.hasOwnProperty("isPublic"))
            object.isPublic = message.isPublic;
        if (message.isExplicit != null && message.hasOwnProperty("isExplicit"))
            object.isExplicit = message.isExplicit;
        if (message.persons && message.persons.length) {
            object.persons = [];
            for (var j = 0; j < message.persons.length; ++j)
                if (typeof message.persons[j] === "number")
                    object.persons[j] = options.longs === String ? String(message.persons[j]) : message.persons[j];
                else
                    object.persons[j] = options.longs === String ? $util.Long.prototype.toString.call(message.persons[j]) : options.longs === Number ? new $util.LongBits(message.persons[j].low >>> 0, message.persons[j].high >>> 0).toNumber(true) : message.persons[j];
        }
        if (message.category != null && message.hasOwnProperty("category"))
            object.category = message.category;
        if (message.subtitles && message.subtitles.length) {
            object.subtitles = [];
            for (var j = 0; j < message.subtitles.length; ++j)
                object.subtitles[j] = $root.SubtitleMetadata.toObject(message.subtitles[j], options);
        }
        if (message.enableComments != null && message.hasOwnProperty("enableComments"))
            object.enableComments = message.enableComments;
        if (message.clearSubtitles != null && message.hasOwnProperty("clearSubtitles"))
            object.clearSubtitles = message.clearSubtitles;
        return object;
    };

    /**
     * Converts this VideoMetadata to JSON.
     * @function toJSON
     * @memberof VideoMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    VideoMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return VideoMetadata;
})();

$root.ContentMetadata = (function() {

    /**
     * Properties of a ContentMetadata.
     * @exports IContentMetadata
     * @interface IContentMetadata
     * @property {IVideoMetadata|null} [videoMetadata] ContentMetadata videoMetadata
     */

    /**
     * Constructs a new ContentMetadata.
     * @exports ContentMetadata
     * @classdesc Represents a ContentMetadata.
     * @implements IContentMetadata
     * @constructor
     * @param {IContentMetadata=} [properties] Properties to set
     */
    function ContentMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ContentMetadata videoMetadata.
     * @member {IVideoMetadata|null|undefined} videoMetadata
     * @memberof ContentMetadata
     * @instance
     */
    ContentMetadata.prototype.videoMetadata = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ContentMetadata contentMetadata.
     * @member {"videoMetadata"|undefined} contentMetadata
     * @memberof ContentMetadata
     * @instance
     */
    Object.defineProperty(ContentMetadata.prototype, "contentMetadata", {
        get: $util.oneOfGetter($oneOfFields = ["videoMetadata"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ContentMetadata instance using the specified properties.
     * @function create
     * @memberof ContentMetadata
     * @static
     * @param {IContentMetadata=} [properties] Properties to set
     * @returns {ContentMetadata} ContentMetadata instance
     */
    ContentMetadata.create = function create(properties) {
        return new ContentMetadata(properties);
    };

    /**
     * Encodes the specified ContentMetadata message. Does not implicitly {@link ContentMetadata.verify|verify} messages.
     * @function encode
     * @memberof ContentMetadata
     * @static
     * @param {IContentMetadata} message ContentMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ContentMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.videoMetadata != null && Object.hasOwnProperty.call(message, "videoMetadata"))
            $root.VideoMetadata.encode(message.videoMetadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ContentMetadata message, length delimited. Does not implicitly {@link ContentMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ContentMetadata
     * @static
     * @param {IContentMetadata} message ContentMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ContentMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ContentMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ContentMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ContentMetadata} ContentMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ContentMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ContentMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.videoMetadata = $root.VideoMetadata.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ContentMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ContentMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ContentMetadata} ContentMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ContentMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ContentMetadata message.
     * @function verify
     * @memberof ContentMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ContentMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.videoMetadata != null && message.hasOwnProperty("videoMetadata")) {
            properties.contentMetadata = 1;
            {
                var error = $root.VideoMetadata.verify(message.videoMetadata);
                if (error)
                    return "videoMetadata." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ContentMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ContentMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ContentMetadata} ContentMetadata
     */
    ContentMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ContentMetadata)
            return object;
        var message = new $root.ContentMetadata();
        if (object.videoMetadata != null) {
            if (typeof object.videoMetadata !== "object")
                throw TypeError(".ContentMetadata.videoMetadata: object expected");
            message.videoMetadata = $root.VideoMetadata.fromObject(object.videoMetadata);
        }
        return message;
    };

    /**
     * Creates a plain object from a ContentMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ContentMetadata
     * @static
     * @param {ContentMetadata} message ContentMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ContentMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.videoMetadata != null && message.hasOwnProperty("videoMetadata")) {
            object.videoMetadata = $root.VideoMetadata.toObject(message.videoMetadata, options);
            if (options.oneofs)
                object.contentMetadata = "videoMetadata";
        }
        return object;
    };

    /**
     * Converts this ContentMetadata to JSON.
     * @function toJSON
     * @memberof ContentMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ContentMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ContentMetadata;
})();

$root.OpeningMetadata = (function() {

    /**
     * Properties of an OpeningMetadata.
     * @exports IOpeningMetadata
     * @interface IOpeningMetadata
     * @property {string|null} [shortDescription] OpeningMetadata shortDescription
     * @property {string|null} [description] OpeningMetadata description
     * @property {number|null} [hiringLimit] OpeningMetadata hiringLimit
     * @property {number|null} [expectedEndingTimestamp] OpeningMetadata expectedEndingTimestamp
     * @property {string|null} [applicationDetails] OpeningMetadata applicationDetails
     * @property {Array.<OpeningMetadata.IApplicationFormQuestion>|null} [applicationFormQuestions] OpeningMetadata applicationFormQuestions
     * @property {string|null} [title] OpeningMetadata title
     */

    /**
     * Constructs a new OpeningMetadata.
     * @exports OpeningMetadata
     * @classdesc Represents an OpeningMetadata.
     * @implements IOpeningMetadata
     * @constructor
     * @param {IOpeningMetadata=} [properties] Properties to set
     */
    function OpeningMetadata(properties) {
        this.applicationFormQuestions = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OpeningMetadata shortDescription.
     * @member {string} shortDescription
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.shortDescription = "";

    /**
     * OpeningMetadata description.
     * @member {string} description
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.description = "";

    /**
     * OpeningMetadata hiringLimit.
     * @member {number} hiringLimit
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.hiringLimit = 0;

    /**
     * OpeningMetadata expectedEndingTimestamp.
     * @member {number} expectedEndingTimestamp
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.expectedEndingTimestamp = 0;

    /**
     * OpeningMetadata applicationDetails.
     * @member {string} applicationDetails
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.applicationDetails = "";

    /**
     * OpeningMetadata applicationFormQuestions.
     * @member {Array.<OpeningMetadata.IApplicationFormQuestion>} applicationFormQuestions
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.applicationFormQuestions = $util.emptyArray;

    /**
     * OpeningMetadata title.
     * @member {string} title
     * @memberof OpeningMetadata
     * @instance
     */
    OpeningMetadata.prototype.title = "";

    /**
     * Creates a new OpeningMetadata instance using the specified properties.
     * @function create
     * @memberof OpeningMetadata
     * @static
     * @param {IOpeningMetadata=} [properties] Properties to set
     * @returns {OpeningMetadata} OpeningMetadata instance
     */
    OpeningMetadata.create = function create(properties) {
        return new OpeningMetadata(properties);
    };

    /**
     * Encodes the specified OpeningMetadata message. Does not implicitly {@link OpeningMetadata.verify|verify} messages.
     * @function encode
     * @memberof OpeningMetadata
     * @static
     * @param {IOpeningMetadata} message OpeningMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpeningMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.shortDescription != null && Object.hasOwnProperty.call(message, "shortDescription"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.shortDescription);
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.description);
        if (message.hiringLimit != null && Object.hasOwnProperty.call(message, "hiringLimit"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.hiringLimit);
        if (message.expectedEndingTimestamp != null && Object.hasOwnProperty.call(message, "expectedEndingTimestamp"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.expectedEndingTimestamp);
        if (message.applicationDetails != null && Object.hasOwnProperty.call(message, "applicationDetails"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.applicationDetails);
        if (message.applicationFormQuestions != null && message.applicationFormQuestions.length)
            for (var i = 0; i < message.applicationFormQuestions.length; ++i)
                $root.OpeningMetadata.ApplicationFormQuestion.encode(message.applicationFormQuestions[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.title);
        return writer;
    };

    /**
     * Encodes the specified OpeningMetadata message, length delimited. Does not implicitly {@link OpeningMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OpeningMetadata
     * @static
     * @param {IOpeningMetadata} message OpeningMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OpeningMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OpeningMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof OpeningMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OpeningMetadata} OpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpeningMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OpeningMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.shortDescription = reader.string();
                break;
            case 2:
                message.description = reader.string();
                break;
            case 3:
                message.hiringLimit = reader.uint32();
                break;
            case 4:
                message.expectedEndingTimestamp = reader.uint32();
                break;
            case 5:
                message.applicationDetails = reader.string();
                break;
            case 6:
                if (!(message.applicationFormQuestions && message.applicationFormQuestions.length))
                    message.applicationFormQuestions = [];
                message.applicationFormQuestions.push($root.OpeningMetadata.ApplicationFormQuestion.decode(reader, reader.uint32()));
                break;
            case 7:
                message.title = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OpeningMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OpeningMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OpeningMetadata} OpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OpeningMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OpeningMetadata message.
     * @function verify
     * @memberof OpeningMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OpeningMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.shortDescription != null && message.hasOwnProperty("shortDescription"))
            if (!$util.isString(message.shortDescription))
                return "shortDescription: string expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.hiringLimit != null && message.hasOwnProperty("hiringLimit"))
            if (!$util.isInteger(message.hiringLimit))
                return "hiringLimit: integer expected";
        if (message.expectedEndingTimestamp != null && message.hasOwnProperty("expectedEndingTimestamp"))
            if (!$util.isInteger(message.expectedEndingTimestamp))
                return "expectedEndingTimestamp: integer expected";
        if (message.applicationDetails != null && message.hasOwnProperty("applicationDetails"))
            if (!$util.isString(message.applicationDetails))
                return "applicationDetails: string expected";
        if (message.applicationFormQuestions != null && message.hasOwnProperty("applicationFormQuestions")) {
            if (!Array.isArray(message.applicationFormQuestions))
                return "applicationFormQuestions: array expected";
            for (var i = 0; i < message.applicationFormQuestions.length; ++i) {
                var error = $root.OpeningMetadata.ApplicationFormQuestion.verify(message.applicationFormQuestions[i]);
                if (error)
                    return "applicationFormQuestions." + error;
            }
        }
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        return null;
    };

    /**
     * Creates an OpeningMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OpeningMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OpeningMetadata} OpeningMetadata
     */
    OpeningMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.OpeningMetadata)
            return object;
        var message = new $root.OpeningMetadata();
        if (object.shortDescription != null)
            message.shortDescription = String(object.shortDescription);
        if (object.description != null)
            message.description = String(object.description);
        if (object.hiringLimit != null)
            message.hiringLimit = object.hiringLimit >>> 0;
        if (object.expectedEndingTimestamp != null)
            message.expectedEndingTimestamp = object.expectedEndingTimestamp >>> 0;
        if (object.applicationDetails != null)
            message.applicationDetails = String(object.applicationDetails);
        if (object.applicationFormQuestions) {
            if (!Array.isArray(object.applicationFormQuestions))
                throw TypeError(".OpeningMetadata.applicationFormQuestions: array expected");
            message.applicationFormQuestions = [];
            for (var i = 0; i < object.applicationFormQuestions.length; ++i) {
                if (typeof object.applicationFormQuestions[i] !== "object")
                    throw TypeError(".OpeningMetadata.applicationFormQuestions: object expected");
                message.applicationFormQuestions[i] = $root.OpeningMetadata.ApplicationFormQuestion.fromObject(object.applicationFormQuestions[i]);
            }
        }
        if (object.title != null)
            message.title = String(object.title);
        return message;
    };

    /**
     * Creates a plain object from an OpeningMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OpeningMetadata
     * @static
     * @param {OpeningMetadata} message OpeningMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OpeningMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.applicationFormQuestions = [];
        if (options.defaults) {
            object.shortDescription = "";
            object.description = "";
            object.hiringLimit = 0;
            object.expectedEndingTimestamp = 0;
            object.applicationDetails = "";
            object.title = "";
        }
        if (message.shortDescription != null && message.hasOwnProperty("shortDescription"))
            object.shortDescription = message.shortDescription;
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.hiringLimit != null && message.hasOwnProperty("hiringLimit"))
            object.hiringLimit = message.hiringLimit;
        if (message.expectedEndingTimestamp != null && message.hasOwnProperty("expectedEndingTimestamp"))
            object.expectedEndingTimestamp = message.expectedEndingTimestamp;
        if (message.applicationDetails != null && message.hasOwnProperty("applicationDetails"))
            object.applicationDetails = message.applicationDetails;
        if (message.applicationFormQuestions && message.applicationFormQuestions.length) {
            object.applicationFormQuestions = [];
            for (var j = 0; j < message.applicationFormQuestions.length; ++j)
                object.applicationFormQuestions[j] = $root.OpeningMetadata.ApplicationFormQuestion.toObject(message.applicationFormQuestions[j], options);
        }
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        return object;
    };

    /**
     * Converts this OpeningMetadata to JSON.
     * @function toJSON
     * @memberof OpeningMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OpeningMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    OpeningMetadata.ApplicationFormQuestion = (function() {

        /**
         * Properties of an ApplicationFormQuestion.
         * @memberof OpeningMetadata
         * @interface IApplicationFormQuestion
         * @property {string|null} [question] ApplicationFormQuestion question
         * @property {OpeningMetadata.ApplicationFormQuestion.InputType|null} [type] ApplicationFormQuestion type
         */

        /**
         * Constructs a new ApplicationFormQuestion.
         * @memberof OpeningMetadata
         * @classdesc Represents an ApplicationFormQuestion.
         * @implements IApplicationFormQuestion
         * @constructor
         * @param {OpeningMetadata.IApplicationFormQuestion=} [properties] Properties to set
         */
        function ApplicationFormQuestion(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApplicationFormQuestion question.
         * @member {string} question
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @instance
         */
        ApplicationFormQuestion.prototype.question = "";

        /**
         * ApplicationFormQuestion type.
         * @member {OpeningMetadata.ApplicationFormQuestion.InputType} type
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @instance
         */
        ApplicationFormQuestion.prototype.type = 0;

        /**
         * Creates a new ApplicationFormQuestion instance using the specified properties.
         * @function create
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {OpeningMetadata.IApplicationFormQuestion=} [properties] Properties to set
         * @returns {OpeningMetadata.ApplicationFormQuestion} ApplicationFormQuestion instance
         */
        ApplicationFormQuestion.create = function create(properties) {
            return new ApplicationFormQuestion(properties);
        };

        /**
         * Encodes the specified ApplicationFormQuestion message. Does not implicitly {@link OpeningMetadata.ApplicationFormQuestion.verify|verify} messages.
         * @function encode
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {OpeningMetadata.IApplicationFormQuestion} message ApplicationFormQuestion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplicationFormQuestion.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.question != null && Object.hasOwnProperty.call(message, "question"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.question);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified ApplicationFormQuestion message, length delimited. Does not implicitly {@link OpeningMetadata.ApplicationFormQuestion.verify|verify} messages.
         * @function encodeDelimited
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {OpeningMetadata.IApplicationFormQuestion} message ApplicationFormQuestion message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApplicationFormQuestion.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApplicationFormQuestion message from the specified reader or buffer.
         * @function decode
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {OpeningMetadata.ApplicationFormQuestion} ApplicationFormQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplicationFormQuestion.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.OpeningMetadata.ApplicationFormQuestion();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.question = reader.string();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ApplicationFormQuestion message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {OpeningMetadata.ApplicationFormQuestion} ApplicationFormQuestion
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApplicationFormQuestion.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApplicationFormQuestion message.
         * @function verify
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApplicationFormQuestion.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.question != null && message.hasOwnProperty("question"))
                if (!$util.isString(message.question))
                    return "question: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates an ApplicationFormQuestion message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {OpeningMetadata.ApplicationFormQuestion} ApplicationFormQuestion
         */
        ApplicationFormQuestion.fromObject = function fromObject(object) {
            if (object instanceof $root.OpeningMetadata.ApplicationFormQuestion)
                return object;
            var message = new $root.OpeningMetadata.ApplicationFormQuestion();
            if (object.question != null)
                message.question = String(object.question);
            switch (object.type) {
            case "TEXTAREA":
            case 0:
                message.type = 0;
                break;
            case "TEXT":
            case 1:
                message.type = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApplicationFormQuestion message. Also converts values to other types if specified.
         * @function toObject
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @static
         * @param {OpeningMetadata.ApplicationFormQuestion} message ApplicationFormQuestion
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApplicationFormQuestion.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.question = "";
                object.type = options.enums === String ? "TEXTAREA" : 0;
            }
            if (message.question != null && message.hasOwnProperty("question"))
                object.question = message.question;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.OpeningMetadata.ApplicationFormQuestion.InputType[message.type] : message.type;
            return object;
        };

        /**
         * Converts this ApplicationFormQuestion to JSON.
         * @function toJSON
         * @memberof OpeningMetadata.ApplicationFormQuestion
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApplicationFormQuestion.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * InputType enum.
         * @name OpeningMetadata.ApplicationFormQuestion.InputType
         * @enum {number}
         * @property {number} TEXTAREA=0 TEXTAREA value
         * @property {number} TEXT=1 TEXT value
         */
        ApplicationFormQuestion.InputType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TEXTAREA"] = 0;
            values[valuesById[1] = "TEXT"] = 1;
            return values;
        })();

        return ApplicationFormQuestion;
    })();

    return OpeningMetadata;
})();

$root.UpcomingOpeningMetadata = (function() {

    /**
     * Properties of an UpcomingOpeningMetadata.
     * @exports IUpcomingOpeningMetadata
     * @interface IUpcomingOpeningMetadata
     * @property {number|null} [expectedStart] UpcomingOpeningMetadata expectedStart
     * @property {Long|null} [rewardPerBlock] UpcomingOpeningMetadata rewardPerBlock
     * @property {Long|null} [minApplicationStake] UpcomingOpeningMetadata minApplicationStake
     * @property {IOpeningMetadata|null} [metadata] UpcomingOpeningMetadata metadata
     */

    /**
     * Constructs a new UpcomingOpeningMetadata.
     * @exports UpcomingOpeningMetadata
     * @classdesc Represents an UpcomingOpeningMetadata.
     * @implements IUpcomingOpeningMetadata
     * @constructor
     * @param {IUpcomingOpeningMetadata=} [properties] Properties to set
     */
    function UpcomingOpeningMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpcomingOpeningMetadata expectedStart.
     * @member {number} expectedStart
     * @memberof UpcomingOpeningMetadata
     * @instance
     */
    UpcomingOpeningMetadata.prototype.expectedStart = 0;

    /**
     * UpcomingOpeningMetadata rewardPerBlock.
     * @member {Long} rewardPerBlock
     * @memberof UpcomingOpeningMetadata
     * @instance
     */
    UpcomingOpeningMetadata.prototype.rewardPerBlock = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * UpcomingOpeningMetadata minApplicationStake.
     * @member {Long} minApplicationStake
     * @memberof UpcomingOpeningMetadata
     * @instance
     */
    UpcomingOpeningMetadata.prototype.minApplicationStake = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * UpcomingOpeningMetadata metadata.
     * @member {IOpeningMetadata|null|undefined} metadata
     * @memberof UpcomingOpeningMetadata
     * @instance
     */
    UpcomingOpeningMetadata.prototype.metadata = null;

    /**
     * Creates a new UpcomingOpeningMetadata instance using the specified properties.
     * @function create
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {IUpcomingOpeningMetadata=} [properties] Properties to set
     * @returns {UpcomingOpeningMetadata} UpcomingOpeningMetadata instance
     */
    UpcomingOpeningMetadata.create = function create(properties) {
        return new UpcomingOpeningMetadata(properties);
    };

    /**
     * Encodes the specified UpcomingOpeningMetadata message. Does not implicitly {@link UpcomingOpeningMetadata.verify|verify} messages.
     * @function encode
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {IUpcomingOpeningMetadata} message UpcomingOpeningMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpcomingOpeningMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.expectedStart != null && Object.hasOwnProperty.call(message, "expectedStart"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.expectedStart);
        if (message.rewardPerBlock != null && Object.hasOwnProperty.call(message, "rewardPerBlock"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.rewardPerBlock);
        if (message.minApplicationStake != null && Object.hasOwnProperty.call(message, "minApplicationStake"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.minApplicationStake);
        if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
            $root.OpeningMetadata.encode(message.metadata, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified UpcomingOpeningMetadata message, length delimited. Does not implicitly {@link UpcomingOpeningMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {IUpcomingOpeningMetadata} message UpcomingOpeningMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpcomingOpeningMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpcomingOpeningMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpcomingOpeningMetadata} UpcomingOpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpcomingOpeningMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpcomingOpeningMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.expectedStart = reader.uint32();
                break;
            case 2:
                message.rewardPerBlock = reader.uint64();
                break;
            case 3:
                message.minApplicationStake = reader.uint64();
                break;
            case 4:
                message.metadata = $root.OpeningMetadata.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an UpcomingOpeningMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpcomingOpeningMetadata} UpcomingOpeningMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpcomingOpeningMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpcomingOpeningMetadata message.
     * @function verify
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpcomingOpeningMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.expectedStart != null && message.hasOwnProperty("expectedStart"))
            if (!$util.isInteger(message.expectedStart))
                return "expectedStart: integer expected";
        if (message.rewardPerBlock != null && message.hasOwnProperty("rewardPerBlock"))
            if (!$util.isInteger(message.rewardPerBlock) && !(message.rewardPerBlock && $util.isInteger(message.rewardPerBlock.low) && $util.isInteger(message.rewardPerBlock.high)))
                return "rewardPerBlock: integer|Long expected";
        if (message.minApplicationStake != null && message.hasOwnProperty("minApplicationStake"))
            if (!$util.isInteger(message.minApplicationStake) && !(message.minApplicationStake && $util.isInteger(message.minApplicationStake.low) && $util.isInteger(message.minApplicationStake.high)))
                return "minApplicationStake: integer|Long expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            var error = $root.OpeningMetadata.verify(message.metadata);
            if (error)
                return "metadata." + error;
        }
        return null;
    };

    /**
     * Creates an UpcomingOpeningMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpcomingOpeningMetadata} UpcomingOpeningMetadata
     */
    UpcomingOpeningMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.UpcomingOpeningMetadata)
            return object;
        var message = new $root.UpcomingOpeningMetadata();
        if (object.expectedStart != null)
            message.expectedStart = object.expectedStart >>> 0;
        if (object.rewardPerBlock != null)
            if ($util.Long)
                (message.rewardPerBlock = $util.Long.fromValue(object.rewardPerBlock)).unsigned = true;
            else if (typeof object.rewardPerBlock === "string")
                message.rewardPerBlock = parseInt(object.rewardPerBlock, 10);
            else if (typeof object.rewardPerBlock === "number")
                message.rewardPerBlock = object.rewardPerBlock;
            else if (typeof object.rewardPerBlock === "object")
                message.rewardPerBlock = new $util.LongBits(object.rewardPerBlock.low >>> 0, object.rewardPerBlock.high >>> 0).toNumber(true);
        if (object.minApplicationStake != null)
            if ($util.Long)
                (message.minApplicationStake = $util.Long.fromValue(object.minApplicationStake)).unsigned = true;
            else if (typeof object.minApplicationStake === "string")
                message.minApplicationStake = parseInt(object.minApplicationStake, 10);
            else if (typeof object.minApplicationStake === "number")
                message.minApplicationStake = object.minApplicationStake;
            else if (typeof object.minApplicationStake === "object")
                message.minApplicationStake = new $util.LongBits(object.minApplicationStake.low >>> 0, object.minApplicationStake.high >>> 0).toNumber(true);
        if (object.metadata != null) {
            if (typeof object.metadata !== "object")
                throw TypeError(".UpcomingOpeningMetadata.metadata: object expected");
            message.metadata = $root.OpeningMetadata.fromObject(object.metadata);
        }
        return message;
    };

    /**
     * Creates a plain object from an UpcomingOpeningMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpcomingOpeningMetadata
     * @static
     * @param {UpcomingOpeningMetadata} message UpcomingOpeningMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UpcomingOpeningMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.expectedStart = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.rewardPerBlock = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.rewardPerBlock = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.minApplicationStake = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.minApplicationStake = options.longs === String ? "0" : 0;
            object.metadata = null;
        }
        if (message.expectedStart != null && message.hasOwnProperty("expectedStart"))
            object.expectedStart = message.expectedStart;
        if (message.rewardPerBlock != null && message.hasOwnProperty("rewardPerBlock"))
            if (typeof message.rewardPerBlock === "number")
                object.rewardPerBlock = options.longs === String ? String(message.rewardPerBlock) : message.rewardPerBlock;
            else
                object.rewardPerBlock = options.longs === String ? $util.Long.prototype.toString.call(message.rewardPerBlock) : options.longs === Number ? new $util.LongBits(message.rewardPerBlock.low >>> 0, message.rewardPerBlock.high >>> 0).toNumber(true) : message.rewardPerBlock;
        if (message.minApplicationStake != null && message.hasOwnProperty("minApplicationStake"))
            if (typeof message.minApplicationStake === "number")
                object.minApplicationStake = options.longs === String ? String(message.minApplicationStake) : message.minApplicationStake;
            else
                object.minApplicationStake = options.longs === String ? $util.Long.prototype.toString.call(message.minApplicationStake) : options.longs === Number ? new $util.LongBits(message.minApplicationStake.low >>> 0, message.minApplicationStake.high >>> 0).toNumber(true) : message.minApplicationStake;
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            object.metadata = $root.OpeningMetadata.toObject(message.metadata, options);
        return object;
    };

    /**
     * Converts this UpcomingOpeningMetadata to JSON.
     * @function toJSON
     * @memberof UpcomingOpeningMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpcomingOpeningMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpcomingOpeningMetadata;
})();

$root.ApplicationMetadata = (function() {

    /**
     * Properties of an ApplicationMetadata.
     * @exports IApplicationMetadata
     * @interface IApplicationMetadata
     * @property {Array.<string>|null} [answers] ApplicationMetadata answers
     */

    /**
     * Constructs a new ApplicationMetadata.
     * @exports ApplicationMetadata
     * @classdesc Represents an ApplicationMetadata.
     * @implements IApplicationMetadata
     * @constructor
     * @param {IApplicationMetadata=} [properties] Properties to set
     */
    function ApplicationMetadata(properties) {
        this.answers = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ApplicationMetadata answers.
     * @member {Array.<string>} answers
     * @memberof ApplicationMetadata
     * @instance
     */
    ApplicationMetadata.prototype.answers = $util.emptyArray;

    /**
     * Creates a new ApplicationMetadata instance using the specified properties.
     * @function create
     * @memberof ApplicationMetadata
     * @static
     * @param {IApplicationMetadata=} [properties] Properties to set
     * @returns {ApplicationMetadata} ApplicationMetadata instance
     */
    ApplicationMetadata.create = function create(properties) {
        return new ApplicationMetadata(properties);
    };

    /**
     * Encodes the specified ApplicationMetadata message. Does not implicitly {@link ApplicationMetadata.verify|verify} messages.
     * @function encode
     * @memberof ApplicationMetadata
     * @static
     * @param {IApplicationMetadata} message ApplicationMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.answers != null && message.answers.length)
            for (var i = 0; i < message.answers.length; ++i)
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.answers[i]);
        return writer;
    };

    /**
     * Encodes the specified ApplicationMetadata message, length delimited. Does not implicitly {@link ApplicationMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ApplicationMetadata
     * @static
     * @param {IApplicationMetadata} message ApplicationMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ApplicationMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ApplicationMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof ApplicationMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ApplicationMetadata} ApplicationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApplicationMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.answers && message.answers.length))
                    message.answers = [];
                message.answers.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an ApplicationMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ApplicationMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ApplicationMetadata} ApplicationMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ApplicationMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ApplicationMetadata message.
     * @function verify
     * @memberof ApplicationMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ApplicationMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.answers != null && message.hasOwnProperty("answers")) {
            if (!Array.isArray(message.answers))
                return "answers: array expected";
            for (var i = 0; i < message.answers.length; ++i)
                if (!$util.isString(message.answers[i]))
                    return "answers: string[] expected";
        }
        return null;
    };

    /**
     * Creates an ApplicationMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ApplicationMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ApplicationMetadata} ApplicationMetadata
     */
    ApplicationMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.ApplicationMetadata)
            return object;
        var message = new $root.ApplicationMetadata();
        if (object.answers) {
            if (!Array.isArray(object.answers))
                throw TypeError(".ApplicationMetadata.answers: array expected");
            message.answers = [];
            for (var i = 0; i < object.answers.length; ++i)
                message.answers[i] = String(object.answers[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from an ApplicationMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ApplicationMetadata
     * @static
     * @param {ApplicationMetadata} message ApplicationMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ApplicationMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.answers = [];
        if (message.answers && message.answers.length) {
            object.answers = [];
            for (var j = 0; j < message.answers.length; ++j)
                object.answers[j] = message.answers[j];
        }
        return object;
    };

    /**
     * Converts this ApplicationMetadata to JSON.
     * @function toJSON
     * @memberof ApplicationMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ApplicationMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ApplicationMetadata;
})();

$root.WorkingGroupMetadata = (function() {

    /**
     * Properties of a WorkingGroupMetadata.
     * @exports IWorkingGroupMetadata
     * @interface IWorkingGroupMetadata
     * @property {string|null} [description] WorkingGroupMetadata description
     * @property {string|null} [about] WorkingGroupMetadata about
     * @property {string|null} [status] WorkingGroupMetadata status
     * @property {string|null} [statusMessage] WorkingGroupMetadata statusMessage
     */

    /**
     * Constructs a new WorkingGroupMetadata.
     * @exports WorkingGroupMetadata
     * @classdesc Represents a WorkingGroupMetadata.
     * @implements IWorkingGroupMetadata
     * @constructor
     * @param {IWorkingGroupMetadata=} [properties] Properties to set
     */
    function WorkingGroupMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WorkingGroupMetadata description.
     * @member {string} description
     * @memberof WorkingGroupMetadata
     * @instance
     */
    WorkingGroupMetadata.prototype.description = "";

    /**
     * WorkingGroupMetadata about.
     * @member {string} about
     * @memberof WorkingGroupMetadata
     * @instance
     */
    WorkingGroupMetadata.prototype.about = "";

    /**
     * WorkingGroupMetadata status.
     * @member {string} status
     * @memberof WorkingGroupMetadata
     * @instance
     */
    WorkingGroupMetadata.prototype.status = "";

    /**
     * WorkingGroupMetadata statusMessage.
     * @member {string} statusMessage
     * @memberof WorkingGroupMetadata
     * @instance
     */
    WorkingGroupMetadata.prototype.statusMessage = "";

    /**
     * Creates a new WorkingGroupMetadata instance using the specified properties.
     * @function create
     * @memberof WorkingGroupMetadata
     * @static
     * @param {IWorkingGroupMetadata=} [properties] Properties to set
     * @returns {WorkingGroupMetadata} WorkingGroupMetadata instance
     */
    WorkingGroupMetadata.create = function create(properties) {
        return new WorkingGroupMetadata(properties);
    };

    /**
     * Encodes the specified WorkingGroupMetadata message. Does not implicitly {@link WorkingGroupMetadata.verify|verify} messages.
     * @function encode
     * @memberof WorkingGroupMetadata
     * @static
     * @param {IWorkingGroupMetadata} message WorkingGroupMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorkingGroupMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.description != null && Object.hasOwnProperty.call(message, "description"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.description);
        if (message.about != null && Object.hasOwnProperty.call(message, "about"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.about);
        if (message.status != null && Object.hasOwnProperty.call(message, "status"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.status);
        if (message.statusMessage != null && Object.hasOwnProperty.call(message, "statusMessage"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.statusMessage);
        return writer;
    };

    /**
     * Encodes the specified WorkingGroupMetadata message, length delimited. Does not implicitly {@link WorkingGroupMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WorkingGroupMetadata
     * @static
     * @param {IWorkingGroupMetadata} message WorkingGroupMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorkingGroupMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WorkingGroupMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof WorkingGroupMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WorkingGroupMetadata} WorkingGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorkingGroupMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WorkingGroupMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.description = reader.string();
                break;
            case 2:
                message.about = reader.string();
                break;
            case 3:
                message.status = reader.string();
                break;
            case 4:
                message.statusMessage = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WorkingGroupMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WorkingGroupMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WorkingGroupMetadata} WorkingGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorkingGroupMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WorkingGroupMetadata message.
     * @function verify
     * @memberof WorkingGroupMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WorkingGroupMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.description != null && message.hasOwnProperty("description"))
            if (!$util.isString(message.description))
                return "description: string expected";
        if (message.about != null && message.hasOwnProperty("about"))
            if (!$util.isString(message.about))
                return "about: string expected";
        if (message.status != null && message.hasOwnProperty("status"))
            if (!$util.isString(message.status))
                return "status: string expected";
        if (message.statusMessage != null && message.hasOwnProperty("statusMessage"))
            if (!$util.isString(message.statusMessage))
                return "statusMessage: string expected";
        return null;
    };

    /**
     * Creates a WorkingGroupMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WorkingGroupMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WorkingGroupMetadata} WorkingGroupMetadata
     */
    WorkingGroupMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.WorkingGroupMetadata)
            return object;
        var message = new $root.WorkingGroupMetadata();
        if (object.description != null)
            message.description = String(object.description);
        if (object.about != null)
            message.about = String(object.about);
        if (object.status != null)
            message.status = String(object.status);
        if (object.statusMessage != null)
            message.statusMessage = String(object.statusMessage);
        return message;
    };

    /**
     * Creates a plain object from a WorkingGroupMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WorkingGroupMetadata
     * @static
     * @param {WorkingGroupMetadata} message WorkingGroupMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WorkingGroupMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.description = "";
            object.about = "";
            object.status = "";
            object.statusMessage = "";
        }
        if (message.description != null && message.hasOwnProperty("description"))
            object.description = message.description;
        if (message.about != null && message.hasOwnProperty("about"))
            object.about = message.about;
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = message.status;
        if (message.statusMessage != null && message.hasOwnProperty("statusMessage"))
            object.statusMessage = message.statusMessage;
        return object;
    };

    /**
     * Converts this WorkingGroupMetadata to JSON.
     * @function toJSON
     * @memberof WorkingGroupMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WorkingGroupMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WorkingGroupMetadata;
})();

$root.SetGroupMetadata = (function() {

    /**
     * Properties of a SetGroupMetadata.
     * @exports ISetGroupMetadata
     * @interface ISetGroupMetadata
     * @property {IWorkingGroupMetadata|null} [newMetadata] SetGroupMetadata newMetadata
     */

    /**
     * Constructs a new SetGroupMetadata.
     * @exports SetGroupMetadata
     * @classdesc Represents a SetGroupMetadata.
     * @implements ISetGroupMetadata
     * @constructor
     * @param {ISetGroupMetadata=} [properties] Properties to set
     */
    function SetGroupMetadata(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SetGroupMetadata newMetadata.
     * @member {IWorkingGroupMetadata|null|undefined} newMetadata
     * @memberof SetGroupMetadata
     * @instance
     */
    SetGroupMetadata.prototype.newMetadata = null;

    /**
     * Creates a new SetGroupMetadata instance using the specified properties.
     * @function create
     * @memberof SetGroupMetadata
     * @static
     * @param {ISetGroupMetadata=} [properties] Properties to set
     * @returns {SetGroupMetadata} SetGroupMetadata instance
     */
    SetGroupMetadata.create = function create(properties) {
        return new SetGroupMetadata(properties);
    };

    /**
     * Encodes the specified SetGroupMetadata message. Does not implicitly {@link SetGroupMetadata.verify|verify} messages.
     * @function encode
     * @memberof SetGroupMetadata
     * @static
     * @param {ISetGroupMetadata} message SetGroupMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetGroupMetadata.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.newMetadata != null && Object.hasOwnProperty.call(message, "newMetadata"))
            $root.WorkingGroupMetadata.encode(message.newMetadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SetGroupMetadata message, length delimited. Does not implicitly {@link SetGroupMetadata.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SetGroupMetadata
     * @static
     * @param {ISetGroupMetadata} message SetGroupMetadata message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SetGroupMetadata.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SetGroupMetadata message from the specified reader or buffer.
     * @function decode
     * @memberof SetGroupMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SetGroupMetadata} SetGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetGroupMetadata.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SetGroupMetadata();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.newMetadata = $root.WorkingGroupMetadata.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SetGroupMetadata message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SetGroupMetadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SetGroupMetadata} SetGroupMetadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SetGroupMetadata.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SetGroupMetadata message.
     * @function verify
     * @memberof SetGroupMetadata
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SetGroupMetadata.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.newMetadata != null && message.hasOwnProperty("newMetadata")) {
            var error = $root.WorkingGroupMetadata.verify(message.newMetadata);
            if (error)
                return "newMetadata." + error;
        }
        return null;
    };

    /**
     * Creates a SetGroupMetadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SetGroupMetadata
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SetGroupMetadata} SetGroupMetadata
     */
    SetGroupMetadata.fromObject = function fromObject(object) {
        if (object instanceof $root.SetGroupMetadata)
            return object;
        var message = new $root.SetGroupMetadata();
        if (object.newMetadata != null) {
            if (typeof object.newMetadata !== "object")
                throw TypeError(".SetGroupMetadata.newMetadata: object expected");
            message.newMetadata = $root.WorkingGroupMetadata.fromObject(object.newMetadata);
        }
        return message;
    };

    /**
     * Creates a plain object from a SetGroupMetadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SetGroupMetadata
     * @static
     * @param {SetGroupMetadata} message SetGroupMetadata
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SetGroupMetadata.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.newMetadata = null;
        if (message.newMetadata != null && message.hasOwnProperty("newMetadata"))
            object.newMetadata = $root.WorkingGroupMetadata.toObject(message.newMetadata, options);
        return object;
    };

    /**
     * Converts this SetGroupMetadata to JSON.
     * @function toJSON
     * @memberof SetGroupMetadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SetGroupMetadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SetGroupMetadata;
})();

$root.AddUpcomingOpening = (function() {

    /**
     * Properties of an AddUpcomingOpening.
     * @exports IAddUpcomingOpening
     * @interface IAddUpcomingOpening
     * @property {IUpcomingOpeningMetadata|null} [metadata] AddUpcomingOpening metadata
     */

    /**
     * Constructs a new AddUpcomingOpening.
     * @exports AddUpcomingOpening
     * @classdesc Represents an AddUpcomingOpening.
     * @implements IAddUpcomingOpening
     * @constructor
     * @param {IAddUpcomingOpening=} [properties] Properties to set
     */
    function AddUpcomingOpening(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AddUpcomingOpening metadata.
     * @member {IUpcomingOpeningMetadata|null|undefined} metadata
     * @memberof AddUpcomingOpening
     * @instance
     */
    AddUpcomingOpening.prototype.metadata = null;

    /**
     * Creates a new AddUpcomingOpening instance using the specified properties.
     * @function create
     * @memberof AddUpcomingOpening
     * @static
     * @param {IAddUpcomingOpening=} [properties] Properties to set
     * @returns {AddUpcomingOpening} AddUpcomingOpening instance
     */
    AddUpcomingOpening.create = function create(properties) {
        return new AddUpcomingOpening(properties);
    };

    /**
     * Encodes the specified AddUpcomingOpening message. Does not implicitly {@link AddUpcomingOpening.verify|verify} messages.
     * @function encode
     * @memberof AddUpcomingOpening
     * @static
     * @param {IAddUpcomingOpening} message AddUpcomingOpening message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddUpcomingOpening.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.metadata != null && Object.hasOwnProperty.call(message, "metadata"))
            $root.UpcomingOpeningMetadata.encode(message.metadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AddUpcomingOpening message, length delimited. Does not implicitly {@link AddUpcomingOpening.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AddUpcomingOpening
     * @static
     * @param {IAddUpcomingOpening} message AddUpcomingOpening message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AddUpcomingOpening.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AddUpcomingOpening message from the specified reader or buffer.
     * @function decode
     * @memberof AddUpcomingOpening
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AddUpcomingOpening} AddUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddUpcomingOpening.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AddUpcomingOpening();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.metadata = $root.UpcomingOpeningMetadata.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AddUpcomingOpening message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AddUpcomingOpening
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AddUpcomingOpening} AddUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AddUpcomingOpening.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AddUpcomingOpening message.
     * @function verify
     * @memberof AddUpcomingOpening
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AddUpcomingOpening.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.metadata != null && message.hasOwnProperty("metadata")) {
            var error = $root.UpcomingOpeningMetadata.verify(message.metadata);
            if (error)
                return "metadata." + error;
        }
        return null;
    };

    /**
     * Creates an AddUpcomingOpening message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AddUpcomingOpening
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AddUpcomingOpening} AddUpcomingOpening
     */
    AddUpcomingOpening.fromObject = function fromObject(object) {
        if (object instanceof $root.AddUpcomingOpening)
            return object;
        var message = new $root.AddUpcomingOpening();
        if (object.metadata != null) {
            if (typeof object.metadata !== "object")
                throw TypeError(".AddUpcomingOpening.metadata: object expected");
            message.metadata = $root.UpcomingOpeningMetadata.fromObject(object.metadata);
        }
        return message;
    };

    /**
     * Creates a plain object from an AddUpcomingOpening message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AddUpcomingOpening
     * @static
     * @param {AddUpcomingOpening} message AddUpcomingOpening
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AddUpcomingOpening.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.metadata = null;
        if (message.metadata != null && message.hasOwnProperty("metadata"))
            object.metadata = $root.UpcomingOpeningMetadata.toObject(message.metadata, options);
        return object;
    };

    /**
     * Converts this AddUpcomingOpening to JSON.
     * @function toJSON
     * @memberof AddUpcomingOpening
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AddUpcomingOpening.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AddUpcomingOpening;
})();

$root.RemoveUpcomingOpening = (function() {

    /**
     * Properties of a RemoveUpcomingOpening.
     * @exports IRemoveUpcomingOpening
     * @interface IRemoveUpcomingOpening
     * @property {string|null} [id] RemoveUpcomingOpening id
     */

    /**
     * Constructs a new RemoveUpcomingOpening.
     * @exports RemoveUpcomingOpening
     * @classdesc Represents a RemoveUpcomingOpening.
     * @implements IRemoveUpcomingOpening
     * @constructor
     * @param {IRemoveUpcomingOpening=} [properties] Properties to set
     */
    function RemoveUpcomingOpening(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RemoveUpcomingOpening id.
     * @member {string} id
     * @memberof RemoveUpcomingOpening
     * @instance
     */
    RemoveUpcomingOpening.prototype.id = "";

    /**
     * Creates a new RemoveUpcomingOpening instance using the specified properties.
     * @function create
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {IRemoveUpcomingOpening=} [properties] Properties to set
     * @returns {RemoveUpcomingOpening} RemoveUpcomingOpening instance
     */
    RemoveUpcomingOpening.create = function create(properties) {
        return new RemoveUpcomingOpening(properties);
    };

    /**
     * Encodes the specified RemoveUpcomingOpening message. Does not implicitly {@link RemoveUpcomingOpening.verify|verify} messages.
     * @function encode
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {IRemoveUpcomingOpening} message RemoveUpcomingOpening message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RemoveUpcomingOpening.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        return writer;
    };

    /**
     * Encodes the specified RemoveUpcomingOpening message, length delimited. Does not implicitly {@link RemoveUpcomingOpening.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {IRemoveUpcomingOpening} message RemoveUpcomingOpening message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RemoveUpcomingOpening.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RemoveUpcomingOpening message from the specified reader or buffer.
     * @function decode
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RemoveUpcomingOpening} RemoveUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RemoveUpcomingOpening.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RemoveUpcomingOpening();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RemoveUpcomingOpening message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RemoveUpcomingOpening} RemoveUpcomingOpening
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RemoveUpcomingOpening.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RemoveUpcomingOpening message.
     * @function verify
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RemoveUpcomingOpening.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        return null;
    };

    /**
     * Creates a RemoveUpcomingOpening message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RemoveUpcomingOpening} RemoveUpcomingOpening
     */
    RemoveUpcomingOpening.fromObject = function fromObject(object) {
        if (object instanceof $root.RemoveUpcomingOpening)
            return object;
        var message = new $root.RemoveUpcomingOpening();
        if (object.id != null)
            message.id = String(object.id);
        return message;
    };

    /**
     * Creates a plain object from a RemoveUpcomingOpening message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RemoveUpcomingOpening
     * @static
     * @param {RemoveUpcomingOpening} message RemoveUpcomingOpening
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RemoveUpcomingOpening.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.id = "";
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        return object;
    };

    /**
     * Converts this RemoveUpcomingOpening to JSON.
     * @function toJSON
     * @memberof RemoveUpcomingOpening
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RemoveUpcomingOpening.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RemoveUpcomingOpening;
})();

$root.WorkingGroupMetadataAction = (function() {

    /**
     * Properties of a WorkingGroupMetadataAction.
     * @exports IWorkingGroupMetadataAction
     * @interface IWorkingGroupMetadataAction
     * @property {ISetGroupMetadata|null} [setGroupMetadata] WorkingGroupMetadataAction setGroupMetadata
     * @property {IAddUpcomingOpening|null} [addUpcomingOpening] WorkingGroupMetadataAction addUpcomingOpening
     * @property {IRemoveUpcomingOpening|null} [removeUpcomingOpening] WorkingGroupMetadataAction removeUpcomingOpening
     */

    /**
     * Constructs a new WorkingGroupMetadataAction.
     * @exports WorkingGroupMetadataAction
     * @classdesc Represents a WorkingGroupMetadataAction.
     * @implements IWorkingGroupMetadataAction
     * @constructor
     * @param {IWorkingGroupMetadataAction=} [properties] Properties to set
     */
    function WorkingGroupMetadataAction(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * WorkingGroupMetadataAction setGroupMetadata.
     * @member {ISetGroupMetadata|null|undefined} setGroupMetadata
     * @memberof WorkingGroupMetadataAction
     * @instance
     */
    WorkingGroupMetadataAction.prototype.setGroupMetadata = null;

    /**
     * WorkingGroupMetadataAction addUpcomingOpening.
     * @member {IAddUpcomingOpening|null|undefined} addUpcomingOpening
     * @memberof WorkingGroupMetadataAction
     * @instance
     */
    WorkingGroupMetadataAction.prototype.addUpcomingOpening = null;

    /**
     * WorkingGroupMetadataAction removeUpcomingOpening.
     * @member {IRemoveUpcomingOpening|null|undefined} removeUpcomingOpening
     * @memberof WorkingGroupMetadataAction
     * @instance
     */
    WorkingGroupMetadataAction.prototype.removeUpcomingOpening = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * WorkingGroupMetadataAction action.
     * @member {"setGroupMetadata"|"addUpcomingOpening"|"removeUpcomingOpening"|undefined} action
     * @memberof WorkingGroupMetadataAction
     * @instance
     */
    Object.defineProperty(WorkingGroupMetadataAction.prototype, "action", {
        get: $util.oneOfGetter($oneOfFields = ["setGroupMetadata", "addUpcomingOpening", "removeUpcomingOpening"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new WorkingGroupMetadataAction instance using the specified properties.
     * @function create
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {IWorkingGroupMetadataAction=} [properties] Properties to set
     * @returns {WorkingGroupMetadataAction} WorkingGroupMetadataAction instance
     */
    WorkingGroupMetadataAction.create = function create(properties) {
        return new WorkingGroupMetadataAction(properties);
    };

    /**
     * Encodes the specified WorkingGroupMetadataAction message. Does not implicitly {@link WorkingGroupMetadataAction.verify|verify} messages.
     * @function encode
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {IWorkingGroupMetadataAction} message WorkingGroupMetadataAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorkingGroupMetadataAction.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.setGroupMetadata != null && Object.hasOwnProperty.call(message, "setGroupMetadata"))
            $root.SetGroupMetadata.encode(message.setGroupMetadata, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.addUpcomingOpening != null && Object.hasOwnProperty.call(message, "addUpcomingOpening"))
            $root.AddUpcomingOpening.encode(message.addUpcomingOpening, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.removeUpcomingOpening != null && Object.hasOwnProperty.call(message, "removeUpcomingOpening"))
            $root.RemoveUpcomingOpening.encode(message.removeUpcomingOpening, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified WorkingGroupMetadataAction message, length delimited. Does not implicitly {@link WorkingGroupMetadataAction.verify|verify} messages.
     * @function encodeDelimited
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {IWorkingGroupMetadataAction} message WorkingGroupMetadataAction message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    WorkingGroupMetadataAction.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a WorkingGroupMetadataAction message from the specified reader or buffer.
     * @function decode
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {WorkingGroupMetadataAction} WorkingGroupMetadataAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorkingGroupMetadataAction.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.WorkingGroupMetadataAction();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.setGroupMetadata = $root.SetGroupMetadata.decode(reader, reader.uint32());
                break;
            case 2:
                message.addUpcomingOpening = $root.AddUpcomingOpening.decode(reader, reader.uint32());
                break;
            case 3:
                message.removeUpcomingOpening = $root.RemoveUpcomingOpening.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a WorkingGroupMetadataAction message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {WorkingGroupMetadataAction} WorkingGroupMetadataAction
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    WorkingGroupMetadataAction.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a WorkingGroupMetadataAction message.
     * @function verify
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    WorkingGroupMetadataAction.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.setGroupMetadata != null && message.hasOwnProperty("setGroupMetadata")) {
            properties.action = 1;
            {
                var error = $root.SetGroupMetadata.verify(message.setGroupMetadata);
                if (error)
                    return "setGroupMetadata." + error;
            }
        }
        if (message.addUpcomingOpening != null && message.hasOwnProperty("addUpcomingOpening")) {
            if (properties.action === 1)
                return "action: multiple values";
            properties.action = 1;
            {
                var error = $root.AddUpcomingOpening.verify(message.addUpcomingOpening);
                if (error)
                    return "addUpcomingOpening." + error;
            }
        }
        if (message.removeUpcomingOpening != null && message.hasOwnProperty("removeUpcomingOpening")) {
            if (properties.action === 1)
                return "action: multiple values";
            properties.action = 1;
            {
                var error = $root.RemoveUpcomingOpening.verify(message.removeUpcomingOpening);
                if (error)
                    return "removeUpcomingOpening." + error;
            }
        }
        return null;
    };

    /**
     * Creates a WorkingGroupMetadataAction message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {WorkingGroupMetadataAction} WorkingGroupMetadataAction
     */
    WorkingGroupMetadataAction.fromObject = function fromObject(object) {
        if (object instanceof $root.WorkingGroupMetadataAction)
            return object;
        var message = new $root.WorkingGroupMetadataAction();
        if (object.setGroupMetadata != null) {
            if (typeof object.setGroupMetadata !== "object")
                throw TypeError(".WorkingGroupMetadataAction.setGroupMetadata: object expected");
            message.setGroupMetadata = $root.SetGroupMetadata.fromObject(object.setGroupMetadata);
        }
        if (object.addUpcomingOpening != null) {
            if (typeof object.addUpcomingOpening !== "object")
                throw TypeError(".WorkingGroupMetadataAction.addUpcomingOpening: object expected");
            message.addUpcomingOpening = $root.AddUpcomingOpening.fromObject(object.addUpcomingOpening);
        }
        if (object.removeUpcomingOpening != null) {
            if (typeof object.removeUpcomingOpening !== "object")
                throw TypeError(".WorkingGroupMetadataAction.removeUpcomingOpening: object expected");
            message.removeUpcomingOpening = $root.RemoveUpcomingOpening.fromObject(object.removeUpcomingOpening);
        }
        return message;
    };

    /**
     * Creates a plain object from a WorkingGroupMetadataAction message. Also converts values to other types if specified.
     * @function toObject
     * @memberof WorkingGroupMetadataAction
     * @static
     * @param {WorkingGroupMetadataAction} message WorkingGroupMetadataAction
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    WorkingGroupMetadataAction.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (message.setGroupMetadata != null && message.hasOwnProperty("setGroupMetadata")) {
            object.setGroupMetadata = $root.SetGroupMetadata.toObject(message.setGroupMetadata, options);
            if (options.oneofs)
                object.action = "setGroupMetadata";
        }
        if (message.addUpcomingOpening != null && message.hasOwnProperty("addUpcomingOpening")) {
            object.addUpcomingOpening = $root.AddUpcomingOpening.toObject(message.addUpcomingOpening, options);
            if (options.oneofs)
                object.action = "addUpcomingOpening";
        }
        if (message.removeUpcomingOpening != null && message.hasOwnProperty("removeUpcomingOpening")) {
            object.removeUpcomingOpening = $root.RemoveUpcomingOpening.toObject(message.removeUpcomingOpening, options);
            if (options.oneofs)
                object.action = "removeUpcomingOpening";
        }
        return object;
    };

    /**
     * Converts this WorkingGroupMetadataAction to JSON.
     * @function toJSON
     * @memberof WorkingGroupMetadataAction
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    WorkingGroupMetadataAction.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return WorkingGroupMetadataAction;
})();

module.exports = $root;
