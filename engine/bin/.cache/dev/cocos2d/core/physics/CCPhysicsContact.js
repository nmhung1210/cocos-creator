
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCPhysicsContact.js';
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
var PTM_RATIO = require('./CCPhysicsTypes').PTM_RATIO;

var ContactType = require('./CCPhysicsTypes').ContactType;

var pools = []; // temp world manifold

var pointCache = [cc.v2(), cc.v2()];
var b2worldmanifold = new b2.WorldManifold();
/**
 * @class WorldManifold
 */

var worldmanifold = {
  /**
   * !#en
   * world contact point (point of intersection)
   * !#zh
   * 碰撞点集合
   * @property {[Vec2]} points
   */
  points: [],

  /**
   * !#en
   * a negative value indicates overlap
   * !#zh
   * 一个负数，用于指明重叠的部分
   */
  separations: [],

  /**
   * !#en
   * world vector pointing from A to B
   * !#zh
   * 世界坐标系下由 A 指向 B 的向量
   * @property {Vec2} normal
   */
  normal: cc.v2()
};
/**
 * !#en
 * A manifold point is a contact point belonging to a contact manifold. 
 * It holds details related to the geometry and dynamics of the contact points.
 * Note: the impulses are used for internal caching and may not
 * provide reliable contact forces, especially for high speed collisions.
 * !#zh
 * ManifoldPoint 是接触信息中的接触点信息。它拥有关于几何和接触点的详细信息。
 * 注意：信息中的冲量用于系统内部缓存，提供的接触力可能不是很准确，特别是高速移动中的碰撞信息。
 * @class ManifoldPoint
 */

/**
 * !#en
 * The local point usage depends on the manifold type:
 * -e_circles: the local center of circleB
 * -e_faceA: the local center of circleB or the clip point of polygonB
 * -e_faceB: the clip point of polygonA
 * !#zh
 * 本地坐标点的用途取决于 manifold 的类型
 * - e_circles: circleB 的本地中心点
 * - e_faceA: circleB 的本地中心点 或者是 polygonB 的截取点
 * - e_faceB: polygonB 的截取点
 * @property {Vec2} localPoint
 */

/**
 * !#en
 * Normal impulse.
 * !#zh
 * 法线冲量。
 * @property {Number} normalImpulse
 */

/**
 * !#en
 * Tangent impulse.
 * !#zh
 * 切线冲量。
 * @property {Number} tangentImpulse
 */

function ManifoldPoint() {
  this.localPoint = cc.v2();
  this.normalImpulse = 0;
  this.tangentImpulse = 0;
}

var manifoldPointCache = [new ManifoldPoint(), new ManifoldPoint()];
var b2manifold = new b2.Manifold();
/**
 * @class Manifold
 */

var manifold = {
  /**
   * !#en
   * Manifold type :  0: e_circles, 1: e_faceA, 2: e_faceB
   * !#zh
   * Manifold 类型 :  0: e_circles, 1: e_faceA, 2: e_faceB
   * @property {Number} type
   */
  type: 0,

  /**
   * !#en
   * The local point usage depends on the manifold type:
   * -e_circles: the local center of circleA
   * -e_faceA: the center of faceA
   * -e_faceB: the center of faceB
   * !#zh
   * 用途取决于 manifold 类型
   * -e_circles: circleA 的本地中心点
   * -e_faceA: faceA 的本地中心点
   * -e_faceB: faceB 的本地中心点
   * @property {Vec2} localPoint
   */
  localPoint: cc.v2(),

  /**
   * !#en
   * -e_circles: not used
   * -e_faceA: the normal on polygonA
   * -e_faceB: the normal on polygonB
   * !#zh
   * -e_circles: 没被使用到
   * -e_faceA: polygonA 的法向量
   * -e_faceB: polygonB 的法向量
   * @property {Vec2} localNormal
   */
  localNormal: cc.v2(),

  /**
   * !#en
   * the points of contact.
   * !#zh
   * 接触点信息。
   * @property {[ManifoldPoint]} points
   */
  points: []
};
/**
 * !#en
 * Contact impulses for reporting.
 * !#zh
 * 用于返回给回调的接触冲量。
 * @class PhysicsImpulse
 */

var impulse = {
  /**
   * !#en
   * Normal impulses.
   * !#zh
   * 法线方向的冲量
   * @property normalImpulses
   */
  normalImpulses: [],

  /**
   * !#en
   * Tangent impulses
   * !#zh
   * 切线方向的冲量
   * @property tangentImpulses
   */
  tangentImpulses: []
};
/**
 * !#en
 * PhysicsContact will be generated during begin and end collision as a parameter of the collision callback.
 * Note that contacts will be reused for speed up cpu time, so do not cache anything in the contact.
 * !#zh
 * 物理接触会在开始和结束碰撞之间生成，并作为参数传入到碰撞回调函数中。
 * 注意：传入的物理接触会被系统进行重用，所以不要在使用中缓存里面的任何信息。
 * @class PhysicsContact
 */

function PhysicsContact() {}

PhysicsContact.prototype.init = function (b2contact) {
  this.colliderA = b2contact.GetFixtureA().collider;
  this.colliderB = b2contact.GetFixtureB().collider;
  this.disabled = false;
  this.disabledOnce = false;
  this._impulse = null;
  this._inverted = false;
  this._b2contact = b2contact;
  b2contact._contact = this;
};

PhysicsContact.prototype.reset = function () {
  this.setTangentSpeed(0);
  this.resetFriction();
  this.resetRestitution();
  this.colliderA = null;
  this.colliderB = null;
  this.disabled = false;
  this._impulse = null;
  this._b2contact._contact = null;
  this._b2contact = null;
};
/**
 * !#en
 * Get the world manifold.
 * !#zh
 * 获取世界坐标系下的碰撞信息。
 * @method getWorldManifold
 * @return {WorldManifold}
 */


PhysicsContact.prototype.getWorldManifold = function () {
  var points = worldmanifold.points;
  var separations = worldmanifold.separations;
  var normal = worldmanifold.normal;

  this._b2contact.GetWorldManifold(b2worldmanifold);

  var b2points = b2worldmanifold.points;
  var b2separations = b2worldmanifold.separations;

  var count = this._b2contact.GetManifold().pointCount;

  points.length = separations.length = count;

  for (var i = 0; i < count; i++) {
    var p = pointCache[i];
    p.x = b2points[i].x * PTM_RATIO;
    p.y = b2points[i].y * PTM_RATIO;
    points[i] = p;
    separations[i] = b2separations[i] * PTM_RATIO;
  }

  normal.x = b2worldmanifold.normal.x;
  normal.y = b2worldmanifold.normal.y;

  if (this._inverted) {
    normal.x *= -1;
    normal.y *= -1;
  }

  return worldmanifold;
};
/**
 * !#en
 * Get the manifold.
 * !#zh
 * 获取本地（局部）坐标系下的碰撞信息。
 * @method getManifold
 * @return {Manifold}
 */


