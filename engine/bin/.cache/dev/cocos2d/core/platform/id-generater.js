
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/id-generater.js';
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
// ID generater for runtime
var NonUuidMark = '.';
/*
 * @param {string} [category] - You can specify a unique category to avoid id collision with other instance of IdGenerater
 */

function IdGenerater(category) {
  // init with a random id to emphasize that the returns id should not be stored in persistence data
  this.id = 0 | Math.random() * 998;
  this.prefix = category ? category + NonUuidMark : '';
}
/*
 * @method getNewId
 * @return {string}
 */


IdGenerater.prototype.getNewId = function () {
  return this.prefix + ++this.id;
};
/*
 * The global id generater might have a conflict problem once every 365 days,
 * if the game runs at 60 FPS and each frame 4760273 counts of new id are requested.
 */


IdGenerater.global = new IdGenerater('global');
module.exports = IdGenerater;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2lkLWdlbmVyYXRlci5qcyJdLCJuYW1lcyI6WyJOb25VdWlkTWFyayIsIklkR2VuZXJhdGVyIiwiY2F0ZWdvcnkiLCJpZCIsIk1hdGgiLCJyYW5kb20iLCJwcmVmaXgiLCJwcm90b3R5cGUiLCJnZXROZXdJZCIsImdsb2JhbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTtBQUVBLElBQUlBLFdBQVcsR0FBRyxHQUFsQjtBQUVBOzs7O0FBR0EsU0FBU0MsV0FBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDNUI7QUFDQSxPQUFLQyxFQUFMLEdBQVUsSUFBS0MsSUFBSSxDQUFDQyxNQUFMLEtBQWdCLEdBQS9CO0FBRUEsT0FBS0MsTUFBTCxHQUFjSixRQUFRLEdBQUlBLFFBQVEsR0FBR0YsV0FBZixHQUE4QixFQUFwRDtBQUNIO0FBRUQ7Ozs7OztBQUlBQyxXQUFXLENBQUNNLFNBQVosQ0FBc0JDLFFBQXRCLEdBQWlDLFlBQVk7QUFDekMsU0FBTyxLQUFLRixNQUFMLEdBQWUsRUFBRSxLQUFLSCxFQUE3QjtBQUNILENBRkQ7QUFJQTs7Ozs7O0FBSUFGLFdBQVcsQ0FBQ1EsTUFBWixHQUFxQixJQUFJUixXQUFKLENBQWdCLFFBQWhCLENBQXJCO0FBRUFTLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlYsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLy8gSUQgZ2VuZXJhdGVyIGZvciBydW50aW1lXG5cbnZhciBOb25VdWlkTWFyayA9ICcuJztcblxuLypcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2F0ZWdvcnldIC0gWW91IGNhbiBzcGVjaWZ5IGEgdW5pcXVlIGNhdGVnb3J5IHRvIGF2b2lkIGlkIGNvbGxpc2lvbiB3aXRoIG90aGVyIGluc3RhbmNlIG9mIElkR2VuZXJhdGVyXG4gKi9cbmZ1bmN0aW9uIElkR2VuZXJhdGVyIChjYXRlZ29yeSkge1xuICAgIC8vIGluaXQgd2l0aCBhIHJhbmRvbSBpZCB0byBlbXBoYXNpemUgdGhhdCB0aGUgcmV0dXJucyBpZCBzaG91bGQgbm90IGJlIHN0b3JlZCBpbiBwZXJzaXN0ZW5jZSBkYXRhXG4gICAgdGhpcy5pZCA9IDAgfCAoTWF0aC5yYW5kb20oKSAqIDk5OCk7XG4gICAgXG4gICAgdGhpcy5wcmVmaXggPSBjYXRlZ29yeSA/IChjYXRlZ29yeSArIE5vblV1aWRNYXJrKSA6ICcnO1xufVxuXG4vKlxuICogQG1ldGhvZCBnZXROZXdJZFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5JZEdlbmVyYXRlci5wcm90b3R5cGUuZ2V0TmV3SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4ICsgKCsrdGhpcy5pZCk7XG59O1xuXG4vKlxuICogVGhlIGdsb2JhbCBpZCBnZW5lcmF0ZXIgbWlnaHQgaGF2ZSBhIGNvbmZsaWN0IHByb2JsZW0gb25jZSBldmVyeSAzNjUgZGF5cyxcbiAqIGlmIHRoZSBnYW1lIHJ1bnMgYXQgNjAgRlBTIGFuZCBlYWNoIGZyYW1lIDQ3NjAyNzMgY291bnRzIG9mIG5ldyBpZCBhcmUgcmVxdWVzdGVkLlxuICovXG5JZEdlbmVyYXRlci5nbG9iYWwgPSBuZXcgSWRHZW5lcmF0ZXIoJ2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElkR2VuZXJhdGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=