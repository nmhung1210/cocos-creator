
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;

var _physicsManager = require("./physics-manager");

exports.Physics3DManager = _physicsManager.Physics3DManager;

var _physicsRayResult = require("./physics-ray-result");

exports.PhysicsRayResult = _physicsRayResult.PhysicsRayResult;

var _boxColliderComponent = require("./components/collider/box-collider-component");

exports.BoxCollider3D = _boxColliderComponent.BoxCollider3D;

var _colliderComponent = require("./components/collider/collider-component");

exports.Collider3D = _colliderComponent.Collider3D;

var _sphereColliderComponent = require("./components/collider/sphere-collider-component");

exports.SphereCollider3D = _sphereColliderComponent.SphereCollider3D;

var _rigidBodyComponent = require("./components/rigid-body-component");

exports.RigidBody3D = _rigidBodyComponent.RigidBody3D;

var _constantForce = require("./components/constant-force");

var _physicsMaterial = require("./assets/physics-material");

exports.PhysicsMaterial = _physicsMaterial.PhysicsMaterial;

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
cc.Physics3DManager = _physicsManager.Physics3DManager;
cc.Collider3D = _colliderComponent.Collider3D;
cc.BoxCollider3D = _boxColliderComponent.BoxCollider3D;
cc.SphereCollider3D = _sphereColliderComponent.SphereCollider3D;
cc.RigidBody3D = _rigidBodyComponent.RigidBody3D;
cc.PhysicsRayResult = _physicsRayResult.PhysicsRayResult;
cc.ConstantForce = _constantForce.ConstantForce;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2luZGV4LnRzIl0sIm5hbWVzIjpbImNjIiwiUGh5c2ljczNETWFuYWdlciIsIkNvbGxpZGVyM0QiLCJCb3hDb2xsaWRlcjNEIiwiU3BoZXJlQ29sbGlkZXIzRCIsIlJpZ2lkQm9keTNEIiwiUGh5c2ljc1JheVJlc3VsdCIsIkNvbnN0YW50Rm9yY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQWhDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkNBQSxFQUFFLENBQUNDLGdCQUFILEdBQXNCQSxnQ0FBdEI7QUFDQUQsRUFBRSxDQUFDRSxVQUFILEdBQWdCQSw2QkFBaEI7QUFDQUYsRUFBRSxDQUFDRyxhQUFILEdBQW1CQSxtQ0FBbkI7QUFDQUgsRUFBRSxDQUFDSSxnQkFBSCxHQUFzQkEseUNBQXRCO0FBQ0FKLEVBQUUsQ0FBQ0ssV0FBSCxHQUFpQkEsK0JBQWpCO0FBQ0FMLEVBQUUsQ0FBQ00sZ0JBQUgsR0FBc0JBLGtDQUF0QjtBQUNBTixFQUFFLENBQUNPLGFBQUgsR0FBbUJBLDRCQUFuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBQaHlzaWNzM0RNYW5hZ2VyIH0gZnJvbSAnLi9waHlzaWNzLW1hbmFnZXInO1xuaW1wb3J0IHsgUGh5c2ljc1JheVJlc3VsdCB9IGZyb20gJy4vcGh5c2ljcy1yYXktcmVzdWx0JztcbmltcG9ydCB7IEJveENvbGxpZGVyM0QgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGlkZXIvYm94LWNvbGxpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsaWRlcjNEIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxpZGVyL2NvbGxpZGVyLWNvbXBvbmVudCc7XG5pbXBvcnQgeyBTcGhlcmVDb2xsaWRlcjNEIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxpZGVyL3NwaGVyZS1jb2xsaWRlci1jb21wb25lbnQnO1xuaW1wb3J0IHsgUmlnaWRCb2R5M0QgfSBmcm9tICcuL2NvbXBvbmVudHMvcmlnaWQtYm9keS1jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uc3RhbnRGb3JjZSB9IGZyb20gJy4vY29tcG9uZW50cy9jb25zdGFudC1mb3JjZSc7XG5pbXBvcnQgeyBQaHlzaWNzTWF0ZXJpYWwgfSBmcm9tICcuL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJztcblxuZXhwb3J0IHtcbiAgICBQaHlzaWNzM0RNYW5hZ2VyLFxuICAgIFBoeXNpY3NSYXlSZXN1bHQsXG4gICAgUGh5c2ljc01hdGVyaWFsLFxuXG4gICAgQ29sbGlkZXIzRCxcbiAgICBCb3hDb2xsaWRlcjNELFxuICAgIFNwaGVyZUNvbGxpZGVyM0QsXG4gICAgUmlnaWRCb2R5M0QsXG59O1xuXG5jYy5QaHlzaWNzM0RNYW5hZ2VyID0gUGh5c2ljczNETWFuYWdlcjtcbmNjLkNvbGxpZGVyM0QgPSBDb2xsaWRlcjNEO1xuY2MuQm94Q29sbGlkZXIzRCA9IEJveENvbGxpZGVyM0Q7XG5jYy5TcGhlcmVDb2xsaWRlcjNEID0gU3BoZXJlQ29sbGlkZXIzRDtcbmNjLlJpZ2lkQm9keTNEID0gUmlnaWRCb2R5M0Q7XG5jYy5QaHlzaWNzUmF5UmVzdWx0ID0gUGh5c2ljc1JheVJlc3VsdDtcbmNjLkNvbnN0YW50Rm9yY2UgPSBDb25zdGFudEZvcmNlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=