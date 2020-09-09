
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/mutable-forward-iterator.js';
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

/**
 * @example
 * var array = [0, 1, 2, 3, 4];
 * var iterator = new cc.js.array.MutableForwardIterator(array);
 * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
 *     var item = array[iterator.i];
 *     ...
 * }
 */
function MutableForwardIterator(array) {
  this.i = 0;
  this.array = array;
}

var proto = MutableForwardIterator.prototype;

proto.remove = function (value) {
  var index = this.array.indexOf(value);

  if (index >= 0) {
    this.removeAt(index);
  }
};

proto.removeAt = function (i) {
  this.array.splice(i, 1);

  if (i <= this.i) {
    --this.i;
  }
};

proto.fastRemove = function (value) {
  var index = this.array.indexOf(value);

  if (index >= 0) {
    this.fastRemoveAt(index);
  }
};

proto.fastRemoveAt = function (i) {
  var array = this.array;
  array[i] = array[array.length - 1];
  --array.length;

  if (i <= this.i) {
    --this.i;
  }
};

proto.push = function (item) {
  this.array.push(item);
}; //js.getset(proto, 'length',
//    function () {
//        return this.array.length;
//    },
//    function (len) {
//        this.array.length = len;
//        if (this.i >= len) {
//            this.i = len - 1;
//        }
//    }
//);


