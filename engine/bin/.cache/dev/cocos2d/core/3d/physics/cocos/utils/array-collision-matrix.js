
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/utils/array-collision-matrix.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.ArrayCollisionMatrix = void 0;

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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

/**
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 */
var ArrayCollisionMatrix = /*#__PURE__*/function () {
  function ArrayCollisionMatrix() {
    this.matrix = [];
  }

  var _proto = ArrayCollisionMatrix.prototype;

  /**
   * !#en Get an element
   * @method get
   * @param  {Number} i
   * @param  {Number} j
   * @return {Number}
   */
  _proto.get = function get(i, j) {
    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    return this.matrix[(i * (i + 1) >> 1) + j - 1];
  }
  /**
   * !#en Set an element
   * @method set
   * @param {Number} i
   * @param {Number} j
   * @param {boolean} value
   */
  ;

  _proto.set = function set(i, j, value) {
    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    this.matrix[(i * (i + 1) >> 1) + j - 1] = value ? 1 : 0;
  }
  /**
   * !#en Sets all elements to zero
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    for (var i = 0, l = this.matrix.length; i !== l; i++) {
      this.matrix[i] = 0;
    }
  }
  /**
   * !#en Sets the max number of objects
   * @param {Number} n
   */
  ;

  _proto.setNumObjects = function setNumObjects(n) {
    this.matrix.length = n * (n - 1) >> 1;
  };

  return ArrayCollisionMatrix;
}();

exports.ArrayCollisionMatrix = ArrayCollisionMatrix;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY29jb3MvdXRpbHMvYXJyYXktY29sbGlzaW9uLW1hdHJpeC50cyJdLCJuYW1lcyI6WyJBcnJheUNvbGxpc2lvbk1hdHJpeCIsIm1hdHJpeCIsImdldCIsImkiLCJqIiwidGVtcCIsInNldCIsInZhbHVlIiwicmVzZXQiLCJsIiwibGVuZ3RoIiwic2V0TnVtT2JqZWN0cyIsIm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7O0lBR2FBOztTQU9GQyxTQUFtQjs7Ozs7QUFFMUI7Ozs7Ozs7U0FPT0MsTUFBUCxhQUFZQyxDQUFaLEVBQXVCQyxDQUF2QixFQUEwQztBQUN0QyxRQUFJQSxDQUFDLEdBQUdELENBQVIsRUFBVztBQUNQLFVBQU1FLElBQUksR0FBR0QsQ0FBYjtBQUNBQSxNQUFBQSxDQUFDLEdBQUdELENBQUo7QUFDQUEsTUFBQUEsQ0FBQyxHQUFHRSxJQUFKO0FBQ0g7O0FBQ0QsV0FBTyxLQUFLSixNQUFMLENBQVksQ0FBQ0UsQ0FBQyxJQUFJQSxDQUFDLEdBQUcsQ0FBUixDQUFELElBQWUsQ0FBaEIsSUFBcUJDLENBQXJCLEdBQXlCLENBQXJDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7U0FPT0UsTUFBUCxhQUFZSCxDQUFaLEVBQXVCQyxDQUF2QixFQUFrQ0csS0FBbEMsRUFBa0Q7QUFDOUMsUUFBSUgsQ0FBQyxHQUFHRCxDQUFSLEVBQVc7QUFDUCxVQUFNRSxJQUFJLEdBQUdELENBQWI7QUFDQUEsTUFBQUEsQ0FBQyxHQUFHRCxDQUFKO0FBQ0FBLE1BQUFBLENBQUMsR0FBR0UsSUFBSjtBQUNIOztBQUNELFNBQUtKLE1BQUwsQ0FBWSxDQUFDRSxDQUFDLElBQUlBLENBQUMsR0FBRyxDQUFSLENBQUQsSUFBZSxDQUFoQixJQUFxQkMsQ0FBckIsR0FBeUIsQ0FBckMsSUFBMENHLEtBQUssR0FBRyxDQUFILEdBQU8sQ0FBdEQ7QUFDSDtBQUVEOzs7Ozs7U0FJT0MsUUFBUCxpQkFBZ0I7QUFDWixTQUFLLElBQUlMLENBQUMsR0FBRyxDQUFSLEVBQVdNLENBQUMsR0FBRyxLQUFLUixNQUFMLENBQVlTLE1BQWhDLEVBQXdDUCxDQUFDLEtBQUtNLENBQTlDLEVBQWlETixDQUFDLEVBQWxELEVBQXNEO0FBQ2xELFdBQUtGLE1BQUwsQ0FBWUUsQ0FBWixJQUFpQixDQUFqQjtBQUNIO0FBQ0o7QUFFRDs7Ozs7O1NBSU9RLGdCQUFQLHVCQUFzQkMsQ0FBdEIsRUFBaUM7QUFDN0IsU0FBS1gsTUFBTCxDQUFZUyxNQUFaLEdBQXFCRSxDQUFDLElBQUlBLENBQUMsR0FBRyxDQUFSLENBQUQsSUFBZSxDQUFwQztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQ29sbGlzaW9uIFwibWF0cml4XCIuIEl0J3MgYWN0dWFsbHkgYSB0cmlhbmd1bGFyLXNoYXBlZCBhcnJheSBvZiB3aGV0aGVyIHR3byBib2RpZXMgYXJlIHRvdWNoaW5nIHRoaXMgc3RlcCwgZm9yIHJlZmVyZW5jZSBuZXh0IHN0ZXBcbiAqL1xuZXhwb3J0IGNsYXNzIEFycmF5Q29sbGlzaW9uTWF0cml4IHtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG1hdHJpeCBzdG9yYWdlXG4gICAgICogQHByb3BlcnR5IG1hdHJpeFxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwdWJsaWMgbWF0cml4OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYW4gZWxlbWVudFxuICAgICAqIEBtZXRob2QgZ2V0XG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgKGk6IG51bWJlciwgajogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKGogPiBpKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gajtcbiAgICAgICAgICAgIGogPSBpO1xuICAgICAgICAgICAgaSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWF0cml4WyhpICogKGkgKyAxKSA+PiAxKSArIGogLSAxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBhbiBlbGVtZW50XG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBqXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgKGk6IG51bWJlciwgajogbnVtYmVyLCB2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoaiA+IGkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBqO1xuICAgICAgICAgICAgaiA9IGk7XG4gICAgICAgICAgICBpID0gdGVtcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hdHJpeFsoaSAqIChpICsgMSkgPj4gMSkgKyBqIC0gMV0gPSB2YWx1ZSA/IDEgOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyBhbGwgZWxlbWVudHMgdG8gemVyb1xuICAgICAqIEBtZXRob2QgcmVzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzZXQgKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubWF0cml4Lmxlbmd0aDsgaSAhPT0gbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIG1heCBudW1iZXIgb2Ygb2JqZWN0c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICovXG4gICAgcHVibGljIHNldE51bU9iamVjdHMgKG46IG51bWJlcikge1xuICAgICAgICB0aGlzLm1hdHJpeC5sZW5ndGggPSBuICogKG4gLSAxKSA+PiAxO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=