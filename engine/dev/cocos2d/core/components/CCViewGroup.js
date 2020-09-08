
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCViewGroup.js';
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
 * !#en
 * Handling touch events in a ViewGroup takes special care,
 * because it's common for a ViewGroup to have children that are targets for different touch events than the ViewGroup itself.
 * To make sure that each view correctly receives the touch events intended for it,
 * ViewGroup should register capture phase event and handle the event propagation properly.
 * Please refer to Scrollview for more  information.
 *
 * !#zh
 * ViewGroup的事件处理比较特殊，因为 ViewGroup 里面的子节点关心的事件跟 ViewGroup 本身可能不一样。
 * 为了让子节点能够正确地处理事件，ViewGroup 需要注册 capture 阶段的事件，并且合理地处理 ViewGroup 之间的事件传递。
 * 请参考 ScrollView 的实现来获取更多信息。
 * @class ViewGroup
 * @extends Component
 */
var ViewGroup = cc.Class({
  name: 'cc.ViewGroup',
  "extends": require('./CCComponent')
});
cc.ViewGroup = module.exports = ViewGroup;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NWaWV3R3JvdXAuanMiXSwibmFtZXMiOlsiVmlld0dyb3VwIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBSUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0MsT0FBTyxDQUFDLGVBQUQ7QUFGSyxDQUFULENBQWhCO0FBT0FILEVBQUUsQ0FBQ0QsU0FBSCxHQUFlSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJOLFNBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW5cbiAqIEhhbmRsaW5nIHRvdWNoIGV2ZW50cyBpbiBhIFZpZXdHcm91cCB0YWtlcyBzcGVjaWFsIGNhcmUsXG4gKiBiZWNhdXNlIGl0J3MgY29tbW9uIGZvciBhIFZpZXdHcm91cCB0byBoYXZlIGNoaWxkcmVuIHRoYXQgYXJlIHRhcmdldHMgZm9yIGRpZmZlcmVudCB0b3VjaCBldmVudHMgdGhhbiB0aGUgVmlld0dyb3VwIGl0c2VsZi5cbiAqIFRvIG1ha2Ugc3VyZSB0aGF0IGVhY2ggdmlldyBjb3JyZWN0bHkgcmVjZWl2ZXMgdGhlIHRvdWNoIGV2ZW50cyBpbnRlbmRlZCBmb3IgaXQsXG4gKiBWaWV3R3JvdXAgc2hvdWxkIHJlZ2lzdGVyIGNhcHR1cmUgcGhhc2UgZXZlbnQgYW5kIGhhbmRsZSB0aGUgZXZlbnQgcHJvcGFnYXRpb24gcHJvcGVybHkuXG4gKiBQbGVhc2UgcmVmZXIgdG8gU2Nyb2xsdmlldyBmb3IgbW9yZSAgaW5mb3JtYXRpb24uXG4gKlxuICogISN6aFxuICogVmlld0dyb3Vw55qE5LqL5Lu25aSE55CG5q+U6L6D54m55q6K77yM5Zug5Li6IFZpZXdHcm91cCDph4zpnaLnmoTlrZDoioLngrnlhbPlv4PnmoTkuovku7bot58gVmlld0dyb3VwIOacrOi6q+WPr+iDveS4jeS4gOagt+OAglxuICog5Li65LqG6K6p5a2Q6IqC54K56IO95aSf5q2j56Gu5Zyw5aSE55CG5LqL5Lu277yMVmlld0dyb3VwIOmcgOimgeazqOWGjCBjYXB0dXJlIOmYtuauteeahOS6i+S7tu+8jOW5tuS4lOWQiOeQhuWcsOWkhOeQhiBWaWV3R3JvdXAg5LmL6Ze055qE5LqL5Lu25Lyg6YCS44CCXG4gKiDor7flj4LogIMgU2Nyb2xsVmlldyDnmoTlrp7njrDmnaXojrflj5bmm7TlpJrkv6Hmga/jgIJcbiAqIEBjbGFzcyBWaWV3R3JvdXBcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG52YXIgVmlld0dyb3VwID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5WaWV3R3JvdXAnLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKVxuXG59KTtcblxuXG5jYy5WaWV3R3JvdXAgPSBtb2R1bGUuZXhwb3J0cyA9IFZpZXdHcm91cDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9