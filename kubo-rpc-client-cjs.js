var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name10 in all2)
    __defProp(target, name10, { get: all2[name10], enumerable: true });
};
var __copyProps = (to, from9, except, desc) => {
  if (from9 && typeof from9 === "object" || typeof from9 === "function") {
    for (let key of __getOwnPropNames(from9))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from9[key], enumerable: !(desc = __getOwnPropDesc(from9, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports, module2) {
    function isElectron2() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    module2.exports = isElectron2;
  }
});

// node_modules/err-code/index.js
var require_err_code = __commonJS({
  "node_modules/err-code/index.js"(exports, module2) {
    "use strict";
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true
        });
      }
      return obj;
    }
    function createError(err, code10, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code10 === "object") {
        props = code10;
        code10 = "";
      }
      if (code10) {
        props.code = code10;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output = assign(new ErrClass(), props);
        return output;
      }
    }
    module2.exports = createError;
  }
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "node_modules/is-plain-obj/index.js"(exports, module2) {
    "use strict";
    module2.exports = (value) => {
      if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.prototype;
    };
  }
});

// node_modules/merge-options/index.js
var require_merge_options = __commonJS({
  "node_modules/merge-options/index.js"(exports, module2) {
    "use strict";
    var isOptionObject = require_is_plain_obj();
    var { hasOwnProperty } = Object.prototype;
    var { propertyIsEnumerable } = Object;
    var defineProperty = (object, name10, value) => Object.defineProperty(object, name10, {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
    var globalThis2 = exports;
    var defaultMergeOptions = {
      concatArrays: false,
      ignoreUndefined: false
    };
    var getEnumerableOwnPropertyKeys = (value) => {
      const keys = [];
      for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
          keys.push(key);
        }
      }
      if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(value);
        for (const symbol2 of symbols) {
          if (propertyIsEnumerable.call(value, symbol2)) {
            keys.push(symbol2);
          }
        }
      }
      return keys;
    };
    function clone(value) {
      if (Array.isArray(value)) {
        return cloneArray(value);
      }
      if (isOptionObject(value)) {
        return cloneOptionObject(value);
      }
      return value;
    }
    function cloneArray(array) {
      const result = array.slice(0, 0);
      getEnumerableOwnPropertyKeys(array).forEach((key) => {
        defineProperty(result, key, clone(array[key]));
      });
      return result;
    }
    function cloneOptionObject(object) {
      const result = Object.getPrototypeOf(object) === null ? /* @__PURE__ */ Object.create(null) : {};
      getEnumerableOwnPropertyKeys(object).forEach((key) => {
        defineProperty(result, key, clone(object[key]));
      });
      return result;
    }
    var mergeKeys = (merged, source2, keys, config) => {
      keys.forEach((key) => {
        if (typeof source2[key] === "undefined" && config.ignoreUndefined) {
          return;
        }
        if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
          defineProperty(merged, key, merge3(merged[key], source2[key], config));
        } else {
          defineProperty(merged, key, clone(source2[key]));
        }
      });
      return merged;
    };
    var concatArrays = (merged, source2, config) => {
      let result = merged.slice(0, 0);
      let resultIndex = 0;
      [merged, source2].forEach((array) => {
        const indices = [];
        for (let k = 0; k < array.length; k++) {
          if (!hasOwnProperty.call(array, k)) {
            continue;
          }
          indices.push(String(k));
          if (array === merged) {
            defineProperty(result, resultIndex++, array[k]);
          } else {
            defineProperty(result, resultIndex++, clone(array[k]));
          }
        }
        result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter((key) => !indices.includes(key)), config);
      });
      return result;
    };
    function merge3(merged, source2, config) {
      if (config.concatArrays && Array.isArray(merged) && Array.isArray(source2)) {
        return concatArrays(merged, source2, config);
      }
      if (!isOptionObject(source2) || !isOptionObject(merged)) {
        return clone(source2);
      }
      return mergeKeys(merged, source2, getEnumerableOwnPropertyKeys(source2), config);
    }
    module2.exports = function(...options) {
      const config = merge3(clone(defaultMergeOptions), this !== globalThis2 && this || {}, defaultMergeOptions);
      let merged = { _: {} };
      for (const option of options) {
        if (option === void 0) {
          continue;
        }
        if (!isOptionObject(option)) {
          throw new TypeError("`" + option + "` is not an Option Object");
        }
        merged = merge3(merged, { _: option }, config);
      }
      return merged._;
    };
  }
});

// node_modules/iso-url/src/url-browser.js
var require_url_browser = __commonJS({
  "node_modules/iso-url/src/url-browser.js"(exports, module2) {
    "use strict";
    var isReactNative2 = typeof navigator !== "undefined" && navigator.product === "ReactNative";
    function getDefaultBase() {
      if (isReactNative2) {
        return "http://localhost";
      }
      if (!self.location) {
        return "";
      }
      return self.location.protocol + "//" + self.location.host;
    }
    var URL3 = self.URL;
    var defaultBase = getDefaultBase();
    var URLWithLegacySupport = class {
      constructor(url = "", base7 = defaultBase) {
        this.super = new URL3(url, base7);
        this.path = this.pathname + this.search;
        this.auth = this.username && this.password ? this.username + ":" + this.password : null;
        this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
      }
      get hash() {
        return this.super.hash;
      }
      get host() {
        return this.super.host;
      }
      get hostname() {
        return this.super.hostname;
      }
      get href() {
        return this.super.href;
      }
      get origin() {
        return this.super.origin;
      }
      get password() {
        return this.super.password;
      }
      get pathname() {
        return this.super.pathname;
      }
      get port() {
        return this.super.port;
      }
      get protocol() {
        return this.super.protocol;
      }
      get search() {
        return this.super.search;
      }
      get searchParams() {
        return this.super.searchParams;
      }
      get username() {
        return this.super.username;
      }
      set hash(hash) {
        this.super.hash = hash;
      }
      set host(host) {
        this.super.host = host;
      }
      set hostname(hostname) {
        this.super.hostname = hostname;
      }
      set href(href) {
        this.super.href = href;
      }
      set password(password) {
        this.super.password = password;
      }
      set pathname(pathname) {
        this.super.pathname = pathname;
      }
      set port(port) {
        this.super.port = port;
      }
      set protocol(protocol) {
        this.super.protocol = protocol;
      }
      set search(search) {
        this.super.search = search;
      }
      set username(username) {
        this.super.username = username;
      }
      /**
       * @param {any} o
       */
      static createObjectURL(o) {
        return URL3.createObjectURL(o);
      }
      /**
       * @param {string} o
       */
      static revokeObjectURL(o) {
        URL3.revokeObjectURL(o);
      }
      toJSON() {
        return this.super.toJSON();
      }
      toString() {
        return this.super.toString();
      }
      format() {
        return this.toString();
      }
    };
    function format6(obj) {
      if (typeof obj === "string") {
        const url = new URL3(obj);
        return url.toString();
      }
      if (!(obj instanceof URL3)) {
        const userPass = (
          // @ts-ignore its not supported in node but we normalise
          obj.username && obj.password ? `${obj.username}:${obj.password}@` : ""
        );
        const auth = obj.auth ? obj.auth + "@" : "";
        const port = obj.port ? ":" + obj.port : "";
        const protocol = obj.protocol ? obj.protocol + "//" : "";
        const host = obj.host || "";
        const hostname = obj.hostname || "";
        const search = obj.search || (obj.query ? "?" + obj.query : "");
        const hash = obj.hash || "";
        const pathname = obj.pathname || "";
        const path = obj.path || pathname + search;
        return `${protocol}${userPass || auth}${host || hostname + port}${path}${hash}`;
      }
    }
    module2.exports = {
      URLWithLegacySupport,
      URLSearchParams: self.URLSearchParams,
      defaultBase,
      format: format6
    };
  }
});

// node_modules/iso-url/src/relative.js
var require_relative = __commonJS({
  "node_modules/iso-url/src/relative.js"(exports, module2) {
    "use strict";
    var { URLWithLegacySupport, format: format6 } = require_url_browser();
    module2.exports = (url, location2 = {}, protocolMap = {}, defaultProtocol) => {
      let protocol = location2.protocol ? location2.protocol.replace(":", "") : "http";
      protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
      let urlParsed;
      try {
        urlParsed = new URLWithLegacySupport(url);
      } catch (err) {
        urlParsed = {};
      }
      const base7 = Object.assign({}, location2, {
        protocol: protocol || urlParsed.protocol,
        host: location2.host || urlParsed.host
      });
      return new URLWithLegacySupport(url, format6(base7)).toString();
    };
  }
});

// node_modules/iso-url/index.js
var require_iso_url = __commonJS({
  "node_modules/iso-url/index.js"(exports, module2) {
    "use strict";
    var {
      URLWithLegacySupport,
      format: format6,
      URLSearchParams: URLSearchParams3,
      defaultBase
    } = require_url_browser();
    var relative = require_relative();
    module2.exports = {
      URL: URLWithLegacySupport,
      URLSearchParams: URLSearchParams3,
      format: format6,
      relative,
      defaultBase
    };
  }
});

// node_modules/kubo-rpc-client/dist/src/index.js
var src_exports6 = {};
__export(src_exports6, {
  CID: () => CID2,
  RoutingEventTypes: () => RoutingEventTypes,
  RoutingMessageType: () => RoutingMessageType,
  create: () => create5,
  createBitswap: () => createBitswap,
  createBlock: () => createBlock,
  createBootstrap: () => createBootstrap,
  createConfig: () => createConfig,
  createDAG: () => createDAG,
  createDHT: () => createDHT,
  createDiag: () => createDiag,
  createFiles: () => createFiles,
  createKey: () => createKey,
  createLog: () => createLog,
  createName: () => createName,
  createObject: () => createObject,
  createPin: () => createPin,
  createPubsub: () => createPubsub2,
  createRefs: () => createRefs,
  createRepo: () => createRepo,
  createRouting: () => createRouting,
  createStats: () => createStats,
  createSwarm: () => createSwarm,
  multiaddr: () => multiaddr,
  readURLContent: () => readURLContent,
  urlSource: () => urlSource
});
module.exports = __toCommonJS(src_exports6);

// node_modules/@libp2p/interface/dist/src/peer-id/index.js
var peerIdSymbol = Symbol.for("@libp2p/peer-id");

