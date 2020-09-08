
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCScripts.js';
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
 * !#en Class for script handling.
 * !#zh Script 资源类。
 * @class _Script
 * @extends Asset
 *
 * @private
 */
var Script = cc.Class({
  name: 'cc.Script',
  "extends": cc.Asset
});
cc._Script = Script;
/**
 * !#en Class for JavaScript handling.
 * !#zh JavaScript 资源类。
 * @class _JavaScript
 * @extends Asset
 * @private
 *
 */

var JavaScript = cc.Class({
  name: 'cc.JavaScript',
  "extends": Script
});
cc._JavaScript = JavaScript;
/**
 * !#en Class for TypeScript handling.
 * !#zh TypeScript 资源类。
 * @class TypeScript
 * @extends Asset
 *
 */

var TypeScript = cc.Class({
  name: 'cc.TypeScript',
  "extends": Script
});
cc._TypeScript = TypeScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1NjcmlwdHMuanMiXSwibmFtZXMiOlsiU2NyaXB0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsIl9TY3JpcHQiLCJKYXZhU2NyaXB0IiwiX0phdmFTY3JpcHQiLCJUeXBlU2NyaXB0IiwiX1R5cGVTY3JpcHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7O0FBUUEsSUFBSUEsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFFLFdBRFk7QUFFbEIsYUFBU0YsRUFBRSxDQUFDRztBQUZNLENBQVQsQ0FBYjtBQUtBSCxFQUFFLENBQUNJLE9BQUgsR0FBYUwsTUFBYjtBQUVBOzs7Ozs7Ozs7QUFRQSxJQUFJTSxVQUFVLEdBQUdMLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0g7QUFGYSxDQUFULENBQWpCO0FBS0FDLEVBQUUsQ0FBQ00sV0FBSCxHQUFpQkQsVUFBakI7QUFFQTs7Ozs7Ozs7QUFPQSxJQUFJRSxVQUFVLEdBQUdQLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0g7QUFGYSxDQUFULENBQWpCO0FBS0FDLEVBQUUsQ0FBQ1EsV0FBSCxHQUFpQkQsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlbiBDbGFzcyBmb3Igc2NyaXB0IGhhbmRsaW5nLlxuICogISN6aCBTY3JpcHQg6LWE5rqQ57G744CCXG4gKiBAY2xhc3MgX1NjcmlwdFxuICogQGV4dGVuZHMgQXNzZXRcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgU2NyaXB0ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5TY3JpcHQnLFxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxufSk7XG5cbmNjLl9TY3JpcHQgPSBTY3JpcHQ7XG5cbi8qKlxuICogISNlbiBDbGFzcyBmb3IgSmF2YVNjcmlwdCBoYW5kbGluZy5cbiAqICEjemggSmF2YVNjcmlwdCDotYTmupDnsbvjgIJcbiAqIEBjbGFzcyBfSmF2YVNjcmlwdFxuICogQGV4dGVuZHMgQXNzZXRcbiAqIEBwcml2YXRlXG4gKlxuICovXG52YXIgSmF2YVNjcmlwdCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuSmF2YVNjcmlwdCcsXG4gICAgZXh0ZW5kczogU2NyaXB0LFxufSk7XG5cbmNjLl9KYXZhU2NyaXB0ID0gSmF2YVNjcmlwdDtcblxuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBUeXBlU2NyaXB0IGhhbmRsaW5nLlxuICogISN6aCBUeXBlU2NyaXB0IOi1hOa6kOexu+OAglxuICogQGNsYXNzIFR5cGVTY3JpcHRcbiAqIEBleHRlbmRzIEFzc2V0XG4gKlxuICovXG52YXIgVHlwZVNjcmlwdCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVHlwZVNjcmlwdCcsXG4gICAgZXh0ZW5kczogU2NyaXB0LFxufSk7XG5cbmNjLl9UeXBlU2NyaXB0ID0gVHlwZVNjcmlwdDsiXSwic291cmNlUm9vdCI6Ii8ifQ==