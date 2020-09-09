
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/binary-search.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var EPSILON = 1e-6;
/**
 * Searches the entire sorted Array for an element and returns the index of the element.
 *
 * @method binarySearch
 * @param {number[]} array
 * @param {number} value
 * @return {number} The index of item in the sorted Array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of array's length.
 */
// function binarySearch (array, value) {
//     for (var l = 0, h = array.length - 1, m = h >>> 1;
//          l <= h;
//          m = (l + h) >>> 1
//     ) {
//         var test = array[m];
//         if (test > value) {
//             h = m - 1;
//         }
//         else if (test < value) {
//             l = m + 1;
//         }
//         else {
//             return m;
//         }
//     }
//     return ~l;
// }

/**
 * Searches the entire sorted Array for an element and returns the index of the element.
 * It accepts iteratee which is invoked for value and each element of array to compute their sort ranking.
 * The iteratee is invoked with one argument: (value).
 *
 * @method binarySearchBy
 * @param {number[]} array
 * @param {number} value
 * @param {function} iteratee - the iteratee invoked per element
 * @return {number} The index of item in the sorted Array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of array's length.
 */
// function binarySearchBy (array, value, iteratee) {
//     for (var l = 0, h = array.length - 1, m = h >>> 1;
//          l <= h;
//          m = (l + h) >>> 1
//     ) {
//         var test = iteratee(array[m]);
//         if (test > value) {
//             h = m - 1;
//         }
//         else if (test < value) {
//             l = m + 1;
//         }
//         else {
//             return m;
//         }
//     }
//     return ~l;
// }

function binarySearchEpsilon(array, value) {
  for (var l = 0, h = array.length - 1, m = h >>> 1; l <= h; m = l + h >>> 1) {
    var test = array[m];

    if (test > value + EPSILON) {
      h = m - 1;
    } else if (test < value - EPSILON) {
      l = m + 1;
    } else {
      return m;
    }
  }

  return ~l;
}

