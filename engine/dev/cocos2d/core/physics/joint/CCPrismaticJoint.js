
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCPrismaticJoint.js';
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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;

var ANGLE_TO_PHYSICS_ANGLE = require('../CCPhysicsTypes').ANGLE_TO_PHYSICS_ANGLE;
/**
 * !#en
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in rigidbody. Relative rotation is prevented. You can
 * use a joint limit to restrict the range of motion and a joint motor to
 * drive the motion or to model joint friction.
 * !#zh
 * 移动关节指定了只能在一个方向上移动刚体。
 * 你可以开启关节限制来设置刚体运行移动的间距，也可以开启马达来使用关节马达驱动刚体的运行。
 * @class PrismaticJoint
 * @extends Joint
 */


var PrismaticJoint = cc.Class({
  name: 'cc.PrismaticJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/PrismaticJoint'
  },
  properties: {
    /**
     * !#en
     * The local joint axis relative to rigidbody.
     * !#zh
     * 指定刚体可以移动的方向。
     * @property {Vec2} localAxisA
     * @default cc.v2(1, 0)
     */
    localAxisA: {
      "default": cc.v2(1, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.localAxisA'
    },

    /**
     * !#en
     * The reference angle.
     * !#zh
     * 相对角度
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },

    /**
     * !#en
     * Enable joint distance limit?
     * !#zh
     * 是否开启关节的距离限制？
     * @property {Boolean} enableLimit
     * @default false
     */
    enableLimit: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableLimit'
    },

    /**
     * !#en
     * Enable joint motor?
     * !#zh
     * 是否开启关节马达？
     * @property {Boolean} enableMotor
     * @default false
     */
    enableMotor: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableMotor'
    },

    /**
     * !#en
     * The lower joint limit.
     * !#zh
     * 刚体能够移动的最小值
     * @property {Number} lowerLimit
     * @default 0
     */
    lowerLimit: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.lowerLimit'
    },

    /**
     * !#en
     * The upper joint limit.
     * !#zh
     * 刚体能够移动的最大值
     * @property {Number} upperLimit
     * @default 0
     */
    upperLimit: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.upperLimit'
    },
    _maxMotorForce: 0,
    _motorSpeed: 0,

    /**
     * !#en
     * The maxium force can be applied to rigidbody to rearch the target motor speed.
     * !#zh
     * 可以施加到刚体的最大力。
     * @property {Number} maxMotorForce
     * @default 0
     */
    maxMotorForce: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxMotorForce',
      get: function get() {
        return this._maxMotorForce;
      },
      set: function set(value) {
        this._maxMotorForce = value;

        if (this._joint) {
          this._joint.SetMaxMotorForce(value);
        }
      }
    },

    /**
     * !#en
     * The expected motor speed.
     * !#zh
     * 期望的马达速度。
     * @property {Number} motorSpeed
     * @default 0
     */
    motorSpeed: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.motorSpeed',
      get: function get() {
        return this._motorSpeed;
      },
      set: function set(value) {
        this._motorSpeed = value;

        if (this._joint) {
          this._joint.SetMotorSpeed(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.PrismaticJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.enableLimit = this.enableLimit;
    def.lowerTranslation = this.lowerLimit / PTM_RATIO;
    def.upperTranslation = this.upperLimit / PTM_RATIO;
    def.enableMotor = this.enableMotor;
    def.maxMotorForce = this.maxMotorForce;
    def.motorSpeed = this.motorSpeed;
    return def;
  }
});
cc.PrismaticJoint = module.exports = PrismaticJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NQcmlzbWF0aWNKb2ludC5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiQU5HTEVfVE9fUEhZU0lDU19BTkdMRSIsIlByaXNtYXRpY0pvaW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJKb2ludCIsImVkaXRvciIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwibG9jYWxBeGlzQSIsInYyIiwidG9vbHRpcCIsIkNDX0RFViIsInJlZmVyZW5jZUFuZ2xlIiwiZW5hYmxlTGltaXQiLCJlbmFibGVNb3RvciIsImxvd2VyTGltaXQiLCJ1cHBlckxpbWl0IiwiX21heE1vdG9yRm9yY2UiLCJfbW90b3JTcGVlZCIsIm1heE1vdG9yRm9yY2UiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9qb2ludCIsIlNldE1heE1vdG9yRm9yY2UiLCJtb3RvclNwZWVkIiwiU2V0TW90b3JTcGVlZCIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsImIyIiwiUHJpc21hdGljSm9pbnREZWYiLCJsb2NhbEFuY2hvckEiLCJWZWMyIiwiYW5jaG9yIiwieCIsInkiLCJsb2NhbEFuY2hvckIiLCJjb25uZWN0ZWRBbmNob3IiLCJsb3dlclRyYW5zbGF0aW9uIiwidXBwZXJUcmFuc2xhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFDQSxJQUFJRSxzQkFBc0IsR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJDLHNCQUExRDtBQUVBOzs7Ozs7Ozs7Ozs7OztBQVlBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUks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QSxHQUFHLENBQUNwQixVQUFKLEdBQWlCLElBQUlxQixFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLeEIsVUFBTCxDQUFnQjBCLENBQTVCLEVBQStCLEtBQUsxQixVQUFMLENBQWdCMkIsQ0FBL0MsQ0FBakI7QUFDQVAsSUFBQUEsR0FBRyxDQUFDaEIsY0FBSixHQUFxQixLQUFLQSxjQUFMLEdBQXNCZixzQkFBM0M7QUFDQStCLElBQUFBLEdBQUcsQ0FBQ2YsV0FBSixHQUFrQixLQUFLQSxXQUF2QjtBQUNBZSxJQUFBQSxHQUFHLENBQUNVLGdCQUFKLEdBQXVCLEtBQUt2QixVQUFMLEdBQWdCcEIsU0FBdkM7QUFDQWlDLElBQUFBLEdBQUcsQ0FBQ1csZ0JBQUosR0FBdUIsS0FBS3ZCLFVBQUwsR0FBZ0JyQixTQUF2QztBQUNBaUMsSUFBQUEsR0FBRyxDQUFDZCxXQUFKLEdBQWtCLEtBQUtBLFdBQXZCO0FBQ0FjLElBQUFBLEdBQUcsQ0FBQ1QsYUFBSixHQUFvQixLQUFLQSxhQUF6QjtBQUNBUyxJQUFBQSxHQUFHLENBQUNILFVBQUosR0FBaUIsS0FBS0EsVUFBdEI7QUFFQSxXQUFPRyxHQUFQO0FBQ0g7QUFuSnlCLENBQVQsQ0FBckI7QUFzSkE3QixFQUFFLENBQUNELGNBQUgsR0FBb0IwQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzQyxjQUFyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG5cbi8qKlxuICogISNlblxuICogQSBwcmlzbWF0aWMgam9pbnQuIFRoaXMgam9pbnQgcHJvdmlkZXMgb25lIGRlZ3JlZSBvZiBmcmVlZG9tOiB0cmFuc2xhdGlvblxuICogYWxvbmcgYW4gYXhpcyBmaXhlZCBpbiByaWdpZGJvZHkuIFJlbGF0aXZlIHJvdGF0aW9uIGlzIHByZXZlbnRlZC4gWW91IGNhblxuICogdXNlIGEgam9pbnQgbGltaXQgdG8gcmVzdHJpY3QgdGhlIHJhbmdlIG9mIG1vdGlvbiBhbmQgYSBqb2ludCBtb3RvciB0b1xuICogZHJpdmUgdGhlIG1vdGlvbiBvciB0byBtb2RlbCBqb2ludCBmcmljdGlvbi5cbiAqICEjemhcbiAqIOenu+WKqOWFs+iKguaMh+WumuS6huWPquiDveWcqOS4gOS4quaWueWQkeS4iuenu+WKqOWImuS9k+OAglxuICog5L2g5Y+v5Lul5byA5ZCv5YWz6IqC6ZmQ5Yi25p2l6K6+572u5Yia5L2T6L+Q6KGM56e75Yqo55qE6Ze06Led77yM5Lmf5Y+v5Lul5byA5ZCv6ams6L6+5p2l5L2/55So5YWz6IqC6ams6L6+6amx5Yqo5Yia5L2T55qE6L+Q6KGM44CCXG4gKiBAY2xhc3MgUHJpc21hdGljSm9pbnRcbiAqIEBleHRlbmRzIEpvaW50XG4gKi9cbnZhciBQcmlzbWF0aWNKb2ludCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUHJpc21hdGljSm9pbnQnLFxuICAgIGV4dGVuZHM6IGNjLkpvaW50LFxuICAgIFxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL2pvaW50LmpzJyxcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1ByaXNtYXRpY0pvaW50JyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbG9jYWwgam9pbnQgYXhpcyByZWxhdGl2ZSB0byByaWdpZGJvZHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5oyH5a6a5Yia5L2T5Y+v5Lul56e75Yqo55qE5pa55ZCR44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbG9jYWxBeGlzQVxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigxLCAwKVxuICAgICAgICAgKi9cbiAgICAgICAgbG9jYWxBeGlzQToge1xuICAgICAgICAgICAgZGVmYXVsdDogY2MudjIoMSwgMCksXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5sb2NhbEF4aXNBJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSByZWZlcmVuY2UgYW5nbGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog55u45a+56KeS5bqmXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByZWZlcmVuY2VBbmdsZVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICByZWZlcmVuY2VBbmdsZToge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnJlZmVyZW5jZUFuZ2xlJyAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEVuYWJsZSBqb2ludCBkaXN0YW5jZSBsaW1pdD9cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKblvIDlkK/lhbPoioLnmoTot53nprvpmZDliLbvvJ9cbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVMaW1pdFxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlTGltaXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZW5hYmxlTGltaXQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogRW5hYmxlIGpvaW50IG1vdG9yP1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaYr+WQpuW8gOWQr+WFs+iKgumprOi+vu+8n1xuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZU1vdG9yXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBlbmFibGVNb3Rvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5lbmFibGVNb3RvcicgICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbG93ZXIgam9pbnQgbGltaXQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yia5L2T6IO95aSf56e75Yqo55qE5pyA5bCP5YC8XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsb3dlckxpbWl0XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGxvd2VyTGltaXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5sb3dlckxpbWl0J1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgdXBwZXIgam9pbnQgbGltaXQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yia5L2T6IO95aSf56e75Yqo55qE5pyA5aSn5YC8XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB1cHBlckxpbWl0XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHVwcGVyTGltaXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci51cHBlckxpbWl0JyAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIF9tYXhNb3RvckZvcmNlOiAwLFxuICAgICAgICBfbW90b3JTcGVlZDogMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbWF4aXVtIGZvcmNlIGNhbiBiZSBhcHBsaWVkIHRvIHJpZ2lkYm9keSB0byByZWFyY2ggdGhlIHRhcmdldCBtb3RvciBzcGVlZC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlj6/ku6Xmlr3liqDliLDliJrkvZPnmoTmnIDlpKflipvjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heE1vdG9yRm9yY2VcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgbWF4TW90b3JGb3JjZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4TW90b3JGb3JjZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4TW90b3JGb3JjZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heE1vdG9yRm9yY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TWF4TW90b3JGb3JjZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBleHBlY3RlZCBtb3RvciBzcGVlZC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmnJ/mnJvnmoTpqazovr7pgJ/luqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1vdG9yU3BlZWRcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgbW90b3JTcGVlZDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubW90b3JTcGVlZCcsICAgICAgICAgICAgXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW90b3JTcGVlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdG9yU3BlZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TW90b3JTcGVlZCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlZiA9IG5ldyBiMi5QcmlzbWF0aWNKb2ludERlZigpO1xuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XG4gICAgICAgIGRlZi5sb2NhbEF4aXNBID0gbmV3IGIyLlZlYzIodGhpcy5sb2NhbEF4aXNBLngsIHRoaXMubG9jYWxBeGlzQS55KTtcbiAgICAgICAgZGVmLnJlZmVyZW5jZUFuZ2xlID0gdGhpcy5yZWZlcmVuY2VBbmdsZSAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG4gICAgICAgIGRlZi5lbmFibGVMaW1pdCA9IHRoaXMuZW5hYmxlTGltaXQ7XG4gICAgICAgIGRlZi5sb3dlclRyYW5zbGF0aW9uID0gdGhpcy5sb3dlckxpbWl0L1BUTV9SQVRJTztcbiAgICAgICAgZGVmLnVwcGVyVHJhbnNsYXRpb24gPSB0aGlzLnVwcGVyTGltaXQvUFRNX1JBVElPO1xuICAgICAgICBkZWYuZW5hYmxlTW90b3IgPSB0aGlzLmVuYWJsZU1vdG9yO1xuICAgICAgICBkZWYubWF4TW90b3JGb3JjZSA9IHRoaXMubWF4TW90b3JGb3JjZTtcbiAgICAgICAgZGVmLm1vdG9yU3BlZWQgPSB0aGlzLm1vdG9yU3BlZWQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5QcmlzbWF0aWNKb2ludCA9IG1vZHVsZS5leHBvcnRzID0gUHJpc21hdGljSm9pbnQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==