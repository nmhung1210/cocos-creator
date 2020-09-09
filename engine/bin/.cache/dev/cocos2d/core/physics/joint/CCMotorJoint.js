
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCMotorJoint.js';
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
 * A motor joint is used to control the relative motion
 * between two bodies. A typical usage is to control the movement
 * of a dynamic body with respect to the ground.
 * !#zh
 * 马达关节被用来控制两个刚体间的相对运动。
 * 一个典型的例子是用来控制一个动态刚体相对于地面的运动。
 * @class MotorJoint
 * @extends Joint
 */


var MotorJoint = cc.Class({
  name: 'cc.MotorJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Motor',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _linearOffset: cc.v2(0, 0),
    _angularOffset: 0,
    _maxForce: 1,
    _maxTorque: 1,
    _correctionFactor: 0.3,

    /**
     * !#en
     * The anchor of the rigidbody.
     * !#zh
     * 刚体的锚点。
     * @property {Vec2} anchor
     * @default cc.v2(0, 0)
     */
    anchor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.anchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
    },

    /**
     * !#en
     * The anchor of the connected rigidbody.
     * !#zh
     * 关节另一端刚体的锚点。
     * @property {Vec2} connectedAnchor
     * @default cc.v2(0, 0)
     */
    connectedAnchor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedAnchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
    },

    /**
     * !#en
     * The linear offset from connected rigidbody to rigidbody.
     * !#zh
     * 关节另一端的刚体相对于起始端刚体的位置偏移量
     * @property {Vec2} linearOffset
     * @default cc.v2(0,0)
     */
    linearOffset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.linearOffset',
      get: function get() {
        return this._linearOffset;
      },
      set: function set(value) {
        this._linearOffset = value;

        if (this._joint) {
          this._joint.SetLinearOffset(new b2.Vec2(value.x / PTM_RATIO, value.y / PTM_RATIO));
        }
      }
    },

    /**
     * !#en
     * The angular offset from connected rigidbody to rigidbody.
     * !#zh
     * 关节另一端的刚体相对于起始端刚体的角度偏移量
     * @property {Number} angularOffset
     * @default 0
     */
    angularOffset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.angularOffset',
      get: function get() {
        return this._angularOffset;
      },
      set: function set(value) {
        this._angularOffset = value;

        if (this._joint) {
          this._joint.SetAngularOffset(value);
        }
      }
    },

    /**
     * !#en
     * The maximum force can be applied to rigidbody.
     * !#zh
     * 可以应用于刚体的最大的力值
     * @property {Number} maxForce
     * @default 1
     */
    maxForce: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxForce',
      get: function get() {
        return this._maxForce;
      },
      set: function set(value) {
        this._maxForce = value;

        if (this._joint) {
          this._joint.SetMaxForce(value);
        }
      }
    },

    /**
     * !#en
     * The maximum torque can be applied to rigidbody.
     * !#zh
     * 可以应用于刚体的最大扭矩值
     * @property {Number} maxTorque
     * @default 1
     */
    maxTorque: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxTorque',
      get: function get() {
        return this._maxTorque;
      },
      set: function set(value) {
        this._maxTorque = value;

        if (this._joint) {
          this._joint.SetMaxTorque(value);
        }
      }
    },

    /**
     * !#en
     * The position correction factor in the range [0,1].
     * !#zh
     * 位置矫正系数，范围为 [0, 1]
     * @property {Number} correctionFactor
     * @default 0.3
     */
    correctionFactor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.correctionFactor',
      get: function get() {
        return this._correctionFactor;
      },
      set: function set(value) {
        this._correctionFactor = value;

        if (this._joint) {
          this._joint.SetCorrectionFactor(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.MotorJointDef();
    def.linearOffset = new b2.Vec2(this.linearOffset.x / PTM_RATIO, this.linearOffset.y / PTM_RATIO);
    def.angularOffset = this.angularOffset * ANGLE_TO_PHYSICS_ANGLE;
    def.maxForce = this.maxForce;
    def.maxTorque = this.maxTorque;
    def.correctionFactor = this.correctionFactor;
    return def;
  }
});
cc.MotorJoint = module.exports = MotorJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3Mvam9pbnQvQ0NNb3RvckpvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiTW90b3JKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaW5zcGVjdG9yIiwicHJvcGVydGllcyIsIl9saW5lYXJPZmZzZXQiLCJ2MiIsIl9hbmd1bGFyT2Zmc2V0IiwiX21heEZvcmNlIiwiX21heFRvcnF1ZSIsIl9jb3JyZWN0aW9uRmFjdG9yIiwiYW5jaG9yIiwidG9vbHRpcCIsIkNDX0RFViIsIm92ZXJyaWRlIiwidmlzaWJsZSIsImNvbm5lY3RlZEFuY2hvciIsImxpbmVhck9mZnNldCIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0TGluZWFyT2Zmc2V0IiwiYjIiLCJWZWMyIiwieCIsInkiLCJhbmd1bGFyT2Zmc2V0IiwiU2V0QW5ndWxhck9mZnNldCIsIm1heEZvcmNlIiwiU2V0TWF4Rm9yY2UiLCJtYXhUb3JxdWUiLCJTZXRNYXhUb3JxdWUiLCJjb3JyZWN0aW9uRmFjdG9yIiwiU2V0Q29ycmVjdGlvbkZhY3RvciIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsIk1vdG9ySm9pbnREZWYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7O0FBQ0EsSUFBSUUsc0JBQXNCLEdBQUdELE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCQyxzQkFBMUQ7QUFFQTs7Ozs7Ozs7Ozs7OztBQVdBLElBQUlDLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUks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QjtBQUVBLFdBQU9HLEdBQVA7QUFDSDtBQWpLcUIsQ0FBVCxDQUFqQjtBQW9LQXhDLEVBQUUsQ0FBQ0QsVUFBSCxHQUFnQjJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVDLFVBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XG52YXIgQU5HTEVfVE9fUEhZU0lDU19BTkdMRSA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcblxuLyoqXG4gKiAhI2VuXG4gKiBBIG1vdG9yIGpvaW50IGlzIHVzZWQgdG8gY29udHJvbCB0aGUgcmVsYXRpdmUgbW90aW9uXG4gKiBiZXR3ZWVuIHR3byBib2RpZXMuIEEgdHlwaWNhbCB1c2FnZSBpcyB0byBjb250cm9sIHRoZSBtb3ZlbWVudFxuICogb2YgYSBkeW5hbWljIGJvZHkgd2l0aCByZXNwZWN0IHRvIHRoZSBncm91bmQuXG4gKiAhI3poXG4gKiDpqazovr7lhbPoioLooqvnlKjmnaXmjqfliLbkuKTkuKrliJrkvZPpl7TnmoTnm7jlr7nov5DliqjjgIJcbiAqIOS4gOS4quWFuOWei+eahOS+i+WtkOaYr+eUqOadpeaOp+WItuS4gOS4quWKqOaAgeWImuS9k+ebuOWvueS6juWcsOmdoueahOi/kOWKqOOAglxuICogQGNsYXNzIE1vdG9ySm9pbnRcbiAqIEBleHRlbmRzIEpvaW50XG4gKi9cbnZhciBNb3RvckpvaW50ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Nb3RvckpvaW50JyxcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcbiAgICBcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9Nb3RvcicsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9qb2ludC5qcycsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2xpbmVhck9mZnNldDogY2MudjIoMCwgMCksXG4gICAgICAgIF9hbmd1bGFyT2Zmc2V0OiAwLFxuICAgICAgICBfbWF4Rm9yY2U6IDEsXG4gICAgICAgIF9tYXhUb3JxdWU6IDEsXG4gICAgICAgIF9jb3JyZWN0aW9uRmFjdG9yOiAwLjMsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGFuY2hvciBvZiB0aGUgcmlnaWRib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWImuS9k+eahOmUmueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IGFuY2hvclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigwLCAwKVxuICAgICAgICAgKi9cbiAgICAgICAgYW5jaG9yOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5hbmNob3InLCAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDogY2MudjIoMCwgMCksXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhbmNob3Igb2YgdGhlIGNvbm5lY3RlZCByaWdpZGJvZHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5YWz6IqC5Y+m5LiA56uv5Yia5L2T55qE6ZSa54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gY29ubmVjdGVkQW5jaG9yXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDAsIDApXG4gICAgICAgICAqL1xuICAgICAgICBjb25uZWN0ZWRBbmNob3I6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmNvbm5lY3RlZEFuY2hvcicsXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigwLCAwKSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBsaW5lYXIgb2Zmc2V0IGZyb20gY29ubmVjdGVkIHJpZ2lkYm9keSB0byByaWdpZGJvZHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5YWz6IqC5Y+m5LiA56uv55qE5Yia5L2T55u45a+55LqO6LW35aeL56uv5Yia5L2T55qE5L2N572u5YGP56e76YePXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbGluZWFyT2Zmc2V0XG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDAsMClcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVhck9mZnNldDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubGluZWFyT2Zmc2V0JyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lYXJPZmZzZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lYXJPZmZzZXQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TGluZWFyT2Zmc2V0KCBuZXcgYjIuVmVjMih2YWx1ZS54L1BUTV9SQVRJTywgdmFsdWUueS9QVE1fUkFUSU8pICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhbmd1bGFyIG9mZnNldCBmcm9tIGNvbm5lY3RlZCByaWdpZGJvZHkgdG8gcmlnaWRib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+eahOWImuS9k+ebuOWvueS6jui1t+Wni+err+WImuS9k+eahOinkuW6puWBj+enu+mHj1xuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYW5ndWxhck9mZnNldFxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBhbmd1bGFyT2Zmc2V0OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5hbmd1bGFyT2Zmc2V0JywgICAgICAgICAgICBcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmd1bGFyT2Zmc2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5ndWxhck9mZnNldCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRBbmd1bGFyT2Zmc2V0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG1heGltdW0gZm9yY2UgY2FuIGJlIGFwcGxpZWQgdG8gcmlnaWRib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWPr+S7peW6lOeUqOS6juWImuS9k+eahOacgOWkp+eahOWKm+WAvFxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4Rm9yY2VcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgbWF4Rm9yY2U6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm1heEZvcmNlJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhGb3JjZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heEZvcmNlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heEZvcmNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG1heGltdW0gdG9ycXVlIGNhbiBiZSBhcHBsaWVkIHRvIHJpZ2lkYm9keS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlj6/ku6XlupTnlKjkuo7liJrkvZPnmoTmnIDlpKfmia3nn6nlgLxcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heFRvcnF1ZVxuICAgICAgICAgKiBAZGVmYXVsdCAxXG4gICAgICAgICAqL1xuICAgICAgICBtYXhUb3JxdWU6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm1heFRvcnF1ZScsICAgICAgICAgICAgXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4VG9ycXVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4VG9ycXVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heFRvcnF1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBwb3NpdGlvbiBjb3JyZWN0aW9uIGZhY3RvciBpbiB0aGUgcmFuZ2UgWzAsMV0uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5L2N572u55+r5q2j57O75pWw77yM6IyD5Zu05Li6IFswLCAxXVxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY29ycmVjdGlvbkZhY3RvclxuICAgICAgICAgKiBAZGVmYXVsdCAwLjNcbiAgICAgICAgICovXG4gICAgICAgIGNvcnJlY3Rpb25GYWN0b3I6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmNvcnJlY3Rpb25GYWN0b3InLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvcnJlY3Rpb25GYWN0b3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3JyZWN0aW9uRmFjdG9yID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldENvcnJlY3Rpb25GYWN0b3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuTW90b3JKb2ludERlZigpO1xuICAgICAgICBkZWYubGluZWFyT2Zmc2V0ID0gbmV3IGIyLlZlYzIodGhpcy5saW5lYXJPZmZzZXQueC9QVE1fUkFUSU8sIHRoaXMubGluZWFyT2Zmc2V0LnkvUFRNX1JBVElPKTtcbiAgICAgICAgZGVmLmFuZ3VsYXJPZmZzZXQgPSB0aGlzLmFuZ3VsYXJPZmZzZXQgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xuICAgICAgICBkZWYubWF4Rm9yY2UgPSB0aGlzLm1heEZvcmNlO1xuICAgICAgICBkZWYubWF4VG9ycXVlID0gdGhpcy5tYXhUb3JxdWU7XG4gICAgICAgIGRlZi5jb3JyZWN0aW9uRmFjdG9yID0gdGhpcy5jb3JyZWN0aW9uRmFjdG9yO1xuXG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgfVxufSk7XG5cbmNjLk1vdG9ySm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IE1vdG9ySm9pbnQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==