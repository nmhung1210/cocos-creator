
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCPhysicsManager.js';
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
var PhysicsTypes = require('./CCPhysicsTypes');

var ContactType = PhysicsTypes.ContactType;
var BodyType = PhysicsTypes.BodyType;
var RayCastType = PhysicsTypes.RayCastType;
var DrawBits = PhysicsTypes.DrawBits;
var PTM_RATIO = PhysicsTypes.PTM_RATIO;
var ANGLE_TO_PHYSICS_ANGLE = PhysicsTypes.ANGLE_TO_PHYSICS_ANGLE;
var PHYSICS_ANGLE_TO_ANGLE = PhysicsTypes.PHYSICS_ANGLE_TO_ANGLE;

var convertToNodeRotation = require('./utils').convertToNodeRotation;

var DebugDraw = require('./platform/CCPhysicsDebugDraw');

var b2_aabb_tmp = new b2.AABB();
var b2_vec2_tmp1 = new b2.Vec2();
var b2_vec2_tmp2 = new b2.Vec2();
var vec2_tmp = cc.v2();
/**
 * !#en
 * Physics manager uses box2d as the inner physics system, and hide most box2d implement details(creating rigidbody, synchronize rigidbody info to node).
 * You can visit some common box2d function through physics manager(hit testing, raycast, debug info).
 * Physics manager distributes the collision information to each collision callback when collision is produced.
 * Note: You need first enable the collision listener in the rigidbody.
 * !#zh
 * 物理系统将 box2d 作为内部物理系统，并且隐藏了大部分 box2d 实现细节（比如创建刚体，同步刚体信息到节点中等）。
 * 你可以通过物理系统访问一些 box2d 常用的功能，比如点击测试，射线测试，设置测试信息等。
 * 物理系统还管理碰撞信息的分发，她会在产生碰撞时，将碰撞信息分发到各个碰撞回调中。
 * 注意：你需要先在刚体中开启碰撞接听才会产生相应的碰撞回调。<br>
 * 支持的物理系统指定绘制信息事件，请参阅 {{#crossLink "PhysicsManager.DrawBits"}}{{/crossLink}}
 * @class PhysicsManager
 * @uses EventTarget
 */

var PhysicsManager = cc.Class({
  mixins: [cc.EventTarget],
  statics: {
    DrawBits: DrawBits,

    /**
     * !#en
     * The ratio transform between physics unit and pixel unit, generally is 32.
     * !#zh
     * 物理单位与像素单位互相转换的比率，一般是 32。
     * @property {Number} PTM_RATIO
     * @static
     */
    PTM_RATIO: PTM_RATIO,

    /**
     * !#en
     * The velocity iterations for the velocity constraint solver.
     * !#zh
     * 速度更新迭代数
     * @property {Number} VELOCITY_ITERATIONS
     * @default 10
     * @static
     */
    VELOCITY_ITERATIONS: 10,

    /**
     * !#en
     * The position Iterations for the position constraint solver.
     * !#zh
     * 位置迭代更新数
     * @property {Number} POSITION_ITERATIONS
     * @default 10
     * @static
     */
    POSITION_ITERATIONS: 10,

    /**
     * !#en
     * Specify the fixed time step.
     * Need enabledAccumulator to make it work.
     * !#zh
     * 指定固定的物理更新间隔时间，需要开启 enabledAccumulator 才有效。
     * @property {Number} FIXED_TIME_STEP
     * @default 1/60
     * @static
     */
    FIXED_TIME_STEP: 1 / 60,

    /**
     * !#en
     * Specify the max accumulator time.
     * Need enabledAccumulator to make it work.
     * !#zh
     * 每次可用于更新物理系统的最大时间，需要开启 enabledAccumulator 才有效。
     * @property {Number} MAX_ACCUMULATOR
     * @default 1/5
     * @static
     */
    MAX_ACCUMULATOR: 1 / 5
  },
  ctor: function ctor() {
    this._debugDrawFlags = 0;
    this._debugDrawer = null;
    this._world = null;
    this._bodies = [];
    this._joints = [];
    this._contactMap = {};
    this._contactID = 0;
    this._delayEvents = [];
    this._accumulator = 0;
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    /**
     * !#en
     * If enabled accumulator, then will call step function with the fixed time step FIXED_TIME_STEP. 
     * And if the update dt is bigger than the time step, then will call step function several times.
     * If disabled accumulator, then will call step function with a time step calculated with the frame rate.
     * !#zh
     * 如果开启此选项，那么将会以固定的间隔时间 FIXED_TIME_STEP 来更新物理引擎，如果一个 update 的间隔时间大于 FIXED_TIME_STEP，则会对物理引擎进行多次更新。
     * 如果关闭此选项，那么将会根据设定的 frame rate 计算出一个间隔时间来更新物理引擎。
     * @property {Boolean} enabledAccumulator
     * @default false
     */

    this.enabledAccumulator = false;
  },
  pushDelayEvent: function pushDelayEvent(target, func, args) {
    if (this._steping) {
      this._delayEvents.push({
        target: target,
        func: func,
        args: args
      });
    } else {
      target[func].apply(target, args);
    }
  },
  update: function update(dt) {
    var world = this._world;
    if (!world || !this.enabled) return;
    this.emit('before-step');
    this._steping = true;
    var velocityIterations = PhysicsManager.VELOCITY_ITERATIONS;
    var positionIterations = PhysicsManager.POSITION_ITERATIONS;

    if (this.enabledAccumulator) {
      this._accumulator += dt;
      var FIXED_TIME_STEP = PhysicsManager.FIXED_TIME_STEP;
      var MAX_ACCUMULATOR = PhysicsManager.MAX_ACCUMULATOR; // max accumulator time to avoid spiral of death

      if (this._accumulator > MAX_ACCUMULATOR) {
        this._accumulator = MAX_ACCUMULATOR;
      }

      while (this._accumulator > FIXED_TIME_STEP) {
        world.Step(FIXED_TIME_STEP, velocityIterations, positionIterations);
        this._accumulator -= FIXED_TIME_STEP;
      }
    } else {
      var timeStep = 1 / cc.game.config['frameRate'];
      world.Step(timeStep, velocityIterations, positionIterations);
    }

    if (this.debugDrawFlags) {
      this._checkDebugDrawValid();

      this._debugDrawer.clear();

      world.DrawDebugData();
    }

    this._steping = false;
    var events = this._delayEvents;

    for (var i = 0, l = events.length; i < l; i++) {
      var event = events[i];
      event.target[event.func].apply(event.target, event.args);
    }

    events.length = 0;

    this._syncNode();
  },

  /**
   * !#en
   * Test which collider contains the given world point
   * !#zh
   * 获取包含给定世界坐标系点的碰撞体
   * @method testPoint
   * @param {Vec2} point - the world point
   * @return {PhysicsCollider}
   */
  testPoint: function testPoint(point) {
    var x = b2_vec2_tmp1.x = point.x / PTM_RATIO;
    var y = b2_vec2_tmp1.y = point.y / PTM_RATIO;
    var d = 0.2 / PTM_RATIO;
    b2_aabb_tmp.lowerBound.x = x - d;
    b2_aabb_tmp.lowerBound.y = y - d;
    b2_aabb_tmp.upperBound.x = x + d;
    b2_aabb_tmp.upperBound.y = y + d;
    var callback = this._aabbQueryCallback;
    callback.init(b2_vec2_tmp1);

    this._world.QueryAABB(callback, b2_aabb_tmp);

    var fixture = callback.getFixture();

    if (fixture) {
      return fixture.collider;
    }

    return null;
  },

  /**
   * !#en
   * Test which colliders intersect the given world rect
   * !#zh
   * 获取与给定世界坐标系矩形相交的碰撞体
   * @method testAABB
   * @param {Rect} rect - the world rect
   * @return {[PhysicsCollider]}
   */
  testAABB: function testAABB(rect) {
    b2_aabb_tmp.lowerBound.x = rect.xMin / PTM_RATIO;
    b2_aabb_tmp.lowerBound.y = rect.yMin / PTM_RATIO;
    b2_aabb_tmp.upperBound.x = rect.xMax / PTM_RATIO;
    b2_aabb_tmp.upperBound.y = rect.yMax / PTM_RATIO;
    var callback = this._aabbQueryCallback;
    callback.init();

    this._world.QueryAABB(callback, b2_aabb_tmp);

    var fixtures = callback.getFixtures();
    var colliders = fixtures.map(function (fixture) {
      return fixture.collider;
    });
    return colliders;
  },

  /**
   * !#en
   * Raycast the world for all colliders in the path of the ray.
   * The raycast ignores colliders that contain the starting point.
   * !#zh
   * 检测哪些碰撞体在给定射线的路径上，射线检测将忽略包含起始点的碰撞体。
   * @method rayCast
   * @param {Vec2} p1 - start point of the raycast
   * @param {Vec2} p2 - end point of the raycast
   * @param {RayCastType} type - optional, default is RayCastType.Closest
   * @return {[PhysicsRayCastResult]}
   */
  rayCast: function rayCast(p1, p2, type) {
    if (p1.equals(p2)) {
      return [];
    }

    type = type || RayCastType.Closest;
    b2_vec2_tmp1.x = p1.x / PTM_RATIO;
    b2_vec2_tmp1.y = p1.y / PTM_RATIO;
    b2_vec2_tmp2.x = p2.x / PTM_RATIO;
    b2_vec2_tmp2.y = p2.y / PTM_RATIO;
    var callback = this._raycastQueryCallback;
    callback.init(type);

    this._world.RayCast(callback, b2_vec2_tmp1, b2_vec2_tmp2);

    var fixtures = callback.getFixtures();

    if (fixtures.length > 0) {
      var points = callback.getPoints();
      var normals = callback.getNormals();
      var fractions = callback.getFractions();
      var results = [];

      for (var i = 0, l = fixtures.length; i < l; i++) {
        var fixture = fixtures[i];
        var collider = fixture.collider;

        if (type === RayCastType.AllClosest) {
          var result = results.find(function (result) {
            return result.collider === collider;
          });

          if (result) {
            if (fractions[i] < result.fraction) {
              result.fixtureIndex = collider._getFixtureIndex(fixture);
              result.point.x = points[i].x * PTM_RATIO;
              result.point.y = points[i].y * PTM_RATIO;
              result.normal.x = normals[i].x;
              result.normal.y = normals[i].y;
              result.fraction = fractions[i];
            }

            continue;
          }
        }

        results.push({
          collider: collider,
          fixtureIndex: collider._getFixtureIndex(fixture),
          point: cc.v2(points[i].x * PTM_RATIO, points[i].y * PTM_RATIO),
          normal: cc.v2(normals[i]),
          fraction: fractions[i]
        });
      }

      return results;
    }

    return [];
  },
  syncPosition: function syncPosition() {
    var bodies = this._bodies;

    for (var i = 0; i < bodies.length; i++) {
      bodies[i].syncPosition();
    }
  },
  syncRotation: function syncRotation() {
    var bodies = this._bodies;

    for (var i = 0; i < bodies.length; i++) {
      bodies[i].syncRotation();
    }
  },
  _registerContactFixture: function _registerContactFixture(fixture) {
    this._contactListener.registerContactFixture(fixture);
  },
  _unregisterContactFixture: function _unregisterContactFixture(fixture) {
    this._contactListener.unregisterContactFixture(fixture);
  },
  _addBody: function _addBody(body, bodyDef) {
    var world = this._world;
    var node = body.node;
    if (!world || !node) return;
    body._b2Body = world.CreateBody(bodyDef);
    body._b2Body.body = body;

    this._bodies.push(body);
  },
  _removeBody: function _removeBody(body) {
    var world = this._world;
    if (!world) return;
    body._b2Body.body = null;
    world.DestroyBody(body._b2Body);
    body._b2Body = null;
    cc.js.array.remove(this._bodies, body);
  },
  _addJoint: function _addJoint(joint, jointDef) {
    var b2joint = this._world.CreateJoint(jointDef);

    if (!b2joint) return;
    b2joint._joint = joint;
    joint._joint = b2joint;

    this._joints.push(joint);
  },
  _removeJoint: function _removeJoint(joint) {
    if (joint._isValid()) {
      this._world.DestroyJoint(joint._joint);
    }

    if (joint._joint) {
      joint._joint._joint = null;
    }

    cc.js.array.remove(this._joints, joint);
  },
  _initCallback: function _initCallback() {
    if (!this._world) {
      cc.warn('Please init PhysicsManager first');
      return;
    }

    if (this._contactListener) return;
    var listener = new cc.PhysicsContactListener();
    listener.setBeginContact(this._onBeginContact);
    listener.setEndContact(this._onEndContact);
    listener.setPreSolve(this._onPreSolve);
    listener.setPostSolve(this._onPostSolve);

    this._world.SetContactListener(listener);

    this._contactListener = listener;
    this._aabbQueryCallback = new cc.PhysicsAABBQueryCallback();
    this._raycastQueryCallback = new cc.PhysicsRayCastCallback();
  },
  _init: function _init() {
    this.enabled = true;
    this.debugDrawFlags = DrawBits.e_shapeBit;
  },
  _getWorld: function _getWorld() {
    return this._world;
  },
  _syncNode: function _syncNode() {
    var bodies = this._bodies;

    for (var i = 0, l = bodies.length; i < l; i++) {
      var body = bodies[i];
      var node = body.node;
      var b2body = body._b2Body;
      var pos = b2body.GetPosition();
      vec2_tmp.x = pos.x * PTM_RATIO;
      vec2_tmp.y = pos.y * PTM_RATIO;
      var angle = b2body.GetAngle() * PHYSICS_ANGLE_TO_ANGLE; // When node's parent is not scene, convert position and rotation.

      if (node.parent.parent !== null) {
        vec2_tmp = node.parent.convertToNodeSpaceAR(vec2_tmp);
        angle = convertToNodeRotation(node.parent, angle);
      }

      var tempMask = node._eventMask;
      node._eventMask = 0; // sync position

      node.position = vec2_tmp; // sync rotation

      node.angle = -angle;
      node._eventMask = tempMask;

      if (body.type === BodyType.Animated) {
        body.resetVelocity();
      }
    }
  },
  _onBeginContact: function _onBeginContact(b2contact) {
    var c = cc.PhysicsContact.get(b2contact);
    c.emit(ContactType.BEGIN_CONTACT);
  },
  _onEndContact: function _onEndContact(b2contact) {
    var c = b2contact._contact;

    if (!c) {
      return;
    }

    c.emit(ContactType.END_CONTACT);
    cc.PhysicsContact.put(b2contact);
  },
  _onPreSolve: function _onPreSolve(b2contact) {
    var c = b2contact._contact;

    if (!c) {
      return;
    }

    c.emit(ContactType.PRE_SOLVE);
  },
  _onPostSolve: function _onPostSolve(b2contact, impulse) {
    var c = b2contact._contact;

    if (!c) {
      return;
    } // impulse only survive during post sole callback


    c._impulse = impulse;
    c.emit(ContactType.POST_SOLVE);
    c._impulse = null;
  },
  _checkDebugDrawValid: function _checkDebugDrawValid() {
    if (!this._debugDrawer || !this._debugDrawer.isValid) {
      var node = new cc.Node('PHYSICS_MANAGER_DEBUG_DRAW');
      node.zIndex = cc.macro.MAX_ZINDEX;
      cc.game.addPersistRootNode(node);
      this._debugDrawer = node.addComponent(cc.Graphics);
      var debugDraw = new DebugDraw(this._debugDrawer);
      debugDraw.SetFlags(this.debugDrawFlags);

      this._world.SetDebugDraw(debugDraw);
    }
  }
});
/**
 * !#en
 * Enabled the physics manager?
 * !#zh
 * 指定是否启用物理系统？
 * @property {Boolean} enabled
 * @default false
 */

