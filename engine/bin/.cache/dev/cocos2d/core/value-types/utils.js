
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.equals = equals;
exports.approx = approx;
exports.clamp = clamp;
exports.clamp01 = clamp01;
exports.lerp = lerp;
exports.toRadian = toRadian;
exports.toDegree = toDegree;
exports.randomRange = randomRange;
exports.randomRangeInt = randomRangeInt;
exports.pseudoRandom = pseudoRandom;
exports.pseudoRandomRange = pseudoRandomRange;
exports.pseudoRandomRangeInt = pseudoRandomRangeInt;
exports.nextPow2 = nextPow2;
exports.repeat = repeat;
exports.pingPong = pingPong;
exports.inverseLerp = inverseLerp;
exports.sign = sign;
exports.random = exports.FLOAT_BYTES = exports.FLOAT_ARRAY_TYPE = exports.INT_MIN = exports.INT_MAX = exports.INT_BITS = exports.EPSILON = void 0;

/**
 * @ignore
 */
var _d2r = Math.PI / 180.0;
/**
 * @ignore
 */


var _r2d = 180.0 / Math.PI;
/**
 * @property {number} EPSILON
 */


var EPSILON = 0.000001; // Number of bits in an integer

exports.EPSILON = EPSILON;
var INT_BITS = 32;
exports.INT_BITS = INT_BITS;
var INT_MAX = 0x7fffffff;
exports.INT_MAX = INT_MAX;
var INT_MIN = -1 << INT_BITS - 1;
/**
 * Use single-precision floating point on native platforms to be compatible with native math libraries.
 * Double precision floating point is used on Web platforms and editors to reduce the overhead of type conversion.
 */

exports.INT_MIN = INT_MIN;
var FLOAT_ARRAY_TYPE = CC_JSB && CC_NATIVERENDERER ? Float32Array : Float64Array;
exports.FLOAT_ARRAY_TYPE = FLOAT_ARRAY_TYPE;
var FLOAT_BYTES = CC_JSB && CC_NATIVERENDERER ? 4 : 8;
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

exports.FLOAT_BYTES = FLOAT_BYTES;

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
/**
 * Tests whether or not the arguments have approximately the same value by given maxDiff
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @param {Number} maxDiff Maximum difference.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */


function approx(a, b, maxDiff) {
  maxDiff = maxDiff || EPSILON;
  return Math.abs(a - b) <= maxDiff;
}
/**
 * Clamps a value between a minimum float and maximum float value.
 *
 * @method clamp
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {number}
 */


