
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/instance.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.createPhysicsWorld = createPhysicsWorld;
exports.createRigidBody = createRigidBody;
exports.createBoxShape = createBoxShape;
exports.createSphereShape = createSphereShape;

var _physicsSelector = require("./physics-selector");

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
function createPhysicsWorld() {
  return new _physicsSelector.PhysicsWorld();
}

function createRigidBody() {
  return new _physicsSelector.RigidBody();
}

function createBoxShape(size) {
  return new _physicsSelector.BoxShape(size);
}

function createSphereShape(radius) {
  return new _physicsSelector.SphereShape(radius);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2luc3RhbmNlLnRzIl0sIm5hbWVzIjpbImNyZWF0ZVBoeXNpY3NXb3JsZCIsIlBoeXNpY3NXb3JsZCIsImNyZWF0ZVJpZ2lkQm9keSIsIlJpZ2lkQm9keSIsImNyZWF0ZUJveFNoYXBlIiwic2l6ZSIsIkJveFNoYXBlIiwiY3JlYXRlU3BoZXJlU2hhcGUiLCJyYWRpdXMiLCJTcGhlcmVTaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCTyxTQUFTQSxrQkFBVCxHQUE4QztBQUNqRCxTQUFPLElBQUlDLDZCQUFKLEVBQVA7QUFDSDs7QUFFTSxTQUFTQyxlQUFULEdBQXdDO0FBQzNDLFNBQU8sSUFBSUMsMEJBQUosRUFBUDtBQUNIOztBQUVNLFNBQVNDLGNBQVQsQ0FBeUJDLElBQXpCLEVBQW1EO0FBQ3RELFNBQU8sSUFBSUMseUJBQUosQ0FBYUQsSUFBYixDQUFQO0FBQ0g7O0FBRU0sU0FBU0UsaUJBQVQsQ0FBNEJDLE1BQTVCLEVBQTBEO0FBQzdELFNBQU8sSUFBSUMsNEJBQUosQ0FBZ0JELE1BQWhCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBCb3hTaGFwZSwgUGh5c2ljc1dvcmxkLCBSaWdpZEJvZHksIFNwaGVyZVNoYXBlIH0gZnJvbSAnLi9waHlzaWNzLXNlbGVjdG9yJztcbmltcG9ydCB7IElSaWdpZEJvZHkgfSBmcm9tICcuLi9zcGVjL0ktcmlnaWQtYm9keSc7XG5pbXBvcnQgeyBJQm94U2hhcGUsIElTcGhlcmVTaGFwZSB9IGZyb20gJy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcbmltcG9ydCB7IElQaHlzaWNzV29ybGQgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy13b3JsZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQaHlzaWNzV29ybGQgKCk6IElQaHlzaWNzV29ybGQge1xuICAgIHJldHVybiBuZXcgUGh5c2ljc1dvcmxkKCkgYXMgSVBoeXNpY3NXb3JsZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJpZ2lkQm9keSAoKTogSVJpZ2lkQm9keSB7XG4gICAgcmV0dXJuIG5ldyBSaWdpZEJvZHkhKCkgYXMgSVJpZ2lkQm9keTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJveFNoYXBlIChzaXplOiBjYy5WZWMzKTogSUJveFNoYXBlIHtcbiAgICByZXR1cm4gbmV3IEJveFNoYXBlKHNpemUpIGFzIElCb3hTaGFwZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNwaGVyZVNoYXBlIChyYWRpdXM6IG51bWJlcik6IElTcGhlcmVTaGFwZSB7XG4gICAgcmV0dXJuIG5ldyBTcGhlcmVTaGFwZShyYWRpdXMpIGFzIElTcGhlcmVTaGFwZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9