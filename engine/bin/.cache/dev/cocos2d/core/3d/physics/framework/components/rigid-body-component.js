
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/rigid-body-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.RigidBody3D = void 0;

var _instance = require("../instance");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    disallowMultiple = _cc$_decorator.disallowMultiple,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property;
var Vec3 = cc.Vec3;
/**
 * !#en
 * RigidBody is the basic object that make up the physical world, and it can make a node physically affected and react.
 * !#zh
 * 刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。该组件在使用 Builtin 物理引擎时无效。
 * @class RigidBody3D
 * @extends Component
 */

var RigidBody3D = (_dec = ccclass('cc.RigidBody3D'), _dec2 = executionOrder(99), _dec3 = menu('i18n:MAIN_MENU.component.physics/Rigid Body 3D'), _dec4 = property({
  displayOrder: 0
}), _dec5 = property({
  displayOrder: 1
}), _dec6 = property({
  displayOrder: 2
}), _dec7 = property({
  displayOrder: 3
}), _dec8 = property({
  displayOrder: 4
}), _dec9 = property({
  displayOrder: 5
}), _dec10 = property({
  displayOrder: 6
}), _dec11 = property({
  displayOrder: 7
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = disallowMultiple(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(RigidBody3D, _cc$Component);

  _createClass(RigidBody3D, [{
    key: "allowSleep",
    /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Whether sleep is allowed.
     * !#zh
     * 是否允许休眠。
     * @property {boolean} allowSleep
     */
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.allowSleep = v;
      }
    }
    /**
     * !#en
     * The mass of the rigidbody.
     * !#zh
     * 刚体的质量。
     * @property {number} mass
     */

  }, {
    key: "mass",
    get: function get() {
      return this._mass;
    },
    set: function set(value) {
      this._mass = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.mass = value;
      }
    }
    /**
     * !#en
     * Used to reduce the linear rate of rigidbody. The larger the value, the slower the rigidbody moves.
     * !#zh
     * 线性阻尼，用于减小刚体的线性速率，值越大物体移动越慢。
     * @property {number} linearDamping
     */

  }, {
    key: "linearDamping",
    get: function get() {
      return this._linearDamping;
    },
    set: function set(value) {
      this._linearDamping = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.linearDamping = value;
      }
    }
    /**
     * !#en
     * Used to reduce the rotation rate of rigidbody. The larger the value, the slower the rigidbody rotates.
     * !#zh
     * 角阻尼，用于减小刚体的旋转速率，值越大刚体旋转越慢。
     * @property {number} angularDamping
     */

  }, {
    key: "angularDamping",
    get: function get() {
      return this._angularDamping;
    },
    set: function set(value) {
      this._angularDamping = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.angularDamping = value;
      }
    }
    /**
     * !#en
     * If enabled, the developer controls the displacement and rotation of the rigidbody, not the physics engine.
     * !#zh
     * 是否由开发者来控制刚体的位移和旋转，而不是受物理引擎的影响。
     * @property {boolean} isKinematic
     */

  }, {
    key: "isKinematic",
    get: function get() {
      return this._isKinematic;
    },
    set: function set(value) {
      this._isKinematic = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.isKinematic = value;
      }
    }
    /**
     * !#en
     * If enabled, the rigidbody is affected by gravity.
     * !#zh
     * 如果开启，刚体会受到重力影响。
     * @property {boolean} useGravity
     */

  }, {
    key: "useGravity",
    get: function get() {
      return this._useGravity;
    },
    set: function set(value) {
      this._useGravity = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.useGravity = value;
      }
    }
    /**
     * !#en
     * If enabled, the rigidbody will be fixed without rotation during a collision.
     * !#zh
     * 如果开启，发生碰撞时会固定刚体不产生旋转。
     * @property {boolean} fixedRotation
     */

  }, {
    key: "fixedRotation",
    get: function get() {
      return this._fixedRotation;
    },
    set: function set(value) {
      this._fixedRotation = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.fixedRotation = value;
      }
    }
    /**
     * !#en
     * It can affect the linear velocity change of the rigidbody in each axis. The larger the value, the faster the rigidbody moves.
     * !#zh
     * 线性因子，可影响刚体在每个轴向的线性速度变化，值越大刚体移动越快。
     * @property {Vec3} linearFactor
     */

  }, {
    key: "linearFactor",
    get: function get() {
      return this._linearFactor;
    },
    set: function set(value) {
      Vec3.copy(this._linearFactor, value);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.linearFactor = this._linearFactor;
      }
    }
    /**
     * !#en
     * It can affect the rotation speed change of the rigidbody in each axis. The larger the value, the faster the rigidbody rotates.
     * !#zh
     * 旋转因子，可影响刚体在每个轴向的旋转速度变化，值越大刚体旋转越快。
     * @property {Vec3} angularFactor
     */

  }, {
    key: "angularFactor",
    get: function get() {
      return this._angularFactor;
    },
    set: function set(value) {
      Vec3.copy(this._angularFactor, value);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.angularFactor = this._angularFactor;
      }
    }
    /**
     * !#en
     * The rigidbody is awake.
     * !#zh
     * 刚体是否为唤醒的状态。
     * @property {boolean} isAwake
     * @readonly
     */

  }, {
    key: "isAwake",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isAwake;
      }

      return false;
    }
    /**
     * !#en
     * The rigidbody can enter hibernation.
     * !#zh
     * 刚体是否为可进入休眠的状态。
     * @property {boolean} isSleepy
     * @readonly
     */

  }, {
    key: "isSleepy",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isSleepy;
      }

      return false;
    }
    /**
     * !#en
     * The rigidbody is sleeping.
     * !#zh
     * 刚体是否为正在休眠的状态。
     * @property {boolean} isSleeping
     * @readonly
     */

  }, {
    key: "isSleeping",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isSleeping;
      }

      return false;
    }
    /**
     * !#en
     * Get the rigidbody object inside the physics engine.
     * !#zh
     * 获得物理引擎内部刚体对象。
     * @property {IRigidBody} rigidBody
     * @readonly
     */

  }, {
    key: "rigidBody",
    get: function get() {
      return this._body;
    }
  }, {
    key: "_assertOnload",
    get: function get() {
      var r = this._isOnLoadCalled == 0;

      if (r) {
        cc.error('Physics Error: Please make sure that the node has been added to the scene');
      }

      return !r;
    }
  }]);

  function RigidBody3D() {
    var _this;

    _this = _cc$Component.call(this) || this;
    _this._body = void 0;
    _this._allowSleep = true;

    _initializerDefineProperty(_this, "_mass", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_linearDamping", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_angularDamping", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_fixedRotation", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_isKinematic", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_useGravity", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_linearFactor", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_angularFactor", _descriptor8, _assertThisInitialized(_this));

    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      _this._body = (0, _instance.createRigidBody)();
    }

    return _this;
  } /// COMPONENT LIFECYCLE ///


  var _proto = RigidBody3D.prototype;

  _proto.__preload = function __preload() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.__preload(this);
    }
  };

  _proto.onEnable = function onEnable() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onDestroy();
    }
  } /// PUBLIC METHOD ///

  /**
   * !#en
   * A force is applied to a rigid body at a point in world space.
   * !#zh
   * 在世界空间中的某点上对刚体施加一个作用力。
   * @method applyForce
   * @param {Vec3} force
   * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
   */
  ;

  _proto.applyForce = function applyForce(force, relativePoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyForce(force, relativePoint);
    }
  }
  /**
   * !#en
   * Apply a force on the rigid body at a point in local space.
   * !#zh
   * 在本地空间中的某点上对刚体施加一个作用力。
   * @method applyLocalForce
   * @param {Vec3} force 
   * @param {Vec3} localPoint Point of application
   */
  ;

  _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalForce(force, localPoint);
    }
  }
  /**
   * !#en
   * Apply an impulse to a rigid body at a point in world space.
   * !#zh
   * 在世界空间的某点上对刚体施加一个冲量。
   * @method applyImpulse
   * @param {Vec3} impulse
   * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
   */
  ;

  _proto.applyImpulse = function applyImpulse(impulse, relativePoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyImpulse(impulse, relativePoint);
    }
  }
  /**
   * !#en
   * Apply an impulse to the rigid body at a point in local space.
   * !#zh
   * 在本地空间的某点上对刚体施加一个冲量。
   * @method applyLocalImpulse
   * @param {Vec3} impulse
   * @param {Vec3} localPoint Point of application
   */
  ;

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalImpulse(impulse, localPoint);
    }
  }
  /**
   * !#en
   * Apply a torque to the rigid body.
   * !#zh
   * 对刚体施加扭转力。
   * @method applyTorque
   * @param {Vec3} torque
   */
  ;

  _proto.applyTorque = function applyTorque(torque) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyTorque(torque);
    }
  }
  /**
   * !#en
   * Apply a local torque to the rigid body.
   * !#zh
   * 对刚体施加本地扭转力。
   * @method applyLocalTorque
   * @param {Vec3} torque
   */
  ;

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalTorque(torque);
    }
  }
  /**
   * !#en
   * Awaken the rigid body.
   * !#zh
   * 唤醒刚体。
   * @method wakeUp
   */
  ;

  _proto.wakeUp = function wakeUp() {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.wakeUp();
    }
  }
  /**
   * !#en
   * Dormant rigid body.
   * !#zh
   * 休眠刚体。
   * @method sleep
   */
  ;

  _proto.sleep = function sleep() {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.sleep();
    }
  }
  /**
   * !#en
   * Get linear velocity.
   * !#zh
   * 获取线性速度。
   * @method getLinearVelocity
   * @param {Vec3} out
   */
  ;

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.getLinearVelocity(out);
    }
  }
  /**
   * !#en
   * Set linear speed.
   * !#zh
   * 设置线性速度。
   * @method setLinearVelocity
   * @param {Vec3} value 
   */
  ;

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.setLinearVelocity(value);
    }
  }
  /**
   * !#en
   * Gets the rotation speed.
   * !#zh
   * 获取旋转速度。
   * @method getAngularVelocity
   * @param {Vec3} out 
   */
  ;

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.getAngularVelocity(out);
    }
  }
  /**
   * !#en
   * Set rotation speed.
   * !#zh
   * 设置旋转速度。
   * @method setAngularVelocity
   * @param {Vec3} value 
   */
  ;

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.setAngularVelocity(value);
    }
  };

  return RigidBody3D;
}(cc.Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "mass", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "mass"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearDamping", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "linearDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularDamping", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "angularDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isKinematic", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "isKinematic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useGravity", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "useGravity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fixedRotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "fixedRotation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearFactor", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "linearFactor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularFactor", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "angularFactor"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mass", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_linearDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_angularDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fixedRotation", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_isKinematic", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useGravity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_linearFactor", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_angularFactor", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.RigidBody3D = RigidBody3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL2NvbXBvbmVudHMvcmlnaWQtYm9keS1jb21wb25lbnQudHMiXSwibmFtZXMiOlsiY2MiLCJfZGVjb3JhdG9yIiwiY2NjbGFzcyIsImRpc2FsbG93TXVsdGlwbGUiLCJleGVjdXRlSW5FZGl0TW9kZSIsImV4ZWN1dGlvbk9yZGVyIiwibWVudSIsInByb3BlcnR5IiwiVmVjMyIsIlJpZ2lkQm9keTNEIiwiZGlzcGxheU9yZGVyIiwiX2FsbG93U2xlZXAiLCJ2IiwiQ0NfRURJVE9SIiwiQ0NfUEhZU0lDU19CVUlMVElOIiwiX2JvZHkiLCJhbGxvd1NsZWVwIiwiX21hc3MiLCJ2YWx1ZSIsIm1hc3MiLCJfbGluZWFyRGFtcGluZyIsImxpbmVhckRhbXBpbmciLCJfYW5ndWxhckRhbXBpbmciLCJhbmd1bGFyRGFtcGluZyIsIl9pc0tpbmVtYXRpYyIsImlzS2luZW1hdGljIiwiX3VzZUdyYXZpdHkiLCJ1c2VHcmF2aXR5IiwiX2ZpeGVkUm90YXRpb24iLCJmaXhlZFJvdGF0aW9uIiwiX2xpbmVhckZhY3RvciIsImNvcHkiLCJsaW5lYXJGYWN0b3IiLCJfYW5ndWxhckZhY3RvciIsImFuZ3VsYXJGYWN0b3IiLCJfYXNzZXJ0T25sb2FkIiwiaXNBd2FrZSIsImlzU2xlZXB5IiwiaXNTbGVlcGluZyIsInIiLCJfaXNPbkxvYWRDYWxsZWQiLCJlcnJvciIsIl9fcHJlbG9hZCIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwib25EZXN0cm95IiwiYXBwbHlGb3JjZSIsImZvcmNlIiwicmVsYXRpdmVQb2ludCIsImFwcGx5TG9jYWxGb3JjZSIsImxvY2FsUG9pbnQiLCJhcHBseUltcHVsc2UiLCJpbXB1bHNlIiwiYXBwbHlMb2NhbEltcHVsc2UiLCJhcHBseVRvcnF1ZSIsInRvcnF1ZSIsImFwcGx5TG9jYWxUb3JxdWUiLCJ3YWtlVXAiLCJzbGVlcCIsImdldExpbmVhclZlbG9jaXR5Iiwib3V0Iiwic2V0TGluZWFyVmVsb2NpdHkiLCJnZXRBbmd1bGFyVmVsb2NpdHkiLCJzZXRBbmd1bGFyVmVsb2NpdHkiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFTSUEsRUFBRSxDQUFDQztJQU5IQyx5QkFBQUE7SUFDQUMsa0NBQUFBO0lBQ0FDLG1DQUFBQTtJQUNBQyxnQ0FBQUE7SUFDQUMsc0JBQUFBO0lBQ0FDLDBCQUFBQTtBQUVKLElBQU1DLElBQUksR0FBR1IsRUFBRSxDQUFDUSxJQUFoQjtBQUVBOzs7Ozs7Ozs7SUFhYUMsc0JBTFpQLE9BQU8sQ0FBQyxnQkFBRCxXQUNQRyxjQUFjLENBQUMsRUFBRCxXQUNkQyxJQUFJLENBQUMsZ0RBQUQsV0FnQ0FDLFFBQVEsQ0FBQztBQUNORyxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFdBcUJSSCxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxXQXFCUkgsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsV0FxQlJILFFBQVEsQ0FBQztBQUNORyxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFdBcUJSSCxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxXQXFCUkgsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsWUFxQlJILFFBQVEsQ0FBQztBQUNORyxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFlBcUJSSCxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCwrQ0FsTFpOLDJCQUNBRDs7Ozs7QUFHRzs7QUFFQTs7Ozs7Ozt3QkFPa0M7QUFDOUIsYUFBTyxLQUFLUSxXQUFaO0FBQ0g7c0JBRXNCQyxHQUFZO0FBQy9CLFdBQUtELFdBQUwsR0FBbUJDLENBQW5COztBQUNBLFVBQUksQ0FBQ0MsU0FBRCxJQUFjLENBQUNDLGtCQUFuQixFQUF1QztB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QUExQixFQUFnRDtBQUM1QyxRQUFJLEtBQUtpQixhQUFMLElBQXNCLENBQUN0QixTQUF2QixJQUFvQyxDQUFDQyxrQkFBekMsRUFBNkQ7QUFDekQsV0FBS0MsS0FBTCxDQUFXOEMsaUJBQVgsQ0FBNkIzQyxLQUE3QjtBQUNIO0FBQ0o7QUFFRDs7Ozs7Ozs7OztTQVFPNEMscUJBQVAsNEJBQTJCRixHQUEzQixFQUF5QztBQUNyQyxRQUFJLEtBQUt6QixhQUFMLElBQXNCLENBQUN0QixTQUF2QixJQUFvQyxDQUFDQyxrQkFBekMsRUFBNkQ7QUFDekQsV0FBS0MsS0FBTCxDQUFXK0Msa0JBQVgsQ0FBOEJGLEdBQTlCO0FBQ0g7QUFDSjtBQUVEOzs7Ozs7Ozs7O1NBUU9HLHFCQUFQLDRCQUEyQjdDLEtBQTNCLEVBQWlEO0FBQzdDLFFBQUksS0FBS2lCLGFBQUwsSUFBc0IsQ0FBQ3RCLFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLQyxLQUFMLENBQVdnRCxrQkFBWCxDQUE4QjdDLEtBQTlCO0FBQ0g7QUFDSjs7O0VBdmU0QmxCLEVBQUUsQ0FBQ2dFLGcwQ0E4UC9CekQ7Ozs7O1dBQ3VCOzttRkFFdkJBOzs7OztXQUNnQzs7b0ZBRWhDQTs7Ozs7V0FDaUM7O21GQUVqQ0E7Ozs7O1dBQ2lDOztpRkFFakNBOzs7OztXQUMrQjs7Z0ZBRS9CQTs7Ozs7V0FDOEI7O2tGQUU5QkE7Ozs7O1dBQ2dDLElBQUlDLElBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWY7O21GQUVoQ0Q7Ozs7O1dBQ2lDLElBQUlDLElBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHsgSVJpZ2lkQm9keSB9IGZyb20gJy4uLy4uL3NwZWMvSS1yaWdpZC1ib2R5JztcbmltcG9ydCB7IGNyZWF0ZVJpZ2lkQm9keSB9IGZyb20gJy4uL2luc3RhbmNlJztcblxuY29uc3Qge1xuICAgIGNjY2xhc3MsXG4gICAgZGlzYWxsb3dNdWx0aXBsZSxcbiAgICBleGVjdXRlSW5FZGl0TW9kZSxcbiAgICBleGVjdXRpb25PcmRlcixcbiAgICBtZW51LFxuICAgIHByb3BlcnR5LFxufSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBWZWMzID0gY2MuVmVjMztcblxuLyoqXG4gKiAhI2VuXG4gKiBSaWdpZEJvZHkgaXMgdGhlIGJhc2ljIG9iamVjdCB0aGF0IG1ha2UgdXAgdGhlIHBoeXNpY2FsIHdvcmxkLCBhbmQgaXQgY2FuIG1ha2UgYSBub2RlIHBoeXNpY2FsbHkgYWZmZWN0ZWQgYW5kIHJlYWN0LlxuICogISN6aFxuICog5Yia5L2T5piv57uE5oiQ54mp55CG5LiW55WM55qE5Z+65pys5a+56LGh77yM5Y+v5Lul6K6p5LiA5Liq6IqC54K55Y+X5Yiw54mp55CG5b2x5ZON5bm25Lqn55Sf5Y+N5bqU44CC6K+l57uE5Lu25Zyo5L2/55SoIEJ1aWx0aW4g54mp55CG5byV5pOO5pe25peg5pWI44CCXG4gKiBAY2xhc3MgUmlnaWRCb2R5M0RcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5AY2NjbGFzcygnY2MuUmlnaWRCb2R5M0QnKVxuQGV4ZWN1dGlvbk9yZGVyKDk5KVxuQG1lbnUoJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL1JpZ2lkIEJvZHkgM0QnKVxuQGV4ZWN1dGVJbkVkaXRNb2RlXG5AZGlzYWxsb3dNdWx0aXBsZVxuZXhwb3J0IGNsYXNzIFJpZ2lkQm9keTNEIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vLyBQVUJMSUMgUFJPUEVSVFkgR0VUVEVSXFxTRVRURVIgLy8vXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogV2hldGhlciBzbGVlcCBpcyBhbGxvd2VkLlxuICAgICAqICEjemhcbiAgICAgKiDmmK/lkKblhYHorrjkvJHnnKDjgIJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFsbG93U2xlZXBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGFsbG93U2xlZXAgKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dTbGVlcDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGFsbG93U2xlZXAgKHY6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYWxsb3dTbGVlcCA9IHY7XG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYWxsb3dTbGVlcCA9IHY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIG1hc3Mgb2YgdGhlIHJpZ2lkYm9keS5cbiAgICAgKiAhI3poXG4gICAgICog5Yia5L2T55qE6LSo6YeP44CCXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IG1hc3NcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5T3JkZXI6IDBcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgbWFzcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWFzcyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWFzcyA9IHZhbHVlO1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5Lm1hc3MgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVc2VkIHRvIHJlZHVjZSB0aGUgbGluZWFyIHJhdGUgb2YgcmlnaWRib2R5LiBUaGUgbGFyZ2VyIHRoZSB2YWx1ZSwgdGhlIHNsb3dlciB0aGUgcmlnaWRib2R5IG1vdmVzLlxuICAgICAqICEjemhcbiAgICAgKiDnur/mgKfpmLvlsLzvvIznlKjkuo7lh4/lsI/liJrkvZPnmoTnur/mgKfpgJ/njofvvIzlgLzotorlpKfniankvZPnp7vliqjotormhaLjgIJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbGluZWFyRGFtcGluZ1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogMVxuICAgIH0pXG4gICAgcHVibGljIGdldCBsaW5lYXJEYW1waW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVhckRhbXBpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBsaW5lYXJEYW1waW5nICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9saW5lYXJEYW1waW5nID0gdmFsdWU7XG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkubGluZWFyRGFtcGluZyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFVzZWQgdG8gcmVkdWNlIHRoZSByb3RhdGlvbiByYXRlIG9mIHJpZ2lkYm9keS4gVGhlIGxhcmdlciB0aGUgdmFsdWUsIHRoZSBzbG93ZXIgdGhlIHJpZ2lkYm9keSByb3RhdGVzLlxuICAgICAqICEjemhcbiAgICAgKiDop5LpmLvlsLzvvIznlKjkuo7lh4/lsI/liJrkvZPnmoTml4vovazpgJ/njofvvIzlgLzotorlpKfliJrkvZPml4vovazotormhaLjgIJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYW5ndWxhckRhbXBpbmdcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5T3JkZXI6IDJcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgYW5ndWxhckRhbXBpbmcgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5ndWxhckRhbXBpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhbmd1bGFyRGFtcGluZyAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYW5ndWxhckRhbXBpbmcgPSB2YWx1ZTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5hbmd1bGFyRGFtcGluZyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIElmIGVuYWJsZWQsIHRoZSBkZXZlbG9wZXIgY29udHJvbHMgdGhlIGRpc3BsYWNlbWVudCBhbmQgcm90YXRpb24gb2YgdGhlIHJpZ2lkYm9keSwgbm90IHRoZSBwaHlzaWNzIGVuZ2luZS5cbiAgICAgKiAhI3poXG4gICAgICog5piv5ZCm55Sx5byA5Y+R6ICF5p2l5o6n5Yi25Yia5L2T55qE5L2N56e75ZKM5peL6L2s77yM6ICM5LiN5piv5Y+X54mp55CG5byV5pOO55qE5b2x5ZON44CCXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc0tpbmVtYXRpY1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogM1xuICAgIH0pXG4gICAgcHVibGljIGdldCBpc0tpbmVtYXRpYyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0tpbmVtYXRpYztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzS2luZW1hdGljICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pc0tpbmVtYXRpYyA9IHZhbHVlO1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LmlzS2luZW1hdGljID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSWYgZW5hYmxlZCwgdGhlIHJpZ2lkYm9keSBpcyBhZmZlY3RlZCBieSBncmF2aXR5LlxuICAgICAqICEjemhcbiAgICAgKiDlpoLmnpzlvIDlkK/vvIzliJrkvZPkvJrlj5fliLDph43lipvlvbHlk43jgIJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHVzZUdyYXZpdHlcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5T3JkZXI6IDRcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgdXNlR3Jhdml0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VHcmF2aXR5O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgdXNlR3Jhdml0eSAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdXNlR3Jhdml0eSA9IHZhbHVlO1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LnVzZUdyYXZpdHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJZiBlbmFibGVkLCB0aGUgcmlnaWRib2R5IHdpbGwgYmUgZml4ZWQgd2l0aG91dCByb3RhdGlvbiBkdXJpbmcgYSBjb2xsaXNpb24uXG4gICAgICogISN6aFxuICAgICAqIOWmguaenOW8gOWQr++8jOWPkeeUn+eisOaSnuaXtuS8muWbuuWumuWImuS9k+S4jeS6p+eUn+aXi+i9rOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZml4ZWRSb3RhdGlvblxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogNVxuICAgIH0pXG4gICAgcHVibGljIGdldCBmaXhlZFJvdGF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeGVkUm90YXRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBmaXhlZFJvdGF0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9maXhlZFJvdGF0aW9uID0gdmFsdWU7XG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuZml4ZWRSb3RhdGlvbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEl0IGNhbiBhZmZlY3QgdGhlIGxpbmVhciB2ZWxvY2l0eSBjaGFuZ2Ugb2YgdGhlIHJpZ2lkYm9keSBpbiBlYWNoIGF4aXMuIFRoZSBsYXJnZXIgdGhlIHZhbHVlLCB0aGUgZmFzdGVyIHRoZSByaWdpZGJvZHkgbW92ZXMuXG4gICAgICogISN6aFxuICAgICAqIOe6v+aAp+WboOWtkO+8jOWPr+W9seWTjeWImuS9k+WcqOavj+S4qui9tOWQkeeahOe6v+aAp+mAn+W6puWPmOWMlu+8jOWAvOi2iuWkp+WImuS9k+enu+WKqOi2iuW/q+OAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbGluZWFyRmFjdG9yXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU9yZGVyOiA2XG4gICAgfSlcbiAgICBwdWJsaWMgZ2V0IGxpbmVhckZhY3RvciAoKTogY2MuVmVjMyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lYXJGYWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBsaW5lYXJGYWN0b3IgKHZhbHVlOiBjYy5WZWMzKSB7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9saW5lYXJGYWN0b3IsIHZhbHVlKTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5saW5lYXJGYWN0b3IgPSB0aGlzLl9saW5lYXJGYWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSXQgY2FuIGFmZmVjdCB0aGUgcm90YXRpb24gc3BlZWQgY2hhbmdlIG9mIHRoZSByaWdpZGJvZHkgaW4gZWFjaCBheGlzLiBUaGUgbGFyZ2VyIHRoZSB2YWx1ZSwgdGhlIGZhc3RlciB0aGUgcmlnaWRib2R5IHJvdGF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOaXi+i9rOWboOWtkO+8jOWPr+W9seWTjeWImuS9k+WcqOavj+S4qui9tOWQkeeahOaXi+i9rOmAn+W6puWPmOWMlu+8jOWAvOi2iuWkp+WImuS9k+aXi+i9rOi2iuW/q+OAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYW5ndWxhckZhY3RvclxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlPcmRlcjogN1xuICAgIH0pXG4gICAgcHVibGljIGdldCBhbmd1bGFyRmFjdG9yICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ3VsYXJGYWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhbmd1bGFyRmFjdG9yICh2YWx1ZTogY2MuVmVjMykge1xuICAgICAgICBWZWMzLmNvcHkodGhpcy5fYW5ndWxhckZhY3RvciwgdmFsdWUpO1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFuZ3VsYXJGYWN0b3IgPSB0aGlzLl9hbmd1bGFyRmFjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRoZSByaWdpZGJvZHkgaXMgYXdha2UuXG4gICAgICogISN6aFxuICAgICAqIOWImuS9k+aYr+WQpuS4uuWUpOmGkueahOeKtuaAgeOAglxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNBd2FrZVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaXNBd2FrZSAoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pc0F3YWtlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIHJpZ2lkYm9keSBjYW4gZW50ZXIgaGliZXJuYXRpb24uXG4gICAgICogISN6aFxuICAgICAqIOWImuS9k+aYr+WQpuS4uuWPr+i/m+WFpeS8keecoOeahOeKtuaAgeOAglxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNTbGVlcHlcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlzU2xlZXB5ICgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlzU2xlZXB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIHJpZ2lkYm9keSBpcyBzbGVlcGluZy5cbiAgICAgKiAhI3poXG4gICAgICog5Yia5L2T5piv5ZCm5Li65q2j5Zyo5LyR55yg55qE54q25oCB44CCXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc1NsZWVwaW5nXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcHVibGljIGdldCBpc1NsZWVwaW5nICgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlzU2xlZXBpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIHJpZ2lkYm9keSBvYmplY3QgaW5zaWRlIHRoZSBwaHlzaWNzIGVuZ2luZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635b6X54mp55CG5byV5pOO5YaF6YOo5Yia5L2T5a+56LGh44CCXG4gICAgICogQHByb3BlcnR5IHtJUmlnaWRCb2R5fSByaWdpZEJvZHlcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJpZ2lkQm9keSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2JvZHkhOiBJUmlnaWRCb2R5O1xuXG4gICAgLy8vIFBSSVZBVEUgUFJPUEVSVFkgLy8vXG5cbiAgICAvLyBAcHJvcGVydHlcbiAgICBwcml2YXRlIF9hbGxvd1NsZWVwOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX21hc3M6IG51bWJlciA9IDEwO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfbGluZWFyRGFtcGluZzogbnVtYmVyID0gMC4xO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfYW5ndWxhckRhbXBpbmc6IG51bWJlciA9IDAuMTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2ZpeGVkUm90YXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2lzS2luZW1hdGljOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHlcbiAgICBwcml2YXRlIF91c2VHcmF2aXR5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHByaXZhdGUgX2xpbmVhckZhY3RvcjogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xuXG4gICAgQHByb3BlcnR5XG4gICAgcHJpdmF0ZSBfYW5ndWxhckZhY3RvcjogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xuXG4gICAgcHJvdGVjdGVkIGdldCBfYXNzZXJ0T25sb2FkICgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuX2lzT25Mb2FkQ2FsbGVkID09IDA7XG4gICAgICAgIGlmIChyKSB7IGNjLmVycm9yKCdQaHlzaWNzIEVycm9yOiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgdGhlIG5vZGUgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIHNjZW5lJyk7IH1cbiAgICAgICAgcmV0dXJuICFyO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keSA9IGNyZWF0ZVJpZ2lkQm9keSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8vIENPTVBPTkVOVCBMSUZFQ1lDTEUgLy8vXG5cbiAgICBwcm90ZWN0ZWQgX19wcmVsb2FkICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5fX3ByZWxvYWQhKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5vbkVuYWJsZSEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5Lm9uRGlzYWJsZSEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5Lm9uRGVzdHJveSEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLyBQVUJMSUMgTUVUSE9EIC8vL1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEEgZm9yY2UgaXMgYXBwbGllZCB0byBhIHJpZ2lkIGJvZHkgYXQgYSBwb2ludCBpbiB3b3JsZCBzcGFjZS5cbiAgICAgKiAhI3poXG4gICAgICog5Zyo5LiW55WM56m66Ze05Lit55qE5p+Q54K55LiK5a+55Yia5L2T5pa95Yqg5LiA5Liq5L2c55So5Yqb44CCXG4gICAgICogQG1ldGhvZCBhcHBseUZvcmNlXG4gICAgICogQHBhcmFtIHtWZWMzfSBmb3JjZVxuICAgICAqIEBwYXJhbSB7VmVjM30gcmVsYXRpdmVQb2ludCBUaGUgcG9pbnQgb2YgYWN0aW9uLCByZWxhdGl2ZSB0byB0aGUgY2VudGVyIG9mIHRoZSByaWdpZCBib2R5LlxuICAgICAqL1xuICAgIHB1YmxpYyBhcHBseUZvcmNlIChmb3JjZTogY2MuVmVjMywgcmVsYXRpdmVQb2ludD86IGNjLlZlYzMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYXBwbHlGb3JjZShmb3JjZSwgcmVsYXRpdmVQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYSBmb3JjZSBvbiB0aGUgcmlnaWQgYm9keSBhdCBhIHBvaW50IGluIGxvY2FsIHNwYWNlLlxuICAgICAqICEjemhcbiAgICAgKiDlnKjmnKzlnLDnqbrpl7TkuK3nmoTmn5DngrnkuIrlr7nliJrkvZPmlr3liqDkuIDkuKrkvZznlKjlipvjgIJcbiAgICAgKiBAbWV0aG9kIGFwcGx5TG9jYWxGb3JjZVxuICAgICAqIEBwYXJhbSB7VmVjM30gZm9yY2UgXG4gICAgICogQHBhcmFtIHtWZWMzfSBsb2NhbFBvaW50IFBvaW50IG9mIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFwcGx5TG9jYWxGb3JjZSAoZm9yY2U6IGNjLlZlYzMsIGxvY2FsUG9pbnQ/OiBjYy5WZWMzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFwcGx5TG9jYWxGb3JjZShmb3JjZSwgbG9jYWxQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYW4gaW1wdWxzZSB0byBhIHJpZ2lkIGJvZHkgYXQgYSBwb2ludCBpbiB3b3JsZCBzcGFjZS5cbiAgICAgKiAhI3poXG4gICAgICog5Zyo5LiW55WM56m66Ze055qE5p+Q54K55LiK5a+55Yia5L2T5pa95Yqg5LiA5Liq5Yay6YeP44CCXG4gICAgICogQG1ldGhvZCBhcHBseUltcHVsc2VcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGltcHVsc2VcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHJlbGF0aXZlUG9pbnQgVGhlIHBvaW50IG9mIGFjdGlvbiwgcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBvZiB0aGUgcmlnaWQgYm9keS5cbiAgICAgKi9cbiAgICBwdWJsaWMgYXBwbHlJbXB1bHNlIChpbXB1bHNlOiBjYy5WZWMzLCByZWxhdGl2ZVBvaW50PzogY2MuVmVjMykge1xuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5hcHBseUltcHVsc2UoaW1wdWxzZSwgcmVsYXRpdmVQb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYW4gaW1wdWxzZSB0byB0aGUgcmlnaWQgYm9keSBhdCBhIHBvaW50IGluIGxvY2FsIHNwYWNlLlxuICAgICAqICEjemhcbiAgICAgKiDlnKjmnKzlnLDnqbrpl7TnmoTmn5DngrnkuIrlr7nliJrkvZPmlr3liqDkuIDkuKrlhrLph4/jgIJcbiAgICAgKiBAbWV0aG9kIGFwcGx5TG9jYWxJbXB1bHNlXG4gICAgICogQHBhcmFtIHtWZWMzfSBpbXB1bHNlXG4gICAgICogQHBhcmFtIHtWZWMzfSBsb2NhbFBvaW50IFBvaW50IG9mIGFwcGxpY2F0aW9uXG4gICAgICovXG4gICAgcHVibGljIGFwcGx5TG9jYWxJbXB1bHNlIChpbXB1bHNlOiBjYy5WZWMzLCBsb2NhbFBvaW50PzogY2MuVmVjMykge1xuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xuICAgICAgICAgICAgdGhpcy5fYm9keS5hcHBseUxvY2FsSW1wdWxzZShpbXB1bHNlLCBsb2NhbFBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhIHRvcnF1ZSB0byB0aGUgcmlnaWQgYm9keS5cbiAgICAgKiAhI3poXG4gICAgICog5a+55Yia5L2T5pa95Yqg5omt6L2s5Yqb44CCXG4gICAgICogQG1ldGhvZCBhcHBseVRvcnF1ZVxuICAgICAqIEBwYXJhbSB7VmVjM30gdG9ycXVlXG4gICAgICovXG4gICAgcHVibGljIGFwcGx5VG9ycXVlICh0b3JxdWU6IGNjLlZlYzMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYXBwbHlUb3JxdWUodG9ycXVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhIGxvY2FsIHRvcnF1ZSB0byB0aGUgcmlnaWQgYm9keS5cbiAgICAgKiAhI3poXG4gICAgICog5a+55Yia5L2T5pa95Yqg5pys5Zyw5omt6L2s5Yqb44CCXG4gICAgICogQG1ldGhvZCBhcHBseUxvY2FsVG9ycXVlXG4gICAgICogQHBhcmFtIHtWZWMzfSB0b3JxdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYXBwbHlMb2NhbFRvcnF1ZSAodG9ycXVlOiBjYy5WZWMzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFwcGx5TG9jYWxUb3JxdWUodG9ycXVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBd2FrZW4gdGhlIHJpZ2lkIGJvZHkuXG4gICAgICogISN6aFxuICAgICAqIOWUpOmGkuWImuS9k+OAglxuICAgICAqIEBtZXRob2Qgd2FrZVVwXG4gICAgICovXG4gICAgcHVibGljIHdha2VVcCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5Lndha2VVcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERvcm1hbnQgcmlnaWQgYm9keS5cbiAgICAgKiAhI3poXG4gICAgICog5LyR55yg5Yia5L2T44CCXG4gICAgICogQG1ldGhvZCBzbGVlcFxuICAgICAqL1xuICAgIHB1YmxpYyBzbGVlcCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LnNsZWVwKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IGxpbmVhciB2ZWxvY2l0eS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W57q/5oCn6YCf5bqm44CCXG4gICAgICogQG1ldGhvZCBnZXRMaW5lYXJWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7VmVjM30gb3V0XG4gICAgICovXG4gICAgcHVibGljIGdldExpbmVhclZlbG9jaXR5IChvdXQ6IGNjLlZlYzMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuZ2V0TGluZWFyVmVsb2NpdHkob3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgbGluZWFyIHNwZWVkLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7nur/mgKfpgJ/luqbjgIJcbiAgICAgKiBAbWV0aG9kIHNldExpbmVhclZlbG9jaXR5XG4gICAgICogQHBhcmFtIHtWZWMzfSB2YWx1ZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0TGluZWFyVmVsb2NpdHkgKHZhbHVlOiBjYy5WZWMzKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XG4gICAgICAgICAgICB0aGlzLl9ib2R5LnNldExpbmVhclZlbG9jaXR5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXRzIHRoZSByb3RhdGlvbiBzcGVlZC5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5peL6L2s6YCf5bqm44CCXG4gICAgICogQG1ldGhvZCBnZXRBbmd1bGFyVmVsb2NpdHlcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dCBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QW5ndWxhclZlbG9jaXR5IChvdXQ6IGNjLlZlYzMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuZ2V0QW5ndWxhclZlbG9jaXR5KG91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0IHJvdGF0aW9uIHNwZWVkLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7ml4vovazpgJ/luqbjgIJcbiAgICAgKiBAbWV0aG9kIHNldEFuZ3VsYXJWZWxvY2l0eVxuICAgICAqIEBwYXJhbSB7VmVjM30gdmFsdWUgXG4gICAgICovXG4gICAgcHVibGljIHNldEFuZ3VsYXJWZWxvY2l0eSAodmFsdWU6IGNjLlZlYzMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuc2V0QW5ndWxhclZlbG9jaXR5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9