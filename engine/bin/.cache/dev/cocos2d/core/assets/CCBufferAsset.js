
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCBufferAsset.js';
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

 http://www.cocos.com

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
 * @class BufferAsset
 * @extends Asset
 */
var BufferAsset = cc.Class({
  name: 'cc.BufferAsset',
  "extends": cc.Asset,
  ctor: function ctor() {
    this._buffer = null;
  },
  properties: {
    _nativeAsset: {
      get: function get() {
        return this._buffer;
      },
      set: function set(bin) {
        this._buffer = bin.buffer || bin;
      },
      override: true
    },
    buffer: function buffer() {
      return this._buffer;
    }
  }
});
cc.BufferAsset = module.exports = BufferAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0J1ZmZlckFzc2V0LmpzIl0sIm5hbWVzIjpbIkJ1ZmZlckFzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsImN0b3IiLCJfYnVmZmVyIiwicHJvcGVydGllcyIsIl9uYXRpdmVBc3NldCIsImdldCIsInNldCIsImJpbiIsImJ1ZmZlciIsIm92ZXJyaWRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7OztBQUlBLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7QUFFdkIsYUFBU0YsRUFBRSxDQUFDRyxLQUZXO0FBSXZCQyxFQUFBQSxJQUp1QixrQkFJZjtBQUNKLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0gsR0FOc0I7QUFRdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUU7QUFDVkMsTUFBQUEsR0FEVSxpQkFDSDtBQUNILGVBQU8sS0FBS0gsT0FBWjtBQUNILE9BSFM7QUFJVkksTUFBQUEsR0FKVSxlQUlMQyxHQUpLLEVBSUE7QUFDTixhQUFLTCxPQUFMLEdBQWVLLEdBQUcsQ0FBQ0MsTUFBSixJQUFjRCxHQUE3QjtBQUNILE9BTlM7QUFPVkUsTUFBQUEsUUFBUSxFQUFFO0FBUEEsS0FETjtBQVVSRCxJQUFBQSxNQVZRLG9CQVVFO0FBQ04sYUFBTyxLQUFLTixPQUFaO0FBQ0g7QUFaTztBQVJXLENBQVQsQ0FBbEI7QUF3QkFMLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQmMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCZixXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogQGNsYXNzIEJ1ZmZlckFzc2V0XG4gKiBAZXh0ZW5kcyBBc3NldFxuICovXG52YXIgQnVmZmVyQXNzZXQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkJ1ZmZlckFzc2V0JyxcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLl9idWZmZXIgPSBudWxsO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAoYmluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gYmluLmJ1ZmZlciB8fCBiaW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgYnVmZmVyICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuQnVmZmVyQXNzZXQgPSBtb2R1bGUuZXhwb3J0cyA9IEJ1ZmZlckFzc2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=