
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCWheelJoint.js';
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
 * A wheel joint. This joint provides two degrees of freedom: translation
 * along an axis fixed in bodyA and rotation in the plane. You can use a joint motor to drive
 * the rotation or to model rotational friction.
 * This joint is designed for vehicle suspensions.
 * !#zh
 * 轮子关节提供两个维度的自由度：旋转和沿着指定方向上位置的移动。
 * 你可以通过开启关节马达来使用马达驱动刚体的旋转。
 * 轮组关节是专门为机动车类型设计的。
 * @class WheelJoint
 * @extends Joint
 */


var WheelJoint = cc.Class({
  name: 'cc.WheelJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Wheel'
  },
  properties: {
    _maxMotorTorque: 0,
    _motorSpeed: 0,
    _enableMotor: false,
    _frequency: 2,
    _dampingRatio: 0.7,

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
    },

    /**
     * !#en
     * The spring frequency.
     * !#zh
     * 弹性系数。
     * @property {Number} frequency
     * @default 0
     */
    frequency: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.frequency',
      get: function get() {
        return this._frequency;
      },
      set: function set(value) {
        this._frequency = value;

        if (this._joint) {
          this._joint.SetSpringFrequencyHz(value);
        }
      }
    },

    /**
     * !#en
     * The damping ratio.
     * !#zh
     * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
     * @property {Number} dampingRatio
     * @default 0
     */
    dampingRatio: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.dampingRatio',
      get: function get() {
        return this._dampingRatio;
      },
      set: function set(value) {
        this._dampingRatio = value;

        if (this._joint) {
          this._joint.SetDampingRatio(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.WheelJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
    def.maxMotorTorque = this.maxMotorTorque;
    def.motorSpeed = this.motorSpeed * ANGLE_TO_PHYSICS_ANGLE;
    def.enableMotor = this.enableMotor;
    def.dampingRatio = this.dampingRatio;
    def.frequencyHz = this.frequency;
    return def;
  }
});
cc.WheelJoint = module.exports = WheelJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NXaGVlbEpvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiV2hlZWxKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJpbnNwZWN0b3IiLCJtZW51IiwicHJvcGVydGllcyIsIl9tYXhNb3RvclRvcnF1ZSIsIl9tb3RvclNwZWVkIiwiX2VuYWJsZU1vdG9yIiwiX2ZyZXF1ZW5jeSIsIl9kYW1waW5nUmF0aW8iLCJsb2NhbEF4aXNBIiwidjIiLCJ0b29sdGlwIiwiQ0NfREVWIiwibWF4TW90b3JUb3JxdWUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9qb2ludCIsIlNldE1heE1vdG9yVG9ycXVlIiwibW90b3JTcGVlZCIsIlNldE1vdG9yU3BlZWQiLCJlbmFibGVNb3RvciIsIkVuYWJsZU1vdG9yIiwiZnJlcXVlbmN5IiwiU2V0U3ByaW5nRnJlcXVlbmN5SHoiLCJkYW1waW5nUmF0aW8iLCJTZXREYW1waW5nUmF0aW8iLCJfY3JlYXRlSm9pbnREZWYiLCJkZWYiLCJiMiIsIldoZWVsSm9pbnREZWYiLCJsb2NhbEFuY2hvckEiLCJWZWMyIiwiYW5jaG9yIiwieCIsInkiLCJsb2NhbEFuY2hvckIiLCJjb25uZWN0ZWRBbmNob3IiLCJmcmVxdWVuY3lIeiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3Qzs7QUFDQSxJQUFJRSxzQkFBc0IsR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJDLHNCQUExRDtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUFhQSxJQUFJQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0YsRUFBRSxDQUFDRyxLQUZVO0FBSXRCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFLHdEQURNO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUU7QUFGVyxHQUpDO0FBU3RCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFLENBRFQ7QUFFUkMsSUFBQUEsV0FBVyxFQUFFLENBRkw7QUFHUkMsSUFBQUEsWUFBWSxFQUFFLEtBSE47QUFLUkMsSUFBQUEsVUFBVSxFQUFFLENBTEo7QUFNUkMsSUFBQUEsYUFBYSxFQUFFLEdBTlA7O0FBUVI7Ozs7Ozs7O0FBUUFDLElBQUFBLFVBQVUsRUFBRTtBQUNSLGlCQUFTZCxFQUFFLENBQUNlLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQUREO0FBRVJDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJO0FBRlgsS0FoQko7O0FBcUJSOzs7Ozs7OztBQVFBQyxJQUFBQSxjQUFjLEVBQUU7QUFDWkYsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksd0RBRFA7QUFFWkUsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtWLGVBQVo7QUFDSCxPQUpXO0FBS1pXLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtaLGVBQUwsR0FBdUJZLEtBQXZCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUMsaUJBQVosQ0FBOEJGLEtBQTlCO0FBQ0g7QUFDSjtBQVZXLEtBN0JSOztBQTBDUjs7Ozs7Ozs7QUFRQUcsSUFBQUEsVUFBVSxFQUFFO0FBQ1JSLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG9EQURYO0FBRVJFLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLVCxXQUFaO0FBQ0gsT0FKTztBQUtSVSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLWCxXQUFMLEdBQW1CVyxLQUFuQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlHLGFBQVosQ0FBMEJKLEtBQUssR0FBR3ZCLHNCQUFsQztBQUNIO0FBQ0o7QUFWTyxLQWxESjs7QUErRFI7Ozs7Ozs7O0FBUUE0QixJQUFBQSxXQUFXLEVBQUU7QUFDVFYsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUkscURBRFY7QUFFVEUsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtSLFlBQVo7QUFDSCxPQUpRO0FBS1RTLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtWLFlBQUwsR0FBb0JVLEtBQXBCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUssV0FBWixDQUF3Qk4sS0FBeEI7QUFDSDtBQUNKO0FBVlEsS0F2RUw7O0FBb0ZSOzs7Ozs7OztBQVFBTyxJQUFBQSxTQUFTLEVBQUU7QUFDUFosTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksbURBRFo7QUFFUEUsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtQLFVBQVo7QUFDSCxPQUpNO0FBS1BRLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtULFVBQUwsR0FBa0JTLEtBQWxCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWU8sb0JBQVosQ0FBaUNSLEtBQWpDO0FBQ0g7QUFDSjtBQVZNLEtBNUZIOztBQXlHUjs7Ozs7Ozs7QUFRQVMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZkLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHNEQURUO0FBRVZFLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixhQUFaO0FBQ0gsT0FKUztBQUtWTyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUixhQUFMLEdBQXFCUSxLQUFyQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlTLGVBQVosQ0FBNEJWLEtBQTVCO0FBQ0g7QUFDSjtBQVZTO0FBakhOLEdBVFU7QUF3SXRCVyxFQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsUUFBSUMsR0FBRyxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsYUFBUCxFQUFWO0FBQ0FGLElBQUFBLEdBQUcsQ0FBQ0csWUFBSixHQUFtQixJQUFJRixFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLENBQVosR0FBYzNDLFNBQTFCLEVBQXFDLEtBQUswQyxNQUFMLENBQVlFLENBQVosR0FBYzVDLFNBQW5ELENBQW5CO0FBQ0FxQyxJQUFBQSxHQUFHLENBQUNRLFlBQUosR0FBbUIsSUFBSVAsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS0ssZUFBTCxDQUFxQkgsQ0FBckIsR0FBdUIzQyxTQUFuQyxFQUE4QyxLQUFLOEMsZUFBTCxDQUFxQkYsQ0FBckIsR0FBdUI1QyxTQUFyRSxDQUFuQjtBQUVBcUMsSUFBQUEsR0FBRyxDQUFDbkIsVUFBSixHQUFpQixJQUFJb0IsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS3ZCLFVBQUwsQ0FBZ0J5QixDQUE1QixFQUErQixLQUFLekIsVUFBTCxDQUFnQjBCLENBQS9DLENBQWpCO0FBRUFQLElBQUFBLEdBQUcsQ0FBQ2YsY0FBSixHQUFxQixLQUFLQSxjQUExQjtBQUNBZSxJQUFBQSxHQUFHLENBQUNULFVBQUosR0FBaUIsS0FBS0EsVUFBTCxHQUFrQjFCLHNCQUFuQztBQUNBbUMsSUFBQUEsR0FBRyxDQUFDUCxXQUFKLEdBQWtCLEtBQUtBLFdBQXZCO0FBRUFPLElBQUFBLEdBQUcsQ0FBQ0gsWUFBSixHQUFtQixLQUFLQSxZQUF4QjtBQUNBRyxJQUFBQSxHQUFHLENBQUNVLFdBQUosR0FBa0IsS0FBS2YsU0FBdkI7QUFFQSxXQUFPSyxHQUFQO0FBQ0g7QUF2SnFCLENBQVQsQ0FBakI7QUEwSkFqQyxFQUFFLENBQUNELFVBQUgsR0FBZ0I2QyxNQUFNLENBQUNDLE9BQVAsR0FBaUI5QyxVQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG5cbi8qKlxuICogISNlblxuICogQSB3aGVlbCBqb2ludC4gVGhpcyBqb2ludCBwcm92aWRlcyB0d28gZGVncmVlcyBvZiBmcmVlZG9tOiB0cmFuc2xhdGlvblxuICogYWxvbmcgYW4gYXhpcyBmaXhlZCBpbiBib2R5QSBhbmQgcm90YXRpb24gaW4gdGhlIHBsYW5lLiBZb3UgY2FuIHVzZSBhIGpvaW50IG1vdG9yIHRvIGRyaXZlXG4gKiB0aGUgcm90YXRpb24gb3IgdG8gbW9kZWwgcm90YXRpb25hbCBmcmljdGlvbi5cbiAqIFRoaXMgam9pbnQgaXMgZGVzaWduZWQgZm9yIHZlaGljbGUgc3VzcGVuc2lvbnMuXG4gKiAhI3poXG4gKiDova7lrZDlhbPoioLmj5DkvpvkuKTkuKrnu7TluqbnmoToh6rnlLHluqbvvJrml4vovazlkozmsr/nnYDmjIflrprmlrnlkJHkuIrkvY3nva7nmoTnp7vliqjjgIJcbiAqIOS9oOWPr+S7pemAmui/h+W8gOWQr+WFs+iKgumprOi+vuadpeS9v+eUqOmprOi+vumpseWKqOWImuS9k+eahOaXi+i9rOOAglxuICog6L2u57uE5YWz6IqC5piv5LiT6Zeo5Li65py65Yqo6L2m57G75Z6L6K6+6K6h55qE44CCXG4gKiBAY2xhc3MgV2hlZWxKb2ludFxuICogQGV4dGVuZHMgSm9pbnRcbiAqL1xudmFyIFdoZWVsSm9pbnQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLldoZWVsSm9pbnQnLFxuICAgIGV4dGVuZHM6IGNjLkpvaW50LFxuICAgIFxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL2pvaW50LmpzJyxcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1doZWVsJyxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbWF4TW90b3JUb3JxdWU6IDAsXG4gICAgICAgIF9tb3RvclNwZWVkOiAwLFxuICAgICAgICBfZW5hYmxlTW90b3I6IGZhbHNlLFxuICAgICAgICBcbiAgICAgICAgX2ZyZXF1ZW5jeTogMixcbiAgICAgICAgX2RhbXBpbmdSYXRpbzogMC43LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBsb2NhbCBqb2ludCBheGlzIHJlbGF0aXZlIHRvIHJpZ2lkYm9keS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmjIflrprliJrkvZPlj6/ku6Xnp7vliqjnmoTmlrnlkJHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMyfSBsb2NhbEF4aXNBXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDEsIDApXG4gICAgICAgICAqL1xuICAgICAgICBsb2NhbEF4aXNBOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigxLCAwKSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmxvY2FsQXhpc0EnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG1heGl1bSB0b3JxdWUgY2FuIGJlIGFwcGxpZWQgdG8gcmlnaWRib2R5IHRvIHJlYXJjaCB0aGUgdGFyZ2V0IG1vdG9yIHNwZWVkLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWPr+S7peaWveWKoOWIsOWImuS9k+eahOacgOWkp+aJreefqeOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4TW90b3JUb3JxdWVcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgbWF4TW90b3JUb3JxdWU6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm1heE1vdG9yVG9ycXVlJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhNb3RvclRvcnF1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heE1vdG9yVG9ycXVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heE1vdG9yVG9ycXVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGV4cGVjdGVkIG1vdG9yIHNwZWVkLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOacn+acm+eahOmprOi+vumAn+W6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbW90b3JTcGVlZFxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBtb3RvclNwZWVkOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tb3RvclNwZWVkJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb3RvclNwZWVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW90b3JTcGVlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNb3RvclNwZWVkKHZhbHVlICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEVuYWJsZSBqb2ludCBtb3Rvcj9cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKblvIDlkK/lhbPoioLpqazovr7vvJ9cbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVNb3RvclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlTW90b3I6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmVuYWJsZU1vdG9yJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVNb3RvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZU1vdG9yID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LkVuYWJsZU1vdG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHNwcmluZyBmcmVxdWVuY3kuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5by55oCn57O75pWw44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmcmVxdWVuY3lcbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgZnJlcXVlbmN5OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5mcmVxdWVuY3knLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZyZXF1ZW5jeTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZyZXF1ZW5jeSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRTcHJpbmdGcmVxdWVuY3lIeih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBkYW1waW5nIHJhdGlvLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmYu+WwvO+8jOihqOekuuWFs+iKguWPmOW9ouWQju+8jOaBouWkjeWIsOWIneWni+eKtuaAgeWPl+WIsOeahOmYu+WKm+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGFtcGluZ1JhdGlvXG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGRhbXBpbmdSYXRpbzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGFtcGluZ1JhdGlvJywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYW1waW5nUmF0aW87XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1waW5nUmF0aW8gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RGFtcGluZ1JhdGlvKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuV2hlZWxKb2ludERlZigpO1xuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XG4gICAgICAgIFxuICAgICAgICBkZWYubG9jYWxBeGlzQSA9IG5ldyBiMi5WZWMyKHRoaXMubG9jYWxBeGlzQS54LCB0aGlzLmxvY2FsQXhpc0EueSk7XG4gICAgICAgIFxuICAgICAgICBkZWYubWF4TW90b3JUb3JxdWUgPSB0aGlzLm1heE1vdG9yVG9ycXVlO1xuICAgICAgICBkZWYubW90b3JTcGVlZCA9IHRoaXMubW90b3JTcGVlZCAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XG4gICAgICAgIGRlZi5lbmFibGVNb3RvciA9IHRoaXMuZW5hYmxlTW90b3I7XG5cbiAgICAgICAgZGVmLmRhbXBpbmdSYXRpbyA9IHRoaXMuZGFtcGluZ1JhdGlvO1xuICAgICAgICBkZWYuZnJlcXVlbmN5SHogPSB0aGlzLmZyZXF1ZW5jeTtcblxuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH1cbn0pO1xuXG5jYy5XaGVlbEpvaW50ID0gbW9kdWxlLmV4cG9ydHMgPSBXaGVlbEpvaW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=