// node_modules/@libp2p/interface/dist/src/errors.js
var CodeError = class extends Error {
  code;
  props;
  constructor(message, code10, props) {
    super(message);
    this.code = code10;
    this.name = props?.name ?? "CodeError";
    this.props = props ?? {};
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bytes.js
var empty = new Uint8Array(0);
function equals(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString(str) {
  return new TextEncoder().encode(str);
}
function toString(b) {
  return new TextDecoder().decode(b);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/base-x.js
function base(ALPHABET, name10) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode29(source2) {
    if (source2 instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source2)) {
      source2 = new Uint8Array(source2.buffer, source2.byteOffset, source2.byteLength);
    } else if (Array.isArray(source2)) {
      source2 = Uint8Array.from(source2);
    }
    if (!(source2 instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source2.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length5 = 0;
    var pbegin = 0;
    var pend = source2.length;
    while (pbegin !== pend && source2[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source2[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length5) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      pbegin++;
    }
    var it2 = size - length5;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source2) {
    if (typeof source2 !== "string") {
      throw new TypeError("Expected String");
    }
    if (source2.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source2[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length5 = 0;
    while (source2[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source2.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source2[psz]) {
      var carry = BASE_MAP[source2.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length5) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      psz++;
    }
    if (source2[psz] === " ") {
      return;
    }
    var it4 = size - length5;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode34(string4) {
    var buffer3 = decodeUnsafe(string4);
    if (buffer3) {
      return buffer3;
    }
    throw new Error(`Non-${name10} character`);
  }
  return {
    encode: encode29,
    decodeUnsafe,
    decode: decode34
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base.js
var Encoder = class {
  name;
  prefix;
  baseEncode;
  constructor(name10, prefix, baseEncode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name10, prefix, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or(left, right) {
  return new ComposedDecoder({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name10, prefix, baseEncode, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name10, prefix, baseEncode);
    this.decoder = new Decoder(name10, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from({ name: name10, prefix, encode: encode29, decode: decode34 }) {
  return new Codec(name10, prefix, encode29, decode34);
}
function baseX({ name: name10, prefix, alphabet: alphabet4 }) {
  const { encode: encode29, decode: decode34 } = base_x_default(alphabet4, name10);
  return from({
    prefix,
    name: name10,
    encode: encode29,
    decode: (text) => coerce(decode34(text))
  });
}
function decode(string4, alphabet4, bitsPerChar, name10) {
  const codes2 = {};
  for (let i = 0; i < alphabet4.length; ++i) {
    codes2[alphabet4[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer3 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name10} character`);
    }
    buffer3 = buffer3 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer3 >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer3 << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode(data, alphabet4, bitsPerChar) {
  const pad = alphabet4[alphabet4.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer3 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer3 = buffer3 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet4[mask & buffer3 >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet4[mask & buffer3 << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc4648({ name: name10, prefix, bitsPerChar, alphabet: alphabet4 }) {
  return from({
    prefix,
    name: name10,
    encode(input) {
      return encode(input, alphabet4, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet4, bitsPerChar, name10);
    }
  });
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/varint.js
var encode_1 = encode2;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode2(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode2.bytes = offset - oldOffset + 1;
  return out;
}
var decode2 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf3, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf3.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf3[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode2,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/varint.js
function decode3(data, offset = 0) {
  const code10 = varint_default.decode(data, offset);
  return [code10, varint_default.decode.bytes];
}
function encodeTo(int, target, offset = 0) {
  varint_default.encode(int, target, offset);
  return target;
}
function encodingLength(int) {
  return varint_default.encodingLength(int);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/digest.js
function create(code10, digest4) {
  const size = digest4.byteLength;
  const sizeOffset = encodingLength(code10);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code10, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest4, digestOffset);
  return new Digest(code10, size, digest4, bytes);
}
function decode4(multihash) {
  const bytes = coerce(multihash);
  const [code10, sizeOffset] = decode3(bytes);
  const [size, digestOffset] = decode3(bytes.subarray(sizeOffset));
  const digest4 = bytes.subarray(sizeOffset + digestOffset);
  if (digest4.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code10, size, digest4, bytes);
}
function equals2(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals(a.bytes, data.bytes);
  }
}
var Digest = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code10, size, digest4, bytes) {
    this.code = code10;
    this.size = size;
    this.digest = digest4;
    this.bytes = bytes;
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/cid.js
function format(link, base7) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV0(bytes, baseCache(link), base7 ?? base58btc.encoder);
    default:
      return toStringV1(bytes, baseCache(link), base7 ?? base32.encoder);
  }
}
var cache = /* @__PURE__ */ new WeakMap();
function baseCache(cid) {
  const baseCache5 = cache.get(cid);
  if (baseCache5 == null) {
    const baseCache6 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache6);
    return baseCache6;
  }
  return baseCache5;
}
var CID = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code10, multihash, bytes) {
    this.code = code10;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code10, multihash } = this;
        if (code10 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code10, digest: digest4 } = this.multihash;
        const multihash = create(code10, digest4);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals2(self2.multihash, unknown.multihash);
  }
  toString(base7) {
    return format(this, base7);
  }
  toJSON() {
    return { "/": format(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code10, multihash, bytes } = value;
      return new _CID(version, code10, multihash, bytes ?? encodeCID(version, code10, multihash.bytes));
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code: code10 } = value;
      const digest4 = decode4(multihash);
      return _CID.create(version, code10, digest4);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code10, digest4) {
    if (typeof code10 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest4.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code10 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version, code10, digest4, digest4.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version, code10, digest4.bytes);
        return new _CID(version, code10, digest4, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest4) {
    return _CID.create(0, DAG_PB_CODE, digest4);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code10, digest4) {
    return _CID.create(1, code10, digest4);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest4 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest4) : _CID.createV1(specs.codec, digest4);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length5] = decode3(initialBytes.subarray(offset));
      offset += length5;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source2, base7) {
    const [prefix, bytes] = parseCIDtoBytes(source2, base7);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source2[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source2);
    return cid;
  }
};
function parseCIDtoBytes(source2, base7) {
  switch (source2[0]) {
    // CIDv0 is parsed differently
    case "Q": {
      const decoder = base7 ?? base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source2}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base7 ?? base58btc;
      return [base58btc.prefix, decoder.decode(source2)];
    }
    case base32.prefix: {
      const decoder = base7 ?? base32;
      return [base32.prefix, decoder.decode(source2)];
    }
    default: {
      if (base7 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source2[0], base7.decode(source2)];
    }
  }
}
function toStringV0(bytes, cache5, base7) {
  const { prefix } = base7;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base7.name} encoding`);
  }
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes).slice(1);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV1(bytes, cache5, base7) {
  const { prefix } = base7;
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
function encodeCID(version, code10, multihash) {
  const codeOffset = encodingLength(version);
  const hashOffset = codeOffset + encodingLength(code10);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes, 0);
  encodeTo(code10, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/equals.js
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode3(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode5(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode3,
  decode: decode5
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf3) => toString(buf3),
  decode: (str) => fromString(str)
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode4 = coerce;
function digest(input) {
  return create(code, encode4(input));
}
var identity2 = { code, name, encode: encode4, digest };

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/hasher.js
function from2({ name: name10, code: code10, encode: encode29 }) {
  return new Hasher(name10, code10, encode29);
}
var Hasher = class {
  name;
  code;
  encode;
  constructor(name10, code10, encode29) {
    this.name = name10;
    this.code = code10;
    this.encode = encode29;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest4) => create(this.code, digest4));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha(name10) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name10, data));
}
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/basics.js
var bases = { ...identity_exports, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_browser_exports, ...identity_exports2 };

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe(size = 0) {
  return new Uint8Array(size);
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name10, prefix, encode29, decode34) {
  return {
    name: name10,
    prefix,
    encoder: {
      name: name10,
      prefix,
      encode: encode29
    },
    decoder: {
      decode: decode34
    }
  };
}
var string = createCodec("utf8", "u", (buf3) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf3);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf3) => {
  let string4 = "a";
  for (let i = 0; i < buf3.length; i++) {
    string4 += String.fromCharCode(buf3[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf3 = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf3[i] = str.charCodeAt(i);
  }
  return buf3;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base7 = bases_default[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.encoder.encode(array).substring(1);
}

// node_modules/uint8-varint/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe2(size = 0) {
  return new Uint8Array(size);
}

// node_modules/uint8-varint/dist/src/index.js
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var MSB2 = 128;
var REST2 = 127;
function encodingLength2(value) {
  if (value < N12) {
    return 1;
  }
  if (value < N22) {
    return 2;
  }
  if (value < N32) {
    return 3;
  }
  if (value < N42) {
    return 4;
  }
  if (value < N52) {
    return 5;
  }
  if (value < N62) {
    return 6;
  }
  if (value < N72) {
    return 7;
  }
  if (Number.MAX_SAFE_INTEGER != null && value > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Could not encode varint");
  }
  return 8;
}
function encodeUint8Array(value, buf3, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf3[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 7: {
      buf3[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 6: {
      buf3[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 5: {
      buf3[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 4: {
      buf3[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 3: {
      buf3[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 2: {
      buf3[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 1: {
      buf3[offset++] = value & 255;
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf3;
}
function encodeUint8ArrayList(value, buf3, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf3.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 7: {
      buf3.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 6: {
      buf3.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 5: {
      buf3.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 4: {
      buf3.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 3: {
      buf3.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 2: {
      buf3.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 1: {
      buf3.set(offset++, value & 255);
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf3;
}
function decodeUint8Array(buf3, offset) {
  let b = buf3[offset];
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 1];
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 2];
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 3];
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 4];
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 5];
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 6];
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf3[offset + 7];
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function decodeUint8ArrayList(buf3, offset) {
  let b = buf3.get(offset);
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 1);
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 2);
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 3);
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 4);
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 5);
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 6);
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf3.get(offset + 7);
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function encode5(value, buf3, offset = 0) {
  if (buf3 == null) {
    buf3 = allocUnsafe2(encodingLength2(value));
  }
  if (buf3 instanceof Uint8Array) {
    return encodeUint8Array(value, buf3, offset);
  } else {
    return encodeUint8ArrayList(value, buf3, offset);
  }
}
function decode6(buf3, offset = 0) {
  if (buf3 instanceof Uint8Array) {
    return decodeUint8Array(buf3, offset);
  } else {
    return decodeUint8ArrayList(buf3, offset);
  }
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array(buf3) {
  return buf3;
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/concat.js
function concat(arrays, length5) {
  if (length5 == null) {
    length5 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length5);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/@chainsafe/is-ip/lib/parser.js
var Parser = class {
  index = 0;
  input = "";
  new(input) {
    this.index = 0;
    this.input = input;
    return this;
  }
  /** Run a parser, and restore the pre-parse state if it fails. */
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  /** Run a parser, but fail if the entire input wasn't consumed. Doesn't run atomically. */
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  /** Peek the next character from the input */
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  /** Read the next character from the input */
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  /** Read the next character from the input if it matches the target. */
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  /**
   * Helper for reading separators in an indexed loop. Reads the separator
   * character iff index > 0, then runs the parser. When used in a loop,
   * the separator character will only be read on index > 0 (see
   * readIPv4Addr for an example)
   */
  readSeparator(sep, index, inner) {
    return this.readAtomically(() => {
      if (index > 0) {
        if (this.readGivenChar(sep) === void 0) {
          return void 0;
        }
      }
      return inner();
    });
  }
  /**
   * Read a number off the front of the input in the given radix, stopping
   * at the first non-digit character or eof. Fails if the number has more
   * digits than max_digits or if there is no number.
   */
  readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
    return this.readAtomically(() => {
      let result = 0;
      let digitCount = 0;
      const leadingChar = this.peekChar();
      if (leadingChar === void 0) {
        return void 0;
      }
      const hasLeadingZero = leadingChar === "0";
      const maxValue = 2 ** (8 * maxBytes) - 1;
      while (true) {
        const digit = this.readAtomically(() => {
          const char = this.readChar();
          if (char === void 0) {
            return void 0;
          }
          const num = Number.parseInt(char, radix);
          if (Number.isNaN(num)) {
            return void 0;
          }
          return num;
        });
        if (digit === void 0) {
          break;
        }
        result *= radix;
        result += digit;
        if (result > maxValue) {
          return void 0;
        }
        digitCount += 1;
        if (maxDigits !== void 0) {
          if (digitCount > maxDigits) {
            return void 0;
          }
        }
      }
      if (digitCount === 0) {
        return void 0;
      } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
        return void 0;
      } else {
        return result;
      }
    });
  }
  /** Read an IPv4 address. */
  readIPv4Addr() {
    return this.readAtomically(() => {
      const out = new Uint8Array(4);
      for (let i = 0; i < out.length; i++) {
        const ix = this.readSeparator(".", i, () => this.readNumber(10, 3, false, 1));
        if (ix === void 0) {
          return void 0;
        }
        out[i] = ix;
      }
      return out;
    });
  }
  /** Read an IPv6 Address. */
  readIPv6Addr() {
    const readGroups = (groups) => {
      for (let i = 0; i < groups.length / 2; i++) {
        const ix = i * 2;
        if (i < groups.length - 3) {
          const ipv4 = this.readSeparator(":", i, () => this.readIPv4Addr());
          if (ipv4 !== void 0) {
            groups[ix] = ipv4[0];
            groups[ix + 1] = ipv4[1];
            groups[ix + 2] = ipv4[2];
            groups[ix + 3] = ipv4[3];
            return [ix + 4, true];
          }
        }
        const group = this.readSeparator(":", i, () => this.readNumber(16, 4, true, 2));
        if (group === void 0) {
          return [ix, false];
        }
        groups[ix] = group >> 8;
        groups[ix + 1] = group & 255;
      }
      return [groups.length, false];
    };
    return this.readAtomically(() => {
      const head = new Uint8Array(16);
      const [headSize, headIp4] = readGroups(head);
      if (headSize === 16) {
        return head;
      }
      if (headIp4) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      const tail = new Uint8Array(14);
      const limit = 16 - (headSize + 2);
      const [tailSize] = readGroups(tail.subarray(0, limit));
      head.set(tail.subarray(0, tailSize), 16 - tailSize);
      return head;
    });
  }
  /** Read an IP Address, either IPv4 or IPv6. */
  readIPAddr() {
    return this.readIPv4Addr() ?? this.readIPv6Addr();
  }
};

// node_modules/@chainsafe/is-ip/lib/parse.js
var MAX_IPV6_LENGTH = 45;
var MAX_IPV4_LENGTH = 15;
var parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
function parseIPv6(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
function parseIP(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPAddr());
}

// node_modules/@chainsafe/netmask/dist/src/ip.js
var maxIPv6Octet = parseInt("0xFFFF", 16);
var ipv4Prefix = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  255,
  255
]);

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/from-string.js
function fromString2(string4, encoding = "utf8") {
  const base7 = bases_default[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.decoder.decode(`${base7.prefix}${string4}`);
}

// node_modules/@chainsafe/is-ip/lib/is-ip.js
function isIPv4(input) {
  return Boolean(parseIPv4(input));
}
function isIPv6(input) {
  return Boolean(parseIPv6(input));
}
function isIP(input) {
  return Boolean(parseIP(input));
}

// node_modules/@multiformats/multiaddr/dist/src/ip.js
var isV4 = isIPv4;
var isV6 = isIPv6;
var toBytes = function(ip) {
  let offset = 0;
  ip = ip.toString().trim();
  if (isV4(ip)) {
    const bytes = new Uint8Array(offset + 4);
    ip.split(/\./g).forEach((byte) => {
      bytes[offset++] = parseInt(byte, 10) & 255;
    });
    return bytes;
  }
  if (isV6(ip)) {
    const sections = ip.split(":", 8);
    let i;
    for (i = 0; i < sections.length; i++) {
      const isv4 = isV4(sections[i]);
      let v4Buffer;
      if (isv4) {
        v4Buffer = toBytes(sections[i]);
        sections[i] = toString2(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString2(v4Buffer.slice(2, 4), "base16"));
      }
    }
    if (sections[0] === "") {
      while (sections.length < 8)
        sections.unshift("0");
    } else if (sections[sections.length - 1] === "") {
      while (sections.length < 8)
        sections.push("0");
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ""; i++)
        ;
      const argv = [i, 1];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push("0");
      }
      sections.splice.apply(sections, argv);
    }
    const bytes = new Uint8Array(offset + 16);
    for (i = 0; i < sections.length; i++) {
      const word = parseInt(sections[i], 16);
      bytes[offset++] = word >> 8 & 255;
      bytes[offset++] = word & 255;
    }
    return bytes;
  }
  throw new Error("invalid ip address");
};
var toString3 = function(buf3, offset = 0, length5) {
  offset = ~~offset;
  length5 = length5 ?? buf3.length - offset;
  const view = new DataView(buf3.buffer);
  if (length5 === 4) {
    const result = [];
    for (let i = 0; i < length5; i++) {
      result.push(buf3[offset + i]);
    }
    return result.join(".");
  }
  if (length5 === 16) {
    const result = [];
    for (let i = 0; i < length5; i += 2) {
      result.push(view.getUint16(offset + i).toString(16));
    }
    return result.join(":").replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
  }
  return "";
};

// node_modules/@multiformats/multiaddr/dist/src/protocols-table.js
var V = -1;
var names = {};
var codes = {};
var table = [
  [4, 32, "ip4"],
  [6, 16, "tcp"],
  [33, 16, "dccp"],
  [41, 128, "ip6"],
  [42, V, "ip6zone"],
  [43, 8, "ipcidr"],
  [53, V, "dns", true],
  [54, V, "dns4", true],
  [55, V, "dns6", true],
  [56, V, "dnsaddr", true],
  [132, 16, "sctp"],
  [273, 16, "udp"],
  [275, 0, "p2p-webrtc-star"],
  [276, 0, "p2p-webrtc-direct"],
  [277, 0, "p2p-stardust"],
  [280, 0, "webrtc-direct"],
  [281, 0, "webrtc"],
  [290, 0, "p2p-circuit"],
  [301, 0, "udt"],
  [302, 0, "utp"],
  [400, V, "unix", false, true],
  // `ipfs` is added before `p2p` for legacy support.
  // All text representations will default to `p2p`, but `ipfs` will
  // still be supported
  [421, V, "ipfs"],
  // `p2p` is the preferred name for 421, and is now the default
  [421, V, "p2p"],
  [443, 0, "https"],
  [444, 96, "onion"],
  [445, 296, "onion3"],
  [446, V, "garlic64"],
  [448, 0, "tls"],
  [449, V, "sni"],
  [460, 0, "quic"],
  [461, 0, "quic-v1"],
  [465, 0, "webtransport"],
  [466, V, "certhash"],
  [477, 0, "ws"],
  [478, 0, "wss"],
  [479, 0, "p2p-websocket-star"],
  [480, 0, "http"],
  [481, V, "http-path"],
  [777, V, "memory"]
];
table.forEach((row) => {
  const proto = createProtocol(...row);
  codes[proto.code] = proto;
  names[proto.name] = proto;
});
function createProtocol(code10, size, name10, resolvable, path) {
  return {
    code: code10,
    size,
    name: name10,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}
function getProtocol(proto) {
  if (typeof proto === "number") {
    if (codes[proto] != null) {
      return codes[proto];
    }
    throw new Error(`no protocol with code: ${proto}`);
  } else if (typeof proto === "string") {
    if (names[proto] != null) {
      return names[proto];
    }
    throw new Error(`no protocol with name: ${proto}`);
  }
  throw new Error(`invalid protocol id type: ${typeof proto}`);
}

// node_modules/@multiformats/multiaddr/dist/src/convert.js
var ip4Protocol = getProtocol("ip4");
var ip6Protocol = getProtocol("ip6");
var ipcidrProtocol = getProtocol("ipcidr");
function convertToString(proto, buf3) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    // ipv4
    case 41:
      return bytes2ip(buf3);
    case 42:
      return bytes2str(buf3);
    case 6:
    // tcp
    case 273:
    // udp
    case 33:
    // dccp
    case 132:
      return bytes2port(buf3).toString();
    case 53:
    // dns
    case 54:
    // dns4
    case 55:
    // dns6
    case 56:
    // dnsaddr
    case 400:
    // unix
    case 449:
    // sni
    case 777:
      return bytes2str(buf3);
    case 421:
      return bytes2mh(buf3);
    case 444:
      return bytes2onion(buf3);
    case 445:
      return bytes2onion(buf3);
    case 466:
      return bytes2mb(buf3);
    case 481:
      return globalThis.encodeURIComponent(bytes2str(buf3));
    default:
      return toString2(buf3, "base16");
  }
}
function convertToBytes(proto, str) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
      return ip2bytes(str);
    case 41:
      return ip2bytes(str);
    case 42:
      return str2bytes(str);
    case 6:
    // tcp
    case 273:
    // udp
    case 33:
    // dccp
    case 132:
      return port2bytes(parseInt(str, 10));
    case 53:
    // dns
    case 54:
    // dns4
    case 55:
    // dns6
    case 56:
    // dnsaddr
    case 400:
    // unix
    case 449:
    // sni
    case 777:
      return str2bytes(str);
    case 421:
      return mh2bytes(str);
    case 444:
      return onion2bytes(str);
    case 445:
      return onion32bytes(str);
    case 466:
      return mb2bytes(str);
    case 481:
      return str2bytes(globalThis.decodeURIComponent(str));
    default:
      return fromString2(str, "base16");
  }
}
var decoders = Object.values(bases).map((c) => c.decoder);
var anybaseDecoder = function() {
  let acc = decoders[0].or(decoders[1]);
  decoders.slice(2).forEach((d2) => acc = acc.or(d2));
  return acc;
}();
function ip2bytes(ipString) {
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return toBytes(ipString);
}
function bytes2ip(ipBuff) {
  const ipString = toString3(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
function port2bytes(port) {
  const buf3 = new ArrayBuffer(2);
  const view = new DataView(buf3);
  view.setUint16(0, port);
  return new Uint8Array(buf3);
}
function bytes2port(buf3) {
  const view = new DataView(buf3.buffer);
  return view.getUint16(buf3.byteOffset);
}
function str2bytes(str) {
  const buf3 = fromString2(str);
  const size = Uint8Array.from(encode5(buf3.length));
  return concat([size, buf3], size.length + buf3.length);
}
function bytes2str(buf3) {
  const size = decode6(buf3);
  buf3 = buf3.slice(encodingLength2(size));
  if (buf3.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(buf3);
}
function mh2bytes(hash) {
  let mh;
  if (hash[0] === "Q" || hash[0] === "1") {
    mh = decode4(base58btc.decode(`z${hash}`)).bytes;
  } else {
    mh = CID.parse(hash).multihash.bytes;
  }
  const size = Uint8Array.from(encode5(mh.length));
  return concat([size, mh], size.length + mh.length);
}
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(encode5(mb.length));
  return concat([size, mb], size.length + mb.length);
}
function bytes2mb(buf3) {
  const size = decode6(buf3);
  const hash = buf3.slice(encodingLength2(size));
  if (hash.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString2(hash, "base64url");
}
function bytes2mh(buf3) {
  const size = decode6(buf3);
  const address = buf3.slice(encodingLength2(size));
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(address, "base58btc");
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf3 = base32.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf3, portBuf], buf3.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf3 = base32.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf3, portBuf], buf3.length + portBuf.length);
}
function bytes2onion(buf3) {
  const addrBytes = buf3.slice(0, buf3.length - 2);
  const portBytes = buf3.slice(buf3.length - 2);
  const addr = toString2(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}

// node_modules/@multiformats/multiaddr/dist/src/codec.js
function stringToMultiaddrParts(str) {
  str = cleanPath(str);
  const tuples = [];
  const stringTuples = [];
  let path = null;
  const parts = str.split("/").slice(1);
  if (parts.length === 1 && parts[0] === "") {
    return {
      bytes: new Uint8Array(),
      string: "/",
      tuples: [],
      stringTuples: [],
      path: null
    };
  }
  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const proto = getProtocol(part);
    if (proto.size === 0) {
      tuples.push([proto.code]);
      stringTuples.push([proto.code]);
      continue;
    }
    p++;
    if (p >= parts.length) {
      throw ParseError("invalid address: " + str);
    }
    if (proto.path === true) {
      path = cleanPath(parts.slice(p).join("/"));
      tuples.push([proto.code, convertToBytes(proto.code, path)]);
      stringTuples.push([proto.code, path]);
      break;
    }
    const bytes = convertToBytes(proto.code, parts[p]);
    tuples.push([proto.code, bytes]);
    stringTuples.push([proto.code, convertToString(proto.code, bytes)]);
  }
  return {
    string: stringTuplesToString(stringTuples),
    bytes: tuplesToBytes(tuples),
    tuples,
    stringTuples,
    path
  };
}
function bytesToMultiaddrParts(bytes) {
  const tuples = [];
  const stringTuples = [];
  let path = null;
  let i = 0;
  while (i < bytes.length) {
    const code10 = decode6(bytes, i);
    const n = encodingLength2(code10);
    const p = getProtocol(code10);
    const size = sizeForAddr(p, bytes.slice(i + n));
    if (size === 0) {
      tuples.push([code10]);
      stringTuples.push([code10]);
      i += n;
      continue;
    }
    const addr = bytes.slice(i + n, i + n + size);
    i += size + n;
    if (i > bytes.length) {
      throw ParseError("Invalid address Uint8Array: " + toString2(bytes, "base16"));
    }
    tuples.push([code10, addr]);
    const stringAddr = convertToString(code10, addr);
    stringTuples.push([code10, stringAddr]);
    if (p.path === true) {
      path = stringAddr;
      break;
    }
  }
  return {
    bytes: Uint8Array.from(bytes),
    string: stringTuplesToString(stringTuples),
    tuples,
    stringTuples,
    path
  };
}
function stringTuplesToString(tuples) {
  const parts = [];
  tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    parts.push(proto.name);
    if (tup.length > 1 && tup[1] != null) {
      parts.push(tup[1]);
    }
    return null;
  });
  return cleanPath(parts.join("/"));
}
function tuplesToBytes(tuples) {
  return concat(tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    let buf3 = Uint8Array.from(encode5(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf3 = concat([buf3, tup[1]]);
    }
    return buf3;
  }));
}
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = decode6(addr instanceof Uint8Array ? addr : Uint8Array.from(addr));
    return size + encodingLength2(size);
  }
}
function cleanPath(str) {
  return "/" + str.trim().split("/").filter((a) => a).join("/");
}
function ParseError(str) {
  return new Error("Error parsing address: " + str);
}

// node_modules/@multiformats/multiaddr/dist/src/multiaddr.js
var inspect = Symbol.for("nodejs.util.inspect.custom");
var symbol = Symbol.for("@multiformats/js-multiaddr/multiaddr");
var DNS_CODES = [
  getProtocol("dns").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code,
  getProtocol("dnsaddr").code
];
var Multiaddr = class _Multiaddr {
  bytes;
  #string;
  #tuples;
  #stringTuples;
  #path;
  [symbol] = true;
  constructor(addr) {
    if (addr == null) {
      addr = "";
    }
    let parts;
    if (addr instanceof Uint8Array) {
      parts = bytesToMultiaddrParts(addr);
    } else if (typeof addr === "string") {
      if (addr.length > 0 && addr.charAt(0) !== "/") {
        throw new Error(`multiaddr "${addr}" must start with a "/"`);
      }
      parts = stringToMultiaddrParts(addr);
    } else if (isMultiaddr(addr)) {
      parts = bytesToMultiaddrParts(addr.bytes);
    } else {
      throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
    this.bytes = parts.bytes;
    this.#string = parts.string;
    this.#tuples = parts.tuples;
    this.#stringTuples = parts.stringTuples;
    this.#path = parts.path;
  }
  toString() {
    return this.#string;
  }
  toJSON() {
    return this.toString();
  }
  toOptions() {
    let family;
    let transport;
    let host;
    let port;
    let zone = "";
    const tcp = getProtocol("tcp");
    const udp = getProtocol("udp");
    const ip4 = getProtocol("ip4");
    const ip6 = getProtocol("ip6");
    const dns6 = getProtocol("dns6");
    const ip6zone = getProtocol("ip6zone");
    for (const [code10, value] of this.stringTuples()) {
      if (code10 === ip6zone.code) {
        zone = `%${value ?? ""}`;
      }
      if (DNS_CODES.includes(code10)) {
        transport = tcp.name;
        port = 443;
        host = `${value ?? ""}${zone}`;
        family = code10 === dns6.code ? 6 : 4;
      }
      if (code10 === tcp.code || code10 === udp.code) {
        transport = getProtocol(code10).name;
        port = parseInt(value ?? "");
      }
      if (code10 === ip4.code || code10 === ip6.code) {
        transport = getProtocol(code10).name;
        host = `${value ?? ""}${zone}`;
        family = code10 === ip6.code ? 6 : 4;
      }
    }
    if (family == null || transport == null || host == null || port == null) {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family,
      host,
      transport,
      port
    };
    return opts;
  }
  protos() {
    return this.#tuples.map(([code10]) => Object.assign({}, getProtocol(code10)));
  }
  protoCodes() {
    return this.#tuples.map(([code10]) => code10);
  }
  protoNames() {
    return this.#tuples.map(([code10]) => getProtocol(code10).name);
  }
  tuples() {
    return this.#tuples;
  }
  stringTuples() {
    return this.#stringTuples;
  }
  encapsulate(addr) {
    addr = new _Multiaddr(addr);
    return new _Multiaddr(this.toString() + addr.toString());
  }
  decapsulate(addr) {
    const addrString = addr.toString();
    const s2 = this.toString();
    const i = s2.lastIndexOf(addrString);
    if (i < 0) {
      throw new Error(`Address ${this.toString()} does not contain subaddress: ${addr.toString()}`);
    }
    return new _Multiaddr(s2.slice(0, i));
  }
  decapsulateCode(code10) {
    const tuples = this.tuples();
    for (let i = tuples.length - 1; i >= 0; i--) {
      if (tuples[i][0] === code10) {
        return new _Multiaddr(tuplesToBytes(tuples.slice(0, i)));
      }
    }
    return this;
  }
  getPeerId() {
    try {
      let tuples = [];
      this.stringTuples().forEach(([code10, name10]) => {
        if (code10 === names.p2p.code) {
          tuples.push([code10, name10]);
        }
        if (code10 === names["p2p-circuit"].code) {
          tuples = [];
        }
      });
      const tuple = tuples.pop();
      if (tuple?.[1] != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString2(base58btc.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString2(CID.parse(peerIdStr).multihash.bytes, "base58btc");
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getPath() {
    return this.#path;
  }
  equals(addr) {
    return equals3(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p) => p.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw new CodeError(`no available resolver for ${resolvableProto.name}`, "ERR_NO_AVAILABLE_RESOLVER");
    }
    const result = await resolver(this, options);
    return result.map((str) => multiaddr(str));
  }
  nodeAddress() {
    const options = this.toOptions();
    if (options.transport !== "tcp" && options.transport !== "udp") {
      throw new Error(`multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`);
    }
    return {
      family: options.family,
      address: options.host,
      port: options.port
    };
  }
  isThinWaistAddress(addr) {
    const protos = (addr ?? this).protos();
    if (protos.length !== 2) {
      return false;
    }
    if (protos[0].code !== 4 && protos[0].code !== 41) {
      return false;
    }
    if (protos[1].code !== 6 && protos[1].code !== 273) {
      return false;
    }
    return true;
  }
  /**
   * Returns Multiaddr as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { multiaddr } from '@multiformats/multiaddr'
   *
   * console.info(multiaddr('/ip4/127.0.0.1/tcp/4001'))
   * // 'Multiaddr(/ip4/127.0.0.1/tcp/4001)'
   * ```
   */
  [inspect]() {
    return `Multiaddr(${this.#string})`;
  }
};

// node_modules/@multiformats/multiaddr/dist/src/index.js
var resolvers = /* @__PURE__ */ new Map();
function isMultiaddr(value) {
  return Boolean(value?.[symbol]);
}
function multiaddr(addr) {
  return new Multiaddr(addr);
}

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-cbor/src/index.js
var src_exports2 = {};
__export(src_exports2, {
  code: () => code2,
  decode: () => decode12,
  decodeOptions: () => decodeOptions,
  encode: () => encode9,
  encodeOptions: () => encodeOptions,
  name: () => name2,
  toByteView: () => toByteView
});

// node_modules/kubo-rpc-client/node_modules/cborg/lib/is.js
var typeofs = [
  "string",
  "number",
  "bigint",
  "symbol"
];
var objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf2 = typeof value;
  if (typeofs.includes(typeOf2)) {
    return typeOf2;
  }
  if (typeOf2 === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/token.js
var Type = class {
  /**
   * @param {number} major
   * @param {string} name
   * @param {boolean} terminal
   */
  constructor(major, name10, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name10;
    this.terminal = terminal;
  }
  /* c8 ignore next 3 */
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  /**
   * @param {Type} typ
   * @returns {number}
   */
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
};
Type.uint = new Type(0, "uint", true);
Type.negint = new Type(1, "negint", true);
Type.bytes = new Type(2, "bytes", true);
Type.string = new Type(3, "string", true);
Type.array = new Type(4, "array", false);
Type.map = new Type(5, "map", false);
Type.tag = new Type(6, "tag", false);
Type.float = new Type(7, "float", true);
Type.false = new Type(7, "false", true);
Type.true = new Type(7, "true", true);
Type.null = new Type(7, "null", true);
Type.undefined = new Type(7, "undefined", true);
Type.break = new Type(7, "break", true);
var Token = class {
  /**
   * @param {Type} type
   * @param {any} [value]
   * @param {number} [encodedLength]
   */
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  /* c8 ignore next 3 */
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/byte-utils.js
var useBuffer = globalThis.process && // @ts-ignore
!globalThis.process.browser && // @ts-ignore
globalThis.Buffer && // @ts-ignore
typeof globalThis.Buffer.isBuffer === "function";
var textDecoder2 = new TextDecoder();
var textEncoder2 = new TextEncoder();
function isBuffer2(buf3) {
  return useBuffer && globalThis.Buffer.isBuffer(buf3);
}
function asU8A(buf3) {
  if (!(buf3 instanceof Uint8Array)) {
    return Uint8Array.from(buf3);
  }
  return isBuffer2(buf3) ? new Uint8Array(buf3.buffer, buf3.byteOffset, buf3.byteLength) : buf3;
}
var toString4 = useBuffer ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return end - start > 64 ? (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(bytes.subarray(start, end)).toString("utf8")
    ) : utf8Slice(bytes, start, end);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return end - start > 64 ? textDecoder2.decode(bytes.subarray(start, end)) : utf8Slice(bytes, start, end);
  }
);
var fromString3 = useBuffer ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {string} string
   */
  (string4) => {
    return string4.length > 64 ? (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(string4)
    ) : utf8ToBytes(string4);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {string} string
   */
  (string4) => {
    return string4.length > 64 ? textEncoder2.encode(string4) : utf8ToBytes(string4);
  }
);
var fromArray = (arr) => {
  return Uint8Array.from(arr);
};
var slice = useBuffer ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    if (isBuffer2(bytes)) {
      return new Uint8Array(bytes.subarray(start, end));
    }
    return bytes.slice(start, end);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return bytes.slice(start, end);
  }
);
var concat2 = useBuffer ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array[]} chunks
   * @param {number} length
   * @returns {Uint8Array}
   */
  (chunks, length5) => {
    chunks = chunks.map((c) => c instanceof Uint8Array ? c : (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(c)
    ));
    return asU8A(globalThis.Buffer.concat(chunks, length5));
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array[]} chunks
   * @param {number} length
   * @returns {Uint8Array}
   */
  (chunks, length5) => {
    const out = new Uint8Array(length5);
    let off = 0;
    for (let b of chunks) {
      if (off + b.length > out.length) {
        b = b.subarray(0, out.length - off);
      }
      out.set(b, off);
      off += b.length;
    }
    return out;
  }
);
var alloc = useBuffer ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {number} size
   * @returns {Uint8Array}
   */
  (size) => {
    return globalThis.Buffer.allocUnsafe(size);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {number} size
   * @returns {Uint8Array}
   */
  (size) => {
    return new Uint8Array(size);
  }
);
function compare(b1, b2) {
  if (isBuffer2(b1) && isBuffer2(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
}
function utf8Slice(buf3, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf3[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf3[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf3[offset + 1];
          thirdByte = buf3[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf3[offset + 1];
          thirdByte = buf3[offset + 2];
          fourthByte = buf3[offset + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res;
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/bl.js
var defaultChunkSize = 256;
var Bl = class {
  /**
   * @param {number} [chunkSize]
   */
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  /**
   * @param {Uint8Array|number[]} bytes
   */
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  /**
   * @param {boolean} [reset]
   * @returns {Uint8Array}
   */
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice(chunk, 0, this.cursor);
      }
    } else {
      byts = concat2(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/common.js
var decodeErrPrefix = "CBOR decode error:";
var encodeErrPrefix = "CBOR encode error:";
var uintMinorPrefixBytes = [];
uintMinorPrefixBytes[23] = 1;
uintMinorPrefixBytes[24] = 2;
uintMinorPrefixBytes[25] = 3;
uintMinorPrefixBytes[26] = 5;
uintMinorPrefixBytes[27] = 9;
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/0uint.js
var uintBoundaries = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf3, token) {
  return encodeUintValue(buf3, 0, token.value);
}
function encodeUintValue(buf3, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf3.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf3.push([major | 24, nuint]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf3.push([major | 25, nuint >>> 8, nuint & 255]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf3.push([major | 26, nuint >>> 24 & 255, nuint >>> 16 & 255, nuint >>> 8 & 255, nuint & 255]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf3.push(set);
    } else {
      throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize2(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : (
    /* c8 ignore next */
    0
  );
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/1negint.js
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
var neg1b = BigInt(-1);
var pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = readUint64(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
  }
  return new Token(Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf3, token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf3, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize3(token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : (
    /* c8 ignore next */
    0
  );
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/2bytes.js
function toToken(data, pos, prefix, length5) {
  assertEnoughData(data, pos, prefix + length5);
  const buf3 = slice(data, pos + prefix, pos + prefix + length5);
  return new Token(Type.bytes, buf3, prefix + length5);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes = token.type === Type.string ? fromString3(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf3, token) {
  const bytes = tokenBytes(token);
  encodeUintValue(buf3, token.type.majorEncoded, bytes.length);
  buf3.push(bytes);
}
encodeBytes.encodedSize = function encodedSize4(token) {
  const bytes = tokenBytes(token);
  return encodeUintValue.encodedSize(bytes.length) + bytes.length;
};
encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare(b1, b2);
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/3string.js
function toToken2(data, pos, prefix, length5, options) {
  const totLength = prefix + length5;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(Type.string, toString4(data, pos + prefix, pos + totLength), totLength);
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
  }
  return toToken2(data, pos, 9, l, options);
}
var encodeString = encodeBytes;

// node_modules/kubo-rpc-client/node_modules/cborg/lib/4array.js
function toToken3(_data, _pos, prefix, length5) {
  return new Token(Type.array, length5, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken3(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
  }
  return toToken3(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken3(data, pos, 1, Infinity);
}
function encodeArray(buf3, token) {
  encodeUintValue(buf3, Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = encodeUint.compareTokens;
encodeArray.encodedSize = function encodedSize5(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/5map.js
function toToken4(_data, _pos, prefix, length5) {
  return new Token(Type.map, length5, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken4(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
  }
  return toToken4(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken4(data, pos, 1, Infinity);
}
function encodeMap(buf3, token) {
  encodeUintValue(buf3, Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = encodeUint.compareTokens;
encodeMap.encodedSize = function encodedSize6(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/6tag.js
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf3, token) {
  encodeUintValue(buf3, Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = encodeUint.compareTokens;
encodeTag.encodedSize = function encodedSize7(token) {
  return encodeUintValue.encodedSize(token.value);
};

// node_modules/kubo-rpc-client/node_modules/cborg/lib/7float.js
var MINOR_FALSE = 20;
var MINOR_TRUE = 21;
var MINOR_NULL = 22;
var MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf3, token, options) {
  const float = token.value;
  if (float === false) {
    buf3.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf3.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf3.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === void 0) {
    buf3.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf3.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf3.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf3.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize8(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    let decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
var buffer = new ArrayBuffer(9);
var dataView = new DataView(buffer, 1);
var ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | /* sign bit */
        1 << 24 + logicalExponent, false);
      } else {
        dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat16(ui8a3, pos) {
  if (ui8a3.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a3[pos] << 8) + ui8a3[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a3, pos) {
  if (ui8a3.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a3.byteOffset || 0) + pos;
  return new DataView(ui8a3.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a3, pos) {
  if (ui8a3.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a3.byteOffset || 0) + pos;
  return new DataView(ui8a3.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = encodeUint.compareTokens;

// node_modules/kubo-rpc-client/node_modules/cborg/lib/jump.js
function invalidMinor(data, pos, minor) {
  throw new Error(`${decodeErrPrefix} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
var jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = decodeUint8;
jump[25] = decodeUint16;
jump[26] = decodeUint32;
jump[27] = decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = decodeNegint8;
jump[57] = decodeNegint16;
jump[58] = decodeNegint32;
jump[59] = decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = decodeBytesCompact;
}
jump[88] = decodeBytes8;
jump[89] = decodeBytes16;
jump[90] = decodeBytes32;
jump[91] = decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump[i] = decodeStringCompact;
}
jump[120] = decodeString8;
jump[121] = decodeString16;
jump[122] = decodeString32;
jump[123] = decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump[i] = decodeArrayCompact;
}
jump[152] = decodeArray8;
jump[153] = decodeArray16;
jump[154] = decodeArray32;
jump[155] = decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = decodeMapCompact;
}
jump[184] = decodeMap8;
jump[185] = decodeMap16;
jump[186] = decodeMap32;
jump[187] = decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = decodeTagCompact;
}
jump[216] = decodeTag8;
jump[217] = decodeTag16;
jump[218] = decodeTag32;
jump[219] = decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer("simple values are not supported");
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = decodeUndefined;
jump[248] = errorer("simple values are not supported");
jump[249] = decodeFloat16;
jump[250] = decodeFloat32;
jump[251] = decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = decodeBreak;
var quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new Token(Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new Token(Type.negint, i, 1);
}
quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
quick[96] = new Token(Type.string, "", 1);
quick[128] = new Token(Type.array, 0, 1);
quick[160] = new Token(Type.map, 0, 1);
quick[244] = new Token(Type.false, false, 1);
quick[245] = new Token(Type.true, true, 1);
quick[246] = new Token(Type.null, null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/encode.js
var defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken
};
function makeCborEncoders() {
  const encoders = [];
  encoders[Type.uint.major] = encodeUint;
  encoders[Type.negint.major] = encodeNegint;
  encoders[Type.bytes.major] = encodeBytes;
  encoders[Type.string.major] = encodeString;
  encoders[Type.array.major] = encodeArray;
  encoders[Type.map.major] = encodeMap;
  encoders[Type.tag.major] = encodeTag;
  encoders[Type.float.major] = encodeFloat;
  return encoders;
}
var cborEncoders = makeCborEncoders();
var buf = new Bl();
var Ref = class _Ref {
  /**
   * @param {object|any[]} obj
   * @param {Reference|undefined} parent
   */
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  /**
   * @param {object|any[]} obj
   * @returns {boolean}
   */
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  /**
   * @param {Reference|undefined} stack
   * @param {object|any[]} obj
   * @returns {Reference}
   */
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix} object contains circular references`);
    }
    return new _Ref(obj, stack);
  }
};
var simpleTokens = {
  null: new Token(Type.null, null),
  undefined: new Token(Type.undefined, void 0),
  true: new Token(Type.true, true),
  false: new Token(Type.false, false),
  emptyArray: new Token(Type.array, 0),
  emptyMap: new Token(Type.map, 0)
};
var typeEncoders = {
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token(Type.float, obj);
    } else if (obj >= 0) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, obj);
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  string(obj, _typ, _options, _refStack) {
    return new Token(Type.string, obj);
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  /**
   * @param {any} _obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  /**
   * @param {any} _obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj));
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  DataView(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} options
   * @param {Reference} [refStack]
   * @returns {TokenOrNestedTokens}
   */
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyArray, new Token(Type.break)];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [new Token(Type.array, obj.length), entries, new Token(Type.break)];
    }
    return [new Token(Type.array, obj.length), entries];
  },
  /**
   * @param {any} obj
   * @param {string} typ
   * @param {EncodeOptions} options
   * @param {Reference} [refStack]
   * @returns {TokenOrNestedTokens}
   */
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length5 = isMap ? obj.size : keys.length;
    if (!length5) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyMap, new Token(Type.break)];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [new Token(Type.map, length5), entries, new Token(Type.break)];
    }
    return [new Token(Type.map, length5), entries];
  }
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
  typeEncoders[`${typ}Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder = options && options.typeEncoders && /** @type {OptionalTypeEncoder} */
  options.typeEncoders[typ] || typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone");
  }
  return tcmp;
}
function tokensToEncoded(buf3, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf3, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf3, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf3 = new Bl(size);
      encoder(buf3, tokens, options);
      if (buf3.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${tokens} was wrong`);
      }
      return asU8A(buf3.chunks[0]);
    }
  }
  buf.reset();
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode6(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/decode.js
var defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
var Tokeniser = class {
  /**
   * @param {Uint8Array} data
   * @param {DecodeOptions} options
   */
  constructor(data, options = {}) {
    this._pos = 0;
    this.data = data;
    this.options = options;
  }
  pos() {
    return this._pos;
  }
  done() {
    return this._pos >= this.data.length;
  }
  next() {
    const byt = this.data[this._pos];
    let token = quick[byt];
    if (token === void 0) {
      const decoder = jump[byt];
      if (!decoder) {
        throw new Error(`${decodeErrPrefix} no decoder for major type ${byt >>> 5} (byte 0x${byt.toString(16).padStart(2, "0")})`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this._pos, minor, this.options);
    }
    this._pos += token.encodedLength;
    return token;
  }
};
var DONE = Symbol.for("DONE");
var BREAK = Symbol.for("BREAK");
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed array`);
    }
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m2 = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix} got unexpected break to lengthed map`);
    }
    if (key === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`);
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(`${decodeErrPrefix} non-string keys not supported (got ${typeof key})`);
    }
    if (options.rejectDuplicateMapKeys === true) {
      if (useMaps && m2.has(key) || !useMaps && key in obj) {
        throw new Error(`${decodeErrPrefix} found repeat map key "${key}"`);
      }
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(`${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`);
    }
    if (useMaps) {
      m2.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m2 : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decodeFirst(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  return [decoded, data.subarray(tokeniser.pos())];
}
function decode7(data, options) {
  const [decoded, remainder] = decodeFirst(data, options);
  if (remainder.length > 0) {
    throw new Error(`${decodeErrPrefix} too many terminals, data makes no sense`);
  }
  return decoded;
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports2 = {};
__export(base32_exports2, {
  base32: () => base322,
  base32hex: () => base32hex2,
  base32hexpad: () => base32hexpad2,
  base32hexpadupper: () => base32hexpadupper2,
  base32hexupper: () => base32hexupper2,
  base32pad: () => base32pad2,
  base32padupper: () => base32padupper2,
  base32upper: () => base32upper2,
  base32z: () => base32z2
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bytes.js
var empty2 = new Uint8Array(0);
function equals4(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce2(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString4(str) {
  return new TextEncoder().encode(str);
}
function toString5(b) {
  return new TextDecoder().decode(b);
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/vendor/base-x.js
function base3(ALPHABET, name10) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode29(source2) {
    if (source2 instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source2)) {
      source2 = new Uint8Array(source2.buffer, source2.byteOffset, source2.byteLength);
    } else if (Array.isArray(source2)) {
      source2 = Uint8Array.from(source2);
    }
    if (!(source2 instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source2.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length5 = 0;
    var pbegin = 0;
    var pend = source2.length;
    while (pbegin !== pend && source2[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source2[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length5) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      pbegin++;
    }
    var it2 = size - length5;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source2) {
    if (typeof source2 !== "string") {
      throw new TypeError("Expected String");
    }
    if (source2.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source2[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length5 = 0;
    while (source2[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source2.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source2[psz]) {
      var carry = BASE_MAP[source2.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length5) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      psz++;
    }
    if (source2[psz] === " ") {
      return;
    }
    var it4 = size - length5;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode34(string4) {
    var buffer3 = decodeUnsafe(string4);
    if (buffer3) {
      return buffer3;
    }
    throw new Error(`Non-${name10} character`);
  }
  return {
    encode: encode29,
    decodeUnsafe,
    decode: decode34
  };
}
var src2 = base3;
var _brrp__multiformats_scope_baseX2 = src2;
var base_x_default2 = _brrp__multiformats_scope_baseX2;

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base.js
var Encoder2 = class {
  name;
  prefix;
  baseEncode;
  constructor(name10, prefix, baseEncode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder2 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name10, prefix, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder2 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or2(left, right) {
  return new ComposedDecoder2({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec2 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name10, prefix, baseEncode, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder2(name10, prefix, baseEncode);
    this.decoder = new Decoder2(name10, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from3({ name: name10, prefix, encode: encode29, decode: decode34 }) {
  return new Codec2(name10, prefix, encode29, decode34);
}
function baseX2({ name: name10, prefix, alphabet: alphabet4 }) {
  const { encode: encode29, decode: decode34 } = base_x_default2(alphabet4, name10);
  return from3({
    prefix,
    name: name10,
    encode: encode29,
    decode: (text) => coerce2(decode34(text))
  });
}
function decode8(string4, alphabet4, bitsPerChar, name10) {
  const codes2 = {};
  for (let i = 0; i < alphabet4.length; ++i) {
    codes2[alphabet4[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer3 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name10} character`);
    }
    buffer3 = buffer3 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer3 >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer3 << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode7(data, alphabet4, bitsPerChar) {
  const pad = alphabet4[alphabet4.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer3 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer3 = buffer3 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet4[mask & buffer3 >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet4[mask & buffer3 << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46482({ name: name10, prefix, bitsPerChar, alphabet: alphabet4 }) {
  return from3({
    prefix,
    name: name10,
    encode(input) {
      return encode7(input, alphabet4, bitsPerChar);
    },
    decode(input) {
      return decode8(input, alphabet4, bitsPerChar, name10);
    }
  });
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base32.js
var base322 = rfc46482({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper2 = rfc46482({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad2 = rfc46482({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper2 = rfc46482({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex2 = rfc46482({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper2 = rfc46482({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad2 = rfc46482({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper2 = rfc46482({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z2 = rfc46482({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports2 = {};
__export(base58_exports2, {
  base58btc: () => base58btc2,
  base58flickr: () => base58flickr2
});
var base58btc2 = baseX2({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr2 = baseX2({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/vendor/varint.js
var encode_12 = encode8;
var MSB3 = 128;
var REST3 = 127;
var MSBALL2 = ~REST3;
var INT2 = Math.pow(2, 31);
function encode8(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT2) {
    out[offset++] = num & 255 | MSB3;
    num /= 128;
  }
  while (num & MSBALL2) {
    out[offset++] = num & 255 | MSB3;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode8.bytes = offset - oldOffset + 1;
  return out;
}
var decode9 = read2;
var MSB$12 = 128;
var REST$12 = 127;
function read2(buf3, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf3.length;
  do {
    if (counter >= l) {
      read2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf3[counter++];
    res += shift < 28 ? (b & REST$12) << shift : (b & REST$12) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$12);
  read2.bytes = counter - offset;
  return res;
}
var N13 = Math.pow(2, 7);
var N23 = Math.pow(2, 14);
var N33 = Math.pow(2, 21);
var N43 = Math.pow(2, 28);
var N53 = Math.pow(2, 35);
var N63 = Math.pow(2, 42);
var N73 = Math.pow(2, 49);
var N82 = Math.pow(2, 56);
var N92 = Math.pow(2, 63);
var length2 = function(value) {
  return value < N13 ? 1 : value < N23 ? 2 : value < N33 ? 3 : value < N43 ? 4 : value < N53 ? 5 : value < N63 ? 6 : value < N73 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
};
var varint2 = {
  encode: encode_12,
  decode: decode9,
  encodingLength: length2
};
var _brrp_varint2 = varint2;
var varint_default2 = _brrp_varint2;

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/varint.js
function decode10(data, offset = 0) {
  const code10 = varint_default2.decode(data, offset);
  return [code10, varint_default2.decode.bytes];
}
function encodeTo2(int, target, offset = 0) {
  varint_default2.encode(int, target, offset);
  return target;
}
function encodingLength3(int) {
  return varint_default2.encodingLength(int);
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/hashes/digest.js
function create2(code10, digest4) {
  const size = digest4.byteLength;
  const sizeOffset = encodingLength3(code10);
  const digestOffset = sizeOffset + encodingLength3(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo2(code10, bytes, 0);
  encodeTo2(size, bytes, sizeOffset);
  bytes.set(digest4, digestOffset);
  return new Digest2(code10, size, digest4, bytes);
}
function decode11(multihash) {
  const bytes = coerce2(multihash);
  const [code10, sizeOffset] = decode10(bytes);
  const [size, digestOffset] = decode10(bytes.subarray(sizeOffset));
  const digest4 = bytes.subarray(sizeOffset + digestOffset);
  if (digest4.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest2(code10, size, digest4, bytes);
}
function equals5(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals4(a.bytes, data.bytes);
  }
}
var Digest2 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code10, size, digest4, bytes) {
    this.code = code10;
    this.size = size;
    this.digest = digest4;
    this.bytes = bytes;
  }
};

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/cid.js
function format2(link, base7) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV02(bytes, baseCache2(link), base7 ?? base58btc2.encoder);
    default:
      return toStringV12(bytes, baseCache2(link), base7 ?? base322.encoder);
  }
}
var cache2 = /* @__PURE__ */ new WeakMap();
function baseCache2(cid) {
  const baseCache5 = cache2.get(cid);
  if (baseCache5 == null) {
    const baseCache6 = /* @__PURE__ */ new Map();
    cache2.set(cid, baseCache6);
    return baseCache6;
  }
  return baseCache5;
}
var CID2 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code10, multihash, bytes) {
    this.code = code10;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code10, multihash } = this;
        if (code10 !== DAG_PB_CODE2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code10, digest: digest4 } = this.multihash;
        const multihash = create2(code10, digest4);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals5(self2.multihash, unknown.multihash);
  }
  toString(base7) {
    return format2(this, base7);
  }
  toJSON() {
    return { "/": format2(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code10, multihash, bytes } = value;
      return new _CID(version, code10, multihash, bytes ?? encodeCID2(version, code10, multihash.bytes));
    } else if (value[cidSymbol2] === true) {
      const { version, multihash, code: code10 } = value;
      const digest4 = decode11(multihash);
      return _CID.create(version, code10, digest4);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code10, digest4) {
    if (typeof code10 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest4.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code10 !== DAG_PB_CODE2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE2}) block encoding`);
        } else {
          return new _CID(version, code10, digest4, digest4.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID2(version, code10, digest4.bytes);
        return new _CID(version, code10, digest4, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest4) {
    return _CID.create(0, DAG_PB_CODE2, digest4);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code10, digest4) {
    return _CID.create(1, code10, digest4);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce2(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest4 = new Digest2(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest4) : _CID.createV1(specs.codec, digest4);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length5] = decode10(initialBytes.subarray(offset));
      offset += length5;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE2;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source2, base7) {
    const [prefix, bytes] = parseCIDtoBytes2(source2, base7);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source2[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache2(cid).set(prefix, source2);
    return cid;
  }
};
function parseCIDtoBytes2(source2, base7) {
  switch (source2[0]) {
    // CIDv0 is parsed differently
    case "Q": {
      const decoder = base7 ?? base58btc2;
      return [
        base58btc2.prefix,
        decoder.decode(`${base58btc2.prefix}${source2}`)
      ];
    }
    case base58btc2.prefix: {
      const decoder = base7 ?? base58btc2;
      return [base58btc2.prefix, decoder.decode(source2)];
    }
    case base322.prefix: {
      const decoder = base7 ?? base322;
      return [base322.prefix, decoder.decode(source2)];
    }
    default: {
      if (base7 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source2[0], base7.decode(source2)];
    }
  }
}
function toStringV02(bytes, cache5, base7) {
  const { prefix } = base7;
  if (prefix !== base58btc2.prefix) {
    throw Error(`Cannot string encode V0 in ${base7.name} encoding`);
  }
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes).slice(1);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV12(bytes, cache5, base7) {
  const { prefix } = base7;
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE2 = 112;
var SHA_256_CODE2 = 18;
function encodeCID2(version, code10, multihash) {
  const codeOffset = encodingLength3(version);
  const hashOffset = codeOffset + encodingLength3(code10);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo2(version, bytes, 0);
  encodeTo2(code10, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol2 = Symbol.for("@ipld/js-cid/CID");

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-cbor/src/index.js
var CID_CBOR_TAG = 42;
function toByteView(buf3) {
  if (buf3 instanceof ArrayBuffer) {
    return new Uint8Array(buf3, 0, buf3.byteLength);
  }
  return buf3;
}
function cidEncoder(obj) {
  if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
    return null;
  }
  const cid = CID2.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes = new Uint8Array(cid.bytes.byteLength + 1);
  bytes.set(cid.bytes, 1);
  return [
    new Token(Type.tag, CID_CBOR_TAG),
    new Token(Type.bytes, bytes)
  ];
}
function undefinedEncoder() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
var _encodeOptions = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder,
    undefined: undefinedEncoder,
    number: numberEncoder
  }
};
var encodeOptions = {
  ..._encodeOptions,
  typeEncoders: {
    ..._encodeOptions.typeEncoders
  }
};
function cidDecoder(bytes) {
  if (bytes[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID2.decode(bytes.subarray(1));
}
var _decodeOptions = {
  allowIndefinite: false,
  coerceUndefinedToNull: true,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  // this will lead to BigInt for ints outside of
  // safe-integer range, which may surprise users
  strict: true,
  useMaps: false,
  rejectDuplicateMapKeys: true,
  /** @type {import('cborg').TagDecoder[]} */
  tags: []
};
_decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
var decodeOptions = {
  ..._decodeOptions,
  tags: _decodeOptions.tags.slice()
};
var name2 = "dag-cbor";
var code2 = 113;
var encode9 = (node) => encode6(node, _encodeOptions);
var decode12 = (data) => decode7(toByteView(data), _decodeOptions);

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-json/src/index.js
var src_exports3 = {};
__export(src_exports3, {
  code: () => code3,
  decode: () => decode14,
  encode: () => encode11,
  format: () => format3,
  name: () => name3,
  parse: () => parse,
  stringify: () => format3
});

// node_modules/kubo-rpc-client/node_modules/cborg/lib/json/encode.js
var JSONEncoder = class extends Array {
  constructor() {
    super();
    this.inRecursive = [];
  }
  /**
   * @param {Bl} buf
   */
  prefix(buf3) {
    const recurs = this.inRecursive[this.inRecursive.length - 1];
    if (recurs) {
      if (recurs.type === Type.array) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          buf3.push([44]);
        }
      }
      if (recurs.type === Type.map) {
        recurs.elements++;
        if (recurs.elements !== 1) {
          if (recurs.elements % 2 === 1) {
            buf3.push([44]);
          } else {
            buf3.push([58]);
          }
        }
      }
    }
  }
  /**
   * @param {Bl} buf
   * @param {Token} token
   */
  [Type.uint.major](buf3, token) {
    this.prefix(buf3);
    const is3 = String(token.value);
    const isa = [];
    for (let i = 0; i < is3.length; i++) {
      isa[i] = is3.charCodeAt(i);
    }
    buf3.push(isa);
  }
  /**
   * @param {Bl} buf
   * @param {Token} token
   */
  [Type.negint.major](buf3, token) {
    this[Type.uint.major](buf3, token);
  }
  /**
   * @param {Bl} _buf
   * @param {Token} _token
   */
  [Type.bytes.major](_buf, _token) {
    throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
  }
  /**
   * @param {Bl} buf
   * @param {Token} token
   */
  [Type.string.major](buf3, token) {
    this.prefix(buf3);
    const byts = fromString3(JSON.stringify(token.value));
    buf3.push(byts.length > 32 ? asU8A(byts) : byts);
  }
  /**
   * @param {Bl} buf
   * @param {Token} _token
   */
  [Type.array.major](buf3, _token) {
    this.prefix(buf3);
    this.inRecursive.push({ type: Type.array, elements: 0 });
    buf3.push([91]);
  }
  /**
   * @param {Bl} buf
   * @param {Token} _token
   */
  [Type.map.major](buf3, _token) {
    this.prefix(buf3);
    this.inRecursive.push({ type: Type.map, elements: 0 });
    buf3.push([123]);
  }
  /**
   * @param {Bl} _buf
   * @param {Token} _token
   */
  [Type.tag.major](_buf, _token) {
  }
  /**
   * @param {Bl} buf
   * @param {Token} token
   */
  [Type.float.major](buf3, token) {
    if (token.type.name === "break") {
      const recurs = this.inRecursive.pop();
      if (recurs) {
        if (recurs.type === Type.array) {
          buf3.push([93]);
        } else if (recurs.type === Type.map) {
          buf3.push([125]);
        } else {
          throw new Error("Unexpected recursive type; this should not happen!");
        }
        return;
      }
      throw new Error("Unexpected break; this should not happen!");
    }
    if (token.value === void 0) {
      throw new Error(`${encodeErrPrefix} unsupported type: undefined`);
    }
    this.prefix(buf3);
    if (token.type.name === "true") {
      buf3.push([116, 114, 117, 101]);
      return;
    } else if (token.type.name === "false") {
      buf3.push([102, 97, 108, 115, 101]);
      return;
    } else if (token.type.name === "null") {
      buf3.push([110, 117, 108, 108]);
      return;
    }
    const is3 = String(token.value);
    const isa = [];
    let dp = false;
    for (let i = 0; i < is3.length; i++) {
      isa[i] = is3.charCodeAt(i);
      if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
        dp = true;
      }
    }
    if (!dp) {
      isa.push(46);
      isa.push(48);
    }
    buf3.push(isa);
  }
};
function mapSorter2(e1, e2) {
  if (Array.isArray(e1[0]) || Array.isArray(e2[0])) {
    throw new Error(`${encodeErrPrefix} complex map keys are not supported`);
  }
  const keyToken1 = e1[0];
  const keyToken2 = e2[0];
  if (keyToken1.type !== Type.string || keyToken2.type !== Type.string) {
    throw new Error(`${encodeErrPrefix} non-string map keys are not supported`);
  }
  if (keyToken1 < keyToken2) {
    return -1;
  }
  if (keyToken1 > keyToken2) {
    return 1;
  }
  throw new Error(`${encodeErrPrefix} unexpected duplicate map keys, this is not supported`);
}
var defaultEncodeOptions2 = { addBreakTokens: true, mapSorter: mapSorter2 };
function encode10(data, options) {
  options = Object.assign({}, defaultEncodeOptions2, options);
  return encodeCustom(data, new JSONEncoder(), options);
}

// node_modules/kubo-rpc-client/node_modules/cborg/lib/json/decode.js
var Tokenizer = class {
  /**
   * @param {Uint8Array} data
   * @param {DecodeOptions} options
   */
  constructor(data, options = {}) {
    this._pos = 0;
    this.data = data;
    this.options = options;
    this.modeStack = ["value"];
    this.lastToken = "";
  }
  pos() {
    return this._pos;
  }
  /**
   * @returns {boolean}
   */
  done() {
    return this._pos >= this.data.length;
  }
  /**
   * @returns {number}
   */
  ch() {
    return this.data[this._pos];
  }
  /**
   * @returns {string}
   */
  currentMode() {
    return this.modeStack[this.modeStack.length - 1];
  }
  skipWhitespace() {
    let c = this.ch();
    while (c === 32 || c === 9 || c === 13 || c === 10) {
      c = this.data[++this._pos];
    }
  }
  /**
   * @param {number[]} str
   */
  expect(str) {
    if (this.data.length - this._pos < str.length) {
      throw new Error(`${decodeErrPrefix} unexpected end of input at position ${this._pos}`);
    }
    for (let i = 0; i < str.length; i++) {
      if (this.data[this._pos++] !== str[i]) {
        throw new Error(`${decodeErrPrefix} unexpected token at position ${this._pos}, expected to find '${String.fromCharCode(...str)}'`);
      }
    }
  }
  parseNumber() {
    const startPos = this._pos;
    let negative = false;
    let float = false;
    const swallow = (chars) => {
      while (!this.done()) {
        const ch = this.ch();
        if (chars.includes(ch)) {
          this._pos++;
        } else {
          break;
        }
      }
    };
    if (this.ch() === 45) {
      negative = true;
      this._pos++;
    }
    if (this.ch() === 48) {
      this._pos++;
      if (this.ch() === 46) {
        this._pos++;
        float = true;
      } else {
        return new Token(Type.uint, 0, this._pos - startPos);
      }
    }
    swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
    if (negative && this._pos === startPos + 1) {
      throw new Error(`${decodeErrPrefix} unexpected token at position ${this._pos}`);
    }
    if (!this.done() && this.ch() === 46) {
      if (float) {
        throw new Error(`${decodeErrPrefix} unexpected token at position ${this._pos}`);
      }
      float = true;
      this._pos++;
      swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
    }
    if (!this.done() && (this.ch() === 101 || this.ch() === 69)) {
      float = true;
      this._pos++;
      if (!this.done() && (this.ch() === 43 || this.ch() === 45)) {
        this._pos++;
      }
      swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
    }
    const numStr = String.fromCharCode.apply(null, this.data.subarray(startPos, this._pos));
    const num = parseFloat(numStr);
    if (float) {
      return new Token(Type.float, num, this._pos - startPos);
    }
    if (this.options.allowBigInt !== true || Number.isSafeInteger(num)) {
      return new Token(num >= 0 ? Type.uint : Type.negint, num, this._pos - startPos);
    }
    return new Token(num >= 0 ? Type.uint : Type.negint, BigInt(numStr), this._pos - startPos);
  }
  /**
   * @returns {Token}
   */
  parseString() {
    if (this.ch() !== 34) {
      throw new Error(`${decodeErrPrefix} unexpected character at position ${this._pos}; this shouldn't happen`);
    }
    this._pos++;
    for (let i = this._pos, l = 0; i < this.data.length && l < 65536; i++, l++) {
      const ch = this.data[i];
      if (ch === 92 || ch < 32 || ch >= 128) {
        break;
      }
      if (ch === 34) {
        const str = String.fromCharCode.apply(null, this.data.subarray(this._pos, i));
        this._pos = i + 1;
        return new Token(Type.string, str, l);
      }
    }
    const startPos = this._pos;
    const chars = [];
    const readu4 = () => {
      if (this._pos + 4 >= this.data.length) {
        throw new Error(`${decodeErrPrefix} unexpected end of unicode escape sequence at position ${this._pos}`);
      }
      let u4 = 0;
      for (let i = 0; i < 4; i++) {
        let ch = this.ch();
        if (ch >= 48 && ch <= 57) {
          ch -= 48;
        } else if (ch >= 97 && ch <= 102) {
          ch = ch - 97 + 10;
        } else if (ch >= 65 && ch <= 70) {
          ch = ch - 65 + 10;
        } else {
          throw new Error(`${decodeErrPrefix} unexpected unicode escape character at position ${this._pos}`);
        }
        u4 = u4 * 16 + ch;
        this._pos++;
      }
      return u4;
    };
    const readUtf8Char = () => {
      const firstByte = this.ch();
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (this._pos + bytesPerSequence > this.data.length) {
        throw new Error(`${decodeErrPrefix} unexpected unicode sequence at position ${this._pos}`);
      }
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        /* c8 ignore next 6 */
        // this case is dealt with by the caller function
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = this.data[this._pos + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = this.data[this._pos + 1];
          thirdByte = this.data[this._pos + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = this.data[this._pos + 1];
          thirdByte = this.data[this._pos + 2];
          fourthByte = this.data[this._pos + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        chars.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      chars.push(codePoint);
      this._pos += bytesPerSequence;
    };
    while (!this.done()) {
      const ch = this.ch();
      let ch1;
      switch (ch) {
        case 92:
          this._pos++;
          if (this.done()) {
            throw new Error(`${decodeErrPrefix} unexpected string termination at position ${this._pos}`);
          }
          ch1 = this.ch();
          this._pos++;
          switch (ch1) {
            case 34:
            // '"'
            case 39:
            // '\''
            case 92:
            // '\'
            case 47:
              chars.push(ch1);
              break;
            case 98:
              chars.push(8);
              break;
            case 116:
              chars.push(9);
              break;
            case 110:
              chars.push(10);
              break;
            case 102:
              chars.push(12);
              break;
            case 114:
              chars.push(13);
              break;
            case 117:
              chars.push(readu4());
              break;
            default:
              throw new Error(`${decodeErrPrefix} unexpected string escape character at position ${this._pos}`);
          }
          break;
        case 34:
          this._pos++;
          return new Token(Type.string, decodeCodePointsArray(chars), this._pos - startPos);
        default:
          if (ch < 32) {
            throw new Error(`${decodeErrPrefix} invalid control character at position ${this._pos}`);
          } else if (ch < 128) {
            chars.push(ch);
            this._pos++;
          } else {
            readUtf8Char();
          }
      }
    }
    throw new Error(`${decodeErrPrefix} unexpected end of string at position ${this._pos}`);
  }
  /**
   * @returns {Token}
   */
  parseValue() {
    switch (this.ch()) {
      case 123:
        this.modeStack.push("obj-start");
        this._pos++;
        return new Token(Type.map, Infinity, 1);
      case 91:
        this.modeStack.push("array-start");
        this._pos++;
        return new Token(Type.array, Infinity, 1);
      case 34: {
        return this.parseString();
      }
      case 110:
        this.expect([110, 117, 108, 108]);
        return new Token(Type.null, null, 4);
      case 102:
        this.expect([102, 97, 108, 115, 101]);
        return new Token(Type.false, false, 5);
      case 116:
        this.expect([116, 114, 117, 101]);
        return new Token(Type.true, true, 4);
      case 45:
      // '-'
      case 48:
      // '0'
      case 49:
      // '1'
      case 50:
      // '2'
      case 51:
      // '3'
      case 52:
      // '4'
      case 53:
      // '5'
      case 54:
      // '6'
      case 55:
      // '7'
      case 56:
      // '8'
      case 57:
        return this.parseNumber();
      default:
        throw new Error(`${decodeErrPrefix} unexpected character at position ${this._pos}`);
    }
  }
  /**
   * @returns {Token}
   */
  next() {
    this.skipWhitespace();
    switch (this.currentMode()) {
      case "value":
        this.modeStack.pop();
        return this.parseValue();
      case "array-value": {
        this.modeStack.pop();
        if (this.ch() === 93) {
          this._pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        if (this.ch() !== 44) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this._pos}, was expecting array delimiter but found '${String.fromCharCode(this.ch())}'`);
        }
        this._pos++;
        this.modeStack.push("array-value");
        this.skipWhitespace();
        return this.parseValue();
      }
      case "array-start": {
        this.modeStack.pop();
        if (this.ch() === 93) {
          this._pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        this.modeStack.push("array-value");
        this.skipWhitespace();
        return this.parseValue();
      }
      // @ts-ignore
      case "obj-key":
        if (this.ch() === 125) {
          this.modeStack.pop();
          this._pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        if (this.ch() !== 44) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this._pos}, was expecting object delimiter but found '${String.fromCharCode(this.ch())}'`);
        }
        this._pos++;
        this.skipWhitespace();
      case "obj-start": {
        this.modeStack.pop();
        if (this.ch() === 125) {
          this._pos++;
          this.skipWhitespace();
          return new Token(Type.break, void 0, 1);
        }
        const token = this.parseString();
        this.skipWhitespace();
        if (this.ch() !== 58) {
          throw new Error(`${decodeErrPrefix} unexpected character at position ${this._pos}, was expecting key/value delimiter ':' but found '${String.fromCharCode(this.ch())}'`);
        }
        this._pos++;
        this.modeStack.push("obj-value");
        return token;
      }
      case "obj-value": {
        this.modeStack.pop();
        this.modeStack.push("obj-key");
        this.skipWhitespace();
        return this.parseValue();
      }
      /* c8 ignore next 2 */
      default:
        throw new Error(`${decodeErrPrefix} unexpected parse state at position ${this._pos}; this shouldn't happen`);
    }
  }
};
function decode13(data, options) {
  options = Object.assign({ tokenizer: new Tokenizer(data, options) }, options);
  return decode7(data, options);
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/hashes/hasher.js
function from4({ name: name10, code: code10, encode: encode29 }) {
  return new Hasher2(name10, code10, encode29);
}
var Hasher2 = class {
  name;
  code;
  encode;
  constructor(name10, code10, encode29) {
    this.name = name10;
    this.code = code10;
    this.encode = encode29;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest4) => create2(this.code, digest4));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports2 = {};
__export(base64_exports2, {
  base64: () => base642,
  base64pad: () => base64pad2,
  base64url: () => base64url2,
  base64urlpad: () => base64urlpad2
});
var base642 = rfc46482({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad2 = rfc46482({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url2 = rfc46482({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad2 = rfc46482({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-json/src/index.js
function toByteView2(buf3) {
  if (buf3 instanceof ArrayBuffer) {
    return new Uint8Array(buf3, 0, buf3.byteLength);
  }
  return buf3;
}
function cidEncoder2(obj) {
  if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
    return null;
  }
  const cid = CID2.asCID(obj);
  if (!cid) {
    return null;
  }
  const cidString = cid.toString();
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    // key
    new Token(Type.string, cidString, cidString.length),
    // value
    new Token(Type.break, void 0, 1)
  ];
}
function bytesEncoder(bytes) {
  const bytesString = base642.encode(bytes).slice(1);
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    // key
    new Token(Type.map, Infinity, 1),
    // value
    new Token(Type.string, "bytes", 5),
    // inner key
    new Token(Type.string, bytesString, bytesString.length),
    // inner value
    new Token(Type.break, void 0, 1),
    new Token(Type.break, void 0, 1)
  ];
}
function taBytesEncoder(obj) {
  return bytesEncoder(new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
}
function abBytesEncoder(ab) {
  return bytesEncoder(new Uint8Array(ab));
}
function undefinedEncoder2() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder2(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
var encodeOptions2 = {
  typeEncoders: {
    Object: cidEncoder2,
    Buffer: bytesEncoder,
    Uint8Array: bytesEncoder,
    Int8Array: taBytesEncoder,
    Uint16Array: taBytesEncoder,
    Int16Array: taBytesEncoder,
    Uint32Array: taBytesEncoder,
    Int32Array: taBytesEncoder,
    Float32Array: taBytesEncoder,
    Float64Array: taBytesEncoder,
    Uint8ClampedArray: taBytesEncoder,
    BigInt64Array: taBytesEncoder,
    BigUint64Array: taBytesEncoder,
    DataView: taBytesEncoder,
    ArrayBuffer: abBytesEncoder,
    undefined: undefinedEncoder2,
    number: numberEncoder2
  }
};
var DagJsonTokenizer = class extends Tokenizer {
  /**
   * @param {Uint8Array} data
   * @param {object} [options]
   */
  constructor(data, options) {
    super(data, options);
    this.tokenBuffer = [];
  }
  /**
   * @returns {boolean}
   */
  done() {
    return this.tokenBuffer.length === 0 && super.done();
  }
  /**
   * @returns {Token}
   */
  _next() {
    if (this.tokenBuffer.length > 0) {
      return this.tokenBuffer.pop();
    }
    return super.next();
  }
  /**
   * Implements rules outlined in https://github.com/ipld/specs/pull/356
   *
   * @returns {Token}
   */
  next() {
    const token = this._next();
    if (token.type === Type.map) {
      const keyToken = this._next();
      if (keyToken.type === Type.string && keyToken.value === "/") {
        const valueToken = this._next();
        if (valueToken.type === Type.string) {
          const breakToken = this._next();
          if (breakToken.type !== Type.break) {
            throw new Error("Invalid encoded CID form");
          }
          this.tokenBuffer.push(valueToken);
          return new Token(Type.tag, 42, 0);
        }
        if (valueToken.type === Type.map) {
          const innerKeyToken = this._next();
          if (innerKeyToken.type === Type.string && innerKeyToken.value === "bytes") {
            const innerValueToken = this._next();
            if (innerValueToken.type === Type.string) {
              for (let i = 0; i < 2; i++) {
                const breakToken = this._next();
                if (breakToken.type !== Type.break) {
                  throw new Error("Invalid encoded Bytes form");
                }
              }
              const bytes = base642.decode(`m${innerValueToken.value}`);
              return new Token(Type.bytes, bytes, innerValueToken.value.length);
            }
            this.tokenBuffer.push(innerValueToken);
          }
          this.tokenBuffer.push(innerKeyToken);
        }
        this.tokenBuffer.push(valueToken);
      }
      this.tokenBuffer.push(keyToken);
    }
    return token;
  }
};
var decodeOptions2 = {
  allowIndefinite: false,
  allowUndefined: false,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  // this will lead to BigInt for ints outside of
  // safe-integer range, which may surprise users
  strict: true,
  useMaps: false,
  rejectDuplicateMapKeys: true,
  /** @type {import('cborg').TagDecoder[]} */
  tags: []
};
decodeOptions2.tags[42] = CID2.parse;
var name3 = "dag-json";
var code3 = 297;
var encode11 = (node) => encode10(node, encodeOptions2);
var decode14 = (data) => {
  const buf3 = toByteView2(data);
  const options = Object.assign(decodeOptions2, { tokenizer: new DagJsonTokenizer(buf3, decodeOptions2) });
  return decode13(buf3, options);
};
var format3 = (node) => utf8Decoder.decode(encode11(node));
var utf8Decoder = new TextDecoder();
var parse = (data) => decode14(utf8Encoder.encode(data));
var utf8Encoder = new TextEncoder();

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-pb/src/index.js
var src_exports4 = {};
__export(src_exports4, {
  code: () => code4,
  createLink: () => createLink,
  createNode: () => createNode,
  decode: () => decode15,
  encode: () => encode12,
  name: () => name4,
  prepare: () => prepare,
  validate: () => validate
});

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-pb/src/pb-decode.js
var textDecoder3 = new TextDecoder();
function decodeVarint(bytes, offset) {
  let v = 0;
  for (let shift = 0; ; shift += 7) {
    if (shift >= 64) {
      throw new Error("protobuf: varint overflow");
    }
    if (offset >= bytes.length) {
      throw new Error("protobuf: unexpected end of data");
    }
    const b = bytes[offset++];
    v += shift < 28 ? (b & 127) << shift : (b & 127) * 2 ** shift;
    if (b < 128) {
      break;
    }
  }
  return [v, offset];
}
function decodeBytes(bytes, offset) {
  let byteLen;
  [byteLen, offset] = decodeVarint(bytes, offset);
  const postOffset = offset + byteLen;
  if (byteLen < 0 || postOffset < 0) {
    throw new Error("protobuf: invalid length");
  }
  if (postOffset > bytes.length) {
    throw new Error("protobuf: unexpected end of data");
  }
  return [bytes.subarray(offset, postOffset), postOffset];
}
function decodeKey(bytes, index) {
  let wire;
  [wire, index] = decodeVarint(bytes, index);
  return [wire & 7, wire >> 3, index];
}
function decodeLink(bytes) {
  const link = {};
  const l = bytes.length;
  let index = 0;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (fieldNum === 1) {
      if (link.Hash) {
        throw new Error("protobuf: (PBLink) duplicate Hash section");
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Hash`);
      }
      if (link.Name !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Name before Hash");
      }
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Tsize before Hash");
      }
      [link.Hash, index] = decodeBytes(bytes, index);
    } else if (fieldNum === 2) {
      if (link.Name !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Name section");
      }
      if (wireType !== 2) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Name`);
      }
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) invalid order, found Tsize before Name");
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      link.Name = textDecoder3.decode(byts);
    } else if (fieldNum === 3) {
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Tsize section");
      }
      if (wireType !== 0) {
        throw new Error(`protobuf: (PBLink) wrong wireType (${wireType}) for Tsize`);
      }
      [link.Tsize, index] = decodeVarint(bytes, index);
    } else {
      throw new Error(`protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${fieldNum}`);
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBLink) unexpected end of data");
  }
  return link;
}
function decodeNode(bytes) {
  const l = bytes.length;
  let index = 0;
  let links = void 0;
  let linksBeforeData = false;
  let data = void 0;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (wireType !== 2) {
      throw new Error(`protobuf: (PBNode) invalid wireType, expected 2, got ${wireType}`);
    }
    if (fieldNum === 1) {
      if (data) {
        throw new Error("protobuf: (PBNode) duplicate Data section");
      }
      [data, index] = decodeBytes(bytes, index);
      if (links) {
        linksBeforeData = true;
      }
    } else if (fieldNum === 2) {
      if (linksBeforeData) {
        throw new Error("protobuf: (PBNode) duplicate Links section");
      } else if (!links) {
        links = [];
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      links.push(decodeLink(byts));
    } else {
      throw new Error(`protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${fieldNum}`);
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBNode) unexpected end of data");
  }
  const node = {};
  if (data) {
    node.Data = data;
  }
  node.Links = links || [];
  return node;
}

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-pb/src/pb-encode.js
var textEncoder3 = new TextEncoder();
var maxInt32 = 2 ** 32;
var maxUInt32 = 2 ** 31;
function encodeLink(link, bytes) {
  let i = bytes.length;
  if (typeof link.Tsize === "number") {
    if (link.Tsize < 0) {
      throw new Error("Tsize cannot be negative");
    }
    if (!Number.isSafeInteger(link.Tsize)) {
      throw new Error("Tsize too large for encoding");
    }
    i = encodeVarint(bytes, i, link.Tsize) - 1;
    bytes[i] = 24;
  }
  if (typeof link.Name === "string") {
    const nameBytes = textEncoder3.encode(link.Name);
    i -= nameBytes.length;
    bytes.set(nameBytes, i);
    i = encodeVarint(bytes, i, nameBytes.length) - 1;
    bytes[i] = 18;
  }
  if (link.Hash) {
    i -= link.Hash.length;
    bytes.set(link.Hash, i);
    i = encodeVarint(bytes, i, link.Hash.length) - 1;
    bytes[i] = 10;
  }
  return bytes.length - i;
}
function encodeNode(node) {
  const size = sizeNode(node);
  const bytes = new Uint8Array(size);
  let i = size;
  if (node.Data) {
    i -= node.Data.length;
    bytes.set(node.Data, i);
    i = encodeVarint(bytes, i, node.Data.length) - 1;
    bytes[i] = 10;
  }
  if (node.Links) {
    for (let index = node.Links.length - 1; index >= 0; index--) {
      const size2 = encodeLink(node.Links[index], bytes.subarray(0, i));
      i -= size2;
      i = encodeVarint(bytes, i, size2) - 1;
      bytes[i] = 18;
    }
  }
  return bytes;
}
function sizeLink(link) {
  let n = 0;
  if (link.Hash) {
    const l = link.Hash.length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Name === "string") {
    const l = textEncoder3.encode(link.Name).length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Tsize === "number") {
    n += 1 + sov(link.Tsize);
  }
  return n;
}
function sizeNode(node) {
  let n = 0;
  if (node.Data) {
    const l = node.Data.length;
    n += 1 + l + sov(l);
  }
  if (node.Links) {
    for (const link of node.Links) {
      const l = sizeLink(link);
      n += 1 + l + sov(l);
    }
  }
  return n;
}
function encodeVarint(bytes, offset, v) {
  offset -= sov(v);
  const base7 = offset;
  while (v >= maxUInt32) {
    bytes[offset++] = v & 127 | 128;
    v /= 128;
  }
  while (v >= 128) {
    bytes[offset++] = v & 127 | 128;
    v >>>= 7;
  }
  bytes[offset] = v;
  return base7;
}
function sov(x) {
  if (x % 2 === 0) {
    x++;
  }
  return Math.floor((len64(x) + 6) / 7);
}
function len64(x) {
  let n = 0;
  if (x >= maxInt32) {
    x = Math.floor(x / maxInt32);
    n = 32;
  }
  if (x >= 1 << 16) {
    x >>>= 16;
    n += 16;
  }
  if (x >= 1 << 8) {
    x >>>= 8;
    n += 8;
  }
  return n + len8tab[x];
}
var len8tab = [
  0,
  1,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8
];

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-pb/src/util.js
var pbNodeProperties = ["Data", "Links"];
var pbLinkProperties = ["Hash", "Name", "Tsize"];
var textEncoder4 = new TextEncoder();
function linkComparator(a, b) {
  if (a === b) {
    return 0;
  }
  const abuf = a.Name ? textEncoder4.encode(a.Name) : [];
  const bbuf = b.Name ? textEncoder4.encode(b.Name) : [];
  let x = abuf.length;
  let y2 = bbuf.length;
  for (let i = 0, len = Math.min(x, y2); i < len; ++i) {
    if (abuf[i] !== bbuf[i]) {
      x = abuf[i];
      y2 = bbuf[i];
      break;
    }
  }
  return x < y2 ? -1 : y2 < x ? 1 : 0;
}
function hasOnlyProperties(node, properties) {
  return !Object.keys(node).some((p) => !properties.includes(p));
}
function asLink(link) {
  if (typeof link.asCID === "object") {
    const Hash = CID2.asCID(link);
    if (!Hash) {
      throw new TypeError("Invalid DAG-PB form");
    }
    return { Hash };
  }
  if (typeof link !== "object" || Array.isArray(link)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  const pbl = {};
  if (link.Hash) {
    let cid = CID2.asCID(link.Hash);
    try {
      if (!cid) {
        if (typeof link.Hash === "string") {
          cid = CID2.parse(link.Hash);
        } else if (link.Hash instanceof Uint8Array) {
          cid = CID2.decode(link.Hash);
        }
      }
    } catch (e) {
      throw new TypeError(`Invalid DAG-PB form: ${e.message}`);
    }
    if (cid) {
      pbl.Hash = cid;
    }
  }
  if (!pbl.Hash) {
    throw new TypeError("Invalid DAG-PB form");
  }
  if (typeof link.Name === "string") {
    pbl.Name = link.Name;
  }
  if (typeof link.Tsize === "number") {
    pbl.Tsize = link.Tsize;
  }
  return pbl;
}
function prepare(node) {
  if (node instanceof Uint8Array || typeof node === "string") {
    node = { Data: node };
  }
  if (typeof node !== "object" || Array.isArray(node)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  const pbn = {};
  if (node.Data !== void 0) {
    if (typeof node.Data === "string") {
      pbn.Data = textEncoder4.encode(node.Data);
    } else if (node.Data instanceof Uint8Array) {
      pbn.Data = node.Data;
    } else {
      throw new TypeError("Invalid DAG-PB form");
    }
  }
  if (node.Links !== void 0) {
    if (Array.isArray(node.Links)) {
      pbn.Links = node.Links.map(asLink);
      pbn.Links.sort(linkComparator);
    } else {
      throw new TypeError("Invalid DAG-PB form");
    }
  } else {
    pbn.Links = [];
  }
  return pbn;
}
function validate(node) {
  if (!node || typeof node !== "object" || Array.isArray(node) || node instanceof Uint8Array || node["/"] && node["/"] === node.bytes) {
    throw new TypeError("Invalid DAG-PB form");
  }
  if (!hasOnlyProperties(node, pbNodeProperties)) {
    throw new TypeError("Invalid DAG-PB form (extraneous properties)");
  }
  if (node.Data !== void 0 && !(node.Data instanceof Uint8Array)) {
    throw new TypeError("Invalid DAG-PB form (Data must be bytes)");
  }
  if (!Array.isArray(node.Links)) {
    throw new TypeError("Invalid DAG-PB form (Links must be a list)");
  }
  for (let i = 0; i < node.Links.length; i++) {
    const link = node.Links[i];
    if (!link || typeof link !== "object" || Array.isArray(link) || link instanceof Uint8Array || link["/"] && link["/"] === link.bytes) {
      throw new TypeError("Invalid DAG-PB form (bad link)");
    }
    if (!hasOnlyProperties(link, pbLinkProperties)) {
      throw new TypeError("Invalid DAG-PB form (extraneous properties on link)");
    }
    if (link.Hash === void 0) {
      throw new TypeError("Invalid DAG-PB form (link must have a Hash)");
    }
    if (link.Hash == null || !link.Hash["/"] || link.Hash["/"] !== link.Hash.bytes) {
      throw new TypeError("Invalid DAG-PB form (link Hash must be a CID)");
    }
    if (link.Name !== void 0 && typeof link.Name !== "string") {
      throw new TypeError("Invalid DAG-PB form (link Name must be a string)");
    }
    if (link.Tsize !== void 0) {
      if (typeof link.Tsize !== "number" || link.Tsize % 1 !== 0) {
        throw new TypeError("Invalid DAG-PB form (link Tsize must be an integer)");
      }
      if (link.Tsize < 0) {
        throw new TypeError("Invalid DAG-PB form (link Tsize cannot be negative)");
      }
    }
    if (i > 0 && linkComparator(link, node.Links[i - 1]) === -1) {
      throw new TypeError("Invalid DAG-PB form (links must be sorted by Name bytes)");
    }
  }
}
function createNode(data, links = []) {
  return prepare({ Data: data, Links: links });
}
function createLink(name10, size, cid) {
  return asLink({ Hash: cid, Name: name10, Tsize: size });
}
function toByteView3(buf3) {
  if (buf3 instanceof ArrayBuffer) {
    return new Uint8Array(buf3, 0, buf3.byteLength);
  }
  return buf3;
}

// node_modules/kubo-rpc-client/node_modules/@ipld/dag-pb/src/index.js
var name4 = "dag-pb";
var code4 = 112;
function encode12(node) {
  validate(node);
  const pbn = {};
  if (node.Links) {
    pbn.Links = node.Links.map((l) => {
      const link = {};
      if (l.Hash) {
        link.Hash = l.Hash.bytes;
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  if (node.Data) {
    pbn.Data = node.Data;
  }
  return encodeNode(pbn);
}
function decode15(bytes) {
  const buf3 = toByteView3(bytes);
  const pbn = decodeNode(buf3);
  const node = {};
  if (pbn.Data) {
    node.Data = pbn.Data;
  }
  if (pbn.Links) {
    node.Links = pbn.Links.map((l) => {
      const link = {};
      try {
        link.Hash = CID2.decode(l.Hash);
      } catch (e) {
      }
      if (!link.Hash) {
        throw new Error("Invalid Hash field found in link, expected CID");
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  return node;
}

// node_modules/dag-jose/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  code: () => code5,
  decode: () => decode24,
  encode: () => encode19,
  name: () => name5,
  toGeneral: () => toGeneral
});

// node_modules/dag-jose/node_modules/multiformats/dist/src/bytes.js
var empty3 = new Uint8Array(0);
function equals6(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce3(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}

// node_modules/dag-jose/node_modules/multiformats/dist/src/vendor/base-x.js
function base4(ALPHABET, name10) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode29(source2) {
    if (source2 instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source2)) {
      source2 = new Uint8Array(source2.buffer, source2.byteOffset, source2.byteLength);
    } else if (Array.isArray(source2)) {
      source2 = Uint8Array.from(source2);
    }
    if (!(source2 instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source2.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length5 = 0;
    var pbegin = 0;
    var pend = source2.length;
    while (pbegin !== pend && source2[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source2[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length5) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      pbegin++;
    }
    var it2 = size - length5;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source2) {
    if (typeof source2 !== "string") {
      throw new TypeError("Expected String");
    }
    if (source2.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source2[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length5 = 0;
    while (source2[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source2.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source2[psz]) {
      var carry = BASE_MAP[source2.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length5) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      psz++;
    }
    if (source2[psz] === " ") {
      return;
    }
    var it4 = size - length5;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode34(string4) {
    var buffer3 = decodeUnsafe(string4);
    if (buffer3) {
      return buffer3;
    }
    throw new Error(`Non-${name10} character`);
  }
  return {
    encode: encode29,
    decodeUnsafe,
    decode: decode34
  };
}
var src3 = base4;
var _brrp__multiformats_scope_baseX3 = src3;
var base_x_default3 = _brrp__multiformats_scope_baseX3;

// node_modules/dag-jose/node_modules/multiformats/dist/src/bases/base.js
var Encoder3 = class {
  name;
  prefix;
  baseEncode;
  constructor(name10, prefix, baseEncode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder3 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name10, prefix, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or3(this, decoder);
  }
};
var ComposedDecoder3 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or3(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or3(left, right) {
  return new ComposedDecoder3({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec3 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name10, prefix, baseEncode, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder3(name10, prefix, baseEncode);
    this.decoder = new Decoder3(name10, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from5({ name: name10, prefix, encode: encode29, decode: decode34 }) {
  return new Codec3(name10, prefix, encode29, decode34);
}
function baseX3({ name: name10, prefix, alphabet: alphabet4 }) {
  const { encode: encode29, decode: decode34 } = base_x_default3(alphabet4, name10);
  return from5({
    prefix,
    name: name10,
    encode: encode29,
    decode: (text) => coerce3(decode34(text))
  });
}
function decode16(string4, alphabet4, bitsPerChar, name10) {
  const codes2 = {};
  for (let i = 0; i < alphabet4.length; ++i) {
    codes2[alphabet4[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer3 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name10} character`);
    }
    buffer3 = buffer3 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer3 >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer3 << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode13(data, alphabet4, bitsPerChar) {
  const pad = alphabet4[alphabet4.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer3 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer3 = buffer3 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet4[mask & buffer3 >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet4[mask & buffer3 << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46483({ name: name10, prefix, bitsPerChar, alphabet: alphabet4 }) {
  return from5({
    prefix,
    name: name10,
    encode(input) {
      return encode13(input, alphabet4, bitsPerChar);
    },
    decode(input) {
      return decode16(input, alphabet4, bitsPerChar, name10);
    }
  });
}

// node_modules/dag-jose/node_modules/multiformats/dist/src/bases/base64.js
var base643 = rfc46483({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad3 = rfc46483({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url3 = rfc46483({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad3 = rfc46483({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/dag-jose/lib/utils.js
function toBase64url(b) {
  return base64url3.encode(b).slice(1);
}
function fromBase64url(s2) {
  return base64url3.decode(`u${s2}`);
}

// node_modules/dag-jose/node_modules/multiformats/dist/src/bases/base32.js
var base323 = rfc46483({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper3 = rfc46483({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad3 = rfc46483({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper3 = rfc46483({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex3 = rfc46483({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper3 = rfc46483({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad3 = rfc46483({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper3 = rfc46483({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z3 = rfc46483({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/dag-jose/node_modules/multiformats/dist/src/bases/base58.js
var base58btc3 = baseX3({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr3 = baseX3({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/dag-jose/node_modules/multiformats/dist/src/vendor/varint.js
var encode_13 = encode14;
var MSB4 = 128;
var REST4 = 127;
var MSBALL3 = ~REST4;
var INT3 = Math.pow(2, 31);
function encode14(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT3) {
    out[offset++] = num & 255 | MSB4;
    num /= 128;
  }
  while (num & MSBALL3) {
    out[offset++] = num & 255 | MSB4;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode14.bytes = offset - oldOffset + 1;
  return out;
}
var decode17 = read3;
var MSB$13 = 128;
var REST$13 = 127;
function read3(buf3, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf3.length;
  do {
    if (counter >= l) {
      read3.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf3[counter++];
    res += shift < 28 ? (b & REST$13) << shift : (b & REST$13) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$13);
  read3.bytes = counter - offset;
  return res;
}
var N14 = Math.pow(2, 7);
var N24 = Math.pow(2, 14);
var N34 = Math.pow(2, 21);
var N44 = Math.pow(2, 28);
var N54 = Math.pow(2, 35);
var N64 = Math.pow(2, 42);
var N74 = Math.pow(2, 49);
var N83 = Math.pow(2, 56);
var N93 = Math.pow(2, 63);
var length3 = function(value) {
  return value < N14 ? 1 : value < N24 ? 2 : value < N34 ? 3 : value < N44 ? 4 : value < N54 ? 5 : value < N64 ? 6 : value < N74 ? 7 : value < N83 ? 8 : value < N93 ? 9 : 10;
};
var varint3 = {
  encode: encode_13,
  decode: decode17,
  encodingLength: length3
};
var _brrp_varint3 = varint3;
var varint_default3 = _brrp_varint3;

// node_modules/dag-jose/node_modules/multiformats/dist/src/varint.js
function decode18(data, offset = 0) {
  const code10 = varint_default3.decode(data, offset);
  return [code10, varint_default3.decode.bytes];
}
function encodeTo3(int, target, offset = 0) {
  varint_default3.encode(int, target, offset);
  return target;
}
function encodingLength4(int) {
  return varint_default3.encodingLength(int);
}

// node_modules/dag-jose/node_modules/multiformats/dist/src/hashes/digest.js
function create3(code10, digest4) {
  const size = digest4.byteLength;
  const sizeOffset = encodingLength4(code10);
  const digestOffset = sizeOffset + encodingLength4(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo3(code10, bytes, 0);
  encodeTo3(size, bytes, sizeOffset);
  bytes.set(digest4, digestOffset);
  return new Digest3(code10, size, digest4, bytes);
}
function decode19(multihash) {
  const bytes = coerce3(multihash);
  const [code10, sizeOffset] = decode18(bytes);
  const [size, digestOffset] = decode18(bytes.subarray(sizeOffset));
  const digest4 = bytes.subarray(sizeOffset + digestOffset);
  if (digest4.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest3(code10, size, digest4, bytes);
}
function equals7(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals6(a.bytes, data.bytes);
  }
}
var Digest3 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code10, size, digest4, bytes) {
    this.code = code10;
    this.size = size;
    this.digest = digest4;
    this.bytes = bytes;
  }
};

// node_modules/dag-jose/node_modules/multiformats/dist/src/cid.js
function format4(link, base7) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV03(bytes, baseCache3(link), base7 ?? base58btc3.encoder);
    default:
      return toStringV13(bytes, baseCache3(link), base7 ?? base323.encoder);
  }
}
var cache3 = /* @__PURE__ */ new WeakMap();
function baseCache3(cid) {
  const baseCache5 = cache3.get(cid);
  if (baseCache5 == null) {
    const baseCache6 = /* @__PURE__ */ new Map();
    cache3.set(cid, baseCache6);
    return baseCache6;
  }
  return baseCache5;
}
var CID3 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code10, multihash, bytes) {
    this.code = code10;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code10, multihash } = this;
        if (code10 !== DAG_PB_CODE3) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE3) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code10, digest: digest4 } = this.multihash;
        const multihash = create3(code10, digest4);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals7(self2.multihash, unknown.multihash);
  }
  toString(base7) {
    return format4(this, base7);
  }
  toJSON() {
    return { "/": format4(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code10, multihash, bytes } = value;
      return new _CID(version, code10, multihash, bytes ?? encodeCID3(version, code10, multihash.bytes));
    } else if (value[cidSymbol3] === true) {
      const { version, multihash, code: code10 } = value;
      const digest4 = decode19(multihash);
      return _CID.create(version, code10, digest4);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code10, digest4) {
    if (typeof code10 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest4.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code10 !== DAG_PB_CODE3) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE3}) block encoding`);
        } else {
          return new _CID(version, code10, digest4, digest4.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID3(version, code10, digest4.bytes);
        return new _CID(version, code10, digest4, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest4) {
    return _CID.create(0, DAG_PB_CODE3, digest4);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code10, digest4) {
    return _CID.create(1, code10, digest4);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce3(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest4 = new Digest3(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest4) : _CID.createV1(specs.codec, digest4);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length5] = decode18(initialBytes.subarray(offset));
      offset += length5;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE3;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source2, base7) {
    const [prefix, bytes] = parseCIDtoBytes3(source2, base7);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source2[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache3(cid).set(prefix, source2);
    return cid;
  }
};
function parseCIDtoBytes3(source2, base7) {
  switch (source2[0]) {
    // CIDv0 is parsed differently
    case "Q": {
      const decoder = base7 ?? base58btc3;
      return [
        base58btc3.prefix,
        decoder.decode(`${base58btc3.prefix}${source2}`)
      ];
    }
    case base58btc3.prefix: {
      const decoder = base7 ?? base58btc3;
      return [base58btc3.prefix, decoder.decode(source2)];
    }
    case base323.prefix: {
      const decoder = base7 ?? base323;
      return [base323.prefix, decoder.decode(source2)];
    }
    default: {
      if (base7 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source2[0], base7.decode(source2)];
    }
  }
}
function toStringV03(bytes, cache5, base7) {
  const { prefix } = base7;
  if (prefix !== base58btc3.prefix) {
    throw Error(`Cannot string encode V0 in ${base7.name} encoding`);
  }
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes).slice(1);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV13(bytes, cache5, base7) {
  const { prefix } = base7;
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE3 = 112;
var SHA_256_CODE3 = 18;
function encodeCID3(version, code10, multihash) {
  const codeOffset = encodingLength4(version);
  const hashOffset = codeOffset + encodingLength4(code10);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo3(version, bytes, 0);
  encodeTo3(code10, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol3 = Symbol.for("@ipld/js-cid/CID");

// node_modules/dag-jose/lib/signing.js
function fromSplit(split) {
  const [protectedHeader, payload, signature] = split;
  return {
    payload,
    signatures: [{ protected: protectedHeader, signature }],
    link: CID3.decode(fromBase64url(payload))
  };
}
function encodeSignature(signature) {
  const encoded = {
    signature: fromBase64url(signature.signature)
  };
  if (signature.header)
    encoded.header = signature.header;
  if (signature.protected)
    encoded.protected = fromBase64url(signature.protected);
  return encoded;
}
function encode15(jws) {
  const payload = fromBase64url(jws.payload);
  return {
    payload,
    signatures: jws.signatures.map(encodeSignature)
  };
}
function decodeSignature(encoded) {
  const sign = {
    signature: toBase64url(encoded.signature)
  };
  if (encoded.header)
    sign.header = encoded.header;
  if (encoded.protected)
    sign.protected = toBase64url(encoded.protected);
  return sign;
}
function decode20(encoded) {
  const decoded = {
    payload: toBase64url(encoded.payload),
    signatures: encoded.signatures.map(decodeSignature)
  };
  try {
    decoded.pld = replaceCIDs(payloadToJSON(encoded.payload));
    return decoded;
  } catch (e) {
    try {
      decoded.link = CID3.decode(new Uint8Array(encoded.payload));
      return decoded;
    } catch (e2) {
      throw new Error("Invalid payload, must be either JSON or CID");
    }
  }
}
function replaceCIDs(data) {
  if (typeof data === "string") {
    if (data.startsWith("ipfs://")) {
      return CID3.parse(data.slice(7));
    }
  } else if (Array.isArray(data)) {
    return data.map(replaceCIDs);
  } else if (isObject(data)) {
    const newObj = {};
    for (const key in data) {
      newObj[key] = replaceCIDs(data[key]);
    }
    return newObj;
  }
  return data;
}
function isObject(data) {
  return typeof data === "object" && data !== null;
}
function payloadToJSON(data) {
  return JSON.parse(new TextDecoder().decode(data));
}

// node_modules/dag-jose/lib/encryption.js
function fromSplit2(split) {
  const [protectedHeader, encrypted_key, iv, ciphertext, tag] = split;
  const jwe = {
    ciphertext,
    iv,
    protected: protectedHeader,
    tag
  };
  if (encrypted_key)
    jwe.recipients = [{ encrypted_key }];
  return jwe;
}
function encodeRecipient(recipient) {
  const encRec = {};
  if (recipient.encrypted_key)
    encRec.encrypted_key = fromBase64url(recipient.encrypted_key);
  if (recipient.header)
    encRec.header = recipient.header;
  return encRec;
}
function encode16(jwe) {
  const encJwe = {
    ciphertext: fromBase64url(jwe.ciphertext),
    protected: fromBase64url(jwe.protected),
    iv: fromBase64url(jwe.iv),
    tag: fromBase64url(jwe.tag)
  };
  if (jwe.aad)
    encJwe.aad = fromBase64url(jwe.aad);
  if (jwe.recipients)
    encJwe.recipients = jwe.recipients.map(encodeRecipient);
  if (jwe.unprotected)
    encJwe.unprotected = jwe.unprotected;
  return encJwe;
}
function decodeRecipient(encoded) {
  const recipient = {};
  if (encoded.encrypted_key)
    recipient.encrypted_key = toBase64url(encoded.encrypted_key);
  if (encoded.header)
    recipient.header = encoded.header;
  return recipient;
}
function decode21(encoded) {
  const jwe = {
    ciphertext: toBase64url(encoded.ciphertext),
    protected: toBase64url(encoded.protected),
    iv: toBase64url(encoded.iv),
    tag: toBase64url(encoded.tag)
  };
  if (encoded.aad)
    jwe.aad = toBase64url(encoded.aad);
  if (encoded.recipients)
    jwe.recipients = encoded.recipients.map(decodeRecipient);
  if (encoded.unprotected)
    jwe.unprotected = encoded.unprotected;
  return jwe;
}

// node_modules/dag-jose/node_modules/cborg/lib/is.js
var typeofs2 = [
  "string",
  "number",
  "bigint",
  "symbol"
];
var objectTypeNames2 = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function is2(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf2 = typeof value;
  if (typeofs2.includes(typeOf2)) {
    return typeOf2;
  }
  if (typeOf2 === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer3(value)) {
    return "Buffer";
  }
  const objectType = getObjectType2(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer3(value) {
  return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
}
function getObjectType2(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames2.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}

// node_modules/dag-jose/node_modules/cborg/lib/token.js
var Type2 = class {
  /**
   * @param {number} major
   * @param {string} name
   * @param {boolean} terminal
   */
  constructor(major, name10, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name10;
    this.terminal = terminal;
  }
  /* c8 ignore next 3 */
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  /**
   * @param {Type} typ
   * @returns {number}
   */
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
};
Type2.uint = new Type2(0, "uint", true);
Type2.negint = new Type2(1, "negint", true);
Type2.bytes = new Type2(2, "bytes", true);
Type2.string = new Type2(3, "string", true);
Type2.array = new Type2(4, "array", false);
Type2.map = new Type2(5, "map", false);
Type2.tag = new Type2(6, "tag", false);
Type2.float = new Type2(7, "float", true);
Type2.false = new Type2(7, "false", true);
Type2.true = new Type2(7, "true", true);
Type2.null = new Type2(7, "null", true);
Type2.undefined = new Type2(7, "undefined", true);
Type2.break = new Type2(7, "break", true);
var Token2 = class {
  /**
   * @param {Type} type
   * @param {any} [value]
   * @param {number} [encodedLength]
   */
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  /* c8 ignore next 3 */
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};

// node_modules/dag-jose/node_modules/cborg/lib/byte-utils.js
var useBuffer2 = globalThis.process && // @ts-ignore
!globalThis.process.browser && // @ts-ignore
globalThis.Buffer && // @ts-ignore
typeof globalThis.Buffer.isBuffer === "function";
var textDecoder4 = new TextDecoder();
var textEncoder5 = new TextEncoder();
function isBuffer4(buf3) {
  return useBuffer2 && globalThis.Buffer.isBuffer(buf3);
}
function asU8A2(buf3) {
  if (!(buf3 instanceof Uint8Array)) {
    return Uint8Array.from(buf3);
  }
  return isBuffer4(buf3) ? new Uint8Array(buf3.buffer, buf3.byteOffset, buf3.byteLength) : buf3;
}
var toString6 = useBuffer2 ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return end - start > 64 ? (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(bytes.subarray(start, end)).toString("utf8")
    ) : utf8Slice2(bytes, start, end);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return end - start > 64 ? textDecoder4.decode(bytes.subarray(start, end)) : utf8Slice2(bytes, start, end);
  }
);
var fromString5 = useBuffer2 ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {string} string
   */
  (string4) => {
    return string4.length > 64 ? (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(string4)
    ) : utf8ToBytes2(string4);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {string} string
   */
  (string4) => {
    return string4.length > 64 ? textEncoder5.encode(string4) : utf8ToBytes2(string4);
  }
);
var fromArray2 = (arr) => {
  return Uint8Array.from(arr);
};
var slice2 = useBuffer2 ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    if (isBuffer4(bytes)) {
      return new Uint8Array(bytes.subarray(start, end));
    }
    return bytes.slice(start, end);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array} bytes
   * @param {number} start
   * @param {number} end
   */
  (bytes, start, end) => {
    return bytes.slice(start, end);
  }
);
var concat3 = useBuffer2 ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array[]} chunks
   * @param {number} length
   * @returns {Uint8Array}
   */
  (chunks, length5) => {
    chunks = chunks.map((c) => c instanceof Uint8Array ? c : (
      // eslint-disable-line operator-linebreak
      // @ts-ignore
      globalThis.Buffer.from(c)
    ));
    return asU8A2(globalThis.Buffer.concat(chunks, length5));
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {Uint8Array[]} chunks
   * @param {number} length
   * @returns {Uint8Array}
   */
  (chunks, length5) => {
    const out = new Uint8Array(length5);
    let off = 0;
    for (let b of chunks) {
      if (off + b.length > out.length) {
        b = b.subarray(0, out.length - off);
      }
      out.set(b, off);
      off += b.length;
    }
    return out;
  }
);
var alloc2 = useBuffer2 ? (
  // eslint-disable-line operator-linebreak
  /**
   * @param {number} size
   * @returns {Uint8Array}
   */
  (size) => {
    return globalThis.Buffer.allocUnsafe(size);
  }
) : (
  // eslint-disable-line operator-linebreak
  /**
   * @param {number} size
   * @returns {Uint8Array}
   */
  (size) => {
    return new Uint8Array(size);
  }
);
function compare2(b1, b2) {
  if (isBuffer4(b1) && isBuffer4(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes2(str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
}
function utf8Slice2(buf3, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf3[offset];
    let codePoint = null;
    let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf3[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf3[offset + 1];
          thirdByte = buf3[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
            if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf3[offset + 1];
          thirdByte = buf3[offset + 2];
          fourthByte = buf3[offset + 3];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
            tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray2(res);
}
var MAX_ARGUMENTS_LENGTH2 = 4096;
function decodeCodePointsArray2(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH2) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH2)
    );
  }
  return res;
}

// node_modules/dag-jose/node_modules/cborg/lib/bl.js
var defaultChunkSize2 = 256;
var Bl2 = class {
  /**
   * @param {number} [chunkSize]
   */
  constructor(chunkSize = defaultChunkSize2) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  /**
   * @param {Uint8Array|number[]} bytes
   */
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = alloc2(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  /**
   * @param {boolean} [reset]
   * @returns {Uint8Array}
   */
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice2(chunk, 0, this.cursor);
      }
    } else {
      byts = concat3(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
};

// node_modules/dag-jose/node_modules/cborg/lib/common.js
var decodeErrPrefix2 = "CBOR decode error:";
var encodeErrPrefix2 = "CBOR encode error:";
var uintMinorPrefixBytes2 = [];
uintMinorPrefixBytes2[23] = 1;
uintMinorPrefixBytes2[24] = 2;
uintMinorPrefixBytes2[25] = 3;
uintMinorPrefixBytes2[26] = 5;
uintMinorPrefixBytes2[27] = 9;
function assertEnoughData2(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix2} not enough data for type`);
  }
}

// node_modules/dag-jose/node_modules/cborg/lib/0uint.js
var uintBoundaries2 = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function readUint82(data, offset, options) {
  assertEnoughData2(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries2[0]) {
    throw new Error(`${decodeErrPrefix2} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint162(data, offset, options) {
  assertEnoughData2(data, offset, 2);
  const value = data[offset] << 8 | data[offset + 1];
  if (options.strict === true && value < uintBoundaries2[1]) {
    throw new Error(`${decodeErrPrefix2} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint322(data, offset, options) {
  assertEnoughData2(data, offset, 4);
  const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  if (options.strict === true && value < uintBoundaries2[2]) {
    throw new Error(`${decodeErrPrefix2} integer encoded in more bytes than necessary (strict decode)`);
  }
  return value;
}
function readUint642(data, offset, options) {
  assertEnoughData2(data, offset, 8);
  const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
  const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries2[3]) {
    throw new Error(`${decodeErrPrefix2} integer encoded in more bytes than necessary (strict decode)`);
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(`${decodeErrPrefix2} integers outside of the safe integer range are not supported`);
}
function decodeUint82(data, pos, _minor, options) {
  return new Token2(Type2.uint, readUint82(data, pos + 1, options), 2);
}
function decodeUint162(data, pos, _minor, options) {
  return new Token2(Type2.uint, readUint162(data, pos + 1, options), 3);
}
function decodeUint322(data, pos, _minor, options) {
  return new Token2(Type2.uint, readUint322(data, pos + 1, options), 5);
}
function decodeUint642(data, pos, _minor, options) {
  return new Token2(Type2.uint, readUint642(data, pos + 1, options), 9);
}
function encodeUint2(buf3, token) {
  return encodeUintValue2(buf3, 0, token.value);
}
function encodeUintValue2(buf3, major, uint) {
  if (uint < uintBoundaries2[0]) {
    const nuint = Number(uint);
    buf3.push([major | nuint]);
  } else if (uint < uintBoundaries2[1]) {
    const nuint = Number(uint);
    buf3.push([major | 24, nuint]);
  } else if (uint < uintBoundaries2[2]) {
    const nuint = Number(uint);
    buf3.push([major | 25, nuint >>> 8, nuint & 255]);
  } else if (uint < uintBoundaries2[3]) {
    const nuint = Number(uint);
    buf3.push([major | 26, nuint >>> 24 & 255, nuint >>> 16 & 255, nuint >>> 8 & 255, nuint & 255]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries2[4]) {
      const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf3.push(set);
    } else {
      throw new Error(`${decodeErrPrefix2} encountered BigInt larger than allowable range`);
    }
  }
}
encodeUint2.encodedSize = function encodedSize9(token) {
  return encodeUintValue2.encodedSize(token.value);
};
encodeUintValue2.encodedSize = function encodedSize10(uint) {
  if (uint < uintBoundaries2[0]) {
    return 1;
  }
  if (uint < uintBoundaries2[1]) {
    return 2;
  }
  if (uint < uintBoundaries2[2]) {
    return 3;
  }
  if (uint < uintBoundaries2[3]) {
    return 5;
  }
  return 9;
};
encodeUint2.compareTokens = function compareTokens4(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : (
    /* c8 ignore next */
    0
  );
};

// node_modules/dag-jose/node_modules/cborg/lib/1negint.js
function decodeNegint82(data, pos, _minor, options) {
  return new Token2(Type2.negint, -1 - readUint82(data, pos + 1, options), 2);
}
function decodeNegint162(data, pos, _minor, options) {
  return new Token2(Type2.negint, -1 - readUint162(data, pos + 1, options), 3);
}
function decodeNegint322(data, pos, _minor, options) {
  return new Token2(Type2.negint, -1 - readUint322(data, pos + 1, options), 5);
}
var neg1b2 = BigInt(-1);
var pos1b2 = BigInt(1);
function decodeNegint642(data, pos, _minor, options) {
  const int = readUint642(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token2(Type2.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(`${decodeErrPrefix2} integers outside of the safe integer range are not supported`);
  }
  return new Token2(Type2.negint, neg1b2 - BigInt(int), 9);
}
function encodeNegint2(buf3, token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b2 - pos1b2 : negint * -1 - 1;
  encodeUintValue2(buf3, token.type.majorEncoded, unsigned);
}
encodeNegint2.encodedSize = function encodedSize11(token) {
  const negint = token.value;
  const unsigned = typeof negint === "bigint" ? negint * neg1b2 - pos1b2 : negint * -1 - 1;
  if (unsigned < uintBoundaries2[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries2[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries2[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries2[3]) {
    return 5;
  }
  return 9;
};
encodeNegint2.compareTokens = function compareTokens5(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : (
    /* c8 ignore next */
    0
  );
};

// node_modules/dag-jose/node_modules/cborg/lib/2bytes.js
function toToken5(data, pos, prefix, length5) {
  assertEnoughData2(data, pos, prefix + length5);
  const buf3 = slice2(data, pos + prefix, pos + prefix + length5);
  return new Token2(Type2.bytes, buf3, prefix + length5);
}
function decodeBytesCompact2(data, pos, minor, _options) {
  return toToken5(data, pos, 1, minor);
}
function decodeBytes82(data, pos, _minor, options) {
  return toToken5(data, pos, 2, readUint82(data, pos + 1, options));
}
function decodeBytes162(data, pos, _minor, options) {
  return toToken5(data, pos, 3, readUint162(data, pos + 1, options));
}
function decodeBytes322(data, pos, _minor, options) {
  return toToken5(data, pos, 5, readUint322(data, pos + 1, options));
}
function decodeBytes642(data, pos, _minor, options) {
  const l = readUint642(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix2} 64-bit integer bytes lengths not supported`);
  }
  return toToken5(data, pos, 9, l);
}
function tokenBytes2(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes = token.type === Type2.string ? fromString5(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes2(buf3, token) {
  const bytes = tokenBytes2(token);
  encodeUintValue2(buf3, token.type.majorEncoded, bytes.length);
  buf3.push(bytes);
}
encodeBytes2.encodedSize = function encodedSize12(token) {
  const bytes = tokenBytes2(token);
  return encodeUintValue2.encodedSize(bytes.length) + bytes.length;
};
encodeBytes2.compareTokens = function compareTokens6(tok1, tok2) {
  return compareBytes2(tokenBytes2(tok1), tokenBytes2(tok2));
};
function compareBytes2(b1, b2) {
  return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare2(b1, b2);
}

// node_modules/dag-jose/node_modules/cborg/lib/3string.js
function toToken6(data, pos, prefix, length5, options) {
  const totLength = prefix + length5;
  assertEnoughData2(data, pos, totLength);
  const tok = new Token2(Type2.string, toString6(data, pos + prefix, pos + totLength), totLength);
  if (options.retainStringBytes === true) {
    tok.byteValue = slice2(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact2(data, pos, minor, options) {
  return toToken6(data, pos, 1, minor, options);
}
function decodeString82(data, pos, _minor, options) {
  return toToken6(data, pos, 2, readUint82(data, pos + 1, options), options);
}
function decodeString162(data, pos, _minor, options) {
  return toToken6(data, pos, 3, readUint162(data, pos + 1, options), options);
}
function decodeString322(data, pos, _minor, options) {
  return toToken6(data, pos, 5, readUint322(data, pos + 1, options), options);
}
function decodeString642(data, pos, _minor, options) {
  const l = readUint642(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix2} 64-bit integer string lengths not supported`);
  }
  return toToken6(data, pos, 9, l, options);
}
var encodeString2 = encodeBytes2;

// node_modules/dag-jose/node_modules/cborg/lib/4array.js
function toToken7(_data, _pos, prefix, length5) {
  return new Token2(Type2.array, length5, prefix);
}
function decodeArrayCompact2(data, pos, minor, _options) {
  return toToken7(data, pos, 1, minor);
}
function decodeArray82(data, pos, _minor, options) {
  return toToken7(data, pos, 2, readUint82(data, pos + 1, options));
}
function decodeArray162(data, pos, _minor, options) {
  return toToken7(data, pos, 3, readUint162(data, pos + 1, options));
}
function decodeArray322(data, pos, _minor, options) {
  return toToken7(data, pos, 5, readUint322(data, pos + 1, options));
}
function decodeArray642(data, pos, _minor, options) {
  const l = readUint642(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix2} 64-bit integer array lengths not supported`);
  }
  return toToken7(data, pos, 9, l);
}
function decodeArrayIndefinite2(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix2} indefinite length items not allowed`);
  }
  return toToken7(data, pos, 1, Infinity);
}
function encodeArray2(buf3, token) {
  encodeUintValue2(buf3, Type2.array.majorEncoded, token.value);
}
encodeArray2.compareTokens = encodeUint2.compareTokens;
encodeArray2.encodedSize = function encodedSize13(token) {
  return encodeUintValue2.encodedSize(token.value);
};

// node_modules/dag-jose/node_modules/cborg/lib/5map.js
function toToken8(_data, _pos, prefix, length5) {
  return new Token2(Type2.map, length5, prefix);
}
function decodeMapCompact2(data, pos, minor, _options) {
  return toToken8(data, pos, 1, minor);
}
function decodeMap82(data, pos, _minor, options) {
  return toToken8(data, pos, 2, readUint82(data, pos + 1, options));
}
function decodeMap162(data, pos, _minor, options) {
  return toToken8(data, pos, 3, readUint162(data, pos + 1, options));
}
function decodeMap322(data, pos, _minor, options) {
  return toToken8(data, pos, 5, readUint322(data, pos + 1, options));
}
function decodeMap642(data, pos, _minor, options) {
  const l = readUint642(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(`${decodeErrPrefix2} 64-bit integer map lengths not supported`);
  }
  return toToken8(data, pos, 9, l);
}
function decodeMapIndefinite2(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix2} indefinite length items not allowed`);
  }
  return toToken8(data, pos, 1, Infinity);
}
function encodeMap2(buf3, token) {
  encodeUintValue2(buf3, Type2.map.majorEncoded, token.value);
}
encodeMap2.compareTokens = encodeUint2.compareTokens;
encodeMap2.encodedSize = function encodedSize14(token) {
  return encodeUintValue2.encodedSize(token.value);
};

// node_modules/dag-jose/node_modules/cborg/lib/6tag.js
function decodeTagCompact2(_data, _pos, minor, _options) {
  return new Token2(Type2.tag, minor, 1);
}
function decodeTag82(data, pos, _minor, options) {
  return new Token2(Type2.tag, readUint82(data, pos + 1, options), 2);
}
function decodeTag162(data, pos, _minor, options) {
  return new Token2(Type2.tag, readUint162(data, pos + 1, options), 3);
}
function decodeTag322(data, pos, _minor, options) {
  return new Token2(Type2.tag, readUint322(data, pos + 1, options), 5);
}
function decodeTag642(data, pos, _minor, options) {
  return new Token2(Type2.tag, readUint642(data, pos + 1, options), 9);
}
function encodeTag2(buf3, token) {
  encodeUintValue2(buf3, Type2.tag.majorEncoded, token.value);
}
encodeTag2.compareTokens = encodeUint2.compareTokens;
encodeTag2.encodedSize = function encodedSize15(token) {
  return encodeUintValue2.encodedSize(token.value);
};

// node_modules/dag-jose/node_modules/cborg/lib/7float.js
var MINOR_FALSE2 = 20;
var MINOR_TRUE2 = 21;
var MINOR_NULL2 = 22;
var MINOR_UNDEFINED2 = 23;
function decodeUndefined2(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix2} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token2(Type2.null, null, 1);
  }
  return new Token2(Type2.undefined, void 0, 1);
}
function decodeBreak2(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix2} indefinite length items not allowed`);
  }
  return new Token2(Type2.break, void 0, 1);
}
function createToken2(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix2} NaN values are not supported`);
    }
    if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
      throw new Error(`${decodeErrPrefix2} Infinity values are not supported`);
    }
  }
  return new Token2(Type2.float, value, bytes);
}
function decodeFloat162(data, pos, _minor, options) {
  return createToken2(readFloat162(data, pos + 1), 3, options);
}
function decodeFloat322(data, pos, _minor, options) {
  return createToken2(readFloat322(data, pos + 1), 5, options);
}
function decodeFloat642(data, pos, _minor, options) {
  return createToken2(readFloat642(data, pos + 1), 9, options);
}
function encodeFloat2(buf3, token, options) {
  const float = token.value;
  if (float === false) {
    buf3.push([Type2.float.majorEncoded | MINOR_FALSE2]);
  } else if (float === true) {
    buf3.push([Type2.float.majorEncoded | MINOR_TRUE2]);
  } else if (float === null) {
    buf3.push([Type2.float.majorEncoded | MINOR_NULL2]);
  } else if (float === void 0) {
    buf3.push([Type2.float.majorEncoded | MINOR_UNDEFINED2]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat162(float);
      decoded = readFloat162(ui8a2, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a2[0] = 249;
        buf3.push(ui8a2.slice(0, 3));
        success = true;
      } else {
        encodeFloat322(float);
        decoded = readFloat322(ui8a2, 1);
        if (float === decoded) {
          ui8a2[0] = 250;
          buf3.push(ui8a2.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat642(float);
      decoded = readFloat642(ui8a2, 1);
      ui8a2[0] = 251;
      buf3.push(ui8a2.slice(0, 9));
    }
  }
}
encodeFloat2.encodedSize = function encodedSize16(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat162(float);
    let decoded = readFloat162(ui8a2, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat322(float);
    decoded = readFloat322(ui8a2, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
var buffer2 = new ArrayBuffer(9);
var dataView2 = new DataView(buffer2, 1);
var ui8a2 = new Uint8Array(buffer2, 0);
function encodeFloat162(inp) {
  if (inp === Infinity) {
    dataView2.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView2.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView2.setUint16(0, 32256, false);
  } else {
    dataView2.setFloat32(0, inp);
    const valu32 = dataView2.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView2.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView2.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView2.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView2.setUint16(0, (valu32 & 2147483648) >> 16 | /* sign bit */
        1 << 24 + logicalExponent, false);
      } else {
        dataView2.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
      }
    }
  }
}
function readFloat162(ui8a3, pos) {
  if (ui8a3.length - pos < 2) {
    throw new Error(`${decodeErrPrefix2} not enough data for float16`);
  }
  const half = (ui8a3[pos] << 8) + ui8a3[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = half >> 10 & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat322(inp) {
  dataView2.setFloat32(0, inp, false);
}
function readFloat322(ui8a3, pos) {
  if (ui8a3.length - pos < 4) {
    throw new Error(`${decodeErrPrefix2} not enough data for float32`);
  }
  const offset = (ui8a3.byteOffset || 0) + pos;
  return new DataView(ui8a3.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat642(inp) {
  dataView2.setFloat64(0, inp, false);
}
function readFloat642(ui8a3, pos) {
  if (ui8a3.length - pos < 8) {
    throw new Error(`${decodeErrPrefix2} not enough data for float64`);
  }
  const offset = (ui8a3.byteOffset || 0) + pos;
  return new DataView(ui8a3.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat2.compareTokens = encodeUint2.compareTokens;

// node_modules/dag-jose/node_modules/cborg/lib/jump.js
function invalidMinor2(data, pos, minor) {
  throw new Error(`${decodeErrPrefix2} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
}
function errorer2(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix2} ${msg}`);
  };
}
var jump2 = [];
for (let i = 0; i <= 23; i++) {
  jump2[i] = invalidMinor2;
}
jump2[24] = decodeUint82;
jump2[25] = decodeUint162;
jump2[26] = decodeUint322;
jump2[27] = decodeUint642;
jump2[28] = invalidMinor2;
jump2[29] = invalidMinor2;
jump2[30] = invalidMinor2;
jump2[31] = invalidMinor2;
for (let i = 32; i <= 55; i++) {
  jump2[i] = invalidMinor2;
}
jump2[56] = decodeNegint82;
jump2[57] = decodeNegint162;
jump2[58] = decodeNegint322;
jump2[59] = decodeNegint642;
jump2[60] = invalidMinor2;
jump2[61] = invalidMinor2;
jump2[62] = invalidMinor2;
jump2[63] = invalidMinor2;
for (let i = 64; i <= 87; i++) {
  jump2[i] = decodeBytesCompact2;
}
jump2[88] = decodeBytes82;
jump2[89] = decodeBytes162;
jump2[90] = decodeBytes322;
jump2[91] = decodeBytes642;
jump2[92] = invalidMinor2;
jump2[93] = invalidMinor2;
jump2[94] = invalidMinor2;
jump2[95] = errorer2("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump2[i] = decodeStringCompact2;
}
jump2[120] = decodeString82;
jump2[121] = decodeString162;
jump2[122] = decodeString322;
jump2[123] = decodeString642;
jump2[124] = invalidMinor2;
jump2[125] = invalidMinor2;
jump2[126] = invalidMinor2;
jump2[127] = errorer2("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump2[i] = decodeArrayCompact2;
}
jump2[152] = decodeArray82;
jump2[153] = decodeArray162;
jump2[154] = decodeArray322;
jump2[155] = decodeArray642;
jump2[156] = invalidMinor2;
jump2[157] = invalidMinor2;
jump2[158] = invalidMinor2;
jump2[159] = decodeArrayIndefinite2;
for (let i = 160; i <= 183; i++) {
  jump2[i] = decodeMapCompact2;
}
jump2[184] = decodeMap82;
jump2[185] = decodeMap162;
jump2[186] = decodeMap322;
jump2[187] = decodeMap642;
jump2[188] = invalidMinor2;
jump2[189] = invalidMinor2;
jump2[190] = invalidMinor2;
jump2[191] = decodeMapIndefinite2;
for (let i = 192; i <= 215; i++) {
  jump2[i] = decodeTagCompact2;
}
jump2[216] = decodeTag82;
jump2[217] = decodeTag162;
jump2[218] = decodeTag322;
jump2[219] = decodeTag642;
jump2[220] = invalidMinor2;
jump2[221] = invalidMinor2;
jump2[222] = invalidMinor2;
jump2[223] = invalidMinor2;
for (let i = 224; i <= 243; i++) {
  jump2[i] = errorer2("simple values are not supported");
}
jump2[244] = invalidMinor2;
jump2[245] = invalidMinor2;
jump2[246] = invalidMinor2;
jump2[247] = decodeUndefined2;
jump2[248] = errorer2("simple values are not supported");
jump2[249] = decodeFloat162;
jump2[250] = decodeFloat322;
jump2[251] = decodeFloat642;
jump2[252] = invalidMinor2;
jump2[253] = invalidMinor2;
jump2[254] = invalidMinor2;
jump2[255] = decodeBreak2;
var quick2 = [];
for (let i = 0; i < 24; i++) {
  quick2[i] = new Token2(Type2.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick2[31 - i] = new Token2(Type2.negint, i, 1);
}
quick2[64] = new Token2(Type2.bytes, new Uint8Array(0), 1);
quick2[96] = new Token2(Type2.string, "", 1);
quick2[128] = new Token2(Type2.array, 0, 1);
quick2[160] = new Token2(Type2.map, 0, 1);
quick2[244] = new Token2(Type2.false, false, 1);
quick2[245] = new Token2(Type2.true, true, 1);
quick2[246] = new Token2(Type2.null, null, 1);
function quickEncodeToken2(token) {
  switch (token.type) {
    case Type2.false:
      return fromArray2([244]);
    case Type2.true:
      return fromArray2([245]);
    case Type2.null:
      return fromArray2([246]);
    case Type2.bytes:
      if (!token.value.length) {
        return fromArray2([64]);
      }
      return;
    case Type2.string:
      if (token.value === "") {
        return fromArray2([96]);
      }
      return;
    case Type2.array:
      if (token.value === 0) {
        return fromArray2([128]);
      }
      return;
    case Type2.map:
      if (token.value === 0) {
        return fromArray2([160]);
      }
      return;
    case Type2.uint:
      if (token.value < 24) {
        return fromArray2([Number(token.value)]);
      }
      return;
    case Type2.negint:
      if (token.value >= -24) {
        return fromArray2([31 - Number(token.value)]);
      }
  }
}

// node_modules/dag-jose/node_modules/cborg/lib/encode.js
var defaultEncodeOptions3 = {
  float64: false,
  mapSorter: mapSorter3,
  quickEncodeToken: quickEncodeToken2
};
function makeCborEncoders2() {
  const encoders = [];
  encoders[Type2.uint.major] = encodeUint2;
  encoders[Type2.negint.major] = encodeNegint2;
  encoders[Type2.bytes.major] = encodeBytes2;
  encoders[Type2.string.major] = encodeString2;
  encoders[Type2.array.major] = encodeArray2;
  encoders[Type2.map.major] = encodeMap2;
  encoders[Type2.tag.major] = encodeTag2;
  encoders[Type2.float.major] = encodeFloat2;
  return encoders;
}
var cborEncoders2 = makeCborEncoders2();
var buf2 = new Bl2();
var Ref2 = class _Ref {
  /**
   * @param {object|any[]} obj
   * @param {Reference|undefined} parent
   */
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  /**
   * @param {object|any[]} obj
   * @returns {boolean}
   */
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while (p = p.parent);
    return false;
  }
  /**
   * @param {Reference|undefined} stack
   * @param {object|any[]} obj
   * @returns {Reference}
   */
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix2} object contains circular references`);
    }
    return new _Ref(obj, stack);
  }
};
var simpleTokens2 = {
  null: new Token2(Type2.null, null),
  undefined: new Token2(Type2.undefined, void 0),
  true: new Token2(Type2.true, true),
  false: new Token2(Type2.false, false),
  emptyArray: new Token2(Type2.array, 0),
  emptyMap: new Token2(Type2.map, 0)
};
var typeEncoders2 = {
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token2(Type2.float, obj);
    } else if (obj >= 0) {
      return new Token2(Type2.uint, obj);
    } else {
      return new Token2(Type2.negint, obj);
    }
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token2(Type2.uint, obj);
    } else {
      return new Token2(Type2.negint, obj);
    }
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token2(Type2.bytes, obj);
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  string(obj, _typ, _options, _refStack) {
    return new Token2(Type2.string, obj);
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens2.true : simpleTokens2.false;
  },
  /**
   * @param {any} _obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens2.null;
  },
  /**
   * @param {any} _obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens2.undefined;
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token2(Type2.bytes, new Uint8Array(obj));
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} _options
   * @param {Reference} [_refStack]
   * @returns {TokenOrNestedTokens}
   */
  DataView(obj, _typ, _options, _refStack) {
    return new Token2(Type2.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
  },
  /**
   * @param {any} obj
   * @param {string} _typ
   * @param {EncodeOptions} options
   * @param {Reference} [refStack]
   * @returns {TokenOrNestedTokens}
   */
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [simpleTokens2.emptyArray, new Token2(Type2.break)];
      }
      return simpleTokens2.emptyArray;
    }
    refStack = Ref2.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens2(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [new Token2(Type2.array, obj.length), entries, new Token2(Type2.break)];
    }
    return [new Token2(Type2.array, obj.length), entries];
  },
  /**
   * @param {any} obj
   * @param {string} typ
   * @param {EncodeOptions} options
   * @param {Reference} [refStack]
   * @returns {TokenOrNestedTokens}
   */
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length5 = isMap ? obj.size : keys.length;
    if (!length5) {
      if (options.addBreakTokens === true) {
        return [simpleTokens2.emptyMap, new Token2(Type2.break)];
      }
      return simpleTokens2.emptyMap;
    }
    refStack = Ref2.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens2(key, options, refStack),
        objectToTokens2(isMap ? obj.get(key) : obj[key], options, refStack)
      ];
    }
    sortMapEntries2(entries, options);
    if (options.addBreakTokens) {
      return [new Token2(Type2.map, length5), entries, new Token2(Type2.break)];
    }
    return [new Token2(Type2.map, length5), entries];
  }
};
typeEncoders2.Map = typeEncoders2.Object;
typeEncoders2.Buffer = typeEncoders2.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
  typeEncoders2[`${typ}Array`] = typeEncoders2.DataView;
}
function objectToTokens2(obj, options = {}, refStack) {
  const typ = is2(obj);
  const customTypeEncoder = options && options.typeEncoders && /** @type {OptionalTypeEncoder} */
  options.typeEncoders[typ] || typeEncoders2[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders2[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix2} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries2(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter3(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders2[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone");
  }
  return tcmp;
}
function tokensToEncoded2(buf3, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded2(buf3, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf3, tokens, options);
  }
}
function encodeCustom2(data, encoders, options) {
  const tokens = objectToTokens2(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf3 = new Bl2(size);
      encoder(buf3, tokens, options);
      if (buf3.chunks.length !== 1) {
        throw new Error(`Unexpected error: pre-calculated length for ${tokens} was wrong`);
      }
      return asU8A2(buf3.chunks[0]);
    }
  }
  buf2.reset();
  tokensToEncoded2(buf2, tokens, encoders, options);
  return buf2.toBytes(true);
}
function encode17(data, options) {
  options = Object.assign({}, defaultEncodeOptions3, options);
  return encodeCustom2(data, cborEncoders2, options);
}

// node_modules/dag-jose/node_modules/cborg/lib/decode.js
var defaultDecodeOptions2 = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true
};
var Tokeniser2 = class {
  /**
   * @param {Uint8Array} data
   * @param {DecodeOptions} options
   */
  constructor(data, options = {}) {
    this._pos = 0;
    this.data = data;
    this.options = options;
  }
  pos() {
    return this._pos;
  }
  done() {
    return this._pos >= this.data.length;
  }
  next() {
    const byt = this.data[this._pos];
    let token = quick2[byt];
    if (token === void 0) {
      const decoder = jump2[byt];
      if (!decoder) {
        throw new Error(`${decodeErrPrefix2} no decoder for major type ${byt >>> 5} (byte 0x${byt.toString(16).padStart(2, "0")})`);
      }
      const minor = byt & 31;
      token = decoder(this.data, this._pos, minor, this.options);
    }
    this._pos += token.encodedLength;
    return token;
  }
};
var DONE2 = Symbol.for("DONE");
var BREAK2 = Symbol.for("BREAK");
function tokenToArray2(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject2(tokeniser, options);
    if (value === BREAK2) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix2} got unexpected break to lengthed array`);
    }
    if (value === DONE2) {
      throw new Error(`${decodeErrPrefix2} found array but not enough entries (got ${i}, expected ${token.value})`);
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap2(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m2 = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject2(tokeniser, options);
    if (key === BREAK2) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(`${decodeErrPrefix2} got unexpected break to lengthed map`);
    }
    if (key === DONE2) {
      throw new Error(`${decodeErrPrefix2} found map but not enough entries (got ${i} [no key], expected ${token.value})`);
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(`${decodeErrPrefix2} non-string keys not supported (got ${typeof key})`);
    }
    if (options.rejectDuplicateMapKeys === true) {
      if (useMaps && m2.has(key) || !useMaps && key in obj) {
        throw new Error(`${decodeErrPrefix2} found repeat map key "${key}"`);
      }
    }
    const value = tokensToObject2(tokeniser, options);
    if (value === DONE2) {
      throw new Error(`${decodeErrPrefix2} found map but not enough entries (got ${i} [no value], expected ${token.value})`);
    }
    if (useMaps) {
      m2.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m2 : obj;
}
function tokensToObject2(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE2;
  }
  const token = tokeniser.next();
  if (token.type === Type2.break) {
    return BREAK2;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type2.array) {
    return tokenToArray2(token, tokeniser, options);
  }
  if (token.type === Type2.map) {
    return tokenToMap2(token, tokeniser, options);
  }
  if (token.type === Type2.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject2(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix2} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decodeFirst3(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix2} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions2, options);
  const tokeniser = options.tokenizer || new Tokeniser2(data, options);
  const decoded = tokensToObject2(tokeniser, options);
  if (decoded === DONE2) {
    throw new Error(`${decodeErrPrefix2} did not find any content to decode`);
  }
  if (decoded === BREAK2) {
    throw new Error(`${decodeErrPrefix2} got unexpected break`);
  }
  return [decoded, data.subarray(tokeniser.pos())];
}
function decode22(data, options) {
  const [decoded, remainder] = decodeFirst3(data, options);
  if (remainder.length > 0) {
    throw new Error(`${decodeErrPrefix2} too many terminals, data makes no sense`);
  }
  return decoded;
}

// node_modules/dag-jose/node_modules/@ipld/dag-cbor/src/index.js
var CID_CBOR_TAG2 = 42;
function toByteView4(buf3) {
  if (buf3 instanceof ArrayBuffer) {
    return new Uint8Array(buf3, 0, buf3.byteLength);
  }
  return buf3;
}
function cidEncoder3(obj) {
  if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
    return null;
  }
  const cid = CID3.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes = new Uint8Array(cid.bytes.byteLength + 1);
  bytes.set(cid.bytes, 1);
  return [
    new Token2(Type2.tag, CID_CBOR_TAG2),
    new Token2(Type2.bytes, bytes)
  ];
}
function undefinedEncoder3() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function numberEncoder3(num) {
  if (Number.isNaN(num)) {
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  }
  return null;
}
var _encodeOptions2 = {
  float64: true,
  typeEncoders: {
    Object: cidEncoder3,
    undefined: undefinedEncoder3,
    number: numberEncoder3
  }
};
var encodeOptions3 = {
  ..._encodeOptions2,
  typeEncoders: {
    ..._encodeOptions2.typeEncoders
  }
};
function cidDecoder2(bytes) {
  if (bytes[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID3.decode(bytes.subarray(1));
}
var _decodeOptions2 = {
  allowIndefinite: false,
  coerceUndefinedToNull: true,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true,
  // this will lead to BigInt for ints outside of
  // safe-integer range, which may surprise users
  strict: true,
  useMaps: false,
  rejectDuplicateMapKeys: true,
  /** @type {import('cborg').TagDecoder[]} */
  tags: []
};
_decodeOptions2.tags[CID_CBOR_TAG2] = cidDecoder2;
var decodeOptions3 = {
  ..._decodeOptions2,
  tags: _decodeOptions2.tags.slice()
};
var encode18 = (node) => encode17(node, _encodeOptions2);
var decode23 = (data) => decode22(toByteView4(data), _decodeOptions2);

// node_modules/dag-jose/lib/index.js
var name5 = "dag-jose";
var code5 = 133;
function isDagJWS(jose) {
  return "payload" in jose && typeof jose.payload === "string" && "signatures" in jose && Array.isArray(jose.signatures);
}
function isEncodedJWS(jose) {
  return "payload" in jose && jose.payload instanceof Uint8Array && "signatures" in jose && Array.isArray(jose.signatures);
}
function isEncodedJWE(jose) {
  return "ciphertext" in jose && jose.ciphertext instanceof Uint8Array && "iv" in jose && jose.iv instanceof Uint8Array && "protected" in jose && jose.protected instanceof Uint8Array && "tag" in jose && jose.tag instanceof Uint8Array;
}
function isDagJWE(jose) {
  return "ciphertext" in jose && typeof jose.ciphertext === "string" && "iv" in jose && typeof jose.iv === "string" && "protected" in jose && typeof jose.protected === "string" && "tag" in jose && typeof jose.tag === "string";
}
function toGeneral(jose) {
  if (typeof jose === "string") {
    const split = jose.split(".");
    if (split.length === 3) {
      return fromSplit(split);
    } else if (split.length === 5) {
      return fromSplit2(split);
    }
    throw new Error("Not a valid JOSE string");
  }
  if (isDagJWS(jose) || isDagJWE(jose)) {
    return jose;
  }
  throw new Error("Not a valid unencoded JOSE object");
}
function encode19(obj) {
  if (typeof obj === "string") {
    obj = toGeneral(obj);
  }
  let encodedJose;
  if (isDagJWS(obj)) {
    encodedJose = encode15(obj);
  } else if (isDagJWE(obj)) {
    encodedJose = encode16(obj);
  } else {
    throw new Error("Not a valid JOSE object");
  }
  return new Uint8Array(encode18(encodedJose));
}
function decode24(data) {
  let encoded;
  try {
    encoded = decode23(data);
  } catch (e) {
    throw new Error("Not a valid DAG-JOSE object");
  }
  if (isEncodedJWS(encoded)) {
    return decode20(encoded);
  } else if (isEncodedJWE(encoded)) {
    return decode21(encoded);
  } else {
    throw new Error("Not a valid DAG-JOSE object");
  }
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports2 = {};
__export(base10_exports2, {
  base10: () => base102
});
var base102 = baseX2({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports2 = {};
__export(base16_exports2, {
  base16: () => base162,
  base16upper: () => base16upper2
});
var base162 = rfc46482({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper2 = rfc46482({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports2 = {};
__export(base2_exports2, {
  base2: () => base22
});
var base22 = rfc46482({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports2 = {};
__export(base256emoji_exports2, {
  base256emoji: () => base256emoji2
});
var alphabet2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars2 = alphabet2.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes2 = alphabet2.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode20(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars2[c];
    return p;
  }, "");
}
function decode25(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes2[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji2 = from3({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode20,
  decode: decode25
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports2 = {};
__export(base36_exports2, {
  base36: () => base362,
  base36upper: () => base36upper2
});
var base362 = baseX2({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper2 = baseX2({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports2 = {};
__export(base8_exports2, {
  base8: () => base82
});
var base82 = rfc46482({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports3 = {};
__export(identity_exports3, {
  identity: () => identity3
});
var identity3 = from3({
  prefix: "\0",
  name: "identity",
  encode: (buf3) => toString5(buf3),
  decode: (str) => fromString4(str)
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/codecs/json.js
var json_exports3 = {};
__export(json_exports3, {
  code: () => code6,
  decode: () => decode26,
  encode: () => encode21,
  name: () => name6
});
var textEncoder6 = new TextEncoder();
var textDecoder5 = new TextDecoder();
var name6 = "json";
var code6 = 512;
function encode21(node) {
  return textEncoder6.encode(JSON.stringify(node));
}
function decode26(data) {
  return JSON.parse(textDecoder5.decode(data));
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/codecs/raw.js
var raw_exports2 = {};
__export(raw_exports2, {
  code: () => code7,
  decode: () => decode27,
  encode: () => encode22,
  name: () => name7
});
var name7 = "raw";
var code7 = 85;
function encode22(node) {
  return coerce2(node);
}
function decode27(data) {
  return coerce2(data);
}

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports4 = {};
__export(identity_exports4, {
  identity: () => identity4
});
var code8 = 0;
var name8 = "identity";
var encode23 = coerce2;
function digest2(input) {
  return create2(code8, encode23(input));
}
var identity4 = { code: code8, name: name8, encode: encode23, digest: digest2 };

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports2 = {};
__export(sha2_browser_exports2, {
  sha256: () => sha2562,
  sha512: () => sha5122
});
function sha2(name10) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name10, data));
}
var sha2562 = from4({
  name: "sha2-256",
  code: 18,
  encode: sha2("SHA-256")
});
var sha5122 = from4({
  name: "sha2-512",
  code: 19,
  encode: sha2("SHA-512")
});

// node_modules/kubo-rpc-client/node_modules/multiformats/dist/src/basics.js
var bases2 = { ...identity_exports3, ...base2_exports2, ...base8_exports2, ...base10_exports2, ...base16_exports2, ...base32_exports2, ...base36_exports2, ...base58_exports2, ...base64_exports2, ...base256emoji_exports2 };
var hashes2 = { ...sha2_browser_exports2, ...identity_exports4 };
var codecs = { raw: raw_exports2, json: json_exports3 };

// node_modules/kubo-rpc-client/node_modules/any-signal/dist/src/index.js
function anySignal(signals) {
  const controller = new globalThis.AbortController();
  function onAbort() {
    controller.abort();
    for (const signal2 of signals) {
      if (signal2?.removeEventListener != null) {
        signal2.removeEventListener("abort", onAbort);
      }
    }
  }
  for (const signal2 of signals) {
    if (signal2?.aborted === true) {
      onAbort();
      break;
    }
    if (signal2?.addEventListener != null) {
      signal2.addEventListener("abort", onAbort);
    }
  }
  function clear() {
    for (const signal2 of signals) {
      if (signal2?.removeEventListener != null) {
        signal2.removeEventListener("abort", onAbort);
      }
    }
  }
  const signal = controller.signal;
  signal.clear = clear;
  return signal;
}

// node_modules/kubo-rpc-client/node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/kubo-rpc-client/node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};

// node_modules/wherearewe/src/index.js
var import_is_electron = __toESM(require_is_electron(), 1);
var isEnvWithDom = typeof window === "object" && typeof document === "object" && document.nodeType === 9;
var isElectron = (0, import_is_electron.default)();
var isBrowser = isEnvWithDom && !isElectron;
var isElectronRenderer = isElectron && isEnvWithDom;
var isNode = typeof globalThis.process !== "undefined" && typeof globalThis.process.release !== "undefined" && globalThis.process.release.name === "node" && !isElectron;
var isWebWorker = typeof importScripts === "function" && typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isTest = typeof globalThis.process !== "undefined" && typeof globalThis.process.env !== "undefined" && globalThis.process.env["NODE" + /* @__PURE__ */ (() => "_")() + "ENV"] === "test";
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";

// node_modules/kubo-rpc-client/node_modules/browser-readablestream-to-it/dist/src/index.js
async function* browserReadableStreamToIt(stream, options = {}) {
  const reader = stream.getReader();
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) {
        return;
      }
      yield result.value;
    }
  } finally {
    if (options.preventCancel !== true) {
      await reader.cancel();
    }
    reader.releaseLock();
  }
}

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-candidate-multiple.js
var import_err_code = __toESM(require_err_code(), 1);

// node_modules/kubo-rpc-client/node_modules/it-peekable/dist/src/index.js
function peekable(iterable) {
  const [iterator, symbol2] = iterable[Symbol.asyncIterator] != null ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator] : [iterable[Symbol.iterator](), Symbol.iterator];
  const queue = [];
  return {
    peek: () => {
      return iterator.next();
    },
    push: (value) => {
      queue.push(value);
    },
    next: () => {
      if (queue.length > 0) {
        return {
          done: false,
          value: queue.shift()
        };
      }
      return iterator.next();
    },
    [symbol2]() {
      return this;
    }
  };
}
var src_default = peekable;

// node_modules/kubo-rpc-client/node_modules/it-map/dist/src/index.js
function isAsyncIterable(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function map(source2, func) {
  let index = 0;
  if (isAsyncIterable(source2)) {
    return async function* () {
      for await (const val of source2) {
        yield func(val, index++);
      }
    }();
  }
  const peekable2 = src_default(source2);
  const { value, done } = peekable2.next();
  if (done === true) {
    return function* () {
    }();
  }
  const res = func(value, index++);
  if (typeof res.then === "function") {
    return async function* () {
      yield await res;
      for await (const val of peekable2) {
        yield func(val, index++);
      }
    }();
  }
  const fn = func;
  return function* () {
    yield res;
    for (const val of peekable2) {
      yield fn(val, index++);
    }
  }();
}
var src_default2 = map;

// node_modules/kubo-rpc-client/dist/src/lib/files/utils.js
function isBytes(obj) {
  return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer;
}
function isBlob(obj) {
  return obj.constructor != null && (obj.constructor.name === "Blob" || obj.constructor.name === "File") && typeof obj.stream === "function";
}
function isFileObject(obj) {
  return typeof obj === "object" && (obj.path != null || obj.content != null);
}
function isReadableStream(value) {
  return typeof value?.getReader === "function";
}
function parseMode(mode) {
  if (mode == null) {
    return void 0;
  }
  if (typeof mode === "string") {
    mode = parseInt(mode, 8);
  }
  return mode & 4095;
}
function isMtime(obj) {
  return Object.prototype.hasOwnProperty.call(obj, "secs");
}
function isTimeSpec(obj) {
  return Object.prototype.hasOwnProperty.call(obj, "Seconds");
}
function isHrtime(obj) {
  return Array.isArray(obj);
}
function parseMtime(mtime) {
  if (mtime == null) {
    return void 0;
  }
  if (isMtime(mtime)) {
    mtime = {
      secs: mtime.secs,
      nsecs: mtime.nsecs
    };
  }
  if (isTimeSpec(mtime)) {
    mtime = {
      secs: BigInt(mtime.Seconds),
      nsecs: mtime.FractionalNanoseconds
    };
  }
  if (isHrtime(mtime)) {
    mtime = {
      secs: BigInt(mtime[0]),
      nsecs: mtime[1]
    };
  }
  if (mtime instanceof Date) {
    const ms2 = mtime.getTime();
    const secs = Math.floor(ms2 / 1e3);
    mtime = {
      secs: BigInt(secs),
      nsecs: (ms2 - secs * 1e3) * 1e3
    };
  }
  if (typeof mtime === "bigint") {
    const secs = mtime / BigInt(1e9);
    const nsecs = mtime - secs * BigInt(1e9);
    mtime = {
      secs,
      nsecs: Number(nsecs)
    };
  }
  if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
    return void 0;
  }
  if (mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw new CodeError("mtime-nsecs must be within the range [0,999999999]", "ERR_INVALID_MTIME_NSECS");
  }
  return mtime;
}

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-candidate-multiple.js
async function* normaliseCandidateMultiple(input, normaliseContent2) {
  if (typeof input === "string" || input instanceof String || isBytes(input) || isBlob(input) || input._readableState != null) {
    throw (0, import_err_code.default)(new Error("Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"), "ERR_UNEXPECTED_INPUT");
  }
  if (isReadableStream(input)) {
    input = browserReadableStreamToIt(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable2 = src_default(input);
    const { value, done } = await peekable2.peek();
    if (done === true) {
      yield* [];
      return;
    }
    peekable2.push(value);
    if (Number.isInteger(value)) {
      throw (0, import_err_code.default)(new Error("Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"), "ERR_UNEXPECTED_INPUT");
    }
    if (value._readableState != null) {
      yield* src_default2(peekable2, async (value2) => toFileObject({ content: value2 }, normaliseContent2));
      return;
    }
    if (isBytes(value)) {
      yield toFileObject({ content: peekable2 }, normaliseContent2);
      return;
    }
    if (isFileObject(value) || value[Symbol.iterator] || value[Symbol.asyncIterator] || isReadableStream(value) || isBlob(value)) {
      yield* src_default2(peekable2, async (value2) => toFileObject(value2, normaliseContent2));
      return;
    }
  }
  if (isFileObject(input)) {
    throw (0, import_err_code.default)(new Error("Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"), "ERR_UNEXPECTED_INPUT");
  }
  throw (0, import_err_code.default)(new Error("Unexpected input: " + typeof input), "ERR_UNEXPECTED_INPUT");
}
async function toFileObject(input, normaliseContent2) {
  const { path, mode, mtime, content } = input;
  const file = {
    path: path ?? "",
    mode: parseMode(mode),
    mtime: parseMtime(mtime)
  };
  if (content != null) {
    file.content = await normaliseContent2(content);
  } else if (path == null) {
    file.content = await normaliseContent2(input);
  }
  return file;
}

// node_modules/kubo-rpc-client/node_modules/it-all/dist/src/index.js
function isAsyncIterable2(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function all(source2) {
  if (isAsyncIterable2(source2)) {
    return (async () => {
      const arr2 = [];
      for await (const entry of source2) {
        arr2.push(entry);
      }
      return arr2;
    })();
  }
  const arr = [];
  for (const entry of source2) {
    arr.push(entry);
  }
  return arr;
}
var src_default3 = all;

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-content.browser.js
async function normaliseContent(input) {
  if (isBytes(input)) {
    return new Blob([input]);
  }
  if (typeof input === "string" || input instanceof String) {
    return new Blob([input.toString()]);
  }
  if (isBlob(input)) {
    return input;
  }
  if (isReadableStream(input)) {
    input = browserReadableStreamToIt(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable2 = src_default(input);
    const { value, done } = await peekable2.peek();
    if (done === true) {
      return itToBlob(peekable2);
    }
    peekable2.push(value);
    if (Number.isInteger(value)) {
      return new Blob([Uint8Array.from(await src_default3(peekable2))]);
    }
    if (isBytes(value) || typeof value === "string" || value instanceof String) {
      return itToBlob(peekable2);
    }
  }
  throw new CodeError(`Unexpected input: ${input}`, "ERR_UNEXPECTED_INPUT");
}
async function itToBlob(stream) {
  const parts = [];
  for await (const chunk of stream) {
    parts.push(chunk);
  }
  return new Blob(parts);
}

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-input-multiple.browser.js
function normaliseInput(input) {
  return normaliseCandidateMultiple(input, normaliseContent, true);
}

// node_modules/kubo-rpc-client/dist/src/lib/mode-to-string.js
function modeToString(mode) {
  if (mode == null) {
    return void 0;
  }
  if (typeof mode === "string") {
    return mode;
  }
  return mode.toString(8).padStart(4, "0");
}

// node_modules/kubo-rpc-client/dist/src/lib/multipart-request.browser.js
async function multipartRequest(source2, abortController, headers = {}, boundary) {
  const parts = [];
  const formData = new FormData();
  let index = 0;
  let total = 0;
  for await (const { content, path, mode, mtime } of normaliseInput(source2)) {
    let fileSuffix = "";
    const type = content != null ? "file" : "dir";
    if (index > 0) {
      fileSuffix = `-${index}`;
    }
    let fieldName = type + fileSuffix;
    const qs = [];
    if (mode !== null && mode !== void 0) {
      qs.push(`mode=${modeToString(mode)}`);
    }
    if (mtime != null) {
      const { secs, nsecs } = mtime;
      qs.push(`mtime=${secs}`);
      if (nsecs != null) {
        qs.push(`mtime-nsecs=${nsecs}`);
      }
    }
    if (qs.length > 0) {
      fieldName = `${fieldName}?${qs.join("&")}`;
    }
    if (content != null) {
      formData.set(fieldName, content, path != null ? encodeURIComponent(path) : void 0);
      const end = total + content.size;
      parts.push({ name: path, start: total, end });
      total = end;
    } else if (path != null) {
      formData.set(fieldName, new File([""], encodeURIComponent(path), { type: "application/x-directory" }));
    } else {
      throw new Error("path or content or both must be set");
    }
    index++;
  }
  return {
    total,
    parts,
    headers,
    body: formData
  };
}

// node_modules/kubo-rpc-client/dist/src/lib/multipart-request.js
async function multipartRequest2(source2, abortController, headers = {}, boundary = `-----------------------------${nanoid()}`) {
  let req = multipartRequest;
  if (isElectronRenderer) {
    req = multipartRequest;
  }
  return req(source2, abortController, headers, boundary);
}

// node_modules/kubo-rpc-client/dist/src/lib/object-to-camel.js
function objectToCamel(obj) {
  if (obj == null) {
    return obj;
  }
  const caps = /^[A-Z]+$/;
  const output = {};
  return Object.keys(obj).reduce((camelObj, k) => {
    if (caps.test(k)) {
      camelObj[k.toLowerCase()] = obj[k];
    } else if (caps.test(k[0])) {
      camelObj[k[0].toLowerCase() + k.slice(1)] = obj[k];
    } else {
      camelObj[k] = obj[k];
    }
    return camelObj;
  }, output);
}

// node_modules/kubo-rpc-client/dist/src/lib/to-url-search-params.js
function toUrlSearchParams({ arg, searchParams, hashAlg, mtime, mode, ...options } = {}) {
  if (searchParams != null) {
    options = {
      ...options,
      ...searchParams
    };
  }
  if (hashAlg != null) {
    options.hash = hashAlg;
  }
  if (mtime != null) {
    mtime = parseMtime(mtime);
    options.mtime = mtime.secs;
    options.mtimeNsecs = mtime.nsecs;
  }
  if (mode != null) {
    options.mode = modeToString(mode);
  }
  if (!isNaN(options.timeout)) {
    options.timeout = `${options.timeout}ms`;
  }
  if (arg === void 0 || arg === null) {
    arg = [];
  } else if (!Array.isArray(arg)) {
    arg = [arg];
  }
  const urlSearchParams = new URLSearchParams(options);
  arg.forEach((arg2) => {
    urlSearchParams.append("arg", arg2);
  });
  return urlSearchParams;
}

// node_modules/kubo-rpc-client/dist/src/add-all.js
function createAddAll(client) {
  return async function* addAll(source2, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const { headers, body, total, parts } = await multipartRequest2(source2, controller, options.headers);
      const [progressFn, onUploadProgress] = typeof options.progress === "function" ? createProgressHandler(total, options.progress, parts) : [void 0, void 0];
      const res = await client.post("add", {
        searchParams: toUrlSearchParams({
          "stream-channels": true,
          ...options,
          progress: Boolean(progressFn)
        }),
        onUploadProgress,
        signal,
        headers,
        body
      });
      for await (let file of res.ndjson()) {
        file = objectToCamel(file);
        if (file.hash !== void 0) {
          yield toCoreInterface(file);
        } else if (progressFn != null) {
          progressFn(file.bytes ?? 0, file.name);
        }
      }
    } finally {
      signal.clear();
    }
  };
}
var createProgressHandler = (total, progress, parts) => parts != null ? [void 0, createOnUploadProgress(total, parts, progress)] : [progress, void 0];
var createOnUploadProgress = (size, parts, progress) => {
  let index = 0;
  const count = parts.length;
  return ({ loaded, total }) => {
    const position = Math.floor(loaded / total * size);
    while (index < count) {
      const { start, end, name: name10 } = parts[index];
      if (position < end) {
        progress(position - start, name10);
        break;
      } else {
        progress(end - start, name10);
        index += 1;
      }
    }
  };
};
function toCoreInterface({ name: name10, hash, size, mode, mtime, mtimeNsecs }) {
  const output = {
    path: name10,
    cid: CID2.parse(hash),
    size: parseInt(size)
  };
  if (mode != null) {
    output.mode = parseInt(mode, 8);
  }
  if (mtime != null) {
    output.mtime = {
      secs: mtime,
      nsecs: mtimeNsecs ?? 0
    };
  }
  return output;
}

// node_modules/kubo-rpc-client/node_modules/it-last/dist/src/index.js
function isAsyncIterable3(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function last(source2) {
  if (isAsyncIterable3(source2)) {
    return (async () => {
      let res2;
      for await (const entry of source2) {
        res2 = entry;
      }
      return res2;
    })();
  }
  let res;
  for (const entry of source2) {
    res = entry;
  }
  return res;
}
var src_default4 = last;

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-candidate-single.js
var import_err_code2 = __toESM(require_err_code(), 1);
async function* normaliseCandidateSingle(input, normaliseContent2) {
  if (input === null || input === void 0) {
    throw (0, import_err_code2.default)(new Error(`Unexpected input: ${input}`), "ERR_UNEXPECTED_INPUT");
  }
  if (typeof input === "string" || input instanceof String) {
    yield toFileObject2(input.toString(), normaliseContent2);
    return;
  }
  if (isBytes(input) || isBlob(input)) {
    yield toFileObject2(input, normaliseContent2);
    return;
  }
  if (isReadableStream(input)) {
    input = browserReadableStreamToIt(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable2 = src_default(input);
    const { value, done } = await peekable2.peek();
    if (done === true) {
      yield { content: [] };
      return;
    }
    peekable2.push(value);
    if (Number.isInteger(value) || isBytes(value) || typeof value === "string" || value instanceof String) {
      yield toFileObject2(peekable2, normaliseContent2);
      return;
    }
    throw (0, import_err_code2.default)(new Error("Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead"), "ERR_UNEXPECTED_INPUT");
  }
  if (isFileObject(input)) {
    yield toFileObject2(input, normaliseContent2);
    return;
  }
  throw (0, import_err_code2.default)(new Error('Unexpected input: cannot convert "' + typeof input + '" into ImportCandidate'), "ERR_UNEXPECTED_INPUT");
}
async function toFileObject2(input, normaliseContent2) {
  const { path, mode, mtime, content } = input;
  const file = {
    path: path ?? "",
    mode: parseMode(mode),
    mtime: parseMtime(mtime)
  };
  if (content != null) {
    file.content = await normaliseContent2(content);
  } else if (path == null) {
    file.content = await normaliseContent2(input);
  }
  return file;
}

// node_modules/kubo-rpc-client/dist/src/lib/files/normalise-input-single.browser.js
function normaliseInput2(input) {
  return normaliseCandidateSingle(input, normaliseContent);
}

// node_modules/kubo-rpc-client/dist/src/add.js
function createAdd(client) {
  const all2 = createAddAll(client);
  return async function add(input, options = {}) {
    const source2 = normaliseInput2(input);
    const addAllPromise = all2(source2, options);
    const result = await src_default4(addAllPromise);
    if (result == null) {
      throw new Error("Invalid body");
    }
    return result;
  };
}

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports3 = {};
__export(base58_exports3, {
  base58btc: () => base58btc4,
  base58flickr: () => base58flickr4
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bytes.js
var empty4 = new Uint8Array(0);
function equals8(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce4(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString6(str) {
  return new TextEncoder().encode(str);
}
function toString7(b) {
  return new TextDecoder().decode(b);
}

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/vendor/base-x.js
function base5(ALPHABET, name10) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode29(source2) {
    if (source2 instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source2)) {
      source2 = new Uint8Array(source2.buffer, source2.byteOffset, source2.byteLength);
    } else if (Array.isArray(source2)) {
      source2 = Uint8Array.from(source2);
    }
    if (!(source2 instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source2.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length5 = 0;
    var pbegin = 0;
    var pend = source2.length;
    while (pbegin !== pend && source2[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source2[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length5) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      pbegin++;
    }
    var it2 = size - length5;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source2) {
    if (typeof source2 !== "string") {
      throw new TypeError("Expected String");
    }
    if (source2.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source2[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length5 = 0;
    while (source2[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source2.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source2[psz]) {
      var carry = BASE_MAP[source2.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length5) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      psz++;
    }
    if (source2[psz] === " ") {
      return;
    }
    var it4 = size - length5;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode34(string4) {
    var buffer3 = decodeUnsafe(string4);
    if (buffer3) {
      return buffer3;
    }
    throw new Error(`Non-${name10} character`);
  }
  return {
    encode: encode29,
    decodeUnsafe,
    decode: decode34
  };
}
var src4 = base5;
var _brrp__multiformats_scope_baseX4 = src4;
var base_x_default4 = _brrp__multiformats_scope_baseX4;

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base.js
var Encoder4 = class {
  name;
  prefix;
  baseEncode;
  constructor(name10, prefix, baseEncode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder4 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name10, prefix, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or4(this, decoder);
  }
};
var ComposedDecoder4 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or4(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or4(left, right) {
  return new ComposedDecoder4({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec4 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name10, prefix, baseEncode, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder4(name10, prefix, baseEncode);
    this.decoder = new Decoder4(name10, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from6({ name: name10, prefix, encode: encode29, decode: decode34 }) {
  return new Codec4(name10, prefix, encode29, decode34);
}
function baseX4({ name: name10, prefix, alphabet: alphabet4 }) {
  const { encode: encode29, decode: decode34 } = base_x_default4(alphabet4, name10);
  return from6({
    prefix,
    name: name10,
    encode: encode29,
    decode: (text) => coerce4(decode34(text))
  });
}
function decode28(string4, alphabet4, bitsPerChar, name10) {
  const codes2 = {};
  for (let i = 0; i < alphabet4.length; ++i) {
    codes2[alphabet4[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer3 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name10} character`);
    }
    buffer3 = buffer3 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer3 >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer3 << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode24(data, alphabet4, bitsPerChar) {
  const pad = alphabet4[alphabet4.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer3 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer3 = buffer3 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet4[mask & buffer3 >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet4[mask & buffer3 << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46484({ name: name10, prefix, bitsPerChar, alphabet: alphabet4 }) {
  return from6({
    prefix,
    name: name10,
    encode(input) {
      return encode24(input, alphabet4, bitsPerChar);
    },
    decode(input) {
      return decode28(input, alphabet4, bitsPerChar, name10);
    }
  });
}

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base58.js
var base58btc4 = baseX4({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr4 = baseX4({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports3 = {};
__export(base10_exports3, {
  base10: () => base103
});
var base103 = baseX4({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports3 = {};
__export(base16_exports3, {
  base16: () => base163,
  base16upper: () => base16upper3
});
var base163 = rfc46484({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper3 = rfc46484({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports3 = {};
__export(base2_exports3, {
  base2: () => base23
});
var base23 = rfc46484({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports3 = {};
__export(base256emoji_exports3, {
  base256emoji: () => base256emoji3
});
var alphabet3 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars3 = alphabet3.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes3 = alphabet3.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode25(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars3[c];
    return p;
  }, "");
}
function decode29(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes3[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji3 = from6({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode25,
  decode: decode29
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports3 = {};
__export(base32_exports3, {
  base32: () => base324,
  base32hex: () => base32hex4,
  base32hexpad: () => base32hexpad4,
  base32hexpadupper: () => base32hexpadupper4,
  base32hexupper: () => base32hexupper4,
  base32pad: () => base32pad4,
  base32padupper: () => base32padupper4,
  base32upper: () => base32upper4,
  base32z: () => base32z4
});
var base324 = rfc46484({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper4 = rfc46484({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad4 = rfc46484({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper4 = rfc46484({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex4 = rfc46484({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper4 = rfc46484({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad4 = rfc46484({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper4 = rfc46484({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z4 = rfc46484({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports3 = {};
__export(base36_exports3, {
  base36: () => base363,
  base36upper: () => base36upper3
});
var base363 = baseX4({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper3 = baseX4({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports3 = {};
__export(base64_exports3, {
  base64: () => base644,
  base64pad: () => base64pad4,
  base64url: () => base64url4,
  base64urlpad: () => base64urlpad4
});
var base644 = rfc46484({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad4 = rfc46484({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url4 = rfc46484({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad4 = rfc46484({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports3 = {};
__export(base8_exports3, {
  base8: () => base83
});
var base83 = rfc46484({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports5 = {};
__export(identity_exports5, {
  identity: () => identity5
});
var identity5 = from6({
  prefix: "\0",
  name: "identity",
  encode: (buf3) => toString7(buf3),
  decode: (str) => fromString6(str)
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder7 = new TextEncoder();
var textDecoder6 = new TextDecoder();

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports6 = {};
__export(identity_exports6, {
  identity: () => identity6
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/vendor/varint.js
var encode_14 = encode26;
var MSB5 = 128;
var REST5 = 127;
var MSBALL4 = ~REST5;
var INT4 = Math.pow(2, 31);
function encode26(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT4) {
    out[offset++] = num & 255 | MSB5;
    num /= 128;
  }
  while (num & MSBALL4) {
    out[offset++] = num & 255 | MSB5;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode26.bytes = offset - oldOffset + 1;
  return out;
}
var decode30 = read4;
var MSB$14 = 128;
var REST$14 = 127;
function read4(buf3, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf3.length;
  do {
    if (counter >= l) {
      read4.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf3[counter++];
    res += shift < 28 ? (b & REST$14) << shift : (b & REST$14) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$14);
  read4.bytes = counter - offset;
  return res;
}
var N15 = Math.pow(2, 7);
var N25 = Math.pow(2, 14);
var N35 = Math.pow(2, 21);
var N45 = Math.pow(2, 28);
var N55 = Math.pow(2, 35);
var N65 = Math.pow(2, 42);
var N75 = Math.pow(2, 49);
var N84 = Math.pow(2, 56);
var N94 = Math.pow(2, 63);
var length4 = function(value) {
  return value < N15 ? 1 : value < N25 ? 2 : value < N35 ? 3 : value < N45 ? 4 : value < N55 ? 5 : value < N65 ? 6 : value < N75 ? 7 : value < N84 ? 8 : value < N94 ? 9 : 10;
};
var varint4 = {
  encode: encode_14,
  decode: decode30,
  encodingLength: length4
};
var _brrp_varint4 = varint4;
var varint_default4 = _brrp_varint4;

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/varint.js
function decode31(data, offset = 0) {
  const code10 = varint_default4.decode(data, offset);
  return [code10, varint_default4.decode.bytes];
}
function encodeTo4(int, target, offset = 0) {
  varint_default4.encode(int, target, offset);
  return target;
}
function encodingLength5(int) {
  return varint_default4.encodingLength(int);
}

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/digest.js
function create4(code10, digest4) {
  const size = digest4.byteLength;
  const sizeOffset = encodingLength5(code10);
  const digestOffset = sizeOffset + encodingLength5(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo4(code10, bytes, 0);
  encodeTo4(size, bytes, sizeOffset);
  bytes.set(digest4, digestOffset);
  return new Digest4(code10, size, digest4, bytes);
}
function decode32(multihash) {
  const bytes = coerce4(multihash);
  const [code10, sizeOffset] = decode31(bytes);
  const [size, digestOffset] = decode31(bytes.subarray(sizeOffset));
  const digest4 = bytes.subarray(sizeOffset + digestOffset);
  if (digest4.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest4(code10, size, digest4, bytes);
}
function equals9(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals8(a.bytes, data.bytes);
  }
}
var Digest4 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code10, size, digest4, bytes) {
    this.code = code10;
    this.size = size;
    this.digest = digest4;
    this.bytes = bytes;
  }
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/identity.js
var code9 = 0;
var name9 = "identity";
var encode27 = coerce4;
function digest3(input) {
  return create4(code9, encode27(input));
}
var identity6 = { code: code9, name: name9, encode: encode27, digest: digest3 };

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports3 = {};
__export(sha2_browser_exports3, {
  sha256: () => sha2563,
  sha512: () => sha5123
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/hasher.js
function from7({ name: name10, code: code10, encode: encode29 }) {
  return new Hasher3(name10, code10, encode29);
}
var Hasher3 = class {
  name;
  code;
  encode;
  constructor(name10, code10, encode29) {
    this.name = name10;
    this.code = code10;
    this.encode = encode29;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create4(this.code, result) : result.then((digest4) => create4(this.code, digest4));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha3(name10) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name10, data));
}
var sha2563 = from7({
  name: "sha2-256",
  code: 18,
  encode: sha3("SHA-256")
});
var sha5123 = from7({
  name: "sha2-512",
  code: 19,
  encode: sha3("SHA-512")
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/cid.js
function format5(link, base7) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV04(bytes, baseCache4(link), base7 ?? base58btc4.encoder);
    default:
      return toStringV14(bytes, baseCache4(link), base7 ?? base324.encoder);
  }
}
var cache4 = /* @__PURE__ */ new WeakMap();
function baseCache4(cid) {
  const baseCache5 = cache4.get(cid);
  if (baseCache5 == null) {
    const baseCache6 = /* @__PURE__ */ new Map();
    cache4.set(cid, baseCache6);
    return baseCache6;
  }
  return baseCache5;
}
var CID4 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code10, multihash, bytes) {
    this.code = code10;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code10, multihash } = this;
        if (code10 !== DAG_PB_CODE4) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE4) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code10, digest: digest4 } = this.multihash;
        const multihash = create4(code10, digest4);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals9(self2.multihash, unknown.multihash);
  }
  toString(base7) {
    return format5(this, base7);
  }
  toJSON() {
    return { "/": format5(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code10, multihash, bytes } = value;
      return new _CID(version, code10, multihash, bytes ?? encodeCID4(version, code10, multihash.bytes));
    } else if (value[cidSymbol4] === true) {
      const { version, multihash, code: code10 } = value;
      const digest4 = decode32(multihash);
      return _CID.create(version, code10, digest4);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code10, digest4) {
    if (typeof code10 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest4.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code10 !== DAG_PB_CODE4) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE4}) block encoding`);
        } else {
          return new _CID(version, code10, digest4, digest4.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID4(version, code10, digest4.bytes);
        return new _CID(version, code10, digest4, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest4) {
    return _CID.create(0, DAG_PB_CODE4, digest4);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code10, digest4) {
    return _CID.create(1, code10, digest4);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce4(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest4 = new Digest4(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest4) : _CID.createV1(specs.codec, digest4);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length5] = decode31(initialBytes.subarray(offset));
      offset += length5;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE4;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source2, base7) {
    const [prefix, bytes] = parseCIDtoBytes4(source2, base7);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source2[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache4(cid).set(prefix, source2);
    return cid;
  }
};
function parseCIDtoBytes4(source2, base7) {
  switch (source2[0]) {
    // CIDv0 is parsed differently
    case "Q": {
      const decoder = base7 ?? base58btc4;
      return [
        base58btc4.prefix,
        decoder.decode(`${base58btc4.prefix}${source2}`)
      ];
    }
    case base58btc4.prefix: {
      const decoder = base7 ?? base58btc4;
      return [base58btc4.prefix, decoder.decode(source2)];
    }
    case base324.prefix: {
      const decoder = base7 ?? base324;
      return [base324.prefix, decoder.decode(source2)];
    }
    default: {
      if (base7 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source2[0], base7.decode(source2)];
    }
  }
}
function toStringV04(bytes, cache5, base7) {
  const { prefix } = base7;
  if (prefix !== base58btc4.prefix) {
    throw Error(`Cannot string encode V0 in ${base7.name} encoding`);
  }
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes).slice(1);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV14(bytes, cache5, base7) {
  const { prefix } = base7;
  const cid = cache5.get(prefix);
  if (cid == null) {
    const cid2 = base7.encode(bytes);
    cache5.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE4 = 112;
var SHA_256_CODE4 = 18;
function encodeCID4(version, code10, multihash) {
  const codeOffset = encodingLength5(version);
  const hashOffset = codeOffset + encodingLength5(code10);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo4(version, bytes, 0);
  encodeTo4(code10, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol4 = Symbol.for("@ipld/js-cid/CID");

// node_modules/@libp2p/peer-id/node_modules/multiformats/dist/src/basics.js
var bases3 = { ...identity_exports5, ...base2_exports3, ...base8_exports3, ...base10_exports3, ...base16_exports3, ...base32_exports3, ...base36_exports3, ...base58_exports3, ...base64_exports3, ...base256emoji_exports3 };
var hashes3 = { ...sha2_browser_exports3, ...identity_exports6 };

// node_modules/@libp2p/peer-id/node_modules/uint8arrays/dist/src/equals.js
function equals10(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@libp2p/peer-id/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe3(size = 0) {
  return new Uint8Array(size);
}

// node_modules/@libp2p/peer-id/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec2(name10, prefix, encode29, decode34) {
  return {
    name: name10,
    prefix,
    encoder: {
      name: name10,
      prefix,
      encode: encode29
    },
    decoder: {
      decode: decode34
    }
  };
}
var string2 = createCodec2("utf8", "u", (buf3) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf3);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii2 = createCodec2("ascii", "a", (buf3) => {
  let string4 = "a";
  for (let i = 0; i < buf3.length; i++) {
    string4 += String.fromCharCode(buf3[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf3 = allocUnsafe3(str.length);
  for (let i = 0; i < str.length; i++) {
    buf3[i] = str.charCodeAt(i);
  }
  return buf3;
});
var BASES2 = {
  utf8: string2,
  "utf-8": string2,
  hex: bases3.base16,
  latin1: ascii2,
  ascii: ascii2,
  binary: ascii2,
  ...bases3
};
var bases_default2 = BASES2;

// node_modules/@libp2p/peer-id/node_modules/uint8arrays/dist/src/from-string.js
function fromString7(string4, encoding = "utf8") {
  const base7 = bases_default2[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.decoder.decode(`${base7.prefix}${string4}`);
}

// node_modules/@libp2p/peer-id/node_modules/uint8arrays/dist/src/to-string.js
function toString8(array, encoding = "utf8") {
  const base7 = bases_default2[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.encoder.encode(array).substring(1);
}

// node_modules/@libp2p/peer-id/dist/src/index.js
var inspect2 = Symbol.for("nodejs.util.inspect.custom");
var baseDecoder = Object.values(bases3).map((codec) => codec.decoder).reduce((acc, curr) => acc.or(curr), bases3.identity.decoder);
var LIBP2P_KEY_CODE = 114;
var MARSHALLED_ED225519_PUBLIC_KEY_LENGTH = 36;
var MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH = 37;
var PeerIdImpl = class {
  type;
  multihash;
  privateKey;
  publicKey;
  string;
  constructor(init) {
    this.type = init.type;
    this.multihash = init.multihash;
    this.privateKey = init.privateKey;
    Object.defineProperty(this, "string", {
      enumerable: false,
      writable: true
    });
  }
  get [Symbol.toStringTag]() {
    return `PeerId(${this.toString()})`;
  }
  [peerIdSymbol] = true;
  toString() {
    if (this.string == null) {
      this.string = base58btc4.encode(this.multihash.bytes).slice(1);
    }
    return this.string;
  }
  // return self-describing String representation
  // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
  toCID() {
    return CID4.createV1(LIBP2P_KEY_CODE, this.multihash);
  }
  toBytes() {
    return this.multihash.bytes;
  }
  /**
   * Returns Multiaddr as a JSON string
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Checks the equality of `this` peer against a given PeerId
   */
  equals(id) {
    if (id == null) {
      return false;
    }
    if (id instanceof Uint8Array) {
      return equals10(this.multihash.bytes, id);
    } else if (typeof id === "string") {
      return peerIdFromString(id).equals(this);
    } else if (id?.multihash?.bytes != null) {
      return equals10(this.multihash.bytes, id.multihash.bytes);
    } else {
      throw new Error("not valid Id");
    }
  }
  /**
   * Returns PeerId as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```TypeScript
   * import { peerIdFromString } from '@libp2p/peer-id'
   *
   * console.info(peerIdFromString('QmFoo'))
   * // 'PeerId(QmFoo)'
   * ```
   */
  [inspect2]() {
    return `PeerId(${this.toString()})`;
  }
};
var RSAPeerIdImpl = class extends PeerIdImpl {
  type = "RSA";
  publicKey;
  constructor(init) {
    super({ ...init, type: "RSA" });
    this.publicKey = init.publicKey;
  }
};
var Ed25519PeerIdImpl = class extends PeerIdImpl {
  type = "Ed25519";
  publicKey;
  constructor(init) {
    super({ ...init, type: "Ed25519" });
    this.publicKey = init.multihash.digest;
  }
};
var Secp256k1PeerIdImpl = class extends PeerIdImpl {
  type = "secp256k1";
  publicKey;
  constructor(init) {
    super({ ...init, type: "secp256k1" });
    this.publicKey = init.multihash.digest;
  }
};
var TRANSPORT_IPFS_GATEWAY_HTTP_CODE = 2336;
var URLPeerIdImpl = class {
  type = "url";
  multihash;
  privateKey;
  publicKey;
  url;
  constructor(url) {
    this.url = url.toString();
    this.multihash = identity6.digest(fromString7(this.url));
  }
  [inspect2]() {
    return `PeerId(${this.url})`;
  }
  [peerIdSymbol] = true;
  toString() {
    return this.toCID().toString();
  }
  toCID() {
    return CID4.createV1(TRANSPORT_IPFS_GATEWAY_HTTP_CODE, this.multihash);
  }
  toBytes() {
    return this.toCID().bytes;
  }
  equals(other) {
    if (other == null) {
      return false;
    }
    if (other instanceof Uint8Array) {
      other = toString8(other);
    }
    return other.toString() === this.toString();
  }
};
function peerIdFromString(str, decoder) {
  decoder = decoder ?? baseDecoder;
  if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
    const multihash = decode32(base58btc4.decode(`z${str}`));
    if (str.startsWith("12D")) {
      return new Ed25519PeerIdImpl({ multihash });
    } else if (str.startsWith("16U")) {
      return new Secp256k1PeerIdImpl({ multihash });
    } else {
      return new RSAPeerIdImpl({ multihash });
    }
  }
  return peerIdFromBytes(baseDecoder.decode(str));
}
function peerIdFromBytes(buf3) {
  try {
    const multihash = decode32(buf3);
    if (multihash.code === identity6.code) {
      if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
        return new Ed25519PeerIdImpl({ multihash });
      } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
        return new Secp256k1PeerIdImpl({ multihash });
      }
    }
    if (multihash.code === sha2563.code) {
      return new RSAPeerIdImpl({ multihash });
    }
  } catch {
    return peerIdFromCID(CID4.decode(buf3));
  }
  throw new Error("Supplied PeerID CID is invalid");
}
function peerIdFromCID(cid) {
  if (cid?.multihash == null || cid.version == null || cid.version === 1 && cid.code !== LIBP2P_KEY_CODE && cid.code !== TRANSPORT_IPFS_GATEWAY_HTTP_CODE) {
    throw new Error("Supplied PeerID CID is invalid");
  }
  if (cid.code === TRANSPORT_IPFS_GATEWAY_HTTP_CODE) {
    const url = toString8(cid.multihash.digest);
    return new URLPeerIdImpl(new URL(url));
  }
  const multihash = cid.multihash;
  if (multihash.code === sha2563.code) {
    return new RSAPeerIdImpl({ multihash: cid.multihash });
  } else if (multihash.code === identity6.code) {
    if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
      return new Ed25519PeerIdImpl({ multihash: cid.multihash });
    } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
      return new Secp256k1PeerIdImpl({ multihash: cid.multihash });
    }
  }
  throw new Error("Supplied PeerID CID is invalid");
}

// node_modules/kubo-rpc-client/dist/src/bitswap/stat.js
function createStat(client) {
  return async function stat(options = {}) {
    const res = await client.post("bitswap/stat", {
      searchParams: toUrlSearchParams(options),
      signal: options.signal,
      headers: options.headers
    });
    return toCoreInterface2(await res.json());
  };
}
function toCoreInterface2(res) {
  return {
    provideBufLen: res.ProvideBufLen,
    wantlist: (res.Wantlist ?? []).map((k) => CID2.parse(k["/"])),
    peers: (res.Peers ?? []).map((str) => peerIdFromString(str)),
    blocksReceived: BigInt(res.BlocksReceived),
    dataReceived: BigInt(res.DataReceived),
    blocksSent: BigInt(res.BlocksSent),
    dataSent: BigInt(res.DataSent),
    dupBlksReceived: BigInt(res.DupBlksReceived),
    dupDataReceived: BigInt(res.DupDataReceived)
  };
}

// node_modules/kubo-rpc-client/dist/src/bitswap/wantlist-for-peer.js
function createWantlistForPeer(client) {
  return async function wantlistForPeer(peerId, options = {}) {
    const res = await (await client.post("bitswap/wantlist", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        peer: peerId.toString()
      }),
      headers: options.headers
    })).json();
    return (res.Keys ?? []).map((k) => CID2.parse(k["/"]));
  };
}

// node_modules/kubo-rpc-client/dist/src/bitswap/wantlist.js
function createWantlist(client) {
  return async function wantlist(options = {}) {
    const res = await (await client.post("bitswap/wantlist", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json();
    return (res.Keys ?? []).map((k) => CID2.parse(k["/"]));
  };
}

// node_modules/kubo-rpc-client/dist/src/bitswap/index.js
function createBitswap(client) {
  return {
    /**
     * TODO: https://github.com/ipfs/js-kubo-rpc-client/issues/99
     */
    wantlist: createWantlist(client),
    wantlistForPeer: createWantlistForPeer(client),
    stat: createStat(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/block/get.js
function createGet(client) {
  return async function get(cid, options = {}) {
    const res = await client.post("block/get", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.toString(),
        ...options
      }),
      headers: options.headers
    });
    return new Uint8Array(await res.arrayBuffer());
  };
}

// node_modules/kubo-rpc-client/dist/src/block/put.js
function createPut(client) {
  return async function put(data, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    let res;
    try {
      const response = await client.post("block/put", {
        signal,
        searchParams: toUrlSearchParams(options),
        ...await multipartRequest2([data], controller, options.headers)
      });
      res = await response.json();
    } catch (err) {
      if (options.format === "dag-pb") {
        return await put(data, { ...options, format: "protobuf" });
      } else if (options.format === "dag-cbor") {
        return await put(data, { ...options, format: "cbor" });
      }
      throw err;
    } finally {
      signal.clear();
    }
    return CID2.parse(res.Key);
  };
}

// node_modules/kubo-rpc-client/dist/src/block/rm.js
function createRm(client) {
  return async function* rm(cid, options = {}) {
    if (!Array.isArray(cid)) {
      cid = [cid];
    }
    const res = await client.post("block/rm", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.map((cid2) => cid2.toString()),
        "stream-channels": true,
        ...options
      }),
      headers: options.headers
    });
    for await (const removed of res.ndjson()) {
      yield toCoreInterface3(removed);
    }
  };
}
function toCoreInterface3(removed) {
  const out = {
    cid: CID2.parse(removed.Hash)
  };
  if (removed.Error != null) {
    out.error = new Error(removed.Error);
  }
  return out;
}

// node_modules/kubo-rpc-client/dist/src/block/stat.js
function createStat2(client) {
  return async function stat(cid, options = {}) {
    const res = await client.post("block/stat", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.toString(),
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return { cid: CID2.parse(data.Key), size: data.Size };
  };
}

// node_modules/kubo-rpc-client/dist/src/block/index.js
function createBlock(client) {
  return {
    get: createGet(client),
    put: createPut(client),
    rm: createRm(client),
    stat: createStat2(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/bootstrap/add.js
function createAdd2(client) {
  return async function add(addr, options = {}) {
    const res = await client.post("bootstrap/add", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    });
    const { Peers } = await res.json();
    return { Peers: Peers.map((ma) => multiaddr(ma)) };
  };
}

// node_modules/kubo-rpc-client/dist/src/bootstrap/list.js
function createList(client) {
  return async function list(options = {}) {
    const res = await client.post("bootstrap/list", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const { Peers } = await res.json();
    return { Peers: Peers.map((ma) => multiaddr(ma)) };
  };
}

// node_modules/kubo-rpc-client/dist/src/bootstrap/rm.js
function createRm2(client) {
  return async function rm(addr, options = {}) {
    const res = await client.post("bootstrap/rm", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    });
    const { Peers } = await res.json();
    return { Peers: Peers.map((ma) => multiaddr(ma)) };
  };
}

// node_modules/kubo-rpc-client/dist/src/bootstrap/index.js
function createBootstrap(client) {
  return {
    add: createAdd2(client),
    list: createList(client),
    rm: createRm2(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/cat.js
function createCat(client) {
  return async function* cat(path, options = {}) {
    const res = await client.post("cat", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path.toString(),
        ...options
      }),
      headers: options.headers
    });
    yield* res.iterator();
  };
}

// node_modules/kubo-rpc-client/dist/src/commands.js
function createCommands(client) {
  return async function commands(options = {}) {
    const res = await client.post("commands", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return res.json();
  };
}

// node_modules/kubo-rpc-client/dist/src/config/get-all.js
function createGetAll(client) {
  return async function getAll(options = {}) {
    const res = await client.post("config/show", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return data;
  };
}

// node_modules/kubo-rpc-client/dist/src/config/get.js
function createGet2(client) {
  return async function get(key, options = {}) {
    if (key == null) {
      throw new Error("key argument is required");
    }
    const res = await client.post("config", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: key,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return data.Value;
  };
}

// node_modules/kubo-rpc-client/dist/src/config/profiles/apply.js
function createApply(client) {
  return async function apply(profile, options = {}) {
    const res = await client.post("config/profile/apply", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: profile,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return {
      original: data.OldCfg,
      updated: data.NewCfg
    };
  };
}

// node_modules/kubo-rpc-client/dist/src/config/profiles/index.js
function createProfiles(client) {
  return {
    apply: createApply(client)
  };
}

// node_modules/kubo-rpc-client/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe4(size = 0) {
  return new Uint8Array(size);
}

// node_modules/kubo-rpc-client/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec3(name10, prefix, encode29, decode34) {
  return {
    name: name10,
    prefix,
    encoder: {
      name: name10,
      prefix,
      encode: encode29
    },
    decoder: {
      decode: decode34
    }
  };
}
var string3 = createCodec3("utf8", "u", (buf3) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf3);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii3 = createCodec3("ascii", "a", (buf3) => {
  let string4 = "a";
  for (let i = 0; i < buf3.length; i++) {
    string4 += String.fromCharCode(buf3[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf3 = allocUnsafe4(str.length);
  for (let i = 0; i < str.length; i++) {
    buf3[i] = str.charCodeAt(i);
  }
  return buf3;
});
var BASES3 = {
  utf8: string3,
  "utf-8": string3,
  hex: bases2.base16,
  latin1: ascii3,
  ascii: ascii3,
  binary: ascii3,
  ...bases2
};
var bases_default3 = BASES3;

// node_modules/kubo-rpc-client/node_modules/uint8arrays/dist/src/from-string.js
function fromString8(string4, encoding = "utf8") {
  const base7 = bases_default3[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.decoder.decode(`${base7.prefix}${string4}`);
}

// node_modules/kubo-rpc-client/dist/src/config/replace.js
function createReplace(client) {
  return async function replace(config, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const res = await client.post("config/replace", {
        signal,
        searchParams: toUrlSearchParams(options),
        ...await multipartRequest2([fromString8(JSON.stringify(config))], controller, options.headers)
      });
      await res.text();
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/config/set.js
function createSet(client) {
  return async function set(key, value, options = {}) {
    if (typeof key !== "string") {
      throw new Error("Invalid key type");
    }
    const params = {
      ...options,
      ...encodeParam(key, value)
    };
    const res = await client.post("config", {
      signal: options.signal,
      searchParams: toUrlSearchParams(params),
      headers: options.headers
    });
    await res.text();
  };
}
function encodeParam(key, value) {
  switch (typeof value) {
    case "boolean":
      return { arg: [key, value.toString()], bool: true };
    case "string":
      return { arg: [key, value] };
    default:
      return { arg: [key, JSON.stringify(value)], json: true };
  }
}

// node_modules/kubo-rpc-client/dist/src/config/index.js
function createConfig(client) {
  return {
    getAll: createGetAll(client),
    get: createGet2(client),
    set: createSet(client),
    replace: createReplace(client),
    profiles: createProfiles(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/export.js
function createExport(client) {
  return async function* dagExport(root, options = {}) {
    const res = await client.post("dag/export", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: root.toString()
      }),
      headers: options.headers
    });
    yield* res.iterator();
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/get.js
var import_err_code4 = __toESM(require_err_code(), 1);

// node_modules/kubo-rpc-client/node_modules/it-first/dist/src/index.js
function isAsyncIterable4(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function first(source2) {
  if (isAsyncIterable4(source2)) {
    return (async () => {
      for await (const entry of source2) {
        return entry;
      }
      return void 0;
    })();
  }
  for (const entry of source2) {
    return entry;
  }
  return void 0;
}
var src_default5 = first;

// node_modules/kubo-rpc-client/dist/src/lib/resolve.js
var import_err_code3 = __toESM(require_err_code(), 1);
async function* resolve(cid, path, codecs2, getBlock, options) {
  const load2 = async (cid2) => {
    const codec = await codecs2.getCodec(cid2.code);
    const block = await getBlock(cid2, options);
    return codec.decode(block);
  };
  const parts = path.split("/").filter(Boolean);
  let value = await load2(cid);
  let lastCid = cid;
  while (parts.length > 0) {
    const key = parts.shift();
    if (key == null) {
      throw (0, import_err_code3.default)(new Error(`Could not resolve path "${path}"`), "ERR_INVALID_PATH");
    }
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      value = value[key];
      yield {
        value,
        remainderPath: parts.join("/")
      };
    } else {
      throw (0, import_err_code3.default)(new Error(`no link named "${key}" under ${lastCid}`), "ERR_NO_LINK");
    }
    const cid2 = CID2.asCID(value);
    if (cid2 != null) {
      lastCid = cid2;
      value = await load2(value);
    }
  }
  yield {
    value,
    remainderPath: ""
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/get.js
function createGet3(client, codecs2) {
  const getBlock = createGet(client);
  return async function get(cid, options = {}) {
    if (options.path != null) {
      const entry = options.localResolve === true ? await src_default5(resolve(cid, options.path, codecs2, getBlock, options)) : await src_default4(resolve(cid, options.path, codecs2, getBlock, options));
      const result = entry;
      if (result == null) {
        throw (0, import_err_code4.default)(new Error("Not found"), "ERR_NOT_FOUND");
      }
      return result;
    }
    const codec = await codecs2.getCodec(cid.code);
    const block = await getBlock(cid, options);
    const node = codec.decode(block);
    return {
      value: node,
      remainderPath: ""
    };
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/import.js
function createImport(client) {
  return async function* dagImport(source2, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const { headers, body } = await multipartRequest2(source2, controller, options.headers);
      const res = await client.post("dag/import", {
        signal,
        headers,
        body,
        searchParams: toUrlSearchParams({ "pin-roots": options.pinRoots })
      });
      for await (const { Root } of res.ndjson()) {
        if (Root !== void 0) {
          const { Cid: { "/": Cid }, PinErrorMsg } = Root;
          yield {
            root: {
              cid: CID2.parse(Cid),
              pinErrorMsg: PinErrorMsg
            }
          };
        }
      }
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/put.js
function createPut2(client, codecs2) {
  return async function put(dagNode, options = {}) {
    const settings = {
      storeCodec: "dag-cbor",
      hashAlg: "sha2-256",
      ...options
    };
    let serialized;
    if (settings.inputCodec != null) {
      if (!(dagNode instanceof Uint8Array)) {
        throw new Error("Can only inputCodec on raw bytes that can be decoded");
      }
      serialized = dagNode;
    } else {
      const storeCodec = await codecs2.getCodec(settings.storeCodec ?? "dag-cbor");
      serialized = storeCodec.encode(dagNode);
      settings.inputCodec = settings.storeCodec;
    }
    const controller = new AbortController();
    const signal = anySignal([controller.signal, settings.signal]);
    try {
      const res = await client.post("dag/put", {
        timeout: settings.timeout,
        signal,
        searchParams: toUrlSearchParams(settings),
        ...await multipartRequest2([serialized], controller, settings.headers)
      });
      const data = await res.json();
      return CID2.parse(data.Cid["/"]);
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/resolve.js
function createResolve(client) {
  return async function resolve2(ipfsPath, options = {}) {
    const res = await client.post("dag/resolve", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${ipfsPath}${options.path != null ? `/${options.path}`.replace(/\/[/]+/g, "/") : ""}`,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return { cid: CID2.parse(data.Cid["/"]), remainderPath: data.RemPath };
  };
}

// node_modules/kubo-rpc-client/dist/src/dag/index.js
function createDAG(client, codecs2) {
  return {
    export: createExport(client),
    get: createGet3(client, codecs2),
    import: createImport(client),
    put: createPut2(client, codecs2),
    resolve: createResolve(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/dht/response-types.js
var SendingQuery = 0;
var PeerResponse = 1;
var FinalPeer = 2;
var QueryError = 3;
var Provider = 4;
var Value = 5;
var AddingPeer = 6;
var DialingPeer = 7;

// node_modules/kubo-rpc-client/dist/src/dht/map-event.js
function mapEvent(event) {
  if (event.Type === SendingQuery) {
    return {
      name: "SENDING_QUERY",
      type: event.Type
    };
  }
  if (event.Type === PeerResponse) {
    return {
      from: peerIdFromString(event.ID),
      name: "PEER_RESPONSE",
      type: event.Type,
      // TODO: how to infer this from the go-ipfs response
      messageType: 0,
      // TODO: how to infer this from the go-ipfs response
      messageName: "PUT_VALUE",
      closer: (event.Responses ?? []).map(({ ID, Addrs }) => ({ id: peerIdFromString(ID), multiaddrs: Addrs.map((addr) => multiaddr(addr)), protocols: [] })),
      providers: (event.Responses ?? []).map(({ ID, Addrs }) => ({ id: peerIdFromString(ID), multiaddrs: Addrs.map((addr) => multiaddr(addr)), protocols: [] }))
      // TODO: how to infer this from the go-ipfs response
      // record: ???
    };
  }
  if (event.Type === FinalPeer) {
    let peer = {
      id: event.ID ?? peerIdFromString(event.ID),
      /** @type {Multiaddr[]} */
      multiaddrs: [],
      protocols: []
    };
    if (event.Responses?.length > 0) {
      peer = {
        id: peerIdFromString(event.Responses[0].ID),
        multiaddrs: event.Responses[0].Addrs.map((addr) => multiaddr(addr)),
        protocols: []
      };
    }
    return {
      name: "FINAL_PEER",
      type: event.Type,
      peer
    };
  }
  if (event.Type === QueryError) {
    return {
      name: "QUERY_ERROR",
      type: event.Type,
      error: new Error(event.Extra)
    };
  }
  if (event.Type === Provider) {
    return {
      name: "PROVIDER",
      type: event.Type,
      providers: event.Responses.map(({ ID, Addrs }) => ({ id: peerIdFromString(ID), multiaddrs: Addrs.map((addr) => multiaddr(addr)), protocols: [] }))
    };
  }
  if (event.Type === Value) {
    return {
      name: "VALUE",
      type: event.Type,
      value: fromString8(event.Extra, "base64pad")
    };
  }
  if (event.Type === AddingPeer) {
    const peers = event.Responses.map(({ ID }) => peerIdFromString(ID));
    if (peers.length === 0) {
      throw new Error("No peer found");
    }
    return {
      name: "ADDING_PEER",
      type: event.Type,
      peer: peers[0]
    };
  }
  if (event.Type === DialingPeer) {
    return {
      name: "DIALING_PEER",
      type: event.Type,
      peer: peerIdFromString(event.ID)
    };
  }
  throw new Error("Unknown DHT event type");
}

// node_modules/kubo-rpc-client/dist/src/dht/query.js
function createQuery(client) {
  return async function* query(peerId, options = {}) {
    const res = await client.post("dht/query", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: peerId.toString(),
        ...options
      }),
      headers: options.headers
    });
    for await (const event of res.ndjson()) {
      yield mapEvent(event);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/dht/index.js
var RoutingEventTypes;
(function(RoutingEventTypes2) {
  RoutingEventTypes2[RoutingEventTypes2["SENDING_QUERY"] = 0] = "SENDING_QUERY";
  RoutingEventTypes2[RoutingEventTypes2["PEER_RESPONSE"] = 1] = "PEER_RESPONSE";
  RoutingEventTypes2[RoutingEventTypes2["FINAL_PEER"] = 2] = "FINAL_PEER";
  RoutingEventTypes2[RoutingEventTypes2["QUERY_ERROR"] = 3] = "QUERY_ERROR";
  RoutingEventTypes2[RoutingEventTypes2["PROVIDER"] = 4] = "PROVIDER";
  RoutingEventTypes2[RoutingEventTypes2["VALUE"] = 5] = "VALUE";
  RoutingEventTypes2[RoutingEventTypes2["ADDING_PEER"] = 6] = "ADDING_PEER";
  RoutingEventTypes2[RoutingEventTypes2["DIALING_PEER"] = 7] = "DIALING_PEER";
})(RoutingEventTypes || (RoutingEventTypes = {}));
var RoutingMessageType;
(function(RoutingMessageType2) {
  RoutingMessageType2[RoutingMessageType2["PUT_VALUE"] = 0] = "PUT_VALUE";
  RoutingMessageType2[RoutingMessageType2["GET_VALUE"] = 1] = "GET_VALUE";
  RoutingMessageType2[RoutingMessageType2["ADD_PROVIDER"] = 2] = "ADD_PROVIDER";
  RoutingMessageType2[RoutingMessageType2["GET_PROVIDERS"] = 3] = "GET_PROVIDERS";
  RoutingMessageType2[RoutingMessageType2["FIND_NODE"] = 4] = "FIND_NODE";
  RoutingMessageType2[RoutingMessageType2["PING"] = 5] = "PING";
})(RoutingMessageType || (RoutingMessageType = {}));
function createDHT(client) {
  return {
    query: createQuery(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/diag/cmds.js
function createCmds(client) {
  return async function cmds(options = {}) {
    const res = await client.post("diag/cmds", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return res.json();
  };
}

// node_modules/kubo-rpc-client/dist/src/diag/net.js
function createNet(client) {
  return async function net(options = {}) {
    const res = await client.post("diag/net", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return res.json();
  };
}

// node_modules/kubo-rpc-client/dist/src/diag/sys.js
function createSys(client) {
  return async function sys(options = {}) {
    const res = await client.post("diag/sys", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return res.json();
  };
}

// node_modules/kubo-rpc-client/dist/src/diag/index.js
function createDiag(client) {
  return {
    cmds: createCmds(client),
    net: createNet(client),
    sys: createSys(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/files/cp.js
function createCp(client) {
  return async function cp(sources, destination, options = {}) {
    const sourceArr = Array.isArray(sources) ? sources : [sources];
    const res = await client.post("files/cp", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: sourceArr.concat(destination).map((src6) => CID2.asCID(src6) != null ? `/ipfs/${src6}` : src6),
        ...options
      }),
      headers: options.headers
    });
    await res.text();
  };
}

// node_modules/kubo-rpc-client/dist/src/files/flush.js
function createFlush(client) {
  return async function flush(path, options = {}) {
    if (typeof path !== "string") {
      throw new Error("ipfs.files.flush requires a path");
    }
    const res = await client.post("files/flush", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return CID2.parse(data.Cid);
  };
}

// node_modules/kubo-rpc-client/dist/src/lib/object-to-camel-with-metadata.js
function objectToCamelWithMetadata(entry) {
  const file = objectToCamel(entry);
  if (Object.prototype.hasOwnProperty.call(file, "mode")) {
    file.mode = parseInt(file.mode, 8);
  }
  if (Object.prototype.hasOwnProperty.call(file, "mtime")) {
    file.mtime = {
      secs: file.mtime,
      nsecs: file.mtimeNsecs ?? 0
    };
    delete file.mtimeNsecs;
  }
  return file;
}

// node_modules/kubo-rpc-client/dist/src/files/ls.js
function createLs(client) {
  return async function* ls(path, options = {}) {
    if (path == null) {
      throw new Error("ipfs.files.ls requires a path");
    }
    const res = await client.post("files/ls", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: CID2.asCID(path) != null ? `/ipfs/${path}` : path,
        // default long to true, diverges from go-ipfs where its false by default
        long: true,
        ...options,
        stream: true
      }),
      headers: options.headers
    });
    for await (const result of res.ndjson()) {
      if ("Entries" in result) {
        for (const entry of result.Entries ?? []) {
          yield toCoreInterface4(objectToCamelWithMetadata(entry));
        }
      } else {
        yield toCoreInterface4(objectToCamelWithMetadata(result));
      }
    }
  };
}
function toCoreInterface4(entry) {
  if (entry.hash != null) {
    entry.cid = CID2.parse(entry.hash);
  }
  delete entry.hash;
  entry.type = entry.type === 1 ? "directory" : "file";
  return entry;
}

// node_modules/kubo-rpc-client/dist/src/files/mkdir.js
function createMkdir(client) {
  return async function mkdir(path, options = {}) {
    const res = await client.post("files/mkdir", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    });
    await res.text();
  };
}

// node_modules/kubo-rpc-client/dist/src/files/mv.js
function createMv(client) {
  return async function mv(sources, destination, options = {}) {
    if (!Array.isArray(sources)) {
      sources = [sources];
    }
    const res = await client.post("files/mv", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: sources.concat(destination),
        ...options
      }),
      headers: options.headers
    });
    await res.text();
  };
}

// node_modules/kubo-rpc-client/node_modules/stream-to-it/dist/src/source.js
function source(readable) {
  if (isReadableStream2(readable)) {
    return async function* () {
      const reader = readable.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }();
  }
  if (isNodeStream(readable)) {
    return readable;
  }
  throw new Error("unknown stream");
}
function isNodeStream(obj) {
  return obj[Symbol.asyncIterator] != null;
}
function isReadableStream2(obj) {
  return typeof obj?.getReader === "function";
}

// node_modules/kubo-rpc-client/dist/src/files/read.js
function createRead(client) {
  return async function* read5(path, options = {}) {
    const res = await client.post("files/read", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        count: options.length,
        ...options
      }),
      headers: options.headers
    });
    if (res.body == null) {
      throw new Error("Invalid response body");
    }
    yield* source(res.body);
  };
}

// node_modules/kubo-rpc-client/dist/src/lib/errors.js
var HTTPError = class extends Error {
  response;
  constructor(response) {
    super(response.statusText);
    this.name = "HTTPError";
    this.response = response;
  }
};

// node_modules/kubo-rpc-client/dist/src/files/rm.js
function createRm3(client) {
  return async function rm(path, options = {}) {
    const res = await client.post("files/rm", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    });
    const body = await res.text();
    if (body !== "") {
      const error = new HTTPError(res);
      error.message = body;
      throw error;
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/files/stat.js
function createStat3(client) {
  return async function stat(path, options = {}) {
    const res = await client.post("files/stat", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    data.WithLocality = data.WithLocality ?? false;
    return toCoreInterface5(objectToCamelWithMetadata(data));
  };
}
function toCoreInterface5(entry) {
  entry.cid = CID2.parse(entry.hash);
  delete entry.hash;
  return entry;
}

// node_modules/kubo-rpc-client/dist/src/files/write.js
function createWrite(client) {
  return async function write(path, input, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const res = await client.post("files/write", {
        signal,
        searchParams: toUrlSearchParams({
          arg: path,
          streamChannels: true,
          count: options.length,
          ...options
        }),
        ...await multipartRequest2([{
          content: input,
          path: "arg",
          mode: modeToString(options.mode),
          mtime: parseMtime(options.mtime)
        }], controller, options.headers)
      });
      await res.text();
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/files/index.js
function createFiles(client) {
  return {
    cp: createCp(client),
    flush: createFlush(client),
    ls: createLs(client),
    mkdir: createMkdir(client),
    mv: createMv(client),
    read: createRead(client),
    rm: createRm3(client),
    stat: createStat3(client),
    write: createWrite(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/get-endpoint-config.js
function createGetEndpointConfig(client) {
  return function getEndpointConfig() {
    const url = new URL(client.opts.base ?? "");
    return {
      host: url.hostname,
      port: url.port,
      protocol: url.protocol,
      pathname: url.pathname,
      "api-path": url.pathname
    };
  };
}

// node_modules/kubo-rpc-client/dist/src/get.js
function createGet4(client) {
  return async function* get(path, options = {}) {
    const opts = {
      arg: `${path instanceof Uint8Array ? CID2.decode(path) : path}`,
      ...options
    };
    const res = await client.post("get", {
      signal: options.signal,
      searchParams: toUrlSearchParams(opts),
      headers: options.headers
    });
    yield* res.iterator();
  };
}

// node_modules/kubo-rpc-client/dist/src/id.js
function createId(client) {
  return async function id(options = {}) {
    const res = await client.post("id", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: options.peerId != null ? options.peerId.toString() : void 0,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    const output = {
      ...objectToCamel(data)
    };
    output.id = peerIdFromString(output.id);
    if (output.addresses != null) {
      output.addresses = output.addresses.map((ma) => multiaddr(ma));
    }
    return output;
  };
}

// node_modules/kubo-rpc-client/dist/src/is-online.js
function createIsOnline(client) {
  const id = createId(client);
  return async function isOnline(options = {}) {
    try {
      const res = await id(options);
      return Boolean(res?.addresses?.length);
    } catch {
      return false;
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/key/gen.js
var defaultOptions = {
  type: "ed25519"
};
function createGen(client) {
  return async function gen(name10, options = defaultOptions) {
    const res = await client.post("key/gen", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name10,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return objectToCamel(data);
  };
}

// node_modules/kubo-rpc-client/dist/src/key/import.js
function createImport2(client) {
  return async function importKey(name10, pem, password, options = {}) {
    const res = await client.post("key/import", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name10,
        pem,
        password,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return objectToCamel(data);
  };
}

// node_modules/kubo-rpc-client/dist/src/key/list.js
function createList2(client) {
  return async function list(options = {}) {
    const res = await client.post("key/list", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const data = await res.json();
    return (data.Keys ?? []).map((k) => objectToCamel(k));
  };
}

// node_modules/kubo-rpc-client/dist/src/key/rename.js
function createRename(client) {
  return async function rename(oldName, newName, options = {}) {
    const res = await client.post("key/rename", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          oldName,
          newName
        ],
        ...options
      }),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/key/rm.js
function createRm4(client) {
  return async function rm(name10, options = {}) {
    const res = await client.post("key/rm", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name10,
        ...options
      }),
      headers: options.headers
    });
    const data = await res.json();
    return objectToCamel(data.Keys[0]);
  };
}

// node_modules/kubo-rpc-client/dist/src/key/index.js
function createKey(client) {
  return {
    gen: createGen(client),
    import: createImport2(client),
    list: createList2(client),
    rename: createRename(client),
    rm: createRm4(client)
  };
}

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/bytes.js
var empty5 = new Uint8Array(0);
function coerce5(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/vendor/base-x.js
function base6(ALPHABET, name10) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode29(source2) {
    if (source2 instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source2)) {
      source2 = new Uint8Array(source2.buffer, source2.byteOffset, source2.byteLength);
    } else if (Array.isArray(source2)) {
      source2 = Uint8Array.from(source2);
    }
    if (!(source2 instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source2.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length5 = 0;
    var pbegin = 0;
    var pend = source2.length;
    while (pbegin !== pend && source2[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source2[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length5) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      pbegin++;
    }
    var it2 = size - length5;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source2) {
    if (typeof source2 !== "string") {
      throw new TypeError("Expected String");
    }
    if (source2.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source2[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length5 = 0;
    while (source2[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source2.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source2[psz]) {
      var carry = BASE_MAP[source2.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length5) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length5 = i2;
      psz++;
    }
    if (source2[psz] === " ") {
      return;
    }
    var it4 = size - length5;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode34(string4) {
    var buffer3 = decodeUnsafe(string4);
    if (buffer3) {
      return buffer3;
    }
    throw new Error(`Non-${name10} character`);
  }
  return {
    encode: encode29,
    decodeUnsafe,
    decode: decode34
  };
}
var src5 = base6;
var _brrp__multiformats_scope_baseX5 = src5;
var base_x_default5 = _brrp__multiformats_scope_baseX5;

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/bases/base.js
var Encoder5 = class {
  name;
  prefix;
  baseEncode;
  constructor(name10, prefix, baseEncode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder5 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name10, prefix, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or5(this, decoder);
  }
};
var ComposedDecoder5 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or5(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or5(left, right) {
  return new ComposedDecoder5({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec5 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name10, prefix, baseEncode, baseDecode) {
    this.name = name10;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder5(name10, prefix, baseEncode);
    this.decoder = new Decoder5(name10, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from8({ name: name10, prefix, encode: encode29, decode: decode34 }) {
  return new Codec5(name10, prefix, encode29, decode34);
}
function baseX5({ name: name10, prefix, alphabet: alphabet4 }) {
  const { encode: encode29, decode: decode34 } = base_x_default5(alphabet4, name10);
  return from8({
    prefix,
    name: name10,
    encode: encode29,
    decode: (text) => coerce5(decode34(text))
  });
}
function decode33(string4, alphabet4, bitsPerChar, name10) {
  const codes2 = {};
  for (let i = 0; i < alphabet4.length; ++i) {
    codes2[alphabet4[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer3 = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name10} character`);
    }
    buffer3 = buffer3 << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer3 >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer3 << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode28(data, alphabet4, bitsPerChar) {
  const pad = alphabet4[alphabet4.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer3 = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer3 = buffer3 << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet4[mask & buffer3 >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet4[mask & buffer3 << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46485({ name: name10, prefix, bitsPerChar, alphabet: alphabet4 }) {
  return from8({
    prefix,
    name: name10,
    encode(input) {
      return encode28(input, alphabet4, bitsPerChar);
    },
    decode(input) {
      return decode33(input, alphabet4, bitsPerChar, name10);
    }
  });
}

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/bases/base32.js
var base325 = rfc46485({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper5 = rfc46485({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad5 = rfc46485({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper5 = rfc46485({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex5 = rfc46485({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper5 = rfc46485({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad5 = rfc46485({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper5 = rfc46485({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z5 = rfc46485({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/bases/base58.js
var base58btc5 = baseX5({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr5 = baseX5({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/logger/node_modules/multiformats/dist/src/bases/base64.js
var base645 = rfc46485({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad5 = rfc46485({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url5 = rfc46485({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad5 = rfc46485({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/weald/node_modules/ms/dist/index.mjs
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
function ms(value, options) {
  try {
    if (typeof value === "string" && value.length > 0) {
      return parse2(value);
    } else if (typeof value === "number" && isFinite(value)) {
      return options?.long ? fmtLong(value) : fmtShort(value);
    }
    throw new Error("Value is not a string or number.");
  } catch (error) {
    const message = isError(error) ? `${error.message}. value=${JSON.stringify(value)}` : "An unknown error has occured.";
    throw new Error(message);
  }
}
function parse2(str) {
  str = String(str);
  if (str.length > 100) {
    throw new Error("Value exceeds the maximum length of 100 characters.");
  }
  const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return NaN;
  }
  const n = parseFloat(match[1]);
  const type = (match[2] || "ms").toLowerCase();
  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      throw new Error(`The unit ${type} was matched, but no matching case exists.`);
  }
}
var dist_default = ms;
function fmtShort(ms2) {
  const msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return `${Math.round(ms2 / d)}d`;
  }
  if (msAbs >= h) {
    return `${Math.round(ms2 / h)}h`;
  }
  if (msAbs >= m) {
    return `${Math.round(ms2 / m)}m`;
  }
  if (msAbs >= s) {
    return `${Math.round(ms2 / s)}s`;
  }
  return `${ms2}ms`;
}
function fmtLong(ms2) {
  const msAbs = Math.abs(ms2);
  if (msAbs >= d) {
    return plural(ms2, msAbs, d, "day");
  }
  if (msAbs >= h) {
    return plural(ms2, msAbs, h, "hour");
  }
  if (msAbs >= m) {
    return plural(ms2, msAbs, m, "minute");
  }
  if (msAbs >= s) {
    return plural(ms2, msAbs, s, "second");
  }
  return `${ms2} ms`;
}
function plural(ms2, msAbs, n, name10) {
  const isPlural = msAbs >= n * 1.5;
  return `${Math.round(ms2 / n)} ${name10}${isPlural ? "s" : ""}`;
}
function isError(error) {
  return typeof error === "object" && error !== null && "message" in error;
}

// node_modules/weald/dist/src/common.js
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce6;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = dist_default;
  createDebug.destroy = destroy;
  Object.keys(env).forEach((key) => {
    createDebug[key] = env[key];
  });
  createDebug.names = [];
  createDebug.skips = [];
  createDebug.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }
    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }
  createDebug.selectColor = selectColor;
  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug(...args) {
      if (!debug.enabled) {
        return;
      }
      const self2 = debug;
      const curr = Number(/* @__PURE__ */ new Date());
      const ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format6) => {
        if (match === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug.formatters[format6];
        if (typeof formatter === "function") {
          const val = args[index];
          match = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      createDebug.formatArgs.call(self2, args);
      const logFn = self2.log || createDebug.log;
      logFn.apply(self2, args);
    }
    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy;
    Object.defineProperty(debug, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug.namespaces) {
          namespacesCache = createDebug.namespaces;
          enabledCache = createDebug.enabled(namespace);
        }
        return enabledCache;
      },
      set: (v) => {
        enableOverride = v;
      }
    });
    if (typeof createDebug.init === "function") {
      createDebug.init(debug);
    }
    return debug;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.namespaces = namespaces;
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    const len = split.length;
    for (i = 0; i < len; i++) {
      if (!split[i]) {
        continue;
      }
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        createDebug.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    const namespaces = [
      ...createDebug.names.map(toNamespace),
      ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    createDebug.enable("");
    return namespaces;
  }
  function enabled(name10) {
    if (name10[name10.length - 1] === "*") {
      return true;
    }
    let i;
    let len;
    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name10)) {
        return false;
      }
    }
    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name10)) {
        return true;
      }
    }
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce6(val) {
    if (val instanceof Error) {
      return val.stack ?? val.message;
    }
    return val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  createDebug.setupFormatters(createDebug.formatters);
  createDebug.enable(createDebug.load());
  return createDebug;
}

// node_modules/weald/dist/src/browser.js
var storage = localstorage();
var colors = [
  "#0000CC",
  "#0000FF",
  "#0033CC",
  "#0033FF",
  "#0066CC",
  "#0066FF",
  "#0099CC",
  "#0099FF",
  "#00CC00",
  "#00CC33",
  "#00CC66",
  "#00CC99",
  "#00CCCC",
  "#00CCFF",
  "#3300CC",
  "#3300FF",
  "#3333CC",
  "#3333FF",
  "#3366CC",
  "#3366FF",
  "#3399CC",
  "#3399FF",
  "#33CC00",
  "#33CC33",
  "#33CC66",
  "#33CC99",
  "#33CCCC",
  "#33CCFF",
  "#6600CC",
  "#6600FF",
  "#6633CC",
  "#6633FF",
  "#66CC00",
  "#66CC33",
  "#9900CC",
  "#9900FF",
  "#9933CC",
  "#9933FF",
  "#99CC00",
  "#99CC33",
  "#CC0000",
  "#CC0033",
  "#CC0066",
  "#CC0099",
  "#CC00CC",
  "#CC00FF",
  "#CC3300",
  "#CC3333",
  "#CC3366",
  "#CC3399",
  "#CC33CC",
  "#CC33FF",
  "#CC6600",
  "#CC6633",
  "#CC9900",
  "#CC9933",
  "#CCCC00",
  "#CCCC33",
  "#FF0000",
  "#FF0033",
  "#FF0066",
  "#FF0099",
  "#FF00CC",
  "#FF00FF",
  "#FF3300",
  "#FF3333",
  "#FF3366",
  "#FF3399",
  "#FF33CC",
  "#FF33FF",
  "#FF6600",
  "#FF6633",
  "#FF9900",
  "#FF9933",
  "#FFCC00",
  "#FFCC33"
];
function useColors() {
  if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
    return true;
  }
  if (typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().match(/(edge|trident)\/(\d+)/) != null) {
    return false;
  }
  return typeof document !== "undefined" && document.documentElement?.style?.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  // @ts-expect-error window.console.firebug and window.console.exception are not in the types
  typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().match(/firefox\/(\d+)/) != null && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().match(/applewebkit\/(\d+)/);
}
function formatArgs(args) {
  args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + dist_default(this.diff);
  if (!this.useColors) {
    return;
  }
  const c = "color: " + this.color;
  args.splice(1, 0, c, "color: inherit");
  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, (match) => {
    if (match === "%%") {
      return;
    }
    index++;
    if (match === "%c") {
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
var log = console.debug ?? console.log ?? (() => {
});
function save(namespaces) {
  try {
    if (namespaces) {
      storage?.setItem("debug", namespaces);
    } else {
      storage?.removeItem("debug");
    }
  } catch (error) {
  }
}
function load() {
  let r;
  try {
    r = storage?.getItem("debug");
  } catch (error) {
  }
  if (!r && typeof process !== "undefined" && "env" in process) {
    r = process.env.DEBUG;
  }
  return r;
}
function localstorage() {
  try {
    return localStorage;
  } catch (error) {
  }
}
function setupFormatters(formatters) {
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
}
var browser_default = setup({ formatArgs, save, load, useColors, setupFormatters, colors, storage, log });

// node_modules/weald/dist/src/index.js
var src_default6 = browser_default;

// node_modules/@libp2p/logger/dist/src/index.js
src_default6.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc5.baseEncode(v);
};
src_default6.formatters.t = (v) => {
  return v == null ? "undefined" : base325.baseEncode(v);
};
src_default6.formatters.m = (v) => {
  return v == null ? "undefined" : base645.baseEncode(v);
};
src_default6.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default6.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default6.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
src_default6.formatters.a = (v) => {
  return v == null ? "undefined" : v.toString();
};
function createDisabledLogger(namespace) {
  const logger2 = () => {
  };
  logger2.enabled = false;
  logger2.color = "";
  logger2.diff = 0;
  logger2.log = () => {
  };
  logger2.namespace = namespace;
  logger2.destroy = () => true;
  logger2.extend = () => logger2;
  return logger2;
}
function logger(name10) {
  let trace = createDisabledLogger(`${name10}:trace`);
  if (src_default6.enabled(`${name10}:trace`) && src_default6.names.map((r) => r.toString()).find((n) => n.includes(":trace")) != null) {
    trace = src_default6(`${name10}:trace`);
  }
  return Object.assign(src_default6(name10), {
    error: src_default6(`${name10}:error`),
    trace
  });
}

// node_modules/merge-options/index.mjs
var import_index5 = __toESM(require_merge_options(), 1);
var merge_options_default = import_index5.default;

// node_modules/parse-duration/index.mjs
var durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig;
parse3.nanosecond = parse3.ns = 1 / 1e6;
parse3["\xB5s"] = parse3["\u03BCs"] = parse3.us = parse3.microsecond = 1 / 1e3;
parse3.millisecond = parse3.ms = parse3[""] = 1;
parse3.second = parse3.sec = parse3.s = parse3.ms * 1e3;
parse3.minute = parse3.min = parse3.m = parse3.s * 60;
parse3.hour = parse3.hr = parse3.h = parse3.m * 60;
parse3.day = parse3.d = parse3.h * 24;
parse3.week = parse3.wk = parse3.w = parse3.d * 7;
parse3.month = parse3.b = parse3.d * (365.25 / 12);
parse3.year = parse3.yr = parse3.y = parse3.d * 365.25;
function parse3(str = "", format6 = "ms") {
  var result = null;
  str = (str + "").replace(/(\d)[,_](\d)/g, "$1$2");
  str.replace(durationRE, function(_, n, units) {
    units = unitRatio(units);
    if (units) result = (result || 0) + parseFloat(n, 10) * units;
  });
  return result && result / (unitRatio(format6) || 1);
}
function unitRatio(str) {
  return parse3[str] || parse3[str.toLowerCase().replace(/s$/, "")];
}
var parse_duration_default = parse3;

// node_modules/kubo-rpc-client/dist/src/lib/agent.browser.js
var agent_browser_default = () => {
};

// node_modules/kubo-rpc-client/dist/src/lib/http.js
var import_iso_url = __toESM(require_iso_url(), 1);

// node_modules/kubo-rpc-client/dist/src/lib/http/error.js
var TimeoutError = class extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  constructor(message = "The operation was aborted.") {
    super(message);
    this.name = "AbortError";
  }
};
var HTTPError2 = class extends Error {
  response;
  constructor(response) {
    super(response.statusText);
    this.name = "HTTPError";
    this.response = response;
  }
};

// node_modules/kubo-rpc-client/node_modules/native-fetch/esm/src/index.js
var globalFetch = globalThis.fetch;
var globalHeaders = globalThis.Headers;
var globalRequest = globalThis.Request;
var globalResponse = globalThis.Response;

// node_modules/kubo-rpc-client/dist/src/lib/http/fetch.browser.js
var fetchWithProgress = async (url, options = {}) => {
  const request = new XMLHttpRequest();
  request.open(options.method ?? "GET", url.toString(), true);
  const { timeout, headers } = options;
  const t = Number(timeout);
  if (!isNaN(t) && t > 0 && t < Infinity) {
    request.timeout = t;
  }
  if (options.overrideMimeType != null) {
    request.overrideMimeType(options.overrideMimeType);
  }
  if (headers != null) {
    for (const [name10, value] of new globalHeaders(headers)) {
      request.setRequestHeader(name10, value);
    }
  }
  if (options.signal != null) {
    options.signal.onabort = () => {
      request.abort();
    };
  }
  if (options.onUploadProgress != null) {
    request.upload.onprogress = options.onUploadProgress;
  }
  request.responseType = "arraybuffer";
  return new Promise((resolve2, reject) => {
    const handleEvent = (event) => {
      switch (event.type) {
        case "error": {
          resolve2(globalResponse.error());
          break;
        }
        case "load": {
          resolve2(new ResponseWithURL(request.responseURL, request.response, {
            status: request.status,
            statusText: request.statusText,
            headers: parseHeaders(request.getAllResponseHeaders())
          }));
          break;
        }
        case "timeout": {
          reject(new TimeoutError());
          break;
        }
        case "abort": {
          reject(new AbortError());
          break;
        }
        default: {
          break;
        }
      }
    };
    request.onerror = handleEvent;
    request.onload = handleEvent;
    request.ontimeout = handleEvent;
    request.onabort = handleEvent;
    request.send(options.body);
  });
};
var fetchWithStreaming = globalFetch;
var fetchWith = (url, options = {}) => options.onUploadProgress != null ? fetchWithProgress(url, options) : fetchWithStreaming(url, options);
var parseHeaders = (input) => {
  const headers = new globalHeaders();
  for (const line of input.trim().split(/[\r\n]+/)) {
    const index = line.indexOf(": ");
    if (index > 0) {
      headers.set(line.slice(0, index), line.slice(index + 1));
    }
  }
  return headers;
};
var ResponseWithURL = class extends globalResponse {
  constructor(url, body, options) {
    super(body, options);
    Object.defineProperty(this, "url", { value: url });
  }
};

// node_modules/kubo-rpc-client/dist/src/lib/http.js
var merge = merge_options_default.bind({ ignoreUndefined: true });
var log2 = logger("kubo-rpc-client:fetch");
var defaults = {
  throwHttpErrors: true,
  credentials: "same-origin"
};
var HTTP = class _HTTP {
  static HTTPError = HTTPError2;
  static TimeoutError = TimeoutError;
  static post = async (resource, options) => new _HTTP(options).post(resource, options);
  static get = async (resource, options) => new _HTTP(options).get(resource, options);
  static put = async (resource, options) => new _HTTP(options).put(resource, options);
  static delete = async (resource, options) => new _HTTP(options).delete(resource, options);
  static options = async (resource, options) => new _HTTP(options).options(resource, options);
  opts;
  constructor(options = {}) {
    this.opts = merge({}, defaults, options);
  }
  /**
   * Fetch
   */
  async fetch(resource, options = {}) {
    const opts = merge({}, this.opts, options);
    const headers = new globalHeaders(opts.headers);
    if (typeof resource !== "string" && !(resource instanceof import_iso_url.URL || resource instanceof globalRequest)) {
      throw new TypeError("`resource` must be a string, URL, or Request");
    }
    const url = new import_iso_url.URL(resource.toString(), opts.base);
    const { searchParams, transformSearchParams, json } = opts;
    if (searchParams != null) {
      if (typeof transformSearchParams === "function") {
        url.search = transformSearchParams(new import_iso_url.URLSearchParams(opts.searchParams));
      } else {
        url.search = new import_iso_url.URLSearchParams(opts.searchParams).toString();
      }
    }
    if (json != null) {
      opts.body = JSON.stringify(opts.json);
      headers.set("content-type", "application/json");
    }
    const signals = [opts.signal];
    if (opts.timeout != null && isNaN(opts.timeout) && opts.timeout > 0) {
      signals.push(AbortSignal.timeout(opts.timeout));
    }
    const signal = anySignal(signals);
    try {
      if (globalThis.ReadableStream != null && opts.body instanceof globalThis.ReadableStream && (isBrowser || isWebWorker)) {
        opts.body = new Blob(await src_default3(browserReadableStreamToIt(opts.body)));
      }
      log2.trace("outgoing headers", opts.headers);
      log2.trace("%s %s", opts.method, url);
      const response = await fetchWith(url.toString(), {
        ...opts,
        signal: opts.signal,
        timeout: void 0,
        headers,
        // https://fetch.spec.whatwg.org/#dom-requestinit-duplex
        // https://github.com/whatwg/fetch/issues/1254
        duplex: "half"
      });
      log2("%s %s %d", opts.method, url, response.status);
      log2.trace("incoming headers", response.headers);
      if (!response.ok && opts.throwHttpErrors === true) {
        if (opts.handleError != null) {
          await opts.handleError(response);
        }
        throw new HTTPError2(response);
      }
      response.iterator = async function* () {
        yield* fromStream(response.body);
      };
      response.ndjson = async function* () {
        for await (const chunk of ndjson(response.iterator())) {
          if (options.transform != null) {
            yield options.transform(chunk);
          } else {
            yield chunk;
          }
        }
      };
      return response;
    } finally {
      signal.clear();
    }
  }
  async post(resource, options = {}) {
    return this.fetch(resource, { ...options, method: "POST" });
  }
  async get(resource, options = {}) {
    return this.fetch(resource, { ...options, method: "GET" });
  }
  async put(resource, options = {}) {
    return this.fetch(resource, { ...options, method: "PUT" });
  }
  async delete(resource, options = {}) {
    return this.fetch(resource, { ...options, method: "DELETE" });
  }
  async options(resource, options = {}) {
    return this.fetch(resource, { ...options, method: "OPTIONS" });
  }
};
var ndjson = async function* (source2) {
  const decoder = new TextDecoder();
  let buf3 = "";
  for await (const chunk of source2) {
    buf3 += decoder.decode(chunk, { stream: true });
    const lines = buf3.split(/\r?\n/);
    for (let i = 0; i < lines.length - 1; i++) {
      const l = lines[i].trim();
      if (l.length > 0) {
        yield JSON.parse(l);
      }
    }
    buf3 = lines[lines.length - 1];
  }
  buf3 += decoder.decode();
  buf3 = buf3.trim();
  if (buf3.length !== 0) {
    yield JSON.parse(buf3);
  }
};
var fromStream = (source2) => {
  if (isAsyncIterable5(source2)) {
    return source2;
  }
  if (isNodeReadableStream(source2)) {
    const iter = source2[Symbol.asyncIterator]();
    return {
      [Symbol.asyncIterator]() {
        return {
          next: iter.next.bind(iter),
          return(value) {
            source2.destroy();
            if (typeof iter.return === "function") {
              return iter.return();
            }
            return Promise.resolve({ done: true, value });
          }
        };
      }
    };
  }
  if (isWebReadableStream(source2)) {
    const reader = source2.getReader();
    return async function* () {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done)
            return;
          if (value != null) {
            yield value;
          }
        }
      } finally {
        reader.releaseLock();
      }
    }();
  }
  throw new TypeError("Body can't be converted to AsyncIterable");
};
var isAsyncIterable5 = (value) => {
  return value !== null && typeof value[Symbol.asyncIterator] === "function";
};
var isWebReadableStream = (value) => {
  return value != null && typeof value.getReader === "function";
};
var isNodeReadableStream = (value) => Object.prototype.hasOwnProperty.call(value, "readable") && Object.prototype.hasOwnProperty.call(value, "writable");

// node_modules/@multiformats/multiaddr-to-uri/dist/src/index.js
var ASSUME_HTTP_CODES = [
  getProtocol("tcp").code,
  getProtocol("dns").code,
  getProtocol("dnsaddr").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code
];
function extractSNI(ma) {
  let sniProtoCode;
  try {
    sniProtoCode = getProtocol("sni").code;
  } catch (e) {
    return null;
  }
  for (const [proto, value] of ma) {
    if (proto === sniProtoCode && value !== void 0) {
      return value;
    }
  }
  return null;
}
function hasTLS(ma) {
  return ma.some(([proto, _]) => proto === getProtocol("tls").code);
}
function interpretNext(headProtoCode, headProtoVal, restMa) {
  const interpreter = interpreters[getProtocol(headProtoCode).name];
  if (interpreter === void 0) {
    throw new Error(`Can't interpret protocol ${getProtocol(headProtoCode).name}`);
  }
  const restVal = interpreter(headProtoVal, restMa);
  if (headProtoCode === getProtocol("ip6").code) {
    return `[${restVal}]`;
  }
  return restVal;
}
var interpreters = {
  ip4: (value, restMa) => value,
  ip6: (value, restMa) => {
    if (restMa.length === 0) {
      return value;
    }
    return `[${value}]`;
  },
  tcp: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `tcp://${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}:${value}`;
  },
  udp: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `udp://${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}:${value}`;
  },
  dnsaddr: (value, restMa) => value,
  dns4: (value, restMa) => value,
  dns6: (value, restMa) => value,
  dns: (value, restMa) => value,
  ipfs: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/ipfs/${value}`;
  },
  p2p: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p/${value}`;
  },
  http: (value, restMa) => {
    const maHasTLS = hasTLS(restMa);
    const sni = extractSNI(restMa);
    if (maHasTLS && sni !== null) {
      return `https://${sni}`;
    }
    const protocol = maHasTLS ? "https://" : "http://";
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `${protocol}${baseVal}`;
  },
  "http-path": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    const baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    const decodedValue = decodeURIComponent(value);
    return `${baseVal}/${decodedValue}`;
  },
  tls: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
  },
  sni: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
  },
  https: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `https://${baseVal}`;
  },
  ws: (value, restMa) => {
    const maHasTLS = hasTLS(restMa);
    const sni = extractSNI(restMa);
    if (maHasTLS && sni !== null) {
      return `wss://${sni}`;
    }
    const protocol = maHasTLS ? "wss://" : "ws://";
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `${protocol}${baseVal}`;
  },
  wss: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `wss://${baseVal}`;
  },
  "p2p-websocket-star": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-websocket-star`;
  },
  "p2p-webrtc-star": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-webrtc-star`;
  },
  "p2p-webrtc-direct": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-webrtc-direct`;
  }
};
function multiaddrToUri(input, opts) {
  const ma = multiaddr(input);
  const parts = ma.stringTuples();
  const head = parts.pop();
  if (head === void 0) {
    throw new Error("Unexpected end of multiaddr");
  }
  const protocol = getProtocol(head[0]);
  const interpreter = interpreters[protocol.name];
  if (interpreter == null) {
    throw new Error(`No interpreter found for ${protocol.name}`);
  }
  let uri = interpreter(head[1] ?? "", parts);
  if (opts?.assumeHttp !== false && ASSUME_HTTP_CODES.includes(head[0])) {
    uri = uri.replace(/^.*:\/\//, "");
    if (head[1] === "443") {
      uri = `https://${uri}`;
    } else {
      uri = `http://${uri}`;
    }
  }
  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    uri = new URL(uri).toString();
    if (uri.endsWith("/")) {
      uri = uri.substring(0, uri.length - 1);
    }
  }
  return uri;
}

// node_modules/kubo-rpc-client/dist/src/lib/to-url-string.js
function toUrlString(url) {
  try {
    url = multiaddrToUri(multiaddr(url));
  } catch {
  }
  url = url.toString();
  return url;
}

// node_modules/kubo-rpc-client/dist/src/lib/core.js
var log3 = logger("js-kubo-rpc-client:lib:error-handler");
var merge2 = merge_options_default.bind({ ignoreUndefined: true });
var DEFAULT_PROTOCOL = isBrowser || isWebWorker ? location.protocol : "http";
var DEFAULT_HOST = isBrowser || isWebWorker ? location.hostname : "localhost";
var DEFAULT_PORT = isBrowser || isWebWorker ? location.port : "5001";
var normalizeOptions = (options = {}) => {
  let url;
  let opts = {};
  let agent;
  if (typeof options === "string" || isMultiaddr(options)) {
    url = new URL(toUrlString(options));
  } else if (options instanceof URL) {
    url = options;
  } else if (typeof options.url === "string" || isMultiaddr(options.url)) {
    url = new URL(toUrlString(options.url));
    opts = options;
  } else if (options.url instanceof URL) {
    url = options.url;
    opts = options;
  } else {
    opts = options ?? {};
    const protocol = (opts.protocol ?? DEFAULT_PROTOCOL).replace(":", "");
    const host = (opts.host ?? DEFAULT_HOST).split(":")[0];
    const port = opts.port ?? DEFAULT_PORT;
    url = new URL(`${protocol}://${host}:${port}`);
  }
  if (opts.apiPath != null) {
    url.pathname = opts.apiPath;
  } else if (url.pathname === "/" || url.pathname === void 0) {
    url.pathname = "api/v0";
  }
  if (isNode) {
    const Agent = agent_browser_default(url);
    agent = opts.agent ?? new Agent({
      keepAlive: true,
      // Similar to browsers which limit connections to six per host
      maxSockets: 6
    });
  }
  return {
    ...opts,
    host: url.host,
    protocol: url.protocol.replace(":", ""),
    port: Number(url.port),
    apiPath: url.pathname,
    url,
    agent
  };
};
var errorHandler = async (response) => {
  let msg;
  try {
    if ((response.headers.get("Content-Type") ?? "").startsWith("application/json")) {
      const data = await response.json();
      log3(data);
      msg = data.Message ?? data.message;
    } else {
      msg = await response.text();
    }
  } catch (err) {
    log3("Failed to parse error response", err);
    msg = err.message;
  }
  let error = new HTTP.HTTPError(response);
  if (msg != null) {
    if (msg.includes("deadline has elapsed")) {
      error = new HTTP.TimeoutError();
    }
    if (msg.includes("context deadline exceeded")) {
      error = new HTTP.TimeoutError();
    }
    if (msg.includes("request timed out")) {
      error = new HTTP.TimeoutError();
    }
    error.message = msg;
  }
  throw error;
};
var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
var kebabCase = (str) => {
  return str.replace(KEBAB_REGEX, function(match) {
    return "-" + match.toLowerCase();
  });
};
var parseTimeout = (value) => {
  return typeof value === "string" ? parse_duration_default(value) ?? 0 : value;
};
var Client = class extends HTTP {
  constructor(options = {}) {
    const opts = normalizeOptions(options);
    super({
      timeout: opts.timeout != null ? parseTimeout(opts.timeout) : void 0,
      headers: opts.headers,
      base: `${opts.url}`,
      handleError: errorHandler,
      transformSearchParams: (search) => {
        const out = new URLSearchParams();
        for (const [key, value] of search) {
          if (value !== "undefined" && value !== "null" && key !== "signal" && key !== "timeout") {
            out.append(kebabCase(key), value);
          }
          if (key === "timeout" && !isNaN(parseInt(value))) {
            out.append(kebabCase(key), value);
          }
        }
        return out;
      },
      agent: opts.agent
    });
    delete this.get;
    delete this.put;
    delete this.delete;
    delete this.options;
    const fetch = this.fetch;
    this.fetch = async (resource, options2 = {}) => {
      if (typeof resource === "string" && !resource.startsWith("/")) {
        resource = `${opts.url}/${resource}`;
      }
      return fetch.call(this, resource, merge2(options2, {
        method: "POST"
      }));
    };
  }
};
var HTTPError3 = HTTP.HTTPError;

// node_modules/kubo-rpc-client/dist/src/lib/multibases.js
var LOAD_BASE = async (name10) => Promise.reject(new Error(`No base found for "${name10}"`));
var Multibases = class {
  _basesByName;
  _basesByPrefix;
  _loadBase;
  constructor(options) {
    this._basesByName = {};
    this._basesByPrefix = {};
    this._loadBase = options.loadBase ?? LOAD_BASE;
    for (const base7 of options.bases) {
      this.addBase(base7);
    }
  }
  /**
   * Add support for a multibase codec
   */
  addBase(base7) {
    if (this._basesByName[base7.name] != null && this._basesByPrefix[base7.prefix] != null) {
      throw new Error(`Codec already exists for codec "${base7.name}"`);
    }
    this._basesByName[base7.name] = base7;
    this._basesByPrefix[base7.prefix] = base7;
  }
  /**
   * Remove support for a multibase codec
   */
  removeBase(base7) {
    delete this._basesByName[base7.name];
    delete this._basesByPrefix[base7.prefix];
  }
  async getBase(nameOrPrefix) {
    if (this._basesByName[nameOrPrefix] != null) {
      return this._basesByName[nameOrPrefix];
    }
    if (this._basesByPrefix[nameOrPrefix] != null) {
      return this._basesByPrefix[nameOrPrefix];
    }
    const base7 = await this._loadBase(nameOrPrefix);
    if (this._basesByName[base7.name] == null && this._basesByPrefix[base7.prefix] == null) {
      this.addBase(base7);
    }
    return base7;
  }
  listBases() {
    return Object.values(this._basesByName);
  }
};

// node_modules/kubo-rpc-client/dist/src/lib/multicodecs.js
var LOAD_CODEC = async (codeOrName) => Promise.reject(new Error(`No codec found for "${codeOrName}"`));
var Multicodecs = class {
  _codecsByName;
  _codecsByCode;
  _loadCodec;
  constructor(options) {
    this._codecsByName = {};
    this._codecsByCode = {};
    this._loadCodec = options.loadCodec ?? LOAD_CODEC;
    for (const codec of options.codecs) {
      this.addCodec(codec);
    }
  }
  /**
   * Add support for a block codec
   */
  addCodec(codec) {
    if (this._codecsByName[codec.name] != null || this._codecsByCode[codec.code] != null) {
      throw new Error(`Resolver already exists for codec "${codec.name}"`);
    }
    this._codecsByName[codec.name] = codec;
    this._codecsByCode[codec.code] = codec;
  }
  /**
   * Remove support for a block codec
   */
  removeCodec(codec) {
    delete this._codecsByName[codec.name];
    delete this._codecsByCode[codec.code];
  }
  async getCodec(code10) {
    const table2 = typeof code10 === "string" ? this._codecsByName : this._codecsByCode;
    if (table2[code10] != null) {
      return table2[code10];
    }
    const codec = await this._loadCodec(code10);
    if (table2[code10] == null) {
      this.addCodec(codec);
    }
    return codec;
  }
  listCodecs() {
    return Object.values(this._codecsByName);
  }
};

// node_modules/kubo-rpc-client/dist/src/lib/multihashes.js
var LOAD_HASHER = async (codeOrName) => Promise.reject(new Error(`No hasher found for "${codeOrName}"`));
var Multihashes = class {
  _hashersByName;
  _hashersByCode;
  _loadHasher;
  constructor(options) {
    this._hashersByName = {};
    this._hashersByCode = {};
    this._loadHasher = options.loadHasher ?? LOAD_HASHER;
    for (const hasher of options.hashers) {
      this.addHasher(hasher);
    }
  }
  /**
   * Add support for a multibase hasher
   */
  addHasher(hasher) {
    if (this._hashersByName[hasher.name] != null || this._hashersByCode[hasher.code] != null) {
      throw new Error(`Resolver already exists for codec "${hasher.name}"`);
    }
    this._hashersByName[hasher.name] = hasher;
    this._hashersByCode[hasher.code] = hasher;
  }
  /**
   * Remove support for a multibase hasher
   */
  removeHasher(hasher) {
    delete this._hashersByName[hasher.name];
    delete this._hashersByCode[hasher.code];
  }
  /**
   * @param {number | string} code
   */
  async getHasher(code10) {
    const table2 = typeof code10 === "string" ? this._hashersByName : this._hashersByCode;
    if (table2[code10] != null) {
      return table2[code10];
    }
    const hasher = await this._loadHasher(code10);
    if (table2[code10] == null) {
      this.addHasher(hasher);
    }
    return hasher;
  }
  listHashers() {
    return Object.values(this._hashersByName);
  }
};

// node_modules/kubo-rpc-client/dist/src/log/level.js
function createLevel(client) {
  return async function level(subsystem, level, options = {}) {
    const res = await client.post("log/level", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          subsystem,
          level
        ],
        ...options
      }),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/log/ls.js
function createLs2(client) {
  return async function ls(options = {}) {
    const res = await client.post("log/ls", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const data = await res.json();
    return data.Strings;
  };
}

// node_modules/kubo-rpc-client/dist/src/log/tail.js
function createTail(client) {
  return async function* tail(options = {}) {
    const res = await client.post("log/tail", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    yield* res.ndjson();
  };
}

// node_modules/kubo-rpc-client/dist/src/log/index.js
function createLog(client) {
  return {
    level: createLevel(client),
    ls: createLs2(client),
    tail: createTail(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/ls.js
function createLs3(client) {
  return async function* ls(path, options = {}) {
    const pathStr = `${path instanceof Uint8Array ? CID2.decode(path) : path}`;
    async function mapLink(link) {
      let hash = link.Hash;
      if (hash.includes("/") === true) {
        const ipfsPath = hash.startsWith("/ipfs/") === true ? hash : `/ipfs/${hash}`;
        const stats = await createStat3(client)(ipfsPath);
        hash = stats.cid;
      } else {
        hash = CID2.parse(hash);
      }
      const entry = {
        name: link.Name,
        path: pathStr + (link.Name != null ? `/${link.Name}` : ""),
        size: link.Size,
        cid: hash,
        type: typeOf(link)
      };
      return entry;
    }
    const res = await client.post("ls", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: pathStr,
        ...options
      }),
      headers: options.headers
    });
    for await (let result of res.ndjson()) {
      result = result.Objects;
      if (result == null) {
        throw new Error("expected .Objects in results");
      }
      result = result[0];
      if (result == null) {
        throw new Error("expected one array in results.Objects");
      }
      const links = result.Links;
      if (!Array.isArray(links)) {
        throw new Error("expected one array in results.Objects[0].Links");
      }
      if (links.length === 0) {
        yield mapLink(result);
        return;
      }
      yield* links.map(mapLink);
    }
  };
}
function typeOf(link) {
  switch (link.Type) {
    case 1:
    case 5:
      return "dir";
    case 2:
      return "file";
    default:
      return "file";
  }
}

// node_modules/kubo-rpc-client/dist/src/mount.js
function createMount(client) {
  return async function mount(options = {}) {
    const res = await client.post("dns", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/name/publish.js
function createPublish(client) {
  return async function publish(path, options = {}) {
    const res = await client.post("name/publish", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${path}`,
        ...options
      }),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/name/pubsub/cancel.js
function createCancel(client) {
  return async function cancel(name10, options = {}) {
    const res = await client.post("name/pubsub/cancel", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: name10,
        ...options
      }),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/name/pubsub/state.js
function createState(client) {
  return async function state(options = {}) {
    const res = await client.post("name/pubsub/state", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return objectToCamel(await res.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/name/pubsub/subs.js
function createSubs(client) {
  return async function subs(options = {}) {
    const res = await client.post("name/pubsub/subs", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const data = await res.json();
    return data.Strings ?? [];
  };
}

// node_modules/kubo-rpc-client/dist/src/name/pubsub/index.js
function createPubsub(client) {
  return {
    cancel: createCancel(client),
    state: createState(client),
    subs: createSubs(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/name/resolve.js
function createResolve2(client) {
  return async function* resolve2(path, options = {}) {
    const res = await client.post("name/resolve", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        stream: true,
        ...options
      }),
      headers: options.headers
    });
    for await (const result of res.ndjson()) {
      yield result.Path;
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/name/index.js
function createName(client) {
  return {
    publish: createPublish(client),
    resolve: createResolve2(client),
    pubsub: createPubsub(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/object/patch/add-link.js
function createAddLink(client) {
  return async function addLink(cid, dLink, options = {}) {
    const res = await client.post("object/patch/add-link", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          `${cid}`,
          // @ts-expect-error loose types
          dLink.Name ?? dLink.name ?? "",
          // @ts-expect-error loose types
          (dLink.Hash ?? dLink.cid ?? "").toString() ?? null
        ],
        ...options
      }),
      headers: options.headers
    });
    const { Hash } = await res.json();
    return CID2.parse(Hash);
  };
}

// node_modules/kubo-rpc-client/dist/src/object/patch/rm-link.js
function createRmLink(client) {
  return async function rmLink(cid, dLink, options = {}) {
    const res = await client.post("object/patch/rm-link", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: [
          `${cid}`,
          // @ts-expect-error loose types
          dLink.Name ?? dLink.name ?? null
        ],
        ...options
      }),
      headers: options.headers
    });
    const { Hash } = await res.json();
    return CID2.parse(Hash);
  };
}

// node_modules/kubo-rpc-client/dist/src/object/patch/index.js
function createPatch(client) {
  return {
    addLink: createAddLink(client),
    rmLink: createRmLink(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/object/index.js
function createObject(client, codecs2) {
  return {
    patch: createPatch(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/lib/pins/normalise-input.js
function isIterable(thing) {
  return Symbol.iterator in thing;
}
function isAsyncIterable6(thing) {
  return Symbol.asyncIterator in thing;
}
function isCID(thing) {
  return CID2.asCID(thing) != null;
}
async function* normaliseInput3(input) {
  if (input === null || input === void 0) {
    throw new CodeError(`Unexpected input: ${input}`, "ERR_UNEXPECTED_INPUT");
  }
  const cid = CID2.asCID(input);
  if (cid != null) {
    yield toPin({ cid });
    return;
  }
  if (typeof input === "string") {
    yield toPin({ path: input });
    return;
  }
  if (input.cid != null || input.path != null) {
    return yield toPin(input);
  }
  if (isIterable(input)) {
    const iterator = input[Symbol.iterator]();
    const first2 = iterator.next();
    if (first2.done === true) {
      return iterator;
    }
    if (isCID(first2.value)) {
      yield toPin({ cid: first2.value });
      for (const cid2 of iterator) {
        yield toPin({ cid: cid2 });
      }
      return;
    }
    if (typeof first2.value === "string") {
      yield toPin({ path: first2.value });
      for (const path of iterator) {
        yield toPin({ path });
      }
      return;
    }
    if (first2.value.cid != null || first2.value.path != null) {
      yield toPin(first2.value);
      for (const obj of iterator) {
        yield toPin(obj);
      }
      return;
    }
    throw new CodeError(`Unexpected input: ${typeof input}`, "ERR_UNEXPECTED_INPUT");
  }
  if (isAsyncIterable6(input)) {
    const iterator = input[Symbol.asyncIterator]();
    const first2 = await iterator.next();
    if (first2.done === true)
      return iterator;
    if (isCID(first2.value)) {
      yield toPin({ cid: first2.value });
      for await (const cid2 of iterator) {
        yield toPin({ cid: cid2 });
      }
      return;
    }
    if (typeof first2.value === "string") {
      yield toPin({ path: first2.value });
      for await (const path of iterator) {
        yield toPin({ path });
      }
      return;
    }
    if (first2.value.cid != null || first2.value.path != null) {
      yield toPin(first2.value);
      for await (const obj of iterator) {
        yield toPin(obj);
      }
      return;
    }
    throw new CodeError(`Unexpected input: ${typeof input}`, "ERR_UNEXPECTED_INPUT");
  }
  throw new CodeError(`Unexpected input: ${typeof input}`, "ERR_UNEXPECTED_INPUT");
}
function toPin(input) {
  const path = input.cid ?? `${input.path}`;
  if (path == null) {
    throw new CodeError("Unexpected input: Please path either a CID or an IPFS path", "ERR_UNEXPECTED_INPUT");
  }
  const pin = {
    path,
    recursive: input.recursive !== false
  };
  if (input.metadata != null) {
    pin.metadata = input.metadata;
  }
  return pin;
}

// node_modules/kubo-rpc-client/dist/src/pin/add-all.js
function createAddAll2(client) {
  return async function* addAll(source2, options = {}) {
    for await (const { path, recursive, metadata } of normaliseInput3(source2)) {
      const res = await client.post("pin/add", {
        signal: options.signal,
        searchParams: toUrlSearchParams({
          ...options,
          arg: path,
          recursive,
          metadata: metadata != null ? JSON.stringify(metadata) : void 0,
          stream: true
        }),
        headers: options.headers
      });
      for await (const pin of res.ndjson()) {
        if (pin.Pins != null) {
          for (const cid of pin.Pins) {
            yield CID2.parse(cid);
          }
          continue;
        }
        yield CID2.parse(pin);
      }
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/add.js
function createAdd3(client) {
  const all2 = createAddAll2(client);
  return async function add(path, options = {}) {
    const res = await src_default4(all2([{
      path: path.toString(),
      ...options
    }], options));
    if (res == null) {
      throw new Error("No response received");
    }
    return res;
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/ls.js
function toPin2(type, cid, metadata) {
  const pin = {
    type,
    cid: CID2.parse(cid)
  };
  if (metadata != null) {
    pin.metadata = metadata;
  }
  return pin;
}
function createLs4(client) {
  return async function* ls(options = {}) {
    let paths = [];
    if (options.paths != null) {
      paths = Array.isArray(options.paths) ? options.paths : [options.paths];
    }
    const res = await client.post("pin/ls", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        ...options,
        arg: paths.map((path) => `${path}`),
        stream: true
      }),
      headers: options.headers
    });
    for await (const pin of res.ndjson()) {
      if (pin.Keys != null) {
        for (const cid of Object.keys(pin.Keys)) {
          yield toPin2(pin.Keys[cid].Type, cid, pin.Keys[cid].Metadata);
        }
        return;
      }
      yield toPin2(pin.Type, pin.Cid, pin.Metadata);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/utils.js
var decodePin = ({ Name: name10, Status: status, Cid: cid }) => {
  return {
    cid: CID2.parse(cid),
    name: name10,
    status
  };
};
var encodeService = (service) => {
  if (typeof service === "string" && service !== "") {
    return service;
  } else {
    throw new TypeError("service name must be passed");
  }
};
var encodeCID5 = (cid) => {
  if (CID2.asCID(cid) != null) {
    return cid.toString();
  } else {
    throw new TypeError(`CID instance expected instead of ${typeof cid}`);
  }
};
var encodeQuery = ({ service, cid, name: name10, status, all: all2 }) => {
  const query = toUrlSearchParams({
    service: encodeService(service),
    name: name10,
    force: all2 === true ? true : void 0
  });
  if (cid != null) {
    for (const value of cid) {
      query.append("cid", encodeCID5(value));
    }
  }
  if (status != null) {
    for (const value of status) {
      query.append("status", value);
    }
  }
  return query;
};
var encodeAddParams = (cid, { service, background, name: name10, origins }) => {
  const params = toUrlSearchParams({
    arg: encodeCID5(cid),
    service: encodeService(service),
    name: name10,
    background: background === true ? true : void 0
  });
  if (origins != null) {
    for (const origin of origins) {
      params.append("origin", origin.toString());
    }
  }
  return params;
};

// node_modules/kubo-rpc-client/dist/src/pin/remote/add.js
function createAdd4(client) {
  return async function add(cid, { timeout, signal, headers, ...query }) {
    const response = await client.post("pin/remote/add", {
      timeout,
      signal,
      headers,
      searchParams: encodeAddParams(cid, query)
    });
    return decodePin(await response.json());
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/ls.js
function createLs5(client) {
  return async function* ls({ timeout, signal, headers, ...query }) {
    const response = await client.post("pin/remote/ls", {
      timeout,
      signal,
      headers,
      searchParams: encodeQuery(query)
    });
    for await (const pin of response.ndjson()) {
      yield decodePin(pin);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/rm-all.js
function createRmAll(client) {
  return async function rmAll({ timeout, signal, headers, ...query }) {
    await client.post("pin/remote/rm", {
      timeout,
      signal,
      headers,
      searchParams: encodeQuery({
        ...query,
        all: true
      })
    });
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/rm.js
function createRm5(client) {
  return async function rm({ timeout, signal, headers, ...query }) {
    await client.post("pin/remote/rm", {
      timeout,
      signal,
      headers,
      searchParams: encodeQuery({
        ...query,
        all: false
      })
    });
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/service/utils.js
function encodeEndpoint(url) {
  const href = String(url);
  if (href === "undefined") {
    throw Error("endpoint is required");
  }
  return href[href.length - 1] === "/" ? href.slice(0, -1) : href;
}
function decodeRemoteService(json) {
  const service = {
    service: json.Service,
    endpoint: new URL(json.ApiEndpoint)
  };
  if (json.Stat != null) {
    service.stat = decodeStat(json.Stat);
  }
  return service;
}
function decodeStat(json) {
  switch (json.Status) {
    case "valid": {
      const { Pinning, Pinned, Queued, Failed } = json.PinCount;
      return {
        status: "valid",
        pinCount: {
          queued: Queued,
          pinning: Pinning,
          pinned: Pinned,
          failed: Failed
        }
      };
    }
    case "invalid": {
      return { status: "invalid" };
    }
    default: {
      return { status: json.Status };
    }
  }
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/service/add.js
function createAdd5(client) {
  return async function add(name10, options) {
    const { endpoint, key, headers, timeout, signal } = options;
    await client.post("pin/remote/service/add", {
      timeout,
      signal,
      searchParams: toUrlSearchParams({
        arg: [name10, encodeEndpoint(endpoint), key]
      }),
      headers
    });
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/service/ls.js
function createLs6(client) {
  return async function ls(options = {}) {
    const { stat, headers, timeout, signal } = options;
    const response = await client.post("pin/remote/service/ls", {
      timeout,
      signal,
      headers,
      searchParams: stat === true ? toUrlSearchParams({ stat }) : void 0
    });
    const json = await response.json();
    return json.RemoteServices.map(decodeRemoteService);
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/service/rm.js
function createRm6(client) {
  return async function rm(name10, options = {}) {
    await client.post("pin/remote/service/rm", {
      signal: options.signal,
      headers: options.headers,
      searchParams: toUrlSearchParams({
        arg: name10
      })
    });
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/service/index.js
function createService(client) {
  return {
    add: createAdd5(client),
    ls: createLs6(client),
    rm: createRm6(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/remote/index.js
function createRemote(client) {
  return {
    add: createAdd4(client),
    ls: createLs5(client),
    rm: createRm5(client),
    rmAll: createRmAll(client),
    service: createService(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/rm-all.js
function createRmAll2(client) {
  return async function* rmAll(source2, options = {}) {
    for await (const { path, recursive } of normaliseInput3(source2)) {
      const searchParams = new URLSearchParams(options.searchParams);
      searchParams.append("arg", `${path}`);
      if (recursive != null)
        searchParams.set("recursive", String(recursive));
      const res = await client.post("pin/rm", {
        signal: options.signal,
        headers: options.headers,
        searchParams: toUrlSearchParams({
          ...options,
          arg: `${path}`,
          recursive
        })
      });
      for await (const pin of res.ndjson()) {
        if (pin.Pins != null) {
          yield* pin.Pins.map((cid) => CID2.parse(cid));
          continue;
        }
        yield CID2.parse(pin);
      }
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/rm.js
function createRm7(client) {
  const all2 = createRmAll2(client);
  return async function rm(path, options = {}) {
    const res = await src_default4(all2([{
      path: path.toString(),
      ...options
    }], options));
    if (res == null) {
      throw new Error("No response received");
    }
    return res;
  };
}

// node_modules/kubo-rpc-client/dist/src/pin/index.js
function createPin(client) {
  return {
    addAll: createAddAll2(client),
    add: createAdd3(client),
    ls: createLs4(client),
    rmAll: createRmAll2(client),
    rm: createRm7(client),
    remote: createRemote(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/ping.js
function createPing(client) {
  return async function* ping(peerId, options = {}) {
    const res = await client.post("ping", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: `${peerId}`,
        ...options
      }),
      headers: options.headers,
      transform: objectToCamel
    });
    yield* res.ndjson();
  };
}

// node_modules/kubo-rpc-client/node_modules/uint8arrays/dist/src/to-string.js
function toString9(array, encoding = "utf8") {
  const base7 = bases_default3[encoding];
  if (base7 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base7.encoder.encode(array).substring(1);
}

// node_modules/kubo-rpc-client/dist/src/lib/http-rpc-wire-format.js
var rpcArrayToTextArray = (strings) => {
  if (Array.isArray(strings)) {
    return strings.map(rpcToText);
  }
  return strings;
};
var rpcToText = (mb) => toString9(rpcToBytes(mb));
var rpcToBytes = (mb) => base64url2.decode(mb);
var rpcToBigInt = (mb) => BigInt(`0x${toString9(base64url2.decode(mb), "base16")}`);
var textToUrlSafeRpc = (text) => base64url2.encode(fromString8(text));

// node_modules/kubo-rpc-client/dist/src/pubsub/ls.js
function createLs7(client) {
  return async function ls(options = {}) {
    const { Strings } = await (await client.post("pubsub/ls", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json();
    return rpcArrayToTextArray(Strings) ?? [];
  };
}

// node_modules/kubo-rpc-client/dist/src/pubsub/peers.js
function createPeers(client) {
  return async function peers(topic, options = {}) {
    const res = await client.post("pubsub/peers", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: textToUrlSafeRpc(topic),
        ...options
      }),
      headers: options.headers
    });
    const { Strings } = await res.json();
    return Strings ?? [];
  };
}

// node_modules/kubo-rpc-client/dist/src/pubsub/publish.js
function createPublish2(client) {
  return async function publish(topic, data, options = {}) {
    const searchParams = toUrlSearchParams({
      arg: textToUrlSafeRpc(topic),
      ...options
    });
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const res = await client.post("pubsub/pub", {
        signal,
        searchParams,
        ...await multipartRequest2([data], controller, options.headers)
      });
      await res.text();
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/pubsub/subscribe.js
var log4 = logger("js-kubo-rpc-client:pubsub:subscribe");
function createSubscribe(client, subsTracker) {
  return async function subscribe(topic, handler, options = {}) {
    options.signal = subsTracker.subscribe(topic, handler, options.signal);
    let done;
    let fail;
    const result = new Promise((resolve2, reject) => {
      done = resolve2;
      fail = reject;
    });
    const ffWorkaround = setTimeout(() => {
      done();
    }, 1e3);
    void client.post("pubsub/sub", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: textToUrlSafeRpc(topic),
        ...options
      }),
      headers: options.headers
    }).catch((err) => {
      subsTracker.unsubscribe(topic, handler);
      fail(err);
    }).then((response) => {
      clearTimeout(ffWorkaround);
      if (response == null) {
        return;
      }
      void readMessages(response, {
        onMessage: (message) => {
          if (handler == null) {
            return;
          }
          if (typeof handler === "function") {
            handler(message);
            return;
          }
          if (typeof handler.handleEvent === "function") {
            handler.handleEvent(message);
          }
        },
        onEnd: () => {
          subsTracker.unsubscribe(topic, handler);
        },
        onError: options.onError
      });
      done();
    });
    return result;
  };
}
async function readMessages(response, { onMessage, onEnd, onError }) {
  onError = onError ?? log4;
  try {
    for await (const msg of response.ndjson()) {
      try {
        if (msg.from == null) {
          continue;
        }
        if (msg.from != null && msg.seqno != null) {
          onMessage({
            type: "signed",
            from: peerIdFromString(msg.from),
            data: rpcToBytes(msg.data),
            sequenceNumber: rpcToBigInt(msg.seqno),
            topic: rpcToText(msg.topicIDs[0]),
            key: rpcToBytes(msg.key ?? "u"),
            signature: rpcToBytes(msg.signature ?? "u")
          });
        } else {
          onMessage({
            type: "unsigned",
            data: rpcToBytes(msg.data),
            topic: rpcToText(msg.topicIDs[0])
          });
        }
      } catch (err) {
        err.message = `Failed to parse pubsub message: ${err.message}`;
        onError(err, false, msg);
      }
    }
  } catch (err) {
    if (!isAbortError(err)) {
      onError(err, true);
    }
  } finally {
    onEnd();
  }
}
var isAbortError = (error) => {
  switch (error.type) {
    case "aborted":
      return true;
    // It is `abort` in Electron instead of `aborted`
    case "abort":
      return true;
    default:
      return error.name === "AbortError";
  }
};

// node_modules/kubo-rpc-client/dist/src/pubsub/subscription-tracker.js
var SubscriptionTracker = class {
  _subs;
  constructor() {
    this._subs = /* @__PURE__ */ new Map();
  }
  subscribe(topic, handler, signal) {
    const topicSubs = this._subs.get(topic) ?? [];
    if (topicSubs.find((s2) => s2.handler === handler) != null) {
      throw new Error(`Already subscribed to ${topic} with this handler`);
    }
    const controller = new AbortController();
    this._subs.set(topic, [{ handler, controller }].concat(topicSubs));
    if (signal != null) {
      signal.addEventListener("abort", () => {
        this.unsubscribe(topic, handler);
      });
    }
    return controller.signal;
  }
  unsubscribe(topic, handler) {
    const subs = this._subs.get(topic) ?? [];
    let unsubs;
    if (handler != null) {
      this._subs.set(topic, subs.filter((s2) => s2.handler !== handler));
      unsubs = subs.filter((s2) => s2.handler === handler);
    } else {
      this._subs.set(topic, []);
      unsubs = subs;
    }
    if ((this._subs.get(topic) ?? []).length === 0) {
      this._subs.delete(topic);
    }
    unsubs.forEach((s2) => {
      s2.controller.abort();
    });
  }
};

// node_modules/kubo-rpc-client/dist/src/pubsub/unsubscribe.js
function createUnsubscribe(client, subsTracker) {
  return async function unsubscribe(topic, handler) {
    subsTracker.unsubscribe(topic, handler);
  };
}

// node_modules/kubo-rpc-client/dist/src/pubsub/index.js
function createPubsub2(client) {
  const subscriptionTracker = new SubscriptionTracker();
  return {
    ls: createLs7(client),
    peers: createPeers(client),
    publish: createPublish2(client),
    subscribe: createSubscribe(client, subscriptionTracker),
    unsubscribe: createUnsubscribe(client, subscriptionTracker)
  };
}

// node_modules/kubo-rpc-client/dist/src/refs/local.js
function createLocal(client) {
  return async function* refsLocal(options = {}) {
    const res = await client.post("refs/local", {
      signal: options.signal,
      transform: objectToCamel,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    yield* res.ndjson();
  };
}

// node_modules/kubo-rpc-client/dist/src/refs/index.js
function createRefs(client) {
  async function* refs(args, options = {}) {
    const argsArr = Array.isArray(args) ? args : [args];
    const res = await client.post("refs", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: argsArr.map((arg) => `${arg instanceof Uint8Array ? CID2.decode(arg) : arg}`),
        ...options
      }),
      headers: options.headers,
      transform: objectToCamel
    });
    yield* res.ndjson();
  }
  return Object.assign(refs, {
    local: createLocal(client)
  });
}

// node_modules/kubo-rpc-client/dist/src/repo/gc.js
function createGc(client) {
  return async function* gc(options = {}) {
    const res = await client.post("repo/gc", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers,
      transform: (res2) => {
        return {
          err: res2.Error != null ? new Error(res2.Error) : null,
          cid: res2.Key?.["/"] != null ? CID2.parse(res2.Key["/"]) : null
        };
      }
    });
    yield* res.ndjson();
  };
}

// node_modules/kubo-rpc-client/dist/src/repo/stat.js
function createStat4(client) {
  return async function stat(options = {}) {
    const res = await client.post("repo/stat", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const data = await res.json();
    return {
      numObjects: BigInt(data.NumObjects),
      repoSize: BigInt(data.RepoSize),
      repoPath: data.RepoPath,
      version: data.Version,
      storageMax: BigInt(data.StorageMax)
    };
  };
}

// node_modules/kubo-rpc-client/dist/src/repo/version.js
function createVersion(client) {
  return async function version(options = {}) {
    const res = await (await client.post("repo/version", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    })).json();
    return res.Version;
  };
}

// node_modules/kubo-rpc-client/dist/src/repo/index.js
function createRepo(client) {
  return {
    gc: createGc(client),
    stat: createStat4(client),
    version: createVersion(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/resolve.js
function createResolve3(client) {
  return async function resolve2(path, options = {}) {
    const res = await client.post("resolve", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: path,
        ...options
      }),
      headers: options.headers
    });
    const { Path } = await res.json();
    return Path;
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/find-peer.js
function createFindPeer(client) {
  return async function* findPeer(peerId, options = {}) {
    const res = await client.post("routing/findpeer", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: peerId.toString(),
        stream: true,
        ...options
      }),
      headers: options.headers
    });
    for await (const event of res.ndjson()) {
      yield mapEvent(event);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/find-provs.js
function createFindProvs(client) {
  return async function* findProvs(cid, options = {}) {
    const res = await client.post("routing/findprovs", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cid.toString(),
        ...options
      }),
      headers: options.headers
    });
    for await (const event of res.ndjson()) {
      yield mapEvent(event);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/get.js
function createGet5(client) {
  return async function* get(key, options = {}) {
    const res = await client.post("routing/get", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: key instanceof Uint8Array ? toString9(key) : key.toString(),
        ...options
      }),
      headers: options.headers
    });
    for await (const event of res.ndjson()) {
      yield mapEvent(event);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/provide.js
function createProvide(client) {
  return async function* provide(cids, options = { recursive: false }) {
    const cidArr = Array.isArray(cids) ? cids : [cids];
    const res = await client.post("routing/provide", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: cidArr.map((cid) => cid.toString()),
        ...options
      }),
      headers: options.headers
    });
    for await (const event of res.ndjson()) {
      yield mapEvent(event);
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/put.js
function createPut3(client) {
  return async function* put(key, value, options = {}) {
    const controller = new AbortController();
    const signal = anySignal([controller.signal, options.signal]);
    try {
      const res = await client.post("routing/put", {
        signal,
        searchParams: toUrlSearchParams({
          arg: key instanceof Uint8Array ? toString9(key) : key.toString(),
          stream: true,
          ...options
        }),
        ...await multipartRequest2([value], controller, options.headers)
      });
      for await (const event of res.ndjson()) {
        yield mapEvent(event);
      }
    } finally {
      signal.clear();
    }
  };
}

// node_modules/kubo-rpc-client/dist/src/routing/index.js
function createRouting(client) {
  return {
    findPeer: createFindPeer(client),
    findProvs: createFindProvs(client),
    get: createGet5(client),
    provide: createProvide(client),
    put: createPut3(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/stats/bw.js
function createBw(client) {
  return async function* bw(options = {}) {
    const res = await client.post("stats/bw", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers,
      transform: (stats) => ({
        totalIn: BigInt(stats.TotalIn),
        totalOut: BigInt(stats.TotalOut),
        rateIn: parseFloat(stats.RateIn),
        rateOut: parseFloat(stats.RateOut)
      })
    });
    yield* res.ndjson();
  };
}

// node_modules/kubo-rpc-client/dist/src/stats/index.js
function createStats(client) {
  return {
    bitswap: createStat(client),
    repo: createStat4(client),
    bw: createBw(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/stop.js
function createStop(client) {
  return async function stop(options = {}) {
    const res = await client.post("shutdown", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    await res.text();
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/addrs.js
function createAddrs(client) {
  return async function addrs(options = {}) {
    const res = await client.post("swarm/addrs", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const { Addrs } = await res.json();
    return Object.keys(Addrs).map((id) => ({
      id: peerIdFromString(id),
      addrs: (Addrs[id] ?? []).map((a) => multiaddr(a))
    }));
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/connect.js
function createConnect(client) {
  return async function connect(addr, options = {}) {
    const res = await client.post("swarm/connect", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    });
    const { Strings } = await res.json();
    return Strings ?? [];
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/disconnect.js
function createDisconnect(client) {
  return async function disconnect(addr, options = {}) {
    const res = await client.post("swarm/disconnect", {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: addr,
        ...options
      }),
      headers: options.headers
    });
    const { Strings } = await res.json();
    return Strings ?? [];
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/local-addrs.js
function createLocalAddrs(client) {
  return async function localAddrs(options = {}) {
    const res = await client.post("swarm/addrs/local", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const { Strings } = await res.json();
    return (Strings ?? []).map((a) => multiaddr(a));
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/peers.js
function createPeers2(client) {
  return async function peers(options = {}) {
    const res = await client.post("swarm/peers", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    const body = await res.json();
    return (body.Peers ?? []).map((peer) => {
      return {
        addr: multiaddr(peer.Addr),
        peer: peerIdFromString(peer.Peer),
        muxer: peer.Muxer,
        latency: peer.Latency,
        streams: peer.Streams,
        // eslint-disable-next-line no-nested-ternary
        direction: peer.Direction == null ? void 0 : peer.Direction === 0 ? "inbound" : "outbound"
      };
    });
  };
}

// node_modules/kubo-rpc-client/dist/src/swarm/index.js
function createSwarm(client) {
  return {
    addrs: createAddrs(client),
    connect: createConnect(client),
    disconnect: createDisconnect(client),
    localAddrs: createLocalAddrs(client),
    peers: createPeers2(client)
  };
}

// node_modules/kubo-rpc-client/dist/src/version.js
function createVersion2(client) {
  return async function version(options = {}) {
    const res = await client.post("version", {
      signal: options.signal,
      searchParams: toUrlSearchParams(options),
      headers: options.headers
    });
    return {
      ...objectToCamel(await res.json()),
      "ipfs-http-client": "1.0.0"
    };
  };
}

// node_modules/kubo-rpc-client/dist/src/client.js
var KuboRPCClient = class {
  bases;
  codecs;
  hashers;
  bitswap;
  block;
  bootstrap;
  config;
  dag;
  dht;
  diag;
  files;
  key;
  log;
  name;
  object;
  pin;
  pubsub;
  refs;
  repo;
  routing;
  stats;
  swarm;
  add;
  addAll;
  cat;
  get;
  ls;
  id;
  version;
  stop;
  ping;
  resolve;
  commands;
  mount;
  isOnline;
  getEndpointConfig;
  constructor(options) {
    const client = new Client(options);
    const id = {
      name: identity4.name,
      code: identity4.code,
      encode: (id2) => id2,
      decode: (id2) => id2
    };
    const multibaseCodecs = Object.values(bases2);
    (options.ipld?.bases ?? []).forEach((base7) => multibaseCodecs.push(base7));
    this.bases = new Multibases({
      bases: multibaseCodecs,
      loadBase: options.ipld?.loadBase
    });
    const blockCodecs = Object.values(codecs);
    [src_exports4, src_exports2, src_exports3, lib_exports, id].concat(options.ipld?.codecs ?? []).forEach((codec) => {
      blockCodecs.push(codec);
    });
    this.codecs = new Multicodecs({
      codecs: blockCodecs,
      loadCodec: options.ipld?.loadCodec
    });
    const multihashHashers = Object.values(hashes2);
    (options.ipld?.hashers ?? []).forEach((hasher) => multihashHashers.push(hasher));
    this.hashers = new Multihashes({
      hashers: multihashHashers,
      loadHasher: options.ipld?.loadHasher
    });
    this.bitswap = createBitswap(client);
    this.block = createBlock(client);
    this.bootstrap = createBootstrap(client);
    this.config = createConfig(client);
    this.dag = createDAG(client, this.codecs);
    this.dht = createDHT(client);
    this.diag = createDiag(client);
    this.files = createFiles(client);
    this.key = createKey(client);
    this.log = createLog(client);
    this.name = createName(client);
    this.object = createObject(client, this.codecs);
    this.pin = createPin(client);
    this.pubsub = createPubsub2(client);
    this.refs = createRefs(client);
    this.repo = createRepo(client);
    this.routing = createRouting(client);
    this.stats = createStats(client);
    this.swarm = createSwarm(client);
    this.add = createAdd(client);
    this.addAll = createAddAll(client);
    this.cat = createCat(client);
    this.get = createGet4(client);
    this.ls = createLs3(client);
    this.id = createId(client);
    this.version = createVersion2(client);
    this.stop = createStop(client);
    this.ping = createPing(client);
    this.resolve = createResolve3(client);
    this.commands = createCommands(client);
    this.mount = createMount(client);
    this.isOnline = createIsOnline(client);
    this.getEndpointConfig = createGetEndpointConfig(client);
  }
};
function createKuboRPCClient(options) {
  return new KuboRPCClient(options);
}

// node_modules/kubo-rpc-client/dist/src/index.js
function create5(options = {}) {
  if (typeof options === "string" || isMultiaddr(options) || options instanceof URL) {
    options = {
      url: options
    };
  }
  return createKuboRPCClient(options);
}
function urlSource(url, options) {
  return {
    path: decodeURIComponent(new URL(url).pathname.split("/").pop() ?? ""),
    content: readURLContent(url, options)
  };
}
async function* readURLContent(url, options) {
  const response = await HTTP.get(url, options);
  yield* response.iterator();
}
