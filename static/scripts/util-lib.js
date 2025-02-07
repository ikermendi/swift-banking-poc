!function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = { default: t() };
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).pmlib = t()
    }
}(function() {
    for (var t, e, i = (t = function(t, n) {
            (function(t) {
                "use strict";
                var i = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                n.Buffer = t, n.INSPECT_MAX_BYTES = 50;
                var s = 2147483647;

                function a(e) {
                    if (e > s) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    var i = new Uint8Array(e);
                    return Object.setPrototypeOf(i, t.prototype), i
                }

                function t(t, e, i) {
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return u(t)
                    }
                    return o(t, e, i)
                }

                function o(e, i, r) {
                    if ("string" == typeof e) return function(e, i) {
                        if ("string" == typeof i && "" !== i || (i = "utf8"), !t.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                        var r = 0 | d(e, i),
                            n = a(r),
                            s = n.write(e, i);
                        return s !== r && (n = n.slice(0, s)), n
                    }(e, i);
                    if (ArrayBuffer.isView(e)) return c(e);
                    if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (K(e, ArrayBuffer) || e && K(e.buffer, ArrayBuffer)) return function(e, i, r) {
                        if (i < 0 || e.byteLength < i) throw new RangeError('"offset" is outside of buffer bounds');
                        if (e.byteLength < i + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        var n;
                        return n = void 0 === i && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, i) : new Uint8Array(e, i, r), Object.setPrototypeOf(n, t.prototype), n
                    }(e, i, r);
                    if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var n = e.valueOf && e.valueOf();
                    if (null != n && n !== e) return t.from(n, i, r);
                    var s = function(e) {
                        if (t.isBuffer(e)) {
                            var i = 0 | l(e.length),
                                r = a(i);
                            return 0 === r.length ? r : (e.copy(r, 0, 0, i), r)
                        }
                        return void 0 !== e.length ? "number" != typeof e.length || k(e.length) ? a(0) : c(e) : "Buffer" === e.type && Array.isArray(e.data) ? c(e.data) : void 0
                    }(e);
                    if (s) return s;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return t.from(e[Symbol.toPrimitive]("string"), i, r);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function h(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function u(t) {
                    return h(t), a(t < 0 ? 0 : 0 | l(t))
                }

                function c(t) {
                    for (var e = t.length < 0 ? 0 : 0 | l(t.length), i = a(e), r = 0; r < e; r += 1) i[r] = 255 & t[r];
                    return i
                }

                function l(t) {
                    if (t >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
                    return 0 | t
                }

                function d(e, i) {
                    if (t.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || K(e, ArrayBuffer)) return e.byteLength;
                    if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    var r = e.length,
                        n = arguments.length > 2 && !0 === arguments[2];
                    if (!n && 0 === r) return 0;
                    for (var s = !1;;) switch (i) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                            return O(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return V(e).length;
                        default:
                            if (s) return n ? -1 : O(e).length;
                            i = ("" + i).toLowerCase(), s = !0
                    }
                }

                function g(t, e, i) {
                    var r = t[e];
                    t[e] = t[i], t[i] = r
                }

                function p(e, i, r, n, s) {
                    if (0 === e.length) return -1;
                    if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), k(r = +r) && (r = s ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                        if (s) return -1;
                        r = e.length - 1
                    } else if (r < 0) {
                        if (!s) return -1;
                        r = 0
                    }
                    if ("string" == typeof i && (i = t.from(i, n)), t.isBuffer(i)) return 0 === i.length ? -1 : y(e, i, r, n, s);
                    if ("number" == typeof i) return i &= 255, "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, i, r) : Uint8Array.prototype.lastIndexOf.call(e, i, r) : y(e, [i], r, n, s);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function y(t, e, i, r, n) {
                    var s, a = 1,
                        o = t.length,
                        h = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        a = 2, o /= 2, h /= 2, i /= 2
                    }

                    function u(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a)
                    }
                    if (n) {
                        var c = -1;
                        for (s = i; s < o; s++)
                            if (u(t, s) === u(e, -1 === c ? 0 : s - c)) {
                                if (-1 === c && (c = s), s - c + 1 === h) return c * a
                            } else - 1 !== c && (s -= s - c), c = -1
                    } else
                        for (i + h > o && (i = o - h), s = i; s >= 0; s--) {
                            for (var l = !0, f = 0; f < h; f++)
                                if (u(t, s + f) !== u(e, f)) {
                                    l = !1;
                                    break
                                } if (l) return s
                        }
                    return -1
                }

                function v(t, e, i, r) {
                    i = Number(i) || 0;
                    var n = t.length - i;
                    r ? (r = Number(r)) > n && (r = n) : r = n;
                    var s = e.length;
                    r > s / 2 && (r = s / 2);
                    for (var a = 0; a < r; ++a) {
                        var o = parseInt(e.substr(2 * a, 2), 16);
                        if (k(o)) return a;
                        t[i + a] = o
                    }
                    return a
                }

                function m(t, e, i, r) {
                    return L(O(e, t.length - i), t, i, r)
                }

                function S(t, e, i, r) {
                    return L(function(t) {
                        for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                        return e
                    }(e), t, i, r)
                }

                function F(t, e, i, r) {
                    return S(t, e, i, r)
                }

                function x(t, e, i, r) {
                    return L(V(e), t, i, r)
                }

                function b(t, e, i, r) {
                    return L(function(t, e) {
                        for (var i, r, n, s = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) r = (i = t.charCodeAt(a)) >> 8, n = i % 256, s.push(n), s.push(r);
                        return s
                    }(e, t.length - i), t, i, r)
                }

                function E(t, e, i) {
                    return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i))
                }

                function w(t, e, i) {
                    i = Math.min(t.length, i);
                    for (var r = [], n = e; n < i;) {
                        var s, a, o, h, u = t[n],
                            c = null,
                            l = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (n + l <= i) switch (l) {
                            case 1:
                                u < 128 && (c = u);
                                break;
                            case 2:
                                128 == (192 & (s = t[n + 1])) && (h = (31 & u) << 6 | 63 & s) > 127 && (c = h);
                                break;
                            case 3:
                                s = t[n + 1], a = t[n + 2], 128 == (192 & s) && 128 == (192 & a) && (h = (15 & u) << 12 | (63 & s) << 6 | 63 & a) > 2047 && (h < 55296 || h > 57343) && (c = h);
                                break;
                            case 4:
                                s = t[n + 1], a = t[n + 2], o = t[n + 3], 128 == (192 & s) && 128 == (192 & a) && 128 == (192 & o) && (h = (15 & u) << 18 | (63 & s) << 12 | (63 & a) << 6 | 63 & o) > 65535 && h < 1114112 && (c = h)
                        }
                        null === c ? (c = 65533, l = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), n += l
                    }
                    return function(t) {
                        var e = t.length;
                        if (e <= A) return String.fromCharCode.apply(String, t);
                        for (var i = "", r = 0; r < e;) i += String.fromCharCode.apply(String, t.slice(r, r += A));
                        return i
                    }(r)
                }
                t.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        var t = new Uint8Array(1),
                            i = {
                                foo: function() {
                                    return 42
                                }
                            };
                        return Object.setPrototypeOf(i, Uint8Array.prototype), Object.setPrototypeOf(t, i), 42 === t.foo()
                    } catch (e) {
                        return !1
                    }
                }(), t.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(t.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (t.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(t.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (t.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), t.poolSize = 8192, t.from = function(t, e, i) {
                    return o(t, e, i)
                }, Object.setPrototypeOf(t.prototype, Uint8Array.prototype), Object.setPrototypeOf(t, Uint8Array), t.alloc = function(t, e, i) {
                    return function(t, e, i) {
                        return h(t), t <= 0 ? a(t) : void 0 !== e ? "string" == typeof i ? a(t).fill(e, i) : a(t).fill(e) : a(t)
                    }(t, e, i)
                }, t.allocUnsafe = function(t) {
                    return u(t)
                }, t.allocUnsafeSlow = function(t) {
                    return u(t)
                }, t.isBuffer = function(e) {
                    return null != e && !0 === e._isBuffer && e !== t.prototype
                }, t.compare = function(e, i) {
                    if (K(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), K(i, Uint8Array) && (i = t.from(i, i.offset, i.byteLength)), !t.isBuffer(e) || !t.isBuffer(i)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === i) return 0;
                    for (var r = e.length, n = i.length, s = 0, a = Math.min(r, n); s < a; ++s)
                        if (e[s] !== i[s]) {
                            r = e[s], n = i[s];
                            break
                        } return r < n ? -1 : n < r ? 1 : 0
                }, t.isEncoding = function(t) {
                    switch (String(t).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, t.concat = function(e, i) {
                    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return t.alloc(0);
                    var r;
                    if (void 0 === i)
                        for (i = 0, r = 0; r < e.length; ++r) i += e[r].length;
                    var n = t.allocUnsafe(i),
                        s = 0;
                    for (r = 0; r < e.length; ++r) {
                        var a = e[r];
                        if (K(a, Uint8Array) && (a = t.from(a)), !t.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                        a.copy(n, s), s += a.length
                    }
                    return n
                }, t.byteLength = d, t.prototype._isBuffer = !0, t.prototype.swap16 = function() {
                    var t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var e = 0; e < t; e += 2) g(this, e, e + 1);
                    return this
                }, t.prototype.swap32 = function() {
                    var t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
                    return this
                }, t.prototype.swap64 = function() {
                    var t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
                    return this
                }, t.prototype.toString = function() {
                    var t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? w(this, 0, t) : function(t, e, i) {
                        var r = !1;
                        if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                        if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
                        if ((i >>>= 0) <= (e >>>= 0)) return "";
                        for (t || (t = "utf8");;) switch (t) {
                            case "hex":
                                return I(this, e, i);
                            case "utf8":
                            case "utf-8":
                                return w(this, e, i);
                            case "ascii":
                                return C(this, e, i);
                            case "latin1":
                            case "binary":
                                return D(this, e, i);
                            case "base64":
                                return E(this, e, i);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return T(this, e, i);
                            default:
                                if (r) throw new TypeError("Unknown encoding: " + t);
                                t = (t + "").toLowerCase(), r = !0
                        }
                    }.apply(this, arguments)
                }, t.prototype.toLocaleString = t.prototype.toString, t.prototype.equals = function(e) {
                    if (!t.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === t.compare(this, e)
                }, t.prototype.inspect = function() {
                    var t = "",
                        e = n.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">"
                }, i && (t.prototype[i] = t.prototype.inspect), t.prototype.compare = function(e, i, r, n, s) {
                    if (K(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), !t.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === i && (i = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === s && (s = this.length), i < 0 || r > e.length || n < 0 || s > this.length) throw new RangeError("out of range index");
                    if (n >= s && i >= r) return 0;
                    if (n >= s) return -1;
                    if (i >= r) return 1;
                    if (this === e) return 0;
                    for (var a = (s >>>= 0) - (n >>>= 0), o = (r >>>= 0) - (i >>>= 0), h = Math.min(a, o), u = this.slice(n, s), c = e.slice(i, r), l = 0; l < h; ++l)
                        if (u[l] !== c[l]) {
                            a = u[l], o = c[l];
                            break
                        } return a < o ? -1 : o < a ? 1 : 0
                }, t.prototype.includes = function(t, e, i) {
                    return -1 !== this.indexOf(t, e, i)
                }, t.prototype.indexOf = function(t, e, i) {
                    return p(this, t, e, i, !0)
                }, t.prototype.lastIndexOf = function(t, e, i) {
                    return p(this, t, e, i, !1)
                }, t.prototype.write = function(t, e, i, r) {
                    if (void 0 === e) r = "utf8", i = this.length, e = 0;
                    else if (void 0 === i && "string" == typeof e) r = e, i = this.length, e = 0;
                    else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e >>>= 0, isFinite(i) ? (i >>>= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
                    }
                    var n = this.length - e;
                    if ((void 0 === i || i > n) && (i = n), t.length > 0 && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    for (var s = !1;;) switch (r) {
                        case "hex":
                            return v(this, t, e, i);
                        case "utf8":
                        case "utf-8":
                            return m(this, t, e, i);
                        case "ascii":
                            return S(this, t, e, i);
                        case "latin1":
                        case "binary":
                            return F(this, t, e, i);
                        case "base64":
                            return x(this, t, e, i);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return b(this, t, e, i);
                        default:
                            if (s) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), s = !0
                    }
                }, t.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var A = 4096;

                function C(t, e, i) {
                    var r = "";
                    i = Math.min(t.length, i);
                    for (var n = e; n < i; ++n) r += String.fromCharCode(127 & t[n]);
                    return r
                }

                function D(t, e, i) {
                    var r = "";
                    i = Math.min(t.length, i);
                    for (var n = e; n < i; ++n) r += String.fromCharCode(t[n]);
                    return r
                }

                function I(t, e, i) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!i || i < 0 || i > r) && (i = r);
                    for (var n = "", s = e; s < i; ++s) n += M[t[s]];
                    return n
                }

                function T(t, e, i) {
                    for (var r = t.slice(e, i), n = "", s = 0; s < r.length; s += 2) n += String.fromCharCode(r[s] + 256 * r[s + 1]);
                    return n
                }

                function B(t, e, i) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
                }

                function H(e, i, r, n, s, a) {
                    if (!t.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (i > s || i < a) throw new RangeError('"value" argument is out of bounds');
                    if (r + n > e.length) throw new RangeError("Index out of range")
                }

                function P(t, e, i, r, n, s) {
                    if (i + r > t.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("Index out of range")
                }

                function R(t, e, i, r, n) {
                    return e = +e, i >>>= 0, n || P(t, 0, i, 4), f.write(t, e, i, r, 23, 4), i + 4
                }

                function N(t, e, i, r, n) {
                    return e = +e, i >>>= 0, n || P(t, 0, i, 8), f.write(t, e, i, r, 52, 8), i + 8
                }
                t.prototype.slice = function(e, i) {
                    var r = this.length;
                    (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (i = void 0 === i ? r : ~~i) < 0 ? (i += r) < 0 && (i = 0) : i > r && (i = r), i < e && (i = e);
                    var n = this.subarray(e, i);
                    return Object.setPrototypeOf(n, t.prototype), n
                }, t.prototype.readUIntLE = function(t, e, i) {
                    t >>>= 0, e >>>= 0, i || B(t, e, this.length);
                    for (var r = this[t], n = 1, s = 0; ++s < e && (n *= 256);) r += this[t + s] * n;
                    return r
                }, t.prototype.readUIntBE = function(t, e, i) {
                    t >>>= 0, e >>>= 0, i || B(t, e, this.length);
                    for (var r = this[t + --e], n = 1; e > 0 && (n *= 256);) r += this[t + --e] * n;
                    return r
                }, t.prototype.readUInt8 = function(t, e) {
                    return t >>>= 0, e || B(t, 1, this.length), this[t]
                }, t.prototype.readUInt16LE = function(t, e) {
                    return t >>>= 0, e || B(t, 2, this.length), this[t] | this[t + 1] << 8
                }, t.prototype.readUInt16BE = function(t, e) {
                    return t >>>= 0, e || B(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, t.prototype.readUInt32LE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, t.prototype.readUInt32BE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, t.prototype.readIntLE = function(t, e, i) {
                    t >>>= 0, e >>>= 0, i || B(t, e, this.length);
                    for (var r = this[t], n = 1, s = 0; ++s < e && (n *= 256);) r += this[t + s] * n;
                    return r >= (n *= 128) && (r -= Math.pow(2, 8 * e)), r
                }, t.prototype.readIntBE = function(t, e, i) {
                    t >>>= 0, e >>>= 0, i || B(t, e, this.length);
                    for (var r = e, n = 1, s = this[t + --r]; r > 0 && (n *= 256);) s += this[t + --r] * n;
                    return s >= (n *= 128) && (s -= Math.pow(2, 8 * e)), s
                }, t.prototype.readInt8 = function(t, e) {
                    return t >>>= 0, e || B(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, t.prototype.readInt16LE = function(t, e) {
                    t >>>= 0, e || B(t, 2, this.length);
                    var i = this[t] | this[t + 1] << 8;
                    return 32768 & i ? 4294901760 | i : i
                }, t.prototype.readInt16BE = function(t, e) {
                    t >>>= 0, e || B(t, 2, this.length);
                    var i = this[t + 1] | this[t] << 8;
                    return 32768 & i ? 4294901760 | i : i
                }, t.prototype.readInt32LE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, t.prototype.readInt32BE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, t.prototype.readFloatLE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), f.read(this, t, !0, 23, 4)
                }, t.prototype.readFloatBE = function(t, e) {
                    return t >>>= 0, e || B(t, 4, this.length), f.read(this, t, !1, 23, 4)
                }, t.prototype.readDoubleLE = function(t, e) {
                    return t >>>= 0, e || B(t, 8, this.length), f.read(this, t, !0, 52, 8)
                }, t.prototype.readDoubleBE = function(t, e) {
                    return t >>>= 0, e || B(t, 8, this.length), f.read(this, t, !1, 52, 8)
                }, t.prototype.writeUIntLE = function(t, e, i, r) {
                    t = +t, e >>>= 0, i >>>= 0, r || H(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                    var n = 1,
                        s = 0;
                    for (this[e] = 255 & t; ++s < i && (n *= 256);) this[e + s] = t / n & 255;
                    return e + i
                }, t.prototype.writeUIntBE = function(t, e, i, r) {
                    t = +t, e >>>= 0, i >>>= 0, r || H(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                    var n = i - 1,
                        s = 1;
                    for (this[e + n] = 255 & t; --n >= 0 && (s *= 256);) this[e + n] = t / s & 255;
                    return e + i
                }, t.prototype.writeUInt8 = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
                }, t.prototype.writeUInt16LE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, t.prototype.writeUInt16BE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, t.prototype.writeUInt32LE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
                }, t.prototype.writeUInt32BE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, t.prototype.writeIntLE = function(t, e, i, r) {
                    if (t = +t, e >>>= 0, !r) {
                        var n = Math.pow(2, 8 * i - 1);
                        H(this, t, e, i, n - 1, -n)
                    }
                    var s = 0,
                        a = 1,
                        o = 0;
                    for (this[e] = 255 & t; ++s < i && (a *= 256);) t < 0 && 0 === o && 0 !== this[e + s - 1] && (o = 1), this[e + s] = (t / a >> 0) - o & 255;
                    return e + i
                }, t.prototype.writeIntBE = function(t, e, i, r) {
                    if (t = +t, e >>>= 0, !r) {
                        var n = Math.pow(2, 8 * i - 1);
                        H(this, t, e, i, n - 1, -n)
                    }
                    var s = i - 1,
                        a = 1,
                        o = 0;
                    for (this[e + s] = 255 & t; --s >= 0 && (a *= 256);) t < 0 && 0 === o && 0 !== this[e + s + 1] && (o = 1), this[e + s] = (t / a >> 0) - o & 255;
                    return e + i
                }, t.prototype.writeInt8 = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, t.prototype.writeInt16LE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, t.prototype.writeInt16BE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, t.prototype.writeInt32LE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
                }, t.prototype.writeInt32BE = function(t, e, i) {
                    return t = +t, e >>>= 0, i || H(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, t.prototype.writeFloatLE = function(t, e, i) {
                    return R(this, t, e, !0, i)
                }, t.prototype.writeFloatBE = function(t, e, i) {
                    return R(this, t, e, !1, i)
                }, t.prototype.writeDoubleLE = function(t, e, i) {
                    return N(this, t, e, !0, i)
                }, t.prototype.writeDoubleBE = function(t, e, i) {
                    return N(this, t, e, !1, i)
                }, t.prototype.copy = function(e, i, r, n) {
                    if (!t.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                    if (r || (r = 0), n || 0 === n || (n = this.length), i >= e.length && (i = e.length), i || (i = 0), n > 0 && n < r && (n = r), n === r) return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if (i < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length), e.length - i < n - r && (n = e.length - i + r);
                    var s = n - r;
                    if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(i, r, n);
                    else if (this === e && r < i && i < n)
                        for (var a = s - 1; a >= 0; --a) e[a + i] = this[a + r];
                    else Uint8Array.prototype.set.call(e, this.subarray(r, n), i);
                    return s
                }, t.prototype.fill = function(e, i, r, n) {
                    if ("string" == typeof e) {
                        if ("string" == typeof i ? (n = i, i = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !t.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                        if (1 === e.length) {
                            var s = e.charCodeAt(0);
                            ("utf8" === n && s < 128 || "latin1" === n) && (e = s)
                        }
                    } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
                    if (i < 0 || this.length < i || this.length < r) throw new RangeError("Out of range index");
                    if (r <= i) return this;
                    var a;
                    if (i >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e)
                        for (a = i; a < r; ++a) this[a] = e;
                    else {
                        var o = t.isBuffer(e) ? e : t.from(e, n),
                            h = o.length;
                        if (0 === h) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (a = 0; a < r - i; ++a) this[a + i] = o[a % h]
                    }
                    return this
                };
                var j = /[^+\/0-9A-Za-z-_]/g;

                function O(t, e) {
                    var i;
                    e = e || 1 / 0;
                    for (var r = t.length, n = null, s = [], a = 0; a < r; ++a) {
                        if ((i = t.charCodeAt(a)) > 55295 && i < 57344) {
                            if (!n) {
                                if (i > 56319) {
                                    (e -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === r) {
                                    (e -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                n = i;
                                continue
                            }
                            if (i < 56320) {
                                (e -= 3) > -1 && s.push(239, 191, 189), n = i;
                                continue
                            }
                            i = 65536 + (n - 55296 << 10 | i - 56320)
                        } else n && (e -= 3) > -1 && s.push(239, 191, 189);
                        if (n = null, i < 128) {
                            if ((e -= 1) < 0) break;
                            s.push(i)
                        } else if (i < 2048) {
                            if ((e -= 2) < 0) break;
                            s.push(i >> 6 | 192, 63 & i | 128)
                        } else if (i < 65536) {
                            if ((e -= 3) < 0) break;
                            s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                        } else {
                            if (!(i < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                        }
                    }
                    return s
                }

                function V(t) {
                    return r.toByteArray(function(t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(j, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function L(t, e, i, r) {
                    for (var n = 0; n < r && !(n + i >= e.length || n >= t.length); ++n) e[n + i] = t[n];
                    return n
                }

                function K(t, e) {
                    return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
                }

                function k(t) {
                    return t != t
                }
                var M = function() {
                    for (var t = new Array(256), e = 0; e < 16; ++e)
                        for (var i = 16 * e, r = 0; r < 16; ++r) t[i + r] = "0123456789abcdef" [e] + "0123456789abcdef" [r];
                    return t
                }()
            }).call(this, i({}).Buffer)
        }, function(i) {
            return e || t(e = {
                exports: {},
                parent: i
            }, e.exports), e.exports
        }), r = {
            toByteArray: function(t) {
                var e, i, r = c(t),
                    n = r[0],
                    o = r[1],
                    h = new a(function(t, e, i) {
                        return 3 * (e + i) / 4 - i
                    }(0, n, o)),
                    u = 0,
                    l = o > 0 ? n - 4 : n;
                for (i = 0; i < l; i += 4) e = s[t.charCodeAt(i)] << 18 | s[t.charCodeAt(i + 1)] << 12 | s[t.charCodeAt(i + 2)] << 6 | s[t.charCodeAt(i + 3)], h[u++] = e >> 16 & 255, h[u++] = e >> 8 & 255, h[u++] = 255 & e;
                return 2 === o && (e = s[t.charCodeAt(i)] << 2 | s[t.charCodeAt(i + 1)] >> 4, h[u++] = 255 & e), 1 === o && (e = s[t.charCodeAt(i)] << 10 | s[t.charCodeAt(i + 1)] << 4 | s[t.charCodeAt(i + 2)] >> 2, h[u++] = e >> 8 & 255, h[u++] = 255 & e), h
            },
            fromByteArray: function(t) {
                for (var e, i = t.length, r = i % 3, s = [], a = 0, o = i - r; a < o; a += 16383) s.push(l(t, a, a + 16383 > o ? o : a + 16383));
                return 1 === r ? (e = t[i - 1], s.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === r && (e = (t[i - 2] << 8) + t[i - 1], s.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "=")), s.join("")
            }
        }, n = [], s = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, u = o.length; h < u; ++h) n[h] = o[h], s[o.charCodeAt(h)] = h;

    function c(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var i = t.indexOf("=");
        return -1 === i && (i = e), [i, i === e ? 0 : 4 - i % 4]
    }

    function l(t, e, i) {
        for (var r, s, a = [], o = e; o < i; o += 3) r = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), a.push(n[(s = r) >> 18 & 63] + n[s >> 12 & 63] + n[s >> 6 & 63] + n[63 & s]);
        return a.join("")
    }
    s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63;
    var f = {
            read: function(t, e, i, r, n) {
                var s, a, o = 8 * n - r - 1,
                    h = (1 << o) - 1,
                    u = h >> 1,
                    c = -7,
                    l = i ? n - 1 : 0,
                    f = i ? -1 : 1,
                    d = t[e + l];
                for (l += f, s = d & (1 << -c) - 1, d >>= -c, c += o; c > 0; s = 256 * s + t[e + l], l += f, c -= 8);
                for (a = s & (1 << -c) - 1, s >>= -c, c += r; c > 0; a = 256 * a + t[e + l], l += f, c -= 8);
                if (0 === s) s = 1 - u;
                else {
                    if (s === h) return a ? NaN : 1 / 0 * (d ? -1 : 1);
                    a += Math.pow(2, r), s -= u
                }
                return (d ? -1 : 1) * a * Math.pow(2, s - r)
            },
            write: function(t, e, i, r, n, s) {
                var a, o, h, u = 8 * s - n - 1,
                    c = (1 << u) - 1,
                    l = c >> 1,
                    f = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    d = r ? 0 : s - 1,
                    g = r ? 1 : -1,
                    p = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, a = c) : (a = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), (e += a + l >= 1 ? f / h : f * Math.pow(2, 1 - l)) * h >= 2 && (a++, h /= 2), a + l >= c ? (o = 0, a = c) : a + l >= 1 ? (o = (e * h - 1) * Math.pow(2, n), a += l) : (o = e * Math.pow(2, l - 1) * Math.pow(2, n), a = 0)); n >= 8; t[i + d] = 255 & o, d += g, o /= 256, n -= 8);
                for (a = a << n | o, u += n; u > 0; t[i + d] = 255 & a, d += g, a /= 256, u -= 8);
                t[i + d - g] |= 128 * p
            }
        },
        d = {};
    (function(t) {
        var e = {
                userAgent: !1
            },
            i = {};
        if (void 0 === r) var r = {};
        r.lang = {
            extend: function(t, i, r) {
                if (!i || !t) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var n = function() {};
                if (n.prototype = i.prototype, t.prototype = new n, t.prototype.constructor = t, t.superclass = i.prototype, i.prototype.constructor == Object.prototype.constructor && (i.prototype.constructor = i), r) {
                    var a;
                    for (a in r) t.prototype[a] = r[a];
                    var o = function() {},
                        h = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(e.userAgent) && (o = function(t, e) {
                            for (a = 0; a < h.length; a += 1) {
                                var i = h[a],
                                    r = e[i];
                                "function" == typeof r && r != Object.prototype[i] && (t[i] = r)
                            }
                        })
                    } catch (s) {}
                    o(t.prototype, r)
                }
            }
        };
        var n, s, a, o, h, u, c, l, f, g, p, y = y || (n = Math, a = (s = {}).lib = {}, o = a.Base = function() {
            function t() {}
            return {
                extend: function(e) {
                    t.prototype = this;
                    var i = new t;
                    return e && i.mixIn(e), i.hasOwnProperty("init") || (i.init = function() {
                        i.$super.init.apply(this, arguments)
                    }), i.init.prototype = i, i.$super = this, i
                },
                create: function() {
                    var t = this.extend();
                    return t.init.apply(t, arguments), t
                },
                init: function() {},
                mixIn: function(t) {
                    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString)
                },
                clone: function() {
                    return this.init.prototype.extend(this)
                }
            }
        }(), h = a.WordArray = o.extend({
            init: function(t, e) {
                t = this.words = t || [], this.sigBytes = null != e ? e : 4 * t.length
            },
            toString: function(t) {
                return (t || c).stringify(this)
            },
            concat: function(t) {
                var e = this.words,
                    i = t.words,
                    r = this.sigBytes,
                    n = t.sigBytes;
                if (this.clamp(), r % 4)
                    for (var s = 0; s < n; s++) {
                        var a = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                        e[r + s >>> 2] |= a << 24 - (r + s) % 4 * 8
                    } else
                        for (s = 0; s < n; s += 4) e[r + s >>> 2] = i[s >>> 2];
                return this.sigBytes += n, this
            },
            clamp: function() {
                var t = this.words,
                    e = this.sigBytes;
                t[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, t.length = n.ceil(e / 4)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0), t
            },
            random: function(t) {
                for (var e = [], i = 0; i < t; i += 4) e.push(4294967296 * n.random() | 0);
                return new h.init(e, t)
            }
        }), u = s.enc = {}, c = u.Hex = {
            stringify: function(t) {
                for (var e = t.words, i = t.sigBytes, r = [], n = 0; n < i; n++) {
                    var s = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    r.push((s >>> 4).toString(16)), r.push((15 & s).toString(16))
                }
                return r.join("")
            },
            parse: function(t) {
                for (var e = t.length, i = [], r = 0; r < e; r += 2) i[r >>> 3] |= parseInt(t.substr(r, 2), 16) << 24 - r % 8 * 4;
                return new h.init(i, e / 2)
            }
        }, l = u.Latin1 = {
            stringify: function(t) {
                for (var e = t.words, i = t.sigBytes, r = [], n = 0; n < i; n++) {
                    var s = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                    r.push(String.fromCharCode(s))
                }
                return r.join("")
            },
            parse: function(t) {
                for (var e = t.length, i = [], r = 0; r < e; r++) i[r >>> 2] |= (255 & t.charCodeAt(r)) << 24 - r % 4 * 8;
                return new h.init(i, e)
            }
        }, f = u.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(l.stringify(t)))
                } catch (e) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            parse: function(t) {
                return l.parse(unescape(encodeURIComponent(t)))
            }
        }, g = a.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = new h.init, this._nDataBytes = 0
            },
            _append: function(t) {
                "string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
            },
            _process: function(t) {
                var e = this._data,
                    i = e.words,
                    r = e.sigBytes,
                    s = this.blockSize,
                    a = r / (4 * s),
                    o = (a = t ? n.ceil(a) : n.max((0 | a) - this._minBufferSize, 0)) * s,
                    u = n.min(4 * o, r);
                if (o) {
                    for (var c = 0; c < o; c += s) this._doProcessBlock(i, c);
                    var l = i.splice(0, o);
                    e.sigBytes -= u
                }
                return new h.init(l, u)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(), t
            },
            _minBufferSize: 0
        }), a.Hasher = g.extend({
            cfg: o.extend(),
            init: function(t) {
                this.cfg = this.cfg.extend(t), this.reset()
            },
            reset: function() {
                g.reset.call(this), this._doReset()
            },
            update: function(t) {
                return this._append(t), this._process(), this
            },
            finalize: function(t) {
                return t && this._append(t), this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(t) {
                return function(e, i) {
                    return new t.init(i).finalize(e)
                }
            },
            _createHmacHelper: function(t) {
                return function(e, i) {
                    return new p.HMAC.init(t, i).finalize(e)
                }
            }
        }), p = s.algo = {}, s);
        ! function(t) {
            var e, i = (e = y).lib,
                r = i.Base,
                n = i.WordArray;
            (e = e.x64 = {}).Word = r.extend({
                init: function(t, e) {
                    this.high = t, this.low = e
                }
            }), e.WordArray = r.extend({
                init: function(t, e) {
                    t = this.words = t || [], this.sigBytes = null != e ? e : 8 * t.length
                },
                toX32: function() {
                    for (var t = this.words, e = t.length, i = [], r = 0; r < e; r++) {
                        var s = t[r];
                        i.push(s.high), i.push(s.low)
                    }
                    return n.create(i, this.sigBytes)
                },
                clone: function() {
                    for (var t = r.clone.call(this), e = t.words = this.words.slice(0), i = e.length, n = 0; n < i; n++) e[n] = e[n].clone();
                    return t
                }
            })
        }(), y.lib.Cipher || function(t) {
                var e = (d = y).lib,
                    i = e.Base,
                    r = e.WordArray,
                    n = e.BufferedBlockAlgorithm,
                    s = d.enc.Base64,
                    a = d.algo.EvpKDF,
                    o = e.Cipher = n.extend({
                        cfg: i.extend(),
                        createEncryptor: function(t, e) {
                            return this.create(this._ENC_XFORM_MODE, t, e)
                        },
                        createDecryptor: function(t, e) {
                            return this.create(this._DEC_XFORM_MODE, t, e)
                        },
                        init: function(t, e, i) {
                            this.cfg = this.cfg.extend(i), this._xformMode = t, this._key = e, this.reset()
                        },
                        reset: function() {
                            n.reset.call(this), this._doReset()
                        },
                        process: function(t) {
                            return this._append(t), this._process()
                        },
                        finalize: function(t) {
                            return t && this._append(t), this._doFinalize()
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function(t) {
                            return {
                                encrypt: function(e, i, r) {
                                    return ("string" == typeof i ? g : f).encrypt(t, e, i, r)
                                },
                                decrypt: function(e, i, r) {
                                    return ("string" == typeof i ? g : f).decrypt(t, e, i, r)
                                }
                            }
                        }
                    });
                e.StreamCipher = o.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                });
                var h = d.mode = {},
                    u = function(t, e, i) {
                        var r = this._iv;
                        r ? this._iv = void 0 : r = this._prevBlock;
                        for (var n = 0; n < i; n++) t[e + n] ^= r[n]
                    },
                    c = (e.BlockCipherMode = i.extend({
                        createEncryptor: function(t, e) {
                            return this.Encryptor.create(t, e)
                        },
                        createDecryptor: function(t, e) {
                            return this.Decryptor.create(t, e)
                        },
                        init: function(t, e) {
                            this._cipher = t, this._iv = e
                        }
                    })).extend();
                c.Encryptor = c.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                            r = i.blockSize;
                        u.call(this, t, e, r), i.encryptBlock(t, e), this._prevBlock = t.slice(e, e + r)
                    }
                }), c.Decryptor = c.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                            r = i.blockSize,
                            n = t.slice(e, e + r);
                        i.decryptBlock(t, e), u.call(this, t, e, r), this._prevBlock = n
                    }
                }), h = h.CBC = c, c = (d.pad = {}).Pkcs7 = {
                    pad: function(t, e) {
                        for (var i, n = (i = (i = 4 * e) - t.sigBytes % i) << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4) s.push(n);
                        i = r.create(s, i), t.concat(i)
                    },
                    unpad: function(t) {
                        t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2]
                    }
                }, e.BlockCipher = o.extend({
                    cfg: o.cfg.extend({
                        mode: h,
                        padding: c
                    }),
                    reset: function() {
                        o.reset.call(this);
                        var t = (e = this.cfg).iv,
                            e = e.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var i = e.createEncryptor;
                        else i = e.createDecryptor, this._minBufferSize = 1;
                        this._mode = i.call(e, this, t && t.words)
                    },
                    _doProcessBlock: function(t, e) {
                        this._mode.processBlock(t, e)
                    },
                    _doFinalize: function() {
                        var t = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            t.pad(this._data, this.blockSize);
                            var e = this._process(!0)
                        } else e = this._process(!0), t.unpad(e);
                        return e
                    },
                    blockSize: 4
                });
                var l = e.CipherParams = i.extend({
                        init: function(t) {
                            this.mixIn(t)
                        },
                        toString: function(t) {
                            return (t || this.formatter).stringify(this)
                        }
                    }),
                    f = (h = (d.format = {}).OpenSSL = {
                        stringify: function(t) {
                            var e = t.ciphertext;
                            return ((t = t.salt) ? r.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(s)
                        },
                        parse: function(t) {
                            var e = (t = s.parse(t)).words;
                            if (1398893684 == e[0] && 1701076831 == e[1]) {
                                var i = r.create(e.slice(2, 4));
                                e.splice(0, 4), t.sigBytes -= 16
                            }
                            return l.create({
                                ciphertext: t,
                                salt: i
                            })
                        }
                    }, e.SerializableCipher = i.extend({
                        cfg: i.extend({
                            format: h
                        }),
                        encrypt: function(t, e, i, r) {
                            r = this.cfg.extend(r);
                            var n = t.createEncryptor(i, r);
                            return e = n.finalize(e), n = n.cfg, l.create({
                                ciphertext: e,
                                key: i,
                                iv: n.iv,
                                algorithm: t,
                                mode: n.mode,
                                padding: n.padding,
                                blockSize: t.blockSize,
                                formatter: r.format
                            })
                        },
                        decrypt: function(t, e, i, r) {
                            return r = this.cfg.extend(r), e = this._parse(e, r.format), t.createDecryptor(i, r).finalize(e.ciphertext)
                        },
                        _parse: function(t, e) {
                            return "string" == typeof t ? e.parse(t, this) : t
                        }
                    })),
                    d = (d.kdf = {}).OpenSSL = {
                        execute: function(t, e, i, n) {
                            return n || (n = r.random(8)), t = a.create({
                                keySize: e + i
                            }).compute(t, n), i = r.create(t.words.slice(e), 4 * i), t.sigBytes = 4 * e, l.create({
                                key: t,
                                iv: i,
                                salt: n
                            })
                        }
                    },
                    g = e.PasswordBasedCipher = f.extend({
                        cfg: f.cfg.extend({
                            kdf: d
                        }),
                        encrypt: function(t, e, i, r) {
                            return i = (r = this.cfg.extend(r)).kdf.execute(i, t.keySize, t.ivSize), r.iv = i.iv, (t = f.encrypt.call(this, t, e, i.key, r)).mixIn(i), t
                        },
                        decrypt: function(t, e, i, r) {
                            return r = this.cfg.extend(r), e = this._parse(e, r.format), i = r.kdf.execute(i, t.keySize, t.ivSize, e.salt), r.iv = i.iv, f.decrypt.call(this, t, e, i.key, r)
                        }
                    })
            }(),
            function() {
                for (var t = y, e = t.lib.BlockCipher, i = t.algo, r = [], n = [], s = [], a = [], o = [], h = [], u = [], c = [], l = [], f = [], d = [], g = 0; 256 > g; g++) d[g] = 128 > g ? g << 1 : g << 1 ^ 283;
                var p = 0,
                    v = 0;
                for (g = 0; 256 > g; g++) {
                    var m = (m = v ^ v << 1 ^ v << 2 ^ v << 3 ^ v << 4) >>> 8 ^ 255 & m ^ 99;
                    r[p] = m, n[m] = p;
                    var S = d[p],
                        F = d[S],
                        x = d[F],
                        b = 257 * d[m] ^ 16843008 * m;
                    s[p] = b << 24 | b >>> 8, a[p] = b << 16 | b >>> 16, o[p] = b << 8 | b >>> 24, h[p] = b, b = 16843009 * x ^ 65537 * F ^ 257 * S ^ 16843008 * p, u[m] = b << 24 | b >>> 8, c[m] = b << 16 | b >>> 16, l[m] = b << 8 | b >>> 24, f[m] = b, p ? (p = S ^ d[d[d[x ^ S]]], v ^= d[d[v]]) : p = v = 1
                }
                var E = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
                i = i.AES = e.extend({
                    _doReset: function() {
                        for (var t = (i = this._key).words, e = i.sigBytes / 4, i = 4 * ((this._nRounds = e + 6) + 1), n = this._keySchedule = [], s = 0; s < i; s++)
                            if (s < e) n[s] = t[s];
                            else {
                                var a = n[s - 1];
                                s % e ? 6 < e && 4 == s % e && (a = r[a >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a]) : (a = r[(a = a << 8 | a >>> 24) >>> 24] << 24 | r[a >>> 16 & 255] << 16 | r[a >>> 8 & 255] << 8 | r[255 & a], a ^= E[s / e | 0] << 24), n[s] = n[s - e] ^ a
                            } for (t = this._invKeySchedule = [], e = 0; e < i; e++) s = i - e, a = e % 4 ? n[s] : n[s - 4], t[e] = 4 > e || 4 >= s ? a : u[r[a >>> 24]] ^ c[r[a >>> 16 & 255]] ^ l[r[a >>> 8 & 255]] ^ f[r[255 & a]]
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._keySchedule, s, a, o, h, r)
                    },
                    decryptBlock: function(t, e) {
                        var i = t[e + 1];
                        t[e + 1] = t[e + 3], t[e + 3] = i, this._doCryptBlock(t, e, this._invKeySchedule, u, c, l, f, n), i = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = i
                    },
                    _doCryptBlock: function(t, e, i, r, n, s, a, o) {
                        for (var h = this._nRounds, u = t[e] ^ i[0], c = t[e + 1] ^ i[1], l = t[e + 2] ^ i[2], f = t[e + 3] ^ i[3], d = 4, g = 1; g < h; g++) {
                            var p = r[u >>> 24] ^ n[c >>> 16 & 255] ^ s[l >>> 8 & 255] ^ a[255 & f] ^ i[d++],
                                y = r[c >>> 24] ^ n[l >>> 16 & 255] ^ s[f >>> 8 & 255] ^ a[255 & u] ^ i[d++],
                                v = r[l >>> 24] ^ n[f >>> 16 & 255] ^ s[u >>> 8 & 255] ^ a[255 & c] ^ i[d++];
                            f = r[f >>> 24] ^ n[u >>> 16 & 255] ^ s[c >>> 8 & 255] ^ a[255 & l] ^ i[d++], u = p, c = y, l = v
                        }
                        p = (o[u >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[255 & f]) ^ i[d++], y = (o[c >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[f >>> 8 & 255] << 8 | o[255 & u]) ^ i[d++], v = (o[l >>> 24] << 24 | o[f >>> 16 & 255] << 16 | o[u >>> 8 & 255] << 8 | o[255 & c]) ^ i[d++], f = (o[f >>> 24] << 24 | o[u >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & l]) ^ i[d++], t[e] = p, t[e + 1] = y, t[e + 2] = v, t[e + 3] = f
                    },
                    keySize: 8
                }), t.AES = e._createHelper(i)
            }(),
            function() {
                function t(t, e) {
                    var i = (this._lBlock >>> t ^ this._rBlock) & e;
                    this._rBlock ^= i, this._lBlock ^= i << t
                }

                function e(t, e) {
                    var i = (this._rBlock >>> t ^ this._lBlock) & e;
                    this._lBlock ^= i, this._rBlock ^= i << t
                }
                var i = y,
                    r = (n = i.lib).WordArray,
                    n = n.BlockCipher,
                    s = i.algo,
                    a = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                    o = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                    h = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                    u = [{
                        0: 8421888,
                        268435456: 32768,
                        536870912: 8421378,
                        805306368: 2,
                        1073741824: 512,
                        1342177280: 8421890,
                        1610612736: 8389122,
                        1879048192: 8388608,
                        2147483648: 514,
                        2415919104: 8389120,
                        2684354560: 33280,
                        2952790016: 8421376,
                        3221225472: 32770,
                        3489660928: 8388610,
                        3758096384: 0,
                        4026531840: 33282,
                        134217728: 0,
                        402653184: 8421890,
                        671088640: 33282,
                        939524096: 32768,
                        1207959552: 8421888,
                        1476395008: 512,
                        1744830464: 8421378,
                        2013265920: 2,
                        2281701376: 8389120,
                        2550136832: 33280,
                        2818572288: 8421376,
                        3087007744: 8389122,
                        3355443200: 8388610,
                        3623878656: 32770,
                        3892314112: 514,
                        4160749568: 8388608,
                        1: 32768,
                        268435457: 2,
                        536870913: 8421888,
                        805306369: 8388608,
                        1073741825: 8421378,
                        1342177281: 33280,
                        1610612737: 512,
                        1879048193: 8389122,
                        2147483649: 8421890,
                        2415919105: 8421376,
                        2684354561: 8388610,
                        2952790017: 33282,
                        3221225473: 514,
                        3489660929: 8389120,
                        3758096385: 32770,
                        4026531841: 0,
                        134217729: 8421890,
                        402653185: 8421376,
                        671088641: 8388608,
                        939524097: 512,
                        1207959553: 32768,
                        1476395009: 8388610,
                        1744830465: 2,
                        2013265921: 33282,
                        2281701377: 32770,
                        2550136833: 8389122,
                        2818572289: 514,
                        3087007745: 8421888,
                        3355443201: 8389120,
                        3623878657: 0,
                        3892314113: 33280,
                        4160749569: 8421378
                    }, {
                        0: 1074282512,
                        16777216: 16384,
                        33554432: 524288,
                        50331648: 1074266128,
                        67108864: 1073741840,
                        83886080: 1074282496,
                        100663296: 1073758208,
                        117440512: 16,
                        134217728: 540672,
                        150994944: 1073758224,
                        167772160: 1073741824,
                        184549376: 540688,
                        201326592: 524304,
                        218103808: 0,
                        234881024: 16400,
                        251658240: 1074266112,
                        8388608: 1073758208,
                        25165824: 540688,
                        41943040: 16,
                        58720256: 1073758224,
                        75497472: 1074282512,
                        92274688: 1073741824,
                        109051904: 524288,
                        125829120: 1074266128,
                        142606336: 524304,
                        159383552: 0,
                        176160768: 16384,
                        192937984: 1074266112,
                        209715200: 1073741840,
                        226492416: 540672,
                        243269632: 1074282496,
                        260046848: 16400,
                        268435456: 0,
                        285212672: 1074266128,
                        301989888: 1073758224,
                        318767104: 1074282496,
                        335544320: 1074266112,
                        352321536: 16,
                        369098752: 540688,
                        385875968: 16384,
                        402653184: 16400,
                        419430400: 524288,
                        436207616: 524304,
                        452984832: 1073741840,
                        469762048: 540672,
                        486539264: 1073758208,
                        503316480: 1073741824,
                        520093696: 1074282512,
                        276824064: 540688,
                        293601280: 524288,
                        310378496: 1074266112,
                        327155712: 16384,
                        343932928: 1073758208,
                        360710144: 1074282512,
                        377487360: 16,
                        394264576: 1073741824,
                        411041792: 1074282496,
                        427819008: 1073741840,
                        444596224: 1073758224,
                        461373440: 524304,
                        478150656: 0,
                        494927872: 16400,
                        511705088: 1074266128,
                        528482304: 540672
                    }, {
                        0: 260,
                        1048576: 0,
                        2097152: 67109120,
                        3145728: 65796,
                        4194304: 65540,
                        5242880: 67108868,
                        6291456: 67174660,
                        7340032: 67174400,
                        8388608: 67108864,
                        9437184: 67174656,
                        10485760: 65792,
                        11534336: 67174404,
                        12582912: 67109124,
                        13631488: 65536,
                        14680064: 4,
                        15728640: 256,
                        524288: 67174656,
                        1572864: 67174404,
                        2621440: 0,
                        3670016: 67109120,
                        4718592: 67108868,
                        5767168: 65536,
                        6815744: 65540,
                        7864320: 260,
                        8912896: 4,
                        9961472: 256,
                        11010048: 67174400,
                        12058624: 65796,
                        13107200: 65792,
                        14155776: 67109124,
                        15204352: 67174660,
                        16252928: 67108864,
                        16777216: 67174656,
                        17825792: 65540,
                        18874368: 65536,
                        19922944: 67109120,
                        20971520: 256,
                        22020096: 67174660,
                        23068672: 67108868,
                        24117248: 0,
                        25165824: 67109124,
                        26214400: 67108864,
                        27262976: 4,
                        28311552: 65792,
                        29360128: 67174400,
                        30408704: 260,
                        31457280: 65796,
                        32505856: 67174404,
                        17301504: 67108864,
                        18350080: 260,
                        19398656: 67174656,
                        20447232: 0,
                        21495808: 65540,
                        22544384: 67109120,
                        23592960: 256,
                        24641536: 67174404,
                        25690112: 65536,
                        26738688: 67174660,
                        27787264: 65796,
                        28835840: 67108868,
                        29884416: 67109124,
                        30932992: 67174400,
                        31981568: 4,
                        33030144: 65792
                    }, {
                        0: 2151682048,
                        65536: 2147487808,
                        131072: 4198464,
                        196608: 2151677952,
                        262144: 0,
                        327680: 4198400,
                        393216: 2147483712,
                        458752: 4194368,
                        524288: 2147483648,
                        589824: 4194304,
                        655360: 64,
                        720896: 2147487744,
                        786432: 2151678016,
                        851968: 4160,
                        917504: 4096,
                        983040: 2151682112,
                        32768: 2147487808,
                        98304: 64,
                        163840: 2151678016,
                        229376: 2147487744,
                        294912: 4198400,
                        360448: 2151682112,
                        425984: 0,
                        491520: 2151677952,
                        557056: 4096,
                        622592: 2151682048,
                        688128: 4194304,
                        753664: 4160,
                        819200: 2147483648,
                        884736: 4194368,
                        950272: 4198464,
                        1015808: 2147483712,
                        1048576: 4194368,
                        1114112: 4198400,
                        1179648: 2147483712,
                        1245184: 0,
                        1310720: 4160,
                        1376256: 2151678016,
                        1441792: 2151682048,
                        1507328: 2147487808,
                        1572864: 2151682112,
                        1638400: 2147483648,
                        1703936: 2151677952,
                        1769472: 4198464,
                        1835008: 2147487744,
                        1900544: 4194304,
                        1966080: 64,
                        2031616: 4096,
                        1081344: 2151677952,
                        1146880: 2151682112,
                        1212416: 0,
                        1277952: 4198400,
                        1343488: 4194368,
                        1409024: 2147483648,
                        1474560: 2147487808,
                        1540096: 64,
                        1605632: 2147483712,
                        1671168: 4096,
                        1736704: 2147487744,
                        1802240: 2151678016,
                        1867776: 4160,
                        1933312: 2151682048,
                        1998848: 4194304,
                        2064384: 4198464
                    }, {
                        0: 128,
                        4096: 17039360,
                        8192: 262144,
                        12288: 536870912,
                        16384: 537133184,
                        20480: 16777344,
                        24576: 553648256,
                        28672: 262272,
                        32768: 16777216,
                        36864: 537133056,
                        40960: 536871040,
                        45056: 553910400,
                        49152: 553910272,
                        53248: 0,
                        57344: 17039488,
                        61440: 553648128,
                        2048: 17039488,
                        6144: 553648256,
                        10240: 128,
                        14336: 17039360,
                        18432: 262144,
                        22528: 537133184,
                        26624: 553910272,
                        30720: 536870912,
                        34816: 537133056,
                        38912: 0,
                        43008: 553910400,
                        47104: 16777344,
                        51200: 536871040,
                        55296: 553648128,
                        59392: 16777216,
                        63488: 262272,
                        65536: 262144,
                        69632: 128,
                        73728: 536870912,
                        77824: 553648256,
                        81920: 16777344,
                        86016: 553910272,
                        90112: 537133184,
                        94208: 16777216,
                        98304: 553910400,
                        102400: 553648128,
                        106496: 17039360,
                        110592: 537133056,
                        114688: 262272,
                        118784: 536871040,
                        122880: 0,
                        126976: 17039488,
                        67584: 553648256,
                        71680: 16777216,
                        75776: 17039360,
                        79872: 537133184,
                        83968: 536870912,
                        88064: 17039488,
                        92160: 128,
                        96256: 553910272,
                        100352: 262272,
                        104448: 553910400,
                        108544: 0,
                        112640: 553648128,
                        116736: 16777344,
                        120832: 262144,
                        124928: 537133056,
                        129024: 536871040
                    }, {
                        0: 268435464,
                        256: 8192,
                        512: 270532608,
                        768: 270540808,
                        1024: 268443648,
                        1280: 2097152,
                        1536: 2097160,
                        1792: 268435456,
                        2048: 0,
                        2304: 268443656,
                        2560: 2105344,
                        2816: 8,
                        3072: 270532616,
                        3328: 2105352,
                        3584: 8200,
                        3840: 270540800,
                        128: 270532608,
                        384: 270540808,
                        640: 8,
                        896: 2097152,
                        1152: 2105352,
                        1408: 268435464,
                        1664: 268443648,
                        1920: 8200,
                        2176: 2097160,
                        2432: 8192,
                        2688: 268443656,
                        2944: 270532616,
                        3200: 0,
                        3456: 270540800,
                        3712: 2105344,
                        3968: 268435456,
                        4096: 268443648,
                        4352: 270532616,
                        4608: 270540808,
                        4864: 8200,
                        5120: 2097152,
                        5376: 268435456,
                        5632: 268435464,
                        5888: 2105344,
                        6144: 2105352,
                        6400: 0,
                        6656: 8,
                        6912: 270532608,
                        7168: 8192,
                        7424: 268443656,
                        7680: 270540800,
                        7936: 2097160,
                        4224: 8,
                        4480: 2105344,
                        4736: 2097152,
                        4992: 268435464,
                        5248: 268443648,
                        5504: 8200,
                        5760: 270540808,
                        6016: 270532608,
                        6272: 270540800,
                        6528: 270532616,
                        6784: 8192,
                        7040: 2105352,
                        7296: 2097160,
                        7552: 0,
                        7808: 268435456,
                        8064: 268443656
                    }, {
                        0: 1048576,
                        16: 33555457,
                        32: 1024,
                        48: 1049601,
                        64: 34604033,
                        80: 0,
                        96: 1,
                        112: 34603009,
                        128: 33555456,
                        144: 1048577,
                        160: 33554433,
                        176: 34604032,
                        192: 34603008,
                        208: 1025,
                        224: 1049600,
                        240: 33554432,
                        8: 34603009,
                        24: 0,
                        40: 33555457,
                        56: 34604032,
                        72: 1048576,
                        88: 33554433,
                        104: 33554432,
                        120: 1025,
                        136: 1049601,
                        152: 33555456,
                        168: 34603008,
                        184: 1048577,
                        200: 1024,
                        216: 34604033,
                        232: 1,
                        248: 1049600,
                        256: 33554432,
                        272: 1048576,
                        288: 33555457,
                        304: 34603009,
                        320: 1048577,
                        336: 33555456,
                        352: 34604032,
                        368: 1049601,
                        384: 1025,
                        400: 34604033,
                        416: 1049600,
                        432: 1,
                        448: 0,
                        464: 34603008,
                        480: 33554433,
                        496: 1024,
                        264: 1049600,
                        280: 33555457,
                        296: 34603009,
                        312: 1,
                        328: 33554432,
                        344: 1048576,
                        360: 1025,
                        376: 34604032,
                        392: 33554433,
                        408: 34603008,
                        424: 0,
                        440: 34604033,
                        456: 1049601,
                        472: 1024,
                        488: 33555456,
                        504: 1048577
                    }, {
                        0: 134219808,
                        1: 131072,
                        2: 134217728,
                        3: 32,
                        4: 131104,
                        5: 134350880,
                        6: 134350848,
                        7: 2048,
                        8: 134348800,
                        9: 134219776,
                        10: 133120,
                        11: 134348832,
                        12: 2080,
                        13: 0,
                        14: 134217760,
                        15: 133152,
                        2147483648: 2048,
                        2147483649: 134350880,
                        2147483650: 134219808,
                        2147483651: 134217728,
                        2147483652: 134348800,
                        2147483653: 133120,
                        2147483654: 133152,
                        2147483655: 32,
                        2147483656: 134217760,
                        2147483657: 2080,
                        2147483658: 131104,
                        2147483659: 134350848,
                        2147483660: 0,
                        2147483661: 134348832,
                        2147483662: 134219776,
                        2147483663: 131072,
                        16: 133152,
                        17: 134350848,
                        18: 32,
                        19: 2048,
                        20: 134219776,
                        21: 134217760,
                        22: 134348832,
                        23: 131072,
                        24: 0,
                        25: 131104,
                        26: 134348800,
                        27: 134219808,
                        28: 134350880,
                        29: 133120,
                        30: 2080,
                        31: 134217728,
                        2147483664: 131072,
                        2147483665: 2048,
                        2147483666: 134348832,
                        2147483667: 133152,
                        2147483668: 32,
                        2147483669: 134348800,
                        2147483670: 134217728,
                        2147483671: 134219808,
                        2147483672: 134350880,
                        2147483673: 134217760,
                        2147483674: 134219776,
                        2147483675: 0,
                        2147483676: 133120,
                        2147483677: 2080,
                        2147483678: 131104,
                        2147483679: 134350848
                    }],
                    c = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                    l = s.DES = n.extend({
                        _doReset: function() {
                            for (var t = this._key.words, e = [], i = 0; 56 > i; i++) {
                                var r = a[i] - 1;
                                e[i] = t[r >>> 5] >>> 31 - r % 32 & 1
                            }
                            for (t = this._subKeys = [], r = 0; 16 > r; r++) {
                                var n = t[r] = [],
                                    s = h[r];
                                for (i = 0; 24 > i; i++) n[i / 6 | 0] |= e[(o[i] - 1 + s) % 28] << 31 - i % 6, n[4 + (i / 6 | 0)] |= e[28 + (o[i + 24] - 1 + s) % 28] << 31 - i % 6;
                                for (n[0] = n[0] << 1 | n[0] >>> 31, i = 1; 7 > i; i++) n[i] >>>= 4 * (i - 1) + 3;
                                n[7] = n[7] << 5 | n[7] >>> 27
                            }
                            for (e = this._invSubKeys = [], i = 0; 16 > i; i++) e[i] = t[15 - i]
                        },
                        encryptBlock: function(t, e) {
                            this._doCryptBlock(t, e, this._subKeys)
                        },
                        decryptBlock: function(t, e) {
                            this._doCryptBlock(t, e, this._invSubKeys)
                        },
                        _doCryptBlock: function(i, r, n) {
                            this._lBlock = i[r], this._rBlock = i[r + 1], t.call(this, 4, 252645135), t.call(this, 16, 65535), e.call(this, 2, 858993459), e.call(this, 8, 16711935), t.call(this, 1, 1431655765);
                            for (var s = 0; 16 > s; s++) {
                                for (var a = n[s], o = this._lBlock, h = this._rBlock, l = 0, f = 0; 8 > f; f++) l |= u[f][((h ^ a[f]) & c[f]) >>> 0];
                                this._lBlock = h, this._rBlock = o ^ l
                            }
                            n = this._lBlock, this._lBlock = this._rBlock, this._rBlock = n, t.call(this, 1, 1431655765), e.call(this, 8, 16711935), e.call(this, 2, 858993459), t.call(this, 16, 65535), t.call(this, 4, 252645135), i[r] = this._lBlock, i[r + 1] = this._rBlock
                        },
                        keySize: 2,
                        ivSize: 2,
                        blockSize: 2
                    });
                i.DES = n._createHelper(l), s = s.TripleDES = n.extend({
                    _doReset: function() {
                        var t = this._key.words;
                        this._des1 = l.createEncryptor(r.create(t.slice(0, 2))), this._des2 = l.createEncryptor(r.create(t.slice(2, 4))), this._des3 = l.createEncryptor(r.create(t.slice(4, 6)))
                    },
                    encryptBlock: function(t, e) {
                        this._des1.encryptBlock(t, e), this._des2.decryptBlock(t, e), this._des3.encryptBlock(t, e)
                    },
                    decryptBlock: function(t, e) {
                        this._des3.decryptBlock(t, e), this._des2.encryptBlock(t, e), this._des1.decryptBlock(t, e)
                    },
                    keySize: 6,
                    ivSize: 2,
                    blockSize: 2
                }), i.TripleDES = n._createHelper(s)
            }(),
            function() {
                var t = y,
                    e = t.lib.WordArray;
                t.enc.Base64 = {
                    stringify: function(t) {
                        var e = t.words,
                            i = t.sigBytes,
                            r = this._map;
                        t.clamp(), t = [];
                        for (var n = 0; n < i; n += 3)
                            for (var s = (e[n >>> 2] >>> 24 - n % 4 * 8 & 255) << 16 | (e[n + 1 >>> 2] >>> 24 - (n + 1) % 4 * 8 & 255) << 8 | e[n + 2 >>> 2] >>> 24 - (n + 2) % 4 * 8 & 255, a = 0; 4 > a && n + .75 * a < i; a++) t.push(r.charAt(s >>> 6 * (3 - a) & 63));
                        if (e = r.charAt(64))
                            for (; t.length % 4;) t.push(e);
                        return t.join("")
                    },
                    parse: function(t) {
                        var i = t.length,
                            r = this._map;
                        (n = r.charAt(64)) && -1 != (n = t.indexOf(n)) && (i = n);
                        for (var n = [], s = 0, a = 0; a < i; a++)
                            if (a % 4) {
                                var o = r.indexOf(t.charAt(a - 1)) << a % 4 * 2,
                                    h = r.indexOf(t.charAt(a)) >>> 6 - a % 4 * 2;
                                n[s >>> 2] |= (o | h) << 24 - s % 4 * 8, s++
                            } return e.create(n, s)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }(),
            function(t) {
                function e(t, e, i, r, n, s, a) {
                    return ((t = t + (e & i | ~e & r) + n + a) << s | t >>> 32 - s) + e
                }

                function i(t, e, i, r, n, s, a) {
                    return ((t = t + (e & r | i & ~r) + n + a) << s | t >>> 32 - s) + e
                }

                function r(t, e, i, r, n, s, a) {
                    return ((t = t + (e ^ i ^ r) + n + a) << s | t >>> 32 - s) + e
                }

                function n(t, e, i, r, n, s, a) {
                    return ((t = t + (i ^ (e | ~r)) + n + a) << s | t >>> 32 - s) + e
                }
                for (var s = y, a = (h = s.lib).WordArray, o = h.Hasher, h = s.algo, u = [], c = 0; 64 > c; c++) u[c] = 4294967296 * t.abs(t.sin(c + 1)) | 0;
                h = h.MD5 = o.extend({
                    _doReset: function() {
                        this._hash = new a.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(t, s) {
                        for (var a = 0; 16 > a; a++) {
                            var o = t[h = s + a];
                            t[h] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                        }
                        a = this._hash.words;
                        var h = t[s + 0],
                            c = (o = t[s + 1], t[s + 2]),
                            l = t[s + 3],
                            f = t[s + 4],
                            d = t[s + 5],
                            g = t[s + 6],
                            p = t[s + 7],
                            y = t[s + 8],
                            v = t[s + 9],
                            m = t[s + 10],
                            S = t[s + 11],
                            F = t[s + 12],
                            x = t[s + 13],
                            b = t[s + 14],
                            E = t[s + 15],
                            w = e(w = a[0], D = a[1], C = a[2], A = a[3], h, 7, u[0]),
                            A = e(A, w, D, C, o, 12, u[1]),
                            C = e(C, A, w, D, c, 17, u[2]),
                            D = e(D, C, A, w, l, 22, u[3]);
                        w = e(w, D, C, A, f, 7, u[4]), A = e(A, w, D, C, d, 12, u[5]), C = e(C, A, w, D, g, 17, u[6]), D = e(D, C, A, w, p, 22, u[7]), w = e(w, D, C, A, y, 7, u[8]), A = e(A, w, D, C, v, 12, u[9]), C = e(C, A, w, D, m, 17, u[10]), D = e(D, C, A, w, S, 22, u[11]), w = e(w, D, C, A, F, 7, u[12]), A = e(A, w, D, C, x, 12, u[13]), C = e(C, A, w, D, b, 17, u[14]), w = i(w, D = e(D, C, A, w, E, 22, u[15]), C, A, o, 5, u[16]), A = i(A, w, D, C, g, 9, u[17]), C = i(C, A, w, D, S, 14, u[18]), D = i(D, C, A, w, h, 20, u[19]), w = i(w, D, C, A, d, 5, u[20]), A = i(A, w, D, C, m, 9, u[21]), C = i(C, A, w, D, E, 14, u[22]), D = i(D, C, A, w, f, 20, u[23]), w = i(w, D, C, A, v, 5, u[24]), A = i(A, w, D, C, b, 9, u[25]), C = i(C, A, w, D, l, 14, u[26]), D = i(D, C, A, w, y, 20, u[27]), w = i(w, D, C, A, x, 5, u[28]), A = i(A, w, D, C, c, 9, u[29]), C = i(C, A, w, D, p, 14, u[30]), w = r(w, D = i(D, C, A, w, F, 20, u[31]), C, A, d, 4, u[32]), A = r(A, w, D, C, y, 11, u[33]), C = r(C, A, w, D, S, 16, u[34]), D = r(D, C, A, w, b, 23, u[35]), w = r(w, D, C, A, o, 4, u[36]), A = r(A, w, D, C, f, 11, u[37]), C = r(C, A, w, D, p, 16, u[38]), D = r(D, C, A, w, m, 23, u[39]), w = r(w, D, C, A, x, 4, u[40]), A = r(A, w, D, C, h, 11, u[41]), C = r(C, A, w, D, l, 16, u[42]), D = r(D, C, A, w, g, 23, u[43]), w = r(w, D, C, A, v, 4, u[44]), A = r(A, w, D, C, F, 11, u[45]), C = r(C, A, w, D, E, 16, u[46]), w = n(w, D = r(D, C, A, w, c, 23, u[47]), C, A, h, 6, u[48]), A = n(A, w, D, C, p, 10, u[49]), C = n(C, A, w, D, b, 15, u[50]), D = n(D, C, A, w, d, 21, u[51]), w = n(w, D, C, A, F, 6, u[52]), A = n(A, w, D, C, l, 10, u[53]), C = n(C, A, w, D, m, 15, u[54]), D = n(D, C, A, w, o, 21, u[55]), w = n(w, D, C, A, y, 6, u[56]), A = n(A, w, D, C, E, 10, u[57]), C = n(C, A, w, D, g, 15, u[58]), D = n(D, C, A, w, x, 21, u[59]), w = n(w, D, C, A, f, 6, u[60]), A = n(A, w, D, C, S, 10, u[61]), C = n(C, A, w, D, c, 15, u[62]), D = n(D, C, A, w, v, 21, u[63]), a[0] = a[0] + w | 0, a[1] = a[1] + D | 0, a[2] = a[2] + C | 0, a[3] = a[3] + A | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            i = e.words,
                            r = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        i[n >>> 5] |= 128 << 24 - n % 32;
                        var s = t.floor(r / 4294967296);
                        for (i[15 + (n + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), i[14 + (n + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), e.sigBytes = 4 * (i.length + 1), this._process(), i = (e = this._hash).words, r = 0; 4 > r; r++) n = i[r], i[r] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
                        return e
                    },
                    clone: function() {
                        var t = o.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                }), s.MD5 = o._createHelper(h), s.HmacMD5 = o._createHmacHelper(h)
            }(Math),
            function() {
                var t = y,
                    e = (n = t.lib).WordArray,
                    i = n.Hasher,
                    r = [],
                    n = t.algo.SHA1 = i.extend({
                        _doReset: function() {
                            this._hash = new e.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function(t, e) {
                            for (var i = this._hash.words, n = i[0], s = i[1], a = i[2], o = i[3], h = i[4], u = 0; 80 > u; u++) {
                                if (16 > u) r[u] = 0 | t[e + u];
                                else {
                                    var c = r[u - 3] ^ r[u - 8] ^ r[u - 14] ^ r[u - 16];
                                    r[u] = c << 1 | c >>> 31
                                }
                                c = (n << 5 | n >>> 27) + h + r[u], c = 20 > u ? c + (1518500249 + (s & a | ~s & o)) : 40 > u ? c + (1859775393 + (s ^ a ^ o)) : 60 > u ? c + ((s & a | s & o | a & o) - 1894007588) : c + ((s ^ a ^ o) - 899497514), h = o, o = a, a = s << 30 | s >>> 2, s = n, n = c
                            }
                            i[0] = i[0] + n | 0, i[1] = i[1] + s | 0, i[2] = i[2] + a | 0, i[3] = i[3] + o | 0, i[4] = i[4] + h | 0
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                e = t.words,
                                i = 8 * this._nDataBytes,
                                r = 8 * t.sigBytes;
                            return e[r >>> 5] |= 128 << 24 - r % 32, e[14 + (r + 64 >>> 9 << 4)] = Math.floor(i / 4294967296), e[15 + (r + 64 >>> 9 << 4)] = i, t.sigBytes = 4 * e.length, this._process(), this._hash
                        },
                        clone: function() {
                            var t = i.clone.call(this);
                            return t._hash = this._hash.clone(), t
                        }
                    });
                t.SHA1 = i._createHelper(n), t.HmacSHA1 = i._createHmacHelper(n)
            }(),
            function(t) {
                for (var e = y, i = (n = e.lib).WordArray, r = n.Hasher, n = e.algo, s = [], a = [], o = function(t) {
                        return 4294967296 * (t - (0 | t)) | 0
                    }, h = 2, u = 0; 64 > u;) {
                    var c;
                    t: {
                        c = h;
                        for (var l = t.sqrt(c), f = 2; f <= l; f++)
                            if (!(c % f)) {
                                c = !1;
                                break t
                            } c = !0
                    }
                    c && (8 > u && (s[u] = o(t.pow(h, .5))), a[u] = o(t.pow(h, 1 / 3)), u++), h++
                }
                var d = [];
                n = n.SHA256 = r.extend({
                    _doReset: function() {
                        this._hash = new i.init(s.slice(0))
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._hash.words, r = i[0], n = i[1], s = i[2], o = i[3], h = i[4], u = i[5], c = i[6], l = i[7], f = 0; 64 > f; f++) {
                            if (16 > f) d[f] = 0 | t[e + f];
                            else {
                                var g = d[f - 15],
                                    p = d[f - 2];
                                d[f] = ((g << 25 | g >>> 7) ^ (g << 14 | g >>> 18) ^ g >>> 3) + d[f - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + d[f - 16]
                            }
                            g = l + ((h << 26 | h >>> 6) ^ (h << 21 | h >>> 11) ^ (h << 7 | h >>> 25)) + (h & u ^ ~h & c) + a[f] + d[f], p = ((r << 30 | r >>> 2) ^ (r << 19 | r >>> 13) ^ (r << 10 | r >>> 22)) + (r & n ^ r & s ^ n & s), l = c, c = u, u = h, h = o + g | 0, o = s, s = n, n = r, r = g + p | 0
                        }
                        i[0] = i[0] + r | 0, i[1] = i[1] + n | 0, i[2] = i[2] + s | 0, i[3] = i[3] + o | 0, i[4] = i[4] + h | 0, i[5] = i[5] + u | 0, i[6] = i[6] + c | 0, i[7] = i[7] + l | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            i = e.words,
                            r = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        return i[n >>> 5] |= 128 << 24 - n % 32, i[14 + (n + 64 >>> 9 << 4)] = t.floor(r / 4294967296), i[15 + (n + 64 >>> 9 << 4)] = r, e.sigBytes = 4 * i.length, this._process(), this._hash
                    },
                    clone: function() {
                        var t = r.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                }), e.SHA256 = r._createHelper(n), e.HmacSHA256 = r._createHmacHelper(n)
            }(Math),
            function() {
                var t = y,
                    e = t.lib.WordArray,
                    i = (r = t.algo).SHA256,
                    r = r.SHA224 = i.extend({
                        _doReset: function() {
                            this._hash = new e.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                        },
                        _doFinalize: function() {
                            var t = i._doFinalize.call(this);
                            return t.sigBytes -= 4, t
                        }
                    });
                t.SHA224 = i._createHelper(r), t.HmacSHA224 = i._createHmacHelper(r)
            }(),
            function() {
                function t() {
                    return r.create.apply(r, arguments)
                }
                for (var e = y, i = e.lib.Hasher, r = (s = e.x64).Word, n = s.WordArray, s = e.algo, a = [t(1116352408, 3609767458), t(1899447441, 602891725), t(3049323471, 3964484399), t(3921009573, 2173295548), t(961987163, 4081628472), t(1508970993, 3053834265), t(2453635748, 2937671579), t(2870763221, 3664609560), t(3624381080, 2734883394), t(310598401, 1164996542), t(607225278, 1323610764), t(1426881987, 3590304994), t(1925078388, 4068182383), t(2162078206, 991336113), t(2614888103, 633803317), t(3248222580, 3479774868), t(3835390401, 2666613458), t(4022224774, 944711139), t(264347078, 2341262773), t(604807628, 2007800933), t(770255983, 1495990901), t(1249150122, 1856431235), t(1555081692, 3175218132), t(1996064986, 2198950837), t(2554220882, 3999719339), t(2821834349, 766784016), t(2952996808, 2566594879), t(3210313671, 3203337956), t(3336571891, 1034457026), t(3584528711, 2466948901), t(113926993, 3758326383), t(338241895, 168717936), t(666307205, 1188179964), t(773529912, 1546045734), t(1294757372, 1522805485), t(1396182291, 2643833823), t(1695183700, 2343527390), t(1986661051, 1014477480), t(2177026350, 1206759142), t(2456956037, 344077627), t(2730485921, 1290863460), t(2820302411, 3158454273), t(3259730800, 3505952657), t(3345764771, 106217008), t(3516065817, 3606008344), t(3600352804, 1432725776), t(4094571909, 1467031594), t(275423344, 851169720), t(430227734, 3100823752), t(506948616, 1363258195), t(659060556, 3750685593), t(883997877, 3785050280), t(958139571, 3318307427), t(1322822218, 3812723403), t(1537002063, 2003034995), t(1747873779, 3602036899), t(1955562222, 1575990012), t(2024104815, 1125592928), t(2227730452, 2716904306), t(2361852424, 442776044), t(2428436474, 593698344), t(2756734187, 3733110249), t(3204031479, 2999351573), t(3329325298, 3815920427), t(3391569614, 3928383900), t(3515267271, 566280711), t(3940187606, 3454069534), t(4118630271, 4000239992), t(116418474, 1914138554), t(174292421, 2731055270), t(289380356, 3203993006), t(460393269, 320620315), t(685471733, 587496836), t(852142971, 1086792851), t(1017036298, 365543100), t(1126000580, 2618297676), t(1288033470, 3409855158), t(1501505948, 4234509866), t(1607167915, 987167468), t(1816402316, 1246189591)], o = [], h = 0; 80 > h; h++) o[h] = t();
                s = s.SHA512 = i.extend({
                    _doReset: function() {
                        this._hash = new n.init([new r.init(1779033703, 4089235720), new r.init(3144134277, 2227873595), new r.init(1013904242, 4271175723), new r.init(2773480762, 1595750129), new r.init(1359893119, 2917565137), new r.init(2600822924, 725511199), new r.init(528734635, 4215389547), new r.init(1541459225, 327033209)])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = (l = this._hash.words)[0], r = l[1], n = l[2], s = l[3], h = l[4], u = l[5], c = l[6], l = l[7], f = i.high, d = i.low, g = r.high, p = r.low, y = n.high, v = n.low, m = s.high, S = s.low, F = h.high, x = h.low, b = u.high, E = u.low, w = c.high, A = c.low, C = l.high, D = l.low, I = f, T = d, B = g, H = p, P = y, R = v, N = m, j = S, O = F, V = x, L = b, K = E, k = w, M = A, U = C, q = D, _ = 0; 80 > _; _++) {
                            var z = o[_];
                            if (16 > _) var W = z.high = 0 | t[e + 2 * _],
                                J = z.low = 0 | t[e + 2 * _ + 1];
                            else {
                                W = ((J = (W = o[_ - 15]).high) >>> 1 | (G = W.low) << 31) ^ (J >>> 8 | G << 24) ^ J >>> 7;
                                var G = (G >>> 1 | J << 31) ^ (G >>> 8 | J << 24) ^ (G >>> 7 | J << 25),
                                    Y = ((J = (Y = o[_ - 2]).high) >>> 19 | (X = Y.low) << 13) ^ (J << 3 | X >>> 29) ^ J >>> 6,
                                    X = (X >>> 19 | J << 13) ^ (X << 3 | J >>> 29) ^ (X >>> 6 | J << 26),
                                    $ = (J = o[_ - 7]).high,
                                    Z = (Q = o[_ - 16]).high,
                                    Q = Q.low;
                                W = (W = (W = W + $ + ((J = G + J.low) >>> 0 < G >>> 0 ? 1 : 0)) + Y + ((J += X) >>> 0 < X >>> 0 ? 1 : 0)) + Z + ((J += Q) >>> 0 < Q >>> 0 ? 1 : 0), z.high = W, z.low = J
                            }
                            $ = O & L ^ ~O & k, Q = V & K ^ ~V & M, z = I & B ^ I & P ^ B & P;
                            var tt = T & H ^ T & R ^ H & R,
                                et = (G = (I >>> 28 | T << 4) ^ (I << 30 | T >>> 2) ^ (I << 25 | T >>> 7), Y = (T >>> 28 | I << 4) ^ (T << 30 | I >>> 2) ^ (T << 25 | I >>> 7), (X = a[_]).high),
                                it = X.low;
                            Z = U + ((O >>> 14 | V << 18) ^ (O >>> 18 | V << 14) ^ (O << 23 | V >>> 9)) + ((X = q + ((V >>> 14 | O << 18) ^ (V >>> 18 | O << 14) ^ (V << 23 | O >>> 9))) >>> 0 < q >>> 0 ? 1 : 0), U = k, q = M, k = L, M = K, L = O, K = V, O = N + (Z = (Z = (Z = Z + $ + ((X += Q) >>> 0 < Q >>> 0 ? 1 : 0)) + et + ((X += it) >>> 0 < it >>> 0 ? 1 : 0)) + W + ((X += J) >>> 0 < J >>> 0 ? 1 : 0)) + ((V = j + X | 0) >>> 0 < j >>> 0 ? 1 : 0) | 0, N = P, j = R, P = B, R = H, B = I, H = T, I = Z + (z = G + z + ((J = Y + tt) >>> 0 < Y >>> 0 ? 1 : 0)) + ((T = X + J | 0) >>> 0 < X >>> 0 ? 1 : 0) | 0
                        }
                        d = i.low = d + T, i.high = f + I + (d >>> 0 < T >>> 0 ? 1 : 0), p = r.low = p + H, r.high = g + B + (p >>> 0 < H >>> 0 ? 1 : 0), v = n.low = v + R, n.high = y + P + (v >>> 0 < R >>> 0 ? 1 : 0), S = s.low = S + j, s.high = m + N + (S >>> 0 < j >>> 0 ? 1 : 0), x = h.low = x + V, h.high = F + O + (x >>> 0 < V >>> 0 ? 1 : 0), E = u.low = E + K, u.high = b + L + (E >>> 0 < K >>> 0 ? 1 : 0), A = c.low = A + M, c.high = w + k + (A >>> 0 < M >>> 0 ? 1 : 0), D = l.low = D + q, l.high = C + U + (D >>> 0 < q >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            e = t.words,
                            i = 8 * this._nDataBytes,
                            r = 8 * t.sigBytes;
                        return e[r >>> 5] |= 128 << 24 - r % 32, e[30 + (r + 128 >>> 10 << 5)] = Math.floor(i / 4294967296), e[31 + (r + 128 >>> 10 << 5)] = i, t.sigBytes = 4 * e.length, this._process(), this._hash.toX32()
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    },
                    blockSize: 32
                }), e.SHA512 = i._createHelper(s), e.HmacSHA512 = i._createHmacHelper(s)
            }(),
            function() {
                var t = y,
                    e = (n = t.x64).Word,
                    i = n.WordArray,
                    r = (n = t.algo).SHA512,
                    n = n.SHA384 = r.extend({
                        _doReset: function() {
                            this._hash = new i.init([new e.init(3418070365, 3238371032), new e.init(1654270250, 914150663), new e.init(2438529370, 812702999), new e.init(355462360, 4144912697), new e.init(1731405415, 4290775857), new e.init(2394180231, 1750603025), new e.init(3675008525, 1694076839), new e.init(1203062813, 3204075428)])
                        },
                        _doFinalize: function() {
                            var t = r._doFinalize.call(this);
                            return t.sigBytes -= 16, t
                        }
                    });
                t.SHA384 = r._createHelper(n), t.HmacSHA384 = r._createHmacHelper(n)
            }(),
            function() {
                var t = y,
                    e = (r = t.lib).WordArray,
                    i = r.Hasher,
                    r = t.algo,
                    n = e.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                    s = e.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                    a = e.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                    o = e.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                    h = e.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                    u = e.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
                r = r.RIPEMD160 = i.extend({
                    _doReset: function() {
                        this._hash = e.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = 0; 16 > i; i++) {
                            var r = t[x = e + i];
                            t[x] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8)
                        }
                        var c, l, f, d, g, p, y, v, m, S, F, x = this._hash.words,
                            b = (r = h.words, u.words),
                            E = n.words,
                            w = s.words,
                            A = a.words,
                            C = o.words;
                        for (p = c = x[0], y = l = x[1], v = f = x[2], m = d = x[3], S = g = x[4], i = 0; 80 > i; i += 1) F = c + t[e + E[i]] | 0, F = 16 > i ? F + ((l ^ f ^ d) + r[0]) : 32 > i ? F + ((l & f | ~l & d) + r[1]) : 48 > i ? F + (((l | ~f) ^ d) + r[2]) : 64 > i ? F + ((l & d | f & ~d) + r[3]) : F + ((l ^ (f | ~d)) + r[4]), F = (F = (F |= 0) << A[i] | F >>> 32 - A[i]) + g | 0, c = g, g = d, d = f << 10 | f >>> 22, f = l, l = F, F = p + t[e + w[i]] | 0, F = 16 > i ? F + ((y ^ (v | ~m)) + b[0]) : 32 > i ? F + ((y & m | v & ~m) + b[1]) : 48 > i ? F + (((y | ~v) ^ m) + b[2]) : 64 > i ? F + ((y & v | ~y & m) + b[3]) : F + ((y ^ v ^ m) + b[4]), F = (F = (F |= 0) << C[i] | F >>> 32 - C[i]) + S | 0, p = S, S = m, m = v << 10 | v >>> 22, v = y, y = F;
                        F = x[1] + f + m | 0, x[1] = x[2] + d + S | 0, x[2] = x[3] + g + p | 0, x[3] = x[4] + c + y | 0, x[4] = x[0] + l + v | 0, x[0] = F
                    },
                    _doFinalize: function() {
                        var t = this._data,
                            e = t.words,
                            i = 8 * this._nDataBytes,
                            r = 8 * t.sigBytes;
                        for (e[r >>> 5] |= 128 << 24 - r % 32, e[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (e.length + 1), this._process(), e = (t = this._hash).words, i = 0; 5 > i; i++) r = e[i], e[i] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);
                        return t
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(), t
                    }
                }), t.RIPEMD160 = i._createHelper(r), t.HmacRIPEMD160 = i._createHmacHelper(r)
            }(Math),
            function() {
                var t = y,
                    e = t.enc.Utf8;
                t.algo.HMAC = t.lib.Base.extend({
                    init: function(t, i) {
                        t = this._hasher = new t.init, "string" == typeof i && (i = e.parse(i));
                        var r = t.blockSize,
                            n = 4 * r;
                        i.sigBytes > n && (i = t.finalize(i)), i.clamp();
                        for (var s = this._oKey = i.clone(), a = this._iKey = i.clone(), o = s.words, h = a.words, u = 0; u < r; u++) o[u] ^= 1549556828, h[u] ^= 909522486;
                        s.sigBytes = a.sigBytes = n, this.reset()
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(), t.update(this._iKey)
                    },
                    update: function(t) {
                        return this._hasher.update(t), this
                    },
                    finalize: function(t) {
                        var e = this._hasher;
                        return t = e.finalize(t), e.reset(), e.finalize(this._oKey.clone().concat(t))
                    }
                })
            }(),
            function() {
                var t, e = y,
                    i = (t = e.lib).Base,
                    r = t.WordArray,
                    n = (t = e.algo).HMAC,
                    s = t.PBKDF2 = i.extend({
                        cfg: i.extend({
                            keySize: 4,
                            hasher: t.SHA1,
                            iterations: 1
                        }),
                        init: function(t) {
                            this.cfg = this.cfg.extend(t)
                        },
                        compute: function(t, e) {
                            var i = this.cfg,
                                s = n.create(i.hasher, t),
                                a = r.create(),
                                o = r.create([1]),
                                h = a.words,
                                u = o.words,
                                c = i.keySize;
                            for (i = i.iterations; h.length < c;) {
                                var l = s.update(e).finalize(o);
                                s.reset();
                                for (var f = l.words, d = f.length, g = l, p = 1; p < i; p++) {
                                    g = s.finalize(g), s.reset();
                                    for (var y = g.words, v = 0; v < d; v++) f[v] ^= y[v]
                                }
                                a.concat(l), u[0]++
                            }
                            return a.sigBytes = 4 * c, a
                        }
                    });
                e.PBKDF2 = function(t, e, i) {
                    return s.create(i).compute(t, e)
                }
            }();
        var v, m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            S = "=";

        function F(t) {
            var e, i, r = "";
            for (e = 0; e + 3 <= t.length; e += 3) i = parseInt(t.substring(e, e + 3), 16), r += m.charAt(i >> 6) + m.charAt(63 & i);
            if (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16), r += m.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16), r += m.charAt(i >> 2) + m.charAt((3 & i) << 4)), S)
                for (;
                    (3 & r.length) > 0;) r += S;
            return r
        }

        function x(t) {
            var e, i, r, n = "",
                s = 0;
            for (e = 0; e < t.length && t.charAt(e) != S; ++e)(r = m.indexOf(t.charAt(e))) < 0 || (0 == s ? (n += T(r >> 2), i = 3 & r, s = 1) : 1 == s ? (n += T(i << 2 | r >> 4), i = 15 & r, s = 2) : 2 == s ? (n += T(i), n += T(r >> 2), i = 3 & r, s = 3) : (n += T(i << 2 | r >> 4), n += T(15 & r), s = 0));
            return 1 == s && (n += T(i << 2)), n
        }

        function b(t) {
            var e, i = x(t),
                r = new Array;
            for (e = 0; 2 * e < i.length; ++e) r[e] = parseInt(i.substring(2 * e, 2 * e + 2), 16);
            return r
        }

        function E(t, e, i) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }

        function w() {
            return new E(null)
        }
        "Microsoft Internet Explorer" == e.appName ? (E.prototype.am = function(t, e, i, r, n, s) {
            for (var a = 32767 & e, o = e >> 15; --s >= 0;) {
                var h = 32767 & this[t],
                    u = this[t++] >> 15,
                    c = o * h + u * a;
                n = ((h = a * h + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + o * u + (n >>> 30), i[r++] = 1073741823 & h
            }
            return n
        }, v = 30) : "Netscape" != e.appName ? (E.prototype.am = function(t, e, i, r, n, s) {
            for (; --s >= 0;) {
                var a = e * this[t++] + i[r] + n;
                n = Math.floor(a / 67108864), i[r++] = 67108863 & a
            }
            return n
        }, v = 26) : (E.prototype.am = function(t, e, i, r, n, s) {
            for (var a = 16383 & e, o = e >> 14; --s >= 0;) {
                var h = 16383 & this[t],
                    u = this[t++] >> 14,
                    c = o * h + u * a;
                n = ((h = a * h + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + o * u, i[r++] = 268435455 & h
            }
            return n
        }, v = 28), E.prototype.DB = v, E.prototype.DM = (1 << v) - 1, E.prototype.DV = 1 << v, E.prototype.FV = Math.pow(2, 52), E.prototype.F1 = 52 - v, E.prototype.F2 = 2 * v - 52;
        var A, C, D = "0123456789abcdefghijklmnopqrstuvwxyz",
            I = new Array;
        for (A = "0".charCodeAt(0), C = 0; C <= 9; ++C) I[A++] = C;
        for (A = "a".charCodeAt(0), C = 10; C < 36; ++C) I[A++] = C;
        for (A = "A".charCodeAt(0), C = 10; C < 36; ++C) I[A++] = C;

        function T(t) {
            return D.charAt(t)
        }

        function B(t, e) {
            var i = I[t.charCodeAt(e)];
            return null == i ? -1 : i
        }

        function H(t) {
            var e = w();
            return e.fromInt(t), e
        }

        function P(t) {
            var e, i = 1;
            return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i
        }

        function R(t) {
            this.m = t
        }

        function N(t) {
            this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
        }

        function j(t, e) {
            return t & e
        }

        function O(t, e) {
            return t | e
        }

        function V(t, e) {
            return t ^ e
        }

        function L(t, e) {
            return t & ~e
        }

        function K(t) {
            if (0 == t) return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
        }

        function k(t) {
            for (var e = 0; 0 != t;) t &= t - 1, ++e;
            return e
        }

        function M() {}

        function U(t) {
            return t
        }

        function q(t) {
            this.r2 = w(), this.q3 = w(), E.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t), this.m = t
        }
        R.prototype.convert = function(t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
        }, R.prototype.revert = function(t) {
            return t
        }, R.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
        }, R.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i), this.reduce(i)
        }, R.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        }, N.prototype.convert = function(t) {
            var e = w();
            return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(E.ZERO) > 0 && this.m.subTo(e, e), e
        }, N.prototype.revert = function(t) {
            var e = w();
            return t.copyTo(e), this.reduce(e), e
        }, N.prototype.reduce = function(t) {
            for (; t.t <= this.mt2;) t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var i = 32767 & t[e],
                    r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++
            }
            t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
        }, N.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i), this.reduce(i)
        }, N.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        }, E.prototype.copyTo = function(t) {
            for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
            t.t = this.t, t.s = this.s
        }, E.prototype.fromInt = function(t) {
            this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
        }, E.prototype.fromString = function(t, e) {
            var i;
            if (16 == e) i = 4;
            else if (8 == e) i = 3;
            else if (256 == e) i = 8;
            else if (2 == e) i = 1;
            else if (32 == e) i = 5;
            else {
                if (4 != e) return void this.fromRadix(t, e);
                i = 2
            }
            this.t = 0, this.s = 0;
            for (var r = t.length, n = !1, s = 0; --r >= 0;) {
                var a = 8 == i ? 255 & t[r] : B(t, r);
                a < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1, 0 == s ? this[this.t++] = a : s + i > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, (s += i) >= this.DB && (s -= this.DB))
            }
            8 == i && 0 != (128 & t[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), n && E.ZERO.subTo(this, this)
        }, E.prototype.clamp = function() {
            for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
        }, E.prototype.dlShiftTo = function(t, e) {
            var i;
            for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
            for (i = t - 1; i >= 0; --i) e[i] = 0;
            e.t = this.t + t, e.s = this.s
        }, E.prototype.drShiftTo = function(t, e) {
            for (var i = t; i < this.t; ++i) e[i - t] = this[i];
            e.t = Math.max(this.t - t, 0), e.s = this.s
        }, E.prototype.lShiftTo = function(t, e) {
            var i, r = t % this.DB,
                n = this.DB - r,
                s = (1 << n) - 1,
                a = Math.floor(t / this.DB),
                o = this.s << r & this.DM;
            for (i = this.t - 1; i >= 0; --i) e[i + a + 1] = this[i] >> n | o, o = (this[i] & s) << r;
            for (i = a - 1; i >= 0; --i) e[i] = 0;
            e[a] = o, e.t = this.t + a + 1, e.s = this.s, e.clamp()
        }, E.prototype.rShiftTo = function(t, e) {
            e.s = this.s;
            var i = Math.floor(t / this.DB);
            if (i >= this.t) e.t = 0;
            else {
                var r = t % this.DB,
                    n = this.DB - r,
                    s = (1 << r) - 1;
                e[0] = this[i] >> r;
                for (var a = i + 1; a < this.t; ++a) e[a - i - 1] |= (this[a] & s) << n, e[a - i] = this[a] >> r;
                r > 0 && (e[this.t - i - 1] |= (this.s & s) << n), e.t = this.t - i, e.clamp()
            }
        }, E.prototype.subTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] - t[i], e[i++] = r & this.DM, r >>= this.DB;
            if (t.t < this.t) {
                for (r -= t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t;) r -= t[i], e[i++] = r & this.DM, r >>= this.DB;
                r -= t.s
            }
            e.s = r < 0 ? -1 : 0, r < -1 ? e[i++] = this.DV + r : r > 0 && (e[i++] = r), e.t = i, e.clamp()
        }, E.prototype.multiplyTo = function(t, e) {
            var i = this.abs(),
                r = t.abs(),
                n = i.t;
            for (e.t = n + r.t; --n >= 0;) e[n] = 0;
            for (n = 0; n < r.t; ++n) e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
            e.s = 0, e.clamp(), this.s != t.s && E.ZERO.subTo(e, e)
        }, E.prototype.squareTo = function(t) {
            for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
            for (i = 0; i < e.t - 1; ++i) {
                var r = e.am(i, e[i], t, 2 * i, 0, 1);
                (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
            }
            t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp()
        }, E.prototype.divRemTo = function(t, e, i) {
            var r = t.abs();
            if (!(r.t <= 0)) {
                var n = this.abs();
                if (n.t < r.t) return null != e && e.fromInt(0), void(null != i && this.copyTo(i));
                null == i && (i = w());
                var s = w(),
                    a = this.s,
                    o = t.s,
                    h = this.DB - P(r[r.t - 1]);
                h > 0 ? (r.lShiftTo(h, s), n.lShiftTo(h, i)) : (r.copyTo(s), n.copyTo(i));
                var u = s.t,
                    c = s[u - 1];
                if (0 != c) {
                    var l = c * (1 << this.F1) + (u > 1 ? s[u - 2] >> this.F2 : 0),
                        f = this.FV / l,
                        d = (1 << this.F1) / l,
                        g = 1 << this.F2,
                        p = i.t,
                        y = p - u,
                        v = null == e ? w() : e;
                    for (s.dlShiftTo(y, v), i.compareTo(v) >= 0 && (i[i.t++] = 1, i.subTo(v, i)), E.ONE.dlShiftTo(u, v), v.subTo(s, s); s.t < u;) s[s.t++] = 0;
                    for (; --y >= 0;) {
                        var m = i[--p] == c ? this.DM : Math.floor(i[p] * f + (i[p - 1] + g) * d);
                        if ((i[p] += s.am(0, m, i, y, 0, u)) < m)
                            for (s.dlShiftTo(y, v), i.subTo(v, i); i[p] < --m;) i.subTo(v, i)
                    }
                    null != e && (i.drShiftTo(u, e), a != o && E.ZERO.subTo(e, e)), i.t = u, i.clamp(), h > 0 && i.rShiftTo(h, i), a < 0 && E.ZERO.subTo(i, i)
                }
            }
        }, E.prototype.invDigit = function() {
            if (this.t < 1) return 0;
            var t = this[0];
            if (0 == (1 & t)) return 0;
            var e = 3 & t;
            return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
        }, E.prototype.isEven = function() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }, E.prototype.exp = function(t, e) {
            if (t > 4294967295 || t < 1) return E.ONE;
            var i = w(),
                r = w(),
                n = e.convert(this),
                s = P(t) - 1;
            for (n.copyTo(i); --s >= 0;)
                if (e.sqrTo(i, r), (t & 1 << s) > 0) e.mulTo(r, n, i);
                else {
                    var a = i;
                    i = r, r = a
                } return e.revert(i)
        }, E.prototype.toString = function(t) {
            if (this.s < 0) return "-" + this.negate().toString(t);
            var e;
            if (16 == t) e = 4;
            else if (8 == t) e = 3;
            else if (2 == t) e = 1;
            else if (32 == t) e = 5;
            else {
                if (4 != t) return this.toRadix(t);
                e = 2
            }
            var i, r = (1 << e) - 1,
                n = !1,
                s = "",
                a = this.t,
                o = this.DB - a * this.DB % e;
            if (a-- > 0)
                for (o < this.DB && (i = this[a] >> o) > 0 && (n = !0, s = T(i)); a >= 0;) o < e ? (i = (this[a] & (1 << o) - 1) << e - o, i |= this[--a] >> (o += this.DB - e)) : (i = this[a] >> (o -= e) & r, o <= 0 && (o += this.DB, --a)), i > 0 && (n = !0), n && (s += T(i));
            return n ? s : "0"
        }, E.prototype.negate = function() {
            var t = w();
            return E.ZERO.subTo(this, t), t
        }, E.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }, E.prototype.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e) return e;
            var i = this.t;
            if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
            for (; --i >= 0;)
                if (0 != (e = this[i] - t[i])) return e;
            return 0
        }, E.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + P(this[this.t - 1] ^ this.s & this.DM)
        }, E.prototype.mod = function(t) {
            var e = w();
            return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(E.ZERO) > 0 && t.subTo(e, e), e
        }, E.prototype.modPowInt = function(t, e) {
            var i;
            return i = t < 256 || e.isEven() ? new R(e) : new N(e), this.exp(t, i)
        }, E.ZERO = H(0), E.ONE = H(1), M.prototype.convert = U, M.prototype.revert = U, M.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i)
        }, M.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
        }, q.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
            if (t.compareTo(this.m) < 0) return t;
            var e = w();
            return t.copyTo(e), this.reduce(e), e
        }, q.prototype.revert = function(t) {
            return t
        }, q.prototype.reduce = function(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;) t.subTo(this.m, t)
        }, q.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i), this.reduce(i)
        }, q.prototype.sqrTo = function(t, e) {
            t.squareTo(e), this.reduce(e)
        };
        var _ = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
            z = (1 << 26) / _[_.length - 1];

        function W() {
            this.i = 0, this.j = 0, this.S = new Array
        }
        E.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }, E.prototype.toRadix = function(t) {
            if (null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36) return "0";
            var e = this.chunkSize(t),
                i = Math.pow(t, e),
                r = H(i),
                n = w(),
                s = w(),
                a = "";
            for (this.divRemTo(r, n, s); n.signum() > 0;) a = (i + s.intValue()).toString(t).substr(1) + a, n.divRemTo(r, n, s);
            return s.intValue().toString(t) + a
        }, E.prototype.fromRadix = function(t, e) {
            this.fromInt(0), null == e && (e = 10);
            for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, a = 0, o = 0; o < t.length; ++o) {
                var h = B(t, o);
                h < 0 ? "-" == t.charAt(o) && 0 == this.signum() && (n = !0) : (a = e * a + h, ++s >= i && (this.dMultiply(r), this.dAddOffset(a, 0), s = 0, a = 0))
            }
            s > 0 && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(a, 0)), n && E.ZERO.subTo(this, this)
        }, E.prototype.fromNumber = function(t, e, i) {
            if ("number" == typeof e)
                if (t < 2) this.fromInt(1);
                else
                    for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(E.ONE.shiftLeft(t - 1), O, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(E.ONE.shiftLeft(t - 1), this);
            else {
                var r = new Array,
                    n = 7 & t;
                r.length = 1 + (t >> 3), e.nextBytes(r), n > 0 ? r[0] &= (1 << n) - 1 : r[0] = 0, this.fromString(r, 256)
            }
        }, E.prototype.bitwiseTo = function(t, e, i) {
            var r, n, s = Math.min(t.t, this.t);
            for (r = 0; r < s; ++r) i[r] = e(this[r], t[r]);
            if (t.t < this.t) {
                for (n = t.s & this.DM, r = s; r < this.t; ++r) i[r] = e(this[r], n);
                i.t = this.t
            } else {
                for (n = this.s & this.DM, r = s; r < t.t; ++r) i[r] = e(n, t[r]);
                i.t = t.t
            }
            i.s = e(this.s, t.s), i.clamp()
        }, E.prototype.changeBit = function(t, e) {
            var i = E.ONE.shiftLeft(t);
            return this.bitwiseTo(i, e, i), i
        }, E.prototype.addTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] + t[i], e[i++] = r & this.DM, r >>= this.DB;
            if (t.t < this.t) {
                for (r += t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t;) r += t[i], e[i++] = r & this.DM, r >>= this.DB;
                r += t.s
            }
            e.s = r < 0 ? -1 : 0, r > 0 ? e[i++] = r : r < -1 && (e[i++] = this.DV + r), e.t = i, e.clamp()
        }, E.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }, E.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
                for (; this.t <= e;) this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
            }
        }, E.prototype.multiplyLowerTo = function(t, e, i) {
            var r, n = Math.min(this.t + t.t, e);
            for (i.s = 0, i.t = n; n > 0;) i[--n] = 0;
            for (r = i.t - this.t; n < r; ++n) i[n + this.t] = this.am(0, t[n], i, n, 0, this.t);
            for (r = Math.min(t.t, e); n < r; ++n) this.am(0, t[n], i, n, 0, e - n);
            i.clamp()
        }, E.prototype.multiplyUpperTo = function(t, e, i) {
            --e;
            var r = i.t = this.t + t.t - e;
            for (i.s = 0; --r >= 0;) i[r] = 0;
            for (r = Math.max(e - this.t, 0); r < t.t; ++r) i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
            i.clamp(), i.drShiftTo(1, i)
        }, E.prototype.modInt = function(t) {
            if (t <= 0) return 0;
            var e = this.DV % t,
                i = this.s < 0 ? t - 1 : 0;
            if (this.t > 0)
                if (0 == e) i = this[0] % t;
                else
                    for (var r = this.t - 1; r >= 0; --r) i = (e * i + this[r]) % t;
            return i
        }, E.prototype.millerRabin = function(t) {
            var e = this.subtract(E.ONE),
                i = e.getLowestSetBit();
            if (i <= 0) return !1;
            var r = e.shiftRight(i);
            (t = t + 1 >> 1) > _.length && (t = _.length);
            for (var n = w(), s = 0; s < t; ++s) {
                n.fromInt(_[Math.floor(Math.random() * _.length)]);
                var a = n.modPow(r, this);
                if (0 != a.compareTo(E.ONE) && 0 != a.compareTo(e)) {
                    for (var o = 1; o++ < i && 0 != a.compareTo(e);)
                        if (0 == (a = a.modPowInt(2, this)).compareTo(E.ONE)) return !1;
                    if (0 != a.compareTo(e)) return !1
                }
            }
            return !0
        }, E.prototype.clone = function() {
            var t = w();
            return this.copyTo(t), t
        }, E.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t) return this[0] - this.DV;
                if (0 == this.t) return -1
            } else {
                if (1 == this.t) return this[0];
                if (0 == this.t) return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }, E.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }, E.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }, E.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }, E.prototype.toByteArray = function() {
            var t = this.t,
                e = new Array;
            e[0] = this.s;
            var i, r = this.DB - t * this.DB % 8,
                n = 0;
            if (t-- > 0)
                for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); t >= 0;) r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r, i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --t)), 0 != (128 & i) && (i |= -256), 0 == n && (128 & this.s) != (128 & i) && ++n, (n > 0 || i != this.s) && (e[n++] = i);
            return e
        }, E.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
        }, E.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
        }, E.prototype.max = function(t) {
            return this.compareTo(t) > 0 ? this : t
        }, E.prototype.and = function(t) {
            var e = w();
            return this.bitwiseTo(t, j, e), e
        }, E.prototype.or = function(t) {
            var e = w();
            return this.bitwiseTo(t, O, e), e
        }, E.prototype.xor = function(t) {
            var e = w();
            return this.bitwiseTo(t, V, e), e
        }, E.prototype.andNot = function(t) {
            var e = w();
            return this.bitwiseTo(t, L, e), e
        }, E.prototype.not = function() {
            for (var t = w(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
            return t.t = this.t, t.s = ~this.s, t
        }, E.prototype.shiftLeft = function(t) {
            var e = w();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
        }, E.prototype.shiftRight = function(t) {
            var e = w();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
        }, E.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t]) return t * this.DB + K(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }, E.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += k(this[i] ^ e);
            return t
        }, E.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
        }, E.prototype.setBit = function(t) {
            return this.changeBit(t, O)
        }, E.prototype.clearBit = function(t) {
            return this.changeBit(t, L)
        }, E.prototype.flipBit = function(t) {
            return this.changeBit(t, V)
        }, E.prototype.add = function(t) {
            var e = w();
            return this.addTo(t, e), e
        }, E.prototype.subtract = function(t) {
            var e = w();
            return this.subTo(t, e), e
        }, E.prototype.multiply = function(t) {
            var e = w();
            return this.multiplyTo(t, e), e
        }, E.prototype.divide = function(t) {
            var e = w();
            return this.divRemTo(t, e, null), e
        }, E.prototype.remainder = function(t) {
            var e = w();
            return this.divRemTo(t, null, e), e
        }, E.prototype.divideAndRemainder = function(t) {
            var e = w(),
                i = w();
            return this.divRemTo(t, e, i), new Array(e, i)
        }, E.prototype.modPow = function(t, e) {
            var i, r, n = t.bitLength(),
                s = H(1);
            if (n <= 0) return s;
            i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6, r = n < 8 ? new R(e) : e.isEven() ? new q(e) : new N(e);
            var a = new Array,
                o = 3,
                h = i - 1,
                u = (1 << i) - 1;
            if (a[1] = r.convert(this), i > 1) {
                var c = w();
                for (r.sqrTo(a[1], c); o <= u;) a[o] = w(), r.mulTo(c, a[o - 2], a[o]), o += 2
            }
            var l, f, d = t.t - 1,
                g = !0,
                p = w();
            for (n = P(t[d]) - 1; d >= 0;) {
                for (n >= h ? l = t[d] >> n - h & u : (l = (t[d] & (1 << n + 1) - 1) << h - n, d > 0 && (l |= t[d - 1] >> this.DB + n - h)), o = i; 0 == (1 & l);) l >>= 1, --o;
                if ((n -= o) < 0 && (n += this.DB, --d), g) a[l].copyTo(s), g = !1;
                else {
                    for (; o > 1;) r.sqrTo(s, p), r.sqrTo(p, s), o -= 2;
                    o > 0 ? r.sqrTo(s, p) : (f = s, s = p, p = f), r.mulTo(p, a[l], s)
                }
                for (; d >= 0 && 0 == (t[d] & 1 << n);) r.sqrTo(s, p), f = s, s = p, p = f, --n < 0 && (n = this.DB - 1, --d)
            }
            return r.revert(s)
        }, E.prototype.modInverse = function(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum()) return E.ZERO;
            for (var i = t.clone(), r = this.clone(), n = H(1), s = H(0), a = H(0), o = H(1); 0 != i.signum();) {
                for (; i.isEven();) i.rShiftTo(1, i), e ? (n.isEven() && s.isEven() || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
                for (; r.isEven();) r.rShiftTo(1, r), e ? (a.isEven() && o.isEven() || (a.addTo(this, a), o.subTo(t, o)), a.rShiftTo(1, a)) : o.isEven() || o.subTo(t, o), o.rShiftTo(1, o);
                i.compareTo(r) >= 0 ? (i.subTo(r, i), e && n.subTo(a, n), s.subTo(o, s)) : (r.subTo(i, r), e && a.subTo(n, a), o.subTo(s, o))
            }
            return 0 != r.compareTo(E.ONE) ? E.ZERO : o.compareTo(t) >= 0 ? o.subtract(t) : o.signum() < 0 ? (o.addTo(t, o), o.signum() < 0 ? o.add(t) : o) : o
        }, E.prototype.pow = function(t) {
            return this.exp(t, new M)
        }, E.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone(),
                i = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(i) < 0) {
                var r = e;
                e = i, i = r
            }
            var n = e.getLowestSetBit(),
                s = i.getLowestSetBit();
            if (s < 0) return e;
            for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), i.rShiftTo(s, i)); e.signum() > 0;)(n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e), (n = i.getLowestSetBit()) > 0 && i.rShiftTo(n, i), e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
            return s > 0 && i.lShiftTo(s, i), i
        }, E.prototype.isProbablePrime = function(t) {
            var e, i = this.abs();
            if (1 == i.t && i[0] <= _[_.length - 1]) {
                for (e = 0; e < _.length; ++e)
                    if (i[0] == _[e]) return !0;
                return !1
            }
            if (i.isEven()) return !1;
            for (e = 1; e < _.length;) {
                for (var r = _[e], n = e + 1; n < _.length && r < z;) r *= _[n++];
                for (r = i.modInt(r); e < n;)
                    if (r % _[e++] == 0) return !1
            }
            return i.millerRabin(t)
        }, E.prototype.square = function() {
            var t = w();
            return this.squareTo(t), t
        }, W.prototype.init = function(t) {
            var e, i, r;
            for (e = 0; e < 256; ++e) this.S[e] = e;
            for (i = 0, e = 0; e < 256; ++e) i = i + this.S[e] + t[e % t.length] & 255, r = this.S[e], this.S[e] = this.S[i], this.S[i] = r;
            this.i = 0, this.j = 0
        }, W.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
        };
        var J, G, Y, X = 256;

        function $() {
            var t;
            t = (new Date).getTime(), G[Y++] ^= 255 & t, G[Y++] ^= t >> 8 & 255, G[Y++] ^= t >> 16 & 255, G[Y++] ^= t >> 24 & 255, Y >= X && (Y -= X)
        }
        if (null == G) {
            var Z;
            if (G = new Array, Y = 0, void 0 !== i && (void 0 !== i.crypto || void 0 !== i.msCrypto)) {
                var Q = i.crypto || i.msCrypto;
                if (Q.getRandomValues) {
                    var tt = new Uint8Array(32);
                    for (Q.getRandomValues(tt), Z = 0; Z < 32; ++Z) G[Y++] = tt[Z]
                } else if ("Netscape" == e.appName && e.appVersion < "5") {
                    var et = i.crypto.random(32);
                    for (Z = 0; Z < et.length; ++Z) G[Y++] = 255 & et.charCodeAt(Z)
                }
            }
            for (; Y < X;) Z = Math.floor(65536 * Math.random()), G[Y++] = Z >>> 8, G[Y++] = 255 & Z;
            Y = 0, $()
        }

        function it() {
            if (null == J) {
                for ($(), (J = new W).init(G), Y = 0; Y < G.length; ++Y) G[Y] = 0;
                Y = 0
            }
            return J.next()
        }

        function rt() {}

        function nt(t, e) {
            return new E(t, e)
        }

        function st(t, e, i) {
            for (var r = "", n = 0; r.length < e;) r += i(String.fromCharCode.apply(String, t.concat([(4278190080 & n) >> 24, (16711680 & n) >> 16, (65280 & n) >> 8, 255 & n]))), n += 1;
            return r
        }

        function at() {
            this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
        }

        function ot(t, e, i) {
            for (var r = "", n = 0; r.length < e;) r += i(t + String.fromCharCode.apply(String, [(4278190080 & n) >> 24, (16711680 & n) >> 16, (65280 & n) >> 8, 255 & n])), n += 1;
            return r
        }

        function ht(t, e) {
            this.x = e, this.q = t
        }

        function ut(t, e, i, r) {
            this.curve = t, this.x = e, this.y = i, this.z = null == r ? E.ONE : r, this.zinv = null
        }

        function ct(t, e, i) {
            this.q = t, this.a = this.fromBigInteger(e), this.b = this.fromBigInteger(i), this.infinity = new ut(this, null, null)
        }
        rt.prototype.nextBytes = function(t) {
            var e;
            for (e = 0; e < t.length; ++e) t[e] = it()
        }, at.prototype.doPublic = function(t) {
            return t.modPowInt(this.e, this.n)
        }, at.prototype.setPublic = function(t, e) {
            if (this.isPublic = !0, this.isPrivate = !1, "string" != typeof t) this.n = t, this.e = e;
            else {
                if (!(null != t && null != e && t.length > 0 && e.length > 0)) throw "Invalid RSA public key";
                this.n = nt(t, 16), this.e = parseInt(e, 16)
            }
        }, at.prototype.encrypt = function(t) {
            var e = function(t, e) {
                if (e < t.length + 11) throw "Message too long for RSA";
                for (var i = new Array, r = t.length - 1; r >= 0 && e > 0;) {
                    var n = t.charCodeAt(r--);
                    n < 128 ? i[--e] = n : n > 127 && n < 2048 ? (i[--e] = 63 & n | 128, i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128, i[--e] = n >> 6 & 63 | 128, i[--e] = n >> 12 | 224)
                }
                i[--e] = 0;
                for (var s = new rt, a = new Array; e > 2;) {
                    for (a[0] = 0; 0 == a[0];) s.nextBytes(a);
                    i[--e] = a[0]
                }
                return i[--e] = 2, i[--e] = 0, new E(i)
            }(t, this.n.bitLength() + 7 >> 3);
            if (null == e) return null;
            var i = this.doPublic(e);
            if (null == i) return null;
            var r = i.toString(16);
            return 0 == (1 & r.length) ? r : "0" + r
        }, at.prototype.encryptOAEP = function(t, e, i) {
            var r = function(t, e, i, r) {
                var n = ft.crypto.MessageDigest,
                    s = ft.crypto.Util,
                    a = null;
                if (i || (i = "sha1"), "string" == typeof i && (a = n.getCanonicalAlgName(i), r = n.getHashLength(a), i = function(t) {
                        return Ct(s.hashHex(Dt(t), a))
                    }), t.length + 2 * r + 2 > e) throw "Message too long for RSA";
                var o, h = "";
                for (o = 0; o < e - t.length - 2 * r - 2; o += 1) h += "\0";
                var u = i("") + h + "\x01" + t,
                    c = new Array(r);
                (new rt).nextBytes(c);
                var l = st(c, u.length, i),
                    f = [];
                for (o = 0; o < u.length; o += 1) f[o] = u.charCodeAt(o) ^ l.charCodeAt(o);
                var d = st(f, c.length, i),
                    g = [0];
                for (o = 0; o < c.length; o += 1) g[o + 1] = c[o] ^ d.charCodeAt(o);
                return new E(g.concat(f))
            }(t, this.n.bitLength() + 7 >> 3, e, i);
            if (null == r) return null;
            var n = this.doPublic(r);
            if (null == n) return null;
            var s = n.toString(16);
            return 0 == (1 & s.length) ? s : "0" + s
        }, at.prototype.type = "RSA", at.prototype.doPrivate = function(t) {
            if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;) e = e.add(this.p);
            return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
        }, at.prototype.setPrivate = function(t, e, i) {
            if (this.isPrivate = !0, "string" != typeof t) this.n = t, this.e = e, this.d = i;
            else {
                if (!(null != t && null != e && t.length > 0 && e.length > 0)) throw "Invalid RSA private key";
                this.n = nt(t, 16), this.e = parseInt(e, 16), this.d = nt(i, 16)
            }
        }, at.prototype.setPrivateEx = function(t, e, i, r, n, s, a, o) {
            if (this.isPrivate = !0, this.isPublic = !1, null == t) throw "RSASetPrivateEx N == null";
            if (null == e) throw "RSASetPrivateEx E == null";
            if (0 == t.length) throw "RSASetPrivateEx N.length == 0";
            if (0 == e.length) throw "RSASetPrivateEx E.length == 0";
            if (!(null != t && null != e && t.length > 0 && e.length > 0)) throw "Invalid RSA private key in RSASetPrivateEx";
            this.n = nt(t, 16), this.e = parseInt(e, 16), this.d = nt(i, 16), this.p = nt(r, 16), this.q = nt(n, 16), this.dmp1 = nt(s, 16), this.dmq1 = nt(a, 16), this.coeff = nt(o, 16)
        }, at.prototype.generate = function(t, e) {
            var i = new rt,
                r = t >> 1;
            this.e = parseInt(e, 16);
            for (var n = new E(e, 16);;) {
                for (; this.p = new E(t - r, 1, i), 0 != this.p.subtract(E.ONE).gcd(n).compareTo(E.ONE) || !this.p.isProbablePrime(10););
                for (; this.q = new E(r, 1, i), 0 != this.q.subtract(E.ONE).gcd(n).compareTo(E.ONE) || !this.q.isProbablePrime(10););
                if (this.p.compareTo(this.q) <= 0) {
                    var s = this.p;
                    this.p = this.q, this.q = s
                }
                var a = this.p.subtract(E.ONE),
                    o = this.q.subtract(E.ONE),
                    h = a.multiply(o);
                if (0 == h.gcd(n).compareTo(E.ONE)) {
                    this.n = this.p.multiply(this.q), this.d = n.modInverse(h), this.dmp1 = this.d.mod(a), this.dmq1 = this.d.mod(o), this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
            this.isPrivate = !0
        }, at.prototype.decrypt = function(t) {
            var e = nt(t, 16),
                i = this.doPrivate(e);
            return null == i ? null : function(t, e) {
                for (var i = t.toByteArray(), r = 0; r < i.length && 0 == i[r];) ++r;
                if (i.length - r != e - 1 || 2 != i[r]) return null;
                for (++r; 0 != i[r];)
                    if (++r >= i.length) return null;
                for (var n = ""; ++r < i.length;) {
                    var s = 255 & i[r];
                    s < 128 ? n += String.fromCharCode(s) : s > 191 && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]), ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]), r += 2)
                }
                return n
            }(i, this.n.bitLength() + 7 >> 3)
        }, at.prototype.decryptOAEP = function(t, e, i) {
            var r = nt(t, 16),
                n = this.doPrivate(r);
            return null == n ? null : function(t, e, i, r) {
                var n = ft.crypto.MessageDigest,
                    s = ft.crypto.Util,
                    a = null;
                for (i || (i = "sha1"), "string" == typeof i && (a = n.getCanonicalAlgName(i), r = n.getHashLength(a), i = function(t) {
                        return Ct(s.hashHex(Dt(t), a))
                    }), t = t.toByteArray(), o = 0; o < t.length; o += 1) t[o] &= 255;
                for (; t.length < e;) t.unshift(0);
                if ((t = String.fromCharCode.apply(String, t)).length < 2 * r + 2) throw "Cipher too short";
                var o, h = t.substr(1, r),
                    u = t.substr(r + 1),
                    c = ot(u, r, i),
                    l = [];
                for (o = 0; o < h.length; o += 1) l[o] = h.charCodeAt(o) ^ c.charCodeAt(o);
                var f = ot(String.fromCharCode.apply(String, l), t.length - r, i),
                    d = [];
                for (o = 0; o < u.length; o += 1) d[o] = u.charCodeAt(o) ^ f.charCodeAt(o);
                if ((d = String.fromCharCode.apply(String, d)).substr(0, r) !== i("")) throw "Hash mismatch";
                var g = (d = d.substr(r)).indexOf("\x01");
                if ((-1 != g ? d.substr(0, g).lastIndexOf("\0") : -1) + 1 != g) throw "Malformed data";
                return d.substr(g + 1)
            }(n, this.n.bitLength() + 7 >> 3, e, i)
        }, ht.prototype.equals = function(t) {
            return t == this || this.q.equals(t.q) && this.x.equals(t.x)
        }, ht.prototype.toBigInteger = function() {
            return this.x
        }, ht.prototype.negate = function() {
            return new ht(this.q, this.x.negate().mod(this.q))
        }, ht.prototype.add = function(t) {
            return new ht(this.q, this.x.add(t.toBigInteger()).mod(this.q))
        }, ht.prototype.subtract = function(t) {
            return new ht(this.q, this.x.subtract(t.toBigInteger()).mod(this.q))
        }, ht.prototype.multiply = function(t) {
            return new ht(this.q, this.x.multiply(t.toBigInteger()).mod(this.q))
        }, ht.prototype.square = function() {
            return new ht(this.q, this.x.square().mod(this.q))
        }, ht.prototype.divide = function(t) {
            return new ht(this.q, this.x.multiply(t.toBigInteger().modInverse(this.q)).mod(this.q))
        }, ut.prototype.getX = function() {
            return null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))
        }, ut.prototype.getY = function() {
            return null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q)), this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))
        }, ut.prototype.equals = function(t) {
            return t == this || (this.isInfinity() ? t.isInfinity() : t.isInfinity() ? this.isInfinity() : !!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(E.ZERO) && t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(E.ZERO))
        }, ut.prototype.isInfinity = function() {
            return null == this.x && null == this.y || this.z.equals(E.ZERO) && !this.y.toBigInteger().equals(E.ZERO)
        }, ut.prototype.negate = function() {
            return new ut(this.curve, this.x, this.y.negate(), this.z)
        }, ut.prototype.add = function(t) {
            if (this.isInfinity()) return t;
            if (t.isInfinity()) return this;
            var e = t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q),
                i = t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q);
            if (E.ZERO.equals(i)) return E.ZERO.equals(e) ? this.twice() : this.curve.getInfinity();
            var r = new E("3"),
                n = this.x.toBigInteger(),
                s = this.y.toBigInteger(),
                a = (t.x.toBigInteger(), t.y.toBigInteger(), i.square()),
                o = a.multiply(i),
                h = n.multiply(a),
                u = e.square().multiply(this.z),
                c = u.subtract(h.shiftLeft(1)).multiply(t.z).subtract(o).multiply(i).mod(this.curve.q),
                l = h.multiply(r).multiply(e).subtract(s.multiply(o)).subtract(u.multiply(e)).multiply(t.z).add(e.multiply(o)).mod(this.curve.q),
                f = o.multiply(this.z).multiply(t.z).mod(this.curve.q);
            return new ut(this.curve, this.curve.fromBigInteger(c), this.curve.fromBigInteger(l), f)
        }, ut.prototype.twice = function() {
            if (this.isInfinity()) return this;
            if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
            var t = new E("3"),
                e = this.x.toBigInteger(),
                i = this.y.toBigInteger(),
                r = i.multiply(this.z),
                n = r.multiply(i).mod(this.curve.q),
                s = this.curve.a.toBigInteger(),
                a = e.square().multiply(t);
            E.ZERO.equals(s) || (a = a.add(this.z.square().multiply(s)));
            var o = (a = a.mod(this.curve.q)).square().subtract(e.shiftLeft(3).multiply(n)).shiftLeft(1).multiply(r).mod(this.curve.q),
                h = a.multiply(t).multiply(e).subtract(n.shiftLeft(1)).shiftLeft(2).multiply(n).subtract(a.square().multiply(a)).mod(this.curve.q),
                u = r.square().multiply(r).shiftLeft(3).mod(this.curve.q);
            return new ut(this.curve, this.curve.fromBigInteger(o), this.curve.fromBigInteger(h), u)
        }, ut.prototype.multiply = function(t) {
            if (this.isInfinity()) return this;
            if (0 == t.signum()) return this.curve.getInfinity();
            var e, i = t,
                r = i.multiply(new E("3")),
                n = this.negate(),
                s = this;
            for (e = r.bitLength() - 2; e > 0; --e) {
                s = s.twice();
                var a = r.testBit(e);
                a != i.testBit(e) && (s = s.add(a ? this : n))
            }
            return s
        }, ut.prototype.multiplyTwo = function(t, e, i) {
            var r;
            r = t.bitLength() > i.bitLength() ? t.bitLength() - 1 : i.bitLength() - 1;
            for (var n = this.curve.getInfinity(), s = this.add(e); r >= 0;) n = n.twice(), t.testBit(r) ? n = i.testBit(r) ? n.add(s) : n.add(this) : i.testBit(r) && (n = n.add(e)), --r;
            return n
        }, ct.prototype.getQ = function() {
            return this.q
        }, ct.prototype.getA = function() {
            return this.a
        }, ct.prototype.getB = function() {
            return this.b
        }, ct.prototype.equals = function(t) {
            return t == this || this.q.equals(t.q) && this.a.equals(t.a) && this.b.equals(t.b)
        }, ct.prototype.getInfinity = function() {
            return this.infinity
        }, ct.prototype.fromBigInteger = function(t) {
            return new ht(this.q, t)
        }, ct.prototype.decodePointHex = function(t) {
            switch (parseInt(t.substr(0, 2), 16)) {
                case 0:
                    return this.infinity;
                case 2:
                case 3:
                    return null;
                case 4:
                case 6:
                case 7:
                    var e = (t.length - 2) / 2,
                        i = t.substr(2, e),
                        r = t.substr(e + 2, e);
                    return new ut(this, this.fromBigInteger(new E(i, 16)), this.fromBigInteger(new E(r, 16)));
                default:
                    return null
            }
        }, ht.prototype.getByteLength = function() {
            return Math.floor((this.toBigInteger().bitLength() + 7) / 8)
        }, ut.prototype.getEncoded = function(t) {
            var e = function(t, e) {
                    var i = t.toByteArrayUnsigned();
                    if (e < i.length) i = i.slice(i.length - e);
                    else
                        for (; e > i.length;) i.unshift(0);
                    return i
                },
                i = this.getX().toBigInteger(),
                r = this.getY().toBigInteger(),
                n = e(i, 32);
            return t ? r.isEven() ? n.unshift(2) : n.unshift(3) : (n.unshift(4), n = n.concat(e(r, 32))), n
        }, ut.decodeFrom = function(t, e) {
            e[0];
            var i = e.length - 1,
                r = e.slice(1, 1 + i / 2),
                n = e.slice(1 + i / 2, 1 + i);
            r.unshift(0), n.unshift(0);
            var s = new E(r),
                a = new E(n);
            return new ut(t, t.fromBigInteger(s), t.fromBigInteger(a))
        }, ut.decodeFromHex = function(t, e) {
            e.substr(0, 2);
            var i = e.length - 2,
                r = e.substr(2, i / 2),
                n = e.substr(2 + i / 2, i / 2),
                s = new E(r, 16),
                a = new E(n, 16);
            return new ut(t, t.fromBigInteger(s), t.fromBigInteger(a))
        }, ut.prototype.add2D = function(t) {
            if (this.isInfinity()) return t;
            if (t.isInfinity()) return this;
            if (this.x.equals(t.x)) return this.y.equals(t.y) ? this.twice() : this.curve.getInfinity();
            var e = t.x.subtract(this.x),
                i = t.y.subtract(this.y).divide(e),
                r = i.square().subtract(this.x).subtract(t.x),
                n = i.multiply(this.x.subtract(r)).subtract(this.y);
            return new ut(this.curve, r, n)
        }, ut.prototype.twice2D = function() {
            if (this.isInfinity()) return this;
            if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
            var t = this.curve.fromBigInteger(E.valueOf(2)),
                e = this.curve.fromBigInteger(E.valueOf(3)),
                i = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(t)),
                r = i.square().subtract(this.x.multiply(t)),
                n = i.multiply(this.x.subtract(r)).subtract(this.y);
            return new ut(this.curve, r, n)
        }, ut.prototype.multiply2D = function(t) {
            if (this.isInfinity()) return this;
            if (0 == t.signum()) return this.curve.getInfinity();
            var e, i = t,
                r = i.multiply(new E("3")),
                n = this.negate(),
                s = this;
            for (e = r.bitLength() - 2; e > 0; --e) {
                s = s.twice();
                var a = r.testBit(e);
                a != i.testBit(e) && (s = s.add2D(a ? this : n))
            }
            return s
        }, ut.prototype.isOnCurve = function() {
            var t = this.getX().toBigInteger(),
                e = this.getY().toBigInteger(),
                i = this.curve.getA().toBigInteger(),
                r = this.curve.getB().toBigInteger(),
                n = this.curve.getQ(),
                s = e.multiply(e).mod(n),
                a = t.multiply(t).multiply(t).add(i.multiply(t)).add(r).mod(n);
            return s.equals(a)
        }, ut.prototype.toString = function() {
            return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")"
        }, ut.prototype.validate = function() {
            var t = this.curve.getQ();
            if (this.isInfinity()) throw new Error("Point is at infinity.");
            var e = this.getX().toBigInteger(),
                i = this.getY().toBigInteger();
            if (e.compareTo(E.ONE) < 0 || e.compareTo(t.subtract(E.ONE)) > 0) throw new Error("x coordinate out of bounds");
            if (i.compareTo(E.ONE) < 0 || i.compareTo(t.subtract(E.ONE)) > 0) throw new Error("y coordinate out of bounds");
            if (!this.isOnCurve()) throw new Error("Point is not on the curve.");
            if (this.multiply(t).isInfinity()) throw new Error("Point is not a scalar multiple of G.");
            return !0
        };
        var lt = function() {
            var t = new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))', "g"),
                e = new RegExp("\\\\(?:([^u])|u(.{4}))", "g"),
                i = {
                    '"': '"',
                    "/": "/",
                    "\\": "\\",
                    b: "\b",
                    f: "\f",
                    n: "\n",
                    r: "\r",
                    t: "\t"
                };

            function r(t, e, r) {
                return e ? i[e] : String.fromCharCode(parseInt(r, 16))
            }
            var n = new String(""),
                s = (Object, Array, Object.hasOwnProperty);
            return function(i, a) {
                var o, h, u = i.match(t),
                    c = u[0],
                    l = !1;
                "{" === c ? o = {} : "[" === c ? o = [] : (o = [], l = !0);
                for (var f = [o], d = 1 - l, g = u.length; d < g; ++d) {
                    var p;
                    switch ((c = u[d]).charCodeAt(0)) {
                        default:
                            (p = f[0])[h || p.length] = +c, h = void 0;
                            break;
                        case 34:
                            if (-1 !== (c = c.substring(1, c.length - 1)).indexOf("\\") && (c = c.replace(e, r)), p = f[0], !h) {
                                if (!(p instanceof Array)) {
                                    h = c || n;
                                    break
                                }
                                h = p.length
                            }
                            p[h] = c, h = void 0;
                            break;
                        case 91:
                            p = f[0], f.unshift(p[h || p.length] = []), h = void 0;
                            break;
                        case 93:
                            f.shift();
                            break;
                        case 102:
                            (p = f[0])[h || p.length] = !1, h = void 0;
                            break;
                        case 110:
                            (p = f[0])[h || p.length] = null, h = void 0;
                            break;
                        case 116:
                            (p = f[0])[h || p.length] = !0, h = void 0;
                            break;
                        case 123:
                            p = f[0], f.unshift(p[h || p.length] = {}), h = void 0;
                            break;
                        case 125:
                            f.shift()
                    }
                }
                if (l) {
                    if (1 !== f.length) throw new Error;
                    o = o[0]
                } else if (f.length) throw new Error;
                if (a) {
                    var y = function(t, e) {
                        var i = t[e];
                        if (i && "object" == typeof i) {
                            var r = null;
                            for (var n in i)
                                if (s.call(i, n) && i !== t) {
                                    var o = y(i, n);
                                    void 0 !== o ? i[n] = o : (r || (r = []), r.push(n))
                                } if (r)
                                for (var h = r.length; --h >= 0;) delete i[r[h]]
                        }
                        return a.call(t, e, i)
                    };
                    o = y({
                        "": o
                    }, "")
                }
                return o
            }
        }();
        void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), ft.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e), e
            }, this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var i = e.substr(1).length;
                    i % 2 == 1 ? i += 1 : e.match(/^[0-7]/) || (i += 2);
                    for (var r = "", n = 0; n < i; n++) r += "f";
                    e = new E(r, 16).xor(t).add(E.ONE).toString(16).replace(/^-/, "")
                }
                return e
            }, this.getPEMStringFromHex = function(t, e) {
                return Ht(t, e)
            }, this.newObject = function(t) {
                var e = ft.asn1,
                    i = e.DERBoolean,
                    r = e.DERInteger,
                    n = e.DERBitString,
                    s = e.DEROctetString,
                    a = e.DERNull,
                    o = e.DERObjectIdentifier,
                    h = e.DEREnumerated,
                    u = e.DERUTF8String,
                    c = e.DERNumericString,
                    l = e.DERPrintableString,
                    f = e.DERTeletexString,
                    d = e.DERIA5String,
                    g = e.DERUTCTime,
                    p = e.DERGeneralizedTime,
                    y = e.DERSequence,
                    v = e.DERSet,
                    m = e.DERTaggedObject,
                    S = e.ASN1Util.newObject,
                    F = Object.keys(t);
                if (1 != F.length) throw "key of param shall be only one.";
                var x = F[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + x + ":")) throw "undefined key: " + x;
                if ("bool" == x) return new i(t[x]);
                if ("int" == x) return new r(t[x]);
                if ("bitstr" == x) return new n(t[x]);
                if ("octstr" == x) return new s(t[x]);
                if ("null" == x) return new a(t[x]);
                if ("oid" == x) return new o(t[x]);
                if ("enum" == x) return new h(t[x]);
                if ("utf8str" == x) return new u(t[x]);
                if ("numstr" == x) return new c(t[x]);
                if ("prnstr" == x) return new l(t[x]);
                if ("telstr" == x) return new f(t[x]);
                if ("ia5str" == x) return new d(t[x]);
                if ("utctime" == x) return new g(t[x]);
                if ("gentime" == x) return new p(t[x]);
                if ("seq" == x) {
                    for (var b = t[x], E = [], w = 0; w < b.length; w++) {
                        var A = S(b[w]);
                        E.push(A)
                    }
                    return new y({
                        array: E
                    })
                }
                if ("set" == x) {
                    for (b = t[x], E = [], w = 0; w < b.length; w++) A = S(b[w]), E.push(A);
                    return new v({
                        array: E
                    })
                }
                if ("tag" == x) {
                    var C = t[x];
                    if ("[object Array]" === Object.prototype.toString.call(C) && 3 == C.length) {
                        var D = S(C[2]);
                        return new m({
                            tag: C[0],
                            explicit: C[1],
                            obj: D
                        })
                    }
                    var I = {};
                    if (void 0 !== C.explicit && (I.explicit = C.explicit), void 0 !== C.tag && (I.tag = C.tag), void 0 === C.obj) throw "obj shall be specified for 'tag'.";
                    return I.obj = S(C.obj), new m(I)
                }
            }, this.jsonToASN1HEX = function(t) {
                return this.newObject(t).getEncodedHex()
            }
        }, ft.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var e = "", i = parseInt(t.substr(0, 2), 16), r = (e = Math.floor(i / 40) + "." + i % 40, ""), n = 2; n < t.length; n += 2) {
                var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
                r += s.substr(1, 7), "0" == s.substr(0, 1) && (e = e + "." + new E(r, 2).toString(10), r = "")
            }
            return e
        }, ft.asn1.ASN1Util.oidIntToHex = function(t) {
            var e = function(t) {
                    var e = t.toString(16);
                    return 1 == e.length && (e = "0" + e), e
                },
                i = function(t) {
                    var i = "",
                        r = new E(t, 10).toString(2),
                        n = 7 - r.length % 7;
                    7 == n && (n = 0);
                    for (var s = "", a = 0; a < n; a++) s += "0";
                    for (r = s + r, a = 0; a < r.length - 1; a += 7) {
                        var o = r.substr(a, 7);
                        a != r.length - 7 && (o = "1" + o), i += e(parseInt(o, 2))
                    }
                    return i
                };
            if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
            var r = "",
                n = t.split("."),
                s = 40 * parseInt(n[0]) + parseInt(n[1]);
            r += e(s), n.splice(0, 2);
            for (var a = 0; a < n.length; a++) r += i(n[a]);
            return r
        }, ft.asn1.ASN1Object = function() {
            this.getLengthHexFromValue = function() {
                if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2,
                    e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e), t < 128) return e;
                var i = e.length / 2;
                if (i > 15) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                return (128 + i).toString(16) + e
            }, this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
            }, this.getValueHex = function() {
                return this.getEncodedHex(), this.hV
            }, this.getFreshValueHex = function() {
                return ""
            }
        }, ft.asn1.DERAbstractString = function(t) {
            ft.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
                return this.s
            }, this.setString = function(t) {
                this.hTLV = null, this.isModified = !0, this.s = t, this.hV = wt(this.s).toLowerCase()
            }, this.setStringHex = function(t) {
                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }, r.lang.extend(ft.asn1.DERAbstractString, ft.asn1.ASN1Object), ft.asn1.DERAbstractTime = function(t) {
            ft.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
                return utc = t.getTime() + 6e4 * t.getTimezoneOffset(), new Date(utc)
            }, this.formatDate = function(t, e, i) {
                var r = this.zeroPadding,
                    n = this.localDateToUTC(t),
                    s = String(n.getFullYear());
                "utc" == e && (s = s.substr(2, 2));
                var a = s + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
                if (!0 === i) {
                    var o = n.getMilliseconds();
                    if (0 != o) {
                        var h = r(String(o), 3);
                        a = a + "." + (h = h.replace(/[0]+$/, ""))
                    }
                }
                return a + "Z"
            }, this.zeroPadding = function(t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }, this.getString = function() {
                return this.s
            }, this.setString = function(t) {
                this.hTLV = null, this.isModified = !0, this.s = t, this.hV = St(t)
            }, this.setByDateValue = function(t, e, i, r, n, s) {
                var a = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
                this.setByDate(a)
            }, this.getFreshValueHex = function() {
                return this.hV
            }
        }, r.lang.extend(ft.asn1.DERAbstractTime, ft.asn1.ASN1Object), ft.asn1.DERAbstractStructured = function(t) {
            ft.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
                this.hTLV = null, this.isModified = !0, this.asn1Array = t
            }, this.appendASN1Object = function(t) {
                this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
            }, this.asn1Array = new Array, void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }, r.lang.extend(ft.asn1.DERAbstractStructured, ft.asn1.ASN1Object), ft.asn1.DERBoolean = function() {
            ft.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
        }, r.lang.extend(ft.asn1.DERBoolean, ft.asn1.ASN1Object), ft.asn1.DERInteger = function(t) {
            ft.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
                this.hTLV = null, this.isModified = !0, this.hV = ft.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }, this.setByInteger = function(t) {
                var e = new E(String(t), 10);
                this.setByBigInteger(e)
            }, this.setValueHex = function(t) {
                this.hV = t
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }, r.lang.extend(ft.asn1.DERInteger, ft.asn1.ASN1Object), ft.asn1.DERBitString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = ft.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            ft.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null, this.isModified = !0, this.hV = t
            }, this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
                var i = "0" + t;
                this.hTLV = null, this.isModified = !0, this.hV = i + e
            }, this.setByBinaryString = function(t) {
                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                8 == e && (e = 0);
                for (var i = 0; i <= e; i++) t += "0";
                var r = "";
                for (i = 0; i < t.length - 1; i += 8) {
                    var n = t.substr(i, 8),
                        s = parseInt(n, 2).toString(16);
                    1 == s.length && (s = "0" + s), r += s
                }
                this.hTLV = null, this.isModified = !0, this.hV = "0" + e + r
            }, this.setByBooleanArray = function(t) {
                for (var e = "", i = 0; i < t.length; i++) 1 == t[i] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }, this.newFalseArray = function(t) {
                for (var e = new Array(t), i = 0; i < t; i++) e[i] = !1;
                return e
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }, r.lang.extend(ft.asn1.DERBitString, ft.asn1.ASN1Object), ft.asn1.DEROctetString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = ft.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            ft.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04"
        }, r.lang.extend(ft.asn1.DEROctetString, ft.asn1.DERAbstractString), ft.asn1.DERNull = function() {
            ft.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
        }, r.lang.extend(ft.asn1.DERNull, ft.asn1.ASN1Object), ft.asn1.DERObjectIdentifier = function(t) {
            var e = function(t) {
                    var e = t.toString(16);
                    return 1 == e.length && (e = "0" + e), e
                },
                i = function(t) {
                    var i = "",
                        r = new E(t, 10).toString(2),
                        n = 7 - r.length % 7;
                    7 == n && (n = 0);
                    for (var s = "", a = 0; a < n; a++) s += "0";
                    for (r = s + r, a = 0; a < r.length - 1; a += 7) {
                        var o = r.substr(a, 7);
                        a != r.length - 7 && (o = "1" + o), i += e(parseInt(o, 2))
                    }
                    return i
                };
            ft.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(t) {
                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
            }, this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
                var r = "",
                    n = t.split("."),
                    s = 40 * parseInt(n[0]) + parseInt(n[1]);
                r += e(s), n.splice(0, 2);
                for (var a = 0; a < n.length; a++) r += i(n[a]);
                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r
            }, this.setValueName = function(t) {
                var e = ft.asn1.x509.OID.name2oid(t);
                if ("" === e) throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }, r.lang.extend(ft.asn1.DERObjectIdentifier, ft.asn1.ASN1Object), ft.asn1.DEREnumerated = function(t) {
            ft.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
                this.hTLV = null, this.isModified = !0, this.hV = ft.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }, this.setByInteger = function(t) {
                var e = new E(String(t), 10);
                this.setByBigInteger(e)
            }, this.setValueHex = function(t) {
                this.hV = t
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }, r.lang.extend(ft.asn1.DEREnumerated, ft.asn1.ASN1Object), ft.asn1.DERUTF8String = function(t) {
            ft.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c"
        }, r.lang.extend(ft.asn1.DERUTF8String, ft.asn1.DERAbstractString), ft.asn1.DERNumericString = function(t) {
            ft.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12"
        }, r.lang.extend(ft.asn1.DERNumericString, ft.asn1.DERAbstractString), ft.asn1.DERPrintableString = function(t) {
            ft.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13"
        }, r.lang.extend(ft.asn1.DERPrintableString, ft.asn1.DERAbstractString), ft.asn1.DERTeletexString = function(t) {
            ft.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14"
        }, r.lang.extend(ft.asn1.DERTeletexString, ft.asn1.DERAbstractString), ft.asn1.DERIA5String = function(t) {
            ft.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16"
        }, r.lang.extend(ft.asn1.DERIA5String, ft.asn1.DERAbstractString), ft.asn1.DERUTCTime = function(t) {
            ft.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function(t) {
                this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = St(this.s)
            }, this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = St(this.s)), this.hV
            }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }, r.lang.extend(ft.asn1.DERUTCTime, ft.asn1.DERAbstractTime), ft.asn1.DERGeneralizedTime = function(t) {
            ft.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.withMillis = !1, this.setByDate = function(t) {
                this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = St(this.s)
            }, this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = St(this.s)), this.hV
            }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date), !0 === t.millis && (this.withMillis = !0))
        }, r.lang.extend(ft.asn1.DERGeneralizedTime, ft.asn1.DERAbstractTime), ft.asn1.DERSequence = function(t) {
            ft.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function() {
                for (var t = "", e = 0; e < this.asn1Array.length; e++) t += this.asn1Array[e].getEncodedHex();
                return this.hV = t, this.hV
            }
        }, r.lang.extend(ft.asn1.DERSequence, ft.asn1.DERAbstractStructured), ft.asn1.DERSet = function(t) {
            ft.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var i = this.asn1Array[e];
                    t.push(i.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(), this.hV = t.join(""), this.hV
            }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }, r.lang.extend(ft.asn1.DERSet, ft.asn1.DERAbstractStructured), ft.asn1.DERTaggedObject = function(t) {
            ft.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(t, e, i) {
                this.hT = e, this.isExplicit = t, this.asn1Object = i, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = i.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1)
            }, this.getFreshValueHex = function() {
                return this.hV
            }, void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag), void 0 !== t.explicit && (this.isExplicit = t.explicit), void 0 !== t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }, r.lang.extend(ft.asn1.DERTaggedObject, ft.asn1.ASN1Object);
        var ft, dt, gt, pt = new function() {};

        function yt(t) {
            for (var e = new Array, i = 0; i < t.length; i++) e[i] = t.charCodeAt(i);
            return e
        }

        function vt(t) {
            for (var e = "", i = 0; i < t.length; i++) e += String.fromCharCode(t[i]);
            return e
        }

        function mt(t) {
            for (var e = "", i = 0; i < t.length; i++) {
                var r = t[i].toString(16);
                1 == r.length && (r = "0" + r), e += r
            }
            return e
        }

        function St(t) {
            return mt(yt(t))
        }

        function Ft(t) {
            return (t = (t = t.replace(/\=/g, "")).replace(/\+/g, "-")).replace(/\//g, "_")
        }

        function xt(t) {
            return t.length % 4 == 2 ? t += "==" : t.length % 4 == 3 && (t += "="), (t = t.replace(/-/g, "+")).replace(/_/g, "/")
        }

        function bt(t) {
            return t.length % 2 == 1 && (t = "0" + t), Ft(F(t))
        }

        function Et(t) {
            return x(xt(t))
        }

        function wt(t) {
            return jt(kt(t))
        }

        function At(t) {
            return decodeURIComponent(Ot(t))
        }

        function Ct(t) {
            for (var e = "", i = 0; i < t.length - 1; i += 2) e += String.fromCharCode(parseInt(t.substr(i, 2), 16));
            return e
        }

        function Dt(t) {
            for (var e = "", i = 0; i < t.length; i++) e += ("0" + t.charCodeAt(i).toString(16)).slice(-2);
            return e
        }

        function It(t) {
            return F(t)
        }

        function Tt(t) {
            var e = It(t).replace(/(.{64})/g, "$1\r\n");
            return e.replace(/\r\n$/, "")
        }

        function Bt(t) {
            return x(t.replace(/[^0-9A-Za-z\/+=]*/g, ""))
        }

        function Ht(t, e) {
            return "-----BEGIN " + e + "-----\r\n" + Tt(t) + "\r\n-----END " + e + "-----\r\n"
        }

        function Pt(t, e) {
            if (-1 == t.indexOf("-----BEGIN ")) throw "can't find PEM header: " + e;
            return Bt(t = void 0 !== e ? (t = t.replace("-----BEGIN " + e + "-----", "")).replace("-----END " + e + "-----", "") : (t = t.replace(/-----BEGIN [^-]+-----/, "")).replace(/-----END [^-]+-----/, ""))
        }

        function Rt(t) {
            var e, i, r, n, s, a, o, h, u, c, l;
            if (l = t.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/)) return h = l[1], e = parseInt(h), 2 === h.length && (50 <= e && e < 100 ? e = 1900 + e : 0 <= e && e < 50 && (e = 2e3 + e)), i = parseInt(l[2]) - 1, r = parseInt(l[3]), n = parseInt(l[4]), s = parseInt(l[5]), a = parseInt(l[6]), o = 0, "" !== (u = l[7]) && (c = (u.substr(1) + "00").substr(0, 3), o = parseInt(c)), Date.UTC(e, i, r, n, s, a, o);
            throw "unsupported zulu format: " + t
        }

        function Nt(t) {
            return ~~(Rt(t) / 1e3)
        }

        function jt(t) {
            return t.replace(/%/g, "")
        }

        function Ot(t) {
            return t.replace(/(..)/g, "%$1")
        }

        function Vt(t) {
            var e = "malformed IPv6 address";
            if (!t.match(/^[0-9A-Fa-f:]+$/)) throw e;
            var i = (t = t.toLowerCase()).split(":").length - 1;
            if (i < 2) throw e;
            var r = ":".repeat(7 - i + 2),
                n = (t = t.replace("::", r)).split(":");
            if (8 != n.length) throw e;
            for (var s = 0; s < 8; s++) n[s] = ("0000" + n[s]).slice(-4);
            return n.join("")
        }

        function Lt(t) {
            if (!t.match(/^[0-9A-Fa-f]{32}$/)) throw "malformed IPv6 address octet";
            for (var e = (t = t.toLowerCase()).match(/.{1,4}/g), i = 0; i < 8; i++) e[i] = e[i].replace(/^0+/, ""), "" == e[i] && (e[i] = "0");
            var r = (t = ":" + e.join(":") + ":").match(/:(0:){2,}/g);
            if (null === r) return t.slice(1, -1);
            var n = "";
            for (i = 0; i < r.length; i++) r[i].length > n.length && (n = r[i]);
            return (t = t.replace(n, "::")).slice(1, -1)
        }

        function Kt(t) {
            var e = "malformed hex value";
            if (!t.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) throw e;
            if (8 != t.length) return 32 == t.length ? Lt(t) : t;
            try {
                return parseInt(t.substr(0, 2), 16) + "." + parseInt(t.substr(2, 2), 16) + "." + parseInt(t.substr(4, 2), 16) + "." + parseInt(t.substr(6, 2), 16)
            } catch (s) {
                throw e
            }
        }

        function kt(t) {
            for (var e = encodeURIComponent(t), i = "", r = 0; r < e.length; r++) "%" == e[r] ? (i += e.substr(r, 3), r += 2) : i = i + "%" + St(e[r]);
            return i
        }

        function Mt(t) {
            return t.length % 2 == 1 ? "0" + t : t.substr(0, 1) > "7" ? "00" + t : t
        }

        function Ut(t) {
            t = (t = (t = t.replace(/^\s*\[\s*/, "")).replace(/\s*\]\s*$/, "")).replace(/\s*/g, "");
            try {
                return t.split(/,/).map(function(t, e, i) {
                    var r = parseInt(t);
                    if (r < 0 || 255 < r) throw "integer not in range 0-255";
                    return ("00" + r.toString(16)).slice(-2)
                }).join("")
            } catch (s) {
                throw "malformed integer array string: " + s
            }
        }
        pt.getLblen = function(t, e) {
            if ("8" != t.substr(e + 2, 1)) return 1;
            var i = parseInt(t.substr(e + 3, 1));
            return 0 == i ? -1 : 0 < i && i < 10 ? i + 1 : -2
        }, pt.getL = function(t, e) {
            var i = pt.getLblen(t, e);
            return i < 1 ? "" : t.substr(e + 2, 2 * i)
        }, pt.getVblen = function(t, e) {
            var i;
            return "" == (i = pt.getL(t, e)) ? -1 : ("8" === i.substr(0, 1) ? new E(i.substr(2), 16) : new E(i, 16)).intValue()
        }, pt.getVidx = function(t, e) {
            var i = pt.getLblen(t, e);
            return i < 0 ? i : e + 2 * (i + 1)
        }, pt.getV = function(t, e) {
            var i = pt.getVidx(t, e),
                r = pt.getVblen(t, e);
            return t.substr(i, 2 * r)
        }, pt.getTLV = function(t, e) {
            return t.substr(e, 2) + pt.getL(t, e) + pt.getV(t, e)
        }, pt.getNextSiblingIdx = function(t, e) {
            return pt.getVidx(t, e) + 2 * pt.getVblen(t, e)
        }, pt.getChildIdx = function(t, e) {
            var i = pt,
                r = new Array,
                n = i.getVidx(t, e);
            "03" == t.substr(e, 2) ? r.push(n + 2) : r.push(n);
            for (var s = i.getVblen(t, e), a = n, o = 0;;) {
                var h = i.getNextSiblingIdx(t, a);
                if (null == h || h - n >= 2 * s) break;
                if (o >= 200) break;
                r.push(h), a = h, o++
            }
            return r
        }, pt.getNthChildIdx = function(t, e, i) {
            return pt.getChildIdx(t, e)[i]
        }, pt.getIdxbyList = function(t, e, i, r) {
            var n, s, a = pt;
            if (0 == i.length) {
                if (void 0 !== r && t.substr(e, 2) !== r) throw "checking tag doesn't match: " + t.substr(e, 2) + "!=" + r;
                return e
            }
            return n = i.shift(), s = a.getChildIdx(t, e), a.getIdxbyList(t, s[n], i, r)
        }, pt.getTLVbyList = function(t, e, i, r) {
            var n = pt,
                s = n.getIdxbyList(t, e, i);
            if (void 0 === s) throw "can't find nthList object";
            if (void 0 !== r && t.substr(s, 2) != r) throw "checking tag doesn't match: " + t.substr(s, 2) + "!=" + r;
            return n.getTLV(t, s)
        }, pt.getVbyList = function(t, e, i, r, n) {
            var s, a, o = pt;
            if (void 0 === (s = o.getIdxbyList(t, e, i, r))) throw "can't find nthList object";
            return a = o.getV(t, s), !0 === n && (a = a.substr(2)), a
        }, pt.hextooidstr = function(t) {
            var e = function(t, e) {
                    return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                },
                i = [],
                r = t.substr(0, 2),
                n = parseInt(r, 16);
            i[0] = new String(Math.floor(n / 40)), i[1] = new String(n % 40);
            for (var s = t.substr(2), a = [], o = 0; o < s.length / 2; o++) a.push(parseInt(s.substr(2 * o, 2), 16));
            var h = [],
                u = "";
            for (o = 0; o < a.length; o++) 128 & a[o] ? u += e((127 & a[o]).toString(2), 7) : (u += e((127 & a[o]).toString(2), 7), h.push(new String(parseInt(u, 2))), u = "");
            var c = i.join(".");
            return h.length > 0 && (c = c + "." + h.join(".")), c
        }, pt.dump = function(t, e, i, r) {
            var n = pt,
                s = n.getV,
                a = n.dump,
                o = n.getChildIdx,
                h = t;
            t instanceof ft.asn1.ASN1Object && (h = t.getEncodedHex());
            var u = function(t, e) {
                return t.length <= 2 * e ? t : t.substr(0, e) + "..(total " + t.length / 2 + "bytes).." + t.substr(t.length - e, e)
            };
            void 0 === e && (e = {
                ommit_long_octet: 32
            }), void 0 === i && (i = 0), void 0 === r && (r = "");
            var c = e.ommit_long_octet;
            if ("01" == h.substr(i, 2)) return "00" == (l = s(h, i)) ? r + "BOOLEAN FALSE\n" : r + "BOOLEAN TRUE\n";
            if ("02" == h.substr(i, 2)) return r + "INTEGER " + u(l = s(h, i), c) + "\n";
            if ("03" == h.substr(i, 2)) return r + "BITSTRING " + u(l = s(h, i), c) + "\n";
            if ("04" == h.substr(i, 2)) {
                var l = s(h, i);
                return n.isASN1HEX(l) ? (b = r + "OCTETSTRING, encapsulates\n") + a(l, e, 0, r + "  ") : r + "OCTETSTRING " + u(l, c) + "\n"
            }
            if ("05" == h.substr(i, 2)) return r + "NULL\n";
            if ("06" == h.substr(i, 2)) {
                var f = s(h, i),
                    d = ft.asn1.ASN1Util.oidHexToInt(f),
                    g = ft.asn1.x509.OID.oid2name(d),
                    p = d.replace(/\./g, " ");
                return "" != g ? r + "ObjectIdentifier " + g + " (" + p + ")\n" : r + "ObjectIdentifier (" + p + ")\n"
            }
            if ("0c" == h.substr(i, 2)) return r + "UTF8String '" + At(s(h, i)) + "'\n";
            if ("13" == h.substr(i, 2)) return r + "PrintableString '" + At(s(h, i)) + "'\n";
            if ("14" == h.substr(i, 2)) return r + "TeletexString '" + At(s(h, i)) + "'\n";
            if ("16" == h.substr(i, 2)) return r + "IA5String '" + At(s(h, i)) + "'\n";
            if ("17" == h.substr(i, 2)) return r + "UTCTime " + At(s(h, i)) + "\n";
            if ("18" == h.substr(i, 2)) return r + "GeneralizedTime " + At(s(h, i)) + "\n";
            if ("30" == h.substr(i, 2)) {
                if ("3000" == h.substr(i, 4)) return r + "SEQUENCE {}\n";
                b = r + "SEQUENCE\n";
                var y = e;
                if ((2 == (S = o(h, i)).length || 3 == S.length) && "06" == h.substr(S[0], 2) && "04" == h.substr(S[S.length - 1], 2)) {
                    g = n.oidname(s(h, S[0]));
                    var v = JSON.parse(JSON.stringify(e));
                    v.x509ExtName = g, y = v
                }
                for (var m = 0; m < S.length; m++) b += a(h, y, S[m], r + "  ");
                return b
            }
            if ("31" == h.substr(i, 2)) {
                b = r + "SET\n";
                var S = o(h, i);
                for (m = 0; m < S.length; m++) b += a(h, e, S[m], r + "  ");
                return b
            }
            var F = parseInt(h.substr(i, 2), 16);
            if (0 != (128 & F)) {
                var x = 31 & F;
                if (0 != (32 & F)) {
                    var b = r + "[" + x + "]\n";
                    for (S = o(h, i), m = 0; m < S.length; m++) b += a(h, e, S[m], r + "  ");
                    return b
                }
                return "68747470" == (l = s(h, i)).substr(0, 8) && (l = At(l)), "subjectAltName" === e.x509ExtName && 2 == x && (l = At(l)), r + "[" + x + "] " + l + "\n"
            }
            return r + "UNKNOWN(" + h.substr(i, 2) + ") " + s(h, i) + "\n"
        }, pt.isASN1HEX = function(t) {
            var e = pt;
            if (t.length % 2 == 1) return !1;
            var i = e.getVblen(t, 0),
                r = t.substr(0, 2),
                n = e.getL(t, 0);
            return t.length - r.length - n.length == 2 * i
        }, pt.oidname = function(t) {
            var e = ft.asn1;
            ft.lang.String.isHex(t) && (t = e.ASN1Util.oidHexToInt(t));
            var i = e.x509.OID.oid2name(t);
            return "" === i && (i = t), i
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), void 0 !== ft.asn1.x509 && ft.asn1.x509 || (ft.asn1.x509 = {}), ft.asn1.x509.Certificate = function(t) {
            ft.asn1.x509.Certificate.superclass.constructor.call(this);
            var e = ft,
                i = (e.crypto, e.asn1),
                r = i.DERSequence,
                n = i.DERBitString;
            this.sign = function() {
                this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
                var t = new ft.crypto.Signature({
                    alg: this.asn1SignatureAlg.nameAlg
                });
                t.init(this.prvKey), t.updateHex(this.asn1TBSCert.getEncodedHex()), this.hexSig = t.sign(), this.asn1Sig = new n({
                    hex: "00" + this.hexSig
                });
                var e = new r({
                    array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
                });
                this.hTLV = e.getEncodedHex(), this.isModified = !1
            }, this.setSignatureHex = function(t) {
                this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg, this.hexSig = t, this.asn1Sig = new n({
                    hex: "00" + this.hexSig
                });
                var e = new r({
                    array: [this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig]
                });
                this.hTLV = e.getEncodedHex(), this.isModified = !1
            }, this.getEncodedHex = function() {
                if (0 == this.isModified && null != this.hTLV) return this.hTLV;
                throw "not signed yet"
            }, this.getPEMString = function() {
                return "-----BEGIN CERTIFICATE-----\r\n" + Tt(this.getEncodedHex()) + "\r\n-----END CERTIFICATE-----\r\n"
            }, void 0 !== t && (void 0 !== t.tbscertobj && (this.asn1TBSCert = t.tbscertobj), void 0 !== t.prvkeyobj && (this.prvKey = t.prvkeyobj))
        }, r.lang.extend(ft.asn1.x509.Certificate, ft.asn1.ASN1Object), ft.asn1.x509.TBSCertificate = function(t) {
            ft.asn1.x509.TBSCertificate.superclass.constructor.call(this);
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DERInteger,
                n = e.DERTaggedObject,
                s = e.x509,
                a = s.Time,
                o = s.X500Name,
                h = s.SubjectPublicKeyInfo;
            this._initialize = function() {
                this.asn1Array = new Array, this.asn1Version = new n({
                    obj: new r({
                        int: 2
                    })
                }), this.asn1SerialNumber = null, this.asn1SignatureAlg = null, this.asn1Issuer = null, this.asn1NotBefore = null, this.asn1NotAfter = null, this.asn1Subject = null, this.asn1SubjPKey = null, this.extensionsArray = new Array
            }, this.setSerialNumberByParam = function(t) {
                this.asn1SerialNumber = new r(t)
            }, this.setSignatureAlgByParam = function(t) {
                this.asn1SignatureAlg = new s.AlgorithmIdentifier(t)
            }, this.setIssuerByParam = function(t) {
                this.asn1Issuer = new o(t)
            }, this.setNotBeforeByParam = function(t) {
                this.asn1NotBefore = new a(t)
            }, this.setNotAfterByParam = function(t) {
                this.asn1NotAfter = new a(t)
            }, this.setSubjectByParam = function(t) {
                this.asn1Subject = new o(t)
            }, this.setSubjectPublicKey = function(t) {
                this.asn1SubjPKey = new h(t)
            }, this.setSubjectPublicKeyByGetKey = function(t) {
                var e = qt.getKey(t);
                this.asn1SubjPKey = new h(e)
            }, this.appendExtension = function(t) {
                this.extensionsArray.push(t)
            }, this.appendExtensionByName = function(t, e) {
                ft.asn1.x509.Extension.appendByNameToArray(t, e, this.extensionsArray)
            }, this.getEncodedHex = function() {
                if (null == this.asn1NotBefore || null == this.asn1NotAfter) throw "notBefore and/or notAfter not set";
                var t = new i({
                    array: [this.asn1NotBefore, this.asn1NotAfter]
                });
                if (this.asn1Array = new Array, this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1SerialNumber), this.asn1Array.push(this.asn1SignatureAlg), this.asn1Array.push(this.asn1Issuer), this.asn1Array.push(t), this.asn1Array.push(this.asn1Subject), this.asn1Array.push(this.asn1SubjPKey), this.extensionsArray.length > 0) {
                    var e = new i({
                            array: this.extensionsArray
                        }),
                        r = new n({
                            explicit: !0,
                            tag: "a3",
                            obj: e
                        });
                    this.asn1Array.push(r)
                }
                var s = new i({
                    array: this.asn1Array
                });
                return this.hTLV = s.getEncodedHex(), this.isModified = !1, this.hTLV
            }, this._initialize()
        }, r.lang.extend(ft.asn1.x509.TBSCertificate, ft.asn1.ASN1Object), ft.asn1.x509.Extension = function(t) {
            ft.asn1.x509.Extension.superclass.constructor.call(this);
            var e = ft.asn1,
                i = e.DERObjectIdentifier,
                r = e.DEROctetString,
                n = (e.DERBitString, e.DERBoolean),
                s = e.DERSequence;
            this.getEncodedHex = function() {
                var t = new i({
                        oid: this.oid
                    }),
                    e = new r({
                        hex: this.getExtnValueHex()
                    }),
                    a = new Array;
                return a.push(t), this.critical && a.push(new n), a.push(e), new s({
                    array: a
                }).getEncodedHex()
            }, this.critical = !1, void 0 !== t && void 0 !== t.critical && (this.critical = t.critical)
        }, r.lang.extend(ft.asn1.x509.Extension, ft.asn1.ASN1Object), ft.asn1.x509.Extension.appendByNameToArray = function(t, e, i) {
            var r = t.toLowerCase(),
                n = ft.asn1.x509;
            if ("basicconstraints" == r) {
                var s = new n.BasicConstraints(e);
                i.push(s)
            } else if ("keyusage" == r) s = new n.KeyUsage(e), i.push(s);
            else if ("crldistributionpoints" == r) s = new n.CRLDistributionPoints(e), i.push(s);
            else if ("extkeyusage" == r) s = new n.ExtKeyUsage(e), i.push(s);
            else if ("authoritykeyidentifier" == r) s = new n.AuthorityKeyIdentifier(e), i.push(s);
            else if ("authorityinfoaccess" == r) s = new n.AuthorityInfoAccess(e), i.push(s);
            else if ("subjectaltname" == r) s = new n.SubjectAltName(e), i.push(s);
            else {
                if ("issueraltname" != r) throw "unsupported extension name: " + t;
                s = new n.IssuerAltName(e), i.push(s)
            }
        }, ft.asn1.x509.KeyUsage = function(t) {
            ft.asn1.x509.KeyUsage.superclass.constructor.call(this, t);
            var e = Gt.KEYUSAGE_NAME;
            if (this.getExtnValueHex = function() {
                    return this.asn1ExtnValue.getEncodedHex()
                }, this.oid = "2.5.29.15", void 0 !== t && (void 0 !== t.bin && (this.asn1ExtnValue = new ft.asn1.DERBitString(t)), void 0 !== t.names && void 0 !== t.names.length)) {
                for (var i = t.names, r = "000000000", n = 0; n < i.length; n++)
                    for (var s = 0; s < e.length; s++) i[n] === e[s] && (r = r.substring(0, s) + "1" + r.substring(s + 1, r.length));
                this.asn1ExtnValue = new ft.asn1.DERBitString({
                    bin: r
                })
            }
        }, r.lang.extend(ft.asn1.x509.KeyUsage, ft.asn1.x509.Extension), ft.asn1.x509.BasicConstraints = function(t) {
            ft.asn1.x509.BasicConstraints.superclass.constructor.call(this, t), this.getExtnValueHex = function() {
                var t = new Array;
                this.cA && t.push(new ft.asn1.DERBoolean), this.pathLen > -1 && t.push(new ft.asn1.DERInteger({
                    int: this.pathLen
                }));
                var e = new ft.asn1.DERSequence({
                    array: t
                });
                return this.asn1ExtnValue = e, this.asn1ExtnValue.getEncodedHex()
            }, this.oid = "2.5.29.19", this.cA = !1, this.pathLen = -1, void 0 !== t && (void 0 !== t.cA && (this.cA = t.cA), void 0 !== t.pathLen && (this.pathLen = t.pathLen))
        }, r.lang.extend(ft.asn1.x509.BasicConstraints, ft.asn1.x509.Extension), ft.asn1.x509.CRLDistributionPoints = function(t) {
            ft.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, t);
            var e = ft.asn1,
                i = e.x509;
            this.getExtnValueHex = function() {
                return this.asn1ExtnValue.getEncodedHex()
            }, this.setByDPArray = function(t) {
                this.asn1ExtnValue = new e.DERSequence({
                    array: t
                })
            }, this.setByOneURI = function(t) {
                var e = new i.GeneralNames([{
                        uri: t
                    }]),
                    r = new i.DistributionPointName(e),
                    n = new i.DistributionPoint({
                        dpobj: r
                    });
                this.setByDPArray([n])
            }, this.oid = "2.5.29.31", void 0 !== t && (void 0 !== t.array ? this.setByDPArray(t.array) : void 0 !== t.uri && this.setByOneURI(t.uri))
        }, r.lang.extend(ft.asn1.x509.CRLDistributionPoints, ft.asn1.x509.Extension), ft.asn1.x509.ExtKeyUsage = function(t) {
            ft.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, t);
            var e = ft.asn1;
            this.setPurposeArray = function(t) {
                this.asn1ExtnValue = new e.DERSequence;
                for (var i = 0; i < t.length; i++) {
                    var r = new e.DERObjectIdentifier(t[i]);
                    this.asn1ExtnValue.appendASN1Object(r)
                }
            }, this.getExtnValueHex = function() {
                return this.asn1ExtnValue.getEncodedHex()
            }, this.oid = "2.5.29.37", void 0 !== t && void 0 !== t.array && this.setPurposeArray(t.array)
        }, r.lang.extend(ft.asn1.x509.ExtKeyUsage, ft.asn1.x509.Extension), ft.asn1.x509.AuthorityKeyIdentifier = function(t) {
            ft.asn1.x509.AuthorityKeyIdentifier.superclass.constructor.call(this, t);
            var e = ft.asn1,
                i = e.DERTaggedObject;
            this.asn1KID = null, this.asn1CertIssuer = null, this.asn1CertSN = null, this.getExtnValueHex = function() {
                var t = new Array;
                this.asn1KID && t.push(new i({
                    explicit: !1,
                    tag: "80",
                    obj: this.asn1KID
                })), this.asn1CertIssuer && t.push(new i({
                    explicit: !1,
                    tag: "a1",
                    obj: this.asn1CertIssuer
                })), this.asn1CertSN && t.push(new i({
                    explicit: !1,
                    tag: "82",
                    obj: this.asn1CertSN
                }));
                var r = new e.DERSequence({
                    array: t
                });
                return this.asn1ExtnValue = r, this.asn1ExtnValue.getEncodedHex()
            }, this.setKIDByParam = function(t) {
                this.asn1KID = new ft.asn1.DEROctetString(t)
            }, this.setCertIssuerByParam = function(t) {
                this.asn1CertIssuer = new ft.asn1.x509.X500Name(t)
            }, this.setCertSNByParam = function(t) {
                this.asn1CertSN = new ft.asn1.DERInteger(t)
            }, this.oid = "2.5.29.35", void 0 !== t && (void 0 !== t.kid && this.setKIDByParam(t.kid), void 0 !== t.issuer && this.setCertIssuerByParam(t.issuer), void 0 !== t.sn && this.setCertSNByParam(t.sn))
        }, r.lang.extend(ft.asn1.x509.AuthorityKeyIdentifier, ft.asn1.x509.Extension), ft.asn1.x509.AuthorityInfoAccess = function(t) {
            ft.asn1.x509.AuthorityInfoAccess.superclass.constructor.call(this, t), this.setAccessDescriptionArray = function(t) {
                for (var e = new Array, i = ft.asn1, r = i.DERSequence, n = 0; n < t.length; n++) {
                    var s = new r({
                        array: [new i.DERObjectIdentifier(t[n].accessMethod), new i.x509.GeneralName(t[n].accessLocation)]
                    });
                    e.push(s)
                }
                this.asn1ExtnValue = new r({
                    array: e
                })
            }, this.getExtnValueHex = function() {
                return this.asn1ExtnValue.getEncodedHex()
            }, this.oid = "1.3.6.1.5.5.7.1.1", void 0 !== t && void 0 !== t.array && this.setAccessDescriptionArray(t.array)
        }, r.lang.extend(ft.asn1.x509.AuthorityInfoAccess, ft.asn1.x509.Extension), ft.asn1.x509.SubjectAltName = function(t) {
            ft.asn1.x509.SubjectAltName.superclass.constructor.call(this, t), this.setNameArray = function(t) {
                this.asn1ExtnValue = new ft.asn1.x509.GeneralNames(t)
            }, this.getExtnValueHex = function() {
                return this.asn1ExtnValue.getEncodedHex()
            }, this.oid = "2.5.29.17", void 0 !== t && void 0 !== t.array && this.setNameArray(t.array)
        }, r.lang.extend(ft.asn1.x509.SubjectAltName, ft.asn1.x509.Extension), ft.asn1.x509.IssuerAltName = function(t) {
            ft.asn1.x509.IssuerAltName.superclass.constructor.call(this, t), this.setNameArray = function(t) {
                this.asn1ExtnValue = new ft.asn1.x509.GeneralNames(t)
            }, this.getExtnValueHex = function() {
                return this.asn1ExtnValue.getEncodedHex()
            }, this.oid = "2.5.29.18", void 0 !== t && void 0 !== t.array && this.setNameArray(t.array)
        }, r.lang.extend(ft.asn1.x509.IssuerAltName, ft.asn1.x509.Extension), ft.asn1.x509.CRL = function(t) {
            ft.asn1.x509.CRL.superclass.constructor.call(this), this.sign = function() {
                this.asn1SignatureAlg = this.asn1TBSCertList.asn1SignatureAlg, sig = new ft.crypto.Signature({
                    alg: "SHA1withRSA",
                    prov: "cryptojs/jsrsa"
                }), sig.init(this.prvKey), sig.updateHex(this.asn1TBSCertList.getEncodedHex()), this.hexSig = sig.sign(), this.asn1Sig = new ft.asn1.DERBitString({
                    hex: "00" + this.hexSig
                });
                var t = new ft.asn1.DERSequence({
                    array: [this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig]
                });
                this.hTLV = t.getEncodedHex(), this.isModified = !1
            }, this.getEncodedHex = function() {
                if (0 == this.isModified && null != this.hTLV) return this.hTLV;
                throw "not signed yet"
            }, this.getPEMString = function() {
                return "-----BEGIN X509 CRL-----\r\n" + Tt(this.getEncodedHex()) + "\r\n-----END X509 CRL-----\r\n"
            }, void 0 !== t && (void 0 !== t.tbsobj && (this.asn1TBSCertList = t.tbsobj), void 0 !== t.prvkeyobj && (this.prvKey = t.prvkeyobj))
        }, r.lang.extend(ft.asn1.x509.CRL, ft.asn1.ASN1Object), ft.asn1.x509.TBSCertList = function(t) {
            ft.asn1.x509.TBSCertList.superclass.constructor.call(this);
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.x509,
                n = r.Time;
            this.setSignatureAlgByParam = function(t) {
                this.asn1SignatureAlg = new r.AlgorithmIdentifier(t)
            }, this.setIssuerByParam = function(t) {
                this.asn1Issuer = new r.X500Name(t)
            }, this.setThisUpdateByParam = function(t) {
                this.asn1ThisUpdate = new n(t)
            }, this.setNextUpdateByParam = function(t) {
                this.asn1NextUpdate = new n(t)
            }, this.addRevokedCert = function(t, e) {
                var i = {};
                null != t && null != t && (i.sn = t), null != e && null != e && (i.time = e);
                var n = new r.CRLEntry(i);
                this.aRevokedCert.push(n)
            }, this.getEncodedHex = function() {
                if (this.asn1Array = new Array, null != this.asn1Version && this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1SignatureAlg), this.asn1Array.push(this.asn1Issuer), this.asn1Array.push(this.asn1ThisUpdate), null != this.asn1NextUpdate && this.asn1Array.push(this.asn1NextUpdate), this.aRevokedCert.length > 0) {
                    var t = new i({
                        array: this.aRevokedCert
                    });
                    this.asn1Array.push(t)
                }
                var e = new i({
                    array: this.asn1Array
                });
                return this.hTLV = e.getEncodedHex(), this.isModified = !1, this.hTLV
            }, this._initialize = function() {
                this.asn1Version = null, this.asn1SignatureAlg = null, this.asn1Issuer = null, this.asn1ThisUpdate = null, this.asn1NextUpdate = null, this.aRevokedCert = new Array
            }, this._initialize()
        }, r.lang.extend(ft.asn1.x509.TBSCertList, ft.asn1.ASN1Object), ft.asn1.x509.CRLEntry = function(t) {
            ft.asn1.x509.CRLEntry.superclass.constructor.call(this);
            var e = ft.asn1;
            this.setCertSerial = function(t) {
                this.sn = new e.DERInteger(t)
            }, this.setRevocationDate = function(t) {
                this.time = new e.x509.Time(t)
            }, this.getEncodedHex = function() {
                var t = new e.DERSequence({
                    array: [this.sn, this.time]
                });
                return this.TLV = t.getEncodedHex(), this.TLV
            }, void 0 !== t && (void 0 !== t.time && this.setRevocationDate(t.time), void 0 !== t.sn && this.setCertSerial(t.sn))
        }, r.lang.extend(ft.asn1.x509.CRLEntry, ft.asn1.ASN1Object), ft.asn1.x509.X500Name = function(t) {
            ft.asn1.x509.X500Name.superclass.constructor.call(this), this.asn1Array = new Array;
            var e, i = ft.asn1,
                r = i.x509,
                n = Pt;
            (this.setByString = function(t) {
                var e = t.split("/");
                e.shift();
                for (var i = [], n = 0; n < e.length; n++)
                    if (e[n].match(/^[^=]+=.+$/)) i.push(e[n]);
                    else {
                        var s = i.length - 1;
                        i[s] = i[s] + "/" + e[n]
                    } for (n = 0; n < i.length; n++) this.asn1Array.push(new r.RDN({
                    str: i[n]
                }))
            }, this.setByLdapString = function(t) {
                var e = r.X500Name.ldapToOneline(t);
                this.setByString(e)
            }, this.setByObject = function(t) {
                for (var e in t)
                    if (t.hasOwnProperty(e)) {
                        var i = new ft.asn1.x509.RDN({
                            str: e + "=" + t[e]
                        });
                        this.asn1Array ? this.asn1Array.push(i) : this.asn1Array = [i]
                    }
            }, this.getEncodedHex = function() {
                if ("string" == typeof this.hTLV) return this.hTLV;
                var t = new i.DERSequence({
                    array: this.asn1Array
                });
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, void 0 !== t) && (void 0 !== t.str ? this.setByString(t.str) : void 0 !== t.ldapstr ? this.setByLdapString(t.ldapstr) : "object" == typeof t && this.setByObject(t), void 0 !== t.certissuer && ((e = new Gt).hex = n(t.certissuer), this.hTLV = e.getIssuerHex()), void 0 !== t.certsubject && ((e = new Gt).hex = n(t.certsubject), this.hTLV = e.getSubjectHex()))
        }, r.lang.extend(ft.asn1.x509.X500Name, ft.asn1.ASN1Object), ft.asn1.x509.X500Name.onelineToLDAP = function(t) {
            if ("/" !== t.substr(0, 1)) throw "malformed input";
            var e = (t = t.substr(1)).split("/");
            return e.reverse(), (e = e.map(function(t) {
                return t.replace(/,/, "\\,")
            })).join(",")
        }, ft.asn1.x509.X500Name.ldapToOneline = function(t) {
            for (var e = t.split(","), i = !1, r = [], n = 0; e.length > 0; n++) {
                var s = e.shift();
                if (!0 === i) {
                    var a = (r.pop() + "," + s).replace(/\\,/g, ",");
                    r.push(a), i = !1
                } else r.push(s);
                "\\" === s.substr(-1, 1) && (i = !0)
            }
            return (r = r.map(function(t) {
                return t.replace("/", "\\/")
            })).reverse(), "/" + r.join("/")
        }, ft.asn1.x509.RDN = function(t) {
            ft.asn1.x509.RDN.superclass.constructor.call(this), this.asn1Array = new Array, this.addByString = function(t) {
                this.asn1Array.push(new ft.asn1.x509.AttributeTypeAndValue({
                    str: t
                }))
            }, this.addByMultiValuedString = function(t) {
                for (var e = ft.asn1.x509.RDN.parseString(t), i = 0; i < e.length; i++) this.addByString(e[i])
            }, this.getEncodedHex = function() {
                var t = new ft.asn1.DERSet({
                    array: this.asn1Array
                });
                return this.TLV = t.getEncodedHex(), this.TLV
            }, void 0 !== t && void 0 !== t.str && this.addByMultiValuedString(t.str)
        }, r.lang.extend(ft.asn1.x509.RDN, ft.asn1.ASN1Object), ft.asn1.x509.RDN.parseString = function(t) {
            for (var e = t.split(/\+/), i = !1, r = [], n = 0; e.length > 0; n++) {
                var s = e.shift();
                if (!0 === i) {
                    var a = (r.pop() + "+" + s).replace(/\\\+/g, "+");
                    r.push(a), i = !1
                } else r.push(s);
                "\\" === s.substr(-1, 1) && (i = !0)
            }
            var o = !1,
                h = [];
            for (n = 0; r.length > 0; n++) {
                if (s = r.shift(), !0 === o) {
                    var u = h.pop();
                    s.match(/"$/) ? (a = (u + "+" + s).replace(/^([^=]+)="(.*)"$/, "$1=$2"), h.push(a), o = !1) : h.push(u + "+" + s)
                } else h.push(s);
                s.match(/^[^=]+="/) && (o = !0)
            }
            return h
        }, ft.asn1.x509.AttributeTypeAndValue = function(t) {
            ft.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
            var e = ft.asn1;
            this.setByString = function(t) {
                var e = t.match(/^([^=]+)=(.+)$/);
                if (!e) throw "malformed attrTypeAndValueStr: " + t;
                this.setByAttrTypeAndValueStr(e[1], e[2])
            }, this.setByAttrTypeAndValueStr = function(t, e) {
                this.typeObj = ft.asn1.x509.OID.atype2obj(t);
                var i = "utf8";
                "C" == t && (i = "prn"), this.valueObj = this.getValueObj(i, e)
            }, this.getValueObj = function(t, i) {
                if ("utf8" == t) return new e.DERUTF8String({
                    str: i
                });
                if ("prn" == t) return new e.DERPrintableString({
                    str: i
                });
                if ("tel" == t) return new e.DERTeletexString({
                    str: i
                });
                if ("ia5" == t) return new e.DERIA5String({
                    str: i
                });
                throw "unsupported directory string type: type=" + t + " value=" + i
            }, this.getEncodedHex = function() {
                var t = new e.DERSequence({
                    array: [this.typeObj, this.valueObj]
                });
                return this.TLV = t.getEncodedHex(), this.TLV
            }, void 0 !== t && void 0 !== t.str && this.setByString(t.str)
        }, r.lang.extend(ft.asn1.x509.AttributeTypeAndValue, ft.asn1.ASN1Object), ft.asn1.x509.SubjectPublicKeyInfo = function(t) {
            ft.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
            var e = ft,
                i = e.asn1,
                r = i.DERInteger,
                n = i.DERBitString,
                s = i.DERObjectIdentifier,
                a = i.DERSequence,
                o = i.ASN1Util.newObject,
                h = i.x509.AlgorithmIdentifier,
                u = e.crypto;
            u.ECDSA, u.DSA, this.getASN1Object = function() {
                if (null == this.asn1AlgId || null == this.asn1SubjPKey) throw "algId and/or subjPubKey not set";
                return new a({
                    array: [this.asn1AlgId, this.asn1SubjPKey]
                })
            }, this.getEncodedHex = function() {
                var t = this.getASN1Object();
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, this.setPubKey = function(t) {
                try {
                    if (t instanceof at) {
                        var e = o({
                            seq: [{
                                int: {
                                    bigint: t.n
                                }
                            }, {
                                int: {
                                    int: t.e
                                }
                            }]
                        }).getEncodedHex();
                        this.asn1AlgId = new h({
                            name: "rsaEncryption"
                        }), this.asn1SubjPKey = new n({
                            hex: "00" + e
                        })
                    }
                } catch (u) {}
                try {
                    if (t instanceof ft.crypto.ECDSA) {
                        var i = new s({
                            name: t.curveName
                        });
                        this.asn1AlgId = new h({
                            name: "ecPublicKey",
                            asn1params: i
                        }), this.asn1SubjPKey = new n({
                            hex: "00" + t.pubKeyHex
                        })
                    }
                } catch (u) {}
                try {
                    if (t instanceof ft.crypto.DSA) {
                        i = new o({
                            seq: [{
                                int: {
                                    bigint: t.p
                                }
                            }, {
                                int: {
                                    bigint: t.q
                                }
                            }, {
                                int: {
                                    bigint: t.g
                                }
                            }]
                        }), this.asn1AlgId = new h({
                            name: "dsa",
                            asn1params: i
                        });
                        var a = new r({
                            bigint: t.y
                        });
                        this.asn1SubjPKey = new n({
                            hex: "00" + a.getEncodedHex()
                        })
                    }
                } catch (u) {}
            }, void 0 !== t && this.setPubKey(t)
        }, r.lang.extend(ft.asn1.x509.SubjectPublicKeyInfo, ft.asn1.ASN1Object), ft.asn1.x509.Time = function(t) {
            ft.asn1.x509.Time.superclass.constructor.call(this);
            var e = ft.asn1,
                i = e.DERUTCTime,
                r = e.DERGeneralizedTime;
            this.setTimeParams = function(t) {
                this.timeParams = t
            }, this.getEncodedHex = function() {
                var t = null;
                return t = null != this.timeParams ? "utc" == this.type ? new i(this.timeParams) : new r(this.timeParams) : "utc" == this.type ? new i : new r, this.TLV = t.getEncodedHex(), this.TLV
            }, this.type = "utc", void 0 !== t && (void 0 !== t.type ? this.type = t.type : void 0 !== t.str && (t.str.match(/^[0-9]{12}Z$/) && (this.type = "utc"), t.str.match(/^[0-9]{14}Z$/) && (this.type = "gen")), this.timeParams = t)
        }, r.lang.extend(ft.asn1.x509.Time, ft.asn1.ASN1Object), ft.asn1.x509.AlgorithmIdentifier = function(t) {
            ft.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this), this.nameAlg = null, this.asn1Alg = null, this.asn1Params = null, this.paramEmpty = !1;
            var e = ft.asn1;
            if (this.getEncodedHex = function() {
                    if (null === this.nameAlg && null === this.asn1Alg) throw "algorithm not specified";
                    null !== this.nameAlg && null === this.asn1Alg && (this.asn1Alg = e.x509.OID.name2obj(this.nameAlg));
                    var t = [this.asn1Alg];
                    null !== this.asn1Params && t.push(this.asn1Params);
                    var i = new e.DERSequence({
                        array: t
                    });
                    return this.hTLV = i.getEncodedHex(), this.hTLV
                }, void 0 !== t && (void 0 !== t.name && (this.nameAlg = t.name), void 0 !== t.asn1params && (this.asn1Params = t.asn1params), void 0 !== t.paramempty && (this.paramEmpty = t.paramempty)), null === this.asn1Params && !1 === this.paramEmpty && null !== this.nameAlg) {
                var i = this.nameAlg.toLowerCase();
                "withdsa" !== i.substr(-7, 7) && "withecdsa" !== i.substr(-9, 9) && (this.asn1Params = new e.DERNull)
            }
        }, r.lang.extend(ft.asn1.x509.AlgorithmIdentifier, ft.asn1.ASN1Object), ft.asn1.x509.GeneralName = function(t) {
            ft.asn1.x509.GeneralName.superclass.constructor.call(this);
            var e = {
                    rfc822: "81",
                    dns: "82",
                    dn: "a4",
                    uri: "86",
                    ip: "87"
                },
                i = ft.asn1,
                r = (i.DERSequence, i.DEROctetString),
                n = i.DERIA5String,
                s = i.DERTaggedObject,
                a = i.ASN1Object,
                o = i.x509.X500Name,
                h = Pt;
            this.explicit = !1, this.setByParam = function(t) {
                var i = null;
                if (void 0 !== t) {
                    if (void 0 !== t.rfc822 && (this.type = "rfc822", i = new n({
                            str: t[this.type]
                        })), void 0 !== t.dns && (this.type = "dns", i = new n({
                            str: t[this.type]
                        })), void 0 !== t.uri && (this.type = "uri", i = new n({
                            str: t[this.type]
                        })), void 0 !== t.dn && (this.type = "dn", this.explicit = !0, i = new o({
                            str: t.dn
                        })), void 0 !== t.ldapdn && (this.type = "dn", this.explicit = !0, i = new o({
                            ldapstr: t.ldapdn
                        })), void 0 !== t.certissuer) {
                        this.type = "dn", this.explicit = !0;
                        var u = null;
                        if ((l = t.certissuer).match(/^[0-9A-Fa-f]+$/), -1 != l.indexOf("-----BEGIN ") && (u = h(l)), null == u) throw "certissuer param not cert";
                        (f = new Gt).hex = u;
                        var c = f.getIssuerHex();
                        (i = new a).hTLV = c
                    }
                    if (void 0 !== t.certsubj) {
                        var l, f;
                        if (this.type = "dn", this.explicit = !0, u = null, (l = t.certsubj).match(/^[0-9A-Fa-f]+$/), -1 != l.indexOf("-----BEGIN ") && (u = h(l)), null == u) throw "certsubj param not cert";
                        (f = new Gt).hex = u, c = f.getSubjectHex(), (i = new a).hTLV = c
                    }
                    if (void 0 !== t.ip) {
                        this.type = "ip", this.explicit = !1;
                        var d, g = t.ip,
                            p = "malformed IP address";
                        if (g.match(/^[0-9.]+[.][0-9.]+$/)) {
                            if (8 !== (d = Ut("[" + g.split(".").join(",") + "]")).length) throw p
                        } else if (g.match(/^[0-9A-Fa-f:]+:[0-9A-Fa-f:]+$/)) d = Vt(g);
                        else {
                            if (!g.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) throw p;
                            d = g
                        }
                        i = new r({
                            hex: d
                        })
                    }
                    if (null == this.type) throw "unsupported type in params=" + t;
                    this.asn1Obj = new s({
                        explicit: this.explicit,
                        tag: e[this.type],
                        obj: i
                    })
                }
            }, this.getEncodedHex = function() {
                return this.asn1Obj.getEncodedHex()
            }, void 0 !== t && this.setByParam(t)
        }, r.lang.extend(ft.asn1.x509.GeneralName, ft.asn1.ASN1Object), ft.asn1.x509.GeneralNames = function(t) {
            ft.asn1.x509.GeneralNames.superclass.constructor.call(this);
            var e = ft.asn1;
            this.setByParamArray = function(t) {
                for (var i = 0; i < t.length; i++) {
                    var r = new e.x509.GeneralName(t[i]);
                    this.asn1Array.push(r)
                }
            }, this.getEncodedHex = function() {
                return new e.DERSequence({
                    array: this.asn1Array
                }).getEncodedHex()
            }, this.asn1Array = new Array, void 0 !== t && this.setByParamArray(t)
        }, r.lang.extend(ft.asn1.x509.GeneralNames, ft.asn1.ASN1Object), ft.asn1.x509.DistributionPointName = function(t) {
            ft.asn1.x509.DistributionPointName.superclass.constructor.call(this);
            var e = ft.asn1,
                i = e.DERTaggedObject;
            if (this.getEncodedHex = function() {
                    if ("full" != this.type) throw "currently type shall be 'full': " + this.type;
                    return this.asn1Obj = new i({
                        explicit: !1,
                        tag: this.tag,
                        obj: this.asn1V
                    }), this.hTLV = this.asn1Obj.getEncodedHex(), this.hTLV
                }, void 0 !== t) {
                if (!e.x509.GeneralNames.prototype.isPrototypeOf(t)) throw "This class supports GeneralNames only as argument";
                this.type = "full", this.tag = "a0", this.asn1V = t
            }
        }, r.lang.extend(ft.asn1.x509.DistributionPointName, ft.asn1.ASN1Object), ft.asn1.x509.DistributionPoint = function(t) {
            ft.asn1.x509.DistributionPoint.superclass.constructor.call(this);
            var e = ft.asn1;
            this.getEncodedHex = function() {
                var t = new e.DERSequence;
                if (null != this.asn1DP) {
                    var i = new e.DERTaggedObject({
                        explicit: !0,
                        tag: "a0",
                        obj: this.asn1DP
                    });
                    t.appendASN1Object(i)
                }
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, void 0 !== t && void 0 !== t.dpobj && (this.asn1DP = t.dpobj)
        }, r.lang.extend(ft.asn1.x509.DistributionPoint, ft.asn1.ASN1Object), ft.asn1.x509.OID = new function(t) {
            this.atype2oidList = {
                CN: "2.5.4.3",
                L: "2.5.4.7",
                ST: "2.5.4.8",
                O: "2.5.4.10",
                OU: "2.5.4.11",
                C: "2.5.4.6",
                STREET: "2.5.4.9",
                DC: "0.9.2342.19200300.100.1.25",
                UID: "0.9.2342.19200300.100.1.1",
                SN: "2.5.4.4",
                T: "2.5.4.12",
                DN: "2.5.4.49",
                E: "1.2.840.113549.1.9.1",
                description: "2.5.4.13",
                businessCategory: "2.5.4.15",
                postalCode: "2.5.4.17",
                serialNumber: "2.5.4.5",
                uniqueIdentifier: "2.5.4.45",
                organizationIdentifier: "2.5.4.97",
                jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
                jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
                jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3"
            }, this.name2oidList = {
                sha1: "1.3.14.3.2.26",
                sha256: "2.16.840.1.101.3.4.2.1",
                sha384: "2.16.840.1.101.3.4.2.2",
                sha512: "2.16.840.1.101.3.4.2.3",
                sha224: "2.16.840.1.101.3.4.2.4",
                md5: "1.2.840.113549.2.5",
                md2: "1.3.14.7.2.2.1",
                ripemd160: "1.3.36.3.2.1",
                MD2withRSA: "1.2.840.113549.1.1.2",
                MD4withRSA: "1.2.840.113549.1.1.3",
                MD5withRSA: "1.2.840.113549.1.1.4",
                SHA1withRSA: "1.2.840.113549.1.1.5",
                SHA224withRSA: "1.2.840.113549.1.1.14",
                SHA256withRSA: "1.2.840.113549.1.1.11",
                SHA384withRSA: "1.2.840.113549.1.1.12",
                SHA512withRSA: "1.2.840.113549.1.1.13",
                SHA1withECDSA: "1.2.840.10045.4.1",
                SHA224withECDSA: "1.2.840.10045.4.3.1",
                SHA256withECDSA: "1.2.840.10045.4.3.2",
                SHA384withECDSA: "1.2.840.10045.4.3.3",
                SHA512withECDSA: "1.2.840.10045.4.3.4",
                dsa: "1.2.840.10040.4.1",
                SHA1withDSA: "1.2.840.10040.4.3",
                SHA224withDSA: "2.16.840.1.101.3.4.3.1",
                SHA256withDSA: "2.16.840.1.101.3.4.3.2",
                rsaEncryption: "1.2.840.113549.1.1.1",
                commonName: "2.5.4.3",
                countryName: "2.5.4.6",
                localityName: "2.5.4.7",
                stateOrProvinceName: "2.5.4.8",
                streetAddress: "2.5.4.9",
                organizationName: "2.5.4.10",
                organizationalUnitName: "2.5.4.11",
                domainComponent: "0.9.2342.19200300.100.1.25",
                userId: "0.9.2342.19200300.100.1.1",
                surname: "2.5.4.4",
                title: "2.5.4.12",
                distinguishedName: "2.5.4.49",
                emailAddress: "1.2.840.113549.1.9.1",
                description: "2.5.4.13",
                businessCategory: "2.5.4.15",
                postalCode: "2.5.4.17",
                uniqueIdentifier: "2.5.4.45",
                organizationIdentifier: "2.5.4.97",
                jurisdictionOfIncorporationL: "1.3.6.1.4.1.311.60.2.1.1",
                jurisdictionOfIncorporationSP: "1.3.6.1.4.1.311.60.2.1.2",
                jurisdictionOfIncorporationC: "1.3.6.1.4.1.311.60.2.1.3",
                subjectKeyIdentifier: "2.5.29.14",
                keyUsage: "2.5.29.15",
                subjectAltName: "2.5.29.17",
                issuerAltName: "2.5.29.18",
                basicConstraints: "2.5.29.19",
                nameConstraints: "2.5.29.30",
                cRLDistributionPoints: "2.5.29.31",
                certificatePolicies: "2.5.29.32",
                authorityKeyIdentifier: "2.5.29.35",
                policyConstraints: "2.5.29.36",
                extKeyUsage: "2.5.29.37",
                authorityInfoAccess: "1.3.6.1.5.5.7.1.1",
                ocsp: "1.3.6.1.5.5.7.48.1",
                caIssuers: "1.3.6.1.5.5.7.48.2",
                anyExtendedKeyUsage: "2.5.29.37.0",
                serverAuth: "1.3.6.1.5.5.7.3.1",
                clientAuth: "1.3.6.1.5.5.7.3.2",
                codeSigning: "1.3.6.1.5.5.7.3.3",
                emailProtection: "1.3.6.1.5.5.7.3.4",
                timeStamping: "1.3.6.1.5.5.7.3.8",
                ocspSigning: "1.3.6.1.5.5.7.3.9",
                ecPublicKey: "1.2.840.10045.2.1",
                secp256r1: "1.2.840.10045.3.1.7",
                secp256k1: "1.3.132.0.10",
                secp384r1: "1.3.132.0.34",
                pkcs5PBES2: "1.2.840.113549.1.5.13",
                pkcs5PBKDF2: "1.2.840.113549.1.5.12",
                "des-EDE3-CBC": "1.2.840.113549.3.7",
                data: "1.2.840.113549.1.7.1",
                "signed-data": "1.2.840.113549.1.7.2",
                "enveloped-data": "1.2.840.113549.1.7.3",
                "digested-data": "1.2.840.113549.1.7.5",
                "encrypted-data": "1.2.840.113549.1.7.6",
                "authenticated-data": "1.2.840.113549.1.9.16.1.2",
                tstinfo: "1.2.840.113549.1.9.16.1.4",
                extensionRequest: "1.2.840.113549.1.9.14"
            }, this.objCache = {}, this.name2obj = function(t) {
                if (void 0 !== this.objCache[t]) return this.objCache[t];
                if (void 0 === this.name2oidList[t]) throw "Name of ObjectIdentifier not defined: " + t;
                var e = this.name2oidList[t],
                    i = new ft.asn1.DERObjectIdentifier({
                        oid: e
                    });
                return this.objCache[t] = i, i
            }, this.atype2obj = function(t) {
                if (void 0 !== this.objCache[t]) return this.objCache[t];
                if (void 0 === this.atype2oidList[t]) throw "AttributeType name undefined: " + t;
                var e = this.atype2oidList[t],
                    i = new ft.asn1.DERObjectIdentifier({
                        oid: e
                    });
                return this.objCache[t] = i, i
            }
        }, ft.asn1.x509.OID.oid2name = function(t) {
            var e = ft.asn1.x509.OID.name2oidList;
            for (var i in e)
                if (e[i] == t) return i;
            return ""
        }, ft.asn1.x509.OID.oid2atype = function(t) {
            var e = ft.asn1.x509.OID.atype2oidList;
            for (var i in e)
                if (e[i] == t) return i;
            return t
        }, ft.asn1.x509.OID.name2oid = function(t) {
            var e = ft.asn1.x509.OID.name2oidList;
            return void 0 === e[t] ? "" : e[t]
        }, ft.asn1.x509.X509Util = {}, ft.asn1.x509.X509Util.newCertPEM = function(t) {
            var e = ft.asn1.x509,
                i = e.TBSCertificate,
                r = e.Certificate,
                n = new i;
            if (void 0 === t.serial) throw "serial number undefined.";
            if (n.setSerialNumberByParam(t.serial), "string" != typeof t.sigalg.name) throw "unproper signature algorithm name";
            if (n.setSignatureAlgByParam(t.sigalg), void 0 === t.issuer) throw "issuer name undefined.";
            if (n.setIssuerByParam(t.issuer), void 0 === t.notbefore) throw "notbefore undefined.";
            if (n.setNotBeforeByParam(t.notbefore), void 0 === t.notafter) throw "notafter undefined.";
            if (n.setNotAfterByParam(t.notafter), void 0 === t.subject) throw "subject name undefined.";
            if (n.setSubjectByParam(t.subject), void 0 === t.sbjpubkey) throw "subject public key undefined.";
            if (n.setSubjectPublicKeyByGetKey(t.sbjpubkey), void 0 !== t.ext && void 0 !== t.ext.length)
                for (var s = 0; s < t.ext.length; s++)
                    for (key in t.ext[s]) n.appendExtensionByName(key, t.ext[s][key]);
            if (void 0 === t.cakey && void 0 === t.sighex) throw "param cakey and sighex undefined.";
            var a = null;
            return t.cakey && (a = new r({
                tbscertobj: n,
                prvkeyobj: !0 === t.cakey.isPrivate ? t.cakey : qt.getKey.apply(null, t.cakey)
            })).sign(), t.sighex && (a = new r({
                tbscertobj: n
            })).setSignatureHex(t.sighex), a.getPEMString()
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), void 0 !== ft.asn1.cms && ft.asn1.cms || (ft.asn1.cms = {}), ft.asn1.cms.Attribute = function(t) {
            var e = ft.asn1;
            e.cms.Attribute.superclass.constructor.call(this), this.getEncodedHex = function() {
                var t, i, r;
                t = new e.DERObjectIdentifier({
                    oid: this.attrTypeOid
                }), i = new e.DERSet({
                    array: this.valueList
                });
                try {
                    i.getEncodedHex()
                } catch (n) {
                    throw "fail valueSet.getEncodedHex in Attribute(1)/" + n
                }
                r = new e.DERSequence({
                    array: [t, i]
                });
                try {
                    this.hTLV = r.getEncodedHex()
                } catch (n) {
                    throw "failed seq.getEncodedHex in Attribute(2)/" + n
                }
                return this.hTLV
            }
        }, r.lang.extend(ft.asn1.cms.Attribute, ft.asn1.ASN1Object), ft.asn1.cms.ContentType = function(t) {
            var e = ft.asn1;
            e.cms.ContentType.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.3";
            var i = null;
            void 0 !== t && (i = new e.DERObjectIdentifier(t), this.valueList = [i])
        }, r.lang.extend(ft.asn1.cms.ContentType, ft.asn1.cms.Attribute), ft.asn1.cms.MessageDigest = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DEROctetString,
                n = i.cms;
            if (n.MessageDigest.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.4", void 0 !== t)
                if (t.eciObj instanceof n.EncapsulatedContentInfo && "string" == typeof t.hashAlg) {
                    var s = t.eciObj.eContentValueHex,
                        a = t.hashAlg;
                    (o = new r({
                        hex: e.crypto.Util.hashHex(s, a)
                    })).getEncodedHex(), this.valueList = [o]
                } else {
                    var o;
                    (o = new r(t)).getEncodedHex(), this.valueList = [o]
                }
        }, r.lang.extend(ft.asn1.cms.MessageDigest, ft.asn1.cms.Attribute), ft.asn1.cms.SigningTime = function(t) {
            var e = ft.asn1;
            if (e.cms.SigningTime.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.5", void 0 !== t) {
                var i = new e.x509.Time(t);
                try {
                    i.getEncodedHex()
                } catch (a) {
                    throw "SigningTime.getEncodedHex() failed/" + a
                }
                this.valueList = [i]
            }
        }, r.lang.extend(ft.asn1.cms.SigningTime, ft.asn1.cms.Attribute), ft.asn1.cms.SigningCertificate = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DERSequence,
                n = i.cms;
            e.crypto, n.SigningCertificate.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.12", this.setCerts = function(t) {
                for (var s = [], a = 0; a < t.length; a++) {
                    var o = Pt(t[a]),
                        h = e.crypto.Util.hashHex(o, "sha1"),
                        u = new i.DEROctetString({
                            hex: h
                        });
                    u.getEncodedHex();
                    var c = new n.IssuerAndSerialNumber({
                        cert: t[a]
                    });
                    c.getEncodedHex();
                    var l = new r({
                        array: [u, c]
                    });
                    l.getEncodedHex(), s.push(l)
                }
                var f = new r({
                    array: s
                });
                f.getEncodedHex(), this.valueList = [f]
            }, void 0 !== t && "object" == typeof t.array && this.setCerts(t.array)
        }, r.lang.extend(ft.asn1.cms.SigningCertificate, ft.asn1.cms.Attribute), ft.asn1.cms.SigningCertificateV2 = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DERSequence,
                n = i.x509,
                s = i.cms,
                a = e.crypto;
            if (s.SigningCertificateV2.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.47", this.setCerts = function(t, e) {
                    for (var o = [], h = 0; h < t.length; h++) {
                        var u = Pt(t[h]),
                            c = [];
                        "sha256" !== e && c.push(new n.AlgorithmIdentifier({
                            name: e
                        }));
                        var l = a.Util.hashHex(u, e),
                            f = new i.DEROctetString({
                                hex: l
                            });
                        f.getEncodedHex(), c.push(f);
                        var d = new s.IssuerAndSerialNumber({
                            cert: t[h]
                        });
                        d.getEncodedHex(), c.push(d);
                        var g = new r({
                            array: c
                        });
                        g.getEncodedHex(), o.push(g)
                    }
                    var p = new r({
                        array: o
                    });
                    p.getEncodedHex(), this.valueList = [p]
                }, void 0 !== t && "object" == typeof t.array) {
                var o = "sha256";
                "string" == typeof t.hashAlg && (o = t.hashAlg), this.setCerts(t.array, o)
            }
        }, r.lang.extend(ft.asn1.cms.SigningCertificateV2, ft.asn1.cms.Attribute), ft.asn1.cms.IssuerAndSerialNumber = function(t) {
            var e = ft.asn1,
                i = e.DERInteger,
                r = e.cms,
                n = e.x509.X500Name,
                s = Gt;
            r.IssuerAndSerialNumber.superclass.constructor.call(this), this.setByCertPEM = function(t) {
                var e = Pt(t),
                    r = new s;
                r.hex = e;
                var a = r.getIssuerHex();
                this.dIssuer = new n, this.dIssuer.hTLV = a;
                var o = r.getSerialNumberHex();
                this.dSerial = new i({
                    hex: o
                })
            }, this.getEncodedHex = function() {
                var t = new e.DERSequence({
                    array: [this.dIssuer, this.dSerial]
                });
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("string" == typeof t && -1 != t.indexOf("-----BEGIN ") && this.setByCertPEM(t), t.issuer && t.serial && (t.issuer instanceof n ? this.dIssuer = t.issuer : this.dIssuer = new n(t.issuer), t.serial instanceof i ? this.dSerial = t.serial : this.dSerial = new i(t.serial)), "string" == typeof t.cert && this.setByCertPEM(t.cert))
        }, r.lang.extend(ft.asn1.cms.IssuerAndSerialNumber, ft.asn1.ASN1Object), ft.asn1.cms.AttributeList = function(t) {
            var e = ft.asn1,
                i = e.cms;
            i.AttributeList.superclass.constructor.call(this), this.list = new Array, this.sortFlag = !0, this.add = function(t) {
                t instanceof i.Attribute && this.list.push(t)
            }, this.length = function() {
                return this.list.length
            }, this.clear = function() {
                this.list = new Array, this.hTLV = null, this.hV = null
            }, this.getEncodedHex = function() {
                if ("string" == typeof this.hTLV) return this.hTLV;
                var t = new e.DERSet({
                    array: this.list,
                    sortflag: this.sortFlag
                });
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }, r.lang.extend(ft.asn1.cms.AttributeList, ft.asn1.ASN1Object), ft.asn1.cms.SignerInfo = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DERTaggedObject,
                n = i.cms,
                s = n.AttributeList,
                a = n.ContentType,
                o = n.EncapsulatedContentInfo,
                h = n.MessageDigest,
                u = n.SignedData,
                c = i.x509.AlgorithmIdentifier,
                l = e.crypto,
                f = qt;
            n.SignerInfo.superclass.constructor.call(this), this.dCMSVersion = new i.DERInteger({
                int: 1
            }), this.dSignerIdentifier = null, this.dDigestAlgorithm = null, this.dSignedAttrs = new s, this.dSigAlg = null, this.dSig = null, this.dUnsignedAttrs = new s, this.setSignerIdentifier = function(t) {
                "string" == typeof t && -1 != t.indexOf("CERTIFICATE") && -1 != t.indexOf("BEGIN") && -1 != t.indexOf("END") && (this.dSignerIdentifier = new n.IssuerAndSerialNumber({
                    cert: t
                }))
            }, this.setForContentAndHash = function(t) {
                void 0 !== t && (t.eciObj instanceof o && (this.dSignedAttrs.add(new a({
                    oid: "1.2.840.113549.1.7.1"
                })), this.dSignedAttrs.add(new h({
                    eciObj: t.eciObj,
                    hashAlg: t.hashAlg
                }))), void 0 !== t.sdObj && t.sdObj instanceof u && -1 == t.sdObj.digestAlgNameList.join(":").indexOf(t.hashAlg) && t.sdObj.digestAlgNameList.push(t.hashAlg), "string" == typeof t.hashAlg && (this.dDigestAlgorithm = new c({
                    name: t.hashAlg
                })))
            }, this.sign = function(t, e) {
                this.dSigAlg = new c({
                    name: e
                });
                var r = this.dSignedAttrs.getEncodedHex(),
                    n = f.getKey(t),
                    s = new l.Signature({
                        alg: e
                    });
                s.init(n), s.updateHex(r);
                var a = s.sign();
                this.dSig = new i.DEROctetString({
                    hex: a
                })
            }, this.addUnsigned = function(t) {
                this.hTLV = null, this.dUnsignedAttrs.hTLV = null, this.dUnsignedAttrs.add(t)
            }, this.getEncodedHex = function() {
                if (this.dSignedAttrs instanceof s && 0 == this.dSignedAttrs.length()) throw "SignedAttrs length = 0 (empty)";
                var t = new r({
                        obj: this.dSignedAttrs,
                        tag: "a0",
                        explicit: !1
                    }),
                    e = null;
                this.dUnsignedAttrs.length() > 0 && (e = new r({
                    obj: this.dUnsignedAttrs,
                    tag: "a1",
                    explicit: !1
                }));
                var n = [this.dCMSVersion, this.dSignerIdentifier, this.dDigestAlgorithm, t, this.dSigAlg, this.dSig];
                null != e && n.push(e);
                var a = new i.DERSequence({
                    array: n
                });
                return this.hTLV = a.getEncodedHex(), this.hTLV
            }
        }, r.lang.extend(ft.asn1.cms.SignerInfo, ft.asn1.ASN1Object), ft.asn1.cms.EncapsulatedContentInfo = function(t) {
            var e = ft.asn1,
                i = e.DERTaggedObject,
                r = e.DERSequence,
                n = e.DERObjectIdentifier,
                s = e.DEROctetString;
            e.cms.EncapsulatedContentInfo.superclass.constructor.call(this), this.dEContentType = new n({
                name: "data"
            }), this.dEContent = null, this.isDetached = !1, this.eContentValueHex = null, this.setContentType = function(t) {
                t.match(/^[0-2][.][0-9.]+$/) ? this.dEContentType = new n({
                    oid: t
                }) : this.dEContentType = new n({
                    name: t
                })
            }, this.setContentValue = function(t) {
                void 0 !== t && ("string" == typeof t.hex ? this.eContentValueHex = t.hex : "string" == typeof t.str && (this.eContentValueHex = wt(t.str)))
            }, this.setContentValueHex = function(t) {
                this.eContentValueHex = t
            }, this.setContentValueStr = function(t) {
                this.eContentValueHex = wt(t)
            }, this.getEncodedHex = function() {
                if ("string" != typeof this.eContentValueHex) throw "eContentValue not yet set";
                var t = new s({
                    hex: this.eContentValueHex
                });
                this.dEContent = new i({
                    obj: t,
                    tag: "a0",
                    explicit: !0
                });
                var e = [this.dEContentType];
                this.isDetached || e.push(this.dEContent);
                var n = new r({
                    array: e
                });
                return this.hTLV = n.getEncodedHex(), this.hTLV
            }
        }, r.lang.extend(ft.asn1.cms.EncapsulatedContentInfo, ft.asn1.ASN1Object), ft.asn1.cms.ContentInfo = function(t) {
            var e = ft.asn1,
                i = e.DERTaggedObject,
                r = e.DERSequence,
                n = e.x509;
            ft.asn1.cms.ContentInfo.superclass.constructor.call(this), this.dContentType = null, this.dContent = null, this.setContentType = function(t) {
                "string" == typeof t && (this.dContentType = n.OID.name2obj(t))
            }, this.getEncodedHex = function() {
                var t = new i({
                        obj: this.dContent,
                        tag: "a0",
                        explicit: !0
                    }),
                    e = new r({
                        array: [this.dContentType, t]
                    });
                return this.hTLV = e.getEncodedHex(), this.hTLV
            }, void 0 !== t && (t.type && this.setContentType(t.type), t.obj && t.obj instanceof e.ASN1Object && (this.dContent = t.obj))
        }, r.lang.extend(ft.asn1.cms.ContentInfo, ft.asn1.ASN1Object), ft.asn1.cms.SignedData = function(t) {
            var e = ft.asn1,
                i = e.ASN1Object,
                r = e.DERInteger,
                n = e.DERSet,
                s = e.DERSequence,
                a = e.DERTaggedObject,
                o = e.cms,
                h = o.EncapsulatedContentInfo,
                u = o.SignerInfo,
                c = o.ContentInfo,
                l = e.x509.AlgorithmIdentifier;
            ft.asn1.cms.SignedData.superclass.constructor.call(this), this.dCMSVersion = new r({
                int: 1
            }), this.dDigestAlgs = null, this.digestAlgNameList = [], this.dEncapContentInfo = new h, this.dCerts = null, this.certificateList = [], this.crlList = [], this.signerInfoList = [new u], this.addCertificatesByPEM = function(t) {
                var e = Pt(t),
                    r = new i;
                r.hTLV = e, this.certificateList.push(r)
            }, this.getEncodedHex = function() {
                if ("string" == typeof this.hTLV) return this.hTLV;
                if (null == this.dDigestAlgs) {
                    for (var t = [], e = 0; e < this.digestAlgNameList.length; e++) {
                        var i = this.digestAlgNameList[e],
                            r = new l({
                                name: i
                            });
                        t.push(r)
                    }
                    this.dDigestAlgs = new n({
                        array: t
                    })
                }
                var o = [this.dCMSVersion, this.dDigestAlgs, this.dEncapContentInfo];
                if (null == this.dCerts && this.certificateList.length > 0) {
                    var h = new n({
                        array: this.certificateList
                    });
                    this.dCerts = new a({
                        obj: h,
                        tag: "a0",
                        explicit: !1
                    })
                }
                null != this.dCerts && o.push(this.dCerts);
                var u = new n({
                    array: this.signerInfoList
                });
                o.push(u);
                var c = new s({
                    array: o
                });
                return this.hTLV = c.getEncodedHex(), this.hTLV
            }, this.getContentInfo = function() {
                return this.getEncodedHex(), new c({
                    type: "signed-data",
                    obj: this
                })
            }, this.getContentInfoEncodedHex = function() {
                return this.getContentInfo().getEncodedHex()
            }, this.getPEM = function() {
                return Ht(this.getContentInfoEncodedHex(), "CMS")
            }
        }, r.lang.extend(ft.asn1.cms.SignedData, ft.asn1.ASN1Object), ft.asn1.cms.CMSUtil = new function() {}, ft.asn1.cms.CMSUtil.newSignedData = function(t) {
            var e = ft.asn1,
                i = e.cms,
                r = i.SignerInfo,
                n = i.SignedData,
                s = i.SigningTime,
                a = i.SigningCertificate,
                o = i.SigningCertificateV2,
                h = e.cades.SignaturePolicyIdentifier,
                u = new n;
            if (u.dEncapContentInfo.setContentValue(t.content), "object" == typeof t.certs)
                for (var c = 0; c < t.certs.length; c++) u.addCertificatesByPEM(t.certs[c]);
            for (u.signerInfoList = [], c = 0; c < t.signerInfos.length; c++) {
                var l = t.signerInfos[c],
                    f = new r;
                for (attrName in f.setSignerIdentifier(l.signerCert), f.setForContentAndHash({
                        sdObj: u,
                        eciObj: u.dEncapContentInfo,
                        hashAlg: l.hashAlg
                    }), l.sAttr) {
                    var d = l.sAttr[attrName];
                    if ("SigningTime" == attrName) {
                        var g = new s(d);
                        f.dSignedAttrs.add(g)
                    }
                    "SigningCertificate" == attrName && (g = new a(d), f.dSignedAttrs.add(g)), "SigningCertificateV2" == attrName && (g = new o(d), f.dSignedAttrs.add(g)), "SignaturePolicyIdentifier" == attrName && (g = new h(d), f.dSignedAttrs.add(g))
                }
                f.sign(l.signerPrvKey, l.sigAlg), u.signerInfoList.push(f)
            }
            return u
        }, ft.asn1.cms.CMSUtil.verifySignedData = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.cms,
                n = (r.SignerInfo, r.SignedData, r.SigningTime, r.SigningCertificate, r.SigningCertificateV2, i.cades.SignaturePolicyIdentifier, e.lang.String.isHex),
                s = pt,
                a = s.getVbyList,
                o = s.getTLVbyList,
                h = s.getIdxbyList,
                u = s.getChildIdx,
                c = s.getTLV,
                l = s.oidname,
                f = e.crypto.Util.hashHex;
            void 0 === t.cms && n(t.cms);
            var d = t.cms,
                g = function(t, e) {
                    var i = e.idx;
                    e.signerid_issuer1 = o(t, i, [1, 0], "30"), e.signerid_serial1 = a(t, i, [1, 1], "02"), e.hashalg = l(a(t, i, [2, 0], "06"));
                    var r = h(t, i, [3], "a0");
                    e.idxSignedAttrs = r, p(t, e, r);
                    var n = u(t, i).length;
                    if (n < 6) throw "malformed SignerInfo";
                    e.sigalg = l(a(t, i, [n - 2, 0], "06")), e.sigval = a(t, i, [n - 1], "04")
                },
                p = function(t, e, i) {
                    var r = u(t, i);
                    e.signedAttrIdxList = r;
                    for (var n = 0; n < r.length; n++) {
                        var s, o = r[n],
                            h = a(t, o, [0], "06");
                        "2a864886f70d010905" === h ? (s = At(a(t, o, [1, 0])), e.saSigningTime = s) : "2a864886f70d010904" === h && (s = a(t, o, [1, 0], "04"), e.saMessageDigest = s)
                    }
                },
                y = function(t, e, i, r) {
                    i.verifyDetail = {};
                    var n = i.verifyDetail,
                        s = e.parse.econtent,
                        a = i.hashalg,
                        o = i.saMessageDigest;
                    n.validMessageDigest = !1, f(s, a) === o && (n.validMessageDigest = !0),
                        function(t, e, i, r) {
                            var n, s = e.parse.certsIdx;
                            if (void 0 === e.certs) {
                                n = [], e.certkeys = [];
                                for (var a = u(t, s), o = 0; o < a.length; o++) {
                                    var h = c(t, a[o]),
                                        l = new Gt;
                                    l.readCertHex(h), n[o] = l, e.certkeys[o] = l.getPublicKey()
                                }
                                e.certs = n
                            } else n = e.certs;
                            for (e.cccc = n.length, e.cccci = a.length, o = 0; o < n.length; o++) {
                                var f = l.getIssuerHex(),
                                    d = l.getSerialNumberHex();
                                i.signerid_issuer1 === f && i.signerid_serial1 === d && (i.certkey_idx = o)
                            }
                        }(t, e, i), n.validSignatureValue = !1;
                    var h = i.sigalg,
                        l = "31" + c(t, i.idxSignedAttrs).substr(2);
                    i.signedattrshex = l;
                    var d = e.certs[i.certkey_idx].getPublicKey(),
                        g = new ft.crypto.Signature({
                            alg: h
                        });
                    g.init(d), g.updateHex(l);
                    var p = g.verify(i.sigval);
                    n.validSignatureValue_isValid = p, !0 === p && (n.validSignatureValue = !0), i.isValid = !1, n.validMessageDigest && n.validSignatureValue && (i.isValid = !0)
                },
                v = {
                    isValid: !1,
                    parse: {}
                };
            return function(t, e) {
                    if ("2a864886f70d010702" !== a(t, 0, [0], "06")) return e;
                    e.cmsType = "signedData", e.econtent = a(t, 0, [1, 0, 2, 1, 0]),
                        function(t, e) {
                            for (var i, r = 3; r < 6; r++)
                                if (void 0 !== (i = h(t, 0, [1, 0, r]))) {
                                    var n = t.substr(i, 2);
                                    "a0" === n && (e.certsIdx = i), "a1" === n && (e.revinfosIdx = i), "31" === n && (e.signerinfosIdx = i)
                                }
                        }(t, e), e.signerInfos = [],
                        function(t, e) {
                            var i = e.signerinfosIdx;
                            if (void 0 !== i) {
                                var r = u(t, i);
                                e.signerInfoIdxList = r;
                                for (var n = 0; n < r.length; n++) {
                                    var s = {
                                        idx: r[n]
                                    };
                                    g(t, s), e.signerInfos.push(s)
                                }
                            }
                        }(t, e)
                }(d, v.parse),
                function(t, e) {
                    for (var i = e.parse.signerInfos, r = i.length, n = !0, s = 0; s < r; s++) {
                        var a = i[s];
                        y(t, e, a), a.isValid || (n = !1)
                    }
                    e.isValid = n
                }(d, v), v
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), void 0 !== ft.asn1.tsp && ft.asn1.tsp || (ft.asn1.tsp = {}), ft.asn1.tsp.Accuracy = function(t) {
            var e = ft.asn1,
                i = e.DERInteger,
                r = e.DERSequence,
                n = e.DERTaggedObject;
            e.tsp.Accuracy.superclass.constructor.call(this), this.seconds = null, this.millis = null, this.micros = null, this.getEncodedHex = function() {
                var t = null,
                    e = null,
                    s = null,
                    a = [];
                if (null != this.seconds && (t = new i({
                        int: this.seconds
                    }), a.push(t)), null != this.millis) {
                    var o = new i({
                        int: this.millis
                    });
                    e = new n({
                        obj: o,
                        tag: "80",
                        explicit: !1
                    }), a.push(e)
                }
                if (null != this.micros) {
                    var h = new i({
                        int: this.micros
                    });
                    s = new n({
                        obj: h,
                        tag: "81",
                        explicit: !1
                    }), a.push(s)
                }
                var u = new r({
                    array: a
                });
                return this.hTLV = u.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("number" == typeof t.seconds && (this.seconds = t.seconds), "number" == typeof t.millis && (this.millis = t.millis), "number" == typeof t.micros && (this.micros = t.micros))
        }, r.lang.extend(ft.asn1.tsp.Accuracy, ft.asn1.ASN1Object), ft.asn1.tsp.MessageImprint = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DEROctetString,
                n = e.x509.AlgorithmIdentifier;
            e.tsp.MessageImprint.superclass.constructor.call(this), this.dHashAlg = null, this.dHashValue = null, this.getEncodedHex = function() {
                return "string" == typeof this.hTLV ? this.hTLV : new i({
                    array: [this.dHashAlg, this.dHashValue]
                }).getEncodedHex()
            }, void 0 !== t && ("string" == typeof t.hashAlg && (this.dHashAlg = new n({
                name: t.hashAlg
            })), "string" == typeof t.hashValue && (this.dHashValue = new r({
                hex: t.hashValue
            })))
        }, r.lang.extend(ft.asn1.tsp.MessageImprint, ft.asn1.ASN1Object), ft.asn1.tsp.TimeStampReq = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DERInteger,
                n = e.DERBoolean,
                s = e.DERObjectIdentifier,
                a = e.tsp,
                o = a.MessageImprint;
            a.TimeStampReq.superclass.constructor.call(this), this.dVersion = new r({
                int: 1
            }), this.dMessageImprint = null, this.dPolicy = null, this.dNonce = null, this.certReq = !0, this.setMessageImprint = function(t) {
                t instanceof o ? this.dMessageImprint = t : "object" == typeof t && (this.dMessageImprint = new o(t))
            }, this.getEncodedHex = function() {
                if (null == this.dMessageImprint) throw "messageImprint shall be specified";
                var t = [this.dVersion, this.dMessageImprint];
                null != this.dPolicy && t.push(this.dPolicy), null != this.dNonce && t.push(this.dNonce), this.certReq && t.push(new n);
                var e = new i({
                    array: t
                });
                return this.hTLV = e.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("object" == typeof t.mi && this.setMessageImprint(t.mi), "object" == typeof t.policy && (this.dPolicy = new s(t.policy)), "object" == typeof t.nonce && (this.dNonce = new r(t.nonce)), "boolean" == typeof t.certreq && (this.certReq = t.certreq))
        }, r.lang.extend(ft.asn1.tsp.TimeStampReq, ft.asn1.ASN1Object), ft.asn1.tsp.TSTInfo = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DERInteger,
                n = e.DERBoolean,
                s = e.DERGeneralizedTime,
                a = e.DERObjectIdentifier,
                o = e.tsp,
                h = o.MessageImprint,
                u = o.Accuracy,
                c = e.x509.X500Name;
            if (o.TSTInfo.superclass.constructor.call(this), this.dVersion = new r({
                    int: 1
                }), this.dPolicy = null, this.dMessageImprint = null, this.dSerialNumber = null, this.dGenTime = null, this.dAccuracy = null, this.dOrdering = null, this.dNonce = null, this.dTsa = null, this.getEncodedHex = function() {
                    var t = [this.dVersion];
                    if (null == this.dPolicy) throw "policy shall be specified.";
                    if (t.push(this.dPolicy), null == this.dMessageImprint) throw "messageImprint shall be specified.";
                    if (t.push(this.dMessageImprint), null == this.dSerialNumber) throw "serialNumber shall be specified.";
                    if (t.push(this.dSerialNumber), null == this.dGenTime) throw "genTime shall be specified.";
                    t.push(this.dGenTime), null != this.dAccuracy && t.push(this.dAccuracy), null != this.dOrdering && t.push(this.dOrdering), null != this.dNonce && t.push(this.dNonce), null != this.dTsa && t.push(this.dTsa);
                    var e = new i({
                        array: t
                    });
                    return this.hTLV = e.getEncodedHex(), this.hTLV
                }, void 0 !== t) {
                if ("string" == typeof t.policy) {
                    if (!t.policy.match(/^[0-9.]+$/)) throw "policy shall be oid like 0.1.4.134";
                    this.dPolicy = new a({
                        oid: t.policy
                    })
                }
                void 0 !== t.messageImprint && (this.dMessageImprint = new h(t.messageImprint)), void 0 !== t.serialNumber && (this.dSerialNumber = new r(t.serialNumber)), void 0 !== t.genTime && (this.dGenTime = new s(t.genTime)), void 0 !== t.accuracy && (this.dAccuracy = new u(t.accuracy)), void 0 !== t.ordering && 1 == t.ordering && (this.dOrdering = new n), void 0 !== t.nonce && (this.dNonce = new r(t.nonce)), void 0 !== t.tsa && (this.dTsa = new c(t.tsa))
            }
        }, r.lang.extend(ft.asn1.tsp.TSTInfo, ft.asn1.ASN1Object), ft.asn1.tsp.TimeStampResp = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.ASN1Object,
                n = e.tsp,
                s = n.PKIStatusInfo;
            n.TimeStampResp.superclass.constructor.call(this), this.dStatus = null, this.dTST = null, this.getEncodedHex = function() {
                if (null == this.dStatus) throw "status shall be specified";
                var t = [this.dStatus];
                null != this.dTST && t.push(this.dTST);
                var e = new i({
                    array: t
                });
                return this.hTLV = e.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("object" == typeof t.status && (this.dStatus = new s(t.status)), void 0 !== t.tst && t.tst instanceof r && (this.dTST = t.tst.getContentInfo()))
        }, r.lang.extend(ft.asn1.tsp.TimeStampResp, ft.asn1.ASN1Object), ft.asn1.tsp.PKIStatusInfo = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.tsp,
                n = r.PKIStatus,
                s = r.PKIFreeText,
                a = r.PKIFailureInfo;
            r.PKIStatusInfo.superclass.constructor.call(this), this.dStatus = null, this.dStatusString = null, this.dFailureInfo = null, this.getEncodedHex = function() {
                if (null == this.dStatus) throw "status shall be specified";
                var t = [this.dStatus];
                null != this.dStatusString && t.push(this.dStatusString), null != this.dFailureInfo && t.push(this.dFailureInfo);
                var e = new i({
                    array: t
                });
                return this.hTLV = e.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("object" == typeof t.status && (this.dStatus = new n(t.status)), "object" == typeof t.statstr && (this.dStatusString = new s({
                array: t.statstr
            })), "object" == typeof t.failinfo && (this.dFailureInfo = new a(t.failinfo)))
        }, r.lang.extend(ft.asn1.tsp.PKIStatusInfo, ft.asn1.ASN1Object), ft.asn1.tsp.PKIStatus = function(t) {
            var e = ft.asn1,
                i = e.DERInteger,
                r = e.tsp,
                n = r.PKIStatus;
            if (r.PKIStatus.superclass.constructor.call(this), this.getEncodedHex = function() {
                    return this.hTLV = this.dStatus.getEncodedHex(), this.hTLV
                }, void 0 !== t)
                if (void 0 !== t.name) {
                    var s = n.valueList;
                    if (void 0 === s[t.name]) throw "name undefined: " + t.name;
                    this.dStatus = new i({
                        int: s[t.name]
                    })
                } else this.dStatus = new i(t)
        }, r.lang.extend(ft.asn1.tsp.PKIStatus, ft.asn1.ASN1Object), ft.asn1.tsp.PKIStatus.valueList = {
            granted: 0,
            grantedWithMods: 1,
            rejection: 2,
            waiting: 3,
            revocationWarning: 4,
            revocationNotification: 5
        }, ft.asn1.tsp.PKIFreeText = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DERUTF8String;
            e.tsp.PKIFreeText.superclass.constructor.call(this), this.textList = [], this.getEncodedHex = function() {
                for (var t = [], e = 0; e < this.textList.length; e++) t.push(new r({
                    str: this.textList[e]
                }));
                var n = new i({
                    array: t
                });
                return this.hTLV = n.getEncodedHex(), this.hTLV
            }, void 0 !== t && "object" == typeof t.array && (this.textList = t.array)
        }, r.lang.extend(ft.asn1.tsp.PKIFreeText, ft.asn1.ASN1Object), ft.asn1.tsp.PKIFailureInfo = function(t) {
            var e = ft.asn1,
                i = e.DERBitString,
                r = e.tsp.PKIFailureInfo;
            if (r.superclass.constructor.call(this), this.value = null, this.getEncodedHex = function() {
                    if (null == this.value) throw "value shall be specified";
                    var t = new Number(this.value).toString(2),
                        e = new i;
                    return e.setByBinaryString(t), this.hTLV = e.getEncodedHex(), this.hTLV
                }, void 0 !== t)
                if ("string" == typeof t.name) {
                    var n = r.valueList;
                    if (void 0 === n[t.name]) throw "name undefined: " + t.name;
                    this.value = n[t.name]
                } else "number" == typeof t.int && (this.value = t.int)
        }, r.lang.extend(ft.asn1.tsp.PKIFailureInfo, ft.asn1.ASN1Object), ft.asn1.tsp.PKIFailureInfo.valueList = {
            badAlg: 0,
            badRequest: 2,
            badDataFormat: 5,
            timeNotAvailable: 14,
            unacceptedPolicy: 15,
            unacceptedExtension: 16,
            addInfoNotAvailable: 17,
            systemFailure: 25
        }, ft.asn1.tsp.AbstractTSAAdapter = function(t) {
            this.getTSTHex = function(t, e) {
                throw "not implemented yet"
            }
        }, ft.asn1.tsp.SimpleTSAAdapter = function(t) {
            var e = ft,
                i = e.asn1.tsp,
                r = e.crypto.Util.hashHex;
            i.SimpleTSAAdapter.superclass.constructor.call(this), this.params = null, this.serial = 0, this.getTSTHex = function(t, e) {
                var n = r(t, e);
                this.params.tstInfo.messageImprint = {
                    hashAlg: e,
                    hashValue: n
                }, this.params.tstInfo.serialNumber = {
                    int: this.serial++
                };
                var s = Math.floor(1e9 * Math.random());
                return this.params.tstInfo.nonce = {
                    int: s
                }, i.TSPUtil.newTimeStampToken(this.params).getContentInfoEncodedHex()
            }, void 0 !== t && (this.params = t)
        }, r.lang.extend(ft.asn1.tsp.SimpleTSAAdapter, ft.asn1.tsp.AbstractTSAAdapter), ft.asn1.tsp.FixedTSAAdapter = function(t) {
            var e = ft,
                i = e.asn1.tsp,
                r = e.crypto.Util.hashHex;
            i.FixedTSAAdapter.superclass.constructor.call(this), this.params = null, this.getTSTHex = function(t, e) {
                var n = r(t, e);
                return this.params.tstInfo.messageImprint = {
                    hashAlg: e,
                    hashValue: n
                }, i.TSPUtil.newTimeStampToken(this.params).getContentInfoEncodedHex()
            }, void 0 !== t && (this.params = t)
        }, r.lang.extend(ft.asn1.tsp.FixedTSAAdapter, ft.asn1.tsp.AbstractTSAAdapter), ft.asn1.tsp.TSPUtil = new function() {}, ft.asn1.tsp.TSPUtil.newTimeStampToken = function(t) {
            var e = ft.asn1,
                i = e.cms,
                r = (e.tsp, e.tsp.TSTInfo),
                n = new i.SignedData,
                s = new r(t.tstInfo).getEncodedHex();
            if (n.dEncapContentInfo.setContentValue({
                    hex: s
                }), n.dEncapContentInfo.setContentType("tstinfo"), "object" == typeof t.certs)
                for (var a = 0; a < t.certs.length; a++) n.addCertificatesByPEM(t.certs[a]);
            var o = n.signerInfoList[0];
            o.setSignerIdentifier(t.signerCert), o.setForContentAndHash({
                sdObj: n,
                eciObj: n.dEncapContentInfo,
                hashAlg: t.hashAlg
            });
            var h = new i.SigningCertificate({
                array: [t.signerCert]
            });
            return o.dSignedAttrs.add(h), o.sign(t.signerPrvKey, t.sigAlg), n
        }, ft.asn1.tsp.TSPUtil.parseTimeStampReq = function(t) {
            var e = pt,
                i = e.getChildIdx,
                r = e.getV,
                n = e.getTLV,
                s = {
                    certreq: !1
                },
                a = i(t, 0);
            if (a.length < 2) throw "TimeStampReq must have at least 2 items";
            var o = n(t, a[1]);
            s.mi = ft.asn1.tsp.TSPUtil.parseMessageImprint(o);
            for (var h = 2; h < a.length; h++) {
                var u = a[h],
                    c = t.substr(u, 2);
                if ("06" == c) {
                    var l = r(t, u);
                    s.policy = e.hextooidstr(l)
                }
                "02" == c && (s.nonce = r(t, u)), "01" == c && (s.certreq = !0)
            }
            return s
        }, ft.asn1.tsp.TSPUtil.parseMessageImprint = function(t) {
            var e = pt,
                i = e.getChildIdx,
                r = e.getV,
                n = e.getIdxbyList,
                s = {};
            if ("30" != t.substr(0, 2)) throw "head of messageImprint hex shall be '30'";
            i(t, 0);
            var a = r(t, n(t, 0, [0, 0])),
                o = e.hextooidstr(a),
                h = ft.asn1.x509.OID.oid2name(o);
            if ("" == h) throw "hashAlg name undefined: " + o;
            var u = h,
                c = n(t, 0, [1]);
            return s.hashAlg = u, s.hashValue = r(t, c), s
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), void 0 !== ft.asn1.cades && ft.asn1.cades || (ft.asn1.cades = {}), ft.asn1.cades.SignaturePolicyIdentifier = function(t) {
            var e = ft.asn1,
                i = e.DERObjectIdentifier,
                r = e.DERSequence,
                n = e.cades,
                s = n.OtherHashAlgAndValue;
            if (n.SignaturePolicyIdentifier.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.15", void 0 !== t && "string" == typeof t.oid && "object" == typeof t.hash) {
                var a = new r({
                    array: [new i({
                        oid: t.oid
                    }), new s(t.hash)]
                });
                this.valueList = [a]
            }
        }, r.lang.extend(ft.asn1.cades.SignaturePolicyIdentifier, ft.asn1.cms.Attribute), ft.asn1.cades.OtherHashAlgAndValue = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.DEROctetString,
                n = e.x509.AlgorithmIdentifier;
            e.cades.OtherHashAlgAndValue.superclass.constructor.call(this), this.dAlg = null, this.dHash = null, this.getEncodedHex = function() {
                var t = new i({
                    array: [this.dAlg, this.dHash]
                });
                return this.hTLV = t.getEncodedHex(), this.hTLV
            }, void 0 !== t && "string" == typeof t.alg && "string" == typeof t.hash && (this.dAlg = new n({
                name: t.alg
            }), this.dHash = new r({
                hex: t.hash
            }))
        }, r.lang.extend(ft.asn1.cades.OtherHashAlgAndValue, ft.asn1.ASN1Object), ft.asn1.cades.SignatureTimeStamp = function(t) {
            var e = ft.asn1,
                i = e.ASN1Object;
            if (e.x509, e.cades.SignatureTimeStamp.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.14", this.tstHex = null, void 0 !== t) {
                if (void 0 !== t.res)
                    if ("string" == typeof t.res && t.res.match(/^[0-9A-Fa-f]+$/));
                    else if (!(t.res instanceof i)) throw "res param shall be ASN1Object or hex string";
                if (void 0 !== t.tst)
                    if ("string" == typeof t.tst && t.tst.match(/^[0-9A-Fa-f]+$/)) {
                        var r = new i;
                        this.tstHex = t.tst, r.hTLV = this.tstHex, r.getEncodedHex(), this.valueList = [r]
                    } else if (!(t.tst instanceof i)) throw "tst param shall be ASN1Object or hex string"
            }
        }, r.lang.extend(ft.asn1.cades.SignatureTimeStamp, ft.asn1.cms.Attribute), ft.asn1.cades.CompleteCertificateRefs = function(t) {
            var e = ft.asn1.cades;
            e.CompleteCertificateRefs.superclass.constructor.call(this), this.attrTypeOid = "1.2.840.113549.1.9.16.2.21", this.setByArray = function(t) {
                this.valueList = [];
                for (var i = 0; i < t.length; i++) {
                    var r = new e.OtherCertID(t[i]);
                    this.valueList.push(r)
                }
            }, void 0 !== t && "object" == typeof t && "number" == typeof t.length && this.setByArray(t)
        }, r.lang.extend(ft.asn1.cades.CompleteCertificateRefs, ft.asn1.cms.Attribute), ft.asn1.cades.OtherCertID = function(t) {
            var e = ft.asn1,
                i = e.cms,
                r = e.cades;
            r.OtherCertID.superclass.constructor.call(this), this.hasIssuerSerial = !0, this.dOtherCertHash = null, this.dIssuerSerial = null, this.setByCertPEM = function(t) {
                this.dOtherCertHash = new r.OtherHash(t), this.hasIssuerSerial && (this.dIssuerSerial = new i.IssuerAndSerialNumber(t))
            }, this.getEncodedHex = function() {
                if (null != this.hTLV) return this.hTLV;
                if (null == this.dOtherCertHash) throw "otherCertHash not set";
                var t = [this.dOtherCertHash];
                null != this.dIssuerSerial && t.push(this.dIssuerSerial);
                var i = new e.DERSequence({
                    array: t
                });
                return this.hTLV = i.getEncodedHex(), this.hTLV
            }, void 0 !== t && ("string" == typeof t && -1 != t.indexOf("-----BEGIN ") && this.setByCertPEM(t), "object" == typeof t && (!1 === t.hasis && (this.hasIssuerSerial = !1), "string" == typeof t.cert && this.setByCertPEM(t.cert)))
        }, r.lang.extend(ft.asn1.cades.OtherCertID, ft.asn1.ASN1Object), ft.asn1.cades.OtherHash = function(t) {
            var e = ft,
                i = e.asn1,
                r = (i.cms, i.cades),
                n = r.OtherHashAlgAndValue,
                s = e.crypto.Util.hashHex;
            if (r.OtherHash.superclass.constructor.call(this), this.alg = "sha256", this.dOtherHash = null, this.setByCertPEM = function(t) {
                    if (-1 == t.indexOf("-----BEGIN ")) throw "certPEM not to seem PEM format";
                    var e = Pt(t),
                        i = s(e, this.alg);
                    this.dOtherHash = new n({
                        alg: this.alg,
                        hash: i
                    })
                }, this.getEncodedHex = function() {
                    if (null == this.dOtherHash) throw "OtherHash not set";
                    return this.dOtherHash.getEncodedHex()
                }, void 0 !== t)
                if ("string" == typeof t)
                    if (-1 != t.indexOf("-----BEGIN ")) this.setByCertPEM(t);
                    else {
                        if (!t.match(/^[0-9A-Fa-f]+$/)) throw "unsupported string value for params";
                        this.dOtherHash = new i.DEROctetString({
                            hex: t
                        })
                    }
            else "object" == typeof t && ("string" == typeof t.cert ? ("string" == typeof t.alg && (this.alg = t.alg), this.setByCertPEM(t.cert)) : this.dOtherHash = new n(t))
        }, r.lang.extend(ft.asn1.cades.OtherHash, ft.asn1.ASN1Object), ft.asn1.cades.CAdESUtil = new function() {}, ft.asn1.cades.CAdESUtil.addSigTS = function(t, e, i) {}, ft.asn1.cades.CAdESUtil.parseSignedDataForAddingUnsigned = function(t) {
            var e = pt,
                i = e.getChildIdx,
                r = e.getTLV,
                n = e.getTLVbyList,
                s = e.getIdxbyList,
                a = ft.asn1,
                o = a.ASN1Object,
                h = a.cms.SignedData,
                u = a.cades.CAdESUtil,
                c = {};
            if ("06092a864886f70d010702" != n(t, 0, [0])) throw "hex is not CMS SignedData";
            var l = i(t, s(t, 0, [1, 0]));
            if (l.length < 4) throw "num of SignedData elem shall be 4 at least";
            var f = l.shift();
            c.version = r(t, f);
            var d = l.shift();
            c.algs = r(t, d);
            var g = l.shift();
            c.encapcontent = r(t, g), c.certs = null, c.revs = null, c.si = [];
            var p = l.shift();
            "a0" == t.substr(p, 2) && (c.certs = r(t, p), p = l.shift()), "a1" == t.substr(p, 2) && (c.revs = r(t, p), p = l.shift());
            var y = p;
            if ("31" != t.substr(y, 2)) throw "Can't find signerInfos";
            for (var v = i(t, y), m = 0; m < v.length; m++) {
                var S = v[m],
                    F = u.parseSignerInfoForAddingUnsigned(t, S, m);
                c.si[m] = F
            }
            var x = null;
            for (c.obj = new h, (x = new o).hTLV = c.version, c.obj.dCMSVersion = x, (x = new o).hTLV = c.algs, c.obj.dDigestAlgs = x, (x = new o).hTLV = c.encapcontent, c.obj.dEncapContentInfo = x, (x = new o).hTLV = c.certs, c.obj.dCerts = x, c.obj.signerInfoList = [], m = 0; m < c.si.length; m++) c.obj.signerInfoList.push(c.si[m].obj);
            return c
        }, ft.asn1.cades.CAdESUtil.parseSignerInfoForAddingUnsigned = function(t, e, i) {
            var r = pt,
                n = r.getChildIdx,
                s = r.getTLV,
                a = r.getV,
                o = ft.asn1,
                h = o.ASN1Object,
                u = o.cms,
                c = u.AttributeList,
                l = u.SignerInfo,
                f = {},
                d = n(t, e);
            if (6 != d.length) throw "not supported items for SignerInfo (!=6)";
            var g = d.shift();
            f.version = s(t, g);
            var p = d.shift();
            f.si = s(t, p);
            var y = d.shift();
            f.digalg = s(t, y);
            var v = d.shift();
            f.sattrs = s(t, v);
            var m = d.shift();
            f.sigalg = s(t, m);
            var S = d.shift();
            f.sig = s(t, S), f.sigval = a(t, S);
            var F = null;
            return f.obj = new l, (F = new h).hTLV = f.version, f.obj.dCMSVersion = F, (F = new h).hTLV = f.si, f.obj.dSignerIdentifier = F, (F = new h).hTLV = f.digalg, f.obj.dDigestAlgorithm = F, (F = new h).hTLV = f.sattrs, f.obj.dSignedAttrs = F, (F = new h).hTLV = f.sigalg, f.obj.dSigAlg = F, (F = new h).hTLV = f.sig, f.obj.dSig = F, f.obj.dUnsignedAttrs = new c, f
        }, void 0 !== ft.asn1.csr && ft.asn1.csr || (ft.asn1.csr = {}), ft.asn1.csr.CertificationRequest = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DERBitString,
                n = i.DERSequence,
                s = i.csr,
                a = i.x509;
            s.CertificationRequest.superclass.constructor.call(this), this.sign = function(t, i) {
                null == this.prvKey && (this.prvKey = i), this.asn1SignatureAlg = new a.AlgorithmIdentifier({
                    name: t
                }), sig = new e.crypto.Signature({
                    alg: t
                }), sig.init(this.prvKey), sig.updateHex(this.asn1CSRInfo.getEncodedHex()), this.hexSig = sig.sign(), this.asn1Sig = new r({
                    hex: "00" + this.hexSig
                });
                var s = new n({
                    array: [this.asn1CSRInfo, this.asn1SignatureAlg, this.asn1Sig]
                });
                this.hTLV = s.getEncodedHex(), this.isModified = !1
            }, this.getPEMString = function() {
                return Ht(this.getEncodedHex(), "CERTIFICATE REQUEST")
            }, this.getEncodedHex = function() {
                if (0 == this.isModified && null != this.hTLV) return this.hTLV;
                throw "not signed yet"
            }, void 0 !== t && void 0 !== t.csrinfo && (this.asn1CSRInfo = t.csrinfo)
        }, r.lang.extend(ft.asn1.csr.CertificationRequest, ft.asn1.ASN1Object), ft.asn1.csr.CertificationRequestInfo = function(t) {
            var e = ft.asn1,
                i = e.DERInteger,
                r = e.DERSequence,
                n = e.DERSet,
                s = e.DERNull,
                a = e.DERTaggedObject,
                o = e.DERObjectIdentifier,
                h = e.csr,
                u = e.x509,
                c = u.X500Name,
                l = u.Extension,
                f = qt;
            h.CertificationRequestInfo.superclass.constructor.call(this), this._initialize = function() {
                this.asn1Array = new Array, this.asn1Version = new i({
                    int: 0
                }), this.asn1Subject = null, this.asn1SubjPKey = null, this.extensionsArray = new Array
            }, this.setSubjectByParam = function(t) {
                this.asn1Subject = new c(t)
            }, this.setSubjectPublicKeyByGetKey = function(t) {
                var e = f.getKey(t);
                this.asn1SubjPKey = new u.SubjectPublicKeyInfo(e)
            }, this.appendExtensionByName = function(t, e) {
                l.appendByNameToArray(t, e, this.extensionsArray)
            }, this.getEncodedHex = function() {
                if (this.asn1Array = new Array, this.asn1Array.push(this.asn1Version), this.asn1Array.push(this.asn1Subject), this.asn1Array.push(this.asn1SubjPKey), this.extensionsArray.length > 0) {
                    var t = new r({
                            array: this.extensionsArray
                        }),
                        e = new n({
                            array: [t]
                        }),
                        i = new r({
                            array: [new o({
                                oid: "1.2.840.113549.1.9.14"
                            }), e]
                        }),
                        h = new a({
                            explicit: !0,
                            tag: "a0",
                            obj: i
                        });
                    this.asn1Array.push(h)
                } else h = new a({
                    explicit: !1,
                    tag: "a0",
                    obj: new s
                }), this.asn1Array.push(h);
                var u = new r({
                    array: this.asn1Array
                });
                return this.hTLV = u.getEncodedHex(), this.isModified = !1, this.hTLV
            }, this._initialize()
        }, r.lang.extend(ft.asn1.csr.CertificationRequestInfo, ft.asn1.ASN1Object), ft.asn1.csr.CSRUtil = new function() {}, ft.asn1.csr.CSRUtil.newCSRPEM = function(t) {
            var e = qt,
                i = ft.asn1.csr;
            if (void 0 === t.subject) throw "parameter subject undefined";
            if (void 0 === t.sbjpubkey) throw "parameter sbjpubkey undefined";
            if (void 0 === t.sigalg) throw "parameter sigalg undefined";
            if (void 0 === t.sbjprvkey) throw "parameter sbjpubkey undefined";
            var r = new i.CertificationRequestInfo;
            if (r.setSubjectByParam(t.subject), r.setSubjectPublicKeyByGetKey(t.sbjpubkey), void 0 !== t.ext && void 0 !== t.ext.length)
                for (var n = 0; n < t.ext.length; n++)
                    for (key in t.ext[n]) r.appendExtensionByName(key, t.ext[n][key]);
            var s = new i.CertificationRequest({
                    csrinfo: r
                }),
                a = e.getKey(t.sbjprvkey);
            return s.sign(t.sigalg, a), s.getPEMString()
        }, ft.asn1.csr.CSRUtil.getInfo = function(t) {
            var e = pt.getTLVbyList,
                i = {
                    subject: {},
                    pubkey: {}
                };
            if (-1 == t.indexOf("-----BEGIN CERTIFICATE REQUEST")) throw "argument is not PEM file";
            var r = Pt(t, "CERTIFICATE REQUEST");
            return i.subject.hex = e(r, 0, [0, 1]), i.subject.name = Gt.hex2dn(i.subject.hex), i.pubkey.hex = e(r, 0, [0, 2]), i.pubkey.obj = qt.getKey(i.pubkey.hex, null, "pkcs8pub"), i
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.asn1 && ft.asn1 || (ft.asn1 = {}), void 0 !== ft.asn1.ocsp && ft.asn1.ocsp || (ft.asn1.ocsp = {}), ft.asn1.ocsp.DEFAULT_HASH = "sha1", ft.asn1.ocsp.CertID = function(t) {
            var e = ft,
                i = e.asn1,
                r = i.DEROctetString,
                n = i.DERInteger,
                s = i.DERSequence,
                a = i.x509.AlgorithmIdentifier,
                o = i.ocsp,
                h = o.DEFAULT_HASH,
                u = e.crypto.Util.hashHex,
                c = Gt,
                l = pt;
            if (o.CertID.superclass.constructor.call(this), this.dHashAlg = null, this.dIssuerNameHash = null, this.dIssuerKeyHash = null, this.dSerialNumber = null, this.setByValue = function(t, e, i, s) {
                    void 0 === s && (s = h), this.dHashAlg = new a({
                        name: s
                    }), this.dIssuerNameHash = new r({
                        hex: t
                    }), this.dIssuerKeyHash = new r({
                        hex: e
                    }), this.dSerialNumber = new n({
                        hex: i
                    })
                }, this.setByCert = function(t, e, i) {
                    void 0 === i && (i = h);
                    var r = new c;
                    r.readCertPEM(e);
                    var n = new c;
                    n.readCertPEM(t);
                    var s = n.getPublicKeyHex(),
                        a = l.getTLVbyList(s, 0, [1, 0], "30"),
                        o = r.getSerialNumberHex(),
                        f = u(n.getSubjectHex(), i),
                        d = u(a, i);
                    this.setByValue(f, d, o, i), this.hoge = r.getSerialNumberHex()
                }, this.getEncodedHex = function() {
                    if (null === this.dHashAlg && null === this.dIssuerNameHash && null === this.dIssuerKeyHash && null === this.dSerialNumber) throw "not yet set values";
                    var t = [this.dHashAlg, this.dIssuerNameHash, this.dIssuerKeyHash, this.dSerialNumber],
                        e = new s({
                            array: t
                        });
                    return this.hTLV = e.getEncodedHex(), this.hTLV
                }, void 0 !== t) {
                var f = t;
                if (void 0 !== f.issuerCert && void 0 !== f.subjectCert) {
                    var d = h;
                    void 0 === f.alg && (d = void 0), this.setByCert(f.issuerCert, f.subjectCert, d)
                } else {
                    if (void 0 === f.namehash || void 0 === f.keyhash || void 0 === f.serial) throw "invalid constructor arguments";
                    d = h, void 0 === f.alg && (d = void 0), this.setByValue(f.namehash, f.keyhash, f.serial, d)
                }
            }
        }, r.lang.extend(ft.asn1.ocsp.CertID, ft.asn1.ASN1Object), ft.asn1.ocsp.Request = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.ocsp;
            if (r.Request.superclass.constructor.call(this), this.dReqCert = null, this.dExt = null, this.getEncodedHex = function() {
                    var t = [];
                    if (null === this.dReqCert) throw "reqCert not set";
                    t.push(this.dReqCert);
                    var e = new i({
                        array: t
                    });
                    return this.hTLV = e.getEncodedHex(), this.hTLV
                }, void 0 !== t) {
                var n = new r.CertID(t);
                this.dReqCert = n
            }
        }, r.lang.extend(ft.asn1.ocsp.Request, ft.asn1.ASN1Object), ft.asn1.ocsp.TBSRequest = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.ocsp;
            r.TBSRequest.superclass.constructor.call(this), this.version = 0, this.dRequestorName = null, this.dRequestList = [], this.dRequestExt = null, this.setRequestListByParam = function(t) {
                for (var e = [], i = 0; i < t.length; i++) {
                    var n = new r.Request(t[0]);
                    e.push(n)
                }
                this.dRequestList = e
            }, this.getEncodedHex = function() {
                var t = [];
                if (0 !== this.version) throw "not supported version: " + this.version;
                if (null !== this.dRequestorName) throw "requestorName not supported";
                var e = new i({
                    array: this.dRequestList
                });
                if (t.push(e), null !== this.dRequestExt) throw "requestExtensions not supported";
                var r = new i({
                    array: t
                });
                return this.hTLV = r.getEncodedHex(), this.hTLV
            }, void 0 !== t && void 0 !== t.reqList && this.setRequestListByParam(t.reqList)
        }, r.lang.extend(ft.asn1.ocsp.TBSRequest, ft.asn1.ASN1Object), ft.asn1.ocsp.OCSPRequest = function(t) {
            var e = ft.asn1,
                i = e.DERSequence,
                r = e.ocsp;
            if (r.OCSPRequest.superclass.constructor.call(this), this.dTbsRequest = null, this.dOptionalSignature = null, this.getEncodedHex = function() {
                    var t = [];
                    if (null === this.dTbsRequest) throw "tbsRequest not set";
                    if (t.push(this.dTbsRequest), null !== this.dOptionalSignature) throw "optionalSignature not supported";
                    var e = new i({
                        array: t
                    });
                    return this.hTLV = e.getEncodedHex(), this.hTLV
                }, void 0 !== t && void 0 !== t.reqList) {
                var n = new r.TBSRequest(t);
                this.dTbsRequest = n
            }
        }, r.lang.extend(ft.asn1.ocsp.OCSPRequest, ft.asn1.ASN1Object), ft.asn1.ocsp.OCSPUtil = {}, ft.asn1.ocsp.OCSPUtil.getRequestHex = function(t, e, i) {
            var r = ft.asn1.ocsp;
            void 0 === i && (i = r.DEFAULT_HASH);
            var n = {
                alg: i,
                issuerCert: t,
                subjectCert: e
            };
            return new r.OCSPRequest({
                reqList: [n]
            }).getEncodedHex()
        }, ft.asn1.ocsp.OCSPUtil.getOCSPResponseInfo = function(t) {
            var e = pt,
                i = e.getVbyList,
                r = e.getIdxbyList,
                s = (i = e.getVbyList, e.getV),
                a = {};
            try {
                var o = i(t, 0, [0], "0a");
                a.responseStatus = parseInt(o, 16)
            } catch (n) {}
            if (0 !== a.responseStatus) return a;
            try {
                var h = r(t, 0, [1, 0, 1, 0, 0, 2, 0, 1]);
                "80" === t.substr(h, 2) ? a.certStatus = "good" : "a1" === t.substr(h, 2) ? (a.certStatus = "revoked", a.revocationTime = At(i(t, h, [0]))) : "82" === t.substr(h, 2) && (a.certStatus = "unknown")
            } catch (n) {}
            try {
                var u = r(t, 0, [1, 0, 1, 0, 0, 2, 0, 2]);
                a.thisUpdate = At(s(t, u))
            } catch (n) {}
            try {
                var c = r(t, 0, [1, 0, 1, 0, 0, 2, 0, 3]);
                "a0" === t.substr(c, 2) && (a.nextUpdate = At(i(t, c, [0])))
            } catch (n) {}
            return a
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.lang && ft.lang || (ft.lang = {}), ft.lang.String = function() {}, "function" == typeof t ? (dt = function(e) {
            return Ft(new t(e, "utf8").toString("base64"))
        }, gt = function(e) {
            return new t(xt(e), "base64").toString("utf8")
        }) : (dt = function(t) {
            return bt(jt(kt(t)))
        }, gt = function(t) {
            return decodeURIComponent(Ot(Et(t)))
        }), ft.lang.String.isInteger = function(t) {
            return !!t.match(/^[0-9]+$/) || !!t.match(/^-[0-9]+$/)
        }, ft.lang.String.isHex = function(t) {
            return !(t.length % 2 != 0 || !t.match(/^[0-9a-f]+$/) && !t.match(/^[0-9A-F]+$/))
        }, ft.lang.String.isBase64 = function(t) {
            return !(!(t = t.replace(/\s+/g, "")).match(/^[0-9A-Za-z+\/]+={0,3}$/) || t.length % 4 != 0)
        }, ft.lang.String.isBase64URL = function(t) {
            return !t.match(/[+\/=]/) && (t = xt(t), ft.lang.String.isBase64(t))
        }, ft.lang.String.isIntegerArray = function(t) {
            return !!(t = t.replace(/\s+/g, "")).match(/^\[[0-9,]+\]$/)
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.crypto && ft.crypto || (ft.crypto = {}), ft.crypto.Util = new function() {
            this.DIGESTINFOHEAD = {
                sha1: "3021300906052b0e03021a05000414",
                sha224: "302d300d06096086480165030402040500041c",
                sha256: "3031300d060960864801650304020105000420",
                sha384: "3041300d060960864801650304020205000430",
                sha512: "3051300d060960864801650304020305000440",
                md2: "3020300c06082a864886f70d020205000410",
                md5: "3020300c06082a864886f70d020505000410",
                ripemd160: "3021300906052b2403020105000414"
            }, this.DEFAULTPROVIDER = {
                md5: "cryptojs",
                sha1: "cryptojs",
                sha224: "cryptojs",
                sha256: "cryptojs",
                sha384: "cryptojs",
                sha512: "cryptojs",
                ripemd160: "cryptojs",
                hmacmd5: "cryptojs",
                hmacsha1: "cryptojs",
                hmacsha224: "cryptojs",
                hmacsha256: "cryptojs",
                hmacsha384: "cryptojs",
                hmacsha512: "cryptojs",
                hmacripemd160: "cryptojs",
                MD5withRSA: "cryptojs/jsrsa",
                SHA1withRSA: "cryptojs/jsrsa",
                SHA224withRSA: "cryptojs/jsrsa",
                SHA256withRSA: "cryptojs/jsrsa",
                SHA384withRSA: "cryptojs/jsrsa",
                SHA512withRSA: "cryptojs/jsrsa",
                RIPEMD160withRSA: "cryptojs/jsrsa",
                MD5withECDSA: "cryptojs/jsrsa",
                SHA1withECDSA: "cryptojs/jsrsa",
                SHA224withECDSA: "cryptojs/jsrsa",
                SHA256withECDSA: "cryptojs/jsrsa",
                SHA384withECDSA: "cryptojs/jsrsa",
                SHA512withECDSA: "cryptojs/jsrsa",
                RIPEMD160withECDSA: "cryptojs/jsrsa",
                SHA1withDSA: "cryptojs/jsrsa",
                SHA224withDSA: "cryptojs/jsrsa",
                SHA256withDSA: "cryptojs/jsrsa",
                MD5withRSAandMGF1: "cryptojs/jsrsa",
                SHA1withRSAandMGF1: "cryptojs/jsrsa",
                SHA224withRSAandMGF1: "cryptojs/jsrsa",
                SHA256withRSAandMGF1: "cryptojs/jsrsa",
                SHA384withRSAandMGF1: "cryptojs/jsrsa",
                SHA512withRSAandMGF1: "cryptojs/jsrsa",
                RIPEMD160withRSAandMGF1: "cryptojs/jsrsa"
            }, this.CRYPTOJSMESSAGEDIGESTNAME = {
                md5: y.algo.MD5,
                sha1: y.algo.SHA1,
                sha224: y.algo.SHA224,
                sha256: y.algo.SHA256,
                sha384: y.algo.SHA384,
                sha512: y.algo.SHA512,
                ripemd160: y.algo.RIPEMD160
            }, this.getDigestInfoHex = function(t, e) {
                if (void 0 === this.DIGESTINFOHEAD[e]) throw "alg not supported in Util.DIGESTINFOHEAD: " + e;
                return this.DIGESTINFOHEAD[e] + t
            }, this.getPaddedDigestInfoHex = function(t, e, i) {
                var r = this.getDigestInfoHex(t, e),
                    n = i / 4;
                if (r.length + 22 > n) throw "key is too short for SigAlg: keylen=" + i + "," + e;
                for (var s = "0001", a = "00" + r, o = "", h = n - s.length - a.length, u = 0; u < h; u += 2) o += "ff";
                return s + o + a
            }, this.hashString = function(t, e) {
                return new ft.crypto.MessageDigest({
                    alg: e
                }).digestString(t)
            }, this.hashHex = function(t, e) {
                return new ft.crypto.MessageDigest({
                    alg: e
                }).digestHex(t)
            }, this.sha1 = function(t) {
                return new ft.crypto.MessageDigest({
                    alg: "sha1",
                    prov: "cryptojs"
                }).digestString(t)
            }, this.sha256 = function(t) {
                return new ft.crypto.MessageDigest({
                    alg: "sha256",
                    prov: "cryptojs"
                }).digestString(t)
            }, this.sha256Hex = function(t) {
                return new ft.crypto.MessageDigest({
                    alg: "sha256",
                    prov: "cryptojs"
                }).digestHex(t)
            }, this.sha512 = function(t) {
                return new ft.crypto.MessageDigest({
                    alg: "sha512",
                    prov: "cryptojs"
                }).digestString(t)
            }, this.sha512Hex = function(t) {
                return new ft.crypto.MessageDigest({
                    alg: "sha512",
                    prov: "cryptojs"
                }).digestHex(t)
            }
        }, ft.crypto.Util.md5 = function(t) {
            return new ft.crypto.MessageDigest({
                alg: "md5",
                prov: "cryptojs"
            }).digestString(t)
        }, ft.crypto.Util.ripemd160 = function(t) {
            return new ft.crypto.MessageDigest({
                alg: "ripemd160",
                prov: "cryptojs"
            }).digestString(t)
        }, ft.crypto.Util.SECURERANDOMGEN = new rt, ft.crypto.Util.getRandomHexOfNbytes = function(t) {
            var e = new Array(t);
            return ft.crypto.Util.SECURERANDOMGEN.nextBytes(e), mt(e)
        }, ft.crypto.Util.getRandomBigIntegerOfNbytes = function(t) {
            return new E(ft.crypto.Util.getRandomHexOfNbytes(t), 16)
        }, ft.crypto.Util.getRandomHexOfNbits = function(t) {
            var e = t % 8,
                i = new Array((t - e) / 8 + 1);
            return ft.crypto.Util.SECURERANDOMGEN.nextBytes(i), i[0] = (255 << e & 255 ^ 255) & i[0], mt(i)
        }, ft.crypto.Util.getRandomBigIntegerOfNbits = function(t) {
            return new E(ft.crypto.Util.getRandomHexOfNbits(t), 16)
        }, ft.crypto.Util.getRandomBigIntegerZeroToMax = function(t) {
            for (var e = t.bitLength();;) {
                var i = ft.crypto.Util.getRandomBigIntegerOfNbits(e);
                if (-1 != t.compareTo(i)) return i
            }
        }, ft.crypto.Util.getRandomBigIntegerMinToMax = function(t, e) {
            var i = t.compareTo(e);
            if (1 == i) throw "biMin is greater than biMax";
            if (0 == i) return t;
            var r = e.subtract(t);
            return ft.crypto.Util.getRandomBigIntegerZeroToMax(r).add(t)
        }, ft.crypto.MessageDigest = function(t) {
            this.setAlgAndProvider = function(t, e) {
                if (null !== (t = ft.crypto.MessageDigest.getCanonicalAlgName(t)) && void 0 === e && (e = ft.crypto.Util.DEFAULTPROVIDER[t]), -1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(t) && "cryptojs" == e) {
                    try {
                        this.md = ft.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[t].create()
                    } catch (n) {
                        throw "setAlgAndProvider hash alg set fail alg=" + t + "/" + n
                    }
                    this.updateString = function(t) {
                        this.md.update(t)
                    }, this.updateHex = function(t) {
                        var e = y.enc.Hex.parse(t);
                        this.md.update(e)
                    }, this.digest = function() {
                        return this.md.finalize().toString(y.enc.Hex)
                    }, this.digestString = function(t) {
                        return this.updateString(t), this.digest()
                    }, this.digestHex = function(t) {
                        return this.updateHex(t), this.digest()
                    }
                }
                if (-1 != ":sha256:".indexOf(t) && "sjcl" == e) {
                    try {
                        this.md = new sjcl.hash.sha256
                    } catch (n) {
                        throw "setAlgAndProvider hash alg set fail alg=" + t + "/" + n
                    }
                    this.updateString = function(t) {
                        this.md.update(t)
                    }, this.updateHex = function(t) {
                        var e = sjcl.codec.hex.toBits(t);
                        this.md.update(e)
                    }, this.digest = function() {
                        var t = this.md.finalize();
                        return sjcl.codec.hex.fromBits(t)
                    }, this.digestString = function(t) {
                        return this.updateString(t), this.digest()
                    }, this.digestHex = function(t) {
                        return this.updateHex(t), this.digest()
                    }
                }
            }, this.updateString = function(t) {
                throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
            }, this.updateHex = function(t) {
                throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
            }, this.digest = function() {
                throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
            }, this.digestString = function(t) {
                throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
            }, this.digestHex = function(t) {
                throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
            }, void 0 !== t && void 0 !== t.alg && (this.algName = t.alg, void 0 === t.prov && (this.provName = ft.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName))
        }, ft.crypto.MessageDigest.getCanonicalAlgName = function(t) {
            return "string" == typeof t && (t = (t = t.toLowerCase()).replace(/-/, "")), t
        }, ft.crypto.MessageDigest.getHashLength = function(t) {
            var e = ft.crypto.MessageDigest,
                i = e.getCanonicalAlgName(t);
            if (void 0 === e.HASHLENGTH[i]) throw "not supported algorithm: " + t;
            return e.HASHLENGTH[i]
        }, ft.crypto.MessageDigest.HASHLENGTH = {
            md5: 16,
            sha1: 20,
            sha224: 28,
            sha256: 32,
            sha384: 48,
            sha512: 64,
            ripemd160: 20
        }, ft.crypto.Mac = function(t) {
            this.setAlgAndProvider = function(t, e) {
                if (null == (t = t.toLowerCase()) && (t = "hmacsha1"), "hmac" != (t = t.toLowerCase()).substr(0, 4)) throw "setAlgAndProvider unsupported HMAC alg: " + t;
                void 0 === e && (e = ft.crypto.Util.DEFAULTPROVIDER[t]), this.algProv = t + "/" + e;
                var i = t.substr(4);
                if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(i) && "cryptojs" == e) {
                    try {
                        var r = ft.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[i];
                        this.mac = y.algo.HMAC.create(r, this.pass)
                    } catch (c) {
                        throw "setAlgAndProvider hash alg set fail hashAlg=" + i + "/" + c
                    }
                    this.updateString = function(t) {
                        this.mac.update(t)
                    }, this.updateHex = function(t) {
                        var e = y.enc.Hex.parse(t);
                        this.mac.update(e)
                    }, this.doFinal = function() {
                        return this.mac.finalize().toString(y.enc.Hex)
                    }, this.doFinalString = function(t) {
                        return this.updateString(t), this.doFinal()
                    }, this.doFinalHex = function(t) {
                        return this.updateHex(t), this.doFinal()
                    }
                }
            }, this.updateString = function(t) {
                throw "updateString(str) not supported for this alg/prov: " + this.algProv
            }, this.updateHex = function(t) {
                throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
            }, this.doFinal = function() {
                throw "digest() not supported for this alg/prov: " + this.algProv
            }, this.doFinalString = function(t) {
                throw "digestString(str) not supported for this alg/prov: " + this.algProv
            }, this.doFinalHex = function(t) {
                throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
            }, this.setPassword = function(t) {
                if ("string" == typeof t) {
                    var e = t;
                    return t.length % 2 != 1 && t.match(/^[0-9A-Fa-f]+$/) || (e = Dt(t)), void(this.pass = y.enc.Hex.parse(e))
                }
                if ("object" != typeof t) throw "KJUR.crypto.Mac unsupported password type: " + t;
                if (e = null, void 0 !== t.hex) {
                    if (t.hex.length % 2 != 0 || !t.hex.match(/^[0-9A-Fa-f]+$/)) throw "Mac: wrong hex password: " + t.hex;
                    e = t.hex
                }
                if (void 0 !== t.utf8 && (e = wt(t.utf8)), void 0 !== t.rstr && (e = Dt(t.rstr)), void 0 !== t.b64 && (e = x(t.b64)), void 0 !== t.b64u && (e = Et(t.b64u)), null == e) throw "KJUR.crypto.Mac unsupported password type: " + t;
                this.pass = y.enc.Hex.parse(e)
            }, void 0 !== t && (void 0 !== t.pass && this.setPassword(t.pass), void 0 !== t.alg && (this.algName = t.alg, void 0 === t.prov && (this.provName = ft.crypto.Util.DEFAULTPROVIDER[this.algName]), this.setAlgAndProvider(this.algName, this.provName)))
        }, ft.crypto.Signature = function(t) {
            var e = null;
            if (this._setAlgNames = function() {
                    var t = this.algName.match(/^(.+)with(.+)$/);
                    t && (this.mdAlgName = t[1].toLowerCase(), this.pubkeyAlgName = t[2].toLowerCase())
                }, this._zeroPaddingOfSignature = function(t, e) {
                    for (var i = "", r = e / 4 - t.length, n = 0; n < r; n++) i += "0";
                    return i + t
                }, this.setAlgAndProvider = function(t, e) {
                    if (this._setAlgNames(), "cryptojs/jsrsa" != e) throw "provider not supported: " + e;
                    if (-1 != ":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)) {
                        try {
                            this.md = new ft.crypto.MessageDigest({
                                alg: this.mdAlgName
                            })
                        } catch (i) {
                            throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + i
                        }
                        this.init = function(t, e) {
                            var i = null;
                            try {
                                i = void 0 === e ? qt.getKey(t) : qt.getKey(t, e)
                            } catch (r) {
                                throw "init failed:" + r
                            }
                            if (!0 === i.isPrivate) this.prvKey = i, this.state = "SIGN";
                            else {
                                if (!0 !== i.isPublic) throw "init failed.:" + i;
                                this.pubKey = i, this.state = "VERIFY"
                            }
                        }, this.updateString = function(t) {
                            this.md.updateString(t)
                        }, this.updateHex = function(t) {
                            this.md.updateHex(t)
                        }, this.sign = function() {
                            if (this.sHashHex = this.md.digest(), void 0 !== this.ecprvhex && void 0 !== this.eccurvename) {
                                var t = new ft.crypto.ECDSA({
                                    curve: this.eccurvename
                                });
                                this.hSign = t.signHex(this.sHashHex, this.ecprvhex)
                            } else if (this.prvKey instanceof at && "rsaandmgf1" === this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
                            else if (this.prvKey instanceof at && "rsa" === this.pubkeyAlgName) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
                            else if (this.prvKey instanceof ft.crypto.ECDSA) this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
                            else {
                                if (!(this.prvKey instanceof ft.crypto.DSA)) throw "Signature: unsupported private key alg: " + this.pubkeyAlgName;
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                            }
                            return this.hSign
                        }, this.signString = function(t) {
                            return this.updateString(t), this.sign()
                        }, this.signHex = function(t) {
                            return this.updateHex(t), this.sign()
                        }, this.verify = function(t) {
                            if (this.sHashHex = this.md.digest(), void 0 !== this.ecpubhex && void 0 !== this.eccurvename) return new ft.crypto.ECDSA({
                                curve: this.eccurvename
                            }).verifyHex(this.sHashHex, t, this.ecpubhex);
                            if (this.pubKey instanceof at && "rsaandmgf1" === this.pubkeyAlgName) return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, t, this.mdAlgName, this.pssSaltLen);
                            if (this.pubKey instanceof at && "rsa" === this.pubkeyAlgName) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                            if (void 0 !== ft.crypto.ECDSA && this.pubKey instanceof ft.crypto.ECDSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                            if (void 0 !== ft.crypto.DSA && this.pubKey instanceof ft.crypto.DSA) return this.pubKey.verifyWithMessageHash(this.sHashHex, t);
                            throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                        }
                    }
                }, this.init = function(t, e) {
                    throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
                }, this.updateString = function(t) {
                    throw "updateString(str) not supported for this alg:prov=" + this.algProvName
                }, this.updateHex = function(t) {
                    throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
                }, this.sign = function() {
                    throw "sign() not supported for this alg:prov=" + this.algProvName
                }, this.signString = function(t) {
                    throw "digestString(str) not supported for this alg:prov=" + this.algProvName
                }, this.signHex = function(t) {
                    throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
                }, this.verify = function(t) {
                    throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
                }, this.initParams = t, void 0 !== t && (void 0 !== t.alg && (this.algName = t.alg, void 0 === t.prov ? this.provName = ft.crypto.Util.DEFAULTPROVIDER[this.algName] : this.provName = t.prov, this.algProvName = this.algName + ":" + this.provName, this.setAlgAndProvider(this.algName, this.provName), this._setAlgNames()), void 0 !== t.psssaltlen && (this.pssSaltLen = t.psssaltlen), void 0 !== t.prvkeypem)) {
                if (void 0 !== t.prvkeypas) throw "both prvkeypem and prvkeypas parameters not supported";
                try {
                    e = qt.getKey(t.prvkeypem), this.init(e)
                } catch (u) {
                    throw "fatal error to load pem private key: " + u
                }
            }
        }, ft.crypto.Cipher = function(t) {}, ft.crypto.Cipher.encrypt = function(t, e, i) {
            if (e instanceof at && e.isPublic) {
                var r = ft.crypto.Cipher.getAlgByKeyAndName(e, i);
                if ("RSA" === r) return e.encrypt(t);
                if ("RSAOAEP" === r) return e.encryptOAEP(t, "sha1");
                var n = r.match(/^RSAOAEP(\d+)$/);
                if (null !== n) return e.encryptOAEP(t, "sha" + n[1]);
                throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + i
            }
            throw "Cipher.encrypt: unsupported key or algorithm"
        }, ft.crypto.Cipher.decrypt = function(t, e, i) {
            if (e instanceof at && e.isPrivate) {
                var r = ft.crypto.Cipher.getAlgByKeyAndName(e, i);
                if ("RSA" === r) return e.decrypt(t);
                if ("RSAOAEP" === r) return e.decryptOAEP(t, "sha1");
                var n = r.match(/^RSAOAEP(\d+)$/);
                if (null !== n) return e.decryptOAEP(t, "sha" + n[1]);
                throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + i
            }
            throw "Cipher.decrypt: unsupported key or algorithm"
        }, ft.crypto.Cipher.getAlgByKeyAndName = function(t, e) {
            if (t instanceof at) {
                if (-1 != ":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(e)) return e;
                if (null == e) return "RSA";
                throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + e
            }
            throw "getAlgByKeyAndName: not supported algorithm name: " + e
        }, ft.crypto.OID = new function() {
            this.oidhex2name = {
                "2a864886f70d010101": "rsaEncryption",
                "2a8648ce3d0201": "ecPublicKey",
                "2a8648ce380401": "dsa",
                "2a8648ce3d030107": "secp256r1",
                "2b8104001f": "secp192k1",
                "2b81040021": "secp224r1",
                "2b8104000a": "secp256k1",
                "2b81040023": "secp521r1",
                "2b81040022": "secp384r1",
                "2a8648ce380403": "SHA1withDSA",
                "608648016503040301": "SHA224withDSA",
                "608648016503040302": "SHA256withDSA"
            }
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.crypto && ft.crypto || (ft.crypto = {}), ft.crypto.ECDSA = function(t) {
            var e = new rt;
            this.type = "EC", this.isPrivate = !1, this.isPublic = !1, this.getBigRandom = function(t) {
                return new E(t.bitLength(), e).mod(t.subtract(E.ONE)).add(E.ONE)
            }, this.setNamedCurve = function(t) {
                this.ecparams = ft.crypto.ECParameterDB.getByName(t), this.prvKeyHex = null, this.pubKeyHex = null, this.curveName = t
            }, this.setPrivateKeyHex = function(t) {
                this.isPrivate = !0, this.prvKeyHex = t
            }, this.setPublicKeyHex = function(t) {
                this.isPublic = !0, this.pubKeyHex = t
            }, this.getPublicKeyXYHex = function() {
                var t = this.pubKeyHex;
                if ("04" !== t.substr(0, 2)) throw "this method supports uncompressed format(04) only";
                var e = this.ecparams.keylen / 4;
                if (t.length !== 2 + 2 * e) throw "malformed public key hex length";
                var i = {};
                return i.x = t.substr(2, e), i.y = t.substr(2 + e), i
            }, this.getShortNISTPCurveName = function() {
                var t = this.curveName;
                return "secp256r1" === t || "NIST P-256" === t || "P-256" === t || "prime256v1" === t ? "P-256" : "secp384r1" === t || "NIST P-384" === t || "P-384" === t ? "P-384" : null
            }, this.generateKeyPairHex = function() {
                var t = this.ecparams.n,
                    e = this.getBigRandom(t),
                    i = this.ecparams.G.multiply(e),
                    r = i.getX().toBigInteger(),
                    n = i.getY().toBigInteger(),
                    s = this.ecparams.keylen / 4,
                    a = ("0000000000" + e.toString(16)).slice(-s),
                    o = "04" + ("0000000000" + r.toString(16)).slice(-s) + ("0000000000" + n.toString(16)).slice(-s);
                return this.setPrivateKeyHex(a), this.setPublicKeyHex(o), {
                    ecprvhex: a,
                    ecpubhex: o
                }
            }, this.signWithMessageHash = function(t) {
                return this.signHex(t, this.prvKeyHex)
            }, this.signHex = function(t, e) {
                var i = new E(e, 16),
                    r = this.ecparams.n,
                    n = new E(t, 16);
                do {
                    var s = this.getBigRandom(r),
                        a = this.ecparams.G.multiply(s).getX().toBigInteger().mod(r)
                } while (a.compareTo(E.ZERO) <= 0);
                var o = s.modInverse(r).multiply(n.add(i.multiply(a))).mod(r);
                return ft.crypto.ECDSA.biRSSigToASN1Sig(a, o)
            }, this.sign = function(t, e) {
                var i = e,
                    r = this.ecparams.n,
                    n = E.fromByteArrayUnsigned(t);
                do {
                    var s = this.getBigRandom(r),
                        a = this.ecparams.G.multiply(s).getX().toBigInteger().mod(r)
                } while (a.compareTo(E.ZERO) <= 0);
                var o = s.modInverse(r).multiply(n.add(i.multiply(a))).mod(r);
                return this.serializeSig(a, o)
            }, this.verifyWithMessageHash = function(t, e) {
                return this.verifyHex(t, e, this.pubKeyHex)
            }, this.verifyHex = function(t, e, i) {
                var r, n, s, a = ft.crypto.ECDSA.parseSigHex(e);
                r = a.r, n = a.s, s = ut.decodeFromHex(this.ecparams.curve, i);
                var o = new E(t, 16);
                return this.verifyRaw(o, r, n, s)
            }, this.verify = function(t, e, i) {
                var r, n, s;
                if (Bitcoin.Util.isArray(e)) {
                    var a = this.parseSig(e);
                    r = a.r, n = a.s
                } else {
                    if ("object" != typeof e || !e.r || !e.s) throw "Invalid value for signature";
                    r = e.r, n = e.s
                }
                if (i instanceof ut) s = i;
                else {
                    if (!Bitcoin.Util.isArray(i)) throw "Invalid format for pubkey value, must be byte array or ECPointFp";
                    s = ut.decodeFrom(this.ecparams.curve, i)
                }
                var o = E.fromByteArrayUnsigned(t);
                return this.verifyRaw(o, r, n, s)
            }, this.verifyRaw = function(t, e, i, r) {
                var n = this.ecparams.n,
                    s = this.ecparams.G;
                if (e.compareTo(E.ONE) < 0 || e.compareTo(n) >= 0) return !1;
                if (i.compareTo(E.ONE) < 0 || i.compareTo(n) >= 0) return !1;
                var a = i.modInverse(n),
                    o = t.multiply(a).mod(n),
                    h = e.multiply(a).mod(n);
                return s.multiply(o).add(r.multiply(h)).getX().toBigInteger().mod(n).equals(e)
            }, this.serializeSig = function(t, e) {
                var i = t.toByteArraySigned(),
                    r = e.toByteArraySigned(),
                    n = [];
                return n.push(2), n.push(i.length), (n = n.concat(i)).push(2), n.push(r.length), (n = n.concat(r)).unshift(n.length), n.unshift(48), n
            }, this.parseSig = function(t) {
                var e;
                if (48 != t[0]) throw new Error("Signature not a valid DERSequence");
                if (2 != t[e = 2]) throw new Error("First element in signature must be a DERInteger");
                var i = t.slice(e + 2, e + 2 + t[e + 1]);
                if (2 != t[e += 2 + t[e + 1]]) throw new Error("Second element in signature must be a DERInteger");
                var r = t.slice(e + 2, e + 2 + t[e + 1]);
                return e += 2 + t[e + 1], {
                    r: E.fromByteArrayUnsigned(i),
                    s: E.fromByteArrayUnsigned(r)
                }
            }, this.parseSigCompact = function(t) {
                if (65 !== t.length) throw "Signature has the wrong length";
                var e = t[0] - 27;
                if (e < 0 || e > 7) throw "Invalid signature type";
                var i = this.ecparams.n;
                return {
                    r: E.fromByteArrayUnsigned(t.slice(1, 33)).mod(i),
                    s: E.fromByteArrayUnsigned(t.slice(33, 65)).mod(i),
                    i: e
                }
            }, this.readPKCS5PrvKeyHex = function(t) {
                var e, i, r, n = pt,
                    s = ft.crypto.ECDSA.getName,
                    a = n.getVbyList;
                if (!1 === n.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    e = a(t, 0, [2, 0], "06"), i = a(t, 0, [1], "04");
                    try {
                        r = a(t, 0, [3, 0], "03").substr(2)
                    } catch (o) {}
                } catch (o) {
                    throw "malformed PKCS#1/5 plain ECC private key"
                }
                if (this.curveName = s(e), void 0 === this.curveName) throw "unsupported curve name";
                this.setNamedCurve(this.curveName), this.setPublicKeyHex(r), this.setPrivateKeyHex(i), this.isPublic = !1
            }, this.readPKCS8PrvKeyHex = function(t) {
                var e, i, r, n = pt,
                    s = ft.crypto.ECDSA.getName,
                    a = n.getVbyList;
                if (!1 === n.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    a(t, 0, [1, 0], "06"), e = a(t, 0, [1, 1], "06"), i = a(t, 0, [2, 0, 1], "04");
                    try {
                        r = a(t, 0, [2, 0, 2, 0], "03").substr(2)
                    } catch (o) {}
                } catch (o) {
                    throw "malformed PKCS#8 plain ECC private key"
                }
                if (this.curveName = s(e), void 0 === this.curveName) throw "unsupported curve name";
                this.setNamedCurve(this.curveName), this.setPublicKeyHex(r), this.setPrivateKeyHex(i), this.isPublic = !1
            }, this.readPKCS8PubKeyHex = function(t) {
                var e, i, r = pt,
                    n = ft.crypto.ECDSA.getName,
                    s = r.getVbyList;
                if (!1 === r.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    s(t, 0, [0, 0], "06"), e = s(t, 0, [0, 1], "06"), i = s(t, 0, [1], "03").substr(2)
                } catch (o) {
                    throw "malformed PKCS#8 ECC public key"
                }
                if (this.curveName = n(e), null === this.curveName) throw "unsupported curve name";
                this.setNamedCurve(this.curveName), this.setPublicKeyHex(i)
            }, this.readCertPubKeyHex = function(t, e) {
                5 !== e && (e = 6);
                var i, r, n = pt,
                    s = ft.crypto.ECDSA.getName,
                    a = n.getVbyList;
                if (!1 === n.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    i = a(t, 0, [0, e, 0, 1], "06"), r = a(t, 0, [0, e, 1], "03").substr(2)
                } catch (o) {
                    throw "malformed X.509 certificate ECC public key"
                }
                if (this.curveName = s(i), null === this.curveName) throw "unsupported curve name";
                this.setNamedCurve(this.curveName), this.setPublicKeyHex(r)
            }, void 0 !== t && void 0 !== t.curve && (this.curveName = t.curve), void 0 === this.curveName && (this.curveName = "secp256r1"), this.setNamedCurve(this.curveName), void 0 !== t && (void 0 !== t.prv && this.setPrivateKeyHex(t.prv), void 0 !== t.pub && this.setPublicKeyHex(t.pub))
        }, ft.crypto.ECDSA.parseSigHex = function(t) {
            var e = ft.crypto.ECDSA.parseSigHexInHexRS(t);
            return {
                r: new E(e.r, 16),
                s: new E(e.s, 16)
            }
        }, ft.crypto.ECDSA.parseSigHexInHexRS = function(t) {
            var e = pt,
                i = e.getChildIdx,
                r = e.getV;
            if ("30" != t.substr(0, 2)) throw "signature is not a ASN.1 sequence";
            var n = i(t, 0);
            if (2 != n.length) throw "number of signature ASN.1 sequence elements seem wrong";
            var s = n[0],
                a = n[1];
            if ("02" != t.substr(s, 2)) throw "1st item of sequene of signature is not ASN.1 integer";
            if ("02" != t.substr(a, 2)) throw "2nd item of sequene of signature is not ASN.1 integer";
            return {
                r: r(t, s),
                s: r(t, a)
            }
        }, ft.crypto.ECDSA.asn1SigToConcatSig = function(t) {
            var e = ft.crypto.ECDSA.parseSigHexInHexRS(t),
                i = e.r,
                r = e.s;
            if ("00" == i.substr(0, 2) && i.length % 32 == 2 && (i = i.substr(2)), "00" == r.substr(0, 2) && r.length % 32 == 2 && (r = r.substr(2)), i.length % 32 == 30 && (i = "00" + i), r.length % 32 == 30 && (r = "00" + r), i.length % 32 != 0) throw "unknown ECDSA sig r length error";
            if (r.length % 32 != 0) throw "unknown ECDSA sig s length error";
            return i + r
        }, ft.crypto.ECDSA.concatSigToASN1Sig = function(t) {
            if (t.length / 2 * 8 % 128 != 0) throw "unknown ECDSA concatinated r-s sig  length error";
            var e = t.substr(0, t.length / 2),
                i = t.substr(t.length / 2);
            return ft.crypto.ECDSA.hexRSSigToASN1Sig(e, i)
        }, ft.crypto.ECDSA.hexRSSigToASN1Sig = function(t, e) {
            var i = new E(t, 16),
                r = new E(e, 16);
            return ft.crypto.ECDSA.biRSSigToASN1Sig(i, r)
        }, ft.crypto.ECDSA.biRSSigToASN1Sig = function(t, e) {
            var i = ft.asn1,
                r = new i.DERInteger({
                    bigint: t
                }),
                n = new i.DERInteger({
                    bigint: e
                });
            return new i.DERSequence({
                array: [r, n]
            }).getEncodedHex()
        }, ft.crypto.ECDSA.getName = function(t) {
            return "2a8648ce3d030107" === t ? "secp256r1" : "2b8104000a" === t ? "secp256k1" : "2b81040022" === t ? "secp384r1" : -1 !== "|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(t) ? "secp256r1" : -1 !== "|secp256k1|".indexOf(t) ? "secp256k1" : -1 !== "|secp384r1|NIST P-384|P-384|".indexOf(t) ? "secp384r1" : null
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.crypto && ft.crypto || (ft.crypto = {}), ft.crypto.ECParameterDB = new function() {
            var t = {},
                e = {};

            function i(t) {
                return new E(t, 16)
            }
            this.getByName = function(i) {
                var r = i;
                if (void 0 !== e[r] && (r = e[i]), void 0 !== t[r]) return t[r];
                throw "unregistered EC curve name: " + r
            }, this.regist = function(r, n, s, a, o, h, u, c, l, f, d, g) {
                t[r] = {};
                var p = i(s),
                    y = i(a),
                    v = i(o),
                    m = i(h),
                    S = i(u),
                    F = new ct(p, y, v),
                    x = F.decodePointHex("04" + c + l);
                t[r].name = r, t[r].keylen = n, t[r].curve = F, t[r].G = x, t[r].n = m, t[r].h = S, t[r].oid = d, t[r].info = g;
                for (var b = 0; b < f.length; b++) e[f[b]] = r
            }
        }, ft.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field"), ft.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field"), ft.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field"), ft.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []), ft.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []), ft.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []), ft.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []), ft.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", ["NIST P-256", "P-256", "prime256v1"]), ft.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", ["NIST P-384", "P-384"]), ft.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", ["NIST P-521", "P-521"]), void 0 !== ft && ft || (ft = {}), void 0 !== ft.crypto && ft.crypto || (ft.crypto = {}), ft.crypto.DSA = function() {
            this.p = null, this.q = null, this.g = null, this.y = null, this.x = null, this.type = "DSA", this.isPrivate = !1, this.isPublic = !1, this.setPrivate = function(t, e, i, r, n) {
                this.isPrivate = !0, this.p = t, this.q = e, this.g = i, this.y = r, this.x = n
            }, this.setPrivateHex = function(t, e, i, r, n) {
                var s, a, o, h, u;
                s = new E(t, 16), a = new E(e, 16), o = new E(i, 16), h = "string" == typeof r && r.length > 1 ? new E(r, 16) : null, u = new E(n, 16), this.setPrivate(s, a, o, h, u)
            }, this.setPublic = function(t, e, i, r) {
                this.isPublic = !0, this.p = t, this.q = e, this.g = i, this.y = r, this.x = null
            }, this.setPublicHex = function(t, e, i, r) {
                var n, s, a, o;
                n = new E(t, 16), s = new E(e, 16), a = new E(i, 16), o = new E(r, 16), this.setPublic(n, s, a, o)
            }, this.signWithMessageHash = function(t) {
                var e = this.p,
                    i = this.q,
                    r = this.g,
                    n = (this.y, this.x),
                    s = ft.crypto.Util.getRandomBigIntegerMinToMax(E.ONE.add(E.ONE), i.subtract(E.ONE)),
                    a = new E(t.substr(0, i.bitLength() / 4), 16),
                    o = r.modPow(s, e).mod(i),
                    h = s.modInverse(i).multiply(a.add(n.multiply(o))).mod(i);
                return ft.asn1.ASN1Util.jsonToASN1HEX({
                    seq: [{
                        int: {
                            bigint: o
                        }
                    }, {
                        int: {
                            bigint: h
                        }
                    }]
                })
            }, this.verifyWithMessageHash = function(t, e) {
                var i = this.p,
                    r = this.q,
                    n = this.g,
                    s = this.y,
                    a = this.parseASN1Signature(e),
                    o = a[0],
                    h = a[1],
                    u = new E(t.substr(0, r.bitLength() / 4), 16);
                if (E.ZERO.compareTo(o) > 0 || o.compareTo(r) > 0) throw "invalid DSA signature";
                if (E.ZERO.compareTo(h) >= 0 || h.compareTo(r) > 0) throw "invalid DSA signature";
                var c = h.modInverse(r),
                    l = u.multiply(c).mod(r),
                    f = o.multiply(c).mod(r);
                return 0 == n.modPow(l, i).multiply(s.modPow(f, i)).mod(i).mod(r).compareTo(o)
            }, this.parseASN1Signature = function(t) {
                try {
                    return [new E(pt.getVbyList(t, 0, [0], "02"), 16), new E(pt.getVbyList(t, 0, [1], "02"), 16)]
                } catch (a) {
                    throw "malformed ASN.1 DSA signature"
                }
            }, this.readPKCS5PrvKeyHex = function(t) {
                var e, i, r, s, a, o = pt,
                    h = o.getVbyList;
                if (!1 === o.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    e = h(t, 0, [1], "02"), i = h(t, 0, [2], "02"), r = h(t, 0, [3], "02"), s = h(t, 0, [4], "02"), a = h(t, 0, [5], "02")
                } catch (n) {
                    throw console.log("EXCEPTION:" + n), "malformed PKCS#1/5 plain DSA private key"
                }
                this.setPrivateHex(e, i, r, s, a)
            }, this.readPKCS8PrvKeyHex = function(t) {
                var e, i, r, n, a = pt,
                    o = a.getVbyList;
                if (!1 === a.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    e = o(t, 0, [1, 1, 0], "02"), i = o(t, 0, [1, 1, 1], "02"), r = o(t, 0, [1, 1, 2], "02"), n = o(t, 0, [2, 0], "02")
                } catch (s) {
                    throw console.log("EXCEPTION:" + s), "malformed PKCS#8 plain DSA private key"
                }
                this.setPrivateHex(e, i, r, null, n)
            }, this.readPKCS8PubKeyHex = function(t) {
                var e, i, r, n, a = pt,
                    o = a.getVbyList;
                if (!1 === a.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    e = o(t, 0, [0, 1, 0], "02"), i = o(t, 0, [0, 1, 1], "02"), r = o(t, 0, [0, 1, 2], "02"), n = o(t, 0, [1, 0], "02")
                } catch (s) {
                    throw console.log("EXCEPTION:" + s), "malformed PKCS#8 DSA public key"
                }
                this.setPublicHex(e, i, r, n)
            }, this.readCertPubKeyHex = function(t, e) {
                var i, r, s, a;
                5 !== e && (e = 6);
                var o = pt,
                    h = o.getVbyList;
                if (!1 === o.isASN1HEX(t)) throw "not ASN.1 hex string";
                try {
                    i = h(t, 0, [0, e, 0, 1, 0], "02"), r = h(t, 0, [0, e, 0, 1, 1], "02"), s = h(t, 0, [0, e, 0, 1, 2], "02"), a = h(t, 0, [0, e, 1, 0], "02")
                } catch (n) {
                    throw console.log("EXCEPTION:" + n), "malformed X.509 certificate DSA public key"
                }
                this.setPublicHex(i, r, s, a)
            }
        };
        var qt = function() {
            var t = function(t, i, r) {
                    return e(y.AES, t, i, r)
                },
                e = function(t, e, i, r) {
                    var n = y.enc.Hex.parse(e),
                        s = y.enc.Hex.parse(i),
                        a = y.enc.Hex.parse(r),
                        o = {};
                    o.key = s, o.iv = a, o.ciphertext = n;
                    var h = t.decrypt(o, s, {
                        iv: a
                    });
                    return y.enc.Hex.stringify(h)
                },
                i = function(t, e, i) {
                    return r(y.AES, t, e, i)
                },
                r = function(t, e, i, r) {
                    var n = y.enc.Hex.parse(e),
                        s = y.enc.Hex.parse(i),
                        a = y.enc.Hex.parse(r),
                        o = t.encrypt(n, s, {
                            iv: a
                        }),
                        h = y.enc.Hex.parse(o.toString());
                    return y.enc.Base64.stringify(h)
                },
                n = {
                    "AES-256-CBC": {
                        proc: t,
                        eproc: i,
                        keylen: 32,
                        ivlen: 16
                    },
                    "AES-192-CBC": {
                        proc: t,
                        eproc: i,
                        keylen: 24,
                        ivlen: 16
                    },
                    "AES-128-CBC": {
                        proc: t,
                        eproc: i,
                        keylen: 16,
                        ivlen: 16
                    },
                    "DES-EDE3-CBC": {
                        proc: function(t, i, r) {
                            return e(y.TripleDES, t, i, r)
                        },
                        eproc: function(t, e, i) {
                            return r(y.TripleDES, t, e, i)
                        },
                        keylen: 24,
                        ivlen: 8
                    },
                    "DES-CBC": {
                        proc: function(t, i, r) {
                            return e(y.DES, t, i, r)
                        },
                        eproc: function(t, e, i) {
                            return r(y.DES, t, e, i)
                        },
                        keylen: 8,
                        ivlen: 8
                    }
                },
                s = function(t) {
                    var e = {},
                        i = t.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"));
                    i && (e.cipher = i[1], e.ivsalt = i[2]);
                    var r = t.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
                    r && (e.type = r[1]);
                    var n = -1,
                        s = 0; - 1 != t.indexOf("\r\n\r\n") && (n = t.indexOf("\r\n\r\n"), s = 2), -1 != t.indexOf("\n\n") && (n = t.indexOf("\n\n"), s = 1);
                    var a = t.indexOf("-----END");
                    if (-1 != n && -1 != a) {
                        var o = t.substring(n + 2 * s, a - s);
                        o = o.replace(/\s+/g, ""), e.data = o
                    }
                    return e
                },
                a = function(t, e, i) {
                    for (var r = i.substring(0, 16), s = y.enc.Hex.parse(r), a = y.enc.Utf8.parse(e), o = n[t].keylen + n[t].ivlen, h = "", u = null;;) {
                        var c = y.algo.MD5.create();
                        if (null != u && c.update(u), c.update(a), c.update(s), u = c.finalize(), (h += y.enc.Hex.stringify(u)).length >= 2 * o) break
                    }
                    var l = {};
                    return l.keyhex = h.substr(0, 2 * n[t].keylen), l.ivhex = h.substr(2 * n[t].keylen, 2 * n[t].ivlen), l
                },
                o = function(t, e, i, r) {
                    var s = y.enc.Base64.parse(t),
                        a = y.enc.Hex.stringify(s);
                    return (0, n[e].proc)(a, i, r)
                };
            return {
                version: "1.0.0",
                parsePKCS5PEM: function(t) {
                    return s(t)
                },
                getKeyAndUnusedIvByPasscodeAndIvsalt: function(t, e, i) {
                    return a(t, e, i)
                },
                decryptKeyB64: function(t, e, i, r) {
                    return o(t, e, i, r)
                },
                getDecryptedKeyHex: function(t, e) {
                    var i = s(t),
                        r = (i.type, i.cipher),
                        n = i.ivsalt,
                        h = i.data,
                        u = a(r, e, n).keyhex;
                    return o(h, r, u, n)
                },
                getEncryptedPKCS5PEMFromPrvKeyHex: function(t, e, i, r, s) {
                    var o = "";
                    if (void 0 !== r && null != r || (r = "AES-256-CBC"), void 0 === n[r]) throw "KEYUTIL unsupported algorithm: " + r;
                    void 0 !== s && null != s || (s = function(t) {
                        var e = y.lib.WordArray.random(t);
                        return y.enc.Hex.stringify(e)
                    }(n[r].ivlen).toUpperCase());
                    var h = function(t, e, i, r) {
                        return (0, n[e].eproc)(t, i, r)
                    }(e, r, a(r, i, s).keyhex, s);
                    return o = "-----BEGIN " + t + " PRIVATE KEY-----\r\n", o += "Proc-Type: 4,ENCRYPTED\r\n", o += "DEK-Info: " + r + "," + s + "\r\n", o += "\r\n", (o += h.replace(/(.{64})/g, "$1\r\n")) + "\r\n-----END " + t + " PRIVATE KEY-----\r\n"
                },
                parseHexOfEncryptedPKCS8: function(t) {
                    var e = pt,
                        i = e.getChildIdx,
                        r = e.getV,
                        n = {},
                        s = i(t, 0);
                    if (2 != s.length) throw "malformed format: SEQUENCE(0).items != 2: " + s.length;
                    n.ciphertext = r(t, s[1]);
                    var a = i(t, s[0]);
                    if (2 != a.length) throw "malformed format: SEQUENCE(0.0).items != 2: " + a.length;
                    if ("2a864886f70d01050d" != r(t, a[0])) throw "this only supports pkcs5PBES2";
                    var o = i(t, a[1]);
                    if (2 != a.length) throw "malformed format: SEQUENCE(0.0.1).items != 2: " + o.length;
                    var h = i(t, o[1]);
                    if (2 != h.length) throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + h.length;
                    if ("2a864886f70d0307" != r(t, h[0])) throw "this only supports TripleDES";
                    n.encryptionSchemeAlg = "TripleDES", n.encryptionSchemeIV = r(t, h[1]);
                    var u = i(t, o[0]);
                    if (2 != u.length) throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + u.length;
                    if ("2a864886f70d01050c" != r(t, u[0])) throw "this only supports pkcs5PBKDF2";
                    var c = i(t, u[1]);
                    if (c.length < 2) throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + c.length;
                    n.pbkdf2Salt = r(t, c[0]);
                    var l = r(t, c[1]);
                    try {
                        n.pbkdf2Iter = parseInt(l, 16)
                    } catch (f) {
                        throw "malformed format pbkdf2Iter: " + l
                    }
                    return n
                },
                getPBKDF2KeyHexFromParam: function(t, e) {
                    var i = y.enc.Hex.parse(t.pbkdf2Salt),
                        r = t.pbkdf2Iter,
                        n = y.PBKDF2(e, i, {
                            keySize: 6,
                            iterations: r
                        });
                    return y.enc.Hex.stringify(n)
                },
                _getPlainPKCS8HexFromEncryptedPKCS8PEM: function(t, e) {
                    var i = Pt(t, "ENCRYPTED PRIVATE KEY"),
                        r = this.parseHexOfEncryptedPKCS8(i),
                        n = qt.getPBKDF2KeyHexFromParam(r, e),
                        s = {};
                    s.ciphertext = y.enc.Hex.parse(r.ciphertext);
                    var a = y.enc.Hex.parse(n),
                        o = y.enc.Hex.parse(r.encryptionSchemeIV),
                        h = y.TripleDES.decrypt(s, a, {
                            iv: o
                        });
                    return y.enc.Hex.stringify(h)
                },
                getKeyFromEncryptedPKCS8PEM: function(t, e) {
                    var i = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(t, e);
                    return this.getKeyFromPlainPrivatePKCS8Hex(i)
                },
                parsePlainPrivatePKCS8Hex: function(t) {
                    var e = pt,
                        i = e.getChildIdx,
                        r = e.getV,
                        n = {
                            algparam: null
                        };
                    if ("30" != t.substr(0, 2)) throw "malformed plain PKCS8 private key(code:001)";
                    var s = i(t, 0);
                    if (3 != s.length) throw "malformed plain PKCS8 private key(code:002)";
                    if ("30" != t.substr(s[1], 2)) throw "malformed PKCS8 private key(code:003)";
                    var a = i(t, s[1]);
                    if (2 != a.length) throw "malformed PKCS8 private key(code:004)";
                    if ("06" != t.substr(a[0], 2)) throw "malformed PKCS8 private key(code:005)";
                    if (n.algoid = r(t, a[0]), "06" == t.substr(a[1], 2) && (n.algparam = r(t, a[1])), "04" != t.substr(s[2], 2)) throw "malformed PKCS8 private key(code:006)";
                    return n.keyidx = e.getVidx(t, s[2]), n
                },
                getKeyFromPlainPrivatePKCS8PEM: function(t) {
                    var e = Pt(t, "PRIVATE KEY");
                    return this.getKeyFromPlainPrivatePKCS8Hex(e)
                },
                getKeyFromPlainPrivatePKCS8Hex: function(t) {
                    var e, i = this.parsePlainPrivatePKCS8Hex(t);
                    if ("2a864886f70d010101" == i.algoid) e = new at;
                    else if ("2a8648ce380401" == i.algoid) e = new ft.crypto.DSA;
                    else {
                        if ("2a8648ce3d0201" != i.algoid) throw "unsupported private key algorithm";
                        e = new ft.crypto.ECDSA
                    }
                    return e.readPKCS8PrvKeyHex(t), e
                },
                _getKeyFromPublicPKCS8Hex: function(t) {
                    var e, i = pt.getVbyList(t, 0, [0, 0], "06");
                    if ("2a864886f70d010101" === i) e = new at;
                    else if ("2a8648ce380401" === i) e = new ft.crypto.DSA;
                    else {
                        if ("2a8648ce3d0201" !== i) throw "unsupported PKCS#8 public key hex";
                        e = new ft.crypto.ECDSA
                    }
                    return e.readPKCS8PubKeyHex(t), e
                },
                parsePublicRawRSAKeyHex: function(t) {
                    var e = pt,
                        i = e.getChildIdx,
                        r = e.getV,
                        n = {};
                    if ("30" != t.substr(0, 2)) throw "malformed RSA key(code:001)";
                    var s = i(t, 0);
                    if (2 != s.length) throw "malformed RSA key(code:002)";
                    if ("02" != t.substr(s[0], 2)) throw "malformed RSA key(code:003)";
                    if (n.n = r(t, s[0]), "02" != t.substr(s[1], 2)) throw "malformed RSA key(code:004)";
                    return n.e = r(t, s[1]), n
                },
                parsePublicPKCS8Hex: function(t) {
                    var e = pt,
                        i = e.getChildIdx,
                        r = e.getV,
                        n = {
                            algparam: null
                        },
                        s = i(t, 0);
                    if (2 != s.length) throw "outer DERSequence shall have 2 elements: " + s.length;
                    var a = s[0];
                    if ("30" != t.substr(a, 2)) throw "malformed PKCS8 public key(code:001)";
                    var o = i(t, a);
                    if (2 != o.length) throw "malformed PKCS8 public key(code:002)";
                    if ("06" != t.substr(o[0], 2)) throw "malformed PKCS8 public key(code:003)";
                    if (n.algoid = r(t, o[0]), "06" == t.substr(o[1], 2) ? n.algparam = r(t, o[1]) : "30" == t.substr(o[1], 2) && (n.algparam = {}, n.algparam.p = e.getVbyList(t, o[1], [0], "02"), n.algparam.q = e.getVbyList(t, o[1], [1], "02"), n.algparam.g = e.getVbyList(t, o[1], [2], "02")), "03" != t.substr(s[1], 2)) throw "malformed PKCS8 public key(code:004)";
                    return n.key = r(t, s[1]).substr(2), n
                }
            }
        }();
        qt.getKey = function(t, e, i) {
            var r, n = (v = pt).getChildIdx,
                s = (v.getV, v.getVbyList),
                a = ft.crypto,
                o = a.ECDSA,
                h = a.DSA,
                u = at,
                c = Pt,
                l = qt;
            if (void 0 !== u && t instanceof u) return t;
            if (void 0 !== o && t instanceof o) return t;
            if (void 0 !== h && t instanceof h) return t;
            if (void 0 !== t.curve && void 0 !== t.xy && void 0 === t.d) return new o({
                pub: t.xy,
                curve: t.curve
            });
            if (void 0 !== t.curve && void 0 !== t.d) return new o({
                prv: t.d,
                curve: t.curve
            });
            if (void 0 === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 === t.d) return (T = new u).setPublic(t.n, t.e), T;
            if (void 0 === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 !== t.d && void 0 !== t.p && void 0 !== t.q && void 0 !== t.dp && void 0 !== t.dq && void 0 !== t.co && void 0 === t.qi) return (T = new u).setPrivateEx(t.n, t.e, t.d, t.p, t.q, t.dp, t.dq, t.co), T;
            if (void 0 === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 !== t.d && void 0 === t.p) return (T = new u).setPrivate(t.n, t.e, t.d), T;
            if (void 0 !== t.p && void 0 !== t.q && void 0 !== t.g && void 0 !== t.y && void 0 === t.x) return (T = new h).setPublic(t.p, t.q, t.g, t.y), T;
            if (void 0 !== t.p && void 0 !== t.q && void 0 !== t.g && void 0 !== t.y && void 0 !== t.x) return (T = new h).setPrivate(t.p, t.q, t.g, t.y, t.x), T;
            if ("RSA" === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 === t.d) return (T = new u).setPublic(Et(t.n), Et(t.e)), T;
            if ("RSA" === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 !== t.d && void 0 !== t.p && void 0 !== t.q && void 0 !== t.dp && void 0 !== t.dq && void 0 !== t.qi) return (T = new u).setPrivateEx(Et(t.n), Et(t.e), Et(t.d), Et(t.p), Et(t.q), Et(t.dp), Et(t.dq), Et(t.qi)), T;
            if ("RSA" === t.kty && void 0 !== t.n && void 0 !== t.e && void 0 !== t.d) return (T = new u).setPrivate(Et(t.n), Et(t.e), Et(t.d)), T;
            if ("EC" === t.kty && void 0 !== t.crv && void 0 !== t.x && void 0 !== t.y && void 0 === t.d) {
                var f = (I = new o({
                        curve: t.crv
                    })).ecparams.keylen / 4,
                    d = "04" + ("0000000000" + Et(t.x)).slice(-f) + ("0000000000" + Et(t.y)).slice(-f);
                return I.setPublicKeyHex(d), I
            }
            if ("EC" === t.kty && void 0 !== t.crv && void 0 !== t.x && void 0 !== t.y && void 0 !== t.d) {
                f = (I = new o({
                    curve: t.crv
                })).ecparams.keylen / 4, d = "04" + ("0000000000" + Et(t.x)).slice(-f) + ("0000000000" + Et(t.y)).slice(-f);
                var g = ("0000000000" + Et(t.d)).slice(-f);
                return I.setPublicKeyHex(d), I.setPrivateKeyHex(g), I
            }
            if ("pkcs5prv" === i) {
                var p, y = t,
                    v = pt;
                if (9 === (p = n(y, 0)).length)(T = new u).readPKCS5PrvKeyHex(y);
                else if (6 === p.length)(T = new h).readPKCS5PrvKeyHex(y);
                else {
                    if (!(p.length > 2 && "04" === y.substr(p[1], 2))) throw "unsupported PKCS#1/5 hexadecimal key";
                    (T = new o).readPKCS5PrvKeyHex(y)
                }
                return T
            }
            if ("pkcs8prv" === i) return l.getKeyFromPlainPrivatePKCS8Hex(t);
            if ("pkcs8pub" === i) return l._getKeyFromPublicPKCS8Hex(t);
            if ("x509pub" === i) return Gt.getPublicKeyFromCertHex(t);
            if (-1 != t.indexOf("-END CERTIFICATE-", 0) || -1 != t.indexOf("-END X509 CERTIFICATE-", 0) || -1 != t.indexOf("-END TRUSTED CERTIFICATE-", 0)) return Gt.getPublicKeyFromCertPEM(t);
            if (-1 != t.indexOf("-END PUBLIC KEY-")) {
                var m = Pt(t, "PUBLIC KEY");
                return l._getKeyFromPublicPKCS8Hex(m)
            }
            if (-1 != t.indexOf("-END RSA PRIVATE KEY-") && -1 == t.indexOf("4,ENCRYPTED")) {
                var S = c(t, "RSA PRIVATE KEY");
                return l.getKey(S, null, "pkcs5prv")
            }
            if (-1 != t.indexOf("-END DSA PRIVATE KEY-") && -1 == t.indexOf("4,ENCRYPTED")) {
                var F = s(r = c(t, "DSA PRIVATE KEY"), 0, [1], "02"),
                    x = s(r, 0, [2], "02"),
                    b = s(r, 0, [3], "02"),
                    w = s(r, 0, [4], "02"),
                    A = s(r, 0, [5], "02");
                return (T = new h).setPrivate(new E(F, 16), new E(x, 16), new E(b, 16), new E(w, 16), new E(A, 16)), T
            }
            if (-1 != t.indexOf("-END PRIVATE KEY-")) return l.getKeyFromPlainPrivatePKCS8PEM(t);
            if (-1 != t.indexOf("-END RSA PRIVATE KEY-") && -1 != t.indexOf("4,ENCRYPTED")) {
                var C = l.getDecryptedKeyHex(t, e),
                    D = new at;
                return D.readPKCS5PrvKeyHex(C), D
            }
            if (-1 != t.indexOf("-END EC PRIVATE KEY-") && -1 != t.indexOf("4,ENCRYPTED")) {
                var I, T = s(r = l.getDecryptedKeyHex(t, e), 0, [1], "04"),
                    B = s(r, 0, [2, 0], "06"),
                    H = s(r, 0, [3, 0], "03").substr(2);
                if (void 0 === ft.crypto.OID.oidhex2name[B]) throw "undefined OID(hex) in KJUR.crypto.OID: " + B;
                return (I = new o({
                    curve: ft.crypto.OID.oidhex2name[B]
                })).setPublicKeyHex(H), I.setPrivateKeyHex(T), I.isPublic = !1, I
            }
            if (-1 != t.indexOf("-END DSA PRIVATE KEY-") && -1 != t.indexOf("4,ENCRYPTED")) return F = s(r = l.getDecryptedKeyHex(t, e), 0, [1], "02"), x = s(r, 0, [2], "02"), b = s(r, 0, [3], "02"), w = s(r, 0, [4], "02"), A = s(r, 0, [5], "02"), (T = new h).setPrivate(new E(F, 16), new E(x, 16), new E(b, 16), new E(w, 16), new E(A, 16)), T;
            if (-1 != t.indexOf("-END ENCRYPTED PRIVATE KEY-")) return l.getKeyFromEncryptedPKCS8PEM(t, e);
            throw "not supported argument"
        }, qt.generateKeypair = function(t, e) {
            if ("RSA" == t) {
                var i = e;
                (a = new at).generate(i, "10001"), a.isPrivate = !0, a.isPublic = !0;
                var r = new at,
                    n = a.n.toString(16),
                    s = a.e.toString(16);
                return r.setPublic(n, s), r.isPrivate = !1, r.isPublic = !0, (o = {}).prvKeyObj = a, o.pubKeyObj = r, o
            }
            if ("EC" == t) {
                var a, o, h = e,
                    u = new ft.crypto.ECDSA({
                        curve: h
                    }).generateKeyPairHex();
                return (a = new ft.crypto.ECDSA({
                    curve: h
                })).setPublicKeyHex(u.ecpubhex), a.setPrivateKeyHex(u.ecprvhex), a.isPrivate = !0, a.isPublic = !1, (r = new ft.crypto.ECDSA({
                    curve: h
                })).setPublicKeyHex(u.ecpubhex), r.isPrivate = !1, r.isPublic = !0, (o = {}).prvKeyObj = a, o.pubKeyObj = r, o
            }
            throw "unknown algorithm: " + t
        }, qt.getPEM = function(t, e, i, r, n, s) {
            var a = ft,
                o = a.asn1,
                h = o.DERObjectIdentifier,
                u = o.DERInteger,
                c = o.ASN1Util.newObject,
                l = o.x509.SubjectPublicKeyInfo,
                f = a.crypto,
                d = f.DSA,
                g = f.ECDSA,
                p = at;

            function v(t) {
                return c({
                    seq: [{
                        int: 0
                    }, {
                        int: {
                            bigint: t.n
                        }
                    }, {
                        int: t.e
                    }, {
                        int: {
                            bigint: t.d
                        }
                    }, {
                        int: {
                            bigint: t.p
                        }
                    }, {
                        int: {
                            bigint: t.q
                        }
                    }, {
                        int: {
                            bigint: t.dmp1
                        }
                    }, {
                        int: {
                            bigint: t.dmq1
                        }
                    }, {
                        int: {
                            bigint: t.coeff
                        }
                    }]
                })
            }

            function m(t) {
                return c({
                    seq: [{
                        int: 1
                    }, {
                        octstr: {
                            hex: t.prvKeyHex
                        }
                    }, {
                        tag: ["a0", !0, {
                            oid: {
                                name: t.curveName
                            }
                        }]
                    }, {
                        tag: ["a1", !0, {
                            bitstr: {
                                hex: "00" + t.pubKeyHex
                            }
                        }]
                    }]
                })
            }

            function S(t) {
                return c({
                    seq: [{
                        int: 0
                    }, {
                        int: {
                            bigint: t.p
                        }
                    }, {
                        int: {
                            bigint: t.q
                        }
                    }, {
                        int: {
                            bigint: t.g
                        }
                    }, {
                        int: {
                            bigint: t.y
                        }
                    }, {
                        int: {
                            bigint: t.x
                        }
                    }]
                })
            }
            if ((void 0 !== p && t instanceof p || void 0 !== d && t instanceof d || void 0 !== g && t instanceof g) && 1 == t.isPublic && (void 0 === e || "PKCS8PUB" == e)) return Ht(E = new l(t).getEncodedHex(), "PUBLIC KEY");
            if ("PKCS1PRV" == e && void 0 !== p && t instanceof p && (void 0 === i || null == i) && 1 == t.isPrivate) return Ht(E = v(t).getEncodedHex(), "RSA PRIVATE KEY");
            if ("PKCS1PRV" == e && void 0 !== g && t instanceof g && (void 0 === i || null == i) && 1 == t.isPrivate) {
                var F = new h({
                        name: t.curveName
                    }).getEncodedHex(),
                    x = m(t).getEncodedHex(),
                    b = "";
                return (b += Ht(F, "EC PARAMETERS")) + Ht(x, "EC PRIVATE KEY")
            }
            if ("PKCS1PRV" == e && void 0 !== d && t instanceof d && (void 0 === i || null == i) && 1 == t.isPrivate) return Ht(E = S(t).getEncodedHex(), "DSA PRIVATE KEY");
            if ("PKCS5PRV" == e && void 0 !== p && t instanceof p && void 0 !== i && null != i && 1 == t.isPrivate) {
                var E = v(t).getEncodedHex();
                return void 0 === r && (r = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", E, i, r, s)
            }
            if ("PKCS5PRV" == e && void 0 !== g && t instanceof g && void 0 !== i && null != i && 1 == t.isPrivate) return E = m(t).getEncodedHex(), void 0 === r && (r = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", E, i, r, s);
            if ("PKCS5PRV" == e && void 0 !== d && t instanceof d && void 0 !== i && null != i && 1 == t.isPrivate) return E = S(t).getEncodedHex(), void 0 === r && (r = "DES-EDE3-CBC"), this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", E, i, r, s);
            var w = function(t, e) {
                    var i = A(t, e);
                    return new c({
                        seq: [{
                            seq: [{
                                oid: {
                                    name: "pkcs5PBES2"
                                }
                            }, {
                                seq: [{
                                    seq: [{
                                        oid: {
                                            name: "pkcs5PBKDF2"
                                        }
                                    }, {
                                        seq: [{
                                            octstr: {
                                                hex: i.pbkdf2Salt
                                            }
                                        }, {
                                            int: i.pbkdf2Iter
                                        }]
                                    }]
                                }, {
                                    seq: [{
                                        oid: {
                                            name: "des-EDE3-CBC"
                                        }
                                    }, {
                                        octstr: {
                                            hex: i.encryptionSchemeIV
                                        }
                                    }]
                                }]
                            }]
                        }, {
                            octstr: {
                                hex: i.ciphertext
                            }
                        }]
                    }).getEncodedHex()
                },
                A = function(t, e) {
                    var i = y.lib.WordArray.random(8),
                        r = y.lib.WordArray.random(8),
                        n = y.PBKDF2(e, i, {
                            keySize: 6,
                            iterations: 100
                        }),
                        s = y.enc.Hex.parse(t),
                        a = y.TripleDES.encrypt(s, n, {
                            iv: r
                        }) + "",
                        o = {};
                    return o.ciphertext = a, o.pbkdf2Salt = y.enc.Hex.stringify(i), o.pbkdf2Iter = 100, o.encryptionSchemeAlg = "DES-EDE3-CBC", o.encryptionSchemeIV = y.enc.Hex.stringify(r), o
                };
            if ("PKCS8PRV" == e && null != p && t instanceof p && 1 == t.isPrivate) {
                var C = v(t).getEncodedHex();
                return E = c({
                    seq: [{
                        int: 0
                    }, {
                        seq: [{
                            oid: {
                                name: "rsaEncryption"
                            }
                        }, {
                            null: !0
                        }]
                    }, {
                        octstr: {
                            hex: C
                        }
                    }]
                }).getEncodedHex(), void 0 === i || null == i ? Ht(E, "PRIVATE KEY") : Ht(x = w(E, i), "ENCRYPTED PRIVATE KEY")
            }
            if ("PKCS8PRV" == e && void 0 !== g && t instanceof g && 1 == t.isPrivate) return C = new c({
                seq: [{
                    int: 1
                }, {
                    octstr: {
                        hex: t.prvKeyHex
                    }
                }, {
                    tag: ["a1", !0, {
                        bitstr: {
                            hex: "00" + t.pubKeyHex
                        }
                    }]
                }]
            }).getEncodedHex(), E = c({
                seq: [{
                    int: 0
                }, {
                    seq: [{
                        oid: {
                            name: "ecPublicKey"
                        }
                    }, {
                        oid: {
                            name: t.curveName
                        }
                    }]
                }, {
                    octstr: {
                        hex: C
                    }
                }]
            }).getEncodedHex(), void 0 === i || null == i ? Ht(E, "PRIVATE KEY") : Ht(x = w(E, i), "ENCRYPTED PRIVATE KEY");
            if ("PKCS8PRV" == e && void 0 !== d && t instanceof d && 1 == t.isPrivate) return C = new u({
                bigint: t.x
            }).getEncodedHex(), E = c({
                seq: [{
                    int: 0
                }, {
                    seq: [{
                        oid: {
                            name: "dsa"
                        }
                    }, {
                        seq: [{
                            int: {
                                bigint: t.p
                            }
                        }, {
                            int: {
                                bigint: t.q
                            }
                        }, {
                            int: {
                                bigint: t.g
                            }
                        }]
                    }]
                }, {
                    octstr: {
                        hex: C
                    }
                }]
            }).getEncodedHex(), void 0 === i || null == i ? Ht(E, "PRIVATE KEY") : Ht(x = w(E, i), "ENCRYPTED PRIVATE KEY");
            throw "unsupported object nor format"
        }, qt.getKeyFromCSRPEM = function(t) {
            var e = Pt(t, "CERTIFICATE REQUEST");
            return qt.getKeyFromCSRHex(e)
        }, qt.getKeyFromCSRHex = function(t) {
            var e = qt.parseCSRHex(t);
            return qt.getKey(e.p8pubkeyhex, null, "pkcs8pub")
        }, qt.parseCSRHex = function(t) {
            var e = pt,
                i = e.getChildIdx,
                r = e.getTLV,
                n = {},
                s = t;
            if ("30" != s.substr(0, 2)) throw "malformed CSR(code:001)";
            var a = i(s, 0);
            if (a.length < 1) throw "malformed CSR(code:002)";
            if ("30" != s.substr(a[0], 2)) throw "malformed CSR(code:003)";
            var o = i(s, a[0]);
            if (o.length < 3) throw "malformed CSR(code:004)";
            return n.p8pubkeyhex = r(s, o[2]), n
        }, qt.getJWKFromKey = function(t) {
            var e = {};
            if (t instanceof at && t.isPrivate) return e.kty = "RSA", e.n = bt(t.n.toString(16)), e.e = bt(t.e.toString(16)), e.d = bt(t.d.toString(16)), e.p = bt(t.p.toString(16)), e.q = bt(t.q.toString(16)), e.dp = bt(t.dmp1.toString(16)), e.dq = bt(t.dmq1.toString(16)), e.qi = bt(t.coeff.toString(16)), e;
            if (t instanceof at && t.isPublic) return e.kty = "RSA", e.n = bt(t.n.toString(16)), e.e = bt(t.e.toString(16)), e;
            if (t instanceof ft.crypto.ECDSA && t.isPrivate) {
                if ("P-256" !== (r = t.getShortNISTPCurveName()) && "P-384" !== r) throw "unsupported curve name for JWT: " + r;
                var i = t.getPublicKeyXYHex();
                return e.kty = "EC", e.crv = r, e.x = bt(i.x), e.y = bt(i.y), e.d = bt(t.prvKeyHex), e
            }
            if (t instanceof ft.crypto.ECDSA && t.isPublic) {
                var r;
                if ("P-256" !== (r = t.getShortNISTPCurveName()) && "P-384" !== r) throw "unsupported curve name for JWT: " + r;
                return i = t.getPublicKeyXYHex(), e.kty = "EC", e.crv = r, e.x = bt(i.x), e.y = bt(i.y), e
            }
            throw "not supported key object"
        }, at.getPosArrayOfChildrenFromHex = function(t) {
            return pt.getChildIdx(t, 0)
        }, at.getHexValueArrayOfChildrenFromHex = function(t) {
            var e, i = pt.getV,
                r = i(t, (e = at.getPosArrayOfChildrenFromHex(t))[0]),
                n = i(t, e[1]),
                s = i(t, e[2]),
                a = i(t, e[3]),
                o = i(t, e[4]),
                h = i(t, e[5]),
                u = i(t, e[6]),
                c = i(t, e[7]),
                l = i(t, e[8]);
            return (e = new Array).push(r, n, s, a, o, h, u, c, l), e
        }, at.prototype.readPrivateKeyFromPEMString = function(t) {
            var e = Pt(t),
                i = at.getHexValueArrayOfChildrenFromHex(e);
            this.setPrivateEx(i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8])
        }, at.prototype.readPKCS5PrvKeyHex = function(t) {
            var e = at.getHexValueArrayOfChildrenFromHex(t);
            this.setPrivateEx(e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
        }, at.prototype.readPKCS8PrvKeyHex = function(t) {
            var e, i, r, n, s, a, o, h, u = pt,
                c = u.getVbyList;
            if (!1 === u.isASN1HEX(t)) throw "not ASN.1 hex string";
            try {
                e = c(t, 0, [2, 0, 1], "02"), i = c(t, 0, [2, 0, 2], "02"), r = c(t, 0, [2, 0, 3], "02"), n = c(t, 0, [2, 0, 4], "02"), s = c(t, 0, [2, 0, 5], "02"), a = c(t, 0, [2, 0, 6], "02"), o = c(t, 0, [2, 0, 7], "02"), h = c(t, 0, [2, 0, 8], "02")
            } catch (g) {
                throw "malformed PKCS#8 plain RSA private key"
            }
            this.setPrivateEx(e, i, r, n, s, a, o, h)
        }, at.prototype.readPKCS5PubKeyHex = function(t) {
            var e = pt,
                i = e.getV;
            if (!1 === e.isASN1HEX(t)) throw "keyHex is not ASN.1 hex string";
            var r = e.getChildIdx(t, 0);
            if (2 !== r.length || "02" !== t.substr(r[0], 2) || "02" !== t.substr(r[1], 2)) throw "wrong hex for PKCS#5 public key";
            var n = i(t, r[0]),
                s = i(t, r[1]);
            this.setPublic(n, s)
        }, at.prototype.readPKCS8PubKeyHex = function(t) {
            var e = pt;
            if (!1 === e.isASN1HEX(t)) throw "not ASN.1 hex string";
            if ("06092a864886f70d010101" !== e.getTLVbyList(t, 0, [0, 0])) throw "not PKCS8 RSA public key";
            var i = e.getTLVbyList(t, 0, [1, 0]);
            this.readPKCS5PubKeyHex(i)
        }, at.prototype.readCertPubKeyHex = function(t, e) {
            var i, r;
            (i = new Gt).readCertHex(t), r = i.getPublicKeyHex(), this.readPKCS8PubKeyHex(r)
        };
        var _t = new RegExp("");

        function zt(t, e) {
            for (var i = "", r = e / 4 - t.length, n = 0; n < r; n++) i += "0";
            return i + t
        }

        function Wt(t, e, i) {
            for (var r = "", n = 0; r.length < e;) r += Ct(i(Dt(t + String.fromCharCode.apply(String, [(4278190080 & n) >> 24, (16711680 & n) >> 16, (65280 & n) >> 8, 255 & n])))), n += 1;
            return r
        }

        function Jt(t) {
            for (var e in ft.crypto.Util.DIGESTINFOHEAD) {
                var i = ft.crypto.Util.DIGESTINFOHEAD[e],
                    r = i.length;
                if (t.substring(0, r) == i) return [e, t.substring(r)]
            }
            return []
        }

        function Gt() {
            var t = pt,
                e = t.getChildIdx,
                i = t.getV,
                r = t.getTLV,
                n = t.getVbyList,
                s = t.getTLVbyList,
                a = t.getIdxbyList,
                o = t.getVidx,
                h = t.oidname,
                c = Gt,
                l = Pt;
            this.hex = null, this.version = 0, this.foffset = 0, this.aExtInfo = null, this.getVersion = function() {
                return null === this.hex || 0 !== this.version ? this.version : "a003020102" !== s(this.hex, 0, [0, 0]) ? (this.version = 1, this.foffset = -1, 1) : (this.version = 3, 3)
            }, this.getSerialNumberHex = function() {
                return n(this.hex, 0, [0, 1 + this.foffset], "02")
            }, this.getSignatureAlgorithmField = function() {
                return h(n(this.hex, 0, [0, 2 + this.foffset, 0], "06"))
            }, this.getIssuerHex = function() {
                return s(this.hex, 0, [0, 3 + this.foffset], "30")
            }, this.getIssuerString = function() {
                return c.hex2dn(this.getIssuerHex())
            }, this.getSubjectHex = function() {
                return s(this.hex, 0, [0, 5 + this.foffset], "30")
            }, this.getSubjectString = function() {
                return c.hex2dn(this.getSubjectHex())
            }, this.getNotBefore = function() {
                var t = n(this.hex, 0, [0, 4 + this.foffset, 0]);
                return t = t.replace(/(..)/g, "%$1"), decodeURIComponent(t)
            }, this.getNotAfter = function() {
                var t = n(this.hex, 0, [0, 4 + this.foffset, 1]);
                return t = t.replace(/(..)/g, "%$1"), decodeURIComponent(t)
            }, this.getPublicKeyHex = function() {
                return t.getTLVbyList(this.hex, 0, [0, 6 + this.foffset], "30")
            }, this.getPublicKeyIdx = function() {
                return a(this.hex, 0, [0, 6 + this.foffset], "30")
            }, this.getPublicKeyContentIdx = function() {
                var t = this.getPublicKeyIdx();
                return a(this.hex, t, [1, 0], "30")
            }, this.getPublicKey = function() {
                return qt.getKey(this.getPublicKeyHex(), null, "pkcs8pub")
            }, this.getSignatureAlgorithmName = function() {
                return h(n(this.hex, 0, [1, 0], "06"))
            }, this.getSignatureValueHex = function() {
                return n(this.hex, 0, [2], "03", !0)
            }, this.verifySignature = function(t) {
                var e = this.getSignatureAlgorithmName(),
                    i = this.getSignatureValueHex(),
                    r = s(this.hex, 0, [0], "30"),
                    n = new ft.crypto.Signature({
                        alg: e
                    });
                return n.init(t), n.updateHex(r), n.verify(i)
            }, this.parseExt = function() {
                if (3 !== this.version) return -1;
                var i = a(this.hex, 0, [0, 7, 0], "30"),
                    r = e(this.hex, i);
                this.aExtInfo = new Array;
                for (var s = 0; s < r.length; s++) {
                    var h = {
                            critical: !1
                        },
                        u = 0;
                    3 === e(this.hex, r[s]).length && (h.critical = !0, u = 1), h.oid = t.hextooidstr(n(this.hex, r[s], [0], "06"));
                    var c = a(this.hex, r[s], [1 + u]);
                    h.vidx = o(this.hex, c), this.aExtInfo.push(h)
                }
            }, this.getExtInfo = function(t) {
                var e = this.aExtInfo,
                    i = t;
                if (t.match(/^[0-9.]+$/) || (i = ft.asn1.x509.OID.name2oid(t)), "" !== i)
                    for (var r = 0; r < e.length; r++)
                        if (e[r].oid === i) return e[r]
            }, this.getExtBasicConstraints = function() {
                var t = this.getExtInfo("basicConstraints");
                if (void 0 === t) return t;
                var e = i(this.hex, t.vidx);
                if ("" === e) return {};
                if ("0101ff" === e) return {
                    cA: !0
                };
                if ("0101ff02" === e.substr(0, 8)) {
                    var r = i(e, 6);
                    return {
                        cA: !0,
                        pathLen: parseInt(r, 16)
                    }
                }
                throw "basicConstraints parse error"
            }, this.getExtKeyUsageBin = function() {
                var t = this.getExtInfo("keyUsage");
                if (void 0 === t) return "";
                var e = i(this.hex, t.vidx);
                if (e.length % 2 != 0 || e.length <= 2) throw "malformed key usage value";
                var r = parseInt(e.substr(0, 2)),
                    n = parseInt(e.substr(2), 16).toString(2);
                return n.substr(0, n.length - r)
            }, this.getExtKeyUsageString = function() {
                for (var t = this.getExtKeyUsageBin(), e = new Array, i = 0; i < t.length; i++) "1" == t.substr(i, 1) && e.push(Gt.KEYUSAGE_NAME[i]);
                return e.join(",")
            }, this.getExtSubjectKeyIdentifier = function() {
                var t = this.getExtInfo("subjectKeyIdentifier");
                return void 0 === t ? t : i(this.hex, t.vidx)
            }, this.getExtAuthorityKeyIdentifier = function() {
                var t = this.getExtInfo("authorityKeyIdentifier");
                if (void 0 === t) return t;
                for (var n = {}, s = r(this.hex, t.vidx), a = e(s, 0), o = 0; o < a.length; o++) "80" === s.substr(a[o], 2) && (n.kid = i(s, a[o]));
                return n
            }, this.getExtExtKeyUsageName = function() {
                var t = this.getExtInfo("extKeyUsage");
                if (void 0 === t) return t;
                var n = new Array,
                    s = r(this.hex, t.vidx);
                if ("" === s) return n;
                for (var a = e(s, 0), o = 0; o < a.length; o++) n.push(h(i(s, a[o])));
                return n
            }, this.getExtSubjectAltName = function() {
                for (var t = this.getExtSubjectAltName2(), e = new Array, i = 0; i < t.length; i++) "DNS" === t[i][0] && e.push(t[i][1]);
                return e
            }, this.getExtSubjectAltName2 = function() {
                var t, n, s, a = this.getExtInfo("subjectAltName");
                if (void 0 === a) return a;
                for (var o = new Array, h = r(this.hex, a.vidx), u = e(h, 0), c = 0; c < u.length; c++) s = h.substr(u[c], 2), t = i(h, u[c]), "81" === s && (n = At(t), o.push(["MAIL", n])), "82" === s && (n = At(t), o.push(["DNS", n])), "84" === s && (n = Gt.hex2dn(t, 0), o.push(["DN", n])), "86" === s && (n = At(t), o.push(["URI", n])), "87" === s && (n = Kt(t), o.push(["IP", n]));
                return o
            }, this.getExtCRLDistributionPointsURI = function() {
                var t = this.getExtInfo("cRLDistributionPoints");
                if (void 0 === t) return t;
                for (var i = new Array, r = e(this.hex, t.vidx), s = 0; s < r.length; s++) try {
                    var a = At(n(this.hex, r[s], [0, 0, 0], "86"));
                    i.push(a)
                } catch (o) {}
                return i
            }, this.getExtAIAInfo = function() {
                var t = this.getExtInfo("authorityInfoAccess");
                if (void 0 === t) return t;
                for (var i = {
                        ocsp: [],
                        caissuer: []
                    }, r = e(this.hex, t.vidx), s = 0; s < r.length; s++) {
                    var a = n(this.hex, r[s], [0], "06"),
                        o = n(this.hex, r[s], [1], "86");
                    "2b06010505073001" === a && i.ocsp.push(At(o)), "2b06010505073002" === a && i.caissuer.push(At(o))
                }
                return i
            }, this.getExtCertificatePolicies = function() {
                var t = this.getExtInfo("certificatePolicies");
                if (void 0 === t) return t;
                for (var s = r(this.hex, t.vidx), a = [], o = e(s, 0), u = 0; u < o.length; u++) {
                    var c = {},
                        l = e(s, o[u]);
                    if (c.id = h(i(s, l[0])), 2 === l.length)
                        for (var f = e(s, l[1]), d = 0; d < f.length; d++) {
                            var g = n(s, f[d], [0], "06");
                            "2b06010505070201" === g ? c.cps = At(n(s, f[d], [1])) : "2b06010505070202" === g && (c.unotice = At(n(s, f[d], [1, 0])))
                        }
                    a.push(c)
                }
                return a
            }, this.readCertPEM = function(t) {
                this.readCertHex(l(t))
            }, this.readCertHex = function(t) {
                this.hex = t, this.getVersion();
                try {
                    a(this.hex, 0, [0, 7], "a3"), this.parseExt()
                } catch (u) {}
            }, this.getInfo = function() {
                var t, e, i;
                if (t = "Basic Fields\n", t += "  serial number: " + this.getSerialNumberHex() + "\n", t += "  signature algorithm: " + this.getSignatureAlgorithmField() + "\n", t += "  issuer: " + this.getIssuerString() + "\n", t += "  notBefore: " + this.getNotBefore() + "\n", t += "  notAfter: " + this.getNotAfter() + "\n", t += "  subject: " + this.getSubjectString() + "\n", t += "  subject public key info: \n", t += "    key algorithm: " + (e = this.getPublicKey()).type + "\n", "RSA" === e.type && (t += "    n=" + Mt(e.n.toString(16)).substr(0, 16) + "...\n", t += "    e=" + Mt(e.e.toString(16)) + "\n"), null != (i = this.aExtInfo)) {
                    t += "X509v3 Extensions:\n";
                    for (var r = 0; r < i.length; r++) {
                        var n = i[r],
                            s = ft.asn1.x509.OID.oid2name(n.oid);
                        "" === s && (s = n.oid);
                        var a = "";
                        if (!0 === n.critical && (a = "CRITICAL"), t += "  " + s + " " + a + ":\n", "basicConstraints" === s) {
                            var o = this.getExtBasicConstraints();
                            void 0 === o.cA ? t += "    {}\n" : (t += "    cA=true", void 0 !== o.pathLen && (t += ", pathLen=" + o.pathLen), t += "\n")
                        } else if ("keyUsage" === s) t += "    " + this.getExtKeyUsageString() + "\n";
                        else if ("subjectKeyIdentifier" === s) t += "    " + this.getExtSubjectKeyIdentifier() + "\n";
                        else if ("authorityKeyIdentifier" === s) {
                            var h = this.getExtAuthorityKeyIdentifier();
                            void 0 !== h.kid && (t += "    kid=" + h.kid + "\n")
                        } else if ("extKeyUsage" === s) t += "    " + this.getExtExtKeyUsageName().join(", ") + "\n";
                        else if ("subjectAltName" === s) t += "    " + this.getExtSubjectAltName2() + "\n";
                        else if ("cRLDistributionPoints" === s) t += "    " + this.getExtCRLDistributionPointsURI() + "\n";
                        else if ("authorityInfoAccess" === s) {
                            var u = this.getExtAIAInfo();
                            void 0 !== u.ocsp && (t += "    ocsp: " + u.ocsp.join(",") + "\n"), void 0 !== u.caissuer && (t += "    caissuer: " + u.caissuer.join(",") + "\n")
                        } else if ("certificatePolicies" === s)
                            for (var c = this.getExtCertificatePolicies(), l = 0; l < c.length; l++) void 0 !== c[l].id && (t += "    policy oid: " + c[l].id + "\n"), void 0 !== c[l].cps && (t += "    cps: " + c[l].cps + "\n")
                    }
                }
                return (t += "signature algorithm: " + this.getSignatureAlgorithmName() + "\n") + "signature: " + this.getSignatureValueHex().substr(0, 16) + "...\n"
            }
        }
        _t.compile("[^0-9a-f]", "gi"), at.prototype.sign = function(t, e) {
            var i, r = (i = t, ft.crypto.Util.hashString(i, e));
            return this.signWithMessageHash(r, e)
        }, at.prototype.signWithMessageHash = function(t, e) {
            var i = nt(ft.crypto.Util.getPaddedDigestInfoHex(t, e, this.n.bitLength()), 16);
            return zt(this.doPrivate(i).toString(16), this.n.bitLength())
        }, at.prototype.signPSS = function(t, e, i) {
            var r, n = (r = Dt(t), ft.crypto.Util.hashHex(r, e));
            return void 0 === i && (i = -1), this.signWithMessageHashPSS(n, e, i)
        }, at.prototype.signWithMessageHashPSS = function(t, e, i) {
            var r, n = Ct(t),
                s = n.length,
                a = this.n.bitLength() - 1,
                o = Math.ceil(a / 8),
                h = function(t) {
                    return ft.crypto.Util.hashHex(t, e)
                };
            if (-1 === i || void 0 === i) i = s;
            else if (-2 === i) i = o - s - 2;
            else if (i < -2) throw "invalid salt length";
            if (o < s + i + 2) throw "data too long";
            var u = "";
            i > 0 && (u = new Array(i), (new rt).nextBytes(u), u = String.fromCharCode.apply(String, u));
            var c = Ct(h(Dt("\0\0\0\0\0\0\0\0" + n + u))),
                l = [];
            for (r = 0; r < o - i - s - 2; r += 1) l[r] = 0;
            var f = String.fromCharCode.apply(String, l) + "\x01" + u,
                d = Wt(c, f.length, h),
                g = [];
            for (r = 0; r < f.length; r += 1) g[r] = f.charCodeAt(r) ^ d.charCodeAt(r);
            var p = 65280 >> 8 * o - a & 255;
            for (g[0] &= ~p, r = 0; r < s; r++) g.push(c.charCodeAt(r));
            return g.push(188), zt(this.doPrivate(new E(g)).toString(16), this.n.bitLength())
        }, at.prototype.verify = function(t, e) {
            var i = nt(e = (e = e.replace(_t, "")).replace(/[ \n]+/g, ""), 16);
            if (i.bitLength() > this.n.bitLength()) return 0;
            var r = Jt(this.doPublic(i).toString(16).replace(/^1f+00/, ""));
            if (0 == r.length) return !1;
            var n, s = r[0];
            return r[1] == (n = t, ft.crypto.Util.hashString(n, s))
        }, at.prototype.verifyWithMessageHash = function(t, e) {
            var i = nt(e = (e = e.replace(_t, "")).replace(/[ \n]+/g, ""), 16);
            if (i.bitLength() > this.n.bitLength()) return 0;
            var r = Jt(this.doPublic(i).toString(16).replace(/^1f+00/, ""));
            return 0 != r.length && (r[0], r[1] == t)
        }, at.prototype.verifyPSS = function(t, e, i, r) {
            var n, s = (n = Dt(t), ft.crypto.Util.hashHex(n, i));
            return void 0 === r && (r = -1), this.verifyWithMessageHashPSS(s, e, i, r)
        }, at.prototype.verifyWithMessageHashPSS = function(t, e, i, r) {
            var n = new E(e, 16);
            if (n.bitLength() > this.n.bitLength()) return !1;
            var s, a = function(t) {
                    return ft.crypto.Util.hashHex(t, i)
                },
                o = Ct(t),
                h = o.length,
                u = this.n.bitLength() - 1,
                c = Math.ceil(u / 8);
            if (-1 === r || void 0 === r) r = h;
            else if (-2 === r) r = c - h - 2;
            else if (r < -2) throw "invalid salt length";
            if (c < h + r + 2) throw "data too long";
            var l = this.doPublic(n).toByteArray();
            for (s = 0; s < l.length; s += 1) l[s] &= 255;
            for (; l.length < c;) l.unshift(0);
            if (188 !== l[c - 1]) throw "encoded message does not end in 0xbc";
            var f = (l = String.fromCharCode.apply(String, l)).substr(0, c - h - 1),
                d = l.substr(f.length, h),
                g = 65280 >> 8 * c - u & 255;
            if (0 != (f.charCodeAt(0) & g)) throw "bits beyond keysize not zero";
            var p = Wt(d, f.length, a),
                y = [];
            for (s = 0; s < f.length; s += 1) y[s] = f.charCodeAt(s) ^ p.charCodeAt(s);
            y[0] &= ~g;
            var v = c - h - r - 2;
            for (s = 0; s < v; s += 1)
                if (0 !== y[s]) throw "leftmost octets not zero";
            if (1 !== y[v]) throw "0x01 marker not found";
            return d === Ct(a(Dt("\0\0\0\0\0\0\0\0" + o + String.fromCharCode.apply(String, y.slice(-r)))))
        }, at.SALT_LEN_HLEN = -1, at.SALT_LEN_MAX = -2, at.SALT_LEN_RECOVER = -2, Gt.hex2dn = function(t, e) {
            if (void 0 === e && (e = 0), "30" !== t.substr(e, 2)) throw "malformed DN";
            for (var i = new Array, r = pt.getChildIdx(t, e), n = 0; n < r.length; n++) i.push(Gt.hex2rdn(t, r[n]));
            return "/" + (i = i.map(function(t) {
                return t.replace("/", "\\/")
            })).join("/")
        }, Gt.hex2rdn = function(t, e) {
            if (void 0 === e && (e = 0), "31" !== t.substr(e, 2)) throw "malformed RDN";
            for (var i = new Array, r = pt.getChildIdx(t, e), n = 0; n < r.length; n++) i.push(Gt.hex2attrTypeValue(t, r[n]));
            return (i = i.map(function(t) {
                return t.replace("+", "\\+")
            })).join("+")
        }, Gt.hex2attrTypeValue = function(t, e) {
            var i = pt,
                r = i.getV;
            if (void 0 === e && (e = 0), "30" !== t.substr(e, 2)) throw "malformed attribute type and value";
            var n = i.getChildIdx(t, e);
            2 !== n.length || t.substr(n[0], 2);
            var s = r(t, n[0]),
                a = ft.asn1.ASN1Util.oidHexToInt(s);
            return ft.asn1.x509.OID.oid2atype(a) + "=" + Ct(r(t, n[1]))
        }, Gt.getPublicKeyFromCertHex = function(t) {
            var e = new Gt;
            return e.readCertHex(t), e.getPublicKey()
        }, Gt.getPublicKeyFromCertPEM = function(t) {
            var e = new Gt;
            return e.readCertPEM(t), e.getPublicKey()
        }, Gt.getPublicKeyInfoPropOfCertPEM = function(t) {
            var e, i, r = pt.getVbyList,
                n = {
                    algparam: null
                };
            return (e = new Gt).readCertPEM(t), i = e.getPublicKeyHex(), n.keyhex = r(i, 0, [1], "03").substr(2), n.algoid = r(i, 0, [0, 0], "06"), "2a8648ce3d0201" === n.algoid && (n.algparam = r(i, 0, [0, 1], "06")), n
        }, Gt.KEYUSAGE_NAME = ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment", "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly"], void 0 !== ft && ft || (ft = {}), void 0 !== ft.jws && ft.jws || (ft.jws = {}), ft.jws.JWS = function() {
            var t = ft.jws.JWS.isSafeJSONString;
            this.parseJWS = function(e, i) {
                if (void 0 === this.parsedJWS || !i && void 0 === this.parsedJWS.sigvalH) {
                    var r = e.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);
                    if (null == r) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
                    var n = r[1],
                        s = r[2],
                        a = r[3],
                        o = n + "." + s;
                    if (this.parsedJWS = {}, this.parsedJWS.headB64U = n, this.parsedJWS.payloadB64U = s, this.parsedJWS.sigvalB64U = a, this.parsedJWS.si = o, !i) {
                        var h = Et(a),
                            u = nt(h, 16);
                        this.parsedJWS.sigvalH = h, this.parsedJWS.sigvalBI = u
                    }
                    var c = gt(n),
                        l = gt(s);
                    if (this.parsedJWS.headS = c, this.parsedJWS.payloadS = l, !t(c, this.parsedJWS, "headP")) throw "malformed JSON string for JWS Head: " + c
                }
            }
        }, ft.jws.JWS.sign = function(t, e, i, r, n) {
            var s, a, o, h = ft,
                u = h.jws.JWS,
                c = u.readSafeJSONString,
                l = u.isSafeJSONString,
                f = h.crypto,
                d = (f.ECDSA, f.Mac),
                g = f.Signature,
                p = JSON;
            if ("string" != typeof e && "object" != typeof e) throw "spHeader must be JSON string or object: " + e;
            if ("object" == typeof e && (a = e, s = p.stringify(a)), "string" == typeof e) {
                if (!l(s = e)) throw "JWS Head is not safe JSON string: " + s;
                a = c(s)
            }
            if (o = i, "object" == typeof i && (o = p.stringify(i)), "" != t && null != t || void 0 === a.alg || (t = a.alg), "" != t && null != t && void 0 === a.alg && (a.alg = t, s = p.stringify(a)), t !== a.alg) throw "alg and sHeader.alg doesn't match: " + t + "!=" + a.alg;
            var y = null;
            if (void 0 === u.jwsalg2sigalg[t]) throw "unsupported alg name: " + t;
            y = u.jwsalg2sigalg[t];
            var v = dt(s) + "." + dt(o),
                m = "";
            if ("Hmac" == y.substr(0, 4)) {
                if (void 0 === r) throw "mac key shall be specified for HS* alg";
                var S = new d({
                    alg: y,
                    prov: "cryptojs",
                    pass: r
                });
                S.updateString(v), m = S.doFinal()
            } else {
                var F; - 1 != y.indexOf("withECDSA") ? ((F = new g({
                    alg: y
                })).init(r, n), F.updateString(v), hASN1Sig = F.sign(), m = ft.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig)) : "none" != y && ((F = new g({
                    alg: y
                })).init(r, n), F.updateString(v), m = F.sign())
            }
            return v + "." + bt(m)
        }, ft.jws.JWS.verify = function(t, e, i) {
            var r, n = ft,
                s = n.jws.JWS,
                a = s.readSafeJSONString,
                o = n.crypto,
                h = o.ECDSA,
                u = o.Mac,
                c = o.Signature;
            r = at;
            var l = t.split(".");
            if (3 !== l.length) return !1;
            var f, d = l[0] + "." + l[1],
                g = Et(l[2]),
                p = a(gt(l[0])),
                y = null;
            if (void 0 === p.alg) throw "algorithm not specified in header";
            if (f = (y = p.alg).substr(0, 2), null != i && "[object Array]" === Object.prototype.toString.call(i) && i.length > 0 && -1 == (":" + i.join(":") + ":").indexOf(":" + y + ":")) throw "algorithm '" + y + "' not accepted in the list";
            if ("none" != y && null === e) throw "key shall be specified to verify.";
            if ("string" == typeof e && -1 != e.indexOf("-----BEGIN ") && (e = qt.getKey(e)), !("RS" != f && "PS" != f || e instanceof r)) throw "key shall be a RSAKey obj for RS* and PS* algs";
            if ("ES" == f && !(e instanceof h)) throw "key shall be a ECDSA obj for ES* algs";
            var v = null;
            if (void 0 === s.jwsalg2sigalg[p.alg]) throw "unsupported alg name: " + y;
            if ("none" == (v = s.jwsalg2sigalg[y])) throw "not supported";
            if ("Hmac" == v.substr(0, 4)) {
                if (void 0 === e) throw "hexadecimal key shall be specified for HMAC";
                var m = new u({
                    alg: v,
                    pass: e
                });
                return m.updateString(d), g == m.doFinal()
            }
            if (-1 != v.indexOf("withECDSA")) {
                var S, F = null;
                try {
                    F = h.concatSigToASN1Sig(g)
                } catch (x) {
                    return !1
                }
                return (S = new c({
                    alg: v
                })).init(e), S.updateString(d), S.verify(F)
            }
            return (S = new c({
                alg: v
            })).init(e), S.updateString(d), S.verify(g)
        }, ft.jws.JWS.parse = function(t) {
            var e, i, r, n = t.split("."),
                s = {};
            if (2 != n.length && 3 != n.length) throw "malformed sJWS: wrong number of '.' splitted elements";
            return e = n[0], i = n[1], 3 == n.length && (r = n[2]), s.headerObj = ft.jws.JWS.readSafeJSONString(gt(e)), s.payloadObj = ft.jws.JWS.readSafeJSONString(gt(i)), s.headerPP = JSON.stringify(s.headerObj, null, "  "), null == s.payloadObj ? s.payloadPP = gt(i) : s.payloadPP = JSON.stringify(s.payloadObj, null, "  "), void 0 !== r && (s.sigHex = Et(r)), s
        }, ft.jws.JWS.verifyJWT = function(t, e, i) {
            var r = ft.jws,
                n = r.JWS,
                s = n.readSafeJSONString,
                a = n.inArray,
                o = n.includedArray,
                h = t.split("."),
                u = h[0],
                c = h[1],
                l = (Et(h[2]), s(gt(u))),
                f = s(gt(c));
            if (void 0 === l.alg) return !1;
            if (void 0 === i.alg) throw "acceptField.alg shall be specified";
            if (!a(l.alg, i.alg)) return !1;
            if (void 0 !== f.iss && "object" == typeof i.iss && !a(f.iss, i.iss)) return !1;
            if (void 0 !== f.sub && "object" == typeof i.sub && !a(f.sub, i.sub)) return !1;
            if (void 0 !== f.aud && "object" == typeof i.aud)
                if ("string" == typeof f.aud) {
                    if (!a(f.aud, i.aud)) return !1
                } else if ("object" == typeof f.aud && !o(f.aud, i.aud)) return !1;
            var d = r.IntDate.getNow();
            return void 0 !== i.verifyAt && "number" == typeof i.verifyAt && (d = i.verifyAt), void 0 !== i.gracePeriod && "number" == typeof i.gracePeriod || (i.gracePeriod = 0), !(void 0 !== f.exp && "number" == typeof f.exp && f.exp + i.gracePeriod < d || void 0 !== f.nbf && "number" == typeof f.nbf && d < f.nbf - i.gracePeriod || void 0 !== f.iat && "number" == typeof f.iat && d < f.iat - i.gracePeriod || void 0 !== f.jti && void 0 !== i.jti && f.jti !== i.jti || !n.verify(t, e, i.alg))
        }, ft.jws.JWS.includedArray = function(t, e) {
            var i = ft.jws.JWS.inArray;
            if (null === t) return !1;
            if ("object" != typeof t) return !1;
            if ("number" != typeof t.length) return !1;
            for (var r = 0; r < t.length; r++)
                if (!i(t[r], e)) return !1;
            return !0
        }, ft.jws.JWS.inArray = function(t, e) {
            if (null === e) return !1;
            if ("object" != typeof e) return !1;
            if ("number" != typeof e.length) return !1;
            for (var i = 0; i < e.length; i++)
                if (e[i] == t) return !0;
            return !1
        }, ft.jws.JWS.jwsalg2sigalg = {
            HS256: "HmacSHA256",
            HS384: "HmacSHA384",
            HS512: "HmacSHA512",
            RS256: "SHA256withRSA",
            RS384: "SHA384withRSA",
            RS512: "SHA512withRSA",
            ES256: "SHA256withECDSA",
            ES384: "SHA384withECDSA",
            PS256: "SHA256withRSAandMGF1",
            PS384: "SHA384withRSAandMGF1",
            PS512: "SHA512withRSAandMGF1",
            none: "none"
        }, ft.jws.JWS.isSafeJSONString = function(t, e, i) {
            var r = null;
            try {
                return "object" != typeof(r = lt(t)) ? 0 : r.constructor === Array ? 0 : (e && (e[i] = r), 1)
            } catch (s) {
                return 0
            }
        }, ft.jws.JWS.readSafeJSONString = function(t) {
            var e = null;
            try {
                return "object" != typeof(e = lt(t)) ? null : e.constructor === Array ? null : e
            } catch (s) {
                return null
            }
        }, ft.jws.JWS.getEncodedSignatureValueFromJWS = function(t) {
            var e = t.match(/^[^.]+\.[^.]+\.([^.]+)$/);
            if (null == e) throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
            return e[1]
        }, ft.jws.JWS.getJWKthumbprint = function(t) {
            if ("RSA" !== t.kty && "EC" !== t.kty && "oct" !== t.kty) throw "unsupported algorithm for JWK Thumprint";
            var e = "{";
            if ("RSA" === t.kty) {
                if ("string" != typeof t.n || "string" != typeof t.e) throw "wrong n and e value for RSA key";
                e += '"e":"' + t.e + '",', e += '"kty":"' + t.kty + '",', e += '"n":"' + t.n + '"}'
            } else if ("EC" === t.kty) {
                if ("string" != typeof t.crv || "string" != typeof t.x || "string" != typeof t.y) throw "wrong crv, x and y value for EC key";
                e += '"crv":"' + t.crv + '",', e += '"kty":"' + t.kty + '",', e += '"x":"' + t.x + '",', e += '"y":"' + t.y + '"}'
            } else if ("oct" === t.kty) {
                if ("string" != typeof t.k) throw "wrong k value for oct(symmetric) key";
                e += '"kty":"' + t.kty + '",', e += '"k":"' + t.k + '"}'
            }
            var i = Dt(e);
            return bt(ft.crypto.Util.hashHex(i, "sha256"))
        }, ft.jws.IntDate = {}, ft.jws.IntDate.get = function(t) {
            var e = ft.jws.IntDate,
                i = e.getNow,
                r = e.getZulu;
            if ("now" == t) return i();
            if ("now + 1hour" == t) return i() + 3600;
            if ("now + 1day" == t) return i() + 86400;
            if ("now + 1month" == t) return i() + 2592e3;
            if ("now + 1year" == t) return i() + 31536e3;
            if (t.match(/Z$/)) return r(t);
            if (t.match(/^[0-9]+$/)) return parseInt(t);
            throw "unsupported format: " + t
        }, ft.jws.IntDate.getZulu = function(t) {
            return Nt(t)
        }, ft.jws.IntDate.getNow = function() {
            return ~~(new Date / 1e3)
        }, ft.jws.IntDate.intDate2UTCString = function(t) {
            return new Date(1e3 * t).toUTCString()
        }, ft.jws.IntDate.intDate2Zulu = function(t) {
            var e = new Date(1e3 * t);
            return ("0000" + e.getUTCFullYear()).slice(-4) + ("00" + (e.getUTCMonth() + 1)).slice(-2) + ("00" + e.getUTCDate()).slice(-2) + ("00" + e.getUTCHours()).slice(-2) + ("00" + e.getUTCMinutes()).slice(-2) + ("00" + e.getUTCSeconds()).slice(-2) + "Z"
        }, void 0 !== ft && ft || (ft = {}), void 0 !== ft.jws && ft.jws || (ft.jws = {}), ft.jws.JWSJS = function() {
            var t = ft.jws.JWS,
                e = t.readSafeJSONString;
            this.aHeader = [], this.sPayload = "", this.aSignature = [], this.init = function() {
                this.aHeader = [], this.sPayload = void 0, this.aSignature = []
            }, this.initWithJWS = function(t) {
                this.init();
                var e = t.split(".");
                if (3 != e.length) throw "malformed input JWS";
                this.aHeader.push(e[0]), this.sPayload = e[1], this.aSignature.push(e[2])
            }, this.addSignature = function(t, e, i, r) {
                if (void 0 === this.sPayload || null === this.sPayload) throw "there's no JSON-JS signature to add.";
                var n = this.aHeader.length;
                if (this.aHeader.length != this.aSignature.length) throw "aHeader.length != aSignature.length";
                try {
                    var s = ft.jws.JWS.sign(t, e, this.sPayload, i, r).split(".");
                    s[0], s[2], this.aHeader.push(s[0]), this.aSignature.push(s[2])
                } catch (g) {
                    throw this.aHeader.length > n && this.aHeader.pop(), this.aSignature.length > n && this.aSignature.pop(), "addSignature failed: " + g
                }
            }, this.verifyAll = function(t) {
                if (this.aHeader.length !== t.length || this.aSignature.length !== t.length) return !1;
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (2 !== i.length) return !1;
                    if (!1 === this.verifyNth(e, i[0], i[1])) return !1
                }
                return !0
            }, this.verifyNth = function(e, i, r) {
                if (this.aHeader.length <= e || this.aSignature.length <= e) return !1;
                var n = this.aHeader[e],
                    s = this.aSignature[e],
                    a = n + "." + this.sPayload + "." + s,
                    o = !1;
                try {
                    o = t.verify(a, i, r)
                } catch (g) {
                    return !1
                }
                return o
            }, this.readJWSJS = function(t) {
                if ("string" == typeof t) {
                    var i = e(t);
                    if (null == i) throw "argument is not safe JSON object string";
                    this.aHeader = i.headers, this.sPayload = i.payload, this.aSignature = i.signatures
                } else try {
                    if (!(t.headers.length > 0)) throw "malformed header";
                    if (this.aHeader = t.headers, "string" != typeof t.payload) throw "malformed signatures";
                    if (this.sPayload = t.payload, !(t.signatures.length > 0)) throw "malformed signatures";
                    this.aSignatures = t.signatures
                } catch (n) {
                    throw "malformed JWS-JS JSON object: " + n
                }
            }, this.getJSON = function() {
                return {
                    headers: this.aHeader,
                    payload: this.sPayload,
                    signatures: this.aSignature
                }
            }, this.isEmpty = function() {
                return 0 == this.aHeader.length ? 1 : 0
            }
        }, d.SecureRandom = rt, d.rng_seed_time = $, d.BigInteger = E, d.RSAKey = at, d.ECDSA = ft.crypto.ECDSA, d.DSA = ft.crypto.DSA, d.Signature = ft.crypto.Signature, d.MessageDigest = ft.crypto.MessageDigest, d.Mac = ft.crypto.Mac, d.Cipher = ft.crypto.Cipher, d.KEYUTIL = qt, d.ASN1HEX = pt, d.X509 = Gt, d.CryptoJS = y, d.b64tohex = x, d.b64toBA = b, d.stoBA = yt, d.BAtos = vt, d.BAtohex = mt, d.stohex = St, d.stob64 = function(t) {
            return F(St(t))
        }, d.stob64u = function(t) {
            return Ft(F(St(t)))
        }, d.b64utos = function(t) {
            return vt(b(xt(t)))
        }, d.b64tob64u = Ft, d.b64utob64 = xt, d.hex2b64 = F, d.hextob64u = bt, d.b64utohex = Et, d.utf8tob64u = dt, d.b64utoutf8 = gt, d.utf8tob64 = function(t) {
            return F(jt(kt(t)))
        }, d.b64toutf8 = function(t) {
            return decodeURIComponent(Ot(x(t)))
        }, d.utf8tohex = wt, d.hextoutf8 = At, d.hextorstr = Ct, d.rstrtohex = Dt, d.hextob64 = It, d.hextob64nl = Tt, d.b64nltohex = Bt, d.hextopem = Ht, d.pemtohex = Pt, d.hextoArrayBuffer = function(t) {
            if (t.length % 2 != 0) throw "input is not even length";
            if (null == t.match(/^[0-9A-Fa-f]+$/)) throw "input is not hexadecimal";
            for (var e = new ArrayBuffer(t.length / 2), i = new DataView(e), r = 0; r < t.length / 2; r++) i.setUint8(r, parseInt(t.substr(2 * r, 2), 16));
            return e
        }, d.ArrayBuffertohex = function(t) {
            for (var e = "", i = new DataView(t), r = 0; r < t.byteLength; r++) e += ("00" + i.getUint8(r).toString(16)).slice(-2);
            return e
        }, d.zulutomsec = Rt, d.zulutosec = Nt, d.zulutodate = function(t) {
            return new Date(Rt(t))
        }, d.datetozulu = function(t, e, i) {
            var r, n = t.getUTCFullYear();
            if (e) {
                if (n < 1950 || 2049 < n) throw "not proper year for UTCTime: " + n;
                r = ("" + n).slice(-2)
            } else r = ("000" + n).slice(-4);
            if (r += ("0" + (t.getUTCMonth() + 1)).slice(-2), r += ("0" + t.getUTCDate()).slice(-2), r += ("0" + t.getUTCHours()).slice(-2), r += ("0" + t.getUTCMinutes()).slice(-2), r += ("0" + t.getUTCSeconds()).slice(-2), i) {
                var s = t.getUTCMilliseconds();
                0 !== s && (r += "." + (s = (s = ("00" + s).slice(-3)).replace(/0+$/g, "")))
            }
            return r + "Z"
        }, d.uricmptohex = jt, d.hextouricmp = Ot, d.ipv6tohex = Vt, d.hextoipv6 = Lt, d.hextoip = Kt, d.iptohex = function(t) {
            var e = "malformed IP address";
            if (!(t = t.toLowerCase(t)).match(/^[0-9.]+$/)) {
                if (t.match(/^[0-9a-f:]+$/) && -1 !== t.indexOf(":")) return Vt(t);
                throw e
            }
            var i = t.split(".");
            if (4 !== i.length) throw e;
            var r = "";
            try {
                for (var n = 0; n < 4; n++) r += ("0" + parseInt(i[n]).toString(16)).slice(-2);
                return r
            } catch (f) {
                throw e
            }
        }, d.encodeURIComponentAll = kt, d.newline_toUnix = function(t) {
            return t.replace(/\r\n/gm, "\n")
        }, d.newline_toDos = function(t) {
            return (t = t.replace(/\r\n/gm, "\n")).replace(/\n/gm, "\r\n")
        }, d.hextoposhex = Mt, d.intarystrtohex = Ut, d.strdiffidx = function(t, e) {
            var i = t.length;
            t.length > e.length && (i = e.length);
            for (var r = 0; r < i; r++)
                if (t.charCodeAt(r) != e.charCodeAt(r)) return r;
            return t.length != e.length ? i : -1
        }, d.KJUR = ft, d.crypto = ft.crypto, d.asn1 = ft.asn1, d.jws = ft.jws, d.lang = ft.lang
    }).call(this, i({}).Buffer);
    var g = function(t) {
        t = t || 21;
        for (var e = ""; t--;) e += "sOwnPropMN49CEiq-hXvHJdSymlFURTag61GQfuD8YIWz2Zk5xKB7LV30_Abject" [64 * Math.random() | 0];
        return e
    };

    function p(t, e, i) {
        if (!i.includes(typeof t) || null === t) throw new Error(`Field ${e} should be of type ${i}`)
    }
    var y = {
        valString: function(t, e) {
            p(t, e, ["string"])
        },
        valObject: function(t, e) {
            p(t, e, ["object"])
        },
        valNumber: function(t, e) {
            p(t, e, ["number"])
        },
        valStringOrObject: function(t, e) {
            p(t, e, ["string", "object"])
        }
    };
    const {
        valStringOrObject: v,
        valString: m,
        valObject: S,
        valNumber: F
    } = y, x = "RS256";

    function b(t, e, i, r, n, s) {
        S(e, "payload"), S(i, "header"), F(r, "exp");
        var a = Math.ceil((new Date).getTime() / 1e3),
            o = a + r;
        const h = Object.assign(i, {
                typ: "JWT",
                alg: n,
                kid: s
            }),
            u = Object.assign(e, {
                iat: a - 5,
                nbf: a - 5,
                exp: o,
                jti: g()
            }),
            c = JSON.stringify(h),
            l = JSON.stringify(u);
        return d.jws.JWS.sign(n, c, l, t)
    }

    function E(t = "", e = {}, i = {}, r = 600, n = x) {
        try {
            return v(t, "jwk"), b(d.KEYUTIL.getKey(t), e, i, r, n, t.kid)
        } catch (s) {
            const t = "string" == typeof s ? s : s.message;
            throw new Error(`[jwtSign] ${t}`)
        }
    }
    return {
        default: t,
        pkceChallenge: function() {
            const t = d.crypto.Util.getRandomHexOfNbytes(32),
                e = d.hextob64u(t),
                i = d.crypto.Util.hashString(e, "sha256");
            return {
                code_verifier: e,
                code_challenge: d.hextob64u(i),
                code_challenge_method: "S256"
            }
        },
        createJws: b,
        jwtSign: E,
        jwtVerify: function(t, e, i = x) {
            try {
                m(t, "jwt"), m(e, "pubkey");
                const n = d.KEYUTIL.getKey(e);
                if (!d.jws.JWS.verifyJWT(t, n, {
                        alg: [i],
                        gracePeriod: 5
                    })) throw new Error("Invalid JWT");
                const s = d.jws.JWS.parse(t);
                return {
                    header: s.headerObj,
                    payload: s.payloadObj
                }
            } catch (r) {
                const t = "string" == typeof r ? r : r.message;
                throw new Error(`[jwtVerify] ${t}`)
            }
        },
        sha256: function(t) {
            return d.crypto.Util.hashString(t, "sha256")
        },
        clientAssertPrivateKey: function(t, e, i, r = 600, n = x) {
            return E(t, {
                sub: e,
                iss: e,
                aud: i
            }, {}, r, n)
        },
        clientAssertSecret: function(t, e, i, r = 600, n = "HS256") {
            try {
                return m(t, "secret"), b(t, {
                    sub: e,
                    iss: e,
                    aud: i
                }, {}, r, n)
            } catch (s) {
                throw new Error(`[clientAssertSecret] ${s.message}`)
            }
        },
        rs: d
    }
});