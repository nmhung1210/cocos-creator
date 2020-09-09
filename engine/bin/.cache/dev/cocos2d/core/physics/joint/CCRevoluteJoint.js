
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCRevoluteJoint.js';
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

var PHYSICS_ANGLE_TO_ANGLE = require('../CCPhysicsTypes').PHYSICS_ANGLE_TO_ANGLE;
/**
 * !#en
 * A revolute joint constrains two bodies to share a common point while they
 * are free to rotate about the point. The relative rotation about the shared
 * point is the joint angle. You can limit the relative rotation with
 * a joint limit that specifies a lower and upper angle. You can use a motor
 * to drive the relative rotation about the shared point. A maximum motor torque
 * is provided so that infinite forces are not generated.
 * !#zh
 * 旋转关节可以约束两个刚体围绕一个点来进行旋转。
 * 你可以通过开启关节限制来限制旋转的最大角度和最小角度。
 * 你可以通过开启马达来施加一个扭矩力来驱动这两个刚体在这一点上的相对速度。
 * @class RevoluteJoint
 * @extends Joint
 */


var RevoluteJoint = cc.Class({
  name: 'cc.RevoluteJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Revolute',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _maxMotorTorque: 0,
    _motorSpeed: 0,
    _enableLimit: false,
    _enableMotor: false,

    /**
     * !#en
     * The reference angle.
     * An angle between bodies considered to be zero for the joint angle.
     * !#zh
     * 相对角度。
     * 两个物体之间角度为零时可以看作相等于关节角度
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },

    /**
     * !#en
     * The lower angle.
     * !#zh
     * 角度的最低限制。
     * @property {Number} lowerAngle
     * @default 0
     */
    lowerAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.lowerAngle'
    },

    /**
     * !#en
     * The upper angle.
     * !#zh
     * 角度的最高限制。
     * @property {Number} upperAngle
     * @default 0
     */
    upperAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.upperAngle'
    },

    /**
     * !#en
     * The maxium torque can be applied to rigidbody to rearch the target motor speed.
     * !#zh
     * 可以施加到刚体的最大扭矩。
     * @property {Number} maxMotorTorque
     * @default 0
     */
    maxMotorTorque: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxMotorTorque',
      get: function get() {
        return this._maxMotorTorque;
      },
      set: function set(value) {
        this._maxMotorTorque = value;

        if (this._joint) {
          this._joint.SetMaxMotorTorque(value);
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
          this._joint.SetMotorSpeed(value * ANGLE_TO_PHYSICS_ANGLE);
        }
      }
    },

    /**
     * !#en
     * Enable joint limit?
     * !#zh
     * 是否开启关节的限制？
     * @property {Boolean} enableLimit
     * @default false
     */
    enableLimit: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableLimit',
      get: function get() {
        return this._enableLimit;
      },
      set: function set(value) {
        this._enableLimit = value;

        if (this._joint) {
          this._joint.EnableLimit(value);
        }
      }
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
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableMotor',
      get: function get() {
        return this._enableMotor;
      },
      set: function set(value) {
        this._enableMotor = value;

        if (this._joint) {
          this._joint.EnableMotor(value);
        }
      }
    }
  },

  /**
   * !#en
   * Get the joint angle.
   * !#zh
   * 获取关节角度。
   * @method getJointAngle
   * @return {Number}
   */
  getJointAngle: function getJointAngle() {
    if (this._joint) {
      return this._joint.GetJointAngle() * PHYSICS_ANGLE_TO_ANGLE;
    }

    return 0;
  },

  /**
   * !#en
   * Set the max and min limit angle.
   * !#zh
   * 设置关节的角度最大和最小角度。
   * @param {Number} lower 
   * @param {Number} upper 
   */
  setLimits: function setLimits(lower, upper) {
    if (this._joint) {
      return this._joint.SetLimits(lower * ANGLE_TO_PHYSICS_ANGLE, upper * ANGLE_TO_PHYSICS_ANGLE);
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.RevoluteJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO); // cocos degree 0 is to right, and box2d degree 0 is to up.

    def.lowerAngle = this.upperAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.upperAngle = this.lowerAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.maxMotorTorque = this.maxMotorTorque;
    def.motorSpeed = this.motorSpeed * ANGLE_TO_PHYSICS_ANGLE;
    def.enableLimit = this.enableLimit;
    def.enableMotor = this.enableMotor;
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    return def;
  }
});
cc.RevoluteJoint = module.exports = RevoluteJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NSZXZvbHV0ZUpvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiUEhZU0lDU19BTkdMRV9UT19BTkdMRSIsIlJldm9sdXRlSm9pbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkpvaW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImluc3BlY3RvciIsInByb3BlcnRpZXMiLCJfbWF4TW90b3JUb3JxdWUiLCJfbW90b3JTcGVlZCIsIl9lbmFibGVMaW1pdCIsIl9lbmFibGVNb3RvciIsInJlZmVyZW5jZUFuZ2xlIiwidG9vbHRpcCIsIkNDX0RFViIsImxvd2VyQW5nbGUiLCJ1cHBlckFuZ2xlIiwibWF4TW90b3JUb3JxdWUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9qb2ludCIsIlNldE1heE1vdG9yVG9ycXVlIiwibW90b3JTcGVlZCIsIlNldE1vdG9yU3BlZWQiLCJlbmFibGVMaW1pdCIsIkVuYWJsZUxpbWl0IiwiZW5hYmxlTW90b3IiLCJFbmFibGVNb3RvciIsImdldEpvaW50QW5nbGUiLCJHZXRKb2ludEFuZ2xlIiwic2V0TGltaXRzIiwibG93ZXIiLCJ1cHBlciIsIlNldExpbWl0cyIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsImIyIiwiUmV2b2x1dGVKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFDQSxJQUFJRSxzQkFBc0IsR0FBR0QsT0FBTyxDQUFDLG1CQUFE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c0JBQWxDO0FBQ0F3QyxJQUFBQSxHQUFHLENBQUNwQixVQUFKLEdBQWlCLEtBQUtELFVBQUwsR0FBaUJuQixzQkFBbEM7QUFFQXdDLElBQUFBLEdBQUcsQ0FBQ25CLGNBQUosR0FBcUIsS0FBS0EsY0FBMUI7QUFDQW1CLElBQUFBLEdBQUcsQ0FBQ2IsVUFBSixHQUFpQixLQUFLQSxVQUFMLEdBQWtCM0Isc0JBQW5DO0FBQ0F3QyxJQUFBQSxHQUFHLENBQUNYLFdBQUosR0FBa0IsS0FBS0EsV0FBdkI7QUFDQVcsSUFBQUEsR0FBRyxDQUFDVCxXQUFKLEdBQWtCLEtBQUtBLFdBQXZCO0FBRUFTLElBQUFBLEdBQUcsQ0FBQ3hCLGNBQUosR0FBcUIsS0FBS0EsY0FBTCxHQUFzQmhCLHNCQUEzQztBQUVBLFdBQU93QyxHQUFQO0FBQ0g7QUExTHdCLENBQVQsQ0FBcEI7QUE2TEFyQyxFQUFFLENBQUNELGFBQUgsR0FBbUJnRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxhQUFwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG52YXIgUEhZU0lDU19BTkdMRV9UT19BTkdMRSA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUEhZU0lDU19BTkdMRV9UT19BTkdMRTtcblxuLyoqXG4gKiAhI2VuXG4gKiBBIHJldm9sdXRlIGpvaW50IGNvbnN0cmFpbnMgdHdvIGJvZGllcyB0byBzaGFyZSBhIGNvbW1vbiBwb2ludCB3aGlsZSB0aGV5XG4gKiBhcmUgZnJlZSB0byByb3RhdGUgYWJvdXQgdGhlIHBvaW50LiBUaGUgcmVsYXRpdmUgcm90YXRpb24gYWJvdXQgdGhlIHNoYXJlZFxuICogcG9pbnQgaXMgdGhlIGpvaW50IGFuZ2xlLiBZb3UgY2FuIGxpbWl0IHRoZSByZWxhdGl2ZSByb3RhdGlvbiB3aXRoXG4gKiBhIGpvaW50IGxpbWl0IHRoYXQgc3BlY2lmaWVzIGEgbG93ZXIgYW5kIHVwcGVyIGFuZ2xlLiBZb3UgY2FuIHVzZSBhIG1vdG9yXG4gKiB0byBkcml2ZSB0aGUgcmVsYXRpdmUgcm90YXRpb24gYWJvdXQgdGhlIHNoYXJlZCBwb2ludC4gQSBtYXhpbXVtIG1vdG9yIHRvcnF1ZVxuICogaXMgcHJvdmlkZWQgc28gdGhhdCBpbmZpbml0ZSBmb3JjZXMgYXJlIG5vdCBnZW5lcmF0ZWQuXG4gKiAhI3poXG4gKiDml4vovazlhbPoioLlj6/ku6XnuqbmnZ/kuKTkuKrliJrkvZPlm7Tnu5XkuIDkuKrngrnmnaXov5vooYzml4vovazjgIJcbiAqIOS9oOWPr+S7pemAmui/h+W8gOWQr+WFs+iKgumZkOWItuadpemZkOWItuaXi+i9rOeahOacgOWkp+inkuW6puWSjOacgOWwj+inkuW6puOAglxuICog5L2g5Y+v5Lul6YCa6L+H5byA5ZCv6ams6L6+5p2l5pa95Yqg5LiA5Liq5omt55+p5Yqb5p2l6amx5Yqo6L+Z5Lik5Liq5Yia5L2T5Zyo6L+Z5LiA54K55LiK55qE55u45a+56YCf5bqm44CCXG4gKiBAY2xhc3MgUmV2b2x1dGVKb2ludFxuICogQGV4dGVuZHMgSm9pbnRcbiAqL1xudmFyIFJldm9sdXRlSm9pbnQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlJldm9sdXRlSm9pbnQnLFxuICAgIGV4dGVuZHM6IGNjLkpvaW50LFxuICAgIFxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1Jldm9sdXRlJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL2pvaW50LmpzJyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbWF4TW90b3JUb3JxdWU6IDAsXG4gICAgICAgIF9tb3RvclNwZWVkOiAwLFxuICAgICAgICBfZW5hYmxlTGltaXQ6IGZhbHNlLFxuICAgICAgICBfZW5hYmxlTW90b3I6IGZhbHNlLFxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHJlZmVyZW5jZSBhbmdsZS5cbiAgICAgICAgICogQW4gYW5nbGUgYmV0d2VlbiBib2RpZXMgY29uc2lkZXJlZCB0byBiZSB6ZXJvIGZvciB0aGUgam9pbnQgYW5nbGUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog55u45a+56KeS5bqm44CCXG4gICAgICAgICAqIOS4pOS4queJqeS9k+S5i+mXtOinkuW6puS4uumbtuaXtuWPr+S7peeci+S9nOebuOetieS6juWFs+iKguinkuW6plxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcmVmZXJlbmNlQW5nbGVcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgcmVmZXJlbmNlQW5nbGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5yZWZlcmVuY2VBbmdsZScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGxvd2VyIGFuZ2xlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOinkuW6pueahOacgOS9jumZkOWItuOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbG93ZXJBbmdsZVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBsb3dlckFuZ2xlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubG93ZXJBbmdsZScgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHVwcGVyIGFuZ2xlLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOinkuW6pueahOacgOmrmOmZkOWItuOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdXBwZXJBbmdsZVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB1cHBlckFuZ2xlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIudXBwZXJBbmdsZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbWF4aXVtIHRvcnF1ZSBjYW4gYmUgYXBwbGllZCB0byByaWdpZGJvZHkgdG8gcmVhcmNoIHRoZSB0YXJnZXQgbW90b3Igc3BlZWQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Y+v5Lul5pa95Yqg5Yiw5Yia5L2T55qE5pyA5aSn5omt55+p44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhNb3RvclRvcnF1ZVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBtYXhNb3RvclRvcnF1ZToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4TW90b3JUb3JxdWUnLCAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heE1vdG9yVG9ycXVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TW90b3JUb3JxdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TWF4TW90b3JUb3JxdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZXhwZWN0ZWQgbW90b3Igc3BlZWQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pyf5pyb55qE6ams6L6+6YCf5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtb3RvclNwZWVkXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIG1vdG9yU3BlZWQ6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm1vdG9yU3BlZWQnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vdG9yU3BlZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3RvclNwZWVkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1vdG9yU3BlZWQodmFsdWUgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogRW5hYmxlIGpvaW50IGxpbWl0P1xuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaYr+WQpuW8gOWQr+WFs+iKgueahOmZkOWItu+8n1xuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZUxpbWl0XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBlbmFibGVMaW1pdDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZW5hYmxlTGltaXQnLCAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZUxpbWl0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlTGltaXQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuRW5hYmxlTGltaXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBFbmFibGUgam9pbnQgbW90b3I/XG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm5byA5ZCv5YWz6IqC6ams6L6+77yfXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlTW90b3JcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZU1vdG9yOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5lbmFibGVNb3RvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlTW90b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGVNb3RvciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5FbmFibGVNb3Rvcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGpvaW50IGFuZ2xlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blhbPoioLop5LluqbjgIJcbiAgICAgKiBAbWV0aG9kIGdldEpvaW50QW5nbGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0Sm9pbnRBbmdsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb2ludC5HZXRKb2ludEFuZ2xlKCkgKiBQSFlTSUNTX0FOR0xFX1RPX0FOR0xFO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0IHRoZSBtYXggYW5kIG1pbiBsaW1pdCBhbmdsZS5cbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5YWz6IqC55qE6KeS5bqm5pyA5aSn5ZKM5pyA5bCP6KeS5bqm44CCXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxvd2VyIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB1cHBlciBcbiAgICAgKi9cbiAgICBzZXRMaW1pdHMgKGxvd2VyLCB1cHBlcikge1xuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qb2ludC5TZXRMaW1pdHMobG93ZXIgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFLCB1cHBlciAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jcmVhdGVKb2ludERlZjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVmID0gbmV3IGIyLlJldm9sdXRlSm9pbnREZWYoKTtcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQSA9IG5ldyBiMi5WZWMyKHRoaXMuYW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmFuY2hvci55L1BUTV9SQVRJTyk7XG4gICAgICAgIGRlZi5sb2NhbEFuY2hvckIgPSBuZXcgYjIuVmVjMih0aGlzLmNvbm5lY3RlZEFuY2hvci54L1BUTV9SQVRJTywgdGhpcy5jb25uZWN0ZWRBbmNob3IueS9QVE1fUkFUSU8pO1xuXG4gICAgICAgIC8vIGNvY29zIGRlZ3JlZSAwIGlzIHRvIHJpZ2h0LCBhbmQgYm94MmQgZGVncmVlIDAgaXMgdG8gdXAuXG4gICAgICAgIGRlZi5sb3dlckFuZ2xlID0gdGhpcy51cHBlckFuZ2xlKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xuICAgICAgICBkZWYudXBwZXJBbmdsZSA9IHRoaXMubG93ZXJBbmdsZSogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbiAgICAgICAgXG4gICAgICAgIGRlZi5tYXhNb3RvclRvcnF1ZSA9IHRoaXMubWF4TW90b3JUb3JxdWU7XG4gICAgICAgIGRlZi5tb3RvclNwZWVkID0gdGhpcy5tb3RvclNwZWVkICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbiAgICAgICAgZGVmLmVuYWJsZUxpbWl0ID0gdGhpcy5lbmFibGVMaW1pdDtcbiAgICAgICAgZGVmLmVuYWJsZU1vdG9yID0gdGhpcy5lbmFibGVNb3RvcjtcblxuICAgICAgICBkZWYucmVmZXJlbmNlQW5nbGUgPSB0aGlzLnJlZmVyZW5jZUFuZ2xlICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcblxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5SZXZvbHV0ZUpvaW50ID0gbW9kdWxlLmV4cG9ydHMgPSBSZXZvbHV0ZUpvaW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=