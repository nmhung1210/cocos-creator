
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-selector.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.instantiate = instantiate;
exports.PhysicsWorld = exports.RigidBody = exports.SphereShape = exports.BoxShape = void 0;

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
// Cannon
// built-in
var BoxShape;
exports.BoxShape = BoxShape;
var SphereShape;
exports.SphereShape = SphereShape;
var RigidBody;
exports.RigidBody = RigidBody;
var PhysicsWorld;
exports.PhysicsWorld = PhysicsWorld;

function instantiate(boxShape, sphereShape, body, world) {
  exports.BoxShape = BoxShape = boxShape;
  exports.SphereShape = SphereShape = sphereShape;
  exports.RigidBody = RigidBody = body;
  exports.PhysicsWorld = PhysicsWorld = world;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL3BoeXNpY3Mtc2VsZWN0b3IudHMiXSwibmFtZXMiOlsiQm94U2hhcGUiLCJTcGhlcmVTaGFwZSIsIlJpZ2lkQm9keSIsIlBoeXNpY3NXb3JsZCIsImluc3RhbnRpYXRlIiwiYm94U2hhcGUiLCJzcGhlcmVTaGFwZSIsImJvZHkiLCJ3b3JsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJDO0FBTUQ7QUFLTyxJQUFJQSxRQUFKOztBQUNBLElBQUlDLFdBQUo7O0FBQ0EsSUFBSUMsU0FBSjs7QUFDQSxJQUFJQyxZQUFKOzs7QUFFQSxTQUFTQyxXQUFULENBQ0hDLFFBREcsRUFFSEMsV0FGRyxFQUdIQyxJQUhHLEVBSUhDLEtBSkcsRUFJeUI7QUFDNUIscUJBQUFSLFFBQVEsR0FBR0ssUUFBWDtBQUNBLHdCQUFBSixXQUFXLEdBQUdLLFdBQWQ7QUFDQSxzQkFBQUosU0FBUyxHQUFHSyxJQUFaO0FBQ0EseUJBQUFKLFlBQVksR0FBR0ssS0FBZjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAvLyBDYW5ub25cbmltcG9ydCB7IENhbm5vblJpZ2lkQm9keSB9IGZyb20gJy4uL2Nhbm5vbi9jYW5ub24tcmlnaWQtYm9keSc7XG5pbXBvcnQgeyBDYW5ub25Xb3JsZCB9IGZyb20gJy4uL2Nhbm5vbi9jYW5ub24td29ybGQnO1xuaW1wb3J0IHsgQ2Fubm9uQm94U2hhcGUgfSBmcm9tICcuLi9jYW5ub24vc2hhcGVzL2Nhbm5vbi1ib3gtc2hhcGUnO1xuaW1wb3J0IHsgQ2Fubm9uU3BoZXJlU2hhcGUgfSBmcm9tICcuLi9jYW5ub24vc2hhcGVzL2Nhbm5vbi1zcGhlcmUtc2hhcGUnO1xuXG4vLyBidWlsdC1pblxuaW1wb3J0IHsgQnVpbHRJbldvcmxkIH0gZnJvbSAnLi4vY29jb3MvYnVpbHRpbi13b3JsZCc7XG5pbXBvcnQgeyBCdWlsdGluQm94U2hhcGUgfSBmcm9tICcuLi9jb2Nvcy9zaGFwZXMvYnVpbHRpbi1ib3gtc2hhcGUnO1xuaW1wb3J0IHsgQnVpbHRpblNwaGVyZVNoYXBlIH0gZnJvbSAnLi4vY29jb3Mvc2hhcGVzL2J1aWx0aW4tc3BoZXJlLXNoYXBlJztcblxuZXhwb3J0IGxldCBCb3hTaGFwZTogdHlwZW9mIENhbm5vbkJveFNoYXBlIHwgdHlwZW9mIEJ1aWx0aW5Cb3hTaGFwZTtcbmV4cG9ydCBsZXQgU3BoZXJlU2hhcGU6IHR5cGVvZiBDYW5ub25TcGhlcmVTaGFwZSB8IHR5cGVvZiBCdWlsdGluU3BoZXJlU2hhcGU7XG5leHBvcnQgbGV0IFJpZ2lkQm9keTogdHlwZW9mIENhbm5vblJpZ2lkQm9keSB8IG51bGw7XG5leHBvcnQgbGV0IFBoeXNpY3NXb3JsZDogdHlwZW9mIENhbm5vbldvcmxkIHwgdHlwZW9mIEJ1aWx0SW5Xb3JsZDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlIChcbiAgICBib3hTaGFwZTogdHlwZW9mIEJveFNoYXBlLFxuICAgIHNwaGVyZVNoYXBlOiB0eXBlb2YgU3BoZXJlU2hhcGUsXG4gICAgYm9keTogdHlwZW9mIFJpZ2lkQm9keSxcbiAgICB3b3JsZDogdHlwZW9mIFBoeXNpY3NXb3JsZCkge1xuICAgIEJveFNoYXBlID0gYm94U2hhcGU7XG4gICAgU3BoZXJlU2hhcGUgPSBzcGhlcmVTaGFwZTtcbiAgICBSaWdpZEJvZHkgPSBib2R5O1xuICAgIFBoeXNpY3NXb3JsZCA9IHdvcmxkO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=