PhysicsContact.prototype.getManifold = function () {
  var points = manifold.points;
  var localNormal = manifold.localNormal;
  var localPoint = manifold.localPoint;

  var b2manifold = this._b2contact.GetManifold();

  var b2points = b2manifold.points;
  var count = points.length = b2manifold.pointCount;

  for (var i = 0; i < count; i++) {
    var p = manifoldPointCache[i];
    var b2p = b2points[i];
    p.localPoint.x = b2p.localPoint.x * PTM_RATIO;
    p.localPoint.Y = b2p.localPoint.Y * PTM_RATIO;
    p.normalImpulse = b2p.normalImpulse * PTM_RATIO;
    p.tangentImpulse = b2p.tangentImpulse;
    points[i] = p;
  }

  localPoint.x = b2manifold.localPoint.x * PTM_RATIO;
  localPoint.y = b2manifold.localPoint.y * PTM_RATIO;
  localNormal.x = b2manifold.localNormal.x;
  localNormal.y = b2manifold.localNormal.y;
  manifold.type = b2manifold.type;

  if (this._inverted) {
    localNormal.x *= -1;
    localNormal.y *= -1;
  }

  return manifold;
};
/**
 * !#en
 * Get the impulses.
 * Note: PhysicsImpulse can only used in onPostSolve callback.
 * !#zh
 * 获取冲量信息
 * 注意：这个信息只有在 onPostSolve 回调中才能获取到
 * @method getImpulse
 * @return {PhysicsImpulse}
 */


PhysicsContact.prototype.getImpulse = function () {
  var b2impulse = this._impulse;
  if (!b2impulse) return null;
  var normalImpulses = impulse.normalImpulses;
  var tangentImpulses = impulse.tangentImpulses;
  var count = b2impulse.count;

  for (var i = 0; i < count; i++) {
    normalImpulses[i] = b2impulse.normalImpulses[i] * PTM_RATIO;
    tangentImpulses[i] = b2impulse.tangentImpulses[i];
  }

  tangentImpulses.length = normalImpulses.length = count;
  return impulse;
};

PhysicsContact.prototype.emit = function (contactType) {
  var func;

  switch (contactType) {
    case ContactType.BEGIN_CONTACT:
      func = 'onBeginContact';
      break;

    case ContactType.END_CONTACT:
      func = 'onEndContact';
      break;

    case ContactType.PRE_SOLVE:
      func = 'onPreSolve';
      break;

    case ContactType.POST_SOLVE:
      func = 'onPostSolve';
      break;
  }

  var colliderA = this.colliderA;
  var colliderB = this.colliderB;
  var bodyA = colliderA.body;
  var bodyB = colliderB.body;
  var comps;
  var i, l, comp;

  if (bodyA.enabledContactListener) {
    comps = bodyA.node._components;
    this._inverted = false;

    for (i = 0, l = comps.length; i < l; i++) {
      comp = comps[i];

      if (comp[func]) {
        comp[func](this, colliderA, colliderB);
      }
    }
  }

  if (bodyB.enabledContactListener) {
    comps = bodyB.node._components;
    this._inverted = true;

    for (i = 0, l = comps.length; i < l; i++) {
      comp = comps[i];

      if (comp[func]) {
        comp[func](this, colliderB, colliderA);
      }
    }
  }

  if (this.disabled || this.disabledOnce) {
    this.setEnabled(false);
    this.disabledOnce = false;
  }
};

PhysicsContact.get = function (b2contact) {
  var c;

  if (pools.length === 0) {
    c = new cc.PhysicsContact();
  } else {
    c = pools.pop();
  }

  c.init(b2contact);
  return c;
};

PhysicsContact.put = function (b2contact) {
  var c = b2contact._contact;
  if (!c) return;
  pools.push(c);
  c.reset();
};

var _p = PhysicsContact.prototype;
/**
 * !#en
 * One of the collider that collided
 * !#zh
 * 发生碰撞的碰撞体之一
 * @property {Collider} colliderA
 */

/**
 * !#en
 * One of the collider that collided
 * !#zh
 * 发生碰撞的碰撞体之一
 * @property {Collider} colliderB
 */

/**
 * !#en
 * If set disabled to true, the contact will be ignored until contact end.
 * If you just want to disabled contact for current time step or sub-step, please use disabledOnce.
 * !#zh
 * 如果 disabled 被设置为 true，那么直到接触结束此接触都将被忽略。
 * 如果只是希望在当前时间步或子步中忽略此接触，请使用 disabledOnce 。
 * @property {Boolean} disabled
 */

/**
 * !#en
 * Disabled contact for current time step or sub-step.
 * !#zh
 * 在当前时间步或子步中忽略此接触。
 * @property {Boolean} disabledOnce
 */

_p.setEnabled = function (value) {
  this._b2contact.SetEnabled(value);
};
/**
 * !#en
 * Is this contact touching?
 * !#zh
 * 返回碰撞体是否已经接触到。
 * @method isTouching
 * @return {Boolean}
 */


_p.isTouching = function () {
  return this._b2contact.IsTouching();
};
/**
 * !#en
 * Set the desired tangent speed for a conveyor belt behavior.
 * !#zh
 * 为传送带设置期望的切线速度
 * @method setTangentSpeed
 * @param {Number} tangentSpeed
 */


_p.setTangentSpeed = function (value) {
  this._b2contact.SetTangentSpeed(value / PTM_RATIO);
};
/**
 * !#en
 * Get the desired tangent speed.
 * !#zh
 * 获取切线速度
 * @method getTangentSpeed
 * @return {Number}
 */


_p.getTangentSpeed = function () {
  return this._b2contact.GetTangentSpeed() * PTM_RATIO;
};
/**
 * !#en
 * Override the default friction mixture. You can call this in onPreSolve callback.
 * !#zh
 * 覆盖默认的摩擦力系数。你可以在 onPreSolve 回调中调用此函数。
 * @method setFriction
 * @param {Number} friction
 */


_p.setFriction = function (value) {
  this._b2contact.SetFriction(value);
};
/**
 * !#en
 * Get the friction.
 * !#zh
 * 获取当前摩擦力系数
 * @method getFriction
 * @return {Number}
 */


_p.getFriction = function () {
  return this._b2contact.GetFriction();
};
/**
 * !#en
 * Reset the friction mixture to the default value.
 * !#zh
 * 重置摩擦力系数到默认值
 * @method resetFriction
 */


_p.resetFriction = function () {
  return this._b2contact.ResetFriction();
};
/**
 * !#en
 * Override the default restitution mixture. You can call this in onPreSolve callback.
 * !#zh
 * 覆盖默认的恢复系数。你可以在 onPreSolve 回调中调用此函数。
 * @method setRestitution
 * @param {Number} restitution
 */


_p.setRestitution = function (value) {
  this._b2contact.SetRestitution(value);
};
/**
 * !#en
 * Get the restitution.
 * !#zh
 * 获取当前恢复系数
 * @method getRestitution
 * @return {Number}
 */