cc.js.getset(PhysicsManager.prototype, 'enabled', function () {
  return this._enabled;
}, function (value) {
  if (CC_EDITOR) return;

  if (value && !this._world) {
    var world = new b2.World(new b2.Vec2(0, -10));
    world.SetAllowSleeping(true);
    this._world = world;

    this._initCallback();
  }

  this._enabled = value;
});
/**
 * !#en
 * Debug draw flags.
 * !#zh
 * 设置调试绘制标志
 * @property {Number} debugDrawFlags
 * @default 0
 * @example
 * // enable all debug draw info
 * var Bits = cc.PhysicsManager.DrawBits;
 * cc.director.getPhysicsManager().debugDrawFlags = Bits.e_aabbBit |
    Bits.e_pairBit |
    Bits.e_centerOfMassBit |
    Bits.e_jointBit |
    Bits.e_shapeBit;
 
 * // disable debug draw info
 * cc.director.getPhysicsManager().debugDrawFlags = 0;
 */

cc.js.getset(PhysicsManager.prototype, 'debugDrawFlags', function () {
  return this._debugDrawFlags;
}, function (value) {
  if (CC_EDITOR) return;

  if (value && !this._debugDrawFlags) {
    if (this._debugDrawer && this._debugDrawer.node) this._debugDrawer.node.active = true;
  } else if (!value && this._debugDrawFlags) {
    if (this._debugDrawer && this._debugDrawer.node) this._debugDrawer.node.active = false;
  }

  if (value) {
    this._checkDebugDrawValid();

    this._world.m_debugDraw.SetFlags(value);
  }

  this._debugDrawFlags = value;

  if (value) {
    this._checkDebugDrawValid();

    this._world.m_debugDraw.SetFlags(value);
  }
});
/**
 * !#en
 * The physics world gravity.
 * !#zh
 * 物理世界重力值
 * @property {Vec2} gravity
 */

