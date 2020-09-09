
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCLabelAtlas.js';
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
 * @module cc
 */

/**
 * !#en Class for LabelAtlas handling.
 * !#zh 艺术数字字体资源类。
 * @class LabelAtlas
 * @extends BitmapFont
 *
 */
var LabelAtlas = cc.Class({
  name: 'cc.LabelAtlas',
  "extends": cc.BitmapFont,
  onLoad: function onLoad() {
    if (!this.spriteFrame) {
      cc.warnID(9100, this.name);
      return;
    }

    if (!this._fntConfig) {
      cc.warnID(9101, this.name);
      return;
    }

    this._super();
  }
});
cc.LabelAtlas = LabelAtlas;
module.exports = LabelAtlas;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ0xhYmVsQXRsYXMuanMiXSwibmFtZXMiOlsiTGFiZWxBdGxhcyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQml0bWFwRm9udCIsIm9uTG9hZCIsInNwcml0ZUZyYW1lIiwid2FybklEIiwiX2ZudENvbmZpZyIsIl9zdXBlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7QUFHQTs7Ozs7OztBQU9BLElBQUlBLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxlQURnQjtBQUV0QixhQUFTRixFQUFFLENBQUNHLFVBRlU7QUFJdEJDLEVBQUFBLE1BSnNCLG9CQUlaO0FBQ04sUUFBSSxDQUFDLEtBQUtDLFdBQVYsRUFBdUI7QUFDbkJMLE1BQUFBLEVBQUUsQ0FBQ00sTUFBSCxDQUFVLElBQVYsRUFBZ0IsS0FBS0osSUFBckI7QUFDQTtBQUNIOztBQUNELFFBQUksQ0FBQyxLQUFLSyxVQUFWLEVBQXNCO0FBQ2xCUCxNQUFBQSxFQUFFLENBQUNNLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLEtBQUtKLElBQXJCO0FBQ0E7QUFDSDs7QUFDRCxTQUFLTSxNQUFMO0FBQ0g7QUFkcUIsQ0FBVCxDQUFqQjtBQWtCQVIsRUFBRSxDQUFDRCxVQUFILEdBQWdCQSxVQUFoQjtBQUNBVSxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLFVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBMYWJlbEF0bGFzIGhhbmRsaW5nLlxuICogISN6aCDoibrmnK/mlbDlrZflrZfkvZPotYTmupDnsbvjgIJcbiAqIEBjbGFzcyBMYWJlbEF0bGFzXG4gKiBAZXh0ZW5kcyBCaXRtYXBGb250XG4gKlxuICovXG52YXIgTGFiZWxBdGxhcyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTGFiZWxBdGxhcycsXG4gICAgZXh0ZW5kczogY2MuQml0bWFwRm9udCxcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgY2Mud2FybklEKDkxMDAsIHRoaXMubmFtZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9mbnRDb25maWcpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCg5MTAxLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfVxuXG59KTtcblxuY2MuTGFiZWxBdGxhcyA9IExhYmVsQXRsYXM7XG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsQXRsYXM7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==