
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/index.js';
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
require('./box2d-adapter');

require('./CCPhysicsManager');

require('./CCRigidBody');

require('./CCPhysicsContact');

require('./collider/CCPhysicsCollider');

require('./collider/CCPhysicsChainCollider');

require('./collider/CCPhysicsCircleCollider');

require('./collider/CCPhysicsBoxCollider');

require('./collider/CCPhysicsPolygonCollider');

require('./joint/CCJoint');

require('./joint/CCDistanceJoint');

require('./joint/CCRevoluteJoint');

require('./joint/CCMouseJoint');

require('./joint/CCMotorJoint');

require('./joint/CCPrismaticJoint');

require('./joint/CCWeldJoint');

require('./joint/CCWheelJoint');

require('./joint/CCRopeJoint');

require('./platform/CCPhysicsContactListner');

require('./platform/CCPhysicsAABBQueryCallback');

require('./platform/CCPhysicsRayCastCallback');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkFBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsb0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGVBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBRUFBLE9BQU8sQ0FBQyw4QkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsbUNBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLG9DQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxpQ0FBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMscUNBQUQsQ0FBUDs7QUFFQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyx5QkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMseUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHNCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxzQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsMEJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxzQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMscUJBQUQsQ0FBUDs7QUFFQUEsT0FBTyxDQUFDLG9DQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyx1Q0FBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMscUNBQUQsQ0FBUCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnJlcXVpcmUoJy4vYm94MmQtYWRhcHRlcicpO1xucmVxdWlyZSgnLi9DQ1BoeXNpY3NNYW5hZ2VyJyk7XG5yZXF1aXJlKCcuL0NDUmlnaWRCb2R5Jyk7XG5yZXF1aXJlKCcuL0NDUGh5c2ljc0NvbnRhY3QnKTtcblxucmVxdWlyZSgnLi9jb2xsaWRlci9DQ1BoeXNpY3NDb2xsaWRlcicpO1xucmVxdWlyZSgnLi9jb2xsaWRlci9DQ1BoeXNpY3NDaGFpbkNvbGxpZGVyJyk7XG5yZXF1aXJlKCcuL2NvbGxpZGVyL0NDUGh5c2ljc0NpcmNsZUNvbGxpZGVyJyk7XG5yZXF1aXJlKCcuL2NvbGxpZGVyL0NDUGh5c2ljc0JveENvbGxpZGVyJyk7XG5yZXF1aXJlKCcuL2NvbGxpZGVyL0NDUGh5c2ljc1BvbHlnb25Db2xsaWRlcicpO1xuXG5yZXF1aXJlKCcuL2pvaW50L0NDSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NEaXN0YW5jZUpvaW50Jyk7XG5yZXF1aXJlKCcuL2pvaW50L0NDUmV2b2x1dGVKb2ludCcpO1xucmVxdWlyZSgnLi9qb2ludC9DQ01vdXNlSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NNb3RvckpvaW50Jyk7XG5yZXF1aXJlKCcuL2pvaW50L0NDUHJpc21hdGljSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NXZWxkSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NXaGVlbEpvaW50Jyk7XG5yZXF1aXJlKCcuL2pvaW50L0NDUm9wZUpvaW50Jyk7XG5cbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NQaHlzaWNzQ29udGFjdExpc3RuZXInKTtcbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NQaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2snKTtcbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NQaHlzaWNzUmF5Q2FzdENhbGxiYWNrJyk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==