function clamp(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
/**
 * Clamps a value between 0 and 1.
 *
 * @method clamp01
 * @param {number} val
 * @return {number}
 */


function clamp01(val) {
  return val < 0 ? 0 : val > 1 ? 1 : val;
}
/**
 * @method lerp
 * @param {number} from
 * @param {number} to
 * @param {number} ratio - the interpolation coefficient
 * @return {number}
 */


function lerp(from, to, ratio) {
  return from + (to - from) * ratio;
}
/**
* Convert Degree To Radian
*
* @param {Number} a Angle in Degrees
*/


function toRadian(a) {
  return a * _d2r;
}
/**
* Convert Radian To Degree
*
* @param {Number} a Angle in Radian
*/


function toDegree(a) {
  return a * _r2d;
}
/**
* @method random
*/


var random = Math.random;
/**
 * Returns a floating-point random number between min (inclusive) and max (exclusive).
 *
 * @method randomRange
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */

exports.random = random;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 *
 * @method randomRangeInt
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */


function randomRangeInt(min, max) {
  return Math.floor(randomRange(min, max));
}
/**
 * Linear congruential generator using Hull-Dobell Theorem.
 *
 * @method pseudoRandom
 * @param {number} seed the random seed
 * @return {number} the pseudo random
 */


function pseudoRandom(seed) {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280.0;
}
/**
 * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRange
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */


function pseudoRandomRange(seed, min, max) {
  return pseudoRandom(seed) * (max - min) + min;
}
/**
 * Returns a pseudo-random integer between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRangeInt
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */


function pseudoRandomRangeInt(seed, min, max) {
  return Math.floor(pseudoRandomRange(seed, min, max));
}
/**
 * Returns the next power of two for the value
 *
 * @method nextPow2
 * @param {number} val
 * @return {number} the the next power of two
 */


function nextPow2(val) {
  --val;
  val = val >> 1 | val;
  val = val >> 2 | val;
  val = val >> 4 | val;
  val = val >> 8 | val;
  val = val >> 16 | val;
  ++val;
  return val;
}
/**
 * Returns float remainder for t / length
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */


function repeat(t, length) {
  return t - Math.floor(t / length) * length;
}
/**
 * Returns time wrapped in ping-pong mode
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */


function pingPong(t, length) {
  t = repeat(t, length * 2);
  t = length - Math.abs(t - length);
  return t;
}
/**
 * Returns ratio of a value within a given range
 *
 * @method repeat
 * @param {number} from start value
 * @param {number} to end value
 * @param {number} value given value
 * @return {number} the ratio between [from,to]
 */


function inverseLerp(from, to, value) {
  return (value - from) / (to - from);
}
/**
 * Returns -1, 0, +1 depending on sign of x.
 * 
 * @method sign
 * @param {number} v
 */


function sign(v) {
  return (v > 0) - (v < 0);
}
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3V0aWxzLnRzIl0sIm5hbWVzIjpbIl9kMnIiLCJNYXRoIiwiUEkiLCJfcjJkIiwiRVBTSUxPTiIsIklOVF9CSVRTIiwiSU5UX01BWCIsIklOVF9NSU4iLCJGTE9BVF9BUlJBWV9UWVBFIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJGbG9hdDMyQXJyYXkiLCJGbG9hdDY0QXJyYXkiLCJGTE9BVF9CWVRFUyIsImVxdWFscyIsImEiLCJiIiwiYWJzIiwibWF4IiwiYXBwcm94IiwibWF4RGlmZiIsImNsYW1wIiwidmFsIiwibWluIiwiY2xhbXAwMSIsImxlcnAiLCJmcm9tIiwidG8iLCJyYXRpbyIsInRvUmFkaWFuIiwidG9EZWdyZWUiLCJyYW5kb20iLCJyYW5kb21SYW5nZSIsInJhbmRvbVJhbmdlSW50IiwiZmxvb3IiLCJwc2V1ZG9SYW5kb20iLCJzZWVkIiwicHNldWRvUmFuZG9tUmFuZ2UiLCJwc2V1ZG9SYW5kb21SYW5nZUludCIsIm5leHRQb3cyIiwicmVwZWF0IiwidCIsImxlbmd0aCIsInBpbmdQb25nIiwiaW52ZXJzZUxlcnAiLCJ2YWx1ZSIsInNpZ24iLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0EsSUFBTUEsSUFBSSxHQUFHQyxJQUFJLENBQUNDLEVBQUwsR0FBVSxLQUF2QjtBQUNBOzs7OztBQUdBLElBQU1DLElBQUksR0FBRyxRQUFRRixJQUFJLENBQUNDLEVBQTFCO0FBRUE7Ozs7O0FBR08sSUFBTUUsT0FBTyxHQUFHLFFBQWhCLEVBRVA7OztBQUNPLElBQU1DLFFBQVEsR0FBRyxFQUFqQjs7QUFDQSxJQUFNQyxPQUFPLEdBQUcsVUFBaEI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLENBQUMsQ0FBRCxJQUFPRixRQUFRLEdBQUcsQ0FBbEM7QUFFUDs7Ozs7O0FBSU8sSUFBTUcsZ0JBQWdCLEdBQUlDLE1B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RUFBMkJDLEVBQTNCLEVBQStCa0IsS0FBL0IsRUFBc0M7QUFDM0MsU0FBTyxDQUFDQSxLQUFLLEdBQUduQixJQUFULEtBQWtCQyxFQUFFLEdBQUdELElBQXZCLENBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1PLFNBQVNvQixJQUFULENBQWVDLENBQWYsRUFBa0I7QUFDdkIsU0FBTyxDQUFDQSxDQUFDLEdBQUcsQ0FBTCxLQUFXQSxDQUFDLEdBQUcsQ0FBZixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBpZ25vcmVcbiAqL1xuY29uc3QgX2QyciA9IE1hdGguUEkgLyAxODAuMDtcbi8qKlxuICogQGlnbm9yZVxuICovXG5jb25zdCBfcjJkID0gMTgwLjAgLyBNYXRoLlBJO1xuXG4vKipcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBFUFNJTE9OXG4gKi9cbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMC4wMDAwMDE7XG5cbi8vIE51bWJlciBvZiBiaXRzIGluIGFuIGludGVnZXJcbmV4cG9ydCBjb25zdCBJTlRfQklUUyA9IDMyO1xuZXhwb3J0IGNvbnN0IElOVF9NQVggPSAweDdmZmZmZmZmO1xuZXhwb3J0IGNvbnN0IElOVF9NSU4gPSAtMSA8PCAoSU5UX0JJVFMgLSAxKTtcblxuLyoqXG4gKiBVc2Ugc2luZ2xlLXByZWNpc2lvbiBmbG9hdGluZyBwb2ludCBvbiBuYXRpdmUgcGxhdGZvcm1zIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBuYXRpdmUgbWF0aCBsaWJyYXJpZXMuXG4gKiBEb3VibGUgcHJlY2lzaW9uIGZsb2F0aW5nIHBvaW50IGlzIHVzZWQgb24gV2ViIHBsYXRmb3JtcyBhbmQgZWRpdG9ycyB0byByZWR1Y2UgdGhlIG92ZXJoZWFkIG9mIHR5cGUgY29udmVyc2lvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IEZMT0FUX0FSUkFZX1RZUEUgPSAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSA/IEZsb2F0MzJBcnJheSA6IEZsb2F0NjRBcnJheTtcbmV4cG9ydCBjb25zdCBGTE9BVF9CWVRFUyA9IChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpID8gNCA6IDg7XG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzc1xuICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhKSwgTWF0aC5hYnMoYikpO1xufVxuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlIGJ5IGdpdmVuIG1heERpZmZcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgbnVtYmVyIHRvIHRlc3QuXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heERpZmYgTWF4aW11bSBkaWZmZXJlbmNlLlxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcHJveChhLCBiLCBtYXhEaWZmKSB7XG4gIG1heERpZmYgPSBtYXhEaWZmIHx8IEVQU0lMT047XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gbWF4RGlmZjtcbn1cblxuLyoqXG4gKiBDbGFtcHMgYSB2YWx1ZSBiZXR3ZWVuIGEgbWluaW11bSBmbG9hdCBhbmQgbWF4aW11bSBmbG9hdCB2YWx1ZS5cbiAqXG4gKiBAbWV0aG9kIGNsYW1wXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWwsIG1pbiwgbWF4KSB7XG4gIHJldHVybiB2YWwgPCBtaW4gPyBtaW4gOiB2YWwgPiBtYXggPyBtYXggOiB2YWw7XG59XG5cbi8qKlxuICogQ2xhbXBzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLlxuICpcbiAqIEBtZXRob2QgY2xhbXAwMVxuICogQHBhcmFtIHtudW1iZXJ9IHZhbFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAwMSh2YWwpIHtcbiAgcmV0dXJuIHZhbCA8IDAgPyAwIDogdmFsID4gMSA/IDEgOiB2YWw7XG59XG5cbi8qKlxuICogQG1ldGhvZCBsZXJwXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbVxuICogQHBhcmFtIHtudW1iZXJ9IHRvXG4gKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudFxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVycChmcm9tLCB0bywgcmF0aW8pIHtcbiAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHJhdGlvO1xufVxuXG4vKipcbiogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4qXG4qIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYSkge1xuICByZXR1cm4gYSAqIF9kMnI7XG59XG5cbi8qKlxuKiBDb252ZXJ0IFJhZGlhbiBUbyBEZWdyZWVcbipcbiogQHBhcmFtIHtOdW1iZXJ9IGEgQW5nbGUgaW4gUmFkaWFuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlKGEpIHtcbiAgcmV0dXJuIGEgKiBfcjJkO1xufVxuXG4vKipcbiogQG1ldGhvZCByYW5kb21cbiovXG5leHBvcnQgY29uc3QgcmFuZG9tID0gTWF0aC5yYW5kb207XG5cbi8qKlxuICogUmV0dXJucyBhIGZsb2F0aW5nLXBvaW50IHJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBAbWV0aG9kIHJhbmRvbVJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByYW5kb20gbnVtYmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21SYW5nZShtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiAoaW5jbHVzaXZlKSBhbmQgbWF4IChleGNsdXNpdmUpLlxuICpcbiAqIEBtZXRob2QgcmFuZG9tUmFuZ2VJbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJhbmRvbSBpbnRlZ2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21SYW5nZUludChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihyYW5kb21SYW5nZShtaW4sIG1heCkpO1xufVxuXG4vKipcbiAqIExpbmVhciBjb25ncnVlbnRpYWwgZ2VuZXJhdG9yIHVzaW5nIEh1bGwtRG9iZWxsIFRoZW9yZW0uXG4gKlxuICogQG1ldGhvZCBwc2V1ZG9SYW5kb21cbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWVkIHRoZSByYW5kb20gc2VlZFxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcHNldWRvIHJhbmRvbVxuICovXG5leHBvcnQgZnVuY3Rpb24gcHNldWRvUmFuZG9tKHNlZWQpIHtcbiAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcbiAgcmV0dXJuIHNlZWQgLyAyMzMyODAuMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZmxvYXRpbmctcG9pbnQgcHNldWRvLXJhbmRvbSBudW1iZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBAbWV0aG9kIHBzZXVkb1JhbmRvbVJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlZFxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmFuZG9tIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gcHNldWRvUmFuZG9tUmFuZ2Uoc2VlZCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHBzZXVkb1JhbmRvbShzZWVkKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBAbWV0aG9kIHBzZXVkb1JhbmRvbVJhbmdlSW50XG4gKiBAcGFyYW0ge251bWJlcn0gc2VlZFxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmFuZG9tIGludGVnZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBzZXVkb1JhbmRvbVJhbmdlSW50KHNlZWQsIG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKHBzZXVkb1JhbmRvbVJhbmdlKHNlZWQsIG1pbiwgbWF4KSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmV4dCBwb3dlciBvZiB0d28gZm9yIHRoZSB2YWx1ZVxuICpcbiAqIEBtZXRob2QgbmV4dFBvdzJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHRoZSBuZXh0IHBvd2VyIG9mIHR3b1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dFBvdzIodmFsKSB7XG4gIC0tdmFsO1xuICB2YWwgPSAodmFsID4+IDEpIHwgdmFsO1xuICB2YWwgPSAodmFsID4+IDIpIHwgdmFsO1xuICB2YWwgPSAodmFsID4+IDQpIHwgdmFsO1xuICB2YWwgPSAodmFsID4+IDgpIHwgdmFsO1xuICB2YWwgPSAodmFsID4+IDE2KSB8IHZhbDtcbiAgKyt2YWw7XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGZsb2F0IHJlbWFpbmRlciBmb3IgdCAvIGxlbmd0aFxuICpcbiAqIEBtZXRob2QgcmVwZWF0XG4gKiBAcGFyYW0ge251bWJlcn0gdCB0aW1lIHN0YXJ0IGF0IDBcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggdGltZSBvZiBvbmUgY3ljbGVcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHRpbWUgd3JhcHBlZCBpbiB0aGUgZmlyc3QgY3ljbGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdCh0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIHQgLSBNYXRoLmZsb29yKHQgLyBsZW5ndGgpICogbGVuZ3RoO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGltZSB3cmFwcGVkIGluIHBpbmctcG9uZyBtb2RlXG4gKlxuICogQG1ldGhvZCByZXBlYXRcbiAqIEBwYXJhbSB7bnVtYmVyfSB0IHRpbWUgc3RhcnQgYXQgMFxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCB0aW1lIG9mIG9uZSBjeWNsZVxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgdGltZSB3cmFwcGVkIGluIHRoZSBmaXJzdCBjeWNsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGluZ1BvbmcodCwgbGVuZ3RoKSB7XG4gIHQgPSByZXBlYXQodCwgbGVuZ3RoICogMik7XG4gIHQgPSBsZW5ndGggLSBNYXRoLmFicyh0IC0gbGVuZ3RoKTtcbiAgcmV0dXJuIHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyByYXRpbyBvZiBhIHZhbHVlIHdpdGhpbiBhIGdpdmVuIHJhbmdlXG4gKlxuICogQG1ldGhvZCByZXBlYXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tIHN0YXJ0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gdG8gZW5kIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgZ2l2ZW4gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJhdGlvIGJldHdlZW4gW2Zyb20sdG9dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlTGVycChmcm9tLCB0bywgdmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAtIGZyb20pIC8gKHRvIC0gZnJvbSk7XG59XG5cbi8qKlxuICogUmV0dXJucyAtMSwgMCwgKzEgZGVwZW5kaW5nIG9uIHNpZ24gb2YgeC5cbiAqIFxuICogQG1ldGhvZCBzaWduXG4gKiBAcGFyYW0ge251bWJlcn0gdlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2lnbiAodikge1xuICByZXR1cm4gKHYgPiAwKSAtICh2IDwgMCk7XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=