module.exports = MutableForwardIterator;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL211dGFibGUtZm9yd2FyZC1pdGVyYXRvci5qcyJdLCJuYW1lcyI6WyJNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yIiwiYXJyYXkiLCJpIiwicHJvdG8iLCJwcm90b3R5cGUiLCJyZW1vdmUiLCJ2YWx1ZSIsImluZGV4IiwiaW5kZXhPZiIsInJlbW92ZUF0Iiwic3BsaWNlIiwiZmFzdFJlbW92ZSIsImZhc3RSZW1vdmVBdCIsImxlbmd0aCIsInB1c2giLCJpdGVtIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7O0FBU0EsU0FBU0Esc0JBQVQsQ0FBaUNDLEtBQWpDLEVBQXdDO0FBQ3BDLE9BQUtDLENBQUwsR0FBUyxDQUFUO0FBQ0EsT0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7O0FBRUQsSUFBSUUsS0FBSyxHQUFHSCxzQkFBc0IsQ0FBQ0ksU0FBbkM7O0FBRUFELEtBQUssQ0FBQ0UsTUFBTixHQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDNUIsTUFBSUMsS0FBSyxHQUFHLEtBQUtOLEtBQUwsQ0FBV08sT0FBWCxDQUFtQkYsS0FBbkIsQ0FBWjs7QUFDQSxNQUFJQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaLFNBQUtFLFFBQUwsQ0FBY0YsS0FBZDtBQUNIO0FBQ0osQ0FMRDs7QUFNQUosS0FBSyxDQUFDTSxRQUFOLEdBQWlCLFVBQVVQLENBQVYsRUFBYTtBQUMxQixPQUFLRCxLQUFMLENBQVdTLE1BQVgsQ0FBa0JSLENBQWxCLEVBQXFCLENBQXJCOztBQUVBLE1BQUlBLENBQUMsSUFBSSxLQUFLQSxDQUFkLEVBQWlCO0FBQ2IsTUFBRSxLQUFLQSxDQUFQO0FBQ0g7QUFDSixDQU5EOztBQU9BQyxLQUFLLENBQUNRLFVBQU4sR0FBbUIsVUFBVUwsS0FBVixFQUFpQjtBQUNoQyxNQUFJQyxLQUFLLEdBQUcsS0FBS04sS0FBTCxDQUFXTyxPQUFYLENBQW1CRixLQUFuQixDQUFaOztBQUNBLE1BQUlDLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ1osU0FBS0ssWUFBTCxDQUFrQkwsS0FBbEI7QUFDSDtBQUNKLENBTEQ7O0FBTUFKLEtBQUssQ0FBQ1MsWUFBTixHQUFxQixVQUFVVixDQUFWLEVBQWE7QUFDOUIsTUFBSUQsS0FBSyxHQUFHLEtBQUtBLEtBQWpCO0FBQ0FBLEVBQUFBLEtBQUssQ0FBQ0MsQ0FBRCxDQUFMLEdBQVdELEtBQUssQ0FBQ0EsS0FBSyxDQUFDWSxNQUFOLEdBQWUsQ0FBaEIsQ0FBaEI7QUFDQSxJQUFFWixLQUFLLENBQUNZLE1BQVI7O0FBRUEsTUFBSVgsQ0FBQyxJQUFJLEtBQUtBLENBQWQsRUFBaUI7QUFDYixNQUFFLEtBQUtBLENBQVA7QUFDSDtBQUNKLENBUkQ7O0FBVUFDLEtBQUssQ0FBQ1csSUFBTixHQUFhLFVBQVVDLElBQVYsRUFBZ0I7QUFDekIsT0FBS2QsS0FBTCxDQUFXYSxJQUFYLENBQWdCQyxJQUFoQjtBQUNILENBRkQsRUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakIsc0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQGV4YW1wbGVcbiAqIHZhciBhcnJheSA9IFswLCAxLCAyLCAzLCA0XTtcbiAqIHZhciBpdGVyYXRvciA9IG5ldyBjYy5qcy5hcnJheS5NdXRhYmxlRm9yd2FyZEl0ZXJhdG9yKGFycmF5KTtcbiAqIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xuICogICAgIHZhciBpdGVtID0gYXJyYXlbaXRlcmF0b3IuaV07XG4gKiAgICAgLi4uXG4gKiB9XG4gKi9cbmZ1bmN0aW9uIE11dGFibGVGb3J3YXJkSXRlcmF0b3IgKGFycmF5KSB7XG4gICAgdGhpcy5pID0gMDtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5cbnZhciBwcm90byA9IE11dGFibGVGb3J3YXJkSXRlcmF0b3IucHJvdG90eXBlO1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFycmF5LmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQXQoaW5kZXgpO1xuICAgIH1cbn07XG5wcm90by5yZW1vdmVBdCA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdGhpcy5hcnJheS5zcGxpY2UoaSwgMSk7XG5cbiAgICBpZiAoaSA8PSB0aGlzLmkpIHtcbiAgICAgICAgLS10aGlzLmk7XG4gICAgfVxufTtcbnByb3RvLmZhc3RSZW1vdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFycmF5LmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuZmFzdFJlbW92ZUF0KGluZGV4KTtcbiAgICB9XG59O1xucHJvdG8uZmFzdFJlbW92ZUF0ID0gZnVuY3Rpb24gKGkpIHtcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xuICAgIGFycmF5W2ldID0gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgLS1hcnJheS5sZW5ndGg7XG5cbiAgICBpZiAoaSA8PSB0aGlzLmkpIHtcbiAgICAgICAgLS10aGlzLmk7XG4gICAgfVxufTtcblxucHJvdG8ucHVzaCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdGhpcy5hcnJheS5wdXNoKGl0ZW0pO1xufTtcblxuLy9qcy5nZXRzZXQocHJvdG8sICdsZW5ndGgnLFxuLy8gICAgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgIHJldHVybiB0aGlzLmFycmF5Lmxlbmd0aDtcbi8vICAgIH0sXG4vLyAgICBmdW5jdGlvbiAobGVuKSB7XG4vLyAgICAgICAgdGhpcy5hcnJheS5sZW5ndGggPSBsZW47XG4vLyAgICAgICAgaWYgKHRoaXMuaSA+PSBsZW4pIHtcbi8vICAgICAgICAgICAgdGhpcy5pID0gbGVuIC0gMTtcbi8vICAgICAgICB9XG4vLyAgICB9XG4vLyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXV0YWJsZUZvcndhcmRJdGVyYXRvcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9