cc.js.getset(PhysicsManager.prototype, 'gravity', function () {
  if (this._world) {
    var g = this._world.GetGravity();

    return cc.v2(g.x * PTM_RATIO, g.y * PTM_RATIO);
  }

  return cc.v2();
}, function (value) {
  if (this._world) {
    this._world.SetGravity(new b2.Vec2(value.x / PTM_RATIO, value.y / PTM_RATIO));
  }
});
cc.PhysicsManager = module.exports = PhysicsManager;
/**
 * !#en
 * The draw bits for drawing physics debug information.<br>
 * example:<br>
 * ```js
 * cc.director.getPhysicsManager().debugDrawFlags = 
 *  // cc.PhysicsManager.DrawBits.e_aabbBit |
 *  // cc.PhysicsManager.DrawBits.e_pairBit |
 *  // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
 *  cc.PhysicsManager.DrawBits.e_jointBit |
 *  cc.PhysicsManager.DrawBits.e_shapeBit;
 * ```
 * !#zh
 * 指定物理系统需要绘制哪些调试信息。<br>
 * example:<br>
 * ```js
 * cc.director.getPhysicsManager().debugDrawFlags = 
 *  // cc.PhysicsManager.DrawBits.e_aabbBit |
 *  // cc.PhysicsManager.DrawBits.e_pairBit |
 *  // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
 *  cc.PhysicsManager.DrawBits.e_jointBit |
 *  cc.PhysicsManager.DrawBits.e_shapeBit;
 * ```
 * @enum PhysicsManager.DrawBits
 * @static

 */

/**
 * !#en
 * Draw bounding boxes
 * !#zh
 * 绘制包围盒
 * @property {Number} e_aabbBit
 * @static
 */

/**
 * !#en
 * Draw joint connections
 * !#zh
 * 绘制关节链接信息
 * @property {Number} e_jointBit
 * @static
 */

/**
 * !#en
 * Draw shapes
 * !#zh
 * 绘制形状
 * @property {Number} e_shapeBit
 * @static
 */

/**
 * @class PhysicsRayCastResult
 */

/**
 * !#en
 * The PhysicsCollider which intersects with the raycast
 * !#zh
 * 与射线相交的碰撞体
 * @property {PhysicsCollider} collider
 */

/**
 * !#en
 * The intersection point
 * !#zh
 * 射线与碰撞体相交的点
 * @property {Vec2} point
 */

/**
 * !#en
 * The normal vector at the point of intersection
 * !#zh
 * 射线与碰撞体相交的点的法向量
 * @property {Vec2} normal
 */

