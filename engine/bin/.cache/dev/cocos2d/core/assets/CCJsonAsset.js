
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCJsonAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
 * !#en
 * Class for JSON file. When the JSON file is loaded, this object is returned.
 * The parsed JSON object can be accessed through the `json` attribute in it.<br>
 * If you want to get the original JSON text, you should modify the extname to `.txt`
 * so that it is loaded as a `TextAsset` instead of a `JsonAsset`.
 *
 * !#zh
 * JSON 资源类。JSON 文件加载后，将会返回该对象。可以通过其中的 `json` 属性访问解析后的 JSON 对象。<br>
 * 如果你想要获得 JSON 的原始文本，那么应该修改源文件的后缀为 `.txt`，这样就会加载为一个 `TextAsset` 而不是 `JsonAsset`。
 *
 * @class JsonAsset
 * @extends Asset
 */
var JsonAsset = cc.Class({
  name: 'cc.JsonAsset',
  "extends": cc.Asset,
  properties: {
    /**
     * @property {Object} json - The loaded JSON object.
     */
    json: null
  }
});
module.exports = cc.JsonAsset = JsonAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0pzb25Bc3NldC5qcyJdLCJuYW1lcyI6WyJKc29uQXNzZXQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwicHJvcGVydGllcyIsImpzb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFBSUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0YsRUFBRSxDQUFDRyxLQUZTO0FBR3JCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjs7O0FBR0FDLElBQUFBLElBQUksRUFBRTtBQUpFO0FBSFMsQ0FBVCxDQUFoQjtBQVdBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJQLEVBQUUsQ0FBQ0QsU0FBSCxHQUFlQSxTQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW5cbiAqIENsYXNzIGZvciBKU09OIGZpbGUuIFdoZW4gdGhlIEpTT04gZmlsZSBpcyBsb2FkZWQsIHRoaXMgb2JqZWN0IGlzIHJldHVybmVkLlxuICogVGhlIHBhcnNlZCBKU09OIG9iamVjdCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCB0aGUgYGpzb25gIGF0dHJpYnV0ZSBpbiBpdC48YnI+XG4gKiBJZiB5b3Ugd2FudCB0byBnZXQgdGhlIG9yaWdpbmFsIEpTT04gdGV4dCwgeW91IHNob3VsZCBtb2RpZnkgdGhlIGV4dG5hbWUgdG8gYC50eHRgXG4gKiBzbyB0aGF0IGl0IGlzIGxvYWRlZCBhcyBhIGBUZXh0QXNzZXRgIGluc3RlYWQgb2YgYSBgSnNvbkFzc2V0YC5cbiAqXG4gKiAhI3poXG4gKiBKU09OIOi1hOa6kOexu+OAgkpTT04g5paH5Lu25Yqg6L295ZCO77yM5bCG5Lya6L+U5Zue6K+l5a+56LGh44CC5Y+v5Lul6YCa6L+H5YW25Lit55qEIGBqc29uYCDlsZ7mgKforr/pl67op6PmnpDlkI7nmoQgSlNPTiDlr7nosaHjgII8YnI+XG4gKiDlpoLmnpzkvaDmg7PopoHojrflvpcgSlNPTiDnmoTljp/lp4vmlofmnKzvvIzpgqPkuYjlupTor6Xkv67mlLnmupDmlofku7bnmoTlkI7nvIDkuLogYC50eHRg77yM6L+Z5qC35bCx5Lya5Yqg6L295Li65LiA5LiqIGBUZXh0QXNzZXRgIOiAjOS4jeaYryBgSnNvbkFzc2V0YOOAglxuICpcbiAqIEBjbGFzcyBKc29uQXNzZXRcbiAqIEBleHRlbmRzIEFzc2V0XG4gKi9cbnZhciBKc29uQXNzZXQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkpzb25Bc3NldCcsXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IHtPYmplY3R9IGpzb24gLSBUaGUgbG9hZGVkIEpTT04gb2JqZWN0LlxuICAgICAgICAgKi9cbiAgICAgICAganNvbjogbnVsbCxcbiAgICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2MuSnNvbkFzc2V0ID0gSnNvbkFzc2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=