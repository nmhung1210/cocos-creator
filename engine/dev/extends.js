
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extends.js';
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
require('./cocos2d/core');

require('./cocos2d/animation');

if (CC_EDITOR && Editor.isMainProcess) {
  require('./cocos2d/particle/CCParticleAsset');

  require('./cocos2d/tilemap/CCTiledMapAsset');
} else {
  require('./cocos2d/particle');

  require('./cocos2d/tilemap');

  require('./cocos2d/videoplayer/CCVideoPlayer');

  require('./cocos2d/webview/CCWebView');

  require('./cocos2d/core/components/CCStudioComponent');

  require('./extensions/ccpool/CCNodePool');

  require('./cocos2d/actions');
}

require('./extensions/spine');

require('./extensions/dragonbones');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./cocos2d/deprecated');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5kcy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBQSxPQUFPLENBQUMsZ0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBRUEsSUFBSUMsU0FBUyxJQUFJQyxNQUFNLENBQUNDLGFBQXhCLEVBQXVDO0FBQ25DSCxFQUFBQSxPQUFPLENBQUMsb0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLG1DQUFELENBQVA7QUFDSCxDQUhELE1BSUs7QUFDREEsRUFBQUEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMscUNBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLDZCQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyw2Q0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsZ0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7QUFDSDs7QUFFREEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUVBLElBQUksQ0FBQ0MsU0FBRCxJQUFjLENBQUNDLE1BQU0sQ0FBQ0MsYUFBMUIsRUFBeUM7QUFDckNILEVBQUFBLE9BQU8sQ0FBQyxzQkFBRCxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnJlcXVpcmUoJy4vY29jb3MyZC9jb3JlJyk7XG5yZXF1aXJlKCcuL2NvY29zMmQvYW5pbWF0aW9uJyk7XG5cbmlmIChDQ19FRElUT1IgJiYgRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvcGFydGljbGUvQ0NQYXJ0aWNsZUFzc2V0Jyk7XG4gICAgcmVxdWlyZSgnLi9jb2NvczJkL3RpbGVtYXAvQ0NUaWxlZE1hcEFzc2V0Jyk7XG59XG5lbHNlIHtcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvcGFydGljbGUnKTtcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvdGlsZW1hcCcpO1xuICAgIHJlcXVpcmUoJy4vY29jb3MyZC92aWRlb3BsYXllci9DQ1ZpZGVvUGxheWVyJyk7XG4gICAgcmVxdWlyZSgnLi9jb2NvczJkL3dlYnZpZXcvQ0NXZWJWaWV3Jyk7XG4gICAgcmVxdWlyZSgnLi9jb2NvczJkL2NvcmUvY29tcG9uZW50cy9DQ1N0dWRpb0NvbXBvbmVudCcpO1xuICAgIHJlcXVpcmUoJy4vZXh0ZW5zaW9ucy9jY3Bvb2wvQ0NOb2RlUG9vbCcpO1xuICAgIHJlcXVpcmUoJy4vY29jb3MyZC9hY3Rpb25zJyk7XG59XG5cbnJlcXVpcmUoJy4vZXh0ZW5zaW9ucy9zcGluZScpO1xucmVxdWlyZSgnLi9leHRlbnNpb25zL2RyYWdvbmJvbmVzJyk7XG5cbmlmICghQ0NfRURJVE9SIHx8ICFFZGl0b3IuaXNNYWluUHJvY2Vzcykge1xuICAgIHJlcXVpcmUoJy4vY29jb3MyZC9kZXByZWNhdGVkJyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==