/**
 * !#en
 * The fraction of the raycast path at the point of intersection
 * !#zh
 * 射线与碰撞体相交的点占射线长度的分数
 * @property {Number} fraction
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvQ0NQaHlzaWNzTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJQaHlzaWNzVHlwZXMiLCJyZXF1aXJlIiwiQ29udGFjdFR5cGUiLCJCb2R5VHlwZSIsIlJheUNhc3RUeXBlIiwiRHJhd0JpdHMiLCJQVE1fUkFUSU8iLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiUEhZU0lDU19BTkdMRV9UT19BTkdMRSIsImNvbnZlcnRUb05vZGVSb3RhdGlvbiIsIkRlYnVnRHJhdyIsImIyX2FhYmJfdG1wIiwiYjIiLCJBQUJCIiwiYjJfdmVjMl90bXAxIiwiVmVjMiIsImIyX3ZlYzJfdG1wMiIsInZlYzJfdG1wIiwiY2MiLCJ2MiIsIlBoeXNpY3NNYW5hZ2VyIiwiQ2xhc3MiLCJtaXhpbnMiLCJFdmVudFRhcmdldCIsInN0YXRpY3MiLCJWRUxPQ0lUWV9JVEVSQVRJT05TIiwiUE9TSVRJT05fSVRFUkFUSU9OUyIsIkZJWEVEX1RJTUVfU1RFUCIsIk1BWF9BQ0NVTVVMQVRPUiIsImN0b3IiLCJfZGVidWdEcmF3RmxhZ3MiLCJfZGVidWdEcmF3ZXIiLCJfd29ybGQiLCJfYm9kaWVzIiwiX2pvaW50cyIsIl9jb250YWN0TWFwIiwiX2NvbnRhY3RJRCIsIl9kZWxheUV2ZW50cyIsIl9hY2N1bXVsYXRvciIsImRpcmVjdG9yIiwiX3NjaGVkdWxlciIsImVuYWJsZUZvclRhcmdldCIsImVuYWJsZWRBY2N1bXVsYXRvciIsInB1c2hEZWxheUV2ZW50IiwidGFyZ2V0IiwiZnVuYyIsImFyZ3MiLCJfc3RlcGluZyIsInB1c2giLCJhcHBseSIsInVwZGF0ZSIsImR0Iiwid29ybGQiLCJlbmFibGVkIiwiZW1pdCIsInZlbG9jaXR5SXRlcmF0aW9ucyIsInBvc2l0aW9uSXRlcmF0aW9ucyIsIlN0ZXAiLCJ0aW1lU3RlcCIsImdhbWUiLCJjb25maWciLCJkZWJ1Z0RyYXdGbGFncyIsIl9jaGVja0RlYnVnRHJhd1ZhbGlkIiwiY2xlYXIiLCJEcmF3RGVidWdEYXRhIiwiZXZlbnRzIiwiaSIsImwiLCJsZW5ndGgiLCJldmVudCIsIl9zeW5jTm9kZSIsInRlc3RQb2ludCIsInBvaW50IiwieCIsInkiLCJkIiwibG93ZXJCb3VuZCIsInVwcGVyQm91bmQiLCJjYWxsYmFjayIsIl9hYWJiUXVlcnlDYWxsYmFjayIsImluaXQiLCJRdWVyeUFBQkIiLCJmaXh0dXJlIiwiZ2V0Rml4dHVyZSIsImNvbGxpZGVyIiwidGVzdEFBQkIiLCJyZWN0IiwieE1pbiIsInlNaW4iLCJ4TWF4IiwieU1heCIsImZpeHR1cmVzIiwiZ2V0Rml4dHVyZXMiLCJjb2xsaWRlcnMiLCJtYXAiLCJyYXlDYXN0IiwicDEiLCJwMiIsInR5cGUiLCJlcXVhbHMiLCJDbG9zZXN0IiwiX3JheWNhc3RRdWVyeUNhbGxiYWNrIiwiUmF5Q2FzdCIsInBvaW50cyIsImdldFBvaW50cyIsIm5vcm1hbHMiLCJnZXROb3JtYWxzIiwiZnJhY3Rpb25zIiwiZ2V0RnJhY3Rpb25zIiwicmVzdWx0cyIsIkFsbENsb3Nlc3QiLCJyZXN1bHQiLCJmaW5kIiwiZnJhY3Rpb24iLCJmaXh0dXJlSW5kZXgiLCJfZ2V0Rml4dHVyZUluZGV4Iiwibm9ybWFsIiwic3luY1Bvc2l0aW9uIiwiYm9kaWVzIiwic3luY1JvdGF0aW9uIiwiX3JlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJfY29udGFjdExpc3RlbmVyIiwicmVnaXN0ZXJDb250YWN0Rml4dHVyZSIsIl91bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJ1bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJfYWRkQm9keSIsImJvZHkiLCJib2R5RGVmIiwibm9kZSIsIl9iMkJvZHkiLCJDcmVhdGVCb2R5IiwiX3JlbW92ZUJvZHkiLCJEZXN0cm95Qm9keSIsImpzIiwiYXJyYXkiLCJyZW1vdmUiLCJfYWRkSm9pbnQiLCJqb2ludCIsImpvaW50RGVmIiwiYjJqb2ludCIsIkNyZWF0ZUpvaW50IiwiX2pvaW50IiwiX3JlbW92ZUpvaW50IiwiX2lzVmFsaWQiLCJEZXN0cm95Sm9pbnQiLCJfaW5pdENhbGxiYWNrIiwid2FybiIsImxpc3RlbmVyIiwiUGh5c2ljc0NvbnRhY3RMaXN0ZW5lciIsInNldEJlZ2luQ29udGFjdCIsIl9vbkJlZ2luQ29udGFjdCIsInNldEVuZENvbnRhY3QiLCJfb25FbmRDb250YWN0Iiwic2V0UHJlU29sdmUiLCJfb25QcmVTb2x2ZSIsInNldFBvc3RTb2x2ZSIsIl9vblBvc3RTb2x2ZSIsIlNldENvbnRhY3RMaXN0ZW5lciIsIlBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjayIsIlBoeXNpY3NSYXlDYXN0Q2FsbGJhY2siLCJfaW5pdCIsImVfc2hhcGVCaXQiLCJfZ2V0V29ybGQiLCJiMmJvZHkiLCJwb3MiLCJHZXRQb3NpdGlvbiIsImFuZ2xlIiwiR2V0QW5nbGUiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRlbXBNYXNrIiwiX2V2ZW50TWFzayIsInBvc2l0aW9uIiwiQW5pbWF0ZWQiLCJyZXNldFZlbG9jaXR5IiwiYjJjb250YWN0IiwiYyIsIlBoeXNpY3NDb250YWN0IiwiZ2V0IiwiQkVHSU5fQ09OVEFDVCIsIl9jb250YWN0IiwiRU5EX0NPTlRBQ1QiLCJwdXQiLCJQUkVfU09MVkUiLCJpbXB1bHNlIiwiX2ltcHVsc2UiLCJQT1NUX1NPTFZFIiwiaXNWYWxpZCIsIk5vZGUiLCJ6SW5kZXgiLCJtYWNybyIsIk1BWF9aSU5ERVgiLCJhZGRQZXJzaXN0Um9vdE5vZGUiLCJhZGRDb21wb25lbnQiLCJHcmFwaGljcyIsImRlYnVnRHJhdyIsIlNldEZsYWdzIiwiU2V0RGVidWdEcmF3IiwiZ2V0c2V0IiwicHJvdG90eXBlIiwiX2VuYWJsZWQiLCJ2YWx1ZSIsIkNDX0VESVRPUiIsIldvcmxkIiwiU2V0QWxsb3dTbGVlcGluZyIsImFjdGl2ZSIsIm1fZGVidWdEcmF3IiwiZyIsIkdldEdyYXZpdHkiLCJTZXRHcmF2aXR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7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O0FBQ1IsTUFBSSxLQUFLdkssTUFBVCxFQUFpQjtBQUNiLFFBQUkrSyxDQUFDLEdBQUcsS0FBSy9LLE1BQUwsQ0FBWWdMLFVBQVosRUFBUjs7QUFDQSxXQUFPOUwsRUFBRSxDQUFDQyxFQUFILENBQU00TCxDQUFDLENBQUN0SSxDQUFGLEdBQUluRSxTQUFWLEVBQXFCeU0sQ0FBQyxDQUFDckksQ0FBRixHQUFJcEUsU0FBekIsQ0FBUDtBQUNIOztBQUNELFNBQU9ZLEVBQUUsQ0FBQ0MsRUFBSCxFQUFQO0FBQ0gsQ0FQTCxFQVNJLFVBQVVzTCxLQUFWLEVBQWlCO0FBQ2IsTUFBSSxLQUFLekssTUFBVCxFQUFpQjtBQUNiLFNBQUtBLE1BQUwsQ0FBWWlMLFVBQVosQ0FBdUIsSUFBSXJNLEVBQUUsQ0FBQ0csSUFBUCxDQUFZMEwsS0FBSyxDQUFDaEksQ0FBTixHQUFRbkUsU0FBcEIsRUFBK0JtTSxLQUFLLENBQUMvSCxDQUFOLEdBQVFwRSxTQUF2QyxDQUF2QjtBQUNIO0FBQ0osQ0FiTDtBQWlCQVksRUFBRSxDQUFDRSxjQUFILEdBQW9COEwsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0wsY0FBckM7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztBQVFBOzs7Ozs7Ozs7QUFTQTs7OztBQUdBOzs7Ozs7OztBQU9BOzs7Ozs7OztBQU9BOzs7Ozs7OztBQU9BIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBQaHlzaWNzVHlwZXMgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJyk7XG5jb25zdCBDb250YWN0VHlwZSA9IFBoeXNpY3NUeXBlcy5Db250YWN0VHlwZTtcbmNvbnN0IEJvZHlUeXBlID0gUGh5c2ljc1R5cGVzLkJvZHlUeXBlO1xuY29uc3QgUmF5Q2FzdFR5cGUgPSBQaHlzaWNzVHlwZXMuUmF5Q2FzdFR5cGU7XG5jb25zdCBEcmF3Qml0cyA9IFBoeXNpY3NUeXBlcy5EcmF3Qml0cztcblxuY29uc3QgUFRNX1JBVElPID0gUGh5c2ljc1R5cGVzLlBUTV9SQVRJTztcbmNvbnN0IEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSBQaHlzaWNzVHlwZXMuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbmNvbnN0IFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEUgPSBQaHlzaWNzVHlwZXMuUEhZU0lDU19BTkdMRV9UT19BTkdMRTtcblxuY29uc3QgY29udmVydFRvTm9kZVJvdGF0aW9uID0gcmVxdWlyZSgnLi91dGlscycpLmNvbnZlcnRUb05vZGVSb3RhdGlvbjtcbmNvbnN0IERlYnVnRHJhdyA9IHJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NQaHlzaWNzRGVidWdEcmF3Jyk7XG5cbnZhciBiMl9hYWJiX3RtcCA9IG5ldyBiMi5BQUJCKCk7XG52YXIgYjJfdmVjMl90bXAxID0gbmV3IGIyLlZlYzIoKTtcbnZhciBiMl92ZWMyX3RtcDIgPSBuZXcgYjIuVmVjMigpO1xuXG52YXIgdmVjMl90bXAgPSBjYy52MigpO1xuXG4vKipcbiAqICEjZW5cbiAqIFBoeXNpY3MgbWFuYWdlciB1c2VzIGJveDJkIGFzIHRoZSBpbm5lciBwaHlzaWNzIHN5c3RlbSwgYW5kIGhpZGUgbW9zdCBib3gyZCBpbXBsZW1lbnQgZGV0YWlscyhjcmVhdGluZyByaWdpZGJvZHksIHN5bmNocm9uaXplIHJpZ2lkYm9keSBpbmZvIHRvIG5vZGUpLlxuICogWW91IGNhbiB2aXNpdCBzb21lIGNvbW1vbiBib3gyZCBmdW5jdGlvbiB0aHJvdWdoIHBoeXNpY3MgbWFuYWdlcihoaXQgdGVzdGluZywgcmF5Y2FzdCwgZGVidWcgaW5mbykuXG4gKiBQaHlzaWNzIG1hbmFnZXIgZGlzdHJpYnV0ZXMgdGhlIGNvbGxpc2lvbiBpbmZvcm1hdGlvbiB0byBlYWNoIGNvbGxpc2lvbiBjYWxsYmFjayB3aGVuIGNvbGxpc2lvbiBpcyBwcm9kdWNlZC5cbiAqIE5vdGU6IFlvdSBuZWVkIGZpcnN0IGVuYWJsZSB0aGUgY29sbGlzaW9uIGxpc3RlbmVyIGluIHRoZSByaWdpZGJvZHkuXG4gKiAhI3poXG4gKiDniannkIbns7vnu5/lsIYgYm94MmQg5L2c5Li65YaF6YOo54mp55CG57O757uf77yM5bm25LiU6ZqQ6JeP5LqG5aSn6YOo5YiGIGJveDJkIOWunueOsOe7huiKgu+8iOavlOWmguWIm+W7uuWImuS9k++8jOWQjOatpeWImuS9k+S/oeaBr+WIsOiKgueCueS4reetie+8ieOAglxuICog5L2g5Y+v5Lul6YCa6L+H54mp55CG57O757uf6K6/6Zeu5LiA5LqbIGJveDJkIOW4uOeUqOeahOWKn+iDve+8jOavlOWmgueCueWHu+a1i+ivle+8jOWwhOe6v+a1i+ivle+8jOiuvue9rua1i+ivleS/oeaBr+etieOAglxuICog54mp55CG57O757uf6L+Y566h55CG56Kw5pKe5L+h5oGv55qE5YiG5Y+R77yM5aW55Lya5Zyo5Lqn55Sf56Kw5pKe5pe277yM5bCG56Kw5pKe5L+h5oGv5YiG5Y+R5Yiw5ZCE5Liq56Kw5pKe5Zue6LCD5Lit44CCXG4gKiDms6jmhI/vvJrkvaDpnIDopoHlhYjlnKjliJrkvZPkuK3lvIDlkK/norDmkp7mjqXlkKzmiY3kvJrkuqfnlJ/nm7jlupTnmoTnorDmkp7lm57osIPjgII8YnI+XG4gKiDmlK/mjIHnmoTniannkIbns7vnu5/mjIflrprnu5jliLbkv6Hmga/kuovku7bvvIzor7flj4LpmIUge3sjY3Jvc3NMaW5rIFwiUGh5c2ljc01hbmFnZXIuRHJhd0JpdHNcIn19e3svY3Jvc3NMaW5rfX1cbiAqIEBjbGFzcyBQaHlzaWNzTWFuYWdlclxuICogQHVzZXMgRXZlbnRUYXJnZXRcbiAqL1xudmFyIFBoeXNpY3NNYW5hZ2VyID0gY2MuQ2xhc3Moe1xuICAgIG1peGluczogW2NjLkV2ZW50VGFyZ2V0XSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRHJhd0JpdHM6IERyYXdCaXRzLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSByYXRpbyB0cmFuc2Zvcm0gYmV0d2VlbiBwaHlzaWNzIHVuaXQgYW5kIHBpeGVsIHVuaXQsIGdlbmVyYWxseSBpcyAzMi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDniannkIbljZXkvY3kuI7lg4/ntKDljZXkvY3kupLnm7jovazmjaLnmoTmr5TnjofvvIzkuIDoiKzmmK8gMzLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBUTV9SQVRJT1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBQVE1fUkFUSU86IFBUTV9SQVRJTyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgdmVsb2NpdHkgaXRlcmF0aW9ucyBmb3IgdGhlIHZlbG9jaXR5IGNvbnN0cmFpbnQgc29sdmVyLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmAn+W6puabtOaWsOi/reS7o+aVsFxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVkVMT0NJVFlfSVRFUkFUSU9OU1xuICAgICAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBWRUxPQ0lUWV9JVEVSQVRJT05TOiAxMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgcG9zaXRpb24gSXRlcmF0aW9ucyBmb3IgdGhlIHBvc2l0aW9uIGNvbnN0cmFpbnQgc29sdmVyLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOS9jee9rui/reS7o+abtOaWsOaVsFxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUE9TSVRJT05fSVRFUkFUSU9OU1xuICAgICAgICAgKiBAZGVmYXVsdCAxMFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBQT1NJVElPTl9JVEVSQVRJT05TOiAxMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTcGVjaWZ5IHRoZSBmaXhlZCB0aW1lIHN0ZXAuXG4gICAgICAgICAqIE5lZWQgZW5hYmxlZEFjY3VtdWxhdG9yIHRvIG1ha2UgaXQgd29yay5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmjIflrprlm7rlrprnmoTniannkIbmm7TmlrDpl7TpmpTml7bpl7TvvIzpnIDopoHlvIDlkK8gZW5hYmxlZEFjY3VtdWxhdG9yIOaJjeacieaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRklYRURfVElNRV9TVEVQXG4gICAgICAgICAqIEBkZWZhdWx0IDEvNjBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgRklYRURfVElNRV9TVEVQOiAxLzYwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNwZWNpZnkgdGhlIG1heCBhY2N1bXVsYXRvciB0aW1lLlxuICAgICAgICAgKiBOZWVkIGVuYWJsZWRBY2N1bXVsYXRvciB0byBtYWtlIGl0IHdvcmsuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5q+P5qyh5Y+v55So5LqO5pu05paw54mp55CG57O757uf55qE5pyA5aSn5pe26Ze077yM6ZyA6KaB5byA5ZCvIGVuYWJsZWRBY2N1bXVsYXRvciDmiY3mnInmlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1BWF9BQ0NVTVVMQVRPUlxuICAgICAgICAgKiBAZGVmYXVsdCAxLzVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgTUFYX0FDQ1VNVUxBVE9SOiAxLzVcbiAgICB9LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kZWJ1Z0RyYXdGbGFncyA9IDA7XG4gICAgICAgIHRoaXMuX2RlYnVnRHJhd2VyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl93b3JsZCA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fYm9kaWVzID0gW107XG4gICAgICAgIHRoaXMuX2pvaW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2NvbnRhY3RNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5fY29udGFjdElEID0gMDtcblxuICAgICAgICB0aGlzLl9kZWxheUV2ZW50cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2FjY3VtdWxhdG9yID0gMDtcblxuICAgICAgICBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyICYmIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIuZW5hYmxlRm9yVGFyZ2V0KHRoaXMpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIElmIGVuYWJsZWQgYWNjdW11bGF0b3IsIHRoZW4gd2lsbCBjYWxsIHN0ZXAgZnVuY3Rpb24gd2l0aCB0aGUgZml4ZWQgdGltZSBzdGVwIEZJWEVEX1RJTUVfU1RFUC4gXG4gICAgICAgICAqIEFuZCBpZiB0aGUgdXBkYXRlIGR0IGlzIGJpZ2dlciB0aGFuIHRoZSB0aW1lIHN0ZXAsIHRoZW4gd2lsbCBjYWxsIHN0ZXAgZnVuY3Rpb24gc2V2ZXJhbCB0aW1lcy5cbiAgICAgICAgICogSWYgZGlzYWJsZWQgYWNjdW11bGF0b3IsIHRoZW4gd2lsbCBjYWxsIHN0ZXAgZnVuY3Rpb24gd2l0aCBhIHRpbWUgc3RlcCBjYWxjdWxhdGVkIHdpdGggdGhlIGZyYW1lIHJhdGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aaC5p6c5byA5ZCv5q2k6YCJ6aG577yM6YKj5LmI5bCG5Lya5Lul5Zu65a6a55qE6Ze06ZqU5pe26Ze0IEZJWEVEX1RJTUVfU1RFUCDmnaXmm7TmlrDniannkIblvJXmk47vvIzlpoLmnpzkuIDkuKogdXBkYXRlIOeahOmXtOmalOaXtumXtOWkp+S6jiBGSVhFRF9USU1FX1NURVDvvIzliJnkvJrlr7nniannkIblvJXmk47ov5vooYzlpJrmrKHmm7TmlrDjgIJcbiAgICAgICAgICog5aaC5p6c5YWz6Zet5q2k6YCJ6aG577yM6YKj5LmI5bCG5Lya5qC55o2u6K6+5a6a55qEIGZyYW1lIHJhdGUg6K6h566X5Ye65LiA5Liq6Ze06ZqU5pe26Ze05p2l5pu05paw54mp55CG5byV5pOO44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlZEFjY3VtdWxhdG9yXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVuYWJsZWRBY2N1bXVsYXRvciA9IGZhbHNlOyAgICAgICAgXG4gICAgfSxcblxuICAgIHB1c2hEZWxheUV2ZW50OiBmdW5jdGlvbiAodGFyZ2V0LCBmdW5jLCBhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGVwaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWxheUV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBmdW5jOiBmdW5jLFxuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0W2Z1bmNdLmFwcGx5KHRhcmdldCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdmFyIHdvcmxkID0gdGhpcy5fd29ybGQ7XG4gICAgICAgIGlmICghd29ybGQgfHwgIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZW1pdCgnYmVmb3JlLXN0ZXAnKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3N0ZXBpbmcgPSB0cnVlO1xuXG4gICAgICAgIHZhciB2ZWxvY2l0eUl0ZXJhdGlvbnMgPSBQaHlzaWNzTWFuYWdlci5WRUxPQ0lUWV9JVEVSQVRJT05TO1xuICAgICAgICB2YXIgcG9zaXRpb25JdGVyYXRpb25zID0gUGh5c2ljc01hbmFnZXIuUE9TSVRJT05fSVRFUkFUSU9OUztcblxuICAgICAgICBpZiAodGhpcy5lbmFibGVkQWNjdW11bGF0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY3VtdWxhdG9yICs9IGR0O1xuXG4gICAgICAgICAgICB2YXIgRklYRURfVElNRV9TVEVQID0gUGh5c2ljc01hbmFnZXIuRklYRURfVElNRV9TVEVQO1xuICAgICAgICAgICAgdmFyIE1BWF9BQ0NVTVVMQVRPUiA9IFBoeXNpY3NNYW5hZ2VyLk1BWF9BQ0NVTVVMQVRPUjtcblxuICAgICAgICAgICAgLy8gbWF4IGFjY3VtdWxhdG9yIHRpbWUgdG8gYXZvaWQgc3BpcmFsIG9mIGRlYXRoXG4gICAgICAgICAgICBpZiAodGhpcy5fYWNjdW11bGF0b3IgPiBNQVhfQUNDVU1VTEFUT1IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2N1bXVsYXRvciA9IE1BWF9BQ0NVTVVMQVRPUjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2FjY3VtdWxhdG9yID4gRklYRURfVElNRV9TVEVQKSB7XG4gICAgICAgICAgICAgICAgd29ybGQuU3RlcChGSVhFRF9USU1FX1NURVAsIHZlbG9jaXR5SXRlcmF0aW9ucywgcG9zaXRpb25JdGVyYXRpb25zKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2N1bXVsYXRvciAtPSBGSVhFRF9USU1FX1NURVA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGltZVN0ZXAgPSAxL2NjLmdhbWUuY29uZmlnWydmcmFtZVJhdGUnXTtcbiAgICAgICAgICAgIHdvcmxkLlN0ZXAodGltZVN0ZXAsIHZlbG9jaXR5SXRlcmF0aW9ucywgcG9zaXRpb25JdGVyYXRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRlYnVnRHJhd0ZsYWdzKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja0RlYnVnRHJhd1ZhbGlkKCk7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0RyYXdlci5jbGVhcigpO1xuICAgICAgICAgICAgd29ybGQuRHJhd0RlYnVnRGF0YSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3RlcGluZyA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9kZWxheUV2ZW50cztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC50YXJnZXRbZXZlbnQuZnVuY10uYXBwbHkoZXZlbnQudGFyZ2V0LCBldmVudC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudHMubGVuZ3RoID0gMDtcblxuICAgICAgICB0aGlzLl9zeW5jTm9kZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGVzdCB3aGljaCBjb2xsaWRlciBjb250YWlucyB0aGUgZ2l2ZW4gd29ybGQgcG9pbnRcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5YyF5ZCr57uZ5a6a5LiW55WM5Z2Q5qCH57O754K555qE56Kw5pKe5L2TXG4gICAgICogQG1ldGhvZCB0ZXN0UG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50IC0gdGhlIHdvcmxkIHBvaW50XG4gICAgICogQHJldHVybiB7UGh5c2ljc0NvbGxpZGVyfVxuICAgICAqL1xuICAgIHRlc3RQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciB4ID0gYjJfdmVjMl90bXAxLnggPSBwb2ludC54L1BUTV9SQVRJTztcbiAgICAgICAgdmFyIHkgPSBiMl92ZWMyX3RtcDEueSA9IHBvaW50LnkvUFRNX1JBVElPO1xuXG4gICAgICAgIHZhciBkID0gMC4yL1BUTV9SQVRJTztcbiAgICAgICAgYjJfYWFiYl90bXAubG93ZXJCb3VuZC54ID0geC1kO1xuICAgICAgICBiMl9hYWJiX3RtcC5sb3dlckJvdW5kLnkgPSB5LWQ7XG4gICAgICAgIGIyX2FhYmJfdG1wLnVwcGVyQm91bmQueCA9IHgrZDtcbiAgICAgICAgYjJfYWFiYl90bXAudXBwZXJCb3VuZC55ID0geStkO1xuXG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2FhYmJRdWVyeUNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjay5pbml0KGIyX3ZlYzJfdG1wMSk7XG4gICAgICAgIHRoaXMuX3dvcmxkLlF1ZXJ5QUFCQihjYWxsYmFjaywgYjJfYWFiYl90bXApO1xuXG4gICAgICAgIHZhciBmaXh0dXJlID0gY2FsbGJhY2suZ2V0Rml4dHVyZSgpO1xuICAgICAgICBpZiAoZml4dHVyZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpeHR1cmUuY29sbGlkZXI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRlc3Qgd2hpY2ggY29sbGlkZXJzIGludGVyc2VjdCB0aGUgZ2l2ZW4gd29ybGQgcmVjdFxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bkuI7nu5nlrprkuJbnlYzlnZDmoIfns7vnn6nlvaLnm7jkuqTnmoTnorDmkp7kvZNcbiAgICAgKiBAbWV0aG9kIHRlc3RBQUJCXG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0IC0gdGhlIHdvcmxkIHJlY3RcbiAgICAgKiBAcmV0dXJuIHtbUGh5c2ljc0NvbGxpZGVyXX1cbiAgICAgKi9cbiAgICB0ZXN0QUFCQjogZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgICAgYjJfYWFiYl90bXAubG93ZXJCb3VuZC54ID0gcmVjdC54TWluL1BUTV9SQVRJTztcbiAgICAgICAgYjJfYWFiYl90bXAubG93ZXJCb3VuZC55ID0gcmVjdC55TWluL1BUTV9SQVRJTztcbiAgICAgICAgYjJfYWFiYl90bXAudXBwZXJCb3VuZC54ID0gcmVjdC54TWF4L1BUTV9SQVRJTztcbiAgICAgICAgYjJfYWFiYl90bXAudXBwZXJCb3VuZC55ID0gcmVjdC55TWF4L1BUTV9SQVRJTztcblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9hYWJiUXVlcnlDYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2suaW5pdCgpO1xuICAgICAgICB0aGlzLl93b3JsZC5RdWVyeUFBQkIoY2FsbGJhY2ssIGIyX2FhYmJfdG1wKTtcblxuICAgICAgICB2YXIgZml4dHVyZXMgPSBjYWxsYmFjay5nZXRGaXh0dXJlcygpO1xuICAgICAgICB2YXIgY29sbGlkZXJzID0gZml4dHVyZXMubWFwKGZ1bmN0aW9uIChmaXh0dXJlKSB7XG4gICAgICAgICAgICByZXR1cm4gZml4dHVyZS5jb2xsaWRlcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpZGVycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJheWNhc3QgdGhlIHdvcmxkIGZvciBhbGwgY29sbGlkZXJzIGluIHRoZSBwYXRoIG9mIHRoZSByYXkuXG4gICAgICogVGhlIHJheWNhc3QgaWdub3JlcyBjb2xsaWRlcnMgdGhhdCBjb250YWluIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiAhI3poXG4gICAgICog5qOA5rWL5ZOq5Lqb56Kw5pKe5L2T5Zyo57uZ5a6a5bCE57q/55qE6Lev5b6E5LiK77yM5bCE57q/5qOA5rWL5bCG5b+955Wl5YyF5ZCr6LW35aeL54K555qE56Kw5pKe5L2T44CCXG4gICAgICogQG1ldGhvZCByYXlDYXN0XG4gICAgICogQHBhcmFtIHtWZWMyfSBwMSAtIHN0YXJ0IHBvaW50IG9mIHRoZSByYXljYXN0XG4gICAgICogQHBhcmFtIHtWZWMyfSBwMiAtIGVuZCBwb2ludCBvZiB0aGUgcmF5Y2FzdFxuICAgICAqIEBwYXJhbSB7UmF5Q2FzdFR5cGV9IHR5cGUgLSBvcHRpb25hbCwgZGVmYXVsdCBpcyBSYXlDYXN0VHlwZS5DbG9zZXN0XG4gICAgICogQHJldHVybiB7W1BoeXNpY3NSYXlDYXN0UmVzdWx0XX1cbiAgICAgKi9cbiAgICByYXlDYXN0OiBmdW5jdGlvbiAocDEsIHAyLCB0eXBlKSB7XG4gICAgICAgIGlmIChwMS5lcXVhbHMocDIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICB0eXBlID0gdHlwZSB8fCBSYXlDYXN0VHlwZS5DbG9zZXN0O1xuXG4gICAgICAgIGIyX3ZlYzJfdG1wMS54ID0gcDEueC9QVE1fUkFUSU87XG4gICAgICAgIGIyX3ZlYzJfdG1wMS55ID0gcDEueS9QVE1fUkFUSU87XG4gICAgICAgIGIyX3ZlYzJfdG1wMi54ID0gcDIueC9QVE1fUkFUSU87XG4gICAgICAgIGIyX3ZlYzJfdG1wMi55ID0gcDIueS9QVE1fUkFUSU87XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fcmF5Y2FzdFF1ZXJ5Q2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrLmluaXQodHlwZSk7XG4gICAgICAgIHRoaXMuX3dvcmxkLlJheUNhc3QoY2FsbGJhY2ssIGIyX3ZlYzJfdG1wMSwgYjJfdmVjMl90bXAyKTtcblxuICAgICAgICB2YXIgZml4dHVyZXMgPSBjYWxsYmFjay5nZXRGaXh0dXJlcygpO1xuICAgICAgICBpZiAoZml4dHVyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIHBvaW50cyA9IGNhbGxiYWNrLmdldFBvaW50cygpO1xuICAgICAgICAgICAgdmFyIG5vcm1hbHMgPSBjYWxsYmFjay5nZXROb3JtYWxzKCk7XG4gICAgICAgICAgICB2YXIgZnJhY3Rpb25zID0gY2FsbGJhY2suZ2V0RnJhY3Rpb25zKCk7XG5cbiAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGZpeHR1cmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBmaXh0dXJlID0gZml4dHVyZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxpZGVyID0gZml4dHVyZS5jb2xsaWRlcjtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBSYXlDYXN0VHlwZS5BbGxDbG9zZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSByZXN1bHRzLmZpbmQoZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmNvbGxpZGVyID09PSBjb2xsaWRlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyYWN0aW9uc1tpXSA8IHJlc3VsdC5mcmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5maXh0dXJlSW5kZXggPSBjb2xsaWRlci5fZ2V0Rml4dHVyZUluZGV4KGZpeHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wb2ludC54ID0gcG9pbnRzW2ldLngqUFRNX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wb2ludC55ID0gcG9pbnRzW2ldLnkqUFRNX1JBVElPO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ub3JtYWwueCA9IG5vcm1hbHNbaV0ueDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubm9ybWFsLnkgPSBub3JtYWxzW2ldLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZyYWN0aW9uID0gZnJhY3Rpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlcjogY29sbGlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGZpeHR1cmVJbmRleDogY29sbGlkZXIuX2dldEZpeHR1cmVJbmRleChmaXh0dXJlKSxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQ6IGNjLnYyKHBvaW50c1tpXS54KlBUTV9SQVRJTywgcG9pbnRzW2ldLnkqUFRNX1JBVElPKSxcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBjYy52Mihub3JtYWxzW2ldKSxcbiAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb246IGZyYWN0aW9uc1tpXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9LFxuIFxuICAgIHN5bmNQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9kaWVzID0gdGhpcy5fYm9kaWVzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYm9kaWVzW2ldLnN5bmNQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzeW5jUm90YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuX2JvZGllcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJvZGllc1tpXS5zeW5jUm90YXRpb24oKTtcbiAgICAgICAgfVxuICAgIH0sICAgIFxuXG4gICAgX3JlZ2lzdGVyQ29udGFjdEZpeHR1cmU6IGZ1bmN0aW9uIChmaXh0dXJlKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhY3RMaXN0ZW5lci5yZWdpc3RlckNvbnRhY3RGaXh0dXJlKGZpeHR1cmUpO1xuICAgIH0sXG5cbiAgICBfdW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlOiBmdW5jdGlvbiAoZml4dHVyZSkge1xuICAgICAgICB0aGlzLl9jb250YWN0TGlzdGVuZXIudW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlKGZpeHR1cmUpO1xuICAgIH0sXG5cbiAgICBfYWRkQm9keTogZnVuY3Rpb24gKGJvZHksIGJvZHlEZWYpIHtcbiAgICAgICAgdmFyIHdvcmxkID0gdGhpcy5fd29ybGQ7XG4gICAgICAgIHZhciBub2RlID0gYm9keS5ub2RlO1xuXG4gICAgICAgIGlmICghd29ybGQgfHwgIW5vZGUpIHJldHVybjtcblxuICAgICAgICBib2R5Ll9iMkJvZHkgPSB3b3JsZC5DcmVhdGVCb2R5KGJvZHlEZWYpO1xuICAgICAgICBib2R5Ll9iMkJvZHkuYm9keSA9IGJvZHk7XG5cbiAgICAgICAgdGhpcy5fYm9kaWVzLnB1c2goYm9keSk7XG4gICAgfSxcblxuICAgIF9yZW1vdmVCb2R5OiBmdW5jdGlvbiAoYm9keSkge1xuICAgICAgICB2YXIgd29ybGQgPSB0aGlzLl93b3JsZDtcbiAgICAgICAgaWYgKCF3b3JsZCkgcmV0dXJuO1xuXG4gICAgICAgIGJvZHkuX2IyQm9keS5ib2R5ID0gbnVsbDtcbiAgICAgICAgd29ybGQuRGVzdHJveUJvZHkoYm9keS5fYjJCb2R5KTtcbiAgICAgICAgYm9keS5fYjJCb2R5ID0gbnVsbDtcblxuICAgICAgICBjYy5qcy5hcnJheS5yZW1vdmUodGhpcy5fYm9kaWVzLCBib2R5KTtcbiAgICB9LFxuXG4gICAgX2FkZEpvaW50IChqb2ludCwgam9pbnREZWYpIHtcbiAgICAgICAgbGV0IGIyam9pbnQgPSB0aGlzLl93b3JsZC5DcmVhdGVKb2ludChqb2ludERlZik7XG4gICAgICAgIGlmICghYjJqb2ludCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgYjJqb2ludC5fam9pbnQgPSBqb2ludDtcbiAgICAgICAgam9pbnQuX2pvaW50ID0gYjJqb2ludDtcblxuICAgICAgICB0aGlzLl9qb2ludHMucHVzaChqb2ludCk7XG4gICAgfSxcblxuICAgIF9yZW1vdmVKb2ludCAoam9pbnQpIHtcbiAgICAgICAgaWYgKGpvaW50Ll9pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLkRlc3Ryb3lKb2ludChqb2ludC5fam9pbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoam9pbnQuX2pvaW50KSB7XG4gICAgICAgICAgICBqb2ludC5fam9pbnQuX2pvaW50ID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmpzLmFycmF5LnJlbW92ZSh0aGlzLl9qb2ludHMsIGpvaW50KTtcbiAgICB9LFxuXG4gICAgX2luaXRDYWxsYmFjazogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3dvcmxkKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdQbGVhc2UgaW5pdCBQaHlzaWNzTWFuYWdlciBmaXJzdCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbnRhY3RMaXN0ZW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IG5ldyBjYy5QaHlzaWNzQ29udGFjdExpc3RlbmVyKCk7XG4gICAgICAgIGxpc3RlbmVyLnNldEJlZ2luQ29udGFjdCh0aGlzLl9vbkJlZ2luQ29udGFjdCk7XG4gICAgICAgIGxpc3RlbmVyLnNldEVuZENvbnRhY3QodGhpcy5fb25FbmRDb250YWN0KTtcbiAgICAgICAgbGlzdGVuZXIuc2V0UHJlU29sdmUodGhpcy5fb25QcmVTb2x2ZSk7XG4gICAgICAgIGxpc3RlbmVyLnNldFBvc3RTb2x2ZSh0aGlzLl9vblBvc3RTb2x2ZSk7XG4gICAgICAgIHRoaXMuX3dvcmxkLlNldENvbnRhY3RMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy5fY29udGFjdExpc3RlbmVyID0gbGlzdGVuZXI7XG5cbiAgICAgICAgdGhpcy5fYWFiYlF1ZXJ5Q2FsbGJhY2sgPSBuZXcgY2MuUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrKCk7XG4gICAgICAgIHRoaXMuX3JheWNhc3RRdWVyeUNhbGxiYWNrID0gbmV3IGNjLlBoeXNpY3NSYXlDYXN0Q2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgX2luaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZWJ1Z0RyYXdGbGFncyA9IERyYXdCaXRzLmVfc2hhcGVCaXQ7XG4gICAgfSxcblxuICAgIF9nZXRXb3JsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ybGQ7XG4gICAgfSxcblxuICAgIF9zeW5jTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9kaWVzID0gdGhpcy5fYm9kaWVzO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib2R5ID0gYm9kaWVzW2ldO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBib2R5Lm5vZGU7XG5cbiAgICAgICAgICAgIHZhciBiMmJvZHkgPSBib2R5Ll9iMkJvZHk7XG4gICAgICAgICAgICB2YXIgcG9zID0gYjJib2R5LkdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHZlYzJfdG1wLnggPSBwb3MueCAqIFBUTV9SQVRJTztcbiAgICAgICAgICAgIHZlYzJfdG1wLnkgPSBwb3MueSAqIFBUTV9SQVRJTztcblxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gYjJib2R5LkdldEFuZ2xlKCkgKiBQSFlTSUNTX0FOR0xFX1RPX0FOR0xFO1xuXG4gICAgICAgICAgICAvLyBXaGVuIG5vZGUncyBwYXJlbnQgaXMgbm90IHNjZW5lLCBjb252ZXJ0IHBvc2l0aW9uIGFuZCByb3RhdGlvbi5cbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudC5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2ZWMyX3RtcCA9IG5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKCB2ZWMyX3RtcCApO1xuICAgICAgICAgICAgICAgIGFuZ2xlID0gY29udmVydFRvTm9kZVJvdGF0aW9uKCBub2RlLnBhcmVudCwgYW5nbGUgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRlbXBNYXNrID0gbm9kZS5fZXZlbnRNYXNrO1xuICAgICAgICAgICAgbm9kZS5fZXZlbnRNYXNrID0gMDtcblxuICAgICAgICAgICAgLy8gc3luYyBwb3NpdGlvblxuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHZlYzJfdG1wO1xuXG4gICAgICAgICAgICAvLyBzeW5jIHJvdGF0aW9uXG4gICAgICAgICAgICBub2RlLmFuZ2xlID0gLWFuZ2xlO1xuXG4gICAgICAgICAgICBub2RlLl9ldmVudE1hc2sgPSB0ZW1wTWFzaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGJvZHkudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgICAgICBib2R5LnJlc2V0VmVsb2NpdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25CZWdpbkNvbnRhY3Q6IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcbiAgICAgICAgdmFyIGMgPSBjYy5QaHlzaWNzQ29udGFjdC5nZXQoYjJjb250YWN0KTtcbiAgICAgICAgYy5lbWl0KENvbnRhY3RUeXBlLkJFR0lOX0NPTlRBQ1QpO1xuICAgIH0sXG5cbiAgICBfb25FbmRDb250YWN0OiBmdW5jdGlvbiAoYjJjb250YWN0KSB7XG4gICAgICAgIHZhciBjID0gYjJjb250YWN0Ll9jb250YWN0O1xuICAgICAgICBpZiAoIWMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjLmVtaXQoQ29udGFjdFR5cGUuRU5EX0NPTlRBQ1QpO1xuICAgICAgICBcbiAgICAgICAgY2MuUGh5c2ljc0NvbnRhY3QucHV0KGIyY29udGFjdCk7XG4gICAgfSxcblxuICAgIF9vblByZVNvbHZlOiBmdW5jdGlvbiAoYjJjb250YWN0KSB7XG4gICAgICAgIHZhciBjID0gYjJjb250YWN0Ll9jb250YWN0O1xuICAgICAgICBpZiAoIWMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYy5lbWl0KENvbnRhY3RUeXBlLlBSRV9TT0xWRSk7XG4gICAgfSxcblxuICAgIF9vblBvc3RTb2x2ZTogZnVuY3Rpb24gKGIyY29udGFjdCwgaW1wdWxzZSkge1xuICAgICAgICB2YXIgYyA9IGIyY29udGFjdC5fY29udGFjdDtcbiAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbXB1bHNlIG9ubHkgc3Vydml2ZSBkdXJpbmcgcG9zdCBzb2xlIGNhbGxiYWNrXG4gICAgICAgIGMuX2ltcHVsc2UgPSBpbXB1bHNlO1xuICAgICAgICBjLmVtaXQoQ29udGFjdFR5cGUuUE9TVF9TT0xWRSk7XG4gICAgICAgIGMuX2ltcHVsc2UgPSBudWxsO1xuICAgIH0sXG5cbiAgICBfY2hlY2tEZWJ1Z0RyYXdWYWxpZCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGVidWdEcmF3ZXIgfHwgIXRoaXMuX2RlYnVnRHJhd2VyLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUoJ1BIWVNJQ1NfTUFOQUdFUl9ERUJVR19EUkFXJyk7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZShub2RlKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnRHJhd2VyID0gbm9kZS5hZGRDb21wb25lbnQoY2MuR3JhcGhpY3MpO1xuXG4gICAgICAgICAgICBsZXQgZGVidWdEcmF3ID0gbmV3IERlYnVnRHJhdyh0aGlzLl9kZWJ1Z0RyYXdlcik7XG4gICAgICAgICAgICBkZWJ1Z0RyYXcuU2V0RmxhZ3ModGhpcy5kZWJ1Z0RyYXdGbGFncyk7XG4gICAgICAgICAgICB0aGlzLl93b3JsZC5TZXREZWJ1Z0RyYXcoZGVidWdEcmF3KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIEVuYWJsZWQgdGhlIHBoeXNpY3MgbWFuYWdlcj9cbiAqICEjemhcbiAqIOaMh+WumuaYr+WQpuWQr+eUqOeJqeeQhuezu+e7n++8n1xuICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVkXG4gKiBAZGVmYXVsdCBmYWxzZVxuICovXG5jYy5qcy5nZXRzZXQoUGh5c2ljc01hbmFnZXIucHJvdG90eXBlLCAnZW5hYmxlZCcsIFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLl93b3JsZCkge1xuICAgICAgICAgICAgdmFyIHdvcmxkID0gbmV3IGIyLldvcmxkKCBuZXcgYjIuVmVjMigwLCAtMTApICk7XG4gICAgICAgICAgICB3b3JsZC5TZXRBbGxvd1NsZWVwaW5nKHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLl93b3JsZCA9IHdvcmxkO1xuXG4gICAgICAgICAgICB0aGlzLl9pbml0Q2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcbiAgICB9XG4pO1xuXG4vKipcbiAqICEjZW5cbiAqIERlYnVnIGRyYXcgZmxhZ3MuXG4gKiAhI3poXG4gKiDorr7nva7osIPor5Xnu5jliLbmoIflv5dcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkZWJ1Z0RyYXdGbGFnc1xuICogQGRlZmF1bHQgMFxuICogQGV4YW1wbGVcbiAqIC8vIGVuYWJsZSBhbGwgZGVidWcgZHJhdyBpbmZvXG4gKiB2YXIgQml0cyA9IGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzO1xuICogY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IEJpdHMuZV9hYWJiQml0IHxcbiAgICBCaXRzLmVfcGFpckJpdCB8XG4gICAgQml0cy5lX2NlbnRlck9mTWFzc0JpdCB8XG4gICAgQml0cy5lX2pvaW50Qml0IHxcbiAgICBCaXRzLmVfc2hhcGVCaXQ7XG4gXG4gKiAvLyBkaXNhYmxlIGRlYnVnIGRyYXcgaW5mb1xuICogY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IDA7XG4gKi9cbmNjLmpzLmdldHNldChQaHlzaWNzTWFuYWdlci5wcm90b3R5cGUsICdkZWJ1Z0RyYXdGbGFncycsIFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlYnVnRHJhd0ZsYWdzO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy5fZGVidWdEcmF3RmxhZ3MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZWJ1Z0RyYXdlciAmJiB0aGlzLl9kZWJ1Z0RyYXdlci5ub2RlKSB0aGlzLl9kZWJ1Z0RyYXdlci5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXZhbHVlICYmIHRoaXMuX2RlYnVnRHJhd0ZsYWdzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGVidWdEcmF3ZXIgJiYgdGhpcy5fZGVidWdEcmF3ZXIubm9kZSkgdGhpcy5fZGVidWdEcmF3ZXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tEZWJ1Z0RyYXdWYWxpZCgpO1xuICAgICAgICAgICAgdGhpcy5fd29ybGQubV9kZWJ1Z0RyYXcuU2V0RmxhZ3ModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGVidWdEcmF3RmxhZ3MgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrRGVidWdEcmF3VmFsaWQoKTtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLm1fZGVidWdEcmF3LlNldEZsYWdzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbi8qKlxuICogISNlblxuICogVGhlIHBoeXNpY3Mgd29ybGQgZ3Jhdml0eS5cbiAqICEjemhcbiAqIOeJqeeQhuS4lueVjOmHjeWKm+WAvFxuICogQHByb3BlcnR5IHtWZWMyfSBncmF2aXR5XG4gKi9cbmNjLmpzLmdldHNldChQaHlzaWNzTWFuYWdlci5wcm90b3R5cGUsICdncmF2aXR5JyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl93b3JsZCkge1xuICAgICAgICAgICAgdmFyIGcgPSB0aGlzLl93b3JsZC5HZXRHcmF2aXR5KCk7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoZy54KlBUTV9SQVRJTywgZy55KlBUTV9SQVRJTyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLnYyKCk7XG4gICAgfSxcblxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fd29ybGQpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLlNldEdyYXZpdHkobmV3IGIyLlZlYzIodmFsdWUueC9QVE1fUkFUSU8sIHZhbHVlLnkvUFRNX1JBVElPKSk7XG4gICAgICAgIH1cbiAgICB9XG4pO1xuXG5cbmNjLlBoeXNpY3NNYW5hZ2VyID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzTWFuYWdlcjtcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgZHJhdyBiaXRzIGZvciBkcmF3aW5nIHBoeXNpY3MgZGVidWcgaW5mb3JtYXRpb24uPGJyPlxuICogZXhhbXBsZTo8YnI+XG4gKiBgYGBqc1xuICogY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IFxuICogIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XG4gKiAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9wYWlyQml0IHxcbiAqICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2NlbnRlck9mTWFzc0JpdCB8XG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdDtcbiAqIGBgYFxuICogISN6aFxuICog5oyH5a6a54mp55CG57O757uf6ZyA6KaB57uY5Yi25ZOq5Lqb6LCD6K+V5L+h5oGv44CCPGJyPlxuICogZXhhbXBsZTo8YnI+XG4gKiBgYGBqc1xuICogY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IFxuICogIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XG4gKiAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9wYWlyQml0IHxcbiAqICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2NlbnRlck9mTWFzc0JpdCB8XG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdDtcbiAqIGBgYFxuICogQGVudW0gUGh5c2ljc01hbmFnZXIuRHJhd0JpdHNcbiAqIEBzdGF0aWNcblxuICovXG5cbi8qKlxuICogISNlblxuICogRHJhdyBib3VuZGluZyBib3hlc1xuICogISN6aFxuICog57uY5Yi25YyF5Zu055uSXG4gKiBAcHJvcGVydHkge051bWJlcn0gZV9hYWJiQml0XG4gKiBAc3RhdGljXG4gKi9cbi8qKlxuICogISNlblxuICogRHJhdyBqb2ludCBjb25uZWN0aW9uc1xuICogISN6aFxuICog57uY5Yi25YWz6IqC6ZO+5o6l5L+h5oGvXG4gKiBAcHJvcGVydHkge051bWJlcn0gZV9qb2ludEJpdFxuICogQHN0YXRpY1xuICovXG4vKipcbiAqICEjZW5cbiAqIERyYXcgc2hhcGVzXG4gKiAhI3poXG4gKiDnu5jliLblvaLnirZcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlX3NoYXBlQml0XG4gKiBAc3RhdGljXG4gKi9cblxuLyoqXG4gKiBAY2xhc3MgUGh5c2ljc1JheUNhc3RSZXN1bHRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgUGh5c2ljc0NvbGxpZGVyIHdoaWNoIGludGVyc2VjdHMgd2l0aCB0aGUgcmF5Y2FzdFxuICogISN6aFxuICog5LiO5bCE57q/55u45Lqk55qE56Kw5pKe5L2TXG4gKiBAcHJvcGVydHkge1BoeXNpY3NDb2xsaWRlcn0gY29sbGlkZXJcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgaW50ZXJzZWN0aW9uIHBvaW50XG4gKiAhI3poXG4gKiDlsITnur/kuI7norDmkp7kvZPnm7jkuqTnmoTngrlcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gcG9pbnRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgbm9ybWFsIHZlY3RvciBhdCB0aGUgcG9pbnQgb2YgaW50ZXJzZWN0aW9uXG4gKiAhI3poXG4gKiDlsITnur/kuI7norDmkp7kvZPnm7jkuqTnmoTngrnnmoTms5XlkJHph49cbiAqIEBwcm9wZXJ0eSB7VmVjMn0gbm9ybWFsXG4gKi9cbi8qKlxuICogISNlblxuICogVGhlIGZyYWN0aW9uIG9mIHRoZSByYXljYXN0IHBhdGggYXQgdGhlIHBvaW50IG9mIGludGVyc2VjdGlvblxuICogISN6aFxuICog5bCE57q/5LiO56Kw5pKe5L2T55u45Lqk55qE54K55Y2g5bCE57q/6ZW/5bqm55qE5YiG5pWwXG4gKiBAcHJvcGVydHkge051bWJlcn0gZnJhY3Rpb25cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=