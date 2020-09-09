
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCRigidBody.js';
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
var NodeEvent = require('../CCNode').EventType;

var PTM_RATIO = require('./CCPhysicsTypes').PTM_RATIO;

var ANGLE_TO_PHYSICS_ANGLE = require('./CCPhysicsTypes').ANGLE_TO_PHYSICS_ANGLE;

var PHYSICS_ANGLE_TO_ANGLE = require('./CCPhysicsTypes').PHYSICS_ANGLE_TO_ANGLE;

var getWorldRotation = require('./utils').getWorldRotation;

var BodyType = require('./CCPhysicsTypes').BodyType;

var tempb2Vec21 = new b2.Vec2();
var tempb2Vec22 = new b2.Vec2();
var VEC2_ZERO = cc.Vec2.ZERO;
/**
 * @class RigidBody
 * @extends Component
 */

var RigidBody = cc.Class({
  name: 'cc.RigidBody',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Rigid Body',
    disallowMultiple: true
  },
  properties: {
    _type: BodyType.Dynamic,
    _allowSleep: true,
    _gravityScale: 1,
    _linearDamping: 0,
    _angularDamping: 0,
    _linearVelocity: cc.v2(0, 0),
    _angularVelocity: 0,
    _fixedRotation: false,
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set() {
        cc.warnID(8200);
      },
      visible: false,
      override: true
    },

    /**
     * !#en
     * Should enabled contact listener?
     * When a collision is trigger, the collision callback will only be called when enabled contact listener.
     * !#zh
     * 是否启用接触接听器。
     * 当 collider 产生碰撞时，只有开启了接触接听器才会调用相应的回调函数
     * @property {Boolean} enabledContactListener
     * @default false
     */
    enabledContactListener: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.enabledContactListener'
    },

    /**
     * !#en
     * Collision callback.
     * Called when two collider begin to touch.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在两个碰撞体开始接触时被调用。
     * @method onBeginContact
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * Called when two collider cease to touch.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在两个碰撞体停止接触时被调用。
     * @method onEndContact
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * This is called when a contact is updated. 
     * This allows you to inspect a contact before it goes to the solver(e.g. disable contact).
    * Note: this is called only for awake bodies.
    * Note: this is called even when the number of contact points is zero.
    * Note: this is not called for sensors.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在接触更新时被调用。
     * 你可以在接触被处理前根据他包含的信息作出相应的处理，比如将这个接触禁用掉。
     * 注意：回调只会为醒着的刚体调用。
     * 注意：接触点为零的时候也有可能被调用。
     * 注意：感知体(sensor)的回调不会被调用。
     * @method onPreSolve
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * This is called after a contact is updated. 
     * You can get the impulses from the contact in this callback.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在接触更新完后被调用。
     * 你可以在这个回调中从接触信息中获取到冲量信息。
     * @method onPostSolve
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Is this a fast moving body that should be prevented from tunneling through
     * other moving bodies? 
     * Note : 
     * - All bodies are prevented from tunneling through kinematic and static bodies. This setting is only considered on dynamic bodies.
     * - You should use this flag sparingly since it increases processing time.
     * !#zh
     * 这个刚体是否是一个快速移动的刚体，并且需要禁止穿过其他快速移动的刚体？
     * 需要注意的是 : 
     *  - 所有刚体都被禁止从 运动刚体 和 静态刚体 中穿过。此选项只关注于 动态刚体。
     *  - 应该尽量少的使用此选项，因为它会增加程序处理时间。
     * @property {Boolean} bullet
     * @default false
     */
    bullet: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.bullet'
    },

    /**
     * !#en
     * Rigidbody type : Static, Kinematic, Dynamic or Animated.
     * !#zh
     * 刚体类型： Static, Kinematic, Dynamic or Animated.
     * @property {RigidBodyType} type
     * @default RigidBodyType.Dynamic
     */
    type: {
      type: BodyType,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.type',
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        this._type = value;

        if (this._b2Body) {
          if (value === BodyType.Animated) {
            this._b2Body.SetType(BodyType.Kinematic);
          } else {
            this._b2Body.SetType(value);
          }
        }
      }
    },

    /**
     * !#en
     * Set this flag to false if this body should never fall asleep.
     * Note that this increases CPU usage.
     * !#zh
     * 如果此刚体永远都不应该进入睡眠，那么设置这个属性为 false。
     * 需要注意这将使 CPU 占用率提高。
     * @property {Boolean} allowSleep
     * @default true
     */
    allowSleep: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.allowSleep',
      get: function get() {
        if (this._b2Body) {
          return this._b2Body.IsSleepingAllowed();
        }

        return this._allowSleep;
      },
      set: function set(value) {
        this._allowSleep = value;

        if (this._b2Body) {
          this._b2Body.SetSleepingAllowed(value);
        }
      }
    },

    /**
     * !#en 
     * Scale the gravity applied to this body.
     * !#zh
     * 缩放应用在此刚体上的重力值
     * @property {Number} gravityScale
     * @default 1
     */
    gravityScale: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.gravityScale',
      get: function get() {
        return this._gravityScale;
      },
      set: function set(value) {
        this._gravityScale = value;

        if (this._b2Body) {
          this._b2Body.SetGravityScale(value);
        }
      }
    },

    /**
     * !#en
     * Linear damping is use to reduce the linear velocity.
     * The damping parameter can be larger than 1, but the damping effect becomes sensitive to the
     * time step when the damping parameter is large.
     * !#zh
     * Linear damping 用于衰减刚体的线性速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
     * @property {Number} linearDamping
     * @default 0
     */
    linearDamping: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.linearDamping',
      get: function get() {
        return this._linearDamping;
      },
      set: function set(value) {
        this._linearDamping = value;

        if (this._b2Body) {
          this._b2Body.SetLinearDamping(this._linearDamping);
        }
      }
    },

    /**
     * !#en
     * Angular damping is use to reduce the angular velocity. The damping parameter
     * can be larger than 1 but the damping effect becomes sensitive to the
     * time step when the damping parameter is large.
     * !#zh
     * Angular damping 用于衰减刚体的角速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
     * @property {Number} angularDamping
     * @default 0
     */
    angularDamping: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.angularDamping',
      get: function get() {
        return this._angularDamping;
      },
      set: function set(value) {
        this._angularDamping = value;

        if (this._b2Body) {
          this._b2Body.SetAngularDamping(value);
        }
      }
    },

    /**
     * !#en
     * The linear velocity of the body's origin in world co-ordinates.
     * !#zh
     * 刚体在世界坐标下的线性速度
     * @property {Vec2} linearVelocity
     * @default cc.v2(0,0)
     */
    linearVelocity: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.linearVelocity',
      type: cc.Vec2,
      get: function get() {
        var lv = this._linearVelocity;

        if (this._b2Body) {
          var velocity = this._b2Body.GetLinearVelocity();

          lv.x = velocity.x * PTM_RATIO;
          lv.y = velocity.y * PTM_RATIO;
        }

        return lv;
      },
      set: function set(value) {
        this._linearVelocity = value;
        var b2body = this._b2Body;

        if (b2body) {
          var temp = b2body.m_linearVelocity;
          temp.Set(value.x / PTM_RATIO, value.y / PTM_RATIO);
          b2body.SetLinearVelocity(temp);
        }
      }
    },

    /**
     * !#en
     * The angular velocity of the body.
     * !#zh
     * 刚体的角速度
     * @property {Number} angularVelocity
     * @default 0
     */
    angularVelocity: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.angularVelocity',
      get: function get() {
        if (this._b2Body) {
          return this._b2Body.GetAngularVelocity() * PHYSICS_ANGLE_TO_ANGLE;
        }

        return this._angularVelocity;
      },
      set: function set(value) {
        this._angularVelocity = value;

        if (this._b2Body) {
          this._b2Body.SetAngularVelocity(value * ANGLE_TO_PHYSICS_ANGLE);
        }
      }
    },

    /**
     * !#en
     * Should this body be prevented from rotating?
     * !#zh
     * 是否禁止此刚体进行旋转
     * @property {Boolean} fixedRotation
     * @default false
     */
    fixedRotation: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.fixedRotation',
      get: function get() {
        return this._fixedRotation;
      },
      set: function set(value) {
        this._fixedRotation = value;

        if (this._b2Body) {
          this._b2Body.SetFixedRotation(value);
        }
      }
    },

    /**
     * !#en
     * Set the sleep state of the body. A sleeping body has very low CPU cost.(When the rigid body is hit, if the rigid body is in sleep state, it will be immediately awakened.)
     * !#zh
     * 设置刚体的睡眠状态。 睡眠的刚体具有非常低的 CPU 成本。（当刚体被碰撞到时，如果刚体处于睡眠状态，它会立即被唤醒）
     * @property {Boolean} awake
     * @default false
     */
    awake: {
      visible: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.awake',
      get: function get() {
        return this._b2Body ? this._b2Body.IsAwake() : false;
      },
      set: function set(value) {
        if (this._b2Body) {
          this._b2Body.SetAwake(value);
        }
      }
    },

    /**
     * !#en
     * Whether to wake up this rigid body during initialization
     * !#zh
     * 是否在初始化时唤醒此刚体
     * @property {Boolean} awakeOnLoad
     * @default true
     */
    awakeOnLoad: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.awakeOnLoad',
      animatable: false
    },

    /**
     * !#en
     * Set the active state of the body. An inactive body is not
    * simulated and cannot be collided with or woken up.
    * If body is active, all fixtures will be added to the
    * broad-phase.
    * If body is inactive, all fixtures will be removed from
    * the broad-phase and all contacts will be destroyed.
    * Fixtures on an inactive body are implicitly inactive and will
    * not participate in collisions, ray-casts, or queries.
    * Joints connected to an inactive body are implicitly inactive.
     * !#zh
     * 设置刚体的激活状态。一个非激活状态下的刚体是不会被模拟和碰撞的，不管它是否处于睡眠状态下。
     * 如果刚体处于激活状态下，所有夹具会被添加到 粗测阶段（broad-phase）。
     * 如果刚体处于非激活状态下，所有夹具会被从 粗测阶段（broad-phase）中移除。
     * 在非激活状态下的夹具不会参与到碰撞，射线，或者查找中
     * 链接到非激活状态下刚体的关节也是非激活的。
     * @property {Boolean} active
     * @default true
     */
    active: {
      visible: false,
      get: function get() {
        return this._b2Body ? this._b2Body.IsActive() : false;
      },
      set: function set(value) {
        if (this._b2Body) {
          this._b2Body.SetActive(value);
        }
      }
    }
  },

  /**
   * !#en
   * Gets a local point relative to the body's origin given a world point.
   * !#zh
   * 将一个给定的世界坐标系下的点转换为刚体本地坐标系下的点
   * @method getLocalPoint
   * @param {Vec2} worldPoint - a point in world coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the corresponding local point relative to the body's origin.
   */
  getLocalPoint: function getLocalPoint(worldPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldPoint.x / PTM_RATIO, worldPoint.y / PTM_RATIO);

      var pos = this._b2Body.GetLocalPoint(tempb2Vec21, out);

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world coordinates of a point given the local coordinates.
   * !#zh
   * 将一个给定的刚体本地坐标系下的点转换为世界坐标系下的点
   * @method getWorldPoint
   * @param {Vec2} localPoint - a point in local coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the same point expressed in world coordinates.
   */
  getWorldPoint: function getWorldPoint(localPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(localPoint.x / PTM_RATIO, localPoint.y / PTM_RATIO);

      var pos = this._b2Body.GetWorldPoint(tempb2Vec21, out);

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world coordinates of a vector given the local coordinates.
   * !#zh
   * 将一个给定的世界坐标系下的向量转换为刚体本地坐标系下的向量
   * @method getWorldVector
   * @param {Vec2} localVector - a vector in world coordinates.
   * @param {Vec2} out - optional, the receiving vector
   * @return {Vec2} the same vector expressed in local coordinates.
   */
  getWorldVector: function getWorldVector(localVector, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(localVector.x / PTM_RATIO, localVector.y / PTM_RATIO);

      var vector = this._b2Body.GetWorldVector(tempb2Vec21, out);

      out.x = vector.x * PTM_RATIO;
      out.y = vector.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Gets a local vector relative to the body's origin given a world vector.
   * !#zh
   * 将一个给定的世界坐标系下的点转换为刚体本地坐标系下的点
   * @method getLocalVector
   * @param {Vec2} worldVector - a vector in world coordinates.
   * @param {Vec2} out - optional, the receiving vector
   * @return {Vec2} the corresponding local vector relative to the body's origin.
   */
  getLocalVector: function getLocalVector(worldVector, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldVector.x / PTM_RATIO, worldVector.y / PTM_RATIO);

      var vector = this._b2Body.GetLocalVector(tempb2Vec21, out);

      out.x = vector.x * PTM_RATIO;
      out.y = vector.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world body origin position.
   * !#zh
   * 获取刚体世界坐标系下的原点值
   * @method getWorldPosition
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the world position of the body's origin.
   */
  getWorldPosition: function getWorldPosition(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetPosition();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world body rotation angle.
   * !#zh
   * 获取刚体世界坐标系下的旋转值。
   * @method getWorldRotation
   * @return {Number} the current world rotation angle.
   */
  getWorldRotation: function getWorldRotation() {
    if (this._b2Body) {
      return this._b2Body.GetAngle() * PHYSICS_ANGLE_TO_ANGLE;
    }

    return 0;
  },

  /**
   * !#en
   * Get the local position of the center of mass.
   * !#zh
   * 获取刚体本地坐标系下的质心
   * @method getLocalCenter
   * @return {Vec2} the local position of the center of mass.
   */
  getLocalCenter: function getLocalCenter(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetLocalCenter();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world position of the center of mass.
   * !#zh
   * 获取刚体世界坐标系下的质心
   * @method getWorldCenter
   * @return {Vec2} the world position of the center of mass.
   */
  getWorldCenter: function getWorldCenter(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetWorldCenter();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world linear velocity of a world point attached to this body.
   * !#zh
   * 获取刚体上指定点的线性速度
   * @method getLinearVelocityFromWorldPoint
   * @param {Vec2} worldPoint - a point in world coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the world velocity of a point. 
   */
  getLinearVelocityFromWorldPoint: function getLinearVelocityFromWorldPoint(worldPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldPoint.x / PTM_RATIO, worldPoint.y / PTM_RATIO);

      var velocity = this._b2Body.GetLinearVelocityFromWorldPoint(tempb2Vec21, out);

      out.x = velocity.x * PTM_RATIO;
      out.y = velocity.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get total mass of the body.
   * !#zh
   * 获取刚体的质量。
   * @method getMass
   * @return {Number} the total mass of the body.
   */
  getMass: function getMass() {
    return this._b2Body ? this._b2Body.GetMass() : 0;
  },

  /**
   * !#en
   * Get the rotational inertia of the body about the local origin.
   * !#zh
   * 获取刚体本地坐标系下原点的旋转惯性
   * @method getInertia
   * @return {Number} the rotational inertia, usually in kg-m^2.
   */
  getInertia: function getInertia() {
    return this._b2Body ? this._b2Body.GetInertia() * PTM_RATIO * PTM_RATIO : 0;
  },

  /**
   * !#en
   * Get all the joints connect to the rigidbody.
   * !#zh
   * 获取链接到此刚体的所有关节
   * @method getJointList
   * @return {[Joint]} the joint list.
   */
  getJointList: function getJointList() {
    if (!this._b2Body) return [];
    var joints = [];

    var list = this._b2Body.GetJointList();

    if (!list) return [];
    joints.push(list.joint._joint); // find prev joint

    var prev = list.prev;

    while (prev) {
      joints.push(prev.joint._joint);
      prev = prev.prev;
    } // find next joint


    var next = list.next;

    while (next) {
      joints.push(next.joint._joint);
      next = next.next;
    }

    return joints;
  },

  /**
   * !#en
   * Apply a force at a world point. If the force is not
  * applied at the center of mass, it will generate a torque and
  * affect the angular velocity.
   * !#zh
   * 施加一个力到刚体上的一个点。如果力没有施加到刚体的质心上，还会产生一个扭矩并且影响到角速度。
   * @method applyForce
   * @param {Vec2} force - the world force vector.
   * @param {Vec2} point - the world position.
   * @param {Boolean} wake - also wake up the body.
   */
  applyForce: function applyForce(force, point, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(force.x / PTM_RATIO, force.y / PTM_RATIO);
      tempb2Vec22.Set(point.x / PTM_RATIO, point.y / PTM_RATIO);

      this._b2Body.ApplyForce(tempb2Vec21, tempb2Vec22, wake);
    }
  },

  /**
   * !#en
   * Apply a force to the center of mass.
   * !#zh
   * 施加一个力到刚体上的质心上。
   * @method applyForceToCenter
   * @param {Vec2} force - the world force vector.
   * @param {Boolean} wake - also wake up the body.
   */
  applyForceToCenter: function applyForceToCenter(force, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(force.x / PTM_RATIO, force.y / PTM_RATIO);

      this._b2Body.ApplyForceToCenter(tempb2Vec21, wake);
    }
  },

  /**
   * !#en
   * Apply a torque. This affects the angular velocity.
   * !#zh
   * 施加一个扭矩力，将影响刚体的角速度
   * @method applyTorque
   * @param {Number} torque - about the z-axis (out of the screen), usually in N-m.
   * @param {Boolean} wake - also wake up the body
   */
  applyTorque: function applyTorque(torque, wake) {
    if (this._b2Body) {
      this._b2Body.ApplyTorque(torque / PTM_RATIO, wake);
    }
  },

  /**
   * !#en
   * Apply a impulse at a world point, This immediately modifies the velocity.
  * If the impulse is not applied at the center of mass, it will generate a torque and
  * affect the angular velocity.
   * !#zh
   * 施加冲量到刚体上的一个点，将立即改变刚体的线性速度。
   * 如果冲量施加到的点不是刚体的质心，那么将产生一个扭矩并影响刚体的角速度。
   * @method applyLinearImpulse
   * @param {Vec2} impulse - the world impulse vector, usually in N-seconds or kg-m/s.
   * @param {Vec2} point - the world position
   * @param {Boolean} wake - alse wake up the body
   */
  applyLinearImpulse: function applyLinearImpulse(impulse, point, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(impulse.x / PTM_RATIO, impulse.y / PTM_RATIO);
      tempb2Vec22.Set(point.x / PTM_RATIO, point.y / PTM_RATIO);

      this._b2Body.ApplyLinearImpulse(tempb2Vec21, tempb2Vec22, wake);
    }
  },

  /**
   * !#en
   * Apply an angular impulse.
   * !#zh
   * 施加一个角速度冲量。
   * @method applyAngularImpulse
   * @param {Number} impulse - the angular impulse in units of kg*m*m/s
   * @param {Boolean} wake - also wake up the body
   */
  applyAngularImpulse: function applyAngularImpulse(impulse, wake) {
    if (this._b2Body) {
      this._b2Body.ApplyAngularImpulse(impulse / PTM_RATIO / PTM_RATIO, wake);
    }
  },

  /**
   * !#en
   * Synchronize node's world position to box2d rigidbody's position.
   * If enableAnimated is true and rigidbody's type is Animated type, 
   * will set linear velocity instead of directly set rigidbody's position.
   * !#zh
   * 同步节点的世界坐标到 box2d 刚体的坐标上。
   * 如果 enableAnimated 是 true，并且刚体的类型是 Animated ，那么将设置刚体的线性速度来代替直接设置刚体的位置。
   * @method syncPosition
   * @param {Boolean} enableAnimated
   */
  syncPosition: function syncPosition(enableAnimated) {
    var b2body = this._b2Body;
    if (!b2body) return;
    var pos = this.node.convertToWorldSpaceAR(VEC2_ZERO);
    var temp;

    if (this.type === BodyType.Animated) {
      temp = b2body.GetLinearVelocity();
    } else {
      temp = b2body.GetPosition();
    }

    temp.x = pos.x / PTM_RATIO;
    temp.y = pos.y / PTM_RATIO;

    if (this.type === BodyType.Animated && enableAnimated) {
      var b2Pos = b2body.GetPosition();
      var timeStep = cc.game.config['frameRate'];
      temp.x = (temp.x - b2Pos.x) * timeStep;
      temp.y = (temp.y - b2Pos.y) * timeStep;
      b2body.SetAwake(true);
      b2body.SetLinearVelocity(temp);
    } else {
      b2body.SetTransformVec(temp, b2body.GetAngle());
    }
  },

  /**
   * !#en
   * Synchronize node's world angle to box2d rigidbody's angle.
   * If enableAnimated is true and rigidbody's type is Animated type, 
   * will set angular velocity instead of directly set rigidbody's angle.
   * !#zh
   * 同步节点的世界旋转角度值到 box2d 刚体的旋转值上。
   * 如果 enableAnimated 是 true，并且刚体的类型是 Animated ，那么将设置刚体的角速度来代替直接设置刚体的角度。
   * @method syncRotation
   * @param {Boolean} enableAnimated
   */
  syncRotation: function syncRotation(enableAnimated) {
    var b2body = this._b2Body;
    if (!b2body) return;
    var rotation = ANGLE_TO_PHYSICS_ANGLE * getWorldRotation(this.node);

    if (this.type === BodyType.Animated && enableAnimated) {
      var b2Rotation = b2body.GetAngle();
      var timeStep = cc.game.config['frameRate'];
      b2body.SetAwake(true);
      b2body.SetAngularVelocity((rotation - b2Rotation) * timeStep);
    } else {
      b2body.SetTransformVec(b2body.GetPosition(), rotation);
    }
  },
  resetVelocity: function resetVelocity() {
    var b2body = this._b2Body;
    if (!b2body) return;
    var temp = b2body.m_linearVelocity;
    temp.Set(0, 0);
    b2body.SetLinearVelocity(temp);
    b2body.SetAngularVelocity(0);
  },
  onEnable: function onEnable() {
    this._init();
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  _registerNodeEvents: function _registerNodeEvents() {
    var node = this.node;
    node.on(NodeEvent.POSITION_CHANGED, this._onNodePositionChanged, this);
    node.on(NodeEvent.ROTATION_CHANGED, this._onNodeRotationChanged, this);
    node.on(NodeEvent.SCALE_CHANGED, this._onNodeScaleChanged, this);
  },
  _unregisterNodeEvents: function _unregisterNodeEvents() {
    var node = this.node;
    node.off(NodeEvent.POSITION_CHANGED, this._onNodePositionChanged, this);
    node.off(NodeEvent.ROTATION_CHANGED, this._onNodeRotationChanged, this);
    node.off(NodeEvent.SCALE_CHANGED, this._onNodeScaleChanged, this);
  },
  _onNodePositionChanged: function _onNodePositionChanged() {
    this.syncPosition(true);
  },
  _onNodeRotationChanged: function _onNodeRotationChanged(event) {
    this.syncRotation(true);
  },
  _onNodeScaleChanged: function _onNodeScaleChanged(event) {
    if (this._b2Body) {
      var colliders = this.getComponents(cc.PhysicsCollider);

      for (var i = 0; i < colliders.length; i++) {
        colliders[i].apply();
      }
    }
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;

    this._registerNodeEvents();

    var bodyDef = new b2.BodyDef();

    if (this.type === BodyType.Animated) {
      bodyDef.type = BodyType.Kinematic;
    } else {
      bodyDef.type = this.type;
    }

    bodyDef.allowSleep = this.allowSleep;
    bodyDef.gravityScale = this.gravityScale;
    bodyDef.linearDamping = this.linearDamping;
    bodyDef.angularDamping = this.angularDamping;
    var linearVelocity = this.linearVelocity;
    bodyDef.linearVelocity = new b2.Vec2(linearVelocity.x / PTM_RATIO, linearVelocity.y / PTM_RATIO);
    bodyDef.angularVelocity = this.angularVelocity * ANGLE_TO_PHYSICS_ANGLE;
    bodyDef.fixedRotation = this.fixedRotation;
    bodyDef.bullet = this.bullet;
    var node = this.node;
    var pos = node.convertToWorldSpaceAR(VEC2_ZERO);
    bodyDef.position = new b2.Vec2(pos.x / PTM_RATIO, pos.y / PTM_RATIO);
    bodyDef.angle = -(Math.PI / 180) * getWorldRotation(node);
    bodyDef.awake = this.awakeOnLoad;

    cc.director.getPhysicsManager()._addBody(this, bodyDef);

    this._inited = true;
  },
  __destroy: function __destroy() {
    if (!this._inited) return;

    cc.director.getPhysicsManager()._removeBody(this);

    this._unregisterNodeEvents();

    this._inited = false;
  },
  _getBody: function _getBody() {
    return this._b2Body;
  }
});
cc.RigidBody = module.exports = RigidBody;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvQ0NSaWdpZEJvZHkuanMiXSwibmFtZXMiOlsiTm9kZUV2ZW50IiwicmVxdWlyZSIsIkV2ZW50VHlwZSIsIlBUTV9SQVRJTyIsIkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUiLCJQSFlTSUNTX0FOR0xFX1RPX0FOR0xFIiwiZ2V0V29ybGRSb3RhdGlvbiIsIkJvZHlUeXBlIiwidGVtcGIyVmVjMjEiLCJiMiIsIlZlYzIiLCJ0ZW1wYjJWZWMyMiIsIlZFQzJfWkVSTyIsImNjIiwiWkVSTyIsIlJpZ2lkQm9keSIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJkaXNhbGxvd011bHRpcGxlIiwicHJvcGVydGllcyIsIl90eXBlIiwiRHluYW1pYyIsIl9hbGxvd1NsZWVwIiwiX2dyYXZpdHlTY2FsZSIsIl9saW5lYXJEYW1waW5nIiwiX2FuZ3VsYXJEYW1waW5nIiwiX2xpbmVhclZlbG9jaXR5IiwidjIiLCJfYW5ndWxhclZlbG9jaXR5IiwiX2ZpeGVkUm90YXRpb24iLCJlbmFibGVkIiwiZ2V0IiwiX2VuYWJsZWQiLCJzZXQiLCJ3YXJuSUQiLCJ2aXNpYmxlIiwib3ZlcnJpZGUiLCJlbmFibGVkQ29udGFjdExpc3RlbmVyIiwidG9vbHRpcCIsIkNDX0RFViIsImJ1bGxldCIsInR5cGUiLCJ2YWx1ZSIsIl9iMkJvZHkiLCJBbmltYXRlZCIsIlNldFR5cGUiLCJLaW5lbWF0aWMiLCJhbGxvd1NsZWVwIiwiSXNTbGVlcGluZ0FsbG93ZWQiLCJTZXRTbGVlcGluZ0FsbG93ZWQiLCJncmF2aXR5U2NhbGUiLCJTZXRHcmF2aXR5U2NhbGUiLCJsaW5lYXJEYW1waW5nIiwiU2V0TGluZWFyRGFtcGluZyIsImFuZ3VsYXJEYW1waW5nIiwiU2V0QW5ndWxhckRhbXBpbmciLCJsaW5lYXJWZWxvY2l0eSIsImx2IiwidmVsb2NpdHkiLCJHZXRMaW5lYXJWZWxvY2l0eSIsIngiLCJ5IiwiYjJib2R5IiwidGVtcCIsIm1fbGluZWFyVmVsb2NpdHkiLCJTZXQiLCJTZXRMaW5lYXJWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsIkdldEFuZ3VsYXJWZWxvY2l0eSIsIlNldEFuZ3VsYXJWZWxvY2l0eSIsImZpeGVkUm90YXRpb24iLCJTZXRGaXhlZFJvdGF0aW9uIiwiYXdha2UiLCJJc0F3YWtlIiwiU2V0QXdha2UiLCJhd2FrZU9uTG9hZCIsImFuaW1hdGFibGUiLCJhY3RpdmUiLCJJc0FjdGl2ZSIsIlNldEFjdGl2ZSIsImdldExvY2FsUG9pbnQiLCJ3b3JsZFBvaW50Iiwib3V0IiwicG9zIiwiR2V0TG9jYWxQb2ludCIsImdldFdvcmxkUG9pbnQiLCJsb2NhbFBvaW50IiwiR2V0V29ybGRQb2ludCIsImdldFdvcmxkVmVjdG9yIiwibG9jYWxWZWN0b3IiLCJ2ZWN0b3IiLCJHZXRXb3JsZFZlY3RvciIsImdldExvY2FsVmVjdG9yIiwid29ybGRWZWN0b3IiLCJHZXRMb2NhbFZlY3RvciIsImdldFdvcmxkUG9zaXRpb24iLCJHZXRQb3NpdGlvbiIsIkdldEFuZ2xlIiwiZ2V0TG9jYWxDZW50ZXIiLCJHZXRMb2NhbENlbnRlciIsImdldFdvcmxkQ2VudGVyIiwiR2V0V29ybGRDZW50ZXIiLCJnZXRMaW5lYXJWZWxvY2l0eUZyb21Xb3JsZFBvaW50IiwiR2V0TGluZWFyVmVsb2NpdHlGcm9tV29ybGRQb2ludCIsImdldE1hc3MiLCJHZXRNYXNzIiwiZ2V0SW5lcnRpYSIsIkdldEluZXJ0aWEiLCJnZXRKb2ludExpc3QiLCJqb2ludHMiLCJsaXN0IiwiR2V0Sm9pbnRMaXN0IiwicHVzaCIsImpvaW50IiwiX2pvaW50IiwicHJldiIsIm5leHQiLCJhcHBseUZvcmNlIiwiZm9yY2UiLCJwb2ludCIsIndha2UiLCJBcHBseUZvcmNlIiwiYXBwbHlGb3JjZVRvQ2VudGVyIiwiQXBwbHlGb3JjZVRvQ2VudGVyIiwiYXBwbHlUb3JxdWUiLCJ0b3JxdWUiLCJBcHBseVRvcnF1ZSIsImFwcGx5TGluZWFySW1wdWxzZSIsImltcHVsc2UiLCJBcHBseUxpbmVhckltcHVsc2UiLCJhcHBseUFuZ3VsYXJJbXB1bHNlIiwiQXBwbHlBbmd1bGFySW1wdWxzZSIsInN5bmNQb3NpdGlvbiIsImVuYWJsZUFuaW1hdGVkIiwibm9kZSIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImIyUG9zIiwidGltZVN0ZXAiLCJnYW1lIiwiY29uZmlnIiwiU2V0VHJhbnNmb3JtVmVjIiwic3luY1JvdGF0aW9uIiwicm90YXRpb24iLCJiMlJvdGF0aW9uIiwicmVzZXRWZWxvY2l0eSIsIm9uRW5hYmxlIiwiX2luaXQiLCJvbkRpc2FibGUiLCJfZGVzdHJveSIsIl9yZWdpc3Rlck5vZGVFdmVudHMiLCJvbiIsIlBPU0lUSU9OX0NIQU5HRUQiLCJfb25Ob2RlUG9zaXRpb25DaGFuZ2VkIiwiUk9UQVRJT05fQ0hBTkdFRCIsIl9vbk5vZGVSb3RhdGlvbkNoYW5nZWQiLCJTQ0FMRV9DSEFOR0VEIiwiX29uTm9kZVNjYWxlQ2hhbmdlZCIsIl91bnJlZ2lzdGVyTm9kZUV2ZW50cyIsIm9mZiIsImV2ZW50IiwiY29sbGlkZXJzIiwiZ2V0Q29tcG9uZW50cyIsIlBoeXNpY3NDb2xsaWRlciIsImkiLCJsZW5ndGgiLCJhcHBseSIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJwdXNoRGVsYXlFdmVudCIsIl9faW5pdCIsIl9pbml0ZWQiLCJib2R5RGVmIiwiQm9keURlZiIsInBvc2l0aW9uIiwiYW5nbGUiLCJNYXRoIiwiUEkiLCJfYWRkQm9keSIsIl9fZGVzdHJveSIsIl9yZW1vdmVCb2R5IiwiX2dldEJvZHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCQyxTQUF2Qzs7QUFDQSxJQUFJQyxTQUFTLEdBQUdGLE9BQU8sQ0FBQyxrQkFBRCxD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LElBQUQsQ0FBbkQ7QUFFQXFDLElBQUFBLE9BQU8sQ0FBQ25HLEtBQVIsR0FBZ0IsS0FBS0csV0FBckI7O0FBRUFsRSxJQUFBQSxFQUFFLENBQUM2SixRQUFILENBQVlDLGlCQUFaLEdBQWdDVSxRQUFoQyxDQUF5QyxJQUF6QyxFQUErQ04sT0FBL0M7O0FBRUEsU0FBS0QsT0FBTCxHQUFlLElBQWY7QUFDSCxHQTEyQm9CO0FBMjJCckJRLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixRQUFJLENBQUMsS0FBS1IsT0FBVixFQUFtQjs7QUFFbkJqSyxJQUFBQSxFQUFFLENBQUM2SixRQUFILENBQVlDLGlCQUFaLEdBQWdDWSxXQUFoQyxDQUE0QyxJQUE1Qzs7QUFDQSxTQUFLdEIscUJBQUw7O0FBRUEsU0FBS2EsT0FBTCxHQUFlLEtBQWY7QUFDSCxHQWwzQm9CO0FBbzNCckJVLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixXQUFPLEtBQUt6SSxPQUFaO0FBQ0g7QUF0M0JvQixDQUFULENBQWhCO0FBMDNCQWxDLEVBQUUsQ0FBQ0UsU0FBSCxHQUFlMEssTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0ssU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IE5vZGVFdmVudCA9IHJlcXVpcmUoJy4uL0NDTm9kZScpLkV2ZW50VHlwZTtcbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbnZhciBQSFlTSUNTX0FOR0xFX1RPX0FOR0xFID0gcmVxdWlyZSgnLi9DQ1BoeXNpY3NUeXBlcycpLlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XG5cbnZhciBnZXRXb3JsZFJvdGF0aW9uID0gcmVxdWlyZSgnLi91dGlscycpLmdldFdvcmxkUm90YXRpb247XG52YXIgQm9keVR5cGUgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuQm9keVR5cGU7XG5cbnZhciB0ZW1wYjJWZWMyMSA9IG5ldyBiMi5WZWMyKCk7XG52YXIgdGVtcGIyVmVjMjIgPSBuZXcgYjIuVmVjMigpO1xuXG52YXIgVkVDMl9aRVJPID0gY2MuVmVjMi5aRVJPO1xuXG4vKipcbiAqIEBjbGFzcyBSaWdpZEJvZHlcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG52YXIgUmlnaWRCb2R5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5SaWdpZEJvZHknLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL1JpZ2lkIEJvZHknLFxuICAgICAgICBkaXNhbGxvd011bHRpcGxlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3R5cGU6IEJvZHlUeXBlLkR5bmFtaWMsXG4gICAgICAgIF9hbGxvd1NsZWVwOiB0cnVlLFxuICAgICAgICBfZ3Jhdml0eVNjYWxlOiAxLFxuICAgICAgICBfbGluZWFyRGFtcGluZzogMCxcbiAgICAgICAgX2FuZ3VsYXJEYW1waW5nOiAwLFxuICAgICAgICBfbGluZWFyVmVsb2NpdHk6IGNjLnYyKDAsIDApLFxuICAgICAgICBfYW5ndWxhclZlbG9jaXR5OiAwLFxuICAgICAgICBfZml4ZWRSb3RhdGlvbjogZmFsc2UsXG5cbiAgICAgICAgZW5hYmxlZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDgyMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTaG91bGQgZW5hYmxlZCBjb250YWN0IGxpc3RlbmVyP1xuICAgICAgICAgKiBXaGVuIGEgY29sbGlzaW9uIGlzIHRyaWdnZXIsIHRoZSBjb2xsaXNpb24gY2FsbGJhY2sgd2lsbCBvbmx5IGJlIGNhbGxlZCB3aGVuIGVuYWJsZWQgY29udGFjdCBsaXN0ZW5lci5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKblkK/nlKjmjqXop6bmjqXlkKzlmajjgIJcbiAgICAgICAgICog5b2TIGNvbGxpZGVyIOS6p+eUn+eisOaSnuaXtu+8jOWPquacieW8gOWQr+S6huaOpeinpuaOpeWQrOWZqOaJjeS8muiwg+eUqOebuOW6lOeahOWbnuiwg+WHveaVsFxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZWRDb250YWN0TGlzdGVuZXJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZWRDb250YWN0TGlzdGVuZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5lbmFibGVkQ29udGFjdExpc3RlbmVyJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIENvbGxpc2lvbiBjYWxsYmFjay5cbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdHdvIGNvbGxpZGVyIGJlZ2luIHRvIHRvdWNoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjkuKTkuKrnorDmkp7kvZPlvIDlp4vmjqXop6bml7booqvosIPnlKjjgIJcbiAgICAgICAgICogQG1ldGhvZCBvbkJlZ2luQ29udGFjdFxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb250YWN0fSBjb250YWN0IC0gY29udGFjdCBpbmZvcm1hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gc2VsZkNvbGxpZGVyIC0gdGhlIGNvbGxpZGVyIGJlbG9uZyB0byB0aGlzIHJpZ2lkYm9keVxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gb3RoZXJDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gYW5vdGhlciByaWdpZGJvZHlcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIENvbGxpc2lvbiBjYWxsYmFjay5cbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdHdvIGNvbGxpZGVyIGNlYXNlIHRvIHRvdWNoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjkuKTkuKrnorDmkp7kvZPlgZzmraLmjqXop6bml7booqvosIPnlKjjgIJcbiAgICAgICAgICogQG1ldGhvZCBvbkVuZENvbnRhY3RcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29udGFjdH0gY29udGFjdCAtIGNvbnRhY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IHNlbGZDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gdGhpcyByaWdpZGJvZHlcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IG90aGVyQ29sbGlkZXIgLSB0aGUgY29sbGlkZXIgYmVsb25nIHRvIGFub3RoZXIgcmlnaWRib2R5XG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBDb2xsaXNpb24gY2FsbGJhY2suXG4gICAgICAgICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gYSBjb250YWN0IGlzIHVwZGF0ZWQuIFxuICAgICAgICAgKiBUaGlzIGFsbG93cyB5b3UgdG8gaW5zcGVjdCBhIGNvbnRhY3QgYmVmb3JlIGl0IGdvZXMgdG8gdGhlIHNvbHZlcihlLmcuIGRpc2FibGUgY29udGFjdCkuXG5cdCAgICAgKiBOb3RlOiB0aGlzIGlzIGNhbGxlZCBvbmx5IGZvciBhd2FrZSBib2RpZXMuXG5cdCAgICAgKiBOb3RlOiB0aGlzIGlzIGNhbGxlZCBldmVuIHdoZW4gdGhlIG51bWJlciBvZiBjb250YWN0IHBvaW50cyBpcyB6ZXJvLlxuXHQgICAgICogTm90ZTogdGhpcyBpcyBub3QgY2FsbGVkIGZvciBzZW5zb3JzLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjmjqXop6bmm7TmlrDml7booqvosIPnlKjjgIJcbiAgICAgICAgICog5L2g5Y+v5Lul5Zyo5o6l6Kem6KKr5aSE55CG5YmN5qC55o2u5LuW5YyF5ZCr55qE5L+h5oGv5L2c5Ye655u45bqU55qE5aSE55CG77yM5q+U5aaC5bCG6L+Z5Liq5o6l6Kem56aB55So5o6J44CCXG4gICAgICAgICAqIOazqOaEj++8muWbnuiwg+WPquS8muS4uumGkuedgOeahOWImuS9k+iwg+eUqOOAglxuICAgICAgICAgKiDms6jmhI/vvJrmjqXop6bngrnkuLrpm7bnmoTml7blgJnkuZ/mnInlj6/og73ooqvosIPnlKjjgIJcbiAgICAgICAgICog5rOo5oSP77ya5oSf55+l5L2TKHNlbnNvcinnmoTlm57osIPkuI3kvJrooqvosIPnlKjjgIJcbiAgICAgICAgICogQG1ldGhvZCBvblByZVNvbHZlXG4gICAgICAgICAqIEBwYXJhbSB7UGh5c2ljc0NvbnRhY3R9IGNvbnRhY3QgLSBjb250YWN0IGluZm9ybWF0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7UGh5c2ljc0NvbGxpZGVyfSBzZWxmQ29sbGlkZXIgLSB0aGUgY29sbGlkZXIgYmVsb25nIHRvIHRoaXMgcmlnaWRib2R5XG4gICAgICAgICAqIEBwYXJhbSB7UGh5c2ljc0NvbGxpZGVyfSBvdGhlckNvbGxpZGVyIC0gdGhlIGNvbGxpZGVyIGJlbG9uZyB0byBhbm90aGVyIHJpZ2lkYm9keVxuICAgICAgICAgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogQ29sbGlzaW9uIGNhbGxiYWNrLlxuICAgICAgICAgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciBhIGNvbnRhY3QgaXMgdXBkYXRlZC4gXG4gICAgICAgICAqIFlvdSBjYW4gZ2V0IHRoZSBpbXB1bHNlcyBmcm9tIHRoZSBjb250YWN0IGluIHRoaXMgY2FsbGJhY2suXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog56Kw5pKe5Zue6LCD44CCXG4gICAgICAgICAqIOWmguaenOS9oOeahOiEmuacrOS4reWunueOsOS6hui/meS4quWHveaVsO+8jOmCo+S5iOWug+WwhuS8muWcqOaOpeinpuabtOaWsOWujOWQjuiiq+iwg+eUqOOAglxuICAgICAgICAgKiDkvaDlj6/ku6XlnKjov5nkuKrlm57osIPkuK3ku47mjqXop6bkv6Hmga/kuK3ojrflj5bliLDlhrLph4/kv6Hmga/jgIJcbiAgICAgICAgICogQG1ldGhvZCBvblBvc3RTb2x2ZVxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb250YWN0fSBjb250YWN0IC0gY29udGFjdCBpbmZvcm1hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gc2VsZkNvbGxpZGVyIC0gdGhlIGNvbGxpZGVyIGJlbG9uZyB0byB0aGlzIHJpZ2lkYm9keVxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gb3RoZXJDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gYW5vdGhlciByaWdpZGJvZHlcbiAgICAgICAgICovXG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBJcyB0aGlzIGEgZmFzdCBtb3ZpbmcgYm9keSB0aGF0IHNob3VsZCBiZSBwcmV2ZW50ZWQgZnJvbSB0dW5uZWxpbmcgdGhyb3VnaFxuICAgICAgICAgKiBvdGhlciBtb3ZpbmcgYm9kaWVzPyBcbiAgICAgICAgICogTm90ZSA6IFxuICAgICAgICAgKiAtIEFsbCBib2RpZXMgYXJlIHByZXZlbnRlZCBmcm9tIHR1bm5lbGluZyB0aHJvdWdoIGtpbmVtYXRpYyBhbmQgc3RhdGljIGJvZGllcy4gVGhpcyBzZXR0aW5nIGlzIG9ubHkgY29uc2lkZXJlZCBvbiBkeW5hbWljIGJvZGllcy5cbiAgICAgICAgICogLSBZb3Ugc2hvdWxkIHVzZSB0aGlzIGZsYWcgc3BhcmluZ2x5IHNpbmNlIGl0IGluY3JlYXNlcyBwcm9jZXNzaW5nIHRpbWUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6L+Z5Liq5Yia5L2T5piv5ZCm5piv5LiA5Liq5b+r6YCf56e75Yqo55qE5Yia5L2T77yM5bm25LiU6ZyA6KaB56aB5q2i56m/6L+H5YW25LuW5b+r6YCf56e75Yqo55qE5Yia5L2T77yfXG4gICAgICAgICAqIOmcgOimgeazqOaEj+eahOaYryA6IFxuICAgICAgICAgKiAgLSDmiYDmnInliJrkvZPpg73ooqvnpoHmraLku44g6L+Q5Yqo5Yia5L2TIOWSjCDpnZnmgIHliJrkvZMg5Lit56m/6L+H44CC5q2k6YCJ6aG55Y+q5YWz5rOo5LqOIOWKqOaAgeWImuS9k+OAglxuICAgICAgICAgKiAgLSDlupTor6XlsL3ph4/lsJHnmoTkvb/nlKjmraTpgInpobnvvIzlm6DkuLrlroPkvJrlop7liqDnqIvluo/lpITnkIbml7bpl7TjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBidWxsZXRcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGJ1bGxldDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmJ1bGxldCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBSaWdpZGJvZHkgdHlwZSA6IFN0YXRpYywgS2luZW1hdGljLCBEeW5hbWljIG9yIEFuaW1hdGVkLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWImuS9k+exu+Wei++8miBTdGF0aWMsIEtpbmVtYXRpYywgRHluYW1pYyBvciBBbmltYXRlZC5cbiAgICAgICAgICogQHByb3BlcnR5IHtSaWdpZEJvZHlUeXBlfSB0eXBlXG4gICAgICAgICAqIEBkZWZhdWx0IFJpZ2lkQm9keVR5cGUuRHluYW1pY1xuICAgICAgICAgKi8gICAgICAgIFxuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb2R5VHlwZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkudHlwZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBCb2R5VHlwZS5BbmltYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldFR5cGUoQm9keVR5cGUuS2luZW1hdGljKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRUeXBlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTZXQgdGhpcyBmbGFnIHRvIGZhbHNlIGlmIHRoaXMgYm9keSBzaG91bGQgbmV2ZXIgZmFsbCBhc2xlZXAuXG4gICAgICAgICAqIE5vdGUgdGhhdCB0aGlzIGluY3JlYXNlcyBDUFUgdXNhZ2UuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aaC5p6c5q2k5Yia5L2T5rC46L+c6YO95LiN5bqU6K+l6L+b5YWl552h55yg77yM6YKj5LmI6K6+572u6L+Z5Liq5bGe5oCn5Li6IGZhbHNl44CCXG4gICAgICAgICAqIOmcgOimgeazqOaEj+i/meWwhuS9vyBDUFUg5Y2g55So546H5o+Q6auY44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWxsb3dTbGVlcFxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhbGxvd1NsZWVwOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmFsbG93U2xlZXAnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5LklzU2xlZXBpbmdBbGxvd2VkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbGxvd1NsZWVwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dTbGVlcCA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iMkJvZHkuU2V0U2xlZXBpbmdBbGxvd2VkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gXG4gICAgICAgICAqIFNjYWxlIHRoZSBncmF2aXR5IGFwcGxpZWQgdG8gdGhpcyBib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOe8qeaUvuW6lOeUqOWcqOatpOWImuS9k+S4iueahOmHjeWKm+WAvFxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZ3Jhdml0eVNjYWxlXG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIGdyYXZpdHlTY2FsZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5ncmF2aXR5U2NhbGUnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYXZpdHlTY2FsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXZpdHlTY2FsZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldEdyYXZpdHlTY2FsZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIExpbmVhciBkYW1waW5nIGlzIHVzZSB0byByZWR1Y2UgdGhlIGxpbmVhciB2ZWxvY2l0eS5cbiAgICAgICAgICogVGhlIGRhbXBpbmcgcGFyYW1ldGVyIGNhbiBiZSBsYXJnZXIgdGhhbiAxLCBidXQgdGhlIGRhbXBpbmcgZWZmZWN0IGJlY29tZXMgc2Vuc2l0aXZlIHRvIHRoZVxuICAgICAgICAgKiB0aW1lIHN0ZXAgd2hlbiB0aGUgZGFtcGluZyBwYXJhbWV0ZXIgaXMgbGFyZ2UuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICogTGluZWFyIGRhbXBpbmcg55So5LqO6KGw5YeP5Yia5L2T55qE57q/5oCn6YCf5bqm44CC6KGw5YeP57O75pWw5Y+v5Lul5aSn5LqOIDHvvIzkvYbmmK/lvZPoobDlh4/ns7vmlbDmr5TovoPlpKfnmoTml7blgJnvvIzoobDlh4/nmoTmlYjmnpzkvJrlj5jlvpfmr5TovoPmlY/mhJ/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpbmVhckRhbXBpbmdcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgbGluZWFyRGFtcGluZzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5saW5lYXJEYW1waW5nJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lYXJEYW1waW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZWFyRGFtcGluZyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldExpbmVhckRhbXBpbmcodGhpcy5fbGluZWFyRGFtcGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEFuZ3VsYXIgZGFtcGluZyBpcyB1c2UgdG8gcmVkdWNlIHRoZSBhbmd1bGFyIHZlbG9jaXR5LiBUaGUgZGFtcGluZyBwYXJhbWV0ZXJcbiAgICAgICAgICogY2FuIGJlIGxhcmdlciB0aGFuIDEgYnV0IHRoZSBkYW1waW5nIGVmZmVjdCBiZWNvbWVzIHNlbnNpdGl2ZSB0byB0aGVcbiAgICAgICAgICogdGltZSBzdGVwIHdoZW4gdGhlIGRhbXBpbmcgcGFyYW1ldGVyIGlzIGxhcmdlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIEFuZ3VsYXIgZGFtcGluZyDnlKjkuo7oobDlh4/liJrkvZPnmoTop5LpgJ/luqbjgILoobDlh4/ns7vmlbDlj6/ku6XlpKfkuo4gMe+8jOS9huaYr+W9k+ihsOWHj+ezu+aVsOavlOi+g+Wkp+eahOaXtuWAme+8jOihsOWHj+eahOaViOaenOS8muWPmOW+l+avlOi+g+aVj+aEn+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYW5ndWxhckRhbXBpbmdcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgYW5ndWxhckRhbXBpbmc6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkuYW5ndWxhckRhbXBpbmcnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ3VsYXJEYW1waW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5ndWxhckRhbXBpbmcgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRBbmd1bGFyRGFtcGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBsaW5lYXIgdmVsb2NpdHkgb2YgdGhlIGJvZHkncyBvcmlnaW4gaW4gd29ybGQgY28tb3JkaW5hdGVzLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWImuS9k+WcqOS4lueVjOWdkOagh+S4i+eahOe6v+aAp+mAn+W6plxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IGxpbmVhclZlbG9jaXR5XG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDAsMClcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVhclZlbG9jaXR5OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmxpbmVhclZlbG9jaXR5JyxcbiAgICAgICAgICAgIHR5cGU6IGNjLlZlYzIsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbHYgPSB0aGlzLl9saW5lYXJWZWxvY2l0eTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMuX2IyQm9keS5HZXRMaW5lYXJWZWxvY2l0eSgpO1xuICAgICAgICAgICAgICAgICAgICBsdi54ID0gdmVsb2NpdHkueCpQVE1fUkFUSU87XG4gICAgICAgICAgICAgICAgICAgIGx2LnkgPSB2ZWxvY2l0eS55KlBUTV9SQVRJTztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGx2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZWFyVmVsb2NpdHkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgYjJib2R5ID0gdGhpcy5fYjJCb2R5O1xuICAgICAgICAgICAgICAgIGlmIChiMmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBiMmJvZHkubV9saW5lYXJWZWxvY2l0eTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcC5TZXQodmFsdWUueC9QVE1fUkFUSU8sIHZhbHVlLnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgICAgICAgICAgYjJib2R5LlNldExpbmVhclZlbG9jaXR5KHRlbXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgYW5ndWxhciB2ZWxvY2l0eSBvZiB0aGUgYm9keS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDliJrkvZPnmoTop5LpgJ/luqZcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ3VsYXJWZWxvY2l0eVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBhbmd1bGFyVmVsb2NpdHk6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkuYW5ndWxhclZlbG9jaXR5JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keS5HZXRBbmd1bGFyVmVsb2NpdHkoKSAqIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmd1bGFyVmVsb2NpdHk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmd1bGFyVmVsb2NpdHkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRBbmd1bGFyVmVsb2NpdHkoIHZhbHVlICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTaG91bGQgdGhpcyBib2R5IGJlIHByZXZlbnRlZCBmcm9tIHJvdGF0aW5nP1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaYr+WQpuemgeatouatpOWImuS9k+i/m+ihjOaXi+i9rFxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGZpeGVkUm90YXRpb25cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGZpeGVkUm90YXRpb246IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkuZml4ZWRSb3RhdGlvbicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZml4ZWRSb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpeGVkUm90YXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRGaXhlZFJvdGF0aW9uKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogU2V0IHRoZSBzbGVlcCBzdGF0ZSBvZiB0aGUgYm9keS4gQSBzbGVlcGluZyBib2R5IGhhcyB2ZXJ5IGxvdyBDUFUgY29zdC4oV2hlbiB0aGUgcmlnaWQgYm9keSBpcyBoaXQsIGlmIHRoZSByaWdpZCBib2R5IGlzIGluIHNsZWVwIHN0YXRlLCBpdCB3aWxsIGJlIGltbWVkaWF0ZWx5IGF3YWtlbmVkLilcbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDorr7nva7liJrkvZPnmoTnnaHnnKDnirbmgIHjgIIg552h55yg55qE5Yia5L2T5YW35pyJ6Z2e5bi45L2O55qEIENQVSDmiJDmnKzjgILvvIjlvZPliJrkvZPooqvnorDmkp7liLDml7bvvIzlpoLmnpzliJrkvZPlpITkuo7nnaHnnKDnirbmgIHvvIzlroPkvJrnq4vljbPooqvllKTphpLvvIlcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhd2FrZVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgYXdha2U6IHtcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5hd2FrZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5ID8gdGhpcy5fYjJCb2R5LklzQXdha2UoKSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iMkJvZHkuU2V0QXdha2UoIHZhbHVlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFdoZXRoZXIgdG8gd2FrZSB1cCB0aGlzIHJpZ2lkIGJvZHkgZHVyaW5nIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm5Zyo5Yid5aeL5YyW5pe25ZSk6YaS5q2k5Yia5L2TXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYXdha2VPbkxvYWRcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYXdha2VPbkxvYWQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmF3YWtlT25Mb2FkJyxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNldCB0aGUgYWN0aXZlIHN0YXRlIG9mIHRoZSBib2R5LiBBbiBpbmFjdGl2ZSBib2R5IGlzIG5vdFxuXHQgICAgICogc2ltdWxhdGVkIGFuZCBjYW5ub3QgYmUgY29sbGlkZWQgd2l0aCBvciB3b2tlbiB1cC5cblx0ICAgICAqIElmIGJvZHkgaXMgYWN0aXZlLCBhbGwgZml4dHVyZXMgd2lsbCBiZSBhZGRlZCB0byB0aGVcblx0ICAgICAqIGJyb2FkLXBoYXNlLlxuXHQgICAgICogSWYgYm9keSBpcyBpbmFjdGl2ZSwgYWxsIGZpeHR1cmVzIHdpbGwgYmUgcmVtb3ZlZCBmcm9tXG5cdCAgICAgKiB0aGUgYnJvYWQtcGhhc2UgYW5kIGFsbCBjb250YWN0cyB3aWxsIGJlIGRlc3Ryb3llZC5cblx0ICAgICAqIEZpeHR1cmVzIG9uIGFuIGluYWN0aXZlIGJvZHkgYXJlIGltcGxpY2l0bHkgaW5hY3RpdmUgYW5kIHdpbGxcblx0ICAgICAqIG5vdCBwYXJ0aWNpcGF0ZSBpbiBjb2xsaXNpb25zLCByYXktY2FzdHMsIG9yIHF1ZXJpZXMuXG5cdCAgICAgKiBKb2ludHMgY29ubmVjdGVkIHRvIGFuIGluYWN0aXZlIGJvZHkgYXJlIGltcGxpY2l0bHkgaW5hY3RpdmUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K6+572u5Yia5L2T55qE5r+A5rS754q25oCB44CC5LiA5Liq6Z2e5r+A5rS754q25oCB5LiL55qE5Yia5L2T5piv5LiN5Lya6KKr5qih5ouf5ZKM56Kw5pKe55qE77yM5LiN566h5a6D5piv5ZCm5aSE5LqO552h55yg54q25oCB5LiL44CCXG4gICAgICAgICAqIOWmguaenOWImuS9k+WkhOS6jua/gOa0u+eKtuaAgeS4i++8jOaJgOacieWkueWFt+S8muiiq+a3u+WKoOWIsCDnspfmtYvpmLbmrrXvvIhicm9hZC1waGFzZe+8ieOAglxuICAgICAgICAgKiDlpoLmnpzliJrkvZPlpITkuo7pnZ7mv4DmtLvnirbmgIHkuIvvvIzmiYDmnInlpLnlhbfkvJrooqvku44g57KX5rWL6Zi25q6177yIYnJvYWQtcGhhc2XvvInkuK3np7vpmaTjgIJcbiAgICAgICAgICog5Zyo6Z2e5r+A5rS754q25oCB5LiL55qE5aS55YW35LiN5Lya5Y+C5LiO5Yiw56Kw5pKe77yM5bCE57q/77yM5oiW6ICF5p+l5om+5LitXG4gICAgICAgICAqIOmTvuaOpeWIsOmdnua/gOa0u+eKtuaAgeS4i+WImuS9k+eahOWFs+iKguS5n+aYr+mdnua/gOa0u+eahOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFjdGl2ZVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmU6IHtcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keSA/IHRoaXMuX2IyQm9keS5Jc0FjdGl2ZSgpIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRBY3RpdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0cyBhIGxvY2FsIHBvaW50IHJlbGF0aXZlIHRvIHRoZSBib2R5J3Mgb3JpZ2luIGdpdmVuIGEgd29ybGQgcG9pbnQuXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4que7meWumueahOS4lueVjOWdkOagh+ezu+S4i+eahOeCuei9rOaNouS4uuWImuS9k+acrOWcsOWdkOagh+ezu+S4i+eahOeCuVxuICAgICAqIEBtZXRob2QgZ2V0TG9jYWxQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjMn0gd29ybGRQb2ludCAtIGEgcG9pbnQgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHtWZWMyfSBvdXQgLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyBwb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSBjb3JyZXNwb25kaW5nIGxvY2FsIHBvaW50IHJlbGF0aXZlIHRvIHRoZSBib2R5J3Mgb3JpZ2luLlxuICAgICAqL1xuICAgIGdldExvY2FsUG9pbnQ6IGZ1bmN0aW9uICh3b3JsZFBvaW50LCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldCh3b3JsZFBvaW50LngvUFRNX1JBVElPLCB3b3JsZFBvaW50LnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLl9iMkJvZHkuR2V0TG9jYWxQb2ludCh0ZW1wYjJWZWMyMSwgb3V0KTtcbiAgICAgICAgICAgIG91dC54ID0gcG9zLngqUFRNX1JBVElPO1xuICAgICAgICAgICAgb3V0LnkgPSBwb3MueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgY29vcmRpbmF0ZXMgb2YgYSBwb2ludCBnaXZlbiB0aGUgbG9jYWwgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4que7meWumueahOWImuS9k+acrOWcsOWdkOagh+ezu+S4i+eahOeCuei9rOaNouS4uuS4lueVjOWdkOagh+ezu+S4i+eahOeCuVxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjMn0gbG9jYWxQb2ludCAtIGEgcG9pbnQgaW4gbG9jYWwgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHtWZWMyfSBvdXQgLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyBwb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSBzYW1lIHBvaW50IGV4cHJlc3NlZCBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKi9cbiAgICBnZXRXb3JsZFBvaW50OiBmdW5jdGlvbiAobG9jYWxQb2ludCwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBjYy52MigpO1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQobG9jYWxQb2ludC54L1BUTV9SQVRJTywgbG9jYWxQb2ludC55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5fYjJCb2R5LkdldFdvcmxkUG9pbnQodGVtcGIyVmVjMjEsIG91dCk7XG4gICAgICAgICAgICBvdXQueCA9IHBvcy54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gcG9zLnkqUFRNX1JBVElPO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIHdvcmxkIGNvb3JkaW5hdGVzIG9mIGEgdmVjdG9yIGdpdmVuIHRoZSBsb2NhbCBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5LiA5Liq57uZ5a6a55qE5LiW55WM5Z2Q5qCH57O75LiL55qE5ZCR6YeP6L2s5o2i5Li65Yia5L2T5pys5Zyw5Z2Q5qCH57O75LiL55qE5ZCR6YePXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjMn0gbG9jYWxWZWN0b3IgLSBhIHZlY3RvciBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG91dCAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSBzYW1lIHZlY3RvciBleHByZXNzZWQgaW4gbG9jYWwgY29vcmRpbmF0ZXMuXG4gICAgICovIFxuICAgIGdldFdvcmxkVmVjdG9yOiBmdW5jdGlvbiAobG9jYWxWZWN0b3IsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdGVtcGIyVmVjMjEuU2V0KGxvY2FsVmVjdG9yLngvUFRNX1JBVElPLCBsb2NhbFZlY3Rvci55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gdGhpcy5fYjJCb2R5LkdldFdvcmxkVmVjdG9yKHRlbXBiMlZlYzIxLCBvdXQpO1xuICAgICAgICAgICAgb3V0LnggPSB2ZWN0b3IueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHZlY3Rvci55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0cyBhIGxvY2FsIHZlY3RvciByZWxhdGl2ZSB0byB0aGUgYm9keSdzIG9yaWdpbiBnaXZlbiBhIHdvcmxkIHZlY3Rvci5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5LiA5Liq57uZ5a6a55qE5LiW55WM5Z2Q5qCH57O75LiL55qE54K56L2s5o2i5Li65Yia5L2T5pys5Zyw5Z2Q5qCH57O75LiL55qE54K5XG4gICAgICogQG1ldGhvZCBnZXRMb2NhbFZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjMn0gd29ybGRWZWN0b3IgLSBhIHZlY3RvciBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG91dCAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSBjb3JyZXNwb25kaW5nIGxvY2FsIHZlY3RvciByZWxhdGl2ZSB0byB0aGUgYm9keSdzIG9yaWdpbi5cbiAgICAgKi9cbiAgICBnZXRMb2NhbFZlY3RvcjogZnVuY3Rpb24gKHdvcmxkVmVjdG9yLCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldCh3b3JsZFZlY3Rvci54L1BUTV9SQVRJTywgd29ybGRWZWN0b3IueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgdmFyIHZlY3RvciA9IHRoaXMuX2IyQm9keS5HZXRMb2NhbFZlY3Rvcih0ZW1wYjJWZWMyMSwgb3V0KTtcbiAgICAgICAgICAgIG91dC54ID0gdmVjdG9yLngqUFRNX1JBVElPO1xuICAgICAgICAgICAgb3V0LnkgPSB2ZWN0b3IueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgYm9keSBvcmlnaW4gcG9zaXRpb24uXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluWImuS9k+S4lueVjOWdkOagh+ezu+S4i+eahOWOn+eCueWAvFxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMn0gb3V0IC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIGJvZHkncyBvcmlnaW4uXG4gICAgICovXG4gICAgZ2V0V29ybGRQb3NpdGlvbjogZnVuY3Rpb24gKG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2IyQm9keS5HZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgb3V0LnggPSBwb3MueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHBvcy55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCBib2R5IHJvdGF0aW9uIGFuZ2xlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPkuJbnlYzlnZDmoIfns7vkuIvnmoTml4vovazlgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkUm90YXRpb25cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBjdXJyZW50IHdvcmxkIHJvdGF0aW9uIGFuZ2xlLlxuICAgICAqL1xuICAgIGdldFdvcmxkUm90YXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keS5HZXRBbmdsZSgpICogUEhZU0lDU19BTkdMRV9UT19BTkdMRTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgbG9jYWwgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiBtYXNzLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPmnKzlnLDlnZDmoIfns7vkuIvnmoTotKjlv4NcbiAgICAgKiBAbWV0aG9kIGdldExvY2FsQ2VudGVyXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIGxvY2FsIHBvc2l0aW9uIG9mIHRoZSBjZW50ZXIgb2YgbWFzcy5cbiAgICAgKi9cbiAgICBnZXRMb2NhbENlbnRlcjogZnVuY3Rpb24gKG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2IyQm9keS5HZXRMb2NhbENlbnRlcigpO1xuICAgICAgICAgICAgb3V0LnggPSBwb3MueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHBvcy55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIG1hc3MuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluWImuS9k+S4lueVjOWdkOagh+ezu+S4i+eahOi0qOW/g1xuICAgICAqIEBtZXRob2QgZ2V0V29ybGRDZW50ZXJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiBtYXNzLlxuICAgICAqL1xuICAgIGdldFdvcmxkQ2VudGVyOiBmdW5jdGlvbiAob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBjYy52MigpO1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5fYjJCb2R5LkdldFdvcmxkQ2VudGVyKCk7XG4gICAgICAgICAgICBvdXQueCA9IHBvcy54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gcG9zLnkqUFRNX1JBVElPO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIHdvcmxkIGxpbmVhciB2ZWxvY2l0eSBvZiBhIHdvcmxkIHBvaW50IGF0dGFjaGVkIHRvIHRoaXMgYm9keS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5LiK5oyH5a6a54K555qE57q/5oCn6YCf5bqmXG4gICAgICogQG1ldGhvZCBnZXRMaW5lYXJWZWxvY2l0eUZyb21Xb3JsZFBvaW50XG4gICAgICogQHBhcmFtIHtWZWMyfSB3b3JsZFBvaW50IC0gYSBwb2ludCBpbiB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG91dCAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHdvcmxkIHZlbG9jaXR5IG9mIGEgcG9pbnQuIFxuICAgICAqL1xuICAgIGdldExpbmVhclZlbG9jaXR5RnJvbVdvcmxkUG9pbnQ6IGZ1bmN0aW9uICh3b3JsZFBvaW50LCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldCh3b3JsZFBvaW50LngvUFRNX1JBVElPLCB3b3JsZFBvaW50LnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMuX2IyQm9keS5HZXRMaW5lYXJWZWxvY2l0eUZyb21Xb3JsZFBvaW50KHRlbXBiMlZlYzIxLCBvdXQpO1xuICAgICAgICAgICAgb3V0LnggPSB2ZWxvY2l0eS54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gdmVsb2NpdHkueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0b3RhbCBtYXNzIG9mIHRoZSBib2R5LlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPnmoTotKjph4/jgIJcbiAgICAgKiBAbWV0aG9kIGdldE1hc3NcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSB0b3RhbCBtYXNzIG9mIHRoZSBib2R5LlxuICAgICAqL1xuICAgIGdldE1hc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keSA/IHRoaXMuX2IyQm9keS5HZXRNYXNzKCkgOiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSByb3RhdGlvbmFsIGluZXJ0aWEgb2YgdGhlIGJvZHkgYWJvdXQgdGhlIGxvY2FsIG9yaWdpbi5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5pys5Zyw5Z2Q5qCH57O75LiL5Y6f54K555qE5peL6L2s5oOv5oCnXG4gICAgICogQG1ldGhvZCBnZXRJbmVydGlhXG4gICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgcm90YXRpb25hbCBpbmVydGlhLCB1c3VhbGx5IGluIGtnLW1eMi5cbiAgICAgKi9cbiAgICBnZXRJbmVydGlhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iMkJvZHkgPyB0aGlzLl9iMkJvZHkuR2V0SW5lcnRpYSgpICogUFRNX1JBVElPICogUFRNX1JBVElPIDogMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBhbGwgdGhlIGpvaW50cyBjb25uZWN0IHRvIHRoZSByaWdpZGJvZHkuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlumTvuaOpeWIsOatpOWImuS9k+eahOaJgOacieWFs+iKglxuICAgICAqIEBtZXRob2QgZ2V0Sm9pbnRMaXN0XG4gICAgICogQHJldHVybiB7W0pvaW50XX0gdGhlIGpvaW50IGxpc3QuXG4gICAgICovXG4gICAgZ2V0Sm9pbnRMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYjJCb2R5KSByZXR1cm4gW107XG5cbiAgICAgICAgdmFyIGpvaW50cyA9IFtdO1xuXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5fYjJCb2R5LkdldEpvaW50TGlzdCgpO1xuICAgICAgICBpZiAoIWxpc3QpIHJldHVybiBbXTtcblxuICAgICAgICBqb2ludHMucHVzaChsaXN0LmpvaW50Ll9qb2ludCk7XG4gICAgICAgIFxuICAgICAgICAvLyBmaW5kIHByZXYgam9pbnRcbiAgICAgICAgdmFyIHByZXYgPSBsaXN0LnByZXY7XG4gICAgICAgIHdoaWxlIChwcmV2KSB7XG4gICAgICAgICAgICBqb2ludHMucHVzaChwcmV2LmpvaW50Ll9qb2ludCk7XG4gICAgICAgICAgICBwcmV2ID0gcHJldi5wcmV2O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCBuZXh0IGpvaW50XG4gICAgICAgIHZhciBuZXh0ID0gbGlzdC5uZXh0O1xuICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgICAgam9pbnRzLnB1c2gobmV4dC5qb2ludC5fam9pbnQpO1xuICAgICAgICAgICAgbmV4dCA9IG5leHQubmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBqb2ludHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhIGZvcmNlIGF0IGEgd29ybGQgcG9pbnQuIElmIHRoZSBmb3JjZSBpcyBub3Rcblx0ICogYXBwbGllZCBhdCB0aGUgY2VudGVyIG9mIG1hc3MsIGl0IHdpbGwgZ2VuZXJhdGUgYSB0b3JxdWUgYW5kXG5cdCAqIGFmZmVjdCB0aGUgYW5ndWxhciB2ZWxvY2l0eS5cbiAgICAgKiAhI3poXG4gICAgICog5pa95Yqg5LiA5Liq5Yqb5Yiw5Yia5L2T5LiK55qE5LiA5Liq54K544CC5aaC5p6c5Yqb5rKh5pyJ5pa95Yqg5Yiw5Yia5L2T55qE6LSo5b+D5LiK77yM6L+Y5Lya5Lqn55Sf5LiA5Liq5omt55+p5bm25LiU5b2x5ZON5Yiw6KeS6YCf5bqm44CCXG4gICAgICogQG1ldGhvZCBhcHBseUZvcmNlXG4gICAgICogQHBhcmFtIHtWZWMyfSBmb3JjZSAtIHRoZSB3b3JsZCBmb3JjZSB2ZWN0b3IuXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludCAtIHRoZSB3b3JsZCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdha2UgLSBhbHNvIHdha2UgdXAgdGhlIGJvZHkuXG4gICAgICovXG4gICAgYXBwbHlGb3JjZTogZnVuY3Rpb24gKGZvcmNlLCBwb2ludCwgd2FrZSkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQoZm9yY2UueC9QVE1fUkFUSU8sIGZvcmNlLnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIyLlNldChwb2ludC54L1BUTV9SQVRJTywgcG9pbnQueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgdGhpcy5fYjJCb2R5LkFwcGx5Rm9yY2UodGVtcGIyVmVjMjEsIHRlbXBiMlZlYzIyLCB3YWtlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYSBmb3JjZSB0byB0aGUgY2VudGVyIG9mIG1hc3MuXG4gICAgICogISN6aFxuICAgICAqIOaWveWKoOS4gOS4quWKm+WIsOWImuS9k+S4iueahOi0qOW/g+S4iuOAglxuICAgICAqIEBtZXRob2QgYXBwbHlGb3JjZVRvQ2VudGVyXG4gICAgICogQHBhcmFtIHtWZWMyfSBmb3JjZSAtIHRoZSB3b3JsZCBmb3JjZSB2ZWN0b3IuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB3YWtlIC0gYWxzbyB3YWtlIHVwIHRoZSBib2R5LlxuICAgICAqL1xuICAgIGFwcGx5Rm9yY2VUb0NlbnRlcjogZnVuY3Rpb24gKGZvcmNlLCB3YWtlKSB7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldChmb3JjZS54L1BUTV9SQVRJTywgZm9yY2UueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgdGhpcy5fYjJCb2R5LkFwcGx5Rm9yY2VUb0NlbnRlcih0ZW1wYjJWZWMyMSwgd2FrZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFwcGx5IGEgdG9ycXVlLiBUaGlzIGFmZmVjdHMgdGhlIGFuZ3VsYXIgdmVsb2NpdHkuXG4gICAgICogISN6aFxuICAgICAqIOaWveWKoOS4gOS4quaJreefqeWKm++8jOWwhuW9seWTjeWImuS9k+eahOinkumAn+W6plxuICAgICAqIEBtZXRob2QgYXBwbHlUb3JxdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9ycXVlIC0gYWJvdXQgdGhlIHotYXhpcyAob3V0IG9mIHRoZSBzY3JlZW4pLCB1c3VhbGx5IGluIE4tbS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdha2UgLSBhbHNvIHdha2UgdXAgdGhlIGJvZHlcbiAgICAgKi9cbiAgICBhcHBseVRvcnF1ZTogZnVuY3Rpb24gKHRvcnF1ZSwgd2FrZSkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLl9iMkJvZHkuQXBwbHlUb3JxdWUodG9ycXVlL1BUTV9SQVRJTywgd2FrZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFwcGx5IGEgaW1wdWxzZSBhdCBhIHdvcmxkIHBvaW50LCBUaGlzIGltbWVkaWF0ZWx5IG1vZGlmaWVzIHRoZSB2ZWxvY2l0eS5cblx0ICogSWYgdGhlIGltcHVsc2UgaXMgbm90IGFwcGxpZWQgYXQgdGhlIGNlbnRlciBvZiBtYXNzLCBpdCB3aWxsIGdlbmVyYXRlIGEgdG9ycXVlIGFuZFxuXHQgKiBhZmZlY3QgdGhlIGFuZ3VsYXIgdmVsb2NpdHkuXG4gICAgICogISN6aFxuICAgICAqIOaWveWKoOWGsumHj+WIsOWImuS9k+S4iueahOS4gOS4queCue+8jOWwhueri+WNs+aUueWPmOWImuS9k+eahOe6v+aAp+mAn+W6puOAglxuICAgICAqIOWmguaenOWGsumHj+aWveWKoOWIsOeahOeCueS4jeaYr+WImuS9k+eahOi0qOW/g++8jOmCo+S5iOWwhuS6p+eUn+S4gOS4quaJreefqeW5tuW9seWTjeWImuS9k+eahOinkumAn+W6puOAglxuICAgICAqIEBtZXRob2QgYXBwbHlMaW5lYXJJbXB1bHNlXG4gICAgICogQHBhcmFtIHtWZWMyfSBpbXB1bHNlIC0gdGhlIHdvcmxkIGltcHVsc2UgdmVjdG9yLCB1c3VhbGx5IGluIE4tc2Vjb25kcyBvciBrZy1tL3MuXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludCAtIHRoZSB3b3JsZCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2FrZSAtIGFsc2Ugd2FrZSB1cCB0aGUgYm9keVxuICAgICAqL1xuICAgIGFwcGx5TGluZWFySW1wdWxzZTogZnVuY3Rpb24gKGltcHVsc2UsIHBvaW50LCB3YWtlKSB7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldChpbXB1bHNlLngvUFRNX1JBVElPLCBpbXB1bHNlLnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIyLlNldChwb2ludC54L1BUTV9SQVRJTywgcG9pbnQueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgdGhpcy5fYjJCb2R5LkFwcGx5TGluZWFySW1wdWxzZSh0ZW1wYjJWZWMyMSwgdGVtcGIyVmVjMjIsIHdha2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhbiBhbmd1bGFyIGltcHVsc2UuXG4gICAgICogISN6aFxuICAgICAqIOaWveWKoOS4gOS4quinkumAn+W6puWGsumHj+OAglxuICAgICAqIEBtZXRob2QgYXBwbHlBbmd1bGFySW1wdWxzZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbXB1bHNlIC0gdGhlIGFuZ3VsYXIgaW1wdWxzZSBpbiB1bml0cyBvZiBrZyptKm0vc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2FrZSAtIGFsc28gd2FrZSB1cCB0aGUgYm9keVxuICAgICAqL1xuICAgIGFwcGx5QW5ndWxhckltcHVsc2U6IGZ1bmN0aW9uIChpbXB1bHNlLCB3YWtlKSB7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2IyQm9keS5BcHBseUFuZ3VsYXJJbXB1bHNlKGltcHVsc2UvUFRNX1JBVElPL1BUTV9SQVRJTywgd2FrZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFN5bmNocm9uaXplIG5vZGUncyB3b3JsZCBwb3NpdGlvbiB0byBib3gyZCByaWdpZGJvZHkncyBwb3NpdGlvbi5cbiAgICAgKiBJZiBlbmFibGVBbmltYXRlZCBpcyB0cnVlIGFuZCByaWdpZGJvZHkncyB0eXBlIGlzIEFuaW1hdGVkIHR5cGUsIFxuICAgICAqIHdpbGwgc2V0IGxpbmVhciB2ZWxvY2l0eSBpbnN0ZWFkIG9mIGRpcmVjdGx5IHNldCByaWdpZGJvZHkncyBwb3NpdGlvbi5cbiAgICAgKiAhI3poXG4gICAgICog5ZCM5q2l6IqC54K555qE5LiW55WM5Z2Q5qCH5YiwIGJveDJkIOWImuS9k+eahOWdkOagh+S4iuOAglxuICAgICAqIOWmguaenCBlbmFibGVBbmltYXRlZCDmmK8gdHJ1Ze+8jOW5tuS4lOWImuS9k+eahOexu+Wei+aYryBBbmltYXRlZCDvvIzpgqPkuYjlsIborr7nva7liJrkvZPnmoTnur/mgKfpgJ/luqbmnaXku6Pmm7/nm7TmjqXorr7nva7liJrkvZPnmoTkvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIHN5bmNQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlQW5pbWF0ZWRcbiAgICAgKi9cbiAgICBzeW5jUG9zaXRpb246IGZ1bmN0aW9uIChlbmFibGVBbmltYXRlZCkge1xuICAgICAgICB2YXIgYjJib2R5ID0gdGhpcy5fYjJCb2R5O1xuICAgICAgICBpZiAoIWIyYm9keSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKFZFQzJfWkVSTyk7XG5cbiAgICAgICAgdmFyIHRlbXA7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEJvZHlUeXBlLkFuaW1hdGVkKSB7XG4gICAgICAgICAgICB0ZW1wID0gYjJib2R5LkdldExpbmVhclZlbG9jaXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZW1wID0gYjJib2R5LkdldFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wLnggPSBwb3MueCAvIFBUTV9SQVRJTztcbiAgICAgICAgdGVtcC55ID0gcG9zLnkgLyBQVE1fUkFUSU87XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQgJiYgZW5hYmxlQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIHZhciBiMlBvcyA9IGIyYm9keS5HZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB2YXIgdGltZVN0ZXAgPSBjYy5nYW1lLmNvbmZpZ1snZnJhbWVSYXRlJ107XG4gICAgICAgICAgICB0ZW1wLnggPSAodGVtcC54IC0gYjJQb3MueCkqdGltZVN0ZXA7XG4gICAgICAgICAgICB0ZW1wLnkgPSAodGVtcC55IC0gYjJQb3MueSkqdGltZVN0ZXA7XG5cbiAgICAgICAgICAgIGIyYm9keS5TZXRBd2FrZSh0cnVlKTtcbiAgICAgICAgICAgIGIyYm9keS5TZXRMaW5lYXJWZWxvY2l0eSh0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGIyYm9keS5TZXRUcmFuc2Zvcm1WZWModGVtcCwgYjJib2R5LkdldEFuZ2xlKCkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU3luY2hyb25pemUgbm9kZSdzIHdvcmxkIGFuZ2xlIHRvIGJveDJkIHJpZ2lkYm9keSdzIGFuZ2xlLlxuICAgICAqIElmIGVuYWJsZUFuaW1hdGVkIGlzIHRydWUgYW5kIHJpZ2lkYm9keSdzIHR5cGUgaXMgQW5pbWF0ZWQgdHlwZSwgXG4gICAgICogd2lsbCBzZXQgYW5ndWxhciB2ZWxvY2l0eSBpbnN0ZWFkIG9mIGRpcmVjdGx5IHNldCByaWdpZGJvZHkncyBhbmdsZS5cbiAgICAgKiAhI3poXG4gICAgICog5ZCM5q2l6IqC54K555qE5LiW55WM5peL6L2s6KeS5bqm5YC85YiwIGJveDJkIOWImuS9k+eahOaXi+i9rOWAvOS4iuOAglxuICAgICAqIOWmguaenCBlbmFibGVBbmltYXRlZCDmmK8gdHJ1Ze+8jOW5tuS4lOWImuS9k+eahOexu+Wei+aYryBBbmltYXRlZCDvvIzpgqPkuYjlsIborr7nva7liJrkvZPnmoTop5LpgJ/luqbmnaXku6Pmm7/nm7TmjqXorr7nva7liJrkvZPnmoTop5LluqbjgIJcbiAgICAgKiBAbWV0aG9kIHN5bmNSb3RhdGlvblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlQW5pbWF0ZWRcbiAgICAgKi9cbiAgICBzeW5jUm90YXRpb246IGZ1bmN0aW9uIChlbmFibGVBbmltYXRlZCkge1xuICAgICAgICB2YXIgYjJib2R5ID0gdGhpcy5fYjJCb2R5O1xuICAgICAgICBpZiAoIWIyYm9keSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciByb3RhdGlvbiA9IEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgKiBnZXRXb3JsZFJvdGF0aW9uKHRoaXMubm9kZSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEJvZHlUeXBlLkFuaW1hdGVkICYmIGVuYWJsZUFuaW1hdGVkKSB7XG4gICAgICAgICAgICB2YXIgYjJSb3RhdGlvbiA9IGIyYm9keS5HZXRBbmdsZSgpO1xuICAgICAgICAgICAgdmFyIHRpbWVTdGVwID0gY2MuZ2FtZS5jb25maWdbJ2ZyYW1lUmF0ZSddO1xuICAgICAgICAgICAgYjJib2R5LlNldEF3YWtlKHRydWUpO1xuICAgICAgICAgICAgYjJib2R5LlNldEFuZ3VsYXJWZWxvY2l0eSgocm90YXRpb24gLSBiMlJvdGF0aW9uKSp0aW1lU3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBiMmJvZHkuU2V0VHJhbnNmb3JtVmVjKGIyYm9keS5HZXRQb3NpdGlvbigpLCByb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFxuICAgIHJlc2V0VmVsb2NpdHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGIyYm9keSA9IHRoaXMuX2IyQm9keTtcbiAgICAgICAgaWYgKCFiMmJvZHkpIHJldHVybjtcblxuICAgICAgICB2YXIgdGVtcCA9IGIyYm9keS5tX2xpbmVhclZlbG9jaXR5O1xuICAgICAgICB0ZW1wLlNldCgwLCAwKTtcblxuICAgICAgICBiMmJvZHkuU2V0TGluZWFyVmVsb2NpdHkodGVtcCk7XG4gICAgICAgIGIyYm9keS5TZXRBbmd1bGFyVmVsb2NpdHkoMCk7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgX3JlZ2lzdGVyTm9kZUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS5vbihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fb25Ob2RlUG9zaXRpb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgbm9kZS5vbihOb2RlRXZlbnQuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcy5fb25Ob2RlUm90YXRpb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgbm9kZS5vbihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fb25Ob2RlU2NhbGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VucmVnaXN0ZXJOb2RlRXZlbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLm9mZihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fb25Ob2RlUG9zaXRpb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgbm9kZS5vZmYoTm9kZUV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMuX29uTm9kZVJvdGF0aW9uQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIG5vZGUub2ZmKE5vZGVFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzLl9vbk5vZGVTY2FsZUNoYW5nZWQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfb25Ob2RlUG9zaXRpb25DaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3luY1Bvc2l0aW9uKHRydWUpO1xuICAgIH0sXG5cbiAgICBfb25Ob2RlUm90YXRpb25DaGFuZ2VkOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zeW5jUm90YXRpb24odHJ1ZSk7XG4gICAgfSxcblxuICAgIF9vbk5vZGVTY2FsZUNoYW5nZWQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB2YXIgY29sbGlkZXJzID0gdGhpcy5nZXRDb21wb25lbnRzKGNjLlBoeXNpY3NDb2xsaWRlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbGxpZGVyc1tpXS5hcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgX2luaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19pbml0JywgW10pO1xuICAgIH0sXG4gICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19kZXN0cm95JywgW10pO1xuICAgIH0sXG5cbiAgICBfX2luaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRlZCkgcmV0dXJuO1xuXG4gICAgICAgdGhpcy5fcmVnaXN0ZXJOb2RlRXZlbnRzKCk7XG5cbiAgICAgICAgdmFyIGJvZHlEZWYgPSBuZXcgYjIuQm9keURlZigpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIGJvZHlEZWYudHlwZSA9IEJvZHlUeXBlLktpbmVtYXRpYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlEZWYudHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvZHlEZWYuYWxsb3dTbGVlcCA9IHRoaXMuYWxsb3dTbGVlcDtcbiAgICAgICAgYm9keURlZi5ncmF2aXR5U2NhbGUgPSB0aGlzLmdyYXZpdHlTY2FsZTtcbiAgICAgICAgYm9keURlZi5saW5lYXJEYW1waW5nID0gdGhpcy5saW5lYXJEYW1waW5nO1xuICAgICAgICBib2R5RGVmLmFuZ3VsYXJEYW1waW5nID0gdGhpcy5hbmd1bGFyRGFtcGluZztcblxuICAgICAgICB2YXIgbGluZWFyVmVsb2NpdHkgPSB0aGlzLmxpbmVhclZlbG9jaXR5O1xuICAgICAgICBib2R5RGVmLmxpbmVhclZlbG9jaXR5ID0gbmV3IGIyLlZlYzIobGluZWFyVmVsb2NpdHkueC9QVE1fUkFUSU8sIGxpbmVhclZlbG9jaXR5LnkvUFRNX1JBVElPKTtcblxuICAgICAgICBib2R5RGVmLmFuZ3VsYXJWZWxvY2l0eSA9IHRoaXMuYW5ndWxhclZlbG9jaXR5ICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbiAgICAgICAgXG4gICAgICAgIGJvZHlEZWYuZml4ZWRSb3RhdGlvbiA9IHRoaXMuZml4ZWRSb3RhdGlvbjtcbiAgICAgICAgYm9keURlZi5idWxsZXQgPSB0aGlzLmJ1bGxldDtcblxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdmFyIHBvcyA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKFZFQzJfWkVSTyk7XG4gICAgICAgIGJvZHlEZWYucG9zaXRpb24gPSBuZXcgYjIuVmVjMihwb3MueCAvIFBUTV9SQVRJTywgcG9zLnkgLyBQVE1fUkFUSU8pO1xuICAgICAgICBib2R5RGVmLmFuZ2xlID0gLShNYXRoLlBJIC8gMTgwKSAqIGdldFdvcmxkUm90YXRpb24obm9kZSk7XG5cbiAgICAgICAgYm9keURlZi5hd2FrZSA9IHRoaXMuYXdha2VPbkxvYWQ7XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5fYWRkQm9keSh0aGlzLCBib2R5RGVmKTtcblxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgX19kZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5fcmVtb3ZlQm9keSh0aGlzKTtcbiAgICAgICAgdGhpcy5fdW5yZWdpc3Rlck5vZGVFdmVudHMoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfZ2V0Qm9keTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5O1xuICAgIH0sXG5cbn0pO1xuXG5jYy5SaWdpZEJvZHkgPSBtb2R1bGUuZXhwb3J0cyA9IFJpZ2lkQm9keTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9