_p.getRestitution = function () {
  return this._b2contact.GetRestitution();
};
/**
 * !#en
 * Reset the restitution mixture to the default value.
 * !#zh
 * 重置恢复系数到默认值
 * @method resetRestitution
 */


_p.resetRestitution = function () {
  return this._b2contact.ResetRestitution();
};

PhysicsContact.ContactType = ContactType;
cc.PhysicsContact = module.exports = PhysicsContact;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvQ0NQaHlzaWNzQ29udGFjdC5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiQ29udGFjdFR5cGUiLCJwb29scyIsInBvaW50Q2FjaGUiLCJjYyIsInYyIiwiYjJ3b3JsZG1hbmlmb2xkIiwiYjIiLCJXb3JsZE1hbmlmb2xkIiwid29ybGRtYW5pZm9sZCIsInBvaW50cyIsInNlcGFyYXRpb25zIiwibm9ybWFsIiwiTWFuaWZvbGRQb2ludCIsImxvY2FsUG9pbnQiLCJub3JtYWxJbXB1bHNlIiwidGFuZ2VudEltcHVsc2UiLCJtYW5pZm9sZFBvaW50Q2FjaGUiLCJiMm1hbmlmb2xkIiwiTWFuaWZvbGQiLCJtYW5pZm9sZCIsInR5cGUiLCJsb2NhbE5vcm1hbCIsImltcHVsc2UiLCJub3JtYWxJbXB1bHNlcyIsInRhbmdlbnRJbXB1bHNlcyIsIlBoeXNpY3NDb250YWN0IiwicHJvdG90eXBlIiwiaW5pdCIsImIyY29udGFjdCIsImNvbGxpZGVyQSIsIkdldEZpeHR1cmVBIiwiY29sbGlkZXIiLCJjb2xsaWRlckIiLCJHZXRGaXh0dXJlQiIsImRpc2FibGVkIiwiZGlzYWJsZWRPbmNlIiwiX2ltcHVsc2UiLCJfaW52ZXJ0ZWQiLCJfYjJjb250YWN0IiwiX2NvbnRhY3QiLCJyZXNldCIsInNldFRhbmdlbnRTcGVlZCIsInJlc2V0RnJpY3Rpb24iLCJyZXNldFJlc3RpdHV0aW9uIiwiZ2V0V29ybGRNYW5pZm9sZCIsIkdldFdvcmxkTWFuaWZvbGQiLCJiMnBvaW50cyIsImIyc2VwYXJhdGlvbnMiLCJjb3VudCIsIkdldE1hbmlmb2xkIiwicG9pbnRDb3VudCIsImxlbmd0aCIsImkiLCJwIiwieCIsInkiLCJnZXRNYW5pZm9sZCIsImIycCIsIlkiLCJnZXRJbXB1bHNlIiwiYjJpbXB1bHNlIiwiZW1pdCIsImNvbnRhY3RUeXBlIiwiZnVuYyIsIkJFR0lOX0NPTlRBQ1QiLCJFTkRfQ09OVEFDVCIsIlBSRV9TT0xWRSIsIlBPU1RfU09MVkUiLCJib2R5QSIsImJvZHkiLCJib2R5QiIsImNvbXBzIiwibCIsImNvbXAiLCJlbmFibGVkQ29udGFjdExpc3RlbmVyIiwibm9kZSIsIl9jb21wb25lbnRzIiwic2V0RW5hYmxlZCIsImdldCIsImMiLCJwb3AiLCJwdXQiLCJwdXNoIiwiX3AiLCJ2YWx1ZSIsIlNldEVuYWJsZWQiLCJpc1RvdWNoaW5nIiwiSXNUb3VjaGluZyIsIlNldFRhbmdlbnRTcGVlZCIsImdldFRhbmdlbnRTcGVlZCIsIkdldFRhbmdlbnRTcGVlZCIsInNldEZyaWN0aW9uIiwiU2V0RnJpY3Rpb24iLCJnZXRGcmljdGlvbiIsIkdldEZyaWN0aW9uIiwiUmVzZXRGcmljdGlvbiIsInNldFJlc3RpdHV0aW9uIiwiU2V0UmVzdGl0dXRpb24iLCJnZXRSZXN0aXR1dGlvbiIsIkdldFJlc3RpdHV0aW9uIiwiUmVzZXRSZXN0aXR1dGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGtCQUFELENBQVAsQ0FBNEJELFNBQTVDOztBQUNBLElBQUlFLFdBQVcsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBQVAsQ0FBNEJDLFdBQTlDOztBQUVBLElBQUlDLEtBQUssR0FBRyxFQUFaLEVBR0E7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHLENBQUNDLEVBQUUsQ0FBQ0MsRUFBSCxFQUFELEVBQVVELEVBQUUsQ0FBQ0MsRUFBSCxFQUFWLENBQWpCO0FBRUEsSUFBSUMsZUFBZSxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsYUFBUCxFQUF0QjtBQUVBOzs7O0FBR0EsSUFBSUMsYUFBYSxHQUFHO0FBRWhCOzs7Ozs7O0FBT0FDLEVBQUFBLE1BQU0sRUFBRSxFQVRROztBQVdoQjs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsRUFBRSxFQWpCRzs7QUFtQmhCOzs7Ozs7O0FBT0FD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QUNVLFdBQUgsR0FBaUIsWUFBWTtBQUN6QixTQUFPLEtBQUt2RCxVQUFMLENBQWdCd0QsV0FBaEIsRUFBUDtBQUNILENBRkQ7QUFHQTs7Ozs7Ozs7O0FBT0FYLEVBQUUsQ0FBQ3pDLGFBQUgsR0FBbUIsWUFBWTtBQUMzQixTQUFPLEtBQUtKLFVBQUwsQ0FBZ0J5RCxhQUFoQixFQUFQO0FBQ0gsQ0FGRDtBQUdBOzs7Ozs7Ozs7O0FBUUFaLEVBQUUsQ0FBQ2EsY0FBSCxHQUFvQixVQUFVWixLQUFWLEVBQWlCO0FBQ2pDLE9BQUs5QyxVQUFMLENBQWdCMkQsY0FBaEIsQ0FBK0JiLEtBQS9CO0FBQ0gsQ0FGRDtBQUdBOzs7Ozs7Ozs7O0FBUUFELEVBQUUsQ0FBQ2UsY0FBSCxHQUFvQixZQUFZO0FBQzVCLFNBQU8sS0FBSzVELFVBQUwsQ0FBZ0I2RCxjQUFoQixFQUFQO0FBQ0gsQ0FGRDtBQUdBOzs7Ozs7Ozs7QUFPQWhCLEVBQUUsQ0FBQ3hDLGdCQUFILEdBQXNCLFlBQVk7QUFDOUIsU0FBTyxLQUFLTCxVQUFMLENBQWdCOEQsZ0JBQWhCLEVBQVA7QUFDSCxDQUZEOztBQUlBM0UsY0FBYyxDQUFDekIsV0FBZixHQUE2QkEsV0FBN0I7QUFDQUcsRUFBRSxDQUFDc0IsY0FBSCxHQUFvQjRFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdFLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcbnZhciBDb250YWN0VHlwZSA9IHJlcXVpcmUoJy4vQ0NQaHlzaWNzVHlwZXMnKS5Db250YWN0VHlwZTtcblxudmFyIHBvb2xzID0gW107XG5cblxuLy8gdGVtcCB3b3JsZCBtYW5pZm9sZFxudmFyIHBvaW50Q2FjaGUgPSBbY2MudjIoKSwgY2MudjIoKV07XG5cbnZhciBiMndvcmxkbWFuaWZvbGQgPSBuZXcgYjIuV29ybGRNYW5pZm9sZCgpO1xuXG4vKipcbiAqIEBjbGFzcyBXb3JsZE1hbmlmb2xkXG4gKi9cbnZhciB3b3JsZG1hbmlmb2xkID0ge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIHdvcmxkIGNvbnRhY3QgcG9pbnQgKHBvaW50IG9mIGludGVyc2VjdGlvbilcbiAgICAgKiAhI3poXG4gICAgICog56Kw5pKe54K56ZuG5ZCIXG4gICAgICogQHByb3BlcnR5IHtbVmVjMl19IHBvaW50c1xuICAgICAqL1xuICAgIHBvaW50czogW10sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogYSBuZWdhdGl2ZSB2YWx1ZSBpbmRpY2F0ZXMgb3ZlcmxhcFxuICAgICAqICEjemhcbiAgICAgKiDkuIDkuKrotJ/mlbDvvIznlKjkuo7mjIfmmI7ph43lj6DnmoTpg6jliIZcbiAgICAgKi9cbiAgICBzZXBhcmF0aW9uczogW10sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogd29ybGQgdmVjdG9yIHBvaW50aW5nIGZyb20gQSB0byBCXG4gICAgICogISN6aFxuICAgICAqIOS4lueVjOWdkOagh+ezu+S4i+eUsSBBIOaMh+WQkSBCIOeahOWQkemHj1xuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbm9ybWFsXG4gICAgICovXG4gICAgbm9ybWFsOiBjYy52MigpXG59O1xuXG4vKipcbiAqICEjZW5cbiAqIEEgbWFuaWZvbGQgcG9pbnQgaXMgYSBjb250YWN0IHBvaW50IGJlbG9uZ2luZyB0byBhIGNvbnRhY3QgbWFuaWZvbGQuIFxuICogSXQgaG9sZHMgZGV0YWlscyByZWxhdGVkIHRvIHRoZSBnZW9tZXRyeSBhbmQgZHluYW1pY3Mgb2YgdGhlIGNvbnRhY3QgcG9pbnRzLlxuICogTm90ZTogdGhlIGltcHVsc2VzIGFyZSB1c2VkIGZvciBpbnRlcm5hbCBjYWNoaW5nIGFuZCBtYXkgbm90XG4gKiBwcm92aWRlIHJlbGlhYmxlIGNvbnRhY3QgZm9yY2VzLCBlc3BlY2lhbGx5IGZvciBoaWdoIHNwZWVkIGNvbGxpc2lvbnMuXG4gKiAhI3poXG4gKiBNYW5pZm9sZFBvaW50IOaYr+aOpeinpuS/oeaBr+S4reeahOaOpeinpueCueS/oeaBr+OAguWug+aLpeacieWFs+S6juWHoOS9leWSjOaOpeinpueCueeahOivpue7huS/oeaBr+OAglxuICog5rOo5oSP77ya5L+h5oGv5Lit55qE5Yay6YeP55So5LqO57O757uf5YaF6YOo57yT5a2Y77yM5o+Q5L6b55qE5o6l6Kem5Yqb5Y+v6IO95LiN5piv5b6I5YeG56Gu77yM54m55Yir5piv6auY6YCf56e75Yqo5Lit55qE56Kw5pKe5L+h5oGv44CCXG4gKiBAY2xhc3MgTWFuaWZvbGRQb2ludFxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBsb2NhbCBwb2ludCB1c2FnZSBkZXBlbmRzIG9uIHRoZSBtYW5pZm9sZCB0eXBlOlxuICogLWVfY2lyY2xlczogdGhlIGxvY2FsIGNlbnRlciBvZiBjaXJjbGVCXG4gKiAtZV9mYWNlQTogdGhlIGxvY2FsIGNlbnRlciBvZiBjaXJjbGVCIG9yIHRoZSBjbGlwIHBvaW50IG9mIHBvbHlnb25CXG4gKiAtZV9mYWNlQjogdGhlIGNsaXAgcG9pbnQgb2YgcG9seWdvbkFcbiAqICEjemhcbiAqIOacrOWcsOWdkOagh+eCueeahOeUqOmAlOWPluWGs+S6jiBtYW5pZm9sZCDnmoTnsbvlnotcbiAqIC0gZV9jaXJjbGVzOiBjaXJjbGVCIOeahOacrOWcsOS4reW/g+eCuVxuICogLSBlX2ZhY2VBOiBjaXJjbGVCIOeahOacrOWcsOS4reW/g+eCuSDmiJbogIXmmK8gcG9seWdvbkIg55qE5oiq5Y+W54K5XG4gKiAtIGVfZmFjZUI6IHBvbHlnb25CIOeahOaIquWPlueCuVxuICogQHByb3BlcnR5IHtWZWMyfSBsb2NhbFBvaW50XG4gKi9cbi8qKlxuICogISNlblxuICogTm9ybWFsIGltcHVsc2UuXG4gKiAhI3poXG4gKiDms5Xnur/lhrLph4/jgIJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBub3JtYWxJbXB1bHNlXG4gKi9cbi8qKlxuICogISNlblxuICogVGFuZ2VudCBpbXB1bHNlLlxuICogISN6aFxuICog5YiH57q/5Yay6YeP44CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gdGFuZ2VudEltcHVsc2VcbiAqL1xuZnVuY3Rpb24gTWFuaWZvbGRQb2ludCAoKSB7XG4gICAgdGhpcy5sb2NhbFBvaW50ID0gY2MudjIoKTtcbiAgICB0aGlzLm5vcm1hbEltcHVsc2UgPSAwO1xuICAgIHRoaXMudGFuZ2VudEltcHVsc2UgPSAwO1xufVxuXG52YXIgbWFuaWZvbGRQb2ludENhY2hlID0gW25ldyBNYW5pZm9sZFBvaW50KCksIG5ldyBNYW5pZm9sZFBvaW50KCldO1xuXG52YXIgYjJtYW5pZm9sZCA9IG5ldyBiMi5NYW5pZm9sZCgpO1xuXG4vKipcbiAqIEBjbGFzcyBNYW5pZm9sZFxuICovXG52YXIgbWFuaWZvbGQgPSB7XG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE1hbmlmb2xkIHR5cGUgOiAgMDogZV9jaXJjbGVzLCAxOiBlX2ZhY2VBLCAyOiBlX2ZhY2VCXG4gICAgICogISN6aFxuICAgICAqIE1hbmlmb2xkIOexu+WeiyA6ICAwOiBlX2NpcmNsZXMsIDE6IGVfZmFjZUEsIDI6IGVfZmFjZUJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdHlwZVxuICAgICAqL1xuICAgIHR5cGU6IDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGxvY2FsIHBvaW50IHVzYWdlIGRlcGVuZHMgb24gdGhlIG1hbmlmb2xkIHR5cGU6XG4gICAgICogLWVfY2lyY2xlczogdGhlIGxvY2FsIGNlbnRlciBvZiBjaXJjbGVBXG4gICAgICogLWVfZmFjZUE6IHRoZSBjZW50ZXIgb2YgZmFjZUFcbiAgICAgKiAtZV9mYWNlQjogdGhlIGNlbnRlciBvZiBmYWNlQlxuICAgICAqICEjemhcbiAgICAgKiDnlKjpgJTlj5blhrPkuo4gbWFuaWZvbGQg57G75Z6LXG4gICAgICogLWVfY2lyY2xlczogY2lyY2xlQSDnmoTmnKzlnLDkuK3lv4PngrlcbiAgICAgKiAtZV9mYWNlQTogZmFjZUEg55qE5pys5Zyw5Lit5b+D54K5XG4gICAgICogLWVfZmFjZUI6IGZhY2VCIOeahOacrOWcsOS4reW/g+eCuVxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbG9jYWxQb2ludFxuICAgICAqL1xuICAgIGxvY2FsUG9pbnQ6IGNjLnYyKCksXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIC1lX2NpcmNsZXM6IG5vdCB1c2VkXG4gICAgICogLWVfZmFjZUE6IHRoZSBub3JtYWwgb24gcG9seWdvbkFcbiAgICAgKiAtZV9mYWNlQjogdGhlIG5vcm1hbCBvbiBwb2x5Z29uQlxuICAgICAqICEjemhcbiAgICAgKiAtZV9jaXJjbGVzOiDmsqHooqvkvb/nlKjliLBcbiAgICAgKiAtZV9mYWNlQTogcG9seWdvbkEg55qE5rOV5ZCR6YePXG4gICAgICogLWVfZmFjZUI6IHBvbHlnb25CIOeahOazleWQkemHj1xuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbG9jYWxOb3JtYWxcbiAgICAgKi9cbiAgICBsb2NhbE5vcm1hbDogY2MudjIoKSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiB0aGUgcG9pbnRzIG9mIGNvbnRhY3QuXG4gICAgICogISN6aFxuICAgICAqIOaOpeinpueCueS/oeaBr+OAglxuICAgICAqIEBwcm9wZXJ0eSB7W01hbmlmb2xkUG9pbnRdfSBwb2ludHNcbiAgICAgKi9cbiAgICBwb2ludHM6IFtdXG59O1xuXG4vKipcbiAqICEjZW5cbiAqIENvbnRhY3QgaW1wdWxzZXMgZm9yIHJlcG9ydGluZy5cbiAqICEjemhcbiAqIOeUqOS6jui/lOWbnue7meWbnuiwg+eahOaOpeinpuWGsumHj+OAglxuICogQGNsYXNzIFBoeXNpY3NJbXB1bHNlXG4gKi9cbnZhciBpbXB1bHNlID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBOb3JtYWwgaW1wdWxzZXMuXG4gICAgICogISN6aFxuICAgICAqIOazlee6v+aWueWQkeeahOWGsumHj1xuICAgICAqIEBwcm9wZXJ0eSBub3JtYWxJbXB1bHNlc1xuICAgICAqL1xuICAgIG5vcm1hbEltcHVsc2VzOiBbXSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGFuZ2VudCBpbXB1bHNlc1xuICAgICAqICEjemhcbiAgICAgKiDliIfnur/mlrnlkJHnmoTlhrLph49cbiAgICAgKiBAcHJvcGVydHkgdGFuZ2VudEltcHVsc2VzXG4gICAgICovXG4gICAgdGFuZ2VudEltcHVsc2VzOiBbXVxufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBQaHlzaWNzQ29udGFjdCB3aWxsIGJlIGdlbmVyYXRlZCBkdXJpbmcgYmVnaW4gYW5kIGVuZCBjb2xsaXNpb24gYXMgYSBwYXJhbWV0ZXIgb2YgdGhlIGNvbGxpc2lvbiBjYWxsYmFjay5cbiAqIE5vdGUgdGhhdCBjb250YWN0cyB3aWxsIGJlIHJldXNlZCBmb3Igc3BlZWQgdXAgY3B1IHRpbWUsIHNvIGRvIG5vdCBjYWNoZSBhbnl0aGluZyBpbiB0aGUgY29udGFjdC5cbiAqICEjemhcbiAqIOeJqeeQhuaOpeinpuS8muWcqOW8gOWni+WSjOe7k+adn+eisOaSnuS5i+mXtOeUn+aIkO+8jOW5tuS9nOS4uuWPguaVsOS8oOWFpeWIsOeisOaSnuWbnuiwg+WHveaVsOS4reOAglxuICog5rOo5oSP77ya5Lyg5YWl55qE54mp55CG5o6l6Kem5Lya6KKr57O757uf6L+b6KGM6YeN55So77yM5omA5Lul5LiN6KaB5Zyo5L2/55So5Lit57yT5a2Y6YeM6Z2i55qE5Lu75L2V5L+h5oGv44CCXG4gKiBAY2xhc3MgUGh5c2ljc0NvbnRhY3RcbiAqL1xuZnVuY3Rpb24gUGh5c2ljc0NvbnRhY3QgKCkge1xufVxuXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcbiAgICB0aGlzLmNvbGxpZGVyQSA9IGIyY29udGFjdC5HZXRGaXh0dXJlQSgpLmNvbGxpZGVyO1xuICAgIHRoaXMuY29sbGlkZXJCID0gYjJjb250YWN0LkdldEZpeHR1cmVCKCkuY29sbGlkZXI7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZGlzYWJsZWRPbmNlID0gZmFsc2U7XG4gICAgdGhpcy5faW1wdWxzZSA9IG51bGw7XG5cbiAgICB0aGlzLl9pbnZlcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYjJjb250YWN0ID0gYjJjb250YWN0O1xuICAgIGIyY29udGFjdC5fY29udGFjdCA9IHRoaXM7XG59O1xuXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRUYW5nZW50U3BlZWQoMCk7XG4gICAgdGhpcy5yZXNldEZyaWN0aW9uKCk7XG4gICAgdGhpcy5yZXNldFJlc3RpdHV0aW9uKCk7XG5cbiAgICB0aGlzLmNvbGxpZGVyQSA9IG51bGw7XG4gICAgdGhpcy5jb2xsaWRlckIgPSBudWxsO1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9pbXB1bHNlID0gbnVsbDtcblxuICAgIHRoaXMuX2IyY29udGFjdC5fY29udGFjdCA9IG51bGw7XG4gICAgdGhpcy5fYjJjb250YWN0ID0gbnVsbDtcbn07XG5cbi8qKlxuICogISNlblxuICogR2V0IHRoZSB3b3JsZCBtYW5pZm9sZC5cbiAqICEjemhcbiAqIOiOt+WPluS4lueVjOWdkOagh+ezu+S4i+eahOeisOaSnuS/oeaBr+OAglxuICogQG1ldGhvZCBnZXRXb3JsZE1hbmlmb2xkXG4gKiBAcmV0dXJuIHtXb3JsZE1hbmlmb2xkfVxuICovXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUuZ2V0V29ybGRNYW5pZm9sZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcG9pbnRzID0gd29ybGRtYW5pZm9sZC5wb2ludHM7XG4gICAgdmFyIHNlcGFyYXRpb25zID0gd29ybGRtYW5pZm9sZC5zZXBhcmF0aW9ucztcbiAgICB2YXIgbm9ybWFsID0gd29ybGRtYW5pZm9sZC5ub3JtYWw7XG5cbiAgICB0aGlzLl9iMmNvbnRhY3QuR2V0V29ybGRNYW5pZm9sZChiMndvcmxkbWFuaWZvbGQpO1xuICAgIHZhciBiMnBvaW50cyA9IGIyd29ybGRtYW5pZm9sZC5wb2ludHM7XG4gICAgdmFyIGIyc2VwYXJhdGlvbnMgPSBiMndvcmxkbWFuaWZvbGQuc2VwYXJhdGlvbnM7XG5cbiAgICB2YXIgY291bnQgPSB0aGlzLl9iMmNvbnRhY3QuR2V0TWFuaWZvbGQoKS5wb2ludENvdW50O1xuICAgIHBvaW50cy5sZW5ndGggPSBzZXBhcmF0aW9ucy5sZW5ndGggPSBjb3VudDtcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgdmFyIHAgPSBwb2ludENhY2hlW2ldO1xuICAgICAgICBwLnggPSBiMnBvaW50c1tpXS54ICogUFRNX1JBVElPO1xuICAgICAgICBwLnkgPSBiMnBvaW50c1tpXS55ICogUFRNX1JBVElPO1xuICAgICAgICBcbiAgICAgICAgcG9pbnRzW2ldID0gcDtcbiAgICAgICAgc2VwYXJhdGlvbnNbaV0gPSBiMnNlcGFyYXRpb25zW2ldICogUFRNX1JBVElPO1xuICAgIH1cblxuICAgIG5vcm1hbC54ID0gYjJ3b3JsZG1hbmlmb2xkLm5vcm1hbC54O1xuICAgIG5vcm1hbC55ID0gYjJ3b3JsZG1hbmlmb2xkLm5vcm1hbC55O1xuXG4gICAgaWYgKHRoaXMuX2ludmVydGVkKSB7XG4gICAgICAgIG5vcm1hbC54ICo9IC0xO1xuICAgICAgICBub3JtYWwueSAqPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gd29ybGRtYW5pZm9sZDtcbn07XG5cbi8qKlxuICogISNlblxuICogR2V0IHRoZSBtYW5pZm9sZC5cbiAqICEjemhcbiAqIOiOt+WPluacrOWcsO+8iOWxgOmDqO+8ieWdkOagh+ezu+S4i+eahOeisOaSnuS/oeaBr+OAglxuICogQG1ldGhvZCBnZXRNYW5pZm9sZFxuICogQHJldHVybiB7TWFuaWZvbGR9XG4gKi9cblBoeXNpY3NDb250YWN0LnByb3RvdHlwZS5nZXRNYW5pZm9sZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcG9pbnRzID0gbWFuaWZvbGQucG9pbnRzO1xuICAgIHZhciBsb2NhbE5vcm1hbCA9IG1hbmlmb2xkLmxvY2FsTm9ybWFsO1xuICAgIHZhciBsb2NhbFBvaW50ID0gbWFuaWZvbGQubG9jYWxQb2ludDtcbiAgICBcbiAgICB2YXIgYjJtYW5pZm9sZCA9IHRoaXMuX2IyY29udGFjdC5HZXRNYW5pZm9sZCgpO1xuICAgIHZhciBiMnBvaW50cyA9IGIybWFuaWZvbGQucG9pbnRzO1xuICAgIHZhciBjb3VudCA9IHBvaW50cy5sZW5ndGggPSBiMm1hbmlmb2xkLnBvaW50Q291bnQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgdmFyIHAgPSBtYW5pZm9sZFBvaW50Q2FjaGVbaV07XG4gICAgICAgIHZhciBiMnAgPSBiMnBvaW50c1tpXTtcbiAgICAgICAgcC5sb2NhbFBvaW50LnggPSBiMnAubG9jYWxQb2ludC54ICogUFRNX1JBVElPO1xuICAgICAgICBwLmxvY2FsUG9pbnQuWSA9IGIycC5sb2NhbFBvaW50LlkgKiBQVE1fUkFUSU87XG4gICAgICAgIHAubm9ybWFsSW1wdWxzZSA9IGIycC5ub3JtYWxJbXB1bHNlICogUFRNX1JBVElPO1xuICAgICAgICBwLnRhbmdlbnRJbXB1bHNlID0gYjJwLnRhbmdlbnRJbXB1bHNlO1xuXG4gICAgICAgIHBvaW50c1tpXSA9IHA7XG4gICAgfVxuXG4gICAgbG9jYWxQb2ludC54ID0gYjJtYW5pZm9sZC5sb2NhbFBvaW50LnggKiBQVE1fUkFUSU87XG4gICAgbG9jYWxQb2ludC55ID0gYjJtYW5pZm9sZC5sb2NhbFBvaW50LnkgKiBQVE1fUkFUSU87XG4gICAgbG9jYWxOb3JtYWwueCA9IGIybWFuaWZvbGQubG9jYWxOb3JtYWwueDtcbiAgICBsb2NhbE5vcm1hbC55ID0gYjJtYW5pZm9sZC5sb2NhbE5vcm1hbC55O1xuICAgIG1hbmlmb2xkLnR5cGUgPSBiMm1hbmlmb2xkLnR5cGU7XG5cbiAgICBpZiAodGhpcy5faW52ZXJ0ZWQpIHtcbiAgICAgICAgbG9jYWxOb3JtYWwueCAqPSAtMTtcbiAgICAgICAgbG9jYWxOb3JtYWwueSAqPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFuaWZvbGQ7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIEdldCB0aGUgaW1wdWxzZXMuXG4gKiBOb3RlOiBQaHlzaWNzSW1wdWxzZSBjYW4gb25seSB1c2VkIGluIG9uUG9zdFNvbHZlIGNhbGxiYWNrLlxuICogISN6aFxuICog6I635Y+W5Yay6YeP5L+h5oGvXG4gKiDms6jmhI/vvJrov5nkuKrkv6Hmga/lj6rmnInlnKggb25Qb3N0U29sdmUg5Zue6LCD5Lit5omN6IO96I635Y+W5YiwXG4gKiBAbWV0aG9kIGdldEltcHVsc2VcbiAqIEByZXR1cm4ge1BoeXNpY3NJbXB1bHNlfVxuICovXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUuZ2V0SW1wdWxzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYjJpbXB1bHNlID0gdGhpcy5faW1wdWxzZTtcbiAgICBpZiAoIWIyaW1wdWxzZSkgcmV0dXJuIG51bGw7XG5cbiAgICB2YXIgbm9ybWFsSW1wdWxzZXMgPSBpbXB1bHNlLm5vcm1hbEltcHVsc2VzO1xuICAgIHZhciB0YW5nZW50SW1wdWxzZXMgPSBpbXB1bHNlLnRhbmdlbnRJbXB1bHNlcztcbiAgICB2YXIgY291bnQgPSBiMmltcHVsc2UuY291bnQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIG5vcm1hbEltcHVsc2VzW2ldID0gYjJpbXB1bHNlLm5vcm1hbEltcHVsc2VzW2ldICogUFRNX1JBVElPO1xuICAgICAgICB0YW5nZW50SW1wdWxzZXNbaV0gPSBiMmltcHVsc2UudGFuZ2VudEltcHVsc2VzW2ldO1xuICAgIH1cblxuICAgIHRhbmdlbnRJbXB1bHNlcy5sZW5ndGggPSBub3JtYWxJbXB1bHNlcy5sZW5ndGggPSBjb3VudDtcblxuICAgIHJldHVybiBpbXB1bHNlO1xufTtcblxuUGh5c2ljc0NvbnRhY3QucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoY29udGFjdFR5cGUpIHtcbiAgICB2YXIgZnVuYztcbiAgICBzd2l0Y2ggKGNvbnRhY3RUeXBlKSB7XG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuQkVHSU5fQ09OVEFDVDpcbiAgICAgICAgICAgIGZ1bmMgPSAnb25CZWdpbkNvbnRhY3QnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuRU5EX0NPTlRBQ1Q6XG4gICAgICAgICAgICBmdW5jID0gJ29uRW5kQ29udGFjdCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb250YWN0VHlwZS5QUkVfU09MVkU6XG4gICAgICAgICAgICBmdW5jID0gJ29uUHJlU29sdmUnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuUE9TVF9TT0xWRTpcbiAgICAgICAgICAgIGZ1bmMgPSAnb25Qb3N0U29sdmUnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGNvbGxpZGVyQSA9IHRoaXMuY29sbGlkZXJBO1xuICAgIHZhciBjb2xsaWRlckIgPSB0aGlzLmNvbGxpZGVyQjtcblxuICAgIHZhciBib2R5QSA9IGNvbGxpZGVyQS5ib2R5O1xuICAgIHZhciBib2R5QiA9IGNvbGxpZGVyQi5ib2R5O1xuXG4gICAgdmFyIGNvbXBzO1xuICAgIHZhciBpLCBsLCBjb21wO1xuXG4gICAgaWYgKGJvZHlBLmVuYWJsZWRDb250YWN0TGlzdGVuZXIpIHtcbiAgICAgICAgY29tcHMgPSBib2R5QS5ub2RlLl9jb21wb25lbnRzO1xuICAgICAgICB0aGlzLl9pbnZlcnRlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gY29tcHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBjb21wID0gY29tcHNbaV07XG4gICAgICAgICAgICBpZiAoY29tcFtmdW5jXSkge1xuICAgICAgICAgICAgICAgIGNvbXBbZnVuY10odGhpcywgY29sbGlkZXJBLCBjb2xsaWRlckIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJvZHlCLmVuYWJsZWRDb250YWN0TGlzdGVuZXIpIHtcbiAgICAgICAgY29tcHMgPSBib2R5Qi5ub2RlLl9jb21wb25lbnRzO1xuICAgICAgICB0aGlzLl9pbnZlcnRlZCA9IHRydWU7XG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBjb21wcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGNvbXAgPSBjb21wc1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wW2Z1bmNdKSB7XG4gICAgICAgICAgICAgICAgY29tcFtmdW5jXSh0aGlzLCBjb2xsaWRlckIsIGNvbGxpZGVyQSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVkT25jZSkge1xuICAgICAgICB0aGlzLnNldEVuYWJsZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLmRpc2FibGVkT25jZSA9IGZhbHNlO1xuICAgIH1cbn07XG5cblBoeXNpY3NDb250YWN0LmdldCA9IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcbiAgICB2YXIgYztcbiAgICBpZiAocG9vbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGMgPSBuZXcgY2MuUGh5c2ljc0NvbnRhY3QoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGMgPSBwb29scy5wb3AoKTsgXG4gICAgfVxuXG4gICAgYy5pbml0KGIyY29udGFjdCk7XG4gICAgcmV0dXJuIGM7XG59O1xuXG5QaHlzaWNzQ29udGFjdC5wdXQgPSBmdW5jdGlvbiAoYjJjb250YWN0KSB7XG4gICAgdmFyIGMgPSBiMmNvbnRhY3QuX2NvbnRhY3Q7XG4gICAgaWYgKCFjKSByZXR1cm47XG4gICAgXG4gICAgcG9vbHMucHVzaChjKTtcbiAgICBjLnJlc2V0KCk7XG59O1xuXG5cbnZhciBfcCA9IFBoeXNpY3NDb250YWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiAhI2VuXG4gKiBPbmUgb2YgdGhlIGNvbGxpZGVyIHRoYXQgY29sbGlkZWRcbiAqICEjemhcbiAqIOWPkeeUn+eisOaSnueahOeisOaSnuS9k+S5i+S4gFxuICogQHByb3BlcnR5IHtDb2xsaWRlcn0gY29sbGlkZXJBXG4gKi9cbi8qKlxuICogISNlblxuICogT25lIG9mIHRoZSBjb2xsaWRlciB0aGF0IGNvbGxpZGVkXG4gKiAhI3poXG4gKiDlj5HnlJ/norDmkp7nmoTnorDmkp7kvZPkuYvkuIBcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJ9IGNvbGxpZGVyQlxuICovXG4vKipcbiAqICEjZW5cbiAqIElmIHNldCBkaXNhYmxlZCB0byB0cnVlLCB0aGUgY29udGFjdCB3aWxsIGJlIGlnbm9yZWQgdW50aWwgY29udGFjdCBlbmQuXG4gKiBJZiB5b3UganVzdCB3YW50IHRvIGRpc2FibGVkIGNvbnRhY3QgZm9yIGN1cnJlbnQgdGltZSBzdGVwIG9yIHN1Yi1zdGVwLCBwbGVhc2UgdXNlIGRpc2FibGVkT25jZS5cbiAqICEjemhcbiAqIOWmguaenCBkaXNhYmxlZCDooqvorr7nva7kuLogdHJ1Ze+8jOmCo+S5iOebtOWIsOaOpeinpue7k+adn+atpOaOpeinpumDveWwhuiiq+W/veeVpeOAglxuICog5aaC5p6c5Y+q5piv5biM5pyb5Zyo5b2T5YmN5pe26Ze05q2l5oiW5a2Q5q2l5Lit5b+955Wl5q2k5o6l6Kem77yM6K+35L2/55SoIGRpc2FibGVkT25jZSDjgIJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGlzYWJsZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBEaXNhYmxlZCBjb250YWN0IGZvciBjdXJyZW50IHRpbWUgc3RlcCBvciBzdWItc3RlcC5cbiAqICEjemhcbiAqIOWcqOW9k+WJjeaXtumXtOatpeaIluWtkOatpeS4reW/veeVpeatpOaOpeinpuOAglxuICogQHByb3BlcnR5IHtCb29sZWFufSBkaXNhYmxlZE9uY2VcbiAqL1xuX3Auc2V0RW5hYmxlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX2IyY29udGFjdC5TZXRFbmFibGVkKHZhbHVlKTtcbn07XG5cbi8qKlxuICogISNlblxuICogSXMgdGhpcyBjb250YWN0IHRvdWNoaW5nP1xuICogISN6aFxuICog6L+U5Zue56Kw5pKe5L2T5piv5ZCm5bey57uP5o6l6Kem5Yiw44CCXG4gKiBAbWV0aG9kIGlzVG91Y2hpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbl9wLmlzVG91Y2hpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2IyY29udGFjdC5Jc1RvdWNoaW5nKCk7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFNldCB0aGUgZGVzaXJlZCB0YW5nZW50IHNwZWVkIGZvciBhIGNvbnZleW9yIGJlbHQgYmVoYXZpb3IuXG4gKiAhI3poXG4gKiDkuLrkvKDpgIHluKborr7nva7mnJ/mnJvnmoTliIfnur/pgJ/luqZcbiAqIEBtZXRob2Qgc2V0VGFuZ2VudFNwZWVkXG4gKiBAcGFyYW0ge051bWJlcn0gdGFuZ2VudFNwZWVkXG4gKi9cbl9wLnNldFRhbmdlbnRTcGVlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX2IyY29udGFjdC5TZXRUYW5nZW50U3BlZWQodmFsdWUgLyBQVE1fUkFUSU8pO1xufTtcbi8qKlxuICogISNlblxuICogR2V0IHRoZSBkZXNpcmVkIHRhbmdlbnQgc3BlZWQuXG4gKiAhI3poXG4gKiDojrflj5bliIfnur/pgJ/luqZcbiAqIEBtZXRob2QgZ2V0VGFuZ2VudFNwZWVkXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cblxuX3AuZ2V0VGFuZ2VudFNwZWVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9iMmNvbnRhY3QuR2V0VGFuZ2VudFNwZWVkKCkgKiBQVE1fUkFUSU87XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZyaWN0aW9uIG1peHR1cmUuIFlvdSBjYW4gY2FsbCB0aGlzIGluIG9uUHJlU29sdmUgY2FsbGJhY2suXG4gKiAhI3poXG4gKiDopobnm5bpu5jorqTnmoTmkanmk6blipvns7vmlbDjgILkvaDlj6/ku6XlnKggb25QcmVTb2x2ZSDlm57osIPkuK3osIPnlKjmraTlh73mlbDjgIJcbiAqIEBtZXRob2Qgc2V0RnJpY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBmcmljdGlvblxuICovXG5fcC5zZXRGcmljdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX2IyY29udGFjdC5TZXRGcmljdGlvbih2YWx1ZSk7XG59O1xuLyoqXG4gKiAhI2VuXG4gKiBHZXQgdGhlIGZyaWN0aW9uLlxuICogISN6aFxuICog6I635Y+W5b2T5YmN5pGp5pOm5Yqb57O75pWwXG4gKiBAbWV0aG9kIGdldEZyaWN0aW9uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbl9wLmdldEZyaWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9iMmNvbnRhY3QuR2V0RnJpY3Rpb24oKTtcbn07XG4vKipcbiAqICEjZW5cbiAqIFJlc2V0IHRoZSBmcmljdGlvbiBtaXh0dXJlIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxuICogISN6aFxuICog6YeN572u5pGp5pOm5Yqb57O75pWw5Yiw6buY6K6k5YC8XG4gKiBAbWV0aG9kIHJlc2V0RnJpY3Rpb25cbiAqL1xuX3AucmVzZXRGcmljdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYjJjb250YWN0LlJlc2V0RnJpY3Rpb24oKTtcbn07XG4vKipcbiAqICEjZW5cbiAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IHJlc3RpdHV0aW9uIG1peHR1cmUuIFlvdSBjYW4gY2FsbCB0aGlzIGluIG9uUHJlU29sdmUgY2FsbGJhY2suXG4gKiAhI3poXG4gKiDopobnm5bpu5jorqTnmoTmgaLlpI3ns7vmlbDjgILkvaDlj6/ku6XlnKggb25QcmVTb2x2ZSDlm57osIPkuK3osIPnlKjmraTlh73mlbDjgIJcbiAqIEBtZXRob2Qgc2V0UmVzdGl0dXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSByZXN0aXR1dGlvblxuICovXG5fcC5zZXRSZXN0aXR1dGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuX2IyY29udGFjdC5TZXRSZXN0aXR1dGlvbih2YWx1ZSk7XG59O1xuLyoqXG4gKiAhI2VuXG4gKiBHZXQgdGhlIHJlc3RpdHV0aW9uLlxuICogISN6aFxuICog6I635Y+W5b2T5YmN5oGi5aSN57O75pWwXG4gKiBAbWV0aG9kIGdldFJlc3RpdHV0aW9uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbl9wLmdldFJlc3RpdHV0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9iMmNvbnRhY3QuR2V0UmVzdGl0dXRpb24oKTtcbn07XG4vKipcbiAqICEjZW5cbiAqIFJlc2V0IHRoZSByZXN0aXR1dGlvbiBtaXh0dXJlIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxuICogISN6aFxuICog6YeN572u5oGi5aSN57O75pWw5Yiw6buY6K6k5YC8XG4gKiBAbWV0aG9kIHJlc2V0UmVzdGl0dXRpb25cbiAqL1xuX3AucmVzZXRSZXN0aXR1dGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYjJjb250YWN0LlJlc2V0UmVzdGl0dXRpb24oKTtcbn07XG5cblBoeXNpY3NDb250YWN0LkNvbnRhY3RUeXBlID0gQ29udGFjdFR5cGU7XG5jYy5QaHlzaWNzQ29udGFjdCA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0NvbnRhY3Q7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==