module.exports = {
  binarySearchEpsilon: binarySearchEpsilon
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2JpbmFyeS1zZWFyY2guanMiXSwibmFtZXMiOlsiRVBTSUxPTiIsImJpbmFyeVNlYXJjaEVwc2lsb24iLCJhcnJheSIsInZhbHVlIiwibCIsImgiLCJsZW5ndGgiLCJtIiwidGVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxPQUFPLEdBQUcsSUFBZDtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0MsbUJBQVQsQ0FBOEJDLEtBQTlCLEVBQXFDQyxLQUFyQyxFQUE0QztBQUN4QyxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR0gsS0FBSyxDQUFDSSxNQUFOLEdBQWUsQ0FBOUIsRUFBaUNDLENBQUMsR0FBR0YsQ0FBQyxLQUFLLENBQWhELEVBQ0tELENBQUMsSUFBSUMsQ0FEVixFQUVLRSxDQUFDLEdBQUlILENBQUMsR0FBR0MsQ0FBTCxLQUFZLENBRnJCLEVBR0U7QUFDRSxRQUFJRyxJQUFJLEdBQUdOLEtBQUssQ0FBQ0ssQ0FBRCxDQUFoQjs7QUFDQSxRQUFJQyxJQUFJLEdBQUdMLEtBQUssR0FBR0gsT0FBbkIsRUFBNEI7QUFDeEJLLE1BQUFBLENBQUMsR0FBR0UsQ0FBQyxHQUFHLENBQVI7QUFDSCxLQUZELE1BR0ssSUFBSUMsSUFBSSxHQUFHTCxLQUFLLEdBQUdILE9BQW5CLEVBQTRCO0FBQzdCSSxNQUFBQSxDQUFDLEdBQUdHLENBQUMsR0FBRyxDQUFSO0FBQ0gsS0FGSSxNQUdBO0FBQ0QsYUFBT0EsQ0FBUDtBQUNIO0FBQ0o7O0FBQ0QsU0FBTyxDQUFDSCxDQUFSO0FBQ0g7O0FBR0RLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiVCxFQUFBQSxtQkFBbUIsRUFBbkJBO0FBRGEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIEVQU0lMT04gPSAxZS02O1xuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBlbnRpcmUgc29ydGVkIEFycmF5IGZvciBhbiBlbGVtZW50IGFuZCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudC5cbiAqXG4gKiBAbWV0aG9kIGJpbmFyeVNlYXJjaFxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW5kZXggb2YgaXRlbSBpbiB0aGUgc29ydGVkIEFycmF5LCBpZiBpdGVtIGlzIGZvdW5kOyBvdGhlcndpc2UsIGEgbmVnYXRpdmUgbnVtYmVyIHRoYXQgaXMgdGhlIGJpdHdpc2UgY29tcGxlbWVudCBvZiB0aGUgaW5kZXggb2YgdGhlIG5leHQgZWxlbWVudCB0aGF0IGlzIGxhcmdlciB0aGFuIGl0ZW0gb3IsIGlmIHRoZXJlIGlzIG5vIGxhcmdlciBlbGVtZW50LCB0aGUgYml0d2lzZSBjb21wbGVtZW50IG9mIGFycmF5J3MgbGVuZ3RoLlxuICovXG4vLyBmdW5jdGlvbiBiaW5hcnlTZWFyY2ggKGFycmF5LCB2YWx1ZSkge1xuLy8gICAgIGZvciAodmFyIGwgPSAwLCBoID0gYXJyYXkubGVuZ3RoIC0gMSwgbSA9IGggPj4+IDE7XG4vLyAgICAgICAgICBsIDw9IGg7XG4vLyAgICAgICAgICBtID0gKGwgKyBoKSA+Pj4gMVxuLy8gICAgICkge1xuLy8gICAgICAgICB2YXIgdGVzdCA9IGFycmF5W21dO1xuLy8gICAgICAgICBpZiAodGVzdCA+IHZhbHVlKSB7XG4vLyAgICAgICAgICAgICBoID0gbSAtIDE7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZiAodGVzdCA8IHZhbHVlKSB7XG4vLyAgICAgICAgICAgICBsID0gbSArIDE7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gbTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICByZXR1cm4gfmw7XG4vLyB9XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIGVudGlyZSBzb3J0ZWQgQXJyYXkgZm9yIGFuIGVsZW1lbnQgYW5kIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICogSXQgYWNjZXB0cyBpdGVyYXRlZSB3aGljaCBpcyBpbnZva2VkIGZvciB2YWx1ZSBhbmQgZWFjaCBlbGVtZW50IG9mIGFycmF5IHRvIGNvbXB1dGUgdGhlaXIgc29ydCByYW5raW5nLlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ6ICh2YWx1ZSkuXG4gKlxuICogQG1ldGhvZCBiaW5hcnlTZWFyY2hCeVxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gaXRlcmF0ZWUgLSB0aGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgZWxlbWVudFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW5kZXggb2YgaXRlbSBpbiB0aGUgc29ydGVkIEFycmF5LCBpZiBpdGVtIGlzIGZvdW5kOyBvdGhlcndpc2UsIGEgbmVnYXRpdmUgbnVtYmVyIHRoYXQgaXMgdGhlIGJpdHdpc2UgY29tcGxlbWVudCBvZiB0aGUgaW5kZXggb2YgdGhlIG5leHQgZWxlbWVudCB0aGF0IGlzIGxhcmdlciB0aGFuIGl0ZW0gb3IsIGlmIHRoZXJlIGlzIG5vIGxhcmdlciBlbGVtZW50LCB0aGUgYml0d2lzZSBjb21wbGVtZW50IG9mIGFycmF5J3MgbGVuZ3RoLlxuICovXG4vLyBmdW5jdGlvbiBiaW5hcnlTZWFyY2hCeSAoYXJyYXksIHZhbHVlLCBpdGVyYXRlZSkge1xuLy8gICAgIGZvciAodmFyIGwgPSAwLCBoID0gYXJyYXkubGVuZ3RoIC0gMSwgbSA9IGggPj4+IDE7XG4vLyAgICAgICAgICBsIDw9IGg7XG4vLyAgICAgICAgICBtID0gKGwgKyBoKSA+Pj4gMVxuLy8gICAgICkge1xuLy8gICAgICAgICB2YXIgdGVzdCA9IGl0ZXJhdGVlKGFycmF5W21dKTtcbi8vICAgICAgICAgaWYgKHRlc3QgPiB2YWx1ZSkge1xuLy8gICAgICAgICAgICAgaCA9IG0gLSAxO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYgKHRlc3QgPCB2YWx1ZSkge1xuLy8gICAgICAgICAgICAgbCA9IG0gKyAxO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2Uge1xuLy8gICAgICAgICAgICAgcmV0dXJuIG07XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIH5sO1xuLy8gfVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2hFcHNpbG9uIChhcnJheSwgdmFsdWUpIHtcbiAgICBmb3IgKHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0gPSBoID4+PiAxO1xuICAgICAgICAgbCA8PSBoO1xuICAgICAgICAgbSA9IChsICsgaCkgPj4+IDFcbiAgICApIHtcbiAgICAgICAgdmFyIHRlc3QgPSBhcnJheVttXTtcbiAgICAgICAgaWYgKHRlc3QgPiB2YWx1ZSArIEVQU0lMT04pIHtcbiAgICAgICAgICAgIGggPSBtIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0IDwgdmFsdWUgLSBFUFNJTE9OKSB7XG4gICAgICAgICAgICBsID0gbSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gfmw7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYmluYXJ5U2VhcmNoRXBzaWxvblxufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9